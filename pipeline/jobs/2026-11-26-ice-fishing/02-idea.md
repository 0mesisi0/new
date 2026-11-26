# Idea and spec: 얼음낚시 60초 / 60-Second Ice Fishing

Agent: Claude (opus), acting as planner. Design notes are merged in (palette, layout, motion).

## Concepts scored

Each concept is scored 1–5 on four things: value in the first 10 seconds, originality, Korean search/share demand, and buildability in one HTML file. The maximum is 20.

| Concept | Category | Score | Verdict |
|---|---|---|---|
| 한글 자모 조합 실험실: pick 초성, 중성 and 종성 and watch the Unicode formula `0xAC00 + (초×21 + 중)×28 + 종` build the syllable live | tech | 3/4/3/5 = 15 | Strong but niche. Save it for a school-season or 한글날 slot. |
| 2026 일력 뜯기: a tear-off desk calendar for the days left in 2026, where each torn page shows a tiny silly note | cool | 4/4/3/4 = 15 | Best near 12/31. Save it for the last week of December. |
| **얼음낚시 60초** | **games** | **5/3/4/5 = 17** | **Picked.** The subject is new to the site (no fishing, river or ice-hole item yet). It reads instantly, has a strong winter hook ahead of the January ice-fishing season, gives a shareable score, and its cross-section canvas build is simple. |

## Meta

- slug `ice-fishing`, category `games`, kind `game`, aspect `9/16`, date `2026-11-26`
- tags: ko `얼음낚시`, `겨울게임`; en `ice-fishing`, `winter-game`
- title: ko `얼음낚시 60초`; en `60-Second Ice Fishing`
- desc ko: 꽁꽁 언 강 위 얼음 구멍에 낚싯줄을 내려요. 찌가 '쑥' 들어갈 때 낚아채고, 줄이 끊어지지 않게 감아 올리세요. 60초 동안 몇 점?
- desc en: Drop a line through a hole in the frozen river, strike when the float dips, and reel in without snapping the line. How many points in 60 seconds?
- howto ko: 물속을 위아래로 끌어 미끼 깊이를 맞추세요(방향키 ↑↓도 돼요). 입질(톡톡)에는 가만히 기다렸다가 '!'가 뜨면 탭(스페이스)하세요. 걸리면 꾹 누르고 있으면 감기고, 장력 막대가 빨개지면 손을 떼세요.
- howto en: Drag up and down in the water to set your bait depth (or use ↑/↓). Stay still through the little nibbles, then tap (Space) when "!" appears. Once a fish is hooked, hold to reel and let go when the tension bar turns red.
- about ko: 깊은 곳일수록 크고 힘센 물고기가 살아요. 아주 가끔 황금 빙어가 지나가요. 잡은 물고기는 모두 사진만 찍고 놓아줬어요.
- about en: Deeper water holds bigger, stronger fish, and once in a while a golden smelt swims by. Every fish is photographed and released.

## Pitch

The screen shows a cross-section of a frozen river:

- The top quarter is a snowy riverbank and the ice, with a small bundled-up angler on a stool beside a round hole.
- Below the ice is deep blue water in three depth bands, with stylized fish drifting across.

The player does three things:

1. Set the bait depth by dragging.
2. Resist the nibbles and strike on the big dip.
3. Hold to reel while managing a tension bar.

A round is 60 seconds and ends on a result card with the score, the biggest fish and a title. The 10-second hook works like this: the first smelt bites within about 3 seconds in the shallow band, and the first catch pops up with a splash.

## Flow

1. **START**
   - Title "얼음낚시 60초", the one-line how-to, an animated idle scene (fish swimming, snow falling) and a big "탭해서 시작" button.
   - Best score and biggest fish (if any) appear in small text.
   - Enter, Space or a tap starts the round.
2. **CAST (0.6 s)**
   - The line drops from the rod tip through the hole with a plop, and the hook settles at `Wt + 0.15·Wh` (see Layout).
   - The timer starts when the cast lands.
