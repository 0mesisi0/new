# Idea and spec: 연금저축 IRP 세액공제 계산기 2026 / Pension Savings Tax Credit Calculator 2026

Agent: Claude (opus), planner. Design notes are merged in (palette, layout, motion).

## Concepts scored

Each concept is scored 1–5 on four things: value in the first 10 seconds, originality, Korean search/share demand, and buildability in one HTML file. Maximum 20.

| Concept | Category | Score | Verdict |
|---|---|---|---|
| 반려돌 겨울나기: an MS Paint-style pet rock to dress up for winter, following the Dog Online trend | weird | 3/4/2/5 = 14 | Shares poorly in Korea. The 2000s-web look could be a style for a later item. |
| 동지까지 밤 길이 시계: a countdown to the longest night with tonight's day length | info | 3/3/3/4 = 13 | Too close to `winter-shadow-lab` (sun) and `dongji-dumpling-puzzle` (동지) |
| **연금저축·IRP 막판 세액공제 계산기** | **tools** | **5/4/5/5 = 19** | **Picked.** People search 연말정산 hard in Nov–Dec, and the 12/31 deadline makes it urgent. The site has no tax or pension item yet. The result is one clear number: "₩X more refund if you add ₩Y by 12/31." |

Duplicate check: the subject is pension and tax credit, which no item or queued spec covers. `stacked-discount-calculator` is about shopping discounts and `annual-leave-bridge` is about leave days, so neither overlaps.

## Meta

- slug `pension-tax-credit-2026`, category `tools`, kind `tool`, aspect `3/4`, date `2026-11-26`
- tags: ko `연말정산`, `연금저축`, `IRP`, `세액공제`; en `tax-credit`, `pension`, `year-end-tax`
- title: ko `연금저축 IRP 세액공제 계산기 2026`; en `Pension Savings Tax Credit Calculator 2026`
- desc ko: 올해 연금저축·IRP에 넣은 돈을 입력하면 지금 받을 세액공제와 남은 한도를 보여 줘요. 12월 31일까지 얼마를 더 넣으면 환급이 얼마나 늘어나는지 바로 계산합니다.
- desc en: Enter what you paid into Korean pension savings and IRP this year to see your tax credit, your remaining limit, and how much more refund a top-up before Dec 31 would bring.
- howto ko: 총급여 구간을 고르고 올해 연금저축과 IRP 납입액을 만 원 단위로 넣으세요. 아래 슬라이더로 12월 추가 납입액을 정하면 늘어나는 환급액이 바로 보여요. 홈택스 미리보기의 예상 결정세액을 넣으면 더 정확해져요.
- howto en: Pick your salary bracket and enter this year's pension savings and IRP payments in units of 10,000 won. Drag the slider to set a December top-up and see the extra refund. Adding your expected tax from the Hometax preview makes the result more accurate.
- about ko: 2026년 귀속 연말정산 기준(연금저축 600만 원, IRP 합산 900만 원, 공제율 16.5%/13.2%, 지방소득세 포함)으로 계산한 참고용 추정치예요. 실제 환급액은 다른 공제와 결정세액에 따라 달라지니 홈택스에서 꼭 확인하세요. 입력한 금액은 이 기기 밖으로 나가지 않아요.
- about en: This is an estimate based on Korea's 2026 tax-year rules: 6M won for pension savings, 9M won combined with IRP, and a 16.5% or 13.2% credit rate including local income tax. Your actual refund depends on your other deductions and your final tax, so check Hometax. Your numbers never leave this device.

## Pitch

The screen is a calm winter-night card with a big gauge bar labeled "900만 원 한도". The user types two numbers and the bar fills: blue for 연금저축 and green for IRP. A striped amber block shows the December top-up chosen with the slider. The headline updates live:

> **12월 31일까지 300만 원 더 넣으면 환급 +49만 5천 원**

A D-day chip shows how many days are left to 12/31. The tool answers one question in under 10 seconds: "How much should I top up, and what do I get for it?"

## Rules (2026 tax year, hardcoded constants)

| const | value | note |
|---|---|---|
| `PENSION_CAP` | 600 (만원) | Credit limit for 연금저축 alone |
| `TOTAL_CAP` | 900 (만원) | Combined credit limit for 연금저축 and IRP. DC personal top-ups go in the IRP field. |
| `PAY_CAP` | 1,800 (만원) | Combined yearly payment limit. Not a credit limit. |
| `RATE_LOW` | 0.165 | 총급여 ≤ 5,500만 원 (or 종합소득금액 ≤ 4,500만 원). That is 15% plus 1.5% local tax. |
| `RATE_HIGH` | 0.132 | Above that bracket. That is 12% plus 1.2% local tax. |
| `DEADLINE` | 2026-12-31 | Last payment date that counts for this tax year |

