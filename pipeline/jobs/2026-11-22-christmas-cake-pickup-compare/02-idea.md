# Idea and spec: 크리스마스 케이크 예약 비교 / Christmas Cake Pickup Compare

## Concepts scored

Scores run from 1 to 5 in this order: value in the first 10 seconds, originality, Korean search/share demand, and buildability in one HTML file. Maximum 20. Demand scores are editorial estimates based on the supplied research and backlog.

| Concept | Category | Score | Verdict |
|---|---|---|---|
| **크리스마스 케이크 예약 비교 / Christmas Cake Pickup Compare** | **tools** | **5 / 4 / 4 / 5 = 18** | **Picked.** An example immediately shows why the cheaper cake can be a poor fit when pickup timing and serving count matter. |
| 군고구마 난로 / Roasted Sweet Potato Stove | chill | 4 / 4 / 3 / 4 = 15 | Tap a paper bag open to see steam, with optional synthesized paper rustle and stove crackle. The tactile winter snack hook is strong, though the sound takes tuning. |
| 크리스마스 전구 잇기 / Holiday Light Links | puzzle | 4 / 3 / 3 / 5 = 15 | Rotate connector tiles to light a small shop window. The payoff is immediate, while the connector mechanic is familiar. |

The research identifies Christmas cake reservations as a seasonal hook. The comparison tool uses the prices, serving counts, and pickup times people already have when choosing between two reservations. The same-day pickup constraint gives it a distinct purpose among the existing snack-budget and group-scheduling tools. [November 22 research](</C:/work/haruhanpan/pipeline/jobs/2026-11-22-pending-7/01-research.md>) · [Item backlog](</C:/work/haruhanpan/play/ideas.md>)

## Meta

slug `christmas-cake-pickup-compare`

- **Category** `tools`
- **Kind** `tool`
- **Aspect** `3/4`
- **Date** `2026-11-22`
- **Tags** ko `크리스마스 케이크`, `케이크 예약`, `픽업 시간`, `케이크 비교` / en `Christmas cake`, `cake reservations`, `pickup time`, `cake comparison`

| Field | ko | en |
|---|---|---|
| `title` | 크리스마스 케이크 예약 비교 | Christmas Cake Pickup Compare |
| `desc` | 크리스마스 케이크 두 후보의 가격과 인분, 픽업 시간을 한눈에 비교해요. 모임 인원과 픽업 마감에 맞는 후보를 바로 확인할 수 있어요. | Compare two Christmas cakes by price, servings, and pickup time. See which options fit your guest count and pickup deadline. |
| `howto` | 예시를 보거나 새로 입력하세요. 같은 날 픽업할 케이크 두 개의 결제 금액, 표시 인분, 픽업 가능 시각을 넣으면 인원과 마감에 맞는 후보가 표시돼요. | Explore the example or start fresh. Enter the total price, listed servings, and earliest pickup time for each cake to see which fits your group and deadline. |
| `about` | 예약 화면에 표시된 정보를 옮겨 적어 두 후보를 비교하는 도구예요. 가격은 원화, 시각은 같은 날 기준이에요. | Compare two options using the details on their reservation pages. Prices are in Korean won, and both pickups are on the same day. |

## Pitch

A compact comparison sheet places two cakes side by side under one guest count and pickup deadline. The opening example is already solved. Cake A costs ₩38,000 and serves six, but pickup starts at 18:30. Cake B costs ₩42,000, serves eight, and can be picked up at 17:30. For six people with an 18:00 deadline, B fits. Move the deadline to 18:30 and A becomes the lower-price fit.

## Flow

1. **EXAMPLE.** Open with six guests, an 18:00 deadline, and both sample cakes. The result immediately highlights Cake B and identifies Cake A’s late pickup.
2. **COMPARE.** Choose **Enter my options** to clear the two cakes and the deadline. Start with the last valid guest count entered in a personal comparison, or six on a first visit. All eight fields update the comparison as they change. **Show example** restores the original sample data.
3. **RESULT.** Keep the result directly below the inputs on the same screen. Show a per-cake status as soon as that cake and the shared fields are valid. Show an overall outcome once both cakes are complete. Leave the inputs visible and editable.

