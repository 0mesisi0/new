# Idea and spec: 고슴도치 눈 털어주기 / Snowy Hedgehog Brush

Agent: Claude (opus), planner. Design notes are merged in (palette, layout, motion).

## Concepts scored

Scores are 1–5 for: fun in the first 10 seconds, originality, Korean search/share demand, and buildability in one HTML file. Maximum 20.

| Concept | Category | Score | Verdict |
|---|---|---|---|
| **Snowy Hedgehog Brush**: a hedgehog comes in from the snowy garden, and you brush the snow and leaves off its quills in the direction they grow. Brush too fast or against the grain and it curls into a spiky ball. | **games** | **5/4/4/5 = 18** | **Picked.** This is research direction #1 (a calming stroke that turns tense if you push too hard) with a new subject. It is cute, the losses are easy to clip, and best scores invite competition. |
| Hometown Love Donation tax credit calculator 2026 (고향사랑기부 세액공제 계산기) | tools | 3/3/5/3 = 14 | Search demand peaks in December. The rate brackets and return-gift rules must be checked against the official notice, so there is a risk of wrong numbers. Hold it until the official rates are confirmed. |
| Over-the-top drama line generator: pick an everyday situation and get one melodramatic line about it | random | 4/4/3/5 = 16 | Fits research #5 (drama-line short-form videos). The lines must all be original writing, which takes a lot of copywriting time. Keep it for later. |

## Meta

- slug `snowy-hedgehog-brush`, category `games`, kind `game`, aspect `9/16`, date `2026-11-27`
- tags: ko `고슴도치`, `힐링게임`; en `hedgehog`, `cozy-game`
- title: ko `고슴도치 눈 털어주기`; en `Snowy Hedgehog Brush`
- desc ko: 눈밭에서 막 들어온 고슴도치 가시에 눈송이와 낙엽이 잔뜩 붙었어요. 가시 결대로 살살 쓸어 주세요. 너무 세게 하면 동그랗게 말려 버려요!
- desc en: A hedgehog just came in from the snow with flakes and leaves stuck in its quills. Brush gently with the grain. Too rough and it curls into a spiky ball!
- howto ko: 고슴도치 등을 드래그해서 머리 쪽에서 꼬리 쪽으로 쓸어 주세요. 너무 빠르거나 결 반대로 쓸면 예민도가 올라가요. 30초 안에 다 털어 주지 못하면 추워서 말려 버려요. 키보드는 방향키로 브러시를 옮기고, 스페이스를 누르고 있는 동안 쓸어요.
- howto en: Drag along the hedgehog's back from head to tail. Brushing too fast or against the grain raises its grumpiness. Clear everything within 30 seconds or it gets cold and curls up. Keyboard: arrow keys move the brush, and you brush while holding Space.
- about ko: 고슴도치가 바라보는 방향은 판마다 바뀌어요. 가시 결을 먼저 보고 쓸어 주세요. 실제 고슴도치를 돌보는 방법이 아니라 재미로 만든 게임이에요.
- about en: The hedgehog faces a different way each round, so check the grain before you brush. This is a game for fun, not real hedgehog care advice.

## Pitch

It is a snowy night on a porch lit by a warm lamp. A round, chubby hedgehog waddles in on a little mat, covered in snowflakes ❄ and dry leaves 🍂.

1. The player drags along the back from head to tail, like a brush. Each pass knocks debris off with a "뽀득" pop and a sparkle.
2. A calm pace makes the hedgehog half-close its eyes and hum happily. Going too fast or against the grain fills the **예민도 / Grumpiness** bar, and the quills visibly bristle.
3. Each round gives 30 seconds. Clear the hedgehog and it hops happily, then the next one arrives with more debris and less patience.
4. The game ends when grumpiness hits 100 or time runs out. Either way the hedgehog curls into a spiky ball with a cute "퓨슝" (no biting, no jump scare).

The tension is "fast vs gentle": you must clear everything in time, but rushing makes it curl up.

## Flow

1. **START**
   - The hedgehog sleeps on the mat (slow breathing animation) while snow falls in the background.
   - Shows the title, a one-line how-to, a big "살살 시작하기" button, the best score and a mute toggle.
   - Tap anywhere on the button, or press Enter or Space, to start.
