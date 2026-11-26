# Idea and spec: 전기장판 전기세 계산기 / Heater Electric Bill Calculator

## Concepts scored

Each concept is scored 1–5 on four things: value in the first 10 seconds, originality, Korean search/share demand, and how easy it is to build in one HTML file. The maximum is 20.

| Concept | Category | Score | Verdict |
|---|---|---|---|
| 고드름 실로폰 / Icicle Xylophone: tap icicles of different lengths to play notes, and long-press to snap them off with a crunch | cool | 5/4/2/5 = 16 | Fun toy, but few people search for it. Keep it for a cold-snap day |
| 하루 한 번 창가 화분 / One-a-Day Windowsill Plant: water a winter plant once per day, and it changes the next day (the "come back tomorrow" pattern from research #4) | games | 2/4/3/4 = 13 | Weak in the first 10 seconds and needs several days to pay off. Keep in the backlog |
| **전기장판 전기세 계산기 / Heater Electric Bill Calculator** | **tools** | **4/3/5/5 = 17** | **Picked.** "전기장판 전기세" and "온풍기 전기세" are searched every winter. The tiered-rate angle ("내가 3단계로 넘어가나?") and the side-by-side comparison are what make it worth sharing. None of the existing items or queued specs covers heating appliances |

## Meta

- slug `heater-electric-bill`, category `tools`, kind `tool`, aspect `9/16`, date `2026-11-26`
- tags: ko `전기세`, `전기장판`, `난방비`; en `electric-bill`, `heater`, `winter`
- title: ko `전기장판 전기세 계산기`; en `Heater Electric Bill Calculator`
- desc ko: 전기장판·온수매트·온풍기를 하루 몇 시간 켜면 이번 달 전기요금이 얼마나 늘까요? 누진 구간까지 반영해 추가 요금과 하루 비용을 바로 보여 줘요.
- desc en: How much will your electric blanket, heater or fan heater add to this month's bill? See the extra cost per month, day and hour, including Korea's tiered rates.
- howto ko: 기기를 고르고 하루 사용 시간과 한 달 사용 일수를 정하세요. 평소 월 사용량(kWh)을 넣으면 누진 구간을 반영한 추가 요금이 바로 계산돼요. 아래에서 다른 기기와 비교할 수도 있어요.
- howto en: Pick an appliance and set the hours per day and days per month. Enter your usual monthly usage in kWh so the tiered rates are applied. The extra cost updates instantly, and the list below compares other appliances used for the same hours.
- about ko: 주택용 저압 요금표를 바탕으로 한 추정치예요. 실제 청구액은 계약 종류, 검침일, 기기의 실제 소비전력에 따라 달라요. 정확한 금액은 고지서나 한국전력 안내를 확인하세요. 입력값은 이 기기 밖으로 나가지 않아요.
- about en: This is an estimate based on Korea's residential low-voltage tariff. Real bills depend on your contract, meter-reading date and the appliance's actual draw, so check your bill or KEPCO for exact figures. Your inputs never leave this device.

## Pitch

The page is one warm, cozy card on a dark winter-night background. The user taps an appliance chip (🛏️ 전기장판) and drags two sliders: hours per day and days per month. A large number updates live: **"이번 달 +₩12,340"**, with the cost per day and per hour shown underneath.

A tier bar shows the user's usual usage, followed by the added usage in orange. If the added usage pushes them into a higher tier, a red badge appears: "2단계 → 3단계 진입!". Below that, a comparison list ranks every preset appliance by monthly cost for the same hours. This answers the real question people have: "전기장판 vs 온풍기, 뭐가 싸?" A "텍스트 복사" button copies a short summary to share.

The calculation is marginal: the extra cost is bill(base + added) − bill(base). This is the honest answer under tiered pricing, and most simple calculators online get it wrong.

## Flow

The tool has a single screen and no start screen, because it is a tool and not a game.

1. **On load**
   - Restore the saved inputs from localStorage, or use the defaults: 전기장판 (2인), 8 h/day, 30 days and base usage 250 kWh.
   - Compute and show the result right away.
   - If `location.hash === '#demo'`, force 온풍기, 6 h, 30 days and 300 kWh. This is for QA thumbnails only.
2. **Edit**
   - Any change to a chip, slider or number recomputes everything immediately. There is no "calculate" button.
   - The big number counts up or down to its new value in 250 ms (ease-out).
3. **Tier warning**
   - If the tier at the total usage is higher than the tier at the base usage, show the badge with a 1.0 → 1.15 → 1.0 pop that lasts 200 ms.
   - The pop runs only when the badge first appears, not on every input.
4. **Copy**
   - "결과 복사" copies the share text and shows a toast.
5. **Reset**
   - "초기화" restores the defaults and clears the saved inputs.

## Controls

- **Pointer**
  - Tap a chip to select it.
  - Drag a slider, or tap its −/+ step buttons. The step buttons are 44 px or larger.
  - Number fields use `inputmode="numeric"`.
- **Keyboard**
  - Every control is focusable in a logical tab order.
  - Arrow keys work on focused sliders. Native range inputs already support this, so no custom handling is needed.
  - Enter or Space on a chip selects it.
  - `C` copies when focus is not inside an input.
- **Layout**
  - `body` uses `overflow:hidden`. The main column has `overflow-y:auto` and `touch-action:pan-y`, so on small screens the panel scrolls internally and the page itself never scrolls.
  - The result card is `position:sticky; top:0` inside the column, so the big number stays visible while the user edits inputs below it.

## Appliance presets

Rated watts and duty cycles are typical rough values. They are **not** product specs. Both stay editable once selected, and changing either one switches the chip to "직접 입력".

| id | emoji | ko | en | W | duty % (default) |
|---|---|---|---|---|---|
| eblanket1 | 🛏️ | 전기요 (1인) | Electric blanket (single) | 100 | 50 |
| emat2 | 🟧 | 전기장판 (2인) | Electric mat (double) | 200 | 50 |
| watermat | 💧 | 온수매트 | Hot-water mat | 300 | 50 |
| smallheater | 🔥 | 소형 전기히터 | Small electric heater | 800 | 100 |
| oilrad | 🧱 | 오일 라디에이터 | Oil-filled radiator | 1500 | 60 |
| fanheater | 🌬️ | 온풍기 | Fan heater | 2000 | 70 |
| custom | ✏️ | 직접 입력 | Custom | (last values) | (last values) |

The duty cycle stands for how often the thermostat actually keeps the element on. Show it as the slider "실제 가동률", ranging from 10–100 % in steps of 5. Its helper text is: "온도 조절기가 켜졌다 꺼졌다 해서 정격 전력보다 덜 써요".

## Inputs and validation

| field | ko label | en label | range | step | default |
|---|---|---|---|---|---|
| watts | 소비전력 (W) | Power (W) | 1–5000 | 10 | preset |
| duty | 실제 가동률 (%) | Duty cycle (%) | 10–100 | 5 | preset |
| hours | 하루 사용 시간 | Hours per day | 0–24 | 0.5 | 8 |
| days | 한 달 사용 일수 | Days per month | 1–31 | 1 | 30 |
| base | 평소 월 사용량 (kWh) | Usual monthly usage (kWh) | 0–2000 | 10 | 250 |

- Clamp values on blur. Treat an empty value or NaN as the default.
- Accept full-width digits and commas, and strip them before parsing.
- The helper text under the base field is "고지서의 '사용량'을 보세요. 모르면 그대로 두세요" / "Check 'usage' on your bill. Not sure? Leave it."

## Calculation

```
addedKWh = watts × duty/100 × hours × days / 1000
total    = base + addedKWh
extra    = bill(total) − bill(base)          // monthly won
perDay   = extra / days ; perHour = hours > 0 ? perDay / hours : 0
```

`bill(kwh)` follows the residential low-voltage tariff for the non-summer season, which covers November–February. It is one constants object, `TARIFF`, with an `asOf` string shown in the footnote.

> **Builder: verify every number below against KEPCO's current residential low-voltage tariff before building, and update `asOf`.** These values come from general knowledge, not a fresh check.

```
TARIFF = {
  asOf: '2026-11 확인 필요',
  tiers: [ {upTo:200, base:910,  rate:120.0},
           {upTo:400, base:1600, rate:214.6},
           {upTo:Infinity, base:7300, rate:307.3} ],
  superUser: { months:[12,1,2], above:1000, rate:736.2 },  // winter super-user rate
  climate: 9.0,      // 기후환경요금 원/kWh
  fuelAdj: 5.0,      // 연료비조정요금 원/kWh
  vat: 0.10,
  fund: 0.027        // 전력산업기반기금 — verify (has changed recently)
}
```

- **Base charge:** the base charge of the tier that the total kWh falls in.
- **Energy charge:** the kWh in each tier band × that band's rate.
  - In December, January and February, the kWh above 1000 is charged at `superUser.rate` instead of the tier-3 rate.
  - The month is taken from `new Date()`.
- **Total before VAT:** `subtotal = floor(base + energy + kwh×climate + kwh×fuelAdj)`.
- **VAT and fund:** `vatAmt = round(subtotal × vat)` and `fundAmt = floor(subtotal × fund / 10) × 10`.
- **Bill:** `bill = floor((subtotal + vatAmt + fundAmt) / 10) × 10`.
- **Rounding of kWh:** keep 1 decimal place for display. The calculation uses `Math.round(kwh)`, because the meter bills whole kWh.
- **Check:** keep a `demo()` self-check behind `?selftest`. It asserts:
  - bill(0) = 910 base plus taxes;
  - bill is monotonic over 0..1500;
  - extra(200→201) > extra(199→200), which shows the tier jump.

## Screen layout (single screen, top to bottom)

1. **Header bar**
   - Title "전기장판 전기세 계산기" in 20 px bold.
   - A 🔊 toggle is not needed because the tool has no sound.
   - A "초기화" text button on the right.
2. **Result card (sticky)**
   - Label "이번 달 추가 요금", then a big `+₩12,340` in 36 px bold monospace digits, in warm orange #ff9a3c.
   - A row of three mini stats: 하루 ₩411 · 1시간 ₩51 · +48.0 kWh.
   - A friendly line: "하루 붕어빵 약 {n}마리 값" (1마리 = 500원 가정). It is hidden when n < 1.
3. **Tier bar**
   - A horizontal bar from 0 to max(500, total × 1.1) kWh.
   - Tier boundaries at 200 and 400 are dashed ticks labelled 1단계, 2단계 and 3단계.
   - The base segment is gray and the added segment is orange.
   - When the tier rises, a red badge reads "{a}단계 → {b}단계 진입!".
   - In the super-user months, when total > 1000, a second badge reads "겨울 슈퍼유저 요금 구간".
4. **Appliance chips**
   - A wrap grid of 7 chips, each showing the emoji and the name.
   - The selected chip has an orange border and a tinted fill.
5. **Inputs**
   - The five fields in the order of the table: watts, duty, hours, days, base.
   - Each one is a slider plus a numeric field showing the current value. The base field is a numeric field only, with ± buttons in steps of 10.
6. **Comparison list "같은 시간 쓰면?"**
   - Uses the current hours, days and base for all 6 presets, each with its default W and duty, sorted cheapest first.
   - Each row shows the emoji, the name, a proportional bar and `₩{extra}/월`.
   - The current appliance's row is highlighted. Tapping a row selects that preset.
7. **Actions**
   - [결과 복사] [초기화] as full-width 48 px buttons.
8. **Footnote**
   - The about text, shortened, plus "요금 기준: {asOf}".

## Visual design

- **Palette**
  - Background: a gradient from #141a2a to #1f2a44.
  - Card #fff8ef, ink #2a2420, muted text #8b8178.
  - Warm accent #ff9a3c, warning red #e0453d, gray segment #c9c2b8.
- **Type and decoration**
  - Use the system-ui stack. Numbers use `font-variant-numeric: tabular-nums`.
  - Decoration is a faint steam or heat-wave CSS gradient at the top of the result card. It is static when `prefers-reduced-motion` is set.
- **Column width**
  - The column has max-width 480 px and is centered. At 320 px wide, side padding is 12 px and the mini stats wrap onto 2 lines.
  - Chips are at least 44 px tall. Chip labels wrap and are never truncated.
- **Reduced motion**
  - With `prefers-reduced-motion`, there is no count-up and no badge pop.

## Share text (copy)

- ko: `🔥 {appliance}을(를) 하루 {h}시간, 한 달 {d}일 쓰면 / 이번 달 전기요금 약 +₩{extra} (하루 ₩{perDay}) / {tierLine} / play.mesisi.net`
- en: `🔥 {appliance}, {h} h/day for {d} days / about +₩{extra} on this month's bill (₩{perDay}/day) / {tierLine} / play.mesisi.net`
- `{tierLine}` is "누진 {a}단계 → {b}단계" / "Tier {a} → {b}" when the tier rises. Otherwise it is "누진 구간 그대로" / "Same tier".
- Copy with `navigator.clipboard.writeText`. If that fails, fall back to a hidden textarea and `execCommand('copy')`. Show a toast in both cases.

## Strings

| key | ko | en |
|---|---|---|
| appTitle | 전기장판 전기세 계산기 | Heater Electric Bill Calculator |
| extraLabel | 이번 달 추가 요금 | Extra on this month's bill |
| perDay | 하루 | Per day |
| perHour | 1시간 | Per hour |
| addedKwh | 추가 사용량 | Added usage |
| fishBread | 하루 붕어빵 약 {n}마리 값 | About {n} fish-shaped pastries a day |
| fishBreadNote | 1마리 500원 가정 | Assuming ₩500 each |
| tier | {n}단계 | Tier {n} |
| tierUp | {a}단계 → {b}단계 진입! | Tier {a} → {b}! |
| superUser | 겨울 슈퍼유저 요금 구간 | Winter super-user rate |
| sameTier | 누진 구간 그대로 | Same tier |
| chipsHead | 어떤 기기를 쓰나요? | Which appliance? |
| watts / duty / hours / days / base | 소비전력 (W) / 실제 가동률 (%) / 하루 사용 시간 / 한 달 사용 일수 / 평소 월 사용량 (kWh) | Power (W) / Duty cycle (%) / Hours per day / Days per month / Usual monthly usage (kWh) |
| dutyHelp | 온도 조절기가 켜졌다 꺼졌다 해서 정격 전력보다 덜 써요 | Thermostats cycle on and off, so real draw is below the rating |
| baseHelp | 고지서의 '사용량'을 보세요. 모르면 그대로 두세요 | Check 'usage' on your bill. Not sure? Leave it. |
| hoursUnit / daysUnit | 시간 / 일 | h / days |
| compareHead | 같은 시간 쓰면? | Same hours, other appliances |
| perMonth | /월 | /mo |
| copy / reset | 결과 복사 / 초기화 | Copy result / Reset |
| copied / copyFail | 복사했어요 / 복사하지 못했어요 | Copied / Could not copy |
| resetDone | 기본값으로 돌렸어요 | Back to defaults |
| zeroHours | 사용 시간이 0이면 추가 요금도 0원이에요 | Zero hours means zero extra cost |
| foot | 주택용 저압 요금 기준 추정치예요. 실제 청구액은 다를 수 있어요. | Estimate based on the residential low-voltage tariff. Your real bill may differ. |
| asOf | 요금 기준: {asOf} | Rates as of: {asOf} |

The preset names are listed in the Appliance presets table.

## localStorage (in try/catch, prefix `heb:`)

- `heb:state`: JSON `{preset, watts, duty, hours, days, base}`, written on change with a 300 ms debounce.
- `heb:custom`: JSON `{watts, duty}`, the last custom values.

If storage is blocked, everything still works with the defaults.

## Edge cases

- hours = 0: extra is 0, perHour is ₩0 and the zeroHours hint is shown. Never divide by zero.
- base = 0: the calculation still works. The tier bar starts empty.
- A huge input such as 5000 W × 100 % × 24 h × 31 days gives 3720 kWh. It must render without overflow: the big number shrinks to fit with a `clamp()` font size.
- In super-user months, the 1000 kWh line appears on the tier bar only when the total is above 900.
- Editing watts or duty while a preset is selected switches the selection to "직접 입력" and saves to `heb:custom`.
- `lang` comes from `?lang=` with a fallback to `navigator.language`. `<html lang>` must match. Number formatting uses `toLocaleString('ko-KR')` for both languages, because the currency is ₩.
- On resize, only the CSS layout changes. There is no canvas, so there is nothing to redraw.
- `#demo` prefills the inputs for QA thumbnails, as described in Flow.

## Must not

- No network of any kind: no live tariff fetch. The tariff is a constants object only.
- Do not imitate the look, logo or wording of KEPCO (한국전력) or any power-company bill or app. Name KEPCO only in plain text in the about line.
- No real appliance brands or model names.
- No gas boiler, district heating or commercial or industrial tariffs. This tool covers residential electricity only, and says so in the foot line.
- No safety advice beyond nothing. Do not claim an appliance is "safe" or "healthy" to leave on.
- Do not present the result as an exact bill. Always say "약" or "추정" / "about" or "estimate".
- No alert, confirm, prompt, window.open or navigation. No sound.
