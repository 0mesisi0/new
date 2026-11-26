# Review 2026-11-25-winter-star-connect

## Blocking

1. **A drag can draw a line when released on its starting star.** At 320 × 480, I reproduced a drag that starts 14 px from Alnitak and releases on Alnitak’s center. The game draws Alnitak–Alnilam because the release hit test excludes Alnitak. Hit-test all stars on release and cancel when the starting star is the closest target. [index.html](/C:/work/haruhanpan/play/items/winter-star-connect/index.html:350)
2. **Nearby stars lose part of their 44 px touch targets.** Alnitak and Alnilam are about 18 px apart at 320 × 480 and 30 px apart at 390 × 693. The picker resolves some ambiguous taps, but drag releases silently choose the nearest star. Give every star a reliably selectable 44 px target and resolve ambiguous drag endpoints too. [index.html](/C:/work/haruhanpan/play/items/winter-star-connect/index.html:308)
3. **Tab skips the stars.** Every star button has `tabIndex = -1`, and the keyboard handler has no Tab behavior for the board. Arrow navigation reached every star at both tested sizes. Implement the specified Tab navigation, give the board focus when play starts, and retain a way to tab out to Hint and Sound. [index.html](/C:/work/haruhanpan/play/items/winter-star-connect/index.html:379)
4. **The Pleiades message is clipped on narrow screens.** At 320 px, the cluster is around x = 289, and the message is drawn to its right with roughly 23 px available. Keep the localized text within the canvas. Award the bonus on a completed tap so a drag or canceled touch cannot consume it. [Pointer handling](/C:/work/haruhanpan/play/items/winter-star-connect/index.html:331) · [Canvas label](/C:/work/haruhanpan/play/items/winter-star-connect/index.html:519)

## Improvements

1. **Measure elapsed play time independently of rendering.** The timer drops visible time beyond two seconds between frames and can count a frame that straddles the intro-to-play transition. Track time at scene and visibility transitions so rendering stalls do not affect best records. [index.html](/C:/work/haruhanpan/play/items/winter-star-connect/index.html:542)
2. **Show the best record consistently.** The finale hides the best-record line when a run sets a new record. Show the line alongside the badge, as the result spec requires. [index.html](/C:/work/haruhanpan/play/items/winter-star-connect/index.html:287)
3. **Allow browser zoom.** Remove `maximum-scale=1` and `user-scalable=no` so readers can magnify the instructions and fact cards. The canvas already uses `touch-action: none` for gameplay. [index.html](/C:/work/haruhanpan/play/items/winter-star-connect/index.html:5)
4. **Document the supported `learn` category.** The item spec and site registry both use `learn`, and the metadata passes validation. Add it to the category list in the item guide. [Site registry](/C:/work/haruhanpan/play/src/site.mjs:16) · [ITEMS.md](/C:/work/haruhanpan/play/ITEMS.md:21)
5. **Add a browser regression check for the narrow-screen interactions.** All 67 repository tests passed, both locales have matching string keys, and the static review found no network calls, dialogs, `eval`, or user-controlled `innerHTML`. Browser snapshots confirmed that the Korean and English finale controls fit at 320 × 480 and 390 × 693 respectively. Gameplay input was checked through the game handlers. Live touch, screen-reader behavior, and canvas contrast remain unverified. [index.html](/C:/work/haruhanpan/play/items/winter-star-connect/index.html)

## Verdict

CHANGES