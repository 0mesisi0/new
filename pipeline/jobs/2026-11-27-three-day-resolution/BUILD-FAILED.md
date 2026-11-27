# Build failed

2026-11-27T05:25:01.338Z

```
npm test failed:
tem lost-glove-bureau (0.8494ms)
✔ item midnight-snack-mission (0.9482ms)
✔ item migratory-bird-formation (0.8373ms)
✔ item mini-curling (0.8101ms)
✔ item monday-alarm (0.9084ms)
✔ item new-year-countdown-clock (0.9002ms)
✔ item odd-bus-arrivals (0.8108ms)
✔ item ondol-pipe-puzzle (0.8891ms)
✔ item overseas-shopping-cost-calculator (0.8319ms)
✔ item paper-smoother (1.079ms)
✖ item pension-tax-credit-2026 (0.8303ms)
✔ item pocket-hand-warmer (1.2139ms)
✔ item popup-pileup (0.7804ms)
✔ item puffer-zip (0.8116ms)
✔ item ramen-wait (0.8866ms)
✔ item regex-playground (1.0037ms)
✔ item roast-sweet-potato (0.9379ms)
✔ item sauna-towel-hat-studio (0.8302ms)
✔ item scarf-untangler (0.8274ms)
✔ item sheep-roundup-2027 (0.9081ms)
✔ item snow-duck-maker (0.8794ms)
✔ item snowflake-to-universe (1.0107ms)
✔ item snowplow-puzzle (0.7938ms)
✔ item snowprint-puzzle (0.8159ms)
✔ item space-out-challenge (1.0402ms)
✔ item stacked-discount-calculator (0.7481ms)
✔ item strike-ball-challenge (0.9903ms)
✔ item tangerine-peel-puzzle (0.8483ms)
✔ item thin-ice-puddle (0.9369ms)
✖ item three-day-resolution (0.4113ms)
✔ item times-tables-speedrun (0.792ms)
✔ item trend-lifespan-fortune (0.8973ms)
✔ item twin-anmin (5.5995ms)
✔ item twin-daewon (5.0884ms)
✔ item winter-fireside-radio (1.0974ms)
✔ item winter-laundry-puzzle (0.8372ms)
✔ item winter-shadow-lab (0.763ms)
✔ item winter-snack-ladder (0.8965ms)
✔ item winter-star-connect (0.9124ms)
✔ item world-time-planner (0.9437ms)
✔ item year-end-date-picker (0.8523ms)
✔ item year-end-receipt (1.0924ms)
(node:36820) ExperimentalWarning: SQLite is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
✔ voter ids are stable, per item, and hide the IP (6.0759ms)
✔ like, switch, withdraw and repeat votes (2.2497ms)
✔ counts and top list (2.0777ms)
ℹ tests 70
ℹ suites 0
ℹ pass 68
ℹ fail 2
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 167.1505

✖ failing tests:

test at test\items.test.mjs:15:3
✖ item pension-tax-credit-2026 (0.8303ms)
  AssertionError [ERR_ASSERTION]: en.title too long
      at TestContext.<anonymous> (file:///C:/work/haruhanpan/play/test/items.test.mjs:32:14)
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

test at test\items.test.mjs:15:3
✖ item three-day-resolution (0.4113ms)
  AssertionError [ERR_ASSERTION]: unknown category arcade
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
