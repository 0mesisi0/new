# Idea and spec: 연말·새해 인사말 생성기 2027 / Year-End & New Year Greeting Maker

## Concepts scored

Scores are 1–5 for: value in the first 10 seconds, originality, Korean search/share demand, and buildability in one HTML file. Maximum 20.

Every research direction is already covered by a queued spec: page smash goes to `page-smash`, the 2027 fortune to `new-year-fortune-2027`, the year-end tax calculator to `card-deduction-calculator-2026`, and the 곶감 trend to the `persimmon-*` specs. So all three concepts use new subjects.

| Concept | Category | Score | Verdict |
|---|---|---|---|
| Penguin huddle: rotate emperor penguins so the whole huddle stays warm | learn | 4/5/2/4 = 15 | Original and cute, but weak search demand. Keep it for later. |
| 2027 printable calendar maker with public holidays | tools | 3/2/5/3 = 13 | High demand, but the holiday data is a factual risk and the subject is close to `annual-leave-bridge`. Skip. |
| **Year-end and New Year greeting maker** | **random** | **4/3/5/5 = 17** | **Picked.** Searches for "연말 인사말", "새해 인사말 2027" and "크리스마스 문구" peak from December to early January. A ready message shows the moment the page opens, and the copy/share result goes straight into chat apps. |

## Meta

- slug `year-end-greeting-maker`, category `random`, kind `tool`, aspect `3/4`, date `2026-11-27`
- tags: ko `새해인사말`, `연말인사`; en `new-year`, `greetings`
- title: ko `연말·새해 인사말 생성기 2027`; en `Year-End & New Year Greeting Maker`
- desc ko: 받는 사람과 상황만 고르면 연말·크리스마스·2027 새해 인사말이 바로 완성돼요. 문장을 누르면 그 문장만 바뀌고, 복사해서 바로 보내면 끝.
- desc en: Pick who it is for and the occasion, and a year-end, Christmas or 2027 New Year greeting writes itself. Tap any sentence to swap just that line, then copy and send.
- howto ko: 받는 사람, 상황, 분위기를 고르세요. 미리보기에서 문장을 누르면 그 문장만 다른 문구로 바뀌어요. 호칭과 보내는 사람 이름은 선택이에요. '복사하기'로 메신저에 붙여 넣으세요. 단축키: R 전체 다시, C 복사.
- howto en: Choose the recipient, occasion and mood. Tap a sentence in the preview to swap only that line. Name fields are optional. Press "Copy" and paste it into any chat. Keys: R rerolls everything, C copies.
- about ko: 모든 문구는 이 사이트를 위해 새로 쓴 거예요. 입력한 이름은 이 기기 밖으로 나가지 않아요. 상사·선생님·부모님께는 합쇼체, 동료에게는 해요체, 친구에게는 반말로 자동으로 맞춰져요. 2027년은 정미년, 양의 해예요.
- about en: Every line was written fresh for this site. Names you type never leave this device. The Korean version picks the speech level for you: formal for bosses, teachers, parents and clients, polite for coworkers, casual for friends.

## Pitch

A cream note card sits on a navy winter-night background with slow CSS snow. A finished greeting is already on the card when the page opens, using the default recipient (동료) and an occasion picked from the date.

1. The user taps chips to choose 받는 사람 (recipient), 상황 (occasion) and 분위기 (mood). The message rebuilds instantly.
2. Each sentence is its own tappable chunk. Tapping it flips that one line to another option from the same pool.
3. Optional fields add the recipient's 호칭 at the front and a signature at the end.
4. "복사하기" copies the message. "공유" opens the native share sheet when the browser has one.

## Flow

There is one screen with three regions, laid out as a flex column at 100dvh:

1. **Header** (fixed): the title, plus the subtitle "누구에게 보낼까요? 고르면 바로 완성돼요".
2. **Middle** (`overflow-y:auto`, internal scroll only):
   - **Preview card:**
     - The message, one sentence per span, with a 🔄 hint on hover or focus.
     - A character count "{n}자" at the bottom right of the card.
     - A first-visit hint under the card: "문장을 누르면 그 문장만 바뀌어요". Hide it after the first sentence tap and remember that (`ygm:hinted`).
   - **Options panel:**
     - 받는 사람: 6 chips in a wrapping 3×2 grid.
     - 상황: 3 segmented chips.
     - 분위기: 3 segmented chips.
     - 호칭 input and 보내는 사람 input, max 12 chars each.
     - An emoji toggle switch (default on).
