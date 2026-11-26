# Idea and spec: 신용카드 소득공제 계산기 2026 / Card Spending Deduction Calculator 2026

## Concepts scored

Each concept is scored 1–5 on four things: value in the first 10 seconds, originality, Korean search/share demand, and buildability in one HTML file. The maximum is 20.

| Concept | Category | Score | Verdict |
|---|---|---|---|
| **Card spending deduction calculator: how much left to spend by 12/31, and on which card** | **tools** | **4/3/5/4 = 16** | **Picked.** People search "신용카드 소득공제 계산기" and "13월의 월급" heavily in late November and December, and 12/31 is a hard deadline. It is a different subject from `pension-tax-credit-2026`: card spending versus pension deposits. |
| Windowsill succulent you care for once a day (research direction #4: come back tomorrow) | weird | 3/4/2/5 = 14 | The once-a-day loop is good, but there is little search demand. Keep it for a slow week. |
| Stretching a chewy cookie as far as possible before it snaps (the Dubai cookie trend) | games | 4/3/3/4 = 14 | Research confidence is low and current interest is unconfirmed. Reconsider if the trend is confirmed again. |

## Meta

- slug `card-deduction-calculator-2026`, category `tools`, kind `tool`, aspect `3/4`, date `2026-11-26`
- tags: ko `연말정산`, `신용카드 소득공제`, `체크카드`, `13월의 월급`; en `year-end-tax`, `card-deduction`, `korea-tax`
- title: ko `신용카드 소득공제 계산기 2026`; en `Card Spending Deduction Calculator 2026`
- desc ko: 총급여와 올해 카드 사용액을 넣으면 25% 문턱까지 남은 금액, 지금 받을 소득공제, 남은 한도를 보여 줘요. 12월 31일까지 남은 지출을 신용카드로 할지 체크카드로 할지 바로 비교합니다.
- desc en: Enter your salary and this year's card spending to see how far you are from the 25% threshold, your deduction so far and your remaining limit. Then compare paying the rest of December by credit or by debit card.
- howto ko: 총급여를 만 원 단위로 넣고, 올해 지금까지 쓴 금액을 결제 수단별로 넣으세요. 카드사 앱의 '연말정산 예상 사용액'을 보면 쉬워요. 아래 슬라이더로 12월 31일까지 더 쓸 금액을 정하면 신용카드로 냈을 때와 체크카드로 냈을 때의 공제 차이가 바로 보여요.
- howto en: Enter your gross salary in units of 10,000 won, then this year's spending so far by payment type. Your card app's year-end estimate helps. Use the slider to set how much more you expect to spend by Dec 31 and compare paying it by credit card or by debit card.
- about ko: 2026년 지출분(2027년 1월 연말정산) 기준으로 계산한 참고용 추정치예요. 지출을 늘리라는 뜻이 아니라, 어차피 쓸 돈을 어떤 수단으로 낼지 비교하는 도구예요. 실제 공제액은 국세청 간소화 자료와 다른 공제에 따라 달라지니 홈택스에서 꼭 확인하세요. 입력한 금액은 이 기기 밖으로 나가지 않아요.
- about en: This estimate uses Korea's rules for 2026 spending, settled in January 2027. It does not tell you to spend more. It only compares how to pay for spending you would make anyway. Your real deduction depends on National Tax Service data and your other deductions, so check Hometax. Your numbers never leave this device.

## Pitch

A clean single-screen calculator with one big progress bar, the "spending track":

1. A **threshold marker** sits at 25% of salary. Spending below it counts for nothing.
2. Past the marker the bar fills toward the **limit flag**.
3. The user types salary and spending so far, and the bar and the result update live.
4. The key moment is the December slider. Two cards side by side show "신용카드로 내면 +₩A, 체크카드로 내면 +₩B" with the winner highlighted.
5. A countdown chip shows "12월 31일까지 D-35" (live from the clock).

The result can be copied as text. There is no image export: money numbers are private, and it keeps the tool small.

## Flow

The tool is a single screen with no screen changes. It is a vertical column that scrolls internally, while the page itself never scrolls.

1. **Header:** the title, a D-day chip ("올해 지출 마감 D-{n}"), and a "2026년 지출 기준" badge. The header stays visible.
2. **Salary card:**
   - 총급여 number input (만원), default empty, with the placeholder "예: 4500".
   - A hint below it: "연봉에서 비과세 수당(식대 등)을 뺀 금액이에요".
   - Once a valid salary is entered, the threshold line "문턱: ₩{T}" appears below.
3. **Spending card:** five number inputs in 만원 units:
   - 신용카드
   - 체크카드·현금영수증
   - 전통시장
   - 대중교통
   - 도서·공연·영화·체육시설 (culture). This field is shown only when salary ≤ 7,000. Otherwise it is replaced by the note "총급여 7천만 원 초과는 문화비 공제가 없어요. 결제한 카드 칸에 더해 주세요."
4. **Spending track (result):**
   - The bar has three zones: gray up to the threshold, green for deductible spending, and gold once the basic limit is reached.
   - Below the bar sit three big numbers: 문턱까지 남은 금액, 예상 소득공제, and 예상 절세액.
   - The 세율 select (default 16.5%) sits next to 예상 절세액.
   - One status sentence is chosen from the status table.
5. **December card:**
   - A slider "12월 31일까지 더 쓸 예정 금액" runs from 0 to 500 in steps of 10 만원, default 0.
   - Two result tiles: 신용카드로 내면 / 체크카드로 내면. Each shows the extra deduction and extra saving, and the better tile gets a "더 유리" ribbon.
   - If the slider is 0, the tiles show "슬라이더를 움직여 보세요".
6. **Footer bar:** [결과 복사] [입력 지우기] and the about line "참고용 추정치예요 · 홈택스에서 확인하세요".

Every input recalculates on `input`, debounced to one rAF. Numbers animate by counting up over 250 ms.

## Controls

- **Pointer:** tap fields and buttons, and drag the slider.
- **Number fields:** use `inputmode="numeric"`. Strip non-digits on input, allow commas when pasted, and show the formatted value ("4,500") on blur.
- **Keyboard:**
  - Tab moves through the fields in order. Enter in a field moves to the next one.
  - The slider uses arrows ±10 and PageUp/PageDown ±100.
  - Shortcuts work only when focus is not in a field: C copies and R opens the inline reset confirmation.
- **Tap targets:** at least 44 px. The column area uses `touch-action: pan-y`.

## Rules (constants: verify every number against NTS before the build)

These are the rules for 2026 spending. The builder must re-check each line against the National Tax Service (국세청) 연말정산 guide or the current 조세특례제限법 §126의2. If anything changed, update this table and the `about` text. Keep all numbers in one `RULES` object at the top of the script.

| Key | Value | Note |
|---|---|---|
| threshold | 25% of 총급여 | 최저사용금액 |
| rate.credit | 15% | 신용카드 |
| rate.check | 30% | 직불·선불카드, 현금영수증 |
| rate.culture | 30% | Only when 총급여 ≤ 7,000만. Covers 도서, 신문, 공연, 박물관·미술관, 영화, and 수영장·체력단련장 (the gym part started 2025-07, verify). |
| rate.market | 40% | 전통시장 |
| rate.transit | 40% | 대중교통 |
| basicLimit | 300만 if 총급여 ≤ 7,000만, else 250만 | |
| extraLimit | 300만 (≤ 7,000만: market + transit + culture combined); 200만 (> 7,000만: market + transit) | |
| threshold order | credit → check → culture → market → transit | The threshold absorbs the lowest-rate spending first (NTS method). |
| ignored | 소비증가분 추가공제, any child-count limit increase, 총급여 > 1.2억 differences | If verification shows one of these applies to 2026, add a one-line note in `about`. Do not model it. |

The saving rate select offers 6.6%, 16.5%, 26.4%, and 38.5%. These are marginal rates including 지방소득세. Add a hint: "과세표준 구간 세율이에요. 모르면 16.5%로 두세요".

## Calculation

All math is in 만원 and done in integers. Display amounts in 원 (×10,000), rounded down to 원.

1. S = salary. T = S × 0.25.
2. Spending by category: credit, check, culture, market, transit. culture = 0 when S > 7,000.
3. Walk the categories in threshold order with `left = T`:
   - `absorbed = min(spend_c, left)`
   - `left -= absorbed`
   - `eligible_c = spend_c − absorbed`
4. If total spending ≤ T, the deduction is 0 and `toThreshold = T − total`.
5. `gross = Σ eligible_c × rate_c`.
6. `basic = min(gross, basicLimit)`.
7. `extraBase = Σ eligible_c × rate_c` over the extra-limit categories (≤ 7,000: market, transit, culture; > 7,000: market, transit).
8. `extra = min(gross − basic, extraLimit, extraBase)`.
9. `deduction = basic + extra`. `saving = deduction × taxRate`.
10. **December comparison:** recalculate with `credit += D`, then separately with `check += D`. Each tile shows `newDeduction − deduction` and its saving.

**Acceptance checks** (put them in a `selfTest()` that runs when `#test` is in the hash and logs pass/fail to the console):

- Salary 4,000; credit 1,500; check 500.
  - T = 1,000, absorbed entirely from credit.
  - Deduction = 500 × 15% + 500 × 30% = 225만.
  - Saving at 16.5% = 371,250원.
- Salary 4,000; credit 800. Deduction is 0 and toThreshold is 200만.
- Salary 8,000; credit 2,000; check 3,000.
  - T = 2,000.
  - gross = 3,000 × 30% = 900, capped by basic at 250.
  - Deduction = 250만, status "limit".
- Salary 4,000; credit 1,000; slider D = 100.
  - Credit tile: +15만.
  - Check tile: +30만, marked better.

## Status sentences

| Condition | ko | en |
|---|---|---|
| no salary | 총급여를 넣으면 계산이 시작돼요 | Enter your salary to start |
| total < T | 아직 문턱 전이에요. ₩{x}을 더 써야 공제가 시작돼요. 문턱까지는 어떤 수단이든 똑같아요. | Below the threshold. ₩{x} more spending before any deduction starts. Up to the threshold, every payment type counts the same. |
| deduction > 0, basic not full | 공제 구간이에요. 지금부터는 체크카드·현금영수증이 신용카드보다 2배 유리해요. | You are past the threshold. From here, debit and cash receipts count double compared with credit. |
| basic full, extra room left | 기본 한도를 채웠어요. 전통시장·대중교통 사용분은 추가 한도가 남아 있어요. | Basic limit reached. Traditional markets and public transit still have extra room. |
| basic and extra full | 공제 한도를 모두 채웠어요. 더 써도 공제는 늘지 않아요. | All limits reached. More spending will not raise your deduction. |

## Visual design

- **Palette:**
  - background #f4f6fb, cards #ffffff, ink #1f2633, gray #7b8494
  - deductible green #1fa774, limit gold #e7a320, threshold gray #c9cfda, accent blue #2f6fec
- **Track bar:**
  - 20 px tall with rounded ends.
  - The threshold marker is a 2 px dark line with the label "문턱 25%" above it.
  - The limit flag 🚩 sits at the spending where the basic limit would be met.
  - The bar scale is max(total × 1.15, limitSpend × 1.1).
  - The fill animates with a 300 ms width transition.
- **Big numbers:** 28 px bold tabular-nums (`font-variant-numeric: tabular-nums`).
- **December tiles:** side by side, stacked below 360 px wide. The winner gets a blue border, the "더 유리" ribbon, and a 1.0 → 1.04 → 1.0 pop over 200 ms.
- **Layout:**
  - A centered column with a max width of 520 px and 16 px side padding.
  - Readable at 320 × 480 with no horizontal scroll.
  - Header and footer bar are fixed. The middle area scrolls (`overflow-y: auto`), and the page never scrolls.
- **prefers-reduced-motion:** no count-up, no pop, and no bar transition.
- No sound.

## Strings

| key | ko | en |
|---|---|---|
| appTitle | 신용카드 소득공제 계산기 2026 | Card Spending Deduction Calculator 2026 |
| dday | 올해 지출 마감 D-{n} | {n} days left this year |
| ddayToday | 오늘이 올해 마지막 날이에요 | Last day of the year |
| ddayOver | 2026년 지출 기준 계산이에요 | Calculated for 2026 spending |
| yearBadge | 2026년 지출 기준 | 2026 spending rules |
| salary | 총급여 (만원) | Gross salary (10k won) |
| salaryPh | 예: 4500 | e.g. 4500 |
| salaryHint | 연봉에서 비과세 수당(식대 등)을 뺀 금액이에요 | Annual pay minus tax-free allowances such as meals |
| thresholdLine | 문턱: ₩{T} | Threshold: ₩{T} |
| spentTitle | 올해 지금까지 쓴 금액 (만원) | Spent so far this year (10k won) |
| credit | 신용카드 | Credit card |
| check | 체크카드·현금영수증 | Debit card & cash receipts |
| market | 전통시장 | Traditional markets |
| transit | 대중교통 | Public transit |
| culture | 도서·공연·영화·체육시설 | Books, shows, movies & gyms |
| cultureOff | 총급여 7천만 원 초과는 문화비 공제가 없어요. 결제한 카드 칸에 더해 주세요. | Over 70M won salary there is no culture deduction. Add it to the card you paid with. |
| toThreshold | 문턱까지 남은 금액 | Left to threshold |
| deduction | 예상 소득공제 | Estimated deduction |
| saving | 예상 절세액 | Estimated tax saved |
| taxRate | 세율 | Tax rate |
| taxRateHint | 과세표준 구간 세율이에요. 모르면 16.5%로 두세요 | Your marginal bracket. If unsure, keep 16.5%. |
| decTitle | 12월 31일까지 더 쓸 예정 금액 | Expected spending until Dec 31 |
| decIfCredit | 신용카드로 내면 | If paid by credit |
| decIfCheck | 체크카드로 내면 | If paid by debit |
| decPlus | 공제 +₩{a} · 절세 +₩{b} | Deduction +₩{a} · Saved +₩{b} |
| better | 더 유리 | Better |
| same | 차이 없음 | No difference |
| moveSlider | 슬라이더를 움직여 보세요 | Move the slider |
| copy | 결과 복사 | Copy result |
| copied / copyFail | 복사했어요 / 복사하지 못했어요 | Copied / Could not copy |
| reset | 입력 지우기 | Clear inputs |
| resetConfirm | 정말 지울까요? [지우기] [취소] | Clear everything? [Clear] [Cancel] |
| cleared | 입력을 지웠어요 | Inputs cleared |
| footNote | 참고용 추정치예요 · 홈택스에서 확인하세요 | Estimate only · Check Hometax |
| tooBig | 숫자가 너무 커요 (최대 {max}) | Number too large (max {max}) |
| shareText | 💳 2026 카드 소득공제 체크 / 문턱 ₩{T} / 예상 공제 ₩{d} / 예상 절세 ₩{s} ({rate}) / 참고용 추정치 · play.mesisi.net | 💳 2026 card deduction check / Threshold ₩{T} / Deduction ₩{d} / Saved ₩{s} ({rate}) / Estimate only · play.mesisi.net |

The copy text never includes the salary or the individual spending figures. It only includes threshold, deduction, and saving.

The reset confirmation is an inline row that replaces the footer buttons for 5 s, not a dialog.

## localStorage (in try/catch, prefix `cdc:`)

- `cdc:inputs`: JSON of the salary, five spending fields, slider, and tax rate, so a December return visit keeps the numbers. "입력 지우기" removes this key.
- `cdc:visits`: a count, not shown in the UI.

If storage is blocked, the tool works the same with nothing remembered.

## Edge cases

- **Salary:**
  - Empty or 0 shows the "no salary" status and dashes in the big numbers. No NaN anywhere.
  - Clamped to 1–100,000 (10억). Above that, show `tooBig` under the field.
- **Spending fields:** each is clamped to 0–100,000. Negative input is impossible because non-digits are stripped.
- **Salary crossing 7,000 either way:** hide or show the culture field and keep its value in state. When hidden, its value counts as 0 and is not moved to another field.
- **Exactly 7,000:** counts as ≤ 7,000.
- **Total exactly T:** the deduction is 0 and toThreshold shows ₩0, with the status "공제 구간이에요".
- **Slider D crosses the threshold:** only the part past T counts. The math handles it naturally; this must be covered by a test.
- **Both tiles equal:** this happens when everything is below the threshold or the limits are full. Neither tile gets "더 유리"; both show "차이 없음".
- **D-day:**
  - Computed in local time, as 12/31 of 2026 minus today.
  - In 2027 or later, show the `ddayOver` chip instead and keep the 2026 rules.
  - On 12/31, show `ddayToday`.
- **Resize:** reflow only; the bar is CSS widths.
- **Demo hash:** if `location.hash === '#demo'`, prefill salary 4,500, credit 1,400, check 600, market 30, transit 60, culture 20, slider 100, and rate 16.5%. This is for QA thumbnails, and the result must show a partly filled green bar.
- **Missing lang param:** fall back to `navigator.language`. `<html lang>` must match.

## Must not

- No network of any kind. No `fetch`, and no external fonts or scripts. Stay under 80 KB.
- Do not tell people to spend more. Every sentence frames December spending as money already planned. No "더 쓰세요" wording, no credit-card recommendations, no card company names, and no real brands.
- Do not imitate Hometax, NTS, or card company UI. Do not use government logos or the 국세청 name as branding (it may be mentioned in the about text only).
- No claim of accuracy beyond "참고용 추정치". No 결정세액 cap modeling. Do not present the saving as a guaranteed refund.
- Never put salary or spending into copied text, the URL, or the title.
- No alert, confirm, prompt, window.open, or navigation. No sound.
- Do not ship before every number in the Rules table has been re-checked against the 2026 NTS rules, and the about text has been updated if anything differs.
