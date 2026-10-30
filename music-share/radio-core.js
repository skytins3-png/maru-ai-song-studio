(function(root){
'use strict';
const TOPICS=[
  ["the time we tried to look cool","I once waved at a stranger for a full minute. Turns out they were waving at someone behind me.","Now that's a moment I'd love to erase from the record.","Too late. It's already in the radio archives. Ha-ha!"],
  ["little things that turn a hard day around","A cup of tea and a friend who actually listens. Nothing fancy.","There's a lot to be said for showing up for each other.","And for remembering where you put the tea bag. I've made that mistake twice."],
  ["old friends and unexpected reunions","I met a school friend in the supermarket. We talked by the frozen peas for an hour.","Some friendships pick up exactly where you left off.","The frozen peas probably didn't appreciate the reunion."],
  ["funny family traditions","My aunt still wraps the tiniest gifts in enormous boxes.","Ah, a woman who believes in building suspense.","Last Christmas I needed a map just to find the socks. Ha-ha!"],
  ["music on a long journey","A good song can make even a traffic jam feel like part of a movie.","Though I'd prefer a movie with fewer brake lights.","Fair enough. Let's give the passengers a better soundtrack."],
  ["the best advice nobody asked for","A friend once told me to keep a spare umbrella. I laughed. Then it poured.","The universe does enjoy impeccable comic timing.","I bought two umbrellas. Naturally, now it never rains."],
  ["the wonderful mess of cooking","I tried to make a family recipe without asking about the measurements.","Was it a meal or a science experiment?","Both. The smoke alarm gave it a standing ovation."],
  ["starting something new at any age","Trying something new feels awkward at first. But that's part of being alive.","I like that. Being a beginner isn't a failure.","No, though my first dance lesson was certainly an adventure."],
  ["the courage to apologize","A simple, sincere sorry can make more difference than a perfect speech.","And listening afterward matters just as much.","Exactly. We don't have to win every conversation."],
  ["the beauty of a quiet evening","Sometimes a quiet walk is all you need to find your thoughts again.","Until a friendly dog decides you're its new best friend.","That's an improvement to any evening, as far as I'm concerned."],
  ["stories from the neighborhood","Everybody knows that one neighbor who has the best stories.","And somehow knows who left the light on three streets away.","We call that community intelligence. Ha-ha!"],
  ["songs that bring back memories","One melody can take you right back to a particular afternoon.","And suddenly you remember the weather, the room, everything.","That's the magic of music. It keeps little moments alive."]
];
function trimmed(value,max){return String(value==null?'':value).replace(/[\u0000-\u001f\u007f]/g,' ').replace(/\s+/g,' ').trim().slice(0,max)}
function publicSongs(catalog){
 if(!Array.isArray(catalog))return [];
 const ids=new Set();
 return catalog.filter(item=>{
   if(!item||typeof item!=='object'||item.downloadAllowed!==true)return false;
   if(typeof item.id!=='string'||!item.id||ids.has(item.id))return false;
   if(!/^[A-Za-z0-9가-힣_-][^/\\?#%]{0,190}\.(mp3|wav|m4a|aac|ogg|flac)$/i.test(String(item.audio||'').replace(/^tracks\//,'')))return false;
   if(!String(item.audio).startsWith('tracks/')||item.audio.includes('..'))return false;
   ids.add(item.id);return true;
 }).slice(0,300);
}
function storyOf(issue){
 if(!issue||issue.pull_request||issue.state!=='open')return null;
 const labels=Array.isArray(issue.labels)?issue.labels.map(x=>(typeof x==='string'?x:x&&x.name)||''):[];
 if(!labels.includes('radio-approved'))return null;
 if(!/^\[STORY\]\s/i.test(String(issue.title||'')))return null;
 const body=String(issue.body||'');
 if(!body.includes('- [x] I have permission to submit this story for public posting and radio reading.'))return null;
 if(!body.includes('- [x] I understand this GitHub Issue is publicly visible.'))return null;
 const match=body.match(/## Story\s*\r?\n([\s\S]*?)(?:\r?\n## Permission|$)/);
 if(!match)return null;
 const story=trimmed(match[1].replace(/\[[^\]]+\]\([^)]+\)/g,'').replace(/<[^>]*>/g,''),350);
 if(story.length<20)return null;
 const author=(body.match(/## Listener name\s*\r?\n([^\r\n]+)/)||[])[1]||'a listener';
 return {id:issue.number,name:trimmed(author,32),story};
}
function approvedStories(issues){
 return Array.isArray(issues)?issues.map(storyOf).filter(Boolean).slice(0,25):[];
}
function requests(issues,tracks){
 if(!Array.isArray(issues))return [];
 const songMap=new Map(tracks.map(x=>[x.id,x]));
 const ids=new Set();
 return issues.filter(x=>x&&!x.pull_request&&x.state==='open'&&/^\[REQUEST\]\s/i.test(String(x.title||'')))
  .map(x=>{const match=String(x.body||'').match(/(?:^|\n)Track ID:\s*([^\r\n]{1,200})/);return match?songMap.get(match[1].trim()):null})
  .filter(x=>{if(!x||ids.has(x.id))return false;ids.add(x.id);return true}).slice(0,20);
}
function chooseTrack(tracks,episode,requestsList,playedRequestIds){
 if(!tracks.length)return null;
 const request=requestsList.find(x=>!playedRequestIds.has(x.id));
 if(request)return {track:request,requested:true};
 return {track:tracks[Math.abs(episode)%tracks.length],requested:false};
}
function episodeScript(track,episode,date,story,requested){
 const stamp=Number.isFinite(date)?date:Date.now();
 const day=Math.floor(stamp/86400000);
 const topic=TOPICS[((day+episode)%TOPICS.length+TOPICS.length)%TOPICS.length];
 const title=trimmed(track.title||'our next song',120);
 const lines=[
  {who:'host',text:"Good evening, friends. You're listening to Maru Radio. I'm Ahwan, and there's always room for one more at our table."},
  {who:'guest',text:"Hey, it's Alex. I've brought a cup of coffee, a few stories, and absolutely no sensible advice."},
  {who:'host',text:"Ha-ha! That's my kind of guest. Tonight let's talk about "+topic[0]+"."},
  {who:'guest',text:topic[1]},
  {who:'host',text:topic[2]},
  {who:'guest',text:topic[3]},
  {who:'host',text:"You know, underneath the joke there's something we all recognize. Life doesn't always go to plan."},
  {who:'guest',text:"That's true. But it helps to have someone you can laugh with, even on the messy days."},
  {who:'host',text:"And to all our friends listening on the way home, thanks for letting us keep you company."}
 ];
 if(story&&story.story){
  lines.push({who:'host',text:"We've got a listener story approved by our producer, from "+trimmed(story.name,32)+"."});
  const parts=trimmed(story.story,350).match(/.{1,110}/g)||[];
  for(const p of parts)lines.push({who:'host',text:p});
  lines.push({who:'guest',text:"Thanks for sharing that with us. It takes heart to put a real moment into words."});
  lines.push({who:'host',text:"And we hope everyone listening feels a little less alone tonight."});
 }
 lines.push({who:'guest',text:"Okay, I think we've talked enough to earn a good song. Ha-ha!"});
 lines.push({who:'host',text:(requested?"This one came in as a listener request. ":"Here's a track from our original music library. ")+trimmed(title,120)+", by "+trimmed(track.artist||'MARU',90)+"."});
 return lines;
}
/** Honest on-air preview when no licensed audio has been published/imported. */
function talkEpisodeScript(episode,date,story){
 const lines=episodeScript({title:'',artist:''},episode,date,story,false);
 lines.splice(-2,2,
  {who:'guest',text:"That was lovely. We don't have a song file loaded yet, but there's always room for one more story."},
  {who:'host',text:"We can keep the conversation going. Choose your own Suno MP3 files here to hear them between our talks."});
 return lines;
}
function localOriginals(files,createURL){
 if(!files||!createURL)return [];
 const accepted=[],seen=new Set();
 const pattern=/\.(mp3|wav|m4a|aac|ogg|flac)$/i;
 for(const file of Array.from(files).slice(0,100)){
  if(!file||!pattern.test(String(file.name||''))||file.size<=0||file.size>250*1024*1024)continue;
  const key=[file.name,file.size,file.lastModified||0].join(':');
  if(seen.has(key))continue;
  seen.add(key);
  accepted.push({
   id:'local-'+key,title:trimmed(file.name.replace(pattern,''),120),
   artist:'Private local original',audio:createURL(file),local:true
  });
 }
 return accepted;
}
root.MaruRadioCore={trimmed,publicSongs,storyOf,approvedStories,requests,chooseTrack,episodeScript,talkEpisodeScript,localOriginals};
})(typeof globalThis!=='undefined'?globalThis:this);
