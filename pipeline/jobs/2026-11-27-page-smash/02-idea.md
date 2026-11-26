# Idea and spec: 웹페이지 부수기 / Page Smash

## Concepts scored

점수는 1–5점입니다. 기준은 첫 10초 재미, 독창성, 한국 검색·공유 수요, HTML 한 파일 구현 난이도입니다. 만점은 20점입니다.

| Concept | Category | Score | Verdict |
|---|---|---|---|
| **웹페이지 부수기 / Page Smash**: 쇠공 캐릭터를 새총으로 쏴 가짜 웹페이지를 박살 냅니다 | **games** | **5/4/4/4 = 17** | **선택.** 해외에서 "웹사이트 부수기" 포맷이 퍼진 적이 있습니다. 외부 사이트 대신 내장 가짜 페이지 4개를 레벨로 씁니다. 스트레스 해소용이고 결과 % 공유가 쉽습니다. 기존 항목과 소재가 겹치지 않습니다(`popup-pileup`은 팝업을 닫는 게임입니다) |
| 스노우볼 흔들기 / Snow Globe Shaker: 기기 흔들기나 드래그로 눈을 날리고 가라앉는 걸 봅니다 | cool | 4/3/3/5 = 15 | 만들기 쉽지만 차별점이 약합니다. 눈 소재 항목도 이미 많습니다 |
| 산타 민원 접수처 / Santa's Complaint Desk: 엉뚱한 선물 민원에 도장을 찍어 처리합니다 | weird | 4/4/3/4 = 15 | 크리스마스 시즌 직전에 쓰기 좋아서 다음 회차로 미룹니다 |

## Meta

- slug `page-smash`, category `games`, kind `game`, aspect `9/16`, date `2026-11-27`
- tags: ko `웹사이트 부수기`, `스트레스 해소 게임`; en `destroy website`, `stress relief`
- title: ko `웹페이지 부수기`; en `Page Smash`
- desc ko: 쇠공 '꽝이'를 새총으로 날려 가짜 웹페이지를 산산조각 내세요. 빵집 홈페이지부터 약관 47개 가입 폼까지, 몇 % 부쉈는지 자랑해 보세요.
- desc en: Fling Bonky the iron ball and smash fake web pages to bits: a bakery site, a sign-up form with 47 terms, a cart. How much can you wreck?
- howto ko: 화면을 누른 채 뒤로 당겼다 놓으면 꽝이가 날아가요. 세게 부딪힐수록 더 많이 부서져요. 페이지마다 6발이 있고, 4페이지를 다 부수면 끝이에요. 키보드는 ←→ 조준, ↑↓ 힘 조절, Space 발사입니다.
- howto en: Press, pull back and release to fling Bonky. Harder hits break more. You get 6 shots per page and 4 pages in total. Keyboard: ←→ aim, ↑↓ power, Space to launch.
- about ko: 모든 페이지는 이 게임을 위해 지어낸 가짜예요. 실제 사이트는 하나도 다치지 않아요. 스트레스 받는 폼이 있다면 여기서 푸세요.
- about en: Every page here is made up for this game, and no real website gets hurt. Got a form that stresses you out? Take it out here.

## Pitch

화면에는 간단한 가짜 브라우저 창이 있습니다. 안에는 동네 빵집 홈페이지 같은 웹페이지가 실제처럼 그려져 있습니다(헤더, 메뉴 버튼, 이미지, 문단, 주문 버튼, 푸터).

1. 화면 아래 발사대에 목도리를 두른 둥근 쇠공 '꽝이'가 있습니다. 당겼다 놓으면 날아갑니다.
2. 꽝이는 중력을 받으며 페이지 요소에 튕깁니다. 세게 부딪히면 요소에 금이 가고, 더 맞으면 파편과 글자 조각이 쏟아지며 부서집니다.
3. 한 발에 여러 개를 부수면 콤보가 붙습니다. 페이지당 6발로 최대한 많이 부숩니다(면적 기준 %).
4. 4페이지를 마치면 총점, 최고 점수, 페이지별 별을 보여 줍니다.

## Flow

1. **START**
   - 가짜 브라우저 창 안에 제목 "웹페이지 부수기", 한 줄 설명, 꽝이 그림이 있습니다.
   - 큰 "눌러서 시작" 버튼과 오른쪽 위 음소거 토글(🔊/🔇)이 있습니다.
   - 아래에 최고 점수를 작게 표시합니다.
   - 배경의 가짜 페이지가 0.6초마다 살짝 흔들립니다(유혹 연출).
