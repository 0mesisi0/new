# Idea and spec: 김장 재료·비용 계산기 / Kimjang Shopping Calculator

## Concepts scored

Scores are 1–5 for value in the first 10 seconds, originality, Korean search and share demand, and buildability in one HTML file. Demand scores are planner estimates based on the supplied research. Maximum 20.

| Concept | Category | First 10 seconds | Originality | Korean demand | Buildability | Total | Verdict |
|---|---|---:|---:|---:|---:|---:|---|
| **김장 재료·비용 계산기 / Kimjang Shopping Calculator** | **tools** | 5 | 4 | 5 | 5 | **19** | **Picked.** A one-tap example shows how doubling a recipe can change what you actually buy. The result is a shopping list with pack counts and a total based on prices you enter. |
| 문틈 바람 막기 / Stop the Draft | arcade | 5 | 4 | 3 | 4 | 16 | Slide a draft stopper along the bottom of a door to catch gusts. An original winter reflex game with an immediately readable action. |
| 내 컵의 수증기 / Steam on the Glass | chill | 5 | 4 | 2 | 5 | 16 | Clear a fogged window with your fingertip or keyboard. The marks slowly fog over again. It offers a quick tactile payoff and a weaker search hook. |

The job research identified two practical questions for kimjang season: how much of each ingredient to buy and what the trip will cost. Pack rounding joins those questions in one result. The concept uses the research for the seasonal hook and the household’s own numbers for the estimate.

## Meta

slug `kimjang-shopping-calculator`

| Field | Value |
|---|---|
| Date | `2026-11-22` |
| Category | `tools` |
| Kind | `tool` |
| Aspect | `3/4` |
| Tags (ko) | 김장, 김장 재료, 김장 비용, 장보기 |
| Tags (en) | kimjang, kimchi, shopping list, cost calculator |

| Field | ko | en |
|---|---|---|
| Title | 김장 재료·비용 계산기 | Kimjang Shopping Calculator |
| Desc | 평소 김장 분량을 이번 배추 포기 수에 맞춰 보세요. 재료별 포장 단위와 가격을 입력하면 몇 팩을 살지, 얼마가 들지 한눈에 볼 수 있어요. | Scale your kimjang recipe to a new cabbage count. Enter pack sizes and prices to see what to buy and how much it will cost. |
| Howto | 기준 배추와 이번 배추의 포기 수를 입력하세요. 재료별 기준 분량과 한 팩의 용량, 가격을 넣으면 장보기 목록이 나와요. | Enter the original and target cabbage counts. Add each ingredient’s original quantity, pack size, and pack price to get a shopping list. |
| About | 예시 분량과 가격은 계산 방법을 보여 주기 위한 값이에요. 실제 장보기에는 평소 쓰는 분량과 구매처의 가격을 입력하세요. | The sample quantities and prices illustrate the calculation. For your own list, enter quantities from your recipe and prices from your shop. |

## Pitch

A shopping slip shows what you need beside what you’ll buy. If the scaled recipe calls for 750 g of 고춧가루 and the shop sells 500 g packs, the slip shows `750 g 필요 · 2팩 구매 · 22,000원`. The start screen gives readers the full worked example in one tap. For a real list, they can enter the ingredients they want to price and copy the result into the family group chat.

## Flow

1. **START** → **BATCH SIZE** → **INGREDIENTS 1–3** → **RESULT**.
2. **START** → **EXAMPLE RESULT** in one tap. The example can be edited in memory.
3. **RESULT** → **BATCH SIZE** via **Edit quantities and prices**. Retain values when moving backward and forward. Recalculate whenever the result is opened.
4. **RESULT** → **Manual copy** inline if clipboard copying fails. Closing it returns focus to the copy button.
5. **Home** returns to **START**. A real draft resumes through **Continue my list**. Opening the example again restores the original sample values.

## Controls

- Tap or click native buttons and fields. Use visible labels and numeric mobile keyboards (`inputmode="numeric"`). Every button and input target is at least 44 × 44 CSS px.
- Tab and Shift+Tab follow the displayed order. Enter or Space activates a focused button. Enter in a field submits the current step. Native form submission and pointer activation use the same handler, including validation.
- Put focus on the screen heading after a transition and on the first invalid field after a failed submission. Link each inline error to its field with `aria-describedby` and set `aria-invalid`. Tab or scroll can bring any field into view.
- Support touch, wheel, and keyboard scrolling in the internal content panel. Result rows are static text. The copy status uses a polite live region and does not steal focus on success.

