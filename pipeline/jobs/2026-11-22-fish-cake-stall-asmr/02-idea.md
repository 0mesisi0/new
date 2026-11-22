# Idea and spec: 어묵 포장마차 ASMR / Fish Cake Stall ASMR

## Concepts scored

Each criterion is scored from 1 to 5. Korean search and share scores are estimates based on the supplied research and backlog.

| Concept | Category | First 10 seconds | Originality | Korean search/share | One-HTML buildability | Total |
|---|---|---:|---:|---:|---:|---:|
| **어묵 포장마차 ASMR / Fish Cake Stall ASMR**. Turn on a winter stall soundscape, mix the sounds, and fill a paper cup with broth. | `chill` | 5 | 4 | 4 | 5 | **18** |
| **크리스마스 케이크 예약 비교 / Christmas Cake Preorder Comparison**. Enter two quotes to compare pickup windows, deposits, and cost per serving. | `tools` | 4 | 3 | 5 | 5 | 17 |
| **전구 한 줄 / One String of Lights**. Rotate a few wire tiles to light up a shop window. The first board teaches the rule in two moves. | `puzzle` | 5 | 3 | 3 | 5 | 16 |

**Pick 어묵 포장마차 ASMR.** The research pairs Korean winter street food with interest in sound and texture. The backlog’s ambient mixer gives that combination a simple interaction. The stall and its paper cup are recognizable on load, and one tap starts the full mix. `어묵 포장마차` and `겨울 ASMR` are the search hooks.

## Meta

slug `fish-cake-stall-asmr`

- Category `chill`, kind `tool`, aspect `9/16`, date `2026-11-22`.
- Tags ko `어묵`, `포장마차`, `겨울 ASMR`, `백색소음`. Tags en `fish cake`, `winter ASMR`, `ambient sound`, `sound mixer`.
- **Title ko** — 어묵 포장마차 ASMR
- **Title en** — Fish Cake Stall ASMR
- **Desc ko** — 어묵 국물이 보글보글 끓는 겨울 포장마차예요. 천막에 떨어지는 빗소리와 골목 바람 소리를 섞고, 종이컵에 따뜻한 국물을 따라 보세요.
- **Desc en** — Mix simmering broth, rain on the awning, and alley wind at a winter fish cake stall. Tap the cup to pour yourself some broth.
- **Howto ko** — 소리 켜기를 누르고 국물, 천막 빗소리, 골목 바람의 크기를 조절하세요. 국물 따르기를 누르면 종이컵이 차올라요.
- **Howto en** — Turn on sound and adjust the broth, awning rain, and alley wind. Select Pour broth to fill the paper cup.
- **About ko** — 겨울 골목의 어묵 포장마차를 그렸어요. 국물과 비, 바람 소리는 브라우저에서 만들어요.
- **About en** — A small winter street stall with broth, rain, and wind sounds synthesized in your browser.

## Pitch

A red awning frames a simmering pot, folded fish cake skewers, and an empty paper cup. The scene is ready as soon as the page loads. Turn on sound to hear the pot and the street, set three sliders to taste, or fill the cup for a short pour and a curl of steam. The user can keep listening with the mixer visible or use the stall in silence.

## Flow and screens

| State | Screen and behavior |
|---|---|
| **Ready** | Show the title, stall, empty cup, `soundOff`, `soundStart`, the three sliders, `pour`, and `reset`. Sliders and pouring work immediately. The initial sound action starts all three layers at their current levels. |
| **Starting** | Keep the scene and mixer visible. Show `soundStarting` in the disabled sound button while the audio context starts. Sliders and pouring stay available. |
| **Listening** | Show `soundOn` and `soundStop`. Sliders adjust the mix live. The cup carries its current state through sound changes. Stopping sound returns to Ready with the mix and cup intact. |
| **Sound unavailable** | Keep the scene and controls on the same screen. Show `soundError` and `soundRetry`. A new activation retries sound. |
| **Hidden and return** | Pause sound and animation while hidden. If sound was on, show `soundPaused` with `soundResume` when the page returns. Resume requires a fresh activation. If sound was off, return to the same visual state with sound off. |

