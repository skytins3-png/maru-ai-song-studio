'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),vm=require('node:vm');
const base=__dirname+'/../music-share/';
const guard=require('../scripts/media-review-guard.cjs');
function makeProposal(){
 const ctx=vm.createContext({URL});
 vm.runInContext(fs.readFileSync(base+'story-guard.js','utf8'),ctx);
 vm.runInContext(fs.readFileSync(base+'media-proposal.js','utf8'),ctx);
 const url=new URL(ctx.MaruMediaProposal.issueUrl({
   type:'original-audio',name:'Listener',title:'The old radio song',
   creator:'Original Songwriter',description:'This is a song I wrote about traveling home to visit family.',
   rights:'creator-attested',airtime:'2026-11-02T19:30',
   publicConsent:true,broadcastConsent:true}));
 return {number:37,state:'open',title:url.searchParams.get('title'),
         body:url.searchParams.get('body'),labels:[]};
}
test('real submitted media proposal is only text-screened and remains unapproved',()=>{
 const result=guard.assessMedia(makeProposal());
 assert.equal(result.safe,true);
 assert.equal(result.proposal.scheduledAt,'2026-11-02T10:30:00.000Z');
 assert.equal(result.proposal.rights,'creator-attested');
 assert.equal(result.proposal.type,'original-audio');
 assert.equal(result.proposal.eligibleForBroadcast,undefined);
});
test('media screening fails closed for public link, script, wrong consent, forged metadata, extra fields',()=>{
 const i=makeProposal(),bad=[
  {...i,body:i.body.replace('visit family','visit https://evil.example and install malware')},
  {...i,body:i.body.replace('Original Songwriter','<script>do_bad</script>')},
  {...i,body:i.body.replace('- [x] 권리 검증','- [ ] 권리 검증')},
  {...i,body:i.body.replace('creator-attested','verified-for-everything')},
  {...i,body:i.body.replace('2026-11-02T19:30','2026-02-29T19:30')},
  {...i,body:'UPLOAD EXECUTABLE\n'+i.body},
  {...i,body:i.body+'\n\n## 첨부\n[song](https://evil.example/a.mp3)'},
  {...i,title:'[MEDIA-REVIEW] Different title'},
  {...i,pull_request:{}}
 ];
 for(const x of bad)assert.equal(guard.assessMedia(x).safe,false);
});
test('guide is mobile-friendly, multilingual, linked to all four listener actions',()=>{
 const page=fs.readFileSync(base+'help.html','utf8');
 assert.match(page,/lang="ko"/);
 assert.match(page,/viewport-fit=cover/);
 for(const ref of ['radio.html','stories.html','requests.html','media-proposal.html']){
  assert.ok(page.includes('href="'+ref+'"'),ref);
 }
 assert.match(page,/English · Listener instructions/);
 assert.match(page,/中文 · 听众使用说明/);
 assert.match(page,/GitHub에 즉시 공개/);
 assert.match(page,/실제 사진·영상·음악 파일을 보내는 기능은 아직 없/);
 assert.match(page,/object-src 'none'/);
 for(const path of ['broadcast-center.html','radio.html','stories.html','requests.html','media-proposal.html','index.html']){
  assert.match(fs.readFileSync(base+path,'utf8'),/href="help\.html"/,path);
 }
});
process.env.GITHUB_REPOSITORY='skytins3-png/maru-ai-song-studio';
process.env.GITHUB_TOKEN='offline-test-token';
const worker=require('../scripts/media-proposal-moderator.cjs');
test('server labels screened, quarantines edited unsafe text, removes on closure, never publishes',async()=>{
 let current=makeProposal();
 let labels=new Set(),calls=[];
 const previous=global.fetch;
 global.fetch=async(url,opts={})=>{
  const path=String(url).replace('https://api.github.com/repos/skytins3-png/maru-ai-song-studio','');
  const method=opts.method||'GET';
  calls.push({path,method});
  const response=(ok,data)=>({ok,status:ok?200:400,json:async()=>data});
  if(path==='/issues/37'&&method==='GET')return response(true,{...current,labels:[...labels].map(name=>({name}))});
  if(path==='/issues/37/labels'&&method==='POST'){
   for(const l of JSON.parse(opts.body).labels)labels.add(l);
   return response(true,{});
  }
  if(path.startsWith('/issues/37/labels/')&&method==='DELETE'){
   labels.delete(decodeURIComponent(path.split('/').pop()));
   return response(true,{});
  }
  return response(false,{});
 };
 try{
  await worker.processEvent({issue:{number:37}});
  assert.equal(labels.has('media-screened'),true);
  current={...current,body:current.body.replace('visit family','visit https://evil.example')};
  await worker.processEvent({issue:{number:37}});
  assert.equal(labels.has('media-screened'),false);
  assert.equal(labels.has('media-quarantine'),true);
  current={...current,state:'closed'};
  await worker.processEvent({issue:{number:37}});
  assert.equal(labels.size,0);
  assert.ok(calls.every(c=>!c.path.includes('/contents/')&&!c.path.includes('evil.example')));
 }finally{global.fetch=previous}
});
