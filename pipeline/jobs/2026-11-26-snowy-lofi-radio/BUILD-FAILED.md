# Build failed

2026-11-26T18:50:50.663Z

```
npm test failed:
-wrap-popper (1.194ms)
✔ item bungeoppang-budget (1.1732ms)
✔ item cat-vs-keyboard (1.1704ms)
✔ item chicken-leg-war (1.2087ms)
✔ item christmas-cake-price-compare (1.2216ms)
✔ item christmas-cake-slices (1.1853ms)
✔ item christmas-long-weekend (1.1972ms)
✔ item clock-out (1.2462ms)
✔ item crank-carol-music-box (1.1065ms)
✔ item csat-after-plans (0.8729ms)
✔ item dns-address-trace (1.3887ms)
✔ item dongji-dumpling-puzzle (0.9235ms)
✔ item draft-detective (0.9014ms)
✔ item elevator-awkward (0.9989ms)
✔ item fish-cake-cart-asmr (0.8817ms)
✔ item gift-wrap-sprint (0.8415ms)
✔ item holiday-gift-swap-prompts (0.8632ms)
✔ item hoppang-fortune (1.0857ms)
✔ item hotteok-flip (1.0076ms)
✔ item kimbap-roll-timing (0.8892ms)
✔ item knit-sweater-depiller (0.9858ms)
✔ item lost-glove-bureau (0.9137ms)
✔ item midnight-snack-mission (0.9842ms)
✔ item migratory-bird-formation (0.9246ms)
✔ item mini-curling (0.9506ms)
✔ item monday-alarm (0.9888ms)
✔ item new-year-countdown-clock (0.9716ms)
✔ item odd-bus-arrivals (0.8705ms)
✔ item ondol-pipe-puzzle (0.9373ms)
✔ item overseas-shopping-cost-calculator (0.8876ms)
✔ item paper-smoother (0.9603ms)
✖ item pension-tax-credit-2026 (0.8729ms)
✔ item pocket-hand-warmer (1.2446ms)
✔ item popup-pileup (0.882ms)
✔ item puffer-zip (1.0434ms)
✔ item ramen-wait (0.953ms)
✔ item regex-playground (1.086ms)
✔ item roast-sweet-potato (0.9954ms)
✔ item sauna-towel-hat-studio (0.959ms)
✔ item scarf-untangler (0.8588ms)
✔ item sheep-roundup-2027 (1.0362ms)
✔ item snow-duck-maker (0.9364ms)
✔ item snowflake-to-universe (1.085ms)
✔ item snowplow-puzzle (0.8752ms)
✔ item snowprint-puzzle (0.8961ms)
✔ item snowy-lofi-radio (1.0548ms)
✔ item space-out-challenge (0.9747ms)
✔ item stacked-discount-calculator (0.7972ms)
✔ item strike-ball-challenge (0.9802ms)
✔ item tangerine-peel-puzzle (0.9016ms)
✔ item thin-ice-puddle (1.0184ms)
✔ item times-tables-speedrun (0.9114ms)
✔ item trend-lifespan-fortune (1.2816ms)
✔ item twin-anmin (5.1393ms)
✔ item twin-daewon (5.7551ms)
✔ item winter-fireside-radio (1.0975ms)
✔ item winter-laundry-puzzle (0.9974ms)
✔ item winter-shadow-lab (0.8431ms)
✔ item winter-snack-ladder (1.0173ms)
✔ item winter-star-connect (1.0697ms)
✔ item world-time-planner (1.0496ms)
✔ item year-end-date-picker (0.863ms)
✔ item year-end-receipt (1.2072ms)
(node:41564) ExperimentalWarning: SQLite is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
✔ voter ids are stable, per item, and hide the IP (6.0382ms)
✔ like, switch, withdraw and repeat votes (2.2909ms)
✔ counts and top list (2.0844ms)
ℹ tests 70
ℹ suites 0
ℹ pass 69
ℹ fail 1
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 178.4321

✖ failing tests:

test at test\items.test.mjs:15:3
✖ item pension-tax-credit-2026 (0.8729ms)
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
