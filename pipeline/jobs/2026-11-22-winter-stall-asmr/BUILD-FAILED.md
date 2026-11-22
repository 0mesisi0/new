# Build failed

2026-11-22T01:43:12.729Z

```
npm test failed:

> test
> node --test test/*.test.mjs

✔ item after-party-escape (2.6281ms)
✔ item bungeoppang-budget (1.8396ms)
✔ item cat-vs-keyboard (1.1841ms)
✔ item chicken-leg-war (0.9895ms)
✔ item christmas-cake-pickup-compare (0.9007ms)
✔ item christmas-cake-preorder-compare (0.888ms)
✔ item christmas-cake-price-compare (0.9047ms)
✔ item christmas-cake-slices (1.0134ms)
✔ item clock-out (1.1978ms)
✔ item elevator-awkward (1.1881ms)
✔ item fish-cake-cart-asmr (0.9069ms)
✖ item fish-cake-stall-asmr (0.7551ms)
✔ item monday-alarm (0.9278ms)
✔ item paper-smoother (0.9499ms)
✔ item puffer-zip (0.8626ms)
✔ item puffer-zip-challenge (0.938ms)
✔ item ramen-wait (0.9722ms)
✔ item scarf-untangler (0.9584ms)
✔ item snowprint-puzzle (1.0478ms)
✔ item tangerine-peel-puzzle (0.9151ms)
✔ item twin-anmin (4.9114ms)
✔ item twin-daewon (5.5392ms)
✔ item winter-snack-ladder (1.0677ms)
✔ item winter-stall-asmr (0.7712ms)
✔ item year-end-date-picker (0.818ms)
✔ item year-end-receipt (1.2087ms)
(node:16968) ExperimentalWarning: SQLite is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
✔ voter ids are stable, per item, and hide the IP (6.3435ms)
✔ like, switch, withdraw and repeat votes (2.169ms)
✔ counts and top list (1.4163ms)
ℹ tests 29
ℹ suites 0
ℹ pass 28
ℹ fail 1
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 120.3482

✖ failing tests:

test at test\items.test.mjs:15:3
✖ item fish-cake-stall-asmr (0.7551ms)
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
