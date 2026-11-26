# Idea and spec: 가래떡 썰기 / Rice Cake Slice Rush

## Concepts scored

Each concept is scored 1–5 on four things: value in the first 10 seconds, originality, Korean search and share demand, and buildability in one HTML file. The maximum is 20.

The three directions in today's research are already queued: `page-smash`, `new-year-fortune-2027` and `card-deduction-calculator-2026`. 곶감 is close to the queued `persimmon-breeze`. So all three concepts below use new subjects.

| Concept | Category | Score | Verdict |
|---|---|---|---|
| 2027 달력 만들기: a printable monthly calendar with holidays, saved as an image | tools | 3/2/5/5 = 15 | Search demand is very high in December. The 2027 holiday data overlaps `annual-leave-bridge`, and the lunar-holiday dates need checking. Keep it for mid-December. |
| 전기장판 명당 사수: keep the warm spot on the electric blanket while the family and the cat keep stealing it | weird | 4/4/3/4 = 15 | It's funny, but it's close in feel to the queued `heater-electric-bill` and the winter-at-home items. Keep it for later. |
| **가래떡 썰기: slice the moving rice-cake log to the right thickness and fill 떡국 bowls** | **games** | **5/4/4/5 = 18** | **Picked.** The one-tap timing works in the first second. The 새해 떡국 "한 살 더 먹기" joke gives a shareable result line, and the subject (가래떡, 떡국) isn't used by any existing or queued item. |

## Meta

- slug `garaetteok-slicer`, category `games`, kind `game`, aspect `9/16`, date `2026-11-27`
- tags: ko `떡국`, `가래떡`, `새해`; en `rice-cake`, `new-year`
- title: ko `가래떡 썰기`; en `Rice Cake Slice Rush`
- desc ko: 밀려오는 가래떡을 딱 맞는 두께로 썰어 떡국 그릇을 채우세요. 너무 두껍거나 얇으면 떡이 망가져요. 몇 그릇 먹고 몇 살 더 먹을 수 있을까요?
- desc en: A long rice-cake log slides under your knife. Tap to slice it at just the right thickness and fill bowls of New Year soup. How many years older will you get?
- howto ko: 화면 아무 곳이나 탭하거나 스페이스바를 누르면 칼이 내려와요. 떡이 알맞은 두께만큼 지나갔을 때 썰면 '완벽!'이에요. 너무 두껍거나 얇게 썰면 떡 하나를 잃고, 3개를 다 잃으면 끝나요. 잘 썬 떡 10개가 모이면 떡국 한 그릇이 돼요.
- howto en: Tap anywhere or press Space to bring the knife down. Slice when the log has moved just the right thickness past the blade for a Perfect. A slice that is too thick or too thin costs a life, and the game ends after 3. Every 10 good slices fill one bowl of soup.
- about ko: 새해 아침에 떡국을 먹으면 한 살 더 먹는다는 말이 있죠. 게임 속 나이는 재미로만 세어요. 비스듬히 썰면 떡이 동글동글 타원 모양이 돼요.
- about en: In Korea, people joke that eating a bowl of tteokguk on New Year's morning makes you one year older. The ages here are just for fun. Cutting at a slant is what gives the slices their oval shape.

## Pitch

A warm kitchen at night has a wooden cutting board across the middle of the screen. A long, soft white 가래떡 log slides in from the right. A cartoon cleaver hangs over a fixed blade line.

1. The player taps, and the knife chops down at a slant.
2. The piece that has passed the blade line drops off as an oval slice and tumbles into a 떡국 bowl at the bottom left.
3. The goal is even slices. The thickness is exactly how far the log moved since the last cut, so the game is pure rhythm and timing.
4. Good slices fill the bowl. Every full bowl pops "+1살 🎍".
5. The log speeds up as the combo grows. Three ruined slices end the game.
6. The result screen says how many bowls the player ate and how many years older they got.

## Flow

1. **START**
   - The title, a one-line how-to and the best score with best bowls.
   - A big pulsing "탭해서 시작" button.
   - A log idles on the board and the knife bobs gently.
   - The mute toggle is at the top right.
