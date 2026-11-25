# Idea and spec: 멍때리기 챌린지 / Do Nothing Challenge

## Concepts scored

점수는 1–5점이며 항목은 처음 10초의 재미, 독창성, 한국 검색·공유 수요, HTML 한 파일 구현 난이도입니다. 만점은 20점입니다.

| Concept | Category | Score | Verdict |
|---|---|---|---|
| 성탄 연휴 3일 시간표 테트리스: 12/25–27 칸에 일정 블록 끼워 넣기 | games | 4/3/3/3 = 13 | `annual-leave-bridge`와 같은 "연휴 계획" 주제라 겹침. 블록 규칙도 복잡함 |
| 연말정산 놓친 공제 체크리스트 | tools | 3/2/5/2 = 12 | 수요는 크지만 수치를 국세청 자료로 확인하기 전에는 틀릴 위험이 큼. 1월에 다시 검토 |
| **멍때리기 챌린지: 아무것도 안 하면 겨울 창밖 풍경이 완성됨** | **weird** | **4/4/4/5 = 17** | **선정**: 백로그 "아무것도 하지 마" 아이디어에 리서치 row 5(설명 없이 만지는 장난감), row 6(촉각·ASMR형)을 더함. 동지 무렵 "가장 긴 밤" 분위기와 맞고, 기록을 캡처해 자랑하기 좋음 |

## Meta

- slug `space-out-challenge`, category `weird`, kind `game`, aspect `9/16`, date `2026-11-25`
- tags: ko `멍때리기`, `아무것도안하기`; en `do-nothing`, `space-out`
- title: ko `멍때리기 챌린지`; en `Do Nothing Challenge`
- desc ko: 마우스도, 화면도, 키보드도 건드리지 마세요. 가만히 있을수록 창밖에 눈이 오고 고양이가 잠들고 달이 떠요. 유혹 알림에 손이 가면 끝!
- desc en: Don't touch the mouse, the screen or the keys. The longer you stay still, the more your winter window fills with snow, a sleepy cat and the moon. Tap a fake alert and it's over.
- howto ko: '시작'을 누르고 3초 안에 손을 떼세요. 그다음엔 아무것도 하지 않으면 됩니다. 마우스 이동, 터치, 키 입력, 스크롤, 다른 탭으로 이동 중 하나라도 하면 끝나요. 중간에 뜨는 알림과 버튼은 전부 함정이에요. 휴대폰은 화면 자동 꺼짐 시간을 늘려 두면 좋아요.
- howto en: Tap Start and take your hands off within 3 seconds. Then do nothing. Moving the mouse, touching, pressing a key, scrolling or switching tabs ends the run. Every alert and button that pops up is a trap. On phones, set a longer screen timeout first.
- about ko: 바쁜 연말, 1분만이라도 아무것도 안 해 보자는 장난감이에요. 기록은 이 기기에만 저장돼요.
- about en: A toy for a busy December: try doing nothing for just a minute. Your record stays on this device.

## Pitch

밤의 작은 방에 창문 하나와 김이 나는 찻잔이 있습니다. 큰 타이머가 흐릅니다.

1. 시작을 누르면 "손 떼세요 3·2·1" 카운트다운이 나옵니다.
2. 그다음부터는 가만히 있는 것이 플레이입니다. 시간이 지날수록 창밖 풍경에 단계별로 하나씩 더해집니다: 눈, 고양이, 눈사람, 달, 별똥별, 새벽.
3. 그사이 가짜 알림, "누르지 마세요" 버튼, 기어가는 무당벌레 같은 유혹이 나타납니다. 건드리면 끝납니다.
4. 게임 오버 화면에 버틴 시간, 최고 기록, 칭호, 끝난 이유("마우스가 움직였어요")를 보여 줍니다.

첫 10초 안에 볼거리가 생기도록 눈은 5초, 첫 유혹은 12초에 나옵니다.

## Flow

1. **START**
   - 창문 장면(정지 상태, 눈 조금), 제목, 한 줄 설명, 큰 "시작" 버튼을 보여 줍니다.
   - 최고 기록 "최고 기록 02:14"를 함께 보여 줍니다.
   - 오른쪽 위에 소리 토글(🔊/🔇)이 있습니다.
   - Enter 또는 Space로도 시작할 수 있습니다.
2. **ARM (3초)**
   - 화면 중앙에 "손 떼세요" 문구와 3 → 2 → 1을 크게 표시합니다. 숫자마다 scale 1.4 → 1 pop이 들어갑니다.
   - 이 동안의 입력은 무시합니다. 끝나면 "시작!"이 0.4초 동안 떴다 사라집니다.
