# Review 2026-11-23-ondol-pipe-puzzle

## Blocking

1. **Reduced motion leaves the tutorial ring pulsing.** The animation selector `button.pipe.hint` outranks the reduced-motion selector `.pipe.hint`. Match the original selector’s specificity in the media query so the tutorial ring stays visible and still. [index.html](/C:/work/haruhanpan/play/items/ondol-pipe-puzzle/index.html:31)
2. **Holding Enter can skip the room-clear screen.** The solving keydown moves focus to the advance button. A repeated Enter keydown can then activate that button because the repeat guard only covers the board. Suppress repeated Enter on the advance button while allowing a fresh press to advance immediately. [Focus handoff](/C:/work/haruhanpan/play/items/ondol-pipe-puzzle/index.html:244) · [Keyboard handler](/C:/work/haruhanpan/play/items/ondol-pipe-puzzle/index.html:299)
3. **Rooms 2 and 3 start with different pipe orientations than specified.** The documented rotations yield minimums of 5 and 11 turns after accounting for straight-pipe symmetry. The implementation changes the layouts to reach the stated minimums of 7 and 13. Reconcile the rotation table and the shipped boards so the reference run has one reproducible setup. [Board specification](/C:/work/haruhanpan/pipeline/jobs/2026-11-23-ondol-pipe-puzzle/02-idea.md:53) · [Room definitions](/C:/work/haruhanpan/play/items/ondol-pipe-puzzle/index.html:99)

## Improvements

1. **Keep the focus and hint rings above adjacent tiles.** Neighboring pipe buttons can cover portions of an outward ring. Raise the focused or hinted pipe in the stacking order so the full ring remains visible. [index.html](/C:/work/haruhanpan/play/items/ondol-pipe-puzzle/index.html:21)
2. **Update the category example in `ITEMS.md`.** The brief and current validator accept `games`, and the item passes validation. The guide still lists the older category names. [Item guide](/C:/work/haruhanpan/play/ITEMS.md:21) · [Validator](/C:/work/haruhanpan/play/test/items.test.mjs:25)
3. **Complete interactive browser QA before publishing.** All 32 repository tests passed. Both dictionaries and metadata match the brief. Script checks reproduced 300 and 280 with storage blocked. The Korean start screen fit at 320×480 and 390×480, and the existing thumbnail rendered. Source inspection found no network calls, dialogs, `eval`, or user input passed to `innerHTML`. Browser interaction was blocked, leaving the full touch and keyboard flows, later-screen mobile layouts, and live announcements unverified. The build and thumbnail-generation checks also remain pending.

## Verdict

CHANGES