# Idea and spec: 귤껍질 한 줄 퍼즐 / Tangerine Peel Puzzle

## Concepts scored

Each criterion is scored from 1 to 5, for a maximum of 20. Korean search and share scores are editorial estimates based on the supplied research and the proposed search terms. The brief records no votes yet.

| Concept | Category | First 10 seconds | Originality | Korean search/share demand | One-file buildability | Total | Verdict |
|---|---|---:|---:|---:|---:|---:|---|
| **귤껍질 한 줄 퍼즐 / Tangerine Peel Puzzle** | **puzzle** | **5** | **4** | **3** | **5** | **17** | **Pick.** The first tap curls a piece of peel, and the result shows a route friends can try to beat. `한붓그리기 퍼즐` gives the mechanic a familiar search term. |
| 크리스마스 전구 길이 계산기 / Christmas Light Length Calculator | tools | 4 | 3 | 4 | 5 | 16 | Enter a frame’s width and height and see how much string light you need, including the lead to the outlet. `크리스마스 전구 길이` has a clear practical intent, but the result has limited replay value. |
| 크리스마스 종이 장식 뽑기 / Christmas Paper Decoration Draw | random | 5 | 3 | 3 | 5 | 16 | Draw one quick paper ornament idea with a three-step diagram. `크리스마스 종이 장식` is a natural search phrase, but drawing again changes the instruction card rather than the interaction. |

The tangerine puzzle takes the research brief’s tactile interaction cue and gives it a route-planning rule. Its reward is the shape of the peel the player made. The fixed boards make results comparable without accounts, a leaderboard, or a clock.

## Meta

slug `tangerine-peel-puzzle`

- Category `puzzle`, kind `game`, aspect `9/16`, date `2026-11-22`
- Korean tags `귤껍질`, `한붓그리기`, `겨울 퍼즐`
- English tags `tangerine`, `path puzzle`, `winter`

| Field | ko | en |
|---|---|---|
| `title` | 귤껍질 한 줄 퍼즐 | Tangerine Peel Puzzle |
| `desc` | 시작 칸에서 귤껍질을 한 줄로 벗겨 보세요. 같은 칸을 두 번 지나지 않고 꼭지까지 이어서, 한 번에 몇 칸을 벗길 수 있는지 겨뤄요. | Peel a tangerine in one continuous strip. Find the longest route to the stem without peeling any square twice. |
| `howto` | 시작 칸에서 상하좌우로 한 칸씩 이동하세요. 옆 칸을 누르거나 방향키를 쓰세요. 꼭지에 닿으면 점수가 확정돼요. | Tap an adjacent square or use the arrow keys to move. Reach the stem to lock in your score. |
| `about` | 모양이 다른 귤 세 판에 도전할 수 있어요. 판마다 최고 기록을 이 브라우저에 저장해요. | Try three different boards. Your best score for each board is saved in this browser. |

## Pitch

A tangerine sits on a cream-colored plate. Its rind is divided into a small grid, with a cut tab at one end and a green stem at the other. Each move exposes a patch of pith and extends a single orange ribbon behind the player. Reaching the stem ends the round. The ribbon and its score stay on the plate together.

The first board is visible immediately. One press starts the round, and the two available moves are outlined as soon as it starts. A player who takes the shortest path can finish in four moves and try again for a longer peel.

## Flow

| Screen | What appears | Interaction and transition |
|---|---|---|
| **Start** | Title, one-line goal, first board preview, and a large **Start peeling** button. The preview shows the cut tab and the stem. | Press the button or Enter to open board 1. The preview is decorative and skipped by assistive technology. |
| **Play** | Board number, live score, best score for the active board, the grid, a short instruction, and **Undo** and **Restart** buttons. The current tip has a double outline. Available neighbors have a dashed outline. | Extend the peel one square at a time. **Undo** removes the last move. **Restart** restores the same board to its cut tab. Entering the stem opens the result immediately. |
| **Play, no moves** | The same board and score. The instruction changes to tell the player to undo or restart. The tip remains outlined. | **Undo** restores the previous position and legal moves. **Restart** resets the board. |
| **Result** | Completed board, board number, completion message, final score, best score, and a status badge for a new best when earned. The grid is static. | **Try again** resets the current board. **Next board** advances in order, with board 3 wrapping to board 1. Enter on the focused retry button starts a fresh attempt. |

