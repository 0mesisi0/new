# Idea and spec: 작심삼일 버티기 / Survive the Three-Day Resolution

## Concepts scored

Each concept is scored 1–5 on four criteria: value in the first 10 seconds, originality, Korean search/share demand, and whether it can be built in one HTML file. The maximum is 20.

| Concept | Category | Score | Verdict |
|---|---|---|---|
| 2027 달력 만들기: pick a month style, see Korean holidays and 24 solar terms, save as image | tools | 4/2/5/4 = 15 | Big December search demand, but it uses the same 2027 holiday data as `annual-leave-bridge` and is not original. Keep it for later. |
| 곶감 말장난 뽑기: a generator for "곧 감 → 곶감" style puns | random | 3/3/2/5 = 13 | The trend is low confidence (no year given, ad newsletter), and the persimmon subject is close to the queued `persimmon-breeze`. Skip it. |
| **작심삼일 버티기**: swat away temptations so your New Year's resolution survives 72 hours | **games** | **5/4/4/4 = 17** | **Picked.** The 2027-01-01 hook is open ("새해 다짐은 비어 있다"). "작심삼일" is a phrase every Korean knows and shares every January. The result title ("작심이틀", "작심삼일 돌파") makes a good screenshot. The subject is the resolution itself, not a fortune, a countdown or sheep. |

## Meta

- slug `three-day-resolution`, category `games`, kind `game`, aspect `9/16`, date `2026-11-27`
- tags: ko `작심삼일`, `새해다짐`; en `new-year-resolution`, `three-days`
- title: ko `작심삼일 버티기`; en `Survive the Three-Day Resolution`
- desc ko: 새해 다짐을 하나 고르고, 몰려오는 유혹을 좌우로 쳐내며 72시간을 버텨 보세요. 작심삼일의 저주를 깰 수 있을까요?
- desc en: Pick a New Year's resolution, then swat temptations left and right to keep it alive for 72 hours. Can you break the three-day curse?
- howto ko: 화면 왼쪽·오른쪽을 탭하면(←/→ 또는 A/D) 그쪽 유혹을 쳐내요. 원 안에 들어왔을 때 쳐야 해요. 💌⭐는 쳐내지 말고 받으면 의지력이 회복돼요. 의지력 🔥이 0이 되면 끝. 버틴 시간이 점수예요.
- howto en: Tap the left or right half of the screen (←/→ or A/D) to swat the temptation on that side. Swat it inside the ring. Let 💌 and ⭐ reach you to restore willpower. When willpower 🔥 hits zero, it's over. Your score is the number of hours you lasted.
- about ko: 72시간은 72초로 압축돼요. 3일을 넘기면 끝없이 이어지니 일주일 기록에도 도전해 보세요. 다짐은 이 기기 밖으로 나가지 않아요.
- about en: 72 hours are squeezed into 72 seconds. Past day 3 the game runs on forever, so go for a full week. Your resolution never leaves this device.

## Pitch

The game opens at 00:00 on January 1 with a burst of fireworks. A small round hero holding a resolution note stands in the middle of a cozy room-and-window scene.

1. The player picks one of 5 resolutions.
2. Temptations slide in from the left and right: snooze alarms, "just one more episode", late-night fried chicken, a sofa calling "lie down for a sec".
3. Tap the matching side when a temptation enters the ring to swat it away with a "안 해!" pop.
4. Let cheer letters 💌 and praise stickers ⭐ through to restore willpower.
5. One in-game hour passes every real second. The sky cycles through night and day, and the game speeds up each day.
6. The night of day 3 brings a boss cloud, "내일부터 하지 뭐", which needs 3 hits.
7. Beat it and you get "작심삼일 돌파!" confetti, then the game keeps going until willpower runs out.
8. The game-over card shows the hours you lasted, a title such as "작심이틀" or "습관이 되었다", and your best score.

## Flow

1. **START**
   - Title, a one-line how-to and 5 resolution chips in a grid (one is selected; the last choice is remembered).
   - A big "다짐하고 시작" button and a mute toggle at the top right.
   - Tapping a chip selects it. The button, Enter or Space starts the game.
2. **COUNTDOWN** (1.2 s)
   - "{year}년 1월 1일 00:00" with 3 small firework bursts.
   - Then "시작!" appears and play begins.
