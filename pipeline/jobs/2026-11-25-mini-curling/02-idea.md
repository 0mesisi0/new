# Idea and spec: 미니 컬링 / Mini Curling

slug `mini-curling`

## Concepts scored

Scores are 1–5 in each dimension, for a maximum of 20. Korean search and sharing scores are editorial estimates based on recognizable search terms and what players could share. Today’s research supplies the winter theme and the precedent for one-action browser toys.

| Concept | Category | First 10 seconds | Originality | Korean search/share demand | Buildability in one HTML file | Total |
|---|---|---:|---:|---:|---:|---:|
| **미니 컬링 / Mini Curling** — pick a lane, release a stone, and see where it stops | `games` | 5 | 4 | 4 | 5 | **18** |
| 보온병 온도 실험실 / Thermos Lab — open a virtual thermos and compare two model cooling curves | `learn` | 4 | 4 | 3 | 5 | 16 |
| 엉뚱한 버스 전광판 / Odd Bus Arrivals — press a stop button to reveal an absurd fictional destination and arrival message | `weird` | 5 | 4 | 2 | 5 | 16 |

**Pick Mini Curling.** The first stone teaches the whole game. `컬링 게임` and `미니 컬링` give it clear Korean search terms, and a five-shot score is easy to compare with friends. Curling is a distinct subject from the built and queued items. The fixed practice layout makes repeat scores comparable and keeps the rink, controls, and scoring in one offline HTML file.

## Meta

- `category` = `games`
- `kind` = `game`
- `aspect` = `9/16`
- `date` = `2026-11-25`
- `tags` — ko `컬링`, `컬링 게임`, `겨울 스포츠` / en `curling`, `winter sports`, `timing`

| Field | ko | en |
|---|---|---|
| `title` | 미니 컬링 | Mini Curling |
| `desc` | 스톤을 다섯 번 밀어 표적 한가운데를 노려요. 레인을 고르고 힘 표시가 눈금에 닿는 순간 스톤을 보내 최고 기록에 도전하세요. | Pick a lane and time your release to slide five curling stones toward the center. How close can you get to a perfect 15? |
| `howto` | 표적이 있는 레인을 고르세요. 힘 표시가 목표 눈금과 겹칠 때 ‘스톤 보내기’를 누르세요. 키보드는 ←·→와 스페이스바를 쓰면 돼요. | Pick the lane with the target. Release when the moving power marker lines up with the target mark. Use ← and → to aim and Space to release. |
| `about` | 컬링의 표적 맞히기를 다섯 번의 투구로 즐기는 겨울 미니게임이에요. 매번 같은 표적에 도전할 수 있어요. | A winter target practice game inspired by curling. Play the same five targets each round and try to beat your best. |

## Pitch

Three lanes run up a small curling rink. Pick the lane that holds the target and send the stone when the moving marker reaches the target power. A short glide ends with the stone visibly inside or outside the scoring rings. Each shot starts with a clear rink, and the five-shot round tops out at 15 points.

## Flow and screens

1. **Start.** Show the title, one-line instructions, a static rink preview, and a large **Start** button. The preview shows the stone in the center lane and the target up-ice. Starting opens shot 1 immediately. The correct lane is already selected, so a first-time player can try the timing mechanic right away.
2. **Play — aim.** Show shot number and total above the rink. Place three lane buttons under the rink, followed by the power gauge and **Release stone** button. Draw a vertical guide through the selected lane and a fixed notch at the power needed for the target. The moving marker begins at zero.
3. **Play — glide.** A release locks the lane and power immediately. Disable lane selection and release while the stone travels for 600 ms. At rest, show the shot score and updated total. Keep the stone visible for another 650 ms, then clear the rink and advance. Preserve the selected lane between shots.
4. **Result.** After the fifth landing, show **Round complete**, total out of 15, best out of 15, and the five individual shot scores in order. Show **New best!** only when the total strictly exceeds the previous best. Keep **Play again** in the primary button position. Retry starts directly at shot 1 with center aim, zero points, an empty score list, and a fresh power cycle.

## Controls

- **Touch and mouse:** Use native buttons for lane selection, start, release, and retry. All interactive targets are at least 44 × 44 CSS px. Use a single `click` activation path so a touch produces one action. Apply `touch-action: none` to the rink and `touch-action: manipulation` to buttons.
- **Keyboard:** Tab and Shift+Tab move among controls. Enter and Space activate the focused button. During aim, Left and Right move the selected lane one step, stopping at the outer lanes. When focus is on the play region itself, Space releases the stone. Suppress the browser default only for handled keys and ignore repeat keydowns for game actions.
- **Focus:** Move focus to **Release stone** at the start of each aim phase and to **Play again** on the result screen. Keep a visible focus ring. Lane buttons expose their selected state through `aria-pressed`. Announce shot readiness and the landing score through one polite live region. Keep the moving marker silent.

## Shots and scoring

Use a logical `300 × 220` rink with lane centers at x = `60`, `150`, and `240`. Every shot starts at y = `194`. Higher power sends the stone farther up the rink. Use `landingY = 194 - 1.6 × power`, where `power` is between 0 and 100. The target center uses the same formula with the target power.

| Shot | Target lane | Target power |
|---|---|---:|
| 1 | Center | 50 |
| 2 | Left | 35 |
| 3 | Right | 75 |
| 4 | Center | 65 |
| 5 | Left | 85 |

