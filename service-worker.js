const CACHE_NAME = "phoniks-menu-v3"; // Шаг 1: Меняем версию, чтобы сбросить старый кэш у пользователей
const FILES = [
  "./",
  "./index.html",
  "./style.css",
  "./script.js",
  "./menu-data.js",
  "./manifest.json"
];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(FILES)));
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => 
      Promise.all(keys.map(key => key !== CACHE_NAME && caches.delete(key)))
    )
  );
  self.clients.claim();
});

// Шаг 2: Меняем логику обработки запросов
self.addEventListener("fetch", event => {
  // Стратегия Network-First: сначала пытаемся взять свежий файл из сети
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Если сеть доступна, сохраняем свежую копию в кэш и отдаем пользователю
        if (response.status === 200) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseClone));
        }
        return response;
      })
      .catch(() => {
        // Если интернета нет (оффлайн), достаем файл из кэша
        return caches.match(event.request);
      })
  );
});