## Screens

| Screen | Content and actions |
|---|---|
| **Start** | Title, one-line intro, and a sample summary tile showing **8 → 12** cabbages and **₩81,000** in the selected locale. Primary button opens a real list. Secondary button opens the example result. If a nonempty real draft exists, the primary button reads **Continue my list**. |
| **Batch size** | Step 1 of 4. Two required fields for original and target cabbage counts. Hint explains where each number comes from. Bottom actions are **Back** and **Next**. Back returns home and keeps the draft. |
| **Ingredients 1–3** | Steps 2–4 of 4. Each page has two ingredient cards with fields for recipe quantity, pack size, and pack price. Show unit symbols beside inputs and include units in accessible field names. The heading identifies the ingredient group. The hint explains how to skip an ingredient and leave a price unknown. Bottom actions are **Back** and **Next**, with **View shopping list** replacing **Next** on step 4. Example mode shows its label on every edit screen. |
| **Result** | Header shows the original and target cabbage counts. A summary card shows **Estimated total**, **Priced subtotal**, or **No prices entered**, as applicable. Each included ingredient shows its scaled need, pack count, purchase quantity, and line cost or **Price unknown**. Show a rounded-up note on rows where purchase quantity exceeds need. The example has a visible **Example** label and explanatory note. Footer offers **Copy shopping list**, **Edit quantities and prices**, and **Home**. |
| **Manual copy** | Inline panel below the result summary. Show the same text as clipboard copy in a labeled, readonly textarea, select it on open, and provide **Close**. Keep the result visible and preserve its scroll position on close. |

## Ingredients and calculation

The sample is a worked arithmetic example. Its quantities and prices are illustrative.

| Step | Ingredient (ko / en) | Unit | Sample recipe quantity for 8 heads | Sample pack size | Sample pack price |
|---|---|---|---:|---:|---:|
| 2 | 배추 / Napa cabbage | 포기 / heads | 8 | 2 | 6,000 |
| 2 | 무 / Korean radish | 개 / pieces | 2 | 1 | 2,000 |
| 3 | 굵은소금 / Coarse salt | g | 800 | 1,000 | 3,500 |
| 3 | 고춧가루 / Gochugaru | g | 500 | 500 | 11,000 |
| 4 | 다진 마늘 / Minced garlic | g | 200 | 200 | 3,000 |
| 4 | 액젓 / Fish sauce | mL | 300 | 500 | 4,000 |

- Both cabbage counts must be integers from 1 to 200. Read recipe and pack quantities as whole counts, grams, or milliliters from 1 to 1,000,000. Pack prices are whole KRW from 0 to 1,000,000.
- Prefill the cabbage row’s recipe quantity from the original cabbage count. It is a read-only value when the cabbage row is included. Include the row when its pack size or price has been entered. A cabbage row with both fields blank is skipped, so users who already have cabbage can still price the rest.
- Other rows with all fields blank are skipped. Any entry in those rows requires recipe quantity and pack size. A blank price means unknown. An explicit `0` counts as a known price.
- `needed = ceil(recipe quantity × target heads ÷ original heads)`. Round up to the next whole displayed unit. `packs = ceil(needed ÷ pack size)`. `buy quantity = packs × pack size`. With a known price, `line cost = packs × pack price`.
- If every included row has a price, show the estimated total. If only some do, show the priced subtotal and the number of unpriced ingredients. If none do, show **No prices entered** without a numeric total.
- Opening the example uses 8 original heads and 12 target heads. The fixed sample yields 6 cabbage packs, 3 radish packs, 2 salt packs, 2 gochugaru packs, 2 garlic packs, and 1 fish sauce pack, for **81,000원 / ₩81,000**.

## Visual design

