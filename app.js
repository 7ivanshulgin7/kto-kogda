/* ================= НАСТРОЙКИ ================= */
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
function setPeople(list, chipIds){
  P = Object.fromEntries(list.map(p => [p.id, p]));
  PEOPLE = chipIds.filter(id => P[id]).map(id => P[id]);
}
const COLORS = ['#FF375F','#FF9F0A','#FFD60A','#30B05A','#64D2FF','#0A84FF','#5E5CE6','#BF5AF2','#AC8E68','#8E8E93'];
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
    else inv[p] = (prev && prev.inv && prev.inv[p]) || 'wait';
  }
  const vis = Array.isArray(req.vis) ? req.vis.filter(p => p !== by) : 'all';
  return {id:req.id, by, what:req.what, from:req.from, to:req.to, who, inv, vis, ts:Date.now()};
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
  S = st; meInfo = st.me; server = st.entries || []; users = st.users || [];
  links = Object.assign({friends:[], incoming:[], outgoing:[]}, st.links || {});
  const friends = links.friends.filter(id => st.people.some(p => p.id === id))
    .sort((a,b) => st.people.find(p => p.id === a).name.localeCompare(st.people.find(p => p.id === b).name, 'ru'));
  setPeople(st.people, [st.me.id, ...friends]);
}
let pending = ONLINE ? load(KEYS.pending, []) : [];
let entries;
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
function setSync(t){ $('sync').textContent = t; $('sync').hidden = !t; }
async function sync(){
  if (!ONLINE || !auth.token) return;
  if (syncing){ again = true; return; }
  syncing = true;
  try {
    while (pending.length){
      const op = pending[0];
      try {
        if (op.op === 'put') await api('PUT', '/entries/' + op.entry.id, {entry:op.entry});
        else if (op.op === 'del') await api('DELETE', '/entries/' + op.id);
        else await api('POST', `/entries/${op.id}/rsvp`, {ans:op.ans});
      } catch(e){ if (!(e.status >= 400 && e.status < 500)) throw e; } // отклонённую сервером операцию просто выбрасываем
      pending.shift(); store(KEYS.pending, pending);
    }
    const st = await api('GET', '/state');
    if (!auth.token) return; // успели выйти, пока шёл запрос
    if (st.pending){ waitingApproval = true; meInfo = st.me; openWaiting(); return; }
    if (waitingApproval){ waitingApproval = false; sheetLocked = false; closeSheet(); toast('Добро пожаловать', 'Заявку одобрили'); }
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
                view:'month', hidden:new Set(), extra:0 };
const isMulti = v => v === 'year';
// «Год»: сетка 3×4 — 12 месяцев от текущего; если дела дальше — до месяца с последним делом (целыми рядами)
function yearSpan(){
  let last = CUR() + 11;
  for (const e of entries){ const d = parse(e.to); last = Math.max(last, mIdx(d.getFullYear(), d.getMonth())); }
  return Math.ceil((last - CUR() + 1) / 3) * 3;
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
function applySkin(){
  SKINS.forEach(([k]) => document.body.classList.toggle('skin-' + k, k === skinName));
  document.body.classList.toggle('lay-col', layName === 'col');
  const b = $('skinBtn'); if (b) b.textContent = 'Вид: ' + SKINS.find(x => x[0] === skinName)[1];
  if (typeof themeName !== 'undefined') applyTheme();
}
applyTheme();
matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyTheme);

const vis = () => PEOPLE.filter(p => !state.hidden.has(p.id));
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
  const n = ids.filter(i => P[i]).map(i => esc(P[i].name));
  return n.length < 2 ? (n[0]||'') : n.slice(0,-1).join(', ') + ' и ' + n[n.length-1];
}
const waiting = e => Object.keys(e.inv || {}).filter(p => e.inv[p] === 'wait' && P[p]);

