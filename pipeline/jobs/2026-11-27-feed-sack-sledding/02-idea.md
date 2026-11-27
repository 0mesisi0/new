# Idea and spec: 비료포대 눈썰매 / Feed-Sack Sledding

Agent: Claude (opus), planner. Design notes are merged in (palette, layout, motion).

## Concepts scored

Each concept is scored 1–5 on four things: value in the first 10 seconds, originality, Korean search/share demand, and buildability in one HTML file. The maximum is 20.

| Concept | Category | Score | Verdict |
|---|---|---|---|
| 월세 세액공제 계산기 2026 (monthly-rent tax credit, research row 8) | tools | 3/3/5/4 = 15 | Search demand is strong, but the 2026 rules come from one low-confidence blog post. The site also already has a pension calculator and a queued card-deduction calculator. Revisit it in January with National Tax Service sources. |
| 곶감 말장난 생성기 (dried-persimmon pun gacha, research row 1) | random | 4/3/2/5 = 14 | The trend's year is low confidence, and it is too close to the queued `persimmon-breeze` specs (same persimmon subject). Skip it. |
| **비료포대 눈썰매 / Feed-Sack Sledding** | **games** | **5/4/4/5 = 18** | **Picked.** It is a new subject: no item or queued spec covers sledding or 눈썰매장. Sliding down a hill on a plastic feed sack is a well-loved Korean childhood memory with strong share appeal. One-tap play is fun within seconds, and a "today's course" seed gives friends the same hill to compare scores on. |

## Meta

- slug `feed-sack-sledding`, category `games`, kind `game`, aspect `9/16`, date `2026-11-27`
- tags: ko `눈썰매`, `비료포대`; en `sledding`, `winter`
- title: ko `비료포대 눈썰매`; en `Feed-Sack Sledding`
- desc ko: 비료포대 하나 깔고 동네 뒷산을 끝없이 내려가요. 탭으로 점프하고 꾹 눌러 공중제비를 돌아, 귤도 줍고 눈사람은 피하세요. 오늘의 코스는 모두 똑같아요!
- desc en: Slide down an endless snowy hill on an old feed sack. Tap to jump, hold to flip, grab tangerines and dodge snowmen. Everyone gets the same course today.
- howto ko: 화면을 탭하거나 스페이스를 누르면 점프해요. 공중에서 꾹 누르고 있으면 뒤로 한 바퀴 돌아요. 썰매 바닥이 비탈과 나란할 때 착지하면 보너스와 가속을 받아요. 바위나 눈사람에 부딪히거나 거꾸로 떨어지면 끝나요.
- howto en: Tap or press Space to jump. Hold in the air to backflip. Land with the sled roughly parallel to the slope for a bonus and a speed boost. Hitting a rock or a snowman, or landing upside down, ends the run.
- about ko: 겨울마다 비료포대 하나로 뒷산을 내려가던 기억에서 시작했어요. 코스는 날짜로 정해져서 오늘 하루 동안 모두가 같은 언덕을 타요. 내일은 새 언덕이에요.
- about en: Inspired by the Korean winter memory of sliding down a hill on an empty feed sack. The course is seeded by the date, so everyone rides the same hill today, and tomorrow brings a new one.

## Pitch

A side view of a soft blue-white hillside at dusk, with a child-like rider in a puffy jacket sitting on a striped white sack.

1. Tap once and the rider starts sliding. Downhills speed you up and uphills slow you down.
2. Tap to hop over rocks and snowmen. Hold in the air to spin into a backflip.
3. A clean landing gives "착지 성공!", a speed burst and bonus points. A bad landing gives a comic tumble, with the sack flying off on its own.
4. Score = distance (m) + tangerines × 10 + trick bonus.
5. The course is seeded by today's date, which makes the share line work: "오늘 코스 1,240m 갔다".

## Flow

1. **START**
   - Shows the title, a "오늘의 코스 11.27" chip, a one-line how-to, today's best and the all-time best.
   - A big "탭해서 출발" prompt. The rider idles at the hilltop, and snow falls.
   - A mute toggle sits at the top right.
2. **PLAY**
   - The camera follows the rider, who stays at 30% of the screen width from the left.
   - HUD:
     - top left: the distance in m
     - top center: 🍊 count
     - top right: the mute toggle
   - Trick popups ("1바퀴! +50", "착지 성공!") float up from the rider and fade out over 700 ms.
