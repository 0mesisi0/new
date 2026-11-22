# Idea and spec: 선물 포장 챌린지 / Gift Wrap Dash

## Concepts scored

Each score is 1–5. Korean search and share scores are editorial estimates based on the supplied research and backlog.

| Concept | Category | First 10 seconds | Originality | Korean search/share demand | One-HTML buildability | Total |
|---|---|---:|---:|---:|---:|---:|
| **선물 포장 챌린지 / Gift Wrap Dash** — Follow the fold order on each gift tag and see how many parcels you can wrap in 30 seconds. | `arcade` | 5 | 4 | 4 | 5 | **18** |
| 올해 남은 주말 / Weekends Left This Year — See the remaining Saturdays and Sundays on a compact calendar, with today highlighted. | `tools` | 5 | 3 | 4 | 5 | 17 |
| 유리창 김서림 / Fogged Window — Wipe a fogged window with your finger to reveal a lit winter street before the glass clouds over again. | `chill` | 5 | 4 | 3 | 4 | 16 |

**Pick Gift Wrap Dash.** The first tap folds a full sheet of paper, and the first finished parcel can land within a few seconds. The brief’s year-end gift theme gives it a seasonal hook, and a fixed parcel order lets friends compare scores on the same challenge.

## Meta

slug `gift-wrap-dash`

- category `arcade`, kind `game`, aspect `9/16`, date `2026-11-22`
- tags ko `선물 포장`, `크리스마스 게임`, `연말`
- tags en `gift wrapping`, `Christmas game`, `year-end`
- title ko `선물 포장 챌린지`
- title en `Gift Wrap Dash`
- desc ko `선물 태그에 적힌 순서대로 포장지를 접어 보세요. 30초 동안 상자를 몇 개나 포장할 수 있을까요?`
- desc en `Fold the paper in the order shown on each gift tag. How many boxes can you wrap in 30 seconds?`
- howto ko `태그의 화살표를 왼쪽부터 읽고, 같은 화살표가 붙은 포장지를 누르세요. 키보드 방향키로도 접을 수 있어요.`
- howto en `Read the arrows on the tag from left to right. Tap the matching paper flap or press the corresponding arrow key.`
- about ko `상자는 매번 같은 순서로 나와요. 친구와 30초 기록을 비교해 보세요.`
- about en `The boxes come in the same order every round. Compare your 30-second score with a friend.`

## Pitch

An unwrapped box sits on a kraft-paper workbench with four paper flaps around it. Read the four arrows on its gift tag, then fold the matching flaps one at a time. The fourth fold seals the box with a star sticker and brings up the next parcel. The result card pairs the number wrapped with a small stack of finished gifts.

## Flow

1. **START** — Show the title, the one-line fold instruction, an open parcel with a sample tag, and a large **포장 시작 / Start wrapping** button. The preview is decorative. Starting immediately reveals the first playable parcel and starts the 30-second clock.
2. **PLAY** — Show whole seconds remaining and the parcel count above the board. Display the four-arrow tag in reading order, mark the current arrow with an outline, and put a checkmark on each completed step. A correct input folds the flap inward around its crease. A wrong, unfolded flap briefly nudges and displays the instruction to follow the next arrow. The current step stays active and the clock keeps running.
3. **RESULT** — At zero, replace the board with a centered card showing the parcel count, best score, and a new-record label when applicable. Show up to three wrapped parcels behind the card, or one open parcel for a zero score. A large **다시 포장하기 / Wrap again** button starts a fresh round immediately.

## Controls

- **Touch and mouse:** tap or click a flap to fold it. Use pointer events for flaps, accept one primary pointer at a time, and commit on release inside the same flap. Use native buttons for start and retry.
- **Keyboard:** arrow keys select the flap on that side of the box. A focused flap also supports Enter or Space. Ignore held-key repeats. Start and retry use native Enter and Space activation.
- **Focus:** initially focus Start. On entering Play, focus the playfield so arrows work immediately. Tab can reach the four flaps in top, right, bottom, left order, skipping folded flaps. When a focused flap folds, return focus to the playfield. On game over, focus Retry.
- **Sizing:** every interactive target is at least 44 × 44 CSS px. Apply `touch-action: none` to the playfield and prevent the default scrolling action for handled game keys. Keep Tab navigation available.

## Parcel rules and scoring

An arrow names the side the flap starts on. Its tip points outward on both the tag and the flap, while the paper animation always folds inward. Every parcel has two opposing flap pairs. The second flap of each pair visually overlaps the first.

| Parcel | Fold order | Paper pattern |
|---|---|---|
| 1 | ← → ↑ ↓ | Cranberry stripes |
| 2 | ↑ ↓ → ← | Pine dots |
| 3 | → ← ↓ ↑ | Blue checks |
| 4 | ↓ ↑ ← → | Gold stars |
| 5 | ← → ↓ ↑ | Pine dots |
| 6 | ↑ ↓ ← → | Blue checks |
| 7 | → ← ↑ ↓ | Gold stars |
| 8 | ↓ ↑ → ← | Cranberry stripes |

- Repeat the table from parcel 1 after parcel 8. Start every round at parcel 1.
- Award one point on the fourth correct fold. An unfinished box earns zero points. Wrong inputs carry no deduction.
- Commit each accepted fold immediately. Use a 120 ms input lock after the first three folds. After the fourth, show the seal and install the next parcel after 240 ms. Ignore input during either lock.
- Start at `30` and display the ceiling of remaining active seconds. Before accepting any fold, check the active elapsed time. A fourth fold accepted before 30,000 ms counts even if the seal animation is still playing when time expires. At or after 30,000 ms, open the result before processing the input.
- A completed round sets a new record only if its score strictly exceeds the prior best. A first score of zero displays zero as the best without a record label.

