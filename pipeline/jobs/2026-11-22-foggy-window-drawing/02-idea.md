# Idea and spec: 겨울 창문 김서림 그림 / Draw on a Foggy Window

## Concepts scored

Scores are 1–5 for value in the first 10 seconds, originality, Korean search/share demand, and buildability in one HTML file. Maximum 20. Demand scores are planning estimates based on the supplied research and backlog. The research offers limited recent evidence, and the brief lists no votes.

| Concept | Category | First 10 seconds | Originality | Korean search/share | Buildability | Total | Rationale |
|---|---|---:|---:|---:|---:|---:|---|
| **겨울 창문 김서림 그림 / Draw on a Foggy Window** | **chill** | **5** | **4** | **4** | **5** | **18** | One stroke reveals a warm winter street through the glass. The drawing doubles as a shareable image. Search hypotheses are `창문 김서림 그림` and `겨울 손그림`. |
| N빵 계산기 / Split the Bill | tools | 4 | 2 | 5 | 5 | 16 | The backlog’s bill splitter can immediately show each person’s share, including a separate split for a shared extra. `N빵 계산기` expresses a direct search intent. |
| 김밥 도시락 퍼즐 / Kimbap Lunchbox Puzzle | puzzle | 4 | 4 | 3 | 4 | 15 | Place three pairs of kimbap slices into a six-slot lunchbox by matching fillings to the dividers. A single placement teaches the rule. Several boards would need checking for solvability. |

**Picked** — Draw on a Foggy Window puts the tactile idea from research row 6 into the first gesture. The revealed street makes each stroke visible immediately and gives users something personal to save. [Supplied research](01-research.md)

## Meta

slug `foggy-window-drawing`

| Field | Value |
|---|---|
| category | `chill` |
| kind | `tool` |
| aspect | `9/16` |
| date | `2026-11-22` |
| tags ko | `겨울`, `창문 김서림`, `손그림` |
| tags en | `winter`, `foggy window`, `drawing` |
| title ko | 겨울 창문 김서림 그림 |
| title en | Draw on a Foggy Window |
| desc ko | 뿌옇게 김이 서린 창문에 손가락으로 그림을 그려 보세요. 선을 따라 겨울 골목의 불빛이 드러나고, 완성한 그림은 이미지로 저장할 수 있어요. |
| desc en | Trace a picture on foggy glass to reveal a warmly lit winter street. Save your finished window as an image. |
| howto ko | 유리를 누르거나 문질러 김을 닦아 보세요. 키보드는 방향키로 움직이고 스페이스바로 그리기를 켜고 끌 수 있어요. |
| howto en | Tap or drag to wipe the glass. With a keyboard, use the arrow keys to move and Space to toggle drawing. |
| about ko | 겨울 저녁, 창문에 손가락으로 낙서하던 순간을 옮겼어요. 그림은 이미지로 저장할 때까지 현재 화면에만 남아요. |
| about en | A little drawing toy inspired by doodling on cold glass. Your drawing stays on this screen until you save it as an image. |

## Pitch

A fogged square window fills most of the screen. Amber lights are faintly visible through the blue-gray glass. A tap clears a round spot. A drag reveals a sharp slice of the street underneath, with lit windows, snowy roofs, and a streetlamp. The user can write a greeting, draw a shape, or simply uncover the scene. **Save image** captures the pane as a square PNG. **Fog again** gives the user a fresh pane.

## Flow

1. **Fresh pane** — The title, one-line instruction, window, and two buttons appear on load. The pane is ready for input. Both buttons are disabled until the first mark. A first tap or keypress reveals the scene in the same frame as feedback.
2. **Drawing** — Marks remain in place while the user adds strokes. The same layout stays visible, with both buttons enabled. Touch, mouse, and keyboard all edit the same pane.
3. **Saving** — The current pane is captured when **Save image** is activated. The button temporarily reads **Preparing image…** and accepts no repeat activation while the PNG is being encoded. Drawing and **Fog again** remain available.
4. **Download or fallback** — A successful download request produces inline status text. If export fails or download support is detectably unavailable, the status asks the user to capture the visible pane. The user stays on the drawing screen in both cases.
5. **Fresh pane again** — **Fog again** restores the original glass and resets the keyboard brush. Both buttons return to their disabled state and the status confirms the reset.

## Controls

| Input | Action |
|---|---|
| Tap or primary click on the pane | Clear a round mark at the contact point. |
| Drag on the pane | Clear a continuous trail using pointer capture and interpolated points. End the stroke on release, cancellation, or lost capture. |
| Tab or Shift+Tab | Move through the pane and enabled buttons using native focus order. |
| Arrow keys with the pane focused | Move the visible brush cursor by 12 logical units. When drawing is on, clear the segment between the previous and new positions. |
| Space with the pane focused | Toggle drawing. Turning it on immediately clears a mark under the cursor. |
| Escape with the pane focused | Lift the brush. Leaving the pane also lifts it. |
| Enter or Space on a button | Activate the focused button using native behavior. |

Use `touch-action: none` on the pane and prevent default scrolling for handled pane keys only. Each button has a minimum 44 px tap target. Clicking or tapping the pane does not show the keyboard cursor. Show it when the pane receives keyboard focus or a drawing key is used.

## Drawing model

