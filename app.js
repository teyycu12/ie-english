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
  cards: {}, custom: [], customQs: [], mistakes: [], past: [], flags: {},
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
function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch {} }
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
  S.cards[word] = c;
  touchStreak(); save();
}
// 「我早就會」：直接排到 60 天後，不佔每日新字額度
function markKnown(word) {
  S.cards[word] = { ease: 2.8, ivl: 60, reps: 3, lapses: 0, due: Date.now() + 60 * DAY, known: 1 };
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
      <h3>資料備份</h3>
      <p class="muted">進度存在這支手機上。建議每週匯出一次備份。</p>
      <div class="row"><button class="ghost" id="exp">匯出備份</button><label class="ghost file">匯入備份<input type="file" id="imp" accept=".json" hidden></label></div>
    </section>`;
  $("#exp").onclick = () => {
    const a = document.createElement("a");
    const data = { ...S, settings: { ...S.settings, geminiKey: "" } };
    a.href = URL.createObjectURL(new Blob([JSON.stringify(data)], { type: "application/json" }));
    a.download = `ie-english-backup-${today()}.json`; a.click();
  };
  $("#imp").onchange = async e => {
    const f = e.target.files[0]; if (!f) return;
    try { const d = JSON.parse(await f.text()); const key = S.settings.geminiKey; S = Object.assign(defaults(), d); S.settings.geminiKey ||= key; save(); toast("已匯入備份"); render(); }
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

function Flash(el, deck = "ALL") {
  let queue = buildQueue(deck);
  let flipped = false;
  const total = queue.length;
  let done = 0;
  const show = () => {
    if (!queue.length) {
      el.innerHTML = `<div class="done"><div class="big">🎉</div><h2>今天的卡片刷完了！</h2><p class="muted">完成 ${done} 次複習。明天記得回來。</p>
        <button class="cta" onclick="location.hash='#vocab-quiz'">再來點選擇題</button><a class="ghost block" href="#home">回首頁</a></div>`;
      return;
    }
    const w = queue[0];
    const isNew = !S.cards[w.w];
    flipped = false;
    el.innerHTML = `
      <div class="topbar"><a href="#vocab-list-${deck}" class="back">‹</a><div class="prog"><i style="width:${total ? done / (total + done) * 100 : 0}%"></i></div><span class="muted">${queue.length}</span></div>
      <div class="flash" id="fc">
        <div class="face front">
          ${isNew ? `<span class="pill new">NEW</span>` : ""}<span class="pill ${S.flags?.[w.w]?.past ? "badc" : ""}">${esc(deckName(w))}</span>
          <div class="word">${esc(w.w)}</div><div class="pos">${esc(w.pos)}</div>
          <button class="icon big" id="sp">🔊</button>
          ${isNew ? `<button class="known" id="known">我早就會了 ✓</button>` : ""}
          <div class="hint">點一下翻面</div>
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
      <div class="rates" id="rates">
        <button data-r="0" class="r0">不會<small>1 分鐘</small></button>
        <button data-r="1" class="r1">模糊<small>${ivlLabel(w, 1)}</small></button>
        <button data-r="2" class="r2">會<small>${ivlLabel(w, 2)}</small></button>
        <button data-r="3" class="r3">太簡單<small>${ivlLabel(w, 3)}</small></button>
      </div>
      <p class="muted center small">左滑＝不會 · 右滑＝會${isNew ? " · 高中就會的字按「我早就會了」跳過" : ""}</p>`;
    const fc = $("#fc");
    const ab = $("#aiex");
    if (ab) ab.onclick = async e => { e.stopPropagation(); ab.disabled = true; ab.textContent = "產生中…"; await fillExample(w); $("#exbox").innerHTML = exHTML(w); };
    $("#sp").onclick = e => { e.stopPropagation(); speak(w.w); };
    if ($("#known")) $("#known").onclick = e => {
      e.stopPropagation();
      queue.shift(); markKnown(w.w);
      const next = allWords().find(x => inDeck(x, deck) && !S.cards[x.w] && !queue.includes(x));
      if (next) queue.push(next);
      show();
    };
    fc.onclick = () => { flipped = !flipped; fc.classList.toggle("flip", flipped); if (flipped) $("#rates").classList.add("show"); };
    $("#rates").onclick = e => { const b = e.target.closest("button"); if (b && flipped) answer(+b.dataset.r); };
    // 滑動手勢
    let x0 = null, dx = 0;
    fc.addEventListener("touchstart", e => { x0 = e.touches[0].clientX; dx = 0; fc.style.transition = "none"; }, { passive: true });
    fc.addEventListener("touchmove", e => { if (x0 == null) return; dx = e.touches[0].clientX - x0; fc.style.transform = `translateX(${dx}px) rotate(${dx / 20}deg)`; }, { passive: true });
    fc.addEventListener("touchend", () => {
      fc.style.transition = ""; fc.style.transform = "";
      if (Math.abs(dx) > 90) answer(dx > 0 ? 2 : 0);
      x0 = null;
    });
  };
  const answer = r => {
    const w = queue.shift();
    if (!S.cards[w.w]) S.cards[w.w] = { ease: 2.5, ivl: 0, reps: 0, lapses: 0, due: 0, first: today() };
    rate(w.w, r); done++;
    if (r === 0) { queue.splice(Math.min(3, queue.length), 0, w); }
    show();
  };
  show();
}
// 沒有例句的字（高中 7000）：用 Gemini 產生學術例句並存起來
function exHTML(w) {
  const ex = w.ex || S.exCache?.[w.w]?.ex;
  if (ex) return `<div class="ex">${esc(ex)}</div><div class="muted">${esc(w.exZh || S.exCache[w.w]?.exZh || "")}</div>`;
  return S.settings.geminiKey ? `<button class="known" id="aiex">✨ AI 產生學術例句</button>`
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
      else { correct++; S.mistakes = S.mistakes.filter(m => m.q !== q.q); }
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
      ① 把你錯的題目收進「歷屆錯題專區」<br>
      ② 錯的單字／片語：<b>字庫已經有的直接排進今天複習</b>，沒有的才新增<br>
      ③ 從錯誤延伸出類似題</p>
    <div class="card-box">
      <h3>1. 哪一份考卷</h3>
      <div class="row"><select class="search half" id="school">${SCHOOLS.map(x => `<option>${x}</option>`).join("")}</select>
        <select class="search half" id="year">${years.map(y => `<option>${y}</option>`).join("")}</select></div>
      <h3>2. 上傳</h3>
      <label class="drop" id="drop"><input type="file" id="file" accept="application/pdf,image/*" hidden><span id="fname">📄 點此選擇 PDF 或拍照</span></label>
      <textarea id="txt" rows="4" placeholder="或直接貼上題目與你的答案…"></textarea>
      <h3>3. 補充說明（選填）</h3>
      <input class="search" id="note" placeholder="例：第 3、7 題錯，第 12 題用猜的；正確答案 1-10: BCADA…">
      <button class="cta" id="go">✨ AI 分析</button>
      <div id="out"></div>
    </div>
    <details class="card-box" ${st.geminiKey ? "" : "open"}>
      <summary><b>Gemini 設定</b> ${st.geminiKey ? `<span class="pill good">已設定</span>` : `<span class="pill badc">尚未設定</span>`}</summary>
      <p class="muted small">到 Google AI Studio（aistudio.google.com）免費申請 API Key，貼在下面。Key 只會存在這支手機，不會上傳到其他地方。</p>
      <input class="search" id="key" type="password" placeholder="貼上 Gemini API Key" value="${esc(st.geminiKey)}">
      <input class="search" id="model" placeholder="模型名稱" value="${esc(st.model)}">
      <button class="ghost" id="savek">儲存</button>
    </details>`;
  let file = null;
  $("#file").onchange = e => { file = e.target.files[0]; $("#fname").textContent = file ? "✅ " + file.name : "📄 點此選擇 PDF 或拍照"; };
  $("#savek").onclick = () => { st.geminiKey = $("#key").value.trim(); st.model = $("#model").value.trim() || "gemini-3.8-flash"; save(); toast("已儲存"); render(); };
  $("#go").onclick = async () => {
    if (!st.geminiKey) { toast("請先設定 Gemini API Key"); return; }
    if (!file && !$("#txt").value.trim()) { toast("請上傳檔案或貼上文字"); return; }
    const out = $("#out"), src = `${$("#school").value} ${$("#year").value}`;
    out.innerHTML = `<div class="loading"><i></i>AI 分析中，約 10–30 秒…</div>`;
    $("#go").disabled = true;
    try { showResult(out, await analyze(file, $("#txt").value, $("#note").value), src); }
    catch (e) { out.innerHTML = `<div class="explain badc"><b>失敗</b> ${esc(/fetch/i.test(e.message) ? "無法連線到 Gemini（預覽版會擋外部連線，部署到正式網址後就能用）" : e.message)}</div>`; }
    finally { $("#go").disabled = false; }
  };
}

