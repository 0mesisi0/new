# Idea and spec: 눈길 발자국 퍼즐 / Snowprint Puzzle

## Concepts scored

Each score is out of 5. Korean search and share scores are planning estimates based on the supplied research and seasonal hooks.

| Concept | Category | First 10 seconds | Originality | Korean search/share demand | One-HTML buildability | Total | Verdict |
|---|---|---:|---:|---:|---:|---:|---|
| **눈길 발자국 퍼즐 / Snowprint Puzzle** | **puzzle** | **5** | **4** | **3** | **5** | **17** | **Pick.** The first step leaves a visible bootprint. The finished route makes a recognizable winter screenshot. |
| 겨울 창문 그림 / Winter Window Doodles | chill | 5 | 3 | 3 | 5 | 16 | Wipe condensation off a virtual window to draw. The tactile reveal is immediate, though it overlaps with Paper Smoother. |
| 수험표 할인 마감 체크 / Exam Discount Deadline List | tools | 3 | 3 | 5 | 5 | 16 | Enter offers and deadlines to see which expire first. The research gives this the strongest Korean search hook, while manual entry delays the first payoff. |

## Meta

slug `snowprint-puzzle`

- Category `puzzle`, kind `game`, aspect `9/16`, date `2026-11-22`
- Tags ko `눈길`, `발자국`, `길찾기 퍼즐`, `겨울 게임`
- Tags en `snow`, `footprints`, `path puzzle`, `winter game`

| Field | ko | en |
|---|---|---|
| `title` | 눈길 발자국 퍼즐 | Snowprint Puzzle |
| `desc` | 한 칸씩 발자국을 남겨 눈 덮인 마당을 건너세요. 얼음 위에서는 쭉 미끄러지고, 새 눈을 모두 밟으면 집으로 들어갈 수 있어요. | Leave one footprint on every patch of fresh snow. Slide across ice and reach the warm front door in three small winter puzzles. |
| `howto` | 옆 칸을 누르거나 방향키로 움직이세요. 얼음에서는 같은 방향으로 미끄러져요. 새 눈을 모두 밟고 문에 도착하세요. | Tap a neighboring tile or use the arrow keys. Ice carries you in the same direction. Step on all the fresh snow, then reach the door. |
| `about` | 눈 위에 첫 발자국을 남기는 순간을 세 개의 작은 길찾기 퍼즐로 만들었어요. | Three small path puzzles inspired by the first footprints in fresh snow. |

## Pitch

A lit doorway waits across an untouched yard. Every step presses a pair of bootprints into the snow, and every square you leave behind closes off that part of the route. The first yard teaches the rule in nine squares. The next two introduce ice that carries you past several squares in a single move.

Players can undo any step and take as long as they like. The run ends with a score and a view of their trail. The winter artwork and the instant feedback draw on the tactile play direction in the supplied research.

## Flow

| Screen | Layout and behavior |
|---|---|
| **Start** | Show the title, the one-line goal, and a small static yard with a glowing door. The primary button starts board 1 and focuses the active snow tile. |
| **Play** | Show the board number and fresh-snow progress above the grid. Below it, show the directional controls, a one-line status area, and the undo, reset, and finish actions. The first press or tap on a neighboring tile makes a footprint immediately. |
| **Stuck** | Keep the board and trail visible. When the current tile has no legal move, show the stuck message and emphasize Undo. Undo and Reset remain available. |
| **Board clear** | After entering the door on boards 1 or 2, keep the completed trail in view and light up the doorway. Show the clear message and a large Next yard button. Disable movement and focus Next yard. |
| **Result** | Show the completion or early-finish heading, score, best score, and the final visible board with its trail. Focus the large Play again button. Retrying returns directly to board 1. |

## Boards and scoring

Rows are listed from top to bottom. `S` is the starting mat, `.` is fresh snow, `=` is ice, `#` is a snowbank, and `D` is the door.

```text
1           2           3
S..         S..###      S...##
...         ...==.      ....=.
..D         ..###.      ...##.
            ..#D..      ##.==.
                        ##...D
```

