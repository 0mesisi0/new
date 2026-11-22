# Build failed

2026-11-22T05:44:13.432Z

```
npm test failed:

> test
> node --test test/*.test.mjs

✔ item after-party-escape (3.8371ms)
✔ item bungeoppang-budget (2.7556ms)
✔ item cat-vs-keyboard (2.0414ms)
✔ item chicken-leg-war (1.8838ms)
✔ item christmas-cake-pickup-compare (1.7817ms)
✔ item christmas-cake-preorder-compare (1.7284ms)
✔ item christmas-cake-price-compare (2.143ms)
✔ item christmas-cake-slices (1.8635ms)
✔ item clock-out (2.1588ms)
✔ item elevator-awkward (2.2171ms)
✔ item fish-cake-cart-asmr (2.0183ms)
✖ item fish-cake-stall-asmr (1.2007ms)
✔ item monday-alarm (1.8806ms)
✔ item paper-smoother (2.0147ms)
✔ item persimmon-breeze (0.817ms)
✔ item puffer-zip (1.8985ms)
✔ item puffer-zip-challenge (1.9048ms)
✔ item ramen-wait (1.7804ms)
✔ item scarf-untangler (1.5133ms)
✔ item snowprint-puzzle (1.9289ms)
✔ item tangerine-peel-puzzle (1.5035ms)
✔ item twin-anmin (5.6379ms)
✔ item twin-daewon (6.6068ms)
✔ item winter-snack-ladder (1.8653ms)
✔ item year-end-date-picker (1.6388ms)
✔ item year-end-receipt (1.9213ms)
(node:34992) ExperimentalWarning: SQLite is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
✔ voter ids are stable, per item, and hide the IP (5.9235ms)
✔ like, switch, withdraw and repeat votes (2.1407ms)
✔ counts and top list (2.0519ms)
ℹ tests 29
ℹ suites 0
ℹ pass 28
ℹ fail 1
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 141.9053

✖ failing tests:

test at test\items.test.mjs:15:3
✖ item fish-cake-stall-asmr (1.2007ms)
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
