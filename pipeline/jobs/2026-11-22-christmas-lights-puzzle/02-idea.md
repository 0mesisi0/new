# Idea and spec: 크리스마스 전구 잇기 / Christmas Lights Puzzle

## Concepts scored

Scores are 1–5 per criterion, with a maximum of 20. Korean search and share scores are planning estimates informed by the supplied research and backlog. The brief includes no item votes.

| Concept | Category | First 10 seconds | Originality | Korean search/share demand | One-HTML buildability | Total |
|---|---|---:|---:|---:|---:|---:|
| **크리스마스 전구 잇기 / Christmas Lights Puzzle**. Turn one tile and watch electricity reach the first bulb on a 4×4 board. | `puzzle` | 5 | 4 | 4 | 5 | **18** |
| 크리스마스 마켓 준비물 체크리스트 / Christmas Market Packing Checklist. Pick a visit style to get a short, editable packing list. | `tools` | 4 | 3 | 4 | 5 | **16** |
| 겨울 버스 창가 / Winter Bus Window. Press a fogged window to clear a patch and reveal the lights passing outside. | `chill` | 5 | 4 | 3 | 4 | **16** |

**Pick: 크리스마스 전구 잇기.** A single turn delivers the first payoff. The finished light board and turn count give friends a result they can compare on the same puzzle. The Christmas theme follows the research’s seasonal participation hook, and the interaction is distinct from the existing cake tools, snowprint puzzle and winter ASMR items.

## Meta

slug `christmas-lights-puzzle`

- category `puzzle`, kind `game`, aspect `9/16`, date `2026-11-22`
- tags: ko `크리스마스`, `전구`, `전선 퍼즐`; en `Christmas`, `lights`, `wire puzzle`
- **Title ko** — 크리스마스 전구 잇기
- **Title en** — Christmas Lights Puzzle
- **Desc ko** — 전선 타일을 돌려 꺼진 크리스마스 전구 다섯 개를 켜 보세요. 같은 퍼즐에 다시 도전해 내 최소 회전 기록을 줄일 수 있어요.
- **Desc en** — Turn wire tiles to light five Christmas bulbs. Replay the same board and see how few turns you need to light them all.
- **How to ko** — 타일을 누를 때마다 시계 방향으로 한 칸 돌아가요. 전원에서 전구 다섯 개까지 전선을 이으세요. 키보드는 방향키로 이동하고 Enter나 스페이스바로 돌려요.
- **How to en** — Each press turns a tile clockwise. Connect the power source to all five bulbs. With a keyboard, use the arrow keys to move and Enter or Space to turn.
- **About ko** — 모두 같은 배치에서 시작해요. 내가 몇 번 만에 전구를 다 켰는지 친구와 비교해 보세요.
- **About en** — Everyone starts with the same board. Compare turn counts with a friend after you light every bulb.

## Pitch

A dark evergreen board holds five unlit bulbs and a tiny brass power plug. Each press turns a wire tile by 90°. Current flows along matching connections, brightening the wires and lighting any bulb it reaches. The first suggested turn lights one bulb immediately. The round ends when all five glow, and every retry starts from the same layout so turn counts are comparable.

## Flow

1. **START** — Show the title, one-line instructions, a decorative bulb and a prominent **시작 / Start** button. Start initializes the fixed board with zero turns, zero lit bulbs and a highlight on A3, the top row’s third tile.
2. **PLAY** — Keep the lit-bulb count and turn count above the 4×4 board. The first-turn instruction names the highlighted tile. Clear the instruction after the first successful turn. Update both counters and the board on every turn. When all five bulbs are powered, record the score and enter RESULT.
3. **RESULT** — Show the completion message above the solved board. Freeze the board and show the final turn count, the lowest completed turn count and, when earned, the new-record message. Put a large **다시 하기 / Play again** button below the board, with **기록 복사 / Copy score** beside it. Retry returns directly to PLAY with the original orientations and the first-turn hint restored.

## Controls

