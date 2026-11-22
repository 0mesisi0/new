# Idea and spec: 크리스마스 선물 포장 게임 / Christmas Gift Wrap Game

## Concepts scored

Each score is 1–5. Korean search and share scores are editorial estimates based on the supplied research and seasonal hooks. The brief lists no votes yet.

| Concept | Category | First 10 seconds | Originality | Korean search/share demand | One-HTML buildability | Total |
|---|---|---:|---:|---:|---:|---:|
| **크리스마스 선물 포장 게임 / Christmas Gift Wrap Game** — Time a fold, a strip of tape, and a bow. Each tap changes the parcel on screen. | `arcade` | 5 | 4 | 4 | 5 | **18** |
| 올해 남은 시간 / Time Left This Year — See the time until midnight in Korea and copy a one-line countdown for a group chat. | `tools` | 5 | 2 | 4 | 5 | **16** |
| 겨울 골목 불 켜기 / Light Up the Winter Lane — Tap dark windows to light up a tiny winter street, one home at a time. | `chill` | 5 | 4 | 3 | 5 | **17** |

**Pick: Christmas Gift Wrap Game.** The first tap folds the paper and scores the crease. Nine taps leave the player with three illustrated parcels and a score friends can compare. The seasonal hook comes from the research’s gift-wrapping direction. The timing challenge gives it a different action from the existing zipper, scarf, and cake items.

## Meta

slug `christmas-gift-wrap-game`

- **Category** `arcade`
- **Kind** `game`
- **Aspect** `9/16`
- **Date** `2026-11-22`
- **Tags** ko `크리스마스`, `선물 포장`, `타이밍 게임` / en `Christmas`, `gift wrapping`, `timing game`

| Field | ko | en |
|---|---|---|
| `title` | 크리스마스 선물 포장 게임 | Christmas Gift Wrap Game |
| `desc` | 종이를 접고 테이프를 붙이고 리본을 묶어요. 표시가 가운데에 올 때 눌러 크리스마스 선물 세 상자를 포장해 보세요. | Fold, tape, and tie three Christmas gifts. Tap when the moving marker reaches the target to earn points for each step. |
| `howto` | 움직이는 표시가 목표에 닿을 때 버튼이나 스페이스바를 누르세요. 목표의 중심에 가까울수록 점수가 높아요. | Tap the action button or press Space when the moving marker reaches the target. Land closer to the center for more points. |
| `about` | 포장할 때마다 종이, 테이프, 리본이 상자에 하나씩 더해져요. 최고 점수는 이 브라우저에 저장돼요. | Watch the paper, tape, and ribbon come together one step at a time. Your best score is saved in this browser. |

## Pitch

Three parcels sit on a wrapping table. For each one, align a moving marker with a target to fold the paper, seal it with tape, and tie the bow. The parcel shows the result of every attempt. A precise fold hugs the seam, while an early or late tap leaves a visible crease. All three parcels go on the shelf, crooked bows included.

## Flow

1. **START** shows the title, a one-line instruction, a fully wrapped preview parcel, and the start button. The preview is static. Start opens gift 1 at the fold step with zero points.
2. **PLAY** shows the gift number, running score, parcel illustration, current step, timing track, and action button. The marker starts moving as soon as the step opens. An accepted press freezes it and immediately applies that step to the parcel. Show the grade and earned points for 400 ms. On the first and second gifts, hold the finished parcel for 650 ms total after the bow press, then bring in the next box. After the third bow, enter RESULT following the standard 400 ms feedback. Every attempt advances the game. Players can watch as many passes as they like before pressing.
3. **RESULT** shows the three actual parcels side by side, each with its subtotal out of 300. Below them, show the final score out of 900, best score, and the retry button. Show the record message only when the run strictly beats the previous best. Retry opens gift 1 immediately and clears the previous parcels, points, timing, and feedback.

## Controls

- Use one native button on each screen. Tap, click, or activate it with Enter or Space. Keep the same button mounted throughout PLAY and change its label with the step. Move focus to the primary button at each screen transition, with a visible focus ring.
- Give every button a minimum 44 × 44 px target. Apply `touch-action: none` to the timing surface and play button. Use Pointer Events to track the primary press and clear it on cancellation. Use a single activation path for each press so pointer and click events cannot score it twice.
- Accept a fresh activation only after the next interactive state opens. Ignore held-key repeats and inputs that begin during feedback. Prevent scroll for handled game keys and leave normal Tab navigation available.

## Timing and scoring

Normalize the track to `0–1`. The marker starts at `0` on every step and travels back and forth at constant speed. The table gives target centers in fold, tape, bow order. One-way time is the duration from `0` to `1`.

| Gift | Fold | Tape | Bow | One-way time |
|---|---:|---:|---:|---:|
| 1 | 0.40 | 0.60 | 0.50 | 1,600 ms |
| 2 | 0.55 | 0.35 | 0.65 | 1,350 ms |
| 3 | 0.65 | 0.45 | 0.30 | 1,100 ms |

