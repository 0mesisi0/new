# Idea and spec: 눈 오는 밤 어묵 포장마차 ASMR / Snowy Fish Cake Stall ASMR

## Concepts scored

Scores are 1–5 for value in the first 10 seconds, originality, Korean search/share demand, and buildability in one HTML file, in that order. Maximum 20. Search and share scores are estimates based on the supplied research and likely Korean search phrases.

| Concept | Category | Score | Verdict |
|---|---|---|---|
| **눈 오는 밤 어묵 포장마차 ASMR / Snowy Fish Cake Stall ASMR** | **radio** | **5 / 5 / 4 / 4 = 18** | **Picked.** One tap starts the broth simmering. Moving from the pot to the alley changes what you hear and gives the same scene three distinct views. `포장마차 ASMR` and `겨울 ASMR` are natural search phrases. |
| 크리스마스 케이크 픽업 비교 / Christmas Cake Pickup Compare | tools | 4 / 3 / 5 / 5 = 17 | Enter up to three cakes with price, servings and pickup time. Compare price per serving and see which pickups fit your own time window. The result is handy for a group chat, but real value depends on entering listings. |
| 귤껍질 별자리 / Tangerine Peel Constellations | weird | 5 / 4 / 3 / 4 = 16 | Tap once to scatter illustrated peel scraps across a night sky. Connect three scraps to reveal a short, silly constellation name worth screenshotting. The visual hook is immediate, with a less obvious Korean search phrase. |

The winning concept combines the research brief’s winter street-food and sensory-play leads. The fish cake stall gives Daily Toybox a radio item with a distinct setting, and the three listening spots give each tap a visible and audible consequence.

## Meta

slug `snowy-fishcake-stall`

- **Category** `radio`
- **Kind** `tool`
- **Aspect** `9/16`
- **Date** `2026-11-22`
- **Tags** ko `포장마차 ASMR`, `겨울 ASMR`, `어묵` / en `winter ASMR`, `fish cake stall`, `ambient sound`
- **Title ko** 눈 오는 밤 어묵 포장마차 ASMR
- **Title en** Snowy Fish Cake Stall ASMR
- **Desc ko** 눈 오는 골목의 어묵 포장마차에서 잠깐 쉬어 가세요. 어묵 냄비 앞, 천막 아래, 골목 입구를 오가며 보글거리는 국물과 겨울바람 소리를 들어 보세요.
- **Desc en** Listen to a snowy Korean street stall. Move between the simmering fish cake pot, the awning, and the alley to hear the scene change.
- **Howto ko** ‘듣기’를 누른 뒤 세 자리 중 하나를 고르세요. 숫자 키 1–3으로 자리를 바꾸고, 음량을 조절하거나 잠시 멈출 수 있어요.
- **Howto en** Select Listen, then choose one of three spots. Use keys 1–3 to move between spots. Adjust the volume or pause whenever you like.
- **About ko** 눈 오는 밤의 어묵 포장마차를 그린 작은 소리 풍경이에요. 소리는 브라우저에서 합성해요.
- **About en** A small soundscape of a Korean fish cake stall on a snowy night. Your browser generates the sounds live.

## Pitch

A warmly lit 어묵 cart sits at the mouth of a snowy alley. Select **듣기 / Listen** to hear the pot simmer. Move under the awning and hear the canvas rustle, or step into the alley and hear the wind rise as the stall recedes. Each spot has a distinct composition and a short caption that makes the scene work with sound muted. A screenshot captures the chosen view with its caption.

## Flow and screens

1. **READY.** Show the title, a full illustration of the pot-side view, a one-line instruction, and the **Listen** button. The three spots and volume controls are available immediately. Changing spots updates the view in silence. If a valid spot was saved, start there.
2. **PLAYING.** Keep the same layout. Replace **Listen** with **Pause** when the audio context is running. The selected spot remains visibly marked. Update the illustration and caption immediately when a spot is selected, and crossfade the audio over 350 ms. Listening continues until the user pauses or the page is hidden.
3. **PAUSED.** Keep the current view, caption, and controls. Show the paused status and replace **Pause** with **Resume**. Spot and volume changes still apply, and **Resume** uses the current settings.
4. **AUDIO UNAVAILABLE.** Keep all three illustrated views and captions available. If the browser lacks Web Audio, show the unavailable status and disable playback and sound controls. If starting audio fails, leave **Listen** or **Resume** available and show the retry status. A successful retry clears the error.

