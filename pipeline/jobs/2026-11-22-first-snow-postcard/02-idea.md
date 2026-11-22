# Idea and spec: 첫눈 엽서 만들기 / First Snow Postcard Maker

## Concepts scored

Scores run from 1 to 5 in each column, with a maximum of 20. Korean search and share scores are planning estimates based on the supplied research and backlog. The brief records no votes.

| Concept | Category | First 10 seconds | Originality | Korean search and share demand | One-file buildability | Total |
|---|---|---|---|---|---|---|
| **첫눈 엽서 만들기 / First Snow Postcard Maker** | **chill** | **5** — One swipe reveals a lit window and falling snow. | **4** — Wiping frost reveals the illustration that becomes the postcard. | **4** — `첫눈 엽서` and `겨울 인사말` describe a seasonal image people can send in chat. | **5** — One canvas scene, a grid of frost cells and local PNG export. | **18** |
| N빵 계산기 / Even Split Calculator | tools | 4 — A prefilled example shows each person’s share immediately. | 2 — The backlog’s optional expense split and rounding solve familiar problems. | 5 — `N빵 계산기` and `더치페이 계산기` express a specific search intent. | 5 — Integer arithmetic and copyable results fit in one file. | 16 |
| 김밥 말기 / Gimbap Roll-Up | arcade | 5 — The player can fold their first roll with one timed press. | 3 — A gimbap cross-section makes each roll distinctive, with familiar timing mechanics. | 3 — A finished roll is easy to share, with less obvious search intent. | 5 — Canvas shapes, one input and a short scoring loop. | 16 |

**Picked: First Snow Postcard Maker.** The supplied research notes interest in participatory winter activities and tactile interactions. The illustrated window makes the effect visible on the first swipe, and the finished postcard gives the interaction a purpose. The scene works on any date and uses original artwork.

## Meta

slug `first-snow-postcard`

| Field | Value |
|---|---|
| Category | `chill` |
| Kind | `tool` |
| Aspect | `9/16` |
| Date | `2026-11-22` |
| Tags (ko) | `첫눈`, `겨울 엽서`, `겨울 인사말` |
| Tags (en) | `first snow`, `winter postcard`, `winter greetings` |

| Field | ko | en |
|---|---|---|
| `title` | 첫눈 엽서 만들기 | First Snow Postcard Maker |
| `desc` | 창에 낀 성에를 닦아 눈 내리는 골목을 만나 보세요. 마음에 드는 겨울 인사말을 골라 첫눈 엽서를 이미지로 저장할 수 있어요. | Wipe frost from a window to reveal a snowy lane. Choose a winter greeting and save your first-snow postcard as an image. |
| `howto` | 손가락이나 마우스로 성에를 문지르거나 ‘한 구역 닦기’를 눌러 보세요. 골목이 드러나면 인사말을 골라 엽서를 저장하세요. | Drag across the frost or press “Wipe a patch.” Once the lane appears, choose a greeting and save your postcard. |
| `about` | 눈 내리는 골목을 그린 겨울 엽서예요. 그림과 인사말을 기기에서 바로 이미지로 만들어요. | A winter postcard set in an illustrated snowy lane. Your device creates the image from the artwork and greeting. |

## Pitch

A frosted pane overlooks a narrow residential lane. The first swipe cuts a clear trail through the frost and exposes a warm window, a brick wall and falling snow. Clear two-thirds of the pane to turn the view into a postcard. Pick one of three greetings and save the card as a PNG.

## Flow

1. **WIPE** opens immediately with the title, a one-line instruction, the frosted pane, a progress line and a **Wipe a patch** button. A lit window remains faintly visible through the frost and sits beneath the center of the pane. The first pointer press clears the cell it hits and its four edge neighbors where present. A first press of the button clears a central group of cells. Both actions reveal part of the illustration before the user has to read further.
2. **REVEAL** begins when at least 32 of 48 cells are clear. The remaining frost fades over 220 ms. Further wipes have no effect during the fade. The existing progress line announces completion. With reduced motion, enter **POSTCARD** immediately.
3. **POSTCARD** shows the full card with the first greeting selected by default. Three labeled greeting choices update the preview immediately. **Save postcard** requests a local PNG download. **Wipe again** restores the frosted pane and the default greeting.

## Controls

- **Touch and mouse:** press or drag inside the pane with one pointer. Capture the active pointer on press so release and cancellation always end the stroke. Use `touch-action: none` on the pane. Activate buttons with native click behavior.
- **Keyboard:** `Tab` reaches **Wipe a patch**. `Enter` or `Space` activates it. On the postcard screen, native radio inputs support arrow-key selection and `Tab` reaches the save and replay buttons. On reveal, move focus to the postcard heading if the wipe button held focus. On replay, return focus to the wipe button when replay was activated by keyboard.
- **Layout:** use a 44 px minimum hit area for buttons and radio labels. Keep focus rings visible. The pane illustration is decorative to assistive technology. A native progress element and its localized text report the wipe state. Announce reveal and download feedback through a polite live region.

## Frost and postcard rules

- Store the pane as an 8-by-6 grid of equal cells addressed in normalized coordinates. A pointer sample clears its cell and the four edge neighbors. Interpolate between consecutive in-pane samples at intervals no greater than half the smaller cell dimension, so fast swipes leave a continuous trail. Clear each cell once. Reset the stroke segment when the pointer leaves the pane, and resume sampling on re-entry.
- **Wipe a patch** clears up to eight still-frosted cells per activation, prioritizing Manhattan distance from the center of the grid and breaking ties by row, then column. This makes keyboard-only completion possible in four activations from a fresh pane. Stop processing any batch as soon as 32 cells are clear.
- Show progress as `floor(100 × cleared / 32)` until the threshold is met, then display the completion string. Give the native progress element a maximum of 32. Hold it at 32 through the reveal.
- The postcard uses a fixed 4:5 composition. The snowy scene occupies the upper three-quarters and the greeting sits centered in the lower quarter on cream paper. Keep the artwork and greeting visible together at all sizes. Export reproduces this composition and the currently selected greeting.

