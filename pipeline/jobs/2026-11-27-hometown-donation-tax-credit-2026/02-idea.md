# Idea and spec: 고향사랑기부 세액공제 계산기 2026 / Hometown Donation Tax Credit Calculator 2026

Agent: Claude (opus), planner. Design notes are merged in (palette, layout, motion).

## Concepts scored

Scores are 1–5 for: value in the first 10 seconds, originality, Korean search/share demand, and buildability in one HTML file. Maximum 20.

| Concept | Category | Score | Verdict |
|---|---|---|---|
| 만원 지하철 손잡이 버티기 / Hold the Strap: 급정거·커브에 맞춰 손잡이를 잡고 버티는 균형 게임 | games | 4/4/3/4 = 15 | 재미는 있지만 겨울·연말과 연결이 약함. 나중에 출근길 시리즈로 보관 |
| 대설 눈 무게 저울 / How Heavy Is Snow?: 눈 종류와 쌓인 높이로 지붕·차 위 눈 무게 비교 | learn | 3/4/3/4 = 14 | 12/7 대설 당일 공개용. 숫자 근거를 따로 조사해야 함 |
| **고향사랑기부 세액공제 계산기 2026** | **tools** | **4/3/5/5 = 17** | **채택**: 12/31 마감 전 "10만 원 내면 10만 원 돌려받는다"는 검색이 해마다 몰림. 이미 계획된 연말정산 계산기(카드, 의료비, 월세, 연금)와 다루는 대상이 다름. 결과가 한 줄로 바로 보임 |

중복 확인: pension, card-deduction, medical, monthly-rent는 기부금을 다루지 않음. 고향사랑기부를 주제로 한 항목이나 대기 스펙은 없음.

## Meta

- slug `hometown-donation-tax-credit-2026`, category `tools`, kind `tool`, aspect `3/4`, date `2026-11-27`
- tags: ko `고향사랑기부제`, `세액공제`, `연말정산`; en `hometown-donation`, `tax-credit`, `year-end-tax`
- title: ko `고향사랑기부 세액공제 계산기 2026`; en `Hometown Donation Tax Credit Calculator 2026`
- desc ko: 고향사랑기부금을 얼마 내면 세금이 얼마나 돌아오고 답례품은 얼마어치인지 바로 계산해요. 10만 원, 20만 원 구간별 공제율과 실제 부담액을 한눈에 볼 수 있어요.
- desc en: See how much tax you get back from a Korean hometown donation and what the 30% thank-you gift is worth. It shows the credit for each bracket and what the donation really costs you.
- howto ko: 올해 기부할(또는 이미 한) 금액을 입력하거나 빠른 버튼(10만·20만·30만·50만·100만)을 누르세요. 결정세액을 알면 넣어 보세요. 공제는 낼 세금보다 커질 수 없어요. 답례품을 받을지 켜고 끄면 실제 부담액이 바뀌어요.
- howto en: Type this year's donation total or tap a quick amount (100k to 1M won). If you know your income tax due, enter it, because the credit can't be more than the tax you owe. Toggle the thank-you gift to see your real cost.
- about ko: 2026년 기부분, 2027년 1월 연말정산 기준이에요. 공제율은 10만 원까지 100%, 10만 원 초과 20만 원까지 44%, 20만 원 초과분은 16.5%(지방소득세 포함)예요. 2027년 기부분부터는 지역별 차등 공제가 추진 중인데, 아직 국회에서 확정되지 않았어요. 정확한 금액은 국세청 연말정산 간소화 서비스(1월 중순 개통)에서 확인하세요. 입력한 숫자는 이 기기 밖으로 나가지 않아요.
- about en: This uses the rules for 2026 donations, which are settled in the January 2027 year-end tax filing: 100% up to 100,000 won, 44% from 100,000 to 200,000 won, and 16.5% above that (local income tax included). Region-based rates for 2027 donations have been proposed but not yet passed. Check exact figures in the NTS year-end tax service (opens mid-January). Your numbers never leave this device.

## Pitch

A warm paper "기부 영수증 봉투" card sits on a soft winter-countryside background with snow on rooftops, drawn in CSS.

