# Idea and spec: 창문 성에 퍼즐 / Frosted Window Puzzle

## Concepts scored

Scores are 1–5 for first-10-second value, originality, Korean search and share potential, and buildability in one HTML file. Maximum 20. The supplied research offers seasonal themes and suggests that tactile interactions may appeal. The demand scores are editorial estimates.

| Concept | Category | First 10 sec. | Originality | Search/share | Buildability | Total | Verdict |
|---|---|---:|---:|---:|---:|---:|---|
| **창문 성에 퍼즐 / Frosted Window Puzzle** | **puzzle** | **5** | **4** | **3** | **5** | **17** | **Pick.** The first tap changes an entire strip of glass. Three fixed boards give friends the same challenge and make scores comparable. |
| 곶감 널기 / Hang the Persimmons | silly | 4 | 4 | 3 | 5 | 16 | Clip illustrated persimmons onto a drying line. Clips placed too close together leave fruit-shaped dents, and the final line makes a funny screenshot. |
| 모임 N빵 계산기 / Group Bill Splitter | tools | 5 | 2 | 4 | 5 | 16 | Enter a shared bill and an optional drinks subtotal. The calculator assigns whole-won amounts that add up to the bill and identifies who pays each remainder won. The backlog already has an N빵 idea, and the search term is broad. |

## Meta

- slug `frosted-window-puzzle`
- category `puzzle`, kind `game`, aspect `9/16`, date `2026-11-22`
- Tags
  - ko `성에`, `겨울 퍼즐`, `창문`
  - en `frost`, `winter puzzle`, `logic puzzle`
- ko
  - `title` 창문 성에 퍼즐
  - `desc` 창틀의 버튼을 눌러 한 줄씩 뒤집고 겨울 창문의 성에를 걷어 보세요. 창문 세 장을 가능한 한 적은 횟수로 맑게 만드는 퍼즐이에요.
  - `howto` 위쪽 버튼은 세로줄을, 왼쪽 버튼은 가로줄을 뒤집어요. 성에 낀 칸은 맑아지고 맑은 칸에는 성에가 다시 껴요. 모든 칸을 맑게 만드세요.
  - `about` 세 판의 시작 배치는 매번 같아요. 최고 점수는 이 브라우저에 저장돼요.
- en
  - `title` Frosted Window Puzzle
  - `desc` Flip rows and columns to clear the frost from three winter windows. The fewer moves you use, the higher your score.
  - `howto` Use the top buttons to flip columns and the left buttons to flip rows. Frosted tiles clear and clear tiles frost over. Clear every tile.
  - `about` The same three layouts appear each run. Your best score is stored in this browser.

## Pitch

A 4×4 window looks out onto a winter night. Each tap on the frame flips one entire row or column between frosted and clear. The first board has one obvious streak in each direction, and their crossing tile shows the trick. Clearing a second strip can bring frost back where the strips overlap.

Win by clearing three windows. The finished window reveals a warm light outside, and the results show how many moves each board took.

## Flow

1. **START** shows the title, the goal, an illustration of the first window and one large start button. Starting opens board 1 with zero moves.
2. **PLAY ×3** shows the numbered row and column buttons, the window, the board number, the move count and a reset button. Each move flips four tiles simultaneously. The all-clear check runs after each accepted move.
3. **BOARD CLEAR ×2** keeps the first or second solved window visible, shows the board score and enables a single Next button. The move controls and reset button are replaced. The player chooses when to continue.
4. **RESULT** displays the third solved window as an illustration, the run score, the best score and a row for each board’s moves and points. A large retry button starts a fresh run at board 1.

## Controls

- Tap or click numbered frame buttons. Left buttons flip rows. Top buttons flip columns. Glass tiles are read-only.
- Use `Tab` and `Shift+Tab` to move between buttons. `Enter` or `Space` activates the focused button. Use native button activation so a pointer interaction produces one move.
- While playing, `1`–`4` flip rows and `Q`, `W`, `E`, `R` flip columns from left to right. Match letter shortcuts case-insensitively. Ignore repeats and modified shortcuts. Prevent the default action only for a handled shortcut.
- Give buttons at least 44×44 px hit areas and a visible focus ring. Use `touch-action: none` on the move controls and keep keyboard focus visible at every size.
- Focus the first row button on entry to PLAY, Next on BOARD CLEAR, and Retry on RESULT. Reset keeps focus on Reset. Announce progress through one polite live region and expose the window as a read-only table with the localized tile states.

## Boards and scoring

`.` is clear and `#` is frosted. Strings run left to right, with rows listed top to bottom. Row and column indices start at 1.

| Board | Initial rows | Minimum moves | One optimal solution |
|---|---|---:|---|
| 1 | `..#.` / `##.#` / `..#.` / `..#.` | 2 | Row 2, column 3 |
| 2 | `#.##` / `.#..` / `.#..` / `#.##` | 3 | Rows 1 and 4, column 2 |
| 3 | `#.#.` / `.#.#` / `#.#.` / `.#.#` | 4 | Rows 1 and 3, columns 2 and 4 |

- Each press XORs all four bits in the selected strip and adds one move. The window clears when every bit is zero. Move order is free. Each layout has two valid sets of strip flips, one the complement of the other. Both sets solve board 3 in four moves.
- Award 3 points for a minimum-move clear, 2 for a clear within two moves of the minimum, and 1 for any other clear. Add the board points for a total out of 9. The score depends on moves alone.
- **Reset board** restores the current board’s starting tiles and resets its move counter to zero. Earlier board results carry forward.
- **Play again** resets all board results and counters. The record is updated once, when board 3 clears.

## Visual design and screens

