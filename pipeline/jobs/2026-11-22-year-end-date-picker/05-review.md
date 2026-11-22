# Review 2026-11-22-year-end-date-picker

## Blocking

1. **The real result screen requires scrolling at 320 × 480 after a successful copy.** The copy confirmation takes up another line in the action stack and pushes part of **Edit dates and group size** below the viewport. Keep all three result rows and the full 44 px action targets in view when the confirmation appears. [index.html](C:/work/haruhanpan/play/items/year-end-date-picker/index.html:14)
2. **Backing out of setup can reopen the manual-copy panel.** With clipboard access blocked, choose **Copy results**, then **Edit dates and group size**, then **Back**. The manual-copy panel reopens and hides the tally because `copyOpen` survives navigation to setup. Clear that state when leaving the result screen. [index.html](C:/work/haruhanpan/play/items/year-end-date-picker/index.html:239)

## Improvements

1. Announce a successful copy through one live region. The visible status and the separate live region both receive the same message, so a screen reader may announce it twice. [index.html](C:/work/haruhanpan/play/items/year-end-date-picker/index.html:256)
2. Increase the contrast of the non-leading bars against their tracks. The current ratio is 2.27:1. The numeric counts already convey the same values. [index.html](C:/work/haruhanpan/play/items/year-end-date-picker/index.html:47)
3. Complete native keyboard and touch testing before publishing. All 16 repository tests passed, both dictionaries and metadata matched the spec, and the sample rendered at 320 and 390 px. The interaction harness covered invalid and duplicate dates, ties, all-zero results, and clipboard fallback. Browser approval prevented native interaction testing. The browser saved review artifacts in `.playwright-mcp/`.

## Verdict

CHANGES