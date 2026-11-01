import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import worker from '../src/worker.mjs';
const ORIGIN='https://skytins3-png.github.io';
function form(extra={}){
 const f=new FormData();
 const values={nickname:'RadioFan',title:'Meeting an old friend',story:'An old friend returned to town and we shared a lovely story together.',consent:'yes','cf-turnstile-response':'valid',...extra};
 for(const [k,v] of Object.entries(values))if(v!==null)f.append(k,v);
 return f;
}
function req(data,origin=ORIGIN){
 return new Request('https://api.example/api/stories',{method:'POST',headers:{origin,'cf-connecting-ip':'203.0.113.5'},body:data});
}
function storage(){
 const records=[],objects=new Map();
 return {records,objects,config:{
  TURNSTILE_SECRET:'private',RATE_SALT:'private-salt',
  RATE_LIMITER:{limit:async()=>({success:true})},
  DB:{prepare(query){assert.match(query,/INSERT INTO listener_stories/);return {
   bind(...args){return {run:async()=>{records.push(args);return {success:true}}}}}}},
  QUARANTINE:{put:async(k,data,meta)=>objects.set(k,{data,meta}),
   delete:async k=>objects.delete(k)}
 }};
}
async function withCaptcha(fn,ok=true){
 const before=globalThis.fetch;
 globalThis.fetch=async url=>{
  assert.equal(String(url),'https://challenges.cloudflare.com/turnstile/v0/siteverify');
  return Response.json({success:ok,hostname:'skytins3-png.github.io'});
 };
 try{return await fn()}finally{globalThis.fetch=before}
}
test('anonymous text intake never needs GitHub and always waits for producer review',async()=>{
 const db=storage();
 await withCaptcha(async()=>{
  const response=await worker.fetch(req(form()),db.config);
  assert.equal(response.status,201);
  const result=await response.json();
  assert.equal(result.ok,true);assert.equal(result.status,'pending_review');
  assert.match(result.receipt,/^[0-9a-f-]{36}$/);
  assert.equal(db.records.length,1);
  assert.equal(db.records[0][6],'pending_security_review');
  assert.equal(db.objects.size,0);
 });
});
test('image is private and still marked unscanned',async()=>{
 const db=storage(),f=form({mediaRights:'yes'});
 f.append('media',new Blob([Uint8Array.from([137,80,78,71,13,10,26,10,0,0,0,0,0,1])],{type:'image/png'}),'my.png');
 await withCaptcha(async()=>{
  const r=await worker.fetch(req(f),db.config);
  assert.equal(r.status,201);
  const [key,value]=[...db.objects.entries()][0];
  assert.match(key,/^quarantine\/.+\.png$/);
  assert.equal(value.meta.customMetadata.review,'unscanned');
  assert.equal(value.meta.httpMetadata.contentType,'application/octet-stream');
  assert.doesNotMatch(JSON.stringify(await r.json()),/quarantine\/|my\.png/);
 });
});
test('spoofed attachments, unsafe text and missing consent fail closed',async()=>{
 await withCaptcha(async()=>{
  const f=form({mediaRights:'yes'});
  f.append('media',new Blob(['<script>alert(1)</script>']),'fake.png');
  const db=storage();
  assert.equal((await worker.fetch(req(f),db.config)).status,400);
  assert.equal(db.objects.size,0);
  assert.equal((await worker.fetch(req(form({story:'Visit https://bad.example now'})),db.config)).status,400);
  assert.equal((await worker.fetch(req(form({consent:null})),db.config)).status,400);
  assert.equal((await worker.fetch(req(form()),db.config)).status,201);
 });
});
test('wrong origin, bad captcha, unavailable database and rate limit reject',async()=>{
 const db=storage();
 await withCaptcha(async()=>{
  assert.equal((await worker.fetch(req(form(),'https://bad.example'),db.config)).status,403);
  assert.equal((await worker.fetch(req(form()),{...db.config,DB:null})).status,503);
  assert.equal((await worker.fetch(req(form()),{...db.config,RATE_LIMITER:{limit:async()=>({success:false})}})).status,429);
 });
 await withCaptcha(async()=>{
  assert.equal((await worker.fetch(req(form()),storage().config)).status,403);
 },false);
});
test('site does not claim anonymous intake works before a server is connected',()=>{
 const config=JSON.parse(fs.readFileSync(new URL('../../music-share/guest-intake-config.json',import.meta.url),'utf8'));
 assert.equal(config.endpoint,'');assert.equal(config.turnstileSiteKey,'');
 const ui=fs.readFileSync(new URL('../../music-share/guest-stories.html',import.meta.url),'utf8');
 assert.match(ui,/id="guestSend" type="submit" disabled/);
 const logic=fs.readFileSync(new URL('../../music-share/guest-stories.js',import.meta.url),'utf8');
 assert.match(logic,/접수 서버 연결 준비 중입니다/);
 assert.doesNotMatch(logic,/github\.com\/.*issues\/new|GITHUB_TOKEN/);
});