A perfect peel gets the full-peel message. Any shorter route that reaches the stem gets the standard completion message. Both results use the same layout and actions.

## Controls

- **Touch and mouse.** Tap or click an available neighbor or a button. A press that starts on one square and ends on another makes no move. Dragging across the board makes no moves.
- **Keyboard.** Tab reaches the visible controls and the board. When the board has focus, arrow keys extend the peel. On the Play screen, `Z` undoes one move and `R` restarts. Buttons support Enter and Space. Ignore game shortcuts when a modifier is held or a key is repeating. Prevent default behavior only for handled board keys and shortcuts.
- **Focus.** Move focus to the board when a round starts or restarts. Keep focus on **Undo** when it still has an action available, and return it to the board when undo reaches the cut tab and the button becomes disabled. Focus **Try again** on the result. Use a visible focus ring distinct from the peel-tip outline.
- **Touch targets.** All interactive squares and buttons are at least 44 × 44 CSS px. Use pointer events for board input and `touch-action: none` on the grid. Process each pointer gesture once.

## Boards and scoring

`.` is peel, `S` is the pre-lifted cut tab, `E` is the stem, and `#` is outside the fruit. Rows run top to bottom. Empty corners retain their grid positions. The boards are fixed in both languages.

| Board | Rows | Score cap | Shortest finished route |
|---|---|---:|---:|
| 1 | `S..` / `...` / `..E` | 9 | 5 |
| 2 | `S...` / `....` / `....` / `..E.` | 16 | 6 |
| 3 | `#S..` / `....` / `....` / `#E..` | 14 | 4 |

- Store the ordered route in memory, beginning with `S`. The live score is the route length, including `S`. The stem adds one point when entered. There is no timer or move penalty.
- A move must go one square up, right, down, or left from the tip into an unvisited playable square. An invalid input leaves the state unchanged. Diagonals, gaps, revisits, and wrapping are invalid.
- The stem can be entered whenever it is adjacent. Reaching it locks the route and commits the score. A dead end elsewhere leaves the round open for undo or restart.
- Undo removes one square and restores that square’s rind. At the cut tab, undo is disabled. Restart, retry, and next-board actions discard the previous route, feedback animation, and per-result badges.
- Update the active board’s best only when the final score is strictly greater than its stored best. A tie keeps the existing best and shows no new-best badge. Every board has at least one full-length route.

## Visual design

- **Palette.** Use a warm cream background `#FFF7E8`, a pale plate `#FFFDF7`, dark brown text `#30231B`, orange rind `#F69A35`, and dark green for the stem `#2F6347`. Use the system font stack. Distinguish the cut tab, available squares, current tip, and stem by shape and outline as well as color.
- **Board.** Render the plate, cut tab, and stem with CSS or inline SVG. Use tile-sized patches of pale pith and a continuous orange ribbon routed through the centers of visited squares. Round the ribbon’s bends so the turn pattern reads clearly in the result.
- **Feedback.** Each accepted move curls the ribbon tip for 120 ms. Finishing settles the last segment against the stem. State changes take effect immediately, independently of the animation. Reduced motion renders the final position instantly. The game is silent.
- **Layout.** Fill the iframe with no page scrolling. At 320 × 480, use compact vertical spacing, a 208 px board, and a two-button footer. Keep the score and instruction outside the grid. On wider screens, center the game in a column no wider than 440 px while retaining the full-window background. Recompute sizing when the iframe resizes.
- **Result.** Keep the full route and both scores above the buttons so they fit in a single screenshot. Use the same plate and board scale as Play.

## Strings

