# Idea and spec: 월세 세액공제 계산기 2026 / Monthly Rent Tax Credit Calculator 2026

Agent: Claude (opus), planner. Design notes are merged in (palette, layout, motion).

## Concepts scored

Scores are 1–5 for: value in the first 10 seconds, originality, Korean search/share demand, and buildability in one HTML file. Maximum 20.

| Concept | Category | Score | Verdict |
|---|---|---|---|
| Dried-persimmon pun generator (곶감 말장난 뽑기) | random | 4/4/2/5 = 15 | The trend is low confidence (the newsletter gives no year), and the persimmon subject overlaps the queued `persimmon-breeze` specs |
| Roast chestnut peeling (군밤 까기): drag to crack shells before they burn | games | 4/3/3/4 = 14 | Fine filler, but it sits too close in feel to `roast-sweet-potato` and `hotteok-flip` |
| **Monthly Rent Tax Credit Calculator 2026** | **tools** | **4/3/5/5 = 17** | **Picked**: December 31 is the spending cutoff for 2026, and "월세 세액공제" gets heavy searches every December–January. Its subject differs from `pension-tax-credit-2026` and the queued `card-deduction-calculator-2026` |

## Rule basis (verify against 국세청 / 법제처 before build)

These rules were checked on 2026-11-27 from secondary sources. They apply to **2026 귀속** (rent paid 2026-01-01 to 2026-12-31, settled in 연말정산 in Jan–Feb 2027). This is current law after the 2024 revision:

- **Who qualifies:** a 무주택 세대의 세대주. A 세대원 also qualifies if the 세대주 claims no housing deduction.
- **Income test:**
  - 총급여 ≤ 8,000만원, and 종합소득금액 ≤ 7,000만원 if the person has other income.
- **Rate:**
  - 17% if 총급여 ≤ 5,500만원 (and 종합소득금액 ≤ 4,500만원 if there is other income)
  - otherwise 15%
- **Cap:** 월세액 up to 1,000만원 per year.
- **House test:** 국민주택규모 (전용 85㎡) or smaller, OR 기준시가 4억원 or less. 오피스텔 and 고시원 count.
- **Address test:** the 주민등록 address must match the address on the lease (임대차계약서).
- **Tax limit:** the credit cannot exceed the 결정세액 (tax owed), and the unused part is lost (no carry-over).
- **Local tax:** 지방소득세 is 10% of 소득세, so the real benefit is about credit × 1.1.
- **Not applied:** the 2026 세제개편안 (announced 2026-08-03; it would raise the cap to 1,200만원 and give 17% to youth with 총급여 ≤ 8,000만원) is reported to start "내년부터" (2027). Mention it only in the about note and do not apply it.

All rule numbers live in one `RULES` constant at the top of the script:

```js
// ponytail: 2026 귀속 rules only; update this one object each year
const RULES = { year: 2026, cap: 10_000_000, hiRate: 0.17, loRate: 0.15,
  hiSalary: 5500, hiOther: 4500, maxSalary: 8000, maxOther: 7000, localTax: 0.10 };
```

## Meta

- slug `monthly-rent-tax-credit-2026`, category `tools`, kind `tool`, aspect `3/4`, date `2026-11-27`
- tags: ko `월세세액공제`, `연말정산`; en `rent-tax-credit`, `year-end-tax`
- title: ko `월세 세액공제 계산기 2026`; en `Monthly Rent Tax Credit Calculator 2026`
- desc ko: 총급여와 월세, 낸 개월 수만 넣으면 2026년 귀속 월세 세액공제(15%·17%)로 얼마 돌려받는지 바로 보여 줘요. 한도 1,000만원과 지방소득세까지 계산해요.
- desc en: Enter your gross salary, monthly rent and months paid to see your 2026 Korean rent tax credit (15% or 17%), including the 10 million won cap and local income tax.
- howto ko: 총급여(만원), 월세(원), 2026년에 낸 개월 수를 넣고 자격 체크 3개를 확인하세요. 결과는 바로 바뀌어요. 예상 결정세액을 넣으면 실제로 돌려받을 수 있는 금액까지 계산해요. '결과 복사'로 메모해 두세요.
- howto en: Enter gross salary (in 10,000 won), monthly rent (won) and months paid in 2026, then tick the 3 eligibility checks. Results update live. Add your expected tax owed to see what you can actually get back. Use "Copy result" to save a note.
- about ko: 2026년 11월 기준 현행 규정(2026년 귀속)으로 계산한 참고용 추정치예요. 정확한 금액은 홈택스 연말정산 간소화와 회사 정산 결과로 확인하세요. 12월 31일까지 낸 월세만 2026년 공제에 들어가요. 2026년 세제개편안(한도 1,200만원, 청년 17%)은 2027년부터 적용될 예정이라 반영하지 않았어요. 입력값은 이 기기 밖으로 나가지 않아요.
- about en: An estimate based on current rules for tax year 2026 (as of Nov 2026). Confirm the real amount through Hometax and your employer's year-end settlement. Only rent paid by December 31 counts for 2026. The 2026 tax reform proposal (12 million won cap, 17% for youth) is planned from 2027 and is not applied. Your inputs never leave this device.

