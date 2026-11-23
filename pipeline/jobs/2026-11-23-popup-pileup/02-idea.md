# Idea and spec: 팝업창 닫기 게임 / Pop-Up Pileup

## Concepts scored

Each criterion is scored from 1 to 5. Korean search and share scores are editorial estimates based on the supplied research and the hook of each concept. Maximum score is 20.

| Concept | Category | First 10 seconds | Originality | Korean search/share | One HTML file | Total | Verdict |
|---|---|---:|---:|---:|---:|---:|---|
| **팝업창 닫기 게임 / Pop-Up Pileup** | `games` | 5 | 4 | 4 | 5 | **18** | **Picked.** Close a ridiculous ad on the first move. Ten boards give friends a short, comparable challenge. |
| 겨울 지하철 승강장 ASMR / Winter Subway Platform ASMR | `radio` | 4 | 4 | 3 | 4 | 15 | Tap once to hear a synthesized train approach, then mix it with footsteps and station ventilation. The sound needs to evoke a station on phone speakers. |
| 오리온자리 별 잇기 / Connect the Stars of Orion | `learn` | 4 | 3 | 3 | 5 | 15 | Connect the three belt stars on the first screen, then reveal how they sit within the constellation. The small star chart fits inline SVG. |

## Meta

slug `popup-pileup`

- Category `games`, kind `game`, aspect `9/16`, date `2026-11-23`
- Tags ko `팝업창 닫기`, `순발력 게임` / en `popup game`, `reaction game`

| Field | ko | en |
|---|---|---|
| `title` | 팝업창 닫기 게임 | Pop-Up Pileup |
| `desc` | 가짜 웹페이지에 안내창과 광고창이 함께 떴어요. 30초 안에 광고 팝업만 골라 닫고 열 화면을 모두 정리해 보세요. | A fake webpage is filling up with silly ads. Close the ad on each of ten boards before your 30 seconds run out. |
| `howto` | 광고 카드 전체를 누르거나 숫자 키 1~3을 누르세요. 안내를 누르면 2초가 줄어요. 30초 안에 광고 10개를 닫으면 성공이에요. | Tap an ad card or press 1–3. Picking a notice costs two seconds. Close all ten ads within 30 seconds to clear the game. |
| `about` | 쓸모 있는 동네 소식 사이에 엉뚱한 광고를 끼워 넣은 30초짜리 순발력 게임이에요. 최고 기록은 이 브라우저에 저장돼요. | A 30-second sorting game with useful neighborhood notices and wonderfully useless ads. Your best score is saved in this browser. |

## Pitch

A fictional neighborhood bulletin board has three pop-up cards on every screen. Two carry useful notices. One sells something ridiculous, starting with bottled elevator air. Close the ad and it folds away, revealing the next three cards. The research brief’s browser-play example inspired the immediate feedback. The setting, copy, visuals and rules are original to this item.

The first board appears on the start screen, so the player can read the joke immediately and close the ad with their first action.

## Flow

| Screen | Layout and behavior |
|---|---|
| **START** | Show the title, the one-line instruction, a `30`-second timer, score `0/10` and the three live cards from round 1. Starting instructions sit above the first card. Any card selection starts the clock and applies that same selection to round 1. |
| **PLAY** | Keep the timer, score and three card positions fixed. A correct pick closes the ad and awards one point. Show the next board after 180 ms. A wrong pick subtracts two seconds, keeps the same board and shows the penalty in a reserved status line. |
| **RESULT** | Show the completion or timeout heading, score, best score and a large retry button. Show remaining time on a clear. A new record gets one text label. Retry returns to START with a fresh 30-second clock and round 1 visible. |

### Scoring and timing

- Use ten rounds. Each board contains exactly one ad and two notices. A correct pick advances exactly one round and adds one point.
- The score is the number of ads closed, from 0 to 10. Best score uses that same integer. Equal scores leave the record intact.
- Start with 30,000 ms. Subtract elapsed foreground time and 2,000 ms per wrong pick. Display the ceiling of remaining milliseconds divided by 1,000, clamped to zero. A clear uses the same displayed value for its remaining-time line.
- Use `performance.now()` for elapsed foreground time. Check the deadline before accepting an input. If the tenth correct pick arrives while time remains, commit the clear immediately. Time spent in the 180 ms transition counts between rounds.
- Lock card input for 180 ms after a correct pick and 350 ms after a wrong pick. Ignore held-key repeats. On a wrong pick, show the penalty until the next accepted pick or the result.

