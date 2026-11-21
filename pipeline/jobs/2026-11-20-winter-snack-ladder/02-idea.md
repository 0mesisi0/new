# Idea and spec: 겨울 간식 사다리 / Winter Snack Ladder

## Concepts scored

Scores are 1–5 for value in the first 10 seconds, originality, Korean search/share demand, and buildability in one HTML file. Maximum 20. Demand scores are editorial estimates based on the supplied research, not measured search volume.

| Concept | Category | First 10 seconds | Originality | Search/share demand | Buildability | Total | Verdict |
|---|---|---:|---:|---:|---:|---:|---|
| **겨울 간식 사다리 / Winter Snack Ladder** — choose a paper bag and follow a warm trail to a winter snack | **random** | 5 | 4 | 4 | 5 | **18** | **Picked:** immediate result, familiar search terms, and a compact result worth sharing |
| 백 원까지 N빵 / Bill Split to the Last Won — split a bill into practical amounts and rotate who covers the remainder | tools | 4 | 3 | 4 | 5 | 16 | Useful backlog direction; needs amount entry before delivering value |
| 입김 낙서창 / Frost Doodle Window — wipe a frosted window with a finger and watch it slowly cloud over | chill | 5 | 4 | 3 | 4 | 16 | Immediate tactile delight; weaker reason to share or return |

Use the categories allowed by `play/ITEMS.md`. The research’s broader labels and the example’s legacy category do not override those rules.

There are no votes yet. The selected concept follows the research’s winter snack direction and the backlog’s ladder idea without repeating either existing item.

## Meta

- slug `winter-snack-ladder`
- category `random`
- kind `tool`
- aspect `3/4`
- date `2026-11-20`
- tags: ko `사다리타기`, `간식추천`, `겨울간식`; en `ladder`, `snack-picker`, `winter`
- Tags are editorial metadata; include them in `meta.json` only if the existing schema supports them.

| Field | Korean | English |
|---|---|---|
| title | 겨울 간식 사다리 | Winter Snack Ladder |
| desc | 붕어빵부터 호떡까지, 오늘 먹을 겨울 간식이 고민된다면? 봉투 하나를 고르고 사다리를 따라가 보세요. 후보도 직접 바꿀 수 있어요. | Pick a paper bag and follow the ladder to your winter snack. Choose your candidates, reveal a treat, and copy the result to share. |
| howto | 봉투 하나를 누르면 간식이 나와요. ‘간식 바꾸기’에서 후보를 2~4개 고를 수 있어요. 키보드는 Tab과 Enter 또는 봉투 번호 1~4를 사용하세요. | Pick a bag to reveal a snack. Use “Change snacks” to choose 2–4 candidates. Use Tab and Enter, or bag number keys 1–4. |
| about | 겨울 간식을 가볍게 골라 주는 무작위 사다리예요. 모든 후보의 당첨 확률은 같고, 선택한 후보만 이 기기에 저장해요. | A playful random picker for winter snacks. Every candidate has an equal chance. Only your candidate selection is saved on this device. |

## Pitch

Four folded paper bags sit above a little ladder drawn like a winter street-stall menu. Tap a bag: a golden trail travels down the ladder and delivers one illustrated snack.

The default setup works immediately. No typing, questionnaire, account, or setup screen stands between arrival and the first result.

The distinctive elements are original snack drawings, paper-bag entry points, a visible ladder route, and short food-specific captions. This is a casual decision aid, with no scores, penalties, purchases, or fortune claims.

## Flow

1. **READY**
   - Show the title, one-line instruction, selected snack names, ladder, and numbered bag buttons.
   - Default candidates: red-bean pastry, custard pastry, hotteok, and roasted sweet potato.
   - Selecting a bag starts the draw immediately.
   - “Change snacks” opens the candidate editor.

2. **EDIT**
   - Show six snack toggle buttons in a two-column grid.
   - Allow 2–4 selected candidates.
   - “Use these snacks” commits the selection and returns to READY.
   - “Back” discards uncommitted edits.
   - Editing never generates a draw.

