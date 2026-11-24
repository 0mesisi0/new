# Idea and spec: 중복 할인 계산기 / Stacked Discount Calculator

slug `stacked-discount-calculator`

## Concepts scored

Scores are 1–5 in each column, with a maximum of 20. Korean search and share scores are editorial estimates. The research brief’s Consumer Day hook informed the shopping concept.

| Concept | Category | First 10 seconds | Originality | Korean search/share demand | One-file buildability | Total |
|---|---|---:|---:|---:|---:|---:|
| **중복 할인 계산기 / Stacked Discount Calculator**. Compare the final price when a fixed coupon goes before or after two percentage discounts. | **tools** | **5** | **4** | **4** | **5** | **18** |
| 고드름 물방울 받기 / Icicle Drip Catch. Slide a cup under three icicles and catch ten drops as they fall at staggered intervals. | games | 5 | 3 | 3 | 5 | 16 |
| 겨울 풍경 소리 / Winter Wind Chimes. Tap a hanging chime to hear it, then mix three synthesized chimes with a wind slider. | radio | 4 | 4 | 2 | 4 | 14 |

The calculator wins because its opening example answers a concrete shopping question immediately. A ₩5,000 coupon can change the final price by a different amount depending on when it applies. The item works year-round with user-entered prices and coupon values.

## Meta

- Slug `stacked-discount-calculator`, category `tools`, kind `tool`, aspect `3/4`, date `2026-11-25`
- Tags KO `중복 할인`, `할인 계산기`, `쿠폰` / EN `stacked discounts`, `discount calculator`, `coupons`
- Title KO `중복 할인 계산기` / EN `Stacked Discount Calculator`
- Desc KO `정가와 할인율 두 개, 정액 쿠폰 금액을 넣어 보세요. 쿠폰을 먼저 쓸 때와 나중에 쓸 때 최종가가 얼마나 달라지는지 바로 비교할 수 있어요.`
- Desc EN `Enter a price, two percentage discounts, and a fixed coupon. Compare what you pay when the coupon goes first or last.`
- Howto KO `예시 숫자를 바꾸면 두 가지 적용 순서의 최종가가 바로 바뀌어요. 쓰지 않는 할인이나 쿠폰에는 0을 넣으세요.`
- Howto EN `Edit the example to update both totals. Enter 0 for any discount or coupon you want to leave out.`
- About KO `할인 단계마다 할인액의 원 미만을 버리는 방식으로 계산해요. 매장마다 쿠폰 적용 조건과 끝수 처리 방식이 다를 수 있어요.`
- About EN `The calculator rounds each discount amount down to the nearest won. Store eligibility and rounding rules may differ.`

## Pitch

Two price tags sit below four editable numbers. The opening example shows **₩67,000** with the coupon last and **₩68,400** with the coupon first. The ₩1,400 difference is visible on load. Change one field and both tags update together.

## Flow and screens

1. **Ready.** Open directly to the calculator. Show the title, one instruction line, and four prefilled fields. The example uses a ₩100,000 list price, discounts of 20% and 10%, and a ₩5,000 coupon. Below the fields, show the two prices, the difference, and the rounding note. Keep the coupon-first card on the left and the coupon-last card on the right.
2. **Editing.** Update both prices on each valid input event. Give the cheaper card an accent border and label it in text. If the totals match, remove the highlight and show the tie message.
3. **Incomplete or invalid input.** Keep the inputs and both card labels visible. Replace both amounts with an em dash and show the first invalid field’s message in the summary area. Mark every invalid field programmatically. Follow field order when choosing the message. Accept corrections immediately.
4. **Restore example.** The example button restores all four original values and clears field errors. Stay on the calculator and keep focus on the button.

## Controls

- Touch, mouse, and keyboard use native inputs and a native button. Provide 44 px minimum targets. Tapping a label focuses its input. Tab follows the order in the strings table, then reaches the example button. Enter and Space activate the button when focused.
- Use text inputs with `inputmode="numeric"` for won and `inputmode="decimal"` for percentages. Keep edit values ungrouped. Apply thousands separators to output amounts only.
- Keep native text selection and editing keys available. Use ordinary button activation for pointer and keyboard input. Render the form without submission or navigation.

## Calculation

Let `P` be the list price, `C` the fixed coupon, and `r1` and `r2` integer rates in hundredths of a percentage point. Parse `12.50` as `1250`. For each stage compute `afterRate(price, r) = price − floor(price × r / 10000)` and `afterCoupon(price) = max(0, price − C)`.