2. **ROUND INTRO** (0.9 s)
   - The hedgehog slides in from the side of the screen. It faces left or right at random (round 1 always faces left).
   - A short "→ 이쪽으로 쓸어요" arrow hint fades in and out above its back. It shows only in rounds 1–2 and whenever the facing changes.
   - Input is ignored during the intro.
3. **PLAY**
   - The HUD shows the score (top left), the round (top center), the timer ring (top right) and the mute toggle.
   - The grumpiness bar sits just above the hedgehog.
4. **ROUND CLEAR** (1.4 s)
   - The hedgehog hops twice, a ✨ burst plays and a "뽀송뽀송!" toast appears.
   - The bonus is counted up, then the next round starts automatically.
5. **GAME OVER**
   - The hedgehog curls up (body shrinks into a circle, quills stick straight out, a 4 px shake for 150 ms).
   - After 0.8 s a card appears with the cause line, score, best score, rounds cleared, a "NEW BEST" badge if earned, and a big "다시 하기" button.
6. **PAUSE**
   - When `document.hidden` is true, the game pauses automatically and the timer stops.
   - On return, a "탭해서 계속 / Tap to continue" overlay shows. Play resumes on tap or key.

## Core mechanics

- **Unit S:** the hedgehog body width on the canvas, set to min(w × 0.72, h × 0.5). All distances and speeds are expressed in S so behavior is the same at every resolution.
- **Body:** an ellipse 1.0S wide and 0.62S tall. The back region (the top 70% of the ellipse) is where the brush works. The head sits on the facing side and has no debris.
- **facing:** −1 means facing left (good strokes go left to right, dx > 0), +1 means facing right (good strokes go right to left). goodDir = −facing.
- **Speed:**
  - Measured only while the pointer is down and inside the body.
  - inst = segment length / dt.
  - v += (inst − v) × (1 − exp(−dt / 0.08)).
  - dt is capped at 50 ms.
- **Comfort speed:** vMax = S × max(0.7, 1.25 − 0.06 × (r − 1)) per second, where r is the round number.
- **Grumpiness T (0–100):**
  - v > vMax adds 55 × (v / vMax − 1) × (1 + 0.08 × (r − 1)) per second.
  - Calm brushing (0.15 vMax ≤ v ≤ vMax, inside the body) subtracts 10/s.
  - Idle or off the body subtracts 4/s.
  - Against the grain: within one stroke, add up movement where dx × goodDir < 0 and |dx| > |dy|. When the total passes 0.25S, add 15 once per stroke. Show a "따끔!" floating text and a 100 ms red flash on the bar.
  - Mostly vertical movement (|dy| ≥ |dx|) neither brushes nor counts as against the grain. Speed still counts.
- **Visual tells:**
  - T ≥ 50: the quills grow 15% longer and the bar turns orange.
  - T ≥ 80: the eyes squint, the body trembles 1 px and the bar turns red and pulses.
  - T ≥ 100: game over (cause: rough).
- **Stroke:** runs from pointerdown to pointerup, or until the brush leaves the body for more than 120 ms. A direction reversal (the dx sign flips over 0.05S) starts a new stroke.
- **Debris:**
  - Placement: random points inside the back region, at least 0.09S apart, using Math.random (no seed needed).
  - Snowflake ❄: 1 pass, 10 points.
  - Leaf 🍂: 2 passes, 20 points. After the first pass it tilts 30° and shifts slightly.
  - Golden snowflake ✨❄: appears with 25% chance from round 3, at most one per round. 1 pass, 50 points, and it also lowers T by 15.
  - A pass is counted when a good-direction segment (dx × goodDir > 0, |dx| > |dy|, length > 2 px) passes within 0.07S of the debris. Each debris piece counts at most once per stroke.
  - Removed debris flies off in the brush direction with gravity and fades over 0.5 s.
- **Debris per round:** min(6 + 2r, 20). Leaves make up min(0.15 × r, 0.5) of the count (rounded).
- **Timer:** 30 s per round, shown as a shrinking ring.
  - At ≤ 8 s the ring turns blue and the hedgehog shivers.
  - At 0 the hedgehog sneezes ("에취!") and curls up: game over (cause: cold).
