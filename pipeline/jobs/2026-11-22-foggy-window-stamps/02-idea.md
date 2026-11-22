# Idea and spec: 김 서린 창문 스탬프 / Foggy Window Stamps

## Concepts scored

Each criterion is scored from 1 to 5. Korean search and sharing scores are estimates based on the supplied research and backlog. The research’s tactile-content signal comes from the first half of 2026.

| Concept | Category | First 10 seconds | Originality | Korean search/share demand | One-file buildability | Total |
|---|---|---:|---:|---:|---:|---:|
| **김 서린 창문 스탬프 / Foggy Window Stamps** | `chill` | 5 | 4 | 4 | 5 | **18** |
| 선물 포장지 계산기 / Gift Wrap Size Calculator | `tools` | 4 | 3 | 4 | 5 | 16 |
| 김밥 말기 / Gimbap Roll-Up | `arcade` | 4 | 3 | 3 | 4 | 14 |

- **Foggy Window Stamps:** Tap a fogged pane to reveal the evening view through a heart, star, or crescent. Phrases like `김 서린 창문` and `겨울 창문 낙서` describe the experience, and the finished pane gives people an image to share.
- **Gift Wrap Size Calculator:** Enter a rectangular box’s dimensions and get a cut rectangle for a single wrapping method, with a labeled diagram. `선물 포장지 크기` gives it a clear seasonal query.
- **Gimbap Roll-Up:** Turn the backlog’s timing game into a short round where players drop ingredients onto moving rice and see their finished cross-section. The food is familiar and the cross-section gives the score screen a visual payoff.

**Pick: Foggy Window Stamps.** The pane is playable on arrival, and the first tap reveals both a shape and a piece of the scene. A small grid makes the same composition possible with touch, a mouse, or a keyboard.

## Meta

slug `foggy-window-stamps`

- `category` `chill`, `kind` `tool`, `aspect` `3/4`, `date` `2026-11-22`
- **Tags (ko)** `김 서린 창문`, `겨울 낙서`, `스탬프`
- **Tags (en)** `foggy window`, `winter doodle`, `stamps`
- **Title (ko)** 김 서린 창문 스탬프
- **Title (en)** Foggy Window Stamps
- **Desc (ko)** 김 서린 창문에 하트, 별, 달을 찍어 보세요. 김이 걷힌 자리마다 겨울밤 풍경이 비치고, 완성한 창문은 이미지로 저장할 수 있어요.
- **Desc (en)** Stamp hearts, stars, or moons onto fogged glass. Each mark reveals a piece of the winter evening. Save your finished window as an image.
- **Howto (ko)** 모양을 고르고 창을 누르세요. 키보드에서는 창으로 이동한 뒤 방향키로 칸을 고르고 Enter 또는 스페이스바로 찍을 수 있어요.
- **Howto (en)** Pick a shape and tap the pane. With a keyboard, Tab to the pane, choose a spot with the arrow keys, and press Enter or Space to stamp.
- **About (ko)** 창 너머에는 가상의 겨울 동네가 그려져 있어요. 만든 그림은 이미지로 저장할 수 있어요.
- **About (en)** The window looks out onto an imaginary neighborhood in winter. You can save your composition as an image.

## Pitch

A fogged window fills the center of the screen. Three shapes sit beneath the glass, with the heart already selected. One tap clears a heart-shaped patch of condensation, revealing whatever is behind that spot. A heart over a lit apartment window glows amber. The same heart higher up reveals the deep blue sky. Stamps stay visible while the user builds a composition or saves it as a postcard.

## Flow

1. **READY.** Show the title, one-line instruction, fogged pane, shape picker, and action row. Select the heart by default, or restore a valid stored shape. Initialize an empty pane. Undo, Clear, and Save start disabled.
2. **EDITING.** Stamp directly into any cell. A different shape replaces the mark in that cell. Undo reverses the last edit, and Clear empties the pane in one undoable edit. Enable Save and Clear whenever the pane has at least one mark. Enable Undo whenever history contains a snapshot, including after Clear.
3. **SAVING.** Snapshot the pane on activation and render a PNG locally. Change the Save label to “Saving…” and disable it while the export is pending. Users can keep editing. When the download is triggered, restore the button and show the success message. If export or download initiation fails, restore the button and show the screenshot fallback. Both messages appear on the editing screen.

## Controls

- **Pointer:** Tap or click a shape, then a cell. Activate once on release inside the original cell. Cancel on `pointercancel` or release outside it. Dragging does not paint a trail.
- **Keyboard:** Tab through the pane, picker, and actions in visual order. The pane is a single Tab stop with roving cell focus. Start at row 2, column 3. Arrow keys move one cell and stop at the edges. Enter or Space activates the focused cell. Shape and action buttons use standard keyboard activation. Ignore held-key repeats for stamping and preserve Tab navigation.
- **Touch and focus:** Give every interactive target at least 44 × 44 CSS px. Apply `touch-action: none` to the pane. Use a visible keyboard focus outline and a border plus `aria-pressed` for the selected shape. Prevent default scrolling on the arrow and Space keys handled by the pane.
- **Announcements:** Label the grid, its cells, and the shape picker with the strings below. Announce each successful edit and export outcome in a polite status region. Keep the pane artwork decorative for assistive technology.

## Pane and edit rules

