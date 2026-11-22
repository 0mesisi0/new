# Build failed

2026-11-22T05:29:15.673Z

```
npm test failed:

> test
> node --test test/*.test.mjs

✔ item after-party-escape (4.0825ms)
✔ item bungeoppang-budget (2.7728ms)
✔ item cat-vs-keyboard (2.1079ms)
✔ item chicken-leg-war (2.0529ms)
✔ item christmas-cake-pickup-compare (1.8539ms)
✔ item christmas-cake-preorder-compare (1.6065ms)
✔ item christmas-cake-price-compare (1.7786ms)
✔ item christmas-cake-slices (1.9294ms)
✔ item clock-out (2.0773ms)
✔ item elevator-awkward (2.1618ms)
✔ item fish-cake-cart-asmr (2.0119ms)
✖ item fish-cake-stall-asmr (1.2897ms)
✔ item foggy-window-drawing (1.0265ms)
✔ item monday-alarm (1.9503ms)
✔ item paper-smoother (1.8952ms)
✔ item puffer-zip (1.8591ms)
✔ item puffer-zip-challenge (1.8385ms)
✔ item ramen-wait (1.8002ms)
✔ item scarf-untangler (1.6954ms)
✔ item snowprint-puzzle (1.8475ms)
✔ item tangerine-peel-puzzle (1.6114ms)
✔ item twin-anmin (6.0785ms)
✔ item twin-daewon (6.8616ms)
✔ item winter-snack-ladder (1.9798ms)
✔ item year-end-date-picker (1.8366ms)
✔ item year-end-receipt (2.2067ms)
(node:42900) ExperimentalWarning: SQLite is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
✔ voter ids are stable, per item, and hide the IP (5.8991ms)
✔ like, switch, withdraw and repeat votes (2.1965ms)
✔ counts and top list (2.29ms)
ℹ tests 29
ℹ suites 0
ℹ pass 28
ℹ fail 1
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 143.4202

✖ failing tests:

test at test\items.test.mjs:15:3
✖ item fish-cake-stall-asmr (1.2897ms)
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
