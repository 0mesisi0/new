# Idea and spec: 엉뚱한 버스 도착 전광판 / Odd Bus Arrivals

## Concepts scored

Each criterion is scored from 1 to 5. Korean search and share scores are editorial estimates based on the repository research and backlog.

| Concept | Category | First 10 seconds | Originality | Korean search/share demand | One-file buildability | Total |
|---|---|---:|---:|---:|---:|---:|
| **엉뚱한 버스 도착 전광판 / Odd Bus Arrivals**. Tap once at an illustrated winter bus stop to reveal a fictional arrival notice worth sending to a friend. | **weird** | 5 | 4 | 4 | 5 | **18** |
| 장터 대기시간 계산기 / Market Queue Estimator. Enter how many groups are ahead and how many were served during an observation period to estimate the wait. | tools | 4 | 3 | 4 | 5 | 16 |
| 정규식 첫 매치 / First Regex Match. Choose a sample pattern and see which parts of a sentence it matches, with a short explanation for each preset. | tech | 4 | 3 | 3 | 4 | 14 |

**Pick Odd Bus Arrivals.** The first tap delivers the entire joke. The compact result is designed for screenshots and chat sharing. The brief’s research points to one-action novelty sites and outings at year-end, which inform the interaction and winter setting. The regex concept comes from the backlog. [Daily research](pipeline/jobs/2026-11-25-pending/01-research.md) · [Ideas backlog](play/ideas.md)

## Meta

slug `odd-bus-arrivals`

| Field | Value |
|---|---|
| `date` | `2026-11-25` |
| `category` | `weird` |
| `kind` | `tool` |
| `aspect` | `9/16` |
| `tags.ko` | `버스정류장`, `겨울`, `심심풀이` |
| `tags.en` | `bus stop`, `winter`, `novelty` |

| Field | ko | en |
|---|---|---|
| `title` | 엉뚱한 버스 도착 전광판 | Odd Bus Arrivals |
| `desc` | 겨울 정류장 전광판을 눌러 엉뚱한 버스 도착 안내를 읽어 보세요. 마음에 드는 안내는 저장하거나 복사해서 친구에게 보낼 수 있어요. | Tap a winter bus board for an absurd arrival notice. Save your favorite or copy it to send to a friend. |
| `howto` | ‘도착 안내 보기’를 누르고, 다른 안내가 궁금하면 ‘다음 안내’를 누르세요. 마음에 드는 안내는 ‘찜하기’로 하나 저장할 수 있어요. | Select “Check arrivals” to reveal a notice. Choose “Next notice” for another, or select “Save favorite” to keep one on this device. |
| `about` | 겨울 정류장에서 버스를 기다리다 떠올린 장난이에요. 모든 버스 이름과 도착 안내는 지어냈어요. | A little joke about waiting for the bus in winter. All buses and arrival notices are fictional. |

## Pitch

A yellow-lit bus shelter sits on a quiet winter street. One tap flips the board to **이불행 / Blanket Express**, whose arrival estimate is **5분만 더 / Five more minutes**. Underneath, a second line explains that the bus has pulled its blanket back up. Six hand-written notices use the same three-line format so each fits in a screenshot and reads naturally as plain text.

## Flow

1. **START.** Show the title, a one-line instruction, and an illustrated board with the waiting message. Keep the fiction label inside the board. `Check arrivals` opens the first notice. `Open favorite` appears when a valid saved notice exists.
2. **NOTICE.** Flip the board once to reveal the bus name, arrival estimate, and detail. Show `Next notice`, `Save favorite` or `Remove favorite`, `Copy notice`, and `Back`. Feedback appears inline below the controls. Move keyboard focus to `Next notice` on entry and announce the three lines through a polite live region.
3. **Next notice.** On `Check arrivals`, build a deck starting with `blanket`, followed by the other five IDs shuffled with Fisher–Yates. Each advance consumes one entry. After the last entry, reshuffle all six and swap the first two if the first repeats the last displayed ID. Opening a favorite from START shows that notice immediately and initializes the deck with the five other IDs.
4. **Favorite.** Saving replaces the previous favorite. Choosing `Remove favorite` clears the current favorite. The saved state is reflected in the button label. `Back` returns to START, clears transient feedback, and focuses `Check arrivals`.

## Controls

- **Touch and mouse:** native buttons handle tap and click. Every target is at least 44 × 44 CSS px. One activation advances one notice, and input stays available during the decorative flip.
- **Keyboard:** Tab and Shift+Tab follow the visual order. Enter and Space activate the focused button. Escape on NOTICE returns to START. Handle Escape only while focus is inside the item and prevent its default only when the shortcut runs.
- **Touch behavior:** use `touch-action: manipulation` on buttons. The board has no drag or swipe controls.

## Notice set

| ID | ko name | ko arrival | ko detail | en name | en arrival | en detail |
|---|---|---|---|---|---|---|
| `blanket` | 이불행 | 5분만 더 | 버스가 이불을 다시 덮었어요. | Blanket Express | Five more minutes | The bus pulled its blanket back up. |
| `pocket` | 주머니행 | 손이 따뜻해지면 | 버스도 두 손을 주머니에 넣고 있어요. | Pocket Local | When your hands warm up | The bus has both hands in its pockets too. |
| `detour` | 한 바퀴 더행 | 모퉁이 한 번 더 | 가로등한테 인사를 깜빡했대요. | One More Loop | One more corner | It forgot to say hello to the streetlamp. |
| `soup` | 국물 한 모금행 | 한 모금 뒤 | 버스가 후후 불고 있어요. | Soup Stop Shuttle | In one sip | The bus is blowing on its soup. |
| `echo` | 메아리행 | 곧, 곧, 곧 | 안내 방송이 먼저 와서 기다리고 있어요. | Echo Express | Soon, soon, soon | The announcement got here first and is waiting. |
| `slow` | 천천히행 | 서두르지 않는 중 | 오늘은 쉼표마다 정차해요. | Take It Slow Local | Taking its time | Today it stops at every comma. |

