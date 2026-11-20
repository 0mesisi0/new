# Idea and spec: 올해 결산 영수증 / Year-End Receipt

Agent: Claude (sonnet), standing in for Codex. Design notes are merged in (palette, layout, motion).

## Concepts scored

Scores are 1–5 for: fun in the first 10 seconds, originality, search/share demand, and buildability. Maximum 20.

| Concept | Category | Score | Verdict |
|---|---|---|---|
| Year-end party penalty roulette, ladder and bill split | random/tools | 5/2/5/4 = 16 | Saturated in Korea; keep it for later |
| First-snow window | cool | 5/4/3/4 = 16 | Save it for the first real snowfall |
| **Year-End Receipt** | **fortune** | **4/4/4/5 = 17** | **Picked**: the result is a screenshot card that fits December "올해 결산" posts |

## Meta

- slug `year-end-receipt`, category `fortune`, kind `tool`, aspect `9/16`, date `2026-11-20`
- tags: ko `연말결산`, `영수증`; en `year-end`, `receipt`
- title: ko `올해 결산 영수증 만들기`; en `Year-End Receipt Maker`
- desc ko: 올해 야근·커피·송년회·배달 횟수를 고르면 한 해 청구서가 영수증으로 출력돼요. 칭호와 2027 정미년 한 줄 예언까지, 이미지로 저장해 자랑하세요.
- desc en: Tap through your year in coffees, overtime and parties, then print it as a receipt with a silly title and a one-line 2027 forecast. Save it as an image.
- howto ko: 질문 9개에 가장 가까운 답을 누르세요(숫자키 1~4도 돼요). 영수증이 출력되면 '이미지 저장'이나 '텍스트 복사'로 친구에게 보여 주세요. 같은 이름과 같은 답이면 영수증도 똑같이 나와요.
- howto en: Answer 9 quick questions by tapping the closest option (keys 1-4 work too). When the receipt prints, save it as an image or copy the text to share. Same name and same answers always print the same receipt.
- about ko: 모든 금액은 재미로 만든 가짜예요. 입력한 이름과 답은 이 기기 밖으로 나가지 않아요. 2027년은 정미년, 양의 해입니다.
- about en: All amounts are made up for fun. Your name and answers never leave this device. 2027 is the year of the sheep (Jeongmi).

## Pitch

A cute thermal-paper receipt printer sits on a dark winter-night desk, with snowflakes drifting behind it.

1. The user types an optional nickname and taps 9 single-choice questions about their year.
2. The receipt prints out of the slot one line at a time. Each line is an absurd unit price times their answer.
3. The receipt ends with a total, a stamped title (칭호), a 2027 정미년 forecast line and a barcode.
4. "Save image" exports a PNG.

The output is deterministic from name + answers, so friends can compare.

## Flow

1. **START**
   - Title, an optional nickname field (max 8 chars) and a big "영수증 출력 시작" button.
   - Snow falls in the background.
2. **QUESTION ×9**
   - Shows progress "3/9", a question card and 4 big options from low to high.
   - A tap highlights the option for 150 ms, then auto-advances.
   - There is a "이전" (back) button.
   - Input is ignored for 180 ms after each answer, so a double tap cannot skip a question.
3. **PRINT**
   - The receipt canvas slides down out of the printer slot line by line: about 0.25 s per line, about 3.5 s in total, with a tick sound per line.
   - The view auto-scrolls to keep the newest line visible.
   - The receipt panel scrolls internally. The page itself never scrolls.
4. **RESULT**
   - The finished receipt has a sticky bottom bar: [이미지 저장] [텍스트 복사] [다시 하기].
   - The title stamp thumps on last: scale 2.2 → 1 with a slight rotation, plus a 4 px shake for 120 ms.

## Controls

- **Pointer:** tap or click everything. On the result, drag or use the wheel to scroll the receipt.
- **Keys on questions:** 1–4 pick an option. Backspace or ArrowLeft goes back. ArrowUp/ArrowDown move the highlight and Enter confirms.
- **Keys on the result:** S saves, C copies, R or Enter restarts, and the arrow/Page keys scroll.
- **Other keys:** Enter starts from the start screen. M toggles sound.
- **Touch and layout:** buttons are at least 44 px tall. The snow layer has `touch-action:none` and the receipt area has `touch-action:pan-y`.

## Questions → receipt lines

- Each answer maps to a base quantity Q.
- Printed qty = round(Q × j), where j is a seeded jitter in [0.9, 1.1].
- Line amount = qty × unit price.

