# Idea and spec: 붕어빵 예산 계산기 / Bungeoppang Budget Calculator

## Concepts scored

Scores are 1–5; higher is better. Maximum 20. Demand scores are editorial estimates based on the supplied research and backlog, not measured search volumes. There are no votes yet.

Categories follow `play/ITEMS.md`: `silly`, `arcade`, `puzzle`, `chill`, `random`, or `tools`. Older research and example labels do not override these rules.

| Concept | Category | Value in first 10 seconds | Originality | Korean search/share demand | One-file buildability | Total | Verdict |
|---|---|---:|---:|---:|---:|---:|---|
| **붕어빵 예산 계산기 / Bungeoppang Budget Calculator** — enter a budget and two prices; fill a paper bag with an affordable red-bean/custard combination | **tools** | 5 | 4 | 4 | 5 | **18** | **Picked:** immediately useful, seasonal, and visually distinct from the existing receipt |
| 겨울 간식 소리방 / Winter Snack Soundroom — mix synthesized griddle, paper-bag and winter-wind sounds | chill | 4 | 4 | 3 | 4 | 15 | Fits the ambient-audio backlog; convincing synthesis needs more tuning |
| 모임 마무리 뽑기 / One Last Stop — choose available activities and draw a gentle ending to a gathering | random | 4 | 3 | 4 | 5 | 16 | Fits seasonal gatherings; less distinctive and needs enough eligible choices |

The selected concept develops the research’s winter-snack calculator direction. It uses user-entered prices rather than live prices or shop listings. It neither repeats the office game nor generates a fictional year-end receipt.

## Meta

- slug `bungeoppang-budget`
- category `tools`
- kind `tool`
- aspect `3/4`
- date `2026-11-21`
- tags:
  - ko: `붕어빵`, `예산 계산기`, `겨울 간식`, `팥붕 슈붕`
  - en: `bungeoppang`, `budget calculator`, `winter snacks`, `red bean and custard`
- title ko: `붕어빵 예산 계산기`
- title en: `Bungeoppang Budget Calculator`
- desc ko: `예산과 팥붕·슈붕 한 개 가격을 넣으면 살 수 있는 조합과 남는 돈을 바로 계산해요. 내 붕어빵 봉투를 이미지나 글로 저장해 보세요.`
- desc en: `Enter your budget and red-bean and custard prices. Find an affordable mix, check your change, and save your snack bag as an image.`
- howto ko: `예산과 붕어빵 한 개 가격을 입력하고 ‘봉투 보기’를 누르세요. 가능한 조합 중 하나를 고르면 개수, 합계, 남는 돈을 확인하고 저장하거나 복사할 수 있어요.`
- howto en: `Enter your budget and the price of each pastry, then select View bag. Choose an available combination to see quantities, total cost, and money left. Save or copy your bag.`
- about ko: `붕어빵은 물고기 모양의 간식이에요. 처음 표시되는 가격은 계산 예시이며 실제 시세가 아니에요. 묶음 할인은 계산하지 않으며, 입력값은 외부로 전송하지 않아요.`
- about en: `Bungeoppang is a fish-shaped pastry. Initial prices are examples, not market prices. Bundle discounts are not included. Inputs are never transmitted.`

Use the repository’s supported metadata format. Tags are editorial metadata; do not change the site schema solely to display them.

## Pitch

A small illustrated winter snack counter turns three numbers into a warm paper bag.

1. The first screen already shows a working example: a ₩3,000 budget and two ₩1,000 unit prices.
2. The user changes any value or immediately opens the bag.
3. The calculator offers up to three affordable combinations, prioritizing quantity and then an even flavor mix.
4. Selecting a combination changes the illustrated bag and its exact cost.
5. The user saves a compact bag card or copies the numbers.

The first useful answer is visible without typing. With the defaults, it is **2 red-bean pastries, 1 custard pastry, ₩3,000 total, ₩0 left**.

This is a small purchase calculator. There are no quizzes, personality labels, fortune claims, scores, or invented charges.

## Flow

1. **EDIT**
   - Title, short instruction, three labeled numeric inputs, live preview, and a primary “View bag” button.
   - Defaults or validated saved unit prices populate immediately.
   - Valid edits update the preview without navigating.
   - Invalid edits replace the preview with an input instruction and disable the primary action.
