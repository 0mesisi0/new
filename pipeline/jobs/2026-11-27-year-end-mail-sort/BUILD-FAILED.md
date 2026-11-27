# Build failed

2026-11-27T04:17:09.174Z

```
npm test failed:
-popper (1.1705ms)
✔ item bungeoppang-budget (1.1368ms)
✔ item cat-vs-keyboard (1.079ms)
✔ item chicken-leg-war (1.1121ms)
✔ item christmas-cake-price-compare (1.1352ms)
✔ item christmas-cake-slices (1.0466ms)
✔ item christmas-long-weekend (1.1755ms)
✔ item clock-out (1.1225ms)
✔ item crank-carol-music-box (1.1326ms)
✔ item csat-after-plans (1.0195ms)
✔ item dns-address-trace (1.3533ms)
✔ item dongji-dumpling-puzzle (0.9679ms)
✔ item draft-detective (0.8712ms)
✔ item elevator-awkward (0.9461ms)
✔ item fish-cake-cart-asmr (0.8792ms)
✔ item gift-wrap-sprint (0.8236ms)
✔ item holiday-gift-swap-prompts (0.8934ms)
✔ item hoppang-fortune (1.1368ms)
✔ item hotteok-flip (1.0826ms)
✔ item kimbap-roll-timing (0.8925ms)
✔ item knit-sweater-depiller (0.9765ms)
✔ item lost-glove-bureau (0.9069ms)
✔ item midnight-snack-mission (0.9911ms)
✔ item migratory-bird-formation (0.9025ms)
✔ item mini-curling (0.8441ms)
✔ item monday-alarm (0.9497ms)
✔ item new-year-countdown-clock (0.9659ms)
✔ item odd-bus-arrivals (0.8553ms)
✔ item ondol-pipe-puzzle (0.9557ms)
✔ item overseas-shopping-cost-calculator (0.9554ms)
✔ item paper-smoother (1.1252ms)
✖ item pension-tax-credit-2026 (0.8686ms)
✔ item pocket-hand-warmer (1.1861ms)
✔ item popup-pileup (0.839ms)
✔ item puffer-zip (0.8548ms)
✔ item ramen-wait (0.8897ms)
✔ item regex-playground (1.0471ms)
✔ item roast-sweet-potato (1.0053ms)
✔ item sauna-towel-hat-studio (0.8666ms)
✔ item scarf-untangler (0.8127ms)
✔ item sheep-roundup-2027 (0.9572ms)
✔ item snow-duck-maker (0.9094ms)
✔ item snowflake-to-universe (1.0751ms)
✔ item snowplow-puzzle (0.9044ms)
✔ item snowprint-puzzle (0.8584ms)
✔ item space-out-challenge (1.1418ms)
✔ item stacked-discount-calculator (0.7781ms)
✔ item strike-ball-challenge (0.9914ms)
✔ item tangerine-peel-puzzle (0.8628ms)
✔ item thin-ice-puddle (1.0801ms)
✔ item times-tables-speedrun (0.9459ms)
✔ item trend-lifespan-fortune (0.9802ms)
✔ item twin-anmin (5.2231ms)
✔ item twin-daewon (5.7896ms)
✔ item winter-fireside-radio (1.1265ms)
✔ item winter-laundry-puzzle (1.0876ms)
✔ item winter-shadow-lab (0.9385ms)
✔ item winter-snack-ladder (1.1518ms)
✔ item winter-star-connect (1.1332ms)
✔ item world-time-planner (1.2413ms)
✔ item year-end-date-picker (1.015ms)
✔ item year-end-mail-sort (0.8756ms)
✔ item year-end-receipt (1.2151ms)
(node:17652) ExperimentalWarning: SQLite is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
✔ voter ids are stable, per item, and hide the IP (6.0846ms)
✔ like, switch, withdraw and repeat votes (2.275ms)
✔ counts and top list (2.2249ms)
ℹ tests 70
ℹ suites 0
ℹ pass 69
ℹ fail 1
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 175.6629

✖ failing tests:

test at test\items.test.mjs:15:3
✖ item pension-tax-credit-2026 (0.8686ms)
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
