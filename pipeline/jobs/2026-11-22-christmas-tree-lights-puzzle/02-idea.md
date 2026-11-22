# Idea and spec: 크리스마스 트리 전구 퍼즐 / Christmas Tree Lights Puzzle

## Concepts scored

Each criterion is scored 1–5, for a maximum of 20. Search and share scores are estimates based on the supplied research and backlog.

| Concept | Category | First 10 seconds | Originality | Korean search/share demand | One-file buildability | Total |
|---|---|---:|---:|---:|---:|---:|
| **크리스마스 트리 전구 퍼즐 / Christmas Tree Lights Puzzle** — Light every bulb by flipping one bulb and its neighbors at a time. Three fixed boards give friends the same challenge. | `puzzle` | 5 | 4 | 4 | 5 | **18** |
| 크리스마스 선물 포장지 계산기 / Gift Wrap Size Calculator — Enter a box’s dimensions and see a recommended paper cut size with a fold diagram. | `tools` | 4 | 3 | 4 | 5 | 16 |
| 올해의 미룬 일 파쇄기 / Procrastination Shredder — Pick a familiar unfinished task and feed its slip through a tiny desk shredder. | `silly` | 5 | 4 | 3 | 5 | 17 |

**Pick the tree puzzle.** One tap changes up to five bulbs, so players can learn the rule by trying it. The three boards turn the research’s seasonal activity hook into a shared challenge with a score friends can compare. The Korean title includes `크리스마스 트리` and `전구 퍼즐`, two phrases that describe exactly what players get.

## Meta

slug `christmas-tree-lights-puzzle`

| Field | Value |
|---|---|
| Folder | `items/christmas-tree-lights-puzzle/` |
| Date | `2026-11-22` |
| Category | `puzzle` |
| Kind | `game` |
| Aspect | `9/16` |
| Tags ko | `크리스마스`, `트리`, `전구`, `퍼즐` |
| Tags en | `Christmas`, `tree lights`, `logic puzzle` |

| Field | ko | en |
|---|---|---|
| `title` | 크리스마스 트리 전구 퍼즐 | Christmas Tree Lights Puzzle |
| `desc` | 전구 하나를 누르면 위아래와 양옆 전구도 함께 바뀌어요. 세 판에서 정해진 횟수 안에 크리스마스 트리의 전구를 모두 켜 보세요. | Tap a bulb to flip it and its neighbors. Light all nine bulbs within the move limit on each of three Christmas tree boards. |
| `howto` | 전구를 누르거나 숫자키 1~9를 사용하세요. 누른 전구와 위아래·양옆 전구가 함께 바뀌어요. 적은 횟수로 모두 켜면 더 높은 점수를 받아요. | Tap a bulb or press 1–9. It flips along with its neighbors above, below, left, and right. Use fewer moves to earn more points. |
| `about` | 세 판의 시작 모양은 매번 같아요. 최고 점수는 이 브라우저에 저장돼요. | The three boards start in the same patterns every time. Your best score is saved in this browser. |

## Pitch

A paper-cut evergreen holds nine bulbs numbered in a 3×3 grid. Press one and it flips between lit and dark, along with its neighbors above, below, left, and right. Light the whole tree within the move limit. Three short boards go from a two-move opening to a four-move finale. The result card shows the score out of 30 and how each board went.

## Flow

1. **Start.** Show the title, a static tree preview, the one-line rule, and a large Start button. The preview has no interactive bulbs or stored game state.
2. **Play.** Start opens board 1 and focuses the center bulb. Show the board number and remaining moves above the tree. Each press flips the affected bulbs and spends one move. The first board starts with four dark bulbs and four moves.
3. **Round summary.** Freeze the final board. Show whether all bulbs were lit, the points earned, and the move count. On a failed round, show how many bulbs were still dark. The footer advances to the next board or to results after board 3. Every player gets all three boards.
4. **Result.** Show the total score, the best score if available, and one row per board with its outcome and points. Show a new-best message on a strict improvement over an existing record. The score and three rows fit together in a screenshot. Play again starts a fresh run at board 1.

## Controls

- **Touch and mouse.** Use native buttons for bulbs and actions. Use pointer events for press styling and one `click` handler per button for activation. Give each target at least 44×44 px and apply `touch-action: none` to the grid.
- **Keyboard.** While playing, `1`–`9` and the equivalent numpad keys activate bulbs in the order shown below. Arrow keys move focus within the grid and stop at its edges. Enter or Space activates a focused button. Use Tab and Shift+Tab to navigate between the grid and the footer. Prevent default scrolling for handled grid keys and ignore held-key repeats. Leave Tab and browser shortcuts alone.
- **Focus.** Give each bulb a visible focus ring. Focus the center bulb on entering play, the summary heading on completing a round, and the results heading on entering results. Each bulb exposes its numbered name and current pressed state. Announce the remaining move count after each accepted press. Decorative tree shapes, light effects, and the start preview stay out of the accessibility tree.

## Boards and scoring

Number bulbs left to right, then top to bottom.

```text
1 2 3
4 5 6
7 8 9
```

Represent a lit bulb with a set bit and start from `0x1ff` when constructing a board. Apply the same cross-shaped XOR mask for board setup and player input. A mask includes the pressed bulb and each in-bounds orthogonal neighbor.

| Round | Setup presses from all lit | Initially dark | Minimum moves | Move limit |
|---:|---|---|---:|---:|
| 1 | 1, 5 | 1, 5, 6, 8 | 2 | 4 |
| 2 | 2, 6, 8 | 1, 2, 5, 6, 7, 8 | 3 | 5 |
| 3 | 1, 3, 7, 9 | 1, 3, 7, 9 | 4 | 6 |

Each listed setup also solves its board. Checking all 512 possible press subsets gives the minima above. Repeated presses are legal and each press spends a move.