2. **RESULT**
   - Open the first ranked combination.
   - Display its paper bag, quantities, unit prices, total and money left.
   - Show up to three combination buttons.
   - Selecting another combination updates the existing result.
   - Actions: save image, copy text, and edit inputs.
3. **EMPTY**
   - A valid budget cannot buy either flavor.
   - Keep the editor visible, show an empty bag and explain the exact shortfall.
   - No save or copy action appears.
4. **COPY FALLBACK**
   - If clipboard copying fails, expand a selectable text panel inside RESULT.
   - A close button returns focus to the copy button.
   - This is an inline panel, not a modal or browser dialog.

There is no separate loading or printing screen. Calculation is synchronous and must not be artificially delayed.

## Controls

- Use semantic inputs and buttons, operable by pointer, touch and keyboard.
- Use pointer events for custom press feedback; perform each action once. Do not register both `pointerup` and `click` as competing action handlers.
- Every interactive target is at least 44 × 44 CSS px.
- Tab and Shift+Tab follow the visual order.
- Enter submits the editor when all inputs are valid and a combination exists.
- Enter and Space activate focused buttons.
- Numeric fields retain standard editing behavior. Do not intercept Backspace, arrow keys, paste or IME composition.
- The three combination buttons use `aria-pressed`; selection does not depend on color.
- Focus the result heading after opening the bag. Editing returns focus to the budget field.
- Do not install single-letter global shortcuts.
- Decorative artwork is noninteractive and has `pointer-events:none`.
- Keep the page fixed to the iframe. Internal overflow panels use `touch-action:pan-y`; decorative animation areas use `touch-action:none`.
- There is no sound and no sound control.

## Inputs and calculation

### Fields

All monetary values are integer Korean won in multiples of 100.

| Field | Default | Valid range | Step |
|---|---:|---:|---:|
| Budget `budget` | 3,000 | 100–30,000 | 100 |
| Red-bean unit price `redPrice` | 1,000 | 100–10,000 | 100 |
| Custard unit price `custardPrice` | 1,000 | 100–10,000 | 100 |

- Use text inputs with `inputmode="numeric"` and a maximum raw length of 12 characters.
- Visible input values contain plain digits; formatted summaries use thousands separators.
- Trim surrounding whitespace and accept either plain digits or correctly grouped thousands, such as `3000` and `3,000`.
- Reject malformed grouping, signs, decimals, currency symbols, exponent notation and letters.
- Do not silently round, clamp, replace empty fields with zero, or strip invalid characters into a different number.
- Show validation after a field has been edited and blurred, or after submission.
- While an input is incomplete or invalid, do not display stale calculated amounts as current results.
- Values are per pastry. Bundle offers and discounts are outside scope.

### Combination enumeration

For valid inputs:

```text
for red from 0 through floor(budget / redPrice):
    for custard from 0 through floor((budget - red * redPrice) / custardPrice):
        skip when red + custard == 0
        total = red * redPrice + custard * custardPrice
        left = budget - total
        count = red + custard
        imbalance = abs(red - custard)
```

Sort by this complete order:

1. `count` descending.
2. `imbalance` ascending.
3. `left` ascending.
4. `red` descending.

Keep the first three distinct `(red, custard)` pairs. Do not pad with duplicate results.

The visible rule explains that quantity comes first, then an even flavor mix. The final red-bean tie-break exists only to make identical inputs reproducible.

- All arithmetic uses integers.
- No randomness, seed, clock, network or language setting affects the answer.
- Changing a field clears the previous selection and selects the new first-ranked combination.
- Revisiting EDIT from RESULT preserves the input values.
- If inputs remain unchanged, reopening RESULT preserves the selected combination.
- At the permitted limits, there are at most 300 pastries in any combination; enumeration remains small enough for direct calculation.

### Empty result

If `budget < min(redPrice, custardPrice)`:

```text
shortfall = min(redPrice, custardPrice) - budget
```

Show the empty-state message and shortfall. Do not suggest a zero-pastry bag as a successful result.

### Reference cases

