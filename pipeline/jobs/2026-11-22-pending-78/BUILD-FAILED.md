# Build failed

2026-11-22T06:54:44.811Z

```
npm test failed:

> test
> node --test test/*.test.mjs

✔ item after-party-escape (3.5542ms)
✔ item bungeoppang-budget (1.8701ms)
✔ item cat-vs-keyboard (2.5045ms)
✔ item chicken-leg-war (1.5759ms)
✔ item christmas-cake-pickup-compare (1.4884ms)
✔ item christmas-cake-preorder-compare (1.4577ms)
✔ item christmas-cake-price-compare (1.592ms)
✔ item christmas-cake-slices (1.3331ms)
✔ item clock-out (1.7586ms)
✔ item elevator-awkward (1.8531ms)
✔ item fish-cake-cart-asmr (1.5329ms)
✖ item fish-cake-stall-asmr (0.7764ms)
✔ item kimjang-cost-calculator (0.968ms)
✔ item monday-alarm (1.6541ms)
✔ item paper-smoother (1.6724ms)
✔ item puffer-zip (1.2561ms)
✔ item puffer-zip-challenge (1.303ms)
✔ item ramen-wait (1.3736ms)
✔ item scarf-untangler (1.2342ms)
✔ item snowprint-puzzle (1.4146ms)
✔ item tangerine-peel-puzzle (1.3278ms)
✔ item twin-anmin (5.4706ms)
✔ item twin-daewon (6.1792ms)
✔ item winter-snack-ladder (1.6133ms)
✔ item year-end-date-picker (1.5346ms)
✔ item year-end-receipt (1.5345ms)
(node:18928) ExperimentalWarning: SQLite is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
✔ voter ids are stable, per item, and hide the IP (6.0424ms)
✔ like, switch, withdraw and repeat votes (2.3103ms)
✔ counts and top list (2.0203ms)
ℹ tests 29
ℹ suites 0
ℹ pass 28
ℹ fail 1
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 133.0785

✖ failing tests:

test at test\items.test.mjs:15:3
✖ item fish-cake-stall-asmr (0.7764ms)
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
