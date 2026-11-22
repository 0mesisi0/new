# Idea and spec: 크리스마스 케이크 가격 비교 / Christmas Cake Price Compare

## Concepts scored

Each criterion is scored from 1 to 5, for a maximum of 20. Search and share scores are planning estimates based on the supplied research and backlog.

| Concept | Category | First 10 seconds | Originality | Korean search/share demand | One-HTML buildability | Total |
|---|---|---:|---:|---:|---:|---:|
| **크리스마스 케이크 가격 비교 / Christmas Cake Price Compare** — compare two reservations by total and cost per serving, including fees | **tools** | **5** | **4** | **4** | **5** | **18** |
| 어묵 포장마차 ASMR / Fish Cake Stall ASMR — tap a ladle for a short, synthesized broth pour against the quiet simmer of a winter stall | chill | 4 | 4 | 3 | 4 | 15 |
| 크리스마스 마켓 사진 미션 / Christmas Market Photo Mission — draw a three-shot photo challenge to try with a friend at any market | random | 5 | 3 | 3 | 5 | 16 |

Pick **Christmas Cake Price Compare**. The research brief already identifies cake reservations as a seasonal hook. A one-tap example shows why the comparison matters: the cake with the lower checkout total can cost more per serving. This fills a different need from the existing winter snack budget calculator and the backlog’s bill splitter. The score for search and share demand is an estimate for queries such as `크리스마스 케이크 가격 비교` and `케이크 1인분 가격`.

## Meta

slug `christmas-cake-price-compare`

- Category `tools`, kind `tool`, aspect `3/4`, date `2026-11-22`.
- Tags ko `크리스마스 케이크`, `케이크 예약`, `가격 비교`. Tags en `Christmas cake`, `cake reservations`, `price comparison`.

| Field | ko | en |
|---|---|---|
| title | 크리스마스 케이크 가격 비교 | Christmas Cake Price Compare |
| desc | 크리스마스 케이크 두 개의 가격과 추가 비용을 넣어 보세요. 결제 총액과 1인분 가격을 나란히 보고 예산에 맞는 케이크를 고를 수 있어요. | Compare two Christmas cakes by checkout total and cost per serving. Include any extra fees and see which options fit your budget. |
| howto | 케이크 A와 B의 가격, 인분 수, 추가 비용을 입력하고 ‘가격 비교’를 누르세요. 예산은 선택이에요. ‘예시 보기’로 바로 비교해 볼 수도 있어요. | Enter the price, servings, and any extra fees for cakes A and B, then select Compare prices. Add a budget if you have one, or open the example. |
| about | 가격과 인분 수는 판매처 안내를 보고 직접 입력해요. 모든 금액은 원화로 계산하며 입력값은 이 브라우저에만 저장돼요. | Enter the seller’s prices and serving estimates yourself. All amounts are in Korean won, and your entries stay in this browser. |

## Pitch

Put two bakery price cards side by side. Each shows the checkout total and the cost per serving. An optional budget tells the user how much room each option leaves. The worked example opens in one tap and makes the trade-off clear even before the user has two real quotes.

## Flow and screens

1. **EDIT · Your cakes.** Show the title and one-line instruction. Stack three labeled inputs for Cake A, then the same inputs for Cake B, followed by one optional budget for the purchase. Keep **Compare prices** in the bottom bar and place **See example** beside it. A first visit opens with empty fields. A return visit restores the last draft.
2. **EDIT · Validation.** On submission, mark all invalid fields inline and move focus to the first one in reading order. Preserve all values. Clear a field’s error as soon as the value becomes valid.
3. **RESULT · Your comparison.** Show a three-column grid with the metric, Cake A, and Cake B. Always show checkout total and price per serving. Mark the lower value in each row, or display the tie label once across both options. If a budget was entered, show each cake’s budget status below. **Edit prices** returns to the draft and focuses the field last edited, or Cake A’s price if no field was edited.
4. **RESULT · Worked example.** Use the same result grid with a visible **Example** label and the supplied fixture. **Back to my cakes** returns to the draft with every value intact. The example never saves to the draft.

## Controls

- Touch and mouse use native inputs and buttons. All interactive targets are at least 44 px tall. Numeric fields use `type="text"` and `inputmode="numeric"` to request a numeric keypad while permitting pasted amounts.
- Tab follows the visible order. Enter in a field submits the comparison. Enter and Space activate the focused button. On success or when opening the example, move focus to the result heading. Connect field errors with `aria-describedby` and mark invalid fields with `aria-invalid`.
- Use `100dvh` with a `100vh` fallback. At 320 × 480, let the main panel scroll internally while the action bar stays visible. Keep the iframe document itself fixed. On resize, keep the current view and draft, and make focused inputs reachable when the software keyboard is open.

## Inputs and calculation

| Input | Accepted value |
|---|---|
| Cake price | Required. Whole won from 0 to 9,999,999. |
| Extra fees | Optional. Same range as cake price. Blank means zero. Include any known delivery, packaging, or pickup fees here. |
| Servings | Required. Whole number from 1 to 999. Use the seller’s estimate or the number of portions the buyer expects to cut. |
| Budget | Optional. Whole won from 0 to 19,999,998. Blank hides all budget statuses. |

Trim surrounding whitespace and normalize full-width digits and commas. For money, accept plain digits or correctly grouped comma-separated thousands, such as `42,000`. For servings, accept digits only. Reject signs, decimals, currency symbols, malformed grouping, and out-of-range values. Limit each raw input to 24 characters.

