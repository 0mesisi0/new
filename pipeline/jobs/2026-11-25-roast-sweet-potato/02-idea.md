# Idea and spec: 군고구마 굽기 / Roast Sweet Potato Stand

## Concepts scored

Each concept is scored 1–5 on value in the first 10 seconds, originality, Korean search/share demand, and buildability in one HTML file. Maximum 20.

| Concept | Category | Score | Verdict |
|---|---|---|---|
| **군고구마 굽기**: 드럼통 화덕 위 고구마를 뒤집어 양면을 노릇하게 익힌 뒤 봉투에 담는 타이밍 게임 | **games** | **5/4/4/5 = 18** | **Picked.** 기존 항목과 대기 스펙 어디에도 군고구마가 없음. 보자마자 무엇을 할지 알고, 겨울 길거리 간식이라 공유하기 좋음 |
| 세계 시간 보드: 도시를 고르면 지금 시각과 회의 가능 시간이 겹쳐 보이는 보드 | info | 3/2/3/5 = 13 | 쓸모는 있지만 시즌과 관계없고 첫 10초가 심심함. 비시즌에 쓸 백로그로 남김 |
| 아무것도 하지 마: 마우스·터치를 건드리지 않고 버틴 시간을 재는 사이트 | weird | 4/3/3/5 = 15 | `bear-hibernation`(가만히 두기)와 감각이 겹칠 위험. 다른 소재를 찾을 때까지 보류 |

## Meta

- slug `roast-sweet-potato`, category `games`, kind `game`, aspect `9/16`, date `2026-11-25`
- tags: ko `군고구마`, `겨울간식`, `타이밍게임`; en `sweet-potato`, `winter-snack`, `timing`
- title: ko `군고구마 굽기`; en `Roast Sweet Potato Stand`
- desc ko: 드럼통 화덕 위 고구마는 아랫면만 익어요. 제때 뒤집어 양면을 노릇하게 굽고 봉투에 담아 꿀고구마를 만드세요. 숯덩이 3개면 영업 끝!
- desc en: Only the bottom side cooks on the drum stove. Flip each sweet potato at the right moment, bag it when both sides are golden, and don't let three turn to charcoal.
- howto ko: 고구마를 탭하면 뒤집혀요. 양면 게이지가 모두 금색 구간에 들면 아래 봉투로 끌어다 놓으세요. 키보드는 1~6(또는 방향키)으로 고르고, Space로 뒤집고, Enter로 담아요. 탄 고구마가 3개 나오면 게임이 끝나요.
- howto en: Tap a potato to flip it. When both side gauges sit in the gold zone, drag it down into the paper bag. On a keyboard, pick a slot with 1-6 or the arrow keys, press Space to flip and Enter to bag. Three burnt potatoes and the stand closes.
- about ko: 가운데 칸이 더 뜨거워요. 왕고구마는 늦게 익는 대신 점수가 커요. 꿀고구마를 연달아 만들면 콤보 배수가 올라가요.
- about en: The middle slots run hotter. Big potatoes cook slowly but score more. Make perfect potatoes in a row to raise your combo multiplier.

## Pitch

밤의 겨울 골목. 주황색 숯불이 빛나는 드럼통 화덕 위에 석쇠 칸 6개(2열 × 3행)가 있다.

1. 빈 칸에 고구마가 하나씩 굴러 들어온다. 열을 받는 것은 아랫면뿐이다.
2. 고구마마다 붙은 2칸 게이지(윗면/아랫면)에 금색 "꿀 구간"이 표시되어 있다. 탭하면 고구마가 휙 돌며 두 면이 바뀐다.
3. 양면이 모두 금색 구간에 들었을 때 아래 신문지 봉투로 끌어다 놓으면 "꿀고구마!" 점수와 김이 터진다.
4. 너무 늦으면 연기가 나다가 숯덩이가 된다. 숯덩이 3개면 영업 종료.

속도가 점점 빨라지고 칸이 꽉 차면서 손이 바빠진다. 한 판은 1~3분.

## Flow

