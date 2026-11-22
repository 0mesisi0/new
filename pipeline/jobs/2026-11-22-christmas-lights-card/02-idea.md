# Idea and spec: 크리스마스 전구 카드 / Christmas Lights Card

## Concepts scored

Scores run from 1 to 5 in each column, with a maximum total of 20. Korean search and share scores are editorial estimates based on the supplied research and the proposed use case.

| Concept | Category | First 10 seconds | Originality | Korean search/share demand | One-file buildability | Total | Verdict |
|---|---|---:|---:|---:|---:|---:|---|
| **크리스마스 전구 카드 / Christmas Lights Card** | `chill` | 5 | 4 | 4 | 5 | **18** | **Picked.** One tap lights a bulb, and the finished tree becomes a Christmas greeting for a group chat. |
| 겨울 창문 불빛 퍼즐 / Winter Window Lights | `puzzle` | 4 | 3 | 3 | 5 | 15 | Tap apartment windows to reproduce a displayed light pattern. The first round is quick, with limited novelty across rounds. |
| 겨울 산책 미션 뽑기 / Winter Walk Mission Draw | `random` | 4 | 3 | 3 | 5 | 15 | Draw a small observation task such as finding three warm-colored windows. The draw is instant, while completing the mission takes a walk. |

The selected concept uses two directions from the supplied research, participatory Christmas activities and tactile interactions with an immediate payoff. `크리스마스 카드 만들기` and `크리스마스 이미지` are plausible discovery phrases. The card gives people a concrete reason to share the result. [Research notes](pipeline/jobs/2026-11-22-pending-84/01-research.md)

## Meta

slug `christmas-lights-card`

- **Category** `chill`
- **Kind** `tool`
- **Aspect** `3/4`
- **Date** `2026-11-22`
- **Tags** ko `크리스마스`, `크리스마스 카드 만들기`, `트리 꾸미기` / en `christmas`, `christmas card`, `tree decorating`
- **Title ko** 크리스마스 전구 카드
- **Title en** Christmas Lights Card
- **Desc ko** 트리 전구를 하나씩 켜고 세 가지 색으로 꾸며 보세요. 완성한 크리스마스 카드를 이미지로 저장해 친구에게 보낼 수 있어요.
- **Desc en** Light up a tree in three colors, then save your design as a Christmas card to send to a friend.
- **Howto ko** 색을 고르고 전구를 눌러 켜세요. 같은 색으로 켜진 전구를 다시 누르면 꺼져요. 카드 보기에서 완성한 이미지를 저장하세요.
- **Howto en** Pick a color and press a bulb to light it. Press a bulb in the same color again to turn it off. Open the card preview to save your image.
- **About ko** 직접 꾸민 트리로 크리스마스 인사를 전하는 작은 카드 만들기예요. 마지막 작업은 이 브라우저에만 남아요.
- **About en** Send a Christmas greeting on a tree you decorated yourself. Your latest design stays in this browser.

## Pitch

A paper-cut evergreen sits against a dark navy card with ten unlit bulbs. Choose amber, rose, or ice blue, then light the tree one bulb at a time. The first press produces a warm glow and lights the star at the top. A sample gives anyone in a hurry an editable arrangement in one press. The finished card carries `메리 크리스마스` or `Merry Christmas` above the tree and saves as a portrait image.

## Flow

1. **EDITOR** opens immediately. Amber is selected on the first visit. Tap a bulb to add its color, use `Load sample` to fill the tree, or continue from a saved draft.
2. **PREVIEW** shows the greeting and decorated tree without editor controls inside the card. `Keep editing` returns to the same arrangement.
3. **SAVE** runs from the preview. The preview stays visible while the PNG is prepared, then shows a short status message. The user can save again or return to editing.

## Controls