3. **CRASH**
   - The rider tumbles and the sack flies forward.
   - Snow particles burst, the screen shakes 6 px for 250 ms, and time slows to 0.4× for 400 ms.
   - Then switch to GAME OVER after 700 ms in total.
4. **GAME OVER**
   - A card slides up showing:
     - the distance, 🍊, the trick bonus and the score (counting up over 600 ms)
     - a "NEW!" badge if today's best or the all-time best was beaten
     - the crash reason
   - Buttons: [다시 타기] (big, primary) and [결과 복사].
   - Input is ignored for 500 ms after the card appears, so a held tap cannot restart by accident.

## Controls

- **Pointer:**
  - pointerdown on the play area starts the run (on START) or jumps (when grounded).
  - Holding while airborne rotates the sled backward.
  - pointerup or pointercancel stops the rotation.
  - Only the first active pointer counts; extra touches are ignored.
- **Keys:**
  - Space, ArrowUp, W or Enter: start, jump or hold-to-flip, the same as the pointer.
  - On GAME OVER: R or Enter retries and C copies the result.
  - M toggles sound.
  - `preventDefault` on all of these keys.
- **Assists:**
  - Jump buffer of 120 ms: a press shortly before landing jumps on touchdown.
  - Coyote time of 100 ms after leaving the ground by sliding off a crest.
- **Touch and layout:** the canvas has `touch-action:none`, and buttons are at least 48 px tall.

## World and physics

All values are in world units (wu). The render scale is `s = min(H/640, W/360)` in CSS px, then multiplied by the DPR, which is capped at 2. Wide screens simply see more hill ahead.

### Terrain

- **Shape:**
  - The terrain is a chain of segments. Each segment has a length L in [260, 560] wu and a height change dy in [−110, +240] wu (positive = downhill), so the hill drops overall.
  - Interpolate each segment with a cosine: `y = y0 + dy·(1−cos(πt))/2`.
  - Reject any segment whose maximum slope `|π·dy/(2L)|` is above 0.85, and draw again.
  - The first 600 wu is a gentle downhill start ramp with dy = +120 and no obstacles.
- **Seeding:**
  - seed = FNV-1a 32-bit of the local date `YYYY-MM-DD`, and the PRNG is mulberry32.
  - Draw in this fixed order per segment: L, dy, obstacle roll, tangerine roll.
  - This makes the course identical for every player and every retry on the same day.
- **Generation window:**
  - Generate at least 1.5 screen widths ahead.
  - Drop segments that are more than 1 screen width behind.
  - Every 20,000 wu, rebase x and y by subtracting an offset from everything, to avoid float drift. The distance counter keeps the true value.

### Obstacles

- Each segment after the start ramp gets one obstacle with probability `p = min(0.35 + dist_m/4000, 0.75)`.
- Place it at a random t in [0.3, 0.7] of the segment, on the ground.
- Keep at least 320 wu between obstacles. If that fails, skip the obstacle.
- Kinds, drawn with canvas shapes, never images:
  - 🪨 a rock: a gray rounded blob, hit circle r = 18
  - ⛄ a snowman: two white circles with coal dots and a small red scarf, hit circle r = 22 centered 26 wu above the ground
  - a log: brown, low and long, hit capsule 40×12
- The obstacle mix shifts from rocks toward snowmen and logs with distance.

### Tangerines

- 45% of segments get an arc of 3–5 🍊.
- The arc floats 50–150 wu above the ground, with a spacing of 36 wu.
- Pickup radius is 20 wu.
- Draw each one as an orange circle with a small green leaf, bobbing ±3 wu.

### Rider

- **Grounded:**
  - θ is the terrain angle at x. Speed v follows `v += (g·sinθ − k·v)·dt`, with g = 900, k = 0.12 and v clamped to [140, 950].
  - Move x by `v·cosθ·dt` and snap y to the ground.
  - The sled visually tilts toward θ with smoothing (lerp 12/s).
- **Crest launch:**
  - If `v²·κ > g·cosθ`, the rider goes airborne with velocity (v·cosθ, v·sinθ).
  - κ is the convex curvature of the terrain, from a finite difference over ±8 wu.
