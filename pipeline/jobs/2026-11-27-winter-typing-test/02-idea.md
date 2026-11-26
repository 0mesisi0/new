# Idea and spec: 1분 타자 속도 측정 · 겨울 문장 편 / One-Minute Typing Test: Winter Lines

Agent: Claude (opus), planner. 디자인 노트(팔레트, 레이아웃, 모션)는 본문에 합쳐 두었습니다.

## Concepts scored

점수는 1–5점이고 항목은 첫 10초 재미, 독창성, 한국 검색·공유 수요, 한 HTML 파일 구현성 순서입니다. 만점은 20점입니다.

리서치에서 나온 세 방향은 모두 이미 큐에 같은 소재가 있습니다. 페이지 파괴는 `page-smash`, 정미년 운세는 `new-year-fortune-2027`, 연말정산 카드 공제는 `card-deduction-calculator-2026`입니다. 곶감도 `persimmon-breeze` 계열과 소재가 겹칩니다. 그래서 겹치지 않는 새 소재로 세 개를 골랐습니다.

| Concept | Category | Score | Verdict |
|---|---|---|---|
| **1분 타자 속도 측정 · 겨울 문장 편** | **learn** | **5/3/5/5 = 18** | **Picked**: "타자 연습", "타자 속도 측정"은 늘 검색되는 키워드입니다. 수능이 끝난 학생, 연말 보고서를 쓰는 직장인, 겨울방학 아이까지 쓸 수 있습니다. 결과 숫자는 친구끼리 비교하기 좋습니다. |
| 눈썰매 언덕 내려가기 (탭으로 점프하며 장애물 피하기) | games | 4/3/3/4 = 14 | games는 이미 포화 상태입니다. 실제로 첫눈이 오는 주에 다시 꺼냅니다. |
| 압축 실험실: 내 문장은 몇 바이트로 줄어들까 (RLE·허프만 시각화) | tech | 3/5/2/4 = 14 | 독창적이지만 검색 수요가 약합니다. tech가 비어 있는 주에 씁니다. |

## Meta

- slug `winter-typing-test`, category `learn`, kind `game`, aspect `9/16`, date `2026-11-27`
- tags: ko `타자연습`, `타자속도`; en `typing-test`, `wpm`
- title: ko `1분 타자 속도 측정 · 겨울 문장 편`; en `One-Minute Typing Test: Winter Lines`
- desc ko: 60초 동안 겨울 문장을 따라 치면 내 한글 타수와 정확도가 나와요. 독수리 타법부터 키보드 위의 번개까지, 칭호를 받고 친구와 겨뤄 보세요.
- desc en: Type cozy winter lines for 60 seconds and get your WPM and accuracy, plus a silly typing title to compare with friends.
- howto ko: '시작'을 누르고 위에 나온 문장을 그대로 입력하세요. 첫 글자를 치는 순간 60초 타이머가 돌아요. 다 맞게 치면 다음 문장으로 넘어가고, Enter를 누르면 틀린 채로도 넘어가요. 붙여넣기는 막혀 있어요.
- howto en: Tap Start and type the sentence shown. The 60-second timer starts on your first keystroke. A perfect line advances by itself, and Enter skips ahead with any mistakes counted. Pasting is disabled.
- about ko: 한글 타수는 자모를 누른 횟수로 셉니다. ㅘ·ㅢ 같은 겹모음과 ㄺ·ㅄ 같은 겹받침은 2타로, ㄲ·ㅆ 같은 쌍자음은 1타로 칩니다. 셈법이 사이트마다 조금씩 달라서 다른 타자 연습과 숫자가 약간 다를 수 있어요. 입력한 글자는 기기 밖으로 나가지 않아요.
- about en: WPM counts every 5 correct characters as one word. Korean mode counts jamo keystrokes (타수), so numbers differ slightly from other typing sites. Nothing you type leaves this device.

## Pitch

- 눈 내리는 밤 책상 위에 큼직한 문장 카드와 입력칸이 있습니다.
- 글자를 칠 때마다 입력칸 위로 작은 키캡이 톡 튀어 오르고, 그 키캡에는 방금 친 자모나 글자가 찍혀 있습니다.
- 문장을 다 맞히면 카드가 초록빛으로 번쩍이며 넘어가고 "+42타"가 떠오릅니다.
- 60초가 지나면 큰 숫자가 카운트업되고, 칭호 도장이 쿵 찍힙니다.
- ko 모드는 한글 문장과 타수(분당 타수)를, en 모드는 영어 문장과 WPM을 씁니다. 각 모드에 문장 풀이 따로 있습니다.

