# Idea and spec: 세계 시간 · 시차 계산기 / World Clock & Time Zone Planner

Agent: Claude (opus), 플래너. 디자인 노트(팔레트, 레이아웃, 모션)를 함께 넣었습니다.

## Concepts scored

점수는 1–5점이며 순서대로 첫 10초 가치, 독창성, 한국어 검색·공유 수요, HTML 한 파일 구현 난이도입니다. 만점은 20점입니다.

| Concept | Category | Score | Verdict |
|---|---|---|---|
| 연말정산 놓친 공제 체크리스트 | tools | 3/3/5/2 = 13 | 보류. 한도와 공제율을 국세청 자료로 확인해야 하고 개정 내용도 남아 있어 사실 오류 위험이 큼. 수치를 확인한 뒤 다시 검토 |
| 끝없는 로파이 라디오 (브라우저 실시간 작곡) | radio | 4/4/3/3 = 14 | 보류. radio는 이미 2개이고 음악 생성 품질을 맞추기 어려움 |
| **세계 시간 · 시차 계산기** | **info** | **4/2/5/5 = 16** | **선택**. info 카테고리 첫 아이템이고 주제(세계 시간대)가 기존 아이템·대기 스펙과 겹치지 않음. 연말연시에 해외 가족·친구와 통화 시간을 맞추려는 수요가 있고, 시간대 데이터는 브라우저 `Intl`로 오프라인에서 처리됨 |

## Meta

- slug `world-time-planner`, category `info`, kind `tool`, aspect `3/4`, date `2026-11-25`
- tags: ko `세계시간`, `시차계산기`; en `world-clock`, `time-zone`
- title: ko `세계 시간 · 시차 계산기`; en `World Clock & Time Zone Planner`
- desc ko: 서울과 뉴욕, 런던, 시드니의 지금 시각과 시차를 한눈에 비교해요. 24시간 표에서 모두가 깨어 있는 통화·회의 시간을 바로 찾을 수 있어요.
- desc en: See the time and offset in Seoul, New York, London or Sydney at a glance, and find the hour when everyone is awake for a call or meeting.
- howto ko: '+ 도시 추가'로 도시를 최대 6개까지 넣으세요. 맨 위 도시가 기준이에요. 아래 24시간 표에서 칸을 누르거나 ←/→ 키로 옮기면 그 시각에 각 도시가 몇 시인지 보여요. 초록 칸은 업무 시간, 노란 칸은 깨어 있는 시간, 회색 칸은 잘 시간이에요. '복사'를 누르면 시간표를 메신저에 붙여 넣을 수 있어요.
- howto en: Add up to 6 cities with "+ Add city". The top city is your home. Tap a column in the 24-hour grid, or use ←/→, to see the time in every city at that hour. Green means work hours, yellow means awake and gray means asleep. "Copy" puts the schedule on your clipboard for chat.
- about ko: 시차와 서머타임은 사용하는 브라우저의 시간대 데이터로 계산해요. 인터넷 연결 없이도 동작하고, 고른 도시는 이 기기에만 저장돼요. 중요한 일정은 상대방에게 한 번 더 확인하세요.
- about en: Offsets and daylight saving time come from your browser's own time zone data. It works offline, and your cities are saved only on this device. Double-check important meetings with the other side.

## Pitch

도시마다 카드 한 줄과 아래 24시간 띠를 보여 주는 깔끔한 보드입니다. 화면을 열자마자 "서울 오후 3:12 / 뉴욕 오전 1:12 (−14시간, 어제)"가 바로 보입니다.

1. 첫 화면에 기준 도시와 기본 도시 2개(언어별 기본값)의 현재 시각이 매초 갱신되어 나옵니다.
2. 아래 표는 기준 도시의 하루(00시–23시)를 가로축으로 놓고, 도시마다 그 시각의 현지 시각을 색 칸으로 보여 줍니다.
3. 모든 도시가 업무 시간(09–18시)인 열에는 ★가 붙습니다. 그런 열이 없으면 모두 깨어 있는(07–23시) 열에 ☆가 붙습니다.
4. 열을 고르면 위의 카드들이 그 시각 기준으로 바뀌고, '복사'로 시간표 텍스트를 공유합니다.

