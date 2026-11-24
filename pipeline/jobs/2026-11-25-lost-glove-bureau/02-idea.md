# Idea and spec: 장갑 한 짝 분실물 센터 / Lost Glove Bureau

## Concepts scored

Each score runs from 1 to 5. The Korean search/share scores are editorial estimates based on likely search phrases and what someone could share.

| Concept | Category | First 10 seconds | Originality | Korean search/share demand | One-file buildability | Total |
|---|---|---:|---:|---:|---:|---:|
| **장갑 한 짝 분실물 센터 / Lost Glove Bureau** — Pair two lost gloves and discover the odd job they take together. | **weird** | **5** | **5** | **3** | **5** | **18** |
| 여행 짐 무게 계산기 / Travel Bag Weight Calculator — Enter your own bag limit and item weights to see what fits before you pack. | tools | 4 | 3 | 4 | 5 | 16 |
| 새벽 신문 배달 소리 / Dawn Paper Route — Mix synthesized paper folds, bicycle clicks and footsteps into a quiet street loop. | radio | 4 | 4 | 3 | 4 | 15 |

**Pick: Lost Glove Bureau.** The research points to tiny browser toys with immediate feedback and a reveal worth sharing. This applies that format to a new winter subject. Searches for “장갑 한 짝” and “장갑 분실물” are likely to be modest, so the share hook is the finished illustration and its one-line joke.

## Meta

slug `lost-glove-bureau`

- Category `weird`, kind `tool`, aspect `9/16`, date `2026-11-25`
- Tags ko `장갑 한 짝`, `분실물`, `겨울` / en `lost gloves`, `winter`, `odd pairings`
- Title ko `장갑 한 짝 분실물 센터` / en `Lost Glove Bureau`
- Desc ko: 겨울 분실물 센터에서 왼손 장갑과 오른손 장갑을 골라 보세요. 짝이 된 두 장갑이 함께 맡을 엉뚱한 일이 펼쳐져요.
- Desc en: Pair two stray winter gloves and see what odd job they take together. Six illustrated endings are tucked away at the lost-and-found.
- Howto ko: 왼손 장갑 하나를 고른 뒤 오른손 장갑 하나를 골라요. 결과에서 ‘오른손 바꾸기’를 누르면 같은 왼손 장갑으로 다른 이야기를 볼 수 있어요.
- Howto en: Pick one left glove, then one right glove. On the result screen, choose “Swap right glove” to see another ending with the same left glove.
- About ko: 겨울에 홀로 남은 장갑 한 짝에서 시작한 짧은 장난감이에요. 장갑과 이야기는 모두 창작이에요.
- About en: A tiny winter toy inspired by gloves that lose their partners. Every glove and story is original.

## Pitch

A lost-and-found drawer has three left gloves and two right gloves. Pick any two and the drawer becomes a miniature stage where the gloves start their new job. A striped mitten and a rubber glove turn a puddle into a ferry crossing. Swap either glove to uncover another scene. The first pairing takes two taps, and every combination has a distinct illustration and caption.

## Flow

1. **LEFT PICK.** Show the title, one-line instruction and three left-glove buttons on load. The first tap selects a glove and opens the right-glove drawer.
2. **RIGHT PICK.** Show the selected left glove in a small slot above two right-glove buttons. Choosing one completes the pair, records the discovery and opens the result. Back returns to LEFT PICK.
3. **RESULT.** Show the two gloves in their scene, the job title, its one-line caption and the number of distinct endings found. “Swap right glove” reopens RIGHT PICK with the left glove selected. “Start over” clears the current pair and returns to LEFT PICK. The progress count carries across both actions.

Each transition renders immediately. Any entrance animation plays over the finished, interactive screen.

## Controls

- Use native buttons with 44 × 44 CSS px minimum targets. Tap or click to choose a glove or activate an action. Apply `touch-action: manipulation` to buttons.
- Tab and Shift+Tab move through buttons in visual order. Enter and Space activate the focused button. On either pick screen, the displayed number keys select the corresponding glove. Escape goes back only on RIGHT PICK.
- Handle shortcuts once per keypress. Ignore repeat and modified keys. Call `preventDefault` only when handling a shortcut and preserve native activation for Enter and Space.
- On RIGHT PICK and RESULT, focus the new heading with `tabindex="-1"`. When returning to a pick screen, restore focus to the last chosen glove on that screen if there is one. The selected left glove on RIGHT PICK is display-only.

## Pairings

Each glove has a stable ID. Use the IDs to look up the fixed result. The table supplies all six result titles, captions and scene compositions.

