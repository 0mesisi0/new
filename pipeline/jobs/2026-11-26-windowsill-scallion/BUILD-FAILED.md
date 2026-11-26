# Build failed

2026-11-26T19:05:07.473Z

```
npm test failed:
pper (1.1328ms)
✔ item bungeoppang-budget (1.1315ms)
✔ item cat-vs-keyboard (1.0196ms)
✔ item chicken-leg-war (0.9858ms)
✔ item christmas-cake-price-compare (1.3587ms)
✔ item christmas-cake-slices (1.0555ms)
✔ item christmas-long-weekend (1.1207ms)
✔ item clock-out (1.0849ms)
✔ item crank-carol-music-box (0.9979ms)
✔ item csat-after-plans (0.8702ms)
✔ item dns-address-trace (1.3874ms)
✔ item dongji-dumpling-puzzle (0.9222ms)
✔ item draft-detective (0.8784ms)
✔ item elevator-awkward (0.9313ms)
✔ item fish-cake-cart-asmr (0.8419ms)
✔ item gift-wrap-sprint (0.8411ms)
✔ item holiday-gift-swap-prompts (0.8157ms)
✔ item hoppang-fortune (0.9843ms)
✔ item hotteok-flip (0.9325ms)
✔ item kimbap-roll-timing (0.8427ms)
✔ item knit-sweater-depiller (0.8719ms)
✔ item lost-glove-bureau (0.8399ms)
✔ item midnight-snack-mission (0.9472ms)
✔ item migratory-bird-formation (0.8451ms)
✔ item mini-curling (0.8246ms)
✔ item monday-alarm (0.9089ms)
✔ item new-year-countdown-clock (0.9056ms)
✔ item odd-bus-arrivals (0.8156ms)
✔ item ondol-pipe-puzzle (0.9049ms)
✔ item overseas-shopping-cost-calculator (0.8245ms)
✔ item paper-smoother (0.9231ms)
✖ item pension-tax-credit-2026 (0.8512ms)
✔ item pocket-hand-warmer (1.2483ms)
✔ item popup-pileup (0.8349ms)
✔ item puffer-zip (0.8418ms)
✔ item ramen-wait (0.8611ms)
✔ item regex-playground (1.0045ms)
✔ item roast-sweet-potato (0.9447ms)
✔ item sauna-towel-hat-studio (0.8252ms)
✔ item scarf-untangler (0.7846ms)
✔ item sheep-roundup-2027 (0.955ms)
✔ item snow-duck-maker (0.8872ms)
✔ item snowflake-to-universe (1.0026ms)
✔ item snowplow-puzzle (0.7764ms)
✔ item snowprint-puzzle (0.8206ms)
✔ item space-out-challenge (1.0118ms)
✔ item stacked-discount-calculator (0.766ms)
✔ item strike-ball-challenge (0.9373ms)
✔ item tangerine-peel-puzzle (0.8152ms)
✔ item thin-ice-puddle (0.9373ms)
✔ item times-tables-speedrun (0.8041ms)
✔ item trend-lifespan-fortune (0.9154ms)
✔ item twin-anmin (4.8696ms)
✔ item twin-daewon (5.4012ms)
✔ item windowsill-scallion (1.0044ms)
✔ item winter-fireside-radio (0.9518ms)
✔ item winter-laundry-puzzle (0.8519ms)
✔ item winter-shadow-lab (0.7967ms)
✔ item winter-snack-ladder (0.9175ms)
✔ item winter-star-connect (1.0034ms)
✔ item world-time-planner (0.9743ms)
✔ item year-end-date-picker (0.8159ms)
✔ item year-end-receipt (1.1509ms)
(node:35400) ExperimentalWarning: SQLite is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
✔ voter ids are stable, per item, and hide the IP (5.8678ms)
✔ like, switch, withdraw and repeat votes (2.1914ms)
✔ counts and top list (2.6515ms)
ℹ tests 70
ℹ suites 0
ℹ pass 69
ℹ fail 1
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 168.7364

✖ failing tests:

test at test\items.test.mjs:15:3
✖ item pension-tax-credit-2026 (0.8512ms)
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
