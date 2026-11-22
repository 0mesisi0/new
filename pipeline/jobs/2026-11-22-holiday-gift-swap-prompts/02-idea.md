# Idea and spec: 연말 선물 교환 미션 뽑기 / Holiday Gift Swap Prompts

## Concepts scored

Scores run from 1 to 5 in this order — value in the first 10 seconds, originality, Korean search/share demand, and buildability in one HTML file. Maximum 20. Demand scores are editorial estimates based on the seasonal hooks in the job research.

| Concept | Category | Score | Verdict |
|---|---|---|---|
| **연말 선물 교환 미션 뽑기 / Holiday Gift Swap Prompts** | **random** | **5 / 4 / 4 / 5 = 18** | **Picked.** One tap gives the group a gift brief they can paste into chat. The format fits both Christmas parties and 송년회. |
| 올해 남은 날 달력 / Days Left This Year | tools | 5 / 2 / 5 / 5 = 17 | A year-end countdown with a tap-to-mark calendar for the remaining dates. It answers a clear search query, although the basic countdown is familiar. |
| 리본 매듭 타이밍 / Ribbon Bow Timing | arcade | 4 / 4 / 3 / 4 = 15 | Stop two moving ribbon loops at equal lengths to tie as many balanced bows as possible in 30 seconds. The first bow teaches the timing, and the score gives players a reason to retry. |

## Meta

slug `holiday-gift-swap-prompts`

| Field | Value |
|---|---|
| Category | `random` |
| Kind | `tool` |
| Aspect | `9/16` |
| Date | `2026-11-22` |
| Korean tags | `선물교환`, `송년회`, `크리스마스` |
| English tags | `gift-swap`, `holiday-party`, `prompts` |

| Field | ko | en |
|---|---|---|
| `title` | 연말 선물 교환 미션 뽑기 | Holiday Gift Swap Prompts |
| `desc` | 송년회나 크리스마스 모임에서 어떤 선물을 교환할지 고민된다면, 한 번 눌러 모두가 함께 쓸 미션을 뽑아 보세요. 마음에 드는 미션은 단톡방에 붙여넣을 수 있어요. | Draw a gift swap prompt for your holiday party. Each card pairs a theme with one rule you can paste into the group chat. |
| `howto` | ‘미션 뽑기’를 누르고, 마음에 드는 카드가 나오면 ‘미션 복사’를 눌러 단톡방에 붙여넣으세요. ‘다른 미션’을 누르면 새 카드가 나와요. | Draw a prompt, then copy your favorite into the group chat. Choose “Draw another” to reveal a new card. |
| `about` | 미션 하나를 뽑아 모임의 공통 선물 규칙으로 써 보세요. 예산은 모임에서 따로 정하면 돼요. | Use one card as the shared gift rule for your group. You can agree on a budget separately. |

## Pitch

A folded gift tag sits on a sheet of wrapping paper. One tap opens it to reveal a short theme and one rule. For example, **열자마자 쓸 수 있는 선물 / Ready to Use** asks everyone to bring something they can try as soon as they unwrap it.

The organizer can draw again or copy the card straight into the group chat. One card gives the whole group a common brief while leaving the actual gift up to each person. The first card is readable immediately, with no setup or text entry.

## Flow

1. **START** shows the title, a short instruction, a closed tag, and the primary **미션 뽑기 / Draw a prompt** button.
2. **RESULT** opens the tag in place. The theme and rule render immediately while a brief decorative fold animates. Focus moves to the card heading. **미션 복사 / Copy prompt** is primary and **다른 미션 / Draw another** is secondary.
3. **DRAW AGAIN** stays on RESULT and replaces the theme and rule. The card heading receives focus again, so users get the same reading order with every draw.
4. **COPY** writes the current card’s title and rule as two lines of plain text. On success, announce the localized status for two seconds. If clipboard access fails, reveal the inline manual-copy panel with the attempted card’s text.
5. **MANUAL COPY** replaces the decorative tag area with a labeled, read-only textarea and a close button. Closing restores the card and returns focus to **Copy prompt**.

## Controls

