# Build failed

2026-11-26T18:53:38.844Z

```
npm test failed:
pper (1.0848ms)
✔ item bungeoppang-budget (1.1434ms)
✔ item cat-vs-keyboard (1.0704ms)
✔ item chicken-leg-war (1.0999ms)
✔ item christmas-cake-price-compare (0.9607ms)
✔ item christmas-cake-slices (0.9267ms)
✔ item christmas-long-weekend (1.1195ms)
✔ item clock-out (1.1244ms)
✔ item crank-carol-music-box (1.0034ms)
✔ item csat-after-plans (0.8703ms)
✔ item dns-address-trace (1.2797ms)
✔ item dongji-dumpling-puzzle (0.8823ms)
✔ item draft-detective (0.8146ms)
✔ item elevator-awkward (0.9474ms)
✔ item fish-cake-cart-asmr (0.8269ms)
✔ item gift-wrap-sprint (0.7923ms)
✔ item holiday-gift-swap-prompts (0.8055ms)
✔ item hoppang-fortune (0.9706ms)
✔ item hotteok-flip (0.9534ms)
✔ item kimbap-roll-timing (0.8403ms)
✔ item knit-sweater-depiller (0.8554ms)
✔ item lost-glove-bureau (0.8441ms)
✔ item midnight-snack-mission (0.9527ms)
✔ item migratory-bird-formation (0.8376ms)
✔ item mini-curling (0.8101ms)
✔ item monday-alarm (0.9077ms)
✔ item new-year-countdown-clock (0.8967ms)
✔ item odd-bus-arrivals (0.8025ms)
✔ item ondol-pipe-puzzle (0.8735ms)
✔ item overseas-shopping-cost-calculator (0.8297ms)
✔ item paper-smoother (0.9576ms)
✖ item pension-tax-credit-2026 (0.8062ms)
✔ item pocket-hand-warmer (1.1166ms)
✔ item popup-pileup (0.8446ms)
✔ item puffer-zip (0.8078ms)
✔ item ramen-wait (0.875ms)
✔ item regex-playground (1.0162ms)
✔ item roast-sweet-potato (0.9367ms)
✔ item sauna-towel-hat-studio (0.8746ms)
✔ item scarf-untangler (0.8043ms)
✔ item sheep-roundup-2027 (0.9102ms)
✔ item snow-duck-maker (0.9155ms)
✔ item snowflake-to-universe (0.9966ms)
✔ item snowplow-puzzle (0.7659ms)
✔ item snowprint-puzzle (0.8244ms)
✔ item space-out-challenge (1.0082ms)
✔ item stacked-discount-calculator (0.7726ms)
✔ item strike-ball-challenge (0.9303ms)
✔ item tangerine-peel-puzzle (0.8209ms)
✔ item thin-ice-puddle (0.9402ms)
✔ item times-tables-speedrun (0.7778ms)
✔ item trend-lifespan-fortune (0.9022ms)
✔ item twin-anmin (4.9124ms)
✔ item twin-daewon (5.6361ms)
✔ item wind-chill-calculator (1.2256ms)
✔ item winter-fireside-radio (1.132ms)
✔ item winter-laundry-puzzle (0.8524ms)
✔ item winter-shadow-lab (0.8135ms)
✔ item winter-snack-ladder (0.925ms)
✔ item winter-star-connect (1.022ms)
✔ item world-time-planner (1.0029ms)
✔ item year-end-date-picker (0.8122ms)
✔ item year-end-receipt (1.1568ms)
(node:27252) ExperimentalWarning: SQLite is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
✔ voter ids are stable, per item, and hide the IP (5.9078ms)
✔ like, switch, withdraw and repeat votes (2.2406ms)
✔ counts and top list (2.0122ms)
ℹ tests 70
ℹ suites 0
ℹ pass 69
ℹ fail 1
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 165.8712

✖ failing tests:

test at test\items.test.mjs:15:3
✖ item pension-tax-credit-2026 (0.8062ms)
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
