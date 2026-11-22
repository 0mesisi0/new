# Build failed

2026-11-22T06:48:36.122Z

```
npm test failed:

> test
> node --test test/*.test.mjs

✔ item after-party-escape (3.7139ms)
✔ item bungeoppang-budget (2.068ms)
✔ item cat-vs-keyboard (2.1418ms)
✔ item chicken-leg-war (1.5276ms)
✔ item christmas-cake-pickup-compare (1.4427ms)
✔ item christmas-cake-preorder-compare (1.4702ms)
✔ item christmas-cake-price-compare (1.3996ms)
✔ item christmas-cake-slices (1.2945ms)
✔ item clock-out (1.7622ms)
✔ item elevator-awkward (1.7829ms)
✔ item fish-cake-cart-asmr (1.5819ms)
✖ item fish-cake-stall-asmr (0.8636ms)
✔ item kimjang-shopping-calculator (0.8736ms)
✔ item monday-alarm (1.4819ms)
✔ item paper-smoother (1.4624ms)
✔ item puffer-zip (1.3232ms)
✔ item puffer-zip-challenge (1.3182ms)
✔ item ramen-wait (1.4423ms)
✔ item scarf-untangler (1.562ms)
✔ item snowprint-puzzle (1.8688ms)
✔ item tangerine-peel-puzzle (1.373ms)
✔ item twin-anmin (5.5495ms)
✔ item twin-daewon (6.9262ms)
✔ item winter-snack-ladder (1.9058ms)
✔ item year-end-date-picker (1.3417ms)
✔ item year-end-receipt (1.7588ms)
(node:45920) ExperimentalWarning: SQLite is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
✔ voter ids are stable, per item, and hide the IP (5.6101ms)
✔ like, switch, withdraw and repeat votes (2.2104ms)
✔ counts and top list (2.4354ms)
ℹ tests 29
ℹ suites 0
ℹ pass 28
ℹ fail 1
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 132.6831

✖ failing tests:

test at test\items.test.mjs:15:3
✖ item fish-cake-stall-asmr (0.8636ms)
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
