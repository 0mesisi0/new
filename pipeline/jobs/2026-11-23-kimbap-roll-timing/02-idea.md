# Idea and spec: 김밥 말기 타이밍 / Kimbap Roll Timing

## Concepts scored

Each criterion is scored from 1 to 5. Korean search and share scores are editorial estimates based on the brief’s research and backlog. Maximum 20.

| Concept | Category | First 10 seconds | Originality | Korean search/share demand | One-file buildability | Total | Verdict |
|---|---|---:|---:|---:|---:|---:|---|
| **김밥 말기 타이밍 / Kimbap Roll Timing** | **games** | **5** | **4** | **4** | **5** | **18** | **Picked.** The first tap leaves a visible stripe of filling, and the finished slices show exactly how each roll went. The backlog supplies the subject and the research’s tactile-play direction informs the reveal. |
| 인터넷 주소의 첫 심부름 / An Internet Address’s First Errand | tech | 4 | 3 | 4 | 5 | 16 | Step through a DNS lookup by passing a fictional address between a browser, a resolver and the servers it consults. `DNS 작동 원리` gives it a clear Korean search hook. |
| 아무것도 하지 마 / Do Absolutely Nothing | weird | 4 | 3 | 3 | 5 | 15 | A petty stopwatch counts how long you can leave its play area alone. The result is easy to compare with friends, though the payoff takes longer than the first interaction. |

## Meta

slug `kimbap-roll-timing`

- category `games`, kind `game`, aspect `9/16`, date `2026-11-23`
- tags `김밥`, `타이밍 게임`, `kimbap`, `timing game`

| Field | ko | en |
|---|---|---|
| Title | 김밥 말기 타이밍 | Kimbap Roll Timing |
| Desc | 움직이는 재료를 초록 칸에 맞춰 김밥 세 줄을 말아 보세요. 완성된 단면을 보면 어떤 재료가 삐뚤어졌는지 한눈에 보여요. | Time your taps to line up the fillings in three kimbap rolls. Each sliced roll shows where your fillings landed. |
| Howto | 재료가 초록 칸에 들어오면 ‘재료 놓기’를 누르세요. 스페이스바로도 놓을 수 있어요. 세 줄을 말아 27점에 도전하세요. | Tap Place filling or press Space when the filling enters the green band. Make three rolls and aim for 27 points. |
| About | 단무지, 당근, 시금치가 놓인 위치에 따라 김밥 단면이 달라지는 타이밍 게임이에요. | A timing game where every misplaced strip of radish, carrot or spinach shows up in the sliced roll. |

## Pitch

A rice-covered sheet of gim sits on a bamboo mat. One filling at a time slides sideways across it. Tap to set each strip down, then watch the mat fold and the round slice appear. A careful roll has three tightly packed fillings. A rushed roll has a slice that visibly wobbles off-center. Three rolls make one game, and the three slices sit together on the final tray.

## Flow

1. **START.** Show the title, one-line instruction and a stationary preview of a yellow strip over the target band. The primary button starts roll one immediately.
2. **PLAY.** Place pickled radish, carrot and spinach in that order. Show the current roll, score, filling name and the previous placement’s feedback. Each tap locks the actual position of the strip. Hold the placement feedback for 300 ms, then send in the next filling.
3. **ROLL REVEAL.** After the third placement’s feedback, fold the mat and reveal the slice with that roll’s score. The next-roll button starts rolls two and three. After roll three, the same button opens the score screen. Enable the button as soon as the slice is visible, after a fold animation of at most 250 ms.
4. **RESULT.** Show all three slices in order, each roll’s score, the total out of 27, the best score and a large retry button. Retry starts a fresh roll one.

## Controls

- Use native buttons for taps, clicks and keyboard focus. The play area uses pointer events for direct placement on the mat, with `touch-action: none`. Use the button’s native `click` handler and the mat’s `pointerup` handler on separate elements so one gesture places one filling.
- On PLAY, Space places a filling when focus is elsewhere. When a native button has focus, let the browser handle Space and Enter. Ignore repeated and composing key events. Prevent the default behavior only for shortcuts the game handles.
- Focus the primary button when entering a screen, including the placement button at the start of each roll. Keep that button in the DOM throughout the roll. The same focus position works for all three placements.
- Apply the placement lock synchronously. Ignore pointer cancellations, extra pointers and inputs during feedback. Reject a second activation within 400 ms of opening or advancing a screen, so rapid taps cannot skip a reveal or place the opening filling accidentally.
- Give every action a touch target of at least 44 × 44 px. Draw a visible focus ring and mark the target band with brackets and a center line as well as color.

## Timing and scoring

Use a normalized horizontal position `x` from `−1` to `+1`, with `0` at the center of the mat. The filling marker begins at `−1`; mirror the path for carrot so it begins at `+1`. When a filling becomes active, it moves at constant speed between the edges and reflects immediately. Each edge-to-edge pass takes 1.8 seconds on roll one, 1.5 on roll two and 1.2 on roll three.

The target band spans `−0.25` through `+0.25` on every roll. Sample the last rendered marker position at activation so scoring agrees with the position the player saw.

| Placement | Points | Slice result |
|---|---:|---|
| `abs(x) ≤ 0.10` | 3 | Filling sits close to the center of its slot. |
| `0.10 < abs(x) ≤ 0.25` | 2 | Filling is slightly off-center. |
| `abs(x) > 0.25` | 0 | Filling sits visibly toward the left or right edge. |

Store each filling’s signed `x` and points in memory. In the slice, draw the three filling centers on separate rows at `−0.26r`, `0` and `+0.26r` vertically, with `0.48r × x` as their horizontal offset. Here `r` is the slice radius. Give each filling a distinct shape so the placement remains readable without color. Every roll includes all three fillings, even at zero points. A roll is worth up to 9 points and a game up to 27.

