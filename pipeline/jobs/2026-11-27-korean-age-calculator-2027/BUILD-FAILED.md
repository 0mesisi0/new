# Build failed

2026-11-27T05:04:09.032Z

```
npm test failed:
per (1.0474ms)
✔ item bungeoppang-budget (1.0549ms)
✔ item cat-vs-keyboard (1.049ms)
✔ item chicken-leg-war (1.0095ms)
✔ item christmas-cake-price-compare (0.9455ms)
✔ item christmas-cake-slices (0.9326ms)
✔ item christmas-long-weekend (1.1329ms)
✔ item clock-out (1.0969ms)
✔ item crank-carol-music-box (1.0462ms)
✔ item csat-after-plans (0.8486ms)
✔ item dns-address-trace (1.3438ms)
✔ item dongji-dumpling-puzzle (0.8811ms)
✔ item draft-detective (0.823ms)
✔ item elevator-awkward (0.9304ms)
✔ item fish-cake-cart-asmr (0.825ms)
✔ item gift-wrap-sprint (0.7854ms)
✔ item holiday-gift-swap-prompts (0.804ms)
✔ item hoppang-fortune (0.9909ms)
✔ item hotteok-flip (0.9293ms)
✔ item kimbap-roll-timing (0.8039ms)
✔ item knit-sweater-depiller (0.8249ms)
✔ item korean-age-calculator-2027 (0.8108ms)
✔ item lost-glove-bureau (0.8637ms)
✔ item midnight-snack-mission (0.9163ms)
✔ item migratory-bird-formation (0.8351ms)
✔ item mini-curling (0.8174ms)
✔ item monday-alarm (0.9924ms)
✔ item new-year-countdown-clock (0.813ms)
✔ item odd-bus-arrivals (0.8627ms)
✔ item ondol-pipe-puzzle (0.8213ms)
✔ item overseas-shopping-cost-calculator (0.82ms)
✔ item paper-smoother (1.4114ms)
✖ item pension-tax-credit-2026 (0.8263ms)
✔ item pocket-hand-warmer (0.8078ms)
✔ item popup-pileup (0.7865ms)
✔ item puffer-zip (0.7986ms)
✔ item ramen-wait (0.8178ms)
✔ item regex-playground (0.9928ms)
✔ item roast-sweet-potato (0.9517ms)
✔ item sauna-towel-hat-studio (0.7905ms)
✔ item scarf-untangler (0.7961ms)
✔ item sheep-roundup-2027 (0.8933ms)
✔ item snow-duck-maker (0.8797ms)
✔ item snowflake-to-universe (0.9833ms)
✔ item snowplow-puzzle (0.778ms)
✔ item snowprint-puzzle (0.9161ms)
✔ item space-out-challenge (0.9267ms)
✔ item stacked-discount-calculator (0.7324ms)
✔ item strike-ball-challenge (0.8874ms)
✔ item tangerine-peel-puzzle (0.8715ms)
✔ item thin-ice-puddle (1.2101ms)
✔ item times-tables-speedrun (0.8375ms)
✔ item trend-lifespan-fortune (0.8818ms)
✔ item twin-anmin (4.8809ms)
✔ item twin-daewon (5.5458ms)
✔ item winter-fireside-radio (0.9926ms)
✔ item winter-laundry-puzzle (0.8176ms)
✔ item winter-shadow-lab (0.7615ms)
✔ item winter-snack-ladder (0.8824ms)
✔ item winter-star-connect (0.9522ms)
✔ item world-time-planner (0.9665ms)
✔ item year-end-date-picker (0.8399ms)
✔ item year-end-receipt (1.1053ms)
(node:26684) ExperimentalWarning: SQLite is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
✔ voter ids are stable, per item, and hide the IP (5.7193ms)
✔ like, switch, withdraw and repeat votes (2.1343ms)
✔ counts and top list (1.9675ms)
ℹ tests 70
ℹ suites 0
ℹ pass 69
ℹ fail 1
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 167.2814

✖ failing tests:

test at test\items.test.mjs:15:3
✖ item pension-tax-credit-2026 (0.8263ms)
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
