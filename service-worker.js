// service-worker.js

const CACHE_NAME = "lockscreen-cache-v1";
const ASSETS_TO_CACHE = [
  "/",                     
  "/index.html",           
  "https://fonts.googleapis.com/css?family=Roboto:500,400&display=swap",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
  "https://cdn-icons-png.flaticon.com/512/25/25694.png",
  "https://cdn-icons-png.flaticon.com/512/2889/2889676.png",
  "https://cdn-icons-png.flaticon.com/512/929/929426.png",
  "https://cdn-icons-png.flaticon.com/512/2099/2099058.png"
];

// Install event → sabhi files cache karo
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("📦 Caching assets...");
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate event → purane cache delete karo
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
  console.log("✅ Service Worker activated & old caches cleared");
});

// Fetch event → pehle cache check, fir network
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      return (
        cachedResponse ||
        fetch(event.request).then(networkResponse => {
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        }).catch(() => {
          return new Response("⚡ You are offline. Resource not available.");
        })
      );
    })
  );
});
