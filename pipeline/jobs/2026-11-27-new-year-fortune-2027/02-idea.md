# Idea and spec: 2027 정미년 띠별 신년운세 / 2027 New Year Fortune by Zodiac

## 후보 콘셉트 점수

점수는 1–5점이고, 순서대로 첫 10초 안의 가치, 독창성, 한국 검색·공유 수요, HTML 한 파일 제작 난이도입니다. 만점은 20점입니다.

| 콘셉트 | 카테고리 | 점수 | 판정 |
|---|---|---|---|
| 가짜 홈페이지 철거반: 내장된 가짜 사이트 5개를 망치로 부수는 게임 | games | 4/2/3/3 = 12 | 보류. 기존 바이럴 게임의 핵심 정체성("사이트 부수기")과 너무 가깝고, 원조 유행도 4~8주 범위 밖입니다 |
| 새해 다짐 뽑기: 버튼을 누르면 2027 다짐 카드가 하나 나옴 | random | 4/2/3/5 = 14 | 보류. 차별점이 약하고 여운이 짧습니다. 신년운세 결과 안의 한 줄로도 충분합니다 |
| **2027 정미년 띠별 신년운세** | **fortune** | **5/3/5/5 = 18** | **선택**. 12월부터 "2027 신년운세", "띠별 운세" 검색이 확실하게 오릅니다. 생년 하나만 넣으면 결과 카드가 바로 나오고, 띠별 순위로 친구·가족끼리 비교하며 공유하게 됩니다 |

중복 점검:
- `hoppang-fortune`: 매일 바뀌는 오늘의 운세라서 주제가 다릅니다.
- `trend-lifespan-fortune`: 유행의 수명을 점치는 아이템입니다.
- `year-end-receipt`: 운세는 영수증 끝에 붙은 한 줄뿐이고, 주제는 한 해 결산입니다.
- `sheep-roundup-2027`: 양을 모는 게임이고, 운세 기능은 없습니다.
- `first-sunrise-2027`(대기 중): 해돋이가 주제입니다.

이 아이템의 주제 명사는 "띠별 신년운세"이고, 위 항목과 대기 중인 스펙 어디에도 없습니다.

## Meta

- slug `new-year-fortune-2027`, category `fortune`, kind `tool`, aspect `9/16`, date `2026-11-27`
- tags: ko `2027신년운세`, `띠별운세`, `정미년`; en `new-year-fortune`, `chinese-zodiac`, `year-of-the-sheep`
- title: ko `2027 정미년 띠별 신년운세`; en `2027 New Year Fortune by Zodiac`
- desc ko: 태어난 해를 넣으면 2027 정미년 띠별 신년운세가 카드로 나와요. 총운 점수, 달마다 한 줄 운세, 행운의 색과 물건까지 이미지로 저장해 공유하세요.
- desc en: Enter your birth year for a playful 2027 Year of the Sheep fortune card: an overall score, a line for every month and lucky picks. Save it as an image.
- howto ko: 태어난 해를 고르고(−/+ 버튼이나 방향키), 1~2월 설 전에 태어났다면 체크하세요. '운세 보기'를 누르면 카드가 나와요. '띠별 순위'에서 12띠를 비교하고, '이미지 저장'이나 '텍스트 복사'로 공유하세요. 같은 해, 같은 이름이면 늘 같은 운세가 나와요.
- howto en: Pick your birth year (−/+ buttons or arrow keys) and tick the box if you were born in January or February before Lunar New Year. Tap "See my fortune" to get your card. Compare all 12 signs in "Zodiac ranking", then save it as an image or copy the text. The same year and name always give the same fortune.
- about ko: 모든 운세는 재미로 만든 글이에요. 실제 사주나 토정비결 풀이가 아니에요. 입력한 이름과 생년은 이 기기 밖으로 나가지 않아요. 2027년은 정미년, 붉은 양의 해입니다.
- about en: Every fortune here is written for fun. It is not a real astrology reading. Your name and birth year never leave this device. 2027 is the Jeongmi year, the year of the red sheep.

## Pitch

배경은 새해 첫날 아침입니다. 진한 남색 하늘에 해가 떠오르는 붉은 띠가 깔리고, 작은 양털 구름이 천천히 흘러갑니다.