## Controls

- Tap or click a field to edit it. Native buttons and fields support Tab and Shift+Tab in visual order. Enter or Space activates a focused button. Enter in a field commits its formatting and keeps the current view. There are no global keyboard shortcuts.
- Use `inputmode="numeric"` for quantities, prices, and times. Time fields accept a colon or compact digits. Keep visible labels for every field and associate each cake field with its column heading.
- Keep interactive targets at least 44 px high with visible keyboard focus. Use standard touch behavior for text fields so users can select and edit values.
- **Enter my options** focuses the guest count. **Show example** focuses the example heading. Switches replace the current comparison immediately.

## Inputs and calculation

| Field | Scope | Accepted value | Example |
|---|---|---|---|
| Guests | Shared | Integer 1–99 | `6` |
| Pickup deadline | Shared | Same-day time, `00:00`–`23:59` | `18:00` |
| Total price | Per cake | Integer ₩0–₩9,999,999, including any fees the user pays | A `38000`, B `42000` |
| Listed servings | Per cake | Integer 1–99 | A `6`, B `8` |
| Earliest pickup | Per cake | Same-day time, `00:00`–`23:59` | A `18:30`, B `17:30` |

- Normalize full-width digits and colons and trim surrounding whitespace. Quantity fields accept digits only. Price fields also accept correctly grouped thousands commas. Reject decimals, signs, currency symbols, and malformed grouping.
- Time fields accept `H:MM`, `HH:MM`, `HMM`, or `HHMM`. On blur or Enter, format a valid time as `HH:MM` and a valid price with thousands separators. During editing, preserve the typed value and recalculate whenever it parses.
- A cake fits when its listed servings equal or exceed the guest count and its earliest pickup is at or before the deadline. Convert clock times to minutes from midnight for comparison. If a cake misses both conditions, show both reasons.
- If one cake fits, highlight it. If both fit, highlight the lower total price and display the savings. Highlight both for an equal-price tie. If neither fits, show each cake’s reasons without selecting a winner.
- Worked checks using the example prices and times:

  | Guests | Deadline | Expected result |
  |---:|---|---|
  | 6 | `18:00` | B fits. A is late. |
  | 6 | `18:30` | A is the lower-price fit by ₩4,000. |
  | 8 | `18:30` | B fits. A is short by two servings. |
  | 9 | `17:00` | Neither fits. Both are late and short on servings. |

## Screen layouts and states

| Screen or state | Content and behavior |
|---|---|
| Example | Show the title, example label, prefilled comparison, and **Enter my options**. The example remains editable and resets to its defaults when reopened. |
| Personal comparison, incomplete | Show the same fields, **Show example**, and a prompt to finish entering details. Show a completed cake’s status if the shared fields are valid. Leave the winner area neutral. |
| Personal comparison, invalid | Mark invalid fields after blur or Enter with a nearby message and `aria-invalid`. Suppress any result that depends on the invalid value and clear any previous winner. Use the result area for the correction summary. |
| Complete comparison | Show the outcome headline followed by a status for each cake. Highlight qualifying winners with a border and a text label. Use a short outline fade when the winner changes and skip the fade under reduced motion. |

Use a cream background (`#FFF7E8`), pine ink (`#17362E`), green selection (`#1F654A`), and cranberry for missed constraints (`#A33346`). Use system type with tabular digits. On wide screens center the sheet at a maximum of 560 px. At `320×480`, put the guest count and deadline on one row and align Cake A and B in two columns under shared row labels. Keep the outcome below the fields. In short or zoomed viewports, let the sheet scroll internally while the iframe itself stays fixed. Decorative cake illustrations yield space before labels or controls do.

## Strings

Use the meta title for the document title and main heading. All other interface copy is listed below. Templates use locale-formatted numbers, and `{cake}` is the localized Cake A or Cake B label. Announce settled outcome changes through a polite live region.

