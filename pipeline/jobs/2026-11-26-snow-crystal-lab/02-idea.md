# Idea and spec: 눈 결정 실험실 / Snow Crystal Lab

## Concepts scored

Each concept is scored 1–5 on four things: value in the first 10 seconds, originality, Korean search/share demand, and how easy it is to build in one HTML file. The maximum is 20.

| Concept | Category | Score | Verdict |
|---|---|---|---|
| 겨울 참새 하루 한 끼 (Winter Sparrow, One Meal a Day): you visit once a day, scatter seed, and the sparrow's mood and feathers change by the next day, in the style of a daily-visit virtual pet | weird | 3/4/2/4 = 13 | The daily-visit structure is good, but the first 10 seconds are slow and nothing is shareable on day 1. Keep it for later. |
| 비밀번호 해독 시간 계산기 (Password Crack-Time Calculator) | tech | 4/2/4/3 = 13 | Search demand is high. But an honest estimator needs big dictionaries, a naive entropy estimate gives false reassurance, and it trains people to type real passwords into websites. Skip. |
| **눈 결정 실험실 (Snow Crystal Lab)** | **learn** | **5/4/3/4 = 16** | **Picked.** You move one point on a temperature × humidity pad and watch a six-sided crystal grow live. Every drop makes a different flake. It teaches real crystal-growth patterns, ends in a savable image, and has a 7-type collection that brings people back. It also fits the first-snow season. |

Duplicate check: the subject is how ice crystals grow, based on the standard chart of crystal shape by temperature and humidity. `snowflake-to-universe` is about size comparison (the snowflake is only its starting point). `snow-duck-maker` is about snow toys. `foggy-window-*` and `frosted-window-puzzle` are about windows. None of them covers crystal growth.

## Meta

- slug `snow-crystal-lab`, category `learn`, kind `tool`, aspect `9/16`, date `2026-11-26`
- tags: ko `눈결정`, `과학실험`; en `snowflake`, `science`
- title: ko `눈 결정 실험실: 온도·습도로 눈송이 키우기`; en `Snow Crystal Lab: Grow a Snowflake`
- desc ko: 구름 속 온도와 습도를 손가락으로 조절하면 눈 결정이 실시간으로 자라요. 판, 기둥, 바늘, 나뭇가지 별까지 7가지 결정을 모두 모아 보세요.
- desc en: Steer the temperature and humidity inside a cloud and watch a six-sided snow crystal grow live. Collect all 7 crystal types and save your flake.
- howto ko: 아래 구름 패드에서 점을 끌어 온도(가로)와 습도(세로)를 정하고 '떨어뜨리기'를 누르세요. 결정이 12초 동안 떨어지는 사이에도 점을 움직이면 모양이 바뀌어요. 방향키로 점을 움직이고 Space로 시작할 수 있어요.
- howto en: Drag the dot on the cloud pad to set the temperature (left to right) and humidity (bottom to top), then tap Drop. While the crystal falls for 12 seconds, keep moving the dot to change how it grows. Arrow keys move the dot and Space starts.
- about ko: 눈 결정은 온도에 따라 판으로 자랄지 기둥으로 자랄지가 정해지고, 습도가 높을수록 가지가 화려해져요. 실제 관측으로 만든 '온도·습도별 결정 모양 표'를 단순화한 모형이라 실제 눈은 훨씬 다양해요. 똑같은 눈송이가 없는 이유는 결정마다 지나온 구름 길이 다르기 때문이에요.
- about en: Temperature decides whether a snow crystal grows as a plate or a column, and higher humidity makes it branchier. This is a simplified model of the observed chart of crystal shape by temperature and humidity, so real snow is far more varied. No two flakes match because each one takes a different path through the cloud.

## Pitch

A dark winter-sky canvas fills the top half of the screen. The bottom half is a "cloud pad", a 2D field colored by crystal-growth zones.

