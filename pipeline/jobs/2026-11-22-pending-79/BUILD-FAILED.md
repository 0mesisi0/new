# Build failed

2026-11-22T06:57:45.272Z

```
npm test failed:

> test
> node --test test/*.test.mjs

✔ item after-party-escape (3.916ms)
✔ item bungeoppang-budget (2.575ms)
✔ item cat-vs-keyboard (2.0535ms)
✔ item chicken-leg-war (2.1134ms)
✔ item christmas-cake-pickup-compare (1.5905ms)
✔ item christmas-cake-preorder-compare (1.5124ms)
✔ item christmas-cake-price-compare (1.7671ms)
✔ item christmas-cake-slices (1.6728ms)
✔ item clock-out (1.9233ms)
✔ item elevator-awkward (2.0138ms)
✔ item fish-cake-cart-asmr (2.0071ms)
✖ item fish-cake-stall-asmr (0.8724ms)
✔ item kimjang-cost-calculator (1.1435ms)
✔ item monday-alarm (1.9141ms)
✔ item paper-smoother (1.9174ms)
✔ item puffer-zip (1.4547ms)
✔ item puffer-zip-challenge (1.7523ms)
✔ item ramen-wait (1.7638ms)
✔ item scarf-untangler (1.609ms)
✔ item snowprint-puzzle (1.5979ms)
✔ item tangerine-peel-puzzle (1.6708ms)
✔ item twin-anmin (6.1369ms)
✔ item twin-daewon (6.924ms)
✔ item winter-snack-ladder (1.8684ms)
✔ item year-end-date-picker (1.4895ms)
✔ item year-end-receipt (1.8921ms)
(node:47704) ExperimentalWarning: SQLite is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
✔ voter ids are stable, per item, and hide the IP (7.079ms)
✔ like, switch, withdraw and repeat votes (2.4066ms)
✔ counts and top list (1.5981ms)
ℹ tests 29
ℹ suites 0
ℹ pass 28
ℹ fail 1
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 146.6616

✖ failing tests:

test at test\items.test.mjs:15:3
✖ item fish-cake-stall-asmr (0.8724ms)
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
