# Idea and spec: 효자손 등 긁기 / Itchy Back Rescue

## Concepts scored

Each concept is scored 1–5 on four things: value in the first 10 seconds, originality, Korean search/share demand, and buildability in one HTML file. The maximum is 20.

| Concept | Category | Score | Verdict |
|---|---|---|---|
| 자기소개서 글자수 세기 (count with and without spaces, bytes, a target-length bar) | tools | 5/1/5/5 = 16 | Search demand is huge, but it is a standard tool everyone already has and has no seasonal hook. Keep for a slow week. |
| 야간열차 창가 백색소음 (rails, rain on glass and a far-off crossing bell, all synthesized) | radio | 3/3/2/4 = 12 | Calm, but it overlaps in feel with the fireside and lofi radios. Hold. |
| **효자손 등 긁기 (back-and-forth scratching over thermal underwear, with a sweet-spot speed and an overheat limit)** | **games** | **5/4/4/5 = 18** | **Picked.** Dry winter skin and an itchy back in 내복 is something every Korean knows. The research asked for a "soothe gently, but too far means pain" tension game on a new subject. No scratching subject exists in the list above or in the queue. |

## Meta

- slug `itchy-back-rescue`, category `games`, kind `game`, aspect `9/16`, date `2026-11-27`
- tags: ko `효자손`, `등긁기`, `겨울건조`; en `back-scratcher`, `itch`, `winter`
- title: ko `효자손 등 긁기`; en `Itchy Back Rescue`
- desc ko: 겨울만 되면 근질근질한 등! 효자손으로 가려운 곳을 시원하게 긁어 주세요. 너무 세게 긁으면 따가워요. 딱 좋은 속도를 찾아 오래 버티세요.
- desc en: Dry winter, itchy back. Scratch the itchy spots with a back scratcher at just the right speed. Go too hard and it stings, so find the sweet spot and last as long as you can.
- howto ko: 가려운 곳(분홍 얼룩) 위에서 드래그해 앞뒤로 문지르세요. 속도 게이지가 초록일 때 가장 시원해요. 빨간 구간에서 오래 긁으면 '따가워!'가 떠요. 로션이 보이면 눌러 보세요. 키보드는 방향키로 이동하고 스페이스를 연타하면 긁어요.
- howto en: Drag back and forth over the itchy spots (pink blotches). Scratching feels best while the speed gauge is green. Stay in the red too long and it stings. Tap the lotion when it shows up. On a keyboard, move with the arrow keys and tap Space to scratch.
- about ko: 겨울 실내는 건조해서 등이 자주 가려워요. 게임은 재미로만 즐기고, 실제 피부는 세게 긁지 말고 보습해 주세요. 점수는 이 기기에만 저장돼요.
- about en: Winter indoor air is dry, and backs get itchy. This is just for fun. On real skin, scratch gently and moisturize. Scores stay on this device.

## Pitch

The player sees a round, cozy character from behind, wearing a beanie and a beige 내복 (thermal underwear) top in a warm room at night. Pink itch blotches bloom across the back, and a bubble above the head cries "거기! 거기!".

1. The player holds a 효자손 (a bamboo back scratcher with a little hand at its tip) and rubs back and forth over a blotch.
2. Each change of direction counts as one scratch. A speed gauge shows whether the stroke is in the green sweet zone.
3. Scratching too fast heats the skin. When the heat meter fills, the player gets a "따가워!" flash and loses comfort.
4. Blotches left alone grow, and a fully itchy blotch drains the 편안함 (comfort) meter. The game ends when comfort reaches 0.

The fun sits between "faster feels better" and "too fast hurts". It is easy to read in 10 seconds, and the result card works well for showing off a score.

## Flow

1. **START**
   - The character's back with one faint blotch, the title, the one-line howto and a big "긁어 주기 시작" button. Tapping anywhere also starts.
   - Best score under the button, and a mute toggle at the top right.
   - The blotch pulses gently. The bubble says "등이 너무 가려워…".
2. **PLAY**
   - The HUD across the top: a comfort bar (100 at the start), the score, and the combo ("콤보 ×12").
   - The speed gauge is a semicircle arc at the bottom center. The heat meter is a thin bar under the gauge.
   - The first blotch is already there at t=0, and the next one arrives 1.5 s later.
   - Speech bubble reactions (see Strings) change at most once every 0.8 s.
3. **OUCH (inside PLAY)**
   - When heat reaches 100: a red flash over the back for 200 ms, a 6 px shake for 150 ms, and the bubble shows "따가워!".
   - Comfort −15, heat resets to 40, and scratching is disabled for 0.6 s (the scratcher turns grey).
