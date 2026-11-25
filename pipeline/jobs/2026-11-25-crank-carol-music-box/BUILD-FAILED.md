# Build failed

2026-11-25T05:16:40.826Z

```
npm test failed:

> test
> node --test test/*.test.mjs

✔ item after-party-escape (3.4138ms)
✔ item annual-leave-bridge (1.1214ms)
✔ item bear-hibernation (1.0895ms)
✔ item briquette-relay (1.0535ms)
✔ item bubble-wrap-popper (0.9892ms)
✔ item bungeoppang-budget (1.1316ms)
✔ item cat-vs-keyboard (1.1122ms)
✔ item chicken-leg-war (1.0398ms)
✔ item christmas-cake-price-compare (0.9709ms)
✔ item christmas-cake-slices (0.9435ms)
✖ item christmas-long-weekend (0.7702ms)
✔ item clock-out (1.1273ms)
✔ item crank-carol-music-box (1.2011ms)
✔ item csat-after-plans (0.8537ms)
✔ item dns-address-trace (0.8569ms)
✔ item dongji-dumpling-puzzle (0.8475ms)
✔ item draft-detective (0.8593ms)
✔ item elevator-awkward (1.1738ms)
✔ item fish-cake-cart-asmr (0.8723ms)
✔ item gift-wrap-sprint (0.8017ms)
✔ item holiday-gift-swap-prompts (0.7805ms)
✔ item hotteok-flip (0.8702ms)
✔ item kimbap-roll-timing (0.8036ms)
✔ item knit-sweater-depiller (0.8421ms)
✔ item lost-glove-bureau (0.7849ms)
✔ item midnight-snack-mission (0.9911ms)
✔ item migratory-bird-formation (0.8561ms)
✔ item mini-curling (0.7904ms)
✔ item monday-alarm (0.9276ms)
✔ item new-year-countdown-clock (0.8681ms)
✔ item odd-bus-arrivals (0.7696ms)
✔ item ondol-pipe-puzzle (0.8018ms)
✔ item overseas-shopping-cost-calculator (0.9644ms)
✔ item paper-smoother (0.9783ms)
✔ item pocket-hand-warmer (0.8973ms)
✔ item popup-pileup (0.8157ms)
✔ item puffer-zip (0.8856ms)
✔ item ramen-wait (0.8775ms)
✔ item regex-playground (1.4483ms)
✔ item sauna-towel-hat-studio (0.7999ms)
✔ item scarf-untangler (0.7869ms)
✔ item snow-duck-maker (0.9795ms)
✔ item snowplow-puzzle (0.8118ms)
✔ item snowprint-puzzle (0.9156ms)
✔ item stacked-discount-calculator (0.8701ms)
✔ item strike-ball-challenge (0.9184ms)
✔ item tangerine-peel-puzzle (0.7994ms)
✔ item thin-ice-puddle (0.911ms)
✔ item times-tables-speedrun (0.7861ms)
✔ item trend-lifespan-fortune (1.066ms)
✔ item twin-anmin (4.8387ms)
✔ item twin-daewon (5.5981ms)
✔ item winter-fireside-radio (1.0037ms)
✔ item winter-laundry-puzzle (0.8375ms)
✔ item winter-shadow-lab (0.8472ms)
✔ item winter-snack-ladder (0.972ms)
✔ item year-end-date-picker (0.8324ms)
✔ item year-end-receipt (1.1447ms)
(node:49492) ExperimentalWarning: SQLite is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
✔ voter ids are stable, per item, and hide the IP (5.8773ms)
✔ like, switch, withdraw and repeat votes (2.1729ms)
✔ counts and top list (2.1124ms)
ℹ tests 61
ℹ suites 0
ℹ pass 60
ℹ fail 1
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 155.259

✖ failing tests:

test at test\items.test.mjs:15:3
✖ item christmas-long-weekend (0.7702ms)
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
