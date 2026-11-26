# Idea and spec: 겨울밤 로파이 라디오 / Snowy Night Lo-fi Radio

## Concepts scored

Each concept is scored 1–5 on four things: value in the first 10 seconds, originality, Korean search/share demand, and whether it can be built in one HTML file. The maximum is 20.

| Concept | Category | Score | Verdict |
|---|---|---|---|
| Winter Houseplant, Once a Day: a plant on a cold windowsill that you can tend only once a day, and it changes overnight (the "Dog Online"-style daily visit from research #4) | games | 2/4/3/3 = 12 | The first 10 seconds are weak because the payoff comes tomorrow, and headless QA can't really test a once-a-day loop. Keep it for later. |
| Breath Cloud Doodles: hold a button to breathe out in the cold air and the clouds drift into shapes | cool | 4/3/2/5 = 14 | Easy to build, but people don't search for it and it is close to the queued window-fog doodles in feel. |
| **Snowy Night Lo-fi Radio** | **radio** | **4/4/5/4 = 17** | **Picked.** It comes from the backlog ("로파이 라디오") and it's a new subject: generated music, which is different from the existing noise mixer, music box and ASMR items. Korean searches like "공부할 때 듣는 음악" and "로파이" stay high all year and peak around exams and late December nights. The page is useful in one tap, and people come back to it. |

## Meta

- slug `snowy-lofi-radio`, category `radio`, kind `tool`, aspect `9/16`, date `2026-11-26`
- tags: ko `로파이`, `공부할 때 듣는 음악`, `작업용 음악`; en `lofi`, `study music`, `generative music`
- title: ko `겨울밤 로파이 라디오`; en `Snowy Night Lo-fi Radio`
- desc ko: 브라우저가 실시간으로 만드는 끝없는 로파이 비트. 공부·작업할 때 틀어 두세요. 같은 곡은 두 번 나오지 않고, 마음에 든 곡은 ♥로 저장해 다시 들을 수 있어요.
- desc en: Endless lo-fi beats composed live in your browser while snow falls outside the window. Keep it on for study or work, and heart a track to replay it later.
- howto ko: '라디오 켜기'를 누르면 음악이 시작돼요. 분위기(포근·졸림·집중)를 고르고, 드럼·베이스·건반·멜로디·LP 잡음을 켜고 끌 수 있어요. 스페이스는 재생/정지, N은 다음 곡, ↑↓는 볼륨, 1~5는 악기 켜고 끄기예요. 수면 타이머를 맞추면 소리가 천천히 줄어들다 꺼져요.
- howto en: Tap "Turn on the radio" to start. Pick a mood (Cozy, Sleepy or Focus) and switch the drums, bass, keys, melody and vinyl crackle on or off. Space plays or pauses, N skips, ↑↓ change the volume and 1–5 toggle the layers. The sleep timer fades the music out.
- about ko: 녹음된 음원은 하나도 없어요. 모든 소리는 Web Audio로 그 자리에서 합성되고, 곡마다 코드 진행·박자·멜로디가 새로 정해져요. 아이폰은 무음 모드를 끄면 소리가 나요.
- about en: There are no recordings at all. Every sound is synthesized on the spot with Web Audio, and each track gets its own key, chords, groove and melody. On iPhone, turn off silent mode to hear it.

## Pitch

The page is a dark winter night seen through a window. Snow falls on an apartment block where lit windows flicker on and off. A cream-colored desk radio sits on the windowsill next to a mug that steams gently.

1. One tap turns the radio on. Warm electric-piano chords, a soft bass and a swung, dusty drum beat start, with vinyl crackle underneath.
2. Every track is generated from a 32-bit seed: key, tempo, chord progression, drum pattern and melody. Each track has a made-up cozy title such as "눈 내리는 귤 / Snowy Tangerine".
3. After 32 bars (about 1.5–2 minutes) the radio "turns the dial": a filter sweep, a short tuning noise, and then the next track. It never ends.
4. ♥ saves the seed, so a favorite track can be played again later. A sleep timer fades the music out.

## Flow

1. **OFF (start)**
   - The scene is dimmed and the snow is slow. The radio display reads `OFF`.
   - The title, a one-line subtitle and a big primary button "📻 라디오 켜기" are centered over the lower half.
   - The footnote reads "소리가 나요. 볼륨을 확인해 주세요 · 아이폰은 무음 모드를 꺼 주세요".
   - Tapping the button (or pressing Enter or Space) creates and resumes the AudioContext and starts the first track. If `slr:last` exists, that seed is used; otherwise a random one.
2. **ON (playing)**
   - The scene brightens over 600 ms, the radio display lights up amber and the VU needle moves with the music.
   - The display shows a station line, a scrolling marquee of `♪ {title}`, the seed code `#XXXXXXXX` and a bar progress strip of 32 cells.
   - The control panel sits below the scene (see Screens).
3. **PAUSED**
   - Master gain ramps to 0 in 150 ms, then `ctx.suspend()`. The display shows `⏸` and the needle settles to rest.
   - Resuming continues the same track at the next bar boundary, with the bar index kept.
4. **TRACK CHANGE** (automatic at bar 33, from N/⏭, or after a mood change)
   - Master lowpass sweeps to 500 Hz over 0.4 s, then 0.35 s of tuning noise plays (bandpassed noise with its center frequency swept from 800 to 2400 Hz).
   - The new track starts, and the lowpass sweeps back to that track's warmth over 0.6 s.
   - The marquee changes with a 200 ms fade.
5. **SAVED LIST** (a drawer from the ♥ count button)
   - The drawer slides up over the panel and lists up to 20 saved tracks, newest first, as `♪ {title} · {mood}`.
   - Tapping a row plays that seed with its saved mood, through a dial change. ✕ deletes the row with no confirmation, and an undo toast appears for 4 s.
   - "닫기", Esc or tapping outside closes the drawer.

## Screens and layout

The root is `100dvh`, and the page never scrolls.

- **Scene (top, 46% of the height; at least 200 px, at most 420 px)**
  - A full-width canvas with the window frame drawn as two vertical mullions in a dark wood color.
  - The outside sky is a gradient from #141a2e to #2b2f55, with 2–3 apartment block silhouettes (#0f1324) and about 36 window rectangles.
  - Each window is lit amber #ffb86b at 25–90% alpha. Every 2 bars, 1–3 windows toggle on or off.
  - Snow: 70 particles in front of the buildings, with sine drift and a fall speed of 18–40 px/s.
  - The windowsill is a band across the bottom 18% of the scene.
  - The radio is a rounded rectangle in cream #f4ead5 with a grille of dots on the left and a display window in #2a1d10 that shows amber text, drawn in DOM over the canvas so the text stays crisp.
  - The VU needle is a small arc meter on the radio. Its RMS comes from the AnalyserNode, smoothed with 0.85 smoothing.
  - The mug sits on the right with 3 steam wisps (bezier curves with alpha drifting upward).
  - The lit windows pulse 6% brighter on each kick (only when not in reduced motion).
- **Display (DOM, inside the radio)**
  - Line 1 shows the station `하루한판 FM · 겨울밤 로파이`.
  - Line 2 shows the marquee `♪ {title}`, which scrolls only if it overflows.
  - Line 3 shows `#{seed hex}` and `{bar}/32`, followed by a strip of 32 tiny cells.
  - The font is `ui-monospace, "Courier New", monospace` for codes and numbers and system-ui for Korean.
- **Panel (bottom, internal scroll if needed, max-width 480 px, centered)**
  1. **Transport row:** [⏯ 재생/정지 (64 px circle, primary)] [⏭ 다음 곡] [♥ 저장] [📋 복사]. Each button is at least 48 px.
  2. **Mood segmented control:** `☕ 포근` `🌙 졸림` `📖 집중`, with the active one filled.
  3. **Layer chips** (5 toggles in a wrapping row, each at least 44 px tall): `🥁 드럼` `🎸 베이스` `🎹 건반` `🎶 멜로디` `📀 LP 잡음`. When a chip is off, it shows a strikethrough and 40% opacity.
  4. **Volume slider:** a native `<input type="range">` from 0 to 100, labeled with 🔈/🔊.
  5. **Bottom row:** [⏲ 타이머: 끄기] cycles through 끄기 → 15분 → 30분 → 60분 → 끄기 and shows the remaining `mm:ss` while it runs. [♥ {n}] opens the saved list. A small gray line shows the total listening time `누적 {h}시간 {m}분`.
- **Toast:** bottom-center, 2.2 s, with `aria-live="polite"`.
- **At 320 px wide:** the scene takes 40% of the height, the chips wrap to 3+2, and the side padding is 12 px.
- **Wide or desktop:** the scene stays full width at 46% of the height and the panel stays a centered 480 px column. On screens of 900 px or more in landscape, the scene goes on the left (60% width) and the panel on the right.
- **Palette:** navy #141a2e and #2b2f55, panel #1b2036 with card #252b45, text #f4ead5, muted #9aa0b8, amber #ffb86b, accent #ff7a59 for ♥ and the primary button.
- **prefers-reduced-motion:** 20 slow snow particles, no window flicker or kick pulse, no marquee (the title is truncated with an ellipsis and has a full `title` attribute), no steam motion, and the needle moves with heavy smoothing (0.95).

## Controls

- **Pointer:** tap or click everything. The volume uses the native slider. The scene canvas has `touch-action:none`, and a tap on the scene toggles play or pause. The panel has `touch-action:pan-y`.
- **Keys** (preventDefault for all of these):
  - Space or K: play or pause
  - Enter: on OFF, turn the radio on
  - N or →: next track
  - ↑/↓: volume ±5
  - 1–5: toggle a layer (drums, bass, keys, melody, vinyl)
  - Q/W/E: mood Cozy, Sleepy, Focus
  - H: ♥ save
  - C: copy
  - T: cycle the timer
  - L: open or close the saved list
  - Esc: close the drawer
- Every control has an `aria-label` and `aria-pressed` where it is a toggle.

## Audio engine

### Graph (built once, on the first gesture)

```
voices ─▶ layerGain[drums|bass|keys|melody|vinyl] ─▶ busLP (BiquadFilter lowpass, Q 0.7)
  ─▶ wowDelay (DelayNode 0.02 max; delayTime 0.004, LFO 0.55 Hz × 0.0012 via OscillatorNode→GainNode→delayTime)
  ─▶ comp (DynamicsCompressor: threshold −18, knee 12, ratio 3, attack 0.01, release 0.25)
  ─▶ master (GainNode = (vol/100)² × 0.9) ─▶ analyser (fft 256) ─▶ destination
```

- Create one noise buffer (2 s of white noise, mono) and reuse it for snare, hat, crackle, hiss and tuning noise.
- Every voice disconnects in `onended`. At most 48 sources may be live at once: if a new voice would exceed that, skip it, except kick and bass, which always play.

### Scheduler

- The usual lookahead pattern: `setInterval(tick, 25)`, and schedule all 16th steps whose time is before `ctx.currentTime + ahead`.
- `ahead` is 0.12 s while visible and 1.5 s while `document.hidden`. Hidden audible tabs are exempt from heavy timer throttling, and the bigger lookahead covers the 1 s clamp.
- Audio keeps playing when the tab is hidden, as a radio should. Only the canvas drawing stops.
- One 16th note lasts `60 / bpm / 4` seconds.
- Swing: odd 16ths are delayed by `swing × 16th`.
- Humanize: velocity × (0.85–1.15) and timing ±6 ms, except the kick on step 0, which stays on the grid.

### Per-track parameters (seeded)

The seed is a uint32. `rngT = mulberry32(seed)` is drawn in this fixed order:

1. **Key:** the root comes from `[48 C, 50 D, 51 Eb, 53 F, 55 G, 56 Ab, 58 Bb]`. Major scale semitones are `[0,2,4,5,7,9,11]`.
2. **Tempo:** an integer bpm in the mood range.
3. **Progression:** 4 bars, one chord per bar, looped. The options are given as scale degrees:
   - A `[2,5,1,6]` ii–V–I–vi
   - B `[1,6,2,5]`
   - C `[4,3,2,1]`
   - D `[6,4,1,5]`
   - E `[1,4,3,6]`
   - F `[4,5,3,6]`
4. **Drum pattern** from the mood's pool (16 steps):
   - **D1:** kick 0, 7, 10; snare 4, 12; hat on even steps
   - **D2:** kick 0, 3, 8, 11; snare 4, 12; hat on even steps, plus ghost hats on 14 and 15 at velocity 0.4
   - **D3:** kick 0, 6, 9; snare 4, 12, plus a ghost snare on 15 at 0.3; hat on 0, 2, 4, 6, 8, 10, 12, 14 with an open hat on 6 (decay 0.18 s)
   - **D4** (half-time): kick 0, 10; snare 8; hat 0, 4, 8, 12
5. **Comp rhythm** (the steps where the keys chord hits):
   - R1 `[0]`: held for the whole bar
   - R2 `[0,6]`
   - R3 `[0,3,10]`
   - R4 `[2,10]`
6. **Swing:** 0.18–0.33.
7. **Warmth:** the busLP cutoff, chosen from the mood range.
8. **Title A index**, from 0 to 11.
9. **Title B index**, from 0 to 11.
10. **Track number:** 1–99.

The melody, humanize, vinyl crackle and window-flicker draws come from a second PRNG, `rngM = mulberry32(seed ^ 0x9E3779B9)`. It is drawn once per 16th step in a fixed amount, whether or not a layer is muted. That way a replayed favorite sounds identical from bar 1, as long as playback hasn't been paused. If the radio is paused and resumed, it continues from the current rngM state.

### Moods

| mood | ko / en | bpm | drum pool | comp pool | melody p (per 8th) | warmth Hz |
|---|---|---|---|---|---|---|
| cozy | ☕ 포근 / ☕ Cozy | 74–84 | D1, D2 | R2, R3 | 0.22 | 3200–4200 |
| sleepy | 🌙 졸림 / 🌙 Sleepy | 62–70 | D4 | R1, R2 | 0.12 | 1800–2600 |
| focus | 📖 집중 / 📖 Focus | 80–88 | D2, D3 | R3, R4 | 0.10 | 2800–3600 |

Changing the mood starts a new random track in that mood through a dial change.

### Voices

`f(m) = 440 × 2^((m−69)/12)`

- **Keys (Rhodes-ish):**
  - Chord tones are built on the scale degree using diatonic qualities: I and IV maj7 `[0,4,7,11]`; ii, iii and vi m7 `[0,3,7,10]`; V dom7 `[0,4,7,10]`.
  - Add the 9th (+14) with probability 0.5 on maj7 and m7 chords. This is drawn per track for each of the 4 bars.
  - Voicing: shift each note by octaves into MIDI 55–74.
  - Each note is a sine at f plus a triangle at f detuned by +5 cents (gain 0.35), through a per-note lowpass at 2200 Hz.
  - Envelope: attack 8 ms, peak 0.09 per note × velocity, exponential decay to 30% over 1.2 s, held until the next hit or the end of the bar, then a 0.25 s release.
  - With R1, the chord sustains for the whole bar.
- **Bass:**
  - A sine plus a triangle at 0.3 gain, through a lowpass at 420 Hz. MIDI range 36–48.
  - The root plays on step 0 (length 6 sixteenths). Step 10 plays the fifth or the root (50/50, length 4).
  - With probability 0.3, step 14 plays a chromatic approach note one semitone below the next bar's root (length 2).
  - Attack 10 ms, gain 0.22, release 80 ms.
- **Kick:** a sine with pitch going from 120 Hz to 45 Hz over 0.12 s, gain 0.9 decaying over 0.28 s.
- **Snare:** noise through a bandpass at 1800 Hz (Q 0.8, gain 0.35, decay 0.16 s), plus a sine body at 185 Hz (gain 0.2, 0.08 s).
- **Hat:** noise through a highpass at 7000 Hz, gain 0.10, decay 0.035 s (open hat 0.18 s).
- **Melody:**
  - The notes are the major pentatonic of the key `[0,2,4,7,9]`, spread over MIDI 67–84.
  - It is decided on 8th-note steps. At each 8th, a note starts with probability p.
  - Pitch is a random walk of ±1 or ±2 pentatonic indices. On step 0 of a bar, snap to the nearest chord tone.
  - Length is 1–3 eighths. The voice is a triangle through a lowpass at 1600 Hz, attack 15 ms, gain 0.07, with 4 Hz vibrato of ±6 cents after 150 ms.
  - The melody plays only in bars 5–12 and 17–24.
- **Vinyl:**
  - Hiss: the looped noise buffer through a bandpass at 3000 Hz (Q 0.5) at gain 0.012.
  - Crackle: a Poisson process at about 6 per second, decided per 16th by rngM. Each crackle is a 2–4 ms noise burst at gain 0.02–0.08 through a highpass at 2000 Hz.
  - The vinyl layer also plays during the OFF→ON fade-in and during dial changes.

### Track form (32 bars)

| bars | what plays |
|---|---|
| 1–4 | Intro: keys, vinyl and bass from bar 3. The drums play with a layer lowpass at 900 Hz. |
| 5–12 | Full band plus melody |
| 13–16 | Full band, no melody |
| 17–24 | Full band plus melody |
| 25–30 | Full band, no melody, with hats at 0.7 velocity |
| 31–32 | Outro: the drums drop out and the keys hold R1 |
| 33 | Dial change to a new random track in the current mood |

The intro drum filter is a separate BiquadFilter on the drum layer: it sits at 900 Hz in bars 1–4 and ramps to 18000 Hz at bar 5.

### Layers, volume, timer

- **Layer toggle:** ramp that layer's gain to 0 or 1 over 0.3 s. At least one layer must stay on. If the user turns off the last one, show the toast `layerMin` and ignore the toggle.
- **Volume:** ramp master over 0.05 s. Volume 0 is allowed, and the display shows `🔇`.
- **Sleep timer:**
  - It counts down only while playing. Pause clears it, resets it to off and shows the toast `timerCleared`.
  - At 0, master ramps to 0 over 8 s, then the radio pauses, the toast `timerDone` appears and the timer goes back to off.

## Track titles

The title is `{A} {B}` in both languages, followed by ` · Track {nn}` in a smaller style.

| # | A ko | A en | B ko | B en |
|---|---|---|---|---|
| 0 | 눈 내리는 | Snowy | 귤 | Tangerine |
| 1 | 졸린 | Sleepy | 머그컵 | Mug |
| 2 | 느린 | Slow | 가로등 | Streetlight |
| 3 | 따뜻한 | Warm | 목도리 | Scarf |
| 4 | 조용한 | Quiet | 버스 정류장 | Bus Stop |
| 5 | 퇴근길 | Homebound | 보리차 | Barley Tea |
| 6 | 일요일 밤의 | Sunday Night | 창가 | Windowsill |
| 7 | 작은 | Little | 편지 | Letter |
| 8 | 늦은 | Late | 털양말 | Wool Socks |
| 9 | 포근한 | Cozy | 골목 | Alley |
| 10 | 반쯤 식은 | Half-Cooled | 전기장판 | Heated Blanket |
| 11 | 새벽 | Dawn | 눈사람 | Snowman |

## Seed and favorites

- A new random track uses `seed = crypto.getRandomValues(new Uint32Array(1))[0]`, falling back to `Math.random() * 2**32 >>> 0`.
- The seed is shown as 8 uppercase hex digits.
- **♥ save:**
  - Store `{s: seed, m: mood}` in `slr:favs`, newest first, at most 20.
  - If the seed is already saved, show the toast `alreadySaved`.
  - If the list is full, drop the oldest entry and show the toast `favFull`.
  - The ♥ button is filled whenever the current seed is in the list. Tapping a filled ♥ removes the track and shows the toast `unsaved`.
- **Copy:**
  - Use `navigator.clipboard.writeText`, falling back to a hidden textarea and `execCommand('copy')`.
  - The share text, ko: `🎧 지금 듣는 곡: {title} ({moodName}) · #{SEED} · 하루한판 겨울밤 로파이 라디오 play.mesisi.net`
  - The share text, en: `🎧 Now playing: {title} ({moodName}) · #{SEED} · Daily Toybox Snowy Night Lo-fi Radio play.mesisi.net`
- **Hash entry:**
  - If `location.hash` matches `#t=<8 hex>`, show that seed's title on the OFF screen and play it on the first tap. The mood comes from `&m=cozy|sleepy|focus` if present, otherwise from the stored setting.
  - Read only. Never write the hash or navigate.

## Strings

| key | ko | en |
|---|---|---|
| appTitle | 겨울밤 로파이 라디오 | Snowy Night Lo-fi Radio |
| startSub | 눈 오는 밤, 브라우저가 지금 만드는 끝없는 로파이 | Endless lo-fi, composed live while the snow falls |
| startBtn | 📻 라디오 켜기 | 📻 Turn on the radio |
| startNote | 소리가 나요. 볼륨을 확인해 주세요 · 아이폰은 무음 모드를 꺼 주세요 | This plays sound. Check your volume. On iPhone, turn off silent mode. |
| station | 하루한판 FM · 겨울밤 로파이 | Daily Toybox FM · Snowy Night Lo-fi |
| off | OFF | OFF |
| paused | ⏸ 잠시 멈춤 | ⏸ Paused |
| tuning | 주파수 맞추는 중... | Tuning... |
| trackNo | Track {nn} | Track {nn} |
| play / pause | 재생 / 정지 | Play / Pause |
| next | 다음 곡 | Next track |
| save / saved | 저장 / 저장됨 | Save / Saved |
| copy | 복사 | Copy |
| moodLabel | 분위기 | Mood |
| moodCozy / moodSleepy / moodFocus | 포근 / 졸림 / 집중 | Cozy / Sleepy / Focus |
| layersLabel | 악기 | Layers |
| layerDrums / layerBass / layerKeys / layerMelody / layerVinyl | 드럼 / 베이스 / 건반 / 멜로디 / LP 잡음 | Drums / Bass / Keys / Melody / Vinyl |
| volume | 볼륨 | Volume |
| timer | 타이머 | Timer |
| timerOff | 끄기 | Off |
| timerMin | {n}분 | {n} min |
| timerLeft | {mm}:{ss} 남음 | {mm}:{ss} left |
| timerDone | 타이머가 끝나 라디오를 껐어요. 잘 자요 🌙 | Timer finished. Radio off. Good night 🌙 |
| timerCleared | 정지해서 타이머를 껐어요 | Paused, so the timer was turned off |
| listened | 누적 {h}시간 {m}분 | {h}h {m}m listened |
| favsTitle | 저장한 곡 | Saved tracks |
| favsEmpty | 아직 저장한 곡이 없어요. 마음에 드는 곡에서 ♥를 눌러 보세요 | No saved tracks yet. Tap ♥ on a track you like. |
| close | 닫기 | Close |
| delete | 삭제 | Delete |
| undo | 되돌리기 | Undo |
| savedToast | ♥ 저장했어요 | ♥ Saved |
| unsaved | 저장을 취소했어요 | Removed from saved |
| alreadySaved | 이미 저장한 곡이에요 | Already saved |
| favFull | 20곡이 꽉 차서 가장 오래된 곡을 지웠어요 | List full: the oldest track was removed |
| deleted | 삭제했어요 | Deleted |
| copied / copyFail | 복사했어요 / 복사하지 못했어요 | Copied / Could not copy |
| layerMin | 악기를 하나는 켜 두어야 해요 | Keep at least one layer on |
| noAudio | 이 브라우저는 소리 합성을 지원하지 않아요 | This browser cannot synthesize sound |
| audioBlocked | 소리를 켜지 못했어요. 한 번 더 눌러 주세요 | Could not start audio. Tap once more. |
| sceneHint | 창문을 눌러도 재생/정지돼요 | Tap the window to play or pause |

The share texts are listed under "Seed and favorites".

## localStorage (in try/catch, prefix `slr:`)

- `slr:vol`: 0–100, default 70
- `slr:mood`: `cozy`, `sleepy` or `focus`, default `cozy`
- `slr:layers`: a 5-character string of 1 and 0 (drums, bass, keys, melody, vinyl), default `11111`
- `slr:favs`: a JSON array of `{s, m}`, at most 20
- `slr:last`: the last seed (hex) and mood, such as `3FA9C210|cozy`
- `slr:mins`: total listening minutes, an integer. Add one minute for every 60 s of playing time, and write it once per minute, never per frame.

The timer is never stored. If a stored value can't be parsed, use the default for that key.

## Edge cases

- **No AudioContext** (`window.AudioContext || webkitAudioContext` missing): the start button is disabled, `noAudio` is shown, and the scene still animates.
- **`ctx.resume()` rejects or the state stays `suspended`:** show `audioBlocked`, return to OFF, and let the next tap retry.
- **Autoplay:** nothing makes sound before a user gesture. The AudioContext is created inside the click or keydown handler.
- **Double taps:** ignore play/pause for 250 ms after a toggle. Ignore next for 800 ms after a dial change, and while one is in progress.
- **Resize:** recompute the canvas size (DPR capped at 2) and the building layout from a stable per-session layout seed, so the windows don't reshuffle. Audio is not affected.
- **Hidden tab:** stop requestAnimationFrame and keep the audio scheduler running with the long lookahead. When the tab is visible again, clamp the frame delta to 50 ms.
- **Device sleep or audio interruption** (the context goes to `interrupted` or `suspended` while it should be playing): show PAUSED, and the next play calls `resume()`.
- **Mood change while paused:** store the mood and prepare the new seed. It plays on the next play, without a dial noise.
- **Favorite tapped while paused:** start playing that track.
- **Deleting the favorite that is currently playing:** the ♥ button becomes unfilled and playback continues.
- **Blocked localStorage:** everything works and nothing is remembered.
- **`#demo` (QA thumbnail only):** jump straight to the ON visuals with seed `5EA50A11` and mood cozy, with the display, marquee and bar 9/32 filled in. Create no AudioContext. The VU needle follows a fake sine at 1.3 Hz, and the snow and windows animate.
- **Long sessions:** voices clean up after themselves (`onended` disconnects them), and the source cap stops leaks. Memory must stay flat after an hour, which QA can check by reading `performance.memory` if it's available.

## Must not

- No recordings, samples, soundfonts or network of any kind. Everything is synthesized. Stay under 120 KB.
- No quoting or imitating any existing song, melody, carol or famous lo-fi track. The progressions above are generic diatonic patterns.
- Don't copy the look of any known lo-fi stream or channel: no studying character with headphones, no anime-style figure and no cat-at-the-desk scene. The scene has no people or characters at all.
- No real radio station names, call signs or frequencies. The station is only "하루한판 FM".
- No sound before a user gesture, and no audio autoplay from `#t=` or `#demo`.
- No claims of health, sleep, concentration or learning benefits ("집중력 향상" and the like). "공부·작업할 때 틀어 두세요" is as far as the copy goes.
- No alert, confirm, prompt, window.open or navigation, and the URL hash is only read, never written.
- The page itself never scrolls. Only the panel and the drawer scroll internally.
