# Idea and spec: 수능 끝 뭐 하지? / What Now After the CSAT?

slug `csat-after-plans`

## Concepts scored

Scores run from 1 to 5 in each column. Korean search and share demand scores are editorial estimates based on the November 23 research and the concepts’ likely use in group chats.

| Concept | Category | First 10 seconds | Originality | Korean search/share demand | One-HTML buildability | Total |
|---|---|---:|---:|---:|---:|---:|
| **수능 끝 뭐 하지? / What Now After the CSAT?** — Draw a small plan for your first free afternoon. Pick a mood or draw immediately, then copy the plan into a group chat. | `random` | 5 | 4 | 4 | 5 | **18** |
| 직구 총비용 비교 / Overseas Order Cost Compare — Enter a checkout total, shipping and any fees you already know, then see the difference from a local price. A filled example shows how shipping can erase a discount. | `tools` | 4 | 3 | 5 | 5 | 17 |
| 다음 정류장에서 내려요 / Next Stop, Please! — Read your stop name and hit the bell while it’s on the bus display. Each successful stop makes the route advance faster. | `games` | 5 | 4 | 3 | 4 | 16 |

**Pick 수능 끝 뭐 하지?** The research surfaces post-exam plans as a seasonal hook. A single tap gives users something they can do today and send to friends. The subject is reclaiming a free afternoon after the CSAT. The other candidates cover overseas checkout costs and bus stops.

## Meta

- slug `csat-after-plans`, category `random`, kind `tool`, aspect `9/16`, date `2026-11-23`
- Tags — ko `수능 끝`, `수능 끝나고 뭐 하지`, `오늘 뭐 하지`. en `CSAT`, `post-exam plans`, `activity picker`.
- **Title** — ko `수능 끝 뭐 하지?` / en `What Now After the CSAT?`
- **Desc ko** — 수능 끝난 오늘, 집에서 쉴지 잠깐 나갈지 고민된다면 기분에 맞는 할 일을 한 장 뽑아 보세요. 마음에 들면 친구에게 보내요.
- **Desc en** — Pick a mood and draw a small plan for your first free afternoon after the CSAT. Copy a favorite to share with friends.
- **Howto ko** — 지금 기분을 고르고 ‘오늘 할 일 뽑기’를 누르세요. 바로 뽑아도 돼요. 마음에 드는 카드가 나오면 ‘텍스트 복사’를 눌러요.
- **Howto en** — Choose a mood or tap “Draw a plan” right away. When a card feels right, tap “Copy text” to share it.
- **About ko** — 수능이 끝난 뒤 쉬고, 걷고, 친구를 만나는 데 작은 핑계가 되어 주는 할 일 카드예요.
- **About en** — A deck of small excuses to rest, take a walk, or catch up with friends after Korea’s college entrance exam.

## Pitch

An illustrated school timetable has one blank slot marked **자유 시간 / Free time**. Tap once to turn that slot into a plan, such as taking a twenty-minute walk and photographing three things you usually pass. Each card has a title, an approximate duration, and one concrete thing to do.

## Flow and screens

1. **START.** Show the title, intro, and a timetable with one open slot. Below it, show four mood choices in a two-by-two grid and the primary draw button. On a first visit, **아무거나 / Anything** is selected. Choosing a mood updates the selection and leaves the draw button available. A first tap on the draw button takes the user straight to a readable result.
2. **RESULT.** Replace the open slot with the selected card. Show **오늘의 할 일 / Today’s plan**, the card’s mood and duration, its title, and its instruction. Put **한 장 더 / Draw again** in the primary position, followed by **텍스트 복사 / Copy text** and **기분 바꾸기 / Change mood**. Drawing again uses the current filter. Changing mood returns to START with the current selection and session history intact.
3. **MANUAL COPY.** If automatic copy fails or is unavailable, replace the result card area with a labeled, read-only text field containing the exact share text. Select its contents where supported. Show the manual copy hint and a **닫기 / Close** button. Closing restores the same card and returns focus to **텍스트 복사 / Copy text**.

## Controls

