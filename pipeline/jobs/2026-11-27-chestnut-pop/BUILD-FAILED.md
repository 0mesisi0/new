# Build failed

2026-11-27T09:54:41.877Z

```
npm test failed:
le-wrap-popper (1.0706ms)
✔ item bungeoppang-budget (1.0837ms)
✔ item cat-vs-keyboard (1.0179ms)
✔ item chestnut-pop (0.9788ms)
✔ item chicken-leg-war (1.0111ms)
✔ item christmas-cake-price-compare (0.9704ms)
✔ item christmas-cake-slices (0.8628ms)
✔ item christmas-long-weekend (1.2486ms)
✔ item clock-out (1.2247ms)
✔ item crank-carol-music-box (1.5978ms)
✔ item csat-after-plans (0.8788ms)
✔ item dns-address-trace (0.8827ms)
✔ item dongji-dumpling-puzzle (0.8182ms)
✔ item draft-detective (0.7908ms)
✔ item elevator-awkward (0.925ms)
✔ item fish-cake-cart-asmr (0.8134ms)
✔ item gift-wrap-sprint (0.8118ms)
✔ item holiday-gift-swap-prompts (0.7736ms)
✔ item hoppang-fortune (0.9941ms)
✔ item hotteok-flip (0.9076ms)
✔ item kimbap-roll-timing (0.8148ms)
✔ item knit-sweater-depiller (0.8665ms)
✔ item lost-glove-bureau (0.8195ms)
✔ item midnight-snack-mission (0.9119ms)
✔ item migratory-bird-formation (1.0648ms)
✔ item mini-curling (0.8506ms)
✔ item monday-alarm (1.0421ms)
✔ item new-year-countdown-clock (0.7833ms)
✔ item odd-bus-arrivals (0.7905ms)
✔ item ondol-pipe-puzzle (0.8824ms)
✔ item overseas-shopping-cost-calculator (1.1508ms)
✔ item paper-smoother (0.9071ms)
✖ item pension-tax-credit-2026 (0.7855ms)
✔ item pocket-hand-warmer (0.7964ms)
✔ item popup-pileup (0.7889ms)
✔ item puffer-zip (0.8035ms)
✔ item ramen-wait (0.8179ms)
✔ item regex-playground (1.013ms)
✔ item roast-sweet-potato (0.9845ms)
✔ item sauna-towel-hat-studio (0.7909ms)
✔ item scarf-untangler (0.759ms)
✔ item sheep-roundup-2027 (1.0029ms)
✔ item snow-duck-maker (0.9373ms)
✔ item snowflake-to-universe (1.0305ms)
✔ item snowplow-puzzle (0.7956ms)
✔ item snowprint-puzzle (0.9414ms)
✔ item space-out-challenge (0.9245ms)
✔ item stacked-discount-calculator (0.7582ms)
✔ item strike-ball-challenge (0.9064ms)
✔ item tangerine-peel-puzzle (0.8681ms)
✔ item thin-ice-puddle (1.0841ms)
✔ item times-tables-speedrun (0.7892ms)
✔ item trend-lifespan-fortune (0.8942ms)
✔ item twin-anmin (5.1712ms)
✔ item twin-daewon (5.736ms)
✔ item winter-fireside-radio (1.0099ms)
✔ item winter-laundry-puzzle (0.8919ms)
✔ item winter-shadow-lab (0.7542ms)
✔ item winter-snack-ladder (0.8902ms)
✔ item winter-star-connect (0.9495ms)
✔ item world-time-planner (0.9838ms)
✔ item year-end-date-picker (0.7955ms)
✔ item year-end-receipt (1.1147ms)
(node:4780) ExperimentalWarning: SQLite is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
✔ voter ids are stable, per item, and hide the IP (6.1314ms)
✔ like, switch, withdraw and repeat votes (2.1903ms)
✔ counts and top list (2.0368ms)
ℹ tests 70
ℹ suites 0
ℹ pass 69
ℹ fail 1
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 166.2992

✖ failing tests:

test at test\items.test.mjs:15:3
✖ item pension-tax-credit-2026 (0.7855ms)
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
