# Idea and spec: 선물 포장지 크기 계산기 / Gift Wrap Size Calculator

## Concepts scored

Scores run from 1 to 5 in this order: value in the first 10 seconds, originality, Korean search or share demand, and buildability in one HTML file. Maximum 20. Demand scores are editorial estimates based on the seasonal hooks in `01-research.md`. The research gives no search-volume figures for these concepts, and the brief lists no votes.

| Concept | Category | Score | Verdict |
|---|---|---|---|
| **선물 포장지 크기 계산기 / Gift Wrap Size Calculator** — enter box dimensions and roll width to see how much paper to cut and which way to turn it. | **`tools`** | **5 / 4 / 4 / 5 = 18** | **Picked.** A worked example delivers the answer on load. `선물 포장지 크기` and `상자 포장지 계산` describe a concrete holiday task. |
| 귤 탑 균형 잡기 / Tangerine Tower — drop tangerines onto a wobbling fruit plate and see how many stay on through a three-second countdown. | `arcade` | 5 / 3 / 3 / 4 = 15 | The first drop pays off immediately. The balancing mechanic is distinct from the peel puzzle, but stacking games are familiar and phone controls need tuning. |
| 장갑 짝 뽑기 / Mitten Pair Draw — draw two illustrated mittens and reveal the tiny winter outing hidden in their combined pattern. | `random` | 4 / 4 / 3 / 5 = 16 | The two-mitten reveal makes a compact share card. Its appeal depends more on illustration and sharing than on a direct search need. |

## Meta

slug `gift-wrap-size-calculator`

- Category `tools`, kind `tool`, aspect `3/4`, date `2026-11-22`
- Tags ko `선물포장`, `포장지`, `크리스마스`. Tags en `gift wrap`, `wrapping paper`, `Christmas`.
- Title ko `선물 포장지 크기 계산기`
- Title en `Gift Wrap Size Calculator`
- Desc ko — 상자 가로·세로·높이와 포장지 롤 너비를 넣으면 자를 크기가 바로 나와요. 롤을 덜 풀어도 되는 방향도 그림으로 확인하세요.
- Desc en — Enter your box dimensions and roll width to see how much paper to cut and which way to turn the sheet to use less of the roll.
- Howto ko — 상자 가로·세로·높이와 롤 너비를 cm로 입력하세요. 그림에서 롤 너비 방향과 풀어낼 길이를 확인하고 포장지를 자르세요.
- Howto en — Enter the box length, width, height, and roll width in cm. Follow the diagram to measure across the roll and along the length you unroll.
- About ko — 직육면체 상자의 양끝을 접는 기본 포장 기준이에요. 무늬 방향을 맞춰야 한다면 두 방향의 치수를 확인하세요.
- About en — Uses a basic full-flap fold for rectangular boxes. If your paper has a directional print, check both orientations before cutting.

## Pitch

The calculator opens on a worked example. A 20 × 12 × 6 cm box and a 50 cm roll give an immediate cutting instruction: measure 38 cm across the roll and unroll 32 cm. A diagram distinguishes those two directions. Turning the layout would also fit, but it would use 6 cm more from the roll.

The holiday hook is wrapping gifts at home. The calculator works year-round, and a copied result gives someone else enough information to make the cut.

## Flow

1. **EXAMPLE.** Open the calculator with `20`, `12`, `6`, and `50` filled in. Mark the inputs as an example and show the live result. There is no start button.
2. **EDIT.** Update the result as the user types. Remove the example label on the first input change. Keep focus and the caret in the active field.
3. **FIT.** Highlight the orientation that uses the least length from the roll. Show the second orientation when it fits and uses different cut dimensions.
4. **TOO NARROW.** Show the minimum roll width needed and its corresponding cut length. Recalculate as soon as the roll width or box measurements change.
5. **INCOMPLETE OR INVALID.** Show a short instruction in the result area. Mark completed invalid fields on blur. “예시로 되돌리기 / Restore example” restores all four inputs and the example result.

## Controls

