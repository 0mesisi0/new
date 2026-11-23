# Idea and spec: 구구단 60초 퀴즈 / 60-Second Times Tables

## Concepts scored

Scores run from 1–5 in this order: value in the first 10 seconds, originality, Korean search or share demand, and buildability in one HTML file. Demand scores are editorial estimates based on the supplied research and backlog.

| Concept | Category | Score | Verdict |
|---|---|---|---|
| **구구단 60초 퀴즈 / 60-Second Times Tables** — Tap four-choice answers, then review up to three missed facts. | **learn** | **5 / 3 / 4 / 5 = 17** | **Picked.** The first question takes one tap to reach, `구구단 퀴즈` describes the activity directly, and the result gives learners something specific to practice. |
| 지하철 손잡이 파도 / Subway Strap Wave — Tap a row of subway straps and watch the motion travel across the carriage. | cool | 5 / 4 / 2 / 5 = 16 | An immediate tactile toy inspired by the research’s short-form sensory hook. Its Korean search appeal is harder to predict. |
| 아무것도 하지 마 / Do Absolutely Nothing — Keep your pointer, hands, and keys still while a timer counts up. | weird | 3 / 4 / 3 / 5 = 15 | An absurd challenge from the backlog with a shareable personal best. Most of its payoff comes after the first ten seconds. |

## Meta

slug `times-tables-speedrun`

| Field | Value |
|---|---|
| category | `learn` |
| kind | `game` |
| aspect | `9/16` |
| date | `2026-11-23` |
| tags | ko `구구단`, `곱셈`, `암산` · en `times-tables`, `multiplication`, `mental-math` |

| Field | ko | en |
|---|---|---|
| title | 구구단 60초 퀴즈 | 60-Second Times Tables |
| desc | 60초 동안 2단부터 9단까지 구구단 문제를 풀어 보세요. 라운드가 끝나면 최고 기록과 틀린 문제를 확인할 수 있어요. | Answer multiplication questions for 60 seconds. Try to beat your best score, then review the facts you missed. |
| howto | 보기 네 개 중 정답을 고르세요. 숫자 키 1~4로도 고를 수 있어요. 정답 하나당 1점이에요. | Pick one of four answers, or press 1–4. Each correct answer earns one point. |
| about | 구구단을 짧게 연습하는 게임이에요. 최고 기록은 이 브라우저에 저장돼요. | A quick way to practice times tables. Your best score is saved in this browser. |

## Pitch

A multiplication card fills the center of the screen, with four large answer tiles below it. Start with one tap and see whether your first answer was right before the next card appears. At the end of the minute, the result pairs your score with up to three equations worth another look. The backlog supplies the timed practice format. The review panel makes the score useful for the next round.

## Flow

1. **START** — Show the title, one-line instructions, and a large start button. Put a sample equation with its answer on a small illustration card. The clock starts when the first playable question appears.
2. **PLAY** — Show the remaining seconds and score above a single equation. Arrange four numbered answer tiles in a 2×2 grid. After a selection, lock the tiles for 400 ms on a correct answer or 650 ms on a miss. Show the feedback immediately and display the next question when the lock expires. Feedback time counts toward the minute.
3. **RESULT** — Show the round score, best score, and a badge if the player set a new record. If the player missed any questions, show up to three distinct missed equations with their answers. If they answered everything correctly, show the perfect-round line. If they submitted zero answers, show the zero-answer line. A large retry button starts a fresh round immediately.

## Controls

| Action | Touch and mouse | Keyboard |
|---|---|---|
| Start or retry | Tap or click the main button. | Tab to the button and press Enter or Space. |
| Choose an answer | Tap or click a tile. | Press `1`–`4`, or focus a tile with Tab and press Enter or Space. Tiles are numbered left to right, then top to bottom. |

Use native buttons, visible focus rings, and a minimum target size of 44 × 44 CSS px. Set `touch-action: none` on the play area. Prevent default behavior for handled game shortcuts and ignore auto-repeat. Accept at most one selection per question. Keep the four tile elements mounted so focus survives question changes. On entering PLAY, focus the equation. On entering RESULT, focus the result heading. Use a polite live region for question and answer feedback. Expose the timer for reading without announcing every second.

## Question generation and scoring

- Each round draws from the 72 ordered facts with a first factor of 2–9 and a second factor of 1–9. Build shuffled batches across the eight times tables. In each batch, ask one unused fact per table in shuffled table order. After all 72 facts, reshuffle and avoid an exact repeat across the cycle boundary.
- For `a × b`, form distractors from `a × (b − 1)`, `a × (b + 1)`, `(a − 1) × b`, and `(a + 1) × b`, using factors in 1–9. Remove duplicates and the correct product. Shuffle the pool, then take three distractors. If the pool is short, fill it using `product − 1`, `product + 1`, `product − 2`, `product + 2`, and so on, skipping invalid or duplicate values. Shuffle all four choices before display.
- A correct selection adds one point immediately. A miss adds no points and records the ordered fact in memory. During feedback, mark the correct tile, mark the selected wrong tile when applicable, and show the corresponding text.
- Rank missed facts by frequency, breaking ties by earliest miss. Show the first three as complete equations. Track submitted answers separately from score so a round with misses and a score of zero still displays its review.
- Compare the final score with the previous best. Show the record badge only for a strict increase over the previous value, with zero as the initial best. A tie keeps the existing record.

