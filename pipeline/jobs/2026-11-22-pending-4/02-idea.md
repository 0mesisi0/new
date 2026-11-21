# Idea and spec: 패딩 지퍼 챌린지 / Puffer Zip Challenge

## Concepts scored

Each concept is scored from 1 to 5 on value in the first 10 seconds, originality, Korean search and share demand, and buildability in one HTML file. Maximum 20. Demand scores are editorial estimates based on the supplied research and plausible Korean search terms. The brief lists no votes yet.

| Concept | Category | First 10 seconds | Originality | Korean search/share | One HTML file | Total |
|---|---|---:|---:|---:|---:|---:|
| **패딩 지퍼 챌린지 / Puffer Zip Challenge** | `games` | 5 | 4 | 4 | 5 | **18** |
| 수험표 할인 마감 메모 / Student Deal Deadline List | `tools` | 3 | 3 | 5 | 5 | 16 |
| 겨울 산책 미션 뽑기 / Winter Walk Mission Draw | `random` | 4 | 3 | 3 | 5 | 15 |

- **Puffer Zip Challenge** turns a familiar winter snag into a one-button game. The first press moves the slider immediately, and the first successful release closes a visible section of the coat. `패딩 지퍼`, `지퍼 게임`, and a score friends can compare give it seasonal search and share hooks. The supplied research on tactile play informed the interaction.
- **Student Deal Deadline List** sorts deadlines and conditions the user enters for offers they have found. It fits the `수험표 할인` search intent, but users need to enter an offer before the list saves them time.
- **Winter Walk Mission Draw** gives users a small prompt such as spotting three lit windows. The result is immediate and easy to share, but drawing a card is a familiar interaction.

**Pick Puffer Zip Challenge.** One press-and-release teaches the mechanic, and six short pulls make a complete round. The coat itself shows progress from open to zipped.

## Meta

slug `puffer-zip-challenge`

- Category `games`, kind `game`, aspect `9/16`, date `2026-11-22`. Use `games` from the live catalog validated by `play/test/items.test.mjs`.
- `ko.tags` — `패딩 지퍼`, `지퍼 게임`, `겨울 게임`
- `en.tags` — `puffer jacket`, `zipper game`, `winter game`

| Field | ko | en |
|---|---|---|
| `title` | 패딩 지퍼 챌린지 | Puffer Zip Challenge |
| `desc` | 패딩 지퍼를 당겨 표시 구간에 들어오면 손을 떼세요. 원단이 세 번 끼기 전에 여섯 구간을 모두 잠그는 겨울 타이밍 게임이에요. | Pull the puffer jacket zipper and release inside each marked band. Zip all six sections before the fabric snags three times. |
| `howto` | 버튼이나 스페이스바를 누르고 있다가 지퍼 손잡이가 표시 구간에 들어오면 떼세요. 구간을 지나치면 원단이 끼어요. | Hold the button or Space, then release when the zipper pull enters the marked band. Pulling past the band snags the fabric. |
| `about` | 쌀쌀한 아침마다 만나는 패딩 지퍼를 짧은 타이밍 게임으로 만들었어요. 최고 점수만 이 기기에 저장돼요. | A tiny timing game about getting your jacket zipped on a cold morning. Your best score stays on this device. |

## Pitch

A quilted puffer jacket fills the screen. Hold to pull the zipper up, then let go inside the marked band to seat the next section. Let go early and the pull drops back to the last closed seam. Hold too long and the lining catches. Close all six sections before the third snag.

Each band has a narrower center stripe worth five bonus points. A full zip can score up to 90 points. Everyone plays the same six sections, so scores are directly comparable.

## Flow

1. **Start.** Show the open coat, the first target band, the title, a one-line instruction, and a large start button. Starting opens the play screen immediately with the pull at the bottom.
2. **Ready and pulling.** The board shows the current target, closed sections, score, and snag count. Pressing the pull control moves the slider immediately. The status reads `지금 떼세요!` / `Release now!` while the slider is inside the band. A successful release closes one section and moves the active band to the next seam.
3. **Early release or snag.** An early release returns the slider to the last closed seam with no penalty. Passing the band immediately records one snag and returns the slider to that same seam. Keep the feedback visible until the next pull starts. After an overshoot, require release before another pull can begin.
4. **Result.** Show the coat at its final zipped height, the completion or snag-out message, sections closed, score, device best, and a large retry button. Retry opens a fresh play screen.

