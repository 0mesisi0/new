# Idea and spec: 선물 포장 챌린지 / Gift Wrap Sprint

## Concepts scored

Scores run from 1 to 5. Demand scores are planning estimates based on the supplied research and backlog. No votes are available yet.

| Concept | Category | First 10 seconds | Originality | Korean search and share demand | One-file buildability | Total |
|---|---|---:|---:|---:|---:|---:|
| **선물 포장 챌린지 / Gift Wrap Sprint**. Follow the fold order on each gift and see how many parcels you can wrap in 30 seconds. | `arcade` | 5 | 4 | 4 | 5 | **18** |
| 새해 카운트다운 카드 / New Year Countdown Card. Open a live countdown to midnight in Korea and pick a greeting for a screenshot. | `tools` | 5 | 2 | 5 | 5 | 17 |
| 겨울 유리창 낙서 / Winter Window Doodles. Trace shapes through a fogged window to reveal the lights outside. | `chill` | 5 | 4 | 3 | 4 | 16 |

**Pick Gift Wrap Sprint.** The research suggests hands-on holiday activities and short rounds with simple controls. A player can fold the first parcel in three taps and share a score after 30 seconds. `선물 포장` and `크리스마스 게임` are plausible discovery terms, and the wrapping mechanic is distinct from the existing cake tools and winter games. [Today’s research](01-research.md)

## Meta

slug `gift-wrap-sprint`

- Category `arcade`
- Kind `game`
- Aspect `9/16`
- Date `2026-11-22`
- Korean tags `선물 포장`, `크리스마스 게임`
- English tags `gift wrapping`, `Christmas game`

| Field | ko | en |
|---|---|---|
| `title` | 선물 포장 챌린지 | Gift Wrap Sprint |
| `desc` | 화살표 순서대로 포장지를 접어 30초 동안 선물을 포장해요. 순서를 한 번도 틀리지 않으면 선물마다 보너스 점수를 받아요. | Fold the paper in arrow order and wrap as many gifts as you can in 30 seconds. Earn a bonus for every gift you wrap without a mistake. |
| `howto` | 화면의 방향 버튼을 누르거나 키보드 방향키를 써요. 화살표 순서대로 접어서 30초 안에 선물을 최대한 많이 포장하세요. | Tap the direction buttons or use the arrow keys. Follow the fold order and wrap as many gifts as you can in 30 seconds. |
| `about` | 누구나 같은 순서로 선물을 포장해요. 친구와 점수를 비교해 보세요. 최고 기록은 이 브라우저에 저장돼요. | Everyone wraps the same sequence of gifts. Compare scores with a friend. Your best score is saved in this browser. |

## Pitch

A small parcel sits on a sheet of wrapping paper. The strip above it shows which flaps to fold, and each correct press snaps a flap over the box with a visible crease. The last fold ties a ribbon and brings in the next parcel. The first parcel teaches the controls during the round, and later parcels mix up the fold order.

## Flow and screens

1. **START** — Show the title, a one-line instruction, and an open parcel with the first sequence `← → ↑`. The preview is static. The primary action starts a fresh 30-second round and focuses the first direction button. The start press never counts as a fold.
2. **PLAY** — Show time and score in the top row, the full fold sequence above the parcel, and four direction buttons in a single row beneath it. The first unfinished arrow has a thick outline. Completed arrows gain a checkmark and stay visible until the parcel is finished. For the first parcel, show the short control hint beneath the buttons. On a correct press, mark the step complete and fold the matching flap. On a wrong press, keep the current step and show the inline retry cue until the next correct press or the round ends.
3. **PAUSED** — If the iframe becomes hidden during play, freeze the round. On return, show the parcel and fold progress under a pause panel with the remaining time and a focused resume button. Resume continues from the same fold.
4. **RESULT** — Show the final score, best score and number of parcels wrapped on a cream card with a tied gift above it. Show a new-record message only if this score strictly exceeds the prior best. Focus the large retry button. Retry starts directly at parcel one with a fresh timer.

## Controls

- **Touch and mouse:** Tap or click the four direction buttons. Use native buttons with one activation path per press. Provide at least 44 × 44 CSS px targets and a visible focus ring. Set `touch-action: none` on the play controls.
- **Keyboard:** During play, the physical arrow keys trigger the corresponding folds. Tab moves between buttons, and Space or Enter activates the focused button. On the start, pause and result screens, Space or Enter activates the focused primary button. Use the order `← ↑ ↓ →` for the four direction buttons in both languages.
- Consume the default behavior only for handled game keys. Ignore held-key repeats and modified arrow shortcuts. Keep focus on the activated direction button when a new parcel appears.

## Fold sequences and scoring

| Parcel | Fold order |
|---|---|
| 1 | `← → ↑` |
| 2 | `↓ ← →` |
| 3 | `↑ → ↓` |
| 4 | `→ ↑ ← ↓` |
| 5 | `← ↓ → ↑` |
| 6 | `↓ → ↑ ←` |
| 7 | `↑ ← ↓ →` |
| 8 | `→ ↓ ← ↑` |

- Use parcels 1–3 once as the opening sequence. Cycle through parcels 4–8 until time runs out. All players get the same order on every attempt.
- The next arrow is the only valid fold. A wrong direction leaves the step unchanged and forfeits the current parcel’s clean-fold bonus. It deducts neither points nor time.
- A completed parcel scores **100 points**, plus **25 points** if every press on that parcel was correct. Reset the clean-fold flag on the next parcel. An unfinished parcel earns zero points.
- Commit the score and advance to the next parcel on the last correct press. The outgoing ribbon animation may overlap the next parcel and must never delay its first input.
- The round lasts 30,000 ms of active time. Use a monotonic clock and exclude time spent paused. Show remaining seconds rounded up. Before accepting each fold, check the deadline. A fold accepted before the deadline counts immediately, and one at or after it triggers the result. Finalize each round once.

