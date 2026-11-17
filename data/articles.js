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
  {
    id: "aijobs",
    title: "Will Automation Replace Workers?",
    topic: "科技與 AI",
    paras: [
      "Few topics generate as much anxiety as the prospect of machines replacing human labor. Early studies predicted that nearly half of all jobs were at high risk of automation. More recent research, however, suggests that this estimate was exaggerated, because it treated entire occupations as automatable rather than examining the individual tasks that make up each job.",
      "When jobs are broken down into tasks, a different picture emerges. Most occupations contain a mix of routine tasks, which machines perform well, and non-routine tasks that require judgment, creativity, or social interaction. Automation therefore tends to reshape jobs rather than eliminate them outright. Bank tellers, for example, did not disappear after the introduction of ATMs; instead, their role shifted toward customer relationships and sales.",
      "This does not mean the transition will be painless. Workers whose jobs consist largely of routine tasks face real displacement, and the benefits of productivity gains are not evenly distributed. Policymakers are thus increasingly focused on retraining programs that help workers acquire skills complementary to, rather than substitutable by, intelligent machines.",
    ],
    hard: [
      { s: "More recent research, however, suggests that this estimate was exaggerated, because it treated entire occupations as automatable rather than examining the individual tasks that make up each job.",
        parse: "主詞 research ｜ 動詞 suggests ｜ that 子句當受詞 ｜ because 子句說明原因 ｜ A rather than B：treated… 而不是 examining… ｜ that make up each job 修飾 tasks" },
    ],
    vocab: ["prospect", "exaggerated", "routine", "outright", "displacement", "complementary"],
    qs: [
      { q: "According to the passage, why were early predictions exaggerated?", opts: ["They ignored the cost of machines.", "They assumed whole occupations could be automated instead of analyzing tasks.", "They focused only on bank tellers.", "They overestimated the number of workers."], a: 1, ex: "第一段最後：treated entire occupations as automatable rather than examining the individual tasks。" },
      { q: "The example of bank tellers is used to show that ___.", opts: ["ATMs failed commercially", "automation often changes jobs rather than eliminating them", "banks reduced their staff sharply", "customers prefer machines"], a: 1, ex: "第二段：Automation tends to reshape jobs rather than eliminate them，接著舉 bank tellers 為例。" },
      { q: "The word \"complementary\" in the last paragraph is closest in meaning to ___.", opts: ["free of charge", "supportive and additional", "identical", "opposing"], a: 1, ex: "complementary to = 與…互補；和 substitutable by（可被取代）相對。" },
      { q: "What is the author's attitude toward the effects of automation?", opts: ["Entirely optimistic", "Entirely pessimistic", "Balanced: jobs change, but some workers still face real difficulties", "Indifferent"], a: 2, ex: "第三段 This does not mean the transition will be painless → 持平觀點。" },
    ],
  },
  {
    id: "circular",
    title: "From a Linear to a Circular Economy",
    topic: "永續與能源",
    paras: [
      "For most of the industrial era, production has followed a linear model: raw materials are extracted, turned into products, and eventually discarded. This \"take-make-dispose\" approach assumes that resources are abundant and that waste can be absorbed by the environment at little cost. Neither assumption holds today.",
      "A circular economy seeks to keep materials in use for as long as possible. Products are designed to be repaired, remanufactured, or recycled, so that the value embedded in them is not lost at the end of their first life. Some manufacturers have shifted from selling products to selling services; a lighting company, for instance, may charge customers for illumination rather than for light bulbs, giving the firm an incentive to make bulbs that last longer.",
      "Critics point out that recycling itself consumes energy and that many products are too complex to disassemble economically. Nonetheless, advocates argue that the main obstacles are not technical but institutional: tax systems, accounting rules, and consumer habits are still built around the linear model.",
    ],
    hard: [
      { s: "Products are designed to be repaired, remanufactured, or recycled, so that the value embedded in them is not lost at the end of their first life.",
        parse: "主詞 Products ｜ 動詞 are designed（被動）｜ to be repaired / remanufactured / recycled 三個平行的被動不定詞 ｜ so that 引導目的子句 ｜ embedded in them 是過去分詞片語修飾 value" },
    ],
    vocab: ["extracted", "discarded", "abundant", "remanufactured", "incentive", "institutional"],
    qs: [
      { q: "Which assumption of the linear model does the author reject?", opts: ["Products can be sold as services.", "Resources are abundant and waste is cheap to absorb.", "Recycling consumes energy.", "Consumers prefer durable goods."], a: 1, ex: "第一段：assumes that resources are abundant and that waste can be absorbed… Neither assumption holds today。" },
      { q: "Why would a lighting company that sells illumination make longer-lasting bulbs?", opts: ["Because the law requires it", "Because it earns more when bulbs need replacing less often", "Because customers buy more bulbs", "Because recycling is free"], a: 1, ex: "賣「照明服務」時，燈泡越耐用，公司成本越低 → 有誘因做耐用的燈泡。" },
      { q: "According to advocates, the main barriers to a circular economy are ___.", opts: ["technical", "institutional", "geographical", "biological"], a: 1, ex: "最後一句：not technical but institutional。" },
    ],
  },
  {
    id: "nudge",
    title: "Nudges and Decision-Making",
    topic: "心理與行為",
    paras: [
      "Traditional economics assumes that people make rational decisions by carefully weighing costs and benefits. Behavioral research has shown, however, that choices are strongly influenced by how options are presented. A small change in the \"choice architecture\" — the context in which decisions are made — can lead to large changes in behavior.",
      "One of the most cited examples involves retirement savings. When employees must actively sign up for a pension plan, participation rates are often low. When enrollment is automatic and employees must actively opt out, participation rises dramatically, even though the financial incentives are identical. The default option, it seems, carries a powerful psychological weight.",
      "Such interventions, known as nudges, are attractive to governments because they are inexpensive and preserve freedom of choice. Yet critics warn that nudges can be manipulative if people are unaware of them, and that they address symptoms rather than the underlying causes of poor decisions.",
    ],
    hard: [
      { s: "When enrollment is automatic and employees must actively opt out, participation rises dramatically, even though the financial incentives are identical.",
        parse: "When 子句（兩個子句以 and 連接）｜ 主要子句 participation rises ｜ even though 讓步子句：即使誘因相同" },
    ],
    vocab: ["rational", "architecture", "enrollment", "default", "intervention", "manipulative"],
    qs: [
      { q: "The retirement savings example demonstrates that ___.", opts: ["financial incentives are the main driver of behavior", "default options strongly influence choices", "employees dislike pension plans", "automatic enrollment is illegal"], a: 1, ex: "誘因相同，只改預設選項，參與率就大增 → 預設選項影響很大。" },
      { q: "Why are nudges attractive to governments?", opts: ["They are cheap and do not remove choices.", "They force people to save.", "They replace taxes.", "They are invisible to critics."], a: 0, ex: "第三段：inexpensive and preserve freedom of choice。" },
      { q: "Which is a criticism of nudges mentioned in the passage?", opts: ["They are too expensive.", "They may be manipulative and ignore root causes.", "They reduce participation.", "They only work in economics."], a: 1, ex: "最後一句列出兩個批評：manipulative、address symptoms rather than causes。" },
    ],
  },
  {
    id: "causation",
    title: "Correlation Is Not Causation",
    topic: "研究與數據",
    paras: [
      "Data on ice cream sales and drowning incidents reveal a striking pattern: both rise and fall together over the year. It would be absurd, however, to conclude that eating ice cream causes drowning. Both variables are driven by a third factor, hot weather, which increases both swimming and the demand for cold desserts.",
      "Such confounding variables are a persistent problem in observational studies. A company might observe that employees who attend training programs are more productive, but this does not prove that training raises productivity. Highly motivated employees may be more likely both to volunteer for training and to perform well.",
      "The most reliable way to establish causation is a randomized controlled experiment, in which participants are randomly assigned to treatment and control groups. Randomization ensures that, on average, the groups differ only in the treatment itself. When experiments are impractical or unethical, researchers rely on statistical techniques to approximate this ideal, but the conclusions must then be interpreted with caution.",
    ],
    hard: [
      { s: "Highly motivated employees may be more likely both to volunteer for training and to perform well.",
        parse: "be likely to V（可能會）｜ both A and B 平行：to volunteer… / to perform… ｜ 意思：動機高的員工本來就比較會報名、也比較會表現好" },
    ],
    vocab: ["striking", "confounding", "observational", "randomized", "impractical", "approximate"],
    qs: [
      { q: "In the ice cream example, hot weather is ___.", opts: ["the result of drowning", "a confounding variable", "a control group", "a random error"], a: 1, ex: "同時影響兩個變數的第三因子 = 干擾變數 confounding variable。" },
      { q: "Why doesn't the training example prove that training raises productivity?", opts: ["The sample is too small.", "Motivated employees may both attend training and perform well.", "Training is too expensive.", "Productivity cannot be measured."], a: 1, ex: "第二段最後一句：動機是第三因子。" },
      { q: "What is the main advantage of random assignment?", opts: ["It is cheaper.", "It makes groups differ only in the treatment, on average.", "It eliminates the need for data.", "It guarantees significant results."], a: 1, ex: "Randomization ensures that… the groups differ only in the treatment itself。" },
      { q: "The passage would most likely appear in ___.", opts: ["a travel guide", "an introductory research methods textbook", "a cooking magazine", "a company's annual report"], a: 1, ex: "內容在講相關與因果、實驗設計 → 研究方法教科書。" },
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