## Controls

- **Touch and mouse** — Tap or click start and retry. Press and hold the large pull button, then release to submit the current position. Capture the active pointer so release still registers outside the button. Ignore secondary pointers and non-primary mouse buttons.
- **Keyboard** — Tab moves focus through native controls. Enter or Space activates focused start and retry buttons. In play, a focused pull button uses Space or Enter down to begin and the matching key up to release. Ignore repeat events and suppress the pull button’s native click for handled hold keys. A gesture that activates start or retry cannot also begin a pull.
- **Click-only input** — For assistive technology that sends activation without pointer or key hold events, the first activation starts movement and the next stops it. During this mode the button reads `당기기 멈추기` / `Stop pulling`. Consume synthesized clicks following handled pointer or key gestures so one physical action submits at most once.
- **Focus and cancellation** — Focus the pull button on entry to play and retry on entry to results. If focus leaves the pull control during a pull, or the browser cancels the active pointer, return to the last closed seam without scoring or adding a snag. Keep a visible focus ring and use targets at least 44 px high.

## Round rules and scoring

The zipper travels from bottom to top. Each closed section spans one sixth of the track. Measure `t` in seconds from the start of the current pull using accumulated active frame time. For each section, map the timing values below onto marked positions between the previous seam and the current seam.

| Section | Release band in seconds | Center stripe in seconds |
|---|---:|---:|
| 1 | 0.45–1.30 | 0.75–1.00 |
| 2 | 0.55–1.30 | 0.80–1.05 |
| 3 | 0.60–1.25 | 0.82–1.03 |
| 4 | 0.65–1.25 | 0.85–1.05 |
| 5 | 0.70–1.23 | 0.88–1.05 |
| 6 | 0.75–1.23 | 0.91–1.07 |

- For section `n`, render the pull at `(n − 1 + min(t / bandEnd, 1)) / 6` of total track height. Compute the band and center stripe from the same mapping. On success, snap to seam `n / 6`.
- A release before the band starts earns zero points and leaves the section open. Both band endpoints count as success. Award 10 points for closing a section, plus 5 if the release lands within the inclusive center stripe.
- At `t > bandEnd`, register a snag once, even while the control stays held. The first two snags leave the current section open and preserve prior points. The third ends the round. Closing section six ends the round immediately.
- Save the higher of the current device best and the final score on either result. Show the new-best message only for a strictly higher score. The initial best is zero.
- Use `requestAnimationFrame` only during a pull or brief visual feedback. Cap each frame delta at 50 ms. On release, consume the elapsed time since the last processed frame with the same cap before evaluating the release. Use one resolution path so an overshoot cannot score and an individual pull cannot register two snags.

## Screen layout and visual design

Draw the jacket in inline SVG with original quilting, a contrasting lining, and two rows of zipper teeth. As each section closes, its rows join from bottom to top and the lining disappears behind the closed seam. Use a dark slate background `#172334`, blue fabric `#254F73`, warm off-white text `#F6F4EC`, mint `#9FE8CB` for the band, and amber `#FFC27A` for snag feedback. Outline the band and hatch the center stripe so both remain distinguishable without color. Use system-ui and tabular digits for scores.

| Screen | Composition and feedback |
|---|---|
| **Start** | Title and instruction above the open coat. The pull and first band sit near the foot of the track, where the first action will happen. The start button anchors the bottom. |
| **Play** | A compact top row holds sections closed, score, and snag count. The coat fills the flexible middle area. Reserve two lines for feedback above the bottom pull button so changes in copy do not move the control. |
| **Result** | Result heading above the coat, then sections closed, final score, and best. On completion, show the fully closed collar. On a snag-out, mark the caught lining at the next open seam. Place retry at the bottom. |

At 320 × 480, use 12 px side padding, allow labels to wrap, and shrink the coat before shrinking controls or text. In wide windows, center the play column at a maximum width of 460 px. Fill the iframe using `100dvh` with a `100vh` fallback and keep the document free of scrolling. Recompute the track geometry on resize from normalized progress. Apply `touch-action: none` to the pull control and prevent the default behavior of handled gameplay keys. Keep background decoration and the SVG out of the tab order.

