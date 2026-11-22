# Idea and spec: 곶감 바람길 퍼즐 / Persimmon Breeze Puzzle

## Concepts scored

Scores run from 1 to 5 in each column. Korean search and share scores are editorial estimates based on the supplied research and backlog. The research rates the persimmon trend signal as low confidence.

| Concept | Category | First 10 seconds | Originality | Korean search/share demand | One-HTML buildability | Total | Verdict |
|---|---|---:|---:|---:|---:|---:|---|
| **곶감 바람길 퍼즐 / Persimmon Breeze Puzzle**. Turn a wooden rack’s vents so the wind reaches every hanging persimmon. | `puzzle` | 5 | 5 | 3 | 5 | **18** | **Picked.** The first rack clears in one turn, and the completed rack makes a recognizable winter screenshot. |
| 술값 빼는 N빵 계산기 / Drinks-Optional Bill Split. Enter the food and drinks totals separately and see what each person owes. | `tools` | 4 | 3 | 5 | 5 | 17 | Strong Korean search vocabulary and a clear backlog fit. Its first payoff depends on entering the bill. |
| 겨울 창가 소리 믹서 / Winter Window Sound Mixer. Blend synthesized window wind, pencil scratches, and a radiator hum. | `chill` | 4 | 4 | 3 | 4 | 15 | The tactile sound direction fits the research. The first payoff depends on audio availability and listening conditions. |

## Meta

slug `persimmon-breeze-puzzle`

- Category `puzzle`, kind `game`, aspect `9/16`, date `2026-11-22`
- Tags ko `곶감`, `바람길 퍼즐`, `겨울 게임`. Tags en `persimmon`, `pipe puzzle`, `winter game`.
- `ko.title` — 곶감 바람길 퍼즐
- `ko.desc` — 나무 건조대의 통풍구를 돌려 곶감마다 바람을 보내세요. 한 번 돌리면 풀리는 첫 판부터, 구불구불한 바람길을 만드는 마지막 판까지 총 세 판이에요.
- `ko.howto` — 칸을 누르면 통풍구가 시계 방향으로 돌아가요. 입구에서 출구까지 이어지는 바람길에 곶감을 모두 넣으세요. 키보드는 방향키로 칸을 고르고 Enter 또는 Space로 돌려요.
- `ko.about` — 겨울 곶감 건조대에서 착안한 세 판짜리 길 잇기 퍼즐이에요. 시간제한 없이 풀고, 회전을 아껴 최고 점수에 도전하세요.
- `en.title` — Persimmon Breeze Puzzle
- `en.desc` — Turn the vents on a wooden drying rack to send a breeze past every persimmon. Start with a one-turn puzzle, then solve two winding racks.
- `en.howto` — Tap a tile to turn it clockwise. Connect the inlet to the outlet through every persimmon. On a keyboard, use the arrow keys to choose a tile and Enter or Space to turn it.
- `en.about` — A three-rack route puzzle inspired by winter persimmon racks. Take your time and try to beat your best score with fewer turns.

## Pitch

A breeze enters a little wooden drying rack from the left. Turn the vents to guide it past the hanging persimmons and out the right side. Connected channels light up as you turn them, and each fruit warms to amber when the breeze reaches it. The first rack teaches the rule in a single turn. The next two send the breeze around corners and down through the rack.

## Flow

1. **START** — Show the title, the first rack in its starting orientation, the one-line instruction, the best score, and `시작 / Start`. The preview is static. Start makes the rack interactive and focuses its middle tile.
2. **PLAY** — Show the rack number, the current rack’s turn count, the rack, the instruction, and `이 판 처음부터 / Reset this rack`. Each turn updates the visible airflow and the reached fruit count. There is no timer.
3. **RACK CLEAR** — Keep the solved rack visible and lock its tiles. Show the clear message and rack points. A short pulse runs from the inlet to the outlet. Show `다음 건조대 / Next rack` for racks 1 and 2, or `결과 보기 / See results` for rack 3. The user advances explicitly.
4. **RESULT** — Show the solved third rack as a static illustration, the final score, the best score, and the total number of turns. Show `새 기록! / New best!` if the run strictly beats the previous best. `다시 하기 / Play again` starts a fresh run on rack 1.

## Controls