- **Touch and mouse.** Tap or click a field to edit it and use the two native buttons to copy the cut size or restore the example. All interactive targets are at least 44 × 44 px. Keep normal touch behavior for text selection and the on-screen keyboard.
- **Keyboard.** Tab order is length, width, height, roll width, copy when available, then restore example. Enter in a field validates it without submitting or navigating. Enter and Space follow native button behavior.
- **Accessibility.** Associate a visible label with each input and connect field errors using `aria-describedby` and `aria-invalid`. Keep focus in place during recalculation. Use a polite live region for settled results and copy feedback. The diagram repeats adjacent text and is hidden from assistive technology.
- **Language.** `?lang=ko` or `?lang=en` takes priority. Otherwise use Korean for a `navigator.language` beginning with `ko` and English for other values. Set `<html lang>` and the document title. Keep UI, accessibility, and copied text in the same bilingual dictionary.

## Calculation

Let `L` be the box length between its two folding ends, `W` its width, `H` its height, and `R` the usable roll width. Each input accepts 0.1–500 cm inclusive, with up to one decimal place.

- **Around the box** = `2 × (W + H) + 2 cm`. The extra 2 cm gives the long seam room to overlap.
- **End to end** = `L + 2 × H`. Allow one box height at each end for full flaps.
- Parse inputs into integer millimeters and calculate both dimensions before rounding. Round each required paper dimension up to the next whole centimeter. Use these rounded dimensions for the diagram, fit check, and copied result.
- Compare two orientations in `{across, along}` order. The first places the around-the-box dimension across the roll. The second swaps the dimensions. An orientation fits when its `across` dimension is at most `R`.
- Among fitting orientations, recommend the one with the smaller `along` dimension. Equal cut dimensions produce one recommendation and one diagram. If neither fits, the smaller `across` dimension is the minimum required roll width. Display that orientation’s `along` dimension alongside it.
- Example: `L=20`, `W=12`, `H=6`, `R=50` gives 38 × 32 cm and 32 × 38 cm. Recommend 38 cm across and 32 cm along. With `R=32`, recommend 32 cm across and 38 cm along. With `R=31.9`, require a roll at least 32 cm wide.

## Screens and visual design

All states use one calculator screen. Put the heading and input grid first, the result panel next, and the actions last.

| State | What appears |
|---|---|
| **EXAMPLE** | Title, input instruction, two-by-two field grid with the example label, and the full FIT result. Copy is available. |
| **FIT** | Recommended cut size in large type and a top-down roll diagram. A horizontal arrow marks the across-roll measurement and a vertical arrow marks the length to unroll. The cut rectangle starts at a roll edge. Any space left across the roll appears as a hatched strip. If both distinct orientations fit, add the alternate dimensions and the number of centimeters saved by the recommendation. Copy and restore are available. |
| **TOO NARROW** | Minimum width and corresponding length in the main result position. The diagram shows the required cut edge extending beyond the roll edge, with a dashed outline to mark the overhang. Copy is disabled. |
| **INCOMPLETE** | The result area asks the user to fill in all four measurements. The cut dimensions and diagram disappear. Copy is disabled. |
| **INVALID** | The result area asks the user to check the measurements. When an invalid field loses focus, its localized error appears below it. The cut dimensions and diagram disappear. Copy is disabled. |
| **COPY FEEDBACK** | A status line beneath the actions reports success or failure without opening a dialog or shifting focus. On failure the cut dimensions remain visible for manual copying. |

Use warm paper `#F7F1E6`, dark ink `#251F1B`, evergreen `#245547` for the recommended cut, and rust `#9C442B` for errors and overhang. Use system fonts and tabular numerals for measurements. Pair every color cue with a label, border, or hatching. Draw the diagram in inline SVG with a responsive `viewBox`. Keep measurement text in HTML outside the diagram so it stays readable even for unusually narrow cuts.

Fill the iframe with `100dvh` and a `100vh` fallback. At 320 × 480 px, keep the four inputs and recommended dimensions visible by reducing the diagram height and allowing labels to wrap. If the software keyboard, text zoom, or field errors reduce the available space, allow the calculator body to scroll internally. The document itself stays fixed. On wide screens, center the panel at a maximum width of 560 px. The UI uses static diagrams and requires no animation or sound.

## Export and copy

- Copy includes the localized title, current box dimensions, and the recommended cut with both directions. Build it from `appTitle`, `copyBox`, `cutAcross`, and `cutAlong`, joined by newlines.
- Use `navigator.clipboard.writeText` from the button gesture, with a temporary textarea fallback where supported. If both fail, show `copyFail`. Keep the visible measurements selectable.
- Capture a snapshot when Copy is pressed. Clear previous copy feedback on edit or restore, and ignore late feedback for an older snapshot.

## Strings

