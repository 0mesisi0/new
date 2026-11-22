# Idea and spec: 겨울 창문 낙서 / Winter Window Doodles

## Concepts scored

Each criterion is scored from 1 to 5. Korean search and share scores are planning estimates based on the supplied research and the proposed sharing format. The research offers an older tactile-content signal and seasonal hooks, with limited evidence of current demand.

| Concept | Category | First 10 seconds | Originality | Korean search/share | One-file buildability | Total | Verdict |
|---|---|---:|---:|---:|---:|---:|---|
| **겨울 창문 낙서 / Winter Window Doodles**. Draw through fogged glass to uncover a snowy alley. | `chill` | 5 | 4 | 4 | 5 | **18** | **Picked.** The first stroke reveals the scene, and the drawing becomes a winter postcard. |
| 김장 통 퍼즐 / Kimchi Box Puzzle. Rotate illustrated cabbage pieces to fill a container with no gaps. | `puzzle` | 4 | 4 | 3 | 4 | 15 | A recognizable seasonal theme with a compact puzzle loop. Each board needs a verified solution. |
| 집콕 모임 카드 / Stay-In Party Cards. Draw a five-minute home gathering activity from a bilingual deck. | `random` | 4 | 3 | 3 | 5 | 15 | A quick result friends can share in a group chat. Replay value depends on the variety of the deck. |

## Meta

slug `winter-window-doodles`

| Field | Value |
|---|---|
| Category | `chill` |
| Kind | `tool` |
| Aspect | `3/4` |
| Date | `2026-11-22` |
| Tags, Korean | `겨울 감성`, `창문 낙서`, `첫눈` |
| Tags, English | `winter`, `window doodles`, `snow` |

| Field | Korean | English |
|---|---|---|
| `title` | 겨울 창문 낙서 | Winter Window Doodles |
| `desc` | 김 서린 창문에 손가락으로 낙서하면 눈 내리는 골목이 보여요. 글씨나 그림을 남기고 나만의 겨울 엽서로 저장하세요. | Draw on a fogged-up window to reveal a snowy alley. Leave a little note or drawing and save your window as a winter postcard. |
| `howto` | 손가락이나 마우스로 창문을 문질러 보세요. 키보드는 방향키로 움직이고 스페이스바로 닦아요. 완성한 그림은 엽서로 저장할 수 있어요. | Drag across the glass. With a keyboard, move with the arrow keys and wipe with Space. Save your finished window as a postcard. |
| `about` | 눈 내리는 골목을 담은 조용한 겨울 장난감이에요. 그림은 이 페이지를 열어 둔 동안 남아 있어요. | A quiet winter toy set above a snowy alley. Your drawing stays in the window while the page is open. |

## Pitch

A fogged apartment window fills the screen. Drag a fingertip across it and the cleared line reveals amber windows, tiled roofs and snow in a fictional Korean alley. A pinpoint of lamplight makes the effect legible even on a short first stroke. Draw a heart, trace a word or wipe the whole pane clear. The current view can become a PNG postcard.

## Flow

1. **READY.** Open directly on the misted pane with a one-line hint over the lower edge. The first tap or drag clears the glass immediately. The frame and controls stay in place throughout.
2. **DRAWING.** The hint leaves after the first visible mark. Switch brushes or add strokes. Undo reverses one completed stroke. Clearing the pane entirely leaves the same controls available.
3. **SAVE.** Tap **엽서 저장 / Save postcard** to generate a PNG of the pane and its frame. Success or failure appears in a reserved status line. Drawing can continue while the PNG is being prepared.
4. **RESET.** Tap **김 다시 서리기 / Fog the glass** to restore the mist in place. Undo can recover the drawing from before the reset. The card layout and brush selection stay in place.

## Controls

