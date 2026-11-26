# Idea and spec: 자리 바꾸기 뽑기 / Random Seat Shuffler

## Concepts scored

점수는 1–5점이며 항목은 처음 10초의 가치, 독창성, 한국 검색/공유 수요, 단일 HTML 제작 난이도(쉬울수록 높음)입니다. 만점은 20점입니다.

| Concept | Category | Score | Verdict |
|---|---|---|---|
| 창가 다육이 겨울나기: 하루 한 번 물·햇빛·담요를 골라 주면 다음 날 모양이 바뀌는 "하루 한 번" 키우기 게임 | games | 3/4/3/4 = 14 | 재방문 구조는 좋습니다. 다만 첫 10초가 약하고 하루가 지나야 재미가 드러나서 보류합니다. |
| 비밀번호 해독 시간 체험: 입력한 패턴의 경우의 수와 추측 시간을 시각화 | tech | 3/3/3/4 = 13 | 교육적이지만 사용자가 비밀번호를 입력하는 행위 자체가 위험한 습관이 될 수 있어 보류합니다. |
| **자리 바꾸기 뽑기** | **random** | **4/3/5/5 = 17** | **선택.** "자리 바꾸기 프로그램", "랜덤 자리 배치"는 교사와 모임 총무가 꾸준히 찾는 검색어입니다. 12월에는 학기 말 자리 바꾸기와 송년회 테이블 배치 수요가 겹칩니다. 기존 항목이나 대기 스펙 중 '자리'를 다루는 것은 없습니다. |

## Meta

- slug `seat-shuffle`, category `random`, kind `tool`, aspect `3/4`, date `2026-11-26`
- tags: ko `자리바꾸기`, `랜덤자리배치`; en `seating-chart`, `random`
- title: ko `자리 바꾸기 뽑기 · 랜덤 자리 배치`; en `Random Seat Shuffler`
- desc ko: 이름만 붙여 넣으면 교실 자리나 송년회 테이블을 랜덤으로 배치해요. 짝 떨어뜨리기, 자리 고정, 빈자리 설정까지 되고 결과는 이미지로 저장할 수 있어요.
- desc en: Paste names and shuffle seats for a classroom or a party table. Pin seats, keep pairs apart, block empty desks and save the chart as an image.
- howto ko: 이름을 한 줄에 하나씩(쉼표도 돼요) 넣고 교실형이나 원탁형을 고르세요. 자리를 눌러 빈자리나 고정 자리를 정하고, 떨어뜨릴 두 사람을 추가한 뒤 '섞기!'를 누르세요. 결과에서 두 자리를 차례로 누르면 서로 바뀌어요.
- howto en: Enter one name per line (commas work too), then pick Classroom or Round tables. Tap seats to block or pin them, add pairs to keep apart, and hit Shuffle! On the result, tap two seats to swap them.
- about ko: 이름은 이 기기에만 저장되고 어디로도 전송되지 않아요. '지난번 짝과 떨어뜨리기'를 켜면 직전 결과에서 옆자리였던 사람끼리는 다시 붙지 않게 섞어요.
- about en: Names stay on this device and are never sent anywhere. Turn on "Avoid last neighbors" so people who sat together last time get split up.

## Pitch

밝은 교실 책상 배치판 하나가 화면에 있습니다.

1. 이름을 붙여 넣으면 이름 카드 더미가 바로 생깁니다. 처음 10초 안에 '예시 이름 넣기' 다음 '섞기!'만으로 결과를 볼 수 있습니다.
2. '섞기!'를 누르면 카드가 공중에서 섞이고, 자리 카드가 무작위 순서로 하나씩 뒤집히며 이름이 드러납니다. 전체 약 2.5초이며 탭하면 건너뜁니다.
3. 결과는 칠판(교실형) 또는 원탁(원탁형) 기준의 배치도입니다. 손으로 미세 조정한 뒤 이미지로 저장하거나 텍스트로 복사합니다.

결과는 매번 진짜 무작위입니다. 교사가 학생들 앞에서 띄워 놓고 쓰는 공정한 추첨기가 목표입니다.

## Flow