| Input | Behavior |
|---|---|
| Touch and mouse | Tap or click the labeled buttons. The tag is decorative and has no separate hit target. |
| Keyboard | Tab and Shift+Tab follow reading order. Enter or Space activates the focused native button. The manual-copy field supports the platform’s normal select and copy shortcuts. |
| Focus | The result heading uses `tabindex="-1"` for programmatic focus. The manual-copy field receives focus and selects its contents when opened. Controls retain a visible focus indicator. |
| Touch targets | All buttons are at least 44 × 44 CSS px. Preserve ordinary text selection and native touch behavior inside the manual-copy field. |

## Screens and visual design

| Screen | Layout and behavior |
|---|---|
| **START** | Center a compact column on a cranberry background (`#771F35`). Use a cream gift tag (`#FFF3DC`), dark ink (`#2B2024`), and fir green (`#214F3D`) for the primary button. A CSS or inline SVG ribbon crosses the tag. Show title, instruction, tag, then the draw button. |
| **RESULT** | Put the app title above the open tag. Give the theme a bold heading and the rule enough space to wrap. Stack the two action buttons below. Reserve a small status row so the copy confirmation cannot move either button. Use a roughly 180 ms decorative fold with the text already in place. |
| **MANUAL COPY** | In the same column, show the instructions, a two-line read-only textarea that can wrap, and the close button. Keep the current card and draw order in memory. |

Use `system-ui` and a full-viewport background. Center the content up to 420 px wide. At 320 × 480, use 16 px side padding, shrink the decorative ribbon area first, and let Korean and English text wrap. Keep every action visible without page scrolling. At larger sizes, add space around the tag. With `prefers-reduced-motion: reduce`, open the tag instantly. Use no audio.

## Prompt deck

Each row is a complete card. IDs are internal and never displayed. The heading and rule are the same on screen and in copied text.

| ID | ko theme | ko rule | en theme | en rule |
|---|---|---|---|---|
| `cold-day` | 추운 날 손이 가는 선물 | 추운 날 집에 돌아왔을 때 바로 손이 갈 물건을 골라요. | Cold-Day Comfort | Pick something you would reach for as soon as you got home on a cold day. |
| `one-color` | 한 가지 색 선물 | 선물에서 가장 많이 보이는 색을 하나 골라, 같은 색으로 포장해요. | One-Color Gift | Wrap your gift in its main color. |
| `desk-corner` | 책상 한 귀퉁이 | 책상 한쪽에 놓고 자주 쓸 만한 작은 물건을 골라요. | A Corner of the Desk | Pick something small enough to keep on a desk and useful enough to reach for often. |
| `pocket` | 주머니 속 선물 | 코트 주머니에 쏙 들어가는 선물을 골라요. | Pocket-Sized Gift | Pick a gift that fits in a coat pocket. |
| `ready-now` | 열자마자 쓸 수 있는 선물 | 포장을 뜯은 자리에서 바로 써 볼 수 있는 걸 골라요. | Ready to Use | Pick something the recipient can try as soon as they unwrap it. |
| `sunday` | 일요일 아침 선물 | 느긋한 일요일 아침에 꺼내 쓰고 싶은 물건을 골라요. | Sunday Morning Gift | Pick something you would use on a slow Sunday morning. |
| `two-uses` | 두 가지 쓰임새 | 두 가지 방법으로 쓸 수 있는 물건을 고르고, 쪽지에 그 방법을 적어요. | One Gift, Two Uses | Pick something with two uses and write both on a note. |
| `boring-upgrade` | 매일 쓰는 물건의 변신 | 평소 자주 쓰는 물건 중에 재질이나 모양이 마음에 드는 걸 골라요. | An Everyday Upgrade | Pick an everyday object with a material or shape you especially like. |
| `sound-clue` | 소리로 주는 힌트 | 선물에서 날 법한 소리를 의성어로 적어 포장 겉에 붙여요. | A Sound Clue | Write the sound your gift might make on the outside of the wrapping. |
| `drawn-clue` | 그림으로 주는 힌트 | 선물의 쓰임새를 알려 주는 작은 그림을 포장 겉에 그려요. | A Doodled Clue | Draw a small clue on the wrapping that hints at what the gift does. |
| `first-letter` | ㅅ으로 시작하는 선물 | 이름이 ‘ㅅ’으로 시작하는 선물을 골라요. | A Gift That Starts With S | Pick a gift whose name starts with S. |
| `next-year` | 새해 첫 주에 쓸 선물 | 새해 첫 주에 한 번쯤 써 보고 싶은 물건을 골라요. | First Week of the New Year | Pick something you would like to use at least once in the first week of the new year. |