- Start on `S`. Move up, down, left, or right. Entering a `.` marks it and adds one point. The starting mat and marked snow are blocked on subsequent moves.
- Entering ice scans in the chosen direction through the entire contiguous strip. The move succeeds only if the first tile beyond it is fresh snow or an open door. Crossing ice and landing count as one move. Ice remains reusable and is worth zero points.
- The door opens as soon as all fresh snow on that board has been marked. Entering the open door clears the board. The last board leads straight to Result.
- Blocked moves preserve position, progress, and undo history. A blocked ice move stays at its origin.
- Every successful move that lands on snow adds an undo entry containing the prior position and the new footprint. Undo restores the position, removes that footprint, and recomputes the door and stuck states.
- The boards contain 7, 13, and 17 fresh tiles. Score equals fresh tiles marked in cleared boards plus fresh tiles currently marked on the active board. A full run scores **37**. Undo and board reset remove the corresponding current-board points. Early finish uses the current score. Best score is the maximum across finished runs.
- Verified solutions from each starting mat, with each letter representing one input, are `RRDLLDRR`, `DDDRUUURDRDDLL`, and `RDLDRRUURDRDDLDRRR`. Accept every legal complete route.

## Controls

- **Touch and mouse** use pointer events for board taps. A tap on an orthogonally adjacent tile attempts a step in that direction, including when the tile is ice. The four directional buttons offer the same actions. A tap on the current tile or a distant tile has no effect.
- **Keyboard** uses arrow keys for movement while playing and `Z` for Undo. Enter starts, advances, or retries when the matching primary action has focus. All actions remain available through Tab and ordinary button activation. Ignore movement key repeats and prevent the default behavior of handled game keys.
- **Accessibility** keeps each action at least 44 × 44 px, with visible focus and distinct shapes for snow, ice, snowbanks, and the door. Use one tab stop for the interactive board and expose the focused tile’s row, column, and state. Announce status changes through a polite live region. Direction buttons have localized accessible names.
- **Input handling** gives each tap or keypress one action. Capture a board pointer on `pointerdown`, commit on `pointerup` only over the same tile, and discard canceled pointers. Apply `touch-action: none` on the board. Keep the directional buttons and board responsive during decorative animations.

## Visual design

- Use navy `#14253C` for the yard surround, snow `#F0F7FF`, ice `#9DD7EA`, bootprints `#385679`, and amber `#FFD07A` for the doorway. Use CSS or inline SVG for the bootprints, boot, ice streaks, and door.
- Use a brief footprint press and a small puff of snow on a successful step. Flash a blocked tile’s outline once. Show hinge and doorknob details when the door is locked and a lit threshold when it opens. Use the same static end states with `prefers-reduced-motion`.
- Fill the iframe and center the playable column at a maximum width of 440 px. At 320 × 480, use 44 px grid cells, narrow gaps, a single row of directional buttons, and a single row for Undo, Reset yard, and Finish. Reserve room for one wrapped status message. Keep page scrolling disabled and recompute the grid size on resize.
- Use system fonts. On desktop, the yard can widen within the column while the buttons stay grouped beneath it. The result keeps the final trail visible for screenshots.
- The game is silent. Any transient animation uses `requestAnimationFrame` with a delta capped at 50 ms and pauses while the document is hidden.

## Strings

Store the UI copy and accessible names in `{ ko: {...}, en: {...} }`. Use `?lang=ko` or `?lang=en` first, then the browser’s language, with English as the fallback. Set `<html lang>` and the document title from the selected language. Format counts with `Intl.NumberFormat`.

