# Build failed

2026-11-27T00:07:30.212Z

```
npm test failed:
-popper (1.142ms)
✔ item bungeoppang-budget (1.1218ms)
✔ item cat-vs-keyboard (1.045ms)
✔ item chicken-leg-war (0.9889ms)
✔ item christmas-cake-price-compare (0.9447ms)
✔ item christmas-cake-slices (0.9684ms)
✔ item christmas-long-weekend (1.0878ms)
✔ item clock-out (1.1031ms)
✔ item crank-carol-music-box (0.9973ms)
✔ item csat-after-plans (0.8348ms)
✔ item dns-address-trace (1.2714ms)
✔ item dongji-dumpling-puzzle (0.9136ms)
✔ item draft-detective (1.066ms)
✔ item elevator-awkward (0.965ms)
✔ item fish-cake-cart-asmr (0.8278ms)
✔ item gift-wrap-sprint (0.7921ms)
✔ item holiday-gift-swap-prompts (0.7982ms)
✔ item hoppang-fortune (0.9689ms)
✔ item hotteok-flip (0.9402ms)
✔ item kimbap-roll-timing (0.8034ms)
✔ item knit-sweater-depiller (0.835ms)
✔ item lost-glove-bureau (0.8279ms)
✔ item midnight-snack-mission (0.9548ms)
✔ item migratory-bird-formation (0.8242ms)
✔ item mini-curling (0.8232ms)
✔ item monday-alarm (0.8932ms)
✔ item new-year-countdown-clock (0.9267ms)
✔ item new-year-fortune-2027 (0.9467ms)
✔ item odd-bus-arrivals (1.0379ms)
✔ item ondol-pipe-puzzle (0.9784ms)
✔ item overseas-shopping-cost-calculator (0.8555ms)
✔ item paper-smoother (1.2948ms)
✖ item pension-tax-credit-2026 (0.7909ms)
✔ item pocket-hand-warmer (0.8201ms)
✔ item popup-pileup (0.7998ms)
✔ item puffer-zip (0.8156ms)
✔ item ramen-wait (0.8274ms)
✔ item regex-playground (1.0115ms)
✔ item roast-sweet-potato (0.9801ms)
✔ item sauna-towel-hat-studio (0.7925ms)
✔ item scarf-untangler (0.7662ms)
✔ item sheep-roundup-2027 (0.8954ms)
✔ item snow-duck-maker (0.9342ms)
✔ item snowflake-to-universe (0.9891ms)
✔ item snowplow-puzzle (0.7736ms)
✔ item snowprint-puzzle (0.91ms)
✔ item space-out-challenge (0.9047ms)
✔ item stacked-discount-calculator (0.7682ms)
✔ item strike-ball-challenge (0.8808ms)
✔ item tangerine-peel-puzzle (0.8853ms)
✔ item thin-ice-puddle (1.2693ms)
✔ item times-tables-speedrun (0.8564ms)
✔ item trend-lifespan-fortune (0.8917ms)
✔ item twin-anmin (4.9894ms)
✔ item twin-daewon (5.5811ms)
✔ item winter-fireside-radio (1.1685ms)
✔ item winter-laundry-puzzle (0.8282ms)
✔ item winter-shadow-lab (0.7897ms)
✔ item winter-snack-ladder (0.9036ms)
✔ item winter-star-connect (0.9692ms)
✔ item world-time-planner (0.9423ms)
✔ item year-end-date-picker (0.8227ms)
✔ item year-end-receipt (1.0907ms)
(node:18872) ExperimentalWarning: SQLite is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
✔ voter ids are stable, per item, and hide the IP (6.8318ms)
✔ like, switch, withdraw and repeat votes (2.2511ms)
✔ counts and top list (1.9435ms)
ℹ tests 70
ℹ suites 0
ℹ pass 69
ℹ fail 1
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 168.6879

✖ failing tests:

test at test\items.test.mjs:15:3
✖ item pension-tax-credit-2026 (0.7909ms)
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
