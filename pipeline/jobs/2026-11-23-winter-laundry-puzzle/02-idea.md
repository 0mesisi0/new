# Idea and spec: 겨울 빨래 널기 퍼즐 / Winter Laundry Puzzle

## Concepts scored

Each score is out of 5. Korean search and share scores are planning estimates based on likely search phrases and what players might send to friends.

| Concept | Category | First 10 seconds | Originality | Korean search and share | One-file buildability | Total | Verdict |
|---|---|---:|---:|---:|---:|---:|---|
| **겨울 빨래 널기 퍼즐 / Winter Laundry Puzzle** | **games** | **5** | **5** | **3** | **5** | **18** | **Pick.** The first sheet visibly fills a rail in two taps. A finished rack gives players a clear screenshot to share. Likely discovery phrases include `빨래 널기 게임` and `건조대 퍼즐`. |
| 세계 시간 보드 / World Time Board | info | 4 | 3 | 4 | 5 | 16 | Pick two cities and slide a meeting marker across both local days. The backlog idea answers a clear search need such as `시차 계산기`, with less reason to share the result. |
| 아무것도 하지 마 / Do Absolutely Nothing | weird | 4 | 3 | 3 | 5 | 15 | Start a stillness timer and get a deadpan verdict at the first movement. The backlog idea fits the research note on small interactive experiments. A funny verdict gives friends a reason to try it once. |

The laundry puzzle takes the tactile appeal noted in today’s research and gives it an original winter household subject. The first rack teaches the rule through placement, and the same rule creates tighter choices on the next two racks. [Today’s research](01-research.md) · [Idea backlog](../../../play/ideas.md)

## Meta

slug `winter-laundry-puzzle`

- category `games`, kind `game`, aspect `9/16`, date `2026-11-23`
- tags ko `빨래 널기 게임`, `건조대 퍼즐`, `겨울 빨래`
- tags en `laundry puzzle`, `drying rack`, `winter`
- title ko `겨울 빨래 널기 퍼즐`
- title en `Winter Laundry Puzzle`
- desc ko `이불부터 양말까지, 겨울 빨래를 건조대 세 칸에 딱 맞게 널어 보세요. 옷의 폭과 길이를 살피며 세 판의 빨래 바구니를 비워요.`
- desc en `Fit sheets, towels and socks onto a winter drying rack. Watch the width and drop of each piece as you empty three baskets.`
- howto ko `빨래를 고른 뒤 건조대 줄을 누르세요. 줄에 남은 폭과 아래 공간이 모두 충분해야 해요. 막히면 방금 넌 빨래를 되돌릴 수 있어요.`
- howto en `Choose a piece of laundry, then choose a rail. It needs enough room across and below. Use Undo to take back the last piece you hung.`
- about ko `겨울 실내 건조대에서 모양을 맞추는 퍼즐이에요. 처음 하는 사람도 같은 세 판을 풀 수 있어요.`
- about en `A packing puzzle inspired by a winter indoor drying rack. Everyone gets the same three boards.`

## Pitch

An indoor rack sits against a blue winter wall. An ivory sheet is already selected in the first basket. Tap Start, then tap the top rail to watch the sheet drop into place and the rail’s free width fall to zero. Short rails turn spare socks into useful pieces as the boards get tighter.

Each garment needs enough **free width across the rail** and **clearance below it**. Clear three baskets before the third misfit. Legal placements are reversible, so players can try a different arrangement whenever a rack gets crowded.

## Flow

1. **Start.** Show the title, one-line instructions, a small illustration of a sheet on a rail, and a prominent Start button. Display the saved best score, with a default of zero.
2. **Play.** Open rack 1 with the sheet selected. Show three numbered rails, the basket, the current rack number, total score, and remaining tries. A successful placement hangs the garment and clears the selection. A rejected placement keeps it selected and costs one try. Undo is available for placements on the current rack.
3. **Rack clear.** When the basket empties, freeze the rack and show the completed arrangement, the total score, remaining tries, and a Next rack button. This screen appears after racks 1 and 2. The next rack opens with the first garment selected and carries over the score and tries.
4. **Result.** Clearing rack 3 ends the run with the finished rack on display. Spending the third try ends the run with the current rack and the reason the last piece failed to fit. Both outcomes show score, best score, and a large Play again button. Play again opens rack 1 immediately with a fresh basket and three tries.

## Controls