| Inputs: budget / red / custard | Expected result |
|---|---|
| 3,000 / 1,000 / 1,000 | Ranked combinations: `(2,1)`, `(1,2)`, `(3,0)`; each costs 3,000 |
| 3,000 / 700 / 1,000 | First combination `(4,0)`; total 2,800; left 200; quantity outranks balance |
| 1,500 / 1,000 / 1,500 | `(1,0)` precedes `(0,1)`; same count and balance, but more money remains |
| 500 / 1,000 / 1,500 | EMPTY; shortfall 500 |
| 100 / 100 / 100 | Two combinations only: `(1,0)`, `(0,1)` |
| 30,000 / 100 / 100 | First combination `(150,150)`; total 30,000; left 0 |
| Budget `1,250` | Invalid step; do not calculate as 1,200 or 1,300 |

## Every screen

### EDIT

Top to bottom:

1. App title and one-line instruction.
2. A small original SVG illustration of two fish-shaped pastries.
3. Budget input.
4. Red-bean unit-price input.
5. Custard unit-price input.
6. Compact live preview with quantities and money left.
7. Primary “View bag” button.
8. “Reset example” secondary button.
9. Persistent example-price and unit-price note.

“Reset example” restores all three defaults, clears validation errors and selection, updates saved unit prices if storage works, and remains on EDIT. No confirmation is needed.

When invalid, show field-specific errors beside the affected fields. The preview displays `completeInputs`; the primary button is disabled.

When EMPTY, replace the preview with an empty-bag illustration, the empty-state message and shortfall. The primary button is disabled; all fields remain editable.

### RESULT

Top to bottom:

1. Compact app title.
2. Paper-bag result card:
   - Bag heading.
   - Red-bean and custard illustrations.
   - Prominent flavor counts.
   - Unit-price lines.
   - Budget.
   - Total cost.
   - Money left.
   - Example-price/unit-price note.
3. Combination section with up to three buttons.
4. Ranking explanation.
5. “Save image” and “Copy text” side by side.
6. Full-width “Edit inputs” button.

Each combination button contains both flavor counts and its remaining money. A checkmark and `aria-pressed` indicate selection.

Changing the selection updates the bag immediately and triggers a short visual pop. Announce the completed summary through a polite live region.

### COPY FALLBACK

- Appears below the result actions within the existing scroll panel.
- Contains the localized instruction, a labeled read-only textarea holding the exact share text, and a close button.
- Focus and select the textarea contents when it opens.
- Users may use their browser or operating system’s normal copy controls.
- Closing it preserves the selected combination and returns focus to “Copy text.”

### Status messages

- Show save/copy progress and outcomes in a reserved status area.
- Use `role="status"`; do not shift the main layout.
- Success messages disappear after four visible seconds.
- Failure messages persist until the next action or input change.
- There are no additional screens, hidden rewards or promotional overlays.

## Bag layout

Use an original kraft-paper bag illustration, not a receipt, ticket or official-looking financial document.

1. A folded paper top with two rounded handles.
2. Heading: “My bungeoppang bag.”
3. Two flavor groups, each with an original fish outline and a labeled count.
4. A simple numeric summary underneath.
5. A small Daily Toybox signature.

Illustrate at most six pastries per flavor. For larger quantities, keep the illustration bounded and show the exact count as text. Zero quantities still have a text row but no pastry illustration.

Red bean uses a plum filling dot; custard uses a golden filling dot. Labels and differing hatch patterns distinguish them without relying on color alone.

Keep all quantities and money values available as DOM text. Decorative SVG is `aria-hidden="true"`.

## Visual design

- Background: winter blue `#20343D`.
- Main panel: warm ivory `#FFF7E8`.
- Bag: kraft `#DBAD73`.
- Primary text: dark brown `#302A25`.
- Secondary text: `#62594E`.
- Primary button: deep teal `#155D63` with white text.
- Red-bean accent: `#77465A`.
- Custard accent: `#E5B647`, used as decoration with dark labels.
- Error text: dark red `#A02F32`, always accompanied by explanatory text.
- Font: `system-ui, -apple-system, "Segoe UI", sans-serif`.
- Use tabular numerals for amounts.
- Input and body text: at least 16 px.
- Main title: 24–28 px; totals: 24 px.

