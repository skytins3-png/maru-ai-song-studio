(function(root,build){
"use strict";const api=build();if(typeof module==="object"&&module.exports)module.exports=api;if(root)root.MaruVocalPairs=api;
})(typeof globalThis==="object"?globalThis:this,function(){
"use strict";
const ID=/^T(?:0[0-9]{2}|10[0-5])$/;
const SHA=/^[a-f0-9]{64}$/i;
const SINGER=/^(F3-0[1-3]|M7-0[1-7]|FS-(?:0[1-9]|10)|MS-(?:0[1-9]|10))$/;
function validate(record){
 if(!record||record.uniqueCount!==105||record.sourceCount!==107||!record.sourceHashes||
 !record.reviews||!record.pairings||typeof record.pairings!=="object")throw Error("105곡 표준 선별 JSON이 아닙니다.");
 const hashes=Object.entries(record.sourceHashes);
 if(hashes.length!==105||hashes.some(([id,sha])=>!ID.test(id)||!SHA.test(sha))||
    new Set(hashes.map(x=>x[0])).size!==105||new Set(hashes.map(x=>x[1])).size!==105)throw Error("105곡 원본 파일 해시 확인 실패");
 for(const [id,p] of Object.entries(record.pairings)){
   if(!SINGER.test(id))throw Error("등록되지 않은 보컬 후보 "+id);
   if(p===null||typeof p!=="object")throw Error("잘못된 후보 곡 배치");
   for(const slot of ["A","B"])if(p[slot] && (!ID.test(p[slot])||!record.sourceHashes[p[slot]]))throw Error("알 수 없는 원곡 참조");
 }
 return record;
}
function assessPair(rec,person){
 const p=rec.pairings[person]||{};
 const reasons=[];
 const two=!!(p.A&&p.B&&p.A!==p.B&&rec.sourceHashes[p.A]&&rec.sourceHashes[p.B]&&rec.sourceHashes[p.A]!==rec.sourceHashes[p.B]);
 if(!two)reasons.push("서로 다른 두 곡을 연결해야 합니다.");
 if(!p.sameVoiceChecked)reasons.push("두 곡을 직접 듣고 같은 보컬인지 대조해야 합니다.");
 for(const slot of ["A","B"]){
   const id=p[slot],rev=id?rec.reviews[id]:null;
   if(!rev||rev.heard!==true)reasons.push(slot+"곡 청음 완료 표시가 없습니다.");
   if(!rev||Number(rev.timbre)<4||Number(rev.diction)<4||Number(rev.identity)<4)
      reasons.push(slot+"곡 음색·발음·개성 평가가 각각 4점 미만입니다.");
 }
 const ready=two&&reasons.length===0;
 return {ready,stage:ready?"원곡 두 곡 인간 청음 완료 · Persona 제작 테스트 대기":"보컬 원곡 선별 중",reasons,
  songA:p.A||null,songB:p.B||null,
  checked:Boolean(p.sameVoiceChecked)};
}
function aggregate(rec,roster){
 const rows=roster.map(a=>({id:a.id,name:a.name,...assessPair(rec,a.id)}));
 return {rows,readyCount:rows.filter(x=>x.ready).length,
  explanation:"여기서 합격은 두 곡 청음·선별 가능성만 뜻합니다. AI 음성 모델/가수 제작 또는 BIGO 방송 승인 아님."};
}
return {validate,assessPair,aggregate};
});