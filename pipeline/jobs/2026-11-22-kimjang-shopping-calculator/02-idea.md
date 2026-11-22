# Idea and spec: 김장 장보기 계산기 / Kimjang Shopping Calculator

## Concepts scored

Scores are 1–5 for value in the first 10 seconds, originality, Korean search and share demand, and buildability in one HTML file. Demand scores are estimates based on the supplied research. Maximum 20.

| Concept | Category | First 10 seconds | Originality | Demand | Buildability | Total |
|---|---|---:|---:|---:|---:|---:|
| **김장 장보기 계산기 / Kimjang Shopping Calculator** — Enter the amounts you need and the pack sizes and prices you find. Get a shopping list with the pack count, extra quantity and total. | `tools` | 5 | 4 | 5 | 5 | **19** |
| 난로 앞 양말 도둑 / Sock Sneak — Slide a sock off a drying rack while a toy penguin looks away. Release the control when it turns around. | `arcade` | 5 | 4 | 3 | 5 | 17 |
| 서리 창문 낙서 / Frost Window Doodles — Wipe frost from a window to draw in the warm light behind it. The frost slowly fills the strokes back in. | `chill` | 5 | 4 | 3 | 5 | 17 |

**Pick the Kimjang Shopping Calculator.** The research points to seasonal interest in both `김장 비용` and `김장 재료`. The pack calculation answers the question that comes up at the shop: how many packs to buy, what they cost together, and how much will be left over. The result is a list someone can paste into a family chat.

## Meta

- slug `kimjang-shopping-calculator`
- Category `tools`, kind `tool`, aspect `3/4`, date `2026-11-22`
- Tags ko `김장`, `김장비용`, `김장재료`, `장보기`  
  Tags en `kimjang`, `shopping-list`, `pack-calculator`
- Title ko `김장 장보기 계산기`  
  Title en `Kimjang Shopping Calculator`
- Desc ko — 김장에 필요한 양과 매장에서 본 한 팩의 용량·가격을 입력하세요. 재료별로 몇 팩을 사야 하는지, 얼마나 남는지, 총 얼마인지 한눈에 보여 줘요.
- Desc en — Enter your kimjang quantities and shop prices to see how many packs to buy, how much will be left over, and what the trip will cost.
- Howto ko — 살 재료의 필요량, 한 팩 용량, 한 팩 가격을 입력하고 ‘장보기표 보기’를 누르세요. 장보기표를 복사해 함께 장 볼 사람에게 보내세요.
- Howto en — Enter the amount you need, pack size and pack price for each ingredient. Open the shopping list and copy it to share.
- About ko — 집에서 정한 필요량과 직접 입력한 가격으로 계산해요. 봉지·상자·병도 판매 단위 하나를 한 팩으로 봐요.
- About en — The calculator uses your own quantities and prices. A pack can be any single unit sold, including a bag, box or bottle.

## Pitch

The first screen shows one calculation on a cream market card. If you need 12 kg of salted napa cabbage and the shop sells 10 kg boxes at ₩18,000 each, you buy two boxes for ₩36,000 and have 8 kg left over. One button opens a blank calculator for the user’s own shop. Five fixed ingredient rows keep the form short.

## Flow and screens

1. **Start.** Show the title, a one-line instruction, the labeled cabbage example and the primary button. With no saved draft, the button opens a blank editor and focuses the first quantity field. With a saved draft, it opens the restored editor and focuses its heading. The example stays on this screen.
2. **Editor.** Show the instruction and five ingredient cards in a vertically scrollable panel. Each card has a heading, its unit and three labeled inputs in this order: amount needed, pack size and pack price. Keep **View shopping list** and **Clear entries** in the footer. Submitting a valid form opens the result. An invalid submission stays here, marks the relevant fields, and scrolls and focuses the first invalid field. An entirely blank submission shows the empty-form message and focuses the first quantity field. Clearing entries empties all fields and errors, deletes the saved draft, focuses the first quantity field and announces the change inline.
3. **Result.** Show the total and the ingredient count at the top. Each included ingredient shows how many packs to buy, the line cost, the amount needed, the amount bought and the extra quantity. Keep **Copy list** and **Edit quantities and prices** available in the footer. Copy success appears inline. Editing returns to the same form, with the values and previous panel scroll position restored.
4. **Manual copy.** If the clipboard write is unavailable or rejected, replace the result panel with a heading, instructions, a labeled read-only text area and **Back to list**. Focus the text area and attempt to select its contents. It remains selectable by touch or keyboard. Returning restores the result, its previous panel scroll position and focus on **Copy list**.

## Controls

