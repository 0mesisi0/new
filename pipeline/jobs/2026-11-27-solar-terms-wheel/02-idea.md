# Idea and spec: 24절기 달력 바퀴 / 24 Solar Terms Wheel

Agent: Claude (opus), acting as planner. Design notes (palette, layout, motion) are included below.

## Concepts scored

Each concept is scored 1–5 on four things: value in the first 10 seconds, originality, Korean search/share demand, and buildability in one HTML file. The maximum is 20.

| Concept | Category | Score | Verdict |
|---|---|---|---|
| 내 이름 + 자베스 점괘 (an OO자베스 wordplay fortune) | fortune | 4/3/2/5 = 14 | Research confidence on the meme's timing is low, and the site already has 3 fortune items. Skip. |
| 책상 어지르기 파괴 장난감 (click-to-wreck a tidy desk) | weird | 5/3/3/4 = 15 | Fun, but the stick-figure source is from September, so it isn't current. Physics debris costs a lot to build. Keep it for later. |
| **24절기 달력 바퀴** | **info** | **4/4/4/4 = 16** | **Picked.** 대설 (12/7) and 동지 (12/22) are coming up, and "절기 날짜·시각" is an evergreen search. The site has no info item about the solar terms (dongji-dumpling-puzzle is a puzzle, not a calendar). The first screen answers "지금 무슨 절기, 다음은 언제" at a glance. |

## Meta

- slug `solar-terms-wheel`, category `info`, kind `tool`, aspect `3/4`, date `2026-11-27`
- tags: ko `24절기`, `절기 달력`; en `solar terms`, `calendar`
- title: ko `24절기 달력 바퀴 · 절기 날짜와 시각`; en `24 Solar Terms Wheel`
- desc ko: 지금이 어느 절기인지, 다음 절기까지 며칠 남았는지 한눈에 보여 줘요. 태양이 도는 바퀴를 눌러 24절기 날짜와 시각, 뜻을 확인하세요.
- desc en: See which of the 24 Korean solar terms you are in now and how many days remain until the next one. Tap the wheel for each term's date, time and meaning.
- howto ko: 바퀴의 칸을 누르면 그 절기의 날짜·시각·뜻이 나와요. ◀ ▶(방향키 ←→)로 절기를 넘기고, 연도 버튼(PageUp/PageDown)으로 해를 바꿔요. '목록'은 한 해 24절기를 표로, '복사'는 텍스트로 보여 줘요. T를 누르면 오늘로 돌아와요.
- howto en: Tap a slice of the wheel to see that term's date, time and meaning. Use ◀ ▶ (or ←/→) to step through terms and the year buttons (PageUp/PageDown) to change the year. "List" shows all 24 terms as a table and "Copy" copies them as text. Press T to jump back to today.
- about ko: 절기는 태양이 황도를 15°씩 지날 때마다 돌아와요. 시각은 이 기기에서 천문 공식으로 계산한 한국 시각(KST) 근사값이라 공식 발표와 몇 분 차이 날 수 있어요. 정확한 시각은 한국천문연구원 자료를 확인하세요.
- about en: A new solar term begins each time the Sun moves another 15° along the ecliptic. Times are approximate Korea Standard Time values computed on your device with an astronomical formula, so they may differ from official tables by a few minutes.

## Pitch

A round, softly glowing wheel sits on a dusk-blue background. It is split into 24 slices tinted by season. A small ☀️ sits on the rim at today's exact solar longitude.

1. The banner reads, for example, "지금은 소설 무렵 · 대설까지 D-10".
2. Tapping any slice opens a card with the term's name, its hanja, the date and minute it begins in KST, the Sun's longitude, a one-line meaning and a "N일 남음/지남" chip.
3. You can step to other years, and "목록" shows the whole year as a table.
4. Everything is computed locally from the Sun's position, so no date table is hardcoded and any year from 1990 to 2100 works.

## Flow

There is one screen with an optional list overlay. No start screen is needed because it is a tool.

1. **MAIN** (on load)
   - The selected year is the current KST year, and the selected term is the next term from now.
   - The ☀️ eases from the 춘분 position to its current position over 900 ms (skipped under reduced motion).
   - The banner shows the current and next term.
2. **SELECT**
   - A tap on a slice, ◀/▶, or the arrow keys changes the selected term.
   - The selected slice lifts outward by 6 px with a 150 ms pop.
   - The detail card crossfades over 120 ms.
   - Stepping past 동지 goes to 소한 of the next year (year +1), and stepping back works the same way.