### Cup interaction

- Activating `pour` fills the cup over 650 ms. Play a short pour sound only if audio is on, at a level scaled by the broth slider.
- Keep the cup full after the pour. Animate steam for two seconds, then leave a still curl above the cup. Update the cup description and announce `cupFilled` once.
- While pouring, change the button label to `pouring` and disable repeat activation. Once full, use `pourAgain`. A new pour replaces the previous steam animation and starts the fill from empty.
- Under reduced motion, switch directly to the full cup and still curl. The pour sound retains its normal duration.

## Controls

- **Touch and mouse.** Use native buttons and range controls. Each button, slider row, and slider thumb hit area is at least 44 px high. Visual feedback starts on pointer press, and buttons activate on release inside the target. The stall artwork is decorative. The labeled `pour` button is the cup interaction for every input method.
- **Keyboard.** Tab order is sound, broth, rain, wind, pour, reset. Enter and Space activate buttons. Native range keys adjust each slider in steps of 5, with Home and End setting the endpoints. Suppress scrolling from handled keys while preserving native slider behavior and Tab navigation. Keep focus on the sound button across state changes.
- **Reset.** Restore the three default levels and announce `mixReset`. Leave playback and the cup in their current states.
- **Language.** Read `lang` from the query string. Accept `ko` and `en`. Otherwise use Korean when `navigator.language` starts with `ko`, and English in other cases. Set `<html lang>`, the page title, and all visible and accessible names from the locale dictionary.

## Visual design

- Draw the stall with original inline SVG. Use a deep navy street (`#172638`), a brick-red awning (`#A73732`), warm window light (`#FFD497`), a steel pot (`#ABB8C3`), and a cream paper cup (`#FFF2DA`). Use cream text on navy and a high-contrast focus ring. The title and labels use system-ui.
- Place the cup beside the pot so its liquid level is visible. Use a clipped amber shape for the fill. Increasing a slider changes its corresponding detail immediately, even in silence. Broth adds bubbles, rain adds drops at the awning edge, and wind bends the steam. At zero, remove the corresponding effect. Use static changes in density or angle under reduced motion.
- Fill the iframe with a fixed-height layout using `100dvh` and a `100vh` fallback. At 320 × 480, use a compact title and sound row, let the illustration take the flexible space, and keep three 44 px slider rows plus a shared pour/reset row in view. Allow Korean and English labels to wrap. Center the stall and control panel at a maximum width of 480 px on wider screens.
- Keep the page free of scrolling. Set `touch-action: none` on the decorative scene and allow native slider gestures. Recompute scene fit on resize. Run animated effects with capped `requestAnimationFrame` delta time and stop the loop while hidden or under reduced motion.

## Sound

| Layer | Default | Synthesis |
|---|---:|---|
| Broth | 65 | Loop a quiet low-pass noise bed. Add soft sine bubbles with short downward pitch sweeps and decays at irregular intervals. |
| Awning rain | 35 | Loop filtered noise for steady rain. Add brief, band-pass noise taps at irregular intervals. |
| Alley wind | 15 | Use low-pass noise with slow gain modulation. Keep gusts below the rain at the default mix. |

- Generate reusable noise buffers in memory. Route each layer through its own gain node, then through a compressor and a master gain. Map slider values from 0 to 100 with a squared gain curve. Set zero to exact silence and ramp live changes over about 60 ms. Calibrate the master for a quiet mix with all three sliders at 100.
- Create or resume the `AudioContext` inside the sound button’s user gesture. Fade in and out over about 120 ms. Stop scheduled events and suspend the context after switching off. On hide, immediately mute the master, clear scheduled events, and suspend the context.
- Synthesize the pour as a 650 ms band-pass noise sweep through the broth channel. Treat a silent pour or slider change as a visual interaction without audio initialization.
- Schedule short audio events against the context clock. Keep at most one scheduler and one set of running loop sources. Restart scheduling without catching up on missed events.