- **Touch and mouse** — Tap or click the mood labels and buttons. Each interactive target is at least 44 × 44 CSS pixels. Keep native selection and touch behavior in the manual copy field.
- **Keyboard** — Use a native radio group for moods. Tab moves into and out of the group, and arrow keys change the selected mood. Space or Enter activates a focused button. Escape closes manual copy. Leave text-selection and copy shortcuts to the browser.
- **Focus and announcements** — Focus the result heading after the first draw. On redraw, leave focus on the button and announce the new card title and duration in a polite live region. Returning to START focuses the selected mood. Automatic copy success is announced in the same live region. Opening manual copy focuses the text field.

## Plan deck

Use nine fixed cards. Duration is approximate and includes the activity itself. Each card uses the title and instruction exactly as listed.

| ID | Mood | Min | Title ko | Title en | Instruction ko | Instruction en |
|---|---|---:|---|---|---|---|
| `ceiling` | `rest` | 10 | 천장 구경 10분 | Ten minutes with the ceiling | 알림을 잠깐 끄고 누워요. 일어나면 물 한 잔 마셔요. | Silence your notifications for a bit and lie down. Have a glass of water when you get up. |
| `playlist` | `rest` | 15 | 밀어 둔 노래 세 곡 | Three songs you saved for later | 듣고 싶었던 노래 세 곡을 골라 처음부터 끝까지 들어요. | Pick three songs you’ve been meaning to hear and play them from start to finish. |
| `slow-breakfast` | `rest` | 25 | 늦은 아침 한 접시 | A late breakfast | 집에 있는 걸로 한 접시 차려서, 영상 하나 틀지 않고 천천히 먹어요. | Make a plate with what you have at home and take your time eating it with the screen off. |
| `three-photos` | `out` | 20 | 지나치던 것 세 장 | Three things you usually pass | 익숙한 길을 걸으며 평소 지나치던 것 세 가지를 사진으로 남겨요. | Walk a familiar route and photograph three things you usually pass without looking. |
| `long-way` | `out` | 15 | 집까지 한 블록 돌아가기 | Take the long way home | 집 근처에서 익숙한 길 한 블록을 돌아와요. 눈에 띄는 색 하나를 기억해요. | Take an extra block on a familiar route near home. Remember one color that catches your eye. |
| `bench` | `out` | 20 | 벤치에 앉아 한 곡 | One song on a bench | 가까운 벤치에 앉아 좋아하는 노래 한 곡을 듣고 돌아와요. | Sit on a nearby bench, listen to one favorite song, then head back. |
| `voice-note` | `friends` | 5 | 해방 소식 10초 | A ten-second voice note | 친구에게 시험이 끝나고 가장 먼저 하고 싶었던 일을 음성 메시지로 보내요. | Send a friend a voice note about the first thing you wanted to do after the exam. |
| `one-song-each` | `friends` | 15 | 각자 한 곡씩 | One song each | 친구와 요즘 듣는 노래를 한 곡씩 바꿔 듣고, 제일 좋았던 부분을 알려 줘요. | Swap one song each with a friend, listen, and tell each other your favorite part. |
| `walk-invite` | `friends` | 30 | 동네 한 바퀴 같이 | A lap around the neighborhood | 가까이 사는 친구에게 동네 한 바퀴 같이 걸을지 물어봐요. | Ask a friend who lives nearby if they’re up for a walk around the neighborhood. |

## Draw rules

- Mood IDs are `any`, `rest`, `out`, and `friends`. `any` includes the whole deck. The other choices include the three cards tagged with that mood.
- Keep a `seen` set for each filter in memory. Each draw picks uniformly from that filter’s unseen cards. When its pool is exhausted, clear its set before drawing.
- Exclude the most recently displayed card from the current draw. If that leaves an empty candidate list on a filter switch, keep the current cycle and allow its sole unseen card on the draw after the first different card. For the current draw, pick uniformly from the filter’s other cards without clearing its set.
- Update the active filter’s set and the most recently displayed card after each draw. Changing moods or returning from manual copy does not draw a card. Reloading starts a new session.

## Visual design

