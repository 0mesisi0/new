# Idea and spec: 겨울밤 장작 백색소음 / Winter Fireside Noise Mixer

Agent: Claude (opus), planner. Design notes are merged in (palette, layout, motion, sound design).

## Concepts scored

Scores are 1–5 for: value in the first 10 seconds, originality, Korean search/share demand, and buildability in one HTML file. Maximum 20.

| Concept | Category | Score | Verdict |
|---|---|---|---|
| Snowman Stack: a snowball swings on a rope, you drop it to stack the tallest snowman before it topples | games | 5/2/3/5 = 15 | Stacking is a crowded genre, and the site already has many games. Keep it for a first-snow day |
| Shortest Day Clock: pick a Korean city to see sunrise, sunset and day length for every day of the year, with a countdown until days get longer after 동지 | learn | 3/4/3/4 = 14 | Close to winter-shadow-lab (same sun math) and dongji-dumpling-puzzle (same 동지 hook). Skip |
| **Winter Fireside Noise Mixer** | **radio** | **4/4/5/5 = 18** | **Picked.** "장작 소리", "백색소음" and "공부할 때 듣는 소리" are searched year-round and peak in winter exam and study season. Radio has only one built item so far. The subject (a cozy room on a winter night) is not covered by any item or queued spec. The stall ASMR specs are street-food stalls, not a room. It is also the unchecked "집중 라디오" backlog idea in play/ideas.md |

## Meta

- slug `winter-fireside-radio`, category `radio`, kind `tool`, aspect `9/16`, date `2026-11-25`
- tags: ko `백색소음`, `장작소리`; en `white-noise`, `fireplace`
- title: ko `겨울밤 장작 백색소음`; en `Winter Fireside Noise Mixer`
- desc ko: 장작 타는 소리, 창밖 바람, 주전자 보글보글, 벽시계 째깍, 고양이 골골송을 섞어 나만의 겨울밤 백색소음을 만들어요. 공부할 때나 잠들기 전에 틀어 두세요.
- desc en: Mix crackling logs, wind, a simmering kettle, a ticking clock, sleet and a purring cat into your own winter-night background noise for study or sleep.
- howto ko: '난로 켜기'를 누르면 소리가 나와요. 슬라이더로 소리마다 크기를 조절하고, 아이콘이나 방 안의 물건(난로, 창문, 주전자, 시계, 고양이)을 누르면 켜고 꺼요. 프리셋으로 바로 시작할 수도 있고, 수면 타이머를 맞추면 소리가 천천히 꺼져요. 키보드: Space 재생/정지, 1~6 소리 켜고 끄기, P 프리셋 바꾸기, T 타이머.
- howto en: Tap "Light the stove" to start the sound. Use the sliders to set each sound's level. Tap an icon, or the object in the room (stove, window, kettle, clock, cat), to turn its sound on or off. Presets get you started fast, and the sleep timer fades everything out gently. Keys: Space play/pause, 1–6 toggle sounds, P next preset, T timer.
- about ko: 모든 소리는 녹음 파일 없이 브라우저가 실시간으로 합성해요. 그래서 같은 장작 소리가 두 번 반복되지 않아요. 믹스 설정은 이 기기에만 저장돼요. 너무 크게 오래 듣지 마세요.
- about en: Every sound is synthesized live in your browser with no recordings, so the fire never loops the same crackle twice. Your mix is saved on this device only. Keep the volume moderate.

## Pitch

The screen shows a small dark room on a snowy night. A cast-iron wood stove glows in the corner, with a kettle on top, a wall clock, a frosted window and a cat curled on a rug.

1. The user taps "난로 켜기 / Light the stove". The flame swells, and the fire sound fades in over 1.5 s.
2. Six sounds can be layered. Every slider also changes the scene:
   - more wind tilts the snow and sways the curtain
   - more fire makes the flame taller and the floor glow wider
   - the kettle sends up steam, and the clock pendulum swings
   - the cat breathes visibly while it purrs
3. Tapping an object in the room toggles its sound, which makes the first 10 seconds playful.
4. Presets give a good mix in one tap. A sleep timer fades out and ends with a "잘 자요 / Good night" screen.

