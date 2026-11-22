# Idea and spec: 선물 포장 챌린지 / Gift Wrap Rush

## Concepts scored

Scores run from 1 to 5 in this order: value in the first 10 seconds, originality, Korean search/share demand, and buildability in one HTML file. Demand scores are estimates based on the supplied seasonal research.

| Concept | Category | Score | Rationale |
|---|---|---|---|
| **선물 포장 챌린지 / Gift Wrap Rush** | **arcade** | **5 / 4 / 4 / 5 = 18** | **Picked.** Match a ribbon and seal to the first gift order in two taps. A 30-second score gives friends a reason to try the same round. |
| 크리스마스 선물 교환 조건표 / Secret Santa Rules Card | tools | 4 / 3 / 4 / 5 = 16 | Set a price cap, gift theme and exchange date, then copy the agreed rules into the group chat. Targets `크리스마스 선물 교환` and `마니또 선물 규칙`. |
| 성에 낀 창문 / Frosted Window | chill | 5 / 4 / 3 / 4 = 16 | Wipe frost off a window to uncover a miniature winter street. The first swipe is the payoff, and the revealed scene works as a screenshot. |

## Meta

slug `gift-wrap-rush`

- Category `arcade`, kind `game`, aspect `9/16`, date `2026-11-22`
- Tags KO `선물 포장 게임`, `크리스마스 게임`, `30초 게임`
- Tags EN `gift wrapping`, `Christmas game`, `30-second arcade`
- Title KO `선물 포장 챌린지`
- Title EN `Gift Wrap Rush`
- Desc KO `주문표에 맞는 리본과 스티커를 골라 선물을 포장해요. 30초 동안 몇 상자를 완성하는지 친구와 겨뤄 보세요.`
- Desc EN `Match each order's ribbon and seal, then pack as many gifts as you can in 30 seconds. Challenge a friend to beat your score.`
- Howto KO `주문표를 보고 리본과 스티커를 차례로 고르세요. 화면을 누르거나 숫자 키 1~3을 쓰세요. 완성한 선물 하나가 1점이에요.`
- Howto EN `Match the ribbon and then the seal by tapping or pressing 1–3. Each completed gift earns one point.`
- About KO `겨울 선물 포장대에서 벌어지는 30초 게임이에요. 최고 기록은 이 브라우저에 저장돼요.`
- About EN `A 30-second game set at a winter gift-wrapping counter. Your best score stays in this browser.`

## Pitch

A gift box sits on a wrapping counter beside an order ticket. Tap the matching ribbon and the box ties itself. Tap the matching seal and the finished parcel slides into the outgoing tray as the next ticket appears. Every round opens with the same order, so players can wrap their first box within seconds and compare scores on the same sequence.

## Flow

1. **Start.** Show the title, the one-line instructions, and a preview of the first order beside an unwrapped box. Show the 30-second duration, the saved best, and one prominent Start button. The preview is decorative and the clock is idle.
2. **Play.** Start at 30 seconds with the first ticket and the ribbon choices visible. A correct ribbon appears on the box and switches the choices to seals. A correct seal completes the box, adds one point, and loads the next ticket immediately. A wrong choice displays a short cue and leaves the ticket and current step in place.
3. **Pause.** The pause button and Escape freeze the time, score, and current box. Switching away also pauses the round. On return, show the paused screen with a single Resume button. Resume restores the same ticket and step.
4. **Result.** At zero, show the number of parcels wrapped, the best score, and the last completed parcel. Show a “New best” label only when this round beats the best recorded before it started. The Retry button starts a fresh 30-second round from the first ticket.

## Controls

