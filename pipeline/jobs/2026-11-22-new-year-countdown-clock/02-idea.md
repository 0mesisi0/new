# Idea and spec: 새해 카운트다운 시계 / New Year Countdown Clock

## Concepts scored

Scores are 1–5 in the order **first 10 seconds / originality / Korean search and share demand / one-file buildability**, out of 20. Demand scores are editorial estimates based on the supplied research.

| Concept | Category | Score | Verdict |
|---|---|---|---|
| **새해 카운트다운 시계 / New Year Countdown Clock** | **tools** | **5/4/4/5 = 18** | **Picked.** The clock answers “새해까지 얼마나 남았지?” on load. One tap rehearses the final ten seconds and reveals the New Year screen. |
| 선물 포장 질주 / Gift-Wrap Dash | arcade | 5/4/3/4 = 16 | Tap as gift boxes pass under a ribbon press in a 30-second round. Easy to learn and replay, with more tuning needed for timing and difficulty. |
| 눈 내리는 전구 창문 / Snowlight Window | chill | 5/4/3/5 = 17 | Trace a path across a frosted window to light a string of bulbs. The result makes a good screenshot, with less direct search intent. |

## Meta

- slug `new-year-countdown-clock`
- Category `tools`, kind `tool`, aspect `16/9`, date `2026-11-22`
- Tags ko `새해 카운트다운`, `신년 카운트다운`, `한국 시간`
- Tags en `new year countdown`, `midnight`, `Korea time`
- Title ko `새해 카운트다운 시계`
- Title en `New Year Countdown Clock`
- Desc ko `한국 시간으로 새해까지 남은 일·시·분·초를 확인하세요. 마지막 10초를 미리 세어 보고, 자정에는 화면을 띄워 함께 새해를 맞이해요.`
- Desc en `Count down to midnight in Korea and rehearse the final 10 seconds. Keep the clock open to ring in the New Year together.`
- Howto ko `시계를 열면 한국 시간 기준으로 남은 시간이 바로 보여요. ‘10초 리허설’을 누르면 새해를 맞는 순간을 미리 볼 수 있어요.`
- Howto en `Open the clock to see how much time is left until midnight in Korea. Select “10-second rehearsal” to preview the celebration.`
- About ko `한국 표준시(KST, UTC+9)를 사용해요. 남은 시간은 이 기기의 시계를 기준으로 계산해요.`
- About en `The countdown uses Korea Standard Time (KST, UTC+9) and reads the current time from your device clock.`

## Pitch

A large, silent clock counts down to January 1 in Korea. During the final ten seconds, the four tiles give way to a single number everyone in the room can read. At midnight, the number becomes the incoming year against a burst of gold paper confetti.

The rehearsal makes that transition available in November and December. It starts at `10` immediately and keeps a visible rehearsal label through the greeting, so a screenshot identifies the preview.

## Flow and screens

| Screen | Contents and behavior |
|---|---|
| **Live clock** | Show the app title, target date and time, and four tiles for days, hours, minutes, and seconds. Place **10-second rehearsal** below the tiles. Show the device-clock note at the bottom. |
| **Live final ten** | When the live display reaches `10`, replace the tiles with a single large number. Keep the KST target visible and move the rehearsal button out of the tab order. Show `1` until midnight, then go directly to the live greeting. |
| **Rehearsal countdown** | Show the rehearsal label, the large `10`–`1` count, and **Back to live clock**. The rehearsal starts immediately and uses the same number styling as the live final ten. |
| **Rehearsal greeting** | Show the rehearsal label, the rehearsed year, the greeting, and **Back to live clock**. Play the confetti effect once on entry. Keep this screen open until the user returns or the real final ten begin. |
| **Live greeting** | Show the incoming year, the greeting, and **Show next countdown**. Play the confetti effect once on entry. Keep the greeting visible until the user continues or 60 seconds have passed since midnight, whichever comes first. Then show the new target. |

## Controls

- **Pointer and touch.** Use native buttons for every action. Each target is at least 44 × 44 CSS px and works with touch and mouse.
- **Keyboard.** Tab and Shift+Tab move between available controls. Enter and Space activate the focused button. Escape returns from either rehearsal screen to the current live state.
- **Focus.** Entering rehearsal focuses **Back to live clock**. Returning focuses **10-second rehearsal** when available. If an automatic transition removes the focused control, move focus to the destination heading. Otherwise preserve focus.
- **Screen readers.** Give the timer a localized accessible name and expose its current value for inspection. Announce the start of the final ten and the greeting once in a polite live region. Keep per-second changes out of the live region.

## Countdown logic

