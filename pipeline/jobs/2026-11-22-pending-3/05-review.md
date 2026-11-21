# Review 2026-11-22-pending-3

## Blocking

1. **The category requirements conflict.** `play/items/puffer-zip/meta.json:4` uses `games`, which passes the live site validator. `02-idea.md` requires `arcade`, and `play/ITEMS.md` lists `arcade` without `games`. Align the spec and item guide with the live taxonomy, or add `arcade` to the site before changing the item.
2. **Touch gestures remain enabled over the coat and HUD.** `play/items/puffer-zip/index.html:27` sets `touch-action: none` on buttons, and the touch handler at line 330 covers only the control row. A pinch starting over the coat can still zoom the iframe. Apply the gesture policy to the full play area during the round.

## Improvements

1. **Restore focus when a paused page becomes visible.** At `index.html:294`, the visibility handler only handles hiding, while Resume receives focus through a separate window focus event. A simulated visibility-only return left focus on the document body. Focus Resume when the page is visible and focused, regardless of which event arrives.
2. **Ignore secondary mouse buttons on Zip up.** At `index.html:305`, the pointer handler accepts any mouse button. In a simulated right-button hold, the zipper advanced to 8%. Accept the primary mouse button while retaining touch and pen input.
3. **Finish the publishing checks in a writable browser environment.** All 18 repository tests passed, and all 23 strings matched the spec in both languages. Browser snapshots showed the start screen fitting at 320 and 390 px wide in both languages. Simulated keyboard and pointer rounds reached the result and reset correctly. Source inspection found no network calls, dialogs, `eval`, or user input passed to `innerHTML`. The existing thumbnail clearly shows the coat and zipper. Browser input actions required approval, and the read-only environment prevented the build and thumbnail QA, so full browser rounds and thumbnail regeneration remain unverified.

## Verdict

CHANGES