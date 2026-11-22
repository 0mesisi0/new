# Idea and spec: 정전기 양말 떼기 / Static Sock Sweep

## Concepts scored

Each criterion is scored from 1 to 5, for a maximum of 20. Korean search and share scores are estimates based on the supplied research and backlog. The research has limited recent evidence, and there are no item votes yet.

| Concept | Category | First 10 seconds | Originality | Korean search/share demand | One-HTML buildability | Total | Verdict |
|---|---|---:|---:|---:|---:|---:|---|
| **정전기 양말 떼기 / Static Sock Sweep** — pluck socks from a fleece blanket as the static fades | `arcade` | 5 | 4 | 3 | 5 | **17** | **Pick.** The first tap peels off a practice sock. A 12-sock challenge gives friends a score to compare. |
| 겨울 이불 수납 부피 계산기 / Winter Bedding Volume Calculator — compare measured folded bedding with the inside dimensions of a storage box | `tools` | 3 | 3 | 4 | 5 | 15 | Clear search terms around `이불 수납`, with three measurements required before the first result. |
| 새해 첫 산책 뽑기 / First Walk of the Year — draw a small observation prompt for a New Year’s walk | `random` | 4 | 3 | 3 | 5 | 15 | A quick seasonal draw that could be shared with a walking companion. |

Static Sock Sweep takes the research’s tactile-play direction and gives it a winter laundry setting. The Korean title includes `정전기`, while the score card gives the item a reason to travel in a group chat.

## Meta

slug `static-sock-sweep`

- Category `arcade`, kind `game`, aspect `9/16`, date `2026-11-22`.
- Tags ko `정전기`, `양말`, `겨울`, `타이밍 게임`. Tags en `static electricity`, `socks`, `winter`, `timing game`.
- Title ko `정전기 양말 떼기`. Title en `Static Sock Sweep`.
- Desc ko — 겨울 이불에 양말이 딱 붙었어요. 정전기가 잦아드는 순간을 노려 12번 도전하고, 한 번에 몇 짝을 떼는지 겨뤄 보세요.
- Desc en — Socks are clinging to a winter blanket. Time your taps as the static fades and see how many you can peel off in 12 tries.
- Howto ko — 들썩이는 양말에 ‘지금!’이 뜨면 누르세요. 키보드로는 왼쪽부터 1, 2, 3을 눌러요. 기회는 양말마다 한 번이에요.
- Howto en — Tap the wiggling sock when it says “Now!” Use 1, 2 or 3 from left to right on a keyboard. You get one try per sock.
- About ko — 겨울 빨래에서 떠올린 12번짜리 타이밍 게임이에요. 최고 기록은 이 브라우저에 저장돼요.
- About en — A 12-try timing game inspired by winter laundry. Your best score is saved in this browser.

## Pitch

Three socks cling to a fleece blanket. One cuff lifts, the static crackle fades and the cue changes to `지금! / Now!`. Tap in that window and the sock curls off the blanket into a laundry basket. Tap early and it snaps back down.

The start button is drawn as a practice sock. The first tap peels it off and starts the challenge. A full run takes roughly 12 to 29 seconds, depending on how soon each attempt resolves.

## Flow

1. **START.** Show the title, one-line instructions, one oversized practice sock and the start button label. Activating the sock peels it away for 280 ms, then starts the first attempt. The practice sock earns zero points. Ignore extra input during the transition.
2. **PLAY.** Keep three sock buttons mounted in a left-to-right row. On each attempt one sock lifts its cuff and gets the phase cue. Show the attempt number and score above the blanket. A valid press resolves the attempt immediately. After 450 ms of feedback, advance to the next attempt.
3. **RESULT.** After the twelfth feedback interval, show the score out of 12, the best out of 12 and a retry button. Show the new-best label only when the finished score exceeds the previous best. Retry starts at attempt 1 with score 0 and skips the practice sock.

