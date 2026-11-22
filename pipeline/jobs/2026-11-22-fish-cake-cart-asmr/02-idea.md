# Idea and spec: 어묵 포장마차 ASMR / Fish Cake Cart ASMR

## Concepts scored

Scores are 1–5 in each column, for a maximum of 20. Korean search and share scores are estimates based on the supplied research and backlog.

| Concept | Category | First 10 seconds | Originality | Korean search/share | One-file buildability | Total | Verdict |
|---|---|---:|---:|---:|---:|---:|---|
| **어묵 포장마차 ASMR / Fish Cake Cart ASMR** | **radio** | **5** | **4** | **4** | **5** | **18** | **Picked.** One tap starts a simmering broth pot. Three listening spots give friends something to compare. |
| 크리스마스 케이크 예약 비교 / Christmas Cake Preorder Compare | tools | 4 | 3 | 5 | 5 | 17 | Compare two quotes by total, price per serving, and pickup time. The sample comparison is immediate, and a real comparison needs two quotes. |
| 장갑 실종 신고서 / Missing Mitten Report | weird | 4 | 4 | 2 | 5 | 15 | Pick where a mitten vanished and get a screenshot-ready lost-and-found notice with an illustrated suspect. |

## Meta

slug `fish-cake-cart-asmr`

- Category `radio`, kind `tool`, aspect `3/4`, date `2026-11-22`. The site registry and item validator both accept `radio`.
- `ko.tags` `["어묵", "포장마차", "겨울 ASMR"]`
- `en.tags` `["fish cake", "Korean street food", "winter ASMR"]`
- **Title, ko** — 어묵 포장마차 ASMR
- **Title, en** — Fish Cake Cart ASMR
- **Desc, ko** — 겨울밤 어묵 포장마차에 잠깐 들러 보세요. 국물이 보글거리는 냄비 앞, 천막 아래, 골목 입구에서 들리는 소리가 조금씩 달라요.
- **Desc, en** — Stop by a Korean fish cake cart on a winter night. Hear the broth, canvas awning, and alley from three listening spots.
- **Howto, ko** — ‘소리 켜기’를 누르고 자리를 골라 보세요. 음량을 조절하거나 ‘일시 정지’를 눌러 쉴 수 있어요. 키보드로는 Tab과 Enter를 사용하세요.
- **Howto, en** — Turn on the sound and pick a listening spot. Adjust the volume or pause whenever you like. Use Tab and Enter to move between and activate controls.
- **About, ko** — 어묵 국물이 끓는 소리부터 천막을 스치는 바람까지, 브라우저에서 직접 합성한 겨울밤 소리예요.
- **About, en** — Your browser synthesizes the winter soundscape, from simmering fish cake broth to wind brushing against the canvas awning.

## Pitch

A small Korean fish cake cart glows at the end of a blue winter alley. Tap once to hear the pot simmer, then switch between the pot, the awning, and the alley entrance. The same three sounds change in balance and distance as the illustration reframes the cart. The seasonal connection comes from the research brief’s winter street-food entry. The one-tap soundscape develops the backlog’s ambient radio idea around a specific Korean winter scene.

## Flow

1. **START** — Show the illustrated cart, title, one-line instruction, three listening spots, volume, and **Turn on sound**. The saved or default spot is already selected. Any spot can be previewed silently.
2. **LISTEN** — A successful start changes the primary action to **Pause**. The first simmer bubbles should be audible within one second of playback at the default volume and spot. Switching spots updates the picture and crossfades the mix in 450 ms, with playback continuing.
3. **PAUSED** — Freeze the scene on a composed frame and show **Resume**. The selected spot and volume remain editable. Hiding the iframe document also enters this state if playback was active. Returning leaves audio paused until the user resumes.
4. **AUDIO UNAVAILABLE** — Keep the illustration and spot controls usable. For a failed start or resume, show the inline error and **Try sound again**. If Web Audio is absent, show the unsupported message and omit the playback and volume controls.

The paused scene makes a clean screenshot with the selected spot visible. The parent item page’s existing Share control distributes the item link.

## Controls

- **Touch and mouse** — Tap or click the primary playback button or a listening spot. Use the labeled volume slider by clicking or dragging. Use native controls and pointer events where needed. Give buttons and the slider row at least 44 px of target height.
- **Keyboard** — Tab reaches the playback button, spot group, and volume in that order. Enter or Space activates playback. The spot group uses native radios, with arrow keys moving selection and Space selecting the focused radio. The range input handles arrow keys. Preserve visible focus and keep focus on the playback button as its label changes.
- **Feedback** — Show the selected spot with a filled marker and border. Use a polite live region for audio errors and an automatic pause when the page is hidden. The active spot and volume use native accessible control state.

## Listening spots and sound

All three spots share the same pot, canvas, and alley layers. The table sets relative linear gains ahead of the master volume.

| ID | Korean | English | Pot / Canvas / Alley | Illustration |
|---|---|---|---|---|
| `pot` | 냄비 앞 | By the pot | `0.80 / 0.10 / 0.10` | Close view of the broth pan, skewers, and cups |
| `awning` | 천막 아래 | Under the awning | `0.38 / 0.47 / 0.15` | Canvas canopy above the counter, with the pot still visible |
| `alley` | 골목 입구 | At the alley entrance | `0.18 / 0.17 / 0.65` | Smaller cart framed by the dark sides of the alley |

