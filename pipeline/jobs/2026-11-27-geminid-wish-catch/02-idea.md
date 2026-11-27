# Idea and spec: 쌍둥이자리 유성우 소원 잡기 / Geminid Wish Catcher

Agent: Claude (Opus 5.5), planner. Design notes are merged in (palette, layout, motion).

## Concepts scored

Each concept is scored 1–5 on four things: value in the first 10 seconds, originality, Korean search/share demand, and whether it can be built in one HTML file. The maximum is 20.

| Concept | Category | Score | Verdict |
|---|---|---|---|
| **Geminid Wish Catcher**: tap shooting stars from the mid-December Geminid meteor shower before they fade, without tapping planes or satellites | **cool** | **5/4/4/4 = 17** | **Picked.** It has a fresh seasonal hook: "쌍둥이자리 유성우" searches peak around Dec 13–14, and the subject is a meteor shower, which no item or spec covers yet. You get to tap right away, and the result card fits "소원 빌었다" posts. |
| 유자청 담그기 (Yuja Tea Jar): slice yuzu, then layer yuzu and sugar 1:1 with timing taps | games | 4/4/3/4 = 15 | Cozy and original, but search demand is weaker. Keep it for the backlog. |
| JSON 포맷터·검사기 (JSON Formatter & Validator) | tech | 2/2/4/5 = 13 | Search demand never stops, but it has no seasonal or share value. It is a filler for a slow week. |

Duplicate check:
- winter-star-connect is about constellations: it is a learning item where you connect stars into winter shapes. This item's subject is the Geminid meteor shower, which is a one-night December event. The mechanic is reflex tapping on meteors that move and fade. The only thing they share is a night sky.
- first-sunrise-2027 is about the New Year's sunrise. snow-crystal-lab is about snowflakes. Neither overlaps.
- The research pointed to a brush-and-bite cat game, a squishy toy, a drama-line challenge and a website-destroying game. None of these are reused: the matching specs are already queued (itchy-back-rescue, snowy-hedgehog-brush, squishy-squeeze, petty-drama-script, page-smash).

## Meta

- slug `geminid-wish-catch`, category `cool`, kind `game`, aspect `9/16`, date `2026-11-27`
- tags: ko `쌍둥이자리 유성우`, `별똥별`, `소원`; en `geminids`, `meteor shower`, `shooting star`
- title: ko `쌍둥이자리 유성우 소원 잡기`; en `Geminid Wish Catcher`
- desc ko: 12월 밤하늘에 쏟아지는 별똥별을 사라지기 전에 톡! 비행기와 인공위성은 속지 말고 피하세요. 60초 동안 소원을 몇 번 빌 수 있을까요?
- desc en: Tap shooting stars before they fade in a 60-second December meteor shower. Don't be fooled by planes and satellites. How many wishes can you make?
- howto ko: 별똥별이 지나가는 순간 그 위를 누르세요. 깜빡이는 비행기와 천천히 가는 인공위성을 누르면 감점이에요. 연속으로 잡으면 점수가 두 배, 금빛 불덩이 유성은 3점! 키보드는 스페이스바로 가장 밝게 빛나는 순간을 맞춰 잡아요.
- howto en: Tap a shooting star while it streaks across the sky. Tapping a blinking plane or a slow satellite costs points. Catch 5 in a row for double points, and golden fireballs are worth 3. On a keyboard, press Space when a meteor is at its brightest.
- about ko: 쌍둥이자리 유성우는 소행성 3200 파에톤이 남긴 부스러기가 지구 대기에 부딪히며 생겨요. 매년 12월 중순에 가장 많이 떨어지고, 아주 맑고 어두운 곳에서는 한 시간에 100개 넘게 보이기도 해요. 2026년 극대는 12월 14일 무렵으로 예상되지만, 정확한 시각은 한국천문연구원 발표를 확인하세요. 입력한 소원은 이 기기 밖으로 나가지 않고 저장되지도 않아요.
- about en: The Geminids come from debris left by asteroid 3200 Phaethon burning up in Earth's atmosphere. They peak every mid-December, and under very dark, clear skies you can see more than 100 an hour. The 2026 peak is expected around December 14. Check your national astronomy institute for exact times. Your wish never leaves this device and is never saved.

## Pitch