- **Touch and mouse:** Tap or click a color swatch, bulb, or action. Every target is at least 44 × 44 CSS px. Activate controls on release through native button clicks so a canceled touch or drag away does not change the card.
- **Keyboard:** Tab and Shift+Tab move through swatches, bulbs in top-to-bottom and left-to-right order, and actions. Space or Enter activates the focused button. Arrow keys move between swatches when a swatch has focus. Escape returns from preview to editing.
- **Focus:** Opening the preview focuses its heading. Returning to the editor restores focus to `Preview card`. Focus rings remain visible against both lit and unlit bulbs.
- **Color accessibility:** Swatches include names and a selection outline. Amber, rose, and ice blue also use a dot, diamond, and dash respectively. Lit bulbs show the matching symbol. An off bulb has a hollow center. Each bulb’s accessible label gives its number and current state.

## Screens

### Editor

- Show the localized title, one instruction, three swatches, the tree, a small lit-bulb counter, and the `Load sample`, `Turn all off`, and `Preview card` buttons.
- Use a 280 × 224 logical tree area. Bulbs are numbered by row and then from left to right. Use these centers so the 44 px hit areas fit at minimum viewport size.

| Row | Bulbs | Center coordinates |
|---|---|---|
| Top | 1–2 | `(116, 78)`, `(164, 78)` |
| Middle | 3–5 | `(92, 128)`, `(140, 128)`, `(188, 128)` |
| Bottom | 6–10 | `(44, 178)`, `(92, 178)`, `(140, 178)`, `(188, 178)`, `(236, 178)` |

- Select a swatch to change the active color. Press an off bulb or a bulb in a different color to apply that color. Press a bulb already in the active color to turn it off.
- `Load sample` applies this fixed arrangement in bulb order: amber, ice blue, rose, amber, ice blue, ice blue, rose, amber, ice blue, rose. The active swatch stays selected. The sample button is enabled for an empty tree and disabled while any bulb is lit.
- `Turn all off` clears all ten bulbs and keeps the active swatch. It is disabled when the tree is empty. `Preview card` also requires at least one lit bulb.

### Preview

- Center the portrait card. Inside the card, show the greeting and the tree with its current colors. Below it, place `Keep editing`, `Save image`, and a reserved status line.
- Set the card art to a logical 360 × 480. Center the greeting at the top, draw the same tree geometry in a 280 × 224 box centered below it, and leave room around the tree for the glow. Match the on-screen and exported card composition.
- Keep the preview visible while saving. Disable `Save image` until the current export finishes. Report that the download was requested when the download action is dispatched. If image creation fails, show the screenshot fallback message in the status line.

## Visual design

- Use night navy `#101827`, evergreen `#245944`, trunk brown `#8C5846`, off-white `#FFF4DE`, and bulb colors amber `#FFD36A`, rose `#FF91AA`, and ice blue `#A8DFFF`. Draw the tree as three overlapping paper-cut branches with a small star and a thin garland.
- Use system fonts, a strong title, and warm off-white controls with dark labels. Each bulb responds with an approximately 160 ms glow. The star stays lit while at least one bulb is on. With reduced motion enabled, changes appear immediately.
- Fill the iframe with `100vw` and `100dvh`, with `100vh` as a fallback. At 320 × 480, keep the full 280 px tree area, fit the three swatches in one row, put the two secondary editor actions side by side, and keep `Preview card` on its own 44 px row. On wider screens, center the editor and use the extra space for margins.
- Use native HTML buttons over a canvas-rendered tree. Recalculate layout on resize without changing bulb states or keyboard focus. Cap the on-screen canvas DPR at 2. Decorative art is silent and static between interactions.

## Export

- Render a 1080 × 1440 PNG at three times the logical card dimensions with the current language, greeting, and bulb colors. Use the same drawing function for preview and export. The exported image contains only the card art and greeting.
- Capture the bulb arrangement and locale at the start of the save action. Generate the blob with `canvas.toBlob`, trigger a local download named `christmas-lights-card.png`, then revoke the object URL after dispatch. If the canvas context or blob is unavailable, use the inline failure message and leave the card visible for a screenshot.