2. **PLAY**
   - The HUD has three parts:
     - top left: score
     - top center: combo (shown only when it's 3 or more)
     - top right: 3 rice-cake life icons, then the mute toggle
   - The bowl sits at the bottom left with its fill level. A "그릇 {n}" counter sits next to it.
   - **Tutorial:** a faint dashed guide line marks the ideal cut point for the first 5 slices of each run only. Then it fades out over 0.5 s.
   - **Log change:** when a log runs out, the stub left over (shorter than T) slides off to the left as scrap and isn't scored. After a 0.6 s pause a new log slides in. Tapping during this gap does nothing.
3. **PAUSE**
   - Shown when the page is hidden, or when the player presses P or Escape.
   - A dim overlay shows "일시정지 · 탭해서 계속".
   - The loop is fully stopped while paused.
4. **GAME OVER**
   - When the third life is lost, the knife freezes and the screen shakes 6 px for 200 ms. After 700 ms the result card slides up.
   - The card shows:
     - the score, big, with "최고 기록!" flashing when it beats the best
     - the best score
     - counts: 완벽 / 좋아 / 망침
     - the bowl line "떡국 {b}그릇 → {b}살 더 먹었어요"
     - a tier title by bowls
   - Buttons: a big [다시 하기], plus [결과 복사].

## Core rules (logical units: the board is 360 u wide; scale = min(w/360, h/640))

- **Blade line:** x = 150 u. The log moves left at speed v (u/s). It starts with its front end at the blade line.
- **Thickness of a cut:** t = distance the log moved since the last cut, or since the log started.
- **Target:** T = 22 u.
- **Grades:**
  - `|t − T| ≤ 3` → 완벽 / Perfect
  - `≤ 7` → 좋아 / Good
  - otherwise → too thin (`t < T`) or too thick (`t > T`), which loses one life
- **Auto-ruin:** if t reaches 2.3 T without a cut, the knife chops by itself and the slice counts as too thick. This stops the player from idling.
- **Knife lockout:** 90 ms after each chop, for the animation. Taps during the lockout are ignored and don't count as cuts.
- **Speed:**
  - v starts at 46.
  - Each Perfect adds 3 and each Good adds 1.5, up to a cap of 115.
  - A ruined slice takes off 8, down to a floor of 46.
- **Logs:** each log is 330 u long, which is about 15 slices.
- **Score:**
  - Perfect = 100 × mult, Good = 40 × mult, ruined = 0.
  - mult = 1 + 0.5 × floor(combo / 5), with a cap of 3.
  - Combo goes up by 1 on Perfect or Good and resets to 0 on a ruined slice.
- **Bowls:** every 10 Perfect or Good slices fill one bowl. Each full bowl pops "+1살 🎍" with a chime, then the bowl empties and starts filling again.
- Time is counted only for stats. There is no timer.

## Tier titles (by bowls)

| bowls | ko | en | emoji |
|---|---|---|---|
| 0 | 떡국은 다음 기회에 | Soup Next Time | 🥢 |
| 1–2 | 떡국 입문자 | Soup Beginner | 🥣 |
| 3–5 | 동네 떡집 수습생 | Rice Cake Shop Trainee | 🍡 |
| 6–9 | 칼질 장인 | Knife Master | 🔪 |
| ≥10 | 떡국 백 그릇의 전설 | Legend of a Hundred Bowls | 🎍 |

A hidden extra appears when a run has 15 Perfects in a row: the result shows the badge "자로 잰 듯 / Ruler-Straight" 📏.

## Controls

- **Pointer:** `pointerdown` anywhere on the play canvas chops. On START, a tap starts the game. On GAME OVER, only the buttons react, so a frantic last tap can't restart by accident.
  - Ignore all input for 400 ms after the GAME OVER card appears.
- **Keys:**
  - Space, Enter or ArrowDown chops during PLAY and starts from START.
  - On GAME OVER, R or Enter retries and C copies.
  - P or Escape pauses and resumes.
  - M toggles sound.
  - Call `preventDefault` on all of these keys.
- **Touch:** the canvas has `touch-action:none`. No double-tap zoom, no page scroll. Buttons are at least 48 px tall.

## Visual design

- **Palette:**
  - background: a gradient from #2b2230 to #3d2f3a, a warm night kitchen
  - board #d9a066 with a darker grain #b97f45
  - rice cake #fbf7ee, with a cut face of #f3ecdc and a soft edge shadow
  - broth #e9d7a8, bowl #3a5a8c with a white rim
  - accents: Perfect gold #ffc94a, Good mint #6fd3a5, ruined coral #ff6b5e
- **Log:** a rounded rectangle 28 u tall with a subtle highlight stripe. Its front end shows the slanted oval cut face.
- **Knife:** a gray cleaver (#c9ced6) with a dark wooden handle, drawn with canvas paths.
  - It drops at −20° in 60 ms and rises in 120 ms.
  - A short white streak flashes on each chop.
- **Slices:**
  - A cut slice becomes an ellipse with radii (t × 0.9, 14) u. It tumbles along a parabolic arc into the bowl and settles onto the soup surface.
  - Too thick: an awkward chunky ellipse that bounces off the rim onto the board, plus a "두꺼워!" label.
  - Too thin: a paper-thin sliver that flutters down, plus "얇아!".
- **Feedback:**
  - Floating text "완벽!" or "좋아!" in its accent color, scaling from 1.4 to 1 and fading over 500 ms.
  - 6–10 white flour particles per chop.
  - A 4 px shake for 120 ms on a ruined slice, and the life icon cracks.
  - Bowl full: steam curls and "+1살 🎍" pops above the bowl.
- **Small screens:** at 320 px wide the HUD text is 14 px minimum and nothing is cropped. The board stays fully visible.
- **Wide screens:** the board, log and bowl stay in a centered 360 × 640 logical frame. The background gradient fills the whole window.
- **Canvas:** high-DPI with DPR capped at 2. Recompute on `resize` and redraw from state without resetting the run.
- **prefers-reduced-motion:**
  - no shake and no knife streak
  - slices fade straight into the bowl instead of arcing
  - particles drop to 3
  - text pops don't scale

## Sound (off by default; Web Audio only after a gesture; setting persisted)

- **Chop:** a 30 ms noise burst through a bandpass at 2.5 kHz, gain 0.06, followed by a soft 120 Hz thud lasting 60 ms.
- **Perfect:** a short sine ping at 880 Hz lasting 90 ms, gain 0.05. Raise the pitch one semitone per 5 combo, up to +6.
- **Ruined:** a 150 ms downward sine slide from 300 to 180 Hz, gain 0.06.
- **Bowl full:** a 3-note chime (C6, E6, G6), 80 ms each.
- **Game over:** 2 low notes.

## Strings

| key | ko | en |
|---|---|---|
| appTitle | 가래떡 썰기 | Rice Cake Slice Rush |
| startSub | 딱 맞는 두께로 썰어 떡국을 채워요 | Slice it just right and fill the soup bowls |
| startBtn | 탭해서 시작 | Tap to start |
| bestLine | 최고 {s}점 · 떡국 {b}그릇 | Best {s} · {b} bowls |
| soundOn / soundOff | 소리 켜기 / 소리 끄기 | Sound on / Sound off |
| score | 점수 | Score |
| combo | {n} 콤보 | {n} combo |
| bowls | 그릇 {n} | Bowls {n} |
| perfect / good | 완벽! / 좋아! | Perfect! / Good! |
| thick / thin | 두꺼워! / 얇아! | Too thick! / Too thin! |
| plusAge | +1살 🎍 | +1 year 🎍 |
| newLog | 새 가래떡 등장! | Fresh log! |
| paused | 일시정지 · 탭해서 계속 | Paused · tap to resume |
| overTitle | 오늘의 칼질 끝! | Knife down! |
| newBest | 최고 기록! | New best! |
| best | 최고 기록 | Best |
| stats | 완벽 {p} · 좋아 {g} · 망침 {r} | Perfect {p} · Good {g} · Ruined {r} |
| ageLine | 떡국 {b}그릇 → {b}살 더 먹었어요 | {b} bowls → {b} years older |
| badgeRuler | 📏 자로 잰 듯 | 📏 Ruler-Straight |
| retry / copy | 다시 하기 / 결과 복사 | Play again / Copy result |
| copied / copyFail | 복사했어요 / 복사하지 못했어요 | Copied / Could not copy |
| share | 🍲 가래떡 썰기 {s}점! 떡국 {b}그릇 먹고 {b}살 더 먹었어요 ({title}) play.mesisi.net | 🍲 Rice Cake Slice Rush: {s} points! {b} bowls, {b} years older ({title}) play.mesisi.net |

Tier titles are listed in the tier table above.

## localStorage (in try/catch, prefix `grt:`)

- `grt:best`: best score (integer)
- `grt:bestBowls`: best bowls (integer)
- `grt:sound`: "1" or "0", default "0"
- `grt:plays`: run count (not shown in the UI)

If storage is blocked, the game still runs and the best score lives in memory only.

## Edge cases

- **Restart:** fully resets score, combo, speed, lives, bowls, stats, the tutorial guide, the current log and all particles. It keeps the sound setting.
- **Hidden tab:** PLAY switches to PAUSE automatically. dt is capped at 50 ms, so the log never jumps on resume. Resume needs a tap or a key.
- **Resize mid-run:** recompute the scale and redraw. The log position is in logical units, so the game state doesn't change.
- **Multi-touch:** only the first pointerdown per frame counts. A second finger in the same frame is ignored.
- **Taps during the log-change gap or the knife lockout:** ignored, with no penalty.
- **Auto-ruin on the last life:** goes to GAME OVER the same way as a manual cut.
- **Score overflow:** not a real concern. Use `toLocaleString` with the current language for display.
- **Copy:** use `navigator.clipboard.writeText`, falling back to a hidden textarea and `execCommand('copy')`. Show a toast on success or failure.
- **`location.hash === '#demo'`** (for QA thumbnails only): skip START and run PLAY with an autopilot that cuts at exactly T and never loses. Start with 2 bowls already filled and combo 7, so the thumbnail shows the bowl, the HUD and a "완벽!" pop. Never save the best score in demo mode.

## Must not

- No network of any kind, no raster images and no video. Draw everything with canvas, CSS or emoji. Keep it under 120 KB.
- No fingers, hands, blood or injury near the knife. A ruined slice is just a funny-shaped rice cake.
- No real rice-cake shop, brand, store or person. Don't imitate the look of any existing fruit-slicing or cutting game, and no swipe-trail slicing aesthetic.
- No mocking of age, ageing or any group. The "한 살 더" line is a gentle folk joke about the soup, not about anyone.
- No diet, health or calorie talk, no alcohol, and no gambling or penalty-game angle.
- No alert, confirm, prompt, window.open or navigation. No sound autoplay. The page never scrolls.
