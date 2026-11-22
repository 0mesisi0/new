# Idea and spec: 김장 비용 계산기 / Kimjang Budget Calculator

## Concepts scored

Each score is out of 5. The Korean search and share scores are planning estimates based on the supplied research. No vote data is available.

| Concept | Category | Value in first 10 seconds | Originality | Korean search/share demand | One-file buildability | Total |
|---|---|---:|---:|---:|---:|---:|
| **김장 비용 계산기 / Kimjang Budget Calculator** — enter your shopping quantities and prices, then copy a list with a running total | `tools` | 5 | 4 | 5 | 5 | **19/20** |
| 이불 구출 작전 / Blanket Rescue — reel in a balcony blanket between gusts, then release the line when it goes taut | `arcade` | 5 | 4 | 3 | 4 | 16/20 |
| 성에 낙서 / Frost Doodles — draw on a frosted window and watch the marks slowly fog over | `chill` | 5 | 4 | 3 | 5 | 17/20 |

**Pick Kimjang Budget Calculator.** Today’s research identifies late-November kimjang shopping as a seasonal use case and reports different cost estimates across sources. A worked example shows the calculation in one tap. The actual shopping list uses the buyer’s own quantities and prices, and its text can go straight into a family group chat. ([Today’s research](01-research.md))

## Meta

slug `kimjang-budget-calculator`

| Field | Value |
|---|---|
| `category` | `tools` |
| `kind` | `tool` |
| `aspect` | `3/4` |
| `date` | `2026-11-22` |
| Korean tags | `김장 비용`, `김장 장보기`, `김장 재료` |
| English tags | `kimjang`, `shopping list`, `budget calculator` |

| Field | ko | en |
|---|---|---|
| `title` | 김장 비용 계산기 | Kimjang Budget Calculator |
| `desc` | 배추, 무, 고춧가루 등 김장 재료의 구매 수량과 단가를 입력하면 예상 비용을 바로 계산해요. 장보기 목록을 복사해 가족과 공유하세요. | Enter quantities and prices for your kimjang ingredients, see the estimated total as you type, and copy the shopping list to share. |
| `howto` | 살 재료의 수량과 구매 단위당 가격을 입력하세요. ‘장보기 목록’을 누르면 재료별 금액을 확인하고 목록을 복사할 수 있어요. | Enter how many units you plan to buy and the price per unit. Open Shopping list to review each amount and copy the list. |
| `about` | 구매 단위는 재료마다 달라도 돼요. 예시의 수량과 가격은 계산법을 보여 주기 위한 값입니다. | Each ingredient can use its own purchase unit. The sample quantities and prices are for illustration. |

## Pitch

Plan a kimjang shop from the prices you already have. If two bags of coarse salt cost ₩4,500 each, enter `2` and `4500` to see ₩9,000 added immediately. If you know you need chili flakes but still need to check the price, the list keeps the item and flags it as unpriced. Anyone opening the tool for the first time can load an example and see a complete shopping list in two taps.

## Flow

1. **EDIT.** Open directly to the calculator. Show the title, a one-line instruction, **Load example**, and the ingredient cards. On a fresh visit every field is blank. A fixed footer shows the running total and the **Shopping list** button. Prices and quantities recalculate on input.
2. **REPLACE LIST.** If **Load example** or **Clear list** would replace entered values, open an inline confirmation in the footer. **Cancel** returns focus to the button that opened it. The confirmation leaves the draft intact until the user presses **Replace with example** or **Clear list**.
3. **LIST.** Show each included ingredient, its quantity and unit, its unit price if known, and its line amount or missing-price label. Keep the total and the actions **Edit list** and **Copy list** visible beneath the scrolling ingredient list. **Edit list** returns to the same scroll position and focuses **Shopping list** in the editor. Opening the list moves focus to its heading.
4. **MANUAL COPY.** If programmatic copying fails, reveal a labeled, read-only text area above the list footer. Focus and select its contents. The user can copy with the device’s native controls or press **Close copy field** to return focus to **Copy list**. Successful copying uses an inline status message on the list screen.

## Controls

- Tap or click inputs and buttons. Use Tab and Shift+Tab to move through controls, and Enter or Space to activate focused buttons. Escape cancels an open replacement confirmation or closes the manual-copy field and restores focus.
- Give every interactive control a target of at least 44 × 44 px. Use native text inputs with `inputmode="numeric"` for quantities and prices. Give each input a localized accessible label that includes the ingredient name.
- Keep the page fixed to the iframe viewport. Allow the middle content panel to scroll with touch, wheel, and keyboard. Keep the footer reachable when the mobile keyboard opens. Give the scrolling panel a localized accessible name.
- Show validation inline and associate it with its field. On an attempt to open the list with an invalid field, focus the first invalid field and bring it into view. Announce validation and copy outcomes through a polite live region. Avoid announcing totals on every keystroke.

