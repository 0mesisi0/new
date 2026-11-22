# Build failed

2026-11-22T02:25:29.689Z

```
npm test failed:

> test
> node --test test/*.test.mjs

✔ item after-party-escape (2.8429ms)
✔ item bungeoppang-budget (1.7832ms)
✔ item cat-vs-keyboard (1.1747ms)
✔ item chicken-leg-war (1.043ms)
✔ item christmas-cake-pickup-compare (0.9139ms)
✔ item christmas-cake-preorder-compare (0.9603ms)
✔ item christmas-cake-price-compare (0.9717ms)
✔ item christmas-cake-slices (0.9085ms)
✔ item clock-out (1.1517ms)
✔ item elevator-awkward (1.4686ms)
✔ item fish-cake-cart-asmr (1.0449ms)
✖ item fish-cake-stall-asmr (0.828ms)
✔ item foggy-window-doodles (0.9178ms)
✔ item monday-alarm (0.9964ms)
✔ item paper-smoother (0.9981ms)
✔ item puffer-zip (0.9948ms)
✔ item puffer-zip-challenge (0.9912ms)
✔ item ramen-wait (0.9847ms)
✔ item scarf-untangler (0.8743ms)
✔ item snowprint-puzzle (0.9886ms)
✔ item tangerine-peel-puzzle (0.8496ms)
✔ item twin-anmin (5.0789ms)
✔ item twin-daewon (5.853ms)
✔ item winter-snack-ladder (1.0341ms)
✔ item year-end-date-picker (0.8901ms)
✔ item year-end-receipt (1.1971ms)
(node:29688) ExperimentalWarning: SQLite is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
✔ voter ids are stable, per item, and hide the IP (5.9279ms)
✔ like, switch, withdraw and repeat votes (2.4324ms)
✔ counts and top list (2.3101ms)
ℹ tests 29
ℹ suites 0
ℹ pass 28
ℹ fail 1
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 123.1696

✖ failing tests:

test at test\items.test.mjs:15:3
✖ item fish-cake-stall-asmr (0.828ms)
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
