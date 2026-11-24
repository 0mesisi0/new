# Review 2026-11-25-odd-bus-arrivals

## Blocking

1. **START hides the required instruction on phones.** The media query in `play/items/odd-bus-arrivals/index.html:48` hides `.sub` at heights of 520 px or less. Browser snapshots confirmed that the instruction disappears in both languages at 320 × 390. Keep the localized instruction visible in the compact layout.
2. **Demo mode repeats Blanket Express before showing all six notices.** At `play/items/odd-bus-arrivals/index.html:179`, the demo opens Blanket Express with an empty queue. The next action refills the queue and swaps its first two entries, producing Blanket → Pocket → Blanket → One More Loop. Initialize the demo queue with the five remaining notices in table order.
3. **Demo mode skips the required focus handoff.** The demo enters NOTICE at `play/items/odd-bus-arrivals/index.html:179` with focus still on the document body. Move focus to `Next notice` on demo entry, as the other NOTICE entry paths do.

## Improvements

1. Update the category example in `play/ITEMS.md:21` to include `weird`. The metadata matches the item spec, and the site category registry and validator both accept it.
2. Add a regression check for the first six demo notices and a compact-layout check for the START instruction in both languages. All 45 `npm test` checks passed while these issues remained. Browser snapshots verified the compact screens and 44 px controls. Keyboard and touch interaction in the browser, the production build, and thumbnail regeneration remain unverified.

## Verdict

CHANGES