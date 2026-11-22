# Review 2026-11-22-tangerine-peel-puzzle

## Blocking

1. **The category conflicts with the written requirements.** `meta.json:4` uses `games`, while `02-idea.md` requires `puzzle` and `play/ITEMS.md` lists `puzzle`. The current site category registry accepts `games`, so changing the metadata to `puzzle` alone would fail `npm test`. Resolve the category discrepancy across the spec, item guide, and registry before publishing.
2. **Touch screen-reader users lack an accessible way to peel a square.** `index.html:113–124` exposes playable squares as images, and `index.html:183–210` moves only through physical pointer gestures or the board’s arrow-key handler. Expose available destinations as actionable controls that support screen-reader activation. Preserve arrow-key play and ensure a physical tap still moves only once.
3. **The finishing move has no visible settling animation.** The animated circle at `index.html:92–108` sits behind the larger stem marker on the final move. The animation also has no hidden-tab pause. Make the final ribbon segment visibly settle against the stem, pause decorative motion when the document is hidden, and preserve the existing reduced-motion behavior.

## Improvements

1. **Limit pointer input to the intended gesture.** At `index.html:183–203`, a right-click on an available square advances the route. An unrelated pointer can also clear the active gesture. Start tracking only a primary-button press or primary touch, and clear it only when that pointer releases or cancels.
2. **Keep the controls visible in narrow, short layouts.** In Chromium at 320 × 320, the two-column layout leaves a 60 px text column and clips the bottom of the Korean Start button. Gate the landscape layout on enough width for both columns. The Start screen fit at 320 × 480 and 390 × 480 in both languages.
3. **Prevent stale score announcements.** `index.html:77` queues a new timer for every live-region update. A fast move followed by Undo or Restart can announce an earlier score after the screen has changed. Cancel the pending announcement when a newer one replaces it.
4. **Finish browser verification before publishing.** All 21 `npm test` checks passed. The bilingual strings matched the spec, all three boards had the specified minimum and maximum scores, and the existing thumbnail showed a readable board. At 320 × 480, the sizing rules give four-column squares 49.75 px per side and buttons at least 48 px in height. Sampled text and focus-ring contrast passed, and source review found no network calls, dialogs, `eval`, or user-controlled values reaching `innerHTML`. Keyboard routes were exercised in a JavaScript harness. Browser interaction required unavailable approval, and the read-only workspace prevented a fresh build or thumbnail QA run.

## Verdict

CHANGES