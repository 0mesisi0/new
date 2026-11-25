# Idea and spec: 크리스마스 연휴 3일 채우기 / Fill the Christmas Long Weekend

Agent: Claude (opus), 플래너. 디자인 노트(팔레트, 레이아웃, 모션)를 함께 넣었습니다.

## Concepts scored

점수는 1–5점 네 항목입니다: 첫 10초의 재미, 독창성, 한국 검색·공유 수요, HTML 한 파일로 만들 수 있는 정도. 만점은 20점입니다.

| Concept | Category | Score | Verdict |
|---|---|---|---|
| 겨울밤 로파이 라디오: 브라우저가 실시간으로 만드는 끝없는 비트 | radio | 3/3/3/4 = 13 | 이미 `winter-fireside-radio`가 radio 칸을 채우고 있음. 다음 주로 미룸 |
| 연말정산 놓친 공제 체크리스트 | tools | 3/2/5/3 = 13 | 수요는 크지만 수치를 국세청 자료로 검증해야 하고 연구 출처의 신뢰도가 low. 1월 초가 더 맞음 |
| **크리스마스 연휴 3일 채우기** | **games** | **5/4/4/4 = 17** | **선택**: 2026 성탄절이 금요일이라 생긴 3일 연휴(research row 9, high)라는 시의성 있는 소재. 케이크·선물 포장·트리 조명과 소재가 겹치지 않음. 결과 공유용 "내 연휴 시간표" 카드가 나옴 |

중복 확인: 주제(명사)는 "크리스마스 3일 연휴의 시간표"입니다. 케이크, 선물 포장, 조명, 트리, 보물찾기, 카드, 연차 계산(`annual-leave-bridge`, 연차를 붙이는 tool), 날짜 맞추기(`year-end-date-picker`)와 모두 다른 주제입니다.

## Meta

- slug `christmas-long-weekend`, category `games`, kind `game`, aspect `9/16`, date `2026-11-25`
- tags: ko `크리스마스연휴`, `퍼즐`; en `christmas-weekend`, `puzzle`
- title: ko `크리스마스 연휴 3일 채우기`; en `Fill the Christmas Long Weekend`
- desc ko: 올해 성탄절은 금요일, 금·토·일 3일 연휴예요. 늦잠, 낮잠, 영화 정주행 같은 일정 블록을 빈칸 없이 끼워 넣어 시간표를 완성하세요. 제한 시간 안에 몇 개나 채울까요?
- desc en: Christmas 2026 falls on a Friday, so you get three days off. Fit sleep-ins, naps and movie marathons into the schedule with no gaps. How many weekends can you plan before time runs out?
- howto ko: 아래 블록을 끌어서 시간표에 놓으세요. 블록을 톡 누르면 돌아가요. 칸을 모두 채우면 다음 연휴로 넘어가고 시간이 10초 늘어나요. 키보드: 1~9 블록 고르기, 방향키 이동, R 회전, Enter 놓기, Backspace 되돌리기.
- howto en: Drag blocks from the tray onto the schedule. Tap a block to rotate it. Fill every cell to move on to the next weekend and earn 10 more seconds. Keys: 1-9 pick, arrows move, R rotates, Enter places, Backspace undoes.
- about ko: 2026년 12월 25일은 금요일이라 26일(토), 27일(일)까지 사흘을 쉬어요. 대체공휴일은 없어요. 모든 판은 풀 수 있게 만들어져 있어요.
- about en: December 25, 2026 is a Friday, so the weekend runs Friday to Sunday. There is no substitute holiday. Every board is guaranteed solvable.

## Pitch

밤하늘색 배경 위에 탁상 달력처럼 생긴 시간표가 놓여 있습니다. 시간표는 3열(금·토·일)이고, 행은 시간대(아침~밤)입니다.

