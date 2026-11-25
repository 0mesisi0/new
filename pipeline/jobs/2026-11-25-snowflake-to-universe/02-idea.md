# Idea and spec: 크기 비교 여행: 눈송이에서 우주까지 / Size Trip: Snowflake to Universe

Agent: Claude (opus), planner. Design notes are merged in (palette, layout, motion).

## Concepts scored

Scores are 1–5 for: value in the first 10 seconds, originality, Korean search/share demand, and buildability in one HTML file. Maximum 20.

| Concept | Category | Score | Verdict |
|---|---|---|---|
| 연말정산 놓친 공제 체크리스트 / Year-End Tax Deduction Checklist | tools | 3/3/5/2 = 13 | Research row 11 is a low-confidence blog. Deduction limits must be checked against the National Tax Service (국세청) before any number ships. Revisit in December with verified figures |
| 끝없는 로파이 라디오 / Endless Lo-Fi Radio (generative beats) | radio | 3/4/3/3 = 13 | New subject (beats, not ambience), but the first 10 seconds are a play button and a generative composer is the riskiest build. Keep it in the backlog |
| **크기 비교 여행: 눈송이에서 우주까지 / Size Trip: Snowflake to Universe** | **learn** | **5/3/4/4 = 16** | **Picked.** It opens on a winter snowflake and one pinch or scroll already shows something surprising. "우주 크기 비교" is a steady search term, and the ratio facts make good share lines. It is the backlog's "무한 스크롤 우주" idea, which nothing above has covered |

## Meta

- slug `snowflake-to-universe`, category `learn`, kind `tool`, aspect `9/16`, date `2026-11-25`
- tags: ko `우주크기비교`, `크기비교`, `눈송이`; en `scale`, `size-comparison`, `universe`
- title: ko `크기 비교 여행: 눈송이에서 우주까지`; en `Size Trip: Snowflake to Universe`
- desc ko: 눈송이 하나에서 출발해 원자 속과 관측 가능한 우주 끝까지 확대·축소해 보세요. 머리카락, 한라산, 태양, 은하까지 32가지의 크기를 한 화면에서 비교해요.
- desc en: Start from a single snowflake and zoom down into atoms or out to the edge of the observable universe. Compare 32 things, from a hair to the Sun to a galaxy.
- howto ko: 위아래로 드래그하거나 휠·핀치로 확대·축소하세요. 오른쪽 막대를 끌어도 되고, +/− 키나 방향키도 돼요. '자동 여행'을 누르면 알아서 우주 끝까지 날아가요. 지나간 것은 도감에 모여요.
- howto en: Drag up or down, scroll the wheel or pinch to zoom. You can also drag the bar on the right or use the +/− or arrow keys. Tap "Auto trip" to fly to the edge of the universe on its own. Everything you pass is added to your collection.
- about ko: 크기는 모두 대략적인 값이에요. 은하 지름처럼 연구마다 다른 값은 흔히 쓰는 추정치로 적었어요. 화면의 그림은 모양을 단순하게 표현한 것이에요.
- about en: All sizes are approximate. Where estimates vary (for example, the size of the galaxy), we use a commonly cited value. Drawings are simplified shapes.

## Pitch

A dark winter-night stage shows one glowing snowflake ❄️ in the middle, with "약 3 mm" under it.

1. The user drags up (zooms out). The snowflake shrinks to a dot, and a tangerine, a person, a bus and Hallasan grow in around it as concentric shapes.
2. Each time an object fills the view, an info card slides up with its size and a one-line fact, such as "태양에는 지구가 약 109개 나란히 들어가요".
3. Dragging down goes the other way: into a grain of salt, a hair, a red blood cell, a virus, DNA and an atom.
4. A collection counter ("발견 12/32") and a share line ("눈송이에서 10²⁴배 더 멀리 다녀왔어요") give a reason to finish and post.

Everything sits on one continuous log-zoom value, so there are no pages and nothing to load.

## Flow

1. **START** (an overlay on top of the live stage)
   - The title, a one-line subtitle and a big "여행 시작" button. A small "자동 여행" button sits under it.
   - The snowflake slowly rotates behind the overlay, and a few background snow particles drift.
   - Tapping either button fades the overlay out over 250 ms. A drag or wheel on the stage also dismisses the overlay and applies that same gesture.
