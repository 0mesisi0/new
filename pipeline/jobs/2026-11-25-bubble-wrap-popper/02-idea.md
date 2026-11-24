# Idea and spec: 뽁뽁이 터뜨리기 / Bubble Wrap Popper

Agent: Claude (opus), planner. Design notes are merged in (palette, layout, motion, sound).

## Concepts scored

Scores are 1–5 for: fun in the first 10 seconds, originality, Korean search/share demand, and buildability in one HTML file. Maximum 20.

The three research directions are already queued: a look-away snack game (`midnight-snack-mission`), an annual-leave calculator (`annual-leave-bridge`) and a trend fortune (`trend-lifespan-fortune`). Each concept below has a new subject.

| Concept | Category | Score | Verdict |
|---|---|---|---|
| 연말정산 미리보기 체크리스트 / Year-End Tax Prep Checklist | info | 3/2/5/3 = 13 | Strong December searches, but real tax rules change and a wrong number would hurt. Too risky for a toy site. Skip it. |
| 사람 인증 이상한 캡차 / Prove You're Human (absurd CAPTCHA) | weird | 4/4/3/4 = 15 | Fits the Webby "Weird" trend. The jokes need a lot of copywriting, and Korean search demand is low. Keep for later. |
| **뽁뽁이 터뜨리기 / Bubble Wrap Popper** | **cool** | **5/3/5/5 = 18** | **Picked.** It is tactile, fun from the first tap, and matches the 2026 "texture play" short-form trend. 뽁뽁이 on windows is a Korean winter habit, and "뽁뽁이 터뜨리기" is a real search term. It is easy to build well on canvas. |

## Meta

- slug `bubble-wrap-popper`, category `cool`, kind `tool`, aspect `9/16`, date `2026-11-25`
- kind is `tool` because this is an endless toy with no game over. It still draws only with canvas and CSS (no raster files), so it stays sharp and loads instantly.
- tags: ko `뽁뽁이`, `스트레스 해소`; en `bubble wrap`, `fidget`
- title: ko `뽁뽁이 터뜨리기`; en `Bubble Wrap Popper`
- desc ko: 겨울 창문에 붙인 뽁뽁이를 마음껏 터뜨려 보세요. 톡 누르면 뽁, 쭉 문지르면 뽁뽁뽁! 가끔 나오는 황금 뽁뽁이도 찾아보세요.
- desc en: Pop the bubble wrap taped to a frosty winter window. Tap for one pop, swipe for a whole row, and hunt for the rare golden bubble.
- howto ko: 뽁뽁이를 누르면 터져요. 손가락이나 마우스로 쭉 문지르면 여러 개가 한 번에 터져요. 한 장을 다 터뜨리면 새 뽁뽁이가 붙어요. 키보드는 방향키로 이동하고 Space로 터뜨려요. N은 새 장, M은 소리 끄기예요.
- howto en: Tap a bubble to pop it, or drag across the sheet to pop a whole row. Finish a sheet and a fresh one gets taped up. Keyboard: arrow keys move, Space pops, N gives a new sheet, M mutes.
- about ko: 모든 소리는 브라우저가 그 자리에서 만들어요. 진짜 창문 뽁뽁이는 터뜨리지 마세요. 단열 효과가 줄어요! 기록은 이 기기에만 저장돼요.
- about en: Every pop sound is synthesized live in your browser. Please don't pop the bubble wrap on your real windows, because it stops keeping the cold out. Your counts stay on this device.

## Pitch

It is a winter night. A frosted window shows snow falling outside, and a sheet of clear bubble wrap is taped over the glass with two strips of masking tape.

1. Tap a bubble and it squishes, then pops with a crisp, slightly different sound each time.
2. Drag across the sheet and every bubble on the path pops in a rapid "뽁뽁뽁" run.
3. About 1 bubble in 150 is golden. It pops with a bright chord and a sparkle burst, and goes into your golden collection.
4. Pop every bubble and the sheet peels off with a "한 장 완료!" banner. A fresh sheet is taped up.

Live counters show today's pops, total pops, finished sheets and golden bubbles. You can copy a share line.

## Flow

