# Build failed

2026-11-22T08:28:39.047Z

```
npm test failed:

> test
> node --test test/*.test.mjs

✔ item after-party-escape (3.6574ms)
✔ item bungeoppang-budget (2.4371ms)
✔ item cat-vs-keyboard (1.6511ms)
✔ item chicken-leg-war (1.5765ms)
✔ item christmas-cake-pickup-compare (1.3849ms)
✔ item christmas-cake-preorder-compare (1.4294ms)
✔ item christmas-cake-price-compare (1.5618ms)
✔ item christmas-cake-slices (1.4135ms)
✔ item christmas-light-board (1.053ms)
✔ item clock-out (1.8226ms)
✔ item elevator-awkward (1.8422ms)
✔ item fish-cake-cart-asmr (1.5811ms)
✖ item fish-cake-stall-asmr (0.8255ms)
✔ item monday-alarm (1.7472ms)
✔ item paper-smoother (1.7233ms)
✔ item puffer-zip (1.4861ms)
✔ item puffer-zip-challenge (1.4539ms)
✔ item ramen-wait (1.6574ms)
✔ item scarf-untangler (1.4445ms)
✔ item snowprint-puzzle (1.6219ms)
✔ item tangerine-peel-puzzle (1.496ms)
✔ item twin-anmin (5.9288ms)
✔ item twin-daewon (6.6009ms)
✔ item winter-snack-ladder (1.6918ms)
✔ item year-end-date-picker (1.4618ms)
✔ item year-end-receipt (1.7647ms)
(node:8604) ExperimentalWarning: SQLite is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
✔ voter ids are stable, per item, and hide the IP (5.533ms)
✔ like, switch, withdraw and repeat votes (2.1726ms)
✔ counts and top list (1.9082ms)
ℹ tests 29
ℹ suites 0
ℹ pass 28
ℹ fail 1
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 136.3937

✖ failing tests:

test at test\items.test.mjs:15:3
✖ item fish-cake-stall-asmr (0.8255ms)
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
