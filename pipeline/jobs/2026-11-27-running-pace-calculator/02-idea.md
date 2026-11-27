# Idea and spec: 러닝 페이스 계산기 / Running Pace Calculator

## Concepts scored

Each concept gets 1–5 for value in the first 10 seconds, originality, Korean search/share demand, and buildability in one HTML file. Maximum 20.

| Concept | Category | Score | Verdict |
|---|---|---|---|
| 곶감 말장난 뽑기: shake a dried-persimmon string to get a '곧 감 → 곶감' style pun card | random | 4/4/2/5 = 15 | The trend is low confidence and has no year. A pun that has gone stale is risky. Keep it for later. |
| 겨울 눈사람 틱택토: a snowman AI that never loses at tic-tac-toe | games | 4/2/2/5 = 13 | A well-worn genre with little Korean search demand. We already have many games. |
| **러닝 페이스 계산기** | **tools** | **5/3/5/5 = 18** | **Picked.** Marathon searches rise in December (research item 10). "페이스 계산기" and "마라톤 페이스" are searched all year. No running item exists yet, and it differs in subject from the card-deduction, pension, leave and discount tools. |

## Meta

- slug `running-pace-calculator`, category `tools`, kind `tool`, aspect `3/4`, date `2026-11-27`
- tags: ko `러닝`, `페이스 계산기`, `마라톤`; en `running`, `pace calculator`, `marathon`
- title: ko `러닝 페이스 계산기 · 마라톤 기록 예측`; en `Running Pace Calculator & Race Time Predictor`
- desc ko: 거리와 기록을 넣으면 1km 페이스, 시속, 구간별 스플릿이 바로 나와요. 5K·10K·하프·풀코스 예상 기록도 함께 계산해 드려요.
- desc en: Enter a distance and a time to get your pace per km, speed and km-by-km splits, plus predicted times for 5K, 10K, half and full marathon.
- howto ko: 위에서 구할 값(페이스·기록·거리)을 고르고 나머지 두 칸을 채우세요. 결과는 입력하는 즉시 바뀌어요. 거리 버튼으로 5K·10K·하프·풀을 한 번에 넣을 수 있어요. '결과 복사'로 훈련 메모에 붙여 넣으세요.
- howto en: Pick what to solve for (pace, time or distance) and fill in the other two. Results update as you type. Use the distance chips for 5K, 10K, half and full. Tap "Copy result" to paste it into your training notes.
- about ko: 예상 기록은 거리와 기록의 일반적인 관계식(리겔 공식)으로 낸 대략적인 값이에요. 날씨, 코스, 컨디션에 따라 달라져요. 입력한 값은 이 기기 밖으로 나가지 않아요.
- about en: Predictions use a common distance–time rule of thumb (Riegel's formula) and are rough estimates. Weather, course and form change real results. Nothing you type leaves this device.

## Pitch

The screen is a clean card on a dark winter-dawn background with a thin track line along the bottom.

1. Three big segment buttons sit at the top: 페이스 구하기 / 기록 구하기 / 거리 구하기.
2. The user fills two inputs. The third value appears instantly in large digits, for example "5:30 /km".
3. Below the answer: speed (km/h, which doubles as the treadmill setting), pace per mile, a scrollable km split table and a prediction row for 5K / 10K / Half / Full.
4. "결과 복사" copies a tidy text summary.

The page opens with a filled 10K 55:00 example, so the user sees value within the first second.

## Flow

The tool has a single screen and no game loop.

1. **Load**
   - Restore the last mode and inputs from localStorage.
   - With nothing stored, use mode `pace`, distance 10, time 0:55:00.
   - Compute right away.
2. **Mode switch**
   - Tapping a segment changes which field is the output.
   - The output field becomes read-only and shows the computed value in an accent color.
   - The other two fields become editable and keep their current values. The newly freed field keeps the value it last showed as an output, rounded, so nothing goes blank.
3. **Edit**
   - Every `input` event recomputes the result. There is no calculate button.
   - Invalid or empty input shows a gray "—" in the result and a one-line hint. Never show an error popup.
4. **Results panel**
   - The main answer is at 40 px bold.
   - Below it is a 3-cell stat row: 시속 km/h, 마일 페이스 /mi, 1km 걸리는 시간.
   - Then the tabs [구간 기록] [예상 기록], with content that scrolls inside the panel.
5. **Copy**
   - The sticky bottom bar holds [결과 복사] and [초기화].
   - 초기화 resets to the 10K 55:00 default. It needs no confirmation because nothing of value is lost.

## Inputs

- **Distance**
  - `<input type="number" inputmode="decimal" min="0.1" max="500" step="0.001">` in km.
  - Chips below it: 5K (5), 10K (10), 하프 (21.0975), 풀코스 (42.195), each at least 44 px tall.
  - The active chip is highlighted when the distance matches within 0.0005.
- **Time**
  - Three `<input type="number" inputmode="numeric">` boxes: 시 (0–99), 분 (0–59), 초 (0–59).
  - Labels sit under the boxes.
  - Minutes or seconds above 59 are normalized on blur. For example, 0:75:00 becomes 1:15:00.
- **Pace**
  - Two boxes: 분 (0–59) and 초 (0–59), with a "/km" suffix.
- All inputs are at least 44 px tall with 18 px text. Focus selects the whole value so the user can retype fast.
- Native number inputs are enough. Do not build custom pickers.

## Math

All values are in seconds and km internally.

- pace = time / distance (s/km)
- time = pace × distance
- distance = time / pace
- speed km/h = 3600 / pace
- pace per mile = pace × 1.609344
- Display rounds to the nearest second: `h:mm:ss` when there are hours, otherwise `m:ss`. Distance shows up to 2 decimals, with trailing zeros trimmed (21.1 shows as "21.1", but 21.0975 shows as "21.1 km (하프)" via a chip label match).
- **Splits:**
  - one row per whole km, with the cumulative time at k × pace
  - a final partial row when the remainder is ≥ 0.001 km (for example "42.195 km")
  - For distances over 50 km, show every 5 km to keep the list short.
- **Prediction (Riegel):**
  - T2 = T1 × (D2 / D1)^1.06, for D2 in [5, 10, 21.0975, 42.195]
  - The row whose distance equals the input distance is marked "입력 / yours".
  - Predictions are only shown when the input distance is ≥ 1 km. Otherwise show the hint "1km 이상일 때 예측해요".
- **Fun notes**, one line under the main answer:
  - pace < 2:30/km: "사람 한계를 넘는 속도예요. 입력을 확인해 주세요"
  - pace > 15:00/km: "산책 페이스예요. 천천히도 완주는 완주!"
  - otherwise no note

There is one self-check: `#selftest` runs asserts and logs the result to the console.

- 10 km in 3300 s gives pace 330 s.
- 42.195 km at 300 s/km gives 12658.5 s, which displays as "3:30:59" after rounding half up.
- The Riegel result for 10K 3000 s to the half marathon falls in 6600–6640 s.
- Normalizing 0:75:00 gives 4500 s.

## Controls

- **Pointer:** tap segments, chips, inputs and buttons.
- **Keyboard:** native Tab order (segments → distance → chips → time → pace → tabs → buttons). Enter in an input moves to the next editable input. Segments and tabs are `<button>`s with `aria-pressed`.
- **Layout:** page `touch-action: manipulation`. The results list has `overflow-y: auto` and `touch-action: pan-y`. The page itself never scrolls.

## Screen layout

- A centered column, max-width 480 px, with 16 px padding at 320 px wide. The layout uses `100dvh` with CSS grid rows: header / segments / inputs / result / list (1fr, scrolls internally) / bottom bar.
- **Header:** 🏃 plus the title at 20 px bold, with a small subtitle on one line.
- **Short screens** (height < 560 px): hide the subtitle and the stat row labels' icons, and shrink the main answer to 32 px.
- **Palette:**
  - background: a gradient from #14202e to #1f3347
  - card #f7f8fa, ink #1c232b, muted #6b7684
  - accent #ff6b3d for the computed value and active chips
  - success #2bb673 for the "yours" row
- Numbers use `font-variant-numeric: tabular-nums` with the system-ui stack. Never rely on CJK monospace.
- **Feedback:**
  - When the result changes, the main number does a 120 ms scale pop (1 → 1.06 → 1).
  - On copy, a toast slides up from the bottom bar for 1.6 s.
- **Decoration:** a CSS-only dashed lane line at the bottom of the background slowly shifts with `background-position`.
- **prefers-reduced-motion:** no pop and no lane motion.
- The tool has no sound.

## Strings

| key | ko | en |
|---|---|---|
| appTitle | 러닝 페이스 계산기 | Running Pace Calculator |
| sub | 거리와 기록만 넣으면 페이스·스플릿·예상 기록까지 | Distance + time → pace, splits and race predictions |
| modePace / modeTime / modeDist | 페이스 구하기 / 기록 구하기 / 거리 구하기 | Find pace / Find time / Find distance |
| distance | 거리 | Distance |
| km | km | km |
| chip5k / chip10k / chipHalf / chipFull | 5K / 10K / 하프 / 풀코스 | 5K / 10K / Half / Marathon |
| time | 기록 | Time |
| h / m / s | 시 / 분 / 초 | h / m / s |
| pace | 페이스 | Pace |
| perKm / perMi | /km / /mi | /km / /mi |
| speed | 시속 | Speed |
| kmh | km/h | km/h |
| milePace | 마일 페이스 | Pace per mile |
| perKmTime | 1km 걸리는 시간 | Time per km |
| tabSplits / tabPredict | 구간 기록 / 예상 기록 | Splits / Predictions |
| splitKm / splitTime | 지점 / 누적 기록 | Point / Elapsed |
| predDist / predTime / predPace | 거리 / 예상 기록 / 페이스 | Distance / Predicted / Pace |
| yours | 입력 | yours |
| predNote | 리겔 공식으로 낸 대략적인 값이에요 | Rough estimate (Riegel's formula) |
| predMin | 1km 이상일 때 예측해요 | Predictions need at least 1 km |
| hintEmpty | 두 칸을 채우면 바로 계산돼요 | Fill in two fields to see the result |
| hintZero | 0보다 큰 값을 넣어 주세요 | Please enter a value above zero |
| hintRange | 거리는 0.1~500km 사이로 넣어 주세요 | Distance must be between 0.1 and 500 km |
| noteFast | 사람 한계를 넘는 속도예요. 입력을 확인해 주세요 | That's faster than humanly possible. Check your input. |
| noteSlow | 산책 페이스예요. 천천히도 완주는 완주! | A strolling pace. Slow and steady still finishes! |
| copy / reset | 결과 복사 / 초기화 | Copy result / Reset |
| copied / copyFail | 복사했어요 / 복사하지 못했어요 | Copied / Could not copy |
| distHalfLabel / distFullLabel | 하프 / 풀코스 | Half / Marathon |

Copy text:

- **ko**
  - 🏃 {dist}km · 기록 {time} · 페이스 {pace}/km
  - 시속 {kmh}km/h · 마일 {mile}/mi
  - 예상: 5K {t5} / 10K {t10} / 하프 {th} / 풀 {tf}
  - play.mesisi.net
- **en**: the same lines in English. Omit the prediction line when the distance is under 1 km.

Use `navigator.clipboard.writeText`, falling back to a hidden textarea and `execCommand('copy')`. Show a toast on success or failure.

## localStorage (in try/catch, prefix `rpc:`)

- `rpc:mode`: "pace" | "time" | "dist"
- `rpc:dist`: a km string
- `rpc:time`: total seconds
- `rpc:pace`: seconds per km
- `rpc:tab`: "splits" | "predict"

Save these on every valid change, debounced by 300 ms. Corrupt or blocked storage falls back to the defaults silently.

## Edge cases

- **Empty or zero inputs:** the result shows "—" with hintEmpty or hintZero. The splits and predictions lists show the same hint. Never output NaN, Infinity or a negative value.
- **Decimal comma:** on Korean/European keyboards "21,1" is parsed as 21.1. Read `input.value`, falling back to replacing "," with ".".
- **Time 0:00:00 in the find-pace mode** triggers hintZero.
- **Computed time beyond 99:59:59:** show it anyway in h:mm:ss with hours over 99. Do not clamp.
- **Distance mode:** the output is rounded to 2 decimals. If it matches a chip within 0.01 km, show the chip label, for example "42.2 km (풀코스)".
- **Splits for distances under 1 km:** a single row.
- **Resize:** pure CSS layout. Nothing is recomputed except what CSS handles.
- **`lang`:** `?lang=` takes precedence, then `navigator.language`, with `ko` as the fallback. Set `<html lang>` to match.
- **`#demo` hash:** forces mode pace, 10 km and 0:55:00 with the splits tab, ignoring storage. This is for QA thumbnails.
- **`#selftest` hash:** runs the asserts above and prints `selftest ok` or the failing case to the console.

## Must not

- No network of any kind: no fonts, CDNs or fetch. One `index.html` plus `meta.json`.
- No real race names, organizers, sponsors, brand shoes or watches, and no real athletes or world-record holders by name.
- No cutoff times of real races. Do not claim official accuracy.
- No health, training-plan, heart-rate, calorie or injury advice. Predictions are labeled as estimates.
- No alert, confirm, prompt, window.open or navigation. No sound.
- No page scroll. Only the results list scrolls internally.
- No custom picker widgets or chart library. Native inputs and an HTML table are enough.