There is no start screen and no game over. It is a toy that works from the first tap.

1. **LOAD**
   - The window scene and a full sheet appear right away.
   - A soft hint bubble near the sheet center says "눌러 보세요 👆 / Tap me 👆". It fades after the first pop and does not come back in that session.
   - The hint also gently pulses one bubble, with a scale of 1→1.06 over a 1.2 s loop.
2. **POPPING**
   - Popping is free. The counters update live.
   - After every 100 pops in a session, a small toast shows a random milestone line from the pool.
3. **SHEET COMPLETE**
   - When the last bubble pops, wait 300 ms. Then the banner "한 장 완료! / Sheet done!" drops in, and the sheet counter increments.
   - The old sheet slides down and off with a slight rotation (600 ms).
   - The new sheet is "taped" in: it slides down from above (500 ms), and two tape strips stamp on.
   - Input is ignored during the 1.1 s swap.
4. **NEW SHEET ANYTIME**
   - The "새 장" button swaps the sheet immediately with the same animation. A partly popped sheet is not counted as done.

## Controls

- **Pointer:** use pointer events with multi-touch. Track each `pointerId` separately.
  - On `pointerdown`, pop the bubble under the pointer.
  - On `pointermove` while down, pop every bubble whose center is within radius × 0.9 of the segment from the previous point to the current one. Sweep the segment so fast swipes do not skip bubbles.
  - Use `setPointerCapture` and handle `pointercancel`.
- **Keys:** arrow keys move a visible focus ring across the grid (hex neighbors: left/right in the row, up/down to the nearest bubble in the adjacent row). Space or Enter pops the bubble in focus. N gives a new sheet, M toggles sound, C copies the share line.
  - The focus ring appears only after the first key press.
  - Call `preventDefault` on all of these keys.
- **Touch and layout:**
  - The canvas has `touch-action:none`. The page never scrolls or zooms.
  - The top bar buttons are at least 44 px tall.
- **Haptics:** call `navigator.vibrate(6)` on each pop when it is supported and sound is on. A golden pop uses `vibrate([10,30,10])`. Wrap it in try/catch.

## Sheet and bubbles

- **Sheet rectangle:** it fills the area under the top bar, with a 16 px margin and a max width of 520 px, centered.
- **Grid (fixed per sheet):**
  - At sheet creation, cols = clamp(round(sheetW / 52), 6, 12).
  - r = sheetW / (cols × 2 + 1) × 0.92.
  - Rows are hex-packed: odd rows are offset by half a pitch, and the row step is pitch × 0.866.
  - rows = floor(available height / row step).
  - Store the grid in normalized sheet coordinates, so a resize only rescales and never re-lays out. A new layout happens only on a new sheet.
- **Bubble state:** `0` is whole, `1` is popping (animating), `2` is popped. Golden is a per-bubble flag.
  - When a sheet is created, each bubble is golden with p = 1/150, from `Math.random`.
  - If the sheet has no golden bubble, every 5th consecutive sheet guarantees one.
- **Drawing a whole bubble:**
  - a radial gradient: center rgba(255,255,255,0.35) to edge rgba(200,225,255,0.12)
  - a 1.5 px rim rgba(255,255,255,0.55)
  - a small white highlight ellipse at the top-left (−0.35r, −0.35r)
- **Drawing a popped bubble:**
  - a flat, slightly darker disc at 0.85r
  - 2–3 short crinkle strokes at random angles, fixed per bubble from its index
  - no highlight
- **Golden bubble:** the same shape with a warm #ffd56a tint and a slow shimmer, where the highlight alpha follows a sine over 2 s.
- **Pop animation (180 ms):**
  - scale 1 → 0.82 squish for 60 ms, a quick 1.12 burst for 40 ms, then settle at the flat popped look
  - 4–6 tiny air particles fly out for 300 ms
  - a golden pop adds 18 star particles and a 1.5 px screen shake for 120 ms
- **Sheet edges:** a slightly lighter transparent sheet with a 6 px border band. Two beige masking-tape strips #e9dcb8 at 80% alpha sit at the top corners, rotated ±6°.

## Scene and visual design

