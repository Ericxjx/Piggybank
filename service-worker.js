const CACHE_NAME = 'piggybank-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './icon.png',
  // 如果你有 main.js 或 style.css，也加在下面
  // './main.js',
  // './style.css' 
];

// 安装 SW 并缓存资源
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// 拦截网络请求，优先使用缓存 (离线可用)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