### Draw and copy behavior

- Shuffle the 12 IDs with Fisher–Yates at startup. Draw from the shuffled order and reshuffle only when the deck is empty.
- If the first ID in a newly shuffled deck matches the last revealed ID, swap it with the second ID. Apply the same rule on startup using the stored last ID. Every card appears once per deck.
- Copy `{theme}\n{rule}` in the active language. Capture the card at the start of a copy attempt and temporarily disable both result actions while the clipboard promise is pending. Re-enable them when it settles. If the Clipboard API is unavailable or rejects, show the same captured text in the manual-copy panel.
- Read `?lang=ko` or `?lang=en`. If neither is present or recognized, use Korean for a `navigator.language` beginning with `ko` and English otherwise. Set `<html lang>` to match. Both the English and Korean letter prompts use their own localized rule.

## Strings

Use the metadata title as `appTitle` and as the browser document title. The deck table supplies every card heading and rule. Put the remaining visible and assistive strings in the same `{ ko, en }` dictionary.

| Key | ko | en |
|---|---|---|
| `startSub` | 모임에서 함께 쓸 선물 미션을 하나 뽑아 보세요. | Draw one gift prompt for everyone in your group. |
| `draw` | 미션 뽑기 | Draw a prompt |
| `drawAgain` | 다른 미션 | Draw another |
| `copy` | 미션 복사 | Copy prompt |
| `copied` | 미션을 복사했어요. | Prompt copied. |
| `manualHelp` | 아래 문구를 선택해서 복사해 주세요. | Select and copy the text below. |
| `manualLabel` | 복사할 미션 | Prompt to copy |
| `closeManual` | 미션으로 돌아가기 | Back to prompt |

Treat the tag art and ribbon as decorative and hide them from assistive technology. Use a polite live region for `copied`.

## localStorage

- `holiday-gift-swap-prompts:last-card:v1` stores the last revealed card ID. Write on reveal. On load, accept only IDs in the deck and use the value solely to avoid showing the same card on the next first draw.
- Wrap storage reads and writes in `try/catch`. The draw order and current card live in memory.

## Edge cases

- A reload returns to START. Blocked storage or an invalid stored ID still gives the user a complete shuffled deck.
- At deck rollover, the next card differs from the card just shown. Verify 13 consecutive draws by checking that the first 12 are unique and draw 13 differs from draw 12.
- Clear copy feedback on a new draw. If clipboard access is denied inside the iframe, preserve the exact two lines for manual copying. Closing the panel preserves the card and deck position.
- Resizing or rotating the viewport preserves the current screen, card, and deck position. Cancel decorative animation when the document is hidden and keep the card revealed on return.
- Verify at 320 × 480 and desktop sizes in both languages. Check keyboard focus, reduced motion, blocked storage, clipboard denial, and the longest card text. Before publishing, run `npm test`, `npm run build`, and `npm run qa -- --thumbs`. Check that the generated thumbnail shows the title and gift-tag artwork.

## Must not

- Keep the runtime in one self-contained `index.html` with inline CSS, JS, and decoration. No external assets, network requests, analytics, or dependencies. Keep `meta.json` alongside it and generate `thumb.png` with the repository QA command.
- No participant names, recipient assignment, penalties, purchase links, or spending recommendations.
- No cash prizes, paid draws, rarity tiers, or odds displays.
- No real people, trademarks, copied artwork, or humor aimed at a real group.
- No browser dialogs, pop-ups, navigation, page scrolling, or autoplay.