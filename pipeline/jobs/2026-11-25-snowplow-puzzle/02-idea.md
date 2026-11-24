# Idea and spec: 제설차 한 바퀴 / Snowplow Puzzle

## Concepts scored

Scores are 1–5 for value in the first 10 seconds, originality, Korean search/share demand, and buildability in one HTML file, in that order. Demand scores are editorial estimates based on likely search phrases and reasons to share.

| Concept | Category | Score | Verdict |
|---|---|---|---|
| **제설차 한 바퀴 / Snowplow Puzzle** — clear a snowy block in one continuous route and park in the garage | `games` | **5/4/4/5 = 18** | **Picked.** The first move visibly clears snow. “제설차 게임” gives the item a direct search phrase, and a finished route makes a readable screenshot. |
| 택배함에 이게 왜? / Odd Parcel Locker — open a locker to reveal an illustrated absurd delivery, such as a single cloud in a jar | `weird` | 5/4/3/5 = 17 | A quick reveal and a shareable joke. “택배함” mostly signals a practical search. |
| QR 확대경 / QR Code Magnifier — enlarge a built-in QR sample and toggle labels for its corner markers and data area | `tech` | 4/4/3/5 = 16 | A concrete visual explanation. “QR 코드 원리” gives it a search phrase, while sending a result to friends has less appeal. |

## Meta

slug `snowplow-puzzle`

| Field | Value |
|---|---|
| `category` | `games` |
| `kind` | `game` |
| `aspect` | `9/16` |
| `date` | `2026-11-25` |
| Korean tags | `제설차`, `제설차 게임`, `길 찾기`, `겨울 퍼즐` |
| English tags | `snowplow`, `path puzzle`, `winter` |

| Field | ko | en |
|---|---|---|
| `title` | 제설차 한 바퀴 | Snowplow Puzzle |
| `desc` | 제설차를 몰아 눈 덮인 골목 12칸을 치우고 차고에 주차하세요. 지나온 길로 되돌아갈 수 없으니 마지막 한 칸까지 갈 길을 미리 살펴보세요. | Clear 12 snowy tiles and park the plow in its garage. Each tile can be crossed once, so plan a route that leaves no snow behind. |
| `howto` | 옆 칸을 누르거나 방향키로 한 칸씩 움직이세요. 지나온 칸은 다시 밟을 수 없어요. 막히기 전에 마지막 이동을 취소할 수 있어요. | Tap a neighboring tile or use the arrow keys to move. Each tile can be crossed once. Undo your last move while the round is still active. |
| `about` | 눈 쌓인 골목을 한 줄로 잇는 짧은 겨울 길 찾기 퍼즐이에요. | A short winter path puzzle about clearing a whole block in one drive. |

## Pitch

An orange plow waits at the corner of a snow-covered block. Tap an adjacent tile and the blade sweeps the snow aside, leaving two dark tracks. The garage is reachable before every tile is clear, so the puzzle is figuring out when to take the last turn. The first clear lands within two taps of opening the item.

## Flow

1. **Start.** Show the title, a two-line instruction, the block with the plow parked on its start tile, and a primary **Start plowing** button. The preview is static.
2. **Play.** Focus the board and show the clear count above it. Mark legal destinations with inset outlines. Move one tile per action. On a snow tile, turn the plow toward its destination, clear the tile immediately, and send a short puff toward the sides of the blade. Keep the cleared route visible. Below the board, show status feedback and **Undo**.
3. **Result.** Finish upon entering the garage or running out of legal moves. Freeze the board and keep any unplowed tiles visible. Show the outcome heading, clear count, best count, and a large **Try again** button. A perfect result adds a brief snow puff at the garage. Retry goes directly to a fresh play screen.

## Controls

- **Touch and mouse.** Tap or click an edge-adjacent tile to move there. Use the normal button action for Start, Undo, and Try again. Use pointer events for pointer handling and commit at most one move per activation. Dragging across tiles does not move the plow.
- **Keyboard.** While the board has focus, the arrow keys move one tile and Backspace undoes one move. Ignore key repeat. Tab moves between the board and Undo. Enter and Space activate focused buttons. Focus Start on entry, the board when play begins, and the outcome heading when the result appears. Try again is the next tab stop.
- Give tiles and buttons targets of at least 44 CSS px. Apply `touch-action: none` to the interactive board and prevent scrolling for handled game keys. Give the board a visible focus ring and announce legal directions, changes to the clear count, and status feedback through a polite live region. When the result appears, use heading focus for the outcome announcement.

## Board and scoring

Rows run top to bottom and columns run left to right. `S` is the start tile, `*` is snow, `#` is a snowbank, and `G` is the garage.

```text
S * * *
* * * *
* * * *
# # G *
```

