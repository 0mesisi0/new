# Idea and spec: 크리스마스 케이크 예약 비교 / Christmas Cake Preorder Compare

## Concepts scored

Scores are 1–5 for value in the first 10 seconds, originality, Korean search/share demand, and buildability in one HTML file. Demand scores are planning estimates based on the supplied research and backlog.

| Concept | Category | First 10 seconds | Originality | Korean search/share | Buildability | Total |
|---|---|---:|---:|---:|---:|---:|
| **크리스마스 케이크 예약 비교 / Christmas Cake Preorder Compare** — compare two quotes and find the cheapest whole-cake order that serves everyone. | **tools** | **5** | **4** | **4** | **5** | **18** |
| 어묵 포장마차 소리 / Fish Cake Stall Sounds — mix simmering broth, a kettle lid, and winter wind with three sound controls. | chill | 4 | 4 | 3 | 4 | 15 |
| 크리스마스 마켓 미션 뽑기 / Christmas Market Mission Draw — draw a small outing challenge, such as finding the smallest star ornament, and share the card with a friend. | random | 5 | 3 | 3 | 5 | 16 |

**Pick:** Christmas Cake Preorder Compare. The research identifies cake preorders as a seasonal hook. The built-in example shows the value in two taps: with 16 guests, ordering one cake of each size costs less than either single-option order.

## Meta

slug `christmas-cake-preorder-compare`

| Field | Value |
|---|---|
| Category | `tools` |
| Kind | `tool` |
| Aspect | `3/4` |
| Date | `2026-11-22` |
| Tags | ko `크리스마스 케이크`, `케이크 예약`, `예산 계산` / en `Christmas cake`, `preorder`, `budget calculator` |

| Field | ko | en |
|---|---|---|
| title | 크리스마스 케이크 예약 비교 | Christmas Cake Preorder Compare |
| desc | 케이크 두 종류의 가격과 인분을 입력하세요. 모임 인원을 채우는 최소 주문 금액과 예산에 맞는 조합을 한눈에 비교해요. | Compare two Christmas cake quotes. See how many whole cakes will serve your guests, what each order costs, and which fits your budget. |
| howto | 모임 인원과 케이크 A·B의 가격, 한 개당 인분을 입력하고 비교하기를 누르세요. 예산을 넣으면 각 조합에 얼마가 남거나 모자라는지도 볼 수 있어요. | Enter your guest count and each cake’s price and servings, then choose Compare orders. Add a budget to see how much each order leaves or goes over. |
| about | 입력한 원화 가격과 인분으로 계산해요. 예약 가능 수량과 추가 비용은 주문 전에 가게에서 확인해 주세요. | The calculator uses the prices in Korean won and serving counts you enter. Check availability and extra charges with the shop before ordering. |

## Pitch

Two quote cards feed into a side-by-side order comparison. The result shows three ways to serve the same group: buy only A, buy only B, or buy both. Each row gives the exact order quantities, total price, spare servings, and budget difference when a budget is supplied.

The planner’s scope choice is to compare cake prices and servings. Fixed order fees, pickup arrangements, and availability stay with the shop quote. Users can include any per-cake fee in the entered price.

## Flow

1. **SETUP** opens with an empty form or a restored draft. Guest count and optional budget sit above the A/B quote tabs. Each quote needs a price per cake and a serving count. Both tabs retain their values while switching.
2. **EXAMPLE** is a button within SETUP. It loads 16 guests, an ₩80,000 budget, cake A at ₩29,000 for 6 servings, and cake B at ₩45,000 for 10 servings. The user can compare immediately or edit the numbers first.
3. **RESULT** opens after valid submission. The lowest-cost order appears first and is visibly marked. The other two orders remain visible for comparison. The user can copy the order summary or return to SETUP with all values intact.

## Controls

- Tap or click the tabs, fields, and buttons. Use native inputs and buttons with visible focus and targets at least 44 × 44 CSS px. Apply `touch-action: manipulation` to buttons and tabs and preserve native text editing in inputs.
- Tab and Shift+Tab follow visual order. The quote tabs use Left/Right to move and activate, with Home and End jumping to A and B. Enter and Space activate focused buttons. Enter in a setup field submits the form unless an IME composition is active.
- Selecting **Fill example** replaces the current draft and activates A. **Edit inputs** returns focus to the last edited input, or the guest count if none was edited. A successful comparison moves focus to the result heading.
- Use `type="text"` with `inputmode="numeric"` and custom validation so browser number formatting and validation popups stay out of the flow.

## Inputs and calculation

| Input | Accepted value |
|---|---|
| Guests | Required integer from 1 to 99 |
| Budget | Optional integer from ₩0 to ₩10,000,000 |
| A and B price per cake | Required integer from ₩1 to ₩1,000,000 each |
| A and B servings per cake | Required integer from 1 to 99 each |

