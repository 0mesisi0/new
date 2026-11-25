# Idea and spec: 정미년 양 몰이 / Sheep Round-Up 2027

## Concepts scored

Each concept is scored 1–5 on four things: value in the first 10 seconds, originality, Korean search/share demand, and buildability in one HTML file. Maximum 20.

| Concept | Category | Score | Verdict |
|---|---|---|---|
| 로파이 라디오: the browser composes an endless lo-fi beat with Web Audio | radio | 3/3/3/3 = 12 | Slow first 10 seconds, and it sits close to `winter-fireside-radio`. Keep it in the backlog |
| 무한 스크롤 우주: scroll down to compare sizes, from a snowflake to a galaxy | cool | 4/2/3/3 = 12 | The format is already common on the web, and the facts need checking. Later |
| **정미년 양 몰이: your cursor or finger is a sheepdog that herds sheep into a pen** | **games** | **5/4/4/4 = 17** | **Picked.** It uses the "cursor is the character" direction from the research (row 3). It fits the 2027 정미년 (year of the sheep) New Year hook, and no existing item or queued spec uses sheep as its subject |

## Meta

- slug `sheep-roundup-2027`, category `games`, kind `game`, aspect `9/16`, date `2026-11-25`
- tags: ko `정미년`, `양띠`, `양몰이`; en `sheep`, `new-year`, `herding`
- title: ko `정미년 양 몰이`; en `Sheep Round-Up 2027`
- desc ko: 2027년은 양의 해! 손가락(마우스)이 양치기 강아지가 돼요. 흩어진 양들을 울타리 안으로 몰아넣고 새해 복을 한 마리씩 모아 보세요.
- desc en: 2027 is the year of the sheep. Your finger or mouse becomes a sheepdog: herd the scattered sheep into the pen before time runs out.
- howto ko: 강아지를 양 뒤쪽으로 움직이면 양이 반대 방향으로 도망가요. 모든 양을 울타리 입구로 몰아넣으면 다음 라운드! 스페이스바나 화면 두 번 탭으로 '멍!' 짖으면 양이 크게 흩어져요(3초 쿨타임). 키보드는 방향키·WASD.
- howto en: Move the dog behind the sheep and they run the other way. Get every sheep through the gate to clear the round. Press Space or double-tap to bark, which scatters the sheep widely (3 s cooldown). Arrow keys or WASD also move the dog.
- about ko: 2027년 정미년(丁未年)은 양의 해예요. 양은 서로 뭉치려 하고 강아지를 피하려 해요. 한쪽에서 천천히 밀면 무리째 움직여요. 급하게 짖으면 오히려 흩어지니 조심!
- about en: 2027 (Jeongmi) is the year of the sheep. The sheep like to stay together and run from the dog, so a slow push from one side moves the whole flock. Bark in a hurry and they scatter.

## Pitch

It is a snowy pasture at New Year's dawn, and a big pale "2027" sun is rising behind the hills. A wooden pen with an open gate stands at the top, and fluffy sheep wander around the lower field.

1. The player's pointer is a small sheepdog. The sheep flee from it, flock together and nibble the snow.
2. Pushing the flock through the gate pens the sheep. Each penned sheep gives a "음매~" pop and a +100 floater.
3. A round is cleared when every sheep is in the pen. Each new round has more sheep and, from round 3, a stubborn sheep that needs extra pushing.
4. The game ends when the timer runs out. The result shows how many sheep were herded, a shepherd title and a New Year line: "새해 복 {n}마리만큼 받으세요".

## Flow

1. **START**
   - Shows the title "정미년 양 몰이", a short subtitle, a demo flock wandering behind a dim overlay, the best score and a big "탭해서 시작" button.
   - There is a mute toggle at the top right.
2. **ROUND INTRO** (0.9 s)
   - A banner shows "1라운드 · 양 5마리" while the sheep fade in at their spawn points.
   - The timer starts when the banner leaves.
