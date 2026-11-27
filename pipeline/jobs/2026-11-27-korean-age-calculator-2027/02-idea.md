# Idea and spec: 만 나이 계산기 2027 · 띠 계산 / Korean Age Calculator 2027

## Concepts scored

Each concept is scored 1–5 on four things: value in the first 10 seconds, originality, Korean search/share demand, and buildability in one HTML file. The maximum is 20. Demand scores are planning estimates. The three directions in today's research are already taken: the card-deduction threshold tool is `card-deduction-calculator-2026` (queued), mail sorting is `year-end-mail-sort` (queued), and 곶감 is `persimmon-breeze` (queued). So these three concepts use new subjects.

| Concept | Category | Score | Verdict |
|---|---|---|---|
| **만 나이 계산기 2027 · 띠 계산 / Korean Age Calculator 2027**: type a birth date and instantly see your 만 나이, 연 나이, old-style 세는 나이, your 띠, your next-birthday D-day and your age on 2027-01-01 | `tools` | **5 / 3 / 5 / 5 = 18** | **Picked.** People search "만 나이 계산기" all year, and the search peaks around New Year ("새해 몇 살"). The math is exact, with no legal uncertainty. 2027 is 정미년 (sheep), which gives the result a light hook. |
| 삑! 교통카드 태그 러시 / Beep! Transit Tap Rush: tap a commuter's card on the reader exactly as each passes the gate. The rush grows and the card balance runs out. | `games` | 4 / 4 / 3 / 5 = 16 | Original and relatable daily-life humor. There are already many `games` items, so keep it in the backlog. |
| 월세 세액공제 계산기 / Monthly Rent Tax Credit Calculator | `tools` | 4 / 2 / 5 / 3 = 14 | Demand is high, but the 2026 tax reform proposal (cap ₩10M → ₩12M, 17% for youth) is still a government bill, and the tax year it applies from is unconfirmed. Revisit once the law is enacted. |

## Meta

slug `korean-age-calculator-2027`

- **Category** `tools`
- **Kind** `tool`
- **Aspect** `3/4`
- **Date** `2026-11-27`
- **Tags**: ko `만 나이`, `나이 계산기`, `띠`; en `korean age`, `age calculator`, `zodiac`

| Field | ko | en |
|---|---|---|
| `title` | 만 나이 계산기 2027 · 띠 계산 | Korean Age Calculator 2027 |
| `desc` | 생년월일만 넣으면 만 나이·연 나이·세는 나이와 띠, 다음 생일 D-day를 한 번에 보여 줘요. 2027년 새해에 진짜 몇 살인지도 바로 확인하세요. | Enter your birth date to see your international age, year age and old Korean age, plus your zodiac animal, next-birthday countdown and age on Jan 1, 2027. |
| `howto` | 생년월일 8자리(예: 19950314)를 입력하면 바로 계산돼요. 기준일을 바꾸면 그날 기준 나이를 볼 수 있어요. '결과 복사'로 친구에게 보내 보세요. | Type your birth date as 8 digits (e.g. 19950314) and results appear instantly. Change the reference date to see your age on any day. Use "Copy result" to share. |
| `about` | 2023년 6월 28일부터 법과 행정에서는 만 나이를 써요. 다만 청소년보호법(술·담배)이나 병역처럼 연 나이를 쓰는 예외도 있어요. 입력한 생년월일은 이 기기 밖으로 나가지 않아요. | Since June 28, 2023, Korean law and administration use international age. Some rules, such as youth protection (alcohol, tobacco) and military service, still use year age. Your birth date never leaves this device. |

## Pitch

A clean, warm card on a soft winter-night background. The user types 8 digits, and on the 8th digit a big number counts up to their 만 나이. Under it are three age chips (만 / 연 / 세는), a 띠 badge with the animal emoji and the 간지 name, and a "2027-01-01 기준" row. That row clears up the classic confusion: on New Year's Day, only 세는 나이 goes up. 만 나이 changes on your birthday. If the user is a sheep (미), a small "2027 정미년 주인공 🐑" ribbon appears. Everything updates live, and there is no submit button.

