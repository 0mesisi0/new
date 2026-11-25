# Review 2026-11-25-midnight-snack-mission

## Blocking

1. **The HUD overlaps at 320 × 480.** In both languages, the remaining-bites count and the clock draw over each other. Give the clock its own space or move the snack count to a second row when the labels collide. [index.html:444](C:/work/haruhanpan/play/items/midnight-snack-mission/index.html:444)
2. **Keyboard holds behave differently from touch holds.** The focused Start button starts on Space release, so the hold never counts as munching. The focused Retry button also bypasses the repeat guard. Holding Enter through the 600 ms lock can retry without a fresh press. During play, Space and Enter on the focused sound button munch instead of toggling sound. Handle fresh Start and Retry presses explicitly and preserve native keyboard activation for the sound button. [index.html:488](C:/work/haruhanpan/play/items/midnight-snack-mission/index.html:488)
3. **Dragging outside the play area can keep munching active.** Pointer capture suppresses `pointerleave` while the pointer is held, so a drag outside the iframe can leave the game munching until release. Check the bounds on captured `pointermove` and clear only the pointer that left, preserving multitouch. [index.html:462](C:/work/haruhanpan/play/items/midnight-snack-mission/index.html:462)
4. **The catch frame can award a bite.** `updatePlay()` scores bites before checking whether the open-door grace period expired. A deterministic check with 5 ms of grace left and a bite due on the next frame ended the run with an extra point. Resolve the catch before applying bites for that frame. [index.html:264](C:/work/haruhanpan/play/items/midnight-snack-mission/index.html:264)
5. **Screen readers cannot read the live HUD.** The canvas is hidden from assistive technology, and the status region announces door events without exposing the current score, snack, or remaining bites. Add localized, readable HUD values in the DOM and reserve urgent announcements for the door cues. [index.html:32](C:/work/haruhanpan/play/items/midnight-snack-mission/index.html:32)

## Improvements

1. Use the localized **Score** label for the running total, or show the actual bite count alongside it. The current HUD labels a total that includes completion and patience bonuses as bites. [index.html:447](C:/work/haruhanpan/play/items/midnight-snack-mission/index.html:447)
2. Increase the sound button from 48 × 48 px to 56 × 56 px to meet the item spec. Its current size clears the repository’s 44 px minimum. [index.html:22](C:/work/haruhanpan/play/items/midnight-snack-mission/index.html:22)
3. Fit the footstep count to the warning duration. At higher levels, a warning shorter than 440 ms drops the third thud even when three were selected. [index.html:222](C:/work/haruhanpan/play/items/midnight-snack-mission/index.html:222)
4. Update the category example in `play/ITEMS.md` to include `games`. The item metadata matches the idea spec, and the repository validator accepts the category. [play/ITEMS.md:21](C:/work/haruhanpan/play/ITEMS.md:21)

All 53 repository tests passed. Browser previews covered Korean and English at 320 × 480 and 390 × 844, using a fixture to select English. Source inspection covered localization, contrast, focus styling, reduced-motion handling, and the absence of network calls, dialogs, `eval`, and `innerHTML`. Browser input automation required unavailable approval, so keyboard and touch findings came from source inspection.

## Verdict

CHANGES