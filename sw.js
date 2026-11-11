// Кто когда — service worker. При изменении файлов меняйте VERSION.
const VERSION = 'kk-90';
const SHELL = ['./', 'index.html', 'app.js?v=90', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png', 'badge-96.png'];
const T = 6000; // таймаут сети, мс

// fetch с таймаутом: при «глючной» сети (Wi-Fi/VPN без интернета) не ждём 20 с
function tfetch(req, opt){
  const ac = new AbortController();
  const t = setTimeout(() => ac.abort(), T);
  return fetch(req, Object.assign({ signal: ac.signal }, opt || {})).finally(() => clearTimeout(t));
}
const OFFLINE = `<!doctype html><html lang="ru"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Кто когда</title><style>body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;font-family:system-ui,-apple-system,sans-serif;background:#f6f6f4;color:#222;text-align:center}
@media(prefers-color-scheme:dark){body{background:#111;color:#eee}}div{padding:24px}h1{font-size:22px;margin:0 0 8px}p{opacity:.7;margin:0 0 20px}
button{font:inherit;font-size:17px;padding:12px 22px;border:0;border-radius:14px;background:#2f6fed;color:#fff}</style></head>
<body><div><h1>Нет связи</h1><p>Приложение ещё не сохранено на телефоне.<br>Проверьте интернет.</p><button onclick="location.reload()">Попробовать ещё раз</button></div></body></html>`;

// Установка: по одному файлу — один несскачанный не срывает установку; без index.html — ошибка (остаётся старая версия)
self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c =>
    Promise.allSettled(SHELL.map(u => tfetch(u, { cache: 'no-store' }).then(r => { if (!r.ok) throw 0; return c.put(u, r); })))
      .then(() => c.match('index.html')).then(hit => { if (!hit) throw new Error('index.html не скачан'); })
  ).then(() => self.skipWaiting()));
});
// Удаляем только СВОИ старые кэши (kk-…): на 7ivanshulgin7.github.io живут и другие приложения
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith('kk-') && k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const req = e.request;
  const url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== location.origin) return; // API не трогаем
  if (req.mode === 'navigate'){
    // Запуск: index.html из любого кэша — сразу; в фоне освежаем
    e.respondWith(caches.match('index.html').then(r => r || caches.match('./')).then(hit => {
      if (hit){
        e.waitUntil(tfetch('index.html', { cache: 'no-store' }).then(r => r.ok && caches.open(VERSION).then(c => c.put('index.html', r))).catch(() => {}));
        return hit;
      }
      return tfetch(req).catch(() => new Response(OFFLINE, { headers: { 'Content-Type': 'text/html; charset=utf-8' } }));
    }));
    return;
  }
  // Свои файлы: из кэша, иначе сеть (6 с) и в кэш
  // (точное совпадение первым: если новая index.html просит app.js?v=новый — берём из сети, старый — только без сети)
  const net = () => tfetch(req).then(r => {
    if (r.ok) { const cp = r.clone(); caches.open(VERSION).then(c => c.put(req, cp)); }
    return r;
  });
  e.respondWith(caches.match(req).then(hit => hit || (url.search
    ? net().catch(() => caches.match(req, { ignoreSearch: true }))
    : caches.match(req, { ignoreSearch: true }).then(h => h || net()))
  ).catch(() => null).then(r => r || new Response('', { status: 504 })));
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
