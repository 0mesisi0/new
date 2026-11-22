# Idea and spec: 겨울 창문 입김 낙서 / Foggy Window Doodles

## Concepts scored

Scores run from 1 to 5 for each criterion. Korean search and share scores are estimates based on the supplied research and backlog. The research had limited recent evidence, and the brief recorded no votes.

| Concept | Category | First 10 seconds | Originality | Korean search/share demand | One-file buildability | Total |
|---|---|---:|---:|---:|---:|---:|
| **겨울 창문 입김 낙서 / Foggy Window Doodles** — wipe condensation from a bus window to draw in the glass, then save the drawing as a postcard. | `chill` | 5 | 4 | 4 | 5 | **18** |
| 정전기 털기 / Static Shake-Off — brush paper scraps off a winter sweater in the direction of the knit before they stick again. | `silly` | 5 | 4 | 3 | 4 | 16 |
| N빵 계산기 / Group Bill Split — split the shared bill across the group, divide optional extras among the people who ordered them, and copy what each person owes. | `tools` | 4 | 2 | 5 | 5 | 16 |

**Pick Foggy Window Doodles.** The first swipe reveals the street behind the glass. The same gesture makes a personal postcard, giving people a reason to share it under phrases like `입김 낙서` and `겨울 감성`. The supplied research’s tactile-play signal informed the interaction, and the backlog’s ambient ideas informed the unhurried pace. The window, street scene, and export can all be drawn locally.

## Meta

slug `foggy-window-doodles`

- Category `chill`, kind `tool`, aspect `3/4`, date `2026-11-22`
- Tags ko `입김 낙서`, `겨울 감성`, `창문 낙서`
- Tags en `foggy window`, `winter doodles`, `postcard`

| Field | ko | en |
|---|---|---|
| `title` | 겨울 창문 입김 낙서 | Foggy Window Doodles |
| `desc` | 겨울 버스 창문에 서린 김을 손끝으로 닦아 낙서해 보세요. 유리 너머로 드러난 밤거리와 내 그림을 엽서 한 장에 담을 수 있어요. | Wipe the fog from a winter bus window to draw in the glass. Save your doodle and the street behind it as a postcard. |
| `howto` | 손가락이나 마우스로 유리를 문지르세요. 키보드로는 화살표로 움직이고 스페이스바로 닦을 수 있어요. 다 그리면 엽서로 저장하세요. | Drag across the glass to draw. With a keyboard, move with the arrow keys and press Space to wipe. Save the finished drawing as a postcard. |
| `about` | 겨울밤 버스 창문에 손가락으로 낙서하던 순간을 옮겼어요. 마지막 그림은 이 브라우저에 저장돼요. | Inspired by drawing on bus windows on winter nights. Your latest doodle is saved in this browser. |

## Pitch

A fogged bus window fills the screen. Through the haze, the player can just make out a corner shop and a warm streetlamp. A swipe wipes away the condensation, and the street shows through the line. A single tap leaves a fingertip print. The player can draw a heart, write a short message, or wipe a broad patch clear. Opening the postcard preview frames the exact drawing for a screenshot or PNG download.

## Flow

1. **DRAW** opens immediately on a fogged window or restores the last drawing. One tap or swipe shows the effect.
2. **DRAW** keeps four actions within reach. Undo reverses the latest gesture or clear. Clear fogs the whole pane again. Preview opens the postcard. The short drawing hint sits beside the title.
3. **POSTCARD** shows the current window in a cream frame. Save PNG requests a local download. Edit drawing returns to the same sketch with its undo history.

## Controls

| Input | Behavior |
|---|---|
| Touch, pen, or mouse | Press in the pane to wipe one spot. Drag to wipe along the path without gaps. Capture the first active pointer and ignore additional pointers until it ends. Ignore mouse buttons other than primary. |
| Tab and Shift+Tab | Move between the drawing surface and enabled buttons in visual order. Keep visible focus on each control. |
| Arrow keys on the pane | Move one cell in a 24-column by 16-row grid. Start at column 12, row 8. Stop at the boundary. |
| Space on the pane | Wipe at the current cell. Hold Space while moving with the arrows to draw a line. Treat each hold as one undoable gesture. |
| Enter or Space on a button | Activate the focused button using native button behavior. |
| Escape in POSTCARD | Return to DRAW and restore focus to Preview postcard. |

Use Pointer Events and `touch-action: none` on the drawing surface. Suppress the arrow and Space defaults only while that surface has focus. Give buttons at least 44 × 44 CSS pixels and leave Tab navigation available from every control.

## Screens

### DRAW

Put the title and instruction above a landscape window with a rounded dark-blue frame. The bottom toolbar has Undo, Fog again, and Preview postcard in that order. The three buttons fit across at 320 px with wrapping labels. Use the same pane size for pointer and keyboard input. Show the keyboard cursor as a visible ring only when navigating with keys.

The blank pane shows a pale condensation layer with a faint outline of the street behind it. Drawing reveals full color and adds a short highlight around freshly wiped glass. Highlights fade in 160 ms. The actual clear marks stay in place. Undo starts disabled, and Fog again and Preview postcard stay disabled until at least one cell is clear.

### POSTCARD

Show the full window in a cream border with the localized app title beneath it. The card itself contains the drawing and title only. Put Save PNG and Edit drawing below the card, with a reserved line for download feedback. Move focus to the preview heading on entry. On phones use a vertical layout, and on short, wide embeds put the buttons beside the preview so the card stays fully visible.

## Drawing and postcard layout