2. **EXPLORE** (the main screen; the tool never ends)
   - The stage fills the window. A vertical zoom bar sits on the right, the scale ruler at the bottom left and the info card at the bottom.
   - A top bar holds the collection counter, the mute toggle and a ☰ button that opens the collection.
3. **AUTO TRIP** (a mode of EXPLORE)
   - Zoom moves toward the far end at 1.2 decades/s, pausing 0.8 s whenever an object becomes "current".
   - Going in: if z is at or above the snowflake (−2.5), the trip heads out to the universe (+27.5). If z is below the snowflake, it heads in to the proton.
   - Any pointer down, wheel or key stops it.
   - At the end it shows the toast "도착! 관측 가능한 우주의 끝이에요" (or the proton one) and stops.
4. **COLLECTION** (a sheet that slides up from the bottom, 70% height, scrolling internally)
   - A 4-column grid of 32 cells. Found cells show the emoji or icon and the name. Unfound cells show "?".
   - Tapping a found cell closes the sheet and flies to that object in 1.0 s (ease-in-out in z).
   - Buttons: [공유 문구 복사] [닫기].

## Zoom model

- **State:** `z` = log10 of the number of meters spanned by the short side of the stage. Range [−35.5, 27.5]. Start at z = −2.3 (the snowflake fills about half the short side).
- **Size on screen:** px(size) = size_m / 10^z × shortSidePx.
- **Visibility:**
  - An object is drawn when 3 px ≤ px ≤ 6 × shortSidePx.
  - Alpha fades in over 3–10 px. It fades out from 2× to 6× the short side, so a huge object becomes a faint edge ring and then disappears.
- **Labels:** a name label is drawn when 36 px ≤ px ≤ 1.1 × shortSidePx. At most 4 labels show at once (the largest visible ones win), placed on alternating sides so they do not overlap.
- **Current object:**
  - The current object is the one whose log10(size) is closest to z − 0.3, within ±0.9 decades.
  - If none is in range, the card shows the gap state (below).
  - Once an object has been current for 600 ms, it is marked found: the counter pops (scale 1.25 → 1 over 200 ms) and a soft chime plays.
- **Inputs:**
  - Wheel: deltaY × 0.0015 decades (normalize `deltaMode` lines × 16).
  - Vertical drag: 1 decade per 160 px. Dragging up zooms out. Add inertia with velocity decay of 0.9 per 16 ms, stopping below 0.02 decades/s.
  - Pinch: Δz = −log10(distanceNow / distanceStart).
  - Zoom bar: maps linearly onto the full z range. The thumb shows the current object's emoji.
  - Keys: +/=/ArrowUp zoom out, −/ArrowDown zoom in, 0.25 decade per press. Holding a key gives 2 decades/s. Home returns to the snowflake.
- **Clamp:** z is clamped to the range. Hitting an end gives a 120 ms 4 px bounce, unless reduced motion is on.
- **Empty gap:**
  - Between the Planck length and the proton (z between about −33 and −15.5), no object is current.
  - The card shows "아무것도 측정되지 않은 구간" and the gap's depth in decades, plus a [건너뛰기] button. The button flies to the proton when going out, or to the Planck length when going in, depending on the last direction.
  - Auto trip crosses the gap at 6 decades/s.

## Objects (32)

Shape types:

- **disc:** an emoji or a drawn circle centered on the stage, with diameter = size.
- **span:** a horizontal line of length = size centered on the stage, with end dots and an optional end emoji. Orbits are drawn as a thin circle instead.

Sizes are what gets drawn. The fact text always says "약" / "about".