## Visual design

- **Workbench:** warm cream `#F3E7D1`, dark ink `#252720`, cranberry `#A52A46`, pine `#245748`, blue `#315B79`, and gold `#C28B39`. Keep text on cream or another high-contrast surface. Use system-ui with tabular numerals for the timer and score.
- **START:** place the open parcel under the title and one-line instructions. Its broad flaps and stitched gift tag preview the interaction. Keep the primary button visible in the first viewport.
- **PLAY:** center a cross-shaped board around the square box. Use real buttons over inline SVG or CSS paper shapes. Give the current tag arrow an outline and completed arrows checkmarks, so order remains legible without color. Keep completed folds visible inside the box in their layer order.
- **RESULT:** give the parcel count the largest type and place the best score directly below it. Keep the title and both scores inside the same card for screenshots.
- **Layout and motion:** fill the iframe with a responsive, centered column capped at 480 CSS px. At 320 × 480, shrink the illustration and decorative gaps while keeping tap targets and labels readable. Recompute board sizing on resize and keep the page free of scrolling. With `prefers-reduced-motion`, swap paper layers instantly, use a static outline for errors and seals, and keep the same input timings.
- **Sound:** silent in all states.

## Strings

All visible text and accessible names come from a `{ ko: {...}, en: {...} }` dictionary. Use `?lang=ko` or `?lang=en` when valid. Otherwise use Korean for a `navigator.language` beginning with `ko` and English for other values. Set `<html lang>` and the document title from the selected locale.

| Key | ko | en |
|---|---|---|
| title | 선물 포장 챌린지 | Gift Wrap Dash |
| startHint | 태그의 화살표 순서대로 포장지를 접으세요. | Fold the flaps in the order shown on the tag. |
| start | 포장 시작 | Start wrapping |
| board | 포장 작업대 | Wrapping board |
| tag | 접는 순서 | Fold order |
| tagAccessible | 접는 순서, {steps} | Fold order, {steps} |
| step | {step}/4 | {step}/4 |
| nextAccessible | {step}/4단계, {direction} | Step {step} of 4, {direction} |
| timer | 남은 시간 {seconds}초 | Time left {seconds}s |
| score | 포장한 선물 {count}개 | Gifts wrapped {count} |
| best | 최고 기록 {count}개 | Best score {count} |
| dirUp | 위 | Up |
| dirRight | 오른쪽 | Right |
| dirDown | 아래 | Down |
| dirLeft | 왼쪽 | Left |
| flapUp | 위쪽 포장지 접기 | Fold top flap |
| flapRight | 오른쪽 포장지 접기 | Fold right flap |
| flapDown | 아래쪽 포장지 접기 | Fold bottom flap |
| flapLeft | 왼쪽 포장지 접기 | Fold left flap |
| wrongFold | 태그의 다음 화살표를 확인하세요. | Follow the next arrow on the tag. |
| wrapped | 포장 완료! | Gift wrapped! |
| finished | 포장 시간이 끝났어요 | Time's up |
| newBest | 새 최고 기록! | New best! |
| retry | 다시 포장하기 | Wrap again |

Use `↑ → ↓ ←` as shared glyphs, with localized direction names for assistive technology. Join `{steps}` with comma-space. Announce the current fold step and brief feedback in a polite live region. Keep the timer readable without announcing every tick. Hide decorative paper, stickers, and preview art from assistive technology.

## localStorage

- `gift-wrap-dash:best` stores the highest completed-round score as a base-10 integer string. Default to `0`. Accept only strings of decimal digits that parse to a safe nonnegative integer.
- Wrap reads and writes in `try/catch`. Keep the best score in memory for the page session if storage is unavailable.
- Store only the best score.

## Edge cases

- A wrong fold keeps the current step active. Clear its feedback on the next correct fold or after 450 ms of active play, whichever comes first. An input on an already-folded flap has no effect.
- Pointer cancellation, a release outside the pressed flap, a second simultaneous pointer, and repeated keys leave the board unchanged. Use one activation path per gesture so a pointer release and its synthetic click cannot both score.
- Pause clock, input locks, and motion while `document.hidden`. Discard pending pointer gestures on hide. Use monotonic elapsed time across visible intervals for scoring and `requestAnimationFrame` with a delta capped at 50 ms for decorative motion.
- Resizing preserves elapsed time, score, parcel index, folded layers, and the current input lock. A retry clears all round state and starts a new 30-second clock.
- Verify both languages at 320 × 480 and on a wide viewport. Check touch, mouse, keyboard, reduced motion, blocked storage, tab hide and resume, and the fourth fold immediately before and at the deadline. Run `npm test`, `npm run build`, and `npm run qa -- --thumbs` before publishing. Inspect the generated thumbnail for a readable title and visible parcel.

## Must not

- No external assets, fonts, libraries, requests, analytics, or accounts. Ship the playable item as one HTML file with inline CSS, JS, and vector art.
- No raster game art, video, hand-drawn `thumb.png`, or imitation of an existing game, character, brand, or gift-wrap design.
- No autoplay, dialogs, pop-ups, redirects, or page scrolling.
- No drag-only gesture, color-only instruction, or input requirement tied to the paper animation.