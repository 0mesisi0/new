# Idea and spec: 김장 비용 나누기 / Kimjang Cost Splitter

## Concepts scored

Scores are 1–5 per criterion, with a maximum of 20. Korean search and share scores are planning estimates based on the supplied research and backlog.

| Concept | Category | First 10 seconds | Originality | Korean search/share demand | One-file buildability | Total | Verdict |
|---|---|---:|---:|---:|---:|---:|---|
| **김장 비용 나누기 / Kimjang Cost Splitter** | **tools** | **5** | **4** | **4** | **5** | **18** | **Picked.** An instant example shows how two households can split a batch by kilograms. The result fits a family group chat. |
| 장갑 짝 찾기 / Mitten Match | puzzle | 4 | 4 | 3 | 5 | 16 | Pair mittens by matching stitched patterns viewed from different angles. The visual hook is immediate and the likely search audience is smaller. |
| 겨울 주머니 뽑기 / Winter Pocket Pull | random | 5 | 3 | 3 | 5 | 16 | Pull a tiny winter scene from a coat pocket with one tap. The reveal is quick, with fewer reasons to return after seeing the set. |

The supplied research identifies kimjang costs and ingredient quantities as seasonal topics. The selected concept uses those inputs to answer a specific question: when two households make one batch and take home different amounts, how much should each pay? The keyword targets are `김장 비용 계산기` and `김장 비용 나누기`.

## Meta

slug `kimjang-cost-splitter`

- Category `tools`, kind `tool`, aspect `3/4`, date `2026-11-22`
- Korean tags `김장`, `김장 비용 계산기`, `김장 비용 나누기`
- English tags `kimjang`, `kimchi`, `cost split`

| Field | ko | en |
|---|---|---|
| `title` | 김장 비용 나누기 | Kimjang Cost Splitter |
| `desc` | 절임배추 무게와 재료비를 입력하면 두 집이 가져갈 분량에 맞춰 김장 비용을 나눠 계산해요. 결과를 복사해 가족에게 보내세요. | Enter the cabbage weight and ingredient costs. Split the kimjang bill by how much each household takes home, then copy the result. |
| `howto` | 절임배추 무게, 배추값, 나머지 재료비를 입력하세요. 한 집의 몫을 kg으로 정하면 두 집이 낼 금액이 바로 나와요. | Enter the salted cabbage weight, cabbage cost, and other ingredient costs. Set one household’s share in kg to see what both households owe. |
| `about` | 절임배추 무게를 기준으로 재료비를 나눠요. 처음 보이는 숫자는 계산 예시예요. 마지막으로 계산한 값은 이 브라우저에 저장될 수 있어요. | The split uses salted cabbage weight. The opening numbers are illustrative. Your last calculation can be saved in this browser. |

## Pitch

Two tubs sit side by side, each labeled with a household’s share of the batch and its amount due. The item opens with an example: split 20 kg costing ₩120,000 into 12 kg and 8 kg, and the tubs show ₩72,000 and ₩48,000. With actual amounts entered, changing one household’s kilograms updates both amounts immediately. The shareable text includes the total, the weights, and what each household owes.

The spec uses whole kilograms of salted cabbage as the allocation basis and two unnamed households. All sample figures are illustrative.

## Flow

1. **EXAMPLE.** Show the worked split immediately on first visit. `내 금액 입력` opens a blank form. If a valid saved calculation exists, open RESULT instead.
2. **INPUT.** Enter salted cabbage weight, total cabbage cost, and total for all other ingredients. Update the total as soon as both costs are valid. `비용 나누기` validates the fields and opens RESULT.
3. **RESULT.** Show both households’ weights and amounts, plus the total. Edit the first household’s kilograms and update the other share automatically. `텍스트 복사` copies the current result. `입력값 수정` returns to the prefilled form. `내역 지우기` clears the saved result and returns to EXAMPLE.
4. **MANUAL COPY.** If clipboard access fails, expand a read-only text field within RESULT and select the summary for manual copying. `닫기` closes it and returns focus to `텍스트 복사`.

## Controls

- Use native buttons and labeled numeric text inputs with `inputmode="numeric"`. Tap, click, or use Tab and Shift+Tab to move between controls. Enter submits INPUT. Enter and Space activate focused buttons.
- On RESULT, the `−` and `+` buttons change the first household’s share by 1 kg. The numeric field also accepts direct entry. Disable each step button at its corresponding endpoint. While a share is invalid, disable both step buttons and the copy button until the user corrects it.
- Keep interactive targets at least 44 × 44 px. Support native selection, paste, and keyboard editing. Constrain touch and wheel scrolling to the content panel when it overflows.
- Focus the first input when opening a blank form, the edited field when correcting an error, and the result heading when entering RESULT. Announce copy feedback through a polite status region. Associate inline errors with their inputs.

