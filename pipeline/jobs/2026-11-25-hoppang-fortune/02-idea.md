# Idea and spec: 호빵 속 오늘의 운세 / Steamed Bun Fortune

Agent: Claude (opus), planner. Design notes are merged in (palette, layout, motion).

## Concepts scored

Each concept is scored 1–5 on four things: value in the first 10 seconds, originality, Korean search/share demand, and buildability in one HTML file. The maximum is 20.

| Concept | Category | Score | Verdict |
|---|---|---|---|
| 연탄 배달 쌓기: stack coal briquettes on a hand cart up an icy alley, with the cursor acting as the cart (research row 3) | games | 4/4/3/5 = 16 | Good, but the site already has many games. Keep it for a later games slot. |
| 연말정산 놓친 공제 체크리스트 (research row 11) | tools | 3/2/5/2 = 12 | Strong demand, but the numbers need verified 국세청 figures and the only source today is a low-confidence blog. Not safe to build yet. |
| **호빵 속 오늘의 운세** | **fortune** | **5/4/5/5 = 19** | **Picked.** Tearing a hot steamed bun open is a tactile reveal, in line with the "촉각 대리 체험" trend in research row 6. It also taps steady "오늘의 운세" search demand. The subject (호빵) is not used by any item or queued spec, and the only other fortune items are year-end-receipt and trend-lifespan-fortune. |

## Meta

- slug `hoppang-fortune`, category `fortune`, kind `tool`, aspect `9/16`, date `2026-11-25`
- tags: ko `오늘의운세`, `호빵`; en `daily-fortune`, `steamed-bun`
- title: ko `호빵 속 오늘의 운세`; en `Steamed Bun Fortune`
- desc ko: 김이 모락모락 나는 찜기에서 호빵 하나를 골라 반으로 쭉 갈라 보세요. 속재료에 따라 오늘의 한 줄 운세와 행운의 온도가 나와요.
- desc en: Pick a bun from a steaming basket and pull it apart. The filling inside sets today's one-line fortune and your lucky temperature.
- howto ko: 찜기 뚜껑을 눌러 열고 호빵 세 개 중 하나를 고르세요. 호빵을 양옆으로 끌어당기거나 세 번 톡톡 누르면 반으로 갈라져요(스페이스·엔터도 돼요). 같은 이름이면 오늘 하루 동안 같은 운세가 나오고, 자정이 지나면 새 호빵이 쪄져요.
- howto en: Tap the lid to open the steamer and choose one of three buns. Drag it apart sideways, or tap it three times (Space or Enter works too). The same name gets the same fortune all day, and fresh buns steam up after midnight.
- about ko: 운세는 재미로 만든 거예요. 입력한 이름은 이 기기 밖으로 나가지 않아요. 뜨거운 호빵은 호호 불어서 드세요.
- about en: Fortunes are just for fun. Your name never leaves this device. Blow on a hot bun before you bite.

## Pitch

A bamboo steamer sits on a small stall counter on a snowy night, with steam curling up from it.

1. The user types an optional nickname and taps the steamer lid. The lid lifts off in a burst of steam.
2. Three plump white buns sit inside. The user taps one to pick it.
3. The chosen bun fills the screen. Dragging it apart sideways (or tapping three times) stretches it, cracks it and splits it into two halves. Steam bursts out and the glossy filling shows.
4. The filling type (red bean, pizza, custard...) sets the fortune theme. A fortune card slides up with:
   - the filling name
   - a one-line fortune
   - the lucky temperature
   - the lucky winter item
   - the 따끈 지수 (1–5 steam marks)
5. "Save image" exports the card as a PNG.

The result is deterministic from the nickname, today's local date and the chosen bun (1–3), so friends can compare and the fortune stays the same all day.

## Flow

1. **START**
   - The title, a one-line subtitle, a nickname field (optional, max 8 chars) and the closed steamer drawn in CSS/SVG, with steam rising from under the lid.
   - A big button "찜기 열기" opens the steamer. Tapping the steamer itself does the same.
   - If localStorage holds a pick for today under the same name, a secondary button "오늘의 호빵 다시 보기" goes straight to RESULT, with no animation.