1. The page opens with 100,000 won already entered, so the first screen shows the hook: "10만 원 기부 → 세금 10만 원 돌려받고 + 답례품 3만 원어치".
2. The user changes the amount with quick chips, a slider or typing. The numbers update live, with no submit button.
3. A stacked bar shows the donation split into "돌려받는 세금", "답례품" and "내 실제 부담".
4. A small table compares the efficiency of common amounts, so people see why 10만 원 is the sweet spot.
5. "결과 복사" copies a short text summary to share.

## Flow

The tool has a single screen and no game loop. Its sections are:

1. **Header:** the title, one-line subtitle, a "2026년 기부분 기준" badge and a D-day chip "올해 마감 D-{n} (12/31)". After 12/31 the chip reads "2026년분 마감됨".
2. **Input card**
   - Amount field (number, `inputmode="numeric"`, comma-formatted on blur), ending in "원".
   - Quick chips: 10만, 20만, 30만, 50만, 100만, 500만, 2,000만(한도). A tap sets the total.
   - Slider from 0 to 2,000,000 in 10,000 steps, with a non-linear map so the 0–500k range takes 60% of the track. Typed amounts above 2M go beyond the slider; the slider pins to its max and the field stays authoritative.
   - Optional "올해 결정세액(소득세)" field with a help line: "모르면 비워 두세요".
   - Toggle: "답례품 받기 (기부액의 30%)", default on.
3. **Result card** (live):
   - Big line: "돌려받는 세금 ₩{credit}" plus "기부액의 {rate}%".
   - Sub lines: 소득세 공제 ₩{it} / 지방소득세 공제 ₩{lt}.
   - "답례품 ₩{gift}어치" (hidden when the toggle is off).
   - "내 실제 부담 ₩{net}", shown in green with "이득 ₩{x}" when net < 0.
   - Stacked bar for the three parts.
   - A warning row when the credit is capped by tax or the amount is clamped (see Edge cases).
4. **Bracket table:** 3 rows (≤10만 / 10만~20만 / 20만 초과), each showing the rate and the user's amount in that bracket. The row the user's last won falls in is highlighted.
5. **Comparison table:** amounts 10만, 20만, 30만, 50만, 100만 with credit, gift, net and "환급률". It ignores the tax cap and uses the gift toggle. It is a static compute and stays visible. Tapping a row sets that amount.
6. **Notes** (collapsible `<details>`, closed by default): eligibility rules, the 2027 proposal note and the NTS check notice.
7. **Bottom bar:** [결과 복사] [초기화].

## Calculation (2026 donations)

All amounts are integer won. D = donation total, clamped to [0, 20,000,000].

- b1 = min(D, 100,000)
- b2 = min(max(D − 100,000, 0), 100,000)
- b3 = max(D − 200,000, 0)
- Income tax credit IT = floor(b1 × 100/110) + floor(b2 × 0.40) + floor(b3 × 0.15)
- If tax due T is entered and is ≥ 0: IT = min(IT, T), and set capped = true when this lowers IT.
- Local income tax credit LT = floor(IT × 0.10)
- credit = IT + LT
  - Check: D = 100,000 gives 90,909 + 9,090 = 99,999. Display it as 100,000 by computing the b1 part as b1 directly: the ≤10만 part gives IT₁ = round(b1/1.1) and LT₁ = b1 − IT₁, so the total is exactly b1. Implement it this way, without the generic floor, for that bracket.
  - Final formulas: IT = IT₁ + floor(b2×0.40) + floor(b3×0.15), then LT = LT₁ + floor((floor(b2×0.40) + floor(b3×0.15)) × 0.10). Apply the cap to IT first, then recompute LT proportionally as floor(LT × IT_capped / IT_uncapped).
- gift = toggle ? floor(D × 0.30) : 0
- net = D − credit − gift
- rate = credit / D × 100, with one decimal, and "–" when D = 0.
- Self-check values (run `selfTest()` on load when `#test` is in the hash, and log ok/fail to the console):
  - D=100,000 gives credit 100,000, gift 30,000, net −30,000
  - D=200,000 gives credit 144,000, gift 60,000, net −4,000
  - D=500,000 gives credit 193,500, gift 150,000, net 156,500
  - D=0 gives everything 0
  - D=30,000,000 is clamped to 20,000,000 and shows the warning

## Controls

