# Review 2026-11-25-trend-lifespan-fortune

## Blocking

1. **The certificate is unavailable to screen readers.** The result canvas has no accessible name or text equivalent, and `finishReading()` leaves focus without a result announcement. Expose the localized lifespan, tier, curve summary, milestones, comment, and next trend as accessible text, then move focus to a visible result heading. The browser accessibility snapshots showed the action buttons but none of the certificate content. (`index.html:84–90, 429–432`)
2. **The 12-character limit changes four English examples and makes three classic inputs unreachable.** “Ending every sentence with ‘~ing’” becomes “Ending every,” which also changes the seed. `roasted sweet potato`, `roasted chestnuts`, and `red bean porridge` are truncated before classic matching. Reconcile the localized labels and canonical values with the input cap so every example and classic resolves as intended. (`index.html:124, 151, 393–408, 415–418`)
3. **Enter can submit unfinished Korean text.** The key handler ignores `isComposing`, even though the input handler accounts for composition. A composing Enter event entered the reading state in a handler check. Ignore submission keys during composition. (`index.html:407–408, 483–489`)
4. **The narrow layout requires substantially more scrolling than the spec calls for.** At 320 × 480, the example chips occupy five rows in English and three in Korean, with the submit button starting below the viewport in both languages. At 390 × 520, it also starts below the viewport in both languages. Compact the start layout while retaining the 44 px targets, and allow pinch zoom so users can enlarge the certificate’s small labels. (`index.html:5, 13–32, 51`)
5. **Several controls and result labels have insufficient contrast.** Passed milestone text is about 3.56:1 against the certificate paper, “Try another” is about 3.65:1 against its red fill, and the input border is about 2.18:1 against its fill. Bring normal-size text to at least 4.5:1 and the input boundary to at least 3:1. (`index.html:21, 45–46, 231–233, 303–315`)

## Improvements

1. Expose the empty submit state with `aria-disabled` while preserving the validation hint and shake on attempted activation. Clear the hint when valid input is entered. Label the first-seen radio group from its visible label and support arrow-key selection within it. (`index.html:63–68, 398–412, 483–500`)
2. Add mouse-drag scrolling to the result panel. Native touch panning, wheel scrolling, and keyboard scrolling are present. On coarse pointers, retry also skips the specified text selection. (`index.html:42, 448, 476–500`)
3. Add the dedicated “Returns every winter” line to classic share text in both languages, and handle “1 day left” and “ended 1 day ago” in English. Align the Korean metadata description with the actual milestone table, which currently shows SNS coverage where the description promises a convenience-store debut. (`index.html:127, 140, 198–203, 254–259`, `meta.json:9`)
4. Start the badge at the specified tilt and finish it upright. Use the paused animation clock for the milestone pulse, and clear demo mode on retry so later readings animate normally. (`index.html:266–269, 309–313, 429–448, 507–526`)
5. All 57 repository tests passed. Source inspection found no external requests, dialogs, `eval`, or HTML insertion of user input. The layout and accessibility snapshots used desktop Chromium at mobile viewport sizes. Physical touch, clipboard, and download behavior remain unverified.

## Verdict

CHANGES