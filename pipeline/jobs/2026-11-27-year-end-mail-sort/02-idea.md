# Idea and spec: 연말 우편 분류 60초 / Year-End Mail Sort

## Concepts scored

Scores are 1–5 for: value in the first 10 seconds, originality, Korean search/share demand, and buildability in one HTML file. Maximum 20.

Today's three research directions are all taken: page smash (`page-smash`), the 2027 zodiac fortune (`new-year-fortune-2027`) and the card deduction calculator (`card-deduction-calculator-2026`) are queued, and 곶감 is used by `persimmon-breeze`. The pick builds on research row 6 (the cozy letter-sorting web game), moved to a subject nobody has used yet: the year-end flood of cards and parcels at a small post office.

| Concept | Category | Score | Verdict |
|---|---|---|---|
| **Year-End Mail Sort**: sort falling 연하장 and parcels into 4 town bins in 60 s | **games** | **5/4/3/5 = 17** | **Picked.** Instant tap-to-sort loop, a subject no other item uses, and a score that is easy to share |
| Cold Battery Lab: why phones die fast in winter (drag a thermometer, watch the ions slow down) | learn | 3/4/3/4 = 14 | Good winter "왜?" search hook, but slow in the first 10 s; keep for later |
| Year-End Cleaning Zone Draw: random chore and zone picker for family 대청소 | random | 4/2/3/5 = 14 | Too close to the saturated ladder/roulette format |

## Meta

- slug `year-end-mail-sort`, category `games`, kind `game`, aspect `9/16`, date `2026-11-27`
- tags: ko `우편분류`, `연하장`; en `mail-sorting`, `new-year-cards`
- title: ko `연말 우편 분류 60초`; en `Year-End Mail Sort`
- desc ko: 연말 우체국에 연하장과 소포가 쏟아져요! 60초 동안 편지를 알맞은 마을 우편함에 쏙쏙 넣고 콤보를 쌓아 최고 기록에 도전하세요.
- desc en: Holiday cards and parcels are piling up at the little post office. Sort each one into the right town bin in 60 seconds and chain combos for a high score.
- howto ko: 가운데 편지의 마을을 보고 아래 우편함 4개 중 하나를 누르세요(숫자키 1~4나 A·S·D·F도 돼요). 맞히면 콤보가 쌓이고, 틀리면 3초가 줄어요. 📦 소포는 두 번 눌러야 들어가고, ⚡ 급행은 빨리 넣으면 시간이 늘어나요.
- howto en: Read the town on the letter in the middle and tap the matching bin below (keys 1-4 or A S D F work too). Right answers build a combo and wrong ones cost 3 seconds. 📦 Parcels need two taps, and ⚡ express letters add time if you sort them fast.
- about ko: 마을 이름과 보내는 사람은 모두 지어낸 거예요. 실제 주소나 우편번호는 쓰지 않아요. 연말 카드 한 장 보내고 싶어지는 게임이 되면 좋겠어요.
- about en: All towns and senders are made up, with no real addresses or postcodes. We hope it makes you want to mail a card this year.

## Pitch

A tiny post office counter at night, with warm lamp light and snow outside the window.

1. Letters drop one at a time into the middle tray. Each has a stamp, a sender ("할머니 🧓", "옆집 고양이 🐈") and a destination town.
2. Below are 4 wooden mail bins, each with a town name, emoji and color.
3. Tap the right bin and the letter flies into it with a *thunk*. Wrong bins spit the letter back out with a shake.
4. After 60 s the shift ends with a "오늘의 배달 실적" card: the score, letters sorted, best combo, best score and a silly postal rank.

The game gets harder in three stages. First the emoji disappears from the letter, then the bins swap places.

## Flow

1. **START**
   - Title, a one-line how-to, a big letter emoji that bobs, and a "탭해서 근무 시작" button.
   - Shows the best score if there is one. Mute toggle at the top right.
   - Enter, Space or a tap starts.
2. **COUNTDOWN**
   - "3, 2, 1, 배달 시작!", 0.6 s per step.
   - Input is ignored until it ends.
3. **PLAY (60 s)**
   - HUD at the top: time bar plus seconds, score, and combo "×2 🔥".
   - Middle: the current letter card, large. A smaller "다음" (next) letter peeks at the top right at 60% scale.
   - Bottom: 4 bins in a row, each at least 64 px tall, with their key hint (1/A, 2/S, 3/D, 4/F) in a small circle.
   - Stages, counted by correctly sorted letters `n`:
     - **Stage 1** (n < 12): the letter shows the town emoji and name in color.
     - **Stage 2** (12 ≤ n < 28): the letter shows only the town name in plain ink, with no emoji and no color.
     - **Stage 3** (n ≥ 28): same as stage 2. Every 10 correct letters the bins shuffle positions: a 0.5 s "우편함 자리 바뀜!" banner shows, then the bins slide to their new slots. Input is ignored during the slide.
   - Specials, rolled per letter after n ≥ 5:
     - 📦 **Parcel**, 12% chance. Takes 2 taps on the correct bin: the first tap shows a squash and "한 번 더!", the second sorts it. A wrong tap counts as a wrong answer and resets the tap count. Worth +25.
     - ⚡ **Express**, 10% chance. A small ring timer of 1.5 s runs. Sorted before it ends: +2 s and a "+2초" pop. After that it is a normal letter.
     - Never two specials in a row.
