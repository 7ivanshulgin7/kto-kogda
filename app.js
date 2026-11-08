/* ================= НАСТРОЙКИ ================= */
// подпись автора: знак T/V-бык (V из Монеток, T с рогами)
const SIG = '<svg class="sig" viewBox="0 -16 229 98" role="img" aria-label="itivan" style="height:29px;width:auto;display:block;overflow:visible;color:var(--ink)"><svg x="2" y="5" width="80" height="74" viewBox="40 0 220 160"><polyline class="vo" points="64,-20 150,172 236,-20" fill="none" stroke-width="42"/><polyline points="64,-20 150,172 236,-20" fill="none" stroke="#FF2E93" stroke-width="30"/></svg><svg x="2" y="5" width="80" height="74" viewBox="40 0 220 160" style="overflow:visible"><g style="fill:var(--bg);stroke:var(--bg)" stroke-width="20" stroke-linejoin="round"><path d="M150 0 L100 0 Q66 0 48 -44 Q48 30 100 30 L150 30 Z"/><path d="M150 0 L200 0 Q234 0 252 -44 Q252 30 200 30 L150 30 Z"/><path d="M135 0 H165 V160 H135 Z"/></g><g fill="currentColor"><path d="M150 0 L100 0 Q66 0 48 -44 Q48 30 100 30 L150 30 Z"/><path d="M150 0 L200 0 Q234 0 252 -44 Q252 30 200 30 L150 30 Z"/><path d="M135 0 H165 V160 H135 Z"/></g></svg><path fill="currentColor" d="M102.6 55.6V50.5H109.8V39.9H103.6V34.7H115.2V50.5H121.2V55.6ZM112.1 31.4Q110.6 31.4 109.6 30.6Q108.7 29.8 108.7 28.5Q108.7 27.1 109.6 26.3Q110.6 25.5 112.1 25.5Q113.7 25.5 114.6 26.3Q115.5 27.1 115.5 28.5Q115.5 29.8 114.6 30.6Q113.7 31.4 112.1 31.4Z M134.9 55.6Q131.7 55.6 129.9 53.8Q128.1 52.0 128.1 48.8V39.9H122.6V34.7H128.1V28.8H133.8V34.7H141.6V39.9H133.8V48.8Q133.8 50.5 135.5 50.5H141.2V55.6Z M145.2 55.6V50.5H152.4V39.9H146.1V34.7H157.7V50.5H163.8V55.6ZM154.7 31.4Q153.1 31.4 152.2 30.6Q151.2 29.8 151.2 28.5Q151.2 27.1 152.2 26.3Q153.1 25.5 154.7 25.5Q156.2 25.5 157.2 26.3Q158.1 27.1 158.1 28.5Q158.1 29.8 157.2 30.6Q156.2 31.4 154.7 31.4Z M171.7 55.6 164.8 34.7H170.7L174.2 46.5Q174.5 47.5 174.8 48.8Q175.1 50.0 175.3 50.8Q175.5 50.0 175.7 48.8Q176.0 47.5 176.3 46.5L179.8 34.7H185.6L178.8 55.6Z M193.8 56.0Q190.6 56.0 188.8 54.3Q186.9 52.6 186.9 49.7Q186.9 46.5 189.1 44.8Q191.3 43.1 195.4 43.1H199.7V41.6Q199.7 40.4 198.9 39.6Q198.0 38.9 196.6 38.9Q195.3 38.9 194.4 39.5Q193.5 40.1 193.3 41.2H187.8Q188.1 38.0 190.6 36.2Q193.0 34.3 196.8 34.3Q200.8 34.3 203.1 36.3Q205.4 38.3 205.4 41.6V55.6H199.9V52.2H199.8Q199.5 53.7 198.3 54.6Q196.6 56.0 193.8 56.0ZM195.9 51.8Q197.6 51.8 198.7 50.9Q199.7 50.0 199.7 48.6V46.4H195.5Q194.2 46.4 193.4 47.1Q192.6 47.8 192.6 49.1Q192.6 50.3 193.5 51.1Q194.4 51.8 195.9 51.8Z M208.9 55.6V34.7H214.4V38.7H214.5Q214.8 37.0 215.9 35.9Q217.4 34.3 220.0 34.3Q223.0 34.3 224.9 36.5Q226.7 38.6 226.7 42.1V55.6H221.0V42.7Q221.0 41.1 220.2 40.2Q219.3 39.3 217.8 39.3Q216.2 39.3 215.4 40.2Q214.6 41.1 214.6 42.7V55.6Z"/></svg>';
// версия под подписью — менять вместе с VERSION в sw.js
const APP_VER = '88 от 09.11.2026';
const CONFIG = {
  // Адрес API Gateway из Яндекс Cloud, напр. 'https://d5dxxxxxxxx.apigw.yandexcloud.net'
  // Пусто — демо-режим: данные хранятся только на этом устройстве, вы — DEMO_ME.
  API_URL: 'https://d5d6pof8q0gpe24mebt8.l5v6loqa.apigw.yandexcloud.net',
  // Публичный VAPID-ключ. Можно оставить пустым — приложение возьмёт его с сервера.
  VAPID_PUBLIC: '',
  DEMO_ME: 'ivan'
};
// Люди для демо-режима. В рабочем режиме список приходит с сервера: вы и ваши связи.
// f:true — для «добавила/изменила», иначе «добавил/изменил»
const DEMO_PEOPLE = [
  {id:'mama',   name:'Мама', f:true,  color:'#FF375F'},
  {id:'papa',   name:'Папа', f:false, color:'#0A84FF'},
  {id:'ivan',   name:'Иван', f:false, color:'#30B05A'},
  {id:'lera',   name:'Лера', f:true,  color:'#BF5AF2'},
  {id:'zhenya', name:'Женя', f:true,  color:'#FF9F0A'}
];
/* ============================================ */

const ONLINE = !!CONFIG.API_URL;
let PEOPLE = [], P = {};     // PEOPLE — вы и связи (фильтр сверху), P — все известные по id
// узоры (штриховка): 0 — нет; свой выбирают в профиле. Если в вашей группе совпал цвет — второму и дальше узор ставится сам
const W_ = 'rgba(255,255,255,.55)';
const HATCH = [null,
  ['linear-gradient(45deg,' + W_ + ' 25%,transparent 25% 50%,' + W_ + ' 50% 75%,transparent 75%)', '8px 8px'],
  ['linear-gradient(-45deg,' + W_ + ' 25%,transparent 25% 50%,' + W_ + ' 50% 75%,transparent 75%)', '8px 8px'],
  ['linear-gradient(' + W_ + ' 40%,transparent 40%)', '5px 5px'],
  ['radial-gradient(' + W_ + ' 1.4px,transparent 1.7px)', '6px 6px']];
let HP = {};
const hstyle = k => HATCH[k] ? `;--hp:${HATCH[k][0]};--hs:${HATCH[k][1]}` : '';
const cs = p => p ? `--c:${p.color}${hstyle(HP[p.id])}` : '';
// узор ложится единым рисунком на всю полосу: сдвигаем фон каждого кусочка на его место в сетке
function alignHatch(){
  document.querySelectorAll('#feed .grid').forEach(g => {
    const gr = g.getBoundingClientRect();
    g.querySelectorAll('[style*="--hp"]').forEach(el => { const r = el.getBoundingClientRect(); el.style.backgroundPosition = `${(gr.left - r.left).toFixed(1)}px ${(gr.top - r.top).toFixed(1)}px`; });
  });
}
addEventListener('resize', () => requestAnimationFrame(alignHatch));
function setPeople(list, chipIds){
  P = Object.fromEntries(list.map(p => [p.id, p]));
  PEOPLE = chipIds.filter(id => P[id]).map(id => P[id]);
  HP = {};
  for (const p of list) if (p.pat > 0 && HATCH[p.pat]) HP[p.id] = p.pat;   // свой выбранный узор
  const byColor = {};
  for (const p of PEOPLE){ const c = String(p.color).toLowerCase(); (byColor[c] = byColor[c] || []).push(p); }
  for (const g of Object.values(byColor)){
    if (g.length < 2) continue;
    const used = new Set(g.map(p => HP[p.id] || 0));   // 0 — «без узора» тоже занят, если кто-то его оставил
    let firstPlain = true;
    for (const p of g){
      if (HP[p.id]) continue;
      if (firstPlain){ firstPlain = false; continue; }   // первый с этим цветом остаётся без узора
      let k = 1; while (used.has(k) && k < HATCH.length - 1) k++;
      HP[p.id] = k; used.add(k);
    }
  }
  PEOPLE = chipIds.filter(id => P[id]).map(id => P[id]);
}
const COLORS = ['#FF375F','#FF9F0A','#FFD60A','#30B05A','#64D2FF','#0A84FF','#5E5CE6','#BF5AF2','#AC8E68','#8E8E93',
  '#00C7BE','#A4D65E','#FF7F6E','#D4A017','#D6246E','#1F8A99','#8E4585','#8D5B3E'];   // вторая строка — добавлены 06.11
const verb = (id, base) => base + (P[id] && P[id].f ? 'а' : '');
const MONTHS = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
const MONTHS_G = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];
const WDF = ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'];
const KEYS = {skin:'kk-skin', lay:'kk-lay', inst:'kk-inst', auth:'kk-auth2', cache:'kk-state2', pending:'kk-pending2', demo:'kk-demo2', style:'kk-style', theme:'kk-theme'};

