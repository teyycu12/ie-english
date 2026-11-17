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
  {
    id: "tense", title: "時態", tip:
      "since / for + 一段時間 → 現在完成式（has p.p.）\nBy the time + 過去式 → 過去完成式（had p.p.）\nBy + 未來時間 → 未來完成式（will have p.p.）\n時間、條件副詞子句用現在式代替未來式：When/If it rains, …",
    qs: [
      { q: "Since the new system was installed, productivity ___ by 20%.", opts: ["increased", "has increased", "had increased", "increases"], a: 1, ex: "Since + 過去時間點，主要子句用現在完成式。" },
      { q: "By the time the auditors arrived, the team ___ all the documents.", opts: ["prepared", "has prepared", "had prepared", "would prepare"], a: 2, ex: "By the time + 過去式，主要子句動作更早完成 → 過去完成式。" },
      { q: "We will start the test as soon as the materials ___.", opts: ["will arrive", "arrive", "arrived", "would arrive"], a: 1, ex: "時間副詞子句以現在式代替未來式。" },
    ],
  },
  {
    id: "passive", title: "被動語態", tip:
      "物不會自己做動作 → 被動：be + p.p.\n進行被動：be being p.p.；完成被動：have been p.p.\n情態被動：should be p.p.\nIt is said/believed that… = S is said to V",
    qs: [
      { q: "The results ___ in the next issue of the journal.", opts: ["will publish", "will be published", "will be publishing", "have published"], a: 1, ex: "結果是「被」發表 → will be published。" },
      { q: "The machine is currently ___, so the line has stopped.", opts: ["repairing", "repaired", "being repaired", "been repaired"], a: 2, ex: "現在進行被動：is being p.p.。" },
      { q: "Automation is believed ___ productivity in the long run.", opts: ["improve", "to improve", "improving", "improved"], a: 1, ex: "S is believed to V（被認為會…）。" },
    ],
  },
  {
    id: "gerund", title: "動名詞 vs. 不定詞", tip:
      "+ V-ing：avoid, consider, deny, mind, finish, suggest, risk, look forward to, be used to, object to\n+ to V：decide, plan, hope, refuse, manage, fail, tend\n意思不同：stop / remember / forget / try + to V vs. V-ing",
    qs: [
      { q: "The firm is considering ___ part of its production to Vietnam.", opts: ["move", "to move", "moving", "moved"], a: 2, ex: "consider + V-ing。" },
      { q: "We look forward to ___ with you on this project.", opts: ["work", "working", "be worked", "have worked"], a: 1, ex: "look forward to 的 to 是介系詞 → + V-ing。" },
      { q: "Please remember ___ the machine before you leave.", opts: ["turning off", "to turn off", "turn off", "turned off"], a: 1, ex: "remember to V = 記得要去做（還沒做）。" },
    ],
  },
  {
    id: "comparison", title: "比較級 / 最高級", tip:
      "the + 比較級…, the + 比較級…（越…越…）\n倍數：three times as … as / three times + 比較級 + than\nprefer A to B；superior / inferior to（不用 than）\nno more than = only；no less than = as much as",
    qs: [
      { q: "The more data we collect, ___ our predictions become.", opts: ["the accurate", "more accurate", "the more accurate", "the most accurate"], a: 2, ex: "the + 比較級…, the + 比較級…。" },
      { q: "The new process is superior ___ the old one in every respect.", opts: ["than", "to", "over", "from"], a: 1, ex: "superior to（不用 than）。" },
      { q: "This chip is three times ___ the previous model.", opts: ["as fast as", "faster as", "as faster than", "fast than"], a: 0, ex: "倍數 + as + 原級 + as。" },
    ],
  },
  {
    id: "modal", title: "助動詞 + 完成式", tip:
      "should have p.p. 早該做（卻沒做）\nmust have p.p. 一定已經（過去肯定推測）\ncan't have p.p. 不可能已經\nmay/might have p.p. 可能已經\nneedn't have p.p. 其實不必做（卻做了）",
    qs: [
      { q: "The project failed. We ___ the risks more carefully.", opts: ["should assess", "should have assessed", "must have assessed", "can't have assessed"], a: 1, ex: "早該做卻沒做 → should have p.p.。" },
      { q: "The lights are off; everyone ___ home already.", opts: ["must go", "must have gone", "should have gone", "needn't have gone"], a: 1, ex: "對過去的肯定推測 → must have p.p.。" },
      { q: "He ___ the report; he was on vacation all week.", opts: ["can't have written", "must have written", "should have written", "may write"], a: 0, ex: "不可能已經 → can't have p.p.。" },
    ],
  },
  {
    id: "nounclause", title: "名詞子句 / whether / that", tip:
      "That 子句當主詞常用虛主詞：It is clear that…\nwhether / if 都是「是否」，但主詞位置、介系詞後、to V 前只能用 whether\n間接問句用直述句語序：I wonder what he wants.（不是 what does he want）",
    qs: [
      { q: "___ the new policy will reduce costs remains unclear.", opts: ["If", "Whether", "That", "What"], a: 1, ex: "主詞位置的「是否」只能用 whether。" },
      { q: "The manager asked us ___.", opts: ["what did we need", "what we needed", "what do we need", "that we needed what"], a: 1, ex: "間接問句用直述語序。" },
      { q: "It is widely accepted ___ variability reduces throughput.", opts: ["what", "which", "that", "whether"], a: 2, ex: "It is … that + 完整子句（虛主詞）。" },
    ],
  },
  {
    id: "adverbclause", title: "副詞子句連接詞", tip:
      "讓步：although / even though / even if / while；despite / in spite of + N\n條件：unless = if not；provided that / as long as；in case（以防）\n目的：so that / in order that；結果：so + adj. + that / such + N + that\n只要：as long as；一…就…：as soon as / no sooner…than",
    qs: [
      { q: "The project will be delayed ___ we hire more engineers.", opts: ["if", "unless", "although", "since"], a: 1, ex: "除非多雇工程師，否則會延誤 → unless。" },
      { q: "Keep a backup ___ the server fails.", opts: ["in case", "unless", "so that", "even though"], a: 0, ex: "以防伺服器故障 → in case。" },
      { q: "It was ___ a complex problem that no one could solve it.", opts: ["so", "such", "too", "very"], a: 1, ex: "such + a + adj. + N + that。" },
    ],
  },
  {
    id: "cleft", title: "強調句 / It 句型", tip:
      "It is/was + 強調部分 + that/who + 其餘\n強調時間地點也用 that（不用 when/where）\nIt takes + 人 + 時間 + to V\nIt is no use / no good + V-ing",
    qs: [
      { q: "It was the supplier's delay ___ caused the shutdown.", opts: ["what", "which", "that", "when"], a: 2, ex: "強調句 It was … that …。" },
      { q: "It was not until 2020 ___ the firm adopted cloud computing.", opts: ["when", "that", "which", "then"], a: 1, ex: "It was not until … that …（直到…才…）。" },
      { q: "It is no use ___ about the mistake now.", opts: ["complain", "to complaining", "complaining", "complained"], a: 2, ex: "It is no use + V-ing。" },
    ],
  },
  {
    id: "parallel", title: "對等 / 平行結構", tip:
      "and / or / but 前後詞性與形式一致\n成對連接詞：both A and B / either A or B / neither A nor B / not only A but also B / not A but B / A rather than B\nA, B, and C 三者形式一致",
    qs: [
      { q: "The new method is faster, cheaper, and ___.", opts: ["more reliable", "reliability", "reliably", "it is reliable"], a: 0, ex: "三個形容詞比較級平行。" },
      { q: "The goal is not only to cut costs but also ___ quality.", opts: ["improving", "improve", "to improve", "improved"], a: 2, ex: "not only to V but also to V，形式一致。" },
      { q: "She prefers analyzing data rather than ___ reports.", opts: ["write", "to write", "writing", "written"], a: 2, ex: "analyzing 與 writing 平行。" },
    ],
  },
  {
    id: "causative", title: "使役 / 感官動詞", tip:
      "make / have / let + 受詞 + 原形V\nget + 受詞 + to V\nhave / get + 物 + p.p.（請人做）\n感官 see/hear/watch + O + V原形（全程）/ V-ing（進行中）\n被動：be made to V",
    qs: [
      { q: "The manager had the technician ___ the machine.", opts: ["to check", "checking", "check", "checked"], a: 2, ex: "have + 人 + 原形 V。" },
      { q: "We need to get the report ___ by Friday.", opts: ["finish", "finished", "finishing", "to finish"], a: 1, ex: "get + 物 + p.p.（被完成）。" },
      { q: "The workers were made ___ overtime.", opts: ["work", "working", "to work", "worked"], a: 2, ex: "make 改被動要加 to：be made to V。" },
    ],
  },
  {
    id: "preposition", title: "介系詞搭配", tip:
      "depend on / rely on / focus on / based on\nresult in（導致）vs. result from（起因於）\ncomply with / cope with / deal with\naccess to / contribute to / key to / solution to（to 是介系詞）\nin terms of / with respect to / in charge of",
    qs: [
      { q: "The failure resulted ___ poor maintenance.", opts: ["in", "from", "to", "with"], a: 1, ex: "result from 起因於；result in 導致。" },
      { q: "All suppliers must comply ___ the new regulations.", opts: ["to", "for", "with", "by"], a: 2, ex: "comply with。" },
      { q: "The key ___ success is continuous improvement.", opts: ["of", "for", "to", "in"], a: 2, ex: "the key to N。" },
    ],
  },
  {
    id: "wordform", title: "詞性變化（克漏字常考）", tip:
      "冠詞 / 形容詞後 → 名詞；be 動詞後 → 形容詞；修飾動詞或整句 → 副詞\n常見字尾：-tion/-ment/-ity (n.)、-ive/-al/-ous/-able (adj.)、-ly (adv.)、-ize/-en/-fy (v.)\n注意 -ly 結尾的形容詞：costly, timely, friendly",
    qs: [
      { q: "The ___ of the new layout reduced travel distance by half.", opts: ["implement", "implementation", "implemental", "implementing"], a: 1, ex: "The ___ of → 名詞。" },
      { q: "The process has become ___ more efficient.", opts: ["significant", "significance", "significantly", "signify"], a: 2, ex: "修飾形容詞 more efficient → 副詞。" },
      { q: "Unplanned downtime is extremely ___.", opts: ["cost", "costly", "costing", "costs"], a: 1, ex: "be 動詞後接形容詞 costly（-ly 結尾的形容詞）。" },
    ],
  },
];
