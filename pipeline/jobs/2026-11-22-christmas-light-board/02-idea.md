# Idea and spec: 크리스마스 전구 꾸미기 / Christmas Light Board

## Concepts scored

Scores are 1–5 for first-10-second value, originality, Korean search/share demand, and buildability in one HTML file. Demand scores are estimates based on the supplied seasonal research and likely search terms. Maximum 20.

| Concept | Category | First 10 seconds | Originality | Korean search/share | Buildability | Total | Verdict |
|---|---|---:|---:|---:|---:|---:|---|
| **크리스마스 전구 꾸미기 / Christmas Light Board** | **chill** | **5** | **4** | **4** | **5** | **18** | **Picked.** A tree is ready to decorate on arrival, and the finished design fits in a chat message. Seasonal hooks include `크리스마스 꾸미기` and `크리스마스 트리 꾸미기`. |
| 올해 남은 주말 계산기 / Weekends Left This Year | tools | 5 | 2 | 4 | 5 | 16 | Instantly shows remaining Saturdays and Sundays for the selected year. Fits `올해 남은 일수` searches, with less reason to share the result. |
| 선물 포장 컨베이어 / Gift Wrap Conveyor | arcade | 4 | 4 | 3 | 4 | 15 | In a 30-second round, match ribbon patterns to passing boxes with three large buttons. `크리스마스 미니게임` is a plausible hook, and the timing needs playtesting. |

## Meta

slug `christmas-light-board`

- Category `chill`, kind `tool`, aspect `9/16`, date `2026-11-22`
- Tags ko `크리스마스`, `트리 꾸미기`, `전구`
- Tags en `Christmas`, `tree decorating`, `lights`
- **ko title** — 크리스마스 전구 꾸미기
- **ko desc** — 작은 크리스마스트리에 전구를 하나씩 켜 보세요. 완성한 전구판을 이모지 카드로 복사해 친구에게 보낼 수 있어요.
- **ko howto** — 전구 색을 고르고 칸을 누르세요. 마우스나 터치로 칠하거나, 방향키로 칸을 옮겨 Enter 또는 Space로 전구를 켤 수 있어요. 미리보기에서 이모지 카드를 복사하세요.
- **ko about** — 첫 화면에 트리가 준비되어 있어요. 빈 판에서 새로 꾸밀 수도 있고, 마지막 전구판은 이 브라우저에 저장돼요.
- **en title** — Christmas Light Board
- **en desc** — Light up a little Christmas tree one bulb at a time. Copy your finished light board as an emoji card to send to a friend.
- **en howto** — Pick a bulb color and tap a tile. With the keyboard, use the arrow keys to move and Enter or Space to paint. Open the preview to copy your emoji card.
- **en about** — A tree is ready to decorate when you arrive. You can also start with a blank board. Your latest design is saved in this browser.

## Pitch

A 5×5 light board sits in a dark window. The first visit opens on a mint tree with a gold topper and the red brush selected. One tap adds an ornament. The user can decorate the tree, clear the board and draw from scratch, or copy the finished pattern as five rows of emoji under a holiday greeting.

## Flow

1. **Editor.** Show the title, short instruction, board, four brushes, and the Tree, Clear, Undo, and Preview buttons. The tree is already lit on the first visit. Restored drafts open in this same screen.
2. **Preview.** Show the holiday greeting above the enlarged, read-only board. Edit returns to the draft. Copy card copies the greeting and five emoji rows. Show a success message in a reserved status area.
3. **Manual copy.** If clipboard access is unavailable or fails, show the exact card text in a labeled, read-only textarea. Focus and select it on entry. Select text repeats the selection, and Back returns to the preview.

## Controls

- Use native buttons for tiles, brushes, and actions. Tap or click a tile to apply the selected brush. Each activation changes one tile. Selecting the Off brush erases individual tiles.
- Tab enters the grid at its last focused tile, or the center tile on first entry. Inside the grid, arrow keys move one tile at a time and stop at the edges. Enter or Space applies the brush through the button’s native click behavior. Tab and Shift+Tab leave the grid in document order.
- Brushes are separate Tab stops with `aria-pressed`. Tree replaces the current pattern with the starter tree. Clear switches to an entirely dark board. Undo restores the board immediately before the last effective edit, including Tree and Clear. A second Undo stays disabled until another edit.
- On Preview, focus its heading. Edit returns focus to the Preview button in the editor. Back from Manual copy and Escape from Manual copy return focus to Copy card. Escape from Preview returns to the editor. Leave native text selection and copy shortcuts active in Manual copy.
- Use pointer events for visual feedback and one `click` handler per button for activation. Suppress page movement on handled grid arrow keys and use `touch-action: none` on the editor grid. Keep every button at least 44×44 CSS px.

## Board and state

Each cell holds one digit. Render a distinct shape as well as a color, and update its accessible name with the current state after every edit.

| Digit | Brush key | Tile treatment | Export |
|---|---|---|---|
| `0` | `off` | Dark socket with a thin ring | ⬛ |
| `1` | `gold` | Gold four-point star | 🟨 |
| `2` | `mint` | Mint diamond | 🟩 |
| `3` | `red` | Red circle | 🟥 |

The starter tree uses these rows, top to bottom:

```text
00100
00200
02220
22222
00100
```

The blank board is 25 zeroes. The default brush is Red. For each effective edit, retain a copy of the preceding board in memory, replace the board, then attempt to save the new board. Undo consumes that copy and saves the restored board. Brush changes stay independent of board edits. Preview and Manual copy use the same board state as the editor.

## Screen layout and visual design