1. **SETUP** (패널 안에서만 스크롤되고 페이지는 스크롤되지 않습니다)
   - 상단: 앱 제목, 소리 토글, 사람 수 / 자리 수 표시 `24명 / 30자리`.
   - **이름** 섹션: textarea, 줄바꿈·쉼표·탭으로 구분합니다. 버튼은 [예시 이름 넣기] [모두 지우기]입니다. 지우기는 2초 안에 한 번 더 눌러야 실행되며 버튼 글자가 "한 번 더 누르면 지워져요"로 바뀝니다.
   - **배치** 섹션: 세그먼트 [교실형] [원탁형].
     - 교실형: 줄(rows) 1–10, 칸(cols) 1–10, 묶음 [혼자] [2인 짝] [3인]. 기본값은 5줄 × 6칸, 2인 짝입니다.
     - 원탁형: 테이블 수 1–12, 테이블당 자리 2–12. 기본값은 4 × 6입니다.
     - 각 값은 −/+ 스테퍼(44 px)와 숫자로 조정합니다.
   - **미리보기 배치판**: 현재 배치가 그대로 그려집니다. 위에 편집 모드 세그먼트 [빈자리 만들기] [자리 고정]이 있습니다.
     - 빈자리 모드: 자리를 누르면 막힌 자리(회색 빗금, ✕)로 바뀌고 다시 누르면 풀립니다.
     - 고정 모드: 자리를 누르면 배치판 아래 인라인 패널에 이름 목록 칩이 열립니다. 칩을 누르면 그 자리에 📌 이름으로 고정되고, [고정 해제]와 [닫기]가 있습니다. 이미 다른 자리에 고정된 이름을 고르면 기존 고정은 옮겨집니다.
   - **규칙** 섹션:
     - 떨어뜨릴 두 사람: 이름 select 2개 + [추가]. 목록의 각 줄에 ✕ 버튼이 있고 최대 20쌍입니다.
     - 체크박스 "지난번 짝과 떨어뜨리기": 지난 결과가 없으면 비활성화하고 "(지난 결과 없음)"을 붙입니다.
     - 체크박스 "이름을 이 기기에 기억하기": 기본 켜짐.
   - 하단 고정 바: 큰 [섞기!] 버튼. 사람 수가 0이거나 자리 수보다 많으면 비활성화하고 이유를 한 줄로 보여 줍니다.
2. **SHUFFLE**
   - 이름 카드들이 배치판 중앙에서 회오리처럼 0.8초 섞입니다.
   - 자리 카드가 무작위 순서로 뒤집힙니다(rotateY 0.18초). 카드 사이 간격은 `min(60ms, 1700ms / 사람 수)`이고, 뒤집힐 때마다 틱 소리가 납니다.
   - 아무 곳이나 탭하거나 아무 키나 누르면 즉시 RESULT로 넘어갑니다.
3. **RESULT**
   - 배치판에는 교실형이면 위쪽에 칠판 바 "칠판 / 앞", 원탁형이면 테이블 번호가 표시됩니다. 빈자리는 흐리게, 고정 자리는 📌로 표시합니다.
   - 조건을 다 지키지 못했을 때는 겹친 자리에 주황 테두리를 두르고 토스트를 띄웁니다.
   - 수동 교환: 자리 하나를 누르면 들썩이며 선택되고, 다른 자리를 누르면 0.25초 동안 서로 날아가 바뀝니다. 같은 자리를 다시 누르면 선택이 취소됩니다. 빈자리(사람 없음)와도 교환할 수 있지만 막힌 자리와는 교환할 수 없습니다. 교환 뒤에는 위반 표시를 다시 계산합니다.
   - 하단 바: [다시 섞기] [수정] [이미지 저장] [텍스트 복사], 그리고 아이콘 버튼 [⇅ 시점 뒤집기].
     - 시점 뒤집기는 칠판을 아래로 보내 교사 시점으로 보여 줍니다. 원탁형에서는 숨깁니다.
   - 결과가 나오는 순간 `sts:last`에 저장합니다. 수동 교환 뒤에도 다시 저장합니다.

## Controls

