# Idea and spec: 사소한 드라마 대본 뽑기 / Petty Drama Script Generator

## Concepts scored

Scores are 1–5 for: value in the first 10 seconds, originality, Korean search/share demand, and buildability in one HTML file. Maximum 20.

I skipped the three directions in today's research because specs on the same subjects are already queued. The brushing-tension game is `snowy-hedgehog-brush`. The squishy toy is `squishy-squeeze`. The year-end tax checks are `card-deduction-calculator-2026` and `medical-expense-tax-credit-2026`. The new concept below comes from research item 5 (the trend of acting out a short line as a drama scene). It does not use the original challenge phrase, and it does not touch the poverty angle.

| Concept | Category | Score | Verdict |
|---|---|---|---|
| **Petty Drama Script Generator**: pick a trivial object fight (the last tangerine, the remote) and a genre, and get an overdramatic two-person script you can play back with zooms and stings | **random** | **5/4/4/5 = 18** | **Picked**: it matches the trend of acting out one line as a short video, there is nothing like it on the site, and the result is a script card made for screenshots |
| Night Train Window: a radio of synthesized rail clatter, a passing-station chime and snow sliding past a dark window | radio | 3/4/3/4 = 14 | The radio slot is already crowded (`snowy-lofi-radio` is queued). Keep it for later |
| Sorting Line-Up: watch bubble, insertion and quick sort put winter-coat people in line, one step at a time | tech | 3/3/2/5 = 13 | Low share demand. Keep it as a learning item |

## Meta

- slug `petty-drama-script`, category `random`, kind `tool`, aspect `9/16`, date `2026-11-27`
- tags: ko `드라마 대사`, `상황극`; en `drama`, `script generator`
- title: ko `사소한 드라마 대본 뽑기`; en `Petty Drama Script Generator`
- desc ko: 마지막 귤, 리모컨, 전기장판 명당… 사소한 다툼을 멜로·막장·사극·오피스 드라마 대사로 바꿔 줘요. 3단 줌인 연출까지 재생해 상황극 숏폼으로 찍어 보세요.
- desc en: Turn petty fights over the last tangerine or the TV remote into over-the-top melodrama, makjang, historical or office scripts, then play them back with dramatic zooms.
- howto ko: 장르와 사건을 고르고 '큐! 대본 뽑기'를 누르세요. 마음에 안 드는 대사는 눌러서 그 줄만 다시 뽑을 수 있어요. '연출 재생'을 누르면 자막, 줌인, 효과음이 나와요. 숫자키 1~4로 장르, Enter로 뽑기·재생, R로 다시 뽑기, S로 이미지 저장을 할 수 있어요.
- howto en: Pick a genre and an incident, then tap "Action! Get a script". Tap any line to reroll just that line. "Play scene" shows subtitles with zooms and stings. Keys: 1-4 pick a genre, Enter generates or plays, R rerolls, S saves an image.
- about ko: 실제 드라마, 배우, 유행어를 따라 하지 않은 창작 대사예요. 입력한 이름은 이 기기 밖으로 나가지 않아요. 친구와 한 줄씩 나눠 읽으면 더 재밌어요.
- about en: All lines are original and imitate no real show, actor or catchphrase. Names you type never leave this device. It's best read aloud with a friend, one line each.

## Pitch

A dark stage with a spotlight. Two simple silhouettes stand on it, labelled with the names the user typed.

1. The user picks one of 4 genres and one of 12 petty winter incidents (or 🎲 for a random one).
2. A clapperboard snaps shut, and a typed script card fills in: scene header, stage direction, line A, line B, camera cue, BGM cue and the finale line.
3. Tapping any line rerolls only that line.
4. "▶ Play scene" plays the script for about 12 s on the stage, as subtitles with a triple zoom-in, spin or shake, plus a synthesized sting. It ends with "— 다음 화에 계속 —".
5. The card saves as a PNG or copies as text. People film themselves reading it, or screen-record the playback.

The humor comes from treating trivial household things with life-or-death drama. Nobody is the target.

## Flow

