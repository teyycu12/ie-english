import { WORDS } from "./data/words.js";
import { GRAMMAR } from "./data/grammar.js";
import { READINGS, WRITING } from "./data/articles.js";

/* ================= 儲存 ================= */
const KEY = "iee:v1";
const DAY = 86400000;
const NEW_PER_DAY = 20;
const defaults = () => ({
  cards: {}, custom: [], customQs: [], mistakes: [],
  streak: { last: "", n: 0 }, log: {},
  settings: { geminiKey: "", model: "gemini-2.5-flash", newPerDay: NEW_PER_DAY },
});
let S = load();
function load() {
  try { return Object.assign(defaults(), JSON.parse(localStorage.getItem(KEY)) || {}); }
  catch { return defaults(); }
}
function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch {} }
if (navigator.storage?.persist) navigator.storage.persist();

const today = () => new Date().toLocaleDateString("sv"); // YYYY-MM-DD
const esc = (s = "") => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const $ = sel => document.querySelector(sel);
const allWords = () => [...WORDS, ...S.custom];
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
  if (tag && tag !== "ALL") ws = ws.filter(w => w.tag === tag);
  const due = ws.filter(w => S.cards[w.w] && S.cards[w.w].due <= now).sort((a, b) => S.cards[a.w].due - S.cards[b.w].due);
  const newLeft = Math.max(0, S.settings.newPerDay - newIntroducedToday());
  const fresh = ws.filter(w => !S.cards[w.w]).slice(0, newLeft);
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
const routes = { home: Home, vocab: Vocab, grammar: Grammar, read: Read, import: Import };
function render() {
  const [name, ...args] = (location.hash.replace(/^#\/?/, "") || "home").split(/[\/-]/);
  const view = routes[name] || Home;
  document.querySelectorAll("nav.tabs a").forEach(a => a.classList.toggle("on", a.dataset.r === name));
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
      <a class="tile" href="#vocab-quiz"><span>🎯</span><b>單字選擇題</b><small>模擬考題</small></a>
      <a class="tile" href="#import"><span>📥</span><b>匯入考卷</b><small>AI 挑錯題出題</small></a>
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
function Vocab(el, mode) {
  if (mode === "cards") return Flash(el);
  if (mode === "quiz") return VocabQuiz(el);
  const tags = [["ALL", "全部"], ["AWL", "學術字彙 AWL"], ["IE", "工工領域"], ["GRE", "GRE/TOEFL"], ["MINE", "我的錯題字"]];
  const ws = allWords();
  el.innerHTML = `
    <h2 class="title">單字</h2>
    <div class="row">
      <button class="cta half" onclick="location.hash='#vocab-cards'">翻卡複習</button>
      <button class="cta half alt" onclick="location.hash='#vocab-quiz'">選擇題</button>
    </div>
    <div class="chips" id="tagchips">${tags.map(([t, n], i) => `<button class="chip ${i ? "" : "on"}" data-t="${t}">${n}</button>`).join("")}</div>
    <input class="search" id="q" placeholder="搜尋單字或中文…">
    <ul class="wlist" id="wl"></ul>`;
  let tag = "ALL";
  const draw = () => {
    const q = $("#q").value.trim().toLowerCase();
    const list = ws.filter(w => (tag === "ALL" || w.tag === tag) && (!q || w.w.toLowerCase().includes(q) || w.zh.includes(q)));
    $("#wl").innerHTML = list.map(w => {
      const c = S.cards[w.w];
      const lv = !c ? "new" : c.ivl >= 21 ? "good" : c.lapses > 1 ? "bad" : "mid";
      return `<li><i class="dot ${lv}"></i><div><b>${esc(w.w)}</b> <small>${esc(w.pos)}</small><div class="muted">${esc(w.zh)}</div></div><button class="icon" onclick="speak(${esc(JSON.stringify(w.w))})">🔊</button></li>`;
    }).join("") || `<p class="muted center">沒有符合的單字</p>`;
  };
  $("#tagchips").onclick = e => {
    const b = e.target.closest(".chip"); if (!b) return;
    tag = b.dataset.t; document.querySelectorAll("#tagchips .chip").forEach(x => x.classList.toggle("on", x === b)); draw();
  };
  $("#q").oninput = draw; draw();
}

function Flash(el) {
  let queue = buildQueue("ALL");
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
      <div class="topbar"><a href="#vocab" class="back">‹</a><div class="prog"><i style="width:${total ? done / (total + done) * 100 : 0}%"></i></div><span class="muted">${queue.length}</span></div>
      <div class="flash" id="fc">
        <div class="face front">
          ${isNew ? `<span class="pill new">NEW</span>` : ""}<span class="pill">${esc(w.tag)}</span>
          <div class="word">${esc(w.w)}</div><div class="pos">${esc(w.pos)}</div>
          <button class="icon big" id="sp">🔊</button>
          <div class="hint">點一下翻面</div>
        </div>
        <div class="face bk">
          <div class="word sm">${esc(w.w)} <small>${esc(w.pos)}</small></div>
          <div class="zh">${esc(w.zh)}</div>
          <div class="ex">${esc(w.ex)}</div><div class="muted">${esc(w.exZh)}</div>
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
      <p class="muted center small">左滑＝不會 · 右滑＝會</p>`;
    const fc = $("#fc");
    $("#sp").onclick = e => { e.stopPropagation(); speak(w.w); };
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
function ivlLabel(w, r) {
  const c = S.cards[w.w] || { ease: 2.5, ivl: 0, reps: 0 };
  let d = r === 1 ? Math.max(1, c.ivl * 1.2) : r === 2 ? (c.reps === 0 ? 1 : c.reps === 1 ? 3 : c.ivl * c.ease) : Math.max(4, (c.ivl || 1) * (c.ease + 0.15) * 1.3);
  d = Math.round(d);
  return d >= 30 ? `${Math.round(d / 30)} 個月` : `${d} 天`;
}

function VocabQuiz(el) {
  const ws = allWords();
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
    const mode = Math.random() < 0.5 ? "en2zh" : "cloze";
    const opts = shuffle([w, ...shuffle(ws.filter(x => x.w !== w.w)).slice(0, 3)]);
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
      $("#fb").innerHTML = `<div class="explain ${ok ? "good" : "badc"}"><b>${ok ? "答對" : "答錯"}</b> ${esc(w.w)}：${esc(w.zh)}<div class="ex">${esc(w.ex)}</div></div><button class="cta" id="nx">下一題</button>`;
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

function Quiz(el, t, back, kind = "文法") {
  const qs = shuffle(t.qs);
  let n = 0, correct = 0;
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
function Import(el) {
  const st = S.settings;
  el.innerHTML = `<h2 class="title">匯入考卷</h2>
    <p class="muted">上傳寫過的題目（PDF / 照片 / 貼文字），AI 會挑出你錯的、不確定的、可以延伸的知識點，變成單字卡和題目。</p>
    <div class="card-box">
      <h3>1. 上傳</h3>
      <label class="drop" id="drop"><input type="file" id="file" accept="application/pdf,image/*" hidden><span id="fname">📄 點此選擇 PDF 或拍照</span></label>
      <textarea id="txt" rows="4" placeholder="或直接貼上題目與你的答案…"></textarea>
      <h3>2. 補充說明（選填）</h3>
      <input class="search" id="note" placeholder="例：第 3、7 題錯，第 12 題用猜的">
      <button class="cta" id="go">✨ AI 分析並出題</button>
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
  $("#savek").onclick = () => { st.geminiKey = $("#key").value.trim(); st.model = $("#model").value.trim() || "gemini-2.5-flash"; save(); toast("已儲存"); render(); };
  $("#go").onclick = async () => {
    if (!st.geminiKey) { toast("請先設定 Gemini API Key"); return; }
    if (!file && !$("#txt").value.trim()) { toast("請上傳檔案或貼上文字"); return; }
    const out = $("#out");
    out.innerHTML = `<div class="loading"><i></i>AI 分析中，約 10–30 秒…</div>`;
    $("#go").disabled = true;
    try {
      const res = await analyze(file, $("#txt").value, $("#note").value);
      showResult(out, res);
    } catch (e) {
      out.innerHTML = `<div class="explain badc"><b>失敗</b> ${esc(/fetch/i.test(e.message) ? "無法連線到 Gemini（預覽版會擋外部連線，部署到正式網址後就能用）" : e.message)}</div>`;
    } finally { $("#go").disabled = false; }
  };
}

const PROMPT = `你是台灣研究所入學考試（台大、清大、交大、台科大 工業工程/工業管理所）的英文家教。
以下是學生寫過的英文考題與他的作答。請：
1. 找出學生「答錯」「不確定」的題目，以及「可以延伸」的知識點（同字根、同義字、易混淆字、同類文法）。
2. 產出單字卡（vocab）：每個字附詞性、中文、一句學術/工工情境例句與中譯、同義字、常見搭配、字根。
3. 產出文法/克漏字選擇題（questions）：仿照研究所考題難度，四個選項，附中文解析。
4. 每項附 reason，說明為什麼挑這個（例如「第 3 題選錯」「延伸自 adapt/adopt 混淆」）。
只輸出 JSON，格式：
{"summary":"一段中文總結學生的弱點","vocab":[{"w":"","pos":"","zh":"","ex":"","exZh":"","syn":"","col":"","root":"","reason":""}],"questions":[{"q":"","opts":["","","",""],"a":0,"ex":"","reason":""}]}
單字 5–15 個、題目 5–10 題。`;

async function analyze(file, text, note) {
  const parts = [{ text: PROMPT + (note ? `\n學生補充：${note}` : "") + (text ? `\n\n題目內容：\n${text}` : "") }];
  if (file) {
    if (file.size > 15 * 1024 * 1024) throw new Error("檔案超過 15MB，請分頁上傳");
    const b64 = await new Promise((ok, no) => { const r = new FileReader(); r.onload = () => ok(r.result.split(",")[1]); r.onerror = no; r.readAsDataURL(file); });
    parts.push({ inline_data: { mime_type: file.type || "application/pdf", data: b64 } });
  }
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

function showResult(out, res) {
  const v = (res.vocab || []).filter(x => x.w && x.zh);
  const q = (res.questions || []).filter(x => x.q && Array.isArray(x.opts) && x.opts.length === 4 && x.a >= 0 && x.a < 4);
  out.innerHTML = `
    ${res.summary ? `<div class="explain"><b>弱點分析</b> ${esc(res.summary)}</div>` : ""}
    <h3>單字卡 <small>${v.length}</small></h3>
    <ul class="pick">${v.map((x, i) => `<li><label><input type="checkbox" checked data-v="${i}"><div><b>${esc(x.w)}</b> ${esc(x.zh)}<div class="muted small">${esc(x.reason || "")}</div></div></label></li>`).join("")}</ul>
    <h3>題目 <small>${q.length}</small></h3>
    <ul class="pick">${q.map((x, i) => `<li><label><input type="checkbox" checked data-q="${i}"><div>${esc(x.q)}<div class="muted small">${esc(x.reason || "")}</div></div></label></li>`).join("")}</ul>
    <button class="cta" id="addall">加入題庫</button>`;
  $("#addall").onclick = () => {
    let nv = 0, nq = 0;
    out.querySelectorAll("input[data-v]:checked").forEach(c => {
      const x = v[+c.dataset.v];
      const ex = S.custom.findIndex(w => w.w.toLowerCase() === x.w.toLowerCase());
      const card = { w: x.w, pos: x.pos || "", zh: x.zh, ex: x.ex || "", exZh: x.exZh || "", syn: x.syn || "", col: x.col || "", root: x.root || "", tag: "MINE" };
      if (ex >= 0) S.custom[ex] = card; else if (!WORDS.some(w => w.w === x.w)) S.custom.push(card);
      nv++;
    });
    out.querySelectorAll("input[data-q]:checked").forEach(c => {
      const x = q[+c.dataset.q];
      if (!S.customQs.some(y => y.q === x.q)) { S.customQs.push({ q: x.q, opts: x.opts, a: x.a, ex: x.ex || "" }); nq++; }
    });
    save(); toast(`已加入 ${nv} 個單字、${nq} 題`);
    out.innerHTML = `<div class="explain good"><b>完成</b> 單字已進入複習排程，題目在「文法 → 我的錯題延伸」。</div>`;
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
