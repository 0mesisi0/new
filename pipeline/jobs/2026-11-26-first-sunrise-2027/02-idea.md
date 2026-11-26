# Idea and spec: 2027 새해 첫 해돋이 시간 / First Sunrise 2027

## Concepts scored

Each concept is scored 1–5 on four things: value in the first 10 seconds, originality, Korean search/share demand, and buildability in one HTML file. The maximum is 20.

| Concept | Category | Score | Verdict |
|---|---|---|---|
| 앞유리 성에 긁기 / Windshield Frost Scraper: scrape a frozen car windshield with a scraper | cool | 5/3/3/5 = 16 | Its subject sits too close to the queued window, frost and fog specs. Hold it. |
| 비밀번호 뚫리는 시간 / How Long to Crack It: type a password and see a guess-time estimate with an explanation | tech | 4/2/4/5 = 15 | Common on the web, and passwords typed into a box are a sensitive pattern. Skip it. |
| **2027 새해 첫 해돋이 시간 / First Sunrise 2027** | **info** | **5/4/5/4 = 18** | **Picked.** People search "해돋이 시간" heavily from mid-December. No existing or queued item covers sunrise or sunset. It can be computed offline. |

## Meta

- slug `first-sunrise-2027`, category `info`, kind `tool`, aspect `3/4`, date `2026-11-26`
- tags: ko `해돋이 시간`, `새해 일출`, `해넘이`; en `sunrise`, `new-year`, `sunset`
- title: ko `2027 새해 첫 해돋이 시간 · 해넘이 시간`; en `First Sunrise 2027 · New Year Sunrise Times`
- desc ko: 2027년 1월 1일 해돋이와 12월 31일 해넘이 시간을 전국 명소별로 한눈에. 가장 먼저 해가 뜨는 곳, 해가 뜨는 방향, 남은 시간까지 알려 줘요.
- desc en: Sunrise times for 1 January 2027 and sunset times for 31 December 2026 at famous spots across Korea. See which spot gets the sun first, which way to face, and how long is left.
- howto ko: 위쪽에서 '해돋이'와 '해넘이'를 고르고 명소를 누르면 시각, 방향, 남은 시간이 나와요. 위도·경도를 직접 넣어도 돼요. 방향키로 목록을 이동하고 Enter로 고르세요.
- howto en: Choose Sunrise or Sunset at the top, then tap a spot to see the time, the direction and a countdown. You can also enter a latitude and longitude. Arrow keys move through the list and Enter selects.
- about ko: 시간은 천문 공식으로 이 기기에서 직접 계산한 값이라 공식 발표와 1~2분 차이가 날 수 있어요. 산이나 구름 때문에 실제로는 더 늦게 보일 수 있습니다. 정확한 시각은 한국천문연구원 발표를 확인하세요. 2027년은 정미년, 양의 해예요.
- about en: Times are calculated on this device with standard astronomical formulas, so they may differ from official figures by a minute or two. Hills and clouds can make the sun appear later. Check the Korea Astronomy and Space Science Institute for official times. 2027 is the year of the sheep.

## Pitch

The screen is a dawn sky gradient with a sea horizon at the bottom. A sun arc rises over the horizon when the item opens.

1. When the item opens, the big line is "가장 먼저 뜨는 곳: 독도 07:26". Below it is a ranked list of 16 spots sorted by time.
2. Tapping a spot shows its exact time, a compass arrow for the direction to face (for example 남동 118°) and a live countdown such as "D-36 · 12:34:56".
3. A toggle switches between first sunrise (1/1) and last sunset (12/31). The ranking flips, so the spot that sees the sun last comes first.
4. "Copy" puts one share line on the clipboard.

Everything is calculated locally. Nothing is fetched.

## Flow

1. **MAIN** (one screen, no start screen, because this is a tool)
   - Header: the title, and a segmented toggle [🌅 해돋이 1/1] [🌇 해넘이 12/31].
   - Hero card: the selected spot's name, its time in 48 px monospace, the direction arrow, the countdown and the [복사] button.
   - The ranked list scrolls inside its own panel. Each row shows the rank, the spot name, the region, the time and a "+n분" gap from #1.
   - The list ends with a "직접 입력" row. It expands to latitude, longitude and elevation (m) inputs and a [계산] button.
