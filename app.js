import { WORDS } from "./data/words.js";
import { AWL } from "./data/awl.js";
import { L7000 } from "./data/l7000.js";
import { TOEFL, TOEFL_THEMES } from "./data/toefl.js";
import { PHRASES, PHRASE_GROUPS } from "./data/phrases.js";
import { GRAMMAR } from "./data/grammar.js";
import { READINGS, WRITING } from "./data/articles.js";

/* ================= 儲存 ================= */
const KEY = "iee:v1";
const DAY = 86400000;
const NEW_PER_DAY = 40;
const defaults = () => ({
  cards: {}, custom: [], customQs: [], mistakes: [], past: [], flags: {}, del: { past: {}, mist: {} },
  streak: { last: "", n: 0 }, log: {},
  settings: { geminiKey: "", model: "gemini-3.8-flash", newPerDay: NEW_PER_DAY },
});
let S = load();
function load() {
  try { return Object.assign(defaults(), JSON.parse(localStorage.getItem(KEY)) || {}); }
  catch { return defaults(); }
}
// 舊預設模型已停用，自動換成新的
if (S.settings.model === "gemini-2.5-flash") S.settings.model = "gemini-3.8-flash";
if (!S.settings.v2) { if (S.settings.newPerDay === 20) S.settings.newPerDay = NEW_PER_DAY; S.settings.v2 = 1; }
function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch {} schedulePush(); }
S.del ||= { past: {}, mist: {} };
if (navigator.storage?.persist) navigator.storage.persist();

const today = () => new Date().toLocaleDateString("sv"); // YYYY-MM-DD
const esc = (s = "") => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const $ = sel => document.querySelector(sel);
/* ---- 單字庫：依優先順序排列（新卡會照這個順序出） ---- */
const DECKS = [
  { id: "MINE", name: "我的單字", desc: "上傳考卷挑出 + 手動新增", pri: 0 },
  { id: "PH", name: "片語", desc: "同動詞分組 · 片語填空", pri: 1 },
  { id: "L7000", name: "高中 7000（L5–6）", desc: "台科主力、臺清交基礎 · 例句由 AI 補", pri: 1 },
  { id: "AWL", name: "AWL 學術字彙", desc: "570 字族 · 四校共通核心", pri: 2 },
  { id: "TOEFL", name: "托福核心", desc: "依閱讀常見主題分類", pri: 3 },
  { id: "IE", name: "工工領域", desc: "閱讀常見專業術語", pri: 4 },
];
const PRI = Object.fromEntries(DECKS.map(d => [d.id, d.pri]));
const extra = Object.fromEntries(WORDS.filter(w => w.tag === "AWL").map(w => [w.w, w]));
// 重複字的歸屬：AWL > 托福 > 工工 > 高中 7000（前面的有例句）
const BASE = (() => {
  const seen = new Map(), out = [];
  const awl = AWL.map(a => ({ ...a, ...(extra[a.w] ? { syn: extra[a.w].syn, col: extra[a.w].col, root: extra[a.w].root } : {}) }));
  const others = WORDS.filter(w => w.tag !== "AWL").map(w => w.tag === "TOEFL" ? { ...w, sub: 0 } : w);
  for (const w of [...awl, ...TOEFL, ...PHRASES, ...others, ...L7000]) {
    const k = w.w.toLowerCase();
    if (!seen.has(k)) { seen.set(k, w); out.push(w); }
  }
  return out;
})();
const SUBS = {
  AWL: [...Array(10)].map((_, i) => [i + 1, `Sublist ${i + 1}`]),
  L7000: [[5, "Level 5"], [6, "Level 6"]],
  TOEFL: [...TOEFL_THEMES.map((t, i) => [i, t]).slice(1), [0, "綜合"]],
  PH: [...PHRASE_GROUPS.map((g, i) => [i + 1, g === "academic" ? "學術搭配" : g]), [0, "我的片語"]],
};
const norm = t => String(t || "").trim().toLowerCase().replace(/\s+/g, " ");
const findWord = t => allWords().find(w => norm(w.w) === norm(t));
// 歷屆錯的字：字庫已有 → 直接排入「現在」複習並標記，不重複新增
function reviewNow(word, src, past = true) {
  const c = S.cards[word] || { ease: 2.5, ivl: 0, reps: 0, lapses: 0 };
  c.due = Date.now(); c.lapses = (c.lapses || 0) + 1; c.ease = Math.max(1.3, (c.ease || 2.5) - 0.2); c.ivl = 0; c.reps = 0;
  delete c.known;
  c.u = Date.now();
  S.cards[word] = c;
  if (past) S.flags[word] = { past: 1, src: src || (S.flags[word]?.src) || "" };
}
const allWords = () => {
  const base = new Set(BASE.map(w => w.w));
  return [...S.custom.filter(w => !base.has(w.w)), ...BASE]
    .sort((a, b) => (PRI[a.tag] ?? 9) - (PRI[b.tag] ?? 9) || (a.sub || 99) - (b.sub || 99));
};
const inDeck = (w, deck) => {
  if (!deck || deck === "ALL") return true;
  const [id, n] = deck.split("_");
  return w.tag === id && (n === undefined || w.sub === +n);
};
const shuffle = a => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.random() * (i + 1) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; };

function touchStreak() {
  const t = today();
  S.log[t] = (S.log[t] || 0) + 1;
  if (S.streak.last !== t) {
    const y = new Date(Date.now() - DAY).toLocaleDateString("sv");
    S.streak.n = S.streak.last === y ? S.streak.n + 1 : 1;
    S.streak.last = t;
  }
}
function addMistake(m) {
  S.mistakes = S.mistakes.filter(x => x.q !== m.q);
  S.mistakes.unshift({ ...m, t: Date.now() });
  S.mistakes = S.mistakes.slice(0, 300);
}

/* ================= SRS（簡化 SM-2） ================= */
// r: 0 不會, 1 模糊, 2 會, 3 太簡單
function rate(word, r) {
  const c = S.cards[word] || { ease: 2.5, ivl: 0, reps: 0, lapses: 0, due: 0 };
  if (r === 0) { c.ease = Math.max(1.3, c.ease - 0.2); c.ivl = 0; c.reps = 0; c.lapses++; }
  else if (r === 1) { c.ease = Math.max(1.3, c.ease - 0.15); c.ivl = Math.max(1, c.ivl * 1.2); c.reps++; }
  else if (r === 2) { c.ivl = c.reps === 0 ? 1 : c.reps === 1 ? 3 : c.ivl * c.ease; c.reps++; }
  else { c.ease += 0.15; c.ivl = Math.max(4, (c.ivl || 1) * c.ease * 1.3); c.reps++; }
  c.due = r === 0 ? Date.now() + 60000 : Date.now() + c.ivl * DAY;
  c.u = Date.now();
  S.cards[word] = c;
  touchStreak(); save();
}
function deckStats(deck) {
  const ws = allWords().filter(w => inDeck(w, deck));
  let learned = 0, mastered = 0;
  for (const w of ws) { const c = S.cards[w.w]; if (c) { learned++; if (c.ivl >= 21) mastered++; } }
  return { total: ws.length, learned, mastered };
}
function newIntroducedToday() {
  return Object.values(S.cards).filter(c => c.first === today()).length;
}
function stats() {
  const now = Date.now(), ws = allWords();
  let due = 0, learned = 0, mastered = 0;
  for (const w of ws) {
    const c = S.cards[w.w];
    if (!c) continue;
    learned++;
    if (c.due <= now) due++;
    if (c.ivl >= 21) mastered++;
  }
  const newLeft = Math.max(0, S.settings.newPerDay - newIntroducedToday());
  return { total: ws.length, due, learned, mastered, newAvail: Math.min(newLeft, ws.length - learned) };
}
function buildQueue(tag) {
  const now = Date.now();
  let ws = allWords();
  ws = ws.filter(w => inDeck(w, tag));
  const due = ws.filter(w => S.cards[w.w] && S.cards[w.w].due <= now).sort((a, b) => S.cards[a.w].due - S.cards[b.w].due);
  const newLeft = Math.max(0, S.settings.newPerDay - newIntroducedToday());
  const unseen = ws.filter(w => !S.cards[w.w]);
  let fresh = unseen.slice(0, newLeft);
  if (!tag || tag === "ALL") {
    // 全部模式：各字庫交錯出新字（我的單字 3 : 7000 2 : AWL 2 : 片語 1 : 托福 1 : 工工 1）
    const W = { MINE: 3, L7000: 2, AWL: 2, PH: 1, TOEFL: 1, IE: 1 };
    const pools = Object.keys(W).map(k => unseen.filter(w => w.tag === k));
    fresh = [];
    while (fresh.length < newLeft && pools.some(p => p.length))
      Object.keys(W).forEach((k, i) => { for (let j = 0; j < W[k] && pools[i].length && fresh.length < newLeft; j++) fresh.push(pools[i].shift()); });
  }
  return [...due, ...fresh];
}

