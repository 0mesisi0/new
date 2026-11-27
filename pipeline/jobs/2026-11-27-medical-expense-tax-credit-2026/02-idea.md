# Idea and spec: 의료비 세액공제 계산기 2026 / Medical Expense Tax Credit Calculator 2026

## Concepts scored

Each concept is scored 1–5 on four things: value in the first 10 seconds, originality, Korean search/share demand, and whether it fits in one HTML file. The maximum is 20.

| Concept | Category | Score | Verdict |
|---|---|---|---|
| 곶감 말장난 뽑기: "곧 감 → 곶감" 같은 말장난 카드를 뽑는다 / Pun Card Draw | random | 4/3/2/5 = 14 | Rejected. The research rates the trend as low confidence with no year attached, and the queued `persimmon-breeze` spec may already cover persimmons. |
| 털 뿜는 고양이 빗질: 빗질할수록 털뭉치가 쌓이고 가끔 고양이가 휙 돌아본다 / Shedding Cat Brush | weird | 5/3/3/4 = 15 | Kept for later. The source trend is from April–May, outside this research window, and we would need to keep clear of the look of the viral original. |
| **의료비 세액공제 계산기 2026 / Medical Expense Tax Credit Calculator 2026** | **tools** | **4/4/5/5 = 18** | **Picked.** People search for this every December before the 12월 31일 spending cutoff and again in the January settlement. It is a different subject from the existing pension calculator and the queued card-deduction and monthly-rent specs. The "총급여 3% 문턱" threshold is the part people most often get wrong, so a calculator that explains it is useful in the first 10 seconds. |

## Meta

- slug `medical-expense-tax-credit-2026`, category `tools`, kind `tool`, aspect `3/4`, date `2026-11-27`
- tags: ko `연말정산`, `의료비 세액공제`; en `year-end tax`, `medical expenses`
- title: ko `의료비 세액공제 계산기 2026`; en `Medical Expense Tax Credit Calculator 2026`
- desc ko: 총급여와 올해 병원비를 넣으면 3% 문턱을 넘었는지, 연말정산에서 얼마 돌려받는지 바로 계산해요. 난임·미숙아 공제율과 가족 700만 원 한도까지 반영합니다.
- desc en: Enter your gross pay and this year's medical bills to see whether you passed the 3% threshold and roughly how much credit you get back in Korea's year-end tax settlement.
- howto ko: 총급여(연봉에서 비과세 수당을 뺀 금액)와 의료비를 그룹별로 넣으세요. 결과는 바로 바뀌어요. '문턱까지 남은 금액' 막대로 3%를 넘었는지 확인하고, '결과 복사'로 메모해 두세요.
- howto en: Enter your gross pay (salary minus tax-free allowances) and your medical spending by group. The result updates as you type. The threshold bar shows whether you passed 3%, and "Copy result" saves a note.
- about ko: 2026년 귀속(2027년 1~2월 연말정산) 근로소득자 기준의 예상치예요. 실제 공제액은 홈택스 간소화 자료와 회사 정산 결과를 따르세요. 입력한 값은 이 기기 밖으로 나가지 않아요.
- about en: An estimate for salaried workers for tax year 2026, which is settled in Jan–Feb 2027. Your employer's settlement and the official records decide the real amount. Nothing you type leaves this device.

## Pitch

A clean single-column calculator. The first input is 총급여, and the moment it has a value a threshold bar appears: "3% 문턱 1,200,000원 중 850,000원 썼어요". As the user fills in the four spending groups, a large result number counts up to the expected refund, local income tax included. A breakdown table then shows how the threshold was subtracted and which rate applied to each group. The core insight is that the 3% threshold comes off "other family" spending first. Users rarely know this, and the breakdown shows it in one glance.

## Rules (constants at the top of the script, one `RULES` object)

The builder must check every value below against the 국세청 2026년 귀속 연말정산 guidance before publishing. They match the law as of mid-2026, but the research did not verify them.

| key | value | meaning |
|---|---|---|
| `thresholdRate` | 0.03 | The threshold is 총급여 × 3%, rounded down to the won. |
| `generalCap` | 7,000,000 | Annual cap on the eligible amount for the "other family" group. |
| `rateGeneral` | 0.15 | Rate for the other-family group. |
| `rateSpecific` | 0.15 | Rate for 본인, 65세 이상, 장애인, 6세 이하, and 중증·희귀·난치·결핵 patients. This group has no cap. |
| `ratePremature` | 0.20 | Rate for 미숙아 and 선천성이상아. |
| `rateInfertility` | 0.30 | Rate for 난임시술비. |
| `localRate` | 0.10 | 지방소득세 is 10% of the income tax credit. |
| `postnatalCapPerBirth` | 2,000,000 | Hint only: 산후조리원 is capped at this amount per birth. |
| `glassesCapPerPerson` | 500,000 | Hint only: glasses and contact lenses are capped at this amount per person per year. |