1. **START (setup)**
   - The title, with a one-line subtitle under it.
   - Two optional name fields: A (default 주인공 / Lead) and B (default 상대 / Rival). Max 6 characters each.
   - 4 genre chips in a 2×2 grid, each with an emoji and the key number.
   - An incident grid of 12 chips in 3 columns, plus a 🎲 랜덤 chip. The grid scrolls internally if the screen is short.
   - A big red primary button "🎬 큐! 대본 뽑기", and the mute toggle at the top right.
   - Defaults: the last genre (from storage), or 멜로. The incident defaults to 🎲.
2. **CLAP** (0.6 s)
   - A CSS clapperboard drops in, and the top bar snaps shut with a clap sound.
   - It shows "S#{scene}" and "제{ep}화 / EP {ep}".
3. **SCRIPT (result)**
   - The script card types in line by line, about 0.12 s per line and 1 s in total.
   - Each line has a small 🔁 at the right. Tapping it rerolls that slot with a 150 ms flip animation.
   - A sticky bottom bar holds [▶ 연출 재생] [🎲 다시 뽑기] [⋯]. The ⋯ menu opens as an inline sheet, not a dialog, with [이미지 저장] [텍스트 복사] [처음으로].
   - 다시 뽑기 keeps the genre, incident choice and names, and rerolls everything. If the incident was 🎲, it draws a new incident.
4. **PLAY (scene playback, about 12 s, skippable)**
   - The stage takes the whole view. Subtitles sit in the lower third: white, 22–28 px bold, with a black 60% backing box.
   - Sequence and timings:

     | Step | What shows | Time |
     |---|---|---|
     | 1 | slate "S#{scene}. {place} / {time}" | 1.2 s |
     | 2 | stage direction in italic gray | 1.8 s |
     | 3 | A's line, with A's silhouette lit | 2.4 s |
     | 4 | the camera cue effect runs | 1.2 s |
     | 5 | B's line, with B lit | 2.4 s |
     | 6 | the BGM cue sting plays | 0.6 s |
     | 7 | the finale line, said by A | 2.4 s |
     | 8 | end card "— 다음 화에 계속 —" | 1 s |

   - A tap or Space skips to the next step. Esc returns to SCRIPT.
   - After the end card, the view returns to SCRIPT on its own.

## Controls

- **Pointer:** tap everything. On SCRIPT, tap a line to reroll it. On PLAY, tap to skip a step.
- **Keys on START:** 1–4 pick a genre. Arrow keys move focus in the incident grid and Space selects. Enter generates.
- **Keys on SCRIPT:**
  - Enter or Space plays the scene. R rerolls everything.
  - Keys 1–6 reroll a line: 1 is the stage direction, 2 is A, 3 is the camera cue, 4 is B, 5 is the BGM cue and 6 is the finale.
  - S saves, C copies, Esc goes back to START.
- **Keys on PLAY:** Space or ArrowRight skips a step. Esc stops.
- **Any screen:** M toggles sound.
- **Touch and layout:**
  - Every tap target is at least 44 px.
  - The stage has `touch-action:none`, and the incident grid and script card have `touch-action:pan-y`.
  - Call `preventDefault` on Space and the arrow keys.
  - The name inputs keep normal typing. Key shortcuts are ignored while an input has focus.

## Generation

- On each generate, state is `{genre, itemIdx, place, time, dir, a, cam, b, bgm, fin, scene, ep}`. Each field is an index into its pool.
- The random source is `Math.random`. A script does not need to be reproducible.
- A line reroll draws an index different from the current one.
- `scene` is drawn from 1–99, `ep` from 1–24, and time from 밤/낮 (NIGHT/DAY).
- On resize, the card is re-rendered from state.

### Josa (Korean particles)

Lines carry tokens: `{item}`, `{item:을를}`, `{item:이가}`, `{item:은는}`, `{item:과와}`.

```js
const has = w => { const c = w.charCodeAt(w.length - 1) - 0xAC00; return c >= 0 && c <= 11171 && c % 28 !== 0; };
// '을를' -> has ? '을' : '를', and the same for 이가 / 은는 / 과와
```

