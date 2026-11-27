# Build failed

2026-11-27T04:17:30.486Z

```
npm test failed:
tte-relay (1.0681ms)
✔ item bubble-wrap-popper (1.0751ms)
✔ item bungeoppang-budget (1.3494ms)
✔ item cat-vs-keyboard (1.168ms)
✔ item chicken-leg-war (0.9704ms)
✔ item christmas-cake-price-compare (0.9544ms)
✔ item christmas-cake-slices (0.9555ms)
✔ item christmas-long-weekend (1.0699ms)
✔ item clock-out (1.032ms)
✔ item crank-carol-music-box (1.0658ms)
✔ item csat-after-plans (0.8581ms)
✔ item dns-address-trace (1.1913ms)
✔ item dongji-dumpling-puzzle (0.8767ms)
✔ item draft-detective (0.8243ms)
✔ item elevator-awkward (0.9433ms)
✔ item fish-cake-cart-asmr (0.8327ms)
✔ item gift-wrap-sprint (0.8286ms)
✔ item holiday-gift-swap-prompts (0.7986ms)
✔ item hoppang-fortune (0.9896ms)
✔ item hotteok-flip (0.8915ms)
✔ item kimbap-roll-timing (0.8419ms)
✔ item knit-sweater-depiller (0.8351ms)
✔ item lost-glove-bureau (0.8262ms)
✔ item midnight-snack-mission (0.8982ms)
✔ item migratory-bird-formation (0.8519ms)
✔ item mini-curling (0.7979ms)
✔ item monday-alarm (0.9039ms)
✔ item new-year-countdown-clock (0.8993ms)
✔ item odd-bus-arrivals (0.7935ms)
✔ item ondol-pipe-puzzle (0.8493ms)
✔ item overseas-shopping-cost-calculator (0.8499ms)
✔ item paper-smoother (0.9303ms)
✖ item pension-tax-credit-2026 (0.7844ms)
✔ item pocket-hand-warmer (1.2744ms)
✔ item popup-pileup (0.8644ms)
✔ item puffer-zip (0.8921ms)
✔ item ramen-wait (0.8942ms)
✔ item regex-playground (1.008ms)
✔ item roast-sweet-potato (0.9291ms)
✔ item sauna-towel-hat-studio (0.8438ms)
✔ item scarf-untangler (0.7961ms)
✔ item sheep-roundup-2027 (0.9004ms)
✔ item snow-duck-maker (0.8675ms)
✔ item snowflake-to-universe (1.0043ms)
✔ item snowplow-puzzle (0.7535ms)
✔ item snowprint-puzzle (0.8104ms)
✔ item space-out-challenge (1.0143ms)
✔ item stacked-discount-calculator (0.7456ms)
✔ item strike-ball-challenge (0.8906ms)
✔ item tangerine-peel-puzzle (0.8504ms)
✔ item thin-ice-puddle (0.91ms)
✔ item times-tables-speedrun (0.7905ms)
✔ item trend-lifespan-fortune (0.8886ms)
✔ item twin-anmin (5.0969ms)
✔ item twin-daewon (5.5485ms)
✔ item winter-fireside-radio (0.9999ms)
✔ item winter-laundry-puzzle (0.8474ms)
✔ item winter-shadow-lab (0.7513ms)
✔ item winter-snack-ladder (0.8971ms)
✔ item winter-star-connect (0.9088ms)
✔ item world-time-planner (0.9828ms)
✔ item year-end-date-picker (0.8718ms)
✔ item year-end-receipt (1.1083ms)
(node:11024) ExperimentalWarning: SQLite is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
✔ voter ids are stable, per item, and hide the IP (5.5449ms)
✔ like, switch, withdraw and repeat votes (2.2354ms)
✔ counts and top list (2.129ms)
ℹ tests 69
ℹ suites 0
ℹ pass 68
ℹ fail 1
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 162.7286

✖ failing tests:

test at test\items.test.mjs:15:3
✖ item pension-tax-credit-2026 (0.7844ms)
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
