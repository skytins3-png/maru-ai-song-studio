(function(root,factory){
"use strict";const api=factory();
if(typeof module==="object"&&module.exports)module.exports=api;
if(root)root.MaruPersonaEvidence=api;
})(typeof globalThis==="object"?globalThis:this,function(){
"use strict";
const SINGER=/^(F3-0[1-3]|M7-0[1-7]|FS-(?:0[1-9]|10)|MS-(?:0[1-9]|10))$/;
const FILES=["source","newA","newB"];
const SCORES=["pitch","diction","expression","identity","consistency","mix"];
const FLAGS=["personaCreated","privateConfirmed","sourceRights","commercialRights","noImitation","listenedToAll","sameVoiceA","sameVoiceB"];
function validEvidence(f){
 return !!(f&&/^[a-f0-9]{64}$/i.test(f.sha256||"")&&
 Number.isFinite(f.size)&&f.size>1024&&
 Number.isFinite(f.durationSec)&&f.durationSec>=45&&
 f.qc&&f.qc.integrityOk===true);
}
function scoreOK(v){
 return (typeof v==="string"||typeof v==="number")&&String(v).trim()!==""&&
 Number.isInteger(Number(v))&&Number(v)>=4&&Number(v)<=5;
}
function evaluate(id,name,data){
 if(!SINGER.test(id)||typeof name!=="string"||!name.trim())throw Error("미등록 후보입니다.");
 const value=data&&typeof data==="object"?data:{};
 const fs=value.files||{},metrics=value.scores||{},checks=value.flags||{};
 const failures=[];
 if(value.personaName!==name)failures.push("페르소나 이름이 현재 후보와 일치해야 합니다.");
 if(FILES.some(key=>!validEvidence(fs[key])))failures.push("원본과 신곡 2곡 모두 실제 45초 이상 정상 음원이 필요합니다.");
 const hashes=FILES.map(key=>fs[key]&&fs[key].sha256).filter(Boolean);
 if(new Set(hashes).size!==3)failures.push("원본·신곡 A·신곡 B는 서로 다른 파일이어야 합니다.");
 if(SCORES.some(key=>!scoreOK(metrics[key])))failures.push("6개 보컬 평가 모두 4~5점으로 입력해야 합니다.");
 const total=SCORES.every(key=>scoreOK(metrics[key]))?SCORES.reduce((s,key)=>s+Number(metrics[key]),0):0;
 if(total<26)failures.push("6개 항목 총점 26/30점 이상이어야 합니다.");
 if(FLAGS.some(key=>checks[key]!==true))failures.push("비공개 Persona, 음성 일치·원곡 권리·방송 권리를 포함한 모든 점검이 필요합니다.");
 return {localTestPassed:failures.length===0,score:total,maxScore:30,failures,
  note:"이 결과는 사용자 기기에 저장한 수동 청음·품질 점검 기록이며 실제 가수 완성, Suno 검증, 사용권 확보 또는 BIGO 방송 승인을 증명하지 않습니다."};
}
function summary(roster,saved){
 if(!Array.isArray(roster)||roster.length!==30)throw Error("후보 명단은 30명이어야 합니다.");
 const results=roster.map(a=>({id:a.id,name:a.name,...evaluate(a.id,a.name,(saved||{})[a.id])}));
 return {reviewed:results.filter(x=>x.localTestPassed).length,officiallyApproved:0,results};
}
return {FILES,SCORES,FLAGS,validEvidence,scoreOK,evaluate,summary};
});