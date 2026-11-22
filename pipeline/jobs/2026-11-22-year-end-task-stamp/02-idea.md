# Idea and spec: 연말 할 일 도장 / Year-End Task Stamp

slug `year-end-task-stamp`

## Concepts scored

Scores are 1–5 in each column, with a maximum of 20. Search and share scores are planning estimates based on the supplied research and candidate Korean search terms. The research offers limited recent evidence, and the brief contains no votes.

| Concept | Category | First 10 seconds | Originality | Korean search and share | One-file buildability | Total |
|---|---|---:|---:|---:|---:|---:|
| **연말 할 일 도장 / Year-End Task Stamp** — Stamp a fictional year-end to-do list and share what made it into January. | `silly` | 5 | 4 | 4 | 5 | **18** |
| 김장 배추 받기 / Kimchi Cabbage Catch — Move a basin between three lanes to catch falling cabbage leaves in a 30-second round. | `arcade` | 5 | 3 | 3 | 5 | 16 |
| 홈파티 장보기 분담 / Home Party Shopping Split — Choose a group size and food categories to get a shopping assignment each guest can copy. | `tools` | 4 | 3 | 4 | 5 | 16 |

**Pick Year-End Task Stamp.** The first task is actionable on load, and a single press leaves a visible ink mark. Four presses produce a finished card friends can compare. It uses the research note’s year-end stress hook and interest in tactile interactions. `연말 할 일` and `새해로 미루기` are candidate phrases for Korean discovery and sharing.

## Meta

- Category `silly`, kind `tool`, aspect `9/16`, date `2026-11-22`
- Tags — ko `연말`, `할 일`, `도장`, `새해` / en `year-end`, `to-do`, `stamp`, `new year`
- Title — ko `연말 할 일 도장` / en `Year-End Task Stamp`
- Desc ko — 연말 할 일 네 가지에 ‘완료’나 ‘새해로’ 도장을 찍어 보세요. 새해로 보낸 일이 적힌 결과를 복사해 친구와 나눌 수 있어요.
- Desc en — Stamp four everyday year-end chores Done or Next Year, then copy your stamped list to share with friends.
- Howto ko — 카드마다 ‘완료’나 ‘새해로’를 누르세요. 마지막 도장을 찍으면 결과를 복사할 수 있어요. 키보드는 1과 2를 사용하세요.
- Howto en — Press Done or Next Year on each card. You can copy the list after the fourth stamp. On a keyboard, use 1 and 2.
- About ko — 준비된 할 일로 가볍게 즐기는 연말 장난감이에요. 마지막으로 완성한 결과는 이 브라우저에 저장돼요.
- About en — A playful year-end stamp pad with four preset chores. Your latest completed list is saved in this browser.

## Pitch

Four little memo cards sit beside two rubber stamps. Decide whether each everyday chore is finished or can wait for January. Green `완료` and red `새해로` marks pile up on a single result card, ready to copy into a group chat or capture in a screenshot.

The first card and both stamps appear immediately. A round takes four presses and has no timer or score. Replaying uses the same chores in the same order, so friends can compare their choices line by line.

## Flow and screens

1. **Stamp desk.** Show the title, one-line instruction, progress `1 / 4`, the first task, and two 44 px or taller stamp buttons. If a valid previous result exists, show `지난 결과 보기` below the buttons until the first stamp is placed.
2. **Stamp feedback.** Commit the choice immediately and show the matching word and icon on the memo. At 220 ms, advance to the next memo or to the result after task four. Ignore stamp inputs during that interval and suppress held-key repeats. Keep the controls in place between memos. With reduced motion, show the stamp without animation and use the same input lock.
3. **Result.** Show `연말 도장 결과`, the completed and deferred counts, and all four original chores in order with their stamps. Show `결과 복사` and `다시 찍기` below the card. Opening a previous result uses this same screen and leaves the stored choices untouched.
4. **Copy fallback.** If clipboard writing fails or is unavailable, replace the result view with a manual-copy view. Show its heading, instruction, a labeled read-only textarea containing the exact share text, and `결과로 돌아가기`. Focus the textarea and select its full contents. Going back restores focus to `결과 복사`.

Persist the four choices when the fourth stamp is committed. `다시 찍기` clears the in-memory round, returns to task one, and keeps the previous completed result available until another round is completed.

## Controls

- **Touch and mouse:** Tap or click either stamp. Use native buttons and a single activation handler per button.
- **Keyboard:** `Tab` and `Shift+Tab` move among controls. `Enter` and `Space` activate the focused button. `1` stamps Done and `2` stamps Next Year while the stamp desk is active. Ignore modified shortcuts and key repeats. Preserve standard selection and copy shortcuts in the manual-copy view.
- **Focus:** Keep focus on the active stamp button across tasks. Announce the next task and progress together in a polite live region. On entering the result, focus its heading. On retry, focus the first task heading.
- **Layout:** Keep targets at least 44 × 44 CSS px. Leave pinch zoom and native textarea interactions available. Prevent page scrolling from handled game-style shortcuts only.

## Task cards

| Order | ko | en |
|---:|---|---|
| 1 | 사진첩 스크린샷 정리 | Clear out old screenshots |
| 2 | 읽다 만 책 한 권 마저 읽기 | Finish a half-read book |
| 3 | 책상 서랍 한 칸 정리 | Tidy one desk drawer |
| 4 | 안 쓰는 장바구니 항목 지우기 | Clear old items from your shopping cart |

