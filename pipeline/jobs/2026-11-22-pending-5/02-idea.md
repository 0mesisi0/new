# Idea and spec: 패딩 지퍼 챌린지 / Puffer Zip Challenge

## Concepts scored

Each criterion is scored from 1 to 5, for a maximum of 20. The Korean search and share scores are estimates based on the supplied research and the appeal of each concept’s result.

| Concept | Category | Value in first 10 seconds | Originality | Korean search and share demand | One-file buildability | Total | Verdict |
|---|---|---:|---:|---:|---:|---:|---|
| **패딩 지퍼 챌린지 / Puffer Zip Challenge** | **arcade** | **5** | **4** | **4** | **5** | **18** | **Pick.** One press moves the zipper, the first snag teaches the rhythm, and the final score fits in a screenshot. |
| 크리스마스 선물 포장지 계산기 / Gift Wrap Calculator | tools | 4 | 3 | 4 | 5 | 16 | An editable example immediately shows how large a sheet to cut for a rectangular gift box. |
| 눈 위 발자국 / Footprints in Fresh Snow | chill | 5 | 3 | 3 | 5 | 16 | Tap or use the arrow keys to lay alternating boot prints across a snowy courtyard, then leave the trail for a screenshot. |

The pick takes the tactile interaction from the research and applies it to a familiar winter annoyance. `패딩 지퍼` gives the title a recognizable Korean search phrase, while the score gives friends a reason to compare attempts.

## Meta

slug `puffer-zip-challenge`

- Category `arcade`, kind `game`, aspect `9/16`, date `2026-11-22`
- Tags ko `패딩 지퍼`, `겨울 게임`, `타이밍 게임`
- Tags en `puffer zipper`, `winter game`, `timing game`

| Field | ko | en |
|---|---|---|
| title | 패딩 지퍼 챌린지 | Puffer Zip Challenge |
| desc | 패딩 지퍼를 끝까지 올려 보세요. 꾹 누르면 빨라지고, 노란 바느질 앞에서 손을 떼면 천이 끼지 않아요. 24초 안에 지퍼를 잠그면 남은 시간이 보너스 점수가 돼요. | Zip up a puffer in 24 seconds. Hold to speed up, ease off at the yellow stitches, and earn bonus points for time left. |
| howto | 당기기 버튼이나 스페이스바를 꾹 누르면 지퍼가 올라가요. 노란 바느질에 닿기 전에 손을 떼서 속도를 줄이세요. 여덟 구간을 통과하면 성공이에요. | Hold Pull or Space to move the zipper. Release before the yellow stitches to slow down. Clear all eight sections to finish. |
| about | 급하게 패딩을 잠그다 안감이 지퍼에 낀 순간을 타이밍 게임으로 만들었어요. 매번 같은 패딩이라 다시 할수록 손을 뗄 타이밍을 익힐 수 있어요. | A timing game inspired by catching your coat lining in the zipper. Every run uses the same jacket, so you can learn exactly when to let go. |

## Pitch

A puffer jacket fills the screen. Hold one button and the zipper climbs. Release and it coasts to a stop. At three yellow stitched bands, the lining bunches close to the teeth. Pass the stitch slowly and the zipper slides through. Hit it too fast and the pull tab bounces back. Zip all the way up before the timer expires.

## Flow

1. **START** — Show the title, the one-line instruction, a jacket with its zipper at the hem, and a large Start button.
2. **PLAY, ready** — Show the full zipper track, timer at `24.0`, section count at `0 / 8`, score at `0`, and the Pull button. The clock starts on the first accepted press of Pull.
3. **PLAY, active** — Holding Pull accelerates the slider. Release to brake. Each cleared section closes its patch of teeth and adds 100 points. A snag shows inline feedback beside the zipper while the clock keeps running.
4. **RESULT** — Display the outcome, score Breakdown, best score, and a large Retry button. A finish shows the zipped jacket. A timeout leaves the slider at its final position. Retry opens PLAY, ready, with a fresh run.