### Calculation (pure function `calc(input)`, all integers in won)

```
T = floor(gross * 0.03)
G = general, S = specific, P = premature, I = infertility   (each >= 0)

gEx = G - T
if gEx >= 0: gBase = min(gEx, 7_000_000); rem = 0
else:        gBase = 0;                   rem = -gEx
sBase = max(0, S - rem); rem = max(0, rem - S)
pBase = max(0, P - rem); rem = max(0, rem - P)
iBase = max(0, I - rem); rem = max(0, rem - I)

credit = floor(gBase*0.15) + floor(sBase*0.15) + floor(pBase*0.20) + floor(iBase*0.30)
if taxCap given: credit = min(credit, taxCap)
local  = floor(credit * 0.10)
total  = credit + local
remainingToThreshold = max(0, T - (G + S + P + I))
generalOverCap = max(0, gEx - 7_000_000)   // shows a warning chip
```

The threshold is subtracted in this order: other family, then specific, then premature, then infertility. This order is the most favorable to the taxpayer and is the one the law uses.

### Self-check (runs when `location.hash === '#test'`, logs to console, never shown in the UI)

| gross | G | S | P | I | expected credit | expected total |
|---|---|---|---|---|---|---|
| 40,000,000 | 0 | 2,000,000 | 0 | 0 | 120,000 | 132,000 |
| 40,000,000 | 10,000,000 | 0 | 0 | 0 | 1,050,000 | 1,155,000 |
| 50,000,000 | 0 | 0 | 0 | 3,000,000 | 450,000 | 495,000 |
| 30,000,000 | 500,000 | 300,000 | 0 | 0 | 0 | 0 (remaining threshold 100,000) |
| 60,000,000 | 1,000,000 | 1,500,000 | 0 | 2,000,000 | 300,000 + … see below | |

Last row worked through:

- T = 1,800,000.
- gEx = −800,000, so gBase = 0 and rem = 800,000.
- sBase = 700,000 and rem drops to 0.
- iBase = 2,000,000.
- credit = 105,000 + 600,000 = 705,000, and total = 775,500.

Each row is checked with `console.assert`.

## Flow

The tool has one screen with three stacked sections. The page never scrolls. The content panel scrolls internally, and the result card is sticky at the bottom.

1. **INPUT panel** (scrolls internally)
   - **총급여** field. The helper line under it shows the value read in 만 원, for example "= 4,000만 원". A ⓘ link opens the info sheet for "총급여가 뭐예요?".
   - **Threshold bar**, which appears once gross > 0. It fills by (G+S+P+I) / T.
     - While under the threshold, it is gray-blue with the text "문턱까지 {n}원 남았어요".
     - Once over, it turns green with "문턱 통과! 넘은 금액부터 공제돼요" and pops once (scale 1 → 1.04 → 1, 200 ms).
   - **Four group cards**, each with a title, a one-line who's-included hint, and one amount field:
     1. 본인·65세 이상·장애인·6세 이하 (한도 없음, 15%)
     2. 그 밖의 가족 (연 700만 원 한도, 15%)
     3. 난임시술비 (30%)
     4. 미숙아·선천성이상아 (20%)
   - **"더 정확하게" disclosure**, collapsed by default. It holds the optional 결정세액 field, which caps the credit.
   - **Hint list**, collapsed by default: 실손보험금 받은 금액은 빼고 입력, 산후조리원 출산 1회 200만 원, 안경·렌즈 1인 50만 원, 미용·성형·건강기능식품 제외, 가족 의료비는 나이·소득 상관없이 넣을 수 있어요 (단 생계를 같이하는 가족).
2. **RESULT card** (sticky bottom)
   - The large line reads "예상 환급 약 {total}원". The number counts up to the new value over 300 ms whenever it changes.
   - The small line reads "소득세 {credit} + 지방소득세 {local}".
   - Buttons: [자세히] toggles the breakdown, [결과 복사], [초기화].
3. **BREAKDOWN** (expands above the result card inside the panel)
   - A table with columns 그룹 | 쓴 돈 | 문턱 차감 | 공제 대상 | 공제율 | 공제액.
   - Below the table, the line "문턱 {T}원은 '그 밖의 가족' 의료비에서 먼저 빠져요".
   - When generalOverCap > 0, a chip reads "가족 의료비 중 {n}원은 700만 원 한도를 넘어 공제되지 않아요".
   - When a tax cap reduced the credit, a chip reads "결정세액을 넘는 공제는 돌려받지 못해요".
4. **INFO sheet** (in-page overlay, closed with ✕ or Esc)
   - Short explanations of 총급여, the four groups, the threshold order, and the reminder "12월 31일까지 결제한 의료비가 2026년 귀속이에요".
   - It contains no advice to spend money.

