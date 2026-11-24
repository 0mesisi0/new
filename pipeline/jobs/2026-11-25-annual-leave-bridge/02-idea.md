# Idea and spec: 연차 붙이기 계산기 2027 / Leave Bridge Planner 2027

## Concepts scored

점수는 1–5, 순서는 첫 10초 가치 / 독창성 / 한국 검색·공유 수요 / HTML 한 파일 구현 난이도다. 만점은 20점.

| Concept | Category | Score | Verdict |
|---|---|---|---|
| **연차 붙이기 계산기 2027**: 연차 N일을 고르면 2026 성탄절부터 2027년 말까지 가장 길게 쉬는 조합을 바로 추천 | **tools** | **5/3/5/5 = 18** | **선택.** 12월과 1월에 "연차 붙이기", "2027 황금연휴" 검색이 몰린다. 연차 계산 소재는 기존 아이템과 겹치지 않는다(어제 job의 focus와도 맞음) |
| 유행 수명 점괘: 간식이나 유행 이름을 넣으면 며칠 갈지 농담조로 점침 | fortune | 4/4/3/5 = 16 | 공유성은 좋다. 다만 실제 상품명을 쓰면 상표 문제가 생겨 문구 풀이 빈약해진다. 보류 |
| 이불 속 몰래 귤 까기: 뒤돌아본 가족이 다시 보면 멈추는 눈치 게임 | games | 4/3/3/4 = 14 | 규칙이 바이럴 게임(4월)과 너무 가깝다. 다른 각도가 나오면 재검토 |

## Meta

- slug `annual-leave-bridge`, category `tools`, kind `tool`, aspect `3/4`, date `2026-11-25`
- tags: ko `연차계산기`, `황금연휴`; en `annual-leave`, `holidays`
- title: ko `연차 붙이기 계산기 2027`; en `Leave Bridge Planner 2027`
- desc ko: 연차 며칠을 쓸지 고르면 2026 성탄절부터 2027년 말까지 가장 길게 쉬는 날짜를 바로 추천해요. 달력을 눌러 내 계획도 직접 짜 보세요.
- desc en: Pick how many leave days you can spare and see the longest breaks from Christmas 2026 to the end of 2027. Tap the calendar to build your own plan.
- howto ko: 위에서 연차 일수(1~5일)를 고르면 추천 연휴 카드가 나와요. 카드를 누르면 달력에 표시되고, 평일을 눌러 연차를 직접 넣거나 뺄 수 있어요. '텍스트 복사'나 '캘린더 저장'으로 계획을 챙기세요.
- howto en: Choose 1-5 leave days at the top to see suggested breaks. Tap a card to show it on the calendar, or tap weekdays to add and remove leave yourself. Copy the plan or save it as a calendar file.
- about ko: 2026년 11월 기준 법정 공휴일과 대체공휴일로 계산해요. 임시공휴일이나 회사 휴무일은 들어 있지 않으니 회사 규정을 꼭 확인하세요. 토·일 휴무 기준이에요.
- about en: Based on Korean public and substitute holidays known as of November 2026. Temporary holidays and company days off are not included, so check your workplace rules. Assumes Saturdays and Sundays off.

## Pitch

화면을 열자마자 "연차 4일 → 최대 10일 연휴" 카드가 보인다(2026-12-25 ~ 2027-01-03).

1. 연차 일수 칩(1~5)을 누르면 추천 카드가 바로 바뀐다.
2. 카드를 누르면 아래 달력에 연휴 구간이 칠해진다. 공휴일은 빨강, 연차는 주황, 주말은 연회색이다.
3. 달력에서 평일을 누르면 연차를 직접 넣고 뺄 수 있다. 상단 요약 "내 계획: 연차 X일 · 최장 Y일 연휴"가 즉시 갱신된다.
4. 결과는 텍스트 복사나 `.ics` 파일로 저장한다. 파일은 로컬 Blob으로 만들고 네트워크는 쓰지 않는다.

## Holiday data (embedded constant)

