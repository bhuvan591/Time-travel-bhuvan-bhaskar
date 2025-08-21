// Install event
self.addEventListener("install", e => {
  console.log("Service Worker installed");
  self.skipWaiting();
});

// Fetch event (सिर्फ network से data लाने देगा)
self.addEventListener("fetch", e => {
  // Default network fetch
});