3. **Bottom bar** (sticky): [🔄 다른 문구] [📋 복사하기] [📤 공유]. Show 공유 only when `navigator.share` exists. Otherwise the remaining two buttons split the width.

State changes:

- **Recipient, occasion or mood change:**
  - Regenerate all slot indices randomly.
  - Play the card "shuffle" animation: opacity 0.4 → 1 with translateY 6 px → 0 over 200 ms.
- **Name or emoji change:** re-render text only. Keep the indices.
- **Sentence tap:**
  - Pick a new index ≠ current in that slot's pool.
  - That span does a rotateX flip over 220 ms.
  - The new text appears at the 110 ms midpoint.
- **다른 문구:** regenerate all indices and play the shuffle animation.
- **Copy success:**
  - Show the toast "복사했어요" for 1.6 s.
  - The card does a pop: scale 1 → 1.03 → 1 over 180 ms.
  - Spawn 12 small snowflake particles from the copy button. Use CSS-animated spans and remove them after 800 ms.

## Controls

- **Pointer:**
  - Tap chips, sentences, buttons and the toggle.
  - All targets are at least 44 px tall, and sentence spans get `padding:4px 2px` plus a line-height of 1.7.
- **Keyboard:**
  - Tab moves through all controls. Sentences are `<button>`-like spans with `role="button" tabindex="0"`, and Enter or Space swaps the focused one.
  - R rerolls everything and C copies. Ignore both while the focus is in a text input.
  - Inside a chip group, arrow keys move the selection (radio-group pattern with `role="radiogroup"`).
- **Touch:** the page itself has `touch-action:manipulation`. The middle region scrolls with `pan-y`. Nothing scrolls the page itself.

## Options

| key | ko | en | speech level (ko) | en register | thanks pool |
|---|---|---|---|---|---|
| boss | 상사·선배 | Boss / Senior | formal | formal | personal |
| coworker | 동료 | Coworker | polite | casual | personal |
| friend | 친구 | Friend | casual | casual | personal |
| parents | 부모님·어른 | Parents / Elders | formal | formal | personal |
| teacher | 선생님 | Teacher | formal | formal | personal |
| client | 거래처·고객 | Client | formal | formal | biz |

Occasions: `yearend` 연말 / Year-end, `xmas` 크리스마스 / Christmas, `newyear` 새해 {ny} / New Year {ny}.

Moods: `warm` 따뜻하게 / Warm, `fun` 유쾌하게 / Playful, `short` 짧고 깔끔하게 / Short & simple.

**Default occasion by local date** (recomputed every visit, never stored):

- Dec 24–26: xmas
- Dec 27 through Feb: newyear
- otherwise: yearend

**Years:**

- `ny` = month ≤ 2 (Jan–Feb) ? year : year + 1, and `cy` = ny − 1.
- 간지 as in the example spec:
  - 천간 = "갑을병정무기경신임계"[(ny−4)%10]
  - 지지 = "자축인묘진사오미신유술해"[(ny−4)%12]
  - `gz` = 천간 + 지지 + "년", e.g. 정미년
- Animal emoji by 지지: 🐭🐮🐯🐰🐲🐍🐴🐑🐵🐔🐶🐷.
- Lines marked (z) are included only when 지지 = 미. Otherwise filter them out of the pool.

## Message assembly

- **Slots by mood:**
  - warm: greet, thanks, wishWarm, closer
  - fun: greet, thanks, wishFun, closer
  - short: greet, closer
- **Pool lookup:**
  - Korean uses `ko[level]` and English uses `en[register]`.
  - greet and closer are keyed by occasion.
  - thanks uses `thanksBiz` when the recipient is client.
- **Rendering:** the sentences are joined with a newline. Each is its own span.
- **호칭 (`to`, optional, trimmed):**
  - ko: prefix the first sentence with "{to}, ", e.g. "김 팀장님, {ny}년 새해 복 많이 받으십시오."
  - en: prefix "Dear {to}," on its own line for the formal register and "Hi {to}!" for casual.
- **Signature (`from`, optional):** on a final line after a blank line.
  - ko formal: "{from} 올림"
  - ko polite: "{from} 드림"
  - ko casual: "- {from}"
  - en: "— {from}"
- **Emoji (when on):**
  - Append " " + emoji to the greet sentence: yearend ❄️, xmas 🎄, newyear uses the 지지 animal emoji (🐑 for 2027).
  - Append " " + emoji to the closer sentence: yearend ⛄, xmas 🎁, newyear ✨.
  - Never put emoji inside other sentences.
