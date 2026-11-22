# Idea and spec: 크리스마스 그림 선물 만들기 / Christmas Picture Gift

## Concepts scored

Scores run from 1 to 5 in each column, with a maximum of 20. Korean search and share scores are editorial estimates based on the supplied research’s Christmas activity and picture-gift hooks. The brief records zero votes.

| Concept | Category | First 10 seconds | Originality | Korean search/share | One HTML file | Total |
|---|---|---:|---:|---:|---:|---:|
| **크리스마스 그림 선물 만들기 / Christmas Picture Gift** — change the ribbon on a gift box, then open it to reveal a miniature illustrated card | **chill** | 5 | 4 | 4 | 5 | **18** |
| 크리스마스 전구 잇기 / Christmas Light Circuit — rotate tiles to connect a plug to all the bulbs on a tiny shopfront | puzzle | 4 | 3 | 4 | 4 | 15 |
| 송년회 단체사진 포즈 카드 / Year-End Group Photo Poses — pick a group size and get a diagram showing where to stand and what pose to strike | tools | 5 | 3 | 4 | 5 | 17 |

**Picked: Christmas Picture Gift.** The box is ready to open on arrival, and one tap on the ribbon control makes it visibly yours. The opened box frames a card sized for chat sharing. Three original illustrations and preset greetings keep the interaction quick and the implementation small.

## Meta

slug `christmas-picture-gift`

- Category `chill`
- Kind `tool`
- Aspect `9/16`
- Date `2026-11-22`
- Korean tags `크리스마스 카드`, `그림 선물`, `크리스마스 인사`
- English tags `Christmas card`, `picture gift`, `holiday greeting`

| Field | ko | en |
|---|---|---|
| title | 크리스마스 그림 선물 만들기 | Christmas Picture Gift |
| desc | 작은 선물 상자에 겨울 그림과 인사말을 담고 리본을 골라 보세요. 상자를 열면 그림 카드가 나오고, 이미지로 저장해 친구에게 보낼 수 있어요. | Pick a winter illustration, a greeting, and a ribbon. Open the box to reveal a Christmas card you can save and send. |
| howto | 그림, 인사말, 리본 버튼을 눌러 하나씩 바꿔 보세요. ‘선물 열기’를 누르면 완성된 카드를 보고 이미지로 저장할 수 있어요. | Tap the picture, greeting, and ribbon buttons to cycle through the options. Open the gift to view and save your card. |
| about | 겨울 풍경을 그린 작은 카드 세 장을 준비했어요. 카드와 저장 이미지는 이 기기에서 만들어요. | Choose from three original winter illustrations. The card and its saved image are made on your device. |

## Pitch

A ribboned box sits under a warm pool of light. Its paper gift tag previews the selected illustration and shows the selected greeting. Change either one, pick a ribbon, or open the default gift immediately. The lid lifts and the illustration rises out of the box, with the ribbon color carried through to the card’s border. Save the finished card as a portrait PNG.

## Flow and screens

1. **Wrap.** Show the item title, a one-line instruction, the closed box with its preview tag, three option buttons, and the primary **선물 열기 / Open gift** button. Start with Camellia in snow, Warm Christmas wishes, and Cranberry. Each option button shows its current value and cycles forward through its three choices. Update the preview in the same interaction. Every combination can be opened immediately.
2. **Reveal.** Replace the closed lid with an open one and slide the card upward into its final position over 280 ms. Show the final card and result controls as soon as the state changes. The motion is decorative and never gates either action. With reduced motion, use the final pose immediately.
3. **Card.** Show the illustration, the greeting and the ribbon-colored border in full. Place **이미지 저장 / Save image** and **다시 꾸미기 / Edit gift** beneath the card. Editing restores all three selections and focuses the Open gift button. Saving leaves the card on screen and reports progress or failure in a reserved status area. If file generation fails or download initiation is blocked, the card remains large enough to capture with a screenshot.

## Controls

- Use native buttons for tap, click, and keyboard activation. Tab and Shift+Tab follow reading order. Enter or Space activates the focused button.
- On Wrap, tab through Picture, Greeting, Ribbon and Open gift. When a value changes, keep focus on that button and announce its new value in a polite live region. Include the current value in each button’s accessible name.
- On Card, move focus to the card heading, then tab to Save image and Edit gift. Deactivate the controls for the previous screen as soon as the screen changes.
- Use visible focus outlines and targets at least 44 px tall. Allow normal touch interaction on controls. The item has no drag gestures or continuous key input.

## Choices and card composition

Cycle each group independently in table order, wrapping from the third choice to the first. All 27 combinations use the same layout. The greeting is the card’s only printed text.

| Group | ID | ko | en | Art direction |
|---|---|---|---|---|
| Picture | `camellia` | 눈 속 동백 | Camellia in snow | One red camellia bloom on a short branch, with three deep-green leaves and snow resting on the upper leaf |
| Picture | `mittens` | 뜨개 장갑 | Knitted mittens | Two striped mittens hanging from a loose cord, with stitched cuffs and a few white snow dots |
| Picture | `window` | 불 켜진 창가 | Lamplit window | A four-pane window with amber light, a crescent outside and a thin layer of snow on the sill |
| Greeting | `christmas` | 따뜻한 성탄 보내세요 | Warm Christmas wishes | Default greeting |
| Greeting | `wish` | 좋은 일이 소복이 쌓이길 | May good things pile up like snow | Longer greeting, wrapped at word boundaries |
| Greeting | `thanks` | 함께해 줘서 고마워요 | I’m glad we shared this year | Year-end thank-you |
| Ribbon | `cranberry` | 크랜베리색 | Cranberry | `#A83C53` |
| Ribbon | `pine` | 솔잎색 | Pine green | `#356751` |
| Ribbon | `gold` | 금빛 | Gold | `#B58031` |

