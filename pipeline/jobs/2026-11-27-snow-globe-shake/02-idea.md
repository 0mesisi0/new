# Idea and spec: 스노우볼 흔들기 / Shake the Snow Globe

## Concepts scored

Scores are 1–5 for: fun in the first 10 seconds, originality, Korean search/share demand, and buildability in one HTML file. Maximum 20.

Research directions checked first: page smashing (`page-smash`), 2027 sheep fortune (`new-year-fortune-2027`) and the year-end card deduction calculator (`card-deduction-calculator-2026`) are all already queued. 곶감 overlaps with the queued `persimmon-breeze` subject, and cat brushing overlaps with `cat-vs-keyboard`. All of them are skipped.

| Concept | Category | Score | Verdict |
|---|---|---|---|
| 빙판길 펭귄 걸음: tap-timed tiny steps across an icy sidewalk without slipping | games | 4/4/3/4 = 15 | Good, but "ice" sits close to `thin-ice-puddle`. Keep it for a later date. |
| 한글 조합기: build syllables from 초성+중성+종성 and watch the Unicode math (0xAC00 + …) | tech | 3/4/3/4 = 14 | Solid learn/tech item, but its share demand is weak in December. |
| **스노우볼 흔들기** | **cool** | **5/3/4/5 = 17** | **Picked.** It gives instant tactile joy, and the research shows rising demand for "experience" content at year end. The settled globe with a personal plaque saves as a December-greeting image. No existing or queued item uses a snow globe. |

## Meta

- slug `snow-globe-shake`, category `cool`, kind `game`, aspect `9/16`, date `2026-11-27`
- kind is `game` so that all art is drawn on canvas, with no raster images. It is a toy, so rule 6 is satisfied by a light loop (see Flow): start screen → shake → "settled" result card with shake count and longest calm → retry.
- tags: ko `스노우볼`, `겨울`; en `snow globe`, `winter`
- title: ko `스노우볼 흔들기`; en `Shake the Snow Globe`
- desc ko: 화면을 문지르거나 폰을 흔들면 유리구슬 속에 눈보라가 일어요. 장면과 반짝이 색을 고르고 받침에 한 줄을 새겨 연말 인사 이미지로 저장하세요.
- desc en: Rub the screen or shake your phone to stir a blizzard inside a glass globe. Pick a scene and glitter, engrave a line on the base, and save it as a winter greeting.
- howto ko: 유리구슬을 잡고 좌우로 문지르면 흔들려요(스페이스·방향키도 돼요). 폰이라면 '흔들기 센서 켜기'를 눌러 진짜로 흔들어 보세요. 눈이 다 가라앉으면 '이미지 저장'으로 간직하세요.
- howto en: Grab the globe and rub side to side to shake it (Space and the arrow keys work too). On a phone, tap "Use motion sensor" and shake for real. When the snow settles, tap "Save image" to keep it.
- about ko: 눈송이 하나하나가 물속처럼 천천히 가라앉도록 직접 계산해요. 가라앉는 걸 끝까지 보고 있으면 이상하게 마음이 차분해져요. 입력한 문구는 이 기기 밖으로 나가지 않아요.
- about en: Every flake is simulated to sink slowly as if in water. Watching it all settle is oddly calming. Your engraved text never leaves this device.

## Pitch

A big glass snow globe sits on a wooden base in the middle of a dim, warm room.

1. The user drags, rubs or flicks the globe. The globe wobbles on a spring, and hundreds of flakes swirl inside it, following the shake direction and speed.
2. When the user stops, the flakes drift down slowly in fluid drag and pile up softly on the scene floor and rooftops.
3. A thin ring around the base fills as the snow settles. When it is calm, a gentle chime plays (if sound is on) and a small "눈이 다 내렸어요" badge appears.
4. The user can switch among 4 scenes and 3 glitter colors and engrave up to 12 characters on the brass plaque.
5. "Save image" exports a PNG of the globe mid-flurry or settled.

## Flow

1. **START**
   - Shows the title, a one-line subtitle, a small preview globe with a few lazy flakes, and a big "흔들어 보기" button.
   - Tapping anywhere on the globe also starts.
2. **PLAY**
   - The full-height globe is centered, with the plaque on the base showing the engraved text.
   - Top bar: mute toggle 🔊/🔇 and a ⚙️ customize button.
   - Bottom bar: [장면 ◀ ▶] [반짝이 ● ● ●] [이미지 저장].
   - If `DeviceMotionEvent` exists, a "흔들기 센서 켜기" chip appears under the globe.
   - A shake counter "흔든 횟수 12" sits small at the top left.
