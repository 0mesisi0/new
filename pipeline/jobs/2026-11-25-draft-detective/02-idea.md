# Idea and spec: 문풍지 외풍 탐정 / Draft Detective

## Concepts scored

Each dimension is scored from 1 to 5. Korean search and share scores are estimates based on the research brief and the proposed experience.

| Concept | Category | Value in first 10 seconds | Originality | Korean search/share demand | Buildability in one HTML file | Total |
|---|---|---:|---:|---:|---:|---:|
| **문풍지 외풍 탐정 / Draft Detective** — Follow fluttering paper strips to find and seal gaps around a door. | games | 5 | 4 | 4 | 5 | **18** |
| 달력 마지막 장 / The Last Calendar Page — Pull the corner of December’s calendar page and find an absurd extra day underneath. | weird | 5 | 4 | 3 | 5 | 17 |
| 연말 공연 예산 계산기 / Year-End Show Budget — Enter ticket, transport and meal costs to see the total and what each person pays. | tools | 5 | 2 | 4 | 5 | 16 |

**Pick: Draft Detective.** One tap closes the first draft and makes the paper strip go still. The Korean search terms `문풍지` and `외풍` describe the activity directly. Three fixed rooms let friends compare scores on the same challenge. The late-autumn cold snap in [the research brief](./01-research.md) gives it a seasonal hook, and sealing a door gap gives it a distinct subject from the existing and queued winter items.

## Meta

slug `draft-detective`

- **Category** `games`
- **Kind** `game`
- **Aspect** `9/16`
- **Date** `2026-11-25`
- **Tags** — ko `문풍지`, `외풍`, `겨울 게임` / en `weatherstripping`, `drafts`, `winter game`

| Field | ko | en |
|---|---|---|
| title | 문풍지 외풍 탐정 | Draft Detective |
| desc | 문틈 앞에서 흔들리는 종이를 찾아 문풍지를 붙여 보세요. 세 방에 숨어 있는 외풍 여섯 곳을 모두 막으면 만점에 도전할 수 있어요. | Find the fluttering paper strips and seal the door gaps. Stop all six drafts across three rooms for a perfect score. |
| howto | 흔들리는 종이를 누르세요. 키보드로는 1~6번을 누르거나 탭 키로 종이를 고를 수 있어요. 세 번 헛짚으면 도전이 끝나요. | Tap the fluttering strips. Use keys 1–6, or Tab to a strip and press Enter. Three misses end the run. |
| about | 종이의 움직임을 단서로 삼는 짧은 관찰 게임이에요. 세 방의 문틈은 도전할 때마다 같은 자리에 있어요. | A short observation game about spotting drafts. The same six gaps appear in the same places on every run. |

## Pitch

Six paper strips hang beside a blue door. A strip flutters where cold air slips in. Tap it and a piece of weatherstripping snaps across the gap. The strip goes still and the door lights up a little warmer. Each room has more drafts than the last. Find all six with no misses to earn 60 points.

## Flow

1. **START.** Show the title, a one-line instruction, an inert preview door and a large `시작 / Start` button. One strip in the preview flutters. Starting opens Room 1 immediately.
2. **PLAY.** Show the door, room number, room progress and misses. Tap a fluttering strip to seal its gap. After sealing the final gap in a room, show a short confirmation and a `다음 방 / Next room` button. Keep the button visible until activated. On the third miss, open the result immediately.
3. **RESULT.** Show the outcome, score, best score and total drafts stopped. Use a compact card that fits in a phone screenshot with both actions visible beneath it. `다시 하기 / Play again` starts a fresh Room 1. `처음으로 / Title screen` returns to START.

## Controls

- **Touch and mouse.** Activate each native button on release. Each strip has a target at least 44 × 44 CSS px, with no overlap between targets. Use pointer events for pressed styling and clear it on cancellation. Use the button’s `click` event as the single activation path.
- **Keyboard.** Tab and Shift+Tab move focus. Enter and Space activate the focused button. During an active room, keys `1`–`6` activate the corresponding strips. Accept the number row and numpad equivalents, ignore key repeats and prevent defaults only for shortcuts the game handles.
- **Focus.** Focus the Room 1 heading after Start or Play again, the room heading after Next room, and the result heading at game over. Focus Next room when it becomes available. If the focused strip is sealed, move focus to the next unsealed strip in numeric order, wrapping at 6. Keep focus visibly outlined.

## Rooms and scoring

Use six fixed positions. Positions 1–3 run down the left edge of the door. Positions 4–6 run down the right edge. Each room starts with all six paper strips visible.

| Room | Draft positions | Drafts to stop |
|---|---|---:|
| 1 | 2 | 1 |
| 2 | 1, 6 | 2 |
| 3 | 3, 4, 5 | 3 |

- **Draft.** Show a bent paper silhouette and two short airflow strokes. Add a small oscillation with motion enabled. Selecting the strip seals the gap for the rest of the room and adds one to the run’s total. Replace the airflow strokes with a visible tape patch and a check mark. A sealed position becomes inert.
- **Still strip.** Show a straight silhouette with no airflow strokes. Selecting it adds one miss and briefly outlines the selected strip. The same strip can count as another miss on a later deliberate activation.
- **Input lock.** After each counted activation, apply a 250 ms input lock to the strips. Update the score state before starting feedback. At room completion, disable all six strips immediately. Ignore number shortcuts and queued pointer activations after the room ends.
- **Scoring.** `score = max(0, 10 × sealedDrafts − 5 × misses)`. Misses carry across rooms. The run ends when all six gaps are sealed or the third miss occurs. A result counts toward the best score even if the run ends early. A tied score keeps the existing best.
- **Timing.** There is no countdown. Players can inspect the clues before choosing.