1. The user drags a glowing dot across the pad. The horizontal axis is temperature, from 0 °C on the left to −30 °C on the right. The vertical axis is humidity, from dry at the bottom to very humid at the top.
2. The user taps **떨어뜨리기 (Drop)**. A tiny hexagonal seed appears and grows for 12 seconds as it falls through the cloud.
3. At every moment, the growth follows the zone under the dot. If the user moves the dot mid-fall, the flake changes. For example, a column phase followed by a plate phase gives a capped column (장구 모양).
4. The result card names the crystal type, explains in one line why it formed, shows the path the user drew on a mini-pad, and marks the type in a 7-slot collection (도감).

The default dot sits at −15 °C and very humid, so the first drop with no input already grows a big branching star.

## Flow

1. **LAB (idle)**
   - Header: the title, a collection counter "도감 3/7" (it opens the collection sheet), and a "자동 여행 (Auto trip)" button.
   - The crystal canvas shows soft background snow and an empty seed hexagon in the center.
   - The cloud pad has a live readout "−15°C · 습도 85%" and the name of the current zone, e.g. "나뭇가지 별 구역 (Dendrite zone)".
   - A big **떨어뜨리기 (Drop)** button sits at the bottom.
2. **GROWING (12 s)**
   - The crystal grows in the center. Faint cloud bands scroll upward behind it so it feels like falling.
   - A thin progress bar at the top shows the fall from cloud top (구름 위) to ground (땅).
   - The pad stays live. A fading trail of dots records the path, one dot every 0.5 s.
   - The Drop button becomes a disabled "자라는 중… 8초 (Growing… 8 s)".
   - The zone label pulses whenever the zone changes.
3. **RESULT**
   - The crystal freezes, gets a sparkle flash, and its type name pops in. Below it is a card with:
     - the type name, plus a NEW badge if this is the first time the type was found
     - a "why" line for the type
     - the mini-pad with the path drawn on it
     - a side-view inset (옆에서 본 모습) showing the column height compared with the width
   - Buttons: [이미지 저장 (Save image)] [다시 떨어뜨리기 (Drop again)].
   - Dropping again returns to LAB and keeps the dot where it was.
4. **COLLECTION sheet** (it overlays any idle state)
   - 7 slots in a grid. A found type shows a small canonical drawing and its name. An unfound type shows "?" and a hint line.
   - A close button (✕), and Esc also closes it.

## Controls

- **Pointer:** drag anywhere on the pad and the dot jumps to the finger. Use pointer capture. The pad has `touch-action:none`. Tap buttons to use them.
- **Keys:**
  - ←/→ change the temperature by 1 °C, and ↑/↓ change the humidity by 5%. Hold Shift for steps 5× bigger.
  - Space or Enter drops (or drops again on the result screen).
  - A starts the auto trip, S saves the image on the result screen, and D toggles the collection.
  - Esc closes the collection.
  - Call `preventDefault` on all of these keys.
- **Targets:** all buttons are at least 44 px tall. The pad dot's hit radius is 24 px or more, but the pad accepts touches anywhere anyway.
- **Auto trip:** it plays a drop along a random path with 2–4 waypoints (temperature −1 to −29 °C, humidity 15–100%) linearly interpolated over 12 s. The dot moves on its own. If the user touches the pad, auto mode is cancelled and the user takes over.

## Growth model

The model is in normalized units. The crystal radius 1.0 equals R = 0.42 × min(canvas width, canvas height).

**Inputs**

- T is the temperature in [−30, 0] °C.
- S is the humidity in [0, 1]. Display it as S × 100 %.

**Zone function `habit(T, S)`**

This function is the single source of truth for growth, the pad colors and the labels.

| condition (checked in order) | habit id | ko zone | en zone |
|---|---|---|---|
| S < 0.20 | `prism` | 건조 구역: 작은 육각 프리즘 | Dry zone: small prisms |
| T > −4 | `plate` | 판 구역 | Plate zone |
| T > −10 and S > 0.60 and T > −6.5 | `needle` | 바늘 구역 | Needle zone |
| T > −10 | `column` | 기둥 구역 | Column zone |
| T > −22 and S > 0.65 and −17 < T ≤ −12.5 | `dendrite` | 나뭇가지 별 구역 | Dendrite zone |
| T > −22 and S > 0.40 | `sector` | 부채 판 구역 | Sectored plate zone |
| T > −22 | `plate` | 판 구역 | Plate zone |
| S > 0.50 | `plate` | 판 구역 (매우 추움) | Plate zone (very cold) |
| else | `column` | 기둥 구역 (매우 추움) | Column zone (very cold) |

