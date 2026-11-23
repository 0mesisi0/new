# Idea and spec: 온돌 배관 잇기 / Ondol Pipe Puzzle

## Concepts scored

Each score is 1–5, in order of value in the first 10 seconds, originality, Korean search/share demand, and buildability in one HTML file. Demand scores are editorial estimates based on the research brief and the proposed search terms.

| Concept | Category | Score | Verdict |
|---|---|---|---|
| **온돌 배관 잇기 / Ondol Pipe Puzzle** | **games** | **5 / 4 / 4 / 5 = 18** | **Picked.** One turn warms the first room. The Korean title fits searches such as `온돌 게임` and `파이프 연결 퍼즐`, and the warm-floor reveal gives players a result to show. |
| 정규식 놀이터 / Regex Playground | tech | 4 / 2 / 4 / 4 = 14 | An example highlights matches immediately. The backlog idea serves a clear `정규식 테스트` search, with a format users can already find elsewhere. |
| 자판기 동전 합창 / Vending Machine Coin Choir | weird | 5 / 4 / 2 / 4 = 15 | Each tap drops a coin that leaves a singing face in the change tray. The first tap is the joke, and sharing depends on the sound coming through. |

The pick uses the supplied research’s tactile-play direction and gives it a winter subject distinct from the existing and queued items. The first board is a one-turn tutorial, followed by two boards that reward reading the pipe openings.

## Meta

slug `ondol-pipe-puzzle`

- Category `games`, kind `game`, aspect `9/16`, date `2026-11-23`
- Tags ko `온돌`, `파이프 연결`, `겨울 퍼즐`
- Tags en `ondol`, `pipe puzzle`, `winter`
- Title ko `온돌 배관 잇기`
- Title en `Ondol Pipe Puzzle`
- Desc ko `차가운 방 세 칸에 온기를 채워요. 타일을 돌려 입구와 출구를 잇고, 적은 회전으로 최고 점수에 도전하세요.`
- Desc en `Warm three chilly rooms. Turn the pipe tiles to join the inlet and outlet, and use fewer turns to beat your best score.`
- Howto ko `배관을 누르면 시계 방향으로 돌아가요. 키보드는 방향키로 이동하고 Enter나 스페이스바로 돌려요. 모든 배관을 이어 방 세 칸을 데우세요.`
- Howto en `Tap a pipe to turn it clockwise. Use the arrow keys to move and Enter or Space to turn. Connect every pipe to warm all three rooms.`
- About ko `바닥이 차가운 겨울 아침에서 출발한 배관 퍼즐이에요. 실제 온돌 배관은 퍼즐 속 배관과 다르게 설치돼요.`
- About en `A pipe puzzle inspired by cold winter mornings and Korean heated floors. The boards use fictional pipe layouts.`

## Pitch

A cold tile floor sits between a gold inlet and a dark outlet. Turn one elbow and warmth travels along the connected pipes, tile by tile. The whole floor changes from slate blue to amber when the route reaches the outlet. Three rooms make up a run. Each room scores up to 100 points based on how many turns it takes.

## Flow and screens

1. **START** shows the app title, one-line instructions, a static preview of the first board, and a large Play button. The preview shows a ring around the elbow that needs turning. The best score appears below the button, using `0` on a first visit.
2. **ROOM 1** opens on the preview board with an interactive elbow. A single clockwise turn clears it. Show the room counter, current room turns, cumulative run points, and the one-turn hint. Later rooms replace the hint with the standard instructions.
3. **ROOMS 2–3** use the same layout. Turning any pipe updates the connected segment immediately. The player may turn pipes in any order. Room 2 has seven pipes and room 3 has nine. Each room starts at zero turns and carries forward the run score.
4. **ROOM CLEAR** keeps the solved board visible. Award the room score once, then send a warm highlight down the path over 400 ms. Show the room-clear heading, points earned, and a Next room button, or View score after room 3. The button works as soon as the room is solved. The pipe controls stay locked until the player advances.
5. **RESULT** shows the solved third board as a compact illustration, the total score out of 300, the best score, and a large Play again button. Show the new-best message only when the score strictly exceeds the previous best. Play again opens room 1 immediately with fresh boards and zero turns and points.