/* ================= 雲端同步（GitHub Gist） ================= */
// 進度存在你 GitHub 帳號的一個私密 Gist；手機、平板都讀寫同一份，打開時自動合併
const GIST_FILE = "ie-english-progress.json", GIST_DESC = "ie-english-sync（工工所英文進度，請勿刪除）";
const gh = () => S.settings.gh || {};
let pushTimer = null, syncing = false;
function schedulePush() {
  if (!gh().token || syncing) return;
  clearTimeout(pushTimer);
  pushTimer = setTimeout(() => syncNow(), 4000);
}
async function ghFetch(path, opt = {}) {
  const r = await fetch(`https://api.github.com${path}`, {
    ...opt, headers: { Accept: "application/vnd.github+json", Authorization: `Bearer ${gh().token}`, ...(opt.body ? { "Content-Type": "application/json" } : {}) },
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(r.status === 401 ? "Token 無效或已過期" : r.status === 404 ? "找不到同步檔（Token 需要 gist 權限）" : (j.message || `HTTP ${r.status}`));
  return j;
}
// 只同步學習資料，不同步 Key 等設定
const payload = st => ({ v: 1, cards: st.cards, custom: st.custom, customQs: st.customQs, mistakes: st.mistakes, past: st.past, flags: st.flags, del: st.del, log: st.log, streak: st.streak, exCache: st.exCache || {} });
function merge(a, b) {
  const out = { ...a };
  out.cards = { ...b.cards };
  for (const [k, c] of Object.entries(a.cards || {})) { const o = out.cards[k]; if (!o || (c.u || 0) > (o.u || 0) || ((c.u || 0) === (o.u || 0) && (c.reps || 0) >= (o.reps || 0))) out.cards[k] = c; }
  const del = { past: { ...b.del?.past, ...a.del?.past }, mist: { ...b.del?.mist, ...a.del?.mist } };
  out.del = del;
  const uni = (x, y, key) => { const m = new Map(); for (const i of [...(y || []), ...(x || [])]) m.set(key(i), i); return [...m.values()]; };
  out.custom = uni(a.custom, b.custom, w => norm(w.w));
  out.customQs = uni(a.customQs, b.customQs, q => q.q);
  out.past = uni(a.past, b.past, p => p.id).filter(p => !del.past[p.id]).sort((x, y) => y.t - x.t);
  const mm = new Map();
  for (const m of [...(b.mistakes || []), ...(a.mistakes || [])]) { const o = mm.get(m.q); if (!o || m.t > o.t) mm.set(m.q, m); }
  out.mistakes = [...mm.values()].filter(m => !(del.mist[m.q] >= m.t)).sort((x, y) => y.t - x.t).slice(0, 300);
  out.flags = { ...b.flags, ...a.flags };
  out.exCache = { ...b.exCache, ...a.exCache };
  out.log = { ...b.log }; for (const [d, n] of Object.entries(a.log || {})) out.log[d] = Math.max(n, out.log[d] || 0);
  const sa = a.streak || {}, sb = b.streak || {};
  out.streak = (sb.last || "") > (sa.last || "") ? sb : (sa.last === sb.last ? { last: sa.last, n: Math.max(sa.n || 0, sb.n || 0) } : sa);
  return out;
}
async function findGist() {
  for (let page = 1; page <= 5; page++) {
    const list = await ghFetch(`/gists?per_page=100&page=${page}`);
    const g = list.find(x => x.files?.[GIST_FILE]);
    if (g) return g.id;
    if (list.length < 100) break;
  }
  return null;
}
async function readGist(id) {
  const g = await ghFetch(`/gists/${id}`);
  const f = g.files?.[GIST_FILE];
  if (!f) return null;
  let text = f.content;
  if (f.truncated) text = await (await fetch(f.raw_url)).text();
  return JSON.parse(text || "{}");
}
// 拉下雲端 → 合併 → 推回去
async function syncNow(manual) {
  if (!gh().token || syncing) return;
  syncing = true; clearTimeout(pushTimer);
  const set = st => { S.settings.gh = { ...gh(), ...st }; localStorage.setItem(KEY, JSON.stringify(S)); updSyncBadge(); };
  try {
    set({ state: "syncing" });
    let id = gh().gistId || await findGist();
    const remote = id ? await readGist(id) : null;
    const before = JSON.stringify(payload(S));
    if (remote) Object.assign(S, merge(payload(S), remote));
    const body = JSON.stringify({ description: GIST_DESC, files: { [GIST_FILE]: { content: JSON.stringify(payload(S)) } } });
    if (id) await ghFetch(`/gists/${id}`, { method: "PATCH", body });
    else id = (await ghFetch(`/gists`, { method: "POST", body: body.replace("{\"description\"", "{\"public\":false,\"description\"") })).id;
    set({ gistId: id, state: "ok", at: Date.now(), err: "" });
    if (manual) toast("已同步");
    if (remote && JSON.stringify(payload(S)) !== before && !document.querySelector("#fc")) render(); // 有新資料就重畫（刷卡中不打斷）
  } catch (e) {
    set({ state: "err", err: e.message });
    if (manual) toast("同步失敗：" + e.message);
  } finally { syncing = false; }
}
function updSyncBadge() {
  const b = document.querySelector("#syncstat"); if (!b) return;
  const g = gh();
  b.innerHTML = !g.token ? "尚未設定" : g.state === "syncing" ? "同步中…" : g.state === "err" ? `<span class="badt">失敗：${esc(g.err)}</span>`
    : g.at ? `✓ 已同步 ${new Date(g.at).toLocaleTimeString("zh-TW", { hour: "2-digit", minute: "2-digit" })}` : "";
}
document.addEventListener("visibilitychange", () => { if (!gh().token) return; document.visibilityState === "visible" ? syncNow() : (clearTimeout(pushTimer), syncNow()); });

/* ================= 發音 ================= */
function speak(text) {
  if (!("speechSynthesis" in window)) return;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "en-US"; u.rate = 0.9;
  speechSynthesis.speak(u);
}
window.speak = speak;

/* ================= 路由 ================= */
const routes = { home: Home, vocab: Vocab, grammar: Grammar, read: Read, import: Import, phrase: Phrase, past: Past, add: AddWord };
function render() {
  const [name, ...args] = (location.hash.replace(/^#\/?/, "") || "home").split(/[\/-]/);
  const view = routes[name] || Home;
  document.querySelectorAll("nav.tabs a").forEach(a => a.classList.toggle("on", a.dataset.r === ({ import: "past", add: "vocab", phrase: "vocab" }[name] || name)));
  $("#app").innerHTML = "";
  $("#app").scrollTop = 0; window.scrollTo(0, 0);
  view($("#app"), ...args.map(decodeURIComponent));
}
window.addEventListener("hashchange", render);
const go = h => { location.hash = h; };

/* ================= 首頁 ================= */
function Home(el) {
  const s = stats();
  const pct = s.total ? Math.round(s.mastered / s.total * 100) : 0;
  const week = [...Array(7)].map((_, i) => {
    const d = new Date(Date.now() - (6 - i) * DAY).toLocaleDateString("sv");
    return { d: d.slice(5), n: S.log[d] || 0 };
  });
  const max = Math.max(10, ...week.map(x => x.n));
  el.innerHTML = `
    <header class="hero">
      <div class="eyebrow">工工所英文 · 目標 80+</div>
      <h1>今天也來刷一輪</h1>
      <div class="streak">🔥 連續 <b>${S.streak.n}</b> 天</div>
    </header>
    <section class="stats">
      <div class="stat"><b>${s.due}</b><span>待複習</span></div>
      <div class="stat"><b>${s.newAvail}</b><span>今日新字</span></div>
      <div class="stat"><b>${s.learned}</b><span>已學</span></div>
      <div class="stat"><b>${pct}%</b><span>熟練</span></div>
    </section>
    <button class="cta" onclick="location.hash='#vocab-cards'">開始刷單字 · ${s.due + s.newAvail} 張</button>
    <section class="card-box">
      <h3>本週練習</h3>
      <div class="bars">${week.map(x => `<div class="bar"><i style="height:${x.n / max * 100}%"></i><span>${x.d}</span></div>`).join("")}</div>
    </section>
    <section class="grid2">
      <a class="tile" href="#grammar"><span>✍️</span><b>文法刷題</b><small>${GRAMMAR.length} 個考點</small></a>
      <a class="tile" href="#read"><span>📖</span><b>文章練習</b><small>閱讀 · 寫作架構</small></a>
      <a class="tile" href="#phrase"><span>🧩</span><b>片語填空</b><small>take on / take over…</small></a>
      <a class="tile" href="#past"><span>📚</span><b>歷屆錯題</b><small>${S.past.length} 題 · 上傳考卷</small></a>
      <a class="tile" href="#vocab-quiz"><span>🎯</span><b>單字選擇題</b><small>模擬考題</small></a>
      <a class="tile" href="#add"><span>➕</span><b>手動新增</b><small>單字 / 片語</small></a>
    </section>
    <section class="card-box">
      <h3>錯題本 <small>${S.mistakes.length} 題</small></h3>
      ${S.mistakes.length ? `<button class="ghost" onclick="location.hash='#grammar-mistakes'">重刷錯題</button>
        <ul class="mlist">${S.mistakes.slice(0, 5).map(m => `<li><span class="pill">${esc(m.kind)}</span>${esc(m.q)}</li>`).join("")}</ul>`
        : `<p class="muted">答錯的題目會自動收進這裡。</p>`}
    </section>
    <section class="card-box">
      <h3>☁️ 手機 / 平板同步 <small id="syncstat"></small></h3>
      ${gh().token ? `<p class="muted small">已連線 GitHub。打開 App、離開 App、刷完卡幾秒後都會自動同步。</p>
        <div class="row"><button class="ghost" id="syncnow">立即同步</button><button class="ghost" id="syncoff">中斷連線</button></div>`
      : `<p class="muted small">用你的 GitHub 帳號存一份私密的進度檔，手機和平板<b>都要</b>各設定一次同一個 Token。</p>
        <ol class="small steps"><li><a href="https://github.com/settings/tokens/new?scopes=gist&description=ie-english-sync" target="_blank" rel="noopener">點這裡建立 Token</a>（已幫你勾好 <b>gist</b> 權限）</li>
        <li>Expiration 建議選 <b>No expiration</b> 或考完試之後的日期 → 拉到最下面按 <b>Generate token</b></li>
        <li>複製 <code>ghp_</code> 開頭的那串，貼到下面</li></ol>
        <input class="search" id="ghtoken" type="password" placeholder="貼上 GitHub Token（ghp_…）" autocomplete="off">
        <button class="cta" id="syncon">連線並同步</button>`}
    </section>
    <section class="card-box">
      <h3>資料備份</h3>
      <p class="muted">進度存在這台裝置上（有開同步的話雲端也有一份）。建議偶爾匯出一次備份。</p>
      <div class="row"><button class="ghost" id="exp">匯出備份</button><label class="ghost file">匯入備份<input type="file" id="imp" accept=".json" hidden></label></div>
    </section>`;
  updSyncBadge();
  if ($("#syncon")) $("#syncon").onclick = async () => {
    const t = $("#ghtoken").value.trim();
    if (!/^(ghp_|github_pat_|gho_)/.test(t)) return toast("Token 格式不對，應該是 ghp_ 開頭");
    S.settings.gh = { token: t }; save();
    $("#syncon").disabled = true; $("#syncon").textContent = "連線中…";
    await syncNow(true);
    render();
  };
  if ($("#syncnow")) $("#syncnow").onclick = () => syncNow(true);
  if ($("#syncoff")) $("#syncoff").onclick = () => { delete S.settings.gh; save(); toast("已中斷同步（雲端的進度檔還在）"); render(); };
  $("#exp").onclick = () => {
    const a = document.createElement("a");
    const data = { ...S, settings: { ...S.settings, geminiKey: "", gh: undefined } };
    a.href = URL.createObjectURL(new Blob([JSON.stringify(data)], { type: "application/json" }));
    a.download = `ie-english-backup-${today()}.json`; a.click();
  };
  $("#imp").onchange = async e => {
    const f = e.target.files[0]; if (!f) return;
    try { const d = JSON.parse(await f.text()); const key = S.settings.geminiKey, gh0 = S.settings.gh; S = Object.assign(defaults(), d); S.settings.geminiKey ||= key; S.settings.gh = gh0; save(); toast("已匯入備份"); render(); }
    catch { toast("檔案格式錯誤"); }
  };
}

/* ================= 單字 ================= */
const deckName = w => {
  if (S.flags?.[w.w]?.past) return "歷屆錯" + (S.flags[w.w].src ? " · " + S.flags[w.w].src : "");
  const sub = SUBS[w.tag]?.find(([n]) => n === w.sub)?.[1];
  const short = { AWL: "AWL", L7000: "7000", TOEFL: "托福", IE: "工工", MINE: "我的單字", PH: "片語" }[w.tag] || w.tag;
  return sub ? `${short} · ${sub}` : short;
};
function Vocab(el, mode, deck = "ALL") {
  if (mode === "cards") return Flash(el, deck);
  if (mode === "quiz") return VocabQuiz(el, deck);
  if (mode && mode !== "list") deck = mode;
  const ws = allWords();
  const deckRows = DECKS.map(d => {
    const st = deckStats(d.id);
    const pct = st.total ? Math.round(st.learned / st.total * 100) : 0;
    return `<li class="deck ${deck.split("_")[0] === d.id ? "on" : ""}" data-d="${d.id}">
      <div class="dtop"><b>${esc(d.name)}</b><small>${st.total ? `${st.learned}/${st.total}` : "準備中"}</small></div>
      <div class="muted small">${esc(d.desc)}</div>
      <div class="prog thin"><i style="width:${pct}%"></i></div></li>`;
  }).join("");
  const root = deck.split("_")[0];
  el.innerHTML = `
    <h2 class="title">單字</h2>
    <ul class="decks" id="decks"><li class="deck ${deck === "ALL" ? "on" : ""}" data-d="ALL"><div class="dtop"><b>全部（依優先順序）</b><small>${ws.length} 字</small></div></li>${deckRows}</ul>
    ${SUBS[root] ? `<div class="chips" id="subs"><button class="chip ${deck === root ? "on" : ""}" data-d="${root}">全部</button>${SUBS[root].map(([n, name]) => `<button class="chip ${deck === root + "_" + n ? "on" : ""}" data-d="${root}_${n}">${esc(name)}</button>`).join("")}</div>` : ""}
    <div class="row">
      <button class="cta half" id="go-cards">翻卡複習</button>
      <button class="cta half alt" id="go-quiz">選擇題</button>
    </div>
    <a class="ghost block" href="#add">＋ 手動新增單字 / 片語</a>
    <div class="setting"><span>每日新字</span><select id="npd">${[20, 40, 60, 80, 100].map(n => `<option ${S.settings.newPerDay === n ? "selected" : ""}>${n}</option>`).join("")}</select></div>
    <input class="search" id="q" placeholder="搜尋單字或中文…">
    <ul class="wlist" id="wl"></ul>`;
  const pick = d => location.hash = `#vocab-list-${d}`;
  $("#decks").onclick = e => { const li = e.target.closest(".deck"); if (li) pick(li.dataset.d); };
  if ($("#subs")) $("#subs").onclick = e => { const b = e.target.closest(".chip"); if (b) pick(b.dataset.d); };
  $("#go-cards").onclick = () => location.hash = `#vocab-cards-${deck}`;
  $("#go-quiz").onclick = () => location.hash = `#vocab-quiz-${deck}`;
  $("#npd").onchange = e => { S.settings.newPerDay = +e.target.value; save(); toast(`每日新字改為 ${e.target.value}`); };
  const draw = () => {
    const q = $("#q").value.trim().toLowerCase();
    const list = ws.filter(w => inDeck(w, deck) && (!q || w.w.toLowerCase().includes(q) || w.zh.includes(q)));
    $("#wl").innerHTML = list.slice(0, 150).map(w => {
      const c = S.cards[w.w];
      const lv = !c ? "new" : c.ivl >= 21 ? "good" : c.lapses > 1 ? "bad" : "mid";
      return `<li><i class="dot ${lv}"></i><div><b>${esc(w.w)}</b> <small>${esc(w.pos)}</small><div class="muted">${esc(w.zh)}</div></div><button class="icon" onclick="speak(${esc(JSON.stringify(w.w))})">🔊</button></li>`;
    }).join("") + (list.length > 150 ? `<p class="muted center small">還有 ${list.length - 150} 個，請用搜尋</p>` : "")
      || `<p class="muted center">${deck === "L7000" ? "高中 7000 字庫準備中" : "沒有符合的單字"}</p>`;
  };
  $("#q").oninput = draw; draw();
}

// 滑動方向 → 分級：← 不會、↓ 模糊、→ 會、↑ 太簡單
const SWIPE = { left: 0, down: 1, right: 2, up: 3 };
const DIR_OF = ["left", "down", "right", "up"];
const RATE_TXT = ["不會", "模糊", "會", "太簡單"];
function cardFront(w, isNew) {
  return `${isNew ? `<span class="pill new">NEW</span>` : ""}<span class="pill ${S.flags?.[w.w]?.past ? "badc" : ""}">${esc(deckName(w))}</span>
    <div class="word">${esc(w.w)}</div><div class="pos">${esc(w.pos)}</div>`;
}
function swipeHelp() {
  const d = document.createElement("div");
  d.className = "modal";
  d.innerHTML = `<div class="sheet">
    <h3>四種分級怎麼用</h3>
    <div class="dirs">
      <div><b class="c3">↑ 上滑｜太簡單</b><span>一看就會、以後很少需要看 → 間隔拉很長</span></div>
      <div><b class="c0">← 左滑｜不會</b><span>想不起來 → 1 分鐘後同一輪再出現一次</span></div>
      <div><b class="c2">→ 右滑｜會</b><span>想得起來 → 照記憶曲線拉長（1 天 → 3 天 → 約一週…）</span></div>
      <div><b class="c1">↓ 下滑｜模糊</b><span>有印象但不確定、想了很久 → 隔天再出，間隔只稍微拉長</span></div>
    </div>
    <p class="muted small">下面四個按鈕和滑動的效果一樣，按鈕上的小字是「下次出現的時間」。<br>拿不定主意就選「模糊」：寧可多看一次，也不要太早放掉。</p>
    <button class="cta" id="okhelp">知道了</button></div>`;
  document.body.appendChild(d);
  d.querySelector("#okhelp").onclick = () => { d.remove(); S.settings.seenSwipe = 1; save(); };
}
function Flash(el, deck = "ALL") {
  let queue = buildQueue(deck);
  const total = queue.length;
  let done = 0, busy = false;
  const show = (enter = true) => {
    if (!queue.length) {
      el.innerHTML = `<div class="done"><div class="big">🎉</div><h2>今天的卡片刷完了！</h2><p class="muted">完成 ${done} 次複習。明天記得回來。</p>
        <button class="cta" onclick="location.hash='#vocab-quiz'">再來點選擇題</button><a class="ghost block" href="#home">回首頁</a></div>`;
      return;
    }
    const w = queue[0], nx = queue[1];
    const isNew = !S.cards[w.w];
    el.innerHTML = `
      <div class="topbar"><a href="#vocab-list-${deck}" class="back">‹</a><div class="prog"><i style="width:${total ? done / (total + done) * 100 : 0}%"></i></div><span class="muted">${queue.length}</span><button class="icon help" id="help">?</button></div>
      <div class="stage">
        ${nx ? `<div class="flash next"><div class="face front">${cardFront(nx, !S.cards[nx.w])}</div></div>` : ""}
        <div class="flash ${enter ? "enter" : ""}" id="fc">
          <div class="stamp s0">不會</div><div class="stamp s1">模糊</div><div class="stamp s2">會</div><div class="stamp s3">太簡單</div>
          <div class="face front">
            ${cardFront(w, isNew)}
            <button class="icon big" id="sp">🔊</button>
            <div class="hint">點一下翻面 · 滑動評分</div>
          </div>
          <div class="face bk">
            <div class="word sm">${esc(w.w)} <small>${esc(w.pos)}</small></div>
            <div class="zh">${esc(w.zh)}</div>
            <div id="exbox">${exHTML(w)}</div>
            ${w.col ? `<div class="meta"><b>搭配</b> ${esc(w.col)}</div>` : ""}
            ${w.syn ? `<div class="meta"><b>同義</b> ${esc(w.syn)}</div>` : ""}
            ${w.root ? `<div class="meta"><b>字根</b> ${esc(w.root)}</div>` : ""}
          </div>
        </div>
      </div>
      <div class="rates show" id="rates">
        <button data-r="0" class="r0"><i>←</i>不會<small>1 分鐘</small></button>
        <button data-r="1" class="r1"><i>↓</i>模糊<small>${ivlLabel(w, 1)}</small></button>
        <button data-r="2" class="r2"><i>→</i>會<small>${ivlLabel(w, 2)}</small></button>
        <button data-r="3" class="r3"><i>↑</i>太簡單<small>${ivlLabel(w, 3)}</small></button>
      </div>`;
    const fc = $("#fc");
    const stamps = [...fc.querySelectorAll(".stamp")];
    $("#help").onclick = swipeHelp;
    if ($("#aiex")) fillExample(w).then(() => { const b = document.querySelector("#exbox"); if (b && queue[0] === w) b.innerHTML = exHTML(w); });
    $("#sp").onclick = e => { e.stopPropagation(); speak(w.w); };
    $("#rates").onclick = e => { const b = e.target.closest("button"); if (b) commit(+b.dataset.r); };
    const commit = r => { if (busy) return; busy = true; flyOut(fc, DIR_OF[r], () => { busy = false; answer(r); }); };

    // ---- 拖曳：卡片跟著手指走，放開時超過門檻或甩得夠快就飛出去 ----
    let start = null, dx = 0, dy = 0, moved = false;
    const dirOf = (x, y) => Math.abs(x) >= Math.abs(y) ? (x > 0 ? "right" : "left") : (y > 0 ? "down" : "up");
    fc.addEventListener("pointerdown", e => {
      if (busy || e.target.closest("button")) return;
      start = { x: e.clientX, y: e.clientY, t: Date.now() }; dx = dy = 0; moved = false;
      fc.setPointerCapture(e.pointerId); fc.style.transition = "none";
    });
    fc.addEventListener("pointermove", e => {
      if (!start) return;
      dx = e.clientX - start.x; dy = e.clientY - start.y;
      if (Math.hypot(dx, dy) > 8) moved = true;
      if (!moved) return;
      fc.style.transform = `translate(${dx}px, ${dy}px) rotate(${dx / 14}deg)`;
      const d = dirOf(dx, dy), k = Math.min(1, Math.hypot(dx, dy) / 110);
      stamps.forEach((st, i) => st.style.opacity = DIR_OF[i] === d ? k : 0);
      fc.dataset.dir = k > .35 ? d : "";
    });
    const end = () => {
      if (!start) return;
      const dist = Math.hypot(dx, dy), v = dist / Math.max(1, Date.now() - start.t);
      start = null;
      if (!moved) { fc.style.transition = ""; fc.classList.toggle("flip"); return; } // 點一下 = 翻面
      const d = dirOf(dx, dy);
      const far = (d === "left" || d === "right") ? Math.abs(dx) > 100 : Math.abs(dy) > 90;
      if (far || (dist > 50 && v > 0.6)) { commit(SWIPE[d]); return; }
      // 沒滑夠 → 彈回原位
      fc.style.transition = "transform .35s cubic-bezier(.2,1.4,.4,1)"; fc.style.transform = "";
      stamps.forEach(st => st.style.opacity = 0); fc.dataset.dir = "";
    };
    fc.addEventListener("pointerup", end);
    fc.addEventListener("pointercancel", end);
    if (!S.settings.seenSwipe) swipeHelp();
  };
  const answer = r => {
    const w = queue.shift();
    if (!S.cards[w.w]) S.cards[w.w] = { ease: 2.5, ivl: 0, reps: 0, lapses: 0, due: 0, first: today() };
    rate(w.w, r); done++;
    if (r === 0) { queue.splice(Math.min(3, queue.length), 0, w); }
    show();
  };
  show(false);
}
// 卡片往某個方向飛出畫面
function flyOut(fc, dir, cb) {
  const W = innerWidth * 1.3, H = innerHeight * 1.1;
  const cur = new DOMMatrix(getComputedStyle(fc).transform);
  const to = { left: [-W, cur.m42 + 40, -28], right: [W, cur.m42 + 40, 28], up: [cur.m41, -H, cur.m41 / 14], down: [cur.m41, H, cur.m41 / 14] }[dir];
  const i = DIR_OF.indexOf(dir);
  fc.querySelectorAll(".stamp").forEach((st, j) => st.style.opacity = j === i ? 1 : 0);
  fc.dataset.dir = dir;
  fc.style.transition = "transform .32s cubic-bezier(.4,0,.9,.6), opacity .32s";
  requestAnimationFrame(() => { fc.style.transform = `translate(${to[0]}px, ${to[1]}px) rotate(${to[2]}deg)`; fc.style.opacity = ".2"; });
  const nx = document.querySelector(".flash.next");
  if (nx) nx.classList.add("rise");
  setTimeout(cb, 300);
}
// 沒有例句的字（高中 7000）：用 Gemini 產生學術例句並存起來
function exHTML(w) {
  const ex = w.ex || S.exCache?.[w.w]?.ex;
  if (ex) return `<div class="ex">${esc(ex)}</div><div class="muted">${esc(w.exZh || S.exCache[w.w]?.exZh || "")}</div>`;
  return S.settings.geminiKey ? `<p class="muted small" id="aiex">✨ AI 正在產生例句…</p>`
    : `<p class="muted small">例句：到「匯入」頁設定 Gemini Key 後可自動產生</p>`;
}
async function fillExample(w) {
  try {
    const r = await gemini([{ text: `為英文單字「${w.w}」(${w.pos} ${w.zh}) 寫一句研究所入學考試程度的學術例句，情境偏工業工程、管理、科技或經濟，15–25 字。只輸出 JSON：{"ex":"英文例句","exZh":"中文翻譯"}` }]);
    S.exCache = S.exCache || {};
    S.exCache[w.w] = { ex: r.ex, exZh: r.exZh }; save();
  } catch (e) { toast(/fetch/i.test(e.message) ? "無法連線 Gemini" : e.message); }
}
function ivlLabel(w, r) {
  const c = S.cards[w.w] || { ease: 2.5, ivl: 0, reps: 0 };
  let d = r === 1 ? Math.max(1, c.ivl * 1.2) : r === 2 ? (c.reps === 0 ? 1 : c.reps === 1 ? 3 : c.ivl * c.ease) : Math.max(4, (c.ivl || 1) * (c.ease + 0.15) * 1.3);
  d = Math.round(d);
  return d >= 30 ? `${Math.round(d / 30)} 個月` : `${d} 天`;
}

function VocabQuiz(el, deck = "ALL") {
  const all = allWords().filter(w => inDeck(w, deck));
  const seen = all.filter(w => S.cards[w.w] && !S.cards[w.w].known);
  const ws = seen.length >= 10 ? seen : all;
  let n = 0, correct = 0;
  const N = 10;
  const pool = shuffle(ws).slice(0, N);
  const next = () => {
    if (n >= N) {
      el.innerHTML = `<div class="done"><div class="big">${correct >= 8 ? "💪" : "📚"}</div><h2>${correct} / ${N}</h2><p class="muted">${correct >= 8 ? "達標 8 成！" : "還差一點，錯的字已加入複習。"}</p>
        <button class="cta" onclick="rerender()">再一輪</button><a class="ghost block" href="#home">回首頁</a></div>`;
      return;
    }
    const w = pool[n];
    const mode = w.ex && Math.random() < 0.5 ? "cloze" : "en2zh";
    const opts = shuffle([w, ...shuffle(all.filter(x => x.w !== w.w && x.zh !== w.zh)).slice(0, 3)]);
    const q = mode === "en2zh" ? `<div class="word">${esc(w.w)}</div><div class="pos">${esc(w.pos)}</div>`
      : `<div class="cloze">${esc(w.ex.replace(new RegExp(w.w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\w*", "i"), "_____"))}</div>`;
    el.innerHTML = `
      <div class="topbar"><a href="#vocab" class="back">‹</a><div class="prog"><i style="width:${n / N * 100}%"></i></div><span class="muted">${n + 1}/${N}</span></div>
      <div class="qbox">${q}</div>
      <div class="opts">${opts.map((o, i) => `<button data-i="${i}">${esc(mode === "en2zh" ? o.zh : o.w)}</button>`).join("")}</div>
      <div id="fb"></div>`;
    el.querySelector(".opts").onclick = e => {
      const b = e.target.closest("button"); if (!b || el.querySelector(".opts.locked")) return;
      el.querySelector(".opts").classList.add("locked");
      const pick = opts[+b.dataset.i];
      const ok = pick.w === w.w;
      [...el.querySelectorAll(".opts button")].forEach((x, i) => { if (opts[i].w === w.w) x.classList.add("ok"); });
      if (!ok) { b.classList.add("bad"); addMistake({ kind: "單字", q: `${w.w} = ${w.zh}`, ex: w.ex }); }
      else correct++;
      if (!S.cards[w.w]) S.cards[w.w] = { ease: 2.5, ivl: 0, reps: 0, lapses: 0, due: 0, first: today() };
      rate(w.w, ok ? 2 : 0);
      $("#fb").innerHTML = `<div class="explain ${ok ? "good" : "badc"}"><b>${ok ? "答對" : "答錯"}</b> ${esc(w.w)}：${esc(w.zh)}${w.ex ? `<div class="ex">${esc(w.ex)}</div>` : ""}</div><button class="cta" id="nx">下一題</button>`;
      $("#nx").onclick = () => { n++; next(); };
    };
  };
  next();
}

/* ================= 文法 ================= */
function Grammar(el, id) {
  const topics = [...GRAMMAR];
  if (S.customQs.length) topics.push({ id: "mine", title: "我的錯題延伸", tip: "從你上傳的考卷，由 AI 挑出的錯誤與延伸考點。", qs: S.customQs });
  if (id === "mistakes") {
    const qs = S.mistakes.filter(m => m.opts);
    if (!qs.length) { el.innerHTML = `<h2 class="title">錯題本</h2><p class="muted">目前沒有可重刷的選擇題錯題。</p><a class="ghost block" href="#grammar">去刷文法</a>`; return; }
    return Quiz(el, { title: "錯題重刷", qs: qs.map(m => ({ q: m.q, opts: m.opts, a: m.a, ex: m.ex })) }, "#home");
  }
  const t = topics.find(x => x.id === id);
  if (t) {
    el.innerHTML = `<div class="topbar"><a href="#grammar" class="back">‹</a><b>${esc(t.title)}</b><span></span></div>
      <div class="tipcard"><div class="eyebrow">30 秒重點</div><pre>${esc(t.tip)}</pre></div>
      <button class="cta" id="start">開始 ${t.qs.length} 題</button>`;
    $("#start").onclick = () => Quiz(el, t, "#grammar");
    return;
  }
  el.innerHTML = `<h2 class="title">文法刷題</h2>
    <p class="muted">每個考點先看重點，再刷題。答錯自動收進錯題本。</p>
    <ul class="tlist">${topics.map(t => `<li><a href="#grammar-${t.id}"><b>${esc(t.title)}</b><small>${t.qs.length} 題</small><span>›</span></a></li>`).join("")}</ul>
    ${S.mistakes.some(m => m.opts) ? `<button class="ghost block" onclick="location.hash='#grammar-mistakes'">重刷錯題本</button>` : ""}`;
}

function Quiz(el, t, back, kind = "文法", onAnswer) {
  const qs = shuffle(t.qs);
  let n = 0, correct = 0;
  if (!qs.length) { el.innerHTML = `<div class="done"><h2>沒有題目</h2><a class="ghost block" href="${back}">返回</a></div>`; return; }
  const next = () => {
    if (n >= qs.length) {
      el.innerHTML = `<div class="done"><div class="big">${correct / qs.length >= 0.8 ? "💪" : "📚"}</div><h2>${correct} / ${qs.length}</h2>
        <p class="muted">正確率 ${Math.round(correct / qs.length * 100)}%</p><a class="cta block" href="${back}">完成</a></div>`;
      touchStreak(); save(); return;
    }
    const q = qs[n];
    el.innerHTML = `<div class="topbar"><a href="${back}" class="back">‹</a><div class="prog"><i style="width:${n / qs.length * 100}%"></i></div><span class="muted">${n + 1}/${qs.length}</span></div>
      <div class="qbox"><div class="cloze">${esc(q.q)}</div></div>
      <div class="opts">${q.opts.map((o, i) => `<button data-i="${i}"><span class="lt">${"ABCD"[i]}</span>${esc(o)}</button>`).join("")}</div>
      <div id="fb"></div>`;
    el.querySelector(".opts").onclick = e => {
      const b = e.target.closest("button"); if (!b || el.querySelector(".opts.locked")) return;
      el.querySelector(".opts").classList.add("locked");
      const i = +b.dataset.i, ok = i === q.a;
      if (onAnswer) onAnswer(q, ok);
      el.querySelectorAll(".opts button")[q.a].classList.add("ok");
      if (!ok) { b.classList.add("bad"); addMistake({ kind, q: q.q, opts: q.opts, a: q.a, ex: q.ex }); }
      else { correct++; if (S.mistakes.some(m => m.q === q.q)) { S.del.mist[q.q] = Date.now(); S.mistakes = S.mistakes.filter(m => m.q !== q.q); } }
      save();
      $("#fb").innerHTML = `<div class="explain ${ok ? "good" : "badc"}"><b>${ok ? "答對" : "答錯"}</b> ${esc(q.ex)}</div><button class="cta" id="nx">下一題</button>`;
      $("#nx").onclick = () => { n++; next(); };
    };
  };
  next();
}

/* ================= 文章 ================= */
function Read(el, tab = "reading", id) {
  const tabs = [["reading", "閱讀"], ["structure", "萬用架構"], ["pattern", "常用句型"], ["idea", "想法發想"]];
  const head = `<h2 class="title">文章練習</h2><div class="seg">${tabs.map(([k, n]) => `<a href="#read-${k}" class="${k === tab ? "on" : ""}">${n}</a>`).join("")}</div>`;
  if (tab === "reading" && id) {
    const r = READINGS.find(x => x.id === id);
    el.innerHTML = `<div class="topbar"><a href="#read" class="back">‹</a><b>${esc(r.topic)}</b><span></span></div>
      <article class="passage"><h3>${esc(r.title)}</h3>${r.paras.map(p => `<p>${hl(p, r.vocab)}</p>`).join("")}</article>
      <div class="card-box"><h3>長句拆解</h3>${r.hard.map(h => `<p class="ex">${esc(h.s)}</p><p class="muted small">${esc(h.parse)}</p>`).join("")}</div>
      <div class="card-box"><h3>重點單字 <small>點一下加入單字卡</small></h3><div class="chips">${r.vocab.map(v => `<button class="chip" data-v="${esc(v)}">${esc(v)} ＋</button>`).join("")}</div></div>
      <button class="cta" id="rq">做 ${r.qs.length} 題閱讀測驗</button>`;
    el.querySelector(".chips").onclick = e => {
      const b = e.target.closest(".chip"); if (!b) return;
      const v = b.dataset.v;
      if (!allWords().some(w => w.w === v)) { S.custom.push({ w: v, pos: "", zh: "（待補：在匯入頁用 AI 補完）", ex: r.paras.find(p => p.includes(v.slice(0, 5))) || "", exZh: "", tag: "MINE" }); save(); }
      b.classList.add("on"); b.textContent = v + " ✓"; toast("已加入單字卡");
    };
    $("#rq").onclick = () => Quiz(el, { qs: r.qs }, `#read-reading-${r.id}`, "閱讀");
    return;
  }
  let body = "";
  if (tab === "reading") body = `<ul class="tlist">${READINGS.map(r => `<li><a href="#read-reading-${r.id}"><b>${esc(r.title)}</b><small>${esc(r.topic)} · ${r.qs.length} 題</small><span>›</span></a></li>`).join("")}</ul>
    <p class="muted small center">更多文章：之後可用 AI 依台清交、台科考古題主題自動產生</p>`;
  if (tab === "structure") body = WRITING.structures.map(s => `<div class="card-box"><h3>${esc(s.name)}</h3>${s.parts.map(([a, b, c]) => `
      <div class="part"><div class="ptitle">${esc(a)} <small>${esc(b)}</small></div><div class="tpl">${esc(c)}</div></div>`).join("")}</div>`).join("");
  if (tab === "pattern") body = `<ul class="plist">${WRITING.patterns.map(([e, z]) => `<li><b>${esc(e)}</b><span>${esc(z)}</span></li>`).join("")}</ul>`;
  if (tab === "idea") body = WRITING.ideas.map(i => `<div class="card-box"><h3>${esc(i.topic)}</h3>
      <div class="procon"><div><div class="eyebrow good">支持</div><ul>${i.pro.map(x => `<li>${esc(x)}</li>`).join("")}</ul></div>
      <div><div class="eyebrow badc">反對</div><ul>${i.con.map(x => `<li>${esc(x)}</li>`).join("")}</ul></div></div>
      <p class="muted small">${esc(i.ex)}</p></div>`).join("");
  el.innerHTML = head + body;
}
function hl(p, vocab) {
  let s = esc(p);
  for (const v of vocab) s = s.replace(new RegExp(`\\b(${v.slice(0, Math.max(4, v.length - 2))}\\w*)`, "i"), "<mark>$1</mark>");
  return s;
}

/* ================= 匯入考卷（Gemini） ================= */
const SCHOOLS = ["台大", "清大", "交大", "台科大", "其他"];
function Import(el) {
  const st = S.settings;
  const years = [...Array(10)].map((_, i) => 115 - i);
  el.innerHTML = `<h2 class="title">上傳歷屆考卷</h2>
    <div class="seg"><a href="#past">錯題專區</a><a href="#import" class="on">上傳分析</a></div>
    <p class="muted">上傳寫過的歷屆考題（PDF / 照片 / 貼文字）。AI 會：<br>
      ① 先逐題讀完整份考卷，列出每一題你的答案與正解，讓你核對錯題<br>
      ② 你勾選的錯題存進「歷屆錯題專區」<br>
      ③ 錯的單字／片語：<b>字庫已經有的直接排進今天複習</b>，沒有的才新增，並延伸出類似題</p>
    <div class="card-box">
      <h3>1. 哪一份考卷</h3>
      <div class="row"><select class="search half" id="school">${SCHOOLS.map(x => `<option>${x}</option>`).join("")}</select>
        <select class="search half" id="year">${years.map(y => `<option>${y}</option>`).join("")}</select></div>
      <h3>2. 上傳</h3>
      <label class="drop" id="drop"><input type="file" id="file" accept="application/pdf,image/*" multiple hidden><span id="fname">📄 點此選擇 PDF 或照片（可多選）</span></label>
      <textarea id="txt" rows="4" placeholder="或直接貼上題目與你的答案…"></textarea>
      <h3>3. 正確答案（建議填）</h3>
      <textarea id="key2" rows="2" placeholder="有答案卷就貼上或打在這裡，例：1-10 BCADA CDBAA、11-20 …（AI 判斷錯題會更準）"></textarea>
      <h3>4. 補充說明（選填）</h3>
      <input class="search" id="note" placeholder="例：第 12、18 題是用猜的">
      <button class="cta" id="go">✨ AI 分析</button>
      <div id="out"></div>
    </div>
    <details class="card-box" ${st.geminiKey ? "" : "open"}>
      <summary><b>Gemini 設定</b> ${st.geminiKey ? `<span class="pill good">已設定</span>` : `<span class="pill badc">尚未設定</span>`}</summary>
      <p class="muted small">到 Google AI Studio（aistudio.google.com）免費申請 API Key，貼在下面。Key 只會存在這支手機，不會上傳到其他地方。</p>
      <input class="search" id="key" type="password" placeholder="貼上 Gemini API Key" value="${esc(st.geminiKey)}">
      <label class="small muted">主要模型</label>
      <input class="search" id="model" placeholder="模型名稱" value="${esc(st.model)}">
      <label class="small muted">備用模型（主要模型太忙時自動改用，選填）</label>
      <input class="search" id="fallback" placeholder="例如 AI Studio 列出的 Flash-Lite 模型名稱" value="${esc(st.fallback || "")}">
      <div class="row"><button class="ghost" id="savek">儲存</button><button class="ghost" id="lsm">查詢可用模型</button></div>
      <div id="mlist"></div>
      ${st.lastGood ? `<p class="muted small">上次自動改用：${esc(st.lastGood)}</p>` : ""}
    </details>`;
  let files = [];
  $("#file").onchange = e => {
    files = [...e.target.files];
    $("#fname").innerHTML = files.length ? `✅ ${files.length} 個檔案：${files.map(f => esc(f.name)).join("、")}` : "📄 點此選擇 PDF 或照片（可多選）";
  };
  $("#lsm").onclick = async () => {
    st.geminiKey = $("#key").value.trim(); save();
    if (!st.geminiKey) return toast("請先貼上 Key");
    $("#mlist").innerHTML = `<div class="loading"><i></i>查詢中…</div>`;
    try {
      const names = await listModels(true);
      $("#mlist").innerHTML = `<p class="muted small">點一下設為主要模型，長按設為備用模型</p><div class="chips">${names.map(n => `<button class="chip ${n === st.model ? "on" : ""}" data-m="${esc(n)}">${esc(n)}</button>`).join("")}</div>`;
      $("#mlist").querySelectorAll(".chip").forEach(c => {
        c.onclick = () => { $("#model").value = c.dataset.m; toast("已填入主要模型，記得按儲存"); };
        c.oncontextmenu = e => { e.preventDefault(); $("#fallback").value = c.dataset.m; toast("已填入備用模型，記得按儲存"); };
      });
    } catch (e) { $("#mlist").innerHTML = `<div class="explain badc">${esc(e.message)}</div>`; }
  };
  $("#savek").onclick = () => { st.geminiKey = $("#key").value.trim(); st.model = $("#model").value.trim() || "gemini-3.8-flash"; st.fallback = $("#fallback").value.trim(); save(); toast("已儲存"); render(); };
  $("#go").onclick = async () => {
    if (!st.geminiKey) { toast("請先設定 Gemini API Key"); return; }
    if (!files.length && !$("#txt").value.trim()) { toast("請上傳檔案或貼上文字"); return; }
    const out = $("#out"), src = `${$("#school").value} ${$("#year").value}`;
    out.innerHTML = `<div class="loading"><i></i>第 1 步：AI 逐題讀取整份考卷，約 20–60 秒…</div>`;
    $("#go").disabled = true;
    try { showExtract(out, await extractAll(files, $("#txt").value, $("#key2").value, $("#note").value), src); }
    catch (e) { out.innerHTML = `<div class="explain badc"><b>失敗</b> ${esc(/fetch/i.test(e.message) ? "無法連線到 Gemini（預覽版會擋外部連線，部署到正式網址後就能用）" : e.message)}</div>`; }
    finally { $("#go").disabled = false; }
  };
}

const EXAM_CTX = "你是台灣研究所入學考試（台大、清大、交大、台科大 工業工程/工業管理所）的英文家教。";
// 第 1 步：逐題轉錄「全部」題目，不挑錯題（錯題由程式比對答案判斷）
const PROMPT_EXTRACT = `${EXAM_CTX}
以下是學生寫過的歷屆英文考卷（可能有多頁、多張照片）。請「逐題」轉錄整份考卷的每一題，包含答對的題目，一題都不能省略、不能合併、不能只挑錯的。
題型包括：字彙、文法、片語、克漏字（每個空格算一題）、閱讀測驗（每個小題算一題，q 寫題目本身即可，不用抄整篇文章）、翻譯或作文（各算一題）。
每題欄位：
- no：題號（照考卷）
- type：vocab / grammar / phrase / cloze / reading / writing 其中之一
- q：題目（克漏字請附該空格前後的句子）
- opts：選項陣列（非選擇題為空陣列）
- mine：學生的答案（選擇題填選項索引 0 開始；看不出來或沒作答填 -1）
- a：正確答案（選擇題填選項索引；若有提供答案卷以答案卷為準，否則自行判斷）
- mineText / ansText：非選擇題時學生答案與參考答案（選擇題留空字串）
- unsure：學生有標記不確定、塗改、問號時為 true
- ex：一兩句中文解析
- point：考的知識點，例如「片語 take over」「假設語氣倒裝」「單字 mitigate」
只輸出 JSON：{"total":總題數,"items":[{"no":"","type":"","q":"","opts":[],"mine":-1,"a":-1,"mineText":"","ansText":"","unsure":false,"ex":"","point":""}]}`;
// 第 2 步：只針對勾選的錯題產生單字、片語、延伸題
const PROMPT_DEEP = `${EXAM_CTX}
以下是學生在歷屆考題中答錯或不確定的題目（JSON）。請：
1. vocab：錯題牽涉的單字（含正確答案與學生誤選的選項），以及值得延伸的同字根、同義、易混淆字。每題至少 1 個。
2. phrases：錯題牽涉的片語（例如 take on / take over）。
3. questions：從錯誤延伸的新選擇題，仿研究所難度，四個選項，附中文解析，數量約為錯題數。
4. summary：用中文總結學生的弱點。
每個單字/片語都要附：中文、一句學術或工工/管理情境例句、例句中譯，以及 reason（例如「第 3 題選錯」）。
只輸出 JSON：{"summary":"","vocab":[{"w":"","pos":"","zh":"","ex":"","exZh":"","reason":""}],"phrases":[{"w":"","zh":"","ex":"","exZh":"","reason":""}],"questions":[{"q":"","opts":["","","",""],"a":0,"ex":"","reason":""}]}`;

const fileToPart = f => new Promise((ok, no) => {
  if (f.size > 15 * 1024 * 1024) return no(new Error(`「${f.name}」超過 15MB，請分開上傳`));
  const r = new FileReader();
  r.onload = () => ok({ inline_data: { mime_type: f.type || "application/pdf", data: r.result.split(",")[1] } });
  r.onerror = no; r.readAsDataURL(f);
});
async function extractAll(files, text, key, note) {
  const parts = [{ text: PROMPT_EXTRACT + (key ? `\n\n正確答案（答案卷）：\n${key}` : "") + (note ? `\n\n學生補充：${note}` : "") + (text ? `\n\n考卷內容：\n${text}` : "") }];
  for (const f of files) parts.push(await fileToPart(f));
  const r = await gemini(parts);
  const items = (r.items || []).filter(x => x && x.q);
  return { total: r.total || items.length, items };
}
const isWrong = x => x.unsure || (Array.isArray(x.opts) && x.opts.length ? (x.a >= 0 && x.mine !== x.a) : (x.ansText && norm(x.mineText) !== norm(x.ansText)));

// 忙碌（503 / 429 / high demand）時自動重試；還是不行就自動換其他可用的 Flash 模型
const BUSY = (status, msg) => status === 503 || status === 429 || status === 500 || /high demand|overload|unavailable|try again/i.test(msg || "");
const GONE = (status, msg) => status === 404 || /not found|no longer available|not supported|deprecated/i.test(msg || "");
const API = "https://generativelanguage.googleapis.com/v1beta";
async function callModel(model, parts) {
  const r = await fetch(`${API}/models/${encodeURIComponent(model)}:generateContent`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-goog-api-key": S.settings.geminiKey },
    body: JSON.stringify({ contents: [{ role: "user", parts }], generationConfig: { responseMimeType: "application/json", temperature: 0.3, maxOutputTokens: 32768 } }),
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) {
    const m = j.error?.message || `HTTP ${r.status}`, e = new Error(m);
    e.busy = BUSY(r.status, m); e.gone = GONE(r.status, m);
    throw e;
  }
  return j;
}
// 向 Google 查詢這把 Key 能用的模型（快取一天）
async function listModels(force) {
  const c = S.modelList;
  if (!force && c && Date.now() - c.t < DAY && c.names?.length) return c.names;
  const r = await fetch(`${API}/models?pageSize=200`, { headers: { "x-goog-api-key": S.settings.geminiKey } });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(j.error?.message || `HTTP ${r.status}`);
  const names = (j.models || [])
    .filter(m => (m.supportedGenerationMethods || []).includes("generateContent"))
    .map(m => m.name.replace(/^models\//, ""))
    .filter(n => /gemini/i.test(n) && !/image|tts|audio|live|embed|vision-only|robotics|computer/i.test(n));
  S.modelList = { t: Date.now(), names }; save();
  return names;
}
const ver = n => parseFloat((n.match(/(\d+(?:\.\d+)?)/) || [0, 0])[1]);
async function candidates() {
  const st = S.settings;
  const first = st.lastGood && Date.now() - (st.lastGoodAt || 0) < 3 * 3600e3 ? [st.lastGood] : [];
  let auto = [];
  try {
    auto = (await listModels()).filter(n => /flash/i.test(n))
      .sort((a, b) => (/lite/i.test(b) - /lite/i.test(a)) || ver(b) - ver(a) || (/preview|exp/i.test(a) - /preview|exp/i.test(b)));
  } catch {}
  return [...new Set([...first, st.model, st.fallback, ...auto].filter(Boolean))].slice(0, 5);
}
async function gemini(parts) {
  const list = await candidates();
  let lastErr;
  for (const [k, model] of list.entries()) {
    const waits = k === 0 ? [2, 5] : [3];
    for (let i = 0; i <= waits.length; i++) {
      try {
        const j = await callModel(model, parts);
        if (model !== S.settings.model) { S.settings.lastGood = model; S.settings.lastGoodAt = Date.now(); save(); }
        const c0 = j.candidates?.[0];
        const t = c0?.content?.parts?.map(p => p.text).join("") || "";
        try { return JSON.parse(t.replace(/^```json|```$/g, "").trim()); }
        catch {
          if (c0?.finishReason === "MAX_TOKENS") throw Object.assign(new Error("考卷太長，AI 的回應被截斷了。請把考卷分成幾次上傳（例如每次 2–3 頁）。"), { final: 1 });
          throw Object.assign(new Error("AI 回傳格式無法解析，請再試一次"), { final: 1 });
        }
      } catch (e) {
        if (e.final) throw e;
        lastErr = e;
        if (!e.busy && !e.gone) throw e;           // Key 錯誤等，換模型也沒用
        if (e.gone || i === waits.length) break;   // 這個模型不能用或重試完 → 換下一個
        toast(`${model} 忙碌中，${waits[i]} 秒後重試`);
        await new Promise(r => setTimeout(r, waits[i] * 1000));
      }
    }
    if (list[k + 1]) toast(`改用 ${list[k + 1]}`);
  }
  throw new Error(`所有可用模型都在忙（${lastErr?.message || "high demand"}）。請過幾分鐘再試。`);
}

// 第 1 步結果：列出全部題目，自動勾選錯題，讓使用者核對
function showExtract(out, res, src) {
  const items = res.items;
  const ansTxt = (x, i) => x.opts?.length ? (i >= 0 ? `${"ABCDE"[i] || "?"}. ${x.opts[i] ?? ""}` : "未作答") : null;
  const nWrong = items.filter(isWrong).length;
  out.innerHTML = `
    <div class="explain"><b>讀到 ${items.length} 題</b>${res.total && res.total !== items.length ? `（AI 說考卷共 ${res.total} 題）` : ""}，自動判斷你錯或不確定 <b>${nWrong}</b> 題。<br>
      <span class="small muted">請核對：題數不對就把漏掉的頁分開再上傳一次；判斷錯的可以直接勾選或取消。</span></div>
    <div class="row"><button class="ghost" id="selwrong">只勾錯題</button><button class="ghost" id="selnone">全部取消</button></div>
    <ul class="pick">${items.map((x, i) => {
      const w = isWrong(x);
      const mine = x.opts?.length ? ansTxt(x, x.mine) : (x.mineText || "—");
      const ans = x.opts?.length ? ansTxt(x, x.a) : (x.ansText || "—");
      return `<li class="${w ? "wrongq" : ""}"><label><input type="checkbox" ${w ? "checked" : ""} data-x="${i}"><div>
        <span class="pill ${w ? "badc" : "good"}">${esc(x.no || i + 1)}${x.unsure ? " ?" : ""}</span><span class="pill">${esc(x.type || "")}</span>
        <div>${esc(x.q)}</div>
        <div class="small">你：<span class="${w ? "badt" : ""}">${esc(mine)}</span>　正解：<b class="c2">${esc(ans)}</b></div>
        ${x.point ? `<div class="muted small">${esc(x.point)}</div>` : ""}</div></label></li>`;
    }).join("")}</ul>
    <button class="cta" id="deep">第 2 步：把勾選的題目存進錯題專區並產生單字卡</button>`;
  out.scrollIntoView({ behavior: "smooth", block: "start" });
  const boxes = () => [...out.querySelectorAll("input[data-x]")];
  $("#selwrong").onclick = () => boxes().forEach(c => c.checked = isWrong(items[+c.dataset.x]));
  $("#selnone").onclick = () => boxes().forEach(c => c.checked = false);
  $("#deep").onclick = async () => {
    const picked = boxes().filter(c => c.checked).map(c => items[+c.dataset.x]);
    if (!picked.length) return toast("請至少勾選一題");
    // 先把錯題存進專區（不用等 AI）
    let nw = 0; const add = [];
    for (const x of picked) {
      if (S.past.some(p => p.q === x.q && p.src === src)) continue;
      add.push({ id: Date.now() + "_" + nw, src, no: String(x.no || ""), q: x.q, opts: Array.isArray(x.opts) ? x.opts : [], mine: x.mine ?? -1, a: x.a ?? -1,
        mineText: x.mineText || "", ansText: x.ansText || "", ex: x.ex || "", point: x.point || "", type: x.type || "", t: Date.now() - nw, done: 0 });
      nw++;
    }
    S.past = [...add, ...S.past];
    save();
    out.innerHTML = `<div class="explain good"><b>錯題專區 +${nw} 題</b></div><div class="loading"><i></i>第 2 步：AI 針對 ${picked.length} 題錯題產生單字卡和延伸題…</div>`;
    try {
      const slim = picked.map(({ no, q, opts, mine, a, mineText, ansText, point }) => ({ no, q, opts, mine, a, mineText, ansText, point }));
      showDeep(out, await gemini([{ text: PROMPT_DEEP + "\n\n錯題：\n" + JSON.stringify(slim) }]), src, nw);
    } catch (e) {
      out.innerHTML = `<div class="explain good"><b>錯題專區 +${nw} 題</b>（已存好）</div><div class="explain badc"><b>單字卡產生失敗</b> ${esc(e.message)}</div><a class="cta block" href="#past">看錯題專區</a>`;
    }
  };
}

// 第 2 步結果：單字（字庫已有 → 排入複習；沒有才新增）、片語、延伸題
function showDeep(out, res, src, nw) {
  const ok4 = x => Array.isArray(x.opts) && x.opts.length === 4 && x.a >= 0 && x.a < 4;
  const items = [
    ...(res.vocab || []).filter(x => x.w && x.zh).map(x => ({ ...x, kind: "v" })),
    ...(res.phrases || []).filter(x => x.w && x.zh).map(x => ({ ...x, kind: "p" })),
  ].map(x => ({ ...x, hit: findWord(x.w) }));
  const q = (res.questions || []).filter(x => x.q && ok4(x));
  out.innerHTML = `
    <div class="explain good"><b>錯題專區 +${nw} 題</b>（已存好）</div>
    ${res.summary ? `<div class="explain"><b>弱點分析</b> ${esc(res.summary)}</div>` : ""}
    <h3>單字 / 片語 <small>${items.length}</small></h3>
    <ul class="pick">${items.map((x, i) => `<li><label><input type="checkbox" checked data-i="${i}"><div><b>${esc(x.w)}</b> ${esc(x.zh)}
      ${x.hit ? `<span class="pill good">字庫已有 → 排入複習</span>` : `<span class="pill new">新增</span>`}${x.kind === "p" ? `<span class="pill">片語</span>` : ""}
      <div class="muted small">${esc(x.reason || "")}</div></div></label></li>`).join("")}</ul>
    <h3>延伸題 <small>${q.length}</small></h3>
    <ul class="pick">${q.map((x, i) => `<li><label><input type="checkbox" checked data-q="${i}"><div>${esc(x.q)}<div class="muted small">${esc(x.reason || "")}</div></div></label></li>`).join("")}</ul>
    <button class="cta" id="addall">存進題庫</button>`;
  $("#addall").onclick = () => {
    let nNew = 0, nRev = 0, nq = 0;
    out.querySelectorAll("input[data-i]:checked").forEach(c => {
      const x = items[+c.dataset.i];
      if (x.hit) { reviewNow(x.hit.w, src); nRev++; return; }
      const card = { w: x.w.trim(), pos: x.kind === "p" ? "phr." : (x.pos || ""), zh: x.zh, ex: x.ex || "", exZh: x.exZh || "", tag: x.kind === "p" ? "PH" : "MINE", sub: 0, src: "upload" };
      S.custom.push(card); reviewNow(card.w, src); nNew++;
    });
    out.querySelectorAll("input[data-q]:checked").forEach(c => {
      const x = q[+c.dataset.q];
      if (!S.customQs.some(y => y.q === x.q)) { S.customQs.push({ q: x.q, opts: x.opts, a: x.a, ex: x.ex || "" }); nq++; }
    });
    save();
    out.innerHTML = `<div class="explain good"><b>完成</b> 錯題專區 +${nw}、字庫已有排入複習 ${nRev} 個、新增 ${nNew} 個、延伸題 +${nq}</div>
      <div class="row"><a class="cta half" href="#past">看錯題專區</a><a class="cta half alt" href="#vocab-cards">馬上複習</a></div>`;
  };
}

/* ================= 歷屆錯題專區 ================= */
function Past(el, filter = "ALL", mode) {
  const srcs = [...new Set(S.past.map(p => p.src))];
  const list = S.past.filter(p => filter === "ALL" || p.src === filter);
  const quizable = list.filter(p => p.opts?.length === 4 && p.a >= 0);
  if (mode === "quiz") return Quiz(el, { qs: quizable.map(p => ({ q: p.q, opts: p.opts, a: p.a, ex: `${p.point ? "【" + p.point + "】" : ""}${p.ex}` })) }, `#past-${filter}`, "歷屆");
  el.innerHTML = `<h2 class="title">歷屆錯題</h2>
    <div class="seg"><a href="#past" class="on">錯題專區</a><a href="#import">上傳分析</a></div>
    ${S.past.length ? `
      <div class="chips" id="srcs"><button class="chip ${filter === "ALL" ? "on" : ""}" data-s="ALL">全部 ${S.past.length}</button>${srcs.map(x => `<button class="chip ${filter === x ? "on" : ""}" data-s="${esc(x)}">${esc(x)}</button>`).join("")}</div>
      ${quizable.length ? `<button class="cta" id="redo">重做 ${quizable.length} 題選擇題</button>` : ""}
      <ul class="plist">${list.map(p => `<li class="pastq">
        <div class="row between"><span class="pill badc">${esc(p.src)}${p.no ? " 第 " + esc(p.no) + " 題" : ""}</span>${p.point ? `<span class="pill">${esc(p.point)}</span>` : ""}</div>
        <div class="cloze">${esc(p.q)}</div>
        ${p.opts?.length ? `<ol class="olist" type="A">${p.opts.map((o, i) => `<li class="${i === p.a ? "okc" : i === p.mine ? "badt" : ""}">${esc(o)}${i === p.a ? " ✓" : i === p.mine ? " ✗ 你的答案" : ""}</li>`).join("")}</ol>` : ""}
        ${!p.opts?.length && (p.mineText || p.ansText) ? `<div class="small">你：<span class="badt">${esc(p.mineText || "—")}</span><br>參考答案：<b class="c2">${esc(p.ansText || "—")}</b></div>` : ""}
        ${p.ex ? `<div class="explain">${esc(p.ex)}</div>` : ""}
        <button class="icon small del" data-id="${esc(p.id)}">刪除</button></li>`).join("")}</ul>`
      : `<div class="card-box center"><p class="muted">還沒有歷屆錯題。</p><a class="cta block" href="#import">上傳第一份考卷</a></div>`}`;
  if ($("#srcs")) $("#srcs").onclick = e => { const b = e.target.closest(".chip"); if (b) location.hash = `#past-${encodeURIComponent(b.dataset.s)}`; };
  if ($("#redo")) $("#redo").onclick = () => Past(el, filter, "quiz");
  el.querySelectorAll(".del").forEach(b => b.onclick = () => { S.del.past[b.dataset.id] = Date.now(); S.past = S.past.filter(p => p.id !== b.dataset.id); save(); Past(el, filter); });
}

/* ================= 片語專區 ================= */
function Phrase(el, g) {
  const all = allWords().filter(w => w.tag === "PH");
  const groups = SUBS.PH.filter(([n]) => all.some(w => w.sub === n));
  if (g !== undefined) {
    const n = +g;
    const pool = g === "all" ? all : all.filter(w => w.sub === n);
    // 填空：選項優先用同組片語（同動詞），不夠再從其他組補
    const qs = shuffle(pool.filter(w => w.cloze || w.ex)).slice(0, 10).map(w => {
      const same = shuffle(all.filter(x => x.w !== w.w && x.sub === w.sub));
      const other = shuffle(all.filter(x => x.w !== w.w && x.sub !== w.sub));
      const opts = shuffle([w, ...[...same, ...other].slice(0, 3)]);
      const q = w.cloze ? w.cloze.replace(/\[[^\]]+\]/g, "_____") : w.ex.replace(new RegExp(w.w.split(" ")[0] + "\\S*", "i"), "_____");
      return { q, opts: opts.map(o => o.w), a: opts.indexOf(w), ex: `${w.w}：${w.zh}　｜　${w.ex}`, w: w.w };
    });
    return Quiz(el, { qs }, "#phrase", "片語", (q, ok) => { if (!S.cards[q.w]) S.cards[q.w] = { ease: 2.5, ivl: 0, reps: 0, lapses: 0, due: 0, first: today() }; rate(q.w, ok ? 2 : 0); });
  }
  el.innerHTML = `<h2 class="title">片語專區</h2>
    <p class="muted">考古題的片語填空常把同一個動詞的片語放在一起考（take on / take over / take up…），這裡也照這樣出題。</p>
    <div class="row"><a class="cta half" href="#phrase-all">全部隨機填空</a><a class="cta half alt" href="#vocab-cards-PH">翻卡背片語</a></div>
    <a class="ghost block" href="#add-PH">＋ 新增我的片語</a>
    <ul class="tlist">${groups.map(([n, name]) => {
      const ws = all.filter(w => w.sub === n);
      const learned = ws.filter(w => S.cards[w.w]).length;
      return `<li><a href="#phrase-${n}"><b>${esc(name)}</b><small>${learned}/${ws.length}　${esc(ws.slice(0, 3).map(w => w.w).join(" · "))}</small><span>›</span></a></li>`;
    }).join("")}</ul>`;
}

/* ================= 手動新增 ================= */
function AddWord(el, kind = "W") {
  const isPh = kind === "PH";
  el.innerHTML = `<div class="topbar"><a href="${isPh ? "#phrase" : "#vocab"}" class="back">‹</a><b>手動新增</b><span></span></div>
    <div class="seg"><a href="#add" class="${isPh ? "" : "on"}">單字</a><a href="#add-PH" class="${isPh ? "on" : ""}">片語</a></div>
    <div class="card-box">
      <input class="search" id="w" placeholder="${isPh ? "片語，例如 take over" : "單字，例如 mitigate"}" autocapitalize="off" autocomplete="off">
      <div id="hint"></div>
      ${isPh ? "" : `<input class="search" id="pos" placeholder="詞性（選填），例如 v.">`}
      <input class="search" id="zh" placeholder="中文意思">
      <textarea id="ex" rows="2" placeholder="例句（選填）"></textarea>
      <input class="search" id="exZh" placeholder="例句翻譯（選填）">
      ${S.settings.geminiKey ? `<button class="ghost block" id="ai">✨ AI 自動填寫中文與例句</button>` : `<p class="muted small">設定 Gemini Key 後可以自動填中文與例句</p>`}
      <button class="cta" id="save">加入${isPh ? "片語" : "單字"}卡</button>
    </div>
    <p class="muted small">如果字庫裡已經有這個字，不會重複新增，會直接排進今天的複習。</p>`;
  $("#w").oninput = () => {
    const hit = findWord($("#w").value);
    $("#hint").innerHTML = hit ? `<div class="explain good"><b>字庫已有</b> ${esc(hit.w)}：${esc(hit.zh)}（${esc(deckName(hit))}）</div>` : "";
  };
  if ($("#ai")) $("#ai").onclick = async () => {
    const t = $("#w").value.trim(); if (!t) return toast("先輸入" + (isPh ? "片語" : "單字"));
    $("#ai").disabled = true; $("#ai").textContent = "產生中…";
    try {
      const r = await gemini([{ text: `英文${isPh ? "片語" : "單字"}「${t}」。給研究所英文考生用：輸出 JSON {"pos":"詞性","zh":"最常考的中文意思（可多個，用；分隔）","ex":"一句學術或工業工程/管理情境例句，15-25 字","exZh":"例句中譯"}` }]);
      if (!isPh && r.pos) $("#pos").value = r.pos;
      $("#zh").value = r.zh || ""; $("#ex").value = r.ex || ""; $("#exZh").value = r.exZh || "";
    } catch (e) { toast(/fetch/i.test(e.message) ? "無法連線 Gemini" : e.message); }
    $("#ai").disabled = false; $("#ai").textContent = "✨ AI 自動填寫中文與例句";
  };
  $("#save").onclick = () => {
    const t = $("#w").value.trim().replace(/\s+/g, " "), zh = $("#zh").value.trim();
    if (!t) return toast("請輸入" + (isPh ? "片語" : "單字"));
    const hit = findWord(t);
    if (hit) { reviewNow(hit.w, "", false); save(); toast(`「${hit.w}」已在字庫，已排入今天複習`); return AddWord(el, kind); }
    if (!zh) return toast("請輸入中文意思");
    S.custom.push({ w: t, pos: isPh ? "phr." : $("#pos").value.trim(), zh, ex: $("#ex").value.trim(), exZh: $("#exZh").value.trim(), tag: isPh ? "PH" : "MINE", sub: 0, src: "manual" });
    reviewNow(t, "", false);
    save(); toast(`已加入「${t}」`); AddWord(el, kind);
  };
}

/* ================= 共用 ================= */
function toast(msg) {
  const t = document.createElement("div"); t.className = "toast"; t.textContent = msg;
  document.body.appendChild(t); setTimeout(() => t.remove(), 2000);
}

window.rerender = render;
render();
if (gh().token) syncNow();
if ("serviceWorker" in navigator && location.protocol === "https:") navigator.serviceWorker.register("./sw.js").catch(() => {});
