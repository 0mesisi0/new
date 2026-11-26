# Build failed

2026-11-26T18:29:02.416Z

```
npm test failed:
em bubble-wrap-popper (1.0715ms)
✔ item bungeoppang-budget (1.0979ms)
✔ item cat-vs-keyboard (1.0242ms)
✔ item chicken-leg-war (0.9772ms)
✔ item christmas-cake-price-compare (0.9408ms)
✔ item christmas-cake-slices (0.9914ms)
✔ item christmas-long-weekend (1.0792ms)
✔ item clock-out (1.1007ms)
✔ item crank-carol-music-box (1.0075ms)
✔ item csat-after-plans (0.855ms)
✔ item dns-address-trace (1.2489ms)
✔ item dongji-dumpling-puzzle (0.9703ms)
✔ item draft-detective (1.1402ms)
✔ item elevator-awkward (0.9917ms)
✔ item fish-cake-cart-asmr (0.8652ms)
✔ item gift-wrap-sprint (0.81ms)
✔ item holiday-gift-swap-prompts (0.8242ms)
✔ item hoppang-fortune (0.9896ms)
✔ item hotteok-flip (0.946ms)
✔ item ice-fishing (0.9197ms)
✔ item kimbap-roll-timing (0.8419ms)
✔ item knit-sweater-depiller (0.9097ms)
✔ item lost-glove-bureau (0.8849ms)
✔ item midnight-snack-mission (0.9097ms)
✔ item migratory-bird-formation (0.86ms)
✔ item mini-curling (0.8421ms)
✔ item monday-alarm (1.1974ms)
✔ item new-year-countdown-clock (1.0933ms)
✔ item odd-bus-arrivals (0.8818ms)
✔ item ondol-pipe-puzzle (0.8302ms)
✔ item overseas-shopping-cost-calculator (0.8584ms)
✔ item paper-smoother (1.3793ms)
✖ item pension-tax-credit-2026 (0.8104ms)
✔ item pocket-hand-warmer (0.8086ms)
✔ item popup-pileup (0.8104ms)
✔ item puffer-zip (0.831ms)
✔ item ramen-wait (0.8417ms)
✔ item regex-playground (1.0025ms)
✔ item roast-sweet-potato (1.0117ms)
✔ item sauna-towel-hat-studio (0.801ms)
✔ item scarf-untangler (0.7634ms)
✔ item sheep-roundup-2027 (0.915ms)
✔ item snow-duck-maker (0.988ms)
✔ item snowflake-to-universe (1.2321ms)
✔ item snowplow-puzzle (0.7884ms)
✔ item snowprint-puzzle (0.9323ms)
✔ item space-out-challenge (0.9124ms)
✔ item stacked-discount-calculator (0.7655ms)
✔ item strike-ball-challenge (0.9016ms)
✔ item tangerine-peel-puzzle (0.846ms)
✔ item thin-ice-puddle (1.2398ms)
✔ item times-tables-speedrun (0.8535ms)
✔ item trend-lifespan-fortune (0.9011ms)
✔ item twin-anmin (4.8889ms)
✔ item twin-daewon (5.8257ms)
✔ item winter-fireside-radio (1.0204ms)
✔ item winter-laundry-puzzle (0.8442ms)
✔ item winter-shadow-lab (0.7628ms)
✔ item winter-snack-ladder (0.9021ms)
✔ item winter-star-connect (0.9659ms)
✔ item world-time-planner (1.0096ms)
✔ item year-end-date-picker (0.8084ms)
✔ item year-end-receipt (1.1378ms)
(node:19740) ExperimentalWarning: SQLite is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
✔ voter ids are stable, per item, and hide the IP (6.2858ms)
✔ like, switch, withdraw and repeat votes (2.1926ms)
✔ counts and top list (1.9805ms)
ℹ tests 70
ℹ suites 0
ℹ pass 69
ℹ fail 1
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 168.1416

✖ failing tests:

test at test\items.test.mjs:15:3
✖ item pension-tax-credit-2026 (0.8104ms)
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
