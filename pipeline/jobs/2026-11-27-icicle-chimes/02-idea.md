# Idea and spec: 고드름 실로폰 / Icicle Chimes

## Concepts scored

Scores are 1–5 for: value in the first 10 seconds, originality, Korean search/share demand, and buildability in one HTML file. Maximum 20.

All three research directions are already taken: page smashing is queued as `page-smash`, the 정미년 fortune as `new-year-fortune-2027`, and the year-end card-spending calculator as `card-deduction-calculator-2026`. So the three concepts below use new subjects.

| Concept | Category | Score | Verdict |
|---|---|---|---|
| 만 나이 계산기 2027: 만 나이, 연 나이, 학년 at once | tools | 4/2/5/5 = 16 | Strong search demand but lots of copies already exist. Keep it for January. |
| 연말 택배 트럭 싣기: a puzzle that packs boxes into a truck before the delivery rush | games | 4/3/3/4 = 14 | Real tension in the box physics, but the subject is close to gift wrap. Hold it. |
| **고드름 실로폰** | **cool** | **5/4/3/5 = 17** | **Picked.** It makes a sound the moment you touch it. Nobody has used icicles as a subject. You tune your own chimes by letting icicles grow and melting them down, so you want to stay and play. |

## Meta

- slug `icicle-chimes`, category `cool`, kind `tool`, aspect `9/16`, date `2026-11-27`
- tags: ko `고드름`, `실로폰`, `겨울`; en `icicle`, `chimes`, `winter`
- title: ko `고드름 실로폰`; en `Icicle Chimes`
- desc ko: 처마 끝에 매달린 고드름을 톡 치면 맑은 소리가 나요. 물방울에 고드름이 자라면 음이 낮아지고, 꾹 눌러 녹이면 음이 높아져요. 나만의 겨울 풍경을 조율해 보세요.
- desc en: Tap the icicles hanging from the eaves to make them ring. Drips grow them lower, and holding melts them higher, so you can tune your own winter chimes.
- howto ko: 고드름을 톡 치면 소리가 나고, 옆으로 쓸면 연달아 울려요. 꾹 누르고 있으면 고드름이 녹아 짧아지고 음이 올라가요. 가만히 두면 물방울이 떨어져 고드름이 자라고 음이 내려가요. 너무 길어지면 툭 부러져요. 키보드 A S D F G H J로도 칠 수 있어요.
- howto en: Tap an icicle to ring it, or swipe across to strum. Hold an icicle to melt it shorter and raise its pitch. Left alone, drips make the icicles grow and sound lower, and an icicle that gets too long snaps off. Keys A S D F G H J play the icicles too.
- about ko: 소리는 모두 브라우저에서 바로 합성해요. 음은 5음계라서 아무렇게나 쳐도 잘 어울려요. 조율한 고드름은 이 기기에만 저장돼요.
- about en: Every sound is synthesized live in your browser. The notes come from a pentatonic scale, so any order sounds nice. Your tuning is saved on this device only.

## Pitch

It is a quiet winter night. Seven icicles hang from the eaves of a small rooftop drawn in navy, with a moon and falling snow behind it.

1. A tap rings an icicle like glass and the icicle sways. A swipe sets off a glissando.
2. Every few seconds a drop of water forms at a tip and falls, and one icicle grows by one step. A longer icicle plays a lower note.
3. Holding an icicle melts it. It shrinks while a steam effect rises, and its note goes up.
4. An icicle that grows past the limit snaps off with a crack and a shattering tinkle, then grows back from a short stub.

There is no win or loss. It is a toy you play with and tune into your own wind chime. The tuning is saved.

## Flow

1. **START** (overlay)
   - Shows the title, a one-line subtitle and a big "톡 쳐서 시작" button. Behind the overlay, the icicles are already drawn and the snow is falling.
   - Any tap or key starts the AudioContext and closes the overlay. That first tap also rings the icicle under the pointer, if there is one.
2. **PLAY** (the main screen, open-ended)
   - The top bar has the 🔊/🔇 mute toggle, the ❄️ growth toggle (자라기 켜기/끄기) and the ↺ reset button (처음 모양).
   - Bottom hint, which fades after 6 s: "꾹 누르면 녹아요 · 그냥 두면 자라요".
   - Growth: every 6–10 s (random), one icicle chosen at random grows one level, shown by a falling drop. The interval is computed with delta time.
   - Snap: when an icicle at level 10 would grow again, it breaks. The broken piece falls, spins and shatters into ice particles at the bottom of the screen, and that icicle resets to level 2.
3. **RESET**
   - ↺ returns all icicles to the default tuning [3,4,5,6,5,4,3]. There is no confirmation dialog; instead the icicles shake for 120 ms.

## Icicle model

- 7 icicles. Each has a level L from 1 to 10. L1 is the shortest and highest, and L10 is the longest and lowest.
- Length: len = H × (0.10 + 0.045 × L), where H = the height of the play area. Width scales with length, with a minimum of 18 px.
- Pitch: a C major pentatonic scale across two octaves. Level L plays note index (10 − L) of [C5, D5, E5, G5, A5, C6, D6, E6, G6, A6] reversed, so L10 = C5 and L1 = A6.
  - Frequencies: C5 523.25, D5 587.33, E5 659.25, G5 783.99, A5 880, C6 1046.5, D6 1174.66, E6 1318.51, G6 1567.98, A6 1760.
- Melting: holding for 600 ms lowers the level by 1 and triggers a short rising "sizzle". Keep holding and the level drops one step every 600 ms. Melting stops at L1, where the icicle makes a small "fizzle" and wobbles.
- Hit area: the icicle's polygon plus 12 px of padding. Horizontally, each icicle covers the full width of its own column, so a 320 px screen still gives tap targets wider than 44 px.