3. **DRAW**
   - Generate and lock the ladder and result once.
   - Reveal the bottom snack labels.
   - Animate a golden route from the selected bag to its destination.
   - Finish in 1.6 seconds of visible animation time.
   - Ignore additional bag presses.

4. **RESULT**
   - Keep the completed route visible in a compact ladder.
   - Show the selected snack illustration, name, and fixed caption.
   - Provide “Copy result” and a large “Draw again” button.
   - “Change snacks” remains available.

5. **COPY FALLBACK**
   - If automatic copying fails, replace the result body with selectable text and a “Back to result” button.
   - This is an inline screen, not a browser dialog.

“Draw again” clears the current draw and returns to READY with the same candidates. It does not immediately choose another result.

## Controls

- Use native buttons with pointer activation for touch and mouse.
- Bag buttons: at least 48 × 48 px; all other interactive targets at least 44 × 44 px.
- Tab and Shift+Tab navigate controls; Enter or Space activates the focused button.
- On READY, number keys `1`–`N` choose the matching bag. Ignore unavailable bag numbers and repeated keydown events.
- On RESULT, `R` returns to READY and `C` copies the result.
- Escape returns from EDIT without saving, or from COPY FALLBACK to RESULT.
- Do not bind Enter globally; it must activate only the focused control.
- Suppress browser defaults only for handled shortcuts.
- Do not intercept shortcuts while focus is in the fallback text area.
- The ladder drawing uses `touch-action: none`; ordinary controls use `touch-action: manipulation`.
- No dragging, timed precision, sound, or color recognition is required.

## Candidates and result captions

Candidate IDs are stable across languages. These six entries are the complete pool; there is no custom text input.

| ID | Korean name | English name | Korean caption | English caption |
|---|---|---|---|---|
| `red-bean` | 팥 붕어빵 | Red-bean pastry | 꼬리부터? 머리부터? 첫 입은 자유예요. | Tail first or head first? Your first bite, your rules. |
| `custard` | 슈크림 붕어빵 | Custard pastry | 바삭한 겉옷 안에 달콤함이 숨어 있어요. | A crisp little coat with a sweet surprise inside. |
| `hotteok` | 호떡 | Hotteok | 오늘의 동그란 행복, 한 장 나왔어요. | One round serving of happiness, coming right up. |
| `sweet-potato` | 군고구마 | Roasted sweet potato | 보랏빛 외투 속에 노란 겨울이 있어요. | A little golden winter inside a purple coat. |
| `fishcake` | 어묵 | Fish cake | 김이 모락모락, 겨울 간식 등장! | A curl of steam, and your winter snack appears! |
| `chestnut` | 군밤 | Roasted chestnuts | 작은 밤 한 알에 겨울을 담았어요. | A tiny chestnut carrying a little winter. |

Illustrations must be original inline SVG: simple silhouettes, warm fills, thick outlines, and readable shapes at small sizes. Use different shapes for each food; do not distinguish the two fish-shaped pastries by color alone. Add a bean-shaped or cream-swirl detail.

## Draw rules

### Candidate ordering

- Keep the selected candidates in the fixed order of the candidate table.
- Editing order does not affect probability.
- Let `N` be the candidate count, from 2 to 4.
- Show exactly `N` bag buttons and `N` ladder rails.

### Ladder construction

Generate the draw only after a bag is activated:

1. Record the selected bag index.
2. Create 12 horizontal rung rows.
3. Each row connects exactly one adjacent pair of rails.
4. Choose the pair uniformly from the `N − 1` possible pairs.
5. Independently shuffle the selected candidate IDs into the bottom slots using Fisher–Yates.
6. Trace the selected bag through all 12 rows.
7. Store the resulting path, bottom order, and winning candidate in memory.

At each rung, cross to the other rail if the current rail is one of that rung’s endpoints; otherwise continue downward. Consecutive rungs may connect the same pair.

The independent uniform bottom permutation gives every selected candidate probability `1/N` for every bag. Do not claim that the set of ladder shapes is uniformly distributed.