- **Palette.** Night sky `#101D2F`, dark frame `#273C52`, frost `#DDF4F7`, clear glass `#355572`, and warm light `#FFD38B`. Draw the scene with CSS and inline SVG. Frost tiles have short etched lines. Clear tiles show a continuous background with a small house and one lit window. Texture distinguishes the two states without relying on color.
- **START.** Use the window as the main visual. Place the goal under the title and the primary action below the illustration. Keep the preview decorative so its frame buttons cannot be mistaken for controls.
- **PLAY.** Place the board number and moves on a single status row. Align the frame buttons precisely with the tiles. Use the same two-line rule throughout play so the layout remains stable. A short highlight traces the pressed strip and its new state appears immediately.
- **BOARD CLEAR.** Reveal the full background through the solved glass. Place the score just below the window and Next in the bottom action area. Show the clear state immediately and let the light brighten over 160 ms.
- **RESULT.** Lead with the score and best score. Show three compact board rows and a warm window illustration sized to leave room for Retry. Keep the title and result visible together for a screenshot.
- **Responsive layout.** Fill the iframe with `100dvh` and a `100vh` fallback. Center a column up to 420 px on wide screens. At 320×480, use at most 12 px outer padding, a compact five-by-five layout that includes the frame-button tracks, and a single bottom action row. Keep the full board, instructions and actions visible without page scrolling. Reflow on resize while preserving state and focus.
- **Motion and sound.** Use short visual feedback only. Disable the strip and glow transitions under `prefers-reduced-motion`. Stop decorative animation while the document is hidden.

## Strings

Use the localized `appTitle` for both the document title and the start heading. All runtime copy, including accessibility names and live announcements, comes from the dictionary below. `{n}` is the board or strip index, `{moves}` is the move count, and `{points}` and `{best}` are scores.

| Key | ko | en |
|---|---|---|
| `appTitle` | 창문 성에 퍼즐 | Frosted Window Puzzle |
| `startGoal` | 가로줄과 세로줄을 뒤집어 창문 세 장의 성에를 걷어 보세요. | Flip rows and columns to clear three frosted windows. |
| `start` | 시작하기 | Start |
| `board` | 창문 {n}/3 | Window {n}/3 |
| `moves` | {moves}회 | Moves: {moves} |
| `rule` | 위는 세로줄, 왼쪽은 가로줄이에요. 성에와 맑은 유리가 서로 바뀌어요. | Top flips columns. Left flips rows. Frosted and clear tiles swap. |
| `row` | 가로 {n}번 줄 뒤집기 | Flip row {n} |
| `column` | 세로 {n}번 줄 뒤집기 | Flip column {n} |
| `glass` | 창문 상태 | Window state |
| `rowHeader` | 가로 {n}번 줄 | Row {n} |
| `columnHeader` | 세로 {n}번 줄 | Column {n} |
| `frosted` | 성에 | Frosted |
| `clear` | 맑음 | Clear |
| `moveStatus` | {moves}회 움직였어요. 성에가 낀 칸 {left}개가 남았어요. | Moves: {moves}. Frosted tiles left: {left}. |
| `reset` | 이 판 초기화 | Reset board |
| `resetStatus` | 창문 {n}의 처음 배치로 돌아왔어요. | Window {n} reset to its starting layout. |
| `cleared` | 창문이 맑아졌어요! | Window cleared! |
| `boardScore` | {moves}회 · {points}/3점 | Moves: {moves} · {points}/3 pts |
| `next` | 다음 창문 | Next window |
| `finished` | 창문 세 장을 모두 닦았어요! | All three windows cleared! |
| `totalScore` | 점수 {points}/9점 | Score: {points}/9 |
| `bestScore` | 최고 점수 {best}/9점 | Best: {best}/9 |
| `newBest` | 새 최고 기록! | New best! |
| `resultRow` | 창문 {n} · {moves}회 · {points}/3점 | Window {n} · Moves: {moves} · {points}/3 pts |
| `retry` | 다시 하기 | Play again |

Visible strip labels are the numerals `1` through `4`. Set `<html lang>` from the `lang` query parameter when it is `ko` or `en`. Otherwise use Korean for a browser language with primary subtag `ko`, and English for all others.

## localStorage

- `frosted-window-puzzle:best:v1` stores the highest completed-run score as a decimal string. Accept only `"0"` through `"9"`. Default to `0`.
- Wrap reads and writes in `try/catch`. Keep a session best in memory when storage is unavailable. Show the new-record message only on a strictly higher score.
- Keep tiles, move counts and board results in memory. A reload opens START.

## Edge cases

- Clearing a board commits its move count and points before the next render. Later move events are ignored once play has ended. Keep the board-clear action on a separate control so a double tap on the solving strip cannot advance the screen.
- Before a board clears, repeated deliberate taps on the same strip count separately. Two such taps restore its previous tiles and cost two moves. Visual feedback may be restarted without blocking moves.
- At zero moves, reset leaves the board in its starting state. A reset during visual feedback clears that feedback together with the move count.
- Changing size or orientation during a solve or result preserves the logical board, score and current screen. Backgrounding the tab pauses visual feedback without advancing the game.
- A corrupt record or a failed write never blocks the result screen or retry.
- Verify all three optimal solutions and both four-move solutions for board 3. Check pointer and keyboard play at 320×480, both languages, reduced motion, blocked storage, and best-score persistence across a reload. Before publishing, run `npm test`, `npm run build` and `npm run qa -- --thumbs`. Use the QA-generated thumbnail.

## Must not

- No external assets, scripts, fonts, network requests or analytics. Ship the game as one HTML file with inline CSS, JavaScript and vector artwork, plus the repository’s standard metadata and generated thumbnail.
- No raster art, video, copied layouts, existing game characters, trademarks or real people.
- No page scrolling, dialogs, popups or navigation away from the iframe.
- No countdown, forced advancement or audio.