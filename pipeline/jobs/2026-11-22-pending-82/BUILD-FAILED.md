# Build failed

2026-11-22T07:46:57.812Z

```
npm test failed:

> test
> node --test test/*.test.mjs

✔ item after-party-escape (3.5027ms)
✔ item bungeoppang-budget (1.9814ms)
✔ item cat-vs-keyboard (2.2481ms)
✔ item chicken-leg-war (1.7241ms)
✔ item christmas-cake-pickup-compare (1.5215ms)
✔ item christmas-cake-preorder-compare (1.4962ms)
✔ item christmas-cake-price-compare (1.3068ms)
✔ item christmas-cake-slices (1.3583ms)
✔ item clock-out (1.7838ms)
✔ item elevator-awkward (1.636ms)
✔ item fish-cake-cart-asmr (1.6562ms)
✖ item fish-cake-stall-asmr (1.0094ms)
✔ item foggy-window-doodles (0.8628ms)
✔ item monday-alarm (1.5908ms)
✔ item paper-smoother (1.613ms)
✔ item puffer-zip (1.3678ms)
✔ item puffer-zip-challenge (1.5232ms)
✔ item ramen-wait (1.4699ms)
✔ item scarf-untangler (1.3702ms)
✔ item snowprint-puzzle (1.3843ms)
✔ item tangerine-peel-puzzle (1.3284ms)
✔ item twin-anmin (5.5357ms)
✔ item twin-daewon (6.269ms)
✔ item winter-snack-ladder (1.6016ms)
✔ item year-end-date-picker (1.4965ms)
✔ item year-end-receipt (1.6594ms)
(node:39312) ExperimentalWarning: SQLite is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
✔ voter ids are stable, per item, and hide the IP (6.266ms)
✔ like, switch, withdraw and repeat votes (2.1712ms)
✔ counts and top list (1.582ms)
ℹ tests 29
ℹ suites 0
ℹ pass 28
ℹ fail 1
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 132.7495

✖ failing tests:

test at test\items.test.mjs:15:3
✖ item fish-cake-stall-asmr (1.0094ms)
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
