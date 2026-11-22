# Idea and spec: 김장통 정리 퍼즐 / Kimchi Fridge Puzzle

## Concepts scored

Each criterion is scored from 1 to 5. Korean search and share scores are editorial estimates based on the supplied research and backlog.

| Concept | Category | First 10 seconds | Originality | Korean search/share | One-file buildability | Total | Verdict |
|---|---|---:|---:|---:|---:|---:|---|
| **김장통 정리 퍼즐 / Kimchi Fridge Puzzle** | **puzzle** | **5** | **4** | **4** | **5** | **18** | **Picked.** A visible first move makes the rules clear, and a neatly packed fridge makes a recognizable screenshot. |
| 김장 재료 배율 계산기 / Kimchi Recipe Scaler | tools | 4 | 3 | 4 | 5 | 16 | Scale a recipe’s own ingredient amounts to a different cabbage weight. The search phrase `김장 양념 비율` fits, though users need quantities from a recipe before the tool pays off. |
| 첫눈 정류장 / First Snow Bus Stop | chill | 5 | 3 | 3 | 5 | 16 | Tap a fogged bus shelter pane to reveal pools of streetlight and falling snow. The first tap is satisfying, with less reason to return or compare results. |

## Meta

slug `kimchi-fridge-puzzle`

| Field | Value |
|---|---|
| Category | `puzzle` |
| Kind | `game` |
| Aspect | `9/16` |
| Date | `2026-11-22` |
| Tags | ko `김장`, `냉장고 정리`, `공간 퍼즐` · en `kimchi`, `fridge organizing`, `packing puzzle` |

| Field | Korean | English |
|---|---|---|
| Title | 김장통 정리 퍼즐 | Kimchi Fridge Puzzle |
| Desc | 김장통을 돌려 냉장고 빈칸에 딱 맞게 넣어 보세요. 통을 덜 꺼낼수록 점수가 높아지는 세 칸짜리 공간 퍼즐이에요. | Rotate kimchi containers to fill three fridge shelves. The fewer containers you take back out, the higher your score. |
| Howto | 통을 고르고 선반의 칸을 누르세요. 돌리기 버튼이나 R 키로 통을 돌릴 수 있어요. 빈칸을 모두 채우면 다음 선반이 열려요. | Pick a container and press a shelf square. Use Rotate or R to turn it. Fill every open square to unlock the next shelf. |
| About | 김장날 냉장고에 마지막 통까지 넣는 순간을 퍼즐로 만들었어요. 시간 제한은 없어요. | A packing puzzle inspired by fitting the last container into the fridge on kimchi-making day. Play at your own pace. |

## Pitch

The fridge door swings open on three shelves of increasing difficulty. Each shelf has cold packs or dividers taking up space and a tray of kimchi containers with different footprints. Pick a container, rotate it as needed, and fit it into the remaining space. The first square container snaps into a four-cell outline as soon as the player tries the highlighted spot. Each completed shelf gets a soft seal flash and a score. The final screen stacks all three packed shelves into one fridge view.

## Flow

| Screen | Content and behavior |
|---|---|
| **Start** | Show the title, one-line instructions, a small fridge illustration with the first square container shown halfway into its four-cell space, and `냉장고 열기 / Open fridge`. Focus the start button. |
| **Play** | Show the shelf number and running shelf score, the 4×4 board, the numbered piece tray, Rotate and Take out, and one status line. Shelf 1 opens with piece 1 selected and its legal placement at A1 outlined until the first player action. Shelves 2 and 3 open with piece 1 selected and no placement outline until the player points to or focuses a board square. |
| **Shelf complete** | Keep the completed board in place, lock editing, show the shelf score, and replace the editing controls with one primary action. Shelves 1–2 show `다음 선반 / Next shelf`. Shelf 3 shows `결과 보기 / See results`. Focus that action on entry. |
| **Result** | Show the three completed shelf layouts stacked inside the fridge, total score, best score, and a large `다시 하기 / Play again` button. Focus the retry button. Retry starts shelf 1 with zero removals, fresh pieces, and the opening hint. |

## Controls