4. **GAME OVER**
   - The character slumps. The bubble shows "…그래도 고마워" (or the cleared line if the score is high).
   - A card with: the score (big), the best score, a NEW badge when the best is beaten, blotches cleared, max combo, time lasted (mm:ss) and the tier title with its emoji.
   - Buttons: [다시 긁기] (big, primary) and [결과 복사].

## Controls

- **Pointer:** drag anywhere on the play area. The scratcher tip follows the pointer, offset 0 px for a mouse and −40 px upward for touch so the finger does not cover the tip. Only the first active `pointerId` counts, and extra touches are ignored. Use `setPointerCapture`.
- **Keyboard:**
  - Arrow keys move the tip at 320 logical px/s, and diagonals are allowed.
  - Every Space press counts as one direction change (one scratch) at the tip's position.
  - A press more than 90 ms after the previous one is treated as sweet speed.
  - A press less than 90 ms after the previous one is treated as too fast and adds 18 heat.
  - Enter starts or retries. C copies on the result screen. M toggles sound. P or Escape pauses.
- **Lotion:** tap or click it. With a keyboard, move the tip onto it and press Space.
- **Touch and layout:** the play canvas has `touch-action:none`, and every game key calls `preventDefault`. All buttons are at least 48 px tall.

## Field and scaling

- **Logical field:** 360×640. Scale it to fit the window (contain), centered. The room background gradient fills the rest of the window.
- **Back region:** a rounded trapezoid. The shoulders are at y=150 (x 60–300) and the waist is at y=560 (x 85–275). New blotches spawn only inside this shape, with a 30 px inset.
- **Canvas:** sized at `devicePixelRatio`, capped at 2. Recompute on `resize`. Store all entity positions in logical units, so a resize never moves gameplay.

## Mechanics

### Blotches

- **Normal blotch:**
  - Radius 28. `itch` starts at 30 and grows at the rate g per second.
  - Drawn as a pink radial gradient. Alpha = 0.25 + 0.6 × itch/100, plus a small wobble.
- **Spawning:**
  - The spawn interval starts at 2.2 s and falls linearly to 0.9 s by 90 s.
  - g starts at 8/s and rises linearly to 16/s by 90 s.
  - At most 6 blotches at once.
  - A new blotch must be at least 60 px from every existing one. Try 12 times, then skip that spawn.
- **Full itch:** when itch hits 100 the blotch is "full". It beats red, and each full blotch drains comfort by 6/s. The combo resets once, when the blotch becomes full.
- **Wandering itch (돌아다니는 가려움):**
  - Appears from 45 s on, with a 25% chance per spawn.
  - Drifts at 18 px/s and bounces inside the back region.
  - Gains 20% less relief per scratch.
  - Drawn with a small dashed ring.
- **Clearing:** a blotch is cleared when itch ≤ 0. It gives +100 × multiplier, a burst of 10 white "시원" sparkle particles and the bubble line `clear`.

### Scratch detection (pointer)

1. Keep a smoothed velocity of the tip in logical px/s, using an EMA with α = 0.35.
2. Pick the dominant axis of the current stroke: whichever of |vx| and |vy| is larger, averaged over the last 120 ms.
3. A reversal is when the sign of the velocity on that axis flips and the segment since the last reversal is at least 12 px long.
4. Segment speed v = segment length / segment duration.
5. When a reversal happens with the tip within radius + 6 of a blotch, it is a scratch on the nearest such blotch.

### Speed zones (per scratch)

| v (px/s) | zone | relief | heat | combo |
|---|---|---|---|---|
| < 150 | too slow | 0 | 0 | unchanged |
| 150–300 | ok | 6 | 0 | +0 |
| 300–900 | sweet (green) | 14 | 0 | +1 |
| 900–1400 | ok-fast (yellow) | 6 | +4 | +0 |
| > 1400 | too fast (red) | 2 | +12 | reset |

- **Heat:**
  - While the tip moves faster than 1400 px/s inside a blotch, heat also gains 120/s.
  - Otherwise heat cools at 40/s.
  - At 100: OUCH.
- **Points per scratch:**
  - Points = relief × 1 × multiplier.
  - Multiplier = min(3, 1 + floor(combo / 5) × 0.5).
- **Speed gauge:**
  - The needle shows the live smoothed speed, eased.
  - Band colors on the arc: grey (0–150), blue (150–300), green (300–900), yellow (900–1400), red (1400–2000, where the scale ends).

### Lotion (로션)

