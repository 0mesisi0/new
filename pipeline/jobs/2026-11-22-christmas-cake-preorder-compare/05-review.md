# Review 2026-11-22-christmas-cake-preorder-compare

## Blocking

1. **The English demo clips the third result at 320 × 480.** The result pane ends at y=402, while the final budget line extends to y=406 and its card to y=414. Users must scroll to see the full comparison, so it cannot fit in one screenshot as required. Make the result header, cards, or footer more compact at this size. See `index.html:12–51`.
2. **Price and budget validation accept whitespace inside the amount.** The parser trims again after removing `₩`, so `₩ 29,000` and `₩` followed by a tab and `29,000` both pass. The spec permits trimming outer whitespace. Remove the second trim so the prefix must directly precede the digits. See `index.html:195–205`.
3. **The manual-copy fallback leaves its instruction out of the screen reader announcement.** When clipboard access fails, focus moves to the textarea, but “Copy the text below” is neither associated with that field nor sent to the polite live region. Announce the localized fallback instruction and associate it with the textarea. See `index.html:88–93` and `index.html:311–321`.

## Improvements

1. Keep focus rings fully visible. The scrolling pane clips the outer edges of the rings on the result heading, guest and budget fields, and quote tabs. Inset the outlines or reserve space inside the pane. See `index.html:16–24` and `index.html:35`.
2. Make Left and Right wrap between the two quote tabs. Currently, Left on A and Right on B refocus the current tab. Home and End already select the endpoints. See `index.html:173–180`.
3. Finish release verification after the fixes. All 23 repository tests passed, both dictionaries matched all 38 specified strings, and the example and tied-price calculations passed. Chromium layout checks covered both languages at 320 and 390 px. Build, thumbnail generation, and end-to-end keyboard, touch, and clipboard checks remain unverified.

## Verdict

CHANGES