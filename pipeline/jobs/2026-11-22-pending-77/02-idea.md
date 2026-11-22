# Idea and spec: 김장 비용 계산기 / Kimjang Cost Calculator

## Concepts scored

Each criterion is scored from 1 to 5. Demand scores are editorial estimates based on the supplied research and backlog. No item votes are available.

| Concept | Category | First 10 seconds | Originality | Korean search/share demand | One-file buildability | Total |
|---|---|---:|---:|---:|---:|---:|
| **김장 비용 계산기 / Kimjang Cost Calculator** — Change one price and see the batch total update, then copy a family shopping list. | `tools` | 5 | 4 | 5 | 5 | **19** |
| 창문 성에 놀이터 / Frost Window — Wipe a frosted bus window to reveal an illustrated winter street. Arrow keys move the wipe cursor and Space clears a patch. | `chill` | 5 | 4 | 3 | 5 | 17 |
| 현관 앞 장갑 배달 / Mitten Delivery — Steer a mitten across a windy apartment entryway and land it in the matching cubby before the next gust. | `arcade` | 4 | 4 | 3 | 4 | 15 |

**Pick: 김장 비용 계산기.** The research found seasonal interest in 김장 비용 and 김장 재료, with different totals reported across sources. An editable batch ledger answers a household’s own shopping question. The shareable list gives family members the quantities, entered prices, and lines that still need a quote.

## Meta

slug `kimjang-cost-calculator`

- **Category** `tools`
- **Kind** `tool`
- **Aspect** `3/4`
- **Date** `2026-11-22`
- **Tags** — ko `김장 비용`, `김장 재료`, `김장 장보기` · en `kimjang`, `kimchi ingredients`, `shopping list`

| Field | ko | en |
|---|---|---|
| `title` | 김장 비용 계산기 | Kimjang Cost Calculator |
| `desc` | 배추, 무, 고춧가루 등 김장 재료의 수량과 단가를 넣으면 장보기 비용을 바로 계산해요. 가격을 더 알아봐야 할 재료까지 목록에 담아 가족에게 보낼 수 있어요. | Enter your kimjang quantities and prices to total the batch, then copy a shopping list that shows which ingredients still need a quote. |
| `howto` | 예시에서 가격을 바꿔 보세요. ‘내 장보기’에서 수량과 단가를 입력하고 ‘장보기 목록’을 누르면 복사할 수 있어요. | Change a price in the example. Open My batch, enter quantities and unit prices, then open Shopping list to copy them. |
| `about` | 예시 수량과 가격은 계산을 보여 주기 위한 가상 값이에요. 내 장보기 입력값은 이 브라우저에 저장돼요. | Example quantities and prices are fictional. Your batch entries are saved in this browser when storage is available. |

## Pitch

The first view opens on a market shopping sheet with a fictional 20-head batch and a visible **145,200원** total. Change the cabbage price from `4000` to `5000` and the total becomes **165,200원** immediately. When planning a real batch, open a blank **내 장보기 / My batch** and enter the quantities and prices you know. A line with a missing price stays on the shopping list and is counted beside the known subtotal.

## Flow

1. **EXAMPLE** — On a first visit, show the app title, the two batch selectors, the example disclosure, and the editable ingredient rows. The cabbage row appears first. A fixed footer shows the live total and the **장보기 목록 / Shopping list** button. Example edits last for the current visit.
2. **MY BATCH** — Switch using the second selector. The first personal batch opens with empty fields and a brief entry hint. Each edit updates the footer and saves the draft when storage is available. Returning to Example preserves both sets of edits for the current visit. With a stored draft, reopen on My batch on subsequent visits.
3. **SHOPPING LIST** — Replace the editor with a heading, a back button, a scrollable plain-text preview, and a fixed **목록 복사 / Copy list** button. The preview uses the current batch and language. On copy success, announce confirmation. On failure, select the text and show the manual-copy instruction. Back restores the editor’s scroll position and returns focus to the Shopping list button. Example lists carry an example label and the fictional-values disclosure.

## Controls

- Tap or click the two batch selectors, input fields, and action buttons. Give interactive controls a minimum 44 px hit area. Use `inputmode="numeric"` for whole numbers and `inputmode="decimal"` for fractional quantities.
- Use Tab and Shift+Tab to navigate in visual order. Start with the batch selectors, then move through each row’s quantity and price, and finish at Shopping list. Enter and Space activate focused buttons. Preserve native editing behavior inside inputs.
- In the list, move focus to the heading on entry. Escape returns to the editor when the list is open. The preview is a labelled, read-only textarea and supports standard selection and copy shortcuts.
- The editor and preview scroll internally with touch, mouse, and keyboard. Keep the document fixed to the iframe viewport. At `320 × 480`, keep the current total, primary action, and first editable row visible on initial load. When the software keyboard opens, allow the editor to scroll the focused field into view.

