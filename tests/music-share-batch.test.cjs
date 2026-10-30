const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const crypto=require('node:crypto');
const source=name=>fs.readFileSync(__dirname+'/../music-share/'+name,'utf8');
function loadCore(){
 const ctx=vm.createContext({});
 vm.runInContext(source('batch-core.js'),ctx);return ctx.MaruBatchCore;
}
const file=(name,content)=>({name,size:content.length,arrayBuffer:async()=>Uint8Array.from(content).buffer});
test('batch validates rights, artist, extensions, 15-file and 90 MiB constraints',()=>{
 const c=loadCore(),f=file('Original One.mp3',[1,2,3,4]);
 assert.equal(c.titleFromFile('My Love (final).MP3'),'My Love (final)');
 assert.throws(()=>c.validateBatch([f],'Artist',false),/rights|downloads/);
 assert.throws(()=>c.validateBatch([f],'',true),/Artist/);
 assert.throws(()=>c.validateBatch([file('something.exe',[1])],'Artist',true),/MP3/);
 assert.throws(()=>c.validateBatch(new Array(16).fill(f),'Artist',true),/15/);
 assert.throws(()=>c.validateBatch([file('huge.mp3',[1]),{name:'big.mp3',size:91*1024*1024}],'Artist',true),/90 MiB/);
 assert.equal(c.validateBatch([f],'Artist',true).join(','),'Original One');
});
test('published file digests identify duplicates',()=>{
 const c=loadCore();const hash='a'.repeat(64);
 assert.equal(c.existingHashes([{audioSha256:hash},{audioSha256:'bad'}]).has(hash),true);
 assert.equal(c.existingHashes([{audioSha256:hash},{audioSha256:'bad'}]).size,1);
 assert.equal(c.hex([0,255,16]),'00ff10');
});
function harness(existing=[],mode='ok'){
 const elements={};
 class Element{
  constructor(){this.value='';this.files=[];this.checked=false;this.disabled=false;this.handlers={};this.textContent='';}
  addEventListener(k,fn){this.handlers[k]=fn}
 }
 const doc={getElementById:id=>elements[id]??=new Element()};
 const calls=[];let head='h1', catalog=existing;
 const fetch=async(url,opts={})=>{
  const path=url.replace('https://api.github.com/repos/skytins3-png/maru-ai-song-studio','');
  const body=opts.body&&JSON.parse(opts.body);
  calls.push({path,method:opts.method,body});
  let data={},status=200;
  if(path==='/git/ref/heads/main')data={object:{sha:head}};
  else if(path.startsWith('/git/commits/')&&opts.method==='GET')data={tree:{sha:'tree-'+head}};
  else if(path.startsWith('/contents/music-share/catalog.json?'))data={content:Buffer.from(JSON.stringify(catalog)).toString('base64')};
  else if(path==='/git/blobs')data={sha:'blob-'+calls.length};
  else if(path==='/git/trees')data={sha:'new-tree'};
  else if(path==='/git/commits')data={sha:'new-commit'};
  else if(path==='/git/refs/heads/main'){
   if(mode==='denied')status=403;
   else{catalog=JSON.parse(calls.filter(x=>x.path==='/git/trees').at(-1).body.tree.at(-1).content);head='new-commit';}
  }else throw Error('unknown HTTP path '+path);
  return {ok:status===200,status,json:async()=>data};
 };
 const ctx=vm.createContext({document:doc,window:{addEventListener(){}},globalThis:null,
  URL,TextDecoder,Uint8Array,crypto:crypto.webcrypto,btoa,atob,fetch,Date,console});
 ctx.globalThis=ctx;
 vm.runInContext(source('common.js'),ctx);
 ctx.MaruSafeMedia={verify:async()=>true};
 vm.runInContext(source('genre-core.js'),ctx);
 vm.runInContext(source('batch-core.js'),ctx);
 vm.runInContext(source('batch.js'),ctx);
 doc.getElementById('token').value='test-token';
 doc.getElementById('artist').value='Younghwan Park';
 doc.getElementById('description').value='Original';
 doc.getElementById('uploadConsent').checked=true;
 doc.getElementById('audioFiles').files=[file('Autumn.mp3',[1,2,3,4,5]),file('Spring.mp3',[6,7,8])];
 return {calls,els:elements,submit:()=>doc.getElementById('batchForm').handlers.submit({preventDefault(){}}),catalog:()=>catalog};
}
test('two songs uploaded in one catalog commit without overwriting existing songs',async()=>{
 const h=harness([{id:'old',title:'Protected Song'}]);await h.submit();
 const blobs=h.calls.filter(x=>x.path==='/git/blobs');
 assert.equal(blobs.length,2);
 const trees=h.calls.filter(x=>x.path==='/git/trees');
 assert.equal(trees.length,1);
 assert.equal(trees[0].body.tree.length,3);
 assert.equal(h.catalog().length,3);
 assert.equal(h.catalog()[2].id,'old');
 assert.equal(h.catalog()[0].artist,'Younghwan Park');
 assert.equal(h.catalog()[0].downloadAllowed,true);
 assert.match(h.catalog()[0].audioSha256,/^[a-f0-9]{64}$/);
 assert.equal(h.els.token.value,'');
 assert.match(h.els.batchStatus.textContent,/Published 2/);
});
test('second upload of identical tracks skips hashes and never updates the catalog',async()=>{
 const first=harness();await first.submit();
 const next=harness(first.catalog());await next.submit();
 assert.equal(next.calls.some(x=>x.path==='/git/blobs'),false);
 assert.equal(next.calls.some(x=>x.path==='/git/refs/heads/main'),false);
 assert.match(next.els.batchStatus.textContent,/already/);
});
test('GitHub denied branch update does not report publication or damage existing catalog',async()=>{
 const initial=[{id:'old',title:'Existing original'}];
 const h=harness(initial,'denied');await h.submit();
 assert.equal(h.catalog().length,1);assert.equal(h.catalog()[0].id,'old');
 assert.match(h.els.batchStatus.textContent,/did not finish/);
 assert.equal(h.els.token.value,'');
});
test('batch uploader is linked from public library and radio station',()=>{
 const index=source('index.html'),radio=source('radio.html'),batch=source('batch.html');
 assert.match(index,/href="batch.html"/);assert.match(radio,/href="batch.html"/);
 assert.match(batch,/multiple required/);
 assert.match(batch,/uploadConsent/);
});
test('queue publishes 16 distinct originals in two atomic batches and does not lose songs',async()=>{
 const h=harness();
 h.els.audioFiles.files=Array.from({length:16},(_,i)=>file('Song-'+i+'.mp3',[i,1,2,3,4]));
 await h.submit();
 assert.equal(h.calls.filter(x=>x.path==='/git/trees').length,2);
 assert.equal(h.calls.filter(x=>x.path==='/git/refs/heads/main').length,2);
 assert.equal(h.catalog().length,16);
 assert.match(h.els.batchStatus.textContent,/Published 16/);
});

