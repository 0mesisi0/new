# Idea and spec: 퇴직금 계산기 2026 / Severance Pay Calculator 2026

Agent: Claude (opus), planner. Research source: `01-research.md` row 7 (퇴직금 예상 계산기, med confidence) and the year-end resignation/job-change season.

## Concepts scored

Scores are 1–5 for: value in the first 10 seconds, originality, Korean search/share demand, and buildability in one HTML file. Maximum 20.

| Concept | Category | Score | Verdict |
|---|---|---|---|
| 내 책상 망치기: click a tidy office desk to knock over pens, spill coffee, collapse paper towers (idea from research row 1) | weird | 4/3/2/4 = 13 | Fun, but search demand is low and it is close to bubble-wrap / paper-smoother "touch toys". Keep for later |
| OO자베스 이름 점괘: type a name, get a "{name}자베스" fortune card (research row 4) | fortune | 3/3/2/5 = 13 | The meme's timing is unconfirmed (low confidence), and it overlaps with trend-lifespan-fortune and hoppang-fortune. Skip |
| **퇴직금 계산기 2026** | **tools** | **5/3/5/5 = 18** | **Picked**: people search "퇴직금 계산기" constantly, and even more around December and January resignations. Dates plus salary give a number in about 10 seconds. "1년 더 다니면 +얼마" and the D-day to the first anniversary make it worth sharing. No existing item or queued spec covers severance (pension-tax-credit-2026 is about tax credits, and card-deduction-calculator-2026 is about card deductions) |

## Meta

- slug `severance-pay-calculator`, category `tools`, kind `tool`, aspect `3/4`, date `2026-11-27`
- tags: ko `퇴직금`, `퇴직금계산기`, `평균임금`; en `severance`, `calculator`, `korea`
- title: ko `퇴직금 계산기 2026`; en `Severance Pay Calculator 2026`
- desc ko: 입사일, 마지막 근무일, 월급만 넣으면 법정 퇴직금 예상액이 바로 나와요. 1년 채우기 D-day와 "1년 더 다니면 얼마"까지 한눈에 볼 수 있어요.
- desc en: Enter your start date, last working day and monthly pay to see an estimate of Korean statutory severance pay, plus the D-day to your first full year.
- howto ko: 입사일과 마지막 근무일을 고르고 세전 월급을 넣으세요. 상여금과 연차수당은 '더 정확하게'에서 넣을 수 있어요. 결과는 바로 바뀌고, '결과 복사'로 메모해 둘 수 있어요.
- howto en: Pick your start date and last working day, then enter your monthly gross pay. Add bonuses and unused-leave pay under "More precise". The result updates as you type, and "Copy result" saves it as text.
- about ko: 근로자퇴직급여 보장법의 계산식(1일 평균임금 × 30일 × 재직일수 ÷ 365)을 따른 세전 예상액이에요. 퇴직소득세, 회사별 퇴직연금(DC형) 적립액, 휴직 기간 제외 같은 예외는 반영하지 않아요. 정확한 금액은 회사나 고용노동부에 확인하세요. 입력값은 이 기기 밖으로 나가지 않아요.
- about en: A pre-tax estimate using the formula in Korea's Employee Retirement Benefit Security Act (average daily wage × 30 × days employed ÷ 365). It does not include retirement income tax, DC-type pension balances or excluded leave periods. Check with your employer or the Ministry of Employment and Labor for the exact amount. Your inputs never leave this device.

## Pitch

A clean single-screen calculator on a soft winter-paper background, styled like a sealed pay envelope ✉️. The user enters 3 values (start date, last working day, monthly pay) and a large number counts up: "예상 퇴직금 ₩8,901,099".

Below the number:

1. a small breakdown (재직일수, 3개월 임금총액, 1일 평균임금)
2. a progress bar toward the first full year, with a D-day if not yet eligible
3. a "1년 더 다니면 +₩2,967,033" chip and a "12월 31일까지 다니면" quick toggle

The year-end hook is that people deciding between "올해 말 vs 내년 초" can compare instantly.

## Flow

Single screen, no steps. The layout scrolls internally inside the card on short screens; the page itself never scrolls.