| # | ko question | en question | options ko (Q) | options en | line label ko / en | unit × price |
|---|---|---|---|---|---|---|
| 1 | 올해 야근, 얼마나 했나요? | How much overtime did you do? | 거의 없음 10 / 가끔 60 / 자주 150 / 회사가 내 집 300 | Barely any / Sometimes / Often / The office is my home | 야근 / Overtime | 시간 h × 1,200 |
| 2 | 올해 커피는 몇 잔? | How many coffees this year? | 하루 한 잔 이하 30 / 주 3~4잔 120 / 거의 매일 300 / 혈관에 커피 600 | One a day or less / 3-4 a week / Nearly daily / Coffee runs in my veins | 커피 / Coffee | 잔 cups × 4,500 |
| 3 | "괜찮아요"라고 거짓말한 횟수는? | Times you said "I'm fine" but weren't? | 거의 없음 20 / 가끔 100 / 자주 300 / 입버릇 700 | Hardly ever / Sometimes / Often / It's my catchphrase | "괜찮아요" / "I'm fine" | 회 times × 300 |
| 4 | 송년회·회식은 몇 번? | How many parties and team dinners? | 안 갔다 2 / 몇 번 8 / 많이 20 / 매주 40 | Skipped them / A few / Lots / Every week | 회식·모임 / Parties | 회 × 35,000 |
| 5 | 배달앱 주문은? | Delivery orders? | 요리파 5 / 가끔 30 / 자주 80 / 앱이 내 냉장고 160 | I cook / Sometimes / Often / The app is my fridge | 배달 / Delivery | 건 orders × 18,000 |
| 6 | "다음에 밥 한번 먹자" 약속은? | "Let's grab a meal sometime" promises? | 거의 없음 3 / 가끔 15 / 자주 40 / 인사말 90 | Hardly any / A few / Many / It's my greeting | 공수표 / Empty promises | 장 × 1,000 |
| 7 | 잠 못 들고 깨어있던 밤은? | Nights you could not sleep? | 꿀잠 5 / 가끔 40 / 자주 100 / 새벽이 일상 200 | Slept like a baby / Sometimes / Often / Dawn is my normal | 불면의 밤 / Sleepless nights | 밤 nights × 2,500 |
| 8 | 월요일에 한숨 쉰 횟수는? | Sighs on Mondays? | 한 번도 안 쉼 52 / 월요일마다 한 번 156 / 여러 번 312 / 월요일은 한숨의 날 520 | Never sighed / Once each Monday / Several each Monday / Monday is Sigh Day | 월요일 한숨 / Monday sighs | 번 × 500 |
| 9 | 올해 크게 웃은 날은? | Days you really laughed? | 손에 꼽음 5 / 달에 한 번쯤 30 / 일주일에 한 번쯤 80 / 자주 200 | Countable on one hand / About monthly / About weekly / Often | 웃음 쿠폰 / Laughter coupon | 일 days × −2,000 (red discount) |

Totals:

- Subtotal = the sum of lines 1–8.
- Laughter discount = line 9.
- Sigh tax 10% = round(10% × (subtotal − discount)).
- TOTAL = subtotal − discount + tax, with a minimum of 10,000.
- MIN and MAX totals are precomputed from the lowest and highest options with no jitter.
- f = clamp((total − MIN) / (MAX − MIN), 0, 1).

## Title tiers (by f)

| f | ko | en | emoji |
|---|---|---|---|
| < 0.20 | 평온한 한 해의 주인 | Master of a Calm Year | 🍵 |
| < 0.40 | 적당히 버틴 직장인 | The Balanced Survivor | 🧣 |
| < 0.60 | 올해도 열일한 사람 | Worked-Hard-Again Award | ☕ |
| < 0.80 | 연말정산 전에 정산부터 필요한 사람 | Needs a Settlement Before the Year Ends | 🔥 |
| ≥ 0.80 | 올해의 생존자 | Survivor of the Year | 🏆 |

Hidden tier: if all answers are the first option, the title is "전설의 칼퇴러 / Legendary Clock-Out" 🌈.

## Next-year forecast

- next = current year + 1.
- 천간 = "갑을병정무기경신임계"[(next−4) % 10].
- 지지 = "자축인묘진사오미신유술해"[(next−4) % 12].
- Animal emojis by 지지: 🐭🐮🐯🐰🐲🐍🐴🐑🐵🐔🐶🐷.
- Header: "{next} {천간}{지지}년 {emoji}의 한 줄" / "{next} Year of the Sheep {emoji}: one-liner". Use the English animal name for the 지지.
- If 지지 is 미 (sheep), pick one sheep-themed line by seed. Otherwise use the generic pool.

Sheep lines:

