# Build failed

2026-11-22T02:34:28.727Z

```
npm test failed:

> test
> node --test test/*.test.mjs

✔ item after-party-escape (2.9685ms)
✔ item bungeoppang-budget (1.9385ms)
✔ item cat-vs-keyboard (1.2041ms)
✔ item chicken-leg-war (1.0876ms)
✔ item christmas-cake-pickup-compare (0.988ms)
✔ item christmas-cake-preorder-compare (0.9489ms)
✔ item christmas-cake-price-compare (0.9819ms)
✔ item christmas-cake-slices (0.9501ms)
✔ item clock-out (1.6624ms)
✔ item elevator-awkward (1.2866ms)
✔ item fish-cake-cart-asmr (1.0527ms)
✖ item fish-cake-stall-asmr (0.8335ms)
✔ item monday-alarm (1.129ms)
✔ item paper-smoother (1.1549ms)
✔ item puffer-zip (0.9537ms)
✔ item puffer-zip-challenge (1.0072ms)
✔ item ramen-wait (1.0272ms)
✔ item scarf-untangler (0.8828ms)
✔ item snowprint-puzzle (0.9568ms)
✔ item tangerine-peel-puzzle (0.918ms)
✔ item twin-anmin (6.0488ms)
✔ item twin-daewon (6.71ms)
✔ item winter-snack-ladder (1.1391ms)
✔ item year-end-date-picker (0.9661ms)
✔ item year-end-receipt (1.2309ms)
✔ item year-end-task-stamp (0.7744ms)
(node:33628) ExperimentalWarning: SQLite is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
✔ voter ids are stable, per item, and hide the IP (6.1465ms)
✔ like, switch, withdraw and repeat votes (2.4418ms)
✔ counts and top list (2.4988ms)
ℹ tests 29
ℹ suites 0
ℹ pass 28
ℹ fail 1
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 127.812

✖ failing tests:

test at test\items.test.mjs:15:3
✖ item fish-cake-stall-asmr (0.8335ms)
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
