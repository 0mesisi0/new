# Idea and spec: 곰 겨울잠 지키기 / Let the Bear Sleep

## Concepts scored

Each concept is scored 1–5 on four things: value in the first 10 seconds, originality, Korean search/share demand, and buildability in one HTML file. The maximum is 20.

| Concept | Category | Score | Verdict |
|---|---|---|---|
| 정규식 놀이터 / Regex Playground | tech | 2/2/4/4 = 12 | Useful, but generic and slow to impress. Keep in backlog. |
| 겨울밤 장작 난로 라디오 / Woodstove Night Radio | radio | 3/3/3/4 = 13 | Too close in spirit to the queued and built winter ASMR stalls. Wait a few weeks. |
| **곰 겨울잠 지키기 / Let the Bear Sleep** | **weird** | **4/4/3/5 = 17** | **Picked.** It gives the backlog idea "아무것도 하지 마" a winter subject, hibernation. The rule fits in one sentence: any input wakes the bear. 멍때리기 humor travels well, and a "D+47" result is easy to brag about. It is also the cheapest of the three to build. |

## Meta

- slug `bear-hibernation`, category `weird`, kind `game`, aspect `9/16`, date `2026-11-25`
- tags: ko `멍때리기`, `겨울잠`; en `do-nothing`, `hibernation`
- title: ko `곰 겨울잠 지키기`; en `Let the Bear Sleep`
- desc ko: 곰이 겨울잠에 들었어요. 마우스도, 화면도, 키보드도 건드리지 말고 봄까지 버티세요. 자꾸 뭔가 눌러 보라고 유혹하는 게 함정이에요.
- desc en: A bear just fell asleep for the winter. Don't move, tap or type until spring arrives. Everything on screen will try to tempt you.
- howto ko: '재우기'를 누르고 손을 떼세요. 그다음엔 아무것도 하지 마세요. 마우스를 움직이거나, 화면을 누르거나, 키를 누르면 곰이 깨요. 5초가 겨울잠 하루예요. D+120까지 버티면 봄이 와요.
- howto en: Tap "Tuck in" and let go. Then do nothing. Moving the mouse, touching the screen or pressing any key wakes the bear. Every 5 seconds is one day of hibernation. Reach day 120 and spring arrives.
- about ko: 화면에 뜨는 '눈 치우기', '꿀 주기' 같은 버튼은 전부 친절한 함정이에요. 다른 탭에 다녀오면 그동안은 시간이 멈춰서, 몰래 나가서 시간을 벌 수는 없어요.
- about en: The "Clear the snow" and "Give honey" buttons are all kind-hearted traps. Time stops while you are in another tab, so leaving the tab does not earn you any days.

## Pitch

A cross-section of a cozy cave sits on a snowy mountainside at night.

1. A round, original-drawn bear curls up and starts snoring, with Zzz bubbles drifting up.
2. The player's only job is to do nothing.
3. A big counter "겨울잠 D+0" ticks one day every 5 seconds.
4. Seasons pass outside the cave: first snow, heavy snow, the winter solstice, Christmas, New Year, Ipchun and the thaw. The snow drift at the cave mouth grows and later melts.
5. Every so often a polite lure pops up, such as "🍯 꿀 주기" or "❄️ 눈 치우기". Tapping it wakes the bear like any other input.
6. Game over shows the days survived, a title, the wake reason and the best score. Reaching D+120 (10 minutes) is a win: the bear yawns out into spring.

## Flow

1. **START**
   - Shows the title, the subtitle, the sleeping bear (already drowsy), the best score "최고 D+{n}", a big "🐻 재우기" button and the mute toggle.
   - Enter or Space also starts.
2. **SETTLING** (3 s)
   - The text "곰이 잠드는 중… 손을 떼세요 3 · 2 · 1" counts down while the bear's eyes close.
   - All input is ignored during this phase, so the start tap, its release and any shaky hand don't count.
   - At the end, the current pointer position (if known) becomes the rest point.
3. **SLEEP** (play)
   - The counter, a mm:ss timer and the season scenery advance.
   - Milestone banners and lures appear on schedule.
   - Any wake input goes to WAKE.
   - Reaching 600 s of counted time goes to SPRING.
