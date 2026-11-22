# Idea and spec: 홈파티 준비물 분담표 / Home Party Prep Splitter

## Concepts scored

Each criterion is scored from 1 to 5, with a maximum total of 20. Korean search and share scores are planning estimates informed by the supplied research. The home-party hook comes from last December’s coverage, and the tactile concept comes from the first-half short-form trend notes.

| Concept | Category | First 10 seconds | Originality | Korean search/share | One-file buildability | Total | Verdict |
|---|---|---:|---:|---:|---:|---:|---|
| **홈파티 준비물 분담표 / Home Party Prep Splitter** | `tools` | 5 | 3 | 4 | 5 | **17** | **Picked.** Default supplies produce a usable group-chat message in two taps. `홈파티 준비물` gives the title a clear search phrase, and the output has a natural recipient. |
| 김장통 자리 맞추기 / Kimchi Fridge Fit | `puzzle` | 4 | 4 | 3 | 5 | 16 | Fit five original container shapes into a fixed fridge shelf. The seasonal theme reads immediately, and a small hand-authored board fits in one file. |
| 김 서린 거울 낙서 / Fogged Mirror Doodles | `chill` | 5 | 4 | 2 | 5 | 16 | Trace on a fogged mirror and watch the marks fade. The tactile payoff is immediate. Search intent is less clear, and the fading marks give players little reason to share. |

## Meta

slug `home-party-prep-split`

- Category `tools`, kind `tool`, aspect `3/4`, date `2026-11-22`
- Tags
  - ko `홈파티 준비물`, `준비물 분담`, `연말 모임`
  - en `home party`, `party checklist`, `party planning`
- **Title**
  - ko — 홈파티 준비물 분담표
  - en — Home Party Prep Splitter
- **Desc**
  - ko — 홈파티 인원과 필요한 준비물을 고르면 인원별 분담표가 나와요. 단톡방에 붙여넣을 수 있게 한 번에 복사하세요.
  - en — Pick your party size and supplies, then get a person-by-person checklist you can copy straight into the group chat.
- **Howto**
  - ko — 인원수와 준비물을 고르고 ‘분담표 만들기’를 누르세요. 단톡방에서 순서를 정한 뒤 분담표를 복사해 보내세요.
  - en — Pick the party size and supplies, then choose “Make checklist.” Agree on an order in the group chat and paste the checklist there.
- **About**
  - ko — 한 항목을 한 사람이 맡도록 준비물 개수를 고르게 나눠요.
  - en — Each supply goes to one person, and the number of supplies is split as evenly as possible.

## Pitch

Choose how many people are coming and what the group needs. The tool turns the checked supplies into a numbered roster for the group chat. The default setup has three people and six supplies, so a visitor can make a complete checklist and copy it in two taps. The group agrees on who is Person 1, Person 2, and so on.

## Flow

1. **SETUP** opens with the last valid party size or the default of three. Six of eight supplies are checked by default. The selection count and **분담표 만들기 / Make checklist** are visible immediately.
2. **RESULT** snapshots the selected supplies and shows one row per person. **분담표 복사 / Copy checklist** copies the complete roster, including rows below the panel fold. **준비물 수정 / Edit setup** returns to the current selections.
3. **MANUAL COPY** appears on the result screen if direct copying fails. A labeled, read-only text area contains the same share text. **분담표로 돌아가기 / Back to checklist** restores the roster.

## Controls

- Use native buttons and checkboxes. Tapping or clicking the supply label toggles its checkbox. Every target is at least 44 × 44 CSS px.
- On the party-size stepper, **−** and **+** change the total by one. Disable the relevant button at two and six. The displayed total includes the host. Announce changes through a polite live region.
- `Tab` and `Shift+Tab` follow the visible order. `Space` toggles a focused checkbox. `Enter` or `Space` activates a focused button. Keep standard text-selection and copy shortcuts in the manual-copy field.
- Move focus to the result heading after generation, to the text area when manual copy opens, to the copy button when it closes, and to **Make checklist** on return to setup. Announce successful copy through a polite status region. Keep focus visible throughout.

## Screens

### Setup

The heading and one-line instruction sit above the party-size stepper. Show supplies in two columns of four rows, with a checkbox and label in each cell. The selected count and primary button stay in the footer. With zero supplies selected, replace the count with the selection instruction and disable the primary button. One selected supply is enough to continue.

| Order | Key | ko | en | Initially checked |
|---:|---|---|---|---|
| 1 | `main` | 메인 음식 | Main dish | Yes |
| 2 | `snacks` | 간식 | Snacks | Yes |
| 3 | `drinks` | 음료 | Drinks | Yes |
| 4 | `cups` | 컵 | Cups | Yes |
| 5 | `plates` | 접시·식기 | Plates & cutlery | Yes |
| 6 | `cleanup` | 정리용 봉투 | Cleanup bags | Yes |
| 7 | `dessert` | 디저트 | Dessert | No |
| 8 | `ice` | 얼음 | Ice | No |

### Result

Show the result heading and the instruction to agree on person numbers in the chat. Render person rows in ascending order. Each row shows its person label and the assigned supplies, or an explicit empty-row label. Keep both action buttons visible below the roster. Display copy feedback in a reserved status line so the buttons stay in place.