- **Pointer:** tap chips, rows, the toggle and buttons, and drag the slider. Every target is at least 44 px.
- **Keys:** digits type into the focused field. ArrowUp/ArrowDown in the amount field change it by ±10,000 (±100,000 with Shift). Enter blurs and formats the field. `C` outside inputs copies. `Esc` closes the notes.
- **Scrolling:** the page never scrolls. The main column scrolls internally (`overflow-y:auto`, `touch-action:pan-y`). On heights ≥ 760 px everything fits without scrolling.

## Visual design

- **Palette:**
  - background: a gradient from #eef3f7 to #dfe8ef, with CSS snow-roof silhouettes in #ffffff and #c9d6e2 at the bottom
  - card #fffdf8, ink #22303c, muted #7b8794
  - tax-back blue #2f6fdc, gift orange #f08a24, net gray #9aa5b1, gain green #1f9d6b, warning #d9822b
- **Type:** system-ui. Numbers use `font-variant-numeric: tabular-nums`. The big result is 32 px bold, clamped down to 26 px at 320 px wide.
- **Feedback:** on a value change, the big number counts up or down over 250 ms (easeOutCubic), bar segments animate width over 200 ms, and a chip press pops to scale 0.96 and back.
- **Layout:** a centered column with a max width of 520 px and 16 px side padding. Option chips wrap.
- **prefers-reduced-motion:** no count animation and no bar transition.
- **Sound:** none.

## Strings

| key | ko | en |
|---|---|---|
| appTitle | 고향사랑기부 세액공제 계산기 2026 | Hometown Donation Tax Credit Calculator 2026 |
| sub | 얼마 내면 얼마 돌아올까? 금액만 넣으면 바로 계산돼요 | How much comes back? Enter an amount and see it instantly. |
| badge | 2026년 기부분 기준 | For 2026 donations |
| dday / closed | 올해 마감 D-{n} (12/31) / 2026년분 마감됨 | Deadline in {n} days (Dec 31) / 2026 window closed |
| ddayToday | 오늘 마감! | Last day today! |
| amountLabel | 올해 기부 총액 | Total donated this year |
| won | 원 | won |
| chipMax | 2,000만(한도) | 20M (max) |
| taxLabel | 올해 결정세액(소득세), 선택 | Income tax due this year (optional) |
| taxHelp | 모르면 비워 두세요. 공제는 낼 세금보다 클 수 없어요 | Leave blank if unsure. The credit can't exceed the tax you owe. |
| giftToggle | 답례품 받기 (기부액의 30%) | Take the thank-you gift (30% of donation) |
| creditBig | 돌려받는 세금 | Tax you get back |
| ofDonation | 기부액의 {rate}% | {rate}% of your donation |
| itLine / ltLine | 소득세 공제 / 지방소득세 공제 | Income tax credit / Local income tax credit |
| giftLine | 답례품 {gift}원어치 | Gift worth {gift} won |
| netLine | 내 실제 부담 | Your real cost |
| gainLine | 오히려 {x}원 이득 | You come out {x} won ahead |
| bar1 / bar2 / bar3 | 세금 환급 / 답례품 / 실제 부담 | Tax back / Gift / Real cost |
| bracketTitle | 구간별 공제율 | Credit by bracket |
| br1 / br2 / br3 | 10만 원까지 100% / 10만 원 초과~20만 원 44% / 20만 원 초과 16.5% | Up to 100k: 100% / 100k–200k: 44% / Over 200k: 16.5% |
| brNote | 지방소득세 포함 비율이에요 | Rates include local income tax |
| compareTitle | 금액별 비교 | Compare amounts |
| colAmt / colCredit / colGift / colNet / colRate | 기부액 / 환급 / 답례품 / 실부담 / 환급률 | Donation / Tax back / Gift / Real cost / Return |
| warnCap | 결정세액이 {t}원이라 공제가 {c}원으로 줄었어요 | Your tax due is {t} won, so the credit is capped at {c} won. |
| warnZeroTax | 낼 세금이 없으면 세액공제를 받을 수 없어요 | With no tax due, there is no credit to receive. |
| warnMax | 연간 한도는 2,000만 원이에요. 2,000만 원으로 계산했어요 | The yearly limit is 20M won, so 20M was used. |
| sweetSpot | 10만 원까지는 낸 만큼 전부 돌아와요 | Up to 100k won, every won comes back. |
| notesTitle | 꼭 알아두세요 | Good to know |
| note1 | 주민등록상 주소지 지자체(시·군·구와 그 광역시·도)에는 기부할 수 없어요 | You can't donate to the local government where you are registered as living. |
| note2 | 올해 연말정산에 넣으려면 12월 31일까지 기부해야 해요 | Donate by Dec 31 for it to count in this year's filing. |
| note3 | 2027년 기부분부터 지역별 차등 공제율이 추진 중이에요(국회 확정 전) | Region-based rates are proposed for 2027 donations (not yet passed). |
| note4 | 다른 세액공제가 많으면 실제 공제액은 줄 수 있어요 | Other credits can use up your tax and lower this credit. |
| note5 | 재미와 참고용 계산이에요. 정확한 금액은 국세청 연말정산 간소화 서비스에서 확인하세요 | For reference only. Confirm exact figures with the NTS year-end tax service. |
| copy / reset | 결과 복사 / 초기화 | Copy result / Reset |
| copied / copyFail | 복사했어요 / 복사하지 못했어요 | Copied / Could not copy |
| shareText | 🏡 고향사랑기부 {D}원 → 세금 {credit}원 환급 + 답례품 {gift}원어치 / 실제 부담 {net}원 / play.mesisi.net | 🏡 Hometown donation {D} won → {credit} won tax back + {gift} won gift / real cost {net} won / play.mesisi.net |

