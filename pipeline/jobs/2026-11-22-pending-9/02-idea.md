# Idea and spec: 김 서린 창문 낙서 / Foggy Window Doodles

## Concepts scored

Scores are 1–5 in the order shown. Korean search and share scores are editorial estimates based on the seasonal hooks and tactile-play examples in the research brief. The brief contains no search-volume data for these concepts, and the site has no votes yet.

| Concept | Category | First 10 seconds | Originality | Korean search/share demand | One-file buildability | Total | Verdict |
|---|---|---:|---:|---:|---:|---:|---|
| **김 서린 창문 낙서 / Foggy Window Doodles** | **chill** | **5** | **4** | **4** | **5** | **18** | **Pick.** The first swipe reveals a lit winter street. A heart or initials become a shareable picture in a few strokes. Search phrases to test include `겨울 감성`, `창문 낙서`, and `김 서린 창문`. |
| 선물 포장지 크기 계산기 / Gift Wrap Size Calculator | tools | 4 | 3 | 4 | 5 | 16 | A user enters three box dimensions and gets a cut-size diagram for a specified fold. The result answers a concrete query, `선물 포장지 크기`, once the user has measurements. |
| 연말 할 일 도장 / Year-End To-Do Stamp | silly | 4 | 4 | 3 | 5 | 16 | Stamp fictional December chores with playful excuses. The first stamp lands fast, and the joke depends on the quality of the preset lines. |

## Meta

slug `foggy-window-doodles`

- **Category** `chill`
- **Kind** `tool`
- **Aspect** `9/16`
- **Date** `2026-11-22`
- **Tags** ko `겨울 감성`, `창문 낙서`, `김 서린 창문` · en `winter`, `foggy window`, `doodles`

| Field | ko | en |
|---|---|---|
| `title` | 김 서린 창문 낙서 | Foggy Window Doodles |
| `desc` | 김 서린 버스 창문에 손가락으로 그림을 그려 보세요. 닦인 자리마다 겨울 골목의 불빛이 드러나고, 완성한 낙서는 이미지로 저장할 수 있어요. | Draw on a fogged-up bus window to reveal a winter street, then save your doodle as an image. |
| `howto` | 창문을 누르거나 문질러 김을 닦으세요. 키보드에서는 창문에 초점을 맞춘 뒤 방향키로 옮기고 스페이스바로 닦아요. 그림이 완성되면 ‘그림 보기’를 누르세요. | Tap or drag to wipe away the fog. With the window focused, use the arrow keys to move and Space to wipe. Choose Preview when your doodle is ready. |
| `about` | 겨울 저녁, 버스 창문에 손가락으로 그리던 낙서를 옮겼어요. 그림은 이 페이지를 열어 둔 동안 남아요. | Inspired by the doodles you leave on a bus window on a winter evening. Your drawing stays until you close or reload the page. |

## Pitch

A fogged-up bus window fills most of the screen. Through the fog, a few amber lights hint at the street outside. The first tap clears a rounded patch and brings the street into focus in that spot. Drag to draw a heart, write initials, or uncover the whole scene. When the drawing is ready, preview it as a postcard and save a PNG.

The street is a fixed, original illustration. Each drawing gets its character from which parts of the street the user reveals. The fog stays put while the user thinks, so drawing works at any pace.

## Flow

1. **DRAW · Fresh window.** Open directly on the interactive pane with a short instruction above it. A tap wipes immediately. After the first wipe, enable **그림 보기 / Preview** and **김 다시 서리기 / Bring back the fog**.
2. **DRAW · In progress.** Every stroke reveals more of the street. **김 다시 서리기 / Bring back the fog** restores the fresh window in place. **그림 보기 / Preview** opens a snapshot of the current drawing.
3. **PREVIEW.** Show the centered postcard with **이미지 저장 / Save image** and **계속 그리기 / Keep drawing**. Saving keeps the preview open. Returning restores the exact drawing, and the next preview reflects subsequent edits.