2. **OPEN**
   - The lid lifts and slides off over 450 ms, with a steam burst of about 30 particles.
   - Three buns show in a row, each with a slight idle "breathing" scale (1 → 1.03, 1.6 s loop).
   - Hint text: "마음 가는 호빵을 골라요".
   - Tapping a bun pops it (scale 1.15) and moves to SPLIT after 250 ms.
   - Input is ignored for 300 ms after the lid opens, so a double tap cannot skip the choice.
3. **SPLIT**
   - The chosen bun is centered at about 60% of the screen width.
   - **Drag:** a horizontal drag stretches the bun. Its width scales with the drag distance, up to 1.25×, and a crack line appears and widens. Once the distance reaches max(80 px, 25% of the bun width), the bun splits.
   - **Release early:** the bun springs back over 200 ms and keeps any crack progress already made.
   - **Tap:** each tap adds a crack stage (1/3, 2/3, then split), with a 4 px wobble for 100 ms.
   - **Split:** the two halves slide 30% apart and tilt ±8°, the filling shows as a glossy blob in the filling color, and a large steam burst rises. The fortune card then slides up from the bottom over 400 ms.
4. **RESULT**
   - The split bun stays at the top, about 35% of the height, still steaming.
   - The fortune card shows:
     - the filling emoji and name (e.g. "🫘 팥 호빵")
     - the theme title
     - the fortune line, 18 px bold
     - 행운의 온도 {n}°C
     - 행운의 아이템 {item}
     - 따끈 지수, as 1–5 steam marks
     - the date and the nickname
   - A sticky bottom bar holds [이미지 저장] [텍스트 복사] [처음으로].
   - **Rare filling:** the card gets a gold border, and confetti in steam colors falls for 1.5 s.

## Controls

- **Pointer:** tap or click everything. On SPLIT, drag left or right anywhere on the bun. Both directions count, and the distance is measured as the absolute horizontal offset from the pointer-down point. Use `setPointerCapture`.
- **Keys:**
  - START: Enter opens the steamer.
  - OPEN: 1/2/3 or ArrowLeft/ArrowRight to move the highlight, then Enter.
  - SPLIT: Space or Enter adds a crack stage.
  - RESULT: S saves, C copies, R or Escape goes to START.
  - M toggles sound on every screen.
- **Touch and layout:** buttons are at least 44 px tall, and each bun is a tap target of at least 88 px. The play area uses `touch-action:none` and `preventDefault` on game keys. The result card scrolls internally if it is too tall; the page never scrolls.

## Fillings and odds

The PRNG is mulberry32(seed), and each value below is one draw. Normal fillings split the remaining 96% evenly, 12% each.

| id | emoji | ko name | en name | color | theme ko / en | odds |
|---|---|---|---|---|---|---|
| redbean | 🫘 | 팥 호빵 | Red Bean Bun | #7a2e2e | 든든한 하루 / A Solid Day | 12% |
| veggie | 🥬 | 야채 호빵 | Veggie Bun | #6a9a3a | 차곡차곡 하루 / A Step-by-Step Day | 12% |
| pizza | 🍕 | 피자 호빵 | Pizza Bun | #e0703a | 신나는 하루 / A Fun Day | 12% |
| sweetpotato | 🍠 | 고구마 호빵 | Sweet Potato Bun | #e6a23c | 달달한 하루 / A Sweet Day | 12% |
| pumpkin | 🎃 | 단호박 호빵 | Pumpkin Bun | #f2b134 | 반짝이는 하루 / A Bright Day | 12% |
| custard | 🍮 | 커스터드 호빵 | Custard Bun | #f5d77a | 부드러운 하루 / A Gentle Day | 12% |
| bulgogi | 🥩 | 불고기 호빵 | Bulgogi Bun | #8b5a2b | 힘이 나는 하루 / A Power-Up Day | 12% |
| choco | 🍫 | 초코 호빵 | Chocolate Bun | #5a3a26 | 달콤한 반전의 하루 / A Sweet-Twist Day | 12% |
| empty | 🤍 | 빈 호빵 | Empty Bun | #ffffff (dashed outline) | 무엇이든 채울 수 있는 날 / A Day to Fill Your Way | 3% (rare) |
| golden | ✨ | 황금 속 호빵 | Golden Bun | #ffd54a (shimmer) | 오늘의 대박 예감 / Jackpot Vibes Today | 1% (rare) |