시간대 계산은 `Intl.DateTimeFormat`의 `timeZone` 옵션만 씁니다. 오프셋은 하드코딩하지 않습니다.

## Flow

단일 화면 도구입니다. 게임 루프는 없습니다.

1. **BOARD (기본 상태 = 지금)**
   - 헤더: 제목, 날짜 입력(`<input type="date">`, 기본값은 기준 도시의 오늘), [지금] 버튼, 12/24시간 토글, 언어에 맞는 도움말 한 줄.
   - 도시 카드 목록: 첫 카드가 기준 도시이며 🏠 표시가 붙습니다.
   - 24시간 표와 [복사] [+ 도시 추가] 버튼이 있는 하단 바.
   - 시계는 매초 갱신됩니다. 다음 초의 경계에 맞춰 `setTimeout`을 걸고, 페이지가 숨겨지면 멈춥니다.
2. **SELECTED (열을 고른 상태)**
   - 고른 열이 테두리로 강조되고 카드 시각이 그 시각으로 바뀝니다. 매초 갱신은 멈춥니다.
   - 헤더에 "선택한 시각" 배지가 뜨고, [지금]을 누르면 BOARD로 돌아갑니다.
3. **ADD CITY (시트)**
   - 아래에서 올라오는 시트로, 검색 입력과 도시 목록이 있습니다. 목록 항목에는 현재 시각과 기준 도시 대비 시차가 함께 보입니다.
   - 항목을 누르면 도시가 추가되고 시트가 닫힙니다. Esc나 배경을 눌러도 닫힙니다.
   - 6개가 차면 버튼이 비활성화되고 "최대 6개" 안내가 나옵니다.
4. **CITY CARD 메뉴**
   - 카드 오른쪽 ⋯ 버튼을 누르면 [기준으로] [위로] [아래로] [삭제]가 나옵니다. 메뉴는 카드 안에 인라인으로 펼쳐집니다.
   - 마지막 남은 1개는 삭제할 수 없습니다.

## Controls

- **Pointer:** 모든 버튼과 표의 칸을 탭하거나 클릭합니다. 표는 가로로 드래그해도 열 선택이 따라갑니다(pointermove 중 x 좌표를 열로 환산).
- **Keys:** ←/→로 선택 열을 1시간씩 옮기고(선택이 없으면 현재 시각 열부터 시작), Home/End로 첫 열·마지막 열로 갑니다. N은 [지금], C는 복사, A는 도시 추가, T는 12/24시간 토글입니다. 시트 안에서는 ↑/↓와 Enter로 고르고 Esc로 닫습니다.
- 검색 입력에 포커스가 있을 때는 단축키를 무시합니다.
- **Touch and layout:** 버튼은 최소 44 px입니다. 표 영역은 `touch-action: none`이고 시트의 목록 영역만 `touch-action: pan-y`로 내부 스크롤됩니다. 페이지 자체는 절대 스크롤되지 않습니다.

## City list (내장, 41개)

`id`는 IANA 시간대이고, 같은 시간대를 쓰는 도시는 `id#이름`으로 구분합니다. 검색은 ko 이름, en 이름, 별칭을 모두 대상으로 하며, 소문자로 바꾸고 공백을 제거한 뒤 부분 일치로 찾습니다.