Nothing loops: crackles, bubbles and droplets are scheduled at random from a seeded PRNG.

## Flow

1. **START**
   - The room scene draws behind a translucent overlay. The fire is dim and the scene is silent.
   - Overlay content: the title, the one-line subtitle, a big "🔥 난로 켜기" button, the preset chips (picking one sets the levels but does not start audio yet) and a small volume-safety footnote.
   - The first tap on the button creates the `AudioContext`. Nothing makes sound before this.
2. **PLAYING**
   - The overlay fades out over 400 ms. The master gain ramps from 0 to the target over 1.5 s.
   - The scene sits on top (about 55% of the height) and the mixer below (about 45%).
   - The play/pause button shows ⏸.
3. **PAUSED**
   - The master gain ramps to 0 over 0.3 s, then `ctx.suspend()` runs.
   - The flame dims to 30% and snow keeps falling, so the scene stays alive.
   - A big ▶ shows in the center of the scene. The sleep timer is paused.
4. **TIMER SHEET** (inline panel, not a dialog)
   - Choices: 끄기 / 15분 / 30분 / 60분 / 90분 (Off / 15 / 30 / 60 / 90 min).
   - Picking one closes the panel. The remaining time shows on the timer button as "⏲ 29:58".
5. **SLEEP END**
   - When the timer hits 0, the master ramps to 0 over 10 s, then `ctx.suspend()` runs.
   - The flame burns down to embers over the same 10 s, and the room darkens to 60%.
   - The overlay shows "잘 자요 🌙" and a button "다시 켜기 / Light it again" that returns to PLAYING with the same mix and the timer off.

## Controls

- **Pointer:**
   - Tap the icon buttons to toggle a sound. A toggle restores the last nonzero level, or 50 if it never had one.
   - Drag the native `<input type="range">` sliders.
   - Tap scene objects to toggle their sound. Hit boxes follow the scene layout and are at least 44 px.
   - Preset chips, timer button, play/pause and the master volume slider.
- **Keys:**
   - Space or K toggles play/pause. From START, Space or Enter starts.
   - 1–6 toggle the sounds in mixer order.
   - P moves to the next preset and T moves to the next timer option.
   - ArrowUp/ArrowDown change the master volume by 5. If a range input has focus, leave the arrows to the native slider and do not intercept them.
   - M is mute. It behaves the same as pause.
- **Touch and layout:**
   - The scene canvas uses `touch-action:none`, and the mixer uses `touch-action:pan-y` but never scrolls the page.
   - All buttons are at least 44 px. `preventDefault` only for Space and the hotkeys above, and only when focus is not in a range input.
   - Range inputs keep their native keyboard and screen-reader behavior, with an `aria-label` for each sound.

## Sounds (mixer order)

All synthesis uses Web Audio. Shared buffers:

- 2 s of white noise
- 2 s of brown noise (integrated white noise, normalized)

Both loop through `AudioBufferSourceNode`. Each channel connects to its own channel gain, then a `DynamicsCompressor` (threshold −18 dB, ratio 4), then the master gain, then the destination.

- Channel gain = (level/100)² × base.
- Changing a level uses `setTargetAtTime(v, now, 0.05)`, so dragging never zips or clicks.

