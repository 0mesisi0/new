# Build failed

2026-11-22T02:22:47.997Z

```
npm test failed:

> test
> node --test test/*.test.mjs

✔ item after-party-escape (2.8847ms)
✔ item bungeoppang-budget (1.8762ms)
✔ item cat-vs-keyboard (1.1117ms)
✔ item chicken-leg-war (0.9987ms)
✔ item christmas-cake-pickup-compare (0.915ms)
✔ item christmas-cake-preorder-compare (0.9017ms)
✔ item christmas-cake-price-compare (0.9393ms)
✔ item christmas-cake-slices (0.9076ms)
✔ item clock-out (1.169ms)
✔ item elevator-awkward (1.1754ms)
✔ item fish-cake-cart-asmr (0.9121ms)
✖ item fish-cake-stall-asmr (0.8046ms)
✔ item foggy-window-doodles (0.8563ms)
✔ item monday-alarm (0.9245ms)
✔ item paper-smoother (0.9871ms)
✔ item puffer-zip (0.877ms)
✔ item puffer-zip-challenge (0.8764ms)
✔ item ramen-wait (0.9098ms)
✔ item scarf-untangler (0.8422ms)
✔ item snowprint-puzzle (0.9635ms)
✔ item tangerine-peel-puzzle (0.985ms)
✔ item twin-anmin (5.0264ms)
✔ item twin-daewon (6.4203ms)
✔ item winter-snack-ladder (1.0277ms)
✔ item year-end-date-picker (0.8379ms)
✔ item year-end-receipt (1.1211ms)
(node:45976) ExperimentalWarning: SQLite is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
✔ voter ids are stable, per item, and hide the IP (6.0579ms)
✔ like, switch, withdraw and repeat votes (2.3026ms)
✔ counts and top list (2.1051ms)
ℹ tests 29
ℹ suites 0
ℹ pass 28
ℹ fail 1
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 121.1987

✖ failing tests:

test at test\items.test.mjs:15:3
✖ item fish-cake-stall-asmr (0.8046ms)
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
