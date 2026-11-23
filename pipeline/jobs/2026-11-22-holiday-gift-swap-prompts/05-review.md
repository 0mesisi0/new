# Review 2026-11-22-holiday-gift-swap-prompts

## Blocking

1. Both language entries omit the three tags required by the idea spec. Add `선물교환`, `송년회`, and `크리스마스` to `ko.tags`, and `gift-swap`, `holiday-party`, and `prompts` to `en.tags`. The catalog already reads these arrays. [meta.json](/C:/work/haruhanpan/play/items/holiday-gift-swap-prompts/meta.json:7)
2. The manual-copy panel leaves the decorative ribbon above the textarea. Hide the ribbon while the panel is open and restore it when the user returns to the prompt. [index.html](/C:/work/haruhanpan/play/items/holiday-gift-swap-prompts/index.html:138)
3. The fold animates the prompt text itself, starting it at 30% opacity and 60% height. The spec calls for readable text as soon as the card appears and for the animation to stop when the document is hidden. Animate the decoration alone and cancel the animation on `visibilitychange`. [index.html](/C:/work/haruhanpan/play/items/holiday-gift-swap-prompts/index.html:19)
4. The result heading receives focus with its outline suppressed, and the manual-copy textarea’s gold focus ring has only 1.29:1 contrast against the cream panel. Give both focused elements a visible, high-contrast indicator. [index.html](/C:/work/haruhanpan/play/items/holiday-gift-swap-prompts/index.html:21)

## Improvements

1. Clear the previous copy confirmation when a new attempt starts. Two quick successes can leave the same text in the live region without a fresh announcement, and a quick failure can leave the old confirmation visible when the user closes manual copy. [index.html](/C:/work/haruhanpan/play/items/holiday-gift-swap-prompts/index.html:145)
2. Complete browser verification before publishing. All 26 repository tests passed. A JavaScript harness verified the bilingual strings, 13-draw rollover, storage edge cases, and clipboard success and fallback logic. The Korean start screen fit at 320 × 480, 390 × 480, and desktop sizes. The existing thumbnail showed the title and gift tag. Browser interaction tools were unavailable, so result and manual-copy layouts, native keyboard and touch behavior, and reduced motion still need browser checks. Source inspection found no network calls, browser dialogs, `eval`, or `innerHTML` use. The read-only workspace prevented running the build and regenerating the thumbnail.

## Verdict

CHANGES