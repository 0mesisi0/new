# Idea and spec: 패딩 지퍼 챌린지 / Zip It Up

## Concepts scored

Scores are 1–5 for value in the first 10 seconds, originality, Korean search/share demand, and buildability in one HTML file. Demand scores are estimates based on the research brief. The concepts use the category names from `play/ITEMS.md`.

| Concept | Category | First 10s | Originality | KR search/share | Buildability | Total |
|---|---|---:|---:|---:|---:|---:|
| **패딩 지퍼 챌린지 / Zip It Up** — pull a puffer jacket zipper and release it inside marked bands. See the teeth snap together on the first successful release. | **arcade** | **5** | **4** | **4** | **5** | **18** |
| 귤껍질 조명 / Tangerine Peel Lantern — drag peel pieces around a paper lantern and watch their silhouettes move across the wall. | chill | 4 | 4 | 2 | 5 | 15 |
| 겨울 마켓 오늘의 미션 / Winter Market Side Quest — draw one of 12 illustrated prompts, such as finding the warmest-looking window, to send to a friend. | random | 4 | 3 | 3 | 5 | 15 |

**Pick Zip It Up.** It applies the research brief’s tactile-play cue to a familiar winter gesture. A successful release visibly closes the jacket, so the first interaction delivers the payoff. The Korean title gives the game a concrete search phrase, `패딩 지퍼`, and the fixed course gives friends a score they can compare. The brief contains no keyword-volume or sharing data for this concept.

## Meta

- slug `puffer-zip`, category `arcade`, kind `game`, aspect `9/16`, date `2026-11-22`
- Tags for editorial use — ko `패딩 지퍼`, `겨울 미니게임`, `타이밍 게임` · en `puffer jacket`, `winter mini-game`, `precision`
- Title ko — 패딩 지퍼 챌린지
- Title en — Zip It Up
- Desc ko — 패딩 지퍼를 끌어올려 표시된 칸에서 손을 떼세요. 25초 안에 패딩 세 벌을 잠그고 최고 점수에 도전해 보세요.
- Desc en — Pull the zipper and release inside each marked band. Zip three puffer jackets in 25 seconds and beat your best score.
- Howto ko — 손잡이를 끌어 다음 칸 안에서 놓으세요. 키보드로는 ↑↓로 움직이고 Enter로 놓아요. 칸 가운데에 가까울수록 점수가 높아요.
- Howto en — Drag the pull and release inside the next band. Use ↑↓ to move and Enter to release on a keyboard. Land near the center for more points.
- About ko — 도전할 때마다 같은 패딩 세 벌이 나와요. 최고 점수는 이 브라우저에 저장돼요.
- About en — Every run uses the same three jackets. Your best score is saved in this browser.

## Pitch

A puffer jacket fills the screen. Its oversized zipper pull sits at the bottom of a split seam, with one bright target band just above it. Pull into the band and let go. The teeth mesh up to that point and the next band appears. Release outside it and the pull returns to the last closed point while the clock keeps running.

## Flow

1. **START** — Show the title, a jacket preview with the first target band, a one-line instruction, the keyboard hint, and a large start button. The preview is static. Starting reveals the same jacket in the same position and gives the zipper control focus.
2. **PLAY** — Show score, time left, jacket progress, and a pause button above the jacket. Show the active band and its center line. Position the instruction and the latest release feedback below the jacket. Each accepted release closes one segment. After the third release, hold the completed jacket for 240 ms, then show the next jacket. The run clock continues through the first two jacket transitions.
3. **PAUSED** — Freeze the time remaining and show a resume button in an overlay. Return any uncommitted pull to its last locked point and clear held keys. Resuming returns focus to the zipper and requires a fresh drag or keypress.
4. **RESULT** — Show the finish or timeout heading, score, best score, and count of fully zipped jackets. Show the new-best message when earned. Keep the final jacket visible with its earned closure so the score and jacket fit in one screenshot. Put focus on the large retry button. Retry starts a fresh 25-second run on jacket one.

