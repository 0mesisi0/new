# Idea and spec: 선물 포장지 크기 계산기 / Gift Wrap Size Calculator

## Concepts scored

Each score is 1–5. Korean search and share scores are editorial estimates based on the seasonal hooks in the research brief.

| Concept | Category | First 10 seconds | Originality | Korean search/share demand | One-file buildability | Total | Verdict |
|---|---|---:|---:|---:|---:|---:|---|
| **선물 포장지 크기 계산기 / Gift Wrap Size Calculator** | **tools** | **5** | **4** | **4** | **5** | **18** | **Pick.** A worked example shows where to cut immediately. `선물 포장지 크기` and `상자 포장지 재단` match the practical holiday use case. |
| 조용한 대기실 / Quiet Waiting Room | chill | 4 | 4 | 3 | 4 | 15 | Tap a radiator, window or clock to mix a quiet winter room. The ambience takes a few seconds to appreciate. |
| 소원 도장 찍기 / Wish Stamp | arcade | 5 | 4 | 3 | 4 | 16 | Time a moving stamp to center it on five blank New Year cards. A finished sheet of crooked stamps makes a good screenshot. |

## Meta

slug `gift-wrap-size-calculator`

- Category `tools`, kind `tool`, aspect `3/4`, date `2026-11-22`
- Korean tags `선물 포장`, `포장지 크기`, `크리스마스 선물`
- English tags `gift wrapping`, `wrapping paper`, `Christmas gifts`

| Field | ko | en |
|---|---|---|
| title | 선물 포장지 크기 계산기 | Gift Wrap Size Calculator |
| desc | 선물 상자의 가로, 세로, 높이를 입력하면 자를 포장지 크기가 바로 나와요. 상자 방향을 바꿔 두 가지 재단 크기를 비교해 보세요. | Enter your gift box dimensions to get a wrapping paper cut size. Turn the box to see how the two cuts differ. |
| howto | 상자 바닥의 가로와 세로, 그리고 높이를 cm로 입력하세요. 그림에서 재단 방향을 확인하고, 필요하면 상자 방향을 바꿔 보세요. | Enter the two base dimensions and height in cm. Check the cutting diagram and turn the box to try the other layout. |
| about | 직육면체 상자를 종이로 감싸고 양끝을 접는 기본 포장법을 기준으로 계산해요. 이음매와 양끝에 접을 여유를 넣었어요. | The estimate uses a basic rectangular-box wrap, with extra paper for the seam and the folds at both ends. |

## Pitch

A sheet of wrapping paper sits under a small illustrated gift box. The first view already shows how a 20 × 12 × 6 cm box fits a 38 × 28 cm cut. Edit the three measurements and the cut size updates immediately. Turn the box to find a cut that works better with the sheet or roll you have. Copy the two measurements to a shopping note or message.

## Flow

1. **Calculator.** Open with the example or the last valid measurements. The result and cutting diagram appear above the fold. Changing a complete, valid measurement updates both in place.
2. **Turn the box.** Toggle which base dimension runs between the folded ends. Keep the field labels and values fixed so the user can still read the measurements off the box. Update the diagram and cut size together.
3. **Correct an entry.** If any field becomes incomplete or invalid, replace the result with an inline correction state and disable turning and copying. Restore the result as soon as all three entries are valid.
4. **Copy the cut size.** Copy one localized line and show confirmation beside the button. If clipboard access fails, open an inline panel with the same line selected for manual copying. Close the panel to return to the result.
5. **Try the example.** Restore the three sample dimensions and the default orientation in one action.

## Controls

- Tap or click the fields and buttons. Keep native input selection, paste, Tab and Shift+Tab, and Space or Enter on focused buttons. Provide no global keyboard shortcuts.
- Use labeled text inputs with `inputmode="decimal"` so mobile users can enter fractional centimeters without browser-specific number spinners. Use native button activation for touch, mouse and keyboard. Interactive targets are at least 44 × 44 CSS px.
- Keep focus in the edited field during recalculation. Use a visible focus ring, `aria-invalid` and `aria-describedby` for field errors, and a polite live region for settled results and copy feedback. Announce a result after 400 ms without input or on blur, whichever comes first.
- Expose rotation as the `turn` toggle with `aria-pressed`. Use `orientationA` and `orientationB` as visible text. Keep decorative SVG elements out of the accessibility tree and use `diagramSummary` for the equivalent explanation.

