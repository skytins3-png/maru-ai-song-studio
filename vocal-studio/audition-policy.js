/* Local evidence checklist, NOT professional certification or legal clearance. */
(function(root,build){
  const api=build();
  if(typeof module==="object" && module.exports) module.exports=api;
  if(root)root.MaruVocalPolicy=api;
})(typeof globalThis==="object"?globalThis:this,function(){
  "use strict";
  const SCORE_KEYS=["pitch","diction","expression","identity","consistency","mix"];
  const FLAGS=["listened","rights","noImitation","stageNameReview","broadcastRights","twoSongsConsistent"];
  function validate(item){
    const files=item&&item.files||[];
    const scores=item&&item.scores||{};
    const flags=item&&item.flags||{};
    const scoreVals=SCORE_KEYS.map(x=>Number(scores[x]));
    const scoresComplete=SCORE_KEYS.every(x=>scores[x]!==""&&scores[x]!==null&&scores[x]!==undefined)
      &&scoreVals.every(x=>Number.isInteger(x)&&x>=1&&x<=5);
    const total=scoresComplete?scoreVals.reduce((x,y)=>x+y,0):0;
    const realFiles=files.length===2&&files.every(f=>f&&typeof f.hash==="string"&&/^[0-9a-f]{64}$/.test(f.hash)&&f.size>1024&&f.duration>=45);
    const independent=realFiles&&files[0].hash!==files[1].hash;
    const qualityPass=Boolean(independent&&files.every(f=>f.qc&&f.qc.integrityOk===true));
    const allFlags=FLAGS.every(x=>flags[x]===true);
    const passed=Boolean(independent&&qualityPass&&scoresComplete&&scoreVals.every(x=>x>=4)&&total>=26&&allFlags);
    const reasons=[];
    if(!realFiles)reasons.push("실제 서로 다른 노래 두 곡(각 45초 이상)이 필요합니다.");
    else if(!independent)reasons.push("동일 음원 파일 두 개는 인정되지 않습니다.");
    if(independent&&!qualityPass)reasons.push("두 곡 모두 오디오 자동 품질 검사를 통과해야 합니다. 기존 파일은 다시 등록해 주세요.");
    if(!scoresComplete)reasons.push("6개 품질 항목을 모두 1~5점으로 평가하세요.");
    else if(scoreVals.some(x=>x<4)||total<26)reasons.push("모든 항목 4점 이상·총점 26점 이상이어야 합니다.");
    if(!allFlags)reasons.push("청취·권리·예명·보컬 일관성·비모사 확인을 모두 마쳐야 합니다.");
    return {passed,total,maxScore:30,hasAudioEvidence:independent,qualityPass,scoresComplete,reasons};
  }
  return {SCORE_KEYS,FLAGS,validate};
});