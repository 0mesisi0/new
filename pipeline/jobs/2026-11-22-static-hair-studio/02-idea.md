# Idea and spec: 겨울 정전기 머리 / Static Hair Studio

## Concepts scored

Scores run from 1 to 5 for each criterion, with a maximum of 20. Korean demand scores are editorial estimates based on the seasonal hooks in the supplied research. There are no votes yet.

| Concept | Category | First 10 seconds | Originality | Korean search and share demand | One-file buildability | Total | Verdict |
|---|---|---:|---:|---:|---:|---:|---|
| **겨울 정전기 머리 / Static Hair Studio** | `silly` | 5 | 4 | 4 | 5 | **18** | **Pick.** One tap gives a paper character a ridiculous hairdo. Three materials make distinct silhouettes worth comparing in chat. |
| 연말 마감 체크리스트 / Year-End Deadline Checklist | `tools` | 4 | 3 | 4 | 5 | 16 | Enter your own December deadlines and see the next unfinished task first. The first useful result depends on entering a task. |
| 겨울 버스 창가 / Winter Bus Window | `chill` | 4 | 4 | 3 | 5 | 16 | Choose a window seat and watch the streetlights slide across the glass on a quiet winter ride. The appeal is in lingering at the window. |

## Meta

slug `static-hair-studio`

| Field | Value |
|---|---|
| Category | `silly` |
| Kind | `tool` |
| Aspect | `9/16` |
| Date | `2026-11-22` |
| Korean tags | `겨울 정전기`, `머리카락`, `짤 만들기` |
| English tags | `static electricity`, `winter`, `reaction image` |

| Field | ko | en |
|---|---|---|
| `title` | 겨울 정전기 머리 | Static Hair Studio |
| `desc` | 털모자, 니트, 담요를 눌러 종이 인형의 머리카락을 세워 보세요. 같은 물건을 세 번 누르면 그 물건만의 정전기 머리가 완성돼요. | Tap a beanie, a sweater or a blanket to make a paper character’s hair stand up. Tap the same material three times to see its full style. |
| `howto` | 물건을 누르거나 숫자 키 1~3을 누르세요. 같은 물건을 세 번 누르면 머리가 끝까지 서요. 마음에 드는 모습은 이미지로 저장할 수 있어요. | Tap a material or press 1–3. Use the same material three times for the full hairdo. Save any charged look as an image. |
| `about` | 겨울옷을 벗을 때 머리카락이 삐죽 서는 순간을 종이 인형으로 재현했어요. | A paper character recreates that moment when your hair stands up after you take off a winter hat. |

## Pitch

A paper character starts with a flat fringe and a perfectly straight face. Tap the beanie and the fringe springs up while the face stays deadpan. Two more taps turn the hair into a small crown. The sweater sweeps the hair sideways, and the blanket fans it out into a halo. Save any of the nine looks as a reaction image.

## Flow

1. **Ready.** Show the title, flat-haired portrait, one-line instruction and all three material buttons immediately. `이미지 저장 / Save image` and `머리 눕히기 / Flatten hair` are visible and disabled.
2. **Charged, level 1 or 2.** The first tap applies the chosen material at level 1. The same material advances one level. A different material starts its own look at level 1. Update the portrait and caption immediately, and enable both actions.
3. **Full look, level 3.** Show the material’s full silhouette and final caption. The selected material remains available and gives a short, decorative spark on another tap. The level stays at 3. The other materials and both actions stay available.
4. **Saving.** Keep the portrait and material controls in place. Temporarily disable Save while encoding a snapshot of the current look. Returning from the download or dismissing the browser’s download UI leaves the current look intact. Report the export outcome inline below the actions. Flatten returns to Ready from any charged level.

## Controls

- Tap or click a material, or press `1` for Beanie, `2` for Sweater or `3` for Blanket. Press `R` to flatten and `S` to save when those actions are available.
- Use native buttons with visible focus. `Tab` and `Shift+Tab` move focus, and `Enter` or `Space` activates the focused button. Keep focus on the material after activation. After Flatten disables itself, focus the first material.
- Use pointer events for the decorative press effect and the native `click` event for activation. A cancelled pointer gesture clears the press effect. Ignore repeating shortcut keydown events and leave browser shortcuts with modifiers available.
- Give every button a minimum 44 × 44 px target. Expose the active material with `aria-pressed`. Announce changes to the material, level and caption in a polite live region. Announce export feedback separately.

## Portrait and charge rules

Keep state as `{ material, level }`. Ready is `{ material: null, level: 0 }`. Each material has three fixed poses. Use the look table for the caption and the screen reader announcement at every level.

| Key and material | Level 1 | Level 2 | Level 3 |
|---|---|---|---|
| `1` · 털모자 / Beanie | Three fringe tips lift. **앞머리 기상** / **The fringe wakes up** | Five short tufts stand upright. **삐죽삐죽** / **On end** | Seven tufts form a pointed crown. **정전기 왕관** / **Static crown** |
| `2` · 니트 / Sweater | The front lock leans right. **한 올이 옆으로** / **One strand sideways** | Half the hair sweeps right. **옆으로 쏠리는 중** / **Going sideways** | Five long locks form a horizontal fan. **옆바람 앞머리** / **Crosswind fringe** |
| `3` · 담요 / Blanket | Two locks lift beside the ears. **귀 옆이 들썩** / **A lift by the ears** | Locks spread around the top half of the head. **둥실둥실** / **Floating up** | Rounded locks fan out above and beside the face. **민들레 머리** / **Dandelion head** |

