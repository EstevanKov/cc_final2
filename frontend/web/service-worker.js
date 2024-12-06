
self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open('mi-cache').then((cache) => {
        return cache.addAll([
          '/',
          '/index.html',
          '/assets/icon-192.png',
          '/assets/icon-512.png',
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  });
  