(function(){
'use strict';
// PREVIEW IS PRIVATE: only a browser blob URL, never a fetch, upload or account request.
if(typeof document==='undefined'||typeof URL==='undefined'||typeof URL.createObjectURL!=='function')return;
const field=document.getElementById('audioFiles')||document.getElementById('audio');
const picker=document.getElementById('localPreviewChoose');
const audio=document.getElementById('localPreviewAudio');
const note=document.getElementById('localPreviewStatus');
if(!field||!picker||!audio||!note)return;
let objectUrl='';
function clean(){
 try{audio.pause()}catch(e){}
 audio.removeAttribute('src');
 try{audio.load()}catch(e){}
 if(objectUrl){URL.revokeObjectURL(objectUrl);objectUrl=''}
}
function preview(){
 clean();
 const files=Array.from(field.files||[]);
 const n=Number(picker.value);
 if(!picker.value||!Number.isSafeInteger(n)||n<0||n>=files.length){
  note.textContent='미리듣기할 음악 파일을 먼저 선택하세요.';return;
 }
 const file=files[n];
 if(!file||!file.size||!/^audio\//i.test(file.type||'audio/')&&!/\.(mp3|wav|m4a|aac|ogg|flac)$/i.test(file.name||'')){
  note.textContent='지원되는 음악 파일을 선택하세요.';return;
 }
 try{
  objectUrl=URL.createObjectURL(file);
  audio.src=objectUrl;
  audio.load();
  note.textContent=(n+1)+' / '+files.length+' · '+file.name+' · 이 미리듣기는 업로드되지 않습니다.';
 }catch(e){clean();note.textContent='이 브라우저에서 파일 미리듣기가 지원되지 않습니다.'}
}
function refresh(){
 clean();
 picker.replaceChildren();
 const placeholder=document.createElement('option');
 placeholder.value='';placeholder.textContent='미리듣기할 곡 선택';
 picker.appendChild(placeholder);
 const files=Array.from(field.files||[]);
 for(let i=0;i<files.length;i++){
  const item=document.createElement('option');
  item.value=String(i);item.textContent=(i+1)+'. '+files[i].name;
  picker.appendChild(item);
 }
 picker.disabled=files.length===0;
 if(files.length){picker.value='0';preview()}
 else{picker.value='';note.textContent='미리듣기는 휴대폰에서만 실행되며 서버에 음악이 전송되지 않습니다.'}
}
field.addEventListener('change',refresh);
picker.addEventListener('change',preview);
window.addEventListener('pagehide',clean);
refresh();
})();
