# Idea and spec: 연말 선물 포장 타이밍 / Gift Wrap Rush

## Concepts scored

Each score is 1–5. The demand scores are editorial estimates based on the supplied research’s seasonal cues and likely sharing behavior. There are no item votes yet.

| Concept | Category | First 10 seconds | Originality | Korean search/share demand | One-file buildability | Total |
|---|---|---:|---:|---:|---:|---:|
| **연말 선물 포장 타이밍 / Gift Wrap Rush** — stop a sliding ribbon over the center of each parcel, then share a gift tag with your score. | **arcade** | 5 | 4 | 4 | 5 | **18/20** |
| 올해 남은 시간 / Time Left This Year — see how many hours remain until New Year in Korea and compare them with your local countdown. | tools | 5 | 2 | 5 | 5 | 17/20 |
| 겨울 마켓 엽서 뽑기 / Winter Market Postcard Draw — pull one illustrated postcard from a fictional market stall, then reveal a tiny winter scene inside. | random | 5 | 4 | 3 | 5 | 17/20 |

**Pick Gift Wrap Rush.** One press ties the first bow and shows exactly how close it landed to the center. A 24-second round fits the brief’s short-session direction, and the final gift tag gives friends a score to beat. The Korean title pairs `선물 포장` with `타이밍` to make the seasonal theme and the mechanic clear.

## Meta

slug `gift-wrap-rush`

| Field | Value |
|---|---|
| Category | `arcade` |
| Kind | `game` |
| Aspect | `9/16` |
| Date | `2026-11-22` |
| Tags ko | `연말`, `크리스마스`, `선물 포장`, `타이밍 게임` |
| Tags en | `year-end`, `Christmas`, `gift wrapping`, `timing game` |

| Field | ko | en |
|---|---|---|
| `title` | 연말 선물 포장 타이밍 | Gift Wrap Rush |
| `desc` | 리본이 상자 가운데에 올 때 눌러 선물 10개를 포장해요. 24초 동안 가운데에 묶은 리본을 세고, 점수가 찍힌 선물 태그를 친구에게 보여 주세요. | Tie 10 ribbons in 24 seconds by stopping each one over the center of its gift. Share your score and see who wraps best. |
| `howto` | 리본이 상자 가운데 표시를 지날 때 ‘리본 묶기’를 누르세요. 스페이스바로도 묶을 수 있어요. 선물 하나에 기회는 한 번이에요. | Tap Tie ribbon or press Space as the ribbon crosses the center mark. You get one try per gift. |
| `about` | 겨울 선물 포장대에서 리본을 묶는 짧은 타이밍 게임이에요. 한 판에 선물 10개가 나오고 최고 점수는 이 브라우저에 저장돼요. | A short timing game at a winter gift-wrapping counter. Each round has 10 gifts, and your best score is saved in this browser. |

## Pitch

A parcel slides onto a winter wrapping counter. A ribbon sweeps left and right across its lid. Press once to pin it in place and form a bow. A centered bow snaps neatly into place, a near miss stays visibly off-center, and a skipped parcel leaves with its lid bare. After ten gifts, the score appears on a large paper tag tied to the parcel.

## Flow

1. **START.** Show the title, an illustrated parcel with a stationary centered bow, the one-line instruction, and a large Start button. The first parcel begins its sweep as soon as the player starts.
2. **PLAY.** Show the parcel number, running score, center bands, moving ribbon, and Tie ribbon button. Each parcel occupies a 2.4-second slot. A press locks the ribbon, updates the score, and displays the verdict until the next slot. If the player skips a parcel, show the bare parcel and its verdict for the final 0.3 seconds of that slot.
3. **RESULT.** After parcel 10, show the score out of 20, best score, number of centered bows, and a New best label when the previous best was beaten. Offer Play again and Copy score. Play again starts parcel 1 immediately with a fresh score.

## Controls