- All incident nouns end in a Hangul syllable, so the check always applies.
- Never use 으로/로, because the ㄹ exception is a trap.

### English item forms

- Each item has `en` (with an article, e.g. "the last tangerine") and `enBare` (no article, e.g. "last tangerine").
- `{item}` gives `en`, `{Item}` gives `en` with the first letter capitalized, and `{itemBare}` gives `enBare`.
- Korean lines ignore `{itemBare}` and use the plain noun.

### Incidents (12)

| # | ko | en | enBare | emoji |
|---|---|---|---|---|
| 1 | 마지막 귤 | the last tangerine | last tangerine | 🍊 |
| 2 | 붕어빵 꼬리 | the fish-bread tail | fish-bread tail | 🐟 |
| 3 | 리모컨 | the TV remote | TV remote | 📺 |
| 4 | 전기장판 명당 | the warm spot on the heated mat | heated-mat spot | 🛏️ |
| 5 | 와이파이 비밀번호 | the Wi-Fi password | Wi-Fi password | 📶 |
| 6 | 냉장고 속 푸딩 | the pudding in the fridge | fridge pudding | 🍮 |
| 7 | 휴대폰 충전기 | the phone charger | phone charger | 🔌 |
| 8 | 마지막 핫팩 | the last hand warmer | last hand warmer | 🔥 |
| 9 | 편의점 우산 | the convenience-store umbrella | umbrella | ☂️ |
| 10 | 극세사 이불 | the fleece blanket | fleece blanket | 🧸 |
| 11 | 엘리베이터 닫힘 버튼 | the elevator close button | close button | 🛗 |
| 12 | 치킨 무 | the pickled radish | pickled radish | 🥢 |

### Genre pools

Each genre has places (4), A lines (5), B lines (5) and finales (4).

**1. 멜로 / Melodrama 🌧️**

Places:
- 눈 내리는 버스 정류장 / a snowy bus stop
- 새벽 편의점 앞 / outside a convenience store at dawn
- 불 꺼진 거실 / a dark living room
- 막차 지하철 / the last subway

A:
- 이제 와서 {item:을를} 돌려 달라고? 늦었어. / You want {item} back now? It's too late.
- 나 사실... 처음부터 {item:이가} 좋았어. / The truth is... I loved {item} from the very start.
- 우리 사이에 {item:은는} 없던 걸로 하자. / Let's pretend {item} never happened between us.
- 너한테 {item}마저 양보할 수는 없어. / I can't give up {item} to you too.
- 눈이 그치면 말할게. {item}에 대해서. / When the snow stops, I'll tell you. About {item}.

B:
- 왜... 왜 지금 그 말을 하는 건데. / Why... why are you telling me this now?
- 난 한 번도 {item:을를} 잊은 적 없어. / I never once forgot {item}.
- 가지 마. 아직 {item:이가} 따뜻하잖아. / Don't go. {Item} is still warm.
- 그럼 우리, 여기까지인 거야? / So is this where we end?
- 그 말, 3년 전에 해 주지 그랬어. / You should have said that three years ago.

Finale:
- ...반으로 나누자. 그게 우리 방식이니까. / ...Let's split it in half. That's our way.
- 내년 겨울에도 {item:은는} 내가 지킬게. / Next winter too, I'll protect {item}.
- 됐어. 오늘은 내가 질게. / Fine. I'll lose this one tonight.
- 고마웠어... {item}. / Thank you... {item}.

**2. 막장 / Makjang Twist 💥**

Places:
- 대리석 계단이 있는 저택 거실 / a mansion living room with marble stairs
- 새벽 병원 복도 / a hospital hallway at dawn
- 회장님 서재 / the chairman's study
- 비 오는 저택 정원 / a mansion garden in the rain

A:
- 감히 내 {item:을를} 건드려? / How dare you touch my {itemBare}?
- 사실 {item:은는} 처음부터 내 거였어. / The truth is, {item} was mine from the very beginning.
- 이 서류 봐. {item}의 진짜 주인이 누군지. / Look at this file. It shows who really owns {item}.
- 당신, {item:을를} 몰래 숨겨 왔지? / You've been hiding {item} all along, haven't you?
- 오늘부로 {item:은는} 내가 관리합니다. / As of today, I'm in charge of {item}.