3. **PLAY**
   - 상단 중앙에 타이머 `mm:ss.t`를 둡니다(tabular-nums, 40 px).
   - 하단에 다음 장면 힌트를 작게 표시합니다: "다음: 고양이가 와요 · 00:20".
   - 장면 단계와 유혹은 아래 표를 따릅니다.
   - 실패 조건 중 하나라도 감지되면 즉시 FAIL로 넘어갑니다.
4. **FAIL 연출 (0.8초)**
   - 화면이 6 px로 150 ms 흔들리고, 창밖 장면이 0.5초 동안 desaturate됩니다.
   - 고양이가 있었다면 🙀로 바뀌고, 큰 글자 "앗!"이 뜹니다.
5. **GAME OVER**
   - 카드에 다음을 보여 줍니다:
     - 버틴 시간(큰 글자)
     - 최고 기록과, 새 기록이면 "🎉 새 기록!" 배지
     - 칭호(이모지 + 이름)
     - 끝난 이유 한 줄
     - 도달한 장면 "본 풍경: 4/8"
   - 버튼은 [다시 하기](큰 빨간 버튼)와 [기록 복사] 두 개입니다.
   - 게임을 끝낸 그 탭이 다시 하기 버튼을 누르지 않도록, 카드가 뜬 뒤 600 ms 동안 입력을 무시합니다.

## Controls

- **START / GAME OVER:** 탭이나 클릭으로 버튼을 누릅니다.
  - Enter·Space·R: 시작 또는 다시 하기
  - C: 기록 복사
  - M: 소리 토글
- **ARM:** 모든 입력을 무시합니다.
- **PLAY:** 정상 조작은 없습니다. 다음 입력은 모두 실패로 처리하며, 게임 키와 터치는 `preventDefault` 합니다.
  - `pointermove`: ARM이 끝난 뒤 처음 받은 좌표를 anchor로 저장합니다. anchor에서 거리가 10 px를 넘으면 실패입니다. 센서 노이즈를 감안해 10 px까지는 허용합니다.
  - `pointerdown`과 `touchstart`: 즉시 실패. 유혹 요소를 눌렀으면 그 유혹 전용 사유를 씁니다.
  - `keydown`: 모든 키가 실패입니다(M 포함). 소리 토글은 START/GAME OVER에서만 됩니다.
  - `wheel`: 실패.
  - `visibilitychange`에서 hidden: 실패. 사유는 "화면을 떠났어요"입니다. 그때까지의 시간은 기록으로 인정합니다.
  - 무시하는 것: `resize`(회전 포함), `blur`. 단 blur 뒤에 hidden이 오면 위 규칙대로 실패입니다.
- **Touch and layout:**
  - 전체 영역에 `touch-action:none`과 `user-select:none`을 적용합니다.
  - 버튼은 높이 56 px 이상입니다.
  - 컨텍스트 메뉴(`contextmenu`)는 `preventDefault` 하고, PLAY 중이면 실패로 처리합니다.

## Scene stages (elapsed seconds)

| # | t | 장면 변화 | 힌트 ko | hint en |
|---|---|---|---|---|
| 1 | 0 | 밤 창문, 찻잔 김(sine으로 흔들리는 3줄 곡선) | 다음: 눈이 와요 | Next: snow |
| 2 | 5 | 눈 시작(입자 40 → 시간에 따라 90까지) | 다음: 고양이가 와요 | Next: a cat drops by |
| 3 | 20 | 🐈 창틀 오른쪽에서 걸어 들어와 앉음(1.5초 이동) | 다음: 고양이가 졸아요 | Next: the cat dozes off |
| 4 | 45 | 고양이 💤, Z가 위로 떠오름 | 다음: 눈사람 | Next: a snowman |
| 5 | 90 | 창밖 바닥에 눈이 쌓임(높이 보간), ⛄ 등장 | 다음: 달이 떠요 | Next: moonrise |
| 6 | 150 | 🌕 아래에서 천천히 떠오름(10초), 하늘이 조금 밝아짐 | 다음: 별똥별 | Next: a shooting star |
| 7 | 240 | 20–40초 간격으로 별똥별(canvas 선 + 꼬리 fade) | 다음: 새벽 | Next: dawn |
| 8 | 600 | 하늘 그라데이션이 #1d2433 → #f6b38a로 30초에 걸쳐 바뀜, 눈 멈춤, 찻잔 김 사라짐 | 끝까지 왔어요. 계속 버텨 보세요 | You made it. Keep going |

