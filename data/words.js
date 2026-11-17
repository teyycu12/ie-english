// 單字庫：AWL 學術字彙、IE 工工領域字、GRE/TOEFL 高頻字
// 欄位：w 單字, pos 詞性, zh 中文, ex 例句, exZh 例句翻譯, syn 同義字, col 常見搭配, root 字根, tag 分類
export const WORDS = [
  // ---- AWL 學術字彙 ----
  { w: "allocate", pos: "v.", zh: "分配；配置", ex: "The model allocates limited resources to minimize total cost.", exZh: "此模型分配有限資源以最小化總成本。", syn: "assign, distribute", col: "allocate resources / budget", root: "al- (to) + loc (place)", tag: "AWL" },
  { w: "assess", pos: "v.", zh: "評估", ex: "We assess supplier performance using a weighted scoring method.", exZh: "我們用加權評分法評估供應商績效。", syn: "evaluate, appraise", col: "assess the impact / risk", root: "", tag: "AWL" },
  { w: "constraint", pos: "n.", zh: "限制；約束條件", ex: "The capacity constraint becomes binding when demand exceeds 500 units.", exZh: "當需求超過 500 單位時，產能限制變成緊限制。", syn: "limitation, restriction", col: "budget constraint / impose a constraint", root: "con- + strain (tighten)", tag: "AWL" },
  { w: "derive", pos: "v.", zh: "推導；源自", ex: "The optimal order quantity is derived from the total cost function.", exZh: "最佳訂購量由總成本函數推導而來。", syn: "obtain, deduce", col: "derive from", root: "", tag: "AWL" },
  { w: "empirical", pos: "adj.", zh: "實證的；經驗的", ex: "Empirical evidence suggests that lean practices improve productivity.", exZh: "實證證據顯示精實做法能提升生產力。", syn: "observational, experimental", col: "empirical study / evidence", root: "", tag: "AWL" },
  { w: "framework", pos: "n.", zh: "架構；框架", ex: "This study proposes a framework for evaluating smart factory readiness.", exZh: "本研究提出一個評估智慧工廠成熟度的架構。", syn: "structure, model", col: "theoretical / conceptual framework", root: "", tag: "AWL" },
  { w: "hypothesis", pos: "n.", zh: "假說", ex: "The null hypothesis is rejected at the 5% significance level.", exZh: "在 5% 顯著水準下拒絕虛無假說。", syn: "assumption, proposition", col: "test / reject a hypothesis", root: "hypo- (under) + thesis (placing)", tag: "AWL" },
  { w: "implement", pos: "v.", zh: "實施；執行", ex: "The company implemented a kanban system to reduce work-in-process.", exZh: "公司導入看板系統以減少在製品。", syn: "carry out, execute", col: "implement a policy / strategy", root: "", tag: "AWL" },
  { w: "inherent", pos: "adj.", zh: "固有的；內在的", ex: "Demand uncertainty is inherent in most supply chains.", exZh: "需求不確定性是多數供應鏈固有的特性。", syn: "intrinsic, built-in", col: "inherent in / inherent risk", root: "in- + haerere (stick)", tag: "AWL" },
  { w: "interpret", pos: "v.", zh: "解讀；詮釋", ex: "The regression coefficients should be interpreted with caution.", exZh: "迴歸係數應謹慎解讀。", syn: "explain, construe", col: "interpret the results / data", root: "", tag: "AWL" },
  { w: "mechanism", pos: "n.", zh: "機制", ex: "An incentive mechanism aligns the interests of the retailer and the supplier.", exZh: "激勵機制使零售商與供應商的利益一致。", syn: "process, system", col: "coordination / feedback mechanism", root: "", tag: "AWL" },
  { w: "subsequent", pos: "adj.", zh: "隨後的；後續的", ex: "Subsequent experiments confirmed the initial findings.", exZh: "後續實驗證實了最初的發現。", syn: "following, later", col: "subsequent analysis / to", root: "sub- (under/after) + sequi (follow)", tag: "AWL" },
  { w: "substantial", pos: "adj.", zh: "大量的；相當大的", ex: "The new layout led to a substantial reduction in travel distance.", exZh: "新佈置使搬運距離大幅減少。", syn: "considerable, significant", col: "substantial increase / evidence", root: "", tag: "AWL" },
  { w: "sufficient", pos: "adj.", zh: "足夠的；充分的", ex: "This condition is necessary but not sufficient for optimality.", exZh: "這個條件是最佳性的必要條件但非充分條件。", syn: "adequate, enough", col: "necessary and sufficient", root: "", tag: "AWL" },
  { w: "undertake", pos: "v.", zh: "從事；承擔", ex: "A pilot study was undertaken before full-scale deployment.", exZh: "在全面導入前先進行了先導研究。", syn: "carry out, embark on", col: "undertake research / a project", root: "", tag: "AWL" },
  { w: "valid", pos: "adj.", zh: "有效的；合理的", ex: "The model is valid only under the assumption of constant demand.", exZh: "此模型只在需求固定的假設下成立。", syn: "sound, legitimate", col: "valid assumption / argument", root: "", tag: "AWL" },
  { w: "comprise", pos: "v.", zh: "包含；由…組成", ex: "The system comprises three workstations and a buffer.", exZh: "該系統由三個工作站和一個緩衝區組成。", syn: "consist of, include", col: "be comprised of (常見但被視為非正式)", root: "", tag: "AWL" },
  { w: "facilitate", pos: "v.", zh: "促進；使容易", ex: "Information sharing facilitates coordination among supply chain partners.", exZh: "資訊分享促進供應鏈夥伴之間的協調。", syn: "enable, promote", col: "facilitate communication / learning", root: "facilis (easy)", tag: "AWL" },
  { w: "notion", pos: "n.", zh: "概念；想法", ex: "The notion of value stream mapping originated at Toyota.", exZh: "價值流圖的概念起源於豐田。", syn: "concept, idea", col: "the notion that…", root: "", tag: "AWL" },
  { w: "paradigm", pos: "n.", zh: "典範；範式", ex: "Industry 4.0 represents a paradigm shift in manufacturing.", exZh: "工業 4.0 代表製造業的典範轉移。", syn: "model, pattern", col: "paradigm shift", root: "", tag: "AWL" },

  // ---- IE 工工領域字 ----
  { w: "optimization", pos: "n.", zh: "最佳化", ex: "Linear optimization is widely used in production planning.", exZh: "線性最佳化廣泛應用於生產規劃。", syn: "", col: "combinatorial / robust optimization", root: "optimus (best)", tag: "IE" },
  { w: "stochastic", pos: "adj.", zh: "隨機的", ex: "Stochastic models capture the randomness of customer arrivals.", exZh: "隨機模型能描述顧客抵達的隨機性。", syn: "random, probabilistic", col: "stochastic process / programming", root: "", tag: "IE" },
  { w: "deterministic", pos: "adj.", zh: "確定性的", ex: "The EOQ model assumes deterministic demand.", exZh: "EOQ 模型假設需求是確定的。", syn: "", col: "deterministic model", root: "", tag: "IE" },
  { w: "throughput", pos: "n.", zh: "產出率；產能", ex: "Removing the bottleneck increased throughput by 20%.", exZh: "移除瓶頸使產出率提升 20%。", syn: "output rate", col: "throughput time / rate", root: "", tag: "IE" },
  { w: "bottleneck", pos: "n.", zh: "瓶頸", ex: "The bottleneck station determines the capacity of the entire line.", exZh: "瓶頸工作站決定整條產線的產能。", syn: "constraint", col: "identify / eliminate a bottleneck", root: "", tag: "IE" },
  { w: "heuristic", pos: "n./adj.", zh: "啟發式（演算法）", ex: "A greedy heuristic provides a good solution within seconds.", exZh: "貪婪啟發式演算法能在數秒內給出不錯的解。", syn: "rule of thumb", col: "heuristic algorithm / approach", root: "heuriskein (find)", tag: "IE" },
  { w: "inventory", pos: "n.", zh: "存貨；庫存", ex: "Safety inventory buffers against demand variability.", exZh: "安全存量用來緩衝需求變異。", syn: "stock", col: "inventory level / holding cost", root: "", tag: "IE" },
  { w: "queue", pos: "n./v.", zh: "等候線；排隊", ex: "In an M/M/1 queue, arrivals follow a Poisson process.", exZh: "在 M/M/1 等候系統中，到達服從卜瓦松過程。", syn: "waiting line", col: "queueing theory / queue length", root: "", tag: "IE" },
  { w: "variance", pos: "n.", zh: "變異數；差異", ex: "Reducing process variance is the core of Six Sigma.", exZh: "降低製程變異是六標準差的核心。", syn: "variability, deviation", col: "analysis of variance (ANOVA)", root: "", tag: "IE" },
  { w: "regression", pos: "n.", zh: "迴歸", ex: "A multiple regression model was used to predict lead time.", exZh: "使用複迴歸模型預測前置時間。", syn: "", col: "linear / logistic regression", root: "re- (back) + gress (step)", tag: "IE" },
  { w: "feasible", pos: "adj.", zh: "可行的", ex: "The feasible region is bounded by the constraints.", exZh: "可行解區域由限制式所圍成。", syn: "viable, practicable", col: "feasible solution / region", root: "", tag: "IE" },
  { w: "ergonomics", pos: "n.", zh: "人因工程", ex: "Good ergonomics reduces musculoskeletal injuries among workers.", exZh: "良好的人因設計可減少工人的肌肉骨骼傷害。", syn: "human factors", col: "", root: "ergon (work) + nomos (law)", tag: "IE" },
  { w: "lead time", pos: "n.", zh: "前置時間", ex: "Shorter lead times allow firms to respond quickly to demand changes.", exZh: "較短的前置時間讓企業能快速回應需求變化。", syn: "", col: "replenishment lead time", root: "", tag: "IE" },
  { w: "simulation", pos: "n.", zh: "模擬", ex: "Discrete-event simulation was used to evaluate alternative layouts.", exZh: "使用離散事件模擬評估不同佈置方案。", syn: "", col: "Monte Carlo / discrete-event simulation", root: "", tag: "IE" },

  // ---- GRE / TOEFL 高頻 ----
  { w: "ambiguous", pos: "adj.", zh: "模稜兩可的", ex: "The survey question was ambiguous, leading to inconsistent responses.", exZh: "問卷題目模稜兩可，導致回答不一致。", syn: "unclear, equivocal", col: "", root: "ambi- (both)", tag: "GRE" },
  { w: "mitigate", pos: "v.", zh: "減輕；緩和", ex: "Dual sourcing can mitigate the risk of supply disruption.", exZh: "雙源採購能減輕供應中斷的風險。", syn: "alleviate, reduce", col: "mitigate risk / impact", root: "", tag: "GRE" },
  { w: "robust", pos: "adj.", zh: "穩健的；強健的", ex: "The proposed schedule is robust to machine breakdowns.", exZh: "所提出的排程對機台故障具穩健性。", syn: "resilient, sturdy", col: "robust to / robust design", root: "", tag: "GRE" },
  { w: "trade-off", pos: "n.", zh: "權衡；取捨", ex: "There is a trade-off between inventory cost and service level.", exZh: "存貨成本與服務水準之間存在取捨。", syn: "compromise", col: "a trade-off between A and B", root: "", tag: "GRE" },
  { w: "unprecedented", pos: "adj.", zh: "前所未有的", ex: "The pandemic caused unprecedented disruptions to global logistics.", exZh: "疫情對全球物流造成前所未有的衝擊。", syn: "unparalleled", col: "unprecedented scale", root: "un- + precedent", tag: "GRE" },
  { w: "exacerbate", pos: "v.", zh: "使惡化", ex: "Order batching may exacerbate the bullwhip effect.", exZh: "批量訂購可能使長鞭效應惡化。", syn: "worsen, aggravate", col: "exacerbate the problem", root: "acerbus (harsh)", tag: "GRE" },
  { w: "pervasive", pos: "adj.", zh: "普遍的；無所不在的", ex: "Sensors have become pervasive in modern factories.", exZh: "感測器在現代工廠中已無所不在。", syn: "widespread, ubiquitous", col: "", root: "", tag: "GRE" },
  { w: "scrutinize", pos: "v.", zh: "仔細檢查", ex: "Auditors scrutinize every step of the quality control process.", exZh: "稽核員仔細檢查品管流程的每個步驟。", syn: "examine, inspect", col: "", root: "", tag: "GRE" },
  { w: "viable", pos: "adj.", zh: "可行的；能存活的", ex: "Remanufacturing is an economically viable alternative.", exZh: "再製造是經濟上可行的替代方案。", syn: "feasible", col: "commercially viable", root: "vita (life)", tag: "GRE" },
  { w: "compelling", pos: "adj.", zh: "令人信服的", ex: "The authors present compelling evidence for their claim.", exZh: "作者為其主張提出令人信服的證據。", syn: "convincing, persuasive", col: "compelling evidence / argument", root: "", tag: "GRE" },
  { w: "deteriorate", pos: "v.", zh: "惡化；退化", ex: "Machine performance deteriorates without preventive maintenance.", exZh: "沒有預防保養，機器性能會退化。", syn: "decline, degrade", col: "", root: "", tag: "GRE" },
  { w: "intricate", pos: "adj.", zh: "錯綜複雜的", ex: "Global supply networks are increasingly intricate.", exZh: "全球供應網路日益錯綜複雜。", syn: "complex, elaborate", col: "", root: "", tag: "GRE" },
];

// 易混淆字（延伸出題用）
export const CONFUSABLES = [
  ["affect", "effect"], ["adapt", "adopt"], ["comprise", "compose"],
  ["principal", "principle"], ["imply", "infer"], ["continual", "continuous"],
];
