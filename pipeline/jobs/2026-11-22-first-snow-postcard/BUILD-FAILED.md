# Build failed

2026-11-22T07:35:48.417Z

```
npm test failed:

> test
> node --test test/*.test.mjs

✔ item after-party-escape (4.0142ms)
✔ item bungeoppang-budget (1.9772ms)
✔ item cat-vs-keyboard (2.5995ms)
✔ item chicken-leg-war (1.7026ms)
✔ item christmas-cake-pickup-compare (1.6033ms)
✔ item christmas-cake-preorder-compare (1.4489ms)
✔ item christmas-cake-price-compare (1.52ms)
✔ item christmas-cake-slices (1.5542ms)
✔ item clock-out (1.8214ms)
✔ item elevator-awkward (1.8751ms)
✔ item first-snow-postcard (0.9862ms)
✔ item fish-cake-cart-asmr (1.8362ms)
✖ item fish-cake-stall-asmr (0.9253ms)
✔ item monday-alarm (1.643ms)
✔ item paper-smoother (1.6918ms)
✔ item puffer-zip (1.4185ms)
✔ item puffer-zip-challenge (1.5764ms)
✔ item ramen-wait (1.6863ms)
✔ item scarf-untangler (1.6185ms)
✔ item snowprint-puzzle (1.3848ms)
✔ item tangerine-peel-puzzle (1.5337ms)
✔ item twin-anmin (6.08ms)
✔ item twin-daewon (6.909ms)
✔ item winter-snack-ladder (1.9571ms)
✔ item year-end-date-picker (1.4295ms)
✔ item year-end-receipt (1.7708ms)
(node:12888) ExperimentalWarning: SQLite is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
✔ voter ids are stable, per item, and hide the IP (6.8885ms)
✔ like, switch, withdraw and repeat votes (2.3712ms)
✔ counts and top list (1.3964ms)
ℹ tests 29
ℹ suites 0
ℹ pass 28
ℹ fail 1
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 144.6262

✖ failing tests:

test at test\items.test.mjs:15:3
✖ item fish-cake-stall-asmr (0.9253ms)
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