3. **PLAY**
   - The HUD across the top shows the round number, 🐑 penned/total and a timer bar that turns red under 5 s.
   - Below the HUD there is a bark button (🐕 멍!) with a cooldown ring at the bottom right. It is 56 px and also works by touch.
4. **ROUND CLEAR** (1.4 s)
   - The gate closes with a little wooden-bar animation and confetti made of tiny wool puffs.
   - Shows "라운드 클리어! +{bonus}", where the bonus is the remaining seconds × 10, rounded down.
   - Then it goes to the next ROUND INTRO.
5. **GAME OVER** (the timer hit 0)
   - The unpenned sheep give a "메에~" shrug, and the screen dims after 0.6 s.
   - The card shows the big score, NEW BEST if earned, the best score, the total sheep herded, the rounds cleared, the title tier with its emoji and the New Year line.
   - It has a big [다시 하기] button and a smaller [결과 복사] button.
6. **PAUSE**
   - Pausing happens on `document.hidden`, Esc or P.
   - An overlay shows "일시정지 · 탭하면 계속". The timer is frozen while paused.

## World and scaling

- The game is laid out in a logical world of 360 × 640 units. It is scaled uniformly to fit the window (`scale = min(W/360, H/640)`) and centered.
- Outside the world rect, the background (sky gradient and snow) still fills the whole window. Only the world is letterboxed; the screen is never blank.
- Canvas DPR is capped at 2. Resizing recomputes the scale only, and the game state stays in world units.
- The pen is the rect x 100–260, y 80–190, with 6-unit-thick fence walls.
  - The gate is a gap in the bottom wall at x 150–210 (60 units).
- The field the sheep can use is x 12–348, y 60–628.

## Sheep behaviour

Each sheep has a radius of 12 and its own velocity. Per frame (dt capped at 50 ms):

- **Flee:**
  - When the distance d to the dog is under R = 90, accelerate away at `420 × (1 − d/R)` units/s².
  - A bark uses R = 150 and ×1.6 force for 0.4 s.
- **Cohesion:** accelerate at 10 units/s² toward the center of the other free sheep within 80 units.
- **Separation:** when another sheep is closer than 26, push apart at `300 × (1 − d/26)`.
- **Wander:**
  - The heading changes by a seeded random amount in ±0.6 rad every 1–2 s.
  - The wander acceleration is 14 units/s², and it only applies when the dog is farther than R.
- **Speed and damping:** velocity is damped by `exp(−2.5·dt)`, and speed is capped at 140.
- **Field edges:**
  - Within 20 units of a field edge, push back toward the inside at 80 units/s², so no corner can trap a sheep forever.
  - Positions are hard-clamped to the field.
- **Pen walls:**
  - A free sheep that overlaps a wall segment (not the gate gap) is pushed out along the shortest axis, and its velocity on that axis is zeroed.
  - A sheep whose center crosses into the pen interior (y < 190 − 12 while inside x 100–260) becomes **penned**. It plays its pop and score floater, and its dog flee force goes to 0.
  - Penned sheep wander slowly at 6 units/s², stay clamped inside the pen interior and keep their separation from each other.
- **Stubborn sheep (고집 양):**
  - Round 3 has 1. After that there is 1 more every 3 rounds (2 from round 6, 3 from round 9), up to a cap of 4.
  - It uses R = 60, ×0.6 flee force and a max speed of 90.
  - It is drawn with a darker gray fleece and a tiny red knitted scarf.
  - Penning it is worth 200 points.

## Dog control

- **Mouse:** the dog's target is the pointer position (hover is enough).
- **Touch / pen:**
  - The target is the finger position offset by 48 units upward, so the finger never hides the dog.
  - When the finger lifts, the dog stays where it is.