| Input | Behavior |
|---|---|
| Touch, mouse or pen | Press on the pane to make a mark. Drag to extend it. Track one active pointer with pointer capture. The brush uses a fixed radius regardless of pressure. |
| Keyboard in the pane | Arrow keys move the brush cursor 12 logical pixels. Space stamps once. Shift + Arrow draws between the old and new positions. A continuous drawing-key sequence counts as one stroke until all drawing keys are released or focus leaves the pane. |
| Keyboard outside the pane | Tab moves through native controls. Enter or Space activates the focused control. The brush options behave as a native radio group. |
| Brush selector | **가는 붓 / Fine brush** uses an 8 px logical radius. **굵은 붓 / Broad brush** uses 22 px. A circle beside each label shows the relative brush size. |
| Undo | Revert the most recent completed stroke or reset. Disable the control when history is empty. |
| Fog the glass | Restore the initial mist. Disable the control while the pane is already in its initial state. |
| Save postcard | Start one export. Disable the button during export and re-enable it after either result. |

Give all controls and the focusable drawing surface visible focus indicators. Keep tap targets at least 44 × 44 CSS px. Set `touch-action: none` on the pane and prevent default for drawing keys only while the pane has focus. Keep ordinary Tab navigation available.

## Screens and states

| State | Screen contents and feedback |
|---|---|
| Ready | Title, misted pane with the first-stroke hint, brush selector, disabled Undo and Fog controls, and enabled Save. Show the status line as empty. |
| Drawing | Same layout with the uncovered alley visible along the stroke. Hide the hint and enable Undo and Fog after the stroke commits. The keyboard brush cursor appears only when the pane has keyboard focus. |
| Fully clear | Same drawing screen with the entire alley visible. Additional strokes that clear no new area create no undo entry. Fog and Save remain available. |
| Saving | Keep the pane and controls on screen. Change Save to **저장 중… / Saving…** and capture the image from the moment Save was pressed. |
| Save complete or failed | Restore the Save label. Announce the outcome in the existing status line, then clear it after four seconds. The user can keep drawing throughout. |
| Mist restored | Return to the ready appearance and show the hint again. Undo remains enabled when the reset is in history. Announce the reset through the status line. |

## Drawing and undo

- Render a fixed 480 × 400 logical pane. Paint the original alley on one canvas and the opaque mist on another. Build the scene from original shapes using canvas. The mist includes a soft lamp glow baked into its paint so the first stroke has a clear target.
- Erase the mist with circular stamps using `destination-out`. Interpolate between pointer samples with a maximum spacing of half the selected brush radius. Clip the brush to the pane. Keep the selected brush radius fixed for the duration of a stroke.
- Record history by completed action, with at most 20 undo entries. Use a raster snapshot of the mist as the baseline and replay stored strokes or resets over it. When the cap is exceeded, fold the oldest action into the baseline. Store snapshot and drawing coordinates in logical pixels so resizing preserves the image and undo state.
- Commit a stroke only when it changes the mist. After a reset, one Undo restores the previous pane. After undoing the last stroke on a fresh pane, restore the first-stroke hint.

## Visual design

- Use navy `#182534` for the page, muted wood `#483932` for the window frame, pale blue-gray `#C5D4DB` for mist, and amber `#F5BE75` for the lamps. Use `system-ui` and high-contrast control labels.
- Compose the alley with a lamp near the pane’s center, roof silhouettes at the sides and a low wall at the bottom. Render the frame as one uninterrupted pane so users can write across it.
- Keep the title above the window, then the two brush controls, then a row for Undo, Fog and Save. Reserve a short line for feedback. At 320 × 480, use 12 px side padding, allow action labels to wrap, and fit the pane to the available width and height. Center the layout on wider screens and cap its width at 560 px. Fill the iframe without page scrolling.
- Animate a few snowflakes only behind cleared areas. Use `requestAnimationFrame` with elapsed time capped at 50 ms and cap visible canvas backing resolution at `devicePixelRatio` 2. Pause rendering while the document is hidden. With reduced motion, use a static snow layer and apply clearing and resetting immediately.
- The item is silent.

## Export

