# Build failed

2026-11-27T09:59:02.795Z

```
npm test failed:
ap-popper (1.4311ms)
✔ item bungeoppang-budget (1.1862ms)
✔ item cat-vs-keyboard (1.0094ms)
✔ item chicken-leg-war (1.0081ms)
✔ item christmas-cake-price-compare (0.9637ms)
✔ item christmas-cake-slices (0.9495ms)
✔ item christmas-long-weekend (1.0606ms)
✔ item clock-out (1.1324ms)
✔ item crank-carol-music-box (1.0313ms)
✔ item csat-after-plans (0.9108ms)
✔ item dns-address-trace (1.2802ms)
✔ item dongji-dumpling-puzzle (0.9073ms)
✔ item draft-detective (0.8796ms)
✔ item elevator-awkward (0.9266ms)
✔ item fish-cake-cart-asmr (0.8577ms)
✔ item geminid-wish-catch (0.8793ms)
✔ item gift-wrap-sprint (0.8586ms)
✔ item holiday-gift-swap-prompts (0.8145ms)
✔ item hoppang-fortune (1.0025ms)
✔ item hotteok-flip (0.9385ms)
✔ item kimbap-roll-timing (0.8219ms)
✔ item knit-sweater-depiller (0.9105ms)
✔ item lost-glove-bureau (0.894ms)
✔ item midnight-snack-mission (0.9269ms)
✔ item migratory-bird-formation (0.8839ms)
✔ item mini-curling (0.8486ms)
✔ item monday-alarm (0.9973ms)
✔ item new-year-countdown-clock (0.8379ms)
✔ item odd-bus-arrivals (0.8458ms)
✔ item ondol-pipe-puzzle (0.874ms)
✔ item overseas-shopping-cost-calculator (0.8109ms)
✔ item paper-smoother (1.4934ms)
✖ item pension-tax-credit-2026 (0.9306ms)
✔ item pocket-hand-warmer (0.9192ms)
✔ item popup-pileup (0.8239ms)
✔ item puffer-zip (0.8018ms)
✔ item ramen-wait (0.8402ms)
✔ item regex-playground (1.008ms)
✔ item roast-sweet-potato (1.0059ms)
✔ item sauna-towel-hat-studio (0.8452ms)
✔ item scarf-untangler (0.7622ms)
✔ item sheep-roundup-2027 (0.901ms)
✔ item snow-duck-maker (0.8648ms)
✔ item snowflake-to-universe (0.9973ms)
✔ item snowplow-puzzle (0.7644ms)
✔ item snowprint-puzzle (0.9347ms)
✔ item space-out-challenge (0.8976ms)
✔ item stacked-discount-calculator (0.7407ms)
✔ item strike-ball-challenge (0.8989ms)
✔ item tangerine-peel-puzzle (0.8779ms)
✔ item thin-ice-puddle (1.3268ms)
✔ item times-tables-speedrun (0.8046ms)
✔ item trend-lifespan-fortune (0.8844ms)
✔ item twin-anmin (5.0008ms)
✔ item twin-daewon (5.4432ms)
✔ item winter-fireside-radio (1.029ms)
✔ item winter-laundry-puzzle (0.8715ms)
✔ item winter-shadow-lab (0.8518ms)
✔ item winter-snack-ladder (0.9466ms)
✔ item winter-star-connect (0.9846ms)
✔ item world-time-planner (0.9663ms)
✔ item year-end-date-picker (0.8198ms)
✔ item year-end-receipt (1.0953ms)
(node:48776) ExperimentalWarning: SQLite is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
✔ voter ids are stable, per item, and hide the IP (5.817ms)
✔ like, switch, withdraw and repeat votes (2.3383ms)
✔ counts and top list (2.1535ms)
ℹ tests 70
ℹ suites 0
ℹ pass 69
ℹ fail 1
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 169.3272

✖ failing tests:

test at test\items.test.mjs:15:3
✖ item pension-tax-credit-2026 (0.9306ms)
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