3. **PLAY**
   - The game clock advances 1 in-game hour per real second (delta time, capped at 50 ms).
   - When hour 24 or 48 passes, a "DAY 2" / "DAY 3" banner slides in for 1 s. Play does not pause.
   - At hour 66 the boss spawns (see below).
   - At hour 72, if willpower is above 0: "작심삼일 돌파!" banner, confetti, +1 willpower (max 5). Then endless mode starts.
4. **GAME OVER**
   - Starts when willpower reaches 0. The hero slumps onto the sofa for 0.6 s, then the card slides up.
   - The card shows:
     - the hours lasted as a big number, e.g. "51시간"
     - the in-game date and time where you broke ("1월 3일 03:00에 무너짐")
     - the tier title with its emoji
     - your best score, with a "NEW BEST" ribbon when it is a new record
     - temptations swatted and the best combo
   - Buttons: [다시 다짐하기] (big, primary), [다짐 바꾸기] (back to START) and [결과 복사].

## Controls

- **Pointer:** `pointerdown` on the left half of the play area swats left, and on the right half swats right. Multi-touch is fine; each `pointerdown` is one swat.
- **Keys:** ←/A swats left and →/D swats right. Enter or Space starts or retries. Escape on GAME OVER goes back to START. M toggles sound.
- **Buttons:** on START and GAME OVER, all buttons are at least 48 px tall.
- **Touch and scrolling:** the play area has `touch-action:none`, and `preventDefault` is called on game keys and touches.
- **Swat rule:** a swat hits the temptation on that side that is closest to the hero, if it is inside the hit ring. The ring radius is 0.17 × the shorter side of the play area, measured from the hero center to the temptation center.
- **Whiff:** if nothing is inside the ring on that side, it is a whiff.
  - The hero shows "헛손질" and that side is locked for 0.35 s (that arm is drawn greyed out).
  - The combo resets.
  - This stops players from mashing.
- **Swatting a good item** (💌⭐) breaks it with a sad "앗" sound and resets the combo. Willpower is not lost.

## Entities

Temptations move horizontally along one lane at hero height, toward the hero. Speed is in units of the play-area width W per second.

| emoji | ko line (bubble when it hits) | en line | weight by resolution |
|---|---|---|---|
| ⏰ | 5분만 더… | Five more minutes… | all; ×2 for 일찍 자기 |
| 📺 | 딱 한 편만 더 | Just one more episode | all; ×2 for 일찍 자기, 독서 |
| 📱 | 알림 왔어요! | You've got a notification! | all; ×2 for 독서, 외국어 |
| 🛋️ | 잠깐 누울까? | Lie down for a sec? | all; ×2 for 운동 |
| 🍗 | 야식은 오늘만 | Late-night snack, just today | all; ×2 for 운동 |
| 🛌 | 이불 밖은 추워 | It's cold outside the blanket | all |
| 🛒 | 지금 할인 중! | It's on sale right now! | all; ×2 for 저축 |
| 💌 (good) | 응원 편지 — +1 🔥 | Cheer letter: +1 🔥 | 12% of spawns |
| ⭐ (good) | 칭찬 스티커 — +1 🔥 | Praise sticker: +1 🔥 | 4% of spawns (rare, glows) |

- The base weight is 1. "×2" doubles it for the listed resolutions.
- Good items are chosen first by their percentage. The rest of the spawns are drawn from the weighted temptation list.
- When a temptation reaches the hero (enters a 0.06 × min-side radius):
  - willpower −1
  - the screen shakes 6 px for 150 ms with a red vignette flash
  - its bubble line shows above the hero for 0.9 s
  - the combo resets
- When a good item reaches the hero: willpower +1 (max 5), a gold sparkle, and "+1 🔥".
- When a temptation is swatted:
  - it spins off-screen with particles and a random "안 해!" / "No!" / "다음에!" / "Not today!" pop
  - combo +1
  - every 10th combo gives "의지 불끈!" with a 0.5 s slow-motion effect (time scale 0.6). This is visual only, but it helps a little.

### Boss: 내일부터 하지 뭐 / "I'll Start Tomorrow"

