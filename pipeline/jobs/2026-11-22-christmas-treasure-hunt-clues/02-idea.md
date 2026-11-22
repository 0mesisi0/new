# Idea and spec: 크리스마스 보물찾기 힌트 / Christmas Treasure Hunt Clues

## Concepts scored

Each criterion uses a 1–5 scale, with a maximum total of 20. The Korean search and share scores are editorial estimates based on the job’s seasonal research and the proposed use cases.

| Concept | Category | First 10 seconds | Originality | Korean search/share | One HTML file | Total |
|---|---|---:|---:|---:|---:|---:|
| **크리스마스 보물찾기 힌트 / Christmas Treasure Hunt Clues** — Get three ready-to-use riddles and a host’s hiding plan for a gift hunt at home. | `tools` | 5 | 4 | 4 | 5 | **18** |
| 선물 포장 러너 / Gift Wrap Runner — Steer a gift box between two lanes to collect ribbons in a 30-second round. | `arcade` | 5 | 3 | 3 | 4 | 15 |
| 종이 트리 꾸미기 / Paper Tree Decorating — Place and rearrange paper stars and baubles on a tabletop tree for a screenshot. | `chill` | 5 | 3 | 3 | 5 | 16 |

**Pick: Christmas Treasure Hunt Clues.** The first riddle is visible on arrival. The host gets a placement plan and can paste the opening clue into a group chat. The idea uses the research brief’s Christmas gift and at-home activity angle and adds a use case distinct from the existing seasonal items. Target phrases include `크리스마스 보물찾기`, `보물찾기 힌트`, and `집에서 보물찾기`. See `pipeline/jobs/2026-11-22-pending-84/01-research.md`, especially row 8 and the Christmas seasonal hook.

## Meta

slug `christmas-treasure-hunt-clues`

- Category `tools`, kind `tool`, aspect `3/4`, date `2026-11-22`.
- Tags ko `크리스마스`, `보물찾기`, `선물`, `홈파티`. Tags en `christmas`, `treasure hunt`, `gifts`, `home party`.

| Field | ko | en |
|---|---|---|
| `title` | 크리스마스 보물찾기 힌트 | Christmas Treasure Hunt Clues |
| `desc` | 집에서 크리스마스 선물을 찾아보세요. 거실, 책상, 침실 코스의 힌트 세 장과 진행자용 숨길 곳 안내를 바로 볼 수 있어요. | Set up a Christmas gift hunt at home with three ready-made clues and a hiding plan for the living room, desk area, or bedroom. |
| `howto` | 코스를 고르고 안내에 따라 두 번째와 세 번째 힌트, 선물을 숨기세요. 첫 번째 힌트는 화면으로 보여 주거나 복사해서 보내세요. | Pick a route and follow the guide to hide clues 2 and 3 and the gift. Show the first clue on screen or copy it to send. |
| `about` | 집에 있는 물건을 단서로 삼는 세 단계 보물찾기예요. 손이 쉽게 닿는 곳을 골라 준비하세요. | Everyday objects lead to the gift in three steps. Set up each stop somewhere easy to reach. |

## Pitch

Turn one wrapped gift into a three-stop hunt. Pick a room, see the opening riddle immediately, then open the host plan to learn where to put the other two clues and the gift. The host can write the clues on paper, send them one at a time, or hand over the phone one clue at a time.

Each riddle points to one ordinary household object. The route and order are fixed so the host can check the full chain before hiding anything.

## Flow

1. **START** — Show the selected route and its first riddle. Changing routes updates the preview immediately. Continue to the host plan.
2. **HOST PLAN** — Show all three hiding locations in order. Copy any riddle for setup or chat. Start the hunt to open clue 1 with the hiding plan out of view.
3. **CLUE** — Show exactly one riddle. Copy it, move backward or forward, or return to the host plan. In a paper hunt, clue 1 is all the player needs on screen. For a phone or chat hunt, the host advances after each find.
4. **FINISH** — Show the finale after the host selects **Finish hunt** on clue 3. Offer to start the same route again or choose another route.

## Controls

- **Touch and mouse.** Use native buttons, including the route choices, with targets at least 44 × 44 CSS px. A tap or click activates once. The riddle card itself has no gesture controls.
- **Keyboard.** Tab and Shift+Tab follow visual order. Enter or Space activates the focused button. On the clue screen, Left and Right move between existing clues when focus is within the clue card or its navigation. Consume those arrow events there and ignore repeats. Right on clue 3 leaves it open. Finishing requires activating **Finish hunt**.
- **Focus.** On a screen transition, focus its heading. On a clue change, focus the clue heading, which includes the progress count. Route controls expose their selected state via `aria-pressed`. Copy feedback uses a polite live region.
- **Language.** Use `?lang=ko` or `?lang=en`, falling back to Korean when `navigator.language` starts with `ko` and English otherwise. Set `<html lang>` and use the same locale for the document title, all visible and accessible labels, and copied text.