1. 사용자가 생년을 고릅니다. 1~2월생이라면 체크박스로 설 전 출생 여부를 표시하고, 닉네임은 넣어도 되고 안 넣어도 됩니다.
2. 12띠 동물 타일이 원형으로 돌다가 내 띠에서 멈추며 크게 튀어나옵니다(약 1.2초).
3. 운세 카드가 펼쳐집니다. 들어가는 내용은 다음과 같습니다.
   - 띠 인사
   - 총운 점수(/100)와 헤드라인
   - 4개 분야 별점
   - 1~12월 한 줄 운세
   - 행운의 색·물건·숫자·요일
   - 띠 동갑 연도
   - 양의 해 한마디
4. '띠별 순위'에서 12띠 순위표를 보고 우리 띠가 몇 등인지 확인합니다. 가족 단톡방에 공유하기 좋은 지점입니다.
5. 카드는 PNG로 저장하거나 텍스트로 복사할 수 있습니다.

결과는 생년, 설 전 체크, 이름에서만 결정됩니다. 그래서 같은 입력이면 늘 같은 카드가 나오고, 친구끼리 비교할 수 있습니다.

## Flow

1. **START**
   - 🐑 일러스트(CSS와 이모지), 큰 제목, 한 줄 부제가 보입니다.
   - 생년 선택기가 있습니다. 구성은 [−] 숫자 [+]이고, 숫자 칸은 `<input type="number" inputmode="numeric" min="1920" max="2026">`입니다.
   - 생년 옆에 띠가 실시간으로 표시됩니다. 예: "1991년생 · 양띠 🐑"
   - 체크박스 "1~2월 설날 전에 태어났어요"가 있습니다. 체크하면 띠 계산에 쓰는 연도에서 1을 뺍니다. 체크박스 아래에 작은 회색 도움말이 붙습니다.
   - 닉네임 칸(선택, 최대 8자)이 있습니다.
   - 빨간 기본 버튼 '운세 보기'가 있습니다.
   - 오른쪽 위에 음소거 토글이 있습니다.
   - 하단 각주: "재미로 보는 운세예요"
   - 생년 기본값은 저장된 값이고, 없으면 1995입니다.
2. **REVEAL** (약 1.2초)
   - 12띠 이모지 타일이 원형으로 배치되고, 하이라이트가 빠르게 돌다가 점점 느려져 내 띠에서 멈춥니다. 감속은 easeOutCubic입니다.
   - 멈춘 타일은 1 → 1.6배로 커지며 팝 효과를 내고, 파티클 12개가 튑니다.
   - 탭하거나 아무 키나 누르면 바로 건너뜁니다.
3. **RESULT**
   - 카드 패널은 내부에서만 스크롤됩니다. 페이지는 스크롤되지 않습니다.
   - 하단에 고정 바를 둡니다: [이미지 저장] [텍스트 복사] [띠별 순위] [다시 하기]
   - 320px 폭에서는 2×2 배치로 바뀝니다.
   - 총운 점수는 0에서 최종값까지 0.8초 동안 카운트업합니다.
   - 도장 "2027 정미년"은 마지막에 찍힙니다. 2.2 → 1배로 줄어들고 −8° 기울어지며, 120ms 동안 4px 흔들립니다.
4. **RANK** (오버레이 패널)
   - 12띠를 기본 점수 순서로 보여 줍니다. 각 줄은 순위, 이모지, 띠 이름, 점수 막대, 한 줄 별칭으로 구성됩니다.
   - 내 띠 줄은 강조하고, 패널이 열릴 때 그 줄로 스크롤합니다.
   - 닫기 버튼(✕)과 Esc로 닫습니다.
   - 순위표 하단 문구: "순위는 재미로! 모든 띠에 좋은 달이 있어요"

## Controls

- **Pointer:** 모든 요소를 탭하거나 클릭해서 씁니다. 결과 카드와 순위 패널은 드래그나 휠로 스크롤합니다.
- **START 키:**
  - ArrowUp/ArrowRight는 +1년, ArrowDown/ArrowLeft는 −1년입니다.
  - Shift와 함께 누르면 ±10년, PageUp/PageDown도 ±10년입니다.
  - B는 설 전 체크를 토글하고, Enter는 시작합니다.
  - 닉네임 칸에 포커스가 있을 때는 방향키와 B를 가로채지 않습니다. Enter만 시작으로 씁니다.