1. 아래 트레이에 이모지와 이름이 붙은 일정 블록(폴리오미노 2~4칸)이 나옵니다. 예: 😴 늦잠, 🎬 영화 정주행, 🍲 가족 식사.
2. 블록을 끌어다 끼워 빈칸 없이 채우면 "연휴 완성!" 도장이 쾅 찍힙니다. 바로 다음 판이 나오고 시간이 10초 늘어납니다.
3. 60초에서 시작하고, 시간이 다 되면 게임이 끝납니다. 끝 화면에서 점수, 최고 점수, 그리고 마지막으로 완성한 판의 "내 연휴 요약"(늦잠 4칸, 낮잠 2칸...)을 보여 줍니다.

무작위로 칸을 나눠서 판을 만들기 때문에 모든 판은 풀 수 있습니다.

## Flow

1. **START**
   - 제목, 한 줄 설명, "12/25(금) · 12/26(토) · 12/27(일)" 달력 배지, 큰 "연휴 계획 시작" 버튼을 둡니다.
   - 최고 점수가 있으면 "최고 {n}점"을 보여 줍니다.
   - 배경에는 별과 작은 눈송이가 천천히 떨어집니다.
   - Enter, Space, 탭 모두 시작합니다.
2. **PLAY**
   - 위쪽 HUD: 남은 시간 바와 숫자(초), 점수, 완성한 판 수 "🗓 3".
   - 가운데: 시간표 그리드. 열 머리글은 요일과 날짜, 행 머리글은 시간대입니다.
   - 아래: 블록 트레이(가로 한 줄, 넘치면 2줄로 감쌈)와 [↶ 되돌리기] [⏭ 넘기기 −5초] 버튼.
   - 판이 완성되면 600 ms 동안 "연휴 완성!" 도장이 찍히고 칸에 반짝이가 튀며 "+10초"가 떠오릅니다. 이 동안 입력을 받지 않고, 끝나면 다음 판이 나옵니다.
   - 남은 시간이 10초 이하이면 시간 바가 빨간색으로 바뀌고 초마다 맥박처럼 커졌다 작아집니다.
3. **GAME OVER**
   - "시간 끝! 연휴는 계획대로 되지 않는 법" 문구, 점수(큰 숫자), 최고 점수, 신기록이면 "🎉 신기록" 배지를 보여 줍니다.
   - 완성한 판 수와 마지막으로 완성한 판의 활동 요약(상위 3개, 칸 수)을 보여 줍니다. 완성한 판이 없으면 "이번 연휴는 즉흥 여행으로!"를 띄웁니다.
   - 버튼: 큰 [다시 하기], 그리고 [결과 복사].

## Board generation

- 열은 항상 3개(금, 토, 일)입니다. 행 수와 잠긴 칸 수는 판 번호 b(0부터 셈)에 따라 정합니다.

| b | 행 (시간대) | 칸 수 | 잠긴 칸 "📌 선약" | 블록 크기 |
|---|---|---|---|---|
| 0 | 4: 오전·오후·저녁·밤 | 12 | 0 | 2–3 |
| 1–2 | 5: 오전·점심·오후·저녁·밤 | 15 | 0 | 2–4 |
| 3–5 | 6: 아침·오전·점심·오후·저녁·밤 | 18 | 1 | 2–4 |
| ≥ 6 | 6 | 18 | 2 | 3–4 (2는 나머지 처리할 때만) |

- 시간대 en: Morning / Late morning / Lunch / Afternoon / Evening / Night. 4행·5행 판은 위 표의 부분 집합을 씁니다.
- 분할 알고리즘:
  1. 잠긴 칸을 무작위로 고릅니다. 단, 남는 칸들이 서로 4방향으로 이어져 있어야 합니다. 이어져 있지 않으면 다시 고릅니다.
  2. 아직 비어 있는 칸 가운데 위→아래, 왼쪽→오른쪽 순서로 첫 칸을 골라 새 영역을 시작합니다. 목표 크기 t를 무작위로 정하고, 인접한 빈칸 가운데 무작위로 골라 t칸이 될 때까지 키웁니다.
  3. 영역이 1칸에서 멈추면 인접한 영역에 합칩니다(합친 크기 ≤ 5). 합칠 수 없으면 판 전체를 처음부터 다시 만듭니다.
  4. 최대 50번 시도합니다. 모두 실패하면 잠긴 칸 없이 세로 도미노로만 채웁니다. 행 수가 짝수인 판에서만 쓰고, 5행 판이면 4행 판으로 바꿉니다.
