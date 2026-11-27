# Idea and spec: 유리 오너먼트 불기 / Glass Ornament Blower

Agent: Claude (opus), planner. Design notes are merged in (palette, layout, motion).

## Concepts scored

Scores are 1–5 for: value in the first 10 seconds, originality, Korean search/share demand, and buildability in one HTML file. Maximum 20.

| Concept | Category | Score | Verdict |
|---|---|---|---|
| 월세 세액공제 계산기 2026: rent, salary and home-ownership status in, expected credit and the money still claimable by 12월 31일 out | tools | 3/3/5/4 = 15 | High demand, but this would be the third tax tool in a row (the pension calculator is built and the card-deduction calculator is queued). The 2026 rules also need checking against the 국세청 source first. Keep it for January. |
| 송년회 장기자랑 미션 뽑기: draw a 10-second party mission card | random | 3/2/3/5 = 13 | Too close in shape to holiday-gift-swap-prompts. The demand is weak. |
| **유리 오너먼트 불기**: hold to blow a glowing glass bauble, stop before it bursts, color it and hang it on a small tree | **cool** | **5/4/4/4 = 17** | **Picked.** You get the tactile "hold… hold… stop!" tension within 2 seconds. It fits the experience-style Christmas-market mood (research row 9) without touching cake, gift, lights or window subjects. The finished tree is a screenshot card. |

Duplicate check: the subject is a hand-blown glass ornament. That is not lights (christmas-light-*), a snow globe (snow-globe-shake), gift wrap, cake or a window. The tree is only the display shelf for the ornaments. Nothing is about light strings.

## Meta

- slug `glass-ornament-blower`, category `cool`, kind `tool`, aspect `9/16`, date `2026-11-27`
- tags: ko `크리스마스 오너먼트`, `유리 공예`, `겨울`; en `christmas ornament`, `glassblowing`, `winter`
- title: ko `유리 오너먼트 불기`; en `Glass Ornament Blower`
- desc ko: 꾹 눌러 뜨거운 유리를 불어 크리스마스 오너먼트를 만들어요. 터지기 직전에 멈추고 색을 입혀 나만의 트리에 걸어 보세요.
- desc en: Press and hold to blow molten glass into a Christmas bauble. Stop before it bursts, add a color swirl and hang it on your own little tree.
- howto ko: 화면이나 '불기' 버튼을 꾹 누르면 유리가 부풀어요(스페이스도 돼요). 손을 떼면 멈춰요. 테두리가 떨리면 곧 터지니 조심하세요. 색과 무늬를 고르고 '트리에 걸기'를 누르면 끝! 트리가 다 차면 이미지로 저장할 수 있어요.
- howto en: Press and hold the screen or the Blow button (Space works too) to inflate the glass, and let go to stop. When the rim starts to wobble, it's about to burst. Pick a color and pattern, then tap Hang on tree. Save your tree as an image any time.
- about ko: 실제 유리 공예를 아주 단순하게 흉내 낸 겨울 장난감이에요. 진짜 유리는 1,000℃가 넘으니 집에서 따라 하지 마세요. 만든 트리는 이 기기에만 저장돼요.
- about en: A winter toy loosely inspired by real glassblowing. Real molten glass is over 1,000°C, so please don't try this at home. Your tree is saved only on this device.

## Pitch

An orange-glowing blob of glass sits on the tip of a long blowpipe in a cozy, dark workshop corner. Warm embers float in the background.

1. Hold to blow. The glob swells with a soft breathing sound and glows from orange to amber.
2. Each glob has a hidden burst size. Near it, the rim wobbles and a crackle ticks. Let go in time and the glass cools into a clear bauble. Hold too long and it pops into harmless sparkles. Then you try again with no penalty.
3. Pick one of 6 colors and one of 4 patterns, and watch the bauble cool and shimmer.
4. Hang it on a small tree with 12 hooks. Ornaments persist, and the tree becomes a shareable image.

You score nothing. A size grade on each ornament (S/M/L/"전설의 왕구슬") gives a soft goal and something to brag about.

## Flow

1. **START**
   - Title and the one-line subtitle "꾹 눌러 불고, 터지기 전에 멈추세요".
   - A preview of the tree with the ornaments hung so far, or an empty tree with a "첫 오너먼트를 걸어 보세요" note.
   - A big button "유리 불기 시작" and a smaller link-style button "내 트리 보기" (shown only when the tree has ≥1 ornament).
