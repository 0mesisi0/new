# Build failed

2026-11-26T18:19:07.581Z

```
npm test failed:
ap-popper (1.0926ms)
✔ item bungeoppang-budget (1.1209ms)
✔ item cat-vs-keyboard (1.0411ms)
✔ item chicken-leg-war (1.0202ms)
✔ item christmas-cake-price-compare (1.0511ms)
✔ item christmas-cake-slices (1.1601ms)
✔ item christmas-long-weekend (1.1378ms)
✔ item clock-out (1.1093ms)
✔ item crank-carol-music-box (1.0896ms)
✔ item csat-after-plans (0.8259ms)
✔ item dns-address-trace (1.4796ms)
✔ item dongji-dumpling-puzzle (0.8994ms)
✔ item draft-detective (0.8233ms)
✔ item elevator-awkward (0.9201ms)
✔ item first-sunrise-2027 (0.7932ms)
✔ item fish-cake-cart-asmr (0.8754ms)
✔ item gift-wrap-sprint (0.8314ms)
✔ item holiday-gift-swap-prompts (0.7905ms)
✔ item hoppang-fortune (1.0066ms)
✔ item hotteok-flip (0.9402ms)
✔ item kimbap-roll-timing (0.8121ms)
✔ item knit-sweater-depiller (0.9493ms)
✔ item lost-glove-bureau (0.8682ms)
✔ item midnight-snack-mission (0.9006ms)
✔ item migratory-bird-formation (0.8468ms)
✔ item mini-curling (0.8596ms)
✔ item monday-alarm (0.9873ms)
✔ item new-year-countdown-clock (0.8567ms)
✔ item odd-bus-arrivals (0.8743ms)
✔ item ondol-pipe-puzzle (0.8202ms)
✔ item overseas-shopping-cost-calculator (0.819ms)
✔ item paper-smoother (1.4156ms)
✖ item pension-tax-credit-2026 (0.9008ms)
✔ item pocket-hand-warmer (0.8436ms)
✔ item popup-pileup (0.8295ms)
✔ item puffer-zip (0.8157ms)
✔ item ramen-wait (0.831ms)
✔ item regex-playground (1.0198ms)
✔ item roast-sweet-potato (1.0499ms)
✔ item sauna-towel-hat-studio (0.8249ms)
✔ item scarf-untangler (0.7617ms)
✔ item sheep-roundup-2027 (0.9151ms)
✔ item snow-duck-maker (0.8736ms)
✔ item snowflake-to-universe (1.0153ms)
✔ item snowplow-puzzle (0.7608ms)
✔ item snowprint-puzzle (0.9116ms)
✔ item space-out-challenge (0.9111ms)
✔ item stacked-discount-calculator (0.7613ms)
✔ item strike-ball-challenge (0.901ms)
✔ item tangerine-peel-puzzle (0.8583ms)
✔ item thin-ice-puddle (1.0784ms)
✔ item times-tables-speedrun (0.7904ms)
✔ item trend-lifespan-fortune (0.8925ms)
✔ item twin-anmin (5.0057ms)
✔ item twin-daewon (5.6927ms)
✔ item winter-fireside-radio (1.0508ms)
✔ item winter-laundry-puzzle (0.8576ms)
✔ item winter-shadow-lab (0.7949ms)
✔ item winter-snack-ladder (0.9234ms)
✔ item winter-star-connect (0.9724ms)
✔ item world-time-planner (0.9928ms)
✔ item year-end-date-picker (0.838ms)
✔ item year-end-receipt (1.6073ms)
(node:6204) ExperimentalWarning: SQLite is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
✔ voter ids are stable, per item, and hide the IP (5.566ms)
✔ like, switch, withdraw and repeat votes (2.1836ms)
✔ counts and top list (1.8707ms)
ℹ tests 70
ℹ suites 0
ℹ pass 69
ℹ fail 1
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 167.2119

✖ failing tests:

test at test\items.test.mjs:15:3
✖ item pension-tax-credit-2026 (0.9008ms)
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