- 각 영역의 모양을 정규화(왼쪽 위를 0,0으로)한 뒤, 무작위로 0/90/180/270° 돌려서 트레이에 놓습니다. 트레이 순서도 섞습니다.
- 활동은 같은 판 안에서 겹치지 않게 블록마다 하나씩 무작위로 붙입니다.
- 난수는 `Math.random`을 씁니다(일일 시드 없음). 단, `#demo`에서는 mulberry32(20261225)를 씁니다.

## Activities (블록 라벨)

| key | emoji | ko | en | color |
|---|---|---|---|---|
| sleepin | 😴 | 늦잠 | Sleep-in | #8fb3ff |
| nap | 💤 | 낮잠 | Nap | #b7a6ff |
| movies | 🎬 | 영화 정주행 | Movie marathon | #ff8fa3 |
| family | 🍲 | 가족 식사 | Family meal | #ffb86b |
| market | 🎄 | 크리스마스 마켓 | Christmas market | #6fd6a0 |
| clean | 🧹 | 방 청소 | Tidy the room | #9ad0e6 |
| snack | 🍗 | 배달 야식 | Late-night delivery | #f4a261 |
| friends | 🥳 | 친구 모임 | Hang out with friends | #f7d26a |
| walk | ❄️ | 눈길 산책 | Snowy walk | #cfe8ff |
| games | 🎮 | 게임 | Video games | #a0e57a |
| books | 📚 | 독서 | Reading | #e0b8ff |
| bath | ♨️ | 목욕탕 | Bathhouse | #ffc2d1 |
| lock | 📌 | 선약 | Already booked | #4a5270 (빗금) |

블록 칸 안에는 각 블록의 첫 칸에만 이모지와 이름을 크게 쓰고, 나머지 칸은 같은 색으로만 채웁니다. 이름이 칸보다 길면 이모지만 남깁니다.

## Controls

- **Pointer**
  - 트레이 블록을 누르고 6 px 넘게 움직이면 드래그가 시작됩니다. 블록은 잡은 지점의 오프셋을 그대로 유지한 채 손가락을 따라가고, 터치에서는 손가락에 가리지 않도록 블록을 40 px 위로 띄웁니다.
  - 그리드 위에서는 가장 가까운 칸에 맞춘 고스트를 보여 줍니다. 놓을 수 있으면 초록 테두리, 없으면 빨간 테두리입니다.
  - 놓을 수 있는 곳에서 손을 떼면 블록이 놓이고 "톡" 팝 효과가 납니다. 놓을 수 없는 곳이면 블록이 트레이로 날아서 돌아가고 120 ms 동안 흔들립니다.
  - 움직이지 않고 짧게 탭하면 블록이 시계 방향으로 90° 돕니다(트레이에서든 드래그 중이 아닐 때든).
  - 이미 놓은 블록을 누르고 끌면 다시 집어 듭니다. 그리드 밖에서 놓으면 트레이로 돌아갑니다.
  - 드래그 중에 두 번째 손가락으로 탭하거나 마우스 오른쪽 버튼을 누르면 회전합니다(`contextmenu`는 preventDefault).
- **Keyboard**
  - 1–9: 트레이에서 n번째 블록을 고릅니다. 고스트는 첫 번째로 놓을 수 있는 칸에 나타나고, 놓을 곳이 없으면 (0,0)에 나타납니다.
  - 방향키: 고스트를 움직입니다. R 또는 Space: 회전합니다. Enter: 놓습니다. Esc: 선택을 취소합니다.
  - Backspace 또는 Z: 마지막으로 놓은 블록을 되돌립니다. N: 넘기기. M: 소리 켜기·끄기.
  - START와 GAME OVER에서는 Enter가 시작·재시작입니다.
