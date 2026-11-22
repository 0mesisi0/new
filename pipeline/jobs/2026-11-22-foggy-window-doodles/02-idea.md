# Idea and spec: 창문 김서림 낙서 / Foggy Window Doodles

## Concepts scored

Scores run from 1 to 5 per criterion, for a maximum of 20. Search and share scores are editorial estimates based on the seasonal hooks in `01-research.md` and the appeal of each result.

| Concept | Category | Value in first 10 seconds | Originality | Korean search and share demand | Builds in one HTML file | Total |
|---|---|---:|---:|---:|---:|---:|
| **창문 김서림 낙서 / Foggy Window Doodles** — swipe a fogged window to uncover warm lights and draw a message | `chill` | 5 | 4 | 4 | 5 | **18** |
| 크리스마스 케이크 가격 비교 / Christmas Cake Price Compare — enter two cake prices and their serving counts to compare cost per person | `tools` | 3 | 3 | 5 | 5 | 16 |
| 어묵 꼬치 받기 / Fish Cake Catch — slide a paper cup beneath a stall counter to catch falling skewers before time runs out | `arcade` | 5 | 3 | 3 | 5 | 16 |

**Picked** — Foggy Window Doodles. The first swipe reveals a warm street scene immediately. After a few strokes, the window becomes an image worth sending to a friend. The concept uses the research brief’s winter and tactile themes and introduces freehand drawing to the catalog.

## Meta

slug `foggy-window-doodles`

- Category `chill`, kind `tool`, aspect `3/4`, date `2026-11-22`
- Tags — ko `김서림`, `겨울 창문`, `낙서` · en `foggy-window`, `winter`, `doodle`

| Field | ko | en |
|---|---|---|
| `title` | 창문 김서림 낙서 | Foggy Window Doodles |
| `desc` | 김이 서린 창문을 손끝으로 문질러 겨울 골목의 불빛을 드러내 보세요. 그림이나 짧은 인사말을 남기고 이미지로 저장할 수 있어요. | Trace a doodle on a foggy window to reveal a warmly lit winter street. Save your sketch as an image. |
| `howto` | 창문을 누르거나 문질러 김을 닦아 보세요. 키보드로는 창문에 초점을 두고 방향키로 움직이고, 스페이스바로 그리기를 켜고 끄세요. | Tap or drag on the glass to clear the fog. With the window focused, use the arrow keys to move and Space to toggle drawing. |
| `about` | 겨울밤, 집으로 돌아가는 길에 본 골목을 떠올리며 그린 창문이에요. 새로 그릴 때는 다시 김을 서리게 할 수 있어요. | The scene is inspired by the walk home on a winter night. Fog up the glass whenever you want a fresh window. |

## Pitch

A square window looks out onto a blue winter street with amber doorways and snow along the rooflines. The view is muted by condensation. A tap leaves a round clear spot, and a drag opens a continuous trail. A small heart, a name, or a crooked snowman reveals a different arrangement of lights through the same window.

The window is ready on load. The experience is silent and untimed. The player can save the current window as a PNG or fog it up and start drawing again.

## Flow

1. **Fresh window.** Show the title, a one-line instruction, the fogged pane, and the brush and image controls. The first stroke reveals the street under the fog.
2. **Drawing.** Keep the window and controls in place as the drawing grows. Brush changes apply to the next stroke. The player can continue drawing after saving.
3. **Saving.** Snapshot the current window when `Save image` is activated. While the PNG is encoding, show the saving label on that button. Report success or failure inline in the same view.
4. **Refogging.** `Fog up the glass` restores the whole pane to its starting state in one action and keeps the selected brush width. The next stroke works immediately.

## Controls

| Input | Behavior |
|---|---|
| Touch, mouse, or pen | Press inside the pane to clear a dot. Move while pressed to draw a round-ended trail. Capture one primary pointer through release, and clip paint to the glass. |
| `Tab` / `Shift+Tab` | Move through the pane, brush control, fog button, and save button in document order. Show a visible focus ring. |
| Arrow keys on the focused pane | Move the cursor by 8 logical pixels per key event. Clamp to the pane edges. When drawing is on, clear the segment between the old and new cursor positions. |
| `Space` on the focused pane | Toggle keyboard drawing. Turning it on clears a dot at the cursor. Ignore repeated Space events from a held key. |
| `Enter` / `Space` on a focused button | Activate the native button. |

Place the keyboard cursor at the center on first focus. Keep its position during the drawing session. Leaving the pane ends keyboard drawing. Pointer contact also ends keyboard drawing and takes over at the contact point. Suppress default arrow and Space behavior only when the pane handles those keys. Set `touch-action: none` on the pane and give each control a minimum 44 × 44 px target.

## Screens and states

| State | Contents and feedback |
|---|---|
| Fresh window | Title, drawing hint, pane, brush button, and disabled fog and save buttons. The blurred street is visible through the condensation so the first mark has a clear payoff. |
| Drawing | Same layout. The clear marks stay in place until reset. Fog and save become available after the first mark. A keyboard-focused pane shows a cursor with distinct outlined and filled states for drawing off and on. |
| Saving | The window stays interactive. The save button is temporarily disabled and displays `Preparing image…`. The pending image uses the snapshot taken at activation. |
| Save success or failure | A single status line below the controls reports that the download started or offers the screenshot fallback. It is announced through a polite live region. The window and its marks remain available. |
| Refogged window | Restore fresh-window controls, center the keyboard cursor, and turn keyboard drawing off. Announce `The glass is fogged up again.` in the status line. |

