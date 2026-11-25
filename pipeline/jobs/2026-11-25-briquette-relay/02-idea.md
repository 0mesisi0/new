# Idea and spec: 연탄 릴레이 / Briquette Relay

## Concepts scored

Each concept gets a score from 1 to 5 on four things: value in the first 10 seconds, originality, Korean search and share demand, and buildability in one HTML file. The maximum is 20.

| Concept | Category | Score | Verdict |
|---|---|---|---|
| "올해의 나 Wrapped": swipeable fake year-recap slides, timed for the expected Spotify Wrapped date around 12/2 (research row 8) | fortune | 4/2/4/4 = 14 | Rejected. Its subject (올해 결산) is the same as `year-end-receipt`, so only the format would differ. |
| 연말정산 놓친 공제 체크리스트 (research row 11) | tools | 3/3/5/3 = 14 | Rejected for now. The only source is one low-confidence blog, and wrong tax figures would hurt users. Revisit when NTS 2026 guidance is checked. |
| **연탄 릴레이: pass coal briquettes hand to hand up a snowy alley with tap timing** | **games** | **5/4/4/5 = 18** | **Picked.** It is one-tap and readable in 1 second. 연탄 is a new subject: nothing in the catalogue or queue uses it. The December neighbourhood briquette-sharing custom gives warmth and shareability, and the scene works as a rhythm game with a fake-out twist. |

## Meta

- slug `briquette-relay`, category `games`, kind `game`, aspect `9/16`, date `2026-11-25`
- tags: ko `연탄`, `타이밍게임`; en `briquette`, `timing`
- title: ko `연탄 릴레이`; en `Briquette Relay`
- desc ko: 눈 쌓인 언덕길, 이웃들이 줄지어 연탄을 손에서 손으로 건네요. 연탄이 손에 닿는 순간 탭! 깨뜨리지 말고 골목 끝 집까지 따뜻하게 채워 주세요.
- desc en: Neighbours line a snowy hillside alley, passing coal briquettes hand to hand. Tap the moment each one lands, don't crack it, and warm every house up the hill.
- howto ko: 연탄이 다음 사람 손에 닿는 순간 화면을 탭하세요(스페이스·엔터도 돼요). 정확할수록 '딱!' 점수가 커져요. 가끔 건네는 사람이 머뭇거리니 박자만 믿지 마세요. 연탄이 3장 깨지면 끝나요.
- howto en: Tap the screen (or press Space or Enter) the moment a briquette lands in the next pair of hands. Tighter timing scores more. Sometimes a passer hesitates, so don't tap on rhythm alone. Three cracked briquettes and the run is over.
- about ko: 겨울마다 이웃끼리 줄을 서서 연탄을 나르던 풍경에서 떠올린 게임이에요. 등장인물과 집은 모두 지어낸 것이에요. 연탄 한 장은 약 3.6kg이라 실제로는 두 손으로 조심히 건네요.
- about en: Inspired by the winter custom of neighbours forming a line to carry briquettes up to homes. All characters and houses are made up. A real briquette weighs about 3.6 kg, so people pass them carefully with both hands.

## Pitch

The screen shows a snowy stair alley climbing a hill at night. Warm-lit doorways line it, and six round-faced neighbours in puffers and work gloves stand in a zig-zag from the coal pile at the bottom to the shed at the top.

1. A black briquette with 22 holes, drawn on canvas, arcs from one pair of gloves to the next.
2. The player taps exactly when it lands. A good catch gives a "딱!" pop, sparks of snow and the next arc.
3. Five clean passes bring a briquette to the shed. It stacks there, and the house's window glows a little warmer.
4. The rhythm speeds up. Sometimes a passer hesitates with a "끙…" bubble and a wobble before throwing, so players who tap on rhythm miss.
5. A mistimed catch cracks the briquette into grey pieces. Three cracks end the run.

The score is the number of briquettes delivered, and every 10 delivered warms one more house. The game-over card says "연탄 {n}장 배달 · 따뜻해진 집 {h}채".

## Flow

