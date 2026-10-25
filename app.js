/* ================= НАСТРОЙКИ ================= */
const CONFIG = {
  // Адрес API Gateway из Яндекс Cloud, напр. 'https://d5dxxxxxxxx.apigw.yandexcloud.net'
  // Пусто — демо-режим: данные хранятся только на этом устройстве, вы — DEMO_ME.
  API_URL: '',
  // Публичный VAPID-ключ. Можно оставить пустым — приложение возьмёт его с сервера.
  VAPID_PUBLIC: '',
  DEMO_ME: 'ivan'
};
// f:true — для «добавила/изменила», иначе «добавил/изменил»
const PEOPLE = [
  {id:'mama',   name:'Мама', f:true,  color:'#FF375F'},
  {id:'papa',   name:'Папа', f:false, color:'#0A84FF'},
  {id:'ivan',   name:'Иван', f:false, color:'#30B05A'},
  {id:'lera',   name:'Лера', f:true,  color:'#BF5AF2'},
  {id:'zhenya', name:'Женя', f:true,  color:'#FF9F0A'}
];
/* ============================================ */

const ONLINE = !!CONFIG.API_URL;
const P = Object.fromEntries(PEOPLE.map(p => [p.id, p]));
const verb = (id, base) => base + (P[id] && P[id].f ? 'а' : '');
const MONTHS = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
const MONTHS_G = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];
const WDF = ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'];
const KEYS = {inst:'kk-inst', auth:'kk-auth', cache:'kk-cache', pending:'kk-pending', demo:'kk-demo2', style:'kk-style', theme:'kk-theme'};

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
const known = e => e && Array.isArray(e.who) && e.who.every(w => P[w]) && P[owner(e)];
function mergePut(prev, req, by){
  const people = [...new Set((req.people || []).filter(p => p !== by && P[p]))];
  const who = [by], inv = {};
  for (const p of people){
    if (prev && prev.who.includes(p)) who.push(p);
    else inv[p] = (prev && prev.inv && prev.inv[p]) || 'wait';
  }
  return {id:req.id, by, what:req.what, from:req.from, to:req.to, who, inv, ts:Date.now()};
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

let auth = load(KEYS.auth, {});
const ME = () => ONLINE ? ((auth.me && P[auth.me]) ? auth.me : PEOPLE[0].id) : CONFIG.DEMO_ME;
let server = ONLINE ? load(KEYS.cache, []) : [];
let pending = ONLINE ? load(KEYS.pending, []) : [];
let entries;
if (ONLINE) entries = applyPending(server);
else { entries = load(KEYS.demo, null); if (!Array.isArray(entries)) entries = demo(); entries = entries.filter(known); }

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
    headers: {'Content-Type':'application/json', 'X-Family-Key': auth.key || ''},
    body: body ? JSON.stringify(body) : undefined
  });
  if (r.status === 401){ const e = new Error('auth'); e.auth = true; throw e; }
  if (r.status === 403 || r.status === 404) return null; // чужое/удалённое дело — операцию просто пропускаем
  if (!r.ok) throw new Error('HTTP ' + r.status);
  return r.json();
}
let syncing = false, again = false, firstSync = true;
function setSync(t){ $('sync').textContent = t; $('sync').hidden = !t; }
async function sync(){
  if (!ONLINE || !auth.key) return;
  if (syncing){ again = true; return; }
  syncing = true;
  try {
    while (pending.length){
      const op = pending[0], b = {by:op.by, note:op.note, inviteNote:op.inviteNote};
      if (op.op === 'put') await api('PUT', '/entries/' + op.entry.id, {...b, entry:op.entry});
      else if (op.op === 'del') await api('DELETE', '/entries/' + op.id, b);
      else await api('POST', `/entries/${op.id}/rsvp`, {...b, ans:op.ans});
      pending.shift(); store(KEYS.pending, pending);
    }
    const r = await api('GET', '/entries');
    const prev = new Map(server.map(e => [e.id, e]));
    server = (r && r.entries) || []; store(KEYS.cache, server);
    entries = applyPending(server);
    if (!firstSync || prev.size) announce(prev);
    firstSync = false;
    setSync('');
    render();
  } catch(e){
    if (e.auth){ auth.key = ''; store(KEYS.auth, auth); openLogin('Код семьи не подошёл — введите снова.'); }
    else setSync(pending.length ? `Не отправлено: ${pending.length}` : 'Офлайн');
  } finally {
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
                view:'four', visible:new Set(PEOPLE.map(p=>p.id)), extra:0 };
const MULTI = {four:4, year:12};
const MULTI_T = {four:'4 месяца', year:'Год'};
const isMulti = v => v in MULTI;

let styleName = load(KEYS.style, 's1');
if (!['s1','s2','s3'].includes(styleName)) styleName = 's1';
function applyStyle(){ document.body.classList.remove('s1','s2','s3'); document.body.classList.add(styleName); }
applyStyle();

let themeName = load(KEYS.theme, 'auto');
function applyTheme(){
  const root = document.documentElement;
  if (themeName === 'auto') root.removeAttribute('data-theme'); else root.setAttribute('data-theme', themeName);
  const dark = themeName === 'dark' || (themeName === 'auto' && matchMedia('(prefers-color-scheme: dark)').matches);
  document.querySelectorAll('meta[name=theme-color]').forEach(m => m.content = dark ? '#000000' : '#F2F2F7');
}
applyTheme();
matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyTheme);