- **REVEAL:** 아무 키나 탭으로 건너뜁니다.
- **RESULT 키:** S 저장, C 복사, L 순위 열기, R 다시 하기, 방향키와 Page 키로 스크롤.
- **RANK 키:** Esc 또는 L로 닫습니다.
- **공통:** M은 소리를 토글합니다.
- **터치와 레이아웃:**
  - 버튼은 44px 이상, −/+ 버튼은 56px 정사각형입니다.
  - 배경 캔버스는 `touch-action:none`, 카드와 순위 패널은 `touch-action:pan-y`입니다.
  - −/+ 버튼을 길게 누르면 400ms 뒤부터 80ms 간격으로 반복합니다.

## 계산

- **입력 검증:** 숫자가 아니거나 범위 밖이면 1920–2026으로 clamp합니다. 빈 칸이면 마지막 유효값을 씁니다.
- **띠 계산:**
  - `ey = year − (beforeSeollal ? 1 : 0)`
  - `zi = ((ey − 4) % 12 + 12) % 12`
  - 순서는 쥐, 소, 호랑이, 토끼, 용, 뱀, 말, 양, 원숭이, 닭, 개, 돼지입니다.
- **Seed:**
  - FNV-1a 32-bit로 `"2027|" + ey + "|" + name.trim()` 문자열을 해시합니다.
  - PRNG는 mulberry32(seed)입니다.
  - 표시는 원래 생년(`year`)으로 하지만, 운세는 `ey` 기준입니다.
- **뽑는 순서** (고정):
  1. 총운 지터: 정수 −5..+5
  2. 4개 분야 별점: 각 1..5
  3. 월 운세: 24개 풀을 Fisher-Yates로 섞어 앞에서 12개
  4. 행운의 색: 8개 중 하나
  5. 행운의 물건: 12개 중 하나
  6. 행운의 숫자: 1..9
  7. 행운의 요일: 7개 중 하나
  8. 양의 해 한마디: 8개 중 하나
  9. 카드 번호: 4자리
- **총운:** `total = clamp(BASE[zi] + jitter, 70, 99)`
- **별점 보정:** 4개 분야 중 최댓값이 4 미만이면, 가장 높은 분야(동점이면 앞쪽)를 4로 올립니다. 1점은 최대 1개만 허용하고, 2개 이상이면 뒤쪽 1점을 2로 올립니다.
- **띠 동갑:** `ey`와 같은 띠인 연도 중 `ey` 앞뒤로 2개씩, 1920–2026 범위 안에서 보여 줍니다. 예: 1979 · 1991(나) · 2003 · 2015

### 띠 표 (BASE, 순위 별칭)

| zi | ko | en | emoji | BASE | 별칭 ko | 별칭 en |
|---|---|---|---|---|---|---|
| 0 | 쥐 | Rat | 🐭 | 83 | 기회 포착의 달인 | Spotter of chances |
| 1 | 소 | Ox | 🐮 | 80 | 묵묵히 쌓는 저력 | Quiet, steady power |
| 2 | 호랑이 | Tiger | 🐯 | 87 | 용기 충전 완료 | Fully charged courage |
| 3 | 토끼 | Rabbit | 🐰 | 91 | 양과 찰떡궁합 | Best friends with the sheep |
| 4 | 용 | Dragon | 🐲 | 85 | 큰 그림 그리는 해 | A big-picture year |
| 5 | 뱀 | Snake | 🐍 | 81 | 조용한 반전 | A quiet plot twist |
| 6 | 말 | Horse | 🐴 | 89 | 달리면 길이 열림 | Run and the road opens |
| 7 | 양 | Sheep | 🐑 | 88 | 올해의 주인공 | Star of the year |
| 8 | 원숭이 | Monkey | 🐵 | 84 | 재치로 푸는 해 | Wit solves it all |
| 9 | 닭 | Rooster | 🐔 | 86 | 부지런함이 빛남 | Hard work shines |
| 10 | 개 | Dog | 🐶 | 82 | 의리가 복을 부름 | Loyalty brings luck |
| 11 | 돼지 | Pig | 🐷 | 90 | 넉넉함이 굴러옴 | Plenty rolls in |

### 띠 인사 (결과 카드 첫 줄)