Resolve each press in this order.

1. Flip the affected bulbs and increment moves used.
2. If all nine bulbs are lit, end the round as solved and award `10 − (movesUsed − minimumMoves)` points.
3. Otherwise, if the move limit is reached, end the round and award zero points.
4. Otherwise, keep playing.

Each solved round earns 8–10 points. Sum all three rounds for a maximum of 30. For example, a round 1 solve in four moves earns 8 points. A round 1 attempt with any dark bulbs after four moves earns zero.

## Visual design

- **Palette.** Use midnight navy `#101D2B` for the background, evergreen `#204A3B` for the tree, cream `#F8F3DD` for text, and warm amber `#FFD36A` for lit bulbs. Dark bulbs are hollow with a high-contrast outline. Lit bulbs have a solid fill and a small highlight, so state reads through shape as well as color.
- **Tree and grid.** Draw the tree in inline SVG behind a DOM grid of nine buttons. Keep every target centered on its row and column. Put numbers inside the bulbs with sufficient contrast in both states.
- **Layout.** Fill the iframe with a centered column up to 420 px wide. Fit each screen at 320×480 with no page scrolling. On short screens, tighten decorative spacing and scale the tree backdrop while preserving tap targets and text. Keep primary actions in a footer below the grid, outside the bulb hit area.
- **Feedback.** Changed bulbs get a 120 ms brightness pulse. A solved tree gets one 250 ms glow. State updates immediately and input stays responsive during the pulse. With `prefers-reduced-motion`, use static state changes. The game is silent.

## Strings

Put the following strings in `{ ko: {…}, en: {…} }`. Set `<html lang>` and the document title from the selected language. Use supported `?lang=ko` and `?lang=en` values first, then fall back to Korean for a `navigator.language` beginning with `ko` and English otherwise. Use the game title for the document title and visible title. Digits `1`–`9` on the bulbs are shared.

| Key | ko | en |
|---|---|---|
| `appTitle` | 크리스마스 트리 전구 퍼즐 | Christmas Tree Lights Puzzle |
| `startHelp` | 전구를 누르면 그 전구와 위아래·양옆 전구가 바뀌어요. 모두 켜 보세요! | Tap a bulb to flip it and its neighbors above, below, left, and right. Light them all! |
| `start` | 시작하기 | Start |
| `round` | {round}/3판 | Board {round} of 3 |
| `movesLeft` | 남은 횟수 {n} | Moves left: {n} |
| `bulbLabel` | 전구 {n} | Bulb {n} |
| `solved` | 전구를 모두 켰어요! | All bulbs lit! |
| `outOfMoves` | 횟수를 다 썼어요 | Out of moves |
| `darkBulbs` | 꺼진 전구 {n}개 | Bulbs still dark: {n} |
| `roundMoves` | 사용 {used}회 · 최소 {min}회 | Moves used: {used} · Minimum: {min} |
| `roundPoints` | 이번 판 {score}/10점 | Board score: {score}/10 |
| `next` | 다음 판 | Next board |
| `seeResult` | 결과 보기 | See results |
| `resultTitle` | 트리 점등 결과 | Your tree lights score |
| `total` | 총점 {score}/30점 | Total: {score}/30 |
| `best` | 최고 점수 {score}/30점 | Best: {score}/30 |
| `newBest` | 최고 기록을 갱신했어요! | New personal best! |
| `resultRow` | {round}판 {state} · {score}/10점 | Board {round} · {state} · {score}/10 |
| `cleared` | 성공 | Solved |
| `uncleared` | 미완성 | Unsolved |
| `retry` | 다시 하기 | Play again |

## localStorage

- `christmas-tree-lights-puzzle:best:v1` stores the best completed-run score as a decimal integer from `0` through `30`. Treat missing or invalid data as no record.
- On entering results for a completed run, read the stored best and take the maximum of that value, the in-memory best, and the current score. Write only if the stored record is missing or lower. Put reads and writes in `try/catch`.
- If storage is blocked, keep the best for the current iframe session. If a write fails, replace the `best` label with `sessionBest` when displaying an in-memory record that was never saved.

| Key | ko | en |
|---|---|---|
| `sessionBest` | 이번 방문 최고 {score}/30점 | Best this visit: {score}/30 |

## Edge cases

- A bulb press applies once, even on devices that emit both pointer and click events. Ignore extra board inputs after a round ends. Keep the Next board and See results actions below the grid so a double-tap on a bulb cannot advance the round.
- A solve on the last available move earns points. A timeout keeps the final board visible with the dark bulbs identifiable by shape.
- Play again clears all three round results, resets the move counter and restores board 1. Refresh returns to Start.
- Resize preserves the active board, score and focus. Cancel active visual effects when the document becomes hidden and render the current state immediately when it becomes visible. There is no timer to catch up.
- If the best record is tied, show the best score without the new-best message. The first completed run establishes a record without a new-best message.
- For thumbnail QA, `#demo` opens board 1 at its initial state and leaves records untouched until the player completes a real run. Generate `thumb.png` with `npm run qa -- --thumbs`. Run `npm test` and `npm run build`, then check the game at 320×480 with pointer and keyboard input in both languages.

## Must not

- No network requests, external scripts or fonts, analytics, or remote assets. Ship gameplay, styles, and art in `index.html`, with the required `meta.json` and generated `thumb.png` alongside it.
- No raster or video game art, copied level layouts or visual treatments, trademarks, or real people. Use original inline SVG and CSS.
- No timers, randomized boards, or penalties outside the move budget. A completed run uses the same three boards in the same order.
- No dialogs, pop-ups, navigation away from the item, sound, or page scrolling.
- No score tracking beyond the local best. Do not store individual presses or partial runs.