| # | key | icon | ko label | en label | scene object | synthesis | base |
|---|---|---|---|---|---|---|---|
| 1 | fire | 🔥 | 장작 | Logs | stove | **Rumble:** brown noise, lowpass 400 Hz, gain 0.5. **Crackles:** Poisson events at λ = 2 + 10×level/100 per s. Each one is a 5–30 ms white-noise slice through a bandpass at a random 1.5–5 kHz (Q 1), with peak 0.1–0.6 and exponential decay. **Pops:** λ 0.3/s, 40 ms, bandpass 800 Hz, peak 0.8 | 0.9 |
| 2 | wind | 🌬️ | 창밖 바람 | Wind | window and curtain | White noise through a bandpass (Q 0.7). The frequency is 450 Hz plus a 0.07 Hz sine LFO of ±250 Hz. The gain swells between 0.3 and 1.0 with a 0.11 Hz LFO. Every 6–15 s a gust ramps the gain to 1.3 for 2 s | 0.7 |
| 3 | kettle | 🫖 | 주전자 보글보글 | Kettle simmer | kettle on the stove | **Bubbles:** λ = 3 + 15×level/100 per s. Each one is a sine at 300–900 Hz gliding ×1.5 over 30–60 ms, with a 40 ms gain envelope peaking at 0.3. **Hiss:** white noise, highpass 4 kHz, gain 0.03 | 0.6 |
| 4 | clock | 🕰️ | 벽시계 째깍 | Wall clock | wall clock | Exactly 1.0 s apart on the AudioContext clock, alternating a tick (2.2 kHz) and a tock (1.6 kHz). Each one is an 8 ms bandpass noise click plus a 3 ms sine at the same pitch, peak 0.25 | 0.5 |
| 5 | sleet | 🌨️ | 창문 진눈깨비 | Sleet on glass | window glass | **Bed:** white noise, highpass 2.5 kHz, gain 0.25. **Droplets:** λ = 5 + 30×level/100 per s, 5 ms clicks at 3–6 kHz with peak 0.05–0.2 | 0.6 |
| 6 | purr | 🐈 | 고양이 골골송 | Cat purr | cat on the rug | Brown noise, lowpass 250 Hz, into an AM gain driven by a sawtooth oscillator at 25 Hz (depth 0.8). A breathing cycle schedules gain: inhale 1.6 s at 0.6 with the AM rate at 27 Hz, exhale 2.0 s at 1.0 with the AM rate at 23 Hz. Each cycle has ±10% seeded jitter | 0.8 |

**Scheduler:**

- A timer runs every 50 ms. It schedules all random events and the clock ticks between `ctx.currentTime` and a lookahead horizon.
- The horizon is 0.25 s while visible and 1.5 s when `document.hidden`, because hidden tabs throttle timers to about 1 s.
- Audio keeps playing while the page is hidden, since background listening is the point. Only the visuals pause.

The PRNG is mulberry32, seeded from `Date.now()` once per session. Determinism is not needed.

## Presets

| key | ko | en | fire | wind | kettle | clock | sleet | purr |
|---|---|---|---|---|---|---|---|---|
| fireGaze | 불멍 | Fire gazing | 85 | 10 | 20 | 0 | 0 | 0 |
| focus | 공부 집중 | Study focus | 50 | 15 | 0 | 35 | 20 | 0 |
| sleepy | 포근한 잠 | Cozy sleep | 35 | 25 | 0 | 0 | 30 | 45 |
| blizzard | 눈보라 산장 | Blizzard cabin | 60 | 80 | 25 | 20 | 50 | 0 |
| shuffle | 랜덤 섞기 | Shuffle | 2–4 random channels on at 20–80 (steps of 5), the rest at 0. Fire is always on | | | | | |

- On first visit, use fireGaze. After that, restore the saved mix.
- The active preset chip is highlighted.
- Moving any slider clears the highlight and the chip label area shows "나만의 믹스 / My mix".

## Screens and layout

- **Palette:**
  - wall #1b2030, floor #3a2a22, rug #6b3a3a with #8c5050 stripes
  - night sky in the window: a gradient from #0e1a33 to #1d2d52
  - snow #ffffff at 80% alpha
  - stove #2b2b30 with a #44444c rim
  - flame: #ffb347, #ff7a2f and core #ffe9a8
  - glow: rgba(255,150,60,0.35)
  - UI: panel #141824 at 92% alpha, text #f2efe8, muted #9aa0ad, accent #ff8a3d
