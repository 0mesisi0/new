# Review 2026-11-25-hotteok-flip

## Blocking

1. **The griddle is inaccessible to screen-reader users.** The canvas has no accessible representation of the six spots, their cooking stages, or the HUD. A player can press 1–6 but cannot tell which spots are open, when to flip or sell, or how much time remains. Expose the spot states and essential HUD values in localized HTML, with announcements for meaningful state changes. `index.html:44, 374–412, 444–458, 540–546`
2. **Space stops controlling the griddle when the sound button has focus.** Start a round, Tab to the sound button, and press Space. The global handler returns before `spaceKey()` runs, so the browser activates the sound button instead. Scope focus and shortcut handling so players can reliably use the advertised Space control during play. `index.html:187–196, 513–546`
3. **Burn processing can spend more lives than remain.** With one life left and three pancakes crossing `p = 1.30` on the same update, the harness recorded `lives = -2`. The slot loop applies every burn before checking whether the stall should close. Resolve pending taps before automatic burns, then stop processing slots as soon as the third burn closes the stall. Preserve the existing burn-ending priority when time expires on the same update. `index.html:202–209, 211–225, 276–295, 520–526`
4. **Spot numbers and the new-best stamp have low text contrast.** Empty spot numbers are about **2.4:1** against the griddle, and the 15 px new-best stamp is about **3.4:1** against the results card. Darken the stamp text and brighten the spot numbers to reach **4.5:1** against their backgrounds. `index.html:29, 35, 374–389`

## Improvements

1. Render the existing Korean and English `timeLeft` strings with a readable countdown. The HUD currently conveys remaining time through a bar alone. Remove the unused Korean-only `lbest` key. The bilingual metadata matches the brief. `index.html:66–72, 444–458`
2. Use a steady warning color for the final ten seconds in reduced-motion mode and apply the steam cap to every emission path. The timer still flashes, and the closing animation alone produced 24 steam particles in the reduced-motion harness, above the specified cap of 10. `index.html:197–200, 281–302, 444–450`
3. Update the category example in `play/ITEMS.md`. It omits `games`, the value required by the brief and accepted by the repository validator. `meta.json:4`, `play/ITEMS.md:21`
4. Add a browser regression check for both languages at 320–390 px, including 320×480. All 52 repository tests passed. The JavaScript harness confirmed that all six cells fit between the HUD and cup area at 320×480, 360×640, and 390×844, with hit areas of at least 98 px. Source inspection found no network calls, dialogs, `eval`, or `innerHTML` assignments. The local browser runner could not launch, so visual rendering, native touch and focus behavior, and browser network and dialog behavior remain unverified.

## Verdict

CHANGES