## Calculation

| Input | Accepted range | Behavior |
|---|---:|---|
| Salted cabbage weight | 1–999 kg | Batch weight used for the split |
| Cabbage cost | ₩0–₩99,999,999 | Total for the batch |
| Other ingredient costs | ₩0–₩99,999,999 | Combined total for the batch. Enter `0` when there are none. |
| First household’s share | 0 through batch weight, in kg | Defaults to `ceil(batch weight ÷ 2)` on a new calculation |

- `total = cabbage cost + other ingredient costs`
- `second kg = batch weight − first kg`
- `first amount = round(total × first kg ÷ batch weight)`, rounding half-won ties up.
- `second amount = total − first amount`. The amounts always add up to the entered total.
- Use the prior share when returning from an edit. If the batch weight decreased below that share, set the share to the new batch weight. Format output with thousands separators and show KRW in both languages.
- Check cases: 20 kg and ₩120,000 at 12 kg returns ₩72,000 and ₩48,000. A 1 kg share of a 2 kg batch costing ₩5 returns ₩3 and ₩2. A 0 kg share costs ₩0.

## Screen layouts

### EXAMPLE

Show the app title, the `계산 예시` label, the batch summary, two tubs, and a full-width primary button. Use 20 kg, ₩60,000 cabbage cost, and ₩60,000 other ingredient costs. Show the 12 kg and 8 kg split. This screen has one interactive control, `내 금액 입력`.

### INPUT

Show the section heading, three stacked fields with visible unit suffixes, a live total, and `비용 나누기`. When opening from RESULT, include `결과로 돌아가기` to discard unsubmitted edits and restore the last result. When opening from EXAMPLE, offer `계산 예시 보기` to return to the example. On submission, show field-level errors for invalid entries and focus the first error.

### RESULT

Show the batch summary, the share editor, and both tub cards. Each card shows the household label, share in kg, and amount due. The tubs have relative fill levels based on their fractions of the batch. Show the exact figures as text at every fill level. Place copy, edit, and clear actions below the cards. If the share is invalid during editing, use `—` for both cards’ figures until a valid share is entered. Keep the batch summary visible.

### MANUAL COPY

Expand a panel below the copy action and bring it into view within the content area. Show the copy instructions, a labeled read-only textarea with the exact share text, and the close button. If the share changes while this panel is open, close it so the textarea cannot show an earlier result.

## Visual design

- Use a warm paper background `#FAF4E8`, ink `#28241F`, chili red `#A93226` for the primary action, and cabbage green `#467450` for the second tub. Use original CSS tub shapes with system fonts and tabular numerals. Keep household names and figures legible regardless of fill color.
- Fill the iframe using `100dvh` with a `100vh` fallback. Center the content at a maximum width of 520 px. At 320 × 480, use 12 px side padding, keep tap targets full size, and allow long card values to wrap. The document stays fixed while the interior content panel scrolls if needed, including when the on-screen keyboard is open.
- Use a short CSS transition on tub fill changes. Disable it under `prefers-reduced-motion`. Pause transitions while the document is hidden. The item is silent.

## Export and copy

Use `navigator.clipboard.writeText` from the copy-button gesture. Show the success status only after the write resolves. If the API is unavailable or rejects the write inside the iframe, show MANUAL COPY. Copy the following localized lines with the current values.

| Line | ko | en |
|---|---|---|
| Heading | 김장 비용 나누기 | Kimjang Cost Splitter |
| Summary | 절임배추 {weight} kg · 총 {total}원 | {weight} kg salted cabbage · ₩{total} total |
| First share | 첫째 집 {firstKg} kg · {firstAmount}원 | Household 1 · {firstKg} kg · ₩{firstAmount} |
| Second share | 둘째 집 {secondKg} kg · {secondAmount}원 | Household 2 · {secondKg} kg · ₩{secondAmount} |

## Strings

Keep the strings below, metadata, and copy templates in Korean and English. Set `<html lang>` from `?lang=ko` or `?lang=en`. Otherwise, use Korean for a Korean browser locale and English for other locales. Use the units and number formats below everywhere, including accessible labels.

