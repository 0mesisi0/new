# Idea and spec: 김 서린 창문 낙서 / Foggy Window Doodles

## Concepts scored

Scores run from 1 to 5 for each criterion, with a maximum of 20. Korean search and share scores are editorial estimates based on the supplied research and seasonal hooks. The research offers limited recent evidence, and the brief reports zero votes.

| Concept | Category | First 10 seconds | Originality | Korean search/share demand | One-file buildability | Total |
|---|---|---:|---:|---:|---:|---:|
| **김 서린 창문 낙서 / Foggy Window Doodles**. Wipe fog off a winter window with a fingertip. Warm apartment lights show through the lines. | `chill` | 5 | 4 | 3 | 5 | **17** |
| 새알심 그릇 맞추기 / Red Bean Bowl Puzzle. Slide rice dumplings into three bowls so each holds the same number, with one small puzzle ready on entry. | `puzzle` | 4 | 4 | 3 | 4 | 15 |
| 선물 포장지 계산기 / Gift Wrap Size Calculator. Enter a rectangular box’s dimensions and get a suggested cut size for a standard wrap, with the overlap marked. | `tools` | 4 | 3 | 4 | 5 | 16 |

**Pick Foggy Window Doodles.** The first swipe pays off immediately, and the drawing doubles as a winter postcard. The concept draws on the tactile interaction in research item 5 and the brief’s winter hook. `창문 낙서` and `겨울 감성` are plausible discovery phrases. The earlier First-Snow Window pitch supplied the seasonal setting. Here the condensation itself is the drawing surface.

## Meta

slug `foggy-window-doodles`

- Category `chill`, kind `tool`, aspect `3/4`, date `2026-11-22`.
- Tags — ko `창문 낙서`, `겨울 감성`, `김 서린 창문` · en `window doodles`, `winter`, `relaxing`.

| Field | ko | en |
|---|---|---|
| `title` | 김 서린 창문 낙서 | Foggy Window Doodles |
| `desc` | 김 서린 창문을 손끝으로 문질러 보세요. 겨울밤 골목의 불빛이 낙서 사이로 비치고, 마음에 드는 그림은 한 장에 담을 수 있어요. | Draw on a foggy window to reveal the warm glow of a winter street, then frame your doodle for a screenshot. |
| `howto` | 창을 누르거나 끌어 김을 닦아 보세요. 키보드는 방향키로 움직이고 스페이스바로 그리기를 켜거나 꺼요. | Tap or drag on the glass to wipe away fog. With a keyboard, move with the arrow keys and toggle drawing with Space. |
| `about` | 겨울밤 골목을 담은 작은 낙서장이에요. 그림은 이 페이지를 열어 둔 동안 남아요. | A little winter drawing pad. Your doodle stays on the glass while this page is open. |

## Pitch

A single fogged window looks out on a quiet Korean residential alley. Amber lights and blue rooftops are barely visible through the glass. A tap clears a round spot. A swipe cuts a clear line all the way through the fog, with soft edges like a real finger mark. Draw a heart or write a short message, then open a framed view for a screenshot.

## Flow

1. **DRAW.** Open directly on the fogged pane. Put the title and a one-line prompt above it. Place **Undo**, **Fog again**, and **Frame doodle** below it. On first load, all three are disabled. The first dab enables them and changes the prompt to the editing hint. A keyboard-specific hint replaces the current prompt while the pane has keyboard focus.
2. **DRAW after reset.** **Fog again** restores an untouched pane and brings back the opening prompt. **Undo** stays enabled so an accidental reset can be reversed in one action. **Fog again** and **Frame doodle** are disabled until there is a mark.
3. **PREVIEW.** Show the current pane in an ivory postcard frame with a small title caption. Hide the drawing cursor, hints, and editing toolbar. Below the card, show the screenshot instruction and **Back to drawing**. The card stays still. Back or Escape returns to the same drawing and undo history and restores focus to **Frame doodle**. A fresh load always opens DRAW.

## Controls

- **Touch and mouse.** A primary pointer down inside the glass makes a dab. Capture that pointer and draw continuously as it moves. Pointer up commits the stroke. Ignore additional pointers. Apply `touch-action: none` only to the glass.
- **Keyboard.** Tab reaches the pane and each enabled button. On keyboard focus, show a high-contrast ring cursor at the last keyboard position, centered on first focus. Arrow keys move it 8 logical pixels per keydown. Space starts a stroke with a dab or stops and commits the current stroke. Held arrows can repeat. Repeated Space events are ignored. Blur, Escape in DRAW, or switching to a pointer finishes any active keyboard stroke. Prevent the browser default for handled drawing keys only.
- **Buttons.** Use native buttons with tap targets at least 44 × 44 CSS px, visible focus, and wrapped labels where needed. Use a polite live region for undo and reset feedback. Keep the pane’s accessible name and instructions in the language dictionary.

