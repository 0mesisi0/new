# Review 2026-11-21-paper-smoother

## Blocking

1. **A drag changes where Tab re-enters the grid.** In `index.html:172`, smoothing updates the tab stop on every crossed square, while focus stays where the press began. Drag from row 1, column 1 to column 4, then Tab away and Shift+Tab back. Focus lands on column 4 even though column 1 was the last focused square. Update the tab stop when focus actually moves.
2. **The final swipe segment can be skipped.** In `index.html:224–236`, `pointermove` processes coordinates, but `pointerup` only ends the stroke. If the release coordinates differ from the last move sample, the squares crossed in that final segment stay creased. Process the release coordinates before ending the stroke. Keep cancellation separate.
3. **The initial and reset progress are hidden from assistive technology.** In `index.html:54–55,143–146`, the visible counter is `aria-hidden` and the status region is empty on load and after reset or a paper change. Make the current count available in those states while preserving the single polite announcement during play.
4. **The metadata contract conflicts with the publishing code.** `meta.json` uses `cool` and language-specific tag arrays. `02-idea.md` specifies `chill` and a top-level tag array, and `ITEMS.md` lists `chill`. The current site validator accepts `cool`, and the card builder reads language-specific tags. Align the spec and publishing guide with the supported schema, or update the site and metadata together.

## Improvements

1. **Restore creases immediately when resetting or switching paper.** The opacity transition in `index.html:29–36` also runs when removing `.on`. Switching from a completed sheet briefly exposes the new illustration before the creases cover it. Apply the transition only when revealing a square.
2. **Add browser coverage for the mobile and input requirements.** All eight repository tests passed, and all 14 Korean and English dictionary entries match the spec. Static review found no network calls, dialogs, `eval`, or user-controlled `innerHTML`. At 320 × 480, the sizing rules give a 232 × 174 sheet with 58 px square targets, and reduced motion disables the fade. The sandbox blocked browser launch, so rendered layout at 320–390 px, focus visibility, and real touch behavior remain unverified.

## Verdict

CHANGES