const vis = () => PEOPLE.filter(p => state.visible.has(p.id));
function busyMap(){
  const map = {};
  for (const e of entries){
    for (let d = parse(e.from); key(d) <= e.to; d = addDays(d,1)){
      const k = key(d); map[k] = map[k] || {};
      for (const w of e.who) if (!map[k][w]) map[k][w] = e;
    }
  }
  return map;
}
const bands = list => list.length ? `<span class="bands">${list.map(p => `<i style="--c:${p.color}"></i>`).join('')}</span>` : '';
const fmtDay = s => { const d = parse(s); return `${d.getDate()} ${MONTHS_G[d.getMonth()]}`; };
function fmtRange(a,b){
  if (a === b) return fmtDay(a);
  const A = parse(a), B = parse(b);
  if (A.getMonth()===B.getMonth() && A.getFullYear()===B.getFullYear()) return `${A.getDate()}–${B.getDate()} ${MONTHS_G[B.getMonth()]}`;
  return `${fmtDay(a)} – ${fmtDay(b)}`;
}
function joinNames(ids){
  const n = ids.filter(i => P[i]).map(i => P[i].name);
  return n.length < 2 ? (n[0]||'') : n.slice(0,-1).join(', ') + ' и ' + n[n.length-1];
}
const waiting = e => Object.keys(e.inv || {}).filter(p => e.inv[p] === 'wait' && P[p]);

/* ---------- отрисовка ---------- */
function renderPeople(){
  $('people').innerHTML = PEOPLE.map(p =>
    `<button class="chip press" style="--c:${p.color}" data-person="${p.id}" aria-pressed="${state.visible.has(p.id)}"><span class="dot"></span>${p.name}</button>`).join('');
}
function renderInvites(){
  const me = ME();
  const list = entries.filter(e => e.inv && e.inv[me] === 'wait' && e.to >= TODAY_K).sort((a,b) => a.from.localeCompare(b.from));
  $('invs').innerHTML = (state.view === 'month' ? '' : installCardHTML()) + list.map(e => { const by = owner(e); return `<div class="inv" style="--c:${P[by].color}">
    <div style="min-width:0"><div class="who">${P[by].name} зовёт</div><div class="what">${esc(e.what)}</div><div class="meta">${fmtRange(e.from,e.to)}</div></div>
    <div class="invB"><button class="yes press" data-rsvp="${e.id}" data-ans="yes">Иду</button><button class="no press" data-rsvp="${e.id}" data-ans="no">Не иду</button></div></div>`; }).join('');
  $('invs').hidden = !$('invs').innerHTML;
}