| date | ko | en | note |
|---|---|---|---|
| 2026-12-25 | 성탄절 | Christmas | 금 |
| 2027-01-01 | 신정 | New Year's Day | 금 |
| 2027-02-06 | 설날 연휴 | Seollal | 토 |
| 2027-02-07 | 설날 | Seollal | 일 |
| 2027-02-08 | 설날 연휴 | Seollal | 월 |
| 2027-02-09 | 대체공휴일(설날) | Substitute holiday | 화 |
| 2027-03-01 | 삼일절 | Independence Movement Day | 월 |
| 2027-05-05 | 어린이날 | Children's Day | 수 |
| 2027-05-13 | 부처님오신날 | Buddha's Birthday | 목 |
| 2027-06-06 | 현충일 | Memorial Day | 일, 대체 없음 |
| 2027-08-15 | 광복절 | Liberation Day | 일 |
| 2027-08-16 | 대체공휴일(광복절) | Substitute holiday | 월 |
| 2027-09-14 | 추석 연휴 | Chuseok | 화 |
| 2027-09-15 | 추석 | Chuseok | 수 |
| 2027-09-16 | 추석 연휴 | Chuseok | 목 |
| 2027-10-03 | 개천절 | National Foundation Day | 일 |
| 2027-10-04 | 대체공휴일(개천절) | Substitute holiday | 월 |
| 2027-10-09 | 한글날 | Hangul Day | 토 |
| 2027-10-11 | 대체공휴일(한글날) | Substitute holiday | 월 |
| 2027-12-25 | 성탄절 | Christmas | 토 |
| 2027-12-27 | 대체공휴일(성탄절) | Substitute holiday | 월 |
| 2028-01-01 | 신정 | New Year's Day | 토, 범위 끝 처리용 |

- 범위는 오늘(실제 시계, 로컬 날짜)부터 `2028-01-02`까지다. 오늘 이전 날짜는 흐리게 표시하고 추천과 계산에서 제외한다.
- 제헌절(7/17) 공휴일 재지정 여부는 확인하지 못했다. 데이터에서 빼고 상수 하나만 남긴다: `// ponytail: 제헌절 재지정 확정 시 2027-07-17(토) + 대체 2027-07-19(월) 추가`.
- 2027 음력 공휴일(설 2/7, 부처님오신날 5/13, 추석 9/15)은 플래너가 직접 계산한 값이다. 빌더는 천문연 월력요항과 대조해 검증한다. 대조할 수 없으면 PR 본문에 "미검증"이라고 적는다.

## Algorithm

- 날짜 배열 `days[i]`를 만든다. 각 날짜에 `off = 토/일 || 공휴일` 값을 둔다.
- **추천 (N = 1..5):**
  1. 모든 구간 [a,b]를 훑는다. 약 405일이므로 O(n²) 약 16만 회로 충분하다(`// ponytail: O(n²) 스캔, 범위 몇 년으로 늘면 투포인터로`).
  2. 조건:
     - 구간 안 평일 수 w가 1 ≤ w ≤ N
     - 구간 안에 공휴일이 1개 이상
     - 극대 구간: `a==0 || !off[a-1]`이고 `b==last || !off[b+1]`
  3. 길이 L = b−a+1. 정렬 기준은 L 내림차순, w 오름차순, a 오름차순 순서다.
  4. 겹치지 않게 greedy로 최대 6개를 고른다. 한 날짜라도 겹치면 제외한다.
  5. 카드는 L이 긴 순서로 표시한다.
- **수동 계획:**
  - 사용자 연차 집합 `S`(평일만)를 둔다.
  - off ∪ S로 이어진 구간 중 S를 1개 이상 포함하는 구간을 "내 연휴"로 본다.
  - 요약에는 |S|와 최장 구간 길이를 보여 준다.
- **QA 기대값.** 자체 점검 `demo()`에 assert로 넣는다:
  - N=4 최상위: 2026-12-25 ~ 2027-01-03, L=10, 연차 12/28~31
  - N=4에 2027-10-02 ~ 10-11, L=10(연차 10/5~8)도 포함
  - N=3에 2027-02-06 ~ 02-14, L=9(연차 2/10~12) 포함
  - N=2에 2027-09-11 ~ 09-19, L=9(연차 9/13, 9/17) 포함
  - N=1에 2027-05-13 ~ 05-16, L=4(연차 5/14) 포함

## Flow

화면은 하나이고 페이지는 스크롤되지 않는다. 내부 패널만 스크롤된다.

1. **Header:** 제목, 한 줄 부제, 우상단 언어 표시가 없다(`?lang`으로 결정).
2. **N 칩:** [1일] … [5일] 5개. 기본값은 저장값이고, 없으면 2. 선택 칩은 진한 남색으로 채운다.
3. **추천 카드 스트립:**
   - 가로 스크롤(`touch-action:pan-x`). 카드 폭은 min(78vw, 260px).
   - 카드 내용:
     - 큰 숫자 "10일"
     - "12.25(금) ~ 1.3(일)"
     - "연차 4일: 12.28 · 12.29 · 12.30 · 12.31"
     - 공휴일 이름 칩
     - 효율 배지 "연차 1일 = 2.5일 휴식"
   - 첫 카드에는 "최장" 리본을 단다.
   - 카드를 누르면 S를 그 카드의 연차로 교체하고, 달력을 해당 월로 이동하고, 구간을 0.3s 동안 펄스한다.
   - 결과가 0개면 빈 상태 문구를 보여 준다.
