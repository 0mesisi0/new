# Build failed

2026-11-22T02:32:18.071Z

```
npm test failed:

> test
> node --test test/*.test.mjs

✔ item after-party-escape (4.2335ms)
✔ item bungeoppang-budget (4.4526ms)
✔ item cat-vs-keyboard (3.0443ms)
✔ item chicken-leg-war (3.1235ms)
✔ item christmas-cake-pickup-compare (2.0026ms)
✔ item christmas-cake-preorder-compare (2.2162ms)
✔ item christmas-cake-price-compare (2.1962ms)
✔ item christmas-cake-slices (1.9695ms)
✔ item clock-out (3.434ms)
✔ item elevator-awkward (2.5644ms)
✔ item fish-cake-cart-asmr (2.2925ms)
✖ item fish-cake-stall-asmr (1.3839ms)
✔ item monday-alarm (2.4093ms)
✔ item paper-smoother (2.8531ms)
✔ item puffer-zip (2.2122ms)
✔ item puffer-zip-challenge (2.4144ms)
✔ item ramen-wait (2.4244ms)
✔ item scarf-untangler (1.7055ms)
✔ item snowprint-puzzle (2.1204ms)
✔ item tangerine-peel-puzzle (1.8016ms)
✔ item twin-anmin (10.3892ms)
✔ item twin-daewon (11.6234ms)
✔ item winter-snack-ladder (2.9533ms)
✔ item winter-window-doodles (1.4ms)
✔ item year-end-date-picker (2.02ms)
✔ item year-end-receipt (3.1185ms)
(node:47764) ExperimentalWarning: SQLite is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
✔ voter ids are stable, per item, and hide the IP (7.3473ms)
✔ like, switch, withdraw and repeat votes (14.9431ms)
✔ counts and top list (2.1232ms)
ℹ tests 29
ℹ suites 0
ℹ pass 28
ℹ fail 1
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 170.7812

✖ failing tests:

test at test\items.test.mjs:15:3
✖ item fish-cake-stall-asmr (1.3839ms)
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
