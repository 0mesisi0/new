# Build failed

2026-11-26T18:42:25.035Z

```
npm test failed:
le-wrap-popper (1.3797ms)
✔ item bungeoppang-budget (1.121ms)
✔ item cat-vs-keyboard (1.0331ms)
✔ item chicken-leg-war (0.9981ms)
✔ item christmas-cake-price-compare (0.9511ms)
✔ item christmas-cake-slices (0.9574ms)
✔ item christmas-long-weekend (1.0748ms)
✔ item clock-out (1.1183ms)
✔ item crank-carol-music-box (1.0112ms)
✔ item csat-after-plans (0.8683ms)
✔ item dns-address-trace (1.4515ms)
✔ item dongji-dumpling-puzzle (1.0779ms)
✔ item draft-detective (0.8326ms)
✔ item elevator-awkward (0.9309ms)
✔ item fish-cake-cart-asmr (0.8374ms)
✔ item gift-wrap-sprint (1.0628ms)
✔ item holiday-gift-swap-prompts (0.8469ms)
✔ item hoppang-fortune (0.9771ms)
✔ item hotteok-flip (0.9454ms)
✔ item kimbap-roll-timing (0.8782ms)
✔ item knit-sweater-depiller (0.8382ms)
✔ item lost-glove-bureau (0.8337ms)
✔ item midnight-snack-mission (0.9184ms)
✔ item migratory-bird-formation (0.8645ms)
✔ item mini-curling (0.827ms)
✔ item monday-alarm (0.9095ms)
✔ item new-year-countdown-clock (0.9268ms)
✔ item odd-bus-arrivals (0.808ms)
✔ item ondol-pipe-puzzle (0.8298ms)
✔ item overseas-shopping-cost-calculator (0.8627ms)
✔ item paper-smoother (0.9543ms)
✖ item pension-tax-credit-2026 (0.7963ms)
✔ item pocket-hand-warmer (1.1479ms)
✔ item popup-pileup (0.8ms)
✔ item puffer-zip (0.8134ms)
✔ item ramen-wait (0.8797ms)
✔ item regex-playground (1.0035ms)
✔ item roast-sweet-potato (0.929ms)
✔ item sauna-towel-hat-studio (0.8398ms)
✔ item scarf-untangler (0.806ms)
✔ item sheep-roundup-2027 (0.9095ms)
✔ item snow-crystal-lab (0.8166ms)
✔ item snow-duck-maker (0.9029ms)
✔ item snowflake-to-universe (1.0066ms)
✔ item snowplow-puzzle (0.7619ms)
✔ item snowprint-puzzle (0.9237ms)
✔ item space-out-challenge (0.9099ms)
✔ item stacked-discount-calculator (0.7465ms)
✔ item strike-ball-challenge (0.9028ms)
✔ item tangerine-peel-puzzle (0.8472ms)
✔ item thin-ice-puddle (0.8765ms)
✔ item times-tables-speedrun (0.7919ms)
✔ item trend-lifespan-fortune (1.3624ms)
✔ item twin-anmin (5.0498ms)
✔ item twin-daewon (5.3258ms)
✔ item winter-fireside-radio (1.0939ms)
✔ item winter-laundry-puzzle (0.9939ms)
✔ item winter-shadow-lab (0.7976ms)
✔ item winter-snack-ladder (0.9493ms)
✔ item winter-star-connect (0.9808ms)
✔ item world-time-planner (1.0007ms)
✔ item year-end-date-picker (0.8182ms)
✔ item year-end-receipt (1.1132ms)
(node:33964) ExperimentalWarning: SQLite is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
✔ voter ids are stable, per item, and hide the IP (5.788ms)
✔ like, switch, withdraw and repeat votes (2.4763ms)
✔ counts and top list (2.0142ms)
ℹ tests 70
ℹ suites 0
ℹ pass 69
ℹ fail 1
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 168.1119

✖ failing tests:

test at test\items.test.mjs:15:3
✖ item pension-tax-credit-2026 (0.7963ms)
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
