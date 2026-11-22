# Build failed

2026-11-22T05:35:02.883Z

```
npm test failed:

> test
> node --test test/*.test.mjs

✔ item after-party-escape (3.8868ms)
✔ item bungeoppang-budget (2.7987ms)
✔ item cat-vs-keyboard (2.1772ms)
✔ item chicken-leg-war (1.942ms)
✔ item christmas-cake-pickup-compare (1.9132ms)
✔ item christmas-cake-preorder-compare (2.1304ms)
✔ item christmas-cake-price-compare (1.9834ms)
✔ item christmas-cake-slices (2.0627ms)
✔ item clock-out (2.0748ms)
✔ item elevator-awkward (2.1125ms)
✔ item fish-cake-cart-asmr (1.8138ms)
✖ item fish-cake-stall-asmr (1.2408ms)
✔ item foggy-window-doodles (0.8455ms)
✔ item monday-alarm (1.7677ms)
✔ item paper-smoother (1.953ms)
✔ item puffer-zip (1.8129ms)
✔ item puffer-zip-challenge (1.7953ms)
✔ item ramen-wait (1.5971ms)
✔ item scarf-untangler (1.6902ms)
✔ item snowprint-puzzle (1.5977ms)
✔ item tangerine-peel-puzzle (1.9ms)
✔ item twin-anmin (5.7947ms)
✔ item twin-daewon (6.7918ms)
✔ item winter-snack-ladder (1.9518ms)
✔ item year-end-date-picker (1.8031ms)
✔ item year-end-receipt (2.0683ms)
(node:43320) ExperimentalWarning: SQLite is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
✔ voter ids are stable, per item, and hide the IP (5.682ms)
✔ like, switch, withdraw and repeat votes (2.123ms)
✔ counts and top list (2.299ms)
ℹ tests 29
ℹ suites 0
ℹ pass 28
ℹ fail 1
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 141.4292

✖ failing tests:

test at test\items.test.mjs:15:3
✖ item fish-cake-stall-asmr (1.2408ms)
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