- **Palette:**
  - room wall #1e2638
  - window frame #3b4660
  - night outside: a gradient from #0f1a33 to #26375e
  - frost: white at 6–18% in corner blobs
  - snow: white at 75% alpha
  - UI text #eef2fa, accent #7fc8ff, golden #ffd56a
- **Window:**
  - The window fills the play area with a 10 px frame and a center mullion line behind the sheet.
  - Frost blobs sit in the corners. A background canvas has 50 snow particles with sine drift.
  - DPR is capped at 2. Snow pauses when `document.hidden`.
- **Top bar (one row):**
  - left: the counters `뽁 1,234 · 📄 3 · ✨ 1` (today's pops, sheets, golden)
  - right: the buttons [새 장] [🔊/🔇] [📋]
  - At 320 px wide the counters shrink to 13 px and the buttons stay at 44 px squares.
- **Banner and toast:**
  - The "한 장 완료!" banner is a centered pill, 22 px bold, with a pop scale of 0.6 → 1.
  - Toasts appear at the bottom center for 1.6 s.
  - An `aria-live="polite"` region mirrors the banner and toast text.
- **Wide screens:** the sheet is centered at a max width of 520 px, and the window and snow cover the whole viewport.
- **prefers-reduced-motion:**
  - no shake, no particles and no sheet slide (it cross-fades for 200 ms)
  - 15 slow snow particles
  - the pop is an instant switch to the popped look

## Sound (on by default, but only after the first user gesture)

- Create the `AudioContext` lazily on the first `pointerdown` or `keydown`. Never play sound before that.
- **Pop:**
  - a white-noise buffer burst of 35–55 ms through a bandpass at a random 1.4–3.2 kHz (Q 1.2), with gain 0.22 and an exponential decay
  - plus a 20 ms sine thump at a random 110–170 Hz, gain 0.10
  - Detune each pop randomly so no two sound the same.
- **Golden pop:** a normal pop plus a 3-note sine arpeggio (C6, E6, G6), 60 ms apart, gain 0.06 each.
- **Sheet done:** a soft two-note chime (G5 → C6), 120 ms each, gain 0.07.
- **Tape:** a 60 ms low-passed noise "rip" at 600 Hz, gain 0.05.
- **Limits:** at most 10 overlapping pop voices, and the oldest is dropped. During a drag, play at most one pop sound per 18 ms. Any extra pops still count and animate.
- The mute setting is persisted.

## Milestone toast pool (every 100 pops in a session, random pick, no immediate repeat)

| ko | en |
|---|---|
| 방금 그 뽁, 꽤 좋은 소리였어요 | That last pop sounded really good |
| 손끝 스트레스 −100 | Fingertip stress −100 |
| 이 정도면 뽁뽁이 장인 | Certified bubble wrap artisan |
| 창밖 눈도 구경하고 있어요 | The snow outside is watching too |
| 오늘의 뽁, 순조롭게 진행 중 | Today's popping is going smoothly |
| 손가락은 따뜻하게 해 주세요 | Keep those fingers warm |
| 뽁 소리는 무한 리필이에요 | Pops are free refills |
| 한숨 대신 뽁 한 번 | One pop instead of one sigh |

## Share text (copy)

- ko: `🫧 오늘 뽁뽁이 {today}개 터뜨렸어요 · 완성 {sheets}장 · 황금 뽁뽁이 {gold}개 / play.mesisi.net`
- en: `🫧 I popped {today} bubbles today · {sheets} sheets done · {gold} golden / play.mesisi.net`
- Copy with `navigator.clipboard.writeText`, falling back to a hidden textarea and `execCommand('copy')`. Show a toast on success or failure. Never use `alert`.

## Strings

| key | ko | en |
|---|---|---|
| appTitle | 뽁뽁이 터뜨리기 | Bubble Wrap Popper |
| hint | 눌러 보세요 👆 | Tap me 👆 |
| hintDrag | 쭉 문지르면 한 번에 뽁뽁뽁 | Drag to pop a whole row |
| statPops | 뽁 {n} | Pops {n} |
| statSheets | 📄 {n} | 📄 {n} |
| statGold | ✨ {n} | ✨ {n} |
| statLabel | 오늘 터뜨린 수, 완성한 장, 황금 뽁뽁이 | Pops today, sheets done, golden bubbles |
| newSheet | 새 장 | New sheet |
| soundOn / soundOff | 소리 켜기 / 소리 끄기 | Sound on / Sound off |
| copy | 기록 복사 | Copy stats |
| copied / copyFail | 복사했어요 / 복사하지 못했어요 | Copied / Could not copy |
| sheetDone | 한 장 완료! | Sheet done! |
| newTaped | 새 뽁뽁이를 붙였어요 | Fresh sheet taped up |
| goldFound | ✨ 황금 뽁뽁이 발견! | ✨ Golden bubble found! |
| goldFirst | 첫 황금 뽁뽁이예요! | Your first golden bubble! |
| totalTip | 지금까지 총 {n}개 | {n} popped all time |
| canvasLabel | 뽁뽁이 시트. 누르거나 문질러서 터뜨리세요 | Bubble wrap sheet. Tap or drag to pop |
| kbHint | 방향키 이동 · Space 뽁 · N 새 장 · M 소리 | Arrows move · Space pops · N new sheet · M sound |

- `hintDrag` shows once, as a toast after the 5th single-tap pop, if the user has not dragged yet.
- `totalTip` shows inside the copy toast and as the `title` on the counters.

## localStorage (in try/catch, prefix `bwp:`)

- `bwp:sound`: "1" or "0", default "1". Even with "1", sound plays only after a gesture.
- `bwp:total`: all-time pop count (integer)
- `bwp:today`: JSON `{"d":"YYYY-MM-DD","n":123}`. On load, if `d` is not the local date, reset `n` to 0.
- `bwp:sheets`: completed sheets, all time
- `bwp:gold`: golden bubbles, all time
- `bwp:hinted`: "1" after the first pop ever, so the hint shows on later visits only as the 1-second pulse, without text
- Write at most once per 500 ms (debounced), plus once on `visibilitychange` to hidden and on `pagehide`.

## Edge cases

- **Resize or rotation:** rescale the stored normalized grid to the new sheet rect. Popped state is kept and the layout never changes mid-sheet. If the new aspect differs a lot, letterbox the sheet in the window, centered.
- **Multi-touch:** two fingers can pop at the same time. Each pointer has its own previous point. A bubble popped by one pointer is skipped by the others, because its state is checked before popping.
- **Re-popping:** tapping a popped bubble does nothing. No sound and no count, but it shows a tiny 2 px wobble so the tap is acknowledged.
- **Fast swipe:** sweep every move segment, so even a 2,000 px/s flick pops every bubble on the path. Cap each move event at 40 pops.
- **Swap lock:** input is ignored during the 1.1 s sheet swap. Pointers that are down when the new sheet appears must lift and press again, so a held drag does not wipe the fresh sheet instantly.
- **Hidden page:** pause the rAF loop and snow, clamp delta to 50 ms on resume, and flush storage.
- **Date rollover while open:** check the date on each pop. If it changed, reset the today count to 0 before adding.
- **Blocked localStorage:** everything still works. Counts live in memory only.
- **Missing APIs:** with no Web Audio, play silently and hide the sound button. With no `vibrate`, skip haptics.
- **`location.hash === '#demo'`:** build a fixed 8-column sheet, pop about 45% of the bubbles in a diagonal swipe pattern, put one golden bubble whole near the center, and hide the hint. This is for QA thumbnails only.

## Must not

- No network of any kind, no raster images or audio files. Everything is canvas, CSS and Web Audio. Stay under 60 KB.
- No brand names. Use only the common words 뽁뽁이 and 에어캡 / bubble wrap. Do not imitate any existing bubble-wrap app's look, sounds or wording.
- No scoring pressure: no timer, no game over, no leaderboard, no "you are slow" messages.
- No health or medical claims about stress relief. The milestone lines stay playful.
- No real insulation or energy-saving advice beyond the one joke line in `about`.
- No sound before the first gesture, no `alert`, `confirm`, `prompt`, `window.open` or navigation, and no page scroll or zoom.
