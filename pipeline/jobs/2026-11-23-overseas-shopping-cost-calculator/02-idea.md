# Idea and spec: 해외직구 총비용 계산기 / Overseas Shopping Cost Calculator

## Concepts scored

Scores run from 1 to 5 in each column. The demand scores are editorial estimates based on the supplied research and backlog.

| Concept | Category | First 10 seconds | Originality | Korean search/share demand | One-file buildability | Total |
|---|---|---:|---:|---:|---:|---:|
| **해외직구 총비용 계산기 / Overseas Shopping Cost Calculator** | **tools** | **5** | **3** | **5** | **5** | **18** |
| 주소 한 줄의 여행 / A Domain Name’s Journey | tech | 4 | 4 | 3 | 5 | 16 |
| 겨울 세탁실 / Winter Laundry Room | radio | 4 | 4 | 2 | 4 | 14 |

**Picked:** Overseas Shopping Cost Calculator. The November 23 research identifies overseas shopping as a seasonal hook, and `직구 총비용` and `해외직구 가격 비교` describe a concrete search intent. A one-tap example shows how shipping and extra charges change the gap between an overseas offer and a Korean offer. The subject is distinct from the queued and published price tools because the comparison centers on an overseas checkout and currency conversion.

The DNS concept turns the backlog’s explainer into a tappable journey from a typed address through a fictional DNS lookup. Winter Laundry Room applies the research’s tactile-audio direction to a synthesized washer cycle with three user-triggered sounds.

## Meta

slug `overseas-shopping-cost-calculator`

- **Category** `tools`
- **Kind** `tool`
- **Aspect** `3/4`
- **Date** `2026-11-23`
- **Tags** · ko `해외직구`, `직구 총비용`, `블랙프라이데이`, `가격 비교` · en `overseas shopping`, `total cost`, `Black Friday`, `price comparison`

| Field | ko | en |
|---|---|---|
| title | 해외직구 총비용 계산기 | Overseas Shopping Cost Calculator |
| desc | 해외 상품가에 배송비와 환율, 추가 비용을 더해 원화 총액을 계산해요. 같은 상품의 국내 구매가와 얼마나 차이 나는지 바로 비교해 보세요. | Convert an overseas price and shipping to won, add any extra charges, and compare the total with the Korean price. |
| howto | 예시로 결과를 먼저 보거나 직접 입력하세요. 해외 상품가와 배송비, 외화 1단위당 환율, 국내 결제 총액을 넣고 비교하세요. 알고 있는 추가 비용도 더할 수 있어요. | Try the example or enter your own prices. Add the overseas item price, shipping, won per currency unit, the Korean checkout total, and any known extra charges. |
| about | 입력한 금액만 합산하며 입력 내용은 이 화면에서만 사용해요. 관세나 카드 수수료 등을 알고 있다면 원화로 환산해 추가 비용에 넣으세요. | The calculator adds the amounts you enter and keeps them in this session. Enter any known duties or card fees as extra charges in won. |

## Pitch

Put two checkout slips side by side. The overseas slip turns an item price and shipping into won, then adds any extra charges the user already knows. The Korean slip shows the full domestic checkout price. The result gives the difference in won and shows the arithmetic beneath it.

The example starts with an ₩80-equivalent label only in the input currency, then reveals the complete comparison: US$80 for the item plus US$10 shipping at ₩1,400 per dollar, plus ₩9,000 in extra charges, gives ₩135,000. A Korean checkout total of ₩149,000 makes the overseas offer ₩14,000 lower.

## Flow and screens

1. **START.** Show the title, the intro sentence, and a small illustration of two slips. `예시로 보기 / Try an example` opens RESULT immediately. `직접 입력 / Enter prices` opens EDIT with USD selected and blank fields.
2. **EDIT.** Show one compact form with a currency selector and five amount fields. Put item price and overseas shipping on one row and the rate on its own row so its unit is visible. Put extra charges and the Korean checkout total in the final row. Keep `총액 비교 / Compare totals` in the bottom bar. A failed submission stays on EDIT, shows one inline message at the first invalid field in reading order, and focuses that field. A successful submission opens RESULT and focuses its heading.
3. **RESULT.** Show the price-difference headline above two equal-width slips. The overseas slip shows converted item plus shipping, extra charges, and overseas total. The Korean slip shows the domestic checkout total. An example label stays visible on the sample result. `입력 수정 / Edit prices` restores the form with all values intact. Submitting a comparison after editing the sample removes its example label. `결과 복사 / Copy result` copies the localized summary. Copy feedback appears on this screen without shifting the slips.
4. **COPY FALLBACK.** If clipboard writing fails or is unavailable, reveal a read-only, selectable text area below the slips, focus it, and select its contents. `닫기 / Close` hides it and returns focus to `결과 복사 / Copy result`. Keep the result and its edit button available throughout.