const pad = n => String(n).padStart(2,'0');
const key = d => `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
const parse = s => { const [y,m,d] = s.split('-').map(Number); return new Date(y,m-1,d); };
const addDays = (d,n) => new Date(d.getFullYear(), d.getMonth(), d.getDate()+n);
const mIdx = (y,m) => y*12 + m;
let TODAY, TODAY_K;
function setToday(){ const n = new Date(); TODAY = new Date(n.getFullYear(), n.getMonth(), n.getDate()); TODAY_K = key(TODAY); }
setToday();
const CUR = () => mIdx(TODAY.getFullYear(), TODAY.getMonth());
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const plural = (n,a,b,c) => { const m10=n%10, m100=n%100; return (m10===1 && m100!==11) ? a : (m10>=2 && m10<=4 && (m100<12 || m100>14)) ? b : c; };
const $ = id => document.getElementById(id);
const newId = () => Date.now().toString(36) + Math.random().toString(36).slice(2,6);
const load = (k, def) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : def; } catch(e) { return def; } };
const store = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch(e) {} };
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
const standalone = matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;

/* ---------- модель дела ----------
   {id, by: кто создал, what, from, to,
    who: [кто занят — создатель и согласившиеся],
    inv: {id: 'wait' | 'no'} — приглашённые: ждём ответа / отказались}
   Та же логика слияния стоит на сервере (backend/index.js). */
const owner = e => e.by || (e.who && e.who[0]);
const D_RE = /^\d{4}-\d{2}-\d{2}$/;
// проверяем всё, что пришло с сервера, прежде чем рисовать: id и даты попадают в разметку
const known = e => e && /^[a-z0-9]{4,24}$/.test(e.id) && D_RE.test(e.from) && D_RE.test(e.to) && typeof e.what === 'string'
  && Array.isArray(e.who) && e.who.every(w => P[w]) && P[owner(e)];
function mergePut(prev, req, by){
  const people = [...new Set((req.people || []).filter(p => p !== by && P[p]))];
  const who = [by], inv = {};
  for (const p of people){
    if (prev && prev.who.includes(p)) who.push(p);
    else inv[p] = (prev && prev.inv && prev.inv[p] !== 'ask' && prev.inv[p]) || 'wait';
  }
  for (const [p, st] of Object.entries((prev && prev.inv) || {})) if (st === 'ask' && !(p in inv) && !who.includes(p)) inv[p] = 'ask';
  const vis = Array.isArray(req.vis) ? req.vis.filter(p => p !== by) : 'all';
  const out = {id:req.id, by, what:req.what, from:req.from, to:req.to, who, inv, vis, tf:req.tf || '', tt:req.tt || '', noRem:!!req.noRem, ts:Date.now()};
  const rq = req.req;
  if (prev && prev.days){ const d = {}; for (const [u, ks] of Object.entries(prev.days)){ if (!who.includes(u)) continue; const f = ks.filter(k => k >= req.from && k <= req.to); if (f.length) d[u] = f; } if (Object.keys(d).length) out.days = d; }
  if (rq && rq.to && rq.to !== by && P[rq.to] && rq.text) out.req = {to:rq.to, text:rq.text, st: prev && prev.req && prev.req.to === rq.to && prev.req.text === rq.text ? prev.req.st : 'wait'};
  return out;
}
function applyOp(list, op){
  const i = list.findIndex(e => e.id === (op.entry ? op.entry.id : op.id));
  const prev = i >= 0 ? list[i] : null;
  const out = list.slice();
  if (op.op === 'put'){
    if (prev && owner(prev) !== op.by) return list;
    const e = mergePut(prev, op.entry, op.by);
    if (i >= 0) out[i] = e; else out.push(e);
  } else if (op.op === 'del'){
    if (prev && owner(prev) === op.by) out.splice(i, 1);
  } else if (op.op === 'rsvp'){
    if (!prev || owner(prev) === op.by) return list;
    const p = op.by, inv = {...(prev.inv || {})}, invited = p in inv || prev.who.includes(p);
    if (!invited) return list;
    let who = prev.who.filter(w => w !== p);
    if (op.ans === 'yes'){ who.push(p); delete inv[p]; } else inv[p] = 'no';
    out[i] = {...prev, who, inv, ts:Date.now()};
  } else if (op.op === 'ask'){
    if (!prev || owner(prev) === op.by || prev.who.includes(op.by)) return list;
    out[i] = {...prev, inv:{...(prev.inv || {}), [op.by]:'ask'}, ts:Date.now()};
  } else if (op.op === 'days'){
    if (!prev || !prev.who.includes(op.by)) return list;
    const days = {...(prev.days || {})}; if (op.days && op.days.length) days[op.by] = op.days; else delete days[op.by];
    out[i] = {...prev, ts:Date.now()}; if (Object.keys(days).length) out[i].days = days; else delete out[i].days;
  } else if (op.op === 'req'){
    if (!prev || !prev.req || prev.req.to !== op.by) return list;
    out[i] = {...prev, req:{...prev.req, st: op.ans === 'yes' ? 'yes' : 'no'}, ts:Date.now()};
  } else if (op.op === 'answer'){
    if (!prev || owner(prev) !== op.by || (prev.inv || {})[op.who] !== 'ask') return list;
    const inv = {...prev.inv}; delete inv[op.who];
    out[i] = {...prev, who: op.ans === 'yes' ? [...prev.who, op.who] : prev.who, inv, ts:Date.now()};
  }
  return out;
}

/* ---------- данные ---------- */
function demo(){
  const r = (a,b) => [key(addDays(TODAY,a)), key(addDays(TODAY,b))];
  const mk = (by, [from,to], what, others = [], inv = {}) => ({id:newId(), by, who:[by, ...others], inv, from, to, what});
  return [
    mk('zhenya', r(4,10),  'Сборы, Казань'),
    mk('zhenya', r(18,20), 'Соревнования, Москва'),
    mk('zhenya', r(33,39), 'Сборы, Сочи'),
    mk('zhenya', r(70,76), 'Чемпионат, Новосибирск'),
    mk('mama',   r(13,14), 'На даче'),
    mk('mama',   r(2,2),   'Юбилей у тёти Гали', ['papa']),
    mk('papa',   r(8,9),   'Рыбалка'),
    mk('papa',   r(25,29), 'Командировка, Екатеринбург'),
    mk('ivan',   r(16,16), 'Свадьба у друзей', [], {lera:'wait'}),
    mk('lera',   r(21,22), 'Курсы'),
    mk('lera',   r(6,6),   'Театр', [], {ivan:'wait'}),
    mk('ivan',   r(8,12),  'Выезд на объект'),
    mk('mama',   r(95,105),'Санаторий', ['papa'])
  ];
}

let auth = load(KEYS.auth, {});            // {token, me}
// ссылка-приглашение: …/kto-kogda/#i=КОД
let inviteCode = null, inviter = null;
function readInvite(){
  const m = /[#&]i=([A-Za-z0-9_-]{10,32})/.exec(location.hash);
  if (m){ inviteCode = m[1]; try { history.replaceState(null, '', location.pathname + location.search); } catch(_){} }
  return !!m;
}
readInvite();
addEventListener('hashchange', () => { if (readInvite()) handleInvite(); });
let S = ONLINE ? load(KEYS.cache, null) : null;   // последний ответ /state
let server = [], links = {friends:[], incoming:[], outgoing:[]}, users = [], meInfo = null, waitingApproval = false;
const ME = () => ONLINE ? (meInfo ? meInfo.id : auth.me || '') : CONFIG.DEMO_ME;
function applyState(st){
  S = st; meInfo = st.me; server = st.entries || []; users = st.users || []; DATES = st.dates || []; OFFERS = st.offers || [];
  links = Object.assign({friends:[], incoming:[], outgoing:[]}, st.links || {});
  const friends = links.friends.filter(id => st.people.some(p => p.id === id))
    .sort((a,b) => st.people.find(p => p.id === a).name.localeCompare(st.people.find(p => p.id === b).name, 'ru'));
  setPeople(st.people, [st.me.id, ...friends]);
  if (!load('kk-seen', 0)) markSeen();   // первый вход — точка отсчёта, без карточки
}
let pending = ONLINE ? load(KEYS.pending, []) : [];
let entries;
// дни рождения и особые даты (свои + чем поделились мои люди); в демо — только на телефоне
var DATES = ONLINE ? (S && S.dates) || [] : load('kk-dates', []), OFFERS = ONLINE ? (S && S.offers) || [] : [];
if (ONLINE){ if (S && S.me) applyState(S); entries = applyPending(server); }
else {
  setPeople(DEMO_PEOPLE, [CONFIG.DEMO_ME, ...DEMO_PEOPLE.map(p => p.id).filter(id => id !== CONFIG.DEMO_ME)]);
  links.friends = DEMO_PEOPLE.map(p => p.id).filter(id => id !== CONFIG.DEMO_ME);
  entries = load(KEYS.demo, null); if (!Array.isArray(entries)) entries = demo(); entries = entries.filter(known);
}

function applyPending(base){
  let list = base.filter(known);
  for (const op of pending) list = applyOp(list, op);
  return list.filter(known);
}
function commit(op){
  op.by = ME();
  if (!ONLINE){ entries = applyOp(entries, op); store(KEYS.demo, entries); return; }
  pending.push(op); store(KEYS.pending, pending);
  entries = applyPending(server);
  sync();
}

/* ---------- сервер ---------- */
async function api(method, path, body){
  const r = await fetch(CONFIG.API_URL.replace(/\/+$/,'') + path, {
    method, cache:'no-store',
    headers: {'Content-Type':'application/json', 'Authorization': 'Bearer ' + (auth.token || '')},
    body: body ? JSON.stringify(body) : undefined
  });
  let data = null; try { data = await r.json(); } catch(_){}
  if (r.status === 401){ const e = new Error('auth'); e.auth = true; throw e; }
  if (r.status === 403 && data && /Доступ закрыт/.test(data.error || '')){ const e = new Error('blocked'); e.blocked = true; throw e; }
  if (!r.ok){ const e = new Error((data && data.error) || ('HTTP ' + r.status)); e.status = r.status; e.user = data && data.error; throw e; }
  return data;
}
let syncing = false, again = false, firstSync = true;
// плашка справа сверху: «Обновляю…» (идёт загрузка с сервера), «Офлайн», «Новая версия»
let updReady = false;
function setSync(t, busy){
  if (!t && updReady){ t = 'Новая версия · обновить'; busy = false; }
  const el = $('sync'); el.textContent = t; el.hidden = !t; el.classList.toggle('busy', !!busy); el.classList.toggle('upd', !busy && updReady && t.startsWith('Новая'));
}
async function sync(){
  if (!ONLINE || !auth.token) return;
  if (syncing){ again = true; return; }
  syncing = true;
  const busyT = setTimeout(() => setSync('Обновляю', true), 350);   // короткие загрузки не мигают
  try {
    while (pending.length){
      const op = pending[0];
      try {
        if (op.op === 'put') await api('PUT', '/entries/' + op.entry.id, {entry:op.entry});
        else if (op.op === 'del') await api('DELETE', '/entries/' + op.id);
        else if (op.op === 'ask') await api('POST', `/entries/${op.id}/ask`);
        else if (op.op === 'answer') await api('POST', `/entries/${op.id}/answer`, {who:op.who, ans:op.ans});
        else if (op.op === 'req') await api('POST', `/entries/${op.id}/req`, {ans:op.ans});
        else if (op.op === 'days') await api('POST', `/entries/${op.id}/days`, {days:op.days || []});
        else await api('POST', `/entries/${op.id}/rsvp`, {ans:op.ans});
      } catch(e){ if (!(e.status >= 400 && e.status < 500)) throw e;   // отклонённую сервером операцию просто выбрасываем
        if (op.op === 'days' && e.status === 404) toast('Мои дни', 'На сервере старая функция — обновите kk-api'); }
      pending.shift(); store(KEYS.pending, pending);
    }
    const st = await api('GET', '/state');
    if (!auth.token) return; // успели выйти, пока шёл запрос
    if (st.pending){ waitingApproval = true; meInfo = st.me; openWaiting(); return; }
    if (waitingApproval){ waitingApproval = false; sheetLocked = false; closeSheet(); toast('Добро пожаловать', 'Заявку одобрили'); }
    const myTz = (() => { try { return Intl.DateTimeFormat().resolvedOptions().timeZone; } catch(_){ return ''; } })();
    if (myTz && st.me && st.me.tz !== myTz) api('PATCH', '/me', {tz: myTz}).catch(() => {});
    const prev = new Map(server.map(e => [e.id, e]));
    const prevInc = new Set(links.incoming);
    applyState(st); store(KEYS.cache, st);
    entries = applyPending(server);
    const newInc = links.incoming.filter(x => !prevInc.has(x) && P[x]);
    if (!firstSync && newInc.length) toast('Стучатся', `${P[newInc[0]].name} хочет видеть ваш календарь`);
    if (!firstSync || prev.size) announce(prev);
    firstSync = false;
    setSync('');
    render();
  } catch(e){
    if (e.auth){ auth.token = ''; store(KEYS.auth, auth); openLogin('Ключ не подошёл — войдите снова.'); }
    else if (e.blocked) openLogin('Доступ к календарю закрыт.');
    else setSync(pending.length ? `Не отправлено: ${pending.length}` : 'Офлайн');
  } finally {
    clearTimeout(busyT); if ($('sync').classList.contains('busy')) setSync('');
    syncing = false;
    if (again){ again = false; sync(); }
  }
}
// всплывашка о свежем изменении от других
function announce(prev){
  const me = ME();
  const news = server.filter(e => known(e) && owner(e) !== me && (!prev.has(e.id) || prev.get(e.id).ts !== e.ts));
  const last = news.sort((a,b) => (a.ts||0) - (b.ts||0)).pop();
  if (!last) return;
  const by = owner(last), r = fmtRange(last.from,last.to);
  if (last.inv && last.inv[me] === 'wait' && !(prev.get(last.id)?.inv?.[me] === 'wait'))
    toast('Приглашение', `${P[by].name} зовёт: ${last.what}, ${r}`);
  else toast('Кто когда', `${P[by].name} ${verb(by, prev.has(last.id) ? 'изменил' : 'добавил')}: ${last.what}, ${r}`);
}

/* ---------- вид ---------- */
const state = { y:TODAY.getFullYear(), m:TODAY.getMonth(), sy:TODAY.getFullYear(), sm:TODAY.getMonth(), sel:TODAY_K,
                view:'month', hidden:new Set(load('kk-hidden', [])), extra:0 };   // скрытые люди запоминаются на телефоне
const isMulti = v => v === 'year';
// «Год»: сетка 3×4 — 12 месяцев от текущего; если дела дальше — до месяца с последним делом (целыми рядами)
// год начинается на 3 месяца раньше текущего — первая строка показывает прошлое
function yearStart(){ const i = CUR() - 3; state.sy = Math.floor(i / 12); state.sm = i % 12; }
function yearSpan(){
  let last = CUR() + 11;
  for (const e of entries){ const d = parse(e.to); last = Math.max(last, mIdx(d.getFullYear(), d.getMonth())); }
  return Math.ceil((last - CUR() + 1) / 3) * 3 + 3;
}

const styleName = 's3'; // полосы: пастель (выбор пока убран)
function applyStyle(){ document.body.classList.remove('s1','s2','s3'); document.body.classList.add(styleName); }
applyStyle();

let themeName = load(KEYS.theme, 'auto');
function applyTheme(){
  const root = document.documentElement;
  if (themeName === 'auto') root.removeAttribute('data-theme'); else root.setAttribute('data-theme', themeName);
  const dark = themeName === 'dark' || (themeName === 'auto' && matchMedia('(prefers-color-scheme: dark)').matches);
  root.classList.toggle('dk', dark);
  const bg = getComputedStyle(document.body).backgroundColor;
  document.querySelectorAll('meta[name=theme-color]').forEach(m => m.content = bg);
}
// оформление (iOS / One UI); обзор года — столбиком
const SKINS = [['ios','iOS'],['oneui','One UI']];
let skinName = load(KEYS.skin, 'ios'); if (!SKINS.some(x => x[0] === skinName)) skinName = 'ios';
const layName = 'col'; // обзор года — всегда столбиком
// яркость полос: мягкая (пастель) или ярче — для тех, кому тускло
let bright = load('kk-bright', 'soft');
const applyBright = () => document.body.classList.toggle('vivid', bright === 'vivid');
function applySkin(){
  SKINS.forEach(([k]) => document.body.classList.toggle('skin-' + k, k === skinName));
  document.body.classList.toggle('lay-col', layName === 'col');
  const b = $('skinBtn'); if (b) b.textContent = 'Вид: ' + SKINS.find(x => x[0] === skinName)[1];
  if (typeof themeName !== 'undefined') applyTheme();
}
applyTheme();
matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyTheme);

const vis = () => PEOPLE.filter(p => !state.hidden.has(p.id));
// «попросить»: согласившийся помочь занят на время дела своим делом (текст просьбы)
const HELP = new WeakMap();
function helperOf(e){
  if (!e.req || e.req.st !== 'yes' || !P[e.req.to]) return null;
  if (!HELP.has(e)) HELP.set(e, {id:e.id + '~h', by:e.req.to, who:[e.req.to], what:e.req.text, from:e.from, to:e.to, tf:e.tf, tt:e.tt, src:e});
  return HELP.get(e);
}
const srvReq = () => !ONLINE || !!(meInfo && meInfo.req);
const srvDays = () => !ONLINE || !!(meInfo && meInfo.days);
const daysTxt = ks => { const ds = ks.map(parse); return ds.length > 3 ? `${ds.length} ${plural(ds.length, 'день', 'дня', 'дней')}` : ds.map(d => `${d.getDate()} ${MONTHS_G[d.getMonth()].slice(0, 3)}`).join(', '); };
// участник выбирает, в какие дни дела он реально будет
let mdSel = null, mdId = null;
function openMyDays(id){
  const e = entries.find(x => x.id === id); if (!e) return;
  mdId = id; const all = []; for (let d = parse(e.from); key(d) <= e.to; d = addDays(d, 1)) all.push(key(d));
  mdSel = new Set(e.days && e.days[ME()] ? e.days[ME()] : all);
  openSheet(`<h2>В какие дни ты будешь?</h2><div class="hint" style="margin:0 0 12px">«${esc(e.what)}» — ${fmtRange(e.from, e.to)}. Отметь свои дни: в календаре ты будешь занят только в них.</div>
    <div class="whoPick" id="mdPick">${all.map(k => { const d = parse(k); return `<button type="button" class="chip press" data-mdk="${k}" aria-pressed="${mdSel.has(k)}">${['вс','пн','вт','ср','чт','пт','сб'][d.getDay()]} ${d.getDate()}</button>`; }).join('')}</div>
    <button class="btn press" data-act="myDaysSave" style="margin-top:14px">Сохранить</button>`);
}
const reqSt = e => e.req.st === 'yes' ? verb(e.req.to, 'согласился') : e.req.st === 'no' ? 'не может' : 'ждём ответа';
// официальные праздники и выходные РФ (пятидневка): производственный календарь,
// 2026 — пост. № 1466 от 24.09.2025, 2027 — пост. № 1187 от 17.09.2026. Новый год добавлять сюда.
const HOL_NAMES = {'01-01':'Новый год','01-02':'Новогодние каникулы','01-03':'Новогодние каникулы','01-04':'Новогодние каникулы','01-05':'Новогодние каникулы','01-06':'Новогодние каникулы','01-07':'Рождество','01-08':'Новогодние каникулы',
  '02-23':'День защитника Отечества','03-08':'Международный женский день','05-01':'Праздник Весны и Труда','05-09':'День Победы','06-12':'День России','11-04':'День народного единства'};
const HOL_EXTRA = {2026:['01-09','03-09','05-11','12-31'], 2027:['02-22','05-03','05-10','06-14','11-05','12-31']};   // выходные по переносам
const HOL_WORK = {2027:['02-20']};   // рабочие субботы
function holiday(k){
  const y = +k.slice(0, 4), md = k.slice(5);
  if ((HOL_WORK[y] || []).includes(md)) return {work:true, name:'Рабочая суббота'};
  if (HOL_NAMES[md]) return {off:true, name:HOL_NAMES[md]};
  if ((HOL_EXTRA[y] || []).includes(md)) return {off:true, name:'Выходной (перенос)'};
  return null;
}
const isOff = k => { const h = holiday(k); return !!(h && h.off); };
// памятные и профессиональные дни — без выделения в календаре, только подписью в шторке дня
const MEM_FIXED = {'01-13':'Старый Новый год · День российской печати','01-19':'Крещение','01-25':'Татьянин день — день студентов','02-08':'День российской науки','02-14':'День святого Валентина',
  '02-21':'Международный день родного языка','03-01':'Всемирный день кошек','03-27':'Всемирный день театра','04-01':'День смеха','04-12':'День космонавтики','04-22':'День Земли',
  '05-07':'День радио','05-15':'Международный день семьи','05-24':'День славянской письменности и культуры','05-27':'Общероссийский день библиотек','05-28':'День пограничника',
  '06-01':'День защиты детей','06-05':'День эколога','06-06':'Пушкинский день — день русского языка','06-22':'День памяти и скорби','07-08':'День семьи, любви и верности',
  '08-02':'День ВДВ','08-22':'День Государственного флага','09-01':'День знаний','09-27':'День воспитателя · День туризма','10-01':'День пожилых людей · День музыки',
  '10-04':'День защиты животных','10-05':'День учителя','10-28':'День бабушек и дедушек','11-10':'День сотрудника полиции','11-14':'День логопеда','11-21':'День бухгалтера',
  '12-03':'День неизвестного солдата','12-09':'День Героев Отечества','12-12':'День Конституции','12-22':'День энергетика','12-27':'День спасателя'};
// шуточные и международные дни — тоже только подписью, с 🎈
const MEM_FUN = {"01-04": "День спагетти", "01-11": "Международный день «спасибо»", "01-21": "Международный день объятий", "01-23": "День ручного письма", "01-28": "День защиты персональных данных", "02-02": "День сурка", "02-09": "Всемирный день пиццы", "02-17": "День спонтанной доброты", "02-22": "День кошек в Японии", "02-27": "Международный день полярного медведя", "03-03": "Всемирный день писателя · День дикой природы", "03-14": "День числа π", "03-20": "Международный день счастья", "03-21": "Всемирный день поэзии · День кукольника", "03-22": "Всемирный день воды", "03-31": "Всемирный день бэкапа", "04-02": "Международный день детской книги", "04-07": "Всемирный день здоровья", "04-23": "Всемирный день книги", "04-25": "День ДНК", "04-29": "Международный день танца", "05-04": "День «Звёздных войн» (May the 4th)", "05-20": "Всемирный день пчёл", "05-21": "Международный день чая", "05-25": "День гика · День полотенца", "05-31": "Всемирный день без табака", "06-03": "Всемирный день велосипеда", "06-08": "Всемирный день океанов", "06-18": "Международный день суши", "06-21": "День селфи", "06-30": "День социальных сетей", "07-02": "Всемирный день НЛО", "07-06": "Всемирный день поцелуя", "07-07": "Всемирный день шоколада", "07-17": "Всемирный день эмодзи", "07-20": "Международный день шахмат", "07-30": "Международный день дружбы", "08-08": "Международный день кошек", "08-12": "Международный день молодёжи", "08-13": "Международный день левшей", "08-19": "Всемирный день фотографии", "08-26": "День собак", "09-05": "Международный день благотворительности", "09-19": "День «Говори как пират»", "09-21": "Международный день мира", "09-30": "День интернета в России", "10-01": "Международный день кофе", "10-16": "Всемирный день хлеба", "10-20": "Международный день повара", "10-29": "Международный день интернета", "10-31": "Хэллоуин", "11-13": "Всемирный день доброты", "11-16": "День толерантности", "11-17": "Международный день студентов", "11-19": "Международный мужской день", "11-21": "Всемирный день приветствий", "11-30": "День защиты информации", "12-05": "День волонтёра", "12-15": "Международный день чая (ещё один)", "12-25": "Католическое Рождество"};
// «n-е воскресенье месяца» и т.п.: [месяц, день недели (0 — вс), номер (-1 — последний), название]
const MEM_RULE = [[6,0,3,'День медицинского работника'],[7,0,-1,'День ВМФ'],[8,6,2,'День физкультурника'],[8,0,2,'День строителя'],[10,0,3,'День отца'],[11,0,-1,'День матери']];
function orthEaster(y){ const a = y % 4, b = y % 7, c = y % 19, d = (19 * c + 15) % 30, e = (2 * a + 4 * b - d + 34) % 7, m = Math.floor((d + e + 114) / 31), day = ((d + e + 114) % 31) + 1; return addDays(new Date(y, m - 1, day), 13); }
const DATE_KINDS = [['bday','🎂','День рождения'],['anniv','💍','Годовщина'],['other','⭐','Особая дата']];
const dIcon = d => (DATE_KINDS.find(x => x[0] === d.kind) || DATE_KINDS[2])[1];
const leap = y => y % 4 === 0 && (y % 100 !== 0 || y % 400 === 0);
function datesOn(k){
  const md = k.slice(5), y = +k.slice(0, 4);
  return DATES.filter(d => d.md === md || (d.md === '02-29' && md === '02-28' && !leap(y)));
}
function dateLine(d, y){
  const age = d.y && y ? y - d.y : null, who = d.by && d.by !== ME() && P[d.by] ? ` · от ${esc(P[d.by].name)}` : '';
  const kind = d.kind === 'bday' ? 'День рождения: ' : '';
  return `${kind}${esc(d.name)}${age > 0 ? `, ${age} ${plural(age, 'год', 'года', 'лет')}` : ''}${who}`;
}
const myDates = () => DATES.filter(d => !d.by || d.by === ME());
async function saveDates(list){
  const mine = list.map(({by, ...d}) => d);
  if (ONLINE){
    try { await api('PATCH', '/me', {dates: mine}); } catch(e){ toast('Даты', 'Нет связи — не сохранилось'); return false; }
  }
  DATES = [...mine.map(d => ({...d, by: ME()})), ...DATES.filter(d => d.by && d.by !== ME())];
  if (!ONLINE) store('kk-dates', DATES);
  return true;
}
function datesHTML(){
  const mine = myDates().sort((a, b) => a.md.localeCompare(b.md)), shared = DATES.filter(d => d.by && d.by !== ME()).sort((a, b) => a.md.localeCompare(b.md));
  const row = (d, own) => { const [mm, dd] = d.md.split('-').map(Number);
    return `<${own ? 'button' : 'div'} class="setRow${own ? ' press' : ''}"${own ? ` data-dedit="${d.id}"` : ''}><div style="min-width:0"><div class="k">${dIcon(d)} ${esc(d.name)}</div><div class="v">${dd} ${MONTHS_G[mm - 1]}${d.y ? ' ' + d.y : ''}${own ? (d.share ? ' · видят мои люди' : ' · только я') : P[d.by] ? ' · от ' + esc(P[d.by].name) : ''}</div></div>${own ? '<span class="lnk">Изменить</span>' : ''}</${own ? 'button' : 'div'}>`; };
  let h = `<div class="set">${mine.map(d => row(d, true)).join('') || '<div class="setRow"><div class="v">Пока нет дат. Добавь дни рождения близких — они появятся в календаре, и придёт напоминание.</div></div>'}
    <div class="setRow"><button class="btn press" data-act="dateNew" style="margin:0">+ Добавить дату</button></div></div>`;
  if (shared.length) h += `<div class="sec" style="margin-top:20px">Поделились мои люди</div><div class="set">${shared.map(d => row(d, false)).join('')}</div>`;
  h += `<div class="set" style="margin-top:16px">
    <div class="setRow"><div><div class="k">Список праздников</div><div class="v">Официальные, памятные и шуточные 🎈</div></div><button class="lnk press" data-act="hols">Открыть</button></div>
    ${ONLINE && meInfo && meInfo.rem && meInfo.rem.dates ? `<div class="setRow"><div><div class="k">Напоминать о датах</div><div class="v">Накануне в ${meInfo.rem.eve.t} и в сам день в ${meInfo.rem.morn.t}</div></div>${tog('remOn', meInfo.rem.dates.on, ' data-k="dates"', 'Напоминать о датах')}</div>` : ''}</div>`;
  return h;
}
let dform = null;
function openDateForm(id){
  const d = id ? myDates().find(x => x.id === id) : null;
  dform = d ? {...d} : {id: newId(), name:'', md:'', y:null, kind:'bday', share:true};
  const [mm, dd] = dform.md ? dform.md.split('-').map(Number) : [TODAY.getMonth() + 1, TODAY.getDate()];
  openSheet(`<h2>${d ? 'Дата' : 'Новая дата'}</h2>
    <label class="f">Что за дата</label>${seg('dkind', dform.kind, DATE_KINDS.map(([k, ic, t]) => [k, ic + ' ' + t.split(' ')[0]]))}
    <label class="f">Кто или что</label><input class="in" id="dName" maxlength="24" placeholder="Например: Рома" value="${esc(dform.name)}">
    <label class="f">Когда</label><div style="display:flex;gap:8px">
      <select class="tsel" id="dDay" style="flex:1">${Array.from({length:31}, (_, i) => `<option${i + 1 === dd ? ' selected' : ''}>${i + 1}</option>`).join('')}</select>
      <select class="tsel" id="dMon" style="flex:2">${MONTHS_G.map((m, i) => `<option value="${i + 1}"${i + 1 === mm ? ' selected' : ''}>${m}</option>`).join('')}</select>
      <input class="in" id="dYear" inputmode="numeric" maxlength="4" placeholder="год" style="flex:1.3;min-width:0" value="${dform.y || ''}"></div>
    <div class="hint" style="margin:6px 0 0">Год можно не указывать — тогда без возраста.</div>
    <div class="setRow" style="padding:14px 0 4px"><div><div class="k">Видят мои люди</div><div class="v">Дата появится в календаре у твоих связей</div></div>${tog('dShare', dform.share, '', 'Видят мои люди')}</div>
    <div class="err" id="dErr"></div>
    <button class="btn press" data-act="dateSave">Сохранить</button>
    ${d ? `<button class="btn plain press" data-act="dateShare">Поделиться</button><button class="btn plain press" data-act="dateDel" style="color:var(--red)">Удалить</button>` : ''}`);
}
function readDateForm(){
  const dd = +$('dDay').value, mm = +$('dMon').value, y = parseInt($('dYear').value, 10);
  const max = new Date(2024, mm, 0).getDate();   // 2024 — високосный, чтобы 29 февраля было можно
  if (dd > max){ $('dErr').textContent = `В этом месяце только ${max} дней`; return false; }
  dform.name = $('dName').value.trim(); dform.md = `${String(mm).padStart(2, '0')}-${String(dd).padStart(2, '0')}`;
  dform.y = y > 1900 && y <= TODAY.getFullYear() + 1 ? y : null;
  if (!dform.name){ $('dErr').textContent = 'Напиши, чья это дата'; return false; }
  return true;
}
// поделиться датой с людьми внутри приложения: у них появится «добавить себе»
let shareSel = new Set(), shareD = null;
function openShareDate(d){
  shareD = d; shareSel = new Set();
  const fr = PEOPLE.filter(p => p.id !== ME() && links.friends.includes(p.id));
  const [mm, dd] = d.md.split('-').map(Number);
  openSheet(`<h2>Поделиться датой</h2><div class="hint" style="margin:0 0 12px">${dIcon(d)} ${esc(d.name)} — ${dd} ${MONTHS_G[mm - 1]}${d.y ? ' ' + d.y : ''}. Человек сможет добавить её себе в один тап.</div>
    ${fr.length ? `<div class="whoPick" id="shPick">${fr.map(p => `<button type="button" class="chip press" style="${cs(p)}" data-shp="${p.id}" aria-pressed="false"><span class="dot"></span>${esc(p.name)}</button>`).join('')}</div>
    <button class="btn press" data-act="shareSend" style="margin-top:14px">Отправить</button>` : '<div class="hint">Пока не с кем — сначала добавь людей.</div>'}
    <button class="btn plain press" data-act="shareOut">Отправить в мессенджер</button>`);
}
function shareDate(d){
  const [mm, dd] = d.md.split('-').map(Number);
  const text = `${dIcon(d)} ${d.kind === 'bday' ? 'День рождения: ' : ''}${d.name} — ${dd} ${MONTHS_G[mm - 1]}${d.y ? ' ' + d.y : ''}`;
  if (navigator.share) navigator.share({text, url: location.origin + location.pathname}).catch(() => {});
  else navigator.clipboard && navigator.clipboard.writeText(text).then(() => toast('Скопировано', text));
}
// все праздники года по месяцам
function openHolidays(y){
  y = y || TODAY.getFullYear();
  let h = `<div class="dpHead"><h2>Праздники ${y}</h2></div>
    <div class="vnav" style="margin:-4px 0 10px"><button class="lnk press" data-act="hols" data-y="${y - 1}" aria-label="Прошлый год">‹</button><button class="lnk press" data-act="hols" data-y="${y + 1}" aria-label="Следующий год">›</button></div>`;
  for (let m = 0; m < 12; m++){
    let rows = '';
    for (let d = new Date(y, m, 1); d.getMonth() === m; d = addDays(d, 1)){
      const k = key(d), hd = holiday(k), mem = memDays(k);
      if (!hd && !mem.length) continue;
      const off = hd && hd.off;
      rows += `<button class="hrow press${k === TODAY_K ? ' today' : ''}" data-hgo="${k}">${dateCol(k)}<span style="min-width:0">${hd ? `<div class="hn${off ? ' off' : ''}">${esc(hd.name)}</div>` : ''}${mem.map(n => `<div class="hn mem">${esc(n)}</div>`).join('')}</span></button>`;
    }
    if (rows) h += `<div class="msep">${MONTHS[m]}</div>${rows}`;
  }
  openSheet(h);
}
function memDays(k){
  const d = parse(k), y = d.getFullYear(), out = [];
  if (MEM_FIXED[k.slice(5)]) out.push(MEM_FIXED[k.slice(5)]);
  if (MEM_FUN[k.slice(5)]) out.push('🎈 ' + MEM_FUN[k.slice(5)]);
  for (const [m, wd, n, name] of MEM_RULE){
    if (d.getMonth() + 1 !== m || d.getDay() !== wd) continue;
    const nth = Math.ceil(d.getDate() / 7), last = d.getMonth() !== addDays(d, 7).getMonth();
    if (n === nth || (n === -1 && last)) out.push(name);
  }
  const ea = orthEaster(y), diff = Math.round((d - ea) / 864e5);
  if (diff === 0) out.push('Пасха'); if (diff === -49) out.push('Прощёное воскресенье, конец Масленицы'); if (diff >= -55 && diff < -49) out.push('Масленица'); if (diff === 49) out.push('Троица');
  const doy = Math.round((d - new Date(y, 0, 1)) / 864e5) + 1; if (doy === 256) out.push('День программиста');
  return out;
}
// переход между вкладками нижнего меню (и по кнопкам, и свайпом)
const TABS = ['month', 'year', 'list', 'set'];
function goView(v){
  if (isMulti(v)){ yearStart(); }
  if (v === 'month'){ openMonth(mIdx(state.y, state.m), state.sel); return; }
  state.view = v; render(); window.scrollTo(0,0);
}
// свайп влево/вправо по экрану листает вкладки. Не мешаем шторке, барабанам, режиму выбора дней
// и полосам, которые сами прокручиваются вбок (люди, «когда свободны все»)
(() => {
  let x0 = null, y0 = 0, t0 = 0;
  const sideScroll = el => { for (; el && el !== document.body; el = el.parentElement){ const o = getComputedStyle(el).overflowX; if ((o === 'auto' || o === 'scroll') && el.scrollWidth > el.clientWidth + 2) return true; } return false; };
  document.addEventListener('touchstart', e => {
    const t = e.target;
    x0 = null;
    if (e.touches.length !== 1 || (t.closest && t.closest('.sheet, .wheel, #pickBar, input, select, textarea, .tog')) || document.body.classList.contains('sheet-open') || document.body.classList.contains('picking') || sideScroll(t)) return;
    x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; t0 = Date.now();
  }, {passive:true});
  document.addEventListener('touchend', e => {
    if (x0 == null) return;
    const dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0; x0 = null;
    if (Math.abs(dx) < 70 || Math.abs(dy) > Math.abs(dx) * 0.6 || Date.now() - t0 > 700) return;
    const cur = state.view === 'month' ? 0 : TABS.indexOf(isMulti(state.view) ? 'year' : state.view);
    const next = TABS[cur + (dx < 0 ? 1 : -1)];
    if (next) goView(next);
  }, {passive:true});
})();
function busyMap(){
  const map = {};
  for (const e of entries){
    const h = helperOf(e);   // согласился помочь — тоже занят, отдельной полосой
    for (let d = parse(e.from); key(d) <= e.to; d = addDays(d,1)){
      const k = key(d); map[k] = map[k] || {};
      for (const w of e.who) if (!map[k][w] && !(e.days && e.days[w] && !e.days[w].includes(k))) map[k][w] = e;   // пришёл не на все дни
      if (h && !map[k][h.by]) map[k][h.by] = h;
    }
  }
  return map;
}
const bands = list => list.length ? `<span class="bands">${list.map(p => `<i style="${cs(p)}"></i>`).join('')}</span>` : '';
const fmtDay = s => { const d = parse(s); return `${d.getDate()} ${MONTHS_G[d.getMonth()]}`; };
function fmtRange(a,b){
  if (a === b) return fmtDay(a);
  const A = parse(a), B = parse(b);
  if (A.getMonth()===B.getMonth() && A.getFullYear()===B.getFullYear()) return `${A.getDate()}–${B.getDate()} ${MONTHS_G[B.getMonth()]}`;
  return `${fmtDay(a)} – ${fmtDay(b)}`;
}
function joinNames(ids){
  const n = ids.filter(i => P[i]).map(i => esc(P[i].name));
  return n.length < 2 ? (n[0]||'') : n.slice(0,-1).join(', ') + ' и ' + n[n.length-1];
}
const waiting = e => Object.keys(e.inv || {}).filter(p => e.inv[p] === 'wait' && P[p]);

/* ---------- отрисовка ---------- */
function renderPeople(){
  $('people').innerHTML = PEOPLE.map(p =>
    `<button class="chip press" style="${cs(p)}" data-person="${p.id}" aria-pressed="${!state.hidden.has(p.id)}"><span class="dot"></span>${esc(p.name)}</button>`).join('');
}
// «Пока тебя не было»: дела других людей, добавленные или изменённые после последнего «Понятно»
function newsList(){
  if (!ONLINE || !auth.token) return [];
  const me = ME(), seen = load('kk-seen', 0), known = new Set(load('kk-known', []));
  if (!seen) return [];
  return entries.filter(e => e.ts > seen && owner(e) !== me && P[owner(e)] && !state.hidden.has(owner(e)) && !(e.inv && e.inv[me] === 'wait') && e.to >= TODAY_K)
    .map(e => ({e, isNew: !known.has(e.id)}));
}
function markSeen(){ store('kk-seen', Date.now()); store('kk-known', entries.map(e => e.id)); }
function newsCardHTML(){
  const n = newsList(); if (!n.length) return '';
  const by = {}; n.forEach(({e, isNew}) => { const o = owner(e); (by[o] = by[o] || {a:0, c:0})[isNew ? 'a' : 'c']++; });
  const txt = Object.entries(by).map(([id, x]) => `${esc(P[id].name)}: ${[x.a && verb(id, 'добавил') + ' ' + x.a, x.c && verb(id, 'изменил') + ' ' + x.c].filter(Boolean).join(', ')}`).join(' · ');
  return `<div class="inv" style="--c:var(--acc)"><div style="min-width:0"><div class="who">Пока тебя не было</div><div class="what">${n.length} ${n.length === 1 ? 'изменение' : n.length < 5 ? 'изменения' : 'изменений'}</div><div class="meta">${txt}</div></div>
    <div class="invB"><button class="yes press" data-act="news">Смотреть</button><button class="no press" data-act="newsOk">Понятно</button></div></div>`;
}
function openNews(){
  const n = newsList().sort((a, b) => a.e.from.localeCompare(b.e.from));
  openSheet(`<h2>Пока тебя не было</h2>${n.map(({e, isNew}) => `<div style="position:relative">${isNew ? '<span class="tag" style="position:absolute;right:0;top:0">новое</span>' : ''}${evHTML(e, true)}</div>`).join('')}
    <button class="btn ok press" data-act="newsOk">Понятно</button>`);
}
function renderInvites(){
  const me = ME();
  const list = entries.filter(e => e.inv && e.inv[me] === 'wait' && e.to >= TODAY_K).sort((a,b) => a.from.localeCompare(b.from));
  const asks = entries.filter(e => owner(e) === me && e.to >= TODAY_K).flatMap(e => Object.keys(e.inv || {}).filter(p => e.inv[p] === 'ask' && P[p]).map(p => `<div class="inv" style="${cs(P[p])}">
    <div style="min-width:0"><div class="who">${esc(P[p].name)} просится</div><div class="what">${esc(e.what)}</div><div class="meta">${fmtRange(e.from,e.to)}</div></div>
    <div class="invB"><button class="yes press" data-answ="${e.id}" data-who="${p}" data-ans="yes">Взять</button><button class="no press" data-answ="${e.id}" data-who="${p}" data-ans="no">Нет</button></div></div>`)).join('');
  const reqs = entries.filter(e => e.req && e.req.to === me && e.req.st === 'wait' && e.to >= TODAY_K && P[owner(e)]).map(e => `<div class="inv" style="${cs(P[owner(e)])}">
    <div style="min-width:0"><div class="who">${esc(P[owner(e)].name)} просит</div><div class="what">${esc(e.req.text)}</div><div class="meta">${fmtRange(e.from,e.to)}${e.tf ? `, ${e.tf}${e.tt ? '–' + e.tt : ''}` : ''} · ${esc(e.what)}</div></div>
    <div class="invB"><button class="yes press" data-rqa="${e.id}" data-ans="yes">Помогу</button><button class="no press" data-rqa="${e.id}" data-ans="no">Не могу</button></div></div>`).join('');
  const offers = OFFERS.filter(o => P[o.from]).map(o => { const [mm, dd] = o.date.md.split('-').map(Number);
    return `<div class="inv" style="${cs(P[o.from])}"><div style="min-width:0"><div class="who">${esc(P[o.from].name)} делится датой</div><div class="what">${dIcon(o.date)} ${esc(o.date.name)}</div><div class="meta">${dd} ${MONTHS_G[mm - 1]}${o.date.y ? ' ' + o.date.y : ''}</div></div>
    <div class="invB"><button class="yes press" data-act="offerYes" data-oid="${o.id}">Добавить себе</button><button class="no press" data-act="offerNo" data-oid="${o.id}">Не надо</button></div></div>`; }).join('');
  const knocks = offers + reqs + asks + links.incoming.filter(id => P[id]).map(id => `<div class="inv" style="${cs(P[id])}">
    <div style="min-width:0"><div class="who">Стучится к вам</div><div class="what">${esc(P[id].name)}</div><div class="meta">@${id}</div></div>
    <div class="invB"><button class="yes press" data-link="${id}" data-la="accept">Принять</button><button class="no press" data-link="${id}" data-la="drop">Нет</button></div></div>`).join('');
  const np = users.filter(u => u.status === 'pending').length;
  const adm = np && state.view !== 'set' ? `<div class="inv" style="--c:#FF9F0A"><div style="min-width:0"><div class="who">Разработчику</div><div class="what">Новых заявок: ${np}</div></div>
    <div class="invB"><button class="yes press" data-view="set">Открыть</button></div></div>` : '';
  const cta = state.view !== 'set' && !load('kk-guide', 0) ? `<button class="gcta press" data-act="guide">${TAB_IC.tip}Прочитай, как пользоваться</button>` : '';
  $('invs').innerHTML = (state.view === 'set' ? '' : cta + installCardHTML() + adm + newsCardHTML() + knocks) + (state.view === 'set' ? [] : list).map(e => { const by = owner(e); return `<div class="inv" style="--c:${P[by].color}">
    <div style="min-width:0"><div class="who">${esc(P[by].name)} зовёт</div><div class="what">${esc(e.what)}</div><div class="meta">${fmtRange(e.from,e.to)}</div></div>
    <div class="invB"><button class="yes press" data-rsvp="${e.id}" data-ans="yes">Иду</button><button class="no press" data-rsvp="${e.id}" data-ans="no">Не иду</button></div></div>`; }).join('');
  $('invs').hidden = !$('invs').innerHTML;
}

// главный экран: месяцы друг под другом, от текущего до месяца с последним делом
function monthRange(){
  const cur = CUR(), target = mIdx(state.y, state.m);
  let last = cur + 1;
  for (const e of entries){ const d = parse(e.to); last = Math.max(last, mIdx(d.getFullYear(), d.getMonth())); }
  return [Math.min(cur, target), Math.max(last, target) + state.extra];
}
const WD = '<div class="wd"><span>Пн</span><span>Вт</span><span>Ср</span><span>Чт</span><span>Пт</span><span>Сб</span><span>Вс</span></div>';
function blockHTML(y, m, map, V){
  const offset = (new Date(y,m,1).getDay()+6)%7, dim = new Date(y,m+1,0).getDate();
  const kOf = dd => key(new Date(y, m, dd));
  // дорожки по неделям: у каждого, кто занят в эту неделю, своя постоянная строка
  const slotsOf = {};
  for (let dd = 1; dd <= dim; dd++){
    const row = Math.floor((offset + dd - 1) / 7);
    if (!slotsOf[row]){
      const days = []; for (let x = dd; x <= dim && Math.floor((offset + x - 1) / 7) === row; x++) days.push(map[kOf(x)] || {});
      slotsOf[row] = V.filter(p => days.some(b => b[p.id]));
    }
  }
  let h = '<span></span>'.repeat(offset);
  for (let dd=1; dd<=dim; dd++){
    const k = kOf(dd), b = map[k] || {};
    const busy = V.filter(p => b[p.id]);
    const dow = (offset + dd - 1) % 7, row = Math.floor((offset + dd - 1) / 7);
    const prev = dow > 0 && dd > 1 ? (map[kOf(dd - 1)] || {}) : {}, next = dow < 6 && dd < dim ? (map[kOf(dd + 1)] || {}) : {};
    // прошедшие дни — цвета разбавлены фоном (непрозрачно, чтобы перемычки не накладывались)
    const past = k < TODAY_K, csd = p => past ? cs(p).replace(/^--c:([^;]+)/, `--c:color-mix(in srgb,$1 ${bright === 'vivid' ? 60 : 45}%,var(--bg))`) : cs(p);
    // люди с одним общим делом — одним блоком (без зазоров), разные дела — отдельными блоками
    const groups = [];
    for (const p of busy){ const g = groups.find(g => b[g[0].id] === b[p.id]); g ? g.push(p) : groups.push([p]); }
    const geo = (gs, H = 56, G = 2.5) => { const n = gs.flat().length, u = (H - (gs.length - 1) * G) / n, out = {}; let j = 0;
      gs.forEach((g, gi) => g.forEach(p => { out[p.id] = [j * u + gi * G, (j + 1) * u + gi * G]; j++; })); return out; };
    const n = busy.length, strip0 = n ? `<span class="bands">${groups.map(g => `<span class="g${b[g[0].id] && b[g[0].id].src ? ' help' : ''}" style="flex:${g.length}">${g.map(p => `<i${b[p.id] && b[p.id].src ? ' class="help"' : ''} style="${csd(p)}"></i>`).join('')}</span>`).join('')}</span>` : '';
    // перемычка к следующему дню — для каждого, у кого то же дело продолжается, по общей высоте полос
    let brs = '', fls = '';
    if (n && dow < 6 && dd < dim){
      const nb = next, nbusy = V.filter(p => nb[p.id]), ng = [];
      for (const p of nbusy){ const g = ng.find(g => nb[g[0].id] === nb[p.id]); g ? g.push(p) : ng.push([p]); }
      const A = geo(groups), B = geo(ng);
      for (const p of busy) if (nb[p.id] === b[p.id]){
        const t = Math.max(A[p.id][0], B[p.id][0]), e = Math.min(A[p.id][1], B[p.id][1]);
        if (e - t <= 4) continue;
        const pc = v => (v / 56 * 100).toFixed(2) + '%';
        brs += `<i${b[p.id] && b[p.id].src ? ' class="help"' : ''} style="${csd(p)};top:${pc(t)};height:${pc(e - t)}"></i>`;
        // скругления-«галтели»: где перемычка упирается в более высокую полосу — вогнутый угол радиусом 9.
        // Лежат под полосами (слой ниже), поэтому не перекрывают соседние полосы, а только заполняют пустой угол.
        // галтель заходит в соседнюю клетку — не даём ей наползать на чужие полосы там
        const free = (G, edge) => { let f = 99; for (const [id, [a0, a1]] of Object.entries(G)) { if (id === p.id) continue;
          if (edge === 'b' && a0 >= e - .1) f = Math.min(f, a0 - e); if (edge === 't' && a1 <= t + .1) f = Math.min(f, t - a1); } return f; };
        const fl = (side, edge, room) => {
          const r = Math.min(9, room, free(side === 'l' ? B : A, edge) - 1); if (r < 3) return;
          const at = (side === 'l' ? '100%' : '0') + (edge === 't' ? ' 0' : ' 100%');
          const m = `radial-gradient(circle at ${at},transparent ${r - .5}px,#000 ${r}px)`;
          fls += `<i style="${csd(p)};left:${side === 'l' ? 14 : 19 - r}px;width:${r}px;top:${edge === 't' ? `calc(${pc(t)} - ${r}px)` : pc(e)};height:${r}px;-webkit-mask:${m};mask:${m}"></i>`;
        };
        if (A[p.id][0] < t - .5) fl('l', 't', t - A[p.id][0]);
        if (B[p.id][0] < t - .5) fl('r', 't', t - B[p.id][0]);
        if (A[p.id][1] > e + .5) fl('l', 'b', A[p.id][1] - e);
        if (B[p.id][1] > e + .5) fl('r', 'b', B[p.id][1] - e);
      }
    }
    const jr = !!brs, strip = strip0 + (brs ? `<span class="bands br">${brs}</span>` : '') + (fls ? `<span class="bands fls">${fls}</span>` : '');
    const cls = ['day press', k<TODAY_K && 'past', k===TODAY_K && 'today', k===state.sel && 'sel', busy.length && 'filled', busy.length > 1 && 'over', jr && 'jr', (dow===6 || isOff(k)) && 'sun', isOff(k) && 'hol'].filter(Boolean).join(' ');
    const lbl = `${dd} ${MONTHS_G[m]}${busy.length ? ', заняты: '+joinNames(busy.map(p=>p.id)) : ''}`;
    h += `<button class="${cls}" data-day="${k}" aria-label="${lbl}${isOff(k) ? ', ' + holiday(k).name : ''}">${strip}${isOff(k) ? '<span class="hd"></span>' : ''}${(() => { const ds = datesOn(k); return ds.length ? `<span class="dt">${dIcon(ds[0])}</span>` : ''; })()}<span class="n">${dd}</span></button>`;
  }
  const cur = mIdx(y,m) === CUR();
  return `<section class="mblock${cur ? ' cur' : ''}" data-mi="${mIdx(y,m)}"><h3 class="mtitle">${MONTHS[m]}${y !== TODAY.getFullYear() ? ` <small>${y}</small>` : ''}</h3><div class="grid">${h}</div></section>`;
}
let range = [0,0];
function renderMonth(scrollTo){
  const map = busyMap(), V = vis();
  range = monthRange();
  let h = '';
  for (let i = range[0]; i <= range[1]; i++) h += blockHTML(Math.floor(i/12), i%12, map, V);
  h += `<button class="more press" data-act="more">Показать месяц</button>`;
  $('feed').innerHTML = h;
  requestAnimationFrame(alignHatch);
  if (picking) markPicked();
  monthHead();
  if (scrollTo !== undefined) requestAnimationFrame(() => goMonth(scrollTo, false));
}
function monthHead(){
  $('yrText').textContent = state.y;
  $('title').textContent = MONTHS[state.m];
}
// какой месяц сейчас под шапкой
function onFeedScroll(){
  if (state.view !== 'month') return;
  const top = $('top').getBoundingClientRect().bottom + 8;
  let cur = null;
  for (const b of document.querySelectorAll('.mblock')) { if (b.getBoundingClientRect().top <= top) cur = b; else break; }
  const i = cur ? +cur.dataset.mi : range[0];
  if (i === mIdx(state.y, state.m)) return;
  state.y = Math.floor(i/12); state.m = i%12; monthHead();
}
function goMonth(i, smooth){
  if (i < range[0] || i > range[1]){ if (i > range[1]) state.extra += i - range[1]; state.y = Math.floor(i/12); state.m = i%12; renderMonth(); }
  const b = document.querySelector(`.mblock[data-mi="${i}"]`); if (!b) return;
  const y = i === range[0] ? 0 : b.getBoundingClientRect().top + scrollY - $('top').offsetHeight - 4;
  scrollTo({top:y, behavior: smooth && !matchMedia('(prefers-reduced-motion: reduce)').matches ? 'smooth' : 'auto'});
  state.y = Math.floor(i/12); state.m = i%12; monthHead();
}
/* ---------- режим выбора дней: долгий тап по дню ---------- */
let picking = null, lpAt = 0;
function startPick(k){
  picking = new Set([k]); lpAt = Date.now();
  try { navigator.vibrate && navigator.vibrate(30); } catch(_){}
  document.body.classList.add('picking'); markPicked();
}
function togglePick(k){ picking.has(k) ? picking.delete(k) : picking.add(k); markPicked(); }
function stopPick(){ picking = null; document.body.classList.remove('picking'); markPicked(); }
function markPicked(){
  document.querySelectorAll('#feed .day').forEach(b => b.classList.toggle('picked', !!picking && picking.has(b.dataset.day)));
  const bar = $('pickBar');
  bar.hidden = !picking;
  if (picking) $('pickN').textContent = picking.size ? `Выбрано: ${picking.size} ${plural(picking.size,'день','дня','дней')}` : 'Нажимай на дни';
}
{ let t = null, x0 = 0, y0 = 0;
  const feed = $('feed');
  feed.addEventListener('pointerdown', e => { const b = e.target.closest('.day'); if (!b || picking) return;
    x0 = e.clientX; y0 = e.clientY; clearTimeout(t); t = setTimeout(() => startPick(b.dataset.day), 450); });
  const cancel = () => clearTimeout(t);
  feed.addEventListener('pointermove', e => { if (Math.abs(e.clientX - x0) > 10 || Math.abs(e.clientY - y0) > 10) cancel(); });
  ['pointerup','pointercancel','pointerleave'].forEach(ev => feed.addEventListener(ev, cancel));
  feed.addEventListener('contextmenu', e => { if (e.target.closest('.day')) e.preventDefault(); }); }