## Controls

- **Pointer:** tap fields, cards, disclosures and buttons. Every tap target is at least 44 px.
- **Keyboard:**
  - Tab moves through the fields in order.
  - Enter in a field moves to the next field.
  - Esc closes the info sheet.
  - Ctrl/⌘+Enter copies the result.
- **Amount fields:**
  - Use `type="text" inputmode="numeric"`. Strip everything except digits on input, reformat with thousands commas, and keep the caret at the end.
  - Every amount field has a row of quick chips: +10만, +50만, +100만. The gross field's chips are +100만 and +1000만.
  - The cap is 9,999,999,999, which is 10 digits. Ignore extra digits.
- Panels use `touch-action: pan-y`. There is no canvas.

## Visual design

- **Palette:**
  - background #f3f6f8, card #ffffff, ink #1f2a37, muted #6b7785
  - accent teal #0f9d8a, warn amber #e8a317, threshold-under #8fa6c4, threshold-over #2bb673
- **Header:**
  - A 🩺 emoji with the title in 20 px bold and the subtitle "2026년 귀속 · 2027년 1~2월 연말정산".
  - ⓘ and 🌐 language buttons sit at the top right.
- **Group cards:**
  - Each card has a 4 px left stripe in its own color: specific teal, general slate, infertility violet #7a5cc7, premature coral #e86a5b.
  - The rate badge sits at the top right of the card.
- **Numbers** use `font-variant-numeric: tabular-nums` with the system-ui stack.
- **Result card:** dark ink background, white 28 px bold number and a teal pill buttons row.
- **Layout:** the column is capped at a max-width of 480 px and centered. At 320 px wide, use 14 px padding, wrap the chips onto two lines, and let the breakdown table become stacked rows instead of six columns.
- **prefers-reduced-motion:** no count-up and no pop.
- There is no sound.

## Strings

| key | ko | en |
|---|---|---|
| appTitle | 의료비 세액공제 계산기 2026 | Medical Expense Tax Credit 2026 |
| sub | 2026년 귀속 · 2027년 1~2월 연말정산 | Tax year 2026 · settled Jan–Feb 2027 |
| gross | 총급여 | Gross pay |
| grossHelp | 연봉에서 식대 같은 비과세 수당을 뺀 금액 | Salary minus tax-free allowances such as meal pay |
| manwon | = {n}만 원 | = ₩{n} |
| thrUnder | 3% 문턱 {T}원 중 {spent}원 · {n}원 남았어요 | 3% threshold ₩{T}: spent ₩{spent}, ₩{n} to go |
| thrOver | 문턱 통과! 넘은 금액부터 공제돼요 | Threshold passed! Only the amount above it counts |
| thrNeedGross | 총급여를 넣으면 문턱이 보여요 | Enter gross pay to see your threshold |
| gSpecific | 본인·65세 이상·장애인·6세 이하 | You, 65+, disabled, age 6 or under |
| gSpecificHint | 중증·희귀·결핵 환자 포함 · 한도 없음 · 15% | Incl. serious/rare illness, TB · no cap · 15% |
| gGeneral | 그 밖의 가족 | Other family members |
| gGeneralHint | 배우자·부모님·자녀 등 · 연 700만 원 한도 · 15% | Spouse, parents, children… · ₩7M cap · 15% |
| gInfertility | 난임시술비 | Fertility treatment |
| gInfertilityHint | 난임시술 비용과 관련 약제비 · 30% | Treatment and related medicine · 30% |
| gPremature | 미숙아·선천성이상아 | Premature or congenital-condition infant |
| gPrematureHint | 해당 아기의 의료비 · 20% | That infant's medical costs · 20% |
| more | 더 정확하게 | More accurate |
| taxCap | 결정세액 (선택) | Final tax due (optional) |
| taxCapHelp | 다른 공제를 다 뺀 뒤 남은 세금. 모르면 비워 두세요 | Tax left after other credits. Leave blank if unsure |
| hints | 입력 전 확인 | Before you enter |
| h1 | 실손보험금으로 돌려받은 금액은 빼고 넣으세요 | Subtract anything your insurer reimbursed |
| h2 | 산후조리원은 출산 1회당 200만 원까지 | Postnatal care centers: up to ₩2M per birth |
| h3 | 안경·콘택트렌즈는 1인당 연 50만 원까지 | Glasses/contacts: up to ₩500k per person |
| h4 | 미용·성형 수술, 건강기능식품은 제외 | Cosmetic surgery and supplements don't count |
| h5 | 함께 사는 가족 의료비는 나이·소득과 상관없이 넣을 수 있어요 | Family you support count regardless of age or income |
| resultBig | 예상 환급 약 {total}원 | Estimated back ≈ ₩{total} |
| resultSmall | 소득세 {credit} + 지방소득세 {local} | Income tax {credit} + local tax {local} |
| resultZero | 아직 문턱을 넘지 않았어요 | Not past the threshold yet |
| details / hide | 자세히 / 접기 | Details / Hide |
| copy / copied / copyFail | 결과 복사 / 복사했어요 / 복사하지 못했어요 | Copy result / Copied / Could not copy |
| reset / resetDone | 초기화 / 입력을 지웠어요 | Reset / Cleared |
| colGroup / colSpent / colThr / colBase / colRate / colCredit | 그룹 / 쓴 돈 / 문턱 차감 / 공제 대상 / 공제율 / 공제액 | Group / Spent / Threshold / Eligible / Rate / Credit |
| orderNote | 문턱 {T}원은 '그 밖의 가족' 의료비에서 먼저 빠져요 | The ₩{T} threshold comes off "other family" first |
| overCap | 가족 의료비 중 {n}원은 700만 원 한도를 넘어 공제되지 않아요 | ₩{n} of family spending is over the ₩7M cap |
| capped | 결정세액을 넘는 공제는 돌려받지 못해요 | Credit above your tax due can't be refunded |
| deadline | 12월 31일까지 결제한 의료비가 2026년 귀속이에요 | Payments made by Dec 31 count for 2026 |
| disclaimer | 예상치예요. 실제 금액은 회사 연말정산 결과를 따르세요 | Estimate only. Your employer's settlement decides |
| infoTitle | 의료비 세액공제, 이렇게 계산해요 | How the medical credit works |
| info1 | 총급여의 3%를 넘게 쓴 의료비만 공제돼요 | Only spending above 3% of gross pay counts |
| info2 | 문턱은 가족 → 본인 등 → 미숙아 → 난임 순서로 빠져요 | The threshold is taken from family → you etc. → infant → fertility |
| info3 | 공제율은 15%, 미숙아 20%, 난임 30%예요 | Rates are 15%, infants 20%, fertility 30% |
| info4 | 지방소득세 10%가 함께 돌아와요 | 10% local income tax comes back too |
| close | 닫기 | Close |

