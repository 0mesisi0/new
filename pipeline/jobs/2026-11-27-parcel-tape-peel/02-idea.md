# Idea and spec: 택배 테이프 쫙 뜯기 / Parcel Tape Peel

Agent: Claude (opus), planner. Design notes are merged in (palette, layout, motion).

## Concepts scored

Scores are 1–5 for: value in the first 10 seconds, originality, Korean search/share demand, and buildability in one HTML file. Maximum 20.

| Concept | Category | Score | Verdict |
|---|---|---|---|
| **택배 테이프 쫙 뜯기**: peel packing tape in one clean pull, open the box, peel off the shipping label and flatten the box for recycling | **cool** | **5/4/4/4 = 17** | **Picked.** Today is Black Friday (11/27) and December is peak parcel season. One clean pull of tape feels as good as the "texture play" trend in research #4, but the subject is new. It ends with a real 분리배출 tip. |
| 해시 눈사태 실험실: type text, change one letter and watch about half of the SHA-256 bits flip | tech | 3/4/2/5 = 14 | Good to have for learning, but weak in the first 10 seconds. Keep it for a tech slot. |
| 군밤 칼집 타이밍: score chestnuts before they go on the pan, or they pop | games | 4/2/3/4 = 13 | Too close to roast-sweet-potato and hotteok-flip (another street-snack timing game). Skip. |

Duplicate check: no existing or queued item is about parcels, boxes, packing tape or recycling. gift-wrap-* items are about wrapping presents. This one is about opening delivery boxes and taking them apart. bubble-wrap-popper is not reused: the box padding here is crumpled paper, not bubble wrap.

## Meta

- slug `parcel-tape-peel`, category `cool`, kind `game`, aspect `9/16`, date `2026-11-27`
- tags: ko `택배`, `분리배출`, `ASMR`; en `parcel`, `unboxing`, `satisfying`
- title: ko `택배 테이프 쫙 뜯기`; en `Parcel Tape Peel`
- desc ko: 택배 상자 테이프를 한 번에 쫙 뜯는 손맛! 상자를 열고 송장을 떼고 납작하게 펴서 분리배출까지, 오늘의 택배 10개를 정리해 보세요.
- desc en: That one clean pull of packing tape, ten times over. Peel, open, unpack, remove the label and flatten each box for recycling.
- howto ko: 테이프 끝의 접힌 탭을 잡고 테이프 방향으로 쭉 끌어요. 너무 빠르거나 옆으로 새면 찢어져요. 날개를 열고, 완충재를 치우고, 물건을 꺼내고, 송장을 뗀 뒤 상자를 꾹 눌러 납작하게! 키보드는 스페이스(길게 누르기)로 다음 동작을 해요.
- howto en: Grab the folded tab at the end of the tape and drag along the tape. Too fast or off to the side and it tears. Open the flaps, toss the padding, take out the item, peel the label, then press and hold to flatten. Keyboard: hold Space for the next action.
- about ko: 매일 같은 10개 상자가 나와서 친구와 기록을 비교할 수 있어요. 종이상자는 테이프와 송장을 떼고 펴서 내놓는 게 분리배출 기본이에요(지역 안내도 확인해 주세요). 송장 속 이름과 주소는 모두 가짜예요.
- about en: Everyone gets the same 10 boxes each day, so you can compare times. Real tip: remove tape and shipping labels and flatten cardboard before recycling (check your local rules). All label details are fake.

## Pitch

A kraft-paper box sits under a warm lamp on a doorstep mat, with its seam taped shut. You pinch the folded tab and pull. The tape lifts with a rising *chrrrk* sound, curls up behind your finger and comes off in one ribbon. That is the 10-second hook.

Each box is a short loop of satisfying steps:

1. tape
2. flaps
3. padding
4. a comically tiny item ("상자 대비 내용물 3%")
5. label
6. press it flat