Score the marker position shown in the last rendered frame. Let `d` be its absolute distance from the target center.

| Distance | Points | Grade key |
|---|---:|---|
| `d ≤ 0.04` | 100 | `perfect` |
| `0.04 < d ≤ 0.10` | 60 | `good` |
| `d > 0.10` | 20 | `crooked` |

The outer band marks the 60-point zone and the inner band marks the 100-point zone. Distinguish them by shape as well as color. Add points once per step. A complete run scores 180–900. For the parcel art, center 100-point placements. Offset 60- and 20-point placements slightly or visibly, respectively, in the direction of the miss. Apply this to the crease, the tape strip, and the bow, so all nine decisions survive in the final illustration.

For example, a marker at `0.47` against a target at `0.40` earns 60 and places the fold slightly to the right. Nine perfect presses produce three 300-point parcels and a 900-point result.

## Visual design

- Draw the parcels in inline SVG with kraft paper, a forest-green mat, cream tape, cranberry and blue ribbons, and dark ink. Use clear border shapes for the seam, tape strip, and bow at thumbnail size.
- On PLAY, place progress and score above the parcel, the timing track directly below it, then feedback and the full-width action button. Reserve the feedback row so the button stays in place when a grade appears.
- At 320 × 480, use 12 px side padding, compact vertical spacing, and scale down the parcel art before shrinking text or buttons. Keep the page free of scroll. Center the work area within a 440 px column on wider screens. Use system fonts.
- Give each placed piece a brief settling motion after scoring. With `prefers-reduced-motion`, apply the placement instantly and keep the timing marker as the only moving element. The game is silent.

## Strings

Load all interface copy from the Korean and English dictionaries. Use `?lang=ko` or `?lang=en` when valid, otherwise use Korean if `navigator.language` starts with `ko` and English for other locales. Set `<html lang>` and the document title accordingly.

| Key | ko | en |
|---|---|---|
| `title` | 크리스마스 선물 포장 게임 | Christmas Gift Wrap Game |
| `startHint` | 움직이는 표시가 목표에 닿을 때 눌러요. | Press when the moving marker reaches the target. |
| `start` | 포장 시작 | Start wrapping |
| `giftProgress` | 선물 {n}/3 | Gift {n}/3 |
| `score` | 점수 {score} | Score {score} |
| `fold` | 종이 접기 | Fold paper |
| `tape` | 테이프 붙이기 | Add tape |
| `bow` | 리본 묶기 | Tie bow |
| `perfect` | 딱 맞았어요! | Right on target! |
| `good` | 거의 맞았어요! | Close! |
| `crooked` | 살짝 삐뚤어요! | A little crooked! |
| `feedback` | {grade} +{points}점 | {grade} +{points} pts |
| `resultTitle` | 선물 포장 완료! | Gifts wrapped! |
| `parcelScore` | 선물 {n} · {score}/300 | Gift {n} · {score}/300 |
| `finalScore` | 최종 점수 {score}/900 | Final score {score}/900 |
| `bestScore` | 최고 점수 {best}/900 | Best score {best}/900 |
| `newBest` | 새 최고 기록! | New personal best! |
| `retry` | 다시 포장하기 | Wrap again |

Announce the localized feedback once per press through a polite live region. The moving marker produces no live announcements. Use the visible parcel captions as the text equivalents for result art.

## localStorage

- `christmas-gift-wrap-game:best:v1` stores the highest completed run as a decimal integer string. Missing, malformed, or out-of-range values read as zero.
- Read and write inside `try/catch`. At completion, compare the run score with the current in-memory best and any valid stored best. Persist the maximum. If storage is unavailable, retain the best in memory for the current page session.

## Edge cases

- Drive the timing track and feedback holds with `requestAnimationFrame`, using elapsed time capped at 50 ms per frame. On `document.hidden`, pause both clocks and discard pending presses. On return, reset the frame timestamp and paint once before accepting input. Resume at the same marker position or feedback point.
- Preserve the normalized marker position, placed pieces, and score on resize or orientation change. Recompute only the presentation.
- A canceled touch, secondary pointer, double activation, or held key earns no extra points. Each accepted step increments the step index exactly once.
- A run with every tap outside the target still reaches RESULT with three finished parcels and 180 points. A tie preserves the best without showing the new-record message.
- Before publishing, run `npm test`, `npm run build`, and `npm run qa -- --thumbs`. Check both languages at 320 × 480 and confirm the generated thumbnail shows the title, parcel, and start action.

## Must not

- Keep the game in a single `index.html` with inline CSS, JavaScript, and SVG. No network requests, analytics, remote fonts, raster game art, or video.
- Use original parcel illustrations. No logos, real people, recognizable branded packaging, or copied game art.
- No page scrolling, dialogs, popups, navigation away, or autoplay.
- No countdown that ends a run, paid items, or penalties for waiting.