## Strings

Use a `{ ko: {...}, en: {...} }` dictionary for visible text, accessible labels, and export text. Read `?lang=ko` or `?lang=en` first. For a missing or unsupported query value, use Korean if the primary subtag of `navigator.language` is `ko`, and English otherwise. Set `<html lang>` accordingly.

| Key | ko | en |
|---|---|---|
| `title` | 크리스마스 전구 카드 | Christmas Lights Card |
| `instruction` | 색을 고르고 전구를 눌러 트리를 꾸며 보세요. | Pick a color, then press a bulb to decorate your tree. |
| `paletteLabel` | 전구 색 | Bulb color |
| `amber` | 노란빛 | Amber |
| `rose` | 분홍빛 | Rose |
| `iceBlue` | 하늘빛 | Ice blue |
| `off` | 꺼짐 | Off |
| `bulbLabel` | 전구 {n}, {state} | Bulb {n}, {state} |
| `litCount` | 전구 {n}/10개 켜짐 | {n}/10 bulbs lit |
| `sample` | 예시 꾸미기 | Load sample |
| `clear` | 모두 끄기 | Turn all off |
| `preview` | 카드 보기 | Preview card |
| `previewHeading` | 완성한 카드 | Your finished card |
| `greeting` | 메리 크리스마스 | Merry Christmas |
| `cardLabel` | 메리 크리스마스 카드, 전구 {n}/10개가 켜진 트리 | Merry Christmas card with {n}/10 bulbs lit on the tree |
| `edit` | 계속 꾸미기 | Keep editing |
| `save` | 이미지 저장 | Save image |
| `saving` | 이미지 만드는 중… | Preparing image… |
| `downloadRequested` | 이미지 다운로드를 요청했어요. | Image download requested. |
| `saveFailed` | 이미지 저장을 시작하지 못했어요. 카드를 화면 캡처로 남겨 보세요. | Couldn’t start the download. You can take a screenshot of the card. |

Visually hide the palette label and the preview heading where the artwork already establishes context. Use the status line as a polite live region. Mark the active swatch with `aria-checked` and report each bulb’s current state through its accessible label.

## localStorage

- `christmas-lights-card:v1` holds `{ "bulbs": [0,0,0,0,0,0,0,0,0,0], "color": 1 }`. Bulb values are `0` off, `1` amber, `2` rose, `3` ice blue. `color` accepts `1` through `3`.
- Restore the draft on entry and write it after actual editor changes. Wrap reads, JSON parsing, and writes in `try/catch`. Accept `bulbs` only when it contains exactly ten integers in range and validate `color` independently. Fall back to an empty tree and amber for missing or invalid fields.
- Keep the current screen and export status in memory. Every ordinary page load opens the editor.

## Edge cases

- Clearing the tree updates the counter, turns off the star, and disables preview in the same render. If focus was on the clear button, move it to bulb 1 before disabling the button. After loading the sample, also move focus to bulb 1 before disabling the sample button.
- Returning from preview retains all bulb colors and the selected swatch. Resizing, changing orientation, or returning from a hidden tab redraws from the current state. A hidden tab skips transient glow frames.
- Repeated save clicks produce at most one export while a blob is pending. If the user returns to editing during that export, discard its callback and re-enable saving on the next preview.
- A browser can block the eventual download after the click is dispatched. Keep the card visible so it remains available to capture.
- For QA thumbnails, `#demo` opens the fixed sample in preview without reading or writing the user’s draft.

## Must not

- No network access, external fonts, scripts, libraries, assets, analytics, or remote rendering. Deliver the interaction in `index.html`, with `meta.json` alongside it. Generate `thumb.png` through the repository QA command.
- No copied characters, branded ornaments, trademarks, real people, or borrowed card layout.
- No autoplay, sound, forced animation, page scrolling, modal dialogs, new windows, or navigation away from the item.
- No accounts, personalization fields, upload prompts, or automatic sharing. A user action is required to export the card.