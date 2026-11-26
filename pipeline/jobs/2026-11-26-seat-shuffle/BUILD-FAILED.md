# Build failed

2026-11-26T18:36:46.219Z

```
npm test failed:
bubble-wrap-popper (1.1499ms)
✔ item bungeoppang-budget (1.1891ms)
✔ item cat-vs-keyboard (1.099ms)
✔ item chicken-leg-war (1.4222ms)
✔ item christmas-cake-price-compare (1.3749ms)
✔ item christmas-cake-slices (1.1035ms)
✔ item christmas-long-weekend (1.2457ms)
✔ item clock-out (1.1751ms)
✔ item crank-carol-music-box (1.0758ms)
✔ item csat-after-plans (1.1092ms)
✔ item dns-address-trace (1.3929ms)
✔ item dongji-dumpling-puzzle (0.9559ms)
✔ item draft-detective (0.8429ms)
✔ item elevator-awkward (1.015ms)
✔ item fish-cake-cart-asmr (0.8734ms)
✔ item gift-wrap-sprint (0.8472ms)
✔ item holiday-gift-swap-prompts (0.8408ms)
✔ item hoppang-fortune (1.2404ms)
✔ item hotteok-flip (1.1551ms)
✔ item kimbap-roll-timing (0.8719ms)
✔ item knit-sweater-depiller (0.8817ms)
✔ item lost-glove-bureau (0.8834ms)
✔ item midnight-snack-mission (0.9685ms)
✔ item migratory-bird-formation (0.9005ms)
✔ item mini-curling (0.8615ms)
✔ item monday-alarm (0.9449ms)
✔ item new-year-countdown-clock (1.0313ms)
✔ item odd-bus-arrivals (0.8447ms)
✔ item ondol-pipe-puzzle (0.8988ms)
✔ item overseas-shopping-cost-calculator (0.8801ms)
✔ item paper-smoother (0.969ms)
✖ item pension-tax-credit-2026 (0.848ms)
✔ item pocket-hand-warmer (1.3651ms)
✔ item popup-pileup (1.0278ms)
✔ item puffer-zip (0.8956ms)
✔ item ramen-wait (0.9282ms)
✔ item regex-playground (1.0293ms)
✔ item roast-sweet-potato (0.9975ms)
✔ item sauna-towel-hat-studio (0.8774ms)
✔ item scarf-untangler (0.8397ms)
✔ item seat-shuffle (0.9271ms)
✔ item sheep-roundup-2027 (0.9564ms)
✔ item snow-duck-maker (0.9136ms)
✔ item snowflake-to-universe (1.0689ms)
✔ item snowplow-puzzle (0.8061ms)
✔ item snowprint-puzzle (1.0224ms)
✔ item space-out-challenge (0.955ms)
✔ item stacked-discount-calculator (0.785ms)
✔ item strike-ball-challenge (1.0055ms)
✔ item tangerine-peel-puzzle (0.9626ms)
✔ item thin-ice-puddle (0.9692ms)
✔ item times-tables-speedrun (0.8114ms)
✔ item trend-lifespan-fortune (1.4193ms)
✔ item twin-anmin (5.0329ms)
✔ item twin-daewon (5.561ms)
✔ item winter-fireside-radio (1.0613ms)
✔ item winter-laundry-puzzle (0.9162ms)
✔ item winter-shadow-lab (0.8918ms)
✔ item winter-snack-ladder (0.9662ms)
✔ item winter-star-connect (1.0768ms)
✔ item world-time-planner (1.0693ms)
✔ item year-end-date-picker (0.885ms)
✔ item year-end-receipt (1.3187ms)
(node:47536) ExperimentalWarning: SQLite is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
✔ voter ids are stable, per item, and hide the IP (6.7136ms)
✔ like, switch, withdraw and repeat votes (2.2701ms)
✔ counts and top list (1.4472ms)
ℹ tests 70
ℹ suites 0
ℹ pass 69
ℹ fail 1
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 175.7199

✖ failing tests:

test at test\items.test.mjs:15:3
✖ item pension-tax-credit-2026 (0.848ms)
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