Each choice is the stable internal value `done` or `next`. The counts sum to four, including when all four stamps match. Use the same task, stamp, and count strings on the card and in the copied result.

## Visual design

- Fill the iframe with a warm desk background `#E8DAC5`, off-white memo paper `#FFF9ED`, and dark ink `#29241F`. Use deep green `#245A45` for Done and brick red `#9F362E` for Next Year.
- Draw the rubber stamp impressions with CSS borders and system text. Pair Done with a check and Next Year with a right arrow. The stamp words convey the meaning in both languages. Hide decorative icons from assistive technology.
- Make the active memo the largest element on the desk. Give the stamped impression a slight rotation and a brief scale-down to suggest contact with paper. Keep all result stamps legible at their resting size. Remove rotation transitions and scaling under `prefers-reduced-motion`.
- Use a centered column no wider than 420 px, `100dvh` with a `100vh` fallback, and compact vertical gaps on short screens. At 320 × 480, the four result rows may wrap to two lines each. Keep both result buttons visible and confine any overflow at enlarged text sizes to the card. The page itself stays fixed. The manual-copy textarea can scroll internally.

## Sound

Silent throughout. Stamp feedback comes from the visible impression and the localized task announcement.

## Export and copy

Join the following lines with `\n`. Substitute localized task names and stamp words from the tables, keeping task order fixed.

```text
연말 할 일 도장
완료 {done}개 · 새해로 {next}개
{task1} — {stamp1}
{task2} — {stamp2}
{task3} — {stamp3}
{task4} — {stamp4}
```

```text
Year-End Task Stamp
Done: {done} · Next year: {next}
{task1} — {stamp1}
{task2} — {stamp2}
{task3} — {stamp3}
{task4} — {stamp4}
```

Call `navigator.clipboard.writeText` from the copy button. On success, show and announce `copied`. On rejection, open the manual-copy view. Allow one pending copy per result and ignore a stale completion if the user has since left that result.

## Strings

Read `?lang=ko` or `?lang=en`. Otherwise, use Korean when `navigator.language` starts with `ko`, and English in other cases. Set `<html lang>` and the document title. Keep the UI, task names, announcements, and share templates in the two language dictionaries. The task table and share templates above are part of the string inventory.

| Key | ko | en |
|---|---|---|
| `appTitle` | 연말 할 일 도장 | Year-End Task Stamp |
| `deskHint` | 할 일마다 도장 하나를 찍으세요. | Pick a stamp for each chore. |
| `progress` | {current} / 4 | {current} / 4 |
| `taskAnnouncement` | 4개 중 {current}번째. {task} | Chore {current} of 4. {task} |
| `done` | 완료 | Done |
| `next` | 새해로 | Next Year |
| `lastResult` | 지난 결과 보기 | View last result |
| `resultTitle` | 연말 도장 결과 | Your stamped list |
| `counts` | 완료 {done}개 · 새해로 {next}개 | Done: {done} · Next year: {next} |
| `copy` | 결과 복사 | Copy result |
| `copied` | 결과를 복사했어요. | Result copied. |
| `retry` | 다시 찍기 | Stamp again |
| `manualTitle` | 결과 직접 복사 | Copy your result manually |
| `manualHint` | 복사 버튼을 사용할 수 없어요. 아래 텍스트를 선택해 복사하세요. | The copy button is unavailable. Select and copy the text below. |
| `manualField` | 복사할 결과 텍스트 | Result text to copy |
| `backToResult` | 결과로 돌아가기 | Back to result |

## localStorage

- `year-end-task-stamp:last:v1` stores a JSON array of exactly four `done` or `next` values in task order. Write only after a finished round. Use stable values so a saved result can render in either language.
- Wrap reads, parsing, and writes in `try/catch`. Keep the current result in memory even when the write fails. Omit the previous-result button on initial load when no valid saved array is available.

## Edge cases

- **Fast input:** A double click, mixed pointer and key presses, or a held key counts once during a stamp transition. Once the result opens, numeric shortcuts have no effect.
- **Hidden iframe:** If the tab hides during feedback, cancel the visual transition and apply the already committed next state once. Resume on the correct task or result.
- **Reload and language changes:** A new load opens at task one. A saved complete result appears in the newly selected language when reopened. In-progress choices exist only in memory.
- **Resize:** Reflow the current screen without resetting progress or replaying animation. Keep native text selection and the return action available in the manual-copy view.
- **QA thumbnail:** `#demo` opens the result with `done`, `next`, `next`, `done` in memory and skips the storage write. Verify both languages at 320 × 480 and desktop widths, exercise keyboard activation and clipboard fallback, then run `npm test`, `npm run build`, and `npm run qa -- --thumbs`.

## Must not

- No network requests, analytics, remote assets, dependencies, or storage of personal data. Ship the interaction as one HTML file with inline CSS and JavaScript, alongside the required metadata and generated thumbnail.
- No real brands, people, official seals, tax forms, or imitation of an existing interface. Use original memo and stamp art.
- No penalties, rankings, productivity claims, or shaming language for deferred chores.
- No dialogs, pop-ups, navigation away from the iframe, autoplay audio, or page scrolling.