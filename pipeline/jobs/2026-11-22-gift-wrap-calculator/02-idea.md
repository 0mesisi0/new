# Idea and spec: 선물 포장지 계산기 / Gift Wrap Calculator

## Concepts scored

Scores run from 1 to 5. Korean search and share demand scores are editorial estimates based on the supplied research and likely search phrases.

| Concept | Category | First 10 seconds | Originality | Korean search/share demand | One-file buildability | Total | Verdict |
|---|---|---:|---:|---:|---:|---:|---|
| **선물 포장지 계산기 / Gift Wrap Calculator** | **tools** | **5** | **4** | **4** | **5** | **18** | **Picked.** A prefilled box shows the cut size immediately. Roll orientation adds a practical answer for searches like `선물 포장지 크기` and `상자 포장 방법`. |
| 성에 창문 낙서 / Frost Window Doodles | chill | 5 | 3 | 3 | 5 | 16 | Trace a line through frost to reveal apartment lights. The immediate reveal fits the research on tactile play, though the gesture is close to Paper Smoother. |
| 리본 짝맞추기 / Ribbon Pair Puzzle | puzzle | 4 | 4 | 3 | 4 | 15 | Connect matching ribbon ends on a gift tag without crossing paths. The first board is quick to learn, and a solved knot gives friends something to compare. |

The selected tool takes the hands-on Christmas angle from the research into gift preparation. It fits alongside the existing cake and gathering items and adds a use case absent from the backlog.

## Meta

slug `gift-wrap-calculator`

- **Category** `tools` · **Kind** `tool` · **Aspect** `3/4` · **Date** `2026-11-22`
- **Tags** ko `선물 포장`, `포장지 크기`, `크리스마스 선물` · en `gift wrap`, `wrapping paper`, `Christmas gifts`
- **Title ko** 선물 포장지 계산기
- **Title en** Gift Wrap Calculator
- **Desc ko** 선물 상자의 가로·세로·높이와 포장지 롤 폭을 넣으면 자를 크기와 방향을 알려 줘요. 종이를 펼칠 길이와 양끝 접는 여유도 한눈에 확인하세요.
- **Desc en** Enter your gift box dimensions and roll width to see how far to unroll the paper, where to cut, and how much to leave for folding.
- **Howto ko** 상자의 가로·세로·높이와 롤 폭을 cm로 입력하세요. 자르기 그림의 방향대로 종이를 펼치고, 표시된 크기로 자르면 돼요.
- **Howto en** Enter the three box dimensions and roll width in centimeters. Follow the cutting diagram to unroll and trim the paper.
- **About ko** 직육면체 상자를 테이프로 포장할 때 쓰는 계산기예요. 이음매에는 2 cm를 겹치고, 양끝에는 접는 여유를 더해요.
- **About en** For taping paper around a rectangular box. The calculation includes a 2 cm seam overlap and room to fold both ends.

## Pitch

A marked-up sheet of wrapping paper sits beside four measurements. Change the roll width and the diagram can turn the cut rectangle sideways, showing exactly how far to pull the paper off the roll. The default example produces a usable answer as soon as the page opens.

## Flow

1. **Ready.** Open with a 20 × 12 × 6 cm box and a 50 cm roll. The result reads 38 cm across the roll × 28 cm to unroll. The diagram shows the cut rectangle and the unused strip.
2. **Editing.** Recalculate on each valid edit. While a field is incomplete or invalid, replace the result with the appropriate help text and hide the cut diagram and action. Restore the result as soon as the four fields are valid.
3. **Fits.** Show both cut dimensions and the end allowance. The short instruction under the diagram tells the user which paper edge to wrap around the box. Offer a text copy of the measurements.
4. **Too narrow.** Show the minimum roll width for the current box and keep all fields available. Typing a suitable width restores the diagram in place.
5. **Reset.** Restore the example values and clear any validation or copy message in one action.

## Controls