- **Scene canvas** (logical 360×400, scaled to fit, DPR capped at 2):
  - Window, upper left:
    - snow particles: 25 + 0.5×sleet, angle = wind/100 × 35°
    - at sleet > 0, add thin diagonal streaks
    - frost in the corners as soft white radial gradients
    - a curtain on the right edge, swaying ±(2 + 10×wind/100) px with a 0.3 Hz sine plus gust impulses
  - Stove, lower right:
    - the glass door shows a flame of 3 layered bezier blobs
    - flame height = 0.35 + 0.65×fire/100 of the door
    - flicker uses value noise at 8 Hz
    - embers: 0–12 particles rising
    - the floor glow radius is 60 + 140×fire/100 px
    - at fire 0, show dark embers only
  - Kettle on top of the stove: steam wisps, 0–6 by kettle level, as curling translucent strokes. It gives a small jiggle on each bubble event (optional, visual only).
  - Wall clock, upper right:
    - the hands show the real local time
    - the pendulum swings with a 1 s period when clock > 0, otherwise it rests
  - Cat on the rug, center bottom:
    - a curled ellipse, a tail arc and two ear triangles in #e8a25c with #c47f3e stripes
    - breathing scale 1 ± (0.01 + 0.03×purr/100), synced to the purr cycle
    - when purr > 0, small "z" glyphs drift up
  - Tap feedback: the object pops (scale 1.08 → 1 over 160 ms) and its icon chip in the mixer flashes.
- **Mixer panel:**
  - 6 rows. Each row has an icon toggle button (48×48, dimmed when the sound is at 0), the label, a range slider (0–100, step 5) and a "%" value in tabular numbers.
  - Below the rows sits a chip row with the 5 presets, wrapping to 2 lines at 320 px.
  - Bottom bar: the master volume (🔈 slider, default 60), the timer button "⏲ 끄기" or "⏲ 29:58", and a big round play/pause button (56 px, accent color).
  - While playing, a small label shows the listen time this session: "함께한 시간 12:34 / Listening 12:34".
- **Small screens (320 px wide):** 12 px side padding. Labels shrink to 14 px and may wrap. The scene shrinks to 45% of the height.
- **Wide screens:**
  - If the width/height ratio is above 1.1, the scene goes on the left (60%) and the mixer on the right (40%, max 420 px).
  - Otherwise use a centered column with a max width of 480 px.
  - The wall color fills the rest of the window.
- **prefers-reduced-motion:**
  - flame flicker at 2 Hz with small amplitude
  - no rising embers, 12 slow snow particles, no curtain gusts
  - no pop scale on tap (use a color flash instead)
  - the pendulum still swings, since it reads as state
- **START overlay:** a panel centered over the scene with the title in 26 px bold, the subtitle, the primary button and the preset chips. A footnote below.
- **SLEEP END overlay:** a moon emoji in 48 px, "잘 자요", a small line showing the listen time, and the button.

## Strings

| key | ko | en |
|---|---|---|
| appTitle | 겨울밤 장작 백색소음 | Winter Fireside Noise Mixer |
| startSub | 장작, 바람, 고양이 골골송까지. 나만의 겨울밤 소리를 섞어 보세요 | Logs, wind, even a purring cat. Mix your own winter night. |
| startBtn | 🔥 난로 켜기 | 🔥 Light the stove |
| startFoot | 소리가 나요. 볼륨을 적당히 맞춰 주세요 | This makes sound. Keep the volume comfortable. |
| fire / wind / kettle / clock / sleet / purr | 장작 / 창밖 바람 / 주전자 보글보글 / 벽시계 째깍 / 창문 진눈깨비 / 고양이 골골송 | Logs / Wind / Kettle simmer / Wall clock / Sleet on glass / Cat purr |
| toggleAria | {name} 켜기/끄기 | Toggle {name} |
| sliderAria | {name} 크기 | {name} level |
| master | 전체 볼륨 | Volume |
| play / pause | 재생 / 일시정지 | Play / Pause |
| presets | 프리셋 | Presets |
| fireGaze / focus / sleepy / blizzard / shuffle | 불멍 / 공부 집중 / 포근한 잠 / 눈보라 산장 / 랜덤 섞기 | Fire gazing / Study focus / Cozy sleep / Blizzard cabin / Shuffle |
| myMix | 나만의 믹스 | My mix |
| timer | 수면 타이머 | Sleep timer |
| timerOff | 끄기 | Off |
| timerMin | {n}분 | {n} min |
| timerLeft | ⏲ {mm}:{ss} | ⏲ {mm}:{ss} |
| fadingOut | 소리가 천천히 줄어들고 있어요 | Fading out gently... |
| goodnight | 잘 자요 🌙 | Good night 🌙 |
| relight | 다시 켜기 | Light it again |
| listened | 함께한 시간 {mm}:{ss} | Listening {mm}:{ss} |
| allZero | 소리를 하나 켜 보세요 | Turn on a sound to begin |
| noAudio | 이 브라우저에서는 소리를 낼 수 없어요. 방 구경은 할 수 있어요 | This browser can't play sound here, but you can still enjoy the room. |
| resumeBtn | ▶ 다시 재생 | ▶ Resume |
| sound / mute | 소리 켜기 / 음소거 | Sound on / Mute |