function markSel(){
  document.querySelectorAll('#feed .day.sel').forEach(b => b.classList.remove('sel'));
  document.querySelectorAll(`#feed .day[data-day="${state.sel}"]`).forEach(b => b.classList.add('sel'));
}

const LOCK = '<svg class="lock" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-label="Видно не всем"><rect x="5" y="11" width="14" height="10" rx="2.5"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>';
// дата слева: число и день недели (красным — выходные и праздники)
function dateCol(k){
  const d = parse(k), off = d.getDay() === 0 || d.getDay() === 6 || isOff(k);
  return `<span class="dcol${off ? ' off' : ''}"><b>${d.getDate()}</b><small>${['вс','пн','вт','ср','чт','пт','сб'][d.getDay()]}</small></span>`;
}
function evHTML(e, withDate){
  const w = waiting(e);
  const caps = e.who.map(p => `<i style="${cs(P[p])}"></i>`).join('') + w.map(p => `<i class="wait" style="${cs(P[p])}"></i>`).join('')
    + (e.req && P[e.req.to] && e.req.st !== 'no' ? `<i class="${e.req.st === 'yes' ? '' : 'wait'}" style="${cs(P[e.req.to])}"></i>` : '');
  const rq = e.req && P[e.req.to] ? `<div class="meta">Просьба · ${esc(P[e.req.to].name)}: ${esc(e.req.text)} — ${reqSt(e)}</div>` : '';
  const mine = owner(e) === ME();
  return `<button class="ev press" data-open="${e.id}">
    ${withDate ? dateCol(e.from) : ''}<span class="caps">${caps}</span>
    <span style="min-width:0"><div class="what">${e.vis && e.vis !== 'all' ? LOCK : ''}${esc(e.what)}${e.req && P[e.req.to] ? `<span class="rqtag${e.req.st === 'yes' ? ' ok' : e.req.st === 'no' ? ' no' : ''}">просьба</span>` : ''}</div><div class="meta">${joinNames(e.who)}${w.length ? ` · ждём: ${joinNames(w)}` : ''}, ${fmtRange(e.from,e.to)}${e.tf ? `, ${e.tf}${e.tt ? '–' + e.tt : ''}` : ''}${Array.isArray(e.vis) ? ` · видят: ${e.vis.length ? joinNames(e.vis) : 'только вы'}` : ''}</div>${rq}</span>
    ${mine ? `<svg class="chev" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>` : ''}</button>`;
}
// дела дня — в шторке
function openDay(k, dir){
  state.sel = k; markSel();
  const d = parse(k);
  const list = entries.filter(e => e.from <= k && e.to >= k).sort((a,b) => a.from.localeCompare(b.from));
  const here = e => e.who.filter(w => !(e.days && e.days[w] && !e.days[w].includes(k)));
  const busy = new Set(list.flatMap(e => e.req && e.req.st === 'yes' ? [...here(e), e.req.to] : here(e)));
  const free = PEOPLE.filter(p => !busy.has(p.id));
  const hd = holiday(k);
  let h = `<div class="dpHead"><h2>${WDF[d.getDay()]}, ${fmtDay(k)}</h2>${busy.size ? '' : '<span class="tag">Все свободны</span>'}</div>${hd ? `<div class="holname${hd.off ? ' off' : ''}">${esc(hd.name)}</div>` : ''}${memDays(k).map(n => `<div class="holname">${esc(n)}</div>`).join('')}${datesOn(k).map(x => `<div class="dline">${dIcon(x)} <span>${dateLine(x, d.getFullYear())}</span><button class="lnk press" data-dshare="${x.id}">Поделиться</button></div>`).join('')}`;
  if (list.length){
    h += list.map(e => evHTML(e)).join('');   // без даты слева: день и так в заголовке
    if (free.length) h += `<div class="freeLine">Свободны: <b>${joinNames(free.map(p=>p.id))}</b></div>`;
  } else h += `<div class="emptyDay">В этот день никто ничего не запланировал.</div>`;
  h += `<button class="btn press" data-act="add">+ Дело на этот день</button>`;
  // свайп влево/вправо — соседний день; при листании шторка не прыгает наверх
  const html = `<div class="dayv${dir ? ' from-' + dir : ''}" data-dayk="${k}">${h}</div>`;
  if (dir && $('sheet').classList.contains('open')){ $('sheetBody').innerHTML = html; return; }
  openSheet(html);
}