- Fill the iframe with a warm cream background (`#F5EFDF`), dark blue ink (`#18283D`), and blue controls (`#254BB5` with white text). Give result cards a pale yellow fill (`#FFE59A`) and a pair of ruled lines that echo a school timetable. Use system fonts.
- Use one centered column, up to 440 px wide, with 12 px side padding at 320 px. At 320 × 480, condense vertical gaps and decorative rules to fit the screen and actions. Anchor the copy status in a reserved line so it cannot push buttons down. At increased text zoom, let the card’s content scroll inside the fixed-height layout while keeping the actions reachable. The page itself does not scroll.
- Indicate selected moods with a filled radio mark and a border as well as color. Keep card title, instruction, and buttons as real HTML text.
- Give a new card a brief, optional 150 ms slide into its timetable slot. Show the text immediately. Disable the transition with `prefers-reduced-motion` and while the document is hidden. The item is silent.

## Copy

Build the share text in the active language using the exact template below. Attempt `navigator.clipboard.writeText` from the copy button’s user gesture. Show the success message only after the promise resolves. If it rejects or the API is absent, open MANUAL COPY. Ignore a pending completion if the user has changed cards or left RESULT.

```text
수능 끝, 오늘 할 일
{title} · 약 {minutes}분
{instruction}
```

```text
After the CSAT, today's plan
{title} · About {minutes} min
{instruction}
```

## Strings

Use these strings together with the Meta and Plan deck copy. Resolve `?lang=ko` or `?lang=en` first. For a missing or unsupported value, use Korean when `navigator.language` starts with `ko` and English otherwise. Set `<html lang>` and the document title accordingly.

| Key | ko | en |
|---|---|---|
| `appTitle` | 수능 끝 뭐 하지? | What Now After the CSAT? |
| `intro` | 시험 끝! 지금 기분에 맞는 할 일을 한 장 뽑아 봐요. | Exam over! Draw a small plan that fits your mood. |
| `freeSlot` | 자유 시간 | Free time |
| `moodLabel` | 지금 기분 | What are you up for? |
| `moodAny` | 아무거나 | Anything |
| `moodRest` | 집에서 쉬기 | Stay in |
| `moodOut` | 잠깐 나가기 | Step outside |
| `moodFriends` | 친구와 함께 | With a friend |
| `draw` | 오늘 할 일 뽑기 | Draw a plan |
| `resultHeading` | 오늘의 할 일 | Today’s plan |
| `duration` | 약 {minutes}분 | About {minutes} min |
| `resultAnnouncement` | 새 카드, {title}. 약 {minutes}분. | New card, {title}. About {minutes} min. |
| `drawAgain` | 한 장 더 | Draw again |
| `copy` | 텍스트 복사 | Copy text |
| `copied` | 복사했어요. | Copied. |
| `changeMood` | 기분 바꾸기 | Change mood |
| `manualHeading` | 직접 복사하기 | Copy manually |
| `manualHint` | 아래 문구를 길게 누르거나 키보드로 선택해 복사하세요. | Touch and hold the text below, or select it with the keyboard and copy. |
| `manualTextLabel` | 공유할 문구 | Text to share |
| `close` | 닫기 | Close |

## localStorage

- `csat-after-plans:mood` stores the last selected filter as `any`, `rest`, `out`, or `friends`. Default to `any` for missing or invalid values.
- Wrap reads and writes in `try/catch`. Keep draw history, current card, and copy status in memory for the current session.

## Edge cases

- If storage is blocked or full, keep the mood selection and draw flow usable for the current session.
- If the user taps Copy repeatedly while a write is pending for the same card, reuse that attempt. Clear the visible success message on redraw or screen change.
- If manual text selection is unavailable on a device, keep the text visible and selectable through standard platform controls. Closing the panel retains the current draw.
- Resizing or rotating the device preserves the current screen, card, selection, and copy text.
- `#demo` opens RESULT on `three-photos` with the `out` filter for thumbnail QA. Skip preference writes in demo mode.
- Before publishing, run `npm test`, `npm run build`, and `npm run qa -- --thumbs`. Check the generated result thumbnail and exercise both languages, focus order, storage failure, copy fallback, and redraw behavior at 320 × 480.

## Must not

- No requests, analytics, external assets, fonts, or libraries. Ship the item as one self-contained `index.html` alongside `meta.json` and the QA-generated thumbnail.
- No real brand names, named venues, copied campaign designs, official-looking exam forms, or claims about current discounts.
- No score, school, name, location, account, or exam details collected. Avoid jokes about grades, admissions, retaking the exam, or how anyone ought to feel after it.
- No dialogs, pop-ups, navigation away, autoplay sound, or automatic sharing.