## Pitch

A warm, clean one-screen calculator with a little 🏠🔑 header. It is built for the December question "월세 공제 얼마 받지?":

1. The user types three numbers (salary, rent, months) and taps three eligibility checks.
2. A big result card shows **"약 ₩1,346,400 돌려받아요"**, the rate badge (17% / 15% / 대상 아님) and a one-line breakdown.
3. A small progress bar shows how much of the 1,000만원 cap is used.
4. An optional tax-owed field shows the real refundable amount and any lost credit.
5. A red-ribbon hint counts the days until December 31 and says that unpaid December rent must be paid by then to count.

## Flow

There is one screen (no start screen, because it is a tool).

1. **Load**
   - Read the stored inputs. If none, the fields start empty, the result card shows its placeholder, and the D-day ribbon is visible.
2. **Input** (live calculation on every `input` event, debounced 120 ms)
   - The result card re-renders, and the big number counts up from the old value to the new one over 400 ms (ease-out).
3. **Ineligible**
   - The rate badge turns gray "대상 아님" and the card lists the failed reasons in red.
   - The amount shows ₩0.
4. **Copy**
   - Copies the share text and shows a toast.
5. **Reset**
   - Clears every input and storage key `mrc:inputs`.
   - It is a ghost button that needs a second tap within 3 s ("한 번 더 누르면 지워져요"), because there are no dialogs.

## Layout

- **Container:** a centered column with a max width of 520 px and 16 px side padding.
- **Height:** the window is `100dvh`, the page never scrolls, and the form panel scrolls internally (`overflow:auto`, `touch-action:pan-y`).
- **Order, top to bottom:**
  1. Header: 🏠🔑, title, and a subtitle "2026년 귀속 · 12월 31일까지 낸 월세 기준"
  2. D-day ribbon
  3. The form section "내 정보"
  4. The section "자격 체크"
  5. The section "선택: 예상 결정세액"
  6. The result card. On viewports ≥ 720 px wide **and** ≥ 640 px tall it is sticky at the bottom. Otherwise it flows after the form inside the scroll panel.
  7. The action row: [결과 복사] [초기화]
  8. Footnote
- **Wide screens (≥ 900 px):** a two-column grid with the form on the left and the result card sticky on the right.

### Form fields