## Controls

- **Touch and mouse:** Each whole card is a button. Use the native button `click` activation path for taps, mouse clicks and keyboard activation. Apply `touch-action: none` to the board and make every card and the retry button at least 44 px tall.
- **Keyboard:** Number keys `1`, `2` and `3` select the visible card in that position on START and PLAY. `Tab` moves between cards, and `Enter` or `Space` activates the focused button. On RESULT, focus the retry button. After retry, focus the first card.
- **Focus and feedback:** Keep the three button elements mounted as their content changes, so focus stays in the current position. Use a polite live region for round progress and wrong picks. Keep the timer out of the live region. On RESULT, announce the heading, score and best score as one message.
- Prevent default browser behavior for handled number shortcuts. Preserve normal Tab navigation and native button activation. Use one activation handler per action.

## Boards

Each row is a complete board, in display order. Each card shows its position, its localized type (`ad` or `notice`) and the headline below. The type label supplies the information even in grayscale.

| Round | Card 1, ko / en | Card 2, ko / en | Card 3, ko / en | Ad position |
|---:|---|---|---|---:|
| 1 | 도서 반납함은 입구 옆 / Book drop by the entrance | 엘리베이터 공기 한 병 / Bottled elevator air | 분실 장갑은 안내실에 / Lost glove at reception | 2 |
| 2 | 양말 한 짝 전용 옷걸이 / Hanger for one sock | 자전거 거치대 청소 중 / Bike rack cleaning today | 게시판은 누구나 이용 가능 / Bulletin board open to all | 1 |
| 3 | 우산꽂이는 현관 안쪽 / Umbrella stand inside the door | 도서 반납함은 입구 옆 / Book drop by the entrance | 물웅덩이 테두리 스티커 / Puddle border stickers | 3 |
| 4 | 분실 장갑은 안내실에 / Lost glove at reception | 박수 소리 보관함 / Applause storage box | 자전거 거치대 청소 중 / Bike rack cleaning today | 2 |
| 5 | 게시판은 누구나 이용 가능 / Bulletin board open to all | 우산꽂이는 현관 안쪽 / Umbrella stand inside the door | 연필 그림자 받침대 / Pencil shadow stand | 3 |
| 6 | 먼지 전용 액자 / Picture frame for dust | 도서 반납함은 입구 옆 / Book drop by the entrance | 자전거 거치대 청소 중 / Bike rack cleaning today | 1 |
| 7 | 우산꽂이는 현관 안쪽 / Umbrella stand inside the door | 쉼표 모양 베개 / Comma-shaped pillow | 분실 장갑은 안내실에 / Lost glove at reception | 2 |
| 8 | 자전거 거치대 청소 중 / Bike rack cleaning today | 게시판은 누구나 이용 가능 / Bulletin board open to all | 빈 상자 전용 덮개 / Lid for empty boxes | 3 |
| 9 | 책갈피 전용 책 / Book for your bookmarks | 분실 장갑은 안내실에 / Lost glove at reception | 우산꽂이는 현관 안쪽 / Umbrella stand inside the door | 1 |
| 10 | 도서 반납함은 입구 옆 / Book drop by the entrance | 뒷걸음질용 슬리퍼 / Slippers for walking backwards | 게시판은 누구나 이용 가능 / Bulletin board open to all | 2 |

## Visual design

- Draw a cork bulletin board with CSS and inline SVG. Use a navy frame `#152B32`, cream cards `#FFF6E4`, dark ink `#202827`, rust ad labels `#A23525` and teal notice labels `#176358`. Use system UI fonts and tabular timer digits.
- Stack all three cards vertically. Place the position and type label on the first line and the headline below. Keep the content column centered at up to 420 px. At 320 × 480, use 12 px outer padding and allow headlines to wrap. The root fills the iframe with no page scroll. Recompute spacing on resize and keep all controls visible.
- On a correct pick, fold the ad card inward within its slot. On a wrong pick, outline the chosen notice and show the written time penalty. With `prefers-reduced-motion`, replace the fold with a static highlight and keep the same input timing. The game is silent.