All user-facing text appears in this table or the bilingual Meta fields. Format numeric interpolations with the active locale and use the literal unit `cm` in both languages. `{L}`, `{W}`, `{H}`, `{across}`, `{along}`, and `{saved}` are numeric values from the current inputs and result.

| Key | ko | en |
|---|---|---|
| `appTitle` | 선물 포장지 크기 계산기 | Gift Wrap Size Calculator |
| `intro` | 상자와 포장지 롤의 치수를 cm로 입력하세요. | Enter your box and paper roll measurements in cm. |
| `example` | 예시 치수 | Example measurements |
| `length` | 상자 가로 (cm) | Box length (cm) |
| `width` | 상자 세로 (cm) | Box width (cm) |
| `height` | 상자 높이 (cm) | Box height (cm) |
| `rollWidth` | 포장지 롤 너비 (cm) | Paper roll width (cm) |
| `fitHeading` | 이렇게 자르세요 | Cut this size |
| `cutAcross` | 롤 너비 방향으로 {across} cm | {across} cm across the roll |
| `cutAlong` | 롤에서 {along} cm 풀기 | Unroll {along} cm |
| `alternate` | 종이를 돌리면 너비 방향 {across} cm, 풀어낼 길이 {along} cm예요. | Turned the other way, the cut is {across} cm across and {along} cm along the roll. |
| `savings` | 추천 방향으로 자르면 롤을 {saved} cm 덜 풀어요. | The recommended cut uses {saved} cm less from the roll. |
| `tooNarrow` | 포장지 롤이 너무 좁아요 | The roll is too narrow |
| `minRoll` | 너비가 {across} cm 이상인 롤에서 {along} cm를 풀어 자르세요. | Use a roll at least {across} cm wide and unroll {along} cm. |
| `incomplete` | 네 칸의 치수를 모두 입력하세요. | Fill in all four measurements. |
| `invalid` | 입력한 치수를 확인하세요. | Check your measurements. |
| `fieldError` | 0.1~500 사이의 숫자를 소수점 첫째 자리까지 입력하세요. | Enter a number from 0.1 to 500 with up to one decimal place. |
| `foldNote` | 이음새 겹침 2 cm와 양끝 접는 분량을 포함했어요. | Includes a 2 cm seam overlap and paper for both end flaps. |
| `copy` | 자를 크기 복사 | Copy cut size |
| `restore` | 예시로 되돌리기 | Restore example |
| `copyBox` | 상자 가로 {L} × 세로 {W} × 높이 {H} cm | Box: {L} × {W} × {H} cm (length × width × height) |
| `copied` | 자를 크기를 복사했어요. | Cut size copied. |
| `copyFail` | 복사하지 못했어요. 위 치수를 직접 선택해 복사해 주세요. | Could not copy. Select and copy the measurements above. |

## localStorage

- No keys. Keep inputs and result in page memory. Reloading opens the worked example. Language comes from the URL or browser preference.

## Edge cases

- Trim outer whitespace. Accept digits with an optional decimal point and one fractional digit. A leading decimal point is valid with one following digit, so `.5` means `0.5`. A trailing point can remain during entry and is validated on blur. Reject commas, signs, exponent notation, units, zero, and values above 500.
- A blank field produces INCOMPLETE. A nonempty malformed or out-of-range value produces INVALID and takes precedence over blanks. Any nonvalid input immediately removes the previous cut and disables copy.
- Exact fits are valid. A 38.1 cm paper requirement rounds up to a 39 cm cut, so a 38.9 cm roll cannot fit that orientation.
- The 500 cm input ceiling applies to entered measurements. Calculated paper dimensions can exceed 500 cm and must remain visible in full.
- If the paper has a directional print, the user can read the other orientation when it fits. The recommendation assumes the paper may be turned and that the roll has enough length remaining.
- Restore clears field errors and copy feedback, restores all four defaults, and keeps focus on the restore button. Resizing preserves input, result, and focus.
- Before publishing, run `npm test`, `npm run build`, and `npm run qa -- --thumbs`. Check that the generated thumbnail shows the worked example and both direction labels.

## Must not

- No external assets, scripts, fonts, network calls, analytics, or dependencies. Ship the item in one `index.html` alongside `meta.json` and the QA-generated thumbnail.
- No material estimates for irregular boxes, diagonal wrapping, pattern matching, or multiple boxes cut from one roll.
- No brand names, shop links, prices, or claims about current search volume.
- No document-level scrolling, browser dialogs, new windows, navigation, audio, or autoplay.