- Fill the iframe with a warm paper background (`#FAF5E9`), dark ink (`#242820`), and a deep red primary action (`#922F28`) with white text. Use muted green (`#365642`) for quantities and a dashed rule between the shopping slip summary and rows. Pair all status colors with explicit text.
- Use system UI type and tabular numerals for amounts. The shopping slip leads with the total and keeps the ingredient name on its own line. Allow Korean and English labels to wrap at 320 px width.
- Use a `100dvh` shell with a `100vh` fallback, a compact header, a `min-height: 0` scrolling content panel, and a footer in normal layout. The document itself never scrolls. At 320 × 480, fields and result rows can scroll within the panel. At wide sizes, center the content in a column up to 560 px while the background fills the iframe. Resizing reflows the layout and preserves the current state and focus.
- Use CSS for focus and press feedback. There is no continuous animation or sound.

## Copy shopping list

Copy plain text in the active language via `navigator.clipboard.writeText` on button activation. Use the inline manual-copy panel when clipboard writing is unavailable or rejected. A copy action takes a snapshot of the displayed result, including the example label and any missing-price notice. Preserve the result’s ingredient order.

| Line | ko | en |
|---|---|---|
| Header | 김장 장보기 목록 | Kimjang shopping list |
| Optional example label | 계산 예시 | Worked example |
| Batch | 배추 {base}포기 → {target}포기 | Napa cabbage {base} → {target} heads |
| Known-price row | {name} · {needed} 필요 · {packs} 구매 ({buyQty}) · {amount} | {name} · Need {needed} · Buy {packs} ({buyQty}) · {amount} |
| Missing-price row | {name} · {needed} 필요 · {packs} 구매 ({buyQty}) · 가격 미입력 | {name} · Need {needed} · Buy {packs} ({buyQty}) · Price unknown |
| Last lines | 표시된 합계 또는 가격 안내를 그대로 사용 | Use the visible total or price status wording |

## Strings

Use one `{ ko: {...}, en: {...} }` dictionary for headings, buttons, hints, unit labels, validation, accessible names, and copy templates. Reuse the metadata title for the document title and start heading, the ingredient translations from the table, and the copy templates above. Resolve supported `?lang=ko` and `?lang=en` first. Otherwise use Korean when the primary subtag of `navigator.language` is `ko` and English in all other cases. Set `<html lang>` to the resolved language.

| Key | ko | en |
|---|---|---|
| intro | 이번에 담글 양에 맞춰 장보기 목록을 만들어요. | Turn your kimjang recipe into a shopping list for this batch. |
| start | 내 장보기 목록 만들기 | Make my shopping list |
| resume | 내 목록 이어서 작성 | Continue my list |
| showExample | 계산 예시 보기 | See a worked example |
| example | 계산 예시 | Worked example |
| exampleNote | 예시 분량과 가격으로 계산했어요. | Calculated with sample quantities and prices. |
| batchTitle | 배추는 몇 포기인가요? | How many heads of cabbage? |
| batchHint | 평소 레시피의 배추 포기 수와 이번에 담글 포기 수를 넣어 주세요. | Enter the cabbage count from your recipe and the count for this batch. |
| baseHeads | 기준 배추 포기 수 | Original cabbage count |
| targetHeads | 이번 배추 포기 수 | Target cabbage count |
| step | {step}/4단계 | Step {step} of 4 |
| group1 | 배추와 무 | Cabbage and radish |
| group2 | 소금과 고춧가루 | Salt and gochugaru |
| group3 | 마늘과 액젓 | Garlic and fish sauce |
| ingredientHint | 건너뛸 재료는 비워 두세요. 가격을 모르면 가격 칸만 비워 두세요. | Leave a row blank to skip it. If you don’t know the price, leave just the price blank. |
| cabbageHint | 배추 분량은 기준 포기 수를 사용해요. | The cabbage quantity comes from your original cabbage count. |
| recipeQty | 기준 분량 | Recipe quantity |
| packSize | 한 팩 용량 | Pack size |
| packPrice | 한 팩 가격 | Price per pack |
| fieldName | {ingredient} {field} ({unit}) | {ingredient} — {field} ({unit}) |
| wonUnit | 원 | KRW |
| back | 이전 | Back |
| next | 다음 | Next |
| viewResult | 장보기 목록 보기 | View shopping list |
| resultTitle | 김장 장보기 목록 | Kimjang shopping list |
| batchSummary | 배추 {base}포기 → {target}포기 | Napa cabbage {base} → {target} heads |
| estimatedTotal | 예상 합계 {amount} | Estimated total {amount} |
| pricedSubtotal | 가격을 입력한 재료 합계 {amount} | Priced subtotal {amount} |
| missingCount | 가격을 입력하지 않은 재료 {count}개 | Ingredients with no price entered: {count} |
| noPrices | 입력한 가격이 없어요. | No prices entered. |
| needed | 필요량 {qty} | Need {qty} |
| buy | {packs} 구매 ({buyQty}) | Buy {packs} ({buyQty}) |
| packedUp | 포장 단위에 맞춰 올림 | Rounded up to whole packs |
| priceUnknown | 가격 미입력 | Price unknown |
| money | {number}원 | ₩{number} |
| heads | {number}포기 | {number} head / {number} heads |
| pieces | {number}개 | {number} piece / {number} pieces |
| grams | {number} g | {number} g |
| milliliters | {number} mL | {number} mL |
| packs | {number}팩 | {number} pack / {number} packs |
| headsUnit | 포기 | heads |
| piecesUnit | 개 | pieces |
| gramsUnit | g | g |
| mlUnit | mL | mL |
| copy | 목록 복사 | Copy shopping list |
| copied | 장보기 목록을 복사했어요. | Shopping list copied. |
| manualCopy | 아래 목록을 선택해 복사해 주세요. | Select and copy the list below. |
| copyField | 복사할 장보기 목록 | Shopping list to copy |
| close | 닫기 | Close |
| edit | 분량과 가격 수정 | Edit quantities and prices |
| home | 처음으로 | Home |
| headsError | 1~200 사이의 정수를 입력해 주세요. | Enter a whole number from 1 to 200. |
| requiredQty | 이 재료의 분량과 포장 단위를 모두 입력해 주세요. | Enter both the recipe quantity and pack size for this ingredient. |
| qtyError | 1~1,000,000 사이의 정수를 입력해 주세요. | Enter a whole number from 1 to 1,000,000. |
| priceError | 0~1,000,000원 사이의 정수를 입력해 주세요. | Enter a whole price from 0 to 1,000,000 KRW. |
| emptyList | 장보기 목록에 넣을 재료를 하나 이상 입력해 주세요. | Enter at least one ingredient for your shopping list. |

