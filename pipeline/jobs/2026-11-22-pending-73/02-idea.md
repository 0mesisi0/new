# Idea and spec: 김서린 창문 낙서 / Foggy Window Doodles

## Concepts scored

Scores are 1–5 in this order: value in the first 10 seconds, originality, Korean search and share potential, and buildability in one HTML file. Search and share scores are editorial estimates based on the supplied research and backlog. The research offers limited recent evidence.

| Concept | Category | Score | Verdict |
|---|---|---|---|
| **김서린 창문 낙서 / Foggy Window Doodles** | **chill** | **5/4/4/5 = 18** | **Picked.** The first stroke reveals a lit winter courtyard. A finished doodle makes a postcard worth sharing. Korean discovery phrases include `김서린 창문` and `창문 낙서`. |
| 냉동실 재료 추첨기 / Freezer Ingredient Draw | random | 4/3/3/5 = 15 | Enter up to six freezer ingredients and draw one to use first. A useful spin on the backlog’s random-picker idea, with some typing before the first result. |
| 김밥 도시락 퍼즐 / Kimbap Lunchbox Puzzle | puzzle | 4/4/3/4 = 15 | Fit six sets of sliced kimbap into a small lunchbox grid. Builds on the backlog’s kimbap theme with a spatial puzzle, and needs several hand-checked boards for replay. |

## Meta

slug `foggy-window-doodles`

- Category `chill`, kind `tool`, aspect `9/16`, date `2026-11-22`.
- Tags ko `김서린 창문`, `창문 낙서`, `겨울`. Tags en `foggy window`, `doodles`, `winter`.

| Field | ko | en |
|---|---|---|
| title | 김서린 창문 낙서 | Foggy Window Doodles |
| desc | 김서린 유리창에 손가락으로 그림을 그려 보세요. 닦인 자리에 겨울밤 풍경이 나타나고, 완성한 낙서는 엽서 이미지로 저장할 수 있어요. | Trace a doodle through the fog to uncover a winter courtyard. Save the window you drew on as a postcard. |
| howto | 손가락이나 마우스로 유리를 문질러요. 키보드로는 창에 초점을 두고 방향키로 움직이고, 스페이스바로 그리기를 켜거나 꺼요. | Drag across the glass with a finger or mouse. With the window focused, use the arrow keys to move and Space to toggle drawing. |
| about | 유리창 너머에는 작은 겨울밤 마당이 있어요. 그림은 이 탭에 머물고, 저장을 누르면 PNG 엽서가 만들어져요. | A small winter courtyard sits behind the glass. Your drawing stays in this tab, and the save button makes a PNG postcard. |

## Pitch

On a winter night, a fogged window hides a courtyard with amber porch lights, a snow-covered bench, and a crooked little fir. Drag a finger across the glass and the first clear stroke reveals the scene underneath. Draw a heart, write a name, or wipe the whole pane to see the courtyard. When the picture is ready, save the pane as a square postcard.

## Flow

1. **READY.** Show the fogged pane, a one-line instruction, and the brush and action controls. The pane accepts drawing immediately. The default brush is thin.
2. **DRAWING.** A press clears a round spot. Dragging extends the clear area in one continuous line. Strokes accumulate until the user taps **Reset window**. Brush changes affect subsequent marks.
3. **SAVE.** **Save postcard** exports the current pane and its frame as a PNG. Keep the drawing open and show the export status in a reserved line beneath the controls.
4. **RESET.** **Reset window** restores the initial fog immediately and clears the status. The selected brush stays selected. Drawing can resume on the next press.

## Controls

| Input | Behavior |
|---|---|
| Touch, pen, or mouse | Use pointer events on the pane. Accept one active pointer, and accept only the primary mouse button. Clear a dot on press and capture the pointer through release. End the stroke on `pointerup`, `pointercancel`, or `lostpointercapture`. |
| Arrow keys | With the pane focused, move the visible brush cursor by four logical pixels per keydown, clamped to the pane. Arrow keys move without clearing until drawing is toggled on. |
| Space | With the pane focused, toggle keyboard drawing. Turning it on clears a dot immediately. Ignore repeat events for Space. |
| Tab and Shift+Tab | Move between the pane, Thin, Wide, Reset window, and Save postcard in visual order. Leaving the pane turns keyboard drawing off. |
| Enter or Space on a button | Use native button activation. Thin and Wide expose their selected state with `aria-pressed`. |

Give all buttons a minimum 44 px hit area. Use `touch-action: none` on the pane and prevent the default action for handled drawing keys only while the pane has focus. Show a clear keyboard focus ring and a brush-size outline at the keyboard cursor. Initialize that cursor at the center. Starting a pointer stroke turns keyboard drawing off.

## Screens

| Screen or state | Visible content and behavior |
|---|---|
| Ready | Title, short instruction, framed fogged pane, Thin and Wide buttons, Reset window, Save postcard, and a blank status line. Reset starts disabled. Save is available with a fresh pane. |
| Drawing | Same layout, with clear tracks revealing the courtyard. Reset becomes available after the first mark. Brush selection and keyboard drawing state are announced through accessible controls and status text. |
| Export pending | Same pane and controls. Save is temporarily disabled and the status line reads “Making your postcard…”. Drawing remains available. |
| Export success or failure | Same pane and controls. Restore Save and show either the download handoff status or the screenshot fallback in the status line. |
| Reset | Return to the ready state with the chosen brush. Announce the reset and keep keyboard focus on Reset until the user moves it. |

Use a focusable pane with an accessible name and keyboard instructions via `aria-describedby`. Use a polite atomic status region for drawing mode, reset, and export messages. A newly used control replaces the previous status only when it has a message to report.