## Screens

### START

The title and description sit above three route buttons. A single card below shows the selected route’s clue 1, with the label **First clue preview**. The primary button opens the host plan. Default to Living room on a fresh visit.

### HOST PLAN

Show the route name and three numbered rows. Each row pairs one placement instruction with a **Copy clue** button. Row 1 copies clue 1 even though its placement instruction tells the host where to hide clue 2. This one-to-one correspondence follows the clue whose answer is in that row.

Put the placement note below the rows. **Change route** returns to START with the current route selected. **Start hunt** opens clue 1. When revisiting the plan mid-hunt, use **Resume hunt** and return to the same clue.

### CLUE

The screen heading is **Clue {n} of 3**. The riddle takes up the center of the card with **Copy clue** below it. **Host plan** is a separate button. Keep the hiding locations out of the DOM while this screen is active.

On clue 1, omit **Previous clue**. On clue 2, show both navigation buttons. On clue 3, replace **Next clue** with **Finish hunt**. Advance only on explicit input. Put copy feedback in a line under the card and clear it when the clue changes.

### FINISH

Show **Treasure found!**, the selected route name, and the completion line. Decorate the card with an original inline SVG gift and three stars. **Hunt again** opens the same route’s host plan with its clue position reset to 1. **Choose another route** opens START with the current route still selected.

## Routes and clue copy

For each route, give the player clue 1. Hide clue 2 at the answer to clue 1, clue 3 at the answer to clue 2, and the gift at the answer to clue 3. The host plan uses the exact placement strings below.

| Route | Clue | Riddle ko | Riddle en | Host placement ko | Host placement en |
|---|---:|---|---|---|---|
| `living` | 1 | 푹신한 네모가 소파에서 등을 받쳐 줘요. | A soft square on the sofa gives your back a rest. | 두 번째 힌트를 소파 쿠션 옆에 두세요. | Put clue 2 beside a sofa cushion. |
| `living` | 2 | 책들이 나란히 서서 서로의 어깨에 기대는 곳이에요. | Books stand shoulder to shoulder here. | 세 번째 힌트를 손이 닿는 낮은 책장 칸에 두세요. | Put clue 3 on a low, reachable bookshelf shelf. |
| `living` | 3 | 추운 밤이면 무릎 위에 내려앉는 작은 이불이에요. | A little blanket lands on your lap on chilly nights. | 선물을 무릎담요 옆에 두세요. | Put the gift beside a throw blanket. |
| `desk` | 1 | 긴 목을 숙여 밤에도 책상 위를 밝혀 줘요. | It bends its long neck to light your desk at night. | 두 번째 힌트를 책상 스탠드에서 한 뼘 떨어진 곳에 두세요. | Put clue 2 a handspan away from the desk lamp. |
| `desk` | 2 | 연필이 뾰족한 머리를 내밀고 모여 있는 작은 통이에요. | Pencils gather in this little cup with their pointy heads sticking up. | 세 번째 힌트를 연필꽂이 옆에 두세요. | Put clue 3 beside the pencil cup. |
| `desk` | 3 | 줄은 가득하지만 아직 쓸 이야기가 남아 있어요. | It’s full of lines with room for stories you haven’t written yet. | 선물을 줄 공책 옆에 두세요. | Put the gift beside a lined notebook. |
| `bedroom` | 1 | 하루가 끝나면 머리가 제일 먼저 쉬는 곳이에요. | It’s where your head goes to rest at the end of the day. | 두 번째 힌트를 베개 옆에 두세요. | Put clue 2 beside a pillow. |
| `bedroom` | 2 | 방 안에 또 한 사람이 보여요. 내가 손을 흔들면 똑같이 흔들어요. | Someone else is in the room. When you wave, they wave back. | 세 번째 힌트를 거울 앞의 안정된 선반에 두세요. | Put clue 3 on a stable shelf by the mirror. |
| `bedroom` | 3 | 온종일 입었던 옷들이 세탁 차례를 기다리는 곳이에요. | Clothes worn all day wait their turn for a wash here. | 선물을 빨래 바구니 옆에 두세요. | Put the gift beside the laundry basket. |

## Visual design

- Use a warm ivory card (`#FFF8E8`) on deep pine (`#153B34`), with dark ink (`#202922`) and cranberry (`#A62E42`) for primary actions. Use system fonts, clear focus outlines, and a selected-route marker that works without color.
- On START and CLUE, give the riddle the largest type on the card after the heading. On HOST PLAN, put the step number and placement on the left and its copy button on the right. Keep the primary action at the bottom of each view.
- Fill the iframe. Use compact gaps and wrapped labels at 320 × 480, a centered content column up to 520 px on wide screens, and no page scrolling. Give only the host placement region internal vertical overflow when text zoom or a short viewport requires it. Keep its action bar visible.
- Use a brief opacity transition on the finale, with an instant reveal under `prefers-reduced-motion`. The item is silent.