| ko | en |
|---|---|
| 양 한 마리, 양 두 마리... 2027년엔 잠을 제때 잡니다. | Count sheep, count sheep... in 2027 you actually sleep on time. |
| 새해엔 구름 같은 양털 이불이 당신의 퇴근길을 따뜻하게 해요. | A cloud-soft wool blanket warms every walk home next year. |
| 올해 한숨은 내년 웃음 쿠폰으로 환전됩니다. | This year's sighs convert into laughter coupons in 2027. |
| 2027년, 월요일이 생각보다 괜찮은 날이 됩니다. | In 2027, Mondays turn out to be better than expected. |
| 뜻밖의 점심 약속이 진짜로 잡히는 해예요. | That vague lunch promise finally gets a real date. |
| 커피는 줄이고 낮잠은 늘리면 운이 오릅니다. | Less coffee, more naps: your luck goes up. |
| 양처럼 순한 한 해, 단 칼퇴 앞에서만 사나워지세요. | A gentle sheep of a year, fierce only when it is time to clock out. |
| 올해의 무게는 내려놓고, 가볍게 폴짝 뛰어가세요. | Set this year's weight down and hop lightly onward. |

Generic lines:

| ko | en |
|---|---|
| 새해엔 오늘보다 한 걸음만 더 가벼워집니다. | Next year you feel one step lighter than today. |
| 올해 버틴 당신에게 내년은 조금 다정할 거예요. | You held on this year, and next year is a bit kinder. |
| 작은 쉼표 하나가 운을 바꿉니다. | One small pause changes your luck. |
| 뜻밖의 좋은 소식이 월요일에 도착해요. | Unexpected good news arrives on a Monday. |

## Seed

- seed = FNV-1a 32-bit of `name.trim() + "|" + answers.join(",")`, and the PRNG is mulberry32(seed).
- Draw in this fixed order:
  1. 9 jitters
  2. the forecast index
  3. about 40 barcode widths (1–3 px)
  4. a 5-digit receipt number
- The printed date and time come from the real clock and do not affect the seed.
- An empty name becomes 손님 / Guest.

## Receipt layout

Canvas with a logical width of 360 px, drawn top to bottom:

1. **Header:** shop name "하루한판 결산상점 / Daily Toybox Year-End Shop" (bold, centered), then "{y}년 한 해 영수증 / {y} Year in Receipt", then a dashed line.
2. **Meta:** 고객 {name}, No. {5 digits}, YYYY.MM.DD HH:mm.
3. **Column header:** 품목 / 금액 (Item / Amount), then a dashed line.
4. **Lines:** 8 item lines and the red discount line. Each line has two rows:
   - the label on the left, with the amount right-aligned via `measureText`
   - a small gray row: "{qty}{unit} × {price}"
5. **Totals:** a dashed line, then 소계, 웃음 할인 and 한숨세 (10%), another dashed line, and a big "총 청구액 ₩{total}" in 24 px bold.
6. **Stamp:** a red, double-bordered, rounded rectangle rotated −8°, holding the emoji and the title.
7. **Forecast box:** the header plus a wrapped sentence. Wrap Korean by characters and English by words.
8. **Footer:**
   - the barcode
   - "※ 모든 금액은 재미로 만든 가짜입니다 / * All amounts are made up for fun"
   - "※ 새해 다짐은 환불이 되지 않습니다 / * New Year's resolutions are non-refundable"
   - "감사합니다, 내년에도 만나요 / Thank you, see you next year"
   - "play.mesisi.net"

Paper styling: zig-zag top and bottom edges, paper color #fbfaf5 and a soft shadow. Use system-ui for text and `ui-monospace, "Courier New", monospace` for numbers. Never rely on CJK monospace alignment.

## Visual design

- **Palette:**
  - desk: a gradient from #1d2433 to #2a3550
  - paper #fbfaf5, ink #23262d, gray #8a8f98, accent red #e0453d
  - snow: white at 70% alpha
- **Snow:** about 60 particles on a background canvas, with sine drift. DPR is capped at 2. Pause it when the page is hidden.
- **START screen:**
  - a printer drawn in CSS or emoji 🧾, the big title, a one-line subtitle and the name input
  - a red primary button
  - a mute toggle (🔊/🔇) at the top right and a footnote
- **QUESTION screen:**
  - 9 progress dots and a question at 20 px bold
  - 4 stacked options, each at least 56 px tall and prefixed by its number key in a small circle
  - the back button and the mute toggle
- **PRINT/RESULT screen:**
  - a dark rounded slot bar at the top
  - the receipt centered at max-width min(92vw, 420px), scrolling internally
  - a sticky bottom bar with the 3 buttons
