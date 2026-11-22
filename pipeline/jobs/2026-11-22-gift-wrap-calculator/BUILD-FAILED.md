# Build failed

2026-11-22T07:38:25.625Z

```
npm test failed:

> test
> node --test test/*.test.mjs

✔ item after-party-escape (3.4847ms)
✔ item bungeoppang-budget (2.3074ms)
✔ item cat-vs-keyboard (1.6263ms)
✔ item chicken-leg-war (1.5693ms)
✔ item christmas-cake-pickup-compare (1.5311ms)
✔ item christmas-cake-preorder-compare (1.447ms)
✔ item christmas-cake-price-compare (1.6961ms)
✔ item christmas-cake-slices (1.4067ms)
✔ item clock-out (1.6701ms)
✔ item elevator-awkward (1.6938ms)
✔ item fish-cake-cart-asmr (1.4333ms)
✖ item fish-cake-stall-asmr (0.7982ms)
✔ item gift-wrap-calculator (0.8174ms)
✔ item monday-alarm (1.5487ms)
✔ item paper-smoother (1.541ms)
✔ item puffer-zip (1.4822ms)
✔ item puffer-zip-challenge (1.2992ms)
✔ item ramen-wait (1.3588ms)
✔ item scarf-untangler (1.4639ms)
✔ item snowprint-puzzle (1.3475ms)
✔ item tangerine-peel-puzzle (1.2949ms)
✔ item twin-anmin (5.2956ms)
✔ item twin-daewon (6.1005ms)
✔ item winter-snack-ladder (1.7591ms)
✔ item year-end-date-picker (1.2535ms)
✔ item year-end-receipt (1.6838ms)
(node:27760) ExperimentalWarning: SQLite is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
✔ voter ids are stable, per item, and hide the IP (5.8214ms)
✔ like, switch, withdraw and repeat votes (2.1953ms)
✔ counts and top list (1.9829ms)
ℹ tests 29
ℹ suites 0
ℹ pass 28
ℹ fail 1
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 130.7061

✖ failing tests:

test at test\items.test.mjs:15:3
✖ item fish-cake-stall-asmr (0.7982ms)
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