- At hour 66 it spawns once, from a random side: a 💭 cloud 1.8× normal size, moving at 0.6× the current speed.
- It has 3 HP. Each hit knocks it back 0.12 W and flashes it.
- If it reaches the hero, willpower −2.
- While it is on screen, normal spawns pause.
- If the boss is still alive at hour 72, the 72-hour celebration waits until it is resolved.
- When it is defeated: "내일 말고 오늘!" / "Not tomorrow, today!" banner.

## Difficulty curve

Let h be the in-game hour.

| phase | spawn interval | speed (W/s) |
|---|---|---|
| DAY 1 (h < 24) | 1.40 s → 1.15 s, linear | 0.26 |
| DAY 2 (24 ≤ h < 48) | 1.15 s → 0.95 s | 0.31 |
| DAY 3 (48 ≤ h < 72) | 0.95 s → 0.80 s | 0.36 |
| Endless (h ≥ 72) | max(0.45, 0.80 − 0.02 × ⌊(h−72)/6⌋) s | min(0.55, 0.36 + 0.004 × (h−72)) |

- Each spawn picks its side at random. The same side can repeat at most 3 times in a row.
- From DAY 2 on, there is a 15% chance of a "double" spawn: one temptation from each side, 0.15 s apart.
- At least 0.35 s must pass between spawns on the same side.
- Starting willpower is 3 and the maximum is 5. It is shown as 🔥 icons in the HUD.

## Scoring and titles

- The score is the whole number of hours lasted (⌊h⌋).
- The best score is the highest number of hours, stored on the device.

| hours | ko title | en title | emoji |
|---|---|---|---|
| < 6 | 작심 몇 시간 | A Few Hours of Resolve | 🫠 |
| < 12 | 작심반나절 | Half-Day Resolve | 🌗 |
| < 24 | 거의 하루 | Almost a Whole Day | 🕯️ |
| < 48 | 작심이틀 | Two-Day Resolve | ✌️ |
| < 72 | 작심삼일 직전 | So Close to Three Days | 😤 |
| < 120 | 작심삼일 돌파 | Three-Day Curse Broken | 🎉 |
| < 168 | 작심닷새 | Five Days Strong | 💪 |
| ≥ 168 | 습관이 되었다 | It's a Habit Now | 🏆 |

The subline under the title is chosen by tier from the pairs below. It must stay kind and never mock the player.

| ko | en |
|---|---|
| 괜찮아요, 다짐은 언제든 다시 할 수 있어요. | It's fine. You can make a new resolution any time. |
| 반나절이면 시작으로는 충분해요. | Half a day is a fine start. |
| 다음엔 하루를 꽉 채워 봐요. | Next time, go for a full day. |
| 이틀이면 평균은 넘었어요! | Two days already beats most people! |
| 한 끗 차이였어요. 한 번만 더! | So close. One more try! |
| 저주는 깨졌어요. 이제 진짜 시작! | The curse is broken. Now it really begins! |
| 이쯤이면 주변에서 알아봐요. | People are starting to notice. |
| 이제 다짐이 아니라 생활이에요. | It's not a resolution anymore, it's your life. |

## Resolutions

| id | emoji | ko | en |
|---|---|---|---|
| run | 🏃 | 운동하기 | Work out |
| read | 📚 | 책 읽기 | Read more |
| sleep | 🌙 | 일찍 자기 | Sleep early |
| lang | 🗣️ | 외국어 공부 | Learn a language |
| save | 🐷 | 돈 모으기 | Save money |

A resolution only changes the temptation weights, the emoji on the hero's note, and the share text. It has no other gameplay effect.

## Year and clock

- y = the current year + 1 if the current month is October or later, otherwise the current year. On 2026-11-27 this gives 2027.
- The in-game time is Jan 1, 00:00 + h hours. The HUD shows "1월 {d}일 {HH}:00" in ko and "Jan {d}, {HH}:00" in en, plus "DAY {n}" where n = ⌊h/24⌋ + 1.
- The sky color comes from the hour of day (h mod 24):
  - 0–5 night #141a33
  - 6–8 dawn, gradient #3b3f6b → #f2a65a
  - 9–16 day #8fc7ff
  - 17–19 dusk #f08a5d → #5b4a8a
  - 20–23 night
  - Neighboring colors are blended with lerp.
