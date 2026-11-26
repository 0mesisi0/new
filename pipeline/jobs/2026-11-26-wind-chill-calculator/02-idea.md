# Idea and spec: 체감온도 계산기 · 오늘 뭐 입지? / Wind Chill Calculator: What to Wear

## Concepts scored

Each concept is scored 1–5 on four things: value in the first 10 seconds, originality, Korean search/share demand, and buildability in one HTML file. The maximum is 20.

| Concept | Category | Score | Verdict |
|---|---|---|---|
| 콩나물시루 하루 한 번 물 주기 (a daily-care pet: water a bean-sprout pot once a day, and it grows overnight) | games | 2/4/2/4 = 12 | The once-a-day loop gives nothing to do in the first 10 seconds. Keep it in the backlog. |
| 마지막 달력 한 장 뜯기 (the last December calendar page keeps growing back as strange pages like "13월" or "12월 32일") | weird | 4/4/3/5 = 16 | Good gag, but most of its share value lands on 12/31. Save it for late December. |
| **체감온도 계산기 · 오늘 뭐 입지?** | **info** | **4/3/5/5 = 17** | **Picked.** "체감온도" is searched every winter morning, and the result is a dressed-up character card that is easy to share. No existing item or queued spec covers wind chill or weather. |

## Meta

- slug `wind-chill-calculator`, category `info`, kind `tool`, aspect `3/4`, date `2026-11-26`
- tags: ko `체감온도`, `겨울옷차림`; en `wind-chill`, `winter-outfit`
- title: ko `체감온도 계산기 · 오늘 뭐 입지?`; en `Wind Chill Calculator: What to Wear`
- desc ko: 기온과 풍속을 넣으면 바람 때문에 실제로 얼마나 춥게 느껴지는지 계산해요. 캐릭터가 그 온도에 맞춰 목도리, 장갑, 롱패딩까지 껴입어요.
- desc en: Enter the temperature and wind speed to see how cold it really feels. A little character bundles up to match, from a light coat to a full long puffer.
- howto ko: 날씨 앱에 나온 기온(°C)과 풍속을 슬라이더나 숫자로 넣으세요. 풍속 단위는 m/s와 km/h 중에서 고를 수 있어요. 체감온도와 옷차림 단계가 바로 바뀌어요. '결과 복사'를 누르면 친구에게 보낼 수 있어요.
- howto en: Enter the air temperature (°C) and wind speed from your weather app, using the sliders or number boxes. Switch the wind unit between m/s and km/h. The feels-like temperature and outfit level update instantly. Tap "Copy result" to share it.
- about ko: 겨울철 체감온도에 널리 쓰이는 JAG/TI 공식(2001)으로 계산해요. 기온 10°C 이하, 풍속 4.8 km/h(1.3 m/s) 이상일 때만 의미가 있어요. 옷차림 단계는 재미로 만든 참고용이에요. 공식 한파 특보는 기상청에서 확인하세요. 입력한 값은 이 기기 밖으로 나가지 않아요.
- about en: Uses the standard JAG/TI wind chill formula (2001). It only applies at 10°C or below with wind of at least 4.8 km/h (1.3 m/s). The outfit levels are a fun guide, not an official warning, so check your national weather service for alerts. Your inputs never leave this device.

## Pitch

The screen shows a small round character standing on a snowy street, with wind streaks blowing across it. As the user drags the temperature down or the wind up, three things change:

1. The big number shows the feels-like temperature.
2. The character puts on layers one by one: coat, scarf, gloves, hat, long puffer and hand warmer. Each new layer pops in.
3. A line explains the effect, for example "바람 때문에 6.8°C 더 춥게 느껴져요".

The result is useful (a real formula), visual (the character) and shareable (copy text).

## Formula

- Inputs:
  - T is the air temperature in °C.
  - V is the wind speed in km/h. If the user enters m/s, V = m/s × 3.6.
- Wind chill: W = 13.12 + 0.6215·T − 11.37·V^0.16 + 0.3965·T·V^0.16
- When the formula applies:
  - If T > 10 or V < 4.8, set W = T and show the `noEffect` note.
  - Otherwise, show W rounded to 1 decimal.
