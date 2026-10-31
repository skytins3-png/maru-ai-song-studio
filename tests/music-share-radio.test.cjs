const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=__dirname+'/../music-share/';
function sandbox(file){
  const ctx=vm.createContext({URL});
  vm.runInContext(fs.readFileSync(path+'story-guard.js','utf8'),ctx);
  vm.runInContext(fs.readFileSync(path+file,'utf8'),ctx);
  return ctx;
}
const core=sandbox('radio-core.js').MaruRadioCore;
const permitted=[
  {id:'track1',title:'Wind Song',artist:'MARU',audio:'tracks/wind.mp3',downloadAllowed:true},
  {id:'track2',title:'Morning Star',audio:'tracks/morning.wav',downloadAllowed:true}
];
function sampleStory(label=true,consent=true){
 return {number:15,title:'[STORY] Yesterday at the station',state:'open',
 labels:label?[{name:'radio-approved'},{name:'radio-screened'}]:[],body:
 '## Listener name\nEmily\n\n## Story\nThe bus was late and I found a friend I had not seen in decades.\n\n## Permission\n'
 +(consent?'- [x] I have permission to submit this story for public posting and radio reading.\n'
 +'- [x] I understand this GitHub Issue is publicly visible.':'- [ ] I have permission to submit this story for public posting and radio reading.')};
}
test('only creator-approved local original media makes the radio playlist',()=>{
 const list=core.publicSongs([...permitted,{id:'private',audio:'tracks/secret.mp3',downloadAllowed:false},
   {id:'remote',audio:'https://bad.test/c.mp3',downloadAllowed:true},
   {id:'escape',audio:'tracks/../hidden.mp3',downloadAllowed:true},
   {id:'again',audio:'tracks/%2e%2e.mp3',downloadAllowed:true},
   {...permitted[0]}]);
 assert.equal(list.length,2);
 assert.equal(core.publicSongs({}).length,0);
});
test('never narrate unapproved, nonconsented, or deleted public stories',()=>{
 assert.equal(core.approvedStories([sampleStory(false),sampleStory(true,false),{...sampleStory(),state:'closed'}]).length,0);
 const story=core.approvedStories([sampleStory()]);
 assert.equal(story.length,1);assert.equal(story[0].name,'Emily');
 assert.match(story[0].story,/decades/);
});
test('radio chooses known published requests without reading arbitrary issue text',()=>{
 const requests=core.requests([
  {title:'[REQUEST] Wind Song',body:'Track ID: track1\n\nrandom rude user input',state:'open'},
  {title:'[REQUEST] Nonexistent',body:'Track ID: missing',state:'open'},
  {title:'[STORY] Somebody',body:'Track ID: track2',state:'open'},
  {title:'[REQUEST] Duplicate',body:'Track ID: track1',state:'open'}
 ],permitted);
 assert.equal(requests.length,1);
 assert.equal(requests[0].id,'track1');
 const played=new Set();
 const picked=core.chooseTrack(permitted,0,requests,played);
 assert.equal(picked.requested,true);
 assert.equal(picked.track.id,'track1');
 played.add('track1');
 assert.equal(core.chooseTrack(permitted,1,requests,played).requested,false);
});
test('DJ talk is short, genuinely responsive, and goes straight to the song',()=>{
 const now=Date.parse('2026-10-30T00:00:00Z');
 const a=core.episodeScript(permitted[0],1,now,null,true);
 const b=core.episodeScript(permitted[1],2,now,null,false);
 assert.equal(a.length,5);
 assert.equal(a.map(x=>x.who).join(','),'host,guest,host,guest,host');
 assert.ok(a.slice(0,4).every(x=>x.text.split(/\\s+/).length<=22));
 assert.ok(a.reduce((n,x)=>n+x.text.split(/\\s+/).length,0)<=100);
 assert.match(a[4].text,/listener picked/i);
 assert.notEqual(a[0].text,b[0].text);
 assert.ok(!b.some(x=>x.text.includes('listener story')));
});
test('only approved story excerpt replaces banter; never make long news-length monologues',()=>{
 const story=core.approvedStories([sampleStory()])[0];
 const lines=core.episodeScript(permitted[0],1,Date.now(),story,true);
 assert.equal(lines.length,5);
 assert.match(lines.map(x=>x.text).join(' '),/bus was late/i);
 assert.ok(lines.some(x=>x.text.includes('Emily')));
 assert.ok(lines.every(x=>x.text.length<=260));
 const longer={name:'Listener',story:'Something meaningful '.repeat(40)};
 const brief=core.episodeScript(permitted[0],1,Date.now(),longer,false);
 assert.ok(brief.some(x=>/short excerpt/.test(x.text)));
 assert.equal(brief.length,5);
});
test('song request form creates public GitHub issue referencing exact published track',()=>{
 const req=sandbox('requests.js').MaruSongRequest;
 assert.throws(()=>req.issueUrl(permitted[0],false),/public/);
 assert.throws(()=>req.issueUrl(null,true),/published/);
 const u=new URL(req.issueUrl(permitted[0],true));
 assert.equal(u.hostname,'github.com');
 assert.equal(u.pathname,'/skytins3-png/maru-ai-song-studio/issues/new');
 assert.equal(u.searchParams.get('title'),'[REQUEST] Wind Song');
 assert.match(u.searchParams.get('body'),/Track ID: track1/);
});
test('radio and request links exist and data is not automatically marked approved',()=>{
 const index=fs.readFileSync(path+'index.html','utf8');
 const radio=fs.readFileSync(path+'radio.html','utf8');
 const request=fs.readFileSync(path+'requests.html','utf8');
 assert.match(index,/href="radio.html"/);
 assert.match(index,/href="requests.html"/);
 assert.match(radio,/id="startRadio"/);
 assert.match(radio,/producer-approved|approved.*public.*stories/i);
 assert.match(request,/id="requestConsent"/);
 assert.equal(fs.readFileSync(path+'catalog.json','utf8').trim(),'[]');
});