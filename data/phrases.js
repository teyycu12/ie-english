// 片語專區：依「同一個動詞」分組，考試常把同組片語放在一起當選項
// 格式：片語|中文|例句（[] 內是句中實際出現的形式，填空時會挖掉）|例句中譯
const RAW = {
  take: `take on|承擔；雇用；呈現|The firm [took on] more risk by entering a new market.|公司進入新市場，承擔了更多風險。
take over|接管；接手|A larger company [took over] the struggling startup.|一家大公司接管了這家經營困難的新創。
take off|起飛；迅速成功；脫下|Online sales [took off] during the pandemic.|疫情期間網路銷售迅速起飛。
take up|佔用；開始從事|The new machine [takes up] too much floor space.|新機器佔用太多廠房空間。
take out|取出；貸（款）；除掉|The company [took out] a loan to buy equipment.|公司貸了一筆款來買設備。
take in|吸收；理解；欺騙|It is hard to [take in] so much information at once.|一次要吸收這麼多資訊很難。
take after|（外貌性格）像|She [takes after] her father, who was also an engineer.|她很像她爸爸，他也是工程師。
take apart|拆開|Technicians [took apart] the engine to find the fault.|技術人員把引擎拆開找故障。`,
  put: `put off|延後|The meeting was [put off] until next week.|會議延到下週。
put up with|忍受|Workers should not have to [put up with] unsafe conditions.|工人不該忍受不安全的工作環境。
put forward|提出（意見）|The authors [put forward] a new theory of motivation.|作者提出一個新的動機理論。
put out|撲滅；發布|Firefighters [put out] the fire within an hour.|消防員在一小時內撲滅了火。
put aside|擱置；存（錢）|Let us [put aside] our differences and focus on the goal.|讓我們先擱置歧見，專注在目標上。
put in place|實施；落實|The government [put in place] new safety regulations.|政府實施了新的安全法規。
put into practice|付諸實行|It is time to [put] the plan [into practice].|是時候把計畫付諸實行了。`,
  give: `give up|放棄|Many startups [give up] after the first year.|許多新創在第一年就放棄了。
give in|屈服；讓步|The management finally [gave in] to the union's demands.|管理階層最後向工會的要求讓步。
give off|散發（氣味、熱）|The machine [gives off] a lot of heat.|這台機器散發大量的熱。
give away|贈送；洩露|The company [gave away] free samples.|公司免費贈送樣品。
give rise to|導致|Automation may [give rise to] new types of jobs.|自動化可能帶來新型態的工作。
give way to|讓位給；被取代|Traditional retail is [giving way to] e-commerce.|傳統零售正逐漸被電子商務取代。`,
  bring: `bring about|導致；帶來|Technology has [brought about] major changes in manufacturing.|科技為製造業帶來重大改變。
bring up|提出（話題）；撫養|She [brought up] the issue of data privacy at the meeting.|她在會議上提出資料隱私的問題。
bring in|引進；賺得|The new product [brought in] $2 million in revenue.|新產品帶進兩百萬美元營收。
bring down|降低；擊倒|Automation helped [bring down] production costs.|自動化幫助降低生產成本。
bring out|推出；使顯現|The firm will [bring out] a new model next spring.|公司明年春天將推出新款。`,
  come: `come up with|想出（點子）|The team [came up with] a creative solution.|團隊想出一個有創意的解法。
come across|偶然遇到；給人印象|I [came across] an interesting paper on scheduling.|我偶然看到一篇有趣的排程論文。
come about|發生|How did this change [come about]?|這個改變是怎麼發生的？
come down to|歸結於|The decision [comes down to] cost.|這個決定歸結於成本。
come into effect|生效|The new law will [come into effect] in January.|新法將於一月生效。
come up against|遭遇（困難）|The project [came up against] strong opposition.|這個專案遭遇強烈反對。`,
  carry: `carry out|執行；進行|The experiment was [carried out] in three factories.|實驗在三座工廠進行。
carry on|繼續|Despite the delay, the team [carried on] with the test.|儘管延誤，團隊仍繼續測試。
carry over|延續到；結轉|Unused vacation days can be [carried over] to next year.|沒用完的假可以延到明年。
carry through|完成；貫徹|It takes leadership to [carry through] major reforms.|推動重大改革需要領導力才能貫徹。`,
  turn: `turn down|拒絕；調低|The supplier [turned down] our request for a discount.|供應商拒絕了我們的折扣要求。
turn out|結果是；生產|The new method [turned out] to be more efficient.|新方法結果更有效率。
turn into|變成|The small workshop [turned into] a large factory.|小工作坊變成了大工廠。
turn to|求助於；轉向|Firms [turn to] consultants when problems arise.|問題發生時企業會求助顧問。
turn up|出現；調高|Only half of the participants [turned up].|只有一半的受試者出席。
turn over|翻轉；移交；營業額|The case was [turned over] to the legal department.|這個案子被移交給法務部門。`,
  set: `set up|建立；設立|The company [set up] a new plant in Vietnam.|公司在越南設立新廠。
set off|出發；引發|The announcement [set off] a sharp drop in stock prices.|這項宣布引發股價大跌。
set aside|撥出；保留|Ten percent of the budget is [set aside] for training.|預算的一成撥給訓練。
set out|開始；著手；陳述|The report [sets out] three main recommendations.|報告提出三項主要建議。
set back|阻礙；延誤|The fire [set back] production by two weeks.|火災讓生產延誤了兩週。`,
  look: `look into|調查|Engineers are [looking into] the cause of the failure.|工程師正在調查故障原因。
look up to|尊敬|Young engineers [look up to] experienced mentors.|年輕工程師很尊敬有經驗的導師。
look down on|看不起|We should not [look down on] manual labor.|我們不該看不起體力勞動。
look forward to|期待（+ V-ing）|I [look forward to] hearing from you.|期待收到您的回覆。
look over|檢查；瀏覽|Please [look over] the report before submitting it.|送出前請先檢查一下報告。
look up|查閱；好轉|You can [look up] the formula in the manual.|你可以在手冊裡查到公式。`,
  break: `break down|故障；分解；崩潰|The machine [broke down] during the night shift.|機器在夜班時故障了。
break out|爆發|A fire [broke out] in the warehouse.|倉庫發生火災。
break through|突破|Scientists finally [broke through] the technical barrier.|科學家終於突破了技術障礙。
break into|闖入；打進（市場）|The firm aims to [break into] the European market.|公司打算打進歐洲市場。
break up|分手；解散；拆散|The monopoly was [broken up] by regulators.|這個壟斷企業被主管機關拆分。`,
  get: `get over|克服；從…恢復|It took months to [get over] the supply shock.|花了好幾個月才從供應衝擊中恢復。
get across|傳達；使理解|The speaker [got] her message [across] clearly.|講者清楚傳達了她的訊息。
get along with|與…相處|He [gets along with] his colleagues.|他和同事相處融洽。
get rid of|擺脫；去除|Lean aims to [get rid of] waste.|精實的目標是去除浪費。
get through|度過；完成|The firm [got through] the crisis with government help.|公司靠政府協助度過危機。`,
  run: `run out of|用完|The plant [ran out of] raw materials.|工廠的原物料用完了。
run into|偶遇；遭遇|The project [ran into] financial trouble.|這個專案遇到財務困難。
run over|輾過；超時|The meeting [ran over] by thirty minutes.|會議超時三十分鐘。
run for|競選|She plans to [run for] mayor.|她打算競選市長。`,
  call: `call off|取消|The strike was [called off] after negotiations.|罷工在協商後取消。
call for|要求；需要|The situation [calls for] immediate action.|這個情況需要立即行動。
call on|拜訪；號召|The minister [called on] firms to cut emissions.|部長呼籲企業減少排放。`,
  hold: `hold back|抑制；隱瞞|High costs [held back] the adoption of robots.|高成本阻礙了機器人的導入。
hold up|延誤；支撐|Traffic [held up] the delivery trucks.|交通延誤了送貨卡車。
hold on to|堅持；保住|The firm managed to [hold on to] its market share.|公司設法保住了市占率。`,
  keep: `keep up with|跟上|Small firms struggle to [keep up with] technological change.|小公司很難跟上技術變化。
keep track of|追蹤；記錄|RFID helps [keep track of] inventory.|RFID 有助於追蹤存貨。
keep in mind|記住|[Keep in mind] that the data may be biased.|記住資料可能有偏誤。`,
  cut: `cut down on|減少|We need to [cut down on] energy consumption.|我們需要減少能源消耗。
cut back|削減|Many firms [cut back] on hiring during the recession.|許多公司在經濟衰退期間減少招募。
cut off|切斷|The storm [cut off] power to the factory.|暴風雨切斷了工廠的電力。`,
  academic: `account for|說明；佔（比例）|Labor costs [account for] 30% of total expenses.|人工成本佔總支出的 30%。
result in|導致|Poor maintenance can [result in] costly breakdowns.|保養不良可能導致代價高昂的故障。
result from|起因於|Most defects [result from] human error.|大部分缺陷起因於人為錯誤。
consist of|由…組成|The system [consists of] three subsystems.|這個系統由三個子系統組成。
comply with|遵守|All products must [comply with] safety standards.|所有產品都必須符合安全標準。
attribute A to B|把 A 歸因於 B|The authors [attribute] the decline [to] weak demand.|作者把下滑歸因於需求疲弱。
be subject to|受…支配；易受|Prices [are subject to] change without notice.|價格可能變動，恕不另行通知。
in terms of|就…而言|[In terms of] cost, option A is better.|就成本而言，方案 A 比較好。
with respect to|關於|We analyze sensitivity [with respect to] demand.|我們分析對需求的敏感度。
in light of|鑑於|[In light of] the results, we revised the model.|鑑於這些結果，我們修正了模型。
on behalf of|代表|I am writing [on behalf of] my team.|我代表我的團隊寫這封信。
in accordance with|依照|Tests were conducted [in accordance with] ISO standards.|測試依照 ISO 標準進行。
contribute to|促成；導致|Several factors [contribute to] the bullwhip effect.|幾個因素促成了長鞭效應。
depend on|取決於|The optimal policy [depends on] the holding cost.|最佳策略取決於持有成本。
derive from|源自|The word [derives from] Latin.|這個字源自拉丁文。
be associated with|與…有關|Long hours [are associated with] higher error rates.|工時長與較高的錯誤率有關。
as opposed to|而不是；相對於|We use simulation [as opposed to] analytical models.|我們用模擬而不是解析模型。
in response to|回應|Prices rose [in response to] the shortage.|價格因短缺而上漲。`,
};

export const PHRASE_GROUPS = Object.keys(RAW);
export const PHRASES = Object.entries(RAW).flatMap(([g, block], gi) =>
  block.trim().split("\n").map(line => {
    const [w, zh, raw, exZh] = line.split("|");
    return { w, pos: "phr.", zh, ex: raw.replace(/[[\]]/g, ""), cloze: raw, exZh, tag: "PH", sub: gi + 1, group: g };
  })
);
