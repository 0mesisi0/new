# Build failed

2026-11-22T05:54:04.466Z

```
npm test failed:

> test
> node --test test/*.test.mjs

✔ item after-party-escape (3.7743ms)
✔ item bungeoppang-budget (2.5238ms)
✔ item cat-vs-keyboard (1.8177ms)
✔ item chicken-leg-war (1.6999ms)
✔ item christmas-cake-pickup-compare (1.6589ms)
✔ item christmas-cake-preorder-compare (1.7452ms)
✔ item christmas-cake-price-compare (2.07ms)
✔ item christmas-cake-slices (1.7259ms)
✔ item clock-out (1.9621ms)
✔ item elevator-awkward (2.0718ms)
✔ item fish-cake-cart-asmr (2.1068ms)
✖ item fish-cake-stall-asmr (0.879ms)
✔ item monday-alarm (1.9156ms)
✔ item paper-smoother (1.6302ms)
✔ item puffer-zip (1.5573ms)
✔ item puffer-zip-challenge (1.6121ms)
✔ item ramen-wait (1.6938ms)
✔ item scarf-untangler (1.6664ms)
✔ item snowprint-puzzle (1.5304ms)
✔ item static-sock-sweep (0.9309ms)
✔ item tangerine-peel-puzzle (1.5341ms)
✔ item twin-anmin (5.9121ms)
✔ item twin-daewon (7.5733ms)
✔ item winter-snack-ladder (2.0152ms)
✔ item year-end-date-picker (1.6017ms)
✔ item year-end-receipt (1.8576ms)
(node:20564) ExperimentalWarning: SQLite is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
✔ voter ids are stable, per item, and hide the IP (6.3431ms)
✔ like, switch, withdraw and repeat votes (2.3521ms)
✔ counts and top list (2.2626ms)
ℹ tests 29
ℹ suites 0
ℹ pass 28
ℹ fail 1
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 142.7256

✖ failing tests:

test at test\items.test.mjs:15:3
✖ item fish-cake-stall-asmr (0.879ms)
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