- **Touch and mouse:** Tap or click a numbered tray button to select its piece. Select a board square to try placing the selected piece there. Pointer hover previews the footprint. Touch placement uses a single tap. Rotate turns the selected tray piece 90° clockwise. Select a placed piece by its tray number, then use Take out to return it to the tray.
- **Keyboard:** Tab moves between normal buttons and the board, which has one Tab stop. Arrow keys move the board cursor one square without wrapping. Enter or Space activates the focused square or button. During play, keys 1–5 select the matching piece if present, including placed pieces. R rotates an unplaced selection. Delete takes out a placed selection. Ignore repeated keydown events for actions other than moving the board cursor. Prevent default only for game keys the item handles. Preserve Tab and standard browser shortcuts.
- **Selection:** A tray button remains available after placement and shows a check plus its placed state in the accessible name. Selecting a placed piece outlines the full piece and enables Take out. Rotate is enabled for unplaced pieces with more than one distinct rotation. The current cursor, selection, and validity each have a visible outline or pattern.

## Shelves and scoring

Columns A–D run left to right. Rows 1–4 run top to bottom. In shelf maps, `.` is usable and `#` is blocked. Piece footprints start in the orientation shown, with `/` marking a new row. Dots inside a footprint are empty offsets.

| Shelf | Board rows | Tray pieces in number order | One valid solution, in tray order |
|---|---|---|---|
| 1 | `...# / ...# / #### / ####` | `##/##`, `##` | A1 B1 A2 B2 · C1 C2 |
| 2 | `...# / .#.. / .... / ####` | `###`, `#./##`, `##/##` | A1 B1 C1 · A2 A3 B3 · C2 D2 C3 D3 |
| 3 | `.... / .#.. / ..#. / ....` | `###`, `.#/##`, `#./##`, `###`, `##` | A1 B1 C1 · D1 C2 D2 · A2 A3 B3 · A4 B4 C4 · D3 D4 |

1. Rotate the footprint within its bounding box and trim empty outer rows and columns. The anchor is the first occupied square in row-major order after rotation. Place that square on the chosen board cell and apply all other occupied offsets from it. On shelf 3, piece 2 anchors at D1 and reaches one column left to C2.
2. Placement succeeds when all occupied offsets land within the board on free usable squares. Commit the whole footprint at once. Keep the placed piece selected so the player can take it out immediately or choose another tray piece.
3. A rejected placement leaves the board and score intact. Taking out a piece frees all its squares, restores it to the tray in its current orientation, and adds one removal to that shelf. Rotation and rejected placements cost zero.
4. Each shelf is worth `max(50, 100 − 10 × removals)` points. Show that value live during play and lock it once all usable cells are filled. The final score is the sum of the three locked scores, from 150 to 300. A best score comes from a completed run.
5. Keep the shelf definitions fixed. Accept every legal full packing. The listed solutions cover 6, 10 and 14 usable squares respectively and serve as QA fixtures.

## Visual design

- Use a deep ink backdrop `#18252C`, a light fridge interior `#E9F4F3`, and muted red, mustard, teal, violet and blue lids. Put the matching tray number on each piece’s anchor. Use borders and patterns to distinguish blocked squares, the keyboard cursor, a valid preview, and an invalid preview.
- Keep the title or shelf header at the top, board centered, status on a single reserved line that can wrap, and editing controls below the tray. Use a system font. Size the tray as a single row of up to five buttons. Maintain 44 px minimum targets for board squares and controls at 320×480. Fill the iframe with `100dvh` and center a column up to 420 px wide on larger screens. Keep the outer page free of scrolling.
- Draw the fridge, lids and shelf dividers with CSS or inline SVG. On legal placement, use a short border flash. On shelf completion, sweep a highlight across the filled shelf once. Under `prefers-reduced-motion`, use static border changes. Use a silent interface.

## Strings

Use the localized metadata title for the document title and the start heading. Put all item UI and accessibility strings in `{ ko: {...}, en: {...} }`. Values in braces are substitutions. Piece numbers, scores and board coordinates come from game state.

