# Idea and spec: 겨울 창문 낙서 / Winter Window Doodles

## Concepts scored

Scores are 1–5 for value in the first 10 seconds, originality, Korean search/share demand, and buildability in one HTML file. Maximum 20. Demand scores are editorial estimates based on the supplied research and seasonal hooks. The research gives a stronger signal for tactile content in general than for any of these specific concepts.

| Concept | Category | First 10s | Originality | KR search/share | Buildability | Total |
|---|---|---:|---:|---:|---:|---:|
| **겨울 창문 낙서 / Winter Window Doodles.** Wipe a fogged window with one finger to sketch in the light from the street below. | `chill` | 5 | 4 | 4 | 5 | **18** |
| 홈파티 준비 순서 / Home Party Prep Timeline. Pick a guest arrival time and a few tasks to get a copyable countdown checklist, with an example ready to use. | `tools` | 4 | 3 | 4 | 5 | 16 |
| 새알 대화 뽑기 / Rice Dumpling Conversation Draw. Scoop a dumpling from a bowl of red bean porridge to reveal a quick conversation prompt. | `random` | 5 | 4 | 3 | 5 | 17 |

**Pick Winter Window Doodles.** The first touch reveals a patch of amber light immediately, and the finished pane gives people something personal to save. The research’s tactile-content cue and first-snow hook fit the interaction. `겨울 감성` and `창문 낙서` are candidate Korean discovery phrases.

## Meta

slug `winter-window-doodles`

- Category `chill`, kind `tool`, aspect `3/4`, date `2026-11-22`
- Tags ko `겨울감성`, `창문낙서`, `김서린창문`. Tags en `winter`, `window doodles`, `drawing`.

| Field | ko | en |
|---|---|---|
| `title` | 겨울 창문 낙서 | Winter Window Doodles |
| `desc` | 김이 서린 창문을 손가락으로 문질러 보세요. 가로등이 켜진 겨울 골목이 드러나고, 창문에 남긴 낙서는 이미지로 저장할 수 있어요. | Draw on a fogged window to reveal a winter street lit by amber lamps. Save your doodle as an image. |
| `howto` | 창문을 누르거나 문질러 김을 닦으세요. 키보드는 방향키로 움직이고 스페이스바로 닦기를 시작하거나 멈춰요. 미리보기에서 이미지를 저장할 수 있어요. | Tap or drag to wipe the fog. With a keyboard, move with the arrow keys and press Space to start or stop wiping. Save your image from the preview. |
| `about` | 창문에 그린 낙서는 지금 열린 화면에만 남아요. 간직하고 싶다면 이미지로 저장하세요. | Your doodle stays in the open tab. Save it as an image to keep it. |

## Pitch

A fogged window looks out onto a quiet winter alley. A tap clears a fingertip-sized patch. Dragging clears a continuous line, letting the streetlights and snowbanks show through a heart, a name, or a wandering scribble. The fog stays where the user leaves it, so they can take their time. The preview frames the same pane for a screenshot or PNG download.

## Flow

| Screen | What appears | Behavior |
|---|---|---|
| **DRAW · Fresh pane** | Title, one-line instruction, brush toggle, fogged pane, Undo, Fog up, Preview. | The pane is ready on load. Brush defaults to narrow unless a valid preference exists. Undo, Fog up, and Preview start disabled. The first tap or Space press leaves a visible spot immediately. |
| **DRAW · Marked pane** | Same layout, with the current doodle. | Each completed stroke enables Undo, Fog up, and Preview. Undo removes the last stroke. Fog up clears the pane and stroke history in one action, announces the reset, and returns focus to the pane. Undoing the final stroke restores the fresh state. |
| **PREVIEW** | Heading, finished pane with its frame, Keep drawing, and Save image. | The pane is read-only. Entering moves focus to the heading. Keep drawing restores every stroke and the current brush, and returns focus to Preview. Save keeps the user on this screen and announces the outcome in the status line. |

Save feedback appears inline. The pane stays fully visible in Preview so it can be captured if downloads are unavailable.

## Controls

- **Touch and mouse:** tap for a spot or drag for a stroke. Use Pointer Events and capture the first active primary pointer. Finalize the stroke on release, cancellation, or lost capture. Use `touch-action: none` on the drawing pane.
- **Keyboard:** Tab reaches the brush toggle, pane, and actions in visual order. With the pane focused, the arrow keys move a visible cursor by 8 logical pixels. Space starts a stroke and clears a spot at the cursor. The next Space press completes the stroke. Arrows alone move the cursor without wiping. Blur completes an open keyboard stroke. Suppress page scrolling only for the drawing keys while the pane has focus.
- **Brush:** one native toggle controls the wide brush and announces its state with `aria-pressed`. Narrow and wide brushes use logical radii of 7 px and 15 px. A brush change applies to the next stroke.
- **Actions:** native buttons work with tap, click, Enter, and Space. Disable state-changing buttons during an active stroke, then restore their appropriate state when it ends. If Undo removes the last stroke, focus returns to the pane because Undo becomes disabled.

## Drawing and preview layout

