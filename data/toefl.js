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


// 第二批（擴充）
const RAW2 = {
1: `artificial intelligence|n.|人工智慧|Artificial intelligence can detect defects faster than human inspectors.|人工智慧偵測缺陷比人工檢驗員快。
machine learning|n.|機器學習|Machine learning models improve as they process more data.|機器學習模型處理越多資料就越進步。
neural network|n.|神經網路|A neural network was trained on a million images.|神經網路用一百萬張影像訓練。
dataset|n.|資料集|The dataset contains ten years of sales records.|此資料集包含十年的銷售紀錄。
bandwidth|n.|頻寬|Video streaming requires high bandwidth.|影音串流需要高頻寬。
connectivity|n.|連線能力|5G improves connectivity between machines.|5G 改善機器之間的連線。
digital twin|n.|數位孿生|A digital twin lets engineers test changes virtually.|數位孿生讓工程師能虛擬測試變更。
sensor|n.|感測器|Sensors collect vibration data every second.|感測器每秒收集震動資料。
robotics|n.|機器人學|Advances in robotics have transformed warehouses.|機器人技術的進步改變了倉儲。
virtual reality|n.|虛擬實境|Virtual reality is used to train new operators.|虛擬實境被用來訓練新進操作員。
blockchain|n.|區塊鏈|Blockchain can improve traceability in supply chains.|區塊鏈能提升供應鏈的可追溯性。
cloud computing|n.|雲端運算|Cloud computing reduces the need for local servers.|雲端運算減少對本地伺服器的需求。
outdated|adj.|過時的|Outdated software poses security risks.|過時的軟體有資安風險。
cutting-edge|adj.|尖端的|The lab uses cutting-edge equipment.|實驗室使用尖端設備。
hacker|n.|駭客|Hackers stole millions of customer records.|駭客竊取了數百萬筆顧客資料。
malfunction|n./v.|故障|A sensor malfunction triggered a false alarm.|感測器故障觸發了假警報。
patent|n./v.|專利|The firm holds over 500 patents.|公司擁有超過 500 項專利。
commercialize|v.|商業化|It took a decade to commercialize the technology.|這項技術花了十年才商業化。
adoption|n.|採用|The adoption of robots varies by industry.|機器人的採用程度因產業而異。
obsolete|adj.|淘汰的|Typewriters became obsolete with personal computers.|個人電腦出現後打字機被淘汰。
optimize|v.|最佳化|AI is used to optimize delivery routes.|AI 被用來最佳化配送路線。
personalize|v.|個人化|Apps personalize content based on user behavior.|應用程式依使用者行為提供個人化內容。
navigate|v.|導航；應對|Firms must navigate rapid technological change.|企業必須應對快速的技術變化。
real-time|adj.|即時的|Real-time monitoring prevents costly failures.|即時監控能預防代價高昂的故障。
wearable|adj./n.|穿戴式（裝置）|Wearables track workers' fatigue levels.|穿戴式裝置追蹤工人的疲勞程度。`,
2: `climate change|n.|氣候變遷|Climate change increases the frequency of extreme weather.|氣候變遷增加極端天氣的頻率。
global warming|n.|全球暖化|Global warming is melting polar ice.|全球暖化正在融化極地冰層。
deforestation|n.|森林砍伐|Deforestation releases stored carbon.|森林砍伐釋放儲存的碳。
endangered|adj.|瀕臨絕種的|Many species are endangered by habitat loss.|許多物種因棲地喪失而瀕臨絕種。
extinction|n.|滅絕|Scientists warn of a mass extinction.|科學家警告大規模滅絕。
solar|adj.|太陽能的|Solar panels now cost far less than a decade ago.|太陽能板的成本遠低於十年前。
wind turbine|n.|風力渦輪機|Offshore wind turbines generate power for thousands of homes.|離岸風機為數千戶家庭供電。
hydroelectric|adj.|水力發電的|Hydroelectric dams provide stable electricity.|水力發電壩提供穩定電力。
net-zero|adj.|淨零的|Taiwan aims to reach net-zero emissions by 2050.|台灣目標 2050 年達成淨零排放。
carbon tax|n.|碳稅|A carbon tax raises the cost of polluting.|碳稅提高污染的成本。
landfill|n.|垃圾掩埋場|Most plastic ends up in landfills.|大部分塑膠最後進了掩埋場。
biodegradable|adj.|可生物分解的|Biodegradable packaging reduces waste.|可分解包裝減少廢棄物。
emit|v.|排放|Cars emit large amounts of carbon dioxide.|汽車排放大量二氧化碳。
atmosphere|n.|大氣|Carbon dioxide traps heat in the atmosphere.|二氧化碳把熱困在大氣中。
ecological|adj.|生態的|The dam had serious ecological consequences.|水壩造成嚴重的生態後果。
sustainable|adj.|永續的|Sustainable sourcing is now a priority.|永續採購現在是優先事項。
reusable|adj.|可重複使用的|Reusable containers cut packaging waste.|可重複使用的容器減少包裝廢棄物。
conservation|n.|保育|Wildlife conservation requires funding.|野生動物保育需要資金。
contamination|n.|污染|Groundwater contamination is hard to reverse.|地下水污染很難逆轉。
sea level|n.|海平面|Rising sea levels threaten coastal cities.|海平面上升威脅沿海城市。
ozone|n.|臭氧|The ozone layer protects us from UV radiation.|臭氧層保護我們免受紫外線傷害。
smog|n.|霧霾|Smog is common in industrial cities.|霧霾在工業城市很常見。
nuclear power|n.|核能|Nuclear power produces almost no emissions.|核能幾乎不產生排放。
energy storage|n.|儲能|Energy storage solves the intermittency of solar power.|儲能解決太陽能的間歇性問題。
environmentally friendly|adj.|環保的|Consumers prefer environmentally friendly products.|消費者偏好環保產品。`,
3: `supply and demand|n.|供需|Prices are determined by supply and demand.|價格由供需決定。
interest rate|n.|利率|Higher interest rates discourage borrowing.|較高的利率抑制借貸。
gross domestic product|n.|國內生產毛額|GDP grew by 3% last year.|去年國內生產毛額成長 3%。
unemployment rate|n.|失業率|The unemployment rate fell to 3.5%.|失業率降至 3.5%。
trade deficit|n.|貿易逆差|The trade deficit widened due to oil imports.|貿易逆差因石油進口而擴大。
stock market|n.|股市|The stock market reacted sharply to the news.|股市對這則消息反應劇烈。
investor|n.|投資人|Investors are worried about rising costs.|投資人擔心成本上升。
shareholder|n.|股東|Shareholders approved the merger.|股東通過了合併案。
dividend|n.|股利|The firm paid a record dividend.|公司發放了創紀錄的股利。
market share|n.|市占率|The firm lost market share to new rivals.|公司的市占率被新對手搶走。
startup|n.|新創公司|Many startups fail within five years.|許多新創公司在五年內失敗。
venture capital|n.|創業投資|Venture capital funds high-risk startups.|創投資金投入高風險的新創公司。
fixed cost|n.|固定成本|Rent is a fixed cost.|租金是固定成本。
variable cost|n.|變動成本|Raw materials are a variable cost.|原料是變動成本。
break-even|adj./n.|損益兩平|The plant reached break-even in its second year.|工廠在第二年達到損益兩平。
economies of scale|n.|規模經濟|Large firms benefit from economies of scale.|大企業受益於規模經濟。
pricing|n.|定價|Dynamic pricing changes prices in real time.|動態定價即時調整價格。
retail|n.|零售|Online retail grew rapidly during the pandemic.|疫情期間網路零售快速成長。
wholesale|n./adj.|批發|Wholesale prices rose by 5%.|批發價上漲 5%。
consumption|n.|消費|Household consumption drives economic growth.|家庭消費推動經濟成長。
purchasing power|n.|購買力|Inflation reduces purchasing power.|通膨降低購買力。
fiscal|adj.|財政的|The government adopted a tight fiscal policy.|政府採取緊縮的財政政策。
monetary|adj.|貨幣的|The central bank changed its monetary policy.|央行改變貨幣政策。
recover|v.|復甦|The economy recovered faster than expected.|經濟復甦得比預期快。
stagnation|n.|停滯|Japan experienced decades of economic stagnation.|日本經歷了數十年的經濟停滯。`,
4: `decision-making|n.|決策|Emotions play a role in decision-making.|情緒在決策中扮演角色。
reasoning|n.|推理|Logical reasoning is tested in many exams.|許多考試會測驗邏輯推理。
memory|n.|記憶|Sleep strengthens long-term memory.|睡眠強化長期記憶。
short-term memory|n.|短期記憶|Short-term memory holds about seven items.|短期記憶大約能保存七個項目。
perceive|v.|察覺；認為|People perceive risks differently.|人們對風險的感知不同。
attentive|adj.|專注的|Attentive drivers react faster.|專注的駕駛反應較快。
distraction|n.|分心的事|Phones are a major source of distraction.|手機是主要的分心來源。
multitask|v.|多工|People who multitask make more errors.|多工的人犯錯較多。
emotional|adj.|情緒的|Emotional stress affects performance.|情緒壓力影響表現。
optimism|n.|樂觀|Optimism improves resilience.|樂觀提升韌性。
pessimism|n.|悲觀|Pessimism can lead to inaction.|悲觀可能導致不作為。
loss aversion|n.|損失規避|Loss aversion makes people avoid risks.|損失規避讓人們避開風險。
anchoring|n.|錨定效應|Anchoring affects how people judge prices.|錨定效應影響人們判斷價格。
framing|n.|框架效應|The framing of a question changes the answer.|問題的框架會改變答案。
herd behavior|n.|從眾行為|Herd behavior can cause stock market bubbles.|從眾行為可能造成股市泡沫。
gratification|n.|滿足|Delayed gratification predicts later success.|延遲滿足能預測日後的成功。
self-control|n.|自制力|Self-control declines when we are tired.|疲累時自制力下降。
willpower|n.|意志力|Willpower is a limited resource.|意志力是有限的資源。
conscious|adj.|有意識的|Most decisions are not fully conscious.|大多數決定並非完全有意識的。
instinct|n.|本能|Animals rely on instinct to survive.|動物依靠本能生存。
interpersonal|adj.|人際的|Interpersonal skills are valued by employers.|雇主重視人際能力。
introvert|n.|內向者|Introverts may prefer working alone.|內向的人可能偏好獨自工作。
extrovert|n.|外向者|Extroverts gain energy from social interaction.|外向者從社交中獲得能量。
satisfaction|n.|滿意度|Job satisfaction reduces turnover.|工作滿意度降低離職率。
morale|n.|士氣|Layoffs hurt employee morale.|裁員打擊員工士氣。`,
5: `public health|n.|公共衛生|Public health campaigns reduced smoking rates.|公共衛生宣導降低了吸菸率。
healthcare|n.|醫療保健|Healthcare costs are rising in aging societies.|高齡社會的醫療支出持續上升。
patient|n.|病人|Patients wait hours in the emergency room.|病人在急診室等候數小時。
surgery|n.|手術|Robotic surgery reduces recovery time.|機器人手術縮短恢復時間。
treatment|n.|治療|Early treatment improves survival rates.|早期治療提高存活率。
medication|n.|藥物|Patients must take the medication daily.|病人必須每天服藥。
disorder|n.|失調；疾病|Sleep disorders are common among shift workers.|睡眠障礙在輪班工作者中很常見。
cardiovascular|adj.|心血管的|Exercise lowers the risk of cardiovascular disease.|運動降低心血管疾病風險。
diabetes|n.|糖尿病|Diabetes is linked to poor diet.|糖尿病與飲食不良有關。
infectious disease|n.|傳染病|Infectious diseases spread quickly in crowded cities.|傳染病在擁擠的城市中迅速傳播。
antibiotic resistance|n.|抗藥性|Overuse of antibiotics leads to resistance.|濫用抗生素導致抗藥性。
virus|n.|病毒|The virus mutated into a new strain.|病毒突變成新的變種。
bacteria|n.|細菌|Some bacteria are beneficial to health.|有些細菌對健康有益。
mental health|n.|心理健康|Remote work affects mental health.|遠距工作影響心理健康。
depression|n.|憂鬱症|Depression is a leading cause of disability.|憂鬱症是失能的主要原因之一。
stress-related|adj.|與壓力相關的|Stress-related illnesses cost firms billions.|壓力相關疾病讓企業損失數十億。
occupational|adj.|職業的|Occupational injuries fell after the new rules.|新規定實施後職業傷害減少。
posture|n.|姿勢|Poor posture causes back pain.|不良姿勢導致背痛。
repetitive strain|n.|重複性勞損|Repetitive strain injuries are common in assembly work.|重複性勞損在組裝工作中很常見。
noise-induced|adj.|噪音引起的|Noise-induced hearing loss is permanent.|噪音引起的聽力損失是永久性的。
fitness|n.|體能|Physical fitness reduces sick leave.|體能好可減少病假。
diet|n.|飲食|A balanced diet supports concentration.|均衡飲食有助專注。
epidemiology|n.|流行病學|Epidemiology studies how diseases spread.|流行病學研究疾病如何傳播。
preventive|adj.|預防的|Preventive care lowers long-term costs.|預防性照護降低長期成本。
recovery|n.|康復；恢復|Recovery from surgery takes weeks.|手術後恢復需要數週。`,
6: `experiment|n./v.|實驗|The experiment lasted six months.|實驗持續六個月。
participant|n.|受試者|Participants were randomly assigned to groups.|受試者被隨機分組。
questionnaire|n.|問卷|A questionnaire was sent to 500 managers.|問卷寄給 500 位經理。
interview|n.|訪談|Interviews provided rich qualitative data.|訪談提供豐富的質性資料。
observation|n.|觀察|Direct observation revealed hidden delays.|直接觀察揭露了隱藏的延誤。
measurement|n.|測量|Measurement error affects the results.|量測誤差影響結果。
accuracy|n.|準確度|The accuracy of the forecast improved.|預測的準確度提升了。
reliability|n.|信度；可靠性|The survey has high reliability.|此問卷信度很高。
validity|n.|效度|External validity limits generalization.|外部效度限制了推論範圍。
generalize|v.|概括；推論|The results cannot be generalized to other industries.|結果無法推論到其他產業。
average|n./adj.|平均|The average waiting time was 12 minutes.|平均等候時間為 12 分鐘。
median|n.|中位數|The median is less affected by outliers.|中位數較不受離群值影響。
standard deviation|n.|標準差|A small standard deviation means stable output.|標準差小表示產出穩定。
distribution|n.|分配|The data follow a normal distribution.|資料服從常態分配。
probability|n.|機率|The probability of failure is less than 1%.|故障機率低於 1%。
regression|n.|迴歸|Regression analysis identifies key drivers.|迴歸分析找出關鍵驅動因素。
significance|n.|顯著性|The result reached statistical significance.|結果達到統計顯著。
hypothesis|n.|假說|The data supported the hypothesis.|資料支持此假說。
evidence|n.|證據|There is little evidence for this claim.|這個說法幾乎沒有證據支持。
limitation|n.|限制|The small sample is a limitation of the study.|樣本小是本研究的限制。
finding|n.|發現|The main finding is surprising.|主要發現令人意外。
data-driven|adj.|資料驅動的|Data-driven decisions reduce guesswork.|資料驅動的決策減少猜測。
indicator|n.|指標|Turnover is an indicator of satisfaction.|離職率是滿意度的指標。
estimate|v./n.|估計|We estimate the cost at $2 million.|我們估計成本為兩百萬美元。
simulate|v.|模擬|The model simulates customer arrivals.|模型模擬顧客抵達。`,
7: `population|n.|人口|The population is shrinking in rural areas.|鄉村地區人口正在減少。
birth rate|n.|出生率|Taiwan's birth rate is among the lowest in the world.|台灣的出生率是全世界最低之一。
aging society|n.|高齡化社會|An aging society faces labor shortages.|高齡化社會面臨勞力短缺。
migrant worker|n.|移工|Migrant workers support many factories.|移工支撐許多工廠。
labor market|n.|勞動市場|The labor market is tight for engineers.|工程師的勞動市場很緊。
minimum wage|n.|基本工資|The minimum wage was raised this year.|今年基本工資調漲了。
work-life balance|n.|工作與生活平衡|Young workers value work-life balance.|年輕工作者重視工作與生活平衡。
diversity|n.|多元性|Workplace diversity improves creativity.|職場多元性提升創造力。
gender equality|n.|性別平等|Gender equality in STEM is improving.|STEM 領域的性別平等正在改善。
poverty|n.|貧窮|Education helps families escape poverty.|教育幫助家庭脫離貧窮。
higher education|n.|高等教育|Demand for higher education keeps rising.|高等教育的需求持續上升。
tuition|n.|學費|Rising tuition burdens students.|學費上漲加重學生負擔。
lifelong learning|n.|終身學習|Lifelong learning is essential in a changing economy.|在變動的經濟中終身學習很重要。
online learning|n.|線上學習|Online learning expanded during the pandemic.|線上學習在疫情期間擴大。
digital divide|n.|數位落差|The digital divide limits rural students.|數位落差限制了鄉村學生。
social media|n.|社群媒體|Social media shapes public opinion.|社群媒體形塑輿論。
public opinion|n.|輿論|Public opinion shifted after the accident.|事故後輿論轉向。
regulation|n.|法規|Stricter regulation protects consumers.|更嚴格的法規保護消費者。
accountability|n.|問責|Algorithms need accountability.|演算法需要問責機制。
community|n.|社區；社群|Local communities opposed the new factory.|當地社區反對新工廠。
volunteer|n./v.|志工；自願|Volunteers helped after the earthquake.|地震後志工投入協助。
infrastructure|n.|基礎建設|Public infrastructure needs constant investment.|公共基礎建設需要持續投資。
transportation|n.|交通運輸|Public transportation reduces traffic jams.|大眾運輸減少塞車。
housing|n.|住房|Housing prices are high in big cities.|大城市的房價很高。
cultural|adj.|文化的|Cultural differences affect management styles.|文化差異影響管理風格。`,
};

export const TOEFL = [...Object.entries(RAW), ...Object.entries(RAW2)].flatMap(([th, block]) =>
  block.trim().split("\n").map(line => {
    const [w, pos, zh, ex, exZh] = line.split("|");
    return { w, pos, zh, ex, exZh, tag: "TOEFL", sub: +th };
  })
);