- **Movement:** the dog runs toward its target at up to 520 units/s, eased with `min(1, 12·dt)` lerp. It never teleports, so a fast swipe cannot fling sheep.
- **Keyboard:** the arrow keys or WASD move the dog at 220 units/s. Diagonal speed is normalized. Pressing a movement key overrides the pointer target until the pointer moves again.
- **Bark:**
  - Triggered by Space, a double-tap (two pointerdowns within 280 ms and 40 px) or the 🐕 button.
  - It has a 3 s cooldown, shown as a ring on the button.
  - The dog jumps 6 units and shows a "멍!" speech bubble for 0.5 s.
- The dog is clamped inside the field and cannot enter the pen interior. It slides along the pen walls.
- `touch-action:none` on the canvas, and `preventDefault` on game keys (arrows, WASD, Space).

## Rounds and score

- Sheep in round n = `min(3 + 2n, 15)`, so round 1 = 5, round 2 = 7, and so on.
- Time for round n = `min(25 + 3n, 45)` seconds.
- Spawning:
  - Sheep spawn at seeded random points in x 30–330, y 380–600.
  - No spawn point may be within 110 units of the dog or within 28 units of another sheep. Try up to 30 times per sheep, then accept the last point.
- Scoring:
  - +100 per penned sheep, or +200 for a stubborn one.
  - Round clear: + floor(remaining seconds) × 10.
- The game is over when the timer reaches 0 with sheep still free. There is no other fail state.
- The PRNG is mulberry32, seeded from `Date.now()` at each game start. Spawns and wander therefore differ every game. This is fine, because nothing needs to be deterministic.

## Title tiers (by total sheep herded)

| sheep | ko | en | emoji |
|---|---|---|---|
| 0–4 | 양치기 견습생 | Apprentice Shepherd | 🐾 |
| 5–14 | 동네 양치기 | Neighborhood Shepherd | 🧣 |
| 15–29 | 목장의 에이스 | Ranch Ace | 🐕 |
| 30–49 | 정미년 양몰이 명인 | Master of the Sheep Year | 🏅 |
| 50+ | 전설의 양치기견 | Legendary Sheepdog | 🌟 |

The cumulative sheep at the end of rounds 1 to 6 are 5, 12, 21, 32, 45 and 60, so 50+ means clearing about 6 rounds.

New Year line on the result:

- ko: "새해 복 {n}마리만큼 받으세요!"
- en: "Wishing you {n} sheep's worth of luck in 2027!"
- If n = 0, use the zero variants: ko "양들도 새해엔 다시 만나재요!"; en "The sheep say: see you again in the new year!"

## Visual design

- **Palette:**
  - dawn sky: a gradient from #ffd9b8 to #a9c6e8
  - sun: #fff1c9 with a soft glow
  - hills: #dfe8f0 and #cbd8e4
  - snow field: #f4f7fa
  - fence: #8a5a3b, with the top rail #a87452
  - sheep: fleece #ffffff with a #d8dde3 outline, face and legs #3a3a46
  - stubborn sheep: fleece #c9ced6
  - dog: #c9874b with #f3e2cc patches, collar #e0453d
  - UI ink #23262d, accent #e0453d, timer bar #4caf7a, which turns #e0453d under 5 s
- **Sun:** a large circle behind the hills with "2027" written faintly inside it in 28 px bold, 25% alpha. It is decoration only and does not block the pen.
- **Sheep:**
  - Drawn in canvas, not emoji: 5 overlapping circles for the fleece, an ellipse head facing the movement direction and 4 short legs that alternate up and down while moving.
  - A squash-bounce of 1.0 → 1.15 → 1.0 over 200 ms on being penned.
  - Snow puffs (3–5 white dots fading over 300 ms) behind a sheep moving faster than 60.
