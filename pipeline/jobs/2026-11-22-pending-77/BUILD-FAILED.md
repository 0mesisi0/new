# Build failed

2026-11-22T06:51:46.174Z

```
npm test failed:

> test
> node --test test/*.test.mjs

✔ item after-party-escape (3.6375ms)
✔ item bungeoppang-budget (2.7183ms)
✔ item cat-vs-keyboard (1.7351ms)
✔ item chicken-leg-war (1.7297ms)
✔ item christmas-cake-pickup-compare (1.4519ms)
✔ item christmas-cake-preorder-compare (1.3975ms)
✔ item christmas-cake-price-compare (1.4548ms)
✔ item christmas-cake-slices (1.4311ms)
✔ item clock-out (1.7497ms)
✔ item elevator-awkward (1.6961ms)
✔ item fish-cake-cart-asmr (1.5871ms)
✖ item fish-cake-stall-asmr (0.8777ms)
✔ item kimjang-cost-calculator (0.8779ms)
✔ item monday-alarm (1.5077ms)
✔ item paper-smoother (1.5223ms)
✔ item puffer-zip (1.3694ms)
✔ item puffer-zip-challenge (1.3653ms)
✔ item ramen-wait (1.431ms)
✔ item scarf-untangler (1.2115ms)
✔ item snowprint-puzzle (1.2106ms)
✔ item tangerine-peel-puzzle (1.5183ms)
✔ item twin-anmin (5.6556ms)
✔ item twin-daewon (6.0799ms)
✔ item winter-snack-ladder (1.6131ms)
✔ item year-end-date-picker (1.3808ms)
✔ item year-end-receipt (1.9044ms)
(node:5200) ExperimentalWarning: SQLite is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
✔ voter ids are stable, per item, and hide the IP (5.8629ms)
✔ like, switch, withdraw and repeat votes (2.2532ms)
✔ counts and top list (2.0169ms)
ℹ tests 29
ℹ suites 0
ℹ pass 28
ℹ fail 1
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 133.3126

✖ failing tests:

test at test\items.test.mjs:15:3
✖ item fish-cake-stall-asmr (0.8777ms)
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
