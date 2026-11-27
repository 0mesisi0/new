Brief, research, rules, example spec 다 읽음. 이제 최종 문서 작성.

# Idea and spec: 말랑이 주무르기 / Squishy Squeeze

Agent: Claude (opus). Design notes are merged in (palette, layout, motion, sound).

## Concepts scored

Scores are 1–5 for: value in the first 10 seconds, originality, Korean search/share demand, and buildability in one HTML file. Maximum 20.

| Concept | Category | Score | Verdict |
|---|---|---|---|
| 고슴도치 빗질: brush a sleepy hedgehog gently, go too fast and it curls into a spiky ball | games | 4/3/3/4 = 14 | Too close to a viral cat-brushing game's core loop and to `bear-hibernation` (keep-it-calm tension). Skip for now |
| 기부금 세액공제 계산기 2026: last-minute December donation credit check | tools | 2/3/4/3 = 12 | The tax angle is crowded (pension done; card, medical and rent queued). The only source is a blog, and the rules need NTS confirmation |
| **말랑이 주무르기 / Squishy Squeeze** | **cool** | **5/4/4/4 = 17** | **Picked**: rides the November "말랑·쫄깃" tactile trend, shows its value on the first touch, and needs no rules or reading |

## Meta

- slug `squishy-squeeze`, category `cool`, kind `tool`, aspect `9/16`, date `2026-11-27`
- tags: ko `말랑이`, `스트레스 해소`; en `squishy`, `fidget`
- title: ko `말랑이 주무르기`; en `Squishy Squeeze`
- desc ko: 화면 속 말랑이를 꾹 누르고 쭉 늘려 보세요. 손을 떼면 말랑말랑 출렁이며 돌아와요. 구름, 발바닥 젤리, 푸딩까지 골라 주물러요.
- desc en: Press, squish and stretch a wobbly squishy toy on your screen. Let go and it jiggles back into shape. Pick a cloud, a paw jelly, a pudding and more.
- howto ko: 말랑이를 누르고 있으면 꾹 눌리고, 끌면 쭉 늘어나요. 두 손가락으로 벌리면 양쪽으로 늘어나요. 너무 세게 늘리면 '뾱' 하고 튕겨 돌아와요. 아래 버튼이나 숫자키 1~5로 말랑이를 바꿔요. 키보드는 Space로 누르고, 방향키를 누르고 있으면 그쪽으로 늘어나요. M은 소리 끄기예요.
- howto en: Hold the squishy to press it and drag to stretch it. Spread two fingers to pull it both ways. Stretch too far and it snaps back with a boing. Switch toys with the buttons below or keys 1-5. Keyboard: hold Space to squeeze, and hold an arrow key to stretch that way. M mutes.
- about ko: 모든 소리는 브라우저가 그 자리에서 만들어요. 진동은 지원하는 휴대폰에서만 살짝 울려요. 주무른 기록은 이 기기에만 저장돼요.
- about en: Every sound is synthesized live in your browser. Phones that support it give a tiny buzz on each squish. Your counts stay on this device.

## Pitch

A plump, glossy squishy with a tiny face sits in the middle of a soft pastel winter-morning backdrop.

1. Touch it and it dents under your finger. Its eyes squeeze shut (><) and it makes a soft squish sound.
2. Drag it and it stretches like dough, thinning in the middle. Let go and it wobbles back with damped jiggles.
3. Pull past the limit and it snaps back with a "뾱/boing". Its face goes dizzy (@ @) for 0.8 s.
4. A small "스트레스" gauge drains as you play. At 0% it shows a gentle "말랑 마스터" pop with confetti, then quietly refills to 100% over 2 s so you can keep going.

There is no score pressure and no game over. It's a fidget toy.

## Flow

1. **TOY (the only screen; there is no start screen because this is a tool)**
   - **Top bar:**
     - the title, small
     - the stress gauge: a pill bar plus a "스트레스 72%" label
     - a mute toggle 🔊/🔇
   - **Center:** the squishy canvas, which fills the space between the top and bottom bars.
   - **Bottom bar:**
     - 5 skin buttons: emoji plus a short label, each at least 48 px
     - a counter line "오늘 {n}번 주물렀어요 · 최고 늘리기 {x}배"
   - **First visit:** a pulsing hint "꾹 눌러 보세요 👆" floats above the squishy. It disappears on the first pointerdown and never shows again (`sqz:hinted`).