- Store the drawing as 384 binary cells in row-major order on a 24 × 16 grid. Map pointer coordinates to the pane before snapping to the nearest cell. Sample between pointer positions at intervals no wider than half a cell. Each sampled cell clears itself and its four orthogonal neighbors within bounds. Keyboard input uses the same footprint.
- Draw the scene and condensation on separate canvas layers. Use overlapping, soft-edged circles centered on cleared cells to remove the condensation. Keep the underlying street fixed as the pane scales so resizing preserves the composition.
- Record pre-change masks for the last 20 gestures or clears in memory. A tap or pointer stroke gets one entry, and each Space press or hold gets one entry. Skip actions that leave the mask unchanged. Undo pops one entry. Fog again is undoable in one step and needs no dialog.
- The PNG is 1080 × 900 px. Place a 984 × 656 px pane at `(48, 48)`, with the localized title centered beneath it. Use the same rendering inputs for preview and export. Export only the card, with no controls, focus ring, pointer highlight, or status message.
- Request a PNG download through a temporary object URL and download link after the button gesture. Use `foggy-window-doodles.png` in both languages. If export fails, keep the preview visible with screenshot instructions. The success message confirms the download request.

## Visual design

Use ink blue `#19283A` for the window frame, blue-gray `#B9C9D3` for condensation, amber `#FFC879` for streetlights, and cream `#F7EFDF` for the postcard. Draw an original street scene with a curb, shop awning, and streetlamp using canvas shapes. Keep the street free of signs and decorative lettering. Use system fonts with Korean fallback, high-contrast text, and visible keyboard focus. The experience is silent.

Fit the iframe from 320 × 480 through fullscreen with no page scroll. Resize canvases from their displayed dimensions and cap display pixel ratio at 2. Queue redraws with `requestAnimationFrame` only as needed. Stop transient effects while the document is hidden and skip them with reduced motion enabled.

## Strings

Read `?lang=ko` or `?lang=en`. For missing or unsupported values, use Korean when `navigator.language` starts with `ko` and English otherwise. Set `<html lang>` accordingly. Put all visible text, document titles, accessible labels, and live status messages in the same bilingual dictionary. The postcard title reuses `appTitle`.

| Key | ko | en |
|---|---|---|
| `appTitle` | 겨울 창문 입김 낙서 | Foggy Window Doodles |
| `drawHint` | 유리의 김을 닦아 그림을 그려 보세요. | Wipe the fog from the glass to draw. |
| `paneLabel` | 김 서린 버스 창문 | Fogged bus window |
| `keyboardHint` | 화살표로 움직이고 스페이스바로 닦으세요. | Move with the arrow keys and press Space to wipe. |
| `undo` | 되돌리기 | Undo |
| `fogAgain` | 다시 김 서리게 | Fog again |
| `preview` | 엽서 미리보기 | Preview postcard |
| `previewHeading` | 내 겨울 엽서 | My winter postcard |
| `previewImage` | 창문 낙서와 겨울 밤거리를 담은 엽서 | Postcard with your window doodle and a winter street |
| `save` | PNG 저장 | Save PNG |
| `edit` | 그림 수정 | Edit drawing |
| `undone` | 마지막 동작을 되돌렸어요. | Last action undone. |
| `fogged` | 창문에 다시 김이 서렸어요. | The window has fogged up again. |
| `downloadRequested` | PNG 다운로드를 요청했어요. | PNG download requested. |
| `saveFailed` | PNG를 저장할 수 없어요. 엽서 화면을 캡처해 주세요. | Couldn’t save the PNG. Take a screenshot of the postcard. |

## localStorage

- `foggy-window-doodles:drawing:v1` stores one 384-character string containing only `0` and `1`. The default is 384 zeroes.
- Read and write inside `try/catch`. Persist after a completed gesture, undo, or clear. Store the blank mask after a clear so a reload opens a fogged pane.
- Keep the cursor, undo history, preview state, and transient effects in memory. Restart in DRAW after reload.

## Edge cases

- Ignore stored values with the wrong length or characters and start with a blank pane. If storage is blocked or full, drawing, undo, preview, and export continue in memory.
- When pointer capture ends unexpectedly or the tab becomes hidden mid-stroke, finish once using the marks already applied. End any keyboard stroke on blur or visibility loss so Space cannot stay held on return.
- Resizing preserves the drawing and undo history. Finalize an active gesture before remapping coordinates to the new pane.
- Repeated input on an already cleared patch creates no undo entry. An entirely clear pane is a valid postcard.
- If an action disables the button that holds focus, return focus to the drawing surface. Announce undo, clear, and download status through a polite live region without announcing every mark.
- Disable Save PNG while encoding. If the player returns to DRAW before encoding finishes, ignore the stale result and release any object URL. Revoke download object URLs after use.
- For thumbnail QA, `#demo` opens POSTCARD with a fixed heart and two fingertip dots on a fresh in-memory mask. Demo mode never reads or writes the player’s sketch.

## Must not

- Use external scripts, fonts, assets, network calls, analytics, or uploads. Ship the interaction in one `index.html` with inline HTML, CSS, and JavaScript.
- Use real brands, people, transit logos, or copied illustrations. Generate `thumb.png` with the repository QA command.
- Add timers, scores, randomized outcomes, or automatic refogging. Drawing and clearing remain user actions.
- Open pop-ups, browser dialogs, or external pages. Keep the downloadable PNG action and its feedback inside the item.
- Add a sign-in, public gallery, sound, or personal information fields.