Math (all inputs in 만원, display in 원):

- `p = clamp(pension, 0, 99999)` and `i = clamp(irp, 0, 99999)`
- `eligibleNow = min(min(p, PENSION_CAP) + i, TOTAL_CAP)`
- `room = TOTAL_CAP − eligibleNow`
- `payRoom = max(0, PAY_CAP − p − i)`
- `sliderMax = min(room, payRoom)`. The slider step is 10 (만원). If `sliderMax` is 0, the slider is disabled and the room-full message is shown.
- `extra` is the slider value. It is assumed to go to IRP, because IRP always fits in the remaining 900 room while 연금저축 may hit its 600 cap.
- `eligibleAfter = min(eligibleNow + extra, TOTAL_CAP)`
- `creditNow = round(eligibleNow × 10000 × rate)` and `creditAfter = round(eligibleAfter × 10000 × rate)`
- If `taxDue` is entered (optional, in 원): `creditNow = min(creditNow, taxDue)` and `creditAfter = min(creditAfter, taxDue)`. When the cap bites, show the `capHit` warning.
- `gain = creditAfter − creditNow`
- Default slider value = `sliderMax`, so the headline shows the full potential first.
- Rounding: credits are rounded to whole won. The headline uses a friendly format such as "49만 5천 원" (ko) or "₩495,000" (en).

Ponytail: ISA maturity transfers (the extra 300 limit) and the 종합소득 detail are not modeled. A footnote mentions them. Add them if users ask.

## Flow

One screen, with no steps and no start button. A tool needs no game loop.

1. **Header:** the title, the D-day chip "12/31까지 D-35", and the 🔊-free top bar. This tool has no sound and no mute toggle.
2. **Bracket toggle:** two big segmented buttons, [총급여 5,500만 원 이하 · 16.5%] [초과 · 13.2%]. The default is the low bracket.
3. **Inputs:**
   - 연금저축 납입액 (만원)
   - IRP 납입액 (만원)
   - "더 정확하게" disclosure. Collapsed, it holds 예상 결정세액 (원) with a hint to check the 홈택스 연말정산 미리보기.
4. **Gauge:**
   - A horizontal bar from 0 to 900. A tick mark at 600 is labeled "연금저축 한도 600".
   - Segments: blue for `min(p,600)`, green for `i` (clipped to 900), striped amber for `extra`, and gray for empty.
   - If `p > 600`, a faint blue overflow stub sits beyond the 600 tick, labeled "공제 안 되는 600 초과분" (`overPension`). It is only shown when there is room for it.
5. **Slider:** "12월 추가 납입" runs from 0 to `sliderMax`. The thumb is at least 44 px. Two quick chips: [한도 꽉 채우기] [0원].
6. **Result card:**
   - Headline: the `gain` sentence.
   - Rows: 지금 예상 공제 ₩creditNow, 추가 후 공제 ₩creditAfter, 남은 공제 한도 ₩room.
   - The number counts up over 300 ms on change. With reduced motion it is instant.
7. **Footer:**
   - [결과 복사] [초기화]
   - The disclaimer line and the footnote about ISA and the 종합소득 bracket

States the result card can show:

- `room == 0`: the headline becomes `fullHead`, "공제 한도를 꽉 채웠어요 🎉", with a small confetti burst once (skipped with reduced motion).
- `p + i == 0`: the headline becomes `emptyHead` and the slider default still shows the 900 potential.
- After the deadline (today > 2026-12-31): the D-day chip becomes `pastDeadline` (gray) and the headline changes to the "for reference" wording `pastHead`.

## Controls

- **Pointer:** tap the toggle, inputs, slider and chips.
- **Keyboard:** Tab order follows the layout. Arrow keys move the slider by 10 and PageUp/PageDown by 100. Enter in an input moves focus to the next field. Alt+C copies.
- **Inputs:** `inputmode="numeric"`, digits only. Commas are added on blur and stripped on focus. Paste such as "3,000,000원" is sanitized to digits. If the value is ≥ 10,000 and the field is in 만원, show the hint `unitHint` "만 원 단위예요 (300 = 300만 원)", but do not auto-convert.
- **Layout:** the page never scrolls. The content column (max 480 px) scrolls internally if needed (`overflow:auto`, `touch-action:pan-y`). Only the slider has `touch-action:none`.

## Visual design

