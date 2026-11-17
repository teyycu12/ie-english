// 文法考點：每個考點有重點說明 + 題目
// q: 題目, opts: 選項, a: 正確答案 index, ex: 解析
export const GRAMMAR = [
  {
    id: "subjunctive", title: "假設語氣", tip:
      "與現在事實相反：If S + were/V-ed, S + would + V\n與過去事實相反：If S + had p.p., S + would have p.p.\n省略 if 倒裝：Had I known… / Were it not for… / Should you need…\n要求/建議類動詞 (suggest, require, insist) + that S + (should) V原形",
    qs: [
      { q: "Had the manager ___ the risk earlier, the project would not have failed.", opts: ["recognize", "recognized", "had recognized", "recognizing"], a: 1, ex: "Had + S + p.p. 是 If S had p.p. 的倒裝，與過去事實相反。" },
      { q: "The committee recommended that every proposal ___ reviewed by two experts.", opts: ["is", "was", "be", "being"], a: 2, ex: "recommend that S + (should) + V原形 → be。" },
      { q: "___ it not for government subsidies, many startups would fail.", opts: ["Were", "Was", "Had", "If"], a: 0, ex: "Were it not for = If it were not for（若不是…），與現在事實相反。" },
    ],
  },
  {
    id: "participle", title: "分詞構句", tip:
      "主詞相同時，副詞子句可省略連接詞與主詞，動詞改分詞。\n主動 → V-ing；被動 → p.p.；完成 → Having p.p.\n主詞不同要保留主詞（獨立分詞構句）：Weather permitting, …",
    qs: [
      { q: "___ in 1990, the company has grown into a global leader.", opts: ["Founding", "Founded", "Having founded", "To found"], a: 1, ex: "公司是「被」創立 → 被動 p.p. Founded。" },
      { q: "___ the data, the researchers drew several conclusions.", opts: ["Analyzed", "Having analyzed", "Being analyzed", "To be analyzed"], a: 1, ex: "研究者「先」分析資料再下結論 → 主動且先發生 → Having analyzed。" },
      { q: "All things ___, the second plan is more cost-effective.", opts: ["consider", "considering", "considered", "to consider"], a: 2, ex: "慣用語 All things considered（全盤考量後），things 被考慮 → p.p.。" },
    ],
  },
  {
    id: "inversion", title: "倒裝句", tip:
      "否定副詞置句首要倒裝：Never / Rarely / Seldom / Hardly / Not only / Little / Only + 副詞…\nNot until… 主要子句倒裝\nSo + adj. + 助動詞 + S + that…",
    qs: [
      { q: "Not only ___ the cost, but it also improved quality.", opts: ["the new method reduced", "did the new method reduce", "the new method did reduce", "reduced the new method"], a: 1, ex: "Not only 置首 → 助動詞倒裝：did + S + V原形。" },
      { q: "Only after the system was tested ___ its limitations.", opts: ["we discovered", "did we discover", "we did discover", "discovered we"], a: 1, ex: "Only + 副詞子句 置首，主要子句倒裝。" },
      { q: "Rarely ___ such a significant improvement in efficiency.", opts: ["we have seen", "have we seen", "we saw", "seen we have"], a: 1, ex: "Rarely 置首 → 倒裝 have we seen。" },
    ],
  },
  {
    id: "relative", title: "關係代名詞 / 子句", tip:
      "人 who/whom；物 which；所有格 whose\n逗號後（非限定）不能用 that\n介系詞 + which/whom（不可用 that）\nwhat = the thing(s) which（自帶先行詞）",
    qs: [
      { q: "The algorithm, ___ was proposed in 2018, outperforms earlier methods.", opts: ["that", "which", "what", "who"], a: 1, ex: "逗號後的非限定子句，物 → which，不可用 that。" },
      { q: "This is the factory in ___ the experiment was conducted.", opts: ["that", "where", "which", "what"], a: 2, ex: "介系詞 + which；in where 錯誤，in that 不行。" },
      { q: "___ surprised the researchers was the speed of adoption.", opts: ["That", "Which", "What", "It"], a: 2, ex: "What 引導名詞子句作主詞 = The thing that。" },
    ],
  },
  {
    id: "agreement", title: "主詞動詞一致", tip:
      "主詞是 The number of → 單數；A number of → 複數\nEither A or B / Neither A nor B → 動詞跟 B\nA as well as B / A along with B → 動詞跟 A\ndata 在正式學術寫作常視為複數",
    qs: [
      { q: "The number of defective items ___ decreased since last quarter.", opts: ["have", "has", "are", "were"], a: 1, ex: "The number of + N → 主詞是 number（單數）→ has。" },
      { q: "Neither the manager nor the engineers ___ aware of the issue.", opts: ["was", "is", "were", "has been"], a: 2, ex: "Neither A nor B → 動詞跟 B（engineers 複數）→ were。" },
      { q: "The professor, as well as her students, ___ attending the conference.", opts: ["are", "is", "were", "have"], a: 1, ex: "A as well as B → 動詞跟 A（professor 單數）→ is。" },
    ],
  },
  {
    id: "connector", title: "轉折語 / 連接詞（克漏字必考）", tip:
      "轉折：however, nevertheless, whereas, while, although\n因果：therefore, thus, consequently, hence, because of\n補充：moreover, furthermore, in addition\n注意：however 是副詞，不能直接連接兩個句子（要用分號或句點）",
    qs: [
      { q: "The method is accurate; ___, it is computationally expensive.", opts: ["therefore", "however", "moreover", "because"], a: 1, ex: "前後語意相反（準確 vs. 昂貴）→ however。" },
      { q: "___ the high initial cost, the system pays for itself within two years.", opts: ["Although", "Despite", "Because", "However"], a: 1, ex: "後面接名詞片語 → 介系詞 Despite；Although 需接子句。" },
      { q: "Demand was highly uncertain; ___, the firm increased its safety stock.", opts: ["consequently", "nevertheless", "whereas", "otherwise"], a: 0, ex: "需求不確定 → 所以增加安全存量 → 因果 consequently。" },
    ],
  },
];