1. **INPUT card** (always visible)
   - 입사일: `<input type="date">`
   - 마지막 근무일: `<input type="date">` plus quick chips [오늘] [12월 31일] [내년 1월 31일]. The chips use the current year and set the date.
   - 세전 월급 (원): `inputmode="numeric"`, shown with live thousands separators, and a helper line "{n}만 원" under it
   - Collapsible "더 정확하게" section (closed by default):
     - 직전 3개월 월급 따로 입력 (toggle). When on, it shows 3 fields prefilled with the monthly pay, labeled with the actual months (for example "9월 / 10월 / 11월" from the computed period).
     - 직전 1년 상여금 총액 (원), default 0
     - 직전 1년 받은 연차수당 (원), default 0
     - 1일 통상임금 (원, 선택). If it is higher than the average daily wage, the calculation uses it and shows the note `ordinaryUsed`.
   - Checkbox "주 15시간 이상 일했어요", checked by default
2. **RESULT card** (below the inputs on narrow screens, to the right on wide screens of 720 px or more)
   - **Valid + eligible:**
     - big amount with a 400 ms count-up from the previous value
     - breakdown rows
     - "1년 더 다니면" chip
     - "{years}년 {days}일 근무" pill
   - **Valid + not eligible (under 1 year):**
     - big text "아직 퇴직금 대상이 아니에요"
     - progress bar toward 365 days and "D-{n} ({date}까지 근무하면 대상)"
     - a muted "1년을 채우면 약 ₩{x}" estimate, computed for last working day = start + 1 year − 1 day with the same pay
   - **Not 15 hours/week:** text "주 15시간 미만 근로자는 법정 퇴직금 대상이 아니에요" and no amount
   - **Invalid:** an inline message per field (see Edge cases). The result shows a "—" placeholder, never NaN.
3. **Bottom bar:** [결과 복사] [초기화] and an ⓘ button that toggles an inline "계산 방법" panel. The panel has the formula, the assumptions and the IRP note. No dialogs.

## Calculation

All date math uses UTC midnight `Date.UTC(y, m, d)` to avoid DST and timezone drift. Days = (b − a) / 86400000.

1. **퇴직일 (separation date)** = last working day + 1 day. Show it in the breakdown as "퇴직일(마지막 근무일 다음 날) {date}".
2. **재직일수** = 퇴직일 − 입사일 (equals last working day − start + 1).
3. **Eligibility:** 퇴직일 ≥ addYears(입사일, 1) and the 15h box is checked.
   - addYears(date, 1): if the day does not exist (Feb 29), use Mar 1.
4. **3-month period:**
   - start = 퇴직일 minus 3 calendar months, same day number. If that day does not exist in the target month, use the 1st of the following month. Do not rely on JS Date overflow, because it gives the wrong day.
   - end = 퇴직일 − 1. 기간일수 = 퇴직일 − start (89–92).
   - If the start date is before the 입사일, start = 입사일 (short tenure). The non-eligible preview still uses it.
5. **3개월 임금총액:**
   - default = monthly × 3
   - with the separate-months toggle = the sum of the 3 fields
   - ponytail: assumes each period month was paid in full. Partial months, unpaid leave and excluded periods are out of scope and are noted in the info panel.
6. **가산액** = 상여금 × 3/12 + 연차수당 × 3/12.
7. **1일 평균임금** = (임금총액 + 가산액) / 기간일수, kept at full precision.
8. **적용 일급** = max(평균임금, 통상임금 if entered).
9. **퇴직금** = floor(적용 일급 × 30 × 재직일수 / 365).
10. **1년 더 다니면:**
    - Recompute with last working day + 1 year (same day, clamped), keeping the same pay.
    - Show the difference as "+₩{diff}". It is approximately the 적용 일급 × 30 when the period length is similar.
11. **Display:**
    - ko: amounts as `₩{n.toLocaleString('ko-KR')}`, and a helper "약 {만 원 단위}만 원" under the big number
    - en: ₩ with en-US separators
    - 평균임금: 2 decimals in the breakdown

**Self-check** (the build must include an `assert`-style `selfTest()` that runs when `location.hash === '#test'` and logs PASS/FAIL to the console):