## Copy and sharing

- Copy exactly two lines using the active locale: the `clueHeading` for that card and the riddle. For example:

  ```text
  힌트 1 / 3
  푹신한 네모가 소파에서 등을 받쳐 줘요.
  ```

- Call `navigator.clipboard.writeText` from the copy button’s activation. If unavailable or rejected, expose the same two lines in a selected, read-only text field within that screen. On HOST PLAN, replace the note area temporarily with the manual-copy field. On CLUE, show the field in place of the riddle. Keep the navigation and the **Close** button accessible.
- **Close** restores the normal view and returns focus to the copy button. Clear the manual-copy field and pending feedback on any screen, route, or clue change. A late clipboard response applies only to the view and copy request that initiated it.

## Strings

Use these strings, the route table, and the metadata copy as the complete bilingual dictionary. Use the numbered `clueHeading` in the preview and copied text. Use the placement note only on the host plan.

| Key | ko | en |
|---|---|---|
| `appTitle` | 크리스마스 보물찾기 힌트 | Christmas Treasure Hunt Clues |
| `startIntro` | 코스를 고르면 첫 번째 힌트를 바로 볼 수 있어요. | Pick a route to see the first clue. |
| `routeGroup` | 보물찾기 코스 | Hunt route |
| `living` | 거실 | Living room |
| `desk` | 책상 주변 | Desk area |
| `bedroom` | 침실 | Bedroom |
| `preview` | 첫 번째 힌트 미리보기 | First clue preview |
| `openPlan` | 숨길 곳 보기 | See hiding plan |
| `planHeading` | 진행자용 숨길 곳 안내 | Host hiding plan |
| `planNote` | 쉽게 손이 닿고 통행에 방해되지 않는 곳을 골라 주세요. 물건이 없으면 다른 코스를 골라 보세요. | Keep items within easy reach and paths clear. If a spot is missing, try another route. |
| `changeRoute` | 코스 바꾸기 | Change route |
| `startHunt` | 보물찾기 시작 | Start hunt |
| `resumeHunt` | 보물찾기 이어 하기 | Resume hunt |
| `clueHeading` | 힌트 {n} / 3 | Clue {n} of 3 |
| `hostPlan` | 진행자 안내 | Host plan |
| `copyClue` | 힌트 복사 | Copy clue |
| `copyClueNumber` | {n}번째 힌트 복사 | Copy clue {n} |
| `copied` | 힌트를 복사했어요. | Clue copied. |
| `manualCopy` | 아래 힌트를 직접 복사해 주세요. | Copy the clue below manually. |
| `manualCopyLabel` | 복사할 힌트 | Clue text to copy |
| `close` | 닫기 | Close |
| `previous` | 이전 힌트 | Previous clue |
| `next` | 다음 힌트 | Next clue |
| `finish` | 보물찾기 끝내기 | Finish hunt |
| `finishHeading` | 보물 발견! | Treasure found! |
| `finishLine` | 세 번째 힌트 끝에 선물이 기다리고 있어요. | The gift is waiting at the end of clue 3. |
| `again` | 같은 코스 다시 하기 | Hunt again |
| `chooseAnother` | 다른 코스 고르기 | Choose another route |

## localStorage

- `christmas-treasure-hunt-clues:route` stores `living`, `desk`, or `bedroom` when the user changes the route. Wrap reads and writes in `try/catch`. Use `living` if the value is absent, invalid, or unreadable.
- Keep the current screen, clue position, and copy state in memory. Reload opens START with the remembered route.

## Edge cases

- Changing route clears the current clue position immediately. Returning to the host plan and resuming without changing route preserves the current clue.
- Guard each navigation action against the screen and clue that rendered it. During the first 250 ms after a clue change, ignore forward actions so a rapid double tap cannot skip a clue or finish the hunt.
- The hunt has no timer. Switching tabs, locking the phone, or resizing the iframe preserves the current route, screen, and clue.
- If clipboard access is blocked inside the iframe, the manual-copy field keeps every clue usable. Repeated copy taps show feedback for the latest request.
- With localStorage blocked, route selection and the full hunt work for the current visit.
- QA should walk all three routes in both locales, verify that each placement points to the next clue or gift, and exercise keyboard navigation and denied clipboard access at 320 × 480. Generate `thumb.png` with the repository’s thumbnail command and check that the default preview is legible.

## Must not

- No network requests, analytics, external scripts, fonts, or assets. Keep the experience in one `index.html` with inline CSS, JavaScript, and SVG.
- No real brands, people, borrowed artwork, or imitation of an existing clue pack.
- No inputs for names, addresses, photos, or custom hiding locations.
- No hiding instructions involving heat, outlets, climbing, locked spaces, fragile objects, or blocked walkways.
- No host answers in player-view markup or copied clue text.
- No dialogs, new windows, automatic navigation, autoplay, or page-level scrolling.