2. **PAGE INTRO** (페이지당 1.2초, 탭하면 건너뜀)
   - 카드에 "1/4 · 하루빵집 홈페이지"를 띄우고 페이지가 아래에서 미끄러져 올라옵니다.
3. **PLAY**
   - 상단 크롬(HUD)에 표시합니다.
     - 주소창 자리: "🔒 {페이지 이름} (가짜 페이지)"
     - 오른쪽: 파괴율 "37%"
     - 남은 발: 작은 공 아이콘 6개
   - 발사대에서 쏘고, 공이 멈추거나 화면 밖으로 나가면 다음 발입니다.
   - 6발을 다 쓰거나 100%를 채우면 PAGE CLEAR로 갑니다.
4. **PAGE CLEAR**
   - 파괴율, 별(★ 50% / ★★ 75% / ★★★ 100%), 페이지 점수가 차례로 튀어나옵니다.
   - "다음 페이지" 버튼이 있습니다.
   - 100%면 "완전 철거!" 도장이 찍히고 남은 발 보너스가 붙습니다.
5. **GAME OVER** (4페이지 후)
   - 총점, 최고 점수(갱신하면 "신기록!" 반짝임), 페이지별 별 4줄이 나옵니다.
   - 한 줄 칭호를 보여 주고 큰 "다시 부수기" 버튼을 둡니다.
   - 다시 하면 상태를 완전히 리셋합니다(페이지 1, 요소 HP, 점수, 파티클, 콤보).

## Controls

- **Pointer (터치/마우스):**
  - 캔버스 아무 곳이나 누르고 드래그합니다. 당긴 방향의 반대로 발사됩니다.
  - 당기는 동안 조준 점선(앞으로 0.35초 분량의 궤적)과 힘 게이지가 보입니다.
  - 놓으면 발사하고, 드래그 길이가 20 논리 단위 미만이면 취소합니다.
  - `setPointerCapture`를 사용하고, 캔버스에 `touch-action:none`을 줍니다.
- **Keys:**
  - ←/→: 조준 각도 ±3°/프레임 반복 (범위 −170°~−10°, 위쪽 반원)
  - ↑/↓: 힘 ±2%
  - Space/Enter: 발사
  - Enter: START·PAGE CLEAR·GAME OVER에서 진행
  - R: GAME OVER에서 재시작
  - M: 음소거
  - 게임 키는 모두 `preventDefault`합니다.
- 공이 날아가는 중에는 입력을 무시합니다. 다만 탭하면 2배속 빨리감기가 되고, 다음 발에서 해제됩니다.
- 모든 버튼은 최소 48 px입니다.

## World and physics

- **좌표계:** 논리 캔버스 360×700입니다. scale = min(W/360, H/700)로 가운데 정렬하고, 남는 여백은 배경색으로 채웁니다.
  - 크롬(HUD): y 0–44
  - 페이지 영역: y 44–596 (페이지 내부 좌표는 0–552)
  - 발사대: y 596–700
- **DPR:** devicePixelRatio를 최대 2로 제한합니다. 리사이즈하면 scale만 다시 계산하고, 논리 상태는 그대로 둡니다.
- **꽝이:**
  - 반지름 14, 대기 위치 (180, 660)
  - 짙은 회색 원에 하이라이트를 넣고, 눈 두 개와 빨간 목도리 꼬리를 그립니다. 속도에 따라 납작해지는 squash 연출을 넣습니다.
- **발사:**
  - 속도 = 방향 × (min(드래그 길이, 160) / 160) × 1500 u/s
  - 최소 힘은 15%입니다.
- **움직임:**
  - 중력 1400 u/s²
  - 좌·우·위 벽(페이지 영역 경계)에서 반사하고, 반발 계수는 0.7입니다.
  - 아래에는 바닥이 없습니다. y > 720이면 그 발은 끝납니다.
- **충돌:** 원과 AABB 충돌입니다.
  - 서브스텝으로 한 스텝 이동량을 반지름의 절반 이하로 유지해 터널링을 막습니다.
  - 겹치면 최소 침투 축으로 밀어냅니다.