## Visual design

- Fill the iframe with a deep navy streetscape (`#131C2C`), a slate shelter (`#28374C`), and a warm paper-like board (`#FFF0CD`) with dark ink (`#382C21`). Draw the shelter and bench in CSS. Use system fonts and keep the notice itself as selectable DOM text.
- On START, the board is the main illustration. On NOTICE it holds the fiction label, bus name, arrival line in the largest type, and one detail sentence. Use color and type size to establish the hierarchy. Keep the board fully visible and screenshot-ready with its fiction label.
- At 320 × 480, use 12 px outer padding, a compact shelter, and a two-by-two control grid on NOTICE. Allow Korean and English labels to wrap. Let the background stretch on desktop and center the board and controls in a column up to 420 px wide. Use a viewport-height grid and no page scrolling.
- On notice changes, apply a 140 ms CSS flip to a decorative layer while rendering the complete text immediately. Under `prefers-reduced-motion`, swap the board instantly. The street scene is static. The item is silent.

## Export and copy

`Copy notice` copies four localized lines in order: fiction label, bus name, arrival estimate, and detail. Call `navigator.clipboard.writeText` from the user activation when available. If it rejects or is unavailable, display the localized copy-failure message and leave the board text selectable. Use inline feedback, avoid stealing focus, and clear feedback on advance or return to START.

## Strings

Use one `ko`/`en` dictionary for interface copy and notice text. Select an exact `?lang=ko` or `?lang=en` first. Otherwise use Korean when the primary language subtag of `navigator.language` is `ko`, and English for all other cases. Set `<html lang>` and the document title from the selected locale. The notice table supplies the full notice copy and its accessible announcement in display order. The remaining strings are below.

| Key | ko | en |
|---|---|---|
| `appTitle` | 엉뚱한 버스 도착 전광판 | Odd Bus Arrivals |
| `startSub` | 오늘은 어떤 버스가 올까요? | What bus is coming today? |
| `waiting` | 새 안내를 기다리는 중 | Waiting for a notice |
| `fictionLabel` | 가상 버스 안내 | Fictional bus notice |
| `start` | 도착 안내 보기 | Check arrivals |
| `openFavorite` | 찜한 안내 보기 | Open favorite |
| `next` | 다음 안내 | Next notice |
| `saveFavorite` | 찜하기 | Save favorite |
| `removeFavorite` | 찜 해제 | Remove favorite |
| `favoriteSaved` | 이 기기에 찜했어요. | Saved on this device. |
| `favoriteSessionOnly` | 이 탭에서만 찜했어요. | Saved for this tab only. |
| `favoriteRemoved` | 찜을 해제했어요. | Favorite removed. |
| `favoriteRemoveFailed` | 이 탭에서 찜을 해제했어요. 새로고침하면 다시 나타날 수 있어요. | Removed for this tab. It may reappear after reload. |
| `copy` | 안내 복사 | Copy notice |
| `copied` | 안내를 복사했어요. | Notice copied. |
| `copyFailed` | 복사할 수 없어요. 전광판의 글을 직접 선택해 주세요. | Couldn’t copy. Select the text on the board to copy it manually. |
| `back` | 처음으로 | Back |

## localStorage

- `odd-bus-arrivals:favorite:v1` stores one notice ID as a plain string. Read it once at startup and accept only the six IDs in the notice set. Keep the active favorite in memory and update it immediately when the user saves or removes it.
- Wrap each read, write, and removal in `try/catch`. If saving fails, keep the favorite in memory and show `favoriteSessionOnly`. If removal fails, clear the in-memory favorite and show `favoriteRemoveFailed`. Persist only the favorite ID.

## Edge cases

- Missing or invalid saved IDs behave as an empty favorite. Changing languages resolves the same ID against the new locale.
- Rapid or repeated activations advance once per activation. The notice text, favorite label, and copy payload always reflect the currently displayed ID. Ignore stale clipboard feedback if another notice or screen has opened before the promise settles.
- Resizing preserves the current screen, deck, and notice. When the document hides, cancel the decorative flip and keep the revealed text visible on return. There is no running timer.
- With `location.hash === '#demo'`, open the `blanket` notice directly with a fixed deck order following the notice table. Skip storage reads and writes. Favorites in demo mode use the same tab-only feedback as blocked storage.
- Before publishing, run `npm test`, `npm run build`, and `npm run qa -- --thumbs`. Check START and NOTICE in both languages at 320 × 480 and desktop sizes, including keyboard navigation, blocked storage, clipboard failure, and reduced motion. Use the generated thumbnail.

## Must not

- No network calls, external assets, fonts, analytics, permissions for location, or live transit feeds. Put the interaction, styling, and illustration in `index.html` and the metadata in `meta.json`.
- No real routes, stop names, operators, people, trademarks, or imitation of an actual transit interface.
- No automatic cycling, countdowns, audio, dialogs, new windows, or navigation away from the iframe.
- No horizontal or vertical page scrolling, text truncation, or pointer-only interactions.