| Left ID | Right ID | Title ko / en | Caption ko | Caption en | Scene |
|---|---|---|---|---|---|
| `stripe` | `rubber` | 웅덩이 나룻배 / Puddle Ferry | 줄무늬 장갑은 승객을 태우고, 고무장갑은 노를 저어요. 승객은 단추 하나예요. | The striped mitten takes a passenger and the rubber glove rows. The passenger is a button. | A leaf ferry, a button passenger and ripples across a puddle. |
| `stripe` | `work` | 달 긁개 / Moon Scrapers | 작업 장갑이 달을 닦으면 줄무늬 장갑이 떨어진 달가루를 받아요. | The work glove polishes the moon. The striped mitten catches the moon dust. | A low crescent and a small pile of dust in the mitten. |
| `knit` | `rubber` | 비눗방울 수선실 / Bubble Repair Shop | 고무장갑이 방울을 잡고, 털장갑이 실 한 올로 구멍을 꿰매요. | The rubber glove holds a bubble while the knitted mitten stitches it with a strand of yarn. | A bubble cradled in the rubber glove and a yarn stitch across it. |
| `knit` | `work` | 콩 한 알 이삿짐센터 / One-Bean Movers | 작업 장갑이 콩을 들고, 털장갑이 콩이 구르지 않게 꼭 안아요. | The work glove lifts a bean. The knitted mitten hugs it so it won’t roll away. | A single bean in a shallow cardboard moving box. |
| `leather` | `rubber` | 빗방울 검표원 / Raindrop Ticket Inspectors | 가죽장갑이 표를 받고, 고무장갑이 빗방울을 한 방울씩 들여보내요. | The leather glove checks tickets. The rubber glove lets in one raindrop at a time. | A ticket gate with three drops queued under a tiny awning. |
| `leather` | `work` | 그림자 이발소 / Shadow Barbers | 가죽장갑이 손님을 앉히고, 작업 장갑이 의자 밖으로 삐친 그림자를 다듬어요. | The leather glove seats the customer. The work glove trims the shadow sticking out past the chair. | An empty barber chair with a long shadow and a comb. |

## Screen layout and visual design

- **LEFT PICK.** Title and instruction above a shallow drawer with three equal glove tiles. Each tile shows an original glove silhouette, its name and its keyboard number. Finger shapes, cuffs and stitch patterns distinguish the gloves even without color.
- **RIGHT PICK.** Replace the title with the right-glove heading. Under it, pin the chosen left glove and its name to the drawer edge. Place the two right gloves side by side. Put Back below the drawer.
- **RESULT.** Put the job title, illustration and caption in one card for easy screenshots. Place discovery progress and both actions below the card. Reuse the two selected silhouettes in the illustration so the answer follows visibly from the choice.
- **Palette.** Navy background `#182332`, warm drawer `#FAEED8`, dark ink `#222D39`, teal primary button `#1E635A` with white text. Use a system font stack and a visible focus outline. Draw all gloves and scene props in inline SVG. Keep scene SVGs hidden from assistive technology because each caption describes the action.
- **Layout.** Fill the iframe with `100dvh` and a `100vh` fallback. Center a column up to 460 CSS px wide. At 320 × 480, use 12 px side padding and a shorter illustration area so both result actions fit without page scrolling. Let Korean and English labels wrap. Give the card extra height on tall screens and keep all controls together on desktop.
- **Motion and sound.** The drawer tiles settle into place over 140 ms. On RESULT, the props fade in over 180 ms. Skip both transitions when reduced motion is preferred or the document is hidden. The item is silent.

## Strings

Read `?lang=ko` or `?lang=en`. For an absent or unsupported value, use Korean when `navigator.language` starts with `ko` and English otherwise. Set `<html lang>` and the document title. Keep all strings below and all pairing titles and captions in the same bilingual dictionary. The visible glove names and shortcut numbers also label the native buttons.

| Key | ko | en |
|---|---|---|
| `appTitle` | 장갑 한 짝 분실물 센터 | Lost Glove Bureau |
| `leftPrompt` | 왼손 장갑을 하나 골라 주세요. | Pick a left glove. |
| `rightTitle` | 오른손 장갑 고르기 | Pick a right glove |
| `chosenLeft` | 고른 왼손 장갑: {glove} | Left glove: {glove} |
| `stripe` | 줄무늬 장갑 | Striped mitten |
| `knit` | 털장갑 | Knitted mitten |
| `leather` | 가죽장갑 | Leather glove |
| `rubber` | 고무장갑 | Rubber glove |
| `work` | 작업 장갑 | Work glove |
| `choice` | {n}. {glove} | {n}. {glove} |
| `back` | 뒤로 | Back |
| `progress` | 찾은 이야기 {count}/6 | Endings found: {count}/6 |
| `complete` | 이야기 여섯 편을 모두 찾았어요! | You found all six endings! |
| `swapRight` | 오른손 바꾸기 | Swap right glove |
| `startOver` | 처음부터 | Start over |

Show `complete` in place of `progress` at six discoveries. Use a polite live region for the progress message on RESULT.

## localStorage

- `lost-glove-bureau:seen:v1` stores a JSON array of unique pairing IDs in the form `stripe:rubber`. Read and write inside `try/catch`. Accept only IDs from the six defined pairings and deduplicate them before counting.
- On each result, add the current ID to the in-memory set, merge with valid stored IDs and save the merged set. The current pair lives in memory. The item always opens at LEFT PICK.

## Edge cases

- Reopening a known pairing shows the same scene and leaves the discovery count unchanged. Every pairing stays available after all six are discovered.
- When storage is blocked or malformed, start with an empty in-memory set and keep the full experience available for that visit.
- Make each activation valid for the screen and button that produced it. A duplicate activation from a previous screen cannot select a glove on the new screen.
- Resizing preserves the current pair, screen and focus. Result text wraps and the illustration yields space to the controls.
- `#demo` opens the Puddle Ferry result for thumbnail QA without writing a discovery. Normal play resumes through either result action.

## Must not

- No external assets, fonts, libraries, network requests, analytics or permissions. Keep the HTML, CSS, JS and all SVGs in one `index.html`, alongside the required `meta.json`.
- No copied art, characters, trademarks, real-person depictions or real lost-property listings. No accounts or personal information fields.
- No blocking dialogs, pop-ups, navigation away, autoplay sound or required drag gestures.
- No timed choices, incorrect-pair penalties or random endings. All six left/right combinations are valid.