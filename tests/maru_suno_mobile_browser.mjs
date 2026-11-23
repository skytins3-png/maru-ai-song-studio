import assert from "node:assert/strict";
import { chromium } from "playwright-core";
import { existsSync } from "node:fs";

const base="https://skytins3-png.github.io/maru-ai-song-studio/vocal-studio/";
const browserPath=[process.env.CHROME_BIN,"/usr/bin/google-chrome","/usr/bin/chromium"].find(x=>x&&existsSync(x));
if(!browserPath)throw Error("Chrome missing; cannot claim end-to-end success");
const browser=await chromium.launch({headless:true,executablePath:browserPath,args:["--no-sandbox","--disable-dev-shm-usage"]});
let tests=0;
const yes=async(name,fn)=>{await fn();console.log("PASS "+name);tests++};
function syntheticWav(){
  const sampleRate=16000,length=sampleRate,buf=Buffer.alloc(44+length*2);
  buf.write("RIFF",0);buf.writeUInt32LE(buf.length-8,4);buf.write("WAVEfmt ",8);
  buf.writeUInt32LE(16,16);buf.writeUInt16LE(1,20);buf.writeUInt16LE(1,22);
  buf.writeUInt32LE(sampleRate,24);buf.writeUInt32LE(sampleRate*2,28);
  buf.writeUInt16LE(2,32);buf.writeUInt16LE(16,34);buf.write("data",36);buf.writeUInt32LE(length*2,40);
  for(let i=0;i<length;i++)buf.writeInt16LE(Math.round(Math.sin(2*Math.PI*440*i/sampleRate)*1000),44+i*2);
  return buf;
}
try{
 const ctx=await browser.newContext({viewport:{width:393,height:852},isMobile:true,hasTouch:true,
  userAgent:"Mozilla/5.0 (Linux; Android 17; SM-S948N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Mobile Safari/537.36"});
 ctx.setDefaultTimeout(28000);
 const page=await ctx.newPage();
 await yes("Real deployed mobile importer and source script ready",async()=>{
   let available=false;
   for(let i=0;i<24;i++){
     const h=await page.request.get(base+"mobile-suno.html?audit="+Date.now()+"-"+i,{timeout:14000});
     const s=await page.request.get(base+"mobile-suno.js?audit="+Date.now()+"-"+i,{timeout:14000});
     const bridge=await page.request.get(base+"radio-show-bridge.js?audit="+Date.now()+"-"+i,{timeout:14000});
     if(h.ok()&&s.ok()&&bridge.ok()&&(await h.text()).includes("MARU SUNO 모바일 보관함")&&
       (await s.text()).includes("maru-suno-mobile-v1")&&(await bridge.text()).includes('store:"songs",source:"maru-suno-mobile-persistent"')){
       available=true;break;
     }
     await new Promise(r=>setTimeout(r,8000));
   }
   assert(available,"Current importer not yet published via GitHub Pages");
   const r=await page.goto(base+"mobile-suno.html",{waitUntil:"domcontentloaded",timeout:50000});
   assert.equal(r.status(),200);
   await page.waitForFunction(()=>document.getElementById("librarySummary")?.textContent.includes("0곡"),null,{timeout:20000});
 });
 const wav=syntheticWav();
 await yes("Add a real WAV song to persistent local IndexedDB",async()=>{
   await page.locator("#files").setInputFiles({name:"강태준 합법 자작곡 시험.wav",mimeType:"audio/wav",buffer:wav});
   await page.locator("#confirmRights").check();
   await page.locator("#importFiles").click();
   await page.waitForFunction(()=>document.getElementById("librarySummary")?.textContent.includes("1곡"),null,{timeout:25000});
   const r=await page.evaluate(()=>new Promise((resolve,reject)=>{
     const q=indexedDB.open("maru-suno-mobile-v1");q.onsuccess=()=>{
       const d=q.result,tx=d.transaction("songs","readonly"),g=tx.objectStore("songs").getAll();
       g.onsuccess=()=>resolve(g.result.map(x=>({name:x.name,id:x.id,singerId:x.singerId,size:x.blob.size})));
       g.onerror=()=>reject(g.error);
     };q.onerror=()=>reject(q.error)
   }));
   assert.equal(r.length,1);assert.equal(r[0].size,wav.length);
   assert.equal(r[0].singerId,"M01");assert.equal(r[0].id.length,64);
 });
 await yes("Exact reimport avoids duplication, original song preserved",async()=>{
   await page.locator("#files").setInputFiles({name:"강태준 합법 자작곡 시험.wav",mimeType:"audio/wav",buffer:wav});
   await page.locator("#importFiles").click();
   await page.waitForFunction(()=>document.getElementById("importStatus").textContent.includes("동일 파일 1곡"),null,{timeout:15000});
   assert.match(await page.locator("#librarySummary").innerText(),/1곡/);
 });
 await yes("Manual singer mapping saved after reload",async()=>{
   await page.locator("#songs .song select").first().selectOption("F01");
   await page.reload({waitUntil:"domcontentloaded"});
   await page.waitForFunction(()=>document.querySelector("#songs .song select")!==null,null,{timeout:15000});
   assert.equal(await page.locator("#songs .song select").first().inputValue(),"F01");
 });
 await yes("Actual vocal sample stored but not misreported as an AI speaking model",async()=>{
   await page.locator("#voiceSinger").selectOption("F01");
   await page.locator("#vocalFile").setInputFiles({name:"보컬 추출 예제.wav",mimeType:"audio/wav",buffer:wav});
   await page.locator("#saveVocal").click();
   await page.waitForFunction(()=>document.getElementById("vocalStatus")?.textContent.includes("실제 저장됨"));
   const result=await page.evaluate(()=>new Promise((resolve,reject)=>{
     const req=indexedDB.open("maru-suno-mobile-v1");req.onsuccess=()=>{
       const a=req.result.transaction("vocals","readonly").objectStore("vocals").get("F01");
       a.onsuccess=()=>resolve({exists:!!a.result,voiceModelCreated:a.result?.voiceModelCreated,bytes:a.result?.blob?.size});
       a.onerror=()=>reject(a.error);
     };req.onerror=()=>reject(req.error)
   }));
   assert.equal(result.exists,true);assert.equal(result.voiceModelCreated,false);assert.equal(result.bytes,wav.length);
 });
 const cueText="어서 오세요. 자작곡을 들려드리는 마루 라디오입니다.";
 await yes("Actual authorized voice line stored as exact speaker+text audio",async()=>{
   await page.locator("#cueSpeaker").selectOption("雲上居者");
   await page.locator("#cueText").fill(cueText);
   await page.locator("#cueRights").check();
   await page.locator("#cueFile").setInputFiles({name:"실제 음성 원본.wav",mimeType:"audio/wav",buffer:wav});
   await page.locator("#saveCue").click();
   await page.waitForFunction(()=>document.getElementById("cueStatus").textContent.includes("실제로 저장되었습니다."));
 });
 const radio=await ctx.newPage();
 await yes("RADIO can read exactly one persisted song in same Chrome profile",async()=>{
   const r=await radio.goto(base+"radio-show.html",{waitUntil:"domcontentloaded",timeout:55000});
   assert.equal(r.status(),200);
   await radio.locator("#bridgeConsent").check();
   await radio.locator("#importStudio").click();
   await radio.waitForFunction(()=>document.getElementById("count").textContent.includes("1곡"),null,{timeout:28000});
   const singers=await radio.locator("#songs li select").last().inputValue();
   assert.equal(singers,"F01");
 });
 await yes("RADIO imports matching real recorded cue from persistent mobile store",async()=>{
   await radio.locator("#mobileCueConsent").check();
   await radio.locator("#importMobileCues").click();
   await radio.waitForFunction(()=>document.getElementById("status").textContent.includes("실제 녹음 멘트 1개"),null,{timeout:22000});
   const info=await radio.evaluate((line)=>{
     const x=window.MaruRecordedCues.playLine({speaker:"아환",text:line});
     const matched=x.matched;x.cancel();return{count:window.MaruRecordedCues.cueCount(),matched};
   },cueText);
   assert.equal(info.count,1);assert.equal(info.matched,true);
 });
 await yes("Original Suno mobile music remains private in browser not public server",async()=>{
   const server=await page.request.get(base+"../music-share/catalog.json");
   assert(server.ok());
   const list=await server.json();assert(Array.isArray(list));
   assert(!list.some(x=>String(x.title||x.name||"").includes("합법 자작곡 시험")));
 });
 console.log("MARU SUNO MOBILE REAL CHROME PASS "+tests+"/9");
}finally{await browser.close()}
