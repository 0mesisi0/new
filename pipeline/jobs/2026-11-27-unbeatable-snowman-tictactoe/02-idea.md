# Idea and spec: 절대 못 이기는 눈사람 틱택토 / Unbeatable Snowman Tic-Tac-Toe

Agent: Claude (opus). 디자인 노트(팔레트, 레이아웃, 모션)를 함께 넣었다.

## Concepts scored

점수는 1–5점이고 항목은 첫 10초 재미, 독창성, 한국 검색·공유 수요, 단일 HTML 구현 난이도 순이다. 만점은 20점이다.

| Concept | Category | Score | Verdict |
|---|---|---|---|
| 월세 세액공제 계산기 2026 (총급여 구간별 공제율, 한도, 남은 12월 월세 반영) | tools | 2/3/5/4 = 14 | 수요는 높다. 다만 근거가 low confidence 개인 블로그 하나(표 8)이고 개정 한도를 국세청 원문으로 확인하지 못했다. 원문을 확인한 뒤 다시 다룬다 |
| 크리스마스 마켓 노점 꾸미기 (오너먼트·조명·간판을 배치해 나만의 마켓 엽서 만들기) | cool | 3/3/3/3 = 12 | 체험형 수요(표 9)와 맞는다. 하지만 전구 꾸미기·엽서 스펙과 손맛이 겹치고 첫 10초가 약하다 |
| **절대 못 이기는 눈사람 틱택토** | **games** | **5/3/4/5 = 17** | **선택.** "이겨 보세요, 못 이깁니다"라는 한 줄 도발이 공유 훅이다(표 5). 규칙 설명이 필요 없고 minimax 하나로 끝난다. 눈사람·틱택토는 기존 항목이나 대기 스펙과 주제가 겹치지 않는다 |

## Meta

- slug `unbeatable-snowman-tictactoe`, category `games`, kind `game`, aspect `9/16`, date `2026-11-27`
- tags: ko `틱택토`, `눈사람`, `두뇌게임`; en `tic-tac-toe`, `snowman`, `brain-game`
- title: ko `절대 못 이기는 눈사람 틱택토`; en `Unbeatable Snowman Tic-Tac-Toe`
- desc ko: 눈사람은 틱택토에서 절대 지지 않아요. 비기면 다음 판으로 넘어가고, 한 번이라도 실수하면 끝! 몇 판 연속으로 버틸 수 있나요?
- desc en: The snowman never loses at tic-tac-toe. Draw to survive the next round, slip once and it's over. How many draws in a row can you hold?
- howto ko: 칸을 눌러 목도리 X를 놓으세요(키보드 1~9, 방향키+Enter도 돼요). 가로·세로·대각선 세 칸을 먼저 채우면 이겨요. 눈사람은 완벽하게 두니까 목표는 비기기예요. 비길 때마다 연속 기록이 오르고 생각할 시간은 줄어들어요. 시간이 다 되거나 지면 게임 끝.
- howto en: Tap a square to place your scarf X (keys 1-9 or arrows + Enter also work). Three in a row wins, but the snowman plays perfectly, so aim for a draw. Each draw adds to your streak and shortens your thinking time. Lose or run out of time and the run ends.
- about ko: 틱택토는 양쪽이 완벽하게 두면 항상 무승부예요. 눈사람은 모든 수를 끝까지 계산하고, 같은 결과라면 당신이 실수하기 쉬운 수를 골라요. 이기는 방법은 없지만 비기는 방법은 늘 있어요.
- about en: Perfect tic-tac-toe always ends in a draw. The snowman searches every move to the end and, among equally good moves, picks the one that gives you the most ways to slip. You can't win, but there is always a way to draw.

## Pitch

눈 내리는 밤 마당에 3×3 눈밭 보드가 깔려 있고, 그 위에서 통통한 눈사람이 팔짱(나뭇가지)을 끼고 기다린다.

1. 플레이어는 빨간 목도리 X, 눈사람은 눈덩이 O를 놓는다.
2. 눈사람은 완벽하게 둔다. 이기는 건 불가능하고 비기면 살아남는다.
3. 비길 때마다 연속 기록이 +1 되고 다음 판의 생각 시간이 줄어든다. 선공은 판마다 번갈아 바뀐다.
4. 기록이 오를수록 눈사람이 땀을 흘리고 조금씩 녹는다. 실수 한 번이면 눈사람이 웃으며 게임이 끝난다.

