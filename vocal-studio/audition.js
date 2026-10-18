"use strict";
(function(){
 const P=window.MaruVocalPolicy;
 const $=id=>document.getElementById(id);
 const KEY="maru-studio-local-vocal-auditions-v2";
 const FIELDS=[
 ["pitch","음정 정확도"],["diction","발음·가사 전달"],["expression","감정·다이내믹"],
 ["identity","고유 음색"],["consistency","두 곡 사이 목소리 일관성"],["mix","클리핑·왜곡 없는 방송용 음질"]
 ];
 const CHECKS=[
 ["listened","실제 두 곡을 전부 듣고 평가함"],
 ["rights","두 음원에 대한 저장 및 평가 권한을 확인함"],
 ["noImitation","실존 가수·방송인 음성 무단 복제나 모사가 아님"],
 ["stageNameReview","예명·상표 유사 이름의 사전 조사를 진행함"],
 ["broadcastRights","제작 플랫폼 및 원 음원에 방송·배포 이용 권한이 있음"],
 ["twoSongsConsistent","두 곡에서 같은 독창적 보컬 정체성을 확인함"]
 ];
 let candidates=[], active="", audioStore, takes={}, reviews={};
 const info=s=>{$("status").textContent=s;};
 function el(tag,props,text){const node=document.createElement(tag);if(props)Object.assign(node,props);if(text!==undefined)node.textContent=text;return node;}
 function openDb(){
   if(audioStore)return Promise.resolve(audioStore);
   return new Promise((resolve,reject)=>{
     const req=indexedDB.open("maru-studio-vocal-auditions-local-v1",1);
     req.onupgradeneeded=()=>req.result.createObjectStore("takes",{keyPath:"id"});
     req.onsuccess=()=>{audioStore=req.result;resolve(audioStore);};req.onerror=()=>reject(req.error);
   });
 }
 async function getAll(){
   const db=await openDb();
   return new Promise((resolve,reject)=>{
     const req=db.transaction("takes","readonly").objectStore("takes").getAll();
     req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error);
   });
 }
 async function putTake(record){
   const db=await openDb();
   return new Promise((resolve,reject)=>{
     const t=db.transaction("takes","readwrite");
     t.objectStore("takes").put(record);
     t.oncomplete=resolve;t.onerror=()=>reject(t.error||Error("저장 실패"));t.onabort=()=>reject(t.error||Error("저장 취소"));
   });
 }
 async function sha(file){
   const bytes=await file.arrayBuffer();
   const out=await crypto.subtle.digest("SHA-256",bytes);
   return Array.from(new Uint8Array(out),x=>x.toString(16).padStart(2,"0")).join("");
 }
 async function duration(file){
   return new Promise((resolve,reject)=>{
     const url=URL.createObjectURL(file),player=new Audio();
     const timer=setTimeout(()=>finish(Error("오디오 길이 읽기 시간 초과")),20000);
     let ended=false;
     function finish(e,n){if(ended)return;ended=true;clearTimeout(timer);player.removeAttribute("src");player.load();URL.revokeObjectURL(url);if(e)reject(e);else resolve(n);}
     player.onloadedmetadata=()=>{
       if(Number.isFinite(player.duration))finish(null,player.duration);
       else finish(Error("이 음원은 길이를 판단할 수 없습니다."));
     };
     player.onerror=()=>finish(Error("지원되지 않거나 손상된 음원입니다."));
     player.preload="metadata";player.src=url;
   });
 }
 function saveLocal(){
   try{localStorage.setItem(KEY,JSON.stringify(reviews));return true;}catch(e){info("로컬 저장 실패: "+e.message);return false;}
 }
 async function refreshFiles(){
   takes={};
   (await getAll()).forEach(t=>{takes[t.id]=t;});
   ["A","B"].forEach(tag=>{
     const t=takes[active+tag];
     $(tag==="A"?"songAInfo":"songBInfo").textContent=t?t.name+" · "+Math.round(t.duration)+"초 · RMS "+(t.qc?.rmsDb??"?")+" dBFS · Clip "+(t.qc?.clipPct??"?")+"% · SHA "+t.hash.slice(0,12)+(t.qc?.flags.length?" · 검토: "+t.qc.flags.join(", "):""):"음원 미등록";
   });
 }
 function form(){
   const scores={},flags={};
   for(const [key] of FIELDS)scores[key]=document.getElementById("score-"+key).value;
   for(const [key] of CHECKS)flags[key]=document.getElementById("flag-"+key).checked;
   return {scores,flags,files:["A","B"].map(tag=>takes[active+tag]||null)};
 }
 function progress(){
   const c=Object.values(reviews).filter(item=>item.localAuditionPassed===true).length;
   $("localProgress").textContent="로컬 오디션 통과 기록 "+c+"/30 · 실제 중앙 제작 완료 수와 다름";
 }
 function evaluate(persist=false){
   const item=form(),result=P.validate(item);
   $("verdict").className="status "+(result.passed?"pass":"fail");
   $("verdict").textContent=result.passed?
     "오디션 자체 평가 통과("+result.total+"/30점). 30명 가수 제작 완료나 실제 BIGO 송출 완료는 아님. 방송 마스터·그룹 화음·권리 서류 검토가 별도로 필요합니다.":
     "오디션 미통과 ("+result.total+"/30점)\n"+result.reasons.join("\n");
   if(persist){
     reviews[active]={scores:item.scores,flags:item.flags,total:result.total,
       localAuditionPassed:result.passed,updatedAt:new Date().toISOString()};
     if(saveLocal())info("심사 기록만 이 기기에 저장했어. 정식 가수 승인 수는 바뀌지 않아.");
     progress();
   }
   return result;
 }
 async function changeCandidate(){
   const a=candidates.find(x=>x.id===active);if(!a)return;
   $("candidateGenre").textContent=a.groupLabel+" · "+a.genre;
   $("style").value=a.stylePrompt;
   $("songA").value="";$("songB").value="";
   const data=reviews[active]||{scores:{},flags:{}};
   for(const [key] of FIELDS)$("score-"+key).value=data.scores[key]||"";
   for(const [key] of CHECKS)$("flag-"+key).checked=data.flags[key]===true;
   await refreshFiles();evaluate();
 }
 async function chooseFile(tag){
   const file=$(tag==="A"?"songA":"songB").files[0];if(!file)return;
   if(!/\.(mp3|wav|m4a|aac|ogg|flac)$/i.test(file.name)||file.size>25*1024*1024||file.size<1024){
     info("25MB 이하의 올바른 음악 파일을 선택해.");return;
   }
   if(!document.getElementById("flag-rights").checked||!document.getElementById("flag-noImitation").checked){
     info("저장하기 전에 권리 및 타인 음성 무단모사 금지를 먼저 확인해야 해.");return;
   }
   info("파일의 길이와 중복 여부 검사 중…");
   const [hash,length,quality]=await Promise.all([sha(file),duration(file),window.MaruAudioQC.fromFile(file)]);
   if(!quality.integrityOk){info("음원 자동 품질 검사 미통과: "+(quality.flags.join(" / ")||"원본 확인 필요"));return;}
   if(length<45){info("최소 45초 이상 실제 노래를 녹음해 줘.");return;}
   const other=takes[active+(tag==="A"?"B":"A")];
   if(other&&other.hash===hash){info("같은 음원 파일입니다. 서로 다른 노래 2곡이 필요합니다.");return;}
   await putTake({id:active+tag,name:file.name,size:file.size,hash,duration:length,qc:quality,blob:file});
   await refreshFiles();evaluate();info("원본 파일 등록 완료. 이 기기에서만 저장되고 GitHub에 공개되지 않아.");
 }
 let playUrl=null;
 function play(tag){
   const t=takes[active+tag];if(!t){info("먼저 해당 곡을 등록해.");return;}
   const audio=$("auditionPlayer");audio.pause();
   if(playUrl)URL.revokeObjectURL(playUrl);
   playUrl=URL.createObjectURL(t.blob);audio.src=playUrl;
   audio.play().catch(()=>info("재생이 제한되면 플레이어 ▶ 버튼을 눌러줘."));
 }
 function download(){
   const payload={studio:"MARU STUDIO",kind:"self-assessed vocal auditions",
    limitation:"로컬 개인 심사결과. 객관적 성능/법적 권리/BIGO 송출 합격 아님. 음원 원본 및 파일 해시는 서버에 전송하지 않음.",
    reviews};
   const url=URL.createObjectURL(new Blob([JSON.stringify(payload,null,2)],{type:"application/json"}));
   const a=el("a",{href:url,download:"maru-vocal-auditions-local.json"});document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),3000);
 }
 document.addEventListener("DOMContentLoaded",async()=>{
   try{
     try{reviews=JSON.parse(localStorage.getItem(KEY)||"{}")||{};}catch{reviews={};}
     FIELDS.forEach(([key,label])=>{
       const wrap=el("label");wrap.append(el("span",null,label));
       const select=el("select",{id:"score-"+key,"ariaLabel":label});
       select.append(el("option",{value:""},"평가 전"));
       for(let n=1;n<=5;n++)select.append(el("option",{value:String(n)},n+"점"));
       wrap.append(select);$("scores").append(wrap);
       select.onchange=()=>evaluate();
     });
     CHECKS.forEach(([key,label])=>{
       const wrap=el("label",{className:"flag"});
       const input=el("input",{type:"checkbox",id:"flag-"+key});
       wrap.append(input,el("span",null,label));$("flags").append(wrap);input.onchange=()=>evaluate();
     });
     const r=await fetch("./artists.json",{cache:"no-store"});if(!r.ok)throw Error("가수 후보 명단 불러오기 실패");
     candidates=(await r.json()).artists;
     if(candidates.length!==30)throw Error("30명 명단을 확인해 주세요.");
     candidates.forEach(a=>$("candidate").append(el("option",{value:a.id},a.name+" · "+a.groupLabel)));
     active=candidates[0].id;
     $("candidate").onchange=()=>{active=$("candidate").value;changeCandidate().catch(e=>info("로컬 파일 조회 실패: "+e.message));};
     $("songA").onchange=()=>chooseFile("A").catch(e=>info("첫 번째 노래 등록 실패: "+e.message));
     $("songB").onchange=()=>chooseFile("B").catch(e=>info("두 번째 노래 등록 실패: "+e.message));
     $("playA").onclick=()=>play("A");$("playB").onclick=()=>play("B");
     $("review").onclick=()=>evaluate();$("saveReview").onclick=()=>evaluate(true);
     $("exportReview").onclick=download;
     $("copyStyle").onclick=()=>{
       navigator.clipboard.writeText($("style").value).then(()=>info("가수별 Suno 스타일 복사 완료"))
       .catch(()=>{$("style").select();info("클립보드가 거부됐어. 선택된 스타일을 길게 눌러 복사해.");});
     };
     await changeCandidate();progress();
     try{
       const p=await fetch("./production-status.json",{cache:"no-store"});
       const st=await p.json();
       $("centralCount").textContent=st.approvedCount+"/"+st.candidateCount+"명";
     }catch(e){$("centralCount").textContent="확인 불가";}
     info("오디션 화면 준비 완료. 아직 실전 노래와 객관적 보컬 심사가 필요해.");
   }catch(e){info("화면 준비 실패: "+e.message);}
 });
})();