## Screens and visual design

| Screen | Layout and feedback |
|---|---|
| Start | Cream instruction card over a warm wood counter. Center the title above the mat preview, then place the primary button below it. Show the saved best score only if a completed score is available. |
| Play | Put the roll count and total score in the top row. Use the filling name as the mat heading. Previously placed strips stay on the mat in their own rows. The active strip and target brackets occupy the next row. A fixed-height feedback row below the mat keeps the placement button from moving as feedback appears. |
| Roll reveal | Replace the mat with one enlarged cross-section and its roll score. Use the signed positions from play to draw the fillings. Put the next action in the same bottom position as the placement button. |
| Result | Put the total front and center. Under it, lay out the three slices on one tray, with the roll number and score below each slice. Show the best score and, when earned, the new-record message above the retry button. |

Use inline SVG and CSS. The palette is cream `#FFF6E3`, bamboo `#D6AA6A`, ink `#25221D`, gim `#233D33` and target green `#327650`. Use system fonts. Give a scored placement a brief outline and a point label. Under `prefers-reduced-motion`, drop the fold and outline animation, retain the text feedback and keep the moving filling needed for timing. The game has no sound.

Fill the iframe and center a stage no wider than 480 px. At 320 × 480, use 12 px outer padding, a fluid mat and one compact tray row. Keep the primary button and score visible in both languages without page scrolling. Scale the SVG through its `viewBox` so it stays sharp when resized.

## Strings

Use a `ko`/`en` dictionary for document title, screen text, labels and announcements. Resolve `?lang=ko` or `?lang=en` first, then use Korean for a navigator language beginning with `ko` and English otherwise. Set `<html lang>` to match. Format score variables as integers.

| Key | ko | en |
|---|---|---|
| `title` | 김밥 말기 타이밍 | Kimbap Roll Timing |
| `instruction` | 재료가 초록 칸에 들어오면 눌러요. | Tap when the filling enters the green band. |
| `start` | 김밥 말기 시작 | Start rolling |
| `rollProgress` | {roll}/3줄 | Roll {roll} of 3 |
| `score` | 점수 {score}점 | Score {score} |
| `radish` | 단무지 | Pickled radish |
| `carrot` | 당근 | Carrot |
| `spinach` | 시금치 | Spinach |
| `matLabel` | 김 위에서 움직이는 {filling} | {filling} moving across the seaweed |
| `place` | 재료 놓기 | Place filling |
| `perfect` | 정중앙! +3점 | Right in the middle! +3 |
| `good` | 초록 칸 안! +2점 | In the band! +2 |
| `miss` | 칸 밖에 놓였어요. +0점 | Outside the band. +0 |
| `rollDone` | {roll}번째 김밥 완성! | Roll {roll} is ready! |
| `sliceLabel` | {roll}번째 김밥 단면 | Cross-section of roll {roll} |
| `rollScore` | {score}/9점 | {score}/9 |
| `trayRollScore` | {roll}번째 줄 · {score}/9점 | Roll {roll} · {score}/9 |
| `nextRoll` | 다음 줄 말기 | Make the next roll |
| `showResult` | 점수 보기 | See my score |
| `resultTitle` | 김밥 세 줄 완성! | Three rolls ready! |
| `total` | 총 {score}/27점 | Total {score}/27 |
| `best` | 최고 기록 {score}점 | Best {score} |
| `newBest` | 새 최고 기록! | New high score! |
| `retry` | 다시 말기 | Roll again |

Announce the feedback through one polite live region after each placement. Keep the rapidly moving marker and decorative mat details out of the accessibility tree. Use `sliceLabel` for the enlarged slice. On the tray, the adjacent roll-and-score text identifies each slice.

## localStorage

- `kimbap-roll-timing:best:v1` stores the best completed score as a decimal string. An absent key means there is no previous record. Accept only canonical integers from `0` through `27`.
- Read and write in `try/catch`. Before updating a completed game’s record, compare the result with both the in-memory best and any valid stored best available at that moment. Keep the session best in memory if storage is blocked.
- Show `newBest` for the first completed game or a score strictly above the previous best. Keep the current game’s placements and roll progress in memory.

## Edge cases

- A 0-point game still reveals all three slices and can establish the initial record. A tie keeps the best score without showing the new-record message.
- Commit a score only when RESULT first opens. Reloading earlier starts at START. Retry resets the roll counter, total, positions, feedback, input locks and animation progress.
- Use `requestAnimationFrame` for the moving filling and fold. Base motion on elapsed frame time and cap each time step at 50 ms. On `document.hidden`, freeze movement and feedback timing, release any active pointer and ignore gameplay input. Resume from the same position with a fresh frame timestamp.
- Resizing preserves the normalized marker position, locked placements, roll and score. Recompute the layout without restarting play.
- A marker exactly on a scoring boundary receives the higher score for that boundary. A miss always advances play. There is no timeout while the user is deciding when to tap.

## Must not

- Do not use external scripts, fonts, images, network calls or analytics. Keep HTML, CSS, JS and SVG in one `index.html`.
- Do not copy existing game art, layouts, music, characters or branding. Use original vector art without raster images or video.
- Do not add real cooking instructions, failure penalties, forced sharing, browser dialogs, pop-ups or navigation.
- Do not allow the page to scroll or let incidental gestures zoom the play area.
- Do not draw `thumb.png` by hand. Generate it with `npm run qa -- --thumbs` after `npm test` and `npm run build`, then check that the thumbnail shows a readable mat and filling.