- Difference: D = T − W, rounded to 1 decimal. Show `diffLine` only when D ≥ 0.1.
- Check values for the builder's assert self-test:
  - T=−5, V=21.6 km/h (6 m/s) gives W ≈ −11.8.
  - T=0, V=10 km/h gives W ≈ −3.3.
  - T=12, V=30 gives W = 12, because T is above 10.
  - T=−10, V=3 gives W = −10, because V is below 4.8.
- Before building, the builder should check the formula against the 기상청 체감온도 page. The JAG/TI formula is from general knowledge and was not checked in today's research.

## Outfit tiers (by W)

| Level | W range | Layers added (cumulative) | ko line | en line |
|---|---|---|---|---|
| 1 | W ≥ 10 | 🧥 가벼운 겉옷 | 산책하기 좋은 날씨예요 | Nice weather for a walk |
| 2 | 5 ≤ W < 10 | 코트 | 코트 하나면 충분해요 | A coat is enough |
| 3 | 0 ≤ W < 5 | + 🧣 목도리 | 목도리가 생각나는 날 | Scarf weather |
| 4 | −5 ≤ W < 0 | 패딩 (replaces the coat) | 패딩 꺼낼 시간이에요 | Time for the puffer |
| 5 | −10 ≤ W < −5 | + 🧤 장갑 | 손이 시려요, 장갑 챙기세요 | Cold hands, bring gloves |
| 6 | −15 ≤ W < −10 | + 🧢 모자·귀마개 | 귀가 떨어질 것 같은 날 | Your ears will complain |
| 7 | −25 ≤ W < −15 | 롱패딩 + 🔥 핫팩 | 롱패딩 풀무장 필수 | Full long-puffer mode |
| 8 | W < −25 | Everything plus a face cover, and the character shivers | 꼭 나가야 한다면 피부를 최대한 가리세요 | If you must go out, cover all bare skin |

- The tier bar shows 8 dots. The current dot is filled with the tier color.
- Tier colors go from #f2b84b (level 1) to #2f6fd6 (level 8).

## Flow

There is a single screen with no start or end screens. This item is a tool, so rule 6 does not apply.

1. **On load**
   - Restore the last inputs. If there are none, use T = 0 and V = 3 m/s.
   - Compute and render immediately.
2. **Adjust**
   - Each slider or number change recomputes W on input.
   - The character layers animate: a pop scale 0.6 → 1 over 180 ms.
   - The number tweens over 200 ms.
3. **Copy result**
   - A toast confirms the copy.
4. **Reset** (a small link)
   - Restores the defaults but keeps the unit.

## Layout (one screen, no page scroll)

- Top: the title, and the 'm/s | km/h' unit toggle on the right.
- Scene: an SVG of about 40% height.
  - It contains a sky gradient, a snowy ground and the character, built from simple shapes plus layer groups.
  - Wind streaks are lines that loop left to right. Their speed and count scale with V, up to 24 lines.
  - Snow particles appear only when T ≤ 0.
- Result card:
  - the big W at 48 px bold, for example "−11.8°C"
  - the `feelsLabel` above it
  - the `diffLine` or the `noEffect` note
  - the tier line and the tier dots
- Inputs:
  - Temperature slider from −30 to 15 °C in steps of 0.5, with a number box.
  - Wind slider from 0 to 20 m/s in steps of 0.5, or 0 to 72 km/h in steps of 1, with a number box.
  - Quick wind chips: 0 / 2 / 4 / 6 / 8 m/s. In km/h mode the chip labels are converted and rounded.
- Bottom bar: [결과 복사] [초기화].
- At 320 px wide the scene shrinks to 32% height and the number box goes under the slider. Short heights (under 520 px) hide the tier dots.
- On wide screens, a centered column of up to 520 px.
- Font: the system-ui stack. Numbers use `font-variant-numeric: tabular-nums`.
- Palette: navy #1d2433, snow #f5f7fb, accent #e0453d, text #23262d.

