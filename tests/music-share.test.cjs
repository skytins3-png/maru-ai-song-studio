const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const crypto=require('node:crypto');
const read=name=>fs.readFileSync(__dirname+'/../music-share/'+name,'utf8');
class Element{
  constructor(){this.value='';this.files=[];this.checked=false;this.hidden=false;this.style={};this.events={};this.children=[];this.paused=true;}
  addEventListener(name,fn){this.events[name]=fn}
  appendChild(el){this.children.push(el)}
  querySelector(sel){this.nodes??={};return this.nodes[sel]??=new Element()}
  pause(){this.paused=true}
  focus(){this.focused=true}
  select(){this.selected=true}
  scrollIntoView(){this.scrolled=true}
}
function context(fetch){
  const els={};const doc={getElementById:id=>els[id]??=new Element(),createElement:()=>new Element()};
  const c=vm.createContext({document:doc,window:{addEventListener(){}},fetch,URL,URLSearchParams,TextDecoder,Uint8Array,crypto:crypto.webcrypto,atob,btoa,console,location:{href:'https://example.test/music-share/?track=old'},navigator:{clipboard:{writeText:async()=>{}}},setTimeout:fn=>{fn();return 1},clearTimeout(){}});
  vm.runInContext(read('common.js'),c);return {c,els,$:doc.getElementById};
}
const file=(name,size=5)=>({name,size,arrayBuffer:async()=>new Uint8Array([1,2,3,4,5]).buffer});
function admin(mode='ok',catalog=[]){
 const calls=[];let head='h1',refs=0;
 const h=context(async(url,options)=>{
   const path=url.replace('https://api.github.com/repos/skytins3-png/maru-ai-song-studio','');
   const body=options.body&&JSON.parse(options.body);calls.push({path,...options,body});
   let data={};let status=200;
   if(path==='/git/ref/heads/main')data={object:{sha:head}};
   else if(path.startsWith('/git/commits/')&&options.method==='GET')data={tree:{sha:'tree-'+head}};
   else if(path.startsWith('/contents/'))data={content:Buffer.from(mode==='corrupt'?'{oops':JSON.stringify(catalog)).toString('base64')};
   else if(path==='/git/blobs'){if(mode==='denied')status=403;else if(mode==='invalid')status=401;else if(mode==='cover-fail'&&calls.filter(c=>c.path===path).length===2)status=500;else data={sha:'blob'+calls.length};}
   else if(path==='/git/trees')data={sha:'tree-new'};
   else if(path==='/git/commits')data={sha:'commit-new'};
   else if(path==='/git/refs/heads/main'){
     refs++;if(mode==='race'&&refs===1){head='h2';catalog=[{id:'concurrent',title:'another',downloadAllowed:true}];status=422;}
     else if(mode==='lost-response'){
       catalog=JSON.parse(calls.filter(c=>c.path==='/git/trees').at(-1).body.tree.at(-1).content);
       throw new TypeError('network');
     }else if(mode==='ref-fail')status=403;
   }else throw new Error('Unexpected request '+path);
   return {ok:status===200,status,json:async()=>data};
 });
 h.$('token').value='test-token';h.$('title').value='가을';h.$('artist').value='아환';h.$('description').value='Autumn42';h.$('audio').files=[file('song.mp3')];h.$('cover').files=[file('cover.png')];h.$('allow').checked=true;
 vm.runInContext(read('admin.js'),h.c);return {...h,calls,run:()=>h.$('upload').events.click()};
}
test('only explicit allowed local audio is public; reject missing/false/string flags and unsafe URLs',()=>{
 const {c}=context();const good={id:'a',audio:'tracks/한글.mp3',downloadAllowed:true};
 const samples=[good,{...good,id:'b',downloadAllowed:false},{...good,id:'c',downloadAllowed:'true'},{id:'d',audio:'tracks/x.mp3'},{...good,id:'e',audio:'https://outside/x.mp3'},{...good,id:'f',audio:'tracks/../x.mp3'},{...good,id:'g',audio:'tracks/%2e%2e/x.mp3'},null,good];
 assert.equal(c.MusicShare.publicTracks(samples).length,1);
 assert.throws(()=>c.MusicShare.publicTracks({}));
 assert.equal(c.MusicShare.slug('가을 바다'),'가을-바다');
});
test('size and extension validation happens before any network request',async()=>{
 for(const variant of ['large-cover','large-audio','empty','bad-cover','bad-audio','no-token','no-title','no-consent']){
  const h=admin();
  if(variant==='large-cover')h.$('cover').files=[file('cover.png',10*1024*1024+1)];
  if(variant==='large-audio')h.$('audio').files=[file('song.mp3',95*1024*1024+1)];
  if(variant==='empty')h.$('audio').files=[file('song.mp3',0)];
  if(variant==='bad-cover')h.$('cover').files=[file('cover.svg')];
  if(variant==='bad-audio')h.$('audio').files=[file('song.html')];
  if(variant==='no-token')h.$('token').value='';
  if(variant==='no-title')h.$('title').value='';
  if(variant==='no-consent')h.$('allow').checked=false;
  await h.run();assert.equal(h.calls.length,0,variant);
 }
});
test('publish audio, cover and catalog together; preserve existing entries; clear token',async()=>{
 const h=admin('ok',[{id:'old',title:'existing'}]);await h.run();
 const tree=h.calls.find(c=>c.path==='/git/trees').body;
 assert.equal(tree.base_tree,'tree-h1');assert.equal(tree.tree.length,3);
 const entries=JSON.parse(tree.tree.at(-1).content);assert.equal(entries.length,2);assert.equal(entries[1].id,'old');assert.equal(entries[0].downloadAllowed,true);assert.match(entries[0].audio,/가을\.mp3$/);
 const updates=h.calls.filter(c=>c.path==='/git/refs/heads/main');assert.equal(updates.length,1);assert.equal(updates[0].body.force,false);
 assert.equal(h.calls.some(c=>c.method==='PUT'),false);assert.equal(h.$('token').value,'');assert.equal(h.$('allow').checked,false);assert.match(h.$('status').textContent,/완료/);
});
test('optional cover and artist have supported defaults',async()=>{
 const h=admin();h.$('cover').files=[];h.$('artist').value='';await h.run();
 const tree=h.calls.find(c=>c.path==='/git/trees').body.tree;assert.equal(tree.length,2);
 const song=JSON.parse(tree.at(-1).content)[0];assert.equal(song.cover,'');assert.equal(song.artist,'MUSIC SHARE');
});
test('bad catalog, rejected credentials and cover failure never update branch',async()=>{
 for(const mode of ['corrupt','invalid','denied','cover-fail']){
  const h=admin(mode);await h.run();assert.equal(h.calls.some(c=>c.path==='/git/refs/heads/main'),false,mode);
  assert.match(h.$('status').textContent,/완료하지 못/);assert.equal(h.$('token').value,'');assert.equal(h.$('upload').disabled,false);
  if(mode==='corrupt')assert.equal(h.calls.some(c=>c.method==='POST'),false);
 }
});
test('concurrent publish rebases without dropping the other song',async()=>{
 const h=admin('race');await h.run();const trees=h.calls.filter(c=>c.path==='/git/trees');assert.equal(trees.length,2);
 const latest=JSON.parse(trees[1].body.tree.at(-1).content);assert.equal(latest[1].id,'concurrent');assert.equal(trees[1].body.base_tree,'tree-h2');
});
test('uncertain successful response is confirmed without duplicate publication',async()=>{
 const h=admin('lost-response');await h.run();assert.equal(h.calls.filter(c=>c.path==='/git/refs/heads/main').length,1);assert.match(h.$('status').textContent,/^완료/);
});
test('rejected final write is not reported as success',async()=>{
 const h=admin('ref-fail');await h.run();assert.match(h.$('status').textContent,/완료하지 못/);
});
async function publicPage(){
 const tracks=[{id:'a',title:'가을',artist:'아환',description:'Autumn42',audio:'tracks/a.mp3',createdAt:'2026-10-01',downloadAllowed:true},{id:'b',title:'바람',artist:'B',audio:'tracks/b.mp3',createdAt:'2026-10-02',downloadAllowed:true},{id:'no',title:'비공개',audio:'tracks/no.mp3',downloadAllowed:false}];
 const h=context(async()=>({ok:true,json:async()=>tracks}));h.$('sort').value='newest';vm.runInContext(read('app.js'),h.c);await new Promise(setImmediate);return h;
}
test('public list excludes denied songs, searches metadata without recreating players',async()=>{
 const h=await publicPage(),cards=h.$('musicList').children;assert.equal(cards.length,2);const audio=cards[0].querySelector('audio');
 h.$('search').value=' autumn42 ';h.$('search').events.input();assert.equal(cards[0].hidden,false);assert.equal(cards[1].hidden,true);assert.equal(h.$('trackCount').textContent,'1 / 2곡');
 h.$('sort').value='title';h.$('sort').events.change();assert.equal(cards[0].querySelector('audio'),audio);
 h.$('search').value='missing';h.$('search').events.input();assert.equal(h.$('empty').textContent,'검색 결과가 없습니다.');
 h.$('search').value='';h.$('search').events.input();assert.equal(cards[1].hidden,false);
});
test('starting another player pauses the previous one',async()=>{
 const h=await publicPage(),cards=h.$('musicList').children,a=cards[0].querySelector('audio'),b=cards[1].querySelector('audio');a.paused=false;b.events.play();assert.equal(a.paused,true);
});
test('track share fallback contains exact id; site share removes track parameter',async()=>{
 const h=await publicPage();h.c.navigator.clipboard.writeText=async()=>{throw new Error('denied')};
 await h.$('musicList').children[0].querySelector('.share-track').events.click();assert.equal(h.$('shareUrl').value,'https://example.test/music-share/?track=a');assert.equal(h.$('shareFallback').hidden,false);
 await h.$('shareSite').events.click();assert.equal(h.$('shareUrl').value,'https://example.test/music-share/');
});
