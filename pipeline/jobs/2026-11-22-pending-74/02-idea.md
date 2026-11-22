# Idea and spec: 김장 비용 계산기 / Kimjang Cost Calculator

## Concepts scored

Each criterion is scored from 1 to 5. Korean search and share scores are estimates based on the supplied research and the concepts’ likely use cases.

| Concept | Category | First 10 seconds | Originality | Korean search/share demand | One-file buildability | Total | Verdict |
|---|---|---:|---:|---:|---:|---:|---|
| **김장 비용 계산기 / Kimjang Cost Calculator** | **tools** | **5** | **4** | **4** | **5** | **18** | **Picked.** A ready-to-edit shopping list shows what changes when you buy 15 kg of cabbage instead of 10 kg, including which ingredients need another pack. |
| 냉동실 한 칸 / One Freezer Drawer | puzzle | 4 | 4 | 3 | 4 | 15 | Fit six illustrated food containers into a freezer drawer. Tap to rotate and use arrows or drag to move. A full drawer makes a recognizable result screenshot. |
| 겨울 이불 토닥 / Pat the Winter Quilt | chill | 5 | 4 | 2 | 5 | 16 | Pat a rumpled winter quilt into place. Each touch flattens a patch, and the last one reveals a stitched pattern. The interaction is immediate, with mainly casual sharing potential. |

The research gives kimjang the clearest seasonal use case. Its price reports use different shopping baskets, so the calculator uses editable pack prices. The design uses salted-cabbage weight as the scaling input because it gives shoppers a quantity they can match to a pack label.

## Meta

slug `kimjang-cost-calculator`

- Category `tools`, kind `tool`, aspect `3/4`, date `2026-11-22`
- Tags ko `김장`, `김장 비용`, `절임배추`, `김장 재료`
- Tags en `kimjang`, `kimchi`, `shopping list`, `cost calculator`
- Title ko `김장 비용 계산기`
- Title en `Kimjang Cost Calculator`
- Desc ko `절임배추 무게를 바꾸면 김장 재료량과 장보기 비용이 바로 나와요. 포장 용량과 가격을 입력해 몇 팩을 사야 하는지 확인해 보세요.`
- Desc en `Scale your kimjang ingredients by salted cabbage weight. Enter pack sizes and prices to get a shopping list and an estimated total.`
- Howto ko `목표 절임배추 무게를 입력하세요. 기준 재료 편집에서 평소 쓰는 재료량과 포장 용량, 가격을 넣고 장보기 목록을 복사하세요.`
- Howto en `Enter your target salted cabbage weight. Edit the reference amounts, pack sizes, and prices, then copy the shopping list.`
- About ko `기본 재료량과 가격은 계산용 예시입니다. 평소 쓰는 레시피와 구매처의 포장 정보를 입력해 예상 비용을 확인하세요.`
- About en `The starting quantities and prices are examples. Use your own recipe and the pack sizes and prices at your store.`

## Pitch

Open straight to a market shopping list for 10 kg of salted cabbage. Change the target to 15 kg and see the needed quantities, whole packs, and total update together. Each row shows the ingredient you need alongside what you have to buy. The sample chili flakes require 900 g at 15 kg, which still fits in the same two 500 g packs. Copy the finished list into a family chat.

## Flow

1. **Calculator.** On first open, show a 10 kg target, the sample list, and the ₩77,500 total. Keep the target field and total visible while the list scrolls. Update the list and total as soon as the target is valid. Each row shows needed quantity, pack count and size, and subtotal. The footer offers `edit` and `copy`.
2. **Reference editor.** Open with the current reference weight, ingredient amounts, pack sizes, and prices. The reference weight is the cabbage weight the entered recipe quantities are based on. Show ingredients as single-open accordion sections, with the cabbage section open initially. Its reference amount follows the reference weight. Each other ingredient accepts `0` to omit it. `Apply` validates and commits the whole draft, then returns to the calculator. `Cancel` discards the draft. The target stays at its current value.
3. **Sample reset.** `restore` in the reference editor opens an inline confirmation with `keepEditing` and `loadSample`. Loading the sample replaces the editor draft. Apply commits those values, while Cancel discards them. The calculator’s target weight stays at its current value.
4. **Copy feedback.** A successful copy shows `copied` in the calculator footer. If clipboard access fails, open an in-frame panel with the same list in a read-only textarea, manual-copy instructions, and `back`. Return to the calculator at the same scroll position.

## Controls