## Controls

- **Touch and mouse** — Hold the native Pull button using pointer events. Capture the initiating pointer so a release outside the button still brakes. Apply `touch-action: none` to the play area. Start and Retry use normal button activation.
- **Keyboard** — Enter or Space activates Start and Retry through their normal button behavior. During PLAY, Space holds Pull and releasing Space brakes. Prevent default only for Space when it is handled as the game control. Keep Tab navigation and visible focus outlines.
- **Focus** — Focus Start when the user enters the game by keyboard, Pull on entering PLAY from Start or Retry, and Retry on entering RESULT. A key already held during a screen transition must be released before it can start a new pull.
- **Targets** — Use a full-width Pull button at least 56 px tall. Start and Retry are at least 44 px tall.

## Track, timer, and scoring

Zipper progress runs from `0` at the hem to `100` at the collar. Draw all eight section markers from the start. A section clears when the slider crosses its marker upward.

| Section | Marker | Rule |
|---|---:|---|
| 1 | 12.5 | Clear at any speed |
| 2 | 25 | Clear at any speed |
| 3 | 37.5 | Clear at 16 units/s or slower |
| 4 | 50 | Clear at any speed |
| 5 | 62.5 | Clear at 16 units/s or slower |
| 6 | 75 | Clear at any speed |
| 7 | 87.5 | Clear at 16 units/s or slower |
| 8 | 100 | Clear at any speed and finish |

- While held, accelerate at `48 units/s²` to a maximum of `32 units/s`. On release, decelerate at `60 units/s²` to zero. Clamp speed to this range. Paint a stitched lead-in for the eight units before each slow marker. From top speed, releasing at the beginning of the lead-in is enough to pass the marker slowly if the slider is still coasting. A short press can move it the rest of the way if it stops before the marker.
- Check speed at the crossing, including when one update advances across a marker. A successful crossing permanently clears that marker for the run. On a snag, move the slider four units below the marker, zero its speed, and require 300 ms of recovery plus a fresh press. Previously cleared sections keep their points.
- Count `24,000 ms` of visible active play from the first pull, including snag recovery. Use `requestAnimationFrame` with capped movement deltas of at most 50 ms. Track the timer using elapsed visible time so a slow frame cannot extend the round. Process movement only up to the deadline on the final update. A final crossing at the deadline counts as a finish.
- Section points equal `100 × sections cleared`. On a finish, add `floor(remainingMs / 100)` time bonus points. On timeout, the bonus is zero. For example, all eight sections cleared with 9.2 seconds left earns `800 + 92 = 892`.
- During PLAY display the section points only. On RESULT display the section points, time bonus, total, and persisted best. Show the new-record label only when the total strictly exceeds the previous best.

## Screen layout and visual design

- **START** — Use a navy jacket on a warm off-white background. Show the lower teeth open around a yellow zipper pull, with the path to the collar visible. Place the title and instruction above the jacket and the Start button at the bottom.
- **PLAY** — Put time, sections, and score in a compact top row. Center the jacket in the remaining space and anchor Pull along the bottom. Use chevrons on the three stitched bands as well as yellow. Display a labeled speed bar with a tick at the slow-pass threshold. At a snag, use an orange outline, a brief tab bounce, and the fixed feedback area below the jacket. Cleared sections show a clasp icon and joined teeth.
- **RESULT** — Place the outcome above a smaller jacket preview. Put the total in large type, then section points, time bonus, best, and the new-record label when earned. Keep the jacket and score visible together for screenshots.
- Use inline SVG for the jacket and system fonts for text. Fill the iframe with `100vw` and `100dvh` with a `100vh` fallback. Recompute the available jacket height on resize and verify both languages at `320 × 480` and desktop fullscreen. Keep all screens free of page scrolling. Under reduced motion, remove the bounce and decorative animation while preserving slider movement and the snag outline. The game is silent.