공유 포인트는 "눈사람 상대로 7연속 무승부, 너는?" 한 줄이다.

## Flow

1. **START**
   - 큰 눈사람, 제목, 한 줄 설명 "절대 안 져요. 몇 판 비길 수 있나요?", 최고 기록, 큰 "도전하기" 버튼이 있다.
   - 화면 어디를 눌러도 시작하고, Enter와 Space도 된다.
   - 오른쪽 위에 음소거 토글이 있다.
2. **PLAY**(판 단위로 반복)
   - 상단에는 연속 무승부 수 "🤝 3", 최고 기록, 판 번호 "4판째", 선공 표시("내가 먼저" / "눈사람 먼저")가 나온다.
   - 중앙에 보드가 있고, 보드 위에 눈사람과 말풍선이 있다.
   - 보드 아래에 생각 시간 바가 있다. 내 차례일 때만 줄어든다.
   - 판의 선공:
     - 홀수 판(1, 3, 5…)은 플레이어가 선공이다.
     - 짝수 판은 눈사람이 선공이다.
   - 눈사람 차례:
     - 350–600 ms 동안 "생각 중" 연출(눈사람 눈알 좌우 이동)을 한 뒤 둔다.
     - 이 동안 입력은 무시한다.
   - 무승부:
     - 보드가 0.4 s 동안 하얗게 반짝이고 "+1"이 튀어 오른다.
     - 말풍선에 drawLines 중 하나가 나온다.
     - 900 ms 뒤 보드가 비워지고 다음 판이 시작된다.
   - 패배:
     - 눈사람의 세 줄 위로 파란 선이 그어진다.
     - 화면이 6 px 흔들리고(150 ms) 말풍선에 winLines 중 하나가 나온다.
     - 1,000 ms 뒤 GAME OVER로 넘어간다.
   - 시간 초과:
     - 패배와 같은 연출에 말풍선 timeoutLine이 나온다.
     - 보드에 선은 긋지 않는다.
     - 1,000 ms 뒤 GAME OVER로 넘어간다.
3. **GAME OVER**
   - 연속 무승부 수가 큰 숫자로 나오고, 칭호(아래 표)와 이모지 도장이 찍힌다. 도장은 scale 2 → 1로 들어온다.
   - 최고 기록을 표시한다. 새 기록이면 "NEW BEST" 리본과 눈 파티클 30개가 나온다.
   - 패배 원인 한 줄을 보여 준다: "마지막 판에서 졌어요" 또는 "시간이 다 됐어요".
   - 버튼은 [다시 도전](큰 빨간 버튼)과 [결과 복사] 두 개다.
   - 다시 도전하면 상태가 완전히 초기화된다: 연속 수 0, 판 1, 플레이어 선공, 시간 최대값.

## Rules and AI

- 보드는 길이 9 배열이다. 인덱스 0–8을 왼쪽 위부터 읽는 순서로 쓴다.
- 승리 라인은 8개다: [0,1,2] [3,4,5] [6,7,8] [0,3,6] [1,4,7] [2,5,8] [0,4,8] [2,4,6].
- **눈사람 수 선택**:
  1. 빈칸마다 minimax 값을 구한다. 값은 눈사람 승리 = 10 − depth, 플레이어 승리 = depth − 10, 무승부 = 0이다. alpha-beta 없이 전체 탐색해도 충분히 빠르다.
  2. 최댓값을 가진 칸만 남긴다.
  3. 남은 칸끼리는 trap 수로 비교한다. trap 수는 그 수를 둔 뒤 플레이어의 응수 중 minimax상 눈사람이 이기게 되는 응수의 개수다. trap 수가 가장 큰 칸만 남긴다.
  4. 그래도 여러 칸이면 `Math.random`으로 고른다.
  - 결과: 눈사람은 절대 지지 않고, 이길 수 있으면 가장 빨리 이기며, 무승부 국면에서는 함정이 가장 많은 수를 둔다.
- **플레이어 생각 시간**: `limit = max(3.0, 8.0 − 0.5 × streak)`초이고 내 차례가 올 때마다 새로 채운다.
  - 남은 시간이 1.5 s 이하이면 바가 빨갛게 바뀌고 깜빡인다. 소리가 켜져 있으면 틱 소리를 낸다.
  - delta time은 50 ms로 자르고, `document.hidden`이면 타이머를 멈춘다.
