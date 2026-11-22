# Idea and spec: 김 서린 창문 낙서 / Foggy Window Doodles

## Concepts scored

Scores are 1–5 in this order: value in the first 10 seconds, originality, Korean search/share demand, and buildability in one HTML file. Maximum 20. Demand scores are planning estimates based on the supplied research and backlog.

| Concept | Category | Score | Verdict |
|---|---|---|---|
| **김 서린 창문 낙서 / Foggy Window Doodles** | **chill** | **5/4/4/5 = 18** | **Picked.** One swipe reveals a winter street through the glass. Handwritten messages make each screenshot personal. Search phrases include `김 서린 창문` and `창문 낙서`. |
| 택배 상자 접기 / Fold the Parcel Box | puzzle | 4/4/3/4 = 15 | Tap cardboard flaps in an order that locks the box. The fold is immediately readable, and fair puzzle sequences need playtesting. |
| 100원 단위 N빵 계산기 / Round-Won Bill Splitter | tools | 5/2/5/5 = 17 | Turn a total and headcount into exact per-person amounts, including who covers the rounding remainder. `N빵 계산기` is a clear search phrase, and the backlog already captures the core idea. |

The pick uses the tactile interaction and quick-response toy directions in the [research brief](01-research.md). A first swipe gives the full payoff, and a second person can make something recognizably different on the same pane.

## Meta

slug `foggy-window-doodles`

- Category `chill`, kind `tool`, aspect `9/16`, date `2026-11-22`
- Tags ko `김서림`, `창문낙서`, `겨울`, `힐링`
- Tags en `foggy-window`, `doodle`, `winter`, `relaxing`
- Title ko `김 서린 창문 낙서`
- Title en `Foggy Window Doodles`
- Desc ko — 김 서린 창문을 손끝으로 문지르면 겨울 골목의 불빛이 드러나요. 그림이나 짧은 인사를 남기고 화면을 캡처해 보세요.
- Desc en — Wipe a foggy window to reveal a winter street. Draw a picture or leave a short message, then take a screenshot to share.
- Howto ko — 창문을 누르거나 문질러 김을 닦으세요. 키보드로는 방향키로 움직이고 스페이스바로 그리기를 켜거나 꺼요.
- Howto en — Tap or drag on the window to clear the fog. With the keyboard, move with the arrow keys and press Space to turn drawing on or off.
- About ko — 밤거리와 새벽 골목은 직접 그린 가상의 풍경이에요. 새로고침하면 창문은 다시 뿌옇게 되고 배경 선택만 이 브라우저에 남아요.
- About en — Both scenes are original illustrations. Reloading fogs up the glass again. Your browser remembers only your scene choice.

## Pitch

A fogged-up window fills the screen. A few soft lights show through the condensation. The first touch clears a fingertip-sized spot, revealing a sharp patch of lamplight or roofline. Keep drawing to write a greeting or sketch a face. Switch between a warm night street and a blue dawn alley, or open a clean view of the pane for a screenshot.

## Flow

1. **DRAW, fresh pane** — The title, one-line gesture hint, scene choices, and fogged window are visible on load. The pane accepts input immediately.
2. **DRAW, marked pane** — Each tap or stroke clears the fog. Changing scenes keeps the same marks. **Fog it up again** clears the marks in place and keeps the selected scene.
3. **PREVIEW** — **Preview drawing** shows the same framed pane without drawing controls around it. A screenshot hint and **Back to drawing** sit below the frame. Returning restores the drawing and the selected scene.

## Controls

- **Touch and mouse:** Tap for a dot or drag to make a continuous stroke. Use pointer events and capture the first active pointer. A stroke clips at the glass boundary. On re-entry, resume at the new point without connecting across the frame. Ignore additional pointers until the active pointer ends. Use `touch-action: none` on the pane only.
- **Keyboard:** Tab reaches the scene radio group, the pane, and the two actions in visual order. The scene group uses native radio controls. With the pane focused, arrows move a high-contrast brush ring in 12-unit steps. Space toggles drawing. Turning drawing on stamps a dot at the current position, and moving with drawing on clears the intervening segment. Clamp movement at the pane edges. Prevent default scrolling only for keys handled by the pane.
- **Focus:** The brush ring starts in the center and appears when the pane has keyboard focus. Blu​r, pointer input, and a hidden document lift the keyboard brush. Opening Preview focuses **Back to drawing**. Returning by button or Escape restores focus to **Preview drawing**. The normal Tab sequence remains available on both screens.
- **Targets:** Buttons and scene choices have at least 44 × 44 CSS px of hit area. Show the selected scene and keyboard focus through borders and shape as well as color.

## Pane and drawing

- Use a fixed 240 × 260 logical pane and preserve its aspect ratio. Layer sharp scene art, a blurred copy of the scene, and a pale condensation texture. Apply one clearing mask to the blur and condensation together so wiped areas reveal the sharp art.
- Paint opaque circular stamps into the mask. Each stamp has a 6-unit clear radius and a feathered edge out to 8 units. Interpolate along each stroke at intervals of at most 3 units so fast swipes remain continuous. A tap paints one stamp. Repeated marks keep the same edge profile.
- Keep the mask in memory at 2× logical resolution. Map pointer positions through the pane’s current bounding rect. Resize the displayed pane to fit the iframe and preserve the mask. Cap display canvas DPR at 2.
- **Night street:** Navy sky, two low rooftops, a warm shop window on the right, and an amber lamp on the left. The full storefront is fictional and carries no signage.
- **Dawn alley:** Blue-gray sky, a muted pink horizon, a low wall in the foreground, and a single lit upstairs window. Give both scenes points of contrast around the center so the first swipe can reveal a distinct edge or light.
- Keep cleared marks until the user resets or reloads. The art is static. Redraw on state changes and batch pointer updates into at most one `requestAnimationFrame` redraw per frame.

