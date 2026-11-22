# Build failed

2026-11-22T05:48:23.465Z

```
npm test failed:

> test
> node --test test/*.test.mjs

✔ item after-party-escape (3.4816ms)
✔ item bungeoppang-budget (2.4548ms)
✔ item cat-vs-keyboard (1.7916ms)
✔ item chicken-leg-war (1.5444ms)
✔ item christmas-cake-pickup-compare (1.6257ms)
✔ item christmas-cake-preorder-compare (1.4635ms)
✔ item christmas-cake-price-compare (1.5349ms)
✔ item christmas-cake-slices (1.533ms)
✔ item clock-out (1.6438ms)
✔ item elevator-awkward (1.7456ms)
✔ item fish-cake-cart-asmr (1.9049ms)
✖ item fish-cake-stall-asmr (0.8808ms)
✔ item monday-alarm (1.5288ms)
✔ item paper-smoother (1.5881ms)
✔ item persimmon-breeze-puzzle (0.8911ms)
✔ item puffer-zip (1.3804ms)
✔ item puffer-zip-challenge (1.4701ms)
✔ item ramen-wait (1.4795ms)
✔ item scarf-untangler (1.3ms)
✔ item snowprint-puzzle (1.4217ms)
✔ item tangerine-peel-puzzle (1.3094ms)
✔ item twin-anmin (5.345ms)
✔ item twin-daewon (6.1713ms)
✔ item winter-snack-ladder (1.6125ms)
✔ item year-end-date-picker (1.3864ms)
✔ item year-end-receipt (1.7796ms)
(node:45992) ExperimentalWarning: SQLite is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
✔ voter ids are stable, per item, and hide the IP (5.8656ms)
✔ like, switch, withdraw and repeat votes (2.2104ms)
✔ counts and top list (1.9736ms)
ℹ tests 29
ℹ suites 0
ℹ pass 28
ℹ fail 1
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 133.0598

✖ failing tests:

test at test\items.test.mjs:15:3
✖ item fish-cake-stall-asmr (0.8808ms)
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
