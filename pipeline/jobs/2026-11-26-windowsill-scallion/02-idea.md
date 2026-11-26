# Idea and spec: 창가 대파 키우기 / Windowsill Scallion

## Concepts scored

Each concept is scored 1–5 on four things: value in the first 10 seconds, originality, Korean search/share demand, and how easy it is to build in one HTML file. The maximum is 20.

| Concept | Category | Score | Verdict |
|---|---|---|---|
| **창가 대파 키우기**: plant a scallion root in a cup on a snowy windowsill. Care for it once a day, it grows overnight, and you cut it when it is ready | **weird** | **4/4/4/4 = 16** | **Picked.** It follows the research's "visit once a day" pet direction (row 4). The subject (대파, the green-onion-in-a-cup habit known as 파테크) is new to the site. It gives a reason to come back every day, and growth shows on the very first tap |
| 군밤 까기 / Chestnut Cracker: squeeze roasted chestnuts open and peel them | cool | 4/2/3/5 = 14 | The street-snack family is already crowded (hotteok, sweet potato, fish cake, hoppang, bungeoppang). Skip |
| 비밀번호 안전도 실험실 / Password Strength Lab: estimate crack time locally | tech | 3/2/4/5 = 14 | Search demand is good, but there are many existing checkers and no seasonal hook. Keep it for later |

## Meta

- slug `windowsill-scallion`, category `weird`, kind `tool`, aspect `9/16`, date `2026-11-26`
  - `kind` is `tool` because the loop is a daily ritual with no game over. It is drawn entirely with canvas, CSS and emoji, with no raster files.
- tags: ko `대파키우기`, `파테크`, `방치형`; en `scallion`, `idle`, `daily`
- title: ko `창가 대파 키우기`; en `Windowsill Scallion`
- desc ko: 눈 내리는 창가, 물컵에 대파 뿌리를 꽂았어요. 하루 한 번 물 갈고 햇빛 쬐고 말 걸어 주면 밤사이 쑥쑥 자라요. 15cm 넘으면 싹둑!
- desc en: A scallion root in a cup on a snowy windowsill. Change its water, give it light and say hi once a day. It grows overnight. Snip it at 15 cm!
- howto ko: 하루에 한 번씩 💧물 갈기, ☀️햇빛, 💬말 걸기를 눌러 주세요(숫자키 1~3). 다음 날 다시 오면 밤사이 자란 만큼 커져 있어요. 15cm가 넘으면 가위로 줄기를 가로질러 긁거나 H 키로 수확하세요. 한 뿌리는 세 번까지 다시 자라요.
- howto en: Once a day, tap 💧 Water, ☀️ Light and 💬 Talk (keys 1-3). Come back tomorrow to see how much it grew overnight. At 15 cm, swipe the scissors across the stem or press H to harvest. One root regrows up to three times.
- about ko: 진짜 대파 뿌리도 물컵에서 다시 자라요. 물은 하루 이틀마다 갈아 주는 게 좋아요. 기록은 이 기기에만 저장되고, 며칠 잊어도 대파는 시들 뿐 죽지 않아요.
- about en: Real scallion roots really do regrow in a cup of water; change it every day or two. Progress stays on this device only. Forget it for a few days and it droops, but it never dies.

## Pitch

The scene is a cozy night window. Snow falls outside, and a glass of water sits on the sill with a white scallion root and a short green stub in it.

1. On the first visit, the user names the plant (optional) and taps "심기". The root drops into the cup with a splash and grows 1 cm right away, so something happens in the first 10 seconds.
2. Each local day there are three care actions: water, light and talk. Each one gives +0.6 cm of instant, animated growth. Talking gets a weird one-line "대파 일기" reply.
3. Overnight (on the next visit), passive growth is added. The user sees a "어제보다 +2.3cm" banner.
4. At 15 cm or more, the scissors light up. Swiping across the stem cuts it, and the result converts the cut into silly portions ("라면 2그릇 분량").
5. Each root regrows 3 times and then retires with a thank-you card, and a new root is planted. If the plant passes 30 cm without a cut, a scallion flower (파꽃) blooms on top as a weird bonus.

## Flow

