# Idea and spec: 겨울 창문 김서림 낙서 / Winter Window Doodle

## Concepts scored

Scores range from 1 to 5 in each column, with a maximum of 20. Korean search and share scores are editorial estimates based on the supplied research and backlog.

| Concept | Category | First 10 seconds | Originality | Korean search and share | One-file buildability | Total | Verdict |
|---|---|---:|---:|---:|---:|---:|---|
| **겨울 창문 김서림 낙서 / Winter Window Doodle** | `chill` | 5 | 4 | 3 | 5 | **17** | **Picked.** The first swipe gives immediate tactile feedback, and the finished doodle works as a shareable winter postcard. |
| 모임 N빵 계산기 / Group Bill Splitter | `tools` | 4 | 2 | 5 | 5 | 16 | Enter the total and headcount to see who pays the extra won when the bill divides unevenly. A strong search phrase with a familiar result. |
| 겨울 산책 미션 뽑기 / Winter Walk Prompt Draw | `random` | 4 | 3 | 3 | 5 | 15 | Draw a tiny observation prompt such as finding three lit windows. Easy to share, with most of the payoff arriving during the walk. |

## Meta

- slug `winter-window-doodle`
- Category `chill`, kind `tool`, aspect `3/4`, date `2026-11-22`
- Tags ko `김서림`, `겨울 감성`, `낙서`
- Tags en `fogged glass`, `winter`, `drawing`

| Field | ko | en |
|---|---|---|
| `title` | 겨울 창문 김서림 낙서 | Winter Window Doodle |
| `desc` | 김이 서린 겨울 창문을 손끝으로 문질러 보세요. 닦인 자리에 눈 내리는 골목이 드러나고, 완성한 낙서는 이미지로 저장할 수 있어요. | Draw on a fogged window to reveal a snowy lane through your strokes. Save your doodle as a winter postcard. |
| `howto` | 창문을 누르거나 문질러 김을 닦으세요. 키보드로는 방향키로 움직이고 스페이스바로 그리기를 켜거나 끌 수 있어요. 마음에 들면 이미지로 저장하세요. | Tap or drag on the glass to clear the fog. With a keyboard, use the arrow keys to move and Space to lower or lift the brush. Save your doodle as an image. |
| `about` | 겨울밤 창문에 손가락으로 낙서하던 기억을 담았어요. 그림은 이 기기에서만 처리돼요. | Inspired by finger drawings on cold winter windows. Your drawing stays on this device. |

## Pitch

A fogged window looks out onto a snowy lane. Touch the pane and a circle of fog clears to reveal the scene. Drag across it and warm window lights and blue snow appear inside the line. The user can switch brush sizes, undo the latest stroke, or fog the glass again. The postcard preview puts the drawing in a cream border ready to save as a PNG.

The pane is interactive on arrival. A first-time visitor can make a recognizable mark and open the preview within 10 seconds.

## Flow and screens

| Screen | Contents and behavior |
|---|---|
| **Editor · fresh pane** | Show the title, one-line instruction, fogged pane, brush controls, and action row. The landscape is faintly visible through the fog. The default brush is thin unless a valid saved preference exists. Undo, Fog again, and Preview are disabled until the first mark. |
| **Editor · drawing** | A press clears a round dot. A drag joins dots with a continuous, round-ended stroke. Thin and Wide switch the brush for the next stroke. Undo reverses the latest stroke once. Fog again restores the full fog immediately and clears the undo history. Preview finishes any active stroke and opens the postcard view. |
| **Postcard preview** | Show the complete composition with the postcard heading, artwork, and footer. Save image starts the PNG download. Back to drawing and Escape return to the editor with the same drawing, brush selection, and undo state. Focus returns to the Preview button. |
| **Postcard preview · saving and feedback** | While preparing the PNG, change the save label to “Preparing…” and disable repeated saves. Show an inline status after the download is requested. On failure, show inline screenshot guidance and leave Save image available for retry. The preview stays visible throughout. |

## Controls

- **Touch and mouse.** Use pointer events on the pane. Capture the first pointer through release, ignore additional pointers, and set `touch-action: none` on the pane. Tapping makes a dot. Dragging draws a continuous line.
- **Keyboard.** Tab reaches the pane and each control in reading order. On the focused pane, Arrow keys move the cursor 12 logical pixels per step. Space lowers the brush and makes a dot. Subsequent Arrow movements draw until Space lifts the brush. Leaving the pane commits and lifts the brush. Ignore repeated Space keydown events. Prevent default scrolling only for Arrow and Space events handled by the pane. Buttons use native Enter and Space activation.
- **Focus and state.** Show a high-contrast focus outline and a visible keyboard cursor, initially centered. Represent brush selection with pressed buttons. Move focus to the postcard heading when preview opens. Return focus to Preview when it closes. Use a polite live region for action feedback.
- **Targets.** Every button has a minimum 44 × 44 CSS px target. Keep page zoom available outside the drawing pane.

## Drawing and postcard layout

