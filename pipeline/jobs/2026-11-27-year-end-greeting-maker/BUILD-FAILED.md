# Build failed

2026-11-27T04:12:58.126Z

```
npm test failed:
pper (1.1221ms)
✔ item bungeoppang-budget (1.0737ms)
✔ item cat-vs-keyboard (1.0207ms)
✔ item chicken-leg-war (0.9581ms)
✔ item christmas-cake-price-compare (0.946ms)
✔ item christmas-cake-slices (1.175ms)
✔ item christmas-long-weekend (1.1939ms)
✔ item clock-out (1.2718ms)
✔ item crank-carol-music-box (1.0016ms)
✔ item csat-after-plans (0.8269ms)
✔ item dns-address-trace (1.2026ms)
✔ item dongji-dumpling-puzzle (0.8593ms)
✔ item draft-detective (0.8123ms)
✔ item elevator-awkward (0.9086ms)
✔ item fish-cake-cart-asmr (0.8155ms)
✔ item gift-wrap-sprint (0.817ms)
✔ item holiday-gift-swap-prompts (0.7941ms)
✔ item hoppang-fortune (0.9591ms)
✔ item hotteok-flip (0.9174ms)
✔ item kimbap-roll-timing (0.8121ms)
✔ item knit-sweater-depiller (0.853ms)
✔ item lost-glove-bureau (0.8264ms)
✔ item midnight-snack-mission (0.9734ms)
✔ item migratory-bird-formation (0.8284ms)
✔ item mini-curling (0.8259ms)
✔ item monday-alarm (0.9107ms)
✔ item new-year-countdown-clock (0.8845ms)
✔ item odd-bus-arrivals (0.7785ms)
✔ item ondol-pipe-puzzle (1.1202ms)
✔ item overseas-shopping-cost-calculator (0.9394ms)
✔ item paper-smoother (0.9632ms)
✖ item pension-tax-credit-2026 (0.8312ms)
✔ item pocket-hand-warmer (1.1387ms)
✔ item popup-pileup (0.8372ms)
✔ item puffer-zip (0.8167ms)
✔ item ramen-wait (0.8421ms)
✔ item regex-playground (0.9878ms)
✔ item roast-sweet-potato (0.9184ms)
✔ item sauna-towel-hat-studio (0.8315ms)
✔ item scarf-untangler (0.8723ms)
✔ item sheep-roundup-2027 (0.8999ms)
✔ item snow-duck-maker (0.8859ms)
✔ item snowflake-to-universe (0.9897ms)
✔ item snowplow-puzzle (0.7818ms)
✔ item snowprint-puzzle (0.8051ms)
✔ item space-out-challenge (1.0131ms)
✔ item stacked-discount-calculator (0.7373ms)
✔ item strike-ball-challenge (0.9094ms)
✔ item tangerine-peel-puzzle (0.802ms)
✔ item thin-ice-puddle (0.9208ms)
✔ item times-tables-speedrun (0.8028ms)
✔ item trend-lifespan-fortune (0.886ms)
✔ item twin-anmin (4.8845ms)
✔ item twin-daewon (5.4139ms)
✔ item winter-fireside-radio (0.9958ms)
✔ item winter-laundry-puzzle (0.8679ms)
✔ item winter-shadow-lab (0.7755ms)
✔ item winter-snack-ladder (0.8984ms)
✔ item winter-star-connect (0.9687ms)
✔ item world-time-planner (0.9345ms)
✔ item year-end-date-picker (0.8592ms)
✔ item year-end-greeting-maker (0.7706ms)
✔ item year-end-receipt (1.1025ms)
(node:45364) ExperimentalWarning: SQLite is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
✔ voter ids are stable, per item, and hide the IP (5.7827ms)
✔ like, switch, withdraw and repeat votes (2.1657ms)
✔ counts and top list (1.9431ms)
ℹ tests 70
ℹ suites 0
ℹ pass 69
ℹ fail 1
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 167.0697

✖ failing tests:

test at test\items.test.mjs:15:3
✖ item pension-tax-credit-2026 (0.8312ms)
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