- The window in the background shows the moon or sun moving across, and sparse snow falls at night.

## Screens and visual design

- **Palette:** cream room #fdf3e3, warm wood #c98b5a, ink #2b2540, red-orange willpower #ff6b3d, cheer gold #ffc93c and danger red #e2453c. System-ui font stack.
- **Layout (portrait):**
  - The HUD is at the top: date and time on the left; DAY badge and 🔥×n in the middle; best score and mute toggle on the right.
  - The window and sky take the upper 45%.
  - The lane is at 62% height. The hero is centered, with the hit ring drawn as a dashed circle that pulses when a temptation is inside it.
  - Faint "◀ 탭" and "탭 ▶" hints sit at the bottom of each half. They fade after 5 s or after the first 3 swats.
- **Landscape and desktop:** play-area width = min(100vw, 100dvh × 0.62), centered. The sky gradient fills the side margins.
- **Hero:** a round body drawn on canvas (no character from any existing IP), with a determined face and a headband in the resolution color. It holds a paper note showing the resolution emoji.
  - Its arm swipes toward the swat side for 120 ms.
  - It droops when hit.
  - It cheers at 72 h.
- **Juice:** swat particles (6–10 confetti bits), a combo counter that pops 1.3× on each increase, screen shake on hits, a willpower icon that pulses red when only 1 is left, confetti and a fanfare at 72 h, and small firework bursts at the start.
- **Canvas:** DPR capped at 2. Layout is recomputed on `resize`. Everything must stay readable at 320 × 480.
- **GAME OVER card:**
  - A rounded white card with the date/time line at the top and a big hours number (56 px bold).
  - The title chip with its emoji, then the subline.
  - A stats row: swatted, best combo, best score.
  - A "NEW BEST" ribbon rotated −6° when it is a new record.
  - Buttons stacked below.
- **prefers-reduced-motion:** no screen shake, no slow motion and no firework animation (show static sparkles instead), and confetti limited to 12 pieces. Gameplay speed is unchanged.

## Sound (off by default, Web Audio after the first gesture)

- Swat: a 60 ms noise burst through a bandpass at 1.2 kHz plus a short sine blip that rises from 600 to 900 Hz, gain 0.08.
- Hit: an 80 ms triangle wave falling from 220 to 110 Hz, gain 0.12.
- Good item: two sine notes, 880 then 1320 Hz, 70 ms each, gain 0.06.
- Whiff: a 40 ms soft low thud at 140 Hz, gain 0.05.
- 72-hour fanfare: an ascending triad C5–E5–G5–C6, square wave softened by a lowpass, 110 ms per note.
- Game over: a descending G4–E4–C4 sine.
- The mute setting is persisted.

## Strings

