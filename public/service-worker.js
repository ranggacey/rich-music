const CACHE_NAME = 'pler-music-v2';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/app.js',
  '/styles.css',
  '/logo.png',
  '/logo-64.png',
  '/logo-192.png',
  '/favicon-32.png',
  '/apple-touch-icon.png',
  '/manifest.webmanifest',
  '/service-worker.js'
];

const API_CACHE_NAME = 'pler-music-api-v1';
const API_CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME && key !== API_CACHE_NAME)
            .map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Handle API requests with stale-while-revalidate
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(apiStaleWhileRevalidate(request));
    return;
  }

  // Handle static assets with cache-first
  event.respondWith(cacheFirst(request));
});

async function cacheFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);
  if (cached) return cached;

  try {
    const response = await fetch(request);
    if (response.ok) cache.put(request, response.clone());
    return response;
  } catch {
    // Return offline page for navigation requests
    if (request.mode === 'navigate') {
      return cache.match('/index.html');
    }
    throw new Error('Offline and not cached');
  }
}

async function apiStaleWhileRevalidate(request) {
  const cache = await caches.open(API_CACHE_NAME);
  const cached = await cache.match(request);

  const fetchPromise = fetch(request).then((response) => {
    if (response.ok) {
      const cloned = response.clone();
      cache.put(request, cloned);
    }
    return response;
  }).catch(() => cached);

  if (cached) {
    const cachedResponse = await cached.clone();
    const age = Date.now() - (cachedResponse.headers.get('sw-cached-at') ? 
      parseInt(cachedResponse.headers.get('sw-cached-at')) : 0);
    
    // Return cached immediately if fresh, otherwise wait for network
    if (age < API_CACHE_DURATION) {
      return cachedResponse;
    }
  }

  return fetchPromise;
}

self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') self.skipWaiting();
  if (event.data === 'clearCache') {
    caches.keys().then(keys => keys.forEach(key => caches.delete(key)));
  }
});