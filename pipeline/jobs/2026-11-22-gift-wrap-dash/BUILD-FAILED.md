# Build failed

2026-11-22T08:38:17.206Z

```
npm test failed:

> test
> node --test test/*.test.mjs

✔ item after-party-escape (2.6634ms)
✔ item bungeoppang-budget (1.8668ms)
✔ item cat-vs-keyboard (1.0992ms)
✔ item chicken-leg-war (0.9759ms)
✔ item christmas-cake-pickup-compare (1.0218ms)
✔ item christmas-cake-preorder-compare (0.8804ms)
✔ item christmas-cake-price-compare (0.8998ms)
✔ item christmas-cake-slices (0.9473ms)
✔ item clock-out (1.1124ms)
✔ item elevator-awkward (1.1451ms)
✔ item fish-cake-cart-asmr (0.8948ms)
✖ item fish-cake-stall-asmr (0.7761ms)
✔ item gift-wrap-dash (0.8732ms)
✔ item monday-alarm (0.9306ms)
✔ item paper-smoother (0.9811ms)
✔ item puffer-zip (0.9062ms)
✔ item puffer-zip-challenge (0.9031ms)
✔ item ramen-wait (0.9116ms)
✔ item scarf-untangler (0.8216ms)
✔ item snowprint-puzzle (0.8901ms)
✔ item tangerine-peel-puzzle (0.8723ms)
✔ item twin-anmin (5.0674ms)
✔ item twin-daewon (6.1268ms)
✔ item winter-snack-ladder (0.9964ms)
✔ item year-end-date-picker (0.8242ms)
✔ item year-end-receipt (1.1721ms)
(node:35200) ExperimentalWarning: SQLite is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
✔ voter ids are stable, per item, and hide the IP (5.8011ms)
✔ like, switch, withdraw and repeat votes (2.1907ms)
✔ counts and top list (2.0611ms)
ℹ tests 29
ℹ suites 0
ℹ pass 28
ℹ fail 1
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 119.1471

✖ failing tests:

test at test\items.test.mjs:15:3
✖ item fish-cake-stall-asmr (0.7761ms)
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
