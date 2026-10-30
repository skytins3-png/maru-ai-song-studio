(function(){
'use strict';
const core=globalThis.MaruRadioCore, $=id=>document.getElementById(id);
const audio=$('radioAudio'),start=$('startRadio'),stop=$('stopRadio'),skip=$('skipRadio');
const repo='https://api.github.com/repos/skytins3-png/maru-ai-song-studio';
let tracks=[],approved=[],requestList=[],episode=0,active=false,revision=0;
let usedStories=new Set(),usedRequests=new Set(),currentSongId='';
let lastCatalogRefresh=0,lastIssueRefresh=0;
const status=message=>{$('status').textContent=message};
const info=()=>{$('radioCounts').textContent=tracks.length+' public tracks · '+approved.length+' approved stories · '+requestList.length+' requested tracks'};
const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));
async function refreshCatalog(){
  const response=await fetch('catalog.json?ts='+Date.now(),{cache:'no-store'});
  if(!response.ok)throw Error('Music list unavailable: HTTP '+response.status);
  const songs=core.publicSongs(await response.json());
  tracks=songs;lastCatalogRefresh=Date.now();info();
}
async function refreshIssues(){
  try{
    const response=await fetch(repo+'/issues?state=open&per_page=100&sort=updated&direction=desc',{headers:{'Accept':'application/vnd.github+json'},cache:'no-store'});
    if(!response.ok)throw Error('GitHub issues temporarily unavailable');
    const issues=await response.json();
    approved=core.approvedStories(issues);
    requestList=core.requests(issues,tracks);
    lastIssueRefresh=Date.now();info();
  }catch(error){status('Music ready · public stories/requests temporarily unavailable. You can still listen.');}
}
async function refreshFeeds(){
  if(Date.now()-lastCatalogRefresh>2*60*1000)await refreshCatalog();
  if(Date.now()-lastIssueRefresh>10*60*1000)await refreshIssues();
}
function englishVoice(role){
  if(!('speechSynthesis' in window))return null;
  const all=window.speechSynthesis.getVoices().filter(v=>v.lang&&v.lang.toLowerCase().startsWith('en'));
  const local=all.filter(v=>v.localService!==false),voices=local.length?local:all;
  return role==='guest'&&voices.length>1?voices[1]:voices[0]||null;
}
function speak(line,myRevision){
  return new Promise(resolve=>{
    if(myRevision!==revision||!active){resolve();return}
    if(!('speechSynthesis' in window)){resolve();return}
    const utterance=new SpeechSynthesisUtterance(line.text);
    utterance.lang='en-US';
    utterance.rate=line.who==='guest'?1.02:0.95;
    utterance.pitch=line.who==='guest'?1.08:0.92;
    utterance.volume=0.95;
    const voice=englishVoice(line.who);if(voice)utterance.voice=voice;
    let completed=false;
    const finish=()=>{if(completed)return;completed=true;clearTimeout(limit);resolve()};
    const limit=setTimeout(()=>{try{window.speechSynthesis.cancel()}catch(e){}finish()},15000);
    utterance.onend=finish;utterance.onerror=finish;
    $('currentLine').textContent=(line.who==='host'?'Ahwan: ':'Alex: ')+line.text;
    status('English radio conversation · '+(line.who==='host'?'Ahwan':'Alex'));
    try{window.speechSynthesis.speak(utterance)}catch(e){finish()}
  });
}
function cancelSpeech(){try{if('speechSynthesis' in window)window.speechSynthesis.cancel()}catch(e){}}
async function announce(track,isRequested,myRevision){
  if(!$('talkEnabled').checked)return;
  const story=$('storiesEnabled').checked?approved.find(x=>!usedStories.has(x.id)):null;
  const lines=core.episodeScript(track,episode,Date.now(),story,isRequested);
  for(const line of lines){
    if(myRevision!==revision||!active)return;
    await speak(line,myRevision);
  }
  if(story&&myRevision===revision)usedStories.add(story.id);
}
function setButtons(playing){
  start.disabled=playing;stop.disabled=!playing;skip.disabled=!playing;
}
async function nextEpisode(){
  if(!active)return;
  const myRevision=++revision;
  cancelSpeech();audio.pause();audio.removeAttribute('src');audio.load();
  try{await refreshFeeds()}catch(e){status('Cannot load published music. '+e.message);stopRadio();return}
  if(!active||myRevision!==revision)return;
  const choice=core.chooseTrack(tracks,episode,requestList,usedRequests);
  if(!choice){
    status('No creator-approved tracks yet. Upload a permitted original through MUSIC SHARE.');
    $('nowPlaying').textContent='Playlist is empty';
    stopRadio();return;
  }
  const track=choice.track;
  currentSongId=track.id;episode++;
  $('nowPlaying').textContent=(track.title||'Untitled')+' · '+(track.artist||'MARU');
  await announce(track,choice.requested,myRevision);
  if(!active||myRevision!==revision)return;
  audio.src=track.audio;
  status('Playing original music · '+(track.title||'Untitled'));
  if(choice.requested)usedRequests.add(track.id);
  try{await audio.play()}
  catch(e){
    if(!active||myRevision!==revision)return;
    status('Playback needs a tap, or this file cannot play in the browser. Press the audio play button or Next song.');
  }
}
function stopRadio(){
  active=false;revision++;cancelSpeech();audio.pause();audio.removeAttribute('src');audio.load();
  setButtons(false);
  $('currentLine').textContent='Radio stopped. Start again whenever you like.';
}
start.addEventListener('click',()=>{
  if(active)return;active=true;setButtons(true);
  nextEpisode();
});
skip.addEventListener('click',()=>{if(active)nextEpisode()});
stop.addEventListener('click',stopRadio);
audio.addEventListener('ended',()=>{if(active)nextEpisode()});
audio.addEventListener('error',()=>{if(active)status('This audio file did not load. Check its published format, then press Next song.')});
document.addEventListener('visibilitychange',()=>{
  if(!document.hidden&&active){info()}
});
refreshCatalog().then(refreshIssues).then(()=>{
  status(tracks.length?'Ready · tap Start radio to begin':'No public tracks yet · upload original music first');
}).catch(e=>status('Unable to load public library. '+e.message));
})();