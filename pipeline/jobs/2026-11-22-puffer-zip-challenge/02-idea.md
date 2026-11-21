# Idea and spec: 패딩 지퍼 챌린지 / Puffer Zip Challenge

## Concepts scored

Each criterion is scored from 1 to 5, for a maximum of 20. Korean search and share scores are editorial estimates based on the supplied research. The brief records no votes yet.

| Concept | Category | First 10 seconds | Originality | Korean search/share demand | One-file buildability | Total |
|---|---|---:|---:|---:|---:|---:|
| **패딩 지퍼 챌린지 / Puffer Zip Challenge** — Hold to pull a zipper and release at four fabric snags. | **arcade** | 5 | 4 | 4 | 5 | **18** |
| 수능 끝, 오늘 뭐 하지? / After the Exam, What Now? — Pick an energy level and draw a free, low-prep outing or at-home activity. | random | 4 | 3 | 4 | 5 | 16 |
| 무언 송년회 빙고 / Year-End Party Bingo — Tap an editable 3×3 card as small party moments happen, then screenshot the completed line. | tools | 4 | 3 | 4 | 5 | 16 |

**Picked:** Puffer Zip Challenge. The zipper moves on the first press, and the first snag arrives within a second of pulling. The winter clothing hook gives friends an obvious score challenge to share. Today’s research points to tactile play, and the existing Paper Smoother uses that appeal for freeform smoothing. This item turns it into a short, timed hold-and-release game.

## Meta

slug `puffer-zip-challenge`

- Category `arcade`, kind `game`, aspect `9/16`, date `2026-11-22`
- Tags ko `패딩`, `지퍼`, `타이밍`, `겨울 게임` · en `puffer jacket`, `zipper`, `timing`, `winter game`

| Field | ko | en |
|---|---|---|
| title | 패딩 지퍼 챌린지 | Puffer Zip Challenge |
| desc | 패딩 지퍼를 당기다가 천이 낀 구간에서 손을 떼세요. 24초 안에 네 군데를 풀고 끝까지 올려 최고 점수에 도전해 보세요. | Pull your puffer zipper and let go at each snag. Clear all four and zip to the top in 24 seconds for a high score. |
| howto | 당기기 버튼이나 스페이스바를 누르고 있다가 손잡이가 줄무늬 구간에 들어오면 놓으세요. 네 군데를 풀고 지퍼를 끝까지 올리면 성공이에요. | Hold Pull or the Space bar. Release when the pull tab enters a striped zone. Free all four snags and pull the zipper to the top. |
| about | 겨울마다 한 번쯤 걸리는 패딩 지퍼를 24초짜리 타이밍 게임으로 만들었어요. | A 24-second timing game about the zipper that always catches when you’re heading out. |

## Pitch

A quilted puffer jacket fills the play area. Hold the pull button and zipper teeth snap together below the tab. When the tab reaches a striped patch of trapped fabric, let go to free it. Pull past the patch and the tab slips back a little, ready for another try. The result card shows the run score, best score, snags cleared and jams.

## Flow

| Screen | Layout and behavior |
|---|---|
| **START** | Show the title, a one-line instruction, a static jacket preview with the first striped patch and a large Start button. Focus Start on entry. The timer stays at 24 seconds until the first accepted pull. |
| **PLAY** | Show time left, cleared snags out of four and Pause in the top bar. The jacket and zipper occupy the center. A fixed bottom area contains the current instruction and a full-width Pull button. The next snag has a striped band and pointer mark. A successful release folds its stripe away and leaves a check mark. A jam snaps the tab back and leaves the band active. |
| **PAUSE** | Keep the jacket visible behind an opaque card with Paused and Resume. Freeze the tab, countdown and feedback. Focus Resume. After resuming, focus Pull and require a fresh press. |
| **RESULT** | Show the completion or timeout heading, a small jacket at its final position, score, best score, snags cleared, jams and a large Retry button. Show a New best badge only when this run strictly improves the best. Focus Retry. Retrying opens PLAY with the tab at the bottom, zero clears and jams, and a fresh 24 seconds. |

## Controls

- **Touch and mouse** — Use pointer events. A primary pointer down on Pull captures that pointer. Pointer up releases the tab even outside the button. Ignore extra pointers and secondary mouse buttons.
- **Keyboard** — Space pulls during play wherever focus is, except on Pause, where native Space activation pauses. Enter activates focused buttons and also supports hold-and-release on focused Pull. `Escape` pauses or resumes a live round. `Tab` reaches every control. Ignore key repeat and prevent default scrolling for handled gameplay keys. Keep a visible focus ring.
- **Input ownership** — The first pull input owns the hold until it ends. Pointer cancellation, unexpected capture loss or focus leaving the play document ends the hold without clearing a snag and pauses the round. Start, Resume and Retry consume their activation gesture. A new press begins the next pull.
- **Targets** — Use controls at least 44 × 44 CSS px, with Pull at least 56 px tall. Apply `touch-action: none` to the play controls and jacket.

## Timing and score

Tab position is normalized from `0` at the hem to `1` at the collar. Judge the tab’s center against the marked bands. The same track is used on every run.

| Snag | Inclusive band | Return position after a jam |
|---|---|---:|
| 1 | `0.14–0.22` | `0.08` |
| 2 | `0.34–0.42` | `0.28` |
| 3 | `0.55–0.63` | `0.49` |
| 4 | `0.75–0.83` | `0.69` |

