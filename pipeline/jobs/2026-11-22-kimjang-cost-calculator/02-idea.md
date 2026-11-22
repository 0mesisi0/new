# Idea and spec: 김장 비용 계산기 / Kimjang Cost Calculator

## Concepts scored

Each criterion uses a 1–5 scale. The maximum is 20. Korean search and share scores are estimates based on the supplied research and likely search terms. The brief records no votes yet.

| Concept | Category | Value in first 10 seconds | Originality | Korean search and share demand | One-HTML buildability | Total |
|---|---|---:|---:|---:|---:|---:|
| **김장 비용 계산기 / Kimjang Cost Calculator** — See what four ingredients cost when you buy whole packs, and how much will be left over. | `tools` | 5 | 4 | 5 | 5 | **19** |
| 군고구마 봉투 받기 / Roasted Sweet Potato Catch — Move a paper bag left and right to catch tumbling sweet potatoes. Each catch makes the bag sag and change how it handles. | `arcade` | 5 | 4 | 3 | 4 | 16 |
| 주머니 손난로 / Pocket Hand Warmer — Hold a fabric hand warmer to reveal a stitched winter pattern, then watch the color cool as you let go. | `chill` | 4 | 4 | 3 | 5 | 16 |

**Pick Gi​mjang Cost Calculator.** The research surfaced two seasonal questions, how much to buy and what it will cost. The opening example answers both for a visible set of inputs. Whole-pack rounding gives the tool a concrete purpose beyond adding prices. `김장 비용 계산기` and `김장 재료 장보기` are plausible search phrases, and the copied list fits a family group chat. The brief’s research records differing cost estimates, so the calculator uses prices the shopper enters.

## Meta

slug `kimjang-cost-calculator`

- **Category** `tools`
- **Kind** `tool`
- **Aspect** `3/4`
- **Date** `2026-11-22`
- **Tags** ko `김장`, `김장 비용`, `장보기` · en `kimjang`, `shopping list`, `cost calculator`

| Field | ko | en |
|---|---|---|
| `title` | 김장 비용 계산기 | Kimjang Cost Calculator |
| `desc` | 김장 재료의 필요한 양과 포장 단위, 가격을 입력하면 몇 팩을 사야 하는지, 얼마가 들고 얼마나 남는지 한눈에 볼 수 있어요. | Enter your kimjang quantities, pack sizes, and prices to see how many packs to buy, what they cost, and how much will be left. |
| `howto` | 예시를 살펴본 뒤 내 장보기 목록을 시작하세요. 재료별로 필요한 양, 한 팩의 무게와 가격을 입력하고 목록을 복사할 수 있어요. | Explore the example, then start your own list. Enter the amount you need, the weight and price of one pack, and copy your shopping list. |
| `about` | 절임배추, 무, 고춧가루, 다진 마늘 네 가지를 계산해요. 예시 금액은 계산 방법을 보여 주기 위한 값이에요. | Covers salted napa cabbage, radish, red pepper flakes, and minced garlic. Example prices illustrate the calculation. |

## Pitch

The first screen looks like a compact market shopping list. It shows an example total of **₩124,000** above four ingredient rows. Each row shows what to buy, what it costs, and how much will be left. Buying two 10 kg boxes for an 18 kg need makes the rounding rule apparent at a glance.

The shopper starts a blank list, enters quantities from their own recipe and pack details from a shop, then copies the resulting purchase list. Four fixed ingredients keep the summary readable at 320 px and make it clear which costs the total covers.

## Flow

1. **EXAMPLE** opens on a fresh visit. It shows the complete example and a persistent label identifying the figures as illustrative. `Start my list` opens a blank list. `Explore the example` is available from the shopper’s list.
2. **MY LIST** shows the four ingredient rows and the total for the entries saved so far. Initially, all rows read `Add details` and the total displays `—`. Select a row to open **EDIT**. Returning from the example restores the shopper’s list.
3. **EDIT** shows one ingredient and three labeled fields. `Save` validates the fields, returns to **MY LIST**, and updates the row and total immediately. `Back` discards unsaved edits. `Remove ingredient` clears an existing entry and returns to the list. Re-entering the row starts with blank fields.
4. **COPY LIST** opens when at least one ingredient is saved. It shows the exact text to share in a read-only field. `Copy text` attempts clipboard copy and reports the outcome inline. `Back to my list` returns to the summary.

## Controls

- **Pointer and touch** — Use native buttons and inputs. Ingredient rows, navigation buttons, and secondary actions have at least 44 px tap targets. Use `touch-action: manipulation` on buttons and preserve native text selection.
- **Keyboard** — Tab and Shift+Tab follow the visible control order. Enter or Space activates focused buttons. Enter in an edit field submits the form. Escape goes back from **EDIT** or **COPY LIST** and returns from the example when opened from **MY LIST**.
- **Focus** — Open **EDIT** with the heading focused so a phone keyboard opens only after the shopper selects a field. Invalid submission focuses the first invalid field and associates the message with it. Returning to the list restores focus to the launching control. After starting a blank list, focus its heading.
- **Feedback** — Announce a saved or removed row and the updated total through one polite live region. Announce copy feedback through the same mechanism.