| ko | en | timeZone | 별칭 |
|---|---|---|---|
| 서울 | Seoul | Asia/Seoul | 한국, korea |
| 도쿄 | Tokyo | Asia/Tokyo | 일본, japan |
| 오사카 | Osaka | Asia/Tokyo | |
| 베이징 | Beijing | Asia/Shanghai | 중국, china |
| 상하이 | Shanghai | Asia/Shanghai | |
| 홍콩 | Hong Kong | Asia/Hong_Kong | |
| 타이베이 | Taipei | Asia/Taipei | 대만, taiwan |
| 울란바토르 | Ulaanbaatar | Asia/Ulaanbaatar | 몽골 |
| 마닐라 | Manila | Asia/Manila | 필리핀 |
| 싱가포르 | Singapore | Asia/Singapore | |
| 방콕 | Bangkok | Asia/Bangkok | 태국 |
| 호찌민 | Ho Chi Minh City | Asia/Ho_Chi_Minh | 베트남, saigon |
| 하노이 | Hanoi | Asia/Ho_Chi_Minh | |
| 자카르타 | Jakarta | Asia/Jakarta | 인도네시아 |
| 발리 | Bali | Asia/Makassar | |
| 뉴델리 | New Delhi | Asia/Kolkata | 인도, india |
| 카트만두 | Kathmandu | Asia/Kathmandu | 네팔 |
| 타슈켄트 | Tashkent | Asia/Tashkent | 우즈베키스탄 |
| 두바이 | Dubai | Asia/Dubai | uae |
| 이스탄불 | Istanbul | Europe/Istanbul | 튀르키예, turkey |
| 모스크바 | Moscow | Europe/Moscow | 러시아 |
| 카이로 | Cairo | Africa/Cairo | 이집트 |
| 요하네스버그 | Johannesburg | Africa/Johannesburg | 남아공 |
| 런던 | London | Europe/London | 영국, uk |
| 파리 | Paris | Europe/Paris | 프랑스 |
| 베를린 | Berlin | Europe/Berlin | 독일 |
| 마드리드 | Madrid | Europe/Madrid | 스페인 |
| 로마 | Rome | Europe/Rome | 이탈리아 |
| 암스테르담 | Amsterdam | Europe/Amsterdam | 네덜란드 |
| 뉴욕 | New York | America/New_York | 미국 동부, nyc |
| 토론토 | Toronto | America/Toronto | 캐나다 |
| 시카고 | Chicago | America/Chicago | 미국 중부 |
| 덴버 | Denver | America/Denver | |
| 로스앤젤레스 | Los Angeles | America/Los_Angeles | 미국 서부, la |
| 밴쿠버 | Vancouver | America/Vancouver | |
| 호놀룰루 | Honolulu | Pacific/Honolulu | 하와이 |
| 멕시코시티 | Mexico City | America/Mexico_City | 멕시코 |
| 상파울루 | São Paulo | America/Sao_Paulo | 브라질 |
| 시드니 | Sydney | Australia/Sydney | 호주 |
| 괌 | Guam | Pacific/Guam | |
| 오클랜드 | Auckland | Pacific/Auckland | 뉴질랜드 |

- 마지막 항목으로 `UTC`(ko `협정 세계시 UTC`, en `UTC`)를 둡니다.
- 시작할 때 도시마다 `new Intl.DateTimeFormat('en', {timeZone})` 생성을 try/catch로 시도합니다. 실패한 도시는 목록에서 조용히 뺍니다.

## Time math

- **오프셋(분):** `offset(tz, t)` = formatToParts(`hourCycle:'h23'`, year/month/day/hour/minute/second)로 얻은 현지 벽시계 시각을 `Date.UTC(...)`로 바꾼 값에서 t를 빼고 60000으로 나눕니다. 결과를 반올림합니다. 일부 엔진이 자정을 24시로 내놓는 경우를 대비해 hour 24는 0으로 처리합니다.
- **기준 도시 자정 찾기:** 선택 날짜 Y-M-D에 대해 guess = Date.UTC(Y,M−1,D,0,0) − offset(home, Date.UTC(Y,M−1,D)) × 60000으로 잡습니다. 그런 다음 guess = Date.UTC(Y,M−1,D) − offset(home, guess) × 60000을 한 번 더 계산해 보정합니다.
- **표의 열:** k = 0…23에 대해 instant_k = 자정 + k × 3,600,000으로 잡습니다. 열 머리글은 instant_k를 기준 도시 시각으로 포맷한 값입니다. 서머타임 전환일에는 같은 시가 두 번 나오거나 하나가 빠질 수 있는데, 숨기지 않고 그대로 보여 줍니다.
- **칸 내용:** 도시마다 instant_k를 현지 시각으로 포맷합니다. 분이 0이 아니면(인도 :30, 네팔 :45) "14:30"처럼 분까지 표시하고, 아니면 "14"만 표시합니다.
- **칸 색(현지 시 h, 분 포함 소수):**
  - 업무: 9 ≤ h < 18
  - 깨어 있음: 7 ≤ h < 9 또는 18 ≤ h < 23
  - 잠: 나머지
