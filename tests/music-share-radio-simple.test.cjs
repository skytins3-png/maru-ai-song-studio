'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const root=__dirname+'/../music-share/';
const html=fs.readFileSync(root+'radio.html','utf8');
const css=fs.readFileSync(root+'radio.css','utf8');

test('phone radio starts with a single visual stage and exactly three visible playback controls',()=>{
 assert.match(html,/<html lang="ko">/);
 assert.match(html,/class="radio-stage"/);
 assert.match(html,/id="nowPlaying"/);
 assert.match(html,/id="startRadio"[^>]*>▶ 재생<\/button>/);
 assert.match(html,/id="stopRadio"[^>]*>■ 정지<\/button>/);
 assert.match(html,/id="skipRadio"[^>]*>다음 곡<\/button>/);
 assert.equal((html.match(/class="radio-stage"/g)||[]).length,1);
 assert.equal((html.match(/id="(?:startRadio|stopRadio|skipRadio)"/g)||[]).length,3);
 assert.match(css,/\.radio-stage\{[^}]*aspect-ratio:/);
 assert.match(css,/@media\(max-width:520px\)/);
});
test('advanced filters and verbose information are closed until requested',()=>{
 const advanced=html.split('<details class="radio-advanced" id="radioSettings">')[1];
 assert.ok(advanced,'advanced section must exist');
 const end=advanced.indexOf('</details>');
 assert.ok(end>0);
 const settings=advanced.slice(0,end);
 for(const id of ['radioGenre','talkEnabled','storiesEnabled','dailyEnabled','weatherCity',
  'radioCounts','localHelp','clearLocal','dailySummary','newsSource']){
   assert.ok(settings.includes('id="'+id+'"'),id+' must live inside closed settings');
   assert.equal(html.split('id="'+id+'"').length,2,id+' must be unique');
 }
 assert.doesNotMatch(html,/<details[^>]+id="radioSettings"[^>]*open/);
 assert.match(html,/이용 안내 · 주의사항/);
 assert.match(html,/오디오 미리듣기/);
 assert.match(html,/실제 아환 영상이나 BIGO 송출 화면은 아닙니다/);
});
test('local music picker is visible and never uploads originals',()=>{
 const firstDetails=html.indexOf('<details class="radio-advanced"');
 assert.ok(html.indexOf('id="localFiles"')<firstDetails);
 assert.match(html,/id="localFiles"[^>]*multiple/);
 assert.match(html,/id="radioAudio"/);
 assert.match(html,/radio\.js\?v=6/);
});

test('listener and owner submission buttons stay visible outside collapsed settings',()=>{
 const pos=html.indexOf('<details class="radio-advanced"');
 assert.ok(pos>0);
 for(const label of ['시청자 사연 + 사진·영상·노래 보내기','형의 곡 + 표지 올리기']){
  assert.ok(html.indexOf(label)>0 && html.indexOf(label)<pos,label);
 }
 assert.match(html,/<a class="radio-submit-action listener" href="stories\.html">/);
 assert.match(html,/<a class="radio-submit-action owner" href="admin\.html">/);
 const index=fs.readFileSync(root+'index.html','utf8');
 assert.match(index,/href="stories\.html" class="submit-entry-link"/);
 assert.match(index,/href="admin\.html" class="submit-entry-link owner"/);
});