Use one canvas drawing routine for the gift tag’s miniature illustration, the finished card, and the export. The tag shows the selected greeting in a separate HTML text element. The full card uses a logical 360 × 450 px canvas with a cream inset, a ribbon-colored double border, an illustration centered in the upper two-thirds and dark, centered greeting text below. Reserve up to three lines for the greeting and use the same wrapping in preview and export. Give the canvas an accessible name with the picture and greeting.

## Visual design

- Use a deep pine background `#182B29`, cream card stock `#FFF7E7`, dark ink `#26332E` and muted warm highlights. Set the UI in `system-ui` with the locale’s system fallbacks. Use a line border and a light inset shadow to give the box the look of folded paper.
- Center the layout in the iframe with a maximum width of 440 px. At 320 × 480, use 12 px side padding, compact spacing and a smaller illustration area. Keep all controls and the export status visible while preserving 44 px targets and allowing labels to wrap.
- Fill the viewport with zero page scroll. Recompute preview size on resize and cap the visible canvas backing scale at `devicePixelRatio` 2. The PNG dimensions are fixed independently of viewport and device pixel ratio.
- Draw the illustrations with canvas paths and the box with CSS. Sound is omitted. The lid and card motion use finite CSS transitions. Settle transitions when the document is hidden and skip them under `prefers-reduced-motion`.

## Export

- On Save image, render the card to a detached 1080 × 1350 canvas from a snapshot of the selected picture, greeting, ribbon and locale. Encode PNG with `toBlob` and request a download named `christmas-picture-gift.png` through a same-document object URL and an anchor with `download`.
- Hold the URL long enough for the download to consume it, then revoke it. Release any outstanding URL on page exit.
- While encoding, disable Save image and announce the saving status. After requesting the download, announce that the image is ready and name the screenshot fallback in case the embedded browser suppresses downloads. Report detected failures inline.
- If the player returns to Wrap before encoding finishes, discard the pending result. A new visit to Card starts with an empty export status.

## Strings

The metadata table supplies the title. The choices table supplies every option value and card greeting. The strings below cover the remaining visible and accessible copy. Resolve the locale from `?lang=ko` or `?lang=en`, otherwise use Korean when `navigator.language` starts with `ko` and English for other locales. Set `<html lang>` and keep the copy in the corresponding locale dictionary.

| Key | ko | en |
|---|---|---|
| `wrapHint` | 그림과 인사말, 리본을 골라 선물을 열어 보세요. | Pick a picture, a greeting, and a ribbon, then open your gift. |
| `picture` | 그림 | Picture |
| `greeting` | 인사말 | Greeting |
| `ribbon` | 리본 | Ribbon |
| `choiceName` | {label} · {value} | {label} · {value} |
| `open` | 선물 열기 | Open gift |
| `cardHeading` | 완성된 그림 카드 | Your finished card |
| `cardName` | {picture} 그림 카드. {greeting} | {picture} card. {greeting} |
| `save` | 이미지 저장 | Save image |
| `edit` | 다시 꾸미기 | Edit gift |
| `saving` | 이미지를 만드는 중이에요. | Creating your image… |
| `downloadReady` | 이미지가 준비됐어요. 다운로드가 시작되지 않으면 카드를 캡처해 주세요. | Your image is ready. If the download doesn’t start, take a screenshot of the card. |
| `saveFailed` | 이미지를 저장하기 어려워요. 카드를 캡처해 주세요. | The image couldn’t be saved. Take a screenshot of the card. |

Use `choiceName` for the live announcement after a selection changes. Opening the gift announces the result through focus on `cardHeading`. Treat decorative box and tag artwork as hidden from assistive technology.

## localStorage

- `christmas-picture-gift:selections:v1` stores JSON with `picture`, `greeting` and `ribbon` IDs. Read on load and write after each choice change. Wrap all storage access and parsing in `try/catch`.
- Validate each saved ID independently and use that group’s default when it is missing or invalid. Refresh opens on Wrap with the restored selections. Screen state and PNG data live in memory for the current session.

## Edge cases

- With blocked storage or malformed JSON, start from defaults and keep the editor and export usable.
- With an unknown `lang` parameter, use the browser-language fallback. Preserve saved option IDs across languages and draw the greeting in the active language.
- At 320 × 480, verify the longest Korean and English choices and greetings. The preview may shrink, while control labels wrap and the full card stays visible.
- On rapid Open gift or Edit gift activation, honor actions only for the current screen. The transition never queues another screen change. Guard export against repeated activation and ignore stale completion callbacks after editing.
- On resize, preserve selections, focus and the current screen. Regen­erate the visible canvas at the new size from current state. A pending export keeps its original snapshot and dimensions.
- A null PNG blob, unavailable canvas context, or thrown encoding or download error shows `saveFailed`. Successful download initiation reports `downloadReady` because the iframe cannot confirm that a file reached disk.

## Must not

- No network requests, external assets, fonts, libraries, analytics, or remote card links. Ship the item’s HTML, CSS, JavaScript and artwork in one `index.html`, with `meta.json` alongside it.
- No real people, brands, copied illustrations or layouts from existing card makers.
- No free-text fields, account flow, recipient tracking, or automatic sending.
- No dialogs, pop-ups, page navigation, page scroll or autoplay.

## Before publishing

Run `npm test`, `npm run build`, and `npm run qa -- --thumbs`. Check both languages at 320 × 480 and desktop size, activate the full flow by keyboard, and verify repeated editing, blocked storage and PNG export in the production iframe. Check that the generated thumbnail shows the gift and readable controls.