3. **CUSTOMIZE sheet** (a slide-up panel, not a dialog)
   - Plaque text input (max 12 chars, default "{y} 수고했어요 ❄" / "Well done, {y} ❄").
   - Scene picker (4 thumbnails drawn live on small canvases).
   - Glitter picker (snow white / gold / pink), and [닫기].
   - The globe stays visible above the panel.
4. **SETTLED** (automatic, no screen change)
   - When average flake speed stays under the threshold for 1.5 s after a shake, the badge pops in: scale 0 → 1.15 → 1 over 300 ms.
   - The badge reads "눈이 다 내렸어요 · {s}초" (the seconds from the last shake to settled).
   - The session's "longest calm" is updated if the user watched without touching.
   - Any new shake hides the badge.
5. **Result loop (rule 6)**
   - Tapping the badge opens a small result card inside the bottom sheet: total shakes, settle time, best settle time (stored), and [다시 흔들기] [이미지 저장].
   - [다시 흔들기] resets the flakes to an even scatter and the counter for this round.

## Controls

- **Pointer on the globe**
  - Pointer down, then move: the globe offset follows the pointer delta (clamped to 18 px). The flakes get an impulse equal to −Δglobe × 40 (inertia: the water lags behind the glass).
  - Release: the globe springs back (k = 180, damping 14).
  - A "shake" is counted when the drag direction reverses with speed > 600 px/s, at most once per 120 ms.
- **Pointer elsewhere:** buttons only. The play area has `touch-action:none`.
- **Motion sensor**
  - Tapping the chip calls `DeviceMotionEvent.requestPermission()` if it exists (iOS), otherwise it starts listening directly.
  - The acceleration delta (without gravity, falling back to `accelerationIncludingGravity` minus a low-pass) maps to the same impulse.
  - It is debounced like the pointer. If permission is denied, show the toast "센서를 쓸 수 없어요. 화면을 문질러 주세요" and hide the chip.
- **Keys**
  - Space or Enter: one strong random shake.
  - ArrowLeft / ArrowRight: a directional shake.
  - ArrowUp: an upward toss.
  - 1–4: scene. G: cycle glitter. E: open customize (Esc closes it). S: save image. R: reset. M: toggle sound.
  - `preventDefault` on all of these, except while typing in the plaque input.
- **Tap targets:** all at least 44 px. The bottom bar wraps to 2 rows below 360 px width.

## Scenes

All scenes are drawn with canvas paths in a 2-tone night palette. Each one defines its own floor and "ledges" (a polyline height map where snow can rest).

| # | ko | en | Content | Ledges |
|---|---|---|---|---|
| 1 | 한옥 마을 | Hanok Lane | Two tiled roofs with curved eaves, a stone wall, a warm paper-window glow | roof lines, wall top, ground |
| 2 | 아파트 불빛 | Apartment Lights | 3 stubby blocks with randomly lit windows (seeded, fixed per scene) and a tiny playground slide | roof tops, slide, ground |
| 3 | 눈사람 마당 | Snowman Yard | A round 2-ball snowman with a twig arm and a scarf, a small pine | snowman head and shoulders, tree tiers, ground |
| 4 | 숲속 오두막 | Cabin in the Woods | An A-frame cabin with a chimney puff (slow 3-circle smoke loop), 3 pines | roof, tree tiers, ground |

- No real landmarks, brands or characters. The snowman is generic (no faces copied from any franchise).
- Lit windows flicker gently, with alpha 0.85–1 on a 4 s sine, one random window at a time.

## Simulation

- **Flake count:** N = 260 (120 under `prefers-reduced-motion` or when `devicePixelRatio` × area is small, < 300k px²).
- **Flake properties:** position, velocity, radius r ∈ [1.2, 3.2] px (logical), spin phase, and resting flag.
- **Glitter:** 15% of flakes are flat flecks that twinkle (alpha follows the spin phase).
- **Per step (dt capped at 1/30 s):**
  - v += (impulse + g) × dt, where g = 22 px/s² (slow sink).
  - v ×= exp(−2.4 × dt) (fluid drag).
  - Terminal sink speed is about 9–18 px/s, depending on 1/r.
  - Add a small curl noise for drift: sin(y × 0.03 + t) × 6 px/s on x.
