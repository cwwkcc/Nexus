// apps/web/public/sw.js
//
// Custom service worker (F-184 / Task 9.1). Hand-rolled rather than
// next-pwa/Workbox — there's no such dependency in apps/web/package.json,
// and a build-time-generated precache manifest isn't available to a plain
// static file in public/, so this leans on runtime caching instead of
// trying to guess Next's content-hashed /_next/static filenames.
//
// Strategies:
//   - Navigations (HTML pages)      -> network-first, cache fallback, then /offline.html
//   - /_next/static/*, /fonts/*     -> cache-first (immutable, content-hashed or versioned)
//   - Other same-origin GET assets  -> stale-while-revalidate
//   - Everything else (API/tRPC,
//     cross-origin, non-GET)        -> pass straight through, untouched
//
// Bump CACHE_VERSION on every deploy that changes cached content or
// strategy — this invalidates old caches on activate.

const CACHE_VERSION = 'v1';
const SHELL_CACHE = `nexus-shell-${CACHE_VERSION}`;
const PAGES_CACHE = `nexus-pages-${CACHE_VERSION}`;
const ASSETS_CACHE = `nexus-assets-${CACHE_VERSION}`;
const CURRENT_CACHES = [SHELL_CACHE, PAGES_CACHE, ASSETS_CACHE];

const OFFLINE_URL = '/offline.html';

// Task 9.1 "Static caching": home and about pages, in all three locales,
// plus the shell fallback assets needed to render them offline.
const PRECACHE_URLS = [
  '/en',
  '/si',
  '/ta',
  '/en/about',
  '/si/about',
  '/ta/about',
  OFFLINE_URL,
  '/manifest.json',
  '/favicon.ico',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE).then((cache) => cache.addAll(PRECACHE_URLS)),
    // Don't skipWaiting automatically — the new worker stays in
    // "waiting" until the UpdateAvailableBanner tells it to via
    // postMessage, so users aren't interrupted mid-session.
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => !CURRENT_CACHES.includes(key))
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

// UpdateAvailableBanner reload flow: the page posts {type: 'SKIP_WAITING'}
// to the waiting worker when the user clicks "Reload". The client is
// expected to listen for `controllerchange` and reload itself.
self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

function isStaticAsset(url) {
  return (
    url.pathname.startsWith('/_next/static/') ||
    url.pathname.startsWith('/fonts/') ||
    url.pathname.startsWith('/icons/')
  );
}

function isCacheableSameOriginGet(request, url) {
  return (
    request.method === 'GET' &&
    url.origin === self.location.origin &&
    !url.pathname.startsWith('/api/')
  );
}

async function networkFirstNavigation(request) {
  try {
    const response = await fetch(request);
    const cache = await caches.open(PAGES_CACHE);
    cache.put(request, response.clone());
    return response;
  } catch {
    const cached = await caches.match(request);
    if (cached) return cached;
    const offline = await caches.match(OFFLINE_URL);
    return offline ?? Response.error();
  }
}

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (response.ok) {
    const cache = await caches.open(ASSETS_CACHE);
    cache.put(request, response.clone());
  }
  return response;
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(PAGES_CACHE);
  const cached = await cache.match(request);
  const networkFetch = fetch(request)
    .then((response) => {
      if (response.ok) cache.put(request, response.clone());
      return response;
    })
    .catch(() => undefined);
  return cached ?? (await networkFetch) ?? Response.error();
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Navigations: news/events/etc. are "dynamic pages" per Task 9.1 —
  // network-first keeps them fresh, with the cache (then offline.html)
  // as the fallback when there's no connection.
  if (request.mode === 'navigate') {
    event.respondWith(networkFirstNavigation(request));
    return;
  }

  if (!isCacheableSameOriginGet(request, url)) {
    // API/tRPC calls, cross-origin requests (R2 media, analytics, fonts
    // CDNs if any), and non-GET requests are left untouched.
    return;
  }

  if (isStaticAsset(url)) {
    event.respondWith(cacheFirst(request));
    return;
  }

  event.respondWith(staleWhileRevalidate(request));
});