- The tab advances at `0.26` track lengths per second while held. Before the active band, releasing stops the tab in place. Releasing inside the active band clears exactly one snag and stops the tab there. Cleared bands have no further effect.
- Moving beyond the active band’s upper edge before releasing adds one jam and places the tab at the listed return position. The player must release and press again. The release after a jam leaves the snag active. Only the next uncleared band can trigger either outcome.
- Count down from `24,000` ms of active play after the first pull. Time runs while the player is between pulls and after a jam. Pause and document hiding freeze it. Display seconds as `ceil(remainingMs / 1000)`.
- Advance the same clock before processing inputs and on each `requestAnimationFrame`. Use monotonic timestamps and cap each advance at 50 ms. Within an advance, resolve the first crossed boundary. The deadline wins a tie with the collar. After the fourth clear, reaching the collar with time remaining finishes the run immediately.
- Score = `max(0, 100 × cleared − 20 × jams + finishBonus)`. On completion, `finishBonus = floor(remainingMs / 100)`. On timeout, it is `0`. A finish with `12,000` ms left and one jam scores `500`. A timeout with two clears and one jam scores `180`.

## Visual design

- **Palette** — Midnight blue background `#14263B`, teal nylon `#2C766E`, pale teeth and text `#F4F1E7`, amber snag stripes `#FFD36A`. Use a broken-tooth mark for a jam and a check for a clear so the states remain distinct without color.
- **Jacket** — Draw quilt seams, teeth and hardware with inline SVG and CSS. The closed teeth extend from the hem to the tab. Mark the tab center with a small horizontal line so players can see exactly where release is judged.
- **Feedback** — Use a 120 ms fabric fold on clear and a 150 ms tab recoil on jam. Recoil is visual only. The tab’s judged position updates immediately. Under `prefers-reduced-motion`, switch directly to the new visual state and keep the position feedback needed for timing.
- **Layout** — Fill the iframe with `100dvh` and a `100vh` fallback. At 320 × 480, keep the top and bottom controls fixed within a three-row layout and let the jacket shrink in the middle. At desktop sizes, center the play column at a maximum width of 480 px. Resize from normalized game state. Use system fonts and keep the page free of scrolling.

## Sound

Silent throughout.

## Strings

Use the `lang` query parameter for `ko` or `en`. Otherwise use Korean when `navigator.language` starts with `ko`, and English in all other cases. Set `<html lang>` and the document title. The localized title from Meta also supplies the START heading.

| Key | ko | en |
|---|---|---|
| `startHint` | 눌러서 당기고, 줄무늬 구간에서 놓으세요. | Hold to pull. Let go in the striped zone. |
| `start` | 시작 | Start |
| `time` | 남은 시간 {seconds}초 | {seconds}s left |
| `cleared` | 풀린 곳 {count}/4 | Snags cleared {count}/4 |
| `pause` | 일시 정지 | Pause |
| `paused` | 잠깐 쉬는 중 | Paused |
| `resume` | 계속하기 | Resume |
| `pull` | 길게 눌러 당기기 | Hold to pull |
| `pullHint` | 줄무늬 구간까지 당기세요. | Pull toward the striped zone. |
| `releaseHint` | 지금 놓으세요! | Let go now! |
| `clearFeedback` | 천이 빠졌어요! | Fabric freed! |
| `jamFeedback` | 지퍼가 걸렸어요. 놓고 다시 당기세요. | Zip jammed. Let go and pull again. |
| `lastPull` | 이제 끝까지 당기세요! | Now pull to the top! |
| `finished` | 지퍼를 다 올렸어요! | All zipped up! |
| `timeout` | 시간이 다 됐어요! | Time’s up! |
| `score` | 점수 {score}점 | Score {score} |
| `best` | 최고 점수 {score}점 | Best {score} |
| `jams` | 걸린 횟수 {count}회 | Jams {count} |
| `newBest` | 새 최고 기록! | New best! |
| `retry` | 다시 하기 | Retry |

Use the same strings for visible labels and accessible names. Announce clears and jams in a polite live region once per event. Keep the countdown and per-frame tab movement silent to assistive technology. On a successful release, show `clearFeedback` for up to 500 ms, then return to `pullHint` or `lastPull`. A new pull can replace that message immediately. Keep `jamFeedback` on screen until the next accepted pull.

## localStorage

- `puffer-zip-challenge:best:v1` stores the highest score as a decimal integer string. Accept integers from `0` to `640`. A missing or invalid value starts at `0`.
- Wrap reads and writes in `try/catch`. On a result, take the maximum of the current score, the in-memory best and any valid stored best. Set the badge by comparing this run with the best from before the update. If storage is unavailable, track the best in memory for the session. Persist only the best score.

## Edge cases

- A release exactly on either band boundary clears the snag. A release after overshooting leaves it uncleared. A press and release before the first band starts the timer and leaves the tab at its current position.
- Pause releases any held input without clearing the current snag. Reset the animation timestamp on resume. Time spent hidden or paused never advances the run.
- Score the result once, even if expiry, release or a visibility change arrives in the same frame. Clear input ownership, feedback timers and pending animation state on retry.
- Format zero snags, zero jams and a zero best with the same localized templates. A tie leaves the New best badge off.
- For `#demo`, show a static RESULT with four clears, one jam, a score of `500` and a best of `520`. The demo skips storage and animation. Retry exits the demo state and starts a normal round.
- Before publishing, run `npm test`, `npm run build` and `npm run qa -- --thumbs`. Check both languages at 320 × 480, a keyboard-only clear, a pointer cancellation inside a band, a timeout after pause and a retry with storage blocked. Verify that the generated thumbnail shows the jacket and readable score.

## Must not

- No network requests, external scripts or fonts, analytics, raster art or video. Keep all game logic, styling and artwork in `index.html`.
- No copied game art, layouts, branding, real people or jacket logos.
- No random snags, daily lockouts or paid retries. Each run uses the same track and scoring rules.
- No alerts, confirms, prompts, pop-ups, navigation away from the item, audio or vibration.