# Build failed

2026-11-26T23:48:49.461Z

```
npm test failed:
e-wrap-popper (1.9591ms)
✔ item bungeoppang-budget (2.0901ms)
✔ item cat-vs-keyboard (1.9214ms)
✔ item chicken-leg-war (1.8973ms)
✔ item christmas-cake-price-compare (2.057ms)
✔ item christmas-cake-slices (1.8475ms)
✔ item christmas-long-weekend (1.819ms)
✔ item clock-out (1.783ms)
✔ item crank-carol-music-box (1.7192ms)
✔ item csat-after-plans (1.7189ms)
✔ item dns-address-trace (2.0515ms)
✔ item dongji-dumpling-puzzle (1.5684ms)
✔ item draft-detective (1.5297ms)
✔ item elevator-awkward (1.7875ms)
✔ item fish-cake-cart-asmr (1.5511ms)
✔ item garaetteok-slicer (0.7784ms)
✔ item gift-wrap-sprint (1.6458ms)
✔ item holiday-gift-swap-prompts (1.478ms)
✔ item hoppang-fortune (1.6313ms)
✔ item hotteok-flip (1.6851ms)
✔ item kimbap-roll-timing (1.1325ms)
✔ item knit-sweater-depiller (1.5927ms)
✔ item lost-glove-bureau (1.511ms)
✔ item midnight-snack-mission (1.6455ms)
✔ item migratory-bird-formation (1.7118ms)
✔ item mini-curling (1.6853ms)
✔ item monday-alarm (1.7576ms)
✔ item new-year-countdown-clock (1.6225ms)
✔ item odd-bus-arrivals (1.5448ms)
✔ item ondol-pipe-puzzle (1.4683ms)
✔ item overseas-shopping-cost-calculator (1.5103ms)
✔ item paper-smoother (1.898ms)
✖ item pension-tax-credit-2026 (1.2252ms)
✔ item pocket-hand-warmer (1.6918ms)
✔ item popup-pileup (1.6591ms)
✔ item puffer-zip (1.698ms)
✔ item ramen-wait (1.5238ms)
✔ item regex-playground (1.7656ms)
✔ item roast-sweet-potato (1.7601ms)
✔ item sauna-towel-hat-studio (1.8395ms)
✔ item scarf-untangler (1.6176ms)
✔ item sheep-roundup-2027 (1.7393ms)
✔ item snow-duck-maker (1.7042ms)
✔ item snowflake-to-universe (2.3027ms)
✔ item snowplow-puzzle (1.6392ms)
✔ item snowprint-puzzle (1.6937ms)
✔ item space-out-challenge (1.7407ms)
✔ item stacked-discount-calculator (1.4176ms)
✔ item strike-ball-challenge (1.6942ms)
✔ item tangerine-peel-puzzle (1.5952ms)
✔ item thin-ice-puddle (1.8331ms)
✔ item times-tables-speedrun (1.7971ms)
✔ item trend-lifespan-fortune (1.9389ms)
✔ item twin-anmin (5.7326ms)
✔ item twin-daewon (6.4098ms)
✔ item winter-fireside-radio (2.095ms)
✔ item winter-laundry-puzzle (1.6243ms)
✔ item winter-shadow-lab (1.4411ms)
✔ item winter-snack-ladder (1.6718ms)
✔ item winter-star-connect (1.7461ms)
✔ item world-time-planner (1.7326ms)
✔ item year-end-date-picker (1.5114ms)
✔ item year-end-receipt (1.8233ms)
(node:9272) ExperimentalWarning: SQLite is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
✔ voter ids are stable, per item, and hide the IP (6.0845ms)
✔ like, switch, withdraw and repeat votes (2.2107ms)
✔ counts and top list (2.0653ms)
ℹ tests 70
ℹ suites 0
ℹ pass 69
ℹ fail 1
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 220.5032

✖ failing tests:

test at test\items.test.mjs:15:3
✖ item pension-tax-credit-2026 (1.2252ms)
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
