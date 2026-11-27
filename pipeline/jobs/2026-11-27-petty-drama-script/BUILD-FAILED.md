# Build failed

2026-11-27T10:23:08.016Z

```
npm test failed:
89ms)
✔ item lost-glove-bureau (0.8471ms)
✔ item midnight-snack-mission (0.9363ms)
✔ item migratory-bird-formation (0.8318ms)
✔ item mini-curling (0.8079ms)
✔ item monday-alarm (0.9099ms)
✔ item new-year-countdown-clock (0.9159ms)
✔ item odd-bus-arrivals (0.7928ms)
✔ item ondol-pipe-puzzle (0.8881ms)
✔ item overseas-shopping-cost-calculator (0.8221ms)
✔ item paper-smoother (0.914ms)
✖ item pension-tax-credit-2026 (0.7862ms)
✖ item petty-drama-script (0.1829ms)
✔ item pocket-hand-warmer (0.7961ms)
✔ item popup-pileup (0.8013ms)
✔ item puffer-zip (0.8066ms)
✔ item ramen-wait (1.1032ms)
✔ item regex-playground (1.3087ms)
✔ item roast-sweet-potato (0.9493ms)
✔ item sauna-towel-hat-studio (0.8267ms)
✔ item scarf-untangler (0.7594ms)
✔ item sheep-roundup-2027 (0.8924ms)
✔ item snow-duck-maker (0.878ms)
✔ item snowflake-to-universe (0.9813ms)
✔ item snowplow-puzzle (0.7642ms)
✔ item snowprint-puzzle (0.8083ms)
✔ item space-out-challenge (1.0275ms)
✔ item stacked-discount-calculator (0.7369ms)
✔ item strike-ball-challenge (0.9106ms)
✔ item tangerine-peel-puzzle (0.8119ms)
✔ item thin-ice-puddle (0.9342ms)
✔ item times-tables-speedrun (0.7897ms)
✔ item trend-lifespan-fortune (1.1032ms)
✔ item twin-anmin (5.1135ms)
✔ item twin-daewon (5.7447ms)
✔ item winter-fireside-radio (1.0067ms)
✔ item winter-laundry-puzzle (0.8445ms)
✔ item winter-shadow-lab (0.7933ms)
✔ item winter-snack-ladder (0.9175ms)
✔ item winter-star-connect (1.0646ms)
✔ item world-time-planner (1.1347ms)
✔ item year-end-date-picker (0.8956ms)
✔ item year-end-receipt (1.1289ms)
(node:34576) ExperimentalWarning: SQLite is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
✔ voter ids are stable, per item, and hide the IP (5.6022ms)
✔ like, switch, withdraw and repeat votes (2.3713ms)
✔ counts and top list (2.2145ms)
ℹ tests 70
ℹ suites 0
ℹ pass 68
ℹ fail 2
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 165.2063

✖ failing tests:

test at test\items.test.mjs:15:3
✖ item pension-tax-credit-2026 (0.7862ms)
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
✖ item petty-drama-script (0.1829ms)
  AssertionError [ERR_ASSERTION]: meta.json missing
      at TestContext.<anonymous> (file:///C:/work/haruhanpan/play/test/items.test.mjs:18:12)
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
