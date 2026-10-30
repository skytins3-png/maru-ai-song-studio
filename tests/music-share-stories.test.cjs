const {test}=require('node:test');
const assert=require('node:assert/strict');
const vm=require('node:vm');
const fs=require('node:fs');

const code=fs.readFileSync(__dirname+'/../music-share/stories.js','utf8');
function load(){
  const context=vm.createContext({URL,console});
  vm.runInContext(fs.readFileSync(__dirname+'/../music-share/story-guard.js','utf8'),context);
  vm.runInContext(code,context);
  return context.MaruStories;
}
test('story submission needs explicit consent and meaningful text',()=>{
  const s=load();
  assert.throws(()=>s.issueUrl('Friend','Great Day','This is a long enough true story.',false),/permission/);
  assert.throws(()=>s.issueUrl('Friend','A','This is a long enough true story.',true),/title/);
  assert.throws(()=>s.issueUrl('Friend','Great Day','Too short',true),/20/);
});
test('issue URL uses the right GitHub repo and conveys public broadcast permission',()=>{
  const s=load();
  const url=new URL(s.issueUrl('Anonymous','A funny Tuesday',
    'I lost my umbrella but found an old friend at the station.',true));
  assert.equal(url.origin,'https://github.com');
  assert.equal(url.pathname,'/skytins3-png/maru-ai-song-studio/issues/new');
  assert.equal(url.searchParams.get('title'),'[STORY] A funny Tuesday');
  const body=url.searchParams.get('body');
  assert.match(body,/## Story\nI lost my umbrella/);
  assert.match(body,/publicly visible/);
  assert.match(body,/permission to submit/);
});
test('unsafe control characters and excessively long content are sanitized',()=>{
  const s=load();
  assert.equal(s.clean(' Hello\nworld\t ',40),'Hello world');
  assert.throws(()=>s.issueUrl('Sam','Test story', 'A'.repeat(5000),true),/Safety check/);
});
test('English public page connects music upload, download and story intake',()=>{
  const index=fs.readFileSync(__dirname+'/../music-share/index.html','utf8');
  const form=fs.readFileSync(__dirname+'/../music-share/stories.html','utf8');
  assert.match(index,/href="admin\.html"/);
  assert.match(index,/href="stories\.html"/);
  assert.match(index,/id="musicList"/);
  for(const field of ['storyName','storyTopic','storyBody','storyConsent','storyStatus']){
    assert.match(form,new RegExp('id="'+field+'"'));
  }
  assert.match(form,/public GitHub Issue/);
  assert.match(form,/public on GitHub/i);
  assert.match(form,/story-guard.js/);
});