- **Touch and mouse:** press a tile to turn it clockwise once. Use native buttons and a single activation handler so one tap produces one turn. Apply `touch-action: none` to the board. Targets are at least 44×44 px.
- **Keyboard:** use Tab to enter or leave the board, arrow keys to move between cells without wrapping, and Enter or Space to turn the focused tile. Keep one tile in the board’s Tab order. The fixed power tile can receive focus for inspection. Start, retry and copy use native button controls.
- **Focus:** move focus to A3 when play starts and to **Play again** when the result appears. Suppress scrolling for handled board keys. Ignore repeated activation from held keys.
- Provide a visible focus ring distinct from the first-turn highlight. Announce the changed tile’s connections and the updated counters through one polite live region after each turn.

## Board and scoring

Rows A–D run top to bottom and columns 1–4 run left to right. The table gives the ports before rotation and the number of clockwise quarter-turns applied at the beginning of each round. `N`, `E`, `S`, `W` are board-relative directions.

| Tile | Type | Ports before rotation | Starting quarter-turns |
|---|---|---|---:|
| A1 | Fixed power source | E | 0 |
| A2 | Wire | W, E, S | 0 |
| A3 | Wire | W, S | 3 |
| A4 | Bulb | S | 1 |
| B1 | Bulb | S | 2 |
| B2 | Wire | N, S | 1 |
| B3 | Wire | N, E, S | 0 |
| B4 | Wire | W, N, S | 2 |
| C1 | Wire | N, E, S | 3 |
| C2 | Wire | W, N | 1 |
| C3 | Wire | N, S | 0 |
| C4 | Wire | N, S | 1 |
| D1 | Wire | N, E | 2 |
| D2 | Bulb | W | 3 |
| D3 | Bulb | N | 0 |
| D4 | Bulb | N | 3 |

- Pair ports only when both adjacent tiles open toward each other. After each turn, traverse the connected tiles from A1 with a visited set. Count a bulb as lit only while reachable.
- Each successful rotation costs one turn. Pressing A1 costs zero. A connection can go dark again during play.
- Five powered bulbs complete the round. The all-zero orientation is a reference solution. A3’s first clockwise turn from the start powers D3.
- The score is the number of turns taken to complete the board. Lower is better. The first completion sets the best. Subsequent completions earn **새 기록 / New best** only if they improve it. Ties retain the existing best.

## Visual design

- Use a deep evergreen background (`#10251F`), dark green tiles (`#1B342C`), cream text (`#F8F1DD`), muted silver for unpowered wires and warm gold (`#FFD074`) for powered wires. Draw the plug, wires and bulbs with inline SVG. Use both brightness and new shapes to show current: powered wires get a solid inner stroke and lit bulbs gain a small ray outline.
- Keep all four tile rows and the current screen’s buttons visible at 320×480. Fit the square board to the smaller available dimension after reserving space for copy and controls, with 44 px minimum cells and a desktop board cap of 400 px. Use system fonts, a single centered column, and no scrolling.
- Turn the SVG tile art over about 100 ms. Give newly lit bulbs a short pulse and leave the solved board fully lit as a screenshot-ready result. Apply the board state and score immediately. Under `prefers-reduced-motion`, swap directly to the new art and skip pulses.
- Use `requestAnimationFrame` for timed effects, cap elapsed time at 50 ms per frame and stop animation while the page is hidden. The game is silent.

## Export and copy

Copy the localized text below, without a URL. Call `navigator.clipboard.writeText` from the copy action. If clipboard access is unavailable or denied in the iframe, show the inline screenshot message. Keep the solved board and score visible. Announce either result in the live region. While a copy is pending, ignore another copy request, and discard stale feedback if the player has already retried.

## Strings

Read `?lang=ko` or `?lang=en`. For a missing or unsupported value, use Korean when `navigator.language` starts with `ko` and English otherwise. Set `<html lang>` and the document title. Keep metadata, visual text, accessible labels and copied text in the same bilingual dictionary. Format count placeholders with the active locale.

