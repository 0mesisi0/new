# Review 2026-11-23-winter-shadow-lab

## Blocking

1. **Changing the time can prevent copying.** When the clipboard API rejects after a slider change or reset, `fb()` exits before trying the textarea fallback. I reproduced this with a delayed rejection. The original four-line snapshot should still reach the fallback. Suppress only the stale status update. [index.html](C:/work/haruhanpan/play/items/winter-shadow-lab/index.html:212)
2. **The clipboard fallback can return focus to the slider.** With the slider focused and the copy action activated without moving focus, the fallback restored focus to the slider. The brief requires focus to return to **Copy comparison**. [index.html](C:/work/haruhanpan/play/items/winter-shadow-lab/index.html:202)
3. **Both Sun markers fall below 3:1 contrast against their skies.** Their outlines measure 2.44:1 in winter and 2.62:1 in summer. Darken the outline so the Sun’s position is easy to distinguish in both diagrams. [index.html](C:/work/haruhanpan/play/items/winter-shadow-lab/index.html:113)

## Improvements

1. Cancel queued animation frames before drawing synchronously on pointer cancellation or resize. Both paths can clear the stored frame ID while its callback remains queued, leaving the visibility handler unable to cancel it. [index.html](C:/work/haruhanpan/play/items/winter-shadow-lab/index.html:141)
2. Make the ruler labels larger at 320 × 480. In English, the wrapped scene headers leave about 68 px per SVG, scaling the ruler labels to roughly 9.5 CSS px. [index.html](C:/work/haruhanpan/play/items/winter-shadow-lab/index.html:108)
3. Update the category list in `ITEMS.md` to include `learn`. The item matches the idea spec and passes the repository’s category validation. [ITEMS.md](C:/work/haruhanpan/play/ITEMS.md:21)
4. Finish browser verification before publishing. All 38 repository tests passed, all nine model outputs were checked, and both languages fit at 320 × 480 and 390 × 480 with 44 px controls. Source inspection found no network calls, dialogs, `eval`, or user input passed to `innerHTML`. Native keyboard and touch interaction, screen-reader announcements, the build, and thumbnail regeneration remain unverified. The browser tool left snapshots in `.playwright-mcp/`.

## Verdict

CHANGES