Read `?lang=ko` or `?lang=en`. For a missing or unsupported value, choose Korean when the primary subtag of `navigator.language` is `ko` and English otherwise. Set `<html lang>` and use the same dictionary for visible text, the document title, accessible labels, and announcements. The Start screen uses `title` from Meta.

| Key | ko | en |
|---|---|---|
| `startHint` | 귤껍질을 한 줄로 이어 꼭지까지 벗겨 보세요. | Peel one continuous strip all the way to the stem. |
| `start` | 벗기기 시작 | Start peeling |
| `boardNumber` | {n} / {total}판 | Board {n} of {total} |
| `boardLabel` | 귤껍질 퍼즐판 | Tangerine peel board |
| `score` | 벗긴 칸 {score}/{max} | Peeled {score}/{max} |
| `best` | 최고 기록 {best}/{max} | Best {best}/{max} |
| `playHint` | 옆 칸을 누르거나 방향키로 움직이세요. | Tap a neighboring square or use the arrow keys. |
| `stuck` | 갈 수 있는 칸이 없어요. 되돌리거나 다시 시작하세요. | No moves left. Undo or restart. |
| `undo` | 되돌리기 | Undo |
| `restart` | 다시 시작 | Restart |
| `retry` | 다시 도전 | Try again |
| `next` | 다음 판 | Next board |
| `complete` | 꼭지까지 벗겼어요! | You reached the stem! |
| `perfect` | 껍질을 한 줄로 다 벗겼어요! | You peeled it all in one strip! |
| `newBest` | 새 최고 기록! | New best! |
| `cellLabel` | {row}행 {col}열, {state} | Row {row}, column {col}, {state} |
| `cellTab` | 시작 칸 | cut tab |
| `cellPeel` | 껍질 | peel |
| `cellStem` | 꼭지 | stem |
| `cellPeeled` | 벗긴 칸 | peeled square |
| `cellTip` | 현재 위치 | current tip |
| `cellAvailable` | 이동 가능 | available |

Rows and columns are one-based. For accessible cell labels, name the current tip first, then the cut tab, the unpeeled stem, a peeled square, or untouched peel as applicable. Append `cellAvailable` to any legal destination, including the stem, with a comma and space. Exclude gaps from the accessibility tree. Use one polite live region for the score after an accepted move or undo, and include the dead-end message when applicable. On the result, expose the completion heading and score through the retry button’s accessible description.

## localStorage

Use one key, `tangerine-peel-puzzle:v1:best`, for a JSON array of three integers in board order. Default to `[0, 0, 0]`. Read and write inside `try/catch`. Validate each entry independently against its board cap and treat an invalid entry as zero. A failed write leaves the new best available in memory until the page closes. Keep current routes and board position in memory only.

## Edge cases

- Entering the stem on the shortest route is a valid finish. On board 1, Right, Right, Down, Down from the cut tab scores 5.
- On board 1, Right, Right, Down, Left, Left, Down, Right, Right scores 9 and shows the full-peel message.
- Reaching a dead end does not record a score. Undo reopens the route and restores the available-square outlines. Repeated undo stops at the cut tab.
- Accept the final move exactly once. A double tap or held arrow key cannot add a move after the result appears or start a retry.
- Resizing or rotating preserves the board, route, and screen. A hidden tab suspends decorative animation. If animation uses `requestAnimationFrame`, cap resumed frame delta at 50 ms.
- Reloading opens Start on board 1. Saved bests still appear when their boards open. Blocked, malformed, or unavailable storage leaves the full game playable.
- Verify the 320 × 480 layout in both languages and complete a round with keyboard alone. Before publishing, run `npm test`, `npm run build`, and `npm run qa -- --thumbs`. Check that the generated thumbnail shows a readable board.

## Must not

- No network requests, external dependencies, analytics, raster art, or video. Keep the playable HTML, CSS, JS, and original vector art in `items/tangerine-peel-puzzle/index.html`.
- No copied game assets, existing puzzle layouts, trademarks, or real people.
- No timers, daily locks, paid retries, accounts, public leaderboards, or personal data collection.
- No dialogs, new windows, navigation away from the page, page scrolling, or audio.