4. **WAKE** (game over)
   - The bear's eyes pop open with a "!" bubble and a 6 px shake for 150 ms.
   - After 400 ms a result card slides up. It shows "D+{d}" in large type, the mm:ss time, the wake-reason line, the title tier, "최고 D+{best}" and a "NEW!" badge when best improves.
   - Buttons: [다시 재우기] (big) and [기록 복사].
   - Input is ignored for 800 ms after the card appears, so the waking keypress can't restart the game at once.
5. **SPRING** (win)
   - The background turns pale green with 🌸 petals.
   - The bear stretches and walks out.
   - The card shows "봄이 왔어요! D+120", the title "봄을 데려온 사람" and the same buttons.

## Controls

- **Start/retry:** tap the button, or press Enter or Space.
- **Result screen:** C copies the record, R or Enter retries, M toggles sound.
- **During SLEEP, all of these wake the bear:**
  - `pointerdown` anywhere, including on lures
  - `pointermove` more than 6 px (Euclidean) from the rest point. The first move after SETTLING with no rest point sets it.
  - `wheel`
  - `keydown` with any key. The M key also wakes the bear here: the mute toggle is hidden during SLEEP, and you set sound before you start.
  - `touchstart`
- **Not wake inputs:** `pointerleave` and the pointer leaving the iframe.
- **Resize:** pointermove is ignored for 300 ms after a `resize` event, and the rest point is reset to the next move. Layout shifts must not wake the bear.
- **Page behavior:** call `preventDefault` on keys and touches. The play area has `touch-action:none`. Buttons are at least 48 px tall.

## Time, days and scenery

- Counted time t only advances while the page is visible and the state is SLEEP.
- Delta is clamped to 50 ms.
- Day d = floor(t / 5).
- The win condition is t ≥ 600, which is d = 120.

Milestones. Each one shows a banner at the top for 3 s (fade in and out, no input needed) and changes the scenery.

| d | t | Scenery change | Banner ko | Banner en |
|---|---|---|---|---|
| 0 | 0 s | Brown leaves fall | 겨울잠 시작. 낙엽이 이불이 돼요 | Hibernation begins. Leaves make a blanket. |
| 6 | 30 s | Light snow starts | 첫눈이 와요. 곰은 몰라요 | First snow. The bear has no idea. |
| 15 | 75 s | Heavy snow; the drift grows to 30% | 대설. 동굴 입구에 눈이 쌓여요 | Heavy snow piles up at the cave mouth. |
| 27 | 135 s | Darkest sky, stars brighten | 동지. 가장 긴 밤이지만 곰에겐 그냥 밤 | Winter solstice: the longest night. To a bear, just a night. |
| 30 | 150 s | Tiny warm lights on a pine tree | 성탄절. 산타도 곰은 안 깨워요 | Christmas. Even Santa tiptoes past. |
| 37 | 185 s | A few firework sparkles in the distance | 새해. 곰의 새해 다짐: 계속 자기 | New Year. The bear's resolution: keep sleeping. |
| 60 | 300 s | Icicles on the cave lip; the drift is at 100% | 한겨울. 코 고는 소리만 따뜻해요 | Deep winter. Only the snoring is warm. |
| 71 | 355 s | The sky lightens a little | 입춘. 아직 이불 밖은 위험해요 | First day of spring, on paper. Still too cold to get up. |
| 100 | 500 s | The drift melts down to 20%; dripping | 눈이 녹아요. 조금만 더 | The snow is melting. Almost there. |
| 120 | 600 s | → SPRING | 봄이 왔어요! | Spring is here! |

Interpolate the drift height and sky color smoothly between milestones.

## Lures

- Each lure is a friendly-looking button that floats in near the bear, gently bobs for 6 s and then drifts away.
- Tapping a lure wakes the bear like any other pointerdown. The only difference is the wake reason.
- Schedule: first at t = 20 s, then every 35–55 s, with the interval drawn from a `Math.random` jitter. Only one lure is on screen at a time.
- Order: shuffle the list once per run, then cycle through it.