- Use a 360 × 360 logical pane with two layers. Draw the lane once in Canvas 2D using a few roof silhouettes, snowbanks, and amber windows. Draw the fog in a second canvas. Erase the fog mask with round caps and `destination-out`. Use logical brush diameters of 16 px and 34 px.
- Save one copy of the fog mask before each stroke. Treat a press and all subsequent movement through release as one stroke. For keyboard drawing, treat brush-down through brush-up as one stroke. Undo restores the saved mask and consumes the snapshot. If it undoes the first stroke, disable Undo, Fog again, and Preview.
- Keep drawing coordinates in logical pixels. Fit the pane to the available width and height on resize without stretching the artwork. Cap display canvas DPR at 2.
- Fill the iframe using `100dvh` with a `100vh` fallback. Center a column up to 460 CSS px wide. At 320 × 480, reserve room for the header, status, and two control rows, then shrink the pane to fit. Use 12 px side padding, allow text to wrap, and keep the whole page free of scrolling.
- Use a deep navy background `#162338`, fog `#B8C7D1`, snow `#DFEAF4`, amber window lights `#FFC879`, and postcard stock `#FBF4E7`. Use system-ui and warm, high-contrast text. The artwork is static. Any brief button feedback should respect `prefers-reduced-motion`. The item is silent.

## Export

- Render the preview and the PNG from the same 720 × 880 composition. Use 36 px horizontal margins, a 648 × 648 artwork area beginning at y = 112, a centered heading above it, and the brand footer below it. Export the current scene and fog mask as displayed in the preview.
- Use `canvas.toBlob` with `image/png` and a temporary object URL for an anchor download named `winter-window-doodle.png`. Remove the anchor and revoke the URL after the download request has had time to start. Report the request as started because the browser controls where the file goes.
- Keep the postcard preview open when an error occurs so the user can capture it. Controls and status messages stay outside the exported composition.

## Strings

Use a `{ ko: {...}, en: {...} }` dictionary for all interface text and the localized artwork. Read `?lang=ko` or `?lang=en` first, then use Korean if `navigator.language` starts with `ko` and English otherwise. Set `<html lang>` and the document title accordingly.

| Key | ko | en |
|---|---|---|
| `appTitle` | 겨울 창문 김서림 낙서 | Winter Window Doodle |
| `editorHint` | 창문을 문질러 겨울 골목을 드러내 보세요. | Wipe the glass to reveal a snowy lane. |
| `paneLabel` | 김이 서린 창문 | Fogged window |
| `paneKeys` | 방향키로 움직이고 스페이스바로 그리기를 켜거나 끄세요. | Use the arrow keys to move. Press Space to lower or lift the brush. |
| `brushLabel` | 붓 굵기 | Brush size |
| `thin` | 가늘게 | Thin |
| `wide` | 굵게 | Wide |
| `undo` | 되돌리기 | Undo |
| `refog` | 김 다시 채우기 | Fog again |
| `preview` | 미리보기 | Preview |
| `undone` | 마지막 획을 지웠어요. | Last stroke undone. |
| `refogged` | 창문에 김이 다시 찼어요. | The glass is fogged again. |
| `previewTitle` | 엽서 미리보기 | Postcard preview |
| `previewImageLabel` | 김서림 낙서가 담긴 겨울 엽서 | Winter postcard with your window doodle |
| `postcardHeading` | 겨울 창가에서 | From a Winter Window |
| `postcardFooter` | 하루한판 | Daily Toybox |
| `back` | 그림으로 돌아가기 | Back to drawing |
| `save` | 이미지 저장 | Save image |
| `saving` | 이미지 준비 중… | Preparing image… |
| `saveStarted` | 이미지 다운로드를 시작했어요. | Image download started. |
| `saveFailed` | 이미지를 저장하지 못했어요. 미리보기 화면을 캡처해 주세요. | Could not save the image. Take a screenshot of the preview. |

## localStorage

- `winter-window-doodle:brush` holds `thin` or `wide`. Default to `thin` for missing or invalid values. Read and write inside `try/catch`. Keep the selected brush in memory if storage is blocked.
- Drawing data and undo history live in memory for the current page session.

## Edge cases

- A tap or brush-down marks immediately. Clamp keyboard movement to the pane and clip pointer strokes at the glass edge. On `pointercancel`, lost capture, or a hidden document, commit the visible stroke and release input so drawing never gets stuck.
- If a resize happens mid-stroke, commit that stroke before remapping coordinates. Preserve the mask and undo snapshot across resize and preview.
- Finish a stroke before switching brush size or opening the preview. Track each save request so a late callback cannot overwrite the status of a newer preview.
- If `toBlob` returns `null` or the download request throws, restore the Save image button and announce `saveFailed`. A browser that silently blocks the download may still show `saveStarted`, which reports the request only.
- Verify the item in both languages at 320 × 480, with touch, mouse, and keyboard. Check that one tap makes a dot, Undo restores the initial pane, resizing preserves the drawing, and the PNG matches the preview. Run `npm test`, `npm run build`, and `npm run qa -- --thumbs`. Check that the generated thumbnail shows the pane and its controls.

## Must not

- No network requests, external assets, fonts, analytics, or permissions. Keep all runtime HTML, CSS, JavaScript, and artwork in `index.html`.
- No copied game art, trademarks, real people, or recognizable storefronts.
- No timer, score, automatic refogging, or audio. Marks persist until the user clears them, undoes them, or leaves the page.
- No account, upload, automatic sharing, or persistent drawing history.
- No `alert`, `confirm`, `prompt`, `window.open`, or navigation away from the item.