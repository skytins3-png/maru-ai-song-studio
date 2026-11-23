"use strict";
(function(){
const C=window.MaruMobileSunoCore,$=id=>document.getElementById(id);
if(!C){$("importStatus").textContent="오디오 검사 라이브러리 오류";return}
const DB="maru-suno-mobile-v1";
let dbPromise=null, importing=false, musicUrl=null, voiceUrl=null, recording=null, recordedFile=null;
let selected=new Set();
const MAX_FILES=500;
const hostNames=C.HOSTS;
function report(id,msg){$(id).textContent=msg}
function node(tag,content){const e=document.createElement(tag);if(content!==undefined)e.textContent=content;return e}
function btn(label,handler,alternate=false){const b=node("button",label);b.type="button";if(alternate)b.className="secondary";b.addEventListener("click",handler);return b}
function populate(){
  for(const id of ["importSinger","voiceSinger"]){
    const s=$(id);s.replaceChildren();
    if(id==="importSinger")s.add(new Option("파일명으로 추정 · 미지정 가능",""));
    C.SINGERS.forEach(a=>s.add(new Option(a.id+" · "+a.name+" · "+a.group,a.id)));
  }
  const voices=$("cueSpeaker");
  hostNames.forEach(name=>voices.add(new Option("진행자 · "+name,name)));
  C.SINGERS.forEach(a=>voices.add(new Option("가수 · "+a.name,a.name)));
}
function dbOpen(){
 if(dbPromise)return dbPromise;
 dbPromise=new Promise((resolve,reject)=>{
  if(!window.indexedDB){reject(Error("이 브라우저는 로컬 저장소 IndexedDB를 사용할 수 없습니다."));return}
  const req=indexedDB.open(DB,1);
  req.onupgradeneeded=()=>{
   const db=req.result;
   for(const store of ["songs","vocals","cues"]){
    if(!db.objectStoreNames.contains(store))db.createObjectStore(store,{keyPath:"id"});
   }
  };
  req.onsuccess=()=>{const db=req.result;db.onversionchange=()=>{db.close();dbPromise=null};resolve(db)};
  req.onerror=()=>{dbPromise=null;reject(req.error||Error("저장소를 열지 못했습니다."))};
  req.onblocked=()=>{dbPromise=null;reject(Error("다른 화면에서 보관함이 열려 있습니다. 닫고 다시 시도해 주세요."))};
 });
 return dbPromise;
}
async function dbGet(store,key){
 const db=await dbOpen();
 return new Promise((resolve,reject)=>{
  const tx=db.transaction(store,"readonly");
  const req=tx.objectStore(store).get(key);
  req.onsuccess=()=>resolve(req.result||null);
  req.onerror=()=>reject(req.error||Error("조회 실패"));
 });
}
async function dbAll(store){
 const db=await dbOpen();
 return new Promise((resolve,reject)=>{
  const tx=db.transaction(store,"readonly");
  const req=tx.objectStore(store).getAll();
  req.onsuccess=()=>resolve(req.result||[]);
  req.onerror=()=>reject(req.error||Error("조회 실패"));
 });
}
async function dbPut(store,data){
 const db=await dbOpen();
 return new Promise((resolve,reject)=>{
  const tx=db.transaction(store,"readwrite");
  tx.objectStore(store).put(data);
  tx.oncomplete=()=>resolve();
  tx.onabort=()=>reject(tx.error||Error("저장 실패: 휴대폰 공간 부족 또는 브라우저 정책"));
  tx.onerror=()=>reject(tx.error||Error("쓰기 오류"));
 });
}
async function dbDelete(store,key){
 const db=await dbOpen();
 return new Promise((resolve,reject)=>{
  const tx=db.transaction(store,"readwrite");
  tx.objectStore(store).delete(key);
  tx.oncomplete=()=>resolve();
  tx.onerror=()=>reject(tx.error||Error("삭제 실패"));
  tx.onabort=()=>reject(tx.error||Error("삭제 취소"));
 });
}
function inferMime(file,format){
 return file.type&&file.type.startsWith("audio/")?file.type:
  ({mp3:"audio/mpeg",wav:"audio/wav",m4a:"audio/mp4",ogg:"audio/ogg",flac:"audio/flac",webm:"audio/webm"})[format]||"application/octet-stream";
}
function onSelectedFiles(){
 const list=[...$("files").files,...$("folder").files];
 const candidates=list.filter(f=>C.eligible(f));
 report("importStatus",list.length+"개 선택 · 등록 가능한 오디오 "+candidates.length+"개. '파일 추가·중복 검사'를 눌러야 실제 저장됩니다.");
}
async function importAll(){
 if(importing){report("importStatus","이전 가져오기를 완료한 뒤 실행해 주세요.");return}
 if(!$("confirmRights").checked){report("importStatus","본인 음원의 사용 권한을 먼저 체크해 주세요.");return}
 const files=[...$("files").files,...$("folder").files];
 if(!files.length){report("importStatus","음원을 선택하지 않았습니다. 휴대폰의 FTF-Music 또는 Download 폴더에서 골라 주세요.");return}
 if(files.length>MAX_FILES){report("importStatus","한 번에 최대 "+MAX_FILES+"곡만 검사합니다.");return}
 importing=true;$("importFiles").disabled=true;
 let saved=0,duplicates=0,skipped=0,failed=0;
 const chosenSinger=$("importSinger").value;
 try{
  for(let i=0;i<files.length;i++){
   const f=files[i];
   if(!C.eligible(f)){skipped++;continue}
   try{
    const signature=C.soundFormat(new Uint8Array(await f.slice(0,20).arrayBuffer()));
    const ext=(f.name.split(".").pop()||"").toLowerCase();
    // Reject misleading extensions, which can otherwise be exported under the wrong codec.
    if(!["mp3","wav","m4a","ogg","flac"].includes(signature)&&!(ext==="aac"&&f.type.startsWith("audio/"))){skipped++;continue}
    const sha=await C.hashBlob(f);
    if(await dbGet("songs",sha)){duplicates++;continue}
    const singerId=chosenSinger||C.chooseSinger(f.name);
    const row={id:sha,name:f.name.slice(0,180),blob:f,size:f.size,
      type:inferMime(f,signature),codec:signature==="unknown"?"aac":signature,
      singerId,title:C.safeTitle(f.name),createdAt:new Date().toISOString(),
      source:"user-selected-phone-file",rightsUserConfirmed:true};
    await dbPut("songs",row);
    saved++;
   }catch(err){
    failed++;
    report("importStatus","등록 중 "+(i+1)+"/"+files.length+" · 저장 "+saved+" · 오류 "+failed+" · "+String(err.message||err).slice(0,130));
   }
  }
  report("importStatus","실제 저장 완료 "+saved+"곡 / 이미 등록된 동일 파일 "+duplicates+"곡 / 형식 불일치 또는 비오디오 "+skipped+"곡 / 저장 오류 "+failed+"곡.\n저장하지 못한 파일은 원래 휴대폰에 그대로 남아 있습니다.");
  $("files").value="";$("folder").value="";
  await refreshSongs();
 }finally{importing=false;$("importFiles").disabled=false;await quota()}
}
async function quota(){
 if(!navigator.storage?.estimate){$("quota").textContent="저장 공간 표시를 지원하지 않는 브라우저입니다.";return}
 try{const q=await navigator.storage.estimate();
  const pretty=n=>Number.isFinite(n)?(n/1048576).toFixed(1)+"MB":"알 수 없음";
  $("quota").textContent="현재 사이트 저장 사용량 "+pretty(q.usage)+" / 기기 할당량 "+pretty(q.quota)+" · 브라우저 저장소 삭제 시 음악도 지워질 수 있음";
 }catch(e){$("quota").textContent="저장 용량을 확인할 수 없습니다: "+e.message}
}
async function persist(){
 if(!navigator.storage?.persist){report("importStatus","브라우저에서 영구 보관 요청을 지원하지 않습니다. 원본 파일을 별도로 유지하세요.");return}
 const allowed=await navigator.storage.persist();
 report("importStatus",allowed?"브라우저가 보관 요청을 허용했습니다. 그래도 원본 MP3를 삭제하지 마세요.":"브라우저가 영구 보관 요청을 허용하지 않았습니다. 원본 파일을 반드시 보관하세요.");
 await quota();
}
function releaseAudio(which){
 const player=$(which==="voice"?"voicePlayer":"musicPlayer"), url=which==="voice"?voiceUrl:musicUrl;
 player.pause();player.removeAttribute("src");player.load();
 if(url)URL.revokeObjectURL(url);
 if(which==="voice")voiceUrl=null;else musicUrl=null;
}
async function playSong(id){
 const row=await dbGet("songs",id);
 if(!row?.blob){report("importStatus","음원 파일이 보관함에 없습니다.");return}
 releaseAudio("music");
 musicUrl=URL.createObjectURL(row.blob);
 $("musicPlayer").src=musicUrl;
 try{await $("musicPlayer").play()}catch(err){report("importStatus","플레이어의 ▶ 버튼을 직접 눌러 주세요: "+err.message)}
}
async function removeSong(id){
 const row=await dbGet("songs",id);
 if(!row||!confirm(row.name+" 곡을 이 브라우저 보관함에서 지울까요?\n갤럭시 원본 MP3는 삭제하지 않습니다."))return;
 await dbDelete("songs",id);selected.delete(id);releaseAudio("music");await refreshSongs();
}
async function changeSinger(id,singerId){
 if(!C.knownSinger(singerId))throw Error("가수 ID 오류");
 const row=await dbGet("songs",id);
 if(!row)throw Error("보관함 곡 찾기 실패");
 row.singerId=singerId;await dbPut("songs",row);
 report("importStatus",row.name+" → "+(C.SINGERS.find(s=>s.id===singerId)?.name||"가수 미지정")+" 로 저장했습니다.");
}
async function refreshSongs(){
 const items=await dbAll("songs");
 items.sort((a,b)=>String(a.name).localeCompare(String(b.name),"ko"));
 $("librarySummary").textContent="브라우저에 실제 등록된 노래 "+items.length+"곡 · 가수 연결 "+items.filter(x=>x.singerId).length+"곡 · 가수명만 등록된 상태는 아님";
 const list=$("songs");list.replaceChildren();
 if(!items.length){list.append(node("p","아직 음원이 등록되지 않았습니다. FTF-Music / Download 폴더에서 실제 파일을 선택해 주세요."));return}
 for(const row of items){
  const div=node("div");div.className="song";
  const title=node("div",row.title||row.name);title.className="name";div.append(title);
  const size=(row.blob?.size/1048576||0).toFixed(2);
  const meta=node("div",row.name+" · "+size+"MB · "+row.codec+" · SHA-256 "+row.id.slice(0,12));meta.className="meta";div.append(meta);
  const controls=node("div");controls.className="controls";
  controls.append(btn("▶ 실제 재생",()=>playSong(row.id)));
  controls.append(btn("보관함에서 제거",()=>removeSong(row.id),true));
  const cb=node("label");cb.className="check";const select=node("input");select.type="checkbox";select.checked=selected.has(row.id);
  select.addEventListener("change",()=>{if(select.checked)selected.add(row.id);else selected.delete(row.id)});
  cb.append(select,node("span","공유 대상으로 선택"));controls.append(cb);div.append(controls);
  const selectSinger=node("select");selectSinger.setAttribute("aria-label",row.title+" 가수 지정");
  selectSinger.add(new Option("가수 미지정",""));
  C.SINGERS.forEach(a=>selectSinger.add(new Option(a.id+" · "+a.name,a.id)));
  selectSinger.value=C.knownSinger(row.singerId)?row.singerId:"";
  selectSinger.addEventListener("change",()=>changeSinger(row.id,selectSinger.value).catch(err=>report("importStatus",err.message)));
  div.append(selectSinger);list.append(div);
 }
}
async function manifest(){
 const rows=await dbAll("songs");
 const output={format:"MARU_SUNO_MOBILE_MANIFEST_V1",createdAt:new Date().toISOString(),
  songCount:rows.length,containsAudio:false,
  songs:rows.map(x=>({sha256:x.id,fileName:x.name,title:x.title,
    singerId:x.singerId,bytes:x.blob?.size||0,codec:x.codec,importedAt:x.createdAt}))};
 downloadJSON("MARU-SUNO-목록-"+new Date().toISOString().slice(0,10)+".json",output);
}
function downloadJSON(name,x){
 const u=URL.createObjectURL(new Blob([JSON.stringify(x,null,2)],{type:"application/json"}));
 const a=node("a");a.href=u;a.download=name;document.body.append(a);a.click();a.remove();
 setTimeout(()=>URL.revokeObjectURL(u),5000);
}
async function saveVocal(){
 if(!$("confirmRights").checked){report("vocalStatus","노래 권리 확인이 필요합니다.");return}
 const file=$("vocalFile").files?.[0],singerId=$("voiceSinger").value;
 if(!file||!C.eligible(file)){report("vocalStatus","20초 이상 등 유효한 Suno 보컬 분리 파일을 먼저 선택하세요.");return}
 try{
  const row={id:singerId,name:file.name,blob:file,sha256:await C.hashBlob(file),
   singerId,createdAt:new Date().toISOString(),kind:"vocal_reference_only",voiceModelCreated:false};
  await dbPut("vocals",row);$("vocalFile").value="";
  await showVoiceStatus();report("vocalStatus",C.SINGERS.find(x=>x.id===singerId).name+" 보컬 참조 실제 저장됨 · 새 문장 음성 합성 모델은 생성되지 않음");
 }catch(err){report("vocalStatus","보컬 파일 저장 실패: "+err.message)}
}
async function showVoiceStatus(){
 const data=await dbAll("vocals");
 report("vocalStatus","가수 보컬 참조 등록 "+data.length+"/30명 · 즉석 말하기 음성 모델 0/30명");
}
async function playVocal(){
 const row=await dbGet("vocals",$("voiceSinger").value);
 if(!row?.blob){report("vocalStatus","선택한 가수의 보컬 참조 파일이 없습니다.");return}
 releaseAudio("voice");voiceUrl=URL.createObjectURL(row.blob);
 $("voicePlayer").src=voiceUrl;
 try{await $("voicePlayer").play()}catch(e){report("vocalStatus","▶을 직접 눌러 주세요: "+e.message)}
}
function currentCue(){return {speaker:$("cueSpeaker").value,text:$("cueText").value.replace(/\s+/g," ").trim()}}
async function saveCue(){
 if(!$("cueRights").checked){report("cueStatus","화자의 녹음·방송 사용 허락을 먼저 확인해 주세요.");return}
 const {speaker,text}=currentCue();
 if(text.length<5||text.length>240){report("cueStatus","녹음된 정확한 문장을 5~240자로 입력해 주세요.");return}
 const file=recordedFile||$("cueFile").files?.[0];
 if(!file||!C.eligible(file,{cue:true})){report("cueStatus","20MB 이하의 실제 녹음 파일을 선택하거나 마이크 녹음을 먼저 해 주세요.");return}
 try{
  await dbPut("cues",{
   id:C.cueKey(speaker,text),speaker,text,name:file.name,blob:file,
   sha256:await C.hashBlob(file),createdAt:new Date().toISOString(),rightsUserConfirmed:true,
   source:recordedFile?"user-recorded-microphone":"user-selected-recording"
  });
  $("cueFile").value="";recordedFile=null;
  report("cueStatus",speaker+" · 녹음 멘트가 실제로 저장되었습니다. MARU RADIO에서 같은 화자·똑같은 문장이면 해당 녹음을 재생합니다.");
 }catch(err){report("cueStatus","녹음 등록 실패: "+err.message)}
}
async function playCue(){
 const {speaker,text}=currentCue(),row=await dbGet("cues",C.cueKey(speaker,text));
 if(!row?.blob){report("cueStatus","현재 화자/문장에 저장된 실제 녹음이 없습니다.");return}
 releaseAudio("voice");voiceUrl=URL.createObjectURL(row.blob);$("voicePlayer").src=voiceUrl;
 try{await $("voicePlayer").play()}catch(err){report("cueStatus","플레이어 ▶을 직접 눌러 주세요: "+err.message)}
}
async function startRecording(){
 if(recording){report("cueStatus","현재 녹음 중입니다.");return}
 if(!navigator.mediaDevices?.getUserMedia||!window.MediaRecorder){report("cueStatus","이 브라우저에서 마이크 녹음을 지원하지 않습니다.");return}
 if(!$("cueRights").checked){report("cueStatus","먼저 본인 목소리/방송 사용권 확인을 선택해 주세요.");return}
 try{
  const stream=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:true,noiseSuppression:true}});
  const type=MediaRecorder.isTypeSupported("audio/webm;codecs=opus")?"audio/webm;codecs=opus":
    MediaRecorder.isTypeSupported("audio/mp4")?"audio/mp4":"";
  const recorder=new MediaRecorder(stream,type?{mimeType:type}:undefined);
  const chunks=[];
  recorder.ondataavailable=e=>{if(e.data.size)chunks.push(e.data)};
  recorder.onerror=e=>report("cueStatus","마이크 녹음 오류: "+(e.error?.message||"알 수 없음"));
  recorder.onstop=()=>{
   stream.getTracks().forEach(track=>track.stop());
   const mime=recorder.mimeType||"audio/webm";
   const extension=mime.includes("mp4")?"m4a":"webm";
   recordedFile=new File(chunks,("MARU-CUE-"+Date.now()+"."+extension),{type:mime});
   recording=null;$("startCueRecording").disabled=false;$("stopCueRecording").disabled=true;
   report("cueStatus","마이크 녹음 파일 "+(recordedFile.size/1024).toFixed(1)+"KB 준비됨. '선택한 멘트 저장' 버튼으로 문장에 연결해 주세요. 이 파일은 "+extension.toUpperCase()+"이며 MP3라고 표시하지 않습니다.");
  };
  recorder.start(1000);recording={recorder,stream};
  $("startCueRecording").disabled=true;$("stopCueRecording").disabled=false;
  report("cueStatus","실제 마이크 녹음 중 · 멈춤 버튼을 눌러 종료해 주세요.");
 }catch(e){report("cueStatus","마이크 시작 실패: "+e.message)}
}
function stopRecording(){if(recording){recording.recorder.stop()}}
async function share(){
 const ids=[...selected].slice(0,10);
 if(!ids.length){report("shareStatus","먼저 등록된 곡 목록에서 공유 대상으로 선택해 주세요.");return}
 const files=[];
 for(const id of ids){
  const row=await dbGet("songs",id);
  if(row?.blob)files.push(new File([row.blob],row.name,{type:row.type||"audio/mpeg"}));
 }
 if(!files.length){report("shareStatus","공유할 실제 음원 파일이 저장되어 있지 않습니다.");return}
 if(!navigator.share||navigator.canShare&&!navigator.canShare({files})){
  report("shareStatus","이 브라우저는 Android 파일 공유를 지원하지 않습니다. 갤럭시 '내 파일'에서 원본을 선택한 뒤 '공유 → MARU RADIO'를 이용하세요.");return;
 }
 try{
  await navigator.share({title:"MARU SUNO · 등록된 원본 오디오",files});
  report("shareStatus","Android 공유 메뉴를 처리했습니다. 설치된 MARU RADIO에서 곡이 등록됐는지 확인해야 합니다. BIGO 송출은 확인하지 않았습니다.");
 }catch(e){report("shareStatus",e.name==="AbortError"?"공유가 취소됐습니다.":"Android 공유 실패: "+e.message)}
}
window.addEventListener("pagehide",()=>{
 if(recording){recording.stream.getTracks().forEach(x=>x.stop());try{recording.recorder.stop()}catch(e){}}
 releaseAudio("music");releaseAudio("voice");
});
populate();
$("files").addEventListener("change",onSelectedFiles);
$("folder").addEventListener("change",onSelectedFiles);
$("importFiles").addEventListener("click",()=>importAll().catch(e=>{importing=false;$("importFiles").disabled=false;report("importStatus","파일 가져오기 실패: "+e.message)}));
$("storagePersist").addEventListener("click",()=>persist().catch(e=>report("importStatus","보관 요청 실패: "+e.message)));
$("reload").addEventListener("click",()=>refreshSongs().catch(e=>report("importStatus","목록 불러오기 실패: "+e.message)));
$("exportManifest").addEventListener("click",()=>manifest().catch(e=>report("importStatus","목록 내보내기 실패: "+e.message)));
$("saveVocal").addEventListener("click",()=>saveVocal().catch(e=>report("vocalStatus",e.message)));
$("listenVocal").addEventListener("click",()=>playVocal().catch(e=>report("vocalStatus",e.message)));
$("saveCue").addEventListener("click",()=>saveCue().catch(e=>report("cueStatus",e.message)));
$("listenCue").addEventListener("click",()=>playCue().catch(e=>report("cueStatus",e.message)));
$("startCueRecording").addEventListener("click",startRecording);
$("stopCueRecording").addEventListener("click",stopRecording);
$("shareSelected").addEventListener("click",()=>share().catch(e=>report("shareStatus","공유 실패: "+e.message)));
refreshSongs().catch(e=>report("importStatus","초기 로컬 보관함 로딩 실패: "+e.message));
showVoiceStatus().catch(e=>report("vocalStatus","보컬 참조 보관함 오류: "+e.message));
quota();
})();