- **Boundary:** if the distance from the globe center > R − r, reflect the normal velocity × 0.3 and push the flake inside.
- **Resting**
  - A flake whose y reaches the ledge height at its x, with speed < 14 px/s, becomes resting.
  - The ledge height at that x rises by r × 0.35, capped at +10 px per ledge column, so piles look soft.
  - Resting flakes are rendered in a cached "snow layer" canvas.
- **Unresting on shake:** an impulse > 250 px/s² frees all resting flakes. They get a random upward kick of 40–140 px/s and the pile height map resets.
- **Settle detection:** at most 20 flakes still moving, and average speed < 4 px/s, for 1.5 s.
- **Performance:** a single requestAnimationFrame loop. The background, glass highlight and base are cached in an offscreen canvas and redrawn only on resize or scene change. Pause when `document.hidden`.

## Visual design

- **Palette**
  - room: a radial gradient from #2b2238 (center) to #120f1a
  - wood base: #6b4a2f with a #8a6442 highlight; brass plaque #c9a45c with #7a5a24 engraved text
  - glass: a 1.5 px white stroke at 35% alpha, plus 2 curved highlight arcs at 25% and 12% alpha; water tint #9ec9ff at 6% alpha
  - flakes: white #ffffff, gold #ffd98a, pink #ffc4dc
  - badge: #fffaf0 on #3a2f4f, with a 999 px radius
- **Globe size:** R = min(width × 0.42, height × 0.30). Centered at 44% height. The base is a trapezoid of R × 1.5 width below it.
- **Wobble:** the whole globe, base included, translates and rotates by offset.x × 0.004 rad.
- **Juice**
  - a soft white flash of the glass rim (alpha +0.2 for 120 ms) on each counted shake
  - when settled: 3 slow sparkles rise from the plaque
- **Room:** 6 faint bokeh lights (blurred circles) drifting at 2 px/s behind the globe.
- **Typography:** system-ui. The title is 28 px bold, the plaque text is 14 px semibold (auto-shrinks to fit, with a minimum of 10 px).
- **Small screens:** at 320 px wide, the globe radius is never under 110 px and the bottom bar uses icon + short label.
- **Wide screens:** a centered column with a max width of 520 px. The room gradient fills the window.
- **prefers-reduced-motion:** no wobble rotation, no bokeh drift, no badge pop (fade only), and the reduced flake count.

## Sound (off by default, Web Audio only after a user gesture)

