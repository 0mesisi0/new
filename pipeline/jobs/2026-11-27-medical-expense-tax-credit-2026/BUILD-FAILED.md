# Build failed

2026-11-27T05:07:16.335Z

```
npm test failed:
er (1.0698ms)
✔ item bungeoppang-budget (1.0867ms)
✔ item cat-vs-keyboard (1.0192ms)
✔ item chicken-leg-war (0.9841ms)
✔ item christmas-cake-price-compare (0.927ms)
✔ item christmas-cake-slices (0.9839ms)
✔ item christmas-long-weekend (1.3815ms)
✔ item clock-out (1.1682ms)
✔ item crank-carol-music-box (0.979ms)
✔ item csat-after-plans (0.876ms)
✔ item dns-address-trace (1.3503ms)
✔ item dongji-dumpling-puzzle (0.904ms)
✔ item draft-detective (0.8337ms)
✔ item elevator-awkward (0.9263ms)
✔ item fish-cake-cart-asmr (0.8478ms)
✔ item gift-wrap-sprint (0.7803ms)
✔ item holiday-gift-swap-prompts (0.7905ms)
✔ item hoppang-fortune (0.9819ms)
✔ item hotteok-flip (0.9816ms)
✔ item kimbap-roll-timing (0.8085ms)
✔ item knit-sweater-depiller (0.8395ms)
✔ item lost-glove-bureau (0.8192ms)
✔ item medical-expense-tax-credit-2026 (0.9509ms)
✔ item midnight-snack-mission (0.8959ms)
✔ item migratory-bird-formation (0.8273ms)
✔ item mini-curling (0.848ms)
✔ item monday-alarm (0.9906ms)
✔ item new-year-countdown-clock (0.8066ms)
✔ item odd-bus-arrivals (0.8363ms)
✔ item ondol-pipe-puzzle (0.8067ms)
✔ item overseas-shopping-cost-calculator (0.7941ms)
✔ item paper-smoother (1.2758ms)
✖ item pension-tax-credit-2026 (0.801ms)
✔ item pocket-hand-warmer (0.7969ms)
✔ item popup-pileup (0.7859ms)
✔ item puffer-zip (0.7909ms)
✔ item ramen-wait (0.8225ms)
✔ item regex-playground (1.0057ms)
✔ item roast-sweet-potato (0.9602ms)
✔ item sauna-towel-hat-studio (0.7903ms)
✔ item scarf-untangler (0.7973ms)
✔ item sheep-roundup-2027 (0.8902ms)
✔ item snow-duck-maker (0.9011ms)
✔ item snowflake-to-universe (0.9824ms)
✔ item snowplow-puzzle (0.7596ms)
✔ item snowprint-puzzle (0.9106ms)
✔ item space-out-challenge (0.9022ms)
✔ item stacked-discount-calculator (0.7367ms)
✔ item strike-ball-challenge (0.887ms)
✔ item tangerine-peel-puzzle (0.8519ms)
✔ item thin-ice-puddle (1.0841ms)
✔ item times-tables-speedrun (0.7895ms)
✔ item trend-lifespan-fortune (0.8783ms)
✔ item twin-anmin (4.9302ms)
✔ item twin-daewon (5.4234ms)
✔ item winter-fireside-radio (0.9924ms)
✔ item winter-laundry-puzzle (0.8297ms)
✔ item winter-shadow-lab (0.7717ms)
✔ item winter-snack-ladder (0.8947ms)
✔ item winter-star-connect (0.9698ms)
✔ item world-time-planner (0.99ms)
✔ item year-end-date-picker (0.803ms)
✔ item year-end-receipt (1.1119ms)
(node:49952) ExperimentalWarning: SQLite is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
✔ voter ids are stable, per item, and hide the IP (6.371ms)
✔ like, switch, withdraw and repeat votes (2.1167ms)
✔ counts and top list (1.5575ms)
ℹ tests 70
ℹ suites 0
ℹ pass 69
ℹ fail 1
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 165.0406

✖ failing tests:

test at test\items.test.mjs:15:3
✖ item pension-tax-credit-2026 (0.801ms)
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
