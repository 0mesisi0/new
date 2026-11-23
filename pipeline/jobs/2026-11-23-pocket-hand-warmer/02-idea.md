# Idea and spec: 핫팩 흔들기 / Pocket Hand Warmer

slug `pocket-hand-warmer`

## Concepts scored

Each criterion is scored from 1 to 5. Korean search/share scores are editorial estimates based on recognizable search terms and what someone could share. The research file provides a tactile-play lead, with no measured demand for these concepts.

| Concept | Category | First 10 seconds | Originality | Korean search/share | One-file buildability | Total | Verdict |
|---|---|---:|---:|---:|---:|---:|---|
| **핫팩 흔들기 / Pocket Hand Warmer** | `cool` | 5 | 4 | 4 | 5 | **18** | **Picked.** One press changes the pouch immediately. Eight presses turn a cold blue screen into a glowing coat pocket. |
| 김밥 말기 / Gimbap Roll-Up | `games` | 4 | 3 | 4 | 5 | 16 | The backlog’s timing game has a recognizable Korean subject and a good cross-section reveal. Players first need to learn the timing cue. |
| 아무것도 하지 마 / Do Absolutely Nothing | `weird` | 3 | 2 | 4 | 5 | 14 | The backlog’s stillness timer gives friends a time to compare. The payoff takes longer, and touch requires an explicit way to end the attempt. |

The selected concept adapts the tactile-play direction in `pipeline/jobs/2026-11-23-pending/01-research.md` to a disposable hand-warmer pouch. The pouch and the pocket reveal are the subject and payoff.

## Meta

- slug `pocket-hand-warmer`, category `cool`, kind `tool`, aspect `9/16`, date `2026-11-23`
- Tags ko `핫팩`, `겨울`, `손난로`. Tags en `hand warmer`, `winter`, `sensory toy`.
- Title ko **핫팩 흔들기**. Title en **Pocket Hand Warmer**.
- Desc ko — 화면 속 핫팩을 톡톡 누르면 파란 주머니에 주황빛이 번져요. 여덟 번 흔들어 따뜻해진 핫팩을 코트 주머니에 쏙 넣어 보세요.
- Desc en — Tap the hand warmer eight times, then tuck it into a coat pocket and watch the lining glow.
- Howto ko — 핫팩을 누르거나 버튼에 초점을 두고 Enter 또는 Space 키를 누르세요. 여덟 번 흔들면 주머니에 넣을 수 있어요.
- Howto en — Tap the pouch, or focus it and press Enter or Space. After eight shakes, tuck it into the pocket.
- About ko — 추운 날 코트 주머니 속 핫팩을 떠올리며 만든 화면 속 장난감이에요.
- About en — A little toy inspired by finding a warm pouch in your coat pocket on a cold day.

## Pitch

A hand-warmer pouch sits above the opening of a quilted coat pocket. The first press crinkles the wrapper and lights up the first stitch along its seam. Each press adds another warm stitch. Once all eight glow, the pouch can slide into the pocket, where amber light spreads through the lining.

There is no countdown. A quick visitor can finish in a few seconds, and someone who wants to linger can leave the pocket glowing.

## Flow

| Screen | What appears | What happens |
|---|---|---|
| **READY** | Title, sound toggle, one-line instruction, large pouch button, and eight unlit stitches. | The first activation counts as shake 1 and moves directly to WARMING. |
| **WARMING** | The same pouch button stays in place. The count reads `{count}/8`. Stitches fill from left to right as the pouch warms. | Each activation adds one shake. At 8, show WARM. |
| **WARM** | All eight stitches glow. Show the ready message and **Tuck into pocket** in the primary button position. | A fresh activation begins TUCKING. |
| **TUCKING** | The pouch slides behind the pocket lip over 320 ms. Show the tucking status. | Ignore primary activations until the transition ends, then show RESULT. With reduced motion, enter RESULT immediately. |
| **RESULT** | The pouch’s top edge peeks out of the lit pocket. Show the result line and **Warm another**. The pocket holds its final appearance for a screenshot. | **Warm another** resets the pouch, stitches, count, and feedback to READY. |

## Controls

- **Touch and mouse.** Tap or click the pouch to shake it, then use the primary button to tuck or restart. Use native button activation for state changes so a single tap counts once. The pouch illustration is part of the button.
- **Keyboard.** Tab and Shift+Tab move between controls. Enter and Space activate the focused button. Ignore key auto-repeat. Keep the primary button in the same DOM position as its action changes so focus stays put.
- **Touch targets.** Buttons are at least 44 × 44 px. The play area suppresses touch scrolling and double-tap zoom. The page never scrolls.
- **Accessibility.** Maintain a visible focus ring. Expose the count as a progress indicator with localized value text. Announce the first shake, the ready state, and the result through a polite live region. Keep decorative stitches and fabric artwork hidden from assistive technology.

## Warmth and feedback

