# Build failed

2026-11-27T05:19:49.460Z

```
npm test failed:
pper (1.0542ms)
✔ item bungeoppang-budget (1.0739ms)
✔ item cat-vs-keyboard (1.0211ms)
✔ item chicken-leg-war (0.9951ms)
✔ item christmas-cake-price-compare (0.9609ms)
✔ item christmas-cake-slices (0.9722ms)
✔ item christmas-long-weekend (1.0979ms)
✔ item clock-out (1.0714ms)
✔ item crank-carol-music-box (1.0076ms)
✔ item csat-after-plans (0.8416ms)
✔ item dns-address-trace (1.3534ms)
✔ item dongji-dumpling-puzzle (0.8954ms)
✔ item draft-detective (0.8609ms)
✔ item elevator-awkward (0.9198ms)
✔ item fish-cake-cart-asmr (0.8209ms)
✔ item gift-wrap-sprint (0.7915ms)
✔ item holiday-gift-swap-prompts (0.8171ms)
✔ item hoppang-fortune (0.9641ms)
✔ item hotteok-flip (0.9357ms)
✔ item kimbap-roll-timing (0.7967ms)
✔ item knit-sweater-depiller (0.8394ms)
✔ item lost-glove-bureau (0.8224ms)
✔ item midnight-snack-mission (0.9255ms)
✔ item migratory-bird-formation (0.8296ms)
✔ item mini-curling (0.8016ms)
✔ item monday-alarm (0.9342ms)
✔ item new-year-countdown-clock (0.886ms)
✔ item odd-bus-arrivals (0.7878ms)
✔ item ondol-pipe-puzzle (0.8776ms)
✔ item overseas-shopping-cost-calculator (0.9079ms)
✔ item paper-smoother (0.921ms)
✖ item pension-tax-credit-2026 (0.791ms)
✔ item pocket-hand-warmer (1.2555ms)
✔ item popup-pileup (0.8771ms)
✔ item puffer-zip (0.8266ms)
✔ item ramen-wait (0.8684ms)
✔ item regex-playground (0.9979ms)
✔ item roast-sweet-potato (0.9516ms)
✔ item running-pace-calculator (0.836ms)
✔ item sauna-towel-hat-studio (0.8059ms)
✔ item scarf-untangler (0.7873ms)
✔ item sheep-roundup-2027 (0.8787ms)
✔ item snow-duck-maker (0.8609ms)
✔ item snowflake-to-universe (0.9666ms)
✔ item snowplow-puzzle (0.754ms)
✔ item snowprint-puzzle (0.9231ms)
✔ item space-out-challenge (1.0947ms)
✔ item stacked-discount-calculator (0.8975ms)
✔ item strike-ball-challenge (0.9324ms)
✔ item tangerine-peel-puzzle (0.8647ms)
✔ item thin-ice-puddle (0.8745ms)
✔ item times-tables-speedrun (0.8023ms)
✔ item trend-lifespan-fortune (1.3176ms)
✔ item twin-anmin (4.8804ms)
✔ item twin-daewon (5.3234ms)
✔ item winter-fireside-radio (0.9817ms)
✔ item winter-laundry-puzzle (0.8045ms)
✔ item winter-shadow-lab (0.7488ms)
✔ item winter-snack-ladder (0.8907ms)
✔ item winter-star-connect (0.9484ms)
✔ item world-time-planner (0.9424ms)
✔ item year-end-date-picker (0.7814ms)
✔ item year-end-receipt (1.0806ms)
(node:43624) ExperimentalWarning: SQLite is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
✔ voter ids are stable, per item, and hide the IP (5.6386ms)
✔ like, switch, withdraw and repeat votes (2.1411ms)
✔ counts and top list (2.1657ms)
ℹ tests 70
ℹ suites 0
ℹ pass 69
ℹ fail 1
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 164.2918

✖ failing tests:

test at test\items.test.mjs:15:3
✖ item pension-tax-credit-2026 (0.791ms)
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