## Controls

- **Touch and mouse.** Tap to reveal one patch or drag to reveal a continuous trail. Begin only on a primary pointer press inside the pane. Capture that pointer through release and ignore additional pointers while drawing. Use `touch-action: none` on the pane.
- **Keyboard.** Tab to the window. Arrow keys move the visible cursor one cell in the 12 × 10 grid. Space wipes the current cell. Hold Space with an arrow key to draw across cells. A held Space alone wipes once. The cursor stops at the grid edges. Prevent defaults for consumed play keys while the window has focus.
- **Navigation and focus.** Use native buttons with Enter and Space. Opening Preview moves focus to its heading. **Keep drawing** or Escape returns to the same keyboard cursor on the window. After a reset, focus returns to the pane. Tab and Shift+Tab follow the normal focus order.
- **Sizing.** Give every button a target of at least 44 × 44 CSS px and a visible focus indicator. Keep the pane keyboard-focusable with its localized name and associated instructions.

## Drawing and postcard rendering

- Use a logical canvas of 360 × 300. Divide it into 12 columns and 10 rows of 30 px cells. Store revealed cells as a 120-entry boolean array. The initial keyboard cursor is column 6, row 5, counted from 1.
- Map pointer coordinates from the canvas’s current CSS bounds to the logical grid. For each in-bounds pointer sample, fill all cells between the previous valid cell and the new one with an integer line traversal. An out-of-bounds sample breaks the segment. A captured pointer that re-enters starts a fresh segment at the new cell.
- Draw the street twice on offscreen layers. The clear layer contains crisp silhouettes, a streetlamp, a row of apartment windows, and snow along the curb. The fog layer has a muted version of the scene under a slate overlay with soft condensation mottling.
- Build one reveal mask from the union of fixed 23 px radius soft-edged circles centered on revealed cells. Composite the clear layer through that mask over the fogged layer. The overlapping circles connect diagonal strokes, and revisiting a cell produces the same image.
- Render the postcard on a 720 × 672 canvas with a 24 px border around the 672 × 560 illustration. Center the localized postcard caption in the remaining bottom space. Use the same postcard rendering for Preview and PNG. Keep the focus cursor, instructions, and buttons outside the postcard.

## Screens and visual design

| Screen or state | Layout and feedback |
|---|---|
| **Draw · Fresh** | Full-height midnight-blue frame with the title and input-appropriate hint above the pane. Let the amber streetlamp show faintly through the fog. Place the two actions below the pane, disabled until a cell is revealed. |
| **Draw · In progress** | Keep the screen geometry stable as the image clears. Crisp street detail gives immediate feedback. Show a double-outlined cursor during keyboard focus only. A polite live region announces a reset on demand and reports cell position and state during keyboard interaction. Pointer strokes produce no per-cell announcements. |
| **Preview** | Center the postcard against the same blue frame under the preview heading. Put **Save image** and **Keep drawing** below it. Show save feedback in a reserved status line. The postcard remains available for a screen capture if downloading fails. |

- **Palette.** Frame `#142231`, fog `#A8BAC4`, clear street `#263C50`, lamp light `#F5BA68`, snow `#DCE5E8`, postcard border `#F4EFE6`. Use system-ui for text and maintain strong contrast for copy and focus indicators.
- **Responsive layout.** Fill the iframe with `100dvh` or `100vh` fallback. Fit the pane or postcard inside the space left by the heading, hints, and controls. At 320 × 480, use 12 px side padding and two equal-width action buttons. Keep all controls visible with zero page scrolling. Cap the content column at 520 CSS px on desktop.
- **Motion and sound.** Use a single scheduled `requestAnimationFrame` to batch canvas redraws after input, reset, or resize. The scene is static and silent. Wipes are immediate in every motion setting. Cap onscreen canvas DPR at 2 and redraw from state after resize.

## Export