- Tap or click a labeled field to edit. Use four text inputs with `inputmode="decimal"` so mobile keyboards can offer a decimal separator.
- Tab and Shift+Tab follow the form, then reach the copy and reset buttons. Enter in a field commits the current edit without submitting the form. Focused buttons use native Enter and Space activation.
- Every field and button has a target at least 44 px tall. Pointer interactions use native controls. The diagram is read-only.
- Keep focus in the current field while recalculating. Mark invalid fields with `aria-invalid` and associate them with the visible message. Announce completed edits and copy feedback through separate polite live regions. Announce a calculation once when the user leaves a field or presses Enter.

## Screens

| State | Contents |
|---|---|
| Ready or valid | Title, four fields in a two-by-two grid, cut dimensions, cut diagram, end allowance, orientation instruction, copy button, and reset button |
| Incomplete or invalid | Title, form, inline help in the result panel, and reset button. Give range and format errors precedence when both error types are present. |
| Roll too narrow | Title, form, minimum roll width in the result panel, and reset button |
| Copy feedback | Keep the valid result visible and show the success or failure message beside the copy action. Clear the message on the next edit, copy attempt, or reset. |

## Cut calculation

Use millimeters internally. Accept 1 to 300 cm inclusive in each field, with up to one fractional digit. Trim outer whitespace and accept a single `.` or `,` decimal separator. Accept only digits with an optional fractional part. A lone separator or a trailing separator is incomplete.

Treat the smallest of the three box dimensions as the box height `h`, since the box can be laid on its largest face. Call the two remaining sides `a` and `b`, with `a ≥ b`. Show a short orientation note when this changes the entered height.

- End allowance per side `f = ceil(h / 2) + 10` mm. Together, the two main end flaps overlap by at least 20 mm when folded toward each other.
- For each wrapping direction, let `w` be the base side that goes around the box with `h`, and `l` the side between the two open ends.
- The paper rectangle has a **wrap edge** `P = 2 × (w + h) + 20` mm and a **fold edge** `Q = l + 2 × f` mm.
- Generate layouts in this order: `(w=b, l=a)` with `P` across the roll, the same rectangle rotated, `(w=a, l=b)` with `P` across the roll, and that rectangle rotated. Rotation swaps which paper edge runs across the roll and which runs along it.
- A layout fits if its across-roll dimension is at most the entered roll width. Pick the fit requiring the shortest length to unroll, then the smaller cut area, then the first layout in generation order.
- If nothing fits, return the smallest across-roll dimension among all four layouts. Format dimensions in the selected locale with up to one fractional digit and no grouping separator.

| Box (cm) | Roll width | Output |
|---|---:|---|
| 20 × 12 × 6 | 50 cm | 38 cm across × 28 cm to unroll. Wrap using the edge across the roll. |
| 20 × 12 × 6 | 25 cm | 20 cm across × 54 cm to unroll. Wrap using the edge along the roll. |
| 20 × 12 × 6 | 19 cm | Minimum roll width is 20 cm. |
| 20 × 12 × 6.1 | 50 cm | 38.2 cm across × 28.2 cm to unroll, with 4.1 cm of fold allowance at each end. |

## Visual design

- Use warm cream `#FFF7E9`, dark ink `#262824`, pine green `#1C503D` for the paper, and coral `#A73632` for errors and fold guides. Use system UI fonts and tabular numerals for measurements.
- Draw the cutting plan with inline SVG. Across-roll width reads horizontally and unroll length vertically. A solid outline marks the cut piece, hatching marks the leftover strip, and dashed guides mark the two end flaps. Rotate the fold guides with the chosen paper rectangle. Place the dimension labels and orientation instruction in HTML so they remain legible even when the diagram is narrow.
- Keep the form and cut dimensions visible at 320 × 480. If vertical space is tight, let only the diagram and folding details scroll inside their panel, with both actions outside that panel. Center the workspace on wider screens and recompute the SVG viewport when the panel resizes.
- Use a static diagram and silent controls.

## Copy result

Copy plain text on button activation with `navigator.clipboard.writeText`. If the browser blocks it, show the inline failure message. Use the same locale and measurements as the visible result. Build the text from `appTitle`, `cut`, `across`, `unroll`, `fold`, the applicable orientation instruction, and `laidFlat` when shown.

