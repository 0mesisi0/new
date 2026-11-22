# Build failed

2026-11-22T06:34:35.984Z

```
npm test failed:

> test
> node --test test/*.test.mjs

✔ item after-party-escape (3.5163ms)
✔ item bungeoppang-budget (2.5041ms)
✔ item cat-vs-keyboard (1.8561ms)
✔ item chicken-leg-war (1.5605ms)
✔ item christmas-cake-pickup-compare (1.7173ms)
✔ item christmas-cake-preorder-compare (1.6158ms)
✔ item christmas-cake-price-compare (1.3953ms)
✔ item christmas-cake-slices (1.4631ms)
✔ item clock-out (1.6844ms)
✔ item elevator-awkward (1.8822ms)
✔ item fish-cake-cart-asmr (1.5888ms)
✖ item fish-cake-stall-asmr (0.7452ms)
✔ item kimjang-cost-calculator (0.8146ms)
✔ item monday-alarm (1.5543ms)
✔ item paper-smoother (1.7518ms)
✔ item puffer-zip (1.2572ms)
✔ item puffer-zip-challenge (1.4342ms)
✔ item ramen-wait (1.4171ms)
✔ item scarf-untangler (1.2869ms)
✔ item snowprint-puzzle (1.3244ms)
✔ item tangerine-peel-puzzle (1.4354ms)
✔ item twin-anmin (5.5502ms)
✔ item twin-daewon (6.3117ms)
✔ item winter-snack-ladder (1.5092ms)
✔ item year-end-date-picker (1.2845ms)
✔ item year-end-receipt (1.9956ms)
(node:12644) ExperimentalWarning: SQLite is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
✔ voter ids are stable, per item, and hide the IP (6.2489ms)
✔ like, switch, withdraw and repeat votes (2.2329ms)
✔ counts and top list (1.3888ms)
ℹ tests 29
ℹ suites 0
ℹ pass 28
ℹ fail 1
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 134.1912

✖ failing tests:

test at test\items.test.mjs:15:3
✖ item fish-cake-stall-asmr (0.7452ms)
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
