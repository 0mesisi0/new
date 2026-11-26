# Build failed

2026-11-26T23:51:59.643Z

```
npm test failed:
e-wrap-popper (2.2154ms)
✔ item bungeoppang-budget (2.209ms)
✔ item cat-vs-keyboard (2.1578ms)
✔ item chicken-leg-war (2.2118ms)
✔ item christmas-cake-price-compare (1.8957ms)
✔ item christmas-cake-slices (1.7441ms)
✔ item christmas-long-weekend (1.7753ms)
✔ item clock-out (1.7611ms)
✔ item crank-carol-music-box (1.7626ms)
✔ item csat-after-plans (1.7311ms)
✔ item dns-address-trace (1.5628ms)
✔ item dongji-dumpling-puzzle (1.6285ms)
✔ item draft-detective (1.6411ms)
✔ item elevator-awkward (1.5893ms)
✔ item fish-cake-cart-asmr (1.6138ms)
✔ item gift-wrap-sprint (1.5385ms)
✔ item hangul-unicode-lab (0.8127ms)
✔ item holiday-gift-swap-prompts (1.6423ms)
✔ item hoppang-fortune (1.68ms)
✔ item hotteok-flip (1.5967ms)
✔ item kimbap-roll-timing (1.2319ms)
✔ item knit-sweater-depiller (1.8677ms)
✔ item lost-glove-bureau (1.8324ms)
✔ item midnight-snack-mission (1.6369ms)
✔ item migratory-bird-formation (1.5662ms)
✔ item mini-curling (1.4799ms)
✔ item monday-alarm (1.7291ms)
✔ item new-year-countdown-clock (1.574ms)
✔ item odd-bus-arrivals (1.6454ms)
✔ item ondol-pipe-puzzle (1.4894ms)
✔ item overseas-shopping-cost-calculator (1.798ms)
✔ item paper-smoother (2.118ms)
✖ item pension-tax-credit-2026 (1.3437ms)
✔ item pocket-hand-warmer (1.5441ms)
✔ item popup-pileup (1.6015ms)
✔ item puffer-zip (1.6312ms)
✔ item ramen-wait (1.4969ms)
✔ item regex-playground (1.8182ms)
✔ item roast-sweet-potato (1.907ms)
✔ item sauna-towel-hat-studio (1.6581ms)
✔ item scarf-untangler (1.6102ms)
✔ item sheep-roundup-2027 (1.7454ms)
✔ item snow-duck-maker (1.8759ms)
✔ item snowflake-to-universe (1.6843ms)
✔ item snowplow-puzzle (1.3916ms)
✔ item snowprint-puzzle (1.7385ms)
✔ item space-out-challenge (1.5855ms)
✔ item stacked-discount-calculator (1.5878ms)
✔ item strike-ball-challenge (1.617ms)
✔ item tangerine-peel-puzzle (1.8091ms)
✔ item thin-ice-puddle (2.074ms)
✔ item times-tables-speedrun (1.5618ms)
✔ item trend-lifespan-fortune (1.7436ms)
✔ item twin-anmin (5.8132ms)
✔ item twin-daewon (6.4015ms)
✔ item winter-fireside-radio (1.943ms)
✔ item winter-laundry-puzzle (1.7083ms)
✔ item winter-shadow-lab (1.5033ms)
✔ item winter-snack-ladder (1.6573ms)
✔ item winter-star-connect (1.7014ms)
✔ item world-time-planner (1.6306ms)
✔ item year-end-date-picker (1.4846ms)
✔ item year-end-receipt (1.8971ms)
(node:38056) ExperimentalWarning: SQLite is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
✔ voter ids are stable, per item, and hide the IP (5.8959ms)
✔ like, switch, withdraw and repeat votes (2.2405ms)
✔ counts and top list (2.2022ms)
ℹ tests 70
ℹ suites 0
ℹ pass 69
ℹ fail 1
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 221.2365

✖ failing tests:

test at test\items.test.mjs:15:3
✖ item pension-tax-credit-2026 (1.3437ms)
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