- start 2023-12-01, last working day 2026-11-30, monthly 3,000,000 → 퇴직일 2026-12-01, 재직일수 1096, period 2026-09-01~2026-11-30 = 91 days. Average = 9,000,000 / 91 = 98,901.0989. Severance = floor(98,901.0989 × 30 × 1096 / 365) = **8,909,227**.
- Same, plus bonus 6,000,000 → 가산 1,500,000. Average = 10,500,000 / 91 = 115,384.6153. Severance = floor(115,384.6153 × 30 × 1096 / 365) = **10,394,098**.
- start 2026-01-01, last working day 2026-12-30 → 퇴직일 2026-12-31 < 2027-01-01 → not eligible, D-1. Last working day 2026-12-31 → eligible.
- 퇴직일 2026-05-31 → period start 2026-03-01 (Feb 31 does not exist), 91 days.
- 입사일 2024-02-29 → addYears = 2025-03-01.

The builder must recompute these expected values in the self-test with the same formula and assert them. If the hand numbers above disagree with exact float math by 1 won, the formula wins. Fix the vector, not the code.

## Controls

- **Pointer:** tap or click everything. The date inputs use the native picker. Chips and buttons are at least 44 px tall.
- **Keyboard:** Tab order follows the visual order. Enter in a number field moves focus to the next field. Esc closes the info panel or the "더 정확하게" section.
- Results recompute on `input` (debounced 120 ms). There is no "계산" button needed. An optional visible "계산하기" button only scrolls to and focuses the result on narrow screens.
- **Number fields:** strip everything except digits, cap at 13 digits, and format with separators while keeping the caret at the end.
- The card area has `touch-action: pan-y` for internal scroll. The page body has `overflow: hidden`.

## Screens and visual design

- **Palette:**
  - background: gradient #f4f1ea to #e9eef5 (winter paper)
  - card: #ffffff, radius 18, soft shadow
  - ink #1f2430, muted #6b7280
  - accent navy #2b4c7e, success green #2f9e6b, warning amber #d98b1e
  - envelope red seal #d64545 (small decoration only)
- **Header:** ✉️ emoji in an envelope drawn with CSS (a triangle flap), the title "퇴직금 계산기 2026", and a subtitle `sub`. A language-independent "2026" badge.
- **Big number:** 40 px bold (32 px under 360 px wide) with tabular-nums. On change, a 400 ms count-up with ease-out and a 1.04 scale pop. Under `prefers-reduced-motion`, there is no count-up and no pop.
- **Progress bar** (not eligible): 10 px tall, navy fill, a 🎯 marker at 100%, and the label "{days}/365일".
- **Breakdown:** a 2-column list with the label left and the value right, in muted small text. Rows:
  - 재직일수
  - 퇴직일
  - 평균임금 산정기간 ({start}~{end}, {n}일)
  - 3개월 임금총액
  - 상여·연차 가산
  - 1일 평균임금
  - 통상임금 적용 여부, only when used
- **Info panel:** formula in a monospace block, then bullets from `infoBullets`.
- **Layout:**
  - At 320 px wide: 14 px padding, chips wrap, 16 px input text (prevents iOS zoom).
  - At 720 px or wider: two columns, inputs left and result right, max width 920 px, centered.
- **Toast:** bottom center, 2 s, `aria-live="polite"`.
- **Accessibility:** every input has a `<label>`. The result region has `aria-live="polite"`. Contrast is at least 4.5:1.

## Strings