- **Dog:** a rounded body, an ear flop that follows velocity and a wagging tail whose speed is proportional to the dog's speed. It always stays above the sheep in z-order.
- **Light snowfall:** 40 particles over the whole window, with a sine drift.
- **HUD:**
  - 16 px bold system-ui on a translucent white pill (rgba 255,255,255,.75) at the top.
  - Contents: "R{n}", "🐑 {penned}/{total}" and the timer bar (full width, 6 px).
- **Juice:**
  - Penning a sheep: a +100 floater (rise 30 units, fade over 0.7 s) and the fence flashing white once.
  - Round clear: wool-puff confetti (24 particles).
  - Game over: a 4 px screen shake for 150 ms.
  - NEW BEST: a badge that pops in at scale 1.6 → 1.
- **Game-over card:**
  - A centered white rounded card with max-width min(90vw, 380px).
  - The score is 48 px bold, and the title tier is shown in a red rounded stamp rotated −6°.
  - The retry button is at least 56 px tall and full width.
- **Small screens:** at 320 px wide the world scale is about 0.89, and all HUD text stays at 14 px or larger in CSS px. The bark button stays at 56 CSS px regardless of scale.
- **prefers-reduced-motion:** no shake, no confetti, 15 snow particles, and floaters fade without moving.

## Sound (Web Audio, synthesized, starts only after the first gesture)

- **Baa (penned):**
  - A sawtooth from 260 down to 200 Hz over 280 ms, through a lowpass at 1.2 kHz.
  - 6 Hz vibrato with 8 Hz depth, at gain 0.08.
  - The pitch varies by ±8% per sheep.
- **Bark:** two square blips, 480 → 320 Hz for 70 ms each with a 40 ms gap, at gain 0.07.
- **Round clear:** a sine arpeggio of C5–E5–G5 at 90 ms each, gain 0.06.
- **Game over:** a descending sine from 330 to 180 Hz over 400 ms, gain 0.06.
- **Mute:** M or the 🔊/🔇 toggle. The setting is persisted, and the default is sound on (it still starts only after the first gesture).

## Controls summary

- **Pointer:** move the dog (hover on desktop; drag on touch with the 48-unit offset). Double-tap or the 🐕 button barks. Tapping a button activates it.
- **Keys:**
  - Arrows/WASD move.
  - Space barks during play, and starts the game from START.
  - Enter starts from START, and retries from GAME OVER.
  - R retries from GAME OVER.
  - Esc or P pauses/resumes.
  - M toggles sound.
  - C copies the result on GAME OVER.
- All buttons are at least 44 px. Every interactive element can be reached by keyboard with a visible focus ring.

## Strings

| key | ko | en |
|---|---|---|
| appTitle | 정미년 양 몰이 | Sheep Round-Up 2027 |
| startSub | 2027년은 양의 해! 강아지가 되어 양들을 울타리로 몰아요 | 2027 is the year of the sheep. Be the sheepdog and herd them home. |
| howShort | 양 뒤로 다가가면 반대쪽으로 도망가요 | Get behind the sheep and they run the other way |
| tapStart | 탭해서 시작 | Tap to start |
| best | 최고 점수 | Best |
| roundIntro | {n}라운드 · 양 {k}마리 | Round {n} · {k} sheep |
| hudRound | R{n} | R{n} |
| bark | 멍! | Woof! |
| barkBtn | 짖기 | Bark |
| stubbornHint | 고집 양 등장! 더 가까이 붙어서 밀어요 | A stubborn sheep! Get closer to push it |
| roundClear | 라운드 클리어! +{bonus} | Round clear! +{bonus} |
| timeUp | 시간 끝! | Time's up! |
| gameOver | 오늘의 양 몰이 결과 | Today's round-up |
| score | 점수 | Score |
| newBest | 최고 기록! | New best! |
| sheepTotal | 몰아넣은 양 {n}마리 | {n} sheep herded |
| roundsCleared | 클리어한 라운드 {n} | Rounds cleared: {n} |
| luckLine | 새해 복 {n}마리만큼 받으세요! | Wishing you {n} sheep's worth of luck in 2027! |
| luckLineZero | 양들도 새해엔 다시 만나재요! | The sheep say: see you again in the new year! |
| retry | 다시 하기 | Play again |
| copy | 결과 복사 | Copy result |
| copied / copyFail | 복사했어요 / 복사하지 못했어요 | Copied / Could not copy |
| paused | 일시정지 · 탭하면 계속 | Paused · tap to continue |
| soundOn / soundOff | 소리 켜기 / 소리 끄기 | Sound on / Sound off |
| tier1..tier5 | 양치기 견습생 / 동네 양치기 / 목장의 에이스 / 정미년 양몰이 명인 / 전설의 양치기견 | Apprentice Shepherd / Neighborhood Shepherd / Ranch Ace / Master of the Sheep Year / Legendary Sheepdog |

