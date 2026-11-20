// 離線快取：先回快取、背景更新
const CACHE = "iee-v7";
const ASSETS = ["./", "index.html", "style.css", "app.js", "data/words.js", "data/grammar.js", "data/articles.js", "data/awl.js", "data/l7000.js", "data/toefl.js", "data/phrases.js", "data/l7000/p1.js", "data/l7000/p2.js", "data/l7000/p3.js", "data/l7000/p4.js", "data/l7000/p5.js", "data/l7000/p6.js", "manifest.webmanifest", "icons/icon-180.png", "icons/icon-192.png"];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS))); self.skipWaiting(); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))); self.clients.claim(); });
self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET" || url.origin !== location.origin) return; // AI 請求不快取
  e.respondWith(caches.match(e.request).then(hit => {
    const net = fetch(e.request).then(r => { if (r.ok) caches.open(CACHE).then(c => c.put(e.request, r.clone())); return r; }).catch(() => hit);
    return hit || net;
  }));
});
