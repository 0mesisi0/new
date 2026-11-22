# Build failed

2026-11-22T07:25:23.737Z

```
npm test failed:

> test
> node --test test/*.test.mjs

✔ item after-party-escape (3.5732ms)
✔ item bungeoppang-budget (1.9145ms)
✔ item cat-vs-keyboard (2.2162ms)
✔ item chicken-leg-war (1.6668ms)
✔ item christmas-cake-pickup-compare (1.4723ms)
✔ item christmas-cake-preorder-compare (1.5663ms)
✔ item christmas-cake-price-compare (1.6559ms)
✔ item christmas-cake-slices (1.5147ms)
✔ item christmas-lights-card (0.9932ms)
✔ item clock-out (1.9393ms)
✔ item elevator-awkward (1.5873ms)
✔ item fish-cake-cart-asmr (1.5096ms)
✖ item fish-cake-stall-asmr (0.8229ms)
✔ item monday-alarm (1.5174ms)
✔ item paper-smoother (1.5248ms)
✔ item puffer-zip (1.4744ms)
✔ item puffer-zip-challenge (1.4516ms)
✔ item ramen-wait (1.5931ms)
✔ item scarf-untangler (1.3172ms)
✔ item snowprint-puzzle (1.3007ms)
✔ item tangerine-peel-puzzle (1.2938ms)
✔ item twin-anmin (5.6175ms)
✔ item twin-daewon (5.9336ms)
✔ item winter-snack-ladder (1.5029ms)
✔ item year-end-date-picker (1.2371ms)
✔ item year-end-receipt (1.5075ms)
(node:48916) ExperimentalWarning: SQLite is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
✔ voter ids are stable, per item, and hide the IP (5.891ms)
✔ like, switch, withdraw and repeat votes (2.1455ms)
✔ counts and top list (2.1979ms)
ℹ tests 29
ℹ suites 0
ℹ pass 28
ℹ fail 1
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 133.547

✖ failing tests:

test at test\items.test.mjs:15:3
✖ item fish-cake-stall-asmr (0.8229ms)
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