| id | Emoji | ko button | en button | ko wake line | en wake line |
|---|---|---|---|---|---|
| honey | 🍯 | 꿀 주기 | Give honey | 친절했지만, 곰은 꿀 냄새에 깼어요 | Kind of you, but the honey smell woke the bear. |
| snow | ❄️ | 눈 치우기 | Clear the snow | 눈 치우는 소리에 곰이 깼어요 | The shoveling woke the bear. |
| blanket | 🧣 | 담요 덮어 주기 | Tuck in a blanket | 담요가 코를 간지럽혔어요 | The blanket tickled its nose. |
| skip | ⏩ | 봄까지 건너뛰기 | Skip to spring | 봄은 건너뛸 수 없어요. 곰도 깼고요 | You can't skip to spring. Also, the bear is awake. |
| photo | 📸 | 자는 모습 찍기 | Take a photo | 찰칵! 플래시에 곰이 깼어요 | Click! The flash woke the bear. |
| check | 👀 | 잘 자나 확인하기 | Check if it's asleep | 확인하자마자 깼어요 | It woke up the moment you checked. |

Lures are styled as in-game wooden signs or paper tags, never as OS or browser notifications.

## Wake reasons (used when no lure was tapped)

| Cause | ko | en |
|---|---|---|
| move | 마우스가 살짝 움직였어요. 곰은 예민해요 | The mouse moved a little. Bears are light sleepers. |
| tap | 톡! 곰 코를 건드렸어요 | Boop! You touched its nose. |
| key | 키보드 소리에 곰이 깼어요 | The keyboard clatter woke the bear. |
| wheel | 스크롤 바람에 곰이 깼어요 | The scroll breeze woke the bear. |

## Title tiers (by d)

| d | ko | en | Emoji |
|---|---|---|---|
| < 5 | 인간 알람시계 | Human Alarm Clock | ⏰ |
| < 15 | 뒤척임 유발자 | Professional Disturber | 🫨 |
| < 37 | 겨울잠 보조 | Hibernation Assistant | 🧤 |
| < 60 | 동굴 경비원 | Cave Guard | 🔦 |
| < 120 | 겨울잠 지킴이 | Keeper of Winter Sleep | 🌙 |
| 120 | 봄을 데려온 사람 | Bringer of Spring | 🌸 |

## Visual design

- **Canvas:** one full-window canvas for the scene, with a DOM overlay for the counter, banners, lures and cards. DPR is capped at 2, and the layout is recomputed on resize.
- **Palette:**
  - night sky: a gradient from #141a2e to #26304f
  - cave rock #3a3f4f, inner cave #23202a with a warm glow #ffb86b at 15% alpha
  - bear #8a5a3b, belly #c89a72
  - snow #f4f7ff
  - accent #ffcc55 (counter, buttons)
  - spring: #dff3d8 with pink #f7b6c8
- **Bear:** drawn with canvas arcs and ellipses (an original, simple, round shape: closed-eye arcs, a small nose). It must not resemble any known character. Breathing is a scale of 1 → 1.03 on a 4 s sine. Zzz glyphs drift up and fade, one every 1.6 s.
- **Counter:** "겨울잠 D+{d}" at the top center in 40 px bold tabular numerals, with the mm:ss timer in 14 px gray below it. When d increments, the number pops (scale 1.15 → 1 over 120 ms).
- **Snow:**
  - Up to 80 particles, scaled by the current milestone intensity.
  - The drift is a filled bezier hill at the cave mouth, with height from the milestone curve.
- **Layout:** the scene stays centered and fills the window. On wide screens the cave scales to fit the height, and the sky fills the sides. Text stays readable at 320 px wide, with 16 px padding.
- **Result card:** a rounded white card with max width min(90vw, 380px). It shows the emoji and title, "D+{d}" at 56 px, the reason line and the best score. The primary button is #ffcc55 with dark text.
- **prefers-reduced-motion:**
  - no shake and no counter pop
  - lures fade in and out without bobbing
  - 20 slow snow particles, and the breathing amplitude is halved

## Sound (off by default; toggle is on START and the result screens)

- **Snore:** brown-ish noise through a lowpass at 400 Hz, gain swelling 0 → 0.03 → 0 on a 4 s cycle synced to breathing.
- **Milestone:** a soft two-note sine chime (660 Hz, then 880 Hz, 120 ms each, gain 0.05).
- **Wake:** a short upward "huh?" sine sweep from 180 to 420 Hz over 200 ms, gain 0.1.
- **Spring:** an arpeggio of 3 sine notes.
- Web Audio is created only after the start tap. The mute setting is persisted.

## Copy record