1. **START**
   - The alley scene shows behind a dim overlay, with slow falling snow.
   - The overlay shows a 🧤 icon, the title, a one-line how-to and the best score.
   - A big "탭해서 시작" button, at least 64 px tall.
   - A mute toggle sits at the top right.
   - Enter, Space or a tap starts the game.
2. **COUNTDOWN**
   - "3 · 2 · 1 · 영차!" over 2.4 s in total, with each number popping (scale 1.6 → 1).
   - Input is ignored during the countdown.
3. **PLAY**
   - The HUD has the delivered count at top left, 3 lives drawn as small briquette icons at top right (they turn into cracked grey icons when lost), and the combo counter in the centre (shown only when the combo is 3 or more).
   - Each pass is one catch event, judged as described in Timing and judging below.
   - After pass 5 of a briquette, it slides into the shed stack and +1 is added to delivered. The next briquette starts from the coal pile after 250 ms.
   - Every 10 delivered, the next house up the hill lights up: its window turns from #3a3f55 to #ffcf7a, chimney smoke starts, and a "따뜻해졌어요! 🏠" toast shows for 1.2 s.
4. **GAME OVER** (on the 3rd crack)
   - Slow motion at 0.3× for 600 ms, then the overlay card.
   - The card shows "연탄 {n}장 배달", "따뜻해진 집 {h}채", the best score, a "NEW BEST!" ribbon when beaten, the PERFECT count and the max combo, and a tier line (see Tiers).
   - It has a big "다시 하기" button (Enter, Space or R) and a smaller "처음으로" button (Escape).
   - Input is ignored for 500 ms after the card appears, so a frantic tap can't skip it.
5. **PAUSE**
   - P or Escape during play, or the page becoming hidden, pauses the game.
   - A "일시정지 · 탭해서 계속" overlay appears.
   - Resuming runs a 1-second "다시 준비…" countdown before play continues.

Restart fully resets everything: delivered, lives, combo, speed, the hesitation RNG, lit houses, the shed stack and particles.

## Timing and judging

- **Pass duration:** D (ms) is the time a briquette spends in the air between two neighbours.
  - D₀ = 720 ms.
  - After each delivered briquette, D = max(320, D × 0.965).
- **Hand-off pause:** after a catch, the briquette rests in the catcher's hands for H = 0.35 × D before the next throw. This sets the base rhythm.
- **Hesitation (fake-out):**
  - When delivered ≥ 6, each throw has a chance of p = min(0.28, 0.08 + delivered × 0.008) to add an extra hold of 280–700 ms (uniform).
  - During the hold, the sender wobbles ±4° at 9 Hz and shows a "끙…" / "Hngh…" bubble.
  - Never allow two hesitations in a row.
- **Arrival time:** T is when the arc reaches the catcher's hands. The tap error is e = tapTime − T.
- **Judging windows:**
  - PERFECT: |e| ≤ min(70, 0.13·D)
  - GOOD: |e| ≤ min(150, 0.26·D)
  - LATE MISS: no tap by T + good window. The briquette drops and cracks.
  - EARLY MISS: a tap that lands inside the early window of the current pass, i.e. T − 2.2 × good window ≤ tapTime < T − good window. The catcher grabs too soon, the briquette bounces off the gloves and cracks.
  - A tap earlier than that window, or while the briquette is resting in someone's hands, is a "헛손질" (fumble). It does not crack anything, resets the combo, and makes the nearest neighbour shrug for 300 ms.
  - Each pass accepts only its first judged tap.
- **Scoring:** the score is delivered briquettes only. PERFECT and GOOD are tracked separately and shown on game over.
- **Combo:** consecutive PERFECT or GOOD catches; a miss or fumble resets it.
  - At combo 10 and every 10 after it, show "{c} 콤보!" and give one bonus spark burst. There are no extra lives.
- **Cracked briquette:** the next briquette starts from the bottom after 700 ms, so a crack always costs the whole carry. It shatters into 6–8 grey shards with gravity and a 6 px screen shake for 150 ms.

## Arc and layout

