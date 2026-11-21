# Idea and spec: 패딩 지퍼 올리기 / Zip Up Your Puffer

## Concepts scored

Scores are 1–5, with a maximum of 20. Korean search and share scores are estimates based on the supplied research and the proposed hooks.

| Concept | Category | First 10 seconds | Originality | Korean search/share | One HTML file | Total | Verdict |
|---|---|---:|---:|---:|---:|---:|---|
| **패딩 지퍼 올리기 / Zip Up Your Puffer** | **arcade** | **5** | **4** | **4** | **5** | **18** | **Picked.** The zipper moves on the first press, and the first snag teaches the whole game. `패딩 지퍼 게임` gives it a clear Korean search phrase, and the fully zipped coat makes a recognizable result screenshot. |
| 선물 포장지 계산기 / Gift Wrap Calculator | tools | 3 | 3 | 4 | 5 | 15 | Enter a box’s dimensions to see the paper size for one illustrated wrapping method. `선물 포장지 크기` is a practical holiday query, but measuring the box delays the payoff. |
| 크리스마스 마켓 미션 뽑기 / Christmas Market Mission Draw | random | 5 | 3 | 3 | 5 | 16 | Draw a small outing mission, such as finding a star-shaped decoration. It has an immediate screenshot payoff, with a shorter seasonal window and a lower-confidence demand signal. |

The supplied research’s tactile-play direction informs the zipper mechanic. The player clears alternating fabric snags while racing the clock, using an original coat illustration.

## Meta

slug `puffer-zip`

- **Category** `arcade`
- **Kind** `game`
- **Aspect** `9/16`
- **Date** `2026-11-22`
- **Tags** ko `패딩`, `지퍼`, `겨울 게임` · en `puffer jacket`, `zipper`, `winter game`

| Field | ko | en |
|---|---|---|
| title | 패딩 지퍼 올리기 | Zip Up Your Puffer |
| desc | 패딩 지퍼에 옷감이 끼면 걸린 쪽을 빼 주세요. 왼쪽과 오른쪽을 번갈아 살피며 24초 안에 지퍼를 목 끝까지 올리는 게임이에요. | Pull the fabric free whenever your puffer zipper catches. Watch both sides and zip all the way to the collar in 24 seconds. |
| howto | 올리기 버튼이나 ↑를 길게 누르세요. 옷감이 끼면 걸린 쪽 버튼이나 ←·→를 누른 뒤 다시 올리세요. | Hold Zip up or ↑. When fabric catches, press the button on that side or use ← or →, then hold Zip up again. |
| about | 추운 날 현관 앞에서 꼭 한 번은 걸리는 패딩 지퍼를 24초짜리 게임으로 만들었어요. | A 24-second game about that moment when your jacket zipper catches on your way out the door. |

## Pitch

A puffer jacket fills the screen, with the zipper pull waiting at the hem. Hold one button and the teeth close in a clean line. After less than a second of zipping, a fold catches. Free the fabric on the indicated side, then keep going. Reach the collar within 24 seconds and the jacket closes with a snap. The result shows how far you got, your score, and your best score.

## Flow

1. **START** — Show the open jacket, title, one-line instructions, and a large Start button. The clock begins when Start is activated. Move focus to Zip up.
2. **PLAY** — Show time remaining and zipper progress above the jacket, with three controls below it. Holding Zip up raises the slider. At a snag, stop the slider, highlight the wrinkled side and its button, and show the matching instruction. Clearing the snag leaves the slider at the same height. The player presses Zip up again to continue.
3. **PAUSE** — When the page becomes hidden or the window loses focus during play, clear held inputs and freeze the round. When the player returns, show a paused overlay with Resume. Resume restores focus to Zip up and requires a fresh press.
4. **RESULT** — At the collar, show the fully closed jacket and the success heading. On timeout, preserve the jacket at its final height and show the timeout heading. Both outcomes show final progress, time remaining, score, best score, and a large Retry button. Move focus to Retry. Retry starts a fresh round immediately.

## Controls

- **Touch and mouse** — Tap or click Start, Resume, Retry, or either fabric button. Hold Zip up to move. Use pointer events and capture the pointer while Zip up is held so release still works if the pointer leaves the button.
- **Keyboard** — Hold ArrowUp to zip. ArrowLeft and ArrowRight clear a snag on the corresponding side. Tab and Shift+Tab move focus. On the focused Zip up button, hold Space or Enter to zip. On other focused buttons, Space and Enter use normal button activation. Ignore repeated keydowns for single actions. Handle game shortcuts only during play and prevent default scrolling for consumed keys.
- **Targets and feedback** — All buttons are at least 44 × 44 CSS px. Apply `touch-action: none` to the game controls. Keep the fabric buttons in the tab order throughout play. Before a snag, pressing either fabric button has no effect. During a snag, the wrong side leaves the fold in place and shows a short correction. Give the matching control a visible outline and display the direction in words.

## Round and scoring

- Start at 0% with 24 seconds remaining. While held and clear, the zipper moves at 20 percentage points per second. Pause movement on release. The round clock continues while the player is deciding which side to clear.
- Use the same five snag positions every round. Pick a starting side with equal probability at the start of each round, then alternate sides.

| Zipper position | Fabric side |
|---|---|
| 18% | Starting side |
| 36% | Opposite side |
| 57% | Starting side |
| 75% | Opposite side |
| 91% | Starting side |