- **Editor.** Use a midnight-blue background (`#121C2E`), a muted blue window frame (`#304260`), and warm white text (`#FFF4DD`). The bulb colors are gold `#FFD36A`, mint `#79E2AD`, and red `#FF7D86`. Use `system-ui` and keep the four palette labels visible. Give the selected brush a light outline and a checkmark. Give focused controls a separate, visible focus ring.
- **Preview.** Center the greeting and board in the same window frame. Place Edit and Copy card below it. Keep a line below the buttons for copy feedback so showing it does not shift the controls.
- **Manual copy.** Keep the card text at the center of the screen, with its label, copy instructions, and Select text and Back buttons. Size the textarea for the greeting and all five rows at 320×480. Preserve explicit line breaks and allow native selection handles.
- **Layout.** Fill the iframe using viewport units and center a column with a maximum width of 420 px. At 320×480, use 12 px side padding, a 5×5 grid with 44 px tiles and 4 px gaps, and single rows for the palette and editor actions. Allow the instruction to wrap and keep the page fixed without scrolling. Reflow on resize while preserving the active screen, board, and focus.
- **Feedback.** A bulb briefly brightens when its state changes. Use a short CSS transition and settle it immediately when reduced motion is requested or the document is hidden. The window frame and bulbs are CSS shapes. The experience is silent.

## Export and copy

Construct the card from the localized `greeting`, a newline, and five rows of five emoji. Read cells left to right and rows top to bottom. Separate rows with `\n`. Use no spaces between cells and no trailing newline. An all-dark board produces a valid card.

Call `navigator.clipboard.writeText` from the Copy card activation. Allow one clipboard request at a time and leave Edit available. If the request resolves while the same preview is active, show `copied` in a polite live region. On an unavailable API, a rejection, or a synchronous error, open Manual copy. Ignore a late completion after leaving its preview. In Manual copy, the textarea always contains the full card, and Select text focuses it and selects its contents for the browser’s native copy command.

## Strings

Keep UI and accessibility copy in a `{ ko: {...}, en: {...} }` dictionary. Accept `?lang=ko` or `?lang=en`. Otherwise, use Korean when the browser’s primary language subtag is `ko`, and English for other languages. Set `<html lang>` and the document title accordingly. The Meta section supplies the separate catalog copy.

| Key | ko | en |
|---|---|---|
| `appTitle` | 크리스마스 전구 꾸미기 | Christmas Light Board |
| `editorHint` | 색을 고르고 칸을 눌러 전구를 켜세요. | Pick a color and tap a tile to light it up. |
| `boardLabel` | 전구판 | Light board |
| `paletteLabel` | 전구 색 | Bulb colors |
| `tileLabel` | {row}행 {col}열, {color} | Row {row}, column {col}, {color} |
| `off` | 끄기 | Off |
| `gold` | 금색 | Gold |
| `mint` | 민트색 | Mint |
| `red` | 빨간색 | Red |
| `tree` | 트리 | Tree |
| `clear` | 비우기 | Clear |
| `undo` | 되돌리기 | Undo |
| `preview` | 미리보기 | Preview |
| `greeting` | 메리 크리스마스! | Merry Christmas! |
| `previewBoardLabel` | 완성한 전구판. {lit}개 켜짐. | Finished light board. {lit} of 25 lit. |
| `edit` | 계속 꾸미기 | Keep decorating |
| `copy` | 카드 복사 | Copy card |
| `copied` | 카드를 복사했어요. | Card copied. |
| `manualTitle` | 직접 복사하기 | Copy manually |
| `manualHint` | 선택한 카드 문구를 기기의 복사 기능으로 복사하세요. | Use your device’s copy command on the selected card text. |
| `cardTextLabel` | 카드 문구 | Card text |
| `selectText` | 전체 선택 | Select text |
| `back` | 돌아가기 | Back |

`{row}` and `{col}` are one-based. `{color}` uses the matching localized brush name. `{lit}` is the count of nonzero cells. Hide decorative bulb artwork from assistive technology. In Preview, expose the board as a single labeled graphic. The Manual copy textarea exposes the full pattern as text.

## localStorage

- `christmas-light-board:board:v1` stores the board as a 25-character row-major string. Accept only `^[0-3]{25}$`. A missing or invalid value loads the starter tree.
- Wrap each read and write in `try/catch`. Save after each effective board edit and Undo. The selected brush, Undo history, current screen, and clipboard feedback live in memory for the current visit.

## Edge cases

- Applying the current tile color, clearing a blank board, or loading an identical tree leaves the Undo slot and saved draft as they were.
- Reloading after a successful Clear restores the blank board. If storage is blocked or full, editing, undoing, previewing, and copying still work for the current visit.
- Rapid pointer activations each apply at most one edit. Holding Enter or Space on a tile produces no repeated state changes once the brush color is applied. A resize or visibility change preserves all 25 cells.
- A denied clipboard request in the embedded iframe still leaves the complete card available in Manual copy. Choose the initial focus target on every screen transition so no focus is left on a removed button.
- `#demo` opens the editor with rows `00100`, `00200`, `02320`, `23232`, `00100` and Red selected. This thumbnail fixture reads and writes no draft storage, including during subsequent edits in demo mode.
- Before publishing, run `npm test`, `npm run build`, and `npm run qa -- --thumbs`. Verify that the generated thumbnail shows the decorated tree and that the three screens fit at 320×480 in both languages. Check keyboard editing, draft restoration, and the clipboard-denied path inside the iframe.

## Must not

- Build the runtime in a single `index.html` with inline CSS and JavaScript. Use the standard item metadata and generated thumbnail. No external assets, fonts, scripts, network requests, or analytics.
- No copied artwork, branded ornaments, real people, or imitation of an existing app’s visual design.
- No account, personal information fields, or automatic transmission of the board. Clipboard writes require a user action.
- No dialogs, new windows, navigation away, sound, or autoplay.