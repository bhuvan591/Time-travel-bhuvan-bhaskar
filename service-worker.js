const CACHE_NAME = 'lockscreen-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/service-worker.js',
  '/assets/bg.jpg',
  '/assets/home.png',
  '/assets/lock.png',
  '/assets/qr.png',
  '/assets/settings.png',
  '/assets/icon-192.png',
  '/assets/icon-512.png',
  '/assets/roboto.css',
  // Add font files if needed, e.g. '/assets/roboto.woff2'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        return response || fetch(event.request);
      })
  );
});