- **Pointer:** 모든 버튼과 자리는 탭/클릭으로 조작합니다. 배치판에는 `touch-action: manipulation`, SETUP 패널에는 `touch-action: pan-y`를 줍니다.
- **Keys on SETUP:** textarea 밖에서 Ctrl/⌘+Enter 또는 S를 누르면 섞습니다. textarea 안에서는 Ctrl/⌘+Enter만 동작합니다.
- **Keys on SHUFFLE:** 아무 키나 누르면 건너뜁니다.
- **Keys on RESULT:** R 다시 섞기, E 수정, P 이미지 저장, C 텍스트 복사, F 시점 뒤집기, Esc 교환 선택 취소.
- **배치판 키보드 탐색:** 각 자리는 `button`입니다. Tab/화살표로 이동하고 Enter/Space로 선택하며, 포커스 링이 보여야 합니다.
- **Other keys:** M 소리 토글. textarea 입력 중에는 단축키를 무시합니다.
- 모든 버튼은 최소 44 px입니다. 자리 버튼은 화면이 좁으면 44 px 아래로 줄어들 수 있지만 최소 32 px이며, 배치판 전체를 맞추는 것이 우선입니다.

## Names parsing

- 줄바꿈, 쉼표, 탭, 세미콜론으로 나눈 뒤 각 항목을 `trim`하고 빈 항목은 버립니다.
- 각 이름은 최대 10자(코드 포인트 기준)이며 넘으면 자르고, 이름 섹션 아래에 "긴 이름은 10자로 줄였어요"를 한 번 표시합니다.
- 중복 이름에는 순서대로 ` (2)`, ` (3)`을 붙입니다.
- 최대 100명입니다. 초과분은 버리고 "100명까지만 넣을 수 있어요"를 표시합니다.
- 이름이 바뀌면 사라진 이름에 걸린 고정과 떨어뜨리기 쌍은 자동으로 지웁니다.

## Seats and neighbors

- **교실형:** 자리 id는 `r{row}c{col}`이며 row 0이 칠판 쪽입니다. 묶음 g가 있으면 g칸마다 책상 그룹 사이에 큰 간격을 그립니다. cols가 g로 나누어떨어지지 않으면 마지막 그룹은 짧게 그립니다.
  - 이웃: 같은 줄에서 바로 옆 칸이면서 같은 그룹일 때입니다. g = 1(혼자)이면 바로 옆 칸이면 모두 이웃입니다.
- **원탁형:** 자리 id는 `t{table}s{seat}`이며, 테이블 원 둘레에 자리를 고르게 배치합니다.
  - 이웃: 같은 테이블이면 모두 이웃입니다. 송년회에서는 "같은 테이블 피하기"가 핵심이기 때문입니다.
- 막힌 자리는 사람을 앉히지 않으며 이웃 판정에서도 빠집니다.
- 사용 가능한 자리 수 = 전체 자리 − 막힌 자리입니다.

## Shuffle algorithm

1. 고정된 사람을 먼저 앉힙니다.
2. 나머지 사람과 남은 자리를 Fisher–Yates로 섞어 앞에서부터 짝지어 앉힙니다. 사람이 자리보다 적으면 남는 자리는 빈자리가 됩니다.
3. 위반 수를 셉니다.
   - 떨어뜨릴 쌍이 이웃이면 1개입니다.
   - "지난번 짝과 떨어뜨리기"가 켜져 있으면, 지난 결과에서 이웃이었던 쌍이 이번에도 이웃일 때마다 1개입니다.
   - 지난 결과의 이웃 관계는 지난 결과의 배치 기준으로 계산하므로, 배치가 바뀌어도 동작합니다.
4. 위반이 0이면 종료합니다. 아니면 최대 4000회 또는 200 ms까지 다시 시도하고, 위반이 가장 적은 결과를 씁니다.
   - `// ponytail: random restart, ceiling ~100 seats with heavy constraints; add swap-based local search if users hit it`
5. 난수는 `crypto.getRandomValues`(Uint32 + 거부 샘플링으로 편향 제거)를 쓰고, 없으면 `Math.random`으로 대체합니다.
6. 위반이 남으면 토스트 "모든 조건을 지키지는 못했어요 (겹침 {n}개)"를 띄우고 해당 자리에 주황 테두리를 표시합니다.
7. 자체 점검: `location.hash === '#selftest'`이면 30명 5×6 짝 배치, 떨어뜨리기 쌍 10개로 200회 섞습니다. 매번 모든 이름이 정확히 한 번씩 앉았는지와 고정 자리가 유지됐는지 `console.assert`로 확인하고, 결과를 콘솔에 출력합니다.

## Visual design