## Flow

1. **START**
   - 🎹❄️ 아이콘, 제목, 한 줄 부제, 큰 "시작" 버튼이 있습니다.
   - 아래에 "최고 기록 {best}타"가 나옵니다. 기록이 없으면 숨깁니다.
   - ko 모드에서는 "한/영 키로 한글 입력을 켜 주세요"라는 작은 힌트를 보여 줍니다.
   - 시작 버튼 핸들러 안에서 바로 `input.focus()`를 호출해야 iOS에서 키보드가 열립니다.
2. **READY**
   - PLAY와 화면은 같습니다. 타이머는 "60"에 멈춰 있고 카드 위에 "첫 글자를 치면 시작돼요"가 깜빡입니다.
   - 첫 `input` 이벤트가 들어오면 PLAY로 넘어가고, 그때부터 `performance.now()` 기준으로 시간을 잽니다.
3. **PLAY (60 s)**
   - 상단 바: 원형 타이머(남은 초), 실시간 타수, 음소거 버튼이 있습니다.
   - 문장 카드:
     - 현재 문장을 22 px bold로 보여 주고 글자마다 상태 색을 입힙니다.
     - 그 아래에 다음 문장을 14 px, 40% 불투명도로 미리 보여 줍니다.
   - 입력칸은 카드 바로 아래에 둡니다. 높이 56 px, 20 px 글꼴입니다.
   - 문장을 정확히 일치시키면 조합이 끝난 상태에서만 자동으로 넘어갑니다. 아래 "판정" 절의 규칙을 따릅니다.
   - Enter를 누르면 지금 입력한 그대로 제출하고 넘어갑니다. 빈 입력에서 누른 Enter는 무시합니다.
   - 남은 시간이 10초 이하가 되면 타이머가 빨간색으로 바뀌고, 1초마다 scale 1→1.08 펄스가 들어갑니다.
4. **RESULT**
   - 시간이 0이 되면 입력칸을 `disabled` 처리하고 `blur()`해서 키보드를 닫습니다.
   - 큰 숫자 "{cpm}타"(en은 "{wpm} WPM")가 0.8초 동안 카운트업됩니다.
   - 그 아래에 정확도 %, 완료한 문장 수, 최고 기록을 보여 줍니다. 신기록이면 "NEW!" 배지를 붙입니다.
   - 칭호 도장이 마지막에 찍힙니다. scale 2.2→1, 회전 −8°, 4 px 흔들림 120 ms입니다.
   - 버튼은 [다시 하기]와 [결과 복사] 두 개입니다.
5. **PAUSED**
   - PLAY 중에 `document.hidden`이 되면 타이머를 멈추고 이 오버레이를 띄웁니다.
   - 문구는 "잠깐 멈췄어요 · 탭해서 계속"입니다.
   - 탭하거나 아무 키나 누르면 입력칸에 다시 포커스를 주고 이어서 진행합니다.

## Controls

- **Pointer:** 모든 버튼은 탭 한 번으로 동작합니다. PLAY 중에 카드를 탭하면 입력칸에 포커스가 갑니다.
- **START:** Enter나 Space를 누르면 시작합니다. M은 음소거를 토글합니다.
- **PLAY:**
  - 입력은 입력칸으로만 받습니다.
  - Enter는 제출하고 넘어갑니다. 이때 `preventDefault`를 호출합니다.
  - Esc는 기록을 저장하지 않고 START로 돌아갑니다.
  - PLAY 중에는 M 같은 단축키를 쓰지 않습니다. 글자 입력과 충돌하기 때문입니다.
- **RESULT:** R이나 Enter는 다시 하기, C는 결과 복사, M은 음소거입니다.
- **입력칸 속성:** `autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" enterkeyhint="next"`
- **붙여넣기 차단:** `paste`, `drop` 이벤트와 `beforeinput`의 `insertFromPaste`/`insertFromDrop`을 `preventDefault`로 막고 토스트 "붙여넣기는 안 돼요"를 띄웁니다.
- **터치 영역:** 버튼은 최소 44 px입니다. 배경 캔버스에는 `touch-action:none`을 줍니다. 입력칸은 기본값을 유지해야 IME가 정상 동작합니다.

## 판정 (Judging)