A successful zip briefly brightens the joined teeth. A snag gives the pull a short sideways nudge. With `prefers-reduced-motion`, remove both effects and keep the movement driven by the player’s pull. The game is silent.

## Strings

Choose the language from `?lang=ko` or `?lang=en`, otherwise use the browser language (`ko` for `ko` and `ko-*`, `en` for everything else). Set `<html lang>` and the document title from the selected locale. Put all visible and accessible strings in the locale dictionary.

| Key | ko | en |
|---|---|---|
| `appTitle` | 패딩 지퍼 챌린지 | Puffer Zip Challenge |
| `startHint` | 누르고 있다가 지퍼 손잡이가 표시 구간에 들어오면 떼세요. | Hold to pull. Let go inside the marked band. |
| `start` | 시작하기 | Start |
| `pull` | 꾹 눌러 당기기 | Hold to pull |
| `stopPull` | 당기기 멈추기 | Stop pulling |
| `sections` | 잠근 구간 {n}/6 | Zipped {n}/6 |
| `score` | 점수 {score} | Score {score} |
| `snags` | 걸림 {n}/3 | Snags {n}/3 |
| `ready` | 표시 구간에 맞춰 손을 떼세요. | Release inside the marked band. |
| `pulling` | 표시 구간까지 당기세요. | Pull toward the marked band. |
| `releaseNow` | 지금 떼세요! | Release now! |
| `early` | 조금 일찍 뗐어요. 같은 구간을 다시 당겨 보세요. | Too early. Try the same section again. |
| `zipped` | 잠겼어요! +10점 | Zipped! +10 points |
| `perfect` | 한가운데에 딱! +15점 | Right in the middle! +15 points |
| `snag` | 원단이 끼었어요. 같은 구간을 다시 당겨 보세요. | The fabric caught. Try the same section again. |
| `releaseToRetry` | 손을 뗀 뒤 다시 당기세요. | Let go, then pull again. |
| `complete` | 끝까지 잠갔어요! | All zipped up! |
| `snagOut` | 원단이 세 번 끼었어요. | Three snags! |
| `best` | 최고 점수 {best} | Best {best} |
| `newBest` | 새 최고 점수! | New best! |
| `retry` | 다시 하기 | Play again |

Announce settled outcomes such as early release, a scored section, and a snag through a polite live region. Keep the moving indicator and timing cues out of the live region so announcements do not queue during a pull. Use the textual counters for sections, score, and snags so the coat drawing can remain decorative.

## localStorage

- `puffer-zip-challenge:best:v1` holds the device best as a decimal integer from `0` through `90`. Treat missing or invalid values as zero. Wrap reads and writes in `try/catch`. On a result, reread the stored value, merge it with the in-memory best and final score, and write only when the merged value exceeds the stored value.
- Keep round progress, input state, and feedback in memory. If storage is unavailable, retain the best for the life of the open page.

## Edge cases

- Hiding the iframe document or losing window focus cancels a pull without penalty. On return, the previously closed sections, score, and snag count are intact. A late keyup or pointerup from the canceled pull has no effect.
- An overshoot locks out further pulls until the active physical control is released. Click-only mode has no held input, so the pull button is available immediately after a nonterminal snag.
- When a held pull ends the round, keep retries disarmed until that gesture ends. The release cannot activate the newly focused retry button.
- Resizing during a pull redraws the slider and band from the current section and elapsed time. It does not reset progress or score.
- Retry clears the current section, snag count, score, feedback, input ownership, and frame timing. It retains the device best.
- `#demo` opens a completed result with six closed sections, one snag, and 80 points. Demo initialization neither updates the device best nor shows a new-best message. Retry clears the hash with `replaceState` and starts normal play.

## Must not

- No network calls, external assets, analytics, fonts, raster game art, or video. Ship the CSS, JavaScript, and SVG in one `index.html` alongside `meta.json`. Generate `thumb.png` through repository QA.
- No brands, real people, copied jacket artwork, or imitation of an existing game’s presentation.
- No audio or vibration. No dialogs, pop-ups, or navigation away from the item.
- No real-time deadline for the overall round. Time matters only during an active pull.
- No paid retries, public leaderboard, account, or personal data collection.