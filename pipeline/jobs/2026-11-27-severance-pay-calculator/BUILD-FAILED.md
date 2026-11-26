# Build failed

2026-11-26T23:13:05.469Z

```
npm test failed:
opper (1.1358ms)
✔ item bungeoppang-budget (1.1399ms)
✔ item cat-vs-keyboard (1.0432ms)
✔ item chicken-leg-war (1.0377ms)
✔ item christmas-cake-price-compare (0.9669ms)
✔ item christmas-cake-slices (1.0485ms)
✔ item christmas-long-weekend (1.3227ms)
✔ item clock-out (1.1551ms)
✔ item crank-carol-music-box (1.0773ms)
✔ item csat-after-plans (0.8524ms)
✔ item dns-address-trace (1.645ms)
✔ item dongji-dumpling-puzzle (0.9922ms)
✔ item draft-detective (0.8649ms)
✔ item elevator-awkward (0.9337ms)
✔ item fish-cake-cart-asmr (0.849ms)
✔ item gift-wrap-sprint (0.7937ms)
✔ item holiday-gift-swap-prompts (0.7987ms)
✔ item hoppang-fortune (0.9664ms)
✔ item hotteok-flip (0.9506ms)
✔ item kimbap-roll-timing (0.8417ms)
✔ item knit-sweater-depiller (0.8761ms)
✔ item lost-glove-bureau (1.1477ms)
✔ item midnight-snack-mission (1.082ms)
✔ item migratory-bird-formation (0.8556ms)
✔ item mini-curling (0.8214ms)
✔ item monday-alarm (0.9477ms)
✔ item new-year-countdown-clock (0.9251ms)
✔ item odd-bus-arrivals (0.8041ms)
✔ item ondol-pipe-puzzle (0.8605ms)
✔ item overseas-shopping-cost-calculator (0.8957ms)
✔ item paper-smoother (0.9333ms)
✖ item pension-tax-credit-2026 (0.8543ms)
✔ item pocket-hand-warmer (1.3424ms)
✔ item popup-pileup (0.8733ms)
✔ item puffer-zip (0.8064ms)
✔ item ramen-wait (0.8611ms)
✔ item regex-playground (0.9933ms)
✔ item roast-sweet-potato (1.2169ms)
✔ item sauna-towel-hat-studio (0.932ms)
✔ item scarf-untangler (0.82ms)
✔ item severance-pay-calculator (0.8175ms)
✔ item sheep-roundup-2027 (0.9173ms)
✔ item snow-duck-maker (0.922ms)
✔ item snowflake-to-universe (1.2764ms)
✔ item snowplow-puzzle (0.8868ms)
✔ item snowprint-puzzle (1.0141ms)
✔ item space-out-challenge (0.9107ms)
✔ item stacked-discount-calculator (0.7439ms)
✔ item strike-ball-challenge (0.9971ms)
✔ item tangerine-peel-puzzle (0.9502ms)
✔ item thin-ice-puddle (0.8701ms)
✔ item times-tables-speedrun (0.8575ms)
✔ item trend-lifespan-fortune (1.3869ms)
✔ item twin-anmin (5.4221ms)
✔ item twin-daewon (5.9877ms)
✔ item winter-fireside-radio (1.1945ms)
✔ item winter-laundry-puzzle (0.9068ms)
✔ item winter-shadow-lab (0.9057ms)
✔ item winter-snack-ladder (1.0039ms)
✔ item winter-star-connect (1.0293ms)
✔ item world-time-planner (0.976ms)
✔ item year-end-date-picker (0.9127ms)
✔ item year-end-receipt (1.1432ms)
(node:37108) ExperimentalWarning: SQLite is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
✔ voter ids are stable, per item, and hide the IP (6.0763ms)
✔ like, switch, withdraw and repeat votes (2.2789ms)
✔ counts and top list (2.2354ms)
ℹ tests 70
ℹ suites 0
ℹ pass 69
ℹ fail 1
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 177.7662

✖ failing tests:

test at test\items.test.mjs:15:3
✖ item pension-tax-credit-2026 (0.8543ms)
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