## Ingredients and example

Use the following fixed order in both screens and in copied text. Unit labels are editable per ingredient. A blank unit uses the row’s localized default. The example loads only the first three rows shown below and clears the other rows after any required confirmation.

| Ingredient ko | Ingredient en | Default unit ko / en | Example quantity | Example price per unit |
|---|---|---|---:|---:|
| 배추 | Napa cabbage | 포기 / head(s) | 4 | ₩3,800 |
| 무 | Korean radish | 개 / piece(s) | 2 | ₩2,100 |
| 굵은소금 | Coarse salt | 봉 / bag(s) | 1 | ₩4,500 |
| 고춧가루 | Korean chili flakes | 봉 / bag(s) | — | — |
| 마늘 | Garlic | 봉 / bag(s) | — | — |
| 생강 | Ginger | 봉 / bag(s) | — | — |
| 쪽파 | Scallions | 단 / bunch(es) | — | — |
| 액젓 | Fish sauce | 병 / bottle(s) | — | — |
| 기타 재료 | Other ingredients | 묶음 / lot(s) | — | — |

**Example total** ₩23,900. Show the example notice on both screens and in copied text while the example remains the basis of the list. Edits keep the notice visible. **Clear list** removes the notice and restores blank fields and localized default units.

## Calculation and validation

- Accept whole quantities from 0 to 999 and whole won prices from 0 to 9,999,999. Accept ASCII or full-width digits, trim surrounding whitespace, and allow correctly grouped thousands separators in prices. Reject other characters, decimals, signs, and out-of-range values. Keep invalid text visible for correction.
- Include a row when its quantity is valid and greater than zero. A zero quantity excludes the row. If a valid price is entered with a blank quantity, mark the quantity as required. A unit edit alone leaves the row excluded.
- A blank price on an included row is **Price needed**. A price of `0` represents a known zero cost. Multiply each included quantity by its valid price and sum those amounts using integer won arithmetic.
- Show **Estimated total** when every included row is priced. Show **Subtotal for priced items** and the missing-price count when any included row lacks a price. Show `—` when zero rows have valid amounts, and `₩0` when one or more valid amounts sum to zero. While any field is invalid, show **Check highlighted fields** in place of the total and block entry to LIST.
- A custom unit is trimmed and limited to 12 Unicode characters. Reject control characters, including line breaks. Render a custom unit as literal text. Format numbers with locale-appropriate grouping and the `₩` symbol in both languages. Display quantity as `{qty} {unit}`.

## Visual design

Use a light cream workspace (`#FFF8ED`), white ingredient cards, dark plum text (`#30252B`), and a deep red primary action (`#A12F36`). Draw a small original cabbage in inline SVG beside the title and hide it from assistive technology. Use system-ui and tabular numerals for amounts. Give missing-price rows a text label as well as an amber accent.

On the editor, each card shows the ingredient name followed by quantity, unit, and price fields with persistent labels. Wider layouts can place the fields on one line. At 320 × 480, allow them to wrap and keep the header and footer outside the scrolling panel. At desktop widths, center the calculator in a column up to 560 px wide. On the list, align amounts to the right and allow ingredient names and custom units to wrap. Feedback is immediate and static. The item is silent.

## Copy

Build plain text from the same rows and amounts displayed in LIST. Use the title as the first line, then the example notice when applicable, one line per included ingredient, the total or subtotal, and the missing-price count when applicable. Use the localized `copyPricedRow`, `copyUnpricedRow`, and `copyTotal` templates below.

Attempt `navigator.clipboard.writeText` from the **Copy list** activation. If it rejects or is unavailable in the iframe, open MANUAL COPY. A copy attempt may have only one pending operation. Ignore a late result if the user has returned to EDIT. Keep the copy action available for repeated sharing.

## Strings

Use the metadata title for `appTitle` and the document title. The ingredient names and default units are defined in the ingredient table. Use a single `{ ko, en }` dictionary for those entries and all strings below, including accessible labels and copied text. Read `?lang=ko` or `?lang=en` first. For any other value, use Korean if the primary subtag of `navigator.language` is `ko`, and English otherwise. Set `<html lang>` accordingly.