- **Touch and mouse** — Tap or click a vent to rotate it 90° clockwise. Use the same activation handler for pointer, keyboard, and assistive technology input so each activation counts once. Native buttons handle Start, Reset, Next, Results, and Play again.
- **Keyboard** — Tab enters and exits the rack through a single roving tab stop. Arrow keys move focus to the next vent in that row or column, skipping blocked cells. Focus stays put if there is no vent in that direction. Enter and Space rotate the focused vent once per press. Ignore key repeat and prevent defaults for keys handled by the rack.
- **Focus** — On each new rack, focus the first adjustable vent in row-major order, except on rack 1, where focus goes to the middle tile. Reset restores the rack’s starting focus. Clears focus the advance button, and Results focuses its heading.
- **Touch layout** — Every interactive target is at least 44 × 44 px. Use `touch-action: none` on the rack. Maintain a visible focus ring and use native button semantics.

## Racks and scoring

Each rack is a 3 × 3 grid. `N`, `E`, `S`, and `W` are open edges. `#` is a fixed wooden cell. The inlet lies west of `(2,1)` and the outlet east of `(2,3)`. Coordinates are one-based `(row,column)`. Each vent has two openings that rotate together. A straight vent has two distinct orientations. A corner has four.

| Rack | Starting vents, top to bottom | Persimmon cells | Example solved vents, top to bottom |
|---|---|---|---|
| 1 | `# # #` / `EW NS EW` / `# # #` | `(2,2)` | `# # #` / `EW EW EW` / `# # #` |
| 2 | `NE ES #` / `NW NW EW` / `# # #` | `(1,2)`, `(2,2)` | `ES SW #` / `NW NE EW` / `# # #` |
| 3 | `# NW ES` / `ES EW NW` / `NE SW #` | `(3,1)`, `(1,2)`, `(1,3)` | `# ES SW` / `SW NS NE` / `NE NW #` |

- Trace from the inlet through matching openings on neighboring vents. Stop at the outlet, a blocked or mismatched edge, any other boundary, or a repeated cell. Only inlet-connected vents light up. A fruit counts as reached when its cell is on that trace, even if the trace ends at its outgoing edge.
- Clear the rack when the trace exits at the designated outlet and reaches every fruit. If the outlet is reached early, show the missing-fruit message and keep the rack playable. Evaluate the route itself so any valid solution clears.
- Each turn of a vent adds one to the current rack’s turn count. Reset restores initial orientations and preserves that count. Reset itself adds zero turns.
- A cleared rack earns `max(20, 100 − 5 × turns)`. The final score is the sum of three rack scores. Total turns is the sum of the three rack turn counts. The example solutions take 1, 3, and 7 turns, yielding 245 points and 11 total turns.
- Award each rack once. Update the best score when the third rack clears. Show the final score only on the result screen.

## Visual design

- Use inline SVG channels and fruit illustrations inside HTML buttons. Use warm paper `#FFF3DC`, dark ink `#392518`, wooden tiles `#D3A46F`, persimmon orange `#B74822`, and deep teal `#006B68` for active airflow.
- Mark active channels with a directional dash pattern as well as color. Add a check mark beneath each reached fruit. Keep the inlet and outlet distinct with directional arrows and labels. Direction labels in the accessible tile names describe every orientation.
- Use system-ui text and tabular digits for scores. Keep the title and rack centered. At 320 × 480, fit the rack, status, and controls in the viewport with 12 px side padding. In short landscape layouts, place status and controls beside the rack. Fit the full iframe using viewport units and recompute on resize. The document never scrolls.
- Use a 180 ms turn transition and a clear pulse of up to 350 ms. Update the logical orientation and the route immediately. Drive the advancing airflow pulse with `requestAnimationFrame` and cap frame delta at 50 ms. Pause while hidden and reset the frame timestamp on return. Under `prefers-reduced-motion`, use immediate turns and static airflow highlights.
- Use silent feedback throughout.

## Strings

Use the selected language dictionary for all visible text, the document title, and accessible names and announcements. Read `?lang=ko` or `?lang=en`. For missing or unsupported values, use Korean if `navigator.language` starts with `ko` and English otherwise. Set `<html lang>` accordingly. `{r}`, `{n}`, and `{total}` are localized numbers. `{a}` and `{b}` are localized direction names in fixed north, east, south, west order.

