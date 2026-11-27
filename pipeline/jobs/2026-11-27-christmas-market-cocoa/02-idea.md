# Idea and spec: 크리스마스 마켓 코코아 가게 / Christmas Market Cocoa Stand

Agent: Claude (opus), planner. Design notes are merged in (palette, layout, motion).

## Concepts scored

Scores are 1–5 for: fun in the first 10 seconds, originality, Korean search/share demand, and buildability in one HTML file. Maximum 20.

| Concept | Category | Score | Verdict |
|---|---|---|---|
| 곶감 말장난 생성기: "곧 감 → 곶감" style pun draws | random | 3/3/3/5 = 14 | The trend is low confidence and the year is unclear. Its subject (dried persimmon) also sits too close to the queued `persimmon-breeze`. Skip it. |
| 월세 세액공제 계산기 2026 | tools | 2/2/5/4 = 13 | Search demand is strong. Research only has a 2025 귀속 blog source, so the rates and limits must be checked against 국세청 before anyone builds it. Keep it for a day with verified numbers. |
| **크리스마스 마켓 코코아 가게** | **games** | **5/4/3/4 = 16** | **Picked.** Research row 9 shows Christmas markets up +161.5%, and nothing on the site covers that hook yet. It also avoids every used subject (cake, gift, lights, tree, fish cake, sweet potato). Hold-to-pour gives a satisfying tap in the first second. |

## Meta

- slug `christmas-market-cocoa`, category `games`, kind `game`, aspect `9/16`, date `2026-11-27`
- tags: ko `크리스마스마켓`, `코코아`, `핫초코`; en `christmas-market`, `cocoa`, `cooking-game`
- title: ko `크리스마스 마켓 코코아 가게`; en `Christmas Market Cocoa Stand`
- desc ko: 눈 내리는 크리스마스 마켓에서 90초 동안 코코아 노점을 맡아요. 꾹 눌러 딱 선까지 따르고, 토핑을 올려 손님 줄을 줄여 보세요.
- desc en: Run a cocoa stand at a snowy Christmas market for 90 seconds. Hold to pour right to the line, add toppings and keep the queue moving.
- howto ko: 맨 앞 손님 주문을 보고 ① 코코아 종류를 고르고 ② '따르기'를 꾹 눌러 점선에서 손을 떼고 ③ 토핑을 올린 뒤 ④ '내주기'를 누르세요. 넘치면 휴지통으로 버리고 다시 만들어요. 키보드: 1~3 종류, 스페이스 따르기, 4~7 토핑, Enter 내주기, Backspace 버리기.
- howto en: Read the front customer's order, then (1) pick the cocoa, (2) hold Pour and release on the dashed line, (3) add toppings and (4) tap Serve. If it overflows, bin it and start again. Keys: 1-3 cocoa, Space pour, 4-7 toppings, Enter serve, Backspace bin.
- about ko: 손님은 모두 털모자를 쓴 동물들이에요. 점선에 딱 맞추면 '완벽!'이 뜨고, 완벽이 이어지면 콤보 배수가 최대 ×2까지 올라가요.
- about en: Every customer is an animal in a knit hat. Hit the dashed line exactly for "Perfect!", and chain perfects to raise your combo up to x2.

## Pitch

A small wooden stall sits at a night-time Christmas market. String lights sway overhead, snow falls, and a queue of animals in knit hats shuffles toward the counter.

1. The front customer shows a speech bubble with their order: the cocoa type, a mini cup with a dashed fill line, and toppings.
2. The player taps a cocoa type, then **holds** Pour. The liquid rises with a glug sound, and the player releases at the line.
3. The player taps toppings (whipped cream, marshmallows ×n, cinnamon, candy cane) and serves.
4. The customer reacts (♥, 😊 or 😐), coins pop out and the queue moves up.
5. When the 90-second shift ends, a closing screen shows sales, a stall rank, the best score and a big retry button.

