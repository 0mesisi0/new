# Idea and spec: 곶감 바람길 / Persimmon Breeze Puzzle

## Concepts scored

Scores run from 1–5 in this order: value in the first 10 seconds, originality, Korean search/share demand, and buildability in one HTML file. Maximum 20. Demand scores are planning estimates based on the supplied research and backlog. The research flags the 곶감 trend as low confidence, with its year unconfirmed.

| Concept | Category | Score | Verdict |
|---|---|---|---|
| **곶감 바람길 / Persimmon Breeze Puzzle** — Send each puff of wind through two trays and match three drying targets. | `puzzle` | **5 / 5 / 3 / 5 = 18** | **Picked.** The first puff makes two targets move at once. The finished drying rack gives players a clear screenshot to share. |
| 겨울 빨래 타이머 / Winter Laundry Timer — Set a household timer and see when to check the load, with a compact countdown and finish time. | `tools` | 5 / 2 / 4 / 5 = 16 | Immediate utility for queries such as `빨래 타이머`. The timer has limited novelty and little reason to share. |
| 겨울 버스 창가 / Winter Bus Window — Tap windows in a parked night bus to mix synthesized rain, heater hum, and the tick of a turn signal. | `chill` | 4 / 4 / 3 / 4 = 15 | Builds on the ambient mixer backlog. The payoff depends on audio, and blending three sounds takes more tuning. |

## Meta

slug `persimmon-breeze`

- **Category** `puzzle`
- **Kind** `game`
- **Aspect** `9/16`
- **Date** `2026-11-22`
- **Tags** ko `곶감`, `겨울 퍼즐`, `숫자 퍼즐` · en `persimmons`, `winter puzzle`, `number puzzle`

| Field | ko | en |
|---|---|---|
| `title` | 곶감 바람길 | Persimmon Breeze Puzzle |
| `desc` | 바람 한 번에 채반 두 개가 함께 말라요. 정해진 횟수 안에 채반마다 목표 눈금을 맞춰 겨울 곶감 세 판을 완성해 보세요. | Each puff dries two trays at once. Match every tray’s target with a limited number of puffs across three winter puzzles. |
| `howto` | 바람길 버튼을 누르면 연결된 채반 두 개의 눈금이 하나씩 올라요. 바람을 모두 쓴 뒤 세 눈금이 목표와 같으면 성공이에요. 제출 전에는 마지막 바람을 되돌릴 수 있어요. | Choose a route to raise two tray counters by one. Use every puff and match all three targets. You can undo your last puff before checking. |
| `about` | 겨울 처마 밑 곶감에서 떠올린 세 판짜리 숫자 퍼즐이에요. 시간 제한 없이 풀 수 있어요. | A three-round number puzzle inspired by persimmons hanging under winter eaves. Play at your own pace. |

## Pitch

Three trays of persimmons hang under a winter eave. Each needs a different amount of breeze, and each route reaches exactly two trays. Pick a route to watch both counters advance. The first board takes two puffs, so a player can grasp the rule and finish a board within the first ten seconds.

The same three boards appear in every run. Players can compare results or trade solutions using a screenshot of the final rack.

## Flow

1. **START.** Show the title, one-line instructions, and a preview of the first board with target counts `2`, `1`, and `1`. The primary button opens board 1 with all counters at zero.
2. **PLAY.** Show the board number, puffs remaining, three tray counters, three route buttons, and an undo button. Each move updates both affected trays immediately. The check button becomes available when the last puff is spent. Undo remains available until the board is checked.
3. **BOARD RESULT.** Keep the tray counters visible and mark each tray as matched, short, or over. Show a short verdict and the next button. Checking locks the board and records its outcome once. Board 3 leads to the final rack.
4. **GAME OVER.** Show the current score, best score, and three illustrated board outcomes in order. A full-width retry button opens board 1 with fresh counters and a fresh score.

## Controls