- **Small screens:** at 320 px wide, use 16 px side padding and let option text wrap instead of truncating.
- **Wide screens:** a centered column with a max width of 480 px, and the snow covers the whole window.
- **prefers-reduced-motion:** no print animation, no shake and no stamp animation, and only 20 slow snow particles.

## Sound (off by default)

- Tick: a 25 ms burst at about 1.8 kHz, gain 0.04.
- Thump: an 80 ms sine at 90 Hz with decay, gain 0.12.
- Web Audio starts only after a user gesture. The mute setting is persisted.

## Export and copy

- **Save image:**
  - Draw an offscreen canvas 750 px wide (scale 750/360) at full receipt height.
  - Use a #1d2433 background with 40 px padding and a "play.mesisi.net" watermark in 12 px gray at the bottom right.
  - Export with `toBlob` and an `<a download="year-end-receipt.png">` click, then revoke the URL after 1 s.
  - On failure, show the toast "저장에 실패했어요. 화면을 캡처해 주세요".
- **Copy text:**
  - Use `navigator.clipboard.writeText`, falling back to a hidden textarea and `execCommand('copy')`.
  - Show a toast on success or failure. Never use alert or prompt.
- **Share text:**
  - ko: 🧾 {name}님의 {y} 결산 영수증 / 총 청구액 ₩{total} / 칭호: {title} / {forecast} / play.mesisi.net
  - en: the same lines in English

## Strings

| key | ko | en |
|---|---|---|
| appTitle | 올해 결산 영수증 | Year-End Receipt |
| startSub | 올해 나는 얼마나 달렸을까? 9번 누르면 영수증이 나와요 | How hard was your year? Tap 9 times and get your receipt. |
| namePh | 이름 또는 닉네임 (선택) | Name or nickname (optional) |
| startBtn | 영수증 출력 시작 | Start printing |
| foot | 모든 금액은 재미로 만든 가짜예요 | All amounts are made up for fun |
| back | 이전 | Back |
| soundOn / soundOff | 소리 켜기 / 소리 끄기 | Sound on / Sound off |
| printing | 영수증 출력 중... | Printing your receipt... |
| save / copy / again | 이미지 저장 / 텍스트 복사 / 다시 하기 | Save image / Copy text / Start over |
| saved / saveFail | 이미지를 저장했어요 / 저장에 실패했어요. 화면을 캡처해 주세요 | Image saved / Could not save. Please take a screenshot. |
| copied / copyFail | 복사했어요 / 복사하지 못했어요 | Copied / Could not copy |
| guest | 손님 | Guest |
| shopName | 하루한판 결산상점 | Daily Toybox Year-End Shop |
| receiptOf | {y}년 한 해 영수증 | {y} Year in Receipt |
| customer | 고객 | Customer |
| colItem / colAmount | 품목 / 금액 | Item / Amount |
| subtotal / discount / tax / total | 소계 / 웃음 할인 / 한숨세 (10%) / 총 청구액 | Subtotal / Laughter discount / Sigh tax (10%) / TOTAL DUE |
| forecastHeadGeneric | 내년의 한 줄 | Next year's line |
| note1 | ※ 모든 금액은 재미로 만든 가짜입니다 | * All amounts are made up for fun |
| note2 | ※ 새해 다짐은 환불이 되지 않습니다 | * New Year's resolutions are non-refundable |
| thanks | 감사합니다, 내년에도 만나요 | Thank you, see you next year |

## localStorage (in try/catch, prefix `yer:`)

- `yer:name`: the last nickname
- `yer:sound`: "1" or "0", default "0"
- `yer:count`: the number of receipts printed (not shown in the UI)

Never store answers.

## Edge cases

- Back on question 1 returns to START and keeps the name.
- Resizing during print redraws from state using progress (lines revealed). Never restart the animation.
- When the page is hidden, pause and clamp delta to 50 ms.
- "다시 하기" resets the answers but keeps the name and the sound setting.
- When localStorage is blocked, everything still works.
- If `location.hash === '#demo'`, prefill answers [1,1,2,1,2,1,1,2,1] and jump to the finished receipt. This is for QA thumbnails only.

## Must not

- No network of any kind; stay under 150 KB.
- No real brands, stores or people. Do not imitate the look or wording of National Tax Service or real e-tax receipts, and no tax calculation.
- Do not mock bosses, groups, genders, regions or professions. The humor is about yourself.
- No health, diet, money advice, gambling or real fortune claims.
- No alcohol count and no penalty angle.
- Do not copy the look of any existing receipt-generator or personality-test site.
- No alert, confirm, prompt, window.open or navigation. No sound autoplay.
