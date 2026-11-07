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
 assert.doesNotMatch(js,/speechSynthesis|SpeechSynthesisUtterance/);
 assert.match(js,/R\.playLine\(line\)/);
 assert.match(js,/S\.autoMatch\(file\.name\)/);assert.match(js,/createObjectURL/);
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

const host=require("../vocal-studio/radio-human-host.js");
test("scripted DJ intro varies over twelve songs without robotic three-voice template",()=>{
 const track={title:"소금강의 저녁",category:"KR"};
 const first=host.intro(track,1);
 assert.equal(first.length,3);
 assert.equal(first[0].speaker,"아환");
 assert.equal(first[1].speaker,"윤솔");
 const lines=Array.from({length:12},(_,i)=>host.intro(track,i+2)[0].text);
 assert.equal(new Set(lines).size,12);
 for(const part of lines)assert.match(part,/소금강의 저녁/);
 for(const i of [2,3,6,10,20])assert.equal(host.intro(track,i,"music").length,1);
});
test("realistic radio pacing has occasional silence and scheduled guest exchange",()=>{
 const sample={title:"달의 길",category:"KR"};
 assert.deepEqual(host.after(sample,2),[]);
 assert.equal(host.after(sample,3).length,1);
 assert.deepEqual(host.guestTalk(sample,2),[]);
 assert.equal(host.guestTalk(sample,3).length,4);
 assert.deepEqual(host.guestTalk(sample,3,"music"),[]);
 assert.equal(host.guestTalk(sample,2,"talk").length,4);
 assert.deepEqual(host.guestTalk(sample,3,"talk"),[]);
 assert.equal(host.flow("arbitrary"),"balanced");
 for(const mode of ["balanced","music","talk"]){
  for(let number=1;number<=35;number++){
   const all=[...host.intro(sample,number,mode),...host.after(sample,number,mode),
     ...host.guestTalk(sample,number,mode)];
   for(const item of all){
    assert.ok(item.text.length>0&&item.text.length<=240);
    assert.ok(e.HOSTS.includes(item.speaker));
    assert.ok(item.pauseMs>=0&&item.pauseMs<=600);
    assert.equal(item.lang,"ko-KR");
   }
  }
 }
});
test("guest dialogue alternates follow-up responses grounded in topic, without fake real guests",()=>{
 for(const category of ["KR","CN","WEST","INSTR"]){
  const conversation=host.guestTalk({title:"track",category},3);
  assert.ok(conversation.length>=3);
  assert.ok(conversation.some(turn=>turn.text.includes("?")));
  assert.ok(new Set(conversation.map(turn=>turn.speaker)).size>=2);
 }
 const joined=host.guestTalk({title:"foo",category:"WEST"},3).map(x=>x.text).join(" ");
 assert.match(joined,/곡 소개/);
 assert.doesNotMatch(joined,/실시간 댓글|오늘의 날씨는|청취자.*사연을 보내|실제 방문한/);
 const malicious=host.intro({title:"<script>alert(1)</script>",category:"KR"},4);
 assert.doesNotMatch(malicious.map(x=>x.text).join(" "),/[<>]/);
});
test("browser radio show connects source-approved natural hosting without remote LLM or ad-lib claims",()=>{
 const html=fs.readFileSync(path.join(__dirname,"../vocal-studio/radio-show.html"),"utf8");
 const js=fs.readFileSync(path.join(__dirname,"../vocal-studio/radio-show.js"),"utf8");
 const hostCode=fs.readFileSync(path.join(__dirname,"../vocal-studio/radio-human-host.js"),"utf8");
 assert.match(html,/radio-human-host\.js/);
 assert.match(html,/id="talkFlow"/);
 assert.match(html,/id="demoTalk"/);
 assert.match(js,/H\.guestTalk\(\{category:"KR"\},2,"talk"\)/);
 assert.match(js,/if\(ok&&ticket===epoch\)shutdown/);
 assert.match(html,/3곡마다 초대석/);
 assert.match(js,/H\.intro\(track,sequence,flow\)/);
 assert.match(js,/H\.guestTalk\(track,sequence,flow\)/);
 assert.match(js,/line\.pauseMs/);
 assert.doesNotMatch(hostCode,/fetch\s*\(|WebSocket|XMLHttpRequest|speechSynthesis|Math\.random/);
 assert.doesNotMatch(js,/fetch\s*\(|WebSocket|XMLHttpRequest/);
});

test("natural host still welcomes Chinese and English song audiences in their language",()=>{
 const cn={title:"云南的清晨",category:"CN"};
 const west={title:"Moonlight Street",category:"WEST"};
 const kr={title:"가을바다",category:"KR"};
 assert.ok(host.intro(cn,1).some(x=>x.lang==="zh-CN"));
 assert.ok(host.intro(cn,3).some(x=>x.lang==="zh-CN"));
 assert.ok(host.intro(cn,3,"music").some(x=>x.lang==="zh-CN"));
 assert.ok(host.intro(west,1).some(x=>x.lang==="en-US"));
 assert.ok(host.intro(west,3).some(x=>x.lang==="en-US"));
 assert.ok(host.intro(west,3,"music").some(x=>x.lang==="en-US"));
 assert.ok(host.intro(kr,3).every(x=>x.lang==="ko-KR"));
 assert.ok(host.intro(cn,3).every(x=>x.text.length<=240));
});

test("long music and talk programs rotate ten distinct guest topics before repeats",()=>{
 const song={title:"밤의 노래",category:"KR"};
 const scripts=[];
 for(let n=3;n<=30;n+=3){
  scripts.push(host.guestTalk(song,n,"balanced").map(x=>x.text).join("|"));
 }
 assert.equal(new Set(scripts).size,10);
 const spoken=[];
 for(let n=2;n<=20;n+=2){
  spoken.push(host.guestTalk(song,n,"talk").map(x=>x.text).join("|"));
 }
 assert.equal(new Set(spoken).size,10);
 assert.notEqual(scripts[0],scripts[1]);
});