| zi | ko | en |
|---|---|---|
| 0 | 작은 틈에서 큰 기회를 찾는 쥐띠, 양의 해엔 눈치가 곧 행운이에요. | Rat, you find big chances in small gaps. In the sheep year, good timing is luck. |
| 1 | 꾸준한 소띠, 2027년엔 쌓아 둔 노력이 하나씩 열매를 맺어요. | Steady Ox, in 2027 the effort you stored up starts to bear fruit. |
| 2 | 용감한 호랑이띠, 순한 양의 해엔 부드러운 한마디가 더 세요. | Brave Tiger, in the gentle sheep year a soft word hits harder. |
| 3 | 토끼띠는 양과 손발이 척척! 함께하면 일이 술술 풀려요. | Rabbit and Sheep work hand in hand. Team up and things flow. |
| 4 | 꿈이 큰 용띠, 올해는 그 꿈의 첫 계단을 놓는 해예요. | Dreamer Dragon, this is the year you lay the first step of the dream. |
| 5 | 생각 깊은 뱀띠, 조용히 준비한 일이 하반기에 빛나요. | Thoughtful Snake, what you quietly prepare shines in the second half. |
| 6 | 달리는 말띠, 양과 나란히 걸으면 멀리 가요. | Running Horse, walk side by side with the sheep and you go far. |
| 7 | 양띠의 해가 왔어요! 주인공답게 천천히, 당당하게. | It's your year, Sheep! Take it slow and proud, like a star. |
| 8 | 재치 만점 원숭이띠, 막히는 일도 아이디어 하나로 풀려요. | Clever Monkey, one idea unties every knot this year. |
| 9 | 부지런한 닭띠, 이른 아침의 결심이 한 해를 바꿔요. | Hard-working Rooster, an early-morning decision changes the year. |
| 10 | 의리 있는 개띠, 오래된 인연이 좋은 소식을 물어 와요. | Loyal Dog, an old friendship fetches good news. |
| 11 | 넉넉한 돼지띠, 나눈 만큼 더 크게 돌아오는 해예요. | Generous Pig, what you share comes back bigger. |

### 총운 헤드라인 (total 기준)

| total | ko | en |
|---|---|---|
| ≥ 94 | 대길! 양털처럼 포근하게 술술 풀리는 해 | Great luck! A year as soft and smooth as wool |
| ≥ 90 | 길! 작은 행운이 줄줄이 따라오는 해 | Good luck! Small wins line up one after another |
| ≥ 85 | 순풍! 방향만 잘 잡으면 쭉 가는 해 | Fair wind! Set your course and sail on |
| ≥ 80 | 차근차근! 천천히 갈수록 멀리 가는 해 | Step by step! The slower you go, the farther you get |
| < 80 | 숨은 저력! 하반기에 크게 웃는 해 | Hidden power! The big smile comes later in the year |

### 분야 별점 문구

분야는 4개입니다. 별 1–2개는 low, 3개는 mid, 4–5개는 high 문구를 씁니다.

| 분야 ko / en | low ko | low en | mid ko | mid en | high ko | high en |
|---|---|---|---|---|---|---|
| 일·공부운 / Work & study | 서두르지 말고 한 가지씩. 마무리가 곧 실력이에요. | One thing at a time. Finishing is the real skill. | 꾸준히 하면 연말에 깜짝 성과가 있어요. | Keep going and a surprise result shows up by December. | 손대는 일마다 칭찬이 따라와요. | Praise follows everything you touch. |
| 지갑운 / Wallet | 충동구매만 조심하면 무난해요. | Watch the impulse buys and you'll be fine. | 새는 돈을 막으면 쏠쏠하게 남아요. | Plug the small leaks and a nice sum stays. | 뜻밖의 작은 횡재수가 보여요. | A small, unexpected windfall is in sight. |
| 사람운 / People | 먼저 안부 한 줄이 관계를 살려요. | A quick "how are you" first keeps bonds alive. | 편한 사람과의 시간이 힘이 돼요. | Time with easy-going people recharges you. | 귀인이 먼저 손을 내밀어요. | A helpful person reaches out to you first. |
| 쉼운 / Rest | 쉬는 것도 일정에 꼭 넣으세요. | Put rest on the calendar too. | 주말 낮잠이 최고의 보약이에요. | A weekend nap is your best tonic. | 마음 편한 여행이 기다려요. | A carefree trip is waiting for you. |

### 월 운세 풀 (24개, 12개 뽑아 1~12월에 순서대로 배치)

