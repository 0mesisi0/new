# Build failed

2026-11-22T05:32:10.098Z

```
npm test failed:

> test
> node --test test/*.test.mjs

✔ item after-party-escape (4.3371ms)
✔ item bungeoppang-budget (3.0014ms)
✔ item cat-vs-keyboard (3.0223ms)
✔ item chicken-leg-war (2.2364ms)
✔ item christmas-cake-pickup-compare (2.0694ms)
✔ item christmas-cake-preorder-compare (2.0403ms)
✔ item christmas-cake-price-compare (2.1565ms)
✔ item christmas-cake-slices (1.8641ms)
✔ item clock-out (2.4421ms)
✔ item elevator-awkward (2.1909ms)
✔ item fish-cake-cart-asmr (1.8791ms)
✖ item fish-cake-stall-asmr (1.3453ms)
✔ item frosted-window-puzzle (0.8604ms)
✔ item monday-alarm (1.8347ms)
✔ item paper-smoother (1.7392ms)
✔ item puffer-zip (1.6747ms)
✔ item puffer-zip-challenge (1.8336ms)
✔ item ramen-wait (1.9274ms)
✔ item scarf-untangler (1.6046ms)
✔ item snowprint-puzzle (1.6962ms)
✔ item tangerine-peel-puzzle (1.5308ms)
✔ item twin-anmin (5.8713ms)
✔ item twin-daewon (6.7884ms)
✔ item winter-snack-ladder (2.1909ms)
✔ item year-end-date-picker (1.697ms)
✔ item year-end-receipt (1.9907ms)
(node:40460) ExperimentalWarning: SQLite is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
✔ voter ids are stable, per item, and hide the IP (6.0905ms)
✔ like, switch, withdraw and repeat votes (2.2333ms)
✔ counts and top list (1.9782ms)
ℹ tests 29
ℹ suites 0
ℹ pass 28
ℹ fail 1
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 145.3065

✖ failing tests:

test at test\items.test.mjs:15:3
✖ item fish-cake-stall-asmr (1.3453ms)
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