- Use a fixed 5-column × 4-row grid. Store 20 values in row-major order, each `null`, `heart`, `star`, or `moon`. Use 1-based indices in accessible labels.
- Center each stamp in its cell and fit its contour within 76% of the cell’s width and height. Shapes clear the fog layer and reveal a single continuous scene underneath. Stamp placement and appearance are deterministic.
- Before a stamp replacement, new stamp, or Clear, push a snapshot of the previous 20 cells. Keep the latest 20 snapshots. Undo pops and restores one snapshot. Reapplying the current shape is a no-op and consumes no history.
- Clear and Undo preserve the selected shape. Shape changes do not enter history.

## Visual design

- **Palette:** Use a dark navy frame (`#182538`), pale blue-gray condensation (`#C4D2DA`), a cool dusk sky (`#2F4868`), and amber-lit windows (`#FFCC82`). Put the navy and amber areas under enough cells that stamping in different spots visibly changes the result.
- **Artwork:** Draw an original apartment courtyard as simple geometric silhouettes, with two rooflines, a few lit windows, and snow collected on the ledges. Use inline SVG for the scene and stamp paths. Add subtle static droplets to the fog.
- **Layout:** Use a centered panel up to 480 px wide, with 12 px side padding at minimum size. At 320 × 480, use a 280 × 224 px pane, two 44 px control rows, and a reserved two-line status area. On shorter or wider layouts, size from both viewport dimensions while preserving 44 px cell targets. Use `100dvh` with a `100vh` fallback. The page stays within the iframe without scrolling.
- **Feedback:** A new stamp briefly expands into place over 160 ms. Clear and Undo update immediately. Respect `prefers-reduced-motion` by rendering all changes immediately. Keep the pane still between edits. Use system-ui text and no audio.

## Export

- Render the same scene, fog cutouts, and frame from the click-time snapshot onto a 900 × 720 px offscreen canvas. Share the paths and coordinates with the on-screen render so the image matches the composition. Omit interface controls and focus outlines from the image.
- Generate the PNG using `canvas.toBlob`, then trigger a local blob download named `foggy-window-stamps.png`. Clean up the temporary link and object URL after the browser has had time to start the download.
- Use the success string to report initiation of the download. For a null blob, render error, or detectable download block, show the failure string. The pane remains available for a screenshot.

## Strings

Use a `{ ko: {...}, en: {...} }` dictionary for all UI and accessible strings, including the document title. Select `ko` or `en` from `?lang=` when valid. Otherwise, use Korean for a Korean `navigator.language` and English for other values. Set `<html lang>` accordingly. Resolve `{shape}` using the localized shape name.

| Key | ko | en |
|---|---|---|
| `title` | 김 서린 창문 스탬프 | Foggy Window Stamps |
| `instruction` | 모양을 고르고 창을 눌러 보세요. | Pick a shape and tap the glass. |
| `paneLabel` | 김 서린 창문 | Fogged window |
| `pickerLabel` | 스탬프 모양 | Stamp shape |
| `heart` | 하트 | Heart |
| `star` | 별 | Star |
| `moon` | 달 | Moon |
| `emptyCell` | {row}행 {col}열, 빈칸 | Row {row}, column {col}, empty |
| `filledCell` | {row}행 {col}열, {shape} | Row {row}, column {col}, {shape} |
| `undo` | 되돌리기 | Undo |
| `clear` | 창 비우기 | Clear |
| `save` | 이미지 저장 | Save image |
| `saving` | 저장 중… | Saving… |
| `stamped` | {row}행 {col}열에 {shape} 모양을 찍었어요. | Placed {shape} at row {row}, column {col}. |
| `undone` | 마지막 편집을 되돌렸어요. | Undid the last edit. |
| `cleared` | 창을 비웠어요. | Cleared the window. |
| `downloadStarted` | 이미지 다운로드를 시작했어요. | Image download started. |
| `saveFailed` | 저장할 수 없어요. 화면을 캡처해 주세요. | Couldn’t save the image. Please take a screenshot. |

## localStorage

- `foggy-window-stamps:shape` stores `heart`, `star`, or `moon`. Wrap reads and writes in `try/catch` and use `heart` for a missing or invalid value. If storage is unavailable, keep the selected shape in memory for the session.
- Keep the pane, undo history, and export snapshots in memory. Reloading opens a blank pane.

## Edge cases

- Resizing preserves the pane, undo history, and focused cell. Compute positions from the current layout so cell hit targets track the artwork.
- If activating a control disables the focused button, move focus to the remembered grid cell. On export completion, preserve the user’s current focus.
- Disabled actions are guarded in their handlers. Repeating Save while an export is pending cannot start a second download.
- If the document becomes hidden, finish or skip any stamp animation and show the final state on return. The composition and history stay intact.
- On `#demo`, preload a fixed four-stamp composition for QA screenshots: heart at row 2 column 2, star at row 1 column 4, moon at row 1 column 2, and heart at row 3 column 4. Start with empty history and avoid storage writes while in demo mode.
- Check both languages at 320 × 480 and on desktop. Exercise pointer stamping, keyboard stamping, replacement, Clear followed by Undo, blocked storage, and export failure. Run `npm test`, `npm run build`, and `npm run qa -- --thumbs` before publishing.

## Must not

- Keep the item’s HTML, CSS, JS, fonts, and artwork self-contained. No network calls, remote assets, analytics, or libraries.
- No real brands, people, addresses, or use of the visitor’s location. The scene uses fictional artwork and fixed lighting.
- No timer, scoring, audio, or automatic fading of placed stamps.
- No dialogs, pop-ups, or page navigation. Handle Clear through Undo and export through the local download.