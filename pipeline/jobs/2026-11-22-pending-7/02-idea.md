# Idea and spec: 크리스마스 케이크 가격 비교 / Christmas Cake Price Compare

## Concepts scored

Each score is 1–5. The first measure asks what the user gets within 10 seconds. Korean search and share scores are editorial estimates based on the supplied research, with cake reservations as a seasonal hook and no measured demand for these specific concepts.

| Concept | Category | First 10 seconds | Originality | Korean search/share | One-file buildability | Total | Verdict |
|---|---|---:|---:|---:|---:|---:|---|
| 크리스마스 케이크 가격 비교 / Christmas Cake Price Compare | `tools` | 5 | 3 | 4 | 5 | **17** | **Picked.** The opening example shows how a higher-priced cake can cost less per serving. Shoppers can compare two reservation listings using figures they already have. |
| 겨울 창가 ASMR / Winter Window ASMR | `chill` | 4 | 3 | 3 | 4 | 14 | Tap to mix synthesized wind, kettle hum and heater clicks. A seasonal take on the backlog’s ambient mixer, with its first payoff dependent on audio. |
| 전구 한 줄 잇기 / One String of Lights | `puzzle` | 4 | 4 | 3 | 4 | 15 | Rotate cable tiles to light a window display from a single plug. The reveal is easy to share, and the puzzle needs a set of hand-checked boards. |

## Meta

slug `christmas-cake-price-compare`

- Category `tools`, kind `tool`, aspect `3/4`, date `2026-11-22`
- Tags ko `크리스마스 케이크`, `케이크 가격 비교`, `케이크 예약`
- Tags en `Christmas cake`, `cake price comparison`, `cake reservations`

| Field | ko | en |
|---|---|---|
| `title` | 크리스마스 케이크 가격 비교 | Christmas Cake Price Compare |
| `desc` | 크리스마스 케이크 두 개의 총가격과 예상 인분을 넣어 보세요. 한 사람 몫에 얼마가 드는지, 정해 둔 예산에 들어오는지 한눈에 볼 수 있어요. | Compare two Christmas cakes by total price and cost per serving. Add a budget to see which options fit. |
| `howto` | 케이크 두 개의 총가격과 예상 인분을 입력하고 비교하세요. 예산을 입력하면 케이크마다 남거나 초과하는 금액도 볼 수 있어요. | Enter the total price and estimated servings for each cake. Add an optional budget to see how much each cake is under or over. |
| `about` | 실제로 결제할 총액과 직접 예상한 인분을 기준으로 비교해요. 금액 단위는 원이에요. | The comparison uses the totals and portion estimates you enter. All amounts are in Korean won. |

## Pitch

Two cakes sit side by side in a bakery-window display. The first costs ₩30,000 and serves four. The second costs ₩36,000 and serves six. The display makes both comparisons visible at once. The first cake costs ₩6,000 less at checkout, while the second costs ₩1,500 less per serving. A sample budget of ₩35,000 gives the shopper a third way to decide.

Use two fixed options, A and B, in Korean won. The user enters the full amount payable for each cake and their own serving estimates. An optional budget applies to each candidate independently.

## Flow

1. **SAMPLE** opens immediately with both cake cards, two comparison summaries, a sample budget and one primary button. The button opens the editor with empty fields.
2. **EDIT** shows price and servings for A and B, plus an optional budget. A valid submission opens RESULT. An invalid submission keeps the entries visible and focuses the first invalid field. Back returns to the display the editor opened from.
3. **RESULT** uses the same layout as SAMPLE and shows the submitted figures. Edit reopens the form with those figures. Clear comparison removes the saved comparison and returns to SAMPLE. A reload opens RESULT if a valid saved comparison exists.

## Controls

- Touch and mouse use native inputs and buttons with targets of at least 44 × 44 px. Activations work on a single tap or click.
- Keyboard tab order in EDIT is A price, A servings, B price, B servings, budget, Compare cakes, Back. Enter submits from a field. Enter and Space activate a focused button. Preserve native text selection and editing shortcuts.
- Focus the price for A when entering EDIT. On invalid submission, focus the first invalid field and connect its error text with `aria-describedby`. On valid submission, focus the result heading. On Back, restore focus to the button that opened the editor.
- Read `?lang=ko` or `?lang=en`. For missing or unsupported values, use Korean when `navigator.language` starts with `ko`, and English otherwise. Match `<html lang>`. Use the bilingual dictionary for visible and accessible labels.

