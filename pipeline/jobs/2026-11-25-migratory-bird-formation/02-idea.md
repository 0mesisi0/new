# Idea and spec: 철새 V자 맞추기 / Fill the V

## Concepts scored

Scores run from 1 to 5 in each column. Korean search and share scores are editorial estimates based on the brief’s research and the proposed share formats.

| Concept | Category | First 10 seconds | Originality | Korean search and share demand | One-file buildability | Total |
|---|---|---:|---:|---:|---:|---:|
| **철새 V자 맞추기 / Fill the V** — find the missing bird in a winter flock’s V-shaped formation. | `games` | 5 | 4 | 3 | 5 | **17** |
| 삐걱 의자 통역기 / Squeaky Chair Translator — tap an illustrated chair to reveal what its latest squeak supposedly meant. | `weird` | 5 | 4 | 2 | 5 | 16 |
| 연말 마켓 한 바퀴 / One Lap of the Winter Market — pick a mood and draw a three-stop route through an imaginary winter market. | `random` | 4 | 3 | 4 | 5 | 16 |

**Pick Fill the V.** The first board teaches the rule through a single move, and the completed flock gives the score a visual payoff. Winter birdwatching supplies a distinct seasonal subject. The market draw has a stronger seasonal search phrase, while the flock gives players an immediate puzzle and a reason to replay.

## Meta

slug `migratory-bird-formation`

- Category `games`, kind `game`, aspect `9/16`, date `2026-11-25`
- Tags ko `겨울 철새`, `대칭 퍼즐`, `V자 대형`
- Tags en `winter birds`, `symmetry puzzle`, `V formation`

| Field | ko | en |
|---|---|---|
| `title` | 철새 V자 맞추기 | Fill the V |
| `desc` | 겨울 하늘을 나는 철새 한 마리가 대열을 벗어났어요. 반대쪽 날개를 보고 빈자리를 찾아 아홉 번의 비행을 완성해 보세요. | A bird has drifted out of its winter flock. Mirror the other wing to find its place across nine quick puzzles. |
| `howto` | 반대쪽 새와 같은 높이에서, 가운데 선까지의 거리가 같은 자리를 누르세요. 숫자키 1~3으로도 고를 수 있어요. | Pick the spot on the same row and equally far from the center line. You can also use number keys 1–3. |
| `about` | 겨울 철새의 V자 대형에서 착안한 대칭 퍼즐이에요. 시간 제한 없이 아홉 판을 풀 수 있어요. | A symmetry puzzle inspired by the V shape of a winter flock. Take your time across all nine rounds. |

## Pitch

A flock crosses a clear winter sky. One bird is out of formation, and three numbered spots show where it could land. Match the bird on the opposite wing to complete the V. Each round takes one choice. At the end, nine miniature flocks show which placements you got right.

## Flow and screens

1. **START**  
   Show the title, a complete sample flock, the one-line goal and a large **Start** button. The sample illustrates the shape. Starting opens round 1 immediately.

2. **PLAY ×9**  
   Show the round number, score, prompt, flock and three numbered choices on the missing bird’s row. The center line is always visible. A small bird silhouette below the flock represents the bird waiting to join.

3. **ROUND FEEDBACK**  
   The first choice locks the board. On a correct choice, land the bird on that spot and add one point. On a miss, mark the selected spot with an × and land the bird on the correct spot with a checkmark. Display the corresponding feedback and a **Next round** button. In round 9, use **See results**. Feedback stays visible until the player continues.

4. **RESULT**  
   Show the score, best score and a 3×3 grid of miniature formations in round order. Each tile includes a checkmark or × and a localized accessible label. Use the full-size completed flock above the grid if space permits. Provide **Play again** and **Copy score**. Retry opens round 1 with a score of zero.

## Controls

- **Touch and mouse:** tap or click one of the three spots. Every interactive target is at least 44×44 CSS px. Use pointer events for press visuals and the native button’s `click` as the sole activation path. Set `touch-action: none` on the playfield.
- **Keyboard:** Tab and Shift+Tab move through buttons. Enter and Space activate the focused button. Number keys 1–3 select the corresponding spot during PLAY. Handle the shortcut only when the game iframe has focus, ignore repeats and modifiers, and prevent the default action for handled shortcuts.
- **Focus:** focus choice 1 when PLAY opens, the continuation button when feedback opens and **Play again** on RESULT. Announce round feedback, score updates and copy status through a polite live region. Keep the focus ring visible.

## Boards and scoring

Draw the leader at column `0`, row `0`. The three rows behind it are numbered `1` to `3`, top to bottom. For each row, the two wings have birds at `−distance` and `+distance`. Omit the bird specified below and place all three choices on that row and side.

Distances are listed as positive offsets from the center. Convert them to signed columns using the missing side, then number the choice buttons `1`, `2`, `3` from screen left to right. The choice whose distance matches the bird across the center line is correct.

| Round | Wing distances for rows 1–3 | Missing side and row | Choice distances |
|---|---|---|---|
| 1 | `2, 4, 6` | Right, row 2 | `3, 4, 5` |
| 2 | `2, 4, 6` | Left, row 1 | `1, 2, 3` |
| 3 | `2, 4, 6` | Right, row 3 | `4, 5, 6` |
| 4 | `1, 3, 5` | Left, row 2 | `3, 4, 5` |
| 5 | `1, 3, 5` | Right, row 1 | `1, 2, 3` |
| 6 | `1, 3, 5` | Left, row 3 | `4, 5, 6` |
| 7 | `2, 3, 5` | Right, row 2 | `2, 3, 4` |
| 8 | `1, 2, 4` | Left, row 2 | `2, 3, 4` |
| 9 | `2, 4, 5` | Right, row 3 | `5, 6, 7` |

