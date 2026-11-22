# Idea and spec: 겨울 창문 김서림 그림판 / Winter Fog Window

## Concepts scored

Each criterion is scored from 1 to 5, for a maximum of 20. Korean search and share scores are editorial estimates based on the supplied research and each concept’s potential use. The research provides limited recent evidence, and the brief records no votes.

| Concept | Category | Value in first 10 seconds | Originality | Korean search/share demand | One-HTML buildability | Total |
|---|---|---:|---:|---:|---:|---:|
| **겨울 창문 김서림 그림판 / Winter Fog Window**. Wipe a fogged pane to draw with the lights outside. | **chill** | 5 | 4 | 4 | 5 | **18** |
| 선물 포장지 계산기 / Gift Wrap Calculator. Enter three box dimensions and see a cut rectangle with fold allowances. | tools | 4 | 3 | 4 | 5 | 16 |
| 할 일 눈덩이 / Snowball To-Do. Roll a snowball across a tiny desk and pick up silly fictional chores as it grows. | silly | 4 | 4 | 3 | 4 | 15 |

**Pick Winter Fog Window.** The first swipe gives an immediate payoff, and the drawing makes a recognizable image to share in a chat. The concept uses the research’s tactile-play and winter hooks. The marks form a drawing that the user can keep.

## Meta

slug `winter-fog-window`

- Category `chill`, kind `tool`, aspect `3/4`, date `2026-11-22`.
- Tags — ko `김서림`, `그림판`, `겨울`, `힐링` · en `fogged window`, `drawing`, `winter`, `relaxing`.
- Title ko — 겨울 창문 김서림 그림판
- Title en — Winter Fog Window
- Desc ko — 김이 서린 겨울 창문에 손가락으로 그림을 그려 보세요. 닦아 낸 자리로 골목의 불빛이 비치고, 완성한 그림은 이미지로 저장할 수 있어요.
- Desc en — Draw on a fogged winter window and let the lights outside shine through your marks. Save your finished glass drawing as a PNG.
- Howto ko — 손가락이나 마우스로 창을 닦으세요. 키보드는 방향키로 움직이고 스페이스바로 닦아요. Shift를 누른 채 방향키를 누르면 선이 이어져요.
- Howto en — Drag across the glass, or move with the arrow keys and press Space to wipe. Hold Shift with the arrow keys to draw a line.
- About ko — 겨울 창문에 손가락으로 그림을 그리던 순간을 옮겼어요. 그림은 이 탭에 머물고, PNG로 저장하면 따로 간직할 수 있어요.
- About en — Inspired by drawing on fogged glass in winter. Your drawing stays in this tab, and you can keep a copy by saving a PNG.

## Pitch

A fogged window fills the center of the screen. Warm pinpoints behind the glass suggest a winter street. One swipe clears a strip and brings the scene into focus inside the mark. Draw a heart, write a greeting, or clear just enough glass to see what’s outside.

Choose a snowy alley, a bus stop, or a moonlit rooftop. Changing the view keeps the drawing in place so the same marks can catch different colors. Save the pane as a PNG or fog it up and start fresh.

## Flow

1. **READY** opens directly on the drawing surface with the localized title, one-line instruction, three scene choices, and the action row. Load the last valid scene or default to the snowy alley. The glass is fully fogged. Undo, Fog again, and Save PNG begin disabled.
2. **DRAWING** starts on the first pointer press or keyboard wipe. The cleared area shows immediately. The selected scene can change at any time outside an active pointer stroke. Each drawing action becomes eligible for undo as soon as it ends. The pane has no timer.
3. **FOG AGAIN** restores the full fog mask in place. The cleared drawing remains available through Undo until the next successful drawing action. Save PNG is disabled while the pane is fully fogged.
4. **SAVE** keeps the current pane visible. While the PNG is being prepared, disable Save PNG and show the preparation message in a status line. After triggering the download or detecting an error, show the appropriate status and restore the button if the pane still contains marks. Keep status messages in the same reserved space so the layout stays stable.