The root fills `100vw` by `100dvh`, with a `100vh` fallback and `overflow:hidden`. Use a centered content column up to 480 px wide.

At 320 × 480:

- Reduce decorative artwork before reducing text or controls.
- Let labels and English titles wrap.
- Use an internal content scroller with `min-height:0`.
- Keep primary actions in a bottom action region.
- Never introduce horizontal scrolling or page-level scrolling.

At wider sizes, keep the same reading order and expand the decorative background rather than stretching the form.

Motion:

- A valid preview change may fade over 120 ms.
- A selected bag may pop from scale 0.98 to 1 over 160 ms.
- No continuous snow, steam, flashing or shaking.
- Respect `prefers-reduced-motion` by making changes immediate.
- Any scripted animation uses `requestAnimationFrame`, delta time capped at 50 ms, and pauses while `document.hidden`.

## Sound

None. Do not create an AudioContext or add a mute toggle.

## Export and copy

### Save image

Create a self-contained 750 × 1,000 px PNG of the selected bag.

Include:

1. Localized app title.
2. Bag illustration and both quantities.
3. Both entered unit prices.
4. Budget, total and money left.
5. The price note.
6. Localized Daily Toybox signature and plain text `play.mesisi.net`.

Use the same palette and content as RESULT. Exclude buttons, alternative combinations, validation messages and transient status text.

- Render with a dedicated canvas drawing function.
- Use fixed export dimensions independent of screen DPR.
- Wrap Korean text by grapheme where practical and English by words.
- Preserve padding and avoid text clipping; do not shrink essential text below 26 export pixels.
- Use `toBlob`, a local object URL, and an anchor with `download="bungeoppang-budget.png"`.
- Revoke object URLs after a safe delay and when replaced.
- Do not open another window or navigate the iframe.
- While export is pending, disable only the save action.
- On export failure, restore the action and show `saveFail`.
- After initiating a download, show `downloadRequested`, not a claim that the file was successfully saved.
- Always keep the result suitable for a screenshot because browsers may block downloads without a detectable completion signal.

### Copy text

Copy only on an explicit button press.

Attempt `navigator.clipboard.writeText`; if unavailable or rejected, try a temporary textarea with `execCommand("copy")`. If both fail, open COPY FALLBACK. Restore focus after successful fallback copying.

Korean template:

```text
내 붕어빵 봉투
팥붕 {red}개 · 슈붕 {custard}개
한 개 가격: 팥붕 {redPrice} · 슈붕 {custardPrice}
예산: {budget}
합계: {total}
남는 돈: {left}
입력한 한 개 가격 기준이며, 묶음 할인은 제외해요.
하루한판 · play.mesisi.net
```

English template:

```text
My bungeoppang bag
Red bean × {red} · Custard × {custard}
Unit prices: Red bean {redPrice} · Custard {custardPrice}
Budget: {budget}
Total: {total}
Money left: {left}
Based on entered unit prices; bundle discounts excluded.
Daily Toybox · play.mesisi.net
```

Format money as `{n}원` in Korean and `₩{n}` in English, with thousands separators. Never translate KRW amounts into another currency.

## Strings

Store all visible text, accessible names, validation messages, export text and share templates in a `{ ko: {...}, en: {...} }` dictionary. Meta text is defined above; the following table supplies the application strings.