A deep-navy winter sky hangs over dark hills and a small house with one warm window. Two brighter stars sit near the upper left: these are the twins, and the meteors radiate from there.

1. The user can type a wish (optional, up to 20 characters) and taps "관측 시작".
2. For 60 seconds, meteors streak out from the radiant. They get faster and more frequent until a "극대!" peak at 45 s.
3. Tapping a meteor bursts it into sparkles, and a small star flies into the wish counter. Planes and satellites are decoys that cost points.
4. The result is a night-sky card with the wish, the wish count, a title, stats and an image-save button.

## Flow

1. **START**
   - Title, subtitle, a wish field (placeholder only, max 20 characters) and a big "관측 시작" button.
   - The sky is already alive behind it: background stars twinkle and a slow meteor passes every 3–5 s as decoration. Decoration meteors cannot be tapped.
   - Best score is shown below the button. The mute toggle is at the top right.
2. **READY** (1.2 s)
   - "쌍둥이자리 방향을 보세요 ↖" fades in next to the radiant, and the two twin stars pulse twice.
   - Input is ignored, so a start tap cannot count as a miss.
3. **PLAY** (60 s)
   - The HUD has the time left at the top center (a thin bar plus seconds), the score at the top left, a 🌠 wish counter at the top right and a combo badge under the score once combo is 2 or more.
   - At 45 s, a "극대!" banner slides in for 1.2 s and the sky brightens slightly (sky gradient +6% lightness).
4. **TIME UP**
   - "관측 끝" shows for 0.8 s. Meteors still on screen fade out over 0.4 s and cannot be caught any more.
5. **RESULT**
   - The result card scales from 0.9 to 1 and fades in over 300 ms.
   - The card holds the title stamp, score, best score (with a "NEW BEST" ribbon when beaten), the wish line and stats.
   - Under the card: a big [다시 관측] button, a secondary [이미지 저장] button and a text link [처음으로].

## Gameplay rules

### Coordinates

- Every entity is stored in normalized coordinates (0–1 of the play area) so that resizing never breaks state.
- Pixel sizes use `u = min(W, H) / 100`.
- Radiant R = (0.22, 0.12). Twin star markers sit at R + (−0.03, −0.02) and R + (0.02, 0.03).

### Meteor spawn

- Spawn rate λ (per second, Poisson, using an accumulator with exponential intervals):
  - 0–20 s: 0.7
  - 20–45 s: linear ramp from 0.7 to 2.0
  - 45–60 s: 2.0
- At most 6 meteors can be active at once. When the cap is full, skip that spawn.
- Start point P is uniform in x 0.05–0.95 and y 0.05–0.60, and rejected if it is closer than 0.12 to R.
- Direction is normalize(P − R), with ±6° jitter.
- Each meteor has a length of 18–45 u and a travel distance of 25–60 u.
- Life is 0.55–1.1 s, shrinking linearly to 0.45–0.9 s by 45 s.
- Brightness over life:
  - fades in during 0–15%
  - full during 15–70% (the "bright window")
  - fades out during 70–100%
- About 5% of meteors are **fireballs**:
  - they are gold, their trail is twice as wide, they last 1.4 s and they shed 3 tiny sparks
  - there is at most 1 fireball per 8 s

### Decoys

- **Airplane** (from 8 s on, at most 1 at a time, a new one every 12–18 s):
  - crosses horizontally at y 0.15–0.45, from one side to the other, over 8–12 s
  - has a red light on the left wingtip and a green one on the right, both 1.5 px, plus a white strobe every 1.0 s
- **Satellite** (from 20 s on, at most 1 at a time, a new one every 15–22 s):
  - a steady, dim white dot (alpha 0.7) on a straight diagonal path, crossing in 9–11 s

### Hit test (pointerdown only; each pointer counts separately)

1. **Meteors first.** For each active, catchable meteor, measure the distance from the pointer to the segment from tail to head.
   - The hit radius is max(22 px, 5u). Fireballs use 1.3× that.
   - Pick the closest hit.
2. **Then decoys.** The hit radius is max(22 px, 4.5u) around the decoy's position.
3. **Otherwise** it is an empty tap.

A meteor is catchable from 0% to 100% of its life. The fade-out is the grace period.

### Keyboard (Space or Enter)