2. **MASTER pop (overlay, non-blocking)**
   - Triggers when the gauge reaches 0.
   - Shows "말랑 마스터! 스트레스 0%" plus 30 confetti particles for 1.6 s.
   - The gauge then animates back to 100% over 2 s.
   - Input keeps working during the pop.

## Squishy physics

- **Model:** a ring of N = 48 vertices around center C, with rest radius R = min(canvasW, canvasH) × 0.28.
  - Each skin supplies a rest-shape function r(θ) as a multiplier of R (see Skins).
  - Each vertex keeps an offset vector from its rest position, plus a velocity.
- **Integration:** semi-implicit Euler with dt clamped to 1/30 s and 2 substeps per frame.
  - Spring to rest: k = 120, damping c = 9. This tuning gives about 3–4 visible wobbles after release.
  - Neighbor smoothing: each substep, offset += 0.15 × (average of neighbor offsets − offset). This keeps the outline smooth.
- **Press (pointer down, not moving more than 6 px):**
  - Every vertex within 1.2R of the press point gets pushed away from it along the normal toward C.
  - The push uses falloff (1 − d/1.2R)² and grows to 0.22R over 250 ms while held.
  - The whole body also scales: sy = 1 − 0.12p and sx = 1 + 0.10p, where p is press strength 0..1.
  - A small highlight circle appears under the finger.
- **Stretch (drag):**
  - On pointerdown, grab the nearest vertex and its neighbors within ±6 indices, with weights cos falloff.
  - The grabbed vertices follow the pointer delta. The opposite side is pulled 25% toward the drag, which reads as volume conservation.
  - Stretch factor s = |farthest vertex − C| / R is shown live in the counter.
  - Limit: when s > 2.2, release the grab automatically. Add a velocity kick of 1.5× toward rest. This is the "snap" (sound, dizzy face, vibrate 25 ms).
- **Two pointers:** each pointer grabs its own vertex group, so pulling them apart stretches both ways. A third or later pointer is ignored.
- **Release:** drop the grab. The springs bring the shape back, and the outline wobble is the payoff.
- **Rendering:**
  - canvas 2D, outline drawn with quadratic curves through vertex midpoints
  - fill: radial gradient from a highlight at the top-left to the skin's base color
  - a soft drop shadow ellipse under the body, which flattens and widens when pressed
  - a glossy white highlight blob that rides with the vertices at the 10–11 o'clock position
- **Face:**
  - Two eyes and a mouth placed relative to the centroid of the vertices, scaled by the current bounding box, so the face stretches with the body.
  - Expressions:
    - idle: dot eyes, small smile, and a 4 s random blink
    - pressed: `> <` eyes and a wavy mouth
    - stretching (s > 1.4): round eyes and an "o" mouth
    - snapped: `@ @` for 0.8 s
    - master pop: ^ ^ eyes and a big smile for 1.6 s
  - The face is drawn with strokes, not emoji, so it deforms smoothly.
- **Gauge:**
  - Each completed press of 150 ms or longer counts as 1 squish and costs 3% stress.
  - Each stretch release with s > 1.3 costs 4%.
  - The gauge never goes below 0.

## Skins

All skins are available from the start. There is no unlocking. The rest-shape r(θ) uses θ = 0 for right and runs counterclockwise.

| # | key | ko | en | emoji | base / highlight / outline | rest shape | extra decal |
|---|---|---|---|---|---|---|---|
| 1 | cloud | 말랑 구름 | Cloud | ☁️ | #f4f7ff / #ffffff / #c9d4ef | 1 + 0.08·cos(5θ) clipped to ≥ 0.96 on the bottom half (bumpy top, flat-ish base) | pink cheeks |
| 2 | paw | 발바닥 젤리 | Paw Jelly | 🐾 | #ffb7c5 / #ffe3ea / #e48aa0 | ellipse 1.1 wide × 0.9 tall | 4 small toe-bean ovals above the body. Each is a mini 12-vertex ring with the same physics, anchored to the main body's top vertices |
| 3 | pudding | 푸딩 | Pudding | 🍮 | #ffd98a / #fff2cc / #d9a441 | trapezoid-ish: 0.85 at top, 1.05 at bottom | a caramel cap: the top 22% of the outline filled #9c5a1c, following deformation |
| 4 | peach | 복숭아 | Peach | 🍑 | #ffc4a8 / #fff0e6 / #e8957a | circle with a 0.06 dip at θ = 90° (top cleft) | 1 green leaf at the top that sways with velocity |
| 5 | drop | 물방울 말랑이 | Water Drop | 💧 | #8fd3ff (alpha 0.85) / #e9f7ff / #4aa8de | teardrop: 1 + 0.35·max(0, sin θ)^4 (point at the top) | semi-transparent with 3 tiny bubbles inside that drift |

