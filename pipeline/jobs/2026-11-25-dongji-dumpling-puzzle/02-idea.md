# Idea and spec: 동지 팥죽 새알심 퍼즐 / Winter Solstice Dumpling Puzzle

## Concepts scored

Scores are 1–5 for value in the first 10 seconds, originality, Korean search/share demand, and buildability in one HTML file. Maximum 20. Demand scores are editorial estimates informed by the supplied research and backlog. [November 25 research](pipeline/jobs/2026-11-25-pending/01-research.md)

| Concept | Category | First 10 sec | Originality | Korean search/share | Buildability | Total | Verdict |
|---|---|---:|---:|---:|---:|---:|---|
| **동지 팥죽 새알심 퍼즐 / Winter Solstice Dumpling Puzzle** | **games** | **5** | **4** | **4** | **5** | **18** | **Picked.** The first dumpling moves on the first turn. The three completed bowls frame a score friends can compare, and `동지 팥죽` and `새알심` give the title a seasonal search hook. |
| 문틈 문풍지 길이 계산기 / Door Draft Strip Calculator | tools | 4 | 3 | 4 | 5 | 16 | Enter door measurements and choose which edges to seal. The tool totals the strip length and shows each cut on a door diagram. |
| 분실 우산 박물관 / Museum of Lost Umbrellas | weird | 5 | 4 | 2 | 5 | 16 | Open a fictional lost umbrella to reveal the absurd museum label hidden under its canopy. Each umbrella is an original CSS illustration. |

## Meta

slug `dongji-dumpling-puzzle`

- **category** `games`
- **kind** `game`
- **aspect** `9/16`
- **date** `2026-11-25`
- **tags** ko `동지`, `팥죽`, `새알심`, `순서 퍼즐` · en `winter solstice`, `red bean porridge`, `rice dumplings`, `sequence puzzle`
- **title ko** 동지 팥죽 새알심 퍼즐
- **title en** Winter Solstice Dumpling Puzzle
- **desc ko** 국자에 놓인 새알심 아홉 알을 순서대로 옮겨 팥죽 세 그릇을 완성하세요. 다음 모양까지 살펴보고 한 번도 되돌리지 않으면 만점이에요.
- **desc en** Fill three bowls of red bean porridge with nine rice dumplings. Read the queue and match each bowl’s pattern to earn a perfect score.
- **howto ko** 맨 앞 새알심의 모양과 그릇의 다음 칸을 맞추세요. 그릇을 누르거나 숫자키 1~3을 쓰세요. 막히면 되돌리기 또는 Z 키를 누르세요.
- **howto en** Match the first dumpling to a bowl’s next slot. Tap a bowl or press 1–3. If you get stuck, use Undo or press Z.
- **about ko** 동지 팥죽에 들어가는 새알심을 소재로 만든 순서 퍼즐이에요. 동그라미, 세모, 네모는 게임에서 순서를 구분하는 표시예요.
- **about en** A sequence puzzle inspired by the rice dumplings in Korean winter solstice porridge. Circles, triangles, and squares mark the puzzle pieces.

## Pitch

A ladle holds nine dumplings above three bowls of red bean porridge. Each bowl has a three-slot recipe, and only its next empty slot can accept a dumpling. The whole queue is visible. The first circle fits two bowls, but the choice changes where later dumplings can go. Fill all three bowls with as few undos as possible.

The board has one solution, and everybody plays the same layout. A clean run earns 9 points. The finished bowls stay on screen for a screenshot.

## Flow

1. **Start.** Show the title, one-line instruction, an illustration of the ladle and three bowls, and a large start button. List the three shape names beside their symbols.
2. **Play.** Show the full remaining queue, the three bowl recipes, placed count, undo count, status line, and Undo. The first dumpling is selectable as soon as the screen opens. After each placement, advance the queue and mark the bowl’s next slot.
3. **Stuck.** Keep the board visible and highlight Undo when no bowl can take the first dumpling. One undo may be enough, and the player can rewind all the way to the opening move.
4. **Result.** Show all three filled bowls, the score, best score, undo count, and a large retry button. A 9-point finish gets the perfect-score headline. Retry opens a fresh board immediately.

## Controls

