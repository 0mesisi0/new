# Build failed

2026-11-22T01:40:22.631Z

```
npm test failed:

> test
> node --test test/*.test.mjs

✔ item after-party-escape (2.7028ms)
✔ item bungeoppang-budget (1.9105ms)
✔ item cat-vs-keyboard (1.1003ms)
✔ item chicken-leg-war (1.032ms)
✔ item christmas-cake-pickup-compare (0.8906ms)
✔ item christmas-cake-preorder-compare (0.9599ms)
✔ item christmas-cake-price-compare (0.9129ms)
✔ item christmas-cake-slices (0.8788ms)
✔ item clock-out (1.1162ms)
✔ item elevator-awkward (1.3306ms)
✔ item fish-cake-cart-asmr (1.0428ms)
✖ item fish-cake-stall-asmr (0.7806ms)
✔ item monday-alarm (0.966ms)
✔ item paper-smoother (0.9926ms)
✔ item puffer-zip (0.8367ms)
✔ item puffer-zip-challenge (0.9598ms)
✔ item ramen-wait (0.9302ms)
✔ item scarf-untangler (0.8412ms)
✔ item snowprint-puzzle (0.959ms)
✔ item snowy-fishcake-stall (0.7939ms)
✔ item tangerine-peel-puzzle (0.8405ms)
✔ item twin-anmin (5.1243ms)
✔ item twin-daewon (5.7166ms)
✔ item winter-snack-ladder (0.9937ms)
✔ item year-end-date-picker (0.8431ms)
✔ item year-end-receipt (1.1587ms)
(node:24020) ExperimentalWarning: SQLite is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
✔ voter ids are stable, per item, and hide the IP (5.6602ms)
✔ like, switch, withdraw and repeat votes (2.2542ms)
✔ counts and top list (2.0225ms)
ℹ tests 29
ℹ suites 0
ℹ pass 28
ℹ fail 1
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 118.0982

✖ failing tests:

test at test\items.test.mjs:15:3
✖ item fish-cake-stall-asmr (0.7806ms)
  AssertionError [ERR_ASSERTION]: unknown category chill
      at TestContext.<anonymous> (file:///C:/work/haruhanpan/play/test/items.test.mjs:25:12)
      at Test.runInAsyncScope (node:async_hooks:228:14)
      at Test.run (node:internal/test_runner/test:1118:25)
      at Test.processPendingSubtests (node:internal/test_runner/test:787:18)
      at Test.postRun (node:internal/test_runner/test:1247:19)
      at Test.run (node:internal/test_runner/test:1175:12)
      at async Test.processPendingSubtests (node:internal/test_runner/test:787:7) {
    generatedMessage: false,
    code: 'ERR_ASSERTION',
    actual: false,
    expected: true,
    operator: '==',
    diff: 'simple'
  }

```