## Drawing and undo

- Use a 360 × 420 logical pane. Generate the alley and fog locally with Canvas 2D. The alley has fixed silhouettes and window lights. The fog is a translucent blue-gray layer with a few static droplets. Clear only the fog layer with a 24 px round brush and a 3 px soft edge. Interpolate between input positions to keep fast swipes continuous and clip every mark to the glass.
- Commit one undo action per pointer stroke, keyboard stroke, or reset. Keep the latest 10 undo states in session memory. Older marks remain visible after the oldest undo entry is dropped. Undo restores the fog and whether the pane was blank. Repeated resets on a blank pane are unavailable.
- Keep the mask and keyboard cursor in logical coordinates. Resize the display to fit the iframe and redraw from that state. Use `requestAnimationFrame` to batch redraws while the pane is dirty and cap device pixel ratio at 2. Finish an active stroke on `pointercancel`, lost capture, or page hide. Resume with the committed drawing on return.

## Visual design and capture

- Use a navy room `#182431`, cool fog `#B9CBD3`, slate roofs `#344A60`, amber windows `#FFD58A`, and ivory postcard stock `#F5EFE4`. Set text in `system-ui`. The cool pane and warm cutouts should read clearly at thumbnail size.
- Center a column up to 480 px wide in a viewport-height shell. At 320 × 480, keep one short hint, a flexible pane, and a single row of three equal-width buttons. Shrink the pane proportionally when space is tight. Keep the page free of scrolling.
- The reveal appears under the pointer or keyboard cursor immediately. The scene is static and silent. The postcard fits entirely in the viewport, with browser screenshot instructions outside the frame.
- For thumbnail QA, `#demo` opens PREVIEW with a fixed heart and three small dots drawn into the fog. **Back to drawing** opens that demo drawing for editing. Use `npm run qa -- --thumbs` to produce `thumb.png`.

## Strings

Resolve `?lang=ko` or `?lang=en` first. Otherwise use Korean when `navigator.language` starts with `ko`, and English for all other locales. Set `<html lang>` accordingly. Reuse `title` from Meta as `appTitle`, including the postcard caption and document title.

| Key | ko | en |
|---|---|---|
| `startHint` | 창을 문질러 골목 불빛을 꺼내 보세요. | Wipe the glass to reveal the street lights. |
| `drawHint` | 마음에 드는 낙서는 액자에 담아 보세요. | Frame your doodle when it’s ready. |
| `keyboardHint` | 방향키로 이동 · 스페이스바로 그리기 켜기/끄기 | Arrow keys to move · Space to toggle drawing |
| `paneLabel` | 낙서할 수 있는 김 서린 창문 | Foggy window drawing area |
| `undo` | 실행 취소 | Undo |
| `reset` | 다시 김 서리기 | Fog again |
| `frame` | 액자에 담기 | Frame doodle |
| `previewLabel` | 낙서 엽서 미리 보기 | Doodle postcard preview |
| `captureHint` | 엽서를 화면 캡처로 남겨 보세요. | Take a screenshot to keep your postcard. |
| `back` | 낙서로 돌아가기 | Back to drawing |
| `undone` | 마지막 작업을 되돌렸어요. | Last action undone. |
| `resetDone` | 창에 다시 김이 서렸어요. | The glass is fogged again. |
| `canvasUnavailable` | 이 브라우저에서는 창문 낙서를 열 수 없어요. | This browser can’t open the drawing pad. |

## localStorage

No keys. Keep the drawing, undo history, cursor position, and current screen in memory for the open page. Reloading starts with fresh fog.

## Edge cases

- A tap without movement leaves one dab and creates one undo action. Secondary mouse buttons and a second finger leave the active stroke alone.
- A captured drag can leave the pane. Clip its segments to the glass so off-pane movement never produces a line along the frame.
- Commit any active stroke before undo, reset, preview, or resize. Clear pointer capture and stop keyboard drawing so a release after the transition cannot modify the pane.
- If Canvas 2D initialization fails, show the localized title and `canvasUnavailable` in the normal shell with the drawing controls hidden.
- Test the first dab, fast diagonal drag, undo after reset, keyboard-only drawing and preview, both languages at 320 × 480, resizing with a drawing, and the `#demo` thumbnail. Before publishing, run `npm test`, `npm run build`, and `npm run qa -- --thumbs`.

## Must not

- No network access, remote fonts or assets, analytics, uploads, or location access. Keep the item’s runtime in a single `index.html`.
- No real addresses, logos, people, or copied artwork.
- No timers, scores, automatic re-fogging, or sound.
- No browser dialogs, pop-ups, or navigation away from the item.