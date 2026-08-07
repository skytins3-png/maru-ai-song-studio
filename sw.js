const CACHE='maru-music-v0.17.6';
const FILES=['./','index.html','styles.css?v=0.17.6','score.css?v=0.17.6','vendor/vexflow.js?v=5.0.0','vendor/sfumato.js?v=0.17.6','samples/GENERALUSER-LICENSE.txt','vendor/SOUNDFONT2-ESM-LICENSE.txt','vendor/SFUMATO-LICENSE.txt','app.js?v=0.17.6','manifest.webmanifest','icons/icon.svg'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)))});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
 if(e.request.method!=='GET')return;
 const url=new URL(e.request.url);
 const isSf2=url.pathname.endsWith('/samples/GeneralUser.sf2');
 if(isSf2){
  e.respondWith(caches.open(CACHE).then(async c=>{
   const cached=await c.match(e.request,{ignoreSearch:true});
   if(cached)return cached;
   const response=await fetch(e.request);
   if(response.ok)c.put(e.request,response.clone());
   return response;
  }));
  return;
 }
 e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(r=>r||fetch(e.request)));
});
