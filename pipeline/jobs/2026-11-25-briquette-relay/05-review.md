# Review 2026-11-25-briquette-relay

## Blocking

1. **A stalled frame can turn a perfectly timed tap into a fumble.** I reproduced a tap at the scheduled arrival while the briquette was still recorded as spawning. `step()` advanced only to the resting phase, so `onCatch()` counted a fumble. Advance through all phases due at the captured input timestamp before judging the tap. [index.html](C:/work/haruhanpan/play/items/briquette-relay/index.html:279)
2. **The final-crack timer keeps running when the tab is hidden.** Hiding the page during the 600 ms slow-motion sequence lets that time elapse while the player is away. The results can appear as soon as the tab returns. Freeze the remaining transition time on hide, as the spec requires for pending timers. [index.html](C:/work/haruhanpan/play/items/briquette-relay/index.html:191)
3. **The primary timing cue has low contrast against the stairs.** The gold catch ring has about 1.25:1 contrast against the snow and 1.22:1 against the stair stripes. Give the ring a dark outline so players can follow it across the alley. The white 14 px text on the red new-best ribbon also falls below 4.5:1, at 4.13:1. [Catch ring](C:/work/haruhanpan/play/items/briquette-relay/index.html:447) · [Results ribbon](C:/work/haruhanpan/play/items/briquette-relay/index.html:22)
4. **Activating mute drops keyboard focus.** Chromium confirmed that focus moves to the document body after the toggle. The next Enter or Space can start or retry a run or register a catch. Keep focus on the mute button after activation. [index.html](C:/work/haruhanpan/play/items/briquette-relay/index.html:107)

## Improvements

1. Move the three life icons to the top right as specified, with room for the 44 px mute button. At present, the lives and combo both occupy the center column. [index.html](C:/work/haruhanpan/play/items/briquette-relay/index.html:480)
2. Restore browser zoom for players who need larger text. The viewport disables zoom across the page, while the canvas already suppresses touch gestures in the play area. [index.html](C:/work/haruhanpan/play/items/briquette-relay/index.html:5)
3. Update the category example in `play/ITEMS.md`. The item's `games` category matches the idea spec and the site's category definitions, and all 59 repository tests passed. The documented example still lists the older categories. [Item metadata](C:/work/haruhanpan/play/items/briquette-relay/meta.json:4) · [Item guide](C:/work/haruhanpan/play/ITEMS.md:20)
4. Add the confirmed timing and focus regressions to browser QA. Chromium iframe checks at 320 and 390 px found that the start and results controls fit at 480 px high in both languages and meet the required target sizes. Simulated keyboard and touch events exercised the countdown, catches, pause, resume, and retry. The Korean and English string dictionaries cover the same keys, and the source review found no network calls, dialogs, `eval`, or user input passed to `innerHTML`. [Localization and overlays](C:/work/haruhanpan/play/items/briquette-relay/index.html:37) · [Browser QA](C:/work/haruhanpan/play/scripts/qa.cjs:41)

## Verdict

CHANGES