- **정규화:** 입력값과 목표 문장 모두 `normalize('NFC')`를 거칩니다. 둥근 따옴표 `’‘`는 `'`로, `“”`는 `"`로 바꾸고, 줄바꿈은 제거합니다.
- **글자별 상태:** 입력의 i번째 글자를 목표의 i번째 글자와 비교합니다.
  - 같으면 `ok`이고 잉크색으로 표시합니다.
  - 다르면 `bad`이고 빨간 글자에 빨간 밑줄을 긋습니다.
  - 입력의 **마지막 글자**는 예외로 `pending`(회색)이 될 수 있습니다. 조건은 마지막 글자의 자모열이 `jamo(target[i]) + jamo(target[i+1])`의 접두사인 경우입니다. 이렇게 하면 조합 중인 글자를 오타로 칠하지 않습니다.
  - 예: 목표가 "가나"일 때 IME가 잠깐 "간"을 보여 주는 경우도 pending으로 처리합니다.
- **커서 위치:** 목표에서 아직 치지 않은 글자는 연회색으로 두고, 현재 위치에 2 px 밑줄 커서를 그립니다.
- **자동 진행:** 정규화한 입력이 목표와 완전히 같고 조합 중이 아니면 자동으로 넘어갑니다. 조합 여부는 `compositionstart`/`compositionend` 플래그와 `InputEvent.isComposing`으로 판단합니다. 안드로이드는 compositionend가 늦게 오기도 하므로, 일치 상태가 250 ms 동안 유지돼도 넘어갑니다.
- **Enter 제출:** 길이를 맞춰 비교합니다. 남는 글자와 모자란 글자는 모두 오타로 칩니다.
- **잘못된 입력 언어 감지:** ko 모드에서 목표 글자는 한글인데 입력의 처음 3글자 중 2개 이상이 라틴 문자이면 토스트 "한/영 키를 눌러 한글로 바꿔 주세요"를 띄웁니다. 문장마다 최대 1회입니다. en 모드는 반대로 처리합니다.

## 점수 계산

- 각 문장을 제출할 때 다음 값을 누적합니다.
  - `okStrokes` = `ok`인 글자들의 타수 합
  - `okChars` = `ok`인 글자 수
  - `totalChars` = max(입력 길이, 목표 길이)
- 시간이 끝나면 진행 중이던 문장도 같은 방식으로 합산합니다. 단, 마지막 글자가 `pending`이면 셈에서 뺍니다.
- **한글 글자 하나의 타수:** c = code − 0xAC00일 때 L = ⌊c/588⌋, V = ⌊(c%588)/28⌋, T = c%28입니다.
  - 타수 = 1 + (V ∈ {9,10,11,14,15,16,19} ? 2 : 1) + (T = 0 ? 0 : T ∈ {3,5,6,9,10,11,12,13,14,15,18} ? 2 : 1)
  - 쌍자음 초성과 ㄲ·ㅆ 받침은 1타로 칩니다.
  - 그 밖의 글자(공백, 문장부호, 라틴 문자, 낱자모)는 1타입니다.
- **결과 지표:**
  - ko: `cpm = round(okStrokes × 60 / elapsedSec)`
  - en: `wpm = round((okChars / 5) × 60 / elapsedSec)`
  - `accuracy = totalChars ? round(100 × okChars / totalChars) : 0`
- elapsedSec는 실제로 흐른 시간이고 일시정지 구간은 뺍니다. 정상 종료라면 60입니다.
- 실시간 타수는 0.25초마다 갱신합니다. elapsedSec가 3초 미만이면 "—"로 표시합니다.

## 칭호 (Title tiers)

| ko 타수 | en WPM | ko | en | emoji |
|---|---|---|---|---|
| < 100 | < 20 | 독수리 타법 수련생 | Hunt-and-Peck Trainee | 🦅 |
| < 200 | < 35 | 느긋한 거북이 손 | Leisurely Turtle Hands | 🐢 |
| < 300 | < 50 | 성실한 직장인 손가락 | Steady Office Fingers | ⌨️ |
| < 450 | < 70 | 회의록 담당자 | Meeting Notes Hero | 📝 |
| ≥ 450 | ≥ 70 | 키보드 위의 번개 | Lightning on the Keys | ⚡ |

- 보너스 배지: 정확도 100%이고 완료한 문장이 1개 이상이면 도장 옆에 "오타 제로 장인 ✨ / Zero-Typo Artisan ✨"를 붙입니다.
- 0점 처리: okChars가 0이면 칭호 대신 "키보드가 아직 겨울잠 중 💤 / Your keyboard is still hibernating 💤"를 보여 주고, 최고 기록은 갱신하지 않습니다.