One correct placement earns one point. A miss earns zero. Every round counts once, yielding a final score from 0 through 9. Save the greater of the previous best and the final score when RESULT opens. Retry keeps the board sequence fixed so players can improve on the same puzzles.

## Visual design

- Fill the iframe with a pale blue sky (`#DDECF5`). Use navy (`#16324A`) for birds and text, off-white (`#F8FCFF`) for controls, teal (`#006C64`) for correct placements and rust (`#9B402B`) for misses. Pair feedback colors with a checkmark, × and text.
- Draw original, simple bird silhouettes using inline SVG. Keep the dashed center line behind the flock. Use real HTML buttons for the overlaid choices and system fonts for all text.
- At 320 px wide, render columns −7 through +7 on a 16 px pitch. Stagger the three numbered buttons vertically in three lanes below the flock, with dashed leader lines ending at their exact board positions. Each button retains its 44×44 target without overlapping adjacent buttons. Mark the actual choice positions on the missing row with small rings. Use the same layout at wider sizes and increase the column pitch as space allows.
- Keep the page free of scrolling at 320×480. On RESULT, drop the large flock illustration first to make room for the score grid and both controls. On wide viewports, center a play column up to 500 px wide.
- Animate landing over 180 ms with a short glide into the correct position. With `prefers-reduced-motion`, place the bird immediately. Feedback and continuation are available as soon as the choice is recorded. The game is silent.

## Copy score

Copy the localized `shareText` on button activation. Try `navigator.clipboard.writeText` first, then a temporary selectable textarea and `execCommand('copy')` if needed. On failure, show the localized failure message, keep the result visible and return focus to **Copy score**. The copied text contains the title and current score.

## Strings

Use the metadata title for the document title and visible app title. Keep the following strings in the `ko` and `en` dictionaries, including accessible names and announcements. Braced values come from game state.

| Key | ko | en |
|---|---|---|
| `startHint` | 건너편 새를 보고 빈자리를 찾아요. | Look across the center line to find the missing bird’s spot. |
| `start` | 시작 | Start |
| `round` | {round}/9판 | Round {round} of 9 |
| `score` | 점수 {score}/9 | Score {score}/9 |
| `prompt` | 어느 자리에 새가 들어갈까요? | Where should the bird go? |
| `boardCue` | {row}번째 줄 {side}에 빈자리가 있어요. 건너편 새는 가운데 선에서 {distance}칸 떨어져 있어요. | The missing bird belongs on the {side} in row {row}. The bird across from it is {distance} spaces from the center line. |
| `left` | 왼쪽 | left |
| `right` | 오른쪽 | right |
| `choiceVisible` | {number} | {number} |
| `choiceLabel` | {number}번, 가운데 선에서 {distance}칸 | Choice {number}, {distance} spaces from the center line |
| `correct` | 딱 맞아요! | Right on the spot! |
| `incorrect` | 정답은 {number}번이에요. | Choice {number} was the right spot. |
| `next` | 다음 판 | Next round |
| `seeResults` | 결과 보기 | See results |
| `resultHeading` | 비행 끝! | Flight complete! |
| `best` | 최고 점수 {best}/9 | Best score {best}/9 |
| `roundCorrect` | {round}판 정답 | Round {round}, correct |
| `roundIncorrect` | {round}판 오답 | Round {round}, missed |
| `retry` | 다시 하기 | Play again |
| `copy` | 점수 복사 | Copy score |
| `copied` | 점수를 복사했어요. | Score copied. |
| `copyFailed` | 점수를 복사하지 못했어요. 화면을 캡처해 주세요. | Couldn’t copy the score. You can take a screenshot. |
| `shareText` | 철새 V자 맞추기 · {score}/9 | Fill the V · {score}/9 |

Display `{number}` as the button numeral and label it with `choiceLabel`. Expose `boardCue` to assistive technology so a keyboard or screen-reader player can solve the same puzzle. Mark the SVG artwork and marks as decorative wherever localized text conveys their meaning.

## localStorage

- `migratory-bird-formation:best:v1` holds the best completed score as a decimal string from `"0"` through `"9"`. Read and write inside `try/catch`. Use zero for missing or malformed values and keep an in-memory best for the current session if storage is blocked.
- Round progress, individual answers and copy status stay in memory.

## Edge cases

- Honor `?lang=ko` and `?lang=en`. For missing or unsupported values, use Korean when `navigator.language` starts with `ko` and English otherwise. Set `<html lang>` before rendering.
- Lock the round synchronously on the first valid activation. Ignore subsequent pointer or keyboard input on that board. Bind continuation to the current round so a double tap cannot skip the next board.
- Preserve score, focus target and feedback through resize or rotation. A resize during landing snaps the bird to its resolved position. Finish any decorative transition when the iframe becomes hidden.
- A reload starts at START and restores the stored best. A partial round sequence has no effect on the best.
- For `#demo`, open RESULT with a fixed 7/9 run and a demo best of 7. Rounds 3 and 7 show misses. The demo result never updates storage. **Play again** starts normal play.
- Before publishing, run `npm test`, `npm run build` and `npm run qa -- --thumbs`. Check the generated thumbnail, both languages at 320×480, keyboard-only play, touch targets, retry, reduced motion and blocked storage.

## Must not

- No network calls, analytics, remote fonts, external assets or runtime dependencies. Keep the game’s HTML, CSS, JavaScript and artwork in `index.html`. Ship `meta.json` alongside it and generate `thumb.png` through QA.
- No copied characters, artwork, sound, levels, brands or real people.
- No countdown, lives, penalty animation, autoplay sound or flashing feedback.
- No claims about the behavior of a specific species or real migration routes.
- No `alert`, `confirm`, `prompt`, `window.open` or page navigation.