## Visual design

- Use warm paper (`#FFF8E7`), dark navy text (`#18233A`), and a yellow primary button (`#FFD45C`). Show correct feedback with deep green and a check icon. Show incorrect feedback with dark red and an × icon. The status line also states the result in words.
- Use system fonts, tabular numerals, and a large centered equation. Give the clock and score fixed positions so the layout stays still during play. The clock can change color in the final ten seconds while retaining the numeric countdown.
- Fill the iframe and keep the page free of scrolling. At 320 × 480, use a compact header, 12 px outer padding, two tile rows, and a reserved feedback line. Keep all three review equations visible above the retry button. On wide displays, center the play column and cap its width at 480 px.
- Give a correct tile a brief scale pulse. With reduced motion enabled, use the same icons, colors, and status text without the pulse. Use CSS and text for all art. The game is silent.

## Strings

Use a `{ ko, en }` dictionary for visible and accessible strings. Read `?lang=ko` or `?lang=en`, falling back to Korean when `navigator.language` starts with `ko` and English otherwise. Set `document.title` and `<html lang>` accordingly. Braced values below are runtime substitutions.

| Key | ko | en |
|---|---|---|
| appTitle | 구구단 60초 퀴즈 | 60-Second Times Tables |
| startHint | 60초 동안 보기 네 개 중 정답을 골라 보세요. | Pick the right answer from four choices for 60 seconds. |
| exampleLabel | 예시 | Example |
| start | 시작하기 | Start |
| time | 남은 시간 {seconds}초 | {seconds}s left |
| timeAccessible | 남은 시간 {seconds}초 | {seconds} seconds remaining |
| score | 점수 {score}점 | Score {score} |
| question | {a} × {b} = ? | {a} × {b} = ? |
| questionAccessible | {a} 곱하기 {b}는 얼마일까요? | What is {a} times {b}? |
| option | {number}. {value} | {number}. {value} |
| optionAccessible | 보기 {number}, {value} | Choice {number}, {value} |
| correct | 정답이에요! | Correct! |
| incorrect | 정답은 {value}이에요. | The answer is {value}. |
| result | 60초 끝! | Time’s up! |
| best | 최고 기록 {score}점 | Best score {score} |
| newBest | 새 최고 기록! | New best! |
| review | 다시 볼 문제 | Facts to review |
| equation | {a} × {b} = {value} | {a} × {b} = {value} |
| equationAccessible | {a} 곱하기 {b}는 {value} | {a} times {b} equals {value} |
| perfect | 푼 문제를 모두 맞혔어요! | You got every answer right! |
| noAnswers | 이번에는 고른 답이 없어요. | You didn’t submit an answer this round. |
| retry | 다시 도전 | Play again |

The sample card uses `equation` and `equationAccessible` with `a=3`, `b=4`, and `value=12`.

## localStorage

- `times-tables-speedrun:best` stores the best score as a base-10 integer string. Read and write inside `try/catch`. Treat missing, malformed, negative, or unsafe integer values as zero. If storage is blocked, keep the best score in memory across retries.
- Keep questions, submissions, missed facts, and round timing in memory. Persist only the best score.

## Edge cases

- Use `requestAnimationFrame` to render timing from a monotonic deadline. Display whole seconds rounded up. When the document becomes hidden, freeze the round clock and feedback delay. On return, resume both from their remaining durations. If the deadline has already passed when visibility changes, finish the round.
- Check the deadline before accepting every selection. A selection committed before expiry counts even if its feedback is still showing at expiry. A selection at or after the deadline has no effect. Enter RESULT once and discard pending feedback.
- A double tap, rapid keypress, or key and pointer event on the same question cannot submit twice. Release an activation key held at a screen transition before accepting it on the new screen.
- Retry clears the score, answer count, missed facts, input lock, and remaining time. Generate a fresh question order and preserve the best score. Resizing reflows the layout without changing round state.
- Before publishing, run `npm test`, `npm run build`, and `npm run qa -- --thumbs`. Check both languages at 320 × 480 and fullscreen. Verify keyboard play, hidden-tab timing, score persistence, and a full retry. Use the generated `thumb.png`.

## Must not

- No external scripts, fonts, assets, network requests, or analytics. Ship the game as one self-contained `index.html` with a separate `meta.json`.
- No raster art, video, copied artwork, existing game branding, or real people.
- No page scrolling, browser dialogs, popups, navigation away from the item, or audio.
- No accounts, leaderboards, personal data, or stored answer history.
- No feedback that depends on color, motion, or sound alone.