2. **On open**
   - The selected spot is the saved one, or #1 of the ranking.
   - The hero sun rises 40 px over 800 ms with an ease-out curve.
3. **Selecting a row**
   - The hero cross-fades in 200 ms.
   - The compass arrow rotates to the new azimuth over 300 ms.
   - The selected row gets an accent left border.
4. **Countdown reaches zero**
   - The hero says "지금 해가 떠요! 🌅" or "지금 해가 져요 🌇" for 10 minutes.
   - After that the countdown shows "올해 해돋이는 지났어요 · 내년 {Y+1}년 기준 보기". Tapping it recomputes for the next year.

## Controls

- **Pointer:** tap the toggle, the rows, the custom-input row and the buttons. Drag or use the wheel to scroll the list panel.
- **Keys:**
  - ArrowUp and ArrowDown move the row focus, and Enter selects.
  - ArrowLeft and ArrowRight, or the S key, switch between sunrise and sunset.
  - C copies.
- **Touch and layout:** all tap targets are at least 44 px. The list panel uses `touch-action: pan-y`. The page itself never scrolls.

## Calculation

This uses the NOAA general solar position method in plain JS.

- **Times:**
  - Inputs: the date D, latitude φ, longitude λ (east positive) and elevation h in m.
  - γ = 2π/365 × (dayOfYear − 1 + (t_utc_hours − 12)/24).
  - Compute eqtime (minutes) and decl (radians) with the NOAA series.
  - zenith = 90.833° + 0.0293°×√h. The 0.0293°×√h term is the horizon dip; h = 0 for sea-level spots.
  - ha = acos(cos(zen)/(cos φ cos decl) − tan φ tan decl).
  - sunrise UTC minutes = 720 − 4(λ + ha°) − eqtime. Sunset uses −ha.
  - KST = UTC + 540 min. Korea has no daylight saving time.
  - Iterate twice: recompute γ at the estimated event time, then recompute the time.
  - Round to the nearest minute when displaying.
- **Azimuth at the event:** cos(Az) = (sin decl − sin φ cos zen) / (cos φ sin zen), with Az measured from north. For sunset, Az = 360 − Az.
- **Direction labels:** 16-point, ko 북, 북북동, 북동, 동북동, 동, 동남동, 남동, 남남동, 남, … and en N, NNE, NE, ENE, E, ESE, SE, SSE, S, ….
- **Target year:**
  - now = the device time converted to KST.
  - Y = 2027 by default. In general, Y = (it is 1/1 before 12:00 KST) ? the current year : the current year + 1.
  - Sunrise date = Y-01-01. Sunset date = (Y−1)-12-31.
- **No polar case:** clamp the acos input. If |x| > 1, show "이 위치에선 해가 뜨지(지지) 않아요".
- **Self-check (`#test` hash):** assert these within ±2 min and log "ok". The reference values are typical official 1/1 figures; recheck them against the KASI 2027 announcement before shipping.
  - Seoul 1/1 sunrise ≈ 07:47
  - Dokdo ≈ 07:26
  - Ganjeolgot ≈ 07:31
  - Seoul 12/31 sunset ≈ 17:23

## Spots

Coordinates are approximate, from general knowledge. Verify each within ~0.01° before shipping. h is the observer elevation in metres.