Use `crypto.getRandomValues` with rejection sampling for bounded random integers when available. Fall back to `Math.random` if unavailable or throwing. This is a casual picker, not a security feature.

### Animation

- READY shows rails and covered bottom slots, without a pre-generated result.
- DRAW reveals the generated rungs and bottom labels immediately after the bag choice is locked.
- Animate along the actual route at constant distance per second, for 1.6 seconds total.
- The result must come from the stored route, never from a second random draw.
- Add one small finishing pop around the winning snack.
- Reduced-motion preference reveals the completed route and RESULT immediately.
- No animation may change the outcome.

## Every screen

### READY

Top to bottom:

1. Title.
2. One-line instruction.
3. Two-line maximum candidate summary.
4. Numbered paper-bag buttons.
5. Ladder rails with covered bottom slots.
6. Full-width “Change snacks” button.

The bags are the primary action; there is no separate start button.

### EDIT

Top to bottom:

1. Editor heading.
2. “Choose 2–4 snacks” instruction.
3. Selection count.
4. Six illustrated toggle buttons, two columns by three rows.
5. Reserved inline validation/status line.
6. “Back” and “Use these snacks” buttons.

Selected candidates have a thick border and a check mark. Expose selection with `aria-pressed`.

Allow deselection down to zero so replacement is straightforward. Disable the commit button below two selections. At four selections, an attempt to add a fifth leaves the selection unchanged and displays the limit message.

### DRAW

- Keep the title and selected bag visible.
- Show the active route and bottom labels.
- Replace the candidate summary with the drawing status.
- Remove editor access during the draw.
- No cancel button is needed for the 1.6-second sequence.
- Move focus to the result heading on completion.

### RESULT

Top to bottom:

1. Result heading.
2. Winning illustration and snack name.
3. Food-specific caption.
4. Compact completed ladder, selected bag number, and highlighted destination.
5. Two-button row: “Copy result” and “Draw again”.
6. Full-width “Change snacks” button.
7. Reserved status line for copy feedback.

The result should fit in a screenshot at 320 × 480 without scrolling.

### COPY FALLBACK

- Heading and brief instructions.
- Read-only text area containing the complete share text, selected on entry.
- Text area supports native keyboard selection and touch selection.
- “Back to result” button.
- Preserve the draw and restore focus to the copy button when returning.

## Visual design

- Background: warm cream `#FFF4DE`.
- Main text and outlines: dark brown `#39271F`.
- Paper bags: kraft `#E5B879`.
- Primary buttons: deep terracotta `#943E2E` with white text.
- Active route: golden orange `#D88A16` with a dark outline.
- Supporting green: `#315A4A`.
- Cards: ivory `#FFFCF5`.
- Font: `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`.
- Use real DOM text for headings, labels, results, and controls. SVG carries the illustration and route.

The active route has greater thickness and a traveling marker, so it remains recognizable without color. Unselected bags stay legible rather than fading to very low contrast.

### Layout

- Root fills `100vw` and `100dvh`, with a `100vh` fallback.
- Prevent document scrolling.
- Center a column up to 480 px wide; allow the background to fill desktop screens.
- At 320 × 480, use 12 px side padding, a 22 px title, 14 px supporting text, and 16 px control labels.
- Let English food names wrap to two lines.
- Allocate the remaining space to the ladder; shrink decorative margins and illustration height before reducing text or tap targets.
- Use CSS grid with `minmax(0, 1fr)` for flexible diagram space.
- At unusually large text sizes, allow internal scrolling within the content panel while keeping bottom actions visible. The document itself must remain stationary.
- Respect safe-area insets.

### Motion and rendering

- Use `requestAnimationFrame`, capped delta time of 50 ms, and accumulated visible time.
- Stop animation scheduling when the document is hidden. Resume from the stored progress.
- Recompute SVG geometry on resize without generating new randomness.
- Use SVG `viewBox` scaling for sharp high-DPI rendering.
- No idle particle system, flashing, camera shake, or continuous movement.
- No sound in this version.

## Strings