## Ingredients and calculation

The listed amounts seed the Example view only. Personal fields start blank.

| Row ID | ko | en | Quantity unit ko / en | Price unit ko / en | Example quantity | Example price |
|---|---|---|---|---|---:|---:|
| `cabbage` | 배추 | Napa cabbage | 포기 / heads | 원/포기 / KRW/head | 20 | 4,000 |
| `radish` | 무 | Korean radish | kg / kg | 원/kg / KRW/kg | 4 | 2,000 |
| `pepper` | 고춧가루 | Korean red pepper flakes | kg / kg | 원/kg / KRW/kg | 1.5 | 24,000 |
| `garlic` | 마늘 | Garlic | kg / kg | 원/kg / KRW/kg | 0.6 | 12,000 |
| `fishSauce` | 액젓 | Fish sauce | L / L | 원/L / KRW/L | 1 | 6,000 |
| `shrimp` | 새우젓 | Salted shrimp | kg / kg | 원/kg / KRW/kg | 0.5 | 16,000 |
| `other` | 기타 비용 | Other costs |  | 원 / KRW |  | 0 |

- Allow whole cabbage quantities from 0 to 999, metric quantities from 0 to 999 with up to two decimal places, and whole won from 0 to 9,999,999 per unit or as an Other costs amount.
- Round each line amount to the nearest won, with half-won values rounding up. For kg and L, parse quantities as integer hundredths and calculate `floor((quantityHundredths × unitPrice + 50) / 100)`. Sum the rounded line amounts. Other costs adds its entered amount directly.
- A positive quantity with a valid price is a priced row. A price of `0` is valid. A positive quantity with a blank price is missing a price. A blank or zero quantity with no positive price leaves the row out of the list. A positive price with a blank or zero quantity marks that row as missing a quantity. Any nonempty invalid input marks its row invalid and excludes its amount until corrected. Blank Other costs is omitted.
- When there are priced rows and unresolved rows, show the sum as **입력된 금액 소계 / Known subtotal**, with the count of unresolved rows. With unresolved rows only, show the subtotal heading and a dash. With no active rows, show the empty state and disable Shopping list. When all active rows are priced, show **총비용 / Total**. A fully priced zero-cost batch displays zero.
- Announce totals and unresolved counts in one polite status region after a brief pause in typing. Update the visible totals immediately.

## Shopping list and copy

Preview and copy use the same plain text. Start with **김장 장보기 목록 / Kimjang shopping list** for My batch or **김장 장보기 목록 (예시) / Kimjang shopping list (example)** for Example. Add the example disclosure on its own line when applicable. Render active rows in editor order, add a blank line, then show the total or known subtotal and any unresolved count.

| Line type | ko | en |
|---|---|---|
| Priced ingredient | `{item} {qty} {unit} × {price} {priceUnit} = {amount}` | `{item} · {qty} {unit} × {price} {priceUnit} = {amount}` |
| Missing price | `{item} {qty} {unit} · 단가 미입력` | `{item} · {qty} {unit} · Unit price needed` |
| Missing quantity | `{item} · {price} {priceUnit} · 수량 미입력` | `{item} · {price} {priceUnit} · Quantity needed` |
| Invalid row | `{item} · 입력값 확인 필요` | `{item} · Check entry` |
| Other costs | `{item} · {amount}` | `{item} · {amount}` |
| Summary | `{label} {amount}` | `{label} {amount}` |

Format display quantities and prices with locale-aware separators. Use `{n}원` in Korean and `₩{n}` in English for line amounts and totals. English uses `head` for a quantity of exactly `1` and `heads` for other quantities.

Call `navigator.clipboard.writeText` directly from the copy button action. If writing fails or the API is unavailable, focus and select the preview and expose the manual-copy hint. Ignore late copy responses after the user leaves the list.

## Visual design

Use a warm ivory background (`#FFF7E8`), ink-green text (`#20352B`), and deep pepper red (`#A12F28`) for the total and primary action. A narrow green rule above the total gives the footer a clear boundary. Use system fonts and tabular numerals for prices. Give each ingredient row a name, two aligned fields with visible units, and an inline status or amount. On wider screens, center the sheet and expand the input columns. At phone widths, let labels and status text wrap without horizontal scrolling. Use a static update for totals and keep the item silent.

## Strings

The metadata, ingredient labels, units, amount formats, and list templates above are part of the localized dictionary. The table below supplies the remaining visible and accessible copy.

