const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs"),path=require("node:path");
const Voices=require("../vocal-studio/radio-voice-cast.js");
const Cast=require("../vocal-studio/radio-characters.js");
const source=name=>fs.readFileSync(path.join(__dirname,"../vocal-studio",name),"utf8");
const voice=(name,lang,local=true)=>({name,voiceURI:name+"_"+lang,lang,localService:local});

test("all eight fictional cast voices have distinct stable speech profiles",()=>{
 assert.equal(Voices.SETTINGS.length,8);
 assert.deepEqual(new Set(Voices.SETTINGS.map(p=>p.name)),new Set(Cast.CHARACTERS.map(p=>p.name)));
 assert.equal(new Set(Voices.SETTINGS.map(p=>p.slot)).size,8);
 const a=Voices.style("아환"),b=Voices.style("윤솔");
 assert.ok(a.rate>=0.8 && a.rate<=1.2);
 assert.ok(a.pitch>=0.75 && a.pitch<=1.3);
 assert.notDeepEqual([a.rate,a.pitch],[b.rate,b.pitch]);
 assert.equal(Voices.style("없는사람").name,"아환");
});

test("voice browser list order cannot change consistent narrator casting",()=>{
 const original=[voice("Z 한국", "ko-KR"),voice("A 한국","ko-KR"),voice("D English","en-US"),voice("Y Korean remote","ko-KR",false)];
 const shuffled=[...original].reverse();
 const first=Voices.pick(original,"ko-KR","아환");
 const second=Voices.pick(shuffled,"ko-KR","아환");
 assert.equal(Voices.key(first),Voices.key(second));
 assert.ok(first.localService!==false,"prefer local voice if available");
 assert.notEqual(Voices.key(Voices.pick(original,"ko-KR","아환")),
   Voices.key(Voices.pick(original,"ko-KR","윤솔")));
 assert.deepEqual(Voices.candidates(original,"ja-JP"),[]);
 assert.equal(Voices.pick(original,"ja-JP","윤솔"),null);
 assert.equal(Voices.pick([], "ko-KR","아환"),null);
 assert.equal(Voices.candidates(original,"ko-KR").length,3);
});

test("producer voice override respects language and changes only target speaker",()=>{
 const ko=[voice("One","ko-KR"),voice("Two","ko-KR"),voice("Three","ko-KR")];
 const preferred=Voices.key(ko[1]);
 assert.equal(Voices.pick(ko,"ko-KR","아환",preferred),ko[1]);
 assert.notEqual(Voices.pick(ko,"en-US","아환",preferred),ko[1]);
 assert.equal(Voices.key(Voices.pick(ko,"ko", "아환")),
   Voices.key(Voices.pick(ko,"ko-KR","아환")));
 const voices=[voice("A","zh-CN"),voice("B","en-US")];
 assert.equal(Voices.pick(voices,"zh-CN","윤솔").lang,"zh-CN");
 assert.equal(Voices.pick(voices,"en-US","강태준").lang,"en-US");
});

test("three seats stay consistent across multi-person turns; do not invent live guests",()=>{
 const cast=Cast.castForConversation([
   {speaker:"아환"},{speaker:"윤솔"},{speaker:"하린"},{speaker:"아환"}]);
 assert.deepEqual(cast.map(c=>c.name),["윤솔","아환","하린"]);
 assert.deepEqual(Cast.castForConversation([{speaker:"아환"},{speaker:"민혁"}]).map(c=>c.name),
   ["윤솔","아환","민혁"]);
 assert.deepEqual(Cast.castForConversation([{speaker:"아환"},{speaker:"윤솔"}]).map(c=>c.name),
   ["윤솔","아환"]);
 assert.deepEqual(Cast.castForConversation([{speaker:"unknown"}]).map(c=>c.name),
   ["윤솔","아환"]);
});

test("recorded Suno clips replace TTS; no silent voice imitation or audio upload",()=>{
 const html=source("radio-show.html"),script=source("radio-show.js");
 const stage=source("radio-stage.js"),recorded=source("radio-recorded-cues.js");
 for(const id of ["sunoVoiceSinger","sunoVoiceFile","sunoVoicePreview",
   "sunoVoiceRights","cueSpeaker","cueText","cueFile","sunoVoiceStatus"])
  assert.ok(html.includes('id="'+id+'"'),id);
 assert.ok(html.includes("radio-suno-voice-library.js"));
 assert.ok(html.includes("radio-recorded-cues.js"));
 assert.doesNotMatch(html,/id="voicePreview"|id="voiceChoice"/);
 assert.match(script,/R\.playLine\(line\)/);
 assert.match(script,/S\.singer\(track\.singerId\)/);
 assert.match(script,/S\.autoMatch\(file\.name\)/);
 assert.match(script,/visual\?\.beginConversation\(lines\)/);
 assert.match(stage,/profileOf\(assigned\.id\)/);
 assert.match(stage,/const chosen = primary \? assets\.get\(primary\.id\) : null/);
 assert.match(stage,/movie\.muted = true/);
 assert.match(recorded,/Library\.cueKey\(line\?\.speaker,line\?\.text\)/);
 assert.match(recorded,/if\(!entry\)/);
 assert.match(recorded,/URL\.revokeObjectURL/);
 assert.doesNotMatch(script,/speechSynthesis|SpeechSynthesisUtterance/);
 assert.doesNotMatch(recorded,/speechSynthesis|SpeechSynthesisUtterance/);
 assert.doesNotMatch(script,/fetch\s*\(|WebSocket|XMLHttpRequest/);
 assert.doesNotMatch(recorded,/fetch\s*\(|WebSocket|XMLHttpRequest|localStorage/);
});