| Key | ko | en |
|---|---|---|
| `example` | 예시 비교 | Example comparison |
| `enterOptions` | 내 후보 입력 | Enter my options |
| `showExample` | 예시 보기 | Show example |
| `sameDay` | 두 후보의 픽업 시간은 같은 날 기준이에요. | Use pickup times from the same day. |
| `guests` | 모임 인원 | Guests |
| `deadline` | 픽업 마감 | Pickup deadline |
| `cakeA` | 케이크 A | Cake A |
| `cakeB` | 케이크 B | Cake B |
| `price` | 결제 금액 (원) | Total price (KRW) |
| `servings` | 표시 인분 | Listed servings |
| `pickup` | 픽업 가능 시각 | Earliest pickup |
| `cakeFieldLabel` | {cake} {field} | {field} for {cake} |
| `timePlaceholder` | HH:MM | HH:MM |
| `missing` | 빈칸을 채우면 두 후보를 비교할 수 있어요. | Fill in the remaining fields to compare both cakes. |
| `invalidSummary` | 표시된 입력값을 확인해 주세요. | Check the highlighted fields. |
| `invalidQuantity` | 1~99 사이의 정수를 입력해 주세요. | Enter a whole number from 1 to 99. |
| `invalidPrice` | 0~9,999,999원 사이의 정수를 입력해 주세요. | Enter a whole amount from ₩0 to ₩9,999,999. |
| `invalidTime` | 00:00~23:59 사이의 시간을 입력해 주세요. | Enter a time from 00:00 to 23:59. |
| `onlyFit` | {cake}만 조건에 맞아요. | Only {cake} fits. |
| `lowerPrice` | 둘 다 가능해요. {cake}가 {amount}원 더 저렴해요. | Both fit. {cake} costs ₩{amount} less. |
| `tie` | 두 후보 모두 조건에 맞고 가격도 같아요. | Both fit and cost the same. |
| `noneFit` | 두 후보 모두 인원이나 픽업 조건을 충족하지 못해요. | Neither cake fits the guest count and pickup deadline. |
| `fits` | 조건 충족 | Fits |
| `late` | 마감보다 {minutes}분 늦어요. | Pickup is {minutes} min late. |
| `shortOne` | 1인분 부족해요. | Short by 1 serving. |
| `shortMany` | {servings}인분 부족해요. | Short by {servings} servings. |

## localStorage

- `christmas-cake-pickup-compare:v1:guests` stores the last valid personal guest count as a decimal string. Write on blur or Enter in personal mode. Validate the stored value on read and default to six for missing or invalid data.
- Wrap reads and writes in `try/catch`. Keep availability, prices, deadlines, and example edits in memory for the current view.

## Edge cases

- A pickup exactly at the deadline and a serving count exactly equal to the guest count both qualify. A price of zero is valid.
- Compare `00:00` and `23:59` as ordinary times on the same day. Results are independent of the device clock, date, and time zone.
- Clearing a previously valid field immediately removes any dependent result. Wait until blur or Enter before flagging a partial time as invalid. Empty fields use the incomplete state.
- Switching modes clears transient errors and recalculates from the new values. Resizing preserves the current values and mode.
- Accept `?lang=ko` and `?lang=en`. For a missing or unsupported value, use Korean when `navigator.language` begins with `ko` and English otherwise. Set `<html lang>` accordingly.
- With storage unavailable, the comparison and example still work. The first-load example provides the thumbnail state without a separate route.
- Before publishing, run `npm test`, `npm run build`, and `npm run qa -- --thumbs`. Check the generated example thumbnail and both languages at `320×480`, including keyboard navigation and invalid inputs.

## Must not

- No live prices, store listings, availability checks, reservation links, maps, ratings, or suggested serving sizes. Use the values supplied by the user and the clearly labeled fictional example.
- No external assets, fonts, scripts, requests, analytics, or accounts. Keep the tool’s HTML, CSS, and JavaScript in `items/christmas-cake-pickup-compare/index.html`, with the site metadata in `meta.json`.
- No names, brands, storefront imagery, or copied retailer layouts. No sound, pop-ups, browser dialogs, or navigation away from the tool.