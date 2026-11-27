# Idea and spec: 빙판길 출근 / Black Ice Commute

## Concepts scored

Each concept is scored 1–5 on four things: value in the first 10 seconds, originality, Korean search/share demand, and how easily it fits in one HTML file. The maximum is 20.

| Concept | Category | Score | Verdict |
|---|---|---|---|
| 2027 탁상 달력 만들기 (printable desk calendar with 2027 holidays) | tools | 3/3/5/4 = 15 | Search demand is strong, but holidays overlap with annual-leave-bridge. Keep it for mid-December. |
| 비밀번호 해독 시간 측정기 (how long a brute force would take, fully local) | tech | 3/3/4/5 = 15 | Useful but dry, with a weak first 10 seconds. Backlog. |
| **빙판길 출근 / Black Ice Commute** | **games** | **5/4/4/5 = 18** | **Picked.** The research suggested a "gentle until you overdo it" tension game. Rushing on ice makes you fall, so the risk is easy to understand. It fits the season: 대설 is 12/7, and every year people post about icy morning commutes. No existing item or queued spec has icy sidewalks or commuting on ice as its subject. thin-ice-puddle is about breaking a puddle, and penguin-huddle is about penguins. |

## Meta

- slug `black-ice-commute`, category `games`, kind `game`, aspect `9/16`, date `2026-11-27`
- tags: ko `빙판길`, `출근`; en `black ice`, `commute`
- title: ko `빙판길 출근`; en `Black Ice Commute`
- desc ko: 꽁꽁 언 출근길, 버스가 떠나기 전에 정류장까지! 꾹 누르면 걷고 빙판에선 미끄러져요. 서두르면 꽈당, 며칠 연속 지각 없이 버틸까요?
- desc en: Hold to walk the frozen sidewalk and catch your bus. Rush on the ice and you slip. How many days in a row can you make it on time?
- howto ko: 화면을 꾹 누르고 있으면(스페이스바도 돼요) 걷고, 떼면 멈춰요. 빙판(파란 반짝이)에선 빨리 걸을수록 몸이 휘청거려요. 머리 위 게이지가 빨개지면 손을 떼서 균형을 잡으세요. 모래 뿌린 구간에선 금방 균형이 돌아와요. 버스가 떠나기 전에 정류장에 닿으면 다음 날로 넘어가요.
- howto en: Hold anywhere (or Space) to walk and let go to stop. On ice (blue shine), the faster you go the more you wobble. When the gauge over your head turns red, let go to steady yourself. Sanded patches restore balance fast. Reach the stop before the bus leaves to move on to the next day.
- about ko: 사흘째부터는 거의 안 보이는 블랙아이스가 섞여 나와요. 진짜 빙판길에선 주머니에서 손을 빼고 보폭을 줄여 천천히 걸어요.
- about en: From day 3, nearly invisible black ice appears. On a real icy sidewalk, take your hands out of your pockets and walk slowly with short steps.

## Pitch

It is a blue winter dawn: apartment silhouettes, streetlights still on, and light snow falling. A round office worker in a long navy padded coat and red scarf has to reach the bus stop before the countdown ends.

1. Press and hold to walk faster and faster. Let go to slow down.
2. On ice, you keep sliding after you let go, and your balance drifts more the faster you go. Holding too long means 꽈당: stars, about 1.4 s lost, and back on your feet.
3. Catch the bus and the next weekday begins, with more ice, a longer distance and less spare time. From day 3, black ice is barely visible.
4. When the bus leaves without you, the game ends. Your score is the number of days you got to work on time.

The game is about balancing being late against falling, which suits a one-thumb game that people can share as a screenshot.

## Flow

1. **START**
   - Shows the title, the character idling and shivering, and a one-line how-to.
   - A big "꾹 눌러서 출발" button, the best score ("최고 기록: N일") and a mute toggle at the top right.
   - Snow falls in the background.
   - A tap starts the game. The hold that starts the game must be released before walking can begin (`needRelease` flag).