2. **BLOW**
   - Hold the pointer anywhere on the stage, or hold the "불기" button or Space.
   - Radius r grows from r0 = 18 to rMax = 130 logical px. The rate is 55 px/s at first and eases to 35 px/s past 70% of the burst size, so the timing stays readable.
   - The burst radius is a random value in [95, 128], hidden from the player.
   - At r ≥ burst − 14, show a warning: the rim wobbles (sine amplitude 1.5 → 4 px), a crackle tick plays every 120 ms, and the glow turns pale yellow.
   - Releasing at r < 40 does nothing: show the hint "조금 더 불어 주세요" for 1.2 s, and you can keep blowing.
   - Releasing at 40 ≤ r < burst finalizes the glob. Go to COOL.
   - Reaching r ≥ burst pops it. Go to POP.
3. **POP**
   - 24 sparkle particles burst out with a 4 px screen shake for 150 ms and a soft "pop" sound.
   - Show "펑! 유리가 너무 얇아졌어요" with the button "다시 불기".
   - Auto-ready after 0.8 s. A new burst radius is drawn.
   - Count pops in the session for a gentle line on the share text. Never show a fail count anywhere.
4. **COOL / DECORATE**
   - The glow fades from orange to clear glass over 1.2 s. With reduced motion, it happens instantly.
   - The grade label pops in.
   - A color row with 6 swatches and a pattern row with 4 chips: plain, swirl, stripes, dots. The bauble re-renders live.
   - Buttons: [트리에 걸기] (primary) and [다시 불기].
