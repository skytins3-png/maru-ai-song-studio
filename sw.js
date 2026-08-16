const CACHE='maru-music-v0.22.14-clean';
const FILES=[
  './',
  'index.html',
  'styles.css?v=0.22.14',
  'score.css?v=0.22.14',
  'vendor/vexflow.js?v=5.0.0',
  'vendor/sfumato.js?v=0.22.14',
  'samples/GENERALUSER-LICENSE.txt',
  'vendor/SOUNDFONT2-ESM-LICENSE.txt',
  'vendor/SFUMATO-LICENSE.txt',
  'app-v0.22.14.js',
  'manifest.webmanifest',
  'icons/icon.svg'
];

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k.startsWith('maru-music-') && k !== CACHE)
            .map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  if (url.origin !== self.location.origin) return;

  const fresh =
    e.request.mode === 'navigate' ||
    url.pathname.endsWith('.html') ||
    url.pathname.endsWith('.js') ||
    url.pathname.endsWith('.css');

  if (fresh) {
    e.respondWith(
      fetch(e.request, {cache:'no-store'})
        .then(async r => {
          if (r && r.ok) {
            const c = await caches.open(CACHE);
            c.put(e.request, r.clone());
          }
          return r;
        })
        .catch(() => caches.match(e.request))
    );
    return;
  }

  if (url.pathname.endsWith('/samples/GeneralUser.sf2')) {
    e.respondWith(
      caches.open(CACHE).then(async c => {
        const cached = await c.match(e.request);
        if (cached) return cached;
        const r = await fetch(e.request, {cache:'reload'});
        if (r.ok) await c.put(e.request, r.clone());
        return r;
      })
    );
    return;
  }

  e.respondWith(
    caches.open(CACHE).then(c => c.match(e.request).then(r => r || fetch(e.request)))
  );
});