1. **PLANT (first run only, or after a root retires)**
   - Shows the empty cup, a floating root, the title, a name field (max 8 characters, default 파릇이 / Sprout) and a big "심기" button.
   - Tapping it plays the drop animation (400 ms) and a splash (8 particles). The plant grows from 0 to 1.0 cm over 1.5 s, then the screen switches to HOME.
2. **HOME (the main screen, always)**
   - **Top bar:** "{name} · {n}일째" (day count since planting), "{h}cm", 🍃 harvest count and a mute toggle.
   - **Scene canvas:**
     - The window frame and the sky, which changes with the local hour (see the visual design section).
     - Snow from November to February.
     - The cup and the plant.
   - **Bottom:** three big care buttons. Each one shows a ✓ once it is done today.
   - When all three are done, the bottom text reads "오늘 돌봄 끝! 다음 성장까지 {HH:MM}". It counts down to local midnight and updates every 30 s.
   - Tapping the plant makes it wiggle (a 300 ms spring sway) and shows a random short reaction bubble. This is free and unlimited, with no growth.
3. **CARE actions** (each once per local day, in any order)
   - **💧 Water:** the cup drains, then refills (900 ms). The water turns clear, freshness resets, and the plant gets +0.6 cm.
   - **☀️ Light:** the curtain slides open (700 ms).
     - Between 06:00 and 16:59, a warm sunbeam falls on the plant.
     - Otherwise a desk lamp clicks on and the toast says "밤이라 스탠드로 대신했어요".
     - Either way the plant gets +0.6 cm.
   - **💬 Talk:** a sheet with 3 phrases appears, picked from the pool by the date seed. Picking one shows a speech bubble from the user, then the scallion's diary line for 3 s, and the plant gets +0.6 cm.
4. **OVERNIGHT banner** (on the first open of a new day, if 1 or more days have passed)
   - A card slides down: "밤사이 +{g}cm 자랐어요" plus a freshness note.
   - It closes when tapped or after 3 s.
5. **HARVEST** (available when h ≥ 15)
   - The ✂️ button pulses.
   - Dragging across the stem cuts it when the stroke crosses the stem's x position with a horizontal span of at least 40 px. Tapping ✂️ or pressing H does the same thing.
   - **Cut animation:** the top part falls and tilts, a "싹둑" pop appears, and 10 green confetti bits fly.
   - **Result card:**
     - "{h}cm 수확!"
     - the portion line, chosen by h: ≥ 8 cm gives 라면 {⌊h/8⌋}그릇 분량; any length gives 파전 {(h/20).toFixed(1)}장 분량
     - the total harvested so far
     - buttons [텍스트 복사] [계속 키우기]
   - The green height resets to 0.5 cm. rootHarvests goes up by 1.
6. **RETIRE** (after the third harvest of the same root)
   - The result card adds "{name}의 뿌리가 은퇴했어요. 고마웠어 🌱".
   - "계속 키우기" goes to PLANT with rootNo + 1. The name field is prefilled with "{name} {rootNo+1}세".

## Growth model

Days are local calendar dates as `YYYY-MM-DD`. dayDiff(a, b) = round((Date(b 00:00) − Date(a 00:00)) / 86400000).

**State**
- `h`: green height in cm, 1 decimal place, capped at 30.
- `lastSeenDay`, `lastWaterDay`, `careDay`, and `care = {water, sun, talk}` (booleans).

**On load**
- d = dayDiff(lastSeenDay, today).
- If d > 0, then for each of min(d, 14) days in order, with k = the day index:
  - sinceWater = dayDiff(lastWaterDay, thatDay).
  - Growth that day is 0.8 if sinceWater ≤ 2, otherwise 0.3. Add it to h.
- The banner shows the total gained.
- Set lastSeenDay = today.

**Care flags**
- If today > careDay (string comparison), reset all three flags and set careDay = today.
- If today < careDay (the clock went backward), disable the care buttons and show the hint "시계가 거꾸로 갔어요. 내일 다시 와 주세요". Apply no growth.