| Key | ko | en |
|---|---|---|
| `appTitle` | 김장 비용 계산기 | Kimjang Cost Calculator |
| `batchSelector` | 장보기 유형 | Batch type |
| `example` | 예시 | Example |
| `myBatch` | 내 장보기 | My batch |
| `exampleNote` | 예시 수량과 가격은 가상 값이에요. | Example quantities and prices are fictional. |
| `myBatchHint` | 살 재료의 수량과 단가를 입력하세요. | Enter quantities and unit prices for the ingredients you plan to buy. |
| `quantity` | 수량 | Quantity |
| `unitPrice` | 단가 | Unit price |
| `flatAmount` | 금액 | Amount |
| `quantityLabel` | `{item} 수량 ({unit})` | `{item} quantity ({unit})` |
| `priceLabel` | `{item} 단가 ({priceUnit})` | `{item} unit price ({priceUnit})` |
| `flatAmountLabel` | 기타 비용 금액 (원) | Other costs amount (KRW) |
| `missingPrice` | 단가 미입력 | Unit price needed |
| `missingQuantity` | 수량 미입력 | Quantity needed |
| `wholeQuantityError` | 0~999 사이의 정수를 입력하세요. | Enter a whole number from 0 to 999. |
| `decimalQuantityError` | 0~999 사이의 수를 소수 둘째 자리까지 입력하세요. | Enter a number from 0 to 999 with up to two decimal places. |
| `priceError` | 0~9,999,999 사이의 원 단위 금액을 쉼표 없이 입력하세요. | Enter a whole won amount from 0 to 9,999,999 without commas. |
| `total` | 총비용 | Total |
| `knownSubtotal` | 입력된 금액 소계 | Known subtotal |
| `unresolved` | 확인할 항목 {n}개 | Items to check: {n} |
| `empty` | 수량과 가격을 입력하면 여기에 합계가 나와요. | Enter quantities and prices to see the total here. |
| `noAmount` | — | — |
| `openList` | 장보기 목록 | Shopping list |
| `listTitle` | 김장 장보기 목록 | Kimjang shopping list |
| `exampleListTitle` | 김장 장보기 목록 (예시) | Kimjang shopping list (example) |
| `previewLabel` | 복사할 장보기 목록 | Shopping list text |
| `back` | 입력으로 돌아가기 | Back to entries |
| `copy` | 목록 복사 | Copy list |
| `copied` | 장보기 목록을 복사했어요. | Shopping list copied. |
| `copyHelp` | 목록을 직접 복사해 주세요. | Copy the selected text manually. |
| `storageUnavailable` | 이 브라우저에서는 입력값을 저장할 수 없어요. | This browser can’t save your entries. |

## localStorage

- `kimjang-cost-calculator:draft:v1` stores the personal draft only. It contains the raw strings for each named ingredient’s quantity and unit price and the Other costs amount, with each value capped at 24 characters. Restore recognized string fields and validate them through the same parser used for live edits. Ignore unknown fields and treat unreadable records as an empty draft.
- Wrap every read and write in `try/catch`. On access or write failure, keep the personal draft in memory and show `storageUnavailable` in My batch. Example edits and copy status stay in memory. If the personal form has no nonblank strings, remove the draft key.

## Edge cases

- Set `<html lang>` and the string dictionary from `?lang=ko` or `?lang=en`. For other values or an absent parameter, use Korean if `navigator.language` begins with `ko` and English otherwise.
- Trim surrounding whitespace and normalize full-width digits and decimal points before validation. Keep raw text visible during editing. Blank input stays blank. Reject grouping separators, negative amounts, exponent notation, excess decimal places, and out-of-range values. Link each field error to its input with `aria-describedby`.
- Preserve both drafts, active screen, and entered values when the iframe resizes. Switching batch selectors clears transient copy feedback and starts the selected editor at the top.
- For `#demo`, open a fresh Example view with the 145,200원 or ₩145,200 total and ignore the stored personal draft for that visit. Treat the demo’s personal edits as in-memory only.
- Verify the default total and cabbage-price example in both locales. Also verify free entries, missing quantities and prices, rounding at a half won, invalid paste, restored drafts, blocked storage, blocked clipboard access, and the `320 × 480` layout. Run `npm test`, `npm run build`, and `npm run qa -- --thumbs` before publishing. Use the QA-generated thumbnail.

## Must not

- No live prices, national-average claims, automatic recipe ratios, or serving recommendations. Keep fictional example inputs visibly labelled in both the editor and copied list.
- No external assets, fonts, scripts, requests, or analytics. Keep the item’s HTML, CSS, and JavaScript in one `index.html`.
- No real retailers, logos, or copied calculator layouts.
- No page-level scrolling, modal dialogs, new windows, automatic clipboard writes, or navigation away from the item.