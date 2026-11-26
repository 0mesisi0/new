# Build failed

2026-11-26T23:55:36.580Z

```
npm test failed:
e-wrap-popper (1.8188ms)
✔ item bungeoppang-budget (2.0521ms)
✔ item cat-vs-keyboard (1.7587ms)
✔ item chicken-leg-war (1.68ms)
✔ item christmas-cake-price-compare (1.6287ms)
✔ item christmas-cake-slices (1.6419ms)
✔ item christmas-long-weekend (1.6027ms)
✔ item clock-out (1.5817ms)
✔ item crank-carol-music-box (1.5098ms)
✔ item csat-after-plans (1.3049ms)
✔ item dns-address-trace (1.673ms)
✔ item dongji-dumpling-puzzle (1.2296ms)
✔ item draft-detective (1.1672ms)
✔ item elevator-awkward (1.2583ms)
✔ item fish-cake-cart-asmr (1.2532ms)
✔ item gift-wrap-sprint (1.1299ms)
✔ item holiday-gift-swap-prompts (1.1537ms)
✔ item hoppang-fortune (1.3191ms)
✔ item hotteok-flip (1.4086ms)
✔ item icicle-chimes (0.8801ms)
✔ item kimbap-roll-timing (1.2575ms)
✔ item knit-sweater-depiller (1.2418ms)
✔ item lost-glove-bureau (1.2737ms)
✔ item midnight-snack-mission (1.5421ms)
✔ item migratory-bird-formation (1.4143ms)
✔ item mini-curling (1.3235ms)
✔ item monday-alarm (1.3965ms)
✔ item new-year-countdown-clock (1.3832ms)
✔ item odd-bus-arrivals (1.4603ms)
✔ item ondol-pipe-puzzle (1.5121ms)
✔ item overseas-shopping-cost-calculator (1.4081ms)
✔ item paper-smoother (1.7115ms)
✖ item pension-tax-credit-2026 (0.8042ms)
✔ item pocket-hand-warmer (1.3515ms)
✔ item popup-pileup (1.319ms)
✔ item puffer-zip (1.2354ms)
✔ item ramen-wait (1.1987ms)
✔ item regex-playground (1.6308ms)
✔ item roast-sweet-potato (1.4966ms)
✔ item sauna-towel-hat-studio (1.2275ms)
✔ item scarf-untangler (1.2206ms)
✔ item sheep-roundup-2027 (1.352ms)
✔ item snow-duck-maker (1.2775ms)
✔ item snowflake-to-universe (1.6202ms)
✔ item snowplow-puzzle (1.3468ms)
✔ item snowprint-puzzle (1.5055ms)
✔ item space-out-challenge (1.3313ms)
✔ item stacked-discount-calculator (1.2361ms)
✔ item strike-ball-challenge (1.5124ms)
✔ item tangerine-peel-puzzle (1.3333ms)
✔ item thin-ice-puddle (1.7776ms)
✔ item times-tables-speedrun (1.1733ms)
✔ item trend-lifespan-fortune (1.3293ms)
✔ item twin-anmin (5.6293ms)
✔ item twin-daewon (6.0358ms)
✔ item winter-fireside-radio (1.8958ms)
✔ item winter-laundry-puzzle (1.3911ms)
✔ item winter-shadow-lab (1.2415ms)
✔ item winter-snack-ladder (1.5738ms)
✔ item winter-star-connect (1.4668ms)
✔ item world-time-planner (1.4953ms)
✔ item year-end-date-picker (1.3418ms)
✔ item year-end-receipt (1.7926ms)
(node:26728) ExperimentalWarning: SQLite is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
✔ voter ids are stable, per item, and hide the IP (5.7032ms)
✔ like, switch, withdraw and repeat votes (2.5857ms)
✔ counts and top list (2.1769ms)
ℹ tests 70
ℹ suites 0
ℹ pass 69
ℹ fail 1
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 200.5346

✖ failing tests:

test at test\items.test.mjs:15:3
✖ item pension-tax-credit-2026 (0.8042ms)
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