- **Touch and mouse.** Activate native buttons with a tap or click. Use pointer events for pressed-state feedback and a single `click` path for activation, including keyboard-generated clicks. Targets are at least 44 × 44 px.
- **Keyboard.** On the play screen, keys `1`–`3` select the corresponding option from left to right. Escape pauses. Tab and Shift+Tab move through controls, and Enter or Space activates the focused button. Start, Resume and Retry receive focus when their screens appear.
- **Focus.** Keep the three option buttons mounted during play. When the step changes, update their labels in place and keep focus on the same button. Resume returns focus to the last focused play control. Button focus and pressed states are visible.
- Handle number and Escape shortcuts only during play, prevent their default behavior when handled, and ignore repeated `keydown` events. Apply `touch-action: none` to the play area.

## Orders and scoring

The ticket shows the requested ribbon and seal together throughout both steps. Use the following fixed order, looping from ticket 9 to ticket 1. Each ribbon and seal pairing appears once per cycle.

| Ticket | Ribbon | Seal |
|---|---|---|
| 1 | Stripe | Star |
| 2 | Dot | Moon |
| 3 | Check | Snowflake |
| 4 | Stripe | Moon |
| 5 | Check | Star |
| 6 | Dot | Snowflake |
| 7 | Check | Moon |
| 8 | Dot | Star |
| 9 | Stripe | Snowflake |

- Ribbon buttons are always Stripe, Dot, Check. Seal buttons are always Star, Moon, Snowflake. Use the same swatches and icons on tickets, buttons, and parcels.
- A correct ribbon advances to the seal step. A correct seal adds exactly one point and advances the ticket. An incomplete parcel earns zero points.
- A wrong choice leaves time running and keeps the chosen ribbon, if any. Show the wrong-choice message for up to 600 ms and clear it on the next accepted action.
- After a correct choice, ignore further choice activations for 180 ms to absorb double taps across step and ticket transitions. The clock keeps running.
- Track 30,000 ms of active play from monotonic timestamps. Display remaining seconds rounded up. Check the deadline before processing a choice. Use `requestAnimationFrame` for display and motion, with visual delta capped at 50 ms. Visual delta does not drive the clock.

## Screen layout and visual design

- **Shared frame.** Fill the iframe with a deep evergreen background `#18362F`, a warm counter `#E6C29A`, cream tickets `#FFF4DE`, and dark ink `#242823`. Use system-ui and tabular numerals for time and score. Render box, ribbons and seals with CSS and inline SVG.
- **Start.** Place the title and instructions above the preview, with the best score and a full-width Start button below it.
- **Play.** Put time, score and Pause in a compact top bar. Stack the ticket and box above the current-step label and a row of three choices. Reserve one line for transient feedback so the targets stay put. Use contrasting stripes, dots and checks as well as distinct colors. Give the seal shapes distinct silhouettes.
- **Pause.** Replace the play controls with a centered pause panel showing frozen time, score and Resume. Keep the parcel visible behind it. Remove the play controls from keyboard navigation until play resumes.
- **Result.** Center the last completed box above the large score and best score. Use the plain box illustration when the score is zero. Place the new-best label under the score when earned, and anchor Retry at the bottom. The title, parcel and scores fit together in a screenshot.
- **Motion.** Tie the ribbon with a brief scale-in. On completion, animate a decorative copy of the packed box into the tray while the next ticket is already playable. During reduced motion, update the ribbon, box and score instantly.
- **Sizing.** At 320 × 480, use 12 px side padding, compact the illustration first, and preserve readable labels and 44 px controls. Use `100dvh` with `100vh` fallback, no page scrolling, and a centered play column capped at 480 px on wide screens. Reflow on resize without resetting the round.

## Sound

Silent in every state.

## Strings

Use one `{ ko, en }` dictionary, including the document title, metadata copy used within the item, and accessible labels. Read `?lang=ko` or `?lang=en`. If absent or unsupported, use Korean for a `ko` browser locale and English otherwise. Set `<html lang>` accordingly. Icons that repeat adjacent text are decorative.

