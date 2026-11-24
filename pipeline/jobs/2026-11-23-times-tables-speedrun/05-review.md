# Review 2026-11-23-times-tables-speedrun

## Blocking

1. **Keypad navigation keys can submit answers.** The shortcut handler matches the physical key code. With Num Lock off, keypad End still reports `Numpad1` and submits choice 1. This was reproduced with a simulated key event. Match `event.key` against `1`–`4` and ignore Ctrl, Alt, and Meta combinations. [Keyboard handler](C:/work/haruhanpan/play/items/times-tables-speedrun/index.html:263)
2. **The equation has no visible focus indicator.** Starting or retrying moves focus to the equation. The later `.eq { outline: none }` rule overrides `:focus-visible`, so keyboard players get no visual cue about where focus moved. Remove the override or add an explicit `.eq:focus-visible` rule. [Focus styles](C:/work/haruhanpan/play/items/times-tables-speedrun/index.html:39)

## Improvements

1. Restore the specified 12 px outer padding at 320 × 480. The compact-height rule uses 8 px, which the browser’s layout snapshot confirmed. [Compact layout](C:/work/haruhanpan/play/items/times-tables-speedrun/index.html:64)
2. Add `learn` to the category list in `play/ITEMS.md`. The metadata matches the idea spec, and the repository validator accepts it. [Item guide](C:/work/haruhanpan/play/ITEMS.md)
3. Complete prepublish QA in a writable environment. All 36 repository tests passed. The Korean and English strings and metadata copy match the spec, and the checked text colors meet 4.5:1 contrast. Simulated checks covered hidden-tab timing, duplicate submissions, best-score writes, and retry. Source inspection found no external requests, dialogs, `eval`, or user input passed to HTML insertion. The read-only workspace prevented the build and thumbnail QA, and browser interaction required approval, leaving native touch and keyboard play, the full mobile results layout, and best-score persistence across reloads unverified.

## Verdict

CHANGES