B:
- 그럴 리 없어! 내가 어떻게 지켜 온 {item}인데! / Impossible! I guarded {item} with my life!
- 회장님! 그건 오해예요! / Chairman! It's a misunderstanding!
- 그 비밀, 무덤까지 가져가려고 했는데. / I was going to take that secret to my grave.
- 말도 안 돼... 그럼 내가 쓴 {item:은는} 뭐였어? / No way... then what was the {itemBare} I used?
- 이 집에서 나가 줘. {item:은는} 두고. / Leave this house. Without {item}.

Finale:
- 출생의 비밀이 있어. {item:은는}... 사실 쌍둥이였어. / There's a secret about its birth. {Item}... was a twin.
- 지금부터 진짜 복수가 시작된다. 디저트로. / Now the real revenge begins. With dessert.
- 3년 뒤, {item:은는} 돌아온다. / Three years later, {item} returns.
- 이 집안 가훈 몰라? 나눠 쓰는 거야. / Don't you know this family's motto? We share.

**3. 사극 / Historical Drama 🏯**

Places:
- 눈 덮인 궁궐 마당 / a snowy palace courtyard
- 장터 한복판 / the middle of a market square
- 한옥 대청마루 / the wooden hall of a hanok
- 달빛 아래 성벽 / a castle wall under the moon

A:
- 전하, {item:을를} 거두어 주시옵소서! / Your Majesty, please take back {item}!
- 감히 {item}에 손을 대다니, 여봐라! / You dare lay hands on {item}? Guards!
- 소인, 목숨을 걸고 {item:을를} 지키겠나이다. / I shall guard {item} with my life.
- 그대가 {item:을를} 가져간 자인가? / Are you the one who took {item}?
- {item:이가} 사라졌다는 소문이 궁에 파다하옵니다. / Rumors fill the palace that {item} has vanished.

B:
- 억울하옵니다! 소인은 아무것도 모르옵니다! / I am innocent! I know nothing!
- 이 몸이 쓰러질지언정 {item:은는} 내줄 수 없소. / Though I may fall, I will not hand over {item}.
- 하늘이 보고 있소. {item:은는} 주인에게 돌아갈 것이오. / Heaven is watching. {Item} will return to its true owner.
- 그것은... 선왕께서 남기신 마지막 물건이옵니다. / That... is the last thing the late king left behind.
- 통촉하여 주시옵소서! / I beg you, consider it wisely!

Finale:
- 여봐라, {item:을를} 반으로 나누어라! 공평하게! / Guards! Divide {item} in half! Fairly!
- 오늘 일은 실록에 한 줄로 남기라. "{item}, 무사함." / Record today in the annals in one line: "{Item}: safe."
- 이 나라의 평화가 {item}에 달려 있도다. / The peace of this land rests on {item}.
- 물러가라. 그리고 내일 또 오너라. / Withdraw. And come again tomorrow.

**4. 오피스 / Office Drama 💼**

Places:
- 회의실 B / meeting room B
- 탕비실 / the office pantry
- 엘리베이터 앞 / in front of the elevator
- 퇴근 5분 전 사무실 / the office, five minutes before clock-out

A:
- 이번 분기 {item} 건, 제가 책임지겠습니다. / I'll take full responsibility for the {itemBare} issue this quarter.
- 회의 전에 하나만요. {item}, 누가 가져갔죠? / One thing before the meeting. Who took {item}?
- 보고서에 {item} 얘기는 왜 빠졌습니까? / Why is {item} missing from the report?
- 오늘부터 {item:은는} 결재 받고 쓰세요. / From today, {item} requires approval.
- 사직서는 아니고요... {item} 반납서입니다. / It's not a resignation letter... it's a {itemBare} return form.