Normalize full-width digits and trim outer whitespace before validation. Accept plain digits in every field. Price and budget also accept correctly grouped thousands commas, with an optional leading `₩`. Reject decimals, signs, exponent notation, malformed commas, and other characters. Keep the user’s original input when validation fails. Format result amounts with `Intl.NumberFormat` using `ko-KR` or `en-US`, prefixed with `₩`. Both languages use Korean won.

For `g` guests, let `sa` and `sb` be the servings per cake and `pa` and `pb` the prices. For an order of `a` and `b` cakes, compute:

- Total servings = `a × sa + b × sb`
- Total price = `a × pa + b × pb`
- Spare servings = total servings − `g`
- Budget difference = budget − total price, when a budget is present

| Plan | Quantities |
|---|---|
| A only | `a = ceil(g / sa)`, `b = 0` |
| B only | `a = 0`, `b = ceil(g / sb)` |
| A + B | For each `a` from `1` through `ceil(g / sa)`, compute `b = max(1, ceil((g − a × sa) / sb))`. Keep the candidate with the lowest total price. Break ties by fewer spare servings, then fewer cakes, then fewer A cakes. |

Sort the three plans by price, spare servings, and cake count, in that order. Use A only, B only, A + B as the stable order for exact ties. Mark every plan with the minimum total price as **Lowest cost**, including a tied plan with more spare servings. The budget is a comparison value. If every plan is over budget, still show all three and highlight the cheapest.

The example produces the following result:

| Order | Servings | Spare | Total | Budget |
|---|---:|---:|---:|---:|
| 1 A + 1 B | 16 | 0 | ₩74,000 | ₩6,000 under |
| 3 A | 18 | 2 | ₩87,000 | ₩7,000 over |
| 2 B | 20 | 4 | ₩90,000 | ₩10,000 over |

## Screens

### SETUP

- Show the title and one line of instruction. Place **Guests** and **Budget (optional)** in a two-column row.
- Below, show two quote tabs and their panel. The panel has two fields in a row, **Price per cake (₩)** and **Servings per cake**. Show the small per-cake fee note under the fields.
- Place **Fill example** and **Compare orders** in the footer. On invalid submission, activate the quote tab containing the first invalid field when needed, associate the message with the field, and focus that field. Check guest count, budget, A price, A servings, B price, and B servings in that order. Show one error at a time in a reserved message area and clear it when the field is edited.
- **Example loaded** appears in the same message area and is announced politely. The example stays on SETUP until the user selects **Compare orders**.

### RESULT

- Show **Compare orders** as the heading, then the guest count and budget if supplied.
- Show three compact cards in sorted order. Each card has the plan label, the order quantities, the total price, servings and spare servings, and a budget line if supplied. Omit zero-quantity cakes from the order line. A lowest-cost card has a cranberry border and a text badge.
- Place **Edit inputs** and **Copy order summary** in the footer. Copy feedback appears within the result screen and is announced through a polite live region.
- If automatic copy fails, reveal a read-only summary field in a compact inline panel. Focus and select its text. **Close** hides this panel and restores focus to **Copy order summary**.

## Visual design

- Use a warm cream background (`#FFF8EE`), white cards (`#FFFFFF`), cocoa text (`#2F211D`), cranberry controls and highlights (`#8D2844`), and evergreen for positive budget differences (`#245A46`). Use words alongside color for validation, budget status, and lowest-cost markers.
- Use system-ui and tabular numerals. Draw a small original cake outline in CSS or inline SVG beside the setup title. Keep it decorative with `aria-hidden="true"`.
- Fill the iframe with a `100dvh` root and a `100vh` fallback, with outer scrolling disabled. Center the content at a maximum width of 540 px on desktop. At 320 × 480, use 12 px side padding, two-column field rows, and compact result cards with the total right-aligned. Allow the content panel to scroll internally if text scaling or the software keyboard reduces available height. Keep the action footer in view.
- Use a brief border or opacity transition on the lowest-cost card. Remove transitions under `prefers-reduced-motion`. Keep the tool silent.

## Export and copy

**Copy order summary** copies a localized plain-text summary. The first line is the app title, followed by the guest count and optional budget. Then include the three plans in display order. Each plan uses the localized label, quantity, price, serving and spare counts, and optional budget line from the result. Append the lowest-cost label to each plan that earned it. Separate plans with blank lines.

Call `navigator.clipboard.writeText` directly from the activation handler. If it is unavailable or rejects in the host iframe, show the manual-copy panel. Reset copy feedback when the user leaves RESULT. Keep the result cards readable in one screenshot at the target iframe size.

## Strings

Use one `{ ko, en }` dictionary for the document title, visible copy, status messages, accessible names, and copied text. Read `?lang=ko` or `?lang=en`. Otherwise use Korean if `navigator.language` starts with `ko` and English in all other cases. Set `<html lang>` to the chosen language.