## Strings

Select `ko` or `en` from `?lang=` when supported. Otherwise use `ko` for a Korean `navigator.language` and `en` for other locales. Set `<html lang>` and the document title. Use the same dictionary for UI text and accessible labels.

| Key | ko | en |
|---|---|---|
| `appTitle` | 패딩 지퍼 챌린지 | Puffer Zip Challenge |
| `startHowto` | 꾹 눌러 당기고, 노란 바느질 앞에서 손을 떼세요. | Hold to pull. Let go before the yellow stitches. |
| `start` | 시작하기 | Start |
| `pull` | 꾹 눌러 당기기 | Hold to pull |
| `ready` | 처음 당길 때 타이머가 시작돼요. | The timer starts on your first pull. |
| `time` | 남은 시간 | Time left |
| `seconds` | {seconds}초 | {seconds} s |
| `sections` | 통과 구간 | Sections cleared |
| `sectionCount` | {cleared} / 8 | {cleared} / 8 |
| `score` | 점수 | Score |
| `speed` | 지퍼 속도 | Zipper speed |
| `slowMark` | 노란 바느질 통과 속도 | Speed limit at yellow stitches |
| `snag` | 천이 끼었어요! 손을 떼고 다시 당겨요. | The lining caught! Let go, then pull again. |
| `finished` | 끝까지 잠갔어요! | Zipped all the way! |
| `timeout` | 시간이 다 됐어요! | Time’s up! |
| `sectionPoints` | 구간 점수 | Section points |
| `timeBonus` | 시간 보너스 | Time bonus |
| `best` | 최고 점수 | Best score |
| `newBest` | 새 기록! | New record! |
| `retry` | 다시 하기 | Retry |

Format score values as locale-aware integers. Format `{seconds}` to one decimal place, rounding up to the next tenth while time remains. Announce snag feedback through a polite live region and use the visible outcome as the result heading. Keep the frame-by-frame timer and speed updates out of the live region. Treat the jacket art as decorative because the HUD exposes progress.

## localStorage

- `puffer-zip:best:v1` stores the best total as a base-10 integer string. Default to `0` for a missing or invalid value. Accept only digit strings whose numeric value is a safe integer from `0` through `1040`.
- Read and write inside `try/catch`. Keep a session best in memory, and compare it with the stored best before writing a completed run. Store no inputs or in-progress state.

## Edge cases

- On `pointercancel`, lost pointer capture, window blur, or tab hide, clear the held input. Accept one input source at a time and ignore extra fingers and repeated `keydown` events.
- While `document.hidden`, pause movement, the countdown, and recovery. Reset the frame timestamp on return so hidden time is excluded. A fresh press is required to accelerate again.
- Resizing preserves progress, speed, cleared sections, and remaining time. Recompute screen coordinates from normalized track units.
- On a snag, a press during recovery has no effect. A held key or pointer cannot pull through the recovery automatically.
- Finalize each run once. Ignore gameplay input after the result is set. Retry resets the slider, timer, pending input, recovery, feedback, and section count. The best score persists.
- If storage is blocked or a write fails, scoring and retry still work, and the best remains available for the current page session.

## Must not

- No external assets, libraries, fonts, network calls, analytics, or user accounts. Ship gameplay in `items/puffer-zip-challenge/index.html` with adjacent `meta.json`. Generate `thumb.png` with the repository QA command.
- No raster art, video, branded jackets, real people, copied game assets, or imitation of another game’s presentation.
- No browser dialogs, pop-ups, or navigation away from the item. No sound or vibration.
- No scroll-dependent controls or gestures that require dragging. Every action must work with touch, mouse, and keyboard.
- Before publishing, run `npm test`, `npm run build`, and `npm run qa -- --thumbs`. Check the generated thumbnail shows the jacket, zipper, and readable start controls.