- Shake swish: bandpassed white noise, 120 ms, gain 0.05, center frequency 900–1600 Hz scaled by shake strength.
- Glass tink: on boundary hits with speed > 300 px/s, rate-limited to 6 per second. A 3.2 kHz sine with 1.4 kHz partial and 180 ms decay, gain 0.02.
- Settled chime: 3 soft sine notes (E6, B5, G#5), 90 ms apart, each with 600 ms decay, gain 0.04. No recognizable melody.
- The mute setting is persisted.

## Export

- **Save image**
  - Render an offscreen canvas at 1080 × 1350 with the room gradient, globe, current flakes (frozen frame), plaque and scene.
  - At the bottom, draw "{plaque}" again in 28 px #fffaf0, and "play.mesisi.net" in 16 px at 50% alpha at the bottom right.
  - Export with `toBlob` and an `<a download="snow-globe.png">` click, then revoke the URL after 1 s.
  - Toast "이미지를 저장했어요". On failure, toast "저장에 실패했어요. 화면을 캡처해 주세요".
- No text copy or share sheet. The image is the share unit.

## Strings

| key | ko | en |
|---|---|---|
| appTitle | 스노우볼 흔들기 | Shake the Snow Globe |
| startSub | 문지르면 눈보라, 기다리면 고요. 유리구슬 속 겨울을 흔들어 보세요 | Rub for a blizzard, wait for the calm. Shake a tiny winter in glass. |
| startBtn | 흔들어 보기 | Give it a shake |
| hint | 유리구슬을 잡고 좌우로 문질러 보세요 | Grab the globe and rub side to side |
| sensorBtn | 흔들기 센서 켜기 | Use motion sensor |
| sensorOn | 폰을 흔들어 보세요 | Now shake your phone |
| sensorFail | 센서를 쓸 수 없어요. 화면을 문질러 주세요 | Motion sensor unavailable. Rub the screen instead. |
| shakes | 흔든 횟수 {n} | Shakes {n} |
| settled | 눈이 다 내렸어요 · {s}초 | All settled · {s}s |
| scene | 장면 | Scene |
| scene1..4 | 한옥 마을 / 아파트 불빛 / 눈사람 마당 / 숲속 오두막 | Hanok Lane / Apartment Lights / Snowman Yard / Cabin in the Woods |
| glitter | 반짝이 | Glitter |
| glitter1..3 | 하얀 눈 / 금빛 / 분홍빛 | Snow white / Gold / Pink |
| customize | 꾸미기 | Customize |
| plaqueLabel | 받침에 새길 말 (12자) | Engrave the base (12 chars) |
| plaqueDefault | {y} 수고했어요 ❄ | Well done, {y} ❄ |
| close | 닫기 | Close |
| resultTitle | 이번 눈보라 | This flurry |
| resultShakes | 흔든 횟수 | Shakes |
| resultSettle | 가라앉기까지 | Time to settle |
| resultBest | 가장 오래 지켜본 고요 | Longest calm watched |
| again | 다시 흔들기 | Shake again |
| save | 이미지 저장 | Save image |
| saved / saveFail | 이미지를 저장했어요 / 저장에 실패했어요. 화면을 캡처해 주세요 | Image saved / Could not save. Please take a screenshot. |
| soundOn / soundOff | 소리 켜기 / 소리 끄기 | Sound on / Sound off |
| seconds | {s}초 | {s}s |

`{y}` is the current year from the real clock, so it is 2026 now and automatically 2027 after New Year.

## localStorage (in try/catch, prefix `sg:`)

- `sg:sound`: "1" or "0", default "0"
- `sg:scene`: "1"–"4", default "1"
- `sg:glitter`: "1"–"3", default "1"
- `sg:plaque`: the last engraved text. Empty means use the default string.
- `sg:best`: the longest calm watched, in seconds (integer)
- `sg:total`: lifetime shakes (shown only in the result card as "누적 {n}번 / {n} total")

## Edge cases

- The plaque input trims whitespace, caps at 12 grapheme clusters (use `Intl.Segmenter` if it exists, else `Array.from`), and strips control characters. Emoji are allowed.
- While the customize sheet is open, globe pointer input still works above the sheet, but keyboard shortcuts are off while the input has focus.
- On resize, rescale flake positions proportionally to the new R, rebuild the cached layers and the ledge map, and keep the resting state. Never re-scatter.
- When the page is hidden, pause the loop, stop sensor impulses and clamp dt on resume.
- Motion sensor
  - Ignore events while the pointer is down (no double impulse).
  - Cap the impulse at 2,500 px/s² so a violent shake cannot tunnel flakes outside the glass. After each step, force any escaped flake back inside.
  - If no motion event arrives within 1 s after permission is granted, show the sensorFail toast.
- Settle detection never fires within 0.8 s of the start screen (the flakes start resting in a "pre-settled" state on load). The first "settled" requires at least 1 shake.
- "Longest calm watched" counts only if there was no pointer or key input from the last shake until settle, plus extra idle time while settled. It stops at the next input, with a cap of 600 s.
- Restart ([다시 흔들기] or R) resets the flakes, round counter and badge, and keeps the scene, glitter, plaque and sound.
- When localStorage is blocked, everything works with the defaults.
- If `location.hash === '#demo'`, skip START, use scene 1 with gold glitter, apply one strong shake, and simulate 0.6 s instantly, so the thumbnail shows a mid-flurry globe. This is for QA thumbnails only.

## Must not

- No network of any kind, no raster images, and no external fonts. Everything is drawn on canvas or with CSS. Stay under 120 KB.
- No real landmarks, buildings, brands, characters or people, and no look-alike of any commercial snow-globe product or franchise scene.
- No recognizable song or carol melody (`crank-carol-music-box` covers music). Chimes only.
- No alert, confirm, prompt, window.open or navigation. The only allowed system prompt is the OS motion-permission prompt, and only after the user taps the sensor chip.
- No sound autoplay and no vibration API spam (at most `navigator.vibrate(10)` per counted shake, only with sound on, wrapped in try/catch).
- No fortune, score pressure or timer anxiety. The result card is gentle stats, not a rank.
- Do not store anything except the keys above, and never send the plaque text anywhere.
