# Idea and spec: 패딩 지퍼 챌린지 / Puffer Zip Challenge

## Concepts scored

Scores are 1–5 in each column. Korean search and sharing scores are editorial estimates based on `01-research.md` and the backlog. The research provides a seasonal and tactile hook. Item votes are still empty.

| Concept | Category | First 10 seconds | Originality | Korean search/share | One-HTML buildability | Total | Verdict |
|---|---|---:|---:|---:|---:|---:|---|
| **패딩 지퍼 챌린지 / Puffer Zip Challenge** | **arcade** | **5** | **4** | **4** | **5** | **18** | **Pick.** The first pull takes about a second, and the finished jacket makes the score readable in a screenshot. `패딩 지퍼` gives the title a familiar winter phrase. |
| 겨울 창문 불 켜기 / Winter Windows | chill | 5 | 4 | 3 | 5 | 17 | Tap dark apartment windows to compose a lit winter façade. The first tap changes the scene immediately, and the finished façade is easy to screenshot. |
| 크리스마스 선물 태그 만들기 / Christmas Gift Tag Maker | tools | 4 | 2 | 4 | 4 | 14 | Preview a ready-to-use tag immediately, then add a name and change the trim. `크리스마스 선물 태그` fits a seasonal task, with additional build work for text wrapping and PNG export. |

## Meta

slug `puffer-zip-challenge`

- Category `arcade`
- Kind `game`
- Aspect `9/16`
- Date `2026-11-22`
- Tags ko `패딩`, `지퍼`, `타이밍 게임`, `겨울` · en `puffer jacket`, `zipper`, `timing game`, `winter`

| Field | ko | en |
|---|---|---|
| Title | 패딩 지퍼 챌린지 | Puffer Zip Challenge |
| Desc | 패딩 지퍼를 꾹 당기고 표시된 칸에서 손을 떼세요. 여섯 번의 손맛으로 지퍼를 끝까지 올리고 최고 기록에 도전해 보세요. | Hold to pull the puffer zipper and release inside the marked band. Zip six sections and see how close you can get to a perfect 600. |
| How to | 버튼이나 스페이스 키를 꾹 누르면 지퍼가 올라가요. 표시된 칸 안에서 손을 떼세요. 가운데에 가까울수록 점수가 높고, 지퍼를 여섯 칸 올리면 한 판이 끝나요. | Hold the button or Space to pull the zipper. Release inside the marked band. The closer you are to its center, the more you score. A round lasts six pulls. |
| About | 추운 날 패딩 지퍼를 올리는 손맛을 여섯 번의 타이밍으로 옮겼어요. 최고 기록은 이 브라우저에 저장돼요. | A winter ritual turned into six quick timing tries. Your best score is saved in this browser when storage is available. |

## Pitch

A puffer jacket fills the screen. Hold the pull button and watch the zipper climb the next quilted section. Release inside the stitched band for a clean zip. Release too early or overshoot and the fabric catches for a beat before the slider settles into place. Six pulls finish the jacket. The six marks on the seam tell the story of the round, even in a screenshot.

The concept uses the research’s tactile hook and the backlog’s timing-game direction. Its central action is a timed release with a visible stopping point. That gives it a distinct loop from smoothing paper, grabbing a moving button, or waiting out a countdown.

## Flow and screens

1. **START**
   - Show the title, a partially zipped jacket with one stitched target band, the one-line instruction, and a large `start` button.
   - Show `bestScore` when there is a valid saved or session best, including a saved zero. The illustration is static until the user starts.
   - Starting opens section 1 with score 0 and focuses the pull button. Starting and pulling are separate gestures.

2. **PLAY — ready and pulling**
   - Place the section count and running score above the jacket. Show six quilted sections with the active section outlined. The active target is a hatched band with a center stitch.
   - The pull button keeps the same position throughout play. Pressing starts the slider. Releasing resolves the pull. The cumulative score updates immediately.
   - Completed sections show a tick for a clean pull and a catch mark for a miss. Localized text equivalents accompany both marks for assistive technology.

3. **PLAY — feedback**
   - Show the outcome beside the current section. The score gain is included for a clean pull. On a miss, show whether the release was early, late, or held to the top.
   - Run 280 ms of feedback, then advance the section or show the result. The zipper settles at the top of the just-resolved section in every case. The next section starts only after a fresh press. The previous outcome remains readable until the next pull starts.
   - On the sixth pull, keep the sixth outcome visible on the result screen as part of the seam summary.