- **Placeholders:** `{cy}`, `{ny}` and `{gz}` are replaced in every line.
- **Character count:** `[...fullText].length`. The copied text equals the rendered text exactly, newlines included.
- **RNG:** mulberry32, seeded with `Date.now()`. `#demo` uses seed 2027. A reroll of one slot loops until the index differs. Every pool has at least 2 entries after the (z) filter.

## Korean pools

### formal (합쇼체: boss, parents, teacher, client)

| slot | lines |
|---|---|
| greet.yearend | {cy}년도 어느덧 저물어 갑니다. / 한 해를 마무리하는 때가 되었습니다. |
| greet.xmas | 즐거운 성탄절을 맞아 인사드립니다. / 거리마다 캐럴이 들리는 성탄절입니다. |
| greet.newyear | {ny}년 새해 복 많이 받으십시오. / 희망찬 {ny}년 새해를 맞아 인사드립니다. |
| thanks | 올 한 해 아낌없이 보살펴 주셔서 진심으로 감사드립니다. / 늘 곁에서 힘이 되어 주셔서 감사합니다. / 덕분에 올해도 무사히 잘 지낼 수 있었습니다. |
| thanksBiz | 올 한 해 보내 주신 믿음과 협조에 깊이 감사드립니다. / 함께해 주신 덕분에 뜻깊은 한 해를 보낼 수 있었습니다. / 늘 세심하게 챙겨 주셔서 감사합니다. |
| wishWarm | 새해에는 늘 건강하시고 웃을 일만 가득하시길 바랍니다. / 가정에 따뜻한 행복이 함께하시길 기원합니다. / 다가오는 해에도 뜻하시는 일 모두 이루시길 바랍니다. |
| wishFun | 새해에는 월요일도 금요일처럼 가볍게 느껴지시길 바랍니다. / 내년엔 좋은 소식이 택배보다 빨리 도착하길 바랍니다. / 새해 복은 할인 없이 정가로 넉넉하게 받으십시오. / (z) {gz} 양의 해, 양털처럼 포근하고 넉넉한 한 해 되십시오. |
| closer.yearend | 남은 연말도 따뜻하게 보내십시오. / 추운 날씨에 감기 조심하십시오. |
| closer.xmas | 행복한 성탄절 보내십시오. / 소중한 분들과 따뜻한 크리스마스 보내십시오. |
| closer.newyear | {ny}년에도 늘 평안하시길 바랍니다. / 새해에도 자주 연락드리겠습니다. |

### polite (해요체: coworker)

| slot | lines |
|---|---|
| greet.yearend | 벌써 {cy}년의 끝이 다가왔네요. / 올해도 정말 금방 지나갔네요. |
| greet.xmas | 메리 크리스마스예요! / 어느새 크리스마스가 왔네요. |
| greet.newyear | {ny}년 새해 복 많이 받으세요! / {ny}년 새해 인사 전해요. |
| thanks | 올해 함께 일해서 정말 든든했어요. / 바쁜 와중에도 늘 챙겨 줘서 고마워요. / 덕분에 힘든 날도 웃으면서 버틸 수 있었어요. |
| wishWarm | 새해에는 건강하고 좋은 일만 가득하길 바라요. / 내년에는 바라는 일들이 하나씩 이뤄지길 응원할게요. / 새해엔 마음 편한 날이 더 많아지길 바라요. |
| wishFun | 내년에는 칼퇴가 우리의 일상이 되길 바라요. / 새해엔 점심 메뉴 고민이 1초 만에 끝나길 바라요. / 새해 복은 할인 없이 정가로 듬뿍 받으세요. / (z) {gz} 양의 해니까, 양처럼 순하게 일이 풀리길 바라요. |
| closer.yearend | 남은 연말도 따뜻하게 보내요. / 추운데 감기 조심하세요. |
| closer.xmas | 즐거운 크리스마스 보내세요! / 따뜻한 연휴 보내세요. |
| closer.newyear | {ny}년에도 잘 부탁해요! / 새해에도 우리 같이 힘내요. |

### casual (반말: friend)