| id | ko | en | region ko / en | lat | lon | h |
|---|---|---|---|---|---|---|
| dokdo | 독도 | Dokdo | 경북 울릉군 / Ulleung, Gyeongbuk | 37.2414 | 131.8647 | 0 |
| ulleung | 울릉도 | Ulleungdo | 경북 울릉군 / Ulleung, Gyeongbuk | 37.4840 | 130.9050 | 0 |
| ganjeolgot | 간절곶 | Ganjeolgot Cape | 울산 울주군 / Ulju, Ulsan | 35.3590 | 129.3600 | 0 |
| homigot | 호미곶 | Homigot Cape | 경북 포항 / Pohang, Gyeongbuk | 36.0770 | 129.5680 | 0 |
| haeundae | 해운대 | Haeundae Beach | 부산 / Busan | 35.1587 | 129.1604 | 0 |
| jeongdongjin | 정동진 | Jeongdongjin | 강원 강릉 / Gangneung, Gangwon | 37.6910 | 129.0340 | 0 |
| sokcho | 속초해변 | Sokcho Beach | 강원 속초 / Sokcho, Gangwon | 38.1900 | 128.6000 | 0 |
| seongsan | 성산일출봉 | Seongsan Ilchulbong | 제주 서귀포 / Seogwipo, Jeju | 33.4580 | 126.9420 | 180 |
| hyangiram | 향일암 | Hyangiram Hermitage | 전남 여수 / Yeosu, Jeonnam | 34.5910 | 127.8030 | 100 |
| jirisan | 지리산 천왕봉 | Jirisan Cheonwangbong | 경남 산청 / Sancheong, Gyeongnam | 35.3369 | 127.7307 | 1915 |
| hallasan | 한라산 정상 | Hallasan Summit | 제주 / Jeju | 33.3617 | 126.5292 | 1947 |
| seoul | 서울 남산 | Namsan, Seoul | 서울 / Seoul | 37.5512 | 126.9882 | 0 |
| incheon | 인천 | Incheon | 인천 / Incheon | 37.4563 | 126.7052 | 0 |
| daejeon | 대전 | Daejeon | 대전 / Daejeon | 36.3504 | 127.3845 | 0 |
| daegu | 대구 | Daegu | 대구 / Daegu | 35.8714 | 128.6014 | 0 |
| gwangju | 광주 | Gwangju | 광주 / Gwangju | 35.1595 | 126.8526 | 0 |

- City rows use h = 0 on purpose, matching the convention of official city tables.
- Mountain rows carry a small "⛰ 고도 보정 / elevation-adjusted" tag.
- In sunset mode, add a 17th row: 변산 솔섬 / Byeonsan Sol Island, 전북 부안 / Buan, Jeonbuk, 35.5850, 126.4850, h 0. It is a famous sunset spot. Show it in sunset mode only.

## Screens and visual design

- **Palette:**
  - Sunrise sky: a gradient from #1b2540 through #e8735a to #ffd38a.
  - Sunset sky: a gradient from #2a1f3d through #d9604c to #f7b267.
  - Card #fffaf3 with ink #2a2733, muted #857f8f and accent #ff7a3d.
- **Background canvas:**
  - The horizon line is at 78% of the height, with sea shimmer: 30 short white lines at 30% alpha drifting by sine.
  - The sun is a disc with a soft glow.
  - DPR is capped at 2. The animation pauses when `document.hidden`. Delta time is capped at 50 ms.
- **Hero card:**
  - The spot name is 18 px bold. The time is 48 px `ui-monospace`. The date line is "2027.01.01 (금)".
  - The compass is a 56 px SVG circle with an arrow and a direction label.
  - The countdown is 16 px monospace.
- **List rows:**
  - Each row is 52 px tall. The rank badge for #1 is a gold circle 🥇.
  - The time is right-aligned, with the gap in muted text.
- **Width:**
  - At 320 px wide, the region column moves under the name.
  - At ≥ 700 px wide, the hero and the list sit side by side in two columns, with a max width of 900 px.
- **prefers-reduced-motion:** no sun rise, no shimmer, no arrow rotation, and instant swaps.
- **Toast:** a bottom-center pill that stays for 1.8 s.

## Strings