function renderMulti(n){
  const map = busyMap(), V = vis();
  let h = '';
  for (let i=0; i<n; i++){
    const y = state.sy + Math.floor((state.sm + i)/12), m = (state.sm + i) % 12;
    const offset = (new Date(y,m,1).getDay()+6)%7, dim = new Date(y,m+1,0).getDate();
    let cells = '<span></span>'.repeat(offset), freeCount = 0;
    for (let dd=1; dd<=dim; dd++){
      const k = key(new Date(y,m,dd)), b = map[k] || {};
      const busy = V.filter(p => b[p.id]);
      const free = V.length > 0 && !busy.length;
      if (free && k >= TODAY_K) freeCount++;
      const dow = (offset + dd - 1) % 7;
      const cls = ['md', busy.length && 'filled', busy.length > 1 && 'over', k===TODAY_K && 'today', k<TODAY_K && 'pastd', (dow===6 || isOff(k)) && 'sun', isOff(k) && 'hol'].filter(Boolean).join(' ');
      cells += `<button class="${cls}" data-date="${k}" aria-label="${dd} ${MONTHS_G[m]}">${bands(busy)}<span class="num">${dd}</span></button>`;
    }
    const pastM = new Date(y,m+1,0) < TODAY;
    const cur = y === TODAY.getFullYear() && m === TODAY.getMonth();
    const yl = y !== TODAY.getFullYear() ? ` ${y}` : '';
    h += `<div class="mm${cur?' cur':''}${pastM?' past':''}">
      <button class="mmh" data-ym="${y}-${m}"><span>${MONTHS[m]}</span>${yl ? `<small>${y}</small>` : ''}</button>
      <div class="mmgrid">${cells}</div></div>`;
  }
  const g = $('yearGrid');
  g.className = 'yg y3'; // год: сетка 3 колонки
  g.innerHTML = h;
  const ey = state.sy + Math.floor((state.sm + n - 1)/12), em = (state.sm + n - 1) % 12;
  return `${MONTHS_G[state.sm].slice(0,3)} ${state.sy} – ${MONTHS_G[em].slice(0,3)} ${ey}`;
}

function freeRanges(days){
  const map = busyMap(), out = []; let start = null;
  for (let i=0; i<=days; i++){
    const d = addDays(TODAY,i), k = key(d), b = map[k] || {};
    const free = i < days && PEOPLE.every(p => !b[p.id]);
    if (free && !start) start = k;
    if (!free && start){ out.push([start, key(addDays(d,-1))]); start = null; }
  }
  return out;
}

