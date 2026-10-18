"use strict";
let ARTISTS=[], selected=null, queue=[], queueIndex=-1, playingUrl=null, database=null;
const E=id=>document.getElementById(id);
const groupOrder=["F3","M7","FS","MS"];
function say(message){ E("status").textContent=message; }
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
async function db(){
 if(database)return database;
 if(!("indexedDB" in window))throw new Error("이 브라우저는 로컬 음원 저장을 지원하지 않습니다.");
 database=await new Promise((resolve,reject)=>{
  const request=indexedDB.open("maru-studio-original-vocals-v1",1);
  request.onupgradeneeded=()=>request.result.createObjectStore("samples",{keyPath:"id"});
  request.onsuccess=()=>resolve(request.result);
  request.onerror=()=>reject(request.error);
 });
 return database;
}
async function sample(id){
 const d=await db();
 return await new Promise((resolve,reject)=>{
  const r=d.transaction("samples","readonly").objectStore("samples").get(id);
  r.onsuccess=()=>resolve(r.result||null); r.onerror=()=>reject(r.error);
 });
}
async function putSample(id,file){
 const d=await db();
 return await new Promise((resolve,reject)=>{
  const t=d.transaction("samples","readwrite");
  t.objectStore("samples").put({id,name:file.name,mime:file.type,blob:file,at:Date.now()});
  t.oncomplete=resolve;t.onerror=()=>reject(t.error);t.onabort=()=>reject(t.error||Error("저장 취소"));
 });
}
async function removeSample(id){
 const d=await db();
 return await new Promise((resolve,reject)=>{
  const t=d.transaction("samples","readwrite");
  t.objectStore("samples").delete(id);t.oncomplete=resolve;t.onerror=()=>reject(t.error);
 });
}
function card(a){return '<article class="artist"><div class="artist-head"><span class="tag">'+escapeHtml(a.groupLabel)+'</span><span class="tag alt">'+escapeHtml(a.range)+'</span></div><h3>'+escapeHtml(a.name)+'</h3><p>'+escapeHtml(a.genre)+'</p><small>'+escapeHtml(a.timbre)+'</small><div class="actions"><button data-action="select" data-id="'+a.id+'">가수 보기</button><button data-action="copy" data-id="'+a.id+'">Suno 스타일 복사</button><button data-action="queue" data-id="'+a.id+'">방송 목록에 추가</button></div></article>';}
function render(){
 const q=E("query").value.trim().toLowerCase(), group=E("group").value;
 E("cards").innerHTML=ARTISTS.filter(a=>(group==="ALL"||group===a.group)&&[a.name,a.genre,a.timbre].join(" ").toLowerCase().includes(q)).map(card).join("")||"<p>일치하는 가수가 없습니다.</p>";
}
function view(a){
 selected=a;
 E("selected").textContent=a.name+" · "+a.groupLabel+" · "+a.part;
 E("vocalDetail").textContent="장르: "+a.genre+"\n음색: "+a.timbre+"\n음역: "+a.range+"\n창법: "+a.delivery+"\n편곡: "+a.instruments+"\n언어: "+a.language+"\n상태: "+a.voiceStatus+"\n권리: "+a.rightsStatus;
 E("prompt").value=a.stylePrompt;
 E("localSong").textContent="해당 가수의 노래 파일을 등록하면 이곳에서 미리듣기 가능";
 E("sampleFile").value="";
 sample(a.id).then(s=>{if(selected===a && s)E("localSong").textContent="등록된 샘플: "+s.name;}).catch(e=>say("로컬 파일 조회 실패: "+e.message));
}
async function copyText(s){
 try{await navigator.clipboard.writeText(s);say("Suno 스타일 복사 완료");}
 catch(e){E("prompt").focus();E("prompt").select();say("클립보드 접근 실패 · 아래 선택된 스타일을 길게 눌러 복사하세요.");}
}
function cleanupUrl(){if(playingUrl){URL.revokeObjectURL(playingUrl);playingUrl=null;}}
async function playSample(id){
 const a=ARTISTS.find(a=>a.id===id);
 const s=await sample(id);
 if(!s){say(a.name+" 노래가 아직 등록되지 않았어요. 아래에서 MP3/WAV/M4A를 등록해 주세요.");return false;}
 const player=E("player");player.pause();cleanupUrl();
 playingUrl=URL.createObjectURL(s.blob);player.src=playingUrl;E("nowPlaying").textContent=a.name+" — "+s.name;
 try{await player.play();say("재생 중: "+a.name);return true;}catch(e){say("재생이 차단되거나 코덱을 지원하지 않습니다. 재생 버튼을 눌러보세요.");return false;}
}
function renderQueue(){E("queue").innerHTML=queue.length?queue.map((id,i)=>{
 const a=ARTISTS.find(a=>a.id===id);return "<li>"+(i===queueIndex?"▶ ":"")+(i+1)+". "+escapeHtml(a.name)+"</li>";
 }).join(""):"<li>아직 편성된 가수가 없습니다.</li>";}