- **Layout:** logical canvas 360 × 640, scaled to fit (letterboxed with the background gradient filling the rest).
  - Neighbours sit at 6 points that zig-zag up the alley: x alternates between 95 and 265 in logical px, and y runs from 560 to 140 in equal steps.
  - The coal pile is at the bottom left; the shed is at the top right next to house 1.
- **Arc:** each pass is a quadratic arc with a peak 50 px above the higher hand.
  - Position follows eased time (easeInOutSine), so the landing moment reads clearly.
  - A shadow ellipse on the stairs shrinks at the peak.
- **Catch cue:** the receiving gloves glow with a soft ring that tightens from r 34 to r 14 exactly at T. This is the main timing cue; the motion alone must also be readable.
- **Hesitation and the cue:** during a hesitation the ring does not start until the real throw begins, so the cue never lies.
- **Houses:** 4 houses with flat roofs and small doors on the hill, revealed bottom to top. After 40 delivered, all are lit and more stars appear in the sky (purely visual, the game continues).

## Controls

- **Pointer:** `pointerdown` anywhere on the play area counts as a catch. The canvas has `touch-action: none`, and taps call `preventDefault`.
- **Keys:** Space or Enter catches, P or Escape pauses, M toggles sound, R restarts on game over. Key repeat (`e.repeat`) is ignored.
- **Buttons:** all at least 44 px tall. Buttons on overlays stop propagation so they don't count as catches.
- **Input latency:** judge using `performance.now()` at the event, not the next frame.

## Tiers (game-over line by delivered n)

| n | ko | en | emoji |
|---|---|---|---|
| 0–4 | 장갑부터 다시 껴요 | Let's put the gloves back on | 🧤 |
| 5–14 | 골목의 든든한 막내 | The alley's reliable rookie | 🙂 |
| 15–29 | 연탄 손이 척척 | Hands made for briquettes | 💪 |
| 30–49 | 동네 온기 담당 | Keeper of the neighbourhood warmth | 🔥 |
| 50+ | 겨울을 데운 전설의 손 | Legendary Hands That Warmed Winter | 🏆 |

Hidden line: if a run ends with 0 fumbles and n ≥ 20, add "헛손질 0번! 집중력 만렙" / "Zero fumbles! Max focus".

## Visual design

- **Palette:**
  - night sky: a gradient from #141a2e to #26304d
  - snow and steps: #e9eef7 with #b9c3d6 shading
  - briquette: #2b2b2e with #151517 holes, and a faint #ff8a3d inner glow when stacked in a lit shed
  - neighbour puffers in rotating colours: #e0453d, #3d7be0, #f2b33d, #4bb38a, #9a6ad6, #e07a9a
  - gloves: #f4efe4
  - UI accent: #ffcf7a
- **Neighbours:** simple canvas shapes. Each has a round head with a knit hat, dot eyes and a puffer body as rounded rects. Arms reach toward the incoming arc at T − 0.3D. Faces are generic and cute, with no real people and no likenesses.
- **Feedback:**
  - PERFECT: a "딱!" label in #ffcf7a pops (scale 1.5 → 1 over 180 ms), with 10 snow sparks and a 2 px squash on the catcher.
  - GOOD: a smaller white "좋아" label.
  - Crack: grey shards, a red flash on the life icon and a screen shake.
- **Snow:** about 70 particles on the same canvas with sine drift; 25 particles under `prefers-reduced-motion`.
- **Reduced motion:** no screen shake, no slow motion and no countdown pop scaling. The arc and catch ring still show, because the game needs them.
- **Text:** HUD in system-ui bold 18 px; game-over title 28 px. Everything must stay readable at 320 px wide.
- **Canvas:** high-DPI with `devicePixelRatio` capped at 2. Layout is recomputed on `resize`, and the page never scrolls.

## Sound (off by default, Web Audio after first gesture)

