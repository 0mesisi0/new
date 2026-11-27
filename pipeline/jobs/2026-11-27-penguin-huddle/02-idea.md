# Idea and spec: 펭귄 허들 체온 지키기 / Penguin Huddle

## Concepts scored

Each concept is scored 1–5 on four things: value in the first 10 seconds, originality, Korean search and share demand, and buildability in one HTML file. The maximum is 20.

| Concept | Category | Score | Verdict |
|---|---|---|---|
| 비밀번호 안전도 검사: how long a password takes to crack, computed only on the device | tech | 4/3/4/5 = 16 | Good evergreen tool, but it has no seasonal hook. People also hesitate to type passwords into a fun site. Keep it for later. |
| 어드벤트 캘린더 2026: 24 doors that open one per day from December 1 to 24 | cool | 2/3/4/4 = 13 | Every door is locked today (2026-11-27), so the first 10 seconds are empty. Revisit for a release on December 1. |
| **펭귄 허들 체온 지키기**: swap penguins in an emperor-penguin huddle so nobody freezes through the polar winter | **learn** | **4/5/3/4 = 16** | **Picked.** It is a new subject, it fits winter, it rotates away from the crowded games and tools categories, and it teaches a real behaviour through play. |

Duplicate check: no listed or queued item is about penguins, Antarctica or huddling. The game uses the general swap-tile genre and copies no existing penguin character or game.

## Meta

- slug `penguin-huddle`, category `learn`, kind `game`, aspect `9/16`, date `2026-11-27`
- tags: ko `펭귄`, `허들`; en `penguin`, `huddle`
- title: ko `펭귄 허들 체온 지키기`; en `Penguin Huddle`
- desc ko: 남극의 겨울밤, 황제펭귄 19마리가 몸을 붙여 버텨요. 바람 맞는 바깥 펭귄을 따뜻한 안쪽 펭귄과 바꿔 주며 65일을 함께 넘겨 보세요.
- desc en: Nineteen emperor penguins huddle through the polar night. Swap cold outer penguins with warm inner ones and get everyone through 65 days of winter.
- howto ko: 펭귄 둘을 차례로 누르거나 끌어다 놓으면 자리가 바뀌어요. 파랗게 식어 가는 바깥 펭귄을 안쪽으로 넣어 주세요. 꽁꽁 언 펭귄이 3번 나오면 끝나요. 키보드는 방향키로 고르고 Space나 Enter로 바꾸면 돼요. P는 일시정지, M은 소리예요.
- howto en: Tap two penguins one after the other, or drag one onto another, to swap them. Move the cold, blue outer penguins inside. Three freezes end the game. On a keyboard, arrow keys move the cursor, Space or Enter picks and swaps, P pauses and M toggles sound.
- about ko: 황제펭귄 수컷은 남극의 겨울 동안 발 위에 알을 올려 약 두 달을 품어요. 수많은 펭귄이 몸을 붙인 '허들'은 안쪽이 바깥보다 훨씬 따뜻하고, 펭귄들이 조금씩 자리를 옮기며 추위를 나눠 맡아요. 게임 속 숫자는 재미를 위해 단순하게 만들었어요.
- about en: Emperor penguin fathers keep an egg on their feet for about two months of the Antarctic winter. In a huddle the middle is much warmer than the edge, and the birds keep shifting so the cold gets shared. The numbers in this game are simplified for fun.

## Pitch

- **Scene:** dark blue polar night, falling snow and a faint green aurora. A tight hexagon of 19 round penguins stands on the ice. A wind arrow at the edge shows where the gale comes from.
- **Warmth:** each penguin has a warmth level that shows as its belly colour, from cosy orange to icy blue.
- **Play:** the outer ring loses heat, worst on the windward side, while the inside warms up. The player keeps rotating the cold outsiders inward.
- **Learning:** the real-life lesson is that a huddle survives because everyone takes turns at the edge. It is learned by doing, then confirmed on a fact card at the end.
- **Ending:** reach day 65 and the eggs hatch: 🐣 chicks pop up in a celebration.

## Flow

1. **START**
   - Title, subtitle, a small looping animation of the huddle and one fact line (from the Facts table, picked by day of year).
   - A big "겨울나기 시작 / Start the winter" button, with "tap to start" behaviour: tapping the play area or pressing Enter also starts.
   - Best score, and the mute toggle at the top right.