**Freshness** (from the days since the last water change)
- 0–1 days: fresh. Leaves are #3fae4a and stand upright.
- 2–3 days: limp. Leaves are #7fbf5a, the tips droop 15°, and the water turns slightly cloudy (alpha 0.25 beige).
- 4 days or more: wilted. Leaves are #a8b86a, the tips droop 35°, and the water is cloudy (alpha 0.45). The bubble says "물 좀…".
- Water restores the fresh state instantly, with an 800 ms ease from the current tilt and color.

**Never dies.** There is no fail state.

**Flower:** at h ≥ 30, growth stops and a round white-purple scallion flower ball (a canvas circle with dots) appears on the tallest leaf. The status reads "파꽃이 피었어요 (수확하면 다시 자라요)".

**Leaves:** the plant has 3 leaves (tubes). Leaf lengths are h × [1, 0.85, 0.7]. Each leaf is drawn as a rounded quadratic curve, with a lighter highlight stroke 2 px wide. The white stub is 3 cm and fixed, with roots drawn as 6 wavy lines in the water.

**Scale:** 1 cm = (sceneHeight × 0.018) px, so 30 cm reaches about 54% of the scene height above the cup.

## Seed

- daySeed = FNV-1a 32-bit of the date string, used with mulberry32. Talk options and the diary line for the day are deterministic for that date.
- Wiggle reactions use `Math.random`; they are cosmetic only.

## Talk pool (3 shown per day, picked by daySeed without repeats)

| # | user ko | user en |
|---|---|---|
| 1 | 오늘도 잘 컸네 | Look at you growing |
| 2 | 밖에 눈 온다 | It's snowing outside |
| 3 | 넌 나보다 성실하다 | You're more diligent than me |
| 4 | 라면에 들어갈 준비 됐어? | Ready for the ramen pot? |
| 5 | 물 시원하지? | Is the water nice and cool? |
| 6 | 오늘 회사에서 말이야… | So, at work today... |
| 7 | 키 재 보자 | Let's measure you |
| 8 | 잘 자, 내일 봐 | Good night, see you tomorrow |

## Diary lines (the scallion replies with one, picked by daySeed; one per day)

| ko | en |
|---|---|
| 오늘의 일기: 물 마심. 위로 감. 끝. | Diary: drank water. Went up. The end. |
| 창밖 눈송이가 나보다 빨리 자란다고 착각함. | Mistook a snowflake for a faster grower. |
| 뿌리는 아래로, 마음은 위로. | Roots go down, spirit goes up. |
| 냉장고 속 친척들 안부가 궁금하다. | Wondering how my cousins in the fridge are doing. |
| 1cm는 작지만 내 키의 10%다. | 1 cm is small, but it is 10% of me. |
| 사람은 왜 밤에 휴대폰을 보며 한숨을 쉬는가. | Why do humans sigh at their phones at night? |
| 오늘은 광합성을 열심히 했다. 스탠드라도. | Did my best photosynthesis today. Even with a desk lamp. |
| 가위 소리가 들리면 성장통이라 생각하기로 함. | Decided scissor sounds are just growing pains. |
| 물컵 속은 생각보다 아늑하다. | The inside of a cup is cozier than you'd think. |
| 내일도 1cm. 모레도 1cm. 그게 파의 길. | One cm tomorrow. One cm after. That is the way of the scallion. |

## Wiggle reactions (random, tapping the plant)

| ko | en |
|---|---|
| 간지러워 | That tickles |
| 흔들지 마세요 | Please don't shake me |
| 파릇파릇 | Fresh and green |
| …(광합성 중) | ...(photosynthesizing) |
| 오늘 키 몇이게? | Guess my height today? |

## Controls

- **Pointer:** tap buttons. Tap the plant to wiggle it. When harvesting, drag across the stem.
- **Keys:**
  - 1 waters, 2 gives light, 3 opens talk. On the talk sheet, 1–3 pick a phrase and Esc closes it.
  - H harvests when ready. Enter or Space confirms the focused button or closes a card. M toggles sound.
  - On PLANT, Enter plants.
- **Touch and layout:** all buttons are at least 48 px tall. The scene canvas has `touch-action:none`, and every key in use calls `preventDefault`. The page never scrolls.

## Screens

**PLANT**
- the scene in its dimmed state
- the title at 26 px bold
- the subtitle
- the name input (`maxlength=8`)
- a primary "심기" button
- the footnote "기록은 이 기기에만 저장돼요"

