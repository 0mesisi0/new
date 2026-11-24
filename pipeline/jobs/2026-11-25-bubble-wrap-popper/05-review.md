# Review 2026-11-25-bubble-wrap-popper

## Blocking

1. **Bubble tap targets fall below 44 px on mobile.** At 320 px, adjacent centers are about 42.5 px apart. The nearest-center rule splits overlapping hit areas, so an interior bubble gets only 42.5 px of usable width through its center even with a 22 px hit radius. Resizing a sheet created at 390 px down to 320 px reduces that width to about 37 px. Adjust the grid or hit layout to preserve 44 px targets across the supported widths. [Grid and hit testing](/C:/work/haruhanpan/play/items/bubble-wrap-popper/index.html:205)
2. **The first Space or Enter press can do nothing.** From a freshly loaded page, the first press focuses the canvas and returns before popping. Keyboard focus can also become invisible when it enters the canvas during a sheet swap, because the focus handler skips initialization and CSS suppresses the canvas outline. Make the first activation pop the selected bubble and keep a visible focus indicator throughout the swap. [Focus and keyboard handling](/C:/work/haruhanpan/play/items/bubble-wrap-popper/index.html:497)
3. **A golden bubble on the 100th pop suppresses the milestone.** The golden and milestone toasts share an `if`/`else if` branch. Check the milestone independently so both messages can be queued when they coincide. [Pop notifications](/C:/work/haruhanpan/play/items/bubble-wrap-popper/index.html:281)

## Improvements

1. **Give the sound toggle a stable accessible name.** The current pressed state can be announced as “Sound off, pressed” while sound is playing. Use a localized “Sound” label and let `aria-pressed` report the state. [Sound toggle](/C:/work/haruhanpan/play/items/bubble-wrap-popper/index.html:120)
2. **Use the scheduled save for hint and mute changes.** The first pop writes the hint flag immediately, and rapid mute toggles each flush every stored field. Route both changes through the 500 ms save schedule and retain the lifecycle flushes. [Storage scheduling](/C:/work/haruhanpan/play/items/bubble-wrap-popper/index.html:95)
3. **Keep the golden highlight steady under reduced motion.** The reduced-motion path removes shake, particles, and slides, but the golden highlight continues to shimmer. A steady gold highlight preserves the distinction. [Golden highlight](/C:/work/haruhanpan/play/items/bubble-wrap-popper/index.html:333)
4. **Update the category example in `ITEMS.md`.** The spec and metadata use `cool`, and the repository validator accepts it. The documented category list omits it. [Category example](/C:/work/haruhanpan/play/ITEMS.md:21)

`npm test` passed all 51 tests. Source review found Korean and English counterparts for the interface and metadata, and no network calls, dialogs, dynamic evaluation, or `innerHTML` writes. The JavaScript harness exercised keyboard activation and pointer sweeps at 320, 360, and 390 px. Browser interaction checks were blocked by the approval policy, so rendered layout, contrast, and physical touch behavior remain unverified.

## Verdict

CHANGES