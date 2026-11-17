// 閱讀文章 + 寫作素材
export const READINGS = [
  {
    id: "bullwhip",
    title: "The Bullwhip Effect in Supply Chains",
    topic: "供應鏈",
    paras: [
      "The bullwhip effect refers to the phenomenon in which small fluctuations in consumer demand are amplified as orders move upstream in a supply chain. A retailer that observes a slight increase in sales may place a larger order with its wholesaler, who in turn orders even more from the manufacturer.",
      "Several factors contribute to this distortion. Demand forecast updating, order batching, price fluctuations, and rationing during shortages all cause upstream members to perceive demand as more variable than it actually is. Consequently, firms hold excessive inventory, incur higher transportation costs, and experience poor capacity utilization.",
      "Although the bullwhip effect cannot be eliminated entirely, it can be substantially mitigated. Sharing point-of-sale data, reducing lead times, and adopting vendor-managed inventory enable supply chain partners to base their decisions on actual rather than inferred demand.",
    ],
    hard: [
      { s: "A retailer that observes a slight increase in sales may place a larger order with its wholesaler, who in turn orders even more from the manufacturer.",
        parse: "主詞 A retailer ← (that observes… 形容詞子句修飾 retailer) ｜ 動詞 may place ｜ 受詞 a larger order ｜ , who in turn… 非限定子句補充說明 wholesaler" },
    ],
    vocab: ["amplify", "upstream", "distortion", "rationing", "mitigate", "inferred"],
    qs: [
      { q: "What is the main idea of the passage?", opts: ["Retailers should avoid large orders.", "Demand variability is amplified upstream, and it can be reduced through coordination.", "The bullwhip effect can be completely eliminated.", "Price fluctuations are the only cause of the bullwhip effect."], a: 1, ex: "第一段定義、第二段原因、第三段解法 → 主旨是 B。" },
      { q: "The word \"mitigated\" in paragraph 3 is closest in meaning to ___.", opts: ["eliminated", "measured", "reduced", "ignored"], a: 2, ex: "mitigate = 減輕；文中前面說 cannot be eliminated entirely，所以不是 eliminated。" },
      { q: "Which is NOT mentioned as a cause of the bullwhip effect?", opts: ["Order batching", "Price fluctuations", "Rationing during shortages", "Labor strikes"], a: 3, ex: "第二段列出四個原因，沒有 labor strikes。" },
    ],
  },
];

export const WRITING = {
  structures: [
    {
      name: "論說文（Argumentative）五段式",
      parts: [
        ["Introduction", "背景 1–2 句 → 爭議點 → 明確立場（thesis）", "With the rapid development of ___, whether ___ has become a heated debate. From my perspective, ___ because ___ and ___."],
        ["Body 1", "論點一 + 解釋 + 例子", "First and foremost, ___. For instance, ___. This clearly shows that ___."],
        ["Body 2", "論點二 + 數據/研究", "In addition, ___. According to recent studies, ___. As a result, ___."],
        ["Concession", "承認反方 → 反駁", "Admittedly, some may argue that ___. However, this view overlooks the fact that ___."],
        ["Conclusion", "重申立場 + 建議/展望", "In conclusion, ___. Therefore, it is advisable that ___ so that ___."],
      ],
    },
    {
      name: "摘要 / 研究段落（Summary）",
      parts: [
        ["目的", "研究在做什麼", "This study aims to investigate ___."],
        ["方法", "怎麼做", "To this end, a ___ model was developed and tested using ___."],
        ["結果", "發現", "The results indicate that ___ significantly ___."],
        ["意涵", "貢獻", "These findings provide practical implications for ___."],
      ],
    },
  ],
  patterns: [
    ["It is widely acknowledged that…", "眾所公認…"],
    ["Not only… but also…", "不僅…而且…（置首要倒裝）"],
    ["Given that…, it is reasonable to…", "鑒於…，合理的做法是…"],
    ["…, which in turn leads to…", "…進而導致…"],
    ["The extent to which… depends on…", "…的程度取決於…"],
    ["A is attributable to B", "A 歸因於 B"],
    ["There is a trade-off between A and B", "A 與 B 之間有取捨"],
    ["Contrary to popular belief, …", "與一般看法相反…"],
    ["It remains unclear whether…", "是否…仍不清楚"],
    ["…plays a pivotal role in…", "…在…中扮演關鍵角色"],
  ],
  ideas: [
    { topic: "Should AI replace human decision-making in manufacturing?",
      pro: ["處理大量即時數據，速度快、一致性高", "減少人為疲勞與錯誤", "預測保養降低停機"],
      con: ["黑箱，難以解釋與問責", "資料偏誤導致錯誤決策", "例外狀況仍需人類經驗"],
      ex: "例：半導體廠用 AI 做缺陷檢測，但最終良率決策仍由工程師判斷（human-in-the-loop）" },
    { topic: "Is remote work beneficial to productivity?",
      pro: ["省通勤時間", "專注、彈性", "企業可招募全球人才"],
      con: ["溝通成本上升", "團隊凝聚力下降", "工作與生活界線模糊"],
      ex: "例：混合辦公（hybrid）成為多數科技公司的折衷方案" },
  ],
};
