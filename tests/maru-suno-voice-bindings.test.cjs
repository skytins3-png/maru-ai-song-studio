const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs"),path=require("node:path");
const S=require("../vocal-studio/radio-suno-voice-library.js");
const artistList=require("../vocal-studio/artists.json");
const status=require("../vocal-studio/production-status.json");
const source=(n)=>fs.readFileSync(path.join(__dirname,"../vocal-studio",n),"utf8");
test("singer source IDs match all 30 canonical MARU Studio entries without claiming voices are generated",()=>{
 const expected=artistList.artists.map(x=>({id:x.id,name:x.name}));
 assert.deepEqual([...S.SINGERS].sort((a,b)=>a.id.localeCompare(b.id)),
                 expected.sort((a,b)=>a.id.localeCompare(b.id)));
 assert.equal(new Set(S.SINGERS.map(x=>x.id)).size,30);
 assert.equal(new Set(S.SINGERS.map(x=>x.name)).size,30);
 assert.equal(status.approvedCount,0);
 assert.equal(status.verifiedVocalMasters,0);
 assert.equal(status.tests.bigoListenerVerified,false);
});
test("auto matching is conservative with song titles",()=>{
 assert.equal(S.autoMatch("강태준 - 다시 태어나면.mp3").id,"M7-01");
 assert.equal(S.autoMatch("서하린_여름.wav").id,"F3-02");
 assert.equal(S.autoMatch("강태준 · 서하린 듀엣.mp3"),null);
 assert.equal(S.autoMatch("개인 원곡 1.mp3"),null);
 assert.equal(S.singer("unknown"),null);
});
test("vocal stems and actual recorded lines use explicit audio-only validation",()=>{
 const file=(name,size,type)=>({name,size,type});
 assert.equal(S.eligible(file("suno.wav",8192,"audio/wav")),true);
 assert.equal(S.eligible(file("voice.m4a",8192,"audio/mp4")),true);
 assert.equal(S.eligible(file("sample.mp3",1000,"audio/mpeg")),false);
 assert.equal(S.eligible(file("empty.wav",0,"audio/wav")),false);
 assert.equal(S.eligible(file("video.mp4",8192,"video/mp4")),false);
 assert.equal(S.eligible(file("x.svg",8192,"image/svg+xml")),false);
 assert.equal(S.eligible(file("fake.mp3",8192,"application/javascript")),false);
 assert.equal(S.eligible(file("oversize.wav",81*1024*1024,"audio/wav")),false);
 assert.equal(S.eligible(file("speech.wav",19*1024*1024,"audio/wav"),20),true);
 assert.equal(S.eligible(file("speech.wav",21*1024*1024,"audio/wav"),20),false);
 assert.equal(S.cueKey("아환","  안녕하세요.   음악 듣고 가세요.  "),"아환|안녕하세요. 음악 듣고 가세요.");
 assert.equal(S.isKnownVoice("아환"),true);
 assert.equal(S.isKnownVoice("강태준"),true);
 assert.equal(S.isKnownVoice("실제 연예인 이름"),false);
});
test("Suno vocal source is playback reference only, no model cloning or background download",()=>{
 const js=source("radio-recorded-cues.js");
 const cast=source("radio-suno-voice-library.js");
 const show=source("radio-show.js");
 const html=source("radio-show.html");
 assert.match(html,/TTS 사용 안 함/);
 assert.match(html,/멘트 녹음이 없으면 자막/);
 assert.match(js,/URL\.createObjectURL/);
 assert.match(js,/URL\.revokeObjectURL/);
 assert.match(js,/Library\.cueKey\(line\?\.speaker,line\?\.text\)/);
 assert.match(show,/singerId:match\?\.id\|\|""/);
 assert.match(show,/singerSelect\.onchange/);
 assert.doesNotMatch(show,/speechSynthesis|SpeechSynthesisUtterance/);
 assert.doesNotMatch(js,/speechSynthesis|SpeechSynthesisUtterance/);
 assert.doesNotMatch(js,/fetch\s*\(|WebSocket|XMLHttpRequest|localStorage/);
 assert.doesNotMatch(cast,/fetch\s*\(|WebSocket|XMLHttpRequest|localStorage/);
});