- **Palette:**
  - 배경 #f4efe6, 잉크 #2b2d33, 보조 회색 #8b8f98
  - 칠판 바 #2f4a3f(글자 #e8efe9)
  - 책상/자리 카드 #fffdf8, 테두리 #d9cdb8, 책상 그룹 바탕 #e9d8b8
  - 강조 녹색 #3a7d5c(섞기 버튼, 선택), 주황 #f29e4c(위반, 교환 선택)
  - 막힌 자리 #d6d2ca에 45° 빗금
- **Type:** system-ui. 자리 이름은 칸 너비에 맞춰 12–18 px로 자동 축소하고, 넘치면 두 줄까지 줄바꿈한 뒤 말줄임합니다.
- **교실형 배치판:** 위쪽에 칠판 바(높이 28 px, "칠판 / 앞")를 둡니다. 자리 카드는 둥근 사각형(radius 8)이며 책상 그룹은 연한 나무색 판 위에 올립니다.
- **원탁형 배치판:** 테이블은 원(#e9d8b8)이고 가운데에 "1번 테이블"을 씁니다. 자리 카드는 원 둘레의 작은 둥근 사각형입니다. 테이블 수에 따라 1–4열 격자로 배치합니다.
- **반응형:**
  - 배치판은 사용 가능한 영역에 맞춰 칸 크기 = `min((W − 여백) / cols, (H − 여백) / rows)`로 계산하고 `resize`에서 다시 계산합니다.
  - 320 px 폭에서도 10칸이 들어가야 하므로, 칸 최소 크기 28 px까지 줄이고 글자는 10 px까지 줄입니다.
  - 가로가 넓은 화면(≥ 900 px)의 SETUP은 왼쪽 입력 패널(최대 380 px)과 오른쪽 미리보기의 2단입니다. 좁은 화면에서는 세로로 쌓고, 미리보기는 패널 안에 들어갑니다.
- **Juice:** 섞기 회오리, 카드 뒤집기, 결과 완료 시 배치판 전체 0.15초 살짝 튀기, 교환 시 날아가기, 위반 자리 주황 펄스 2회.
- **prefers-reduced-motion:** 회오리와 뒤집기를 생략하고 0.2초 페이드 후 바로 결과를 보여 줍니다. 교환은 즉시 바꿉니다.

## Sound (off by default)

- 섞기: 0.6초 화이트 노이즈에 bandpass를 800 → 2400 Hz로 스윕합니다. gain 0.05.
- 뒤집기 틱: 20 ms, 약 1.6 kHz, gain 0.035.
- 완료 차임: 사인파 660 Hz → 880 Hz 두 음, 각 120 ms, gain 0.08.
- Web Audio는 첫 사용자 제스처 뒤에만 만듭니다. 음소거 상태는 저장합니다.

## Export and copy

- **이미지 저장:**
  - 오프스크린 캔버스(가로 1080 px, 높이는 배치에 맞춤)에 배치판을 그립니다.
  - 위쪽에 제목 "{YYYY.MM.DD} 자리 배치 / Seating chart {YYYY-MM-DD}"와 "{n}명"을 넣고, 오른쪽 아래에 12 px 회색 "play.mesisi.net"을 넣습니다.
  - 현재 시점(정상/뒤집힘)을 그대로 반영합니다.
  - `toBlob` 다음 `<a download="seating-chart.png">`를 클릭하고, 1초 뒤 URL을 revoke합니다.
  - 실패하면 토스트 "저장에 실패했어요. 화면을 캡처해 주세요"를 띄웁니다.
- **텍스트 복사:**
  - 교실형은 칠판 쪽 줄부터 `1줄: 다람쥐 · 펭귄 | 수달 · 고슴도치 | …` 형식입니다. 그룹 구분은 ` | `, 그룹 안은 ` · `, 빈자리는 `(빈자리)`입니다.
  - 원탁형은 `1번 테이블: 다람쥐, 펭귄, …` 형식입니다.
  - 첫 줄은 `🪑 {YYYY.MM.DD} 자리 배치`, 마지막 줄은 `play.mesisi.net`입니다.
  - `navigator.clipboard.writeText`를 쓰고, 실패하면 숨긴 textarea와 `execCommand('copy')`로 대체합니다. 성공과 실패 모두 토스트로 알립니다.

## Sample names

[예시 이름 넣기]를 누르면 동물 이름 24개가 들어갑니다. 실존 인물 이름은 쓰지 않습니다.

- ko: 다람쥐, 펭귄, 수달, 고슴도치, 너구리, 판다, 코알라, 해달, 알파카, 미어캣, 부엉이, 거북이, 햄스터, 토끼, 여우, 곰, 사슴, 고래, 문어, 오리, 양, 고양이, 강아지, 참새
- en: Squirrel, Penguin, Otter, Hedgehog, Raccoon, Panda, Koala, Sea Otter, Alpaca, Meerkat, Owl, Turtle, Hamster, Rabbit, Fox, Bear, Deer, Whale, Octopus, Duck, Sheep, Cat, Puppy, Sparrow

## Strings

| key | ko | en |
|---|---|---|
| appTitle | 자리 바꾸기 뽑기 | Random Seat Shuffler |
| appSub | 이름 넣고 섞기 한 번이면 자리 배치 끝 | Add names, hit shuffle, done |
| secNames | 이름 | Names |
| namesPh | 한 줄에 한 명씩 (쉼표로 구분해도 돼요) | One name per line (commas work too) |
| sample | 예시 이름 넣기 | Add sample names |
| clear / clearConfirm | 모두 지우기 / 한 번 더 누르면 지워져요 | Clear all / Tap again to clear |
| trimmed | 긴 이름은 10자로 줄였어요 | Long names were cut to 10 characters |
| tooMany | 100명까지만 넣을 수 있어요 | Up to 100 names |
| count | {n}명 / {s}자리 | {n} people / {s} seats |
| secLayout | 배치 | Layout |
| classroom / tables | 교실형 / 원탁형 | Classroom / Round tables |
| rows / cols | 줄 / 칸 | Rows / Columns |
| group | 묶음 | Desk groups |
| groupSolo / groupPair / groupTrio | 혼자 / 2인 짝 / 3인 | Single / Pairs / Threes |
| tableCount / perTable | 테이블 수 / 테이블당 자리 | Tables / Seats per table |
| modeBlock / modePin | 빈자리 만들기 / 자리 고정 | Block seats / Pin seats |
| pinPick | 이 자리에 앉을 사람을 고르세요 | Choose who sits here |
| unpin / close | 고정 해제 / 닫기 | Unpin / Close |
| secRules | 규칙 | Rules |
| apartLabel | 떨어뜨릴 두 사람 | Keep these two apart |
| add | 추가 | Add |
| apartMax | 20쌍까지 추가할 수 있어요 | Up to 20 pairs |
| apartSame | 서로 다른 두 사람을 골라 주세요 | Pick two different people |
| avoidLast | 지난번 짝과 떨어뜨리기 | Avoid last neighbors |
| noLast | (지난 결과 없음) | (no previous result) |
| remember | 이름을 이 기기에 기억하기 | Remember names on this device |
| shuffle | 섞기! | Shuffle! |
| needNames | 이름을 한 명 이상 넣어 주세요 | Add at least one name |
| needSeats | 자리가 {k}개 모자라요. 줄·칸을 늘리거나 빈자리를 풀어 주세요 | {k} seats short. Add rows or unblock seats |
| shuffling | 섞는 중... 탭하면 바로 보기 | Shuffling... tap to skip |
| board | 칠판 / 앞 | Board / Front |
| tableN | {n}번 테이블 | Table {n} |
| empty | 빈자리 | Empty |
| conflict | 모든 조건을 지키지는 못했어요 (겹침 {n}개) | Couldn't meet every rule ({n} conflicts) |
| swapHint | 두 자리를 차례로 누르면 서로 바뀌어요 | Tap two seats to swap them |
| again / edit | 다시 섞기 / 수정 | Shuffle again / Edit |
| save / copy | 이미지 저장 / 텍스트 복사 | Save image / Copy text |
| flip | 시점 뒤집기 | Flip view |
| saved / saveFail | 이미지를 저장했어요 / 저장에 실패했어요. 화면을 캡처해 주세요 | Image saved / Could not save. Please take a screenshot. |
| copied / copyFail | 복사했어요 / 복사하지 못했어요 | Copied / Could not copy |
| chartTitle | {date} 자리 배치 | Seating chart {date} |
| rowN | {n}줄 | Row {n} |
| soundOn / soundOff | 소리 켜기 / 소리 끄기 | Sound on / Sound off |
| privacy | 이름은 이 기기에만 저장돼요 | Names stay on this device |

## localStorage (in try/catch, prefix `sts:`)

- `sts:names`: 이름 원문 문자열. "기억하기"가 꺼져 있으면 저장하지 않고, 끄는 순간 기존 값을 삭제합니다.
- `sts:remember`: "1" 또는 "0", 기본값 "1"
- `sts:layout`: JSON `{mode, rows, cols, group, tables, perTable}`
- `sts:blocked`: JSON 자리 id 배열
- `sts:pins`: JSON `{seatId: name}`
- `sts:apart`: JSON `[[a, b], …]`
- `sts:avoidLast`: "1" 또는 "0"
- `sts:last`: JSON `{layout, blocked, seats: {seatId: name}}`. 직전 결과로, "지난번 짝"과 페이지 재방문 시 복원에 씁니다. "기억하기"가 꺼져 있으면 저장하지 않습니다.
- `sts:flip`: "1" 또는 "0"
- `sts:sound`: "1" 또는 "0", 기본값 "0"

## Edge cases

- 사람 수 > 사용 가능한 자리 수이면 [섞기!]를 비활성화하고 `needSeats`를 표시합니다.
- 사람 수 < 자리 수이면 남는 자리는 빈자리로 둡니다. 빈자리 위치도 무작위입니다.
- 줄·칸·테이블 수를 줄여 사라진 자리에 걸린 막힘과 고정은 자동으로 지웁니다.
- 고정된 사람 수가 사용 가능한 자리 수와 같으면 섞기는 고정 그대로 결과를 냅니다. 오류가 아닙니다.
- 같은 사람이 두 자리에 고정되는 일은 막습니다. 새 고정이 기존 고정을 옮깁니다.
- 고정 자리를 막으면 고정을 해제하고 막습니다.
- 떨어뜨리기 쌍이 둘 다 같은 테이블에 고정되어 있으면 피할 수 없는 위반이므로 그대로 세어 표시합니다.
- 원탁형에서 테이블이 1개이면 떨어뜨리기와 "지난번 짝"은 의미가 없습니다. 규칙 섹션에 "테이블이 1개라 떨어뜨리기를 쓸 수 없어요 / Only one table, so keep-apart can't apply"를 회색으로 표시하고 계산에서 제외합니다.
- 결과 화면에서 창 크기가 바뀌면 상태로부터 다시 그리고, 애니메이션은 다시 시작하지 않습니다.
- 섞기 애니메이션 중 페이지가 숨겨지면 결과로 바로 넘어갑니다.
- [수정]은 결과를 유지한 채 SETUP으로 돌아갑니다. SETUP에서 다시 [섞기!]를 누르면 새로 섞습니다.
- localStorage가 막혀 있어도 모든 기능이 동작합니다. 이때 "지난번 짝"은 이번 세션의 직전 결과(메모리)를 씁니다.
- 입력 이름은 화면에 `textContent`로만 넣습니다. `innerHTML`에 사용자 문자열을 절대 넣지 않습니다.
- `location.hash === '#demo'`이면 예시 이름 24명, 교실형 5×6 2인 짝, 막힌 자리 1개, 고정 1개로 섞은 결과 화면으로 바로 갑니다. QA 썸네일용입니다.

## Must not

- 어떤 네트워크 요청도 하지 않습니다. 이름은 기기 밖으로 나가지 않습니다. 150 KB 이하로 유지합니다.
- 성별, 성적, 키, 시력 등 개인 특성 입력이나 그에 따른 배치 기능은 넣지 않습니다. 민감 정보 수집처럼 보일 수 있기 때문입니다.
- "꼴찌 자리", "벌칙 자리" 같은 놀림성 문구와 특정 자리 비하 표현을 쓰지 않습니다.
- 실존 학교, 학원, 브랜드, 기존 자리 배치 프로그램의 이름이나 외형을 흉내 내지 않습니다.
- 결과를 조작할 수 있는 숨은 가중치를 두지 않습니다. 고정과 떨어뜨리기는 화면에 보이는 규칙만 씁니다.
- alert, confirm, prompt, window.open, 페이지 이동을 쓰지 않습니다. 소리 자동 재생도 하지 않습니다.
- 페이지 전체 스크롤을 쓰지 않습니다. 패널 안에서만 스크롤합니다.