- When movement crosses the next snag, clamp it to that position and cancel the hold. A correct fabric press clears exactly that snag. Require release and a new press of Zip up before movement resumes. Progress stays at the snag position until then.
- On timeout, score `floor(progressPercent)`. Reaching the collar by the deadline scores `100 + floor(secondsRemaining × 5)`. Reaching it exactly at the deadline counts as a finish worth 100 points. Update the best once per result, on either outcome.
- Display progress rounded down and the countdown rounded up, both as whole numbers. Use unrounded values for movement, deadline, and score calculations.

## Visual design

- **Palette** — Warm cream background `#FAF3E5`, dark navy ink `#172B3A`, teal jacket `#24666B`, brass zipper `#F0BD62`, and rust snag accent `#A64632`. Use system-ui type and tabular numerals for the clock and scores.
- **Jacket** — Draw an original puffer in inline SVG. Six stitched bands frame the zipper. Below the slider the teeth interlock, and above it the two tracks visibly separate. At a snag, a fabric fold overlaps the track from the affected side. Give the cleared fold a brief spring back into its seam. On success, let the collar settle around the pull.
- **Layout** — Fill the iframe with a centered column up to 440 px wide. At 320 × 480, reduce the jacket illustration’s height first. Keep the clock, progress, feedback text, and all controls on screen without page scrolling. Use a single three-button row during play. On the result, keep progress, score, and best together for an ordinary screenshot.
- **Motion and sound** — Use `requestAnimationFrame` and delta-based movement. With `prefers-reduced-motion`, omit the spring and collar animation and apply the same state changes instantly. The game is silent.

## Strings

The table is the complete in-frame copy, including the browser title, accessible labels and status messages. Use `?lang=ko` or `?lang=en`. For missing or unsupported values, use Korean when `navigator.language` starts with `ko` and English otherwise. Set `<html lang>` and the document title accordingly. Substitute locale-formatted integers for `{n}`.

| Key | ko | en |
|---|---|---|
| appTitle | 패딩 지퍼 올리기 | Zip Up Your Puffer |
| startHint | 길게 눌러 올리고, 끼면 걸린 쪽 옷감을 빼세요. | Hold to zip. When it catches, free the fabric on that side. |
| start | 시작 | Start |
| time | {n}초 남음 | Time left {n}s |
| progress | 지퍼 {n}% | Zipped {n}% |
| zip | 올리기 | Zip up |
| zipLabel | 길게 눌러 지퍼 올리기 | Hold to zip up |
| left | 왼쪽 빼기 | Free left |
| leftLabel | 왼쪽 옷감 빼기 | Free fabric on the left |
| right | 오른쪽 빼기 | Free right |
| rightLabel | 오른쪽 옷감 빼기 | Free fabric on the right |
| snagLeft | 왼쪽 옷감이 끼었어요. | Fabric caught on the left. |
| snagRight | 오른쪽 옷감이 끼었어요. | Fabric caught on the right. |
| wrongWhileLeft | 왼쪽 옷감을 빼 주세요. | Free the fabric on the left. |
| wrongWhileRight | 오른쪽 옷감을 빼 주세요. | Free the fabric on the right. |
| cleared | 빠졌어요! 다시 올려 보세요. | Fabric freed! Zip up again. |
| paused | 일시 정지 | Paused |
| resume | 계속하기 | Resume |
| success | 목 끝까지 올렸어요! | Zipped to the collar! |
| timeout | 시간 끝! | Time’s up! |
| score | 점수 {n}점 | Score {n} |
| best | 최고 기록 {n}점 | Best {n} |
| retry | 다시 하기 | Retry |

Use the shorter fabric button labels on screen and the expanded labels as accessible names. Keep snag and clear messages available in a polite live region. The clock and progress remain readable without announcing every change. Mark the coat art decorative because the controls and status text convey the game state.

## localStorage

- `puffer-zip:best:v1` — Best score as a decimal integer string. Default to `0`. Treat malformed values or values outside `0`–`220` as `0`. On every result, keep the highest of the new score, the in-memory best, and any valid stored best reread at that point.
- Wrap all reads and writes in `try/catch`. If storage is unavailable, retain the best in memory for the lifetime of the iframe.

## Edge cases

- Use monotonic elapsed time while actively playing. Process movement only up to the deadline in the final frame. Resolve a collar crossing at or before the deadline as a finish and end the round exactly once. Update decorative animation with a delta capped at 50 ms.
- Clear the corresponding hold on pointer release, pointer cancellation, lost pointer capture, or key release. Track a single owning pointer or key for each hold. Ignore extra presses until that hold ends.
- Clear any held input on a snag, pause, round end, and retry. An input held across one of these transitions must be released before it can start a new hold. Ignore stale release events from the previous round.
- Pause only when leaving active play. Repeated blur and visibility events leave a single paused state. Resume only after the document is visible and focused.
- Clear correction feedback on a successful fabric press, retry, or result. On retry, reset the clock, progress, snag sequence, input state, and feedback.
- Resize the artwork from the current game state. Preserve progress, remaining time, focus, and the active snag when the iframe changes size or orientation.

## Must not

- No external assets, scripts, fonts, requests, analytics, or navigation. Keep HTML, CSS, JavaScript, and SVG in `items/puffer-zip/index.html`.
- No raster game art, video, real brands, real people, or copied game assets and layouts.
- No color-only snag cues, drag-only controls, hover requirements, or page scrolling.
- No alerts, confirmations, prompts, popups, or audio.

Before publishing, run `npm test`, `npm run build`, and `npm run qa -- --thumbs`. Verify both languages at 320 × 480, complete a round with keyboard and touch, and check that the generated thumbnail shows the jacket and zipper clearly.