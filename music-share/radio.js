(function(){
'use strict';
const core=globalThis.MaruRadioCore, $=id=>document.getElementById(id);
const audio=$('radioAudio'),start=$('startRadio'),stop=$('stopRadio'),skip=$('skipRadio');
const importFiles=$('localFiles'),clearFiles=$('clearLocal');
const repo='https://api.github.com/repos/skytins3-png/maru-ai-song-studio';
let publicTracks=[],localTracks=[],approved=[],requestList=[],episode=0,active=false,revision=0;
let usedStories=new Set(),usedRequests=new Set(),unplayable=new Set();
let lastCatalogRefresh=0,lastIssueRefresh=0,lastDailyRefresh=0,dailyData=null,dialogueTimer=null;
const status=message=>{$('status').textContent=message};
const playable=()=>[...localTracks,...publicTracks].filter(x=>!unplayable.has(x.id)).filter(x=>{
 const region=$('radioGenre').value||'all',style=$('radioStyle').value||'all';
 const g=globalThis.MaruGenres;
 if(g&&typeof g.matches==='function')return g.matches(x,region,style);
 // Keep old isolated radio clients/tests safe when the genre helper is absent.
 return region==='all'&&style==='all';
});
const info=()=>{
 const all=playable();
 $('radioCounts').textContent=localTracks.length+' private tracks on this device · '
  +publicTracks.length+' public tracks · '+approved.length+' approved stories · '
  +requestList.length+' song requests';
 $('radioAudio').hidden=!all.length;
 $('localHelp').textContent=localTracks.length
   ?'Selected local music stays in this tab only. Nothing has been uploaded to the website.'
   :'Choose your own downloaded Suno songs here to play immediately, without uploading, signing in or installing an APK.';
};
async function refreshCatalog(){
 const response=await fetch('catalog.json?ts='+Date.now(),{cache:'no-store'});
 if(!response.ok)throw Error('Music list unavailable: HTTP '+response.status);
 publicTracks=core.publicSongs(await response.json());
 lastCatalogRefresh=Date.now();info();
}
async function refreshIssues(){
 // Never read arbitrary public Issue bodies on air. Only a trusted server-side
 // moderation workflow can write approved-stories.json after human approval.
 // Even a compromised malformed snapshot is validated again in this browser.
 approved=[];
 try{
  const verified=await fetch('approved-stories.json?ts='+Date.now(),{cache:'no-store'});
  if(!verified.ok)throw Error('Approved story list unavailable');
  const entries=await verified.json();
  if(Array.isArray(entries)){
   const seen=new Set();
   approved=entries.filter(entry=>{
    if(!entry||!Number.isSafeInteger(entry.id)||entry.id<1||seen.has(entry.id))return false;
    if(typeof entry.name!=='string'||typeof entry.story!=='string')return false;
    if(entry.scheduledAt!==undefined&&entry.scheduledAt!==''
       &&(typeof entry.scheduledAt!=='string'
       ||!/^20\d{2}-\d{2}-\d{2}T\d{2}:\d{2}:00\.000Z$/.test(entry.scheduledAt)))return false;
    const check=globalThis.MaruStoryGuard.assess(entry.name,'Approved listener story',entry.story);
    if(!check.safe)return false;
    seen.add(entry.id);return true;
   }).slice(0,25);
  }
 }catch(e){
  approved=[]; // Fail closed; network outage never permits unreviewed stories.
 }
 try{
  const response=await fetch(repo+'/issues?state=open&per_page=100&sort=updated&direction=desc',{
   headers:{'Accept':'application/vnd.github+json'},cache:'no-store'
  });
  if(!response.ok)throw Error('Song requests unavailable');
  requestList=core.requests(await response.json(),publicTracks);
 }catch(e){requestList=[]}
 lastIssueRefresh=Date.now();info();
}
async function refreshFeeds(){
 if(Date.now()-lastCatalogRefresh>2*60*1000){
  try{await refreshCatalog()}catch(e){lastCatalogRefresh=Date.now();info()}
 }
 if(Date.now()-lastIssueRefresh>10*60*1000)await refreshIssues();
 if(Date.now()-lastDailyRefresh>50*60*1000)await refreshDaily();
}
async function refreshDaily() {
 try{
  const response=await fetch('broadcast-daily.json?ts='+Date.now(),{cache:'no-store'});
  if(!response.ok)throw Error('Daily weather/news unavailable');
  const content=await response.json();
  dailyData=content&&typeof content==='object'&&!Array.isArray(content)?content:null;
 }catch(e){dailyData=null}
 lastDailyRefresh=Date.now();
 const city=$('weatherCity').value||'Seoul';
 const facts=globalThis.MaruDailyFacts.facts(dailyData,city,episode,Date.now());
 $('dailySummary').textContent=facts.label
  +(facts.weather.length?' · '+city+' weather ready':' · Weather unavailable')
  +(facts.news.length?' · Current headlines ready':' · News unavailable');
 $('newsSource').href=facts.link||'https://www.bbc.com/news';
 $('newsSource').hidden=!facts.link;
}
function englishVoice(role){
 if(!('speechSynthesis' in window))return null;
 const all=window.speechSynthesis.getVoices().filter(v=>v.lang&&v.lang.toLowerCase().startsWith('en'));
 const local=all.filter(v=>v.localService!==false),voices=local.length?local:all;
 return role==='guest'&&voices.length>1?voices[1]:voices[0]||null;
}
function speak(line,session){
 return new Promise(resolve=>{
  if(session!==revision||!active){resolve();return}
  if(!('speechSynthesis' in window)){resolve();return}
  const speech=new SpeechSynthesisUtterance(line.text);
  speech.lang='en-US';
  speech.rate=line.who==='guest'?1.06:1.02;
  speech.pitch=line.who==='guest'?1.05:0.96;
  speech.volume=.95;
  const voice=englishVoice(line.who);if(voice)speech.voice=voice;
  let finished=false;
  const finish=()=>{if(finished)return;finished=true;clearTimeout(watchdog);resolve()};
  const watchdog=setTimeout(()=>{
   try{window.speechSynthesis.cancel()}catch(e){}
   finish();
  },17000);
  speech.onend=finish;speech.onerror=finish;
  $('currentLine').textContent=(line.who==='host'?'Ahwan: ':'Alex: ')+line.text;
  status('English radio · '+(line.who==='host'?'Ahwan':'Alex')+' speaking');
  try{window.speechSynthesis.speak(speech)}catch(e){finish()}
 });
}
function cancelSpeech(){try{if('speechSynthesis' in window)window.speechSynthesis.cancel()}catch(e){}}
function clearTimer(){if(dialogueTimer!==null){clearTimeout(dialogueTimer);dialogueTimer=null}}
function setButtons(isActive){start.disabled=isActive;stop.disabled=!isActive;skip.disabled=!isActive}
function nextStory(){
 return $('storiesEnabled').checked?core.dueStory(approved,usedStories,Date.now()):null;
}
async function announce(track,requested,session,onlyTalk){
 if(!$('talkEnabled').checked)return;
 const story=nextStory();
 const lines=onlyTalk
  ?core.talkEpisodeScript(episode,Date.now(),story)
  :core.episodeScript(track,episode,Date.now(),story,requested);
 // Weather and news are independent sourced facts. We never improvise
 // headlines or read stale feeds as today's breaking news.
 if($('dailyEnabled').checked&&globalThis.MaruDailyFacts){
  const city=$('weatherCity').value||'Seoul';
  const facts=globalThis.MaruDailyFacts.facts(dailyData,city,episode,Date.now());
  // One sourced briefing at a time, not a news bulletin before every song.
  // Episode is incremented before announce() is called.
  const brief=episode%6===1?[...facts.weather.slice(0,1),...facts.news.slice(0,1)]
    :episode%6===4?facts.news.slice(0,1):[];
  if(brief.length)lines.splice(Math.max(0,lines.length-(onlyTalk?0:1)),0,...brief);
  if(facts.link){$('newsSource').href=facts.link;$('newsSource').hidden=false}
 }
 for(const line of lines){
  if(session!==revision||!active)return;
  await speak(line,session);
 }
 if(story&&session===revision)usedStories.add(story.id);
}
async function nextEpisode(){
 if(!active)return;
 const session=++revision;
 clearTimer();cancelSpeech();audio.pause();audio.removeAttribute('src');audio.load();
 await refreshFeeds();
 if(session!==revision||!active)return;
 const list=playable();
 const choice=core.chooseTrack(list,episode,requestList,usedRequests);
 if(!choice){
  episode++;
  $('nowPlaying').textContent='English conversation · Ahwan & Alex';
  $('radioAudio').hidden=true;
  if(!$('talkEnabled').checked){
   status('No music files yet. Select Suno MP3 files, or enable English talk.');
   stopRadio();return;
  }
  if(!('speechSynthesis' in window)){
   status('Your browser does not offer speech synthesis. Choose songs to play music.');
   stopRadio();return;
  }
  await announce(null,false,session,true);
  if(session!==revision||!active)return;
  status('Talk-only mode · no audio tracks uploaded or selected');
  dialogueTimer=setTimeout(()=>{if(session===revision&&active)nextEpisode()},14000);
  return;
 }
 const track=choice.track;
 episode++;
 $('nowPlaying').textContent=String(track.title||'Untitled')+' · '+String(track.artist||'MARU');
 audio.hidden=false;
 await announce(track,choice.requested,session,false);
 if(session!==revision||!active)return;
 audio.src=track.audio;
 status('Now playing · '+String(track.title||'Untitled')
  +(track.local?' · private local file':' · public original'));
 try{
  await audio.play();
  if(choice.requested)usedRequests.add(track.id);
 }catch(e){
  if(session!==revision||!active)return;
  status('Playback may require pressing Play on the audio bar. If the file is broken, tap Next song.');
 }
}
function stopRadio(){
 active=false;revision++;clearTimer();cancelSpeech();
 audio.pause();audio.removeAttribute('src');audio.load();
 setButtons(false);
 $('currentLine').textContent='Stopped. Start again whenever you like.';
 status('Radio stopped · ready to restart');
}
function releaseLocal(){
 if(localTracks.length){
  const nowPlaying=audio.src;
  if(localTracks.some(x=>x.audio===nowPlaying))audio.pause();
  for(const track of localTracks){try{URL.revokeObjectURL(track.audio)}catch(e){}}
 }
 localTracks=[];unplayable.clear();info();
}
importFiles.addEventListener('change',()=>{
 const selected=core.localOriginals(importFiles.files,file=>URL.createObjectURL(file));
 releaseLocal();
 localTracks=selected;
 importFiles.value='';
 info();
 if(selected.length){
  status('Loaded '+selected.length+' local originals · tap Start radio. No upload or GitHub token needed.');
 }else{status('No supported MP3/WAV/M4A audio files selected.')}
 if(active)nextEpisode();
});
$('weatherCity').addEventListener('change',()=>{
 refreshDaily();
});
$('radioGenre').addEventListener('change',()=>{info();if(active)nextEpisode()});
clearFiles.addEventListener('click',()=>{
 if(active)stopRadio();
 releaseLocal();status('Private local playlist cleared from this tab. No files were deleted.');
});
start.addEventListener('click',()=>{
 if(active)return;
 active=true;setButtons(true);
 try{
  // Resume the user-selected voice while still in the user gesture.
  if('speechSynthesis' in window)window.speechSynthesis.resume();
 }catch(e){}
 nextEpisode();
});
skip.addEventListener('click',()=>{if(active)nextEpisode()});
stop.addEventListener('click',stopRadio);
audio.addEventListener('ended',()=>{if(active)nextEpisode()});
audio.addEventListener('error',()=>{
 if(!active||!audio.currentSrc)return;
 const failed=playable().find(x=>x.audio===audio.currentSrc||x.audio===audio.src);
 if(failed){
  unplayable.add(failed.id);info();
  status('Skipping an unreadable song. Other originals remain available.');
  dialogueTimer=setTimeout(()=>{if(active)nextEpisode()},700);
 }else status('Audio file could not be played. Press Next song to continue.');
});
window.addEventListener('pagehide',()=>{stopRadio();releaseLocal()});
document.addEventListener('visibilitychange',()=>{if(!document.hidden){info()}});
info();
refreshCatalog().then(refreshIssues).then(refreshDaily).then(()=>{
 status(publicTracks.length
  ?'Ready · start English radio or import your Suno original files'
  :'Ready · talk-only English radio available now. Import your Suno MP3 files for songs.');
}).catch(()=>status('Talk-only English radio ready. Select local MP3 files to listen without network access.'));
})();