- Use a square logical pane of 320 × 320 units. The brush has a 13-unit radius with a soft 2-unit outer edge. Interpolate samples at most 4 units apart so fast movement leaves a continuous trail. Clip marks to the pane.
- Draw the winter street, frame, and fog locally. The starting fog is translucent enough to show muted hints of the streetlamp. Pre-render the pristine fog as a separate layer and paint clear marks into its working copy. Repeated marks remove residual fog inside the brush.
- Keep the working layers at a fixed backing resolution of 960 × 960. Map pointer coordinates from the current pane bounds into logical units. Resizing changes the display size and leaves the drawing intact. Any separate high-DPI display canvas caps `devicePixelRatio` at 2.
- A tap produces a visible mark even if the pointer never moves. There is no fade, timer, score, or sound. Redraw only when input changes the pane or its display size.

## Visual design

- A dark navy surround (`#162536`) frames blue-gray glass (`#B9CAD2`), snowy roofs (`#E4EDF0`), and amber windows (`#FFC87D`). Use original CSS and canvas shapes with system fonts.
- Put the title and instruction above the pane, two equal-width buttons below it, and a reserved two-line status area at the bottom. Use the same layout across all states, including export errors. The keyboard brush uses a light-and-dark double outline so it stays visible over clear and fogged areas.
- Size the square from both available width and available height. On a 320 × 480 iframe, use 12 px side padding, a pane up to 280 px square, and room for wrapped instructions and status. On wide screens, center the column and cap the pane at 480 CSS px. Recompute sizing on resize. The page fits without scrolling.
- Use immediate state changes, including refogging. The experience works the same under `prefers-reduced-motion`.

## Export

- Composite the street, current fog, and frame into a 960 × 960 PNG. Exclude interface text, buttons, focus outlines, and the keyboard brush. Use one original scene in both languages.
- Snapshot the pane at button activation so edits during encoding apply only to the live drawing. Use `toBlob` and an object URL with a download anchor named `foggy-window-drawing.png`. Revoke the URL after the download has been requested. Status confirms the request because the iframe cannot verify where the browser saved the file.
- Keep feedback in the reserved status area with a polite live region. Clear old save feedback on the next stroke. If the user refogs or edits the pane during encoding, suppress stale completion feedback while allowing the requested snapshot to finish.

## Strings

Use the title from **Meta** for both the document title and screen heading. Keep all interface text and accessible labels in a `{ ko, en }` dictionary. Read `?lang=ko` or `?lang=en` first. For a missing or unsupported value, use Korean when `navigator.language` starts with `ko` and English otherwise. Set `<html lang>` to the resolved language.

| Key | ko | en |
|---|---|---|
| `title` | 겨울 창문 김서림 그림 | Draw on a Foggy Window |
| `instruction` | 유리를 누르거나 문질러 김을 닦아 보세요. | Tap or drag to wipe the fog away. |
| `paneLabel` | 김 서린 창문 | Foggy window |
| `paneKeys` | 방향키로 움직이고, 스페이스바로 그리기를 켜고 끄세요. Esc 키로 그리기를 멈출 수 있어요. | Use arrow keys to move and Space to toggle drawing. Press Escape to lift the brush. |
| `brushDown` | 그리기 시작 | Brush down. |
| `brushUp` | 그리기 멈춤 | Brush lifted. |
| `save` | 이미지 저장 | Save image |
| `saving` | 이미지 준비 중… | Preparing image… |
| `downloadRequested` | 이미지 다운로드를 요청했어요. | Image download requested. |
| `saveFailed` | 이미지를 저장하지 못했어요. 창문을 화면 캡처해 주세요. | Couldn’t save the image. Take a screenshot of the window. |
| `refog` | 다시 김 서리기 | Fog again |
| `refogged` | 창문에 다시 김이 서렸어요. | The window is foggy again. |

## localStorage

- Keys: none. The current drawing and brush live in memory. Reloading starts with fresh glass. Saving creates a PNG only through the user’s explicit action.

## Edge cases

- **Pointer leaves the pane.** Keep capture during the stroke. Stop drawing at the boundary and break the segment while outside so re-entry cannot create a shortcut across the glass.
- **Second finger, cancellation, or lost capture.** Accept one active pointer. Ignore secondary contacts and clear the active stroke when the browser cancels the pointer.
- **Keyboard and pointer overlap.** Pointer activation lifts the keyboard brush before editing. Clamp keyboard movement to the pane. Suppress Space key repeats so holding Space cannot flip the drawing state repeatedly.
- **Resize or orientation change during a stroke.** Terminate that stroke, keep all marks already drawn, and use the new bounds for the next gesture.
- **Hidden tab or window loses focus.** End the active gesture and lift the keyboard brush. Keep the drawing intact.
- **Refog while a result is pending.** Restore pristine fog, center the keyboard brush, and focus the pane so keyboard users can draw again. A pending export still represents the pane at the moment it was requested.
- **Export failure.** Handle canvas encoding failure, a null blob, and detectably unsupported downloads with inline feedback. Silent browser download suppression leaves the pane available for a screenshot.
- **Thumbnail.** Verify the fresh pane shows enough street detail to read as a foggy window. Generate `thumb.png` with `npm run qa -- --thumbs`.

## Must not

- No external assets, fonts, libraries, network requests, analytics, or real brands or people. Build the item with inline HTML, CSS, and JavaScript in `items/foggy-window-drawing/index.html`, with metadata in `meta.json`.
- No imitation of an existing drawing toy’s artwork or interface.
- No automatic downloads, clipboard access, storage, dialogs, popups, or navigation away from the item.
- No page scrolling, gesture-dependent controls without keyboard equivalents, or background animation.