async function playIndex(i){
 if(i>=queue.length){E("player").pause();queueIndex=-1;renderQueue();say("방송용 미리듣기 편성 종료");return;}
 queueIndex=i;renderQueue();
 const ok=await playSample(queue[i]);
 if(!ok && i+1<queue.length) say("현재 순서의 파일이 없습니다. 다음 곡 버튼으로 이동할 수 있습니다.");
}
function getFileDownload(name,content,mime){
 const url=URL.createObjectURL(new Blob([content],{type:mime}));
 const a=document.createElement("a");a.href=url;a.download=name;document.body.append(a);a.click();a.remove();
 setTimeout(()=>URL.revokeObjectURL(url),3000);
}
document.addEventListener("DOMContentLoaded",async()=>{
 try{
  const response=await fetch("./artists.json",{cache:"no-store"});
  if(!response.ok)throw Error("명단 파일을 불러올 수 없습니다.");
  const roster=await response.json();ARTISTS=roster.artists;
  if(ARTISTS.length!==30)throw Error("가수 수가 30명이 아닙니다.");
  E("count").textContent="여성 13명 · 남성 17명 · 총 "+ARTISTS.length+"명";
  E("cards").addEventListener("click",async e=>{
    const button=e.target.closest("button[data-action]");if(!button)return;
    const a=ARTISTS.find(x=>x.id===button.dataset.id);if(!a)return;
    if(button.dataset.action==="select"){view(a);E("detail").scrollIntoView({behavior:"smooth",block:"start"});}
    if(button.dataset.action==="copy"){view(a);await copyText(a.stylePrompt);}
    if(button.dataset.action==="queue"){queue.push(a.id);renderQueue();say(a.name+" · 방송 미리듣기 목록에 추가");}
  });
  E("query").addEventListener("input",render);E("group").addEventListener("change",render);
  E("copyCurrent").onclick=()=>selected&&copyText(E("prompt").value);
  E("sampleFile").onchange=async e=>{
    const file=e.target.files&&e.target.files[0];
    if(!selected||!file)return;
    if(!E("rights").checked){say("먼저 해당 음원의 방송·저장 사용 권한을 확인하고 체크해 주세요.");e.target.value="";return;}
    if(!/\.(mp3|wav|m4a|aac|ogg|flac)$/i.test(file.name)){say("음악 파일(mp3/wav/m4a/aac/ogg/flac)만 등록할 수 있습니다.");return;}
    if(file.size>50*1024*1024){say("로컬 샘플은 한 파일당 50MB 이하로 등록해 주세요.");return;}
    try{await putSample(selected.id,file);E("localSong").textContent="등록된 샘플: "+file.name;say(selected.name+" 음원 기기에 보관 완료 · 서버 업로드 없음");}
    catch(err){say("로컬 저장 실패(저장 공간/시크릿모드 확인): "+err.message);}
  };
  E("playCurrent").onclick=async()=>{if(selected)try{await playSample(selected.id);}catch(err){say(err.message);}};
  E("removeCurrent").onclick=async()=>{if(!selected)return;if(!confirm(selected.name+" 등록 샘플을 이 브라우저에서 삭제할까요?"))return;try{await removeSample(selected.id);E("localSong").textContent="등록된 샘플 없음";say("로컬 샘플 삭제 완료");}catch(err){say(err.message);}};
  E("queuePlay").onclick=()=>queue.length&&playIndex(0).catch(e=>say(e.message));
  E("queueNext").onclick=()=>queue.length&&playIndex(queueIndex<0?0:queueIndex+1).catch(e=>say(e.message));
  E("queueClear").onclick=()=>{queue=[];queueIndex=-1;E("player").pause();cleanupUrl();E("player").removeAttribute("src");renderQueue();say("미리듣기 편성 목록 초기화");};
  E("player").addEventListener("ended",()=>{if(queueIndex>=0)playIndex(queueIndex+1).catch(e=>say(e.message));});
  E("export").onclick=()=>getFileDownload("maru-studio-30-vocals.json",JSON.stringify({studio:"MARU STUDIO",artists:ARTISTS,notice:"가수 보컬 설계. 실제 노래 음원 또는 법적 사용 허가를 포함하지 않음."},null,2),"application/json");
  render();renderQueue();view(ARTISTS[0]);say("30명 보컬 설정 등록 완료 · 실제 노래 음원은 아직 업로드되지 않았습니다.");
 }catch(err){say("초기화 실패: "+err.message);}
});