| # | ko | en |
|---|---|---|
| 1 | 새로 산 다이어리가 끝까지 채워지는 달 | The new planner actually gets filled this month |
| 2 | 미뤄 둔 연락 하나가 반가운 답으로 돌아와요 | One message you put off gets a happy reply |
| 3 | 따뜻한 국물 한 그릇이 행운을 데려와요 | A warm bowl of soup brings luck along |
| 4 | 길을 잘못 들었는데 더 좋은 곳에 도착해요 | A wrong turn takes you somewhere better |
| 5 | 칭찬 한마디를 들을 일이 생겨요 | Someone gives you a compliment you'll remember |
| 6 | 정리한 서랍에서 잊었던 보물이 나와요 | A tidy drawer reveals a forgotten treasure |
| 7 | 새 취미 하나가 일상에 활기를 줘요 | A new hobby puts a spring in your step |
| 8 | 오랜만의 친구와 웃다가 배가 아파요 | You laugh with an old friend until it hurts |
| 9 | 작은 도전이 큰 자신감이 돼요 | A small challenge becomes big confidence |
| 10 | 일찍 잔 날 다음 날이 유난히 잘 풀려요 | The day after an early night goes unusually well |
| 11 | 고민하던 선택, 마음 가는 쪽이 정답이에요 | That choice you're stuck on: follow your heart |
| 12 | 동네 산책길에서 기분 좋은 발견을 해요 | A walk around the block brings a happy find |
| 13 | 계획보다 여유를 챙기면 운이 붙어요 | Leave some slack in the plan and luck sticks |
| 14 | 누군가에게 건넨 친절이 두 배로 돌아와요 | A kindness you give comes back twice |
| 15 | 배우고 싶던 걸 시작하기 딱 좋은 달 | The perfect month to start learning that thing |
| 16 | 사진첩에 남기고 싶은 하루가 생겨요 | A day worth keeping in the photo album |
| 17 | 바쁜 와중에도 숨 고를 틈이 보여요 | Even when busy, you find room to breathe |
| 18 | 기다리던 소식이 생각보다 빨리 와요 | The news you're waiting for comes early |
| 19 | 맛집 운 상승! 고른 메뉴가 다 맛있어요 | Food luck rising: everything you order is good |
| 20 | 오래 쓴 물건과 이별하면 새 운이 들어와요 | Let go of something worn-out and new luck moves in |
| 21 | 팀으로 하는 일이 혼자보다 잘 풀려요 | Teamwork beats going solo this month |
| 22 | 별일 없는 평온함이 가장 큰 선물이에요 | A quiet, uneventful month is the best gift |
| 23 | 생각만 하던 일을 드디어 해내요 | You finally do the thing you only thought about |
| 24 | 한 해를 웃으며 돌아볼 이유가 생겨요 | You find a reason to look back on the year with a smile |

월 이름: ko `{n}월`, en `Jan`…`Dec`

### 행운 항목

- **색 (8개):**

  | ko | en | 견본 |
  |---|---|---|
  | 정미 레드 | Jeongmi red | #e0453d |
  | 양털 크림 | Wool cream | #f4ead5 |
  | 귤빛 주황 | Tangerine | #f39a2b |
  | 새벽 남색 | Dawn navy | #2a3550 |
  | 솔잎 초록 | Pine green | #3f8f5a |
  | 눈꽃 하늘 | Snow sky | #9fd3ef |
  | 호박 노랑 | Pumpkin yellow | #f2c94c |
  | 라벤더 | Lavender | #b9a3e3 |

- **물건 (12개):**

  | ko | en |
  |---|---|
  | 털장갑 | Wool mittens |
  | 머그컵 | A mug |
  | 손편지 | A handwritten note |
  | 귤 | A tangerine |
  | 작은 화분 | A small plant |
  | 새 양말 | New socks |
  | 볼펜 | A ballpoint pen |
  | 손수건 | A handkerchief |
  | 우산 | An umbrella |
  | 책갈피 | A bookmark |
  | 목도리 | A scarf |
  | 열쇠고리 | A keychain |

- **숫자:** 1–9
- **요일:** 월요일…일요일 / Monday…Sunday

### 양의 해 한마디 (8개)

| ko | en |
|---|---|
| 양처럼 순하게, 하지만 고집 있게 나아가세요. | Be gentle like a sheep, but stubborn about your goals. |
| 양 한 마리, 양 두 마리… 2027년엔 꿀잠 자는 해. | Count sheep, count sheep… 2027 is a year of good sleep. |
| 무리 속에서도 나만의 털색을 지키세요. | Keep your own wool color, even in the flock. |
| 천천히 풀을 뜯어도 결국 언덕 위에 닿아요. | Graze slowly and you still reach the top of the hill. |
| 포근한 양털처럼 주변을 따뜻하게 하는 한 해. | A year of warming others, like soft wool. |
| 붉은 양의 기운으로 마음에 불씨 하나 켜세요. | Light one small fire in your heart with red-sheep energy. |
| 길을 잃어도 괜찮아요. 양은 늘 무리를 찾아요. | It's fine to get lost. Sheep always find the flock. |
| 올해의 털은 내년의 따뜻함이 됩니다. | This year's wool becomes next year's warmth. |

