# Idea and spec: 김 서린 창문 낙서 / Foggy Window Doodles

## Concepts scored

Scores are 1–5 for each criterion, with a maximum of 20. Korean demand scores are editorial estimates based on the supplied research and likely search phrases. The brief lists no votes yet.

| Concept | Category | First 10 seconds | Originality | Korean search/share demand | One-file buildability | Total | Verdict |
|---|---|---:|---:|---:|---:|---:|---|
| **김 서린 창문 낙서 / Foggy Window Doodles** | **chill** | **5** | **4** | **4** | **5** | **18** | **Picked.** The first swipe reveals a lit winter alley through the glass. A finished drawing gives friends something to share for `김서림 낙서` and `겨울 감성`. |
| 선물 포장지 크기 계산기 / Gift Wrap Size Calculator | tools | 4 | 3 | 4 | 5 | 16 | Enter three box dimensions to get a suggested cut size and a fold diagram. `선물 포장지 크기` expresses a practical seasonal need. |
| 정전기 문고리 / Static Zap Door Knob | arcade | 5 | 4 | 3 | 4 | 16 | Match a pulse to the doorknob’s glow to open a series of doors. `겨울 정전기` is a familiar hook, with weaker search intent for a game. |

The pick draws on the research notes about tactile short-form videos and immediate pointer feedback. Its interaction is drawing through condensation to reveal a scene, giving it a different goal from flattening paper or solving a snowprint puzzle. [Today’s research](/C:/work/haruhanpan/pipeline/jobs/2026-11-22-pending-81/01-research.md)

## Meta

slug `foggy-window-doodles`

- Category `chill`, kind `tool`, aspect `3/4`, date `2026-11-22`
- Tags ko `김서림`, `창문 낙서`, `겨울 감성`. Tags en `condensation`, `window doodles`, `winter`.
- Title ko `김 서린 창문 낙서`. Title en `Foggy Window Doodles`.
- Desc ko `김이 서린 창문에 손가락으로 그림을 그려 보세요. 닦인 자리에 겨울 골목의 불빛이 드러나고, 완성한 낙서는 이미지로 저장할 수 있어요.`
- Desc en `Draw on a fogged-up window to reveal a winter alley in warm light. Save your finished doodle as an image.`
- Howto ko `창문을 누르거나 쓸어 김을 닦으세요. 키보드로는 창문에 초점을 맞춘 뒤 방향키로 움직이고 Enter로 점을 찍거나 스페이스바로 선을 그으세요.`
- Howto en `Tap or swipe to clear the fog. With the window focused, use the arrow keys to move, Enter to make a dot, and Space to toggle drawing.`
- About ko `겨울 골목을 한 장의 창문에 담았어요. 낙서는 탭을 열어 둔 동안 남고, 마음에 드는 그림은 PNG로 저장할 수 있어요.`
- About en `A little winter alley behind a fogged window. Your drawing stays for this tab session, and you can save it as a PNG.`

## Pitch

A frosted window fills the screen. Amber squares glow faintly through its surface. The first tap leaves a fingertip mark. A swipe reveals the crisp edges of rooftops and apartment windows wherever it passes. Draw a heart, write a word, or clear a patch to see the whole alley, then save the pane as a postcard.

## Flow

1. **DRAW** opens with a fully fogged pane ready for input. A tap or swipe immediately reveals the alley. Each stroke stays until undone or cleared.
2. **PREVIEW** shows the drawing as a postcard. It offers image saving and a return to drawing. The drawing and undo history stay intact.
3. **SAVE** requests a PNG download from Preview. A localized status appears in place. The user can save again or return to the same drawing.

## Controls

| Action | Touch or mouse | Keyboard |
|---|---|---|
| Clear a spot | Tap or click within the pane | Focus the pane and press Enter |
| Draw a line | Press and drag within the pane | Press Space to lower the pen, move with the arrow keys, and press Space again to lift it |
| Move without drawing | Lift the pointer | Use the arrow keys with the pen lifted |
| Undo | Select **Undo** | Tab to **Undo** and press Enter or Space |
| Re-fog the pane | Select **Fog it up** | Activate the button with Enter or Space |
| Preview, save, return | Select the corresponding button | Tab to the corresponding button and activate it with Enter or Space |

- Use pointer events with capture for one active pointer. Use `touch-action: none` on the pane and consume arrow, Space, and Enter defaults while the pane has focus. Keep native Tab navigation and native button activation.
- One pointer gesture or one keyboard pen-down session is one undo step. Enter with the pen lifted records one dot. Lowering the pen clears the current spot, and subsequent arrow presses extend the same stroke until the pen is lifted.
- Show the keyboard cursor as a high-contrast ring on focus. The cursor starts at row 9, column 8 of an 18-row by 16-column grid, moves one cell per arrow press, and stops at the edges. Use the grid for keyboard coordinates only. Pointer strokes follow the pointer continuously.
- Give each button a minimum 44 × 44 px target. Provide a visible focus indicator on the pane and buttons. Expose the pane as a focusable region labeled `paneLabel` and described by `keys`. Update a polite status on keyboard input, using only the latest position when a key is held.

## Screens

### Draw

- Show the title and `drawHelp` above a single framed pane. Its alley contains original CSS or canvas shapes for stepped roofs, apartment windows, snow caps, and one streetlamp.
- Use a logical pane of 320 × 360. Paint the alley below a cool fog layer. Erase the fog along each stroke with a round brush 32 logical px across and a soft 4 px edge. Interpolate between input samples so fast swipes leave continuous lines. Stop at the glass edge and begin a new segment on re-entry.
- Place **Undo**, **Fog it up**, and **Preview** below the pane. Disable all three until the first mark. Re-fogging restores the opaque pane instantly and is itself undoable. Keep the most recent 20 undo steps.
- Place a single line of status below the controls. Display keyboard position and pen state there during keyboard drawing. Use the same region for undo and re-fog feedback.