The background changes slightly with each skin: a pastel gradient whose top color is the skin base color at 25% mixed with #fdf8f3, fading to #f1ecf7 at the bottom. Faint snowflakes (12, very slow) are optional decoration and are turned off under reduced motion.

## Controls

- **Pointer:**
  - Press and hold to squeeze; drag to stretch.
  - Two fingers pull both ways.
  - Skin buttons are tap targets.
  - The canvas has `touch-action:none`, and `preventDefault` is called on pointerdown and touchmove.
  - Use pointer capture so a drag survives leaving the canvas.
- **Keys:**
  - Space (held): press at the center with strength ramping as described above.
  - Arrow keys (held): stretch from the vertex facing that direction, moving the virtual pointer 0.9R per second. Release the key to let go. Two arrows at once (for example ← and →) act as two pointers.
  - 1–5: pick a skin. N: next skin. M: toggle sound and vibration.
  - `preventDefault` on all of these keys.
  - The Tab focus order is: mute, then skins 1–5. Focus rings are visible.
- **Skin switch:** the old body shrinks to 0.6 and fades (120 ms), then the new one pops in from 0.6 to 1.08 to 1 (220 ms) with one wobble.

## Sound and vibration (off by default; one toggle)

- Web Audio is created only on the first user gesture after the user turns sound on.
- **Squish:**
  - 90 ms of bandpass-filtered noise, center 400 Hz moving to 220 Hz, Q 1.2, gain 0.08
  - plus a sine 180 Hz moving to 120 Hz, 70 ms, gain 0.05
  - pitch ±8% random so repeats don't sound identical
- **Stretch creak (while dragging):** a low-volume (0.02) filtered noise whose cutoff follows s (300 → 1200 Hz). It fades out within 80 ms when the drag stops.
- **Snap "boing":** a sine 520 Hz → 180 Hz in 160 ms with a 9 Hz vibrato, gain 0.1.
- **Master pop:** three ascending sine blips at C6, E6 and G6, 60 ms each, gain 0.06.
- **Vibration:**
  - `navigator.vibrate` exists and sound is on: squish 10 ms, snap 25 ms.
  - Wrap every call in try/catch and feature-check it.
- The mute icon and its aria-label update together.

## Visual design

- **Palette:**
  - background: pastel gradient as described in Skins
  - ink #3b3550, sub-text #8b84a3
  - gauge: track #ece6f5, fill gradient from #ff9fb8 to #ffc98a
  - confetti: the 5 skin base colors
- **Type:** system-ui stack. The title is 18 px bold, the counters 14 px, and the gauge label 13 px with tabular numbers.
- **Layout:**
  - top bar 56 px, bottom bar about 120 px (skins row plus counter line), canvas fills the rest
  - at 320 px wide: skin labels hide, only emoji show at 48 px, and the counter text wraps
  - wide screens: the UI column is max 480 px and centered, while the canvas background spans the full window
- **Juice:**
  - shadow squash; a subtle background ripple ring from the press point on release (300 ms, alpha 0.25)
  - a 2 px screen nudge on snap
  - gauge numbers tick down smoothly
- **prefers-reduced-motion:**
  - wobble damping raised to c = 16, so the toy settles in about 1 wobble
  - no ripple, no screen nudge, no snowflakes
  - confetti replaced by a static "말랑 마스터!" badge for 1.6 s
- **Canvas:** DPR capped at 2. On resize, recompute C and R, then rescale the current vertex offsets proportionally (offset × newR/oldR). Never reset mid-drag.

