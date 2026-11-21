# Review 2026-11-22-pending-2

## Blocking

1. **The category conflicts with the release spec.** `meta.json:4` uses `games`, while `02-idea.md` requires `arcade` and `play/ITEMS.md` lists `arcade`. The current site taxonomy accepts `games`, which explains why `npm test` passes. Reconcile the spec and item guide with the site taxonomy before publishing.
2. **A delayed release can lose a clean pull.** In `index.html:117–135` and `324–330`, the animation callback can record a miss at 1,250 ms before the release handler processes an event stamped at 975 ms. I reproduced that order and got 0 instead of 100. Make the recorded release timestamp take precedence when it falls before the auto-top cutoff.
3. **Click suppression breaks assistive activation.** In `index.html:167–200`, the 600 ms suppression window discards a standalone activation even after feedback ends. I also reproduced a mouse click ending a pull started by assistive activation. Filter clicks by their originating gesture and keep the current input owner until it releases or cancels.

## Improvements

1. **Measure feedback time independently of animation frames.** `index.html:323–334` caps each frame’s contribution to the 280 ms countdown at 50 ms. At 10 frames per second, feedback lasts about 600 ms. Track visible elapsed time directly and pause the countdown while the document is hidden.
2. **Keep the meter in sync with the settled zipper.** `index.html:131` and `274–282` leave the meter at the release position during feedback while the drawing moves the zipper to the top. After a quick tap, the meter reports “Below the target band” while the zipper is already at the top. Update both from the settled position or hide the meter during feedback.
3. **Remove the one-pixel document overflow.** Chromium measured a scroll height of 481 px at 320 × 480 and 845 px at 390 × 844 in both languages. The visually hidden live region and seam-mark list sit after the full-height app. Anchor them inside the viewport. The visible buttons fit and met the 44 px target minimum.
4. **Capture the finished jacket for the thumbnail.** The checked-in thumbnail shows the start screen. Point the thumbnail capture at `#demo` to show the finished zipper, six seam marks, and score.
5. **Add the release-timing and input-ownership cases to QA.** All 17 tests passed. The Korean and English dictionaries matched the specified strings, and source inspection found no network calls, browser dialogs, `eval`, or user input passed to `innerHTML`. Chromium checks covered both viewport sizes, result and retry focus, and clipboard denial using simulated input. The build and thumbnail-generation commands require writes and were not rerun in this read-only review. Reduced motion was checked in CSS, and physical touch and screen-reader behavior remain unverified.

## Verdict

CHANGES