## Strings

| Key | ko | en |
|---|---|---|
| `title` | 어묵 포장마차 ASMR | Fish Cake Stall ASMR |
| `sceneLabel` | 겨울 골목의 어묵 포장마차 | A fish cake stall on a winter street |
| `soundOff` | 소리 꺼짐 | Sound off |
| `soundStart` | 소리 켜기 | Turn on sound |
| `soundStarting` | 소리 켜는 중… | Starting sound… |
| `soundOn` | 소리 재생 중 | Sound playing |
| `soundStop` | 소리 끄기 | Turn off sound |
| `soundPaused` | 소리 일시 정지 | Sound paused |
| `soundResume` | 소리 다시 켜기 | Resume sound |
| `soundError` | 소리를 켤 수 없어요. | Sound couldn’t start. |
| `soundRetry` | 다시 시도 | Try again |
| `broth` | 끓는 국물 | Simmering broth |
| `rain` | 천막 빗소리 | Awning rain |
| `wind` | 골목 바람 | Alley wind |
| `level` | {value}% | {value}% |
| `cupEmpty` | 빈 종이컵 | Empty paper cup |
| `pour` | 국물 따르기 | Pour broth |
| `pouring` | 따르는 중… | Pouring… |
| `cupFilled` | 종이컵에 국물이 찼어요. | The cup is full of broth. |
| `pourAgain` | 한 잔 더 | Pour another cup |
| `reset` | 믹스 초기화 | Reset mix |
| `mixReset` | 기본 소리 크기로 돌아왔어요. | Default sound levels restored. |

Use `level` for visible percentage readouts and slider value text. Use polite live announcements for sound status, `cupFilled`, and `mixReset`. Exclude individual animation frames and bubbles from the accessibility tree.

## localStorage

- `fish-cake-stall-asmr:mix:v1` stores `{"broth":65,"rain":35,"wind":15}` with the user’s current values. Write after a committed slider change and on reset. Wrap all access and JSON parsing in `try/catch`.
- Validate each saved field independently. Accept finite numbers, clamp to 0–100, and round to the nearest 5. Use the default for missing or invalid fields. Every fresh load starts silent with an empty cup.

## Edge cases

- With blocked storage or malformed data, keep changes in memory and use defaults for invalid fields. The controls stay available.
- With Web Audio unavailable or a rejected resume, enter Sound unavailable. Keep the current mix and cup. Reuse a viable context on retry and replace an unusable one.
- Guard audio transitions with a request token. If startup resolves after the page is hidden, or an earlier stop finishes after sound restarts, the stale operation cannot change playback. Rapid toggles leave at most one live mix.
- With all sliders at zero, the audio context can stay on while the mix is silent. Raising any slider restores that layer without another sound activation.
- Hiding preserves cup fill progress. On return, finish any interrupted fill visually without replaying its sound. Resize and orientation changes preserve the mix, playback state, and cup.
- QA should verify both languages at 320 × 480, pointer and keyboard operation, silent first load, all-zero levels, storage failure, backgrounding during startup and pouring, and reduced motion. Run `npm test`, `npm run build`, and `npm run qa -- --thumbs`. The generated thumbnail should show the awning, pot, cup, and mixer on the ready screen.

## Must not

- No network requests, external fonts or scripts, analytics, recordings, or companion media. Put the scene, styles, logic, and sound synthesis in `items/fish-cake-stall-asmr/index.html`, with sibling `meta.json` and a QA-generated `thumb.png`.
- No copied shopfronts, real brands, real people, or claims about sleep or health.
- No sound autoplay, microphone access, background playback, or persisted playback state.
- No dialogs, pop-ups, navigation away, or page scrolling.