1. **START**
   - 화덕 그림, 큰 제목, 한 줄 설명 "아랫면만 익어요. 뒤집어서 양면 노릇하게!", 미니 설명 그림(고구마 → 뒤집기 화살표 → 봉투)
   - 큰 "탭해서 영업 시작" 버튼, 최고 점수, 오른쪽 위 음소거 토글
   - Enter 또는 Space로도 시작
2. **PLAY**
   - 시작 시 고구마 2개(칸 3, 4)가 들어 있음. 이후 스폰 규칙에 따라 빈 칸이 채워짐
   - 위 HUD: 점수, 콤보 "×1.5", 숯덩이 카운터 ⚫⚪⚪
   - 가운데: 석쇠 6칸. 아래: 신문지 봉투(서빙 구역, 높이 18%)
   - 처음 3초 동안 칸 3 위에 "탭 = 뒤집기" 말풍선, 첫 고구마가 꿀 구간에 들어가면 "봉투로 끌어 놓기 ↓" 말풍선을 한 번만 보여 줌(`rsp:tut`가 "1"이면 생략)
   - P 또는 Esc로 일시정지 오버레이(이어 하기 / 처음부터)
3. **GAME OVER** (숯덩이 3개)
   - 화덕 불이 꺼지는 연출: 숯불 글로우가 0.6초 동안 어두워지고 연기가 피어오름
   - 카드: "영업 종료", 점수(0부터 0.8초간 카운트업), 최고 점수(갱신 시 "신기록!" 배지가 통 튀어 오름), 꿀고구마 개수, 최고 콤보, 칭호
   - 큰 "다시 굽기" 버튼(Enter/Space/R)

## Rules and numbers

### Potato

- 필드: `slot`, `size`(S/M/L), `top`, `bottom`(익힘 정도, 0부터 시작), `flipAnim`, `smoke`
- 크기 확률과 특성:

| size | 확률 | 익는 속도 배수 | 기본 점수 | 그림 |
|---|---|---|---|---|
| S 꼬마 | 30% | 1.25 | 70 | 짧고 둥근 고구마 |
| M 보통 | 50% | 1.0 | 100 | 기본 |
| L 왕고구마 | 20% | 0.8 | 150 | 길고 통통함, 칸을 거의 가득 채움 |

### Cooking (per frame, dt capped at 50 ms)

- 칸 열기 `heat`: 가운데 행(칸 3, 4)은 1.3, 위·아래 행은 1.0
- `ramp = min(1.6, 1 + elapsed / 120)` (elapsed는 초)
- `bottom += heat × sizeMul × ramp × dt / 7` (열기 1.0이면 7초에 1.0 도달)
- `top += 0.12 × 위와 같은 증가량` (위쪽은 화덕 안 열기로만 아주 천천히 익음)
- 뒤집기: `top`과 `bottom`을 맞바꾸고, 180 ms 동안 세로 스쿼시 + 회전 애니메이션. 애니메이션 중에도 익힘은 계속되고 탭 입력도 받음
- 어느 한 면이라도 1.0을 넘으면 연기 파티클이 나오고, 넘은 정도에 비례해 짙어짐
- 어느 한 면이라도 1.35에 도달하면 **숯덩이**: 퍽 하는 연기와 화면 흔들림(4 px, 150 ms), 숯덩이 +1, 칸이 비고 콤보 0

### Serving (봉투에 놓기)

판정은 위에서부터 순서대로 적용한다.

| 조건 | 결과 ko / en | 점수 | 콤보 | 숯덩이 |
|---|---|---|---|---|
| 어느 한 면 > 1.0 | 탄 고구마 / Burnt! | 0 | 0으로 | +1 |
| 어느 한 면 < 0.6 | 덜 익었어요 / Still raw | 0 | 0으로 | 없음 |
| 두 면 모두 0.8–1.0 | 꿀고구마! / Perfect! | base × mult | +1 | 없음 |
| 그 외(두 면 모두 0.6–1.0) | 잘 익었어요 / Nicely done | round(base × 0.5) | 유지(올라가지 않음) | 없음 |