**Simulation**

- The simulation uses a fixed step of dt = 0.1 s, for 120 steps (12 s in total).
- Each frame accumulates real time, with delta capped at 50 ms, and runs the steps that are due.
- Each step reads the current dot position (T, S) and computes r = 0.25 + S.

**State**

- `a`: main arm length
- `p`: plate radius
- `w`: sector half-width
- `h`: column height
- `branches[]`: side branches, each with `{base, len}`
- `log[]`: the habit id at each step, used for classification
- `g{}`: growth points per habit, where g[h] += r each step

**Per-habit growth per step**

All growth is capped at 1.0, and `a` is always at least `p`.

| habit | growth per step |
|---|---|
| `prism` | p += 0.002, h += 0.002 |
| `plate` | p += 0.006·r |
| `sector` | a += 0.008·r and w = min(w + 0.003·r, 0.35·a) |
| `dendrite` | a += 0.012·r. With probability 0.25·S (seeded PRNG), push a branch `{base: a, len: 0}`. Every branch grows len += 0.005·r up to a cap of 0.6·(1 − base). Outer branches therefore stay shorter, which gives a star look. |
| `column` | h += 0.010·r and p += 0.0008·r |
| `needle` | h += 0.016·r and p += 0.0003 |

**PRNG:** mulberry32, seeded once per drop from `Date.now()`. Show the seed as "No. {seed % 100000, 5 digits}" on the result. Determinism is not a goal, since each flake is meant to be unique.

## Classification (result type)

1. Let plateFam = g.plate + g.sector + g.dendrite, colFam = g.column + g.needle, and total = the sum of all g.
2. If more than 60% of the steps were `prism`, the type is **prism**.
3. Otherwise, if colFam ≥ 0.25·total and plateFam ≥ 0.25·total and the first column/needle step comes before the last plate-family step, the type is **capped**.
4. Otherwise, the type is the argmax of {plate, sector, dendrite, column, needle} by g.

| id | ko name | en name | ko why | en why | hint when unfound (ko / en) |
|---|---|---|---|---|---|
| `plate` | 육각 판 | Hexagonal Plate | 0~−4°C나 아주 추운 곳에서는 옆으로 넓게 자라요. | Near 0 to −4 °C, or in very cold air, crystals spread out sideways. | 살짝 추운 곳에서 / Somewhere only a little cold |
| `sector` | 부채 판 | Sectored Plate | 판이 자랄 온도에서 습도가 조금 높으면 여섯 모서리가 부채처럼 뻗어요. | In plate weather with a bit more moisture, the six corners fan out. | 판 구역에서 조금 더 촉촉하게 / Plate zone, a bit more humid |
| `dendrite` | 나뭇가지 별 | Stellar Dendrite | −15°C 근처의 아주 촉촉한 구름에서 가지가 가장 화려하게 자라요. | Around −15 °C in very humid cloud, branches grow wildest. | −15°C, 아주 촉촉하게 / −15 °C, very humid |
| `column` | 육각 기둥 | Hexagonal Column | −4~−10°C에서는 옆이 아니라 위아래로 길어져요. | Between −4 and −10 °C, crystals grow tall instead of wide. | −4~−10°C 사이 / Between −4 and −10 °C |
| `needle` | 바늘 | Needle | −5°C 근처 촉촉한 구름에서는 가늘고 긴 바늘이 돼요. | Near −5 °C in moist cloud, columns stretch into thin needles. | −5°C 근처, 촉촉하게 / Near −5 °C, humid |
| `capped` | 장구 모양 기둥 | Capped Column | 기둥으로 자라다가 판이 자라는 구역으로 옮겨 가서 양 끝에 판이 생겼어요. | It grew as a column, then moved into plate weather, so plates capped both ends. | 기둥 구역에서 출발해 판 구역으로 / Start in columns, finish in plates |
| `prism` | 작은 육각 프리즘 | Simple Prism | 너무 건조하면 결정이 거의 자라지 못하고 작은 프리즘으로 남아요. | When the air is too dry, crystals barely grow and stay tiny prisms. | 아주 건조하게 / Very dry |