4. **달력:**
   - 월 단위, 이전/다음 버튼, 범위 밖으로는 이동 불가.
   - 칸은 최소 44px. 7열, 일요일부터 시작.
   - 색: 공휴일·일요일 숫자는 빨강, 토요일은 파랑, 공휴일 칸에는 작은 이름(8자 넘으면 말줄임).
   - 연차 칸은 주황 배경에 "연" 배지. 연휴 구간은 칸 뒤에 이어지는 연한 띠.
   - 평일을 누르면 S에서 토글된다. 주말, 공휴일, 지난 날을 누르면 0.2s 흔들고 토스트 "이미 쉬는 날이에요" 또는 "지난 날짜예요"를 띄운다.
5. **요약 바(달력 위):**
   - "내 계획: 연차 {x}일 · 최장 {y}일 연휴 ({range})"
   - S가 비면 "카드를 누르거나 달력의 평일을 눌러 연차를 넣어 보세요"
   - [초기화] 버튼
6. **하단 액션 바(sticky):** [텍스트 복사] [캘린더 저장]. S가 비면 둘 다 비활성.

반응형:

- 폭 720px 이상이면 2열이다. 왼쪽에 칩과 세로 카드 리스트(내부 세로 스크롤), 오른쪽에 요약, 달력, 액션 바.
- 320px 폭에서는 좌우 패딩 12px. 달력 칸이 44px보다 작아지면 공휴일 이름을 숨기고 빨간 점만 표시한다.

## Controls

- **Pointer:** 칩, 카드, 달력 칸, 버튼을 모두 탭이나 클릭으로 조작한다.
- **Keys:**
  - 1~5: N 선택
  - ←/→: 달력 월 이동
  - ↑/↓: 카드 포커스 이동, Enter로 적용
  - C: 복사, S: 캘린더 저장, Backspace: 초기화
- **Focus:** 모든 버튼에 `:focus-visible` 링을 둔다. 달력 칸은 `button`이고 `aria-label`은 "2027년 2월 10일 수요일, 평일, 연차 아님" 형식이다.

## Export

- **복사:**
  - `navigator.clipboard.writeText`를 쓰고, 실패하면 숨긴 textarea와 `execCommand('copy')`로 폴백한다.
  - 텍스트 ko:
    - `🗓️ 내 연차 계획 (연차 {x}일)`
    - 구간마다 한 줄: `· {range} {L}일 연휴 (연차: {dates})`
    - 마지막 줄: `play.mesisi.net`
  - en도 같은 형식으로 만든다.
- **캘린더 저장:**
  - S의 연속 구간마다 VEVENT 하나를 만든다. 종일 일정이고 `DTSTART;VALUE=DATE`, DTEND는 다음날이다.
  - SUMMARY는 "연차 (하루한판)" / "Leave (Daily Toybox)".
  - CRLF로 줄을 끝낸다. UID는 `{yyyymmdd}-{rand}@play.mesisi.net`.
  - Blob과 `<a download="annual-leave-2027.ics">`로 내려받고, 1s 뒤 URL을 revoke한다.
  - 실패 시 토스트를 띄운다.

## Visual design

- **Palette:**
  - 배경 #f4f1ea
  - 카드 #ffffff
  - 잉크 #1f2a44
  - 공휴일 빨강 #e0453d
  - 토요일 파랑 #3a6fd8
  - 연차 주황 #f29d38
  - 연휴 띠 #fde6c4
  - 회색 #9aa0aa
- **Type:** system-ui. 큰 숫자(연휴 일수)는 32px bold, `font-variant-numeric: tabular-nums`.
- **Motion:**
  - 카드 적용 시 띠가 왼쪽에서 오른쪽으로 0.3s 동안 차오른다.
  - N 변경 시 카드가 0.15s 페이드와 스케일 0.97에서 1로 바뀐다.
  - `prefers-reduced-motion`이면 애니메이션을 모두 끈다.
- 사운드는 없다(도구라서 불필요).

## Strings