| # | id | ko name | en name | size_m | shape | ko fact | en fact |
|---|---|---|---|---|---|---|---|
| 1 | planck | 플랑크 길이 | Planck length | 1.6e-35 | disc, a tiny white sparkle | 지금의 물리 이론이 통하지 않을 것으로 여겨지는 아주 작은 길이 규모예요. | Around this scale our current theories of physics are expected to break down. |
| 2 | proton | 양성자 | Proton | 1.7e-15 | disc, a red circle with a soft glow | 수소 원자의 중심 알갱이예요. 원자 전체보다 약 6만 배 작아요. | The core of a hydrogen atom, about 60,000 times smaller than the whole atom. |
| 3 | goldNucleus | 금 원자핵 | Gold nucleus | 1.4e-14 | disc, a cluster of red and gray dots | 원자의 무게는 거의 다 이 작은 핵에 몰려 있어요. 나머지는 대부분 빈 공간이에요. | Almost all of an atom's mass sits in this tiny nucleus. The rest is mostly empty space. |
| 4 | hAtom | 수소 원자 | Hydrogen atom | 1.1e-10 | disc, a blue fuzzy cloud | 가장 가벼운 원자예요. 지름은 약 0.1 nm예요. | The lightest atom, about 0.1 nm across. |
| 5 | water | 물 분자 | Water molecule | 2.8e-10 | disc, one red and two white circles | 눈송이도 결국 이 물 분자가 육각형으로 차곡차곡 쌓인 거예요. | A snowflake is just these water molecules stacked in a hexagonal pattern. |
| 6 | dna | DNA 이중나선 폭 | DNA double helix (width) | 2e-9 | span drawn as a short twisted ladder | 폭은 2 nm지만, 세포 하나의 DNA를 쭉 펴면 약 2 m나 돼요. | Only 2 nm wide, yet the DNA in one human cell stretches to about 2 m. |
| 7 | flu | 독감 바이러스 | Flu virus | 1e-7 | disc, a spiky green circle | 보통 광학 현미경으로는 볼 수 없을 만큼 작아요. | Too small to see with an ordinary light microscope. |
| 8 | ecoli | 대장균 | E. coli bacterium | 2e-6 | disc, 🦠 | 장 속에 사는 세균으로 길이가 약 2 µm예요. | A gut bacterium about 2 µm long. |
| 9 | rbc | 적혈구 | Red blood cell | 7.5e-6 | disc, a red donut-shaped disk | 우리 몸에는 적혈구가 약 25조 개 있어요. | Your body holds about 25 trillion of them. |
| 10 | hair | 머리카락 굵기 | Width of a hair | 7e-5 | span, a vertical brown band | 사람마다 0.02~0.18 mm 정도로 달라요. | It varies from about 0.02 to 0.18 mm between people. |
| 11 | mite | 집먼지진드기 | Dust mite | 3e-4 | disc, a drawn beige oval with 8 legs | 이불 속에 살지만 맨눈으로는 거의 안 보여요. | Lives in bedding but is barely visible to the naked eye. |
| 12 | salt | 소금 알갱이 | Grain of salt | 5e-4 | disc, a white rounded square | 소금 알갱이는 정육면체 모양 결정이 많아요. | Salt grains are often tiny cubes. |
| 13 | snowflake | 눈송이 | Snowflake | 3e-3 | disc, ❄️ | 눈 결정은 대부분 육각형 대칭이고, 지름은 보통 몇 mm예요. | Most snow crystals have six-fold symmetry and are a few millimeters across. |
| 14 | tangerine | 귤 | Tangerine | 6e-2 | disc, 🍊 | 겨울 이불 속 단골 간식, 지름 약 6 cm예요. | The classic winter snack, about 6 cm across. |
| 15 | person | 사람 | Person | 1.7 | disc, 🧍 | 눈송이보다 약 570배 커요. | About 570 times bigger than a snowflake. |
| 16 | bus | 시내버스 | City bus | 11 | disc, 🚌 | 시내버스 한 대는 길이가 약 11 m예요. | A city bus is about 11 m long. |
| 17 | pitch | 축구장 길이 | Soccer field length | 105 | span, a green rectangle outline | 국제 경기 권장 길이는 105 m예요. | The recommended length for international matches is 105 m. |
| 18 | hallasan | 한라산 높이 | Height of Hallasan | 1947 | disc, ⛰️ | 남한에서 가장 높은 산이에요. | The tallest mountain in South Korea. |
| 19 | everest | 에베레스트 높이 | Height of Everest | 8849 | disc, 🏔️ | 2020년에 다시 잰 높이는 8,849 m예요. | Its height was re-measured in 2020 as 8,849 m. |
| 20 | seoulBusan | 서울–부산 직선거리 | Seoul to Busan (straight line) | 3.25e5 | span with dot ends | 두 도시 사이는 직선으로 약 325 km예요. | About 325 km apart as the crow flies. |
| 21 | moon | 달 지름 | Diameter of the Moon | 3.474e6 | disc, 🌕 | 지구 지름의 약 4분의 1이에요. | About a quarter of Earth's diameter. |
| 22 | earth | 지구 지름 | Diameter of Earth | 1.2742e7 | disc, 🌍 | 지구 지름은 약 12,742 km예요. | Earth is about 12,742 km across. |
| 23 | earthMoon | 지구–달 거리 | Earth to Moon | 3.844e8 | span, 🌍 at one end and 🌕 at the other | 빛으로 약 1.3초 걸리는 거리예요. | Light covers it in about 1.3 seconds. |
| 24 | jupiter | 목성 지름 | Diameter of Jupiter | 1.4e8 | disc, a striped orange circle | 지구를 약 11개 나란히 놓은 폭이에요. | About 11 Earths side by side. |
| 25 | sun | 태양 지름 | Diameter of the Sun | 1.3927e9 | disc, ☀️ with glow | 태양에는 지구가 약 109개 나란히 들어가요. | About 109 Earths fit across the Sun. |
| 26 | au | 지구–태양 거리 | Earth to Sun | 1.496e11 | span, ☀️ to 🌍 | 햇빛이 지구까지 오는 데 약 8분 20초 걸려요. | Sunlight takes about 8 minutes 20 seconds to reach us. |
| 27 | neptune | 해왕성 궤도 지름 | Neptune's orbit (diameter) | 9e12 | orbit circle | 가장 바깥 행성의 궤도예요. 빛으로 가로지르면 약 8시간이에요. | The outermost planet's orbit. Light takes about 8 hours to cross it. |
| 28 | lightYear | 1광년 | One light-year | 9.46e15 | span with ✨ at both ends | 빛이 1년 동안 가는 거리, 약 9조 4,600억 km예요. | How far light travels in a year: about 9.46 trillion km. |
| 29 | proxima | 가장 가까운 별까지 | To the nearest star | 4.0e16 | span, ☀️ to ⭐ | 태양 다음으로 가까운 별 프록시마 센타우리까지 약 4.2광년이에요. | Proxima Centauri, the closest star after the Sun, is about 4.2 light-years away. |
| 30 | milkyWay | 우리은하 지름 | Milky Way (diameter) | 9.5e20 | disc, a drawn spiral of dots | 약 10만 광년으로 흔히 말하지만, 추정치는 연구마다 달라요. | Often given as about 100,000 light-years; estimates vary. |
| 31 | andromeda | 안드로메다은하까지 | To the Andromeda Galaxy | 2.4e22 | span, the spiral icon at both ends | 약 250만 광년 떨어져 있고, 맨눈으로 볼 수 있는 가장 먼 천체 중 하나예요. | About 2.5 million light-years away, one of the most distant things visible to the naked eye. |
| 32 | universe | 관측 가능한 우주 | Observable universe | 8.8e26 | disc, a faint gradient ring | 지름 약 930억 광년. 우주 나이(약 138억 년)보다 큰 건 우주가 팽창해 왔기 때문이에요. | About 93 billion light-years across, larger than its age (about 13.8 billion years) suggests because space has been expanding. |

