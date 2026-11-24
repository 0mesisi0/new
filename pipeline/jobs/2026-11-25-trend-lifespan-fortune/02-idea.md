# Idea and spec: 유행 수명 점괘 / Trend Lifespan Fortune

## Concepts scored

Each concept is scored 1–5 on four things: value in the first 10 seconds, originality, Korean search/share demand, and buildability in one HTML file. The maximum is 20.

| Concept | Category | Score | Verdict |
|---|---|---|---|
| 동지 낮 길이 비교기: pick a city and watch the shortest day of the year shrink on a 24-hour ring | learn | 3/3/3/4 = 13 | Too close to `winter-shadow-lab`, which also covers the sun angle. Keep it for the 12/22 solstice with a stronger angle |
| 13월의 월급 미리보기: a rough year-end tax settlement estimate | tools | 3/2/5/2 = 12 | Demand is real, but accuracy is a risk and it would need real tax rules. The house rules avoid tax calculation |
| **유행 수명 점괘**: type any trend and get its predicted lifespan, a rise-and-fall curve, milestone dates and the "next trend" | **fortune** | **5/4/4/5 = 18** | **Picked.** Trend lifespan is a meme in its own right (research #5). The result is a funny, deterministic card that friends can compare, and nothing like it is in the items or the queue |

The games direction (sneaking a snack while someone is not looking) is already covered by the queued `midnight-snack-mission`, so it was not considered again.

## Meta

- slug `trend-lifespan-fortune`, category `fortune`, kind `tool`, aspect `9/16`, date `2026-11-25`
- tags: ko `유행`, `점괘`, `유행예측`; en `trend`, `fortune`, `fad`
- title: ko `유행 수명 점괘`; en `Trend Lifespan Fortune`
- desc ko: 요즘 뜨는 간식이나 유행어를 넣으면 그 유행이 며칠 갈지 점쳐 줘요. 떠오르고 꺼지는 곡선, 편의점 상륙일, '아직도 그거 해?' 날짜까지 진단서로 보여 드려요.
- desc en: Type any trend, a snack, a word or a hobby, and get a playful forecast of how many days it will last, with a rise-and-fall curve and the date it becomes "so last season."
- howto ko: 유행 이름을 쓰거나 예시 버튼을 누르고, 언제 처음 봤는지 고른 뒤 '점괘 보기'를 누르세요(Enter도 돼요). 같은 이름이면 언제나 같은 점괘가 나와요. 결과는 '이미지 저장'이나 '텍스트 복사'로 공유하세요.
- howto en: Type a trend or tap an example, choose when you first saw it, then press "Read the fortune" (Enter works too). The same name always gets the same fortune. Share the result with "Save image" or "Copy text."
- about ko: 모든 숫자는 재미로 지어낸 점괘예요. 진짜 예측이 아니에요. 탕후루는 두어 달, 두쫀쿠는 2주쯤 반짝했다는 기사(2026년 2월)에서 착안했어요. 입력한 글자는 이 기기 밖으로 나가지 않아요.
- about en: Every number is a made-up fortune, not a real prediction. It was inspired by a February 2026 article noting how some Korean snack fads lasted only weeks. What you type never leaves this device.

## Pitch

The scene is a small fortune-teller's table at night. On it sits a glowing hourglass, and snow drifts past the window.

1. The user types a trend, such as "흑임자 크림빵" or "말끝마다 ~하는 중", or taps an example chip. Then they pick when they first saw it.
2. The sand in the hourglass pours for about 2 seconds while a short sentence is "read."
3. A **유행 수명 진단서** (trend lifespan certificate) card appears. It shows:
   - the predicted lifespan in days and a tier badge
   - a canvas curve that rises and falls, with "오늘" and "정점" markers
   - 6 milestone dates, such as 줄 서기 시작, 편의점 상륙, 부모님도 앎 and "아직도 그거 해?"
   - a one-line comment
   - a made-up "다음 유행" prediction
4. Classic winter street snacks like 붕어빵 and 호떡 get a hidden tier: "겨울마다 돌아오는 단골 ♾️".

The output is deterministic from the normalized trend name, so friends can type the same thing and compare.

## Flow

1. **START**
   - Shows a 🔮⏳ emblem, the title and a one-line subtitle.
   - A text input (max 12 characters, counted with `Array.from`).
   - A row of 6 example chips.
   - A "처음 본 때" segmented control with 4 options: 오늘 (0), 1주 전 (7), 한 달 전 (30) and 오래전 (100). The default is 오늘.
   - A big red "점괘 보기" button and a footnote.
   - The button is disabled while the input is empty after trimming. Tapping it anyway shakes the input for 4 px over 200 ms and shows the hint `emptyHint`.
   - Tapping a chip fills the input. It does not submit.
2. **READING** (about 2 s)
   - The hourglass flips (rotate 180° over 300 ms), then the sand drains over 1.6 s.
   - One line rotates every 600 ms: `reading1` → `reading2` → `reading3`.
   - A tap or any key skips straight to the result.
3. **RESULT**
   - The certificate canvas sits centered in a panel that scrolls internally.
   - A sticky bottom bar holds [이미지 저장] [텍스트 복사] [다시 하기].
   - The tier badge stamps in last: scale 2 → 1 with −6° rotation over 220 ms, plus a 3 px shake for 120 ms.
   - The curve draws from left to right over 700 ms before the badge stamps.

## Controls

- **Pointer:** tap or click everything. On the result, drag or use the wheel to scroll the panel.
- **Keys on START:**
  - Typing goes into the input, which is focused on load on desktop only (skip autofocus when `pointer: coarse`).
  - Enter submits.
  - When the input is not focused, keys 1–4 pick the "처음 본 때" option.
- **Keys on READING:** any key skips to the result.
- **Keys on RESULT:** S saves, C copies, R or Enter starts again, and the arrow/Page keys scroll.
- **Any screen:** M toggles sound when the input is not focused.
- **Touch and layout:** every button and chip is at least 44 px tall. The background snow canvas has `touch-action:none`, and the result panel has `touch-action:pan-y`.

## Normalization and seed

- norm = input → `trim()` → collapse inner whitespace to one space → `toLowerCase()` → NFC.
- seed = FNV-1a 32-bit of `"tlf|" + norm`, and the PRNG is mulberry32(seed).
- The "처음 본 때" choice does NOT affect the seed. It only moves the "오늘" marker.
- Draw in this fixed order:
  1. u for the lifespan
  2. the peak fraction
  3. the comment index
  4. the next-trend A index
  5. the next-trend B index
  6. 30 sparkle positions for the card
  7. a 4-digit certificate number

## Lifespan

- **Classic check first.** If norm is in CLASSICS, the tier is `classic`. The lifespan text becomes "매년 겨울 부활 / Returns every winter," and the curve becomes a repeating yearly wave with 3 bumps.
  - CLASSICS: `붕어빵, 호떡, 군고구마, 군밤, 어묵, 오뎅, 호빵, 귤, 팥죽, 떡볶이, 계란빵, 국화빵, bungeoppang, hotteok, roasted sweet potato, roasted chestnuts, fish cake, tangerine, red bean porridge, tteokbokki`
- **Otherwise:**
  - days = round(exp(ln 3 + u^1.25 × (ln 1200 − ln 3))). This is log-scaled from 3 to 1200 days and biased toward short-lived fads for the joke.
  - peak fraction p = 0.22 + 0.2 × r, where r is the second PRNG draw.
  - elapsed = the chosen first-seen value (0, 7, 30 or 100).
  - remaining = days − elapsed.
  - If remaining ≤ 0, the verdict switches to "이미 끝났어요 / Already over" with "{−remaining}일 전에 막을 내렸어요 / ended {n} days ago."

Lifespan display:

- If days < 14, show "{days}일."
- If days < 60, show "약 {round(days/7)}주."
- If days < 730, show "약 {round(days/30)}개월."
- Otherwise show "약 {(days/365).toFixed(1)}년."
- English uses the same rules with days, weeks, months and years, with correct singular/plural.

## Tiers

| condition | ko | en | emoji | badge color |
|---|---|---|---|---|
| days ≤ 7 | 하루살이 유행 | Mayfly Fad | 🎈 | #ff8a65 |
| ≤ 30 | 반짝 유행 | Flash Fad | ✨ | #ffd54f |
| ≤ 90 | 한 철 유행 | One-Season Hit | 🍂 | #ffb74d |
| ≤ 365 | 올해의 유행 | Trend of the Year | 🏅 | #81c784 |
| > 365 | 스테디셀러 | Steady Seller | 🌳 | #4fc3f7 |
| classic | 겨울마다 돌아오는 단골 | Comes Back Every Winter | ♾️ | #ce93d8 |

## Comments (2 per tier, picked by seed)

| tier | ko | en |
|---|---|---|
| mayfly | 인증샷은 오늘 안에 찍으세요. 내일이면 늦어요. | Take the photo today. Tomorrow is too late. |
| mayfly | 친구한테 말하는 순간 이미 한물간 유행이 됩니다. | By the time you tell a friend, it is already old news. |
| flash | 줄은 길고 유행은 짧아요. 두 번은 안 서도 돼요. | The line is long, the fad is short. Once is enough. |
| flash | 다음 달엔 "그거 기억나?"로 시작하는 대화가 됩니다. | Next month it starts with "remember that?" |
| season | 계절이 바뀌면 같이 사라질 운명이에요. | It leaves with the season. |
| season | 정점에서 한 번, 끝물에 한 번. 두 번 즐기면 충분해요. | Enjoy it once at the peak and once at the end. |
| year | 연말 결산 목록에 이름을 올릴 유행이에요. | This one makes the year-end lists. |
| year | 처음엔 낯설다가 어느새 당연해집니다. | Strange at first, normal before you notice. |
| steady | 유행이 아니라 이제 그냥 생활이에요. | Not a trend anymore, just life. |
| steady | 손주에게 "옛날엔 이게 유행이었어"라고 말하게 됩니다. | One day you will tell kids this was once new. |
| classic | 유행은 돌고 돌아도 겨울의 단골은 늘 그 자리에 있어요. | Fads come and go. Winter regulars stay. |
| classic | 올해도 첫눈과 함께 돌아옵니다. | It returns with the first snow, as always. |
| over (overrides tier comment) | 늦지 않았어요. 레트로 유행으로 다시 돌아올 수도 있어요. | Not too late: it might come back as retro. |

## Milestones

Each milestone falls at a fraction of `days`, counted from the start date. The start date is today − elapsed in local time. Classic items skip this table.

| # | fraction | ko | en |
|---|---|---|---|
| 1 | 0 | 첫 목격 | First sighting |
| 2 | p × 0.4 | 줄 서기 시작 | Lines start forming |
| 3 | p × 0.8 | SNS 도배 | All over social feeds |
| 4 | p | 정점 | Peak |
| 5 | p + (1−p) × 0.3 | 부모님도 앎 | Even your parents know |
| 6 | p + (1−p) × 0.6 | "아직도 그거 해?" | "You still do that?" |
| 7 | 1 | 추억의 유행 | Officially nostalgic |

- Show "MM.DD" for each milestone. Add the year when it differs from the current year, as "YYYY.MM.DD."
- Mark milestones before today as passed: gray, with a ✓.
- Mark the next upcoming milestone with a small pulsing dot.

## Curve

- x = t / days on [0, 1].
- y = (t/p)² when t < p, otherwise exp(−3.2 × (t−p)/(1−p)).
- Draw it on a 300 × 120 logical area with a soft gradient fill under the line.
- Markers:
  - a dashed vertical "오늘 / Today" line at elapsed/days, clamped to [0, 1]
  - a ★ at the peak
- If remaining ≤ 0, draw the today marker at the right edge with the label "이미 지남 / past."
- **Classic curve:** y = 0.5 + 0.5 × sin over 3 winter bumps, with the x labels "올겨울 · 내년 · 내후년 / This winter · Next · After."

## Next trend (made up)

- Combine `{A} {B}` from two pools using PRNG draws 4 and 5. If the combination equals norm, draw B again by taking the next index.
- Pool A ko / en:
  - 흑임자 / Black sesame
  - 유자 / Yuja
  - 피스타치오 / Pistachio
  - 쑥 / Mugwort
  - 고구마 / Sweet potato
  - 버터 / Butter
  - 인절미 / Injeolmi
  - 말차 / Matcha
  - 군밤 / Roasted chestnut
  - 꿀 / Honey
- Pool B ko / en:
  - 크림빵 / cream bun
  - 붕어빵 / fish-shaped bread
  - 라떼 / latte
  - 약과 / yakgwa
  - 쿠키 / cookie
  - 아이스크림 / ice cream
  - 떡 / rice cake
  - 호떡 / hotteok
  - 푸딩 / pudding
  - 토스트 / toast
- The line reads "다음 유행은 아마도… {A} {B}" / "Next up, probably… {A} {B}".

## Certificate layout (canvas, logical width 360 px)

1. **Header:** "유행 수명 진단서 / Trend Lifespan Certificate" (bold, centered), then "No. {4 digits} · {YYYY.MM.DD}", then a thin gold line.
2. **Subject:** the input text at 28 px bold, shrunk to fit down to 18 px with `measureText`, then truncated with "…". Wrap it in 「 」 for ko and in quotes for en.
3. **Lifespan:** "예상 수명 / Predicted lifespan" (small gray), then the big lifespan text at 34 px. Under it, show "남은 날 D-{remaining} / {remaining} days left" or the over line in red.
4. **Badge:** a rounded pill in the tier color holding the emoji and the tier name. It stamps in.
5. **Curve box:** see Curve.
6. **Milestones:** 7 rows of label and date, with the dates right-aligned in `ui-monospace, "Courier New", monospace`.
7. **Comment:** an italic, wrapped sentence. Wrap Korean by characters and English by words.
8. **Next-trend box:** a dashed border holding the next-trend line.
9. **Footer:**
   - "※ 재미로 보는 점괘예요. 실제 예측이 아니에요 / * Just for fun. Not a real prediction"
   - "play.mesisi.net"

Card styling:

- Deep navy paper (#1b1f3a) with a 1 px gold (#d9b76a) inset border and rounded corners of 18 px.
- 30 faint seeded sparkles.
- Ink #f4f1e8 and gray #9aa0b8.
- Over or late text in red #ff6b6b.

## Visual design

- **Palette:**
  - background: a gradient from #12142b to #262a52
  - gold #d9b76a, primary button #e0453d, chip background #2f3463
  - snow: white at 60% alpha
- **Background:** about 50 snow particles on a canvas with sine drift. DPR is capped at 2. Pause it when the page is hidden.
- **START screen:**
  - the emblem at 64 px, the title at 26 px bold and the subtitle
  - the input, 52 px tall with an 18 px font, showing a live counter "n/12"
  - chips that wrap onto 2 lines
  - the segmented control, with 4 equal buttons
  - the primary button and a mute toggle (🔊/🔇) at the top right
- **READING screen:** a CSS or SVG hourglass at 120 px, centered, with sand as two clip-path triangles animated by height.
- **RESULT screen:** the card at max-width min(92vw, 420px), scrolling internally, with the sticky bar below it.
- **Small screens:** at 320 px wide, use 16 px padding, wrap chips and let the segmented labels shrink to 13 px.
- **Wide screens:** a centered column with a max width of 480 px.
- **prefers-reduced-motion:** no flip, sand, curve-draw, stamp or shake animations; go from READING to the result after 300 ms; use 15 slow snow particles.

## Sound (off by default)

- Sand: filtered noise (bandpass at 3 kHz, gain 0.03) for 1.6 s.
- Stamp: an 80 ms sine at 110 Hz with decay, gain 0.12.
- Chime when the badge lands: two sines at 880 and 1320 Hz, 200 ms, gain 0.05.
- Web Audio starts only after a user gesture. The mute setting is persisted.

## Export and copy

- **Save image:**
  - Draw an offscreen canvas 750 px wide (scale 750/360) at the full card height.
  - Use a #12142b background with 40 px padding and a "play.mesisi.net" watermark in 12 px gray at the bottom right.
  - Export with `toBlob` and an `<a download="trend-lifespan.png">` click, then revoke the URL after 1 s.
  - On failure, show the toast `saveFail`.
- **Copy text:**
  - Use `navigator.clipboard.writeText`, falling back to a hidden textarea and `execCommand('copy')`.
  - Show a toast on success or failure.
- **Share text:**
  - ko: `🔮 「{subject}」 유행 수명 점괘 / 예상 수명: {lifespan} ({tier}) / "아직도 그거 해?" 예정일: {date6} / 다음 유행: {A} {B} / play.mesisi.net`
  - en: the same in English.
  - Classic items replace the date part with "매년 겨울 부활 / Returns every winter."

## Strings

| key | ko | en |
|---|---|---|
| appTitle | 유행 수명 점괘 | Trend Lifespan Fortune |
| startSub | 요즘 그 유행, 며칠이나 갈까? 이름만 넣으면 점쳐 드려요 | That new trend: how long will it last? Type it and find out. |
| inputPh | 유행 이름 (예: 흑임자 크림빵) | Trend name (e.g. black sesame cream bun) |
| chipsLabel | 예시 | Examples |
| chips | 흑임자 크림빵 / 유자 라떼 / 말끝마다 ~하는 중 / 붕어빵 / 쑥 아이스크림 / 손뜨개 키링 | Black sesame bun / Yuja latte / Ending every sentence with "~ing" / Bungeoppang / Mugwort ice cream / Hand-knit keyring |
| firstSeen | 처음 본 때 | First seen |
| seen0 / seen7 / seen30 / seen100 | 오늘 / 1주 전 / 한 달 전 / 오래전 | Today / A week ago / A month ago / Ages ago |
| startBtn | 점괘 보기 | Read the fortune |
| emptyHint | 유행 이름을 한 글자 이상 써 주세요 | Type at least one character |
| foot | 재미로 보는 점괘예요. 진짜 예측이 아니에요 | Just for fun. Not a real prediction. |
| reading1 / reading2 / reading3 | 모래시계를 뒤집는 중… / 줄 길이를 재는 중… / 유행의 기운을 읽는 중… | Flipping the hourglass… / Measuring the line… / Reading the trend winds… |
| certTitle | 유행 수명 진단서 | Trend Lifespan Certificate |
| predicted | 예상 수명 | Predicted lifespan |
| daysLeft | 남은 날 D-{n} | {n} days left |
| over | 이미 끝났어요 · {n}일 전에 막을 내렸어요 | Already over · ended {n} days ago |
| classicLife | 매년 겨울 부활 | Returns every winter |
| today / past / peak | 오늘 / 이미 지남 / 정점 | Today / past / Peak |
| nextTrend | 다음 유행은 아마도… | Next up, probably… |
| note | ※ 재미로 보는 점괘예요. 실제 예측이 아니에요 | * Just for fun. Not a real prediction |
| save / copy / again | 이미지 저장 / 텍스트 복사 / 다시 하기 | Save image / Copy text / Try another |
| saved / saveFail | 이미지를 저장했어요 / 저장에 실패했어요. 화면을 캡처해 주세요 | Image saved / Could not save. Please take a screenshot. |
| copied / copyFail | 복사했어요 / 복사하지 못했어요 | Copied / Could not copy |
| soundOn / soundOff | 소리 켜기 / 소리 끄기 | Sound on / Sound off |
| unitDay / unitWeek / unitMonth / unitYear | 일 / 주 / 개월 / 년 | day(s) / week(s) / month(s) / year(s) |

The tier names, comments, milestone labels and next-trend pools are listed in the tables above, and they ship in the same `{ ko, en }` dictionary.

## localStorage (in try/catch, prefix `tlf:`)

- `tlf:last`: the last trend text, used to prefill the input
- `tlf:seen`: the last first-seen option, "0", "7", "30" or "100"
- `tlf:sound`: "1" or "0", default "0"
- `tlf:count`: the number of fortunes read (not shown in the UI)

## Edge cases

- **Empty or whitespace-only input:** the button is disabled. Show the hint and shake on attempt.
- **Long text:**
  - Hard-cap the input at 12 grapheme-ish characters by counting with `Array.from`, so emoji count as 1.
  - Pasted longer text is truncated.
  - The canvas shrinks the font to fit, then ellipsizes.
- **Emoji, symbols and Latin text** all work. Matching uses normalization, so "붕어빵 " and "붕어빵" give the same result.
- **Rendering user text:** use only `textContent` and canvas `fillText`. Never use `innerHTML`.
- **Overshoot:** if elapsed ≥ days, show the over state. A 100-day first-seen on a 5-day fad reads "95일 전에 막을 내렸어요."
- **Dates** use the local timezone and add days with `setDate`, which is safe across month and year boundaries.
- **Resizing** on the result redraws the card from state, with no re-animation. Resizing during READING keeps the timer.
- **Hidden page:** pause the snow and the timers, and clamp delta to 50 ms.
- **"다시 하기"** returns to START, keeps the text, the first-seen option and the sound setting, and selects the input text.
- **Blocked localStorage:** everything still works.
- **`location.hash === '#demo'`:** prefill "흑임자 크림빵" with seen 7 and jump to the finished result with no animation. This is for QA thumbnails only.

## Must not

- No network of any kind; stay under 150 KB.
- No real brands, stores, franchises, apps, platforms or people in chips, pools or comments. Use generic food and hobby words only, and write "SNS," not a platform name.
- Never state the 탕후루/두쫀쿠 article claims as facts anywhere except the `about` attribution line. Do not present any number as a real forecast.
- Do not mock people who follow trends, or any group, age, gender, region or profession. The joke is about how fast trends move.
- No investment, business or market advice. Avoid shop-opening or "should I invest" wording.
- No alert, confirm, prompt, window.open or navigation. No sound autoplay.
- Do not copy the look of any existing fortune or personality-test site.