- **Touch and mouse.** Tap or click a route to spend one puff. Use the buttons to undo, check, advance, or replay. Activate on release. Releasing outside the original target or receiving `pointercancel` leaves the board as it was.
- **Keyboard.** Tab and Shift+Tab move focus. Enter and Space activate the focused button. During play, `1`, `2`, and `3` select left–center, center–right, and left–right. `U` undoes the last puff. Ignore key repeats and browser or system shortcuts with modifiers. Prevent default only for shortcuts the game handles, and use native button activation once per press.
- **Focus.** On entry, focus Start. On a new board, focus the first route. After checking, focus Next or See Results. On the final screen, focus Play Again. Keep the focus indicator visible.
- **Accessibility.** Every interactive target is at least 44 × 44 CSS px. Show route names and numbers alongside the drawn paths. Update a single polite live region after a move or undo. Mark tray status with text and shape as well as color.

## Boards and scoring

| Board | Target L / C / R | Puff budget | One solution, in any order |
|---|---|---:|---|
| 1 | `2 / 1 / 1` | 2 | LC, LR |
| 2 | `1 / 3 / 2` | 3 | LC, CR, CR |
| 3 | `3 / 2 / 3` | 4 | LC, CR, LR, LR |

- Each route adds exactly one to each of its two trays. Reusing a route is allowed.
- The ordered move list is the board state. Derive remaining puffs and tray counts from that list. Undo removes the most recent move and restores one puff.
- Allow overshoot and show the actual count, such as `3 / 2`. Players can see where the extra puff went and undo it before checking.
- Award one point only when all three counts equal their targets at submission. Each board is submitted once per run. Display the sum as `0–3 / 3` and update the best score when board 3 is submitted.
- Keep solutions in the spec for verification. The game gives feedback through the counters and the board result.

## Screen layout and feedback

| Screen | Layout | Feedback |
|---|---|---|
| **Start** | Title and instructions above a rack of three muted orange trays. The first board’s target badges hang from the tray rims. One full-width button sits below the rack. | The preview is static and uses the same left-to-right arrangement as play. |
| **Play** | Board number and remaining puffs above the rack. Each tray shows its position, current count, and target. Stack three route buttons below it, followed by Undo and Check Side by side. | A thin wind stroke traces the selected route for 180 ms. The two affected counters change on activation. A check mark indicates an exact count and an upward marker indicates overshoot. |
| **Board result** | Keep the three trays in place. Replace the route controls with the verdict and a full-width forward button. | Reveal all three tray statuses together. Use a small rim highlight on matched trays. |
| **Game over** | Show score and best score above three compact rack tiles. Each tile carries its board number and outcome. Keep the replay button below the rack. | Three matched boards receive the all-clear heading. Scores of zero through two receive the standard heading. |

## Visual design

- Use a deep pine background `#132D29`, warm paper `#FFF3D8`, persimmon orange `#F9A34B`, and pale mint wind strokes `#A8E6CF`. Use dark ink on paper. Draw the eave, woven trays, persimmons, and routes in original CSS and inline SVG.
- Use a `system-ui` stack with tabular numerals for counters. Keep the rack centered in a column up to 480 px wide. Stretch the background to the iframe edges.
- At `320 × 480`, use 12 px side gutters, a compact rack, and tight vertical gaps. Keep buttons at least 44 px high and allow the route names to wrap. Fit all controls inside a `100dvh` shell with a `100vh` fallback and no page scrolling.
- Use `requestAnimationFrame` only for active wind strokes, with elapsed time capped at 50 ms per frame. Pause frames while hidden and discard hidden elapsed time on return. Under `prefers-reduced-motion`, show the route and counter changes immediately without moving strokes. The game is silent.

## Strings

Use one `{ ko: {...}, en: {...} }` dictionary for visible text, the document title, accessible names, and announcements. Take `ko` or `en` from `?lang=` when recognized. Otherwise use Korean for a `navigator.language` beginning with `ko` and English for all other values. Set `<html lang>` to match.