- Read `?lang=ko` or `?lang=en`. Otherwise use Korean when `navigator.language` has primary subtag `ko`, and English for other values. Set `<html lang>` and use the corresponding dictionary for page title, visible text, and accessibility labels.
- Use the fixed KST offset of `32_400_000` ms. Get the current Korean year via `new Date(Date.now() + 32_400_000).getUTCFullYear()`. January 1 at `00:00 KST` for year `Y` is `Date.UTC(Y, 0, 1) - 32_400_000`.
- Display the current year's live greeting from its midnight instant through the next 59,999 ms, including on a fresh open. Once that window ends or the user selects **Show next countdown**, target January 1 of the following Korean year. Keep a dismissed greeting's year in memory so it stays dismissed for the session.
- Compute live seconds with `max(0, ceil((targetMs - Date.now()) / 1000))`. Split into whole days and the remaining hours, minutes, and seconds. Display days without padding and the other tiles as two digits. Enter the final-ten screen when the display is between `10` and `1`.
- Schedule live updates at second boundaries and recompute from the device clock on every update. If the real final ten or live greeting arrives during rehearsal, switch immediately to that live screen.
- Capture the upcoming target year on rehearsal entry. Show `ceil(remainingMs / 1000)` using a monotonic elapsed timer. Start with 10,000 ms, pause while hidden, and stop at the greeting when elapsed visible time reaches 10,000 ms.
- On visibility changes, suspend scheduled updates while hidden. Resume any paused rehearsal only after checking the live state. If the tab returns after the greeting window, show the next countdown.

## Visual design and motion

- Use a midnight navy background (`#11172B`), warm white type (`#FFF8E8`), and gold (`#F5C86A`) for the active number and primary action. A small CSS-drawn horizon sits beneath the clock and turns gold on the greeting.
- Use system-ui with tabular numerals. Arrange the live tiles in a row on wide screens and a 2 × 2 grid at narrow widths. Let the date line wrap. Keep the footer and primary action visible at 320 × 480 with a fluid layout that fills the iframe.
- Render the large number with a brief scale-and-settle effect once per change using `transform` and `opacity`. At the greeting, draw up to 24 decorative CSS confetti pieces and remove them after 900 ms. Cancel the effect when hidden. Under `prefers-reduced-motion`, update the numbers instantly and show a static gold horizon.
- The app is silent. The greeting fits within the viewport for a screenshot.

## Strings

| Key | ko | en |
|---|---|---|
| `appTitle` | 새해 카운트다운 시계 | New Year Countdown Clock |
| `target` | {year}년 1월 1일 00:00 · 한국 시간 (KST) | January 1, {year} at 00:00 KST |
| `days` | 일 | Days |
| `hours` | 시간 | Hours |
| `minutes` | 분 | Minutes |
| `seconds` | 초 | Seconds |
| `timerLabel` | 새해까지 남은 시간 | Time until the New Year |
| `timerValue` | {days}일 {hours}시간 {minutes}분 {seconds}초 | {days} d {hours} h {minutes} min {seconds} s |
| `finalTen` | 새해까지 10초 | Final 10 seconds to the New Year |
| `rehearse` | 10초 리허설 | 10-second rehearsal |
| `rehearsalLabel` | {year}년 새해 리허설 | {year} New Year rehearsal |
| `rehearsalTimerLabel` | 리허설 남은 시간 | Rehearsal time remaining |
| `secondsValue` | {seconds}초 | {seconds} s |
| `backToLive` | 실제 시계로 돌아가기 | Back to live clock |
| `yearDisplay` | {year}년 | {year} |
| `greeting` | 새해 복 많이 받으세요! | Happy New Year! |
| `nextCountdown` | 다음 새해 카운트다운 보기 | Show next countdown |
| `clockNote` | 이 기기의 시계를 기준으로 계산해요. | Based on this device’s clock. |

## localStorage

No keys. Rehearsal progress and greeting dismissal are session state. Reloading derives a fresh live screen from the device clock and KST.

## Edge cases

- At `2026-12-31T14:59:50Z`, the clock shows `10` for 2027. At `2026-12-31T15:00:00Z`, it shows the 2027 greeting. At `2026-12-31T15:01:00Z`, it targets 2028. Verify the same results on devices configured for different time zones.
- After a manual clock change or a device waking from sleep, recompute the Korean year and live screen on the next update. A forward jump can skip numbers. A backward jump can return to the live clock.
- Repeated taps on **10-second rehearsal** create one rehearsal. Returning early cancels its timer and confetti and renders the current live screen. Every new rehearsal starts at `10`.
- Resizing or rotating preserves the live or rehearsal state and leaves visible controls usable. Long English copy wraps without introducing page scrolling.
- Verify both languages, keyboard-only operation, touch at 320 × 480, the midnight rollover, hide-and-resume behavior, and reduced motion. Run `npm test`, `npm run build`, and `npm run qa -- --thumbs`. Verify that the generated thumbnail captures the live clock.

## Must not

- No network requests, analytics, external fonts, third-party scripts, or remote assets. Ship all runtime HTML, CSS, and JavaScript in `items/new-year-countdown-clock/index.html`, with the separate `meta.json` and QA-generated `thumb.png`.
- No autoplay audio, browser dialogs, new windows, navigation, or page scrolling.
- No venue logos, broadcaster graphics, real people, or copied countdown artwork.
- No simulated clock synchronization or claims of broadcast-grade timing.