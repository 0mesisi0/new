# Build failed

2026-11-22T06:45:39.666Z

```
npm test failed:

> test
> node --test test/*.test.mjs

✔ item after-party-escape (3.6039ms)
✔ item bungeoppang-budget (2.308ms)
✔ item cat-vs-keyboard (1.5994ms)
✔ item chicken-leg-war (1.4912ms)
✔ item christmas-cake-pickup-compare (1.3429ms)
✔ item christmas-cake-preorder-compare (1.4627ms)
✔ item christmas-cake-price-compare (1.4726ms)
✔ item christmas-cake-slices (1.403ms)
✔ item clock-out (1.666ms)
✔ item elevator-awkward (1.7637ms)
✔ item fish-cake-cart-asmr (1.5301ms)
✖ item fish-cake-stall-asmr (0.7632ms)
✔ item kimjang-shopping-calculator (0.9525ms)
✔ item monday-alarm (1.5606ms)
✔ item paper-smoother (1.5495ms)
✔ item puffer-zip (1.3846ms)
✔ item puffer-zip-challenge (1.3452ms)
✔ item ramen-wait (1.4374ms)
✔ item scarf-untangler (1.5079ms)
✔ item snowprint-puzzle (1.4294ms)
✔ item tangerine-peel-puzzle (1.3054ms)
✔ item twin-anmin (5.9364ms)
✔ item twin-daewon (6.3969ms)
✔ item winter-snack-ladder (1.4356ms)
✔ item year-end-date-picker (1.1844ms)
✔ item year-end-receipt (1.5492ms)
(node:21276) ExperimentalWarning: SQLite is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
✔ voter ids are stable, per item, and hide the IP (6.1294ms)
✔ like, switch, withdraw and repeat votes (2.1593ms)
✔ counts and top list (1.9175ms)
ℹ tests 29
ℹ suites 0
ℹ pass 28
ℹ fail 1
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 132.3463

✖ failing tests:

test at test\items.test.mjs:15:3
✖ item fish-cake-stall-asmr (0.7632ms)
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