## Controls

- **Touch and mouse:** Activate tiles and buttons with a single tap or click. Use native buttons with pointer events and one activation path per gesture. Every pipe and action has a target at least 44 × 44 CSS px. Use `touch-action: none` on the board.
- **Keyboard:** Enter or Space activates focused buttons. On a focused pipe, arrow keys move to the next playable pipe in that direction in the same row or column, skipping blank tiles. Focus stays in place when there is no pipe in that direction. Tab and Shift+Tab follow native focus order. Prevent the default action for handled board keys and keep a visible focus ring.
- **Focus:** On room 1 entry, focus the tutorial elbow. On subsequent room entry, focus the inlet-side pipe. After each clear, focus the advance button. On the result, focus Play again. Provide localized pipe names and announce room clears and scores in a polite live region.

## Boards and scoring

Each board is a 4 × 4 grid. Coordinates are `row,column` from the top left. The paths below list every playable cell in inlet-to-outlet order. The inlet enters the first cell from the west, and the outlet leaves the final cell to the east. All unlisted cells are decorative floor tiles.

| Room | Ordered path | Initial clockwise turns away from the solution, in path order | Minimum turns |
|---|---|---|---:|
| 1 | `2,1 → 2,2 → 3,2 → 3,3 → 3,4` | `0, 1, 0, 0, 0` | 1 |
| 2 | `1,1 → 1,2 → 2,2 → 2,3 → 3,3 → 4,3 → 4,4` | `1, 0, 2, 1, 1, 0, 2` | 7 |
| 3 | `4,1 → 3,1 → 2,1 → 2,2 → 1,2 → 1,3 → 2,3 → 3,3 → 3,4` | `2, 1, 1, 3, 0, 2, 1, 0, 3` | 13 |

- Derive the solved openings from each cell’s preceding and following positions. Rotate backward by the listed number of quarter turns to get its initial orientation. Straight pipes cycle between two distinct orientations and elbows cycle through four. Each activation rotates 90° clockwise and adds one turn.
- Trace from the inlet through reciprocal openings. Stop at a closed edge, blank cell, unmatched opening, boundary other than the outlet, or a revisited cell. Highlight only the segment reached from the inlet. A room clears when the trace exits through the outlet after visiting every playable pipe.
- Room points are `max(70, 100 − 5 × max(0, turns − minimumTurns))`. The run total is the sum of the three room scores. Extra turns reduce the score but leave every room playable. There is no timer.

## Visual design

- Use a cool slate floor (`#202B3A`), pale pipe outlines (`#C7D4DF`), and a warm amber fill (`#FFB75D`). Connected pipes gain a thick inner stroke as well as a color change. Keep the inlet and outlet markers distinct in shape and give each a text label.
- Draw the pipes and connectors with inline SVG inside the buttons. Use CSS for floor tiles and system fonts for all text. Give active tiles a clear outline, with a second ring reserved for the room 1 hint. Remove the hint ring once that elbow has been turned.
- Fill the iframe and center a board with a maximum width of 360 CSS px. At 320 × 480, reserve space for the room counter and action button, shrink gaps and margins, and keep the 44 px targets. Let long labels wrap. Keep the page fixed with no document scrolling.
- Drive the clear effect with elapsed time in `requestAnimationFrame`, cap frame deltas at 50 ms, and pause it while the document is hidden. With reduced motion, show the final warm state immediately. Use silent visual feedback throughout.

## Strings

Metadata titles, descriptions, and instructions use the text under **Meta**. Use the following dictionary for all other visible text, control names, and announcements. Direction lists use the order up, right, down, left.

