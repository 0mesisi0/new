# Idea and spec: 끝없는 송년회 건배사 / Endless Year-End Toasts

## Concepts scored

Each concept is scored 1–5 on four things: value in the first 10 seconds, originality, Korean search/share demand, and buildability in one HTML file. The maximum is 20.

| Concept | Category | Score | Verdict |
|---|---|---|---|
| Once-a-day winter pet: a page you check once a day, where the pet's state changes overnight | games | 3/4/3/3 = 13 | The payoff only comes on day 2, so the first 10 seconds are weak. Keep it for later. |
| "How much more should I spend by 12/31?" card deduction calculator | tools | 3/3/5/4 = 15 | Demand is high, but the deduction numbers have only low-confidence blog sources, and it sits next to `pension-tax-credit-2026`. Wait until the NTS figures are checked. |
| **Endless Year-End Toasts** | **weird** | **5/4/5/5 = 19** | **Picked.** "송년회 건배사" is searched every December. The top of the feed gives practical toasts you can actually use, and the endless scroll that gets stranger as you go is the weird hook that people share. No facts to verify, and it is all text plus CSS. |

## Meta

- slug `endless-toast`, category `weird`, kind `tool`, aspect `9/16`, date `2026-11-26`
- tags: ko `건배사`, `송년회`; en `toast`, `year-end party`
- title: ko `끝없는 송년회 건배사`; en `Endless Year-End Toasts`
- desc ko: 송년회 건배사가 끝없이 나와요. 위쪽은 바로 쓰는 실전용이고, 내려갈수록 사물과 우주에게까지 건배하는 엉뚱한 건배사가 기다려요.
- desc en: An endless feed of year-end party toasts. The top ones are ready to use; scroll deeper and you'll be toasting tangerines, printers and the Milky Way.
- howto ko: 아래로 스크롤하면 건배사가 끝없이 나와요. 카드를 누르면 크게 띄워서 읽을 수 있는 발표 모드가 켜져요. ⭐로 저장하고 📋로 복사하세요. 발표 모드에서는 Space/→로 다음, ←로 이전, Esc로 닫아요.
- howto en: Scroll down for endless toasts. Tap a card for big-text presenter mode you can read aloud. ⭐ saves a toast and 📋 copies it. In presenter mode, Space/→ goes to the next toast, ← goes back and Esc closes.
- about ko: 오늘 날짜가 같으면 누구에게나 같은 순서로 나와요. 그래서 "오늘 #142번 봤어?"처럼 번호로 공유할 수 있어요. 잔은 물이든 음료수든 무엇이든 괜찮아요. 저장한 건배사는 이 기기에만 남아요.
- about en: Everyone sees the same feed on the same day, so you can share by number ("did you see #142 today?"). Any cup works: water, juice, tea. Saved toasts stay on this device only.

## Pitch

- A vertical feed of toast cards on a warm party-orange background.
- Each card has the format Koreans use at parties: a lead line, "제가 '{선창}' 하면 '{후창}'으로 받아 주세요!", and a small footnote.
- A sticky depth meter at the top counts up as you scroll: "#37번째 · 깊이: 유쾌". The background slowly shifts from orange to coral, then purple, then a starry navy sky.
- The toasts get stranger with depth: practical → playful office and food jokes → toasting objects → cosmic.
- Tapping a card opens presenter mode: giant text for reading at the actual party, plus a "건배!" button that clinks two mugs with confetti.

## Flow

1. **FEED** (the only main screen)
   - Sticky header: the title, the depth meter, ⭐ saved count, and the mute toggle.
   - Cards render in batches of 20. The next batch appends when the feed is within 600 px of the bottom.
   - The feed scrolls internally; the page itself never scrolls.
   - A "맨 위로" floating button appears after #20.
   - When the feed enters a new tier, a divider card slides in, e.g. "— 여기서부터 엉뚱 구역 —".
   - Milestone cards appear at #50, #100, #300, #500 and #1000 (see strings).
2. **PRESENTER** (overlay)
   - Shows the intro (small), "제가" + the call (huge), "하면" + the response (huge, accent color), and the footnote.
   - Buttons: ← 이전, 건배! 🍻→ replaced by a mug icon (see must-nots), 다음 →, ⭐, 📋, ✕.
   - "건배!" plays the clink animation: two SVG mugs rotate ±15° and meet, 30 confetti particles burst out, an optional clink sound plays, and there is a 4 px shake (skipped with reduced motion).
   - Next/previous move through the same feed index and extend the feed when needed.