## Inputs and calculation

| Field | Accepted value | Default |
|---|---|---|
| Overseas currency | USD, JPY, or EUR | USD |
| Item price | 0–9,999,999.99 USD or EUR, or 0–9,999,999 JPY | Required |
| Overseas shipping | Same range and precision as item price, in the selected currency | Blank means zero |
| Exchange rate | 0.0001–999,999.9999 KRW per **one** selected currency unit | Required |
| Extra charges | Whole won from 0 to 999,999,999 | Blank means zero |
| Korean checkout total | Whole won from 0 to 999,999,999, including domestic shipping | Required |

Trim surrounding spaces. Accept ASCII digits and an optional decimal point, with optional correctly grouped thousands commas in the whole-number part. Reject signs, embedded spaces, currency symbols, exponents, malformed grouping, and excess precision. Use text inputs with a decimal or numeric input mode so paste and validation behave consistently.

Parse values into scaled integers and use `BigInt` for multiplication. Use a scale of 100 for USD and EUR amounts, 1 for JPY, and 10,000 for the rate. Add the overseas item price and shipping before converting. Divide their product with the scaled rate by the combined scale and round once to whole won, with an exact half-won rounded up. Then compute:

- `overseasTotal = convertedItemAndShipping + extraCharges`
- `difference = koreanTotal − overseasTotal`
- A positive difference means the overseas total is lower. A negative difference means the Korean total is lower. Show the absolute amount in either headline. An exact zero uses the tie headline.

Display all result amounts with comma grouping and no decimals, using `{n}원` in Korean and `₩{n}` in English. The fixed example uses USD `80`, `10`, `1400`, `9000`, and `149000` in field order.

## Controls and layout

- **Touch and mouse** work through native pointer interaction with buttons, the currency selector, and fields. All interactive targets are at least 44 px high. The form panel supports vertical panning when it needs to scroll.
- **Keyboard** uses native Tab and Shift+Tab order, Enter or Space on buttons, and Enter to submit the form. Leave editing and selection keys native in text fields. Associate field errors with `aria-describedby` and set `aria-invalid` on the affected field. Announce copy success in a polite live region.
- **Layout** fills the iframe with `100dvh` and a `100vh` fallback. Center the content at a maximum width of 520 px. At 320 × 480, use 12 px outer padding and allow labels to wrap. Keep the page fixed and let only the form or result panel scroll if content exceeds the available height, including when the software keyboard opens. Keep the primary controls visible in the bottom bar. Reflow on resize without discarding inputs or changing screens.
- **Visual design** uses a warm background `#F3EEE4`, white slips `#FFFFFF`, dark ink `#182829`, and teal `#146B60` for the main action and the lower total. Use system UI fonts, tabular figures, and a stronger border on the lower-cost slip. Keep the difference explicit in text. Use a 140 ms opacity transition between screens and remove it under `prefers-reduced-motion`. The tool is silent.

## Strings

Store these strings and the metadata copy in the `ko` and `en` dictionaries as applicable. A supported `?lang=ko` or `?lang=en` wins. Otherwise use Korean when `navigator.language` starts with `ko` and English for all other values. Set `<html lang>` and the document title from the selected language. The currency codes `USD`, `JPY`, and `EUR` are identical in both dictionaries.