## Controls

- **Pointer and touch.** Use native buttons for playback, mute and the three spots, plus a native volume slider. Tapping a spot selects it directly. Give each control a target of at least 44 × 44 CSS px and clear focus styling.
- **Keyboard.** Tab reaches playback, the three spot buttons, mute and volume in that order. Enter or Space activates the focused button. Keys `1`, `2`, `3` select the pot, awning or alley. `M` toggles mute. The focused slider uses its native arrow keys. Ignore modified and repeated shortcut keydowns, and prevent the default only for a handled shortcut. Preserve focus when labels change.
- **Accessibility.** Use `aria-pressed` for the selected spot and mute button. Give mute a stable accessible name and a changing visible action label. Use a polite live region for playback and error status. Represent each illustrated view with its caption and hide decorative shapes from assistive technology.

## Listening spots and sound

| Key | Spot ko | Spot en | Caption ko | Caption en | Broth / awning / wind |
|---|---|---|---|---|---|
| 1 | 어묵 냄비 앞 | By the pot | 국물이 보글보글 끓어요. | The broth bubbles softly. | 0.85 / 0.18 / 0.08 |
| 2 | 천막 아래 | Under the awning | 머리 위로 천막이 바스락거려요. | The canvas rustles overhead. | 0.40 / 0.70 / 0.22 |
| 3 | 골목 입구 | At the alley entrance | 바람 사이로 포장마차 소리가 들려요. | The stall is still audible through the wind. | 0.15 / 0.20 / 0.65 |

- **Broth.** Use low-pass noise around 550 Hz with short band-pass bubble accents around 320–700 Hz. Vary the accent gaps between 180 and 650 ms and fade each accent in and out over roughly 80 ms.
- **Awning.** Use band-pass noise around 1.1 kHz with soft rustles every 1.5–4 seconds. Give each rustle a 200–400 ms envelope.
- **Wind.** Use low-pass noise around 350 Hz with slow gain variation over 3–7 seconds. Use independent offsets into a generated noise buffer for the continuous layers.
- Route the three layer gains through a master gain. Leave headroom by setting each continuous source’s peak gain to at most 0.12 and capping master gain at `0.25 × volume / 100`. Default volume is 40%. Smooth volume and mute changes over 80 ms. Mute gates the output while preserving the mix and slider value. A zero slider value also produces silence and keeps its own state.
- Create and resume a single audio context from an explicit **Listen** or **Resume** gesture. Maintain one graph. Keep transient scheduling within a 150 ms lookahead and cancel pending transients when playback stops. Fade the output down before a user-initiated pause. If the page becomes hidden, silence and suspend it immediately. Returning leaves playback paused until **Resume** is selected.

## Visual design

- Use inline SVG and CSS. The cart is a simple red-orange canvas canopy, a stainless pot with wooden skewers, and an amber lamp. Use `#142033` for the night sky, `#283B50` for buildings, `#B94F38` for canvas, `#FFC36E` for lamp light, `#F4F7FC` for foreground text, and `#A8D8F0` for focus and selected controls. Use `system-ui`.
- **By the pot:** put the pot, skewers and steam in the lower center, with the alley behind. **Under the awning:** bring the canopy into the top third and put the pot off to one side. **At the alley entrance:** make the cart smaller and put its pool of light at the end of the snowy pavement. Mark the selected spot with both a border and a filled indicator.
- At 360 × 640, use a single column with title and instruction above the illustration, caption directly below it, then spots, playback and sound controls. At 320 × 480, wrap the spot labels inside their targets and shrink the illustration first. At 1024 × 700, center the panel and place the illustration beside the controls. Fill the iframe and keep the page free of scrolling.
- On spot changes, dissolve between compositions over 200 ms. The only ambient animation is slow snow outside the canopy and steam above the pot. Use `requestAnimationFrame` with delta capped at 50 ms, stop drawing when hidden, and use static snow and steam with `prefers-reduced-motion`.
- The thumbnail moment is the default pot-side view with the lamp, skewers and caption visible before any gesture. Use the normal QA thumbnail generator.