## Controls

- **Touch and mouse:** Press to wipe a spot. Drag to make a continuous mark. Track one primary pointer with pointer capture and apply `touch-action: none` to the drawing surface. The three scene buttons and action row use native buttons.
- **Keyboard:** Tab into the pane to show a cursor at the center on first focus. Arrow keys move it one cell and Space wipes at the cursor. Shift+Arrow wipes from the previous cell to the next. Arrow movement and Shift+Arrow may repeat. Space acts once per press. Leave Tab and Shift+Tab available for normal focus traversal.
- **Buttons:** Tab through the scene and action buttons, then use Enter or Space to activate. Expose the selected scene with `aria-pressed` and the same visible selected state in both languages. Keep the focus outline visible.
- **Input scope:** Prevent default scrolling only for drawing keys handled while the pane has focus. Use localized accessible names and a polite status region. Report the cursor position after a short pause in keyboard movement. Give pointer users the same action feedback without announcing pointer coordinates.

## Drawing and scene behavior

- The pane uses a `48 × 32` logical cell grid with a `3:2` aspect. A cell is either fogged or clear. A wipe clears the cells in a `3 × 3` brush footprint centered on the cursor, excluding its four corners. Clip the footprint at the pane boundary.
- For a drag or Shift+Arrow, rasterize the segment between the preceding and current cell and stamp the brush at every cell along it. Pressing without moving still stamps once. Pointer release, cancellation, or lost capture ends the stroke and commits any marks already made.
- Store the previous mask before each action that changes it. A pointer gesture is one action. Each keyboard wipe and Fog again are also actions. Undo restores the previous mask once and consumes that snapshot. Drawing across already clear cells preserves the existing undo snapshot. Scene changes preserve both masks.
- Draw each view from fixed geometry. Composite a translucent fog layer over the view, then remove it over the wiped cells. Slightly blur the mask edge so adjacent cells read as one stroke. The clear view remains stationary under the marks.
- Keep the scene and mask in memory and redraw from that state on resize. Update the canvas only when input, layout, or scene changes. Coalesce visual updates with `requestAnimationFrame` and cap live canvas DPR at 2.

## Window layout

| Scene | ko | en | Drawing notes |
|---|---|---|---|
| `alley` | 눈 내린 골목 | Snowy alley | Blue dusk, stepped rooftops, and three amber windows across the center. |
| `bus` | 버스 정류장 | Bus stop | A teal shelter roof, a warm lamp, and a line of reflected light in the road. |
| `roof` | 달빛 옥상 | Moonlit roof | An indigo skyline, a pale moon, and coral lights across the low rooftops. |

- Keep the top of the scene darker and distribute brighter features across the middle so a first mark near the center reveals a clear change.
- Compose the item as title and instruction, scene buttons, window, action buttons, and a status line. Use a midnight background `#152133`, pale text `#F6F4EB`, blue-gray fog `#A9BFCC`, and an amber focus outline `#FFD08A`. Use system-ui type and indicate the selected scene with both an outline and a filled surface.
- At `320 × 480`, use 12 px side padding, retain 44 px minimum button targets, and fit the whole item without page scrolling. On wide screens, center the play area and cap the pane at 600 CSS px wide. Preserve the `3:2` pane ratio and fit to the available height.
- The drawing appears as soon as the input lands. Use static scenery and fog with no idle animation, sound, or transition delay. The item has a single screen.

## Export

- Render a `900 × 600` PNG from a snapshot of the pane’s scene and mask captured when Save PNG was activated. Include the glass and scene, with the fog marks as shown. Omit the cursor, surrounding controls, and status line.
- Use canvas `toBlob('image/png')` and a same-document download link with the filename `winter-fog-window.png`. Revoke the object URL after the download has been initiated. Give the user the screenshot fallback if image creation or download initiation fails. The interface can report initiation, since the browser controls the completed download.
- Keep scene choices and drawing controls usable while the snapshot encodes. A later edit affects the next export.

