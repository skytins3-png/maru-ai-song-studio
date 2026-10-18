const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const policy=require("../vocal-studio/audition-policy.js");
const root=path.resolve(__dirname,"..");
const roster=JSON.parse(fs.readFileSync(path.join(root,"vocal-studio/artists.json"),"utf8"));
const production=JSON.parse(fs.readFileSync(path.join(root,"vocal-studio/production-status.json"),"utf8"));
const good=()=>({files:[{hash:"a".repeat(64),size:2000,duration:120},{hash:"b".repeat(64),size:3000,duration:115}],
 scores:Object.fromEntries(policy.SCORE_KEYS.map(x=>[x,5])),
 flags:Object.fromEntries(policy.FLAGS.map(x=>[x,true]))});
test("roster is 30 concepts, not 30 singers",()=>{
 assert.equal(roster.artists.length,30);
 assert.equal(production.approvedCount,0);
 assert.equal(production.complete,false);
 assert.equal(new Set(roster.artists.map(a=>a.name)).size,30);
});
test("two independent performances and full review pass locally",()=>assert.equal(policy.validate(good()).passed,true));
test("no evidence fails",()=>{const v=good();v.files=[];assert.equal(policy.validate(v).passed,false)});
test("same SHA even with renamed files fails",()=>{const v=good();v.files[1].hash=v.files[0].hash;assert.equal(policy.validate(v).passed,false)});
test("short fake take fails",()=>{const v=good();v.files[1].duration=10;assert.equal(policy.validate(v).passed,false)});
test("no rights fails",()=>{const v=good();v.flags.broadcastRights=false;assert.equal(policy.validate(v).passed,false)});
test("no non-imitation verification fails",()=>{const v=good();v.flags.noImitation=false;assert.equal(policy.validate(v).passed,false)});
test("empty scores must NOT parse as zero completed scores",()=>{const v=good();v.scores.pitch="";assert.equal(policy.validate(v).passed,false)});
test("any score under 4 fails even if total high",()=>{const v=good();v.scores.pitch=3;assert.equal(policy.validate(v).passed,false)});
test("score under 26 fails",()=>{const v=good();v.scores.pitch=4;v.scores.diction=4;v.scores.expression=4;v.scores.identity=4;v.scores.consistency=4;v.scores.mix=4;assert.equal(policy.validate(v).passed,false)});
test("missing manual listening fails",()=>{const v=good();v.flags.listened=false;assert.equal(policy.validate(v).passed,false)});
