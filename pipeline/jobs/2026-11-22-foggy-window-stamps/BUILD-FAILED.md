# Build failed

2026-11-22T02:10:54.932Z

```
npm test failed:

> test
> node --test test/*.test.mjs

✔ item after-party-escape (2.736ms)
✔ item bungeoppang-budget (1.7578ms)
✔ item cat-vs-keyboard (1.1094ms)
✔ item chicken-leg-war (1.0183ms)
✔ item christmas-cake-pickup-compare (0.9861ms)
✔ item christmas-cake-preorder-compare (1.0849ms)
✔ item christmas-cake-price-compare (1.064ms)
✔ item christmas-cake-slices (1.0207ms)
✔ item clock-out (1.2198ms)
✔ item elevator-awkward (1.194ms)
✔ item fish-cake-cart-asmr (0.9633ms)
✖ item fish-cake-stall-asmr (0.767ms)
✔ item foggy-window-stamps (0.8573ms)
✔ item monday-alarm (0.9299ms)
✔ item paper-smoother (1.0155ms)
✔ item puffer-zip (0.9369ms)
✔ item puffer-zip-challenge (0.8887ms)
✔ item ramen-wait (1.1281ms)
✔ item scarf-untangler (0.8911ms)
✔ item snowprint-puzzle (0.9004ms)
✔ item tangerine-peel-puzzle (0.9982ms)
✔ item twin-anmin (5.1293ms)
✔ item twin-daewon (5.6262ms)
✔ item winter-snack-ladder (1.0284ms)
✔ item year-end-date-picker (0.8445ms)
✔ item year-end-receipt (1.1425ms)
(node:3628) ExperimentalWarning: SQLite is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
✔ voter ids are stable, per item, and hide the IP (6.7973ms)
✔ like, switch, withdraw and repeat votes (2.2256ms)
✔ counts and top list (1.4274ms)
ℹ tests 29
ℹ suites 0
ℹ pass 28
ℹ fail 1
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 122.9902

✖ failing tests:

test at test\items.test.mjs:15:3
✖ item fish-cake-stall-asmr (0.767ms)
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