The flattened box drops onto a recycling stack that grows on screen. Ten boxes make a round, and the result card shows your time, clean peels and total meters of tape peeled.

## Flow

1. **START**
   - Title, a one-line subtitle, today's date ("오늘의 택배 10개") and a big "언박싱 시작" button.
   - Behind them, a demo box is drawn with its tape half-curled, so the screenshot reads as "peel tape".
   - Lifetime counter: "지금까지 납작하게 만든 상자 {n}개". Hidden when n = 0.
   - Mute toggle at the top right.
2. **PLAY** (10 boxes; the timer starts on the first pointerdown on box 1)
   - HUD: box counter "3/10", timer mm:ss.s, and a step hint pill (e.g. "탭을 잡고 쭉 끌어요"). The stack and tape ball are in the corners.
   - Each box passes through these steps in a fixed order:
     1. **TAPE**: 1–3 strips (see Box table). Strips can be peeled in any order.
     2. **FLAPS**: 4 flaps. Tap a flap, or drag it outward more than 30 px, to fold it open (180 ms flip).
     3. **PADDING**: 1–3 crumpled paper balls. Tap one or flick it more than 40 px to toss it off-screen with a spin.
     4. **ITEM**: the item emoji pops up out of the box (scale 0 → 1.15 → 1) with the comment card "상자 대비 내용물 {pct}%". Tap to put it on the shelf (it flies to the top shelf row).
     5. **LABEL**: the shipping label lies on one long flap. It is visible from the start but only becomes interactive in this step. Drag from its dog-eared corner diagonally more than 60% of its diagonal. A tear is impossible here, because labels just peel.
     6. **FLATTEN**: press and hold on the box for 700 ms (a ring fills around the finger), or swipe down more than 25% of the box height. The box squashes (scaleY 1 → 0.08 with a squash-stretch), thumps and slides onto the stack.
   - The next box slides in from the right in 350 ms. Input is ignored during the slide.
3. **RESULT**
   - The timer stops when box 10 lands on the stack.
   - The card shows:
     - the time (big)
     - clean peels "{c}/{t}" and tears {k}
     - tape peeled "{m}m"
     - the 10 item emojis in a row
     - a title stamp (thump: scale 2 → 1 with a 4 px shake for 120 ms)
     - best time, with "새 기록!" when beaten
     - the recycling tip line
   - Buttons: [다시 하기] (big) and [기록 복사].

## Controls

- **Pointer** (pointer events only):
  - Peel: pointerdown within 44 px of a tab, then drag.
  - Flaps and padding: tap or flick.
  - Label: drag from its corner.
  - Flatten: hold or swipe down.
  - Releasing mid-peel leaves the tape partly lifted with the tab at the current point. Grab it again to resume. Releasing is not a tear.
- **Keyboard:**
  - Space or Enter runs the current step.
    - Tape: hold to peel the next strip at a safe 0.9 L/s. The keyboard never tears tape.
    - Flaps, padding and item: each press does one.
    - Label: hold for 600 ms.
    - Flatten: hold for 700 ms.
  - Enter on START starts the round. M toggles sound. R or Enter on RESULT restarts. C on RESULT copies.
- **Touch and layout:** `touch-action:none` on the play canvas. Call `preventDefault` on Space and the arrow keys. Every button is at least 48 px tall.

## Peel rules

These use the play canvas in CSS px. L = strip length and W = strip width (W = 11% of the box side, at least 18 px).

- **Grab:** pointerdown within max(44 px, 2W) of the strip's current tab point.
- **Progress:** p = projection of the pointer onto the strip axis ÷ L. p only increases. Pulling back holds the current value.
- **Tear** (checked every frame while grabbed). The strip tears if either:
  - the perpendicular distance from the axis is more than max(28 px, 1.8W), or
  - the peel speed, averaged over 80 ms, is more than 2.6 L/s.
