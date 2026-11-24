# Idea and spec: 살얼음 웅덩이 깨기 / Thin Ice Puddle

## Concepts scored

Each concept is scored 1–5 on four things: value in the first 10 seconds, originality, Korean search/share demand, and how buildable it is as one HTML file. The maximum is 20.

| Concept | Category | Score | Verdict |
|---|---|---|---|
| 연말정산 카드 공제 미리 계산기 (credit/check card deduction preview before 12/31) | tools | 2/2/5/3 = 12 | Demand is high, but the deduction rates and limits for income year 2026 are not confirmed in today's research. A wrong number costs the user real money. Revisit in January with verified rules |
| 고드름 따기 (snap icicles off an eave without letting them fall on the passerby) | games | 4/3/2/4 = 13 | Fun but thin. Searches for "고드름" are mostly news, not play |
| **살얼음 웅덩이 깨기** | **cool** | **5/4/3/5 = 17** | **Picked.** It hits the 2026 short-form "texture play" trend (research #6), which is about tactile, satisfying interaction. The first tap already pays off, and the subject is new: no ice-puddle item exists and none is queued. Ice-cracking clips are a known ASMR genre in Korea |

Duplicate check:
- The subject is a frozen sidewalk puddle. It is not a window, foggy glass, curling, a snowplow or bubble wrap.
- `frosted-window-puzzle` and `winter-fog-window` are about window glass.
- `mini-curling` is a sport on an ice rink.

## Meta

- slug `thin-ice-puddle`, category `cool`, kind `tool`, aspect `9/16`, date `2026-11-25`
- tags: ko `살얼음`, `얼음 깨기`, `겨울`; en `thin ice`, `ice cracking`, `winter`
- title: ko `살얼음 웅덩이 깨기`; en `Thin Ice Puddle`
- desc ko: 출근길 웅덩이에 낀 살얼음을 톡톡 눌러 쩍쩍 깨 보세요. 금이 번지고 조각이 가라앉는 손맛 장난감이에요. 맑은 얼음, 서리 얼음, 낙엽 얼음 세 가지 웅덩이가 있어요.
- desc en: Tap the thin ice on a frozen morning puddle and watch the cracks spread and the shards sink. Three puddles to break: clear, frosty and leaf-filled.
- howto ko: 얼음을 톡 누르면 금이 가고, 꾹 누르고 있으면 더 크게 깨져요. 문지르면 금이 길게 이어져요. 키보드로는 방향키로 발을 옮기고 스페이스를 누르세요(꾹 누르면 세게). R은 다시 얼리기, N은 다음 웅덩이, M은 소리예요.
- howto en: Tap the ice to crack it, or press and hold for a bigger break. Drag to leave a trail of cracks. With a keyboard, move the boot with the arrow keys and press Space (hold for a heavy stomp). R refreezes the puddle, N picks the next one and M toggles sound.
- about ko: 어릴 적 등굣길에 일부러 밟던 살얼음을 화면 속에 옮겼어요. 시간 제한도 점수도 없어요. 모든 그림과 소리는 기기에서 직접 만들어요.
- about en: It is the thin ice you used to stomp on the way to school, now on a screen. There is no timer and no score. All visuals and sounds are made on your device.

## Pitch

The screen is a top-down view of a winter-dawn sidewalk: gray asphalt specks, a curb edge, a little frost on the cracks between tiles. In the middle lies a blob-shaped puddle sealed with thin ice.

1. Tap anywhere on the ice. A jagged white crack shoots out from your finger with a crisp *tschk*, and nearby shards turn cloudy.
2. Tap the same area again and the shards break loose. They tilt, darken and sink into the black water with a soft *plip*, and a ripple ring spreads out.
3. Press and hold to charge a heavy stomp. A growing frost ring shows the radius, and releasing it shatters a wide area at once.
4. Drag to scratch a long crack line, like dragging a boot heel across the ice.
5. When every shard is gone, the toast "웅덩이 완파!" appears and a 다시 얼리기 button pulses. Pressing it grows new ice in from the edges, so the user can break it again.

## Flow

1. **FIRST LOAD**
   - The puddle and ice are already drawn. There is no start screen, because this is a toy and the first touch is the start.
   - A hint chip floats over the puddle: "톡 눌러 깨 보세요 👆". It fades out on the first impact and never shows again in the session.
2. **BREAKING**
   - This state is endless.
   - The top bar shows the puddle name on the left, e.g. "맑은 살얼음". On the right it shows the progress "조각 23/64" and the mute toggle.
3. **CLEARED**
   - This happens when all shards are sunk.
   - The toast "웅덩이 완파! 🧊" shows for 1.6 s.
   - The [다시 얼리기] button gets a pulse ring.
   - The water keeps rippling gently. Nothing happens automatically.
4. **REFREEZE**
   - It runs for 1.2 s. Frost grows from the puddle edge inward (a radial mask with feathered noise), with a soft rising shimmer sound.
   - The new layout uses the next seed, so the cracks differ every time.
   - Input is ignored during the refreeze.
5. **NEXT PUDDLE**
   - The [다음 웅덩이] button cycles through the 3 puddle types and does a 0.35 s crossfade.

## Controls

- **Tap:** a light impact. Radius r = 0.11 × puddle size, damage 1. It also adds 5–8 radial crack rays.
- **Press and hold:**
  - After 250 ms, a charge ring appears. It grows from r to 2.2r over 1.2 s, then stays at full size.
  - Releasing gives a heavy impact: radius equal to the ring, damage 2, 10–14 rays and a 6 px screen shake for 140 ms.
  - Moving more than 12 px before 250 ms turns the press into a drag instead.
- **Drag:**
  - Every 22 px of travel gives a light scratch: radius 0.55r and damage 1.
  - A connected jagged crack polyline follows the path.
  - Scratches are rate-limited to 14 per second per pointer.
- **Multi-touch:** up to 3 pointers are tracked by `pointerId`, each one independent.
- **Pointer handling:**
  - Ignore any button other than the primary one.
  - Call `preventDefault` on `contextmenu` over the canvas, so a long press does not open the menu.
  - A `pointercancel` cancels the charge with no impact.
- **Keyboard:**
  - The canvas is focusable (`tabindex=0`) and shows a boot cursor 🥾 drawn on the canvas.
  - The arrow keys move the cursor by 4% of the puddle size. Shift+arrow moves by 10%.
  - Space or Enter gives a tap. Holding either key for more than 250 ms charges a stomp, and releasing it stomps.
  - R refreezes, N picks the next puddle and M toggles mute.
  - Call `preventDefault` on all of these keys.
- **Buttons:**
  - The bottom bar has [다시 얼리기] and [다음 웅덩이], each at least 48 px tall.
  - The 🔊/🔇 mute toggle in the top bar is at least 44 px square.
- **Layout:** the canvas has `touch-action:none`, and the page never scrolls.

## Puddle types

| # | key | ko name | en name | ice look | shard HP | shard count | special |
|---|---|---|---|---|---|---|---|
| 0 | clear | 맑은 살얼음 | Clear Thin Ice | Transparent blue-gray glaze over dark water, with faint air bubbles (8–14 small ellipses) | 2 | 56 | Cracks are thin, bright white lines |
| 1 | frost | 하얀 서리 얼음 | Frosty Ice | An opaque white crust with fern-like frost texture (procedural strokes drawn once to an offscreen canvas) | 3 | 64 | The first hit on a shard turns it from white to cloudy, which looks like a powder burst (12 white particles) |
| 2 | leaf | 낙엽 갇힌 얼음 | Leaf-Trapped Ice | A clear glaze with 3–4 frozen leaves under it (canvas-drawn ellipses with a midrib in orange/brown, not emoji) | 2 | 56 | When every shard over a leaf has sunk, the leaf floats up, rocks for 2 s and drifts slowly. On refreeze it is gone and new leaves are placed |

## Geometry

- **Coordinates:** everything is stored in puddle space [0,1]² and mapped to the screen rect P each frame.
  - P is centered, with size s = min(w × 0.92, (h − bars) × 0.9) and an aspect of 1:1.
  - After a resize, cracks and shards scale with no recompute.
- **Puddle outline:** a closed blob.
  - radius(θ) = 0.42 + 0.05·sin(2θ + a) + 0.03·sin(3θ + b) + 0.02·sin(5θ + c), where a, b and c come from the seed.
  - The outline is sampled at 96 points and stored as a Path2D in unit space. At draw time it is rebuilt from the unit points with the P transform.
- **Shards:**
  - Use a Voronoi diagram of a jittered grid of seed points (an 8×8 grid with jitter ±0.35 cells), keeping only cells whose site is inside radius(θ) + 0.04.
  - Each cell is computed by clipping the unit square with the half-planes of the other sites. Use Sutherland–Hodgman against each bisector. That is O(n²) with n ≤ 80, about 6 k clip ops once per freeze.
  - `// ponytail: O(n²) half-plane Voronoi, fine for n≤80; Fortune's algorithm only if shard counts grow past ~300`.
  - The final shard render is clipped to the puddle outline.
- **Shard state:** `{poly, cx, cy, hp, maxHp, sinkT (−1 = intact), rot, dx, dy}`.
- **Impact on a shard:**
  - Any shard whose centroid is within the radius, or that contains the impact point, loses the damage amount.
  - The shard containing the point always takes at least 1 damage.
  - When hp reaches 0, the shard starts sinking: over 0.55 s, scale goes 1 → 0.9, alpha 1 → 0, rotation goes to ±6°, it drifts 2% toward the impact direction and its color darkens.
  - When a shard starts sinking, spawn a ripple ring at its centroid.
- **Crack rays:**
  - Each ray is a polyline of 4–7 segments that starts at the impact point.
  - Its direction is random, with ±25° wobble per segment. Its total length is 0.6–1.6 × the radius, and the polyline is clipped to the outline.
  - Rays are stored in unit space in `cracks[]`, capped at 600 polylines with the oldest dropped. They are drawn on top of intact shards only (clipped by the intact-shard union each frame).
  - Simpler alternative: draw the cracks, then paint the sunk-shard water over them.
  - Damaged shards also stroke their own polygon edges: white at 35% alpha when hp < maxHp and 80% alpha when hp = 1.
- **Clear check:** the puddle is clear when every shard has sunk (sinkT ≥ 0 and the animation is done).

## Seed

- seed = FNV-1a 32-bit of `typeKey + "|" + freezeCount`, and the PRNG is mulberry32.
- Draw in this fixed order:
  1. outline phases a, b, c
  2. Voronoi jitter
  3. air bubbles or leaves
  4. frost texture strokes
- Crack rays use a second PRNG, seeded from the impact count, so cracks feel random but replay the same in `#demo`.

## Visual design

- **Palette:**
  - Asphalt: #3a3f47 with 300 speck dots (#4a505a / #2f343b).
  - Curb: a strip along the top 12% in #8d939c, with a frost-white top edge.
  - Water: radial #0e1a24 → #1b2c3a.
  - Clear ice: rgba(190,215,235,0.55) with a top-left highlight gradient.
  - Frost ice: #e8eff5.
  - Crack white: #ffffff.
  - Ripple: rgba(200,225,245,0.5).
  - UI chips: #1d2433 at 80% alpha with white text.
- **Puddle rim:** a 3 px darker wet ring outside the outline, plus 6–10 tiny frost crystals on the rim.
- **Light:** a soft dawn glow gradient in the top right (#f6c9a0 at 12% alpha), so the screenshot looks like morning.
- **Juice:**
  - Every impact gets a white flash dot (scale 0 → 1, alpha 1 → 0 over 120 ms) and 6–10 tiny ice-chip particles that fly out and fall, with gravity in screen space.
  - A heavy stomp adds the shake.
  - Each sunk shard gives a ripple: a ring growing 0 → 0.08 over 0.9 s while fading.
- **Bars:**
  - The top bar is 48 px: the puddle name, the progress and the mute toggle.
  - The bottom bar is 64 px: the two buttons on rounded pills. 다시 얼리기 is a primary button in icy blue #7cc4f0 with dark text. 다음 웅덩이 is a ghost button.
- **Small screens:** at 320 px wide the bars use 14 px text and the buttons wrap text to 2 lines if needed. On wide screens the puddle stays square and centered, and the asphalt fills the whole window.
- **Canvas:** DPR is capped at 2. The static layers (asphalt, frost texture, leaves) are rendered once to offscreen canvases and rebuilt on resize.
- **prefers-reduced-motion:**
  - no shake, no particles
  - sinking takes 150 ms with a fade only
  - each ripple is a static ring that fades over 300 ms
  - the refreeze is a 300 ms crossfade

## Sound (on by default after the first gesture, can be muted, never before a gesture)

- AudioContext is created on the first pointerdown or keydown.
- **Crack (light):**
  - a 40 ms white-noise burst through a highpass at 2.5 kHz with fast decay, gain 0.10
  - 2–3 tiny random-time clicks within 60 ms (3 ms noise, gain 0.05)
  - pitch jitter ±15% via the filter frequency
- **Crack (heavy):** a 90 ms noise burst through a bandpass at 1.2 kHz plus a 60 ms sine thump at 110 Hz, gain 0.14.
- **Sink plip:** a sine sweep from 900 to 300 Hz over 90 ms, gain 0.05. There are at most 4 plips per 100 ms, and extra plips are dropped.
- **Refreeze shimmer:** 6 sine pings rising from 1.4 to 2.6 kHz over 1 s, each 50 ms at gain 0.03.
- **Charge:** a quiet rising noise hiss at gain 0.02 while charging.
- The mute setting is persisted. If the persisted value is "0", the toy stays silent.
- Suspend the AudioContext when the page is hidden.

## Strings

| key | ko | en |
|---|---|---|
| appTitle | 살얼음 웅덩이 깨기 | Thin Ice Puddle |
| hint | 톡 눌러 깨 보세요 👆 | Tap to crack it 👆 |
| hintKey | 스페이스로 밟기 · 꾹 누르면 세게 | Space to stomp · hold for a big one |
| progress | 조각 {n}/{N} | Shards {n}/{N} |
| type0 | 맑은 살얼음 | Clear Thin Ice |
| type1 | 하얀 서리 얼음 | Frosty Ice |
| type2 | 낙엽 갇힌 얼음 | Leaf-Trapped Ice |
| refreeze | 다시 얼리기 | Refreeze |
| next | 다음 웅덩이 | Next puddle |
| cleared | 웅덩이 완파! 🧊 | Puddle smashed! 🧊 |
| clearedSub | 지금까지 깬 조각 {total}개 | {total} shards broken so far |
| freezing | 얼리는 중... | Freezing... |
| soundOn / soundOff | 소리 켜기 / 소리 끄기 | Sound on / Sound off |
| canvasLabel | 살얼음 웅덩이. 눌러서 얼음을 깨요 | Thin ice puddle. Press to break the ice |
| srBroken | 조각 {n}개 깨짐, 남은 조각 {left}개 | {n} shards broken, {left} left |
| srCleared | 웅덩이의 얼음을 모두 깼어요 | All the ice in the puddle is broken |

Screen-reader text:
- An `aria-live="polite"` region announces `srBroken`, throttled to once every 1.5 s, and `srCleared` when the puddle clears.
- The canvas has `role="img"` and an `aria-label` set from `canvasLabel`.

## localStorage (in try/catch, prefix `tip:`)

- `tip:sound`: "1" or "0", default "1". Audio still only starts after a gesture.
- `tip:type`: the last puddle type index, 0–2.
- `tip:total`: the lifetime count of sunk shards, shown only in `clearedSub`.

Never store crack or shard state. A reload always starts with fresh ice.

## Edge cases

- **Resize mid-break:** everything is in unit space, so recompute P, rebuild the offscreen static layers and redraw. Never refreeze or lose progress.
- **Charging during resize, pointercancel, blur or visibility change:** cancel the charge with no impact.
- **Hidden page:** stop rAF while `document.hidden`. On resume, clamp delta to 50 ms. Active sink animations finish from where they were.
- **Pointer outside the outline:** a tap on the asphalt gives a tiny dull "tock" sound (sine at 200 Hz, 30 ms, gain 0.04) and a grit puff of 4 gray particles, with no damage. A drag that leaves the puddle stops scratching and resumes when it re-enters, starting a new polyline.
- **Tap on already sunk water:** a small ripple and a plip only, with no damage and no crack.
- **Spam taps:** there is no cooldown, which is the fun. Cap active particles at 250 and ripples at 40, dropping the oldest.
- **Refreeze or Next during sinking:** finish immediately, and ignore input until the refreeze ends.
- **Next puddle** resets freezeCount for that type to 0 the first time it is shown in a session, then increments it.
- **Keyboard cursor:** it starts at the puddle center and is clamped to the unit square. It is hidden after pointer input and shown again on any arrow key.
- **Blocked localStorage:** everything still works with defaults.
- **`location.hash === '#demo'`** (QA thumbnail only):
  - type 0, freezeCount 0
  - apply fixed impacts: light at (0.38, 0.42), (0.6, 0.55) and (0.45, 0.62), and heavy at (0.62, 0.36)
  - jump all animations to the end and hide the hint
  - this leaves about 40% of the shards sunk, with fresh cracks and two frozen ripples drawn at 50% progress

## Must not

- No network of any kind. No images, video or emoji glyphs as art: draw on canvas. The boot cursor emoji 🥾 is the only exception, and it is a UI cursor, not art.
- No timer, score race, combo meter or "game over". This is a calm toy (cool), not a game.
- No real places, brands or people, and no "ice safety" claims. Do not suggest stepping on ice over real water bodies. The scene is a sidewalk puddle only.
- No injury humor: no slipping, falling or hurt characters.
- No `alert`, `confirm`, `prompt`, `window.open` or navigation. No sound before a user gesture.
- Do not copy the look of any existing ice-breaking app or ASMR video thumbnail.

Skipped:
- Image export, because the screenshot covers it. Add it if voting shows users want to share.
- Haptics (`navigator.vibrate`). Add it with its own toggle if requested.