2. **PLAY** (90 s of real time = days 1→65)
   - HUD:
     - day counter "12일째 / Day 12"
     - frost marks shown as ❄️❄️❄️, which fill as freezes happen
     - the score
     - a pause button
   - The wind direction changes every 12 s. The arrow rotates over 1 s, and a hint toast shows on the first change only.
   - **Blizzard (눈보라) events:**
     - Days 20, 35, 50 and 60 each start one.
     - A warning banner shows for 2 s: "눈보라가 와요! / Blizzard incoming!"
     - The blizzard lasts 5 s. Snow becomes denser and slanted, the screen gets a faint white veil, and heat loss doubles (×2).
3. **PAUSE**
   - Shown on P, Esc, the pause button or `document.hidden`.
   - Overlay with "계속하기 / Resume" and "처음으로 / Main menu".
4. **GAME OVER** (3 freezes) or **CLEAR** (day 65 reached)
   - Shows:
     - a title line (from the Result tiers table)
     - score, best score, and a "NEW BEST" pop when the record is beaten
     - days survived, swaps made, average warmth
   - A fact card "알고 있었나요? / Did you know?" with one fact from the Facts table that changes each run.
   - A big "다시 하기 / Play again" button and a small "처음으로 / Main menu" button.
   - On CLEAR, eggs under 3–5 penguins crack open to show 🐣, with a confetti-like puff of snowflakes and hearts.

## Controls

- **Pointer, tap mode:**
  - Tapping a penguin selects it: it gets a yellow ring and bobs.
  - Tapping a second penguin swaps the two.
  - Tapping the same penguin again, or empty ice, cancels.
- **Pointer, drag mode:** press on a penguin, drag (a ghost follows the pointer) and release on another penguin to swap. Releasing on nothing cancels.
- **Swap animation:**
  - The two penguins waddle past each other in 350 ms along slightly curved paths.
  - Both stay locked for 350 ms. Other swaps are allowed at the same time.
- **Keyboard:**
  - The arrow keys move a cursor ring across the hex grid to the nearest neighbour in that screen direction.
  - Space or Enter picks the penguin, then swaps on the second press. Esc cancels the selection, or pauses when nothing is selected.
  - P pauses and M mutes.
  - On the end screen, R or Enter restarts.
- **Touch handling:** the canvas has `touch-action:none`, and `preventDefault` is called on game keys (arrows, Space).
- **Hit areas:** each penguin's hit circle has a radius of at least 22 px, so the tap target is 44 px or more at 320 px wide.

## Simulation

Coordinates:
- Use a hex grid in axial coordinates (q, r) with radius 2. That gives 19 slots: 1 centre, 6 in ring 1 and 12 in ring 2.
- Every slot always holds a penguin, so exposure depends only on position.

Each penguin keeps these values:

| field | meaning |
|---|---|
| warmth | 0–100 |
| frozen | flag |
| egg | flag, true for all |
| id | which penguin it is |
| name hue | small tint variation for recognisability |

**Exposure:** for each of the 6 directions, check whether the neighbour slot is outside the grid. Each such direction is an exposed side.

**Wind:** wind is a unit vector at one of the 6 hex directions, picked at random but never the same as the previous one. An exposed side counts as upwind when the dot product of its direction and −wind is greater than 0.4.

Per frame, with dt capped at 50 ms:
- Ring 2 penguins lose heat: `loss = base × (upwindSides × 1.0 + otherExposedSides × 0.35) × windLevel × (blizzard ? 2 : 1)`.
- Centre and ring 1 penguins gain heat: centre `+6/s`, ring 1 `+4/s`.
- warmth is clamped to 0–100.

Tuning:

| knob | value | how it changes |
|---|---|---|
| `base` | 2.4/s | fixed |
| `windLevel` | 1.0 → 1.7 | rises linearly over the run |
| start warmth | 70 ± 8 | each penguin gets its own value |

Keep all knobs in one `TUNING` object at the top of the script.

**Freezing:**
- When warmth reaches 0 and the penguin is not already frozen:
  - set `frozen = true` and add one frost mark
  - an ice-cube overlay and a "crack" shake play, with a puff of snow particles
- A frozen penguin loses no more warmth.
- When it sits inside, it gains heat at half rate. It thaws (`frozen = false`) at warmth 25 and gets a small "phew" 💨 pop.
- A frozen penguin can be swapped like any other.

**End conditions:**
- 3 frost marks end the game (GAME OVER).
- t ≥ 90 s means CLEAR.

**Scoring:**
- `score = daysSurvived × 10 + round(averageWarmthOverRun)`
- plus a CLEAR bonus of 200
- plus a no-freeze bonus of 150 when CLEAR happens with 0 marks
- averageWarmthOverRun is the mean warmth of all penguins, sampled 4 times per second.

**Edge sides:** penguins with the lowest warmth shiver. The shiver amplitude grows as warmth drops below 30. Their warmth number does not show by default.