- Use `navigator.clipboard.writeText`, with a fallback to a hidden textarea and `execCommand('copy')`.
- Show a toast on success or failure. Never use alert.
- Text ko: `🐻 곰 겨울잠 D+{d} 지켰어요 ({mm:ss}) / 칭호: {title} / 깬 이유: {reason} / play.mesisi.net`
- Text en: `🐻 I let the bear sleep until day {d} ({mm:ss}) / Title: {title} / Woke because: {reason} / play.mesisi.net`
- On a win, the reason segment is replaced with `봄까지 푹 잤어요` / `Slept all the way to spring`.

## Strings

| key | ko | en |
|---|---|---|
| appTitle | 곰 겨울잠 지키기 | Let the Bear Sleep |
| startSub | 아무것도 하지 마세요. 정말 아무것도요 | Do nothing. Really, nothing. |
| startHow | 마우스·터치·키보드 전부 금지. 5초가 하루예요 | No mouse, touch or keys. 5 seconds = 1 day. |
| startBtn | 🐻 재우기 | 🐻 Tuck in |
| best | 최고 D+{n} | Best: day {n} |
| bestNone | 아직 기록 없음 | No record yet |
| settling | 곰이 잠드는 중… 손을 떼세요 {n} | Falling asleep… hands off {n} |
| counter | 겨울잠 D+{d} | Hibernation day {d} |
| hiddenBack | 다시 오셨네요. 곰은 계속 자는 중 | Welcome back. The bear is still asleep. |
| woke | 곰이 깼어요! | The bear woke up! |
| springTitle | 봄이 왔어요! | Spring is here! |
| springLine | 곰이 기지개를 켜고 봄 산책을 나가요 | The bear stretches and heads out for a spring walk. |
| newBest | NEW! | NEW! |
| retry | 다시 재우기 | Tuck in again |
| copy | 기록 복사 | Copy record |
| copied / copyFail | 복사했어요 / 복사하지 못했어요 | Copied / Could not copy |
| soundOn / soundOff | 소리 켜기 / 소리 끄기 | Sound on / Sound off |
| winReason | 봄까지 푹 잤어요 | Slept all the way to spring |

The milestone banners, lure labels, wake lines and title tiers are listed in their own tables above.

`hiddenBack` is a 2 s toast shown when returning to a visible tab during SLEEP.

## localStorage (in try/catch, prefix `hib:`)

- `hib:best`: the best day count as an integer, 0–120
- `hib:sound`: "1" or "0", default "0"
- `hib:plays`: the number of runs started (not shown in the UI)

## Edge cases

- **Hidden page:** when `document.hidden`, pause everything (counted time, rAF and audio). On return, ignore pointermove for 1 s, reset the rest point and show `hiddenBack`. Hidden time never counts.
- **Touch devices:** no pointermove happens without touch, so any touch is a wake. Device motion is not used, which avoids permission prompts.
- **Start input:** the start tap's pointerup or click, and keyup from Enter/Space, fall inside SETTLING and are ignored.
- **Retry:** fully resets t, d, the scenery, the lure schedule and the shuffle, and the current lure. Best and sound are kept.
- **Multiple wake events in one frame:** the first one decides the reason, and later ones are ignored.
- **Lure taps:** a tap on a lure reports the lure's reason, not "tap". Check the lure hit before the generic handler, or use `event.target`.
- **Blocked localStorage:** best shows `bestNone` and the game still works.
- **QA thumbnails:** if `location.hash === '#demo'`, render the SLEEP state frozen at d = 47 (New Year scenery, the drift at about 70%, a honey lure visible) and do not end on input. This is for thumbnails only.
- **Rotation or resize mid-sleep:** the scene is redrawn from state and the bear does not wake, per the 300 ms resize guard.

## Must not

- No network of any kind, no raster images. Draw with canvas, CSS and emoji only.
- The bear and scene must not resemble any existing character, mascot or game look. No real brands.
- Do not use or imitate the name or branding of any real "space-out" competition. "멍때리기" is used only as a generic tag word.
- Lures must not mimic OS, browser or app notifications, system dialogs or real ad formats.
- No guilt or shaming copy. Wake lines stay gentle and funny.
- No device motion or other permission-requiring APIs.
- Do not count hidden-tab time, and don't penalize leaving the tab.
- No alert, confirm, prompt, window.open or navigation. No sound autoplay.
