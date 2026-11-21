# Idea and spec: 종이 주름 펴기 / Paper Smoother

## Concepts scored

Scores are 1–5 in this order: value in the first 10 seconds, originality, Korean search/share demand, and buildability in one HTML file. Maximum 20. Demand scores are estimates based on the supplied November 21 research. No vote data was available.

| Concept | Category | Score | Verdict |
|---|---|---|---|
| **종이 주름 펴기 / Paper Smoother** — Run a finger over creased paper to uncover a continuous illustration. | **chill** | **5 / 4 / 4 / 5 = 18** | **Picked.** The first swipe reveals part of the picture. The tactile response draws on the research’s texture-play direction, and the finished sheet gives players a reason to share a screenshot. |
| 오늘의 드라마 대사 뽑기 / Give Me a Drama Line — Pick a situation such as a delayed bus or a group chat gone quiet, then draw an original line to perform. | random | 5 / 3 / 4 / 5 = 17 | The Korean search phrase is clear and the result works in a group chat. Most replay value depends on the size and quality of the line library. |
| 수능 끝나고 외출 체크리스트 / Post-Exam Outing Checklist — Choose an outing and get a short checklist for verifying a student discount and getting out the door. | tools | 4 / 3 / 4 / 5 = 16 | The timing fits the post-exam research. The checklist stays useful offline by leaving offer dates and eligibility for the user to verify with the venue. |

## Meta

slug `paper-smoother`

```json
{
  "slug": "paper-smoother",
  "date": "2026-11-21",
  "category": "chill",
  "kind": "tool",
  "aspect": "3/4",
  "tags": ["말랑이", "힐링", "종이", "texture", "paper", "relaxing"],
  "ko": {
    "title": "종이 주름 펴기",
    "desc": "구겨진 종이를 손끝으로 쓸어 주름을 펴 보세요. 열두 칸이 모두 펴지면 파도, 빗방울, 은행잎 중 한 장의 그림이 완성돼요.",
    "howto": "종이 위를 쓸거나 칸을 하나씩 누르세요. 키보드로는 방향키로 칸을 고르고 Enter나 스페이스바로 펼 수 있어요.",
    "about": "시간 제한 없이 즐기는 종이 장난감이에요. 마지막으로 고른 종이만 이 기기에 기억해요."
  },
  "en": {
    "title": "Paper Smoother",
    "desc": "Sweep across crumpled paper to flatten its folds. Smooth all 12 squares to reveal a picture of waves, raindrops, or ginkgo leaves.",
    "howto": "Sweep across the paper or press one square at a time. With a keyboard, use the arrow keys to choose a square and Enter or Space to smooth it.",
    "about": "Take your time with this little paper toy. Only your last paper choice is remembered on this device."
  }
}
```

## Pitch

A crumpled sheet sits on a quiet desktop. The first press flattens one square and reveals a piece of a picture. A slow sweep makes the pieces join up under the player’s finger. The sheet is complete after 12 squares, whether the player uses one long gesture or works through the squares individually.

## Flow

1. **Ready.** Open directly on a crumpled sheet with the title, a one-line instruction, a paper chooser, and `0 / 12`. Default to Waves on a first visit. The sheet is interactive immediately.
2. **Smoothing.** The first valid press or sweep reveals a square. Each newly smoothed square increments progress once. The player can choose a different paper or reset the current sheet at any point.
3. **Complete.** The last square reveals the full picture and changes the instruction to the completion line. Keep the chooser and progress in place. The bottom action becomes **Smooth again**. The completed sheet stays visible until the player chooses another paper or starts again.

## Controls

- **Touch, mouse, and pen.** Use pointer events on the sheet. The primary pointer flattens the square on press and any square crossed while it remains down. Track the segment between consecutive pointer samples so a fast swipe fills the intervening squares. Capture the pointer and clip each segment to the sheet bounds. Clear the active stroke on release, cancellation, visibility change, or resize. Additional pointers leave the active stroke alone.
- **Keyboard.** Tab enters the grid at its most recently focused square, initially row 1, column 1. Arrow keys move one square within the grid and stop at its edges. Enter or Space smooths the focused square. Tab and Shift+Tab leave the grid in normal document order. The chooser and bottom action use normal button activation. Prevent default only for the grid keys handled by the item.
- **Layout and touch.** Use `touch-action: none` on the sheet only. Every square and button has a hit area of at least 44 × 44 CSS pixels. Keep a visible focus ring on smoothed squares as well as creased ones.

## Paper and reveal rules

- The sheet is a centered 4-column × 3-row grid with 12 equal squares and a 12-bit progress mask. A square stays smooth for the current sheet. The mask is cleared by reset, replay, or choosing a different paper.
- Draw each picture once across the full sheet with inline SVG. Each square starts with an opaque CSS crease layer and a faint grid seam. Smoothing a square removes its crease layer and seam in place, revealing the corresponding part of the continuous picture underneath.
- The pictures are fixed, original compositions. Paths cross square boundaries so neighboring smoothed squares visibly join. Keep the art decorative in the accessibility tree.

