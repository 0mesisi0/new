# Review 2026-11-23-pocket-hand-warmer

## Blocking

1. **Make the pouch and the primary action one native button.** The pouch illustration sits in a pointer-only `div`, while keyboard users focus a separate button below it. The scene’s click handler also lets users tuck the pouch by clicking empty space or the pocket. Put the artwork inside the primary button and keep that same button focused as its action changes. [Pouch markup](/C:/work/haruhanpan/play/items/pocket-hand-warmer/index.html:45) · [Activation handlers](/C:/work/haruhanpan/play/items/pocket-hand-warmer/index.html:254)
2. **Suppress touch gestures in the play area.** The app uses `touch-action: manipulation`, which suppresses double-tap zoom but still allows panning and pinch zoom. Apply the required `touch-action: none` to the play area while preserving native button activation. [Touch styles](/C:/work/haruhanpan/play/items/pocket-hand-warmer/index.html:11) · [Item rules](/C:/work/haruhanpan/play/ITEMS.md:42)

## Improvements

1. Remove the duplicated sound label. The toggle currently displays “Sound: Sound off” and “소리: 소리 꺼짐.” Display the localized state string alone and retain the stable accessible name and `aria-pressed`. [Sound rendering](/C:/work/haruhanpan/play/items/pocket-hand-warmer/index.html:131)
2. Complete live keyboard and touch verification before publishing. All 34 tests passed, and the state-logic checks covered the count cap, timing guards, resize, hidden-tab pause, and reduced motion. Both languages fit at 320 × 390 and 320 × 480 with 44 px or larger buttons, and the existing thumbnail shows the finished pocket. The metadata matches the spec, the main text and focus colors have sufficient contrast, and source inspection found no network calls, dialogs, `eval`, or user input passed to `innerHTML`. Browser approval blocked live input checks, and the read-only workspace prevented a fresh build and thumbnail run.

## Verdict

CHANGES