- **Round bonus:** 50 × r, plus remaining seconds × 10 (rounded down), plus a calm bonus of 100 if T < 30 at clear (toast "평온 보너스 +100").
- **Score:** debris points plus round bonuses. The best score is compared and saved on game over.

## Controls

- **Pointer:** drag on the hedgehog to brush. A soft brush cursor (a round bristle circle) follows the pointer while it is down. Tap buttons to use them.
- **Keyboard:**
  - Arrow keys move the brush cursor at a fixed 0.8 vMax (always comfortable).
  - Holding Shift doubles the speed (risky).
  - Hold Space to brush. Releasing Space ends the stroke.
  - Enter starts or retries. M toggles sound. P or Escape pauses.
  - Call `preventDefault` on arrows, Space and Enter.
- **Touch and layout:** the play canvas has `touch-action:none`. All buttons are at least 48 px tall. Pointer capture on pointerdown keeps the stroke alive if the finger slides slightly outside.

## Screens and visuals

- **Palette:**
  - Night sky gradient: #1b2340 to #2c3a63.
  - Porch floor: #6b4a3a. Mat: #c9a27e with #a8825e stripes.
  - Lamp glow: radial #ffd89a at 25% alpha.
  - Hedgehog: body #8b6a50, quills #5a4334 with light tips #d9c2a5, face and belly #f1dcc4, nose #2b2226, cheeks #f4a6a0 at 60% alpha.
  - UI: text #fff8ee, primary button #ff8a5b, bar colors green #7ed6a0, orange #ffb347, red #ff5d5d, timer blue #7fb8ff.
- **Hedgehog drawing (canvas):**
  - An ellipse body with 40–60 quills drawn as short tapered strokes, all angled toward the tail. Quill length scales with T as described above.
  - A small rounded snout with a nose dot, a dot eye (a half-closed arc when calm and T < 20) and tiny feet.
  - Curled state: a circle of 0.55S with radial quills and the face hidden.
- **Calm feedback:** while calm brushing continues for more than 1 s, tiny ♪ notes rise from the head every 0.6 s.
- **Juice:**
  - Each debris pop: 6 sparkle particles, a 1.06 scale pulse on the hedgehog for 80 ms and a score "+10" float.
  - Round clear: a 20-particle ✨ burst.
- **Background:** about 50 snow particles drifting with sine sway, DPR capped at 2, paused when hidden.
- **START:** the sleeping hedgehog in the center, the title at 28 px bold, the subtitle, the primary button, "최고 기록 {best}" and a mute toggle at the top right.
- **GAME OVER card:**
  - A centered rounded card (max width 360 px) with a cause line in 18 px, the score at 40 px bold and the best score.
  - Rounds cleared, the NEW BEST badge (a gold pill with a pop-in scale from 1.6 to 1) and the big retry button.
- **Small screens:** at 320 px wide, the HUD font is 14 px and the card uses 16 px padding.
- **Wide screens:** the hedgehog stays sized by S. The play field is centered with a maximum logical width of 520 px, and the snow covers the whole window.
- **prefers-reduced-motion:** no shake or tremble, no hop, 20 slow snow particles and 3 sparkles per pop. Tells use color and quill length only.

## Sound (off by default, Web Audio after the first gesture)

- Brush swish: band-passed noise at about 2.5 kHz. Gain follows v, capped at 0.05. It plays only while brushing on the body.
- Pop "뽀득": a 40 ms triangle wave sweeping 900 to 1400 Hz, gain 0.08. Golden snowflakes add a second note a fifth above.
- Happy hum: a soft sine at 330 Hz with a 5 Hz vibrato, gain 0.03, while calm.
- "따끔": a 60 ms square wave at 1800 Hz, gain 0.04.
- Curl "퓨슝": a 300 ms sine sweeping from 600 down to 150 Hz, gain 0.1. The sneeze is two short noise bursts before it.
- Round clear: a three-note arpeggio (C5, E5, G5), 90 ms each, gain 0.06.
- The mute setting is persisted. The mute toggle shows 🔊/🔇.