| key | ko | en |
|---|---|---|
| appTitle | 2027 새해 첫 해돋이 시간 | First Sunrise 2027 |
| modeRise | 🌅 해돋이 1/1 | 🌅 Sunrise 1 Jan |
| modeSet | 🌇 해넘이 12/31 | 🌇 Sunset 31 Dec |
| firstRise | 가장 먼저 뜨는 곳 | First to see the sun |
| lastSet | 가장 늦게 지는 곳 | Last to see the sun |
| riseAt / setAt | 해돋이 / 해넘이 | Sunrise / Sunset |
| face | {dir} 방향 ({deg}°)을 보세요 | Face {dir} ({deg}°) |
| countdown | D-{d} · {hh}:{mm}:{ss} 남음 | D-{d} · {hh}:{mm}:{ss} to go |
| nowRise / nowSet | 지금 해가 떠요! 🌅 / 지금 해가 져요 🌇 | The sun is rising now! 🌅 / The sun is setting now 🌇 |
| passed | 올해는 지났어요 · {Y}년 기준 보기 | Already passed · Show {Y} |
| gap | +{n}분 | +{n} min |
| elev | ⛰ 고도 보정 | ⛰ Elevation-adjusted |
| custom | 직접 입력 | Custom location |
| lat / lon / height | 위도 / 경도 / 고도(m) | Latitude / Longitude / Elevation (m) |
| calc | 계산 | Calculate |
| badInput | 위도 −66~66, 경도 −180~180, 고도 0~9000 사이로 넣어 주세요 | Enter latitude −66 to 66, longitude −180 to 180 and elevation 0 to 9000 |
| noEvent | 이 위치에선 그날 해가 뜨거나 지지 않아요 | The sun does not rise or set here that day |
| copy | 복사 | Copy |
| copied / copyFail | 복사했어요 / 복사하지 못했어요 | Copied / Could not copy |
| shareRise | 🌅 {Y}년 첫 해돋이 {spot} {time} ({dir} 방향) · play.mesisi.net | 🌅 First sunrise of {Y} at {spot}: {time} KST, facing {dir} · play.mesisi.net |
| shareSet | 🌇 {Y0}년 마지막 해넘이 {spot} {time} ({dir} 방향) · play.mesisi.net | 🌇 Last sunset of {Y0} at {spot}: {time} KST, facing {dir} · play.mesisi.net |
| note | 계산값이라 공식 발표와 1~2분 다를 수 있어요. 산·구름에 따라 실제로는 더 늦게 보일 수 있어요. | Calculated values may differ from official times by 1–2 min. Hills and clouds can delay what you actually see. |
| kst | 한국 시간(KST) | Korea time (KST) |
| weekday | 일 월 화 수 목 금 토 | Sun Mon Tue Wed Thu Fri Sat |

- For English, times use the 24 h format "07:26" plus the KST label.
- Weekdays are computed, not hardcoded: 2027-01-01 is a Friday and 2026-12-31 is a Thursday.

## localStorage (in try/catch, prefix `nys:`)

- `nys:mode`: "rise" or "set", default "rise".
- `nys:spot`: the last selected spot id, or "custom".
- `nys:custom`: JSON `{lat, lon, h}` with the last valid custom input.

## Edge cases

- **Custom input:**
  - Accept a comma as the decimal separator.
  - Values out of range show the badInput text inline (not as a toast) and keep the last result.
  - An empty elevation becomes 0.
- **Custom times:**
  - Custom locations still display in KST.
  - Add a muted line "현지 시간 아님 / not local time" when |lon − 127.5| > 15.
- **Clock:**
  - Recompute the countdown every second from `Date.now()`, not by decrementing, so sleep and wake cannot drift it.
  - If the device clock is wrong, the countdown is wrong; the times are not affected.
- **Ties:** equal minutes keep table order and show "+0분".
- **Mode switch:** switching keeps the selected spot if it exists in the new mode. Otherwise (Byeonsan), select #1.
- **Layout:** resize recomputes the layout only, not the times.
- **Storage:** when localStorage is blocked, use defaults and everything still works.
- **`#demo`:** sunrise mode, Ganjeolgot selected, and the countdown frozen at a fixed now of 2026-12-20 20:00 KST. This is for QA thumbnails.
- **`#test`:** run the self-check asserts and print the results to the console.

## Must-nots

- No network: no fetch, map tiles, geolocation API or weather. Location is picked from the list or typed in.
- Do not claim official accuracy, and do not use the KASI logo or layout. KASI is only mentioned in the about text.
- No traffic, crowd, event schedule or weather predictions. Those are real-time facts this item cannot know.
- No safety advice beyond the note. Never encourage climbing at night. The mountain rows are only data.
- No real brands, tour companies or people.
- No alert, confirm, prompt, window.open or navigation. No sound.
