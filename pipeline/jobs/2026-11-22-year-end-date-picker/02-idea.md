# Idea and spec: 송년회 날짜 맞추기 / Find a Year-End Date

## Concepts scored

Each dimension is scored from 1 to 5, for a maximum of 20. Korean demand scores estimate search intent and sharing potential using the supplied research and backlog. [Research notes](01-research.md)

| Concept | Category | First 10 seconds | Originality | Korean search/share demand | One-file buildability | Total |
|---|---|---:|---:|---:|---:|---:|
| 우산 물기 털기 / Umbrella Shake-Off · Alternate taps to shake water from an umbrella before it reaches the indoor mat. The first shake sends droplets flying. | `games` | 5 | 4 | 3 | 4 | 16 |
| 겨울 창가 그림자 / Winter Window Shadows · Move the afternoon sun and watch the shadows of a mug, a plant and a window frame stretch across the room. | `cool` | 5 | 4 | 3 | 5 | 17 |
| **송년회 날짜 맞추기 / Find a Year-End Date** · Try a sample result in one tap or tally a group's availability across three dates, then copy the result for the group chat. | `tools` | **5** | **4** | **4** | **5** | **18** |

**Picked** · One tap shows the payoff: which date works for the most people and whether there's a tie. The real tally fits a familiar year-end task, and the copied summary gives the group the counts it needs to decide.

## Meta

slug `year-end-date-picker`

- **Category** `tools`
- **Kind** `tool`
- **Aspect** `9/16`
- **Date** `2026-11-22`
- **Tags (ko)** `송년회`, `모임 날짜`, `일정 조율`
- **Tags (en)** `year-end`, `group scheduling`, `availability`

| Field | ko | en |
|---|---|---|
| `title` | 송년회 날짜 맞추기 | Find a Year-End Date |
| `desc` | 송년회 후보 날짜 세 개에 참석 가능 여부를 모아 가장 많이 모일 수 있는 날을 찾아요. 날짜별 인원을 복사해 단체 채팅방에 공유하세요. | See which of three dates works for the most people at your year-end gathering. Copy the headcounts for your group chat. |
| `howto` | 후보 날짜 세 개와 인원수를 정한 뒤, 한 사람씩 가능한 날을 모두 골라 주세요. 결과에서 날짜별 인원을 확인하고 복사할 수 있어요. | Set three candidate dates and the group size. Enter all the dates that work for each person, then review and copy the headcounts. |
| `about` | 한 기기에서 최대 여섯 명의 응답을 모을 수 있어요. 날짜와 응답은 현재 화면에서만 사용하며, 나갔다 돌아오면 새로 시작해요. | Collect availability for up to six people on one device. Dates and responses stay in the open page. Reopening it starts a new tally. |

## Pitch

Three date cards sit on a small desk calendar. Tap **예시 보기 / View example** to see a finished tally immediately, or enter three dates and pass the device around. Each person marks every date that works for them. The calendar highlights every date with the highest positive headcount and puts all three counts into a message the organizer can paste into the group chat.

## Flow

### 1. Start

- Show `appTitle`, `startIntro`, the primary `start` button and the secondary `example` button. Place a decorative illustration of three date cards above the actions.
- `start` opens a new setup with three people and empty date fields. `example` opens the finished sample directly.

### 2. Setup

- Show `setupTitle`, `setupHint`, three labeled date inputs and a people stepper labeled `groupSize`. The stepper ranges from 2 to 6 and disables its buttons at the limits.
- Accept dates as `YYYY-MM-DD`. The shared `datePlaceholder` shows the expected format. Show errors on the relevant fields when the user tries to continue, and focus the first invalid field. Clear each field’s error when that field is edited.
- `back` returns to the previous screen. `continue` validates and sorts the three dates, then opens the first person's availability screen. If an existing tally's dates or group size have changed, show `setupResetHint` before continuation and clear its responses when the valid changes are applied. Returning without continuing discards setup edits.

### 3. Availability

- Show `personProgress`, `voteHint` and three full-width date buttons in chronological order. Each button displays a date, its weekday and `available` or `unmarked`. Selected buttons use a check mark and `aria-pressed`.
- Put `noneAvailable` below the dates. Selecting it clears the date buttons. Selecting a date clears it. Deselecting the last selected date returns the response to unanswered.
- `next` advances one person. The last person sees `showResult` in its place. If the current response is unanswered, keep the user on the same screen and show `responseRequired`. Clear that message as soon as they make a selection.
- `back` returns to the preceding person and preserves selections. On person 1 it returns to setup. Continuing with the same valid dates and group size preserves the tally. After each person change, focus the progress heading.

### 4. Result