## Strings

Keep all UI text in `{ ko, en }` dictionaries, including the metadata, board copy and accessible names. Use `?lang=ko` or `?lang=en` when supported. Otherwise use Korean for browser languages beginning with `ko` and English for all others. Set `<html lang>` and the document title to match.

| Key | ko | en |
|---|---|---|
| `appTitle` | 팝업창 닫기 게임 | Pop-Up Pileup |
| `startHint` | 광고 팝업만 눌러 닫으세요. | Tap the ad to close it. |
| `round` | {round}/10 화면 | Board {round}/10 |
| `timer` | {seconds}초 | {seconds}s |
| `timerLabel` | 남은 시간 {seconds}초 | {seconds} seconds left |
| `score` | 광고 {score}/10개 닫음 | Ads closed {score}/10 |
| `ad` | 광고 | Ad |
| `notice` | 안내 | Notice |
| `cardLabel` | {position}번, {type}. {headline} | Card {position}, {type}. {headline} |
| `wrong` | 안내창이에요. 2초 차감 | That's a notice. −2 seconds |
| `clear` | 광고를 모두 닫았어요! | You closed every ad! |
| `timeout` | 시간이 다 됐어요 | Time’s up |
| `best` | 최고 기록 {best}/10 | Best {best}/10 |
| `newBest` | 최고 기록을 깼어요! | New best! |
| `timeLeft` | {seconds}초 남기고 성공 | Cleared with {seconds}s left |
| `retry` | 다시 하기 | Play again |
| `resultAnnouncement` | {heading} {scoreLine}. {bestLine}. | {heading} {scoreLine}. {bestLine}. |

Use `round` in the live region when a new board appears. Reuse `wrong` and `resultAnnouncement` for their corresponding events. Position badges display the numbers `1` through `3`. Decorative pins and folds are hidden from assistive technology.

## localStorage

- `popup-pileup:best` stores a decimal string from `"0"` to `"10"`. Default to `0`. Reject missing or malformed data, including decimal, signed and out-of-range values.
- Wrap reads and writes in `try/catch`. Keep the session best in memory. When entering RESULT, read the stored best again and compare it with the in-memory best before deciding whether to show `newBest` or write a new value. The current board, timer and input state live in memory.

## Edge cases

- Freeze the clock and any pending transition when `document.hidden` becomes true. On visibility return, resume with the same remaining time and transition progress. Drive animated feedback with `requestAnimationFrame` and cap animation deltas at 50 ms. Use separately measured elapsed foreground time for the clock.
- If a wrong pick exhausts the clock, show RESULT immediately. If time expires during a board transition, preserve the point already earned and cancel the pending board change.
- Accept the first activation during each input window. Ignore pointer or keyboard activations queued before the current board appeared, and invalidate pending callbacks when entering RESULT or retrying.
- Resizing during play recomputes layout and preserves the score, clock, focus and board.
- If storage is blocked, START, PLAY and RESULT all work, including the session best.
- `#demo` opens RESULT with `10/10`, best `10/10` and `8` seconds left. Entering demo skips storage reads and writes. Retry exits the demo state and starts a regular session.
- Verify Korean and English at 320 × 480, then run `npm test`, `npm run build` and `npm run qa -- --thumbs`. Check the generated thumbnail for readable score and title.

## Must not

- Keep HTML, CSS, JavaScript and artwork in one self-contained `index.html`. No network requests, external dependencies, analytics, raster game art or video.
- Use original fictional copy and styling. No real brands, real people, copied game assets, browser chrome or imitation of a real site, system warning or ad.
- Keep all cards inside the game surface. No actual pop-ups, links out, dialogs, downloads or navigation.
- No forced audio, flashing effects, personal-data inputs or persisted run history.