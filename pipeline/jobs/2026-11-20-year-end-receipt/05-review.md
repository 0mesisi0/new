# Review 2026-11-20-year-end-receipt

Checks run: `npm test` passes (5/5). `npm run qa -- --only year-end-receipt` passes. Playwright at 320x480, 390x844 and 1280x800, in ko and en. Touch taps and keyboard-only (Enter, 1-4, R) flows both completed with no page errors. Also tested: Back from Q5, a nickname of `😀A<b>&"'xyz12345`, Save image, Copy text, Start over, reduced motion with `#demo`, blocked localStorage, and the min, mid and max answer sets (all-first-option shows the hidden title). I read the screenshots and the downloaded PNG.

## Blocking

1. Mute button is 40x40 px on the print/result screen, which breaks the 44 px tap-target rule (ITEMS.md rule 4, spec "buttons at least 44 px").
   - Where: `index.html:141`, `.pbar .mute { width:40px; height:40px }`. Measured 40x40 at all three viewports.
   - Reproduce: finish a run and measure the button in the print bar. The start and quiz screens use 44 px.
   - Fix: make it 44x44 (the bar is 54 px tall, so it fits), or add an invisible hit area with `::after { inset:-4px }`.

## Improvements

1. Nickname limit counts UTF-16 units, not characters. `maxlength="8"` at `index.html:200` allows only 4 emoji, but `start()` at line 706 already slices by code points. Fix: remove `maxlength` and rely on the `Array.from().slice(0,8)` in `start()`, or also cap on `input` events.
2. White 15-16 px text on the red (#e0453d) buttons has a contrast ratio of about 3.9:1, under AA for non-large text. This affects `#bSave` (line 158) and `.opt.picked` (line 123). Fix: darken the fill to about #c9372f, or bump the text to 18.7 px bold.
3. The gray receipt text (#8a8f98 on #fbfaf5, about 3:1) is used for 11-12 px notes, qty rows and the date. This is readable but weak, especially in the saved PNG. Fix: use about #6b707a for the small text.
4. The sheep forecast lines hard-code "2027" (`index.html:294-301`, `index.html:351-358`) while the pool is chosen by `BRANCH===7`. This is only wrong in 2038 (next year 2039), but it is worth a comment or a `{next}` placeholder.
5. Idle cost: the snow canvas and the rAF loop redraw every frame on every screen, including the result screen (the loop already pauses when hidden). Acceptable per spec, but the snow could be throttled to about 30 fps, or paused during the result scroll, for battery on phones.
6. Save on iOS Safari: the blob + `a.download` path works on iOS 13+, but inside a sandboxed iframe without `allow-downloads` it silently does nothing, and "Image saved" is still toasted. If the host page's iframe lacks `allow-downloads`, consider a fallback that opens the blob in an `<img>` overlay with a "long-press to save" hint. The canvas is only about 830x2430 px (2 MP), well under the iOS limit.
7. The result screen has no keyboard hint for S/C/R. This is cosmetic.

## Verified OK

- No console errors or page errors in any run. Storage blocked (a getter that throws) still gives a full flow, and every localStorage access goes through try/catch (`index.html:378-381`).
- Security: the nickname is only ever used via `textContent`, `canvas.fillText`, `aria-label` and clipboard text. `innerHTML` is used only with constant strings. There is no eval and no network use. HTML characters render literally on the receipt and in the copied text.
- Spec: 9 questions with the correct Q values and prices. Tax, discount and minimum total are correct. The five title tiers plus the hidden tier are correct. The forecast header and 정미년 sheep pool work, and it is deterministic (same name and answers give the same No. and amounts). The stamp, barcode, notes and footer are present.
- Interactions: Back from Q1 returns to start and keeps the name. Back mid-quiz works. The 180 ms input lock works. Enter, 1-4 and R work. Restart keeps the name. The Save PNG has the correct filename and a clean layout. Copy text matches the spec format.
- All visible strings exist in ko and en, and `<html lang>` is set.
- Layout is clean at 320x480, 390x844 and 1280x800 in both languages. There is no horizontal overflow, no page scroll, and the 52 px bottom bar never overlaps content. Long Korean and English stamp titles wrap well.
- Reduced motion shows the finished receipt immediately and disables the CSS animations.
- The mute button has an aria-label, focus-visible outlines exist, the receipt canvas has `role="img"` with a text label, and the toast is `aria-live`.
- Content: the humor is about the user themselves. There is no mocking of real groups, no tax or brand imitation, and no alcohol angle.

## Verdict

CHANGES