## 문장 풀

- 모두 직접 쓴 문장이고 가사, 명언, 브랜드는 쓰지 않습니다.
- 한 판을 시작할 때 `Math.random`으로 셔플하고 겹치지 않게 순서대로 꺼냅니다. 20개를 다 쓰면 다시 셔플합니다.

ko:
1. 첫눈이 오면 창문을 열고 손을 내밀어 봐요
2. 따뜻한 국물 한 숟가락에 하루가 녹아내린다
3. 귤 까먹다 보니 벌써 열두 시가 넘었네
4. 장갑 한 짝은 오늘도 어디론가 떠났다
5. 버스 창가에 앉아 입김으로 하트를 그렸다
6. 올해 못다 한 일은 내년의 나에게 맡기자
7. 퇴근길 붕어빵 봉투가 손난로보다 따뜻하다
8. 이불 밖은 위험하지만 출근은 해야 한다
9. 목도리를 두 번 감았더니 코까지 따뜻해
10. 달력 마지막 장이 생각보다 얇아 보인다
11. 눈사람 코에 당근 대신 귤을 꽂아 주었다
12. 고양이가 키보드 위에서 낮잠을 자고 있다
13. 오늘의 목표는 칼퇴, 내일의 목표도 칼퇴
14. 핫초코 위에 마시멜로를 세 개나 띄웠다
15. 겨울밤 라디오에서 좋아하는 노래가 나왔다
16. 새해에는 물을 많이 마시고 일찍 자야지
17. 꽁꽁 언 손으로 휴대폰 잠금을 풀었다
18. 빙판길에서는 펭귄처럼 종종걸음으로 걷자
19. 창밖에 흩날리는 눈송이를 하나둘 세어 본다
20. 한 해 동안 수고한 나에게 박수를 보낸다

en:
1. The first snow always falls when nobody is looking.
2. A warm bowl of soup can fix almost any Monday.
3. I peeled one more tangerine and lost track of time.
4. One glove went missing again, never to return.
5. I drew a tiny heart on the foggy bus window.
6. Whatever I did not finish this year belongs to next year.
7. The blanket says stay, but the alarm says go.
8. Two loops of scarf and even my nose feels warm.
9. The last page of the calendar looks thinner than ever.
10. Our snowman wears a tangerine for a nose.
11. The cat is napping right on top of my keyboard.
12. Today's goal is leaving on time, and tomorrow's too.
13. Three marshmallows are floating on my hot cocoa.
14. My favorite song came on the late night radio.
15. Next year I will drink more water and sleep earlier.
16. Frozen fingers somehow still unlocked my phone.
17. On icy sidewalks, walk like a careful penguin.
18. I counted snowflakes drifting past the window.
19. Give yourself a round of applause for this year.
20. Hot steam rises from the street food cart outside.

## Visual design

- **Palette:**
  - 배경은 #1b2540에서 #2c3a5e로 가는 세로 그라디언트(눈 오는 밤)입니다.
  - 카드는 #fbfaf5, 잉크는 #23262d, 미입력 글자는 #b8bcc4, pending은 #8a8f98입니다.
  - ok 플래시는 #3fbf7f, 오타는 #e0453d, 강조 노랑은 #ffd166입니다.
- **배경 캔버스:**
  - 눈송이 50개가 사인 곡선으로 흔들리며 내립니다.
  - DPR은 최대 2이고, delta는 최대 50 ms로 자릅니다.
  - `document.hidden`일 때 멈춥니다.
- **키캡 파티클:**
  - `input` 이벤트마다 입력칸 위쪽에서 둥근 사각형 키캡이 생깁니다. 크기는 28 px이고 방금 추가된 글자나 자모가 찍혀 있습니다.
  - 키캡은 위로 30–50 px 튀고 450 ms 동안 페이드아웃됩니다.
  - 화면에는 최대 24개까지만 둡니다.
  - 지운 입력에서는 키캡을 만들지 않습니다.
- **오타 피드백:** 새로 `bad`가 된 글자가 생기면 카드가 3 px로 80 ms 흔들립니다. 같은 글자에는 반복하지 않습니다.
- **문장 완료:**
  - 카드 테두리가 초록으로 200 ms 번쩍입니다.
  - "+{strokes}타 / +{chars}"가 카드 위로 떠오르며 사라집니다.
  - 다음 문장은 아래에서 슬라이드업으로 들어옵니다(160 ms).