- **Touch and mouse.** Tap or click labeled controls. Give every button and field at least a 44 px hit area. The list and editor body support swipe and wheel scrolling. Keep the document itself fixed to the iframe.
- **Keyboard.** Use native fields and buttons. Tab and Shift+Tab move focus, Enter and Space activate buttons, and native editing and selection keys work inside fields. Enter in a numeric field commits the typed value by blurring the field and never submits the editor. Escape acts as Cancel in the editor, Keep editing in the reset confirmation, and Back in the manual-copy panel. Let an active IME composition finish before handling keys.
- **Focus.** On entering the editor or manual-copy panel, focus its heading. On returning, focus the originating button. For an invalid Apply, expand the section containing the first invalid input, focus it, and expose the error through `aria-describedby` and `aria-invalid`.
- **Language.** Use `?lang=ko` or `?lang=en` when valid. Otherwise use Korean if `navigator.language` starts with `ko`, and English in all other cases. Set `<html lang>` accordingly. Keep UI text, exported text, and accessibility labels in the same `ko` and `en` dictionaries.

## Sample ingredients and calculations

The reference recipe and initial target both use **10 kg** of salted cabbage. Pack prices are illustrative inputs. Use grams for solids and milliliters for fish sauce. Display cabbage quantities in kilograms, including fractional kilograms when needed.

| Ingredient key | ko | en | Reference amount | Pack size | Price per pack |
|---|---|---|---:|---:|---:|
| `cabbage` | 절임배추 | Salted napa cabbage | 10,000 g | 5,000 g | ₩18,000 |
| `radish` | 무 | Korean radish | 2,000 g | 1,000 g | ₩2,500 |
| `chili` | 고춧가루 | Korean chili flakes | 600 g | 500 g | ₩13,000 |
| `garlic` | 다진 마늘 | Minced garlic | 300 g | 200 g | ₩3,000 |
| `fishSauce` | 액젓 | Fish sauce | 300 mL | 500 mL | ₩4,500 |
| `ginger` | 다진 생강 | Minced ginger | 0 g | 100 g | ₩2,000 |

- Target and reference weights accept whole kilograms from 1 to 100. Reference amounts for the other ingredients accept 0 to 99,999 in their row’s unit. Pack sizes accept 1 to 99,999 in the row’s unit. Pack prices accept 0 to 999,999 whole won. Keep pack fields editable and validate them for every row, including omitted rows.
- Let `scaledNumerator = referenceAmount × targetKg`. Display `ceil(scaledNumerator / referenceKg)` in the recipe unit, and compute `packs = ceil(scaledNumerator / (referenceKg × packSize))`. Use integer arithmetic for the numerators and denominators. The cabbage row derives its reference amount from `referenceKg × 1,000`, so its needed quantity always equals the target.
- Subtotal is `packs × pricePerPack`. Sum all included subtotals. A zero reference amount omits the row from the list and copy output. A zero pack price keeps the row visible with a zero subtotal. Group digits using `Intl.NumberFormat` for the active locale and prefix won amounts with `₩`.
- The sample at 10 kg totals **₩77,500**. At 15 kg it totals **₩101,000**, with 3 cabbage packs, 3 radish packs, 2 chili packs, 3 garlic packs, and 1 fish sauce pack. At 20 kg the cabbage lands on an exact pack boundary and requires 4 packs.

## Visual design

Use a cream paper background `#F7F2E6`, ink `#242620`, cabbage green `#315647` for primary actions, and chili red `#A4372B` for validation. Use system fonts, tabular numerals for costs, and dashed rules between ingredient rows. Put the total in the strongest type on the screen and keep quantities and units readable without relying on color.

At 320 × 480, use one column with a fixed header and footer. Give ingredient names room to wrap and right-align subtotals. Let the center panel take the remaining height with `min-height: 0` and vertical overflow. Fill the iframe and center a single content column up to 560 px wide on larger screens. Resizing preserves the active screen, draft, and open ingredient section. Use a static layout with immediate value changes. The item is silent.

## Copy

On the copy button’s user gesture, write plain text using `navigator.clipboard.writeText` when available. If the call is unavailable or fails, display the manual-copy panel and select the textarea contents. Use one header, one line per included ingredient in table order, and a final total. Format amounts the same way on screen and in the copied list. Copy the exact result visible when the button was activated.

## Strings

Metadata and ingredient strings are defined above. The tables below cover the remaining visible text, accessible labels, validation messages, and copy templates.

