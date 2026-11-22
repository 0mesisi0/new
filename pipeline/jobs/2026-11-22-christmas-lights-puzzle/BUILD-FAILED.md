# Build failed

2026-11-22T07:28:11.232Z

```
npm test failed:

> test
> node --test test/*.test.mjs

✔ item after-party-escape (3.5076ms)
✔ item bungeoppang-budget (2.4595ms)
✔ item cat-vs-keyboard (1.7903ms)
✔ item chicken-leg-war (1.5ms)
✔ item christmas-cake-pickup-compare (1.4705ms)
✔ item christmas-cake-preorder-compare (1.4273ms)
✔ item christmas-cake-price-compare (1.5442ms)
✔ item christmas-cake-slices (2.1819ms)
✔ item christmas-lights-puzzle (0.884ms)
✔ item clock-out (1.8465ms)
✔ item elevator-awkward (1.626ms)
✔ item fish-cake-cart-asmr (1.4884ms)
✖ item fish-cake-stall-asmr (0.8884ms)
✔ item monday-alarm (1.5047ms)
✔ item paper-smoother (1.3848ms)
✔ item puffer-zip (1.3251ms)
✔ item puffer-zip-challenge (1.393ms)
✔ item ramen-wait (1.5461ms)
✔ item scarf-untangler (1.2913ms)
✔ item snowprint-puzzle (1.2577ms)
✔ item tangerine-peel-puzzle (1.4343ms)
✔ item twin-anmin (5.7605ms)
✔ item twin-daewon (6.8562ms)
✔ item winter-snack-ladder (1.869ms)
✔ item year-end-date-picker (1.3318ms)
✔ item year-end-receipt (1.733ms)
(node:31488) ExperimentalWarning: SQLite is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
✔ voter ids are stable, per item, and hide the IP (5.8584ms)
✔ like, switch, withdraw and repeat votes (2.2152ms)
✔ counts and top list (2.5324ms)
ℹ tests 29
ℹ suites 0
ℹ pass 28
ℹ fail 1
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 134.8211

✖ failing tests:

test at test\items.test.mjs:15:3
✖ item fish-cake-stall-asmr (0.8884ms)
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