## Cut dimensions

The two base fields are **Width** (`W`) and **Length** (`L`). Height is `H`. In the default orientation, paper wraps around the width and height, with the two end folds along the length. In the turned orientation, swap `W` and `L` for the calculation only.

| Paper dimension | Formula in cm | Meaning |
|---|---|---|
| Wrap side | `2 × (across + H) + 2` | One turn around the box, plus 2 cm of seam overlap. |
| Fold side | `along + H + 2` | The distance between the box ends, plus `H / 2 + 1` cm at each end. |

Round **each result** up to the nearest 0.5 cm. Parse the inputs as integer tenths of a centimeter, do the calculation in tenths, and round each output up to a multiple of five tenths. Display whole centimeters without `.0`.

- Example, default orientation: `across = 12`, `along = 20`, `H = 6` → **38 × 28 cm**.
- Example, turned orientation: `across = 20`, `along = 12`, `H = 6` → **54 × 20 cm**.
- Always list the wrap side first and the fold side second. Keep this order on the result, diagram and copied line.

## Screens and visual design

| Screen or state | Contents and behavior |
|---|---|
| Calculator, valid | Title, short instruction, three fields in one row, result card, diagram, note, and action buttons. The result card shows `sample` when the three values equal the example dimensions. Use `orientationA` or `orientationB` beneath the cut size. |
| Calculator, editing or invalid | Reserve the result card’s space and show `waiting` inside it. Keep the diagram’s paper outline and hide its measurements. On blur, show the relevant field error below the field row as `{field}: {error}`. If several fields have errors, display the first blurred invalid field in width, length, height order. Keep all blurred invalid fields visibly marked and give each its own accessible error association. Example remains enabled. |
| Manual copy | Replace the diagram and note with a read-only text field, the `manualCopy` instruction, and a Close button. Focus and select the text on entry. Closing returns focus to Copy. Any measurement change or rotation dismisses the panel while preserving focus on the control the user just operated. |

Use warm linen `#FAF3E6` for the background, deep pine `#173F35` for type and primary controls, paper pink `#F4C9BF` for the sheet and dark red `#9D3B35` for the seam and errors. Use system UI type, with tabular numerals on the result. Draw an original inline SVG with a horizontal wrap-side arrow, a vertical fold-side arrow, a dashed seam and two shaded fold zones. Give the diagram an explicit `diagramNote` because the illustration uses fixed proportions for readability.

At 320 × 480, use 12 px side padding, compact spacing, one row of numeric fields and two action rows. Keep the cut size and controls visible as the diagram shrinks. On a wide display, center the workspace with the diagram beside the fields and result. Fill the iframe, adapt to resize and keep the page free of scrolling. Rotation may crossfade the diagram over 120 ms. Use an instant redraw with reduced motion or when the document is hidden. The tool is silent.

## Copy

On Copy, write `copyLine` with `navigator.clipboard.writeText` from the button activation. Show `copied` on success. If the API is missing or rejects, switch to the manual copy panel. Bind each copy attempt to the current result and ignore stale feedback if the dimensions or orientation change before it resolves. Clear feedback on the next edit, rotation or example reset.

## Strings

Use one `{ ko, en }` dictionary for page text, accessible labels, dynamic messages and clipboard output. Honor `?lang=ko` and `?lang=en`, fall back to Korean if `navigator.language` begins with `ko` and to English otherwise. Set `<html lang>` and the document title accordingly.