## Fortune lines

Each filling has 2 lines, and one is picked by seed.

| filling | ko | en |
|---|---|---|
| redbean | 속이 꽉 찬 하루, 미뤄 둔 일 하나가 쉽게 풀려요. | A well-filled day: one task you put off turns out easy. |
| redbean | 오늘은 묵직하게 버티는 사람이 이겨요. | Today the steady one wins. |
| veggie | 작은 것부터 하나씩 하면 저녁엔 뿌듯해요. | Start small, and by evening you feel proud. |
| veggie | 오늘의 균형 감각이 당신을 살립니다. | Your sense of balance saves the day. |
| pizza | 뜻밖의 수다에서 좋은 아이디어가 튀어나와요. | A random chat sparks a great idea. |
| pizza | 오늘은 쭉 늘어나는 치즈처럼 여유롭게 가요. | Stretch through today like melted cheese. |
| sweetpotato | 따뜻한 말 한마디가 두 배로 돌아와요. | One warm word comes back to you twice. |
| sweetpotato | 퇴근길 간식이 오늘의 하이라이트가 됩니다. | A snack on the way home is today's highlight. |
| pumpkin | 노란빛 행운이 오후에 살짝 들러요. | A little yellow luck drops by in the afternoon. |
| pumpkin | 오늘은 웃는 얼굴이 가장 큰 무기예요. | A smile is your strongest move today. |
| custard | 서두르지 않아도 다 제때 도착해요. | No need to rush, everything arrives on time. |
| custard | 부드럽게 넘기면 오늘은 술술 풀려요. | Go soft and the day flows smoothly. |
| bulgogi | 든든히 먹은 만큼 힘이 나는 날이에요. | Eat well and the energy follows. |
| bulgogi | 오늘 내린 결정은 생각보다 맛있게 익어요. | Today's decision turns out tastier than expected. |
| choco | 예상 못 한 반전이 기분 좋게 찾아와요. | A surprise twist arrives in a good way. |
| choco | 쓴맛 뒤에 단맛, 오후가 더 좋아요. | Bitter first, sweet later: the afternoon is better. |
| empty | 비어 있다는 건 뭐든 채울 수 있다는 뜻! 오늘은 하고 싶은 걸 골라요. | Empty means anything fits! Today you choose. |
| empty | 속은 비었지만 마음은 꽉 찬 하루예요. | Empty bun, full heart. |
| golden | 1% 확률의 황금 호빵! 오늘은 뭘 해도 괜찮은 날이에요. | A 1% golden bun! Today, whatever you do is fine. |
| golden | 반짝이는 속처럼 오늘 당신도 반짝여요. | Like the golden filling, you shine today. |

Lucky items (pick 1 by seed):

| ko | en |
|---|---|
| 털장갑 | Fuzzy gloves |
| 목도리 | A scarf |
| 보온병 | A thermos |
| 귀마개 | Earmuffs |
| 수면양말 | Fluffy socks |
| 핫초코 | Hot cocoa |
| 털모자 | A knit hat |
| 무릎 담요 | A lap blanket |
| 귤 한 봉지 | A bag of tangerines |
| 손편지 | A handwritten note |

- **Lucky temperature:** an integer from 36 to 72 °C. It is shown only as "행운의 온도 {n}°C / Lucky temperature {n}°C", never as an eating instruction.
- **따끈 지수 / Warmth level:** 1–5. Golden is always 5. Empty is 1, shown with the caption "마음만은 5 / 5 at heart".

## Seed

- dateKey = the local date as `YYYY-MM-DD`.
- seed = FNV-1a 32-bit of `name.trim().toLowerCase() + "|" + dateKey + "|" + bunIndex` (1–3), fed into mulberry32.
- Draw in this fixed order:
  1. the filling roll (0–1)
  2. the line index
  3. the lucky item index
  4. the temperature
  5. the warmth level
  6. 3 cosmetic values for the steam particle seed offsets
- An empty name becomes 손님 / Guest. The empty string is used in the seed, so all guests on the same day and bun match.
- The language does not change the seed, so ko and en show the same filling.