- 단계가 바뀔 때 0.3초 동안 화면 테두리에 부드러운 빛이 납니다.
- 소리가 켜져 있으면 차임이 한 번 울립니다.

## Temptations (traps)

- **스케줄:** seed = `Date.now()`, PRNG는 mulberry32를 씁니다. 판마다 다르게 나오며 재현할 필요는 없습니다.
  - 첫 유혹은 12초에 나옵니다.
  - 이후 간격은 120초 전까지 14–24초, 그 뒤에는 8–15초입니다.
  - 동시에 최대 2개까지 띄웁니다.
- **수명:** 각 유혹은 4–6초 동안 보였다가 스스로 사라집니다. 아무것도 안 하면 이깁니다.

| type | 모양 | 눌렀을 때 사유 ko / en |
|---|---|---|
| notif | 위에서 내려오는 둥근 알림 카드(🔔, 제목, 본문, ✕ 버튼) | 알림을 눌러 버렸어요 / You tapped the alert |
| dontPress | 화면 가운데의 빨간 둥근 버튼 "누르지 마세요", 천천히 맥동 | 누르지 말랬는데… / We said don't press it… |
| fakeSkip | 오른쪽 아래 "건너뛰기 ▶" 버튼 | 건너뛸 건 없었어요 / There was nothing to skip |
| bug | 🐞이 화면을 대각선으로 6초 동안 기어감 | 무당벌레를 잡으려 했어요 / You went for the ladybug |
| itch | 화면 한쪽에 "여기 먼지 묻었어요 →" 화살표와 회색 점 | 먼지는 가짜였어요 / The dust was fake |
| whisper | 버튼이 없는 문구만 페이드 인·아웃 (실패 판정 없음) | — |

notif 문구 풀(무작위, 실제 앱 이름과 로고 없음):

| ko | en |
|---|---|
| 새 메시지 1개: "자니?" | 1 new message: "u up?" |
| 택배가 문 앞에 도착했어요 (아마도) | A package is at your door (probably) |
| 단톡방에 새 글 99+ | 99+ new messages in the group chat |
| 지금 확인하지 않으면 영영 모름 | If you don't check now, you'll never know |
| 오늘의 할 일 3개가 기다려요 | 3 to-dos are waiting for you |
| 업데이트를 설치하려면 누르세요 | Tap to install the update |

whisper 문구 풀:

| ko | en |
|---|---|
| 손가락이 근질근질하죠? | Fingers getting itchy? |
| 지금 그만두면 편해요 | Quitting now would be so easy |
| 마우스가 외로워 보여요 | Your mouse looks lonely |
| 아무것도 안 하는 것도 일이에요 | Doing nothing is work too |

- 유혹은 DOM 요소(`button`)로 만들고 pointer 이벤트로 식별합니다.
- 유혹이 아닌 곳을 누르면 "화면을 건드렸어요"가 됩니다.

## Titles (by seconds survived)

| t | ko | en | emoji |
|---|---|---|---|
| < 15 | 손이 먼저 나가는 사람 | Hands Move First | ✋ |
| < 45 | 멍때리기 입문자 | Space-Out Rookie | 🌱 |
| < 90 | 창밖 구경꾼 | Window Watcher | 🪟 |
| < 180 | 고양이가 인정한 고요 | Cat-Approved Calm | 🐈 |
| < 300 | 눈사람급 부동자세 | Still as a Snowman | ⛄ |
| < 600 | 겨울밤 고요 장인 | Master of Winter Stillness | 🌙 |
| ≥ 600 | 새벽을 본 사람 | The One Who Saw Dawn | 🌅 |

## Fail reasons

| key | ko | en |
|---|---|---|
| move | 마우스가 움직였어요 | The mouse moved |
| touch | 화면을 건드렸어요 | You touched the screen |
| key | 키보드를 눌렀어요 | You pressed a key |
| wheel | 스크롤했어요 | You scrolled |
| hidden | 화면을 떠났어요 | You left the screen |
| menu | 오른쪽 클릭했어요 | You right-clicked |
| (trap별) | 위 Temptations 표 | see Temptations table |

## Timing