let pushOn = false;
/* ---------- установка на телефон ---------- */
let installEvt = null;
addEventListener('beforeinstallprompt', e => { e.preventDefault(); installEvt = e; if (typeof render === 'function' && $('invs')) render(); });
addEventListener('appinstalled', () => { installEvt = null; store(KEYS.inst, 1); render(); toast('Готово', 'Иконка «Кто когда» появилась на экране'); });
const UA = navigator.userAgent;
const isAndroid = /Android/.test(UA);
const isChrome = /Chrome\//.test(UA) && !/YaBrowser|SamsungBrowser|OPR\/|EdgA|MiuiBrowser|HeyTap|; wv\)|Telegram/.test(UA);
const ICO_SHARE = '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v12M8 7l4-4 4 4M5 11v9h14v-9"/></svg>';
const ICO_PLUS = '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="3"/><path d="M12 8v8M8 12h8"/></svg>';
const showInstallCard = () => !standalone && !load(KEYS.inst, 0);
function installSteps(){
  if (isIOS) return `<ol><li>Нажмите ${ICO_SHARE} «Поделиться» внизу экрана Safari (или в адресной строке).</li><li>Прокрутите и выберите ${ICO_PLUS} «На экран „Домой“».</li><li>Нажмите «Добавить». Открывайте приложение значком с экрана — только так придут уведомления.</li></ol>
    <p class="note">Открыли из Telegram или WhatsApp? Сначала нажмите ⋯ или ${ICO_SHARE} и выберите «Открыть в Safari».</p>`;
  if (isAndroid) return (installEvt ? '<button class="btn ok press" data-act="install" style="margin-top:0">Установить</button>'
      : (isChrome ? '' : '<p class="lead"><b>Откройте эту ссылку в Google Chrome</b> — другие браузеры (например, Яндекс) часто не умеют ставить приложение на экран.</p>')
      + '<ol><li>Нажмите меню ⋮ в Chrome (справа вверху).</li><li>Выберите «Установить приложение» или «Добавить на главный экран».</li><li>Подтвердите. Значок появится на экране телефона.</li></ol>')
    + `<p class="note">Открыли из Telegram или WhatsApp? Нажмите ⋮ и выберите «Открыть в Chrome» или «Открыть в браузере».</p>
       <p class="note"><b>Не устанавливается или пишет «уже установлено», а значка нет?</b> Где-то зависла вкладка, даже если её не видно. Нажмите квадратик с цифрой справа от адресной строки → ⋮ → «Закрыть все вкладки», откройте ссылку заново и установите.</p>`;
  return '<p class="lead">Откройте эту ссылку на телефоне: на iPhone — в Safari, на Android — в Google Chrome. Там появится инструкция.</p>';
}
function installCardHTML(){
  if (!showInstallCard()) return '';
  return `<div class="inst" role="region" aria-label="Как установить"><button class="x press" data-act="instHide" aria-label="Закрыть">×</button>
    <b>Установите на телефон</b>${installSteps()}</div>`;
}
// инструкция по установке: для своего телефона сверху, вторая — ниже
function openHowto(){
  const ios = `<div class="gsec"><b>📱 iPhone — только Safari</b><ol class="hsteps"><li>Открой ссылку в <b>Safari</b>.</li><li>${ICO_SHARE} «Поделиться» внизу.</li><li>${ICO_PLUS} «На экран „Домой“» → «Добавить».</li><li>Открывай с иконки — так работают уведомления.</li></ol></div>`;
  const andr = `<div class="gsec"><b>🤖 Android — только Google Chrome</b>${isAndroid && !isChrome ? '<div class="hwarn">Сейчас открыто не в Chrome. В Яндекс Браузере и других приложение не ставится нормально и не приходят уведомления.</div>' : ''}<ol class="hsteps"><li>Открой ссылку в <b>Google Chrome</b>.</li><li>Меню ⋮ справа вверху.</li><li>«Установить приложение».</li><li>Открывай с иконки.</li></ol></div>`;
  openSheet(`<h2>Как установить</h2>${standalone ? '<div class="hint">Уже установлено 👍</div>' : ''}
    ${isAndroid ? andr + ios : ios + andr}
    <div class="gnote" style="margin-top:8px">Открыл из Телеграма или WhatsApp? Нажми ⋮ или ⋯ → «Открыть в браузере». Уже был аккаунт? Вставь «Ключ входа».</div>
    ${installEvt ? '<button class="btn ok press" data-act="install">Установить сейчас</button>' : ''}`);
}
async function doInstall(){
  if (!installEvt) return openHowto();
  installEvt.prompt();
  let r = null; try { r = await installEvt.userChoice; } catch(e){}
  installEvt = null;
  if (r && r.outcome === 'accepted') store(KEYS.inst, 1);
  render();
}
const seg = (attr, cur, opts) => `<div class="seg">${opts.map(([v,t]) => `<button data-${attr}="${v}" aria-pressed="${v === cur}">${t}</button>`).join('')}</div>`;
// напоминания: правила пользователя
const REM_ROWS = [['week','За неделю'],['eve','Накануне'],['morn','В день дела']];
const timeOpts = cur => Array.from({length:48}, (_, i) => `${pad(Math.floor(i/2))}:${i % 2 ? '30' : '00'}`).map(t => `<option${t === cur ? ' selected' : ''}>${t}</option>`).join('');
// понятный выключатель как в iOS: справа, зелёный — включено
const tog = (act, on, attrs = '', label = '') => `<button class="tog press${on ? ' on' : ''}" role="switch" aria-checked="${!!on}" aria-label="${label}" data-act="${act}"${attrs}><i></i></button>`;
function remHTML(){
  if (!ONLINE || !meInfo || !meInfo.rem) return '';
  const r = meInfo.rem;
  let h = `<div class="sec" style="margin-top:28px">Напоминания</div><div class="set">`;
  for (const [k, t] of REM_ROWS) h += `<div class="setRow"><div class="k" style="flex:1">${t}</div>
    <select class="tsel" data-remt="${k}"${r[k].on ? '' : ' disabled'}>${timeOpts(r[k].t)}</select>${tog('remOn', r[k].on, ` data-k="${k}"`, t)}</div>`;
  h += `<div class="setRow"><div style="flex:1"><div class="k">До начала</div><div class="v">если у дела указано время</div></div>
    <select class="tsel" data-remb="1"${r.before.on ? '' : ' disabled'}>${[[15,'за 15 мин'],[30,'за 30 мин'],[60,'за 1 ч'],[120,'за 2 ч'],[180,'за 3 ч']].map(([v, l]) => `<option value="${v}"${v === r.before.min ? ' selected' : ''}>${l}</option>`).join('')}</select>${tog('remOn', r.before.on, ' data-k="before"', 'До начала')}</div>`;
  return h + `<div class="setRow"><div class="v">Приходят пушем по твоим делам и тем, куда ты идёшь. ${pushOn ? '' : '<b>Сначала включи уведомления.</b>'}</div></div></div>`;
}
function saveRem(r){
  meInfo.rem = r; render();
  api('PATCH', '/me', {rem: r}).then(sync).catch(() => toast('Не получилось', 'Нет связи с сервером'));
}
function settingsHTML(){
  let h = `<div class="set">
    <div class="setRow"><div class="k">Тема</div>${seg('theme', themeName, [['auto','Авто'],['light','Светлая'],['dark','Тёмная']])}</div>
    <div class="setRow"><div class="k">Стиль</div>${seg('skin', skinName, SKINS)}</div>
`;
  if (!ONLINE) h += `<div class="setRow"><div><div class="k">Демо-режим · вы — ${P[ME()].name}</div><div class="v">Данные только на этом устройстве</div></div><button class="lnk press" data-act="reset">Сбросить</button></div>`;
  else if (meInfo) {
    const pushNote = pushOn ? 'Приглашения, запросы и дела ваших связей'
      : (isIOS && !standalone) ? 'На iPhone сначала: Поделиться → «На экран Домой»'
      : 'Пуш о приглашениях, запросах и делах связей';
    h += `<div class="setRow"><div><div class="k">${esc(meInfo.name)} · @${meInfo.id}</div><div class="v">${pending.length ? `Не отправлено изменений: ${pending.length}` : 'Всё синхронизировано'}</div></div><button class="lnk press" data-act="profile">Профиль</button></div>
      <div class="setRow"><div><div class="k">Уведомления</div><div class="v">${pushNote}</div></div>${tog('push', pushOn, '', 'Пуш-уведомления')}</div>
      <div class="setRow"><div><div class="k">О делах всех связей</div><div class="v">${meInfo.pushAll ? 'Пуш о каждом новом деле' : 'Только приглашения и запросы'}</div></div><button class="lnk press${meInfo.pushAll ? ' on' : ''}" data-act="pushAll">${meInfo.pushAll ? 'Да' : 'Нет'}</button></div>
      <div class="setRow"><div><div class="k">Ключ входа</div><div class="v">Чтобы войти на другом телефоне</div></div><button class="lnk press" data-act="showKey">Показать</button></div>`;
  }
  return h + `</div><p class="itv">${SIG}</p><p class="ver">Кто когда · бета · v${APP_VER}</p>`;
}
function personRow(id, right, sub){
  const p = P[id] || {name:id, color:'#8E8E93'};
  return `<div class="prow" style="${cs(p)}"><span class="dot"></span><div style="min-width:0"><div>${esc(p.name)}</div><div class="v">@${id}${sub ? ' · ' + sub : ''}</div></div><span class="st">${right}</span></div>`;
}
function peopleHTML(){
  let h = `<div class="sec" style="margin-top:28px">Люди</div><div class="set">`;
  h += `<div class="setRow"><div><div class="k">Позвать нового человека</div><div class="v">Только по ссылке — со стороны не зарегистрироваться</div></div><button class="lnk on press" data-act="invite">Пригласить</button></div>`;
  h += `<div class="setRow knock"><input class="in" id="kNick" placeholder="@ник человека" autocomplete="off" autocapitalize="off" spellcheck="false"><button class="lnk press" data-act="knock">Постучаться</button></div>`;
  h += `<div class="sugg" id="kSugg" hidden></div>`;
  for (const id of links.incoming) h += personRow(id, `<button class="lnk on press" data-link="${id}" data-la="accept">Принять</button> <button class="lnk press" data-link="${id}" data-la="drop">Нет</button>`, 'стучится');
  for (const id of links.outgoing) h += personRow(id, `<button class="lnk press" data-link="${id}" data-la="drop">Отменить</button>`, 'ждём ответа');
  for (const id of links.friends.filter(id => P[id]).sort((a,b) => P[a].name.localeCompare(P[b].name, 'ru')))
    h += personRow(id, `<button class="lnk press" data-link="${id}" data-la="remove">Убрать</button>`);
  if (!links.friends.length && !links.incoming.length && !links.outgoing.length) h += `<div class="setRow"><div class="v">Пока никого. Пришлите близким ссылку-приглашение или постучитесь к тем, кто уже здесь, по @нику.</div></div>`;
  return h + `</div>`;
}
function adminHTML(){
  const pend = users.filter(u => u.status === 'pending').sort((a,b) => (a.ts||0) - (b.ts||0));
  const rest = users.filter(u => u.status !== 'pending' && u.id !== ME()).sort((a,b) => a.name.localeCompare(b.name, 'ru'));
  let h = `<div class="sec" style="margin-top:28px">Разработчик</div><div class="set">`;
  if (!pend.length && !rest.length) h += `<div class="setRow"><div class="v">Пока только вы.</div></div>`;
  for (const u of pend) h += `<div class="prow" style="${cs(u)}"><span class="dot"></span><div style="min-width:0"><div>${esc(u.name)}</div><div class="v">@${u.id} · заявка</div></div><span class="st">
    <button class="lnk on press" data-adm="${u.id}" data-aa="approve">Одобрить</button> <button class="lnk press" data-adm="${u.id}" data-aa="reject">Отклонить</button></span></div>`;
  for (const u of rest) h += `<div class="prow" style="${cs(u)}"><span class="dot"></span><div style="min-width:0"><div>${esc(u.name)}</div><div class="v">@${u.id}${u.status === 'blocked' ? ' · заблокирован' : ''}</div></div><span class="st">
    <button class="lnk press" data-adm="${u.id}" data-aa="newkey">Ключ</button> <button class="lnk press" data-adm="${u.id}" data-aa="${u.status === 'blocked' ? 'unblock' : 'block'}">${u.status === 'blocked' ? 'Вернуть' : 'Блок'}</button></span></div>`;
  return h + `</div>`;
}
function renderList(){
  const fr = freeRanges(60).slice(0,6);
  const up = entries.filter(e => e.to >= TODAY_K).sort((a,b) => a.from.localeCompare(b.from) || a.to.localeCompare(b.to));
  let h = `<div class="sec">Когда свободны все</div>`;
  h += fr.length ? `<div class="frs">${fr.map(([a,b]) => `<button class="fr press" data-goto="${a}">${fmtRange(a,b)}</button>`).join('')}</div>`
                 : `<div class="empty">В ближайшие два месяца нет дней, когда свободны все.</div>`;
  h += `<div class="sec">Дела по порядку</div>`;
  // разделители по месяцам — чтобы было видно, где кончается ноябрь
  let lastM = '';
  h += up.length ? up.map(e => { const m = e.from.slice(0, 7), head = m !== lastM ? `<div class="msep">${MONTHS[+m.slice(5) - 1]}${m.slice(0, 4) != TODAY.getFullYear() ? ' ' + m.slice(0, 4) : ''}</div>` : ''; lastM = m; return head + evHTML(e, true); }).join('')
    : `<div class="empty">Пока никто ничего не запланировал.</div>`;
  $('vList').innerHTML = h;
}
// настройки — свёрнутые блоки с коротким описанием
const openBlk = new Set(load('kk-blk', []));
const BLK_IC = {
  people:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><circle cx="17" cy="9" r="2.5"/><path d="M16 14.2a5 5 0 0 1 5.5 5.8"/></svg>',
  bell:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9a6 6 0 0 1 12 0c0 6 2.5 7.5 2.5 7.5h-17S6 15 6 9"/><path d="M10 20a2.2 2.2 0 0 0 4 0"/></svg>',
  me:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',
  look:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 3v18" /><path d="M12 3a9 9 0 0 1 0 18" fill="currentColor"/></svg>',
  dev:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 7l-5 5 5 5M16 7l5 5-5 5"/></svg>'
};
const blk = (k, ic, color, title, sub, inner) => `<details class="set gbox blk" data-blk="${k}"${openBlk.has(k) ? ' open' : ''}><summary><span class="gic" style="--ic:${color}">${ic}</span><span class="gtt"><b>${title}</b><small>${sub}</small></span><svg class="arr" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg></summary><div class="blkin">${inner}</div></details>`;
const strip = h => h.replace(/^\s*<div class="sec"[^>]*>[^<]*<\/div>/, '');
function renderSet(){
  const nFr = links.friends.length, nIn = links.incoming.length;
  let h = guideHTML();
  // «Я и мои люди»: профиль, ключ входа и связи в одном блоке
  const meTop = ONLINE && meInfo ? meHTML() : !ONLINE ? `<div class="set"><div class="setRow"><div><div class="k">Демо-режим: вы — ${esc(P[ME()].name)}</div><div class="v">Данные только на этом устройстве</div></div><button class="lnk press" data-act="reset">Сбросить</button></div></div>` : '';
  const peopleSub = `${nFr ? `${nFr} ${plural(nFr,'человек','человека','человек')}` : 'пока никого'}${nIn ? ` · стучатся: ${nIn}` : ''}`;
  h += blk('people', BLK_IC.people, '#0A84FF', 'Я и мои люди', `${ONLINE && meInfo ? esc(meInfo.name) + ' · ' : ''}${peopleSub} · пригласить`, meTop + peopleHTML());
  if (ONLINE && meInfo){
    const r = meInfo.rem, remSub = !srvNew() ? 'скоро' : [r.week.on && 'за неделю', r.eve.on && `накануне ${r.eve.t}`, r.morn.on && `в день ${r.morn.t}`, r.before.on && `за ${r.before.min >= 60 ? r.before.min/60 + ' ч' : r.before.min + ' мин'}`].filter(Boolean).join(', ') || 'выключены';
    h += blk('notif', BLK_IC.bell, '#FF9F0A', 'Уведомления', `${pushOn ? 'включены' : 'выключены'} · напоминания: ${remSub}`, notifHTML() + strip(remHTML()));
  }
  const nD = myDates().length;
  h += blk('dates', '<span style="font-size:18px;line-height:1">🎂</span>', '#FF375F', 'Праздники и дни рождения', `${nD ? nD + ' ' + plural(nD, 'дата', 'даты', 'дат') : 'добавить дни рождения'} · список праздников`, datesHTML());
  h += blk('look', BLK_IC.look, '#BF5AF2', 'Внешний вид', `тема: ${{auto:'авто',light:'светлая',dark:'тёмная'}[themeName]} · стиль ${SKINS.find(x => x[0] === skinName)[1]} · цвета`, lookHTML());
  if (meInfo && meInfo.admin) h += blk('dev', BLK_IC.dev, '#8E8E93', 'Разработчик', `${users.filter(u => u.id !== ME()).length} пользователей · блок, ключи`, strip(adminHTML()));
  h += `<p class="itv">${SIG}</p><p class="ver">Кто когда · бета · v${APP_VER}</p>`;
  $('vSet').innerHTML = h;
}
function lookHTML(){
  return `<div class="set">
    <div class="setRow"><div class="k">Тема</div>${seg('theme', themeName, [['auto','Авто'],['light','Светлая'],['dark','Тёмная']])}</div>
    <div class="setRow"><div class="k">Стиль</div>${seg('skin', skinName, SKINS)}</div>
    <div class="setRow"><div><div class="k">Цвета календаря</div><div class="v">Если полосы кажутся тусклыми — «Ярче»</div></div>${seg('bright', bright, [['soft','Мягкие'],['vivid','Ярче']])}</div>
    </div>`;
}
function notifHTML(){
  const denied = 'Notification' in window && Notification.permission === 'denied';
  const pushNote = pushOn ? 'Приглашения, запросы и напоминания' : denied ? 'Телефон запретил уведомления: Настройки телефона → Приложения → Кто когда → Уведомления → разрешить' : (isIOS && !standalone) ? 'На iPhone сначала: Поделиться → «На экран Домой»' : 'Включи, чтобы видеть, кто что добавил';
  return `<div class="set"><div class="setRow"><div><div class="k">Пуш-уведомления</div><div class="v">${pushNote}</div></div>${tog('push', pushOn, '', 'Пуш-уведомления')}</div>
    ${pushOn ? `<div class="setRow"><div><div class="k">Проверить</div><div class="v">Пришлём пробный пуш на этот телефон</div></div><button class="lnk press" data-act="pushTest">Проверить</button></div>` : ''}
    <div class="setRow"><div><div class="k">Пуш о каждом новом деле</div><div class="v">${meInfo.pushAll ? 'Включено — пуш, когда кто-то добавил дело' : 'Только приглашения, просьбы и напоминания. Остальное — в «Пока тебя не было»'}</div></div>${tog('pushAll', meInfo.pushAll, '', 'Пуш о каждом новом деле')}</div></div>`;
}
function meHTML(){
  return `<div class="set"><div class="setRow"><div><div class="k">${esc(meInfo.name)} · @${meInfo.id}</div><div class="v">${pending.length ? `Не отправлено изменений: ${pending.length}` : 'Всё сохранено'}</div></div><button class="lnk press" data-act="profile">Изменить</button></div>
    <div class="setRow"><div><div class="k">Ключ входа</div><div class="v">Чтобы войти на другом телефоне</div></div><button class="lnk press" data-act="showKey">Показать</button></div></div>`;
}
// гайд «Как это работает» — в стиле Монеток: короткие шаги с картинками
let guideOpen = false;
const TAB_IC = {
  month:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3.5" y="5" width="17" height="15.5" rx="3.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/></svg>',
  year:'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' + [5.5,12,18.5].map(y => [5.5,12,18.5].map(x => `<circle cx="${x}" cy="${y}" r="2.3"/>`).join('')).join('') + '</svg>',
  list:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M9 6.5h11M9 12h11M9 17.5h11"/><circle cx="4.6" cy="6.5" r="1.2" fill="currentColor"/><circle cx="4.6" cy="12" r="1.2" fill="currentColor"/><circle cx="4.6" cy="17.5" r="1.2" fill="currentColor"/></svg>',
  set:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1"/></svg>',
  link:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/></svg>',
  knock:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8"/></svg>',
  drop:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="8" r="4"/><path d="M2 21a7 7 0 0 1 14 0M17 11h5"/></svg>',
  tip:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.5 1 2.5h6c0-1 .3-1.8 1-2.5A6 6 0 0 0 12 3z"/></svg>'
};
// мини-день для картинок гайда
// мини-день для подсказок: cols — цвета полос; opt.help — рамка «помогаю», opt.hol — праздник, opt.ic — значок в углу
const gday = (n, cols, opt = {}) => `<span class="gday${cols.length ? ' filled' : ''}${cols.length > 1 ? ' over' : ''}${opt.hol ? ' hol' : ''}">${cols.length ? `<span class="bands">${cols.map((c, i) => `<i style="--c:${c}"${opt.help === i ? ' class="help"' : ''}></i>`).join('')}</span>` : ''}${opt.ic ? `<span class="gic2">${opt.ic}</span>` : ''}<b>${n}</b></span>`;
function guideBody(){
  const [a, b] = [P[ME()] ? P[ME()].color : '#30B05A', '#BF5AF2'];
  return `<div class="gbody">
  <div class="gsec"><b>1. Кто когда занят</b>
    <div class="gflow3">
      <span class="gex">${gday(12, [])}<span><b>Пусто</b>все свободны</span></span>
      <span class="gex">${gday(13, [a])}<span><b>Полоска</b>человек занят</span></span>
      <span class="gex">${gday(14, [a, b])}<span><b>Две</b>заняты оба</span></span>
    </div>
    <div class="gnote">У каждого свой цвет. Нажми на день — увидишь, кто чем занят. Листай дни свайпом влево-вправо.</div></div>

  <div class="gsec"><b>2. Своё дело</b>
    <div class="gnote"><b>+</b> внизу → что за дело → когда → «Сохранить». Много дней сразу: подержи палец на дне и отметь остальные.</div></div>

  <div class="gsec"><b>3. Вместе</b>
    <div class="gflow3">
      <span class="gex">${gday(15, [a, b])}<span><b>Позвать</b>придёт «Иду / не иду»</span></span>
      <span class="gex">${gday(16, [b])}<span><b>Хочу с вами</b>в чужом деле</span></span>
      <span class="gex">${gday(17, [b, a], {help:1})}<span><b>Попросить</b>«посиди с сыном»</span></span>
    </div>
    <div class="gnote">Кто согласился помочь — его полоса в рамке.</div></div>

  <div class="gsec"><b>4. Даты и праздники</b>
    <div class="gflow3">
      <span class="gex">${gday(4, [], {hol:true})}<span><b>Красный</b>выходной, праздник</span></span>
      <span class="gex">${gday(20, [], {ic:'🎂'})}<span><b>🎂</b>день рождения</span></span>
      <span class="gex">${gday(21, [a])}<span><b>Нажми день</b>там все праздники</span></span>
    </div>
    <div class="gnote">Дни рождения — в Настройках → «Праздники и дни рождения». «Поделиться» — человек добавит дату себе в один тап.</div></div>

  <div class="gsec"><b>5. Уведомления</b>
    <div class="gnote">Включи в Настройках. Придут приглашения, просьбы и напоминания. Остальное — в карточке «Пока тебя не было».</div></div>

  <div class="gsec"><b>6. Внизу</b>
    <div class="gwhere">
      <span>${TAB_IC.month}<b>Месяц</b>календарь</span>
      <span>${TAB_IC.year}<b>Год</b>весь год</span>
      <span>${TAB_IC.list}<b>Ближайшее</b>что скоро</span>
      <span>${TAB_IC.set}<b>Настройки</b>люди, даты</span>
    </div>
    <div class="gnote">Между ними можно листать свайпом.</div></div>

  <div class="gsec gwarn">${TAB_IC.tip}<div><b>Если что-то не так</b><br>
    • Android: только <b>Google Chrome</b>. В Яндекс Браузере не работают уведомления.<br>
    • Новый телефон — «Ключ входа» в Настройках → «Я и мои люди».</div></div>
  </div>`;
}
const guideHTML = () => `<details class="set gbox"${guideOpen ? ' open' : ''} id="guideBox"><summary><span class="gic">${TAB_IC.tip}</span><span class="gtt"><b>Что мне делать?</b><small>я ничего не понимаю</small></span><svg class="arr" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg></summary>
  <div class="setRow" style="padding:4px 0 14px"><div><div class="k">📲 Установить на телефон</div><div class="v">${standalone ? 'Уже установлено — открывай с иконки' : 'Сначала это: иконка на экране, уведомления, работает как приложение'}</div></div><button class="lnk press" data-act="howto">Как</button></div>
  ${guideBody()}</details>`;