const PROMPT = `你是台灣研究所入學考試（台大、清大、交大、台科大 工業工程/工業管理所）的英文家教。
以下是學生寫過的歷屆英文考題與他的作答。請：
1. wrong：列出學生「答錯」或「不確定」的每一題。保留原題目與選項，標出學生的答案與正確答案，用中文解析，並寫出考的知識點（point，例如「片語 take over」「假設語氣倒裝」「單字 mitigate」）。
2. vocab：這些錯題牽涉到的單字（含正確答案與學生誤選的選項），以及值得延伸的同字根、同義、易混淆字。附詞性、中文、一句學術/工工情境例句與中譯。
3. phrases：錯題牽涉到的片語（例如 take on / take over），附中文與例句。
4. questions：從錯誤延伸的新選擇題（仿研究所難度，四個選項，附中文解析）。
5. 每項附 reason（例如「第 3 題選錯」「延伸自 adapt/adopt 混淆」）。
只輸出 JSON：
{"summary":"中文總結弱點","wrong":[{"no":"題號","q":"題目","opts":["","","",""],"mine":0,"a":1,"ex":"解析","point":"知識點"}],"vocab":[{"w":"","pos":"","zh":"","ex":"","exZh":"","reason":""}],"phrases":[{"w":"","zh":"","ex":"","reason":""}],"questions":[{"q":"","opts":["","","",""],"a":0,"ex":"","reason":""}]}
mine 與 a 是選項索引（0 開始）；學生沒作答或非選擇題時 mine 填 -1，opts 可為空陣列。`;

