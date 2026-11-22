# Build failed

2026-11-22T07:50:01.063Z

```
npm test failed:

> test
> node --test test/*.test.mjs

✔ item after-party-escape (3.5539ms)
✔ item bungeoppang-budget (2.5815ms)
✔ item cat-vs-keyboard (1.6704ms)
✔ item chicken-leg-war (1.5689ms)
✔ item christmas-cake-pickup-compare (1.5193ms)
✔ item christmas-cake-preorder-compare (1.4951ms)
✔ item christmas-cake-price-compare (1.4307ms)
✔ item christmas-cake-slices (1.4871ms)
✔ item clock-out (1.7202ms)
✔ item elevator-awkward (1.7302ms)
✔ item fish-cake-cart-asmr (1.5797ms)
✖ item fish-cake-stall-asmr (0.8231ms)
✔ item gift-wrap-size-calculator (0.8364ms)
✔ item monday-alarm (1.6559ms)
✔ item paper-smoother (1.7362ms)
✔ item puffer-zip (1.4879ms)
✔ item puffer-zip-challenge (1.4617ms)
✔ item ramen-wait (1.4707ms)
✔ item scarf-untangler (1.4202ms)
✔ item snowprint-puzzle (1.2988ms)
✔ item tangerine-peel-puzzle (1.3474ms)
✔ item twin-anmin (5.3779ms)
✔ item twin-daewon (6.3006ms)
✔ item winter-snack-ladder (1.6658ms)
✔ item year-end-date-picker (1.5096ms)
✔ item year-end-receipt (1.7212ms)
(node:42860) ExperimentalWarning: SQLite is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
✔ voter ids are stable, per item, and hide the IP (5.7653ms)
✔ like, switch, withdraw and repeat votes (2.222ms)
✔ counts and top list (2.1412ms)
ℹ tests 29
ℹ suites 0
ℹ pass 28
ℹ fail 1
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 133.6223

✖ failing tests:

test at test\items.test.mjs:15:3
✖ item fish-cake-stall-asmr (0.8231ms)
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