| Key | KO | EN |
|---|---|---|
| `title` | 선물 포장 챌린지 | Gift Wrap Rush |
| `startHelp` | 주문표에 맞는 리본과 스티커를 골라 30초 동안 선물을 포장하세요. | Match the ribbon and seal to wrap as many gifts as you can in 30 seconds. |
| `start` | 시작 | Start |
| `time` | 남은 시간 {seconds}초 | {seconds}s left |
| `score` | 포장 {score}개 | Wrapped: {score} |
| `best` | 최고 기록 {best}개 | Best: {best} |
| `order` | 주문표 | Order ticket |
| `orderRibbon` | 리본: {ribbon} | Ribbon: {ribbon} |
| `orderSeal` | 스티커: {seal} | Seal: {seal} |
| `pickRibbon` | 리본 고르기 | Choose a ribbon |
| `pickSeal` | 스티커 고르기 | Choose a seal |
| `stripe` | 줄무늬 | Stripe |
| `dot` | 물방울무늬 | Dot |
| `check` | 체크무늬 | Check |
| `star` | 별 | Star |
| `moon` | 달 | Moon |
| `snowflake` | 눈송이 | Snowflake |
| `choice` | {key}. {name} | {key}. {name} |
| `wrongRibbon` | 주문표의 리본을 다시 확인해 보세요. | Check the ribbon on the ticket. |
| `wrongSeal` | 주문표의 스티커를 다시 확인해 보세요. | Check the seal on the ticket. |
| `ribbonReady` | 리본을 달았어요. 스티커를 골라 주세요. | Ribbon tied. Choose a seal. |
| `wrapped` | 포장 완료! 다음 주문은 {ribbon} 리본과 {seal} 스티커예요. | Gift wrapped! The next order is a {ribbon} ribbon and a {seal} seal. |
| `pause` | 일시정지 | Pause |
| `paused` | 잠시 쉬는 중 | Round paused |
| `resume` | 계속하기 | Resume |
| `result` | 포장 마감! | Time’s up! |
| `resultScore` | 선물 {score}개를 포장했어요. | Gifts wrapped: {score} |
| `newBest` | 최고 기록 갱신! | New best! |
| `retry` | 다시 도전 | Play again |

Use a polite live region for `ribbonReady`, `wrapped`, and wrong-choice feedback. The countdown stays readable without announcing every tick. Move focus to the result heading when time expires, with Retry as the next tab stop.

## localStorage

- `gift-wrap-rush:best` stores the best score as a decimal string. Default to `0` if absent or invalid. Accept only nonnegative safe integers.
- Wrap reads and writes in `try/catch`. Keep the session best in memory if storage is blocked. Before saving a round result, read the stored best again and keep the highest available value.
- The current round lives in memory. Retry resets the timer, score, ticket, step, input lock, feedback, and parcel preview.

## Edge cases

- A choice at or after the deadline ends the round without awarding a point. Finalize once and discard queued play input.
- If the page becomes hidden after the deadline, finalize the round. Otherwise freeze the remaining time and require Resume on return. Pause decorative animation while hidden.
- A wrong seal preserves the attached ribbon. A resize preserves the current ticket, timer, score, step and focus.
- A first round with zero parcels shows a best of zero and no new-best label. A tied score also leaves the label hidden.
- For thumbnail QA, `#demo` shows a localized result with 12 wrapped gifts and a finished parcel. It neither starts a timer nor reads or writes the player’s record.
- Before publishing, run `npm test`, `npm run build` and `npm run qa -- --thumbs`. Check two-tap completion, wrong-choice recovery, deadline behavior, pause and resume, retry, blocked storage, both locales, keyboard play, and the generated thumbnail at the compact viewport.

## Must not

- No network requests, analytics, remote assets, external fonts, libraries, or asset URLs. Keep the game HTML, CSS and JavaScript in one `index.html` and generate `thumb.png` through QA.
- No raster images, video, copied game art or layouts, trademarks, or real people. Draw the wrapping counter and parcel art in CSS or SVG.
- No permission prompts, browser dialogs, pop-ups, navigation, or page scrolling.
- No mocking players or groups. Keep incorrect-choice feedback about matching the order.