3. **PLAY (60 s)** cycles through these states, all within one round:
   - **AIM:** the hook follows the drag target. Fish swim across.
   - **NIBBLE:**
     - A fish has stopped at the hook and the float dips small 1–3 times (randomly chosen).
     - Each dip lasts 220 ms with a gap of 300–600 ms.
     - Any pointerdown, Space or hook movement during NIBBLE spooks the fish. It darts away at 3× speed and the "놓쳤다" toast shows.
   - **STRIKE window:**
     - After the last nibble, the float plunges, a big "!" appears above the hole and the screen gives a 3 px nudge.
     - Pointerdown or Space inside the window (species-specific, see the fish table) hooks the fish and moves to REEL.
     - A late strike or no input lets the fish leave with the bait. A 1.0 s "미끼 다시 끼우는 중" re-bait shows, during which no bites happen.
   - **REEL:**
     - Holding reels the line up. Tension rises.
     - Releasing lowers tension, and the fish drags the line down.
     - Snap: tension at ≥ 100 % for 0.25 s. The line snaps, the "줄이 끊어졌어요" toast shows, and there is a 2.0 s re-tie with no bites.
     - Escape: tension at 0 for 1.5 s straight. The fish slips off with the "도망갔어요" toast.
     - Catch: the fish reaches the hole. It flips up out of the hole with a splash and 12 water-drop particles, and a catch card slides in from the top for 1.2 s showing emoji-free canvas art of the fish, the name, the cm and "+points". Play then returns to AIM with the hook at the same depth it was hooked at.
4. **OVERTIME**
   - If the timer hits 0 during NIBBLE, STRIKE or REEL, show "마지막 한 마리!" and keep playing that one fish only, for up to 8 s.
   - No new bites happen during overtime.
5. **RESULT**
   - The ice cracks shut over the hole (a 0.4 s white flash line), then a card appears with:
     - the total score, counting up over 0.8 s
     - a "NEW BEST" ribbon if the score beat the best
     - the catch count, the biggest fish (name + cm) and a species tally row
     - a title stamp
     - the release note
     - the best score
   - Buttons: a big [다시 하기] and a smaller [결과 복사].

## Controls

- **Pointer, AIM:**
  - pointerdown or move anywhere sets the target depth to the pointer's y, clamped to the water.
  - A pointerdown above the water (in the sky or on the ice) does not change depth.
- **Pointer, STRIKE:** pointerdown anywhere hooks the fish.
- **Pointer, REEL:** pointer held anywhere reels. Release, `pointerup`, `pointercancel` or `lostpointercapture` stops reeling.
- **Pointer, multi-touch:** only the first active pointerId counts. The others are ignored.
- **Keys:**
  - ArrowUp/ArrowDown or W/S move the target depth at 0.6·Wh/s while held.
  - Space or Enter strikes during STRIKE, and reels while held during REEL.
  - M toggles sound.
  - On RESULT, R, Enter or Space restarts and C copies.
  - `preventDefault` on all of these keys.
- **Touch:** the canvas has `touch-action:none`. Buttons are at least 48 px tall.

## Layout (all relative, recomputed on resize)

- The canvas fills `100vw × 100dvh` with DPR capped at 2. W and H are the CSS size.
- Ice surface line `S = 0.24H`, ice thickness `0.05H`, water top `Wt = 0.29H`, water bottom `Wb = 0.95H`, `Wh = Wb − Wt`.
- Bands: shallow `[0, 0.33)·Wh`, mid `[0.33, 0.66)·Wh` and deep `[0.66, 1]·Wh`, measured from Wt. Labels "얕은 곳 / 중간 / 깊은 곳" (Shallow / Middle / Deep) sit at the left edge, 11 px, at 35 % alpha.
- The hole is centered at `x = 0.58W`, width `0.16W`. The hook x always equals the hole x.
- The angler stands to the left of the hole at `x ≈ 0.38W`, sitting on the ice. The rod tip is over the hole center.
- HUD, at the top 12 px inset: time `0:42` on the left (it turns red and pulses for the last 10 s), the score in the center, and the mute button 🔊/🔇 (44 px) on the right.
- The tension bar shows only in REEL: a horizontal bar at the bottom, `min(80vw, 360px)` wide and 14 px tall, with the label "장력 / Tension".
- Wide screens: the play scene is a centered column of `min(W, H·0.62)`. The sky, snow and water gradients extend to the full width.

## Hook and depth