2. **DAY INTRO** (0.9 s, no input)
   - A card shows "월요일 출근" / "Monday commute", the day number, the distance and the bus time.
   - Weekdays cycle 월→금. After Friday, a 0.9 s "주말 휴식! ☕" card plays, then Monday comes back as week 2.
3. **PLAY**
   - The top HUD shows the day label, a progress bar (person icon → bus stop icon), a bus countdown "🚌 12.3초" (red and pulsing under 5 s) and the number of falls today.
   - The world scrolls with the player kept at 30% of the width from the left.
4. **ARRIVE** (1.2 s)
   - The bus rolls in from the right, the player hops on, and "탑승 성공!" pops up together with the spare seconds ("+3.4초 여유").
   - Then the next DAY INTRO.
5. **MISSED**
   - The bus drives off from the stop while the player is still walking, and "버스가 떠났어요…" appears.
   - After 1.0 s, GAME OVER.
6. **GAME OVER**
   - Shows the days survived (big), the best score with a "신기록!" badge if beaten, the rank title, total falls and total distance.
   - A big "다시 출근하기" button.
   - Input is ignored for 400 ms, so a hold that is still down cannot restart immediately.

## Controls

- **Pointer:** a pointerdown anywhere on the play area means holding. pointerup, pointercancel, pointerleave and window `blur` all mean released. Several pointers count as one hold (keep a set of active pointer ids).
- **Keyboard:**
  - Space, ArrowRight or W held means holding. Ignore key autorepeat for state changes.
  - Enter or Space on START and GAME OVER presses the main button.
  - M toggles sound.
  - Call `preventDefault` on Space and the arrow keys.
- **Touch and layout:** the canvas has `touch-action:none` and `preventDefault` on touch. Buttons are at least 56 px tall, and the mute toggle is 44×44.

## Gameplay rules and tuning

The world is measured in meters. The camera converts with pxPerM = canvasHeight / 14, so the view shows about 8 m across on a phone.

**Stage for day n (1-based):**

- Distance: D = min(60 + 10(n−1), 130) m.
- Time limit: T = D / min(2.3 + 0.07(n−1), 3.0) + 1.5 s.
- Share of the track covered by ice: min(0.20 + 0.05(n−1), 0.60).
- Black ice: from n ≥ 3, each ice patch has a probability of min(0.15 + 0.07(n−3), 0.5) of being black ice, drawn at alpha 0.18 with a faint sheen once every 2 s.

**Track generation** (per day, `Math.random`):

- Walk forward from 6 m to D − 5 m. The first 6 m and the last 5 m are always dry, and the stop zone is always sanded.
- Place ice patches 3–9 m long with dry gaps of at least 1.5 m, until the target coverage is reached.
- Place one sand patch about every 25 m: 2 m long, centered inside a random ice patch longer than 5 m, so it forms a safe island.

**Movement** (dt capped at 50 ms):

| Surface | accel when holding | decel when released | vmax |
|---|---|---|---|
| dry | 2.6 m/s² | 7.0 m/s² | 4.0 m/s |
| ice / black ice | 1.4 m/s² | 0.7 m/s² (slide) | 4.0 m/s |
| sand | 2.6 m/s² | 7.0 m/s² | 3.2 m/s |

**Balance θ** runs from −1 to 1; it is 0 when upright.

- On ice, θ += (rnd(−1,1) · 1.1 · v + sign(θ) · 1.7 · v · |θ|) · dt. Instability grows with speed and with the lean you already have.
- If v < 0.6 on ice, θ also moves toward 0 at 1.0/s.
- On dry ground, θ moves toward 0 at 2.5/s. On sand, it moves toward 0 at 4.5/s.
- |θ| ≥ 0.6 counts as a wobble: the gauge turns red, the arms flail, and a "휘청!" bubble appears at most once per 1.5 s.
- |θ| ≥ 1 is a FALL:
  - v = 0, θ = 0, and the player lies down for 1.4 s while the countdown keeps running. Input is ignored while down.
  - 5 star particles, a 6 px screen shake for 150 ms, `navigator.vibrate?.(40)` inside a try block, and a "꽈당!" pop.
  - Increment fallsToday and fallsTotal.

