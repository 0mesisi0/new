# Build failed

2026-11-22T02:19:46.032Z

```
npm test failed:

> test
> node --test test/*.test.mjs

✔ item after-party-escape (2.8524ms)
✔ item bungeoppang-budget (1.7202ms)
✔ item cat-vs-keyboard (1.0876ms)
✔ item chicken-leg-war (1.0006ms)
✔ item christmas-cake-pickup-compare (0.9451ms)
✔ item christmas-cake-preorder-compare (3.0644ms)
✔ item christmas-cake-price-compare (0.9613ms)
✔ item christmas-cake-slices (0.8834ms)
✔ item clock-out (1.131ms)
✔ item elevator-awkward (1.2167ms)
✔ item fish-cake-cart-asmr (0.9322ms)
✖ item fish-cake-stall-asmr (0.7909ms)
✔ item kimchi-fridge-puzzle (0.8848ms)
✔ item monday-alarm (0.9131ms)
✔ item paper-smoother (1.0138ms)
✔ item puffer-zip (0.9314ms)
✔ item puffer-zip-challenge (0.8923ms)
✔ item ramen-wait (0.8974ms)
✔ item scarf-untangler (1.0779ms)
✔ item snowprint-puzzle (0.9133ms)
✔ item tangerine-peel-puzzle (0.8194ms)
✔ item twin-anmin (4.8594ms)
✔ item twin-daewon (5.9993ms)
✔ item winter-snack-ladder (0.9887ms)
✔ item year-end-date-picker (0.8492ms)
✔ item year-end-receipt (1.1363ms)
(node:48588) ExperimentalWarning: SQLite is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
✔ voter ids are stable, per item, and hide the IP (6.0223ms)
✔ like, switch, withdraw and repeat votes (2.1711ms)
✔ counts and top list (2.0445ms)
ℹ tests 29
ℹ suites 0
ℹ pass 28
ℹ fail 1
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 121.4423

✖ failing tests:

test at test\items.test.mjs:15:3
✖ item fish-cake-stall-asmr (0.7909ms)
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
