# Idea and spec: 연말 후회 세탁기 / Year-End Regret Wash

## Concepts scored

Each criterion is scored from 1 to 5. Korean search and share scores are planning estimates based on the supplied research and backlog.

| Concept | Category | First 10 seconds | Originality | Korean search/share demand | One-HTML buildability | Total | Verdict |
|---|---|---:|---:|---:|---:|---:|---|
| **연말 후회 세탁기 / Year-End Regret Wash** | `silly` | 5 | 4 | 4 | 5 | **18/20** | **Picked.** Tap a relatable regret and watch a tiny washing machine turn it into a line worth sharing. |
| 장작과 빗소리 / Rain & Embers | `chill` | 4 | 3 | 4 | 4 | 15/20 | Mix roof rain and fireplace crackle with two sliders. The backlog’s focus-radio idea gives it a starting point, and the sound needs tuning on phone speakers. |
| N빵 계산기 / Split the Bill | `tools` | 4 | 2 | 5 | 5 | 16/20 | Enter the bill and who ordered drinks to get exact per-person amounts and a message to paste into the group chat. Direct search intent, familiar format. |

The chosen concept uses the research’s immediate-response web toy and year-end reflection hooks. Its shareable output is a single joke line.

## Meta

slug `year-end-regret-wash`

- **Category** `silly`
- **Kind** `tool`
- **Aspect** `9/16`
- **Date** `2026-11-22`
- **Tags**  
  **ko** `연말`, `후회`, `마음 정리`  
  **en** `year-end`, `regrets`, `humor`

| Field | ko | en |
|---|---|---|
| title | 연말 후회 세탁기 | Year-End Regret Wash |
| desc | 미뤄 둔 일이나 괜히 곱씹은 한마디를 세탁기에 넣어 보세요. 한 바퀴 돌리고 나면 가볍게 웃을 수 있는 한 줄이 나와요. | Toss a small regret into a tiny washing machine. One quick spin gives you a lighthearted line to keep or share. |
| howto | 예시를 고르거나 한 줄을 직접 쓰고 ‘한 번 돌리기’를 누르세요. 세탁이 끝나면 나온 문장을 복사할 수 있어요. | Pick an example or type a line, then press “Start the wash.” Copy the line that comes out when the wash is done. |
| about | 사소한 후회를 소재로 만든 연말 장난감이에요. 직접 쓴 문장은 저장하지 않고, 복사할 때는 세탁기가 내놓은 한 줄만 담아요. | A year-end toy for small regrets. Your typed line stays in the current tab, and copying includes only the line the washer gives you. |

## Pitch

A mint-green washing machine is ready as soon as the iframe loads. The default load is a to-do list that outlived the day. One press drops its paper slip into the drum. The drum makes one turn, then pushes out a clean tag reading “The list got longer. The day didn’t.”

Users can choose another example or type a small regret of their own. Each example has a fixed punch line. Custom input gets a fixed general reply, so users can copy the result without sharing their original words.

## Flow

| Screen | What appears | What advances it |
|---|---|---|
| **START** | Title, one-line instruction, washer with the current paper slip, three example choices, a direct-entry choice, and **Start the wash**. The first example is selected on load. Direct entry replaces the drum preview with a labeled single-line field until a wash begins. | Start submits the selected example or a valid typed line. A blank submission stays here, focuses the field, and shows inline guidance. |
| **WASH** | The slip briefly appears inside the drum. The door closes, the slip disappears behind suds, and the drum makes one turn. A visible status sits below the washer. | After 1.05 seconds of visible time, go to RESULT. With reduced motion, skip directly to RESULT. |
| **RESULT** | The drum settles and a clean paper tag displays the reply as selectable text. Below it sit **Copy line**, **Wash another**, and an inline copy status area. The original slip is gone. | Copy stays here. Wash another returns to START with the first example selected and direct entry cleared. |

## Controls

- Use native buttons for actions and a native radio group for the four input choices. Make the whole label clickable and give every control a target of at least 44 × 44 CSS pixels. The illustration is decorative and accepts no input.
- Tab and Shift+Tab move between controls. Arrow keys move within the radio group. Space selects the focused choice, and Enter or Space activates a focused button. Enter in the custom field submits once Korean IME composition has finished. Use visible focus outlines throughout.
- Keep focus on the radio when direct entry is selected. Put the custom field immediately after the group in tab order. On WASH and RESULT, focus their headings programmatically. After **Wash another**, focus **Start the wash**.
- Announce validation and copy feedback with a polite live region. Keep the result line immediately after the focused result heading in reading order.

## Wash loads and replies

| ID | Slip ko | Slip en | Reply ko | Reply en |
|---|---|---|---|---|
| `todo` | 할 일만 잔뜩 적었어요 | I made a huge to-do list | 목록은 길어졌지만 하루는 그대로였어요. | The list got longer. The day didn’t. |
| `talk` | 그 말을 괜히 했나 봐요 | I wish I hadn’t said that | 그 대화는 끝났어요. 머릿속 재방송도 이제 꺼요. | That conversation is over. You can turn off the rerun. |
| `hobby` | 취미용품만 사 뒀어요 | I bought the gear and stopped there | 장비는 준비됐어요. 첫날은 아무 날이나 돼요. | The gear is ready. Day one can be any day. |
| `custom` | `{input}` | `{input}` | 자국은 조금 남아도 괜찮아요. 오늘 빨래는 여기까지. | A little mark can stay. That’s enough laundry for today. |

