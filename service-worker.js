const CACHE_NAME = "phoniks-menu-v5";
const CORE_FILES = [
  "./",
  "./index.html",
  "./style.css",
  "./script.js",
  "./manifest.json"
];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(CORE_FILES)));
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(key => key !== CACHE_NAME && caches.delete(key))))
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  const isImage = request.destination === "image";
  const isMenuData = url.pathname.endsWith("menu-data.js");

  // menu-data.js должен обновляться максимально свежо, чтобы цены и блюда не залипали.
  if (isMenuData) {
    event.respondWith(fetch(request).catch(() => caches.match(request)));
    return;
  }

  // Картинки: сначала кэш для повторного открытия, потом обновление в фоне.
  if (isImage) {
    event.respondWith(
      caches.match(request).then(cached => {
        const fetchPromise = fetch(request).then(response => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
          }
          return response;
        }).catch(() => cached);
        return cached || fetchPromise;
      })
    );
    return;
  }

  // Остальное: сеть в приоритете, чтобы правки быстро доходили до гостей.
  event.respondWith(
    fetch(request)
      .then(response => {
        if (response && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
        }
        return response;
      })
      .catch(() => caches.match(request))
  );
});