## Screens: visual design

- **Palette:**
  - night background: a gradient from #1b2236 to #2c3a5a
  - stall counter: wood #8a5a3b with a #6b4329 edge
  - steamer bamboo: #d9b77a with lines in #b38e52
  - bun: #fbf7ef with shading in #efe6d6
  - steam: white at 35–60% alpha
  - accent red #e0453d, ink #23262d, card #fffaf0
  - gold #ffd54a
- **Background:** a canvas with about 40 snowflakes behind the stall and a warm orange glow (radial gradient) behind the steamer. DPR is capped at 2. Pause when `document.hidden`, and clamp delta to 50 ms.
- **Steam:** soft circles that rise, grow and fade, with sine drift. There are 6–10 particles at idle and 30–50 during bursts.
- **Bun:** drawn on canvas as an ellipse with a top swirl and shading. When it splits, each half is a semicircle path. The filling is drawn on the cut faces as an irregular blob with a highlight arc.
- **START:**
  - the title at 28 px bold and the subtitle
  - the name input, at least 44 px tall
  - the closed steamer centered, with the red primary button under it
  - a mute toggle (🔊/🔇) at the top right and a footnote at the bottom
- **OPEN:** 3 buns in a row inside the steamer. On screens under 360 px wide they shrink to fit, but each stays at least 88 px. The hint text sits above them.
- **SPLIT:** a large bun, the hint "양옆으로 쭉 당겨 보세요 (톡톡 3번도 OK)" and a 3-dot crack progress indicator.
- **RESULT:** the card at max-width min(92vw, 420px) with 20 px radius and a soft shadow, a stamp-like filling badge in the top-left corner, and a sticky action bar.
- **Small screens:** at 320 px wide, use 16 px side padding and let text wrap rather than truncate.
- **Wide screens:** a centered column with a max width of 480 px. The snow canvas covers the whole window.
- **prefers-reduced-motion:**
  - no idle breathing and no wobble
  - the split is an instant swap to the halves
  - only 4 steam particles and 15 snowflakes
  - no confetti

## Sound (off by default)

- **Lid:** a 60 ms filtered noise burst plus a soft 220 Hz "tok", gain 0.06.
- **Steam hiss:** white noise through a bandpass at about 3 kHz with a 300 ms decay, gain 0.03.
- **Split:** a downward pitch "puff" from 300 Hz to 120 Hz over 120 ms, gain 0.08.
- **Rare filling:** 3 rising sine notes (660/880/1320 Hz), 80 ms each, gain 0.05.
- Web Audio is created only after the first gesture. The mute state is persisted.

## Export and copy

- **Save image:**
  - Draw an offscreen canvas 750 px wide, with a #1b2236 background and 40 px padding.
  - Content: the split bun with its filling, then the card text in the same order as RESULT, then a "play.mesisi.net" watermark in 12 px gray at the bottom right.
  - Export with `toBlob` and an `<a download="hoppang-fortune.png">` click, then revoke the URL after 1 s.
  - On failure, show the saveFail toast.
- **Copy text:**
  - Use `navigator.clipboard.writeText`, falling back to a hidden textarea and `execCommand('copy')`.
  - Show a toast on success or failure. Never use alert.
- **Share text:**
  - ko: `🥟 {name}님의 {M}월 {D}일 호빵 운세 / {emoji} {filling} – {theme} / "{line}" / 행운의 온도 {n}°C · 행운의 아이템 {item} / play.mesisi.net`
  - en: `🥟 {name}'s steamed bun fortune for {Mon} {D} / {emoji} {filling}: {theme} / "{line}" / Lucky temp {n}°C · Lucky item {item} / play.mesisi.net`

## Strings