## Screens

### SAMPLE

Show the title and `sampleHeading` above two equal-width cards. Each card shows its cake label, total, servings, cost per serving and budget status in that order. Below the cards, show the checkout-price summary, the per-serving summary and the budget amount. The primary button is `start`.

The opening numbers are fixed.

| Cake | Total | Servings | Per serving | Budget status |
|---|---:|---:|---:|---|
| A | ₩30,000 | 4 | ₩7,500 | ₩5,000 under |
| B | ₩36,000 | 6 | ₩6,000 | ₩1,000 over |

### EDIT

Show the title, `editHeading`, and `editHint`. Group A and B in two fieldsets with visible legends. Within each fieldset, place price and serving inputs side by side. Show the budget field beneath them. Use visible labels and `inputmode="numeric"` on the text inputs. The bottom actions are Compare cakes and Back.

Show inline validation after the first submit attempt. Recheck an invalid field when it changes and clear its error as soon as it becomes valid. Preserve the other fields when an error occurs. The form has no random values or live recalculation.

### RESULT

Keep the two cards in A–B order. Each card presents the same fields as SAMPLE. Show one summary naming the cake with the lower checkout price and one naming the cake with the lower exact cost per serving. Use the corresponding tie message when values are equal.

If a budget was entered, show the budget beneath the summaries and a status in each card. With an empty budget, omit all budget rows. The actions are Edit comparison and Clear comparison. Clear applies immediately to the currently displayed comparison and its saved copy.

## Calculation

- Accept whole prices from ₩1 to ₩9,999,999 and whole serving counts from 1 to 100. Accept an empty budget or a whole amount from ₩0 to ₩9,999,999.
- Trim surrounding whitespace. For prices and budget, accept digits with optional correctly placed thousands commas. Serving counts accept digits. Reject decimal points, signs, currency symbols, malformed commas and internal whitespace. Check that the parsed integer is within range.
- Show total price and budget in whole won with thousands separators. For cost per serving, divide price by servings and round to the nearest won, with halves rounded up. Use the localized approximation label whenever there is a remainder.
- Compare per-serving prices by cross-multiplying the integer totals and serving counts. When unequal exact prices round to the same whole won, show `roundedClose` so the displayed figures explain the apparent tie. Otherwise use the lower-price or tie message.
- For each cake, subtract price from budget. A positive difference is the amount under budget, zero is the exact fit, and a negative difference gives the amount over budget.

## Visual design

- Use a warm cream background `#FFF5E8`, dark plum text `#2A1730`, cranberry actions `#8D2441` and a pine accent `#225C4B`. Pair budget colors with explicit status text.
- Draw a small original cake silhouette above each card on taller viewports using inline SVG. Hide the silhouettes when vertical space is limited. Keep the numbers and comparison summaries visible in the opening viewport.
- Use system fonts and tabular numerals. At 320 × 480, retain two equal result columns. Allow labels and summaries to wrap. Keep the page fixed to the iframe viewport and allow the central content panel to scroll when zoom, long validation text or the on-screen keyboard reduces available space.
- On result entry, use a 160 ms outline fade on each card. Respect `prefers-reduced-motion`. Use no continuous animation, audio or canvas.

## Strings

Use the metadata title as the in-item title and document title. Braced tokens are interpolated. `{amount}` includes localized currency formatting, `{n}` is a whole serving count, and `{cake}` resolves to the translated cake label. In English, use the singular serving row when `{n}` equals 1.

