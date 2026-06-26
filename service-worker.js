const CACHE_NAME = "phoniks-menu-production-card-size-v2";
const APP_SHELL = [
  "./",
  "./index.html",
  "./style.css",
  "./script.js",
  "./menu-data.js",
  "./manifest.json"
];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(key => key !== CACHE_NAME && caches.delete(key))))
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);

  // Главные файлы всегда сначала из сети, чтобы меню на Netlify обновлялось без сюрпризов.
  if (url.origin === location.origin && /\.(html|js|css|json)$/.test(url.pathname)) {
    event.respondWith(networkFirst(req));
    return;
  }

  // Изображения можно отдавать из кэша, но обновлять в фоне.
  if (url.origin === location.origin && /\.(png|jpg|jpeg|webp|gif|svg|ico)$/.test(url.pathname)) {
    event.respondWith(staleWhileRevalidate(req));
    return;
  }

  event.respondWith(networkFirst(req));
});

async function networkFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  try {
    const response = await fetch(request, { cache: "no-cache" });
    if (response && response.status === 200) cache.put(request, response.clone());
    return response;
  } catch (error) {
    return (await cache.match(request)) || Response.error();
  }
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);
  const fresh = fetch(request).then(response => {
    if (response && response.status === 200) cache.put(request, response.clone());
    return response;
  }).catch(() => null);
  return cached || fresh || Response.error();
}
