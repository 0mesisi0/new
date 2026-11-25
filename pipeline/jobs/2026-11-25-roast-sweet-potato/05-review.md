# Review 2026-11-25-roast-sweet-potato

## Blocking

1. Simultaneous taps on different potatoes can drop a valid flip. The 80 ms cooldown is shared across the board. In an input-handler test, releasing two valid taps together flipped only the first potato. Track the cooldown per potato so multitouch works while repeated taps on one potato remain limited. [Flip handler](/C:/work/haruhanpan/play/items/roast-sweet-potato/index.html:249)
2. Potatoes can flip when the pointer is released outside the stove. The release handler relies on `pointermove` to detect movement, so a release 84 px from the press still flipped the potato when no move event was delivered. Check the final displacement on `pointerup` and handle lost pointer capture so canceled gestures return the potato to its slot. [Pointer release](/C:/work/haruhanpan/play/items/roast-sweet-potato/index.html:441)
3. Gameplay shortcuts conflict with mute-button focus. With mute focused, pressing `3` selects slot 3 but leaves focus on mute, so `Enter` activates mute and the potato remains on the stove. Move focus to a focusable game surface when play starts, resumes, or a slot-selection shortcut is used. Preserve native button activation when the player tabs back to mute. [Keyboard handler](/C:/work/haruhanpan/play/items/roast-sweet-potato/index.html:466)
4. Screen-reader players lack a timely cue to serve. The live region reports the gauges on selection and flip, while entry into the gold zone is drawn on the canvas. Announce when the selected potato becomes ready and expose the current score and charcoal count as text. [Slot announcements](/C:/work/haruhanpan/play/items/roast-sweet-potato/index.html:90) · [Gold-zone update](/C:/work/haruhanpan/play/items/roast-sweet-potato/index.html:388)
5. The Korean page exposes the canvas under the English name “Roast Sweet Potato.” Set its accessible name from the Korean and English string dictionary. [Canvas markup](/C:/work/haruhanpan/play/items/roast-sweet-potato/index.html:38)
6. The retry button’s pale focus ring has only **1.29:1** contrast against the cream card. Give the card’s button a darker focus outline. [Focus and card styles](/C:/work/haruhanpan/play/items/roast-sweet-potato/index.html:22)

## Improvements

1. Derive the desktop game-column width from both viewport dimensions. At 1920 × 600, the current formula produces a 480 × 600 play area. The specified centered 9:16 column would be about 338 px wide. Keep the full-viewport background and narrow-screen layout. [Layout calculation](/C:/work/haruhanpan/play/items/roast-sweet-potato/index.html:163)
2. Make the garnish and particle motion consistent with reduced-motion mode. That mode already disables shake and flip animation and keeps score feedback stationary, but spawn drops still travel and the frozen demo emits moving smoke at the normal rate. [Demo smoke](/C:/work/haruhanpan/play/items/roast-sweet-potato/index.html:356) · [Spawn animation](/C:/work/haruhanpan/play/items/roast-sweet-potato/index.html:617)
3. Update the category list in `ITEMS.md`. The item’s `games` category matches the idea and passes the current validator, while the documentation still lists `arcade` and omits `games`. [Documented schema](/C:/work/haruhanpan/play/ITEMS.md:21) · [Category validation](/C:/work/haruhanpan/play/test/items.test.mjs:25)
4. Add browser regression coverage for multitouch and keyboard focus. All 63 repository tests passed. Browser snapshots confirmed that the start screen fits at 320 × 480 in both languages and at 390 × 693 in English, with visible controls at least 44 px high. Pointer and keyboard edge cases were checked through the JavaScript handlers. Source review found no network calls, dialogs, `eval`, or user input passed to `innerHTML`. [Game source](/C:/work/haruhanpan/play/items/roast-sweet-potato/index.html:1)

## Verdict

CHANGES