- **Jump:** grounded only. Add an impulse of 430 wu/s along the ground normal (upward) and play the "hop" sound.
- **Airborne:**
  - vy += g·dt; vx stays constant.
  - While held, the rotation φ decreases at 400°/s (backflip). When not held, φ eases toward the velocity angle at 2/s.
  - Accumulated rotation counts as flips every 330° (a forgiving threshold).
- **Landing:**
  - Landing happens when y ≥ ground(x).
  - diff = |angle difference between φ and θ|, wrapped to [0°, 180°].
  - **diff ≤ 40°: clean landing.**
    - new v = max(140, vx·cosθ + vy·sinθ)
    - if flips ≥ 1: bonus 50 × flips (×1.5 for 2+ flips), v ×= 1.15, popup "N바퀴! +X"
    - if diff ≤ 12° and airtime > 0.4 s: popup "착지 성공!", +10
  - **diff > 40°: crash**, with reason `flip`.
- **Collision:**
  - The rider's hit circle has r = 16 at the sled center, plus a head circle r = 10 that is 24 wu above it, along the sled's normal.
  - Touching an obstacle crashes the run, with reason `rock`, `snowman` or `log`.
  - Tangerines are collected in both states.
- **Time step:** dt is capped at 50 ms. Run fixed sub-steps of at most 8 ms, so nothing tunnels at speed 950.

### Score

- dist_m = floor(true distance travelled along x / 20).
- score = dist_m + 🍊 × 10 + trickBonus.

## Screens and visuals

- **Palette:**
  - sky: a gradient from #2b3a67 (top) to #f2b8a2 (horizon, dusk)
  - far hills #9fb3d9 and #c6d4ee (two parallax layers at 0.2 and 0.45)
  - snow ground #f7f9ff with a #d9e2f5 shading band 10 wu below the surface line
  - rider jacket #e0453d, hat #2f6fd6, sack #fbfaf5 with two #3c8d5a stripes
  - tangerine #ff9a1f, rock #7c8290, log #8a5a3b
  - UI text #1d2433 on white cards with a 16 px radius
- **Sack label:** draw "비료" in ko and "FEED" in en in small bold green letters. It is a generic word only: no brand or logo.
- **Rider:**
  - Built from simple canvas shapes: a round head with a beanie, a puffy body and mittens that hold the sack's front edge.
  - While spinning, the rider and the sack rotate together.
  - On a crash, they separate: the rider tumbles with angular velocity and the sack slides ahead.
- **Particles:**
  - A snow spray trail behind the sled while grounded. Its rate is proportional to v.
  - A burst of 24 flakes on a landing or a crash.
  - Background snowfall of 50 particles (20 with `prefers-reduced-motion`).
- **Speed feel:** at v > 700, draw faint horizontal speed lines.
- **START:**
  - The title is 28 px bold with a white text shadow.
  - Below it: the "오늘의 코스 MM.DD" chip, the how-to line, the best scores and a pulsing "탭해서 출발" (the pulse is disabled under reduced motion).
- **GAME OVER card:**
  - Centered, with width min(90vw, 360px).
  - Shows the crash emoji and reason, then rows for 거리 / 귤 / 묘기 / 점수, the bests and the 2 buttons.
- **Small screens:** at 320 px wide, the HUD font is 14 px and the card padding is 16 px. Nothing overflows.
- **prefers-reduced-motion:** no screen shake, no slow motion, no speed lines and fewer particles.

## Sound (off by default, Web Audio, synthesized only)

- **Slide:** looped white noise through a bandpass. The frequency goes from 600 to 1800 Hz with v, and the gain from 0 to 0.05. Mute it while airborne.
- **Hop:** a 90 ms sine sweep from 300 to 520 Hz, gain 0.08.
- **Tangerine:** a 60 ms triangle wave at 880 Hz, then 1320 Hz, gain 0.06.
- **Clean landing:** a soft 120 ms noise "puff", gain 0.08. Flip bonus: add a rising two-note chime.
- **Crash:** a 150 ms sine at 80 Hz with decay plus a noise burst, gain 0.14.
- **Rules:**
  - Create the AudioContext only after the first user gesture.
  - Suspend it when `document.hidden`.
  - Persist the mute setting.

## Strings