test('genre guesses are clearly language-or-format categories with manual review support',()=>{
 const ctx=vm.createContext({});
 vm.runInContext(source('genre-core.js'),ctx);
 const g=ctx.MaruGenres;
 assert.equal(g.detect('가야금 독주.mp3'),'instrumental');
 assert.equal(g.detect('다시 태어나면.mp3'),'korean');
 assert.equal(g.detect('云南的清晨.mp3'),'chinese');
 assert.equal(g.detect('Original Pop.mp3'),'western');
 assert.equal(g.genreOf({genre:'chinese',title:'한국 노래'}),'chinese');
 assert.equal(g.genreOf({genre:'invalid',title:'한국 노래'}),'korean');
 assert.equal(g.label('instrumental'),'연주곡');
 const tiny=Array.from({length:16},(_,i)=>({name:'Song'+i+'.mp3',size:2}));
 const groups=g.splitBatches(tiny);
 assert.equal(groups.length,2);assert.equal(groups[0].length,15);assert.equal(groups[1].length,1);
 const bySize=g.splitBatches([{size:60*1024*1024},{size:45*1024*1024}]);
 assert.equal(bySize.length,2);
});
test('genre review selectors are present on the public batch page and public library',()=>{
 const batch=source('batch.html'),index=source('index.html'),radio=source('radio.html');
 assert.match(batch,/id="genreReview"/);
 assert.match(batch,/genre-core.js/);
 assert.match(index,/id="genreFilter"/);
 assert.match(radio,/id="radioGenre"/);
});
