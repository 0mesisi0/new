# Idea and spec: 김장 비용 계산기 / Kimjang Cost Calculator

## Concepts scored

Each criterion is scored from 1 to 5, for a maximum of 20. Korean search and share scores are estimates based on the supplied research and the proposed use cases.

| Concept | Category | First 10 seconds | Originality | Korean search/share | One-file buildability | Total | Verdict |
|---|---|---:|---:|---:|---:|---:|---|
| **김장 비용 계산기 / Kimjang Cost Calculator** | **tools** | **5** | **4** | **5** | **5** | **19** | **Picked.** An editable example shows a shopping total and the amount each household pays on the first screen. |
| 전기장판 자리 사수 / Heated Mat Shuffle | arcade | 5 | 4 | 3 | 5 | 17 | Move a pair of socked feet onto the warming tiles before they cool. A short run makes scores easy to compare. |
| 김 서린 창문 낙서 / Foggy Window Doodles | chill | 5 | 4 | 3 | 4 | 16 | Wipe a steamed-up window to draw through the condensation. Slowly returning fog makes each drawing temporary. |

The supplied research identifies seasonal interest in `김장 비용` and `김장 재료`, with different estimates across shopping channels. The calculator uses the household’s own shopping units and prices. Its result doubles as a checklist someone can paste into a family group chat. [Job research, rows 6–8](01-research.md)

## Meta

slug `kimjang-cost-calculator`

- Category `tools`, kind `tool`, aspect `3/4`, date `2026-11-22`.
- Korean tags `김장 비용`, `김장 재료`, `김장 장보기`. English tags `kimjang`, `shopping list`, `cost split`.

| Field | ko | en |
|---|---|---|
| `title` | 김장 비용 계산기 | Kimjang Cost Calculator |
| `desc` | 배추와 고춧가루 등 김장 재료의 수량과 가격을 넣어 장보기 비용을 계산하세요. 여러 집이 함께 담글 때는 집별 부담액도 나눠 볼 수 있어요. | Enter your kimjang quantities and prices to total the shopping list, split the cost between households, and copy the result. |
| `howto` | 예시를 바꿔 보거나 ‘내 장보기’에서 시작하세요. 재료별 수량과 단가, 함께 비용을 낼 집 수를 넣고 ‘장보기 목록 보기’를 누르세요. | Edit the example or start with My shopping list. Enter quantities, unit prices, and the number of households, then open the shopping list. |
| `about` | 예시 금액은 계산 방법을 보여 주기 위한 값이에요. ‘내 장보기’에 입력한 내용은 이 브라우저에 저장돼요. | Example prices illustrate the calculation. Your own shopping list is saved in this browser. |

## Pitch

A kimjang shopping worksheet opens with four example purchases and a live total. Change the cabbage quantity or the number of households and the amount updates immediately. Switch to **내 장보기 / My shopping list** for a blank worksheet or your saved draft. The finished list shows what to buy, what each line costs, and how to distribute any leftover won when households split the bill.

## Flow

1. **WORKSHEET.** First visit opens the example with a total of ₩98,401 split among three households. Either mode lets the user edit six fixed shopping rows and the household count. Switching modes keeps both worksheets intact for the current session. On reload, open the personal worksheet if a valid personal draft exists. Otherwise open the example.
2. **SHOPPING LIST.** The primary action validates the worksheet. On success, show filled rows in worksheet order, the total, and the household split. On error, stay on the worksheet and focus the first problem. **Edit** returns to the same worksheet and restores the last selected field.
3. **COPY VIEW.** Copy the finished list from the results screen. If the iframe or browser blocks direct clipboard access, show the same text in a read-only, selectable field. **Back to list** restores the results.

## Controls

- Use native inputs and buttons with 44 px minimum touch targets. Touch, mouse, and keyboard use the same controls. `Tab` and `Shift+Tab` follow visual order. `Enter` in a worksheet field submits the form after IME composition ends. `Enter` and `Space` activate focused buttons.
- Use text inputs with `inputmode="numeric"` for quantities, prices, and household count. Keep standard cursor movement and text selection. Actions never depend on a drag, hover, or timed gesture.
- Scroll the worksheet or list panel with touch, wheel, or keyboard. Keep the window fixed and put focused inputs into view within their panel.
- On opening results, focus the result heading. On clipboard fallback, focus and select the text. After a successful direct copy, keep focus on the copy button and announce the status once.

## Shopping rows

Each quantity counts units purchased. The price applies to one unit in the same row.

