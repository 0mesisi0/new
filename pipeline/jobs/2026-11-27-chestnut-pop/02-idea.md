# Idea and spec: 군밤 칼집 타이밍 / Chestnut Pop

Agent: Claude (opus), planner. Design notes are merged in (palette, layout, motion).

## Concepts scored

Scores are 1–5 for: value in the first 10 seconds, originality, Korean search/share demand, and buildability in one HTML file. Maximum 20.

| Concept | Category | Score | Verdict |
|---|---|---|---|
| JPEG 압축 실험실: 사진이 깨지는 이유 (drag a quality slider and watch 8×8 blocks and color bleeding appear on a procedurally drawn picture) | tech | 3/4/2/4 = 13 | Good for learning but slow to hook people. Save it for a tech rotation day |
| 목욕탕 세신 타이밍 (scrub a cartoon back faster for points; a "too hard" meter goes red) | weird | 4/4/3/4 = 15 | Funny and very Korean, but the thumbnail might look gross and it is close to sauna-towel-hat-studio. Skip |
| **군밤 칼집 타이밍 / Chestnut Pop** | **games** | **5/4/4/5 = 18** | **Picked.** It uses research direction #1 (push your luck until it pops) with a new subject: winter street chestnuts. Two taps per chestnut are clear within 3 seconds, and "탁!" pops make good clips. It is not a sweet potato, Christmas cake, kimjang, foggy window or gift wrap idea |

Why it differs from existing items:
- roast-sweet-potato is a different food with a single-timer mechanic.
- hotteok-flip is a flip-timing game.
- This game is a juggling game with two stages: you must score each nut before it bursts, then pick it in its golden window.
- The tension mechanic is genre-level only. It does not reuse the cat, the brushing, the look or any wording from the viral brush game.

## Meta

- slug `chestnut-pop`, category `games`, kind `game`, aspect `9/16`, date `2026-11-27`
- tags: ko `군밤`, `겨울간식`; en `roasted chestnuts`, `timing game`
- title: ko `군밤 칼집 타이밍`; en `Chestnut Pop`
- desc ko: 뜨거운 군밤 팬에 밤이 계속 올라와요. 터지기 전에 톡 쳐서 칼집을 내고, 노릇노릇할 때 다시 톡 쳐서 봉지에 담으세요. 하나라도 늦으면 탁!
- desc en: Chestnuts keep landing on a hot pan. Tap to score each one before it bursts, then tap again when it turns golden to bag it. Too slow and... pop!
- howto ko: 생밤을 한 번 누르면 칼집이 나요. 칼집 낸 밤이 노릇해지면(금색 테두리) 한 번 더 눌러 봉지에 담으세요. 칼집 없이 오래 두면 터지고, 너무 오래 구우면 타요. 목숨 3개를 다 잃으면 끝이에요. 키보드는 숫자 1~7로 칸을 고르고, P는 일시정지, M은 소리예요.
- howto en: Tap a raw chestnut once to score it. When a scored chestnut turns golden (gold ring), tap it again to bag it. Uncut nuts burst and overcooked ones burn. Lose all 3 lives and it is over. On a keyboard, keys 1-7 pick a slot, P pauses and M toggles sound.
- about ko: 실제로도 군밤은 칼집을 내지 않고 구우면 껍질 속 수증기 때문에 터질 수 있어요. 집에서 구울 땐 꼭 칼집부터! 점수와 기록은 이 기기에만 저장돼요.
- about en: Real chestnuts can burst from trapped steam if you roast them without a cut, so always score them first at home. Scores stay on this device.

## Pitch

It is a snowy alley at night under the warm orange glow of a street cart. A round black iron chestnut pan with holes sits over glowing coals.

1. Chestnuts drop from a burlap sack onto the pan's 7 slots, faster and faster.
2. Each raw chestnut starts wobbling. One tap cuts an X into it (슥!), and it starts to roast.
3. The shell darkens toward golden. The perfect moment shows as a gold ring, and a second tap flicks the nut into the paper bag.
4. An uncut nut bursts with a "탁!": it jumps, shell bits fly and the screen shakes. An overcooked nut turns to charcoal and smokes. Either costs a life.
5. When all lives are gone, the paper bag is shown with your count, score, best score and a silly chestnut rank.

Juggling 5–7 nuts in different states gives a "one more try" loop. Every run starts calm and ends frantic.

## Flow

