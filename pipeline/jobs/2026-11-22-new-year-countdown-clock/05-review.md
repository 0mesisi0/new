# Review 2026-11-22-new-year-countdown-clock

## Blocking

1. **The clock takes focus without a control being removed.** At `index.html:171–176`, every tick focuses a heading whenever `document.body` is active, including on initial load. The heading’s focus outline overlaps the KST date in Chromium at both 320 × 480 and 390 × 480. Preserve focus during ordinary ticks and move it only for the specified rehearsal actions or when a transition hides the focused control. Leave enough space around the heading for its focus outline.
2. **The countdown number becomes difficult to read on every change.** At `index.html:25–26`, the animation starts at 20% opacity, putting the gold digits at about 1.59:1 contrast against navy. Keep the number at or above 3:1 throughout the animation. The reduced-motion path already skips the animation.
3. **An open clock misses the specified KST boundaries.** At `index.html:183–198`, the deliberate 8 ms delay leaves `11` on screen at `2026-12-31T14:59:50Z`, `1` at midnight, and the greeting visible at `15:01:00Z` in a deterministic timer check. Schedule updates for the actual second boundaries and remove the equivalent delay from the rehearsal timer.

## Improvements

1. **Clear confetti when the live greeting is dismissed.** At `index.html:222–225`, selecting **Show next countdown** during the first 900 ms leaves the greeting confetti visible over the next countdown. Reuse the cleanup already called when leaving rehearsal.
2. **Add focused browser QA for the clock.** The 27 tests passed, both dictionaries and metadata matched the specification, and the checked-in thumbnail shows the live clock. The source contains no network calls, dialogs, `eval`, or `innerHTML`. The review verified the Korean live layout in Chromium and exercised timing with a simulated clock. Browser permissions prevented interactive keyboard and touch verification, and the read-only workspace prevented running the build and thumbnail QA.

## Verdict

CHANGES