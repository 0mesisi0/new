# Build failed

2026-11-22T07:44:05.062Z

```
npm test failed:

> test
> node --test test/*.test.mjs

✔ item after-party-escape (4.0732ms)
✔ item bungeoppang-budget (2.8293ms)
✔ item cat-vs-keyboard (2.1897ms)
✔ item chicken-leg-war (1.8217ms)
✔ item christmas-cake-pickup-compare (1.814ms)
✔ item christmas-cake-preorder-compare (1.6672ms)
✔ item christmas-cake-price-compare (1.719ms)
✔ item christmas-cake-slices (1.5826ms)
✔ item clock-out (1.8411ms)
✔ item elevator-awkward (2.0005ms)
✔ item fish-cake-cart-asmr (1.8286ms)
✖ item fish-cake-stall-asmr (0.9727ms)
✔ item foggy-window-doodles (0.9305ms)
✔ item monday-alarm (1.9201ms)
✔ item paper-smoother (1.8681ms)
✔ item puffer-zip (1.5599ms)
✔ item puffer-zip-challenge (1.7924ms)
✔ item ramen-wait (1.5748ms)
✔ item scarf-untangler (1.4201ms)
✔ item snowprint-puzzle (1.493ms)
✔ item tangerine-peel-puzzle (1.5458ms)
✔ item twin-anmin (6.1262ms)
✔ item twin-daewon (7.4058ms)
✔ item winter-snack-ladder (2.1389ms)
✔ item year-end-date-picker (1.659ms)
✔ item year-end-receipt (1.8247ms)
(node:37976) ExperimentalWarning: SQLite is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
✔ voter ids are stable, per item, and hide the IP (6.699ms)
✔ like, switch, withdraw and repeat votes (2.5147ms)
✔ counts and top list (2.2731ms)
ℹ tests 29
ℹ suites 0
ℹ pass 28
ℹ fail 1
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 149.9593

✖ failing tests:

test at test\items.test.mjs:15:3
✖ item fish-cake-stall-asmr (0.9727ms)
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