- Throw: a 60 ms noise burst, band-passed at 600 Hz, gain 0.05.
- PERFECT: a 2-note tick (1320 Hz then 1760 Hz, 40 ms each, triangle wave), gain 0.06.
- GOOD: a single 990 Hz tick.
- Crack: a 120 ms noise burst with a fast decay, low-passed at 900 Hz, gain 0.12.
- Delivered: a soft "thunk", a 90 Hz sine over 100 ms.
- House lit: a 3-note rising chime (C5, E5, G5).
- The mute state is persisted. The mute toggle never counts as a catch.

## Strings

| key | ko | en |
|---|---|---|
| appTitle | 연탄 릴레이 | Briquette Relay |
| startSub | 연탄이 손에 닿는 순간 탭! 3장 깨지면 끝 | Tap the moment it lands. Three cracks and you're out. |
| startBtn | 탭해서 시작 | Tap to start |
| best | 최고 기록 {n}장 | Best: {n} |
| countGo | 영차! | Heave! |
| hudDelivered | {n}장 | {n} |
| combo | {c} 콤보! | {c} combo! |
| perfect | 딱! | Perfect! |
| good | 좋아 | Good |
| early | 너무 빨라요 | Too early |
| late | 놓쳤어요 | Missed |
| fumble | 헛손질 | Fumble |
| hesitate | 끙… | Hngh… |
| houseLit | 따뜻해졌어요! 🏠 | Warm inside now! 🏠 |
| paused | 일시정지 · 탭해서 계속 | Paused · tap to resume |
| resume | 다시 준비… | Get ready… |
| overTitle | 연탄 {n}장 배달 | {n} briquettes delivered |
| overHouses | 따뜻해진 집 {h}채 | {h} houses warmed |
| overStats | 딱! {p}번 · 최대 콤보 {c} | {p} perfect · max combo {c} |
| newBest | 신기록! | NEW BEST! |
| retry | 다시 하기 | Play again |
| home | 처음으로 | Title screen |
| soundOn / soundOff | 소리 켜기 / 소리 끄기 | Sound on / Sound off |
| zeroFumble | 헛손질 0번! 집중력 만렙 | Zero fumbles! Max focus |

## localStorage (in try/catch, prefix `bqr:`)

- `bqr:best`: best delivered count (integer)
- `bqr:sound`: "1" or "0", default "0"
- `bqr:plays`: number of runs started (not shown in the UI)

Nothing else is stored.

## Edge cases

- **Hidden tab:** on `visibilitychange` to hidden, pause immediately and freeze all timers, including the pending arrival time T. On resume, shift T, H and the hesitation end by the paused duration, then run the 1-second ready countdown. Cap frame delta at 50 ms.
- **Resize mid-arc:** recompute only the scale and keep the logical positions, so the arc continues unchanged and timing is unaffected.
- **Multi-touch:** only the first `pointerdown` within 40 ms counts, so a second finger can't double-judge.
- **Taps during COUNTDOWN, briquette spawn and slow motion:** ignored, not counted as fumbles.
- **Tap on the same frame as a crack:** the crack wins; the tap is ignored.
- **Very low frame rate:** judging uses event timestamps, so it stays fair. Rendering may stutter, but scoring stays correct.
- **Blocked storage:** the best score lives in memory for the session and everything else works.
- **Language:** `?lang=ko|en`, falling back to `navigator.language` starting with "ko". `<html lang>` is set to match.
- **`#demo` (QA thumbnails only):** start straight in PLAY with delivered = 12, house 1 lit, 3 lives, and auto-catch PERFECT on every pass with hesitation turned off, so the screenshot shows a live mid-game scene.

## Must not

- No network of any kind and no raster images: canvas, CSS and emoji only. Stay under 120 KB.
- No real charity, organisation, brand, place name or person. Don't name a real neighbourhood, and don't use the word 달동네.
- Don't frame anyone as poor or pitiable. The tone is neighbours helping each other, and every house is cosy.
- No carbon monoxide, fire-danger or injury depictions. Cracks are cartoon shards, and nobody falls or gets hurt. A slip animation, if added later, ends with a smile.
- No real donation prompts, no money and no claims about actual briquette prices or charity numbers.
- Don't copy the look or name of any existing rhythm or stacking game.
- No alert, confirm, prompt, window.open or navigation, and no sound autoplay.