| slot | lines |
|---|---|
| greet.yearend | 벌써 {cy}년도 끝이네. / 올해 진짜 순식간에 지나갔다. |
| greet.xmas | 메리 크리스마스! / 크리스마스다! 잘 지내? |
| greet.newyear | {ny}년 새해 복 많이 받아! / {ny}년 새해 기념으로 연락했어. |
| thanks | 올해 내 옆에 있어 줘서 고마워. / 힘들 때마다 들어 줘서 진짜 고마웠어. / 네 덕분에 올해 많이 웃었어. |
| wishWarm | 새해엔 아프지 말고 좋은 일만 생기자. / 내년엔 네가 바라는 거 다 이뤄지길 바랄게. / 새해엔 마음 편한 날이 더 많았으면 좋겠다. |
| wishFun | 새해엔 알람 한 번에 일어나는 사람이 되자. / 새해 복은 내가 반 나눠 줄게, 많이 받아. / 내년엔 점심 메뉴 고민 없는 한 해 되자. / (z) {gz} 양띠 해니까 양털처럼 포근하게 보내자. |
| closer.yearend | 남은 연말도 따뜻하게 보내! / 추운데 감기 조심해. |
| closer.xmas | 즐거운 크리스마스 보내! / 연휴 푹 쉬어. |
| closer.newyear | {ny}년에도 잘 부탁해! / 새해에 꼭 얼굴 보자. |

## English pools

### formal (boss, parents, teacher, client)

| slot | lines |
|---|---|
| greet.yearend | As {cy} draws to a close, I wanted to reach out. / Another year is coming to an end. |
| greet.xmas | Merry Christmas and warm wishes this holiday season. / With the holidays here, I wanted to send a note. |
| greet.newyear | Wishing you a happy New Year {ny}. / Best wishes for the year {ny}. |
| thanks | Thank you sincerely for all your support this year. / I am grateful for your guidance and kindness. / Thanks to you, this year went smoothly. |
| thanksBiz | Thank you for your trust and partnership this year. / Working with you made this a meaningful year. / We truly appreciate your thoughtful cooperation. |
| wishWarm | I wish you good health and many reasons to smile. / May your home be filled with warmth and happiness. / I hope everything you plan for next year goes well. |
| wishFun | May your Mondays feel as light as Fridays. / May good news arrive faster than your deliveries. / May next year's luck come with free shipping. / (z) In this Year of the Sheep, may everything feel soft as wool. |
| closer.yearend | Wishing you a warm end of the year. / Please stay warm and well this winter. |
| closer.xmas | Have a wonderful Christmas. / Enjoy a warm Christmas with your loved ones. |
| closer.newyear | Wishing you peace throughout {ny}. / I look forward to staying in touch in the new year. |

### casual (coworker, friend)

| slot | lines |
|---|---|
| greet.yearend | Can you believe {cy} is almost over? / This year flew by. |
| greet.xmas | Merry Christmas! / It's Christmas! How are you doing? |
| greet.newyear | Happy New Year {ny}! / Sending a little New Year hello for {ny}. |
| thanks | Thanks for being there this year. / Thanks for always listening. / You made this year a lot more fun. |
| wishWarm | Here's to a healthy, happy new year. / Hope everything you want comes your way. / Hope next year brings you more calm days. |
| wishFun | May your alarm work on the first try next year. / May lunch decisions take one second in {ny}. / Next year's luck: I'll split mine with you. / (z) It's the Year of the Sheep, so stay cozy like wool. |
| closer.yearend | Stay warm out there! / Don't catch a cold. |
| closer.xmas | Have a merry one! / Enjoy the break. |
| closer.newyear | Let's catch up in {ny}! / Let's make {ny} a good one. |

## Visual design

- **Palette:**
  - background: a gradient from #1b2340 to #2c3a63
  - card #fdf8ee, ink #2a2a33, muted #8b8f9a
  - accent red #d9453b and accent green #2f8f6b
  - selected chip: #d9453b fill with white text; unselected chip: rgba(255,255,255,.12) with white text
- **Snow:** 40 CSS-animated dots (`::before` spans, generated once in JS) on a fixed layer behind the content with `pointer-events:none`. With prefers-reduced-motion, use 12 static dots.
- **Card:**
  - radius 16 px, a soft shadow and a 2 px dashed top border in accent red, like a holiday note
  - a small stamp corner at the top right showing the occasion emoji, 40 px, rotated 8°
- **Text:** 17 px on the message and 1.7 line-height. Sentence spans get a dotted underline in muted color on hover or focus, with a 🔄 shown after the span.
- **Layout:**
  - content column max-width 480 px, centered
  - 16 px side padding at 320 px wide
  - chip labels wrap and never truncate
- **Bottom bar:** blurred navy (`backdrop-filter`, with a solid fallback). The primary copy button is red.
- **prefers-reduced-motion:** no flip, no shuffle, no pop and no particles. Text swaps instantly.

## Strings