3. **SAVED** (bottom sheet)
   - Lists up to 20 saved toasts, newest first, each with 📋 and 🗑.
   - Tapping an item opens it in presenter mode.
   - Empty state uses the `savedEmpty` string.

## Controls

- **Pointer:**
  - Tap a card to open presenter mode.
  - Tap ⭐/📋 on a card to save or copy it. These icons stop propagation so they don't also open the card.
  - Swipe left/right in presenter mode to go next/previous (threshold 50 px).
- **Keys in the feed:** ↑/↓ and PageUp/PageDown scroll. Enter opens the card nearest the top. S opens the saved sheet. M toggles sound.
- **Keys in presenter mode:** Space, → or Enter go next. ← goes back. C copies. F saves. B or the number 0 triggers 건배. Esc closes.
- **Touch and layout:** the feed uses `touch-action: pan-y` and the presenter overlay uses `touch-action: none`. Every button is at least 44 px.

## Content model

- **Seed:** FNV-1a 32-bit of `YYYY-MM-DD` (local date when the page loads). The PRNG for card n is mulberry32(seed ^ (n × 2654435761)).
  - Each card draws in a fixed order: tier pair index, intro index, footnote index.
  - The same date and same n always give the same card in both languages, because ko and en pools are index-aligned.
- **Tiers:**
  - Tier 1 (실전), #1–16: the 16 authored toasts, shuffled by the day seed with Fisher–Yates, each shown once.
  - Tier 2 (유쾌), #17–60: random pair + intro + footnote from tier-2 pools.
  - Tier 3 (엉뚱), #61–150: tier-3 pools.
  - Tier 4 (우주), #151 onward: tier-4 pools.
- **No repeats:** a pair may not repeat any of the previous 5 cards. Redraw with the next PRNG value, at most 10 tries.
- **Background:** interpolates by depth between tier colors: #ffb547 → #ff7a6b → #7b4bd6 → #121a3a. From #151 on, about 80 CSS stars fade in behind the feed.
- **Card text format:**
  - ko: `{intro}` / `제가 "{call}" 하면` / `"{response}"로 받아 주세요!` / `{note}`
  - en: `{intro}` / `When I say "{call}",` / `you say "{response}"!` / `{note}`
- **Acrostic cards (`acro`):** show 3 lines, one per letter, before the call line.

### Tier 1 (실전): authored, with a meaning note

| # | call ko | response ko | note ko | call en | response en | note en |
|---|---|---|---|---|---|---|
| 1 | 올해도 | 수고했다! | 한 해 버틴 우리 모두에게 | This year | We made it! | For everyone who held on |
| 2 | 내년엔 | 더 웃자! | 웃음은 늘리고 한숨은 줄이고 | Next year | More laughs! | More laughs, fewer sighs |
| 3 | 우리 팀 | 최고다! | 짧고 크게, 모두 함께 | Our team | The best! | Short, loud, all together |
| 4 | 건강이 | 최고! | 모든 다짐의 1번 | Health | Comes first! | Resolution number one |
| 5 | 칼퇴 | 만세! | 내년엔 제시간에 퇴근하길 | On-time exit | Hooray! | May we all leave on time |
| 6 | 함께라서 | 고맙다! | 옆 사람을 한 번 보고 외치기 | Together | Thank you! | Look at your neighbor, then shout |
| 7 | 새해엔 | 꽃길만! | 꽃길만 걷자는 뜻 | New year | Smooth roads! | Only smooth roads ahead |
| 8 | 다 같이 | 잘되자! | 누구 하나 빠짐없이 | All of us | Let's thrive! | Nobody left behind |
| 9 | 오늘은 | 걱정 끝! | 걱정은 내일 다시 | Tonight | No worries! | Worries can wait till tomorrow |
| 10 | 2027 | 잘해보자! | 새해를 미리 응원하기 | 2027 | Bring it on! | Cheering the new year early |
| 11 | 정미년엔 | 순하게 쭉! | 2027은 양의 해, 순하고 꾸준하게 | Year of the Sheep | Soft and steady! | 2027 is the sheep year |
| 12 | 마무리 | 깔끔하게! | 올해의 끝을 깔끔하게 | Wrap it up | Nice and clean! | End the year tidy |
| 13 | 수고 | 많았다! | 가장 짧은 감사 인사 | Good work | Everyone! | The shortest thank-you |
| 14 | 웃으면 | 복이 와요! | 웃는 얼굴로 외치기 | Smile | Luck arrives! | Shout it with a smile |
| 15 | 고마워 (acro) | 고마워! | 고: 고생 많았고 / 마: 마음 모아 / 워: 워라밸 챙기자 | THX (acro) | THX! | T: Tough year / H: Happy crew / X: eXcellent next year |
| 16 | 행복해 (acro) | 행복해! | 행: 행운 가득 / 복: 복도 가득 / 해: 해마다 오늘처럼 | JOY (acro) | JOY! | J: Just / O: One more / Y: Year like this |