## Strings

| key | ko | en |
|---|---|---|
| appTitle | 말랑이 주무르기 | Squishy Squeeze |
| hint | 꾹 눌러 보세요 👆 | Give it a squeeze 👆 |
| stress | 스트레스 {p}% | Stress {p}% |
| counter | 오늘 {n}번 주물렀어요 · 최고 늘리기 {x}배 | Squished {n} times today · Best stretch {x}× |
| counterTotal (aria/tooltip) | 지금까지 모두 {t}번 | {t} squishes all time |
| master | 말랑 마스터! 스트레스 0% | Squish Master! Stress 0% |
| refill | 다시 말랑해질 준비 중... | Getting squishy again... |
| snap | 뾱! | Boing! |
| skinCloud / skinPaw / skinPudding / skinPeach / skinDrop | 말랑 구름 / 발바닥 젤리 / 푸딩 / 복숭아 / 물방울 말랑이 | Cloud / Paw Jelly / Pudding / Peach / Water Drop |
| soundOn / soundOff | 소리·진동 켜기 / 소리·진동 끄기 | Sound & buzz on / Sound & buzz off |
| canvasLabel (aria) | 말랑이. 누르거나 끌어서 주무르세요 | Squishy toy. Press or drag to squish it |
| keysHint (small, desktop only, under counter) | Space 꾹 · 방향키 늘리기 · 1~5 바꾸기 · M 소리 | Space squeeze · Arrows stretch · 1-5 switch · M sound |

`{x}` is shown with one decimal (e.g. 2.1). The best stretch is capped at the 2.2 limit, so display it as `min(best, 2.2)`.

## localStorage (in try/catch, prefix `sqz:`)

- `sqz:skin`: the last skin key, default `cloud`
- `sqz:sound`: "1" or "0", default "0"
- `sqz:hinted`: "1" after the first press
- `sqz:total`: the all-time squish count (integer)
- `sqz:day`: a JSON object `{"d":"YYYY-MM-DD","n":12,"best":1.9}` holding today's count and best stretch, using the local date. If `d` is not today, reset `n` and `best`.
- Write at most once every 1 s (debounced), plus once on `visibilitychange` to hidden.

## Edge cases

- If localStorage is blocked, everything still works. Counters are in-memory only.
- **pointercancel or lostpointercapture:** treat it as a release, so the shape never stays stuck in a stretched state.
- **Page hidden:** pause the rAF loop, stop the creak sound and drop all grabs. On return, dt is clamped, so there is no explosion.
- **Huge dt or NaN guard:** if any vertex offset exceeds 4R or becomes non-finite, reset all offsets and velocities to 0.
- **Very fast flicks:** clamp the pointer delta per substep to 0.5R so the outline cannot self-intersect badly.
- **Skin switch during a drag:** the drag is released first, then the swap animation plays.
- **Window resize below 320×480:** keep the minimum R at 70 CSS px and let the bottom bar shrink to emoji only.
- **Midnight rollover while open:** check the date on each count write and reset today's counters if the date changed.
- **`location.hash === '#demo'`:** for the QA thumbnail only.
  - Select `paw`.
  - Pose: hold a synthetic stretch to s = 1.7 toward the upper right, with the "stretching" face.
  - Gauge at 64%, counter showing 23 squishes and best 1.7×.
  - No hint and no sound.

## Must not

- No network of any kind, no images and no fonts. Draw everything with canvas and CSS. Stay under 60 KB.
- Do not copy any commercial squishy toy, its character or brand. No trademarked shapes or mascots. No "두쫀쿠" or any named shop dessert.
- No rice-cake or 떡 skin (it overlaps queued `garaetteok-slicer`). No snowman skin (it overlaps queued `unbeatable-snowman-tictactoe`). No static or puffer theme (it overlaps queued items).
- No jump scares, biting or punishment. Overstretching is a cute "boing", never a fail state.
- No timer, no score screen and no leaderboard. It's a toy.
- Keep it non-sexual and non-gory. Faces stay cute, and stretching never tears the body or shows insides.
- No health or medical claims about stress relief. The gauge is a joke meter.
- No alert, confirm, prompt, window.open or navigation. No sound autoplay. No vibration while muted.
