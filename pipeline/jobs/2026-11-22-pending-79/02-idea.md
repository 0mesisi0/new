# Idea and spec: 김장 비용 계산기 / Kimjang Cost Calculator

## Concepts scored

Scores run from 1 to 5 in each column, with a maximum of 20. Korean search and share scores are planning estimates based on the supplied research and backlog.

| Concept | Category | Value in the first 10 seconds | Originality | Korean search/share demand | One-file buildability | Total |
|---|---|---:|---:|---:|---:|---:|
| **김장 비용 계산기 / Kimjang Cost Calculator**. Scale your own shopping list to a new cabbage count, then copy the quantities and estimated costs into a family chat. | `tools` | 5 | 4 | 5 | 5 | **19** |
| 성에 낀 창문 / Frosted Window. Wipe frost from a winter window to reveal a quiet, illustrated neighborhood. Keyboard users can move and widen a clear patch. | `chill` | 5 | 4 | 3 | 5 | **17** |
| 겨울 주머니 뽑기 / Winter Pocket Draw. Tap a coat pocket to pull out a tiny winter souvenir, such as a bus ticket or a warm hand pack, with a one-line caption. Each pocket has a different themed pool. | `random` | 5 | 3 | 3 | 5 | **16** |

**Pick Kimjang Cost Calculator.** The supplied research identifies seasonal interest in both kimjang ingredient quantities and costs. An example estimate takes one tap, and a household can get its own estimate with just a cabbage count and unit price. Scaling the household’s own quantities and copying the result gives the tool a distinct job in the current lineup. [Research, rows 6–8](01-research.md)

## Meta

slug `kimjang-cost-calculator`

| Field | Value |
|---|---|
| Category | `tools` |
| Kind | `tool` |
| Aspect | `3/4` |
| Date | `2026-11-22` |
| Tags | ko `김장`, `김장 비용`, `장보기` / en `kimjang`, `shopping list`, `cost calculator` |

| Field | ko | en |
|---|---|---|
| `title` | 김장 비용 계산기 | Kimjang Cost Calculator |
| `desc` | 우리 집 김장 재료의 양과 단가를 넣고, 담글 배추 포기 수에 맞춰 필요한 양과 예상 비용을 계산해요. 장보기 목록도 복사할 수 있어요. | Enter your kimjang quantities and prices, scale the list by cabbage count, and copy your shopping estimate. |
| `howto` | 평소 담그는 배추 포기 수와 재료별 양·단가를 입력하세요. 이번에 담글 포기 수를 넣고 계산하면 장보기 목록이 나와요. | Enter your usual cabbage count, ingredient quantities, and unit prices. Set this batch’s cabbage count, then calculate and copy your shopping list. |
| `about` | 입력한 양과 단가로 계산한 추정치예요. 예시에 들어 있는 양과 가격은 계산 방식을 보여 주기 위한 가상 값이에요. | The estimate uses your quantities and unit prices. The example uses fictional quantities and prices to demonstrate the calculation. |

## Pitch

Start with the quantities your household already uses. If you usually make 10 heads of cabbage and plan to make 15 this time, enter 15 to scale the list. Add the unit prices you’ve found and see the estimated cost per ingredient. Ingredients with unknown prices stay on the shopping list, and the result labels the subtotal as partial.

## Flow

1. **Setup.** Open directly on the calculator, with empty fields or the last valid draft. Enter the usual cabbage count, the new count if it differs, and any ingredient quantities and prices you have. Tap **계산하기 / Calculate** to open the result.
2. **Example.** From an empty form, **예시 보기 / Try an example** fills the form and opens the result in one tap. Its example label follows the data into the editor, result, and copied list.
3. **Result.** Show the target cabbage count, estimated total or pricing status, and the scaled shopping list. **수정하기 / Edit inputs** returns to the same draft.
4. **Copy.** **목록 복사 / Copy list** copies the current language’s plain-text list. If clipboard access fails, show the same text in a selectable field on the result screen.

## Controls

- Use native inputs and buttons. Touch and mouse can focus fields, activate buttons, and scroll the ingredient or result panel. Give every button and input a hit area of at least 44 × 44 CSS pixels.
- Tab and Shift+Tab follow visual order. Enter in a setup field submits the form. Space and Enter activate focused buttons. Keep arrow keys, text selection, and clipboard shortcuts available to native controls.
- Use `type="text"` with `inputmode="numeric"` for whole counts and prices and `inputmode="decimal"` for fractional quantities. Validate in the app so the browser supplies no unlocalized validation messages.
- Move focus to the result heading on calculation, the first invalid field on submission failure, and the last edited field when returning to the form. On clipboard failure, focus and select the fallback text.

## Screens

### Setup

Use a warm ivory background (`#FFF7E8`), dark ink (`#22261E`), and a deep red primary action (`#982F27`). Set text in `system-ui` and use tabular numerals for prices. Center the app on desktop. At 320 × 480, keep the header and **Calculate** action visible, with one internally scrolling form between them. A phone keyboard may reduce panel height. Keep the focused field in view and prevent page-level scrolling.