| Key | ko | en |
|---|---|---|
| `sampleHeading` | 예시 비교 | Example comparison |
| `editHeading` | 케이크 두 개 입력 | Enter two cakes |
| `editHint` | 실제로 낼 총액과 예상 인분을 입력하세요. 예산은 비워도 돼요. | Enter what you’ll pay and how many servings you expect. The budget is optional. |
| `resultHeading` | 비교 결과 | Comparison result |
| `cakeA` | 케이크 A | Cake A |
| `cakeB` | 케이크 B | Cake B |
| `price` | 총가격 (원) | Total price (KRW) |
| `servings` | 예상 인분 | Estimated servings |
| `budgetInput` | 예산 (원, 선택) | Budget (KRW, optional) |
| `budgetValue` | 예산 {amount} | Budget {amount} |
| `totalValue` | 총 {amount} | {amount} total |
| `servingsOne` | {n}인분 | {n} serving |
| `servingsMany` | {n}인분 | {n} servings |
| `unitValue` | 1인분에 {amount} | {amount} per serving |
| `unitApprox` | 1인분에 약 {amount} | About {amount} per serving |
| `under` | 예산 {amount} 남음 | {amount} under budget |
| `exact` | 예산에 딱 맞아요 | Exactly on budget |
| `over` | 예산 {amount} 초과 | {amount} over budget |
| `totalWinner` | 총가격은 {cake}가 더 저렴해요. | {cake} costs less at checkout. |
| `totalTie` | 두 케이크의 총가격이 같아요. | Both cakes cost the same at checkout. |
| `unitWinner` | 1인분 가격은 {cake}가 더 저렴해요. | {cake} costs less per serving. |
| `unitTie` | 두 케이크의 1인분 가격이 같아요. | Both cakes cost the same per serving. |
| `roundedClose` | 반올림하면 같지만, 1인분 가격은 {cake}가 조금 더 저렴해요. | The rounded prices match, but {cake} costs slightly less per serving. |
| `start` | 내 케이크 비교하기 | Compare my cakes |
| `compare` | 비교하기 | Compare cakes |
| `back` | 돌아가기 | Back |
| `edit` | 입력 수정 | Edit comparison |
| `clear` | 비교 지우기 | Clear comparison |
| `priceError` | 1~9,999,999원 사이의 정수를 입력하세요. | Enter a whole amount from 1 to 9,999,999 won. |
| `servingsError` | 1~100 사이의 정수를 입력하세요. | Enter a whole number from 1 to 100. |
| `budgetError` | 0~9,999,999원 사이의 정수를 입력하거나 비워 두세요. | Enter a whole amount from 0 to 9,999,999 won, or leave it blank. |

## localStorage

- `christmas-cake-price-compare:v1` stores the last valid submitted comparison as `{a: {price, servings}, b: {price, servings}, budget}`, with numeric fields and `null` for an omitted budget.
- Read, write and remove inside `try/catch`. On load, validate the stored structure and numeric ranges before using it. Persist only on successful form submission. The sample and unsubmitted edits stay out of storage.
- Clear comparison discards the in-memory comparison and removes the key. If storage is blocked, the item remains usable for the current session.

## Edge cases

- Identical totals with different serving counts produce a checkout tie and a per-serving winner. Different totals with the same exact ratio produce a checkout winner and a per-serving tie.
- A budget of `0` is valid and yields an over-budget result for both cakes. A blank budget suppresses the budget comparison entirely.
- An interrupted or canceled edit leaves the previous submitted comparison intact. Open Edit again to load the last submitted values.
- Resize, rotate or hide the iframe without losing the current screen or input. Finish or skip the one-shot outline fade when hidden.
- Invalid or unreadable stored data opens SAMPLE. A clean browser context also opens SAMPLE, with both populated cards ready for thumbnail capture.
- Before publishing, run `npm test`, `npm run build` and `npm run qa -- --thumbs`. Check the generated thumbnail and test both languages, keyboard entry and touch at 320 × 480.

## Must not

- No live prices, availability, storefront links, reservation booking, brand imagery or serving estimates inferred from cake size.
- No external scripts, fonts, assets, requests, analytics or third-party dependencies. Ship the interaction and visuals in `index.html`.
- No copied storefront layouts, real people or logos. Keep cake illustrations original.
- No page scrolling, browser dialogs, pop-ups, navigation away from the item or autoplay sound.