- **Pot** — Low-pass generated noise for the bed and 4–7 soft, 50–130 ms bubble envelopes per second. Vary the bubble intervals and envelope lengths. Schedule the first bubble as soon as playback starts.
- **Canvas** — Band-pass generated noise with irregular 0.5–1.5 s swells for fabric rustle.
- **Alley** — Low-pass generated noise with a slow, shallow gain swell for wind. In the alley spot, lower the pot layer’s cutoff from 1.6 kHz to 650 Hz to soften it with distance.
- **Playback** — Reuse one `AudioContext`, created or resumed inside a playback button gesture. Route the layers through a compressor and master gain. The volume range is 0–100 in integer steps, with a default of 35 and a master gain of `0.20 × (volume / 100)`. Ramp volume changes over 60 ms. Manual pause fades the master to zero over 120 ms, then suspends audio. A hidden document silences audio immediately and suspends the context.
- **Scheduling** — Schedule bubble and rustle events against the audio clock, using a short lookahead while listening. Keep one scheduler. Clear queued events and stop scheduling on pause, hide, or teardown. On a spot switch, start the new ramps from the current values. If playback startup finishes after a pause or hide, keep the master silent and suspend the context.

## Visual design

- Draw the cart in inline SVG. Use deep navy `#101C30` for the street, amber `#FFC878` for the cart light, muted red `#8C433C` for the canopy, and ivory `#FFF2DC` for type. Use system fonts.
- Keep the first frame fully illustrated for the QA thumbnail. Place the title and instruction above the scene and the controls below it. Put the canvas seam, row of skewers, and steam in the lamp’s brightest area.
- Fill the iframe and fit the controls at `320 × 480` without page scrolling. Reduce illustration height first when vertical space is tight. Let the spot labels wrap within their touch targets. On wide screens, extend the street background to the window edges and center the control column at a maximum width of 480 px.
- During playback, animate a few translucent steam curls with `requestAnimationFrame`. Cap visual delta at 50 ms and stop the animation when paused or hidden. Under `prefers-reduced-motion`, show static steam and switch framing instantly. The audio crossfade still applies.

## Strings

Read `?lang=ko` or `?lang=en`. Otherwise use Korean for a `navigator.language` starting with `ko`, and English for other locales. Set `<html lang>` and use the active dictionary for the document title, controls, and status messages. The illustration is decorative and contains no lettering.

| Key | ko | en |
|---|---|---|
| `title` | 어묵 포장마차 ASMR | Fish Cake Cart ASMR |
| `intro` | 자리를 옮겨 겨울밤 포장마차 소리를 들어 보세요. | Move around the cart and listen to the winter night. |
| `spots` | 듣는 자리 | Listening spot |
| `pot` | 냄비 앞 | By the pot |
| `awning` | 천막 아래 | Under the awning |
| `alley` | 골목 입구 | At the alley entrance |
| `start` | 소리 켜기 | Turn on sound |
| `pause` | 일시 정지 | Pause |
| `resume` | 다시 듣기 | Resume |
| `starting` | 소리 준비 중… | Starting sound… |
| `volume` | 음량 | Volume |
| `volumeValue` | {n}% | {n}% |
| `autoPaused` | 다른 화면으로 이동해 소리를 멈췄어요. | Sound paused when you left this screen. |
| `audioFailed` | 소리를 켜지 못했어요. 다시 눌러 보세요. | Sound could not start. Try again. |
| `retry` | 소리 다시 켜기 | Try sound again |
| `audioUnsupported` | 이 브라우저에서는 그림만 볼 수 있어요. | This browser can show the scene only. |
| `noscript` | 포장마차를 이용하려면 자바스크립트를 켜 주세요. | Enable JavaScript to use the fish cake cart. |

## localStorage

Wrap reads and writes in `try/catch`.

- `fish-cake-cart-asmr:spot` — `pot`, `awning`, or `alley`. Default `pot`.
- `fish-cake-cart-asmr:volume` — A decimal integer string from `"0"` through `"100"`. Default `"35"`.

Save changes as they are committed. Keep playback state in memory so every fresh load starts silent.

## Edge cases

- If storage is blocked or a stored value is malformed, use the default for that setting. Preserve current settings in memory for the session.
- Treat `0%` as a valid saved volume. At `0%`, the user can change listening spots and see the scene update. Raising volume takes effect on the active mix.
- While audio startup is pending, show `starting` and ignore repeat activation. Spot and volume changes remain available. Apply the latest selections when startup succeeds.
- On a hidden document, invalidate any pending start, clear audio scheduling, and stop visual animation. On return, announce the automatic pause if playback had been active. Resume requires a new button activation.
- If any audio start or resume attempt fails, clear partially created or scheduled sources before showing retry. Retrying keeps the current spot and volume.
- Resizing or rotating the viewport reframes the scene while preserving playback, focus, volume, and spot.
- Before publishing, test both languages and all four states at `320 × 480`, including keyboard operation, blocked storage, failed audio startup, and hide/resume. From `play/`, run `npm test`, `npm run build`, and `npm run qa -- --thumbs`. Inspect the generated thumbnail for the complete cart and readable title.

## Must not

- Use network calls, streams, analytics, external fonts or assets, recorded samples, or external dependencies. Keep the interactive experience in a single `index.html`.
- Autoplay sound on load, on return to a visible tab, or on a listening spot change. Keep background tabs silent.
- Use real voices, people, brands, venue names, or a recognizable storefront. Keep the illustration and synthesized sound original.
- Add alerts, confirms, prompts, popups, navigation, or page scrolling.