| Row key | ko label | en label | ko unit | en unit, singular / plural | Example quantity × unit price |
|---|---|---|---|---|---|
| `cabbage` | 배추 | Napa cabbage | 포기 | head / heads | 20 × ₩3,200 |
| `flakes` | 고춧가루 | Red pepper flakes | 봉 | bag / bags | 3 × ₩8,000 |
| `radish` | 무 | Korean radish | 개 | piece / pieces | 2 × ₩4,500 |
| `salt` | 소금 | Salt | 봉 | bag / bags | 1 × ₩1,401 |
| `sauce` | 액젓 | Fish sauce | 병 | bottle / bottles | Blank |
| `other` | 기타 재료 | Other ingredients | 묶음 | bundle / bundles | Blank |

Use **Other ingredients** for purchases grouped into one price. A counted unit can be a package of any size that matches the user’s price.

## Calculation and validation

- Accept whole-number quantities from 1 to 999, prices from 0 to 9,999,999 won, and household counts from 1 to 99. Trim surrounding whitespace, accept ASCII and full-width digits, and allow correctly grouped commas. Empty fields stay empty. A zero price counts as a completed, free line. Reject fractions, signs, currency symbols, exponents, and incorrectly grouped commas.
- A row is unused when both fields are empty. One empty field makes the row incomplete. A malformed or out-of-range field gets its own error. A completed row contributes `quantity × unitPrice` in whole won.
- On the worksheet, sum completed rows. Show `—` if there are none. Label the sum **Subtotal entered** whenever any used row is incomplete or invalid. Show the household split only when all used rows and the household count are valid and at least one row is complete.
- To open the list, require one completed row, completion of every used row, and a valid household count. Report errors in visual order. When every row is unused, focus the cabbage quantity with the empty-list message.
- For total `T` and household count `H`, compute `base = floor(T / H)` and `extra = T % H`. When `extra` is zero, every household pays `base`. Otherwise `extra` households pay `base + 1` and the remaining `H − extra` pay `base`. The default example yields one household at ₩32,801 and two at ₩32,800.
- Use `Intl.NumberFormat` with `ko-KR` or `en-US` for grouping. Format money as `{n}원` or `₩{n}`. Keep the underlying calculations in integer won.

## Screen layouts

### Worksheet

- Header with the title and two mode buttons, **Example** and **My shopping list**. Expose the selected mode through `aria-pressed`.
- Place the live total and split immediately under the mode buttons. The example note appears below the total in example mode.
- The middle panel holds the household count and six ingredient rows. Each row has the ingredient label, the unit, and numeric inputs. Visually repeat the quantity and unit-price column labels only once. Give every field a full accessible name.
- The bottom action **View shopping list** stays visible as the panel scrolls. Keep field errors adjacent to their inputs and associate them with `aria-describedby`.

### Shopping list

- The heading, grand total, and household split sit at the top. Below them, the scrolling panel shows each purchased ingredient, its quantity and unit, its unit price, and the extended amount. Zero-cost purchases remain visible.
- The bottom actions are **Edit** and **Copy list**. A copied status appears next to these actions and also uses a polite live region. The example note remains visible in example mode.

### Copy view

- Show the heading, the copy instructions, and a read-only multiline field containing the exact share text. The field scrolls internally if needed. Keep **Back to list** visible below it.
- Build the text as plain lines in this order:

  1. Localized list heading.
  2. Example note, in example mode.
  3. One `shareRow` line per completed purchase.
  4. `shareTotal`.
  5. One or two household split lines as applicable.

## Visual design

- Use a warm paper background `#FAF4E7`, dark ink `#24271F`, cabbage green `#2E5A42` for primary actions, and brick red `#A43828` for errors.
- Use system fonts and tabular numerals. The amount is the largest text on both worksheet and result. Right-align line amounts in results. Allow Korean and English instructions to wrap naturally.
- Fill the iframe with a fixed root and a single scrolling content panel. At 320 × 480, use 12 px side padding, compact headers, and stacked split lines. On desktop, center a worksheet up to 520 px wide. Reflow on resize while preserving field values, focus, and current screen.
- Use a brief color highlight on total changes. Honor `prefers-reduced-motion` by removing the transition. The item is silent.

## Strings

Use a `ko`/`en` dictionary for the following strings and the ingredient table above. Resolve `?lang=ko` or `?lang=en` first, fall back to Korean when `navigator.language` starts with `ko`, and use English otherwise. Set `<html lang>` and the document title accordingly. Include localized field labels and validation messages from the dictionary.