/* ---------- отрисовка ---------- */
function renderPeople(){
  $('people').innerHTML = PEOPLE.map(p =>
    `<button class="chip press" style="--c:${p.color}" data-person="${p.id}" aria-pressed="${!state.hidden.has(p.id)}"><span class="dot"></span>${esc(p.name)}</button>`).join('');
}
function renderInvites(){
  const me = ME();
  const list = entries.filter(e => e.inv && e.inv[me] === 'wait' && e.to >= TODAY_K).sort((a,b) => a.from.localeCompare(b.from));
  const knocks = links.incoming.filter(id => P[id]).map(id => `<div class="inv" style="--c:${P[id].color}">
    <div style="min-width:0"><div class="who">Стучится к вам</div><div class="what">${esc(P[id].name)}</div><div class="meta">@${id}</div></div>
    <div class="invB"><button class="yes press" data-link="${id}" data-la="accept">Принять</button><button class="no press" data-link="${id}" data-la="drop">Нет</button></div></div>`).join('');
  const np = users.filter(u => u.status === 'pending').length;
  const adm = np && state.view !== 'set' ? `<div class="inv" style="--c:#FF9F0A"><div style="min-width:0"><div class="who">Разработчику</div><div class="what">Новых заявок: ${np}</div></div>
    <div class="invB"><button class="yes press" data-view="set">Открыть</button></div></div>` : '';
  const cta = state.view !== 'set' && !load('kk-guide', 0) ? `<button class="gcta press" data-act="guide">${TAB_IC.tip}Прочитай, как пользоваться</button>` : '';
  $('invs').innerHTML = (state.view === 'set' ? '' : cta + installCardHTML() + adm + knocks) + (state.view === 'set' ? [] : list).map(e => { const by = owner(e); return `<div class="inv" style="--c:${P[by].color}">
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
  let h = '<span></span>'.repeat(offset);
  for (let dd=1; dd<=dim; dd++){
    const d = new Date(y,m,dd), k = key(d), b = map[k] || {};
    const busy = V.filter(p => b[p.id]);
    const dow = (offset + dd - 1) % 7;
    const cls = ['day press', k<TODAY_K && 'past', k===TODAY_K && 'today', k===state.sel && 'sel', busy.length && 'filled', busy.length > 1 && 'over', dow===6 && 'sun'].filter(Boolean).join(' ');
    const lbl = `${dd} ${MONTHS_G[m]}${busy.length ? ', заняты: '+joinNames(busy.map(p=>p.id)) : ''}`;
    h += `<button class="${cls}" data-day="${k}" aria-label="${lbl}">${bands(busy)}<span class="n">${dd}</span></button>`;
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
  h += `<button class="more press" data-act="more">Показать ещё месяц</button>`;
  $('feed').innerHTML = h;
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
function markSel(){
  document.querySelectorAll('#feed .day.sel').forEach(b => b.classList.remove('sel'));
  document.querySelectorAll(`#feed .day[data-day="${state.sel}"]`).forEach(b => b.classList.add('sel'));
}

const LOCK = '<svg class="lock" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-label="Видно не всем"><rect x="5" y="11" width="14" height="10" rx="2.5"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>';
function evHTML(e){
  const w = waiting(e);
  const caps = e.who.map(p => `<i style="--c:${P[p].color}"></i>`).join('') + w.map(p => `<i class="wait" style="--c:${P[p].color}"></i>`).join('');
  const mine = owner(e) === ME();
  return `<button class="ev press" data-open="${e.id}">
    <span class="caps">${caps}</span>
    <span style="min-width:0"><div class="what">${e.vis && e.vis !== 'all' ? LOCK : ''}${esc(e.what)}</div><div class="meta">${joinNames(e.who)}${w.length ? ` · ждём: ${joinNames(w)}` : ''}, ${fmtRange(e.from,e.to)}${Array.isArray(e.vis) ? ` · видят: ${e.vis.length ? joinNames(e.vis) : 'только вы'}` : ''}</div></span>
    ${mine ? `<svg class="chev" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>` : ''}</button>`;
}
// дела дня — в шторке
function openDay(k){
  state.sel = k; markSel();
  const d = parse(k);
  const list = entries.filter(e => e.from <= k && e.to >= k).sort((a,b) => a.from.localeCompare(b.from));
  const busy = new Set(list.flatMap(e => e.who));
  const free = PEOPLE.filter(p => !busy.has(p.id));
  let h = `<div class="dpHead"><h2>${WDF[d.getDay()]}, ${fmtDay(k)}</h2>${busy.size ? '' : '<span class="tag">Все свободны</span>'}</div>`;
  if (list.length){
    h += list.map(evHTML).join('');
    if (free.length) h += `<div class="freeLine">Свободны: <b>${joinNames(free.map(p=>p.id))}</b></div>`;
  } else h += `<div class="emptyDay">В этот день никто ничего не запланировал.</div>`;
  h += `<button class="btn press" data-act="add">+ Дело на этот день</button>`;
  openSheet(h);
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
      const cls = ['md', busy.length && 'filled', busy.length > 1 && 'over', k===TODAY_K && 'today', k<TODAY_K && 'pastd', dow===6 && 'sun'].filter(Boolean).join(' ');
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
function openHowto(){
  if (standalone) return toast('Установка', 'Приложение уже установлено');
  store(KEYS.inst, 0); state.view = 'month'; render(); window.scrollTo({top:0, behavior:'smooth'});
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
    <div class="setRow"><div class="k">Стиль</div>${seg('skin', skinName, SKINS)}</div>
`;
  if (!ONLINE) h += `<div class="setRow"><div><div class="k">Демо-режим · вы — ${P[ME()].name}</div><div class="v">Данные только на этом устройстве</div></div><button class="lnk press" data-act="reset">Сбросить</button></div>`;
  else if (meInfo) {
    const pushNote = pushOn ? 'Приглашения, запросы и дела ваших связей'
      : (isIOS && !standalone) ? 'На iPhone сначала: Поделиться → «На экран Домой»'
      : 'Пуш о приглашениях, запросах и делах связей';
    h += `<div class="setRow"><div><div class="k">${esc(meInfo.name)} · @${meInfo.id}</div><div class="v">${pending.length ? `Не отправлено изменений: ${pending.length}` : 'Всё синхронизировано'}</div></div><button class="lnk press" data-act="profile">Профиль</button></div>
      <div class="setRow"><div><div class="k">Уведомления</div><div class="v">${pushNote}</div></div><button class="lnk press${pushOn ? ' on' : ''}" data-act="push">${pushOn ? 'Включены' : 'Включить'}</button></div>
      <div class="setRow"><div><div class="k">О делах всех связей</div><div class="v">${meInfo.pushAll ? 'Пуш о каждом новом деле' : 'Только приглашения и запросы'}</div></div><button class="lnk press${meInfo.pushAll ? ' on' : ''}" data-act="pushAll">${meInfo.pushAll ? 'Да' : 'Нет'}</button></div>
      <div class="setRow"><div><div class="k">Ключ входа</div><div class="v">Чтобы войти на другом телефоне</div></div><button class="lnk press" data-act="showKey">Показать</button></div>`;
  }
  return h + `</div><p class="itv"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 4h12M9 4v16" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" fill="none"/><path d="M12 8l4.5 12L21 8" stroke="#FF2E93" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>itivan</p>`;
}
function personRow(id, right, sub){
  const p = P[id] || {name:id, color:'#8E8E93'};
  return `<div class="prow" style="--c:${p.color}"><span class="dot"></span><div style="min-width:0"><div>${esc(p.name)}</div><div class="v">@${id}${sub ? ' · ' + sub : ''}</div></div><span class="st">${right}</span></div>`;
}
function peopleHTML(){
  let h = `<div class="sec" style="margin-top:28px">Люди</div><div class="set">`;
  h += `<div class="setRow"><div><div class="k">Позвать нового человека</div><div class="v">Только по ссылке — со стороны не зарегистрироваться</div></div><button class="lnk on press" data-act="invite">Пригласить</button></div>`;
  h += `<div class="setRow knock"><input class="in" id="kNick" placeholder="@ник человека" autocomplete="off" autocapitalize="off" spellcheck="false"><button class="lnk press" data-act="knock">Постучаться</button></div>`;
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
  for (const u of pend) h += `<div class="prow" style="--c:${u.color}"><span class="dot"></span><div style="min-width:0"><div>${esc(u.name)}</div><div class="v">@${u.id} · заявка</div></div><span class="st">
    <button class="lnk on press" data-adm="${u.id}" data-aa="approve">Одобрить</button> <button class="lnk press" data-adm="${u.id}" data-aa="reject">Отклонить</button></span></div>`;
  for (const u of rest) h += `<div class="prow" style="--c:${u.color}"><span class="dot"></span><div style="min-width:0"><div>${esc(u.name)}</div><div class="v">@${u.id}${u.status === 'blocked' ? ' · заблокирован' : ''}</div></div><span class="st">
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
  h += up.length ? up.map(evHTML).join('') : `<div class="empty">Пока никто ничего не запланировал.</div>`;
  $('vList').innerHTML = h;
}
function renderSet(){
  let h = guideHTML() + peopleHTML();
  if (meInfo && meInfo.admin) h += adminHTML();
  h += `<div class="sec" style="margin-top:28px">Приложение</div>` + settingsHTML().replace(/<p class="itv">[\s\S]*$/, '');
  h += `<p class="itv"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 4h12M9 4v16" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" fill="none"/><path d="M12 8l4.5 12L21 8" stroke="#FF2E93" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>itivan</p>`;
  $('vSet').innerHTML = h;
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
const gday = (n, cols) => `<span class="gday${cols.length ? ' filled' : ''}${cols.length > 1 ? ' over' : ''}">${cols.length ? `<span class="bands">${cols.map(c => `<i style="--c:${c}"></i>`).join('')}</span>` : ''}<b>${n}</b></span>`;
function guideBody(){
  const [a, b] = [P[ME()] ? P[ME()].color : '#30B05A', '#BF5AF2'];
  return `<div class="gbody">
  <div class="gsec"><b>1. Полоса в дне — человек занят</b>
    <div class="gflow3">
      <span class="gex">${gday(12, [])}<span><b>Пусто</b>все свободны</span></span>
      <span class="gex">${gday(13, [a])}<span><b>Одна полоса</b>занят один</span></span>
      <span class="gex">${gday(14, [a, b])}<span><b>Две и больше</b>заняты несколько</span></span>
    </div>
    <div class="gnote">У каждого свой цвет. Кружки с именами над календарём — фильтр: нажми, чтобы спрятать человека.</div></div>
  <div class="gsec"><b>2. Своё дело и приглашение</b>
    <div class="gsteps"><span class="gstep">+</span><span class="garr">→</span><span class="gstep wide">Что и когда</span><span class="garr">→</span><span class="gstep wide">Позвать</span><span class="garr">→</span><span class="gstep wide ok">Иду</span></div>
    <div class="gnote">Дело всегда на тебя. Позвать можно своих людей — у них появится «Иду / Не иду». Менять дело может только тот, кто его создал.</div>
    <div class="gnote">«Кто видит»: <b>все мои люди</b> или <b>только выбранные</b> — остальные такое дело не увидят совсем. Такие дела помечены замочком.</div></div>
  <div class="gsec"><b>3. Люди</b>
    <div class="ggrid">
      <div class="gcard">${TAB_IC.link}<b>Пригласить</b><span>одноразовая ссылка на 7 дней</span></div>
      <div class="gcard">${TAB_IC.knock}<b>Постучаться</b><span>по точному @нику</span></div>
      <div class="gcard">${TAB_IC.drop}<b>Убрать</b><span>и вы не видите друг друга</span></div>
    </div>
    <div class="gnote">Новый человек попадает сюда только по твоей ссылке — со стороны зарегистрироваться нельзя.</div></div>
  <div class="gsec"><b>4. Кнопки внизу экрана</b>
    <div class="gwhere">
      <span>${TAB_IC.month}<b>Месяц</b>листай вниз, нажми на день — его дела</span>
      <span>${TAB_IC.year}<b>Год</b>весь год сеткой, нажми на месяц</span>
      <span>${TAB_IC.list}<b>Ближайшее</b>свободные дни и дела по порядку</span>
      <span>${TAB_IC.set}<b>Настройки</b>люди, уведомления, ключ</span>
    </div></div>
  <div class="gsec gwarn">${TAB_IC.tip}<div><b>Не ставится на Android?</b> В Chrome зависла вкладка, даже если её не видно: квадратик с цифрой у адресной строки → ⋮ → «Закрыть все вкладки» → открой ссылку заново.
    <br><b>Второй телефон:</b> Настройки → Ключ входа. На iPhone приложение с экрана «Домой» входит ключом отдельно от Safari.</div></div>
  </div>`;
}
const guideHTML = () => `<details class="set gbox"${guideOpen ? ' open' : ''} id="guideBox"><summary><span class="gic">${TAB_IC.tip}</span><span class="gtt"><b>Как это работает</b><small>две минуты — и всё понятно</small></span><svg class="arr" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg></summary>${guideBody()}</details>`;

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
  else if (multi){ state.sy = TODAY.getFullYear(); state.sm = TODAY.getMonth(); $('title').textContent = 'Год'; $('yrText').textContent = renderMulti(yearSpan()); }
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
  form = isEdit ? {id:e.id, people:new Set([...e.who, ...Object.keys(e.inv || {})].filter(p => p !== me)), from:e.from, to:e.to, what:e.what, src:e,
                   visAll: !Array.isArray(e.vis), vis: new Set(Array.isArray(e.vis) ? e.vis : [])}
                : {id:null, people:new Set(), from:date||TODAY_K, to:date||TODAY_K, what:'', src:null, visAll:true, vis:new Set()};
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
    <label class="f">Кто видит</label>
    ${seg('fvis', form.visAll ? 'all' : 'some', [['all','Все мои люди'],['some','Только выбранные']])}
    <div class="whoPick" id="visPick" style="margin-top:10px">${visHTML()}</div>
    <div class="err" id="fErr"></div>
    <button class="btn press" data-act="save">Сохранить</button>
    ${isEdit ? '<button class="btn ghost press" data-act="delete">Удалить</button>' : ''}`);
}
function visHTML(){
  if (form.visAll) return '<div class="hint" style="margin:0">Дело увидят все, с кем у вас есть связь.</div>';
  const me = ME();
  const fr = PEOPLE.filter(p => p.id !== me && links.friends.includes(p.id));
  if (!fr.length) return '<div class="hint" style="margin:0">Пока не с кем делиться — дело будет видно только вам.</div>';
  return fr.map(p => { const forced = form.people.has(p.id), on = forced || form.vis.has(p.id);
    return `<button type="button" class="chip press" style="--c:${p.color}" data-vis="${p.id}" aria-pressed="${on}"${forced ? ' disabled' : ''}><span class="dot"></span>${esc(p.name)}${forced ? ' <small>позван</small>' : ''}</button>`; }).join('')
    + '<div class="hint" style="margin:6px 0 0;width:100%">Остальные не увидят это дело совсем. Позванные видят всегда.</div>';
}
function pickHTML(){
  const me = ME();
  const fr = PEOPLE.filter(p => p.id !== me && links.friends.includes(p.id));
  if (!fr.length) return '<div class="hint" style="margin:0">Позвать можно тех, с кем есть связь. Добавьте людей в Настройках → Люди.</div>';
  return fr.map(p => {
    const on = form.people.has(p.id), st = on && form.src ? statusOf(form.src, p.id) : '';
    return `<button type="button" class="chip press" style="--c:${p.color}" data-pick="${p.id}" aria-pressed="${on}"><span class="dot"></span>${esc(p.name)}${on ? ` <small>${st || 'позовём'}</small>` : ''}</button>`;
  }).join('');
}
function saveForm(){
  const from = $('fFrom').value, to = $('fTo').value, what = $('fWhat').value.trim(), err = $('fErr');
  if (!what) return err.textContent = 'Напишите, что за дело.';
  if (!from || !to) return err.textContent = 'Укажите обе даты.';
  if (to < from) return err.textContent = 'Дата «по» раньше даты «с».';
  const me = ME(), wasEdit = !!form.id, r = fmtRange(from,to);
  const entry = {id: form.id || newId(), what, from, to, people:[...form.people], vis: form.visAll ? 'all' : [...form.vis]};
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
    <div class="plist">${people.map(p => `<div class="prow" style="--c:${P[p].color}"><span class="dot"></span>${esc(P[p].name)}<span class="st">${statusOf(e,p)}</span></div>`).join('')}</div>
    ${btns || `<div class="hint" style="margin-top:14px">Изменить может только ${esc(P[by].name)}.</div>`}`);
}
function rsvp(id, ans){
  const e = entries.find(x => x.id === id); if (!e) return;
  const me = ME(), word = ans === 'yes' ? 'идёт' : 'не идёт';
  commit({op:'rsvp', id, ans, note:`${P[me].name} ${word}: ${e.what}, ${fmtRange(e.from,e.to)}`});
  closeSheet(); render();
  toast(ans === 'yes' ? 'Идёшь' : 'Не идёшь', `${e.what}, ${fmtRange(e.from,e.to)} — ${P[owner(e)].name} узнает`);
}

/* ---------- вход и регистрация ---------- */
let regColor = COLORS[5], regF = false, loginTab = 'reg';
function openLogin(msg){
  const canReg = !!(inviteCode && inviter);
  if (!canReg) loginTab = 'key';
  const tabs = canReg ? seg('ltab', loginTab, [['reg','Регистрация'],['key','У меня есть ключ']]) : '';
  const body = loginTab === 'reg' ? `
    <label class="f" for="rName">Как вас зовут</label>
    <input class="in" id="rName" maxlength="24" placeholder="Например: Лера">
    <label class="f" for="rNick">Ник — по нему вас найдут</label>
    <input class="in" id="rNick" maxlength="21" placeholder="@lera" autocomplete="off" autocapitalize="off" spellcheck="false">
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
      <div class="hint">Вы и ${esc(inviter.name)} уже видите календари друг друга.</div>
      ${keyBlock(isIOS && !standalone
        ? 'Сейчас: Поделиться → «На экран „Домой“», откройте приложение с иконки и войдите этим ключом — на iPhone приложение с экрана не видит вход из Safari.'
        : 'Сохраните ключ: с ним можно войти на другом телефоне. Он же есть в настройках.')}
      <button class="btn press" data-act="closeSheet">Открыть календарь</button>`);
    sync();
  } catch(e){ err.textContent = e.user || 'Нет связи с сервером. Попробуйте позже.'; }
}
// открыли ссылку-приглашение
async function handleInvite(){
  if (!inviteCode || !ONLINE) return;
  try { inviter = (await api('GET', '/invite/' + inviteCode)).by; }
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
    window.__inviteUrl = url;
    openSheet(`<h2>Ссылка-приглашение</h2><div class="hint">Одноразовая, работает 7 дней. Кто откроет — зарегистрируется, и вы сразу увидите календари друг друга.</div>
      <label class="f">Ссылка</label><div class="keybox" id="keyBox">${esc(url)}</div>
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
  regColor = meInfo.color; regF = meInfo.f;
  openSheet(`<h2>Профиль</h2><div class="hint">@${meInfo.id}</div>
    <label class="f" for="rName">Имя</label><input class="in" id="rName" maxlength="24" value="${esc(meInfo.name)}">
    <label class="f">Писать о вас</label>${seg('rf', regF ? 'f' : 'm', [['m','добавил'],['f','добавила']])}
    <label class="f">Цвет</label>
    <div class="colors">${COLORS.map(c => `<button type="button" class="cl press" style="--c:${c}" data-rc="${c}" aria-pressed="${c === regColor}" aria-label="Цвет ${c}"></button>`).join('')}</div>
    <div class="err" id="lErr"></div>
    <button class="btn press" data-act="saveProfile">Сохранить</button>
    <button class="btn ghost press" data-act="logout">Выйти на этом телефоне</button>`);
}
async function saveProfile(){
  const name = $('rName').value.trim();
  if (!name) return $('lErr').textContent = 'Напишите имя.';
  try { await api('PATCH', '/me', {name, color:regColor, f:regF}); closeSheet(); sync(); toast('Профиль', 'Сохранено'); }
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
      const vapid = CONFIG.VAPID_PUBLIC || (S && S.vapid);
      if (!vapid) return toast('Уведомления', 'На сервере не заданы VAPID-ключи');
      sub = await reg.pushManager.subscribe({userVisibleOnly:true, applicationServerKey:b64ToU8(vapid)});
    }
    await api('POST', '/subscribe', {sub:sub.toJSON()});
    pushOn = true; render();
    if (ask) toast('Уведомления', 'Включены');
  } catch(e){ toast('Уведомления', 'Не получилось включить, попробуйте позже'); }
}
async function unsubscribePush(quiet){
  try {
    const reg = 'serviceWorker' in navigator && await navigator.serviceWorker.getRegistration();
    const sub = reg && reg.pushManager && await reg.pushManager.getSubscription();
    if (sub){ await api('POST', '/unsubscribe', {endpoint:sub.endpoint}).catch(() => {}); await sub.unsubscribe(); }
  } catch(e){}
  pushOn = false; if (!quiet){ render(); toast('Уведомления', 'Выключены'); }
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
  if (d.person){ state.hidden.has(d.person) ? state.hidden.delete(d.person) : state.hidden.add(d.person); render(); return; }
  if (d.pick){ form.people.has(d.pick) ? form.people.delete(d.pick) : form.people.add(d.pick); $('pick').innerHTML = pickHTML(); $('visPick').innerHTML = visHTML(); return; }
  if (d.fvis){ form.visAll = d.fvis === 'all'; t.parentNode.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', b === t)); $('visPick').innerHTML = visHTML(); return; }
  if (d.vis){ form.vis.has(d.vis) ? form.vis.delete(d.vis) : form.vis.add(d.vis); t.setAttribute('aria-pressed', form.vis.has(d.vis)); return; }
  if (d.ltab){ loginTab = d.ltab; openLogin(); return; }
  if (d.rf){ regF = d.rf === 'f'; t.parentNode.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', b === t)); return; }
  if (d.rc){ regColor = d.rc; document.querySelectorAll('[data-rc]').forEach(b => b.setAttribute('aria-pressed', b.dataset.rc === regColor)); return; }
  if (d.link){ linkAction(d.link, d.la); return; }
  if (d.adm){ if (d.aa === 'reject' && t.dataset.sure !== '1'){ t.dataset.sure = '1'; t.textContent = 'Точно?'; return; } adminAction(d.adm, d.aa); return; }
  if (d.rsvp){ rsvp(d.rsvp, d.ans); return; }
  if (d.day){ openDay(d.day); return; }
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
      if (state.view === 'month') goMonth(mIdx(state.y, state.m) + n, true);
      break;
    }
    case 'more': state.extra++; renderMonth(); break;
    case 'today':
      if (state.view === 'month'){ state.sel = TODAY_K; goMonth(CUR(), true); markSel(); }
      else { state.sy = TODAY.getFullYear(); state.sm = TODAY.getMonth(); render(); }
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
    case 'guide': store('kk-guide', 1); guideOpen = true; state.view = 'set'; render(); scrollTo(0, 0); break;
    case 'shareInvite': navigator.share({title:'Кто когда', text:'Зову в общий календарь «Кто когда»', url:window.__inviteUrl}).catch(() => {}); break;
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
  }
});
// лёгкая вибрация на нажатие (Android; iPhone из браузера не умеет)
document.addEventListener('toggle', e => { if (e.target.id === 'guideBox'){ guideOpen = e.target.open; if (guideOpen) store('kk-guide', 1); } }, true);
document.addEventListener('change', e => { if (e.target.id === 'admLink') store('kk-admlink', e.target.checked); });
document.addEventListener('pointerdown', e => { if (e.target.closest('button') && navigator.vibrate) try { navigator.vibrate(50); } catch(_){} }, {passive:true});

addEventListener('scroll', onFeedScroll, {passive:true});

/* ---------- запуск ---------- */
if (!ONLINE){ const b = document.createElement('button'); b.id = 'skinBtn'; b.className = 'skinBtn press'; b.dataset.act = 'skinNext'; document.body.appendChild(b); }
applySkin();
if ('serviceWorker' in navigator && location.protocol === 'https:' && !/claude/.test(location.host))
  navigator.serviceWorker.register('sw.js').then(() => ONLINE && refreshPushState()).catch(() => {});
render();
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState !== 'visible') return;
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
