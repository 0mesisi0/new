# Idea and spec: 겨울 그림자 실험실 / Winter Shadow Lab

## Concepts scored

Each criterion uses a 1–5 scale. The demand scores estimate Korean search and sharing potential from the subject and the supplied research.

| Concept | Category | First 10 seconds | Originality | Korean search/share demand | One-HTML buildability | Total |
|---|---|---:|---:|---:|---:|---:|
| **겨울 그림자 실험실 / Winter Shadow Lab** — Move one time slider and watch the shadows of two identical posts change at the winter and summer solstices. | `learn` | 5 | 4 | 4 | 5 | **18** |
| 막차 환승 / Last Train Transfer — Follow platform signs through a fictional station and reach the last train before the doors close. | `games` | 4 | 4 | 3 | 4 | 15 |
| 분실물 자판기 / Lost-and-Found Vending Machine — Press a button to dispense an illustrated lost object with an oddly specific note from its fictional owner. | `weird` | 5 | 4 | 3 | 5 | 17 |

**Pick Winter Shadow Lab.** At first paint, two identical posts cast shadows of visibly different lengths. One slider turns that contrast into an experiment. The late-November timing gives the item a lead-in to 동지, and `겨울 그림자` and `동지 그림자` are natural Korean search phrases for the comparison. The tactile feedback direction comes from today’s research. The seasonal science follows the lower winter Sun described in NASA’s teaching activity. [NASA Science — Winter and Summer Sun Model](https://science.nasa.gov/learn/heat/resource/create-a-model-of-the-winter-and-summer-sun-activity/)

## Meta

slug `winter-shadow-lab`

- `category` `learn`, `kind` `tool`, `aspect` `9/16`, `date` `2026-11-23`
- `tags` — ko `겨울 그림자`, `동지`, `하지`, `태양 고도` / en `winter shadows`, `winter solstice`, `summer solstice`, `solar elevation`
- `ko.title` — 겨울 그림자 실험실
- `ko.desc` — 같은 1m 막대인데 겨울 그림자는 왜 더 길까요? 시간 손잡이를 움직여 동지와 하지의 햇빛 각도와 그림자 길이를 한눈에 비교해 보세요.
- `ko.howto` — 시간 손잡이를 끌거나 방향키를 누르세요. 같은 시각에 동지와 하지의 그림자가 얼마나 다른지 비교할 수 있어요.
- `ko.about` — 북위 37.5°의 평평한 땅에 세운 1m 막대를 가정한 모형이에요. 시간은 태양이 가장 높이 뜨는 때를 정오로 잡아요.
- `en.title` — Winter Shadow Lab
- `en.desc` — Why is a winter shadow longer? Move the time slider to compare the Sun’s angle and a 1 m post’s shadow at the two solstices.
- `en.howto` — Drag the time slider or use its arrow keys. Compare the winter and summer shadows at the same solar time.
- `en.about` — The model uses a 1 m post on level ground at 37.5°N. Solar noon is when the Sun is highest in the sky.

## Pitch

A short post stands on a ruler in each of two stacked scenes. The winter Sun sits low over an icy blue horizon and casts a long shadow. The summer Sun sits high in a warm cream sky and casts a short one. Both posts are the same height and both rulers use the same scale. Moving the shared time slider changes the two scenes together.

## Flow and screens

1. **Lab, first visit.** Open directly at solar noon with the title, one-line instruction, two labeled scenes, time slider, and two actions. Each scene shows the solar elevation and shadow length. Below them, a single line compares the two lengths. With the default values, it reads “겨울 그림자는 여름의 7.2배예요.” / “The winter shadow is 7.2× as long.”
2. **Lab, adjusting.** During a drag, both shadows, sun rays, and measurements update together. The same view stays in place when the user releases the slider or changes it with the keyboard. The model caption and one-sentence explanation remain visible.
3. **Copy feedback.** “비교 결과 복사” / “Copy comparison” copies the current measurements as localized plain text. Show success or failure in a reserved status region below the actions. It clears after four seconds, after a time change, or on reset. The two scenes and slider remain usable throughout.
4. **Reopen or reset.** A repeat visit restores the last committed solar time. “정오로 돌아가기” / “Back to noon” sets the slider to 12:00 and commits it immediately. The default lab is the QA thumbnail view.

## Controls

- Use a labeled native range input with nine stops from `12:00` through `14:00`, in 15-minute increments. Tap the track, drag the thumb, or use a mouse. Track hit area and action buttons are at least 44 px tall.
- Tab order is time slider → copy → reset. On the slider, Right or Up advances one stop, Left or Down goes back one stop, and Home or End selects the first or last stop. Enter and Space activate focused buttons. Keep a visible focus ring and use no global shortcuts.
- Use Pointer Events to track the active slider gesture, with native `input` events driving the display. Set `touch-action: none` on the slider hit area. Let native keyboard handling own range keys and prevent page scrolling for any handled key where a browser needs it.
- Set the slider’s accessible value to the localized solar time. Announce the combined result on a committed change and on reset, without announcing every intermediate drag position. Use a separate polite live region for copy feedback.

## Model and measurements

- Use latitude \(\phi=37.5^\circ\), level ground, and a vertical 1 m post. Approximate solar declination \(\delta\) as \(-23.44^\circ\) for winter and \(+23.44^\circ\) for summer.
- For solar time \(t\) in decimal hours, compute hour angle \(H=15^\circ(t-12)\). Compute solar elevation \(\alpha=\arcsin(\sin\phi\sin\delta+\cos\phi\cos\delta\cos H)\), converting degrees to radians for trig functions. Shadow length in meters is \(1/\tan\alpha\).
- Draw with unrounded lengths. Display elevation to one decimal place, length to two decimals, and the winter-to-summer length ratio to one decimal. Compute the ratio before rounding either length. Display time as zero-padded `HH:mm` in both languages.
- At `12:00`, expect winter `29.1° / 1.80 m` and summer `75.9° / 0.25 m`, with a ratio of `7.2×`. At `14:00`, expect winter `22.8° / 2.37 m` and summer `60.8° / 0.56 m`, with a ratio of `4.2×`.

## Visual design

- Use inline SVG for the scenes and system-ui for all text. Give winter a pale blue sky `#DDEBFA` and indigo shadow `#345176`. Give summer a cream sky `#FFF0D0` and terracotta shadow `#9B4B2F`. Use `#172533` for text and text labels for both seasons.
- Each scene shows an elevation cross-section. Put the post base at ruler zero, draw the shadow along the ruler, and draw a dashed ray from above the post through its tip to the shadow endpoint. Mark `0 m`, `1 m`, `2 m`, and `3 m` on both rulers. Keep the same horizontal and vertical scale in both scenes.
- Fill the iframe with a centered layout. At `320 × 480`, stack the scenes, pin their measurements in the scene headers, and place the two action buttons side by side. Let text wrap and shrink the SVG area before reducing text size or touch targets. On wider windows, cap the content column at 560 px and let the scenes gain height where space permits. Recompute the layout on resize and keep the page free of scrolling.
- Draw immediately on load. Coalesce pointer-driven SVG updates to one `requestAnimationFrame` per frame, with no continuous animation loop. Use direct updates for reduced motion. Cancel pending frame work while the page is hidden and draw the latest state on return. The item is silent.

## Copy comparison

Copy a snapshot of the current readout as four lines using the templates below. Call `navigator.clipboard.writeText` from the button activation. If unavailable or rejected, try a temporary textarea with `execCommand('copy')`, then restore focus to the copy button. Show failure feedback if both methods fail. The two seasonal scenes and their measurements fit together in a screenshot.

## Strings

Read `?lang=ko` or `?lang=en` first. For missing or unsupported values, use Korean when `navigator.language` starts with `ko` and English otherwise. Set `<html lang>` and use the same dictionary for the document title, visible copy, and accessible labels. `{time}`, `{angle}`, `{length}`, and `{ratio}` are formatted values.

| Key | ko | en |
|---|---|---|
| `appTitle` | 겨울 그림자 실험실 | Winter Shadow Lab |
| `instruction` | 시간을 움직여 1m 막대의 그림자를 비교해 보세요. | Move the slider to compare shadows from two 1 m posts. |
| `winter` | 동지 · 겨울 | Winter solstice |
| `summer` | 하지 · 여름 | Summer solstice |
| `solarTime` | 태양시 | Solar time |
| `timeValue` | 태양시 {time} | {time} solar time |
| `angleValue` | 태양 고도 {angle}° | Sun elevation {angle}° |
| `lengthValue` | 그림자 {length}m | Shadow {length} m |
| `rulerTicks` | 0m · 1m · 2m · 3m | 0 m · 1 m · 2 m · 3 m |
| `ratio` | 겨울 그림자는 여름의 {ratio}배예요. | The winter shadow is {ratio}× as long. |
| `explanation` | 태양이 낮을수록 같은 막대의 그림자가 길어져요. | The lower the Sun, the longer the same post’s shadow. |
| `modelCaption` | 북위 37.5° 모형 · 태양이 가장 높을 때가 정오예요. | Model at 37.5°N · Noon is when the Sun is highest. |
| `copy` | 비교 결과 복사 | Copy comparison |
| `reset` | 정오로 돌아가기 | Back to noon |
| `copied` | 비교 결과를 복사했어요. | Comparison copied. |
| `copyFailed` | 복사하지 못했어요. 화면을 캡처해 주세요. | Couldn’t copy. You can take a screenshot. |
| `shareHeader` | 겨울 그림자 실험실 · 북위 37.5° 모형 · 태양시 {time} | Winter Shadow Lab · 37.5°N model · {time} solar time |
| `shareWinter` | 동지 · 태양 고도 {angle}° · 그림자 {length}m | Winter solstice · Sun elevation {angle}° · Shadow {length} m |
| `shareSummer` | 하지 · 태양 고도 {angle}° · 그림자 {length}m | Summer solstice · Sun elevation {angle}° · Shadow {length} m |
| `shareRatio` | 겨울 그림자는 여름의 {ratio}배예요. | The winter shadow is {ratio}× as long. |

Use the four share lines, in order, for both clipboard text and the committed-change announcement. Make the SVG decorative for assistive technology because the surrounding headings and measurements convey its information.

## localStorage

- `winter-shadow-lab:time-step:v1` stores a string integer `"0"` through `"8"`. Default `"0"` is `12:00`. Each step adds 15 minutes.
- Read and write inside `try/catch`. Commit on drag release, a completed track click, a keyboard change, or reset. Keep the live drag position in memory until commit.

## Edge cases

- Missing or invalid storage values start at noon. Storage denial leaves the lab fully interactive with in-memory state.
- At either slider endpoint, further input in that direction leaves time and readouts at the endpoint.
- If a pointer gesture is canceled, restore the last committed time. Resizing preserves the current position and keeps both rulers on the same scale.
- For exact `#demo`, open at noon and bypass storage reads and writes. Generate `thumb.png` with `npm run qa -- --thumbs`.
- If the time changes or resets during an asynchronous clipboard attempt, the clipboard operation retains its original snapshot and its stale completion does not replace the current status. A newer copy attempt also supersedes older status updates.
- Verify both languages at `320 × 480`, all nine stops, mouse, touch, keyboard, storage denial, and clipboard denial. Run `npm test`, `npm run build`, and `npm run qa -- --thumbs` before publishing the item.

## Must not

- No network calls, external assets, fonts, scripts, analytics, geolocation, or device-clock input. Ship HTML, CSS, JavaScript, and SVG in one `index.html` alongside `meta.json` and the generated thumbnail.
- No real-time solar tracking, sunrise or sunset forecasts, clock-time conversions, maps, or compass bearings. Keep the diagrams as elevation cross-sections of the model.
- No copied illustrations, trademarks, real people, audio, or timers that gate interaction.
- No `alert`, `confirm`, `prompt`, `window.open`, or navigation out of the iframe.