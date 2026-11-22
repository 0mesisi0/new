# Build failed

2026-11-22T05:51:23.858Z

```
npm test failed:

> test
> node --test test/*.test.mjs

✔ item after-party-escape (3.5546ms)
✔ item bungeoppang-budget (2.7491ms)
✔ item cat-vs-keyboard (1.7821ms)
✔ item chicken-leg-war (1.5496ms)
✔ item christmas-cake-pickup-compare (1.4599ms)
✔ item christmas-cake-preorder-compare (1.406ms)
✔ item christmas-cake-price-compare (1.4858ms)
✔ item christmas-cake-slices (1.4148ms)
✔ item clock-out (1.6332ms)
✔ item elevator-awkward (1.6411ms)
✔ item fish-cake-cart-asmr (1.6031ms)
✖ item fish-cake-stall-asmr (0.763ms)
✔ item monday-alarm (1.6226ms)
✔ item paper-smoother (1.5301ms)
✔ item puffer-zip (1.4823ms)
✔ item puffer-zip-challenge (1.3942ms)
✔ item ramen-wait (1.2897ms)
✔ item scarf-untangler (1.2263ms)
✔ item snowprint-puzzle (1.4443ms)
✔ item static-hair-studio (0.8291ms)
✔ item tangerine-peel-puzzle (1.4075ms)
✔ item twin-anmin (6.1657ms)
✔ item twin-daewon (6.5776ms)
✔ item winter-snack-ladder (1.4367ms)
✔ item year-end-date-picker (1.4122ms)
✔ item year-end-receipt (1.7476ms)
(node:24972) ExperimentalWarning: SQLite is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
✔ voter ids are stable, per item, and hide the IP (6.0386ms)
✔ like, switch, withdraw and repeat votes (2.1532ms)
✔ counts and top list (2.0948ms)
ℹ tests 29
ℹ suites 0
ℹ pass 28
ℹ fail 1
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 133.5181

✖ failing tests:

test at test\items.test.mjs:15:3
✖ item fish-cake-stall-asmr (0.763ms)
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
