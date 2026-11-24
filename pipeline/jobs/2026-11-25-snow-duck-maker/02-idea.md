# Idea and spec: 눈오리 만들기 / Snow Duck Maker

Agent: Claude (opus). Design notes are merged in (palette, layout, motion).

## Concepts scored

Each concept is scored 1–5 on four things: value in the first 10 seconds, originality, Korean search/share demand, and buildability in one HTML file. The maximum is 20.

All three research directions are already taken, so none of them was used:
- "Snack while nobody looks" is the queued `midnight-snack-mission`.
- "Annual leave bridge" is the queued `annual-leave-bridge`.
- "Trend lifespan fortune" is the queued `trend-lifespan-fortune`.

| Concept | Category | Score | Verdict |
|---|---|---|---|
| 군고구마 드럼통: roll sweet potatoes in a barrel stove and pull each one out before it burns | games | 4/4/3/4 = 15 | Keep for later. The site already has many timing games |
| 연말정산 카드 공제 미리보기: card and cash spend becomes an estimated deduction before 12/31 | tools | 2/2/5/3 = 12 | Search demand is high, but the 2026 rules (limits, rates, extra caps) must be checked against official sources first. Too risky without that check |
| **눈오리 만들기: squeeze snow in a duck mold, release at the right moment, and build a duck parade** | **cool** | **5/4/5/5 = 19** | **Picked.** 눈오리 집게 is an iconic Korean first-snow ritual and 대설 is 12/7. The tactile press-and-release fits the 2026 "texture play" trend, and the screenshot of the parade is easy to share |

Duplicate check:
- The subject is the snow duck, made with a mold.
- `snowprint-puzzle` is about footprints and `snowplow-puzzle` is about clearing roads, so neither shares the subject.
- No queued spec is about snow figures.

## Meta

- slug `snow-duck-maker`, category `cool`, kind `tool`, aspect `9/16`, date `2026-11-25`
- kind is `tool` because this is an endless toy with no game-over. All art is still drawn on canvas, with no raster files.
- tags: ko `눈오리`, `겨울놀이`; en `snow-duck`, `winter`
- title: ko `눈오리 만들기`; en `Snow Duck Maker`
- desc ko: 화면을 꾹 눌러 눈을 집고, 알맞을 때 손을 떼면 눈오리가 톡 나와요. 곰·하트·별 틀과 목도리·털모자로 꾸며 나만의 눈오리 행렬을 저장하세요.
- desc en: Press and hold to squeeze snow in a duck mold, let go at the right moment, and line up a parade of snow ducks. Dress them up and save the picture.
- howto ko: 눈밭을 꾹 누르고 있으면 집게가 오므라들어요. 게이지가 초록일 때 떼면 예쁜 오리, 금색이면 완벽한 오리, 너무 오래 누르면 납작오리가 돼요. 오리를 끌면 옮겨지고, 톡 누르면 옷이 바뀌어요. 키보드: 방향키로 이동, 스페이스 꾹 누르기, 1~4 틀 고르기, A 꾸미기, S 저장.
- howto en: Press and hold the snow to close the mold. Let go in the green zone for a nice duck or the gold zone for a perfect one; hold too long and it comes out flat. Drag a duck to move it, tap it to change its outfit. Keys: arrows move, hold Space to squeeze, 1-4 pick a mold, A dresses, S saves.
- about ko: 대설(12월 7일) 즈음 첫눈이 오면 집게 하나로 골목에 오리 떼가 생기죠. 진짜 눈이 안 와도 여기서는 매일 눈이 와요. 만든 오리는 이 기기에만 저장돼요.
- about en: When the first real snow falls in Korea, little rows of snow ducks appear on walls and benches, made with a plastic mold. Here it snows every day. Your ducks are saved only on this device.

## Pitch

The scene is a quiet snowy night street. The sky is deep blue, a warm streetlamp glows on the left, snow falls gently and a long white snow field fills the lower 60% of the screen.

1. Press anywhere on the snow. A red plastic two-cup mold appears there, scoops snow and closes slowly while a ring gauge fills.
2. Let go:
   - too early gives a crumbly snow lump
   - the green zone gives a nice duck
   - the narrow gold zone gives a sparkling perfect duck
   - too late gives a squashed, wide flat duck (납작오리)
3. Ducks stay where they were made. Drag them into a parade and tap them to add a scarf, beanie or tangerine hat.
4. Unlock the bear, heart and star molds by making ducks. Save the scene as a PNG.

The fun in the first 10 seconds is the "pop" of a duck appearing under your finger.

## Flow