| Key | ko | en |
|---|---|---|
| `appTitle` | 크리스마스 케이크 예약 비교 | Christmas Cake Preorder Compare |
| `intro` | 케이크 두 종류의 가격을 비교해 모임 인원에 맞는 주문을 골라 보세요. | Compare two cakes and find an order that serves everyone. |
| `guests` | 모임 인원 | Guests |
| `budget` | 예산 (선택) | Budget (optional) |
| `quoteTabs` | 비교할 케이크 | Cakes to compare |
| `cakeA` | 케이크 A | Cake A |
| `cakeB` | 케이크 B | Cake B |
| `price` | 한 개 가격 (원) | Price per cake (₩) |
| `servings` | 한 개당 인분 | Servings per cake |
| `priceNote` | 케이크 한 개마다 붙는 추가 비용은 가격에 포함해 주세요. | Include any per-cake fees in the price. |
| `example` | 예시 채우기 | Fill example |
| `exampleLoaded` | 예시를 채웠어요. 값을 바꿔도 돼요. | Example filled in. You can edit the values. |
| `compare` | 비교하기 | Compare orders |
| `resultTitle` | 주문 조합 비교 | Compare orders |
| `guestSummary` | 모임 인원 {g}명 | Guests: {g} |
| `budgetSummary` | 예산 {amount} | Budget: {amount} |
| `planA` | A만 주문 | A only |
| `planB` | B만 주문 | B only |
| `planMix` | A와 B 함께 주문 | A + B |
| `quantityA` | A {a}개 | A × {a} |
| `quantityB` | B {b}개 | B × {b} |
| `quantityMix` | A {a}개 + B {b}개 | A × {a} + B × {b} |
| `totalPrice` | 합계 {amount} | Total: {amount} |
| `servingSummary` | 총 {serves}인분 · 남는 양 {spare}인분 | Servings: {serves} · Spare: {spare} |
| `lowestCost` | 최저 금액 | Lowest cost |
| `budgetUnder` | 예산 {amount} 남음 | {amount} under budget |
| `budgetExact` | 예산과 같아요 | Exactly on budget |
| `budgetOver` | 예산 {amount} 초과 | {amount} over budget |
| `edit` | 입력 수정 | Edit inputs |
| `copy` | 주문 요약 복사 | Copy order summary |
| `copied` | 주문 요약을 복사했어요. | Order summary copied. |
| `manualCopy` | 아래 내용을 선택해 복사해 주세요. | Copy the text below. |
| `summaryField` | 주문 요약 | Order summary |
| `close` | 닫기 | Close |
| `guestError` | 인원을 1~99 사이의 정수로 입력해 주세요. | Enter a whole number from 1 to 99. |
| `budgetError` | 예산을 0~10,000,000원으로 입력하거나 비워 두세요. | Enter a whole-won budget from ₩0 to ₩10,000,000 or leave it blank. |
| `priceError` | 한 개 가격을 1~1,000,000원 사이의 정수로 입력해 주세요. | Enter a whole-won price from ₩1 to ₩1,000,000. |
| `servingError` | 한 개당 인분을 1~99 사이의 정수로 입력해 주세요. | Enter a whole number of servings from 1 to 99. |

## localStorage

- `christmas-cake-preorder-compare:draft:v1` stores the six setup field values as strings in a JSON object: `guests`, `budget`, `aPrice`, `aServings`, `bPrice`, and `bServings`.
- Persist on field edits and when loading the example. Limit stored field strings to 32 characters and ignore invalid draft shapes on load. Restore to SETUP with A selected. Wrap all storage access and JSON parsing in `try/catch`. Keep the form and calculation usable in memory when storage fails.

## Edge cases

- Blank budget hides budget summaries and plan budget lines. An explicit `0` shows over-budget amounts. A total equal to the budget shows **Exactly on budget**.
- A mixed order always contains both cakes. For a one-person group it can serve more people and cost more than either single-option plan. Show its actual quantities and spare servings.
- Identical quotes and equal-total orders keep a stable display order and all applicable lowest-cost badges.
- Resize, rotation, and opening the keyboard preserve inputs, validation, and the current screen. Recompute layout from CSS without reinitializing state.
- `#demo` opens the example on RESULT for thumbnail QA. The demo session starts from the fixed example and skips draft reads and writes, including subsequent edits.
- Before publishing, run `npm test`, `npm run build`, and `npm run qa -- --thumbs`. Check both languages at 320 × 480, keyboard entry, a tied price, blocked storage, and the copy fallback. Verify the generated thumbnail shows the example result.

## Must not

- No network requests, external fonts or assets, analytics, or live quote retrieval. Ship the interface, logic, and artwork in one `index.html`, with the repository’s separate `meta.json` and generated `thumb.png`.
- No real bakery names, storefront art, current price claims, inventory claims, or booking links.
- No automatic fee estimates, currency conversion, or inferred serving sizes. Use the quantities and prices entered.
- No dialogs, popups, navigation away from the item, or sound autoplay.