const CACHE='maru-music-v0.22.11';
const FILES=['./','index.html','styles.css?v=0.22.11','score.css?v=0.22.11','vendor/vexflow.js?v=5.0.0','vendor/sfumato.js?v=0.22.11','samples/GENERALUSER-LICENSE.txt','vendor/SOUNDFONT2-ESM-LICENSE.txt','vendor/SFUMATO-LICENSE.txt','app.js?v=0.22.11','manifest.webmanifest','icons/icon.svg'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)))});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
 if(e.request.method!=='GET')return;
 const url=new URL(e.request.url),same=url.origin===self.location.origin,isSf2=url.pathname.endsWith('/samples/GeneralUser.sf2');
 if(isSf2){e.respondWith(caches.open(CACHE).then(async c=>{const cached=await c.match(e.request,{ignoreSearch:true});if(cached)return cached;const r=await fetch(e.request);if(r.ok)c.put(e.request,r.clone());return r}));return}
 if(same&&(e.request.mode==='navigate'||/\/(?:index\.html|app\.js|styles\.css|score\.css|sw\.js)$/.test(url.pathname))){
  e.respondWith(caches.open(CACHE).then(async c=>{try{const r=await fetch(e.request,{cache:'no-store'});if(r.ok)c.put(e.request,r.clone());return r}catch(err){return (await c.match(e.request,{ignoreSearch:true}))||Response.error()}}));return;
 }
 e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(async cached=>cached||fetch(e.request)));
});