| id | label ko / en | type | detail |
|---|---|---|---|
| salary | 총급여 (만원) / Gross salary (×10,000 won) | `inputmode="numeric"` text | 0–99,999. Hint: "연봉에서 식대 등 비과세를 뺀 금액" / "Annual pay minus tax-free items like meal allowance". Shows a live "= 4,200만원" echo |
| rent | 월세 (원, 관리비 제외) / Monthly rent (won, excl. maintenance) | numeric text with live comma formatting | 0–9,999,999. Chips: 40만 / 50만 / 60만 / 70만 / 80만 (en: 400k … 800k) |
| months | 2026년에 낸 개월 수 / Months paid in 2026 | stepper − [n] + plus a 1–12 select | default 12. Hint: "전입신고한 달부터 세요" / "Count from the month you registered the address" |
| other | 근로소득 외 다른 소득이 있어요 / I have other income | checkbox | When checked, reveals the field below |
| otherIncome | 종합소득금액 (만원) / Total comprehensive income (×10,000 won) | numeric | Shown only when `other` is checked |
| chkHome | 무주택 세대의 세대주예요 (또는 세대주가 주택 공제를 안 받는 세대원) / I head a household that owns no home (or I'm a member and the head claims no housing deduction) | checkbox | default unchecked |
| chkSize | 집이 전용 85㎡ 이하이거나 기준시가 4억원 이하예요 / The home is ≤85㎡ or officially valued ≤400 million won | checkbox | Note: "오피스텔·고시원도 돼요" |
| chkAddr | 주민등록 주소가 임대차계약서 주소와 같아요 / My registered address matches the lease | checkbox | |
| taxOwed | 예상 결정세액 (원, 선택) / Expected tax owed (won, optional) | numeric | Hint: "작년 원천징수영수증의 결정세액을 참고하세요" / "Check last year's withholding receipt" |

## Calculation

```
paid      = rent × months
eligible  = min(paid, RULES.cap)
overCap   = max(0, paid − RULES.cap)
fails     = [] 
  if !chkHome → 'home'; if !chkSize → 'size'; if !chkAddr → 'addr'
  if salary > 8000 → 'salary'; if other && otherIncome > 7000 → 'otherIncome'
rate      = fails.length ? 0
          : (salary ≤ 5500 && (!other || otherIncome ≤ 4500)) ? 0.17 : 0.15
credit    = floor(eligible × rate)                       // national income tax credit
if taxOwed entered: usable = min(credit, taxOwed); lost = credit − usable  else usable = credit, lost = 0
local     = floor(usable × 0.10)
total     = usable + local                               // big number, labeled 약
capUsed   = eligible / RULES.cap                         // progress bar 0–100%
```

- Empty salary, rent or months gives the placeholder state ("숫자를 넣으면 바로 계산해요"), not ₩0.
- Boundaries use `≤` ("이하"). 5,500 → 17%, 5,501 → 15%, 8,000 → 15%, 8,001 → not eligible.
- All money is integer won. Format with `toLocaleString('ko-KR')` in both languages and prefix ₩.

### Self-check (required, runs when `location.hash === '#test'`, logs to the console, and throws on failure)

| salary | rent | months | other / otherIncome | taxOwed | checks | expect rate | credit | local | total | lost |
|---|---|---|---|---|---|---|---|---|---|---|
| 4200 | 600,000 | 12 | – | – | all | 0.17 | 1,224,000 | 122,400 | 1,346,400 | 0 |
| 7000 | 900,000 | 12 | – | – | all | 0.15 | 1,500,000 (overCap 800,000) | 150,000 | 1,650,000 | 0 |
| 5500 | 500,000 | 6 | – | – | all | 0.17 | 510,000 | 51,000 | 561,000 | 0 |
| 5501 | 500,000 | 6 | – | – | all | 0.15 | 450,000 | 45,000 | 495,000 | 0 |
| 8001 | 500,000 | 12 | – | – | all | 0 (salary) | 0 | 0 | 0 | 0 |
| 5000 | 500,000 | 12 | yes / 5000 | – | all | 0.15 | 900,000 | 90,000 | 990,000 | 0 |
| 4200 | 600,000 | 12 | – | 800,000 | all | 0.17 | 1,224,000 → usable 800,000 | 80,000 | 880,000 | 424,000 |
| 4200 | 600,000 | 12 | – | – | chkAddr off | 0 (addr) | 0 | 0 | 0 | 0 |

## Result card

- **Top row:**
  - The rate badge is a pill: "17% 공제" (teal), "15% 공제" (blue) or "대상 아님" (gray).
  - At the right: "2026년 귀속".
- **Big line:** "약 ₩{total} 돌려받아요" / "About ₩{total} back". Use 32 px bold with tabular-nums, and 26 px under 360 px wide.
- **Breakdown:** small gray rows, each with the value right-aligned.
  - 낸 월세 합계 ₩{paid} ({rent} × {months}개월)
  - 공제 대상 월세 ₩{eligible}
  - 소득세 세액공제 ₩{credit} ({rate}%)
  - 지방소득세 감소 ₩{local}
  - When `taxOwed` is set: 결정세액 한도로 사라지는 금액 ₩{lost}, shown in red only if lost > 0
- **Cap bar:** a 10 px rounded bar under the label "한도 1,000만원 중 {pct}% 사용".
  - When overCap > 0, show the amber note "₩{overCap}은 한도를 넘어 공제되지 않아요".
- **Ineligible state:** a red list with one line per failed reason (strings below). The big line becomes "₩0 · 조건을 다시 확인해 보세요".
- **Tip line:** pick one, in this order of priority.
  1. If ineligible: no tip.
  2. If months < 12: "아직 안 낸 달이 있다면 12월 31일까지 내야 2026년 공제에 들어가요."
  3. Else if overCap > 0: "한도를 넘었어요. 더 내도 공제는 늘지 않아요."
  4. Else: "월세 이체 내역과 임대차계약서 사본을 회사에 내면 돼요."

## D-day ribbon

- Days are computed in local time from today to 2026-12-31: `ceil((Dec31 23:59:59 − now) / 86400000)`.
- Shown text by date:
  - before 2026-12-31: "2026년 월세 인정 마감 D-{n}" / "2026 rent counts until Dec 31 · D-{n}"
  - on 2026-12-31: "오늘이 2026년 월세 마감일이에요" / "Today is the last day for 2026 rent"
  - in 2027 or later: "2026년분 연말정산 시즌이에요 · 1~2월 회사에 제출" / "2026 year-end settlement season · submit to your employer in Jan–Feb"
- Ribbon style: a red ribbon (#d94f45) with white text and a tiny 🎀. Under prefers-reduced-motion it does not wiggle. Otherwise it gets one 600 ms wiggle on load.

## Controls

- **Pointer:**
  - Everything is a native input, button or checkbox, with tap targets at least 44 px tall.
  - The chips set the rent, and the stepper buttons support press-and-hold repeat (after 400 ms, every 120 ms).
- **Keyboard:**
  - Native Tab order. Enter in a field moves focus to the next field.
  - ArrowUp/ArrowDown on the months field step it.
  - When focus is not in a text field: C copies and R arms or confirms the reset.
- **Numeric inputs:**
  - Strip everything except digits on input and keep the caret position after re-formatting commas.
  - Paste of "60만원" or "600,000원" is parsed. A trailing 만 multiplies by 10,000 in the won fields.
- **Touch:** there is no `preventDefault` on inputs (it would break the mobile keyboard). The scroll panel uses `touch-action: pan-y`.

## Visual design

- **Palette:**
  - background #f5f1e8 (warm paper), card #ffffff, ink #23262d, gray #7d828c
  - teal #1f7a6d (17%), blue #2f6fd6 (15%), red #d94f45 (warnings and ribbon), amber #e5a52b (cap note)
  - the cap bar fill is a teal gradient
- **Type:** system-ui stack, with `font-variant-numeric: tabular-nums` on every amount.
- **Header art:** an inline SVG of a small house with a lit window and a key tag. It is a 48 px icon, not a raster image.
- **Feedback:**
  - the big number counts up
  - the badge pops (scale 1.15 → 1 over 180 ms) when the rate changes
  - a green check animates in on each eligibility box
  - toasts slide up from the bottom for 1.8 s
- **prefers-reduced-motion:** no count-up (values set instantly), no pop and no wiggle.
- **Themes:** light only. The look is not dark-mode dependent.
- **Thumbnail:** with `#demo`, prefill salary 4200, rent 600,000, months 12 and all checks on. The card shows ₩1,346,400 with the 17% badge.

## Strings

| key | ko | en |
|---|---|---|
| appTitle | 월세 세액공제 계산기 2026 | Monthly Rent Tax Credit Calculator 2026 |
| sub | 2026년 귀속 · 12월 31일까지 낸 월세 기준 | Tax year 2026 · rent paid by Dec 31 |
| secMe | 내 정보 | About you |
| secCheck | 자격 체크 | Eligibility |
| secTax | 선택: 예상 결정세액 | Optional: expected tax owed |
| salary | 총급여 (만원) | Gross salary (×10,000 won) |
| salaryHint | 연봉에서 식대 등 비과세를 뺀 금액 | Annual pay minus tax-free items like meal allowance |
| salaryEcho | = {v}만원 | = {v} ×10,000 won |
| rent | 월세 (원, 관리비 제외) | Monthly rent (won, excl. maintenance) |
| months | 2026년에 낸 개월 수 | Months paid in 2026 |
| monthsHint | 전입신고한 달부터 세요 | Count from the month you registered the address |
| monthUnit | 개월 | mo |
| other | 근로소득 외 다른 소득이 있어요 | I have other income |
| otherIncome | 종합소득금액 (만원) | Total comprehensive income (×10,000 won) |
| chkHome | 무주택 세대의 세대주예요 (또는 세대주가 주택 공제를 안 받는 세대원) | I head a household that owns no home (or I'm a member and the head claims no housing deduction) |
| chkSize | 집이 전용 85㎡ 이하이거나 기준시가 4억원 이하예요 | The home is ≤85㎡ or officially valued ≤400 million won |
| chkSizeNote | 오피스텔·고시원도 돼요 | Officetels and goshiwon count too |
| chkAddr | 주민등록 주소가 임대차계약서 주소와 같아요 | My registered address matches the lease |
| taxOwed | 예상 결정세액 (원, 선택) | Expected tax owed (won, optional) |
| taxOwedHint | 작년 원천징수영수증의 결정세액을 참고하세요 | Check last year's withholding receipt |
| placeholder | 숫자를 넣으면 바로 계산해요 | Enter the numbers to see your result |
| badge17 / badge15 / badgeNo | 17% 공제 / 15% 공제 / 대상 아님 | 17% credit / 15% credit / Not eligible |
| big | 약 ₩{v} 돌려받아요 | About ₩{v} back |
| bigNo | ₩0 · 조건을 다시 확인해 보세요 | ₩0 · Check the conditions again |
| rowPaid | 낸 월세 합계 | Total rent paid |
| rowPaidSub | {rent} × {m}개월 | {rent} × {m} mo |
| rowEligible | 공제 대상 월세 | Rent eligible for credit |
| rowCredit | 소득세 세액공제 ({r}%) | Income tax credit ({r}%) |
| rowLocal | 지방소득세 감소 | Local income tax reduction |
| rowLost | 결정세액 한도로 사라지는 금액 | Lost to the tax-owed limit |
| capLabel | 한도 1,000만원 중 {p}% 사용 | {p}% of the 10 million won cap used |
| capOver | ₩{v}은 한도를 넘어 공제되지 않아요 | ₩{v} is over the cap and earns no credit |
| failHome | 무주택 세대주(또는 조건 맞는 세대원)여야 해요 | You must head a home-free household (or qualify as a member) |
| failSize | 85㎡ 이하 또는 기준시가 4억원 이하 주택이어야 해요 | The home must be ≤85㎡ or valued ≤400 million won |
| failAddr | 주민등록 주소와 계약서 주소가 같아야 해요 | Your registered address must match the lease |
| failSalary | 총급여 8,000만원 이하만 받을 수 있어요 | Only for gross salary of 80 million won or less |
| failOther | 종합소득금액 7,000만원 이하만 받을 수 있어요 | Only for total income of 70 million won or less |
| tipMonths | 아직 안 낸 달이 있다면 12월 31일까지 내야 2026년 공제에 들어가요. | Any unpaid month must be paid by Dec 31 to count for 2026. |
| tipCap | 한도를 넘었어요. 더 내도 공제는 늘지 않아요. | You're over the cap. Paying more won't raise the credit. |
| tipDocs | 월세 이체 내역과 임대차계약서 사본을 회사에 내면 돼요. | Submit your rent transfer records and a copy of the lease to your employer. |
| ddayBefore | 2026년 월세 인정 마감 D-{n} | 2026 rent counts until Dec 31 · D-{n} |
| ddayToday | 오늘이 2026년 월세 마감일이에요 | Today is the last day for 2026 rent |
| ddayAfter | 2026년분 연말정산 시즌이에요 · 1~2월 회사에 제출 | 2026 year-end settlement season · submit to your employer in Jan–Feb |
| copy / reset | 결과 복사 / 초기화 | Copy result / Reset |
| resetArm | 한 번 더 누르면 지워져요 | Tap again to clear |
| copied / copyFail | 복사했어요 / 복사하지 못했어요 | Copied / Could not copy |
| foot | 참고용 추정치예요. 정확한 금액은 홈택스와 회사 연말정산으로 확인하세요. | An estimate only. Confirm with Hometax and your employer's settlement. |
| reformNote | 2026년 세제개편안(한도 1,200만원, 청년 17%)은 2027년부터 적용 예정이라 반영하지 않았어요 | The 2026 reform proposal (12M won cap, 17% for youth) is planned from 2027 and is not applied |
| chips | 40만 / 50만 / 60만 / 70만 / 80만 | 400k / 500k / 600k / 700k / 800k |

### Share text (copy)

- **ko:**
  ```
  🏠 2026 월세 세액공제 계산
  월세 {rent}원 × {m}개월 / 총급여 {salary}만원
  공제율 {r}% → 약 ₩{total} (지방소득세 포함)
  play.mesisi.net
  ```
- **en:** the same lines in English. Ineligible: "공제 대상 아님: {first reason}".

## localStorage (in try/catch, prefix `mrc:`)

- `mrc:inputs`: JSON `{salary, rent, months, other, otherIncome, chkHome, chkSize, chkAddr, taxOwed}`, saved on change (debounced 300 ms) so a January revisit keeps the numbers.
- `mrc:v`: the schema version "1". On a mismatch, ignore the stored inputs.
- Reset deletes `mrc:inputs`.
- If storage is blocked, everything still works without persistence.

## Edge cases

- `0` or an empty value in salary, rent or months shows the placeholder, not ineligibility. Salary 0 with rent entered counts as empty (placeholder).
- Months are clamped to 1–12. Rent above 9,999,999 is clamped, with the toast "월세는 999만원까지 입력돼요".
- A non-numeric paste is ignored, and the input reverts to its previous value.
- When `other` is unchecked, `otherIncome` is ignored (but kept in storage).
- If taxOwed is 0, then usable = 0 and lost = credit. Show the red row and the tip "결정세액이 0이면 세액공제를 받을 수 없어요" / "With no tax owed, a credit can't be used."
- On resize or orientation change, the layout switches between sticky and flow without losing focus or values.
- `#demo` prefills the thumbnail state described above and does not write storage. `#test` runs the self-check table.
- An `en` user sees the same won amounts. Never convert currency.
- Count-up animations are cancelled and restarted on new input, with no stacking rAF loops. The ribbon wiggle never runs while `document.hidden`.
- Ineligible plus overCap: show only the fail reasons. Hide the cap note.

## Must not

- No network of any kind: no fetch, no fonts, no links out (Hometax is named in text only, not linked).
- Do not imitate the look, logo or wording layout of 국세청, 홈택스, 손택스 or any bank or tax app.
- Do not apply the unpassed 2026 reform values, and do not claim legal certainty. The footnote and about note always state "참고용 추정치".
- No other deductions (card, pension, 주택임차차입금 원리금): stay on the one subject. Skipped: a 결정세액 estimate from salary, because it adds a full tax engine. Add it only if users ask.
- No storing or transmitting inputs off-device, and no analytics.
- No dialogs (alert, confirm or prompt), no window.open, no navigation. No sound (this tool needs none).
- No mocking of renters, landlords, income levels or regions.

## Sources (checked 2026-11-27)

- [복지로: 월세 세액공제 안내](https://www.bokjiro.go.kr/ssis-tbu/cms/pc/news/promotion/1310205_1118.html)
- [뉴시스 2026-08-03: 총급여 8000만원 이하 청년 월세 세액공제 15%→17% (세제개편, 내년부터 적용 보도)](https://www.newsis.com/view/NISX20260803_0003734275)
- [Daum/뉴스 2026-08-03: 2026 세제 개편, 월세 공제 확대](https://v.daum.net/v/20260803180228886)
- [iquest 블로그: 월세 세액공제 요건·한도 총정리](https://blog.iquest.co.kr/entry/%EC%9B%94%EC%84%B8-%EC%84%B8%EC%95%A1%EA%B3%B5%EC%A0%9C-%EC%9A%94%EA%B1%B4%C2%B7%ED%95%9C%EB%8F%84-%EC%B4%9D%EC%A0%95%EB%A6%AC)
- Research row 7 (연말정산 12월 31일 지출 마감): https://blog.3o3.co.kr/2026-year-end-tax-period/