- Show `resultTitle`, the appropriate result headline and all three dates in chronological order. Each row shows `count`, a proportional bar and a `topBadge` when it has the highest positive count. The headline names the sole leading date, reports the number of dates tied for first or explains that no date works.
- Show `copy` as the primary action. For a real tally, show `editVotes` and `editSetup` below it. `editVotes` opens person 1 with all responses loaded. `editSetup` opens the current dates and group size. Going back from that setup leaves the result intact.
- In sample mode, show `sampleLabel` at the top and `start` below `copy`. `start` opens a fresh setup. Sample responses never populate the real tally.
- If copying fails, temporarily replace the tally rows with a labeled, read-only text box containing the selected summary. Keep the fallback instructions and `closeCopy` in view. Closing it restores the tally and returns focus to `copy`.

## Controls

- Use native buttons and labeled inputs. Pointer users tap or click. Keyboard users use Tab and Shift+Tab to move, Space or Enter to activate buttons, and Enter inside a setup input to validate the form. Preserve normal text selection and editing shortcuts.
- Keep touch targets at least 44 × 44 CSS pixels and show a visible focus ring. Use release-based native button activation so canceled pointer gestures leave the tally intact. Keep ordinary controls keyboard-accessible at 320 × 480.
- Move focus to the new screen’s heading after navigation. Announce validation errors and copy status through live regions. Keep stepper bounds and selected date states available to assistive technology.

## Dates, tally and sample

- Require three distinct Gregorian dates. Trim whitespace and validate the exact `YYYY-MM-DD` shape, year `0001` through `9999` and actual month and day, including leap years. If a later field repeats an earlier valid date, show `dateDuplicate` on the later field. Accept past dates so a saved example or retrospective can be entered at any time.
- Sort validated ISO strings directly. Keep dates as calendar values, compute weekdays in UTC and render from the active language dictionary so a time zone change cannot shift a date. Sort before comparing setup changes, so rearranging equivalent inputs preserves responses.
- A response is unanswered, an explicit empty response, or a set of one to three date IDs. Show the result after all participants have answered. A date's count is the number of responses that include it. The bar width is `count / groupSize`. Every date tied for the highest positive count gets `topBadge`. If all counts are zero, show `noDate` and leave the rows unbadged.
- **Sample** · Four people and dates `2026-12-05`, `2026-12-12`, `2026-12-19`. Using chronological date positions, the responses are `[1, 2]`, `[2, 3]`, `[1, 2]`, `[3]`. The result is `2/4`, `3/4`, `2/4`, with December 12 as the sole leader.

## Visual design

- Use a warm paper background (`#F8F3E8`), ink (`#23312D`), deep pine (`#235746`) for primary actions and leading bars, and rust (`#9D3A2C`) for errors. Use system fonts, tabular numerals for counts and decorative CSS calendar tabs.
- Fill the iframe with a `100dvh` layout with a `100vh` fallback. Center a column capped at 420 CSS pixels on wide screens. Use compact spacing at 320 × 480 so the setup controls, all three date choices and all three result rows fit their respective screens. Keep the document from scrolling. Let the manual-copy text box scroll internally when necessary.
- Pair color with check marks, labels and numeric counts. Use a short fill transition when the result appears, with instant rendering under `prefers-reduced-motion`.
- Use inline HTML, CSS and JavaScript. Render the static finished result for `#demo`, using the same sample data and tally function as `example`. Generate the thumbnail through `npm run qa -- --thumbs`.

## Sound

Silent throughout. The complete interaction works with the visual and accessible text states.

## Copy and share

- Build plain text with the title, the sample label when applicable, the result headline, and one line per date using `shareRow`. Use line breaks between entries. Include only dates, the total group size and aggregate counts.
- Attempt `navigator.clipboard.writeText` from the `copy` gesture. On success show and announce `copied`. If the API is missing or rejects the write, open the manual-copy panel, focus the text box and select its contents. The user can copy with the keyboard or the operating system's touch menu.

## Strings

Keep metadata and all app-authored copy in Korean and English. The following table covers the UI, accessibility labels and copied text. Use the supported `?lang=ko` or `?lang=en` override. Otherwise choose Korean for a `ko` browser locale and English for other locales. Set `<html lang>` and the document title to match.