- **데미지:** 충돌 법선 속도를 vn이라 합니다.
  - vn < 120이면 데미지 0이고, 튕기기만 합니다.
  - 그 외에는 데미지 = max(1, floor(vn / 350))입니다.
  - 데미지 ≥ 남은 HP면 요소가 부서집니다. 이때 반사 없이 통과하고 속도는 ×0.7이 됩니다.
  - 그렇지 않으면 HP가 줄고, 금이 간 선이 1개 추가됩니다(최대 3개). 반사(반발 0.55, 접선 ×0.9)합니다.
- **요소 HP:** text 1, input 2, button 2, cell 2, image 3, header 4, footer 4
- **발 종료:** 화면 밖으로 나가거나, 속도 < 30이 0.5초 이어지거나, 발사 후 6초가 지나면 끝납니다. 꽝이는 대기 위치로 0.3초 동안 통통 튀며 복귀합니다.
- **dt:** 최대 50 ms로 자릅니다. `document.hidden`이면 루프를 정지합니다.

## Scoring

- 파괴율 = 부서진 요소 면적 합 / 전체 요소 면적 합입니다. HUD에는 정수 %로 표시합니다.
- 페이지 점수 = round(파괴율 × 1000)입니다. 여기에 다음을 더합니다.
  - 콤보 보너스: 한 발 안에서 k번째로 부순 요소(k ≥ 2)마다 +20 × (k−1)
  - 100%를 달성하면 남은 발 × 150
- 총점은 4페이지 점수의 합이고, `psm:best`와 비교합니다.
- **콤보 연출:** 한 발에 2개 이상 부수면 공 근처에 "콤보 x{k}!" 텍스트가 0.6초 동안 떠오릅니다.
- **GAME OVER 칭호** (총 별 개수 s, 최대 12):

| s | ko | en |
|---|---|---|
| 0–3 | 살살 두드리는 손님 | Gentle Tapper |
| 4–7 | 동네 리모델링 기사 | Neighborhood Remodeler |
| 8–11 | 웹페이지 철거 반장 | Page Demolition Chief |
| 12 | 전설의 완전 철거왕 | Legendary Total Wrecker |

## Pages

좌표는 페이지 내부 기준 (x, y, w, h)입니다. 모든 텍스트는 lang에 맞는 사전에서 가져옵니다. 요소 렌더링은 다음과 같습니다.

- header: 페이지 메인색 바에 흰 굵은 글씨
- text: #23262d 글씨, 문단은 14 px
- button: 메인색 둥근 사각형(r 8)에 흰 글씨
- input: 흰 바탕에 #c8ccd4 테두리, placeholder는 회색
- image: 연한 메인색 바탕에 큰 이모지를 가운데에
- cell: 연회색 테두리 칸
- footer: #e9ebef 바에 회색 작은 글씨

### Page 1 · 하루빵집 / Haru Bakery (메인색 #f4a259)

| type | rect | ko | en |
|---|---|---|---|
| header | 0,0,360,48 | 🥐 하루빵집 | 🥐 Haru Bakery |
| button ×3 | 12,58,104,32 / 128,58,104,32 / 244,58,104,32 | 메뉴 / 오시는 길 / 예약 | Menu / Directions / Book |
| image | 20,104,320,140 | 🍞 | 🍞 |
| text | 20,256,320,30 (20 px 굵게) | 오늘 갓 구운 소금빵 | Fresh salt bread today |
| text ×4 | 20,294,300,16 / 20,316,310,16 / 20,338,280,16 / 20,360,200,16 | 매일 아침 7시에 문을 엽니다 / 버터 향이 골목까지 퍼져요 / 소금빵은 오후 2시면 품절 / 주차는 조금 어려워요 | We open at 7 every morning / You can smell butter down the street / Salt bread sells out by 2 pm / Parking is a little tricky |
| button | 100,388,160,44 | 주문하기 | Order now |
| image ×2 | 20,444,150,70 / 190,444,150,70 | 🥐 / 🧁 | 🥐 / 🧁 |
| footer | 0,524,360,28 | footer 문자열 | footer string |

### Page 2 · 회원가입 / Sign Up (메인색 #4c7cf0)

