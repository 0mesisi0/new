# Build failed

2026-11-22T02:18:55.591Z

```
npm test failed:

> test
> node --test test/*.test.mjs

✔ item after-party-escape (2.6566ms)
✔ item bungeoppang-budget (1.9749ms)
✔ item cat-vs-keyboard (1.1792ms)
✔ item chicken-leg-war (1.033ms)
✔ item christmas-cake-pickup-compare (0.9345ms)
✔ item christmas-cake-preorder-compare (0.8871ms)
✔ item christmas-cake-price-compare (1.0022ms)
✔ item christmas-cake-slices (0.8643ms)
✔ item clock-out (1.1114ms)
✔ item elevator-awkward (1.1617ms)
✔ item fish-cake-cart-asmr (0.8936ms)
✖ item fish-cake-stall-asmr (0.7615ms)
✔ item kimchi-fridge-puzzle (0.8551ms)
✔ item monday-alarm (0.9153ms)
✔ item paper-smoother (0.9688ms)
✔ item puffer-zip (0.9418ms)
✔ item puffer-zip-challenge (0.9039ms)
✔ item ramen-wait (0.885ms)
✔ item scarf-untangler (0.8253ms)
✔ item snowprint-puzzle (0.8938ms)
✔ item tangerine-peel-puzzle (0.8271ms)
✔ item twin-anmin (4.9546ms)
✔ item twin-daewon (5.6142ms)
✔ item winter-snack-ladder (1.0349ms)
✔ item year-end-date-picker (0.8361ms)
✔ item year-end-receipt (1.1507ms)
(node:37396) ExperimentalWarning: SQLite is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
✔ voter ids are stable, per item, and hide the IP (6.4143ms)
✔ like, switch, withdraw and repeat votes (2.1604ms)
✔ counts and top list (1.3744ms)
ℹ tests 29
ℹ suites 0
ℹ pass 28
ℹ fail 1
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 118.08

✖ failing tests:

test at test\items.test.mjs:15:3
✖ item fish-cake-stall-asmr (0.7615ms)
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
