# Review 2026-11-23-popup-pileup

## Blocking

1. **An input for one board can score or charge a penalty on the next.** If a number-key event waits in the queue past the 180 ms transition, `settle()` advances the board and `pick()` applies that same event to the new board. A Tab press can also clear the shared pointer guard before an old tap finishes. Track the board associated with each activation and discard inputs from earlier boards. [index.html](/C:/work/haruhanpan/play/items/popup-pileup/index.html:137)
2. **Hiding the page pauses board advancement but leaves the fold animation running on a separate clock.** The fold uses a CSS transition, and the capped `requestAnimationFrame` delta is computed and discarded. Drive the fold with capped foreground frame deltas so it resumes from the same point after a tab switch. Keep the static highlight for reduced motion. [index.html](/C:/work/haruhanpan/play/items/popup-pileup/index.html:24) · [index.html](/C:/work/haruhanpan/play/items/popup-pileup/index.html:251)
3. **Opening `#demo` reads local storage.** `bestMem` calls `readBest()` during initialization even though the demo uses a fixed best score of `10/10`. Skip the initial read in demo mode and load the saved score when retry starts a regular session. [index.html](/C:/work/haruhanpan/play/items/popup-pileup/index.html:122)
4. **A result announcement can fire after retry.** The live-region update is queued for 30 ms and survives reset. Retrying during that window moves focus to the first card, then announces the previous result. Cancel pending announcements when the game resets. [index.html](/C:/work/haruhanpan/play/items/popup-pileup/index.html:176)

## Improvements

1. Hide the decorative ad and notice glyphs from assistive technology. Chromium exposes `● ▲ ●` as standalone text on the result screen even though the cards are hidden. An inline SVG with `aria-hidden="true"` would also satisfy the artwork spec. [index.html](/C:/work/haruhanpan/play/items/popup-pileup/index.html:34)
2. Update the category example in `ITEMS.md`. It omits `games`, which the idea specifies and the repository validator accepts. [ITEMS.md](/C:/work/haruhanpan/play/ITEMS.md:18) · [items.test.mjs](/C:/work/haruhanpan/play/test/items.test.mjs:10)
3. Rerun the build and thumbnail QA after the fixes. All 35 tests passed. Both languages fit in Chromium start-screen snapshots at 320 and 390 px wide, and the existing thumbnail has a readable title and score. The main text and focus colors passed the contrast check. Source inspection found no network calls, dialogs, `eval`, or user input passed to `innerHTML`. Keyboard and pointer handlers were checked in a controlled script run. Live keyboard and touch checks remain unverified because browser input required approval, and the read-only workspace prevented running the build and thumbnail QA.

## Verdict

CHANGES