### Tier 2 (유쾌)

Pairs (index-aligned):

| ko call / response | en call / response |
|---|---|
| 야근은 / 내년으로! | Overtime / See you never! |
| 월요일도 / 봐주자! | Mondays / We forgive you! |
| 회의는 / 짧게! | Meetings / Keep 'em short! |
| 단톡방 / 평화! | Group chat / Peace! |
| 점심은 / 맛있게! | Lunch / Always tasty! |
| 결재는 / 한 번에! | Approvals / First try! |
| 붕어빵은 / 팥 가득! | Fish-shaped buns / Full of bean! |
| 귤은 / 한 박스! | Tangerines / By the box! |
| 주말은 / 길게! | Weekends / Longer! |
| 알람은 / 한 번만! | Alarms / Just once! |
| 택배는 / 빨리! | Packages / Arrive fast! |
| 잔소리 / 퇴근! | Nagging / Clocked out! |

Intros:

| ko | en |
|---|---|
| 잔을 살짝 들고 | Raise your cup a little |
| 옆 사람과 눈을 맞추고 | Catch your neighbor's eye |
| 일어설 필요는 없어요 | No need to stand up |
| 목소리는 크게, 잔은 천천히 | Loud voice, slow cup |
| 박수 세 번 치고 | Clap three times first |
| 생일이 가장 가까운 사람이 선창해요 | Whoever's birthday is next leads |

Footnotes:

| ko | en |
|---|---|
| 효과: 단톡방 알림 30% 감소 (체감) | Effect: 30% fewer chat pings (felt) |
| 부작용: 다들 웃음 | Side effect: everyone laughs |
| 난이도: ★☆☆ | Difficulty: ★☆☆ |
| 추천 상황: 1차 시작할 때 | Best for: the opening toast |
| 회사 사람에게도 안전함 | Safe for coworkers |
| 두 번 외치면 효과 두 배 (아님) | Shout twice for double effect (not really) |

### Tier 3 (엉뚱)

Pairs:

| ko | en |
|---|---|
| 붕어빵 꼬리 / 바삭하게! | Bun tails / Crispy forever! |
| 핫팩의 / 마지막 온기! | Hand warmer / Last bit of heat! |
| 귤 껍질 / 한 번에! | Tangerine peel / In one piece! |
| 양말 짝 / 찾자! | Lost socks / Come home! |
| 프린터 / 걸리지 마! | Printer / Don't jam! |
| 배터리 / 100퍼! | Battery / A hundred percent! |
| 엘리베이터 / 바로 와라! | Elevator / Come right now! |
| 냉장고 반찬 / 아직 살아 있다! | Leftovers / Still alive! |
| 비둘기도 / 행복하자! | Pigeons / Be happy too! |
| 눈사람 / 녹지 마! | Snowman / Don't melt! |
| 우산 / 잃어버리지 말자! | Umbrellas / Stay with us! |
| 와이파이 / 꽉 차라! | Wi-Fi / Full bars! |

Intros:

| ko | en |
|---|---|
| 잔 대신 귤을 들어도 돼요 | A tangerine works instead of a cup |
| 냉장고 쪽으로 돌아서서 | Turn toward the fridge |
| 아무도 이유를 묻지 않아요 | Nobody asks why |
| 새끼손가락을 살짝 펴고 | Lift your pinky slightly |
| 엄숙하게, 아주 엄숙하게 | Solemnly. Very solemnly. |
| 창밖의 눈을 바라보며 | Gazing at the snow outside |

Footnotes:

| ko | en |
|---|---|
| 진지하게 할수록 더 웃겨요 | Funnier the more serious you are |
| 사물에게 건배하는 건 합법입니다 | Toasting objects is perfectly legal |
| 난이도: ★★☆ | Difficulty: ★★☆ |
| 해당 사물은 감동받았습니다 | The object has been deeply moved |
| 2차에서 쓰면 반응 최고 | Best saved for the second round |
| 아무도 안 따라 하면 혼자 두 번 | If no one joins in, do it twice alone |