## Flow

1. **START**
   - The stall is drawn on canvas with snow falling. Title, one-line how-to and a big "영업 시작 / Open the stall" button. Tapping anywhere on the canvas also starts.
   - Best score is shown under the button ("최고 매출 {n}").
   - Mute toggle at the top right.
2. **PLAY (90 s)**
   - Top HUD: a timer bar plus seconds, the score, a combo badge (×1.0 … ×2.0), and a pause button ⏸.
   - Middle: up to 3 customers in a queue, only the front one has an order bubble. Each customer has a patience ring.
   - Counter: the cup (center), with a big **Pour** button under it.
   - Bottom rows: the 3 cocoa buttons, the 4 topping buttons, then 🗑️ Bin and ✅ Serve.
   - A "3, 2, 1, 영업 시작!" countdown runs first (1.5 s total; skipped under reduced motion, which shows the text for 0.6 s).
3. **PAUSE** (⏸ or Esc, and automatically when the page is hidden)
   - Dims the screen with [계속하기 / Resume] and [처음으로 / Quit]. The timer and patience freeze.
4. **CLOSING (game over)**
   - A shutter rolls down over the stall (0.5 s), then a card shows:
     - today's sales (score) counting up over 0.8 s
     - orders served, perfect pours, best combo and customers who left
     - the rank title and emoji
     - "최고 기록!" with a small confetti burst if it is a new best
   - Buttons: a big [한 번 더 / Play again] and a small [처음으로 / Title].

## Order rules

The cocoa types:

| key | ko | en | liquid color |
|---|---|---|---|
| choco | 코코아 | Cocoa | #6b3e26 |
| mint | 민트 코코아 | Mint Cocoa | #4f8f6f, plus a darker swirl |
| white | 화이트 코코아 | White Cocoa | #efe3c8 |

The toppings (drawn on canvas as simple shapes, with emoji only as a fallback):

| key | ko | en | drawn as | rule |
|---|---|---|---|---|
| whip | 휘핑크림 | Whipped cream | a white swirl dome | 0 or 1 |
| mallow | 마시멜로 | Marshmallow | small rounded white cubes | 0–3; each tap adds one, and a 4th tap does nothing (shake) |
| cinnamon | 시나몬 | Cinnamon | brown dust dots | 0 or 1 |
| cane | 사탕 지팡이 | Candy cane | a red/white striped hook | 0 or 1 |

The toppings only activate once there is liquid in the cup (fill > 10%). Before that, a tap shakes the button and shows the toast "먼저 따라 주세요 / Pour first".

Every order has a target fill line T between 55% and 90%, drawn as a dashed line on both the cup and the bubble's mini cup.

The difficulty ramps up with elapsed time t:

| t (s) | toppings per order | max marshmallows | patience (s) | full-cup pour time (s) | queue spawn gap (s) |
|---|---|---|---|---|---|
| 0–15 | 0 (the first 2 orders are always choco with no toppings) | 0 | 20 | 1.8 | 6 |
| 15–40 | 1–2 | 1 | 17 | 1.6 | 5 |
| 40–70 | 1–3 | 2 | 14 | 1.4 | 4.5 |
| 70–90 | 2–3 | 3 | 11 | 1.2 | 4 |

- The queue holds a maximum of 3 customers. If the queue has fewer than 2, a new one arrives immediately.
- Pouring is linear: fill += dt / pourTime. If you release, the pouring stops at once (no drip).
- If the fill goes above 100%, the cup overflows. Liquid particles spill over the side, the cup is marked `messy`, and the pouring stops automatically.

## Scoring

When you serve the front customer:

- **Wrong cocoa type:** the customer says "어라? 이거 아닌데…" and leaves 😐. Score +0 and the combo resets.
- **Fill:** |fill − T| ≤ 2.5% gives **Perfect +30** (a gold "완벽!" pop). ≤ 6% gives **Good +15**. Anything else gives +0. A messy cup is −10.
- **Toppings:** each topping that matches exactly is +10 (for marshmallows, the count must match). Each extra or wrong topping is −5. The floor for the topping score is 0.
- **Speed tip:** round(patienceLeft fraction × 20).
- **Order score** = (fill + toppings + tip) × combo, rounded, with a minimum of 0.
- **Combo:** a Perfect fill with all toppings correct adds +0.25, up to a cap of ×2.0. A Good fill keeps the combo. Anything else resets it to ×1.0.
- **A customer whose patience runs out** leaves with a 💨 puff. Score −20, the combo resets, and the cup currently being made is kept for the next customer.
- The total score never drops below 0.

The reaction faces: ≥ 70 points before combo gives ♥ and a hop, ≥ 35 gives 😊, and less gives 😐.

## Rank tiers (by final score)

| score | ko | en | emoji |
|---|---|---|---|
| < 200 | 오늘 처음 온 알바생 | First Day on the Job | 🧤 |
| < 500 | 단골이 생긴 노점 | A Stand with Regulars | ☕ |
| < 900 | 마켓 인기 노점 | Market Favorite | 🎄 |
| < 1300 | 줄 서서 먹는 코코아집 | There's a Line Out Front | 🌟 |
| ≥ 1300 | 겨울밤 코코아 장인 | Cocoa Master of Winter Nights | 🏆 |

Hidden title: if you finish with 0 customers lost and at least 8 perfects, the title is "눈사람도 줄 서는 집 / Even Snowmen Queue Here" ⛄.

## Controls

- **Pointer:**
  - Tap the buttons. **Pour** uses `pointerdown` to start and `pointerup`, `pointercancel` or `lostpointercapture` to stop, with `setPointerCapture`.
  - Only the first active pointer pours. A second finger on Pour is ignored.
  - Tapping the cup is the same as Pour (hold).
- **Keys:**
  - 1/2/3 pick a cocoa type. Holding Space pours (keydown repeat is ignored, and keyup stops). 4 whip, 5 marshmallow, 6 cinnamon, 7 candy cane.
  - Enter serves and Backspace or Delete bins. Esc or P pauses or resumes. M toggles sound.
  - On START and CLOSING, Enter or Space starts or retries.
- **Changing your mind:**
  - Picking a cocoa type when the cup is empty sets it. Picking a different one once there is liquid in the cup does nothing (shake) and shows the toast "버리고 다시 골라요 / Bin it to switch".
  - Binning empties the cup with a dumping animation and costs 0.4 s of input lock.
- **Touch and layout:**
  - `touch-action:none` on the whole play area, and `preventDefault` on game keys and touches. No page scroll or zoom.
  - All buttons are ≥ 48 px tall, and Pour is ≥ 72 px tall and full width.
- Input is ignored for 250 ms after Serve, so a double tap cannot serve an empty cup to the next customer.

## Screens and layout

- **Portrait (aspect 9/16):** the HUD is 8% of the height, the queue and bubbles 30%, the cup and counter 30%, and the controls 32%.
- **Wide windows:** a centered column with max width 480 px. The market background (lights, snow, distant stalls) fills the whole window.
- **At 320 px wide:**
  - Topping buttons show their icon plus a short label in 12 px. Labels may wrap to 2 lines and are never truncated.
  - Cocoa buttons show a color swatch plus a label.
- **Order bubble:** the cocoa swatch and name, the mini cup with its dashed line, the topping icons with "×2" for marshmallows, and the patience ring around the customer's head. The ring turns from green to orange to red, and the customer shivers in the last 3 s.
- **Cup:**
  - Glass outline with steam wisps once it is filled above 30%.
  - The dashed line pulses softly.
  - A gauge tick on the right side shows the live fill %, and is hidden under reduced motion. The tick turns gold inside the perfect band.