- Spawns every 20 ± 4 s (seeded by `Math.random`) at a random spot inside the back region. It lasts 5 s and blinks during its last 1.5 s.
- Collecting it: every blotch loses 30 itch, heat drops to 0, and the player gets +50 points. A soft white wave spreads over the back, and the bubble shows the `lotion` line.
- Drawn as a canvas pump bottle with a drop icon. Do not use a brand-like label.

### Comfort and the end

- Comfort starts at 100 and never refills above 100.
- Every cleared blotch gives +3 comfort.
- At 0: GAME OVER. Time lasted is counted only while the game is not paused.

## Score tiers (by final score)

| score | ko | en | emoji |
|---|---|---|---|
| < 1,000 | 아직 근질근질 | Still Itchy | 😣 |
| < 3,000 | 효자손 견습생 | Apprentice Scratcher | 🪵 |
| < 6,000 | 시원함 전문가 | Relief Expert | 😌 |
| < 10,000 | 등 긁기 장인 | Master of the Itch | ✨ |
| ≥ 10,000 | 전설의 효자손 | Legendary Back Scratcher | 🏆 |

## Visual design

- **Palette:**
  - room: a gradient from #2b2540 to #463a5c, with a warm lamp glow (#ffcf8a at 20% alpha) at the top left
  - 내복 top: #efe2c8 with a subtle rib texture of vertical lines at 6% darker
  - beanie: #d9534f with a white pompom
  - blotches: pink #ff8fa3, which beats in #e5484d when full
  - scratcher: bamboo #c9a46a with darker nodes
  - accent green #3fbf7f, yellow #f2c14e, red #e5484d
  - UI text: #fff8ef