### Tier 4 (우주)

Pairs:

| ko | en |
|---|---|
| 은하수도 / 퇴근하자! | Milky Way / Clock out! |
| 블랙홀에 / 야근 넣자! | Black hole / Eat the overtime! |
| 명왕성도 / 우리 편! | Pluto / On our side! |
| 빅뱅부터 / 지금까지! | Since the Big Bang / Still here! |
| 혜성처럼 / 칼퇴! | Like a comet / Out the door! |
| 심해 오징어 / 힘내! | Deep-sea squid / Hang in there! |
| 공룡도 / 못 본 연말! | Dinosaurs / Never saw this party! |
| 시간아 / 천천히! | Time / Slow down! |
| 1억 년 뒤에도 / 친구 하자! | In 100 million years / Still friends! |
| 모든 원자 / 수고했다! | Every atom / Good job! |

Intros:

| ko | en |
|---|---|
| 무중력 상태로 잔을 들고 | Raise your cup in zero gravity |
| 빛의 속도로 박수 한 번 | One clap at light speed |
| 지구 반대편까지 들리게 | Loud enough for the far side of Earth |
| 망원경 보듯 눈을 가늘게 뜨고 | Squint like you're at a telescope |
| 별 하나에 한 마디씩 | One word per star |

Footnotes:

| ko | en |
|---|---|
| 이 건배사는 빛보다 늦게 도착할 수 있어요 | This toast may arrive slower than light |
| 난이도: ★★★ | Difficulty: ★★★ |
| 우주 어딘가에서 누군가 받아 줬어요 | Someone, somewhere in space, replied |
| 실제 송년회 사용 시 책임지지 않아요 | Use at a real party at your own risk |
| 여기까지 온 당신, 진짜 끝까지 가는 타입 | You made it this far. You're a finisher. |

### Milestone cards (not tappable; shown in place of the regular card at that index, which moves to the next index)

| n | ko | en |
|---|---|---|
| 50 | 🎉 50번째! 이 정도면 송년회 사회자 자격 충분 | 🎉 #50! You're qualified to host the party |
| 100 | 💯 100개 돌파. 건배사 백과사전이 되셨습니다 | 💯 100 toasts. You are now a toast encyclopedia |
| 300 | 🌌 300. 지구의 건배사는 이미 다 봤어요 | 🌌 300. You've seen every toast on Earth |
| 500 | 🛸 500. 외계인도 당신의 건배를 듣고 있어요 | 🛸 500. Aliens are listening to your toasts |
| 1000 | ♾️ 1000. 사실 끝은 없어요. 이제 진짜 건배하러 가세요 | ♾️ 1000. There is no end. Go make a real toast now |

### Tier dividers

| tier | ko | en |
|---|---|---|
| 2 | — 여기서부터 유쾌 구역 — | — Entering the Playful Zone — |
| 3 | — 여기서부터 엉뚱 구역 — | — Entering the Odd Zone — |
| 4 | — 대기권 돌파: 우주 구역 — | — Leaving the atmosphere: Cosmic Zone — |

## Visual design

- **Palette:** tier backgrounds as listed above. Cards are #fffaf2 with ink #2a2230, the response accent is #e0453d, and from tier 4 on the response accent is #ffd166. The meter chip is translucent white.
- **Cards:**
  - Radius 18 px, max width min(92vw, 460px), centered, 14 px gap between cards.
  - A number badge "#n" at the top left; ⭐ and 📋 at the top right (44 px targets).
  - Intro 14 px gray, call line 20 px bold, response line 24 px bold accent, note 13 px gray.
  - Cards fade up 12 px when they enter (IntersectionObserver; skipped with reduced motion).
- **Presenter:**
  - Full overlay in the current tier color.
  - Call text clamp(28px, 8vw, 56px); response clamp(36px, 11vw, 80px).
  - Two inline SVG mugs (rounded rectangle plus handle) clink at the bottom.
- **320 px wide:** 12 px side padding. Text wraps (`word-break: keep-all` for ko) and is never truncated.
- **prefers-reduced-motion:** no fade-ups, no shake, no confetti. Background changes are instant, and stars are static.

## Sound (off by default; Web Audio only after a user gesture)