## Screens and visual design

### Draw

Use a dark navy background `#172331`, ivory text `#F4F0E8`, an ochre accent `#F6BC73`, and a wood-toned frame `#51392E`. Use system type and a CSS sill. The pane is the dominant element, with the scene choices above it and reset and preview actions below it. Show the keyboard hint in a reserved line when the pane has keyboard focus. Preview and reset become available after the first mark.

### Preview

Center the same illustrated frame and drawing on the dark background. Hide the brush ring. Place the capture hint and back button outside the frame so the user can crop to the artwork. Reuse the same pane rendering to preserve the scene, mask, and framing. Give the preview region an accessible label and keep the pane itself out of the Tab order.

### Small and wide frames

Use a viewport-bound layout with `100dvh` and a `100vh` fallback. Fit the pane into the space left after the text and 44 px controls. At 320 × 480, use 12 px side gutters and let the pane shrink before controls do. At desktop sizes, center the layout and cap the framed artwork at 400 CSS px wide. The page has no scroll. The still illustration also serves as the reduced-motion presentation.

## Strings

Use one `{ ko: {...}, en: {...} }` dictionary for visible text, the browser title, accessible names, and live announcements. Use a supported `?lang=ko` or `?lang=en` first. Otherwise, use Korean when `navigator.language` starts with `ko` and English for other values. Set `<html lang>` to match.

| Key | Korean | English |
|---|---|---|
| `appTitle` | 김 서린 창문 낙서 | Foggy Window Doodles |
| `drawHint` | 창문을 문지르면 골목이 보여요. | Wipe the glass to reveal the street. |
| `sceneGroup` | 창밖 풍경 | View outside |
| `night` | 밤거리 | Night street |
| `dawn` | 새벽 골목 | Dawn alley |
| `paneLabel` | 김 서린 창문 그리기 영역 | Foggy window drawing area |
| `keyHint` | 방향키로 움직이고 스페이스바로 그리기를 켜거나 꺼요. | Use the arrow keys to move and Space to turn drawing on or off. |
| `brushDown` | 그리기 켜짐 | Drawing on |
| `brushUp` | 그리기 꺼짐 | Drawing off |
| `refog` | 다시 뿌옇게 | Fog it up again |
| `refogged` | 창문이 다시 뿌옇게 됐어요. | The window is fogged up again. |
| `preview` | 그림 미리보기 | Preview drawing |
| `previewLabel` | 창문 낙서 미리보기 | Window doodle preview |
| `previewArtLabel` | 김 서린 창문에 그린 그림. 배경은 {scene}이에요. | Drawing on a foggy window. The scene is {scene}. |
| `previewHint` | 창틀 안을 화면 캡처해 친구에게 보내 보세요. | Capture the framed window to share with a friend. |
| `back` | 그림으로 돌아가기 | Back to drawing |

Announce brush toggles and reset through a polite live region. Resolve `{scene}` through `night` or `dawn`. The illustration contains no embedded text.

## localStorage

- `foggy-window-doodles:scene:v1` stores `night` or `dawn`. The default is `night`. Read and write inside `try/catch`, and validate the stored value.
- Keep the mask, brush position, and current screen in memory.

## Edge cases

- Reset lifts the brush, cancels any captured pointer, clears the mask, and keeps the scene. If Reset becomes disabled while focused, move focus to the drawing pane.
- On `pointercancel`, `lostpointercapture`, or document hide, keep marks already made and end the active stroke. The next input starts a fresh stroke.
- On resize during a stroke, end the stroke and remap input against the new pane bounds. Keep all existing marks. Rebuild the display from the same mask on orientation or DPR changes.
- A blocked storage read or write leaves scene switching fully usable for the session. An unsupported saved value falls back to `night`.
- Reload opens Draw with a fresh pane. Preview is available again after the first tap or stroke.
- For QA thumbnails, `#demo` opens Preview with the night scene and a fixed, language-neutral star doodle. The demo uses session memory and skips preference writes.

## Must not

- Keep all HTML, CSS, JavaScript, and original artwork in `index.html`. No network access, external assets or fonts, analytics, or dependencies.
- No audio, automatic refogging, countdown, score, or penalty. Leave the user in control of the drawing pace.
- No accounts, uploads, clipboard access, or persistence of drawings. Sharing uses the device’s screenshot controls.
- No real shops, trademarks, people, or copied artwork. No dialogs, pop-ups, or navigation away from the item.
- Before publishing, run `npm test`, `npm run build`, and `npm run qa -- --thumbs`. Verify the generated thumbnail shows a readable window and visible marks. Check both languages at 320 × 480 and test pointer drawing, keyboard drawing, preview return, and blocked storage.