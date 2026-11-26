# Idea and spec: 제야의 종 33번 치기 / Ring the Year-End Bell 33 Times

## Concepts scored

Scores are 1–5 for: value in the first 10 seconds, originality, Korean search/share demand, and buildability in one HTML file. Maximum 20.

| Concept | Category | Score | Verdict |
|---|---|---|---|
| Wrecking-ball page demolition: swing a wrecking ball through a built-in fake web page made of physics blocks (header, buttons, paragraphs) | games | 5/3/3/3 = 14 | The format comes from an existing viral game, so a version close to it would risk being a recreation. Physics in one file is also heavy. Park it |
| Why Wi-Fi gets weak behind walls: drag a router around a floor plan and watch the signal heatmap | tech | 3/4/3/4 = 14 | Good evergreen topic, but low hook for the season. Keep it for later |
| **제야의 종 33번 치기** | **cool** | **4/4/5/5 = 18** | **Picked**: a new subject (the year-end bell, nothing in the list or queue is about it). Peak search runs Dec 20–31, and the result card fits "새해 첫 종소리" posts. The synthesized bell sound carries the fun with no assets |

Subject check: `new-year-countdown-clock` is about a clock and a countdown, `first-sunrise-2027` is about the sunrise, and `new-year-fortune-2027` is about fortune-telling. None of them has the bell or the 33 strikes as its main noun.

## Meta

- slug `jeya-bell-33`, category `cool`, kind `game`, aspect `9/16`, date `2026-11-27`
- tags: ko `제야의종`, `새해`; en `new-year-bell`, `new-year`
- title: ko `제야의 종 33번 치기`; en `Ring the Year-End Bell 33 Times`
- desc ko: 꾹 눌러 당목을 당기고, 떼면 댕~ 하고 종이 울려요. 울림이 잦아들 때 맞춰 33번 치면 새해 첫 종소리 카드가 나와요.
- desc en: Hold to pull back the striker and release to ring the great bell. Time 33 deep strikes to the fading hum and get your New Year bell card.
- howto ko: 화면을 꾹 누르면(스페이스바도 돼요) 당목이 뒤로 당겨지고 힘 게이지가 차요. 금색 구간에서 손을 떼면 '깊은 울림'이에요. 앞 종소리가 반쯤 잦아들어 테두리가 금색으로 빛날 때 다음 종을 치면 콤보가 쌓여요. 33번을 다 치면 점수와 칭호가 나와요.
- howto en: Press and hold (or hold Space) to pull back the striker while the power gauge fills. Release in the gold zone for a Deep Ring. Strike again when the last hum has faded about halfway and the rim glows gold to build a combo. After 33 strikes you get a score and a title.
- about ko: 한 해의 마지막 밤에 종을 33번 치는 풍습에서 따왔어요. 종소리는 브라우저가 직접 합성해요. 실제 장소나 실제 종의 모습을 본뜨지 않았어요. 새해 소원은 이 기기 밖으로 나가지 않고 저장되지도 않아요.
- about en: Inspired by the custom of ringing a great bell 33 times on New Year's Eve. The browser synthesizes every bell sound. No real place or real bell is depicted. Your wish never leaves this device and is not saved.

## Pitch

It is a snowy night. A huge bronze bell hangs in a simple wooden frame, and a log striker (당목) hangs on two ropes beside it.

1. The user optionally types a one-line New Year's wish and taps start.
2. Holding pulls the striker back while a power gauge fills. Releasing swings it into the bell with a deep, beating "댕~~" (맥놀이), ripple rings, a small screen shake and gold sparks.
3. The skill is in two things: release power, and waiting for the hum to fade into the gold window before the next strike. Rushing makes the strikes clash, and waiting too long breaks the combo.
4. After strike 33 the sky brightens, "2027 정미년 🐑" fades in, and a shareable result card shows the wish, the score and a title.

## Flow

1. **START**
   - Title, one-line how-to, an optional wish field (max 20 chars) and a big "종 치러 가기" button.
   - Shows the best score if one exists. Snow falls and the bell is visible in the background.
   - Sound toggle at the top right.