- **Layout**: 플레이 영역 전체에 `touch-action:none`을 걸고, 게임 키는 preventDefault합니다. 버튼과 트레이 블록의 터치 영역은 최소 44 px입니다.

## Scoring and timer

- 시작 시간 60초, 한 판을 완성할 때마다 +10초, 남은 시간 상한 99초.
- 판 점수 = 채운 칸 수 × 10. 15초 안에 완성하면 "빠른 계획" 보너스 +50.
- 넘기기: −5초, 점수 0, 판 번호는 올리지 않습니다(같은 난이도의 새 판). 남은 시간이 5초 이하이면 넘기기 버튼을 비활성화합니다.
- 되돌리기는 벌점 없이 무제한입니다.
- 시간은 rAF의 delta time으로 줄이고 delta는 50 ms로 자릅니다. 완성 도장이 찍히는 600 ms 동안은 시간을 멈춥니다.

## Screens (visual design)

- **팔레트**
  - 배경: #141a2e에서 #26304f로 가는 그라디언트. 별은 흰색 60%.
  - 시간표 종이: #fdf8ef. 그리드 선: #e4dccb. 잉크: #2b2f3a.
  - 강조 빨강 #e0453d(도장, 경고), 초록 #3fbf7f(놓을 수 있음).
  - 요일 머리글: 금은 빨간 원 배지 "25"(성탄절), 토는 파랑, 일은 빨강 글씨.
- **START**
  - 탁상 달력 일러스트를 CSS로 그립니다. 스프링 고리 3개와 "DEC 2026" 탭을 달고, 아래에 날짜 배지 3개를 둡니다.
  - 큰 제목 28 px bold, 부제 15 px, 빨간 주 버튼, 오른쪽 위에 음소거 토글 🔊/🔇.
- **PLAY**
  - 시간표의 크기는 `min(가용 너비 − 32, (가용 높이 − HUD − 트레이) × 3/rows)`로 정합니다. 칸은 정사각형이고, 최소 칸 크기는 52 px입니다(320 px 폭에서도 3열 + 행 머리글이 들어감).
  - 행 머리글 열은 너비 56 px에 12 px 글씨입니다. 폭이 360 px 아래로 떨어지면 행 머리글을 이모지 🌅🕙🍚☀️🌆🌙로만 표시합니다.
  - 트레이 블록은 칸 크기의 0.5배로 그리고, 드래그를 시작하면 실제 칸 크기로 커집니다(120 ms ease-out).
  - 완성 도장: 빨간 이중 테두리 둥근 사각형에 "연휴 완성!"을 쓰고 −8° 기울입니다. 2.2배에서 1배로 줄어들며 찍히고, 4 px 화면 흔들림 120 ms와 칸마다 색종이 입자 6개가 따라옵니다.
- **GAME OVER**
  - 반투명 어두운 패널 위에 시간표 종이 카드를 놓습니다.
  - 점수 48 px bold, 최고 점수, 활동 요약 리스트(이모지, 이름, "×n칸").
  - [다시 하기] 버튼은 너비 100%, 높이 56 px.
- **넓은 화면**: 최대 너비 480 px의 가운데 열에 놓고, 별 배경은 창 전체를 덮습니다.
- **prefers-reduced-motion**: 흔들림, 입자, 도장 애니메이션, 맥박 효과를 모두 끕니다(도장은 그냥 나타남). 눈송이는 15개로 줄이고 느리게 움직입니다.
- **Canvas**: 그리드, 블록, 고스트는 한 캔버스에 그리고 DPR은 2로 자릅니다. 배경은 별도 캔버스입니다. HUD와 버튼은 DOM입니다. `resize`가 일어나면 현재 상태에서 레이아웃을 다시 계산하고 다시 그립니다.

## Sound (off by default)

