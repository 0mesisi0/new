# Review 2026-11-23-overseas-shopping-cost-calculator

## Blocking

1. **Keep Compare totals visible when the software keyboard opens.** The bottom bar is positioned against the iframe’s `100dvh` layout. When the keyboard shrinks only the top-level visual viewport, as Chrome on Android does by default, the bar can remain behind the keyboard. Size the embedded calculator to the visible area and verify that the form scrolls independently while the submit button stays reachable at 320–390 px. [Calculator layout](/C:/work/haruhanpan/play/items/overseas-shopping-cost-calculator/index.html:5) · [Iframe wrapper](/C:/work/haruhanpan/play/build.mjs:143) · [Chrome viewport behavior](https://developer.chrome.com/blog/viewport-resize-behavior)

## Improvements

1. **Keep copy feedback tied to the latest attempt.** With two pending copy requests, an older rejection can erase a newer success message and move focus into the manual-copy field. Ignore callbacks from superseded attempts and hide any open fallback when a retry succeeds. [Copy handler](/C:/work/haruhanpan/play/items/overseas-shopping-cost-calculator/index.html:178)
2. **Localize the currency options through the same dictionaries as the field labels.** Both languages have all 37 specified interface strings and matching metadata. The spec also places `USD`, `JPY`, and `EUR` in both dictionaries, but the options are hardcoded in the markup. [Currency selector](/C:/work/haruhanpan/play/items/overseas-shopping-cost-calculator/index.html:73)
3. **Finish the device checks before publishing.** All 33 repository tests passed. Script-level checks in both languages covered the example, tie, rounding, grouped inputs, upper bounds, and clipboard fallback. The Korean result fit at 320 and 390 px with 48 px buttons, and the existing thumbnail was legible. Static review found no network calls, dialogs, `eval`, or user-input HTML insertion. Live touch, keyboard-only navigation, and software-keyboard behavior remain unverified because automated browser interactions were denied. The read-only workspace prevented rerunning the build and thumbnail generation.

## Verdict

CHANGES