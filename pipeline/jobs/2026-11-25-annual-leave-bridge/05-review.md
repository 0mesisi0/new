# Review 2026-11-25-annual-leave-bridge

## Blocking

1. **The ranking rules and expected results disagree.** On November 25, 2026, the specified longest-first algorithm ranks September 9–19 first with 11 days off for four leave days. The spec expects the 10-day Christmas break first. The browser confirmed that `#demo` selects Christmas in December while September carries the “Longest” ribbon. The `#selftest` also fails because the expected May 13–16 one-day-leave break falls outside the six displayed results. Align the ranking, demo behavior, and assertions with one agreed set of expectations. (`index.html:193`, `index.html:466`, `index.html:489`)

2. **The embedded holiday table differs from the approved spec.** It adds May 1, May 3, July 17, and July 19, changing which dates count as leave. For example, the planner rejects May 3 as already off. Reconcile the table and spec before publishing so recommendations and manual plans use the approved dates. (`index.html:145`)

3. **The calendar can clip Saturday at 320 px.** Seven 44 px columns need 308 px. At 320 px, the narrow layout gives them exactly 308 px before the vertical scrollbar. A browser that reserves scrollbar space clips the right edge because the panel hides horizontal overflow. Keep all seven targets fully reachable with both overlay and reserved scrollbars. (`index.html:35`, `index.html:43`)

4. **Keyboard focus and selection need stronger cues.** Pressing `1`–`5` while a recommendation has focus replaces that button and drops focus. The selected card is indicated only by an orange border with about 2.2:1 contrast against white, and dimmed weekday dates remain focusable at about 2.4:1 text contrast. Preserve or restore focus after rerendering, expose the selected card programmatically, and strengthen both visual states. (`index.html:25`, `index.html:55`, `index.html:284`, `index.html:305`, `index.html:356`)

## Improvements

1. Make the recommendation self-test fail the automated test run. All 49 repository tests passed even though the browser reported the May assertion failure and then logged `demo done`. (`index.html:466`)
2. Remove the clipboard fallback textarea in a `finally` block and restore focus to the initiating control. The current fallback skips cleanup if copying throws. (`index.html:391`)
3. Add an iframe smoke test for touch scrolling, clipboard copy, and `.ics` download. Chromium rendered both languages across the 320 px and 390 px checks. Source inspection found reduced-motion overrides and no network calls, dialogs, `eval`, or user-controlled `innerHTML`. Touch gestures and both export actions remain unverified in the site iframe.

## Verdict

CHANGES