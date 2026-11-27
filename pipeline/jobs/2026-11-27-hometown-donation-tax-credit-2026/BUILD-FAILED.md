# Build failed

2026-11-27T10:01:49.178Z

```
npm test failed:
ms)
✔ item bungeoppang-budget (1.0746ms)
✔ item cat-vs-keyboard (1.2911ms)
✔ item chicken-leg-war (1.0412ms)
✔ item christmas-cake-price-compare (0.9512ms)
✔ item christmas-cake-slices (0.9725ms)
✔ item christmas-long-weekend (1.0572ms)
✔ item clock-out (1.0706ms)
✔ item crank-carol-music-box (1.0412ms)
✔ item csat-after-plans (0.8089ms)
✔ item dns-address-trace (1.2705ms)
✔ item dongji-dumpling-puzzle (0.9356ms)
✔ item draft-detective (0.8015ms)
✔ item elevator-awkward (0.8944ms)
✔ item fish-cake-cart-asmr (0.8148ms)
✔ item gift-wrap-sprint (0.7859ms)
✔ item holiday-gift-swap-prompts (0.8085ms)
✔ item hometown-donation-tax-credit-2026 (0.784ms)
✔ item hoppang-fortune (0.9923ms)
✔ item hotteok-flip (0.9586ms)
✔ item kimbap-roll-timing (0.8143ms)
✔ item knit-sweater-depiller (0.881ms)
✔ item lost-glove-bureau (0.8458ms)
✔ item midnight-snack-mission (0.8843ms)
✔ item migratory-bird-formation (0.8618ms)
✔ item mini-curling (0.8424ms)
✔ item monday-alarm (0.971ms)
✔ item new-year-countdown-clock (0.8307ms)
✔ item odd-bus-arrivals (0.8478ms)
✔ item ondol-pipe-puzzle (0.8129ms)
✔ item overseas-shopping-cost-calculator (0.8196ms)
✔ item paper-smoother (1.2573ms)
✖ item pension-tax-credit-2026 (0.7812ms)
✔ item pocket-hand-warmer (0.7897ms)
✔ item popup-pileup (0.7889ms)
✔ item puffer-zip (0.8971ms)
✔ item ramen-wait (0.9522ms)
✔ item regex-playground (1.0124ms)
✔ item roast-sweet-potato (0.9866ms)
✔ item sauna-towel-hat-studio (0.8087ms)
✔ item scarf-untangler (0.7614ms)
✔ item sheep-roundup-2027 (0.8957ms)
✔ item snow-duck-maker (0.8608ms)
✔ item snowflake-to-universe (0.9858ms)
✔ item snowplow-puzzle (0.7513ms)
✔ item snowprint-puzzle (0.9252ms)
✔ item space-out-challenge (0.8905ms)
✔ item stacked-discount-calculator (0.7424ms)
✔ item strike-ball-challenge (0.8822ms)
✔ item tangerine-peel-puzzle (0.8396ms)
✔ item thin-ice-puddle (1.2189ms)
✔ item times-tables-speedrun (0.8079ms)
✔ item trend-lifespan-fortune (0.9172ms)
✔ item twin-anmin (4.9623ms)
✔ item twin-daewon (5.9599ms)
✔ item winter-fireside-radio (1.0018ms)
✔ item winter-laundry-puzzle (0.8267ms)
✔ item winter-shadow-lab (0.7607ms)
✔ item winter-snack-ladder (0.9047ms)
✔ item winter-star-connect (0.9856ms)
✔ item world-time-planner (0.974ms)
✔ item year-end-date-picker (0.9229ms)
✔ item year-end-receipt (1.1639ms)
(node:41132) ExperimentalWarning: SQLite is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
✔ voter ids are stable, per item, and hide the IP (5.8185ms)
✔ like, switch, withdraw and repeat votes (2.1592ms)
✔ counts and top list (2.0152ms)
ℹ tests 70
ℹ suites 0
ℹ pass 69
ℹ fail 1
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 166.5549

✖ failing tests:

test at test\items.test.mjs:15:3
✖ item pension-tax-credit-2026 (0.7812ms)
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
