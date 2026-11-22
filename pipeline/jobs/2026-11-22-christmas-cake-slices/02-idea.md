# Idea and spec: 크리스마스 케이크 조각 계산기 / Christmas Cake Slice Calculator

slug `christmas-cake-slices`

## Concepts scored

Each criterion is scored from 1 to 5. Search and share scores are estimates based on the supplied [November 22 research](pipeline/jobs/2026-11-22-pending-7/01-research.md) and [idea backlog](play/ideas.md). No votes were available.

| Concept | Category | First 10 seconds | Originality | Korean search/share demand | One-HTML buildability | Total |
|---|---|---:|---:|---:|---:|---:|
| **크리스마스 케이크 조각 계산기 / Christmas Cake Slice Calculator** | `tools` | 5 | 4 | 4 | 5 | **18** |
| 어묵 포장마차 ASMR / Fish Cake Stall ASMR | `chill` | 4 | 4 | 3 | 4 | 15 |
| 트리 전구 잇기 / Light Up the Tree | `puzzle` | 4 | 4 | 3 | 4 | 15 |

- **Cake Slice Calculator** shows how much cake each person gets from two round cakes at the same guest count. `크리스마스 케이크 크기` gives it a seasonal search hook, and the side-by-side result answers a question people can share in a group chat.
- **Fish Cake Stall ASMR** lets the user turn up the simmer or tap a skewer against the pot. It adapts the backlog’s ambient mixer into one winter street-stall scene. The first payoff depends on sound playback.
- **Light Up the Tree** gives the player a small grid of bulbs to connect with two colored strings. The finished tree is easy to share, and the puzzle needs a few hand-checked boards to make retries worthwhile.

**Pick the Cake Slice Calculator.** The default comparison answers a concrete question immediately. At six servings, an 18 cm cake gives each guest a slice with 44% more top area than a 15 cm cake.

## Meta

- Category `tools`, kind `tool`, aspect `3/4`, date `2026-11-22`
- Korean tags `크리스마스 케이크`, `케이크 크기`, `케이크 인원`
- English tags `Christmas cake`, `cake size`, `cake portions`
- Use the titles in the document heading for `ko.title` and `en.title`.

| Field | ko | en |
|---|---|---|
| `desc` | 크리스마스 케이크 두 개의 지름과 인원수를 고르면, 한 사람 몫이 얼마나 달라지는지 조각 그림과 면적으로 바로 비교할 수 있어요. | Compare two round Christmas cakes at the same guest count. See how big each slice looks and how much the portion size changes. |
| `howto` | 인원수와 케이크 두 개의 지름을 고르세요. 색칠된 조각과 한 조각 면적을 비교하고, 결과를 복사해 공유할 수 있어요. | Set the guest count and both cake diameters. Compare the highlighted slices and their areas, then copy the result to share. |
| `about` | 원형 케이크를 똑같이 나눴을 때의 윗면 면적을 계산해요. 케이크의 높이와 무게는 계산에 들어가지 않아요. | The calculator uses the top area of equal slices from round cakes. Height and weight are outside the calculation. |

## Pitch

Two round cakes sit side by side, with one slice shaded on each. Change the guest count and both slices narrow. Change a diameter and that cake grows on the same scale as its neighbor. Put the area of one slice directly below each cake and the percentage difference below the pair.

The first view uses six guests and cakes of 15 cm and 18 cm. The user can read the comparison before touching a control.

## Flow and screens

1. **Calculator.** Open directly to the title, guest-count control, two diameter selectors, two cake diagrams, the comparison, and a full-width **결과 복사 / Copy result** button. The default card shows `29.5 cm²/조각` and `42.4 cm²/조각` in Korean, with the 44% comparison below.
2. **Live update.** Every valid control change redraws the diagrams and updates both slice areas, the comparison, and the copy payload in one render. If the diameters match, the circles and highlighted slices match, and the comparison shows the equality message.
3. **Copy feedback.** Keep the calculator and focus in place. While a copy is pending, keep the button label and ignore repeat activations. On success or failure, show the corresponding inline status in the reserved space under the button. Clear it on the next input change or copy attempt. On failure the whole comparison stays visible for a screenshot.

## Controls

- **Guest count.** Start at 6, with a range of 2–24 inclusive. Minus and plus change the value by one. Disable the corresponding button at each bound. A labeled range input supports scrubbing and native keyboard controls, including arrows, Home, and End.
- **Cake diameters.** Use a labeled native select for each cake, with options `12`, `15`, `18`, `21`, and `24` cm. Defaults are 15 cm for A and 18 cm for B. Both selectors offer the same choices, including equal diameters. Support native keyboard selection.
- **Pointer and keyboard.** All actions work by touch and mouse. Tab order is minus, range, plus, diameter A, diameter B, copy. Buttons use native Enter and Space activation, and every action target is at least 44×44 px. Preserve visible focus and native slider and selector behavior.
- **Language.** Accept `?lang=ko` and `?lang=en`. For a missing or unsupported value, use Korean when `navigator.language` starts with `ko`, otherwise use English. Set `<html lang>` and use the same dictionary for the screen, accessibility labels, and copied text.

## Calculation and diagram

