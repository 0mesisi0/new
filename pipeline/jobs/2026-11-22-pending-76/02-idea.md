# Idea and spec: 김장 재료·비용 계산기 / Kimjang Shopping Calculator

## Concepts scored

Scores are 1–5 in each category. Korean search and share scores are editorial estimates based on the supplied research, especially the seasonal interest in kimjang costs and ingredient quantities in rows 6–8.

| Concept | Category | First 10 seconds | Originality | Korean search/share demand | One-file buildability | Total |
|---|---|---:|---:|---:|---:|---:|
| **김장 재료·비용 계산기 / Kimjang Shopping Calculator**. Turn a batch into a shopping list with whole packs, purchase costs, and leftovers. | `tools` | 5 | 4 | 5 | 5 | **19** |
| 현관 불빛 배달 / Porch Light Delivery. Slide a parcel across a courtyard while the motion light is off. Stop when the porch light flickers before switching on. | `arcade` | 5 | 4 | 2 | 4 | 15 |
| 겨울 창문 우체국 / Winter Window Post. Press a stamp into a fogged window to leave a tiny winter scene. Clear the glass and try another stamp. | `chill` | 5 | 4 | 3 | 4 | 16 |

**Pick Kimjang Shopping Calculator.** It answers two questions on the opening screen, how many packs to buy and how much they cost. Editable pack sizes and prices make the result useful when two shops sell the same ingredient in different quantities. The likely Korean queries include `김장 재료 계산기`, `김장 20포기 재료`, and `김장 비용`. [Supplied research](../2026-11-22-pending-76/01-research.md)

## Meta

slug `kimjang-shopping-calculator`

- **Category** `tools`
- **Kind** `tool`
- **Aspect** `3/4`
- **Date** `2026-11-22`
- **Tags** ko `김장`, `김장 재료`, `김장 비용`, `절임배추` · en `kimjang`, `kimchi`, `shopping list`, `batch calculator`
- **Title ko** 김장 재료·비용 계산기
- **Title en** Kimjang Shopping Calculator
- **Desc ko** 김장할 배추 포기 수에 맞춰 재료를 늘리고, 포장 단위와 가격을 넣어 장보기 비용과 남는 양을 계산해요.
- **Desc en** Scale your kimjang ingredients by cabbage count, then enter pack sizes and prices to see what to buy, what it costs, and what will be left.
- **Howto ko** 기준 포기 수와 김장할 포기 수를 정하세요. 재료별 기준 분량, 한 묶음에 든 양, 묶음 가격을 수정한 뒤 장보기 목록을 복사하세요.
- **Howto en** Set the cabbage counts for your recipe and your batch. Edit each ingredient’s recipe quantity, pack size, and pack price, then copy your shopping list.
- **About ko** 처음 나오는 분량과 가격은 계산 예시예요. 집에서 쓰는 레시피의 분량과 직접 확인한 가격으로 바꿔 보세요.
- **About en** The starting quantities and prices illustrate the calculation. Replace them with the amounts in your recipe and the prices you find.

## Pitch

A market-style shopping card opens with a worked 20-head example and a visible ₩107,500 total. Change the target to 15 heads and the list shows how pack rounding affects the bill. Each ingredient row shows how much the batch needs, how much to buy, and what will be left. The copied text is ready to paste into a family chat.

## Flow

1. **SHOPPING LIST.** Open directly to the title, batch figures, total, and four ingredient rows. Use the worked example on first visit and the saved plan on return. The batch button opens the batch editor. Each ingredient row opens its own editor. A sticky footer holds **목록 복사 / Copy list**.
2. **EDIT BATCH.** Show the recipe’s cabbage count and the target cabbage count, with the explanatory line from the string table. **적용 / Apply** validates both fields, saves the plan, and returns to the updated list. **취소 / Cancel** discards editor changes and restores focus to the batch button.
3. **EDIT INGREDIENT.** Show the ingredient name, its unit, the quantity for the base recipe, the quantity per pack, and the pack price in won. The cabbage quantity is fixed at the recipe’s cabbage count and appears as read-only text. **Apply** validates the row and recalculates the list. **Cancel** restores the unchanged row. Both return focus to the originating row button.
4. **COPY.** A successful copy announces an inline status on the shopping list. If clipboard access fails, open a dedicated screen with a read-only text area containing the complete list. Focus and select its text. **목록으로 / Back to list** returns focus to the copy button.

## Controls

- Use native buttons and labeled inputs. Touch and mouse activate the same controls. Every button and input has a minimum 44 px target and a visible focus state.
- Tab and Shift+Tab move through controls. Enter submits either editor. Enter and Space activate focused buttons. Escape cancels an editor or returns from the manual-copy screen. Preserve native text selection and clipboard shortcuts.
- On screen changes, focus the first editable field, the selected text area, or the originating button as appropriate. On validation failure, keep all edits and focus the first invalid field. Associate each message with its field and announce the error.
- Keep the page fixed to the iframe. On short screens, allow vertical scrolling inside the content panel and keep the primary action in view when the keyboard opens.

