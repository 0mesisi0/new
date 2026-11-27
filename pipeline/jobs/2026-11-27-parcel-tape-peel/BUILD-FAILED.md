# Build failed

2026-11-27T10:17:39.552Z

```
npm test failed:
rap-popper (1.2462ms)
✔ item bungeoppang-budget (1.1555ms)
✔ item cat-vs-keyboard (1.0586ms)
✔ item chicken-leg-war (1.0318ms)
✔ item christmas-cake-price-compare (0.9615ms)
✔ item christmas-cake-slices (1.0164ms)
✔ item christmas-long-weekend (1.2592ms)
✔ item clock-out (1.1285ms)
✔ item crank-carol-music-box (1.0629ms)
✔ item csat-after-plans (0.8513ms)
✔ item dns-address-trace (1.5529ms)
✔ item dongji-dumpling-puzzle (0.954ms)
✔ item draft-detective (0.9159ms)
✔ item elevator-awkward (0.966ms)
✔ item fish-cake-cart-asmr (0.8725ms)
✔ item gift-wrap-sprint (1.0445ms)
✔ item holiday-gift-swap-prompts (0.8757ms)
✔ item hoppang-fortune (1.0132ms)
✔ item hotteok-flip (1.0134ms)
✔ item kimbap-roll-timing (0.8355ms)
✔ item knit-sweater-depiller (0.8648ms)
✔ item lost-glove-bureau (0.8527ms)
✔ item midnight-snack-mission (0.9574ms)
✔ item migratory-bird-formation (0.9023ms)
✔ item mini-curling (0.8522ms)
✔ item monday-alarm (0.973ms)
✔ item new-year-countdown-clock (0.9301ms)
✔ item odd-bus-arrivals (0.8142ms)
✔ item ondol-pipe-puzzle (0.8993ms)
✔ item overseas-shopping-cost-calculator (0.8902ms)
✔ item paper-smoother (0.9455ms)
✔ item parcel-tape-peel (1.537ms)
✖ item pension-tax-credit-2026 (0.8957ms)
✔ item pocket-hand-warmer (0.8364ms)
✔ item popup-pileup (0.8423ms)
✔ item puffer-zip (0.8338ms)
✔ item ramen-wait (0.9136ms)
✔ item regex-playground (1.0577ms)
✔ item roast-sweet-potato (1.0195ms)
✔ item sauna-towel-hat-studio (0.8158ms)
✔ item scarf-untangler (0.8271ms)
✔ item sheep-roundup-2027 (1.0486ms)
✔ item snow-duck-maker (0.9287ms)
✔ item snowflake-to-universe (1.0228ms)
✔ item snowplow-puzzle (0.8165ms)
✔ item snowprint-puzzle (1.016ms)
✔ item space-out-challenge (0.9505ms)
✔ item stacked-discount-calculator (0.7735ms)
✔ item strike-ball-challenge (1.4332ms)
✔ item tangerine-peel-puzzle (1.0696ms)
✔ item thin-ice-puddle (1.2165ms)
✔ item times-tables-speedrun (0.8609ms)
✔ item trend-lifespan-fortune (0.9425ms)
✔ item twin-anmin (5.1675ms)
✔ item twin-daewon (5.6841ms)
✔ item winter-fireside-radio (1.0637ms)
✔ item winter-laundry-puzzle (0.8916ms)
✔ item winter-shadow-lab (0.7902ms)
✔ item winter-snack-ladder (0.9463ms)
✔ item winter-star-connect (1.0228ms)
✔ item world-time-planner (1.0528ms)
✔ item year-end-date-picker (0.8254ms)
✔ item year-end-receipt (1.1899ms)
(node:42964) ExperimentalWarning: SQLite is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
✔ voter ids are stable, per item, and hide the IP (6.7699ms)
✔ like, switch, withdraw and repeat votes (2.2249ms)
✔ counts and top list (1.4001ms)
ℹ tests 70
ℹ suites 0
ℹ pass 69
ℹ fail 1
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 172.6811

✖ failing tests:

test at test\items.test.mjs:15:3
✖ item pension-tax-credit-2026 (0.8957ms)
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
