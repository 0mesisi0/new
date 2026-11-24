# Idea and spec: 니트 보풀 제거 / Knit Sweater De-Piller

## Concepts scored

Scores run from 1 to 5. Korean search and share demand scores are editorial estimates based on likely search terms and reasons to share.

| Concept | Category | Value in the first 10 seconds | Originality | Korean search/share demand | One-file buildability | Total |
|---|---|---:|---:|---:|---:|---:|
| **니트 보풀 제거 / Knit Sweater De-Piller** — sweep a fabric shaver across a knit swatch and reveal clean stitches | `cool` | 5 | 4 | 4 | 5 | **18** |
| 한글 글자 조립 / Build a Hangul Block — tap letter tiles to assemble a syllable and see each tile move into place | `learn` | 4 | 4 | 3 | 5 | 16 |
| 도서관 반납일 계산기 / Library Due Date Calculator — enter a checkout date and loan period to see the due date and days remaining | `tools` | 4 | 3 | 4 | 5 | 16 |

**Picked** — Knit Sweater De-Piller. The first swipe gives immediate feedback, and the finished swatch makes a satisfying before-and-after image. `니트 보풀 제거` is a natural Korean search phrase for the winter wardrobe hook. The tactile interaction takes its cue from the quick, visible transformations in today’s research.

## Meta

slug `knit-sweater-depiller`

```json
{
  "slug": "knit-sweater-depiller",
  "date": "2026-11-25",
  "category": "cool",
  "kind": "tool",
  "aspect": "9/16",
  "tags": {
    "ko": ["니트", "보풀 제거", "겨울"],
    "en": ["knitwear", "fabric shaver", "winter"]
  },
  "ko": {
    "title": "니트 보풀 제거",
    "desc": "니트 위를 쓱 문질러 보풀을 떼고 가지런한 코를 드러내세요. 세 가지 니트를 손질하고 전후 모습을 이미지로 남길 수 있어요.",
    "howto": "보풀 위를 문지르거나 눌러 보세요. 키보드로는 니트에 초점을 두고 방향키로 이동한 뒤 스페이스를 누르세요. ‘한 곳씩 밀기’ 버튼으로도 손질할 수 있어요.",
    "about": "시간 제한 없이 니트 한 조각을 손질하는 겨울 장난감이에요. 입력과 이미지는 기기에서 처리해요."
  },
  "en": {
    "title": "Knit Sweater De-Piller",
    "desc": "Sweep away fuzzy pills to reveal neat stitches. Clean three knit swatches and save a before-and-after image.",
    "howto": "Drag or tap on the knit. With the knit focused, move with the arrow keys and press Space to shave. You can also use Shave next spot.",
    "about": "A winter desk toy for tending a little patch of knitwear at your own pace. The page creates images on your device."
  }
}
```

## Pitch

A close-up of a winter sweater fills the center of the screen. Raised fuzz catches the light. Run a small fabric shaver across the knit and watch the fuzz lift away, revealing the stitches underneath. There are three swatches and no timer. Each finished swatch can be flipped between its original and cleaned states or saved as a side-by-side image.

## Flow

1. **Ready.** Open directly on the selected swatch. Show the title, swatch picker, one-line instruction, knit surface, progress count and action buttons. On a fresh visit, the cream swatch is selected, all 36 pills are visible and the counter reads `0 / 36`.
2. **Shaving.** A tap or drag over the knit removes the pills under the shaver. Update the counter immediately. Keep the picker, progress and controls in fixed positions.
3. **Finished.** On removal of the last pill, leave the clean knit in place, show the completion message and enable **View before** and **Save image**. Comparing and saving leave the finished swatch intact.
4. **Before view.** **View before** displays the original pills and changes the view label to **Before**. **View after** restores the clean view. Progress still reads `36 / 36`. Shaving input is inactive in this view.
5. **Reset or switch.** **Reset swatch** restores all 36 pills on the active swatch and returns it to the ready state. Selecting another swatch restores that swatch’s progress from the current session. Each swatch has its own progress.

