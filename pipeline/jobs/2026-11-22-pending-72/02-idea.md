# Idea and spec: 김 서린 창문 낙서 / Foggy Window Doodles

## Concepts scored

Scores are 1–5 for first-10-second value, originality, Korean search/share demand, and buildability in one HTML file. Demand scores are estimates based on the supplied research and backlog. The research has limited recent evidence, and the brief lists no votes.

| Concept | Category | First 10s | Originality | Korean demand | Buildability | Total | Verdict |
|---|---|---:|---:|---:|---:|---:|---|
| **김 서린 창문 낙서 / Foggy Window Doodles** | **chill** | **5** | **4** | **4** | **5** | **18** | **Picked.** The first stroke reveals a lit street. A handwritten winter greeting makes a shareable image. |
| 연말 집 정리 체크리스트 / Year-End Home Reset Checklist | tools | 4 | 3 | 4 | 5 | 16 | Six editable tasks give the checklist immediate value. The year-end checklist angle is seasonal, but the interaction is familiar. |
| 동지 새알심 퍼즐 / Winter Solstice Dumpling Puzzle | puzzle | 4 | 4 | 3 | 4 | 15 | Slide rice balls into matching bowls in a few moves. The seasonal hook gives it a specific audience, and each board needs a solvability check. |

The pick uses the research’s winter themes and the backlog’s short, tactile interactions. `김 서린 창문` and `겨울 낙서` describe what players can make, while handwritten greetings give them a reason to share the image.

## Meta

slug `foggy-window-doodles`

- Category `chill`, kind `tool`, aspect `3/4`, date `2026-11-22`
- Korean tags `김 서린 창문`, `겨울 낙서`, `손글씨`
- English tags `foggy window`, `winter doodles`, `handwriting`

| Field | ko | en |
|---|---|---|
| `title` | 김 서린 창문 낙서 | Foggy Window Doodles |
| `desc` | 김 서린 창문에 손가락으로 낙서하면 골목의 불빛이 드러나요. 겨울 인사나 작은 그림을 그려 이미지로 저장해 보세요. | Draw on a foggy window to reveal the lights of a winter street. Write a greeting or make a doodle, then save it as an image. |
| `howto` | 창문을 누르거나 문질러 김을 걷어 내세요. 키보드로는 창문에 초점을 맞춘 뒤 방향키로 움직이고 스페이스바로 그리기를 켜거나 끄세요. | Tap or drag on the glass to clear the fog. With the keyboard, focus the window, move with the arrow keys, and press Space to toggle drawing. |
| `about` | 추운 날 창문에 손끝으로 글씨를 쓰던 순간을 담았어요. 완성한 그림은 기기에 이미지로 저장할 수 있어요. | A small recreation of writing with your fingertip on a cold window. You can save your finished doodle to your device. |

## Pitch

A fogged window looks out onto a quiet Korean residential lane. Drag a finger through the condensation and the shop light, brick wall, and apartment windows come into focus along the stroke. A single tap leaves a clear dot. A few strokes can turn the pane into a handwritten greeting ready to save.

## Flow

1. **READY.** Open directly on the fogged square pane. Show the title, a one-line hint, and three buttons for undo, re-fogging, and saving. Keep all three disabled until their actions are available.
2. **DRAWING.** Apply the first mark on pointer down or when keyboard drawing begins. Clear the glass continuously as the pointer or keyboard cursor moves. The pane stays in place throughout.
3. **DRAWN.** Keep the latest doodle visible with all three actions available. Undo restores the pane before the last action. Re-fogging clears the entire drawing in one action. The user can undo it to recover the drawing.
4. **SAVE.** Export the current pane as PNG and keep the user on the drawing screen. Show an inline status when the download starts or when export fails. The same status space reports re-fogging and recovery by undo.

## Controls

| Input | Behavior |
|---|---|
| Touch, mouse, or pen | Press inside the pane to clear a dot, drag to clear a continuous line, and release to finish one stroke. Use pointer capture and accept a single active pointer. |
| Keyboard on the pane | Tab focuses the pane. Arrow keys move the cursor by 6 logical pixels. Space starts or ends a stroke. Escape ends the active stroke and keeps its marks. |
| Keyboard on buttons | Tab moves through Undo, Re-fog, and Save image. Enter or Space activates the focused button. |
| Layout and focus | Use native buttons with visible focus rings and targets at least 44 px tall. Set `touch-action: none` on the pane. Suppress arrow and Space defaults while the pane has focus. |

Keyboard focus makes the cursor visible at the center on first entry. Subsequent focus restores its position for the session. Starting a pointer stroke finishes any active keyboard stroke. Leaving the pane ends keyboard drawing.

## Window and drawing

