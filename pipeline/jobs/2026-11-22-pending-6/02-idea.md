# Idea and spec: 패딩 지퍼 올리기 / Zip Up the Puffer

## Concepts scored

Scores run from 1 to 5 for first-10-second value, originality, Korean search and share demand, and buildability in one HTML file, in that order. Maximum 20. Demand scores are editorial estimates based on the supplied research and backlog.

| Concept | Category | Scores | Verdict |
|---|---|---|---|
| **패딩 지퍼 올리기 / Zip Up the Puffer** | **`arcade`** | **5 / 4 / 4 / 5 = 18** | **Picked.** Two taps produce the first satisfying click. A recognizable winter annoyance and a score out of 900 give players something to compare. |
| 연차 붙이기 계산기 / Bridge-Leave Calculator | `tools` | 4 / 3 / 5 / 4 = 16 | Builds on the backlog’s 2027 holiday idea. The user picks a holiday and sees how many consecutive days off one or two leave days buy. Holiday data needs verification before publication. |
| 겨울 산책 뽑기 / Winter Walk Draw | `random` | 4 / 3 / 3 / 5 = 15 | One tap draws a short winter photo mission, such as finding a warm-lit window. Easy to share, with most of the payoff happening after the user leaves the page. |

## Meta

slug `puffer-zip`

- Category `arcade`, kind `game`, aspect `9/16`, date `2026-11-22`
- Korean tags `패딩 지퍼`, `타이밍 게임`, `겨울`
- English tags `puffer jacket`, `timing game`, `winter`

| Field | ko | en |
|---|---|---|
| Title | 패딩 지퍼 올리기 | Zip Up the Puffer |
| Description | 패딩 지퍼가 줄무늬 구간에 들어오는 순간 멈춰 보세요. 딸깍, 한 칸씩 맞물리는 지퍼를 끝까지 올리는 겨울 타이밍 게임이에요. | Stop the slider inside each striped band. Hear the click in your head as six sections of a puffer jacket zip shut. |
| How to play | 당기기를 눌러 지퍼를 움직이고, 손잡이가 줄무늬 구간에 들어오면 멈추세요. 가운데에 가까울수록 점수가 높고 세 번 빗나가면 끝나요. | Press Pull, then Stop when the slider reaches the striped band. Aim for the center. Three misses end the run. |
| About | 추운 날 한 번쯤 걸려 본 패딩 지퍼를 짧은 타이밍 게임으로 만들었어요. 최고 점수는 이 브라우저에 저장돼요. | A familiar winter snag turned into a short timing game. Your best score is stored in this browser. |

## Pitch

A quilted puffer fills the screen. Press **Pull** and the zipper slider climbs. Press **Stop** as it enters the stitched target band. The teeth snap together below the slider, the fabric draws inward, and the next section is ready. The first target is wide enough to learn in one attempt. Six locks close the jacket.