## Controls

- **Touch and mouse.** Use pointer events. Accept the primary pointer and the primary mouse button. On press, apply one pass at the current point and capture the pointer. On movement, apply the pass along the segment since the last sample. Apply the final sample on release. End the stroke on cancellation or lost pointer capture.
- **Keyboard.** Tab to the knit surface. Arrow keys move the shaver 20 logical units at a time, clamped to the knit bounds. Space applies one pass. Enter and Space activate focused native buttons. Suppress default arrow and Space behavior only when the knit handles those keys.
- **Button alternative.** **Shave next spot** centers the shaver on the first remaining pill in row-major order and applies the same pass. It works with touch, mouse, keyboard and assistive technology.
- The surface has a visible focus ring and a keyboard position indicator. All buttons have at least 44 × 44 CSS pixels of hit area. Keep focus on the active control through ordinary updates. If the final activation uses **Shave next spot**, move focus to **View before** once that button becomes available.

## Swatches and shaving

| ID | Knit pattern | Base | Highlight | Stitch shadow |
|---|---|---|---|---|
| `cream` | Stockinette with alternating V stitches | `#E8D8B8` | `#FFF1D6` | `#AD8D62` |
| `moss` | Rib knit with alternating raised columns | `#506249` | `#819374` | `#30402D` |
| `plum` | Seed stitch with alternating short loops | `#75495F` | `#A8788F` | `#4E2D40` |

- Use a `240 × 240` logical drawing surface. Draw the stitch pattern first, then the pills, shaver indicator and feedback.
- Give each swatch 36 pills arranged on a 6 × 6 grid. The nominal center is `(25 + 38c, 25 + 38r)` for zero-based column `c` and row `r`. For `s = 0, 1, 2` in table order, offset `x` by `(17c + 13r + 7s) % 15 - 7` and `y` by `(11c + 19r + 5s) % 15 - 7`. Use a pill radius of `3 + (c + 2r + s) % 4` logical units. Draw each pill as a raised tuft with loose strands.
- A pass removes every remaining pill whose center lies within 24 logical units of the press point or pointer segment. Clip each segment to the knit bounds before hit testing. Convert pointer coordinates using the canvas’s current bounding rectangle.
- Maintain one set of removed pill IDs per swatch. Derive the progress count from the set size. Seeded randomness is unnecessary because the positions are fixed.
- On removal, lift a few short strands for up to 160 ms and fade them out. Update the underlying knit immediately. Use the same draw routine for the live surface and the before-and-after export.

## Visual design

- Use a warm paper background (`#F4EEE3`), dark ink (`#29251F`) and a deep green primary button (`#354A38`) with white text. Frame the knit like a fabric sample with a fine seam around its edge. Use system fonts.
- At 320 × 480, use 12 px side padding and reserve two fixed action rows. Fit the square knit in the remaining space at up to 232 CSS pixels. Keep the instruction and status to two lines each. Stack the action rows beneath the knit. At wider sizes, center a column up to 440 px wide and let the knit grow to 320 px.
- Fill the iframe with `100dvh` and use `100vh` as a fallback. Keep the page fixed and free of scrollbars. Recompute the canvas on resize and cap the backing-store pixel ratio at 2. Use `touch-action: none` on the knit surface.
- Use `requestAnimationFrame` while feedback is active. Advance it by elapsed time with delta capped at 50 ms and pause it while the page is hidden. With reduced motion enabled, remove pills immediately with no moving strands.

## Sound

The item is silent.

## Export

- **Save image** is available after the current swatch is finished, including in the before view. Draw a `960 × 540` PNG with the localized title and swatch name at the top and two equal swatch panels labeled **Before** and **After**. Use the original pill positions on the left and the same clean stitch pattern on the right. Omit the shaver, feedback and controls.
- Export with `canvas.toBlob`, start a download through an object URL and revoke the URL after one second. Use `knit-sweater-depiller-{swatch}.png` as the filename.
- Capture the selected swatch and language when export begins. Disable the save button until that export finishes. If image creation or download initiation throws, or `toBlob` returns `null`, show the localized failure message. A successful download initiation gets its own status message.