Every visible string and accessible label belongs in a `{ ko: {...}, en: {...} }` dictionary. Candidate names and captions above are part of that dictionary. No additional random caption pool is required.

| Key | Korean | English |
|---|---|---|
| `appTitle` | 겨울 간식 사다리 | Winter Snack Ladder |
| `readyHint` | 봉투 하나 고르면 오늘의 간식 도착! | Pick a bag to find your winter snack! |
| `candidateSummary` | 오늘의 후보: {names} | Today’s candidates: {names} |
| `changeSnacks` | 간식 바꾸기 | Change snacks |
| `bagNumber` | {n} | {n} |
| `bagLabel` | {n}번 봉투 고르기 | Choose bag {n} |
| `coveredSlot` | ? | ? |
| `coveredSlotLabel` | 아직 공개되지 않은 간식 | Unrevealed snack |
| `editorTitle` | 어떤 간식으로 고를까요? | Which snacks are in? |
| `editorHint` | 후보를 2~4개 골라 주세요. | Choose 2–4 snacks. |
| `selectionCount` | {n}/4개 선택 | {n}/4 selected |
| `selectionMin` | 간식을 2개 이상 골라 주세요. | Choose at least 2 snacks. |
| `selectionMax` | 최대 4개예요. 하나를 빼고 골라 주세요. | Up to 4 snacks. Remove one before adding another. |
| `back` | 뒤로 | Back |
| `applySelection` | 이 간식들로 고르기 | Use these snacks |
| `drawing` | 간식 찾으러 가는 중… | Following the trail to your snack… |
| `resultHeading` | 오늘의 간식은 | Your winter snack is |
| `chosenBag` | {n}번 봉투 | Bag {n} |
| `resultAnnouncement` | {n}번 봉투의 간식은 {snack}입니다. | Bag {n} leads to {snack}. |
| `copy` | 결과 복사 | Copy result |
| `again` | 다시 뽑기 | Draw again |
| `copied` | 결과를 복사했어요. | Result copied. |
| `copyFallbackTitle` | 결과를 직접 복사해 주세요 | Copy your result manually |
| `copyFallbackHint` | 아래 글을 길게 누르거나 Ctrl+C / ⌘C로 복사해 주세요. | Touch and hold the text, or press Ctrl+C / ⌘C to copy. |
| `shareTextLabel` | 복사할 결과 | Result text to copy |
| `backToResult` | 결과로 돌아가기 | Back to result |
| `readyDiagramLabel` | 봉투를 고르면 간식으로 이어지는 사다리가 나타나요. | Pick a bag to reveal its ladder route to a snack. |
| `resultDiagramLabel` | {n}번 봉투에서 {snack}까지 이어진 사다리 | Ladder from bag {n} to {snack} |

Join candidate names with ` · ` in both languages.

Read `?lang=ko` or `?lang=en` first. For an absent or unsupported value, use Korean when `navigator.language` starts with `ko`; otherwise use English. Set `<html lang>` to the resolved language.

Use `aria-live="polite"` for draw completion, copy feedback, and validation. Decorative SVG details are hidden from assistive technology. Do not announce animation frames.

## Copy and sharing

Share through plain text or an ordinary user screenshot. No image export or operating-system share sheet is needed.

Korean template:

```text
오늘의 겨울 간식: {snack}
{n}번 봉투가 골라 줬어요.
{caption}
겨울 간식 사다리 · play.mesisi.net
```

English template:

```text
My winter snack: {snack}
Picked by bag {n}.
{caption}
Winter Snack Ladder · play.mesisi.net
```

- Call `navigator.clipboard.writeText` only after explicit activation.
- On success, show `copied` for 2.5 seconds without moving focus.
- On unsupported API or rejection, show COPY FALLBACK.
- The copied domain is plain text; do not navigate or open a window.
- Copying must not redraw, regenerate, or change the selected result.

## localStorage

All reads, parsing, writes, and removals must be inside `try/catch`.

| Key | Value | Default |
|---|---|---|
| `wsl:v1:candidates` | JSON array of 2–4 unique allowed candidate IDs | `["red-bean","custard","hotteok","sweet-potato"]` |