function render(){
  const v = state.view, multi = isMulti(v), plain = v === 'list' || v === 'set';
  $('vMonth').hidden = v !== 'month';
  document.body.classList.toggle('multi', multi);
  document.body.classList.add('feed'); // одна и та же закреплённая шапка на всех вкладках
  $('topWd').hidden = v !== 'month';
  $('vYear').hidden = !multi;
  $('vList').hidden = v !== 'list';
  $('vSet').hidden = v !== 'set';
  $('people').hidden = plain;
  $('hb').style.visibility = v === 'month' ? 'visible' : 'hidden';
  $('yr').style.visibility = plain ? 'hidden' : 'visible';
  $('yr').querySelector('svg').style.display = v === 'month' ? '' : 'none';
  document.querySelectorAll('.tab').forEach(t => t.setAttribute('aria-selected', t.dataset.view === v));
  renderInvites();
  if (!plain) renderPeople();
  if (v === 'month') renderMonth();
  else if (multi){ yearStart(); $('title').textContent = 'Год'; $('yrText').textContent = renderMulti(yearSpan()); }
  else if (v === 'list'){ $('title').textContent = 'Ближайшее'; renderList(); }
  else { $('title').textContent = 'Настройки'; renderSet(); }
}
function openMonth(i, sel){
  state.y = Math.floor(i/12); state.m = i%12; state.extra = 0;
  state.sel = sel || (i === CUR() ? TODAY_K : key(new Date(state.y, state.m, 1)));
  state.view = 'month'; render(); requestAnimationFrame(() => goMonth(i, false));
}

/* ---------- шторка ---------- */
let sheetLocked = false;
function openSheet(html, locked){ sheetLocked = !!locked; document.body.classList.add('sheet-open'); $('sheetBody').innerHTML = html; $('sheet').scrollTop = 0; $('sheet').classList.add('open'); $('backdrop').classList.add('open'); }
function closeSheet(){ if (sheetLocked) return; document.body.classList.remove('sheet-open'); $('sheet').classList.remove('open'); $('backdrop').classList.remove('open'); }
$('backdrop').addEventListener('click', closeSheet);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeSheet(); });
// смахнуть шторку вниз
{ const sh = $('sheet'); let hx = null, hy = 0;
  sh.addEventListener('touchstart', e => { hx = e.touches[0].clientX; hy = e.touches[0].clientY; }, {passive:true});
  sh.addEventListener('touchend', e => {
    if (hx === null) return;
    const dv = sh.querySelector('.dayv'), vc = sh.querySelector('.vcard');
    if (!dv && !vc){ hx = null; return; }
    const dx = e.changedTouches[0].clientX - hx, dy2 = e.changedTouches[0].clientY - hy; hx = null;
    if (Math.abs(dx) <= 60 || Math.abs(dx) <= Math.abs(dy2) * 1.5) return;
    if (vc) stepView(dx < 0 ? 1 : -1);
    else openDay(key(addDays(parse(dv.dataset.dayk), dx < 0 ? 1 : -1)), dx < 0 ? 'r' : 'l');
  }); }
{ const sh = $('sheet'); let y0 = null, dy = 0;
  // барабаны (дата/время) крутятся сами по себе: шторку не тащим и не прокручиваем, пока палец на барабане
  const onWheel = e => !!(e.target.closest && e.target.closest('.wheel'));
  sh.addEventListener('touchstart', e => { if (onWheel(e)){ y0 = null; sh.style.overflowY = 'hidden'; return; } y0 = sh.scrollTop <= 0 && !sheetLocked ? e.touches[0].clientY : null; dy = 0; }, {passive:true});
  const unlock = () => { sh.style.overflowY = ''; };
  sh.addEventListener('touchcancel', unlock); document.addEventListener('touchend', unlock, {passive:true});
  sh.addEventListener('touchmove', e => { if (y0 === null) return; dy = e.touches[0].clientY - y0; if (dy > 0){ sh.classList.add('drag'); sh.style.transform = `translateY(${dy}px)`; } }, {passive:true});
  sh.addEventListener('touchend', () => { if (y0 === null) return; sh.classList.remove('drag'); sh.style.transform = ''; y0 = null; if (dy > 90) closeSheet(); }); }

const statusOf = (e, p) => (e.inv || {})[p] === 'ask' ? 'просится' : owner(e) === p ? 'создал' + (P[p].f ? 'а' : '') : e.who.includes(p) ? 'идёт' : e.inv && e.inv[p] === 'wait' ? 'ждём ответа' : e.inv && e.inv[p] === 'no' ? 'не идёт' : '';

// форма своего дела
let form = null;
// разбить выбранные дни на сплошные отрезки
function toRuns(days){
  const ds = [...days].sort(), out = [];
  for (const k of ds){ const last = out[out.length - 1];
    if (last && key(addDays(parse(last[1]), 1)) === k) last[1] = k; else out.push([k, k]); }
  return out;
}
function openForm(e, date, runs){
  const isEdit = !!e, me = ME(); wheelFor = null;
  form = isEdit ? {id:e.id, people:new Set([...e.who, ...Object.keys(e.inv || {})].filter(p => p !== me)), from:e.from, to:e.to, what:e.what, src:e,
                   visAll: !Array.isArray(e.vis), vis: new Set(Array.isArray(e.vis) ? e.vis : []), tf: e.tf || '', tt: e.tt || '', noRem: !!e.noRem, rqTo: e.req ? e.req.to : '', rqText: e.req ? e.req.text : ''}
                : {id:null, people:new Set(), from:date||TODAY_K, to:date||TODAY_K, what:'', src:null, visAll:true, vis:new Set(), tf:'', tt:'', rqTo:'', rqText:''};
  if (runs && runs.length){ form.from = runs[0][0]; form.to = runs[0][1]; form.runs = runs.length > 1 ? runs : null; }
  openSheet(`<h2>${isEdit ? 'Изменить дело' : 'Новое дело'}</h2>
    <div class="hint">Занят будешь ты. Остальных можно позвать — они подтвердят сами.</div>
    <label class="f" for="fWhat">Что за дело</label>
    <input class="in" id="fWhat" maxlength="60" placeholder="Например: сборы, Казань" value="${esc(form.what)}">
    ${form.runs ? `<label class="f">Дни</label><div class="runs">${form.runs.map(([a, b]) => `<span>${fmtRange(a, b)}</span>`).join('')}</div><div class="hint">Запишется ${form.runs.length} ${plural(form.runs.length,'дело','дела','дел')} с одним названием.</div>` : ''}
    <div class="row2"${form.runs ? ' hidden' : ''}>
      <div><label class="f">С</label><button type="button" class="in dbtn press" data-dp="from" id="dpFrom">${dLabel(form.from)}</button></div>
      <div><label class="f">По</label><button type="button" class="in dbtn press" data-dp="to" id="dpTo">${dLabel(form.to)}</button></div>
    </div>
    <div id="timeRow">${timeRowHTML()}</div>
    <div class="wheel" id="wheel" hidden></div>
    ${srvNew() ? `<label class="f">Напоминание</label>
    <button type="button" class="lnk press${form.noRem ? '' : ' on'}" data-act="noRem" aria-pressed="${!form.noRem}">${form.noRem ? 'Не напоминать' : 'Напомнить мне'}</button>` : ''}
    <label class="f">Позвать</label>
    <div class="whoPick" id="pick">${pickHTML()}</div>
    ${srvReq() ? `<label class="f">Попросить</label><div class="whoPick" id="rqPick">${rqHTML()}</div>` : ''}
    <label class="f">Кто видит</label>
    ${seg('fvis', form.visAll ? 'all' : 'some', [['all','Все мои люди'],['some','Только выбранные']])}
    <div class="whoPick" id="visPick" style="margin-top:10px">${visHTML()}</div>
    <div class="err" id="fErr"></div>
    <button class="btn press" data-act="save">Сохранить</button>
    ${isEdit ? '<button class="btn ghost press" data-act="delete">Удалить</button>' : ''}`);
}
/* ---------- барабан выбора даты ---------- */
const WD_S = ['вс','пн','вт','ср','чт','пт','сб'];
const dLabel = k => { const d = parse(k); return `${d.getDate()} ${MONTHS_G[d.getMonth()].slice(0,3)}${d.getFullYear() !== TODAY.getFullYear() ? ' ' + d.getFullYear() : ''} · ${WD_S[d.getDay()]}`; };
const ITEM = 38;
let wheelFor = null;
function openWheel(which){
  const w = $('wheel');
  if (wheelFor === which){ w.hidden = true; wheelFor = null; markDp(); return; }
  wheelFor = which;
  const base = CUR() - 2, months = Array.from({length:28}, (_, i) => base + i);
  w._months = months;
  const col = (name, items) => `<div class="wcol" data-col="${name}">${items.map(t => `<div class="wi">${t}</div>`).join('')}</div>`;
  w.innerHTML = col('m', months.map(i => `${MONTHS[i%12]}${Math.floor(i/12) !== TODAY.getFullYear() ? ` <small>${Math.floor(i/12)}</small>` : ''}`))
    + col('d', Array.from({length:31}, (_, i) => `<span class="dn">${i + 1}</span><small class="dw"></small>`)) + '<div class="wband"></div>';
  w.hidden = false; markDp();
  const d = parse(form[which]), mi = mIdx(d.getFullYear(), d.getMonth());
  w.querySelector('[data-col="m"]').scrollTop = Math.max(0, months.indexOf(mi)) * ITEM;
  w.querySelector('[data-col="d"]').scrollTop = (d.getDate() - 1) * ITEM;
  fillDays(mi);
  w.querySelectorAll('.wcol').forEach(c => c.addEventListener('scroll', () => { clearTimeout(c._t); c._t = setTimeout(onWheel, 90); }, {passive:true}));
  requestAnimationFrame(() => w.scrollIntoView({block:'nearest', behavior:'smooth'}));
}
// подписи дней недели под выбранный месяц
function fillDays(mi){
  const y = Math.floor(mi/12), m = mi%12, dim = new Date(y, m + 1, 0).getDate();
  $('wheel').querySelectorAll('[data-col="d"] .wi').forEach((el, i) => {
    const d = i + 1, wd = d <= dim ? new Date(y, m, d).getDay() : -1;
    el.classList.toggle('dis', d > dim); el.classList.toggle('we', wd === 0 || wd === 6);
    el.querySelector('.dw').textContent = d <= dim ? WD_S[wd] : '';
  });
}
function onWheel(){
  if (!wheelFor) return;
  const w = $('wheel'), idx = n => Math.round(w.querySelector(`[data-col="${n}"]`).scrollTop / ITEM);
  const mi = w._months[Math.min(w._months.length - 1, idx('m'))], y = Math.floor(mi/12), m = mi%12;
  fillDays(mi);
  const dim = new Date(y, m + 1, 0).getDate();
  let day = Math.min(31, idx('d') + 1);
  if (day > dim){ day = dim; w.querySelector('[data-col="d"]').scrollTo({top:(dim - 1) * ITEM, behavior:'smooth'}); }
  const k = key(new Date(y, m, day));
  form[wheelFor] = k;
  if (form.to < form.from){ if (wheelFor === 'from') form.to = k; else form.from = k; }
  $('dpFrom').textContent = dLabel(form.from); $('dpTo').textContent = dLabel(form.to);
}
// новые возможности (время, «хочу с вами», напоминания) включаются, когда сервер их поддерживает
const srvNew = () => !ONLINE || !!(meInfo && meInfo.rem);
// время — необязательно: «с» и «до»
function timeRowHTML(){
  if (!srvNew()) return '';
  if (!form.tf) return `<button type="button" class="lnk press" data-act="addTime" style="margin-top:12px">+ Указать время</button>`;
  return `<div class="row2" style="margin-top:4px">
    <div><label class="f">Время с</label><button type="button" class="in dbtn press" data-dp="tf" id="dpTf">${form.tf}</button></div>
    <div><label class="f">до</label><button type="button" class="in dbtn press" data-dp="tt" id="dpTt">${form.tt || '—'}</button></div></div>
    <button type="button" class="lnk press" data-act="noTime" style="margin-top:8px">Без времени</button>`;
}
function openTimeWheel(which){
  const w = $('wheel');
  wheelFor = which;
  const H = Array.from({length:24}, (_, i) => pad(i)), M = Array.from({length:12}, (_, i) => pad(i * 5));
  const col = (name, items) => `<div class="wcol" data-col="${name}">${items.map(t => `<div class="wi">${t}</div>`).join('')}</div>`;
  w.innerHTML = col('h', H) + col('mm', M) + '<div class="wband"></div>';
  w.classList.add('time'); w.hidden = false; markDp();
  const [h, m] = (form[which] || form.tf || '19:00').split(':').map(Number);
  w.querySelector('[data-col="h"]').scrollTop = h * ITEM;
  w.querySelector('[data-col="mm"]').scrollTop = Math.round(m / 5) * ITEM;
  w.querySelectorAll('.wcol').forEach(c => c.addEventListener('scroll', () => { clearTimeout(c._t); c._t = setTimeout(onTimeWheel, 90); }, {passive:true}));
  onTimeWheel();
  requestAnimationFrame(() => w.scrollIntoView({block:'nearest', behavior:'smooth'}));
}
function onTimeWheel(){
  if (wheelFor !== 'tf' && wheelFor !== 'tt') return;
  const w = $('wheel'), idx = n => Math.round(w.querySelector(`[data-col="${n}"]`).scrollTop / ITEM);
  form[wheelFor] = `${pad(Math.min(23, idx('h')))}:${pad(Math.min(11, idx('mm')) * 5)}`;
  if (form.tt && form.tt <= form.tf && form.from === form.to){ if (wheelFor === 'tf') form.tt = ''; }
  $('dpTf').textContent = form.tf; $('dpTt').textContent = form.tt || '—';
}
function markDp(){ [['from','dpFrom'],['to','dpTo'],['tf','dpTf'],['tt','dpTt']].forEach(([n, id]) => $(id) && $(id).classList.toggle('on', wheelFor === n)); }

function visHTML(){
  if (form.visAll) return '<div class="hint" style="margin:0">Дело увидят все, с кем у вас есть связь.</div>';
  const me = ME();
  const fr = PEOPLE.filter(p => p.id !== me && links.friends.includes(p.id));
  if (!fr.length) return '<div class="hint" style="margin:0">Пока не с кем делиться — дело будет видно только вам.</div>';
  return fr.map(p => { const forced = form.people.has(p.id), on = forced || form.vis.has(p.id);
    return `<button type="button" class="chip press" style="${cs(p)}" data-vis="${p.id}" aria-pressed="${on}"${forced ? ' disabled' : ''}><span class="dot"></span>${esc(p.name)}${forced ? ' <small>позван</small>' : ''}</button>`; }).join('')
    + '<div class="hint" style="margin:6px 0 0;width:100%">Остальные не увидят это дело совсем. Позванные видят всегда.</div>';
}
// «попросить» одного человека: например, посидеть с сыном, пока ты на маникюре
function rqHTML(){
  const me = ME(), fr = PEOPLE.filter(p => p.id !== me && links.friends.includes(p.id));
  if (!fr.length) return '<div class="hint" style="margin:0">Попросить можно тех, с кем есть связь.</div>';
  const st = form.src && form.src.req && form.src.req.to === form.rqTo ? reqSt(form.src) : '';
  return fr.map(p => `<button type="button" class="chip press" style="${cs(p)}" data-rqp="${p.id}" aria-pressed="${form.rqTo === p.id}"><span class="dot"></span>${esc(p.name)}${form.rqTo === p.id && st ? ` <small>${st}</small>` : ''}</button>`).join('')
    + (form.rqTo ? `<input class="in" id="fRq" maxlength="60" style="margin-top:8px;width:100%" placeholder="О чём просишь: посидеть с сыном" value="${esc(form.rqText)}">
      <div class="hint" style="margin:6px 0 0;width:100%">${esc(P[form.rqTo].name)} получит просьбу. Если согласится — будет занят в это время.</div>` : '<div class="hint" style="margin:6px 0 0;width:100%">Например, посидеть с ребёнком, пока ты занят(а). Можно одного человека.</div>');
}
function pickHTML(){
  const me = ME();
  const fr = PEOPLE.filter(p => p.id !== me && links.friends.includes(p.id));
  if (!fr.length) return '<div class="hint" style="margin:0">Позвать можно тех, с кем есть связь. Добавьте людей в Настройках → Люди.</div>';
  return fr.map(p => {
    const on = form.people.has(p.id), st = on && form.src ? statusOf(form.src, p.id) : '';
    return `<button type="button" class="chip press" style="${cs(p)}" data-pick="${p.id}" aria-pressed="${on}"><span class="dot"></span>${esc(p.name)}${on ? ` <small>${st || 'позовём'}</small>` : ''}</button>`;
  }).join('');
}
function saveForm(){
  const from = form.from, to = form.to, what = $('fWhat').value.trim(), err = $('fErr');
  if (!what) return err.textContent = 'Напишите, что за дело.';
  if (!from || !to) return err.textContent = 'Укажите обе даты.';
  if (to < from) return err.textContent = 'Дата «по» раньше даты «с».';
  const me = ME(), wasEdit = !!form.id, r = fmtRange(from,to);
  if ($('fRq')) form.rqText = $('fRq').value.trim();
  if (form.rqTo && !form.rqText) return err.textContent = 'Напишите, о чём просите, или снимите выбор человека.';
  const req = form.rqTo && form.rqText ? {to:form.rqTo, text:form.rqText} : null;
  if (form.runs){
    for (const [a, b] of form.runs){
      const rr = fmtRange(a, b);
      commit({op:'put', entry:{id:newId(), what, from:a, to:b, people:[...form.people], vis: form.visAll ? 'all' : [...form.vis], tf: form.tf || '', tt: form.tt || '', noRem: !!form.noRem, req},
        note:`${P[me].name} ${verb(me,'добавил')}: ${what}, ${rr}`, inviteNote:`${P[me].name} зовёт: ${what}, ${rr}`});
    }
    closeSheet(); toast('Добавлено', `${what}: ${form.runs.length} ${plural(form.runs.length,'дело','дела','дел')}`); render(); return;
  }
  const entry = {id: form.id || newId(), what, from, to, people:[...form.people], vis: form.visAll ? 'all' : [...form.vis], tf: form.tf || '', tt: form.tt || '', noRem: !!form.noRem, req};
  const newInv = entry.people.filter(p => !(form.src && (form.src.who.includes(p) || (form.src.inv || {})[p])));
  commit({op:'put', entry, note:`${P[me].name} ${verb(me, wasEdit ? 'изменил' : 'добавил')}: ${what}, ${r}`, inviteNote:`${P[me].name} зовёт: ${what}, ${r}`});
  closeSheet();
  toast(wasEdit ? 'Изменено' : 'Добавлено', newInv.length ? `Позвали: ${joinNames(newInv)}` : `${what}, ${r}`);
  if (!ONLINE && newInv.length) demoReply(entry.id, newInv);
  const d = parse(from);
  if (state.view === 'month') openMonth(mIdx(d.getFullYear(), d.getMonth()), from); else render();
}
function deleteForm(){
  const e = entries.find(x => x.id === form.id);
  commit({op:'del', id:form.id, note: e ? `${P[ME()].name} ${verb(ME(),'удалил')}: ${e.what}, ${fmtRange(e.from,e.to)}` : ''});
  closeSheet(); render(); toast('Удалено', 'Дело убрано из календаря');
}
// в демо приглашённые «отвечают» сами через пару секунд
function demoReply(id, people){
  people.forEach((p, i) => setTimeout(() => {
    const e = entries.find(x => x.id === id); if (!e || !e.inv || e.inv[p] !== 'wait') return;
    const ans = Math.random() < .75 ? 'yes' : 'no';
    entries = applyOp(entries, {op:'rsvp', id, by:p, ans}); store(KEYS.demo, entries); render();
    toast('Ответ на приглашение', `${P[p].name} ${ans === 'yes' ? 'идёт' : 'не идёт'}: ${e.what}`);
  }, 3500 + i * 2500));
}