| key | ko | en |
|---|---|---|
| appTitle | 호빵 속 오늘의 운세 | Steamed Bun Fortune |
| startSub | 찜기를 열고 호빵을 갈라 보세요. 속재료가 오늘을 알려 줘요 | Open the steamer and pull a bun apart. The filling tells your day. |
| namePh | 이름 또는 닉네임 (선택) | Name or nickname (optional) |
| openBtn | 찜기 열기 | Open the steamer |
| againToday | 오늘의 호빵 다시 보기 | See today's bun again |
| foot | 운세는 재미로만 봐 주세요 | Fortunes are just for fun |
| pickHint | 마음 가는 호빵을 골라요 | Pick the bun that calls to you |
| bunLabel | {n}번 호빵 | Bun {n} |
| splitHint | 양옆으로 쭉 당겨 보세요 (톡톡 3번도 OK) | Pull it apart sideways (or tap 3 times) |
| crack1 / crack2 | 쩍… / 쩌억… | Crack... / Craaack... |
| splitDone | 갈라졌다! | It split! |
| todayOf | {M}월 {D}일 {name}님의 호빵 | {name}'s bun for {Mon} {D} |
| luckyTemp | 행운의 온도 | Lucky temperature |
| luckyItem | 행운의 아이템 | Lucky item |
| warmth | 따끈 지수 | Warmth level |
| warmthEmpty | 마음만은 5 | 5 at heart |
| rareBadge | 희귀 호빵! | Rare bun! |
| save / copy / home | 이미지 저장 / 텍스트 복사 / 처음으로 | Save image / Copy text / Back to start |
| saved / saveFail | 이미지를 저장했어요 / 저장에 실패했어요. 화면을 캡처해 주세요 | Image saved / Could not save. Please take a screenshot. |
| copied / copyFail | 복사했어요 / 복사하지 못했어요 | Copied / Could not copy |
| guest | 손님 | Guest |
| soundOn / soundOff | 소리 켜기 / 소리 끄기 | Sound on / Sound off |
| newDay | 자정이 지나 새 호빵이 쪄졌어요 | It's past midnight: fresh buns are ready |
| note | ※ 운세는 재미로 만든 거예요. 뜨거운 호빵은 호호 불어 드세요 | * Just for fun. Blow on a hot bun before you bite. |

Filling names, themes, lines and items come from the tables above, in both languages.

## localStorage (in try/catch, prefix `hbf:`)

- `hbf:name`: the last nickname
- `hbf:sound`: "1" or "0", default "0"
- `hbf:today`: JSON `{ "d": "YYYY-MM-DD", "n": "<name>", "b": 1-3 }`, today's pick for the "다시 보기" button
- `hbf:count`: the number of buns split (not shown in the UI)
- `hbf:rare`: the number of rare fillings found. When it is above 0, START shows "✨×{n}".

Never store fortune text. The fortune is always recomputed from the seed.

## Edge cases

- **Same name and date with a different bun:** allowed, and it may show a different filling. "처음으로" lets the user re-pick, and `hbf:today` is overwritten with the latest pick. This is intentional: it is a toy, not a lock.
- **Name differs only by case or spaces:** the same seed, because the name is trimmed and lowercased.
- **Midnight passes while on RESULT:** keep the shown card. On the next visit to START, recompute dateKey and show the newDay toast once if the stored `d` is older than today.
- **Drag edge cases:** a drag that starts outside the bun is ignored. A vertical drag does nothing. Multi-touch uses only the first pointer. A `pointercancel` springs the bun back.
- **Resize during the split animation:** redraw from state (crack progress, split t). Never restart the animation.
- **Hidden page:** pause, and clamp delta to 50 ms.
- **localStorage blocked:** everything works, the "다시 보기" button is hidden, and the sound defaults to off.
- **Very long names:** cap input at 8 chars. On the card and in the image, ellipsize if wider than the measured width.
- **Demo:** if `location.hash === '#demo'`, use name "", bun 2 and dateKey "2026-12-22" (동지), and jump straight to RESULT. This is for QA thumbnails only.

## Must not

- No network of any kind, no external fonts, and no raster art required. Draw with canvas, CSS and emoji only. Stay under 150 KB.
- No brand names, logos or packaging look of any commercial steamed bun or convenience store. Do not copy the look of existing fortune sites or apps.
- No real fortune-telling claims. No health, diet, money, investment, romance-pressure or exam-result predictions. Every line stays light and positive, with no bad-luck lines.
- Do not present the lucky temperature as food-safety or eating advice.
- No mocking of any group, region, gender, profession or person.
- No alert, confirm, prompt, window.open or navigation. No sound autoplay.
- Do not reuse the year-end receipt layout. This card is a warm, rounded fortune card, not a receipt.