| Key | ko | en |
|---|---|---|
| title | 선물 포장지 크기 계산기 | Gift Wrap Size Calculator |
| intro | 상자 크기를 입력하면 자를 포장지 크기가 나와요. | Enter your box dimensions to see how much paper to cut. |
| width | 가로 | Width |
| length | 세로 | Length |
| height | 높이 | Height |
| unit | cm | cm |
| fieldLabel | {field}(cm) | {field} in cm |
| sample | 예시 상자 | Example box |
| result | 포장지 재단 크기 | Paper cut size |
| size | {wrap} × {fold} cm | {wrap} × {fold} cm |
| orientationA | 가로를 감싸고 세로 양끝을 접어요. | Wrap around the width and fold over the ends along the length. |
| orientationB | 세로를 감싸고 가로 양끝을 접어요. | Wrap around the length and fold over the ends along the width. |
| wrapSide | 감싸는 쪽 {wrap} cm | Wrap side {wrap} cm |
| foldSide | 접는 쪽 {fold} cm | Fold side {fold} cm |
| diagramSummary | 감싸는 쪽 {wrap} cm, 접는 쪽 {fold} cm. {orientation} | Wrap side {wrap} cm, fold side {fold} cm. {orientation} |
| diagramNote | 그림은 재단 방향을 보여 줘요. | Diagram is for orientation and is not to scale. |
| allowance | 이음매와 양끝을 접을 여유를 포함했어요. | Includes extra paper for the seam and end folds. |
| turn | 상자 방향 바꾸기 | Turn box |
| example | 예시 넣기 | Use example |
| copy | 크기 복사 | Copy size |
| copied | 재단 크기를 복사했어요. | Cut size copied. |
| copyLine | 포장지 {wrap} × {fold} cm (감싸는 쪽 × 접는 쪽) | Wrapping paper {wrap} × {fold} cm (wrap side × fold side) |
| manualLabel | 복사할 재단 크기 | Cut size to copy |
| manualCopy | 선택된 텍스트를 기기의 복사 기능으로 복사해 주세요. | Use your device’s copy command to copy the selected text. |
| close | 닫기 | Close |
| waiting | 상자 치수 세 가지를 모두 입력해 주세요. | Enter all three box dimensions to see the cut size. |
| required | 치수를 입력해 주세요. | Enter a dimension. |
| format | 숫자를 소수 첫째 자리까지 입력해 주세요. | Enter a number with up to one decimal place. |
| range | 1~500 cm 사이로 입력해 주세요. | Enter a value from 1 to 500 cm. |
| errorLine | {field}: {error} | {field}: {error} |

## localStorage

- `gift-wrap-size-calculator:v1` stores `{ width, length, height, turned }`, with dimensions as integer tenths of a centimeter and `turned` as a boolean.
- Read, parse and write inside `try/catch`. Save on valid field blur, rotation or example reset. Load only a complete, valid object. The fallback is `{ width: 120, length: 200, height: 60, turned: false }`.
- Keep incomplete input and copy status in memory.

## Edge cases

- Accept `1` through `500` cm inclusive, with up to one fractional digit. Trim surrounding whitespace and accept a single dot or comma as the decimal separator. Accept `.5` as a numeric form and reject it through the range check. Reject signs, grouping separators, exponent notation and appended units. A trailing decimal separator stays incomplete while editing and shows a format error on blur.
- Suspend validation and updates during input composition. Revalidate at composition end. A partial or invalid value must never leave an old cut size available to copy.
- A square base returns the same dimensions in either orientation. The orientation text and illustration still follow the toggle.
- The result is an estimate for an ordinary rectangular box wrapped with flexible paper. The formula includes seam and fold allowances and assumes the user measures the outside edges.
- Blocked storage, malformed saved data, clipboard denial and resizing the iframe all leave the calculator usable. Resize changes layout only.
- With `#demo`, open on the default example even if saved measurements exist, and skip storage writes for that session so thumbnail capture leaves saved values intact.
- Before publishing, run `npm test`, `npm run build`, and `npm run qa -- --thumbs`. Check both iframe languages, both example outputs, the 320 × 480 layout and the manual copy fallback. Use the QA-generated `thumb.png`.

## Must not

- No network calls, analytics, external assets or fonts. Keep the UI, styles, artwork and logic in `items/gift-wrap-size-calculator/index.html`, with site metadata in `meta.json`.
- No real brands, people, copied artwork or imitation of another calculator’s interface.
- No automatic clipboard writes, popups, dialogs, navigation or sound.
- No guarantees for irregular boxes, thick materials or decorative folds.