# Review 2026-11-23-kimbap-roll-timing

## Blocking

1. **A second finger cancels a valid placement.** Put one finger on the mat, tap with a second finger, then lift the first. The primary release places nothing because the secondary pointer events clear the tracked pointer. Ignore events from other pointers and clear the tracked pointer only when it ends, is canceled, or the screen changes. [index.html](/C:/work/haruhanpan/play/items/kimbap-roll-timing/index.html:165)
2. **A rapid input can skip the roll reveal.** The reveal bypasses the 400 ms transition guard. Pressing Space during the fold and releasing it after the slice appears can activate the same button under its new label. Keep the reveal action available when the slice appears, but discard activations carried over from the previous screen. [index.html](/C:/work/haruhanpan/play/items/kimbap-roll-timing/index.html:129) [index.html](/C:/work/haruhanpan/play/items/kimbap-roll-timing/index.html:199)

## Improvements

1. Scope gesture suppression to the play area. The viewport disables pinch zoom across every screen, including the instructions and results. Keep the mat’s `touch-action: none` and allow deliberate zoom elsewhere. [index.html](/C:/work/haruhanpan/play/items/kimbap-roll-timing/index.html:5)
2. Reconcile the category list in `play/ITEMS.md` with the validator. The item’s `games` category matches the job spec and passes validation. The documented list omits it. [meta.json](/C:/work/haruhanpan/play/items/kimbap-roll-timing/meta.json:4) [ITEMS.md](/C:/work/haruhanpan/play/ITEMS.md:17)
3. Add a browser regression check for both input bugs and all four screens at 320 × 480 and 390 × 480 in both languages. All 31 repository tests passed, and a script harness verified all 24 bilingual strings, scoring boundaries, record saving, and retry. The thumbnail was readable, and source inspection found no network calls, dialogs, `eval`, or user input passed to `innerHTML`. Browser execution was blocked, so mobile layout, native keyboard activation, and visible focus at those sizes were assessed from source only.

## Verdict

CHANGES