# Build failed

2026-11-22T06:39:50.387Z

```
npm test failed:

> test
> node --test test/*.test.mjs

✔ item after-party-escape (3.6386ms)
✔ item bungeoppang-budget (2.4162ms)
✔ item cat-vs-keyboard (1.9362ms)
✔ item chicken-leg-war (1.7053ms)
✔ item christmas-cake-pickup-compare (1.5212ms)
✔ item christmas-cake-preorder-compare (1.5442ms)
✔ item christmas-cake-price-compare (1.4996ms)
✔ item christmas-cake-slices (1.393ms)
✔ item clock-out (1.639ms)
✔ item elevator-awkward (1.6897ms)
✔ item fish-cake-cart-asmr (1.5304ms)
✖ item fish-cake-stall-asmr (0.7584ms)
✔ item kimjang-shopping-calculator (1.7554ms)
✔ item monday-alarm (1.6703ms)
✔ item paper-smoother (1.7063ms)
✔ item puffer-zip (1.3883ms)
✔ item puffer-zip-challenge (1.4229ms)
✔ item ramen-wait (1.4272ms)
✔ item scarf-untangler (1.5233ms)
✔ item snowprint-puzzle (1.6537ms)
✔ item tangerine-peel-puzzle (1.3426ms)
✔ item twin-anmin (5.9376ms)
✔ item twin-daewon (6.2034ms)
✔ item winter-snack-ladder (1.568ms)
✔ item year-end-date-picker (1.2895ms)
✔ item year-end-receipt (1.6504ms)
(node:46800) ExperimentalWarning: SQLite is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
✔ voter ids are stable, per item, and hide the IP (6.0378ms)
✔ like, switch, withdraw and repeat votes (2.188ms)
✔ counts and top list (2.0524ms)
ℹ tests 29
ℹ suites 0
ℹ pass 28
ℹ fail 1
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 133.3037

✖ failing tests:

test at test\items.test.mjs:15:3
✖ item fish-cake-stall-asmr (0.7584ms)
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