Number format: ko uses `toLocaleString('ko-KR')` with "원", and short forms like "10만" only on chips. en uses `toLocaleString('en-US')` with " won".

## localStorage (in try/catch, prefix `htd:`)

- `htd:amount`: the last donation total (string integer)
- `htd:gift`: "1" or "0", default "1"
- Never store tax due, which is more sensitive. It resets on reload.

## Edge cases

- Empty or non-numeric input counts as 0. Strip commas, spaces and "원". Reject negatives and take the absolute value of digits only.
- D > 20,000,000: clamp it and show warnMax. The field keeps what was typed until blur, then shows 20,000,000.
- Tax due entered as 0: credit 0, with warnZeroTax. A blank tax field means no cap.
- Rate shows "–" at D = 0. The bar shows an empty gray track.
- Net < 0: show gainLine in green instead of a negative number.
- D-day is computed from the local date against 2026-12-31 23:59:59. Shows ddayToday on the day itself and closed after it. The calculator still works after it closes.
- Resize: pure CSS layout, with no JS relayout needed beyond the column height.
- Blocked localStorage: start at 100,000 with the gift toggle on.
- Reset: amount 100,000, tax blank, gift on, notes closed.
- `location.hash === '#demo'`: amount 200,000, gift on, notes closed (QA thumbnail). `#test` runs selfTest.

## Must not

- No network of any kind, no external fonts. Stay under 60 KB.
- Do not imitate the look, logo or wording of the NTS (국세청), Hometown Love e-Um (고향사랑e음) or any 지자체 site. No real municipality names, no real gift product names or prices.
- Do not recommend specific regions or gifts, and do not rank municipalities.
- Do not compute the 2027 region-based rates. Mention them as a proposal only.
- No political donation (정치후원금) calculator, even though it has a similar 10만 원 rule.
- Do not phrase anything as tax advice or a guarantee. Always show note5 in the result area footer, not only in the collapsed notes.
- No alert, confirm, prompt, window.open or navigation. No sound.

## Sources (checked 2026-11-27)

- [세정일보: 고향사랑기부금 소득세 세액공제 지방 우대…50만원 기부시 19만원→24만원](https://www.taxtimes.co.kr/mobile/article.html?no=276341). Current rate of 44% for the 100k–200k bracket; the 2027 proposal; the 50만 example ≈ 19만, which matches the formula (193,500).
- [정책브리핑 korea.kr](https://www.korea.kr/news/policyNewsView.do?newsId=148969910). Region-based rates apply from 2027 donations.
- [데일리안: 2026 세법개정안 고향사랑기부금](https://www.dailian.co.kr/news/view/1673928/). The proposal is a compromise and not yet passed.
- [뉴시스 2026-08-03](https://mobile.newsis.com/view/NISX20260803_0003734455)
- The 16.5% rate above 200k won and the 2,000만 annual limit come from general knowledge, cross-checked only against the 50만 example. Recheck them before publishing.