| Key | ko | en |
|---|---|---|
| `appTitle` | 해외직구 총비용 계산기 | Overseas Shopping Cost Calculator |
| `intro` | 배송비까지 더하면 직구가 얼마나 쌀까요? | How much does an overseas order cost once shipping is included? |
| `example` | 예시로 보기 | Try an example |
| `enter` | 직접 입력 | Enter prices |
| `editTitle` | 구매 비용 입력 | Enter checkout costs |
| `currency` | 해외 결제 통화 | Overseas currency |
| `item` | 해외 상품가 | Overseas item price |
| `shipping` | 해외 배송비 · 선택 | Overseas shipping · optional |
| `rate` | {currency} 1단위당 환율 (원) | Won per 1 {currency} |
| `rateHint` | 엔화도 100엔이 아닌 1엔 기준으로 입력하세요. | For JPY, enter won per 1 yen. |
| `extras` | 추가 비용 (원) · 선택 | Extra charges in won · optional |
| `extrasHint` | 알고 있는 관세나 카드 수수료 등을 원화로 넣으세요. | Enter any known duties or card fees in won. |
| `domestic` | 국내 결제 총액 (원) | Korean checkout total in won |
| `domesticHint` | 국내 배송비도 포함하세요. | Include domestic shipping. |
| `compare` | 총액 비교 | Compare totals |
| `exampleLabel` | 예시 결과 | Example result |
| `overseasLower` | 해외직구가 {amount} 저렴해요 | The overseas total is {amount} lower |
| `domesticLower` | 국내 구매가 {amount} 저렴해요 | The Korean total is {amount} lower |
| `tie` | 두 구매 총액이 같아요 | Both totals are the same |
| `converted` | 상품가와 배송비 환산액 | Converted item price and shipping |
| `extrasLine` | 추가 비용 | Extra charges |
| `overseasTotal` | 해외직구 총액 | Overseas total |
| `domesticTotal` | 국내 구매 총액 | Korean total |
| `resultNote` | 입력한 금액 기준이에요. | Based on the amounts entered. |
| `edit` | 입력 수정 | Edit prices |
| `copy` | 결과 복사 | Copy result |
| `copied` | 비교 결과를 복사했어요. | Comparison copied. |
| `copyManual` | 아래 내용을 직접 복사해 주세요. | Copy the text below manually. |
| `copyTextLabel` | 복사할 비교 결과 | Comparison text to copy |
| `close` | 닫기 | Close |
| `required` | 금액을 입력해 주세요. | Enter an amount. |
| `requiredRate` | 환율을 입력해 주세요. | Enter an exchange rate. |
| `invalidNumber` | 숫자를 확인해 주세요. | Check the number format. |
| `precisionWhole` | 소수점 없이 입력해 주세요. | Enter a whole number. |
| `precisionDecimal` | 소수점 아래 {digits}자리까지 입력해 주세요. | Use at most {digits} decimal places. |
| `outOfRange` | {min}~{max} 범위로 입력해 주세요. | Enter a value from {min} to {max}. |
| `won` | {n}원 | ₩{n} |

The copy payload uses one line each for the app title, example label when present, result headline, overseas total, Korean total, and result note, in that order. Compose labeled amount lines as `{label} {amount}`. Use the same payload in the manual copy field.

## localStorage

No keys. Keep the form values, selected currency, and current result in memory for the life of the iframe. Reload starts on START. Revisiting EDIT within the same session preserves the current values.

## Edge cases and QA

- A required price of `0` is valid. A blank required price triggers `required`. A blank rate triggers `requiredRate`, and a zero rate triggers `outOfRange`. Validate the first invalid field in visible reading order. Clear its previous error on edit and validate again on submit.
- When the currency changes, clear the exchange rate because its unit changed. Preserve the item and shipping digits for revalidation. For example, `15.50` carried from USD to JPY fails with `precisionWhole` until corrected.
- Verify the fixed example produces ₩126,000 before extra charges, ₩135,000 overseas total, and a ₩14,000 difference. Change the Korean total to ₩135,000 for a tie and to ₩130,000 for a ₩5,000-lower Korean total. Check that `0.01` USD at `50` KRW per USD rounds from half a won to one won.
- Test the full flow in both languages at 320 × 480 with touch, then with keyboard only. Resize while editing. Test clipboard permission denial, grouped numeric paste, and upper bounds.
- `#demo` opens the fixed example result for thumbnail capture. Run `npm test`, `npm run build`, and `npm run qa -- --thumbs` before publishing. Inspect the generated thumbnail for legible totals and an unobstructed result headline.

## Must not

- Keep all runtime HTML, CSS, and JavaScript in `items/overseas-shopping-cost-calculator/index.html`. Ship the metadata beside it and generate the thumbnail with repository QA.
- No network requests, external assets or fonts, analytics, scraping, merchant links, or live exchange rates.
- No automatic duties, tax thresholds, card fees, or promotional rules. Use only the amounts entered by the user and the labeled fictional example.
- No real store names, logos, checkout replicas, or recommendations to buy. The result compares the entered totals.
- No browser dialogs, popups, navigation away, or page-level scrolling.