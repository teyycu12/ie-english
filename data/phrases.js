// 片語專區：依「同一個動詞」分組，考試常把同組片語放在一起當選項
// 格式：片語|中文|例句（[] 內是句中實際出現的形式，填空時會挖掉）
const RAW = {
  take: `take on|承擔；雇用；呈現|The firm [took on] more risk by entering a new market.
take over|接管；接手|A larger company [took over] the struggling startup.
take off|起飛；迅速成功；脫下|Online sales [took off] during the pandemic.
take up|佔用；開始從事|The new machine [takes up] too much floor space.
take out|取出；貸（款）；除掉|The company [took out] a loan to buy equipment.
take in|吸收；理解；欺騙|It is hard to [take in] so much information at once.
take after|（外貌性格）像|She [takes after] her father, who was also an engineer.
take apart|拆開|Technicians [took apart] the engine to find the fault.`,
  put: `put off|延後|The meeting was [put off] until next week.
put up with|忍受|Workers should not have to [put up with] unsafe conditions.
put forward|提出（意見）|The authors [put forward] a new theory of motivation.
put out|撲滅；發布|Firefighters [put out] the fire within an hour.
put aside|擱置；存（錢）|Let us [put aside] our differences and focus on the goal.
put in place|實施；落實|The government [put in place] new safety regulations.
put into practice|付諸實行|It is time to [put] the plan [into practice].`,
  give: `give up|放棄|Many startups [give up] after the first year.
give in|屈服；讓步|The management finally [gave in] to the union's demands.
give off|散發（氣味、熱）|The machine [gives off] a lot of heat.
give away|贈送；洩露|The company [gave away] free samples.
give rise to|導致|Automation may [give rise to] new types of jobs.
give way to|讓位給；被取代|Traditional retail is [giving way to] e-commerce.`,
  bring: `bring about|導致；帶來|Technology has [brought about] major changes in manufacturing.
bring up|提出（話題）；撫養|She [brought up] the issue of data privacy at the meeting.
bring in|引進；賺得|The new product [brought in] $2 million in revenue.
bring down|降低；擊倒|Automation helped [bring down] production costs.
bring out|推出；使顯現|The firm will [bring out] a new model next spring.`,
  come: `come up with|想出（點子）|The team [came up with] a creative solution.
come across|偶然遇到；給人印象|I [came across] an interesting paper on scheduling.
come about|發生|How did this change [come about]?
come down to|歸結於|The decision [comes down to] cost.
come into effect|生效|The new law will [come into effect] in January.
come up against|遭遇（困難）|The project [came up against] strong opposition.`,
  carry: `carry out|執行；進行|The experiment was [carried out] in three factories.
carry on|繼續|Despite the delay, the team [carried on] with the test.
carry over|延續到；結轉|Unused vacation days can be [carried over] to next year.
carry through|完成；貫徹|It takes leadership to [carry through] major reforms.`,
  turn: `turn down|拒絕；調低|The supplier [turned down] our request for a discount.
turn out|結果是；生產|The new method [turned out] to be more efficient.
turn into|變成|The small workshop [turned into] a large factory.
turn to|求助於；轉向|Firms [turn to] consultants when problems arise.
turn up|出現；調高|Only half of the participants [turned up].
turn over|翻轉；移交；營業額|The case was [turned over] to the legal department.`,
  set: `set up|建立；設立|The company [set up] a new plant in Vietnam.
set off|出發；引發|The announcement [set off] a sharp drop in stock prices.
set aside|撥出；保留|Ten percent of the budget is [set aside] for training.
set out|開始；著手；陳述|The report [sets out] three main recommendations.
set back|阻礙；延誤|The fire [set back] production by two weeks.`,
  look: `look into|調查|Engineers are [looking into] the cause of the failure.
look up to|尊敬|Young engineers [look up to] experienced mentors.
look down on|看不起|We should not [look down on] manual labor.
look forward to|期待（+ V-ing）|I [look forward to] hearing from you.
look over|檢查；瀏覽|Please [look over] the report before submitting it.
look up|查閱；好轉|You can [look up] the formula in the manual.`,
  break: `break down|故障；分解；崩潰|The machine [broke down] during the night shift.
break out|爆發|A fire [broke out] in the warehouse.
break through|突破|Scientists finally [broke through] the technical barrier.
break into|闖入；打進（市場）|The firm aims to [break into] the European market.
break up|分手；解散；拆散|The monopoly was [broken up] by regulators.`,
  get: `get over|克服；從…恢復|It took months to [get over] the supply shock.
get across|傳達；使理解|The speaker [got] her message [across] clearly.
get along with|與…相處|He [gets along with] his colleagues.
get rid of|擺脫；去除|Lean aims to [get rid of] waste.
get through|度過；完成|The firm [got through] the crisis with government help.`,
  run: `run out of|用完|The plant [ran out of] raw materials.
run into|偶遇；遭遇|The project [ran into] financial trouble.
run over|輾過；超時|The meeting [ran over] by thirty minutes.
run for|競選|She plans to [run for] mayor.`,
  call: `call off|取消|The strike was [called off] after negotiations.
call for|要求；需要|The situation [calls for] immediate action.
call on|拜訪；號召|The minister [called on] firms to cut emissions.`,
  hold: `hold back|抑制；隱瞞|High costs [held back] the adoption of robots.
hold up|延誤；支撐|Traffic [held up] the delivery trucks.
hold on to|堅持；保住|The firm managed to [hold on to] its market share.`,
  keep: `keep up with|跟上|Small firms struggle to [keep up with] technological change.
keep track of|追蹤；記錄|RFID helps [keep track of] inventory.
keep in mind|記住|[Keep in mind] that the data may be biased.`,
  cut: `cut down on|減少|We need to [cut down on] energy consumption.
cut back|削減|Many firms [cut back] on hiring during the recession.
cut off|切斷|The storm [cut off] power to the factory.`,
  academic: `account for|說明；佔（比例）|Labor costs [account for] 30% of total expenses.
result in|導致|Poor maintenance can [result in] costly breakdowns.
result from|起因於|Most defects [result from] human error.
consist of|由…組成|The system [consists of] three subsystems.
comply with|遵守|All products must [comply with] safety standards.
attribute A to B|把 A 歸因於 B|The authors [attribute] the decline [to] weak demand.
be subject to|受…支配；易受|Prices [are subject to] change without notice.
in terms of|就…而言|[In terms of] cost, option A is better.
with respect to|關於|We analyze sensitivity [with respect to] demand.
in light of|鑑於|[In light of] the results, we revised the model.
on behalf of|代表|I am writing [on behalf of] my team.
in accordance with|依照|Tests were conducted [in accordance with] ISO standards.
contribute to|促成；導致|Several factors [contribute to] the bullwhip effect.
depend on|取決於|The optimal policy [depends on] the holding cost.
derive from|源自|The word [derives from] Latin.
be associated with|與…有關|Long hours [are associated with] higher error rates.
as opposed to|而不是；相對於|We use simulation [as opposed to] analytical models.
in response to|回應|Prices rose [in response to] the shortage.`,
};

export const PHRASE_GROUPS = Object.keys(RAW);
export const PHRASES = Object.entries(RAW).flatMap(([g, block], gi) =>
  block.trim().split("\n").map(line => {
    const [w, zh, raw] = line.split("|");
    return { w, pos: "phr.", zh, ex: raw.replace(/[[\]]/g, ""), cloze: raw, exZh: "", tag: "PH", sub: gi + 1, group: g };
  })
);
