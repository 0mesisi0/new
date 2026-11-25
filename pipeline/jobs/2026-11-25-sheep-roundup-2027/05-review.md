# Review 2026-11-25-sheep-roundup-2027

## Blocking

1. **Space barks while the mute button has keyboard focus.** The global handler cancels the button’s native Space activation and starts the bark cooldown. Let focused buttons handle Space and Enter, and use Space to bark when focus is on the play area. [index.html](C:/work/haruhanpan/play/items/sheep-roundup-2027/index.html:407)
2. **Holding P or Esc can immediately resume a paused round.** The first keydown pauses and the next repeat resumes, so the timer can restart while the player is still holding the pause key. Ignore repeated pause and resume keystrokes. [index.html](C:/work/haruhanpan/play/items/sheep-roundup-2027/index.html:410)
3. **Keyboard focus can leave the pause overlay.** Tab and Shift+Tab can reach the bark button behind it because the underlying controls remain in the tab order. Keep focus on the active pause controls and restore it on resume. [index.html](C:/work/haruhanpan/play/items/sheep-roundup-2027/index.html:369)
4. **The mobile layout shrinks and shifts the world beyond the specified fit.** The reserved bark strip drops the scale from `0.75` to `0.625` at 320 × 480 and from `1` to `0.875` at 390 × 640. Use the full viewport for the world scale and centering, and position the 56 px bark control independently. [index.html](C:/work/haruhanpan/play/items/sheep-roundup-2027/index.html:140)
5. **White start and pause text has insufficient contrast over snow.** The overlay colors yield about 2.96:1 before the text shadow, below the 4.5:1 threshold for the 16 px start copy and the 3:1 threshold for large text. Darken the overlay or add a solid backdrop behind the text. [index.html](C:/work/haruhanpan/play/items/sheep-roundup-2027/index.html:28)

## Improvements

1. Show the most sheep herded on its own line below the best score, including when the record is zero. The start screen currently appends it to the score line and hides it at zero. [index.html](C:/work/haruhanpan/play/items/sheep-roundup-2027/index.html:190)
2. Update the category list in `ITEMS.md`. The metadata uses `games`, which matches the idea, the live category registry, and the validator. [meta.json](C:/work/haruhanpan/play/items/sheep-roundup-2027/meta.json:4), [ITEMS.md](C:/work/haruhanpan/play/ITEMS.md), [site.mjs](C:/work/haruhanpan/play/src/site.mjs:12)
3. Complete a browser pass at 320 and 390 px. All 64 repository tests passed. Both languages matched the required string table, and source inspection found zero network calls, dialogs, `eval`, or `innerHTML` assignments. Source and handler checks covered touch release, target sizes, and reduced-motion settings. The sandbox blocked browser launch, so rendered layout and focus appearance remain unverified.

## Verdict

CHANGES