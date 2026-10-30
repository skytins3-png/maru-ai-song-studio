const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const read=name=>fs.readFileSync(__dirname+'/../music-share/'+name,'utf8');
const context=vm.createContext({});
vm.runInContext(read('story-guard.js'),context);
vm.runInContext(read('radio-core.js'),context);
vm.runInContext(read('radio-daily.js'),context);
const core=context.MaruRadioCore;

test('honest talk-only mode contains real dialogue but never promises nonexistent music',()=>{
 const lines=core.talkEpisodeScript(0,Date.parse('2026-10-30T12:00:00Z'),null);
 const text=lines.map(x=>x.text).join(' ');
 assert.ok(lines.length>=9);
 assert.match(text,/We don't have a song file loaded yet/);
 assert.match(text,/Choose your own Suno MP3 files/);
 assert.doesNotMatch(text,/Here's a track from our original music library/);
 assert.ok(lines.every(x=>x.who==='host'||x.who==='guest'));
 const other=core.talkEpisodeScript(1,Date.parse('2026-10-30T12:00:00Z'),null);
 assert.notEqual(lines[2].text,other[2].text);
});
test('approved story can be read in talk-only broadcast, unapproved cannot',()=>{
 const msg={number:21,title:'[STORY] My friend',state:'open',
  labels:[{name:'radio-approved'},{name:'radio-screened'}],
  body:'## Listener name\nLee\n\n## Story\nAn old friend returned unexpectedly one sunny afternoon.\n\n## Permission\n- [x] I have permission to submit this story for public posting and radio reading.\n- [x] I understand this GitHub Issue is publicly visible.'};
 const story=core.approvedStories([msg])[0];
 assert.ok(core.talkEpisodeScript(0,Date.now(),story).some(x=>x.text.includes('old friend')));
 assert.ok(!core.talkEpisodeScript(0,Date.now(),null).some(x=>x.text.includes('old friend')));
});
test('local Suno files are deduplicated and kept private, with URL blob object links',()=>{
 const f=(name,size,lastModified)=>({name,size,lastModified});
 const all=core.localOriginals([
  f('My First Song.mp3',1024,1),f('My First Song.mp3',1024,1),
  f('Ballad.WAV',4096,2),f('README.pdf',2048,3),f('empty.mp3',0,4),
  f('Huge.mp3',251*1024*1024,5)
 ],file=>'blob:'+file.name);
 assert.equal(all.length,2);
 assert.equal(all[0].title,'My First Song');
 assert.equal(all[1].title,'Ballad');
 assert.equal(all[0].artist,'Private local original');
 assert.equal(all[0].local,true);
 assert.equal(all[0].audio,'blob:My First Song.mp3');
 assert.equal(core.publicSongs(all).length,0);
});
function browser(){
 const components=new Map(),posts=[],spoken=[],revoked=[],played=[];
 function component(id){
  if(components.has(id))return components.get(id);
  const o={value:'',files:[],checked:id!=='storiesEnabled',disabled:false,
   hidden:false,src:'',currentSrc:'',textContent:'',handlers:{},
   addEventListener(n,fn){this.handlers[n]=fn},
   pause(){},
   load(){},
   removeAttribute(k){if(k==='src'){this.src='';this.currentSrc=''}},
   getAttribute(k){return k==='src'?this.src:null},
   play(){played.push(this.src);this.currentSrc=this.src;return Promise.resolve()}
  };
  components.set(id,o);return o;
 }
 let objects=0;
 const URLmock={
   createObjectURL(file){return 'blob:private-'+(++objects)+'-'+file.name},
   revokeObjectURL(url){revoked.push(url)}
 };
 const speech={
   getVoices(){return [{name:'English',lang:'en-US',localService:true}]},
   cancel(){},
   resume(){},
   speak(utterance){
     spoken.push(utterance.text);
     queueMicrotask(()=>utterance.onend&&utterance.onend());
   }
 };
 const timerTokens=new Set();
 const ctx=vm.createContext({
   document:{getElementById:component,addEventListener(){}},
   window:{speechSynthesis:speech,addEventListener(){}},
   SpeechSynthesisUtterance:function(text){this.text=text},
   URL:URLmock,
   fetch(url,options){posts.push({url,method:options?.method||'GET'});
      return Promise.resolve({ok:true,json:async()=>[]})},
   Date,console,Set,Promise,
   setTimeout(fn,ms){const id=setTimeout(fn,ms);timerTokens.add(id);return id},
   clearTimeout(id){clearTimeout(id);timerTokens.delete(id)},
   globalThis:null
 });
 ctx.globalThis=ctx;ctx.MaruRadioCore=core;ctx.MaruStoryGuard=context.MaruStoryGuard;ctx.MaruDailyFacts=context.MaruDailyFacts;
 vm.runInContext(read('radio.js'),ctx);
 async function settle(){await new Promise(r=>setTimeout(r,80))}
 function close(){
   component('stopRadio').handlers.click();
   for(const id of timerTokens)clearTimeout(id);
 }
 return {component,spoken,played,revoked,posts,settle,close};
}
test('Start speaks without any public songs, no fake song player audio starts',async()=>{
 const app=browser();
 try{
  await app.settle();
  app.component('talkEnabled').checked=true;
  app.component('startRadio').handlers.click();
  await app.settle();
  assert.match(app.component('nowPlaying').textContent,/English conversation/);
  assert.ok(app.spoken.length>=6);
  assert.equal(app.played.length,0);
  assert.match(app.component('status').textContent,/Talk-only|English radio/);
 }finally{app.close()}
});
test('user-selected private MP3s are played without uploading and released from memory',async()=>{
 const app=browser();
 try{
  app.component('localFiles').files=[
    {name:'My Suno Original.mp3',size:5000,lastModified:10},
    {name:'Other Original.wav',size:8000,lastModified:20}
  ];
  app.component('localFiles').handlers.change();
  assert.match(app.component('radioCounts').textContent,/2 private tracks/);
  assert.match(app.component('status').textContent,/No upload or GitHub token/);
  app.component('talkEnabled').checked=false;
  app.component('startRadio').handlers.click();
  await app.settle();
  assert.equal(app.played.length,1);
  assert.match(app.played[0],/blob:private/);
  assert.ok(app.posts.every(x=>x.method==='GET'));
  app.component('clearLocal').handlers.click();
  assert.equal(app.revoked.length,2);
 }finally{app.close()}
});
test('mobile interface contains local multiple picker and clear control',()=>{
 const html=read('radio.html');
 assert.match(html,/id="localFiles"[^>]*multiple/);
 assert.match(html,/id="clearLocal"/);
 assert.match(html,/id="talkEnabled"/);
 assert.match(html,/Select your own Suno MP3/);
});