4. **GAME OVER**
   - When time hits 0: a "근무 끝!" stamp thumps onto the screen (scale 2 → 1, rotation −10°).
   - The result card shows:
     - score
     - letters sorted, wrong count, best combo
     - best score, with "신기록!" ribbon when beaten
     - rank title
   - A big "다시 근무하기" button, plus a smaller "처음으로".
   - Enter or R retries. The retry button ignores input for 600 ms after game over, so a frantic last tap does not restart.

## Controls

- **Pointer:** tap a bin. Pointer events only, `touch-action:none` on the whole play area, and `preventDefault` on pointerdown.
- **Keys:** 1–4 or A/S/D/F pick bins by on-screen position (left to right), not by town, so shuffles still map to what the player sees. Enter/Space start and retry. M toggles sound. P or Escape pauses.
- **Holding a key** does not repeat (ignore `e.repeat`).
- **Input lock:** ignore sorting input for 120 ms after each correct sort, so one tap cannot sort two letters. Parcel taps are exempt.

## Towns (fixed set)

| id | ko | en | emoji | bin color |
|---|---|---|---|---|
| snow | 눈꽃마을 | Snowflake Village | ❄️ | #5aa9e6 |
| harbor | 파도항 | Wave Harbor | ⚓ | #2f7f86 |
| orchard | 귤밭섬 | Tangerine Isle | 🍊 | #f08a24 |
| star | 별빛시 | Starlight City | ⭐ | #8b6fd6 |

- At the start of each run the bin order is shuffled.
- Letter towns are random, never the same town 3 times in a row.

## Letters