- Use a 300 × 400 logical drawing surface. Composite an original alley illustration, then a translucent frost layer. Erase from the frost layer with round strokes and round joins. Redraw from the saved stroke points on Undo and resize, using each stroke’s original brush radius.
- Draw the alley with canvas shapes. Place an amber lamp left of center so a first mark near the middle reveals a clear change. Use deep blue `#17263a` for the alley, warm amber `#ffc77a` for the window and street lights, cool gray `#cddce4` for frost, and charcoal `#263743` for the frame.
- Fill the iframe with a centered layout and use the available height to size the pane. At 320 × 480, fit the title, short instruction, brush toggle, pane, action row, and reserved status line with 44 px minimum controls. Scale the pane proportionally as the viewport changes. Use a system font stack, visible focus rings, and a two-tone keyboard cursor that works over pale frost and dark scenery.
- Keep the alley and frost static. Render on input, resize, or state changes and coalesce drawing updates with `requestAnimationFrame`. Cap the display backing-store DPR at 2. Drawing feedback is immediate at every motion preference.
- The preview uses the same composition with a charcoal frame and a small `하루한판` or `Daily Toybox` mark below the glass. Focus indicators and the keyboard cursor stay outside the exported image.

## Sound

Silent throughout.

## Export

- Render the framed preview to a dedicated 900 × 1200 offscreen canvas using the same logical coordinates as the on-screen preview. Export as PNG with `toBlob`, trigger a same-document download named `winter-window-doodles.png`, and revoke the object URL after use.
- Disable Save while PNG generation is pending. Announce that the download started when the link is triggered. If generation fails or the download request throws, show the screenshot fallback. Keep the doodle available in either case.

## Strings

Keep all interface text, document titles, accessible names, announcements, and export text in the `ko` and `en` dictionaries. Read `?lang=ko` or `?lang=en`, falling back to `navigator.language` with Korean for `ko` and `ko-*`, and English otherwise. Set `<html lang>` to match.

| Key | Korean | English |
|---|---|---|
| `appTitle` | 겨울 창문 낙서 | Winter Window Doodles |
| `drawHint` | 창문을 문질러 겨울 골목을 그려요. | Wipe the fog to draw with the light outside. |
| `paneLabel` | 김이 서린 창문 | Fogged window |
| `keyboardHint` | 방향키로 움직이고 스페이스바로 닦기를 시작하거나 멈춰요. | Use the arrow keys to move and Space to start or stop wiping. |
| `wideBrush` | 넓은 붓 | Wide brush |
| `undo` | 실행 취소 | Undo |
| `refog` | 김 서리기 | Fog up |
| `preview` | 미리보기 | Preview |
| `previewHeading` | 완성된 창문 | Your finished window |
| `previewImageLabel` | 낙서를 그린 겨울 창문 | Winter window with your doodle |
| `keepDrawing` | 계속 그리기 | Keep drawing |
| `save` | 이미지 저장 | Save image |
| `saving` | 이미지 만드는 중… | Preparing image… |
| `downloadStarted` | 이미지 다운로드를 시작했어요. | Image download started. |
| `saveFailed` | 저장할 수 없어요. 화면을 캡처해 주세요. | Couldn’t save the image. Take a screenshot instead. |
| `strokeUndone` | 마지막 낙서를 지웠어요. | Last stroke removed. |
| `paneRefogged` | 창문에 다시 김이 서렸어요. | The window is fogged up again. |
| `brand` | 하루한판 | Daily Toybox |

## localStorage

- `wwd:brush` stores `narrow` or `wide`. Default to `narrow` when missing, invalid, or inaccessible. Wrap both reads and writes in `try/catch`.
- Keep the doodle, cursor position, and screen state in memory. Reloading opens a fresh pane.

## Edge cases

- A zero-distance tap creates one round spot and counts as one undoable stroke. Ignore additional pointers and repeated Space keydown events.
- Convert pointer coordinates from the pane’s bounding box into logical coordinates. Use captured points beyond the pane edge and clip the resulting stroke to the pane. Resizing preserves committed marks and the cursor. Finish an active stroke before changing the coordinate mapping.
- When the document becomes hidden, finish any active stroke and stop scheduled drawing work. Refresh the display from current state on return.
- Bound a session to 200 undoable strokes, each with up to 512 recorded points. If a stroke reaches the point limit, commit the drawn portion and wait for release or the keyboard stop action. If the undo history exceeds 200 strokes, merge the oldest stroke into an in-memory base layer. Fog up clears that layer too.
- Repeated Save presses produce one download request while export is pending. If the user leaves Preview before PNG generation finishes, discard that export result.
- `#demo` opens Preview with a fixed, hand-authored star doodle on the pane for thumbnail QA. It requires no saved state and triggers no download.
- Verify both locales at 320 × 480 and on desktop. Check the first mark, keyboard drawing, undo to a fresh pane, resize, preview round trip, PNG framing, and blocked storage. Run `npm test`, `npm run build`, and `npm run qa -- --thumbs` before publishing. Inspect the generated thumbnail.

## Must not

- No network requests, external assets, libraries, fonts, analytics, or uploads. Ship the interaction and artwork in one `index.html`, with repository metadata alongside it and a QA-generated thumbnail.
- No copied artwork, recognizable storefronts, real people, trademarks, or imitation of an existing drawing toy’s interface.
- No timers, scores, automatic refogging, or required gestures beyond a tap or keyboard equivalent.
- No page scrolling, popup dialogs, `window.open`, or navigation away from the iframe.