## Drawing and visual design

- Use a `320 × 320` logical coordinate space for the pane. Draw the courtyard in Canvas 2D from flat shapes: deep indigo sky `#18243d`, blue snow `#dce9f1`, evergreen `#234d4a`, and warm porch lights `#ffc77a`. A deep brown frame `#382d2b` surrounds the pane. The fog uses static stippling and beads, with the brightest scene shapes faintly visible through it.
- Draw the scene and fog separately. Maintain a logical-size offscreen mask where a round dot or round-capped segment adds to the cleared area. Erase the matching fog pixels during compositing. Thin has a 12 px diameter and Wide has a 38 px diameter. At the pane edge, clip the brush to the glass. During pointer capture, break the stroke when the pointer leaves the pane and begin a fresh segment on re-entry.
- Size the visible canvas to fit the available width and height and cap its backing resolution at `devicePixelRatio` 2. Convert pointer coordinates using the current canvas bounds. Recompose on resize from the same scene and mask so artwork stays aligned. Batch visible redraws with `requestAnimationFrame` when the image or cursor changes. Suspend redraws while hidden and render once on return. The scene is static and respects reduced motion without an alternate animation.
- In portrait, put the title and instruction above the pane, with a 2 × 2 control grid below it. At `320 × 480`, reserve room for both button rows and two lines of status text, then size the square pane from the remaining height. On wide, short screens, place the pane beside the title and controls. Use system fonts, wrap English and Korean text, and keep the page within the iframe viewport without scrolling.

## Export

- On Save, synchronously snapshot the current composition into a `960 × 960` export canvas. Draw a 48 px frame on each side around the `864 × 864` pane. Re-render the scene at export resolution and apply the snapshot of the logical mask. The export contains the framed window alone.
- Encode using `canvas.toBlob('image/png')` and dispatch a temporary same-document `<a download="foggy-window-doodles.png">` click pointing to the Blob URL. Remove the anchor and revoke the URL after a short delay. Announce the download request once it is handed off to the browser.
- If encoding returns `null`, throws, or the download API is unavailable, leave the pane intact and show the screenshot fallback. Some embed environments may silently block a download after the browser receives the request.
- Assign each export a request ID. Reset immediately clears the fog and status, invalidates the pending request, and restores Save. Ignore callbacks for invalidated exports before creating a Blob URL or initiating a download.

## Strings

Use one bilingual dictionary for all visible and accessible strings. Select `ko` or `en` from `?lang=` when valid, otherwise use Korean if `navigator.language` begins with `ko`, and English for other locales. Set `<html lang>` and the document title from the selected locale.

| Key | ko | en |
|---|---|---|
| `title` | 김서린 창문 낙서 | Foggy Window Doodles |
| `instruction` | 유리를 문지르면 겨울밤 풍경이 보여요. | Wipe the glass to reveal a winter night. |
| `paneLabel` | 낙서할 유리창 | Window drawing area |
| `keyboardHelp` | 방향키로 움직이고 스페이스바로 그리기를 켜거나 꺼요. | Use the arrow keys to move and Space to toggle drawing. |
| `brushGroup` | 획 굵기 | Brush width |
| `thin` | 가는 획 | Thin |
| `wide` | 굵은 획 | Wide |
| `reset` | 창문 초기화 | Reset window |
| `save` | 엽서 저장 | Save postcard |
| `drawingOn` | 그리기 켜짐 | Drawing on |
| `drawingOff` | 그리기 꺼짐 | Drawing off |
| `resetDone` | 유리에 다시 김이 서렸어요. | The window is fogged up again. |
| `saving` | 엽서를 만드는 중이에요… | Making your postcard… |
| `downloadRequested` | 엽서 다운로드를 요청했어요. | Postcard download requested. |
| `saveFailed` | 엽서를 저장할 수 없어요. 화면을 캡처해 주세요. | Could not save the postcard. Please take a screenshot. |
| `canvasUnavailable` | 이 브라우저에서는 낙서판을 열 수 없어요. | This browser could not open the drawing area. |

## localStorage

- `foggy-window-doodles:brush` accepts `thin` or `wide`. Use `thin` for a missing or invalid value. Wrap reads and writes in `try/catch`. A failed write leaves the current brush active for the session.
- Keep marks and export state in memory for the current tab. Reload starts with a fresh pane.

## Edge cases

- A tap clears one circle. A fast drag connects adjacent samples so the line stays continuous. Extra fingers have no effect on an active stroke.
- On resize, visibility loss, or window blur, end the active stroke and turn keyboard drawing off. Keep all committed marks. On return, begin the next stroke from its first new input.
- Reset discards all marks and centers the keyboard cursor. If Reset becomes unavailable while focused, use `aria-disabled="true"` with an activation guard so focus stays in place. Once focus leaves the unavailable control, remove it from the tab order until the next mark.
- Clamp keyboard coordinates after every move. A direction key held at an edge leaves the brush at that edge.
- If Canvas 2D initialization fails, show the localized fallback in the pane’s place and disable drawing controls.
- Verify the first mark, a continuous drag, both brushes, keyboard-only drawing and reset, preservation on resize, and PNG export at `320 × 480` and a wide desktop size in both locales. Use the repository’s thumbnail QA flow to capture a pane with a visible doodle.

## Must not

- No network requests, external fonts, analytics, remote assets, or runtime dependencies. Keep all interactive HTML, CSS, and JavaScript in `index.html`.
- No reproduction of an existing site’s artwork, layout, or recognizable scene. No trademarks or real people.
- No audio, dialogs, pop-ups, or navigation away from the iframe.
- No page scrolling or drawing gestures that pan the host page. No expired export callback may start a download after reset.