- **Palette:**
  - background: a gradient from #14213d to #1f3a5f with a few static, slowly twinkling dots, about 20, drawn in CSS
  - card #fdfcf8, ink #1c2230, gray #7b8494
  - 연금저축 #3b82f6, IRP #10b981, extra amber #f59e0b with 45° stripes, empty #e5e7eb, warning #e0453d
- **Type:** system-ui. Numbers use `font-variant-numeric: tabular-nums`. Headline 22–26 px bold (clamp), labels 14 px.
- **Gauge:** height 28 px with rounded ends. Segment widths animate over 200 ms.
- **D-day chip:** an amber pill. In the last 7 days it turns red with a gentle pulse (no pulse with reduced motion).
- **Small screens:** at 320 px wide, use 14 px padding. The toggle labels wrap onto two lines and the gauge labels move below the bar.
- **Wide screens:** a centered card, max 480 px wide.
- **Screenshot-ready:** the default state already shows a filled demo-like gauge only via `#demo`. Otherwise the inputs are empty and the gauge shows the "최대 148만 5천 원" potential.

## Strings

| key | ko | en |
|---|---|---|
| appTitle | 연금저축 IRP 세액공제 계산기 2026 | Pension Savings Tax Credit Calculator 2026 |
| sub | 12월 31일까지 얼마 더 넣으면 얼마 돌려받을까? | Top up before Dec 31: how much comes back? |
| dday | 12/31까지 D-{n} | {n} days left until Dec 31 |
| ddayToday | 오늘이 납입 마감일이에요 | Today is the last day to pay in |
| pastDeadline | 2026년 납입 마감이 지났어요 | The 2026 payment deadline has passed |
| bracketLow | 총급여 5,500만 원 이하 · 16.5% | Salary ≤ ₩55M · 16.5% |
| bracketHigh | 총급여 5,500만 원 초과 · 13.2% | Salary > ₩55M · 13.2% |
| bracketHint | 근로소득 외 종합소득만 있다면 종합소득금액 4,500만 원 기준이에요 | Without a salary, the line is ₩45M of total income |
| pension | 올해 연금저축 납입액 | Pension savings paid this year |
| irp | 올해 IRP 납입액 | IRP paid this year |
| irpHint | 퇴직연금 DC 개인 추가 납입도 여기에 넣으세요 | Include personal top-ups to a DC plan here |
| unit | 만 원 | × ₩10,000 |
| unitHint | 만 원 단위예요 (300 = 300만 원) | Units of ₩10,000 (300 = ₩3M) |
| more | 더 정확하게 | More accurate |
| taxDue | 예상 결정세액 (원, 선택) | Expected final tax (₩, optional) |
| taxDueHint | 홈택스 연말정산 미리보기에서 확인할 수 있어요 | Find it in the Hometax year-end tax preview |
| capLabel | 공제 한도 900만 원 | Credit limit ₩9M |
| pensionTick | 연금저축 한도 600 | Pension savings cap 600 |
| overPension | 공제 안 되는 600 초과분 | Above 600: not credited |
| slider | 12월 추가 납입 (IRP) | December top-up (IRP) |
| fillChip / zeroChip | 한도 꽉 채우기 / 0원 | Fill the limit / ₩0 |
| head | 12월 31일까지 {x} 더 넣으면 환급 +{y} | Add {x} by Dec 31 for +{y} back |
| headZero | 추가 납입을 정하면 늘어나는 환급이 보여요 | Set a top-up to see the extra refund |
| pastHead | 참고: {x} 더 넣었다면 +{y} | For reference: {x} more would have meant +{y} |
| fullHead | 공제 한도를 꽉 채웠어요 🎉 | You've filled the limit 🎉 |
| emptyHead | 최대 {y}까지 돌려받을 수 있어요 | You could get up to {y} back |
| rowNow | 지금 예상 공제 | Credit so far |
| rowAfter | 추가 후 공제 | Credit after top-up |
| rowRoom | 남은 공제 한도 | Limit left |
| capHit | 결정세액보다 많이 공제받을 수는 없어요. {t}에서 멈췄어요 | The credit can't exceed your tax. Capped at {t}. |
| payCapHit | 연간 납입 한도 1,800만 원에 닿았어요 | You've hit the ₩18M yearly payment limit |
| copy / reset | 결과 복사 / 초기화 | Copy result / Reset |
| copied / copyFail | 복사했어요 / 복사하지 못했어요 | Copied / Could not copy |
| disclaimer | 2026년 귀속 기준 참고용 추정치예요. 실제 환급은 홈택스에서 확인하세요. | An estimate for the 2026 tax year. Confirm your refund on Hometax. |
| footnote | ISA 만기 전환 추가 한도, 중도 해지 시 기타소득세는 계산에 넣지 않았어요 | Not included: the extra limit for ISA transfers, or tax on early withdrawal |
| lockNote | IRP는 55세 전에 꺼내기 어렵고, 연금저축도 중도 인출 시 세금이 붙어요 | IRP is hard to withdraw before 55, and early pension withdrawals are taxed |