## Strings

Select the language from `?lang=ko` or `?lang=en`. Otherwise use Korean when `navigator.language` is Korean and English for other values. Set `<html lang>` to match. Use this dictionary for on-screen text, accessible names, announcements and PNG labels.

| Key | ko | en |
|---|---|---|
| `title` | 니트 보풀 제거 | Knit Sweater De-Piller |
| `hint` | 니트 위를 쓱 문질러 보세요. | Sweep across the knit. |
| `swatchGroup` | 니트 고르기 | Choose a knit |
| `cream` | 크림 | Cream |
| `moss` | 이끼 | Moss |
| `plum` | 자두 | Plum |
| `surface` | {swatch} 니트 손질 영역 | {swatch} knit shaving area |
| `surfaceKeys` | 방향키로 이동하고 스페이스를 눌러 보풀을 밀어요. | Move with the arrow keys and press Space to shave. |
| `progress` | 보풀 제거 {removed} / {total} | Pills removed {removed} / {total} |
| `next` | 한 곳씩 밀기 | Shave next spot |
| `reset` | 이 니트 초기화 | Reset swatch |
| `complete` | 보풀을 모두 밀었어요! | Every pill is gone! |
| `before` | 손질 전 | Before |
| `after` | 손질 후 | After |
| `viewBefore` | 손질 전 보기 | View before |
| `viewAfter` | 손질 후 보기 | View after |
| `save` | 이미지 저장 | Save image |
| `saving` | 이미지 만드는 중 | Making image |
| `downloadStarted` | 이미지 다운로드를 시작했어요. | Image download started. |
| `saveFailed` | 이미지를 저장하지 못했어요. 전후 화면을 각각 캡처해 주세요. | Could not save the image. Capture the before and after views separately. |

Use `swatchGroup` as the picker’s accessible name and expose the active swatch with `aria-pressed`. Associate `surfaceKeys` with the focusable knit surface. Announce progress through a polite live region at the end of a stroke or after a keyboard or button action. On the final pass, announce `progress` and `complete` together. Use the same region for view labels and export status.

## localStorage

- `knit-sweater-depiller:swatch` stores `cream`, `moss` or `plum` when the selection changes. Default to `cream` if the key is missing, invalid or inaccessible.
- Wrap reads and writes in `try/catch`. Keep pill state, comparison view and export state in memory. A reload opens the saved swatch with all pills restored.

## Edge cases

- A stroke may cross the same pill repeatedly. Its ID enters the removed set once. A fast drag uses segment hit testing so it removes pills between pointer samples.
- Ignore secondary pointers. End the active stroke on resize, swatch change, reset or page hide. Keep progress and require a new press before further shaving.
- Switching swatches closes the before view and clears transient feedback. Returning to a finished swatch opens the clean view with compare and save enabled.
- Reset affects only the active swatch. It restores pills and resets the shaver to the center. Keep the picker selection and focus on the reset button.
- An export started before a reset or swatch change still uses the captured swatch. Clear transient export messages on state changes and announce an export result only if its originating view is still active.
- `#demo` opens the finished cream swatch for thumbnail QA. Demo mode bypasses storage. Compare, save and reset work normally in the demo.

## Must not

- No network requests, external assets, fonts, libraries, analytics or uploads. Ship the toy in one `index.html` alongside `meta.json`. Generate `thumb.png` with the repository QA command.
- No real logos, products, people or copied artwork. Draw the knit and shaver from original canvas and CSS shapes.
- No timers, penalties, leaderboards or scored streaks.
- No autoplay, vibration, modal dialogs, pop-ups or navigation away from the item.