## Rendering

**Crystal canvas**

- Background: a gradient from #0e1a2e to #1b2f4f, with about 40 slow background flakes (white at 35%).
- Crystal ink:
  - fill rgba(220,240,255,0.85)
  - edges #ffffff with lineWidth 1.5 × DPR
  - `shadowBlur` 10 with color #9fd4ff
- **Mirroring:** build the geometry in one 30° wedge, then draw it 12 times using `rotate(k·60°)`, once with and once without `scale(1,−1)`.
- **Plate:** a hexagon of radius p, filled. Add an inner hexagon line at 0.6·p for a ridge.
- **Sector:** a kite polygon from the center to the arm tip (a, 0) with half-width w at 0.5·a. Add a center rib line.
- **Arm:** a line from 0 to a, with width 0.025 tapering to 0.012.
- **Branches:** a line from (base, 0) at a 60° angle for length len.
- **Column / needle (top-down view):** the hexagon at radius max(p, 0.06), plus concentric hexagons every 0.03 so the column reads as depth.
- **Side-view inset:**
  - It sits in the bottom-right of the canvas, 72×72 px, with the label "옆에서 본 모습 / Side view".
  - It draws a rectangle of width 2·max(p, a)·k and height h·k, scaled to fit.
  - For a capped column, it draws two thin plates at both ends.
- **Falling feel:** 3 translucent cloud bands scroll upward at a speed tied to progress, and the crystal sways ±4 px on a sine wave.
- **Result flash:** a 300 ms white radial flash and 12 sparkle particles. The type name pops in from scale 0.6 → 1.

**Cloud pad**

- Render it once per resize to an offscreen canvas by sampling `habit()` on an 80×40 grid. Repaint it on resize only.
- Zone colors:

| zone | color |
|---|---|
| plate | #4a78c2 |
| sector | #5a8fd6 |
| dendrite | #7fb4ff |
| column | #3f9a8f |
| needle | #4fc2a8 |
| prism | #3a4256 |

- Zone labels are drawn at fixed centroids in 11 px white text at 70%. Hide them below 340 px wide and keep only the live label.
- Axis labels:
  - bottom: "0°C" on the left, "−15°C" in the middle, "−30°C" on the right
  - left: "건조" at the bottom and "촉촉" at the top
- The dot is 18 px white with a 2 px #7fb4ff ring and glow. The trail uses 6 px dots with alpha fading by age.

**Layout**

- Portrait or square (width/height < 1.1), stacked top to bottom:
  - header, 52 px
  - crystal canvas, about 52% of the remaining height
  - pad, about 34%
  - button bar, 64 px
- Landscape (≥ 1.1): the crystal is on the left and the pad plus buttons are on the right. The column max width is 960 px.
- The result card overlays the bottom part (pad and buttons) as a sheet with internal scroll (`touch-action:pan-y`). The page never scrolls.
- At 320 px wide: use 12 px side padding, a 14 px readout font, and button text that wraps.
- Use `100dvh` and recompute everything on `resize`. Cap the canvas DPR at 2. Redraw the crystal from state, never re-simulate.

**prefers-reduced-motion:** no cloud scrolling, no sway, no flash or particles, and only 12 background flakes. Growth itself still animates, because growth is the content.

**Sound:** none. That skips the Web Audio setup and the mute toggle. Add it only if votes ask for it.

## Export

- **Save image:**
  - Use an offscreen canvas of 750×1000 with the background gradient.
  - The crystal goes in the top 750×750, redrawn from state at R = 300.
  - Below it: the type name in 40 px bold, the why line in 22 px wrapped (Korean wrapped by characters, English by words), "No. {seed} · {T path summary}", and "play.mesisi.net" in 16 px gray at the bottom right.
  - T path summary: the start and end of the path, e.g. "−6°C → −15°C".
  - Export with `toBlob`, then click an `<a download="snow-crystal-{type}.png">` link and revoke the URL after 1 s.
  - On failure, show the toast `saveFail`.
- No copy-text feature (YAGNI). The image is the thing people share.

## Strings