| Key | ko | en |
|---|---|---|
| `appTitle` | 김장 비용 계산기 | Kimjang Cost Calculator |
| `example` | 예시 | Example |
| `personal` | 내 장보기 | My shopping list |
| `exampleNote` | 계산용 예시 가격이에요. | These are example prices. |
| `households` | 함께 비용을 낼 집 수 | Households splitting the cost |
| `ingredients` | 김장 재료 | Kimjang ingredients |
| `quantity` | 수량 | Qty |
| `unitPrice` | 단가(원) | Unit price (₩) |
| `quantityLabel` | {item} 수량 ({unit}) | {item} quantity ({unit}) |
| `priceLabel` | {item} 단가 (원) | {item} unit price (won) |
| `total` | 장보기 합계 | Shopping total |
| `partial` | 입력한 재료 소계 | Subtotal entered |
| `noAmount` | — | — |
| `money` | {n}원 | ₩{n} |
| `quantityValue` | {qty}{unit} | {qty} {unit} |
| `splitEven` | {n}집이 각 {amount} | {n} households pay {amount} each |
| `splitOne` | 1집이 {amount} | 1 household pays {amount} |
| `splitGroup` | {n}집이 각 {amount} | {n} households pay {amount} each |
| `viewList` | 장보기 목록 보기 | View shopping list |
| `listTitle` | 김장 장보기 목록 | Kimjang shopping list |
| `edit` | 수정 | Edit |
| `copy` | 목록 복사 | Copy list |
| `copied` | 장보기 목록을 복사했어요. | Shopping list copied. |
| `copyTitle` | 장보기 목록 복사 | Copy shopping list |
| `copyHelp` | 아래 내용을 선택해 복사해 주세요. | Select and copy the text below. |
| `copyFieldLabel` | 복사할 장보기 목록 | Shopping list text |
| `backToList` | 목록으로 돌아가기 | Back to list |
| `needRow` | 재료를 하나 이상 입력해 주세요. | Enter at least one ingredient. |
| `needQuantity` | 수량을 입력해 주세요. | Enter a quantity. |
| `needPrice` | 단가를 입력해 주세요. | Enter a unit price. |
| `invalidQuantity` | 수량은 1~999 사이의 정수로 입력해 주세요. | Enter a whole quantity from 1 to 999. |
| `invalidPrice` | 단가는 0~9,999,999원 사이의 정수로 입력해 주세요. | Enter a whole price from 0 to 9,999,999 won. |
| `invalidHouseholds` | 집 수는 1~99 사이의 정수로 입력해 주세요. | Enter a whole number from 1 to 99. |
| `resultRow` | {quantity} × {unitPrice} | {quantity} × {unitPrice} |
| `shareRow` | {item} · {quantity} × {unitPrice} = {amount} | {item} · {quantity} × {unitPrice} = {amount} |
| `shareTotal` | 장보기 합계 {amount} | Shopping total {amount} |

Use `splitOne` for any group of size one, `splitEven` for a single group of two or more, and `splitGroup` for a group of two or more when the remainder produces two groups. Field labels use the singular English unit. Result and share lines use the unit inflected for the displayed quantity.

## localStorage

- `kimjang-cost-calculator:draft:v1` stores the raw personal worksheet field strings, keyed by the six row IDs, plus the raw household count. Save after a personal edit. Start a fresh personal worksheet with empty ingredient fields and a household count of `1`.
- Wrap storage reads and writes in `try/catch`. On load, verify the object shape and string lengths, then run normal field validation so a partially entered draft remains editable. Use the in-memory state when storage is unavailable. Example values and edits last only for the current session.

## Edge cases

- An unused row contributes nothing. A quantity with an empty price gives the missing-price message. A filled price with an empty quantity gives the missing-quantity message.
- A completed all-free list opens results with a total of ₩0. A total smaller than the household count can produce a ₩0 share for some households. Display both groups and keep their combined amount equal to the total.
- Disable repeated copy actions while the clipboard promise is pending. If copying fails after the user has left results, ignore the stale callback so it cannot change the current screen.
- On mobile, keep the focused field visible when the virtual keyboard shrinks the viewport. When the available height is 480 px, verify the worksheet and results each retain a visible primary action. Resizing or backgrounding the iframe preserves edits.
- Verify the default example, a zero-price row, a partial row, 99 households, English wrapping at 320 px, blocked storage, and blocked clipboard access. Run `npm test`, `npm run build`, and `npm run qa -- --thumbs`. Check that the generated thumbnail shows the populated example.

## Must not

- No live prices, price feeds, recipe ratios, servings guarantees, or claims that the example represents a particular store or season.
- No external scripts, fonts, media, network requests, or analytics. Keep the interface in `items/kimjang-cost-calculator/index.html`, with `meta.json` beside it and `thumb.png` generated by QA.
- No native dialogs, pop-ups, navigation away from the item, or audio autoplay.
- No store logos, real people, copied interfaces, or humor aimed at households or regions.