## Controls

- **Touch and mouse** — Start a drag on the pull’s minimum 44×44 px hit area. Capture that pointer and preserve the offset between the grab point and the pull center. Vertical movement updates the pull. Release grades the pull center, including the final pointer position. Horizontal movement has no effect. A second pointer is ignored while a drag is active.
- **Keyboard** — With the zipper focused, Up raises the pull and Down lowers it. Each fresh press moves one rail unit. Holding a key for 180 ms starts continuous movement at 40 units per second. Ignore native key repeats. Enter grades the current position. Points, time, and target widths follow the same rules as pointer play.
- **Start, pause, and retry** — Use native buttons with standard Tab, Enter, and Space behavior. Escape pauses active play, and the resume button resumes it. Apply `touch-action: none` to the play area and suppress default behavior for handled zipper keys. Keep Tab and Shift+Tab available.
- **Feedback** — Use a focusable zipper control with slider semantics. Expose its current value, its movement range, and the active target through localized accessibility text. Announce each graded release, jacket change, and result through a polite live region. Keep the changing countdown out of the live region.

## Jackets and target bands

Use a logical rail from 0 at the bottom to 100 at the top. All jackets start at 0. Each listed center and half-width defines an inclusive target band. The center and width stay fixed across attempts.

| Jacket | ko | en | Color | Band centers | Half-widths |
|---|---|---|---|---|---|
| 1 | 민트 패딩 | Mint puffer | `#78C8AC` | 24, 56, 92 | 8, 8, 7 |
| 2 | 살구색 패딩 | Apricot puffer | `#ECA06E` | 27, 65, 92 | 7, 6, 6 |
| 3 | 보라색 패딩 | Lavender puffer | `#A99BDD` | 31, 68, 92 | 6, 5, 5 |

- While moving an uncommitted pull, clamp it between the last locked point and 100. Stretch and preview the seam only as far as the current pull.
- On release, compare the pull center against the active band. A distance of at most 2 units from its center earns **100** points. A position elsewhere inside the inclusive band earns **70**. A position outside the band earns **0** and returns the pull to its last locked point. A release without movement follows the same rule.
- After a hit, snap the pull to the band center and make that point the new lower bound. The third hit closes the seam through the collar at 100 and counts the jacket as complete. Disable zipper input during each jacket transition.
- Maximum score is **900**. A partial jacket’s earned points count on timeout. Ties keep the existing best. Fixed targets and a fixed time limit make retry scores comparable.
- Show whole seconds as `ceil(remainingMs / 1000)`. Check the clock before grading a release. At zero, end the run and discard any uncommitted preview. The ninth accepted release ends the run immediately.

## Visual design

- Use a dark navy background (`#17243A`), warm white text (`#F7F5EE`), a yellow target (`#FFD466`), and dark zipper teeth. Use system fonts and tabular numerals for the timer and score.
- Draw the jacket and teeth with inline SVG. Rounded quilting lines and paired zipper teeth make the change from open to closed readable. Draw the active band with a translucent fill, a border, and a center tick so its shape identifies it independently of color. Give the pull a high-contrast outline.
- On a hit, mesh the teeth from the old locked point to the new one and briefly pop the points label. On a miss, pulse the band outline and return the pull over 120 ms. Make movement and hit feedback immediate under `prefers-reduced-motion`, with no pulse or scale. Jacket transitions also become immediate, while the run keeps the same 240 ms input lock.
- Fill the iframe from 320×480 to fullscreen with a fixed-height, non-scrolling layout. Cap the centered game column at 480 px. At 320×480, use a compact HUD and keep at least 200 px of travel on the rail, with room for the handle at both endpoints. Keep score, progress, time, and the result button legible without truncation.

## Sound

Silent. Zipper closure, points, and miss feedback are conveyed through the interface.

## Sharing

The result fits in a single screenshot at the minimum viewport. Keep the game title, finish state, score, and jacket count visible together, so the screenshot makes sense on its own.

## Strings