| Key | ko | en |
|---|---|---|
| `appTitle` | 온돌 배관 잇기 | Ondol Pipe Puzzle |
| `instruction` | 배관을 돌려 입구와 출구를 이어요. | Turn the pipes to join the inlet and outlet. |
| `play` | 시작하기 | Play |
| `room` | 방 {current}/{total} | Room {current}/{total} |
| `turns` | 회전 {turns}회 | Turns {turns} |
| `runPoints` | 누적 {score}점 | Run points {score} |
| `inlet` | 입구 | Inlet |
| `outlet` | 출구 | Outlet |
| `tutorial` | 테두리가 있는 배관을 한 번 돌려 보세요. | Turn the outlined pipe once. |
| `boardLabel` | 방 {current} 배관판 | Pipe board for room {current} |
| `pipeTurn` | {row}행 {col}열. 열린 방향 {directions}. 눌러서 돌리기. | Row {row}, column {col}. Open {directions}. Press to turn. |
| `pipeLocked` | {row}행 {col}열. 열린 방향 {directions}. | Row {row}, column {col}. Open {directions}. |
| `up` | 위 | up |
| `right` | 오른쪽 | right |
| `down` | 아래 | down |
| `left` | 왼쪽 | left |
| `roomClear` | 방이 따뜻해졌어요! | Room warmed up! |
| `roomPoints` | 이번 방 {points}점 | Room points {points} |
| `clearAnnouncement` | 방 {current} 완료. {points}점을 얻었어요. | Room {current} complete. You earned {points} points. |
| `next` | 다음 방 | Next room |
| `viewScore` | 점수 보기 | View score |
| `resultTitle` | 세 방 모두 따뜻해졌어요! | All three rooms are warm! |
| `finalScore` | 최종 점수 {score}/{max} | Final score {score}/{max} |
| `bestScore` | 최고 점수 {best}점 | Best score {best} |
| `newBest` | 새 최고 기록! | New best! |
| `retry` | 다시 하기 | Play again |

## localStorage

- `ondol-pipe-puzzle:best:v1` stores the highest completed run score as a base-10 integer string. Accept values from `0` through `300` in increments of five. Use `0` for a missing or invalid value. Read and write inside `try/catch`.
- Keep the current board, turns, and run points in memory. On the result screen, compare the run against the stored best and the in-memory best before writing. If storage fails, keep the best for the current page session.

## Edge cases

- Honor `?lang=ko` or `?lang=en`. For other values or a missing parameter, use Korean when `navigator.language` begins with `ko` and English otherwise. Update `<html lang>` and the document title.
- A quick pair of taps counts as two turns while the room is playable. Lock the room synchronously on the solving turn so a queued activation cannot add a turn or award points again. Ignore auto-repeat for Enter and Space on pipe controls.
- A loop or blocked opening ends the current trace without clearing the room. Turning a connected pipe away from its neighbor removes warmth from the disconnected segment immediately.
- Resize and orientation changes preserve the current room, turns, score, and clear progress. Recompute geometry from the container. Refresh starts at START with the best score loaded when available.
- Replay restores all three initial board layouts. The reference run takes `1 + 7 + 13` turns and scores 300. Four extra turns in room 2 bring a run with otherwise minimum turns to 280. Verify both locales at 320 × 480, with touch and keyboard, blocked storage, and reduced motion. Before publishing, run `npm test`, `npm run build`, and `npm run qa -- --thumbs`, then inspect the generated thumbnail.

## Must not

- No network requests, analytics, external fonts or libraries, raster game art, or video. Keep the game’s HTML, CSS, and JavaScript in `items/ondol-pipe-puzzle/index.html`, with `meta.json` alongside it and a QA-generated `thumb.png`.
- No copied layouts, characters, artwork, trademarks, or real people. Keep the heating system fictional and omit installation or repair instructions.
- No audio, modal dialogs, pop-ups, or navigation away from the item.