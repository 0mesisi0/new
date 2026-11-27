# Build failed

2026-11-27T09:48:06.867Z

```
npm test failed:
uette-relay (1.0867ms)
✔ item bubble-wrap-popper (1.0179ms)
✔ item bungeoppang-budget (1.1694ms)
✔ item cat-vs-keyboard (1.085ms)
✔ item chicken-leg-war (1.0606ms)
✔ item christmas-cake-price-compare (0.994ms)
✔ item christmas-cake-slices (0.8711ms)
✔ item christmas-long-weekend (1.1242ms)
✔ item clock-out (1.1121ms)
✔ item crank-carol-music-box (1.5676ms)
✔ item csat-after-plans (0.8369ms)
✔ item dns-address-trace (0.8247ms)
✔ item dongji-dumpling-puzzle (0.8047ms)
✔ item draft-detective (0.8209ms)
✔ item elevator-awkward (0.8996ms)
✔ item fish-cake-cart-asmr (0.8488ms)
✔ item gift-wrap-sprint (0.8191ms)
✔ item holiday-gift-swap-prompts (0.8045ms)
✔ item hoppang-fortune (1.0073ms)
✔ item hotteok-flip (0.9827ms)
✔ item kimbap-roll-timing (0.8062ms)
✔ item knit-sweater-depiller (1.078ms)
✔ item lost-glove-bureau (0.9899ms)
✔ item midnight-snack-mission (0.9077ms)
✔ item migratory-bird-formation (0.8298ms)
✔ item mini-curling (0.8304ms)
✔ item monday-alarm (0.9809ms)
✔ item new-year-countdown-clock (0.8038ms)
✔ item odd-bus-arrivals (0.7935ms)
✔ item ondol-pipe-puzzle (0.8356ms)
✔ item overseas-shopping-cost-calculator (1.301ms)
✔ item paper-smoother (1.034ms)
✖ item pension-tax-credit-2026 (0.7973ms)
✔ item pocket-hand-warmer (0.8959ms)
✔ item popup-pileup (0.8369ms)
✔ item puffer-zip (0.8035ms)
✔ item ramen-wait (0.8347ms)
✔ item regex-playground (1.1082ms)
✔ item roast-sweet-potato (1.3201ms)
✔ item sauna-towel-hat-studio (0.8045ms)
✔ item scarf-untangler (0.7677ms)
✔ item sheep-roundup-2027 (0.8974ms)
✔ item snow-duck-maker (0.8841ms)
✔ item snowflake-to-universe (0.9925ms)
✔ item snowplow-puzzle (0.7648ms)
✔ item snowprint-puzzle (0.9484ms)
✔ item space-out-challenge (0.9495ms)
✔ item stacked-discount-calculator (0.7409ms)
✔ item strike-ball-challenge (0.892ms)
✔ item tangerine-peel-puzzle (0.834ms)
✔ item thin-ice-puddle (1.2752ms)
✔ item times-tables-speedrun (0.9386ms)
✔ item trend-lifespan-fortune (0.8965ms)
✔ item twin-anmin (5.1421ms)
✔ item twin-daewon (5.3949ms)
✔ item winter-fireside-radio (1.0131ms)
✔ item winter-laundry-puzzle (0.8264ms)
✔ item winter-shadow-lab (0.7617ms)
✔ item winter-snack-ladder (0.9229ms)
✔ item winter-star-connect (0.9526ms)
✔ item world-time-planner (0.9288ms)
✔ item year-end-date-picker (0.7987ms)
✔ item year-end-receipt (1.4272ms)
(node:20000) ExperimentalWarning: SQLite is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
✔ voter ids are stable, per item, and hide the IP (5.7378ms)
✔ like, switch, withdraw and repeat votes (2.2633ms)
✔ counts and top list (2.1611ms)
ℹ tests 70
ℹ suites 0
ℹ pass 69
ℹ fail 1
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 168.467

✖ failing tests:

test at test\items.test.mjs:15:3
✖ item pension-tax-credit-2026 (0.7973ms)
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