- Clink: two sines at 1,320 Hz and 1,980 Hz, 180 ms exponential decay, gain 0.08.
- Tier divider: a soft 440 → 660 Hz sweep, 200 ms, gain 0.05.
- The mute setting is saved.

## Copy and share

- Copy uses `navigator.clipboard.writeText`, falling back to a hidden textarea and `execCommand('copy')`. A toast confirms success or failure.
- Copy text:
  - ko: `🍻 오늘의 건배사 #{n}\n{intro}\n선창: {call}\n후창: {response}\n— 하루한판 끝없는 건배사 play.mesisi.net`
  - en: `🍻 Toast #{n} of the day\n{intro}\nLead: {call}\nEveryone: {response}\n— Daily Toybox Endless Toasts play.mesisi.net`
- Acrostic cards insert their 3 letter lines after the intro line.

## Strings

| key | ko | en |
|---|---|---|
| appTitle | 끝없는 송년회 건배사 | Endless Year-End Toasts |
| sub | 내려갈수록 이상해져요 | It gets weirder the deeper you go |
| depth | #{n}번째 · 깊이: {tier} | #{n} · Depth: {tier} |
| tier1..4 | 실전 / 유쾌 / 엉뚱 / 우주 | Practical / Playful / Odd / Cosmic |
| lineLead | 제가 "{call}" 하면 | When I say "{call}", |
| lineResp | "{response}"로 받아 주세요! | you say "{response}"! |
| toTop | 맨 위로 | Back to top |
| cheers | 건배! | Cheers! |
| prev / next / close | 이전 / 다음 / 닫기 | Previous / Next / Close |
| save / saved / unsave | 저장 / 저장했어요 / 저장 취소했어요 | Save / Saved / Removed |
| savedTitle | 저장한 건배사 ({k}/20) | Saved toasts ({k}/20) |
| savedEmpty | 아직 없어요. 마음에 드는 건배사에 ⭐를 눌러 보세요 | Nothing yet. Tap ⭐ on a toast you like |
| savedFull | 20개까지 저장돼요. 하나 지우고 다시 눌러 주세요 | You can save up to 20. Remove one and try again |
| copied / copyFail | 복사했어요 / 복사하지 못했어요 | Copied / Could not copy |
| soundOn / soundOff | 소리 켜기 / 소리 끄기 | Sound on / Sound off |
| best | 최고 깊이 #{max} | Deepest: #{max} |
| foot | 잔은 물이든 음료수든 무엇이든 OK | Any cup works: water, juice, tea |
| delete | 삭제 | Delete |

## localStorage (inside try/catch, prefix `etst:`)

- `etst:sound`: "1" or "0", default "0".
- `etst:pins`: a JSON array, max 20, of `{date, n, tier, intro, call, response, note, acro?}` in both languages (`ko` and `en` objects), so a pin survives the date change.
- `etst:max`: the deepest n reached, shown as the `best` string under the title.

## Edge cases

- **Midnight while open:** keep the seed from page load and do not reshuffle until reload.
- **Language:** ko and en are index-aligned, so `?lang=en` shows the same toast at the same n.
- **Saving the same toast twice:** a `{date, n}` that is already saved toggles to unsave.
- **Long feeds:** past #400, remove DOM cards that are more than 200 above the viewport and replace them with a spacer of the same height. This keeps the scroll position, and the depth meter still shows true n.
- **Presenter at the feed end:** pressing next generates further cards. Previous on #1 does nothing (button disabled).
- **Resize:** pure CSS layout, and presenter text uses clamp. No re-generation.
- **Hidden page:** pause the star twinkle and confetti requestAnimationFrame loop.
- **localStorage blocked:** everything works, but pins only last for the session.
- **`location.hash === '#demo'`:** use the fixed date `2026-12-01` and show the feed at the top with card #1 visible (for QA thumbnails). `#demo-deep` scrolls to #160 so the cosmic look can be checked.

## Must not

- No network of any kind; keep it under 120 KB.
- No alcohol imagery or pressure: no 🍺🍷🥂 emoji, no "원샷", "부어라 마셔라" or drink counting. Cups are neutral mugs and the copy says any drink works. The 🍻 in the share text is replaced by 🎉.
- No toasts that put pressure on juniors or rank people, or that mock bosses, genders, regions, ages or professions. Objects and the universe are the only "targets".
- No real brands, companies, celebrities or politics. Do not copy any famous viral 건배사 list verbatim; every pair above is original wording.
- No embedded fortune or health claims.
- No alert, confirm, prompt, window.open or navigation. No sound autoplay.