- **Pointer and touch.** Activate native buttons by tap or click. During play, the parcel itself is also a tap target. Route both gameplay targets through the same one-press-per-parcel guard. Use pointer events on the parcel and ignore secondary buttons, secondary pointers, and canceled gestures.
- **Keyboard.** Tab and Shift+Tab navigate visible buttons. Enter and Space activate focused buttons. During play, Space also ties the ribbon from the play area. Route Space through one handler, suppress its default action during play, and ignore held-key repeats. Require a key release after a keyboard start or retry before Space can tie the first ribbon.
- **Focus.** Focus Start on entry, Tie ribbon when play begins, and Play again on the result screen. Keep focus on Tie ribbon between parcels. The first accepted press makes the control unavailable for that parcel while preserving its focus.
- **Touch layout.** Keep controls at least 44 × 44 CSS px. Apply `touch-action: none` to the parcel play area. The document fills the iframe without page scrolling.

## Parcels and scoring

- Parcel `i` has a 2.4-second slot. The first 2.1 seconds accept input. The last 0.3 seconds preserve the verdict or show a skipped parcel. The full round lasts 24 seconds of active play.
- Use a normalized horizontal coordinate from 0 to 1 across the parcel lid. Sweep linearly between 0.08 and 0.92, reversing at each endpoint. Start odd-numbered parcels at the left endpoint and even-numbered parcels at the right endpoint. One end-to-end pass takes 1.30 seconds on parcels 1–3, 1.05 seconds on parcels 4–7, and 0.85 seconds on parcels 8–10.
- Judge the ribbon center using the same normalized position rendered on screen. A distance from `0.5` of at most `0.07` earns **2 points** and counts as a centered bow. A distance above `0.07` and at most `0.17` earns **1 point**. Anything farther away, or any parcel without an accepted press, earns **0 points**. Draw the inner and outer bands to these exact widths.
- Freeze the ribbon at the judged position and add bow loops there. The visible offset explains the score. Every result has a text verdict as well as visual feedback.
- The maximum is 20 points and 10 centered bows. Penalties and streak multipliers are excluded.

## Visual design

- **Palette.** Use a dark pine background `#163630`, cream label stock `#FFF7E8`, spruce ink `#17322C`, and cranberry ribbon `#B6374B`. Draw the scoring bands with solid and dashed outlines so their boundaries remain distinguishable without color. Use system fonts and tabular numerals for the score.
- **START.** Place the title and illustration in the center of a wrapping counter. Keep Start in the bottom control row. Show the stationary bow directly over the same center mark used in play.
- **PLAY.** Put parcel progress and score at the top, the parcel and ribbon in the middle, and the verdict and Tie ribbon button at the bottom. Reserve space for the verdict so text never shifts the button. Use a brief bow pop when input lands. Mark the decorative SVG as hidden from assistive technology and announce each judgment in a polite live region.
- **RESULT.** Put the score on a cream gift tag with a punched hole and ribbon. Keep the best score, centered count, and New best label on the tag so they appear together in a screenshot. Place the buttons and copy status beneath it.
- **Responsive layout.** Use a centered play column up to 440 CSS px wide inside a full-viewport background. At 320 × 480, reduce illustration height and vertical spacing before shrinking type or controls. Keep the same playfield proportions using an SVG `viewBox`. Reflow on resize without restarting play. Under `prefers-reduced-motion`, remove the bow pop and parcel transition while retaining the ribbon sweep used for timing.

## Sound

The game is silent. The bow position, score change, and verdict provide all feedback.

## Copy score

- Copy a single localized sentence with the title, score, and centered count. Use `navigator.clipboard.writeText` directly from the Copy score button and show a localized success or failure message in a polite live region. The failure message points to the screenshot-ready tag.
- The score tag and copy text contain game results only. They include no name, identifier, timestamp, or session data.

## Strings

Use one `{ ko: {…}, en: {…} }` dictionary for visible text, accessible labels, and copied text. Read `?lang=ko` or `?lang=en`. For missing or unsupported values, use Korean when `navigator.language` starts with `ko` and English otherwise. Set `<html lang>` and `document.title` from the active locale.

