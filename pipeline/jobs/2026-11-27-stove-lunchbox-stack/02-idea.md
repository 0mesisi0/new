# Idea and spec: 난로 위 도시락 탑 / Stovetop Lunchbox Stack

Agent: Claude (opus), planner. Design notes are merged in (palette, layout, motion).

## Concepts scored

Scores are 1–5 for: value in the first 10 seconds, originality, Korean search/share demand, and buildability in one HTML file. Maximum 20.

| Concept | Category | Score | Verdict |
|---|---|---|---|
| 지붕 위 눈 무게 계산기: area × snow depth × snow type gives kg on your roof or greenhouse, compared to cars and elephants (대설 12/7 hook) | learn | 4/4/3/5 = 16 | Good. Save it for the first heavy-snow news day |
| 기부금 세액공제 계산기 2026 | tools | 3/2/4/4 = 13 | The December tax-credit topic is real, but the 고향사랑기부 and 15%/30% rules change often and would need official checks. Three other tax specs are already queued, so skip |
| **난로 위 도시락 탑** | **games** | **5/4/4/4 = 17** | **Picked**: winter-classroom nostalgia (양은 도시락 stacked on the stove) that people love to share, a fresh subject, and real-time stack management. No existing game is copied |

Research link: this follows the "gentle care with a limit" tension from item 3 (if you push one box too long it burns), but the subject and mechanic are new. Nothing here is a lunchbox, stove or classroom item yet.

## Meta

- slug `stove-lunchbox-stack`, category `games`, kind `game`, aspect `9/16`, date `2026-11-27`
- tags: ko `양은도시락`, `난로`, `추억게임`; en `lunchbox`, `stove`, `nostalgia`
- title: ko `난로 위 도시락 탑`; en `Stovetop Lunchbox Stack`
- desc ko: 교실 난로 위에 쌓인 양은 도시락, 맨 아래는 금방 타요! 도시락을 위로 올려 가며 점심종이 울릴 때 모두 따끈하게 만들어 보세요. 마지막엔 흔들어 섞기까지.
- desc en: Old-school tin lunchboxes are stacked on the classroom stove, and the bottom one burns fast. Keep moving boxes to the top so all of them are warm when the lunch bell rings, then shake!
- howto ko: 도시락을 누르면 맨 위로 올라가요(숫자키 1~7도 돼요, 1이 맨 아래). 맨 아래일수록 빨리 데워져요. 60초 뒤 점심종이 울리면 4초 동안 연타해서 도시락을 흔드세요. 따끈(주황 띠)이면 3점, 타면 감점이에요.
- howto en: Tap a box to move it to the top (keys 1-7 work too, 1 is the bottom). Lower boxes heat faster. When the lunch bell rings after 60 s, mash for 4 s to shake your lunchbox. Warm (orange band) scores 3, burnt loses points.
- about ko: 예전 겨울 교실에서는 난로 위에 도시락을 쌓아 데우고, 당번이 아래 도시락을 위로 옮겨 주곤 했어요. 탄 누룽지도 추억이죠. 특정 학교나 인물과는 관계없어요.
- about en: Winter classrooms in Korea once warmed lunchboxes stacked on the stove, and someone would move the bottom box up so it would not burn. Even the scorched rice became a fond memory. Not based on any real school or person.

## Pitch

A cozy retro classroom at 11:00 on a snowy morning. A round cast-iron stove stands in the middle with a chimney pipe, and steamed-up windows sit behind it. Tin lunchboxes are stacked on its hot plate, each with a cute sticker (🐰⭐🍀🐻🌷🚀🐟) and a heat bar.

1. Heat rises from the bottom, so the lowest box warms fastest and the higher ones barely warm at all.
2. Tap any box to pull it out and set it on the top. The boxes above it drop down one slot.
3. More boxes arrive during the round. Twice, a big shovel of fuel goes into the stove and the heat surges.
4. At 60 s the lunch bell rings and every box is graded. A 4-second "흔들어!" mash then decides how well the lunch is mixed.
5. The result shows each box opened (rice, fried egg, kimchi, sausage) with a grade stamp.