| Key | Korean | English |
|---|---|---|
| `startHelp` | 통을 돌려 선반의 빈칸을 모두 채우세요. | Rotate the containers to fill every open square. |
| `start` | 냉장고 열기 | Open fridge |
| `shelf` | 선반 {n}/{total} | Shelf {n}/{total} |
| `board` | 냉장고 선반 | Fridge shelf |
| `tray` | 김장통 | Containers |
| `pieceReady` | {n}번 통, 선반 밖 | Container {n}, in tray |
| `piecePlaced` | {n}번 통, 선반 안 | Container {n}, on shelf |
| `cellEmpty` | {cell}, 빈칸 | {cell}, open |
| `cellBlocked` | {cell}, 막힌 칸 | {cell}, blocked |
| `cellFilled` | {cell}, {n}번 통 | {cell}, container {n} |
| `rotate` | 돌리기 | Rotate |
| `takeOut` | 꺼내기 | Take out |
| `firstHint` | 1번 통을 표시된 칸에 넣어 보세요. | Put container 1 on the outlined square. |
| `placeHint` | 통을 놓을 칸을 고르세요. | Pick a square for the container. |
| `placedHint` | 다른 통을 고르거나 이 통을 꺼내세요. | Pick another container or take this one out. |
| `invalid` | 여기는 통이 들어가지 않아요. | The container won’t fit here. |
| `removed` | {n}번 통을 꺼냈어요. | Container {n} is back in the tray. |
| `shelfScore` | 선반 점수 {score}점 | Shelf score {score} |
| `shelfDone` | 선반을 꽉 채웠어요! | Shelf packed! |
| `next` | 다음 선반 | Next shelf |
| `seeResult` | 결과 보기 | See results |
| `resultTitle` | 김장통 정리 끝! | Fridge packed! |
| `totalScore` | 총점 {score}점 | Total score {score} |
| `bestScore` | 최고 점수 {score}점 | Best score {score} |
| `newBest` | 새 최고 기록! | New best! |
| `retry` | 다시 하기 | Play again |

Use a polite live region for invalid placements, removals and shelf completion. Mark the selected tray button with `aria-pressed`. Give the board squares the listed accessible names. Preserve a visible focus ring throughout.

## localStorage

- `kimchi-fridge-puzzle:best:v1` holds a decimal integer representing the highest completed score. Accept values from 150 to 300 in increments of 10. Treat a missing or invalid value as no record.
- Read and write inside `try/catch`. Calculate and save the best score once at third-shelf completion, before opening the result screen. The first completed run establishes the best. Show the new-best label only when a run exceeds a previous valid record.
- Keep the current run and any in-session best in memory. Store only the best completed score.

## Edge cases

- Resolve language from `?lang=ko` or `?lang=en`. Otherwise use Korean when `navigator.language` starts with `ko` and English for other values. Set `<html lang>` accordingly.
- A rotation can leave occupied offsets to the left of the anchor. Check bounds for every occupied offset before reading the board. Empty footprint offsets may overlap blocked or occupied cells.
- Repeated taps on the same square after a successful placement leave the piece in place. Repeated taps on a transition button can advance only the screen from which the button was rendered.
- If the remaining pieces cannot fit the current arrangement, any placed piece can be taken out until the shelf is complete. The score floor preserves a route to the result regardless of how many times the player rearranges pieces.
- On resize or orientation change, preserve the board, piece orientations, selection, score and focus where possible. Cancel decorative motion when the page becomes hidden. The puzzle has no elapsed-time state.
- A blocked storage API leaves scoring, retry and the in-session best usable. A score tied with the record keeps the same best and omits the new-best label.
- For publishing, run `npm test`, `npm run build`, and `npm run qa -- --thumbs`. Check Korean and English at 320×480 with touch and keyboard. Play the listed solutions to reach 300 points, then replay with a removal to verify the deduction and best-score display. Use the generated `thumb.png`.

## Must not

- Keep the game in `items/kimchi-fridge-puzzle/index.html`, with site metadata in `meta.json`. No network requests, external fonts, libraries, analytics, raster game art or video.
- No trademarks, real people, branded containers, or copied game boards, artwork, audio or interface assets.
- No timer, forced drag gesture, autoplay audio, native dialogs, pop-ups or navigation away from the iframe.
- No cooking, food-storage, or food-safety instructions in the item. The fridge and its contents are fictional puzzle pieces.