| type | rect | ko | en |
|---|---|---|---|
| header | 0,0,360,48 | 가입하기 | Sign Up |
| text | 20,62,320,30 (20 px 굵게) | 3초 만에 가입하세요 | Sign up in 3 seconds |
| text | 20,106,140,16 | 아이디 | Username |
| input | 20,126,320,40 | 영문 4자 이상 | 4+ letters |
| text | 20,178,140,16 | 비밀번호 | Password |
| input | 20,198,320,40 | 특수문자 2개, 이모지 1개 포함 | 2 symbols and 1 emoji |
| text | 20,250,160,16 | 비밀번호 확인 | Confirm password |
| input | 20,270,320,40 | 한 번 더, 정확하게 | Once more, exactly |
| text | 20,324,320,20 | ☐ 약관 47개에 모두 동의합니다 | ☐ I agree to all 47 terms |
| button | 20,360,320,48 | 가입 완료 | Finish sign-up |
| text | 50,422,260,16 | 이미 계정이 있나요? 로그인 | Have an account? Log in |
| image | 80,448,200,64 | 🤖 저는 로봇이 아닙니다 (작은 글씨 포함) | 🤖 I am not a robot |
| footer | 0,524,360,28 | footer 문자열 | footer string |

### Page 3 · 우리아파트 게시판 / Our Building Board (메인색 #3aa76d)

| type | rect | ko | en |
|---|---|---|---|
| header | 0,0,360,48 | 📢 우리아파트 게시판 | 📢 Our Building Board |
| text | 20,60,320,30 (20 px 굵게) | 연말 대청소 안내 | Year-End Cleaning Notice |
| text | 20,94,240,14 (회색 12 px) | 작성일 12.01 · 조회 1,204 | Posted 12.01 · 1,204 views |
| image | 20,116,320,110 | 🧹🪣 | 🧹🪣 |
| text ×6 | x 20, w 300–320, h 16, y 238/260/282/304/326/348 | 12월 둘째 주 토요일에 대청소를 합니다 / 복도에 둔 짐은 미리 치워 주세요 / 자전거는 지하 보관소로 옮겨 주세요 / 물청소로 바닥이 미끄러워요 / 엘리베이터는 오전에 점검합니다 / 협조해 주셔서 감사합니다 | Big cleaning on the 2nd Saturday of December / Please clear your hallway items first / Move bikes to the basement rack / Floors will be slippery from washing / Elevator check in the morning / Thank you for your help |
| cell ×6 | 3행 × 2열: x 20/180, w 160, h 28, y 374/402/430 | 구역 / 시간 / 복도 / 오전 9시 / 주차장 / 오후 2시 | Area / Time / Hallway / 9 am / Parking / 2 pm |
| button | 110,470,140,40 | 확인했어요 | Got it |
| footer | 0,524,360,28 | footer 문자열 | footer string |

### Page 4 · 장바구니 / My Cart (메인색 #8e5cf0)

| type | rect | ko | en |
|---|---|---|---|
| header | 0,0,360,48 | 🛒 장바구니 (3) | 🛒 My Cart (3) |
| 상품 행 ×3, y = 60 / 140 / 220 | image 20,y,64,64 · text 96,y+6,170,18 · text 96,y+34,120,16 · button 276,y+18,64,32 | 🧤 털장갑, ₩12,900 / 🧦 양말 3켤레, ₩9,500 / 🍊 귤 한 상자, ₩16,000 · 버튼 "삭제" | 🧤 Wool gloves, ₩12,900 / 🧦 Socks ×3, ₩9,500 / 🍊 Box of tangerines, ₩16,000 · button "Remove" |
| text | 20,304,320,24 (18 px 굵게) | 합계 ₩38,400 | Total ₩38,400 |
| input | 20,340,220,40 | 쿠폰 코드 | Coupon code |
| button | 252,340,88,40 | 적용 | Apply |
| button | 20,396,320,52 | 결제하기 | Check out |
| image | 20,460,320,56 | 🎁 오늘만 무료배송! | 🎁 Free shipping today! |
| footer | 0,524,360,28 | footer 문자열 | footer string |

페이지 순서는 1→2→3→4로 고정합니다. 텍스트가 칸보다 길면 `measureText`로 글자 크기를 줄여 맞춥니다(최소 11 px).

## Breaking and juice

