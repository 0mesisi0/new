# Review 2026-11-22-scarf-untangler

## Blocking

1. **Held Enter can make unintended moves.** The `keydown` handler returns on repeats without canceling the browser’s native button activation. Holding Enter on Start can repeatedly tug strip 1 after focus moves there, adding mistakes. Holding Enter on the last strip can activate Next knot once the transition guard expires. Suppress repeated Enter activation on game buttons while preserving single presses. [index.html](/C:/work/haruhanpan/play/items/scarf-untangler/index.html:221)
2. **The transition guard discards deliberate input.** A fresh tap or keypress on Next knot or Play again within 180 ms of the final pull is ignored even though the new button is visible and focused. Limit duplicate suppression to activations of the same control and guard each action by its current screen. [index.html](/C:/work/haruhanpan/play/items/scarf-untangler/index.html:217)
3. **The category conflicts with the written requirements.** The idea and `play/ITEMS.md` specify `puzzle`, while the metadata uses `games`. The current site registry accepts `games` and has no `puzzle` entry, so changing the metadata alone would fail validation. Reconcile the spec and the live catalog before publishing. [meta.json](/C:/work/haruhanpan/play/items/scarf-untangler/meta.json:4), [site.mjs](/C:/work/haruhanpan/play/src/site.mjs:11)

## Improvements

1. Keep the localized `pullStrip` text as the button’s accessible name and expose the blocker information as an accessible description. This preserves the short control name and gives screen-reader players the crossing information. [index.html](/C:/work/haruhanpan/play/items/scarf-untangler/index.html:133)
2. Give the crossing hint a contrasting outline. When strip 1 is blocked, parts of the hint disappear against the strip because both use the same cranberry color. Also honor reduced-motion changes made while the page is open. [index.html](/C:/work/haruhanpan/play/items/scarf-untangler/index.html:72), [index.html](/C:/work/haruhanpan/play/items/scarf-untangler/index.html:94), [index.html](/C:/work/haruhanpan/play/items/scarf-untangler/index.html:127)
3. Finish browser verification before publishing. All 19 `npm test` checks passed. Scripted checks exercised both final-knot branches and produced scores of 1,500 and 1,480. Both locales contain the required strings, the existing thumbnail shows a readable board, and source inspection found no network calls, dialogs, `eval`, or user-controlled data passed to `innerHTML`. Browser permissions prevented interactive layout and native touch checks at 320–390 px. The build and thumbnail QA runs remain unverified.

## Verdict

CHANGES