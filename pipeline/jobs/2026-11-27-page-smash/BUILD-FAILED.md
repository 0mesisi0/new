# Build failed

2026-11-27T00:14:06.860Z

```
npm test failed:
em bubble-wrap-popper (1.2316ms)
✔ item bungeoppang-budget (1.1444ms)
✔ item cat-vs-keyboard (1.0278ms)
✔ item chicken-leg-war (1.0079ms)
✔ item christmas-cake-price-compare (0.9418ms)
✔ item christmas-cake-slices (0.9611ms)
✔ item christmas-long-weekend (1.0764ms)
✔ item clock-out (1.0972ms)
✔ item crank-carol-music-box (1.0529ms)
✔ item csat-after-plans (0.8372ms)
✔ item dns-address-trace (1.4427ms)
✔ item dongji-dumpling-puzzle (0.896ms)
✔ item draft-detective (0.8604ms)
✔ item elevator-awkward (0.9169ms)
✔ item fish-cake-cart-asmr (0.9878ms)
✔ item gift-wrap-sprint (0.9856ms)
✔ item holiday-gift-swap-prompts (0.8107ms)
✔ item hoppang-fortune (0.9755ms)
✔ item hotteok-flip (0.9216ms)
✔ item kimbap-roll-timing (0.7939ms)
✔ item knit-sweater-depiller (0.8278ms)
✔ item lost-glove-bureau (0.8147ms)
✔ item midnight-snack-mission (0.9518ms)
✔ item migratory-bird-formation (0.8548ms)
✔ item mini-curling (0.8ms)
✔ item monday-alarm (0.8998ms)
✔ item new-year-countdown-clock (0.9143ms)
✔ item odd-bus-arrivals (0.8462ms)
✔ item ondol-pipe-puzzle (0.8743ms)
✔ item overseas-shopping-cost-calculator (0.839ms)
✔ item page-smash (0.9142ms)
✔ item paper-smoother (1.4855ms)
✖ item pension-tax-credit-2026 (0.8218ms)
✔ item pocket-hand-warmer (0.797ms)
✔ item popup-pileup (0.7931ms)
✔ item puffer-zip (0.7968ms)
✔ item ramen-wait (0.8253ms)
✔ item regex-playground (0.9909ms)
✔ item roast-sweet-potato (0.9793ms)
✔ item sauna-towel-hat-studio (0.7914ms)
✔ item scarf-untangler (0.7495ms)
✔ item sheep-roundup-2027 (0.8819ms)
✔ item snow-duck-maker (0.8738ms)
✔ item snowflake-to-universe (1.0274ms)
✔ item snowplow-puzzle (0.804ms)
✔ item snowprint-puzzle (0.9283ms)
✔ item space-out-challenge (0.9012ms)
✔ item stacked-discount-calculator (0.7293ms)
✔ item strike-ball-challenge (0.8823ms)
✔ item tangerine-peel-puzzle (1.1184ms)
✔ item thin-ice-puddle (1.2ms)
✔ item times-tables-speedrun (0.8048ms)
✔ item trend-lifespan-fortune (0.8903ms)
✔ item twin-anmin (4.9255ms)
✔ item twin-daewon (5.3012ms)
✔ item winter-fireside-radio (0.9908ms)
✔ item winter-laundry-puzzle (0.8403ms)
✔ item winter-shadow-lab (1.0261ms)
✔ item winter-snack-ladder (0.9296ms)
✔ item winter-star-connect (0.9688ms)
✔ item world-time-planner (0.9817ms)
✔ item year-end-date-picker (0.7931ms)
✔ item year-end-receipt (1.1417ms)
(node:43380) ExperimentalWarning: SQLite is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
✔ voter ids are stable, per item, and hide the IP (5.7104ms)
✔ like, switch, withdraw and repeat votes (2.2367ms)
✔ counts and top list (2.0569ms)
ℹ tests 70
ℹ suites 0
ℹ pass 69
ℹ fail 1
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 167.5263

✖ failing tests:

test at test\items.test.mjs:15:3
✖ item pension-tax-credit-2026 (0.8218ms)
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
