# Build failed

2026-11-22T02:28:15.455Z

```
npm test failed:

> test
> node --test test/*.test.mjs

✔ item after-party-escape (2.8879ms)
✔ item bungeoppang-budget (1.8908ms)
✔ item cat-vs-keyboard (1.1649ms)
✔ item chicken-leg-war (1.1527ms)
✔ item christmas-cake-pickup-compare (0.9894ms)
✔ item christmas-cake-preorder-compare (1.1557ms)
✔ item christmas-cake-price-compare (1.3209ms)
✔ item christmas-cake-slices (1.0121ms)
✔ item clock-out (1.2296ms)
✔ item elevator-awkward (1.4451ms)
✔ item fish-cake-cart-asmr (1.1603ms)
✖ item fish-cake-stall-asmr (0.981ms)
✔ item monday-alarm (1.1843ms)
✔ item paper-smoother (1.0761ms)
✔ item puffer-zip (0.9027ms)
✔ item puffer-zip-challenge (1.1244ms)
✔ item ramen-wait (1.0799ms)
✔ item scarf-untangler (1.1142ms)
✔ item snowprint-puzzle (1.1692ms)
✔ item tangerine-peel-puzzle (1.0815ms)
✔ item twin-anmin (5.4899ms)
✔ item twin-daewon (5.7726ms)
✔ item winter-fog-window (0.951ms)
✔ item winter-snack-ladder (0.9513ms)
✔ item year-end-date-picker (0.8289ms)
✔ item year-end-receipt (1.1421ms)
(node:22220) ExperimentalWarning: SQLite is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
✔ voter ids are stable, per item, and hide the IP (6.4776ms)
✔ like, switch, withdraw and repeat votes (2.5474ms)
✔ counts and top list (2.2522ms)
ℹ tests 29
ℹ suites 0
ℹ pass 28
ℹ fail 1
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 136.6502

✖ failing tests:

test at test\items.test.mjs:15:3
✖ item fish-cake-stall-asmr (0.981ms)
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
