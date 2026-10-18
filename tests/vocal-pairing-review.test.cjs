const test=require("node:test"),assert=require("node:assert/strict");
const p=require("../vocal-studio/pairing-policy.js");
const root=()=>({sourceCount:107,uniqueCount:105,sourceHashes:Object.fromEntries(Array.from({length:105},(_,i)=>["T"+String(i+1).padStart(3,"0"),String(i+1).padStart(64,"0")])),reviews:{},pairings:{}});
const review={heard:true,timbre:"5",diction:"4",identity:"5"};
test("105 original fingerprints required",()=>{const a=root();assert.equal(Object.keys(p.validate(a).sourceHashes).length,105);delete a.sourceHashes.T105;assert.throws(()=>p.validate(a));});
test("can't assign nonexistent song, artist or same recording twice",()=>{
 const a=root();a.pairings["F3-01"]={A:"T001",B:"T001",sameVoiceChecked:true};assert.equal(p.assessPair(p.validate(a),"F3-01").ready,false);
 a.pairings["F3-01"].B="T106";assert.throws(()=>p.validate(a));
 delete a.pairings["F3-01"];a.pairings["ZZ-01"]={A:"T001",B:"T002"};assert.throws(()=>p.validate(a));
});
test("unheard songs never become ready for Persona tests",()=>{
 const a=root();a.pairings["F3-01"]={A:"T001",B:"T002",sameVoiceChecked:true};assert.equal(p.assessPair(p.validate(a),"F3-01").ready,false);
 a.reviews.T001={...review};a.reviews.T002={...review};
 assert.equal(p.assessPair(p.validate(a),"F3-01").ready,true);
 a.pairings["F3-01"].sameVoiceChecked=false;
 assert.equal(p.assessPair(p.validate(a),"F3-01").ready,false);
});
test("pairing eligibility is not singer approval",()=>{
 const a=root();a.pairings["F3-01"]={A:"T001",B:"T002",sameVoiceChecked:true};a.reviews.T001={...review};a.reviews.T002={...review};
 const group=p.aggregate(p.validate(a),[{id:"F3-01",name:"한나래"},{id:"FS-01",name:"유가은"}]);
 assert.equal(group.readyCount,1);assert.match(group.rows[0].stage,/Persona/);
 assert.match(group.explanation,/가수 제작.*아님/);
});
test("re-encoded matching recording is blocked even when SHA hashes differ",()=>{
 const a=root();a.pairings["F3-01"]={A:"T081",B:"T082",sameVoiceChecked:true};
 a.reviews.T081={...review};a.reviews.T082={...review};
 assert.equal(p.assessPair(p.validate(a),"F3-01").ready,true);
 a.possibleContentDuplicates=[{a:"T081",b:"T082",correlationClipA:0.9773,correlationClipB:0.9769}];
 const result=p.assessPair(p.validate(a),"F3-01");
 assert.equal(result.ready,false);
 assert.match(result.reasons.join(" "),/다른 인코딩/);
});
test("T000 is invalid even if all 105 IDs are supplied",()=>{
 const a=root();delete a.sourceHashes.T001;a.sourceHashes.T000="0".repeat(64);
 assert.throws(()=>p.validate(a));
});
test("reject malformed or fake near-duplicate references",()=>{
 const a=root();a.possibleContentDuplicates=[{a:"T001",b:"T999"}];
 assert.throws(()=>p.validate(a));a.possibleContentDuplicates=[{a:"T001",b:"T002",correlationClipA:1.5}];
 assert.throws(()=>p.validate(a));
});

test("missing, invalid and out-of-range listening scores never pass",()=>{
 for(const bad of [undefined,null,"", "not scored",6,Infinity,4.5,[],[5],{}]){
  for(const key of ["timbre","diction","identity"]){
   const a=root();a.pairings["F3-01"]={A:"T001",B:"T002",sameVoiceChecked:true};
   a.reviews.T001={...review,[key]:bad};a.reviews.T002={...review};
   assert.equal(p.assessPair(p.validate(a),"F3-01").ready,false,`${key}: ${String(bad)}`);
  }
 }
});
test("voice consistency requires a boolean confirmation",()=>{
 for(const value of ["false","true",1,{},[]]){
  const a=root();a.pairings["F3-01"]={A:"T001",B:"T002",sameVoiceChecked:value};
  a.reviews.T001={...review};a.reviews.T002={...review};
  const result=p.assessPair(p.validate(a),"F3-01");
  assert.equal(result.ready,false);assert.equal(result.checked,false);
 }
});