- **Character:** a round head (skin #f3c9a5) seen from behind, with the beanie, two small round ears and soft shoulders. No face is visible. Draw the shoulder blades as two faint arcs on the 내복.
- **Scratcher:**
  - A long stick from the bottom-right corner to the tip, with a little curled 5-finger hand at the tip.
  - It tilts with movement direction (±10°).
  - On each scratch: a 3 px squash at the tip and 2 or 3 tiny dust/lint particles.
- **Feedback:**
  - Sweet scratch: a small "+14" pop in green.
  - Combo of 10 or more: the combo text grows 1.2× for 100 ms.
  - Full blotch: wavy "근질" text lines rise from it.
- **Speech bubble:** a white rounded rectangle above the head with a pop-in at scale 0.8 → 1 over 120 ms. Text is 18 px bold and wraps inside 280 px.
- **Game over card:**
  - A centered frosted card (rgba(255,255,255,0.12)) with the tier emoji at 56 px.
  - The score is 44 px bold, and the NEW badge is gold.
- **Small screens:** at 320 px wide the HUD shrinks to 14 px text and the gauge to a 110 px arc.
- **Wide screens:** the field stays 9:16 in the center, and the lamp glow and room fill the sides.
- **prefers-reduced-motion:** no shake, no flash (a red outline instead), particles halved, and the blotch wobble turned off.

## Sound (off by default, Web Audio, after the first gesture)

- **Scratch:**
  - A 40 ms white-noise burst through a bandpass filter.
  - Filter frequency: 2.2 kHz for sweet scratches, 1.4 kHz for slow ones, 3.5 kHz for fast ones. Gain 0.05.
- **Clear:** a two-note sine chime, 660 → 990 Hz, 120 ms each, gain 0.06.
- **Ouch:** a 120 ms sine dropping from 220 to 110 Hz, plus a short noise hit, gain 0.12.
- **Lotion:** a soft 300 ms sine sweep from 400 to 800 Hz, gain 0.05.
- **Game over:** a descending three-note line (523, 440, 349 Hz), gain 0.06.
- **Mute toggle:** 🔊/🔇. The setting is persisted.

## Strings

| key | ko | en |
|---|---|---|
| appTitle | 효자손 등 긁기 | Itchy Back Rescue |
| startSub | 가려운 곳을 딱 좋은 속도로 앞뒤로 긁어 주세요 | Scratch the itchy spots back and forth at just the right speed |
| startBtn | 긁어 주기 시작 | Start scratching |
| tapStart | 아무 곳이나 눌러도 시작해요 | Tap anywhere to start |
| keyHint | 방향키 이동 · 스페이스 긁기 | Arrows to move · Space to scratch |
| best | 최고 점수 | Best |
| score | 점수 | Score |
| comfort | 편안함 | Comfort |
| combo | 콤보 ×{n} | Combo ×{n} |
| heat | 열감 | Heat |
| paused | 잠깐 쉬는 중 | Paused |
| resume | 계속하기 | Resume |
| soundOn / soundOff | 소리 켜기 / 소리 끄기 | Sound on / Sound off |
| bubbleIdle | 등이 너무 가려워… | My back is so itchy… |
| bubbleSweet | 거기! 거기! | Right there! There! |
| bubbleSlow | 좀 더 박력 있게! | A little more oomph! |
| bubbleHot | 살살! 살살! | Gently! Gently! |
| bubbleOuch | 따가워! | Ouch, that stings! |
| bubbleClear | 아~ 시원하다~ | Ahh, that's the spot~ |
| bubbleFull | 으아 거기도 가려워! | Argh, that one's itchy too! |
| bubbleWander | 가려운 데가 도망간다! | The itch is running away! |
| bubbleLotion | 촉촉해졌어… | So much better… |
| bubbleEndLow | …그래도 고마워 | …thanks anyway |
| bubbleEndHigh | 덕분에 오늘 꿀잠 잘게! | Thanks to you, I'll sleep like a baby! |
| over | 등이 다시 근질근질… | The itch wins this round… |
| cleared | 시원해진 곳 {n}곳 | Spots cleared: {n} |
| maxCombo | 최대 콤보 {n} | Max combo: {n} |
| lasted | 버틴 시간 {mm:ss} | Lasted: {mm:ss} |
| newBest | 최고 기록! | New best! |
| retry | 다시 긁기 | Scratch again |
| copy | 결과 복사 | Copy result |
| copied / copyFail | 복사했어요 / 복사하지 못했어요 | Copied / Could not copy |
| shareText | 🪵 효자손 등 긁기 {score}점! 칭호: {tier} {emoji} / 최대 콤보 {combo} · 버틴 시간 {mm:ss} / play.mesisi.net | 🪵 Itchy Back Rescue: {score} points! Title: {tier} {emoji} / Max combo {combo} · Lasted {mm:ss} / play.mesisi.net |
| footNote | 실제 피부는 세게 긁지 말고 보습해 주세요 | On real skin, scratch gently and moisturize |

The tier titles come from the Score tiers table.

## localStorage (in try/catch, prefix `ibr:`)

- `ibr:best`: the best score as an integer string
- `ibr:sound`: "1" or "0", default "0"
- `ibr:plays`: the number of games played (not shown in the UI)

Store nothing else.

## Edge cases

- **Restart:** fully resets blotches, lotion, timers, heat, comfort, combo, score, particles and the pointer/reversal tracking state. It keeps the best score and the sound setting.
- **Pointer leaving:** when the pointer leaves the canvas or the window, or on `pointercancel`, end the stroke. The next press starts a new stroke, and no reversal is counted across the gap.
- **First press:** a press that has not moved yet never counts as a scratch. A segment needs at least 12 px of travel.
- **Fast flicks:** reversal checks run on every pointermove event (use `getCoalescedEvents` when available), so fast flicks are not lost between frames.
- **Low frame rate:** delta time is capped at 50 ms. Timers and growth use delta time, so the difficulty is the same at 30 and 144 Hz.
- **Hidden page:** when `document.hidden`, pause automatically and show the paused overlay. When the page comes back, do not resume until the player taps "계속하기" or presses Enter.
- **Resize mid-game:** only rescale the drawing. Entities stay in logical coordinates, so nothing jumps.
- **Overlapping blotches:** if the tip is within reach of two blotches at a reversal, apply the scratch to the one with the highest itch.
- **OUCH lockout:** scratches during the lockout are ignored for relief and points, but they still update the speed gauge.
- **Overlapping comfort changes:** if comfort would go below 0 on the same frame as a clear, resolve the clear first.
- **Blocked storage:** when localStorage is blocked, the best score lives only in memory.
- **QA thumbnail:** if `location.hash === '#demo'`, start PLAY right away with 4 blotches at itch levels 40/60/80/100. Run a scripted scratch on the 60 blotch: sweet reversals at 500 px/s, 3 per second. Combo shows ×7, comfort is 72 and the bubble shows "거기! 거기!". Freeze the frame after 1.5 s. This is for thumbnails only.

## Must not

- No network of any kind, and no raster images. Draw everything with canvas, CSS or emoji. Stay under 120 KB.
- No nudity or skin focus. The back is always covered by the 내복 top, and the character is round and cartoonish with no visible face, gender or age cues.
- Do not copy the viral cat-brushing game: no cat, no pet, no brushing, no biting and no jumpscare. The penalty is a red flash and a "따가워!" bubble only.
- No medical claims or skin-condition content (eczema, rashes, medicine names). The lotion is a generic unbranded bottle.
- No real brands, products or people. No mocking of the elderly; the 효자손 is just the object. No jokes about any group.
- No blood, wounds or gore. The worst the skin shows is a soft red flash.
- No alert, confirm, prompt, window.open or navigation. No sound autoplay.
