# Build failed

2026-11-27T00:28:17.845Z

```
npm test failed:
rap-popper (1.0802ms)
✔ item bungeoppang-budget (1.1649ms)
✔ item cat-vs-keyboard (1.0329ms)
✔ item chicken-leg-war (0.9789ms)
✔ item christmas-cake-price-compare (0.9714ms)
✔ item christmas-cake-slices (0.9383ms)
✔ item christmas-long-weekend (1.1589ms)
✔ item clock-out (1.1369ms)
✔ item crank-carol-music-box (1.0136ms)
✔ item csat-after-plans (0.8266ms)
✔ item dns-address-trace (1.4904ms)
✔ item dongji-dumpling-puzzle (0.8915ms)
✔ item draft-detective (0.8086ms)
✔ item elevator-awkward (0.9166ms)
✔ item fish-cake-cart-asmr (0.8177ms)
✔ item gift-wrap-sprint (0.782ms)
✔ item holiday-gift-swap-prompts (0.8275ms)
✔ item hoppang-fortune (0.9589ms)
✔ item hotteok-flip (0.9207ms)
✔ item kimbap-roll-timing (0.8056ms)
✔ item knit-sweater-depiller (0.8727ms)
✔ item lost-glove-bureau (0.8719ms)
✔ item midnight-snack-mission (1.0028ms)
✔ item migratory-bird-formation (0.8438ms)
✔ item mini-curling (0.8103ms)
✔ item monday-alarm (0.8971ms)
✔ item new-year-countdown-clock (0.9155ms)
✔ item odd-bus-arrivals (0.799ms)
✔ item ondol-pipe-puzzle (0.8782ms)
✔ item overseas-shopping-cost-calculator (0.817ms)
✔ item paper-smoother (0.9035ms)
✖ item pension-tax-credit-2026 (0.8107ms)
✔ item pocket-hand-warmer (1.272ms)
✔ item popup-pileup (0.8204ms)
✔ item puffer-zip (0.8303ms)
✔ item ramen-wait (0.8597ms)
✔ item regex-playground (1.0099ms)
✔ item roast-sweet-potato (0.9631ms)
✔ item sauna-towel-hat-studio (0.8331ms)
✔ item scarf-untangler (0.8131ms)
✔ item sheep-roundup-2027 (0.8998ms)
✔ item snow-duck-maker (0.8653ms)
✔ item snowflake-to-universe (0.9804ms)
✔ item snowplow-puzzle (0.7727ms)
✔ item snowprint-puzzle (0.8213ms)
✔ item space-out-challenge (1.0201ms)
✔ item stacked-discount-calculator (0.7624ms)
✔ item strike-ball-challenge (0.8938ms)
✔ item tangerine-peel-puzzle (0.8053ms)
✔ item thin-ice-puddle (1.0491ms)
✔ item times-tables-speedrun (0.7728ms)
✔ item trend-lifespan-fortune (0.8862ms)
✔ item twin-anmin (4.8605ms)
✔ item twin-daewon (5.5763ms)
✔ item winter-fireside-radio (1.0411ms)
✔ item winter-laundry-puzzle (0.9224ms)
✔ item winter-shadow-lab (0.7871ms)
✔ item winter-snack-ladder (0.965ms)
✔ item winter-star-connect (0.9364ms)
✔ item winter-typing-test (0.8628ms)
✔ item world-time-planner (0.989ms)
✔ item year-end-date-picker (0.8207ms)
✔ item year-end-receipt (1.1182ms)
(node:16852) ExperimentalWarning: SQLite is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
✔ voter ids are stable, per item, and hide the IP (5.9898ms)
✔ like, switch, withdraw and repeat votes (2.244ms)
✔ counts and top list (2.1013ms)
ℹ tests 70
ℹ suites 0
ℹ pass 69
ℹ fail 1
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 167.3226

✖ failing tests:

test at test\items.test.mjs:15:3
✖ item pension-tax-credit-2026 (0.8107ms)
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
