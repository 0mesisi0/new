# Build failed

2026-11-22T07:30:59.371Z

```
npm test failed:

> test
> node --test test/*.test.mjs

✔ item after-party-escape (3.6039ms)
✔ item bungeoppang-budget (2.0129ms)
✔ item cat-vs-keyboard (2.5689ms)
✔ item chicken-leg-war (1.8709ms)
✔ item christmas-cake-pickup-compare (1.5213ms)
✔ item christmas-cake-preorder-compare (1.4378ms)
✔ item christmas-cake-price-compare (1.5554ms)
✔ item christmas-cake-slices (1.5726ms)
✔ item christmas-tree-lights-puzzle (0.9366ms)
✔ item clock-out (1.7613ms)
✔ item elevator-awkward (1.8599ms)
✔ item fish-cake-cart-asmr (1.5449ms)
✖ item fish-cake-stall-asmr (0.809ms)
✔ item monday-alarm (1.7058ms)
✔ item paper-smoother (1.4825ms)
✔ item puffer-zip (1.3777ms)
✔ item puffer-zip-challenge (1.3422ms)
✔ item ramen-wait (1.6287ms)
✔ item scarf-untangler (1.1544ms)
✔ item snowprint-puzzle (1.2241ms)
✔ item tangerine-peel-puzzle (1.2805ms)
✔ item twin-anmin (5.6895ms)
✔ item twin-daewon (6.1733ms)
✔ item winter-snack-ladder (1.5754ms)
✔ item year-end-date-picker (1.5729ms)
✔ item year-end-receipt (1.666ms)
(node:20572) ExperimentalWarning: SQLite is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
✔ voter ids are stable, per item, and hide the IP (6.0908ms)
✔ like, switch, withdraw and repeat votes (2.2868ms)
✔ counts and top list (2.2217ms)
ℹ tests 29
ℹ suites 0
ℹ pass 28
ℹ fail 1
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 133.5565

✖ failing tests:

test at test\items.test.mjs:15:3
✖ item fish-cake-stall-asmr (0.809ms)
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