## Strings

Use the localized Meta fields for `meta.json`. Keep the app strings below in a `{ ko: {...}, en: {...} }` dictionary, including accessible labels and copy feedback. Read `?lang=ko` or `?lang=en` first. For an absent or unsupported value, use Korean when `navigator.language` starts with `ko` and English otherwise. Set `<html lang>` and the page title to match.

| Key | ko | en |
|---|---|---|
| `appTitle` | 선물 포장지 계산기 | Gift Wrap Calculator |
| `width` | 상자 가로 (cm) | Box width (cm) |
| `depth` | 상자 세로 (cm) | Box depth (cm) |
| `height` | 상자 높이 (cm) | Box height (cm) |
| `roll` | 포장지 롤 폭 (cm) | Roll width (cm) |
| `cut` | 자를 크기 | Cut size |
| `across` | 롤 폭 방향 {across} cm | {across} cm across the roll |
| `unroll` | 펼칠 길이 {length} cm | Unroll {length} cm |
| `diagram` | 포장지 자르기 그림 | Wrapping paper cutting diagram |
| `fold` | 양끝을 접을 여유는 각각 {flap} cm예요. | Leave {flap} cm for folding at each end. |
| `wrapAcross` | 롤 폭 방향의 변으로 상자 둘레를 감싸세요. | Wrap the edge across the roll around the box. |
| `wrapAlong` | 종이를 펼친 방향의 변으로 상자 둘레를 감싸세요. | Wrap the edge along the roll around the box. |
| `laidFlat` | 가장 짧은 변이 높이가 되도록 상자를 눕혀 주세요. | Lay the box flat with its shortest side upright. |
| `missing` | 네 칸의 치수를 모두 입력하면 자를 크기가 나와요. | Fill in all four measurements to see the cut size. |
| `invalid` | 1~300 cm를 소수점 한 자리까지 입력해 주세요. | Enter 1–300 cm with up to one decimal place. |
| `tooNarrow` | 이 상자에는 폭이 {minimum} cm 이상인 포장지 롤이 필요해요. | This box needs a roll at least {minimum} cm wide. |
| `copy` | 치수 복사 | Copy measurements |
| `copied` | 치수를 복사했어요. | Measurements copied. |
| `copyFail` | 복사할 수 없었어요. 화면의 치수를 확인해 주세요. | Couldn’t copy. The measurements are still on screen. |
| `reset` | 예시 치수로 초기화 | Reset to example |

## localStorage

- `gift-wrap-calculator:v1:dimensions` holds the four numeric measurements in millimeters. Save only complete, valid data, including measurements for a roll that is too narrow.
- Wrap reads, JSON parsing, and writes in `try/catch`. Require all four stored values to be integers from 10 to 3000. Fall back to the example if any value fails validation or storage is unavailable. Reset writes the example back to the same key.

## Edge cases

- Treat an exact-width fit as valid. Omit the hatched strip when its width is zero.
- Keep the result and orientation stable for equal dimensions by applying the fixed layout order. Show the lay-flat note only when the entered height is strictly greater than the smallest dimension.
- Hide stale cut and copy data immediately when an entry becomes incomplete. Recompute from the current fields on copy activation.
- Recalculate layout from the same measurements when the iframe resizes. Keep input values and focus through viewport changes, including when the mobile keyboard opens.
- Verify the four worked examples, equal-side ties, blocked storage, clipboard rejection, and keyboard-only navigation in both languages. Before publishing, run `npm test`, `npm run build`, and `npm run qa -- --thumbs`. Check the generated thumbnail shows the default cut and diagram.

## Must not

- No external assets, fonts, libraries, requests, analytics, or tracking. Ship the item as one self-contained `index.html`, with separate `meta.json` and a QA-generated `thumb.png`.
- No real brands, people, copied artwork, or third-party interfaces.
- No price estimates, store inventory, or dimensions for irregular packages and diagonal wrapping.
- No page-level scrolling, sound, modal dialogs, new windows, or navigation away from the item.