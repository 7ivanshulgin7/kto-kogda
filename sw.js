// Кто когда — service worker. При изменении файлов меняйте VERSION.
const VERSION = 'kk-88';
const SHELL = ['./', 'index.html', 'app.js?v=88', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png', 'badge-96.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
// Свои файлы: сразу из кэша (мгновенный запуск, работает без сети). Новая версия приходит вместе с новым sw.js:
// браузер сам проверяет его при открытии, ставит новый кэш целиком — и со следующего запуска открывается новая версия.
// Запросы к API (другой домен) не трогаем — данные приложение подгружает само после запуска.
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== location.origin) return;
  const req = e.request.mode === 'navigate' ? 'index.html' : e.request;
  e.respondWith(
    caches.open(VERSION).then(c => c.match(req).then(hit => hit || fetch(e.request).then(r => {
      if (r.ok && e.request.mode !== 'navigate') c.put(e.request, r.clone());
      return r;
    }).catch(() => caches.match(e.request, { ignoreSearch: true }).then(r => r || c.match('index.html')))))
  );
});

self.addEventListener('push', e => {
  let d = {};
  try { d = e.data ? e.data.json() : {}; } catch (_) { d = { body: e.data && e.data.text() }; }
  e.waitUntil(self.registration.showNotification(d.title || 'Кто когда', {
    body: d.body || 'В календаре что-то изменилось',
    icon: 'icon-192.png',
    badge: 'badge-96.png',
    tag: 'kk',
    renotify: true
  }));
});
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
    for (const c of list) if ('focus' in c) return c.focus();
    return self.clients.openWindow('./');
  }));
});
