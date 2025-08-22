// sw.js (registers and caches index + your original file)
const CACHE_NAME = 'magic-lockscreen-v1';
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/magic_real_lockscreen_superbig_time_blacktext.html',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

self.addEventListener('install', (evt) => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
  evt.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (evt) => {
  evt.respondWith(
    caches.match(evt.request).then((resp) => resp || fetch(evt.request))
  );
});