- `mult = min(2, 1 + 0.25 × combo)`. 콤보 +1 전의 값으로 계산
- 덜 익은 고구마를 봉투에 넣으면 버려진다(손님 표정 😕 이모지 팝). 화덕에 다시 돌아오지 않음
- 최고 콤보를 기록함

### Spawn

- 스폰 간격 `max(1.2, 3.5 − elapsed × 0.02)`초. 타이머가 끝나면 빈 칸 중 무작위 하나에 고구마 추가. 빈 칸이 없으면 타이머를 유지하고, 칸이 비는 즉시 스폰
- 고구마는 위에서 칸으로 통 떨어지며(200 ms ease-out) 등장하고 작은 먼지 파티클이 남
- 난수는 `Math.random`(시드 불필요)

### Rank title on game over

| score | ko | en |
|---|---|---|
| < 500 | 견습 고구마 굽는 사람 | Apprentice Roaster |
| < 1500 | 동네 군고구마 장인 | Neighborhood Roast Master |
| < 3000 | 겨울밤 고구마 달인 | Winter Night Potato Pro |
| ≥ 3000 | 전설의 드럼통 | Legend of the Drum Stove |

숨은 칭호: 꿀고구마 10개 이상이고 탄 고구마를 봉투에 넣은 적이 한 번도 없으면 "불 조절의 신 / Master of the Flame" 🔥

## Controls

- **Pointer (pointer events, 멀티터치 허용):**
  - 고구마 위에서 pointerdown → pointerup까지 이동 < 12 px이고 시간 < 300 ms이면 **뒤집기**
  - 12 px 넘게 움직이면 **드래그**: 고구마가 손가락을 따라오고 원래 칸은 흐린 자국으로 표시. 드래그 중에도 익힘은 진행
  - 봉투 영역 위에서 놓으면 서빙, 다른 곳에서 놓으면 원래 칸으로 120 ms 동안 되돌아감
  - 포인터마다 드래그를 하나씩 관리(pointerId별)하고, `setPointerCapture` 사용
- **Keyboard:**
  - 1–6으로 칸 선택(1 2 / 3 4 / 5 6 배치). 방향키로 선택 이동. 선택된 칸은 흰색 점선 테두리
  - Space 또는 F로 뒤집기, Enter 또는 ↓로 서빙
  - P/Esc 일시정지, M 음소거
  - 시작 화면과 게임 오버 화면에서는 Enter/Space/R로 시작
- **Touch/layout:**
  - 캔버스에 `touch-action:none`, 게임 키와 터치는 `preventDefault`
  - 칸 하나는 최소 88 × 64 px. 320 px 폭에서도 2열이 들어가도록 칸 크기를 계산
  - 버튼은 높이 44 px 이상

## Screens and visual design

- **Palette:**
  - 밤하늘 그라데이션 #141a2b → #23233a, 가로등 원형 빛 #ffd58a(알파 15%)
  - 드럼통 #5b6470 / 테두리 #3a4048 / 녹 자국 #8a5a3c
  - 숯불 글로우 #ff7a2f → #ffb347
  - 고구마 껍질(익힘 정도별 보간): 생 #b04a74 → 익음 #8c3550 → 노릇 #6e2a3a(+윤기 하이라이트 #ffcf7a) → 탐 #2a201d
  - 금색 구간 #ffc94a, 덜 익음 회색 #9aa0aa, 탐 빨강 #e5484d
  - 신문지 봉투 #e9e2cf, 인쇄 줄무늬 #b8b09b(글자 없는 회색 줄만)