The "약 570배" on #15 is 1.7 / 0.003. Keep each fact under 70 Korean characters so the card never needs more than 3 lines at 320 px.

## Info card

- **Position:** bottom, full width minus 16 px, max-width 480 px, with a rounded 16 px glassy panel.
- **Row 1:** emoji or icon, the name (18 px bold) and the formatted size on the right (monospace).
- **Row 2:** the fact (15 px, up to 3 lines).
- **Row 3, small and gray:** "눈송이의 {ratio}" / "{ratio} a snowflake". The ratio uses ×10ⁿ superscripts when n ≥ 4 or n ≤ −4, plain "약 570배" style otherwise, and "1/570" style for smaller-than ("눈송이의 약 1/40" / "about 1/40 of a snowflake").
- **Change animation:** when the current object changes, the card content crossfades over 150 ms. No layout jump: the card has a fixed height.

## Size formatting

`fmt(m)` picks the first rule that matches:

| range | ko | en |
|---|---|---|
| m < 1e-15 | 1.6×10⁻³⁵ m | same |
| m < 1e-9 | value in pm, for example 110 pm (0.11 nm) | same |
| m < 1e-6 | nm | nm |
| m < 1e-3 | µm, or mm with 2 decimals when ≥ 0.1 mm (0.07 mm) | same |
| m < 1 | mm or cm (≥ 1 cm uses cm) | same |
| m < 1e3 | m | m |
| m < 1e10 | km with thousands separators (`toLocaleString`) | same |
| m < 9.46e14 | AU (1 AU = 1.496e11 m), 1 decimal | AU |
| m ≥ 9.46e14 | 광년. ≥ 1e4 uses 만/억 (10만 광년, 250만 광년, 930억 광년) | light-years, with thousand/million/billion words |