- **원형 타이머:** 지름 56 px의 SVG 원입니다. 남은 비율만큼 노랑 호를 그리고, 10초 이하가 되면 빨강으로 바꿉니다.
- **레이아웃:**
  - 세로 배치이고 최대 폭 480 px로 가운데 정렬합니다.
  - 카드와 입력칸은 **화면 위쪽**에 둡니다. 모바일 소프트 키보드가 화면 아래 절반을 가리기 때문입니다.
  - `visualViewport` 크기가 바뀌면 높이를 다시 계산해서 카드, 입력칸, 타이머가 늘 보이게 합니다. 페이지는 절대 스크롤되지 않습니다.
- **320 px 폭:** 좌우 패딩은 14 px입니다. 문장 글꼴은 `clamp(17px, 5.4vw, 22px)`이고, 긴 문장은 두 줄로 줄바꿈합니다. 두 언어 모두 `word-break: keep-all`을 씁니다.
- **글꼴:** system-ui 스택을 씁니다. 숫자에는 `font-variant-numeric: tabular-nums`를 적용합니다.
- **prefers-reduced-motion:** 키캡 파티클, 흔들림, 도장 애니메이션, 카운트업을 끕니다. 눈송이는 15개만, 느리게 내립니다.

## Sound (기본 꺼짐)

- 키 소리: `input`마다 18 ms 노이즈 버스트를 냅니다. 대역통과 2.2 kHz, gain 0.03이고 피치에 ±8% 랜덤을 줍니다.
- 문장 완료: 사인파 880 Hz→1320 Hz 두 음을 각 70 ms씩, gain 0.06으로 냅니다.
- 오타: 140 Hz 삼각파 60 ms, gain 0.05입니다.
- 종료: 3음 하행 차임(660, 520, 390 Hz)입니다.
- 도장: 90 Hz 사인파 80 ms를 감쇠시킵니다.
- Web Audio는 첫 사용자 제스처 이후에만 만듭니다. 음소거 설정은 저장합니다.

## Copy text

- `navigator.clipboard.writeText`를 쓰고, 실패하면 숨긴 textarea와 `execCommand('copy')`로 대체합니다.
- 결과는 토스트로만 알립니다.
- ko: `⌨️ 1분 타자 속도 측정 · 겨울 문장 편 / {cpm}타 · 정확도 {acc}% · {n}문장 / 칭호: {title} {emoji} / play.mesisi.net`
- en: `⌨️ One-Minute Typing Test: Winter Lines / {wpm} WPM · {acc}% accuracy · {n} lines / Title: {title} {emoji} / play.mesisi.net`
- 이미지 저장 기능은 넣지 않습니다. 결과 화면 자체가 스크린샷용 카드 역할을 합니다.

## Strings

| key | ko | en |
|---|---|---|
| appTitle | 1분 타자 속도 측정 | One-Minute Typing Test |
| appSub | 겨울 문장 편 · 60초 동안 몇 타 칠 수 있을까? | Winter Lines · How fast can you type in 60 seconds? |
| startBtn | 시작 | Start |
| best | 최고 기록 {v}타 | Best {v} WPM |
| imeHint | 한/영 키로 한글 입력을 켜 주세요 | Make sure your keyboard is set to English |
| readyHint | 첫 글자를 치면 시작돼요 | The timer starts on your first keystroke |
| inputPh | 여기에 따라 치세요 | Type here |
| live | {v}타 | {v} WPM |
| next | 다음 | Next |
| pasteBlocked | 붙여넣기는 안 돼요 | Pasting is disabled |
| wrongIme | 한/영 키를 눌러 한글로 바꿔 주세요 | Switch your keyboard to English letters |
| paused | 잠깐 멈췄어요 · 탭해서 계속 | Paused · Tap to continue |
| timeUp | 시간 끝! | Time's up! |
| resultUnit | 타 | WPM |
| accuracy | 정확도 | Accuracy |
| lines | 완료한 문장 | Lines done |
| bestLabel | 최고 기록 | Best |
| newBest | NEW! | NEW! |
| again | 다시 하기 | Try again |
| copy | 결과 복사 | Copy result |
| copied / copyFail | 복사했어요 / 복사하지 못했어요 | Copied / Could not copy |
| zeroTypo | 오타 제로 장인 ✨ | Zero-Typo Artisan ✨ |
| sleeping | 키보드가 아직 겨울잠 중 💤 | Your keyboard is still hibernating 💤 |
| soundOn / soundOff | 소리 켜기 / 소리 끄기 | Sound on / Sound off |
| escHint | Esc: 처음으로 | Esc: back to start |
| countNote | 겹모음·겹받침은 2타로 세요 | Every 5 correct characters = 1 word |