- **Canvas:** 하나의 캔버스에 모두 그림. DPR은 최대 2, `resize`마다 레이아웃 재계산. 세로 화면 기준 9/16 열이 가운데 오고(최대 폭 480 px), 넓은 화면에서는 밤 배경이 창 전체를 덮음
- **Potato drawing:**
  - 양끝이 뾰족한 타원 path와 껍질 색, 작은 흠집 점 3개. 노릇해지면 금색 윤기 줄이 생김
  - 아래에 2칸 게이지(폭은 고구마 폭의 80%, 높이 6 px): 왼쪽 "윗면", 오른쪽 "아랫면" 막대. 각 막대는 0–1.35 범위이고 0.8–1.0 구간을 금색 띠로 표시
  - 두 면이 모두 꿀 구간이면 고구마 위에 반짝이는 ✨과 부드러운 금색 테두리 맥동
  - 김: 평균 익힘이 0.5를 넘으면 흰 김 줄기 1~3개가 올라감
  - 화면에 보이는 면은 항상 윗면이므로, 고구마 색은 `top` 기준 색에 `bottom`이 1.0을 넘으면 아래 테두리를 검게 비침
- **Feedback:**
  - 뒤집기: 스쿼시 애니메이션과 "톡"
  - 꿀고구마: 금색 파티클 12개, "+150 ×1.5" 떠오르는 글씨, 봉투가 살짝 부풂(scale 1.08, 120 ms)
  - 탄 고구마/숯덩이: 회색 연기 퍼프, 흔들림 4 px, 숯덩이 카운터 칸이 쿵 하고 채워짐
  - 덜 익음: 봉투 위에 😕 팝
- **HUD:** 왼쪽 점수 22 px bold(숫자는 `ui-monospace`), 가운데 콤보(1보다 클 때만 표시), 오른쪽 숯덩이 ⚫⚪⚪와 음소거 🔊/🔇
- **Game over card:** 크림색 카드 #fbf6ea, 둥근 모서리 16 px, 그림자. 칭호를 빨간 도장 스타일(−6° 회전)로 표시. 아래 주황 "다시 굽기" 버튼
- **prefers-reduced-motion:** 흔들림 없음, 파티클 수 1/3, 뒤집기는 즉시 색만 바뀜, 떠오르는 글씨는 페이드만

## Sound (off by default, Web Audio only after a gesture)

- 지글: 저역 필터 노이즈 루프, 화덕 위 고구마 수에 비례하는 gain(최대 0.03)
- 뒤집기 "톡": 40 ms 사각파 600 Hz → 300 Hz, gain 0.05
- 꿀고구마 "띵": 사인파 880 Hz + 1320 Hz, 200 ms 감쇠, gain 0.08. 콤보마다 반음씩 올라감(최대 +6)
- 숯덩이 "퍽": 노이즈 버스트 120 ms + 사인파 80 Hz, gain 0.12
- 게임 오버: 사인파 400 → 200 Hz 하강, 500 ms
- 음소거 설정 저장. `document.hidden`이면 AudioContext suspend

## Strings

| key | ko | en |
|---|---|---|
| appTitle | 군고구마 굽기 | Roast Sweet Potato Stand |
| startSub | 아랫면만 익어요. 뒤집어서 양면 노릇하게! | Only the bottom cooks. Flip it till both sides are golden! |
| startBtn | 탭해서 영업 시작 | Tap to open the stand |
| best | 최고 점수 | Best |
| score | 점수 | Score |
| combo | 콤보 ×{m} | Combo ×{m} |
| tipFlip | 탭 = 뒤집기 | Tap = flip |
| tipServe | 봉투로 끌어 놓기 ↓ | Drag into the bag ↓ |
| sideTop / sideBottom | 윗면 / 아랫면 | Top / Bottom |
| perfect | 꿀고구마! | Perfect! |
| good | 잘 익었어요 | Nicely done |
| raw | 덜 익었어요 | Still raw |
| burnt | 탄 고구마! | Burnt! |
| charcoal | 숯덩이가 됐어요 | Turned to charcoal |
| paused | 잠깐 쉬는 중 | Paused |
| resume / restartBtn | 이어 하기 / 처음부터 | Resume / Restart |
| overTitle | 영업 종료 | Stand Closed |
| finalScore | 오늘 매출 | Today's score |
| newBest | 신기록! | New best! |
| perfectCount | 꿀고구마 {n}개 | {n} perfect potatoes |
| bestCombo | 최고 콤보 {n} | Best combo {n} |
| retry | 다시 굽기 | Roast again |
| soundOn / soundOff | 소리 켜기 / 소리 끄기 | Sound on / Sound off |
| keysHint | 1~6 선택 · Space 뒤집기 · Enter 담기 | 1-6 pick · Space flip · Enter bag |
| rank1 / rank2 / rank3 / rank4 | 견습 고구마 굽는 사람 / 동네 군고구마 장인 / 겨울밤 고구마 달인 / 전설의 드럼통 | Apprentice Roaster / Neighborhood Roast Master / Winter Night Potato Pro / Legend of the Drum Stove |
| rankHidden | 불 조절의 신 | Master of the Flame |