| Key | ko | en |
|---|---|---|
| `appTitle` | 크리스마스 전구 잇기 | Christmas Lights Puzzle |
| `startHint` | 타일을 돌려 전구 다섯 개를 모두 켜세요. | Turn the tiles to light all five bulbs. |
| `start` | 시작 | Start |
| `boardLabel` | 전구 퍼즐판 | Light puzzle board |
| `firstHint` | 맨 위 줄에서 반짝이는 타일을 돌려 보세요. | Turn the highlighted tile in the top row. |
| `bulbs` | 켠 전구 {lit}/5 | Lights {lit}/5 |
| `turns` | {count}번 회전 | Turns: {count} |
| `complete` | 전구를 모두 켰어요! | All five bulbs are lit! |
| `best` | 최소 회전 {count}번 | Best: {count} turns |
| `newBest` | 새 기록 | New best |
| `retry` | 다시 하기 | Play again |
| `copy` | 기록 복사 | Copy score |
| `copied` | 기록을 복사했어요. | Score copied. |
| `copyFailed` | 기록을 복사할 수 없어요. 화면을 캡처해 주세요. | Couldn’t copy the score. Take a screenshot to share it. |
| `shareText` | 크리스마스 전구 잇기 🎄 {turns}번 돌려 전구 5개 켜기 성공! | Christmas Lights Puzzle 🎄 I lit all 5 bulbs in {turns} turns! |
| `tileLabel` | {row}행 {col}열, {type}. 연결 방향 {ports}. {power}. | Row {row}, column {col}, {type}. Ports {ports}. {power}. |
| `source` | 고정 전원 | Fixed power source |
| `wire` | 전선 | Wire |
| `bulb` | 전구 | Bulb |
| `north / east / south / west` | 위 / 오른쪽 / 아래 / 왼쪽 | Up / right / down / left |
| `powered / unpowered` | 전원 연결됨 / 전원 끊김 | Powered / Unpowered |
| `turnAnnouncement` | {tileLabel} {bulbs}, {turns}. | {tileLabel} {bulbs}, {turns}. |

For `tileLabel`, substitute numeric row and column, join ports with commas in clockwise order starting at north, and use the live circuit state for `{power}`. Decorative art has no accessible label. Use `bulbs`, `turns` and `complete` for the corresponding result announcement.

## localStorage

- `christmas-lights-puzzle:best:v1` — Decimal string for the lowest positive integer turn count recorded on a completed round. Accept only positive safe integers in canonical decimal form. Missing or invalid data means no persisted best.
- Wrap every read and write in `try/catch`. Read the stored best again at completion and prefer the lowest valid value among it, the in-memory best and the new score. Keep a session best if persistence fails. Store only the best score.

## Edge cases

- Rotation is a discrete action. Apply it once, recompute the circuit and check for completion before handling another action. Clear any running tile effects from the previous round when retrying.
- Multiple paths or loops can occur in intermediate states. Traverse each tile once and count each powered bulb once. Wires pointing outside the board have no neighbor.
- Resizing or rotating the device preserves tile orientations, turn count, current screen and focused control. Returning from a hidden tab preserves the same board and counters.
- At 320×480, longer English strings can wrap. Keep copy feedback in a reserved line area beneath the buttons so it cannot cover the score or move the controls.
- Verify that the fixed start has zero lit bulbs, one turn on A3 lights D3, restoring the reference orientations lights all five, and retry resets the round while retaining the best. Check mouse, touch and keyboard play in both languages, reduced motion, blocked storage and rejected clipboard access.
- Before publishing, run `npm test`, `npm run build` and `npm run qa -- --thumbs`. Check that the generated `thumb.png` shows a readable game screen.

## Must not

- No external assets, fonts, scripts, requests, analytics or accounts. Ship the entire game in `items/christmas-lights-puzzle/index.html`, with the required separate `meta.json` and QA-generated `thumb.png`.
- No raster artwork, video, copied game boards, real brands or imitation of an existing game’s visual design.
- No timers, move limits, randomized layouts or scoring bonuses. Every player starts with the same board and every rotation costs one turn.
- No audio, flashing effects, page scrolling, dialogs, pop-ups or navigation away from the item.