## Controls

- **Touch and mouse.** Tap or click the practice sock, one of the three play buttons, or retry. Activate on release with native button clicks. Cancelled gestures and releases outside the button have no effect. Keep each hit area at least 44 × 44 CSS px and set `touch-action: none` on the play area.
- **Keyboard.** Tab reaches the buttons in visual order. Enter and Space activate the focused button. During play, `1`, `2` and `3` select the corresponding sock, including numpad keys with Num Lock on. Prevent the default action for handled shortcuts and ignore auto-repeat. Keep each sock button mounted across attempts so focus survives.
- **Focus.** Focus the start button on load. On entry to play, focus the game region so the number shortcuts work immediately and the next Tab reaches the left sock. Focus retry on result. Use a visible focus ring on all buttons.
- **Feedback.** Announce each resolved attempt once in a polite live region, with its outcome and updated score. Keep phase words visible beside the active cuff. The raised cuff, a high-contrast outline and the phase word identify the active sock independently of color.

## Timing and scoring

Times are measured in visible gameplay time from the start of each attempt. The cue reads **Wait** before the success window, **Now!** during it and **Too late** after it. A success window includes its opening time and excludes its closing time.

| Attempts | Active positions in order | Success window | Timeout |
|---|---|---|---:|
| 1–4 | Center, left, right, left | 600–1,300 ms | 1,900 ms |
| 5–8 | Center, right, left, center | 700–1,250 ms | 1,900 ms |
| 9–12 | Right, center, left, right | 800–1,200 ms | 1,900 ms |

- The first activation during an attempt consumes it. An inactive sock gives **Wrong sock**. The active sock gives **Too soon**, **Peeled!** or **Too late** according to elapsed time.
- Reaching 1,900 ms without a resolved activation gives **Missed it**. If an input arrives at or after the timeout, resolve the timeout first.
- Each successful peel adds one point and one small sock to the basket. A miss adds zero. The final score is a whole number from 0 to 12.
- Freeze the attempt during its 450 ms feedback interval. Ignore all play input in that interval. Replace the selected sock for the next attempt and use the same sequence on retry.
- Use one monotonic clock for cue rendering and input classification. A `requestAnimationFrame` loop advances visible time with per-frame delta capped at 50 ms, so a stalled frame cannot skip the entire success window. Suspend the loop while the document is hidden and reset the frame timestamp on return.

## Visual design

- **Palette.** Use a dark plum background (`#241B33`), golden fleece (`#E7AF56`), warm white type (`#FFF7E8`) and navy text on the fleece (`#232239`). Draw the three socks in cream, coral and blue with distinct cuff patterns. Set feedback text on a solid, high-contrast surface.
- **Start.** Place the title and instructions above a large striped sock on folded fleece. The button label sits inside the same control. Peeling curls the cuff upward, then lifts the sock into the basket at the foot of the blanket.
- **Play.** Put attempt and score in a single HUD row, the three sock buttons across the blanket, the cue in a fixed-height space above them and the basket below. The active cuff lifts as the static fades. A thin progress bar shows elapsed time with the success window marked on the track. On a success the sock curls toward the basket. On a miss the sock settles and the feedback text explains what happened.
- **Result.** Show the basket and a large score above the best score and retry button. Show an empty basket at zero and one miniature sock per point from 1 to 12. Include the title above the score so the result reads clearly in a screenshot.
- **Layout.** Fill the iframe with `100dvh` and a `100vh` fallback. Center the blanket column on wide screens. At 320 × 480, reduce decorative space and illustration height, let copy wrap and retain 44 px targets with zero page scroll. Recompute sizing on resize. Use system fonts and inline SVG or CSS for the art.
- **Reduced motion.** Replace sliding, curling and wiggling with immediate visual state changes. Keep the phase words, outline, success-window markers and feedback timing. The practice sock switches directly to play.
- **Sound.** Silent throughout.