- **날짜 구분:** 현지 날짜가 기준 날짜와 다르면 칸 왼쪽 위에 작은 점을 찍습니다. 카드에는 "어제/내일"을 표시합니다.
- **★/☆ 열:** 모든 도시가 업무면 ★입니다. ★ 열이 하나도 없을 때만, 모든 도시가 업무나 깨어 있음인 열에 ☆를 붙입니다. 둘 다 없으면 표 위에 noOverlap 문구를 띄웁니다.
- **카드의 시차 표기:** diff = offset(city) − offset(home)을 시각 t 기준으로 계산합니다. 0이면 "같은 시간", 아니면 "+9시간", "−13시간 30분"처럼 표시합니다. 영어는 "+9h", "−13h 30m"입니다.
- **서머타임 배지:** offset(tz, t)가 그해 1월 1일과 7월 1일 오프셋 중 큰 값과 같고 두 값이 서로 다르면 카드에 "서머타임 / DST" 배지를 붙입니다.

## Screens and layout

- **Palette:**
  - 배경: 밤하늘 #14213d에서 #1f3a5f로 가는 세로 그라데이션
  - 카드 #ffffff 92%, 글자 #1b2430, 보조 글자 #6b7785
  - 업무 칸 #3fb27f, 깨어 있음 칸 #f2c14e, 잠 칸 #c9d1db, 선택 테두리 #ff6b5a, ★ #ff6b5a
  - 색만으로 구분하지 않도록 칸에 패턴을 둡니다. 업무 칸은 진한 글자, 잠 칸은 흐린 글자와 🌙 아이콘(열 폭 28 px 이상일 때만)입니다.
- **도시 카드(높이 64 px):**
  - 왼쪽: 낮/밤 원형 아이콘(☀️ 06–18시, 🌙 그 외) 두 개 중 하나, 도시 이름(16 px bold), 그 아래 "12월 3일 (수) · −14시간" 12 px 회색 글자
  - 오른쪽: 시각 28 px, `font-variant-numeric: tabular-nums`, 12시간제면 "오후 3:12" 또는 "3:12 PM"
  - ⋯ 버튼
  - 기준 카드는 왼쪽에 4 px #ff6b5a 띠를 둡니다.
- **24시간 표:**
  - 행 = 도시, 열 = 24개입니다. 첫 열에는 도시 약칭을 고정으로 둡니다(최대 폭 72 px, 넘치면 말줄임).
  - 열 폭 = (표 폭 − 72) / 24이며 최소 12 px입니다.
  - 폭이 좁으면(열 폭 < 22 px) 칸 숫자를 숨기고, 3시간마다(0, 3, 6…)만 머리글을 보여 줍니다. 대신 선택한 열의 값을 표 위 말풍선으로 보여 줍니다.
  - 현재 시각 열에는 세로 점선과 "지금" 표시를 붙입니다(선택 날짜가 오늘일 때만).
- **하단 바:** [복사] [+ 도시 추가]를 반반으로 나누며 높이는 52 px입니다.
- **추가 시트:** 높이 min(80vh, 560px), 위쪽 둥근 모서리입니다. 검색 입력에는 자동 포커스를 주되 터치 기기에서는 주지 않습니다(키보드가 화면을 가리므로). 이미 추가한 도시는 ✓ 표시와 함께 비활성화합니다.
- **토스트:** 하단 바 위에 1.6초 동안 떴다가 사라집니다.
- **반응형:**
  - 320 px에서는 좌우 여백 12 px, 카드 시각 24 px입니다.
  - 넓은 화면에서는 가운데 열 max-width 720 px입니다.
  - 높이가 520 px 미만이면 카드 높이를 52 px로 줄이고 보조 줄을 숨깁니다.
  - resize와 orientationchange 때 표를 다시 그립니다.
  - 카드 목록과 표는 화면에 맞춰 flex로 나누고, 넘치면 카드 목록만 내부 스크롤합니다.