- Compose a 1,080 × 1,080 offscreen canvas with a dark matte, the framed pane, and the localized app title underneath. Preserve the pane’s aspect ratio. Use fixed snow positions for the exported scene and draw the current mist mask over it. Exclude controls, hints, focus indicators and the brush cursor.
- Encode with `toBlob` and request a download as `winter-window-doodles.png` using a temporary same-page download link. Revoke the object URL after the browser has had time to start the download. Use the success copy when the request is handed to the browser. Use the failure copy if encoding fails or initiating the download throws.

## Strings

Use a `{ ko, en }` dictionary for all item copy. Select `ko` or `en` from `?lang=`, fall back to the primary subtag of `navigator.language`, then to English for unsupported languages. Match `<html lang>` and the document title to the selection. The site metadata copy is specified in **Meta**.

| Key | Korean | English |
|---|---|---|
| `appTitle` | 겨울 창문 낙서 | Winter Window Doodles |
| `firstHint` | 창문을 문질러 보세요. | Wipe the glass. |
| `paneLabel` | 김 서린 창문 | Fogged window |
| `paneKeys` | 방향키로 움직이고 스페이스바로 닦으세요. Shift와 방향키를 함께 누르면 선을 그릴 수 있어요. | Move with the arrow keys and wipe with Space. Hold Shift with an arrow key to draw a line. |
| `brushLabel` | 붓 굵기 | Brush size |
| `fine` | 가는 붓 | Fine brush |
| `broad` | 굵은 붓 | Broad brush |
| `undo` | 되돌리기 | Undo |
| `fog` | 김 다시 서리기 | Fog the glass |
| `save` | 엽서 저장 | Save postcard |
| `saving` | 저장 중… | Saving… |
| `saveStarted` | 엽서 다운로드를 시작했어요. | Postcard download started. |
| `saveFailed` | 저장할 수 없어요. 화면을 캡처해 주세요. | Couldn’t save the postcard. Take a screenshot instead. |
| `undone` | 마지막 작업을 되돌렸어요. | Last change undone. |
| `fogRestored` | 창문에 다시 김이 서렸어요. | The window is fogged again. |

Use `paneKeys` as the pane’s accessible description and a polite live region for status messages. Snow, trim and brush-size icons are decorative.

## localStorage

- `winter-window-doodles:brush:v1` stores `"fine"` or `"broad"` after a brush change. Default to `"fine"` when absent or invalid. Wrap reads and writes in `try/catch`.
- Keep drawing, undo history and export status in memory. Reload starts with a fogged pane.

## Edge cases

- A tap, a stationary press and a Space press each produce one round mark. A second touch leaves the active stroke alone. On `pointercancel` or lost capture, commit the visible part of the stroke once and release the active pointer.
- Before applying Undo, Fog or Save, commit any active stroke. When focus is lost or the tab becomes hidden, commit the visible stroke and clear held drawing keys. Resume with a fresh animation timestamp.
- On resize or orientation change, commit any active stroke, recompute the pane bounds and redraw from the same logical mask. Keep the keyboard cursor inside the pane.
- Saving an untouched pane is valid. Drawing, undoing or resetting during export affects the next postcard. The in-progress export uses its frozen snapshot.
- If storage is blocked, brush changes work for the session. If a download cannot be initiated, the pane stays available for a screenshot.
- For visual QA, `#demo` opens a fixed heart scratched into the mist around the central lamp. It reads the selected language normally and leaves storage untouched on load. Verify the ordinary first-stroke flow separately, then run `npm test`, `npm run build` and `npm run qa -- --thumbs` before publishing.

## Must not

- No network requests, remote assets, third-party scripts, analytics, external fonts or live weather data. Ship the item UI as one `index.html` alongside its metadata and generated thumbnail.
- No borrowed artwork, trademarks, real people or identifiable addresses. The alley is fictional.
- No time limit, score, countdown or automatic re-fogging while the user draws.
- No camera, microphone, account, upload or persistent drawing storage.
- No dialogs, popup windows, navigation away from the item or autoplay audio.