async function analyze(file, text, note) {
  const parts = [{ text: PROMPT + (note ? `\n學生補充：${note}` : "") + (text ? `\n\n題目內容：\n${text}` : "") }];
  if (file) {
    if (file.size > 15 * 1024 * 1024) throw new Error("檔案超過 15MB，請分頁上傳");
    const b64 = await new Promise((ok, no) => { const r = new FileReader(); r.onload = () => ok(r.result.split(",")[1]); r.onerror = no; r.readAsDataURL(file); });
    parts.push({ inline_data: { mime_type: file.type || "application/pdf", data: b64 } });
  }
  return gemini(parts);
}

async function gemini(parts) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(S.settings.model)}:generateContent`;
  const r = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-goog-api-key": S.settings.geminiKey },
    body: JSON.stringify({ contents: [{ role: "user", parts }], generationConfig: { responseMimeType: "application/json", temperature: 0.4 } }),
  });
  const j = await r.json();
  if (!r.ok) throw new Error(j.error?.message || `HTTP ${r.status}`);
  const t = j.candidates?.[0]?.content?.parts?.map(p => p.text).join("") || "";
  try { return JSON.parse(t.replace(/^```json|```$/g, "").trim()); }
  catch { throw new Error("AI 回傳格式無法解析，請再試一次"); }
}

function showResult(out, res, src) {
  const ok4 = x => Array.isArray(x.opts) && x.opts.length === 4 && x.a >= 0 && x.a < 4;
  const wrong = (res.wrong || []).filter(x => x.q);
  const items = [
    ...(res.vocab || []).filter(x => x.w && x.zh).map(x => ({ ...x, kind: "v" })),
    ...(res.phrases || []).filter(x => x.w && x.zh).map(x => ({ ...x, kind: "p" })),
  ].map(x => ({ ...x, hit: findWord(x.w) }));
  const q = (res.questions || []).filter(x => x.q && ok4(x));
  const li = (x, i) => `<li><label><input type="checkbox" checked data-i="${i}"><div><b>${esc(x.w)}</b> ${esc(x.zh)}
      ${x.hit ? `<span class="pill good">字庫已有 → 排入複習</span>` : `<span class="pill new">新增</span>`}${x.kind === "p" ? `<span class="pill">片語</span>` : ""}
      <div class="muted small">${esc(x.reason || "")}</div></div></label></li>`;
  out.innerHTML = `
    ${res.summary ? `<div class="explain"><b>弱點分析</b> ${esc(res.summary)}</div>` : ""}
    <h3>歷屆錯題 <small>${wrong.length} 題 → 存進錯題專區</small></h3>
    <ul class="pick">${wrong.map((x, i) => `<li><label><input type="checkbox" checked data-w="${i}"><div>${esc(x.no ? x.no + ". " : "")}${esc(x.q)}<div class="muted small">${esc(x.point || "")}</div></div></label></li>`).join("")}</ul>
    <h3>單字 / 片語 <small>${items.length}</small></h3>
    <ul class="pick">${items.map(li).join("")}</ul>
    <h3>延伸題 <small>${q.length}</small></h3>
    <ul class="pick">${q.map((x, i) => `<li><label><input type="checkbox" checked data-q="${i}"><div>${esc(x.q)}<div class="muted small">${esc(x.reason || "")}</div></div></label></li>`).join("")}</ul>
    <button class="cta" id="addall">全部存進題庫</button>`;
  $("#addall").onclick = () => {
    let nw = 0, nNew = 0, nRev = 0, nq = 0;
    out.querySelectorAll("input[data-w]:checked").forEach(c => {
      const x = wrong[+c.dataset.w];
      if (S.past.some(p => p.q === x.q)) return;
      S.past.unshift({ id: Date.now() + "" + nw, src, no: x.no || "", q: x.q, opts: Array.isArray(x.opts) ? x.opts : [], mine: x.mine ?? -1, a: x.a ?? -1, ex: x.ex || "", point: x.point || "", t: Date.now(), done: 0 });
      nw++;
    });
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
        ${p.ex ? `<div class="explain">${esc(p.ex)}</div>` : ""}
        <button class="icon small del" data-id="${esc(p.id)}">刪除</button></li>`).join("")}</ul>`
      : `<div class="card-box center"><p class="muted">還沒有歷屆錯題。</p><a class="cta block" href="#import">上傳第一份考卷</a></div>`}`;
  if ($("#srcs")) $("#srcs").onclick = e => { const b = e.target.closest(".chip"); if (b) location.hash = `#past-${encodeURIComponent(b.dataset.s)}`; };
  if ($("#redo")) $("#redo").onclick = () => Past(el, filter, "quiz");
  el.querySelectorAll(".del").forEach(b => b.onclick = () => { S.past = S.past.filter(p => p.id !== b.dataset.id); save(); Past(el, filter); });
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
if ("serviceWorker" in navigator && location.protocol === "https:") navigator.serviceWorker.register("./sw.js").catch(() => {});
