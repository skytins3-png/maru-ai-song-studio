const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'..','vocal-studio');
const load=file=>JSON.parse(fs.readFileSync(path.join(root,file),'utf8'));
const artists=load('artists.json').artists;
const production=load('production-status.json');
const plan=load('production-plans.json');
test('60 test song preparations for 30 existing candidates, no invented singer approvals',()=>{
 assert.equal(artists.length,30);assert.equal(plan.candidates.length,30);
 assert.equal(plan.candidates.flatMap(a=>a.tracks).length,60);
 assert.equal(new Set(plan.candidates.map(a=>a.id)).size,30);
 assert.deepEqual(plan.candidates.map(a=>a.id),artists.map(a=>a.id));
 assert.equal(production.approvedCount,production.artists.filter(a=>a.approved).length);
});
test('explicitly ungenerated tasks; no audio master present',()=>{
 assert.equal(plan.status,'PROMPTS_ONLY_NO_AUDIO_GENERATED');
 for(const artist of plan.candidates){
   assert.equal(artist.tracks.length,2);
   assert.deepEqual(artist.tracks.map(s=>s.version),['A','B']);
   for(const track of artist.tracks){
     assert.equal(track.generationState,'NOT_GENERATED');
     assert.equal(track.audioMaster,null);
     assert.equal(track.voiceModelId,null);
   }
 }
});
test('lyrics for separate tests and style bounds',()=>{
 for(const a of plan.candidates){
  assert.ok(a.name.length>1);
  assert.ok(a.genre.length>1);
  for(const t of a.tracks){
   assert.ok(t.lyrics.length>400);
   assert.ok(t.lyrics.includes('[Verse 1]')&&t.lyrics.includes('[Final Chorus]'));
   assert.ok(t.style.length>140&&t.style.length<1000);
   assert.ok(t.bpm>50&&t.bpm<140);
   assert.equal(t.meter,'4/4');
  }
  assert.notEqual(a.tracks[0].lyrics,a.tracks[1].lyrics);
 }
});
test('production page never claims automatic singing generation',()=>{
 const html=fs.readFileSync(path.join(root,'make.html'),'utf8');
 const js=fs.readFileSync(path.join(root,'make.js'),'utf8');
 assert.ok(html.includes('생성 완료 0곡'));assert.ok(html.includes('Suno'));
 assert.ok(js.includes('https://suno.com/create'));
 assert.ok(!js.includes('Authorization: Bearer'));
 assert.ok(!js.includes('localStorage'));
});