## Ingredients and calculation

The initial example scales **10 heads to 20 heads**. All prices are integer Korean won. A pack can mean a bag, box, or a single loose item.

| Ingredient | Base recipe quantity | Quantity per pack | Example pack price | Need → buy → leftover | Line cost |
|---|---:|---:|---:|---|---:|
| 절임배추 / Salted napa cabbage | 10 heads | 5 heads | ₩17,000 | 20 → 20 → 0 heads | ₩68,000 |
| 무 / Korean radish | 1,500 g | 1,000 g | ₩2,500 | 3,000 → 3,000 → 0 g | ₩7,500 |
| 고춧가루 / Korean chili flakes | 300 g | 500 g | ₩12,000 | 600 → 1,000 → 400 g | ₩24,000 |
| 마늘 / Garlic | 200 g | 300 g | ₩4,000 | 400 → 600 → 200 g | ₩8,000 |

For each included row:

1. `needed = ceil(baseQuantity × targetHeads / baseHeads)`. Round up once to a whole head or gram. Cabbage resolves directly to `targetHeads`.
2. `packs = ceil(needed / packQuantity)`.
3. `buy = packs × packQuantity`.
4. `leftover = buy − needed`.
5. `lineCost = packs × packPrice` if a price was entered. Sum the priced rows. If any included row has a blank price, label the sum **입력된 가격 소계 / Priced subtotal** and show how many prices are missing. If every included row lacks a price, show the missing-price count and omit the monetary subtotal. A price of `0` is a valid entered price.
6. A base quantity of `0` excludes a non-cabbage ingredient. Keep its saved pack size and price for reuse, show **제외 / Excluded** in its row, and omit it from totals and copied text.

Each default price starts with an example marker. Clear that row’s marker when the user applies an edited price or pack quantity. Display the example-prices note whenever an included, priced row still has its marker. A change to batch size or recipe quantity preserves the marker.

## Shopping list layout

- The top card contains the title, a batch summary button showing both counts, and the dominant total or subtotal. Place the example-price and missing-price lines directly beneath the amount when applicable.
- Use four stacked row buttons. Each shows the ingredient name and line cost on the first line, then the need, packs to buy, and leftover below. Show the purchased quantity beside the pack count. A row with a missing price still shows quantities and substitutes **가격 미입력 / Price missing** for the line cost.
- At 320 px, allow summaries to wrap naturally onto two lines. Keep quantities and units together. Use tabular numerals, group thousands with `Intl.NumberFormat`, and format won as `₩{number}` in both languages.
- On editor screens, place labels above inputs and field errors immediately below. Keep the two footer actions in consistent positions across both editors.

## Visual design

Use a warm paper background `#F7F2E8`, dark green ink `#173D35`, white cards `#FFFCF6`, and red `#A33024` for validation and price markers. Set type in `system-ui`. Use a small decorative inline SVG cabbage beside the title and give the cost figure the strongest emphasis. Keep the main column at most 520 px wide on desktop. Reflow on resize without losing editor contents or focus. A brief highlight can signal an updated amount after Apply. Omit that motion under `prefers-reduced-motion`. The item is silent.

## Copy output

Call `navigator.clipboard.writeText` from the copy button and use the manual-copy screen if access fails or the API is unavailable. Serialize the exact result shown on screen, in the current language, in this order:

1. App title.
2. Localized batch summary.
3. One line per included ingredient, in screen order, using the `copyRow` template below.
4. Total or priced subtotal when available, followed by the missing-price count and example-price note when applicable.

Use line breaks between entries. The text has no links. A copy or manual-copy operation leaves the plan intact.

## Strings

Use one `{ ko: {...}, en: {...} }` dictionary for all interface text, including accessible names, field errors, and the copied list. Read `?lang=ko` or `?lang=en`. For a missing or unsupported query value, use Korean when `navigator.language` begins with `ko`, otherwise use English. Set `<html lang>` to the resolved language. Format template numbers before interpolation.