### Preview

- Show `previewTitle` above the framed postcard. The same scene, fog, and strokes are visible without the keyboard cursor or editor controls. The postcard footer shows `appTitle` and `brand`.
- Show **Keep drawing** and **Save image** below the postcard. Move focus to the preview heading on entry. Return focus to **Preview** when the user goes back.
- Reserve one status area for save feedback. During export, keep the save button focused, set `aria-disabled="true"`, and ignore repeat activations until the operation settles.

## Visual design

- Use night blue `#162431` for the page, deep slate `#25343D` for the frame, blue-gray `#B8C8CE` for the condensation, and amber `#FFC568` for lit windows. Use warm off-white `#F5F1E8` for text and a bright amber focus ring.
- Keep the alley recognizable through a few broad shapes. Give the fog a static, fine-grained texture and the cleared stroke a crisp center so the first mark reads at phone size.
- Fill the iframe with a centered column, capped at 480 px wide. At 320 × 480, allow headings and helper text to wrap and shrink the pane to fit the remaining height. Keep the entire screen within the viewport. Use system fonts, `100dvh` with a `100vh` fallback, and canvas device pixel ratio capped at 2.
- Redraw only when drawing, changing screens, or resizing. Coalesce pointer updates with `requestAnimationFrame`. The reveal and preview are immediate and use no animation or sound.

## Export

Render the postcard to a 720 × 900 opaque PNG with the same framed pane and localized footer. Use `toBlob`, a temporary object URL, and an `<a download="foggy-window-doodles.png">` click from the current iframe. Revoke the URL after the browser has had time to consume it. Report `saveRequested` once the download is requested. If PNG creation fails or the download is explicitly rejected, show `saveFail`. Preview remains available for a screenshot.

## Strings

Resolve `?lang=ko` or `?lang=en` first. Otherwise use Korean for a `navigator.language` beginning with `ko`, and English for other values. Set `<html lang>` and the document title accordingly. Keep all item text, including status announcements and postcard text, in the locale dictionary. `{row}` and `{col}` are one-based.

| Key | ko | en |
|---|---|---|
| `appTitle` | 김 서린 창문 낙서 | Foggy Window Doodles |
| `drawHelp` | 창문을 쓸어 김을 닦아 보세요. | Swipe the glass to clear the fog. |
| `paneLabel` | 낙서할 수 있는 김 서린 창문 | Fogged window drawing area |
| `keys` | 방향키로 이동, Enter로 점 찍기, 스페이스바로 펜 내리기 또는 들기 | Arrow keys to move, Enter to make a dot, Space to lower or lift the pen |
| `undo` | 되돌리기 | Undo |
| `refog` | 다시 김 서리기 | Fog it up |
| `preview` | 미리 보기 | Preview |
| `previewTitle` | 낙서 엽서 | Your window postcard |
| `previewLabel` | 겨울 골목이 비치는 창문 낙서 엽서 | Window doodle postcard overlooking a winter alley |
| `keepDrawing` | 계속 그리기 | Keep drawing |
| `save` | 이미지 저장 | Save image |
| `saving` | 이미지 만드는 중… | Making your image… |
| `saveRequested` | PNG 다운로드를 요청했어요. | PNG download requested. |
| `saveFail` | 저장하지 못했어요. 이 화면을 캡처해 주세요. | Couldn’t save the image. Take a screenshot of this preview. |
| `undone` | 한 단계 되돌렸어요. | Undid the last change. |
| `refogged` | 창문에 다시 김이 서렸어요. | The window is fogged up again. |
| `positionPenUp` | {row}행 {col}열. 펜을 들었어요. | Row {row}, column {col}. Pen up. |
| `positionPenDown` | {row}행 {col}열. 펜을 내렸어요. | Row {row}, column {col}. Pen down. |
| `brand` | 하루한판 | Daily Toybox |

## localStorage

No keys. Keep strokes, undo history, and cursor position in memory. Reloading starts with fresh fog. Image export works independently of storage.

## Edge cases

- A tap without movement clears one round spot. Secondary touches, right-clicks, and duplicate activation events leave the drawing intact.
- On pointer cancellation, lost capture, keyboard blur, or tab hide, commit the visible part of the current stroke once and end the gesture. Returning never connects the next point to the abandoned gesture.
- Undo after **Fog it up** restores the whole prior drawing. If the pane is fully fogged afterward, keep **Undo** available while history remains and disable preview and re-fog until a mark is present.
- Resize and orientation changes redraw the same logical pane and preserve the history and keyboard position. If the viewport changes during a gesture, end that gesture before applying the new coordinate mapping.
- `#demo` opens Preview with a built-in crescent and three dots drawn through the fog for thumbnail QA. **Keep drawing** returns to the editable demo pane.

## Must not

- No external assets, requests, analytics, fonts, or libraries. Ship the interaction and original artwork in one `index.html`, with the repo’s separate `meta.json` and QA-generated thumbnail.
- No real addresses, storefronts, brands, people, or copied scenery. Keep the alley fictional and the drawing on the user’s device.
- No page scrolling, autoplay, countdown, or automatic re-fogging. A finished drawing stays visible until the user changes it.
- No dialogs, clipboard access, `window.open`, navigation away, or saving triggered without a user gesture.