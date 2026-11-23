# Review 2026-11-22-gift-wrap-sprint

## Blocking

1. **The category requirements conflict.** The item uses `games`, which the current catalog and test suite accept. Both the sprint spec and `ITEMS.md` require `arcade`, which the current validator rejects. Reconcile the documented category with the catalog before publishing. [meta.json](C:/work/haruhanpan/play/items/gift-wrap-sprint/meta.json:4) · [Catalog](C:/work/haruhanpan/play/src/site.mjs:13) · [Validation test](C:/work/haruhanpan/play/test/items.test.mjs:25)
2. **The outgoing ribbon obscures the next parcel in reduced-motion mode.** Reduced motion disables the fade, leaving the previous parcel’s ribbon at full opacity over the playable parcel for 500 ms. Skip the outgoing overlay when reduced motion is enabled. In standard mode, shorten the current 440 ms delay and fade to the specified roughly 180 ms. [Animation CSS](C:/work/haruhanpan/play/items/gift-wrap-sprint/index.html:38) · [Reduced-motion CSS](C:/work/haruhanpan/play/items/gift-wrap-sprint/index.html:54) · [Parcel completion](C:/work/haruhanpan/play/items/gift-wrap-sprint/index.html:175)

## Improvements

1. Apply `touch-action: none` to the direction-control row so gestures starting in the gaps receive the same treatment as gestures starting on a button. Keep the native click handlers so each activation produces one fold. [Control styles](C:/work/haruhanpan/play/items/gift-wrap-sprint/index.html:41) · [Button handlers](C:/work/haruhanpan/play/items/gift-wrap-sprint/index.html:122)
2. Clear the next-fold live region when leaving play. Its last instruction remains in the accessibility tree on the pause and result screens. [Live region](C:/work/haruhanpan/play/items/gift-wrap-sprint/index.html:88) · [State rendering](C:/work/haruhanpan/play/items/gift-wrap-sprint/index.html:148)
3. Complete live keyboard and touch QA in both locales before publishing. All 25 tests passed, and simulated input verified clean and missed-fold scoring, pause and resume, the deadline, best-score updates, and retry in both locales. The Korean start screen fit at 320 × 390 and the English start screen fit at 390 × 480. The existing thumbnail was readable, the copy matched the spec, and source inspection found no network calls, dialogs, `eval`, or `innerHTML`. Automatic approval blocked browser input. The build and thumbnail regeneration remain unverified in the read-only workspace.

## Verdict

CHANGES