3. **YEAR**
   - The ‹ 2026 › stepper changes the year and keeps the same term selected.
   - The ☀️ marker always shows real "now". It is dimmed to 35% when the selected year is not the current year.
4. **LIST overlay**
   - A panel lists the 24 rows of the selected year in date order (소한 … 동지).
   - The current term's row has an accent background, and the next term's row has a "다음" badge.
   - Tapping a row selects that term and closes the panel.
   - Esc, the ✕ button or a tap on the backdrop closes it.
   - The panel scrolls internally. The page never scrolls.
5. **COPY**
   - Copies a plain-text table of the selected year to the clipboard and shows a toast.

## Controls

- **Pointer:**
  - Tapping a slice or a slice label selects it.
  - The buttons are ◀, ▶, ‹year›, 오늘, 목록 and 복사.
  - The wheel uses `touch-action: manipulation`, and the list body uses `touch-action: pan-y`.
- **Keys:**
  - ArrowLeft/ArrowRight: previous/next term.
  - PageUp/PageDown or `[`/`]`: year −1/+1.
  - T: today (sets the current year and selects the next term).
  - L: toggles the list.
  - C: copy.
  - Esc: closes the list.
  - Enter on a focused list row selects it.
  - Call `preventDefault` only for these keys.
- **Focus and size:**
  - All buttons are at least 44 px. They are real `<button>` elements with `aria-label`s.
  - The wheel slices are SVG `<path role="button" tabindex="-1">`, with a visually hidden `aria-live="polite"` region that announces the selected term.

## Astronomy (core logic)

- **Sun's apparent longitude** λ(jd) uses the Meeus low-accuracy formula:
  - T = (JD_TT − 2451545.0) / 36525
  - L0 = 280.46646 + 36000.76983·T + 0.0003032·T²
  - M = 357.52911 + 35999.05029·T − 0.0001537·T² (degrees)
  - C = (1.914602 − 0.004817·T − 0.000014·T²)·sin M + (0.019993 − 0.000101·T)·sin 2M + 0.000289·sin 3M
  - Ω = 125.04 − 1934.136·T
  - λ = norm360(L0 + C − 0.00569 − 0.00478·sin Ω)
- **Time scales:** JD_TT = JD_UT + ΔT/86400, with ΔT = 69 s. This is a constant ⚠ simplification and is fine for 1990–2100. Mark it with `// ponytail: constant ΔT, use a polynomial if the year range grows`.
- **Solving a term time** for target longitude L in year Y:
  - Initial guess: g = JD(Y-03-20 12:00 UT) + ((L ≥ 285 ? L − 360 : L) / 360) × 365.2422.
  - Newton step: jd += wrap180(L − λ(jd)) / 0.98565. Repeat until |step| < 1e-5 day, at most 10 iterations.
  - The result is a UT instant converted to a JS `Date`.
- **KST display:**
  - Compute `new Date(ms + 9·3600·1000)` and read it with the `getUTC*` methods.
  - Never use the device time zone for KST.
  - Show minutes, truncated rather than rounded, as Korean tables do.
- **"Now":**
  - λ_now = λ(now). The current term index is floor(λ_now / 15), mapped to the term table.
  - The next term is the following index. Search its time in the current or next KST year.
- **D-day:**
  - The difference in KST calendar dates (days between the KST yyyy-mm-dd values), not elapsed ms / 86400000.
  - D-0 has two cases: "오늘 {time} 시작" if it is still in the future, "오늘 {time}부터" if it has passed.
- **Refresh:** recompute now and the banner every 60 s. Pause while `document.hidden` and recompute on `visibilitychange`.
- **Year list:**
  - For each of the 24 longitudes, solve in year Y.
  - Sort by time. All 24 must fall within KST year Y. Assert this in the self-check.