| Key | ko | en |
|---|---|---|
| `appTitle` | 곶감 바람길 | Persimmon Breeze Puzzle |
| `startHowTo` | 바람 한 번에 채반 두 개. 세 목표 눈금을 맞춰 보세요. | One puff reaches two trays. Match all three targets. |
| `start` | 시작하기 | Start |
| `board` | {round} / 3판 | Board {round} of 3 |
| `puffsLeft` | 남은 바람 {n}회 | Puffs left: {n} |
| `left` | 왼쪽 | Left |
| `center` | 가운데 | Center |
| `right` | 오른쪽 | Right |
| `trayCount` | {current} / {target} | {current} / {target} |
| `trayStatus` | {tray} 채반, 현재 {current}, 목표 {target} | {tray} tray, current {current}, target {target} |
| `routeLC` | 1 · 왼쪽 + 가운데 | 1 · Left + center |
| `routeCR` | 2 · 가운데 + 오른쪽 | 2 · Center + right |
| `routeLR` | 3 · 왼쪽 + 오른쪽 | 3 · Left + right |
| `undo` | 되돌리기 | Undo |
| `check` | 결과 확인 | Check |
| `match` | 딱 맞아요 | Matched |
| `short` | {n} 부족 | {n} short |
| `over` | {n} 초과 | {n} over |
| `moveAnnouncement` | 왼쪽 {l}, 가운데 {c}, 오른쪽 {r}. 남은 바람 {n}회. | Left {l}, center {c}, right {r}. Puffs left: {n}. |
| `undoAnnouncement` | 바람을 되돌렸어요. {state} | Last puff undone. {state} |
| `boardClear` | 세 채반이 모두 딱 맞아요! | All three trays match! |
| `boardMiss` | 목표와 다른 채반이 있어요. | Some trays missed their targets. |
| `next` | 다음 판 | Next board |
| `seeResults` | 최종 결과 | See results |
| `gameOver` | 오늘의 곶감 채반 | Your persimmon rack |
| `perfect` | 세 판 모두 완성! | All three boards cleared! |
| `score` | 완성 {score} / 3판 | Cleared: {score} / 3 |
| `best` | 최고 기록 {best} / 3판 | Best: {best} / 3 |
| `rackClear` | {round}판 완성 | Board {round}: cleared |
| `rackMiss` | {round}판 미완성 | Board {round}: missed |
| `retry` | 다시 하기 | Play again |

Interpolate `{state}` from `moveAnnouncement`. Render the tray positions and counts as visible text. Give each tray its accessible name from `trayStatus` and expose its result status alongside it. Treat the route drawings as decorative. The final rack uses the same board labels in screenshots and on screen.

## localStorage

- `persimmon-breeze:best:v1` holds a string integer from `"0"` to `"3"`. Default to `0` for a missing or invalid value.
- Wrap each read and write in `try/catch`. On completion, merge the run score with the in-memory best and any valid stored best before writing. If storage fails, keep the best in memory for the rest of the page session.
- Keep the current route history and board outcomes in memory. Refresh opens Start.

## Edge cases

- Disable Undo with an empty move list. Disable Check until all puffs are spent. Disable route buttons at zero puffs, and re-enable them after a successful undo.
- Apply each accepted action to state synchronously. The last puff can only be spent once, even if events arrive together. A check event changes screens before another submission can score the board.
- Repeated check, next, or retry events apply only to the screen where the action is valid. Clear any wind stroke when leaving a board.
- Resizing recomputes the layout and wind path geometry while preserving the current screen, counts, and move list. Hiding and reopening the tab preserves the board.
- Replay resets board index, move list, outcomes, score, and feedback. The best score carries over.
- `#demo` opens the finished three-board rack with a sample score of `3 / 3` and a displayed demo best of `3 / 3` for thumbnails. Skip storage in demo mode. Replay starts normal board 1 and restores the real best from storage.
- Before publishing, run `npm test`, `npm run build`, and `npm run qa -- --thumbs`. Review the generated thumbnail and check both languages at `320 × 480` using touch and keyboard. Verify undo after an overshoot, storage failure, and all four final scores.

## Must not

- No network requests, external scripts, fonts, analytics, raster assets, or video. Ship all game HTML, CSS, and JS in `index.html`.
- No sound, countdown, move-speed bonus, or daily lockout.
- No real food-drying instructions, safety claims, brands, real people, or copied game assets.
- No modal dialogs, `alert`, `confirm`, `prompt`, `window.open`, or page navigation.