const CACHE_NAME = "magic-lockscreen-cache-v1";
const urlsToCache = [
  "/time-travel-bhuvan-bhaskar/",
  "/time-travel-bhuvan-bhaskar/index.html",
  "/time-travel-bhuvan-bhaskar/style.css",
  "/time-travel-bhuvan-bhaskar/script.js",
  "/time-travel-bhuvan-bhaskar/icon-192.png",
  "/time-travel-bhuvan-bhaskar/icon-512.png",
  "/time-travel-bhuvan-bhaskar/manifest.json"
];

// Install event → files cache में store होंगे
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch event → cache से serve, अगर ना मिले तो network से
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Activate event → पुराने cache delete
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      )
    )
  );
});
