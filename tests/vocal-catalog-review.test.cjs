const test=require("node:test");
const assert=require("node:assert/strict");
const policy=require("../vocal-studio/catalog-review-policy.js");
const make=(file,sha,lang)=>({filename:file,sha256:sha.repeat(64),durationSeconds:220,titleLanguageHint:lang,sampledAverageRmsDbfs:-14,sampledMaxPeakDbfs:-.2});
test("107 independent + 2 duplicate archives recognized as 105 unique when hashes match",()=>{
 let rows=Array.from({length:105},(_,i)=>make("song"+i+".mp3",i.toString(16).padStart(2,'0'),"한국어 제목"));
 rows.push({...rows[0],filename:"copy-1.mp3"});
 rows.push({...rows[99],filename:"copy-2.mp3"});
 const good=policy.validate({tracks:rows});const x=policy.dedupe(good);
 assert.equal(good.length,107);assert.equal(x.unique.length,105);assert.equal(x.duplicates.length,2);
});
test("bad JSON and track hashes refused",()=>{
 assert.throws(()=>policy.validate({tracks:[]}));assert.throws(()=>policy.validate({tracks:[{filename:"x",sha256:"bad",durationSeconds:10}]}));
});
test("language title hint cannot prove vocal language",()=>{
 assert.equal(policy.languageHint({titleLanguageHint:"중국어 제목 (추정)"}),"중국어 제목");
 assert.equal(policy.languageHint({titleLanguageHint:"한국어 제목 (추정)"}),"한국어 제목");
 assert.equal(policy.languageHint({titleLanguageHint:"ID 불명"}),"기타·확인 필요");
});
test("review progress counts only explicitly completed manual listening",()=>{
 assert.equal(policy.reviewCounts({x:{listeningDone:true},y:{listeningDone:false},z:{}}),1);
});
