# Build failed

2026-11-22T06:37:07.093Z

```
npm test failed:

> test
> node --test test/*.test.mjs

✔ item after-party-escape (3.5231ms)
✔ item bungeoppang-budget (2.5135ms)
✔ item cat-vs-keyboard (1.8966ms)
✔ item chicken-leg-war (1.7283ms)
✔ item christmas-cake-pickup-compare (1.5821ms)
✔ item christmas-cake-preorder-compare (1.3411ms)
✔ item christmas-cake-price-compare (1.4555ms)
✔ item christmas-cake-slices (1.3628ms)
✔ item clock-out (1.7515ms)
✔ item elevator-awkward (1.968ms)
✔ item fish-cake-cart-asmr (1.6033ms)
✖ item fish-cake-stall-asmr (0.8645ms)
✔ item kimjang-cost-splitter (0.9004ms)
✔ item monday-alarm (1.7669ms)
✔ item paper-smoother (1.6833ms)
✔ item puffer-zip (1.4188ms)
✔ item puffer-zip-challenge (1.5403ms)
✔ item ramen-wait (1.2474ms)
✔ item scarf-untangler (1.3491ms)
✔ item snowprint-puzzle (1.3382ms)
✔ item tangerine-peel-puzzle (1.3828ms)
✔ item twin-anmin (5.6105ms)
✔ item twin-daewon (6.0478ms)
✔ item winter-snack-ladder (1.5473ms)
✔ item year-end-date-picker (1.3587ms)
✔ item year-end-receipt (1.764ms)
(node:7608) ExperimentalWarning: SQLite is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
✔ voter ids are stable, per item, and hide the IP (5.8156ms)
✔ like, switch, withdraw and repeat votes (2.2009ms)
✔ counts and top list (2.0096ms)
ℹ tests 29
ℹ suites 0
ℹ pass 28
ℹ fail 1
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 132.4432

✖ failing tests:

test at test\items.test.mjs:15:3
✖ item fish-cake-stall-asmr (0.8645ms)
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