- **판 결과 판정**: 매 수 뒤에 승리 라인을 검사한다. 칸이 다 차고 승자가 없으면 무승부다.
- **플레이어 승리**: 이론상 불가능하다. 그래도 코드 경로는 만든다. 이 경우 말풍선 impossibleLine을 띄우고 무승부처럼 +1로 처리한다(버그 대비용).

## Title tiers (by final streak)

| streak | ko | en | emoji |
|---|---|---|---|
| 0 | 눈사람의 간식 | Snowman's Snack | 🍪 |
| 1–2 | 눈싸움 견습생 | Snowball Apprentice | 🧤 |
| 3–5 | 꽁꽁 수비수 | Frozen Defender | 🧊 |
| 6–9 | 눈사람 땀나게 한 사람 | Made the Snowman Sweat | 💦 |
| 10–19 | 무승부 장인 | Draw Master | 🤝 |
| 20+ | 눈사람이 녹았다 | The Snowman Melted | ☀️ |

## Snowman melt stages (by current streak, visual only)

- 0–2: 기본 모습. 당근 코, 숯 눈, 나뭇가지 팔, 검은 모자를 쓰고 있다.
- 3–5: 이마에 땀방울 하나가 1.2 s 주기로 흘러내린다.
- 6–9: 모자가 8° 기울고 땀방울이 두 개가 된다. 몸통 아래에 작은 물웅덩이가 생긴다.
- 10+: 몸 전체가 세로로 90% 크기가 되고 웅덩이가 커진다. 표정은 당황한 눈(ㅇ_ㅇ)이다.
- 패배 순간에는 단계와 관계없이 눈을 초승달 모양으로 바꿔 웃게 한다.

## Controls

- **Pointer:** 빈칸을 탭하거나 클릭한다. 이미 찬 칸을 누르면 그 칸만 4 px 흔들리고 무시된다.
- **Keys:**
  - 1–9는 해당 칸에 둔다(1 = 왼쪽 위, 9 = 오른쪽 아래).
  - 방향키로 포커스 칸을 옮기고 Enter나 Space로 둔다. 포커스는 흰 점선 테두리로 표시한다.
  - START와 GAME OVER 화면에서는 Enter, Space, R로 시작하거나 재시작한다. C는 결과를 복사한다.
  - M은 소리를 켜고 끈다.
- **Touch and layout:** 각 칸은 최소 80 px, 버튼은 최소 44 px 높이다. 보드와 게임 영역에 `touch-action:none`을 걸고, 게임 키와 터치에 `preventDefault`를 호출한다.

## Screens and layout

- **Palette:**
  - 밤하늘: #1b2340에서 #2c3a66으로 가는 그라데이션
  - 눈밭 보드: #eef4fb, 칸 구분선: #b9cbe3
  - 목도리 X: #e0453d와 #b8322c 줄무늬
  - 눈덩이 O: 흰색 바탕에 #c7d8ee 음영
  - 강조색: #ffcf5a
- **Background:** 캔버스에 눈 입자 60개를 sine drift로 흩날린다. DPR은 2로 제한하고 페이지가 숨겨지면 멈춘다.
- **Board:**
  - 크기는 `min(88vw, 52vh, 420px)`인 정사각형이고 모서리를 16 px 둥글린다.
  - X는 두 개의 굵은 줄무늬 획으로 그린다. 놓을 때 획이 120 ms씩 차례로 그어진다.
  - O는 눈덩이 원이다. scale 0 → 1.15 → 1로 180 ms 동안 통통 튀며 나타난다.
- **Snowman:**
  - 보드 위쪽에 있고 높이는 화면의 약 22%다.
  - 말풍선은 눈사람 오른쪽에 둔다. 320 px 폭에서는 위쪽으로 옮기고 최대 2줄까지 줄바꿈한다.
- **HUD:**
  - 상단 한 줄에 연속 수(왼쪽), 판 번호와 선공(가운데), 최고 기록과 음소거(오른쪽)를 놓는다.
  - 320 px 폭에서는 판 번호를 숨기고 선공 표시만 남긴다.
