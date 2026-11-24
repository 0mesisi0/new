# Review 2026-11-23-winter-laundry-puzzle

## Blocking

1. **Rail presses still move with reduced motion enabled.** The `.rail.press:not(:disabled)` rule overrides the reduced-motion rule, so a pressed rail still scales to 99%. Apply the reduced-motion override with matching specificity and use a static border or fill for press feedback. [index.html](C:/work/haruhanpan/play/items/winter-laundry-puzzle/index.html:25) · [Reduced-motion rule](C:/work/haruhanpan/play/items/winter-laundry-puzzle/index.html:82)
2. **The documented shortcuts can trigger the wrong move on alternate keyboard layouts.** The handler matches physical key positions through `event.code`. On French AZERTY, pressing the key labeled `Q` misses the top-rail shortcut, while pressing `A` can attempt that rail and spend a try. Match the documented characters through `event.key` while preserving the repeat and focus guards. [index.html](C:/work/haruhanpan/play/items/winter-laundry-puzzle/index.html:275)
3. **Hiding the document leaves the CSS animations running.** The visibility handler cancels the cleanup timer, but the garment drop and tile nudge have no pause rule. Pause the active animations when the document becomes hidden and clear their effects on return. [Animation rules](C:/work/haruhanpan/play/items/winter-laundry-puzzle/index.html:39) · [Visibility handler](C:/work/haruhanpan/play/items/winter-laundry-puzzle/index.html:258)

## Improvements

1. Match the compact layout spec. At 320 × 480, Chromium measured 8 px side gutters where the spec calls for 12 px. The status area also grew from 16 px to 32 px on a misfit. Reserve two lines so the board stays in place. [index.html](C:/work/haruhanpan/play/items/winter-laundry-puzzle/index.html:69)
2. Allow browser zoom where the browser honors the viewport limits. The viewport caps scaling at 1, and gesture suppression covers the entire app. Limit gesture suppression to the play surface so players can magnify instructions and results. [Viewport](C:/work/haruhanpan/play/items/winter-laundry-puzzle/index.html:5) · [Touch handler](C:/work/haruhanpan/play/items/winter-laundry-puzzle/index.html:263)
3. Reconcile the metadata instructions. Both locales contain the specified copy in `meta.json`, while the in-game dictionaries omit `desc`, `howto`, `about`, and `tags`. `ITEMS.md` also omits `games` from its category example, although the job spec requires it and the validator accepts it. [Metadata](C:/work/haruhanpan/play/items/winter-laundry-puzzle/meta.json:1) · [Item guide](C:/work/haruhanpan/play/ITEMS.md:16)
4. Finish device and publish QA. All 37 repository tests passed. Chromium checks at 320 and 390 px confirmed visible controls at least 44 px tall and wide, expected focus transitions, and bilingual win, loss, and replay flows using scripted input. Source review found no network calls, dialogs, `eval`, or user-controlled values passed to `innerHTML`. Native touch and keyboard activation, screen-reader announcements, and build and thumbnail QA remain unverified.

## Verdict

CHANGES