# Build failed

2026-11-26T18:21:56.733Z

```
npm test failed:
ap-popper (1.1107ms)
✔ item bungeoppang-budget (1.0931ms)
✔ item cat-vs-keyboard (1.2549ms)
✔ item chicken-leg-war (1.5175ms)
✔ item christmas-cake-price-compare (0.9885ms)
✔ item christmas-cake-slices (0.9648ms)
✔ item christmas-long-weekend (1.0658ms)
✔ item clock-out (1.1181ms)
✔ item crank-carol-music-box (0.9859ms)
✔ item csat-after-plans (0.8369ms)
✔ item dns-address-trace (1.3213ms)
✔ item dongji-dumpling-puzzle (0.9606ms)
✔ item draft-detective (0.8085ms)
✔ item elevator-awkward (0.9198ms)
✔ item fish-cake-cart-asmr (0.8252ms)
✔ item gift-wrap-sprint (0.7758ms)
✔ item heater-electric-bill (0.7978ms)
✔ item holiday-gift-swap-prompts (0.8013ms)
✔ item hoppang-fortune (0.9817ms)
✔ item hotteok-flip (0.9231ms)
✔ item kimbap-roll-timing (0.8111ms)
✔ item knit-sweater-depiller (0.9025ms)
✔ item lost-glove-bureau (0.8687ms)
✔ item midnight-snack-mission (0.8812ms)
✔ item migratory-bird-formation (0.8344ms)
✔ item mini-curling (0.8244ms)
✔ item monday-alarm (0.9652ms)
✔ item new-year-countdown-clock (0.8197ms)
✔ item odd-bus-arrivals (0.7998ms)
✔ item ondol-pipe-puzzle (0.8415ms)
✔ item overseas-shopping-cost-calculator (0.7991ms)
✔ item paper-smoother (1.2052ms)
✖ item pension-tax-credit-2026 (0.777ms)
✔ item pocket-hand-warmer (0.8179ms)
✔ item popup-pileup (0.7849ms)
✔ item puffer-zip (0.9479ms)
✔ item ramen-wait (0.8332ms)
✔ item regex-playground (0.9979ms)
✔ item roast-sweet-potato (0.992ms)
✔ item sauna-towel-hat-studio (0.7902ms)
✔ item scarf-untangler (0.764ms)
✔ item sheep-roundup-2027 (0.8912ms)
✔ item snow-duck-maker (0.866ms)
✔ item snowflake-to-universe (0.9841ms)
✔ item snowplow-puzzle (0.7559ms)
✔ item snowprint-puzzle (0.9181ms)
✔ item space-out-challenge (0.9028ms)
✔ item stacked-discount-calculator (0.8049ms)
✔ item strike-ball-challenge (0.8899ms)
✔ item tangerine-peel-puzzle (0.8586ms)
✔ item thin-ice-puddle (1.2827ms)
✔ item times-tables-speedrun (0.8637ms)
✔ item trend-lifespan-fortune (1.0255ms)
✔ item twin-anmin (5.0349ms)
✔ item twin-daewon (5.3589ms)
✔ item winter-fireside-radio (1.057ms)
✔ item winter-laundry-puzzle (0.8765ms)
✔ item winter-shadow-lab (0.7722ms)
✔ item winter-snack-ladder (0.907ms)
✔ item winter-star-connect (1.2563ms)
✔ item world-time-planner (1.0354ms)
✔ item year-end-date-picker (0.8153ms)
✔ item year-end-receipt (1.1133ms)
(node:13468) ExperimentalWarning: SQLite is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
✔ voter ids are stable, per item, and hide the IP (5.854ms)
✔ like, switch, withdraw and repeat votes (2.2525ms)
✔ counts and top list (2.5525ms)
ℹ tests 70
ℹ suites 0
ℹ pass 69
ℹ fail 1
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 167.4352

✖ failing tests:

test at test\items.test.mjs:15:3
✖ item pension-tax-credit-2026 (0.777ms)
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
