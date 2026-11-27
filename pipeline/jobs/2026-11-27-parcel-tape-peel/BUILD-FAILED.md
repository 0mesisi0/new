# Build failed

2026-11-27T10:21:48.602Z

```
npm test failed:
le-wrap-popper (1.1111ms)
✔ item bungeoppang-budget (1.1133ms)
✔ item cat-vs-keyboard (1.1272ms)
✔ item chicken-leg-war (1.0058ms)
✔ item christmas-cake-price-compare (0.9599ms)
✔ item christmas-cake-slices (0.9711ms)
✔ item christmas-long-weekend (1.2024ms)
✔ item clock-out (1.081ms)
✔ item crank-carol-music-box (0.9973ms)
✔ item csat-after-plans (0.8414ms)
✔ item dns-address-trace (1.3275ms)
✔ item dongji-dumpling-puzzle (0.9046ms)
✔ item draft-detective (0.8337ms)
✔ item elevator-awkward (0.928ms)
✔ item fish-cake-cart-asmr (0.8228ms)
✔ item gift-wrap-sprint (0.7948ms)
✔ item holiday-gift-swap-prompts (0.8208ms)
✔ item hoppang-fortune (0.9554ms)
✔ item hotteok-flip (0.9363ms)
✔ item kimbap-roll-timing (0.801ms)
✔ item knit-sweater-depiller (0.8476ms)
✔ item lost-glove-bureau (0.8209ms)
✔ item midnight-snack-mission (1.0912ms)
✔ item migratory-bird-formation (1.0067ms)
✔ item mini-curling (0.8125ms)
✔ item monday-alarm (0.8861ms)
✔ item new-year-countdown-clock (0.9045ms)
✔ item odd-bus-arrivals (0.7741ms)
✔ item ondol-pipe-puzzle (0.8192ms)
✔ item overseas-shopping-cost-calculator (0.8578ms)
✔ item paper-smoother (0.9361ms)
✔ item parcel-tape-peel (1.435ms)
✖ item pension-tax-credit-2026 (0.8402ms)
✔ item pocket-hand-warmer (0.7976ms)
✔ item popup-pileup (0.7934ms)
✔ item puffer-zip (0.7823ms)
✔ item ramen-wait (0.8269ms)
✔ item regex-playground (0.9914ms)
✔ item roast-sweet-potato (1.2469ms)
✔ item sauna-towel-hat-studio (0.9899ms)
✔ item scarf-untangler (0.8214ms)
✔ item sheep-roundup-2027 (0.912ms)
✔ item snow-duck-maker (0.8839ms)
✔ item snowflake-to-universe (0.9994ms)
✔ item snowplow-puzzle (0.7567ms)
✔ item snowprint-puzzle (0.9308ms)
✔ item space-out-challenge (0.9232ms)
✔ item stacked-discount-calculator (0.7356ms)
✔ item strike-ball-challenge (0.8945ms)
✔ item tangerine-peel-puzzle (0.8365ms)
✔ item thin-ice-puddle (1.1ms)
✔ item times-tables-speedrun (0.7773ms)
✔ item trend-lifespan-fortune (0.8907ms)
✔ item twin-anmin (4.9078ms)
✔ item twin-daewon (5.4756ms)
✔ item winter-fireside-radio (0.9929ms)
✔ item winter-laundry-puzzle (0.8229ms)
✔ item winter-shadow-lab (0.7604ms)
✔ item winter-snack-ladder (0.8963ms)
✔ item winter-star-connect (0.9603ms)
✔ item world-time-planner (0.959ms)
✔ item year-end-date-picker (0.8079ms)
✔ item year-end-receipt (1.0989ms)
(node:15572) ExperimentalWarning: SQLite is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
✔ voter ids are stable, per item, and hide the IP (5.8848ms)
✔ like, switch, withdraw and repeat votes (2.2179ms)
✔ counts and top list (2.1056ms)
ℹ tests 70
ℹ suites 0
ℹ pass 69
ℹ fail 1
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 166.9177

✖ failing tests:

test at test\items.test.mjs:15:3
✖ item pension-tax-credit-2026 (0.8402ms)
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