// чужое дело — только просмотр и ответ
// подробности дела; свайп влево-вправо — соседние дела по времени
let viewId = null;
const viewList = () => entries.slice().sort((a, b) => a.from.localeCompare(b.from) || a.to.localeCompare(b.to) || a.what.localeCompare(b.what));
function openView(e, dir){
  viewId = e.id;
  const me = ME(), by = owner(e), mine = e.who.includes(me), st = e.inv && e.inv[me], own = by === me;
  const people = [by, ...e.who.filter(p => p !== by), ...Object.keys(e.inv || {})].filter((p,i,a) => P[p] && a.indexOf(p) === i);
  const list = viewList(), i = list.findIndex(x => x.id === e.id);
  const days = Math.round((parse(e.to) - parse(e.from)) / 864e5) + 1;
  let btns = '';
  if (own) btns = `<button class="btn press" data-act="editView">Изменить</button>`;
  else if (st === 'wait') btns = `<button class="btn ok press" data-rsvp="${e.id}" data-ans="yes">Иду</button><button class="btn plain press" data-rsvp="${e.id}" data-ans="no">Не иду</button>`;
  else if (st === 'no') btns = `<button class="btn ok press" data-rsvp="${e.id}" data-ans="yes">Передумал${P[me].f ? 'а' : ''} — иду</button>`;
  else if (mine) btns = (e.from !== e.to ? `<button class="btn press" data-act="myDays" data-id="${e.id}">Мои дни: ${e.days && e.days[me] ? daysTxt(e.days[me]) : 'все'}</button>` : '') + `<button class="btn ghost press" data-rsvp="${e.id}" data-ans="no">Не пойду</button>`;
  else if (st === 'ask') btns = `<div class="hint" style="margin-top:14px">Ты попросил${P[me].f ? 'ась' : 'ся'} — ждём, что ответит ${esc(P[by].name)}.</div>`;
  else if (srvNew() && links.friends.includes(by)) btns = `<button class="btn ok press" data-act="ask" data-id="${e.id}">Хочу с вами</button><div class="hint" style="margin-top:8px">${esc(P[by].name)} получит просьбу и решит.</div>`;
  if (e.req && e.req.to === me){
    if (e.req.st === 'wait') btns = `<div class="hint" style="margin-top:14px">${esc(P[by].name)} просит: <b>${esc(e.req.text)}</b></div><button class="btn ok press" data-rqa="${e.id}" data-ans="yes">Помогу</button><button class="btn plain press" data-rqa="${e.id}" data-ans="no">Не могу</button>`;
    else if (e.req.st === 'yes') btns = `<button class="btn ghost press" data-rqa="${e.id}" data-ans="no">Не смогу</button>`;
    else btns = `<button class="btn ok press" data-rqa="${e.id}" data-ans="yes">Передумал${P[me].f ? 'а' : ''} — помогу</button>`;
  }
  const rqRow = e.req && P[e.req.to] ? `<div class="prow" style="${cs(P[e.req.to])}"><span class="dot"></span>${esc(P[e.req.to].name)}<span class="st">просьба: ${esc(e.req.text)} · ${reqSt(e)}</span></div>` : '';
  const visTxt = !own ? '' : Array.isArray(e.vis) ? `${LOCK} видят: ${e.vis.length ? joinNames(e.vis) : 'только вы'}` : 'видят все ваши люди';
  openSheet(`<div class="vnav"><button class="lnk press" data-act="vPrev"${i > 0 ? '' : ' disabled'} aria-label="Предыдущее дело">‹</button>
      <span>${i + 1} из ${list.length}</span><button class="lnk press" data-act="vNext"${i < list.length - 1 ? '' : ' disabled'} aria-label="Следующее дело">›</button></div>
    <div class="vcard${dir ? ' from-' + dir : ''}">
    <h2>${esc(e.what)}</h2>
    <div class="vmeta"><span>${WDF[parse(e.from).getDay()].toLowerCase()}, ${fmtRange(e.from, e.to)}${days > 1 ? ` · ${days} ${plural(days,'день','дня','дней')}` : ''}</span>
      ${e.tf ? `<span>время: ${e.tf}${e.tt ? '–' + e.tt : ''}</span>` : ''}${visTxt ? `<span>${visTxt}</span>` : ''}</div>
    <div class="plist">${people.map(p => `<div class="prow" style="${cs(P[p])}"><span class="dot"></span>${esc(P[p].name)}<span class="st">${statusOf(e,p)}${e.days && e.days[p] ? ' · ' + daysTxt(e.days[p]) : ''}</span></div>`).join('')}${rqRow}</div>
    ${btns || `<div class="hint" style="margin-top:14px">Изменить может только ${esc(P[by].name)}.</div>`}
    <div class="hint" style="margin-top:10px;text-align:center">Листай влево-вправо — соседние дела</div></div>`);
}
function stepView(n){
  const list = viewList(), i = list.findIndex(x => x.id === viewId), e = list[i + n];
  if (e) openView(e, n > 0 ? 'r' : 'l');
}
function rsvp(id, ans){
  const e = entries.find(x => x.id === id); if (!e) return;
  const me = ME(), word = ans === 'yes' ? 'идёт' : 'не идёт';
  commit({op:'rsvp', id, ans, note:`${P[me].name} ${word}: ${e.what}, ${fmtRange(e.from,e.to)}`});
  closeSheet(); render();
  toast(ans === 'yes' ? 'Идёшь' : 'Не идёшь', `${e.what}, ${fmtRange(e.from,e.to)} — ${P[owner(e)].name} узнает`);
}

/* ---------- вход и регистрация ---------- */
let regColor = COLORS[5], regPat = 0, regF = false, loginTab = 'reg';
function openLogin(msg){
  const canReg = !!(inviteCode && inviter);
  if (!canReg) loginTab = 'key';
  const tabs = canReg ? seg('ltab', loginTab, [['reg','Регистрация'],['key','У меня есть ключ']]) : '';
  const body = loginTab === 'reg' ? `
    <label class="f" for="rName">Как вас зовут</label>
    <input class="in" id="rName" maxlength="24" placeholder="Например: Лера">
    <label class="f" for="rNick">Ник — по нему вас найдут</label>
    <div class="nickin"><span>@</span><input class="in" id="rNick" maxlength="20" placeholder="lera" autocomplete="off" autocapitalize="off" spellcheck="false"></div>
    <label class="f">Писать о вас</label>
    ${seg('rf', regF ? 'f' : 'm', [['m','добавил'],['f','добавила']])}
    <label class="f">Ваш цвет</label>
    <div class="colors">${COLORS.map(c => `<button type="button" class="cl press" style="--c:${c}" data-rc="${c}" aria-pressed="${c === regColor}" aria-label="Цвет ${c}"></button>`).join('')}</div>
    <div class="err" id="lErr"></div>
    <button class="btn press" data-act="register">Присоединиться</button>` : `
    <label class="f" for="lKey">Ключ входа</label>
    <input class="in" id="lKey" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Ключ из настроек на другом телефоне">
    <div class="err" id="lErr"></div>
    <button class="btn press" data-act="keyLogin">Войти</button>
    ${canReg ? '' : '<div class="hint" style="margin-top:12px">Новые люди попадают сюда только по приглашению. Попросите ссылку у того, кто уже пользуется.</div>'}`;
  const lead = msg ? esc(msg) : canReg ? `<b>${esc(inviter.name)}</b> зовёт вас в общий календарь: будете видеть, кто когда занят.` : 'Общий календарь для близких: видно, кто когда занят.';
  openSheet(`<h2>Кто когда</h2><div class="hint">${lead}</div>
    ${tabs ? `<div style="margin-top:14px">${tabs}</div>` : ''}${body}`, !auth.token);
}
async function doRegister(){
  const name = $('rName').value.trim(), nick = $('rNick').value.trim().replace(/^@/, '').toLowerCase(), err = $('lErr');
  if (!name) return err.textContent = 'Напишите имя.';
  if (!/^[a-z0-9_]{3,20}$/.test(nick)) return err.textContent = 'Ник: 3–20 латинских букв, цифр или _.';
  err.textContent = 'Отправляю…';
  try {
    const r = await api('POST', '/register', {invite:inviteCode, nick, name, f:regF, color:regColor});
    auth = {token:r.token, me:nick}; store(KEYS.auth, auth);
    inviteCode = null; sheetLocked = false;
    openSheet(`<h2>Готово, ${esc(name)}!</h2>
      <div class="hint">Вы и ${esc(inviter.name)} уже видите календари друг друга. Осталось пара шагов:</div>
      <ol class="todo">
        <li><b>Сохрани ключ входа</b><div class="keybox" id="keyBox">${esc(auth.token)}</div><button class="lnk press" data-act="copyKey">Скопировать</button></li>
        <li><b>Установи на экран</b><span>${isIOS ? 'Поделиться → «На экран „Домой“», потом открой с иконки и войди ключом' : 'Chrome → ⋮ → «Установить приложение»'}</span>${!isIOS && installEvt ? '<button class="lnk press" data-act="install">Установить</button>' : ''}</li>
        <li><b>Включи уведомления</b><span>чтобы видеть, кто что добавил</span><button class="lnk press" data-act="push">Включить</button></li>
        <li><b>Как это работает</b><span>две минуты</span><button class="lnk press" data-act="guide">Открыть</button></li>
      </ol>
      <button class="btn press" data-act="closeSheet">Открыть календарь</button>`);
    sync();
  } catch(e){ err.textContent = e.user || 'Нет связи с сервером. Попробуйте позже.'; }
}
// открыли ссылку-приглашение
async function handleInvite(){
  if (!inviteCode || !ONLINE) return;
  try { const r = await api('GET', '/invite/' + inviteCode); inviter = r.by;
    // предлагаем цвет, которого ещё нет у пригласившего и его людей
    if (!auth.token && Array.isArray(r.taken)){ const t = new Set(r.taken.map(c => String(c).toLowerCase())); const free = COLORS.find(c => !t.has(c.toLowerCase())); if (free) regColor = free; } }
  catch(e){ inviteCode = null; if (!auth.token) openLogin('Приглашение устарело или уже использовано. Попросите новую ссылку.'); else toast('Приглашение', 'Ссылка устарела или уже использована'); return; }
  if (!auth.token){ loginTab = 'reg'; openLogin(); return; }
  if (inviter.id === ME()){ inviteCode = null; toast('Это ваша ссылка', 'Отправьте её тому, кого зовёте'); return; }
  openSheet(`<h2>Приглашение</h2><div class="hint"><b>${esc(inviter.name)}</b> (@${inviter.id}) зовёт вас — будете видеть календари друг друга.</div>
    <button class="btn ok press" data-act="acceptInvite">Принять</button><button class="btn plain press" data-act="closeSheet">Не сейчас</button>`);
}
async function acceptInvite(){
  try { const r = await api('POST', '/invites/' + inviteCode); closeSheet(); toast('Готово', `${r.by.name} теперь в ваших связях`); }
  catch(e){ toast('Не получилось', e.user || 'Нет связи с сервером'); }
  inviteCode = null; sync();
}
async function makeInvite(){
  if (!ONLINE) return toast('Демо-режим', 'Приглашения работают после входа');
  try {
    const {code} = await api('POST', '/invites');
    const url = location.origin + location.pathname.replace(/index\.html$/, '') + '#i=' + code;
    const me = meInfo ? meInfo.name : '';
    window.__inviteText = `${me} зовёт в общий календарь «Кто когда» — видно, кто когда занят.

1. Открой ссылку: iPhone — в Safari, Android — в Chrome
2. Придумай ник и нажми «Присоединиться»
3. Скопируй ключ входа и сохрани
4. Установи приложение на экран — подсказка будет внутри
5. Включи уведомления в Настройках
6. Загляни в «Как это работает»

Ссылка одноразовая, на 7 дней:
${url}`;
    window.__inviteUrl = url;
    openSheet(`<h2>Приглашение</h2><div class="hint">Отправится сообщением с короткой инструкцией. Ссылка одноразовая, работает 7 дней.</div>
      <label class="f">Сообщение</label><div class="keybox msgbox" id="keyBox">${esc(window.__inviteText)}</div>
      ${navigator.share ? '<button class="btn press" data-act="shareInvite">Отправить</button>' : ''}
      <button class="btn plain press" data-act="copyKey">Скопировать</button>`);
  } catch(e){ toast('Не получилось', e.user || 'Нет связи с сервером'); }
}
async function doKeyLogin(){
  const k = $('lKey').value.trim(), err = $('lErr');
  if (!/^[A-Za-z0-9_-]{16,64}$/.test(k)) return err.textContent = 'Ключ выглядит не так. Скопируйте его целиком.';
  err.textContent = 'Проверяю…';
  const old = auth; auth = {token:k};
  try { await api('GET', '/state'); }
  catch(e){ auth = old; err.textContent = e.auth ? 'Ключ не подошёл.' : e.blocked ? 'Доступ закрыт.' : 'Нет связи с сервером.'; return; }
  store(KEYS.auth, auth); pending = []; store(KEYS.pending, pending);
  sheetLocked = false; closeSheet();
  if (pushOn) subscribePush(false);
  await sync(); render();
}
function openWaiting(fresh){
  openSheet(`<h2>Заявка отправлена</h2>
    <div class="hint">${meInfo ? esc(meInfo.name) + ' · @' + meInfo.id : ''}. Как только разработчик одобрит, календарь откроется сам.</div>
    ${fresh ? keyBlock('Сохраните ключ — с ним можно войти на другом телефоне. Он же есть в настройках.') : ''}
    <button class="btn plain press" data-act="recheck">Проверить ещё раз</button>
    <button class="btn ghost press" data-act="logout">Выйти</button>`, true);
}
const keyBlock = hint => `<label class="f">Ключ входа</label><div class="keybox" id="keyBox">${esc(auth.token || '')}</div>
  <button class="btn plain press" data-act="copyKey">Скопировать ключ</button><div class="hint">${hint}</div>`;
function openProfile(){
  regColor = meInfo.color; regF = meInfo.f; regPat = meInfo.pat || 0;
  openSheet(`<h2>Профиль</h2><div class="hint">@${meInfo.id}</div>
    <label class="f" for="rName">Имя</label><input class="in" id="rName" maxlength="24" value="${esc(meInfo.name)}">
    <label class="f">Писать о вас</label>${seg('rf', regF ? 'f' : 'm', [['m','добавил'],['f','добавила']])}
    <label class="f">Цвет</label>
    <div class="colors">${COLORS.map(c => `<button type="button" class="cl press" style="--c:${c}" data-rc="${c}" aria-pressed="${c === regColor}" aria-label="Цвет ${c}"></button>`).join('')}</div>
    <label class="f">Узор</label>
    <div class="colors" id="patBox" style="--c:${regColor}">${HATCH.map((x, k) => `<button type="button" class="cl pat press" style="--c:inherit${hstyle(k)}" data-rp="${k}" aria-pressed="${k === regPat}" aria-label="${k ? 'Узор ' + k : 'Без узора'}"></button>`).join('')}</div>
    <div class="hint">Если у кого-то в вашей группе такой же цвет, узор поставится сам — но свой можно выбрать здесь.</div>
    <div class="err" id="lErr"></div>
    <button class="btn press" data-act="saveProfile">Сохранить</button>
    <button class="btn ghost press" data-act="logout">Выйти на этом телефоне</button>`);
}
async function saveProfile(){
  const name = $('rName').value.trim();
  if (!name) return $('lErr').textContent = 'Напишите имя.';
  try { await api('PATCH', '/me', {name, color:regColor, f:regF, pat:regPat}); closeSheet(); sync(); toast('Профиль', 'Сохранено'); }
  catch(e){ $('lErr').textContent = e.user || 'Нет связи с сервером.'; }
}
async function linkAction(id, la){
  if (!ONLINE) return toast('Демо-режим', 'Связи работают после входа');
  try {
    if (la === 'accept' || la === 'knock') {
      const r = await api('POST', '/links/' + encodeURIComponent(id));
      toast(r.state === 'friends' ? 'Готово' : 'Запрос отправлен', r.state === 'friends' ? 'Теперь вы видите календари друг друга' : `@${id} увидит его и ответит`);
    } else {
      await api('DELETE', '/links/' + encodeURIComponent(id));
      toast(la === 'remove' ? 'Связь удалена' : 'Готово', la === 'remove' ? 'Вы больше не видите календари друг друга' : 'Запрос убран');
    }
  } catch(e){ toast('Не получилось', e.user || 'Нет связи с сервером'); }
  sync();
}
async function adminAction(id, aa){
  try {
    const r = await api('POST', '/admin/users/' + encodeURIComponent(id), {action:aa, link: aa === 'approve'});
    if (aa === 'newkey' && r.token){
      openSheet(`<h2>Новый ключ</h2><div class="hint">Для @${esc(id)}. Старый ключ больше не работает — перешлите этот человеку.</div>
        <label class="f">Ключ входа</label><div class="keybox" id="keyBox">${esc(r.token)}</div><button class="btn plain press" data-act="copyKey">Скопировать</button>`);
    } else toast('Готово', {approve:'Заявка одобрена', reject:'Заявка отклонена', block:'Заблокирован', unblock:'Доступ возвращён'}[aa] || 'Сделано');
  } catch(e){ toast('Не получилось', e.user || 'Нет связи с сервером'); }
  sync();
}
function copyKey(){
  const box = $('keyBox'); if (!box) return;
  const t = box.textContent;
  const done = () => toast('Готово', 'Скопировано');
  const fallback = () => { const r = document.createRange(); r.selectNodeContents(box); const s = getSelection(); s.removeAllRanges(); s.addRange(r); toast('Выделено', 'Скопируйте вручную'); };
  try { navigator.clipboard.writeText(t).then(done, fallback); } catch(_){ fallback(); }
}
function logout(){
  unsubscribePush(true).finally(() => {
    auth = {}; store(KEYS.auth, auth); store(KEYS.cache, null); pending = []; store(KEYS.pending, pending);
    S = null; meInfo = null; server = []; entries = []; users = []; links = {friends:[], incoming:[], outgoing:[]}; setPeople([], []);
    waitingApproval = false; sheetLocked = false; closeSheet(); render(); openLogin();
  });
}

