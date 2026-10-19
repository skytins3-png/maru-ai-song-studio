"use strict";
(function(){
const Policy=window.MaruPersonaEvidence,$=id=>document.getElementById(id);
const LOCAL_KEY="maru-persona-audition-evidence-v1",MAX_BYTES=25*1024*1024;
let roster=[],active="",saved={},playback={};
function releasePlayback(){for(const obj of Object.values(playback))URL.revokeObjectURL(obj.url);playback={};for(const k of Policy.FILES){const e=$("listen-"+k);if(e){e.pause();e.removeAttribute("src");e.load();}}}
const LABELS={
 source:"원본 Suno 자작곡",newA:"Persona 사용 신곡 A",newB:"Persona 사용 신곡 B",
 pitch:"음정",diction:"한국어·중국어 발음",expression:"감정 표현",
 identity:"고유 음색",consistency:"3곡 목소리 일관성",mix:"왜곡 없는 방송 음질",
 personaCreated:"Suno에서 Style Persona를 실제로 생성했음 (목소리 복제 기능과 구분)",
 privateConfirmed:"Persona의 공개 범위를 비공개로 확인함",
 sourceRights:"원본은 내가 권리를 가진 Suno 자작곡임",
 commercialRights:"해당 원본과 신곡 2개의 방송·상업적 이용 권한 확인",
 noImitation:"실존 가수·방송인의 음성을 무단 복제·모사하지 않음",
 listenedToAll:"원본과 신곡 A/B 전곡을 실제로 직접 청취함",
 sameVoiceA:"신곡 A의 가수 목소리가 원본과 일치함을 청음으로 확인",
 sameVoiceB:"신곡 B의 가수 목소리가 원본과 일치함을 청음으로 확인"
};
function say(msg){$("status").textContent=msg;}
function elt(tag,props,text){const n=document.createElement(tag);if(props)Object.assign(n,props);if(text!==undefined)n.textContent=text;return n;}
function record(){return saved[active]||(saved[active]={personaName:"",files:{},scores:{},flags:{},updatedAt:""});}
function persist(){
 try{localStorage.setItem(LOCAL_KEY,JSON.stringify(saved));return true;}catch(err){say("로컬 기록 저장 실패: "+err.message);return false;}
}
function recalc(){
 if(!active)return;
 const a=roster.find(r=>r.id===active),result=Policy.evaluate(active,a.name,record());
 $("decision").className="decision "+(result.localTestPassed?"pass":"pending");
 $("decision").textContent=result.localTestPassed?
 "✅ 로컬 보컬 일관성 자가 심사 기준 충족 · "+result.score+"/30점 (정식 가수 등록·Suno 작업 검증 아님)":
 "아직 제작 검증 중 · "+result.score+"/30점\n"+result.failures.join("\n");
 const sum=Policy.summary(roster,saved);
 $("progress").textContent="로컬 Persona 청음 검사 기준 충족 "+sum.reviewed+"/30명 · 중앙 정식 승인 수는 변경되지 않음";
}
function onEdit(){
 const r=record();r.personaName=$("personaName").value.trim();
 for(const k of Policy.SCORES)r.scores[k]=$("score-"+k).value;
 for(const k of Policy.FLAGS)r.flags[k]=$("flag-"+k).checked;
 r.updatedAt=new Date().toISOString();persist();recalc();
}
function render(){
 const a=roster.find(x=>x.id===active);if(!a)return;
 const r=record();
 $("identity").textContent=a.groupLabel+" · "+a.genre+" · "+a.name;
 $("personaName").value=r.personaName||a.name;
 if(!r.personaName){r.personaName=a.name;persist();}
 for(const k of Policy.SCORES)$("score-"+k).value=r.scores[k]||"";
 for(const k of Policy.FLAGS)$("flag-"+k).checked=r.flags[k]===true;
 for(const k of Policy.FILES){
   const item=r.files[k];$("file-"+k).value="";
   $("fileInfo-"+k).textContent=item?item.name+" · "+Math.round(item.durationSec)+"초 · RMS "+item.qc.rmsDb+" dBFS · SHA-256 "+item.sha256.slice(0,12):"검증된 음원 파일 없음";
   const player=$("listen-"+k),fresh=playback[active+":"+k];
   if(fresh)player.src=fresh.url;else{player.pause();player.removeAttribute("src");player.load();}
 }
 $("makeLink").href="./make.html?artist="+encodeURIComponent(active);
 recalc();
}
async function digest(file){
 if(!crypto||!crypto.subtle)throw Error("보안 연결(HTTPS)에서만 SHA-256 검증할 수 있습니다.");
 const bytes=await file.arrayBuffer(),hash=await crypto.subtle.digest("SHA-256",bytes);
 return [...new Uint8Array(hash)].map(b=>b.toString(16).padStart(2,"0")).join("");
}
async function onFile(key){
 const input=$("file-"+key),file=input.files?.[0],id=active;
 if(!file)return;
 if(file.size>MAX_BYTES||file.size<1024||!/\.(mp3|m4a|wav|aac|flac|ogg)$/i.test(file.name)){
   say("최대 25MB의 MP3/WAV/M4A/AAC/FLAC/OGG 음원을 선택하세요.");input.value="";return;
 }
 say("원본 분석 및 오디오 중복 확인 중: "+file.name);
 try{
   const qc=await window.MaruAudioQC.fromFile(file);
   if(!qc.integrityOk)throw Error("오디오 원본 품질 점검 미통과: "+qc.flags.join(" / "));
   const sha256=await digest(file);
   const evidence={name:file.name,size:file.size,sha256,durationSec:qc.durationSec,qc};
   saved[id]??={personaName:"",files:{},scores:{},flags:{}};
   const other=Policy.FILES.filter(k=>k!==key).find(k=>saved[id].files[k]?.sha256===sha256);
   if(other)throw Error("이미 "+LABELS[other]+"로 등록된 같은 파일입니다.");
   saved[id].files[key]=evidence;saved[id].updatedAt=new Date().toISOString();
   const slot=id+":"+key;if(playback[slot])URL.revokeObjectURL(playback[slot].url);
   playback[slot]={url:URL.createObjectURL(file)};
   persist();if(id===active)render();
   say("음질 및 파일 무결성 확인 완료: "+file.name+" (음원 본문은 저장·전송하지 않음)");
 }catch(err){say("분석 실패: "+err.message);}finally{input.value="";}
}
function exportData(){
 const report={studio:"MARU STUDIO",type:"PERSONA_LOCAL_USER_SELF_TEST_NOT_OFFICIAL",
  exportedAt:new Date().toISOString(),rights:"청음 자기기록으로 법적 권한 또는 Suno Persona 생성을 증명하지 않음",
  summary:Policy.summary(roster,saved),records:saved};
 const blob=new Blob([JSON.stringify(report,null,2)],{type:"application/json"});
 const url=URL.createObjectURL(blob),a=elt("a",{download:"MARU_Persona_30명_로컬검증기록.json",href:url});
 document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),2500);
}
document.addEventListener("DOMContentLoaded",async()=>{
 try{
  try{saved=JSON.parse(localStorage.getItem(LOCAL_KEY)||"{}")||{};}catch{saved={};}
  const response=await fetch("./artists.json",{cache:"no-store"});
  if(!response.ok)throw Error("30명 후보 데이터를 불러올 수 없습니다.");
  roster=(await response.json()).artists;
  if(roster.length!==30)throw Error("후보 수 오류");
  for(const a of roster)$("singer").append(elt("option",{value:a.id},a.name+" · "+a.groupLabel));
  for(const k of Policy.FILES){
   const group=$("files");
   const card=elt("div",{className:"file-card"});
   const label=elt("label",{htmlFor:"file-"+k},LABELS[k]);
   const input=elt("input",{type:"file",id:"file-"+k,accept:"audio/*,.mp3,.m4a,.wav,.aac,.ogg,.flac"});
   const info=elt("small",{id:"fileInfo-"+k},"검증된 음원 파일 없음");
   const listen=elt("audio",{id:"listen-"+k,controls:true,preload:"none"});
   card.append(label,input,info,listen);group.append(card);
   input.onchange=()=>onFile(k);
  }
  for(const k of Policy.SCORES){
   const label=elt("label",null,LABELS[k]),select=elt("select",{id:"score-"+k,"ariaLabel":LABELS[k]});
   select.append(elt("option",{value:""},"미평가"));
   for(let i=1;i<=5;i++)select.append(elt("option",{value:String(i)},i+"점"));
   label.append(select);$("scores").append(label);select.onchange=onEdit;
  }
  for(const k of Policy.FLAGS){
   const label=elt("label",{className:"check"});
   label.append(elt("input",{type:"checkbox",id:"flag-"+k}),elt("span",null,LABELS[k]));
   $("checks").append(label);
   $("flag-"+k).onchange=onEdit;
  }
  $("singer").onchange=()=>{releasePlayback();active=$("singer").value;render();};
  $("personaName").onchange=onEdit;
  $("save").onclick=()=>{onEdit();say("보컬 청음 자기평가 기록을 이 기기에 저장했습니다. 실제 가수 등록이 아님.");};
  $("export").onclick=exportData;
  $("clear").onclick=()=>{
   const name=roster.find(x=>x.id===active)?.name;
   if(!confirm(name+"의 로컬 Persona 검사 기록을 전부 초기화할까요?"))return;
   releasePlayback();delete saved[active];persist();render();say("선택 후보의 로컬 기록을 초기화했어.");
  };
  window.addEventListener("pagehide",releasePlayback);
  const chosen=new URLSearchParams(location.search).get("artist");
  active=roster.some(x=>x.id===chosen)?chosen:"M7-01";
  $("singer").value=active;render();
  const progress=await fetch("./production-status.json",{cache:"no-store"});
  if(progress.ok){const st=await progress.json();$("official").textContent="공식 제작 승인 "+st.approvedCount+"/"+st.candidateCount+"명";}
  say("원본 + 새로운 2곡의 실제 파일을 넣고 품질 및 음색 일관성을 심사해 주세요.");
 }catch(err){say("초기화 실패: "+err.message);}
});
})();