| key | ko | en |
|---|---|---|
| appTitle | 연차 붙이기 계산기 2027 | Leave Bridge Planner 2027 |
| sub | 연차 며칠로 최대 며칠 쉴 수 있을까? | How long a break can a few leave days buy? |
| nLabel | 쓸 수 있는 연차 | Leave days to spend |
| nChip | {n}일 | {n} day / {n} days |
| best | 최장 | Longest |
| days | {L}일 | {L} days |
| leaveList | 연차 {w}일: {dates} | {w} leave: {dates} |
| eff | 연차 1일 = {e}일 휴식 | 1 leave day = {e} days off |
| empty | 남은 기간에 이 조건으로 붙일 연휴가 없어요 | No breaks left in range for this many days |
| planEmpty | 카드를 누르거나 달력의 평일을 눌러 연차를 넣어 보세요 | Tap a card or a weekday to add leave |
| plan | 내 계획: 연차 {x}일 · 최장 {y}일 연휴 ({range}) | My plan: {x} leave · longest break {y} days ({range}) |
| reset | 초기화 | Reset |
| copy / ics | 텍스트 복사 / 캘린더 저장 | Copy text / Save to calendar |
| copied / copyFail | 복사했어요 / 복사하지 못했어요 | Copied / Could not copy |
| icsOk / icsFail | 캘린더 파일을 저장했어요 / 저장하지 못했어요 | Calendar file saved / Could not save |
| alreadyOff | 이미 쉬는 날이에요 | Already a day off |
| past | 지난 날짜예요 | That day has passed |
| prev / next | 이전 달 / 다음 달 | Previous month / Next month |
| weekdays | 일 월 화 수 목 금 토 | Sun Mon Tue Wed Thu Fri Sat |
| monthTitle | {y}년 {m}월 | {Month} {y} |
| rangeFmt | {m}.{d}({요일}) ~ {m}.{d}({요일}) | {Mon} {d} – {Mon} {d} |
| outOfData | 2027년 이후 공휴일 데이터는 아직 없어요 | Holiday data ends with 2027 |
| note | 법정·대체공휴일 기준, 토·일 휴무 가정. 임시공휴일·회사 휴무는 미포함 | Public and substitute holidays, Sat–Sun off. Excludes temporary and company holidays |
| icsSummary | 연차 (하루한판) | Leave (Daily Toybox) |
| shareHead | 🗓️ 내 연차 계획 (연차 {x}일) | 🗓️ My leave plan ({x} days) |

공휴일 이름 ko/en은 위 Holiday data 표를 그대로 쓴다.

## localStorage (try/catch, prefix `alb:`)

- `alb:n`: "1"~"5"
- `alb:plan`: S를 `YYYY-MM-DD` 배열 JSON으로 저장. 로드할 때 지난 날짜, 주말·공휴일, 범위 밖 날짜는 걸러낸다.

## Edge cases

- **오늘이 범위 끝 이후:** `outOfData`를 표시하고, 달력은 2027-12에 고정, 추천은 빈 상태.
- **오늘이 연휴 한가운데:** 극대 구간 판정은 오늘을 범위 시작으로 본다(a==0 허용). 이미 지난 부분은 L에 넣지 않는다.
- **범위 끝 2028-01-02:** 구간이 범위 끝에서 잘린다. 2027 성탄 카드는 "~1.2(일)"까지만 센다.
- **자정 경과:** 탭이 다시 보일 때(`visibilitychange`) 오늘 날짜가 바뀌었으면 데이터를 다시 계산한다.
- **같은 길이 후보:** 2/5와 2/10처럼 길이가 같으면 이른 날짜를 고른다. 이 결정은 정렬로 고정한다.
- **resize:** 상태는 유지하고 레이아웃만 다시 그린다.
- **localStorage 차단:** 모든 기능이 그대로 동작한다.
- **`location.hash === '#demo'`:** N=4, 첫 카드 적용, 달력 2026-12 표시. QA 썸네일용.
- **날짜 계산:** 로컬 자정 기준 `new Date(y, m, d)`로만 한다. `toISOString`은 UTC로 하루가 밀리므로 쓰지 않는다.

## Must not

- 네트워크 금지. fetch, 외부 폰트, 공휴일 API 모두 쓰지 않는다.
- 연차 발생일수, 연차수당, 근로기준법 계산이나 조언은 하지 않는다. 일정 추천만 한다.
- 실제 회사, 브랜드, 정부 사이트 모양이나 로고를 흉내 내지 않는다.
- alert, confirm, prompt, window.open, 페이지 이동 금지.
- 데이터에 없는 공휴일(제헌절, 노동절, 임시공휴일)을 추측해서 넣지 않는다.
- 페이지 전체 스크롤 금지. 내부 패널만 스크롤한다.
