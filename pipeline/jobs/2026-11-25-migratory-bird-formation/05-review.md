# Review 2026-11-25-migratory-bird-formation

## Blocking

1. **The choice buttons all sit on one row.** At both 320×480 and 390×480, all three buttons started at `y = 265`. Their 44×44 px targets were clear of one another, but the spec requires three staggered lanes. Give each choice a separate vertical position and update its dashed leader line to match. [index.html](/C:/work/haruhanpan/play/items/migratory-bird-formation/index.html:204) · [02-idea.md](/C:/work/haruhanpan/pipeline/jobs/2026-11-25-migratory-bird-formation/02-idea.md:78)
2. **Rotating to 480×320 clips the result heading and hides the copy status.** In both languages, the heading started 21 px above the viewport and the copy failure message started below it. The result layout already hides the large flock at short heights. Add a compact layout for the remaining grid and spacing so the full result stays visible after rotation. [index.html](/C:/work/haruhanpan/play/items/migratory-bird-formation/index.html:44)

## Improvements

1. **Check that the copy request is still current before running the fallback.** When the clipboard promise rejects after **Play again**, the fallback still runs during round 1. The existing guard only checks whether to display the status. Move that check ahead of the fallback to prevent a stale clipboard write. [index.html](/C:/work/haruhanpan/play/items/migratory-bird-formation/index.html:299)
2. **Update the category list in `ITEMS.md`.** The item’s `games` category matches the idea and passes validation against the site configuration. The authoring guide still lists an older set of category IDs. [ITEMS.md](/C:/work/haruhanpan/play/ITEMS.md:21) · [site.mjs](/C:/work/haruhanpan/play/src/site.mjs:13)
3. **Add the minimum iframe size and a landscape result check to browser QA.** All 43 repository tests passed. Browser checks using scripted activation covered both languages at 320×480 and 390×480, including scoring, focus, retry, demo, blocked storage, and copy failure. The existing thumbnail renders the start screen. All specified Korean and English strings matched, and source inspection confirmed the focus and reduced-motion styles, the self-contained implementation, and that HTML insertion uses fixed templates and internal game data. Native touch and keyboard input still need a manual pass. The read-only workspace prevented running the build and thumbnail regeneration. [qa.cjs](/C:/work/haruhanpan/play/scripts/qa.cjs:63)

## Verdict

CHANGES