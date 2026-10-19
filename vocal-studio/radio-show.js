"use strict";(function(){
const E=window.MaruShow,$=id=>document.getElementById(id),audio=$("player");
const tracks=[],history=[],comments=[];
let epoch=0,running=false,busy=false,genre=0,index=0,timer=0,deadline=0,activeUrl=null,stopTalking=null,stopSong=null;
function status(s){$("status").textContent=s;}
function safeButtonText(s){return E.clean(s,100);}
function render(){
 $("count").textContent=tracks.length+"곡 · 로컬 원본 재생";
 const list=$("songs");list.replaceChildren();
 for(const t of tracks){
  const li=document.createElement("li"),name=document.createElement("span"),select=document.createElement("select");
  name.textContent=t.title+" · ";select.setAttribute("aria-label",t.title+" 언어/장르");
  for(const cat of E.CATEGORIES){const opt=document.createElement("option");opt.value=cat;opt.textContent=E.NAMES[cat];select.append(opt);}
  select.value=t.category;select.onchange=()=>t.category=select.value;
  li.append(name,select);list.append(li);
 }
}
async function hash(file){
 if(!globalThis.crypto?.subtle)return null;
 const bytes=await file.arrayBuffer(),arr=new Uint8Array(await crypto.subtle.digest("SHA-256",bytes));
 return [...arr].map(x=>x.toString(16).padStart(2,"0")).join("");
}
async function add(files){
 if(running||busy){status("재생·다른 가져오기가 끝나면 음악을 추가할 수 있습니다.");return {added:0,duplicate:0,skipped:0};}
 busy=true;
 let added=0,duplicate=0,skipped=0;
 try {
 for(const file of Array.from(files||[]).slice(0,Math.max(0,200-tracks.length))){
  if(!/\.(mp3|wav|m4a|aac|ogg|flac)$/i.test(file.name)||file.size<1000||file.size>80*1024*1024){skipped++;continue;}
  try {
    const fingerprint=await hash(file);
    if(!fingerprint){skipped++;status("보안 연결에서만 중복 검증 가능한 SHA-256 기능이 동작합니다.");continue;}
    const id=fingerprint;
    if(tracks.some(x=>x.id===id)){duplicate++;continue;}
    tracks.push({id,title:E.title(file.name),category:E.category(file.name),file});added++;
    status("로컬 곡 확인 중: "+(added+duplicate+skipped)+"개");
  }catch{skipped++;}
 }
 render();$("files").value="";
 status("추가 "+added+"곡 · 중복 제외 "+duplicate+"곡 · 건너뜀 "+skipped+"곡. 서버 전송 없음.");
 return {added,duplicate,skipped};
 } finally {busy=false;}
}
function releaseAudio(){audio.pause();audio.removeAttribute("src");audio.load();if(activeUrl)URL.revokeObjectURL(activeUrl);activeUrl=null;}
function shutdown(reason){
 running=false;epoch++;if(stopTalking){stopTalking();stopTalking=null;}
 if(stopSong){stopSong();stopSong=null;}
 globalThis.speechSynthesis?.cancel();clearInterval(timer);timer=0;releaseAudio();
 $("now").textContent="재생 대기";$("speaker").textContent="진행자 대기";status(reason);
}
function speak(line,ticket){return new Promise(resolve=>{
 if(!running||ticket!==epoch){resolve(false);return;}
 $("speaker").textContent=line.speaker+" · "+line.lang;
 $("dialogue").textContent=E.clean(line.text,260);
 const synth=window.speechSynthesis;
 if(!synth||!window.SpeechSynthesisUtterance){
  status("이 브라우저는 TTS가 없어 문구만 표시합니다.");
  setTimeout(()=>resolve(running&&ticket===epoch),1000);return;
 }
 let done=false,alarm;
 const utterance=new SpeechSynthesisUtterance(E.clean(line.text,260));
 utterance.lang=line.lang;utterance.rate=0.98;
 const host=E.HOSTS.indexOf(line.speaker),voices=synth.getVoices().filter(v=>v.lang?.toLowerCase().startsWith(line.lang.slice(0,2).toLowerCase()));
 if(voices.length)utterance.voice=voices[Math.max(0,host)%voices.length];
 utterance.pitch=0.93+(Math.max(0,host)%5)*0.05;
 const finish=good=>{if(done)return;done=true;clearTimeout(alarm);if(stopTalking===cancel)stopTalking=null;resolve(good&&running&&ticket===epoch);};
 const cancel=()=>{synth.cancel();finish(false);};stopTalking=cancel;
 utterance.onend=()=>finish(true);utterance.onerror=()=>finish(true);
 alarm=setTimeout(()=>{synth.cancel();finish(true);},Math.max(17000,utterance.text.length*360));
 try{synth.speak(utterance);}catch{finish(true);}
 });}
async function talk(lines,ticket){for(const line of lines)if(!(await speak(line,ticket)))return false;return running&&ticket===epoch;}
function play(track,ticket){return new Promise(resolve=>{
 if(!running||ticket!==epoch){resolve(false);return;}
 releaseAudio();activeUrl=URL.createObjectURL(track.file);audio.src=activeUrl;audio.volume=1;
 $("now").textContent="🎵 "+track.title+" · "+E.NAMES[track.category];
 $("speaker").textContent="Suno 자작곡";$("dialogue").textContent="원본 오디오를 재인코딩하지 않고 그대로 재생합니다.";
 let settled=false;
 const finish=ok=>{if(settled)return;settled=true;audio.removeEventListener("ended",ended);audio.removeEventListener("error",err);
 if(stopSong===cancel)stopSong=null;resolve(ok&&running&&ticket===epoch);};
 const ended=()=>finish(true),err=()=>{status("파일을 재생할 수 없습니다: "+track.title);finish(true);},cancel=()=>finish(false);
 stopSong=cancel;audio.addEventListener("ended",ended,{once:true});audio.addEventListener("error",err,{once:true});
 audio.play().catch(()=>status("브라우저에서 자동재생을 제한했습니다. 오디오 플레이어 ▶을 누르면 이어서 진행합니다."));
 });}
async function show(ticket){
 while(running&&ticket===epoch){
  if(deadline&&Date.now()>=deadline){shutdown("예약한 로컬 미리듣기 종료 시각 도달");return;}
  const selected=E.choose(tracks,history,Date.now(),genre);
  if(!selected){shutdown("20분 내 같은 노래 반복 없이 재생 가능한 곡이 없어 종료했습니다.");return;}
  genre=selected.index;const track=selected.track;
  if(!(await talk(E.before(track,++index),ticket)))return;
  if(!running||ticket!==epoch)return;
  history.push({id:track.id,at:Date.now()});if(history.length>500)history.shift();
  if(!(await play(track,ticket)))return;
  if(!(await talk(E.after(track),ticket)))return;
  while(comments.length&&running&&ticket===epoch)if(!(await talk([comments.shift()],ticket)))return;
 }
}
function start(){
 if(running)return;
 if(!tracks.length){status("먼저 형의 Suno 자작곡을 선택해 주세요.");return;}
 if(!$("rights").checked){status("원본 재생·방송 사용 권한을 확인해 주세요.");return;}
 globalThis.speechSynthesis?.cancel();history.length=0;comments.length=0;genre=0;index=0;
 const minutes=Number($("minutes").value)||0;
 deadline=minutes>0?Date.now()+minutes*60000:0;
 running=true;const ticket=++epoch;
 clearInterval(timer);timer=setInterval(()=>{if(running&&deadline&&Date.now()>=deadline)shutdown("로컬 미리듣기 예약 시간 도달 · BIGO 방송은 별도 종료 필요");},1000);
 status("라디오 진행 시작: 가상 진행자 대화 → 원본 노래 (로컬 미리듣기)");
 void show(ticket).catch(e=>shutdown("라디오 진행 오류: "+e.message));
}
$("files").onchange=e=>{void add(e.target.files).catch(err=>status("파일 추가 실패: "+err.message));};
$("importStudio").onclick=async()=>{
 if(running||busy){status("재생을 중지한 뒤 로컬 보관함을 가져오세요.");return;}
 if(!$("bridgeConsent").checked){status("기존 MARU STUDIO 로컬 파일을 읽는 데 먼저 동의해 주세요.");return;}
 if(!window.MaruRadioBridge){status("STUDIO 로컬 파일 연결 모듈을 열 수 없습니다.");return;}
 const button=$("importStudio");button.disabled=true;
 try{
  status("MARU STUDIO 로컬 보관함 조회 중 (서버 업로드 없음)");
  const imported=await window.MaruRadioBridge.loadAll();
  const files=imported.songs.map(s=>new File([s.blob],s.name,{type:s.blob.type||"audio/mpeg"}));
  if(!files.length){status("STUDIO에 등록된 노래 파일이 없습니다. "+imported.failures.join(" / "));return;}
  const result=await add(files);
  status("MARU STUDIO 연결: "+result.added+"곡 추가 · "+result.duplicate+"곡 중복 건너뜀 · 전체 "+tracks.length+"곡. "+
   (imported.failures.length?"일부 저장소 접근 불가: "+imported.failures.join(" / "):"이 기기에서만 복사해 읽음."));
 }catch(err){status("로컬 보관함 연동 실패: "+err.message);}
 finally{button.disabled=false;}
};
$("start").onclick=start;
$("stop").onclick=()=>shutdown("미리듣기 중지 (BIGO 방송 자체는 제어하지 않습니다)");
$("next").onclick=()=>{
 if(!running)return;
 epoch++;if(stopTalking){stopTalking();stopTalking=null;}if(stopSong){stopSong();stopSong=null;}
 globalThis.speechSynthesis?.cancel();releaseAudio();
 status("다음 곡으로 이동");const ticket=epoch;
 void show(ticket).catch(e=>shutdown("다음 곡 오류: "+e.message));
};
$("clear").onclick=()=>{shutdown("곡 목록 초기화");tracks.length=0;history.length=0;comments.length=0;render();};
$("send").onclick=()=>{
 const raw=$("comment").value;$("comment").value="";
 if(!running){status("먼저 라디오를 시작해 주세요.");return;}
 if(comments.length>=10){status("대화 대기열이 가득 찼습니다.");return;}
 const line=E.reply(raw);
 if(line){comments.push(line);status("수동 메시지 답변 예약: 현재 노래 이후 대화합니다. BIGO 댓글을 자동 수집하지 않습니다.");}
};
window.addEventListener("pagehide",()=>shutdown("페이지가 닫혀 미리듣기 중지"));
render();status("준비 완료: 오디오 파일은 이 기기에서만 사용합니다.");
})();