# Build failed

2026-11-22T08:26:07.168Z

```
npm test failed:

> test
> node --test test/*.test.mjs

✔ item after-party-escape (3.6348ms)
✔ item bungeoppang-budget (2.6402ms)
✔ item cat-vs-keyboard (1.767ms)
✔ item chicken-leg-war (1.7288ms)
✔ item christmas-cake-pickup-compare (1.4387ms)
✔ item christmas-cake-preorder-compare (1.4511ms)
✔ item christmas-cake-price-compare (1.3617ms)
✔ item christmas-cake-slices (1.4337ms)
✔ item christmas-gift-wrap-game (0.9295ms)
✔ item clock-out (1.8372ms)
✔ item elevator-awkward (1.5843ms)
✔ item fish-cake-cart-asmr (1.7955ms)
✖ item fish-cake-stall-asmr (0.8357ms)
✔ item monday-alarm (1.6359ms)
✔ item paper-smoother (1.5936ms)
✔ item puffer-zip (1.4008ms)
✔ item puffer-zip-challenge (1.5104ms)
✔ item ramen-wait (1.4347ms)
✔ item scarf-untangler (1.3423ms)
✔ item snowprint-puzzle (1.2302ms)
✔ item tangerine-peel-puzzle (1.3357ms)
✔ item twin-anmin (5.6928ms)
✔ item twin-daewon (6.2737ms)
✔ item winter-snack-ladder (1.6517ms)
✔ item year-end-date-picker (1.2656ms)
✔ item year-end-receipt (1.9633ms)
(node:24668) ExperimentalWarning: SQLite is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
✔ voter ids are stable, per item, and hide the IP (6.5011ms)
✔ like, switch, withdraw and repeat votes (2.1507ms)
✔ counts and top list (1.3392ms)
ℹ tests 29
ℹ suites 0
ℹ pass 28
ℹ fail 1
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 132.5575

✖ failing tests:

test at test\items.test.mjs:15:3
✖ item fish-cake-stall-asmr (0.8357ms)
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