Use one fixed-height iframe layout with all controls available at 320 × 480. Give the pane a square footprint sized from the space left after header, controls, and status. Let the three controls wrap into two rows on narrow screens. Show the compact keyboard hint while the pane has keyboard focus, in space reserved in the layout.

## Drawing and visual design

- Draw the street once in a normalized 240 × 240 logical coordinate space. Use simple original silhouettes for three buildings, soft amber doorway light, and a pale strip of settled snow. Use a deep blue surround (`#172638`), cool gray-blue fog (`#B9CAD4`), and warm light (`#FFD28E`).
- Render the street beneath a separate fog layer. Clear the fog layer with round dots and connected segments using `destination-out`. Use brush diameters of 14 and 28 logical pixels. The brush button displays the current width and switches between the two sizes.
- Keep the canonical fog mask at 480 × 480 pixels. Map the displayed pane back to logical coordinates so resizing preserves the drawing. Scale the visible canvas backing store with `devicePixelRatio`, capped at 2. Batch visible redraws with `requestAnimationFrame` when the image or cursor changes.
- Use a dark frame around the glass, system UI type, and a visible focus outline against both cleared and fogged areas. The clear strokes provide the visual feedback. The scene and interface remain still when idle.

## Export

On save, composite the current street and fog mask into a separate 480 × 480 canvas. Include only the pane artwork, with the fog fully opaque over the street wherever appropriate. The cursor, focus outline, controls, and status stay outside the image. Encode with `canvas.toBlob` as `image/png`, then trigger a same-document download named `foggy-window-doodles.png` via a temporary object URL. Revoke the URL after the download click has had time to start.

Treat a null blob, thrown error, or unavailable download mechanism as failure and show the inline screenshot fallback. Report `Download started.` once a download click is issued. Use the snapshot captured at activation even if the player draws or refogs during encoding.

## Strings

Keep the complete interface dictionary under `ko` and `en`. Select a supported `?lang=ko` or `?lang=en` first, then use Korean for a `ko` browser locale and English otherwise. Set `<html lang>` and use `appTitle` for the document title.

| Key | ko | en |
|---|---|---|
| `appTitle` | 창문 김서림 낙서 | Foggy Window Doodles |
| `drawHint` | 창문을 문질러 그림을 그려 보세요. | Trace a doodle on the glass. |
| `paneLabel` | 김이 서린 창문 | Foggy window drawing area |
| `keyboardHint` | 방향키로 이동 · 스페이스바로 그리기 켜기 또는 끄기 | Arrow keys to move · Space to toggle drawing |
| `keyboardDrawOn` | 그리기 켜짐 | Drawing on |
| `keyboardDrawOff` | 그리기 꺼짐 | Drawing off |
| `brushThin` | 가는 선 | Thin brush |
| `brushWide` | 굵은 선 | Wide brush |
| `brushThinLabel` | 가는 선 사용 중. 굵은 선으로 바꾸기 | Thin brush selected. Switch to wide brush |
| `brushWideLabel` | 굵은 선 사용 중. 가는 선으로 바꾸기 | Wide brush selected. Switch to thin brush |
| `refog` | 다시 김 서리기 | Fog up the glass |
| `refogged` | 창문에 다시 김이 서렸어요. | The glass is fogged up again. |
| `save` | 이미지 저장 | Save image |
| `saving` | 이미지 준비 중… | Preparing image… |
| `downloadStarted` | 다운로드를 시작했어요. | Download started. |
| `saveFailed` | 이미지를 저장할 수 없어요. 화면을 캡처해 주세요. | Could not save the image. Please take a screenshot. |

Use `paneLabel` as the pane’s accessible name and associate it with `keyboardHint`. Announce keyboard drawing changes and save/reset feedback through the same polite status region. Keep the filename language-neutral.

## localStorage

- `foggy-window-doodles:brush` stores `thin` or `wide`. Default to `thin` for missing or invalid values. Wrap reads and writes separately in `try/catch`.
- Keep the fog mask, keyboard cursor, and save status in memory. Each new page load starts with a fresh window.

## Edge cases

- A single tap or click leaves a dot. Fast movement fills the gaps between consecutive samples. End the active stroke when the pointer leaves the pane and begin a fresh segment if it re-enters while held, so an off-pane movement cannot erase a diagonal across the glass.
- On `pointercancel`, lost pointer capture, window blur, or `document.hidden`, end active input and clear keyboard drawing mode. Preserve the marks already made and redraw from the current mask when visible.
- Ignore extra pointers on the pane. If resize, save, or refog interrupts an active pointer stroke, end the stroke and require a fresh press before drawing resumes.
- Clear or replace the previous status when a new save or refog action begins. If the glass is reset while a save is pending, the earlier image can still download. Its completion must leave the newer reset status in place.
- Storage denial leaves drawing, refogging, and export usable with the in-memory brush setting. Unsupported language values use the locale fallback. Export failure preserves the drawing.
- Before publishing, run `npm test`, `npm run build`, and `npm run qa -- --thumbs`. Verify both locales at 320 × 480, draw and reset with pointer and keyboard, and open an exported PNG to check the crop and content. Check the generated thumbnail shows the fogged street and usable controls.

## Must not

- No network requests, external scripts, fonts, asset URLs, analytics, or uploads. Keep the drawing, interface, and export logic in `index.html`.
- No copied artwork, branded storefronts, real people, or likenesses. Draw the street with original canvas shapes.
- No timers, scores, automatic refogging, or background audio.
- No page scrolling, modal dialogs, pop-ups, or navigation away from the item.