| key | ko | en |
|---|---|---|
| appTitle | 비료포대 눈썰매 | Feed-Sack Sledding |
| todayCourse | 오늘의 코스 {mm}.{dd} | Today's course {mm}.{dd} |
| howShort | 탭 = 점프 · 공중에서 꾹 = 공중제비 | Tap = jump · Hold in air = flip |
| tapStart | 탭해서 출발 | Tap to start |
| bestToday | 오늘 최고 {n}점 | Today's best {n} |
| bestAll | 역대 최고 {n}점 | All-time best {n} |
| noBest | 아직 기록이 없어요 | No record yet |
| hudDist | {n}m | {n} m |
| sackLabel | 비료 | FEED |
| flipPop | {n}바퀴! +{x} | {n} flip! +{x} / {n} flips! +{x} |
| cleanPop | 착지 성공! | Clean landing! |
| crashRock | 바위에 쿵! | Bonk! Hit a rock |
| crashSnowman | 눈사람이랑 부딪혔어요 | Crashed into a snowman |
| crashLog | 통나무에 걸렸어요 | Tripped on a log |
| crashFlip | 거꾸로 착지했어요 | Landed upside down |
| overTitle | 데굴데굴… 끝! | Tumble... the end! |
| rowDist / rowTang / rowTrick / rowScore | 거리 / 귤 / 묘기 / 점수 | Distance / Tangerines / Tricks / Score |
| newBest | NEW! | NEW! |
| retry | 다시 타기 | Ride again |
| copy | 결과 복사 | Copy result |
| copied / copyFail | 복사했어요 / 복사하지 못했어요 | Copied / Could not copy |
| soundOn / soundOff | 소리 켜기 / 소리 끄기 | Sound on / Sound off |
| shareText | 🛷 비료포대 눈썰매 {mm}.{dd} 코스 / {dist}m · 🍊{t} · {score}점 / 너도 같은 언덕 타 봐! play.mesisi.net | 🛷 Feed-Sack Sledding, course {mm}.{dd} / {dist} m · 🍊{t} · {score} pts / Same hill for everyone today: play.mesisi.net |

Number formatting: use `toLocaleString` for the current language.

## localStorage (in try/catch, prefix `fss:`)

- `fss:best`: the all-time best score (integer)
- `fss:day`: JSON `{"date":"YYYY-MM-DD","best":n}`. Reset `best` when the date differs from today.
- `fss:sound`: "1" or "0", default "0"
- `fss:runs`: the number of runs (not shown in the UI)

## Edge cases

- **Resize or rotation mid-run:** recompute s and the canvas size, and keep the world state. If the game is in PLAY, pause it briefly for 300 ms behind a "준비 / Ready" overlay.
- **`document.hidden`:** pause the loop and the audio. On return, resume with dt reset (no time jump).
- **Restart:** fully reset the rider, camera, segments (regenerated from today's seed), particles, score, flip state, held state, and the buffer and coyote timers.
- **Midnight during a session:** keep the current course until the run ends. A new run after midnight uses the new date's seed and resets today's best.
- **Held input while landing:** rotation keeps going only while airborne. A hold that continues after landing does not jump again; jumps need a fresh press, apart from the buffer rule.
- **pointercancel or blur:** treat it as a release.
- **Blocked localStorage:** everything still works; bests stay in memory only.
- **Speed limits:** at very high speed, sub-stepping prevents passing through obstacles. Speed never goes above 950.
- **Copy:** use `navigator.clipboard.writeText`, falling back to a hidden textarea and `execCommand('copy')`. Confirm with a toast; never use alert.
- **`location.hash === '#demo'`:** start the run immediately with an autopilot that jumps 140 wu before each obstacle and does one flip on the first big crest. This is for QA thumbnails only, and it never writes to localStorage.

## Must not

- No network of any kind, no raster images, and no fonts other than the system-ui stack.
- Do not copy the name, characters, art, terrain style, music or UI of any existing sledding or hill-sliding game. Use the original rider and sack design described above.
- No real fertilizer or feed brands, logos or packaging designs. The only label is the generic word 비료 / FEED.
- No injuries shown: crashes are a comic tumble with snow puffs, with no blood or pain.
- No real places or ski-resort names.
- No alert, confirm, prompt, window.open or navigation, and no sound autoplay.
