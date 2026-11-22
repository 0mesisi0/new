# Review 2026-11-22-fish-cake-cart-asmr

## Blocking

1. **The first click on a different listening spot is ignored.** On a fresh load with no saved spot, clicking “At the alley entrance” leaves “By the pot” selected and zooms in on the pot. The click handler restores the old radio selection before the browser can emit `change`. Run the click-only framing logic only when the clicked radio already matches the selected spot. [index.html](/C:/work/haruhanpan/play/items/fish-cake-cart-asmr/index.html:328)
2. **Rotation clips the audio status message.** At 480 × 320, the English retry message extends to y=326 in a 320 px viewport. The scene’s 60 px minimum height pushes the message below the clipped edge. Let the illustration shrink further at short heights so the retry and automatic-pause messages stay visible. [index.html](/C:/work/haruhanpan/play/items/fish-cake-cart-asmr/index.html:14)

## Improvements

1. Skip expired bubble events after a scheduler delay. The current catch-up loop starts every missed bubble at the same audio time, which can produce a burst after a long main-thread stall. [index.html](/C:/work/haruhanpan/play/items/fish-cake-cart-asmr/index.html:251)
2. Preserve a distinct checked marker in forced-colors mode. The native radios are transparent, and the custom marker relies on fill and border colors that the browser can override. [index.html](/C:/work/haruhanpan/play/items/fish-cake-cart-asmr/index.html:28)
3. Finish device and publishing QA. All 27 tests passed, and the existing thumbnail shows the complete cart and a readable title. Korean and English layouts fit at 320–390 px wide with 44 px minimum control heights. Simulated audio checks covered blocked storage, unsupported audio, retry, and hide/resume. Source review found no network calls, dialogs, `eval`, or unsafe HTML insertion. Real keyboard and touch input, audible playback, and reduced-motion rendering remain unverified. The read-only workspace prevented a fresh build and thumbnail run.

## Verdict

CHANGES