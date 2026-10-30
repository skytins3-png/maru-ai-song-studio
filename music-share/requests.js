(function(root){
'use strict';
function issueUrl(track,consent){
  if(!consent)throw Error('Please confirm that requests are public.');
  if(!track||typeof track.id!=='string'||!track.id||typeof track.audio!=='string'
     ||!track.audio.startsWith('tracks/'))throw Error('Select a published original track.');
  const title=String(track.title||'Original song').replace(/[\r\n]/g,' ').slice(0,100);
  const url=new URL('https://github.com/skytins3-png/maru-ai-song-studio/issues/new');
  url.searchParams.set('title','[REQUEST] '+title);
  url.searchParams.set('body',[
    '## MARU RADIO song request',
    'Track ID: '+track.id,
    'Requested song: '+title,
    '',
    '- [x] I understand this is a public request on GitHub.',
    '',
    'Only an original already approved in the public music catalog can be played.'
  ].join('\n'));
  return url.href;
}
root.MaruSongRequest={issueUrl};
if(typeof document==='undefined')return;
const $=id=>document.getElementById(id);
let tracks=[];
(async()=>{
 try{
  const response=await fetch('catalog.json?ts='+Date.now(),{cache:'no-store'});
  if(!response.ok)throw Error('Unable to load the public music list');
  tracks=root.MaruRadioCore.publicSongs(await response.json());
  const select=$('requestSong');
  select.replaceChildren();
  const option=document.createElement('option');option.value='';option.textContent=tracks.length?'Choose a song':'No public songs yet';
  select.appendChild(option);
  for(const track of tracks){
   const item=document.createElement('option');item.value=track.id;
   item.textContent=String(track.title||'Untitled').slice(0,120)+' · '+String(track.artist||'MARU').slice(0,70);
   select.appendChild(item);
  }
  $('submitRequest').disabled=!tracks.length;
 }catch(e){$('requestStatus').textContent='Unable to load public songs: '+e.message;$('submitRequest').disabled=true}
})();
$('requestForm').addEventListener('submit',event=>{
 event.preventDefault();
 try{
  const id=$('requestSong').value;
  const track=tracks.find(x=>x.id===id);
  const url=issueUrl(track,$('requestConsent').checked);
  $('requestStatus').textContent='Opening GitHub. Sign in and click Submit new issue to actually request the song.';
  window.location.assign(url);
 }catch(e){$('requestStatus').textContent=e.message}
});
})(typeof globalThis!=='undefined'?globalThis:this);