**Arrival and loss:**

- Arrival happens when x ≥ D before the time runs out. Any spare time is shown only and does not carry over.
- A loss happens when the time reaches 0 while x < D.
- Score = days completed.

**Rank titles (by days):**

| days | ko | en | emoji |
|---|---|---|---|
| 0 | 이불 밖은 위험해 | Blanket Is Safer | 🛏️ |
| 1–2 | 빙판 새내기 | Ice Rookie | 🧊 |
| 3–4 | 펭귄 걸음 수련생 | Penguin-Walk Trainee | 🐧 |
| 5–9 | 정시 출근 장인 | On-Time Artisan | ⏰ |
| ≥10 | 블랙아이스 마스터 | Black Ice Master | 🏆 |

Hidden title: if the player completes at least 5 days with 0 falls in total, show "미끄럼 면역 / Slip-Proof" 🌟 instead.

## Visual design

- **Palette:**
  - sky gradient from #1b2a4a to #4a6a9a near the horizon
  - apartment silhouettes #142038 with a few warm windows #ffd27a
  - pavement #c9d2dc, curb #8794a3, snow banks #f4f7fb
  - ice #9fd8ff at alpha 0.55 with a white sheen line; sand #c9a46b dots over the pavement
  - coat #2d3a6b, scarf #e0453d, skin #f6d2b4
- **Character:** drawn on the canvas from simple shapes: a capsule body, a round head, a scarf whose tail flutters with v, short legs swinging at a step frequency proportional to v, and a small bag.
  - The whole body rotates by θ · 22°.
  - While wobbling, the arms rise and wave.
  - On a fall, the body lies at 90° and three stars orbit the head.
- **Balance gauge:** an arc above the head showing |θ|, green below 0.4, yellow below 0.6 and red otherwise. It is hidden when θ ≈ 0 off the ice.
- **Bus stop:** a pole with a sign reading "출근 정류장 / Work Stop" and a small shelter.
- **Bus:** a rounded rectangle in the accent green #3aa676 with "하루" on the side. No real route number or company.
- **Parallax:** two background layers (buildings at 0.2×, streetlights at 0.5×). About 60 snow particles, or 20 with `prefers-reduced-motion`.
- **Speed feedback:** footstep puffs on dry ground and a white spray line when sliding on ice.
- **HUD:** system-ui, 16 px, with a rounded dark translucent bar at the top. On a 320 px width the layout stays readable: the day label shortens to "D3 수", and the timer is never hidden.
- **Canvas:** DPR capped at 2. Layout is recomputed on `resize`. The page never scrolls (`100dvh`, `overflow:hidden`).
- **prefers-reduced-motion:** no screen shake, no parallax, fewer snow particles and no stars orbiting the head.

## Sound (Web Audio, synthesized, only after the first gesture)

- Step: a 30 ms noise burst through a lowpass at 800 Hz, gain 0.05, once per step.
- Slide: a looping noise through a bandpass at about 3 kHz, gain 0.03 × (v/4), only while on ice with v > 0.8.
- Fall: an 80 ms sine at 110 Hz falling to 60 Hz, gain 0.15.
- Wobble: a short 600→900 Hz chirp, gain 0.04.
- Arrival: a two-tone bus beep at 660 Hz then 880 Hz, 120 ms each, gain 0.08.
- Missed bus: a 0.6 s descending tone from 440 to 220 Hz.
- The mute toggle 🔊/🔇 is persisted. Sound defaults to on, but nothing plays before the first gesture.

## Strings