## Controls

- **Pointer down** on an icicle rings it immediately and starts the melt hold timer.
- **Pointer move** while pressed: when the pointer enters a new icicle column, that icicle rings and the hold timer resets. This is the strum.
- **Pointer up or cancel** stops melting.
- **Keys:** A S D F G H J ring icicles 1–7. Shift plus a key melts that icicle one level per press. M toggles mute, R resets, and Space or Enter closes the start overlay.
- Multi-touch: each `pointerId` is tracked separately, so two fingers can play two notes at once.
- `touch-action: none` on the play area and `preventDefault` on the play keys.

## Sound (Web Audio, created only after a gesture)

- **Ring:** two sine oscillators, at f and f × 2.76 (an inharmonic overtone) with gain 0.3. Attack 5 ms, exponential decay 1.6 s, master gain 0.18. A short 2 ms noise click on top.
- **Sizzle:** 300 ms of bandpass-filtered noise with the filter sweeping 2 kHz → 5 kHz, gain 0.05.
- **Snap:** a 40 ms crack (high-pass noise) followed by 6 random high rings (2–4 kHz, 0.3 s decay) spread over 0.4 s.
- **Drop:** a 60 ms sine sweeping 1.2 kHz → 600 Hz, gain 0.03.
- Stop old voices when more than 16 play at once. When muted, set the master gain to 0 but keep the visuals running.

## Visual design

- **Palette:**
  - night: a gradient from #0f1a2e to #22345a
  - moon: #f4f1de with a 30 px blur glow
  - roof: #2b2f3a, with its edge in #3d4352 and a white snow cap on top (#eef3fa)
  - icicles: a linear gradient from rgba(220,240,255,0.95) to rgba(150,200,240,0.55), a 1 px white highlight line on the left, and a sparkle at the tip
- **Layout:**
  - the roof edge sits at 22% of the screen height
  - the 7 icicles are spaced evenly inside min(100vw, 520px)
  - on wide screens the scene is centered and the background and snow fill the whole window
- **Feedback:**
  - a struck icicle sways ±4° on a spring with a 0.8 s damped decay and flashes brighter for 120 ms
  - a ring-shaped ripple spreads from the point of contact
  - a small note name (e.g. "G5") rises above the icicle and fades out (font 12 px, alpha 0.6)
  - melting shows white steam particles going up and the tip dripping
  - a snap shakes the screen by 3 px for 100 ms
- **Snow:** about 50 particles with sine drift, DPR capped at 2, and the canvas recomputed on `resize`.
- **prefers-reduced-motion:** no sway or screen shake, ripples only, and 15 slow snow particles.
- **Small screens:** at 320 px, the top bar buttons are 44 px each, the title is hidden and only the icons show.

## Strings

| key | ko | en |
|---|---|---|
| appTitle | 고드름 실로폰 | Icicle Chimes |
| startSub | 처마 끝 고드름을 톡 쳐 보세요 | Tap the icicles on the eaves |
| startBtn | 톡 쳐서 시작 | Tap to start |
| hint | 꾹 누르면 녹아요 · 그냥 두면 자라요 | Hold to melt · leave them to grow |
| keyHint | 키보드 A S D F G H J | Keys A S D F G H J |
| soundOn / soundOff | 소리 켜기 / 소리 끄기 | Sound on / Sound off |
| growOn / growOff | 자라기 켜기 / 자라기 끄기 | Growing on / Growing off |
| reset | 처음 모양 | Reset tuning |
| resetDone | 처음 모양으로 돌아왔어요 | Back to the original tuning |
| snapped | 툭! 고드름이 부러졌어요 | Snap! An icicle broke off |
| tooShort | 더 녹이면 사라져요 | Any more and it's gone |
| snapCount | 부러진 고드름 {n}개 | Icicles snapped: {n} |

The toasts (resetDone, snapped, tooShort) last 1.4 s, and only one shows at a time. snapCount is a small gray label at the bottom right.

## localStorage (in try/catch, prefix `icc:`)

- `icc:levels`: a JSON array of 7 integers from 1 to 10. Validate it on load and fall back to the default if it is invalid.
- `icc:sound`: "1" or "0", default "1". Sound still starts only after the first gesture.
- `icc:grow`: "1" or "0", default "1"
- `icc:snaps`: the cumulative snap count

## Edge cases

- When the page is hidden, pause the growth timer and the rAF loop, and clamp delta to 50 ms. Do not grow everything at once when the user comes back.
- If the AudioContext is `suspended`, call `resume()` on the next gesture.
- Recompute the layout on resize and keep the levels. A pointer that was pressed during a resize is released.
- If you hold an icicle while it is in the middle of growing, melting wins and the growth goes to a different icicle.
- If the falling animation of a snapped icicle is still running when another snap happens, run up to 3 at once and drop anything beyond that.
- When localStorage is blocked, everything still works with the default tuning.
- If `location.hash === '#demo'`, set the levels to [2,4,6,8,6,4,2], skip the start overlay, and freeze one icicle mid-sway with a ripple and the note label showing. This is for QA thumbnails only. Sound stays off.

## Must not

- No network of any kind, no audio files, and no external fonts.
- Do not copy existing songs or melodies: no auto-play or follow-along mode with known tunes. Free play only.
- No danger warnings or real safety advice about icicles. It is a toy.
- No alert, confirm, prompt, window.open or navigation, and no sound autoplay.
- Do not copy the look of the existing `thin-ice-puddle`, `crank-carol-music-box` or `bear-hibernation`. Icicles under the eaves are the main subject.