- The target is the oldest active meteor (a fireball counts too).
- If it is in its bright window (15–70% of life), it is caught.
- If no meteor is active, or the oldest one is outside its bright window, it is an empty press: the combo resets and "너무 빨라요" or "늦었어요" appears near that meteor (no text if no meteor is active).
- Decoys cannot be hit from the keyboard.

### Scoring

- A meteor is worth 1 and a fireball 3.
- Combo counts consecutive catches. At combo ≥ 5, each catch is worth double, and the badge shows "×2".
- A decoy tap costs 2 points (the score never goes below 0), resets the combo and shows floating text: "비행기예요!" or "인공위성이에요!".
- An empty tap resets the combo but costs nothing. A faint ring ripple shows where the tap landed.
- A meteor that expires uncaught counts as `missed` and does not reset the combo. Players can let meteors go, but spam-tapping breaks the combo.
- Stats tracked:
  - `caught` (count of meteors plus fireballs)
  - `fireballs`
  - `bestCombo`
  - `decoyHits`
  - `emptyTaps`
  - `missed`
  - accuracy = caught / (caught + missed), rounded to a whole percent. When there are no meteors at all it shows "—".

## Controls

- **Pointer:** tap or click on meteors. All buttons are at least 48 px tall.
- **Keys:**
  - Enter starts from START, but not while `isComposing`, so Korean IME input is safe.
  - Space or Enter catches during PLAY.
  - R or Enter on RESULT retries. S saves the image. Escape goes back to START.
  - M toggles sound anywhere, except while the wish input has focus.
- **Touch and layout:** the play canvas has `touch-action:none`, and `preventDefault` is called on pointerdown and on the Space and Enter keys during PLAY. The page never scrolls.

## Result titles (by score)

| Score | ko | en | emoji |
|---|---|---|---|
| 0–9 | 구름 낀 밤의 관측자 | Cloudy-Night Watcher | ☁️ |
| 10–24 | 첫 별똥별 사냥꾼 | First-Meteor Hunter | 🌠 |
| 25–44 | 소원 수집가 | Wish Collector | ✨ |
| 45–69 | 극대 시간의 주인 | Master of the Peak | 🌌 |
| 70+ | 그냥 별똥별 그 자체 | Basically a Shooting Star | 💫 |

Hidden title: if score ≥ 30, decoyHits = 0 and emptyTaps = 0, the title is "매의 눈 관측자 / Hawk-Eyed Stargazer" 🦉.

Wish line on the card:
- With a wish: "「{wish}」 / 오늘 밤 별똥별에게 {n}번 빌었어요". In English: "“{wish}” / You wished on {n} shooting stars tonight".
- Without a wish: "오늘 밤 별똥별 {n}개에 소원을 빌었어요" / "You made {n} wishes on shooting stars tonight".
- With n = 0: "다음 밤엔 꼭 하나 잡아요" / "Next clear night, catch one for sure".

Closing line, one per tier, shown in small text under the stats:

| Tier | ko | en |
|---|---|---|
| ☁️ | 구름 뒤에도 별은 떠 있어요. | The stars are still there behind the clouds. |
| 🌠 | 첫 소원은 원래 제일 반짝여요. | First wishes always shine the brightest. |
| ✨ | 소원 주머니가 꽤 묵직해졌어요. | Your wish pouch is getting heavy. |
| 🌌 | 극대 시간을 제대로 즐긴 밤이에요. | You made the most of the peak tonight. |
| 💫 | 하늘이 당신을 따라 하려고 해요. | The sky is trying to keep up with you. |
| 🦉 | 비행기 한 번 안 속은 진짜 관측자. | Not fooled by a single plane. A true stargazer. |

## Screens and visual design

### Palette

- Sky: a gradient from #0b1026 at the top to #1b2a52 at the horizon. During the peak it is about 6% lighter.
- Hills: #070b18 for the far layer and #0a0f1f for the near layer, as two sine-noise silhouettes in the bottom 18%.
- The house is a small roof and box on the near hill, with a #ffcf6b window glowing at alpha 0.85 that flickers softly.
- Background stars: 120 dots (60 when reduced motion is on), radius 0.4–1.4 px, twinkling with seeded phases. The positions are a fixed seed, so they are the same every visit.
- Meteor: a #e8f0ff head with a 2.5 u glow, and a linear-gradient trail that fades to transparent at the tail.
- Fireball: a #ffe08a head with a #ff8a3d trail.
- UI: text #eef2ff, secondary #9aa6c8, accent #ffcf6b (gold), danger #ff6b6b.

