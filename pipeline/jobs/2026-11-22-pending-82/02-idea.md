# Idea and spec: 창문 김서림 낙서 / Foggy Window Doodles

## Concepts scored

Each score is 1–5. Korean search and share scores are planning estimates based on the supplied research and likely search phrases.

| Concept | Category | First 10 seconds | Originality | Korean search/share demand | One-file buildability | Total | Verdict |
|---|---|---:|---:|---:|---:|---:|---|
| **창문 김서림 낙서 / Foggy Window Doodles** | **chill** | **5** | **4** | **4** | **5** | **18** | **Picked.** The first swipe reveals a warm winter street. A finished drawing makes a recognizable image to send to a friend. Korean hooks include `김서림 낙서` and `겨울 감성`. |
| 책상 서랍 닫기 / Close the Desk Drawer | puzzle | 4 | 4 | 3 | 5 | 16 | Slide stationery under a closing line in three fixed layouts. The `책상 정리 게임` hook is clear, though players need to learn the fit rule before the payoff. |
| 오늘의 호빵 한마디 / Today's Steamed Bun Note | random | 5 | 3 | 3 | 5 | 16 | Open a paper bag to get one of 12 illustrated buns with a short fictional note. The `겨울 간식` hook fits the season, though the reveal offers limited replay. |

The selected concept uses the research brief’s tactile-play direction. Condensation is the drawing surface, and the user’s marks reveal the scene beneath it.

## Meta

slug `foggy-window-doodles`

- **Category** `chill`
- **Kind** `tool`
- **Aspect** `3/4`
- **Date** `2026-11-22`
- **Tags** — ko `김서림 낙서`, `겨울 감성`, `창문 낙서` · en `foggy window`, `winter doodle`, `drawing`
- **Title ko** — 창문 김서림 낙서
- **Title en** — Foggy Window Doodles
- **Desc ko** — 뿌옇게 김이 서린 창문에 손가락으로 그림을 그려 보세요. 닦아 낸 자리에 겨울 골목의 불빛이 드러나고, 완성한 낙서는 이미지로 저장할 수 있어요.
- **Desc en** — Draw on a fogged-up window to reveal a glowing winter street. Save your doodle as an image or fog the glass and start fresh.
- **Howto ko** — 창문을 쓸어 김을 닦아 보세요. 키보드로는 방향키로 움직이고 스페이스바로 그려요. 완성하면 미리보기에서 이미지를 저장할 수 있어요.
- **Howto en** — Swipe across the glass, or use the arrow keys to move and Space to draw. Open the preview to save your doodle as an image.
- **About ko** — 겨울 버스 창문에 손가락으로 그림을 그리던 순간을 떠올리며 만들었어요. 낙서는 이 탭에서만 유지돼요.
- **About en** — Inspired by drawing on a fogged-up bus window in winter. Your doodle stays in this tab until you close or reload it.

## Pitch

A fogged bus window fills the screen. Drag a finger across the glass and the stroke immediately reveals amber windows, a streetlamp, and snow on the sill. Write a name, draw a face, or leave a little message. One button brings the fog back, and a preview lets the user save the pane as a PNG.

## Flow

1. **Draw.** Open directly on the full pane with a one-line hint and three buttons. The first touch, click, or keyboard mark clears fog immediately. No start gate or timed reveal.
2. **Preview.** Once the user has made a mark, the preview button opens a clean framed view of the current pane with save and return buttons.
3. **Save or return.** Save requests a local PNG download and reports the outcome inline. Return restores the same drawing, selected brush, and keyboard cursor. The user can clear the pane with the fog button at any time on the draw screen.

## Controls

- **Touch and mouse.** Press anywhere inside the pane to make a round mark, or drag to make a continuous stroke. Track one pointer with pointer capture. End the stroke on pointer up, cancellation, or loss of capture. Use `touch-action: none` on the pane and keep scrolling and zoom gestures from interfering with drawing there.
- **Keyboard.** Tab to the pane, then use the arrow keys to move the visible cursor by 8 logical px per key event. Space starts or stops drawing, and stamps once when starting. While drawing is active, each step draws a segment from the previous position. Escape lifts the brush. Prevent defaults only for handled pane keys. Leaving the pane lifts the brush, and Tab can always move on.
- **Brush.** A single toggle switches between 32 px and 64 px diameters in logical coordinates. The label names the current size. Expose the large state with `aria-pressed` and outline the actual brush diameter around the keyboard cursor.
- **Fog and preview.** Use native buttons with tap targets of at least 44 × 44 CSS px. Fog clears the pane in one press and leaves the brush size selected. Opening the preview focuses its heading. Escape and the return button close the preview and restore focus to its opener.

## Screens

### Draw

- Show the title and input-appropriate hint above the pane. Use the touch and mouse hint initially. Switch to the keyboard hint when the pane receives keyboard focus, and switch back on pointer input.
- Center a 4:3 pane in a slim rounded bus-window frame. Put the brush toggle, fog button, and preview button below it. Keep preview disabled until a mark exists. Use a single visible status line below the controls for fog reset feedback, with a polite live region.
- Use a fixed winter street with a streetlamp under the center of the pane so a first mark near the middle reveals a clear color change. Keep the frame and controls outside the art.

### Preview

- Show the preview heading and the current 4:3 pane in the same frame. Render the same frozen composite used by the PNG. Hide the keyboard cursor and omit game controls from the image.
- Show **Save image** and **Back to drawing** beneath the pane, with a reserved inline status line. Disable save while encoding. If a download cannot be requested, keep the clean preview visible for a screenshot.

## Drawing and rendering

