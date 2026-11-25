# Review 2026-11-25-snowflake-to-universe

## Blocking

1. **Auto trip can head in the wrong direction or stop short.** Starting at `z = −14.55` sends the trip outward toward the universe, although the spec calls for a trip toward the proton below `−2.5`. The outward trip announces arrival at `27.164` instead of reaching `27.5`. [Auto-trip logic](C:/work/haruhanpan/play/items/snowflake-to-universe/index.html:359)
2. **The info card shows an object outside its current range.** At `z = 23.8`, the card names Andromeda even though it is outside the ±0.9-decade threshold and the collection logic finds no current object. Show an empty state wherever no object qualifies, with the proton–Planck skip action reserved for that gap. [Current-object handling](C:/work/haruhanpan/play/items/snowflake-to-universe/index.html:764)
3. **The English universe card clips its name and fact at 320 px.** The name overflows its column, and the fact needs four lines where the card displays three. Let the size wrap beneath the name and shorten the fact while keeping the explanation about cosmic expansion. [Card layout](C:/work/haruhanpan/play/items/snowflake-to-universe/index.html:33)
4. **Canvas labels lose contrast over bright objects.** At 320 px, the entire “Grain of salt” label sits over the pale salt drawing. Give labels a dark backing that keeps the text readable over every object. [Canvas label drawing](C:/work/haruhanpan/play/items/snowflake-to-universe/index.html:699)
5. **Keyboard focus drops after Start, and the collection leaves the stage interactive.** Activating Start leaves focus on `BODY` once the overlay disappears. With the collection open, `A` starts Auto trip and the exposed canvas still accepts gestures. Move focus into the explorer after Start, keep focus within the open sheet, and suspend stage input until it closes. [Start transition](C:/work/haruhanpan/play/items/snowflake-to-universe/index.html:350) · [Collection and keyboard handling](C:/work/haruhanpan/play/items/snowflake-to-universe/index.html:869)
6. **The viewport disables browser magnification on mobile browsers that honor the setting.** Remove `maximum-scale=1` and `user-scalable=no` so players can enlarge the interface. Keep the game’s pinch handling scoped to the stage. [Viewport settings](C:/work/haruhanpan/play/items/snowflake-to-universe/index.html:5)
7. **Some localized text sits outside the required bilingual dictionary.** Both languages have share copy and unit labels, but the templates are embedded in `shareText` and `fmt`. Move the language-specific text into the Korean and English dictionaries. [Item localization rule](C:/work/haruhanpan/play/ITEMS.md:43) · [Share text](C:/work/haruhanpan/play/items/snowflake-to-universe/index.html:932)

## Improvements

1. Skip undiscovered `?` cells in the tab order and give them a localized accessible name such as “Undiscovered.” The collection currently exposes all 32 cells as focusable buttons, even when they have no action. [Collection grid](C:/work/haruhanpan/play/items/snowflake-to-universe/index.html:898)
2. Keep the specified 200 ms opacity fade for reduced-motion jumps. The current code holds an opaque veil for 110 ms and disables its transition, producing a hard cut. [Reduced-motion styles](C:/work/haruhanpan/play/items/snowflake-to-universe/index.html:81) · [Jump behavior](C:/work/haruhanpan/play/items/snowflake-to-universe/index.html:338)
3. Add regression coverage for the 320 px English card, collection focus, and both auto-trip endpoints. All 65 repository tests passed. Chromium checks covered Korean and English layouts at 320, 360, and 390 px and used synthetic touch input. Source inspection found no external requests, browser dialogs, `eval`, or user-controlled `innerHTML`.

## Verdict

CHANGES