Resolve the language from `?lang=ko` or `?lang=en`. Otherwise use Korean when `navigator.language` starts with `ko`, and English in other cases. Set `<html lang>` and source interface copy, including accessible labels, from the chosen dictionary. Jacket names come from the jacket table.

| Key | ko | en |
|---|---|---|
| `appTitle` | 패딩 지퍼 챌린지 | Zip It Up |
| `startHowto` | 지퍼를 끌어 표시된 칸에서 놓으세요. 25초 안에 세 벌을 잠그면 성공! | Drag the zipper and let go inside the band. Zip all three jackets in 25 seconds! |
| `keyboardHint` | 키보드: ↑↓로 움직이고 Enter로 놓기 | Keyboard: Move with ↑↓ and release with Enter |
| `start` | 시작하기 | Start |
| `score` | 점수 {score} | Score {score} |
| `timeLeft` | {seconds}초 남음 | Time left: {seconds}s |
| `jacketProgress` | {index}/3 · {name} | {index}/3 · {name} |
| `segmentProgress` | 잠근 구간 {locked}/3 | Segments zipped {locked}/3 |
| `playHint` | 다음 칸에서 놓으세요. | Let go inside the next band. |
| `zipperLabel` | 지퍼 손잡이 | Zipper pull |
| `zipperValue` | 위치 {position}. 목표 {low}~{high}, 가운데 {center}. | Position {position}. Target {low} to {high}, center {center}. |
| `perfect` | 딱 가운데! +100 | Right in the center! +100 |
| `hit` | 잘 잠겼어요! +70 | Zipped! +70 |
| `miss` | 칸 밖이에요. 다시 당겨 보세요. | Outside the band. Try again. |
| `jacketDone` | {name}을(를) 잠갔어요! | Zipped the {name}! |
| `pause` | 일시 정지 | Pause |
| `paused` | 잠깐 멈췄어요 | Paused |
| `resume` | 계속하기 | Resume |
| `clear` | 세 벌 다 잠갔어요! | All three zipped! |
| `timeout` | 시간이 다 됐어요 | Time’s up |
| `best` | 최고 점수 {best} | Best score {best} |
| `newBest` | 새 기록! | New best! |
| `completed` | 잠근 패딩 {count}/3벌 | Jackets zipped {count}/3 |
| `retry` | 다시 하기 | Retry |

## localStorage

- `puffer-zip:best:v1` holds the best completed-run score as a decimal integer string from `0` to `900`. Read it at startup and check it again on the result screen before writing a higher score. Treat missing, malformed, or out-of-range values as absent.
- Wrap each storage access in `try/catch`. Keep the best known score in memory so best-score tracking works across retries when storage is blocked.

## Edge cases

- `pointercancel` or unexpected `lostpointercapture` restores the last locked point with no grade. After a normal release, clear the active pointer before processing the capture-loss event so a release registers only once.
- Pausing, losing window focus, or hiding the document clears held keys and any active drag, freezes the clock, and preserves the next target and any remaining jacket transition. Returning to the tab shows the paused overlay until the player resumes.
- Use `requestAnimationFrame` and cap movement and visual animation delta at 50 ms. Track the countdown using elapsed time from `performance.now()` during active play so a dropped frame cannot extend the run. Resolve time expiry before input or a pending transition.
- On resize, preserve score, clock, jacket index, active band, and locked position. Cancel an in-flight drag before recalculating the rail so resizing cannot grade a release.
- Restart clears the score, timer, jacket index, locked position, feedback, pending transition, capture, and held keys. Keep the best score. A key held through a screen change requires a fresh press before it can grade a release or trigger retry.

## Must not

- Ship game logic and artwork in one `index.html`. No network requests, external fonts, external assets, analytics, or raster artwork.
- Use original jackets and illustrations. No brands, logos, real people, copied game assets, or imitations of an existing game’s presentation.
- No page scroll, browser dialogs, popups, navigation away, or sound autoplay.
- Keep the course fixed across retries. No randomized bands, paid advantages, public rankings, or accounts.