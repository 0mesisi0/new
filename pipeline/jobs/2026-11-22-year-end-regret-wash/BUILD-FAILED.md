# Build failed

2026-11-22T07:53:11.057Z

```
npm test failed:

> test
> node --test test/*.test.mjs

✔ item after-party-escape (3.7782ms)
✔ item bungeoppang-budget (1.7839ms)
✔ item cat-vs-keyboard (2.3287ms)
✔ item chicken-leg-war (1.6306ms)
✔ item christmas-cake-pickup-compare (1.4637ms)
✔ item christmas-cake-preorder-compare (1.5851ms)
✔ item christmas-cake-price-compare (1.4631ms)
✔ item christmas-cake-slices (1.4411ms)
✔ item clock-out (1.614ms)
✔ item elevator-awkward (1.588ms)
✔ item fish-cake-cart-asmr (1.6276ms)
✖ item fish-cake-stall-asmr (0.7947ms)
✔ item monday-alarm (1.5533ms)
✔ item paper-smoother (1.6839ms)
✔ item puffer-zip (1.4021ms)
✔ item puffer-zip-challenge (1.5979ms)
✔ item ramen-wait (1.4832ms)
✔ item scarf-untangler (1.3826ms)
✔ item snowprint-puzzle (1.4769ms)
✔ item tangerine-peel-puzzle (1.4399ms)
✔ item twin-anmin (5.5934ms)
✔ item twin-daewon (6.1784ms)
✔ item winter-snack-ladder (1.9111ms)
✔ item year-end-date-picker (1.3522ms)
✔ item year-end-receipt (1.4997ms)
✔ item year-end-regret-wash (0.7511ms)
(node:47256) ExperimentalWarning: SQLite is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
✔ voter ids are stable, per item, and hide the IP (5.885ms)
✔ like, switch, withdraw and repeat votes (2.2238ms)
✔ counts and top list (1.918ms)
ℹ tests 29
ℹ suites 0
ℹ pass 28
ℹ fail 1
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 131.2175

✖ failing tests:

test at test\items.test.mjs:15:3
✖ item fish-cake-stall-asmr (0.7947ms)
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