- Touch and mouse use native inputs and buttons. Every interactive target is at least 44 px tall. Keep vertical swipes available inside the scrollable panel.
- Tab and Shift+Tab follow DOM order. Enter in an editor input submits the form. Enter and Space activate focused buttons. The manual copy field supports the device’s normal select and copy commands.
- On a screen change, move focus to the new heading unless the flow specifies another target. Use a polite live region for inline status and associate field errors with their inputs. Make errors identifiable by text and a visible border.

## Inputs and calculation

Ingredient order is salted napa cabbage, radish, red pepper flakes, minced garlic and fish sauce. Use `kg` for the first four and `L` for fish sauce. Both quantity fields on a card use the same unit. Prices are whole Korean won.

- An entirely blank row is omitted. A row with any entry must have all three fields valid before the list can be generated.
- Needed quantities and pack sizes accept `0.001`–`999.999`, with up to three decimal places. Trim outer whitespace. Accept forms like `.5` and `0.5`. Use a decimal keyboard hint and validate the full input as text.
- Pack prices accept integers from `0` to `9,999,999`. Accept plain digits or correctly grouped thousands, such as `18000` and `18,000`. Use a numeric keyboard hint.
- Convert quantities to integer thousandths of the displayed unit before dividing. `packs = ceil(needed ÷ pack size)`. `bought = packs × pack size`. `extra = bought − needed`. `line cost = packs × pack price`. The total is the sum of line costs.
- Format output with localized digit grouping and up to three quantity decimals, dropping trailing zeros. Display prices as `{n}원` in Korean and `₩{n}` in English. Show zero extra explicitly. Use the ingredient order above on screen and in copied text.

## Visual design

- Use warm paper `#FFF8E8`, ink `#251E16`, cabbage green `#2E553D` for primary actions, and pepper red `#A23729` for errors. Use system UI type and tabular numerals for quantities and amounts.
- Put the example on one bordered card with the pack count and cost on the same line. In the editor, stack ingredient cards and align the three fields in a row, allowing labels to wrap. In the result, give the total the largest type and place each row’s cost beside its pack count.
- Fill the iframe with `100dvh`, with a `100vh` fallback. Center the content in a column up to 560 px wide. At 320 × 480, use 12 px side padding, keep the footer in view and let the content panel scroll. Apply safe-area padding where available. Reflow when the viewport or on-screen keyboard changes.
- Use a visible focus ring and no sound. Any screen transition is a brief opacity change and is disabled with `prefers-reduced-motion`.

## Copy format

Build plain text from the displayed result. Use the shopping-list title on the first line, then the total, followed by one line per ingredient. Use the localized `copyRow` template below and keep the same quantity and price formatting as the result. A manual copy displays that exact text.

## Strings

Resolve `?lang=ko` or `?lang=en` first. Otherwise use Korean when `navigator.language` starts with `ko` and English for other locales. Set `<html lang>` and the document title. Use this dictionary for visible and assistive text. Disable native form validation messages.