| Key | ko | en |
|---|---|---|
| `appTitle` | 김장 비용 나누기 | Kimjang Cost Splitter |
| `exampleTitle` | 계산 예시 | Example split |
| `enterCosts` | 내 금액 입력 | Enter my costs |
| `inputTitle` | 김장 재료비 입력 | Enter ingredient costs |
| `weight` | 절임배추 무게 | Salted cabbage weight |
| `cabbageCost` | 절임배추값 | Salted cabbage cost |
| `otherCost` | 나머지 재료비 | Other ingredient costs |
| `otherHelp` | 배추값을 뺀 나머지 재료비를 합쳐 입력하세요. 없으면 0을 입력하세요. | Add up the other ingredient costs. Enter 0 if there are none. |
| `kgUnit` | kg | kg |
| `wonUnit` | 원 | KRW |
| `weightValue` | {value} kg | {value} kg |
| `moneyValue` | {value}원 | ₩{value} |
| `total` | 총 재료비 | Total ingredient cost |
| `emptyValue` | — | — |
| `calculate` | 비용 나누기 | Split costs |
| `viewExample` | 계산 예시 보기 | View example |
| `backToResult` | 결과로 돌아가기 | Back to split |
| `resultTitle` | 두 집이 낼 금액 | What each household owes |
| `batchSummary` | 절임배추 {weight} kg · 총 {total}원 | {weight} kg salted cabbage · ₩{total} total |
| `firstHousehold` | 첫째 집 | Household 1 |
| `secondHousehold` | 둘째 집 | Household 2 |
| `firstShare` | 첫째 집 몫 (kg) | Household 1 share (kg) |
| `splitHelp` | 첫째 집이 가져갈 무게를 정하면 나머지는 둘째 집 몫이에요. | Set how much Household 1 takes home. Household 2 gets the rest. |
| `minus` | − | − |
| `plus` | + | + |
| `decreaseShare` | 첫째 집 몫 1 kg 줄이기 | Decrease Household 1 share by 1 kg |
| `increaseShare` | 첫째 집 몫 1 kg 늘리기 | Increase Household 1 share by 1 kg |
| `copy` | 텍스트 복사 | Copy split |
| `copied` | 비용 내역을 복사했어요. | Split copied. |
| `edit` | 입력값 수정 | Edit amounts |
| `clear` | 내역 지우기 | Clear calculation |
| `manualTitle` | 직접 복사하기 | Copy manually |
| `manualHelp` | 아래 텍스트를 선택해 복사하세요. | Select and copy the text below. |
| `manualField` | 복사할 비용 내역 | Split summary to copy |
| `close` | 닫기 | Close |
| `weightError` | 1~999 사이의 정수로 무게를 입력하세요. | Enter a whole weight from 1 to 999 kg. |
| `costError` | 0~99,999,999원 사이의 정수로 입력하세요. | Enter a whole amount from ₩0 to ₩99,999,999. |
| `shareError` | 0~{weight} 사이의 정수로 몫을 입력하세요. | Enter a whole share from 0 to {weight} kg. |

## localStorage

- `kimjang-cost-splitter:v1` holds `{ weightKg, cabbageWon, otherWon, firstKg }` for the last valid calculation.
- Save when INPUT submits successfully and after a valid share change is committed by a step button, blur, or Enter. A successful copy of a valid typed share also commits it. Keep the example and unsubmitted form edits in memory only.
- Wrap storage reads, writes, and removal in `try/catch`. Validate saved fields against the current ranges before restoring. Clear the key and in-memory state when the clear button is pressed.

## Edge cases

- Trim surrounding whitespace. Accept ASCII digits and, for won fields, correctly grouped comma separators such as `120,000`. Reject empty values, decimal fractions, signs, scientific notation, and malformed grouping. Zero is valid for costs and household shares.
- A single kilogram batch can be assigned entirely to either household. A zero-cost batch shows ₩0 for both. A split with a rounding remainder assigns that remainder through the subtraction rule.
- Invalid or unreadable saved data opens EXAMPLE. With storage blocked, users can complete and copy a split during the current visit.
- Keep form values, focus, and screen state through ordinary resize and rotation. Hide stale copy feedback as soon as displayed result values change. Ignore a clipboard completion if the user has since edited, cleared, or left that result.
- `#demo` opens EXAMPLE for thumbnail capture regardless of saved data and leaves that data untouched. Generate `thumb.png` with `npm run qa -- --thumbs` after implementation. Run `npm test` and `npm run build` before publishing.

## Must not

- No live market prices, prefilled prices presented as current, household size recommendations, recipes, or conversion from salted cabbage weight to finished kimchi weight.
- No accounts, names, contact fields, analytics, network requests, external scripts, remote assets, or fonts. Ship the experience in one `index.html` with the required sibling `meta.json`.
- No real brands or people, copied artwork, or imitation of existing calculators.
- No autoplay sound, browser dialogs, pop-ups, page navigation, or document-level scrolling.