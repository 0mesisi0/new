# Build failed

2026-11-27T05:19:05.810Z

```
npm test failed:
pper (1.0877ms)
✔ item bungeoppang-budget (1.0894ms)
✔ item cat-vs-keyboard (1.0572ms)
✔ item chicken-leg-war (1.0018ms)
✔ item christmas-cake-price-compare (0.9522ms)
✔ item christmas-cake-slices (0.9538ms)
✔ item christmas-long-weekend (1.0994ms)
✔ item clock-out (1.2631ms)
✔ item crank-carol-music-box (1.0494ms)
✔ item csat-after-plans (0.8334ms)
✔ item dns-address-trace (1.3874ms)
✔ item dongji-dumpling-puzzle (0.9269ms)
✔ item draft-detective (0.8609ms)
✔ item elevator-awkward (0.9151ms)
✔ item fish-cake-cart-asmr (0.8395ms)
✔ item gift-wrap-sprint (0.7921ms)
✔ item holiday-gift-swap-prompts (0.8092ms)
✔ item hoppang-fortune (0.9922ms)
✔ item hotteok-flip (0.9362ms)
✔ item kimbap-roll-timing (0.8225ms)
✔ item knit-sweater-depiller (0.8431ms)
✔ item lost-glove-bureau (0.8425ms)
✔ item midnight-snack-mission (0.9865ms)
✔ item migratory-bird-formation (0.8654ms)
✔ item mini-curling (0.8106ms)
✔ item monday-alarm (0.9048ms)
✔ item new-year-countdown-clock (0.9096ms)
✔ item odd-bus-arrivals (0.7872ms)
✔ item ondol-pipe-puzzle (0.8614ms)
✔ item overseas-shopping-cost-calculator (0.845ms)
✔ item paper-smoother (0.9031ms)
✖ item pension-tax-credit-2026 (0.8293ms)
✔ item pocket-hand-warmer (1.2521ms)
✔ item popup-pileup (0.7924ms)
✔ item puffer-zip (0.8503ms)
✔ item ramen-wait (0.8588ms)
✔ item regex-playground (1.0435ms)
✔ item roast-sweet-potato (0.936ms)
✔ item running-pace-calculator (0.8328ms)
✔ item sauna-towel-hat-studio (0.7994ms)
✔ item scarf-untangler (1.0136ms)
✔ item sheep-roundup-2027 (0.9008ms)
✔ item snow-duck-maker (0.8975ms)
✔ item snowflake-to-universe (1.0083ms)
✔ item snowplow-puzzle (0.7838ms)
✔ item snowprint-puzzle (0.9422ms)
✔ item space-out-challenge (0.9096ms)
✔ item stacked-discount-calculator (0.7516ms)
✔ item strike-ball-challenge (0.9051ms)
✔ item tangerine-peel-puzzle (0.8423ms)
✔ item thin-ice-puddle (0.9222ms)
✔ item times-tables-speedrun (0.7876ms)
✔ item trend-lifespan-fortune (1.1471ms)
✔ item twin-anmin (4.8371ms)
✔ item twin-daewon (5.3386ms)
✔ item winter-fireside-radio (0.9992ms)
✔ item winter-laundry-puzzle (0.833ms)
✔ item winter-shadow-lab (0.806ms)
✔ item winter-snack-ladder (0.91ms)
✔ item winter-star-connect (0.9679ms)
✔ item world-time-planner (0.9846ms)
✔ item year-end-date-picker (0.8194ms)
✔ item year-end-receipt (1.1081ms)
(node:16184) ExperimentalWarning: SQLite is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
✔ voter ids are stable, per item, and hide the IP (5.9849ms)
✔ like, switch, withdraw and repeat votes (2.2661ms)
✔ counts and top list (2.1228ms)
ℹ tests 70
ℹ suites 0
ℹ pass 69
ℹ fail 1
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 166.2392

✖ failing tests:

test at test\items.test.mjs:15:3
✖ item pension-tax-credit-2026 (0.8293ms)
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