| key | ko | en |
|---|---|---|
| appTitle | 연말·새해 인사말 생성기 | Year-End & New Year Greeting Maker |
| sub | 누구에게 보낼까요? 고르면 바로 완성돼요 | Who is it for? Pick and it's written. |
| hint | 문장을 누르면 그 문장만 바뀌어요 | Tap a sentence to swap just that line |
| lblTo | 받는 사람 | Recipient |
| lblOcc | 상황 | Occasion |
| lblMood | 분위기 | Mood |
| r.boss / r.coworker / r.friend | 상사·선배 / 동료 / 친구 | Boss / Senior, Coworker, Friend |
| r.parents / r.teacher / r.client | 부모님·어른 / 선생님 / 거래처·고객 | Parents / Elders, Teacher, Client |
| o.yearend / o.xmas / o.newyear | 연말 / 크리스마스 / 새해 {ny} | Year-end / Christmas / New Year {ny} |
| m.warm / m.fun / m.short | 따뜻하게 / 유쾌하게 / 짧고 깔끔하게 | Warm / Playful / Short & simple |
| toLbl / toPh | 호칭 (선택) / 예: 김 팀장님, 엄마 | Name to address (optional) / e.g. Ms. Kim, Mom |
| fromLbl / fromPh | 보내는 사람 (선택) / 예: 하루 | Your name (optional) / e.g. Haru |
| emoji | 이모지 넣기 | Add emoji |
| count | {n}자 | {n} chars |
| reroll / copy / share | 다른 문구 / 복사하기 / 공유 | New lines / Copy / Share |
| copied / copyFail | 복사했어요 / 복사하지 못했어요. 길게 눌러 직접 복사해 주세요 | Copied / Could not copy. Long-press to copy it yourself. |
| shareFail | 공유하지 못했어요. 복사하기를 써 주세요 | Could not share. Please use Copy. |
| swapAria | 이 문장 바꾸기 | Swap this sentence |
| foot | 모든 문구는 이 사이트에서 새로 쓴 거예요 | Every line was written for this site |

## localStorage (in try/catch, prefix `ygm:`)

- `ygm:opts`: JSON `{r, m, e}`, i.e. recipient key, mood key and emoji flag. Validate on load and fall back to `{r:"coworker", m:"warm", e:true}` if the value is invalid.
- `ygm:from`: the last sender name.
- `ygm:hinted`: "1" after the first sentence tap.

Never store the recipient 호칭 field, the occasion or the generated text.

## Edge cases

- **Inputs:**
  - Trim both fields, replace newlines and tabs with spaces, and cap at 12 chars with `maxlength` plus a JS slice for paste.
  - Strip a trailing comma typed by the user so the output never reads "팀장님,,".
- **Rendering:** set text with `textContent` only, never `innerHTML` with user input.
- **Language:** with `lang=en`, the Korean speech levels are irrelevant and only the en register map applies. The chip labels and pools switch fully, and `<html lang>` matches.
- **Pools and indices:**
  - After the (z) filter, every pool still has at least 2 lines. Build an assert in a `?selftest` path that checks every pool length ≥ 2 for both the 미 and non-미 cases.
  - When a pool shrinks or changes, clamp the index with modulo.
- **Fields:** an empty 호칭 adds no prefix and an empty sender adds no signature block, with no dangling blank line.
- **Clipboard:** if `navigator.clipboard` is missing or rejects, fall back to a hidden textarea and `execCommand('copy')`. If that also fails, show the copyFail toast and select the card text with a Range.
- **Share:** call `navigator.share({text})`. An AbortError (the user cancelled) shows nothing. Other errors show shareFail.
- **Resize:** pure CSS layout, so nothing to recompute. Check that the 320×480 layout works with the middle region scrolling internally.
- **Hidden page:** pause the snow animation (`animation-play-state:paused`) when `document.hidden`.
- **Storage:** when localStorage is blocked, everything still works with defaults.
- **`location.hash === '#demo'`** (QA thumbnail): seed 2027, recipient boss, occasion newyear, mood warm, 호칭 "팀장님", sender "하루", emoji on, hint hidden.

## Must not

- No network, analytics, fonts or external assets. Keep the single `index.html` under 60 KB. No sound.
- No real brands, messenger names, companies, celebrities or real people. Do not copy greeting lines from existing sites, cards or ads. Every line above is original.
- No religious preaching beyond plain "Merry Christmas" / 성탄절 wording. No politics, alcohol, drinking-party or penalty jokes, and no jokes about appearance, weight, age, gender, region or job groups.
- No fortune or money claims, and no health advice beyond ordinary "stay warm / 감기 조심" wishes.
- No alert, confirm, prompt, window.open or navigation. Never autoplay anything.
- Do not mix speech levels in one Korean message. Every pool line must match its level.
