# Build failed

2026-11-27T04:47:51.917Z

```
npm test failed:
ap-popper (1.0517ms)
✔ item bungeoppang-budget (1.0759ms)
✔ item cat-vs-keyboard (1.0044ms)
✔ item chicken-leg-war (0.9852ms)
✔ item christmas-cake-price-compare (0.9255ms)
✔ item christmas-cake-slices (0.9732ms)
✔ item christmas-long-weekend (1.0597ms)
✔ item christmas-market-cocoa (1.0314ms)
✔ item clock-out (1.0468ms)
✔ item crank-carol-music-box (1.5442ms)
✔ item csat-after-plans (1.0088ms)
✔ item dns-address-trace (0.8446ms)
✔ item dongji-dumpling-puzzle (1.3ms)
✔ item draft-detective (0.8153ms)
✔ item elevator-awkward (0.8943ms)
✔ item fish-cake-cart-asmr (0.8514ms)
✔ item gift-wrap-sprint (0.8183ms)
✔ item holiday-gift-swap-prompts (0.7756ms)
✔ item hoppang-fortune (1.0097ms)
✔ item hotteok-flip (0.9232ms)
✔ item kimbap-roll-timing (0.8105ms)
✔ item knit-sweater-depiller (0.8608ms)
✔ item lost-glove-bureau (0.8286ms)
✔ item midnight-snack-mission (0.8752ms)
✔ item migratory-bird-formation (0.8232ms)
✔ item mini-curling (0.808ms)
✔ item monday-alarm (0.9872ms)
✔ item new-year-countdown-clock (0.7922ms)
✔ item odd-bus-arrivals (0.7816ms)
✔ item ondol-pipe-puzzle (0.8622ms)
✔ item overseas-shopping-cost-calculator (1.2877ms)
✔ item paper-smoother (0.939ms)
✖ item pension-tax-credit-2026 (0.8164ms)
✔ item pocket-hand-warmer (0.7878ms)
✔ item popup-pileup (0.7767ms)
✔ item puffer-zip (0.7889ms)
✔ item ramen-wait (0.8133ms)
✔ item regex-playground (1.0012ms)
✔ item roast-sweet-potato (1.0409ms)
✔ item sauna-towel-hat-studio (0.7845ms)
✔ item scarf-untangler (0.7772ms)
✔ item sheep-roundup-2027 (0.9096ms)
✔ item snow-duck-maker (0.8877ms)
✔ item snowflake-to-universe (0.9883ms)
✔ item snowplow-puzzle (0.7798ms)
✔ item snowprint-puzzle (0.9455ms)
✔ item space-out-challenge (0.9164ms)
✔ item stacked-discount-calculator (0.7647ms)
✔ item strike-ball-challenge (0.8823ms)
✔ item tangerine-peel-puzzle (0.9111ms)
✔ item thin-ice-puddle (1.1424ms)
✔ item times-tables-speedrun (0.785ms)
✔ item trend-lifespan-fortune (0.8709ms)
✔ item twin-anmin (4.923ms)
✔ item twin-daewon (5.4023ms)
✔ item winter-fireside-radio (1.0046ms)
✔ item winter-laundry-puzzle (0.8548ms)
✔ item winter-shadow-lab (0.7585ms)
✔ item winter-snack-ladder (0.8815ms)
✔ item winter-star-connect (0.9491ms)
✔ item world-time-planner (0.925ms)
✔ item year-end-date-picker (0.8025ms)
✔ item year-end-receipt (1.1633ms)
(node:22792) ExperimentalWarning: SQLite is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
✔ voter ids are stable, per item, and hide the IP (6.144ms)
✔ like, switch, withdraw and repeat votes (2.215ms)
✔ counts and top list (2.1631ms)
ℹ tests 70
ℹ suites 0
ℹ pass 69
ℹ fail 1
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 166.9102

✖ failing tests:

test at test\items.test.mjs:15:3
✖ item pension-tax-credit-2026 (0.8164ms)
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