## Visual design

- Draw an original lane with stepped roofs, a low brick wall, a streetlamp and a warm window. Use `#152638` and `#294359` for the winter blues, `#FFC373` for warm light, `#E9F0F4` for frost and `#F7F2E8` for the postcard paper. Use system fonts and dark ink for the greeting.
- Layer fine frost speckles and feathery edges over the illustration. Use deterministic positions for the speckles and a softly feathered mask at the edges of wiped areas. Keep the hit area larger than the visible edge detail.
- Use `requestAnimationFrame` for snow and the fade, cap delta time at 50 ms and stop animation when the document is hidden. With reduced motion, draw a fixed arrangement of flakes and skip the fade. Cap the preview canvas DPR at 2.
- Fill the iframe with `100dvh` and a `100vh` fallback. At 320 × 480, fit the title, preview and controls by shrinking the artwork first. Put the three short greeting labels in a single row and the save and replay buttons in a second row. On wider screens, center the interface in a column up to 440 px. The page never scrolls.

## Sound

Silent throughout.

## Export

- Render the selected card to an offscreen canvas at 800 × 1000 using the same scene geometry and greeting layout as the preview. Use a fixed snow arrangement in the export, with the greeting kept clear of decorative flakes. The file contains the illustration and greeting.
- Encode the canvas with `toBlob("image/png")` and trigger a local download named `first-snow-postcard.png` through a blob URL. Revoke the URL after the download request has had time to start. The success message reports the request because the iframe cannot verify whether the file was saved.
- Keep one export pending at a time and capture the selected greeting upon activation. If encoding fails or the browser reports that it cannot initiate the download, show the localized screenshot fallback. Keep feedback inside the iframe.

## Strings

Use `?lang=ko` or `?lang=en`. For a missing or unsupported value, use Korean when the browser’s primary language subtag is `ko` and English otherwise. Set `<html lang>` and `<title>` from the selected locale. Keep visible text, accessible labels, status messages and exported greetings in the same `{ ko: {...}, en: {...} }` dictionary.

| Key | ko | en |
|---|---|---|
| `appTitle` | 첫눈 엽서 만들기 | First Snow Postcard Maker |
| `wipeHint` | 성에를 닦아 눈 내리는 골목을 열어 보세요. | Wipe the frost to reveal a snowy lane. |
| `wipePatch` | 한 구역 닦기 | Wipe a patch |
| `progressLabel` | 성에 닦기 진행률 | Frost clearing progress |
| `progressText` | 엽서 완성까지 {percent}% | Postcard {percent}% revealed |
| `revealed` | 눈 내리는 골목이 보이네요. | The snowy lane is in view. |
| `postcardHeading` | 인사말 고르기 | Choose a greeting |
| `greetingFirstLabel` | 첫눈 | First snow |
| `greetingFirst` | 첫눈 소식 전해요. 오늘도 따뜻하게 보내요. | It’s the first snow. Hope you’re keeping warm. |
| `greetingHomeLabel` | 퇴근길 | Way home |
| `greetingHome` | 눈 오는 퇴근길, 천천히 조심히 와요. | It’s snowing out. Take your time getting home. |
| `greetingEveningLabel` | 겨울밤 | Winter night |
| `greetingEvening` | 창밖엔 눈, 오늘 밤은 따뜻하게. | Snow outside. Here’s to a warm night in. |
| `save` | 엽서 저장 | Save postcard |
| `saving` | 이미지 만드는 중… | Preparing your image… |
| `saveRequested` | 엽서 다운로드를 요청했어요. | Postcard download requested. |
| `saveFailed` | 다운로드할 수 없어요. 엽서를 화면 캡처로 남겨 보세요. | Couldn’t download the postcard. You can take a screenshot of it. |
| `again` | 다시 닦기 | Wipe again |

## localStorage

No keys. Wipe progress and greeting selection live in memory for the current visit. Reloading opens the frosted pane with the default greeting.

## Edge cases

- Pointer cancellation, lost capture and page hiding end the active stroke. A second finger does not create another stroke. Releasing outside the pane keeps already cleared cells intact.
- Resize or rotate by redrawing from the normalized grid and current screen state. If the pane’s geometry changes during a stroke, end that stroke so the next press starts at the new coordinates.
- Pause the fade while hidden and resume from the same point. With reduced motion, the same completion threshold opens the postcard immediately.
- Keep the selected radio input mounted when the preview redraws. Give the text enough room to wrap in either language without clipping at 320 px.
- If the user replays while PNG encoding is pending, invalidate that export request so its callback cannot trigger a download or display a message on the wipe screen.
- For QA, `#demo` opens a finished card with the first greeting selected. Generate `thumb.png` with `npm run qa -- --thumbs`. Check both languages at 320 × 480, complete one round using only the keyboard, and verify the selected greeting in the exported PNG. Run `npm test` and `npm run build` before publishing.

## Must not

- Use network requests, external scripts, fonts, assets, analytics or a weather feed.
- Show a real first-snow date or claim snowfall at the user’s location.
- Use real people, brands, recognizable storefronts, copied artwork or an existing toy’s layout.
- Ask for names, addresses, photos, location access or account details.
- Add a timer, score, penalty or paid export.
- Use `alert`, `confirm`, `prompt`, `window.open` or navigation away from the item.