## Flow

1. **INPUT (one screen, always visible)**
   - The title, then the birth field (`inputmode="numeric"`, placeholder `19950314`). It auto-formats to `1995.03.14` as the user types and accepts 8 digits.
   - The reference date is a native `<input type="date">` that defaults to today, with a small [오늘] button that resets it.
   - A "이 기기에 기억하기" checkbox, off by default.
2. **RESULT (same screen, below the input; it appears once the input is valid)**
   - **Hero:** "만 {n}세" in 64 px bold. The number counts up from 0 over 400 ms, eased.
   - **Chips:** 연 나이 {n}세 · 세는 나이 {n}세. Each has a ⓘ toggle with a one-line explanation inline (not a popup).
   - **띠 badge:** the emoji, then "{천간}{지지}년생 {동물}띠". For January–February births it adds the caveat line `zodiacNote`.
   - **Birthday row:** "다음 생일 {YYYY.MM.DD}({요일}) · D-{n}". If today is the birthday, it shows `bdayToday` 🎂 and a 1-second confetti burst.
   - **Lived row:** "오늘까지 {n:,}일째 살고 있어요".
   - **New Year box:** "2027년 1월 1일 기준: 만 {a}세 / 세는 나이 {b}세". The "2027" is not hard-coded: it is the reference year + 1.
   - **Sheep ribbon:** shown only if the birth year's 지지 is 미.
   - **Bottom bar:** [결과 복사] [초기화].
3. **ERROR (inline, under the field)**: a red helper text from `errors`. The result fades to 40% opacity and keeps the last valid values, so it does not flicker while the user types.

## Calculation

- **Use UTC date math only:** `Date.UTC(y, m-1, d)` and integer days = (b − a) / 86400000. This avoids DST and timezone drift. Today = the local Y/M/D from `new Date()`.
- **만 나이** = refY − birthY − (refMD < birthMD ? 1 : 0), where MD = month × 100 + day.
  - Feb 29 births: in common years the comparison naturally treats the birthday as reached on Mar 1. This matches 민법 §160③: the age goes up at the end of Feb 28.
- **연 나이** = refY − birthY.
- **세는 나이** = refY − birthY + 1.
- **2027 box:** apply the same formulas with ref = (refY+1)-01-01.
- **띠 (by birth year in the solar calendar):**
  - 천간 = "갑을병정무기경신임계"[(y−4) mod 10]
  - 지지 = "자축인묘진사오미신유술해"[(y−4) mod 12]
  - animal ko: 쥐 소 호랑이 토끼 용 뱀 말 양 원숭이 닭 개 돼지
  - animal en: Rat Ox Tiger Rabbit Dragon Snake Horse Sheep Monkey Rooster Dog Pig
  - emoji: 🐭🐮🐯🐰🐲🐍🐴🐑🐵🐔🐶🐷
  - Use a positive modulo.
- **Next birthday:** the first date ≥ ref with the birth month/day in that year. For Feb 29 in a common year, use Mar 1 of that year and append `leapNote`. D = days(ref → next). If D = 0, the user is on their birthday.
- **Lived days** = days(birth → ref). On the birth day itself it is 0, which shows `bornToday`.
- **Weekday:** `getUTCDay()` on the UTC date. ko 일월화수목금토, en Sun–Sat.

### Self-check (ponytail: one `assert`-style `selfTest()` run when `#test` is in the hash; it logs the results to the console)

| birth | ref | 만 | 연 | 세는 | extra |
|---|---|---|---|---|---|
| 1995-03-14 | 2026-11-27 | 31 | 31 | 32 | 을해 돼지; next 2027-03-14 (Sun), D-107; lived 11,581 days |
| 2000-02-29 | 2027-02-28 | 26 | 27 | 28 | next 2027-03-01 + leapNote |
| 2000-02-29 | 2027-03-01 | 27 | 27 | 28 | — |
| 2008-12-31 | 2027-01-01 | 18 | 19 | 20 | — |
| 2015-01-10 | — | — | — | — | 을미 양 → sheep ribbon and zodiacNote |
| 2026-11-27 | 2026-11-27 | 0 | 0 | 1 | bornToday |

