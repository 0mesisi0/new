# Build failed

2026-11-27T09:14:56.789Z

```
npm test failed:
(1.0964ms)
✔ item bungeoppang-budget (1.1042ms)
✔ item cat-vs-keyboard (1.0461ms)
✔ item chicken-leg-war (1.0113ms)
✔ item christmas-cake-price-compare (1.005ms)
✔ item christmas-cake-slices (0.9704ms)
✔ item christmas-long-weekend (1.0827ms)
✔ item clock-out (1.1335ms)
✔ item crank-carol-music-box (1.0259ms)
✔ item csat-after-plans (1.0097ms)
✔ item dns-address-trace (1.5277ms)
✔ item dongji-dumpling-puzzle (0.906ms)
✔ item draft-detective (0.8351ms)
✔ item elevator-awkward (0.9266ms)
✔ item fish-cake-cart-asmr (0.8439ms)
✔ item gift-wrap-sprint (0.7952ms)
✔ item holiday-gift-swap-prompts (0.8ms)
✔ item hoppang-fortune (0.9866ms)
✔ item hotteok-flip (0.9279ms)
✔ item kimbap-roll-timing (0.8215ms)
✔ item knit-sweater-depiller (0.8477ms)
✔ item lost-glove-bureau (0.8403ms)
✔ item midnight-snack-mission (0.9304ms)
✔ item migratory-bird-formation (0.8563ms)
✔ item mini-curling (0.7993ms)
✔ item monday-alarm (0.8994ms)
✔ item new-year-countdown-clock (1.0146ms)
✔ item odd-bus-arrivals (0.7888ms)
✔ item ondol-pipe-puzzle (1.0602ms)
✔ item overseas-shopping-cost-calculator (0.9712ms)
✔ item paper-smoother (0.9222ms)
✖ item pension-tax-credit-2026 (0.8145ms)
✔ item pocket-hand-warmer (1.1192ms)
✔ item popup-pileup (0.7881ms)
✔ item puffer-zip (0.8093ms)
✔ item ramen-wait (0.8449ms)
✔ item regex-playground (0.9963ms)
✔ item roast-sweet-potato (0.9221ms)
✔ item sauna-towel-hat-studio (0.8397ms)
✔ item scarf-untangler (0.8068ms)
✔ item sheep-roundup-2027 (0.9221ms)
✔ item snow-duck-maker (0.8797ms)
✔ item snowflake-to-universe (0.9832ms)
✔ item snowplow-puzzle (1.0591ms)
✔ item snowprint-puzzle (0.8464ms)
✔ item space-out-challenge (1.0518ms)
✔ item stacked-discount-calculator (0.7415ms)
✔ item strike-ball-challenge (0.9018ms)
✔ item tangerine-peel-puzzle (0.8005ms)
✔ item thin-ice-puddle (0.9218ms)
✔ item times-tables-speedrun (0.7775ms)
✔ item trend-lifespan-fortune (0.8868ms)
✔ item twin-anmin (5.0078ms)
✔ item twin-daewon (6.0907ms)
✔ item unbeatable-snowman-tictactoe (0.9095ms)
✔ item winter-fireside-radio (0.9393ms)
✔ item winter-laundry-puzzle (0.8159ms)
✔ item winter-shadow-lab (0.7575ms)
✔ item winter-snack-ladder (0.8781ms)
✔ item winter-star-connect (0.9767ms)
✔ item world-time-planner (0.9158ms)
✔ item year-end-date-picker (0.7869ms)
✔ item year-end-receipt (1.0715ms)
(node:22504) ExperimentalWarning: SQLite is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
✔ voter ids are stable, per item, and hide the IP (6.2602ms)
✔ like, switch, withdraw and repeat votes (2.1991ms)
✔ counts and top list (2.0814ms)
ℹ tests 70
ℹ suites 0
ℹ pass 69
ℹ fail 1
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 170.738

✖ failing tests:

test at test\items.test.mjs:15:3
✖ item pension-tax-credit-2026 (0.8145ms)
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