| Action | Touch or mouse | Keyboard |
|---|---|---|
| Start or retry | Tap or click the primary button | Tab to the button and press Enter or Space |
| Place the first dumpling | Tap or click bowl 1, 2, or 3 | Press `1`, `2`, or `3`, or focus the bowl and press Enter or Space |
| Undo one placement | Tap or click Undo | Press `Z`, or focus Undo and press Enter or Space |

Use native buttons with visible focus rings and targets at least 44 × 44 px. Use pointer events for pressed feedback and the native `click` event for activation so each tap commits once. Handle number and undo shortcuts only during play with focus inside the item. Ignore modifier shortcuts and repeated keydown events. Prevent default only for game shortcuts the item handles. Preserve normal Tab navigation and use `touch-action: manipulation` on the buttons.

## Board and scoring

Bowls are numbered left to right. Each recipe is read left to right.

| Bowl | Slot 1 | Slot 2 | Slot 3 |
|---|---|---|---|
| 1 | ○ | △ | □ |
| 2 | ○ | □ | △ |
| 3 | △ | ○ | □ |

**Starting queue:** `○ △ □ ○ □ ○ △ □ △`

- A legal move places the first dumpling in the selected bowl’s next slot, advances the queue, and records the bowl in move history. The state updates immediately. Animation follows the state change.
- Selecting a full bowl or a bowl whose next slot differs leaves the queue and score unchanged. Show the corresponding status. If the board is already stuck, keep the stuck message visible.
- Undo pops exactly one successful placement, returns its dumpling to the front of the queue, reopens the slot, and increments the undo count by one. Undo is available whenever the history is nonempty and counts even if the player immediately repeats the move.
- The ninth legal placement completes the round. Final score is `max(0, 9 − undoCount)`. The first completed round sets the best score, including a zero-point round. Later rounds replace it only when the score is higher.
- The unique clean solution is `2, 3, 2, 3, 3, 1, 1, 1, 2`. To verify recovery, place the first dumpling in bowl 1 and the second in bowl 3. The third dumpling has no legal destination. Undo once, then place the second dumpling in bowl 1 to continue from a legal state.

## Screen layouts and visual design

- **Start.** Use a centered title, a small overhead illustration, and a full-width start button. Draw the illustration in inline SVG and keep it decorative. Put the three-symbol key under the illustration.
- **Play and stuck.** Put placed and undo counts on one line. Put the queue below them in nine fixed slots, with the first occupied slot emphasized by a thick outline and the `next` label. Put the three bowl buttons in one row and show each recipe as three slots beneath its bowl number. Completed slots are filled, the immediate next slot is outlined, and later slots use a dashed outline. In the stuck state, emphasize Undo with a solid accent border and explanatory status text.
- **Result.** Keep the three bowls in the same order and replace the queue with the result headline and score. Put best score and undo count underneath, followed by the retry button.
- **Palette and type.** Use a warm paper background `#FFF4DF`, ink `#301C25`, red bean porridge `#671E35`, cream dumplings `#FFF8E8`, and teal `#14665D` for focus and active slot outlines. Use system UI fonts and render the three symbols as inline SVG geometry. Filled, outlined, and dashed slots remain distinguishable in grayscale.
- **Feedback.** Animate a successful placement with a 160 ms arc and a small ripple. Use one animation frame loop while an effect is active, cap delta time at 50 ms, and suspend frames when the document is hidden. Under `prefers-reduced-motion`, update slots and status instantly. The game is silent.
- **Responsive layout.** Use a full-viewport root with `100dvh` and a `100vh` fallback. Keep the content centered at a maximum width of 440 px. At 320 × 480, shrink decorative art and vertical gaps first. Keep the queue, all three bowls, status, and Undo visible without page scrolling.
- **Focus and announcements.** Focus the start button on entry, bowl 1 on starting or retrying, and the result heading on completion. Keep control focus stable during play. Use one polite live region for action feedback, including the next dumpling after a successful placement or undo. When an action creates a stuck state, announce the stuck message in that region in place of the move feedback. Make the queue available in reading order as a list of localized shape names.

## Strings

Use a `{ ko: {...}, en: {...} }` dictionary for visible copy and accessible names. The title row also supplies the browser tab title. `{shape}` uses the localized shape names below. `{name}` uses the localized `bowl` string for the affected bowl.