Copy text:

- ko: 💰 2026 연금저축·IRP 세액공제 / 지금 {creditNow} → {extra} 더 넣으면 {creditAfter} (+{gain}) / 남은 한도 {room} / D-{n} / play.mesisi.net
- en: 💰 2026 pension tax credit / now {creditNow} → top up {extra} for {creditAfter} (+{gain}) / limit left {room} / {n} days left / play.mesisi.net
- Clipboard: use `navigator.clipboard.writeText`, falling back to a hidden textarea and `execCommand('copy')`. Show a toast on success or failure.

Number format:

- ko: under 1만 → "8,250원". Otherwise "{만}만 {천}천 원", dropping zero parts ("148만 5천 원", "49만 5천 원"). In the gain headline, round the 천 part down and the sub-천 remainder to the nearest 천.
- en: "₩1,485,000".

## localStorage (in try/catch, prefix `ptc:`)

- `ptc:bracket`: "low" or "high"
- `ptc:inputs`: JSON `{p, i, tax}` so a returning visitor sees their numbers. These stay on this device only.
- "초기화" clears both keys and resets the UI to the defaults.

If storage is blocked, the tool works and simply forgets.

## Edge cases

- Empty or invalid input counts as 0. Negative numbers are impossible (digits only). Clamp to 99,999 (만원).
- `p > 600` with `i = 0`: eligible is 600, room is 300, and the gauge shows the overflow stub.
- `p + i ≥ 1,800`: `payRoom` is 0, the slider is disabled, and `payCapHit` is shown.
- `room > 0` but `payRoom < room` (for example p = 1,500, i = 200): the slider max is `payRoom`, and `payCapHit` appears when the slider is at max.
- `taxDue` is 0 or smaller than `creditNow`: `gain` is 0 and the `capHit` warning is shown. The headline does not promise money.
- Bracket toggle: recompute instantly and keep the slider value, clamped.
- D-day uses the local date. `n = ceil((2026-12-31 23:59:59 − now) / day)`. On the day itself show `ddayToday`, and after it show `pastDeadline`. Recompute once a minute and on `visibilitychange`.
- Resize: pure CSS layout, so nothing needs recomputing apart from the gauge label collision check.
- `location.hash === '#demo'`: prefill low bracket, p = 300, i = 100 and slider = 500, then render. This is for QA thumbnails only and is not saved to storage.
- `?lang=en`: same KRW math. English labels explain that this is for Korea's tax system.

## Must not

- No network, no `fetch`, no external fonts. Stay under 60 KB.
- Do not imitate the look, logo or wording of 국세청, 홈택스 or any bank or brokerage. Do not name real financial products or companies.
- No investment advice. Do not recommend a product, an account or a percentage of income. The tool only computes the credit and states the withdrawal lock-in plainly (`lockNote`).
- Do not claim the result is exact. The disclaimer is always visible near the result.
- Do not store anything except the keys above. No analytics.
- No alert, confirm, prompt, window.open or navigation. No sound.
- Do not auto-convert units or silently change user input beyond stripping non-digits.

## Sources (rules checked 2026-11-26)

- [KB자산운용: 연금 세액공제 가이드](https://kbam.co.kr/pension/guide/pension-tax-deduction-refund-guide) gives the 5,500만 원 bracket and the 16.5%/13.2% rates.
- [2026 연금저축 세액공제 한도 총정리](https://wikidocs.net/blog/@Insight_Lab/20821/) gives the 600/900 limits.
- [900만 원 넣으면 얼마 환급 (2026)](https://wikidocs.net/blog/@TaxSave/25192/) confirms the 148만 5천 원 maximum.
- [연말 막판 납입 조건 (2026)](https://wikidocs.net/blog/@TaxSave/32935/) covers paying in by the 12/31 deadline.
- From 01-research.md: [korea.kr 연말정산 미리보기](https://www.korea.kr/news/policyNewsView.do?newsId=148974171).
- Some sources quote 15%/12%. Those are the national-tax-only rates, and adding 10% local income tax gives 16.5%/13.2%. I found no official 국세청 page for the 2026 tax year, so the builder should check the constants against 국세청 before publishing.
