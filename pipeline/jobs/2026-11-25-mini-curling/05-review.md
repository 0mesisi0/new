# Review 2026-11-25-mini-curling

## Blocking

1. **Start and Play again accept activation while the document is hidden.** Both buttons call `reset()` without a visibility check. A hidden-document test confirmed that Start changes the game to shot 1, violating the requirement to suspend input while hidden. Add the same `document.hidden` guard used by lane selection and Release. [index.html](/C:/work/haruhanpan/play/items/mini-curling/index.html:140)
2. **Play again moves out of the primary action position.** Start and Release span the bottom of the game. Play again is centered beneath the scores because the result section centers its children. Keep Play again in the same full-width bottom position so players can retry from the same spot. [index.html](/C:/work/haruhanpan/play/items/mini-curling/index.html:29)

## Improvements

1. **Keep the target notch visible at the moment of release.** The 6 px moving marker overlays the 6 px notch when they align, leaving only small red tips visible. Their colors have about 2.3:1 contrast against each other. Put the fixed notch on the edge of the gauge so players can see both cues at alignment. [index.html](/C:/work/haruhanpan/play/items/mini-curling/index.html:25)
2. **Make the published category guidance match the site.** `meta.json` correctly uses `games` for both the item spec and the site’s category list. `ITEMS.md` still shows the old categories. Update the guide so future items use values the build accepts. [meta.json](/C:/work/haruhanpan/play/items/mini-curling/meta.json:4) · [ITEMS.md](/C:/work/haruhanpan/play/ITEMS.md)
3. **Complete browser and publishing verification.** All 44 tests passed. The Korean and English start screens fit at 320 and 390 px wide, and the existing thumbnail shows the title and rink. A scripted check verified perfect scoring, duplicate-release protection, retry, reduced motion, and in-memory best scores with storage blocked. Source review found matching Korean and English strings and no network calls, dialogs, `eval`, or user input passed to `innerHTML`. Browser automation could inspect the start screens, but automatic approval review rejected keyboard input because approvals were disabled. Full browser keyboard and touch checks, play and result layouts, the build, and thumbnail-generating QA remain unverified.

## Verdict

CHANGES