## Visual design

- Use a pale winter-blue background `#DCEBFA`, a cream portrait card `#FFF6E5`, deep navy ink `#202740` and a plum accent `#643492`. Give the hair a thick outline so each pose reads at thumbnail size. Use a system UI font stack.
- Put the title above a square portrait. Reserve space inside the card for the tallest pose and a two-line caption. Place the three material buttons in one row and the two actions below. Use small original line drawings of the materials alongside their labels.
- At 320 × 480, use 12 px side gutters and size the portrait from the remaining vertical space. Allow captions to wrap. At desktop sizes, center the interface in a column up to 440 px wide. Fill the iframe and keep page scrolling disabled.
- Draw the portrait on canvas with a fixed logical coordinate system. Fit it to the available space on resize and cap display DPR at 2. Swap to the new pose immediately, then settle it with a 160 ms spring and up to three short spark strokes. Under `prefers-reduced-motion`, change poses instantly and use a static spark at level 3. Stop animation while the document is hidden. The toy is silent.

## Image export

Draw a 720 × 720 PNG from the same portrait geometry with the title, final hair pose, material and current caption. Leave the surrounding controls off the image. Wrap English at word boundaries and Korean at legal line breaks. Leave enough room for two caption lines.

Snapshot the language and look when Save is activated so material changes during encoding cannot alter the file. Use `canvas.toBlob` with `image/png`, a local blob URL and an `<a download="static-hair-studio.png">` click. Revoke the URL after 1 second. Report `downloadStarted` once the download has been requested. If encoding or download initiation fails, show `saveFailed` and re-enable Save when the current look is charged.

## Strings

Put the table below and every material label and caption from the look table in the `{ ko, en }` dictionary. Use the title for the document title, on-screen heading and export. Read `lang` from the query string. For a missing or unsupported value, use Korean if `navigator.language` starts with `ko`, otherwise English. Set `<html lang>` to the resolved language.

| Key | ko | en |
|---|---|---|
| `title` | 겨울 정전기 머리 | Static Hair Studio |
| `instruction` | 같은 물건을 세 번 누르면 머리가 끝까지 서요. | Tap the same material three times for the full hairdo. |
| `readyCaption` | 아직 얌전한 머리 | Still lying flat |
| `readyAnnouncement` | 머리카락이 누웠어요. | Hair is lying flat. |
| `chargeAnnouncement` | {material}, 3단계 중 {level}단계. {caption}. | {material}, level {level} of 3. {caption}. |
| `save` | 이미지 저장 | Save image |
| `saving` | 이미지 만드는 중… | Making image… |
| `flatten` | 머리 눕히기 | Flatten hair |
| `downloadStarted` | 이미지 다운로드를 요청했어요. | Image download requested. |
| `saveFailed` | 이미지를 저장할 수 없어요. 화면을 캡처해 주세요. | Couldn’t save the image. Take a screenshot to keep it. |

## localStorage

- `static-hair-studio:look:v1` stores `{ "material": "beanie", "level": 1 }` for the last charged look. Allowed material IDs are `beanie`, `sweater` and `blanket`. Valid levels are integers from 1 through 3. Restore a valid look without animation on reload. Flatten removes the key.
- Wrap reads, parsing, writes and removal in `try/catch`. Use in-memory state for the current session if storage is blocked. Store the material ID and level only.

## Edge cases

- Missing, malformed or out-of-range stored data opens Ready. Reset clears feedback and cancels any portrait effect.
- Rapid deliberate presses update the state synchronously. Render feedback from the latest state and replace the previous animation. At level 3, further presses on the same material leave the caption and live announcement unchanged.
- Resize redraws the current pose without replaying its entrance. If the iframe is hidden mid-effect, show the settled pose when it returns.
- If the user flattens or changes the look while a save is in flight, the captured image can finish downloading. Suppress the old request’s status message on the new look. Release the save lock when encoding finishes, including on a null blob or exception.
- Verify all nine poses, reset and reload, keyboard and touch activation, both languages at 320 × 480, blocked storage, reduced motion and export from the normal iframe. Run `npm test`, `npm run build` and `npm run qa -- --thumbs` before publishing and inspect the generated thumbnail.

## Must not

- Keep HTML, CSS, JavaScript and artwork in one `index.html`. Use no network calls, external assets, analytics, accounts or permissions prompts.
- Use original artwork and copy. Avoid trademarks, recognizable characters, real people and jokes about anyone’s appearance.
- Keep the interaction untimed and score-free. Use no random outcomes, autoplay, dialogs, popup windows or navigation away from the item.
- Keep all visible and accessible copy in the language dictionary. Generate `thumb.png` with the repository’s thumbnail command.