- 집기: 30 ms, 660 Hz, sine, gain 0.05.
- 놓기: 60 ms에 걸쳐 520→780 Hz로 올라가는 sine, gain 0.08.
- 실패: 90 ms, 160 Hz, square, gain 0.04.
- 완성: 523, 659, 784 Hz(C–E–G)를 80 ms 간격으로 아르페지오, triangle, gain 0.07.
- 10초 이하 카운트다운: 초마다 25 ms, 1.2 kHz 틱.
- 게임 오버: 392→262 Hz로 내려가는 300 ms sine.
- Web Audio는 첫 사용자 제스처 뒤에만 만듭니다. 음소거 설정은 localStorage에 저장합니다.

## Share text (결과 복사)

- ko: `🎄 크리스마스 연휴 3일 채우기 / {score}점 · 연휴 {boards}개 완성 / 내 연휴: {emoji1}{name1} {n1}칸, {emoji2}{name2} {n2}칸, {emoji3}{name3} {n3}칸 / play.mesisi.net`
- en: `🎄 Fill the Christmas Long Weekend / {score} pts · {boards} weekends planned / My weekend: {emoji1} {name1} ×{n1}, {emoji2} {name2} ×{n2}, {emoji3} {name3} ×{n3} / play.mesisi.net`
- 완성한 판이 없으면 "내 연휴" 부분을 빼고 보냅니다.
- 복사는 `navigator.clipboard.writeText`로 하고, 안 되면 숨긴 textarea와 `execCommand('copy')`로 대신합니다. 성공·실패는 토스트로 알립니다.

## Strings

| key | ko | en |
|---|---|---|
| appTitle | 크리스마스 연휴 3일 채우기 | Fill the Christmas Long Weekend |
| startSub | 금·토·일 사흘 연휴! 빈칸 없이 일정을 끼워 넣으세요 | Friday to Sunday off! Fit every plan in with no gaps. |
| dateBadge | 12/25(금) · 12/26(토) · 12/27(일) | Fri 25 · Sat 26 · Sun 27 Dec |
| startBtn | 연휴 계획 시작 | Start planning |
| tapStart | 탭하거나 Enter를 누르세요 | Tap or press Enter |
| bestLabel | 최고 {n}점 | Best {n} |
| dayFri / daySat / daySun | 금 25 / 토 26 / 일 27 | Fri 25 / Sat 26 / Sun 27 |
| slots | 아침 / 오전 / 점심 / 오후 / 저녁 / 밤 | Morning / Late morning / Lunch / Afternoon / Evening / Night |
| hudTime | {s}초 | {s}s |
| hudScore | {n}점 | {n} pts |
| undo | 되돌리기 | Undo |
| skip | 넘기기 −5초 | Skip −5s |
| stamp | 연휴 완성! | Weekend planned! |
| timeBonus | +10초 | +10s |
| fastBonus | 빠른 계획 +50 | Quick planner +50 |
| cantPlace | 거기엔 안 들어가요 | That won't fit there |
| overTitle | 시간 끝! | Time's up! |
| overSub | 연휴는 원래 계획대로 되지 않는 법 | Holidays never go exactly to plan |
| scoreLabel / bestScore | 점수 / 최고 점수 | Score / Best |
| newBest | 🎉 신기록 | 🎉 New best |
| boardsDone | 완성한 연휴 {n}개 | {n} weekends planned |
| summaryHead | 마지막 연휴 요약 | Your last weekend |
| summaryCells | ×{n}칸 | ×{n} |
| noBoards | 이번 연휴는 즉흥 여행으로! | This weekend, just wing it! |
| again | 다시 하기 | Play again |
| copy | 결과 복사 | Copy result |
| copied / copyFail | 복사했어요 / 복사하지 못했어요 | Copied / Could not copy |
| soundOn / soundOff | 소리 켜기 / 소리 끄기 | Sound on / Sound off |
| foot | 2026년 성탄절은 금요일, 대체공휴일은 없어요 | Christmas 2026 is a Friday, no substitute holiday |

활동 이름 13개는 위 Activities 표의 ko/en을 그대로 씁니다. 모든 문자열은 `{ ko: {...}, en: {...} }` 사전 하나에 넣습니다. 언어는 `?lang`에서 읽고, 없으면 `navigator.language`를 따릅니다(ko로 시작하면 ko, 아니면 en). `<html lang>`도 같은 값으로 맞춥니다.