## Calculation and example

Store weights as whole grams and pack prices as whole won. Display weights in kilograms with up to three decimal places and currency as `₩` followed by a grouped whole number. The Korean and English interfaces both use Korean won.

```text
packs       = ceil(neededGrams / packGrams)
boughtGrams = packs × packGrams
leftGrams   = boughtGrams − neededGrams
rowCost     = packs × packPriceWon
total       = sum of saved row costs
```

| Ingredient | Needed | One pack | Price per pack | Buy | Left | Cost |
|---|---:|---:|---:|---:|---:|---:|
| 절임배추 / Salted napa cabbage | 18 kg | 10 kg | ₩35,000 | 2 packs | 2 kg | ₩70,000 |
| 무 / Radish | 2.5 kg | 1 kg | ₩4,000 | 3 packs | 0.5 kg | ₩12,000 |
| 고춧가루 / Red pepper flakes | 0.8 kg | 0.5 kg | ₩16,000 | 2 packs | 0.2 kg | ₩32,000 |
| 다진 마늘 / Minced garlic | 0.3 kg | 0.2 kg | ₩5,000 | 2 packs | 0.1 kg | ₩10,000 |
| **Total** | | | | | | **₩124,000** |

Accept needed weight and pack weight from `0.001` through `999` kg, with up to three decimal places. Accept pack price from `0` through `9,999,999` won. Blank fields are missing data. A zero price is valid. Use text inputs with `inputmode="decimal"` for weight and `inputmode="numeric"` for price so the app controls parsing and error text. Trim outer whitespace. Accept ungrouped prices or correctly comma-grouped prices. Reject signs, exponent notation, currency symbols, and commas in weights. Convert valid weight strings to grams before division.

## Screen layouts

| Screen | Header | Body | Footer |
|---|---|---|---|
| **EXAMPLE** | App title, example disclosure, and example total | Four static rows in the order shown above. Each shows the ingredient and its line cost, with pack count and leftover weight below. | `Start my list` on the first visit or `Back to my list` when opened from the shopper’s list. |
| **MY LIST** | App title, `My shopping list`, and a total labeled with the number of saved ingredients | Four buttons in the same order as the example. A saved row shows its cost, purchase count, and leftover weight. An empty row shows `Add details`. | `Copy list` when at least one row is saved and `Explore the example` in all states. |
| **EDIT** | `Back` and the ingredient name | Three stacked fields with unit suffixes. Display field errors directly below their associated inputs. Render `Remove ingredient` only for a previously saved row. | `Save`, with focus retained within the screen after validation errors. |
| **COPY LIST** | `Back to my list` and `Copy shopping list` | A read-only, keyboard-selectable textarea containing the localized shopping list. Show the copy status immediately below it. | `Copy text`. |

## Visual design

Use an off-white background (`#FFF8EB`), dark ink (`#241D16`), a deep red primary button (`#942F28`), and a pale green example panel (`#E7EEDC`). Set all type in `system-ui`. Align won amounts on the right with tabular numerals. Keep the names and pack counts legible in both languages, including the longer English ingredient names.

Use a viewport-sized shell with `100dvh` and a `100vh` fallback, and cap the content width on desktop. Both summaries fit at 320 × 480 with the four rows and their actions visible. Allow internal scrolling in the edit panel or copy preview when the soft keyboard, validation messages, or text zoom reduce available space. Keep page scrolling disabled. Use a brief background-color change on the saved row and a visible focus ring throughout. Honor reduced motion. The tool is silent.

## Copy text

Generate one line per saved ingredient in the displayed order, then append the covered-item total. Use the same localized count, weight, and money formatting as the summary. Preserve line breaks and include only the four supported ingredients that the shopper saved.

Call `navigator.clipboard.writeText` from the button gesture. If clipboard access is missing or fails, focus and select the visible textarea and show the manual copy message. The screen stays open in both cases.

## Strings

Resolve `?lang=ko` or `?lang=en` first. For a missing or unsupported value, use Korean if `navigator.language` starts with `ko`, and English otherwise. Set `<html lang>` and the document title accordingly. Keep these strings and any input accessible names in a single Korean and English dictionary. `money` and `weight` below are already formatted, such as `₩70,000` and `2 kg`.

