const CACHE='maru-music-v0.22.46-clean';
const FILES=['./','index.html','styles.css?v=0.22.46','score.css?v=0.22.46','vendor/vexflow.js?v=5.0.0','vendor/sfumato.js?v=0.22.46','samples/GENERALUSER-LICENSE.txt','vendor/SOUNDFONT2-ESM-LICENSE.txt','vendor/SFUMATO-LICENSE.txt','app.js?v=0.22.46','manifest.webmanifest','icons/icon.svg','icons/icon-192.png','icons/icon-512.png'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)))});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('maru-music-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
 if(e.request.method!=='GET')return;
 const url=new URL(e.request.url);if(url.origin!==self.location.origin)return;
 // Large SoundFont/media: direct network only. Cache Storage failure must never mute playback.
 if(url.pathname.endsWith('/samples/GeneralUser.sf2')||e.request.destination==='audio'||e.request.destination==='video'){e.respondWith(fetch(e.request,{cache:'no-store'}));return;}
 const fresh=e.request.mode==='navigate'||url.pathname.endsWith('.html')||url.pathname.endsWith('.js')||url.pathname.endsWith('.css');
 if(fresh){e.respondWith(fetch(e.request,{cache:'no-store'}).then(async r=>{if(r&&r.ok){try{const c=await caches.open(CACHE);await c.put(e.request,r.clone())}catch(err){}}return r}).catch(()=>caches.match(e.request,{ignoreSearch:false}).then(r=>r||caches.match(e.request,{ignoreSearch:true}))));return;}
 e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(r=>r||fetch(e.request)));
});