/* ---------- пуш-уведомления ---------- */
const b64ToU8 = b => { const s = (b + '='.repeat((4 - b.length % 4) % 4)).replace(/-/g,'+').replace(/_/g,'/'); return Uint8Array.from(atob(s), c => c.charCodeAt(0)); };
// узнаём, включены ли пуши, уже после первой отрисовки — поэтому перерисовываем экран, где стоит переключатель
async function refreshPushState(){
  const was = pushOn; let sub = null;
  try { const reg = await navigator.serviceWorker.ready; sub = await reg.pushManager.getSubscription(); pushOn = !!sub && Notification.permission === 'granted'; }
  catch(e){ pushOn = false; }
  // Android иногда сам сбрасывает подписку (обновление, чистка памяти). Если человек пуши включал и разрешение есть —
  // тихо подписываемся заново, спрашивать не нужно
  if (!pushOn && !sub && auth.token && load('kk-push-want', 0) && 'Notification' in window && Notification.permission === 'granted'){ subscribePush(false); return; }
  if (pushOn){ store('kk-push-want', 1); if (auth.token) api('POST', '/subscribe', {sub:sub.toJSON()}).catch(() => {}); }   // освежаем подписку на сервере
  if (pushOn !== was && (state.view === 'set' || state.view === 'list')) render();
}
async function subscribePush(ask){
  if (!('serviceWorker' in navigator) || !('PushManager' in window) || !('Notification' in window))
    return toast('Уведомления', isIOS && !standalone ? 'Сначала добавьте приложение на экран «Домой»' : 'Этот браузер не поддерживает уведомления');
  try {
    if (ask && (await Notification.requestPermission()) !== 'granted') return toast('Уведомления', 'Разрешение не дано — включите в настройках браузера');
    const reg = await navigator.serviceWorker.ready;
    let sub = await reg.pushManager.getSubscription();
    if (!sub){
      const vapid = CONFIG.VAPID_PUBLIC || (S && S.vapid);
      if (!vapid) return toast('Уведомления', 'На сервере не заданы VAPID-ключи');
      sub = await reg.pushManager.subscribe({userVisibleOnly:true, applicationServerKey:b64ToU8(vapid)});
    }
    await api('POST', '/subscribe', {sub:sub.toJSON()});
    store('kk-push-want', 1); pushOn = true; render();
    if (ask) toast('Уведомления', 'Включены');
  } catch(e){ if (ask) toast('Уведомления', 'Не получилось включить, попробуйте позже'); }
}
async function unsubscribePush(quiet){
  try {
    const reg = 'serviceWorker' in navigator && await navigator.serviceWorker.getRegistration();
    const sub = reg && reg.pushManager && await reg.pushManager.getSubscription();
    if (sub){ await api('POST', '/unsubscribe', {endpoint:sub.endpoint}).catch(() => {}); await sub.unsubscribe(); }
  } catch(e){}
  pushOn = false; if (!quiet){ store('kk-push-want', 0); render(); toast('Уведомления', 'Выключены'); }
}

let tt;
function toast(t1,t2){
  $('toastT1').textContent = t1; $('toastT2').textContent = t2;
  $('toast').classList.add('show'); clearTimeout(tt); tt = setTimeout(() => $('toast').classList.remove('show'), 3800);
}

/* ---------- события ---------- */
document.addEventListener('click', ev => {
  const t = ev.target.closest('button'); if (!t) return;
  const d = t.dataset;
  if (d.theme){ themeName = d.theme; store(KEYS.theme, themeName); applyTheme(); render(); return; }
  if (d.skin){ skinName = d.skin; store(KEYS.skin, skinName); applySkin(); render(); return; }
  if (d.bright){ bright = d.bright; store('kk-bright', bright); applyBright(); render(); return; }
  if (d.person){ state.hidden.has(d.person) ? state.hidden.delete(d.person) : state.hidden.add(d.person); store('kk-hidden', [...state.hidden]); render(); return; }
  if (d.pick){ form.people.has(d.pick) ? form.people.delete(d.pick) : form.people.add(d.pick); $('pick').innerHTML = pickHTML(); $('visPick').innerHTML = visHTML(); return; }
  if (d.dp){
    if (wheelFor === d.dp){ $('wheel').hidden = true; wheelFor = null; markDp(); return; }
    $('wheel').classList.remove('time');
    if (d.dp === 'tf' || d.dp === 'tt'){ openTimeWheel(d.dp); return; }
    wheelFor = null; openWheel(d.dp); return; }
  if (d.fvis){ form.visAll = d.fvis === 'all'; t.parentNode.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', b === t)); $('visPick').innerHTML = visHTML(); return; }
  if (d.vis){ form.vis.has(d.vis) ? form.vis.delete(d.vis) : form.vis.add(d.vis); t.setAttribute('aria-pressed', form.vis.has(d.vis)); return; }
  if (d.ltab){ loginTab = d.ltab; openLogin(); return; }
  if (d.rf){ regF = d.rf === 'f'; t.parentNode.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', b === t)); return; }
  if (d.rc){ regColor = d.rc; document.querySelectorAll('[data-rc]').forEach(b => b.setAttribute('aria-pressed', b.dataset.rc === regColor)); const pb = document.getElementById('patBox'); if (pb) pb.style.setProperty('--c', regColor); return; }
  if (d.rp != null){ regPat = +d.rp; document.querySelectorAll('[data-rp]').forEach(b => b.setAttribute('aria-pressed', +b.dataset.rp === regPat)); return; }
  if (d.link){ linkAction(d.link, d.la); return; }
  if (d.sugg){ $('kSugg').hidden = true; $('kNick').value = ''; linkAction(d.sugg, 'knock'); return; }
  if (d.adm){ if (d.aa === 'reject' && t.dataset.sure !== '1'){ t.dataset.sure = '1'; t.textContent = 'Точно?'; return; } adminAction(d.adm, d.aa); return; }
  if (d.rsvp){ rsvp(d.rsvp, d.ans); return; }
  if (d.rqa){ const e = entries.find(x => x.id === d.rqa); if (!e) return; commit({op:'req', id:d.rqa, ans:d.ans}); closeSheet(); render();
    toast(d.ans === 'yes' ? 'Поможешь' : 'Отказ отправлен', `${e.req.text}, ${fmtRange(e.from, e.to)} — ${P[owner(e)].name} узнает`); return; }
  if (d.rqp){ if ($('fRq')) form.rqText = $('fRq').value; form.rqTo = form.rqTo === d.rqp ? '' : d.rqp; $('rqPick').innerHTML = rqHTML(); if (form.rqTo && $('fRq')) $('fRq').focus(); return; }
  if (d.answ){ const e = entries.find(x => x.id === d.answ); commit({op:'answer', id:d.answ, who:d.who, ans:d.ans}); render();
    toast(d.ans === 'yes' ? 'Взяли' : 'Отказали', `${P[d.who] ? P[d.who].name : ''}${e ? ' · ' + e.what : ''}`); return; }
  if (d.day){ if (Date.now() - lpAt < 600) return; if (picking){ togglePick(d.day); return; } openDay(d.day); return; }
  if (d.date){ const dt = parse(d.date); openMonth(mIdx(dt.getFullYear(), dt.getMonth()), d.date); return; }
  if (d.open){ const e = entries.find(x => x.id === d.open); if (!e) return; openView(e); return; }
  if (d.view && picking) stopPick();
  if (d.view){ goView(d.view); return; }
  if (d.dkind){ if (dform){ dform.kind = d.dkind; document.querySelectorAll('[data-dkind]').forEach(b => b.setAttribute('aria-pressed', b.dataset.dkind === d.dkind)); } return; }
  if (d.dedit){ openDateForm(d.dedit); return; }
  if (d.dshare){ const x = DATES.find(z => z.id === d.dshare); if (x) ONLINE ? openShareDate(x) : shareDate(x); return; }
  if (d.mdk){ mdSel.has(d.mdk) ? mdSel.delete(d.mdk) : mdSel.add(d.mdk); t.setAttribute('aria-pressed', mdSel.has(d.mdk)); return; }
  if (d.shp){ shareSel.has(d.shp) ? shareSel.delete(d.shp) : shareSel.add(d.shp); t.setAttribute('aria-pressed', shareSel.has(d.shp)); return; }
  if (d.hgo){ closeSheet(); const g = parse(d.hgo); openMonth(mIdx(g.getFullYear(), g.getMonth()), d.hgo); setTimeout(() => openDay(d.hgo), 350); return; }
  if (d.ym){ const [yy,mm] = d.ym.split('-').map(Number); openMonth(mIdx(yy,mm)); return; }
  if (d.goto){ const g = parse(d.goto); openMonth(mIdx(g.getFullYear(), g.getMonth()), d.goto); return; }
  switch (d.act){
    case 'prev': case 'next': {
      const n = d.act === 'next' ? 1 : -1;
      if (state.view === 'month') goMonth(mIdx(state.y, state.m) + n, true);
      break;
    }
    case 'more': state.extra++; renderMonth(); markPicked(); break;
    case 'pickCancel': stopPick(); break;
    case 'vPrev': stepView(-1); break;
    case 'vNext': stepView(1); break;
    case 'editView': { const e = entries.find(x => x.id === viewId); if (e) openForm(e); break; }
    case 'ask': { const e = entries.find(x => x.id === d.id); if (!e) break; commit({op:'ask', id:d.id}); closeSheet(); render();
      toast('Просьба отправлена', `${P[owner(e)].name} решит: ${e.what}`); break; }
    case 'noRem': form.noRem = !form.noRem; t.setAttribute('aria-pressed', !form.noRem); t.textContent = form.noRem ? 'Не напоминать' : 'Напомнить мне'; break;
    case 'remOn': { const r = JSON.parse(JSON.stringify(meInfo.rem)); r[d.k].on = !r[d.k].on; saveRem(r); break; }
    case 'addTime': form.tf = '19:00'; form.tt = ''; $('timeRow').innerHTML = timeRowHTML(); openTimeWheel('tf'); break;
    case 'noTime': form.tf = form.tt = ''; wheelFor = null; $('wheel').hidden = true; $('timeRow').innerHTML = timeRowHTML(); break;
    case 'pickSave': { if (!picking || !picking.size){ toast('Выбор дней', 'Сначала отметь дни'); break; } const runs = toRuns(picking); stopPick(); openForm(null, null, runs); break; }
    case 'today':
      if (state.view === 'month'){ state.sel = TODAY_K; goMonth(CUR(), true); markSel(); }
      else { yearStart(); render(); }
      break;
    case 'back': if (state.view === 'month'){ state.view = 'year'; render(); window.scrollTo(0,0); } break;
    case 'add': openForm(null, $('sheet').classList.contains('open') || state.view === 'month' ? state.sel : null); break;
    case 'save': saveForm(); break;
    case 'delete': deleteForm(); break;
    case 'reset': entries = demo(); store(KEYS.demo, entries); render(); toast('Готово', 'Тестовые данные восстановлены'); break;
    case 'howto': openHowto(); break;
    case 'skinNext': { const i = SKINS.findIndex(x => x[0] === skinName); skinName = SKINS[(i+1) % SKINS.length][0]; store(KEYS.skin, skinName); applySkin(); render(); break; }
    case 'install': doInstall(); break;
    case 'instHide': store(KEYS.inst, 1); render(); break;
    case 'register': doRegister(); break;
    case 'invite': makeInvite(); break;
    case 'guide': sheetLocked = false; closeSheet(); store('kk-guide', 1); guideOpen = true; state.view = 'set'; render(); scrollTo(0, 0); break;
    case 'shareInvite': navigator.share({title:'Кто когда', text:window.__inviteText}).catch(() => {}); break;
    case 'acceptInvite': acceptInvite(); break;
    case 'closeSheet': sheetLocked = false; closeSheet(); render(); break;
    case 'keyLogin': doKeyLogin(); break;
    case 'recheck': sync(); break;
    case 'logout': logout(); break;
    case 'profile': openProfile(); break;
    case 'saveProfile': saveProfile(); break;
    case 'copyKey': copyKey(); break;
    case 'showKey': openSheet(`<h2>Ключ входа</h2>${keyBlock('На другом телефоне: «У меня есть ключ» и вставить. Никому не пересылайте — с ним входят от вашего имени.')}`); break;
    case 'knock': { const v = ($('kNick').value || '').trim().replace(/^@/, '').toLowerCase();
      if (!/^[a-z0-9_]{3,20}$/.test(v)) { toast('Ник', 'Введите @ник целиком: латиница, цифры, _'); break; }
      linkAction(v, 'knock'); break; }
    case 'pushAll': api('PATCH', '/me', {pushAll: !meInfo.pushAll}).then(sync).catch(() => toast('Не получилось', 'Нет связи с сервером')); break;
    case 'push': pushOn ? unsubscribePush() : subscribePush(true); break;
    case 'news': openNews(); break;
    case 'myDays': openMyDays(t.dataset.id); break;
    case 'myDaysSave': { if (!mdSel.size){ toast('Мои дни', 'Отметь хотя бы один день или нажми «Не пойду»'); break; }
      const e = entries.find(x => x.id === mdId); const n = Math.round((parse(e.to) - parse(e.from)) / 864e5) + 1;
      const days = mdSel.size === n ? [] : [...mdSel].sort();
      commit({op:'days', id:mdId, days}); closeSheet(); render(); toast('Сохранено', days.length ? 'Ты будешь: ' + daysTxt(days) : 'Ты будешь все дни'); break; }
    case 'dateNew': openDateForm(); break;
    case 'dShare': dform.share = !dform.share; t.classList.toggle('on', dform.share); t.setAttribute('aria-checked', dform.share); break;
    case 'dateSave': { if (!readDateForm()) break; const list = myDates().filter(x => x.id !== dform.id).concat([dform]);
      saveDates(list).then(ok => { if (ok){ closeSheet(); render(); toast('Сохранено', `${dIcon(dform)} ${dform.name}`); } }); break; }
    case 'dateDel': saveDates(myDates().filter(x => x.id !== dform.id)).then(ok => { if (ok){ closeSheet(); render(); toast('Удалено', dform.name); } }); break;
    case 'dateShare': if (readDateForm()) ONLINE ? openShareDate({...dform}) : shareDate(dform); break;
    case 'shareOut': if (shareD) shareDate(shareD); break;
    case 'shareSend': { if (!shareSel.size){ toast('Поделиться', 'Выбери, кому'); break; }
      const {by, ...date} = shareD;
      api('POST', '/dates/share', {to:[...shareSel], date}).then(r => { closeSheet(); toast('Отправлено', `${shareD.name} — ${joinNames([...shareSel])}`); })
        .catch(e => toast('Поделиться', e.status === 404 ? 'Обновите функцию на сервере' : 'Не получилось, попробуйте позже')); break; }
    case 'offerYes': case 'offerNo': { const id = t.dataset.oid;
      api('POST', '/dates/offer/' + id, {ans: d.act === 'offerYes' ? 'yes' : 'no'}).then(r => {
        OFFERS = r.offers || []; DATES = [...(r.dates || []).map(x => ({...x, by: ME()})), ...DATES.filter(x => x.by && x.by !== ME())];
        render(); if (d.act === 'offerYes') toast('Добавлено', 'Дата в твоём календаре, напомню заранее'); }).catch(() => toast('Даты', 'Нет связи')); break; }
    case 'hols': openHolidays(d.y ? +d.y : 0); break;
    case 'newsOk': markSeen(); closeSheet(); render(); break;
    case 'pushTest': api('POST', '/pushtest').then(r => toast('Проверка', r.devices ? `Пуш отправлен (устройств: ${r.devices}). Не пришёл за минуту — выключи и включи уведомления.` : 'Сервер не знает этот телефон — выключи и включи уведомления'))
      .catch(e => toast('Проверка', e.status === 404 ? 'Обновите функцию на сервере' : 'Нет связи с сервером')); break;
  }
});
// лёгкая вибрация на нажатие (Android; iPhone из браузера не умеет)
document.addEventListener('toggle', e => { const k = e.target.dataset && e.target.dataset.blk; if (k){ e.target.open ? openBlk.add(k) : openBlk.delete(k); store('kk-blk', [...openBlk]); return; } if (e.target.id === 'guideBox'){ guideOpen = e.target.open; if (guideOpen) store('kk-guide', 1); } }, true);
// подсказки при вводе ника в «Постучаться»
let suggT = null, suggQ = '';
document.addEventListener('input', e => {
  if (e.target.id !== 'kNick') return;
  const q = e.target.value.trim().replace(/^@/, '').toLowerCase();
  clearTimeout(suggT);
  if (q.length < 2 || !ONLINE){ $('kSugg').hidden = true; return; }
  suggT = setTimeout(async () => {
    suggQ = q;
    let list = [];
    try { list = ((await api('GET', '/search/' + encodeURIComponent(q))) || {}).people || []; } catch(_){ return; }
    if (suggQ !== q || !$('kSugg')) return;
    const box = $('kSugg');
    box.innerHTML = list.length ? list.map(p => {
      const st = links.friends.includes(p.id) ? 'уже в людях' : links.outgoing.includes(p.id) ? 'ждём ответа' : links.incoming.includes(p.id) ? 'принять' : '';
      return `<button class="srow press" data-sugg="${esc(p.id)}"${links.friends.includes(p.id) || links.outgoing.includes(p.id) ? ' disabled' : ''} style="--c:${/^#[0-9A-Fa-f]{6}$/.test(p.color) ? p.color : '#8E8E93'}">
        <span class="dot"></span><span class="sn"><b>${esc(p.name)}</b><small>@${esc(p.id)}</small></span><span class="sst">${st || 'Постучаться'}</span></button>`;
    }).join('') : `<div class="v" style="padding:10px 2px">Никого не нашли. Можно отправить ссылку-приглашение.</div>`;
    box.hidden = false;
  }, 250);
});
document.addEventListener('change', e => {
  const t = e.target;
  if (t.dataset && t.dataset.remt){ const r = JSON.parse(JSON.stringify(meInfo.rem)); r[t.dataset.remt].t = t.value; saveRem(r); return; }
  if (t.dataset && t.dataset.remb){ const r = JSON.parse(JSON.stringify(meInfo.rem)); r.before.min = +t.value; saveRem(r); return; } if (e.target.id === 'admLink') store('kk-admlink', e.target.checked); });
document.addEventListener('pointerdown', e => { if (e.target.closest('button') && navigator.vibrate) try { navigator.vibrate(50); } catch(_){} }, {passive:true});

addEventListener('scroll', onFeedScroll, {passive:true});

/* ---------- запуск ---------- */
if (!ONLINE){ const b = document.createElement('button'); b.id = 'skinBtn'; b.className = 'skinBtn press'; b.dataset.act = 'skinNext'; document.body.appendChild(b); }
applySkin(); applyBright();
if ('serviceWorker' in navigator && location.protocol === 'https:' && !/claude/.test(location.host)){
  navigator.serviceWorker.register('sw.js').then(() => ONLINE && refreshPushState()).catch(() => {});
  // приложение открывается из кэша мгновенно; новая версия скачивается в фоне.
  // Когда она готова — перезапускаемся при следующем возвращении в приложение (если не открыта шторка)
  { const had = !!navigator.serviceWorker.controller; let ready = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => { if (had){ ready = true; updReady = true; if (!syncing) setSync(''); } });
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState !== 'visible') return;
      navigator.serviceWorker.getRegistration().then(r => r && r.update()).catch(() => {});
      if (ready && !document.body.classList.contains('sheet-open')) location.reload();
    }); }
}
$('sync').addEventListener('click', () => { if (updReady) location.reload(); });
render();
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState !== 'visible') return;
  if (ONLINE && 'serviceWorker' in navigator) refreshPushState();
  const was = TODAY_K; setToday(); if (was !== TODAY_K) render();
  if (ONLINE) sync();
});
if (ONLINE){
  if (inviteCode) handleInvite().then(() => auth.token && sync());
  else if (!auth.token) openLogin();
  else sync();
  setInterval(() => { if (document.visibilityState === 'visible') sync(); }, 30000);
  addEventListener('online', sync);
} else {
  setTimeout(() => toast('Демо-режим', `Вы — ${P[ME()].name}. Лера зовёт вас в театр — ответьте сверху`), 1200);
}