- **Touch and mouse.** Activate garment tiles and rail buttons by tap or click. Tapping the selected garment again clears it. A rail press with no garment selected shows a hint and costs no try.
- **Keyboard.** Tab and Shift+Tab move among native buttons. Enter and Space activate the focused button. During play, `1`–`7` select the nth remaining garment in the displayed basket, `Q` / `W` / `E` attempt the top / middle / bottom rail, `U` undoes the last successful placement, and Escape clears the selection. Shortcuts act once per keypress and only while focus is within the item.
- **Focus.** On Start and Next rack, focus the top rail. When keyboard activation removes a garment tile, move focus to the next remaining tile, the preceding tile if necessary, or the new screen’s primary button. Focus Next rack or Play again when those screens appear. Expose selection with `aria-pressed` and feedback through one polite live region.
- **Touch targets.** Keep buttons at least 44 × 44 CSS px. Use pointer events for press feedback and native button activation for moves. Apply `touch-action: none` on the board. Prevent default only for handled game keys and touch gestures on the play surface.

## Rack rules and scoring

A rail has a fixed width and drop clearance. A garment has an integer width and drop. A placement succeeds when its width is at most the rail’s remaining width and its drop is at most the rail’s clearance. Pieces pack left to right, and the rail’s clearance stays constant.

Keep garment IDs stable, including duplicate pieces. The basket preserves the order in the table. Undo removes the most recent successful placement from its rail, restores its basket position, and selects it. Tries are shared across racks and are never restored by Undo.

Score equals all pieces on cleared racks plus pieces currently hung on the active rack. A placement adds one point and Undo removes one. A full clear scores 18. Commit the best on either result screen using the score at the end of that run.

All dimensions below are **width × drop**. Solutions are listed in rail order from top to bottom.

| Rack | Rails | Basket order | Verified arrangement |
|---|---|---|---|
| 1 · 5 pieces | `3×3`, `3×1`, `2×2` | Sheet, towel, sock, sock, sock | Sheet / three socks / towel |
| 2 · 6 pieces | `4×2`, `3×3`, `3×1` | Trousers, towel, towel, pillowcase, sock, sock | Two towels / trousers and sock / pillowcase and sock |
| 3 · 7 pieces | `5×2`, `4×3`, `3×1` | Sheet, scarf, towel, towel, pillowcase, sock, sock | Two towels and sock / sheet and scarf / pillowcase and sock |

| Garment | ko | en | Width × drop |
|---|---|---|---|
| Sheet | 이불 | Sheet | `3×3` |
| Towel | 수건 | Towel | `2×2` |
| Sock | 양말 | Sock | `1×1` |
| Trousers | 바지 | Trousers | `2×3` |
| Pillowcase | 베갯잇 | Pillowcase | `2×1` |
| Scarf | 목도리 | Scarf | `1×3` |

## Visual design

- **Palette.** Use a blue-gray wall `#DDE8EC`, warm ivory cards `#FFF9EE`, dark ink `#172D37`, deep teal `#176B62` for selection and primary actions, and rust `#A1392D` for a misfit. Pair each state color with a border or text change.
- **Rack.** Draw original garment shapes in inline SVG. Use the same cell width on all rails. Subtle horizontal ticks show available width, a side bracket shows clearance, and each rail displays both values in text. Garment width and drop are visible in the silhouette and printed on its basket tile.
- **Play layout.** Place the HUD above the rack and the basket and Undo control below it. At `320×480`, use 12 px side gutters, three compact rail rows, and a four-column basket of up to two rows. Keep the status area to two lines and reserve its space to prevent jumps. Reflow on resize and center the play column up to 480 px wide on desktop. Fit every screen inside the iframe without page scrolling.
- **Transitions.** Let a successful garment drop into place over 140 ms. On a misfit, nudge the selected tile and highlight the relevant rail measurement for 140 ms. Apply state changes immediately. With reduced motion, use static highlights. Pause pending animation while the document is hidden.
- **Sound.** Silent throughout.

## Strings

Read `?lang=ko` or `?lang=en`, falling back to Korean when `navigator.language` starts with `ko` and English otherwise. Set `<html lang>` and the document title accordingly. Keep the table below, the garment names, and each locale’s metadata in the two dictionaries. SVG decorations are hidden from assistive technology because the buttons and rail descriptions supply the labels.

