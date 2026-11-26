# Build failed

2026-11-26T18:15:12.275Z

```
npm test failed:
e-wrap-popper (1.1975ms)
✔ item bungeoppang-budget (1.2116ms)
✔ item cat-vs-keyboard (1.0687ms)
✔ item chicken-leg-war (1.0447ms)
✔ item christmas-cake-price-compare (1.0161ms)
✔ item christmas-cake-slices (1.0335ms)
✔ item christmas-long-weekend (1.1592ms)
✔ item clock-out (1.1701ms)
✔ item crank-carol-music-box (1.1812ms)
✔ item csat-after-plans (0.8618ms)
✔ item dns-address-trace (1.3722ms)
✔ item dongji-dumpling-puzzle (1.0011ms)
✔ item draft-detective (0.917ms)
✔ item elevator-awkward (1.0225ms)
✔ item endless-toast (0.9277ms)
✔ item fish-cake-cart-asmr (0.8933ms)
✔ item gift-wrap-sprint (0.8931ms)
✔ item holiday-gift-swap-prompts (0.8353ms)
✔ item hoppang-fortune (1.0064ms)
✔ item hotteok-flip (0.9531ms)
✔ item kimbap-roll-timing (0.8517ms)
✔ item knit-sweater-depiller (0.9388ms)
✔ item lost-glove-bureau (0.8943ms)
✔ item midnight-snack-mission (0.9381ms)
✔ item migratory-bird-formation (0.8882ms)
✔ item mini-curling (0.8814ms)
✔ item monday-alarm (1.0394ms)
✔ item new-year-countdown-clock (0.8659ms)
✔ item odd-bus-arrivals (0.8964ms)
✔ item ondol-pipe-puzzle (0.9053ms)
✔ item overseas-shopping-cost-calculator (0.8546ms)
✔ item paper-smoother (1.5177ms)
✖ item pension-tax-credit-2026 (0.8768ms)
✔ item pocket-hand-warmer (0.843ms)
✔ item popup-pileup (0.8462ms)
✔ item puffer-zip (0.8519ms)
✔ item ramen-wait (0.896ms)
✔ item regex-playground (1.153ms)
✔ item roast-sweet-potato (1.0293ms)
✔ item sauna-towel-hat-studio (0.8612ms)
✔ item scarf-untangler (0.8286ms)
✔ item sheep-roundup-2027 (0.9543ms)
✔ item snow-duck-maker (0.9373ms)
✔ item snowflake-to-universe (1.0493ms)
✔ item snowplow-puzzle (0.8736ms)
✔ item snowprint-puzzle (0.9673ms)
✔ item space-out-challenge (1.0326ms)
✔ item stacked-discount-calculator (1.0288ms)
✔ item strike-ball-challenge (0.9778ms)
✔ item tangerine-peel-puzzle (0.9289ms)
✔ item thin-ice-puddle (1.2153ms)
✔ item times-tables-speedrun (0.8612ms)
✔ item trend-lifespan-fortune (0.9518ms)
✔ item twin-anmin (5.0105ms)
✔ item twin-daewon (5.7957ms)
✔ item winter-fireside-radio (1.0548ms)
✔ item winter-laundry-puzzle (0.8979ms)
✔ item winter-shadow-lab (0.8653ms)
✔ item winter-snack-ladder (0.9866ms)
✔ item winter-star-connect (1.1001ms)
✔ item world-time-planner (1.0184ms)
✔ item year-end-date-picker (0.9276ms)
✔ item year-end-receipt (1.1422ms)
(node:25680) ExperimentalWarning: SQLite is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
✔ voter ids are stable, per item, and hide the IP (6.1461ms)
✔ like, switch, withdraw and repeat votes (2.8894ms)
✔ counts and top list (2.462ms)
ℹ tests 70
ℹ suites 0
ℹ pass 69
ℹ fail 1
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 172.7905

✖ failing tests:

test at test\items.test.mjs:15:3
✖ item pension-tax-credit-2026 (0.8768ms)
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
