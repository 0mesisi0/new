# Build failed

2026-11-26T23:13:12.216Z

```
npm test failed:
te-relay (1.0081ms)
✔ item bubble-wrap-popper (1.0374ms)
✔ item bungeoppang-budget (1.0978ms)
✔ item cat-vs-keyboard (1.0166ms)
✔ item chicken-leg-war (0.9957ms)
✔ item christmas-cake-price-compare (0.9687ms)
✔ item christmas-cake-slices (1.0004ms)
✔ item christmas-long-weekend (1.1432ms)
✔ item clock-out (1.0595ms)
✔ item crank-carol-music-box (1.0907ms)
✔ item csat-after-plans (0.8176ms)
✔ item dns-address-trace (1.382ms)
✔ item dongji-dumpling-puzzle (1.0111ms)
✔ item draft-detective (0.8092ms)
✔ item elevator-awkward (0.8987ms)
✔ item fish-cake-cart-asmr (0.8114ms)
✔ item gift-wrap-sprint (0.8175ms)
✔ item holiday-gift-swap-prompts (0.7862ms)
✔ item hoppang-fortune (0.9584ms)
✔ item hotteok-flip (0.8974ms)
✔ item kimbap-roll-timing (0.8189ms)
✔ item knit-sweater-depiller (0.8772ms)
✔ item lost-glove-bureau (0.909ms)
✔ item midnight-snack-mission (1.0227ms)
✔ item migratory-bird-formation (0.8706ms)
✔ item mini-curling (0.8853ms)
✔ item monday-alarm (0.9342ms)
✔ item new-year-countdown-clock (0.9074ms)
✔ item odd-bus-arrivals (0.8077ms)
✔ item ondol-pipe-puzzle (0.8627ms)
✔ item overseas-shopping-cost-calculator (0.8588ms)
✔ item paper-smoother (0.9076ms)
✖ item pension-tax-credit-2026 (0.7959ms)
✔ item pocket-hand-warmer (1.2976ms)
✔ item popup-pileup (0.9496ms)
✔ item puffer-zip (0.7893ms)
✔ item ramen-wait (0.8316ms)
✔ item regex-playground (0.9947ms)
✔ item roast-sweet-potato (0.9218ms)
✔ item sauna-towel-hat-studio (1.1781ms)
✔ item scarf-untangler (0.8363ms)
✔ item sheep-roundup-2027 (0.954ms)
✔ item snow-duck-maker (0.9073ms)
✔ item snowflake-to-universe (0.999ms)
✔ item snowplow-puzzle (0.7604ms)
✔ item snowprint-puzzle (0.8088ms)
✔ item space-out-challenge (1.0549ms)
✔ item stacked-discount-calculator (0.7506ms)
✔ item strike-ball-challenge (0.8948ms)
✔ item tangerine-peel-puzzle (0.8161ms)
✔ item thin-ice-puddle (0.9133ms)
✔ item times-tables-speedrun (0.7794ms)
✔ item trend-lifespan-fortune (0.8909ms)
✔ item twin-anmin (4.9833ms)
✔ item twin-daewon (5.506ms)
✔ item winter-fireside-radio (1.0163ms)
✔ item winter-laundry-puzzle (0.8661ms)
✔ item winter-shadow-lab (0.7757ms)
✔ item winter-snack-ladder (0.9039ms)
✔ item winter-star-connect (0.9251ms)
✔ item world-time-planner (0.9675ms)
✔ item year-end-date-picker (0.9188ms)
✔ item year-end-receipt (1.1581ms)
(node:40656) ExperimentalWarning: SQLite is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
✔ voter ids are stable, per item, and hide the IP (6.4109ms)
✔ like, switch, withdraw and repeat votes (2.1396ms)
✔ counts and top list (1.3075ms)
ℹ tests 69
ℹ suites 0
ℹ pass 68
ℹ fail 1
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 165.7771

✖ failing tests:

test at test\items.test.mjs:15:3
✖ item pension-tax-credit-2026 (0.7959ms)
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

```