1. **START**
   - Shows the cart scene with a few idle chestnuts sizzling on the pan, plus light snow.
   - Shows the title, the one-line how-to, the best score (if any) and a big "톡 눌러 시작 / Tap to start" button.
   - Has a mute toggle at the top right.
   - Enter, Space or a tap starts the game.
2. **TUTORIAL (first play only, `chp:tut` absent)**
   - The first 2 chestnuts spawn slowly at 0.4× speed with coach bubbles:
     - "① 톡! 칼집 내기 / ① Tap to score it" with a pulsing finger on nut 1
     - then "② 금색 테두리일 때 톡! / ② Tap when the ring turns gold"
   - The bubbles disappear after the first successful pick. Normal play then continues with no break, and `chp:tut` = "1" is set.
   - A pop or burn during the tutorial costs no life.
3. **PLAY**
   - Spawning, roasting and scoring follow the rules below.
   - The HUD across the top shows the score (big), a combo badge "×2" (only when the multiplier is above 1), 3 life icons (small chestnut outlines that crack when lost) and a pause button ⏸.
   - The paper bag at the bottom center shows "봉지 {n}개 / Bag: {n}".
4. **PAUSE**
   - Opened with P, Esc, the ⏸ button or by the page becoming hidden.
   - A dim overlay shows "일시정지 / Paused" and the buttons [계속 / Resume] [처음부터 / Restart].
   - Time stops completely while paused.
5. **GAME OVER**
   - Waits 0.6 s after the last life is lost, with slow motion at 0.3× for the last pop or burn.
   - A paper bag slides up showing the rank emoji and title, the score (counts up over 0.8 s), "봉지 {n}개 · 완벽 {p}개 / Bagged {n} · Perfect {p}", the best score and a "최고 기록! / New best!" ribbon when beaten.
   - Has a big "다시 굽기 / Roast again" button and a small "처음 화면 / Title" link.
   - Enter, Space or R retries.
   - Input is ignored for 500 ms after the screen appears.

## Game rules

**Pan geometry**
- There are 7 slots: one in the center plus 6 in a hexagon.
- Slot positions are stored as normalized values (unit circle × 0.62 of the pan radius) and converted to pixels on every resize.
- Pan radius = min(width × 0.42, height × 0.30).
- Chestnut radius = pan radius × 0.19.
- The hit radius is max(chestnut radius × 1.25, 26 px), which keeps targets at least 44 px wide.

**Clock and difficulty**
- `t` = seconds of play, counting unpaused time only.
- `speed = min(1.6, 1 + t / 150)`
- Spawning:
  - The first 3 nuts arrive 0.6 s apart.
  - After that, the spawn interval is `max(0.85, 2.2 − t × 0.015)` s.
  - A spawn only happens into a random empty slot. With no empty slot it is skipped and retried after 0.3 s.
  - A nut lands with a small drop-and-bounce lasting 200 ms. It cannot be tapped during the first 120 ms.

**Chestnut states**

| State | Behavior | Visual |
|---|---|---|
| `raw` | `heat` rises at `speed / 3.4` per second. Wobbling starts at heat 0.6 and grows stronger. At heat 1.0 the nut goes to `pop`. A tap cuts it and moves it to `cut` (roast = 0) | Glossy dark brown, with a tiny steam puff once heat passes 0.8 |
| `cut` | `roast` rises at `speed / 6.0` per second | An X crack showing pale yellow flesh. The shell darkens with roast |
| `pop` | Costs a life, combo = 0. The nut jumps out of the pan on a parabola over 0.5 s, then is removed | 8 shell-fragment particles, "탁!" / "POP!" text, 6 px screen shake for 150 ms, an orange flash on the slot |
| `burnt` | Reached when `roast` hits 1.0. Costs a life, combo = 0. Removed after 0.6 s and cannot be tapped | Charcoal black, a gray smoke column, "앗 탔다" / "Burnt!" text |

**Picking a `cut` nut**

| Roast at tap | Result | Points | Combo |
|---|---|---|---|
| < 0.60 | "아직! / Not yet!" bubble. Nothing happens and the nut stays | 0 | unchanged |
| 0.60–0.70 or 0.80–0.85 | 맛있게 / Tasty | 10 × mult | +0 (kept) |
| 0.70–0.80 | 완벽 / Perfect | 20 × mult | +1 |
| 0.85–1.00 | 좀 탔네 / A bit charred (the shell has smoked edges) | 3 | reset to 0 |

