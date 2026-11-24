# Idea and spec: 이불 속 야식 작전 / Midnight Snack Mission

Agent: Claude (opus), planner. Design notes are merged in (palette, layout, motion).

## Concepts scored

Scores are 1–5 for value in the first 10 seconds, originality, Korean search/share demand, and buildability in one HTML file. Maximum 20.

| Concept | Category | Score | Verdict |
|---|---|---|---|
| **Midnight Snack Mission**: hold to munch a snack under the blanket on a winter night, and let go and fake sleep when the bedroom door opens | **games** | **5/4/4/5 = 18** | **Picked**: the hold-and-freeze rule makes sense in one second, each round is short and tense, and "야식 몰래 먹기" is a very familiar Korean moment that people share. The research says Brush Jjaemu-style "freeze when watched" games are popular; this keeps only that genre rule and uses a new subject and new art |
| Trend Lifespan Fortune (유행 수명 점괘): type a snack or trend and get a joke prediction of how many days it will last | fortune | 4/4/3/5 = 16 | Good to keep for later. The jokes depend on real trend names, which get old fast and come close to brand names |
| Christmas Market Route Picker (크리스마스 마켓 코스 뽑기): a roulette of experience-style year-end outings | random | 3/2/3/5 = 13 | Research confidence is low, the format is common, and the site already has many Christmas items |

## Meta

- slug `midnight-snack-mission`, category `games`, kind `game`, aspect `9/16`, date `2026-11-25`
- tags: ko `야식`, `눈치게임`; en `midnight-snack`, `reaction`
- title: ko `이불 속 야식 작전`; en `Midnight Snack Mission`
- desc ko: 겨울밤 이불 속에서 몰래 과자를 먹어요. 방문 밑에 불빛이 새면 얼른 손을 떼고 자는 척! 딱 걸리기 전까지 몇 입이나 먹을 수 있을까요?
- desc en: Sneak a midnight snack under the blanket. When light shows under the door, let go and fake sleep. How many bites before you get caught?
- howto ko: 화면을 누르고 있으면 냠냠 먹어요(스페이스바도 돼요). 문 밑에 불빛이 보이거나 발소리가 나면 바로 손을 떼세요. 문이 열렸을 때 먹고 있으면 게임 끝! 가짜 발소리도 있어요.
- howto en: Hold the screen (or Space) to munch. When light shows under the door or you hear footsteps, let go right away. If you are munching when the door opens, it's game over. Some footsteps are fake.
- about ko: 겨울밤 몰래 먹는 야식은 왜 더 맛있을까요? 밤마다 한 판씩 도전해 보세요. 실제 야식은 적당히!
- about en: Why does a secret midnight snack taste better? Try one round a night. In real life, snack in moderation!

## Pitch

A dark, cozy bedroom on a winter night. Snow falls past the window, and a lump under a thick blanket hugs a snack. A door on the right is the only threat.

1. Hold anywhere to munch. Crumbs pop, a bite counter goes up, and the snack shrinks.
2. Footsteps and a strip of warm hallway light under the door are the warning. Let go, and the lump flips to 😴 "zzz".
3. The door swings open and a dark silhouette with two round eyes looks in. If the player is still munching, it's 딱 걸렸다! and the flashlight hits the blanket.
4. Score = total bites. The game gets faster, the warnings get shorter and fake footsteps show up more often.

One rule, one input, and runs of 20–90 seconds.

## Flow

1. **START**
   - Title, one-line how-to, the best score and a big pulsing "꾹 눌러서 시작" button.
   - The bedroom scene idles behind it.
   - The mute toggle is at the top right.
2. **PLAY**
   - HUD at the top: bites (big), the current snack emoji with its bites left, and a small level label "밤 2시 / 2 AM". The hour goes up with the level and is decoration only.
   - The door cycle runs (see Door logic).
   - When a snack is finished, it pops with sparkles, "+보너스 3" floats up, and the next snack slides in from under the pillow.
3. **CAUGHT**
   - The door is fully open while the player holds.
   - Freeze 300 ms, show a white flashlight cone from the door with a 6 px screen shake for 200 ms, and play the "딱 걸렸다!" stamp (scale 2 → 1).
4. **GAME OVER**
   - A card over the dimmed scene shows: score, best (with "신기록!" if it is new), rank title, snacks finished, and the big "한 번 더" retry button.
   - Input is ignored for 600 ms so a held finger cannot retry by accident.
   - Retry fully resets the state (door timers, level, snack queue, particles).

## Controls

- **Pointer:** `pointerdown` anywhere on the play area starts munching. `pointerup`, `pointercancel` and `pointerleave` stop it. Use `setPointerCapture`. Multi-touch counts as holding while any pointer is down.
- **Keyboard:** Space or Enter held = munch (ignore key repeat). Enter or Space on START and GAME OVER starts or retries, after the 600 ms lock. M toggles sound. P or Escape pauses.
- **Touch and layout:** `touch-action:none` on the play area, `preventDefault` on game keys and touches, `contextmenu` blocked on the play area (long press). Buttons are at least 56 px tall.
- **Lost focus:** on `blur` or `visibilitychange`, munching is released and the game auto-pauses. It shows a "일시정지 / Paused" overlay with "계속 / Resume". Door timers pause too, so hiding the tab can never cause a catch or skip a check.

