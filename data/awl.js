// AWL 學術字彙表（Coxhead, 2000）570 字族 headword，依 Sublist 1–10（1 = 最常見）
// 拼字採美式（analyze, labor, maximize…），考試以美式為主
// 格式：單字|詞性|中文|學術例句|例句中譯
const RAW = {
1: `analyze|v.|分析|We analyzed the data using a two-way ANOVA.|我們用雙因子變異數分析來分析資料。
approach|n./v.|方法；接近|This approach reduces computation time significantly.|此方法大幅縮短運算時間。
area|n.|領域；區域|Supply chain management is a growing research area.|供應鏈管理是一個成長中的研究領域。
assess|v.|評估|We assess each supplier on cost, quality, and delivery.|我們從成本、品質、交期評估每家供應商。
assume|v.|假設；承擔|The model assumes that demand is normally distributed.|模型假設需求呈常態分配。
authority|n.|權威；當局|Local authorities imposed stricter emission standards.|地方當局實施更嚴格的排放標準。
available|adj.|可得的；可用的|Real-time data are now available on the shop floor.|現場現在可取得即時資料。
benefit|n./v.|好處；受益|Small firms benefit most from shared logistics.|小型企業從共同物流中獲益最多。
concept|n.|概念|The concept of lean originated in Japanese automakers.|精實的概念源自日本車廠。
consist|v.|由…組成 (of)|The line consists of five workstations.|這條產線由五個工作站組成。
constitute|v.|構成；組成|Labor costs constitute 30% of total expenses.|人工成本佔總支出的 30%。
context|n.|情境；脈絡|Results may differ in a service context.|在服務業情境下結果可能不同。
contract|n./v.|合約；收縮|The buyback contract shares risk between partners.|買回合約讓夥伴分擔風險。
create|v.|創造|Automation creates new types of jobs.|自動化創造新型態的工作。
data|n.|資料；數據|The data were collected over six months.|資料蒐集歷時六個月。
define|v.|定義|We define utilization as busy time over total time.|我們把利用率定義為忙碌時間除以總時間。
derive|v.|推導；源自|The formula is derived from the cost function.|該公式由成本函數推導而來。
distribute|v.|分配；配送|Products are distributed through regional warehouses.|產品透過區域倉庫配送。
economy|n.|經濟；節約|Economies of scale lower the unit cost.|規模經濟降低單位成本。
environment|n.|環境|Firms operate in an uncertain environment.|企業在不確定的環境中營運。
establish|v.|建立；確立|The study establishes a link between training and productivity.|此研究確立訓練與生產力之間的關聯。
estimate|v./n.|估計|We estimate the parameters by maximum likelihood.|我們用最大概似法估計參數。
evident|adj.|明顯的|It is evident that the bottleneck limits output.|顯然瓶頸限制了產出。
export|n./v.|出口|Semiconductor exports rose by 15%.|半導體出口成長了 15%。
factor|n.|因素|Lead time is a key factor in inventory decisions.|前置時間是存貨決策的關鍵因素。
finance|n./v.|財務；融資|The project was financed by venture capital.|這個專案由創投出資。
formula|n.|公式|The EOQ formula balances ordering and holding costs.|EOQ 公式平衡訂購成本與持有成本。
function|n./v.|函數；功能；運作|The objective function minimizes total cost.|目標函數使總成本最小化。
identify|v.|辨識；找出|We identify the root cause with a fishbone diagram.|我們用魚骨圖找出根本原因。
income|n.|收入|Household income affects purchasing behavior.|家庭收入影響購買行為。
indicate|v.|指出；顯示|The results indicate a strong positive correlation.|結果顯示強烈的正相關。
individual|adj./n.|個別的；個人|Individual workers vary in learning speed.|個別工人的學習速度不同。
interpret|v.|解讀|The coefficients should be interpreted with caution.|係數應謹慎解讀。
involve|v.|涉及；包含|Scheduling involves assigning jobs to machines.|排程涉及把工件分派到機台。
issue|n./v.|議題；發布|Data privacy is a major issue in smart factories.|資料隱私是智慧工廠的重要議題。
labor|n.|勞動；勞工|Labor shortages drive investment in robots.|勞力短缺推動機器人投資。
legal|adj.|法律的；合法的|Firms face legal requirements on waste disposal.|企業面臨廢棄物處理的法規要求。
legislate|v.|立法|The government legislated a minimum wage increase.|政府立法調高基本工資。
major|adj./n.|主要的；主修|Delays are a major source of customer complaints.|延遲是顧客抱怨的主要來源。
method|n.|方法|The proposed method outperforms existing heuristics.|所提方法優於現有啟發式演算法。
occur|v.|發生|Stockouts occur when demand exceeds inventory.|當需求超過存貨時就會缺貨。
percent|n.|百分比|Defects fell by 40 percent after training.|訓練後不良率下降 40%。
period|n.|期間|Demand is forecast for each planning period.|每個規劃期都要預測需求。
policy|n.|政策；策略|An (s, S) inventory policy is optimal here.|此處 (s, S) 存貨策略為最佳。
principle|n.|原則；原理|The design follows ergonomic principles.|此設計遵循人因原則。
proceed|v.|進行；繼續|We then proceed to test the hypothesis.|接著我們進行假說檢定。
process|n./v.|流程；處理|Process capability is measured by Cpk.|製程能力以 Cpk 衡量。
require|v.|需要；要求|The model requires accurate demand data.|此模型需要準確的需求資料。
research|n./v.|研究|Further research is needed on this topic.|此主題需要進一步研究。
respond|v.|回應；反應|Agile firms respond quickly to market changes.|敏捷的企業能快速回應市場變化。
role|n.|角色|Managers play a key role in change adoption.|管理者在變革推動中扮演關鍵角色。
section|n.|章節；部分|Section 3 describes the mathematical model.|第三節說明數學模型。
sector|n.|部門；產業|The service sector employs most workers.|服務業雇用了大多數勞工。
significant|adj.|顯著的；重要的|The difference is statistically significant.|此差異在統計上顯著。
similar|adj.|相似的|Similar results were found in other plants.|在其他工廠也發現類似結果。
source|n./v.|來源；採購|Firms source components from multiple suppliers.|企業向多家供應商採購零件。
specific|adj.|特定的；具體的|Each product has specific quality requirements.|每項產品有特定的品質要求。
structure|n./v.|結構；建構|The organizational structure affects decision speed.|組織結構影響決策速度。
theory|n.|理論|Queueing theory predicts average waiting time.|等候理論可預測平均等候時間。
vary|v.|變化；不同|Processing times vary across operators.|作業時間因作業員而異。`,
2: `achieve|v.|達成|The firm achieved a 98% on-time delivery rate.|公司達成 98% 準時交貨率。
acquire|v.|取得；習得|Workers acquire skills through on-the-job training.|工人透過在職訓練習得技能。
administrate|v.|管理；執行|The survey was administered to 300 employees.|問卷施測對象為 300 名員工。
affect|v.|影響|Weather affects demand for cold drinks.|天氣影響冷飲需求。
appropriate|adj.|適當的|Choose an appropriate sample size before testing.|檢定前要選擇適當的樣本數。
aspect|n.|面向|Safety is a critical aspect of plant layout.|安全是廠房佈置的關鍵面向。
assist|v.|協助|Software assists planners in scheduling.|軟體協助規劃人員排程。
category|n.|類別|Items are classified into three ABC categories.|品項分成 ABC 三類。
chapter|n.|章|Chapter 4 presents the experimental results.|第四章呈現實驗結果。
commission|n./v.|委員會；委託；佣金|The study was commissioned by the ministry.|此研究由部會委託。
community|n.|社群；社區|The open-source community maintains the solver.|開源社群維護這個求解器。
complex|adj.|複雜的|Global supply chains are increasingly complex.|全球供應鏈日益複雜。
compute|v.|計算|We compute the optimal solution in polynomial time.|我們在多項式時間內算出最佳解。
conclude|v.|下結論；結束|We conclude that the new layout is superior.|我們的結論是新佈置較佳。
conduct|v./n.|進行；行為|A time study was conducted at each station.|在每個工作站進行了時間研究。
consequent|adj.|隨之發生的|Machine failure and the consequent delay cost $1M.|機台故障及隨之而來的延誤損失百萬美元。
construct|v./n.|建構；構念|We construct a mixed-integer programming model.|我們建立一個混合整數規劃模型。
consume|v.|消耗；消費|Heating consumes most of the plant's energy.|加熱消耗工廠大部分的能源。
credit|n./v.|信用；學分；歸功|The success was credited to strong leadership.|成功歸功於強有力的領導。
culture|n.|文化|Safety culture reduces workplace accidents.|安全文化可減少職場意外。
design|n./v.|設計|Robust design makes products insensitive to noise.|穩健設計讓產品不受雜訊影響。
distinct|adj.|明顯不同的|The two processes have distinct cost structures.|兩個流程的成本結構明顯不同。
element|n.|要素；元素|Trust is a key element of supplier partnerships.|信任是供應商夥伴關係的關鍵要素。
equate|v.|使相等；等同|Higher price is not equated with higher quality.|較高價格不等於較高品質。
evaluate|v.|評估|Simulation was used to evaluate three layouts.|使用模擬評估三種佈置。
feature|n./v.|特徵；以…為特色|The new system features automatic error detection.|新系統具備自動錯誤偵測功能。
final|adj.|最終的|Final assembly takes place in Mexico.|最終組裝在墨西哥進行。
focus|n./v.|焦點；專注|This paper focuses on single-machine scheduling.|本文聚焦於單機排程。
impact|n./v.|影響；衝擊|The impact of tariffs on sourcing is substantial.|關稅對採購的影響相當大。
injure|v.|使受傷|Poor posture can injure the lower back.|不良姿勢可能傷害下背部。
institute|n./v.|機構；設立|The firm instituted a new quality policy.|公司制定了新的品質政策。
invest|v.|投資|Firms invest heavily in automation.|企業大舉投資自動化。
item|n.|品項；項目|Each item has a unique barcode.|每個品項都有唯一條碼。
journal|n.|期刊|The paper was published in a top OR journal.|論文刊登在頂尖作業研究期刊。
maintain|v.|維持；保養|Machines are maintained every 500 hours.|機器每 500 小時保養一次。
normal|adj.|正常的；常態的|Residuals follow a normal distribution.|殘差服從常態分配。
obtain|v.|獲得|Optimal solutions were obtained for small instances.|小型案例都求得最佳解。
participate|v.|參與|Forty firms participated in the survey.|四十家公司參與了調查。
perceive|v.|察覺；認為|Customers perceive waiting time as longer than it is.|顧客感覺的等待時間比實際長。
positive|adj.|正面的；正的|Training has a positive effect on output.|訓練對產出有正面影響。
potential|adj./n.|潛在的；潛力|We identify potential risks in the supply network.|我們找出供應網路中的潛在風險。
previous|adj.|先前的|Previous studies ignored setup times.|先前的研究忽略了換線時間。
primary|adj.|主要的；初級的|Cost is the primary criterion for selection.|成本是主要的選擇標準。
purchase|n./v.|購買；採購|Purchase orders are issued weekly.|採購單每週發出。
range|n./v.|範圍；涵蓋|Prices range from $10 to $50.|價格介於 10 到 50 美元。
region|n.|區域|Demand differs across regions.|各區域的需求不同。
regulate|v.|管制；調節|Agencies regulate the use of chemicals.|主管機關管制化學品的使用。
relevant|adj.|相關的|Only relevant variables were included.|只納入相關變數。
reside|v.|居住；存在於|The key knowledge resides in senior engineers.|關鍵知識存在於資深工程師身上。
resource|n.|資源|Resources are limited in small firms.|小公司的資源有限。
restrict|v.|限制|Space restrictions limit buffer size.|空間限制限縮了緩衝區大小。
secure|adj./v.|安全的；取得|The firm secured a long-term contract.|公司拿下一份長期合約。
seek|v.|尋求|Firms seek to reduce carbon emissions.|企業尋求減少碳排放。
select|v.|選擇|Suppliers were selected using AHP.|使用層級分析法選擇供應商。
site|n.|地點；場址|The new plant site is near the port.|新廠址靠近港口。
strategy|n.|策略|A postponement strategy reduces inventory risk.|延遲差異化策略降低存貨風險。
survey|n./v.|調查；問卷|A survey of 500 consumers was conducted.|對 500 名消費者進行了調查。
text|n.|文本|The text mining approach classifies complaints.|文字探勘方法將客訴分類。
tradition|n.|傳統|Traditional methods rely on manual inspection.|傳統方法仰賴人工檢驗。
transfer|n./v.|轉移；傳遞|Knowledge transfer between plants is difficult.|工廠之間的知識移轉並不容易。`,
3: `alternative|n./adj.|替代方案；替代的|We compare three alternative designs.|我們比較三種替代設計。
circumstance|n.|情況|Under certain circumstances, the heuristic fails.|在某些情況下該啟發式方法會失效。
comment|n./v.|評論|Reviewers commented on the small sample size.|審稿人對樣本數太小提出意見。
compensate|v.|補償；彌補|Higher wages compensate for night shifts.|較高工資彌補夜班的辛苦。
component|n.|零件；成分|Each component is inspected before assembly.|每個零件在組裝前都要檢驗。
consent|n./v.|同意|All participants gave informed consent.|所有受試者都簽署了知情同意。
considerable|adj.|相當大的|The change saved a considerable amount of time.|這項改變節省了相當多時間。
constant|adj./n.|固定的；常數|Demand is assumed constant over time.|假設需求隨時間固定。
constrain|v.|限制；約束|Production is constrained by machine capacity.|生產受到機台產能限制。
contribute|v.|貢獻；促成|Several factors contribute to the delay.|有幾個因素造成延誤。
convene|v.|召開；集合|The committee convened to review the results.|委員會召開會議審查結果。
coordinate|v.|協調|Retailers and suppliers coordinate their orders.|零售商與供應商協調訂單。
core|n./adj.|核心|Firms outsource non-core activities.|企業外包非核心活動。
corporate|adj.|企業的|Corporate social responsibility affects brand image.|企業社會責任影響品牌形象。
correspond|v.|對應；符合|Each node corresponds to a customer.|每個節點對應一位顧客。
criteria|n.(pl.)|標準；準則|Three criteria were used to rank suppliers.|使用三項準則替供應商排名。
deduce|v.|推論|From the results, we deduce that setup time matters.|從結果可推論換線時間很重要。
demonstrate|v.|證明；展示|Experiments demonstrate the method's efficiency.|實驗證明此方法的效率。
document|n./v.|文件；記錄|All defects are documented in the system.|所有缺陷都記錄在系統中。
dominate|v.|主導；支配|A few large firms dominate the market.|少數大企業主導市場。
emphasis|n.|強調；重點|Lean places emphasis on eliminating waste.|精實強調消除浪費。
ensure|v.|確保|Inspection ensures product quality.|檢驗確保產品品質。
exclude|v.|排除|Outliers were excluded from the analysis.|離群值被排除於分析之外。
framework|n.|架構|We propose a framework for risk assessment.|我們提出一個風險評估架構。
fund|n./v.|資金；資助|The research was funded by NSTC.|此研究由國科會資助。
illustrate|v.|說明；舉例|Figure 2 illustrates the process flow.|圖 2 說明流程。
immigrate|v.|移入（移民）|Many skilled workers immigrated to Taiwan.|許多技術工人移居台灣。
imply|v.|暗示；意味|A low R-squared implies poor model fit.|R 平方很低意味模型配適不佳。
initial|adj.|最初的|The initial solution is improved by local search.|初始解再用區域搜尋改善。
instance|n.|例子；案例|For instance, Toyota uses kanban.|例如豐田使用看板。
interact|v.|互動；交互作用|Temperature and pressure interact significantly.|溫度與壓力有顯著交互作用。
justify|v.|證明…合理|The cost savings justify the investment.|節省的成本證明這項投資合理。
layer|n.|層|The network has three hidden layers.|此網路有三個隱藏層。
link|n./v.|連結|We link customer data to sales records.|我們把顧客資料和銷售紀錄連結起來。
locate|v.|定位；設置於|The warehouse is located near the highway.|倉庫位於高速公路附近。
maximize|v.|最大化|The objective is to maximize total profit.|目標是最大化總利潤。
minor|adj.|次要的；輕微的|Minor defects do not affect function.|輕微缺陷不影響功能。
negate|v.|抵銷；否定|High shipping costs negate the low price.|高運費抵銷了低價優勢。
outcome|n.|結果|The outcome depends on demand uncertainty.|結果取決於需求不確定性。
partner|n.|夥伴|Supply chain partners share forecasts.|供應鏈夥伴分享預測。
philosophy|n.|哲學；理念|Kaizen is a philosophy of continuous improvement.|改善是持續改進的理念。
physical|adj.|物理的；實體的|Physical inventory is counted monthly.|實體存貨每月盤點。
proportion|n.|比例|A large proportion of defects come from one machine.|大部分缺陷來自同一台機器。
publish|v.|出版；發表|The results were published in 2024.|結果於 2024 年發表。
react|v.|反應|Prices react quickly to supply shocks.|價格對供給衝擊反應迅速。
register|v./n.|登記；註冊|Visitors must register at the entrance.|訪客必須在入口登記。
rely|v.|依賴 (on)|Many firms rely on a single supplier.|許多企業依賴單一供應商。
remove|v.|移除|Removing the bottleneck raised throughput.|移除瓶頸提升了產出。
scheme|n.|方案；計畫|A new incentive scheme was introduced.|推出了新的激勵方案。
sequence|n./v.|順序；排序|Jobs are sequenced to minimize tardiness.|工件排序以最小化延遲。
sex|n.|性別|Responses did not differ by sex.|回答不因性別而異。
shift|n./v.|轉移；班別|There is a shift toward electric vehicles.|產業正轉向電動車。
specify|v.|明確指定|The contract specifies delivery dates.|合約明定交貨日期。
sufficient|adj.|足夠的|The condition is necessary but not sufficient.|此條件必要但不充分。
task|n.|任務|Each task is assigned to one worker.|每項任務分派給一名工人。
technical|adj.|技術的|Technical support is available 24/7.|提供全天候技術支援。
technique|n.|技術；方法|Sampling techniques reduce inspection cost.|抽樣技術降低檢驗成本。
technology|n.|科技|RFID technology improves inventory accuracy.|RFID 技術提升存貨準確度。
valid|adj.|有效的；成立的|The result is valid only for large samples.|此結果只在大樣本下成立。
volume|n.|量；體積|Production volume doubled last year.|去年產量翻倍。`,
4: `access|n./v.|取得；存取|Workers have access to real-time dashboards.|工人可以使用即時儀表板。
adequate|adj.|足夠的|Adequate training reduces errors.|足夠的訓練可減少錯誤。
annual|adj.|年度的|Annual demand is 12,000 units.|年需求量為 12,000 單位。
apparent|adj.|明顯的；表面上的|The apparent improvement was due to chance.|表面上的改善其實是偶然。
approximate|adj./v.|近似的；近似|We approximate the distribution with a normal curve.|我們用常態曲線近似此分配。
attitude|n.|態度|Employee attitudes toward automation vary.|員工對自動化的態度不一。
attribute|v./n.|歸因 (to)；屬性|The delay was attributed to a supplier strike.|延誤歸因於供應商罷工。
civil|adj.|公民的；民用的|Civil engineers design the factory structure.|土木工程師設計廠房結構。
code|n./v.|代碼；規範；編碼|Each defect type is assigned a code.|每種缺陷都有代碼。
commit|v.|承諾；犯（錯）|The firm committed to net-zero emissions by 2050.|公司承諾 2050 年達成淨零排放。
communicate|v.|溝通；傳達|Managers must communicate goals clearly.|管理者必須清楚傳達目標。
concentrate|v.|集中；專注|Production is concentrated in Asia.|生產集中在亞洲。
confer|v.|授予；商議|The degree is conferred upon completion.|完成學業後授予學位。
contrast|n./v.|對比|In contrast, the second method is slower.|相較之下，第二種方法較慢。
cycle|n.|週期；循環|Cycle time fell from 60 to 45 seconds.|週期時間從 60 秒降到 45 秒。
debate|n./v.|辯論；爭論|There is ongoing debate about offshoring.|關於海外生產仍有爭論。
despite|prep.|儘管|Despite high costs, the firm adopted robots.|儘管成本高，公司仍導入機器人。
dimension|n.|維度；面向|Quality has eight dimensions.|品質有八個面向。
domestic|adj.|國內的；家庭的|Domestic suppliers offer shorter lead times.|國內供應商的前置時間較短。
emerge|v.|出現；浮現|New patterns emerged from the data.|資料中浮現新的模式。
error|n.|錯誤；誤差|Forecast error is measured by MAPE.|預測誤差以 MAPE 衡量。
ethnic|adj.|種族的|The sample included diverse ethnic groups.|樣本包含多元族群。
goal|n.|目標|The goal is zero defects.|目標是零缺陷。
grant|n./v.|補助；授予|The project received a government grant.|該計畫獲得政府補助。
hence|adv.|因此|Demand is uncertain; hence, safety stock is needed.|需求不確定，因此需要安全存量。
hypothesis|n.|假說|The null hypothesis was rejected.|虛無假說被拒絕。
implement|v.|實施|The plant implemented 5S last year.|工廠去年導入 5S。
implicate|v.|牽涉；暗示|Poor maintenance was implicated in the failure.|保養不良被認為與故障有關。
impose|v.|強加；施加|The government imposed tariffs on steel.|政府對鋼鐵課徵關稅。
integrate|v.|整合|ERP integrates data across departments.|ERP 整合各部門資料。
internal|adj.|內部的|Internal audits are held quarterly.|內部稽核每季舉行。
investigate|v.|調查；探討|This study investigates the effect of noise on fatigue.|本研究探討噪音對疲勞的影響。
job|n.|工作；工件|Each job must be processed on two machines.|每個工件需在兩台機器上加工。
label|n./v.|標籤；標示|Products are labeled with expiry dates.|產品標示有效日期。
mechanism|n.|機制|A pricing mechanism coordinates the channel.|定價機制協調通路。
obvious|adj.|明顯的|The benefits are not immediately obvious.|好處並非立即明顯。
occupy|v.|佔據|Storage occupies 40% of floor space.|倉儲佔了 40% 的樓地板面積。
option|n.|選項；選擇權|Outsourcing is one option to cut costs.|外包是降低成本的選項之一。
output|n.|產出|Daily output reached 1,200 units.|日產量達 1,200 單位。
overall|adj./adv.|整體的|Overall equipment effectiveness rose to 85%.|整體設備效率提升到 85%。
parallel|adj./n.|平行的|Two machines operate in parallel.|兩台機器平行運作。
parameter|n.|參數|Model parameters were estimated from data.|模型參數由資料估計。
phase|n.|階段|In the second phase, we test the prototype.|第二階段測試原型。
predict|v.|預測|The model predicts demand with 90% accuracy.|模型預測需求的準確率達 90%。
principal|adj./n.|主要的；負責人|The principal cause of defects is vibration.|缺陷的主要原因是震動。
prior|adj.|先前的 (to)|Prior to testing, machines were calibrated.|測試前先校正機器。
professional|adj./n.|專業的；專業人士|Professional training is required for operators.|操作人員須接受專業訓練。
project|n./v.|專案；預測|Sales are projected to grow by 8%.|銷售預計成長 8%。
promote|v.|促進；推廣；升遷|Policies promote green manufacturing.|政策推動綠色製造。
regime|n.|體制；政權|A new regulatory regime took effect in 2025.|新的監管制度於 2025 年生效。
resolve|v.|解決|The team resolved the quality issue in a week.|團隊一週內解決了品質問題。
retain|v.|保留；留住|Firms struggle to retain skilled engineers.|企業難以留住技術工程師。
series|n.|系列；串聯|Machines are arranged in series.|機器以串聯方式排列。
statistic|n.|統計量|The test statistic exceeds the critical value.|檢定統計量超過臨界值。
status|n.|狀態；地位|Order status is updated in real time.|訂單狀態即時更新。
stress|n./v.|壓力；強調|The authors stress the need for more data.|作者強調需要更多資料。
subsequent|adj.|隨後的|Subsequent tests confirmed the result.|後續測試證實了結果。
sum|n./v.|總和|The sum of probabilities equals one.|機率總和等於一。
summary|n.|摘要|A summary of results is given in Table 3.|結果摘要列於表 3。
undertake|v.|從事；承擔|The firm undertook a major restructuring.|公司進行了大規模重組。`,
5: `academy|n.|學院|The academy offers courses in data science.|該學院開設資料科學課程。
adjust|v.|調整|Prices are adjusted for inflation.|價格依通膨調整。
alter|v.|改變|Small changes can alter the optimal solution.|小小的改變可能改變最佳解。
amend|v.|修正|The contract was amended to include penalties.|合約修訂加入罰則。
aware|adj.|意識到的|Managers are aware of the risks.|管理者意識到這些風險。
capacity|n.|產能；能力|The plant operates at full capacity.|工廠滿載運作。
challenge|n./v.|挑戰|Data quality remains a major challenge.|資料品質仍是一大挑戰。
clause|n.|條款；子句|A penalty clause covers late delivery.|罰則條款涵蓋延遲交貨。
compound|n./adj./v.|化合物；複合的；加劇|Delays compound along the supply chain.|延遲沿著供應鏈加劇。
conflict|n./v.|衝突|Goals of sales and production often conflict.|業務與生產的目標常有衝突。
consult|v.|諮詢；查閱|We consulted experts to set the weights.|我們諮詢專家來設定權重。
contact|n./v.|聯繫；接觸|Customers contact the call center by phone.|顧客打電話聯繫客服中心。
decline|n./v.|下降；婉拒|Sales declined by 5% in Q3.|第三季銷售下降 5%。
discrete|adj.|離散的|Discrete-event simulation models the system.|以離散事件模擬建構此系統。
draft|n./v.|草稿；起草|A draft of the report is due Friday.|報告草稿週五要交。
enable|v.|使能夠|IoT enables predictive maintenance.|物聯網使預測保養成為可能。
energy|n.|能源|Energy consumption fell by 12%.|能源消耗下降 12%。
enforce|v.|執行；強制|Safety rules are strictly enforced.|安全規定嚴格執行。
entity|n.|實體|Each entity in the model represents a customer.|模型中每個實體代表一位顧客。
equivalent|adj./n.|相等的；等價物|The two formulations are equivalent.|兩種數學式是等價的。
evolve|v.|演化；發展|Customer needs evolve over time.|顧客需求隨時間演變。
expand|v.|擴張|The firm expanded into Southeast Asia.|公司擴展到東南亞。
expose|v.|暴露|Workers are exposed to high noise levels.|工人暴露在高噪音環境中。
external|adj.|外部的|External factors such as tariffs affect costs.|關稅等外部因素影響成本。
facilitate|v.|促進|Visual management facilitates communication.|目視管理促進溝通。
fundamental|adj.|基本的；根本的|Variability is a fundamental problem in operations.|變異是營運中的根本問題。
generate|v.|產生|The algorithm generates feasible schedules.|演算法產生可行排程。
generation|n.|世代；產生|Next-generation chips require new equipment.|下一代晶片需要新設備。
image|n.|影像；形象|Image recognition detects surface defects.|影像辨識偵測表面缺陷。
liberal|adj.|自由的；寬鬆的|A liberal return policy raises sales.|寬鬆的退貨政策提高銷售。
license|n./v.|執照；授權|The software is licensed per user.|軟體按使用者授權。
logic|n.|邏輯|The control logic is implemented in a PLC.|控制邏輯實作於 PLC。
margin|n.|利潤；邊際|Profit margins are thin in retail.|零售業的利潤很薄。
medical|adj.|醫療的|Medical devices require strict quality control.|醫療器材需要嚴格品管。
mental|adj.|心理的；精神的|Mental workload affects operator performance.|心智負荷影響操作員表現。
modify|v.|修改|We modify the algorithm to handle setup times.|我們修改演算法以處理換線時間。
monitor|v./n.|監控|Sensors monitor machine temperature.|感測器監控機台溫度。
network|n.|網路|The distribution network has five hubs.|配送網路有五個樞紐。
notion|n.|概念|The notion of value is central to lean.|價值的概念是精實的核心。
objective|n./adj.|目標；客觀的|The objective is to minimize makespan.|目標是最小化總完工時間。
orient|v.|使朝向；定位|The firm is oriented toward customer service.|公司以顧客服務為導向。
perspective|n.|觀點|From a cost perspective, outsourcing is better.|從成本觀點來看，外包較好。
precise|adj.|精確的|Precise measurements are essential.|精確量測非常重要。
prime|adj.|主要的；首要的|Safety is the prime concern.|安全是首要考量。
psychology|n.|心理學|Queue psychology affects customer satisfaction.|排隊心理影響顧客滿意度。
pursue|v.|追求；從事|Firms pursue both cost and quality.|企業同時追求成本與品質。
ratio|n.|比率|The inventory turnover ratio improved.|存貨週轉率改善了。
reject|v.|拒絕；剔除|Defective lots are rejected.|不良批會被拒收。
revenue|n.|營收|Revenue grew by 20% last year.|去年營收成長 20%。
stable|adj.|穩定的|The process is stable and in control.|製程穩定且在管制內。
style|n.|風格|Leadership style influences team performance.|領導風格影響團隊績效。
substitute|n./v.|替代品；替代|Plastic can substitute for metal parts.|塑膠可替代金屬零件。
sustain|v.|維持；承受|It is hard to sustain improvements.|改善成果很難持續。
symbol|n.|符號|Each symbol in the chart represents an activity.|圖中每個符號代表一項活動。
target|n./v.|目標；鎖定|The target defect rate is below 0.1%.|目標不良率低於 0.1%。
transit|n.|運輸；轉運|Goods in transit are insured.|運輸途中的貨物有保險。
trend|n.|趨勢|There is a trend toward mass customization.|大量客製化是一個趨勢。
version|n.|版本|The latest version fixes several bugs.|最新版本修正了數個錯誤。
welfare|n.|福利|Employee welfare improves retention.|員工福利提升留任率。
whereas|conj.|然而；反之|Method A is fast, whereas method B is accurate.|方法 A 快，而方法 B 準。`,
6: `abstract|adj./n.|抽象的；摘要|The abstract summarizes the main findings.|摘要總結主要發現。
accurate|adj.|準確的|Accurate forecasts reduce safety stock.|準確的預測可降低安全存量。
acknowledge|v.|承認；致謝|The authors acknowledge several limitations.|作者承認幾項研究限制。
aggregate|adj./v./n.|總計的；彙總|Aggregate planning sets monthly output levels.|總體規劃設定每月產出水準。
allocate|v.|分配|Resources are allocated to the most urgent jobs.|資源分配給最緊急的工作。
assign|v.|指派|Each operator is assigned to one machine.|每位操作員被指派一台機器。
attach|v.|附加；連接|A sensor is attached to each motor.|每個馬達都裝有感測器。
author|n./v.|作者|The authors propose a new heuristic.|作者提出新的啟發式演算法。
bond|n.|債券；連結|The firm issued bonds to finance expansion.|公司發行債券以支應擴張。
brief|adj.|簡短的|A brief overview is given in Section 2.|第二節提供簡短概述。
capable|adj.|有能力的|The process is capable of meeting specifications.|此製程有能力符合規格。
cite|v.|引用|This paper is widely cited.|這篇論文被廣泛引用。
cooperate|v.|合作|Competitors may cooperate on logistics.|競爭者可能在物流上合作。
discriminate|v.|區別；歧視|The test discriminates between good and bad parts.|此檢驗能區分良品與不良品。
display|n./v.|顯示|Results are displayed on a dashboard.|結果顯示在儀表板上。
diverse|adj.|多元的|The team has diverse backgrounds.|團隊成員背景多元。
domain|n.|領域|Domain knowledge improves model accuracy.|領域知識提升模型準確度。
edit|v.|編輯|The data were edited to remove errors.|資料經過編修以去除錯誤。
enhance|v.|提升|Automation enhances consistency.|自動化提升一致性。
estate|n.|地產|Real estate costs drive warehouse location.|房地產成本影響倉庫選址。
exceed|v.|超過|Demand exceeded capacity in December.|十二月需求超過產能。
expert|n./adj.|專家|Experts rated each criterion.|專家為每項準則評分。
explicit|adj.|明確的|Explicit rules reduce ambiguity.|明確的規則降低模糊性。
federal|adj.|聯邦的|Federal regulations apply to all plants.|聯邦法規適用所有工廠。
fee|n.|費用|A fee is charged for late payment.|逾期付款需收取費用。
flexible|adj.|有彈性的|Flexible manufacturing handles many product types.|彈性製造可處理多種產品。
furthermore|adv.|此外|Furthermore, the method scales well.|此外，此方法擴展性佳。
gender|n.|性別|Gender differences were not significant.|性別差異不顯著。
ignorance|n.|無知|Ignorance of the rules is no excuse.|不知道規則不是藉口。
incentive|n.|誘因|Incentives align supplier behavior with buyer goals.|誘因讓供應商行為與買方目標一致。
incidence|n.|發生率|The incidence of injuries dropped by half.|受傷發生率減半。
incorporate|v.|納入|The model incorporates uncertain lead times.|模型納入不確定的前置時間。
index|n.|指數；索引|The price index rose by 3%.|物價指數上漲 3%。
inhibit|v.|抑制|High costs inhibit technology adoption.|高成本抑制技術採用。
initiate|v.|啟動；發起|The firm initiated a Six Sigma program.|公司啟動六標準差計畫。
input|n.|投入；輸入|Raw materials are the main input.|原物料是主要投入。
instruct|v.|指示；教導|Operators are instructed to stop the line if defects occur.|操作員被指示發現缺陷就停線。
intelligence|n.|智慧；情報|Artificial intelligence supports decision-making.|人工智慧支援決策。
interval|n.|區間；間隔|A 95% confidence interval was constructed.|建立了 95% 信賴區間。
lecture|n.|講課|The lecture covered linear programming.|課程內容涵蓋線性規劃。
migrate|v.|遷移|Firms migrate data to the cloud.|企業將資料遷移至雲端。
minimum|n./adj.|最小值|The minimum order quantity is 100 units.|最小訂購量為 100 單位。
ministry|n.|（政府）部|The Ministry of Economic Affairs funds the program.|經濟部資助此計畫。
motive|n.|動機|Cost reduction is the main motive for offshoring.|降低成本是外移的主要動機。
neutral|adj.|中立的|Carbon-neutral production is the goal.|目標是碳中和生產。
nevertheless|adv.|儘管如此|The model is simple; nevertheless, it works well.|模型雖簡單，但效果很好。
overseas|adj./adv.|海外的|Overseas plants face different regulations.|海外工廠面臨不同法規。
precede|v.|在…之前|Design precedes production.|設計先於生產。
presume|v.|假定|The model presumes rational decision-makers.|模型假定決策者是理性的。
rational|adj.|理性的|Rational buyers compare total cost.|理性的買方會比較總成本。
recover|v.|恢復；回收|The system recovered quickly after the disruption.|系統在中斷後迅速恢復。
reveal|v.|揭示|The analysis reveals hidden bottlenecks.|分析揭露了隱藏的瓶頸。
scope|n.|範圍|This issue is beyond the scope of this study.|此議題超出本研究範圍。
subsidy|n.|補貼|Subsidies encourage solar panel adoption.|補貼鼓勵採用太陽能板。
tape|n.|膠帶；錄音帶|Tape is used to mark walkways.|用膠帶標示走道。
trace|v./n.|追蹤；痕跡|Each part can be traced to its batch.|每個零件都能追溯到批號。
transform|v.|轉變|Digital tools transform traditional factories.|數位工具轉變傳統工廠。
transport|n./v.|運輸|Transport accounts for half of logistics cost.|運輸佔物流成本一半。
underlie|v.|構成…的基礎|Several assumptions underlie the model.|此模型建立在幾個假設之上。
utilize|v.|利用|Machines are utilized at 80% on average.|機器平均利用率為 80%。`,
7: `adapt|v.|適應；改編|Firms must adapt to changing demand.|企業必須適應變動的需求。
adult|n./adj.|成人|The study sampled 200 adults.|研究抽樣 200 名成人。
advocate|v./n.|提倡；擁護者|Many scholars advocate lean practices.|許多學者提倡精實做法。
aid|n./v.|協助；援助|Visual aids help new workers learn faster.|視覺輔助幫助新進員工學得更快。
channel|n.|通路；管道|Online channels now dominate sales.|線上通路現在主導銷售。
chemical|adj./n.|化學的；化學品|Chemical waste must be treated.|化學廢棄物必須處理。
classic|adj.|經典的|The newsvendor model is a classic problem.|報童模型是經典問題。
comprehensive|adj.|全面的|A comprehensive review of the literature is given.|提供完整的文獻回顧。
comprise|v.|包含；由…組成|The sample comprises 120 firms.|樣本由 120 家公司組成。
confirm|v.|確認；證實|The results confirm our hypothesis.|結果證實我們的假說。
contrary|adj./n.|相反的|Contrary to expectations, costs increased.|與預期相反，成本上升了。
convert|v.|轉換|Raw materials are converted into finished goods.|原料被轉換成成品。
couple|n./v.|一對；結合|Demand is coupled with price changes.|需求與價格變化連動。
decade|n.|十年|Over the past decade, automation has expanded.|過去十年自動化持續擴展。
definite|adj.|明確的；確定的|There is no definite answer yet.|目前還沒有確定答案。
deny|v.|否認；拒絕|The firm denied any safety violations.|公司否認有違反安全規定。
differentiate|v.|區分；差異化|Firms differentiate products through design.|企業透過設計做產品差異化。
dispose|v.|處置 (of)|Hazardous waste must be disposed of safely.|危險廢棄物必須安全處置。
dynamic|adj.|動態的|Dynamic pricing adjusts to demand.|動態定價隨需求調整。
eliminate|v.|消除|Lean aims to eliminate waste.|精實旨在消除浪費。
empirical|adj.|實證的|Empirical evidence supports the theory.|實證證據支持此理論。
equip|v.|配備|Each truck is equipped with GPS.|每輛卡車都配備 GPS。
extract|v.|萃取；提取|Features are extracted from sensor signals.|從感測訊號中提取特徵。
file|n./v.|檔案；提出|The firm filed a patent application.|公司提出專利申請。
finite|adj.|有限的|The queue has finite capacity.|等候線容量有限。
foundation|n.|基礎；基金會|Statistics is the foundation of quality control.|統計是品管的基礎。
globe|n.|全球|Products are shipped around the globe.|產品運往全球各地。
grade|n./v.|等級；分級|Steel is graded by strength.|鋼材依強度分級。
guarantee|n./v.|保證|The supplier guarantees on-time delivery.|供應商保證準時交貨。
hierarchy|n.|層級|AHP structures criteria in a hierarchy.|AHP 把準則架構成層級。
identical|adj.|相同的|The machines are identical in speed.|這些機器速度相同。
ideology|n.|意識形態|Political ideology influences trade policy.|政治意識形態影響貿易政策。
infer|v.|推論|We infer demand from sales data.|我們從銷售資料推論需求。
innovate|v.|創新|Firms that innovate grow faster.|創新的企業成長較快。
insert|v.|插入|A buffer is inserted between stations.|在工作站之間加入緩衝區。
intervene|v.|介入|Managers intervene when delays occur.|發生延誤時主管會介入。
isolate|v.|隔離；分離出|We isolate the effect of price on demand.|我們分離出價格對需求的影響。
media|n.|媒體|Social media shapes brand image.|社群媒體塑造品牌形象。
mode|n.|模式；方式|Air is the fastest transport mode.|空運是最快的運輸方式。
paradigm|n.|典範|Industry 4.0 is a new manufacturing paradigm.|工業 4.0 是新的製造典範。
phenomenon|n.|現象|The bullwhip effect is a well-known phenomenon.|長鞭效應是著名的現象。
priority|n.|優先順序|Urgent orders receive priority.|急單享有優先權。
prohibit|v.|禁止|Smoking is prohibited in the plant.|廠內禁止吸菸。
publication|n.|出版品；發表|The publication of results took two years.|結果發表花了兩年。
quote|v./n.|引用；報價|The supplier quoted a lower price.|供應商報了較低的價格。
release|v./n.|釋出；發布|Orders are released to the floor daily.|工單每天釋出到現場。
reverse|v./adj.|反轉；逆向的|Reverse logistics handles product returns.|逆物流處理產品退貨。
simulate|v.|模擬|We simulate the system for 1,000 days.|我們模擬系統 1,000 天。
sole|adj.|唯一的|The firm is the sole supplier of this part.|該公司是這個零件的唯一供應商。
somewhat|adv.|有點|The results are somewhat surprising.|結果有點令人意外。
submit|v.|提交|Proposals must be submitted by May.|提案須於五月前提交。
successor|n.|繼任者；後繼|Each activity has one or more successors.|每項活動有一個以上的後續活動。
survive|v.|存活|Only flexible firms survived the crisis.|只有具彈性的企業撐過危機。
thesis|n.|論文；論點|My master's thesis studies warehouse picking.|我的碩士論文研究倉庫揀貨。
topic|n.|主題|Sustainability is a hot topic.|永續是熱門主題。
transmit|v.|傳輸|Sensors transmit data every second.|感測器每秒傳輸資料。
ultimate|adj.|最終的|The ultimate goal is customer satisfaction.|最終目標是顧客滿意。
unique|adj.|獨特的|Each order has a unique ID.|每張訂單有唯一編號。
visible|adj.|可見的|Problems become visible with andon lights.|透過安燈，問題變得可見。
voluntary|adj.|自願的|Participation in the survey was voluntary.|參與問卷是自願的。`,
8: `abandon|v.|放棄|The project was abandoned due to cost overruns.|專案因成本超支而放棄。
accompany|v.|伴隨|Growth was accompanied by rising costs.|成長伴隨成本上升。
accumulate|v.|累積|Inventory accumulates before the bottleneck.|存貨在瓶頸前累積。
ambiguous|adj.|模稜兩可的|Ambiguous instructions cause errors.|模稜兩可的指示導致錯誤。
append|v.|附加|The questionnaire is appended to the report.|問卷附於報告之後。
appreciate|v.|重視；感激；升值|The currency appreciated against the dollar.|該貨幣對美元升值。
arbitrary|adj.|任意的；武斷的|The weights were not chosen arbitrarily.|權重並非任意選定。
automate|v.|自動化|Repetitive tasks were automated.|重複性工作已自動化。
bias|n./v.|偏誤|Sampling bias affects the results.|抽樣偏誤影響結果。
chart|n./v.|圖表|A control chart tracks the process mean.|管制圖追蹤製程平均。
clarify|v.|釐清|The manager clarified the new procedure.|主管釐清了新程序。
commodity|n.|商品；大宗物資|Commodity prices are highly volatile.|大宗物資價格波動劇烈。
complement|v./n.|互補|Robots complement human workers.|機器人與人力互補。
conform|v.|符合 (to)|Products must conform to specifications.|產品必須符合規格。
contemporary|adj.|當代的|Contemporary supply chains are global.|當代供應鏈是全球化的。
contradict|v.|矛盾；反駁|The new data contradict earlier findings.|新資料與先前發現矛盾。
crucial|adj.|關鍵的|Timing is crucial in project management.|時機在專案管理中至關重要。
currency|n.|貨幣|Currency risk affects import costs.|匯率風險影響進口成本。
denote|v.|表示|Let x denote the order quantity.|令 x 表示訂購量。
detect|v.|偵測|Sensors detect abnormal vibration.|感測器偵測異常震動。
deviate|v.|偏離|The process deviated from the target.|製程偏離目標值。
displace|v.|取代；使移位|Automation may displace low-skill jobs.|自動化可能取代低技術工作。
drama|n.|戲劇|The drama of the crisis attracted media attention.|危機的戲劇性吸引媒體關注。
eventual|adj.|最終的|Delays led to the eventual cancellation of the order.|延誤最終導致訂單取消。
exhibit|v./n.|展現；展品|Demand exhibits strong seasonality.|需求呈現強烈季節性。
exploit|v.|利用；剝削|Firms exploit data to personalize offers.|企業利用資料提供個人化方案。
fluctuate|v.|波動|Demand fluctuates from week to week.|需求每週波動。
guideline|n.|指引|Guidelines for safe lifting were issued.|發布了安全搬運指引。
highlight|v./n.|強調；重點|The study highlights the role of trust.|研究強調信任的角色。
implicit|adj.|隱含的|There is an implicit assumption of linearity.|其中隱含線性假設。
induce|v.|引起；誘使|Discounts induce customers to buy more.|折扣誘使顧客購買更多。
inevitable|adj.|不可避免的|Some variation is inevitable.|某些變異是不可避免的。
infrastructure|n.|基礎建設|Poor infrastructure raises logistics costs.|基礎建設不佳提高物流成本。
inspect|v.|檢驗|Every tenth unit is inspected.|每十個抽驗一個。
intense|adj.|激烈的；強烈的|Competition in the market is intense.|市場競爭激烈。
manipulate|v.|操縱；操作|Variables were manipulated in the experiment.|實驗中操弄了變數。
minimize|v.|最小化|We minimize total tardiness.|我們最小化總延遲。
nuclear|adj.|核能的|Nuclear power provides stable electricity.|核能提供穩定電力。
offset|v.|抵銷|Higher prices offset rising costs.|較高的價格抵銷了上升的成本。
paragraph|n.|段落|The second paragraph states the main argument.|第二段陳述主要論點。
plus|prep./n.|加上；優點|Speed is a plus for this method.|速度是這個方法的優點。
practitioner|n.|實務工作者|The findings are useful to practitioners.|研究發現對實務界有用。
predominant|adj.|主要的；佔優勢的|Trucks are the predominant transport mode.|卡車是主要的運輸方式。
prospect|n.|前景|The prospects for EV demand are strong.|電動車需求前景看好。
radical|adj.|根本的；激進的|Radical innovation creates new markets.|突破性創新創造新市場。
random|adj.|隨機的|Customers arrive at random.|顧客隨機抵達。
reinforce|v.|強化|Training reinforces safe behavior.|訓練強化安全行為。
restore|v.|恢復|Service was restored within two hours.|服務在兩小時內恢復。
revise|v.|修訂|Forecasts are revised monthly.|預測每月修訂。
schedule|n./v.|排程|The schedule minimizes idle time.|此排程使閒置時間最小。
tension|n.|緊張；張力|There is tension between cost and quality.|成本與品質之間存在張力。
terminate|v.|終止|The algorithm terminates after 100 iterations.|演算法在 100 次迭代後終止。
theme|n.|主題|Three themes emerged from the interviews.|訪談中浮現三個主題。
thereby|adv.|藉此；因而|Firms share data, thereby reducing uncertainty.|企業分享資料，因而降低不確定性。
uniform|adj./n.|均勻的；制服|Service times follow a uniform distribution.|服務時間服從均勻分配。
vehicle|n.|車輛；工具|Each vehicle has a capacity of 10 tons.|每輛車容量 10 噸。
via|prep.|經由|Orders are placed via the online portal.|訂單透過線上平台下單。
virtual|adj.|虛擬的|A digital twin is a virtual model of the plant.|數位孿生是工廠的虛擬模型。
visual|adj.|視覺的|Visual inspection is prone to error.|目視檢查容易出錯。
widespread|adj.|普遍的|The use of robots is now widespread.|機器人的使用已相當普遍。`,
9: `accommodate|v.|容納；配合|The warehouse can accommodate 5,000 pallets.|倉庫可容納 5,000 個棧板。
analogy|n.|類比|The authors draw an analogy between traffic and queues.|作者把交通和排隊做類比。
anticipate|v.|預期|We anticipate higher demand in summer.|我們預期夏季需求較高。
assure|v.|保證；確保|Quality assurance prevents defects.|品質保證可預防缺陷。
attain|v.|達到|The plant attained ISO 9001 certification.|工廠取得 ISO 9001 認證。
behalf|n.|代表 (on behalf of)|The agent negotiates on behalf of the buyer.|代理人代表買方談判。
bulk|n.|大量；大部分|The bulk of costs comes from materials.|大部分成本來自材料。
cease|v.|停止|Production ceased during the strike.|罷工期間生產停止。
coherent|adj.|連貫的；一致的|The strategy must be coherent across units.|各單位的策略必須一致。
coincide|v.|同時發生；一致|Peak demand coincides with holidays.|需求高峰與假期同時發生。
commence|v.|開始|Construction will commence next year.|工程將於明年開工。
compatible|adj.|相容的|The new software is compatible with ERP.|新軟體與 ERP 相容。
concurrent|adj.|同時的|Concurrent engineering shortens development time.|同步工程縮短開發時間。
confine|v.|限制|The analysis is confined to one plant.|分析僅限於一座工廠。
controversy|n.|爭議|Offshoring remains a source of controversy.|海外外移仍有爭議。
converse|n./v.|相反；交談|The converse of the theorem is not true.|此定理的逆命題不成立。
device|n.|裝置|Wearable devices track worker movement.|穿戴式裝置追蹤工人動作。
devote|v.|致力；奉獻|Much effort was devoted to data cleaning.|大量心力投入資料清理。
diminish|v.|減少|Returns diminish as investment grows.|隨投資增加報酬遞減。
distort|v.|扭曲|Order batching distorts demand information.|批量訂購扭曲需求資訊。
duration|n.|持續時間|Activity durations are uncertain.|活動工期不確定。
erode|v.|侵蝕|Price wars erode profit margins.|價格戰侵蝕利潤。
ethic|n.|倫理|Data ethics is a growing concern.|資料倫理日益受到關注。
format|n.|格式|Data are stored in CSV format.|資料以 CSV 格式儲存。
found|v.|創立|The company was founded in 1987.|公司成立於 1987 年。
inherent|adj.|固有的|Risk is inherent in global sourcing.|全球採購本身就有風險。
insight|n.|洞見|The model provides managerial insights.|模型提供管理意涵。
integral|adj.|不可或缺的|Quality is integral to brand value.|品質是品牌價值不可或缺的一環。
intermediate|adj.|中間的|Intermediate products are stored in buffers.|半成品存放在緩衝區。
manual|adj./n.|手動的；手冊|Manual picking is slow and error-prone.|人工揀貨既慢又易出錯。
mature|adj./v.|成熟的|The smartphone market has matured.|智慧手機市場已成熟。
mediate|v.|中介；調解|Trust mediates the effect of communication on performance.|信任中介了溝通對績效的影響。
medium|n./adj.|媒介；中等的|Medium-sized firms face unique challenges.|中型企業面臨獨特挑戰。
military|adj.|軍事的|Military logistics inspired many OR methods.|軍事後勤啟發了許多作業研究方法。
minimal|adj.|極小的|The change had minimal impact on cost.|此改變對成本影響極小。
mutual|adj.|相互的|Partnerships rest on mutual trust.|夥伴關係建立在互信之上。
norm|n.|規範；常態|Remote work has become the norm.|遠距工作已成常態。
overlap|v./n.|重疊|The two phases overlap by two weeks.|兩個階段重疊兩週。
passive|adj.|被動的|Passive RFID tags have no battery.|被動式 RFID 標籤沒有電池。
portion|n.|部分|A portion of profits is reinvested.|部分利潤用於再投資。
preliminary|adj.|初步的|Preliminary results look promising.|初步結果看起來很有希望。
protocol|n.|協定；程序|A safety protocol was followed.|遵循了安全程序。
qualitative|adj.|質性的|Qualitative data were collected through interviews.|透過訪談蒐集質性資料。
refine|v.|精煉；改進|The model was refined after testing.|模型在測試後加以改進。
relax|v.|放寬；放鬆|We relax the integer constraints.|我們放寬整數限制。
restrain|v.|抑制|Tight budgets restrain investment.|緊縮預算抑制投資。
revolution|n.|革命|The industrial revolution changed production.|工業革命改變了生產方式。
rigid|adj.|僵化的|Rigid rules reduce flexibility.|僵化的規則降低彈性。
route|n./v.|路線；安排路線|Vehicles are routed to minimize distance.|規劃車輛路線以最小化距離。
scenario|n.|情境|We test three demand scenarios.|我們測試三種需求情境。
sphere|n.|領域；球體|AI affects every sphere of business.|人工智慧影響商業各個領域。
subordinate|n./adj.|部屬；次要的|Managers delegate tasks to subordinates.|主管把任務授權給部屬。
supplement|v./n.|補充|Survey data were supplemented by interviews.|問卷資料以訪談補充。
suspend|v.|暫停|Production was suspended for maintenance.|生產因保養暫停。
team|n.|團隊|Cross-functional teams solve problems faster.|跨功能團隊解決問題更快。
temporary|adj.|暫時的|Temporary workers fill seasonal demand.|臨時工滿足季節性需求。
trigger|v./n.|觸發|Low inventory triggers a reorder.|低存量觸發補貨。
unify|v.|統一|A single platform unifies all data.|單一平台統整所有資料。
violate|v.|違反|The schedule violates the capacity constraint.|此排程違反產能限制。
vision|n.|願景；視覺|Machine vision inspects every product.|機器視覺檢查每一件產品。`,
10: `adjacent|adj.|相鄰的|Adjacent departments should exchange materials.|相鄰部門應互相交換物料。
albeit|conj.|雖然|The method works, albeit slowly.|此方法有效，雖然速度慢。
assemble|v.|組裝；聚集|Cars are assembled on a moving line.|汽車在移動產線上組裝。
collapse|v./n.|崩潰|Demand collapsed during the pandemic.|疫情期間需求崩跌。
colleague|n.|同事|I thank my colleagues for their feedback.|感謝同事們的回饋。
compile|v.|彙編|Data were compiled from company reports.|資料彙整自公司報告。
conceive|v.|構想|The idea was conceived by a young engineer.|這個點子由一位年輕工程師構想出來。
convince|v.|說服|The data convinced managers to invest.|資料說服管理者投資。
depress|v.|壓低；使沮喪|High interest rates depress investment.|高利率壓抑投資。
encounter|v./n.|遭遇|The project encountered unexpected delays.|專案遭遇意外延誤。
enormous|adj.|巨大的|Data centers consume enormous amounts of energy.|資料中心消耗巨量能源。
forthcoming|adj.|即將到來的|Details will appear in a forthcoming paper.|細節將在即將發表的論文中說明。
incline|v.|傾向|Managers are inclined to avoid risk.|管理者傾向規避風險。
integrity|n.|完整性；誠信|Data integrity is checked daily.|每天檢查資料完整性。
intrinsic|adj.|內在的|Intrinsic motivation drives creativity.|內在動機驅動創造力。
invoke|v.|援引；調用|The firm invoked the force majeure clause.|公司援引不可抗力條款。
levy|v./n.|徵收（稅）|A tax is levied on imported goods.|對進口貨物課稅。
likewise|adv.|同樣地|Likewise, service firms benefit from lean.|同樣地，服務業也能受益於精實。
nonetheless|adv.|儘管如此|The sample is small; nonetheless, the trend is clear.|樣本雖小，趨勢仍然明確。
notwithstanding|prep.|儘管|Notwithstanding these limits, the study is valuable.|儘管有這些限制，此研究仍有價值。
odd|adj.|奇怪的；奇數的|Odd results were checked for errors.|異常結果都檢查過是否有誤。
ongoing|adj.|進行中的|Ongoing research addresses this gap.|進行中的研究正處理這個缺口。
panel|n.|小組；面板|A panel of experts reviewed the design.|專家小組審查了設計。
persist|v.|持續|Quality problems persisted for months.|品質問題持續了數月。
pose|v.|造成；提出|Cyberattacks pose a serious threat.|網路攻擊構成嚴重威脅。
reluctance|n.|不情願|There is reluctance to share data.|大家不太願意分享資料。
so-called|adj.|所謂的|The so-called bullwhip effect amplifies demand.|所謂的長鞭效應會放大需求。
straightforward|adj.|直接的；簡單的|The calculation is straightforward.|這個計算很簡單。
undergo|v.|經歷|The plant underwent major renovation.|工廠經歷了大規模翻修。
whereby|adv.|藉此；憑此|A system whereby workers can stop the line.|一個讓工人可以停線的制度。`,
};

export const AWL = Object.entries(RAW).flatMap(([sub, block]) =>
  block.trim().split("\n").map(line => {
    const [w, pos, zh, ex, exZh] = line.split("|");
    return { w, pos, zh, ex, exZh, tag: "AWL", sub: +sub };
  })
);
