# Build failed

2026-11-26T23:18:00.472Z

```
npm test failed:
bble-wrap-popper (1.0735ms)
✔ item bungeoppang-budget (1.064ms)
✔ item cat-vs-keyboard (1.032ms)
✔ item chicken-leg-war (1.0494ms)
✔ item christmas-cake-price-compare (0.97ms)
✔ item christmas-cake-slices (0.9771ms)
✔ item christmas-long-weekend (1.1443ms)
✔ item clock-out (1.1626ms)
✔ item crank-carol-music-box (1.0405ms)
✔ item csat-after-plans (0.8338ms)
✔ item dns-address-trace (1.5474ms)
✔ item dongji-dumpling-puzzle (0.9744ms)
✔ item draft-detective (0.8201ms)
✔ item elevator-awkward (0.9306ms)
✔ item fish-cake-cart-asmr (0.9172ms)
✔ item gift-wrap-sprint (0.8027ms)
✔ item holiday-gift-swap-prompts (0.805ms)
✔ item hoppang-fortune (0.9881ms)
✔ item hotteok-flip (0.9236ms)
✔ item kimbap-roll-timing (0.8277ms)
✔ item knit-sweater-depiller (0.894ms)
✔ item lost-glove-bureau (0.8315ms)
✔ item midnight-snack-mission (0.9567ms)
✔ item migratory-bird-formation (0.8649ms)
✔ item mini-curling (0.8235ms)
✔ item monday-alarm (0.9234ms)
✔ item new-year-countdown-clock (0.9504ms)
✔ item odd-bus-arrivals (1.0154ms)
✔ item ondol-pipe-puzzle (1.0396ms)
✔ item overseas-shopping-cost-calculator (0.8792ms)
✔ item paper-smoother (0.9194ms)
✖ item pension-tax-credit-2026 (0.8154ms)
✔ item pocket-hand-warmer (1.1427ms)
✔ item popup-pileup (0.8194ms)
✔ item puffer-zip (0.843ms)
✔ item ramen-wait (0.8767ms)
✔ item regex-playground (0.9906ms)
✔ item roast-sweet-potato (0.958ms)
✔ item sauna-towel-hat-studio (0.8662ms)
✔ item scarf-untangler (0.8419ms)
✔ item sheep-roundup-2027 (0.9024ms)
✔ item snow-duck-maker (0.9114ms)
✔ item snowflake-to-universe (1.0125ms)
✔ item snowplow-puzzle (0.7547ms)
✔ item snowprint-puzzle (1.1376ms)
✔ item solar-terms-wheel (0.9464ms)
✔ item space-out-challenge (0.9374ms)
✔ item stacked-discount-calculator (0.7305ms)
✔ item strike-ball-challenge (0.9175ms)
✔ item tangerine-peel-puzzle (0.8554ms)
✔ item thin-ice-puddle (0.8751ms)
✔ item times-tables-speedrun (0.7835ms)
✔ item trend-lifespan-fortune (1.2972ms)
✔ item twin-anmin (4.89ms)
✔ item twin-daewon (5.462ms)
✔ item winter-fireside-radio (1.005ms)
✔ item winter-laundry-puzzle (0.8261ms)
✔ item winter-shadow-lab (0.7673ms)
✔ item winter-snack-ladder (0.9039ms)
✔ item winter-star-connect (0.9709ms)
✔ item world-time-planner (0.9361ms)
✔ item year-end-date-picker (0.8097ms)
✔ item year-end-receipt (1.0946ms)
(node:42980) ExperimentalWarning: SQLite is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
✔ voter ids are stable, per item, and hide the IP (5.8453ms)
✔ like, switch, withdraw and repeat votes (2.2566ms)
✔ counts and top list (2.2073ms)
ℹ tests 70
ℹ suites 0
ℹ pass 69
ℹ fail 1
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 167.2987

✖ failing tests:

test at test\items.test.mjs:15:3
✖ item pension-tax-credit-2026 (0.8154ms)
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