- **On a tear:**
  - The peeled part comes off as a short piece and joins the tape ball.
  - The rest stays stuck with a new jagged tab at p.
  - tears += 1, and that strip is no longer clean.
  - Play a short "tick" snap and shake the box 3 px for 90 ms.
- **Done:** when p reaches 0.98, the strip flies to the tape ball.
  - If it had no tear, show a "한 번에 쫙!" / "One clean pull!" pop-text, add 6 sparkle particles, and count it as a clean peel.
- **Look:**
  - Stuck tape is translucent tan (#d9c48f at 85%) with a faint sheen line.
  - The peeled section is drawn as a curl: a quadratic curve from the peel point to the pointer, using a darker underside color (#bfa86e) and a soft shadow.
- **Meters:** each box has a fake real size (S 30 cm, M 40 cm, L 50 cm). Tape meters = Σ strip lengths in real cm ÷ 100, shown to one decimal.

## Boxes (same 10 every day)

- seed = FNV-1a 32-bit of the local date `YYYY-MM-DD`; PRNG = mulberry32(seed).
- Draw in this fixed order, per box:
  1. size
  2. tape pattern
  3. padding count (1–3)
  4. item index (no repeats within a round)
  5. pct (1–9)
  6. label fake name index
  7. tab end of each strip (which end)
- Difficulty by box number:

| Boxes | Sizes | Tape patterns |
|---|---|---|
| 1–3 | M or L | 일자 / Single strip along the seam |
| 4–7 | S, M or L | 일자 or 십자 / Cross (seam + one across the middle) |
| 8–10 | S, M or L | 십자 or H (seam + two across the ends) |

- Box side on screen = 0.55 / 0.68 / 0.80 × min(play width, 0.62 × play height).
- Kraft colors: face #c99a5b, edge #a97a40, seam line #8f6532. Each flap is a separate quad.

## Items

| emoji | ko | en |
|---|---|---|
| 🧦 | 양말 한 켤레 | A pair of socks |
| 🔋 | 건전지 2개 | Two batteries |
| 🖊️ | 볼펜 한 자루 | One pen |
| 🧴 | 핸드크림 | Hand cream |
| 🪥 | 칫솔 하나 | A toothbrush |
| 🍫 | 초콜릿 바 | A chocolate bar |
| 📎 | 클립 한 통 | A box of paper clips |
| 🕯️ | 작은 초 | A tiny candle |
| 🔌 | 충전 케이블 | A charging cable |
| 🍵 | 티백 3개 | Three tea bags |
| 🧸 | 손바닥 인형 | A palm-size plush |
| 📒 | 작은 수첩 | A little notebook |

Comment card: "{item} · 상자 대비 내용물 {pct}%" / "{item} · {pct}% of the box". If pct ≤ 2, add the line "완충재가 주인공이었네요" / "The padding was the real star".

## Shipping label (fake)

- A white rounded rect with a fake barcode (seeded bars) and these lines:
  - "받는 분 {name}"
  - "주소 ○○시 ○○구 ●●●"
  - "연락처 010-****-****"
- Fake names: 김○○, 이○○, 박○○, 최○○, 정○○, 한○○ (en: J. ○○, K. ○○, M. ○○, S. ○○, T. ○○, Y. ○○).
- No courier name and no logo. The header just says "택배 / PARCEL".
- After the first label peel of a round, a one-time hint toast appears: "송장은 떼서 버려요. 개인정보 보호도 돼요" / "Peel labels off before recycling. It protects your info, too."

## Result title tiers

| Condition | ko | en | emoji |
|---|---|---|---|
| 0 tears and time < 90 s | 분리배출 장인 | Recycling Master | ♻️ |
| 0 tears | 한 번에 쫙 전문가 | One-Pull Pro | ✨ |
| tears ≤ 3 | 꼼꼼한 언박서 | Tidy Unboxer | 📦 |
| tears ≤ 7 | 테이프와 씨름한 사람 | Wrestled the Tape | 🌀 |
| more | 테이프 뭉치 수집가 | Tape Ball Collector | 🧶 |

## Visual design

- **Palette:**
  - doorstep: a gradient from #2b2f3a to #3a3f4d
  - warm lamp spotlight: a radial gradient of #ffe3b0 at 18% over the box
  - mat #6b5a48
  - kraft and tape colors as above
  - accent green #3fb27f (recycle) and pop-text yellow #ffd45c
- **Corners:**
  - Top left: the shelf row for collected item emojis (32 px).
  - Top right: mute.
  - Bottom left: the recycling stack. Flattened boxes are drawn as offset sheets, each with ±3° random tilt. It grows upward, capped at 12 visible.
  - Bottom right: the tape ball. The circle radius grows with √(total strips) and is drawn as wound arcs.
- **Juice:**
  - Tape curl follows the finger.
  - 6 dust particles when a flap opens.
  - Paper balls spin out.
  - The flatten thump does a 4 px screen shake.
  - The step hint pill cross-fades.
- **Sizing:**
  - At 320 px wide: HUD font 14 px and box side capped so the tabs stay at least 44 px from the edges.
  - On wide screens: the play column is centered with a max width of 520 px, and the background fills the window.
- **Canvas:** DPR is capped at 2. Recompute the layout on `resize`, keeping each strip's p and the current step.
- **prefers-reduced-motion:** no screen shake, no spin, slides become 120 ms fades, and the stamp has no animation.

## Sound (off by default, Web Audio, starts only after a user gesture)

- **Tape rip:** a looping white-noise buffer through a bandpass filter.
  - Center frequency 900 Hz + 2,400 Hz × min(speed/2.6L, 1), Q 1.2.
  - Gain 0.02–0.09 following speed.
  - Stops 40 ms after the pointer stops.
- **Tear snap:** a 30 ms noise burst at 3 kHz, gain 0.08.
- **Flap:** a 60 ms lowpassed noise burst at 600 Hz, gain 0.06.
- **Paper crinkle:** 4 tiny noise ticks over 120 ms.
- **Item pop:** a sine sweep from 500 to 900 Hz over 90 ms, gain 0.06.
- **Flatten thump:** a 90 Hz sine for 100 ms with decay, gain 0.12.
- **Clean peel:** two-note sine chime, 880 → 1320 Hz, gain 0.05.
- The mute setting is persisted.

## Copy text

- Use `navigator.clipboard.writeText`, with a hidden textarea and `execCommand('copy')` as the fallback. Show a toast on success or failure.
- ko: 📦 오늘의 택배 10개 정리 {time} / 한 번에 쫙 {c}/{t} · 테이프 {m}m / 칭호: {emoji} {title} / play.mesisi.net
- en: 📦 Unboxed today's 10 parcels in {time} / Clean pulls {c}/{t} · {m}m of tape / Title: {emoji} {title} / play.mesisi.net

## Strings

| key | ko | en |
|---|---|---|
| appTitle | 택배 테이프 쫙 뜯기 | Parcel Tape Peel |
| startSub | 테이프 한 번에 쫙! 오늘의 택배 10개를 정리해요 | One clean pull. Unbox today's 10 parcels. |
| todayLabel | 오늘의 택배 10개 · {date} | Today's 10 parcels · {date} |
| startBtn | 언박싱 시작 | Start unboxing |
| lifetime | 지금까지 납작하게 만든 상자 {n}개 | Boxes flattened so far: {n} |
| boxCount | {i}/10 | {i}/10 |
| hintTape | 탭을 잡고 테이프 방향으로 쭉 | Grab the tab and pull along the tape |
| hintFlaps | 날개를 눌러 열어요 | Tap the flaps to open |
| hintPadding | 완충재를 휙 치워요 | Toss the padding |
| hintItem | 물건을 꺼내요 | Take out the item |
| hintLabel | 송장 모서리를 잡고 떼요 | Peel the label from its corner |
| hintFlatten | 꾹 눌러 납작하게 | Press and hold to flatten |
| cleanPop | 한 번에 쫙! | One clean pull! |
| tearPop | 찢어졌다! | Torn! |
| contentPct | 상자 대비 내용물 {pct}% | {pct}% of the box |
| paddingStar | 완충재가 주인공이었네요 | The padding was the real star |
| labelTip | 송장은 떼서 버려요. 개인정보 보호도 돼요 | Peel labels off before recycling. It protects your info, too. |
| labelHead | 택배 | PARCEL |
| labelTo | 받는 분 | To |
| labelAddr | 주소 | Address |
| labelPhone | 연락처 | Phone |
| resultHead | 오늘의 택배 정리 완료 | All parcels unboxed |
| resTime | 걸린 시간 | Time |
| resClean | 한 번에 쫙 | Clean pulls |
| resTears | 찢어진 횟수 | Tears |
| resTape | 뜯은 테이프 | Tape peeled |
| resBest | 최고 기록 {time} | Best {time} |
| newBest | 새 기록! | New best! |
| recycleTip | ♻️ 종이상자는 테이프·송장을 떼고 펴서 배출해요 | ♻️ Remove tape and labels, then flatten cardboard for recycling |
| again | 다시 하기 | Play again |
| copy | 기록 복사 | Copy result |
| copied / copyFail | 복사했어요 / 복사하지 못했어요 | Copied / Could not copy |
| soundOn / soundOff | 소리 켜기 / 소리 끄기 | Sound on / Sound off |
| keyHint | 키보드: 스페이스 길게 누르기 | Keyboard: hold Space |

## localStorage (in try/catch, prefix `ptp:`)

- `ptp:best`: best round time in ms
- `ptp:total`: lifetime count of boxes flattened. Increment it per box, so a partial round still counts.
- `ptp:sound`: "1" or "0", default "0"
- `ptp:tipShown`: "1" once the label tip toast has been seen. Show it again only if the key is missing.

## Edge cases

- Multi-touch: only the first active pointer drives the peel. Ignore other pointers until it is released.
- `pointercancel`, or a pointer leaving the canvas mid-peel, counts as a release, not a tear.
- Hidden tab: pause the timer and the loop, and clamp delta time to 50 ms on return. Do not count hidden time.
- Resize mid-peel: end the grab (as a release), then recompute the geometry while keeping p for every strip.
- The date rolls over at midnight mid-round: keep the round's boxes. A new seed applies only on restart.
- Restart fully resets the boxes, timer, tears, shelf, stack and tape ball. It keeps the sound setting and the lifetime total.
- When localStorage is blocked: everything works, with no best time and the lifetime line hidden.
- Keyboard and pointer mixed: whichever starts an action owns it until it ends.
- `location.hash === '#demo'`: show box 4 with its seam strip at p = 0.55 (curl visible), one strip already done, 3 sheets on the stack and a small tape ball. Freeze the timer at 0:21.4. This is for QA thumbnails only.

## Must not

- No network of any kind; aim for under 120 KB. Draw everything with canvas and emoji only (kind game: no raster images).
- No real courier, shopping-mall or brand names, logos or colors (no lookalike trucks or box prints), and no "Black Friday" text in the UI.
- No real-looking personal data on the label: the name, address and phone are always masked placeholders.
- No box cutters, knives or blades. Everything is opened by hand.
- Do not mock shoppers, delivery workers or any group. Do not shame anyone for ordering too much. The joke is only the tiny-item-in-a-huge-box ratio.
- Do not present the recycling line as an official rule beyond the general tip, and say to check local guidance in about.
- Do not reuse bubble wrap (it already exists as an item); the padding is crumpled paper only.
- No alert, confirm, prompt, window.open or navigation. No sound autoplay.
