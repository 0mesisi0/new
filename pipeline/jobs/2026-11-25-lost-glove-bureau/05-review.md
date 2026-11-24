# Review 2026-11-25-lost-glove-bureau

## Blocking

1. **A duplicate tap can record an unintended ending.** At 320 × 480, the striped mitten and rubber glove tiles overlap across the screen transition. A second tap just one pixel away bypasses the exact-coordinate check, opens Puddle Ferry, and saves the discovery. Tie duplicate detection to the pointer gesture and the screen where it began. [index.html](/C:/work/haruhanpan/play/items/lost-glove-bureau/index.html:184)
2. **Choosing a new left glove can skip the right-pick heading.** Discover an ending, choose Swap right glove, press Escape, and select a different left glove. Focus jumps to the previously used right glove, skipping the heading and selected-left context. Focus the heading after each left-glove selection and restore the previous right-glove focus when returning via Swap right glove. [index.html](/C:/work/haruhanpan/play/items/lost-glove-bureau/index.html:173)

## Improvements

1. Stop entrance animations when the document becomes hidden mid-transition. The reduced-motion CSS is present, but the hidden state is sampled only during rendering. [index.html](/C:/work/haruhanpan/play/items/lost-glove-bureau/index.html:168)
2. Update the category list in `ITEMS.md` to include `weird`. The idea spec, site configuration, and metadata validator already agree on this item’s category. [ITEMS.md](/C:/work/haruhanpan/play/ITEMS.md:21) · [site.mjs](/C:/work/haruhanpan/play/src/site.mjs:15)
3. Add browser regression coverage for focus and duplicate taps. All 42 repository tests passed, all 54 localized UI strings matched the spec, and Chromium layout checks across 320–390 px found no clipped controls or targets below 44 × 44 px. Source review found no network calls, dialogs, `eval`, or user input passed to `innerHTML`. Physical touch and screen-reader announcements remain unverified.

## Verdict

CHANGES