- The hook moves toward the target y at up to `0.9·Wh/s` and is clamped to `[Wt + 0.03Wh, Wb − 0.03Wh]`.
- The hook is "still" if it moved less than `0.01·Wh` during the last 0.4 s. Fish only bite a still hook.
- The line is a 1.5 px light-gray line from the rod tip to the hook. The float is a small red-white bobber sitting in the hole and is the main bite signal.

## Fish table

- Points = base + floor(cm). The cm is uniform in the range from a seeded PRNG.
- Speeds are in W per second. Strength drives the reel physics.

| id | ko | en | bands | cm | base pts | strength | strike window | spawn weight | speed | color |
|---|---|---|---|---|---|---|---|---|---|---|
| smelt | 빙어 | Smelt | shallow, mid | 8–14 | 10 | 1.0 | 520 ms | 46 | 0.22 | silver #cfd8e3, pale stripe |
| trout | 송어 | Trout | mid | 30–50 | 30 | 2.0 | 420 ms | 22 | 0.16 | olive #7c8f6a with pink side stripe |
| cherry | 산천어 | Cherry salmon | mid, deep | 25–40 | 40 | 2.4 | 400 ms | 16 | 0.18 | slate #6f8ca3 with oval parr marks |
| catfish | 메기 | Catfish | deep | 50–80 | 60 | 3.4 | 360 ms | 9 | 0.10 | dark #4a4038, whiskers |
| golden | 황금 빙어 | Golden smelt | any | 14–18 | 150 | 1.5 | 300 ms | 3 | 0.30 | gold #f4c542 with 4 sparkles trailing |
| glove | 장갑 한 짝 | A lone glove | deep | 0 | 0 (+5 s) | 0.8 | 600 ms | 4 | 0.05 (drifts, slight sink-bob) | red knit #d9534f |

Fish art:

- Every fish is drawn on canvas: an ellipse body, a triangle tail and a dot eye.
- A tail wag comes from a sine on the tail angle.
- Fish face their swim direction.
- Length is relative to W: smelt 0.09, trout 0.17, cherry 0.15, catfish 0.22, golden 0.10 and glove 0.08.

The glove counts as a catch but scores 0. It adds 5 s to the timer, with the toast "장갑 한 짝 건짐! +5초". Bite probability is in the next section.

## Spawning and biting

- Spawn a fish every 0.9–1.8 s, with at most 6 on screen.
- Each fish enters from the left or right edge at a random y inside one of its bands and swims straight, with a ±0.01Wh sine bob.
- It despawns off the opposite edge.
- First-round helper: the first spawn of a round is always a smelt in the shallow band, aimed to reach the hook about 2 s after the cast lands.
- **Bite check (each frame, AIM only, no fish engaged, not in re-bait or re-tie):**
  - The fish's mouth is within `0.04W` of the hook x.
  - `|fishY − hookY| < 0.06Wh`.
  - The hook is still.
  - The fish has not rolled in the last 1.5 s.
  - If all of these hold, roll a bite. Bite probability: smelt 0.75, trout 0.6, cherry 0.6, catfish 0.55, golden 0.5, glove 0.9.
  - On success, the fish turns and glides to the hook over 0.25 s and NIBBLE starts. On failure, it keeps swimming.
- While a fish is engaged, the other fish keep swimming and ignore the hook.

## Reel physics (per frame, dt capped at 50 ms)

- Fish depth `d` is the distance below Wt. The hooked fish is drawn at the hook, wiggling.
- **Holding:**
  - `d −= dt · 0.32Wh / (0.7 + 0.3·strength)`
  - `tension += dt · (22 + 14·strength)` percent
- **Not holding:**
  - `tension −= dt · 60`
  - `d += dt · 0.05Wh · strength`, clamped to Wb
- **Pull bursts:**
  - Every 0.8–1.6 s (seeded), the fish pulls for 0.5 s.
  - During a pull, tension gain ×2.2 while holding, and the downward drag ×3 while released.
  - Feedback: the line jitters, the rod bends, and a small "!!" appears beside the fish.
- **Tension bar color:** green #4cc38a below 60, yellow #f4c542 below 85, red #e0453d otherwise. It blinks when ≥ 85.
- The snap and escape rules are in Flow. Catch happens when `d ≤ 0` (the hook reaches Wt).

