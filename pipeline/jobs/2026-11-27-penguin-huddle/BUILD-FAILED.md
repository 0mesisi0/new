# Build failed

2026-11-27T05:16:16.551Z

```
npm test failed:
p-popper (1.0471ms)
✔ item bungeoppang-budget (1.0823ms)
✔ item cat-vs-keyboard (1.2493ms)
✔ item chicken-leg-war (1.0092ms)
✔ item christmas-cake-price-compare (0.9554ms)
✔ item christmas-cake-slices (0.9933ms)
✔ item christmas-long-weekend (1.1017ms)
✔ item clock-out (1.0986ms)
✔ item crank-carol-music-box (1.0317ms)
✔ item csat-after-plans (0.9632ms)
✔ item dns-address-trace (1.2797ms)
✔ item dongji-dumpling-puzzle (0.9034ms)
✔ item draft-detective (0.8153ms)
✔ item elevator-awkward (0.9147ms)
✔ item fish-cake-cart-asmr (0.8237ms)
✔ item gift-wrap-sprint (0.7828ms)
✔ item holiday-gift-swap-prompts (0.7897ms)
✔ item hoppang-fortune (0.9596ms)
✔ item hotteok-flip (0.9798ms)
✔ item kimbap-roll-timing (0.8046ms)
✔ item knit-sweater-depiller (0.8877ms)
✔ item lost-glove-bureau (0.8352ms)
✔ item midnight-snack-mission (0.9408ms)
✔ item migratory-bird-formation (0.8328ms)
✔ item mini-curling (0.8317ms)
✔ item monday-alarm (0.8945ms)
✔ item new-year-countdown-clock (0.9302ms)
✔ item odd-bus-arrivals (0.7956ms)
✔ item ondol-pipe-puzzle (0.8178ms)
✔ item overseas-shopping-cost-calculator (0.8681ms)
✔ item paper-smoother (0.9033ms)
✔ item penguin-huddle (1.4312ms)
✖ item pension-tax-credit-2026 (0.8932ms)
✔ item pocket-hand-warmer (0.7989ms)
✔ item popup-pileup (0.8001ms)
✔ item puffer-zip (0.8101ms)
✔ item ramen-wait (0.8333ms)
✔ item regex-playground (1.0578ms)
✔ item roast-sweet-potato (1.0426ms)
✔ item sauna-towel-hat-studio (0.8084ms)
✔ item scarf-untangler (0.7554ms)
✔ item sheep-roundup-2027 (0.9243ms)
✔ item snow-duck-maker (0.871ms)
✔ item snowflake-to-universe (0.9922ms)
✔ item snowplow-puzzle (0.7553ms)
✔ item snowprint-puzzle (0.9216ms)
✔ item space-out-challenge (0.9149ms)
✔ item stacked-discount-calculator (0.7329ms)
✔ item strike-ball-challenge (0.8816ms)
✔ item tangerine-peel-puzzle (0.8734ms)
✔ item thin-ice-puddle (1.1078ms)
✔ item times-tables-speedrun (0.7794ms)
✔ item trend-lifespan-fortune (0.9286ms)
✔ item twin-anmin (5.0202ms)
✔ item twin-daewon (5.4769ms)
✔ item winter-fireside-radio (1.0213ms)
✔ item winter-laundry-puzzle (0.8237ms)
✔ item winter-shadow-lab (0.7626ms)
✔ item winter-snack-ladder (0.8999ms)
✔ item winter-star-connect (1.1071ms)
✔ item world-time-planner (1.0046ms)
✔ item year-end-date-picker (0.8036ms)
✔ item year-end-receipt (1.1546ms)
(node:19972) ExperimentalWarning: SQLite is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
✔ voter ids are stable, per item, and hide the IP (5.6957ms)
✔ like, switch, withdraw and repeat votes (2.1436ms)
✔ counts and top list (2.3676ms)
ℹ tests 70
ℹ suites 0
ℹ pass 69
ℹ fail 1
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 165.6217

✖ failing tests:

test at test\items.test.mjs:15:3
✖ item pension-tax-credit-2026 (0.8932ms)
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
