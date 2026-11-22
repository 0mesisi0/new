# Build failed

2026-11-22T05:41:29.066Z

```
npm test failed:

> test
> node --test test/*.test.mjs

✔ item after-party-escape (4.2989ms)
✔ item bungeoppang-budget (3.5941ms)
✔ item cat-vs-keyboard (2.6167ms)
✔ item chicken-leg-war (2.3282ms)
✔ item christmas-cake-pickup-compare (2.0727ms)
✔ item christmas-cake-preorder-compare (2.3836ms)
✔ item christmas-cake-price-compare (2.4264ms)
✔ item christmas-cake-slices (2.1367ms)
✔ item clock-out (2.8513ms)
✔ item elevator-awkward (2.5626ms)
✔ item fish-cake-cart-asmr (2.2062ms)
✖ item fish-cake-stall-asmr (1.5371ms)
✔ item foggy-window-doodles (0.9488ms)
✔ item monday-alarm (2.0965ms)
✔ item paper-smoother (2.1555ms)
✔ item puffer-zip (2.1201ms)
✔ item puffer-zip-challenge (1.963ms)
✔ item ramen-wait (2.0745ms)
✔ item scarf-untangler (2.0529ms)
✔ item snowprint-puzzle (1.9472ms)
✔ item tangerine-peel-puzzle (1.8039ms)
✔ item twin-anmin (6.4937ms)
✔ item twin-daewon (7.4143ms)
✔ item winter-snack-ladder (2.355ms)
✔ item year-end-date-picker (2.0419ms)
✔ item year-end-receipt (2.2171ms)
(node:15904) ExperimentalWarning: SQLite is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
✔ voter ids are stable, per item, and hide the IP (6.5092ms)
✔ like, switch, withdraw and repeat votes (2.5636ms)
✔ counts and top list (2.4593ms)
ℹ tests 29
ℹ suites 0
ℹ pass 28
ℹ fail 1
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 155.5277

✖ failing tests:

test at test\items.test.mjs:15:3
✖ item fish-cake-stall-asmr (1.5371ms)
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