### START

- A stacked title (ko 28 px bold, en 24 px) with a subtle gold glow.
- Subtitle and the wish input (max-width 320 px, 48 px tall, rounded, translucent #ffffff14 background).
- A gold primary button with dark text, best score as "최고 기록 {best}", and the footnote.

### PLAY

- The HUD uses 16 px bold text with a 1 px dark text-shadow.
- The time bar is gold and turns #ff6b6b in the last 10 s.

### Juice

- **Catch:**
  - 12 sparkle particles burst out (0.4 s)
  - a small star flies on a bezier curve to the 🌠 counter (0.45 s), and the counter pops to 1.25× scale
  - floating "+1", "+2" or "+3" text
- **Fireball catch:** 24 particles in gold and a 100 ms screen flash (white at 8% alpha).
- **Decoy tap:** the decoy blinks red, the screen shakes 3 px for 120 ms and the penalty text appears in #ff6b6b.

### RESULT

The card is drawn on a canvas, 360×560 logical px, centered at width min(92vw, 400px). It contains, in order:

- sky and hill thumbnails
- the title stamp: a gold double-bordered rounded rectangle rotated −6° with the emoji and the title
- the score in 40 px bold, best score and the NEW BEST ribbon
- the wish line
- the stats row: 🌠 caught · 🔥 fireballs · 🔗 best combo · 🎯 accuracy
- the closing line
- a "play.mesisi.net" footer in small gray text

### Layout

- **Small screens:** at 320×480, the HUD shrinks to 14 px and the result card scales down to fit the height, with the buttons always visible.
- **Wide screens:** the sky fills the whole window and the UI sits in a centered column with a max width of 480 px. Meteor spawn uses the full width.
- **prefers-reduced-motion:**
  - no shake, no flash and no star fly-in (the counter just increments)
  - 60 background stars without twinkle
  - meteors still move, because they are the game, but decoration meteors on START are off

## Sound (off by default; Web Audio only after a user gesture)

- **Catch:** a 90 ms sine "ting". Its pitch follows a pentatonic scale (C6 D6 E6 G6 A6) and steps up with the combo, capped at the top note. Gain 0.06.
- **Fireball:** a 3-note arpeggio, triangle wave, 250 ms. Gain 0.07.
- **Decoy:** a 120 ms square wave at 140 Hz with a lowpass at 600 Hz. Gain 0.05.
- **Peak banner:** a soft 400 ms swell (sine at 520 Hz with an attack-release envelope). Gain 0.04.
- **Time up:** two descending sine notes. Gain 0.05.
- The mute toggle is 🔊/🔇, and the setting is persisted.

## Export

- **Save image:**
  - Redraw the result card offscreen at 720 px wide (scale 2).
  - Export with `toBlob` and an `<a download="geminid-wish.png">` click, then revoke the URL after 1 s.
  - On failure, show the toast "저장에 실패했어요. 화면을 캡처해 주세요".
- There is no text copy button. Rule: the fewest buttons that still let people share.

## Strings

| key | ko | en |
|---|---|---|
| appTitle | 쌍둥이자리 유성우 소원 잡기 | Geminid Wish Catcher |
| startSub | 60초 동안 쏟아지는 별똥별, 사라지기 전에 눌러서 소원을 빌어요 | 60 seconds of falling stars. Tap them before they fade and make a wish. |
| wishPh | 빌고 싶은 소원 (선택, 20자) | Your wish (optional, 20 chars) |
| startBtn | 관측 시작 | Start watching |
| best | 최고 기록 {n} | Best {n} |
| foot | 소원은 저장되지 않고 이 기기 밖으로 나가지 않아요 | Your wish is never saved or sent anywhere |
| ready | 쌍둥이자리 방향을 보세요 ↖ | Look toward Gemini ↖ |
| twins | 쌍둥이자리 | Gemini |
| peak | 극대! | Peak! |
| timeUp | 관측 끝 | Time's up |
| plus | +{n} | +{n} |
| comboX2 | 연속 {n} ×2 | Combo {n} ×2 |
| plane | 비행기예요! | That's a plane! |
| satellite | 인공위성이에요! | That's a satellite! |
| early | 너무 빨라요 | Too early |
| late | 늦었어요 | Too late |
| score | 점수 | Score |
| newBest | 최고 기록! | NEW BEST |
| statCaught / statFire / statCombo / statAcc | 별똥별 / 불덩이 / 최고 연속 / 정확도 | Meteors / Fireballs / Best combo / Accuracy |
| wishWith | 「{wish}」 오늘 밤 별똥별에게 {n}번 빌었어요 | “{wish}” You wished on {n} shooting stars tonight |
| wishNone | 오늘 밤 별똥별 {n}개에 소원을 빌었어요 | You made {n} wishes on shooting stars tonight |
| wishZero | 다음 밤엔 꼭 하나 잡아요 | Next clear night, catch one for sure |
| retry | 다시 관측 | Watch again |
| save | 이미지 저장 | Save image |
| home | 처음으로 | Back to start |
| saved / saveFail | 이미지를 저장했어요 / 저장에 실패했어요. 화면을 캡처해 주세요 | Image saved / Could not save. Please take a screenshot. |
| soundOn / soundOff | 소리 켜기 / 소리 끄기 | Sound on / Sound off |
| cardHead | 2026 쌍둥이자리 유성우 관측 기록 | 2026 Geminids Watch Log |

`cardHead` uses the current year from the clock. Title tiers and closing lines are listed in the tables above.

## localStorage (in try/catch, prefix `gwc:`)

- `gwc:best`: the best score (an integer)
- `gwc:sound`: "1" or "0", default "0"
- `gwc:plays`: the number of finished runs (not shown in the UI)

Never store the wish text.

## Edge cases

- **Resize during PLAY:** entities keep their normalized positions. Recompute `u`, the canvas size (DPR capped at 2) and the hill silhouettes. Never restart the run.
- **Hidden page:**
  - When `document.hidden` becomes true, pause the timer, spawning and entity aging.
  - Cap delta time at 50 ms on resume, then show "계속하려면 누르세요 / Tap to resume" until the next tap. That tap is not counted as a catch.
- **Multi-touch:** each pointerdown is tested on its own, and two fingers can catch two meteors. The same meteor cannot be caught twice: mark it caught at once and stop it being catchable.
- **Overlap:** a tap that hits a meteor and a decoy at once counts as the meteor.
- **Last moment:** a meteor caught in the final frame before 60 s counts. After TIME UP, all input on the canvas is ignored for 0.8 s before RESULT shows.
- **Retry:** fully resets the score, combo, stats, entities, spawn accumulators, timers and the peak flag. It keeps the wish text in the input until reload, and keeps the sound setting.
- **Wish input:**
  - Trim the text and cap it at 20 code points. Do not split a surrogate pair: use `Array.from`.
  - Draw it as text only, never as innerHTML, and escape it when it goes into the DOM.
  - An empty wish uses the `wishNone` line.
- **Blocked storage:** when localStorage is blocked, the best score lives in memory only and the game still works.
- **QA thumbnails:** if `location.hash === '#demo'`, use a seeded PRNG (mulberry32(20261214)) to render a frozen PLAY frame and hold it:
  - 4 meteors (1 of them a fireball), 1 airplane, the "극대!" banner, score 23, combo 6, 18 s left.
  - `#demo-result` renders the RESULT card with score 41 and the wish "내년엔 꿀잠".

## Must not

- No network of any kind; stay under 150 KB.
- No raster images, because this is a game: canvas, CSS and emoji only.
- Do not claim wishes come true, give real fortunes or give astrology readings. The wish is just a playful label.
- Do not state an exact 2026 peak time or moon conditions as fact. Always point to the 한국천문연구원 announcement. Facts are limited to the parent body (3200 Phaethon), the mid-December peak and "100+ per hour under ideal dark skies".
- Do not copy the look of any existing stargazing app or planetarium site, or of a known meteor game. No real airline liveries and no real satellite names.
- Do not draw star positions as an accurate sky map and present it as one. The twin stars are only a stylized hint, and the label just says "쌍둥이자리".
- No alert, confirm, prompt, window.open or navigation. No sound autoplay.
- Do not punish uncaught meteors. Missing them is fine; only decoy taps cost points.