1. **FIRST VISIT HINT**
   - The scene is live right away, with no blocking start screen.
   - A pulsing hint bubble is centered on the snow: "눈밭을 꾹 눌러 보세요 👇".
   - It fades out on the first pointerdown and never shows again (`sdm:hinted`).
2. **SQUEEZE**
   - On pointerdown on empty snow, the mold appears at the pointer.
   - Pressure p rises from 0 to 1 over 1.6 s (linear) and is capped at 1.
   - The two cups rotate closed in proportion to p, and snow particles puff out of the gap.
   - The ring gauge zones are:
     - 0–0.30 gray (lump)
     - 0.30–0.68 green (nice)
     - 0.68–0.80 gold (perfect)
     - 0.80–1.00 blue (flat)
   - At p = 1 the mold shakes gently. It never auto-releases.
   - Moving the pointer more than 24 px during the squeeze cancels it (the mold opens, nothing is made).
3. **RELEASE**
   - The cups spring open over 180 ms and the figure pops: scale 0.6 → 1.08 → 1 over 260 ms.
   - A floating label shows the result (see the Strings table).
   - A lump is a round snowball. It counts as a figure but not as a duck for unlocks.
4. **ARRANGE**
   - Pointerdown on an existing figure (hit test on its bounding ellipse, topmost first) selects it.
   - Moving more than 6 px drags it, clamped to the snow field.
   - Releasing within 250 ms without moving cycles its accessory.
5. **MELT ALL**
   - The first tap on 🌞 turns that button into "한 번 더 누르면 다 녹아요" for 2.5 s.
   - A second tap within that time raises a sun from the right and melts every figure over 1.2 s (shrink to a puddle ellipse, then fade). The scene is then cleared.
   - The total count is kept. No confirm dialog is used.
6. **SAVE**
   - Exports the current scene with a small caption card (see Export).

## Controls

- **Pointer:**
  - Press and hold on empty snow to squeeze; release to make a figure.
  - Drag a figure to move it.
  - Tap a figure to change its outfit.
  - The top bar buttons are tap targets of at least 44 px.
- **Keyboard:**
  - Arrow keys move a visible cursor ring at 300 px/s, delta-timed.
  - Hold Space to squeeze at the cursor; release Space to make a figure.
  - 1–4 pick a mold (locked molds show a toast).
  - A cycles the accessory of the figure nearest the cursor (within 60 px).
  - Shift+arrows drag the nearest figure.
  - S saves. X arms the melt; X again melts. M toggles sound.
  - Call `preventDefault` on Space and the arrow keys.
- **Touch:** set `touch-action:none` on the scene canvas and use single-pointer logic. Ignore a second pointer while one is active.

## Molds and unlocks

`made` is the lifetime count of non-lump figures, saved in `sdm:total`.

| key | ko | en | unlock at made ≥ | shape notes |
|---|---|---|---|---|
| duck | 오리 | Duck | 0 | Oval body, round head offset up and forward, flat beak wedge, small raised tail |
| bear | 곰 | Bear | 5 | Round head with two round ears and a small muzzle bump, sitting on a round body |
| heart | 하트 | Heart | 15 | Puffy 3D heart, slightly tilted |
| star | 별 | Star | 30 | Five-point star with rounded tips, standing on one point |

- The mold picker shows 4 round buttons with emoji icons 🦆 🐻 🤍 ⭐.
- A locked button is dimmed with 🔒. Tapping it shows the toast "{n}마리 더 만들면 열려요 / Make {n} more to unlock".
- When an unlock happens, show the toast "새 틀이 열렸어요: {mold}! / New mold unlocked: {mold}!" and a confetti burst of snowflakes from the button.

## Quality results

| p at release | result | visual | label ko / en | counts as made |
|---|---|---|---|---|
| < 0.30 | lump | Lumpy snowball with 4–6 crumb particles falling off | 앗, 부서졌어요 / Oops, it crumbled | no |
| 0.30–0.68 | nice | Normal figure | 톡! / Pop! | yes |
| 0.68–0.80 | perfect | Normal figure with crisp edges, a highlight sheen and 8 sparkle particles | ✨ 완벽한 {mold}! / ✨ Perfect {mold}! | yes, and perfect +1 |
| > 0.80 | flat | scaleX 1.3, scaleY 0.62, with a few crack lines | 납작{mold}... / Flat {mold}... | yes |

The Korean {mold} is the noun itself, for example "완벽한 오리!" and "납작오리..." (no space). The English label uses the lowercase noun.

## Figure rendering