4. **RESULT**
   - Show the fully zipped jacket with all six seam marks, result title, final score, best score, and clean-pull count. Show `newBest` only when the score strictly exceeds the previous best. A first score of zero establishes a best without showing `newBest`.
   - Put the large `retry` button first, followed by `copyScore`. Focus the result heading on entry.
   - Retry goes straight to section 1. Reset score, marks, section index, active input, animation, and copy status. Retain the best.

## Controls

- **Touch and mouse** — Use the primary pointer on the pull button. Capture it on press so release outside the button still judges the pull. Treat `pointercancel` or unexpected capture loss during a pull as cancellation. Use `touch-action: none` on the pull button and suppress its context menu.
- **Keyboard** — Start, retry, and copy use native buttons with Enter or Space. With the pull button focused, hold and release Space or Enter to play. Suppress the native click and scrolling for those handled pull keys. Ignore key repeat, leave Tab navigation available, and cancel a pull if it loses focus before release.
- **Assistive activation** — A standalone synthesized click on the pull button starts a pull, and a second standalone click releases it. Suppress the clicks generated by a pointer or keyboard hold that was already handled. Expose the active track as a labeled meter and announce pull outcomes and cancellation in a polite live region. Avoid announcing every animation frame.
- **Input ownership** — The first active pointer or key owns the pull until it resolves or cancels. Ignore additional inputs during that pull and during feedback. An input already down across a section change must be released before it can start another pull.

## Pull timing and scoring

Each section has normalized travel `p` from 0 at the bottom to 1 at the top. At press, `p = 0`. During the hold, compute `p = min(1, elapsedSeconds × speed)`. Use monotonic timestamps and active elapsed time for judgement. Use `requestAnimationFrame` to render the slider. Any decorative motion that integrates frame delta caps that delta at 50 ms.

| Section | Speed in sections/sec | Target band |
|---|---:|---|
| 1 | 0.80 | 0.64–0.92 |
| 2 | 0.90 | 0.53–0.79 |
| 3 | 1.00 | 0.66–0.88 |
| 4 | 1.10 | 0.42–0.62 |
| 5 | 1.20 | 0.60–0.78 |
| 6 | 1.30 | 0.71–0.87 |

- On release, recompute `p` from elapsed time. Both band edges count as inside. With band edges `lo` and `hi`, set `mid = (lo + hi) / 2` and `half = (hi - lo) / 2`. An inside release earns `100 - round(40 × min(1, abs(p - mid) / half))`. The center earns 100 and either edge earns 60.
- Release below the band earns 0 and shows `early`. Release above the band and below the top earns 0 and shows `late`. Reaching the top while held, including a release whose timestamp places `p` at 1, earns 0 and shows `top`.
- Each pull resolves once. Six resolved pulls always finish the round. A canceled pull contributes neither points nor a completed section.
- Final score is the sum of the six pulls, from 0 to 600. A clean pull is any release inside the band.

## Result titles

| Score | ko | en |
|---|---|---|
| 0–239 | 지퍼와 친해지는 중 | Getting the Hang of It |
| 240–419 | 한결 부드러운 지퍼 | Smooth Pulls |
| 420–599 | 지퍼 달인 | Zipper Pro |
| 600 | 완벽하게 쫙! | Perfect Zip! |

## Visual design and sound

- Draw the jacket and seam in inline SVG, with HTML controls and score text. Use navy `#14243A` for the background, teal `#257C79` for the jacket, cream `#FFF3D6` for the text and teeth, and amber `#FFC56D` for the target. Use hatching, a center stitch, and distinct marks so timing and outcomes remain legible without color.
- On a clean pull, bring the teeth together with a short snap and a small score pop. On a miss, briefly compress the local quilt seam before settling. With `prefers-reduced-motion`, keep the slider movement required for play and replace these flourishes with static marks.
- Fill the iframe with `100vw` and `100dvh`, with a `100vh` fallback. Use a centered play column up to 480 px wide on desktop. At 320 × 480, reduce illustration height and padding first. Keep the score, active target, feedback, and controls on screen, and keep interactive targets at least 44 × 44 px. The page never scrolls.
- Resize the SVG and surrounding layout from the current state. Use system fonts and keep the item silent.

## Export and copy

The result view fits the jacket, title, score, and six seam marks in one screenshot. `copyScore` copies the localized `shareText` using `navigator.clipboard.writeText` from the button gesture. Where available, fall back to selecting a temporary textarea and calling `execCommand('copy')`. Restore focus to the copy button after the fallback. Report the actual outcome inline with `copied` or `copyFailed`. Ignore completion from a copy request belonging to an earlier round.

## Strings

Use a `{ ko, en }` dictionary for visible text, document title, accessible names, live announcements, and copied text. Read `?lang=ko` or `?lang=en`, fall back to Korean when `navigator.language` starts with `ko` and English otherwise, and set `<html lang>`. The four titles in **Result titles** are dictionary entries as well.