Exception: the proton and gold nucleus show "약 1.7 fm (펨토미터)" / "about 1.7 fm (femtometers)", because pm reads oddly there.

## Scale ruler

- A white bar at the bottom left, above the info card.
- Its length is the largest "nice" value (1, 2 or 5 × 10ⁿ meters) that fits in 30% of the short side. The label uses `fmt`.
- The bar's pixel length updates every frame.

## Visual design

- **Palette:**
  - stage: a radial gradient from #0f1730 (center) to #070b18 (edges)
  - ink #eef2ff, gray #8b93a7, accent ice-blue #7cc8ff, found-pop gold #ffd166
  - labels are white at 85% alpha, with a 1 px #000 40% shadow
- **Background snow:** 40 slow particles at the edges (white at 35% alpha) that do not scale with zoom. Hide them when z > 6 (above Earth's atmosphere) and fade in about 300 tiny static star dots instead (a seeded PRNG, fixed per session).
- **Objects:** drawn on one canvas, DPR capped at 2. Emoji are drawn with `fillText` at font size = px (skip when px > 2000 and draw a ring instead to avoid giant glyph cost). Drawn shapes are simple paths and gradients. Nothing should resemble any existing scale-comparison site: no side-by-side lineup and no photo-real art. The layout is concentric shapes on a night sky.
- **Zoom bar:** 8 px wide and 60% of the height on the right edge, with tick marks at 10 decade intervals and a 44 px round thumb.
- **Top bar:** "발견 12/32" pill on the left; 🔊/🔇 and ☰ buttons (44 px) on the right.
- **Small screens:** at 320 px wide, the info card font drops to 14 px and the zoom bar to 6 px. Labels truncate with an ellipsis at 40% of the width.
- **Wide screens:** the stage covers the whole window. Only the card and the top bar are limited to a 480 px centered column.
- **prefers-reduced-motion:**
  - no inertia, no bounce and no card crossfade
  - auto trip and fly-to jump to each object with a 200 ms fade instead of a continuous zoom
  - background particles are static

## Controls

- **Pointer:** vertical drag zooms, the wheel zooms, two-finger pinch zooms and tapping the zoom bar jumps. Tapping a visible label flies to that object.
- **Keys:**
  - `+`/`=`/ArrowUp zooms out; `-`/ArrowDown zooms in
  - Home flies to the snowflake
  - A toggles auto trip
  - C opens the collection and Escape closes it
  - M toggles sound
  - Enter on START begins
- **Touch:** the stage has `touch-action:none`, and `preventDefault` is called on wheel and touchmove. The collection sheet uses `touch-action:pan-y` and scrolls internally. The page itself never scrolls.

## Sound (off by default)

- Found chime: two sine notes, 880 Hz then 1320 Hz, 60 ms each, gain 0.05.
- Zoom whoosh during auto trip: filtered noise with a bandpass of 400–1200 Hz that follows zoom speed, gain ≤ 0.03.
- Web Audio is created only after the first user gesture. The mute setting is persisted.

## Share text (copy button in the collection)

- ko: ❄️ 눈송이에서 출발해 {farthest}까지 다녀왔어요! 크기 차이 10^{n}배 · 발견 {found}/32 · play.mesisi.net
- en: ❄️ I zoomed from a snowflake to {farthest}! That's 10^{n} times bigger · Found {found}/32 · play.mesisi.net
- {farthest} is the found object with the largest |log10(size/0.003)|. n is that difference rounded to an integer, with its sign.
- If the smaller direction wins, use the variants "{farthest}까지 들어가 봤어요! 1/10^{n} 크기" / "I zoomed into {farthest}! 1/10^{n} the size".
- Copying uses `navigator.clipboard.writeText`, falling back to a hidden textarea and `execCommand('copy')`. Show a toast either way.

## Strings

| key | ko | en |
|---|---|---|
| appTitle | 크기 비교 여행 | Size Trip |
| appSub | 눈송이에서 원자 속, 그리고 우주 끝까지 | From a snowflake into atoms, and out to the edge of the universe |
| startBtn | 여행 시작 | Start the trip |
| autoBtn | 자동 여행 | Auto trip |
| autoStop | 멈추기 | Stop |
| hint | 위아래로 끌거나 휠·핀치로 확대·축소 | Drag up/down, scroll or pinch to zoom |
| found | 발견 {n}/32 | Found {n}/32 |
| newFound | 새로 발견: {name} | New: {name} |
| gapTitle | 아무것도 측정되지 않은 구간 | Nothing measured down here |
| gapBody | 양성자와 플랑크 길이 사이에는 약 {d}자릿수의 빈 구간이 있어요. | About {d} orders of magnitude of empty scale lie between the proton and the Planck length. |
| skip | 건너뛰기 | Skip ahead |
| ofSnow | 눈송이의 {r} | {r} a snowflake |
| times | 약 {n}배 | about {n}× |
| fraction | 약 1/{n} | about 1/{n} of |
| arrivedOut | 도착! 관측 가능한 우주의 끝이에요 | You made it to the edge of the observable universe |
| arrivedIn | 도착! 양성자 크기까지 들어왔어요 | You made it down to the size of a proton |
| edgeMax / edgeMin | 더 큰 건 아직 관측되지 않았어요 / 이보다 작은 길이는 의미가 없을지도 몰라요 | Nothing bigger has been observed / Smaller lengths may not even mean anything |
| collection | 도감 | Collection |
| unknown | ? | ? |
| copyShare | 공유 문구 복사 | Copy share text |
| close | 닫기 | Close |
| copied / copyFail | 복사했어요 / 복사하지 못했어요 | Copied / Could not copy |
| soundOn / soundOff | 소리 켜기 / 소리 끄기 | Sound on / Sound off |
| home | 눈송이로 | Back to snowflake |
| approx | 크기는 모두 대략적인 값이에요 | All sizes are approximate |
| allFound | 32개를 모두 찾았어요! 크기 박사 인증 🎓 | All 32 found! Certified size expert 🎓 |

Object names, facts and units come from the Objects table above. Units dictionary: ko `pm, nm, µm, mm, cm, m, km, AU, 광년, 만, 억`; en `pm, nm, µm, mm, cm, m, km, AU, light-years, thousand, million, billion`.

## localStorage (in try/catch, prefix `stu:`)

- `stu:found`: a comma-separated list of found ids
- `stu:sound`: "1" or "0", default "0"
- `stu:z`: the last z, rounded to 2 decimals, restored on load. START still shows, but the stage behind it uses the saved z.

## Edge cases

- **Resize or rotation:** keep z and recompute the short side, so the same scale stays visible. Never reset found progress.
- **Hidden page:** pause rAF and auto trip. Clamp delta to 50 ms on resume.
- **Gestures:**
  - A pinch that starts while a drag has inertia cancels the inertia.
  - Wheel bursts from trackpads are summed per frame.
  - Dragging the zoom bar does not also zoom the stage.
- **Auto trip:**
  - Starting it at the far end it would head to (z ≥ 27 going out) starts it from the snowflake instead.
  - Stopping it mid-gap leaves the gap card and the skip button visible.
- **All 32 found:** show the allFound toast once (`stu:found` already holding 32 ids means it is never shown again).
- **Blocked localStorage:** everything works and progress lasts only for the session.
- **Huge emoji:** skip `fillText` above 2000 px to avoid slow glyph rendering on mobile; draw a ring or the edge glow instead.
- **Float precision:** compute in log space (px = 10^(log10(size) − z) × shortSide), never 10^z directly at the extremes.
- **`location.hash === '#demo'`:** set z = 7.3 (Earth and Moon in view), mark 14 objects as found, skip START and show the card. This is for QA thumbnails only.
- **Missing language:** with no `lang` param and no Korean in `navigator.language`, default to English. `<html lang>` must match.

## Must not

- No network of any kind, no images or fonts from outside, and no raster images: everything is canvas, CSS and emoji. Stay under 120 KB.
- No real brands, logos, company names or people. Natural places and astronomy names (한라산, Everest, Andromeda) are fine. Do not show a real bus company or team logo.
- Do not copy the look, layout, music or object lineup of any existing scale-of-the-universe site or video. Use the concentric night-sky layout described here.
- No made-up precision. Every fact keeps "약" / "about", and contested values (galaxy size) say that estimates vary. Do not add objects without a size you can source.
- No quiz pressure, timers or scores. This is a calm exploration tool.
- No health claims around the dust mite, virus or bacteria (no "dangerous" or "disease" wording).
- No alert, confirm, prompt, window.open or navigation. No sound autoplay. The page never scrolls.