- Run the marker on a 2.4-second triangle wave, from 0 to 100 in 1.2 seconds and back to 0 in 1.2 seconds. Start each aim phase at zero. On release, capture the power displayed in the last rendered frame.
- Score by the distance from the stone center to the target center. Award **3** at a distance of 8 logical px or less, **2** at 16 or less, **1** at 24 or less, and **0** otherwise. Use unrounded distances. The visible ring radii match the scoring thresholds.
- Animate the stone from launch to the computed landing point with ease-out. Update the total exactly once, on landing. Example for shot 1 with center aim. Powers `55`, `60`, and `65` score `3`, `2`, and `1` respectively. Power `50` in an adjacent lane scores `0`.
- A timing window stays open until the player releases. Each shot counts once, including misses.

## Visual design

Use a deep navy frame (`#14263A`), pale blue ice (`#DEEFF5`), dark blue ink (`#17334B`), and a red accent (`#B43B45`). Draw the rink, rings, and stone in inline SVG. Give the stone a visible handle and mark the selected lane with both a line and a pressed button state. Use alternating ring fills with clear outlines. Place the score text beside the stationary stone after the glide.

Use `system-ui`, tabular score numerals, and a full-viewport shell that centers the game on desktop. At `320 × 480`, reduce the rink height before shrinking the type or tap targets. The gauge, lane buttons, and primary action must fit without page scrolling. Resize the SVG through its viewBox so its logical coordinates remain stable.

Use a capped `requestAnimationFrame` delta of 50 ms for the gauge, glide, and landing hold. Under `prefers-reduced-motion`, place the released stone at its landing point immediately and keep the score visible for the same hold. The power marker still moves because it is the timing control. The game is silent.

## Strings

Use the selected language for the full interface and `<html lang>`. Recognize `?lang=ko` and `?lang=en`, then fall back to Korean for a `navigator.language` beginning with `ko` and English otherwise. Use `appTitle` for the document title. The metadata copy above and the following dictionary cover the user-facing text.

| Key | ko | en |
|---|---|---|
| `appTitle` | 미니 컬링 | Mini Curling |
| `startHint` | 레인을 고르고 힘 표시를 눈금에 맞춰 스톤을 보내세요. | Pick a lane and release when the power marker reaches the notch. |
| `start` | 시작 | Start |
| `shot` | {n}/5번째 투구 | Shot {n} of 5 |
| `laneGroup` | 레인 선택 | Choose a lane |
| `left` | 왼쪽 | Left |
| `center` | 가운데 | Center |
| `right` | 오른쪽 | Right |
| `power` | 힘 조절 | Power |
| `release` | 스톤 보내기 | Release stone |
| `rinkPreview` | 가운데 레인에 스톤과 표적이 있는 컬링장 | Curling rink preview with a stone and target in the center lane |
| `shotReady` | {n}번째 투구. 표적은 {lane} 레인, 목표 힘은 {power}%예요. | Shot {n}. Target lane {lane}, target power {power}%. |
| `landed` | {points}점 획득. 합계 {total}점. | Shot score {points}. Total {total}. |
| `total` | 점수 {total}/15 | Score {total}/15 |
| `resultTitle` | 다섯 번의 투구 완료 | Round complete |
| `best` | 최고 기록 {best}/15 | Best {best}/15 |
| `newBest` | 최고 기록을 깼어요! | New best! |
| `shotScores` | 투구별 점수 | Shot scores |
| `shotScore` | {n}번째 투구 {points}점 | Shot {n}, score {points} |
| `retry` | 다시 하기 | Play again |

`{lane}` uses the corresponding localized lane label. Use `landed` for the visible landing message and its live announcement. Show the five result scores as an ordered row of numbers with the localized `shotScore` as each score’s accessible label.

## localStorage

- `mini-curling:best:v1` stores the completed round’s best score as a decimal integer string from `0` to `15`. Missing or invalid values default to `0`. Guard reads and writes with `try/catch`. Preserve an in-memory best if storage is blocked.
- At result time, compare the total with both the in-memory best and a fresh valid stored best before writing. Save only a strict improvement.

## Edge cases

- A second click, held key, or touch-generated click during glide or the landing hold cannot release another stone. Commit the state change to glide before starting the animation.
- While `document.hidden`, suspend input and animation, including the landing hold. Reset the animation timestamp on return and continue from the same phase and progress.
- Rotation or resize preserves the selected lane, displayed power, stone position, and score. Refresh starts on the start screen and restores only the best.
- A zero-point first round and a tie display the result without the new-best message. Five perfect shots display `15/15`.
- Before publishing, run `npm test`, `npm run build`, and `npm run qa -- --thumbs`. Check both languages at `320 × 480`, play a full keyboard-only round, exercise retry and blocked storage, and verify that the generated thumbnail shows the rink and title.

## Must not

- No external assets, fonts, libraries, network requests, analytics, or backend. Put the playable item in `items/mini-curling/index.html`, with `meta.json` beside it and a QA-generated `thumb.png`.
- No raster art or video, autoplay, browser dialogs, new windows, or navigation from the game.
- No real teams, people, trademarks, event branding, or copied game art, layouts, or levels.
- No sweeping, opponents, collisions, online leaderboard, or rules from regulation curling. Keep the five-shot practice game playable from start to retry in one iframe.