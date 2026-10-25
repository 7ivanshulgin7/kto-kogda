/* ================= НАСТРОЙКИ ================= */
const CONFIG = {
  // Адрес API Gateway из Яндекс Cloud, напр. 'https://d5dxxxxxxxx.apigw.yandexcloud.net'
  // Пусто — демо-режим: данные хранятся только на этом устройстве.
  API_URL: '',
  // Публичный VAPID-ключ. Можно оставить пустым — приложение возьмёт его с сервера.
  VAPID_PUBLIC: ''
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

const pad = n => String(n).padStart(2,'0');
const key = d => `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
const parse = s => { const [y,m,d] = s.split('-').map(Number); return new Date(y,m-1,d); };
const addDays = (d,n) => new Date(d.getFullYear(), d.getMonth(), d.getDate()+n);
let TODAY, TODAY_K;
function setToday(){ const n = new Date(); TODAY = new Date(n.getFullYear(), n.getMonth(), n.getDate()); TODAY_K = key(TODAY); }
setToday();
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const plural = (n,a,b,c) => { const m10=n%10, m100=n%100; return (m10===1 && m100!==11) ? a : (m10>=2 && m10<=4 && (m100<12 || m100>14)) ? b : c; };
const $ = id => document.getElementById(id);
const newId = () => Date.now().toString(36) + Math.random().toString(36).slice(2,6);
const load = (k, def) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : def; } catch(e) { return def; } };
const store = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch(e) {} };
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
const standalone = matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;

/* ---------- данные ---------- */
function demo(){
  const r = (a,b) => [key(addDays(TODAY,a)), key(addDays(TODAY,b))];
  const mk = (who,[from,to],what) => ({id:newId(), who, from, to, what});
  return [
    mk(['zhenya'], r(4,10),  'Сборы, Казань'),
    mk(['zhenya'], r(18,20), 'Соревнования, Москва'),
    mk(['zhenya'], r(33,39), 'Сборы, Сочи'),
    mk(['mama'],   r(13,14), 'На даче'),
    mk(['mama','papa'], r(2,2), 'Юбилей у тёти Гали'),
    mk(['papa'],   r(8,9),   'Рыбалка'),
    mk(['papa'],   r(25,29), 'Командировка, Екатеринбург'),
    mk(['ivan','lera'], r(16,16), 'Свадьба у друзей'),
    mk(['lera'],   r(21,22), 'Курсы'),
    mk(['ivan'],   r(8,12),  'Выезд на объект')
  ];
}

const known = e => Array.isArray(e.who) && e.who.every(w => P[w]);
let auth = load('kk-auth', {});              // {key, me}
const ME = () => (auth.me && P[auth.me]) ? auth.me : 'ivan';
let server = ONLINE ? load('kk-cache', []) : [];  // то, что пришло с сервера
let pending = ONLINE ? load('kk-pending', []) : []; // неотправленные изменения
let entries;
if (ONLINE) entries = applyPending(server);
else { entries = load('kk-v1', null); if (!Array.isArray(entries)) entries = demo(); }

function applyPending(base){
  let list = base.slice();
  for (const op of pending){
    if (op.op === 'put'){ list = list.filter(e => e.id !== op.entry.id); list.push(op.entry); }
    else list = list.filter(e => e.id !== op.id);
  }
  return list.filter(known);
}
function commit(op){
  if (!ONLINE){
    if (op.op === 'put'){ entries = entries.filter(e => e.id !== op.entry.id); entries.push(op.entry); }
    else entries = entries.filter(e => e.id !== op.id);
    store('kk-v1', entries); return;
  }
  pending.push(op); store('kk-pending', pending);
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
      const op = pending[0];
      if (op.op === 'put') await api('PUT', '/entries/' + op.entry.id, {entry:op.entry, by:ME(), note:op.note});
      else await api('DELETE', '/entries/' + op.id, {by:ME(), note:op.note});
      pending.shift(); store('kk-pending', pending);
    }
    const r = await api('GET', '/entries');
    const prev = new Map(server.map(e => [e.id, e]));
    server = r.entries; store('kk-cache', server);
    entries = applyPending(server);
    if (!firstSync || prev.size){
      const news = server.filter(e => e.by && e.by !== ME() && known(e) && (!prev.has(e.id) || prev.get(e.id).ts !== e.ts));
      const last = news.sort((a,b) => (a.ts||0) - (b.ts||0)).pop();
      if (last && P[last.by]) toast('Кто когда', `${P[last.by].name} ${verb(last.by, prev.has(last.id) ? 'изменил' : 'добавил')}: ${last.what}, ${fmtRange(last.from,last.to)}`);
    }
    firstSync = false;
    setSync('');
    render();
  } catch(e){
    if (e.auth){ auth.key = ''; store('kk-auth', auth); openLogin('Код семьи не подошёл — введите снова.'); }
    else setSync(pending.length ? `Не отправлено: ${pending.length}` : 'Офлайн');
  } finally {
    syncing = false;
    if (again){ again = false; sync(); }
  }
}

/* ---------- состояние вида ---------- */
const state = { y:TODAY.getFullYear(), m:TODAY.getMonth(), sy:TODAY.getFullYear(), sm:TODAY.getMonth(), sel:TODAY_K, view:'month', visible:new Set(PEOPLE.map(p=>p.id)) };
let styleName = load('kk-style', 's1');
if (!['s1','s2','s3'].includes(styleName)) styleName = 's1';
function applyStyle(){
  document.body.classList.remove('s1','s2','s3'); document.body.classList.add(styleName);
  document.querySelectorAll('#seg button').forEach(b => b.setAttribute('aria-pressed', b.dataset.style === styleName));
}
applyStyle();
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
function setMonth(y,m){
  if (m < 0){ m = 11; y--; } if (m > 11){ m = 0; y++; }
  state.y = y; state.m = m;
  state.sel = (y === TODAY.getFullYear() && m === TODAY.getMonth()) ? TODAY_K : key(new Date(y,m,1));
}

/* ---------- отрисовка ---------- */
function renderPeople(){
  $('people').innerHTML = PEOPLE.map(p =>
    `<button class="chip press" style="--c:${p.color}" data-person="${p.id}" aria-pressed="${state.visible.has(p.id)}"><span class="dot"></span>${p.name}</button>`).join('');
}

function renderMonth(){
  const {y,m} = state, map = busyMap(), V = vis();
  const offset = (new Date(y,m,1).getDay()+6)%7, dim = new Date(y,m+1,0).getDate();
  const cells = Math.ceil((offset+dim)/7)*7;
  let h = '';
  for (let i=0; i<cells; i++){
    const d = new Date(y,m,1-offset+i), k = key(d), b = map[k] || {};
    const busy = V.filter(p => b[p.id]);
    const free = V.length > 0 && !busy.length;
    const cls = ['day press', d.getMonth()!==m && 'out', k<TODAY_K && 'past', k===TODAY_K && 'today', k===state.sel && 'sel',
                 free && 'free', busy.length && 'filled', i%7===6 && 'sun'].filter(Boolean).join(' ');
    const lbl = `${d.getDate()} ${MONTHS_G[d.getMonth()]}${busy.length ? ', заняты: '+joinNames(busy.map(p=>p.id)) : free ? ', все свободны' : ''}`;
    h += `<button class="${cls}" data-date="${k}" aria-label="${lbl}">${bands(busy)}<span class="n">${d.getDate()}</span></button>`;
  }
  $('grid').innerHTML = h;
  renderDay();
}

function evHTML(e){
  return `<button class="ev press" data-edit="${e.id}">
    <span class="caps">${e.who.map(w => `<i style="--c:${P[w].color}"></i>`).join('')}</span>
    <span><div class="what">${esc(e.what)}</div><div class="meta">${joinNames(e.who)}, ${fmtRange(e.from,e.to)}</div></span>
    <svg class="chev" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg></button>`;
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
  g.className = 'yg' + (n === 6 ? ' half' : '');
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
function settingsHTML(){
  if (!ONLINE) return `<div class="set">
      <div class="setRow"><div><div class="k">Демо-режим</div><div class="v">Данные хранятся только на этом устройстве</div></div></div>
      <div class="setRow"><div class="k">Тестовые данные</div><button class="lnk press" data-act="reset">Вернуть</button></div></div>`;
  const pushNote = pushOn ? 'Придут, когда кто-то добавит или изменит дело'
    : (isIOS && !standalone) ? 'На iPhone сначала: Поделиться → «На экран Домой», потом откройте оттуда'
    : 'Пуш, когда кто-то добавит или изменит дело';
  return `<div class="set">
      <div class="setRow"><div><div class="k">Вы — ${esc(P[ME()].name)}</div><div class="v">${pending.length ? `Не отправлено изменений: ${pending.length}` : 'Всё синхронизировано'}</div></div><button class="lnk press" data-act="login">Сменить</button></div>
      <div class="setRow"><div><div class="k">Уведомления</div><div class="v">${pushNote}</div></div><button class="lnk press${pushOn ? ' on' : ''}" data-act="push">${pushOn ? 'Включены' : 'Включить'}</button></div></div>`;
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
  const v = state.view;
  $('vMonth').hidden = v !== 'month';
  const multi = v === 'half' || v === 'year';
  document.body.classList.toggle('multi', multi);
  $('vYear').hidden = !multi;
  $('vList').hidden = v !== 'list';
  $('people').hidden = v === 'list';
  $('hb').style.visibility = v === 'list' ? 'hidden' : 'visible';
  $('yr').style.visibility = v === 'list' ? 'hidden' : 'visible';
  $('yr').querySelector('svg').style.display = v === 'month' ? '' : 'none';
  document.querySelectorAll('.tab').forEach(t => t.setAttribute('aria-selected', t.dataset.view === v));
  if (v !== 'list') renderPeople();
  if (v === 'month'){
    $('yrText').textContent = state.y;
    $('title').textContent = MONTHS[state.m];
    renderMonth();
  } else if (multi){
    $('title').textContent = v === 'half' ? 'Полгода' : 'Год';
    $('yrText').textContent = renderMulti(v === 'half' ? 6 : 12);
  } else {
    $('title').textContent = 'Ближайшее';
    renderList();
  }
}

/* ---------- шторка ---------- */
let sheetLocked = false;
function openSheet(html, locked){ sheetLocked = !!locked; $('sheetBody').innerHTML = html; $('sheet').classList.add('open'); $('backdrop').classList.add('open'); }
function closeSheet(){ if (sheetLocked) return; $('sheet').classList.remove('open'); $('backdrop').classList.remove('open'); }
$('backdrop').addEventListener('click', closeSheet);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeSheet(); });

let form = null;
function openForm(e, date){
  const isEdit = !!e;
  form = isEdit ? {id:e.id, who:new Set(e.who), from:e.from, to:e.to, what:e.what}
                : {id:null, who:new Set([ME()]), from:date||TODAY_K, to:date||TODAY_K, what:''};
  openSheet(`<h2>${isEdit ? 'Изменить дело' : 'Новое дело'}</h2>
    <label class="f">Кто занят</label>
    <div class="whoPick">${PEOPLE.map(p => `<button type="button" class="chip press" style="--c:${p.color}" data-pick="${p.id}" aria-pressed="${form.who.has(p.id)}"><span class="dot"></span>${p.name}</button>`).join('')}</div>
    <div class="row2">
      <div><label class="f" for="fFrom">С</label><input class="in" type="date" id="fFrom" value="${form.from}"></div>
      <div><label class="f" for="fTo">По</label><input class="in" type="date" id="fTo" value="${form.to}"></div>
    </div>
    <label class="f" for="fWhat">Что за дело</label>
    <input class="in" id="fWhat" maxlength="60" placeholder="Например: сборы, Казань" value="${esc(form.what)}">
    <div class="err" id="fErr"></div>
    <button class="btn press" data-act="save">Сохранить</button>
    ${isEdit ? '<button class="btn ghost press" data-act="delete">Удалить</button>' : ''}`);
}
function saveForm(){
  const from = $('fFrom').value, to = $('fTo').value, what = $('fWhat').value.trim(), err = $('fErr');
  if (!form.who.size) return err.textContent = 'Отметьте, кто занят.';
  if (!from || !to) return err.textContent = 'Укажите обе даты.';
  if (to < from) return err.textContent = 'Дата «по» раньше даты «с».';
  if (!what) return err.textContent = 'Напишите, что за дело.';
  const who = PEOPLE.map(p => p.id).filter(id => form.who.has(id));
  const wasEdit = !!form.id;
  const entry = {id: form.id || newId(), who, from, to, what, by: ME()};
  const note = `${P[ME()].name} ${verb(ME(), wasEdit ? 'изменил' : 'добавил')}: ${what}, ${fmtRange(from,to)}`;
  commit({op:'put', entry, note});
  sheetLocked = false; closeSheet();
  const others = PEOPLE.filter(p => p.id !== ME()).map(p => p.name).join(', ');
  toast(ONLINE ? `Уведомление получат: ${others}` : 'Демо-режим', `${wasEdit ? 'Изменено' : 'Добавлено'}: ${what}, ${fmtRange(from,to)}`);
  const d = parse(from); state.y = d.getFullYear(); state.m = d.getMonth(); state.sel = from;
  if (state.view !== 'list') state.view = 'month';
  render();
}
function deleteForm(){
  const e = entries.find(x => x.id === form.id);
  commit({op:'del', id:form.id, note: e ? `${P[ME()].name} ${verb(ME(),'удалил')}: ${e.what}, ${fmtRange(e.from,e.to)}` : ''});
  closeSheet(); render(); toast('Удалено', 'Дело убрано из календаря');
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
  auth.me = loginWho; store('kk-auth', auth);
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
      const vapid = CONFIG.VAPID_PUBLIC || (await api('GET','/ping')).vapid;
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
  if (d.style){ styleName = d.style; store('kk-style', styleName); applyStyle(); return; }
  if (d.person){ state.visible.has(d.person) ? state.visible.delete(d.person) : state.visible.add(d.person); render(); return; }
  if (d.pick){ form.who.has(d.pick) ? form.who.delete(d.pick) : form.who.add(d.pick); t.setAttribute('aria-pressed', form.who.has(d.pick)); return; }
  if (d.me){ loginWho = d.me; document.querySelectorAll('[data-me]').forEach(b => b.setAttribute('aria-pressed', b.dataset.me === loginWho)); return; }
  if (d.date){
    const dt = parse(d.date), fromYear = state.view === 'year' || state.view === 'half';
    state.y = dt.getFullYear(); state.m = dt.getMonth(); state.sel = d.date; state.view = 'month';
    render(); if (fromYear) window.scrollTo(0,0);
    return;
  }
  if (d.edit){ const e = entries.find(x => x.id === d.edit); if (e) openForm(e); return; }
  if (d.view){
    if (d.view === 'half' || d.view === 'year'){ state.sy = TODAY.getFullYear(); state.sm = TODAY.getMonth(); }
    state.view = d.view; render(); window.scrollTo(0,0);
    return;
  }
  if (d.ym){ const [yy,mm] = d.ym.split('-').map(Number); setMonth(yy, mm); state.view = 'month'; render(); window.scrollTo(0,0); return; }
  if (d.goto){ const g = parse(d.goto); state.y = g.getFullYear(); state.m = g.getMonth(); state.sel = d.goto; state.view = 'month'; render(); window.scrollTo(0,0); return; }
  switch (d.act){
    case 'prev': case 'next': {
      const n = d.act === 'next' ? 1 : -1;
      if (!shiftMulti(n)) setMonth(state.y, state.m + n);
      render(); break;
    }
    case 'today': state.y = state.sy = TODAY.getFullYear(); state.m = state.sm = TODAY.getMonth(); state.sel = TODAY_K; render(); break;
    case 'toYear': if (state.view === 'month'){ state.sy = TODAY.getFullYear(); state.sm = TODAY.getMonth(); state.view = 'year'; render(); window.scrollTo(0,0); } break;
    case 'add': openForm(null, state.view === 'month' ? state.sel : null); break;
    case 'save': saveForm(); break;
    case 'delete': deleteForm(); break;
    case 'reset': entries = demo(); store('kk-v1', entries); render(); toast('Готово', 'Тестовые данные восстановлены'); break;
    case 'login': openLogin(); break;
    case 'doLogin': doLogin(); break;
    case 'push': pushOn ? unsubscribePush() : subscribePush(true); break;
  }
});

function shiftMulti(dir){
  if (state.view !== 'half' && state.view !== 'year') return false;
  const step = (state.view === 'half' ? 6 : 12) * dir;
  const t = state.sy*12 + state.sm + step;
  state.sy = Math.floor(t/12); state.sm = ((t%12)+12)%12;
  return true;
}
let sx = null, sy = null;
['grid','yearGrid'].forEach(id => {
  $(id).addEventListener('touchstart', e => { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, {passive:true});
  $(id).addEventListener('touchend', e => {
    if (sx === null) return;
    const dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy; sx = null;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)){
      const n = dx < 0 ? 1 : -1;
      if (!shiftMulti(n)) setMonth(state.y, state.m + n);
      render();
    }
  });
});

/* ---------- запуск ---------- */
if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').then(() => ONLINE && refreshPushState()).catch(() => {});
render();
if (ONLINE){
  if (!auth.key || !auth.me) openLogin();
  else sync();
  setInterval(() => { if (document.visibilityState === 'visible') sync(); }, 30000);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState !== 'visible') return;
    const was = TODAY_K; setToday(); if (was !== TODAY_K) render();
    sync();
  });
  addEventListener('online', sync);
} else {
  setTimeout(() => toast('Демо-режим', 'Заполните API_URL в app.js, чтобы включить синхронизацию'), 1200);
}