| Key | ko | en |
|---|---|---|
| `appTitle` | 김장 비용 계산기 | Kimjang Cost Calculator |
| `exampleNote` | 계산을 보여 주기 위한 예시예요. | These figures are a worked example. |
| `exampleTotal` | 예시 합계 | Example total |
| `startList` | 내 장보기 목록 시작 | Start my list |
| `exploreExample` | 예시 보기 | Explore the example |
| `myList` | 내 장보기 목록 | My shopping list |
| `backToList` | 내 목록으로 | Back to my list |
| `totalLabel` | 입력한 재료 {count}개 합계 | Total for {count} of 4 ingredients |
| `emptyTotal` | — | — |
| `cabbage` | 절임배추 | Salted napa cabbage |
| `radish` | 무 | Radish |
| `pepper` | 고춧가루 | Red pepper flakes |
| `garlic` | 다진 마늘 | Minced garlic |
| `addDetails` | 정보 입력 | Add details |
| `rowEditName` | {ingredient} 수정 | Edit {ingredient} |
| `rowAddName` | {ingredient} 정보 입력 | Add details for {ingredient} |
| `rowDetail` | {packs}팩 구매 · {weight} 남음 | {packCount} to buy · {weight} left |
| `packCount` | {packs}팩 | {packs} pack / {packs} packs |
| `back` | 뒤로 | Back |
| `neededWeight` | 필요한 양 | Amount needed |
| `packWeight` | 한 팩 무게 | Weight per pack |
| `packPrice` | 한 팩 가격 | Price per pack |
| `unitKg` | kg | kg |
| `unitWon` | 원 | KRW |
| `save` | 저장 | Save |
| `removeIngredient` | 목록에서 빼기 | Remove ingredient |
| `required` | 값을 입력해 주세요. | Enter a value. |
| `invalidWeight` | 0.001~999kg 사이로 소수점 셋째 자리까지 입력해 주세요. | Enter 0.001–999 kg with up to three decimal places. |
| `invalidPrice` | 0~9,999,999원 사이의 정수를 입력해 주세요. | Enter a whole amount from 0 to 9,999,999 won. |
| `rowSaved` | {ingredient} 저장. 합계 {money}. | {ingredient} saved. Total {money}. |
| `rowRemoved` | {ingredient} 삭제. 합계 {money}. | {ingredient} removed. Total {money}. |
| `rowRemovedLast` | {ingredient} 삭제. 입력한 재료가 없어요. | {ingredient} removed. Your list is empty. |
| `copyList` | 목록 복사 | Copy list |
| `copyHeading` | 장보기 목록 복사 | Copy shopping list |
| `copyPreview` | 복사할 장보기 목록 | Shopping list to copy |
| `copyText` | 텍스트 복사 | Copy text |
| `copied` | 장보기 목록을 복사했어요. | Shopping list copied. |
| `copyManually` | 자동 복사가 안 됐어요. 목록을 선택해 직접 복사해 주세요. | Automatic copying failed. Select the list and copy it manually. |
| `shareTitle` | 김장 장보기 목록 | Kimjang shopping list |
| `shareRow` | {ingredient} · {packWeight} × {packCount} · {money} · {leftWeight} 남음 | {ingredient} · {packWeight} × {packCount} · {money} · {leftWeight} left |
| `shareTotal` | 입력한 재료 {count}개 합계 {money} | Total for {count} of 4 ingredients · {money} |

Use English singular `pack` only when the count is one. Visible field labels include their units for assistive technology. The copy preview uses `copyPreview` as its accessible label.

## localStorage

- `kimjang-cost-calculator:v1` stores a shopper’s list after they select `Start my list`. Its JSON value contains a `rows` object keyed by `cabbage`, `radish`, `pepper`, and `garlic`. Store each saved row as `{ neededGrams, packGrams, packPriceWon }`. An empty `rows` object represents a list the shopper has started.
- Read and write inside `try/catch`. Retain the current session’s state in memory if storage fails. Save only committed values. Derive display strings and totals from the saved integers.
- A valid stored list opens directly in **MY LIST**. If an individual stored row fails validation, omit that row and keep the valid entries. If the root payload is unreadable or malformed, open **EXAMPLE**.

## Edge cases

- Exact multiples show `0 kg` left. A positive need smaller than one pack requires one pack. A valid free item appears in the summary and copied list with a cost of `₩0`.
- Saving with a blank or invalid field leaves the previously committed row intact. Backing out of **EDIT** preserves that row and its subtotal.
- Removing the last saved ingredient restores `—` and removes the copy action. A shopper can browse the example without changing their list or its total.
- Resizing, rotating, or switching tabs preserves the current screen and any in-memory edit draft. Reloading restores committed entries.
- `#demo` always opens the fixed example and skips reading or writing saved data. Starting a list in this mode works for the current page session. Use the example screen for the generated thumbnail.
- Package selection uses whole packs. Loose goods can be entered with the weight and price of the unit the shopper intends to buy.

## Must not

- Keep the item in one self-contained `index.html` plus `meta.json` and the QA-generated thumbnail. No network requests, external assets or libraries, analytics, sound, or autoplay.
- Keep recipe quantities, household-size multipliers, live prices, market averages, and named retailers out of the product. Label the built-in figures as an example everywhere they appear.
- Keep totals scoped to saved ingredients. Exclude delivery fees, discounts, taxes, and savings claims from the calculation.
- Keep clipboard content to the shopping list. No input values in the URL, outbound sharing, tracking parameters, or automatic clipboard writes.
- No browser dialogs, pop-ups, navigation away, or page-level scrolling.