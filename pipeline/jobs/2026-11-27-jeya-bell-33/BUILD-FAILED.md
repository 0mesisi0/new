# Build failed

2026-11-27T00:02:02.523Z

```
npm test failed:
e-wrap-popper (1.0827ms)
✔ item bungeoppang-budget (1.1062ms)
✔ item cat-vs-keyboard (1.0208ms)
✔ item chicken-leg-war (0.9836ms)
✔ item christmas-cake-price-compare (0.9328ms)
✔ item christmas-cake-slices (1.3848ms)
✔ item christmas-long-weekend (1.6836ms)
✔ item clock-out (1.6863ms)
✔ item crank-carol-music-box (1.3371ms)
✔ item csat-after-plans (1.0599ms)
✔ item dns-address-trace (1.2629ms)
✔ item dongji-dumpling-puzzle (0.8703ms)
✔ item draft-detective (0.8306ms)
✔ item elevator-awkward (0.9036ms)
✔ item fish-cake-cart-asmr (0.8231ms)
✔ item gift-wrap-sprint (0.7786ms)
✔ item holiday-gift-swap-prompts (0.7931ms)
✔ item hoppang-fortune (0.9831ms)
✔ item hotteok-flip (0.9281ms)
✔ item jeya-bell-33 (0.9219ms)
✔ item kimbap-roll-timing (0.8121ms)
✔ item knit-sweater-depiller (0.893ms)
✔ item lost-glove-bureau (0.8901ms)
✔ item midnight-snack-mission (0.8766ms)
✔ item migratory-bird-formation (0.8567ms)
✔ item mini-curling (0.8106ms)
✔ item monday-alarm (0.9855ms)
✔ item new-year-countdown-clock (0.8193ms)
✔ item odd-bus-arrivals (0.8027ms)
✔ item ondol-pipe-puzzle (0.8395ms)
✔ item overseas-shopping-cost-calculator (0.8158ms)
✔ item paper-smoother (1.2547ms)
✖ item pension-tax-credit-2026 (0.8036ms)
✔ item pocket-hand-warmer (0.7925ms)
✔ item popup-pileup (0.7829ms)
✔ item puffer-zip (0.805ms)
✔ item ramen-wait (0.8466ms)
✔ item regex-playground (1.1889ms)
✔ item roast-sweet-potato (0.9727ms)
✔ item sauna-towel-hat-studio (0.8328ms)
✔ item scarf-untangler (0.7561ms)
✔ item sheep-roundup-2027 (0.8988ms)
✔ item snow-duck-maker (0.8641ms)
✔ item snowflake-to-universe (0.9979ms)
✔ item snowplow-puzzle (0.7674ms)
✔ item snowprint-puzzle (0.9227ms)
✔ item space-out-challenge (0.9033ms)
✔ item stacked-discount-calculator (0.7412ms)
✔ item strike-ball-challenge (0.9011ms)
✔ item tangerine-peel-puzzle (0.8439ms)
✔ item thin-ice-puddle (1.0654ms)
✔ item times-tables-speedrun (0.8435ms)
✔ item trend-lifespan-fortune (0.9167ms)
✔ item twin-anmin (4.8963ms)
✔ item twin-daewon (5.5282ms)
✔ item winter-fireside-radio (1.0225ms)
✔ item winter-laundry-puzzle (0.8232ms)
✔ item winter-shadow-lab (0.741ms)
✔ item winter-snack-ladder (0.8819ms)
✔ item winter-star-connect (0.9801ms)
✔ item world-time-planner (0.9577ms)
✔ item year-end-date-picker (0.8488ms)
✔ item year-end-receipt (1.1051ms)
(node:22328) ExperimentalWarning: SQLite is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
✔ voter ids are stable, per item, and hide the IP (5.987ms)
✔ like, switch, withdraw and repeat votes (2.2022ms)
✔ counts and top list (2.2375ms)
ℹ tests 70
ℹ suites 0
ℹ pass 69
ℹ fail 1
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 168.5989

✖ failing tests:

test at test\items.test.mjs:15:3
✖ item pension-tax-credit-2026 (0.8036ms)
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