| Key | ko | en |
|---|---|---|
| `title` | 곶감 바람길 퍼즐 | Persimmon Breeze Puzzle |
| `startHelp` | 통풍구를 돌려 모든 곶감에 바람을 보내고 출구까지 이으세요. | Turn the vents to send the breeze past every persimmon and out the other side. |
| `start` | 시작 | Start |
| `rack` | 건조대 {r}/3 | Rack {r}/3 |
| `boardLabel` | 건조대 퍼즐 | Drying rack puzzle |
| `previewLabel` | 첫 건조대 미리보기 | First rack preview |
| `finishedRackLabel` | 바람길이 완성된 마지막 건조대 | Final rack with the breeze route complete |
| `turns` | 회전 {n}회 | Turns: {n} |
| `fruitCount` | 바람이 닿은 곶감 {n}/{total} | Persimmons reached: {n}/{total} |
| `inlet` | 입구 | Inlet |
| `outlet` | 출구 | Outlet |
| `reset` | 이 판 처음부터 | Reset this rack |
| `resetStatus` | 통풍구를 처음 위치로 돌렸어요. 회전 횟수는 그대로예요. | Vents reset. Your turn count stays the same. |
| `outletEarly` | 출구에 닿았어요. 남은 곶감에도 바람을 보내세요. | The breeze reached the outlet. Route it past the remaining persimmons. |
| `cleared` | 모든 곶감에 바람이 닿았어요! | The breeze reached every persimmon! |
| `rackPoints` | 이번 판 점수 {n}점 | Rack score: {n} |
| `next` | 다음 건조대 | Next rack |
| `results` | 결과 보기 | See results |
| `resultTitle` | 바람길 완성! | Breeze route complete! |
| `score` | 점수 {n}점 | Score: {n} |
| `best` | 최고 점수 {n}점 | Best score: {n} |
| `totalTurns` | 총 회전 {n}회 | Total turns: {n} |
| `newBest` | 새 기록! | New best! |
| `retry` | 다시 하기 | Play again |
| `vent` | {row}행 {col}열, 통풍구 방향 {a}·{b} | Row {row}, column {col}, vent opens {a} and {b} |
| `fruitReached` | {tile}, 곶감에 바람이 닿음 | {tile}, persimmon reached |
| `fruitUnreached` | {tile}, 곶감에 바람이 아직 닿지 않음 | {tile}, persimmon waiting for a breeze |
| `north` / `east` / `south` / `west` | 위 / 오른쪽 / 아래 / 왼쪽 | up / right / down / left |

Use `vent` to form `{tile}` in fruit-cell labels. Treat SVG channels, check marks, and fixed wood cells as decorative for assistive technology. Give the play screen one polite status region for fruit progress, reset, and the outlet message. Announce a clear once through the focused advance button’s description.

## localStorage

- `persimmon-breeze-puzzle:best:v1` stores the best score as a base-10 integer string. Missing, malformed, or out-of-range values default to `0`. Accept only integers from `0` to `300`.
- Wrap reads and writes in `try/catch`. Maintain the best in memory if storage is unavailable. Read the stored best again at the end of a run and retain the highest valid score seen. Keep in-progress boards and turn counts in memory.

## Edge cases

- A route can reach fruit and stop at a blocked or mismatched edge. Keep the reachable segment highlighted and leave the controls available. A disconnected loop stays unlit.
- Rapid intentional turns each count once. A turn that clears the rack locks input synchronously. Repeated activation of an advance button cannot skip a rack or award points twice.
- Reset acts only during active play. Play again clears the run’s score, turns, cleared flags, and orientations while retaining the best score. A reload opens Start.
- Results remain readable when storage is blocked, the iframe is resized, the page is backgrounded during a pulse, or reduced motion is enabled mid-run.
- Before publishing, run `npm test`, `npm run build`, and `npm run qa -- --thumbs`. Check both languages at 320 × 480, complete a keyboard-only run, confirm the 245-point reference run, verify a blocked-storage run, and inspect the generated thumbnail.

## Must not

- No network requests, remote assets, external fonts, libraries, analytics, or raster or video game art. Put all gameplay, styling, and artwork in `items/persimmon-breeze-puzzle/index.html`, with metadata in `meta.json` and `thumb.png` generated by QA.
- No real brands or people, copied puzzles or artwork, or claims about actual food-drying methods.
- No timer, forced advance, autoplay audio, scrolling document, modal browser dialogs, pop-up windows, or navigation away from the item.