## Strings

Use a single `{ ko, en }` dictionary for the metadata copy, scene labels, and strings below. Set the document title from `appTitle`. Honor `?lang=ko` or `?lang=en`, then use the primary subtag of `navigator.language`, with English as the fallback. Set `<html lang>` accordingly.

| Key | ko | en |
|---|---|---|
| `appTitle` | 겨울 창문 김서림 그림판 | Winter Fog Window |
| `startSub` | 창문을 쓱 닦아서 그림을 그려 보세요. | Wipe the fogged glass to draw. |
| `sceneLabel` | 창밖 풍경 | View outside |
| `sceneAlley` | 눈 내린 골목 | Snowy alley |
| `sceneBus` | 버스 정류장 | Bus stop |
| `sceneRoof` | 달빛 옥상 | Moonlit roof |
| `paneLabel` | 김이 서린 창문 | Fogged window |
| `paneHelp` | 방향키로 이동하고 스페이스바로 닦아요. Shift를 누른 채 방향키를 누르면 선을 그려요. | Move with the arrow keys and wipe with Space. Hold Shift with the arrow keys to draw a line. |
| `cursorPosition` | {row}행 {column}열 | Row {row}, column {column} |
| `actionsLabel` | 그림 도구 | Drawing actions |
| `undo` | 되돌리기 | Undo |
| `fogAgain` | 다시 김 서리기 | Fog again |
| `save` | PNG 저장 | Save PNG |
| `undone` | 마지막 동작을 되돌렸어요. | Last action undone. |
| `fogged` | 창문에 다시 김이 서렸어요. | The window is fogged again. |
| `saving` | 이미지 준비 중… | Preparing image… |
| `saveStarted` | 이미지 다운로드를 시작했어요. | Image download started. |
| `saveFailed` | 저장을 시작하지 못했어요. 창문을 화면 캡처로 남겨 보세요. | Couldn’t start the download. Take a screenshot to keep your drawing. |

Coordinates are one-based. Use the same button text for visible and accessible names. Decorative frame and scenery carry no separate labels.

## localStorage

- `winter-fog-window:scene` stores `alley`, `bus`, or `roof` on scene selection. Wrap reads and writes in `try/catch`. Use `alley` for missing or invalid values.
- Drawing state, undo state, and exports stay out of storage. Each reload starts with fresh fog.

## Edge cases

- Finish an active pointer stroke if the document becomes hidden or the pane resizes. Retain the mask and any committed undo snapshot. Resume with a fresh gesture when visible.
- Ignore secondary touches, non-primary mouse buttons, and press events outside the pane. While the captured pointer is outside the pane, stop stamping. Start a fresh segment if it returns so re-entry leaves no connecting line from the exit point.
- Keep Undo available after Fog again. If Undo restores a fully fogged pane, disable Save PNG and Fog again until the next wipe.
- When storage is unavailable, scene changes still work for the current session. When downloads are blocked silently by the embedding browser, the pane remains available for a screenshot.
- For `#demo`, open on the snowy alley with a fixed heart and two dots in the mask. Start with an empty undo history and leave the saved scene preference untouched on load.
- Before publishing, run `npm test`, `npm run build`, and `npm run qa -- --thumbs`. Check both languages at `320 × 480`, pointer and keyboard drawing, undo after refogging, and PNG export from the embedded item.

## Must not

- No network requests, external scripts or fonts, analytics, or external media. Put the HTML, CSS, JavaScript, and original canvas art in `items/winter-fog-window/index.html`, with site metadata in `meta.json` and the thumbnail generated by QA.
- No real brands, people, landmark likenesses, or borrowed game or site artwork.
- No timer, score, forced reveal, ads, sign-in, or text entry.
- No automatic sound, pop-up windows, browser dialogs, or navigation away from the item.