## Strings

The title and description above and the spot labels and captions in the table are part of the `{ ko: {...}, en: {...} }` dictionary. Use the title for both the page heading and document title. Set `<html lang>` from a valid `?lang=ko` or `?lang=en`. Otherwise use Korean for a Korean browser locale and English for all other locales. The controls and status region use the strings below.

| Key | Korean | English |
|---|---|---|
| instruction | 듣기를 누르고 자리를 골라 보세요. | Select Listen, then pick a spot. |
| spotGroup | 듣는 자리 | Listening spot |
| listen | 듣기 | Listen |
| pause | 잠시 멈추기 | Pause |
| resume | 이어 듣기 | Resume |
| playing | 재생 중 | Playing |
| paused | 일시 정지 | Paused |
| muteLabel | 음소거 | Mute |
| mute | 소리 끄기 | Mute sound |
| unmute | 소리 켜기 | Unmute sound |
| volume | 음량 | Volume |
| volumeValue | {n}% | {n}% |
| unsupported | 이 브라우저에서는 소리를 재생할 수 없어요. 자리를 바꿔 풍경을 둘러보세요. | Audio is unavailable in this browser. Pick a spot to explore the scene. |
| audioRetry | 소리를 재생하지 못했어요. 재생 버튼을 다시 눌러 주세요. | Audio couldn’t start. Select the play button again. |

## localStorage

Wrap every read and write in `try/catch`. Use the following versioned keys.

| Key | Value | Default |
|---|---|---|
| `snowy-fishcake-stall:v1:spot` | `pot`, `awning` or `alley` | `pot` |
| `snowy-fishcake-stall:v1:volume` | Integer string from `0` to `100` | `40` |
| `snowy-fishcake-stall:v1:muted` | `1` or `0` | `0` |

Persist spot, volume and mute changes. Open each visit in **Ready** with the saved preferences.

## Edge cases

- **Audio start in progress.** Keep the playback button focusable and ignore duplicate activation until the pending request settles. Spot, mute and volume controls remain usable. Apply the latest settings before enabling output. If the page becomes hidden during startup, invalidate the request and suspend any context that finishes starting.
- **Rapid spot changes.** Cancel old gain ramps, hold the current gains and ramp to the latest spot. Keep one active audio graph and one transient scheduler.
- **Backgrounding or system interruption.** Cancel transients and show **Paused** if playback is interrupted after it has started. Leave the scene visible on return. Clamp the first animation delta after visibility changes.
- **Blocked or invalid storage.** Use the defaults for individual missing or malformed values. Keep any changes in memory if persistence fails.
- **Mute and volume zero.** Unmute restores the current slider level, including zero. Raising the slider while muted keeps the audio muted.
- **Resize and reduced motion.** Recompose the illustration from the current spot without resetting the audio. The static view, caption and selected state remain clear with motion disabled.
- **Readiness check.** From `play/`, run `npm test`, `npm run build`, and `npm run qa -- --only snowy-fishcake-stall --thumbs`. Check both languages at 320 × 480, pointer and keyboard selection, each mix in audio, pause after backgrounding, and the visibility of the cart in the generated thumbnail.

## Must not

- No network requests, analytics, external fonts or scripts, streamed audio, recorded clips, or autoplay. Keep the experience in a single `index.html` with inline CSS, SVG and JavaScript. Keep metadata in `meta.json`.
- No real businesses, logos, people, quoted voices, or copied art, sound or interface designs.
- No sudden loud cues, soundtrack, or timed prompts that interrupt the ambience.
- No dialogs, popups, navigation, page scrolling, or account requirements.