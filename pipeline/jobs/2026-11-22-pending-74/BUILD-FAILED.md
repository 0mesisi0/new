# Build failed

2026-11-22T06:42:29.361Z

```
npm test failed:

> test
> node --test test/*.test.mjs

✔ item after-party-escape (3.2482ms)
✔ item bungeoppang-budget (2.1376ms)
✔ item cat-vs-keyboard (1.9218ms)
✔ item chicken-leg-war (1.8858ms)
✔ item christmas-cake-pickup-compare (1.6196ms)
✔ item christmas-cake-preorder-compare (1.4851ms)
✔ item christmas-cake-price-compare (1.5614ms)
✔ item christmas-cake-slices (1.5852ms)
✔ item clock-out (1.7178ms)
✔ item elevator-awkward (1.7914ms)
✔ item fish-cake-cart-asmr (1.7023ms)
✖ item fish-cake-stall-asmr (0.8639ms)
✔ item kimjang-cost-calculator (0.9009ms)
✔ item monday-alarm (1.8097ms)
✔ item paper-smoother (1.5828ms)
✔ item puffer-zip (1.4682ms)
✔ item puffer-zip-challenge (1.687ms)
✔ item ramen-wait (1.335ms)
✔ item scarf-untangler (1.2196ms)
✔ item snowprint-puzzle (1.2625ms)
✔ item tangerine-peel-puzzle (1.1751ms)
✔ item twin-anmin (5.3403ms)
✔ item twin-daewon (6.3256ms)
✔ item winter-snack-ladder (1.6302ms)
✔ item year-end-date-picker (1.4409ms)
✔ item year-end-receipt (1.6912ms)
(node:44684) ExperimentalWarning: SQLite is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
✔ voter ids are stable, per item, and hide the IP (6.3598ms)
✔ like, switch, withdraw and repeat votes (2.2723ms)
✔ counts and top list (2.1996ms)
ℹ tests 29
ℹ suites 0
ℹ pass 28
ℹ fail 1
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 132.8278

✖ failing tests:

test at test\items.test.mjs:15:3
✖ item fish-cake-stall-asmr (0.8639ms)
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
