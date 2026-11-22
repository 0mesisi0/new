# Review 2026-11-22-christmas-cake-price-compare

## Blocking

1. **The phone keyboard can cover the action bar.** The tool sizes its layout to the iframe and recenters inputs on an iframe resize. On mobile browsers where the keyboard shrinks only the top-level visual viewport, the iframe keeps its height and the resize handler does not run. This can leave the focused field or **Compare prices** behind the keyboard. Size the embedded tool to the visible area while an input is focused, then verify the lower fields and action bar on Android Chrome and iOS Safari. [Tool layout](/C:/work/haruhanpan/play/items/christmas-cake-price-compare/index.html:9) · [Focus handling](/C:/work/haruhanpan/play/items/christmas-cake-price-compare/index.html:138) · [Chrome viewport behavior](https://developer.chrome.com/blog/viewport-resize-behavior) · [Iframe viewport behavior](https://developer.mozilla.org/en-US/docs/Web/API/VisualViewport)

## Improvements

1. **Make validation easier to recover from with a screen reader.** Mark the four mandatory fields as required and announce the first error when Enter is pressed from the field that already has focus. In that case, calling `.focus()` leaves focus in place, and the updated description may go unannounced. [Field markup](/C:/work/haruhanpan/play/items/christmas-cake-price-compare/index.html:100) · [Submit handler](/C:/work/haruhanpan/play/items/christmas-cake-price-compare/index.html:186)
2. **Finish end-to-end verification before publishing.** All 25 repository tests passed. Both locales match the specified copy, and direct logic checks covered validation, ties, rounding, budgets, and draft handling. Browser snapshots at 320–390 px showed 44 px or taller controls, and the existing thumbnail showed both cake totals. Source review found sufficient contrast, visible focus styles, reduced-motion support, and no network calls, dialogs, `eval`, or raw user input passed to `innerHTML`. Live keyboard and touch interactions, a fresh build, and thumbnail QA remain unverified.

## Verdict

CHANGES