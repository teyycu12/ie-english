// 高中 7000 單字 Level 5–6（依記憶整理，分級可能有少數出入）
// 每個字都有：詞性、中文、學術情境例句、例句中譯
// 與 AWL / 托福 / 片語重複的字會自動歸到那些字庫，不會出現兩次
import p1 from "./l7000/p1.js";
import p2 from "./l7000/p2.js";
import p3 from "./l7000/p3.js";
import p4 from "./l7000/p4.js";
import p5 from "./l7000/p5.js";
import p6 from "./l7000/p6.js";

export const L7000 = [p1, p2, p3, p4, p5, p6].flatMap(block =>
  block.trim().split("\n").map(line => {
    const [lv, w, pos, zh, ex, exZh] = line.split("|");
    return { w, pos, zh, ex, exZh, tag: "L7000", sub: +lv };
  })
);
