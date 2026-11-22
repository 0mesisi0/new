# Build failed

2026-11-22T05:38:22.490Z

```
npm test failed:

> test
> node --test test/*.test.mjs

✔ item after-party-escape (3.6529ms)
✔ item bungeoppang-budget (2.2282ms)
✔ item cat-vs-keyboard (2.94ms)
✔ item chicken-leg-war (2.1957ms)
✔ item christmas-cake-pickup-compare (2.002ms)
✔ item christmas-cake-preorder-compare (2.3218ms)
✔ item christmas-cake-price-compare (2.068ms)
✔ item christmas-cake-slices (2.085ms)
✔ item clock-out (2.3518ms)
✔ item elevator-awkward (2.335ms)
✔ item fish-cake-cart-asmr (2.2359ms)
✖ item fish-cake-stall-asmr (1.4807ms)
✔ item foggy-window-doodles (1.0417ms)
✔ item monday-alarm (2.1269ms)
✔ item paper-smoother (1.9423ms)
✔ item puffer-zip (1.7428ms)
✔ item puffer-zip-challenge (1.7987ms)
✔ item ramen-wait (2.1143ms)
✔ item scarf-untangler (1.8383ms)
✔ item snowprint-puzzle (1.7438ms)
✔ item tangerine-peel-puzzle (1.9062ms)
✔ item twin-anmin (6.5307ms)
✔ item twin-daewon (7.2739ms)
✔ item winter-snack-ladder (2.3836ms)
✔ item year-end-date-picker (1.9067ms)
✔ item year-end-receipt (2.0506ms)
(node:19200) ExperimentalWarning: SQLite is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
✔ voter ids are stable, per item, and hide the IP (6.0616ms)
✔ like, switch, withdraw and repeat votes (2.5877ms)
✔ counts and top list (2.3745ms)
ℹ tests 29
ℹ suites 0
ℹ pass 28
ℹ fail 1
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 147.3749

✖ failing tests:

test at test\items.test.mjs:15:3
✖ item fish-cake-stall-asmr (1.4807ms)
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