**HOME**
- the top bar (name · day count, height badge, 🍃 count, 🔊/🔇)
- the scene canvas, which takes the remaining height
- a status line (one line, 14 px)
- a 3-column button row (💧 ☀️ 💬). The ✂️ button floats over the scene, bottom right, at 64 px, and only appears when h ≥ 15

**TALK sheet**
- slides up from the bottom
- 3 phrase buttons and a close ✕

**OVERNIGHT banner**
- a top card

**HARVEST card**
- a centered modal card
- the cut piece drawn in a small canvas
- the stats and 2 buttons

**Toast**
- bottom center, 2 s

## Visual design

- **Sky gradient by local hour:**
  - 06–16: #bcdcf5 → #e9f4fb
  - 17–19: #f3b38a → #6a6fa8
  - otherwise: #1b2340 → #34406b, with 20 tiny stars
- **Window and room:**
  - the window frame is warm wood, #8a5a3b
  - the sill is #c89b6d
  - the room wall is #f4ead8
  - the curtain is mustard (#e0b54a), drawn in two halves that slide apart
- **Cup:** a translucent glass (white at 35% alpha with a highlight stroke). The water level is drawn and drains or refills on 💧.
- **Snow:** 50 particles outside the window pane only (clipped), drifting on a sine. Shown in November to February.
- **Light:**
  - the sunbeam is a diagonal yellow gradient at 25% alpha
  - the lamp glow is a radial gradient, #ffd98a at 30% alpha
- **Juice:**
  - growth: +0.6 cm eased over 600 ms, with a floating "+0.6cm" label that rises and fades
  - harvest: a 4 px shake for 120 ms
  - the ✓ marks pop (scale 1.4 → 1)
- **Fonts:** system-ui stack. Numbers use `font-variant-numeric: tabular-nums`.
- **Layout:**
  - at 320 px wide, side padding is 12 px and button labels stay as icon plus short word
  - on wide screens, the content is a centered column with a max width of 480 px and the wall color fills the rest
- **DPR** is capped at 2. Resizing recomputes the layout and redraws from state.
- **prefers-reduced-motion:** no wiggle, no shake and no falling-piece animation. Growth changes instantly and snow drops to 15 particles.

## Sound (off by default)

| Sound | Synthesis |
|---|---|
| Pour | filtered noise sweep, 500 ms, gain 0.05 |
| Click (curtain, lamp) | 20 ms square at 1.2 kHz, gain 0.04 |
| Pop (grow) | sine 600 → 900 Hz, 90 ms, gain 0.06 |
| Snip | two 15 ms noise bursts 60 ms apart, highpassed at 3 kHz, gain 0.08 |

Web Audio starts only after a user gesture. The mute setting is persisted.

## Copy text (result card)

- ko: `🌱 {name} {rootNo}세 · {n}일째에 {h}cm 수확! 라면 {k}그릇 분량 · 누적 {total}cm · play.mesisi.net`
- en: `🌱 {name} #{rootNo} · harvested {h} cm on day {n}! Enough for {k} bowls of ramen · total {total} cm · play.mesisi.net`
- Use `navigator.clipboard.writeText`, falling back to a hidden textarea and `execCommand('copy')`. Show a toast on success or failure.

## Strings

| key | ko | en |
|---|---|---|
| appTitle | 창가 대파 키우기 | Windowsill Scallion |
| plantSub | 물컵에 대파 뿌리를 꽂아 보세요. 하루 한 번 돌보면 밤사이 자라요 | Pop a scallion root in a cup. Care for it once a day and it grows overnight. |
| namePh | 대파 이름 (선택) | Name your scallion (optional) |
| defaultName | 파릇이 | Sprout |
| plantBtn | 심기 | Plant |
| privacy | 기록은 이 기기에만 저장돼요 | Progress stays on this device |
| dayN | {n}일째 | Day {n} |
| water / sun / talk | 물 갈기 / 햇빛 / 말 걸기 | Water / Light / Talk |
| lampToast | 밤이라 스탠드로 대신했어요 | It's dark, so a desk lamp will do |
| doneToday | 오늘 돌봄 끝! 다음 성장까지 {hh}:{mm} | All done today! Next growth in {hh}:{mm} |
| careLeft | 오늘 할 일 {k}개 남았어요 | {k} care left today |
| overnight | 밤사이 +{g}cm 자랐어요 | Grew +{g} cm overnight |
| overnightLimp | 물이 좀 탁해요. 💧 갈아 주세요 | The water's a bit cloudy. Change it 💧 |
| wilted | 물 좀… | Water... please |
| clockBack | 시계가 거꾸로 갔어요. 내일 다시 와 주세요 | Your clock went backward. Come back tomorrow. |
| readyHint | 15cm 돌파! ✂️로 줄기를 가로질러 긁어 수확하세요 | Past 15 cm! Swipe ✂️ across the stem to harvest |
| flower | 파꽃이 피었어요 (수확하면 다시 자라요) | It bloomed! (Harvest to regrow) |
| harvested | {h}cm 수확! | Harvested {h} cm! |
| ramen | 라면 {k}그릇 분량 | Enough for {k} bowls of ramen |
| pajeon | 파전 {p}장 분량 | Enough for {p} scallion pancakes |
| totalCm | 누적 수확 {t}cm | Total harvested {t} cm |
| retire | {name}의 뿌리가 은퇴했어요. 고마웠어 🌱 | {name}'s root has retired. Thank you 🌱 |
| nextGen | {name} {r}세 | {name} #{r} |
| copy / keepGrowing | 텍스트 복사 / 계속 키우기 | Copy text / Keep growing |
| copied / copyFail | 복사했어요 / 복사하지 못했어요 | Copied / Could not copy |
| close | 닫기 | Close |
| soundOn / soundOff | 소리 켜기 / 소리 끄기 | Sound on / Sound off |
| noStorage | 저장이 막혀 있어서 내일은 처음부터 시작해요 | Storage is blocked, so tomorrow starts fresh |
| resetToast | 기록을 읽지 못해 새로 심었어요 | Couldn't read your save, so we planted a new root |

## localStorage (in try/catch, prefix `wsc:`)

- `wsc:state`: JSON `{v:1, name, rootNo, plantedDay, lastSeenDay, lastWaterDay, careDay, care:{water,sun,talk}, h, rootHarvests, harvests, totalCm}`
- `wsc:sound`: "1" or "0", default "0"

Save after every action and every harvest. Never store talk choices.

## Edge cases

- **First run:** no state, so the app shows PLANT.
- **Corrupt or wrong-version state:** discard it, show resetToast and go to PLANT.
- **Away for more than 14 days:** catch up only 14 days; the cap is 30 cm anyway. The banner still shows.
- **Midnight passes while the page is open:** check the date on `visibilitychange` and every 30 s. If the date changed, run the rollover and show the banner.
- **Clock went backward:** see clockBack. No growth and no care.
- **Double taps:** care buttons lock for 900 ms during their animation. Harvest ignores input until the card is closed.
- **A harvest drag that misses the stem** does nothing. Show readyHint again.
- **Resizing mid-animation:** redraw from state and finish the animation at the new scale.
- **Hidden page:** pause rAF and clamp delta to 50 ms.
- **localStorage blocked:** the app works for the session and shows noStorage once.
- **Language:** `?lang=` first, then `navigator.language`, and `<html lang>` is set to match.
- **`location.hash === '#demo'`:** use an in-memory state only (never saved): name 파릇이/Sprout, day 7, h 16.4, all care done, fresh, 1 harvest. Show HOME with the ✂️ button pulsing at the evening sky. This is for QA thumbnails.

## Must not

- No network of any kind, no raster images, and nothing over about 120 KB.
- No real brands, markets, prices or money values (no "파테크로 ₩ 절약" amounts). Portions only.
- No real plant-care claims beyond the about line. No health or diet advice.
- No death, rotting or gross imagery. The worst state is droopy.
- No guilt pressure: no streak-loss shaming, no notifications, no "you abandoned it" text.
- Do not imitate any existing virtual-pet or idle game's characters, UI or wording.
- No alert, confirm, prompt, window.open or navigation. No sound autoplay.