Apply locale-aware digit grouping to displayed numbers. For English counts, select the singular form only at `1`. The slash in the table separates plural variants.

## localStorage

- `kimjang-shopping-calculator:draft:v1` stores the real draft as `{baseHeads, targetHeads, rows}`. `rows` is keyed by the six fixed ingredient IDs and contains the raw field strings for quantity, pack size, and price. Derive the cabbage recipe quantity from `baseHeads`.
- Save after field edits so incomplete entries can be resumed. Keep screen position, computed totals, copy state, and the example in memory. Every read and write is guarded by `try/catch`. A storage failure leaves the in-memory draft usable for the current visit.

## Edge cases

- Trim surrounding whitespace before validating. Accept ASCII digits with optional standard thousands grouping, and normalize successfully parsed input to ungrouped digits. Reject decimals, negatives, malformed commas, exponent notation, and unit suffixes with the corresponding localized field error.
- Blank pack price preserves the ingredient and its purchase quantity. A zero-won price contributes zero while counting as priced. A price typed without the required quantity or pack size produces an inline error.
- With every row skipped, **View shopping list** shows the empty-list error and remains on step 4. Back can reach earlier ingredient groups. For an exact pack multiple, omit the rounded-up note.
- After changing either cabbage count, retain the entered quantities for non-cabbage rows and recompute the result with the new ratio. The cabbage recipe quantity follows the original head count automatically.
- Ignore unknown stored row IDs and fields with unexpected types. Discard malformed JSON and unsupported draft shapes. On reload, resume a recognized draft from **Batch size**. Opening, editing, or copying the example leaves the real draft available through **Home**.
- Clipboard rejection or iframe restrictions open the manual-copy panel. A user can select the full list using ordinary browser controls.

## Must not

- No live prices, retailer rankings, recommended quantities, recipe instructions, or claims that the sample represents typical costs.
- No accounts, remote storage, analytics, network requests, external assets, or libraries. Package the interface in `items/kimjang-shopping-calculator/index.html` with sibling `meta.json`. Generate `thumb.png` through repository QA.
- No retailer logos, real people, copied shopping interfaces, or mockery of families or regional recipes.
- No `alert`, `confirm`, `prompt`, `window.open`, navigation away from the iframe, audio, or page-level scrolling.