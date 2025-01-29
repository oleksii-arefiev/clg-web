const cacheName = "DALS FZE-College Love Game-1.0.0";
const contentToCache = [
    "Build/5336a4b2c43054286fd70b1faa467eee.loader.js",
    "Build/5a8355d993fd23a9e58e92f4088807c2.framework.js.unityweb",
    "Build/1bc5152051585d060192290d8adcfaef.data.unityweb",
    "Build/bc51ea1a0c6d4f45f5543aa1ae760036.wasm.unityweb",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
