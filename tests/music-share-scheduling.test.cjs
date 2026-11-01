'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict');
const fs=require('node:fs'),vm=require('node:vm');
const root=__dirname+'/../music-share/';
const sandbox=vm.createContext({URL,Date});
for(const name of ['story-guard.js','stories.js','radio-core.js','media-proposal.js'])
 vm.runInContext(fs.readFileSync(root+name,'utf8'),sandbox);
const guard=sandbox.MaruStoryGuard,story=sandbox.MaruStories,radio=sandbox.MaruRadioCore,proposal=sandbox.MaruMediaProposal;
const goodStory='I met an old friend at a concert and we talked for hours.';
function issueFromUrl(url,id=12){
 const u=new URL(url);return {number:id,title:u.searchParams.get('title'),body:u.searchParams.get('body'),state:'open',labels:[]};
}
test('KST validation rejects leap-day errors and ambiguous timezone, UTC conversion is correct',()=>{
 assert.equal(guard.parseKstSlot('2026-11-02T19:30'),'2026-11-02T10:30:00.000Z');
 assert.equal(guard.parseKstSlot('2026-02-29T19:30'),null);
 assert.equal(guard.parseKstSlot('2026-11-02T25:00'),null);
 assert.equal(guard.parseKstSlot('2026-11-02T19:30Z'),null);
 assert.equal(guard.parseKstSlot(''),'');
});
test('approved story metadata never becomes spoken story text',()=>{
 const url=story.issueUrl('Test','Friendly evening',goodStory,true,'2026-11-02T19:30');
 const i=issueFromUrl(url);
 const checked=guard.evaluateIssue(i);
 assert.equal(checked.safe,true);
 assert.equal(checked.story,goodStory);
 assert.equal(checked.scheduledAt,'2026-11-02T10:30:00.000Z');
 assert.doesNotMatch(checked.story,/airtime/i);
 const bad=issueFromUrl(url);
 bad.body=bad.body.replace('2026-11-02T19:30','2026-02-29T19:30');
 assert.equal(guard.evaluateIssue(bad).safe,false);
});
test('scheduled slot cannot be read early or long after it expires',()=>{
 const target=Date.parse('2026-11-02T10:30:00.000Z');
 const entries=[{id:1,name:'A',story:goodStory,scheduledAt:'2026-11-02T10:30:00.000Z'}];
 assert.equal(radio.dueStory(entries,new Set(),target-1),null);
 assert.equal(radio.dueStory(entries,new Set(),target)?.id,1);
 assert.equal(radio.dueStory(entries,new Set(),target+29*60000)?.id,1);
 assert.equal(radio.dueStory(entries,new Set(),target+31*60000),null);
 assert.equal(radio.dueStory(entries,new Set([1]),target),null);
 assert.equal(radio.dueStory([{...entries[0],scheduledAt:'broken'}],new Set(),target),null);
});
test('media proposals are public review metadata only, never binary uploads or auto-broadcast',()=>{
 const request={type:'video',name:'Listener',title:'My autumn movie',creator:'Listener',
  description:'A short original film about visiting my hometown and memories.',
  rights:'creator-attested',airtime:'2026-11-02T19:30',
  publicConsent:true,broadcastConsent:true};
 const u=new URL(proposal.issueUrl(request));
 assert.equal(u.origin,'https://github.com');
 assert.equal(u.pathname,'/skytins3-png/maru-ai-song-studio/issues/new');
 assert.match(u.searchParams.get('title'),/^\[MEDIA-REVIEW\]/);
 const body=u.searchParams.get('body');
 assert.match(body,/2026-11-02T19:30/);
 assert.match(body,/검증 안 됨/);
 assert.match(body,/실제 파일이 없으며/);
 assert.throws(()=>proposal.issueUrl({...request,publicConsent:false}),/동의/);
 assert.throws(()=>proposal.issueUrl({...request,description:'https:\/\/evil.example/install.exe download it'}),/검사/);
 assert.throws(()=>proposal.issueUrl({...request,rights:'pretend-granted'}),/권리 상태/);
});
test('hub links, CSP, and no unsafe direct public upload',()=>{
 for(const file of ['broadcast-center.html','media-proposal.html']){
  const s=fs.readFileSync(root+file,'utf8');
  assert.match(s,/Content-Security-Policy/);
  assert.match(s,/script-src 'self'/);
  assert.match(s,/object-src 'none'/);
 }
 const center=fs.readFileSync(root+'broadcast-center.html','utf8');
 for(const path of ['admin.html','stories.html','media-proposal.html','radio.html'])assert.ok(center.includes(path));
 const media=fs.readFileSync(root+'media-proposal.html','utf8');
 assert.doesNotMatch(media,/type="file"/);
 assert.match(media,/현재는 파일 업로드가 아닙니다/);
});