2. **PLAY**
   - HUD: a big "17 / 33" counter at the top center, the score at the top left, and the combo ("콤보 ×5") under the counter when the combo is 2 or more.
   - Left side: a vertical power gauge with a gold zone from 0.70 to 0.90 and a lighter zone from 0.45 to 0.70.
   - Bell rim glow: shows the remaining hum. The window is gold while the hum is between 45% and 25% of its starting amplitude.
   - A judgment label pops near the bell for 700 ms after each strike.
   - Before the first strike, a pulsing hint reads "꾹 눌렀다 떼세요".
3. **FINALE** (2.5 s, input ignored)
   - After strike 33, the last ring plays fully.
   - The sky gradient shifts from navy to dawn violet, 40 gold particles rise, and "{year} {ganji}년 {emoji}" fades in, then "새해 복 많이 받으세요".
4. **RESULT**
   - The card is drawn on a canvas: year line, wish (or the default line), score, best, deep-ring count, longest combo and the title stamp.
   - A "NEW BEST" ribbon appears if the best score was beaten.
   - Bottom bar: [다시 치기] (big, primary), [이미지 저장], [텍스트 복사].

## Controls

- **Pointer:** pointerdown anywhere on the play area starts the pull, and pointerup releases. Use `setPointerCapture` so a release outside the area still counts. Only the first active pointerId is tracked, and other pointers are ignored.
- **Keyboard:**
  - Space or Enter held pulls, and keyup releases. Ignore `e.repeat`.
  - On START, Enter starts unless the wish field is focused (Enter in the field also starts).
  - On RESULT, R or Enter restarts, S saves and C copies.
  - M toggles sound anywhere except inside the text field.
- **Default actions:** `preventDefault` on Space, Enter and touch in the play area. The play area has `touch-action:none`.
- **Tap targets:** all buttons are at least 48 px tall.
- **Haptics:** `navigator.vibrate?.(25)` on each strike, inside try/catch, and skipped while muted.

## Mechanics

### Hold and power

- Power p rises from 0 to 1 in 1.1 s, then ping-pongs (1 → 0 in 1.1 s, and so on), so holding forever is never the best move.
- A hold shorter than 100 ms is ignored: no strike, and the hint "꾹 눌렀다 떼세요" flashes.
- The striker's pull-back angle is drawn proportional to p (0° to 28°).
- On release:
  - the striker swings forward over 220 ms with ease-in
  - impact happens at 220 ms
  - the striker returns to rest over 600 ms
- Input is ignored from release until the return ends, 820 ms in total. A pull may not start during this cooldown.

### Power judgment

| p at release | Judgment ko / en | Power points |
|---|---|---|
| 0.70–0.90 | 깊은 울림 / Deep Ring | 100 |
| 0.45–0.70 | 좋은 울림 / Good Ring | 60 |
| > 0.90 | 쾅! 너무 세요 / Clang! Too hard | 30 |
| < 0.45 | 통… 약해요 / Tunk… too soft | 20 |

### Hum and timing window

- Each strike sets the hum amplitude A0 = 0.4 + 0.6·p.
- Remaining ratio r(t) = exp(−t / τ), with τ = 1.6 s, where t is measured from the last impact.
- The gold window is 0.25 ≤ r ≤ 0.45, which is t ≈ 1.28 s to 2.22 s.
- Timing is judged at the moment of impact, not at release. This lets the player release early to land the hit inside the window.
- Strike 1 has no timing judgment.

| r at impact | Timing ko / en | Effect |
|---|---|---|
| 0.25–0.45 | 여운 이어 치기 / On the hum | +50 points and combo += 1 |
| > 0.45 | 급해요, 소리가 겹쳐요 / Too soon, it clashes | +0 and combo = 0. The ripple turns gray and the sound is muffled (see Sound) |
| < 0.25 | 여운이 끊겼어요 / The hum faded | +0 and combo = 0 |

### Scoring