## Visual design

- Use a midnight-blue backdrop (`#18243A`), warm cream text and paper (`#FFF4DA`), evergreen flaps (`#216655`), and coral ribbon (`#E76850`). Use system UI fonts and tabular numbers for the timer and score.
- Draw the parcel, paper and ribbon with inline SVG or CSS. Put `←`, `↑`, `↓` and `→` along the corresponding paper edges in the unfolded art. Make the folded state readable through the creases and silhouettes. Use an outline and checkmark for progress so color carries no rule by itself.
- Animate a correct fold over about 120 ms and the outgoing ribbon over about 180 ms. Use a brief outline and the inline cue for a wrong press. With reduced motion, apply all visual states immediately. The game is silent.
- Fill the iframe and center a play column capped at 420 CSS px. At 320 × 480, shrink the parcel art and spacing first so the HUD, sequence, feedback and controls all fit. Keep all four buttons at full target size. The page never scrolls. Recalculate layout on resize without resetting the game.
- Use `requestAnimationFrame` for active visual updates, with animation deltas capped at 50 ms. Calculate the round deadline independently of animation frames. Suspend animation frames while hidden.

## User-facing strings

Use `?lang=ko` or `?lang=en` when recognized. Otherwise use Korean for a `ko` browser locale and English for other locales. Set `<html lang>` and use `appTitle` for the browser tab title. Keep all copy in the `ko` and `en` dictionaries. Arrow glyphs, checkmarks, and decimal digits are shared.

| Key | ko | en |
|---|---|---|
| `appTitle` | 선물 포장 챌린지 | Gift Wrap Sprint |
| `startHint` | 화살표 순서대로 접어서 30초 안에 선물을 최대한 많이 포장하세요. | Follow the arrows and wrap as many gifts as you can in 30 seconds. |
| `start` | 포장 시작 | Start wrapping |
| `time` | 남은 시간 {seconds}초 | Time left {seconds}s |
| `score` | 점수 {score}점 | Score {score} |
| `orderLabel` | 접는 순서 | Fold order |
| `firstGiftHint` | 방향 버튼이나 키보드 방향키를 누르세요. | Tap the direction buttons or use the arrow keys. |
| `left` | 왼쪽 | Left |
| `up` | 위쪽 | Up |
| `down` | 아래쪽 | Down |
| `right` | 오른쪽 | Right |
| `nextFold` | 다음은 {direction}을 눌러요. | Press {direction} next. |
| `wrongFold` | 순서가 달라요. 다음은 {direction}이에요. | Try again. The next fold is {direction}. |
| `paused` | 잠시 멈췄어요 | Round paused |
| `resume` | 계속 포장하기 | Keep wrapping |
| `finished` | 포장 끝! | Time’s up! |
| `best` | 최고 기록 {best}점 | Best {best} |
| `giftCount` | 포장한 선물 {count}개 | Gifts wrapped {count} |
| `newBest` | 최고 기록을 깼어요! | New personal best! |
| `retry` | 다시 포장하기 | Wrap again |

Use the localized direction names as button accessible labels and in `{direction}` substitutions. Show `nextFold` in an assistive live region on entry to play and after each correct fold, including the first step of a new parcel. The visible wrong-fold cue doubles as its live announcement. Keep the per-second timer out of the live region. Hide decorative parcel art from assistive technology. Associate the result heading with the result panel so the score and parcel count are available in reading order.

## localStorage

- `gift-wrap-sprint:best` stores the best completed-round score as a decimal integer string. A missing or invalid value defaults to `0`.
- Wrap reads and writes in `try/catch`. At finalization, compare the result with the greater of the in-memory best and any valid stored best. Update the best and attempt a write only when the current score exceeds that value. Use the in-memory best when storage is unavailable.
- Store no in-progress rounds, input history, or identifying information.

## Edge cases

- **No input or incomplete final parcel.** Finish normally with the points and parcel count earned so far, including zero.
- **Rapid or simultaneous input.** Process activations in dispatch order. Read the current parcel state for every activation. Ignore keyboard auto-repeat and prevent a single touch or keypress from generating two folds.
- **Tab hidden at the deadline.** Check active elapsed time when visibility changes. Finalize an expired round immediately. Otherwise enter the pause state and await explicit resume when visible.
- **Resize mid-fold.** Redraw from the current parcel and completed steps. Preserve the deadline, score, focus and next fold. Cosmetic transitions may finish immediately.
- **Retry or reload.** Retry clears the score, parcel count, sequence position, fold position, timer, mistake flag and transient feedback. Reload opens START and restores the best score when storage is available.
- **Corrupt saved best.** Accept only decimal digits representing a nonnegative safe integer. Ignore malformed, negative or oversized values.
- **QA.** Exercise both locales at 320 × 480 with touch, mouse and keyboard. Verify a clean first parcel scores 125, a first parcel with a wrong press scores 100, hiding the tab pauses the timer, and retry clears the prior round. Before publishing, run `npm test`, `npm run build` and `npm run qa -- --thumbs`. Check that the generated thumbnail shows a readable parcel and fold sequence.

## Must not

- Keep HTML, CSS, JavaScript and vector artwork inside `index.html`. Use no network requests, external assets, fonts, libraries, analytics, raster art or video.
- Use no existing game assets, trademarks, real people or political themes.
- Use no autoplay audio, flashing feedback, dialogs, pop-ups, page navigation or page scrolling.
- Never require a drag, a swipe, color recognition or a timed hold to complete a fold.