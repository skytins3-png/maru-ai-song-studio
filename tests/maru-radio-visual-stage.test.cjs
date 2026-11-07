const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const C = require("../vocal-studio/radio-characters.js");
const E = require("../vocal-studio/radio-show-engine.js");
const source = name => fs.readFileSync(path.join(__dirname,"../vocal-studio",name),"utf8");

test("exactly eight distinguishable fictional cast profiles, correct departments", () => {
  assert.equal(C.CHARACTERS.length,8);
  assert.equal(new Set(C.CHARACTERS.map(c=>c.id)).size,8);
  assert.equal(new Set(C.CHARACTERS.map(c=>c.name)).size,8);
  assert.deepEqual(C.CHARACTERS.filter(c=>c.role==="host").map(c=>c.name),["아환","윤솔"]);
  assert.equal(C.CHARACTERS.filter(c=>c.role==="singer").length,4);
  assert.equal(C.CHARACTERS.filter(c=>c.role==="guest").length,2);
  for(const person of C.CHARACTERS){
    assert.ok(person.specialty && person.style && person.voice && person.department);
    assert.equal(C.find(person.id),person);
    assert.equal(C.find(person.name),person);
  }
  assert.equal(E.HOSTS.length,8);
  assert.deepEqual(new Set(E.HOSTS),new Set(C.CHARACTERS.map(c=>c.name)));
});

test("cue routing keeps songs on stage and voices in interview or bridge", () => {
  assert.equal(C.modeForCue("song"),"stage");
  assert.equal(C.modeForCue("story"),"talk");
  assert.equal(C.modeForCue("conversation"),"talk");
  assert.equal(C.modeForCue("intro"),"bridge");
  assert.equal(C.modeForCue("intermission"),"bridge");
  assert.equal(C.modeForCue("outro"),"bridge");
  assert.equal(C.modeForCue("invalid"),"idle");
  assert.equal(C.singerFor("KR").name,"강태준");
  assert.equal(C.singerFor("CN").name,"린아");
  assert.equal(C.singerFor("WEST").name,"서아");
  assert.equal(C.singerFor("INSTR"),null); // avoid fake vocalist on instrumental
  assert.equal(C.guestFor("아환").name,"윤솔");
  assert.equal(C.guestFor("하린").name,"하린");
  for(const category of E.CATEGORIES) {
    for(const line of [...E.before({title:"테스트",category},1),...E.after({title:"테스트",category})])
      assert.ok(C.CHARACTERS.some(c=>c.name===line.speaker),line.speaker);
  }
});

test("local visual uploads enforce supported types and size limits", () => {
  const file=(name,size,type)=>({name,size,type});
  assert.equal(C.mediaType(file("stage.mp4",1024,"video/mp4")),"video");
  assert.equal(C.mediaType(file("stage.webm",1024,"video/webm")),"video");
  assert.equal(C.mediaType(file("guest.jpg",1024,"image/jpeg")),"image");
  assert.equal(C.mediaType(file("guest.webp",1024,"image/webp")),"image");
  assert.equal(C.mediaType(file("evil.svg",1024,"image/svg+xml")),"");
  assert.equal(C.mediaType(file("evil.html",1024,"text/html")),"");
  assert.equal(C.mediaType(file("bad.mp4",1024,"application/zip")),"");
  assert.equal(C.mediaType(file("huge.mp4",201*1024*1024,"video/mp4")),"");
  assert.equal(C.mediaType(file("huge.jpg",21*1024*1024,"image/jpeg")),"");
  assert.equal(C.mediaType(file("empty.mp4",0,"video/mp4")),"");
  assert.equal(C.mediaType({name:"x.mp4"}),"");
});

test("UI has two-person stage, local video picker, consent and aspect controls", () => {
  const html=source("radio-show.html"),js=source("radio-stage.js"),css=source("radio-stage.css");
  for(const id of ["visualCanvas","visualCast","visualMovie","visualStill","visualTitle",
    "stageFile","stageRights","stageRatio","stagePerson","stageRemove"])
    assert.ok(html.includes('id="'+id+'"'),id);
  for(const file of ["radio-characters.js","radio-stage.js","radio-stage.css"])
    assert.ok(html.includes(file),file);
  assert.match(html,/무대 보기/);
  assert.match(html,/초대석 보기/);
  assert.match(html,/9:16/);
  assert.match(html,/1:1/);
  assert.match(html,/BIGO LIVE 청취자/);
  assert.match(js,/rights.checked/);
  assert.match(js,/URL.createObjectURL/);
  assert.match(js,/URL.revokeObjectURL/);
  assert.match(js,/movie.muted = true/);
  assert.match(js,/window.MaruVisualStage/);
  assert.match(css,/prefers-reduced-motion/);
  assert.doesNotMatch(js,/fetch\s*\(|WebSocket|XMLHttpRequest/);
  assert.doesNotMatch(js,/localStorage|sendBeacon|serviceWorker/);
});

test("show runner changes visual state only with local audio lifecycle", () => {
  const js=source("radio-show.js");
  assert.match(js,/visual\?\.song\(track\)/);
  assert.match(js,/visual\?\.speech\(line,kind\)/);
  assert.match(js,/visual\?\.idle\(\)/);
  assert.match(js,/talk\(E.before\(track,\+\+index\),ticket,"intro"\)/);
  assert.match(js,/talk\(E.after\(track\),ticket,"conversation"\)/);
});