- Generate `foggy-window-doodles.png` from the postcard canvas with `toBlob('image/png')`, a temporary object URL, and a download link. Revoke the URL after dispatch and cleanup. Guard concurrent saves.
- Report a requested download after dispatch. If PNG creation fails or the frame exposes a download error, show the localized screenshot fallback. Keep the drawing and preview available in either case.

## Strings

Read `?lang=ko` or `?lang=en` first. When absent or unsupported, use Korean for a `navigator.language` beginning with `ko` and English otherwise. Set `<html lang>` accordingly. Put the strings below in a `{ ko, en }` dictionary and use the localized title for `<title>`.

| Key | ko | en |
|---|---|---|
| `title` | 김 서린 창문 낙서 | Foggy Window Doodles |
| `drawHint` | 창문을 문질러 겨울 골목의 불빛을 드러내 보세요. | Wipe the window to reveal the lights of a winter street. |
| `keyboardHint` | 방향키로 옮기고 스페이스바로 닦아요. 둘을 함께 누르면 선을 그릴 수 있어요. | Use the arrow keys to move and Space to wipe. Hold both to draw a line. |
| `paneLabel` | 김 서린 버스 창문 | Fogged-up bus window |
| `cellState` | {row}행 {col}열, {state} | Row {row}, column {col}, {state} |
| `cellFogged` | 김 서림 | fogged |
| `cellClear` | 닦임 | clear |
| `refog` | 김 다시 서리기 | Bring back the fog |
| `refogDone` | 창문에 다시 김이 서렸어요. | The window is fogged up again. |
| `preview` | 그림 보기 | Preview |
| `previewHeading` | 내 창문 낙서 | My window doodle |
| `previewImageLabel` | 겨울 골목이 드러난 창문 낙서 엽서 | A window doodle postcard revealing a winter street |
| `postcardCaption` | 겨울 저녁, 버스 창가에서 | A winter evening by the bus window |
| `save` | 이미지 저장 | Save image |
| `savePending` | 이미지를 만드는 중이에요. | Preparing your image. |
| `saveRequested` | 다운로드를 요청했어요. | Download requested. |
| `saveFailed` | 저장할 수 없어요. 이 화면을 캡처해 주세요. | Could not save the image. Please take a screenshot. |
| `back` | 계속 그리기 | Keep drawing |

Use `drawHint` by default and `keyboardHint` when the window has keyboard focus. Associate the keyboard hint with the pane for assistive technology. Keep save and reset feedback in polite live regions. For keyboard cell announcements, coalesce rapid repeats to the latest position and announce immediately on focus.

## localStorage

No keys. The drawing, cursor, and preview live in memory for the open page. Reloading starts with a fresh window.

## Edge cases

- A blank drawing keeps Preview and reset disabled. One revealed cell enables both actions. A fully cleared pane remains eligible for Preview and reset.
- Pointer cancellation, loss of capture, resize, or a hidden document ends the current stroke and clears transient input state. Revealed cells remain intact. When visible again, redraw any pending changes.
- Leaving Preview while PNG generation is pending invalidates that save attempt. Ignore its late callback and release any object URL it created.
- Changing iframe size or DPR redraws the same cells at the new dimensions. Keep the keyboard cursor at the same logical position.
- At `#demo`, open the standard Draw screen with a fixed heart already revealed for thumbnail QA. Using 1-based row and column coordinates, reveal row 3 columns 4–5 and 8–9, row 4 columns 3–10, row 5 columns 4–9, row 6 columns 5–8, and row 7 columns 6–7. This state supports the same controls as a hand-drawn picture.

## Must not

- Keep HTML, CSS, JavaScript, canvas art, and text in one `index.html`. The item must work offline, with system fonts and zero network requests or telemetry.
- Use original, fictional streetscape art. Keep the scene free of real people, brand marks, and copied assets.
- Keep interaction inside the iframe. Use inline feedback for reset and export, with the PNG download initiated by the user.
- Keep the drawing untimed and silent. Preserve each reveal until reset, reload, or close.