// лента месяцев: от текущего (или выбранного) до последнего запланированного дела
function monthRange(){
  const cur = CUR(), target = mIdx(state.y, state.m);
  let last = cur + 3;
  for (const e of entries){ const d = parse(e.to); last = Math.max(last, mIdx(d.getFullYear(), d.getMonth())); }
  return [Math.min(cur, target), Math.max(last, target) + state.extra];
}
function panelHTML(y, m, map, V){
  const offset = (new Date(y,m,1).getDay()+6)%7, dim = new Date(y,m+1,0).getDate();
  const cells = 42; // всегда 6 недель — лента не прыгает по высоте
  let h = '';
  for (let i=0; i<cells; i++){
    const d = new Date(y,m,1-offset+i), k = key(d), b = map[k] || {};
    const busy = V.filter(p => b[p.id]);
    const free = V.length > 0 && !busy.length;
    const out = d.getMonth() !== m;
    const cls = ['day press', out && 'out', k<TODAY_K && 'past', k===TODAY_K && 'today', !out && k===state.sel && 'sel',
                 free && 'free', busy.length && 'filled', i%7===6 && 'sun'].filter(Boolean).join(' ');
    const lbl = `${d.getDate()} ${MONTHS_G[d.getMonth()]}${busy.length ? ', заняты: '+joinNames(busy.map(p=>p.id)) : free ? ', все свободны' : ''}`;
    h += `<button class="${cls}" data-day="${k}" aria-label="${lbl}">${bands(busy)}<span class="n">${d.getDate()}</span></button>`;
  }
  return `<div class="mpanel" data-mi="${mIdx(y,m)}"><div class="grid">${h}</div></div>`;
}
let range = [0,0];
function renderMonth(){
  const map = busyMap(), V = vis();
  range = monthRange();
  let h = '';
  for (let i = range[0]; i <= range[1]; i++) h += panelHTML(Math.floor(i/12), i%12, map, V);
  const s = $('strip');
  s.innerHTML = h;
  s.scrollLeft = (mIdx(state.y,state.m) - range[0]) * s.clientWidth;
  monthHead();
  renderDay();
}
function monthHead(){
  $('yrText').textContent = state.y;
  $('title').textContent = MONTHS[state.m];
}
// пролистали ленту — обновить заголовок и выбранный день
let scrollT;
function onStripScroll(){
  clearTimeout(scrollT);
  scrollT = setTimeout(() => {
    const s = $('strip'), w = s.clientWidth; if (!w) return;
    const i = range[0] + Math.round(s.scrollLeft / w);
    if (i === mIdx(state.y, state.m)) return;
    state.y = Math.floor(i/12); state.m = i%12;
    const sd = parse(state.sel);
    if (mIdx(sd.getFullYear(), sd.getMonth()) !== i) state.sel = i === CUR() ? TODAY_K : key(new Date(state.y, state.m, 1));
    markSel(); monthHead(); renderDay();
  }, 90);
}
function markSel(){
  document.querySelectorAll('#strip .day.sel').forEach(b => b.classList.remove('sel'));
  document.querySelectorAll(`#strip .day[data-day="${state.sel}"]:not(.out)`).forEach(b => b.classList.add('sel'));
}
function goMonth(i, smooth){
  if (i < range[0] || i > range[1]){ state.y = Math.floor(i/12); state.m = i%12; if (i > range[1]) state.extra += i - range[1]; render(); return; }
  const s = $('strip');
  s.scrollTo({left:(i - range[0]) * s.clientWidth, behavior: smooth && !matchMedia('(prefers-reduced-motion: reduce)').matches ? 'smooth' : 'auto'});
}