Copy text:

- ko: `🩺 의료비 세액공제 예상 (2026년 귀속)\n총급여 {gross}원 · 문턱 {T}원\n쓴 의료비 {spent}원\n예상 환급 약 {total}원 (소득세 {credit} + 지방소득세 {local})\n※ 예상치 · play.mesisi.net`
- en: the same lines in English.

## localStorage (in try/catch, prefix `metc:`)

- `metc:inputs` holds JSON {gross, S, G, I, P, taxCap} as integers. It is written on input with a 300 ms debounce and restored on load. 초기화 clears it.
- `metc:details` is "1" or "0" and records whether the breakdown was left open.

Nothing else is stored, and nothing ever leaves the device.

## Edge cases

- **No gross entered:** the threshold bar shows thrNeedGross and the result shows "—". There is no division by zero.
- **Spending exceeds gross:** this is allowed and calculated normally. No warning is shown, because that can genuinely happen with family bills.
- **Every amount is 0:** the result shows resultZero and the copy button is disabled.
- **Negative or decimal values:** digits-only input makes them impossible to enter.
- **Pasted values like "1,234,000원":** strip the non-digits.
- **taxCap = 0 while entered:** the credit is capped to 0 and the `capped` chip is shown. An empty taxCap field means no cap.
- **Large numbers:** everything is integer math under `Number.MAX_SAFE_INTEGER` at the 10-digit cap. Format with `toLocaleString('ko-KR')`, or `'en-US'` with a ₩ prefix.
- **Resize:** CSS-only layout. The breakdown switches to stacked rows below 400 px.
- **Count-up:** if the value changes mid-animation, restart the count-up from the current displayed value.
- **Blocked localStorage:** the calculator works the same, just without restoring inputs.
- **`#demo`:** prefill gross 42,000,000, S 1,800,000, G 900,000, I 0, P 0, open the breakdown and skip animations. This is for the QA thumbnail.
- **`#test`:** run the self-check table with `console.assert`.

## Must not

- No network of any kind, no external fonts and no images. Emoji and CSS only.
- Do not imitate 국세청, 홈택스 or any bank or tax-app look, logo or wording. No real brands.
- Do not encourage spending on medical care to reach the threshold. The threshold text states facts only.
- Do not ask for or store names, 주민번호, or any detail about a medical condition. The tool only asks for amounts.
- No claims of an exact refund. Every result line says "약" or "예상", and the disclaimer stays visible next to the result card.
- Do not add other deductions such as card, rent or pension. Those subjects are covered by separate items.
- No alert, confirm, prompt, window.open or navigation.
