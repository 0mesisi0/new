# Build failed

2026-11-25T13:21:42.064Z

```
npm test failed:

> test
> node --test test/*.test.mjs

✔ item after-party-escape (4.3555ms)
✔ item annual-leave-bridge (1.8529ms)
✔ item bear-hibernation (1.6651ms)
✔ item briquette-relay (1.6487ms)
✔ item bubble-wrap-popper (1.6168ms)
✔ item bungeoppang-budget (1.7797ms)
✔ item cat-vs-keyboard (1.6347ms)
✔ item chicken-leg-war (1.5898ms)
✔ item christmas-cake-price-compare (1.4474ms)
✔ item christmas-cake-slices (1.602ms)
✖ item christmas-long-weekend (0.8168ms)
✔ item clock-out (1.5959ms)
✔ item csat-after-plans (1.661ms)
✔ item dns-address-trace (1.5868ms)
✔ item dongji-dumpling-puzzle (1.3182ms)
✔ item draft-detective (1.2578ms)
✔ item elevator-awkward (1.2965ms)
✔ item fish-cake-cart-asmr (1.4515ms)
✔ item gift-wrap-sprint (1.6751ms)
✔ item holiday-gift-swap-prompts (1.2494ms)
✔ item hoppang-fortune (0.9943ms)
✔ item hotteok-flip (1.4442ms)
✔ item kimbap-roll-timing (1.2356ms)
✔ item knit-sweater-depiller (1.2483ms)
✔ item lost-glove-bureau (1.3618ms)
✔ item midnight-snack-mission (1.5433ms)
✔ item migratory-bird-formation (1.4297ms)
✔ item mini-curling (1.3021ms)
✔ item monday-alarm (1.2225ms)
✔ item new-year-countdown-clock (1.2186ms)
✔ item odd-bus-arrivals (1.3496ms)
✔ item ondol-pipe-puzzle (1.3301ms)
✔ item overseas-shopping-cost-calculator (1.6231ms)
✔ item paper-smoother (1.4979ms)
✔ item pocket-hand-warmer (1.2865ms)
✔ item popup-pileup (1.3605ms)
✔ item puffer-zip (1.28ms)
✔ item ramen-wait (1.3651ms)
✔ item regex-playground (1.6373ms)
✔ item sauna-towel-hat-studio (1.2034ms)
✔ item scarf-untangler (1.1928ms)
✔ item snow-duck-maker (1.2801ms)
✔ item snowplow-puzzle (1.6307ms)
✔ item snowprint-puzzle (1.2419ms)
✔ item stacked-discount-calculator (1.281ms)
✔ item strike-ball-challenge (1.6395ms)
✔ item tangerine-peel-puzzle (1.321ms)
✔ item thin-ice-puddle (1.414ms)
✔ item times-tables-speedrun (1.1718ms)
✔ item trend-lifespan-fortune (1.4923ms)
✔ item twin-anmin (5.4213ms)
✔ item twin-daewon (6.189ms)
✔ item winter-fireside-radio (1.7564ms)
✔ item winter-laundry-puzzle (1.3964ms)
✔ item winter-shadow-lab (1.4486ms)
✔ item winter-snack-ladder (1.5196ms)
✔ item year-end-date-picker (1.3648ms)
✔ item year-end-receipt (1.6724ms)
(node:37388) ExperimentalWarning: SQLite is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
✔ voter ids are stable, per item, and hide the IP (6.2288ms)
✔ like, switch, withdraw and repeat votes (2.1677ms)
✔ counts and top list (1.3944ms)
ℹ tests 61
ℹ suites 0
ℹ pass 60
ℹ fail 1
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 182.8437

✖ failing tests:

test at test\items.test.mjs:15:3
✖ item christmas-long-weekend (0.8168ms)
  AssertionError [ERR_ASSERTION]: en.desc length 185
      at TestContext.<anonymous> (file:///C:/work/haruhanpan/play/test/items.test.mjs:33:14)
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