| Paper | Base | Illustration |
|---|---|---|
| Waves | Pale blue `#D9EDF0` | Three broad blue-green wave bands in `#3A7D84` and `#75B3B6`, with small ivory foam arcs. |
| Raindrops | Pale violet `#EAE5F3` | Diagonal indigo rain strokes above three overlapping ripple rings in `#62578B`. |
| Ginkgo leaves | Warm cream `#F7E9C7` | A curved umber branch with five ochre fan leaves in `#C28724`, drawn with fine radial veins. |

## Visual design

- Use a warm neutral desktop (`#F4F0E8`), dark ink (`#292A25`), and a system-ui font stack. Give the paper a fine border and soft shadow. The chooser shows the selected paper with a border and a checkmark, with `aria-pressed` on its button.
- **Ready screen.** Place title and instruction above the three paper buttons. Put the creased sheet below the chooser, then the progress counter and disabled reset button. The crease pattern should read clearly in a thumbnail.
- **Smoothing screen.** Keep the layout fixed as the artwork emerges. Fade each crease layer out over 120 ms. Enable reset once a square has been smoothed. Display progress as `{done} / 12`.
- **Complete screen.** Show the picture without grid seams. Replace the instruction with the completion line in the same space. Keep keyboard focus on the square that completed the sheet. Announce completion once.
- **Small screens.** Use a full-viewport shell and a centered content column up to 440 px wide. At 320 × 480, size the sheet to about 232 × 174 px and keep all controls visible without page scrolling. Allow two lines for the instruction and paper button labels. Fit to the available width and height on resize without changing square progress.
- **Reduced motion.** Reveal squares instantly under `prefers-reduced-motion`. Use no sound.

## Strings

Read `?lang=ko` or `?lang=en`. For a missing or unsupported value, use Korean when `navigator.language` starts with `ko` and English otherwise. Set `<html lang>` and the document title from the chosen locale. The dictionary below supplies all visible and accessible strings. Row, column, and progress numbers are one-based where they identify a square and formatted from the active locale.

| Key | ko | en |
|---|---|---|
| `title` | 종이 주름 펴기 | Paper Smoother |
| `instruction` | 종이를 쓸거나 칸을 눌러 주름을 펴세요. | Sweep across the paper or press a square to smooth it. |
| `paperChoice` | 종이 고르기 | Choose a paper |
| `waves` | 파도 | Waves |
| `rain` | 빗방울 | Raindrops |
| `ginkgo` | 은행잎 | Ginkgo leaves |
| `gridLabel` | {paper} 종이 | {paper} paper |
| `creasedSquare` | {row}행 {col}열, 주름 있음 | Row {row}, column {col}, creased |
| `smoothSquare` | {row}행 {col}열, 주름을 폈어요 | Row {row}, column {col}, smooth |
| `progress` | {done} / {total} | {done} / {total} |
| `progressAccessible` | {total}칸 중 {done}칸을 폈어요. | {done} of {total} squares smoothed. |
| `reset` | 종이 다시 구기기 | Crumple again |
| `again` | 다시 펴기 | Smooth again |
| `complete` | 주름을 다 폈어요. 그림이 완성됐어요! | All smooth. Your picture is complete! |

Use a single polite status region for progress and completion. On completion it announces `complete` in place of the final numeric update. For a drag, show the counter as squares change and announce the count when the stroke ends unless completion has already been announced.

## localStorage

- `paper-smoother:paper` holds `waves`, `rain`, or `ginkgo`. Write on a change of paper and guard reads and writes with `try/catch`.
- The mask, pointer state, and focused square live in memory. A reload opens the remembered paper fully creased.

## Edge cases

- Choosing the active paper preserves the current sheet. Choosing a different paper clears the mask immediately and keeps focus on the chooser button. Reset or replay keeps focus on the bottom action until activation finishes, then moves focus to the first square before disabling reset.
- Missing, invalid, or blocked storage falls back to Waves. Paper selection and the reveal remain usable for the session.
- A press on an already smooth square updates its focus position and leaves the count unchanged. Repeated Enter or Space on the same square has the same behavior.
- A sweep along an exact cell boundary reveals only one side. Use half-open cell bounds, with the right and bottom outer edges assigned to the final column and row. A corner contact alone does not reveal an adjacent square.
- When resize or tab hiding interrupts a sweep, clear the pointer and last sample. Resume from the existing mask on a fresh press. Finishing the sheet also ends the active sweep.
- `#demo` opens a completed Waves sheet for thumbnail QA and bypasses persistence for that session. Replay and the chooser still work. Generate `thumb.png` through the repository QA command.

## Must not

- No network requests, dependencies, external fonts, analytics, accounts, or uploaded assets. Ship the interaction, styles, and three illustrations in `items/paper-smoother/index.html`, with metadata in the sibling `meta.json`.
- No timers, scores, penalties, forced gestures, or autoplay.
- No existing game art, branded packaging, real people, or copied illustrations.
- No dialogs, pop-ups, navigation away from the iframe, or document scrolling.