칭호 문자열은 위의 칭호 표를 그대로 씁니다.

## localStorage (in try/catch, prefix `tst:`)

- `tst:best:ko`: ko 모드 최고 타수(정수 문자열)
- `tst:best:en`: en 모드 최고 WPM
- `tst:sound`: "1" 또는 "0", 기본값 "0"
- `tst:plays`: 끝까지 마친 판 수(UI에 표시하지 않음)

입력한 문장 내용은 절대 저장하지 않습니다.

## Edge cases

- **IME 조합:**
  - 판정은 `keydown`이 아니라 `input` 이벤트에서 입력칸 값을 기준으로 합니다. Gboard, 삼성 키보드, iOS, 데스크톱 IME가 서로 다르게 동작해도 결과가 같게 나와야 합니다.
  - `keydown`은 Enter와 Esc를 처리할 때만 씁니다.
  - 조합 중(`isComposing`이거나 keyCode 229)에 들어온 Enter는 무시합니다. 안 그러면 조합 확정용 Enter가 문장 제출로 처리됩니다.
- **자동 진행 직후 입력:** 자동 진행 직후 120 ms 동안 들어오는 입력은 새 문장의 입력으로 받습니다. 진행할 때 입력칸을 비우되, 이전 IME 조합이 남지 않도록 `blur`→`focus` 없이 `value = ''`만 실행합니다.
- **긴 입력:** 입력 길이가 목표 길이 + 5를 넘으면 더 이상 받지 않습니다. 초과분은 잘라내고 오타 흔들림을 줍니다.
- **포커스 이탈:** PLAY 중에 입력칸이 포커스를 잃어도 게임은 계속됩니다. 카드를 탭하면 다시 포커스가 갑니다. 데스크톱에서는 카드 영역 바깥을 클릭해도 다시 포커스를 줍니다.
- **resize와 visualViewport 변화:** 레이아웃만 다시 계산합니다. 타이머와 상태는 절대 리셋하지 않습니다.
- **탭 숨김:** 타이머를 정지하고 PAUSED 오버레이를 띄웁니다. 숨겨진 동안의 시간은 elapsed에 넣지 않습니다.
- **다시 하기:** 모든 누적값, 문장 셔플, 파티클, 입력 상태를 완전히 리셋합니다. 언어와 음소거 설정은 그대로 둡니다.
- **언어 결정:** `?lang`이 없으면 `navigator.language`로 정합니다. ko가 아니면 en입니다. `<html lang>`도 같은 값으로 맞춥니다. 모드별 최고 기록은 따로 보관합니다.
- **localStorage 차단:** 최고 기록은 메모리에만 두고, 나머지는 모두 정상 동작합니다.
- **QA 썸네일:** `location.hash === '#demo'`이면 곧바로 RESULT 화면을 보여 줍니다. 값은 ko 312타 / en 58 WPM, 정확도 97%, 문장 6개, 칭호 "회의록 담당자"로 고정합니다. 이 데모 결과는 저장하지 않습니다.
- **헤드리스 QA:** 키보드 없이 돌아가도 JS 에러가 없어야 합니다. `visualViewport`가 없으면 `innerHeight`로 대체합니다.

## Must not

- 네트워크를 쓰지 않습니다. 외부 폰트, 사전 API, 문장 다운로드도 모두 안 됩니다. 크기는 80 KB 이하로 유지합니다.
- 실존 타자 연습 프로그램의 이름, 마스코트, 화면 구성, 문장을 따라 하지 않습니다. 노래 가사, 문학 작품, 명언, 브랜드명도 쓰지 않습니다.
- "평균 성인은 몇 타" 같은 검증되지 않은 통계나 순위를 표시하지 않습니다. 비교는 자기 최고 기록과만 합니다.
- 칭호로 특정 직업이나 집단을 깎아내리지 않습니다. 놀리는 대상은 자기 손가락뿐입니다.
- 붙여넣기 차단 외에 키 입력을 가로채지 않습니다. IME가 정상 동작해야 합니다.
- alert, confirm, prompt, window.open, 페이지 이동을 쓰지 않습니다. 소리를 자동 재생하지 않습니다.