## Controls

- **Pointer:** drag the sliders, tap the chips, the unit toggle and the buttons. Targets are at least 44 px.
- **Keyboard:**
  - The sliders are native `<input type="range">`, so arrows and Page keys work.
  - ArrowUp/ArrowDown with no focus change T by 1.
  - Shift+ArrowUp/ArrowDown changes V by 1 unit.
  - U toggles the unit and C copies.
- **Number boxes:** `inputmode="decimal"`. Clamp values to the slider range on blur. Accept a comma as the decimal separator.
- **Touch:** the scene has `touch-action:none` and does not react to touch.

## Strings

| key | ko | en |
|---|---|---|
| appTitle | 체감온도 계산기 | Wind Chill Calculator |
| sub | 오늘 뭐 입지? | What to wear today? |
| tempLabel | 기온 (°C) | Temperature (°C) |
| windLabel | 풍속 | Wind speed |
| unitMs / unitKmh | m/s / km/h | m/s / km/h |
| feelsLabel | 체감온도 | Feels like |
| diffLine | 바람 때문에 {d}°C 더 춥게 느껴져요 | The wind makes it feel {d}°C colder |
| noEffect | 기온이 10°C를 넘거나 바람이 약하면 체감온도는 기온과 같아요 | Above 10°C or in light wind, it feels like the air temperature |
| tierN (1–8) | see the tier table | see the tier table |
| calm / breeze / windy / gale | 잔잔함 / 산들바람 / 바람 강함 / 몸이 밀리는 바람 | Calm / Breezy / Windy / Pushes you around |
| copy / reset | 결과 복사 / 초기화 | Copy result / Reset |
| copied / copyFail | 복사했어요 / 복사하지 못했어요 | Copied / Could not copy |
| foot | 재미용 참고 정보예요. 한파 특보는 기상청에서 확인하세요 | For fun and reference only. Check official weather alerts. |
| shareText | 🥶 오늘 기온 {t}°C, 바람 {v}{unit} → 체감 {w}°C / 옷차림 {n}단계: {tierLine} / play.mesisi.net | 🥶 {t}°C with {v}{unit} wind → feels like {w}°C / Outfit level {n}: {tierLine} / play.mesisi.net |

- The wind descriptor sits under the wind slider and uses m/s bands: <1.5 calm, <5.5 breeze, <10.8 windy, otherwise gale.
- Negative numbers use a real minus sign "−" for display. The share text uses the same sign.

## localStorage (in try/catch, prefix `wcc:`)

- `wcc:unit`: "ms" or "kmh", default "ms"
- `wcc:t`: the last temperature
- `wcc:v`: the last wind speed, always stored in m/s

No sound and no other keys.

## Edge cases

- Switching the unit converts the current V in place. It does not reset it.
- Typing an empty or non-numeric value keeps the last valid value. Values outside the range are clamped on blur.
- W is never shown as "−0.0". Normalize it to "0.0".
- Both boundaries must be handled: T = 10 with V ≥ 4.8 uses the formula, and V = 4.8 exactly uses the formula.
- Resizing re-lays out the SVG through its viewBox. Wind lines keep their phase.
- When the page is hidden, pause the wind and snow rAF and cap delta at 50 ms.
- `prefers-reduced-motion`: static wind lines, no snow fall, no pop or tween.
- Clipboard: fall back to a hidden textarea and `execCommand('copy')`, then show the toast. Never use alert.
- Blocked localStorage: everything still works with the defaults.
- `#demo` sets T = −5 and V = 6 m/s, which gives a level 6 thumbnail.

## Must not

- No network, no geolocation and no live weather fetch. The user types the values.
- Do not imitate the 기상청 site, weather-app UIs or any brand logos. No real clothing brands.
- No medical claims such as "동상까지 N분" (minutes until frostbite). Tier 8 is the only safety line, phrased gently.
- Do not call the tiers official warning levels (관심/주의/경고/위험).
- No alert, confirm, prompt, window.open or navigation, and no sound.
- Keep the build under 100 KB, with the character drawn in inline SVG or emoji only.