| Key | ko | en |
|---|---|---|
| `appTitle` | 김장 비용 계산기 | Kimjang Budget Calculator |
| `editIntro` | 살 재료의 수량과 구매 단위당 가격을 입력하세요. | Enter the quantity and price per unit for each ingredient you plan to buy. |
| `editorRegion` | 재료 입력 | Ingredient editor |
| `loadExample` | 예시 불러오기 | Load example |
| `clearList` | 목록 비우기 | Clear list |
| `replaceQuestion` | 입력한 내용을 예시로 바꿀까요? | Replace your entries with the example? |
| `clearQuestion` | 입력한 내용을 모두 지울까요? | Clear all your entries? |
| `confirmReplace` | 예시로 바꾸기 | Replace with example |
| `cancel` | 취소 | Cancel |
| `exampleNotice` | 예시 수량과 가격입니다. | Sample quantities and prices. |
| `quantity` | 구매 수량 | Quantity |
| `unit` | 구매 단위 | Unit |
| `unitPrice` | 단위당 가격(원) | Price per unit (₩) |
| `quantityLabel` | {ingredient} 구매 수량 | {ingredient} quantity |
| `unitLabel` | {ingredient} 구매 단위 | {ingredient} purchase unit |
| `unitPriceLabel` | {ingredient} 단위당 가격(원) | {ingredient} price per unit (₩) |
| `quantityRequired` | 구매 수량을 입력하세요. | Enter a quantity. |
| `quantityInvalid` | 수량은 0~999 사이의 정수로 입력하세요. | Enter a whole number from 0 to 999. |
| `priceInvalid` | 가격은 0~9,999,999원 사이의 정수로 입력하세요. | Enter a whole number from 0 to 9,999,999 won. |
| `unitInvalid` | 구매 단위는 줄바꿈 없이 12자까지 입력하세요. | Enter up to 12 characters on one line. |
| `checkFields` | 표시된 입력값을 확인해 주세요. | Check the highlighted fields. |
| `emptyHint` | 구매 수량을 입력하면 장보기 목록에 추가돼요. | Enter a quantity to add an ingredient to your shopping list. |
| `estimatedTotal` | 예상 합계 | Estimated total |
| `pricedSubtotal` | 가격을 입력한 재료 소계 | Subtotal for priced items |
| `unpricedCount` | 가격 미입력 재료 {count}개 | Items awaiting prices: {count} |
| `noAmount` | — | — |
| `shoppingList` | 장보기 목록 | Shopping list |
| `priceNeeded` | 가격 미입력 | Price needed |
| `quantityWithUnit` | {qty} {unit} | {qty} {unit} |
| `rowUnitPrice` | 단위당 {price} | {price} per unit |
| `editList` | 목록 수정 | Edit list |
| `copyList` | 목록 복사 | Copy list |
| `copied` | 장보기 목록을 복사했어요. | Shopping list copied. |
| `copyManual` | 아래 내용을 선택해 복사해 주세요. | Select and copy the text below. |
| `copyFieldLabel` | 복사용 장보기 목록 | Shopping list text |
| `closeCopyField` | 복사 입력란 닫기 | Close copy field |
| `copyPricedRow` | {ingredient} {quantityWithUnit} × {price} = {amount} | {ingredient}, {quantityWithUnit} × {price} = {amount} |
| `copyUnpricedRow` | {ingredient} {quantityWithUnit} · {priceNeeded} | {ingredient}, {quantityWithUnit} · {priceNeeded} |
| `copyTotal` | {totalLabel} {amount} | {totalLabel} {amount} |

## localStorage

Use `kimjang-budget-calculator:draft:v1` for a JSON object containing the raw quantity, custom unit and price strings keyed by known ingredient ID, plus a Boolean example flag. Blank custom units resolve to the current language’s default. Persist edits as they happen so that drafts survive reloads. **Clear list** resets the in-memory state and removes the key. Wrap all storage calls and parsing in `try/catch`. Restore only recognized fields of the expected type. Bound restored strings to a reasonable input length and run restored values through the normal validation path. If storage is unavailable, continue with the in-memory draft.

## Edge cases

- **Fresh or cleared list.** Show `—` and `emptyHint`. Disable **Shopping list** until there is an included row or an invalid field to surface. Disable **Clear list** while the editor is blank.
- **All prices missing.** LIST and copying still work. Show the priced subtotal as `—` and include the missing-price count. An item entered at zero won remains a priced row.
- **Accidental example activation.** An empty draft loads the example immediately. A draft with any entered data requires confirmation. Cancel preserves all values, the example flag, and scroll position.
- **Mobile editing.** Keep the active input in view on resize. Preserve its value, focus, and selection. Recalculate after composition ends for input methods that use composition.
- **Reload or language change.** Open EDIT with the saved draft. Labels and default units follow the active language. User-entered units retain their original text.
- **QA thumbnail.** `#demo` opens LIST with the three example rows, the example notice, and ₩23,900. Keep the demo session isolated from persisted drafts. Before publishing, run `npm test`, `npm run build`, and `npm run qa -- --thumbs`, then inspect the generated thumbnail.

## Must not

- Keep all calculator logic, styling, and artwork in `items/kimjang-budget-calculator/index.html`. Use no external assets, requests, analytics, accounts, or location lookups.
- Use no live or prefilled market prices outside the clearly labeled example. Make no recipe, serving-size, yield, or price claims.
- Use no real store names, brands, people, or copied artwork.
- Use no browser dialogs, pop-ups, redirects, or sound. Keep body scrolling disabled and preserve normal scrolling inside the content panel.