- **Checkout total** = cake price + extra fees.
- **Price per serving** = checkout total ÷ servings. Round to the nearest won for display, with half won rounded up. Choose the lower price by comparing `totalA × servingsB` with `totalB × servingsA`. If the displayed prices match but the exact prices differ, show the rounded-value note and mark the exact lower value.
- **Budget status** = budget minus checkout total, calculated separately for each cake. A positive difference shows the amount left. Zero is exactly on budget. A negative difference shows the amount over budget.
- **Example fixture** — Cake A is ₩32,000 + ₩4,000 for 6 servings. Cake B is ₩44,000 + ₩0 for 8 servings. Budget is ₩40,000. A totals ₩36,000 at ₩6,000 per serving with ₩4,000 left. B totals ₩44,000 at ₩5,500 per serving and is ₩4,000 over budget.

## Visual design

Use cream `#FFF7E9` for the background, plum `#382534` for text, berry `#9B3154` for the primary action, and evergreen `#205E4F` for lower-price labels. Use `system-ui` with tabular numerals. Give the result grid the feel of two bakery price cards through its type and borders. Put an explicit text label on each lower price so color carries no information by itself. Let amounts and badges wrap within their cells on narrow screens.

On entry to the result, use a short opacity transition. Honor `prefers-reduced-motion` by rendering it immediately. The tool is silent.

## Strings

Use the metadata titles for the matching document and edit headings. Keep all other item UI strings in the locale dictionary. Read `?lang=ko` or `?lang=en`, otherwise use Korean when `navigator.language` starts with `ko` and English for other languages. Set `<html lang>` to the active locale.

| Key | ko | en |
|---|---|---|
| intro | 케이크 두 개의 결제 총액과 1인분 가격을 비교해 보세요. | Compare two cakes by checkout total and cost per serving. |
| cakeA | 케이크 A | Cake A |
| cakeB | 케이크 B | Cake B |
| cakePrice | 케이크 가격 (원) | Cake price (KRW) |
| extraFees | 추가 비용 (원, 선택) | Extra fees (KRW, optional) |
| servings | 인분 수 | Servings |
| budget | 예산 (원, 선택) | Budget (KRW, optional) |
| compare | 가격 비교 | Compare prices |
| example | 예시 보기 | See example |
| resultTitle | 케이크 가격 비교 결과 | Cake price comparison |
| exampleLabel | 예시 | Example |
| total | 결제 총액 | Checkout total |
| perServing | 1인분 가격 | Cost per serving |
| lower | 더 저렴 | Lower price |
| tied | 같은 가격 | Same price |
| roundedNote | 표시 금액은 원 단위로 반올림했어요. 더 저렴한 쪽은 반올림 전 가격으로 정해요. | Displayed amounts are rounded to the nearest won. The lower price uses the exact amounts. |
| budgetLeft | 예산 {amount} 남음 | {amount} left in budget |
| budgetExact | 예산에 딱 맞아요 | Exactly on budget |
| budgetOver | 예산 {amount} 초과 | {amount} over budget |
| edit | 가격 수정 | Edit prices |
| backToDraft | 내 케이크로 돌아가기 | Back to my cakes |
| priceError | 0원부터 9,999,999원까지 정수로 입력해 주세요. | Enter a whole amount from ₩0 to ₩9,999,999. |
| servingsError | 1부터 999까지 정수로 입력해 주세요. | Enter a whole number from 1 to 999. |
| budgetError | 0원부터 19,999,998원까지 정수로 입력해 주세요. | Enter a whole amount from ₩0 to ₩19,999,998. |
| won | {number}원 | ₩{number} |

For each input, form its accessible name with `{cake} {field}` in either locale, except the standalone budget field. Format `{number}` with grouped digits and no decimals. Use the `won` template to compose `{amount}`. The result grid uses semantic row and column headings. Use custom inline validation so browser-generated error strings never appear.

## localStorage

- `christmas-cake-price-compare:draft:v1` stores the seven raw input strings as JSON. Save on input, preserving incomplete drafts. Restore known string fields only and apply the same length limit. Missing or invalid fields start blank.
- Wrap reads, parsing, and writes in `try/catch`. Fall back to the in-memory draft if storage is blocked. Opening the example never writes to storage.

## Edge cases

- A blank required field uses the same inline message as an invalid value. Blank optional fees equal zero. A budget of `0` is an entered budget.
- Identical inputs show ties in both rows. Unequal totals can still tie exactly per serving. Both cakes can exceed the budget or fit within it.
- Repeated submission renders one result. Returning to edit and submitting again calculates from the current draft. Reload opens the editor with restored values.
- Use `#demo` to open the worked example for thumbnail capture without touching the draft. Verify both locales at 320 × 480 and desktop size, including keyboard-only use, blocked storage, exact ties, and unequal values that round to the same won. Run `npm test`, `npm run build`, and `npm run qa -- --thumbs`. Check that the generated thumbnail shows both cakes and their totals.

## Must not

- Keep all interactive code and styling in `items/christmas-cake-price-compare/index.html`. Use no network requests, analytics, external assets, or external fonts. Provide `meta.json` separately and generate `thumb.png` with QA.
- Exclude real bakery names, logos, listings, inventory, and reservation deadlines. Use only the supplied fictional example for preset prices.
- Exclude audio, dialogs, pop-ups, and navigation away from the page. Keep all edits and results inside the iframe.