- **금:**
  - HP가 줄 때마다 충돌 지점에서 시작하는 지그재그 선(#23262d, 50% 알파)을 추가합니다.
  - 요소를 3 px, 0.1초 흔듭니다.
- **파괴:**
  - 요소 사각형을 3×2 또는 4×2 조각으로 나눕니다(w > 150이면 4열).
  - 각 조각은 요소 색과 원래 그림 일부(clip)를 가진 파티클이 됩니다.
  - 파티클은 회전하며 중력으로 떨어지고 1.5초 뒤 사라집니다.
  - 텍스트 요소는 글자 단위로 쪼개 따로 튀어나가게 합니다(최대 12자, 나머지는 사각 조각).
- **화면 흔들림:** 파괴할 때 진폭 = min(8, 2 + HP×1.5) px, 0.15초입니다.
- **팝 텍스트:** 파괴 지점에 "+{면적 기반 점수}"가 노란색으로 0.5초 동안 떠오릅니다.
- **잔해:** 부서진 자리에는 연한 점선 윤곽만 남겨 무엇이 있었는지 보이게 합니다.
- **파티클 상한:** 300개입니다. 넘으면 오래된 것부터 지웁니다.
- **PAGE CLEAR:** 별이 0.25초 간격으로 scale 2 → 1 팝합니다. 100%면 빨간 "완전 철거!" 도장을 −8° 회전으로 쾅 찍습니다.
- **prefers-reduced-motion:** 화면 흔들림과 도장 애니메이션을 끄고 파티클을 1/3로 줄입니다. 조준 점선은 유지합니다.

## Visual design

- **팔레트:**
  - 배경 그라데이션 #1d2433 → #2a3550
  - 브라우저 크롬 #e9ebef, 페이지 바탕 #ffffff, 잉크 #23262d, 강조 노랑 #ffd166, 도장 빨강 #e0453d
- **크롬:** 왼쪽에 빨강·노랑·초록 점 3개, 가운데에 주소창 모양 둥근 바(가짜 페이지 이름 텍스트), 오른쪽에 파괴율과 남은 발이 있습니다.
- **발사대:** 어두운 바탕에 Y자 새총을 선으로 그립니다. 당기면 고무줄이 늘어납니다.
- **폰트:** system-ui 스택만 사용합니다.
- **화면별:**
  - START, PAGE CLEAR, GAME OVER는 반투명 어두운 오버레이 위의 흰 카드(최대 너비 320 논리 단위)로 그립니다. 큰 버튼은 노랑 바탕에 잉크 글씨입니다.
  - 320 px 폭에서도 논리 좌표가 축소되므로 글자가 11 px 미만으로 작아지면 HUD는 파괴율과 남은 발만 남깁니다.

## Sound (Web Audio, 첫 제스처 이후)

- 발사: 0.12초 노이즈 스윕(밴드패스 800 → 2000 Hz), gain 0.05
- 튕김: 60 ms 사인 220 Hz, 감쇠, gain 0.06
- 파괴: 0.18초 노이즈 버스트(로우패스 1500 Hz)와 80 Hz 쿵, gain 0.12. HP가 높을수록 피치를 낮춥니다.
- 콤보: 콤보 단계마다 반음씩 올라가는 짧은 삑(30 ms)
- 도장: 90 Hz 사인 80 ms
- 기본값은 켜짐입니다. AudioContext는 첫 pointerdown이나 keydown에서 생성하고, 자동 재생은 하지 않습니다.
- M 키나 🔊 버튼으로 끄고 켜며, 설정은 저장합니다.

## Strings

| key | ko | en |
|---|---|---|
| appTitle | 웹페이지 부수기 | Page Smash |
| startSub | 당겼다 놓으면 꽝! 가짜 웹페이지를 박살 내세요 | Pull back, let go, smash! Wreck some fake web pages. |
| startBtn | 눌러서 시작 | Tap to start |
| bestLabel | 최고 점수 {n} | Best {n} |
| pageOf | {i}/4 · {name} | {i}/4 · {name} |
| pageName1–4 | 하루빵집 홈페이지 / 회원가입 폼 / 아파트 게시판 / 장바구니 | Haru Bakery site / Sign-up form / Building board / Shopping cart |
| addr | 🔒 {name} (가짜 페이지) | 🔒 {name} (fake page) |
| shotsLeft | 남은 발 | Shots |
| aimHint | 누르고 뒤로 당겨서 조준 | Press and pull back to aim |
| combo | 콤보 x{k}! | Combo x{k}! |
| clearTitle | 페이지 정리 완료 | Page done |
| destroyed | 파괴율 {p}% | Destroyed {p}% |
| pageScore | 페이지 점수 {n} | Page score {n} |
| bonus | 남은 발 보너스 +{n} | Unused shots +{n} |
| wrecked | 완전 철거! | Totally wrecked! |
| nextBtn | 다음 페이지 | Next page |
| overTitle | 철거 끝! | Demolition done! |
| total | 총점 {n} | Total {n} |
| newBest | 신기록! | New best! |
| retry | 다시 부수기 | Smash again |
| soundOn / soundOff | 소리 켜기 / 소리 끄기 | Sound on / Sound off |
| footer | 하루한판이 만든 가짜 페이지 · 실제 사이트가 아니에요 | Fake page by Daily Toybox · not a real site |
| title tiers | 칭호 표 참고 | see the title table |
| page element strings | Pages 표 참고 | see the Pages tables |

## localStorage (try/catch, prefix `psm:`)

- `psm:best`: 최고 총점 (정수)
- `psm:stars`: 페이지별 최고 별 JSON 배열 `[0-3, 0-3, 0-3, 0-3]`. GAME OVER의 이전 기록 비교에 씁니다.
- `psm:sound`: "1" 또는 "0", 기본값 "1"

저장이 막혀 있어도 게임은 정상 동작해야 합니다. 이때는 메모리에만 기록합니다.

## Edge cases

- 공이 요소 안에 끼면 최소 침투 축으로 밀어냅니다. 같은 요소와 연속으로 충돌하면 50 ms 쿨다운을 둡니다(HP가 한 프레임에 여러 번 깎이지 않게).
- 공이 벽과 요소 사이에서 진동하면 6초 타임아웃으로 그 발을 끝냅니다.
- 발사 중에 리사이즈되면 논리 좌표라서 그대로 이어집니다. 화면 scale만 바꿉니다.
- 탭 전환(`document.hidden`)이면 루프와 오디오를 정지하고, 복귀 후 첫 dt는 0으로 둡니다.
- 드래그 중 포인터가 캔버스를 벗어나도 pointer capture로 계속 추적합니다. `pointercancel`이면 조준을 취소합니다.
- 멀티터치: 첫 포인터만 사용하고 나머지는 무시합니다.
- 6발을 쓰기 전에 100%가 되면 공이 멈출 때까지 기다리지 않고 0.5초 뒤 PAGE CLEAR로 갑니다.
- 마지막 발이 끝날 때 아직 날아가는 파티클은 그대로 두고, 0.6초 뒤 PAGE CLEAR로 갑니다.
- 다시 하기는 모든 페이지 요소를 원본 정의에서 새로 복제합니다. 정의 객체 자체를 변경하지 않습니다.
- `location.hash === '#demo'`면 QA 썸네일용으로 페이지 1에서 시작합니다.
  - nav 버튼 2개, 문단 2줄, 이미지 카드 1개를 미리 부숴 둡니다.
  - 금 간 요소 2개와 파티클 일부를 표시하고, 조준 점선을 −60°, 힘 70%로 띄운 PLAY 상태로 멈춰 둡니다.

## Must not

- 네트워크 일절 금지. 외부 폰트, 이미지, URL 입력, iframe도 금지합니다. 실제 웹사이트를 불러오거나 부수는 기능은 없습니다.
- "Destroy Any Website"를 비롯한 기존 게임의 이름, 스틱맨 캐릭터, 무기 구성, 화면 모양을 따라 하지 않습니다. 플레이어는 원작 캐릭터 꽝이(쇠공)이고 메커닉은 새총 물리입니다.
- 실제 브랜드, 포털, 쇼핑몰, SNS, 공공기관 사이트를 닮은 페이지는 금지합니다(로고, 색 조합, 레이아웃 모방 포함). 가짜 주소에도 실제 도메인 형식(`.com`, `.kr` 등)을 쓰지 않습니다.
- 사람, 동물, 특정 집단을 공격하는 연출은 금지합니다. 부서지는 건 페이지 요소뿐이고 피나 폭력 묘사는 없습니다.
- 게임 아트에 래스터 이미지나 비디오를 쓰지 않습니다. canvas, SVG, 이모지만 사용합니다.
- alert, confirm, prompt, window.open, 페이지 이동, 소리 자동 재생을 모두 금지합니다.
- 페이지 스크롤과 줌 금지. 캔버스에 `touch-action:none`을 줍니다.
