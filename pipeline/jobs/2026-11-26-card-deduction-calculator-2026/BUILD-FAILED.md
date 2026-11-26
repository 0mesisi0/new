# Build failed

2026-11-26T14:26:14.512Z

```
npm test failed:
.0709ms)
✔ item bungeoppang-budget (1.1014ms)
✔ item card-deduction-calculator-2026 (0.9475ms)
✔ item cat-vs-keyboard (1.0844ms)
✔ item chicken-leg-war (1.0365ms)
✔ item christmas-cake-price-compare (1.0543ms)
✔ item christmas-cake-slices (0.8895ms)
✔ item christmas-long-weekend (1.0573ms)
✔ item clock-out (1.0553ms)
✔ item crank-carol-music-box (1.6362ms)
✔ item csat-after-plans (0.8885ms)
✔ item dns-address-trace (0.8473ms)
✔ item dongji-dumpling-puzzle (0.855ms)
✔ item draft-detective (0.8085ms)
✔ item elevator-awkward (0.9128ms)
✔ item fish-cake-cart-asmr (0.8362ms)
✔ item gift-wrap-sprint (0.8308ms)
✔ item holiday-gift-swap-prompts (0.7858ms)
✔ item hoppang-fortune (1.042ms)
✔ item hotteok-flip (0.9393ms)
✔ item kimbap-roll-timing (0.826ms)
✔ item knit-sweater-depiller (0.891ms)
✔ item lost-glove-bureau (0.8688ms)
✔ item midnight-snack-mission (0.9015ms)
✔ item migratory-bird-formation (0.8495ms)
✔ item mini-curling (0.8381ms)
✔ item monday-alarm (1.0097ms)
✔ item new-year-countdown-clock (0.7986ms)
✔ item odd-bus-arrivals (0.8522ms)
✔ item ondol-pipe-puzzle (0.8047ms)
✔ item overseas-shopping-cost-calculator (1.3054ms)
✔ item paper-smoother (0.9515ms)
✖ item pension-tax-credit-2026 (0.7721ms)
✔ item pocket-hand-warmer (0.8117ms)
✔ item popup-pileup (0.818ms)
✔ item puffer-zip (0.8482ms)
✔ item ramen-wait (0.8334ms)
✔ item regex-playground (1.0192ms)
✔ item roast-sweet-potato (0.9959ms)
✔ item sauna-towel-hat-studio (0.8029ms)
✔ item scarf-untangler (0.7805ms)
✔ item sheep-roundup-2027 (0.905ms)
✔ item snow-duck-maker (0.8931ms)
✔ item snowflake-to-universe (1.0082ms)
✔ item snowplow-puzzle (0.8258ms)
✔ item snowprint-puzzle (0.9176ms)
✔ item space-out-challenge (0.9116ms)
✔ item stacked-discount-calculator (0.7493ms)
✔ item strike-ball-challenge (0.8945ms)
✔ item tangerine-peel-puzzle (0.8635ms)
✔ item thin-ice-puddle (1.2693ms)
✔ item times-tables-speedrun (0.8112ms)
✔ item trend-lifespan-fortune (0.8918ms)
✔ item twin-anmin (5.1571ms)
✔ item twin-daewon (5.7846ms)
✔ item winter-fireside-radio (1.0284ms)
✔ item winter-laundry-puzzle (0.8446ms)
✔ item winter-shadow-lab (0.7936ms)
✔ item winter-snack-ladder (0.9464ms)
✔ item winter-star-connect (0.9916ms)
✔ item world-time-planner (0.9402ms)
✔ item year-end-date-picker (0.8544ms)
✔ item year-end-receipt (1.1408ms)
(node:47740) ExperimentalWarning: SQLite is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
✔ voter ids are stable, per item, and hide the IP (5.9692ms)
✔ like, switch, withdraw and repeat votes (2.3703ms)
✔ counts and top list (2.0104ms)
ℹ tests 70
ℹ suites 0
ℹ pass 69
ℹ fail 1
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 167.1325

✖ failing tests:

test at test\items.test.mjs:15:3
✖ item pension-tax-credit-2026 (0.7721ms)
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
