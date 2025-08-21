const CACHE_NAME = "magic-lockscreen-v1";
const OFFLINE_URLS = [
  "magic_real_lockscreen_superbig_time_blacktext_intex.html",
  "magic_real_lockscreen_superbig_time_blacktext.html",
  "icon-192.png",
  "icon-512.png",
  "manifest.json"
];

// Add fonts/images if you want them to be available offline

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(OFFLINE_URLS))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request, {ignoreSearch:true}).then(response => {
      return response || fetch(event.request);
    })
  );
});