| Key | ko | en |
|---|---|---|
| `appTitle` | 눈길 발자국 퍼즐 | Snowprint Puzzle |
| `startGoal` | 새 눈을 한 번씩 밟고 문까지 가세요. | Step on every patch of snow once, then reach the door. |
| `start` | 시작하기 | Start |
| `yardProgress` | 마당 {current}/{total} | Yard {current}/{total} |
| `snowProgress` | 발자국 {marked}/{total} | Prints {marked}/{total} |
| `iceHint` | 얼음에 들어서면 같은 방향으로 미끄러져요. | Ice makes you slide in the same direction. |
| `doorLocked` | 새 눈을 모두 밟으면 문이 열려요. | Step on all the fresh snow to open the door. |
| `doorOpen` | 문이 열렸어요. 이제 들어가세요! | The door is open. Head inside! |
| `blocked` | 그쪽으로는 갈 수 없어요. | You can’t go that way. |
| `alreadyMarked` | 이미 발자국이 있는 칸이에요. | There’s already a footprint there. |
| `iceBlocked` | 미끄러진 뒤 멈출 곳이 없어요. | There’s nowhere to land beyond the ice. |
| `stuck` | 더 갈 곳이 없어요. 한 걸음 되돌려 보세요. | You’re stuck. Try undoing a step. |
| `undo` | 되돌리기 | Undo |
| `resetYard` | 마당 다시 | Reset yard |
| `finishRun` | 그만하기 | Finish |
| `yardCleared` | 마당을 모두 건넜어요! | Yard cleared! |
| `nextYard` | 다음 마당 | Next yard |
| `allCleared` | 집에 도착했어요! | You made it home! |
| `endedEarly` | 여기까지 걸었어요 | Your walk ends here |
| `score` | 점수 {score}/{max} | Score {score}/{max} |
| `best` | 최고 점수 {best}/{max} | Best {best}/{max} |
| `newBest` | 새 기록! | New best! |
| `retry` | 다시 하기 | Play again |
| `up` | 위로 | Up |
| `down` | 아래로 | Down |
| `left` | 왼쪽으로 | Left |
| `right` | 오른쪽으로 | Right |
| `boardLabel` | 눈 덮인 마당 | Snow-covered yard |
| `trailLabel` | 남긴 발자국 | Your footprint trail |
| `tileAt` | {row}행 {col}열, {tile} | Row {row}, column {col}, {tile} |
| `currentTileAt` | 현재 위치, {row}행 {col}열, {tile} | Current position, row {row}, column {col}, {tile} |
| `tileStart` | 출발 매트 | Starting mat |
| `tileSnow` | 새 눈 | Fresh snow |
| `tilePrint` | 발자국 | Footprint |
| `tileIce` | 얼음 | Ice |
| `tileBank` | 눈더미 | Snowbank |
| `tileLockedDoor` | 잠긴 문 | Locked door |
| `tileOpenDoor` | 열린 문 | Open door |

## localStorage

- `snowprint-puzzle:best:v1` stores the best score as a decimal integer string. Accept only digit strings whose numeric value is an integer from 0 through 37. Default to 0.
- Wrap reads and writes in `try/catch`. On Result, compare the run score with the in-memory best and the latest valid stored best before writing the maximum. Show the new-best message only if the run exceeds the previous maximum. If storage is blocked, keep the in-memory best for the current visit.

## Edge cases

- Undo is disabled on the starting mat before the first move. Undo after an ice slide restores the origin in one action. Undo after opening the door locks it again.
- Reset yard restores the current yard’s starting state and keeps points from earlier cleared yards. Play again resets the board index, score, history, focus, and animation state while retaining the best score.
- The ice scan stops at the first non-ice tile or the board boundary. A snowbank, visited tile, starting mat, or closed door at the end of the strip blocks the whole move.
- After each accepted step or undo, check all four directions with the same move rules used by input. A reachable open door counts as a legal move. A stuck position stays playable through Undo and Reset yard.
- Resize and orientation changes preserve the current board, player position, score, and history. Hiding the page drops any pending pointer gesture and pauses animations.
- If `location.hash === '#demo'`, show the completed third yard and 37/37 on Result using the verified route. Skip best-score updates and the new-best message for the demo. Play again starts a normal scored run.
- Before publishing, run `npm test`, `npm run build`, and `npm run qa -- --thumbs`. Inspect the generated thumbnail and check the 320 × 480 layout in both languages using touch and keyboard.

## Must not

- Keep gameplay, styling, and art in `items/snowprint-puzzle/index.html`. Use `meta.json` for metadata and generate `thumb.png` with QA. No raster game art, video, external assets, network requests, or analytics.
- Use original boards and artwork. No borrowed layouts, characters, branding, music, or visual identity from an existing game.
- No timers, lives, or speed bonuses. A wrong move must leave the puzzle available for recovery.
- No dialogs, new windows, navigation away from the item, or page scrolling.