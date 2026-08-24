/* Pler Music — Service Worker
 * Caches static assets for offline/background support.
 * Does NOT cache API responses or audio streams (YouTube IFrame handles that).
 */

const CACHE_NAME = 'pler-music-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/app.js',
  '/styles.css',
  '/manifest.json',
  '/logo-64.png',
  '/logo-192.png',
  '/icon-512.png',
  '/favicon-32.png',
  '/apple-touch-icon.png'
];

const FONTS_URL = 'https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700;800;900&display=swap';
const YT_IFRAME_API = 'https://www.youtube.com/iframe_api';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Caching static assets');
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Skip non-GET requests
  if (event.request.method !== 'GET') return;

  // Skip cross-origin requests we don't control (YouTube, fonts, etc.)
  if (url.origin !== location.origin) {
    // Allow YouTube iframe API and Google Fonts to pass through (no caching)
    if (url.href.startsWith(YT_IFRAME_API) || url.href.startsWith(FONTS_URL)) {
      return; // network only
    }
    // For other cross-origin (thumbnail images, etc.), use network-first with fallback
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request))
    );
    return;
  }

  // Same-origin: cache-first for static assets
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((response) => {
        // Only cache successful same-origin responses
        if (response.ok) {
          const cloned = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, cloned));
        }
        return response;
      });
    })
  );
});

// Handle messages from client (e.g., skip waiting)
self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});