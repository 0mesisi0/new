# Review 2026-11-25-winter-fireside-radio

## Blocking

1. **The mixer clips controls at 320 px.** At 320 × 568 in Korean, right-column sliders extend to x=352 and get clipped by the mixer. At 320 × 480 in English, the preset row starts below the fixed playback bar’s upper edge and requires both vertical and horizontal scrolling. Use grid columns that can shrink, let labels and presets wrap, and reserve enough height for the controls. [Compact mixer CSS](/C:/work/haruhanpan/play/items/winter-fireside-radio/index.html:19)
2. **Tapping the stove or clock can toggle the kettle.** The hit-test function maps a point on the upper stove body `(285, 226)` and a point on the clock pendulum `(300, 155)` to the kettle at all three checked viewport sizes. Align the touch regions with the drawings while keeping each target at least 44 CSS px. [Scene hit testing](/C:/work/haruhanpan/play/items/winter-fireside-radio/index.html:446)
3. **The timer sheet ignores the saved choice after reload.** With 30 minutes saved and no countdown running, the sheet highlights and focuses Off. Use the saved choice for the sheet selection while keeping the countdown off until the user chooses a duration. [Timer selection](/C:/work/haruhanpan/play/items/winter-fireside-radio/index.html:326)
4. **The clock tick lacks the specified combined peak cap.** The noise click and sine transient each peak at 0.25 and are summed into the same channel. The downstream compressor controls the mix and cannot enforce a per-event cap. Set a shared peak budget for the two components and verify the rendered transient. [Clock synthesis](/C:/work/haruhanpan/play/items/winter-fireside-radio/index.html:245)
5. **The page disables zoom on browsers that honor the viewport restriction.** Remove `maximum-scale=1` and `user-scalable=no` so people can magnify the mixer labels and controls. [Viewport settings](/C:/work/haruhanpan/play/items/winter-fireside-radio/index.html:5)

## Improvements

1. Bound the purr animation’s segment queue in the audio scheduler. The scheduler adds segments during background listening, but only the canvas renderer removes them. [Audio scheduler](/C:/work/haruhanpan/play/items/winter-fireside-radio/index.html:250)
2. Slow or suppress sleet streaks in reduced-motion mode. Snow slows down, but sleet still moves at 220 scene pixels per second. [Window animation](/C:/work/haruhanpan/play/items/winter-fireside-radio/index.html:508)
3. Add `radio` to the category examples in `play/ITEMS.md`. The metadata matches the brief, and the repository’s item tests accept the category. [Item metadata guide](/C:/work/haruhanpan/play/ITEMS.md:21)
4. Add an interactive regression check for touch hit areas, keyboard focus, and timer restoration. The 55 item tests passed, both language layouts rendered, and the source scan found no network calls, dialogs, `eval`, or `innerHTML`. Browser interaction approval was unavailable, so keyboard and touch behavior were reviewed from source, with direct checks of the hit-test and timer-selection logic. Live audio and focus transitions remain unverified.

## Verdict

CHANGES