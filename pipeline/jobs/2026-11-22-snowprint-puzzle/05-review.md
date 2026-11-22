# Review 2026-11-22-snowprint-puzzle

## Blocking

1. **The highlighted Undo button loses text contrast on hover.** After getting stuck, hover over Undo. The generic hover rule overrides its amber background while leaving the text navy, dropping contrast to 2.04:1. Give the highlighted button an explicit hover style that preserves readable contrast. [index.html:46](C:/work/haruhanpan/play/items/snowprint-puzzle/index.html:46)
2. **Ice is hard to distinguish from fresh snow.** White streaks have at most 1.57:1 contrast against the ice, and the ice and snow fills differ by 1.46:1. Darken the streaks so players can recognize a slide tile by its shape. [index.html:112](C:/work/haruhanpan/play/items/snowprint-puzzle/index.html:112)
3. **The metadata and publishing requirements disagree on category.** The idea and `play/ITEMS.md` specify `puzzle`, while the item uses `games`. The current site accepts `games` and has no `puzzle` category, so changing the metadata alone would fail validation. Reconcile the publishing spec with the site taxonomy before sign-off. [meta.json:4](C:/work/haruhanpan/play/items/snowprint-puzzle/meta.json:4), [site.mjs:12](C:/work/haruhanpan/play/src/site.mjs:12)

## Improvements

1. **Keep the full board focus ring visible at 320 px.** The six-column board is 299 px wide inside a 304 px wrapper. Its outline extends 6 px past each edge, so the wrapper clips both sides. Reserve room for the outline or draw it inside the board. [index.html:25](C:/work/haruhanpan/play/items/snowprint-puzzle/index.html:25), [index.html:38](C:/work/haruhanpan/play/items/snowprint-puzzle/index.html:38)
2. **Use accurate feedback when a player tries to return to the starting mat.** The mat reports “There’s already a footprint there” even though it displays no footprint. Use the existing generic blocked message for that tile. [index.html:137](C:/work/haruhanpan/play/items/snowprint-puzzle/index.html:137)
3. **Add the full route to browser QA.** All 20 repository tests passed, and all 38 UI string pairs and four metadata copy pairs matched the spec. Chromium checks at 320 × 480 in Korean and 390 × 480 in English used synthetic key and pointer events to complete all three yards at 37/37, verify focus transitions and 44 px targets, and check for overflow. Source inspection found no network calls, dialog APIs, `eval`, or user input passed to `innerHTML`. Native touch and keyboard interaction remain unverified. The read-only workspace prevented rerunning the build and thumbnail QA.

## Verdict

CHANGES