## Visual design

- **Palette.** Use a charcoal blue wall (`#17252D`), slate blue door (`#34515E`), cream paper (`#FAEBCF`), pale cyan airflow strokes (`#A6E9F5`) and amber tape (`#FFC878`). Shape, airflow strokes and check marks carry the game state independently of color.
- **START.** Center the door preview between the heading and the primary button. Keep the preview outside the tab order and hide the decorative door from assistive technology.
- **PLAY.** Put the room heading and counters above the door. Arrange the numbered strips in two columns of three with the door centered between them. Reserve one line or a short wrapped block for feedback below the door. Use one polite live region for action feedback and progress. Suppress duplicate announcements when moving focus to the room or result heading.
- **Room complete.** Keep the sealed gaps visible. Show the confirmation in the feedback area and place Next room below it. The third room goes directly to RESULT.
- **RESULT.** Center the outcome and a large score over a warm door illustration. Show the best and draft count beneath. Show the new-record line only when the score exceeds the previous best.
- **Layout and motion.** Fill the iframe with a no-scroll layout from 320 × 480 through fullscreen. Use system fonts and a centered play area up to 480 px wide. At short heights, reduce decoration and spacing while preserving target size. Use HTML buttons and inline CSS or SVG for the door and strips. Animate only transient feedback and active draft strips. Disable movement under `prefers-reduced-motion` and retain the bent silhouette, airflow strokes and tape patch. The game is silent.

## Strings

Use one `{ ko, en }` dictionary for visible copy, the document title, accessible names and live messages. A supported `?lang=ko` or `?lang=en` takes priority. Otherwise use Korean for a Korean browser locale and English for other locales. Set `<html lang>` accordingly.

| Key | ko | en |
|---|---|---|
| `appTitle` | 문풍지 외풍 탐정 | Draft Detective |
| `startHint` | 흔들리는 종이를 눌러 문틈을 막으세요. | Tap a fluttering strip to seal the gap. |
| `start` | 시작 | Start |
| `room` | {room}/3번 방 | Room {room} of 3 |
| `roomProgress` | 막은 틈 {sealed}/{total} | Gaps sealed {sealed}/{total} |
| `misses` | 헛짚은 횟수 {misses}/3 | Misses {misses}/3 |
| `stripDraft` | {n}번 종이, 흔들림 | Strip {n}, fluttering |
| `stripStill` | {n}번 종이, 움직임 없음 | Strip {n}, still |
| `stripSealed` | {n}번 문틈, 막음 | Gap {n}, sealed |
| `sealedFeedback` | 문틈을 막았어요. | Gap sealed. |
| `missFeedback` | 이 종이는 움직이지 않아요. | This strip is still. |
| `roomClear` | 이 방의 외풍을 모두 막았어요. | All drafts in this room are sealed. |
| `nextRoom` | 다음 방 | Next room |
| `resultClear` | 세 방의 외풍을 모두 막았어요! | You stopped every draft! |
| `resultMiss` | 세 번 헛짚어서 도전이 끝났어요. | Three misses. Run over. |
| `score` | 점수 {score}점 | Score {score} |
| `best` | 최고 기록 {best}점 | Best {best} |
| `runProgress` | 막은 문틈 {sealed}/6 | Total gaps sealed {sealed}/6 |
| `newBest` | 새 최고 기록! | New best! |
| `retry` | 다시 하기 | Play again |
| `titleScreen` | 처음으로 | Title screen |

The six visible position markers are the digits `1`–`6` in both languages. Each button’s accessible name comes from its current strip state. When announcing a successful seal or a miss, append only the changed counter to the feedback text.

## localStorage

- `draft-detective:best` stores the best completed-run score as a decimal string. Accept only integers from 0 to 60. Missing or invalid values default to `0`.
- Put each storage read and write in `try/catch`. Keep the session best in memory so the result and retries work when storage is unavailable.
- At the end of a run, compare the score with the in-memory best and any valid stored best. Keep the highest value and show the new-record line only for a strict improvement. Persist only the best score.

## Edge cases

- Retry resets the room, sealed positions, total drafts, misses, feedback and input locks. Returning to START clears the run and preserves the best. Reload starts on START.
- A tap on an already sealed strip, a cancelled press, a repeated keydown or an activation during the input lock leaves the run unchanged. If an activation changes screens, consume it once.
- On resize or rotation, recompute layout from the current state. When hidden, pause animation and discard pending presses. Resume on the same room or screen. The input lock may expire while hidden since it has no effect on score or progress.
- `#demo` opens a thumbnail preview of Room 2 with gap 1 sealed, gap 6 still fluttering and zero misses. Include Room 1’s seal in the run total. The demo run can be played through without reading or writing the best score. Play again and Title screen leave demo mode for the session.
- Before publishing, run `npm test`, `npm run build` and `npm run qa -- --thumbs`. Check the generated thumbnail and both languages at 320 × 480. Verify a perfect run scores 60, a third miss ends the run, and the reduced-motion clues remain distinguishable.

## Must not

- No network requests, external scripts, fonts, analytics or remote assets. Keep HTML, CSS, JavaScript and artwork in `index.html`. Use the repository’s `meta.json` and generated `thumb.png` alongside it.
- No raster or video assets, real brands, real people, or copied game characters, art, music or layouts.
- No penalties based on reaction time, page scrolling, audio, dialogs, pop-ups or navigation away from the item.
- Keep the game about finding fictional drafts. Avoid installation instructions, product claims and estimates of real heating savings.