## Strings

Use the same strings for visible text and accessible names where applicable. Put all strings in `{ ko: {...}, en: {...} }`. Resolve `?lang=ko` or `?lang=en` first, then use Korean for a `navigator.language` beginning with `ko` and English for other locales. Set `<html lang>` and the document title accordingly.

| Key | ko | en |
|---|---|---|
| `appTitle` | 정전기 양말 떼기 | Static Sock Sweep |
| `startHint` | 들썩이는 양말에 ‘지금!’이 뜨면 눌러요. | Tap the wiggling sock when it says “Now!” |
| `start` | 양말 떼고 시작 | Peel a sock to start |
| `playRegion` | 양말이 붙은 이불 | Blanket with socks |
| `attempt` | {n} / 12번째 도전 | Try {n} of 12 |
| `score` | 점수 {score} | Score {score} |
| `sockLeft` | 왼쪽 양말, 1번 | Left sock, 1 |
| `sockCenter` | 가운데 양말, 2번 | Middle sock, 2 |
| `sockRight` | 오른쪽 양말, 3번 | Right sock, 3 |
| `activeSock` | {sock} · 이번에 뗄 양말 | {sock} · sock to peel |
| `wait` | 잠깐… | Wait… |
| `now` | 지금! | Now! |
| `late` | 너무 늦어요 | Too late |
| `peeled` | 떼었다! | Peeled! |
| `tooSoon` | 너무 빨랐어요 | Too soon |
| `tooLate` | 너무 늦었어요 | Too late |
| `wrongSock` | 다른 양말을 눌렀어요 | Wrong sock |
| `missed` | 이번 기회를 놓쳤어요 | Missed it |
| `attemptAnnouncement` | {feedback}. 점수 {score}. | {feedback}. Score {score}. |
| `result` | 양말 떼기 완료 | Sock sweep complete |
| `finalScore` | 양말 {score}/12짝 | Socks peeled: {score}/12 |
| `best` | 최고 기록 {best}/12 | Best {best}/12 |
| `newBest` | 새 최고 기록! | New best! |
| `retry` | 다시 하기 | Play again |

Mark the sock illustrations, basket, static lines and progress bar decorative. The phase text and outcome feedback provide their meaningful state.

## localStorage

- `static-sock-sweep:best:v1` stores the best completed score as a decimal string from `"0"` to `"12"`. Default to zero when the key is missing or invalid.
- Wrap every read and write in `try/catch`. On completion compare the run score with the higher of the in-memory best and the last valid stored value. Update the in-memory best even if the write fails.
- Keep the current attempt, score and input state in memory.

## Edge cases

- A double tap, held key, simultaneous press or overlapping key and click can resolve an attempt only once. Lock the attempt before changing the score or showing feedback.
- If the iframe is hidden during an attempt or feedback, preserve the remaining time. Resume the same phase when visible. A resize or rotation recalculates layout from current state without resetting the attempt or score.
- Bad or blocked storage leaves the whole game playable. Zero and tied scores show the ordinary result. Reload starts a fresh run with the saved best when available.
- `#demo` opens a finished 9/12 result with best 10/12 for thumbnail QA. Demo values stay in memory. Retry starts a normal run using the real best.
- Run `npm test`, `npm run build` and `npm run qa -- --thumbs` before publishing. Check the generated thumbnail, both languages at 320 × 480, keyboard play, blocked storage and reduced motion.

## Must not

- No external network requests, scripts, fonts, analytics, asset URLs or libraries. Keep the item’s runtime HTML, CSS, JavaScript and art in one `index.html`, beside the site metadata and generated thumbnail.
- No raster graphics, video, real brands, real people or copied game art, levels or interface.
- No page scrolling, dialogs, popups, outbound navigation, sound autoplay or automatic clipboard access.
- No penalties beyond the missed attempt, no account or leaderboard, and no real electrical advice presented through the timing rules.