- Use a 480 × 360 logical canvas. Draw an original static street scene with Canvas 2D primitives. A navy sky, overlapping slate-blue rooflines, amber windows, and pale snow give even short strokes something recognizable to reveal.
- Keep the street scene and fog on separate offscreen layers. Composite a static, subtly mottled fog layer over the scene. Erase from the fog layer with round caps and joins using `destination-out`. Draw dense, opaque brush cores with a soft edge. Redraw the fog from its original layer when the user presses the fog button.
- Preserve the drawing at logical resolution. Scale the display canvas to fit its container and cap its backing-store DPR at 2. Convert pointers through the displayed canvas bounds into logical coordinates. Clip stamps and segments to the glass. Resizing updates the display and coordinate mapping without changing the stored mask.
- Use `requestAnimationFrame` to batch redraws when the pane or cursor changes. The street, fog, and marks are static between inputs. Keep the preview and PNG free of transient UI.

## Visual design

- Use `#172637` for the surround, `#23374A` for the frame, `#C0D4DE` for fog, `#F6B95C` for lit windows, and `#EDF5F7` for UI text and snow. Use system-ui, visible focus outlines, and high-contrast control labels.
- Fill the iframe using `100dvh` with a `100vh` fallback. Fit the pane to the remaining width and height after reserving space for the header, controls, and status. At 320 × 480, use 12 px side gutters, allow the hint to wrap, and keep the control targets at least 44 px high. Center the composition on wider screens and cap the pane at 640 CSS px wide. Keep the outer page free of scrolling.
- Apply fog, marks, and preview changes immediately. The interface uses no animation or sound.

## Export

- Render a 960 × 720 PNG from the same street and fog layers shown in preview. Export it as `foggy-window-doodle.png` with `canvas.toBlob()` and a local object URL. Request the download from the save action and revoke the URL after a short delay.
- Report that the download was requested once the anchor is activated. Browser save completion is outside the item’s control. Show the failure string if encoding returns no blob, an exception occurs, or the runtime identifies a download restriction. Keep the preview visible so it can be captured if the browser silently blocks downloads.

## Strings

Read `?lang=ko` or `?lang=en` first. For absent or unsupported values, use Korean when `navigator.language` begins with `ko` and English otherwise. Set `<html lang>` and use the same dictionary for visible text, the document title, and accessible labels.

| Key | ko | en |
|---|---|---|
| `title` | 창문 김서림 낙서 | Foggy Window Doodles |
| `pointerHint` | 창문을 쓸어 골목의 불빛을 드러내세요. | Swipe across the glass to reveal the streetlights. |
| `keyboardHint` | 방향키로 움직이고 스페이스바로 그리거나 멈춰요. | Move with the arrow keys. Press Space to start or stop drawing. |
| `drawPaneLabel` | 김이 서린 낙서 창문 | Fogged drawing window |
| `brushSmall` | 가는 선 | Fine line |
| `brushLarge` | 굵은 선 | Thick line |
| `fogButton` | 김 다시 서리기 | Fog the glass |
| `fogDone` | 창문에 다시 김이 서렸어요. | The glass is fogged again. |
| `previewButton` | 미리보기 | Preview |
| `previewTitle` | 내 창문 낙서 | My window doodle |
| `previewImageLabel` | 겨울 골목이 비치는 창문 낙서 | Your window doodle over a winter street |
| `saveButton` | 이미지 저장 | Save image |
| `saving` | 이미지를 만드는 중이에요. | Preparing your image… |
| `saveRequested` | 다운로드를 요청했어요. 저장되지 않으면 이 화면을 캡처해 주세요. | Download requested. If it doesn’t save, take a screenshot of this preview. |
| `saveFailed` | 이미지를 저장할 수 없어요. 이 화면을 캡처해 주세요. | Couldn’t save the image. Take a screenshot of this preview. |
| `backButton` | 낙서로 돌아가기 | Back to drawing |

## localStorage

- `foggy-window-doodles:brush` stores `small` or `large`. Default to `small` for missing, unreadable, or invalid values. Wrap reads and writes in `try/catch`.
- Keep the drawing mask, cursor, preview state, and export status in memory. Reloading opens a freshly fogged pane.

## Edge cases

- A single tap or Space press counts as a mark and enables preview. Tapping outside the glass leaves the mask untouched.
- Ignore additional pointers while a stroke is active. If the captured pointer leaves the glass, end the current segment at the edge. On re-entry, begin a new segment at the re-entry point to avoid a diagonal across the pane.
- On resize, visibility loss, or focus departure from the pane, lift the brush and clear active pointer input. Preserve marks, clamp the keyboard cursor within the pane, and resume idle when visible.
- Fogging lifts any active brush, resets the mask and cursor to the center, and disables preview. Return from preview preserves the drawing and brush size. Give each preview session its own save status so an export callback cannot update a screen the user has already left.
- If storage is blocked, brush changes still work for the current session. If the iframe blocks downloads, the preview remains usable. Both languages must fit at 320 × 480 without clipped text or page scroll.

## Must not

- No network calls, analytics, remote assets, external fonts, libraries, or user-supplied URLs. Ship the complete experience in one `index.html` alongside the normal `meta.json` and generated `thumb.png`.
- No copied art, real brands, real people, or references to identifiable bus routes. Use a fictional street and original artwork.
- No automatic refogging, countdown, score, or streak. The user controls when their drawing clears.
- No upload, permission prompt, modal browser dialog, new window, or navigation away from the item.
- Before publishing, run `npm test`, `npm run build`, and `npm run qa -- --thumbs`. Check that the generated thumbnail shows a readable title and pane. Verify first-mark feedback, keyboard-only drawing, and export in the embedded item.