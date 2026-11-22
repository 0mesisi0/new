# Build failed

2026-11-22T06:32:11.752Z

```
npm test failed:

> test
> node --test test/*.test.mjs

✔ item after-party-escape (3.5428ms)
✔ item bungeoppang-budget (1.9517ms)
✔ item cat-vs-keyboard (2.3346ms)
✔ item chicken-leg-war (1.6825ms)
✔ item christmas-cake-pickup-compare (1.6623ms)
✔ item christmas-cake-preorder-compare (1.594ms)
✔ item christmas-cake-price-compare (1.8161ms)
✔ item christmas-cake-slices (1.5592ms)
✔ item clock-out (1.7793ms)
✔ item elevator-awkward (1.8572ms)
✔ item fish-cake-cart-asmr (1.8777ms)
✖ item fish-cake-stall-asmr (0.8223ms)
✔ item kimjang-budget-calculator (0.8571ms)
✔ item monday-alarm (1.6672ms)
✔ item paper-smoother (1.7982ms)
✔ item puffer-zip (1.4202ms)
✔ item puffer-zip-challenge (1.4283ms)
✔ item ramen-wait (1.4373ms)
✔ item scarf-untangler (1.2929ms)
✔ item snowprint-puzzle (1.4733ms)
✔ item tangerine-peel-puzzle (1.4463ms)
✔ item twin-anmin (5.3833ms)
✔ item twin-daewon (6.5084ms)
✔ item winter-snack-ladder (1.7185ms)
✔ item year-end-date-picker (1.3092ms)
✔ item year-end-receipt (1.5136ms)
(node:39204) ExperimentalWarning: SQLite is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
✔ voter ids are stable, per item, and hide the IP (6.1908ms)
✔ like, switch, withdraw and repeat votes (2.3577ms)
✔ counts and top list (1.4173ms)
ℹ tests 29
ℹ suites 0
ℹ pass 28
ℹ fail 1
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 133.4628

✖ failing tests:

test at test\items.test.mjs:15:3
✖ item fish-cake-stall-asmr (0.8223ms)
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