- The golden window (0.60–0.85) shows a gold ring around the nut. The ring is brighter and pulses during the perfect band (0.70–0.80).
- `mult = min(5, 1 + floor(combo / 3))`
- A picked nut arcs into the paper bag over 350 ms, with a "+20" floater. A Perfect pick adds 6 gold sparkles.
- A tap that misses every nut does nothing, with no penalty.
- A double tap can only cut the nut and then show "아직". It can never skip a state.

**Run end**
- Lives start at 3. At 0 lives, the run ends.
- The run tracks `score`, `bagged`, `perfects`, `pops` and `burns`.

## Ranks (game over)

| Condition | ko | en | emoji |
|---|---|---|---|
| hidden: pops ≥ 3 and bagged = 0 | 인간 팝콘 기계 | Human Popcorn Machine | 🍿 |
| score < 100 | 군밤 견습생 | Chestnut Apprentice | 🌰 |
| score < 300 | 골목 군밤 장인 | Alley Chestnut Pro | 🔥 |
| score < 600 | 겨울밤 불맛 달인 | Master of the Winter Flame | 🏮 |
| score ≥ 600 | 전설의 군밤 리어카 | Legendary Chestnut Cart | 👑 |

## Controls

- **Pointer:**
  - `pointerdown` on the canvas finds the nearest nut within its hit radius, using the closest center.
  - Multi-touch works: every pointer is handled independently.
  - `touch-action:none` on the play area, with `preventDefault` on every touch.
- **Keys during play:**
  - 1–7 act on a slot: 1 = center, 2–7 = clockwise from the top.
  - Each nut shows a small slot number only when a keyboard was the last input device, which is detected on the first keydown.
  - P or Esc pauses. M mutes.
- **Keys on other screens:** Enter or Space starts or retries, and R retries. In the pause overlay, Enter resumes.
- **Layout:** all buttons are at least 48 px tall. All keys used get `preventDefault`.

## Visual design

- **Palette:**
  - sky: a gradient from #141a2b to #24304a
  - cart wood #6b3f22 and awning stripes #c8462f / #f2e6d0
  - lamp glow: a radial gradient of #ffb357 at 35% alpha
  - pan: #2a2a2e with a #45454b rim highlight
  - coals: #ff6a2b to #ffd36b flicker
  - chestnut: raw #5a2e17 shell with a #8a4a25 highlight; cut flesh #f3d98a
  - golden ring #ffcf4a, burnt #1b1512, text #fff6e8
- **Scene, drawn entirely on canvas:**
  - The cart awning edge sits at the top behind the HUD.
  - The pan with a 5×5 hole pattern sits in the lower middle.
  - Coals glow under the pan (sine flicker per coal).
  - Light snow falls: 40 particles, or 15 when reduced motion is on.
  - Steam wisps rise from the cut nuts.