- Keep a route initialized to `[S]`. A legal destination shares an edge with the current tile, lies on the board, is either snow or the garage, and is absent from the route. Append each valid destination. Every snow tile in the route counts for one point. The start and garage count for zero.
- Entering the garage ends the round immediately. Show the perfect heading at 12 points and the parked heading at any lower score. After a snow move, end the round with the stuck heading if there are zero legal destinations, counting the garage as a legal destination.
- Undo removes the last move during play, restores snow on the vacated tile, and recalculates legal destinations and the score. Disable Undo at the start. The best score is the highest clear count across all finished rounds, including rounds that end away from the garage.
- Builder check for a perfect clear. From `S`, move right three times, down, left three times, down, right three times, down, then left into `G`. For an early park, move down twice, right twice, then down into `G` for 4/12.

## Visual design

- Use a deep navy background `#17263C`, ice-white snow `#F1F8FF`, blue-gray cleared asphalt `#43546C`, and a warm orange plow `#FF9B4A`. Draw the plow, snowbanks, and garage with inline SVG or CSS. Distinguish the garage by its roof and door, and cleared tiles by tire tracks.
- Center the square board at up to 320 CSS px wide. At 320 × 480, use a 208 px board with 52 px tiles and compact spacing so the heading, score, status, and controls fit without page scrolling. Use system fonts and let text wrap.
- Keep the clear feedback under 180 ms. Commit moves and scores immediately. Use `requestAnimationFrame` for snow puffs, cap animation delta at 50 ms, and pause while hidden. Under `prefers-reduced-motion`, update the tile and tracks instantly and omit particles. The item is silent.

## Strings

Use the `ko` and `en` dictionaries for all item text, including the document title, accessible labels, and live announcements. Use a supported `?lang=ko` or `?lang=en` first. Otherwise use Korean for a Korean browser locale and English for other locales. Set `<html lang>` to match. Braced values are substitutions.

| Key | ko | en |
|---|---|---|
| `appTitle` | 제설차 한 바퀴 | Snowplow Puzzle |
| `startHelp` | 지나온 칸은 다시 밟을 수 없어요. 눈 12칸을 치우고 차고에 주차하세요. | Cross each tile once. Clear all 12 snowy tiles, then park in the garage. |
| `start` | 제설 시작 | Start plowing |
| `board` | 제설차 퍼즐판 | Snowplow puzzle board |
| `cleared` | 치운 눈 {n}/12칸 | Tiles cleared {n}/12 |
| `best` | 최고 기록 {n}/12칸 | Best {n}/12 |
| `ready` | 옆 칸을 누르거나 방향키로 이동하세요. | Tap a neighboring tile or use the arrow keys. |
| `blocked` | 그 칸으로는 갈 수 없어요. | You can’t move there. |
| `undo` | 한 칸 되돌리기 | Undo move |
| `undone` | 마지막 이동을 취소했어요. | Last move undone. |
| `perfect` | 골목 제설 완료! | Block cleared! |
| `parked` | 차고에 도착했어요 | Back in the garage |
| `stuck` | 더 갈 길이 없어요 | No moves left |
| `retry` | 다시 하기 | Try again |
| `tile` | {row}행 {col}열, {state} | Row {row}, column {col}, {state} |
| `startTile` | 출발 칸 | Start tile |
| `snowTile` | 눈 덮인 길 | Snow-covered road |
| `clearedTile` | 눈 치운 길 | Cleared road |
| `bankTile` | 눈더미 | Snowbank |
| `garageTile` | 차고 | Garage |
| `plowTile` | 제설차 위치 | Plow position |
| `legalMoves` | 갈 수 있는 방향: {directions} | Available directions: {directions} |
| `up` | 위 | up |
| `right` | 오른쪽 | right |
| `down` | 아래 | down |
| `left` | 왼쪽 | left |

Use 1-based row and column numbers in labels. When the plow occupies a tile, append the localized `plowTile` to its tile label. Announce available directions in up, right, down, left order after a move or undo that leaves the round active.

## localStorage

- `snowplow-puzzle:best`: store the best finished-round score as an integer string from `0` to `12`. Default to `0` for missing, malformed, or out-of-range data. Wrap reads and writes in `try/catch`. Update the in-memory best before attempting to write, so it survives retries in the current session.
- Keep the route and feedback in memory. Reload opens the start screen.

## Edge cases

- Tapping a diagonal, snowbank, visited tile, current tile, or nonadjacent tile leaves the route and score intact and shows `blocked`. An arrow off the board has the same behavior. Clear that feedback on the next valid move or undo.
- Resolve each input against current state. Once the result appears, ignore queued board inputs. Retry clears the route, score, outcome, transient feedback, and animation state.
- Resize or rotate without resetting the route, score, outcome, or focus. If a resize interrupts an effect, render the board from the current state. Storage failures leave scoring and retry available.

## Must not

- Fit the full item in `index.html` with inline CSS and JavaScript. Use zero network requests, external fonts, analytics, raster assets, or video. Keep metadata in `meta.json` and generate `thumb.png` through the repository QA command.
- Use original artwork and layout. Avoid real plow brands, municipal marks, identifiable people, and copied levels or interfaces.
- Keep play inside the iframe. Omit dialogs, pop-ups, page navigation, audio, and timed input.