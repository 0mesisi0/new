# Build failed

2026-11-22T02:13:24.868Z

```
npm test failed:

> test
> node --test test/*.test.mjs

✔ item after-party-escape (2.898ms)
✔ item bungeoppang-budget (1.9249ms)
✔ item cat-vs-keyboard (1.1369ms)
✔ item chicken-leg-war (1.0151ms)
✔ item christmas-cake-pickup-compare (0.903ms)
✔ item christmas-cake-preorder-compare (0.9072ms)
✔ item christmas-cake-price-compare (0.9066ms)
✔ item christmas-cake-slices (0.8799ms)
✔ item clock-out (1.1117ms)
✔ item elevator-awkward (1.1762ms)
✔ item fish-cake-cart-asmr (0.9704ms)
✖ item fish-cake-stall-asmr (0.9331ms)
✔ item gift-wrap-size-calculator (0.8859ms)
✔ item monday-alarm (0.9833ms)
✔ item paper-smoother (1.003ms)
✔ item puffer-zip (1.0006ms)
✔ item puffer-zip-challenge (0.8944ms)
✔ item ramen-wait (1.0067ms)
✔ item scarf-untangler (0.8386ms)
✔ item snowprint-puzzle (1.1116ms)
✔ item tangerine-peel-puzzle (0.9143ms)
✔ item twin-anmin (5.2628ms)
✔ item twin-daewon (6.0289ms)
✔ item winter-snack-ladder (1.0153ms)
✔ item year-end-date-picker (0.8469ms)
✔ item year-end-receipt (1.1255ms)
(node:46172) ExperimentalWarning: SQLite is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
✔ voter ids are stable, per item, and hide the IP (5.8556ms)
✔ like, switch, withdraw and repeat votes (2.2189ms)
✔ counts and top list (2.0659ms)
ℹ tests 29
ℹ suites 0
ℹ pass 28
ℹ fail 1
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 119.2385

✖ failing tests:

test at test\items.test.mjs:15:3
✖ item fish-cake-stall-asmr (0.9331ms)
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