| Key | ko | en |
|---|---|---|
| `appTitle` | 패딩 지퍼 챌린지 | Puffer Zip Challenge |
| `instruction` | 꾹 당기고, 표시된 칸 안에서 손을 떼세요. | Hold to pull. Release inside the marked band. |
| `start` | 시작하기 | Start |
| `pull` | 꾹 당기기 | Hold to pull |
| `release` | 칸 안에서 떼기 | Release in the band |
| `section` | {n}/6번째 칸 | Section {n} of 6 |
| `score` | 점수 {score} / 600 | Score {score} / 600 |
| `bestScore` | 최고 기록 {best} / 600 | Best {best} / 600 |
| `trackLabel` | {n}번째 칸 지퍼 위치 | Zipper position in section {n} |
| `beforeBand` | 표시된 칸 전 | Below the target band |
| `inBand` | 표시된 칸 안 | Inside the target band |
| `pastBand` | 표시된 칸 지남 | Past the target band |
| `clean` | 쫙! +{points}점 | Clean zip! +{points} |
| `early` | 조금 일찍 놓쳤어요 | Released a little early |
| `late` | 표시된 칸을 지나쳤어요 | Released past the band |
| `top` | 끝까지 당겼어요 | Held all the way to the top |
| `canceled` | 다시 꾹 눌러 당겨 보세요 | Press and hold again |
| `cleanMark` | {n}번째 칸 성공 | Section {n} clean |
| `catchMark` | {n}번째 칸 걸림 | Section {n} caught |
| `finished` | 지퍼를 다 올렸어요! | All zipped up! |
| `cleanCount` | 깔끔하게 올린 칸 {clean}/6 | Clean pulls {clean}/6 |
| `newBest` | 최고 기록 갱신! | New best! |
| `retry` | 다시 하기 | Play again |
| `copyScore` | 기록 복사 | Copy score |
| `copied` | 기록을 복사했어요 | Score copied |
| `copyFailed` | 복사하지 못했어요. 화면을 캡처해 주세요. | Couldn’t copy. Try taking a screenshot. |
| `shareText` | 패딩 지퍼 챌린지 · {score}/600점 · 성공 {clean}/6 · {title} | Puffer Zip Challenge · {score}/600 · {clean}/6 clean pulls · {title} |

## localStorage

- `puffer-zip-challenge:best:v1` stores the highest completed score as a decimal integer string from `0` to `600`. Missing and malformed values mean no prior record. Read on load and check again in the guarded result update so a higher score already saved by another open instance is retained.
- Wrap every storage access in `try/catch`. Keep a session best in memory to support retries when storage is blocked. Only completed rounds are eligible to update the record.

## Edge cases

- **Quick tap** — A press and immediate release earns 0 with `early`. A duplicate click after the release has no effect.
- **Interrupted pull** — On `document.hidden`, window blur, focus loss, or pointer cancellation, discard the active pull, reset that section’s slider, and show `canceled` on return. Clear held-input state. If the pull had already resolved, keep its score and pause the remaining feedback time while hidden.
- **Boundary judgement** — At section 1 speed, releases at 800 ms, 975 ms, and 1,150 ms earn 60, 100, and 60 respectively. A hold reaching 1,250 ms earns 0 exactly once. Resize, delayed paint, or reduced motion must leave those outcomes unchanged.
- **Best score** — A tie preserves the best without a new-record badge. Six misses still produce a complete result and a working retry. If storage becomes unavailable after load, keep the highest best already observed for the session.
- **Thumbnail preview** — `#demo` opens a static result with pulls of 100, 0, 90, 100, 70, and 100. It displays 460/600, five clean pulls, and a preview best of 460 without writing that score. Retry starts a normal round with the actual best.
- **Prepublish checks** — Run `npm test`, `npm run build`, and `npm run qa -- --thumbs`. Check the generated thumbnail and the 320 × 480 layout in both languages. Verify tap, keyboard hold, interrupted pull, retry, blocked storage, and denied clipboard access.

## Must not

- No network requests, external libraries or fonts, remote assets, analytics, or accounts. Ship all playable HTML, CSS, JS, and SVG in `index.html`. Keep `meta.json` and the QA-generated thumbnail alongside it.
- No copied game assets, trademarked jackets, brand marks, or real people. Build the jacket, seam, and feedback from original shapes.
- No raster images or video in the game. No sound, browser dialogs, new windows, navigation away, or page scrolling.
- No streak pressure or penalties beyond the points for the current pull. Keep the copy about the zipper and the player’s timing.