- 경과 시간은 `performance.now() - startT`로 계산합니다. 프레임 delta를 누적하지 않아서 프레임이 끊겨도 기록이 정확합니다.
- 렌더링과 입자 이동에는 delta를 쓰되 50 ms로 cap합니다.
- hidden이 되면 그 순간의 시간으로 판을 끝내고 rAF를 멈춥니다.
- Wake Lock:
  - PLAY에 들어갈 때 `navigator.wakeLock?.request('screen')`을 try/catch로 요청하고, 판이 끝나면 release합니다.
  - 지원하지 않거나 iframe 정책으로 막히면 조용히 넘어갑니다. howto에 화면 꺼짐 안내가 있습니다.

## Visual design

- **Palette:**
  - 방 벽 #2a2238, 창틀 #6b4f3a, 밤하늘 #1d2433 → #2a3550
  - 눈 #ffffff(alpha 0.85), 찻잔 #e9e4d8, 강조 빨강 #e0453d, 텍스트 #f3efe6
- **Layout:**
  - 9/16 세로 기준입니다. 창문은 화면 폭의 84%, 위에서 18% 지점에 둡니다.
  - 창틀 아래 선반에 찻잔이 있고, 타이머는 창문 위에 둡니다.
  - 넓은 화면에서는 max-width 480 px 컬럼을 가운데에 두고, 바깥은 벽 색으로 채웁니다.
- **Canvas:** 하늘, 눈, 달, 별똥별, 쌓인 눈을 그립니다. DPR은 2로 cap하고, resize 때 다시 계산합니다.
- **Emoji:** 🐈, ⛄, 🌕는 canvas `fillText`로 그리고, 크기는 창문 폭에 비례하게 합니다.
- **DOM:** 타이머, 힌트, 유혹, 카드는 DOM 요소입니다.
- **Typography:** system-ui 스택을 쓰고, 타이머만 `font-variant-numeric: tabular-nums`를 적용합니다.
- **320 px 폭:** 좌우 패딩 16 px, 타이머 32 px. 알림 카드는 폭 92%로 하고 줄바꿈을 허용합니다.
- **GAME OVER 카드:** 반투명 #000a 위에 둥근 카드를 둡니다. 칭호 이모지는 scale 2 → 1로 pop하고, 새 기록이면 confetti 30개를 띄웁니다.
- **prefers-reduced-motion:**
  - 흔들림, pop, confetti가 없습니다.
  - 눈 입자는 20개로 줄이고 천천히 내립니다.
  - 별똥별 대신 별이 깜빡입니다.
  - 유혹은 슬라이드 없이 fade만 합니다.

## Sound (off by default)

- **바람:** brown noise buffer를 lowpass 400 Hz에 통과시킵니다. gain은 0.03이고, 0.1 Hz LFO로 천천히 흔듭니다.
- **단계 차임:** sine 880 Hz와 1320 Hz를 쓰고, 0.6초 동안 decay합니다. gain 0.05.
- **유혹 등장:** triangle 660 Hz를 40 ms 동안 울립니다. gain 0.03.
- **실패:** sine 220 → 110 Hz glide를 0.3초 동안 울립니다. gain 0.08.
- AudioContext는 시작 버튼을 누를 때 만들거나 resume합니다.
- 토글은 START/GAME OVER에서만 보이고, PLAY 중에는 아이콘을 숨깁니다.

## Copy text

- `navigator.clipboard.writeText`를 쓰고, 실패하면 숨긴 textarea와 `execCommand('copy')`로 대신합니다. 결과는 토스트로 알립니다.
- ko: `🧘 멍때리기 챌린지 {mm:ss} 버팀 / 칭호: {emoji} {title} / 끝난 이유: {reason} / play.mesisi.net`
- en: `🧘 Do Nothing Challenge: lasted {mm:ss} / Title: {emoji} {title} / Ended by: {reason} / play.mesisi.net`

## Strings