B:
- 그건... 제 연차를 걸고 말씀드릴게요. / I'd bet my annual leave on this.
- 메일로 다시 정리해서 드리겠습니다. / I'll summarize it in an email.
- 그건 제 마지막 자존심이었습니다. / That was my last shred of pride.
- 이미 늦었어요. {item:은는} 지난주에 결재 올라갔어요. / Too late. {Item} went up for approval last week.
- 저도 압니다. 다들 {item:을를} 원한다는 걸. / I know. Everyone wants {item}.

Finale:
- 좋아요. 이 건은... 다음 주 회의에서 다시 얘기하죠. / Fine. Let's... revisit this in next week's meeting.
- 오늘은 여기까지. 다들 칼퇴하세요. / That's all for today. Everyone clock out on time.
- 회의록에 남겨 주세요. "{item}, 공동 소유." / Put it in the minutes: "{Item}: shared ownership."
- (조용히 노트북을 덮으며) 수고하셨습니다. / (quietly closing the laptop) Good work, everyone.

### Shared pools

These pools are the same for all genres.

**Stage directions (8):**
- (창밖으로 첫눈이 내린다) / (The first snow falls outside the window)
- (천천히 돌아선다) / (Turns around slowly)
- (떨리는 손으로 {item:을를} 내려놓는다) / (Sets down {item} with a trembling hand)
- (3초간 아무 말이 없다) / (Three seconds of silence)
- (눈물을 참으며 귤을 깐다) / (Peels a tangerine, holding back tears)
- (갑자기 비가 쏟아진다. 실내인데.) / (Suddenly it pours. Indoors.)
- (휴대폰 진동이 울린다. 광고 문자다.) / (A phone buzzes. It's a spam text.)
- (배경에서 누군가 라면을 끓인다) / (Someone boils ramen in the background)

**Camera cues (6).** Each cue has a playback effect. Under reduced motion, every effect is a 300 ms crossfade instead.

| ko | en | effect |
|---|---|---|
| 카메라: 3단 줌인 | Camera: triple zoom-in | stage scale 1 → 1.15 → 1.32 → 1.5, in 3 steps of 0.3 s, with a whoosh on each |
| 카메라: 슬로모션 회전 | Camera: slow-motion spin | rotate the stage 0 → 8° → 0 over 1.2 s, easing |
| 카메라: 눈동자 클로즈업 | Camera: extreme close-up on the eyes | scale to 2.4 on the speaker's head, with a black letterbox |
| 카메라: 뒤통수에서 정지 | Camera: freeze on the back of the head | flip the silhouette, then a 0.8 s freeze with a grain overlay |
| 카메라: 갑자기 창밖 풍경 | Camera: cut to the view outside, for no reason | a hard cut to a snowy night-window canvas for 1 s |
| 카메라: 흔들리는 핸드헬드 | Camera: shaky handheld | a 6 px random shake for 1.2 s |

**BGM cues (6).** Each cue plays a synthesized sting.

| ko | en | sting |
|---|---|---|
| BGM: 피아노 한 음 "띵—" | BGM: a single piano note, "ding—" | sine at 880 Hz, 1.2 s decay |
| BGM: 웅장한 현악 | BGM: swelling strings | 3 detuned saws at 220/277/330 Hz, low-pass, 1 s swell |
| BGM: 갑자기 뚝 끊김 | BGM: cuts off suddenly | a 0.4 s chord, then a hard stop |
| BGM: 오르골 | BGM: music box | 5 triangle notes, 120 ms apart |
| BGM: 북소리 "둥!" | BGM: drum "BOOM!" | 60 Hz sine plus noise, 300 ms |
| BGM: 아무 소리 없음 | BGM: total silence | nothing, and the subtitle box dims |

## Script card layout

- An HTML card styled like a script page: max-width min(92vw, 440px), paper color #f6f1e7, ink #1f1d1a.
- Margins are ruled with a 1 px #e2d9c8 line, and the card scrolls internally.
- Header: "제{ep}화 · {genreName}" in small caps gray, then "S#{scene}. {place} / {time}" in bold 18 px.
- Rows, in this order:
  1. the stage direction (italic, gray)
  2. **{nameA}**: "{a}"
  3. the camera cue (small red tag style)
  4. **{nameB}**: "{b}"
  5. the BGM cue (small blue tag)
  6. **{nameA}**: "{fin}"
- Footer: a large incident emoji, then "— 다음 화에 계속 —" and "play.mesisi.net" in 11 px gray.
- Speaker names use the accent color of their silhouette: A is #e0453d (red), B is #3d7be0 (blue).
- Each row is a `<button>` with an aria-label of "이 줄 다시 뽑기 / Reroll this line", so it is keyboard and screen-reader reachable.

## Visual design

- **Palette:**
  - stage: a gradient from #14121a to #2a2235, with a spotlight radial gradient of #fff at 18%
  - primary red #e0453d, chips #2f2a3a (selected: a #f2c14e border with a glow)
  - text #f4f1ea
- **Silhouettes:** drawn on a canvas, as a head circle plus a rounded trapezoid body. A stands left in red and B stands right in blue, with the name label below. The speaking one is at full alpha and the other at 40%. DPR is capped at 2.
- **Background:** slow falling snow behind the stage, 40 particles (20 under reduced motion). Pause it when `document.hidden`. Delta time is capped at 50 ms.
- **Clapperboard:** CSS stripes in black and white. The top arm rotates −25° → 0 in 120 ms, then shakes 4 px.
- **Typography:** system-ui for everything. Script lines are 17 px (15 px at 320 px wide). Long lines wrap and are never truncated.
- **Small screens:** at 320 px wide, use 12 px side padding, keep the incident grid at 3 columns and allow chip labels to wrap to 2 lines.
- **Wide screens:** a centered column with max-width 480 px. The stage and snow fill the window.
- **prefers-reduced-motion:** no zoom, spin or shake. Camera cues become crossfades, there is no typing animation, and the clapperboard just appears.

## Sound (off by default)

- Clap: a 30 ms noise burst through a high-pass at 2 kHz, gain 0.15.
- Reroll flip: a 20 ms tick at 1.4 kHz, gain 0.04.
- Whoosh: filtered noise sweeping 400 → 2000 Hz over 250 ms, gain 0.08.
- BGM stings are as in the table above. The master gain is 0.2.
- Web Audio starts only after the first user gesture. The mute toggle (🔊/🔇) is persisted.

## Export and copy

- **Save image:**
  - Draw the card on an offscreen canvas 750 px wide, at full height. Do not screenshot the DOM.
  - Use a #14121a background with 40 px padding and a "play.mesisi.net" watermark in 12 px gray at the bottom right.
  - Wrap Korean by characters and English by words, using `measureText`.
  - Export with `toBlob`, then click an `<a download="petty-drama-script.png">`. Revoke the URL after 1 s.
  - On failure, show the toast "저장에 실패했어요. 화면을 캡처해 주세요".
- **Copy text:**
  - Use `navigator.clipboard.writeText`, falling back to a hidden textarea and `execCommand('copy')`.
  - Show a toast on success or failure.
- **Share text, ko:**
  ```
  🎬 제{ep}화 S#{scene}. {place} / {time}
  {dir}
  {nameA}: "{a}"
  [{cam}]
  {nameB}: "{b}"
  [{bgm}]
  {nameA}: "{fin}"
  — 다음 화에 계속 — play.mesisi.net
  ```
- **Share text, en:** the same structure with the English strings and "— To be continued —".

## Strings

| key | ko | en |
|---|---|---|
| appTitle | 사소한 드라마 대본 뽑기 | Petty Drama Script Generator |
| startSub | 귤 하나에도 인생을 건다. 사소한 다툼을 드라마로 | Life-or-death drama over a tangerine. |
| nameA / nameB | 주인공 이름 (선택) / 상대 이름 (선택) | Lead's name (optional) / Rival's name (optional) |
| defA / defB | 주인공 / 상대 | Lead / Rival |
| genreLabel | 장르 | Genre |
| g1 / g2 / g3 / g4 | 멜로 / 막장 / 사극 / 오피스 | Melodrama / Makjang / Historical / Office |
| itemLabel | 사건의 발단 | What started it |
| random | 랜덤 | Random |
| go | 🎬 큐! 대본 뽑기 | 🎬 Action! Get a script |
| ep | 제{n}화 | EP {n} |
| night / day | 밤 / 낮 | NIGHT / DAY |
| play | ▶ 연출 재생 | ▶ Play scene |
| reroll | 🎲 다시 뽑기 | 🎲 Reroll all |
| more | 더보기 | More |
| save / copy / home | 이미지 저장 / 텍스트 복사 / 처음으로 | Save image / Copy text / Start over |
| rerollLine | 이 줄 다시 뽑기 | Reroll this line |
| tapHint | 대사를 누르면 그 줄만 바뀌어요 | Tap a line to reroll just that line |
| skipHint | 탭하면 다음 장면 | Tap to skip |
| toBeCont | — 다음 화에 계속 — | — To be continued — |
| saved / saveFail | 이미지를 저장했어요 / 저장에 실패했어요. 화면을 캡처해 주세요 | Image saved / Could not save. Please take a screenshot. |
| copied / copyFail | 복사했어요 / 복사하지 못했어요 | Copied / Could not copy |
| soundOn / soundOff | 소리 켜기 / 소리 끄기 | Sound on / Sound off |
| foot | 모든 대사는 창작이에요. 실제 드라마와 관계없어요 | All lines are original and unrelated to any real show |

## localStorage (in try/catch, prefix `pds:`)

- `pds:names`: a JSON array of [A, B], the last names typed
- `pds:genre`: "0" to "3"
- `pds:sound`: "1" or "0", default "0"
- `pds:count`: the number of scripts generated (not shown in the UI)

Never store the scripts themselves.

## Edge cases

- **Names:**
  - Trim names and cut them to 6 code points with `Array.from`, never by splitting UTF-16.
  - Strip control characters. An empty name falls back to the default.
  - Names go into the page only via `textContent` and canvas `fillText`. Never use `innerHTML`.
  - Names are speaker labels only and never pass through the josa function.
  - If A and B have the same name, append "(2)" to B's name.
- **Rerolls:**
  - A line reroll never repeats the current index. With 4 places, draw from the other 3.
  - A genre change on START clears nothing else. Going back to START from SCRIPT keeps the names, genre and incident.
- **Playback:**
  - Rerolling or pressing Esc during PLAY stops the timers and audio cleanly.
  - Use one timeline object driven by `requestAnimationFrame` with elapsed time. Do not chain `setTimeout`s that could leak on restart.
  - Resizing during PLAY recomputes the stage size and keeps the current step.
  - If `document.hidden` during PLAY, pause the timeline and resume where it stopped.
- **Language:** `lang` comes from `?lang=`, falling back to `navigator.language`. `<html lang>` must match. The script uses only one language, never mixed.
- **Storage:** if localStorage is blocked, everything still works with the defaults.
- **QA demo:** if `location.hash === '#demo'`, use fixed state and jump straight to SCRIPT. This is for QA thumbnails only. The state is:
  - genre 막장, item 2 (붕어빵 꼬리), place 0, time 밤
  - dir 3, a 1, cam 0, b 0, bgm 4, fin 0
  - scene 27, ep 16

## Must not

- No network of any kind. No external fonts. Stay under 120 KB.
- Do not quote or imitate real dramas, actors, broadcasters, famous catchphrases or the source challenge's line ("가난하게 컸어?"). No poverty, class, appearance or family-shaming jokes.
- No violence (no slapping, no throwing water), no romance beyond sentimental lines, no affairs, nothing sexual, no illness or death played for laughs, and no alcohol.
- Do not mock bosses, coworkers, genders, regions, ages or professions. The joke is the oversized drama about a trivial object.
- No real brands. Use the generic "편의점 / convenience store", never a chain name.
- No alert, confirm, prompt, window.open or navigation. No sound autoplay.
- No raster images or video. Everything is drawn with CSS, canvas or emoji, even though this is a tool.