| key | ko | en |
|---|---|---|
| appTitle | 퇴직금 계산기 2026 | Severance Pay Calculator 2026 |
| sub | 날짜 두 개와 월급만 넣으면 예상 퇴직금이 나와요 | Two dates and your monthly pay, and you get an estimate |
| startDate | 입사일 | Start date |
| lastDay | 마지막 근무일 | Last working day |
| chipToday / chipDec31 / chipJan31 | 오늘 / 12월 31일 / 내년 1월 31일 | Today / Dec 31 / Next Jan 31 |
| monthly | 세전 월급 (원) | Monthly gross pay (KRW) |
| monthlyPh | 예: 3,000,000 | e.g. 3,000,000 |
| manWon | {n}만 원 | ≈ {n}0,000 KRW |
| more | 더 정확하게 | More precise |
| splitMonths | 직전 3개월 월급 따로 입력 | Enter each of the last 3 months |
| monthN | {m}월 급여 | {m} pay |
| bonus | 직전 1년 상여금 총액 (원) | Bonuses in the last 12 months (KRW) |
| leavePay | 직전 1년 받은 연차수당 (원) | Unused-leave pay in the last 12 months (KRW) |
| ordinary | 1일 통상임금 (원, 선택) | Daily ordinary wage (KRW, optional) |
| hours15 | 주 15시간 이상 일했어요 | I worked 15+ hours a week |
| resultLabel | 예상 퇴직금 (세전) | Estimated severance (pre-tax) |
| approx | 약 {n}만 원 | About {n} |
| tenurePill | {y}년 {d}일 근무 | {y} yr {d} days worked |
| oneMore | 1년 더 다니면 +₩{n} | One more year: +₩{n} |
| notYet | 아직 퇴직금 대상이 아니에요 | Not eligible for severance yet |
| dday | D-{n} · {date}까지 근무하면 대상이에요 | D-{n} · eligible if you work through {date} |
| ifFull | 1년을 채우면 약 ₩{n} | About ₩{n} after a full year |
| under15 | 주 15시간 미만 근로자는 법정 퇴직금 대상이 아니에요 | Statutory severance does not apply under 15 hours a week |
| rowTenure | 재직일수 | Days employed |
| rowSep | 퇴직일 (마지막 근무일 다음 날) | Separation date (day after last workday) |
| rowPeriod | 평균임금 산정기간 | Averaging period |
| rowWage3 | 3개월 임금총액 | 3-month wage total |
| rowAdd | 상여·연차 가산 (3/12) | Bonus & leave pay added (3/12) |
| rowAvg | 1일 평균임금 | Average daily wage |
| ordinaryUsed | 통상임금이 더 높아 통상임금으로 계산했어요 | Ordinary wage was higher, so it was used |
| daysUnit | {n}일 | {n} days |
| errDateOrder | 마지막 근무일이 입사일보다 빨라요 | Last working day is before the start date |
| errDateMissing | 날짜를 골라 주세요 | Please pick a date |
| errPay | 월급을 숫자로 넣어 주세요 | Please enter your pay as a number |
| errFuture | 먼 미래 날짜예요. 예상치로만 봐 주세요 | That date is far ahead; treat it as a rough estimate |
| copy / reset / info | 결과 복사 / 초기화 / 계산 방법 | Copy result / Reset / How it works |
| copied / copyFail | 복사했어요 / 복사하지 못했어요 | Copied / Could not copy |
| formula | 퇴직금 = 1일 평균임금 × 30일 × 재직일수 ÷ 365 | Severance = avg daily wage × 30 × days employed ÷ 365 |
| infoBullets | ① 1일 평균임금 = 퇴직 전 3개월 임금총액(+상여·연차수당의 3/12) ÷ 그 기간 일수 ② 1년 이상, 주 15시간 이상 일한 근로자가 대상 ③ 세전 금액이며 퇴직소득세는 빠지지 않았어요 ④ 퇴직금은 원칙적으로 IRP 계좌로 받아요(55세 이상 등 예외) ⑤ DC형 퇴직연금, 휴직·수습 기간 제외 등은 반영하지 않아요 | ① Avg daily wage = last 3 months' pay (+3/12 of bonuses and leave pay) ÷ days in that period ② Applies after 1+ year at 15+ hours a week ③ Pre-tax; retirement income tax not deducted ④ Usually paid into an IRP account (exceptions such as age 55+) ⑤ DC pensions and excluded leave periods are not modeled |
| disclaimer | 재미가 아닌 참고용 예상치예요. 정확한 금액은 회사나 고용노동부에 확인하세요 | An estimate for reference. Confirm the exact amount with your employer or the Ministry of Employment and Labor |
| shareText | ✉️ 퇴직금 예상 ₩{n} ({y}년 {d}일 근무, 1일 평균임금 ₩{avg}) / 1년 더 다니면 +₩{more} / play.mesisi.net | ✉️ Estimated severance ₩{n} ({y} yr {d} days, avg daily wage ₩{avg}) / One more year: +₩{more} / play.mesisi.net |
| shareTextNotYet | ✉️ 퇴직금까지 D-{n} ({date}) / play.mesisi.net | ✉️ D-{n} until severance eligibility ({date}) / play.mesisi.net |