- **Customers:** emoji animals 🐻🐰🦊🐧🦔🐱🐹 with a canvas-drawn knit beanie in a random color on top. The animal is picked by seeded random per customer, with no immediate repeats.

## Visual design

- **Palette:**
  - night sky gradient from #141b2d to #23304d
  - stall wood #8a5a3b and #6d4429, counter #c98d5e
  - string-light bulbs #ffd36e, #ff7a6b and #8fd3ff (static glow, slow twinkle)
  - snow: white at 70% alpha
  - UI cream #fff6e8, ink #2b2320, accent red #d8433b, gold #f2c14e, success green #3fae6a
- **Snow:** about 50 particles drifting on a sine. Under reduced motion, 15 slow particles.
- **Juice:**
  - Pour: a stream from the top with a wobbling liquid surface (a sine wave whose amplitude scales with pour speed).
  - Perfect: a gold ring burst plus 8 sparkles. Score pop text floats up.
  - Coins: 3–6 🪙 arc from the customer to the score.
  - Overflow: brown droplets plus a 3 px cup shake for 150 ms.
  - A customer leaving: they slide out to the left with 💨.
  - Last 10 s: the timer bar pulses red, with a tick sound each second.
- **Closing card:** cream paper with a stitched border and a big rank emoji that stamps in (scale 1.8 → 1, rotation −6°, 4 px shake for 120 ms; no animation under reduced motion).
- **prefers-reduced-motion:** no shake, no confetti, a static liquid surface, no customer hop, and score pops that fade instead of floating.
- **Canvas:** DPR is capped at 2 and the layout is recomputed on `resize`. Text uses the system-ui stack and numbers use `ui-monospace` for the HUD.

## Sound (off by default, Web Audio only after the first gesture)

- Pour: low-passed noise at about 600 Hz, looped while pouring, gain 0.05. The pitch rises slightly with fill.
- Topping plop: a 60 ms sine dropping from 500 Hz to 300 Hz, gain 0.08.
- Perfect: two sine notes, 880 Hz then 1320 Hz, 90 ms each, gain 0.07.
- Coin: a 1.6 kHz triangle, 50 ms, gain 0.05.
- Customer leaves: a 150 ms noise puff, gain 0.04.
- Last-10-s tick: a 1 kHz click, 20 ms, gain 0.03.
- Closing: a shutter rattle (noise bursts, 400 ms) followed by a small 3-note chime (C, E, G).
- The mute state is persisted.

## Strings

