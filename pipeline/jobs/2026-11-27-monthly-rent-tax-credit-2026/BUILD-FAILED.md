# Build failed

2026-11-27T05:10:23.636Z

```
npm test failed:
per (1.3285ms)
✔ item bungeoppang-budget (1.0904ms)
✔ item cat-vs-keyboard (1.0149ms)
✔ item chicken-leg-war (0.9599ms)
✔ item christmas-cake-price-compare (0.972ms)
✔ item christmas-cake-slices (0.9495ms)
✔ item christmas-long-weekend (1.0571ms)
✔ item clock-out (1.1114ms)
✔ item crank-carol-music-box (0.984ms)
✔ item csat-after-plans (0.8285ms)
✔ item dns-address-trace (1.4087ms)
✔ item dongji-dumpling-puzzle (0.9295ms)
✔ item draft-detective (0.8218ms)
✔ item elevator-awkward (0.9072ms)
✔ item fish-cake-cart-asmr (0.8158ms)
✔ item gift-wrap-sprint (0.8344ms)
✔ item holiday-gift-swap-prompts (0.8028ms)
✔ item hoppang-fortune (0.9723ms)
✔ item hotteok-flip (0.929ms)
✔ item kimbap-roll-timing (0.8075ms)
✔ item knit-sweater-depiller (0.8465ms)
✔ item lost-glove-bureau (0.82ms)
✔ item midnight-snack-mission (0.9494ms)
✔ item migratory-bird-formation (0.8251ms)
✔ item mini-curling (0.8322ms)
✔ item monday-alarm (0.8961ms)
✔ item monthly-rent-tax-credit-2026 (0.9705ms)
✔ item new-year-countdown-clock (0.8242ms)
✔ item odd-bus-arrivals (0.874ms)
✔ item ondol-pipe-puzzle (0.8066ms)
✔ item overseas-shopping-cost-calculator (0.8004ms)
✔ item paper-smoother (1.2507ms)
✖ item pension-tax-credit-2026 (0.8037ms)
✔ item pocket-hand-warmer (0.8067ms)
✔ item popup-pileup (0.7833ms)
✔ item puffer-zip (0.8092ms)
✔ item ramen-wait (0.843ms)
✔ item regex-playground (1.0019ms)
✔ item roast-sweet-potato (0.9927ms)
✔ item sauna-towel-hat-studio (0.8219ms)
✔ item scarf-untangler (0.7567ms)
✔ item sheep-roundup-2027 (0.8878ms)
✔ item snow-duck-maker (0.8702ms)
✔ item snowflake-to-universe (1.0093ms)
✔ item snowplow-puzzle (0.7838ms)
✔ item snowprint-puzzle (0.9207ms)
✔ item space-out-challenge (0.8986ms)
✔ item stacked-discount-calculator (0.7331ms)
✔ item strike-ball-challenge (0.8819ms)
✔ item tangerine-peel-puzzle (0.8571ms)
✔ item thin-ice-puddle (1.3832ms)
✔ item times-tables-speedrun (0.806ms)
✔ item trend-lifespan-fortune (0.9073ms)
✔ item twin-anmin (4.8937ms)
✔ item twin-daewon (5.4576ms)
✔ item winter-fireside-radio (1.0137ms)
✔ item winter-laundry-puzzle (0.831ms)
✔ item winter-shadow-lab (0.7428ms)
✔ item winter-snack-ladder (0.926ms)
✔ item winter-star-connect (0.9506ms)
✔ item world-time-planner (0.9254ms)
✔ item year-end-date-picker (0.7919ms)
✔ item year-end-receipt (1.0898ms)
(node:40848) ExperimentalWarning: SQLite is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
✔ voter ids are stable, per item, and hide the IP (5.5736ms)
✔ like, switch, withdraw and repeat votes (2.4997ms)
✔ counts and top list (2.0918ms)
ℹ tests 70
ℹ suites 0
ℹ pass 69
ℹ fail 1
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 165.3614

✖ failing tests:

test at test\items.test.mjs:15:3
✖ item pension-tax-credit-2026 (0.8037ms)
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
