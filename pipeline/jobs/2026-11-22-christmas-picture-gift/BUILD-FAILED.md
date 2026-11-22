# Build failed

2026-11-22T08:31:28.800Z

```
npm test failed:

> test
> node --test test/*.test.mjs

✔ item after-party-escape (3.8ms)
✔ item bungeoppang-budget (2.2161ms)
✔ item cat-vs-keyboard (2.2875ms)
✔ item chicken-leg-war (1.5691ms)
✔ item christmas-cake-pickup-compare (1.4391ms)
✔ item christmas-cake-preorder-compare (1.4605ms)
✔ item christmas-cake-price-compare (1.5185ms)
✔ item christmas-cake-slices (1.4214ms)
✔ item christmas-picture-gift (0.8987ms)
✔ item clock-out (1.8859ms)
✔ item elevator-awkward (1.6653ms)
✔ item fish-cake-cart-asmr (1.5458ms)
✖ item fish-cake-stall-asmr (0.7786ms)
✔ item monday-alarm (1.5658ms)
✔ item paper-smoother (1.6834ms)
✔ item puffer-zip (1.4333ms)
✔ item puffer-zip-challenge (1.5234ms)
✔ item ramen-wait (1.4581ms)
✔ item scarf-untangler (1.4478ms)
✔ item snowprint-puzzle (1.4606ms)
✔ item tangerine-peel-puzzle (1.474ms)
✔ item twin-anmin (5.4628ms)
✔ item twin-daewon (6.2216ms)
✔ item winter-snack-ladder (1.9893ms)
✔ item year-end-date-picker (1.4443ms)
✔ item year-end-receipt (1.6874ms)
(node:36096) ExperimentalWarning: SQLite is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
✔ voter ids are stable, per item, and hide the IP (6.0784ms)
✔ like, switch, withdraw and repeat votes (2.1497ms)
✔ counts and top list (2.1077ms)
ℹ tests 29
ℹ suites 0
ℹ pass 28
ℹ fail 1
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 133.3657

✖ failing tests:

test at test\items.test.mjs:15:3
✖ item fish-cake-stall-asmr (0.7786ms)
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