- Points for a strike = (power + timing) × (1 + min(combo, 10) × 0.1). Combo is updated first and the result is rounded.
- MAX = 9025 (all strikes Deep and on the hum: 100 + Σ). Precompute it in code rather than hard-coding it, and assert it in `demo()` (see Self-check).
- Track deepCount (the number of Deep Rings) and maxCombo.
- ratio = score / MAX.

### Titles

| ratio | ko | en | emoji |
|---|---|---|---|
| < 0.25 | 살살 치는 새해 손님 | Gentle New Year Guest | 🧤 |
| < 0.45 | 첫 종 치는 견습생 | Apprentice Bell Ringer | 🔔 |
| < 0.65 | 여운을 아는 사람 | One Who Hears the Hum | 🌙 |
| < 0.85 | 동네 종지기 | Neighborhood Bell Keeper | 🏮 |
| ≥ 0.85 | 새해를 여는 종지기 | Bell Keeper of the New Year | ✨ |

Hidden title: if all 33 strikes are Deep and all 32 timings are on the hum, the title is "전설의 종지기 / Legendary Bell Keeper" 🐉.

### Year line

- Target year y: if the local month is November or December, y = year + 1. Otherwise y = the current year.
- 천간 = "갑을병정무기경신임계"[(y−4) % 10].
- 지지 = "자축인묘진사오미신유술해"[(y−4) % 12].
- Emoji by 지지: 🐭🐮🐯🐰🐲🐍🐴🐑🐵🐔🐶🐷.
- English animal names: Rat, Ox, Tiger, Rabbit, Dragon, Snake, Horse, Sheep, Monkey, Rooster, Dog, Pig.
- Line ko: "{y} {천간}{지지}년 첫 종소리 {emoji}". Line en: "{y} Year of the {Animal}: First Bell {emoji}".
- 2027 gives 정미, 🐑, Sheep.

## Sound (on by default, starts only after the START tap)

- Create the AudioContext on the START button's pointerdown or keydown. Never before.
- **Bell voice:** created per impact. Base f0 = 82 Hz, multiplied by a slight random factor in [0.98, 1.02] per strike.

  | Partial | Ratio × f0 | Relative gain | Decay τ |
  |---|---|---|---|
  | hum | 0.5 | 0.35 | 6 s |
  | prime | 1.0 | 1.0 | 4 s |
  | tierce | 1.19 | 0.5 | 3 s |
  | quint | 1.5 | 0.3 | 2.5 s |
  | nominal | 2.0 | 0.45 | 2 s |
  | upper | 2.74 | 0.2 | 1.2 s |
  | upper | 3.76 | 0.12 | 0.8 s |

  - The prime and the hum each get a second oscillator detuned by +0.35 Hz, which creates the beating 맥놀이 wobble.
  - Strike noise: a 40 ms band-passed noise burst at 600 Hz, gain 0.15.
  - Master gain = 0.5 × A0, through a DynamicsCompressor.
  - Too-hard strikes add a 120 ms square-wave clank at 420 Hz, gain 0.05.
  - Too-soon strikes run through a 900 Hz lowpass and use half the gain.
- **Voice limit:** at most 3 bell voices alive. Stop the oldest early with a 0.3 s fade.
- **Pull creak:** while holding, a quiet filtered-noise creak at gain 0.02.
- **Finale:** one extra soft strike at f0/2 with τ × 1.5.
- **Mute:** the toggle sets the master gain to 0 and is persisted. When muted, also skip vibration.

## Visual design

- **Palette:**
  - sky: a gradient from #0f1630 to #1e2a52, shifting in the finale to #3b2d5c and then #f2a65a at the bottom
  - bronze bell: base #8a6a3a, highlight #c9a463, shadow #4a3820
  - wood: #6b4a2b, ropes: #d9c7a0
  - gold accent: #ffcf5a, judgment text: white with a gold glow, misses: #9aa3b5
- **Bell:**
  - drawn on canvas as a rounded, flared silhouette, with simple horizontal bands and a round strike plate (당좌) where the log hits
  - generic geometric pattern only, with no copy of any real bell's reliefs or inscriptions
  - the frame is two posts and a beam, with no specific building