Share text (copied by [결과 복사]):

- ko: `🐑 정미년 양 몰이 {score}점 / 양 {n}마리 · {rounds}라운드 / 칭호: {tier} / 새해 복 {n}마리만큼 받으세요! / play.mesisi.net`
- en: `🐑 Sheep Round-Up 2027: {score} pts / {n} sheep · {rounds} rounds / Title: {tier} / play.mesisi.net`
- Copy uses `navigator.clipboard.writeText`, falling back to a hidden textarea and `execCommand('copy')`. A toast reports success or failure.

The language comes from `?lang=` with a fallback to `navigator.language`. `<html lang>` is set to match.

## localStorage (in try/catch, prefix `shr:`)

- `shr:best`: the best score (an integer)
- `shr:bestSheep`: the most sheep herded in one game (shown on START under the best score)
- `shr:sound`: "1" or "0", default "1"
- `shr:plays`: the number of games started (not shown)

## Edge cases

- **Resize during play:** recompute the scale only. The world state, timer and positions are unchanged, and the pointer target is re-projected on the next pointer move.
- **`document.hidden`:** auto-pause. On return, stay paused until a tap or key, and clamp the first dt to 50 ms.
- **Pointer leaving the canvas (mouse):** the dog keeps its last target and does not chase the edge.
- **Stuck sheep:** if a free sheep's speed stays under 2 for 8 s while the dog is more than 150 units away, give it a tiny wander kick. The edge push already prevents corner traps.
- **Sheep against the outside of the pen:** wall pushout plus cohesion lets the player slide it along the fence toward the gate. Never auto-pen a sheep.
- **Last sheep penned in the same frame the timer hits 0:** count it as a round clear (check penning before the timer).
- **Bark cooldown across a round transition:** it carries over. The bark does nothing outside PLAY.
- **Retry:** fully resets the score, round, sheep, timers, particles, bark cooldown and dog position (to x 180, y 520). It keeps the sound setting.
- **Tapping too early:** taps during ROUND INTRO move the dog but do not start the timer early.
- **Blocked localStorage:** everything still works, and the best score lives in memory only.
- **`#demo` hash (for QA thumbnails only):**
  - Start straight into round 2 with 3 of 7 sheep penned, the free sheep clustered near the gate and the dog behind them.
  - The timer shows 21 s and the HUD is visible. The sheep wander but the timer is frozen.

## Must not

- No network of any kind. No raster images: everything is drawn in canvas or CSS.
- Do not copy the look, names, characters or levels of any existing herding game, farm game, cartoon sheep or sheepdog character. The sheep and dog are simple original shapes.
- No trademarks, no real people and no real fortune-telling claims. The New Year line is a greeting, not a prediction.
- Do not have the dog hurt, bite or chase the sheep off-screen. Sheep never get lost, hurt or fall. The humor is gentle.
- No zodiac-based personality judgments about 양띠 (sheep-year) people.
- No alert, confirm, prompt, window.open or navigation. No sound autoplay before a gesture.
- The page never scrolls or zooms; the canvas has `touch-action:none`.