| key | ko | en |
|---|---|---|
| appTitle | 멍때리기 챌린지 | Do Nothing Challenge |
| startSub | 아무것도 하지 마세요. 가만히 있을수록 창밖이 예뻐져요 | Do nothing. The stiller you are, the prettier the window gets. |
| startBtn | 시작 | Start |
| startHint | 시작을 누른 뒤 3초 안에 손을 떼세요 | After tapping Start, let go within 3 seconds |
| best | 최고 기록 {t} | Best {t} |
| noBest | 아직 기록 없음 | No record yet |
| armTitle | 손 떼세요 | Hands off |
| go | 시작! | Go! |
| next | 다음: {hint} · {t} | Next: {hint} · {t} |
| oops | 앗! | Oops! |
| overTitle | 버틴 시간 | You lasted |
| newBest | 🎉 새 기록! | 🎉 New record! |
| reasonLabel | 끝난 이유 | Ended by |
| stagesSeen | 본 풍경 {n}/8 | Scenes seen {n}/8 |
| again | 다시 하기 | Try again |
| copy | 기록 복사 | Copy result |
| copied / copyFail | 복사했어요 / 복사하지 못했어요 | Copied / Could not copy |
| soundOn / soundOff | 소리 켜기 / 소리 끄기 | Sound on / Sound off |
| tipPhone | 휴대폰은 화면 자동 꺼짐 시간을 늘려 주세요 | On phones, set a longer screen timeout |
| notifClose | 닫기 | Close |
| dontPress | 누르지 마세요 | Don't press |
| fakeSkip | 건너뛰기 ▶ | Skip ▶ |
| itch | 여기 먼지 묻었어요 → | There's dust here → |
| (stage hints, notif, whisper, titles, reasons) | 위 각 표 | see tables above |

## localStorage (in try/catch, prefix `soc:`)

- `soc:best`: 최고 기록(ms, 정수)
- `soc:sound`: "1" 또는 "0", 기본값 "0"
- `soc:plays`: 플레이 횟수(UI에 표시하지 않음)

## Edge cases

- **ARM 중 입력:** 무시합니다. ARM 중에 hidden이 되면 START로 돌아갑니다(기록 없음).
- **anchor:** 마우스가 iframe 밖에 있어 pointermove가 오지 않으면 anchor가 없는 상태가 유지됩니다. 그 상태에서 처음 오는 pointermove(iframe으로 들어오는 움직임)는 바로 실패로 처리합니다. 단 ARM 끝난 뒤 첫 300 ms 안에 오는 이벤트로는 anchor만 정하고 실패로 보지 않습니다.
- **터치 기기:** 시작 버튼을 누른 손가락의 `pointerup`이 ARM 중에 오는 건 무시합니다. 한 손가락이 계속 닿아 있으면 ARM이 끝날 때 "손 떼세요"를 빨갛게 깜빡이며 ARM을 1초씩 연장합니다(최대 3번, 그 뒤엔 START로 돌아감).
- **resize와 회전:** layout만 다시 계산합니다. 판과 anchor는 유지합니다. 회전 중 브라우저가 합성 pointermove를 보내면, resize 뒤 200 ms 동안의 pointermove는 anchor만 다시 정합니다.
- **0초 실패:** ARM 직후에 실패해도 GAME OVER를 정상으로 보여 줍니다. 칭호는 ✋입니다.
- **긴 판:** 99:59.9를 넘으면 타이머를 그 값에 고정해 표시합니다. 실제 기록은 계속 쌓입니다.
- **다시 하기:** 모든 상태를 초기화합니다(유혹 타이머, 입자, 단계, anchor, wake lock). 소리 설정과 최고 기록은 유지합니다.
- **localStorage 차단:** 최고 기록을 메모리에만 보관하고, 나머지는 모두 정상 동작합니다.
- **`location.hash === '#demo'`:** QA 썸네일 전용입니다.
  - 경과 시간 오프셋 170초로 PLAY에서 바로 시작합니다(달 떠오르는 중, 고양이 💤, 눈사람).
  - notif 유혹 하나를 고정으로 띄웁니다.
  - 실패 감지는 끕니다.

## Must not

- 네트워크는 일절 쓰지 않습니다. 외부 폰트, 이미지, 래스터도 없고, 그림은 canvas, CSS, emoji로만 그립니다.
- 실제 메신저, 앱, 브랜드의 이름, 로고, 알림 모양을 흉내 내지 않습니다. 실제 "멍때리기 대회" 행사의 이름, 로고, 형식을 쓰지 않습니다.
- 명상, 건강, 스트레스 효과를 주장하지 않습니다. 순수한 장난감입니다.
- 유혹 문구에 불안을 키우는 내용(돈, 건강, 사고)을 넣지 않고, 진짜 시스템 경고처럼 보이게 만들지 않습니다. 알림 카드 구석에 작게 "가짜" 라벨을 붙입니다.
- 실패 문구로 사용자를 비난하지 않습니다. 가볍고 귀엽게 씁니다.
- alert, confirm, prompt, window.open, 페이지 이동을 쓰지 않습니다. 소리를 자동 재생하지 않습니다.
- 페이지가 스크롤되면 안 됩니다. PLAY 중에는 어떤 입력도 페이지 동작(확대, 선택, 메뉴)을 일으키지 않아야 합니다.