| Key | Korean | English |
|---|---|---|
| `appTitle` | 붕어빵 예산 계산기 | Bungeoppang Budget Calculator |
| `intro` | 예산 안에서 팥붕과 슈붕을 담아 보세요. | Fill a red-bean and custard bag within your budget. |
| `budgetLabel` | 예산 | Budget |
| `redPriceLabel` | 팥붕 한 개 가격 | Red-bean unit price |
| `custardPriceLabel` | 슈붕 한 개 가격 | Custard unit price |
| `currencyUnit` | 원 | KRW |
| `budgetHint` | 100~30,000원, 100원 단위 | ₩100–₩30,000, in steps of ₩100 |
| `priceHint` | 100~10,000원, 100원 단위 | ₩100–₩10,000, in steps of ₩100 |
| `previewTitle` | 이렇게 담을 수 있어요 | Your possible bag |
| `previewSummary` | 팥붕 {red}개 · 슈붕 {custard}개 · 남는 돈 {left} | Red bean × {red} · Custard × {custard} · {left} left |
| `completeInputs` | 예산과 한 개 가격을 확인해 주세요. | Check your budget and unit prices. |
| `viewBag` | 봉투 보기 | View bag |
| `resetExample` | 예시로 초기화 | Reset example |
| `exampleNote` | 처음 가격은 예시예요. 실제 한 개 가격으로 바꿔 주세요. | Initial prices are examples. Enter actual unit prices. |
| `unitNote` | 입력한 한 개 가격 기준이며, 묶음 할인은 제외해요. | Based on entered unit prices; bundle discounts excluded. |
| `bagTitle` | 내 붕어빵 봉투 | My bungeoppang bag |
| `red` | 팥붕 | Red bean |
| `custard` | 슈붕 | Custard |
| `redCount` | 팥붕 {n}개 | Red bean × {n} |
| `custardCount` | 슈붕 {n}개 | Custard × {n} |
| `unitPriceLine` | 한 개 {price} | {price} each |
| `budget` | 예산 | Budget |
| `total` | 합계 | Total |
| `left` | 남는 돈 | Money left |
| `money` | {n}원 | ₩{n} |
| `combinationsTitle` | 가능한 조합 | Available combinations |
| `combination` | 팥 {red} · 슈 {custard} | Red bean {red} · Custard {custard} |
| `combinationLeft` | {left} 남아요 | {left} left |
| `combinationAria` | 팥붕 {red}개, 슈붕 {custard}개, 남는 돈 {left} | {red} red-bean pastries, {custard} custard pastries, {left} left |
| `rankingNote` | 개수 우선, 같은 개수면 반반에 가깝게 골라요. | Most pastries first; ties favor a more even mix. |
| `resultAnnouncement` | 팥붕 {red}개, 슈붕 {custard}개. 합계 {total}, 남는 돈 {left}. | Red bean: {red}. Custard: {custard}. Total: {total}. Money left: {left}. |
| `emptyTitle` | 아직 한 개를 담기엔 모자라요 | Not quite enough for one |
| `emptyDetail` | 가장 저렴한 한 개까지 {shortfall} 더 필요해요. | You need {shortfall} more for the cheapest pastry. |
| `emptyHint` | 예산이나 입력한 가격을 확인해 주세요. | Check your budget or entered prices. |
| `save` | 이미지 저장 | Save image |
| `saving` | 이미지 만드는 중… | Creating image… |
| `downloadRequested` | 다운로드를 요청했어요. 저장되지 않으면 화면을 캡처해 주세요. | Download requested. If no file appears, take a screenshot. |
| `saveFail` | 이미지를 만들지 못했어요. 화면을 캡처해 주세요. | Could not create the image. Please take a screenshot. |
| `copy` | 텍스트 복사 | Copy text |
| `copying` | 복사 중… | Copying… |
| `copied` | 복사했어요. | Copied. |
| `manualCopy` | 자동 복사가 안 돼요. 아래 글을 선택해 복사해 주세요. | Automatic copy is unavailable. Select and copy the text below. |
| `copyTextLabel` | 공유할 글 | Text to share |
| `close` | 닫기 | Close |
| `edit` | 입력 수정 | Edit inputs |
| `required` | 값을 입력해 주세요. | Enter a value. |
| `invalidInteger` | 쉼표로 구분한 정수나 숫자만 입력해 주세요. | Enter whole digits, optionally with correctly grouped commas. |
| `budgetRange` | 예산은 100~30,000원으로 입력해 주세요. | Enter a budget from ₩100 to ₩30,000. |
| `priceRange` | 한 개 가격은 100~10,000원으로 입력해 주세요. | Enter a unit price from ₩100 to ₩10,000. |
| `invalidStep` | 100원 단위로 입력해 주세요. | Enter a multiple of ₩100. |
| `resetDone` | 예산과 가격을 예시로 되돌렸어요. | Budget and prices reset to the example. |
| `brand` | 하루한판 | Daily Toybox |

Validation priority per field: required, integer syntax, range, then step. Show one message per invalid field.

Language selection:

1. Honor `?lang=ko` or `?lang=en`.
2. Otherwise use Korean when `navigator.language` starts with `ko`; use English for other languages.
3. Set `<html lang>` accordingly.
4. Do not persist language or add an independent language switch inside the iframe.

## localStorage

All access, including obtaining the storage object, parsing and writing, must be inside `try/catch`.

One key:

- `bbudget:v1:prices`
  - JSON: `{"red":1000,"custard":1000}`
  - Store only validated integer unit prices.
  - Load each property independently; replace missing or invalid properties with 1,000.
  - Ignore extra properties.
  - Save after valid price edits are committed and when resetting the example.

Do not store budgets, combinations, copied text, image data, usage counts or browsing history.

A reload starts on EDIT with budget 3,000 and valid saved prices. Blocked storage silently falls back to memory; the calculator remains fully usable.

## Edge cases

- **Partial input:** keep the user’s text while editing; clear the live result until valid.
- **Paste:** accept correctly grouped commas; reject malformed or nonnumeric content without converting it into an unintended amount.
- **Composition:** do not validate midway through IME composition or treat its Enter key as submission.
- **Too few combinations:** render one or two actual options without placeholders.
- **One flavor unaffordable:** permit combinations containing only the other flavor.
- **Zero remaining money:** display zero explicitly; never hide the row.
- **Equal prices:** apply the complete deterministic ordering.
- **Repeated activation:** submitting or selecting twice must not duplicate panels, downloads, listeners or status announcements.
- **Resize:** recompute available layout without changing inputs, selected combination or focus.
- **Virtual keyboard:** allow the editor’s internal panel to scroll the focused input into view.
- **Hidden page:** pause animation and status timers; resume without accumulating elapsed hidden time.
- **Reduced motion:** retain all feedback through text and selection states with no animation.
- **Clipboard denied:** provide the inline manual-copy panel.
- **Export unavailable:** keep RESULT intact and provide screenshot guidance.
- **Async export:** capture the selected bag when Save is pressed so a later combination change cannot mix values in the generated image.
- **Storage corrupted or blocked:** use validated defaults without showing a blocking error.
- **Long English text:** wrap labels and buttons; never truncate prices or counts.
- **High DPR:** cap any on-screen canvas backing scale at 2. The PNG export remains exactly 750 × 1,000.
- **Thumbnail mode:** `location.hash === "#demo"` opens RESULT with budget 3,000, both prices 1,000 and combination `(2,1)`. Ignore saved prices, suppress motion and make no storage writes.

## Must not

- No network requests, external scripts, fonts, images, CDNs, analytics, remote audio or third-party widgets.
- Keep `index.html`, including CSS, JavaScript, SVG and translations, under 150 KB.
- No real brands, shop names, people, logos or copied pastry characters.
- No claims that example prices are current market prices.
- No shop finder, location permission, payment integration, exchange rates or purchasing links.
- No bundle-price approximation, hidden rounding, negative remaining money or over-budget “recommendations.”
- No receipt printer, barcode, fictional taxes, year-end scoring or fortune wording.
- No gambling, forced payer selection, punishments or jokes targeting real groups.
- No account, participant names, server persistence, share tracking or automatic clipboard writes.
- No sound, autoplay, artificial waiting or unnecessary continuous animation.
- No `alert`, `confirm`, `prompt`, `window.open` or navigation away from the item.
- No page scrolling, inaccessible canvas-only results, tiny controls or color-only selection states.

## Delivery and acceptance

The eventual implementation consists of:

```text
items/bungeoppang-budget/
  index.html
  meta.json
  thumb.png
```

Generate `thumb.png` through repository QA; do not draw it manually.

Before publishing:

```bash
npm test
npm run build
npm run qa -- --thumbs
```

Acceptance requires:

- Every reference calculation above produces the specified result.
- Both languages work at 320 × 480 and desktop sizes without page overflow.
- The default result is available immediately and requires at most one activation to open.
- Touch, pointer and keyboard users can edit, select, copy and return to the editor.
- Storage and clipboard failures do not prevent calculation.
- Exported images contain the selected combination and all entered prices without clipping.
- Thumbnail mode produces a complete, readable bag screenshot.
- The item issues no network requests and reports no JavaScript errors.