The supplied research’s tactile-play entries (#3 and #6) motivate the visible fabric response. The six-section course uses original artwork and a repeatable timing challenge.

## Flow

1. **START.** Show the title, one-line instruction, a jacket with its first target visible, and a large **Start** button. Starting opens the first section in its ready state.
2. **PLAY · READY.** Show the score, section number, and misses remaining. Mark the next target on the track. **Pull** starts the slider from the beginning of that section.
3. **PLAY · MOVING.** Change the same button to **Stop**. If the player stops inside the target band, lock the section and award points. An early stop or an overrun counts as one miss.
4. **PLAY · FEEDBACK.** Hold the outcome for 300 ms and disable the action. On a lock, show the points gained and keep the teeth closed. On a miss, show the reason and return the slider to the start of the same section. The sixth lock or third miss leads to the result. Every other outcome returns to ready.
5. **RESULT.** Show the finished jacket or the jacket with its last locked section preserved, followed by the outcome, score, best score, and a large **Try again** button. Retry clears the run and returns directly to section one, ready to pull.

## Controls

- Use native buttons with at least 44 × 44 px targets. Pointer activation and keyboard activation both use the button’s click action.
- Tab moves focus. Enter and Space activate the focused button. Ignore repeated Enter keydowns on the controls and keep the same button and focus when **Pull** changes to **Stop**.
- On a keyboard-triggered screen change, focus the next primary action. Keep a visible focus ring at every stage.
- Suppress pan and zoom gestures on the jacket play area. Preserve standard keyboard navigation and browser shortcuts.

## Sections and scoring

Draw the track from hem to collar, divided into six equal visual sections. In each section, the slider moves upward at constant speed. The target is defined by inclusive bounds on the slider center, measured from 0 at the section’s start to 1 at its end.

| Section | Time to traverse full section | Target band |
|---|---:|---:|
| 1 | 1,500 ms | 0.42–0.72 |
| 2 | 1,450 ms | 0.58–0.84 |
| 3 | 1,350 ms | 0.29–0.54 |
| 4 | 1,250 ms | 0.60–0.83 |
| 5 | 1,200 ms | 0.40–0.62 |
| 6 | 1,100 ms | 0.62–0.82 |

- **Stop** evaluates the last rendered slider position. The first animation frame beyond the upper bound records an overrun and ends that attempt.
- For a lock at position `p`, award `100 + round(50 × (1 − abs(p − midpoint) / halfWidth))`. Clamp the bonus to 0–50. The run maximum is 900 points.
- A miss leaves the score intact and deducts one of the three chances. A lock preserves the remaining chances. Record the best score on either result, including an unfinished run. Show the record message only when the score strictly exceeds the previous best.
- Keep the six bands fixed across retries and languages.

## Visual design

Use an inline SVG for the jacket, track, slider, teeth, and striped bands. Set the jacket in ice blue `#A7CBD8` against midnight navy `#172536`. Use amber `#FFC46B` for the slider and mint `#86E3B3` for locked teeth. Dark stripes and a center tick identify the target independently of color. Use system-ui text and tabular numerals for scores.

Keep the jacket recognizable on the start screen and leave the whole zipper visible at 320 × 480. Fit the score row, artwork, feedback line, and action within the iframe, with no page scrolling. On wide screens, center the portrait composition and extend the navy background to fill the window. On lock, close the current row of teeth and briefly pull the fabric inward. With reduced motion, retain the slider movement needed for timing and replace the fabric movement with a static locked state.

## Strings

Use a single `{ ko, en }` dictionary for interface text and accessible names. Read `?lang=ko` or `?lang=en`, fall back to Korean for browser languages beginning with `ko` and English otherwise, and set `<html lang>`. Announce feedback once per attempt in a polite live region. The jacket is decorative on START and RESULT. During PLAY, expose the track’s accessible name and value text on demand without announcing every animation frame.

| Key | ko | en |
|---|---|---|
| `title` | 패딩 지퍼 올리기 | Zip Up the Puffer |
| `intro` | 지퍼를 당기고 줄무늬 구간에서 멈추세요. | Pull the zipper and stop inside the striped band. |
| `start` | 시작 | Start |
| `score` | 점수 {score} | Score {score} |
| `best` | 최고 점수 {best} | Best {best} |
| `section` | {section}/6 구간 | Section {section}/6 |
| `chances` | 남은 기회 {chances}번 | Chances left: {chances} |
| `pull` | 당기기 | Pull |
| `stop` | 멈추기 | Stop |
| `locked` | 딸깍! +{points}점 | Click! +{points} |
| `early` | 너무 빨리 멈췄어요. | Stopped too soon. |
| `late` | 줄무늬 구간을 지나쳤어요. | Passed the striped band. |
| `paused` | 다시 당기면 이어서 할 수 있어요. | Press Pull to resume. |
| `finished` | 지퍼를 끝까지 올렸어요! | Zipped all the way up! |
| `snagged` | 지퍼가 걸렸어요! | The zipper snagged! |
| `resultScore` | {score} / 900점 | {score} / 900 points |
| `newBest` | 새 최고 기록! | New best! |
| `retry` | 다시 하기 | Try again |
| `trackLabel` | 지퍼 손잡이 위치 | Zipper slider position |
| `trackBefore` | 줄무늬 구간 전 | Before the striped band |
| `trackInside` | 줄무늬 구간 안 | Inside the striped band |
| `trackPast` | 줄무늬 구간 지남 | Past the striped band |

## localStorage

- `puffer-zip:best:v1` stores the highest completed-run score as a base-10 integer string from `0` through `900`. Treat absent, malformed, or out-of-range values as `0`.
- Wrap reads and writes in `try/catch`. Retain the best in memory if storage is blocked. Read storage again when settling a result and keep the highest of the stored, in-memory, and current scores.

## Edge cases

- Use `requestAnimationFrame` with elapsed time capped at 50 ms per frame. On visibility loss during a pull, discard that pull and return to the current section’s ready state with the resume message. Keep the score, locked sections, and chances. Pause any pending feedback transition while hidden.
- Resize from normalized section progress so rotation preserves the slider position and target bounds.
- Make the first accepted stop settle the attempt immediately. A pointer cancellation or release outside the button leaves the native button unactivated. Duplicate activation during feedback has no effect.
- Apply the sixth lock or third miss once, show its feedback, and then render the result. Retry resets the slider, feedback, chances, score, and animation state.
- Verify both languages at 320 × 480, test a perfect run and a three-miss run, and run `npm test`, `npm run build`, and `npm run qa -- --thumbs`. Use the illustrated start screen for the thumbnail.

## Must not

- No network requests, external fonts or scripts, analytics, or external assets. Keep the experience in `index.html` with inline HTML, CSS, SVG, and JavaScript.
- No raster game art, video, jacket brands, real people, or artwork copied from another game.
- No audio, vibration, dialogs, pop-ups, or navigation away.
- No idle countdown or penalty for switching tabs. Only an early stop or an overrun consumes a chance.