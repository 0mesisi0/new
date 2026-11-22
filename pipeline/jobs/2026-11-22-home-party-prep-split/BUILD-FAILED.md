# Build failed

2026-11-22T02:15:30.549Z

```
npm test failed:

> test
> node --test test/*.test.mjs

✔ item after-party-escape (2.9799ms)
✔ item bungeoppang-budget (1.2609ms)
✔ item cat-vs-keyboard (1.9204ms)
✔ item chicken-leg-war (0.9959ms)
✔ item christmas-cake-pickup-compare (0.8775ms)
✔ item christmas-cake-preorder-compare (0.8711ms)
✔ item christmas-cake-price-compare (0.9083ms)
✔ item christmas-cake-slices (0.8554ms)
✔ item clock-out (1.0616ms)
✔ item elevator-awkward (1.1874ms)
✔ item fish-cake-cart-asmr (0.9057ms)
✖ item fish-cake-stall-asmr (0.7865ms)
✔ item home-party-prep-split (0.7756ms)
✔ item monday-alarm (0.9636ms)
✔ item paper-smoother (0.9735ms)
✔ item puffer-zip (0.8853ms)
✔ item puffer-zip-challenge (0.882ms)
✔ item ramen-wait (0.9305ms)
✔ item scarf-untangler (0.8029ms)
✔ item snowprint-puzzle (0.8461ms)
✔ item tangerine-peel-puzzle (0.8629ms)
✔ item twin-anmin (4.8405ms)
✔ item twin-daewon (5.6278ms)
✔ item winter-snack-ladder (1.0117ms)
✔ item year-end-date-picker (0.8147ms)
✔ item year-end-receipt (1.1241ms)
(node:9828) ExperimentalWarning: SQLite is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
✔ voter ids are stable, per item, and hide the IP (6.5547ms)
✔ like, switch, withdraw and repeat votes (2.1731ms)
✔ counts and top list (1.3401ms)
ℹ tests 29
ℹ suites 0
ℹ pass 28
ℹ fail 1
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 120.0914

✖ failing tests:

test at test\items.test.mjs:15:3
✖ item fish-cake-stall-asmr (0.7865ms)
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
