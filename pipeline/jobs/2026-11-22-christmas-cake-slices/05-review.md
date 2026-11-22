# Review 2026-11-22-christmas-cake-slices

## Blocking

1. **Keyboard focus disappears at the guest limit.** Activating `+` from 23 guests disables the focused button and sends focus to `BODY` in Chromium. The minus handler has the same behavior at 2 guests. Keep both bound buttons disabled as specified and move focus to the slider when the focused button becomes disabled. [index.html](C:/work/haruhanpan/play/items/christmas-cake-slices/index.html:133)
2. **Cake labels disappear in landscape.** At 480 × 320, both A/B headings are hidden. When the diameters match, neither the selectors nor the equality message visibly identifies the individual cakes. Keep the headings visible and shrink the diagrams or spacing to make room. [index.html](C:/work/haruhanpan/play/items/christmas-cake-slices/index.html:38)

## Improvements

1. **Cancel outdated live-region updates.** A delayed announcement reported 7 guests after the slider already displayed 8. Cancel the queued update on subsequent input and schedule a fresh announcement when the next change commits. [index.html](C:/work/haruhanpan/play/items/christmas-cake-slices/index.html:147)
2. **Increase contrast for the slice dividers.** The muted dividers have about 1.8:1 contrast against the icing before antialiasing. Darken them enough to distinguish adjacent slices at 24 servings while keeping the highlighted wedge prominent. [index.html](C:/work/haruhanpan/play/items/christmas-cake-slices/index.html:118)
3. **Use the specified Korean comparison wording.** The default result inserts `케이크 B` and `케이크 A` where the copy table specifies `B` and `A`. The same substitution affects the copied comparison. [index.html](C:/work/haruhanpan/play/items/christmas-cake-slices/index.html:127)
4. **Use a color change for copy-button feedback.** The active scale transform still applies under reduced motion and briefly renders the 44 px button about 43 px tall. [index.html](C:/work/haruhanpan/play/items/christmas-cake-slices/index.html:32)
5. **Complete the publishing checks.** All 26 `npm test` tests passed. Chromium checks at 320 × 480 and 390 × 520 verified both languages, the default and equality results, 44 px resting targets, and simulated copy failure with focus preserved. Source review found no dialogs, `eval`, or `innerHTML`, and the browser checks recorded zero resource requests. Native keyboard and touch interactions, real clipboard writes, the build, and thumbnail regeneration remain unverified.

## Verdict

CHANGES