- **Self-check** (runs when `location.hash === '#test'`, with results printed to the console and a small on-page badge):
  - The 2026 동지 (L = 270) must be within ±15 min of 2026-12-22 05:50 KST (from today's research).
  - For every year from 1990 to 2100, every year list must have 24 strictly increasing dates inside that KST year.
  - Note for the builder: spot-check 2–3 other 2026–2027 terms against Korea Astronomy and Space Science Institute (한국천문연구원) tables before publishing, and loosen the tolerance only if the formula error explains the gap.

## Term table (fixed order by longitude)

Seasons and colors:

- 봄/Spring: L 315–30, #7cc68d
- 여름/Summer: 45–120, #f2b84b
- 가을/Autumn: 135–210, #e07a4f
- 겨울/Winter: 225–300, #7fa8e0

| L° | ko | hanja | en | meaning ko | meaning en |
|---|---|---|---|---|---|
| 315 | 입춘 | 立春 | Start of Spring | 봄이 시작된다는 날. 대문에 '입춘대길' 글귀를 붙이는 풍습이 있어요. | Spring begins. Some homes post a "입춘대길" (good luck for spring) sign on the door. |
| 330 | 우수 | 雨水 | Rain Water | 눈이 녹아 비가 되고 얼었던 땅이 풀리기 시작해요. | Snow turns to rain and frozen ground starts to thaw. |
| 345 | 경칩 | 驚蟄 | Awakening of Insects | 겨울잠 자던 개구리와 벌레가 깨어난다는 때예요. | Frogs and insects are said to wake from their winter sleep. |
| 0 | 춘분 | 春分 | Spring Equinox | 낮과 밤의 길이가 거의 같아지고, 이후 낮이 더 길어져요. | Day and night are nearly equal, and the days grow longer from here. |
| 15 | 청명 | 淸明 | Clear and Bright | 하늘이 맑고 밝아지는 때. 한식과 하루 이틀 차이로 붙어 있어요. | Skies turn clear and bright. It falls within a day or two of Hansik. |
| 30 | 곡우 | 穀雨 | Grain Rain | 곡식을 깨우는 봄비가 내린다는 때. 첫 찻잎을 따기 시작해요. | Spring rain wakes the grain. The first tea leaves are picked around now. |
| 45 | 입하 | 立夏 | Start of Summer | 여름이 시작되고 들판의 초록이 짙어져요. | Summer begins and the fields turn deep green. |
| 60 | 소만 | 小滿 | Grain Buds | 햇볕이 넉넉해 만물이 조금씩 차오른다는 때예요. | With plenty of sun, everything begins to fill out. |
| 75 | 망종 | 芒種 | Grain in Ear | 보리는 거두고 모는 심느라 일손이 가장 바쁜 때예요. | Barley comes in and rice goes out: the busiest time on the farm. |
| 90 | 하지 | 夏至 | Summer Solstice | 1년 중 낮이 가장 긴 날이에요. | The longest day of the year. |
| 105 | 소서 | 小暑 | Minor Heat | 본격적인 더위가 시작되고 장마철과 겹치곤 해요. | Real heat begins, often overlapping the rainy season. |
| 120 | 대서 | 大暑 | Major Heat | 1년 중 가장 더운 무렵이에요. | Around the hottest time of the year. |
| 135 | 입추 | 立秋 | Start of Autumn | 가을이 시작되지만 아직 더위가 남아 있어요. | Autumn begins on paper, though the heat lingers. |
| 150 | 처서 | 處暑 | End of Heat | 더위가 물러간다는 때. "처서가 지나면 모기 입이 비뚤어진다"는 속담이 있어요. | The heat retreats. A Korean saying claims mosquitoes lose their bite after this day. |
| 165 | 백로 | 白露 | White Dew | 풀잎에 하얀 이슬이 맺히기 시작해요. | White dew starts to form on the grass. |
| 180 | 추분 | 秋分 | Autumn Equinox | 낮과 밤이 거의 같아지고, 이후 밤이 더 길어져요. | Day and night are nearly equal, and the nights grow longer from here. |
| 195 | 한로 | 寒露 | Cold Dew | 찬 이슬이 맺히고 단풍이 짙어지는 때예요. | Dew turns cold and autumn leaves deepen. |
| 210 | 상강 | 霜降 | Frost's Descent | 서리가 내리기 시작하는 때예요. | The first frost begins to fall. |
| 225 | 입동 | 立冬 | Start of Winter | 겨울이 시작되고 김장을 준비하는 집이 많아져요. | Winter begins, and many families prepare kimchi for the season. |
| 240 | 소설 | 小雪 | Minor Snow | 첫눈이 올 만큼 추워지기 시작해요. | Cold enough for the first snow. |
| 255 | 대설 | 大雪 | Major Snow | 눈이 많이 내린다는 때예요. 실제 눈의 양은 해마다 달라요. | The season of heavy snow, though real snowfall varies by year. |
| 270 | 동지 | 冬至 | Winter Solstice | 1년 중 밤이 가장 긴 날. 팥죽을 나눠 먹는 풍습이 있어요. | The longest night of the year, traditionally shared over red bean porridge. |
| 285 | 소한 | 小寒 | Minor Cold | 이름은 '작은 추위'지만 대한보다 추운 해가 많다는 속담이 있어요. | "Minor cold", yet Korean sayings claim it is often colder than Major Cold. |
| 300 | 대한 | 大寒 | Major Cold | 24절기의 마지막. 이 추위가 지나면 다시 입춘이에요. | The last term of the cycle. After this cold comes spring again. |

## Screen layout

- **Header** (top, 56 px):
  - The title "24절기 달력 바퀴", or "24 Solar Terms Wheel" at narrow widths.
  - A year stepper on the right: [‹] 2026 [›]. It clamps to 1990–2100, and the button disables at each end.
- **Banner** (a pill under the header):
  - "지금은 {cur} 무렵 · {next}까지 D-{n}", tinted with the season color of `cur`.
  - Tapping it equals T.
- **Wheel:**
  - An SVG square sized min(88vw, 52vh, 460px), centered.
  - It has 24 annular slices (inner radius 58%, outer radius 100%) with 1.5 px gaps.
  - Fill is the season color at 55% alpha. The selected slice is at 100% alpha and offset 6 px outward.
  - Labels sit at the mid-angle of each slice, 13 px bold, in ko or en short names. The en short names are the first word, e.g. "Major Snow" → "Snow"? No: use the full names at 9 px with wrapping, and below 340 px wide show only the ko names in ko and the 3-letter codes in en (see the strings).
  - Orientation: screen angle θ, clockwise from top, is λ − 90. So 하지 is at the top, 추분 on the right, 동지 at the bottom and 춘분 on the left. The Sun moves clockwise.
  - Four small season words sit inside the ring at 45°, 135°, 225° and 315°.
- **Center disc:**
  - Today's KST date "11월 27일 (금)", the current term in big type (28 px), and the line "태양 황경 {λ_now:0.0}°".
- **Sun marker:**
  - A ☀️ (22 px) on the outer rim at λ_now, plus a thin radial needle from the center.
  - It has a soft glow pulse (2.4 s loop) that is disabled under reduced motion.
- **Detail card** (below the wheel; on wide or landscape screens, to the right of the wheel):
  - Line 1: "{ko} {hanja}", plus the en name in gray in en mode.
  - Line 2: the date line "2026년 12월 7일 (월) 13:02 KST".
  - Line 3: "태양 황경 255°" and a chip: "10일 남음", "3일 지남" or "오늘".
  - Line 4: the meaning sentence.
  - In en mode, if the device time-zone offset is not KST, add a gray line "Your time: {toLocaleString}".
  - Flanked by ◀ ▶ buttons that are 44 px or larger.
- **Bottom bar:** [오늘] [목록] [복사], sticky, 52 px.
- **List overlay:**
  - A sheet, max-width 480 px, with the title "{y}년 24절기" and ✕.
  - Rows: season dot | name (and hanja) | "12월 7일 (월)" | "13:02".
  - Times use a monospace digit stack `ui-monospace, "Courier New", monospace`. Never align CJK with monospace.
- **Footnote** (11 px gray, under the card): "시각은 근사값이에요 · 한국 시각(KST)".

## Visual design

- **Palette:**
  - background: a gradient from #1b2140 to #2c3560
  - ink #f4f1e8, gray #9aa3b8, accent #ffd36b (sun)
  - card #262e52 with a 1 px #ffffff1a border, radius 16
- **Type:** system-ui stack. Hanja at 0.85 em in gray.
- **Feedback:**
  - Slice pop (scale 1 → 1.04 → 1 over 150 ms).
  - The banner D-day number ticks up from 0 on first load (400 ms).
  - Toast slides up from the bottom bar for 1.6 s.
- **Layout breakpoints:**
  - Below 340 px wide: hide the season words, shrink the labels to 10 px and use short labels in en.
  - Above 720 px with a landscape aspect: wheel left, card right, max content width 960 px.
- **prefers-reduced-motion:** no sun ease-in, no pulse, no pop, no D-day count-up. Changes are instant.
- **No sound.**

## Strings

| key | ko | en |
|---|---|---|
| appTitle | 24절기 달력 바퀴 | 24 Solar Terms Wheel |
| appTitleShort | 24절기 바퀴 | Solar Terms |
| prevYear / nextYear (aria) | 이전 해 / 다음 해 | Previous year / Next year |
| nowIn | 지금은 {cur} 무렵 | Now: {cur} |
| nextIn | {next}까지 D-{n} | {n} days to {next} |
| nextToday | 오늘 {time} {next} 시작 | {next} begins today at {time} |
| nextStartedToday | 오늘 {time}부터 {next} | {next} began today at {time} |
| todayDate | {m}월 {d}일 ({dow}) | {dow}, {mon} {d} |
| sunLon | 태양 황경 {deg}° | Sun at {deg}° longitude |
| dateLine | {y}년 {m}월 {d}일 ({dow}) {hh}:{mm} KST | {dow}, {mon} {d}, {y} · {hh}:{mm} KST |
| yourTime | — (not shown in ko) | Your time: {local} |
| chipLeft | {n}일 남음 | in {n} days |
| chipAgo | {n}일 지남 | {n} days ago |
| chipToday | 오늘 | today |
| seasonSpring/Summer/Autumn/Winter | 봄 / 여름 / 가을 / 겨울 | Spring / Summer / Autumn / Winter |
| prevTerm / nextTerm (aria) | 이전 절기 / 다음 절기 | Previous term / Next term |
| today | 오늘 | Today |
| list | 목록 | List |
| copy | 복사 | Copy |
| close (aria) | 닫기 | Close |
| listTitle | {y}년 24절기 | {y} Solar Terms |
| nextBadge | 다음 | Next |
| nowBadge | 지금 | Now |
| copied / copyFail | 복사했어요 / 복사하지 못했어요 | Copied / Could not copy |
| foot | 시각은 근사값이에요 · 한국 시각(KST) | Times are approximate · Korea time (KST) |
| liveSelected (aria-live) | {name}, {dateLine} | {name}, {dateLine} |
| dow | 일 월 화 수 목 금 토 | Sun Mon Tue Wed Thu Fri Sat |
| mon | — | Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec |
| short labels en (<340 px) | — | the 3-letter codes LCh RW AwI SEq CB GR LSu GB GE SSo MiH MaH LAu EH WD AEq CD FD LWi MiS MaS WSo MiC MaC, in table order 입춘…대한 |

**Copy text format:**

- ko: header "{y}년 24절기 (한국 시각, 근사값)", then 24 lines of "{name}({hanja}) {m}월 {d}일({dow}) {hh}:{mm}", then "play.mesisi.net".
- en: header "{y} Korean Solar Terms (KST, approx.)", then lines of "{en} ({ko}) {mon} {d} {hh}:{mm}", then "play.mesisi.net".

The term names, hanja and meanings come from the term table above.

## localStorage (in try/catch, prefix `stw:`)

- `stw:list`: "1" if the list overlay was open last time, so it reopens. The default is "0".

Nothing else is stored. The year and the selected term always start from "now".

## Edge cases

- **Year bounds:** clamp the year to 1990–2100. Stepping a term past 동지 2100 or before 소한 1990 does nothing, and the button disables.
- **Midnight crossing:** the 60 s refresh updates the center date, the banner and the D-day.
- **Term boundary while open:** if a term starts while the page is open, the next refresh moves `cur` and `next`. It does not change the user's selected term.
- **Device time zone** is not KST: all KST math uses UTC + 9 h. The local time appears only in the en "Your time" line.
- **Device clock wrong** or before 1990: still compute. If the KST year is outside 1990–2100, clamp the displayed year and hide the banner's D-day.
- **Resize:** recompute the SVG size and labels only, and keep the selection.
- **List open + resize/rotate:** the sheet stays open and scrolls internally.
- **Copy:** use `navigator.clipboard.writeText`, falling back to a hidden textarea and `execCommand('copy')`. Show a toast either way.
- **localStorage blocked:** everything works and the list simply starts closed.
- **QA thumbnails:** with `location.hash === '#demo'`, fix now = 2026-11-27T12:00:00+09:00, select 대설 2026 and keep the list closed.
- **Self-check:** with `location.hash === '#test'`, run the self-check (see Astronomy) and show a green or red badge at top left.

## Must not

- No network, fonts or CDN. Stay under 80 KB.
- Do not hardcode a date table. Every date comes from the formula, so the self-check is meaningful.
- Do not claim official accuracy. The footnote and about text must say the times are approximate. Do not copy the look or wording of the Korea Astronomy and Space Science Institute (한국천문연구원) or of any calendar app or site.
- No fortune telling, 사주, 길일 or health and diet advice tied to the terms. Customs are mentioned only as light facts.
- No lunar-calendar conversion and no holidays. Those are out of scope, and other items can cover them later.
- No alert, confirm, prompt, window.open or navigation, and no sound.
- The page must never scroll. Only the list sheet scrolls.
