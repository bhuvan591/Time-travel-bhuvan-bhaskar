const CACHE_NAME = "lockscreen-cache-v1";
const FILES_TO_CACHE = [
  "magic_real_lockscreen_superbig_time_blacktext.html",
  "manifest.json",
  "icon-192.png",
  "icon-512.png"
  // Fonts and remote images are not cached, but you can download and serve locally if needed
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keyList =>
      Promise.all(keyList.map(key => {
        if (key !== CACHE_NAME) return caches.delete(key);
      }))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response =>
      response || fetch(event.request)
    )
  );
});
