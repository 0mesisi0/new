# Build failed

2026-11-22T05:56:42.204Z

```
npm test failed:

> test
> node --test test/*.test.mjs

✔ item after-party-escape (3.7768ms)
✔ item bungeoppang-budget (2.716ms)
✔ item cat-vs-keyboard (1.8544ms)
✔ item chicken-leg-war (1.6168ms)
✔ item christmas-cake-pickup-compare (1.406ms)
✔ item christmas-cake-preorder-compare (1.4202ms)
✔ item christmas-cake-price-compare (1.4352ms)
✔ item christmas-cake-slices (1.4607ms)
✔ item clock-out (1.7174ms)
✔ item elevator-awkward (2.1285ms)
✔ item fish-cake-cart-asmr (1.7845ms)
✖ item fish-cake-stall-asmr (0.9131ms)
✔ item monday-alarm (1.6643ms)
✔ item paper-smoother (1.5151ms)
✔ item puffer-zip (1.5543ms)
✔ item puffer-zip-challenge (1.4248ms)
✔ item ramen-wait (1.3307ms)
✔ item scarf-untangler (1.3407ms)
✔ item snowprint-puzzle (1.3054ms)
✔ item tangerine-peel-puzzle (1.1926ms)
✔ item twin-anmin (5.6298ms)
✔ item twin-daewon (6.426ms)
✔ item winter-snack-ladder (1.5878ms)
✔ item winter-window-doodle (0.7755ms)
✔ item year-end-date-picker (1.2453ms)
✔ item year-end-receipt (1.7327ms)
(node:39776) ExperimentalWarning: SQLite is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
✔ voter ids are stable, per item, and hide the IP (6.0747ms)
✔ like, switch, withdraw and repeat votes (2.2353ms)
✔ counts and top list (2.0336ms)
ℹ tests 29
ℹ suites 0
ℹ pass 28
ℹ fail 1
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 133.6643

✖ failing tests:

test at test\items.test.mjs:15:3
✖ item fish-cake-stall-asmr (0.9131ms)
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