| Key | Korean | English |
|---|---|---|
| `title` | 동지 팥죽 새알심 퍼즐 | Winter Solstice Dumpling Puzzle |
| `startHelp` | 맨 앞 새알심을 알맞은 그릇에 담아 세 그릇을 채우세요. | Match the first dumpling to a bowl and fill all three bowls. |
| `start` | 시작하기 | Start |
| `circle` | 동그라미 | Circle |
| `triangle` | 세모 | Triangle |
| `square` | 네모 | Square |
| `queue` | 새알심 순서 | Dumpling queue |
| `next` | 다음 | Next |
| `nextShape` | 다음 새알심은 {shape}입니다. | Next dumpling is {shape}. |
| `bowl` | {n}번 그릇 | Bowl {n} |
| `bowlOpenLabel` | {name}. {filled}/3알. 다음 칸은 {shape}. | {name}. {filled}/3 filled. Next slot is {shape}. |
| `bowlFullLabel` | {name}. 모두 채움. | {name}. Full. |
| `placedCount` | 담은 새알심 {n}/9 | Dumplings placed {n}/9 |
| `undoCount` | 되돌리기 {n}회 | Undos {n} |
| `undo` | 되돌리기 | Undo |
| `playHelp` | 맨 앞 새알심과 그릇의 다음 칸을 맞추세요. | Match the first dumpling to a bowl’s next slot. |
| `placed` | {name}에 담았어요. | Placed in {name}. |
| `mismatch` | {name}의 다음 칸은 {shape}예요. | {name} needs {shape} next. |
| `full` | {name}은 이미 다 찼어요. | {name} is already full. |
| `undone` | 마지막에 담은 새알심을 되돌렸어요. | Returned the last dumpling to the queue. |
| `stuck` | 놓을 그릇이 없어요. 되돌려서 다른 순서로 담아 보세요. | No bowl can take this dumpling. Undo and try a different order. |
| `finished` | 팥죽 세 그릇 완성! | Three bowls ready! |
| `perfect` | 되돌리기 없이 세 그릇 완성! | Three bowls, zero undos! |
| `score` | 점수 {n}/9 | Score {n}/9 |
| `best` | 최고 점수 {n}/9 | Best {n}/9 |
| `retry` | 다시 하기 | Play again |

## localStorage

- `dongji-dumpling-puzzle:best:v1` holds a single ASCII digit from `0` through `9`. A missing or invalid value means no completed round is recorded.
- Read and write inside `try/catch`. Keep the best score in memory for the current page so blocked storage still supports score comparison across retries.
- Write only after a real completed round. Keep move history, current score, and language in page state.

## Edge cases

- Read `?lang=ko` or `?lang=en` at load. Missing or unsupported values fall back to Korean when `navigator.language` starts with `ko`, and English otherwise. Set `<html lang>` before the first render.
- Validate each placement against the current board. Ignore gameplay shortcuts after completion and prevent duplicate activation when tapping or clicking rapidly.
- If the player undoes every placement, restore the identical starting queue. Keep the accumulated undo count until retry.
- Hide or resize the iframe mid-move without changing board state or consuming a turn. Redraw from committed state. Reload opens Start and retains the stored best score.
- `#demo` opens a completed 9-point board for thumbnail QA. It reads and writes no score data, shows 9 as the demo best, and Retry opens regular play with persistence restored.
- Verify the clean solution, a stuck-and-undo run, a zero-point completion, and a full retry with blocked storage. Check both languages at 320 × 480 with pointer and keyboard. Run `npm test`, `npm run build`, and `npm run qa -- --thumbs` before publishing. Inspect the generated thumbnail for all three filled bowls and a legible score.

## Must not

- Keep the playable item in one `index.html` with inline CSS, JavaScript, and SVG. No network requests, external fonts, scripts, analytics, raster game art, or video. Generate `thumb.png` through QA.
- No copied characters, artwork, levels, or interface. No brands or real people.
- No countdowns, speed bonuses, or reaction gates. Players can inspect the complete remaining queue on every turn.
- No sound, browser dialogs, pop-ups, navigation away, accounts, or score uploads.
- No date locks, fortune claims, or claims that the puzzle’s three shapes are part of the Dongji tradition.