| key | ko | en |
|---|---|---|
| appTitle | 작심삼일 버티기 | Survive the Three-Day Resolution |
| startSub | 새해 다짐, 이번엔 3일 넘길 수 있을까? | Your New Year's resolution: can it last past day 3? |
| pickRes | 올해의 다짐을 골라요 | Pick this year's resolution |
| res.run / read / sleep / lang / save | 운동하기 / 책 읽기 / 일찍 자기 / 외국어 공부 / 돈 모으기 | Work out / Read more / Sleep early / Learn a language / Save money |
| howShort | 왼쪽·오른쪽 탭으로 유혹을 쳐내요. 💌⭐는 받아요! | Tap left or right to swat temptations. Let 💌⭐ through! |
| startBtn | 다짐하고 시작 | Make the resolution |
| tapToStart | 탭해서 시작 | Tap to start |
| countdown | {y}년 1월 1일 00:00 | Jan 1, {y}, 00:00 |
| go | 시작! | Go! |
| clock | 1월 {d}일 {HH}:00 | Jan {d}, {HH}:00 |
| day | DAY {n} | DAY {n} |
| hintL / hintR | ◀ 탭 / 탭 ▶ | ◀ Tap / Tap ▶ |
| swat1 / swat2 / swat3 | 안 해! / 다음에! / 됐거든! | No! / Not today! / Nope! |
| whiff | 헛손질 | Whiff |
| oops | 앗, 응원을… | Oops, that was a cheer… |
| plusOne | +1 🔥 | +1 🔥 |
| combo | {n} 콤보 | {n} combo |
| comboBoost | 의지 불끈! | Willpower surge! |
| boss | 내일부터 하지 뭐 | I'll start tomorrow |
| bossDown | 내일 말고 오늘! | Not tomorrow, today! |
| broke3 | 작심삼일 돌파! | Three-day curse broken! |
| endless | 이제부터는 기록 도전 | From here on, it's for the record |
| overTitle | 다짐이 무너졌어요 | Your resolution crumbled |
| brokeAt | 1월 {d}일 {HH}:00에 무너짐 | Gave in on Jan {d} at {HH}:00 |
| hours | {n}시간 | {n} hours |
| best | 최고 기록 {n}시간 | Best {n} hours |
| newBest | 최고 기록! | NEW BEST |
| swatted | 쳐낸 유혹 {n}개 | Temptations swatted: {n} |
| bestCombo | 최고 콤보 {n} | Best combo {n} |
| retry | 다시 다짐하기 | Resolve again |
| change | 다짐 바꾸기 | Change resolution |
| copy | 결과 복사 | Copy result |
| copied / copyFail | 복사했어요 / 복사하지 못했어요 | Copied / Could not copy |
| soundOn / soundOff | 소리 켜기 / 소리 끄기 | Sound on / Sound off |
| paused | 잠깐 멈춤 · 탭해서 계속 | Paused · tap to continue |
| share | {resEmoji} {y} 다짐 "{res}" → {n}시간 버팀! 칭호: {title} {emoji} / 작심삼일 버티기 · play.mesisi.net | {resEmoji} {y} resolution "{res}" lasted {n} hours! Title: {title} {emoji} / Survive the Three-Day Resolution · play.mesisi.net |

The temptation bubble lines, tier titles and sublines come from the tables above.

## localStorage (in try/catch, prefix `tdr:`)

- `tdr:best`: best hours (integer), default 0
- `tdr:res`: the last resolution id, default `run`
- `tdr:sound`: "1" or "0", default "0"
- `tdr:plays`: play count (not shown)

No other data is stored.

## Edge cases

- **Hidden page:** when `document.hidden` becomes true during PLAY, the game auto-pauses and shows a "paused" overlay. The game resumes only after a tap or key press. On return, delta time is clamped to 50 ms.
- **Resize during play:** recompute W and the ring radius, and keep entity positions as fractions of W so nothing jumps.
- **Simultaneous input:** if both sides are pressed in the same frame, each is resolved independently.
- **Rapid key repeat:** ignore `keydown` events with `e.repeat`.
- **Good item and temptation together:** if a 💌 and a temptation are both inside the ring on the same side, a swat hits the nearest one. This is intended as a skill test.
- **The 72-hour moment:** the +1 🔥 is given once per run. If willpower hits 0 in the same frame that h crosses 72, game over wins and the score is 72.
- **Retry:** fully resets h, willpower, entities, combo, boss state, the hint timer and the 72 h flag. It keeps the resolution and the sound setting.
- **Copy:** use `navigator.clipboard.writeText`, falling back to a hidden textarea and `execCommand('copy')`, with a toast for success or failure.
- **Blocked localStorage:** everything still works. The best score lasts only for the session.
- **Language:** `?lang=` decides it, with `navigator.language` as the fallback. `<html lang>` is set to match.
- **`location.hash === '#demo'`:** for QA thumbnails only. Jump to PLAY at h = 30 with 3 willpower, one temptation inside the ring on each side and a 💌 approaching, and freeze the frame (no spawns, no movement). Keep the HUD visible.

## Must not

- No network of any kind, no external fonts or images. Draw with canvas and emoji only.
- No smoking, drinking or diet/weight-loss resolutions or temptations. No health, financial or real self-help advice claims.
- Do not shame the player. Every game-over line is encouraging.
- No real brands, apps, streaming services, delivery services or people. 📺 and 📱 stay generic.
- Do not copy the look, characters or levels of any existing game. The two-sided swat is a genre mechanic; the art is original.
- No alert, confirm, prompt, window.open or navigation. No sound autoplay.
- No fortune or prediction claims. The title is a playful label based on the score only.