| Key | ko | en |
|---|---|---|
| `appTitle` | 연말 선물 포장 타이밍 | Gift Wrap Rush |
| `startHint` | 리본이 상자 가운데에 올 때 눌러요. | Press when the ribbon crosses the center. |
| `roundSummary` | 24초 동안 선물 10개 | 10 gifts in 24 seconds |
| `start` | 포장 시작 | Start wrapping |
| `giftProgress` | 선물 {current}/{total} | Gift {current}/{total} |
| `score` | 점수 {score}점 | Score {score} |
| `tie` | 리본 묶기 | Tie ribbon |
| `centered` | 정가운데! +2점 | Dead center! +2 points |
| `near` | 거의 가운데! +1점 | Close! +1 point |
| `offCenter` | 가운데에서 벗어났어요. +0점 | Off-center. +0 points |
| `skipped` | 리본을 놓쳤어요. +0점 | Missed the ribbon. +0 points |
| `resultTitle` | 포장 끝! | Wrapping done! |
| `resultScore` | {score}/{max}점 | {score}/{max} points |
| `best` | 최고 점수 {best}점 | Best score {best} |
| `centeredCount` | 정가운데 {centered}/{total}개 | Centered bows {centered}/{total} |
| `newBest` | 신기록! | New best! |
| `retry` | 다시 포장하기 | Play again |
| `copy` | 점수 복사 | Copy score |
| `copied` | 점수를 복사했어요. | Score copied. |
| `copyFailed` | 복사할 수 없어요. 화면을 캡처해 주세요. | Copy unavailable. Take a screenshot of your score. |
| `shareText` | 연말 선물 포장 타이밍에서 {score}/{max}점! 리본 {centered}/{total}개를 정가운데에 묶었어요. | I scored {score}/{max} in Gift Wrap Rush and tied {centered}/{total} bows dead center! |

## localStorage (in try/catch, prefix `gift-wrap-rush:`)

- `gift-wrap-rush:best:v1` stores the highest completed score as a decimal string from `"0"` through `"20"`. Missing or malformed values start at 0. At game over, take the maximum of the score, the in-memory best, and any valid best read from storage. Show New best only when the score exceeds both prior best values. Write only when the new value exceeds the stored value.
- When storage is unavailable, keep the best score in memory for the current page session. Refreshing starts a new round from START.

## Edge cases

- Accept at most one press inside each parcel’s input window. Ignore presses once the window closes, in result transitions, and after a successful tie. A press at the exact cutoff is too late.
- Use `requestAnimationFrame` with elapsed active time. Treat `visibilitychange` as a pause while hidden. Reset the frame timestamp on return and cap each animation delta at 50 ms so a stalled or resumed frame cannot skip parcels. Clear held-key and pointer state on blur or hide.
- Resizing and rotating preserve elapsed slot time, ribbon position, locked verdict, and score. Derive the visible position from normalized state.
- A fully skipped round ends at `0/20` with `0/10` centered bows. A tied best keeps the existing record and omits the New best label.
- A clipboard failure leaves the result and retry controls available. Clear the copy status on retry, and ignore a pending copy response if the player has already started another round.
- Before publishing, run `npm test`, `npm run build`, and `npm run qa -- --thumbs`. Check both languages at 320 × 480, a touch-only round, a keyboard-only round, hidden-tab resume, and a retry with storage blocked. Verify that the generated thumbnail shows the parcel and ribbon clearly.

## Must not

- Ship external assets, libraries, fonts, analytics, or network requests. Keep the game’s HTML, CSS, JavaScript, and original inline SVG in one `index.html` alongside `meta.json`. Generate `thumb.png` through QA.
- Use raster game art, autoplay audio, imitate another game’s presentation, or depict real brands or people.
- Add dialogs, pop-ups, outbound navigation, or document scrolling.
- Take away points, add time bonuses, or score a single parcel twice.