## Controls

- **Pointer:** tap the fields and buttons. The ⓘ toggles expand inline. Tap targets are at least 44 px.
- **Keys:**
  - Digits fill the birth field and Backspace deletes. Enter blurs the field, which closes the mobile keyboard.
  - Esc clears the field. C copies when focus is not in an input.
  - Tab order: birth → reference → 오늘 → remember → copy → reset.
- **Paste:** accept `1995-03-14`, `1995.03.14`, `1995/3/14` and `950314`. For the 6-digit form, assume 19xx if yy > the last two digits of the current year, otherwise 20xx. When the input is 6 digits, show the hint `sixDigitHint`.
- No canvas game area. The page never scrolls: the card scrolls internally with `overflow:auto` if the viewport is short (320×480).

## Visual design

- **Palette:**
  - background: a gradient from #1f2a44 to #33406a with about 30 slow CSS snow dots (pure CSS animation, removed when `prefers-reduced-motion` is set)
  - card #fffaf2, ink #222831, muted #7b8190, accent #ff7a59, sheep ribbon #f3e9d2 with #8a6d3b text
- **Card:** max-width min(94vw, 460px), centered, 20 px radius, soft shadow.
- **Type:** system-ui. The hero number uses `font-variant-numeric: tabular-nums`.
- **Chips:** pill shapes in #f1f3f7. The hero number sits in an accent-colored ring.
- **Motion:** the count-up, a 150 ms fade-in of the result, a pop on the 띠 badge (scale 0.8 → 1) and confetti on the birthday (30 CSS particles). Reduced motion turns all of these off.
- **At 320 px wide:** 14 px padding, the hero at 52 px, and the chips stack vertically.

## Strings

| key | ko | en |
|---|---|---|
| appTitle | 만 나이 계산기 2027 | Korean Age Calculator 2027 |
| sub | 생년월일 8자리만 넣으면 끝 | Just type your birth date |
| birthLabel | 생년월일 | Date of birth |
| birthPh | 19950314 | 19950314 |
| refLabel | 기준일 | Reference date |
| today | 오늘 | Today |
| remember | 이 기기에 기억하기 | Remember on this device |
| manAge | 만 {n}세 | Age {n} |
| yearAge | 연 나이 {n}세 | Year age {n} |
| countAge | 세는 나이 {n}세 | Old Korean age {n} |
| manInfo | 생일이 지날 때마다 한 살. 법·행정의 기본 기준이에요. | +1 on each birthday. The default in Korean law since 2023. |
| yearInfo | 올해 연도 − 태어난 연도. 술·담배(청소년보호법), 병역 등에 써요. | Current year − birth year. Used for alcohol/tobacco rules and military service. |
| countInfo | 태어나면 1살, 새해마다 한 살. 예전 일상에서 쓰던 방식이에요. | 1 at birth, +1 every New Year. The old everyday way. |
| zodiac | {gan}{ji}년생 {animal}띠 | Born in a {gan}{ji} year · {animal} |
| zodiacNote | 1~2월생은 설날·입춘 기준으로 보면 앞 해 띠일 수 있어요 | Born in Jan–Feb? By Lunar New Year or Ipchun, your sign may be the previous year's. |
| nextBday | 다음 생일 {date}({wd}) · D-{n} | Next birthday {date} ({wd}) · D-{n} |
| bdayToday | 오늘 생일이에요! 축하해요 🎂 | It's your birthday today! 🎂 |
| leapNote | 평년엔 3월 1일에 나이가 바뀌어요 | In common years your age changes on Mar 1 |
| lived | 오늘까지 {n}일째 살고 있어요 | You've been alive for {n} days |
| bornToday | 오늘 태어났어요! 환영해요 👶 | Born today! Welcome 👶 |
| newYearHead | {y}년 1월 1일 기준 | On Jan 1, {y} |
| newYearLine | 만 {a}세 · 세는 나이 {b}세 | Age {a} · Old Korean age {b} |
| newYearTip | 새해에 한 살 더 먹는 건 세는 나이뿐! 만 나이는 생일에 바뀌어요. | Only the old Korean age goes up on New Year. Your real age changes on your birthday. |
| sheep | 2027 정미년 주인공 🐑 | Star of 2027, the Year of the Sheep 🐑 |
| copy / reset | 결과 복사 / 초기화 | Copy result / Reset |
| copied / copyFail | 복사했어요 / 복사하지 못했어요 | Copied / Could not copy |
| sixDigitHint | {yyyy}년으로 계산했어요 | Read as {yyyy} |
| errors.format | 8자리 숫자로 입력해 주세요 (예: 19950314) | Please enter 8 digits (e.g. 19950314) |
| errors.date | 없는 날짜예요 | That date doesn't exist |
| errors.future | 기준일보다 뒤의 날짜예요 | That's after the reference date |
| errors.range | 1900년 이후 날짜를 입력해 주세요 | Please use a date from 1900 on |
| foot | 계산은 이 기기에서만 해요 | Calculated on this device only |

