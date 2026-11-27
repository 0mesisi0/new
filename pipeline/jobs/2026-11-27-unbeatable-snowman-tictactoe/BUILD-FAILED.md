# Build failed

2026-11-27T09:13:38.440Z

```
npm test failed:
 (1.0594ms)
✔ item bungeoppang-budget (1.1062ms)
✔ item cat-vs-keyboard (1.0435ms)
✔ item chicken-leg-war (1.0314ms)
✔ item christmas-cake-price-compare (0.9358ms)
✔ item christmas-cake-slices (0.9338ms)
✔ item christmas-long-weekend (1.1039ms)
✔ item clock-out (1.0854ms)
✔ item crank-carol-music-box (0.9892ms)
✔ item csat-after-plans (0.8381ms)
✔ item dns-address-trace (1.1978ms)
✔ item dongji-dumpling-puzzle (0.8664ms)
✔ item draft-detective (0.879ms)
✔ item elevator-awkward (0.9253ms)
✔ item fish-cake-cart-asmr (0.8507ms)
✔ item gift-wrap-sprint (0.784ms)
✔ item holiday-gift-swap-prompts (0.7902ms)
✔ item hoppang-fortune (0.9838ms)
✔ item hotteok-flip (0.9181ms)
✔ item kimbap-roll-timing (0.8246ms)
✔ item knit-sweater-depiller (0.8325ms)
✔ item lost-glove-bureau (0.8221ms)
✔ item midnight-snack-mission (0.9242ms)
✔ item migratory-bird-formation (0.8337ms)
✔ item mini-curling (0.8149ms)
✔ item monday-alarm (0.889ms)
✔ item new-year-countdown-clock (0.9052ms)
✔ item odd-bus-arrivals (0.8102ms)
✔ item ondol-pipe-puzzle (1.0805ms)
✔ item overseas-shopping-cost-calculator (0.8306ms)
✔ item paper-smoother (0.9212ms)
✖ item pension-tax-credit-2026 (0.792ms)
✔ item pocket-hand-warmer (1.3178ms)
✔ item popup-pileup (0.8195ms)
✔ item puffer-zip (0.7938ms)
✔ item ramen-wait (0.8503ms)
✔ item regex-playground (0.9629ms)
✔ item roast-sweet-potato (0.9328ms)
✔ item sauna-towel-hat-studio (0.8254ms)
✔ item scarf-untangler (0.7763ms)
✔ item sheep-roundup-2027 (0.9093ms)
✔ item snow-duck-maker (0.8574ms)
✔ item snowflake-to-universe (0.9767ms)
✔ item snowplow-puzzle (0.7582ms)
✔ item snowprint-puzzle (0.8159ms)
✔ item space-out-challenge (0.9897ms)
✔ item stacked-discount-calculator (0.7259ms)
✔ item strike-ball-challenge (0.8808ms)
✔ item tangerine-peel-puzzle (0.785ms)
✔ item thin-ice-puddle (1.0308ms)
✔ item times-tables-speedrun (0.8133ms)
✔ item trend-lifespan-fortune (0.8878ms)
✔ item twin-anmin (4.8638ms)
✔ item twin-daewon (5.7142ms)
✔ item unbeatable-snowman-tictactoe (0.9119ms)
✔ item winter-fireside-radio (1.0313ms)
✔ item winter-laundry-puzzle (1.0174ms)
✔ item winter-shadow-lab (0.7752ms)
✔ item winter-snack-ladder (0.9382ms)
✔ item winter-star-connect (0.9601ms)
✔ item world-time-planner (1.0166ms)
✔ item year-end-date-picker (0.8096ms)
✔ item year-end-receipt (1.0959ms)
(node:34996) ExperimentalWarning: SQLite is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
✔ voter ids are stable, per item, and hide the IP (5.8233ms)
✔ like, switch, withdraw and repeat votes (2.4328ms)
✔ counts and top list (2.101ms)
ℹ tests 70
ℹ suites 0
ℹ pass 69
ℹ fail 1
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 167.2731

✖ failing tests:

test at test\items.test.mjs:15:3
✖ item pension-tax-credit-2026 (0.792ms)
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
