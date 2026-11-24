# Review 2026-11-25-bear-hibernation

## Blocking

1. **Keyboard focus disappears on the result card.** The global white focus outline blends into the white card around Retry, Copy record, and Sound. The game moves focus to Retry automatically, so keyboard players need a dark, visible outline as soon as the card appears. [Focus styling](play/items/bear-hibernation/index.html#L45) · [Result focus](play/items/bear-hibernation/index.html#L313)
2. **The spring HUD loses contrast.** The yellow counter and gray timer stay over the pale spring sky. Their foreground colors have roughly 1.2:1 and 1.7:1 contrast against the sky before text shadows. Add a dark backing or use darker text in spring so players can read D+120 and 10:00. [HUD colors](play/items/bear-hibernation/index.html#L18) · [Spring sky](play/items/bear-hibernation/index.html#L504)

## Improvements

1. **Complete the retry shortcuts and input lockout.** Space has no retry action when focus is off a button. The 800 ms lockout also checks when the click fires, so a press that starts during the lockout can activate Retry if released after it. Handle Space alongside Enter when focus is off a button, and discard activations that began during the lockout. [Keyboard handler](play/items/bear-hibernation/index.html#L355) · [Click handlers](play/items/bear-hibernation/index.html#L389)
2. **Preserve lure-specific reasons in the touch fallback.** The `pointerdown` handler checks the target, but the `touchstart` handler always reports a generic tap. Reuse the target check so a touch delivered through the fallback still reports the lure’s reason. [Touch handlers](play/items/bear-hibernation/index.html#L337)
3. **Close the remaining spec gaps in audio and demo mode.** Turning sound on at START creates the audio context before Tuck in. In `#demo`, the day and lure are fixed, but the scenery keeps animating, and the drift is about 74%. Defer audio initialization until the run starts and render the thumbnail from a fixed animation time. [Sound toggle](play/items/bear-hibernation/index.html#L253) · [Demo setup](play/items/bear-hibernation/index.html#L647)

All 50 repository tests passed. Chromium viewport checks covered the Korean start screen at 320×480 and the English start and wake screens at 320×568 and 390×693. The checked buttons were 48–56 px tall. Korean and English gameplay copy and metadata are present. Static inspection found no network calls, dialogs, `eval`, or `innerHTML`. Clipboard behavior in the hosted iframe and native touch on a phone remain unverified. The browser checks generated untracked snapshots under `.playwright-mcp/`.

## Verdict

CHANGES