- For each cake, `radius = diameter / 2`, `sliceAngle = 360 / guests`, and `sliceArea = Math.PI × radius² / guests`. Format area with exactly one decimal using `Intl.NumberFormat` for the active locale. Use unrounded areas in the comparison.
- If B is larger, calculate `round(100 × (areaB / areaA − 1))`. If A is larger, calculate `round(100 × (areaA / areaB − 1))`. Name the larger cake first and use the smaller slice as the reference. For equal diameters, use the equality string.
- Draw two inline SVGs with the same `viewBox` of `0 0 120 120`. Center both at `(60, 60)` and set the radius to `2 × diameter` in SVG units. Shade the first wedge clockwise from 12 o’clock. Draw one radial line per serving, with a thin divider so the highlighted wedge stays readable at 24 servings.
- Hide the SVGs from assistive technology. The adjacent cake labels, diameter selectors, and slice areas communicate the same information. Announce the comparison in a polite live region when a control change commits. Update the visuals during slider movement without announcing every intermediate value.

## Visual design

Use a cream background `#FFF6E7`, dark cocoa text `#30221E`, and muted cranberry and pine accents `#96374A` and `#246452`. The two cakes have a thin icing outline, faint cut lines, and a solid highlighted wedge. Keep the A and B labels visible so the comparison also works without color.

Fill the iframe and center the content in a panel up to 520 px wide. Keep the cakes side by side at 320×480. Save vertical space with a shared guest control and compact cake labels. At short heights, reduce SVG size and decorative spacing before shrinking text or controls. Use system fonts, keep feedback in normal layout, and prevent document scrolling.

## Export and copy

Copy three lines in the active language, joined by newline characters.

| Line | ko | en |
|---|---|---|
| 1 | `{title} · {n}명` | `{title} · Guests: {n}` |
| 2 | `A {diamA} cm: {areaA} cm²/조각 · B {diamB} cm: {areaB} cm²/조각` | `A {diamA} cm: {areaA} cm²/slice · B {diamB} cm: {areaB} cm²/slice` |
| 3 | `{comparison}` | `{comparison}` |

Call `navigator.clipboard.writeText` from the button activation, using a snapshot of the current result. If unavailable or rejected, try copying through a temporary read-only textarea and `document.execCommand('copy')`. Remove the textarea and restore focus if it displaced focus. Show failure feedback if both attempts fail. If the inputs change while a copy is pending, suppress feedback from that old snapshot.

## Strings

Metadata text is specified above. The screen uses `appTitle` from the localized metadata. Braced values are interpolated, with `A` and `B` as fixed cake identifiers.

| Key | ko | en |
|---|---|---|
| `appTitle` | 크리스마스 케이크 조각 계산기 | Christmas Cake Slice Calculator |
| `guestsLabel` | 인원수 | Guests |
| `guestCount` | `{n}명` | `{n}` |
| `decreaseGuests` | 한 명 줄이기 | One fewer guest |
| `increaseGuests` | 한 명 늘리기 | One more guest |
| `cakeLabel` | 케이크 `{cake}` | Cake `{cake}` |
| `diameterLabel` | 케이크 `{cake}` 지름 | Cake `{cake}` diameter |
| `diameterOption` | `{diameter} cm` | `{diameter} cm` |
| `sliceArea` | `{area} cm²/조각` | `{area} cm²/slice` |
| `comparisonLarger` | `{larger}`의 한 조각은 `{smaller}`보다 윗면이 `{percent}%` 넓어요. | Cake `{larger}` has `{percent}%` more top area per slice than cake `{smaller}`. |
| `comparisonEqual` | 두 케이크의 한 조각 면적이 같아요. | Both cakes have the same area per slice. |
| `copy` | 결과 복사 | Copy result |
| `copied` | 결과를 복사했어요. | Result copied. |
| `copyFailed` | 복사할 수 없어요. 화면을 캡처해 주세요. | Couldn’t copy. Take a screenshot to share. |

## localStorage

- `christmas-cake-slices:settings:v1` stores `{ "guests": 6, "diamA": 15, "diamB": 18 }` with the user’s last selections.
- Read and write in `try/catch`. Validate each restored field independently as an integer in the allowed range or option list. Fall back to that field’s default if invalid. If storage is blocked, use in-memory state for the session.

## Edge cases

- With 2 guests, the highlighted wedge is a semicircle. With 24 guests, render exactly 24 divisions and keep the numerical result readable even where the wedges are narrow.
- Changing guest count changes each slice area and angle while leaving the percentage difference constant. Reversing A and B reverses the names in the comparison. Equal diameters produce the equality message.
- Keep all selections on resize and orientation change. Render on input and let the inline SVG scale with its container. The interface is silent and has no continuous animation.
- For `#demo`, render the six-guest, 15 cm versus 18 cm comparison regardless of saved settings. Ignore storage reads and writes in demo mode so thumbnail capture is repeatable.
- Before publishing, run `npm test`, `npm run build`, and `npm run qa -- --thumbs`. Check both languages at 320×480, the default result and equality state, keyboard-only use, and the copy failure state. Use the QA-generated thumbnail.

## Must not

- No network requests, analytics, external fonts, scripts, or assets. Keep the calculator in `index.html` with inline CSS, JavaScript, and SVG. Ship metadata separately and generate `thumb.png` through QA.
- No real bakery names or logos, live prices, listings, reservations, or brand-specific size charts.
- No conversion to weight, volume, or recommended guest count from diameter alone.
- No sound, dialogs, new windows, or navigation away from the page.