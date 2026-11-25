# Build failed

2026-11-25T05:10:35.773Z

```
npm test failed:

> test
> node --test test/*.test.mjs

✔ item after-party-escape (7.234ms)
✔ item annual-leave-bridge (2.1062ms)
✔ item bear-hibernation (6.0043ms)
✔ item briquette-relay (1.5851ms)
✔ item bubble-wrap-popper (1.3895ms)
✔ item bungeoppang-budget (1.5811ms)
✔ item cat-vs-keyboard (1.2663ms)
✔ item chicken-leg-war (1.1117ms)
✔ item christmas-cake-price-compare (1.0343ms)
✔ item christmas-cake-slices (1.088ms)
✖ item christmas-long-weekend (1.1074ms)
✔ item clock-out (1.2553ms)
✔ item crank-carol-music-box (1.0697ms)
✔ item csat-after-plans (0.915ms)
✔ item dns-address-trace (0.9792ms)
✔ item dongji-dumpling-puzzle (1.0559ms)
✔ item draft-detective (0.9884ms)
✔ item elevator-awkward (1.5823ms)
✔ item fish-cake-cart-asmr (0.9219ms)
✔ item gift-wrap-sprint (0.7999ms)
✔ item holiday-gift-swap-prompts (0.7715ms)
✔ item hotteok-flip (0.8689ms)
✔ item kimbap-roll-timing (0.7763ms)
✔ item knit-sweater-depiller (0.8252ms)
✔ item lost-glove-bureau (0.7878ms)
✔ item midnight-snack-mission (0.9805ms)
✔ item migratory-bird-formation (0.8669ms)
✔ item mini-curling (0.7734ms)
✔ item monday-alarm (0.9079ms)
✔ item new-year-countdown-clock (0.8355ms)
✔ item odd-bus-arrivals (0.7611ms)
✔ item ondol-pipe-puzzle (0.8761ms)
✔ item overseas-shopping-cost-calculator (1.1607ms)
✔ item paper-smoother (1.0173ms)
✔ item pocket-hand-warmer (0.8396ms)
✔ item popup-pileup (0.8281ms)
✔ item puffer-zip (0.8684ms)
✔ item ramen-wait (0.8818ms)
✔ item regex-playground (1.5373ms)
✔ item sauna-towel-hat-studio (0.8013ms)
✔ item scarf-untangler (0.7647ms)
✔ item snow-duck-maker (0.9137ms)
✔ item snowplow-puzzle (0.8018ms)
✔ item snowprint-puzzle (0.8927ms)
✔ item stacked-discount-calculator (0.8077ms)
✔ item strike-ball-challenge (0.9489ms)
✔ item tangerine-peel-puzzle (0.8487ms)
✔ item thin-ice-puddle (0.9ms)
✔ item times-tables-speedrun (0.8253ms)
✔ item trend-lifespan-fortune (1.0746ms)
✔ item twin-anmin (4.9135ms)
✔ item twin-daewon (5.8966ms)
✔ item winter-fireside-radio (1.0758ms)
✔ item winter-laundry-puzzle (0.8526ms)
✔ item winter-shadow-lab (0.8735ms)
✔ item winter-snack-ladder (0.9909ms)
✔ item year-end-date-picker (0.8221ms)
✔ item year-end-receipt (1.1448ms)
(node:47836) ExperimentalWarning: SQLite is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
✔ voter ids are stable, per item, and hide the IP (9.9961ms)
✔ like, switch, withdraw and repeat votes (2.6854ms)
✔ counts and top list (2.3086ms)
ℹ tests 61
ℹ suites 0
ℹ pass 60
ℹ fail 1
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 200.7043

✖ failing tests:

test at test\items.test.mjs:15:3
✖ item christmas-long-weekend (1.1074ms)
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