`<html lang>`은 `?lang=` 값(대체값은 `navigator.language`)을 따른다. ko가 아니면 en을 쓴다.

## localStorage (in try/catch, prefix `rsp:`)

- `rsp:best`: 최고 점수(정수)
- `rsp:sound`: "1" 또는 "0", 기본값 "0"
- `rsp:tut`: 튜토리얼 말풍선을 본 적 있으면 "1"
- `rsp:plays`: 플레이 횟수(UI에 표시하지 않음)

## Edge cases

- **Restart:** 고구마, 타이머, 점수, 콤보, 숯덩이, 파티클, 드래그 상태, elapsed, ramp를 모두 초기화한다. 시작 고구마 2개를 다시 배치한다.
- **Drag in progress:**
  - 드래그 중인 고구마가 숯덩이가 되면 드래그를 취소하고 그 자리에서 연기 퍼프를 낸다.
  - pointercancel이나 화면 밖에서 손을 떼면 원래 칸으로 돌아간다.
  - 드래그 중 원래 칸은 예약 상태라 스폰되지 않는다.
- **Two fingers on one potato:** 먼저 잡은 pointerId만 인정한다.
- **Flip spam:** 뒤집기는 애니메이션 중에도 허용하지만 연속 입력은 80 ms 간격으로 제한한다.
- **document.hidden:** 자동으로 일시정지 오버레이를 띄운다. 돌아와도 자동 재개하지 않고, 화면으로 돌아온 첫 프레임의 dt는 0으로 한다.
- **Resize:** 칸 좌표만 다시 계산한다. 고구마 상태는 칸 번호에 붙어 있으므로 유지된다. 드래그 중이면 드래그를 취소한다.
- **Keyboard selection:** 빈 칸을 선택하고 Space/Enter를 누르면 무시하고 칸 테두리를 짧게 흔든다.
- **Game over timing:** 숯덩이 3개째가 되면 입력을 즉시 막고, 남은 고구마는 그대로 멈춘다. 게임 오버 카드에서 600 ms 동안 입력을 무시해 연타로 바로 재시작되는 것을 막는다.
- **localStorage blocked:** 최고 점수는 세션 메모리에만 유지하고, 그 밖의 기능은 모두 작동한다.
- **QA demo:** `location.hash === '#demo'`이면 6칸을 모두 채운다(여러 익힘 단계, 하나는 꿀 구간, 하나는 연기). 점수 1250, 콤보 ×1.5로 PLAY 화면을 정지 상태로 보여 준다. 썸네일용이다.

## Must not

- 네트워크를 전혀 쓰지 않는다. 래스터 이미지와 외부 폰트도 쓰지 않는다. 캔버스와 이모지만 쓰고, 150 KB 이하로 만든다.
- 실제 노점, 브랜드, 상표, 인물을 쓰지 않는다. 신문지 봉투에 실제 신문 이름이나 읽을 수 있는 글자를 넣지 않는다.
- 기존 요리·타이밍 게임의 이름, 캐릭터, 화면 구성을 따라 하지 않는다.
- 화상, 불 사고, 건강·다이어트 문구, 돈이나 가격 정보를 넣지 않는다. 점수는 가상의 "매출"일 뿐이다.
- 손님이나 특정 집단을 놀리지 않는다. 실패 표현은 고구마 자체(숯덩이, 연기)로만 한다.
- `alert`, `confirm`, `prompt`, `window.open`, 페이지 이동을 쓰지 않는다. 소리를 자동 재생하지 않는다.
