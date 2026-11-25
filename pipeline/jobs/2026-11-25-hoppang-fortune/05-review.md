# Review 2026-11-25-hoppang-fortune

## Blocking

1. **Keyboard activation can select the wrong bun.** With Bun 1 focused, Enter selects Bun 2 because the global handler uses the canvas highlight and suppresses the focused button’s native action. Let focused controls handle Enter and Space, synchronize the highlight with focus, and move focus to a meaningful target when the screen changes. [index.html](/C:/work/haruhanpan/play/items/hoppang-fortune/index.html:667)
2. **A vertical swipe counts as a tap, and drags outside the bun can split it.** The pointer handler tracks only horizontal movement inside a rectangle wider and taller than the drawn bun. A vertical swipe advances the crack, and a drag beginning in a blank corner can complete the split. Hit-test the bun on pointer-down and track movement on both axes when distinguishing taps from drags. [index.html](/C:/work/haruhanpan/play/items/hoppang-fortune/index.html:247) · [Pointer handlers](/C:/work/haruhanpan/play/items/hoppang-fortune/index.html:674)
3. **Result text falls below 4.5:1 contrast.** The theme is 3.97:1 and the rare badge is 3.13:1 against the card. The “Save image” label is 4.13:1. Darken those colors while preserving the palette. [index.html](/C:/work/haruhanpan/play/items/hoppang-fortune/index.html:40)
4. **The required result note is missing in both languages.** The metadata includes the reminder, but the item’s dictionaries and result card omit the specified just-for-fun and hot-bun note. Add the Korean and English strings and render the note on the result screen. [Result markup](/C:/work/haruhanpan/play/items/hoppang-fortune/index.html:103) · [String dictionaries](/C:/work/haruhanpan/play/items/hoppang-fortune/index.html:132)

## Improvements

1. **Finish the reduced-motion treatment.** Selection still animates the bun to 115%, and a split burst can briefly take the total above four steam particles. Skip the selection pop and enforce the four-particle cap across idle steam and bursts. [index.html](/C:/work/haruhanpan/play/items/hoppang-fortune/index.html:218) · [Animation update](/C:/work/haruhanpan/play/items/hoppang-fortune/index.html:403)
2. **Skip confetti when reopening a saved rare bun.** The replay path skips the card transition, but `showResult(false)` still triggers confetti. Gate confetti on a fresh reveal. [index.html](/C:/work/haruhanpan/play/items/hoppang-fortune/index.html:543)
3. **Verify the mobile flow in a browser.** All 61 repository tests passed. Source inspection found no network calls, dialogs, `eval`, or `innerHTML` assignments. Browser execution was blocked by workspace permissions, so the 320–390 px layout, touch scrolling inside the card, and PNG download remain unverified.

## Verdict

CHANGES