## Result titles (by score)

| score | ko | en | icon (drawn) |
|---|---|---|---|
| < 120 | 얼음 위 관광객 | Ice Sightseer | 🧊 |
| < 260 | 빙어 수집가 | Smelt Collector | 🐟 |
| < 420 | 구멍 장인 | Master of the Hole | 🎣 |
| < 600 | 얼음판의 전설 | Legend of the Ice | ❄️ |
| ≥ 600 | 겨울 강의 주인 | Keeper of the Winter River | 🏆 |

Hidden title: if a golden smelt was caught, add the line "황금 빙어를 만난 사람 ✨ / Met the Golden Smelt ✨" under the stamp.

Tuning target: a typical round gets 6–9 catches and about 300 points.

## Visual design

- **Palette:**
  - sky gradient #dce9f5 → #f3f7fb, snowbank #f7fbff, distant hills #b9cbe0
  - ice #bfe3f0 with 3 thin #e9f6fb crack lines, hole #13314a
  - water gradient #2c7098 → #12385a → #0a1c2e
  - angler puffer #e0453d, beanie #f4c542, scarf #2c7098
  - UI ink #1d2433, primary button #e0453d with white text
- **Ambience:**
  - About 40 snow particles above the ice.
  - About 14 rising bubbles in the water.
  - 3 soft diagonal light rays under the hole at 8 % alpha.
- **Juice:**
  - catch: splash, the card slide and a +points pop that floats up the HUD
  - snap: the line whips back, with a 4 px shake for 150 ms
  - strike window: the big "!" scales 0 → 1.3 → 1 over 120 ms
  - timer: the last 10 s pulse
  - result: the score counts up and the stamp thumps (scale 2 → 1, rotation −6°)
- **Fonts:** system-ui stack, with bold numbers. HUD at 18 px, toasts at 15 px, result score at 48 px.
- **Small screens:** at 320 × 480 everything still fits. Band labels hide below 360 px width, and the catch card shrinks to 88 % width.
- **prefers-reduced-motion:**
  - no shake, no stamp animation and no count-up
  - 15 snow particles and 6 bubbles
  - the light rays stay static
  - fish movement is unchanged, because gameplay needs it

## Sound (Web Audio, synthesized, starts after the first gesture)

- Plop on cast: a sine sweep from 600 to 180 Hz over 120 ms, gain 0.10.
- Nibble tick: a 20 ms 1.4 kHz click, gain 0.04.
- Strike "!": a 30 ms triangle at 880 Hz, gain 0.08.
- Reel click: a 12 ms noise burst every 90 ms while holding, gain 0.03.
- Snap: a 120 ms filtered noise burst with a pitch drop, gain 0.10.
- Catch chime: sines at 660 then 990 Hz, 90 ms each, gain 0.08. The golden smelt adds a third note at 1320 Hz.
- Default sound is on, but nothing plays before a user gesture. The mute state is persisted.

## Copy result

- Use `navigator.clipboard.writeText`, falling back to a hidden textarea and `execCommand('copy')`. Show a toast on success or failure.
- ko: `🎣 얼음낚시 60초 — {score}점 / {count}마리 / 최대어 {fish} {cm}cm / 칭호: {title} / play.mesisi.net`
- en: `🎣 60-Second Ice Fishing — {score} pts / {count} catches / Biggest: {fish} {cm}cm / Title: {title} / play.mesisi.net`

## Strings

