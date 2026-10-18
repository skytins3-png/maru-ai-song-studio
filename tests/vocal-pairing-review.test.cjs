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