- **Motion:**
  - 열 선택 시 테두리가 120 ms 동안 미끄러지듯 이동합니다.
  - 카드 시각은 바뀔 때 숫자가 4 px 위로 페이드됩니다.
  - 도시 추가 시 새 카드가 scale 0.96에서 1로 커집니다.
  - `prefers-reduced-motion`이면 전부 끕니다.
- **Sound:** 없습니다. 정보 도구라 소리가 필요 없습니다.

## Copy text

- 형식 ko:

  ```
  🕒 {기준도시} 기준 {M월 D일 (요일)} {시각}
  · 서울 오후 3:00 (12월 3일)
  · 뉴욕 오전 1:00 (12월 3일)
  · 런던 오전 6:00 (12월 3일)
  play.mesisi.net
  ```

- en: 같은 구조로 쓰되 첫 줄은 "🕒 {time} on {Wed, Dec 3} in {home}"입니다.
- 선택 열이 없으면 지금 시각으로 만듭니다.
- 날짜와 요일은 `Intl.DateTimeFormat(lang, {timeZone, month:'long'|'short', day:'numeric', weekday:'short'})`로 만듭니다.
- 복사는 `navigator.clipboard.writeText`를 먼저 쓰고, 실패하면 숨긴 textarea와 `execCommand('copy')`로 대체합니다. 성공하든 실패하든 토스트만 띄웁니다.

## Strings

| key | ko | en |
|---|---|---|
| appTitle | 세계 시간 · 시차 계산기 | World Clock & Time Zone Planner |
| sub | 칸을 누르면 그 시각에 다른 도시는 몇 시인지 보여요 | Tap a column to see that hour in every city |
| now | 지금 | Now |
| selected | 선택한 시각 | Selected time |
| date | 날짜 | Date |
| fmt12 / fmt24 | 12시간 / 24시간 | 12h / 24h |
| home | 기준 | Home |
| addCity | + 도시 추가 | + Add city |
| copy | 복사 | Copy |
| copied / copyFail | 복사했어요 / 복사하지 못했어요 | Copied / Could not copy |
| search | 도시 검색 (예: 뉴욕, Paris) | Search a city (e.g. Tokyo, 뉴욕) |
| noResult | 찾는 도시가 없어요 | No matching city |
| max | 도시는 최대 6개까지 넣을 수 있어요 | You can add up to 6 cities |
| added | 이미 추가됨 | Added |
| makeHome / up / down / remove | 기준으로 / 위로 / 아래로 / 삭제 | Make home / Move up / Move down / Remove |
| lastOne | 도시가 하나는 있어야 해요 | Keep at least one city |
| sameTime | 같은 시간 | Same time |
| diffH / diffHM | {s}{h}시간 / {s}{h}시간 {m}분 | {s}{h}h / {s}{h}h {m}m |
| yesterday / tomorrow | 어제 / 내일 | Yesterday / Tomorrow |
| dst | 서머타임 | DST |
| legendWork / legendAwake / legendSleep | 업무 09–18 / 깨어 있음 / 잘 시간 | Work 9–18 / Awake / Asleep |
| bestWork | ★ 모두 업무 시간 | ★ Everyone at work |
| bestAwake | ☆ 모두 깨어 있는 시간 | ☆ Everyone awake |
| noOverlap | 모두 깨어 있는 시간이 없어요. 한쪽이 조금 일찍 일어나야겠네요 | No shared waking hour. Someone needs an early alarm |
| close | 닫기 | Close |
| noIntl | 이 브라우저는 시간대 계산을 지원하지 않아요 | This browser can't calculate time zones |
| note | 시차와 서머타임은 브라우저의 시간대 데이터 기준이에요 | Offsets and DST follow your browser's time zone data |
| utc | 협정 세계시 UTC | UTC |

요일, 월 이름, 오전/오후는 문자열 표에 넣지 않고 `Intl`이 `lang`에 맞게 만들게 합니다.

## Defaults

