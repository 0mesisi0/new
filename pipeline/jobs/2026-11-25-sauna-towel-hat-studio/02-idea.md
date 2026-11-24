# Idea and spec: 찜질방 양머리 꾸미기 / Sauna Towel Hat Studio

## Concepts scored

Each score is 1–5, in the order shown. Korean demand scores are estimates based on the supplied research and likely search or sharing behavior.

| Concept | Category | First 10 seconds | Originality | Korean search/share demand | One-file buildability | Total |
|---|---|---:|---:|---:|---:|---:|
| **찜질방 양머리 꾸미기 / Sauna Towel Hat Studio**. Change the towel rolls and expression on a cartoon portrait, then save it. | **weird** | **5** | **4** | **4** | **5** | **18** |
| 수족관 해파리 찰칵 / Jellyfish Snapshot. Wait for three drifting jellyfish to fit inside a viewfinder, then take the shot. | games | 4 | 4 | 3 | 4 | 15 |
| 연휴 연차 계산기 / Long Weekend Planner. Enter a holiday and see how many consecutive days you get by taking one or two nearby workdays off. | tools | 4 | 3 | 4 | 5 | 16 |

**Picked: Sauna Towel Hat Studio.** The portrait is ready on arrival, and the first tap visibly changes it. `찜질방 양머리` gives the item a recognizable Korean subject, while the portrait gives people something to send. The research’s one-click oddities and winter outing ideas inform the format and setting. The leave calculator comes from the holiday-planning idea in the backlog.

## Meta

slug `sauna-towel-hat-studio`

- category `weird`
- kind `tool`
- aspect `3/4`
- date `2026-11-25`
- tags ko `찜질방`, `양머리`, `수건`, `프로필 사진`
- tags en `jjimjilbang`, `towel hat`, `avatar`, `winter`
- title ko `찜질방 양머리 꾸미기`
- title en `Sauna Towel Hat Studio`
- desc ko `찜질방 수건을 동글동글 말아 나만의 양머리 사진을 꾸며요. 수건 모양과 색, 표정을 골라 완성한 사진을 저장할 수 있어요.`
- desc en `Make a cartoon jjimjilbang portrait with a rolled towel hat. Pick the rolls, color, and expression, then save your portrait.`
- howto ko `수건 모양, 색, 표정 버튼을 눌러 사진을 바꿔요. 마음에 들면 ‘이미지 저장’을 눌러요.`
- howto en `Tap the roll, color, or expression button to change the portrait. Choose “Save image” when it looks right.`
- about ko `찜질방에서 수건 양끝을 말아 쓰는 양머리를 그림으로 꾸미는 장난감이에요.`
- about en `A portrait toy inspired by the Korean jjimjilbang towel hat, made by rolling both ends of a towel.`

## Pitch

A round-faced cartoon visitor sits for a portrait wearing a towel with a rolled coil on each side. Tap the shape button and the coils grow, or one flops sideways. Tap the expression button and the face and caption change together. The default sleepy face is already a finished portrait.

## Flow

1. Read the language and restore any valid saved choices. On first visit, show round rolls, cream towel, and sleepy face.
2. Activate any of the three customization buttons to advance that setting by one, wrapping from the third choice to the first. Update the portrait, caption, and button value immediately.
3. Select **Save image** to download a square PNG of the current portrait. Report the outcome inline. The studio stays open for further changes.

## Controls

| Input | Action |
|---|---|
| Touch or mouse | Tap or click any of the four native buttons. |
| Tab or Shift+Tab | Move between shape, color, expression, and save in that order. |
| Enter or Space | Activate the focused button once. Use native button activation and suppress held-key repeats. |

Keep focus on the activated button, including during export. Give each target a minimum height of 44 px and a visible focus outline. Use `touch-action: manipulation` on buttons and keep the preview passive, so dragging or tapping the art never changes a setting.

## Screens

### Studio

- The heading and one-line instruction sit above a square portrait. The portrait shows the face and towel against a tiled backdrop, with the current caption beneath the art inside the card.
- Three full-width buttons follow. Each shows its setting label and current value. The accessible name includes both. After activation, a polite live region announces the changed setting and value. An expression change also announces the new caption.
- The save button sits below the controls. An inline status region below it has room for two lines. It starts empty. During export, the save label changes to **Preparing image…**.
- There are no separate welcome, result, or error screens. The initial, customized, saving, and failure states all use this layout.

### Saved portrait

The square PNG contains the same portrait and caption, plus a small `하루한판` or `Daily Toybox` wordmark at the bottom. The editing controls and status messages stay in the studio.

## Portrait variations

| Setting | Order | Visual behavior |
|---|---|---|
| Shape | Round → Big → Floppy | Round uses matching coils. Big enlarges both coils by 25% around their centers. Floppy keeps the left coil round and tilts the right coil 25° outward, lowering it by 8% of the art area’s height. |
| Color | Cream → Mint → Peach | Apply a towel fill of `#F2D49A`, `#ADE0CD`, or `#F5B8AA`. Retain the same dark outline and spiral seams. |
| Expression | Sleepy → Proud → Startled | Sleepy has low lids and a small straight mouth. Proud has curved eyes and a broad smile. Startled has circular eyes and a small round mouth. Each has a fixed caption. |

The three settings are independent, for 27 combinations. Keep all three shapes within the same art bounds so cycling never shifts the card or clips a roll.

## Visual design