## Door logic

The door is a state machine: `closed → warn → opening → open → closing → closed`, or `warn → fakeoff → closed`.

level = floor(snacksFinished / 2), capped at 10. t = level / 10.

| Parameter | Level 0 | Level 10 (lerp by t) |
|---|---|---|
| closed duration | rand 1.6–4.0 s | rand 0.7–2.2 s |
| warn duration | 900 ms | 330 ms (never below 300 ms) |
| opening (door swing) | 220 ms | 160 ms |
| open (watch) | rand 0.9–1.6 s | rand 1.0–2.4 s |
| closing | 250 ms | 250 ms |
| fake-out chance per warn | 0% (level 0–1) | 35% |

- **Warn:**
  - Footsteps start (2–3 soft thuds, visual "뚜벅" text near the door if muted).
  - The light strip under the door fades in over the warn duration.
  - There is a 60% chance of a tiny door-handle wiggle in the last 150 ms.
- **Fake-out:** the light fades out over 300 ms, then the door goes back to closed. Show a "휴..." / "Phew..." puff only if the player had released.
- **Catch check:**
  - Runs every frame while the state is `open` and only after 120 ms of grace into it, so a release in the same instant is forgiven.
  - Holding at that point = CAUGHT.
  - Holding during `warn`, `opening` or `closing` is allowed (risky but legal).
- **Close bonus:** when the door returns to `closed` after a real open, +1 "참기 보너스" (patience bonus) if the player stayed released for the whole open. Float "+1 😴".
- **First warning:** the very first warning of a run is always real and 900 ms long, as a tutorial. Show a one-time hint "손 떼!" / "Let go!" next to the door.
- Use delta time capped at 50 ms. Timers count only while not paused.

## Munching and snacks

- While holding, 1 bite every 140 ms at level 0, down to 110 ms at level 10. Release resets the sub-bite timer (no partial bites carried over).
- Snack queue, cycled in this order and looped:

| # | emoji | ko | en | bites |
|---|---|---|---|---|
| 1 | 🍪 | 쿠키 | Cookie | 8 |
| 2 | 🍫 | 초콜릿 | Chocolate | 10 |
| 3 | 🥨 | 프레첼 | Pretzel | 12 |
| 4 | 🍠 | 군고구마 | Roasted sweet potato | 14 |
| 5 | 🍙 | 주먹밥 | Rice ball | 14 |
| 6 | 🍡 | 경단 | Rice cake skewer | 16 |
| 7 | 🥟 | 만두 | Dumplings | 16 |

- Finishing a snack gives +3 bonus.
- Score = bites + bonuses.
- The snack draws at a scale of (bitesLeft / bites) with a "bitten" notch mask on canvas.
- Each bite spawns 3–5 crumb particles and a small squash on the blanket lump (scale y 0.94 for 80 ms).

## Rank titles (game over, by score)

| score | ko | en | emoji |
|---|---|---|---|
| < 15 | 들킬 뻔한 초보 | Nearly-Caught Rookie | 🐣 |
| < 40 | 바스락 견습생 | Crinkle Apprentice | 🍪 |
| < 80 | 이불 속 미식가 | Under-Blanket Gourmet | 🍠 |
| < 140 | 자는 척 장인 | Fake-Sleep Master | 😴 |
| ≥ 140 | 전설의 야식 닌자 | Legendary Snack Ninja | 🌙 |

## Visual design

- **Canvas:** a full-window canvas with DPR capped at 2. Lay out in a 9:16 logical frame fitted inside the window and letterbox with the wall color. Recompute on `resize`.
- **Palette:**
  - night wall: gradient #1b2140 → #2b3163
  - blanket #f2a65a with stripes #e98b3a
  - pillow #fdf3e1
  - hallway light #ffd27a, fading to 0
  - silhouette #0d0f1c with eyes #fffbe6
  - danger red #ff4d5a
  - UI text #fff8ec
- **Scene:**
  - The window sits top-left with snow (about 40 flakes, sine drift) and a moon.
  - The door is on the right third: a wooden rectangle with a knob. It opens by horizontal scale (perspective fake), and its gap fills with light and the silhouette.
  - The blanket lump is center-bottom. A face peeks out: 😋 while munching, 😴 with a "z z" float when released, 😳 when caught. Draw it as emoji on canvas.
- **Feedback:**
  - Bite = crumb particles plus a soft "냠" text pop every 4th bite.
  - During warn the vignette darkens 15%.
  - The silhouette eyes blink once per open.
  - CAUGHT = flash white 80 ms, shake, then the red "딱 걸렸다!" stamp rotated −6°.
