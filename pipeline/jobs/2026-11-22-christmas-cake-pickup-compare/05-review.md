# Review 2026-11-22-christmas-cake-pickup-compare

## Blocking

1. **Mode switches leave stale screen-reader results.** After committing a comparison, choose **Enter my options**. The visible result resets, but the polite live region retains the previous outcome. **Show example** also leaves the live region unchanged. Update it when either mode switch settles. `index.html:173`, `index.html:184–198`
2. **The winning card lacks a distinct text label when both cakes fit.** With six guests and an 18:30 deadline, the headline correctly identifies Cake A as cheaper, but both cards say “Fits.” Add a localized label to the winning card so the card itself conveys the selection alongside its border. `index.html:151–157`, `index.html:164–178`

## Improvements

1. Reference the visible row and column labels with `aria-labelledby`. The six cake inputs currently have correct accessible names in both languages, but those names duplicate the labels instead of linking to them. `index.html:91–101`
2. Build live announcements from the individual reason strings. Reading `textContent` across `<br>` joins two reasons without a space, producing text such as `Pickup is 90 min late.Short by 3 servings.` `index.html:150–158`
3. Finish the publishing checks in a writable checkout. All 22 repository tests passed, both languages rendered at 320 and 390 px with 44 px controls, and the existing thumbnail showed the solved example. The comparison and focus handlers passed script checks. Browser keyboard and touch interactions, the build, and thumbnail regeneration remain unverified because the environment blocked those checks.

## Verdict

CHANGES