Use a warm off-white background `#FFF5E8`, dark plum text and outlines `#34243A`, lavender tile accents `#DCCFEB`, and a dark plum save button with white text. Draw the original portrait with canvas paths. The towel coils and spiral seams should read clearly at thumbnail size.

Fill the iframe with a centered column capped at 420 px. At 320 × 480, use a compact portrait of about 160 px, keep all four controls and the full status region visible, and preserve the 44 px targets. Use available space to enlarge the portrait on taller viewports. Keep the page free of scroll. Use `system-ui` with system Korean fallbacks.

Redraw on state changes and resize. Scale the on-screen canvas for device pixel ratio, capped at 2. A customization may trigger a single 120 ms CSS scale effect on the art, with immediate updates under `prefers-reduced-motion`. The studio is silent.

## Export

Draw to a separate 1080 × 1080 canvas using the same portrait renderer and a fixed layout for the localized caption and wordmark. Measure the caption with the export font and wrap at a word boundary if needed. Capture the current settings and language when Save is pressed so changes made during export leave the pending image consistent.

Encode as PNG with `toBlob`, trigger a download named `sauna-towel-portrait.png`, then revoke the object URL after the download has been handed to the browser. Show **Download started.** once the download is requested. If encoding or dispatch fails, show the inline failure message. Prevent duplicate requests while an export is pending.

## Strings

Use a `{ ko: {...}, en: {...} }` dictionary for visible and accessible text. Use the localized Meta title for the browser title and studio heading.

| Key | ko | en |
|---|---|---|
| `intro` | 수건을 말고 표정을 골라요. | Roll the towel and pick a face. |
| `shape` | 수건 모양 | Towel rolls |
| `round` | 동글동글 | Round |
| `big` | 큼직하게 | Big |
| `floppy` | 한쪽만 축 | Floppy |
| `color` | 수건 색 | Towel color |
| `cream` | 크림색 | Cream |
| `mint` | 민트색 | Mint |
| `peach` | 복숭아색 | Peach |
| `expression` | 표정 | Expression |
| `sleepy` | 졸려요 | Sleepy |
| `proud` | 뿌듯해요 | Proud |
| `startled` | 깜짝이야 | Startled |
| `sleepyCaption` | 5분만 더 누워 있을래요. | Five more minutes on the mat. |
| `proudCaption` | 오늘 양머리 잘 말렸다! | My towel rolls came out great! |
| `startledCaption` | 벌써 집에 갈 시간이라고요? | Time to go home already? |
| `previewLabel` | 양머리 사진. {shape}, {color}, {expression}. | Towel hat portrait. {shape}, {color}, {expression}. |
| `settingLabel` | {label}, {value} | {label}, {value} |
| `expressionChanged` | {label}, {value}. {caption} | {label}, {value}. {caption} |
| `save` | 이미지 저장 | Save image |
| `saving` | 이미지 만드는 중… | Preparing image… |
| `downloadStarted` | 다운로드를 시작했어요. | Download started. |
| `saveFailed` | 저장하지 못했어요. 사진을 화면에서 캡처해 주세요. | Couldn’t save the image. Please take a screenshot. |
| `wordmark` | 하루한판 | Daily Toybox |

## localStorage

| Key | Accepted values | Default |
|---|---|---|
| `sauna-towel-hat-studio:v1:shape` | `round`, `big`, `floppy` | `round` |
| `sauna-towel-hat-studio:v1:color` | `cream`, `mint`, `peach` | `cream` |
| `sauna-towel-hat-studio:v1:expression` | `sleepy`, `proud`, `startled` | `sleepy` |

Wrap every storage read and write in `try/catch`. Write only the changed setting. Keep current choices in memory if storage is blocked.

## Edge cases

- Honor `?lang=ko` and `?lang=en`. For missing or unsupported values, use Korean when the primary language of `navigator.language` is `ko`, and English otherwise. Set `<html lang>` to match.
- Missing or invalid stored values fall back individually. A failure reading one setting leaves the remaining settings available.
- Resize redraws the current portrait without changing choices or focus. When hidden, skip preview redraws and cancel the optional motion effect. Redraw once on return. An in-progress export may finish independently.
- A save failure restores the save button and keeps the current portrait. A customization clears a previous status. An export status that arrives after a customization still describes the snapshot taken when Save was pressed.
- If the canvas preview is unavailable, retain the caption, accessible description, and controls. Save uses the same inline failure message if an export canvas is unavailable.
- `#demo` opens with big rolls, a mint towel, and the proud expression for thumbnail QA. Demo mode ignores persisted settings and keeps edits in memory.

## Must not

- No network requests, external assets or fonts, analytics, or dependencies. Keep the item’s HTML, CSS, JavaScript, and portrait art in `items/sauna-towel-hat-studio/index.html`, with site metadata in `meta.json`.
- No photo uploads, camera access, personal data, or real people, trademarks, bathhouse branding, or recognizable characters.
- No dialogs, new windows, or navigation away from the item. No sound or autoplaying media.
- No cropping of controls, tiny tap targets, or page scrolling at 320 × 480. No interactions that depend on color alone.

## Before publishing

Run `npm test`, `npm run build`, and `npm run qa -- --thumbs`. Check both languages at 320 × 480 and desktop sizes, cycle all settings by keyboard and pointer, and verify that the PNG matches the choices at the time of the save. Check the inline failure state with downloads blocked or encoding forced to fail, and confirm the generated thumbnail shows the portrait and controls.