## localStorage (in try/catch, prefix `clw:`)

- `clw:best`: 최고 점수(정수)
- `clw:sound`: "1" 또는 "0", 기본값 "0"
- `clw:plays`: 플레이 횟수(UI에 표시하지 않음)

판 상태는 저장하지 않습니다. 새로고침하면 START로 돌아갑니다.

## Edge cases

- 드래그 중에 `pointercancel`이 오거나 포인터가 창 밖으로 나가면 블록을 트레이로 돌려보냅니다.
- 멀티터치: 첫 포인터만 드래그로 다룹니다. 두 번째 포인터의 탭은 회전으로만 씁니다.
- 회전한 블록이 그리드 경계를 넘으면 고스트를 빨간색으로 보여 주고, 놓지 않습니다. 자동으로 밀어 넣지 않습니다.
- 완성 판정은 놓을 때마다 "빈칸 0개"로 합니다. 사용자가 생성 때와 다른 배치로 채워도 완성으로 인정합니다.
- 완성 연출 600 ms 동안과 게임 오버 순간에는 들고 있던 드래그를 취소합니다.
- 드래그 중에 시간이 0이 되면 드래그를 취소하고 곧바로 GAME OVER로 넘어갑니다.
- `resize`(화면 회전 포함): 칸 크기를 다시 계산하고 놓인 블록은 칸 좌표 그대로 다시 그립니다. 드래그 중이면 드래그를 취소합니다.
- `document.hidden`이면 rAF와 타이머를 멈추고, 돌아오면 delta를 50 ms로 잘라서 이어 갑니다(숨어 있던 동안 시간이 흐르지 않음).
- "다시 하기"는 점수, 시간, 판 번호, 되돌리기 스택을 모두 초기화하고, 음소거 설정만 유지합니다.
- localStorage가 막혀 있어도 모든 기능이 동작합니다. 이때 최고 점수는 세션 동안만 메모리에 둡니다.
- `location.hash === '#demo'`: 시드 고정 6행 판(b=3)을 만들고, 블록 절반을 정답 위치에 놓은 채 PLAY 화면에서 시간을 멈춥니다. QA 썸네일 전용입니다.
- 생성기 자체 점검: `#selftest`이면 b=0..8 판을 각 200개 만들어서, 모든 판에서 영역 칸 수의 합이 잠기지 않은 칸 수와 같고 각 영역이 4방향으로 이어져 있는지 `console.assert`로 확인합니다.

## Must not

- 네트워크를 전혀 쓰지 않습니다. 파일 하나, 150 KB 미만. 래스터 이미지 없이 canvas, CSS, emoji만 씁니다.
- 기존 낙하 블록 게임의 이름, 로고, 떨어지는 블록 연출, 고전 7색 테트로미노 세트를 쓰거나 흉내 내지 않습니다. 슬러그와 문구에도 "테트리스/Tetris"를 쓰지 않습니다.
- 실제 브랜드, OTT, 배달앱, 매장, 마켓 이름을 쓰지 않습니다("영화 정주행", "배달 야식"처럼 일반 명사만).
- 술, 연애나 솔로를 압박하는 농담, 종교를 비하하는 표현, 특정 집단을 조롱하는 표현을 넣지 않습니다. 가족 식사도 잔소리 같은 부정적인 문구 없이 따뜻하게만 씁니다.
- 연차나 휴일 계산 기능은 넣지 않습니다(`annual-leave-bridge`와 겹침). 날짜는 2026-12-25~27 고정 표시만 합니다.
- 케이크, 선물 포장, 트리 조명을 주제로 한 연출을 넣지 않습니다(대기 중인 다른 기획과 겹침). 🎄는 "크리스마스 마켓" 블록과 제목 이모지에만 씁니다.
- alert, confirm, prompt, window.open, 페이지 이동을 쓰지 않습니다. 소리는 자동 재생하지 않습니다.