- **Coupon first:** Apply `C`, then `r1`, then `r2`.
- **Coupon last:** Apply `r1`, then `r2`, then `C`.
- Display the absolute difference between the final integer totals. Keep both percentage discounts in the entered order because each stage rounds separately.
- `P` and `C` accept whole won from 0 to 9,999,999. `r1` and `r2` accept percentages from 0 to 100 with up to two decimal places. Normalize full-width digits and decimal points and trim outside whitespace. For won fields, optionally accept pasted commas with valid thousands grouping. Accept a leading decimal point before digits in percentage fields. A trailing decimal point with no following digits is incomplete. Reject signs, exponents, currency or percent symbols, grouping errors, and extra decimal places. Require an explicit zero when a discount is unused.
- Example check: `95,000 → 76,000 → 68,400` with the coupon first, and `80,000 → 72,000 → 67,000` with the coupon last.
- Rounding check: at ₩101 with two 10% discounts and a ₩1 coupon, coupon first yields ₩81 and coupon last yields ₩82. This case should highlight the first card.

## Visual design

Use two off-white price tags on a pale blue-gray background, dark navy text, and a teal accent for the cheaper result. Use system fonts and tabular numerals. Keep decoration in CSS and hide decorative shapes from assistive technology.

Fill the iframe with a `100dvh` layout and a `100vh` fallback, with a centered content column up to 480 px wide. At 320×480, use a two-by-two field grid and two side-by-side result cards. Let English labels wrap, use `min-width: 0` on grid children, and reserve two lines for the result or validation message. Keep the page scroll-free throughout the supported size range. Use static feedback with no animation or audio.

## Strings

Use the Meta translations for the document and screen titles. Resolve supported `?lang=ko` or `?lang=en` first, then use Korean for a Korean browser locale and English otherwise. Set `<html lang>` and store all interface strings and validation messages in the language dictionary. Use the active locale for output number grouping.

| Key | KO | EN |
|---|---|---|
| intro | 쿠폰은 언제 써야 더 쌀까요? | When does the coupon save you more? |
| listPrice | 정가 (원) | List price (₩) |
| firstRate | 첫 할인 (%) | First discount (%) |
| secondRate | 추가 할인 (%) | Second discount (%) |
| coupon | 정액 쿠폰 (원) | Fixed coupon (₩) |
| restoreExample | 예시 값 넣기 | Restore example |
| couponFirst | 쿠폰 먼저 | Coupon first |
| couponLast | 쿠폰 나중에 | Coupon last |
| cheaper | 더 저렴 | Lower price |
| differenceFirst | 쿠폰을 먼저 쓰면 ₩{amount} 더 저렴해요. | Using the coupon first saves ₩{amount} more. |
| differenceLast | 쿠폰을 나중에 쓰면 ₩{amount} 더 저렴해요. | Using the coupon last saves ₩{amount} more. |
| tie | 어느 순서로 써도 최종가가 같아요. | Both orders give the same final price. |
| missing | {field} 값을 입력해 주세요. | Enter a value for {field}. |
| invalidWon | {field} 값을 0~9,999,999 사이의 정수로 입력해 주세요. | For {field}, enter a whole number from 0 to 9,999,999. |
| invalidRate | {field} 값을 0~100 사이로 입력해 주세요. 소수점 둘째 자리까지 쓸 수 있어요. | For {field}, enter 0 to 100 with up to two decimal places. |
| rounding | 단계마다 할인액의 원 미만은 버려요. | Each discount amount is rounded down to the nearest won. |
| price | ₩{amount} | ₩{amount} |
| unavailable | — | — |
| unavailableLabel | 계산 결과 없음 | No total available |

Use the field’s translated label for `{field}`. Associate error messages with the relevant input. Use one polite live region for the summary, with a short debounce so typing several digits produces one announcement. Mark unavailable amounts with `unavailableLabel` for assistive technology.

## localStorage

No keys. Keep edits in memory and load the sample on every fresh visit. The calculator must work when storage is blocked.

## Edge cases

- A zero list price, a 100% discount, or a coupon larger than the eligible amount can produce ₩0. Every intermediate and final price stays at or above zero.
- Both percentages at zero, or a coupon of zero, always produce a tie. Rounding can also produce a tie with nonzero inputs.
- Blank fields and temporarily incomplete decimals clear the displayed results until all four values are valid. Never show an old quote alongside invalid input.
- Resizing preserves edits, focus, and the current result. After the repo’s `npm test` and `npm run build`, run `npm run qa -- --thumbs`. The generated thumbnail should show the populated example with its two different prices and the Korean summary.

## Must not

- Keep the item’s HTML, CSS, and JavaScript in one `index.html`. No external assets, network calls, analytics, or external storage.
- No real retailer branding, store-specific coupon rules, tax or shipping calculations, or claims that either order is available at checkout.
- No pop-ups, dialogs, or navigation. Keep price comparisons and validation inside the iframe.