- **Card:** cream paper (#fbf6ea) with a zig-zag stamp in the top-right corner. The stamp shows a random seasonal emoji: 🎄⛄🐑🎍🔔🧤.
- **Lines:**
  - "받는 곳: {town}" / "To: {town}", in big text (22–28 px depending on width)
  - "보내는 이: {sender}" / "From: {sender}", in small gray text
- **Envelope variants** are cosmetic only: a red/green airmail border, a kraft color, or a holiday card with a sheep emoji.
- **Senders** (random):

| ko | en |
|---|---|
| 할머니 🧓 | Grandma 🧓 |
| 옆집 고양이 🐈 | The cat next door 🐈 |
| 산타 대리 🎅 | Santa's assistant 🎅 |
| 3학년 2반 ✏️ | Class 3-2 ✏️ |
| 눈사람 ⛄ | A snowman ⛄ |
| 작년의 나 📮 | Me from last year 📮 |
| 펭귄 동호회 🐧 | Penguin Club 🐧 |
| 익명의 붕어빵 🐟 | An anonymous fish bun 🐟 |
| 양띠 친구 🐑 | Sheep-year friend 🐑 |
| 이웃 집배원 🚲 | Fellow mail carrier 🚲 |

## Scoring

- Correct letter: +10 × mult. Parcel: +25 × mult.
- combo = consecutive correct sorts. mult = min(4, 1 + floor(combo / 5)).
- Wrong bin: combo = 0, time −3 s, the letter shakes and stays.
- Time cannot go below 0. Express bonus time is capped so the total remaining never exceeds 60 s.
- Tracked stats: score, sorted (correct count, a parcel counts 1), wrong, bestCombo.

## Rank titles (by score)

| score | ko | en | emoji |
|---|---|---|---|
| < 100 | 우체국 견학생 | Post Office Visitor | 🎒 |
| < 250 | 신입 분류원 | Rookie Sorter | 📨 |
| < 450 | 연말 특근 에이스 | Holiday Shift Ace | 📮 |
| < 700 | 눈보라 속 집배원 | Mail Carrier of the Blizzard | 🌨️ |
| ≥ 700 | 전설의 분류왕 | Legendary Sort Master | 👑 |

Hidden title: wrong = 0 and sorted ≥ 30 gives "한 통도 안 틀린 사람 / Not a Single Miss" 🎯.

## Feedback and juice

- **Correct:** the letter flies in an arc into the bin (220 ms ease-in). The bin bounces (scale 1 → 1.12 → 1), shows 6 paper-confetti particles in the bin color, and a "+10" pop floats up.
- **Combo milestones** (5, 10, 15, 20): a "×2!" flash with a short warm glow behind the HUD.
- **Wrong:** the letter shakes horizontally by 6 px for 180 ms, the wrong bin gets a red outline flash, and "−3초" pops up in red.
- **Last 10 s:** the time bar turns red and pulses, with a soft tick every second if sound is on.
- **Game over:** stamp thump, screen shake 4 px for 120 ms, and confetti if it is a new record.

## Visual design

- **Palette:**
  - wall: a gradient from #2b2238 to #3c2f4a
  - counter wood #8a5a3b with highlight #a8714d
  - lamp glow: a radial gradient of #ffd59a at 25% alpha
  - paper #fbf6ea, ink #2a2530, gray #8f8794, wrong red #e0453d, combo gold #ffc94a
- **Background:** a window at the top left with ~40 snow particles on canvas. DPR is capped at 2. Pause when hidden.
- **Bins:** CSS boxes with a darker slot line, a town emoji and name (14–16 px, wrapping to 2 lines at 320 px).
- **Layout:**
  - Use `100dvh`. HUD about 12% of the height, letter area about 55%, bins about 25%.
  - Recompute on `resize`.
  - On wide screens, use a centered column with a max width of 480 px. The wall and snow fill the whole window.
- **Fonts:** system-ui stack. Numbers use `font-variant-numeric: tabular-nums`.
- **prefers-reduced-motion:** no fly arc (fade instead), no shake, no confetti, 15 slow snow particles, and the bin shuffle is instant after the banner.

## Sound (off by default, Web Audio after first gesture)

- Correct: a 70 ms sine thunk at 220 Hz → 140 Hz, gain 0.10, plus a 30 ms paper noise burst (bandpass 2 kHz).
- Combo milestone: two quick triangle notes, 660 then 880 Hz, 80 ms each, gain 0.06.
- Wrong: a 120 ms square buzz at 110 Hz, gain 0.05.
- Last-10-s tick: 20 ms at 1.5 kHz, gain 0.03.
- Game over: a 3-note descending bell (sine at 880/660/523 Hz, 200 ms each with decay).
- Mute toggle 🔊/🔇, persisted.

## Strings

| key | ko | en |
|---|---|---|
| appTitle | 연말 우편 분류 60초 | Year-End Mail Sort |
| startSub | 쏟아지는 연하장, 알맞은 마을 우편함에 쏙! | Holiday mail is pouring in. Drop each letter in the right town bin! |
| startBtn | 탭해서 근무 시작 | Tap to start your shift |
| bestLabel | 최고 기록 | Best |
| countGo | 배달 시작! | Start sorting! |
| hudTime / hudScore / hudCombo | 남은 시간 / 점수 / 콤보 | Time / Score / Combo |
| next | 다음 | Next |
| to / from | 받는 곳 / 보내는 이 | To / From |
| parcelMore | 한 번 더! | One more! |
| expressBonus | +2초 | +2s |
| wrongPenalty | −3초 | −3s |
| shuffleBanner | 우편함 자리 바뀜! | Bins moved! |
| paused / resume | 잠깐 쉬는 중 / 계속하기 | Paused / Resume |
| overStamp | 근무 끝! | Shift over! |
| resultHead | 오늘의 배달 실적 | Today's Delivery Report |
| sortedLabel / wrongLabel / comboLabel | 분류한 우편 / 잘못 넣음 / 최고 콤보 | Sorted / Misses / Best combo |
| newRecord | 신기록! | New record! |
| retry | 다시 근무하기 | Work another shift |
| home | 처음으로 | Title screen |
| soundOn / soundOff | 소리 켜기 / 소리 끄기 | Sound on / Sound off |
| keyHint | 숫자키 1~4 또는 A S D F | Keys 1-4 or A S D F |
| foot | 마을과 보내는 이는 모두 지어낸 거예요 | All towns and senders are made up |

Town names, sender names and rank titles are listed in their own tables above.

## localStorage (in try/catch, prefix `yms:`)

- `yms:best`: the best score (integer)
- `yms:sound`: "1" or "0", default "0"
- `yms:plays`: the number of runs started (not shown in the UI)

## Edge cases

- **Hidden page during play:** auto-pause, clamp delta to 50 ms, and show the paused overlay when the player returns. The timer never runs while hidden.
- **Resize mid-play:** re-layout from state. The current letter, bin order and timer are untouched. An in-flight letter snaps to its target.
- **Taps during the countdown, shuffle slide, game-over stamp or 600 ms retry lock** are ignored.
- **Multi-touch:** only the first active pointer counts. Ignore others until it lifts.
- **An express letter sorted wrong:** apply the normal penalty and cancel its bonus.
- **A parcel when time runs out mid-tap:** no points.
- **Retry fully resets:** score, combo, stage, n, bin order (reshuffled), specials streak, timer, particles and queued letters.
- **Blocked localStorage:** the game still works and the best score lasts for the session only.
- **`location.hash === '#demo'`:** start directly in PLAY at stage 1 with score 180, combo 7 (×2), 34 s left, and a parcel letter showing. The timer stays frozen until the first input. This is for QA thumbnails only.
- **320×480 window:** bins wrap their town names to 2 lines, the letter text shrinks to 22 px, and nothing overflows or scrolls.

## Must not

- No network of any kind, and no raster images (kind `game`: SVG, canvas, CSS and emoji only).
- No real postal brands, logos, colors or mascots (do not imitate the Korea Post swallow logo or its orange/red livery), and no real addresses, postcodes, cities or people.
- Sender jokes stay kind. No mocking of jobs, regions, ages or groups.
- No timers that punish beyond the 60 s round, no ads-style "continue" or fake rewards.
- No alert, confirm, prompt, window.open or navigation. No sound autoplay.