- `count` starts at `0` and increments to `8`. The number of lit stitches equals `count`. Use `count / 8` to blend the pouch’s blue-gray fill toward amber. Show the filled stitches and numeric count so progress is readable without color.
- Each shake briefly compresses the pouch and nudges it sideways by up to 3 px. A new shake restarts that visual response from its neutral pose. The counter updates immediately, even during motion.
- At shake 8, show the warm appearance and ready message immediately. A separate press tucks the pouch.
- In RESULT, keep the amber lining and the visible edge of the pouch still. Under `prefers-reduced-motion`, use immediate color and stitch changes and skip all wrapper and pocket movement.

## Visual design

- Use a deep navy coat (`#172638`), a pale blue-gray pouch (`#C3D4DD`), and amber stitching and lining (`#FFC477`). Use a dark label on the pouch and pale text against the coat. The pouch is an original, unbranded fabric shape.
- Draw the scene with CSS and inline SVG. A simple front layer forms the quilted pocket lip and masks the lower part of the pouch during the tuck. The initial stitches are outlined and the active stitches are solid.
- Use a system font and a centered 9:16 composition with the title and sound control at the top and the primary action in the lower half. Fill the iframe background on wide screens and keep the composition within a 440 px column. At 320 × 480, reduce artwork height before shrinking controls or text. Let the instruction wrap.
- Fit the viewport with `100dvh` and a `100vh` fallback. Recompute geometry on resize using the current state. Any frame-driven transition uses capped elapsed time and pauses while `document.hidden` is true.

## Sound

Sound is off by default. When enabled, synthesize a short filtered-noise crinkle on a shake and a softer rustle on tuck. Create or resume Web Audio only from a user gesture. Cap the crinkle at one sound per 90 ms and stop active sounds on mute or when the page is hidden. If audio setup fails, keep the toggle off and announce the localized fallback once.

## Strings

Use a single `{ ko, en }` dictionary for all item copy, the document title, accessible labels, and status messages. Resolve a supported `?lang=ko` or `?lang=en` first. Otherwise use Korean when `navigator.language` starts with `ko` and English for other values. Set `<html lang>` to the resolved language. The sound toggle keeps a stable accessible label and exposes its state through `aria-pressed`.

| Key | ko | en |
|---|---|---|
| `appTitle` | 핫팩 흔들기 | Pocket Hand Warmer |
| `startHint` | 핫팩을 톡톡 누르면 따뜻해져요. | Tap the pouch to warm it up. |
| `shake` | 핫팩 흔들기 | Shake the pouch |
| `progressLabel` | 핫팩 흔들기 진행률 | Shake progress |
| `progressVisible` | {count}/8 | {count}/8 |
| `progressSpoken` | 8번 중 {count}번 흔들었어요. | {count} of 8 shakes. |
| `firstShake` | 첫 바늘땀에 불이 켜졌어요. | The first stitch lit up. |
| `warm` | 다 데웠어요. 이제 주머니에 쏙! | It’s warm. Tuck it into the pocket! |
| `tuck` | 주머니에 넣기 | Tuck into pocket |
| `tucking` | 주머니에 넣는 중… | Tucking it in… |
| `result` | 주머니 속이 포근해졌어요. | The pocket is nice and warm. |
| `again` | 새 핫팩 데우기 | Warm another |
| `soundLabel` | 소리 | Sound |
| `soundOff` | 소리 꺼짐 | Sound off |
| `soundOn` | 소리 켜짐 | Sound on |
| `soundUnavailable` | 이 브라우저에서는 소리를 재생할 수 없어요. | Sound is unavailable in this browser. |

## localStorage

- `pocket-hand-warmer:sound` stores `"1"` for on or `"0"` for off. Missing or invalid values default to off. Wrap reads and writes in `try/catch` and keep an in-memory setting for the current visit if storage is unavailable.
- Reloading starts at READY. Keep the count and screen state in memory only.

## Edge cases

- A rapid burst of presses stops at 8. Gate the tuck action for 250 ms after the eighth shake and require a new activation. Holding Enter or Space through the state change must leave the pouch at WARM.
- Ignore presses during TUCKING. On arrival at RESULT, apply the same 250 ms guard so a double tap cannot reset the finished pocket.
- If the iframe resizes during TUCKING, preserve elapsed progress and recalculate both endpoints. If it becomes hidden, pause the slide and discard the elapsed time between frames when it resumes.
- Switching to reduced motion during TUCKING completes the slide immediately. A blocked storage write or unavailable audio leaves the visual flow fully usable.
- `#demo` shows RESULT directly for QA thumbnails, with no audio playback or storage writes on entry.

## Must not

- No network requests, external libraries, fonts, media, analytics, or remote assets. Ship the interaction in one `index.html` with separate catalog metadata and a QA-generated thumbnail.
- No trademarks, real package designs, copied art, or real people.
- No temperature readouts, product-performance claims, or instructions for using physical hand warmers. No device motion, haptic, microphone, or camera permissions.
- No autoplay audio, browser dialogs, pop-ups, navigation away, or page scrolling.

Before publishing, run `npm test`, `npm run build`, and `npm run qa -- --thumbs`. Check both languages at 320 × 480, verify that the sequence is fully keyboard-operable, and confirm that the thumbnail shows the finished pocket.