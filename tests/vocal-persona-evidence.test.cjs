const test=require("node:test"), assert=require("node:assert/strict");
const fs=require("node:fs"),path=require("node:path");
const p=require("../vocal-studio/persona-evidence-policy.js");
const files=()=>({source:audio("a"),newA:audio("b"),newB:audio("c")});
function audio(c){return {sha256:c.repeat(64),size:4*1024*1024,durationSec:250,qc:{integrityOk:true}};}
function ok(){return {personaName:"강태준",files:files(),scores:Object.fromEntries(p.SCORES.map(x=>[x,"5"])),flags:Object.fromEntries(p.FLAGS.map(x=>[x,true]))};}
const judge=(v)=>p.evaluate("M7-01","강태준",v).localTestPassed;
test("three real independent audio files, private persona and human review can qualify for local check only",()=>{
 const a=ok(),res=p.evaluate("M7-01","강태준",a);
 assert.equal(res.localTestPassed,true);
 assert.equal(res.score,30);
 assert.match(res.note,/가수 완성.*아님|가수 완성,/);
 assert.equal(p.summary([{id:"M7-01",name:"강태준"},...Array.from({length:29},(_,i)=>({id:"FS-01",name:"유가은"}))],{"M7-01":a}).officiallyApproved,0);
});
test("name mismatch and invalid candidate ID reject",()=>{
 assert.equal(judge({...ok(),personaName:"이승철"}),false);
 assert.throws(()=>p.evaluate("INVALID","강태준",ok()));
});
test("missing or duplicate audio hashes never qualify",()=>{
 for(const k of p.FILES){const a=ok();delete a.files[k];assert.equal(judge(a),false,k);}
 const x=ok();x.files.newB={...x.files.source};assert.equal(judge(x),false);
});
test("too short, bad quality or missing fingerprint never qualify",()=>{
 for(const v of [{durationSec:10},{size:800},{sha256:"bad"},{qc:{integrityOk:false}}]){
   const a=ok();a.files.newA={...a.files.newA,...v};
   assert.equal(judge(a),false,JSON.stringify(v));
 }
});
test("score and checkbox type bypasses are blocked",()=>{
 for(const key of p.SCORES)for(const value of ["",null,undefined,"a","4.5",3,"6",{},[],true]){
  const a=ok();a.scores[key]=value;assert.equal(judge(a),false,key+" "+String(value));
 }
 for(const key of p.FLAGS)for(const value of [false,null,undefined,"true",1]){
  const a=ok();a.flags[key]=value;assert.equal(judge(a),false,key+" "+String(value));
 }
});
test("all 4 scores insufficient; 26+ with each 4+ valid",()=>{
 const a=ok();for(const key of p.SCORES)a.scores[key]="4";
 assert.equal(judge(a),false);
 a.scores.pitch="5";a.scores.mix="5";assert.equal(judge(a),true);
});
test("page ties selected singer and local evidence, without remote audio upload",()=>{
 const dir=path.join(__dirname,"../vocal-studio");
 const html=fs.readFileSync(path.join(dir,"persona-evidence.html"),"utf8");
 const js=fs.readFileSync(path.join(dir,"persona-evidence.js"),"utf8");
 const index=fs.readFileSync(path.join(dir,"index.html"),"utf8");
 assert.match(html,/audio-qc.js/);assert.match(html,/persona-evidence-policy.js/);
 assert.match(js,/crypto.subtle.digest/);assert.match(js,/localStorage/);
 assert.match(js,/listen-/);assert.match(index,/persona-evidence.html/);
 assert.doesNotMatch(js,/fetch\s*\(\s*["']https?:/);
});