| key | ko | en |
|---|---|---|
| appTitle | 크리스마스 마켓 코코아 가게 | Christmas Market Cocoa Stand |
| startSub | 90초 동안 코코아를 팔아요. 꾹 눌러 점선까지 따르세요! | Sell cocoa for 90 seconds. Hold to pour up to the line! |
| startBtn | 영업 시작 | Open the stall |
| tapToStart | 화면을 눌러 시작 | Tap to start |
| best | 최고 매출 {n} | Best sales {n} |
| countdownGo | 영업 시작! | We're open! |
| hudTime | {s}초 | {s}s |
| hudScore | 매출 {n} | Sales {n} |
| hudCombo | 콤보 ×{x} | Combo x{x} |
| pour | 꾹 눌러 따르기 | Hold to pour |
| serve | 내주기 | Serve |
| bin | 버리기 | Bin |
| choco / mint / white | 코코아 / 민트 코코아 / 화이트 코코아 | Cocoa / Mint Cocoa / White Cocoa |
| whip / mallow / cinnamon / cane | 휘핑크림 / 마시멜로 / 시나몬 / 사탕 지팡이 | Whipped cream / Marshmallow / Cinnamon / Candy cane |
| order | {type} 주세요! | {type}, please! |
| perfect / good / miss | 완벽! / 좋아요 / 아쉬워요 | Perfect! / Good / Close-ish |
| messy | 넘쳤어요… | Overflowed... |
| wrongType | 어라? 이거 아닌데… | Huh? That's not mine... |
| left | 너무 추워서 갔어요 | Too cold, they left |
| thanks1 / thanks2 / thanks3 | 따뜻해요! / 고마워요! / 몸이 녹아요~ | So warm! / Thank you! / I'm thawing out~ |
| pourFirst | 먼저 따라 주세요 | Pour first |
| binToSwitch | 버리고 다시 골라요 | Bin it to switch |
| mallowMax | 마시멜로는 3개까지! | Three marshmallows max! |
| emptyCup | 빈 컵은 못 드려요 | Can't serve an empty cup |
| pause / resume / quit | 잠깐 쉬는 중 / 계속하기 / 처음으로 | Taking a break / Resume / Quit |
| closingTitle | 오늘 영업 끝! | Stall closed! |
| sales | 오늘 매출 | Today's sales |
| statServed / statPerfect / statCombo / statLeft | 판매 {n}잔 / 완벽 {n}번 / 최고 콤보 ×{x} / 떠난 손님 {n}명 | Served {n} / Perfects {n} / Best combo x{x} / Customers lost {n} |
| newBest | 최고 기록! | New best! |
| again | 한 번 더 | Play again |
| toTitle | 처음으로 | Title |
| soundOn / soundOff | 소리 켜기 / 소리 끄기 | Sound on / Sound off |
| rank0…rank4, rankHidden | (see Rank tiers) | (see Rank tiers) |

Number format: `toLocaleString(lang)`. Combo is shown with one decimal place (×1.5).

## localStorage (in try/catch, prefix `xmc:`)

- `xmc:best`: the best score (integer)
- `xmc:sound`: "1" or "0", default "0"
- `xmc:plays`: the number of shifts played (not shown in the UI)

When storage is blocked, the game still works and the best score lives in memory for the session.

## Edge cases

- If the player releases Pour outside the button or the window, `lostpointercapture` or `pointercancel` stops the pour. The window `blur` event also stops it.
- If the page is hidden or the window loses focus, the game auto-pauses and the pour stops. Delta time is clamped to 50 ms.
- If the window is resized mid-pour, the layout is redrawn from state (fill %, queue, timers) and nothing resets.
- Serving an empty cup (fill < 10%) is ignored with the "emptyCup" toast.
- Serving when no customer is at the front is impossible, because the queue is refilled immediately. If it happens anyway, the action is ignored.
- If time runs out mid-pour, the pour stops, the current cup is not scored, and the game goes to CLOSING.
- If the front customer leaves while you are holding Pour, the pour continues and the cup carries over to the next customer.
- Restarting fully resets the score, combo, timers, queue, cup, RNG seed (from `Date.now()`), stats and particles. Sound and best are kept.
- Keyboard auto-repeat on Space does not re-trigger pour start, and number keys ignore `e.repeat`.
- If `location.hash === '#demo'`, the game starts at t = 30 s with a fixed seed. The front order is mint, T 75%, whip plus 2 marshmallows, the cup is filled to 60% with whip added, 2 customers are in the queue, the score is 240 and the combo is ×1.5. The game stays frozen (not paused visually). This is for QA thumbnails only.

## Must not

- No network of any kind, no external fonts or images. Draw with canvas, CSS and emoji only (game rule).
- No alcohol: no 뱅쇼, mulled wine or 글뤼바인, even though real markets sell them.
- No real markets, cities, brands, cafe chains or trademarked characters. Do not imitate any existing cooking or serving game's name, characters, layout or art.
- Customers are only generic animals. No real people, and no mocking of customers, workers or any group.
- No health or calorie messages, no money or price claims (the score is "매출" points, not ₩).
- No alert, confirm, prompt, window.open or navigation. No sound autoplay.
- Do not reuse the visuals of existing items (fish cake cart, sweet potato stand). This stall has its own wood-and-string-light look.
