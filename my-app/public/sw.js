/* Basic offline-first service worker with safe dev behavior */
const CACHE_NAME = 'aiverify-cache-v2';
const CORE_ASSETS = [
  '/',
  '/manifest.webmanifest',
  '/icons/icon-192.svg',
  '/icons/icon-512.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((k) => (k !== CACHE_NAME ? caches.delete(k) : Promise.resolve())))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'CHECK_FOR_UPDATE') {
    self.skipWaiting();
  }
});

// Network-first for HTML; cache-first for static assets
self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return; // ignore non-GET

  const url = new URL(request.url);
  // Never handle Next.js dev assets or HMR chunks
  if (url.pathname.startsWith('/_next/') || url.pathname.startsWith('/__nextjs')) {
    return; // let the network handle
  }

  const isNavigation = request.mode === 'navigate';
  if (isNavigation) {
    event.respondWith(
      fetch(request).then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        return response;
      }).catch(() => caches.match(request).then((r) => r || caches.match('/')))
    );
    return;
  }

  // Static assets
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        return response;
      });
    })
  );
});