- 기준 도시: `Intl.DateTimeFormat().resolvedOptions().timeZone`이 목록에 있으면 그 도시(같은 시간대가 여럿이면 첫 항목)로, 없으면 서울로 정합니다.
- 기본 도시 ko: 기준 도시 + 뉴욕 + 런던. 기준 도시가 서울이 아니면 서울을 2번째로 넣습니다.
- 기본 도시 en: 기준 도시 + 서울 + 런던. 겹치면 뉴욕으로 채웁니다.
- 시간 형식 기본값: ko는 12시간(오전/오후), en은 `Intl` 기본값을 따릅니다.

## localStorage (try/catch, prefix `wtp:`)

- `wtp:cities`: 도시 id 배열(JSON), 첫 항목이 기준 도시. 읽을 때 목록에 없는 id는 버리고, 비어 있으면 기본값을 씁니다.
- `wtp:fmt`: "12" 또는 "24"
- 선택한 날짜와 열은 저장하지 않습니다. 열 때마다 "지금"으로 시작합니다.

## Edge cases

- **Intl 시간대 미지원:** `timeZone:'Asia/Seoul'` 생성이 실패하면 noIntl 문구만 가운데 보여 주고 JS 오류 없이 끝냅니다.
- **서머타임 전환일:** 위 Time math대로 23개 또는 25개 시각이 생길 수 있지만 표는 항상 instant 24개입니다. 기준 도시에서 25시간인 날이면 마지막 23시 칸이 다음 날 00시가 아니라 22시나 23시로 보일 수 있는데, 정상 동작입니다. 열 머리글은 항상 instant를 포맷한 값입니다.
  - QA로 확인할 날짜: 2027-03-14 뉴욕(봄 전환), 2026-04-05 시드니 기준(가을 전환).
- **30분·45분 오프셋:** 칸 숫자에 분을 표시하고 색 판정에도 분을 포함합니다.
- **날짜 입력이 비거나 잘못됨:** 오늘로 되돌립니다. 범위는 1970–2100이며 벗어나면 가장 가까운 값으로 맞춥니다.
- **기준 도시 변경:** 선택 열은 같은 instant를 유지하도록 새 기준 날짜와 열을 다시 계산합니다. 새 기준의 날짜가 바뀌면 날짜 입력도 바꿉니다.
- **자정을 넘는 순간:** 매초 갱신 중 기준 도시 날짜가 바뀌면, 선택 날짜가 "오늘"이었을 때만 새 날짜로 표를 다시 그립니다.
- **숨김 탭:** `document.hidden`이면 타이머를 멈추고, 다시 보이면 즉시 갱신하고 재개합니다.
- **도시 1개:** 표는 1행입니다. ★/☆는 그 도시 기준으로 판정합니다. 삭제는 비활성화하고 lastOne 토스트를 띄웁니다.
- **검색에 공백·대소문자·한영 혼용:** 정규화해 부분 일치로 찾습니다. 결과가 없으면 noResult를 보여 줍니다.
- **localStorage 차단:** 기본값으로 동작하고 저장만 생략합니다.
- **`location.hash === '#demo'`:** 도시를 [서울, 뉴욕, 런던, 시드니]로, 날짜를 2026-12-24로, 서울 기준 21시 열을 선택한 상태로 띄웁니다. QA 썸네일 전용이며 저장하지 않습니다.

## Must not

- 네트워크는 일절 쓰지 않습니다(시간 서버, 날씨, 지도, 폰트 모두 금지). 150 KB 이하로 만듭니다.
- 오프셋이나 서머타임 규칙을 하드코딩하지 않습니다. 모두 `Intl`에서 얻습니다.
- 국기 이미지, 실제 회사·서비스 로고, 지도 타일을 쓰지 않습니다. 도시 이름과 이모지 ☀️🌙만 씁니다.
- 기존 세계 시계·회의 플래너 사이트의 레이아웃이나 문구를 따라 하지 않습니다.
- 국가 분쟁 지역이나 정치적 판단이 필요한 이름은 쓰지 않습니다. 목록은 위 표로 고정합니다.
- 공휴일·영업일 정보는 넣지 않습니다. 이 화면에서 데이터를 확인할 방법이 없습니다.
- alert, confirm, prompt, window.open, 페이지 이동을 쓰지 않습니다. 소리를 넣지 않습니다.
- 입력한 검색어를 저장하거나 외부로 보내지 않습니다.
