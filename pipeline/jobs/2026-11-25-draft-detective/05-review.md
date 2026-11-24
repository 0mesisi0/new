# Review 2026-11-25-draft-detective

## Blocking

1. **A canceled pointer press can swallow the next keyboard activation.** Cancel a press on a strip, hide and reopen the tab, then focus that strip and press Enter or Space. The click handler rejects the keyboard-generated click because the button still holds the old pointer generation. A logic check reproduced the dropped activation. Clear canceled press state and apply the generation check only to pointer-generated clicks. [index.html](/C:/work/haruhanpan/play/items/draft-detective/index.html:260)
2. **The seal animation makes strip targets overlap.** At 320 × 480, each strip is about 106 px tall with a 6 px gap. Scaling the button to 115% extends it about 8 px into the neighboring target. Animate the artwork inside the button and keep the button’s hit area fixed. [index.html](/C:/work/haruhanpan/play/items/draft-detective/index.html:26)
3. **Touch gesture suppression covers only the strip buttons.** A pinch starting on the door or elsewhere in the play area can still trigger browser zoom. Apply `touch-action: none` to the play area, as required by `ITEMS.md`, and keep native button clicks as the activation path. [index.html](/C:/work/haruhanpan/play/items/draft-detective/index.html:28) · [ITEMS.md](/C:/work/haruhanpan/play/ITEMS.md)

## Improvements

1. Return focus to **Start** when the player selects **Title screen**. The result section currently hides the focused button without moving focus to the newly visible screen. [index.html](/C:/work/haruhanpan/play/items/draft-detective/index.html:189)
2. Match `#demo` exactly and have thumbnail QA open it for this item. The current substring match also activates demo mode for fragments such as `#demolition`, and the thumbnail generator captures the title screen because it supplies `thumb=1` without `#demo`. [index.html](/C:/work/haruhanpan/play/items/draft-detective/index.html:116) · [qa.cjs](/C:/work/haruhanpan/play/scripts/qa.cjs:105)
3. Complete the interactive publishing checks after the fixes. All 40 repository tests passed. Browser previews at 320 × 480 and 390 × 844 showed six targets above 44 × 44 px in both languages. Source checks confirmed matching bilingual copy, sufficient text and focus-indicator contrast, reduced-motion rules, and no network APIs, dialogs, `eval`, or user-controlled `innerHTML`. Logic checks confirmed a 60-point perfect run, termination on the third miss, and demo play without storage access. The browser controls required approval, so live keyboard, touch, result layout, and reduced-motion checks remain unverified. The build and thumbnail QA write files and were skipped in the read-only workspace.

## Verdict

CHANGES