- **Wide screens:** 최대 폭 480 px의 가운데 열에 배치하고, 눈은 창 전체에 내린다.
- **Small screens:** 좌우 패딩 12 px. 모든 글자는 14 px 이상이다.
- **prefers-reduced-motion:**
  - 흔들림, 도장 애니메이션, 땀방울 애니메이션을 끈다. 땀방울은 정지 상태로 그린다.
  - 눈 입자는 20개만 천천히 내린다.
  - X와 O는 즉시 표시한다.
- **Font:** system-ui 스택. 숫자에는 `font-variant-numeric: tabular-nums`를 쓴다.

## Sound (off by default, Web Audio, after first gesture)

- X 놓기: 40 ms 노이즈 버스트에 bandpass 1.2 kHz, gain 0.05를 건다("사각" 소리).
- O 놓기: 70 ms sine을 300 Hz에서 180 Hz로 내리고 gain 0.08을 준다("퐁" 소리).
- 무승부: 두 음 상승 차임(660 → 880 Hz, 각 90 ms), gain 0.06.
- 패배: 세 음 하강(440 → 370 → 294 Hz, 각 120 ms), triangle 파형, gain 0.07.
- 시간 경고 틱: 20 ms, 1.6 kHz, gain 0.03, 남은 1.5 s 동안 0.5 s 간격으로 낸다.
- 음소거 설정은 저장한다.

## Copy result

- 결과는 `navigator.clipboard.writeText`로 복사한다. 실패하면 숨긴 textarea와 `execCommand('copy')`로 대신한다.
- 성공이나 실패를 토스트로 알린다. alert는 쓰지 않는다.
- 복사 텍스트:
  - ko: ⛄ 절대 못 이기는 눈사람 상대로 {n}연속 무승부! 칭호: {title} {emoji} / 최고 기록 {best} / play.mesisi.net
  - en: ⛄ {n} draws in a row against the unbeatable snowman! Title: {title} {emoji} / Best {best} / play.mesisi.net

## Strings

| key | ko | en |
|---|---|---|
| appTitle | 절대 못 이기는 눈사람 틱택토 | Unbeatable Snowman Tic-Tac-Toe |
| startSub | 절대 안 져요. 몇 판 비길 수 있나요? | It never loses. How many draws can you hold? |
| startBtn | 도전하기 | Take the challenge |
| tapToStart | 아무 곳이나 눌러 시작 | Tap anywhere to start |
| best | 최고 기록 | Best |
| streak | 연속 무승부 | Draw streak |
| round | {n}판째 | Round {n} |
| youFirst | 내가 먼저 | You go first |
| snowFirst | 눈사람 먼저 | Snowman goes first |
| yourTurn | 내 차례 | Your turn |
| thinking | 눈사람 생각 중… | Snowman is thinking… |
| soundOn / soundOff | 소리 켜기 / 소리 끄기 | Sound on / Sound off |
| gameOver | 게임 끝 | Game over |
| drawsInRow | {n}연속 무승부 | {n} draws in a row |
| newBest | 새 기록! | NEW BEST |
| causeLoss | 마지막 판에서 졌어요 | You lost the last round |
| causeTimeout | 시간이 다 됐어요 | You ran out of time |
| retry | 다시 도전 | Try again |
| copy | 결과 복사 | Copy result |
| copied / copyFail | 복사했어요 / 복사하지 못했어요 | Copied / Could not copy |
| timeoutLine | 기다리다 녹을 뻔했어요. 제 승리로 할게요! | I almost melted waiting. I'll call that my win! |
| impossibleLine | …어? 이건 꿈이에요. 무승부로 해 둘게요. | …What? This must be a dream. Let's call it a draw. |

Snowman greeting lines (판 시작 시 무작위, 같은 줄 연속 금지):

| ko | en |
|---|---|
| 어디 한번 둬 보세요. 저는 녹지 않아요. | Go ahead. I don't melt that easily. |
| 가운데가 좋을까요, 모서리가 좋을까요? | Center or corner? Choose wisely. |
| 눈사람은 생각보다 계산이 빨라요. | Snowmen are faster at math than you think. |
| 오늘도 무패 행진 중이에요. | Still undefeated today. |

drawLines (무승부):