| Key | ko | en |
|---|---|---|
| `appTitle` | 김장 재료·비용 계산기 | Kimjang Shopping Calculator |
| `batchSummary` | 기준 {base}포기 → 김장 {target}포기 | {base}-head recipe → {target}-head batch |
| `editBatch` | 포기 수 수정 | Edit cabbage counts |
| `batchHint` | 기준은 레시피의 포기 수, 김장할 포기 수는 이번에 담글 양이에요. | Use the cabbage count from your recipe and the count you plan to prepare. |
| `baseHeads` | 레시피의 배추 포기 수 | Cabbages in your recipe |
| `targetHeads` | 김장할 배추 포기 수 | Cabbages in your batch |
| `editIngredient` | {ingredient} 수정 | Edit {ingredient} |
| `cabbage` | 절임배추 | Salted napa cabbage |
| `radish` | 무 | Korean radish |
| `chili` | 고춧가루 | Korean chili flakes |
| `garlic` | 마늘 | Garlic |
| `recipeQty` | 기준 {base}포기 분량 ({unit}) | Quantity for {base}-head recipe ({unit}) |
| `packQty` | 한 묶음에 든 양 ({unit}) | Quantity per pack ({unit}) |
| `packPrice` | 한 묶음 가격 (원, 선택) | Price per pack (KRW, optional) |
| `headUnit` | 포기 | heads |
| `gramUnit` | g | g |
| `headQty` | {n}포기 | {n, plural, one {# head} other {# heads}} |
| `gramQty` | {n}g | {n} g |
| `need` | 필요 {qty} | Need {qty} |
| `buy` | 구매 {packs}묶음 ({qty}) | Buy {packs, plural, one {# pack} other {# packs}} ({qty}) |
| `left` | 남는 양 {qty} | Left over {qty} |
| `excluded` | 제외 | Excluded |
| `priceMissing` | 가격 미입력 | Price missing |
| `missingCount` | 가격 미입력 {n}개 | {n, plural, one {# missing price} other {# missing prices}} |
| `total` | 예상 장보기 비용 | Estimated shopping cost |
| `subtotal` | 입력된 가격 소계 | Priced subtotal |
| `examplePrices` | 예시 가격이 포함돼 있어요. | Includes example prices. |
| `recipeHint` | 레시피 분량을 입력하세요. 빼려는 재료는 0을 넣으세요. | Enter your recipe quantity. Use 0 to skip this ingredient. |
| `apply` | 적용 | Apply |
| `cancel` | 취소 | Cancel |
| `copyList` | 목록 복사 | Copy list |
| `copied` | 장보기 목록을 복사했어요. | Shopping list copied. |
| `manualCopyHeading` | 장보기 목록 직접 복사 | Copy your shopping list manually |
| `manualCopyHint` | 아래 텍스트를 선택해 복사하세요. | Select and copy the text below. |
| `manualCopyText` | 장보기 목록 텍스트 | Shopping list text |
| `backToList` | 목록으로 | Back to list |
| `badNumber` | 숫자를 확인해 주세요. | Enter a whole number. |
| `outOfRange` | {min}~{max} 사이의 정수를 입력해 주세요. | Enter a whole number from {min} to {max}. |
| `moneyLine` | {label} {amount} | {label} {amount} |
| `copyRow` | {ingredient} · {need} · {buy} · {left} · {cost} | {ingredient} · {need} · {buy} · {left} · {cost} |

Plural notation describes the rendered alternatives. Choose the English variant with `Intl.PluralRules` or a simple singular branch in the inline script. For ingredient buttons, combine `editIngredient` with the visible row summary in the accessible label.

## localStorage

- `kimjang-shopping-calculator:v1` stores the last applied plan as JSON. Save `baseHeads`, `targetHeads`, and the four rows’ base quantities where editable, pack quantities, pack prices as integers or `null`, and example markers as booleans. Calculate totals from inputs on every load.
- Read and write inside `try/catch`. Validate stored values using the editor’s rules and use the worked example if the saved record is malformed or incompatible. If access is blocked, retain edits in memory for the current session. Persist only on a successful Apply.

## Edge cases and QA

- **Input bounds.** Both cabbage counts and cabbage pack quantity accept `1–200`. Base weights accept `0–1,000,000` g, pack weights accept `1–1,000,000` g, and pack prices accept blank or `0–10,000,000` won. Trim surrounding whitespace, normalize full-width digits, and accept commas only in valid thousands groups. Reject decimals, negatives, scientific notation, and malformed groups. Use text inputs with `inputmode="numeric"` and inline localized validation.
- **Pack boundaries.** The default fixture yields ₩107,500. At 15 heads, the same fixture yields ₩74,500. Chili needs 450 g, so the list buys one 500 g pack and shows 50 g left. Exactly divisible quantities yield zero leftover.
- **Missing prices.** Clearing the example chili price keeps its two-pack purchase and changes the monetary label to a ₩83,500 priced subtotal with one missing price. Entering `0` shows a priced row and uses the full total label.
- **Excluded ingredients.** Excluding all three optional rows still leaves a valid cabbage list. Re-enabling a row restores its saved pack settings. Excluded rows contribute neither cost nor a missing-price count.
- **Clipboard and layout.** Verify the rejected clipboard path, keyboard-only editing and copying, resizing with an open editor, and both locales at 320×480. Returning from the manual-copy screen should preserve the list and its scroll position.
- **Thumbnail.** With `#demo`, open the complete 20-head example with the example-price note visible and bypass storage reads and writes. Before publishing, run `npm test`, `npm run build`, and `npm run qa -- --thumbs`. Inspect the generated thumbnail for legible totals and ingredient rows.

## Must not

- Use runtime network requests, analytics, external fonts, libraries, or assets. Ship the interface and logic in one `index.html` with the separate required `meta.json` and generated thumbnail.
- Present the example prices as current quotes or the example quantities as a complete kimchi recipe. Keep the estimate scoped to the four listed ingredients.
- Include real shop names, trademarks, people, or copied visual assets.
- Open browser dialogs, launch another page, play audio, or scroll the outer document.