- Figures are drawn on canvas with paths:
  - snow body #f7f9fc
  - shade #c9d6e8, as a gradient from top-left light to bottom-right shade
  - an ellipse contact shadow on the ground, rgba(60,80,120,0.25)
- Depth: the figure's y inside the snow field maps to a scale from 0.72 (back) to 1.1 (front). Figures are sorted by y every frame (n ≤ 60, so sorting is cheap).
- Each figure stores a small random variation at creation: tilt ±5°, size ±6%, and facing left or right (50%).
- Eyes are two tiny dent dots in shade color (no cartoon eyes, so it stays snow-like). Duck beaks get a slightly darker shade wedge.
- Accessories cycle none → scarf → beanie → tangerine → none:
  - scarf: a red #e0453d band around the neck with a dangling end
  - beanie: navy #2f4a7a with a white pompom
  - tangerine: an orange #f59a23 circle with a green leaf, sitting on the head
- A small pop plays on each change.

## Scene and visual design

- **Palette:**
  - sky gradient from #14203a (top) to #2b3d63 (horizon)
  - lamp glow: warm radial gradient #ffd58a at 35% alpha
  - snow field #eef3fa, with a horizon line in a slightly darker #dfe7f3
  - mold red #e0453d, accent gold #f2c14e, gauge green #4cc38a, flat blue #6aa6e8
- **Layout (portrait):**
  - the top bar is 56 px: the mold picker on the left; 🔊/🔇, 💾 and 🌞 on the right
  - the sky takes 40% of the height below the bar and the snow field takes the rest
- **Landscape or wide screens:** the sky takes 35% and the snow field spans the full width. The UI bar is centered with a max width of 560 px.
- **HUD:**
  - a pill under the bar shows "눈오리 {n}마리 · 지금까지 {total}마리" (n = non-lump figures on screen), plus "✨{perfect}" if perfect > 0
  - text is at least 14 px at 320 px wide
- **Snowfall:**
  - 70 particles on the same canvas, drawn behind the figures in the sky and in front of them in the field (two layers)
  - sine drift and delta-timed movement; the DPR is capped at 2
- **Mold:**
  - two red half-cups on scissor handles, drawn at 64 px base size
  - the cups rotate from ±38° (open) to 0° (closed) by p
  - the ring gauge has radius 52 px and a 6 px stroke, with the zone arcs drawn faint and the current p arc drawn bright
- **Juice:**
  - snow puff particles during the squeeze
  - a 3 px screen shake for 100 ms on a flat result
  - floating labels that rise 30 px and fade over 900 ms
- **prefers-reduced-motion:**
  - 20 slow snowflakes, no shake, no sparkle particles
  - figures still appear, with a 120 ms fade instead of the pop
- **Limit:** at most 60 figures. Creating the 61st melts the oldest with the melt animation and shows no toast.

## Sound (off by default, toggle persisted)

- Squeeze crunch: short bandpassed noise bursts at about 900 Hz, 30 ms each. The rate rises from 6/s to 18/s with p. Gain 0.05.
- Pop: a 70 ms sine sweep from 600 to 900 Hz, gain 0.08.
- Perfect: two sines at 1320 and 1760 Hz, 60 ms apart, 200 ms decay, gain 0.05.
- Flat: lowpassed noise at 300 Hz for 120 ms, gain 0.08.
- Melt: a soft descending sine from 500 to 200 Hz over 1 s, gain 0.04.
- Web Audio is created only on the first user gesture and suspended when the page is hidden.

## Export

- 💾 renders an offscreen canvas at 1080 × 1920 (or 1920 × 1080 if the window is landscape). It redraws the scene from state, not from a screen copy, without the mold, cursor or hint.
- The bottom caption card is a rounded rectangle at 85% white containing:
  - "{date} 눈오리 행렬 · {n}마리" / "{date} Snow duck parade · {n}"
  - "play.mesisi.net"
- Export with `toBlob`, then click an `<a download="snow-ducks.png">` and revoke the URL after 1 s.
- On failure, show the toast "저장에 실패했어요. 화면을 캡처해 주세요" / "Could not save. Please take a screenshot."
- With 0 figures, show the toast "먼저 눈오리를 하나 만들어 보세요" / "Make a snow duck first" and do not export.

## Strings