Each animal name is a dictionary entry per language, and dates are formatted per language: ko `2027.03.14`, en `Mar 14, 2027`.

**Share text (copy):**

- ko: `🎂 만 {n}세 · 연 나이 {y}세 · 세는 나이 {c}세 / {gan}{ji}년생 {animal}띠 {emoji} / 다음 생일 D-{d} / play.mesisi.net`
- en: the same lines in English.
- The birth date itself is not included.

## localStorage (in try/catch, prefix `kac:`)

- `kac:remember`: "1" or "0", default "0".
- `kac:birth`: "YYYYMMDD", written only while remember is "1". Unchecking remember deletes it immediately.
- Nothing else. The reference date is never stored, so it is always today on load.

## Edge cases

- **Invalid dates** (20230231, 19951301): show `errors.date`. Validate by building the date and checking that Y/M/D round-trip.
- **Birth later than the reference date:** show `errors.future`. Birth = ref is valid and gives 0 / 0 / 1.
- **Empty reference date** (the user cleared the native input): fall back to today silently.
- **Leap years:** a Feb 29 birth with any reference date. See the self-check rows.
- **Lunar birthdays:** not supported. One line in about/howto is not needed, and there is no lunar conversion table (ponytail: add one only if users ask).
- **Midnight rollover:** "today" is read once at load and again on `visibilitychange` when the page becomes visible.
- **Resize:** layout is CSS only, with no JS layout work.
- **Blocked localStorage:** everything still works and the remember checkbox does nothing.
- **Language:** `?lang=en` swaps all strings, the date formats and `<html lang>`. The fallback is `navigator.language`.
- **`#demo`:** prefill 19950314 with ref 2026-11-27 so QA thumbnails show a full result.
- **`#test`:** run `selfTest()` and log the results.

## Must not

- No network, fonts, CDNs or analytics. One `index.html` under 40 KB with no images.
- Never send or log the birth date, and never put it in the share text.
- Do not claim legal advice. Mention the 연 나이 exceptions only as the two examples given, with no other legal claims.
- No real fortune telling, no saju, and no compatibility or "띠 궁합" claims. The sheep ribbon is decoration only.
- Do not imitate the look of government sites (정부24, 법제처) or any existing age-calculator site.
- No alert, confirm, prompt, window.open or navigation. No sound.

## Sources

- [뉴시스: 총급여 8000만원 이하 청년 월세 세액공제 15%→17% (2026 세제개편)](https://www.newsis.com/view/NISX20260803_0003734275)
- [토스뱅크: 2026년 세제개편안 정리](https://www.tossbank.com/articles/tax-reform)
- [복지로: 월세 세액공제 안내](https://www.bokjiro.go.kr/ssis-tbu/cms/pc/news/promotion/1310205_1118.html)