| Key | ko | en |
|---|---|---|
| `appTitle` | 김장 장보기 계산기 | Kimjang Shopping Calculator |
| `startIntro` | 필요한 양과 한 팩 가격으로 김장 장보기표를 만들어요. | Turn the quantities you need and pack prices into a kimjang shopping list. |
| `example` | 계산 예시 | Example |
| `exampleInputs` | 절임배추 12 kg 필요 · 한 상자 10 kg · 상자당 18,000원 | Need 12 kg of salted napa cabbage · 10 kg per box · ₩18,000 per box |
| `exampleResult` | 2상자 구매 · 총 36,000원 · 8 kg 남음 | Buy 2 boxes · ₩36,000 total · 8 kg left over |
| `start` | 내 장보기 시작 | Start my list |
| `resume` | 작성하던 장보기 이어서 하기 | Continue my list |
| `editorTitle` | 재료와 가격 입력 | Ingredients and prices |
| `editorIntro` | 살 재료만 입력하세요. 봉지·상자·병도 판매 단위 하나를 한 팩으로 봐요. | Fill in the ingredients you plan to buy. A bag, box or bottle counts as one pack. |
| `cabbage` | 절임배추 | Salted napa cabbage |
| `radish` | 무 | Radish |
| `pepper` | 고춧가루 | Red pepper flakes |
| `garlic` | 다진 마늘 | Minced garlic |
| `fishSauce` | 액젓 | Fish sauce |
| `unitKg` / `unitL` | kg / L | kg / L |
| `quantity` | {n} {unit} | {n} {unit} |
| `won` | {n}원 | ₩{n} |
| `neededLabel` | 필요량 ({unit}) | Amount needed ({unit}) |
| `packSizeLabel` | 한 팩 용량 ({unit}) | Pack size ({unit}) |
| `packPriceLabel` | 한 팩 가격 (원) | Pack price (₩) |
| `fieldName` | {ingredient} {label} | {ingredient}, {label} |
| `view` | 장보기표 보기 | View shopping list |
| `clear` | 입력 지우기 | Clear entries |
| `cleared` | 입력 내용을 지웠어요. | Entries cleared. |
| `empty` | 재료 한 가지 이상을 입력해 주세요. | Fill in at least one ingredient. |
| `required` | 이 칸을 채워 주세요. | Fill in this field. |
| `quantityError` | 0.001~999.999 사이의 수를 소수 셋째 자리까지 입력해 주세요. | Enter a number from 0.001 to 999.999 with up to three decimal places. |
| `priceError` | 0~9,999,999원 사이의 정수를 입력해 주세요. | Enter a whole-won price from 0 to 9,999,999. |
| `listTitle` | 김장 장보기표 | Kimjang shopping list |
| `total` | 예상 합계 {price} | Estimated total {price} |
| `countOne` / `countMany` | 재료 {n}가지 / 재료 {n}가지 | {n} ingredient / {n} ingredients |
| `packsOne` / `packsMany` | {n}팩 구매 / {n}팩 구매 | Buy {n} pack / Buy {n} packs |
| `needed` | 필요량 {quantity} | Need {quantity} |
| `bought` | 구매량 {quantity} | Buy {quantity} |
| `extra` | 남는 양 {quantity} | {quantity} left over |
| `edit` | 수량·가격 수정 | Edit quantities and prices |
| `copy` | 장보기표 복사 | Copy list |
| `copied` | 장보기표를 복사했어요. | Shopping list copied. |
| `manualTitle` | 장보기표 직접 복사 | Copy the list manually |
| `manualHelp` | 자동으로 복사하지 못했어요. 아래 텍스트를 선택해 복사해 주세요. | Automatic copy failed. Select and copy the text below. |
| `manualLabel` | 장보기표 텍스트 | Shopping list text |
| `back` | 장보기표로 돌아가기 | Back to list |
| `copyRow` | {ingredient} · {packs} · {price} · {needed} · {bought} · {extra} | {ingredient} · {packs} · {price} · {needed} · {bought} · {extra} |

## localStorage

- `kimjang-shopping-calculator:draft:v1` holds the three raw field strings for each known ingredient ID. Cap each stored field at 32 characters. Save on input so incomplete entries can be resumed.
- Wrap reads, writes, deletes and JSON parsing in `try/catch`. Ignore malformed drafts. Accept only known ingredient IDs with three string fields within the length limit. Apply normal field validation when the user submits restored entries.
- Treat an all-blank draft as empty and remove the key. **Clear entries** uses the same deletion path. Keep results, examples and clipboard status in memory.

## Edge cases

- Exactly divisible quantities produce zero extra. For example, 0.3 kg needed in 0.1 kg packs produces three packs, with 0 kg left over.
- A pack larger than the needed amount still counts as one pack. A zero-won pack counts toward quantity and contributes ₩0. Reject zero pack size, negatives, exponents, surplus precision and malformed grouping.
- Wait for IME composition to finish before handling Enter or validating the active input. On subsequent edits, clear the stale error for the field being changed and validate the full form on submission.
- Resize, rotate, reopen the keyboard or return from a hidden tab without changing entries or leaving the current screen. Layout relies on CSS reflow and has no background animation loop.
- If storage is unavailable, the editor, calculation and copy flow still work for the current visit.
- `#demo` opens the result with three sample rows and leaves the saved draft untouched. Use cabbage `12 / 10 / 18000`, radish `2.4 / 1 / 2500` and red pepper flakes `0.7 / 0.5 / 12000`. The expected total is ₩67,500 for 2, 3 and 2 packs respectively. Edits in demo mode stay in memory.
- Before publishing, run `npm test`, `npm run build` and `npm run qa -- --thumbs`. Check the generated thumbnail and verify both languages at 320 × 480, including keyboard submission and the manual copy fallback.

## Must not

- No live prices, retailer links, recipes, household-size estimates or suggested ingredient ratios. The calculator uses the amounts and prices entered by the user.
- No real brands or people, copied interface art, remote assets, requests, analytics or external dependencies. Ship the interface as one `index.html`, with the repository’s separate `meta.json` and QA-generated `thumb.png`.
- No page scrolling, dialogs, new windows or navigation away from the item. Copy and its fallback stay inside the iframe.