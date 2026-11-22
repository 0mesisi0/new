# Build failed

2026-11-22T07:40:52.953Z

```
npm test failed:

> test
> node --test test/*.test.mjs

✔ item after-party-escape (3.5396ms)
✔ item bungeoppang-budget (2.7565ms)
✔ item cat-vs-keyboard (1.9346ms)
✔ item chicken-leg-war (1.7404ms)
✔ item christmas-cake-pickup-compare (1.6881ms)
✔ item christmas-cake-preorder-compare (1.716ms)
✔ item christmas-cake-price-compare (1.7782ms)
✔ item christmas-cake-slices (1.6422ms)
✔ item clock-out (2.0746ms)
✔ item elevator-awkward (1.9407ms)
✔ item fish-cake-cart-asmr (1.8401ms)
✖ item fish-cake-stall-asmr (0.8611ms)
✔ item foggy-window-doodles (0.898ms)
✔ item monday-alarm (1.5386ms)
✔ item paper-smoother (1.5595ms)
✔ item puffer-zip (1.5007ms)
✔ item puffer-zip-challenge (1.5498ms)
✔ item ramen-wait (1.4465ms)
✔ item scarf-untangler (1.4704ms)
✔ item snowprint-puzzle (1.5324ms)
✔ item tangerine-peel-puzzle (1.5197ms)
✔ item twin-anmin (6.0047ms)
✔ item twin-daewon (6.8081ms)
✔ item winter-snack-ladder (1.8938ms)
✔ item year-end-date-picker (1.4242ms)
✔ item year-end-receipt (1.9556ms)
(node:20604) ExperimentalWarning: SQLite is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
✔ voter ids are stable, per item, and hide the IP (6.3961ms)
✔ like, switch, withdraw and repeat votes (2.4089ms)
✔ counts and top list (2.1717ms)
ℹ tests 29
ℹ suites 0
ℹ pass 28
ℹ fail 1
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 139.6967

✖ failing tests:

test at test\items.test.mjs:15:3
✖ item fish-cake-stall-asmr (0.8611ms)
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