**Warmth display:** the belly colour interpolates through #ff9a3c (100), #ffd27a (60), #bfe3ff (30) and #6aa8ff (0). Below 20, a small 🥶 bubble blinks above the head.

## Result tiers

| condition | ko | en | emoji |
|---|---|---|---|
| CLEAR, 0 freezes | 완벽한 허들 리더 | Perfect Huddle Leader | 👑 |
| CLEAR | 봄을 데려온 펭귄 무리 | The Flock That Brought Spring | 🐣 |
| game over, day ≥ 45 | 거의 다 왔어요! | So Close to Spring! | 🌅 |
| game over, day ≥ 20 | 눈보라를 버틴 무리 | Blizzard Survivors | 🌨️ |
| game over, day < 20 | 아직 허들 연습 중 | Still Practising the Huddle | 🐧 |

## Facts (fact card and start screen)

The builder must double-check these against a reliable source before shipping. Keep the wording approximate, with words like "약" and "about", and give no precise temperatures beyond those below.

| # | ko | en |
|---|---|---|
| 1 | 황제펭귄 수컷은 남극의 겨울 동안 발 위에 알을 올려 약 두 달 동안 품어요. | Emperor penguin fathers balance an egg on their feet for about two months of the Antarctic winter. |
| 2 | 알을 품는 동안 수컷은 거의 아무것도 먹지 못하고 버텨요. | While keeping the egg warm, the fathers go almost without food. |
| 3 | 남극의 겨울은 영하 40°C 아래로 떨어지기도 하고 아주 센 바람이 불어요. | Antarctic winter can drop below −40 °C, with very strong winds. |
| 4 | 펭귄이 몸을 붙여 '허들'을 만들면 안쪽은 바깥보다 훨씬 따뜻해져요. | Packed into a huddle, the middle stays far warmer than the edge. |
| 5 | 허들은 가만히 있지 않아요. 펭귄들이 조금씩 움직이며 바깥 자리를 돌아가며 맡아요. | A huddle is never still: the birds keep shuffling, so everyone takes turns at the cold edge. |
| 6 | 깃털이 촘촘하고 몸에 지방층이 있어서 추위를 잘 견뎌요. | Dense feathers and a layer of fat help them handle the cold. |

## Visual design

**Palette:**

| element | colour |
|---|---|
| night sky | gradient from #0d1b3d to #1f3a6b |
| aurora | #5ef2b8 at 25% alpha, a slow sine ribbon |
| ice | #e8f4ff with #c9e2f7 cracks |
| penguin | back #1e2430, face white, beak #ffb03a |
| accent | yellow #ffd84d |
| warning red | #ff5a5f |

**Penguins:**
- Drawn on canvas as a rounded body ellipse, a white face patch, the belly colour, an orange beak and two dot eyes.
- An egg is not drawn. Only on CLEAR does the 🐣 pop out at their feet.
- They breathe idly (scale 1 ± 0.02) and blink every 3–6 s.

**Wind:**
- A big translucent arrow on the windward edge.
- Streak particles move in the wind direction, about 40 normally and 120 during a blizzard.

**Juice:**
- swap: a small dust puff and a squash-and-stretch waddle
- freeze: the ice overlay and a 6 px screen shake for 150 ms
- thaw: a sparkle
- each new day: the counter ticks with a pop
- NEW BEST: a stamp with scale 2 → 1

**Layout:**
- The canvas fills `100dvh`, and the huddle is centred with the hex size computed from `min(w, h × 0.62)`.
- The HUD is at the top and a hint line at the bottom.
- On wide screens the play column is at most 520 px wide and the sky covers the whole window.

**Rendering:** system-ui font stack, DPR capped at 2, and recompute on `resize`.

**prefers-reduced-motion:**
- no shake and no aurora motion
- 15 snow particles
- swaps fade in 150 ms instead of waddling

## Sound (off by default, Web Audio after the first gesture)

| sound | how to synthesise it |
|---|---|
| swap | two short "pip" squeaks, sine 900 Hz then 1200 Hz, 40 ms each, gain 0.05 |
| wind | band-passed white noise. Gain follows windLevel, 0.02–0.05, and doubles in a blizzard |
| freeze | filtered noise burst 120 ms plus a sine glide 400 → 150 Hz, gain 0.1 |
| thaw | rising triangle 500 → 900 Hz, 120 ms |
| clear | a 4-note major arpeggio on triangle |

The mute toggle 🔊/🔇 is persisted.

## Strings

