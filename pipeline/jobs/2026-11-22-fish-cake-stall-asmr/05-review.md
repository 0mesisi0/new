# Review 2026-11-22-fish-cake-stall-asmr

## Blocking

1. **The metadata conflicts with the publishing spec.** `meta.json:4` uses `radio`, while `02-idea.md:19` and `play/ITEMS.md:21` specify `chill`. The current site category registry contains `radio` and omits `chill`, which explains why the tests pass. Reconcile the category across the spec, registry, and metadata. Add the four specified tags under each locale in `meta.json`.
2. **Pending sounds survive stop and hide.** `index.html:244–271` schedules bubbles, rain taps, and pours without retaining their source nodes. `stopSched()` clears the interval, leaving those sources queued on the audio clock. Hiding during a pour can therefore let the rest of that pour play when sound resumes. Cancel pending and active transient sources on stop and hide.
3. **The wind slider has no visible effect on the ready screen.** `index.html:173–179` applies the wind setting only after the cup is full. Give wind a visible effect before the first pour, including a static response under reduced motion.
4. **The slider thumbs fall short of the required 44 px target.** `index.html:26–31` gives the range input a 44 px height but defines a roughly 28 px thumb in Chromium and Firefox, with no explicit expansion of the thumb’s hit area. Provide a 44 px grab area and verify dragging by touch.
5. **The viewport restricts magnification.** `index.html:5` sets `maximum-scale=1` and `user-scalable=no`, which can prevent low-vision users from zooming in browsers that honor those settings. Remove both restrictions.

## Improvements

1. Update both metadata descriptions to name the **Pour broth** button. The current descriptions direct readers to tap the illustrated cup, which is decorative.
2. Remove the button’s press-scale effect under reduced motion and retain its brightness feedback. `index.html:15` currently applies the same transform regardless of motion preference.
3. All 28 repository tests passed. All 22 specified strings matched in both locale dictionaries, and source inspection found no external requests, dialogs, `eval`, or `innerHTML`. The build, thumbnail QA, and interactive checks for mobile layout, keyboard, touch, focus, and audio remained unverified under the workspace and browser restrictions.

## Verdict

CHANGES