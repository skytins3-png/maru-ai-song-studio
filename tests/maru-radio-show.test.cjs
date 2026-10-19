const test=require("node:test"),assert=require("node:assert/strict"),fs=require("node:fs"),path=require("node:path");
const e=require("../vocal-studio/radio-show-engine.js"),song=(id,category)=>({id,title:"곡 "+id,category});
test("four genre rotation and 20 minute repeat guard",()=>{
 const rows=["KR","CN","WEST","INSTR"].map((c,i)=>song(String(i),c)),h=[];
 let cursor=0,now=100000;
 for(const wanted of ["KR","CN","WEST","INSTR"]){const next=e.choose(rows,h,now,cursor);assert.equal(next.track.category,wanted);h.push({id:next.track.id,at:now});cursor=next.index;now+=270000;}
 assert.equal(e.choose(rows,h,now,cursor),null);
 assert.equal(e.choose([song("a","KR")],[{id:"a",at:0}],1199999,0),null);
 assert.equal(e.choose([song("a","KR")],[{id:"a",at:0}],1200000,0).track.id,"a");
});
test("track classification is only a title hint",()=>{
 assert.equal(e.category("안녕.mp3"),"KR");assert.equal(e.category("春天.m4a"),"CN");
 assert.equal(e.category("piano.flac"),"INSTR");assert.equal(e.category("London.wav"),"WEST");
 assert.equal(e.title("<hi>.mp3"),"hi");
});
test("fictional hosts talk before and after an original song",()=>{
 assert.equal(e.HOSTS.length,8);assert.equal(e.before(song("1","CN"),1).length,3);
 assert.ok(e.before(song("1","CN"),1).some(x=>x.lang==="zh-CN"));
 assert.ok(e.after(song("1","KR")).length>=1);
});
test("manual comments get safe scripted replies; never restate harassment",()=>{
 assert.match(e.reply("fuck you").text,/존중/);assert.doesNotMatch(e.reply("fuck you").text,/fuck/);
 assert.match(e.reply("点歌").text,/자작곡/);assert.match(e.reply("你好").text,/谢谢/);
 assert.equal(e.reply(""),null);
});
test("browser preview never uploads original audio or claims BIGO streaming",()=>{
 const root=path.join(__dirname,"../vocal-studio");
 const html=fs.readFileSync(path.join(root,"radio-show.html"),"utf8");
 const js=fs.readFileSync(path.join(root,"radio-show.js"),"utf8");
 assert.match(html,/BIGO/);assert.match(html,/송출되는 것은 아닙니다/);
 assert.match(js,/speechSynthesis/);assert.match(js,/createObjectURL/);
 assert.doesNotMatch(js,/fetch\s*\(|WebSocket|XMLHttpRequest/);
});

test("read-only consent-gated studio audio bridge works without remote uploads",async()=>{
 const bridge=require("../vocal-studio/radio-show-bridge.js");
 assert.equal(bridge.STORES.length,2);
 const valid={name:"Original.mp3",blob:new Blob([Buffer.alloc(4096)])};
 assert.equal(bridge.valid(valid),true);
 assert.equal(bridge.valid({...valid,name:"evil.exe"}),false);
 assert.equal(bridge.valid({...valid,blob:new Blob([Buffer.alloc(2)])}),false);
 const hadIdb=global.indexedDB;
 delete global.indexedDB;
 try{
  const result=await bridge.loadAll();
  assert.deepEqual(result.songs,[]);
  assert.equal(result.failures.length,2);
 } finally{global.indexedDB=hadIdb;}
 const html=fs.readFileSync(path.join(__dirname,"../vocal-studio/radio-show.html"),"utf8");
 const js=fs.readFileSync(path.join(__dirname,"../vocal-studio/radio-show.js"),"utf8");
 assert.match(html,/id="bridgeConsent"/);assert.match(html,/id="importStudio"/);
 assert.match(html,/radio-show-bridge.js/);
 assert.match(js,/bridgeConsent/);assert.match(js,/MaruRadioBridge.loadAll/);
 assert.doesNotMatch(js,/fetch\s*\(|WebSocket|XMLHttpRequest/);
});