| key | ko | en |
|---|---|---|
| appTitle | 눈오리 만들기 | Snow Duck Maker |
| hint | 눈밭을 꾹 눌러 보세요 👇 | Press and hold the snow 👇 |
| hudCount | 눈오리 {n}마리 · 지금까지 {total}마리 | {n} on screen · {total} made |
| mold.duck / bear / heart / star | 오리 / 곰 / 하트 / 별 | duck / bear / heart / star |
| lump | 앗, 부서졌어요 | Oops, it crumbled |
| nice | 톡! | Pop! |
| perfect | ✨ 완벽한 {mold}! | ✨ Perfect {mold}! |
| flat | 납작{mold}... | Flat {mold}... |
| locked | {n}마리 더 만들면 열려요 | Make {n} more to unlock |
| unlocked | 새 틀이 열렸어요: {mold}! | New mold unlocked: {mold}! |
| meltArm | 한 번 더 누르면 다 녹아요 | Tap again to melt them all |
| melted | 햇볕에 다 녹았어요. 다시 만들어 볼까요? | The sun melted them all. Make more? |
| save | 사진 저장 | Save picture |
| saved / saveFail | 사진을 저장했어요 / 저장에 실패했어요. 화면을 캡처해 주세요 | Picture saved / Could not save. Please take a screenshot. |
| saveEmpty | 먼저 눈오리를 하나 만들어 보세요 | Make a snow duck first |
| soundOn / soundOff | 소리 켜기 / 소리 끄기 | Sound on / Sound off |
| melt | 다 녹이기 | Melt all |
| caption | {date} 눈오리 행렬 · {n}마리 | {date} Snow duck parade · {n} |
| welcomeBack | 밤새 오리들이 그대로 있어요 | Your ducks waited for you overnight |

- Button `aria-label`s use the save, melt, soundOn/soundOff and mold.* strings.
- The canvas gets `role="img"` with an `aria-label` from hudCount.
- {date} is YYYY.MM.DD in ko and the `toLocaleDateString('en')` format in en.

## localStorage (in try/catch, prefix `sdm:`)

- `sdm:figs`: a JSON array of up to 60 items `{x, y, mold, q, acc, tilt, size, face, t}`.
  - x and y are normalized 0–1 within the snow field, so a resize keeps positions.
  - q is one of lump, nice, perfect or flat; acc is 0–3.
  - Write after each create, move end, accessory change and melt, debounced by 300 ms.
- `sdm:total`: the lifetime count of non-lump figures (drives unlocks).
- `sdm:perfect`: the lifetime count of perfect figures.
- `sdm:mold`: the last selected mold.
- `sdm:sound`: "1" or "0", default "0".
- `sdm:hinted`: "1" once the hint has been dismissed.

On load with saved figures, show the welcomeBack toast once for 2 s.

## Edge cases

- **Blocked storage:** everything works in memory and unlocks reset each visit.
- **Corrupt `sdm:figs` JSON:** ignore it, start empty and overwrite it on the next save.
- **Pointerdown in the sky area:** nothing happens. The squeeze starts only inside the snow field (and the cursor ring is clamped there too).
- **Pointer leaves the canvas or `pointercancel` fires during a squeeze:** cancel the squeeze and make nothing. Use `setPointerCapture`.
- **Page hidden mid-squeeze:** cancel the squeeze, pause the loop and clamp delta to 50 ms on resume.
- **Resize:** recompute the field rectangle and keep figures at their normalized positions. The figure scale follows the field height, so nothing ends up off-screen at 320 × 480.
- **Hits:** taps on overlapping figures pick the topmost (highest y, drawn last). A squeeze can start on empty snow even when it is close to figures.
- **Dragging:** a dragged figure re-sorts its depth live, and its scale changes with y.
- **Melt during a drag or squeeze:** cancel the interaction first.
- **Unlocks:** a mold unlocked in this session stays selectable. Selecting a locked mold with keys 1–4 only shows the toast.
- **Demo hash:** if `location.hash === '#demo'`, skip the hint and place 9 preset figures (5 ducks in a parade line, 1 perfect bear with a scarf, 1 flat duck, 1 heart with a tangerine, 1 lump). Also show the HUD. This is for QA thumbnails only and does not write to storage.
- **Language:** read `lang` from the URL, fall back to `navigator.language` (ko if it starts with "ko", otherwise en) and set `<html lang>` to match.

## Must not

- No network of any kind, no raster or video files and no fonts. Everything is canvas or emoji, and the file stays under 120 KB.
- No product brands, store names or look-alikes of any duck character (no rubber-duck mascots, no cartoon characters). Figures look like plain molded snow.
- No weather data, real snowfall claims or location use.
- No alert, confirm, prompt, window.open or navigation. Melt-all uses the two-tap arm instead of a dialog.
- No sound autoplay, and sound is off by default.
- No timer, score pressure or game-over. This is a calm toy.
- The page never scrolls or zooms, and no pinch gestures are used.