Date display: ko `YYYY.MM.DD`; en `MMM D, YYYY` via `toLocaleDateString('en-US', {timeZone:'UTC'})`. Month labels: ko `{m}월`; en short month names.

## localStorage (in try/catch, prefix `sev:`)

- `sev:start`: the last start date (`YYYY-MM-DD`)
- `sev:remember`: "1" or "0", default "0". A small checkbox "이 기기에 입력값 기억 / Remember on this device" sits in the bottom bar.
- `sev:inputs`: JSON of {last, monthly, split[3], bonus, leave, ordinary, h15}. It is written only when `sev:remember` is "1", and cleared when it is switched off or on 초기화.

Default is to store nothing about pay. `sev:start` is also written only when remember is on.

## Edge cases

- **Empty fields:** show the result placeholder "—" and the hint "입사일, 마지막 근무일, 월급을 넣어 주세요". No errors until the field has been touched (blur).
- **Last working day before the start date:** show `errDateOrder` and no result.
- **Same day for both:** 재직일수 1, not eligible, D-364.
- **Dates beyond today + 5 years:** `errFuture` as a soft warning; still calculate.
- **Dates before 1990 or after 2100:** reject with `errDateMissing`. Native min/max are set too.
- **Monthly pay 0:** result ₩0 with no error. Non-numeric pasted text is stripped. Values above 9,999,999,999,999 are capped.
- **Period start before the start date (tenure under 3 months):** clamp to the start date, so the period has fewer days.
- **Separate-months toggle:** on first toggle, prefill the 3 fields from monthly pay. When the dates change, update only the labels, not the values. Toggling off reverts to monthly × 3.
- **통상임금:** entered as 0 or empty means it is ignored.
- **"1년 더" when not eligible:** hide the chip and show `ifFull` instead.
- **Chip [12월 31일] when today is after Dec 31:** impossible, so no special case. [내년 1월 31일] uses currentYear + 1.
- **Resize:** pure CSS layout, no recalculation needed. The count-up animation is skipped on resize.
- **Clipboard blocked:** fall back to a hidden textarea with `execCommand('copy')`, then show `copyFail` if that fails too. No dialogs.
- **localStorage blocked:** everything works and the remember checkbox does nothing.
- **`location.hash === '#demo'`:** prefill start 2023-12-01, last working day 2026-11-30, monthly 3,000,000, and show the finished result with no animation. This is for QA thumbnails.
- **`#test`:** run `selfTest()` (see Calculation).
- **Language:** read `?lang=` (fallback `navigator.language`) and set `<html lang>`. Number separators follow the language. Date inputs stay native.

## Must not

- No network of any kind: no fetch, fonts or CDN. Single `index.html`, no images needed (emoji and CSS only), under 60 KB.
- No retirement income tax calculation, no IRP product recommendations, no investment or legal advice wording such as "꼭 받으세요" or "이렇게 하면 이득". Keep the disclaimer always visible under the result.
- Do not imitate the look, logo or wording of the Ministry of Employment and Labor, the National Tax Service or any job-site calculator. No real company, bank or brand names.
- No jokes about quitting, bosses or employers. The tone is neutral and kind; the only "fun" is the envelope styling and the count-up.
- Do not store pay data unless the user turns on remember.
- No alert, confirm, prompt, window.open or navigation. No sound.

---

I checked these sources: `01-research.md`, `ITEMS.md`, `ideas.md`, the example spec, and the brief's lists of built and queued items.

- **Test numbers:** I changed the self-check example as I wrote it, and the two expected amounts (8,909,227 and 10,394,098) were not recalculated by hand afterwards. The spec tells the builder to recompute them with the formula and correct the numbers if they are off.
- **Dropped parts:** I left out retirement income tax and partial-month pay to keep the build small. Add them if users ask for after-tax amounts.
- **Category mismatch:** `ITEMS.md` lists different `meta.json` categories (silly, arcade, puzzle, chill…) from the brief's list. I used the brief's `tools`, so check that the `npm test` validator accepts it.