- **Feedback on impact:**
  - the bell swings ±1.5° and settles with a damped spring
  - 3 expanding ripple rings start at the strike plate
  - 3 px screen shake for 120 ms
  - 12–20 gold sparks (scaled by p)
  - on a Deep Ring, the bell flashes brighter for 150 ms
  - the judgment text pops (scale 1.4 → 1)
- **Rim glow:** the bell outline glow alpha follows r. It turns gold inside the window and gray-blue outside it.
- **Snow:** 50 particles with sine drift on the same canvas, drawn behind the bell.
- **Layout:**
  - the canvas fills 100vw × 100dvh, with DPR capped at 2, and layout is recomputed on resize
  - the bell is centered at about 45% of the height, scaled to min(width × 0.62, height × 0.42)
  - the striker sits to the left of the bell, and the gauge at the left edge with a 16 px margin
  - on wide screens the scene is centered with the width capped at height × 0.75, and the sky fills the rest
  - at 320 px wide the HUD text is at least 16 px
- **prefers-reduced-motion:** no shake, no bell swing, ripples fade without expanding, 15 snow particles and no finale particles. Gameplay is unchanged.
- **Loop:** `requestAnimationFrame` with delta time capped at 50 ms. On `document.hidden`:
  - pause the loop and suspend the AudioContext
  - cancel any active hold (the pull returns to rest, no strike)
  - freeze the hum timer, so the hum time is not counted while hidden

## Result card

The card is a canvas with a logical size of 360 × 560, centered at max-width min(92vw, 400px). It is drawn as a dark navy rounded card with a gold border:

1. The year line (bold, 20 px)
2. A small bell icon drawn on canvas
3. The wish in quotes, wrapped (Korean by characters, English by words), at most 2 lines. With no wish, use the default line "올해도 수고했어요, 새해엔 더 좋은 일만" / "You did well this year. Only good things ahead".
4. The score, big (40 px, gold, monospace digits), then "최고 {best}"
5. A stats row: 깊은 울림 {deep}/33 · 최고 콤보 {maxCombo}
6. The title stamp: a gold double-bordered rounded rectangle rotated −6°, with the emoji and the title. It animates in as a thump (scale 2 → 1, skipped under reduced motion).
7. Footer: "play.mesisi.net"

### Export and copy

- **Save image:** redraw at 2× scale (720 × 1120), export with `toBlob`, and download via `<a download="jeya-bell-33.png">`. Revoke the URL after 1 s. On failure, show the toast saveFail.
- **Copy text:** use `navigator.clipboard.writeText`, falling back to a hidden textarea and `execCommand('copy')`. Show a toast for success or failure.
- **Share text:**
  - ko: `🔔 제야의 종 33번 치기 / {yearLine} / 점수 {score} · {title} / "{wish}" / play.mesisi.net`
  - en: `🔔 Ring the Year-End Bell 33 Times / {yearLine} / Score {score} · {title} / "{wish}" / play.mesisi.net`
  - If there is no wish, omit the wish part.

## Strings