## Strings

| key | ko | en |
|---|---|---|
| appTitle | 고슴도치 눈 털어주기 | Snowy Hedgehog Brush |
| startSub | 가시 결대로 살살! 너무 세게 하면 말려요 | Brush gently with the grain. Too rough and it curls up! |
| startBtn | 살살 시작하기 | Start gently |
| best | 최고 기록 {n} | Best {n} |
| round | {r}번째 고슴도치 | Hedgehog #{r} |
| hintDir | 이쪽으로 쓸어요 | Brush this way |
| grumpy | 예민도 | Grumpiness |
| ouch | 따끔! | Ouch! |
| tooFast | 너무 빨라요! | Too fast! |
| clear | 뽀송뽀송! | All fluffy! |
| roundBonus | 라운드 보너스 +{n} | Round bonus +{n} |
| timeBonus | 시간 보너스 +{n} | Time bonus +{n} |
| calmBonus | 평온 보너스 +100 | Calm bonus +100 |
| golden | 반짝 눈송이! | Sparkle flake! |
| sneeze | 에취! | Achoo! |
| overRough | 너무 세게 해서 동그랗게 말려 버렸어요 | Too rough, so it curled into a spiky ball |
| overCold | 추워서 동그랗게 말려 버렸어요 | It got cold and curled into a ball |
| score | 점수 | Score |
| rounds | 털어 준 고슴도치 {n}마리 | Hedgehogs brushed: {n} |
| newBest | 신기록! | New best! |
| retry | 다시 하기 | Try again |
| paused | 탭해서 계속 | Tap to continue |
| soundOn / soundOff | 소리 켜기 / 소리 끄기 | Sound on / Sound off |
| keysHint | 방향키 이동 · 스페이스 누르고 쓸기 | Arrows move · Hold Space to brush |

`keysHint` shows on START only. It is small text under the button and is hidden when `matchMedia('(pointer: coarse)')` matches.

## localStorage (in try/catch, prefix `shb:`)

- `shb:best`: the best score as an integer
- `shb:sound`: "1" or "0", default "0"
- `shb:plays`: the number of games played (not shown in the UI)

## Edge cases

- Retry fully resets the score, round, T, timer, debris, particles, the stroke state and v. Sound and best score are kept.
- Resize during play: recompute S. Debris is stored in hedgehog-local normalized coordinates (relative to the body center, in units of S), so it stays on the quills. Do not reset the round.
- Pointerdown that starts on the background and then moves onto the body starts a stroke once it enters the body.
- Multi-touch: track only the first active pointerId and ignore the others.
- Pointercancel or blur ends the stroke and releases a held Space.
- Hidden tab: pause the timer, physics and audio. Clamp dt to 50 ms on resume.
- If the last debris is removed on the same frame that T reaches 100 or the timer hits 0, the round clear wins.
- Input during ROUND INTRO, ROUND CLEAR and the first 600 ms of GAME OVER is ignored, so a frantic drag cannot press retry by accident.
- When localStorage is blocked, the game works and the best score lasts only for the session.
- If `location.hash === '#demo'`, jump straight to PLAY in round 2, facing left, with 5 of 10 debris left, T = 45 and 18 s on the timer. The timer and grumpiness are frozen, for QA thumbnails only.

## Must not

- Never copy any existing brushing or petting game: no orange cat, no title or wording from those games, no biting and no jump scare. The fail state is a cute curl only.
- No network of any kind, no external fonts or images. Draw everything with canvas, plus emoji only for the ❄/🍂/✨ debris and floating text if wanted. Stay under 120 KB.
- No real-animal care claims (bathing, food or handling tips). No harm, blood or pain beyond the cartoon "따끔!".
- No alert, confirm, prompt, window.open or navigation. No sound autoplay.
- Not about sleep or hibernation (bear-hibernation already covers that), not about static electricity (static-* specs are queued), and not about snow clearing as a puzzle (snowplow-puzzle exists). The subject is the hedgehog and its quills.
- No timers or scores that depend on frame rate. All motion uses capped delta time.