- Use a fixed 256 × 256 logical coordinate system. Render the lane and the fog separately in canvas. Clear the fog with a round brush 12 logical pixels wide. Connect successive points with round-capped segments so a fast swipe leaves a continuous stroke.
- Clip strokes to the glass. Convert pointer positions through the pane’s current bounding rectangle. Keep the drawing in logical coordinates when the iframe changes size.
- Keep up to 16 pre-action fog snapshots in memory. A stroke that clears at least one new pixel creates one undo entry. Re-fogging a marked pane creates one entry and restores the original fog. Undo restores the prior snapshot and consumes its entry.
- A blurred version of the lane shows faint light through untouched condensation. Clear marks expose the sharp scene underneath. Use a fixed droplet pattern so re-fogging restores the same starting appearance.
- Use navy for the lane (`#17263B`), muted brick for the walls (`#70494B`), amber for lit windows (`#FFD38C`), and blue-gray for the fog (`#ADBFCB`). Keep the scene free of signs and lettering.
- Center the square pane in the iframe with the title and hint above it and a three-column toolbar below. Size the pane from the available width and height. At 320 × 480, fit the pane, title, toolbar, and reserved status line without page scrolling. Use system fonts, high-contrast labels, and canvas backing resolution capped at 2× for the live view.

## Sound

Silent throughout. Drawing feedback comes from the change in clarity under the brush.

## Export

- Compose a 768 × 768 PNG from the lane and current fog mask. Include the narrow window rim and exclude the interface, status line, focus ring, and cursor.
- Save as `foggy-window-doodles.png` through a blob URL and a download link. Revoke the URL after the download has had time to start. Show `saveStarted` once the link has been dispatched. Show `saveFailed` when PNG generation or download initiation fails detectably.
- Capture the drawing at the time Save image is pressed. Prevent concurrent exports and allow drawing to continue during encoding. Keep Save image disabled on blank glass and while the current export is pending.

## Strings

Keep all app text, including accessible labels and status messages, in the bilingual dictionary. Accept `?lang=ko` or `?lang=en`. For a missing or unsupported value, use Korean when `navigator.language` starts with `ko`, otherwise English. Set `<html lang>` and the document title to match.

| Key | ko | en |
|---|---|---|
| `appTitle` | 김 서린 창문 낙서 | Foggy Window Doodles |
| `hint` | 유리창을 문질러 그림을 그려 보세요. | Drag across the glass to draw. |
| `paneLabel` | 김 서린 창문 그리기 영역 | Foggy window drawing area |
| `paneInstructions` | 방향키로 움직이고 스페이스바로 그리기를 시작하거나 끝내세요. Esc로 그리기를 끝낼 수 있어요. | Move with the arrow keys. Press Space to start or stop drawing, or press Escape to stop. |
| `actionsLabel` | 그림 도구 | Drawing controls |
| `undo` | 되돌리기 | Undo |
| `refog` | 김 채우기 | Re-fog |
| `save` | 이미지 저장 | Save image |
| `saving` | 이미지 만드는 중… | Preparing image… |
| `undone` | 이전 상태로 되돌렸어요. | Restored the previous drawing. |
| `refogged` | 창문에 다시 김을 채웠어요. | The window is fogged again. |
| `saveStarted` | 이미지 다운로드를 시작했어요. | Image download started. |
| `saveFailed` | 이미지를 저장할 수 없어요. 화면을 캡처해 주세요. | Couldn’t save the image. You can take a screenshot. |

Associate `paneInstructions` with the focused pane as its accessible description. Use one polite live region in the reserved status space. Announce completed actions and export feedback through that region. Clear stale status when a new drawing action begins.

## localStorage

No keys. The pane, cursor, and undo history live in memory for the current session. Reloading opens a freshly fogged window. The PNG is the persistent copy.

## Edge cases

- A tap without movement creates a dot. Drawing entirely over an already clear area leaves undo history intact.
- A second finger or non-primary mouse button leaves the active stroke intact. On `pointercancel`, lost capture, resize, or document hide, finish the stroke with the marks already applied. Require a fresh press to resume.
- Clip each segment at the pane boundary. Pointer movement wholly outside the pane produces no marks. Re-entry resumes drawing from the crossing point.
- Keep the cursor within the glass. An arrow key held at an edge leaves the mask and undo history unchanged once the cursor stops moving.
- Undoing the first mark restores blank glass and disables Save image and Re-fog. A re-fogged pane can still have an enabled Undo button.
- Keep keyboard focus in the toolbar when an action disables its own button. Move it to the first enabled toolbar button, or back to the pane if all three are disabled.
- On export failure or restricted downloads, preserve the drawing and show the screenshot fallback when failure is detectable. The drawing remains visible without transient overlays.

## Must not

- No external requests, fonts, libraries, assets, or analytics. Keep the item’s visual assets and behavior in `index.html`.
- No real storefronts, logos, addresses, people, or copied artwork.
- No timers, scores, prompts to share, or fading that erases a drawing while the user is idle.
- No sound, modal dialogs, pop-ups, page navigation, or page scrolling.
- No runtime text outside the Korean and English dictionaries.