The form begins with the usual and target cabbage counts. Below them, lay out one ingredient per card, with its name above the quantity and price controls. Cabbage quantity comes from the usual count, so its card contains only the price field. Optional ingredients may be left blank. Include **Try an example** when all fields are empty. Show **Clear inputs** when any field contains a value. Clearing uses an inline confirmation with **Clear inputs** and **Cancel**. Cancel restores focus to the clear control. Confirm returns to an empty form and focuses the usual count.

| Ingredient | ko | en | Purchase unit ko / en | Quantity |
|---|---|---|---|---|
| Cabbage | 배추 | Napa cabbage | 포기 / head | From the usual count |
| Radish | 무 | Korean radish | 개 / each | Whole |
| Chili flakes | 고춧가루 | Korean chili flakes | kg / kg | Up to two decimal places |
| Coarse salt | 굵은소금 | Coarse salt | kg / kg | Up to two decimal places |
| Garlic | 마늘 | Garlic | kg / kg | Up to two decimal places |
| Fish sauce | 액젓 | Fish sauce | L / L | Up to two decimal places |

### Result

Show the result heading, target cabbage count, and one of the three pricing states below. Keep **Edit inputs** and **Copy list** below the scrolling shopping list. Each row shows the ingredient, scaled quantity and unit, and line cost or **단가 미입력 / Price missing**. Use sentence case and visible text to distinguish states.

| State | Trigger | Display |
|---|---|---|
| Fully priced | Every included ingredient has a valid price | **예상 비용 / Estimated cost** and the sum of all lines |
| Partly priced | Some included ingredients lack prices | **단가를 입력한 재료 합계 / Subtotal for priced items**, the sum of priced lines, and the number lacking prices |
| Quantities only | Every included ingredient lacks a price | **수량만 계산했어요 / Quantities only** and the number lacking prices |

For the example, use 10 usual heads and 15 target heads. In ingredient-table order, the usual quantities are `10, 3, 1.25, 2, 0.5, 0.75`, with unit prices in won of `3000, 2000, 20000, 1500, 10000, 4000`. The result shows `15, 5, 1.88, 3, 0.75, 1.13` and an estimated cost of **₩109,120**.

### Copy feedback

Use an inline status message for success. For clipboard failure, reveal a labeled, read-only text area in the result panel. It contains the same text the copy button attempted to write. Keep editing and copying available. Clear copy feedback whenever a new result is calculated.

## Calculation and formatting

- The usual cabbage count is required. Both count fields accept whole numbers from 1 to 999. A blank target uses the usual count.
- Radish accepts whole quantities from 0 to 999. Other optional quantities accept 0 to 999.99. Blank and zero quantities omit the row. A price on an omitted row has no effect.
- An included row accepts a whole unit price from 0 to 1,000,000 won. A blank price is unknown. An explicit `0` is a priced line at ₩0.
- Compute each optional ingredient’s exact quantity as `usualQuantity × targetCount ÷ usualCount`. Round up to the next whole unit for radishes and to the next 0.01 kg or L for the remaining ingredients. Cabbage quantity equals the target count.
- Multiply the displayed shopping quantity by its unit price and round to the nearest won, with halves rounded up. Sum the rounded lines. Use integer hundredths and integer division for scaled quantities and line costs so exact boundaries stay exact.
- Trim surrounding whitespace and normalize full-width digits and punctuation. Accept decimal dots for quantities and correctly grouped thousands commas in prices. Reject signs, exponents, currency symbols, invalid grouping, and excess decimal precision. Keep prices in Korean won in both languages. Use grouped numbers, omit trailing fractional zeroes, and render English cabbage counts as `1 head` or `{count} heads`.

## Strings

Use the ingredient names and units above as dictionary entries. Select Korean or English from `?lang=ko` or `?lang=en`, then fall back to `navigator.language` and use English for unsupported languages. Set `<html lang>` to the resolved language. Use `appTitle` for the document title.