## 카드 레이아웃

카드는 논리 폭 360px 캔버스이고, 위에서 아래로 그립니다. 같은 그리기 함수를 화면 표시와 저장에 함께 씁니다.

1. **헤더**
   - 붉은 띠 배너에 "2027 정미년 신년운세 / 2027 Year of the Sheep Fortune"을 넣습니다.
   - 그 아래 "{name}님 · {year}년생 {띠}띠 {emoji}" / "{name} · Born {year} · {Sign} {emoji}"
   - 설 전 체크 시: "({year}년 설 전 출생 → {ey}년 띠)" / "(Born before Lunar New Year → {ey} sign)"
2. **큰 이모지와 띠 인사**: 이모지는 72px이고, 띠 인사는 줄바꿈합니다.
3. **총운**
   - 원형 게이지에 "{total}점"을 표시합니다. 게이지 색은 정미 레드입니다.
   - 아래에 헤드라인과 "12띠 중 {rank}위"를 넣습니다.
4. **분야 4개**: 2×2 그리드입니다. 각 칸에 분야명, ★☆ 5칸, 문구를 넣습니다.
5. **월별 운세**: 12줄입니다. 왼쪽은 월 배지, 오른쪽은 한 줄 운세입니다. 별점 4개를 합해 가장 높은 달을 하나 정하지 않고, 월 칸만 번갈아 연한 크림색으로 칠합니다.
6. **행운 박스**: 색 견본 원, 물건, 숫자, 요일을 넣습니다.
7. **띠 동갑**: "띠 동갑: 1979 · 1991 · 2003" 형식이고, 내 해는 굵게 표시합니다.
8. **양의 해 한마디**: 따옴표 박스 안에 넣습니다.
9. **도장**: 빨간 이중 테두리 원을 −8° 기울여 "2027 丁未"를 넣습니다. 카드 오른쪽 위에 겹쳐 그립니다.
10. **푸터**
    - "No. {4자리}"
    - "※ 재미로 보는 운세예요 / * Just for fun"
    - "play.mesisi.net"

줄바꿈은 한국어는 글자 단위, 영어는 단어 단위로 하고 `measureText`를 씁니다. 글꼴은 system-ui이고, 숫자에는 `ui-monospace`를 씁니다.

## Visual design

- **팔레트:**
  - 하늘: #1d2433 → #2a3550 그라디언트이고, 하단 20%에는 #e0453d → #f39a2b 일출 띠를 30% 알파로 깝니다.
  - 카드 #fbfaf5, 잉크 #23262d, 회색 #8a8f98, 강조 #e0453d, 크림 #f4ead5
- **배경:**
  - 캔버스에 양털 구름 약 8개가 천천히 흘러갑니다. 구름은 원 3–4개를 합친 모양에 흰색 85% 알파입니다.
  - 작은 별 40개가 반짝입니다.
  - DPR은 최대 2이고, 숨김 상태에서는 멈춥니다.
- **START:** 가운데 정렬 컬럼이고, 최대 폭은 min(92vw, 440px)입니다. 생년 숫자는 40px 굵게, 띠 표시는 18px 크림색입니다.
- **REVEAL:** 타일 지름은 min(18vw, 64px)이고, 원의 반지름은 min(36vw, 150px)입니다.
- **RESULT:** 카드 그림자는 0 10px 30px rgba(0,0,0,.35)입니다.
- **RANK:** 반투명 남색 오버레이 위에 흰 패널을 띄웁니다. 막대 길이는 (BASE−75)/20에 비례하고, 내 띠 줄은 크림 배경에 빨간 테두리입니다.
- **작은 화면:** 320px에서는 좌우 패딩 16px, 분야 그리드는 1열입니다.
- **넓은 화면:** 컬럼은 최대 480px이고, 배경은 창 전체를 덮습니다.
- **prefers-reduced-motion:** REVEAL은 건너뛰고 바로 결과를 보여 줍니다. 카운트업, 도장, 흔들림 효과를 끄고, 구름은 정지하며 별은 반짝이지 않습니다.

## Sound (기본 꺼짐)