5. **HANG**
   - The bauble drops onto the next free hook with a 0.5 s ease-out and a small bounce.
   - Play a glass "ting" (from the color's pitch table).
   - Then show the TREE screen.
6. **TREE**
   - The tree shows 12 hooks, the filled ones carrying their ornaments with a slow twinkle highlight.
   - Bottom bar: [하나 더 불기] [이미지 저장] [트리 비우기].
   - When all 12 hooks are full, a star tops the tree with the banner "트리 완성! 🎄". [하나 더 불기] is then replaced by "가장 작은 것 바꾸기": the next ornament replaces the smallest one.
   - "트리 비우기" requires a second tap within 3 s. The button label turns to "한 번 더 누르면 비워져요". No confirm dialog.

## Controls

- **Pointer:** press and hold anywhere on the BLOW stage, or on the 불기 button. pointerup, pointercancel and pointerleave all count as release. Use `setPointerCapture` on the stage.
- **Keys in BLOW:** hold Space or Enter to blow, and release to stop. Ignore key repeat (`e.repeat`) for start/stop logic.
- **Keys in DECORATE:**
  - 1–6 pick a color, Q/W/E/R pick a pattern.
  - Enter hangs the ornament, Backspace re-blows.
  - ArrowLeft/ArrowRight move focus through the swatches.
- **Keys in TREE:** N blows another, S saves, and Delete pressed twice clears the tree.
- **Global:** M toggles sound. The stage uses `touch-action:none`, and `preventDefault` is called on Space and Enter while blowing.
- All buttons are ≥ 48 px tall. Swatches are 44 px circles with a visible focus ring.

## Grades (by final r)

| r | ko | en | emoji |
|---|---|---|---|
| 40–64 | 꼬마 방울 | Tiny Bauble | 🔹 |
| 65–89 | 반짝 방울 | Sparkle Bauble | ✨ |
| 90–109 | 왕방울 | Big Bauble | 🎐 |
| ≥ 110 | 전설의 왕구슬 | Legendary Giant Bauble | 🏆 |

The grade is shown under the bauble in DECORATE, and as a small badge in the TREE detail. Hanging size on the tree is mapped linearly: r 40–130 becomes 14–30 px.

## Colors and patterns

| # | ko | en | base hex | ting pitch |
|---|---|---|---|---|
| 1 | 루비 | Ruby | #d6334a | C6 1047 Hz |
| 2 | 금빛 | Gold | #e0a92e | D6 1175 Hz |
| 3 | 솔잎 | Pine | #2f9a6b | E6 1319 Hz |
| 4 | 겨울 하늘 | Winter Sky | #3d8fd6 | G6 1568 Hz |
| 5 | 자두 | Plum | #8a4fc1 | A6 1760 Hz |
| 6 | 눈 | Snow | #e9eef5 | C7 2093 Hz |

Patterns, all drawn on canvas and clipped to the bauble circle:

- **plain:** a radial gradient, plus a white specular highlight at the upper left (ellipse, 35% alpha).
- **swirl:** 3 spiral strokes in a lighter tint (base mixed 40% with white), 3 px wide, rotated by the ornament's seed.
- **stripes:** 5 horizontal bands that curve with the sphere (ellipse arcs).
- **dots:** 9 white dots at 70% alpha in a jittered grid.

Every ornament also gets a small silver cap and a hook loop at the top.

## Ornament record

`{ r, color: 1-6, pattern: 0-3, seed: uint32, ts }`

- The seed comes from `crypto.getRandomValues`, falling back to `Math.random`. It drives the swirl rotation, dot jitter and twinkle phase.
- The tree holds at most 12 records.

## Tree layout

- A stylized triangular fir, built from 3 stacked rounded triangles in #1f5a43 / #24684d / #2b7757, on a brown trunk.
- Logical canvas 360 × 520. The tree is centered.
- Hooks: a fixed array of 12 (x, y) points on gentle garland arcs, filled in order from the bottom row upward.
- The garland is a thin gold dotted path. It is decoration only and has no lights logic.
- Twinkle: each ornament's highlight alpha oscillates between 0.25 and 0.45 with a period of 3–5 s from its seed. Reduced motion turns this off.
- Star on completion: a 5-point gold star with a 0.6 s scale pop. Reduced motion shows it static.
- Under the tree: the line "{n}/12 오너먼트" in small gray text.

## Visual design

- **Palette:**
  - Workshop background: a radial gradient from #2a1d1a at the center to #120d0c.
  - Embers: #ff9a3c at 60% alpha.
  - Molten glass: a gradient from #ffb347 (core) to #ff6a1a (rim), with a 24 px outer glow (shadowBlur, capped).
  - UI ink #f6efe6, muted #b9a99a, primary button #e0453d, secondary button 15% white.
- **Blowpipe:** a long horizontal dark-metal rod (#55606b → #8a96a1) coming from the left edge, ending at the glob. On narrow screens it shortens.
- **Glob:** it is not a perfect circle while hot. 16-point polygon radius noise of ±2% that settles to 0 as it cools.
- **Embers:** about 40 particles rising slowly. Pause them when hidden. DPR is capped at 2.
- **Breathing feedback:** while held, the glob pulses +2% every 0.6 s, and a small 💨 puff emoji appears near the pipe end at 0.6 s intervals.
- **Layout:**
  - A single column, max width 480 px, centered. Embers fill the whole window.
  - At 320 px wide: 16 px padding. Swatches wrap to 2 rows of 3, and pattern chips to 2 rows of 2.
  - Stage sizing: scale = min(stageW / 360, stageH / 420).
- **prefers-reduced-motion:**
  - no shake, no wobble animation (show a static red rim outline as the warning instead)
  - no twinkle, an instant cool-down and 12 embers

## Sound (off by default, Web Audio after the first gesture)

- **Breath:** filtered noise (bandpass at 600 Hz, Q 0.8), gain ramped to 0.05 while held and 0 on release in 80 ms.
- **Crackle:** a 15 ms noise burst through a highpass at 3 kHz, gain 0.05, every 120 ms in the warning zone.
- **Pop:** a 60 ms noise burst plus a sine dropping from 300 to 80 Hz, gain 0.12.
- **Ting:** a sine at the color pitch plus a quiet sine at 2.01× that pitch, 0.9 s exponential decay, gain 0.08.
- **Mute:** the toggle 🔊/🔇 sits at the top right on every screen and is persisted.

## Export and copy

- **Save image:**
  - Offscreen canvas 720 × 1040 (2× the logical tree) with the workshop background gradient.
  - Title at the top: "{name}의 유리 트리" when a name is set. Name entry is skipped in v1, so this is always "나의 유리 오너먼트 트리 / My Glass Ornament Tree".
  - The count "{n}/12", and the watermark "play.mesisi.net" in 14 px muted text at the bottom right.
  - Export with `toBlob` and `<a download="glass-ornament-tree.png">`, then revoke the URL after 1 s.
  - On failure, show the toast "저장에 실패했어요. 화면을 캡처해 주세요".
- **Copy text** (small text button in the TREE bar, overflow row):
  - Use `navigator.clipboard.writeText`, falling back to a hidden textarea and `execCommand('copy')`. Show a toast on success or failure.
  - Share text ko: 🎄 유리 오너먼트 {n}개를 불어서 트리에 걸었어요! 제일 큰 건 {bestGrade} {bestEmoji} / play.mesisi.net
  - Share text en: 🎄 I blew {n} glass ornaments and hung them on my tree! Biggest: {bestGrade} {bestEmoji} / play.mesisi.net
  - If pops in the session are ≥ 3, append the line "(펑 터뜨린 건 비밀 🤫 / (The ones that popped are a secret 🤫)".

## Strings

| key | ko | en |
|---|---|---|
| appTitle | 유리 오너먼트 불기 | Glass Ornament Blower |
| startSub | 꾹 눌러 불고, 터지기 전에 멈추세요 | Hold to blow. Let go before it bursts. |
| startBtn | 유리 불기 시작 | Start blowing |
| viewTree | 내 트리 보기 | View my tree |
| emptyTree | 첫 오너먼트를 걸어 보세요 | Hang your first ornament |
| blow | 불기 | Blow |
| blowHint | 꾹 누르고 있으면 부풀어요 | Keep holding to inflate |
| tooSmall | 조금 더 불어 주세요 | Blow a little more |
| warn | 조심! 곧 터져요 | Careful! It's about to burst |
| popped | 펑! 유리가 너무 얇아졌어요 | Pop! The glass got too thin |
| reblow | 다시 불기 | Blow again |
| cooling | 유리를 식히는 중... | Cooling the glass... |
| colorLabel | 색 | Color |
| patternLabel | 무늬 | Pattern |
| patPlain / patSwirl / patStripes / patDots | 민무늬 / 소용돌이 / 줄무늬 / 물방울 | Plain / Swirl / Stripes / Dots |
| color1–6 | 루비 / 금빛 / 솔잎 / 겨울 하늘 / 자두 / 눈 | Ruby / Gold / Pine / Winter Sky / Plum / Snow |
| grade1–4 | 꼬마 방울 / 반짝 방울 / 왕방울 / 전설의 왕구슬 | Tiny Bauble / Sparkle Bauble / Big Bauble / Legendary Giant Bauble |
| hang | 트리에 걸기 | Hang on tree |
| another | 하나 더 불기 | Blow another |
| replaceSmallest | 가장 작은 것 바꾸기 | Replace the smallest |
| save | 이미지 저장 | Save image |
| copy | 텍스트 복사 | Copy text |
| clear | 트리 비우기 | Clear tree |
| clearConfirm | 한 번 더 누르면 비워져요 | Tap again to clear |
| cleared | 트리를 비웠어요 | Tree cleared |
| complete | 트리 완성! 🎄 | Tree complete! 🎄 |
| countLine | {n}/12 오너먼트 | {n}/12 ornaments |
| treeTitle | 나의 유리 오너먼트 트리 | My Glass Ornament Tree |
| saved / saveFail | 이미지를 저장했어요 / 저장에 실패했어요. 화면을 캡처해 주세요 | Image saved / Could not save. Please take a screenshot. |
| copied / copyFail | 복사했어요 / 복사하지 못했어요 | Copied / Could not copy |
| soundOn / soundOff | 소리 켜기 / 소리 끄기 | Sound on / Sound off |
| safety | 진짜 유리는 1,000℃가 넘어요. 집에서 따라 하지 마세요 | Real molten glass is over 1,000°C. Don't try this at home. |

The `safety` line is shown as a small footnote on START only.

## localStorage (in try/catch, prefix `gob:`)

- `gob:tree`: a JSON array of ornament records (max 12). Validate on load: it must be an array, and every field is range-checked (r 40–130, color 1–6, pattern 0–3, seed a number). Drop invalid entries, and treat broken JSON as an empty tree.
- `gob:sound`: "1" or "0", default "0".
- `gob:made`: the total number of ornaments ever hung (not shown in the UI).

## Edge cases

- **Release outside the stage or a lost window focus while holding:** treat it as a release. Handle `blur` and `pointercancel` too.
- **Page hidden while holding:** stop blowing immediately (count it as a release), pause the loop and clamp delta to 50 ms on return. The glob must never grow while hidden.
- **Multi-touch:** only the first active pointer counts. Ignore the others until it lifts.
- **Space held on the START screen:** starts BLOW but needs a fresh press to begin blowing. Do not carry key-hold across screens.
- **Double-tap on 트리에 걸기:** guard it with an `isHanging` flag, so one ornament is hung only once.
- **Resize mid-blow:** recompute the scale and keep r in logical units. Never reset the glob.
- **12/12 full:** "가장 작은 것 바꾸기" replaces the record with the smallest r. On a tie, replace the oldest by ts. The hook position is kept.
- **localStorage blocked:** everything works and the tree just lives for the session.
- **`location.hash === '#demo'`:** for QA thumbnails only. Load a fixed 9-ornament tree (mixed colors and patterns, fixed seeds, one ≥ 110) and open the TREE screen directly without touching storage.
- **Language:** `?lang`, then `navigator.language`, then ko. `<html lang>` is set to match.

## Must not

- No network of any kind, and no external fonts or images. Everything is drawn on canvas, with CSS and emoji.
- No real brands, shops, Christmas markets, or the look of any existing ornament maker or crafting game.
- No timer pressure, scores, leaderboards or fail counters on screen. The pop is gentle sparkles, never shards flying at the viewer, and no injury imagery.
- No instructional "how to blow glass" content beyond the safety footnote. No fire or heat realism that could read as a hazard demo.
- No religious text. The tree and star are seasonal decoration only.
- No alert, confirm, prompt, window.open or navigation. No sound autoplay. The page itself never scrolls.