| Key | ko | en |
|---|---|---|
| `title` | 겨울 빨래 널기 퍼즐 | Winter Laundry Puzzle |
| `startHint` | 빨래를 고르고, 폭과 길이가 맞는 줄에 널어요. | Pick a piece and hang it on a rail it fits. |
| `start` | 시작하기 | Start |
| `rackProgress` | 건조대 {n}/3 | Rack {n}/3 |
| `score` | 점수 {n}/18 | Score {n}/18 |
| `best` | 최고 점수 {n}/18 | Best {n}/18 |
| `tries` | 남은 기회 {n}/3 | Tries left {n}/3 |
| `rackLabel` | 건조대 | Drying rack |
| `basketLabel` | 빨래 바구니 | Laundry basket |
| `dimensionsLabel` | 폭 × 길이 | Width × drop |
| `garmentTile` | {garment} {w}×{d} | {garment} {w}×{d} |
| `garmentAria` | {index}번, {garment}, 폭 {w}칸, 길이 {d}칸 | {garment}, basket position {index}, width {w}, drop {d} |
| `railTitle` | {n}번 줄 | Rail {n} |
| `railWidth` | 남은 폭 {w} | Free width {w} |
| `railDrop` | 길이 한도 {d} | Max drop {d} |
| `railAria` | {n}번 줄, 남은 폭 {w}칸, 길이 한도 {d}칸 | Rail {n}, free width {w}, max drop {d} |
| `railEmpty` | 널린 빨래 없음 | Nothing hung |
| `railContents` | 널린 빨래: {garments} | Hanging: {garments} |
| `pickGarment` | 먼저 빨래를 골라 주세요. | Choose a piece first. |
| `pickRail` | {garment}을(를) 널 줄을 골라 주세요. | Choose a rail for this piece. |
| `placed` | {n}번 줄에 널었어요. | Hung on rail {n}. |
| `tooWide` | 줄에 남은 폭이 부족해요. | The rail needs more free width. |
| `tooLong` | 줄 아래 공간이 부족해요. | The rail needs more room below. |
| `tooWideAndLong` | 줄의 폭과 아래 공간이 모두 부족해요. | The rail needs more room across and below. |
| `undo` | 되돌리기 | Undo |
| `undone` | 방금 넌 빨래를 다시 골랐어요. | Last piece taken down and selected. |
| `rackClear` | 이 건조대를 다 채웠어요! | Rack complete! |
| `nextRack` | 다음 건조대 | Next rack |
| `win` | 빨래를 모두 널었어요! | All the laundry is hung! |
| `outOfTries` | 이번 판의 기회를 다 썼어요. | You’ve used all your tries. |
| `newBest` | 최고 기록을 세웠어요! | New best! |
| `again` | 다시 하기 | Play again |

Render each rail’s contents as an accessible description in hanging order. Join names with commas and preserve duplicates. Use `railEmpty` for an empty rail. Announce the remaining tries together with a misfit message, and carry the same misfit message over to the loss screen.

## localStorage

- `winter-laundry-puzzle:best:v1` stores the best completed-run score as a decimal integer string from `0` to `18`.
- Guard reads and writes with `try/catch`. Use a session-memory best if storage is blocked. Treat missing, malformed, or out-of-range values as zero. Before writing a result, take the maximum of the stored value, session best, and result score.
- Reload begins at Start. The active rack, selection, tries, and move history live in memory.

## Edge cases

- A garment that exactly fits either dimension is legal. On a misfit, test both dimensions before choosing the feedback string and deduct exactly one try.
- A legal placement can leave the remaining basket without a fit. Keep Undo available even when the current selection fits nowhere. A rail press without a selection, an unavailable number shortcut, and an empty Undo history leave score and tries unchanged.
- Use one activation path for each action. Ignore repeated keydowns. Apply each move and screen transition synchronously before starting its animation. An extra tap after a successful placement finds the selection empty and costs no try.
- Rack completion and loss take precedence over further moves. The preview rack on completion and result screens is read-only. Reset the board, history, tries, selection, and status on Play again, then select the first sheet.
- Resize from the current logical state. Piece positions depend on occupied units, so resizing retains placement order and selection. Returning from a hidden iframe does not replay a move.
- For thumbnail QA, `#demo` opens the successful result with the verified third-rack arrangement and a score of 18. The demo leaves the saved best untouched.
- Before publishing, run `npm test`, `npm run build`, and `npm run qa -- --thumbs`. Check the generated thumbnail and keyboard-only play in both languages at `320×480`. Verify a full clear, three misfits, Undo after a dead end, and replay with storage blocked.

## Must not

- Keep all gameplay HTML, CSS, JavaScript, and SVG in `items/winter-laundry-puzzle/index.html`. Ship metadata separately and generate `thumb.png` through QA. External assets, fonts, libraries, network calls, and analytics are out of scope.
- Use original art and boards. Keep real brands, people, and existing game artwork out of the item.
- Keep interaction inside the iframe. Browser dialogs, new windows, navigation, and autoplay are out of scope.
- Keep the dimensions fictional and specific to the puzzle. Laundry-care guidance, drying-time estimates, timed penalties, and drag-only controls are out of scope.