- Save only when the user commits EDIT.
- Validate the complete stored value: array type, count, uniqueness, and allowed IDs.
- If validation fails, use the default selection.
- Restore candidates in canonical table order.
- If storage is blocked or full, continue normally with in-memory state.
- Do not store results, draw history, bag choices, random seeds, clipboard text, or usage counts.
- Keep editor drafts in memory only.

## Edge cases

- **Rapid taps:** lock state synchronously on the first valid bag activation. One interaction produces exactly one draw.
- **Key held down:** ignore repeat events for draw shortcuts.
- **Editing after a result:** keep the result while EDIT is open. Back restores it; committing returns to READY and clears it.
- **Resize during a draw:** rebuild geometry from the stored ladder and normalized animation progress. The winning snack stays unchanged.
- **Background tab:** freeze visible animation time; resume without jumping or replaying.
- **Reduced-motion preference changes:** if enabled during DRAW, finish immediately using the existing outcome.
- **Clipboard delay:** prevent concurrent copy requests. Apply completion feedback only if the originating result is still active.
- **Reload:** restore candidate settings and return to READY. Do not restore or silently repeat a draw.
- **Malformed storage:** fall back without showing technical errors.
- **Unsupported language:** apply the defined navigator fallback; never display dictionary keys.
- **Unavailable snack locally:** candidates are playful suggestions, not live availability claims; the user can remove a snack in EDIT.
- **Minimum viewport:** all six editor choices and primary actions remain accessible at 320 × 480.
- **Long translated text:** wrap rather than truncate food names or action labels.
- **No score:** this is a tool; omit high scores, timers, and game-over language.

### Demo state

When `location.hash === "#demo"`:

- Use the four default candidates without reading or changing storage.
- Show RESULT immediately.
- Choose bag 2.
- Use rung pair indices `[0,1,2,1,0,2,1,0,2,1,0,2]`, zero-based.
- Use bottom order `[red-bean,custard,hotteok,sweet-potato]`.
- This route ends at bottom index 2: hotteok.
- Copy and further interaction work normally; the initial demo setup never writes settings.

## Acceptance checks

The implementation should satisfy these checks before publication:

- A new visitor can reach a result with one activation and no setup.
- Each of 2, 3, and 4 candidates produces valid routes and exactly one destination per starting bag.
- The independent shuffled bottom labels determine equal candidate probabilities.
- The stored winner always matches the visibly traced route.
- Rapid input cannot create multiple concurrent draws.
- Both languages work at 320 × 480 and desktop sizes.
- Touch, mouse, keyboard, focus visibility, and screen-reader result announcements work.
- Blocked storage and clipboard rejection preserve the full core experience.
- Resizing, hiding the page, and reduced motion do not alter a result.
- `#demo` produces a finished, readable screenshot.
- `index.html` remains self-contained and below 150 KB.

Deliver the eventual implementation in `items/winter-snack-ladder/` with `index.html` and `meta.json`. Generate `thumb.png` through the repository QA command, never by hand.

Before publication, run:

```bash
npm test
npm run build
npm run qa -- --thumbs
```

Inspect the generated thumbnail and fix every reported error. These are implementation acceptance requirements, not claims that checks have already run.

## Must not

- No network calls, external assets, fonts, libraries, analytics, or remote services.
- No copied branding, recognizable third-party characters, borrowed artwork, or imitation of a researched site’s visual design.
- No receipt framing, personality classification, annual summary, or clock-out mechanic.
- No payment, wagering, punishment, drinking-game rules, or claims of luck prediction.
- No dietary, medical, financial, or nutritional advice.
- No personal data, participant names, accounts, or hidden tracking.
- No biased “rare” outcomes, manipulated probabilities, or rerolling after the animation begins.
- No sound autoplay; this version has no audio.
- No `alert`, `confirm`, `prompt`, `window.open`, or navigation away.
- No document scrolling, clipped controls, or touch-only interactions.
- No real-store availability, prices, weather, or popularity claims.
- No hostile humor or jokes targeting real groups.