`<html lang>` is set from `?lang=` and falls back to `navigator.language` (ko if it starts with "ko", else en).

## localStorage (in try/catch, prefix `wfr:`)

- `wfr:mix`: a JSON array of 6 integers (0–100). Saved 300 ms after the last change.
- `wfr:last`: a JSON array of the 6 last nonzero levels, used when toggling a sound back on.
- `wfr:master`: 0–100, default 60.
- `wfr:preset`: the last preset key or "custom".
- `wfr:timer`: the last chosen minutes (0, 15, 30, 60, 90). It is only pre-highlighted in the sheet and never auto-starts.

Do not store listen history or timestamps.

## Edge cases

- **AudioContext missing or creation throws:** show `noAudio` in the mixer area. The scene and sliders still work visually, and there are no JS errors.
- **iOS or OS audio interruption:**
  - On `visibilitychange` back to visible while the state is PLAYING, call `ctx.resume()`.
  - If `ctx.state` is still not "running" after 300 ms, show `resumeBtn` over the scene. Tapping it resumes inside a user gesture.
- **All six levels at 0 while playing:** keep the context running and show the `allZero` hint under the mixer. The flame is just embers.
- **Timer and pause:**
  - The timer counts only while PLAYING.
  - Pausing during the 10 s fade cancels the fade and the timer.
  - Changing the timer during the fade restores the master to its target over 0.5 s.
- **Master volume:** changes ramp with `setTargetAtTime(…, 0.05)`. The ramp from 0 at start is capped by the current master value.
- **Rapid toggling or slider spam:** only gain params change. Event schedulers read the current level when they schedule, and sources are never recreated.
- **Node cleanup:** every one-shot node (crackle, bubble, tick, droplet) gets `onended` → `disconnect()`, so memory stays flat over hours.
- **Hidden page:**
  - `requestAnimationFrame` stops naturally and audio continues with the long lookahead.
  - On return, cap the delta at 50 ms and do not try to catch up on particles.
- **Resize or orientation change:** recompute the layout and the canvas size and rebuild the hit boxes. Audio state is untouched.
- **Shuffle:** never produces the same mix twice in a row (reroll once if equal) and never sets fire to 0.
- **Restoring a saved mix:** clamp each value to 0–100, round to steps of 5, and if the array is the wrong length or invalid JSON, fall back to fireGaze.
- **`location.hash === '#demo'`:**
  - Apply the blizzard preset visually, set the state to PLAYING without creating audio, and hide the START overlay.
  - The timer shows "⏲ 29:58" and the listen time shows "12:34".
  - This is for QA thumbnails only: headless QA has no gesture, so no AudioContext.

## Must not

- No recorded audio files, no network of any kind, no external fonts. Everything is synthesized. Stay under 120 KB.
- No autoplay. Nothing sounds before the user taps start, and the master never jumps (it always ramps).
- No claims of health, sleep-therapy, focus-improvement or medical benefits, and no "ASMR therapy" wording. It is just cozy background sound.
- Do not imitate the look, names or preset names of any existing ambient-noise app or website. No brand stoves, kettles or clocks.
- Fire stays in the stove. No house-fire, burn or danger humor. The cat is always calm and safe.
- No alert, confirm, prompt, window.open or navigation. Hotkeys must not steal arrow keys from a focused slider.
- No default master above 60. No sudden loud events: the compressor stays on and the per-event peaks in the sound table are hard caps.