| key | ko | en |
|---|---|---|
| appTitle | 눈 결정 실험실 | Snow Crystal Lab |
| sub | 구름 속 온도와 습도로 나만의 눈송이 키우기 | Grow your own snowflake from cloud temperature and humidity |
| dexBtn | 도감 {n}/7 | Collection {n}/7 |
| autoBtn | 자동 여행 | Auto trip |
| dropBtn | 떨어뜨리기 | Drop |
| growing | 자라는 중… {s}초 | Growing… {s}s |
| readout | {t}°C · 습도 {h}% | {t}°C · humidity {h}% |
| axisDry / axisWet | 건조 / 촉촉 | Dry / Humid |
| cloudTop / ground | 구름 위 / 땅 | Cloud top / Ground |
| sideView | 옆에서 본 모습 | Side view |
| newBadge | NEW! 도감에 추가 | NEW! Added to collection |
| why | 왜 이렇게 자랐을까? | Why did it grow like this? |
| yourPath | 내가 지나온 구름 길 | Your path through the cloud |
| save / again | 이미지 저장 / 다시 떨어뜨리기 | Save image / Drop again |
| saved / saveFail | 이미지를 저장했어요 / 저장에 실패했어요. 화면을 캡처해 주세요 | Image saved / Could not save. Please take a screenshot. |
| dexTitle | 눈 결정 도감 | Crystal Collection |
| dexEmpty | 아직 못 만난 결정 | Not found yet |
| dexAll | 7가지 결정을 모두 모았어요! 진짜 눈은 이보다 훨씬 다양하답니다 ❄️ | You found all 7! Real snow is far more varied ❄️ |
| close | 닫기 | Close |
| autoTaken | 자동 여행 중… 패드를 만지면 직접 조종해요 | Auto trip… touch the pad to take over |
| modelNote | 단순화한 모형이에요. 실제 눈은 훨씬 다양해요 | Simplified model. Real snow is far more varied. |
| zone.* | see the zone table above | see the zone table above |
| type.* / why.* / hint.* | see the classification table above | see the classification table above |

`modelNote` appears as a small footnote under the result card and in the collection sheet.

## localStorage (in try/catch, prefix `scl:`)

- `scl:dex`: a JSON array of the type ids found so far, e.g. `["dendrite","column"]`. Ignore unknown ids when reading it.
- `scl:pos`: the last dot position as `"T,S"`. If it is missing or invalid, use the default "−15,0.85".
- `scl:drops`: the total number of drops, shown only as "No." flavor text and otherwise unused.

Never store anything else.

## Edge cases

- If the pad is released mid-drop, the dot stays where it is and growth continues.
- Pointer leave or cancel: release the capture and keep the dot.
- Resize mid-growth: rebuild the pad bitmap and redraw the crystal from state without resetting the simulation. The dot keeps its (T, S) values, not its pixel position.
- When the page is hidden: pause the simulation and the animation. On return, the delta is capped, so there is no jump.
- Clamp the dot to the pad bounds. Keyboard steps clamp too.
- Pressing Drop twice quickly starts one drop only, because the button is disabled while growing.
- During growth, the collection button and the auto-trip button are disabled.
- If a drop finds a type already collected, show no NEW badge and change nothing in the collection.
- When all 7 types are found, show `dexAll` once in the result card, plus a 1 s burst of background snow.
- If localStorage is blocked, everything works except that the collection resets on reload.
- `location.hash === '#demo'` (for QA thumbnails only):
  - Run all 120 steps instantly with the path T −6 → −15 (lerp over the first 40 steps, then hold) and S 0.9, using seed 2027.
  - Jump straight to RESULT. This should give a capped column or dendrite with branches visible.
  - Do not write to the collection.
- The crystal must stay inside the canvas, which is guaranteed by the cap of 1.0 × R.

## Must not

- No network of any kind: no fonts, no CDN and no external images. Everything is drawn on canvas. Stay under 80 KB.
- No real scientists' names, institutions, brands or photos. Call the chart "온도·습도별 결정 모양 표" only.
- Do not claim real forecasting or real weather. Do not use the device location or weather APIs.
- Do not imitate the look of any existing snowflake generator or science site.
- No timer pressure, scores or game-over screen. It is a calm lab, not a game.
- No alert, confirm, prompt, window.open or navigation. No sound.