- Keep the custom field at a native `maxlength` of 40. Trim on submit and treat whitespace-only text as empty. Render accepted input as plain text. In the drum, clamp a long slip to two visual lines with an ellipsis.
- Keep a typed draft while the user switches between choices on START. Clear it on successful submission. When the slip disappears behind the suds, remove the submitted text from the DOM and discard it from state. The chosen load ID is enough to render the result.

## Visual design

- Draw the machine with CSS and original inline SVG. Use a warm cream background `#FBF3E5`, mint enamel `#A9DCC7`, dark ink `#203832`, a deep green primary button `#245744` with white text, and a coral accent `#EC835F` on the door latch. Use system fonts.
- On START, the mint door and visible paper slip carry the illustration. During WASH, use the first 150 ms to close the door, the next 700 ms for one drum rotation with suds, and the final 200 ms to settle. RESULT shows the cream tag through the open door with a small static checkmark.
- Fill the iframe with a `100dvh` layout and a `100vh` fallback. Use a centered column capped at 420 CSS pixels on wide screens. At 320 × 480, use 12 px side padding, a compact washer, a two-by-two choice grid, and wrapped labels. Reserve space for the inline validation message in direct-entry mode and shrink the illustration first. Keep the page free of scrolling.
- Drive the wash with `requestAnimationFrame`, capping elapsed frame time at 50 ms. Pause while `document.hidden` and reset the frame timestamp on return. Resizing preserves the current screen and elapsed wash time. If reduced motion turns on mid-wash, settle immediately when the document is visible.

## Sound and copy

- The washer is silent. The door, drum, suds, and result tag provide the feedback.
- **Copy line** attempts to write the exact localized reply to the clipboard on user activation. Show **Line copied** only after the write succeeds. If the clipboard is unavailable or denied in the iframe, keep the line selectable and show the manual-copy message.
- While a copy is pending, ignore repeat copy activations. If the user has since returned to START or completed another wash, ignore the earlier clipboard request’s eventual status.

## Strings

Use the localized metadata above, the load and reply table, and this dictionary for all authored UI text, including the document title and radio group label. Accept `?lang=ko` and `?lang=en`. Otherwise use Korean when `navigator.language` starts with `ko` and English otherwise. Set `<html lang>` accordingly.

| Key | ko | en |
|---|---|---|
| `appTitle` | 연말 후회 세탁기 | Year-End Regret Wash |
| `startHint` | 후회 하나를 골라 세탁기에 넣어 보세요. | Pick one small regret to put in the wash. |
| `loadLabel` | 세탁할 후회 | Regret to wash |
| `customChoice` | 직접 쓰기 | Write my own |
| `customLabel` | 내 후회 한 줄 | My regret in one line |
| `customPlaceholder` | 사소한 후회 한 줄 | One small regret |
| `emptyInput` | 한 줄을 쓰거나 예시를 골라 주세요. | Write a line or pick an example. |
| `startWash` | 한 번 돌리기 | Start the wash |
| `washing` | 세탁 중이에요… | Washing… |
| `resultTitle` | 세탁 끝! | Wash complete! |
| `copy` | 한 줄 복사 | Copy line |
| `again` | 하나 더 돌리기 | Wash another |
| `copied` | 한 줄을 복사했어요. | Line copied. |
| `copyFailed` | 자동으로 복사하지 못했어요. 나온 문장을 직접 선택해 복사해 주세요. | Copy was unavailable. Select the line to copy it manually. |

## localStorage

No keys. The toy works entirely from in-memory state. Reloading returns to START with the first example selected.

## Edge cases

- Lock the START-to-WASH transition as soon as a valid submission is accepted. Ignore double taps, repeated Enter, and IME confirmation keystrokes during composition. Only one wash can run per submission.
- Use plain-text insertion for custom slips, including text containing angle brackets, emoji, or right-to-left characters. Give the slip automatic text direction and keep its width inside the drum.
- If the iframe is hidden during a wash, resume from the same visual phase when it becomes visible. The transition to RESULT occurs once.
- For QA, `#demo` loads the finished `todo` result in the requested language. **Wash another** works normally from that state. Verify both locales at 320 × 480, keyboard-only operation, Korean IME entry, reduced motion, and denied clipboard access. Generate the thumbnail with `npm run qa -- --thumbs`.

## Must not

- No network calls, external assets, analytics, or remote fonts. Ship the complete interaction in `items/year-end-regret-wash/index.html`, with the required sibling `meta.json` and QA-generated `thumb.png`.
- No custom text in URLs, storage, logs, or clipboard payloads. Clear it from the wash view once the slip is covered.
- No real brands, recognizable product designs, or copied art. Keep the replies kind and free of diagnoses, predictions, and promises about how users will feel.
- No audio, forced scrolling, browser dialogs, pop-ups, or navigation away from the iframe.