| Key | ko | en |
|---|---|---|
| `appTitle` | 김장 비용 계산기 | Kimjang Cost Calculator |
| `intro` | 평소 김장하는 양으로 이번 장보기 목록을 계산해요. | Scale your usual kimjang quantities for this batch. |
| `usualCount` | 평소 배추 포기 수 | Usual cabbage count |
| `targetCount` | 이번 배추 포기 수 | This batch’s cabbage count |
| `targetHint` | 비워 두면 평소 포기 수로 계산해요. | Leave blank to use your usual count. |
| `ingredients` | 재료와 단가 | Ingredients and unit prices |
| `ingredientHint` | 안 쓰는 재료는 양을 비워 두세요. 단가를 몰라도 장보기 목록에 담을 수 있어요. | Leave unused quantities blank. You can list ingredients even when you don’t know their prices. |
| `quantityLabel` | 평소 양 ({unit}) | Usual amount ({unit}) |
| `priceLabel` | {unit}당 가격 (원) | Price per {unit} (won) |
| `fieldName` | {ingredient} {field} | {ingredient}, {field} |
| `calculate` | 계산하기 | Calculate |
| `example` | 예시 보기 | Try an example |
| `exampleNote` | 예시에는 가상의 양과 가격이 들어 있어요. | This example uses fictional quantities and prices. |
| `clear` | 입력 지우기 | Clear inputs |
| `clearQuestion` | 입력한 양과 단가를 모두 지울까요? | Clear all quantities and prices? |
| `cancel` | 취소 | Cancel |
| `cleared` | 입력을 지웠어요. | Inputs cleared. |
| `countError` | 1~999 사이의 정수를 입력해 주세요. | Enter a whole number from 1 to 999. |
| `wholeQuantityError` | 0~999 사이의 정수를 입력해 주세요. | Enter a whole number from 0 to 999. |
| `decimalQuantityError` | 0~999.99 사이의 수를 소수 둘째 자리까지 입력해 주세요. | Enter a number from 0 to 999.99 with up to two decimal places. |
| `priceError` | 0~1,000,000원 사이의 정수를 입력해 주세요. | Enter a whole number from 0 to 1,000,000 won. |
| `resultTitle` | 김장 장보기 목록 | Kimjang shopping list |
| `batch` | 배추 {count}포기 기준 | For {cabbageCount} of cabbage |
| `estimate` | 예상 비용 | Estimated cost |
| `partial` | 단가를 입력한 재료 합계 | Subtotal for priced items |
| `quantitiesOnly` | 수량만 계산했어요 | Quantities only |
| `missingCount` | 단가 미입력 재료 {count}개 | Items missing prices: {count} |
| `missingPrice` | 단가 미입력 | Price missing |
| `roundingNote` | 무는 1개 단위로, kg·L 재료는 0.01 단위로 올림했어요. | Radish quantities round up to whole pieces. Quantities in kg and L round up to the nearest 0.01. |
| `edit` | 수정하기 | Edit inputs |
| `copy` | 목록 복사 | Copy list |
| `copied` | 장보기 목록을 복사했어요. | Shopping list copied. |
| `copyFallback` | 아래 목록을 선택해 복사해 주세요. | Select and copy the list below. |
| `copyTextLabel` | 복사용 장보기 목록 | Shopping list text |
| `amount` | ₩{number} | ₩{number} |
| `shareLine` | {ingredient} {quantity}{unit} · {cost} | {ingredient} · {quantity} {unit} · {cost} |
| `shareTotal` | {label} {amount} | {label} · {amount} |

For copied text, join the result heading, batch line, example note when applicable, ingredient rows, pricing summary, and missing-count line when applicable with newlines. In the quantities-only state, the pricing summary is `quantitiesOnly`. Use `개` / `each` for radish in prices and `개` / `pc` or `pcs` for radish on the result and in copied text. Use `포기` / `head` or `heads` for cabbage. Use the same ingredient and quantity text for visible rows and accessible names. Connect field hints and errors with `aria-describedby` and announce copy and clear feedback through a polite live region.

## localStorage

- `kimjang-cost-calculator:v1:draft` stores the last successfully calculated input strings: usual and target counts, the five optional quantities, the six unit prices, and `isExample`. Save the inputs rather than derived results so they can be reopened in either language.
- Wrap reads, writes, parsing, and removal in `try/catch`. Ignore drafts with malformed structure or values that fail the same validation as the form. On reload, open Setup with the stored inputs. Confirming **Clear inputs** removes the key and clears the in-memory draft and result.
- Mark a draft created through **Try an example** as an example until the user clears it. Edits within that draft retain the example label.

## Edge cases

- A valid cabbage count with every other field empty produces a one-row, quantities-only list. A blank target follows the usual count, including after the usual count changes.
- Quantity scaling from 10 to 15 turns 3 radishes into 5 and 1.25 kg into 1.88 kg. A quantity that scales to exactly 1.50 kg displays as 1.5 kg. A line of 0.01 kg at ₩50/kg rounds to ₩1.
- When a priced ingredient is cleared or reduced to zero, omit it from both the result and subtotal even if its price remains in the setup form.
- A priced row at ₩0 still counts toward pricing completeness. A fully priced ₩0 estimate displays the same heading as any other fully priced estimate.
- Invalid input keeps the user on Setup and retains every field. Associate each inline error with its field and clear that error once the field becomes valid.
- Resizing or changing orientation preserves the draft and active screen. If storage is blocked, calculation, editing, and copying still work for the current visit. If iframe clipboard permissions block copying, the selectable text remains available.
- `#demo` opens the example result for thumbnail QA. It bypasses draft loading and does not write or remove saved data while the hash is active.

## Must not

- No live prices, market averages, recommended ingredient ratios, or claims that the example represents a typical recipe or current prices.
- No external assets or calls, analytics, accounts, or uploaded shopping data. Ship the UI as one `index.html` with embedded CSS and JavaScript, alongside `meta.json`. Generate `thumb.png` through QA.
- No real store names, logos, or retailer rankings. No sound, browser dialogs, popups, navigation away, or automatic clipboard writes.
- No page-level scrolling. Keep the full workflow usable at 320 × 480 with touch, mouse, and keyboard.
- Before publishing, run `npm test`, `npm run build`, and `npm run qa -- --thumbs`. Check the thumbnail shows the populated example result and verify setup, calculation, editing, and clipboard fallback in both languages.