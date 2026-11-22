# Build failed

2026-11-22T01:36:21.781Z

```
npm test failed:

> test
> node --test test/*.test.mjs

✔ item after-party-escape (2.7209ms)
✔ item bungeoppang-budget (2.0057ms)
✔ item cat-vs-keyboard (1.0832ms)
✔ item chicken-leg-war (0.9885ms)
✔ item christmas-cake-pickup-compare (0.8988ms)
✔ item christmas-cake-preorder-compare (0.8866ms)
✔ item christmas-cake-price-compare (0.9409ms)
✔ item christmas-cake-slices (0.8936ms)
✔ item clock-out (1.1026ms)
✔ item elevator-awkward (1.1783ms)
✔ item fish-cake-cart-asmr (0.9339ms)
✖ item fish-cake-stall-asmr (0.7359ms)
✔ item foggy-window-doodles (0.8443ms)
✔ item monday-alarm (0.9071ms)
✔ item paper-smoother (0.9603ms)
✔ item puffer-zip (0.8546ms)
✔ item puffer-zip-challenge (0.8887ms)
✔ item ramen-wait (0.8837ms)
✔ item scarf-untangler (0.8927ms)
✔ item snowprint-puzzle (0.8536ms)
✔ item tangerine-peel-puzzle (0.8504ms)
✔ item twin-anmin (4.9363ms)
✔ item twin-daewon (5.6543ms)
✔ item winter-snack-ladder (1.0829ms)
✔ item year-end-date-picker (1.1041ms)
✔ item year-end-receipt (1.1341ms)
(node:35300) ExperimentalWarning: SQLite is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
✔ voter ids are stable, per item, and hide the IP (5.8205ms)
✔ like, switch, withdraw and repeat votes (2.1885ms)
✔ counts and top list (2.0025ms)
ℹ tests 29
ℹ suites 0
ℹ pass 28
ℹ fail 1
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 118.6521

✖ failing tests:

test at test\items.test.mjs:15:3
✖ item fish-cake-stall-asmr (0.7359ms)
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