## Flow

1. **START**
   - The stove illustration, title, one-line how-to, best score and a big "4교시 시작" button. Tapping anywhere on the scene also starts.
   - Snow falls outside the window, and the chimney gives off small heat shimmer lines.
   - Mute toggle at the top right.
2. **PLAY (60 s)**
   - Top HUD: a clock showing "11:00 → 12:00" as a progress bar (60 s real time), the score preview (number of boxes currently in the warm band) and a pause button.
   - Center: the stack, up to 7 slots. Slot 1 is the bottom, on the plate.
   - Bottom: a hint line that changes with events.
   - Box arrivals on a fixed schedule, so best scores are fair:
     - 3 boxes at t = 0
     - +1 at t = 8, 16, 24 and 34 s
     - +1 at t = 44 s (the "지각생 도시락", late kid's box)
     - That makes 8 attempts at 7 slots. If the stack is full when a box is due, it waits on the windowsill (shown greyed, with a "자리 없음" tag) and drops in when a burnt box is removed (see Burnt below) or never.
   - A new box drops onto the top with a bounce and a clank.
   - Fuel surges, called "조개탄 투입!": they start at t = 20 s and t = 42 s, each ±2 s by `Math.random`. A shovel icon slides in 1.5 s early with the text warning. The surge lasts 6 s with ×1.6 heat rate, orange glow and flicker.
3. **BELL**
   - At t = 60 the bell rings ("딩동댕"), heating stops and a 0.8 s freeze shows the "점심시간!" banner.
4. **SHAKE (4 s)**
   - The stack disappears. A single big lunchbox, held by two cartoon hands, fills the center with the text "흔들어! 흔들어!".
   - Every tap, Space or Enter press, or pointer drag direction change counts as one shake.
   - The box jiggles ±6° per shake, and rice grain particles bounce inside.
   - Mixing meter: 0–30 shakes, capped.
5. **RESULT**
   - Opened boxes in a 2-column grid, each showing its sticker, the food drawn top-down (canvas: rice + 2 random side dishes), its grade stamp and points.
   - Then the shake grade, the total score, best score, and a "NEW BEST" ribbon if beaten.
   - Big "다시 하기" button and a "결과 텍스트 복사" button.
6. **PAUSE**
   - Opens on the pause button, Escape/P, or when `document.hidden` turns true.
   - Dim overlay with "계속하기" and "처음으로". The timer, events and arrivals all freeze.

## Controls

- **Pointer:** tap or click a box to move it to the top. Tapping the top box does nothing except a small wiggle and "이미 맨 위예요" in the hint line.
- **Keys on PLAY:** 1–7 pick a box by slot from the bottom. ArrowUp/ArrowDown move a focus ring and Enter or Space moves the focused box to the top. P or Escape pauses.
- **Keys on SHAKE:** Space, Enter or any letter key counts as one shake. Held-key auto-repeat is ignored (`e.repeat`).
- **Keys on START/RESULT:** Enter or R starts or restarts. C copies on RESULT. M toggles sound everywhere.
- **Touch and layout:** each box tap target is at least 56 px tall, and the full row width is tappable. The play area has `touch-action:none` and `preventDefault` on pointerdown, keydown for game keys and touchmove.
- **Move animation:** 180 ms. The box lifts out sideways, the boxes above it slide down, and it lands on top. Taps during the animation are queued (max 2) and run in order. The heat of every box keeps updating during the animation, based on its target slot.

## Heat model

- Each box has `heat` in [0, 120], starting at 0 (cold from the walk to school). Late boxes start at 0 too.
- Rate per second by slot from the bottom (index 0–6): `[9, 4.6, 2.6, 1.6, 1.0, 0.6, 0.4]`. During a surge, multiply by 1.6.
- `heat += rate × dt`, with dt capped at 50 ms. Heat never goes down: the challenge is spreading time on the hot plate.
- Bands (also drawn as colored zones on each heat bar):

| heat | band ko / en | bar color | points |
|---|---|---|---|
| < 40 | 차가움 / Cold | #7fb3e0 | 0 |
| 40–65 | 미지근 / Lukewarm | #f2d27a | 1 |
| 65–90 | 따끈 / Toasty | #f08a3c | 3 |
| 90–100 | 누룽지 직전 / Crispy | #c75a2a | 2 |
| ≥ 100 | 탔다 / Burnt | #3a2a24 | −1 |

- **Warnings:** at 85 or more the box gets wisps of steam. At 95 or more it jitters ±1 px and a sizzle plays once.
- **Burnt:** at ≥ 100 the box turns black and smokes, and a thump plays. Burnt is permanent. A burnt box can still be tapped and moved like any box. Long-press it for 600 ms (or press Delete or X with it focused) to "창가로 치우기": it leaves the stack and frees a slot for a waiting box, but its −1 still counts at the end.
- **Balance check:** at full stack the total throughput is about 19.8/s, and 7 boxes × about 77 target heat is about 540, which is about 27 s of heat. With 60 s, a careful player can get 6–7 boxes Toasty. Doing nothing burns the bottom box at about 11 s.

## Scoring

- boxScore = the sum of the band points of all boxes at the bell (including removed burnt ones, at −1).
- Shake bonus by shakes counted (s):

| s | grade ko / en | bonus |
|---|---|---|
| < 8 | 살살 흔듦 / Gentle stir | 0 |
| 8–17 | 잘 섞임 / Well mixed | 2 |
| 18–29 | 비빔밥 완성 / Bibimbap achieved | 4 |
| ≥ 30 | 전설의 흔들 도시락 / Legendary shake | 6 |

- total = boxScore × 100 + bonus × 50. Display it as "점수 {n}". Max is 7 × 3 × 100 + 300 = 2400.
- Result title by total:

| total | ko | en | emoji |
|---|---|---|---|
| < 600 | 찬밥 당번 | Cold-Rice Monitor | 🥶 |
| < 1200 | 미지근한 반장 | Lukewarm Class Rep | 🙂 |
| < 1800 | 난로 당번 에이스 | Stove-Duty Ace | 🔥 |
| ≥ 1800 | 전설의 도시락 지킴이 | Legendary Lunchbox Keeper | 🏆 |

- Hidden title: if every box at the bell is Toasty and none burnt, the title is "완벽한 4교시 / The Perfect 4th Period" 🌈.

## Box contents (result only)

- Each box gets 2 side dishes at spawn, picked with `Math.random` from: 계란후라이 🍳, 김치 🥬, 분홍 소시지 🌭, 멸치볶음 🐟, 콩자반 🫘, 김 🟩. The lid sticker comes from a fixed order: 🐰⭐🍀🐻🌷🚀🐟🎈.
- The food is drawn on canvas as a top-down tin box: a silver rounded rectangle with a rice area and a side-dish compartment.
- The band changes the look:
  - Cold: pale rice and a "❄" mark.
  - Toasty: steam lines.
  - Crispy: a golden rim on the rice ("누룽지 보너스!" tag).
  - Burnt: a dark rim and a smoke puff.
- The shake grade changes the main box: ≥ 18 shakes show mixed red-orange rice (흔들 도시락 style).

## Screens and visual design

- **Palette:**
  - wall #f3e6cf, floor wood #b9875a, blackboard #2f4a3a, window frost #dbe9f2
  - stove body #3b3f46, plate glow #ff7a2f, tin #c9ced6 with a #9aa1ab edge, accent red #e0453d, ink #2a2420
- **Scene:** a canvas background with the blackboard (chalk "4교시 · 자습" in ko, "Period 4 · Study" in en), a steamed window with falling snow (about 40 particles, sine drift) and the stove centered at the bottom third. The chimney pipe goes up to the top. DPR is capped at 2.
- **Stack:**
  - Boxes are drawn as tin rectangles with a lid latch, a sticker, and a horizontal heat bar on the box face with band ticks.
  - Box height = min(9vh, 64px). The stack is centered on the stove plate.
  - With 7 boxes the top sits below the HUD. Layout is computed from the window height on `resize`.
- **Juice:**
  - landing bounce (scale 1.08 → 1, 120 ms)
  - entering the Toasty band: a one-time "따끈!" pop text and an orange ring flash
  - burn: 4 px screen shake for 150 ms and black smoke particles
  - surge: orange vignette pulse
  - bell: the whole scene jolts 3 px
  - RESULT: stamps thump in one by one (scale 2 → 1, −8° rotation, 90 ms apart)
- **START:** a big title with an emoji row 🍱🔥, a subtitle, a red primary button, the best score and a footnote.
- **RESULT:** a cream card panel (#fffaf0) with a soft shadow and a 2-column grid. At ≤ 360 px width it becomes 1 column and scrolls inside the card. The page never scrolls. A sticky bottom bar holds [다시 하기] [결과 복사].
- **Small screens:** at 320 px wide, use 12 px side padding, a hint line of 13 px minimum and HUD text of 14 px minimum.
- **Wide screens:** the scene fills the window and the play column is centered at max-width 480 px.
- **prefers-reduced-motion:** no screen shake, no bounce, 15 slow snow particles, and a static red border instead of the surge flicker. The shake phase still counts taps, but the box tilt is capped at ±2°.

## Sound (off by default; Web Audio after the first gesture)

- clank on landing: a 60 ms square wave at 420 Hz → 260 Hz, gain 0.05
- sizzle at 95 heat: 300 ms of high-pass filtered noise, gain 0.03
- burn thump: an 80 ms sine at 90 Hz with decay, gain 0.12
- surge whoosh: 400 ms of low-pass noise sweeping up
- bell: three triangle notes, E5–C5–G4 then G4–C5–E5? No, keep it original: three ascending triangle notes, C5, E5, G5, each 220 ms (a generic school-bell feel, not a copy of any real chime)
- shake: a short 20 ms click with the pitch randomized per shake
- The mute toggle shows 🔊/🔇. The setting is persisted.

## Strings

| key | ko | en |
|---|---|---|
| appTitle | 난로 위 도시락 탑 | Stovetop Lunchbox Stack |
| startSub | 맨 아래 도시락은 금방 타요. 위로 올려 가며 점심종까지 따끈하게! | The bottom box burns fast. Keep moving boxes up until the lunch bell! |
| startBtn | 4교시 시작 | Start Period 4 |
| tapToStart | 화면을 눌러 시작 | Tap to start |
| best | 최고 점수 {n} | Best {n} |
| foot | 특정 학교·인물과 관계없는 창작 게임이에요 | An original game, not based on any real school or person |
| hintStart | 도시락을 누르면 맨 위로 올라가요 | Tap a box to move it to the top |
| hintTop | 이미 맨 위예요 | Already on top |
| hintArrive | 도시락이 하나 더 왔어요! | Another lunchbox arrived! |
| hintFull | 자리 없음, 창가에서 기다려요 | No room, waiting on the windowsill |
| hintSurgeSoon | 곧 조개탄 투입! 아래 도시락 조심 | Fuel incoming! Watch the bottom box |
| hintSurge | 조개탄 투입! 불이 세졌어요 | Fuel added! The fire is hotter |
| hintBurnt | 탔어요! 길게 눌러 창가로 치울 수 있어요 | Burnt! Long-press to move it to the windowsill |
| toasty | 따끈! | Toasty! |
| clearAway | 창가로 치우기 | Move to windowsill |
| bell | 점심시간! | Lunchtime! |
| shake | 흔들어! 흔들어! | Shake! Shake! |
| shakeCount | {n}번 흔듦 | {n} shakes |
| bandCold / bandLuke / bandToasty / bandCrispy / bandBurnt | 차가움 / 미지근 / 따끈 / 누룽지 직전 / 탔다 | Cold / Lukewarm / Toasty / Crispy / Burnt |
| crispyTag | 누룽지 보너스! | Crispy bonus! |
| shake0 / shake1 / shake2 / shake3 | 살살 흔듦 / 잘 섞임 / 비빔밥 완성 / 전설의 흔들 도시락 | Gentle stir / Well mixed / Bibimbap achieved / Legendary shake |
| title0 / title1 / title2 / title3 | 찬밥 당번 / 미지근한 반장 / 난로 당번 에이스 / 전설의 도시락 지킴이 | Cold-Rice Monitor / Lukewarm Class Rep / Stove-Duty Ace / Legendary Lunchbox Keeper |
| titleHidden | 완벽한 4교시 | The Perfect 4th Period |
| score | 점수 {n} | Score {n} |
| newBest | 최고 기록! | NEW BEST! |
| again | 다시 하기 | Play again |
| copy | 결과 복사 | Copy result |
| copied / copyFail | 복사했어요 / 복사하지 못했어요 | Copied / Could not copy |
| pause / resume / home | 일시정지 / 계속하기 / 처음으로 | Paused / Resume / Main menu |
| soundOn / soundOff | 소리 켜기 / 소리 끄기 | Sound on / Sound off |
| board | 4교시 · 자습 | Period 4 · Study |
| dishes | 계란후라이 / 김치 / 분홍 소시지 / 멸치볶음 / 콩자반 / 김 | Fried egg / Kimchi / Pink sausage / Anchovies / Sweet beans / Seaweed |
| shareText | 🍱 난로 위 도시락 탑 {score}점 / 따끈 {t}개 · 탄 도시락 {b}개 / 칭호: {title} / play.mesisi.net | 🍱 Stovetop Lunchbox Stack: {score} / Toasty {t} · Burnt {b} / Title: {title} / play.mesisi.net |

## localStorage (in try/catch, prefix `slb:`)

- `slb:best`: the best total (integer)
- `slb:sound`: "1" or "0", default "0"
- `slb:plays`: the number of finished rounds (not shown in the UI)

## Edge cases

- Restart fully resets the boxes, timers, the event schedule (surge times re-rolled), the queue, particles and the shake count. Sound and best score are kept.
- Tab hidden: auto-pause, and dt is clamped to 50 ms when it resumes. The pause overlay stays until the player taps "계속하기", so the timer never jumps.
- Resize during play: recompute slot positions from state and snap any running move animation to its end. Never reset the round.
- Tapping in the 0.8 s bell freeze is ignored. Shake input is ignored for the first 150 ms of SHAKE, so a leftover tap is not counted.
- Shake on the pointer counts a pointerdown, or a drag direction reversal over 12 px. It is capped at 40 internally and displayed with a cap of 30+.
- With the stack full and a box waiting, removing a burnt box drops the waiting box in at once. Waiting boxes not placed by the bell do not score and are listed as "못 데운 도시락" (Never warmed, 0 points).
- Copy uses `navigator.clipboard.writeText`, falling back to a hidden textarea and `execCommand('copy')`, with a toast either way.
- If localStorage is blocked, everything works and best shows "–".
- If `location.hash === '#demo'`, jump straight to RESULT with a fixed state: 7 boxes with heats [78, 82, 70, 55, 93, 101, 30] and 20 shakes. This is for QA thumbnails only.
- `?lang=` missing: fall back to `navigator.language` (ko*, else en). `<html lang>` matches.

## Must not

- No network of any kind, and no raster images (canvas, SVG, CSS and emoji only). Stay under 150 KB.
- No real school names, real brands (including lunchbox, coal or sausage brands), real people or real school chimes.
- No jokes about corporal punishment, teachers, bullying, poverty ("who has the poor lunch") or comparing families. The humor is the stove and the scorched rice only.
- Do not imitate any existing stacking, cooking-timer or lunchbox game's name, art or look.
- No fire-safety misinformation: the about text frames this as a past memory, not advice to heat food on stoves.
- No devicemotion or other permission-requiring APIs. No alert, confirm, prompt, window.open or navigation. No sound autoplay.