| Key | ko | en |
|---|---|---|
| `appTitle` | 김장 비용 계산기 | Kimjang Cost Calculator |
| `target` | 목표 절임배추 무게 (kg) | Target salted cabbage weight (kg) |
| `total` | 예상 장보기 비용 | Estimated shopping total |
| `list` | 장보기 목록 | Shopping list |
| `sampleNote` | 기본 재료량과 가격은 계산용 예시예요. | Starting amounts and prices are examples. |
| `edit` | 기준 재료 편집 | Edit reference amounts |
| `editorHelp` | 평소 레시피의 절임배추 무게와 재료량을 입력하세요. | Enter the cabbage weight and ingredient amounts from your usual recipe. |
| `reference` | 기준 절임배추 무게 (kg) | Reference salted cabbage weight (kg) |
| `referenceAmount` | 기준 재료량 ({unit}) | Reference amount ({unit}) |
| `cabbageAmount` | 기준 절임배추 {quantity} | Reference salted cabbage {quantity} |
| `packSize` | 한 팩 용량 ({unit}) | Pack size ({unit}) |
| `packPrice` | 한 팩 가격 (원) | Price per pack (won) |
| `omitHint` | 재료량을 0으로 입력하면 목록에서 빠져요. | Enter 0 to leave this ingredient off the list. |
| `omitted` | 목록에서 제외 | Off the list |
| `apply` | 적용 | Apply |
| `cancel` | 취소 | Cancel |
| `restore` | 예시값 불러오기 | Load sample values |
| `restorePrompt` | 편집 중인 재료량과 가격을 예시값으로 바꿀까요? | Replace the amounts and prices in this draft with sample values? |
| `keepEditing` | 계속 편집 | Keep editing |
| `loadSample` | 예시값 사용 | Use sample values |
| `copy` | 목록 복사 | Copy list |
| `copied` | 장보기 목록을 복사했어요. | Shopping list copied. |
| `manualTitle` | 장보기 목록 직접 복사 | Copy the list manually |
| `manualHelp` | 아래 텍스트를 길게 누르거나 Ctrl+C 또는 ⌘C로 복사하세요. | Touch and hold the text, or use Ctrl+C or ⌘C to copy it. |
| `back` | 계산기로 돌아가기 | Back to calculator |
| `integerError` | {min}~{max} 사이의 정수를 입력하세요. | Enter a whole number from {min} to {max}. |
| `invalidTarget` | 무게를 입력하면 장보기 목록을 계산할 수 있어요. | Enter a valid weight to calculate the shopping list. |
| `needed` | 필요량 {quantity} | Need {quantity} |
| `buy` | {packSize} × {count}팩 | {count} × {packSize} |
| `lineCost` | {ingredient} 구매 비용 {subtotal} | {ingredient} subtotal {subtotal} |
| `fieldLabel` | {ingredient} {field} | {ingredient} — {field} |
| `quantity` | {number} {unit} | {number} {unit} |
| `units` | kg / g / mL | kg / g / mL |
| `copyHeader` | 김장 장보기 목록 · 절임배추 {target} | Kimjang shopping list · {target} salted cabbage |
| `copyRow` | {ingredient} · {needed} · {buy} · {subtotal} | {ingredient} · {needed} · {buy} · {subtotal} |
| `copyTotal` | 예상 장보기 비용 {total} | Estimated shopping total {total} |

## localStorage

- `kimjang-cost-calculator:v1` stores a JSON snapshot of `targetKg`, `referenceKg`, and the six rows’ editable amounts, pack sizes, and pack prices by ingredient key. The cabbage amount is derived and omitted from storage.
- Save valid target changes and successful Apply actions. Persist only committed values. Wrap storage access and JSON parsing in `try/catch`. Validate the entire loaded snapshot using the form’s bounds and expected ingredient keys. Use the sample state if validation fails. Keep the calculator fully usable in memory if storage is blocked or full.

## Edge cases

- Numeric fields use `inputmode="numeric"` and explicit validation. Accept digits with surrounding whitespace and properly grouped commas in pasted values, such as `18,000`. Reject blanks, signs, decimal points, scientific notation, and misplaced commas. Permit blank drafts while typing. Show field errors on blur or Apply.
- If the target is temporarily invalid, hide the total and rows, show `invalidTarget`, and disable copy. Preserve the editor entry point and the last valid stored target. Recompute the whole result as soon as a valid target is entered.
- Apply leaves an invalid draft open and keeps the calculator’s committed data intact. Loading the sample clears draft errors. Reopening the editor after Cancel always uses committed values.
- Announce the total politely after a short typing pause or on blur. Announce copy feedback through a status region. Preserve the shopper’s focus while totals update.
- Verify both languages and keyboard, mouse, and touch at 320 × 480 and desktop sizes. Check the sample totals, an exact pack boundary, a zero-amount row, a zero-price row, invalid input, storage denial, and clipboard denial. Run `npm test`, `npm run build`, and `npm run qa -- --thumbs` from `play`. The generated thumbnail should show the populated calculator.

## Must not

- No live price feeds, scraping, analytics, remote assets, external dependencies, or network calls. Ship the experience as one `index.html` with inline CSS and JavaScript, plus the required `meta.json` and QA-generated `thumb.png`.
- No claims that sample prices are current, official, or store quotes. No claims that sample ingredient quantities are a tested recipe or food-safety guidance.
- No real store branding, copied calculator layouts, real people, or copied artwork.
- No page-level scrolling, autoplay, blocking dialogs, pop-ups, or navigation away from the iframe.