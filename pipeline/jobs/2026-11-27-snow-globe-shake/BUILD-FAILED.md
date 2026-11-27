# Build failed

2026-11-27T00:23:32.401Z

```
npm test failed:
le-wrap-popper (1.1312ms)
✔ item bungeoppang-budget (1.2543ms)
✔ item cat-vs-keyboard (1.0964ms)
✔ item chicken-leg-war (0.9882ms)
✔ item christmas-cake-price-compare (0.9417ms)
✔ item christmas-cake-slices (0.9537ms)
✔ item christmas-long-weekend (1.1372ms)
✔ item clock-out (1.0768ms)
✔ item crank-carol-music-box (0.9838ms)
✔ item csat-after-plans (0.8156ms)
✔ item dns-address-trace (1.2185ms)
✔ item dongji-dumpling-puzzle (0.9094ms)
✔ item draft-detective (0.8853ms)
✔ item elevator-awkward (0.9197ms)
✔ item fish-cake-cart-asmr (0.8606ms)
✔ item gift-wrap-sprint (0.7807ms)
✔ item holiday-gift-swap-prompts (0.943ms)
✔ item hoppang-fortune (1.2865ms)
✔ item hotteok-flip (0.941ms)
✔ item kimbap-roll-timing (0.8136ms)
✔ item knit-sweater-depiller (0.8479ms)
✔ item lost-glove-bureau (0.8181ms)
✔ item midnight-snack-mission (0.9507ms)
✔ item migratory-bird-formation (0.8339ms)
✔ item mini-curling (0.811ms)
✔ item monday-alarm (0.9203ms)
✔ item new-year-countdown-clock (0.9011ms)
✔ item odd-bus-arrivals (0.842ms)
✔ item ondol-pipe-puzzle (0.8788ms)
✔ item overseas-shopping-cost-calculator (0.8665ms)
✔ item paper-smoother (0.9103ms)
✖ item pension-tax-credit-2026 (0.8124ms)
✔ item pocket-hand-warmer (1.1285ms)
✔ item popup-pileup (0.8279ms)
✔ item puffer-zip (0.805ms)
✔ item ramen-wait (0.8483ms)
✔ item regex-playground (0.9917ms)
✔ item roast-sweet-potato (0.9453ms)
✔ item sauna-towel-hat-studio (0.834ms)
✔ item scarf-untangler (0.8401ms)
✔ item sheep-roundup-2027 (0.9002ms)
✔ item snow-duck-maker (0.8634ms)
✔ item snow-globe-shake (0.8112ms)
✔ item snowflake-to-universe (1.0243ms)
✔ item snowplow-puzzle (0.7587ms)
✔ item snowprint-puzzle (0.9298ms)
✔ item space-out-challenge (0.9127ms)
✔ item stacked-discount-calculator (0.7377ms)
✔ item strike-ball-challenge (0.8953ms)
✔ item tangerine-peel-puzzle (0.8793ms)
✔ item thin-ice-puddle (0.9968ms)
✔ item times-tables-speedrun (1.025ms)
✔ item trend-lifespan-fortune (1.288ms)
✔ item twin-anmin (4.9163ms)
✔ item twin-daewon (5.3339ms)
✔ item winter-fireside-radio (1.0388ms)
✔ item winter-laundry-puzzle (0.9242ms)
✔ item winter-shadow-lab (0.8082ms)
✔ item winter-snack-ladder (0.9518ms)
✔ item winter-star-connect (0.9638ms)
✔ item world-time-planner (0.9114ms)
✔ item year-end-date-picker (0.8209ms)
✔ item year-end-receipt (1.1014ms)
(node:38392) ExperimentalWarning: SQLite is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
✔ voter ids are stable, per item, and hide the IP (6.0427ms)
✔ like, switch, withdraw and repeat votes (2.3164ms)
✔ counts and top list (1.5203ms)
ℹ tests 70
ℹ suites 0
ℹ pass 69
ℹ fail 1
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 167.219

✖ failing tests:

test at test\items.test.mjs:15:3
✖ item pension-tax-credit-2026 (0.8124ms)
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
