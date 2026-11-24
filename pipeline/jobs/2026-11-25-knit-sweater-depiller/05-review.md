# Review 2026-11-25-knit-sweater-depiller

## Blocking

1. **Comparing a finished swatch hides the required `36 / 36` count.** Clicking **View before** replaces the counter with “Before.” Clicking **View after** replaces it with “After.” Keep the visible count tied to the removed-pill total and announce the view label through the live region. [index.html](/C:/work/haruhanpan/play/items/knit-sweater-depiller/index.html:265)
2. **An export can report its result in the wrong view.** Start saving in **Before**, then reselect the active swatch while the export is pending. The picker returns to **After** without invalidating the pending announcement. Invalidate the export announcement whenever reselection changes the view. [index.html](/C:/work/haruhanpan/play/items/knit-sweater-depiller/index.html:272)
3. **Saving drops keyboard focus.** Activating **Save image** disables the focused native button during `toBlob`, and the completion handlers re-enable it without restoring focus. Keep the button focusable while exposing its unavailable state with `aria-disabled`. The existing `exporting` guard already prevents repeat activation. [index.html](/C:/work/haruhanpan/play/items/knit-sweater-depiller/index.html:295)

## Improvements

1. Give the dashed shaving-radius guide a light outer stroke so its boundary is easier to see on the dark moss and plum stitches. [index.html](/C:/work/haruhanpan/play/items/knit-sweater-depiller/index.html:135)
2. Add `cool` to the category list in the item guide. The job spec and site both use it, and the metadata validator accepts it. [ITEMS.md](/C:/work/haruhanpan/play/ITEMS.md:16) · [site.mjs](/C:/work/haruhanpan/play/src/site.mjs:14)
3. Add a browser regression check for comparison, save focus, and switching views during export. All 41 repository tests passed. The review matched all 20 string pairs and the metadata against the spec, checked 44 px button targets in the 320–390 px browser layouts, and exercised keyboard and touch-pointer handlers in isolation. Native touch and PNG download were unverified. Source inspection found no network calls, dialogs, `eval`, or user-controlled `innerHTML`.

## Verdict

CHANGES