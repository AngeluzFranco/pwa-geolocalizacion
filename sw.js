const CACHE_NAME = "geo-pwa-v1";
const urlsToCache = [
  "./",
  "./index.html",
  "./app.js",
  "./manifest.webmanifest"
];

self.addEventListener("install", (event) => {
  console.log("SW: instalado");
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("SW: activado");
  return self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});