| key | ko | en |
|---|---|---|
| appTitle | 얼음낚시 60초 | 60-Second Ice Fishing |
| startSub | 깊이를 맞추고, 입질엔 참고, '!'에 낚아채요 | Set the depth, wait out the nibbles, strike on "!" |
| startBtn | 탭해서 시작 | Tap to start |
| bestLine | 최고 {score}점 · 최대어 {fish} {cm}cm | Best {score} pts · Biggest {fish} {cm}cm |
| bandShallow / bandMid / bandDeep | 얕은 곳 / 중간 / 깊은 곳 | Shallow / Middle / Deep |
| hintAim | 물속을 위아래로 끌어 깊이를 맞춰요 | Drag up or down in the water to set depth |
| hintNibble | 톡톡… 아직 참아요! | Nibble… not yet! |
| hintReel | 꾹 누르면 감겨요 · 빨간불엔 손 떼기 | Hold to reel · let go on red |
| strike | ! | ! |
| tension | 장력 | Tension |
| spooked | 놓쳤다! 너무 빨랐어요 | Spooked it! Too early |
| late | 미끼만 먹고 갔어요 | It stole the bait |
| rebait | 미끼 다시 끼우는 중… | Re-baiting… |
| snapped | 줄이 끊어졌어요! | The line snapped! |
| retie | 줄 다시 묶는 중… | Re-tying the line… |
| escaped | 도망갔어요 | It got away |
| caught | {fish} {cm}cm +{pts} | {fish} {cm}cm +{pts} |
| glove | 장갑 한 짝 건짐! +5초 | Fished out a lone glove! +5 s |
| overtime | 마지막 한 마리! | One last fish! |
| timeUp | 끝! | Time! |
| score / count / biggest | 점수 / 잡은 수 / 최대어 | Score / Catches / Biggest |
| none | 없음 | None |
| newBest | 신기록! | NEW BEST! |
| best | 최고 기록 | Best |
| release | 잡은 물고기는 모두 사진만 찍고 놓아줬어요 | Every fish was photographed and released |
| golden | 황금 빙어를 만난 사람 ✨ | Met the Golden Smelt ✨ |
| again / copy | 다시 하기 / 결과 복사 | Play again / Copy result |
| copied / copyFail | 복사했어요 / 복사하지 못했어요 | Copied / Could not copy |
| soundOn / soundOff | 소리 켜기 / 소리 끄기 | Sound on / Sound off |
| fish names | 빙어 / 송어 / 산천어 / 메기 / 황금 빙어 / 장갑 한 짝 | Smelt / Trout / Cherry salmon / Catfish / Golden smelt / A lone glove |
| titles | see Result titles | see Result titles |

## localStorage (in try/catch, prefix `ifh:`)

- `ifh:best`: the best score (an integer)
- `ifh:big`: JSON `{ "id": "catfish", "cm": 74 }` for the biggest real fish ever (the glove is excluded)
- `ifh:sound`: "1" or "0", default "1"
- `ifh:plays`: the round count (not shown)

## Edge cases

- Restart fully resets the timer, score, fish, the engaged state, tension, overtime, the PRNG seed (`Date.now()`), particles and toasts. Best, big and sound are kept.
- Resize mid-round: positions are stored in relative units (fish x as a fraction of W, depths as a fraction of Wh), so nothing jumps or restarts.
- `document.hidden`: pause the loop and the timer. On return, resume with dt clamped to 50 ms. Do not count hidden time.
- If the pointer is released outside the canvas, `pointerup`, `pointercancel` or `lostpointercapture` all end the reel hold. Use `setPointerCapture` on pointerdown.
- Holding the pointer from AIM into STRIKE does not count as a strike, because a strike needs a new pointerdown or keydown. In REEL, holding that started before the hook does count as reeling.
- Key auto-repeat on Space is ignored for strikes (`e.repeat`).
- The glove's +5 s during the final seconds is allowed, but overtime never adds time.
- If no fish was caught, the biggest-fish line shows "없음 / None" and the copy text omits the biggest-fish part.
- When localStorage is blocked, the game still works and the best score lives only in memory.
- If `location.hash === '#demo'` (for QA thumbnails only), skip START and show the play state with the timer at 0:42, score 128, 5 fish on screen, a trout hooked in REEL at mid depth and tension at 55 %. The game stays interactive.

## Must not

- No network of any kind, no raster images and no emoji-only fish. The fish are canvas-drawn, and emoji appear only in UI and copy text.
- No real festival names, places, brands, rod or bait makers, or people. Do not imitate the look of any existing fishing game or minigame (no copied UI, fish art, gauges or sounds).
- No blood, hooks in mouths shown up close, or harm to fish. Every catch is "photographed and released".
- No alcohol, gambling, betting or real-money angle.
- No safety claims about real ice thickness and no real fishing advice.
- No alert, confirm, prompt, window.open or navigation. No sound before a user gesture.
- Stay a single `index.html` under 120 KB.