- **회전 틱:** 하이라이트가 이동할 때마다 20ms, 약 1.5kHz, gain 0.03.
- **팝:** 멈출 때 120ms 사인파, 440 → 880Hz 상승, gain 0.08.
- **도장:** 80ms, 90Hz 사인파 감쇠, gain 0.12.
- 첫 사용자 제스처 이후에만 AudioContext를 만들고, 음소거 설정은 저장합니다.

## Export and copy

- **이미지 저장:**
  - 750px 폭(배율 750/360) 오프스크린 캔버스에 전체 카드 높이로 그립니다.
  - 배경 #1d2433, 패딩 40px, 오른쪽 아래에 "play.mesisi.net" 12px 회색 워터마크를 넣습니다.
  - `toBlob` 후 `<a download="new-year-fortune-2027.png">`를 클릭하고, 1초 뒤 URL을 revoke합니다.
  - 실패하면 토스트를 띄웁니다.
- **텍스트 복사:**
  - `navigator.clipboard.writeText`를 쓰고, 실패하면 숨긴 textarea와 `execCommand('copy')`로 대체합니다.
  - 성공과 실패 모두 토스트로 알립니다.
- **공유 텍스트:**
  - ko: `🐑 2027 정미년 신년운세 / {name}님 ({year}년생 {띠}띠 {emoji}) / 총운 {total}점 · 12띠 중 {rank}위 / {headline} / 행운의 색: {color} / {sheepLine} / play.mesisi.net`
  - en: `🐑 2027 Year of the Sheep Fortune / {name} (born {year}, {Sign} {emoji}) / Overall {total} · #{rank} of 12 signs / {headline} / Lucky color: {color} / {sheepLine} / play.mesisi.net`

## Strings

| key | ko | en |
|---|---|---|
| appTitle | 2027 정미년 띠별 신년운세 | 2027 New Year Fortune by Zodiac |
| startSub | 태어난 해만 넣으면 새해 운세 카드가 나와요 | Enter your birth year and get your New Year fortune card |
| yearLabel | 태어난 해 | Birth year |
| yearSign | {year}년생 · {띠}띠 {emoji} | Born {year} · {Sign} {emoji} |
| beforeSeollal | 1~2월 설날 전에 태어났어요 | Born in Jan/Feb before Lunar New Year |
| beforeHelp | 설 전에 태어났다면 띠는 전년도 띠예요 | If so, your sign is from the year before |
| namePh | 이름 또는 닉네임 (선택) | Name or nickname (optional) |
| startBtn | 운세 보기 | See my fortune |
| foot | 재미로 보는 운세예요 | Just for fun |
| revealing | 내 띠를 찾는 중… | Finding your sign… |
| skip | 탭해서 건너뛰기 | Tap to skip |
| cardHead | 2027 정미년 신년운세 | 2027 Year of the Sheep Fortune |
| nameLine | {name}님 · {year}년생 {띠}띠 {emoji} | {name} · Born {year} · {Sign} {emoji} |
| shiftedNote | ({year}년 설 전 출생 → {ey}년 띠) | (Born before Lunar New Year → {ey} sign) |
| overall | 총운 | Overall luck |
| points | {n}점 | {n} |
| rankLine | 12띠 중 {rank}위 | #{rank} of 12 signs |
| monthly | 달마다 한 줄 | A line for every month |
| lucky | 행운 아이템 | Lucky picks |
| luckyColor / luckyItem / luckyNum / luckyDay | 행운의 색 / 행운의 물건 / 행운의 숫자 / 행운의 요일 | Lucky color / Lucky item / Lucky number / Lucky day |
| peers | 띠 동갑 | Same-sign years |
| sheepWord | 양의 해 한마디 | A word from the sheep |
| cardNo | No. {n} | No. {n} |
| note | ※ 재미로 보는 운세예요 | * Just for fun |
| save / copy / rank / again | 이미지 저장 / 텍스트 복사 / 띠별 순위 / 다시 하기 | Save image / Copy text / Zodiac ranking / Start over |
| saved / saveFail | 이미지를 저장했어요 / 저장에 실패했어요. 화면을 캡처해 주세요 | Image saved / Could not save. Please take a screenshot. |
| copied / copyFail | 복사했어요 / 복사하지 못했어요 | Copied / Could not copy |
| rankTitle | 2027 띠별 총운 순위 | 2027 Zodiac Luck Ranking |
| rankMine | 내 띠 | My sign |
| rankFoot | 순위는 재미로! 모든 띠에 좋은 달이 있어요 | Rankings are for fun. Every sign has good months. |
| close | 닫기 | Close |
| soundOn / soundOff | 소리 켜기 / 소리 끄기 | Sound on / Sound off |
| guest | 손님 | Guest |
| yearRange | 1920~2026년 사이로 골라 주세요 | Pick a year between 1920 and 2026 |
| minus / plus (aria) | 한 해 빼기 / 한 해 더하기 | One year earlier / One year later |