| ko | en |
|---|---|
| 흠, 제법인데요? | Hmm, not bad. |
| 비겼네요. 다음 판은 더 빨리 갑니다. | A draw. Next round goes faster. |
| 땀이… 아니, 눈이 녹는 거예요. | That's not sweat… it's just melting snow. |
| 아직 안 끝났어요. | We're not done yet. |
| 당신, 혹시 눈사람이에요? | Are you secretly a snowman too? |

winLines (눈사람 승리):

| ko | en |
|---|---|
| 세 줄 완성! 따뜻한 코코아 한잔하고 오세요. | Three in a row! Go grab a hot cocoa. |
| 눈사람은 지지 않아요. 비길 뿐이죠. | Snowmen don't lose. They only draw. |
| 거기엔 함정이 있었답니다. | There was a trap right there. |
| 괜찮아요, 다음엔 더 오래 버틸 거예요. | It's okay, you'll last longer next time. |

## localStorage (in try/catch, prefix `ust:`)

- `ust:best`: 최고 연속 무승부 수(정수). 기본값 0.
- `ust:sound`: "1" 또는 "0". 기본값 "0".
- `ust:plays`: 총 게임 수. UI에 표시하지 않는다.

보드 상태나 진행 중인 판은 저장하지 않는다.

## Edge cases

- 눈사람이 "생각 중"일 때, 그리고 판 전환(900 ms)과 패배 연출(1,000 ms) 동안에는 모든 보드 입력을 무시한다.
- 같은 칸을 빠르게 두 번 탭하면 첫 탭만 처리한다. 수를 둔 직후 120 ms 동안 입력을 잠근다.
- 창 크기가 바뀌면 상태에서 레이아웃과 보드를 다시 그린다. 진행 중인 애니메이션과 타이머는 이어서 진행한다.
- 탭이 숨겨지면 타이머, 눈 입자, 눈사람 수 예약(setTimeout 대신 rAF 누적 시간 사용)을 모두 멈춘다. 돌아오면 남은 시간 그대로 재개한다.
- 시간이 0이 되는 순간에 들어온 탭은 무시한다. 타임아웃 판정이 먼저다.
- localStorage가 막혀 있어도 최고 기록은 세션 동안 메모리에 유지된다.
- `?lang`이 없으면 `navigator.language`를 따른다. ko로 시작하면 ko, 그 밖에는 en이다. `<html lang>`도 같은 값으로 맞춘다.
- `location.hash === '#demo'`(QA 썸네일 전용)이면 PLAY 화면으로 바로 간다.
  - streak 6(땀 단계), 보드 [X,_,O, _,O,_, X,_,_], 내 차례, 남은 시간 60% 상태로 고정한다.
  - 타이머는 멈춘다.
- 다시 도전할 때 초기화하는 것: streak, 판 번호, 선공, 보드, 타이머, 말풍선, 눈사람 단계, 진행 중인 예약 콜백 전부. 소리 설정과 최고 기록은 유지한다.
- self-check: `#selftest`이면 콘솔에서 assert를 실행한다.
  - 빈 보드에서 눈사람이 선공으로 둔 모든 첫 수의 minimax 값이 0인지 확인한다.
  - [X,X,_, O,_,_, _,_,_]에서 눈사람이 2를 막는지 확인한다.
  - [O,O,_, X,X,_, _,_,_]에서 눈사람 차례면 2를 두어 이기는지 확인한다.

## Must not

- 네트워크는 일절 쓰지 않는다. 외부 폰트, CDN, fetch도 금지다. 150 KB 이하로 만든다.
- 래스터 이미지를 쓰지 않는다. 눈사람, 보드, 말은 canvas나 SVG로 그린다.
- 특정 틱택토 앱, 게임, 캐릭터의 이름, 외형, 문구를 흉내 내지 않는다. 기존 브랜드 눈사람 캐릭터와 닮게 그리지 않는다.
- 플레이어를 비하하는 조롱은 넣지 않는다. 눈사람의 말은 장난스럽고 다정하게 쓴다.
- 일부러 지는 쉬움 모드나 랜덤 실수를 넣지 않는다. "절대 못 이긴다"는 약속이 핵심이다.
- 광고성 문구, 실제 인물, 상표를 쓰지 않는다.
- alert, confirm, prompt, window.open, 페이지 이동을 쓰지 않는다. 소리 자동 재생도 금지다.