- **Type:** system-ui stack. HUD score 32 px bold, everything else at least 16 px. Must stay readable at 320 px wide.
- **prefers-reduced-motion:** no shake, no flash (use a red border instead), 15 static-ish snow flakes, no bobbing button.

## Sound (off by default, Web Audio after first gesture)

- Munch: a 40 ms band-passed noise burst at 1.2–2.0 kHz (random per bite), gain 0.05.
- Footstep: a 70 ms sine at 80 Hz with fast decay, gain 0.15, 2–3 steps spaced 220 ms apart within the warn time.
- Door creak: a 250 ms saw wave sliding from 300 to 180 Hz through a lowpass, gain 0.04.
- Caught: two square blips at 660 then 440 Hz, 90 ms each, gain 0.08.
- Snack done: a sine arpeggio C6–E6–G6, 60 ms each, gain 0.05.
- The mute toggle shows 🔊/🔇 and its setting is persisted.

## Strings

| key | ko | en |
|---|---|---|
| appTitle | 이불 속 야식 작전 | Midnight Snack Mission |
| startSub | 누르면 냠냠, 문 밑에 불빛이 새면 손 떼고 자는 척! | Hold to munch. Light under the door? Let go and fake sleep! |
| startBtn | 꾹 눌러서 시작 | Hold to start |
| best | 최고 기록 | Best |
| bites | 입 | bites |
| hour | 밤 {h}시 | {h} AM |
| left | 남은 {n}입 | {n} left |
| hintLetGo | 손 떼! | Let go! |
| phew | 휴... | Phew... |
| steps | 뚜벅 뚜벅 | step step |
| nom | 냠 | nom |
| patience | +1 참기 보너스 | +1 patience |
| snackDone | +3 다 먹었다! | +3 finished! |
| caught | 딱 걸렸다! | Busted! |
| score | 점수 | Score |
| newBest | 신기록! | New best! |
| snacksEaten | 먹은 간식 {n}개 | {n} snacks finished |
| retry | 한 번 더 | Try again |
| paused | 일시정지 | Paused |
| resume | 계속 | Resume |
| soundOn / soundOff | 소리 켜기 / 소리 끄기 | Sound on / Sound off |
| foot | 실제 야식은 적당히! | Real-life snacking in moderation! |
| snack names | 쿠키 / 초콜릿 / 프레첼 / 군고구마 / 주먹밥 / 경단 / 만두 | Cookie / Chocolate / Pretzel / Roasted sweet potato / Rice ball / Rice cake skewer / Dumplings |
| rank titles | see the Rank titles table | see the Rank titles table |

Language comes from `?lang=` with a fallback to `navigator.language`, and `<html lang>` must match. The hour label is decoration: level 0 = 12 → "밤 12시 / 12 AM", then 1, 2, 3... capped at 5. In Korean, levels 1–5 read "새벽 {h}시" instead, using key `dawn` = "새벽 {h}시" / "{h} AM".

## localStorage (in try/catch, prefix `msm:`)

- `msm:best`: the best score (integer)
- `msm:sound`: "1" or "0", default "0"
- `msm:plays`: the number of runs (not shown)
- `msm:hinted`: "1" after the first-warning hint has been shown once. The first real warning still stays 900 ms on every run.

## Edge cases

- If the player is already holding when PLAY begins (they held "꾹 눌러서 시작"), that counts as munching. The first door cycle's closed phase is at least 2.0 s, so this is safe.
- Holding through GAME OVER does not retry. A fresh press is needed after the 600 ms lock.
- Losing focus or hiding the tab mid-`open` pauses and releases input. On resume, the open timer continues and the 120 ms grace restarts.
- `pointercancel` (system gesture, call overlay) = release.
- Resizing mid-run re-fits the layout from state. Timers and score are untouched.
- Tiny windows (320×480): the HUD shrinks to one row, and the door and lump scale with the frame. Nothing overlaps the tap area.
- A frame hitch longer than 50 ms is clamped, so a lag spike cannot jump straight from `warn` past the grace window without a frame.
- Score overflow is not a concern. Cap the displayed level at 10.
- If localStorage is blocked, the game still runs and best shows for this session only.
- If `location.hash === '#demo'`, start in PLAY at level 3 with score 57, the door mid-`warn` and the light strip half visible. Never game over in demo, and auto-release before open. This is for QA thumbnails only.

## Must not

- No network of any kind, no raster images or video (game: canvas, CSS and emoji only), and stay under 100 KB.
- Do not copy Brush Jjaemu or any existing "freeze when watched" game: no cat, no brushing, no similar art, layout or wording. The watcher is a faceless silhouette, never a named or gendered family member ("엄마", "아빠" and so on never appear in strings).
- No real snack brands or packaging looks.
- No diet, guilt or body-shaming jokes, no health claims, and no scolding text from the watcher.
- No sudden opens without any warning. The warning is never shorter than 300 ms, so the game stays fair.
- No jump-scare audio and no loud sounds. Sound stays off until toggled.
- No alert, confirm, prompt, window.open or navigation. No sound autoplay.