띠 이름, 인사, 별칭, 헤드라인, 분야 문구, 월 운세, 행운 항목, 양의 해 한마디는 위의 표를 그대로 씁니다.

## localStorage (try/catch, prefix `nyf:`)

- `nyf:year`: 마지막 생년 (문자열 숫자)
- `nyf:before`: "1" 또는 "0"
- `nyf:name`: 마지막 닉네임
- `nyf:sound`: "1" 또는 "0", 기본 "0"
- `nyf:count`: 카드를 본 횟수 (UI에는 표시하지 않음)

## Edge cases

- **생년 입력 오류:** 범위 밖 생년은 blur 또는 Enter 시점에 clamp하고, 입력 칸 아래에 `yearRange` 문구를 1.5초 동안 보여 줍니다. 입력 중간값(예: "19")에는 띠 표시를 갱신하지 않습니다.
- **설 전 체크 경계:** 1920년생이 체크하면 `ey`는 1919가 됩니다. 계산은 그대로 하고 표시만 원래 생년으로 합니다.
- **2026년생:** 그대로 허용합니다(말띠 아기의 운세).
- **이름:** 앞뒤 공백을 제거하고 최대 8자입니다. 이모지는 code point 기준으로 자릅니다. 빈 이름은 `손님` / `Guest`로 표시하지만, seed에는 빈 문자열을 씁니다. 그래서 이름 없이 같은 해를 넣으면 늘 같은 카드가 나옵니다.
- **REVEAL 중 입력:** 탭 한 번은 건너뛰기만 하고, 그 탭이 결과 버튼에 전달되지 않게 300ms 동안 입력을 무시합니다.
- **리사이즈:** 리사이즈 시 카드를 상태에서 다시 그립니다. 카운트업이나 도장 애니메이션을 다시 시작하지 않습니다.
- **숨김 상태:** `document.hidden`이면 rAF를 멈추고, 복귀 시 delta를 50ms로 제한합니다.
- **다시 하기:** START로 돌아갑니다. 생년, 체크, 이름, 소리 설정은 유지합니다.
- **순위 패널:** RESULT에서만 열립니다. 순위는 BASE 고정이고, 개인 total과 무관하게 12띠 순위표가 늘 같습니다. 카드의 "{rank}위"도 BASE 순위입니다. total은 개인별로 ±5 차이가 나므로 순위표 점수 막대 옆에는 BASE 값만 표시합니다.
- **저장 공간:** localStorage가 막혀도 모든 기능이 동작합니다.
- **QA 썸네일:** `location.hash === '#demo'`이면 year 1991, 체크 해제, 이름 빈 칸으로 즉시 RESULT를 그립니다. 애니메이션은 없습니다.
- **언어:** `?lang` 값이 없으면 `navigator.language`가 ko로 시작할 때 ko, 아니면 en입니다. `<html lang>`을 맞춥니다.

## Must not

- 네트워크 사용 금지, 150KB 이하.
- 실제 사주·토정비결·역술 사이트의 문구, 레이아웃, 용어 체계(괘 번호, 144괘 등)를 흉내 내지 않습니다. "토정비결"이라는 단어도 제목과 본문에 쓰지 않습니다.
- 건강, 질병, 사고, 이별, 죽음, 재물 손실 같은 불길한 예언을 하지 않습니다. 가장 낮은 결과도 긍정 문구여야 합니다.
- 투자, 복권, 도박, 금전 조언을 하지 않습니다. 지갑운은 생활 소비 수준의 가벼운 농담만 씁니다.
- 특정 띠·나이·세대·성별을 깎아내리는 문구를 쓰지 않습니다. 순위 꼴찌도 "저력"으로 표현합니다.
- 실제 인물, 연예인, 브랜드, 상표를 쓰지 않습니다. 기존 캐릭터와 닮은 양 디자인도 금지합니다.
- "정확한", "적중", "과학적" 같은 신뢰를 주장하는 표현을 쓰지 않습니다.
- 생년과 이름 외의 개인정보(생일, 시간, 성별)는 받지 않습니다.
- alert, confirm, prompt, window.open, 페이지 이동을 쓰지 않습니다. 소리를 자동 재생하지 않습니다.
