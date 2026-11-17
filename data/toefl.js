// 托福核心字，依「工工所英文閱讀常見主題」分類
// 主題依據：臺清交台科英文閱讀常取材自科技評論、永續能源、經濟管理、行為心理、公衛醫學、研究方法
// 格式：單字|詞性|中文|例句|例句中譯
export const TOEFL_THEMES = ["", "科技與 AI", "永續與能源", "經濟與管理", "心理與行為", "健康與公衛", "研究與數據", "社會與教育"];
const RAW = {
1: `algorithm|n.|演算法|Recommendation algorithms shape what users see online.|推薦演算法決定使用者在網路上看到什麼。
automation|n.|自動化|Automation has reduced the need for repetitive manual work.|自動化減少了重複性人工作業的需求。
autonomous|adj.|自主的|Autonomous vehicles rely on sensors and machine learning.|自駕車仰賴感測器與機器學習。
computational|adj.|計算的|Computational power has doubled roughly every two years.|運算能力大約每兩年倍增。
cybersecurity|n.|資訊安全|Cybersecurity is now a board-level concern.|資安如今是董事會層級的議題。
digitize|v.|數位化|Hospitals have digitized patient records.|醫院已將病歷數位化。
disruptive|adj.|破壞性的；顛覆性的|Disruptive technologies often start in niche markets.|顛覆性技術常從利基市場開始。
encrypt|v.|加密|Messages are encrypted before transmission.|訊息在傳送前會先加密。
interface|n.|介面|A simple interface lowers the learning curve.|簡單的介面降低學習門檻。
obsolete|adj.|過時的|Older machines quickly become obsolete.|舊機器很快就會過時。
prototype|n.|原型|Engineers tested a prototype before mass production.|工程師在量產前先測試原型。
replicate|v.|複製；重現|Other labs could not replicate the results.|其他實驗室無法重現此結果。
semiconductor|n.|半導體|Taiwan is a global leader in semiconductor manufacturing.|台灣是全球半導體製造的領導者。
surveillance|n.|監控|Facial recognition raises concerns about mass surveillance.|人臉辨識引發大規模監控的疑慮。
transparency|n.|透明度|Users demand more transparency in how AI makes decisions.|使用者要求 AI 決策更透明。
accelerate|v.|加速|The pandemic accelerated the shift to online services.|疫情加速了轉向線上服務的趨勢。
breakthrough|n.|突破|A breakthrough in battery technology could transform transport.|電池技術的突破可能改變運輸業。
obsolescence|n.|淘汰；過時|Planned obsolescence encourages frequent upgrades.|計畫性汰舊鼓勵消費者頻繁升級。
innovative|adj.|創新的|Innovative firms invest heavily in research.|創新型企業大量投資研發。
precision|n.|精準度|Robots perform welding with high precision.|機器人以高精度進行焊接。
versatile|adj.|多用途的|Drones are versatile tools for inspection.|無人機是多用途的檢查工具。
infringe|v.|侵犯|The company was accused of infringing patents.|該公司被控侵犯專利。
proprietary|adj.|專有的|The firm uses proprietary software.|公司使用專有軟體。
scalable|adj.|可擴展的|Cloud services are highly scalable.|雲端服務擴展性很高。
ubiquitous|adj.|無所不在的|Smartphones have become ubiquitous.|智慧型手機已無所不在。
augment|v.|增強|AI tools augment rather than replace workers.|AI 工具是增強而非取代工人。
deploy|v.|部署|The model was deployed in three factories.|模型已部署到三座工廠。
glitch|n.|小故障|A software glitch halted the production line.|軟體小故障使產線停擺。
calibrate|v.|校準|Sensors must be calibrated regularly.|感測器必須定期校準。
predictive|adj.|預測的|Predictive analytics helps prevent equipment failure.|預測分析有助於預防設備故障。`,
2: `carbon|n.|碳|Firms are required to disclose their carbon footprint.|企業被要求揭露碳足跡。
emission|n.|排放|Transport accounts for a quarter of global emissions.|運輸佔全球排放的四分之一。
renewable|adj.|可再生的|Renewable energy now supplies 30% of electricity.|再生能源目前供應三成電力。
deplete|v.|耗盡|Overfishing has depleted ocean stocks.|過度捕撈耗盡了海洋魚群。
biodiversity|n.|生物多樣性|Deforestation threatens biodiversity.|森林砍伐威脅生物多樣性。
contaminate|v.|污染|Industrial waste contaminated the river.|工業廢水污染了河川。
degradation|n.|惡化；降解|Soil degradation reduces crop yields.|土壤劣化降低作物產量。
ecosystem|n.|生態系|Coral reefs are fragile ecosystems.|珊瑚礁是脆弱的生態系。
mitigation|n.|減緩|Climate mitigation requires global cooperation.|減緩氣候變遷需要全球合作。
recycle|v.|回收|Only 9% of plastic is recycled.|只有 9% 的塑膠被回收。
sustainability|n.|永續性|Sustainability reports are now common among large firms.|永續報告書已在大企業中普及。
footprint|n.|足跡|Remote work may reduce our carbon footprint.|遠距工作可能減少碳足跡。
greenhouse|n.|溫室|Greenhouse gases trap heat in the atmosphere.|溫室氣體把熱困在大氣中。
drought|n.|乾旱|Severe drought affected chip production in Taiwan.|嚴重乾旱影響台灣的晶片生產。
erosion|n.|侵蝕|Coastal erosion threatens nearby towns.|海岸侵蝕威脅附近城鎮。
fossil fuel|n.|化石燃料|Countries aim to phase out fossil fuels.|各國目標逐步淘汰化石燃料。
offset|v./n.|抵銷|Firms buy credits to offset emissions.|企業購買碳權來抵銷排放。
pollutant|n.|污染物|Fine particles are harmful pollutants.|細懸浮微粒是有害的污染物。
habitat|n.|棲地|Urban expansion destroys natural habitats.|都市擴張破壞自然棲地。
circular economy|n.|循環經濟|A circular economy keeps materials in use.|循環經濟讓材料持續被使用。
scarcity|n.|稀缺|Water scarcity affects billions of people.|缺水影響數十億人。
conserve|v.|保存；節約|Smart meters help households conserve energy.|智慧電表幫助家庭節能。
irreversible|adj.|不可逆的|Some climate impacts may be irreversible.|某些氣候衝擊可能無法逆轉。
toxic|adj.|有毒的|Toxic chemicals must be handled carefully.|有毒化學品須小心處理。
grid|n.|電網|The power grid must handle peak demand.|電網必須應付尖峰需求。
efficiency|n.|效率|Energy efficiency is the cheapest way to cut emissions.|提升能源效率是減排最便宜的方法。
disposal|n.|處置|Proper disposal of batteries is essential.|電池必須妥善處置。
incentivize|v.|激勵|Subsidies incentivize the purchase of electric cars.|補貼鼓勵購買電動車。
regenerate|v.|再生|Forests can regenerate if left undisturbed.|森林若不受干擾就能再生。
resilient|adj.|有韌性的|Cities need resilient infrastructure.|城市需要有韌性的基礎建設。`,
3: `inflation|n.|通貨膨脹|Rising inflation eroded consumer purchasing power.|通膨上升侵蝕了消費者購買力。
recession|n.|經濟衰退|Many firms cut costs during the recession.|許多企業在衰退期間削減成本。
tariff|n.|關稅|New tariffs forced firms to relocate production.|新關稅迫使企業轉移生產。
outsource|v.|外包|Many firms outsource customer service.|許多企業外包客服。
monopoly|n.|壟斷|Regulators broke up the monopoly.|主管機關拆分了壟斷企業。
incentive|n.|誘因|Bonuses are incentives to improve performance.|獎金是提升績效的誘因。
competitive advantage|n.|競爭優勢|Speed is a key competitive advantage.|速度是關鍵的競爭優勢。
consumer|n.|消費者|Consumers increasingly value sustainability.|消費者越來越重視永續。
procurement|n.|採購|Centralized procurement lowers unit prices.|集中採購降低單價。
stakeholder|n.|利害關係人|Managers must balance the interests of all stakeholders.|管理者必須平衡所有利害關係人的利益。
merger|n.|合併|The merger created the largest firm in the industry.|此次合併造就了業界最大的公司。
productivity|n.|生產力|Productivity growth has slowed in many countries.|許多國家的生產力成長趨緩。
profitability|n.|獲利能力|Automation improved profitability.|自動化提升了獲利能力。
entrepreneur|n.|創業家|Young entrepreneurs launched many startups.|年輕創業家創辦了許多新創公司。
fluctuation|n.|波動|Currency fluctuations affect export prices.|匯率波動影響出口價格。
subsidy|n.|補貼|Farm subsidies distort global markets.|農業補貼扭曲了全球市場。
globalization|n.|全球化|Globalization lengthened supply chains.|全球化拉長了供應鏈。
deregulation|n.|解除管制|Deregulation increased competition in airlines.|解除管制增加了航空業的競爭。
liquidity|n.|流動性|Firms need liquidity to survive shocks.|企業需要流動性來度過衝擊。
equilibrium|n.|均衡|The market reaches equilibrium when supply equals demand.|供給等於需求時市場達到均衡。
commodity|n.|商品；原物料|Oil is the most traded commodity.|石油是交易量最大的原物料。
lucrative|adj.|有利可圖的|The cloud market is highly lucrative.|雲端市場利潤豐厚。
bankruptcy|n.|破產|High debt pushed the retailer into bankruptcy.|高負債讓這家零售商破產。
downsize|v.|縮編|The firm downsized its workforce by 10%.|公司裁減一成人力。
logistics|n.|物流|E-commerce depends on efficient logistics.|電子商務仰賴高效率物流。
leverage|v.|善用|Firms leverage data to understand customers.|企業善用資料了解顧客。
benchmark|n./v.|基準；標竿比較|We benchmark our costs against competitors.|我們拿成本跟競爭者做標竿比較。
diversify|v.|多角化；分散|Firms diversify suppliers to reduce risk.|企業分散供應商以降低風險。
saturate|v.|使飽和|The smartphone market is saturated.|智慧手機市場已飽和。
revenue stream|n.|收入來源|Subscriptions provide a stable revenue stream.|訂閱制提供穩定的收入來源。`,
4: `cognitive|adj.|認知的|Cognitive biases distort managerial decisions.|認知偏誤扭曲管理決策。
perception|n.|知覺；看法|Perception of risk differs among individuals.|每個人對風險的知覺不同。
motivation|n.|動機|Intrinsic motivation leads to higher creativity.|內在動機帶來較高創造力。
fatigue|n.|疲勞|Fatigue increases the risk of human error.|疲勞增加人為失誤的風險。
heuristic|n.|捷思；經驗法則|People rely on heuristics when time is limited.|時間有限時人們依賴捷思。
irrational|adj.|不理性的|Panic buying is often irrational.|恐慌性購買常是不理性的。
conformity|n.|從眾|Social pressure leads to conformity.|社會壓力導致從眾。
anxiety|n.|焦慮|Test anxiety lowers exam performance.|考試焦慮降低考試表現。
reinforcement|n.|強化|Positive reinforcement encourages desired behavior.|正增強鼓勵期望的行為。
procrastinate|v.|拖延|Students often procrastinate before deadlines.|學生常在截止日前拖延。
resilience|n.|韌性；復原力|Resilience helps people cope with stress.|韌性幫助人們應對壓力。
impulsive|adj.|衝動的|Impulsive purchases are common online.|網路上衝動購物很常見。
empathy|n.|同理心|Empathy improves teamwork.|同理心能改善團隊合作。
attention span|n.|專注時間|Short videos may shorten attention spans.|短影音可能縮短專注時間。
bias|n.|偏誤|Confirmation bias makes us ignore opposing evidence.|確認偏誤讓我們忽視相反證據。
deliberate|adj.|刻意的；深思的|Deliberate practice builds expertise.|刻意練習建立專業。
frustration|n.|挫折感|Long waits cause customer frustration.|長時間等待引起顧客挫折感。
habitual|adj.|習慣性的|Habitual behavior is hard to change.|習慣性行為很難改變。
incentive-driven|adj.|受誘因驅動的|Incentive-driven employees may game the system.|受誘因驅動的員工可能鑽制度漏洞。
intuitive|adj.|直覺的|An intuitive design needs no manual.|直覺式設計不需要說明書。
overconfidence|n.|過度自信|Overconfidence leads to poor forecasts.|過度自信導致預測失準。
peer pressure|n.|同儕壓力|Peer pressure influences teenagers' choices.|同儕壓力影響青少年的選擇。
self-esteem|n.|自尊|Praise can boost self-esteem.|讚美能提升自尊。
stimulus|n.|刺激|Response time depends on the type of stimulus.|反應時間取決於刺激的類型。
subconscious|adj.|潛意識的|Ads target subconscious desires.|廣告瞄準潛意識的欲望。
trait|n.|特質|Personality traits predict job performance.|人格特質可預測工作表現。
workload|n.|工作負荷|Excessive workload causes burnout.|工作負荷過重導致倦怠。
burnout|n.|倦怠|Burnout is common among healthcare workers.|倦怠在醫護人員中很常見。
altruism|n.|利他主義|Altruism motivates volunteers.|利他精神驅動志工。
cue|n.|提示；線索|Visual cues guide drivers' attention.|視覺提示引導駕駛的注意力。`,
5: `epidemic|n.|流行病|The epidemic overwhelmed local hospitals.|流行病使當地醫院不堪負荷。
pandemic|n.|全球大流行|The pandemic disrupted global supply chains.|疫情打亂了全球供應鏈。
chronic|adj.|慢性的|Chronic diseases account for most healthcare costs.|慢性病佔大部分醫療支出。
diagnosis|n.|診斷|AI can assist in early diagnosis of cancer.|AI 能協助癌症早期診斷。
obesity|n.|肥胖|Obesity rates have tripled since 1975.|肥胖率自 1975 年以來成長三倍。
sedentary|adj.|久坐的|A sedentary lifestyle raises health risks.|久坐的生活方式提高健康風險。
vaccine|n.|疫苗|The vaccine was developed in record time.|疫苗以破紀錄的速度研發完成。
immune|adj.|免疫的|Sleep strengthens the immune system.|睡眠強化免疫系統。
transmit|v.|傳染；傳播|The virus is transmitted through droplets.|病毒透過飛沫傳播。
symptom|n.|症狀|Fever is a common symptom of infection.|發燒是常見的感染症狀。
nutrition|n.|營養|Poor nutrition affects children's growth.|營養不良影響兒童成長。
dosage|n.|劑量|The dosage depends on body weight.|劑量依體重而定。
ergonomic|adj.|人因工程的|Ergonomic chairs reduce back pain.|人體工學椅減少背痛。
musculoskeletal|adj.|肌肉骨骼的|Lifting heavy loads causes musculoskeletal disorders.|搬重物導致肌肉骨骼疾病。
contagious|adj.|傳染性的|Measles is highly contagious.|麻疹傳染力很強。
mortality|n.|死亡率|Infant mortality has fallen sharply.|嬰兒死亡率大幅下降。
life expectancy|n.|平均壽命|Life expectancy in Taiwan exceeds 80 years.|台灣平均壽命超過 80 歲。
clinical trial|n.|臨床試驗|The drug passed three phases of clinical trials.|此藥通過三期臨床試驗。
side effect|n.|副作用|Most side effects are mild.|大多數副作用都很輕微。
prevention|n.|預防|Prevention is cheaper than treatment.|預防比治療便宜。
sanitation|n.|衛生設施|Poor sanitation spreads disease.|衛生不良會散播疾病。
therapy|n.|療法|Physical therapy speeds recovery.|物理治療加速復原。
insomnia|n.|失眠|Shift work often leads to insomnia.|輪班工作常導致失眠。
aging|n./adj.|老化|An aging population strains the healthcare system.|人口老化加重醫療體系負擔。
outbreak|n.|爆發|An outbreak of flu closed several schools.|流感爆發使數所學校停課。
quarantine|n.|隔離|Travelers were placed in quarantine for 14 days.|旅客被隔離 14 天。
hygiene|n.|衛生|Hand hygiene reduces hospital infections.|手部衛生降低院內感染。
genetic|adj.|基因的|Some diseases have a genetic component.|某些疾病有遺傳因素。
metabolism|n.|新陳代謝|Exercise boosts metabolism.|運動促進新陳代謝。
well-being|n.|福祉；身心健康|Flexible hours improve employee well-being.|彈性工時改善員工身心健康。`,
6: `correlation|n.|相關|Correlation does not imply causation.|相關不代表因果。
causation|n.|因果關係|Experiments are needed to establish causation.|需要實驗才能確立因果關係。
sample|n./v.|樣本；抽樣|A random sample of 500 users was surveyed.|隨機抽樣 500 名使用者進行調查。
variable|n.|變數|Age is a confounding variable in this study.|年齡是本研究的干擾變數。
control group|n.|對照組|The control group received no training.|對照組沒有接受訓練。
replicate|v.|重複驗證|The experiment was replicated in five countries.|實驗在五個國家重複進行。
anomaly|n.|異常|The anomaly was traced to a faulty sensor.|異常追查到一個故障的感測器。
quantify|v.|量化|It is hard to quantify customer loyalty.|顧客忠誠度很難量化。
extrapolate|v.|外推|We cannot extrapolate beyond the data range.|我們不能外推到資料範圍之外。
inference|n.|推論|Statistical inference relies on probability.|統計推論仰賴機率。
validate|v.|驗證|The model was validated with real data.|模型已用真實資料驗證。
peer review|n.|同儕審查|The paper underwent rigorous peer review.|論文經過嚴格的同儕審查。
rigorous|adj.|嚴謹的|Rigorous methods produce reliable results.|嚴謹的方法產生可靠結果。
skewed|adj.|偏斜的|Income data are often skewed.|收入資料常呈偏態。
outlier|n.|離群值|Outliers can distort the mean.|離群值可能扭曲平均數。
longitudinal|adj.|縱貫的；長期追蹤的|A longitudinal study followed workers for ten years.|縱貫研究追蹤工人十年。
bias|n.|偏差|Selection bias weakens the conclusion.|選樣偏差削弱了結論。
threshold|n.|門檻|Results above the threshold are flagged.|超過門檻的結果會被標記。
trend|n.|趨勢|The data show an upward trend.|資料呈現上升趨勢。
proportional|adj.|成比例的|Cost is proportional to distance.|成本與距離成正比。
margin of error|n.|誤差範圍|The poll has a margin of error of 3%.|此民調的誤差範圍為 3%。
methodology|n.|研究方法|The methodology section explains data collection.|研究方法章節說明資料蒐集方式。
premise|n.|前提|The argument rests on a false premise.|此論證建立在錯誤前提上。
verify|v.|驗證|Results were verified by independent auditors.|結果經獨立稽核人員驗證。
consistent|adj.|一致的|The findings are consistent with prior studies.|研究發現與先前研究一致。
conclusive|adj.|決定性的|The evidence is not yet conclusive.|證據尚無定論。
speculative|adj.|推測性的|These claims remain speculative.|這些說法仍屬推測。
plausible|adj.|合理可信的|A plausible explanation is measurement error.|一個合理的解釋是量測誤差。
substantiate|v.|證實|The claim was not substantiated by data.|此主張未獲資料證實。
refute|v.|駁斥|New evidence refuted the old theory.|新證據駁斥了舊理論。`,
7: `urbanization|n.|都市化|Rapid urbanization strains public transport.|快速都市化加重大眾運輸負擔。
demographic|adj./n.|人口的；人口結構|Demographic change affects labor supply.|人口結構變化影響勞動供給。
inequality|n.|不平等|Automation may widen income inequality.|自動化可能擴大所得不平等。
literacy|n.|識字率；素養|Digital literacy is essential for modern jobs.|數位素養是現代工作的必備能力。
curriculum|n.|課程|Coding was added to the national curriculum.|程式設計被納入國家課綱。
immigrant|n.|移民|Immigrants fill labor shortages in factories.|移工填補工廠的勞力短缺。
welfare|n.|社會福利|Welfare spending rises during recessions.|經濟衰退時社福支出增加。
discrimination|n.|歧視|Laws prohibit discrimination in hiring.|法律禁止雇用歧視。
census|n.|人口普查|The census is conducted every ten years.|人口普查每十年舉行一次。
civic|adj.|公民的|Civic participation strengthens democracy.|公民參與強化民主。
commute|v./n.|通勤|Long commutes reduce life satisfaction.|長通勤降低生活滿意度。
consensus|n.|共識|There is growing consensus on climate action.|對氣候行動的共識日益增加。
controversial|adj.|有爭議的|Genetic editing remains controversial.|基因編輯仍具爭議。
ethical|adj.|倫理的|AI raises new ethical questions.|AI 帶來新的倫理問題。
legislation|n.|立法|New legislation protects personal data.|新法規保護個人資料。
marginalize|v.|邊緣化|Rural areas are often marginalized.|鄉村地區常被邊緣化。
mobility|n.|流動性|Education improves social mobility.|教育提升社會流動。
norm|n.|社會規範|Social norms shape consumer behavior.|社會規範形塑消費行為。
privacy|n.|隱私|Users worry about data privacy.|使用者擔心資料隱私。
socioeconomic|adj.|社會經濟的|Socioeconomic status affects health outcomes.|社經地位影響健康結果。
vocational|adj.|職業的|Vocational training prepares technicians.|職業訓練培育技術人員。
workforce|n.|勞動力|The workforce is aging rapidly.|勞動力正快速老化。
disparity|n.|差距|There is a disparity between urban and rural incomes.|城鄉所得有差距。
advocate|n./v.|倡議者；倡導|Advocates call for shorter working hours.|倡議者呼籲縮短工時。
public policy|n.|公共政策|Evidence should guide public policy.|公共政策應以證據為依據。
gig economy|n.|零工經濟|The gig economy offers flexibility but little security.|零工經濟提供彈性但缺乏保障。
remote work|n.|遠距工作|Remote work blurs the line between work and home.|遠距工作模糊了工作與家庭的界線。
misinformation|n.|錯誤資訊|Misinformation spreads quickly on social media.|錯誤資訊在社群媒體上快速傳播。
polarization|n.|兩極化|Political polarization has increased.|政治兩極化加劇。
inclusive|adj.|包容的|Inclusive design serves users of all abilities.|包容性設計服務各種能力的使用者。`,
};

export const TOEFL = Object.entries(RAW).flatMap(([th, block]) =>
  block.trim().split("\n").map(line => {
    const [w, pos, zh, ex, exZh] = line.split("|");
    return { w, pos, zh, ex, exZh, tag: "TOEFL", sub: +th };
  })
);
