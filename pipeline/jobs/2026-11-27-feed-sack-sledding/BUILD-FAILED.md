# Build failed

2026-11-27T04:55:08.402Z

```
npm test failed:
p-popper (1.0846ms)
✔ item bungeoppang-budget (1.0754ms)
✔ item cat-vs-keyboard (1.0319ms)
✔ item chicken-leg-war (0.9802ms)
✔ item christmas-cake-price-compare (0.9168ms)
✔ item christmas-cake-slices (0.9401ms)
✔ item christmas-long-weekend (1.11ms)
✔ item clock-out (1.0563ms)
✔ item crank-carol-music-box (0.9776ms)
✔ item csat-after-plans (0.8334ms)
✔ item dns-address-trace (1.5701ms)
✔ item dongji-dumpling-puzzle (0.9148ms)
✔ item draft-detective (0.8391ms)
✔ item elevator-awkward (0.9093ms)
✔ item feed-sack-sledding (0.8501ms)
✔ item fish-cake-cart-asmr (0.8349ms)
✔ item gift-wrap-sprint (0.8612ms)
✔ item holiday-gift-swap-prompts (0.7927ms)
✔ item hoppang-fortune (1.0255ms)
✔ item hotteok-flip (0.9742ms)
✔ item kimbap-roll-timing (0.8131ms)
✔ item knit-sweater-depiller (0.8984ms)
✔ item lost-glove-bureau (0.8505ms)
✔ item midnight-snack-mission (0.8995ms)
✔ item migratory-bird-formation (0.8411ms)
✔ item mini-curling (0.8509ms)
✔ item monday-alarm (1.0223ms)
✔ item new-year-countdown-clock (1.0332ms)
✔ item odd-bus-arrivals (1.0559ms)
✔ item ondol-pipe-puzzle (0.8447ms)
✔ item overseas-shopping-cost-calculator (0.8272ms)
✔ item paper-smoother (1.2711ms)
✖ item pension-tax-credit-2026 (0.8091ms)
✔ item pocket-hand-warmer (0.8072ms)
✔ item popup-pileup (0.8016ms)
✔ item puffer-zip (0.7989ms)
✔ item ramen-wait (0.8794ms)
✔ item regex-playground (1.0062ms)
✔ item roast-sweet-potato (1.0234ms)
✔ item sauna-towel-hat-studio (0.8363ms)
✔ item scarf-untangler (0.7891ms)
✔ item sheep-roundup-2027 (0.9165ms)
✔ item snow-duck-maker (0.9067ms)
✔ item snowflake-to-universe (0.9944ms)
✔ item snowplow-puzzle (0.8079ms)
✔ item snowprint-puzzle (0.929ms)
✔ item space-out-challenge (0.9049ms)
✔ item stacked-discount-calculator (0.7385ms)
✔ item strike-ball-challenge (0.8964ms)
✔ item tangerine-peel-puzzle (0.8697ms)
✔ item thin-ice-puddle (1.218ms)
✔ item times-tables-speedrun (0.8083ms)
✔ item trend-lifespan-fortune (0.9216ms)
✔ item twin-anmin (5.0145ms)
✔ item twin-daewon (5.831ms)
✔ item winter-fireside-radio (1.0249ms)
✔ item winter-laundry-puzzle (0.8257ms)
✔ item winter-shadow-lab (0.7645ms)
✔ item winter-snack-ladder (0.9052ms)
✔ item winter-star-connect (0.9854ms)
✔ item world-time-planner (1.0044ms)
✔ item year-end-date-picker (0.8029ms)
✔ item year-end-receipt (1.1273ms)
(node:47888) ExperimentalWarning: SQLite is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
✔ voter ids are stable, per item, and hide the IP (6.3439ms)
✔ like, switch, withdraw and repeat votes (2.1602ms)
✔ counts and top list (1.4009ms)
ℹ tests 70
ℹ suites 0
ℹ pass 69
ℹ fail 1
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 167.4751

✖ failing tests:

test at test\items.test.mjs:15:3
✖ item pension-tax-credit-2026 (0.8091ms)
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