- **Chestnut shape:** a teardrop made with `quadraticCurveTo`, with a radial gradient and a lighter flat base patch. The X cut is two short strokes that reveal the flesh color.
  - Roast color = lerp(#6b3a1d, #3a1d0d) over roast 0–0.85, then lerp toward #1b1512 up to 1.0.
- **Paper bag:** a kraft paper rectangle (#c9a46a) with a folded top and the hand-lettered text "군밤 / Chestnuts" in system-ui bold.
- **Juice:**
  - squash and stretch on landing
  - cut slash particles (3 pale chips)
  - a pop flash and shake
  - a combo badge that pops with scale 1.4 → 1
  - the rank card on game over thumps in with scale 1.8 → 1 and −6° rotation
- **Rendering:** DPR is capped at 2 and the canvas is resized on `resize`.
- **Small screens:** at 320×480, HUD text is at least 14 px and the score is 28 px. The pan keeps 16 px side padding.
- **Wide screens:** the scene stays centered and the pan grows by height. The sky and snow fill the full width.
- **`prefers-reduced-motion`:** no screen shake, no slow motion, fewer particles, no wobble rotation (the nut shows a red "!" badge once heat passes 0.6), and the score shows instantly with no count-up.

## Sound (Web Audio, synthesized, starts after the first gesture; default on, mute persisted)

- Cut "슥": 60 ms of bandpass noise at 3 kHz, gain 0.05.
- Pop "탁": an 18 ms click plus a sine dropping from 120 Hz to 60 Hz over 120 ms, gain 0.14.
- Pick: a triangle wave at 880 Hz → 1320 Hz over 90 ms, gain 0.06. Perfect adds a second note a fifth higher.
- Burn: low-passed noise at 400 Hz for 300 ms with decay, gain 0.06.
- Sizzle bed: very quiet lowpassed noise at gain 0.012 while nuts are on the pan. It is suspended when paused, hidden or muted.
- "아직": a 40 ms square wave at 220 Hz, gain 0.03.

## Strings

| key | ko | en |
|---|---|---|
| appTitle | 군밤 칼집 타이밍 | Chestnut Pop |
| startSub | 톡 쳐서 칼집, 노릇할 때 톡 쳐서 봉지에! | Tap to score, tap again when golden! |
| startBtn | 톡 눌러 시작 | Tap to start |
| bestLabel | 최고 기록 {n}점 | Best: {n} |
| tut1 | ① 톡! 칼집 내기 | ① Tap to score it |
| tut2 | ② 금색 테두리일 때 톡! | ② Tap when the ring turns gold |
| score | 점수 | Score |
| bag | 봉지 {n}개 | Bag: {n} |
| notYet | 아직! | Not yet! |
| tasty | 맛있게! | Tasty! |
| perfect | 완벽! | Perfect! |
| charred | 좀 탔네 | A bit charred |
| pop | 탁! | POP! |
| burnt | 앗 탔다 | Burnt! |
| paused | 일시정지 | Paused |
| resume / restart | 계속 / 처음부터 | Resume / Restart |
| overTitle | 장사 끝! | Cart closed! |
| overStats | 봉지 {n}개 · 완벽 {p}개 | Bagged {n} · Perfect {p} |
| newBest | 최고 기록! | New best! |
| retry | 다시 굽기 | Roast again |
| toTitle | 처음 화면 | Title |
| soundOn / soundOff | 소리 켜기 / 소리 끄기 | Sound on / Sound off |
| pauseBtn | 일시정지 | Pause |
| rank_* | (see Ranks table) | (see Ranks table) |

All strings live in `{ ko: {...}, en: {...} }`. `lang` comes from `?lang=`, falling back to `navigator.language` starting with "ko". `<html lang>` is set to match.

## localStorage (in try/catch, prefix `chp:`)

- `chp:best`: the best score as an integer string
- `chp:sound`: "1" or "0", default "1"
- `chp:tut`: "1" once the tutorial is done
- `chp:plays`: the number of runs started (not shown in the UI)

## Edge cases

- **Resize mid-run:** recompute the pan, slot pixel positions and radii. Nut state (heat/roast) is unaffected, and in-flight arcs are recomputed from progress. Never reset the run.
- **`document.hidden`:** auto-pause, stop the rAF work and suspend the audio. Delta is clamped to 50 ms, so returning never fast-forwards nuts into pops.
- **Restart:** fully resets every array, timers, `t`, speed, combo, lives, particles and slow motion. The tutorial does not replay once `chp:tut` is set.
- **Simultaneous losses:** if two pops land in the same frame with 1 life left, only one life is deducted per event and the game ends cleanly, never with negative lives. Taps during the 0.6 s ending are ignored.
- **Overlapping hit areas:** pick the nut with the smallest distance to the pointer.
- **Blocked localStorage:** best shows "—" and everything else works. The tutorial shows every run.
- **`location.hash === '#demo'`** (QA thumbnail only):
  - skip the tutorial and start PLAY with 6 nuts in mixed states: 2 raw with one wobbling, 2 cut mid-roast, 1 in the perfect window with a gold ring, and 1 burnt with smoke
  - set score 240 with a ×2 combo badge and 2 lives
  - freeze the spawning for 3 s
- **`#demo-over`:** jump straight to GAME OVER with score 320, bagged 18, perfect 7 and the rank 겨울밤 불맛 달인.

## Must not

- No network of any kind: no external fonts, scripts or images. Draw with canvas only and keep the file under 120 KB.
- Do not copy the viral cat-brushing game: no cat, no brushing, no bite jump-scare, and none of its art, name or wording.
- No real brands, shops, street vendors or people, and no lookalike of any existing cooking game's art.
- No knife close-ups or injury: the cut is just two strokes on the nut. No burned hands or fingers. "Burnt" applies only to chestnuts.
- No alcohol, no gambling or loot mechanics, no timer pressure messaging aimed at kids, and no mocking of vendors or any group.
- No alert, confirm, prompt, window.open or navigation. No sound before the first gesture.
- Never scroll the page. Delta-time movement only, capped. Pause when hidden.