| Key | ko | en |
|---|---|---|
| `appTitle` | 송년회 날짜 맞추기 | Find a Year-End Date |
| `startIntro` | 후보 날짜 세 개 중 가장 많이 모일 수 있는 날을 찾아요. | See which of three dates works for the most people. |
| `start` | 날짜 정하기 | Set up dates |
| `example` | 예시 보기 | View example |
| `setupTitle` | 모임 날짜 후보 | Candidate dates |
| `setupHint` | 날짜 세 개와 응답할 인원수를 정해 주세요. | Enter three dates and the number of people who will answer. |
| `dateField` | 후보 날짜 {n} | Candidate date {n} |
| `datePlaceholder` | YYYY-MM-DD | YYYY-MM-DD |
| `dateInvalid` | 실제 날짜를 YYYY-MM-DD 형식으로 입력해 주세요. | Enter a valid date in YYYY-MM-DD format. |
| `dateDuplicate` | 앞에서 입력한 날짜와 달라야 해요. | Choose a date you haven't entered above. |
| `groupSize` | 응답 인원 {n}명 | Group size: {n} |
| `fewerPeople` | 인원 한 명 줄이기 | Remove one person |
| `morePeople` | 인원 한 명 늘리기 | Add one person |
| `setupResetHint` | 이 설정으로 계속하면 응답을 처음부터 다시 받아요. | Continuing with these changes clears the previous responses. |
| `back` | 뒤로 | Back |
| `continue` | 응답 받기 | Enter availability |
| `personProgress` | {n}번째 응답 · 전체 {total}명 | Person {n} of {total} |
| `voteHint` | 참석할 수 있는 날을 모두 골라 주세요. | Select every date that works for you. |
| `available` | 참석 가능 | Available |
| `unmarked` | 선택 안 함 | Unselected |
| `noneAvailable` | 참석 가능한 날 없음 | None of these dates work |
| `responseRequired` | 날짜를 고르거나 ‘참석 가능한 날 없음’을 선택해 주세요. | Select a date or choose “None of these dates work.” |
| `next` | 다음 사람 | Next person |
| `showResult` | 결과 보기 | See results |
| `resultTitle` | 날짜별 참석 가능 인원 | Availability by date |
| `sampleLabel` | 예시 결과 | Sample results |
| `winner` | {date}에 가장 많이 모일 수 있어요. | {date} works for the most people. |
| `tie` | 공동 1위 날짜가 {n}개예요. | {n} dates tie for the most availability. |
| `noDate` | 참석 가능한 날짜가 없어요. | None of these dates works for anyone. |
| `topBadge` | 최다 참석 | Most available |
| `count` | {total}명 중 {n}명 | {n} of {total} available |
| `editVotes` | 응답 수정 | Edit responses |
| `editSetup` | 날짜·인원 수정 | Edit dates and group size |
| `copy` | 결과 복사 | Copy results |
| `copied` | 결과를 복사했어요. | Results copied. |
| `manualCopy` | 자동 복사가 되지 않았어요. 선택된 텍스트를 복사해 주세요. | Automatic copy failed. Copy the selected text. |
| `copyText` | 복사할 결과 | Results to copy |
| `closeCopy` | 결과로 돌아가기 | Back to results |
| `shareRow` | {date} · {count} | {date} · {count} |
| `displayDate` | {y}년 {m}월 {d}일 ({weekday}) | {weekday}, {month} {d}, {y} |
| `weekdays` | 일, 월, 화, 수, 목, 금, 토 | Sun, Mon, Tue, Wed, Thu, Fri, Sat |
| `months` | 1월, 2월, 3월, 4월, 5월, 6월, 7월, 8월, 9월, 10월, 11월, 12월 | Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec |

## localStorage

No keys. Dates, the group size and responses live in memory for the current page. Reloading starts fresh, except that `#demo` opens the fixed sample.

## Edge cases

- **Invalid or repeated date** · Keep all entered values, show inline errors and focus the first invalid input. Cover February 29 in leap and non-leap years and month-end overflow such as April 31.
- **Setup edits** · Apply only valid setup changes. Changing a date or group size clears all answers on continuation. Reordering the same dates or backing out preserves answers.
- **Empty versus unanswered** · Require an explicit empty response to advance without a date. If all participants choose it, the result lists three zero counts and remains copyable.
- **Ties** · Badge all co-leaders, including a three-way tie. Keep the display and copied result chronological.
- **Repeated input** · Replace the voting screen on advance and ignore a repeat activation of the advance action within 250 ms. A second tap must never count as the next person's response.
- **Iframe without clipboard access** · Keep the result and expose the selected text in place. On blur or resize, preserve all input and result state. The app has no timer to advance while hidden.
- **QA** · Check both languages, a 320 × 480 iframe, keyboard-only operation, pointer controls, blocked clipboard, a positive tie, an all-zero result and the sample's `2/4`, `3/4`, `2/4` tally. Before publishing, run `npm test`, `npm run build` and `npm run qa -- --thumbs` from `play/`.

## Must not

- No network, external libraries, fonts, assets, analytics, accounts or remote voting.
- No collection or persistence of names, contact details or individual responses beyond the open page. Copied text contains aggregate counts only.
- No automatic tie-break, calendar booking, direct message sending or navigation away from the item.
- No real brands or people, and no reproduction of an existing scheduling service's interface or artwork.
- No blocking browser dialogs, pop-ups, autoplay or page scrolling.