function evHTML(e){
  const w = waiting(e);
  const caps = e.who.map(p => `<i style="--c:${P[p].color}"></i>`).join('') + w.map(p => `<i class="wait" style="--c:${P[p].color}"></i>`).join('');
  const mine = owner(e) === ME();
  return `<button class="ev press" data-open="${e.id}">
    <span class="caps">${caps}</span>
    <span style="min-width:0"><div class="what">${esc(e.what)}</div><div class="meta">${joinNames(e.who)}${w.length ? ` · ждём: ${joinNames(w)}` : ''}, ${fmtRange(e.from,e.to)}</div></span>
    ${mine ? `<svg class="chev" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>` : ''}</button>`;
}
function renderDay(){
  const k = state.sel, d = parse(k);
  const list = entries.filter(e => e.from <= k && e.to >= k).sort((a,b) => a.from.localeCompare(b.from));
  const busy = new Set(list.flatMap(e => e.who));
  const free = PEOPLE.filter(p => !busy.has(p.id));
  let h = `<div class="dpHead"><h2>${WDF[d.getDay()]}, ${fmtDay(k)}</h2>${busy.size ? '' : '<span class="tag">Все свободны</span>'}</div>`;
  if (list.length){
    h += list.map(evHTML).join('');
    if (free.length) h += `<div class="freeLine">Свободны: <b>${joinNames(free.map(p=>p.id))}</b></div>`;
  } else h += `<div class="emptyDay">В этот день никто ничего не запланировал.</div>`;
  $('dayPanel').innerHTML = h;
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
      const cls = ['md', busy.length && 'filled', free && 'free', k===TODAY_K && 'today', k<TODAY_K && 'pastd', dow===6 && 'sun'].filter(Boolean).join(' ');
      cells += `<button class="${cls}" data-date="${k}" aria-label="${dd} ${MONTHS_G[m]}">${bands(busy)}<span class="num">${dd}</span></button>`;
    }
    const pastM = new Date(y,m+1,0) < TODAY;
    const cur = y === TODAY.getFullYear() && m === TODAY.getMonth();
    const yl = y !== TODAY.getFullYear() ? ` ${y}` : '';
    h += `<div class="mm${cur?' cur':''}${pastM?' past':''}">
      <button class="mmh" data-ym="${y}-${m}"><span>${MONTHS[m]}${yl}</span>${pastM ? '' : `<small>${freeCount} ${plural(freeCount,'свободный','свободных','свободных')}</small>`}</button>
      <div class="mmgrid">${cells}</div></div>`;
  }
  const g = $('yearGrid');
  g.className = 'yg' + (n <= 4 ? ' big' : '');
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
       <p class="note">Пишет «уже установлено», а значка нет? Закройте все вкладки Chrome и попробуйте снова.</p>`;
  return '<p class="lead">Откройте эту ссылку на телефоне: на iPhone — в Safari, на Android — в Google Chrome. Там появится инструкция.</p>';
}
function installCardHTML(){
  if (!showInstallCard()) return '';
  return `<div class="inst" role="region" aria-label="Как установить"><button class="x press" data-act="instHide" aria-label="Закрыть">×</button>
    <b>Установите на телефон</b>${installSteps()}</div>`;
}
function openHowto(){
  if (standalone) return toast('Установка', 'Приложение уже установлено');
  store(KEYS.inst, 0); state.view = 'four'; render(); window.scrollTo({top:0, behavior:'smooth'});
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
function settingsHTML(){
  let h = `<div class="set">
    <div class="setRow"><div class="k">Тема</div>${seg('theme', themeName, [['auto','Авто'],['light','Светлая'],['dark','Тёмная']])}</div>
    <div class="setRow"><div><div class="k">Установка на телефон</div><div class="v">${standalone ? 'Установлено' : 'Инструкция для iPhone и Android'}</div></div><button class="lnk press" data-act="howto">Как</button></div>
    <div class="setRow"><div class="k">Полосы</div>${seg('style', styleName, [['s1','Стекло'],['s2','Матовый'],['s3','Пастель']])}</div>`;
  if (!ONLINE) h += `<div class="setRow"><div><div class="k">Демо-режим · вы — ${P[ME()].name}</div><div class="v">Данные только на этом устройстве</div></div><button class="lnk press" data-act="reset">Сбросить</button></div>`;
  else {
    const pushNote = pushOn ? 'Придут, когда кто-то добавит дело или позовёт'
      : (isIOS && !standalone) ? 'На iPhone сначала: Поделиться → «На экран Домой»'
      : 'Пуш, когда кто-то добавит дело или позовёт';
    h += `<div class="setRow"><div><div class="k">Вы — ${esc(P[ME()].name)}</div><div class="v">${pending.length ? `Не отправлено изменений: ${pending.length}` : 'Всё синхронизировано'}</div></div><button class="lnk press" data-act="login">Сменить</button></div>
      <div class="setRow"><div><div class="k">Уведомления</div><div class="v">${pushNote}</div></div><button class="lnk press${pushOn ? ' on' : ''}" data-act="push">${pushOn ? 'Включены' : 'Включить'}</button></div>`;
  }
  return h + `</div><p class="itv"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 4h12M9 4v16" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" fill="none"/><path d="M12 8l4.5 12L21 8" stroke="#FF2E93" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>itivan</p>`;
}
function renderList(){
  const fr = freeRanges(60).slice(0,6);
  const up = entries.filter(e => e.to >= TODAY_K).sort((a,b) => a.from.localeCompare(b.from) || a.to.localeCompare(b.to));
  let h = `<div class="sec">Когда свободны все</div>`;
  h += fr.length ? `<div class="frs">${fr.map(([a,b]) => `<button class="fr press" data-goto="${a}">${fmtRange(a,b)}</button>`).join('')}</div>`
                 : `<div class="empty">В ближайшие два месяца нет дней, когда свободны все.</div>`;
  h += `<div class="sec">Дела по порядку</div>`;
  h += up.length ? up.map(evHTML).join('') : `<div class="empty">Пока никто ничего не запланировал.</div>`;
  h += settingsHTML();
  $('vList').innerHTML = h;
}

function render(){
  const v = state.view, multi = isMulti(v);
  $('vMonth').hidden = v !== 'month';
  document.body.classList.toggle('multi', multi);
  $('vYear').hidden = !multi;
  $('vList').hidden = v !== 'list';
  $('people').hidden = v === 'list';
  $('hb').style.visibility = v === 'list' ? 'hidden' : 'visible';
  $('yr').style.visibility = v === 'list' ? 'hidden' : 'visible';
  $('yr').querySelector('svg').style.display = v === 'month' ? '' : 'none';
  document.querySelectorAll('.tab').forEach(t => t.setAttribute('aria-selected', t.dataset.view === v));
  renderInvites();
  if (v !== 'list') renderPeople();
  if (v === 'month') renderMonth();
  else if (multi){ $('title').textContent = MULTI_T[v]; $('yrText').textContent = renderMulti(MULTI[v]); }
  else { $('title').textContent = 'Ближайшее'; renderList(); }
}
function openMonth(i, sel){
  state.y = Math.floor(i/12); state.m = i%12; state.extra = 0;
  state.sel = sel || (i === CUR() ? TODAY_K : key(new Date(state.y, state.m, 1)));
  state.view = 'month'; render(); window.scrollTo(0,0);
}

/* ---------- шторка ---------- */
let sheetLocked = false;
function openSheet(html, locked){ sheetLocked = !!locked; $('sheetBody').innerHTML = html; $('sheet').scrollTop = 0; $('sheet').classList.add('open'); $('backdrop').classList.add('open'); }
function closeSheet(){ if (sheetLocked) return; $('sheet').classList.remove('open'); $('backdrop').classList.remove('open'); }
$('backdrop').addEventListener('click', closeSheet);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeSheet(); });
// смахнуть шторку вниз
{ const sh = $('sheet'); let y0 = null, dy = 0;
  sh.addEventListener('touchstart', e => { y0 = sh.scrollTop <= 0 && !sheetLocked ? e.touches[0].clientY : null; dy = 0; }, {passive:true});
  sh.addEventListener('touchmove', e => { if (y0 === null) return; dy = e.touches[0].clientY - y0; if (dy > 0){ sh.classList.add('drag'); sh.style.transform = `translateY(${dy}px)`; } }, {passive:true});
  sh.addEventListener('touchend', () => { if (y0 === null) return; sh.classList.remove('drag'); sh.style.transform = ''; y0 = null; if (dy > 90) closeSheet(); }); }

const statusOf = (e, p) => owner(e) === p ? 'создал' + (P[p].f ? 'а' : '') : e.who.includes(p) ? 'идёт' : e.inv && e.inv[p] === 'wait' ? 'ждём ответа' : e.inv && e.inv[p] === 'no' ? 'не идёт' : '';

// форма своего дела
let form = null;
function openForm(e, date){
  const isEdit = !!e, me = ME();
  form = isEdit ? {id:e.id, people:new Set([...e.who, ...Object.keys(e.inv || {})].filter(p => p !== me)), from:e.from, to:e.to, what:e.what, src:e}
                : {id:null, people:new Set(), from:date||TODAY_K, to:date||TODAY_K, what:'', src:null};
  openSheet(`<h2>${isEdit ? 'Изменить дело' : 'Новое дело'}</h2>
    <div class="hint">Занят будешь ты. Остальных можно позвать — они подтвердят сами.</div>
    <label class="f" for="fWhat">Что за дело</label>
    <input class="in" id="fWhat" maxlength="60" placeholder="Например: сборы, Казань" value="${esc(form.what)}">
    <div class="row2">
      <div><label class="f" for="fFrom">С</label><input class="in" type="date" id="fFrom" value="${form.from}"></div>
      <div><label class="f" for="fTo">По</label><input class="in" type="date" id="fTo" value="${form.to}"></div>
    </div>
    <label class="f">Позвать</label>
    <div class="whoPick" id="pick">${pickHTML()}</div>
    <div class="err" id="fErr"></div>
    <button class="btn press" data-act="save">Сохранить</button>
    ${isEdit ? '<button class="btn ghost press" data-act="delete">Удалить</button>' : ''}`);
}
function pickHTML(){
  const me = ME();
  return PEOPLE.filter(p => p.id !== me).map(p => {
    const on = form.people.has(p.id), st = on && form.src ? statusOf(form.src, p.id) : '';
    return `<button type="button" class="chip press" style="--c:${p.color}" data-pick="${p.id}" aria-pressed="${on}"><span class="dot"></span>${p.name}${on ? ` <small>${st || 'позовём'}</small>` : ''}</button>`;
  }).join('');
}
function saveForm(){
  const from = $('fFrom').value, to = $('fTo').value, what = $('fWhat').value.trim(), err = $('fErr');
  if (!what) return err.textContent = 'Напишите, что за дело.';
  if (!from || !to) return err.textContent = 'Укажите обе даты.';
  if (to < from) return err.textContent = 'Дата «по» раньше даты «с».';
  const me = ME(), wasEdit = !!form.id, r = fmtRange(from,to);
  const entry = {id: form.id || newId(), what, from, to, people:[...form.people]};
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
function openView(e){
  const me = ME(), by = owner(e), mine = e.who.includes(me), st = e.inv && e.inv[me];
  const people = [by, ...e.who.filter(p => p !== by), ...Object.keys(e.inv || {})].filter((p,i,a) => P[p] && a.indexOf(p) === i);
  let btns = '';
  if (st === 'wait') btns = `<button class="btn ok press" data-rsvp="${e.id}" data-ans="yes">Иду</button><button class="btn plain press" data-rsvp="${e.id}" data-ans="no">Не иду</button>`;
  else if (st === 'no') btns = `<button class="btn ok press" data-rsvp="${e.id}" data-ans="yes">Передумал${P[me].f ? 'а' : ''} — иду</button>`;
  else if (mine) btns = `<button class="btn ghost press" data-rsvp="${e.id}" data-ans="no">Не пойду</button>`;
  openSheet(`<h2>${esc(e.what)}</h2><div class="hint">${fmtRange(e.from,e.to)}</div>
    <div class="plist">${people.map(p => `<div class="prow" style="--c:${P[p].color}"><span class="dot"></span>${P[p].name}<span class="st">${statusOf(e,p)}</span></div>`).join('')}</div>
    ${btns || `<div class="hint" style="margin-top:14px">Изменить может только ${P[by].name}.</div>`}`);
}
function rsvp(id, ans){
  const e = entries.find(x => x.id === id); if (!e) return;
  const me = ME(), word = ans === 'yes' ? 'идёт' : 'не идёт';
  commit({op:'rsvp', id, ans, note:`${P[me].name} ${word}: ${e.what}, ${fmtRange(e.from,e.to)}`});
  closeSheet(); render();
  toast(ans === 'yes' ? 'Идёшь' : 'Не идёшь', `${e.what}, ${fmtRange(e.from,e.to)} — ${P[owner(e)].name} узнает`);
}

/* ---------- вход: код семьи + кто я ---------- */
let loginWho = null;
function openLogin(msg){
  loginWho = auth.me && P[auth.me] ? auth.me : null;
  const first = !auth.key || !auth.me;
  openSheet(`<h2>${first ? 'Добро пожаловать' : 'Вход'}</h2>
    <div class="hint">${msg ? esc(msg) : 'Введите код семьи и выберите, кто вы.'}</div>
    <label class="f" for="lKey">Код семьи</label>
    <input class="in" id="lKey" autocomplete="off" autocapitalize="off" spellcheck="false" value="${esc(auth.key || '')}">
    <label class="f">Кто вы</label>
    <div class="whoPick">${PEOPLE.map(p => `<button type="button" class="chip press" style="--c:${p.color}" data-me="${p.id}" aria-pressed="${loginWho === p.id}"><span class="dot"></span>${p.name}</button>`).join('')}</div>
    <div class="err" id="lErr"></div>
    <button class="btn press" data-act="doLogin">Войти</button>`, first || !auth.key);
}
async function doLogin(){
  const k = $('lKey').value.trim(), err = $('lErr');
  if (!k) return err.textContent = 'Введите код семьи.';
  if (!loginWho) return err.textContent = 'Выберите, кто вы.';
  err.textContent = 'Проверяю…';
  const old = auth.key; auth.key = k;
  try { await api('GET', '/ping'); }
  catch(e){ auth.key = old; err.textContent = e.auth ? 'Код не подошёл.' : 'Нет связи с сервером. Попробуйте позже.'; return; }
  const meChanged = auth.me !== loginWho;
  auth.me = loginWho; store(KEYS.auth, auth);
  sheetLocked = false; closeSheet();
  if (meChanged && pushOn) subscribePush(false);
  await sync(); render();
}

/* ---------- пуш-уведомления ---------- */
const b64ToU8 = b => { const s = (b + '='.repeat((4 - b.length % 4) % 4)).replace(/-/g,'+').replace(/_/g,'/'); return Uint8Array.from(atob(s), c => c.charCodeAt(0)); };
async function refreshPushState(){
  try { const reg = await navigator.serviceWorker.ready; pushOn = !!(await reg.pushManager.getSubscription()) && Notification.permission === 'granted'; }
  catch(e){ pushOn = false; }
  if (state.view === 'list') render();
}
async function subscribePush(ask){
  if (!('serviceWorker' in navigator) || !('PushManager' in window) || !('Notification' in window))
    return toast('Уведомления', isIOS && !standalone ? 'Сначала добавьте приложение на экран «Домой»' : 'Этот браузер не поддерживает уведомления');
  try {
    if (ask && (await Notification.requestPermission()) !== 'granted') return toast('Уведомления', 'Разрешение не дано — включите в настройках браузера');
    const reg = await navigator.serviceWorker.ready;
    let sub = await reg.pushManager.getSubscription();
    if (!sub){
      const vapid = CONFIG.VAPID_PUBLIC || ((await api('GET','/ping')) || {}).vapid;
      if (!vapid) return toast('Уведомления', 'На сервере не заданы VAPID-ключи');
      sub = await reg.pushManager.subscribe({userVisibleOnly:true, applicationServerKey:b64ToU8(vapid)});
    }
    await api('POST', '/subscribe', {person:ME(), sub:sub.toJSON()});
    pushOn = true; render();
    if (ask) toast('Уведомления', 'Включены');
  } catch(e){ toast('Уведомления', 'Не получилось включить, попробуйте позже'); }
}
async function unsubscribePush(){
  try {
    const reg = await navigator.serviceWorker.ready, sub = await reg.pushManager.getSubscription();
    if (sub){ await api('POST', '/unsubscribe', {endpoint:sub.endpoint}).catch(() => {}); await sub.unsubscribe(); }
  } catch(e){}
  pushOn = false; render(); toast('Уведомления', 'Выключены');
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
  if (d.style){ styleName = d.style; store(KEYS.style, styleName); applyStyle(); render(); return; }
  if (d.person){ state.visible.has(d.person) ? state.visible.delete(d.person) : state.visible.add(d.person); render(); return; }
  if (d.pick){ form.people.has(d.pick) ? form.people.delete(d.pick) : form.people.add(d.pick); $('pick').innerHTML = pickHTML(); return; }
  if (d.me){ loginWho = d.me; document.querySelectorAll('[data-me]').forEach(b => b.setAttribute('aria-pressed', b.dataset.me === loginWho)); return; }
  if (d.rsvp){ rsvp(d.rsvp, d.ans); return; }
  if (d.day){ // день в ленте месяцев
    const dt = parse(d.day), i = mIdx(dt.getFullYear(), dt.getMonth());
    state.sel = d.day;
    if (i !== mIdx(state.y, state.m)){ goMonth(i, true); setTimeout(() => { state.sel = d.day; markSel(); renderDay(); }, 400); }
    markSel(); renderDay();
    return;
  }
  if (d.date){ const dt = parse(d.date); openMonth(mIdx(dt.getFullYear(), dt.getMonth()), d.date); return; }
  if (d.open){ const e = entries.find(x => x.id === d.open); if (!e) return; owner(e) === ME() ? openForm(e) : openView(e); return; }
  if (d.view){
    if (isMulti(d.view)){ state.sy = TODAY.getFullYear(); state.sm = TODAY.getMonth(); }
    if (d.view === 'month'){ openMonth(mIdx(state.y, state.m), state.sel); return; }
    state.view = d.view; render(); window.scrollTo(0,0);
    return;
  }
  if (d.ym){ const [yy,mm] = d.ym.split('-').map(Number); openMonth(mIdx(yy,mm)); return; }
  if (d.goto){ const g = parse(d.goto); openMonth(mIdx(g.getFullYear(), g.getMonth()), d.goto); return; }
  switch (d.act){
    case 'prev': case 'next': {
      const n = d.act === 'next' ? 1 : -1;
      if (isMulti(state.view)){ shiftMulti(n); render(); }
      else goMonth(mIdx(state.y, state.m) + n, true);
      break;
    }
    case 'today':
      if (state.view === 'month'){ state.sel = TODAY_K; goMonth(CUR(), true); markSel(); renderDay(); }
      else { state.sy = TODAY.getFullYear(); state.sm = TODAY.getMonth(); render(); }
      break;
    case 'back': if (state.view === 'month'){ state.sy = TODAY.getFullYear(); state.sm = TODAY.getMonth(); state.view = 'four'; render(); window.scrollTo(0,0); } break;
    case 'add': openForm(null, state.view === 'month' ? state.sel : null); break;
    case 'save': saveForm(); break;
    case 'delete': deleteForm(); break;
    case 'reset': entries = demo(); store(KEYS.demo, entries); render(); toast('Готово', 'Тестовые данные восстановлены'); break;
    case 'howto': openHowto(); break;
    case 'install': doInstall(); break;
    case 'instHide': store(KEYS.inst, 1); render(); break;
    case 'login': openLogin(); break;
    case 'doLogin': doLogin(); break;
    case 'push': pushOn ? unsubscribePush() : subscribePush(true); break;
  }
});
// лёгкая вибрация на нажатие (Android; iPhone из браузера не умеет)
document.addEventListener('pointerdown', e => { if (e.target.closest('button') && navigator.vibrate) try { navigator.vibrate(50); } catch(_){} }, {passive:true});

function shiftMulti(dir){
  const t = state.sy*12 + state.sm + MULTI[state.view] * dir;
  state.sy = Math.floor(t/12); state.sm = ((t%12)+12)%12;
}
$('strip').addEventListener('scroll', onStripScroll, {passive:true});
addEventListener('resize', () => { if (state.view === 'month'){ const s = $('strip'); s.scrollLeft = (mIdx(state.y,state.m) - range[0]) * s.clientWidth; } });
// свайп на экранах «4 месяца» и «Год»
{ let sx = null, sy = null; const g = $('yearGrid');
  g.addEventListener('touchstart', e => { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, {passive:true});
  g.addEventListener('touchend', e => {
    if (sx === null) return;
    const dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy; sx = null;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)){ shiftMulti(dx < 0 ? 1 : -1); render(); }
  }); }

/* ---------- запуск ---------- */
if ('serviceWorker' in navigator && location.protocol === 'https:' && !/claude/.test(location.host))
  navigator.serviceWorker.register('sw.js').then(() => ONLINE && refreshPushState()).catch(() => {});
render();
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState !== 'visible') return;
  const was = TODAY_K; setToday(); if (was !== TODAY_K) render();
  if (ONLINE) sync();
});
if (ONLINE){
  if (!auth.key || !auth.me) openLogin();
  else sync();
  setInterval(() => { if (document.visibilityState === 'visible') sync(); }, 30000);
  addEventListener('online', sync);
} else {
  setTimeout(() => toast('Демо-режим', `Вы — ${P[ME()].name}. Лера зовёт вас в театр — ответьте сверху`), 1200);
}