| key | ko | en |
|---|---|---|
| appTitle | 빙판길 출근 | Black Ice Commute |
| startSub | 꾹 누르면 걷고, 떼면 멈춰요. 빙판에서 서두르면 꽈당! | Hold to walk, release to stop. Rush on ice and you slip! |
| startBtn | 꾹 눌러서 출발 | Hold to start |
| best | 최고 기록: {n}일 | Best: {n} days |
| days | 월요일 / 화요일 / 수요일 / 목요일 / 금요일 | Monday / Tuesday / Wednesday / Thursday / Friday |
| daysShort | 월 / 화 / 수 / 목 / 금 | Mon / Tue / Wed / Thu / Fri |
| dayIntro | {day} 출근 | {day} commute |
| dayInfo | {n}일째 · {d}m · 버스까지 {t}초 | Day {n} · {d} m · bus in {t} s |
| weekend | 주말 휴식! ☕ | Weekend break! ☕ |
| weekLabel | {w}주차 | Week {w} |
| busTimer | 🚌 {t}초 | 🚌 {t}s |
| fallsHud | 꽈당 {n} | Falls {n} |
| wobble | 휘청! | Whoa! |
| fall | 꽈당! | Oops! |
| blackIce | 블랙아이스 주의! | Watch for black ice! |
| sand | 모래 구간 | Sanded |
| stopSign | 출근 정류장 | Work Stop |
| boarded | 탑승 성공! | Made it! |
| spare | +{t}초 여유 | +{t}s to spare |
| missed | 버스가 떠났어요… | The bus left without you… |
| overTitle | 지각입니다 | You're late |
| overDays | {n}일 연속 정시 출근 | {n} days on time in a row |
| newBest | 신기록! | New best! |
| statFalls | 총 꽈당 {n}번 | Total falls: {n} |
| statDist | 걸은 거리 {d}m | Distance walked: {d} m |
| retry | 다시 출근하기 | Commute again |
| soundOn / soundOff | 소리 켜기 / 소리 끄기 | Sound on / Sound off |
| rank0..rank4, rankHidden | (see Rank titles table) | (see Rank titles table) |

`blackIce` shows once as a toast at the start of day 3.

## localStorage (in try/catch, prefix `bic:`)

- `bic:best`: the best number of days (integer)
- `bic:sound`: "1" or "0", default "1"
- `bic:plays`: the number of runs started (not shown in the UI)

## Edge cases

- If the start tap is still held when PLAY begins, the player does not walk until a release (`needRelease`).
- Holding during DAY INTRO, ARRIVE or while down has no effect. If the hold is still down when control returns, walking resumes; that is intended.
- `blur`, `pointercancel`, or a pointer leaving the window releases the hold, so the player never walks forever.
- When `document.hidden`, pause the loop and the countdown and stop the slide sound. On return, show a 1 s "계속" overlay, then resume with dt reset.
- Resize during play keeps the world state in meters and only recomputes pxPerM and the camera. Never regenerate the track.
- If a fall happens exactly as the time hits 0, the loss wins and goes straight to MISSED.
- If you arrive while sliding past D, it still counts as boarding. Clamp x to D.
- Retry fully resets the day counter, weekday, falls, distance, track and particles. It keeps the sound setting and best score.
- When localStorage is blocked, everything works, and the best score lasts only for the session.
- If `location.hash === '#demo'`, skip START and begin day 3 (Wednesday) at x = 22 m on an ice patch with v = 2.8 and θ = 0.55, a fixed seed track and 9.0 s left. Freeze the countdown, so the QA thumbnail shows the wobble gauge, ice and HUD.

## Must not

- No network of any kind: no external fonts, images or audio. Everything is drawn on the canvas or with CSS.
- No raster images (this is a game item).
- No real bus companies, route numbers, city names, brands or real people. Do not imitate any existing game's character or look.
- Falls are cartoony: stars only, with no blood, injury, ambulance or pain sounds.
- Do not mock bosses, workplaces, professions or regions. The joke is about the commute and the weather.
- No real safety claims beyond the one gentle tip in `about`.
- No alert, confirm, prompt, window.open or navigation, and no sound before a user gesture.
