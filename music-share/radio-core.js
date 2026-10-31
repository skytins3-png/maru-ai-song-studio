(function(root){
'use strict';
const TOPICS=[
 [
  "I waved at someone. They waved straight past me.",
  "Ouch. Did you pretend you knew somebody else?",
  "Naturally. Then I walked into a door.",
  "That's commitment to the performance."
 ],
 [
  "I made tea and forgot to drink it.",
  "So you made room-temperature tea.",
  "I call it a very patient cup.",
  "It waited longer than my phone battery."
 ],
 [
  "Saw an old friend today. Same laugh, different haircut.",
  "Did you tell them you remembered the laugh?",
  "I did. They laughed even harder.",
  "That's how you know it's a good friendship."
 ],
 [
  "You ever cook without reading the recipe?",
  "Once. The smoke alarm gave me notes.",
  "At least somebody showed up for dinner.",
  "The loudest guest I've ever had."
 ],
 [
  "My umbrella disappeared right before the rain.",
  "That's when umbrellas go on holiday.",
  "Mine must have booked a beach.",
  "Without inviting either of us."
 ],
 [
  "I sang along in the car today.",
  "Did the people next to you enjoy it?",
  "They rolled up their window.",
  "A tough crowd, but you kept going."
 ],
 [
  "My neighbor's dog knows everybody on this street.",
  "Better social life than both of us.",
  "He even remembers birthdays, I think.",
  "Well, he remembers the cake."
 ],
 [
  "I tried dancing in the kitchen.",
  "How'd that work out?",
  "The floor won. Easily.",
  "At least you made it a contest."
 ],
 [
  "A song brought back my school days.",
  "The music remembers things we forget.",
  "Even the terrible hairstyles.",
  "Especially those. No escape."
 ],
 [
  "I met someone who laughs at their own jokes.",
  "Hang on. Are you talking about me?",
  "Would I ever do that?",
  "You absolutely would."
 ],
 [
  "I bought bread and forgot everything else.",
  "So dinner was... bread?",
  "Bread, and a very good story.",
  "Honestly, I've had worse menus."
 ],
 [
  "I love a walk after a long day.",
  "Even when you don't know where you're going?",
  "Especially then. I find a good view.",
  "Or a bakery. That's your secret."
 ],
 [
  "I sent a message to the wrong chat.",
  "Please tell me it was a nice message.",
  "Just a photo of my lunch.",
  "Well, now everyone knows you ate."
 ],
 [
  "My alarm rang, and I bargained with it.",
  "How much extra sleep did you get?",
  "Six minutes. Excellent negotiations.",
  "Your alarm needs a better lawyer."
 ],
 [
  "I tried to take a serious photo.",
  "And?",
  "The wind gave me a new hairstyle.",
  "Free styling. Can't argue with that."
 ],
 [
  "The best chats always run a little long.",
  "Like this one?",
  "Not today. We promised more music.",
  "Good call. Save the gossip for later."
 ],
 [
  "I missed the bus by three seconds.",
  "Three seconds? That's just rude.",
  "The driver waved. Very politely.",
  "A gentleman with terrible timing."
 ],
 [
  "Some mornings need an extra coffee.",
  "And some need a whole weekend.",
  "Can I order one of those?",
  "Sorry, we're fresh out."
 ],
 [
  "My aunt keeps every birthday card.",
  "That's actually pretty sweet.",
  "She says the silly ones are her favorites.",
  "Then you must be her favorite guest."
 ],
 [
  "I love the sound of rain on the window.",
  "Until you remember your laundry's outside.",
  "Well, now it's getting a second wash.",
  "Nature's bonus service."
 ]
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
 if(!labels.includes('radio-approved')||!labels.includes('radio-screened')
  ||labels.includes('radio-quarantine')||!root.MaruStoryGuard)return null;
 if(!root.MaruStoryGuard.evaluateIssue(issue).safe)return null;
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
function introLine(track,episode,requested){
 const title=trimmed(track.title||'our next song',72);
 const by=trimmed(track.artist||'MARU',45);
 const leads=['Alright, here\'s','Now for','Let\'s hear','Here comes','Time for'];
 const lead=leads[Math.abs(episode)%leads.length];
 return {who:'host',text:(requested?'A listener picked this one. ':'')+lead+' '+title+', by '+by+'.'};
}
function sceneLines(episode,date){
 const stamp=Number.isFinite(date)?date:Date.now();
 const day=Math.floor(stamp/86400000);
 const topic=TOPICS[((day+episode)%TOPICS.length+TOPICS.length)%TOPICS.length];
 return topic.map((text,i)=>({who:i%2===0?'host':'guest',text}));
}
// Four natural back-and-forth lines, then directly into the song.
// No fabricated live caller, real-time AI claims, or repeated long DJ monologues.
function episodeScript(track,episode,date,story,requested){
 let lines;
 if(story&&story.story){
  const original=trimmed(story.story,350);
  const excerpt=original.slice(0,165).trim();
  lines=[
   {who:'host',text:'A quick listener story from '+trimmed(story.name||'a listener',32)+'.'},
   {who:'guest',text:'Oh, go on.'},
   {who:'host',text:'They wrote: '+excerpt+(original.length>165?'... That\'s a short excerpt.':'')},
   {who:'guest',text:'That one stays with you.'}
  ];
 }else lines=sceneLines(episode,date);
 lines.push(introLine(track,episode,requested));
 return lines;
}
/** Compact talk-only preview; never invent a song or imply an uploaded track exists. */
function talkEpisodeScript(episode,date,story){
 let lines;
 if(story&&story.story){
  const original=trimmed(story.story,350);
  const excerpt=original.slice(0,165).trim();
  lines=[
   {who:'host',text:'One short story from '+trimmed(story.name||'a listener',32)+'.'},
   {who:'guest',text:'I\'m listening.'},
   {who:'host',text:'They wrote: '+excerpt+(original.length>165?'... Just an excerpt.':'')},
   {who:'guest',text:'Thanks for sending that in.'}
  ];
 }else lines=sceneLines(episode,date);
 if(episode===1)lines.push({who:'host',text:'No song loaded yet. Add an MP3 whenever you like.'});
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