| key | ko | en |
|---|---|---|
| appTitle | 제야의 종 33번 치기 | Ring the Year-End Bell 33 Times |
| startSub | 꾹 눌러 당기고, 떼서 댕~ 울림이 잦아들 때 다음 종을 쳐요 | Hold to pull, release to ring. Strike again as the hum fades. |
| wishPh | 새해 소원 한 줄 (선택, 20자) | One-line New Year's wish (optional, 20 chars) |
| startBtn | 종 치러 가기 | Go ring the bell |
| bestLabel | 최고 점수 {n} | Best {n} |
| holdHint | 꾹 눌렀다 떼세요 | Press, hold, then release |
| counter | {n} / 33 | {n} / 33 |
| scoreLabel | 점수 | Score |
| combo | 콤보 ×{n} | Combo ×{n} |
| deep | 깊은 울림 | Deep Ring |
| good | 좋은 울림 | Good Ring |
| hard | 쾅! 너무 세요 | Clang! Too hard |
| soft | 통… 약해요 | Tunk… too soft |
| onHum | 여운 이어 치기 | On the hum |
| tooSoon | 급해요, 소리가 겹쳐요 | Too soon, it clashes |
| faded | 여운이 끊겼어요 | The hum faded |
| finaleGreet | 새해 복 많이 받으세요 | Happy New Year |
| yearLine | {y} {ganji}년 첫 종소리 {emoji} | {y} Year of the {animal}: First Bell {emoji} |
| defaultWish | 올해도 수고했어요, 새해엔 더 좋은 일만 | You did well this year. Only good things ahead |
| bestNow | 최고 {n} | Best {n} |
| stats | 깊은 울림 {d}/33 · 최고 콤보 {c} | Deep Rings {d}/33 · Best combo {c} |
| newBest | 신기록! | NEW BEST! |
| again / save / copy | 다시 치기 / 이미지 저장 / 텍스트 복사 | Ring again / Save image / Copy text |
| saved / saveFail | 이미지를 저장했어요 / 저장에 실패했어요. 화면을 캡처해 주세요 | Image saved / Could not save. Please take a screenshot. |
| copied / copyFail | 복사했어요 / 복사하지 못했어요 | Copied / Could not copy |
| soundOn / soundOff | 소리 켜기 / 소리 끄기 | Sound on / Sound off |
| paused | 잠시 멈춤, 화면을 누르면 이어서 쳐요 | Paused. Tap to keep ringing |
| titles (5 + hidden) | see Titles table | see Titles table |

## localStorage (in try/catch, prefix `jb33:`)

- `jb33:best`: the best score as an integer
- `jb33:sound`: "1" or "0", default "1"
- `jb33:plays`: the number of finished runs (not shown in the UI)

Never store the wish.

## Edge cases

- A hold shorter than 100 ms, or input during the 820 ms cooldown, is ignored. It does not count as a strike and does not reset the combo.
- Pointer cancel, blur or `document.hidden` during a hold cancels the hold with no strike. On return, show the paused overlay. A tap resumes, and the hum timer resumes where it froze.
- A second finger or a key while a pointer hold is active is ignored. Only one hold source at a time.
- Resizing mid-swing recomputes the geometry from state (angle, p, r) without restarting any animation or timer.
- If AudioContext creation fails or is blocked, the game plays silently, the toggle shows muted, and there are no errors.
- The wish is trimmed, clipped to 20 code points with `Array.from`, and stripped of newlines. It is drawn only via canvas `fillText`, never inserted as HTML.
- Restart resets the count, score, combo, deepCount, maxCombo, hum, particles and the sky color. The wish and sound setting are kept for the session.
- If localStorage is blocked, everything works and best is kept in memory only.
- If `location.hash === '#demo'`, jump to RESULT with score 7420, deep 28, maxCombo 19, the default wish and year 2027. This is for QA thumbnails only. If the hash is `#demo-play`, show PLAY at 17/33 mid-ripple.

## Self-check

`demo()` runs when `?selftest=1` is in the URL and logs to the console. It asserts:

- MAX === 9025, recomputed from the scoring rule
- ganji(2027) === "정미"
- the window boundaries, r(1.28) and r(2.22), fall within ±0.01 of 0.45 and 0.25
- the power judgment at p = 0.69, 0.70, 0.90 and 0.91 returns good, deep, deep and hard

## Must not

- No network of any kind: no fonts, no CDNs, no fetch. No raster images (kind `game`). Everything is drawn on canvas or CSS, and every sound is synthesized.
- Do not name or depict any real place, pavilion, temple, city event or broadcast. Do not imitate any real, famous bell's shape, reliefs, inscriptions or name.
- No religious symbols or rituals beyond the neutral custom of 33 strikes. No political or ceremonial dignitaries.
- No real fortune claims, money or health advice. The wish is decoration only.
- Do not require the real date or time to play. It works on any day, and only the year line adapts.
- No microphone or recording. No alert, confirm, prompt, window.open or navigation. No sound before the first user gesture.
- No countdown pressure or timer to midnight. The pacing comes from the hum alone.
