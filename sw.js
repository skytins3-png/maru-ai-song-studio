const CACHE='maru-music-v0.22.13-clean';
const FILES=[
  './',
  'index.html',
  'styles.css?v=0.22.13',
  'score.css?v=0.22.13',
  'vendor/vexflow.js?v=5.0.0',
  'vendor/sfumato-v0.22.13.js',
  'samples/GENERALUSER-LICENSE.txt',
  'vendor/SOUNDFONT2-ESM-LICENSE.txt',
  'vendor/SFUMATO-LICENSE.txt',
  'app-v0.22.13.js',
  'manifest.webmanifest',
  'icons/icon.svg'
];

self.addEventListener('install',e=>{
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)));
});

self.addEventListener('activate',e=>{
  e.waitUntil(
    caches.keys()
      .then(keys=>Promise.all(keys.filter(k=>k.startsWith('maru-music-')&&k!==CACHE).map(k=>caches.delete(k))))
      .then(()=>self.clients.claim())
  );
});

self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const url=new URL(e.request.url);
  const sameOrigin=url.origin===self.location.origin;
  if(!sameOrigin)return;

  const isFreshAsset =
    e.request.mode==='navigate' ||
    url.pathname.endsWith('.html') ||
    url.pathname.endsWith('.js') ||
    url.pathname.endsWith('.css');

  if(isFreshAsset){
    e.respondWith(
      fetch(e.request,{cache:'no-store'})
        .then(async response=>{
          if(response && response.ok){
            const c=await caches.open(CACHE);
            c.put(e.request,response.clone());
          }
          return response;
        })
        .catch(()=>caches.match(e.request,{ignoreSearch:false}).then(r=>r||caches.match(e.request,{ignoreSearch:true})))
    );
    return;
  }

  // 31MB SoundFont는 V0.22.13 전용 파일명이라 현재 버전 캐시에만 저장한다.
  if(url.pathname.endsWith('/samples/GeneralUser-v0.22.13.sf2')){
    e.respondWith(
      caches.open(CACHE).then(async c=>{
        const cached=await c.match(e.request);
        if(cached)return cached;
        const response=await fetch(e.request,{cache:'reload'});
        if(response.ok)await c.put(e.request,response.clone());
        return response;
      })
    );
    return;
  }

  e.respondWith(
    caches.open(CACHE).then(c=>c.match(e.request).then(r=>r||fetch(e.request)))
  );
});