| key | ko | en |
|---|---|---|
| appTitle | 펭귄 허들 체온 지키기 | Penguin Huddle |
| startSub | 서로 안아 주면 겨울도 버텨요. 65일을 함께 넘겨 보세요 | Huddle up and share the cold. Get everyone through 65 days. |
| startHow | 펭귄 둘을 눌러 자리를 바꿔요. 파래진 펭귄은 안쪽으로! | Tap two penguins to swap. Blue ones go inside! |
| startBtn | 겨울나기 시작 | Start the winter |
| best | 최고 기록 | Best |
| day | {n}일째 | Day {n} |
| score | 점수 | Score |
| frost | 꽁꽁 | Freezes |
| windHint | 바람 방향이 바뀌었어요! 화살표 쪽 펭귄이 가장 추워요 | The wind changed! Penguins facing the arrow get coldest. |
| blizzard | 눈보라가 와요! | Blizzard incoming! |
| frozen | 꽁꽁 얼었어요! 안쪽으로 넣어 녹여 주세요 | Frozen! Move it inside to thaw. |
| thawed | 휴, 녹았다! | Phew, thawed! |
| pause / resume / menu | 일시정지 / 계속하기 / 처음으로 | Paused / Resume / Main menu |
| overTitle | 겨울이 너무 추웠어요 | The winter got too cold |
| clearTitle | 봄이 왔어요! 아기 펭귄이 태어났어요 | Spring is here! The chicks hatched |
| daysSurvived | 버틴 날 | Days survived |
| swaps | 자리 바꾸기 | Swaps |
| avgWarmth | 평균 체온 | Average warmth |
| newBest | 신기록! | New best! |
| didYouKnow | 알고 있었나요? | Did you know? |
| again | 다시 하기 | Play again |
| soundOn / soundOff | 소리 켜기 / 소리 끄기 | Sound on / Sound off |
| note | 게임 속 숫자는 재미를 위해 단순하게 만들었어요 | Numbers in the game are simplified for fun |

The tier titles and facts use the strings in the tables above. All strings live in one `{ ko: {...}, en: {...} }` dictionary. The language comes from `?lang=`, falling back to `navigator.language`, and `<html lang>` must match.

## localStorage (in try/catch, prefix `phd:`)

| key | value | default |
|---|---|---|
| `phd:best` | best score as an integer | none |
| `phd:sound` | "1" or "0" | "0" |
| `phd:hintSeen` | "1" after the first wind hint was shown | none |
| `phd:factIdx` | last fact index, so the next run shows a different fact | none |
| `phd:runs` | number of games played (not shown) | none |

## Edge cases

- **Restart** fully resets warmth, frozen flags, marks, time, wind, blizzards and swaps, and clears any selection or drag. Sound and best score are kept.
- **Swap target:**
  - Pointing at a penguin that is mid-swap is ignored, and a selection can never target a locked penguin.
  - Swapping a penguin with itself is a no-op.
- **Drag release:** dragging off-canvas or a `pointercancel` cancels the drag cleanly.
- **Pausing and timing:**
  - Hiding the page auto-pauses. dt is capped at 50 ms, and timers (wind, blizzard, run clock) run on simulated time only.
  - A blizzard warning that starts just before a pause continues from where it was.
- **Resize mid-game** recomputes hex size and positions from the axial coordinates. State is untouched, and a swap in progress keeps going in the new coordinates.
- **Simultaneous events:** if a freeze and the clear happen in the same frame, the clear wins. If the third freeze and day 65 fall in the same frame, it counts as CLEAR.
- **Keyboard cursor:** it starts on the centre penguin and skips nothing, because every slot is filled. Pressing an arrow with no neighbour in that direction keeps the cursor still.
- **Blocked localStorage:** the game still works, and the best score is kept for the session only.
- **`location.hash === '#demo'`:** start PLAY immediately at day 30 with mixed warmth, 1 frost mark, one penguin selected and a visible wind arrow, then freeze time for a clean QA thumbnail. Ignore it otherwise.
- **Multi-touch:** only the first active pointer drives selection and drag.

## Must not

- No network of any kind: no fonts, CDNs or fetch. No raster images or video, since this is a game. Draw with canvas, CSS or emoji only.
- No copying of existing penguin characters, mascots, films or games: no named penguin heroes, no famous designs, no trademarked looks.
- No death, blood or sad imagery. Freezing is a cartoon ice cube that always thaws, and nobody is lost for good. No predators.
- No climate-politics messaging or blame. The facts stay neutral and simple.
- No precise scientific claims beyond the Facts table, and no "real" temperatures in the HUD. Warmth is an abstract meter.
- No alert, confirm, prompt, window.open or navigation. No sound autoplay. No page scroll.