Filter the supply list in its displayed order. Assign the item at zero-based position `i` to person `(i % people) + 1`. Preserve that order within each row. Every selected item appears once, and the largest and smallest assignment counts differ by at most one. The split is by item count. With the default selections, the three rows are Main dish and Cups, Snacks and Plates & cutlery, and Drinks and Cleanup bags.

### Manual copy

Keep the result heading and show the localized manual-copy instruction above the read-only text area. Focus and select its contents on entry, with native selection available if the browser clears that selection. Replace the roster and copy button with this panel and its back button. Preserve the result and setup state.

## Visual design

- Use a warm cream background `#F7F2E8`, dark ink `#29251E`, white supply tiles, and a forest-green action color `#205B43`. Selected tiles use a pale green fill and a visible checkbox checkmark. Use `system-ui` and a high-contrast focus outline.
- Use a full-viewport shell with a centered content column up to 480 px wide. At 320 × 480, use 12 px side padding, compact spacing, and wrapped labels. Keep the page fixed and let the middle panel scroll internally when its content exceeds the space between the header and footer. Keep the footer visible in both orientations.
- Keep the same layout in both languages. Let longer English labels wrap to two lines. Use static state changes and omit sound.

## Copy and share text

On the copy button’s user gesture, call `navigator.clipboard.writeText` if available. Show the success status only after it resolves. If it is unavailable, throws, or rejects, open manual copy. Keep a single request in flight and ignore any completion after the user leaves that result screen.

Build plain text with the localized result heading, the instruction, a blank line, and one numbered line per person. Join multiple supplies with `, ` in both languages. Include empty rows. The shared text uses the same text as the visible roster.

| Part | ko | en |
|---|---|---|
| Heading | 홈파티 준비물 분담표 | Home party prep checklist |
| Instruction | 단톡방에서 각자 맡을 번호를 정해 주세요. | Agree in the group chat on who takes each number. |
| Assigned row | `{n}번 — {items}` | `Person {n} — {items}` |
| Empty row | `{n}번 — 맡은 준비물 없음` | `Person {n} — No supplies assigned` |

## Strings

Use `{ ko: {...}, en: {...} }` for all item text, including the supply labels and share templates above. Honor `?lang=ko` or `?lang=en` first. Otherwise use Korean when the first tag in `navigator.language` is `ko`, and English for all other values. Set `<html lang>` and the browser title from the chosen dictionary.

| Key | ko | en |
|---|---|---|
| `appTitle`, `resultTitle` | 홈파티 준비물 분담표 | Home Party Prep Splitter |
| `setupIntro` | 인원수와 필요한 준비물을 골라 주세요. | Choose how many people are coming and what you need. |
| `peopleLabel` | 인원수 · 나 포함 | Party size · including you |
| `peopleCount` | {count}명 | {count} people |
| `fewerPeople` | 인원 한 명 줄이기 | Remove one person |
| `morePeople` | 인원 한 명 늘리기 | Add one person |
| `suppliesLabel` | 준비물 | Supplies |
| `selectedOne` | 준비물 1개 선택 | 1 supply selected |
| `selectedMany` | 준비물 {count}개 선택 | {count} supplies selected |
| `selectAtLeastOne` | 준비물을 한 개 이상 골라 주세요. | Choose at least one supply. |
| `makeChecklist` | 분담표 만들기 | Make checklist |
| `resultIntro` | 단톡방에서 각자 맡을 번호를 정해 주세요. | Agree in the group chat on who takes each number. |
| `personLabel` | {n}번 | Person {n} |
| `noSupplies` | 맡은 준비물 없음 | No supplies assigned |
| `copyChecklist` | 분담표 복사 | Copy checklist |
| `editSetup` | 준비물 수정 | Edit setup |
| `copied` | 분담표를 복사했어요. | Checklist copied. |
| `manualHint` | 자동으로 복사하지 못했어요. 아래 글을 선택해 복사해 주세요. | Automatic copy failed. Select and copy the text below. |
| `manualTextLabel` | 복사용 분담표 | Checklist text to copy |
| `backToChecklist` | 분담표로 돌아가기 | Back to checklist |

## localStorage

- `home-party-prep-split:people` stores the last selected party size as a string from `"2"` through `"6"`. Default to `"3"`. Read and write inside `try/catch`.
- Keep supply selections, generated assignments, and copy state in memory for the open page.

## Edge cases

- If the stored count is missing, invalid, or unreadable, start with three people. If writes are blocked, the stepper still works for the current session.
- If there are fewer supplies than people, show every person and include the empty rows in the copied roster. Returning to setup preserves both the count and the checked supplies.
- Regenerating from the same selections produces the same roster. Changing a selection only affects a newly generated result.
- Clear stale copy feedback on screen changes. Resizing preserves all input, assignment, and manual-copy text state.
- An exact `#demo` hash opens the default three-person, six-supply result for thumbnail QA without reading or writing the stored count.

## Must not

- No network requests, external fonts, external scripts, CDN assets, analytics, or remote clipboard services. The full experience runs in one `index.html`.
- No contacts, names, account sign-in, currency amounts, or expense splitting. The group assigns person numbers in its own chat.
- No automatic posting, external navigation, popups, browser dialogs, or sound.
- No real brands, copied artwork, or raster assets. Use CSS and native controls, and generate `thumb.png` through project QA.