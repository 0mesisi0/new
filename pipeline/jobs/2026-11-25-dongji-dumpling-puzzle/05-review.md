# Review 2026-11-25-dongji-dumpling-puzzle

## Blocking

1. **Holding Enter can undo multiple moves and lower the score.** With two or more placements in history, focus Undo and hold Enter. The repeat check exits without suppressing native button activation, and the click guard accepts keyboard-generated clicks. Suppress repeated Enter activation on gameplay buttons while preserving single Enter and Space presses. [index.html](/C:/work/haruhanpan/play/items/dongji-dumpling-puzzle/index.html:245)
2. **Resizing mid-move can leave two animation loops running.** A resize clears the effects but leaves the requested frame pending. If another move starts before that frame runs, both callbacks advance the new effect and schedule another frame. Track and cancel the pending frame when clearing effects. Also clear the effect when Undo reverses its placement so the animation matches the board. [index.html](/C:/work/haruhanpan/play/items/dongji-dumpling-puzzle/index.html:188) · [index.html](/C:/work/haruhanpan/play/items/dongji-dumpling-puzzle/index.html:209)

## Improvements

1. Remove the filled bowls from the result screen’s tab order while preserving their accessible descriptions. The completed board currently exposes three enabled buttons whose activation has no effect. [index.html](/C:/work/haruhanpan/play/items/dongji-dumpling-puzzle/index.html:150)
2. Refresh the reduced-motion setting when it changes. The placement animation reads the preference once, so enabling reduced motion during an open round leaves the arc and ripple active. [index.html](/C:/work/haruhanpan/play/items/dongji-dumpling-puzzle/index.html:210)
3. Update the category example in `play/ITEMS.md`. The item uses `games`, which matches the idea and passes the current category validator. The guide still lists older category IDs. [ITEMS.md](/C:/work/haruhanpan/play/ITEMS.md:21) · [meta.json](/C:/work/haruhanpan/play/items/dongji-dumpling-puzzle/meta.json:4)
4. Complete the build, thumbnail QA, and native keyboard and touch checks before publishing. All 39 repository tests passed. The state checks covered stuck recovery, full rewind, zero and perfect scores, blocked storage, and demo isolation. Both languages fit the tested mobile layouts with gameplay targets above 44 px, and the existing thumbnail shows three filled bowls and a legible score. Source inspection found no network calls, dialogs, `eval`, or user input passed to `innerHTML`. The read-only checkout prevented build and thumbnail regeneration, and browser approval blocked interactive checks. The browser snapshots left an untracked `.playwright-mcp/` directory.

## Verdict

CHANGES