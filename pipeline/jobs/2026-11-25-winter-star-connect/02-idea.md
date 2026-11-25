# Idea and spec: 겨울 별자리 잇기 / Connect the Winter Stars

Agent: Claude (opus), planner. Design notes are merged in (palette, layout, motion).

## Concepts scored

Each concept gets 1–5 for value in the first 10 seconds, originality, Korean search/share demand, and buildability in one HTML file. Maximum 20.

| Concept | Category | Score | Verdict |
|---|---|---|---|
| Year-end tax "missed deductions" checklist (연말정산 놓친 공제) | tools | 3/2/5/2 = 12 | Demand is high, but every number has to be checked against 국세청 sources and changes every year. Wrong advice does real harm. Skip until we have a verified source. |
| Winter music-box radio (겨울 오르골 라디오): an endless generated music-box melody with falling snow | radio | 4/3/3/5 = 15 | Good fit for the site, and the subject differs from `winter-fireside-radio`. Keep it for a later radio slot. |
| **Connect the Winter Stars (겨울 별자리 잇기)** | **learn** | **4/4/4/5 = 17** | **Picked.** Dragging star to star is fun right away. "겨울 별자리" and "겨울철 대삼각형" are searched every school winter. It ties to 동지 (12/22, the longest night) without repeating `dongji-dumpling-puzzle`. No existing or queued item is about the night sky. |

## Meta

- slug `winter-star-connect`, category `learn`, kind `game`, aspect `9/16`, date `2026-11-25`
- tags: ko `겨울별자리`, `오리온자리`, `겨울철대삼각형`; en `constellations`, `winter-sky`, `astronomy`
- title: ko `겨울 별자리 잇기`; en `Connect the Winter Stars`
- desc ko: 오리온자리부터 겨울철 대삼각형까지, 밤하늘의 별을 손가락으로 이어 겨울 별자리 8개를 완성하세요. 별마다 짧은 이야기와 오늘 밤 찾는 법이 나와요.
- desc en: Drag from star to star to draw 8 winter constellations, from Orion to the Winter Hexagon. Each one ends with a short fact and a tip for finding it tonight.
- howto ko: 별에서 별로 드래그해 선을 이으세요. 맞는 선은 금색으로 남고 틀린 선은 사라져요. 막히면 '힌트'를 누르세요. 힌트 없이 실수를 1번 이하로 하면 별 3개를 받아요.
- howto en: Drag from one star to another to draw a line. Right lines turn gold and wrong ones fade away. Stuck? Tap Hint. Finish a stage with no hint and at most 1 mistake to earn 3 stars.
- about ko: 별의 위치는 실제 적경·적위를 단순하게 투영해 그렸고, 거리와 밝기는 대략적인 값이에요. 2026년 동지는 12월 22일, 1년 중 밤이 가장 긴 날이에요. 그날 밤 남쪽 하늘에서 직접 찾아보세요.
- about en: Star positions come from real coordinates with a simple projection. Distances and brightness are approximate. The 2026 winter solstice is December 22, the longest night of the year, so it is a good night to look south.

## Pitch

The screen is a deep-blue winter night sky over a dark hill silhouette, with about 120 faint twinkling background stars. The brighter stars of one constellation glow a little more than the rest.

1. The player drags from star to star. A correct line snaps gold with a soft chime. A wrong line flashes red and fades.
2. When every line is drawn, the constellation glows, its name fades in, and a fact card slides up with a short fact and a "find it tonight" tip.
3. There are 8 stages: Orion, Canis Major, Canis Minor, the Winter Triangle, Taurus, Gemini, Auriga and the Winter Hexagon.
4. The finale zooms out to the full winter sky with every line and label drawn: "동지 밤하늘 완성 / Solstice Sky Complete". It also shows the total stars and time.

A full run takes about 3 minutes. Kids can learn from it and adults can enjoy it.

## Flow

1. **START**
   - Title, the subtitle "1년 중 가장 긴 밤, 별을 이어 볼까요?", a big "시작하기" button and a best record line ("최고 ★{n}/24 · {mm:ss}").
   - Background stars twinkle. The full sky shows faintly with no lines.
2. **STAGE INTRO** (0.8 s)
   - A banner shows "{i}/8 오리온자리" and a one-line goal ("선 8개를 이어 보세요").
   - The camera pans and zooms so the stage's stars fill about 80% of the play area.
3. **PLAY**
   - The player drags from star to star.
   - The HUD shows the stage, lines left (e.g. "3/8"), mistakes, the Hint button and the mute toggle.
   - After 15 s with no correct line, the Hint button pulses. The hint is never automatic.
4. **STAGE CLEAR**
   - All lines glow for 600 ms and the name label fades in at the centroid.
   - The fact card slides up with the earned stars (★★☆), a fact line, a "find it tonight" line and a "다음" button.
5. **FINALE** (after stage 8)
   - The camera zooms out to the whole sky with all 8 drawings and labels.
   - The result card shows: total ★/24, total time, best record, a "새 기록!" badge if beaten, [다시 하기] and [텍스트 복사].
   - A slow shooting star crosses the sky once.

## Controls

- **Pointer:**
  - Press on or near a star (hit radius max(22 px, 4% of the short side)) to start a rubber-band line.
  - Release on another star to commit it. Releasing in empty space cancels with no penalty.
  - Passing over stars while dragging does nothing. Only the release target counts.
- **Tap-tap:** tapping one star selects it with a ring, and tapping a second star commits the line. Tapping the same star again or empty sky deselects. This mode helps players with motor difficulties.
- **Keyboard:**
  - Tab or arrow keys move a focus ring between the current stage's stars, in nearest-direction order for arrows.
  - Enter or Space selects, then confirms on the second star. Esc cancels the selection.
  - H gives a hint, N or Enter on the clear card goes next, R restarts from the result, and M toggles sound.
- **Touch:** the play area uses `touch-action:none`, and game touches and keys call `preventDefault`. Buttons are at least 44 px.

## Sky data

Projection:

- ra° = RA(h) × 15
- x = −(ra° − 90) × cos(10°)
- y = −Dec

East is on the left, as seen facing south. Fit each stage's bounding box (plus 12% padding) into the play area while keeping the aspect ratio. The finale fits all stars.

Dot radius = clamp(4.5 − 0.9 × mag, 1.6, 6) × scale, where scale = shortSide / 400. The stars of the current stage get a soft halo.

| id | ko | en | RA (h) | Dec (°) | mag |
|---|---|---|---|---|---|
| bet | 베텔게우스 | Betelgeuse | 5.919 | 7.41 | 0.5 |
| rig | 리겔 | Rigel | 5.242 | −8.20 | 0.13 |
| bel | 벨라트릭스 | Bellatrix | 5.419 | 6.35 | 1.64 |
| sai | 사이프 | Saiph | 5.796 | −9.67 | 2.06 |
| alnk | 알니탁 | Alnitak | 5.679 | −1.94 | 1.77 |
| alnm | 알닐람 | Alnilam | 5.604 | −1.20 | 1.69 |
| mint | 민타카 | Mintaka | 5.533 | −0.30 | 2.23 |
| meis | 메이사 | Meissa | 5.585 | 9.93 | 3.39 |
| sir | 시리우스 | Sirius | 6.752 | −16.72 | −1.46 |
| mirz | 미르잠 | Mirzam | 6.378 | −17.96 | 1.98 |
| adh | 아다라 | Adhara | 6.977 | −28.97 | 1.50 |
| wez | 웨젠 | Wezen | 7.140 | −26.39 | 1.83 |
| alud | 알루드라 | Aludra | 7.402 | −29.30 | 2.45 |
| pro | 프로키온 | Procyon | 7.655 | 5.22 | 0.34 |
| gom | 고메이사 | Gomeisa | 7.453 | 8.29 | 2.89 |
| cas | 카스토르 | Castor | 7.577 | 31.89 | 1.58 |
| pol | 폴룩스 | Pollux | 7.755 | 28.03 | 1.14 |
| alh | 알헤나 | Alhena | 6.629 | 16.40 | 1.92 |
| meb | 메부타 | Mebsuta | 6.732 | 25.13 | 3.06 |
| tej | 테자트 | Tejat | 6.383 | 22.51 | 2.87 |
| was | 와사트 | Wasat | 7.335 | 21.98 | 3.53 |
| ald | 알데바란 | Aldebaran | 4.599 | 16.51 | 0.86 |
| eln | 엘나트 | Elnath | 5.438 | 28.61 | 1.65 |
| zta | 황소자리 제타 | Zeta Tauri | 5.627 | 21.14 | 3.0 |
| eta | 아인 | Ain | 4.477 | 19.18 | 3.53 |
| gta | 황소자리 감마 | Gamma Tauri | 4.330 | 15.63 | 3.65 |
| dta | 황소자리 델타 | Delta Tauri | 4.382 | 17.54 | 3.76 |
| ple | 플레이아데스(좀생이별) | Pleiades | 3.790 | 24.11 | 2.87 |
| cap | 카펠라 | Capella | 5.278 | 46.00 | 0.08 |
| menk | 멘칼리난 | Menkalinan | 5.992 | 44.95 | 1.90 |
| tau | 마차부자리 세타 | Theta Aurigae | 5.995 | 37.21 | 2.60 |
| iau | 하살레 | Hassaleh | 4.950 | 33.17 | 2.69 |

Pleiades is drawn as a cluster of 6 tiny dots within 6 px, not one big dot. It is never part of a line.

Background stars:

- 120 seeded random dots (mulberry32, seed 20261222) across the finale bounding box ± 20%.
- mag between 3.8 and 5.5 and alpha between 0.25 and 0.6.
- They twinkle with a sine of random phase, period 2–5 s.
- They are never selectable.
- None may sit within 18 logical px of a stage star, so a wrong target is never ambiguous.

## Stages

Lines are undirected and any order is accepted. "Distractors" lists neighboring stage stars that stay selectable in that stage. Connecting one counts as a mistake.

| # | ko | en | lines | distractors |
|---|---|---|---|---|
| 1 | 오리온자리 | Orion | bet–meis, meis–bel, bet–alnk, bel–mint, alnk–alnm, alnm–mint, alnk–sai, mint–rig (8) | none |
| 2 | 큰개자리 | Canis Major | sir–mirz, sir–wez, wez–adh, wez–alud (4) | rig, sai |
| 3 | 작은개자리 | Canis Minor | pro–gom (1) | alh, was |
| 4 | 겨울철 대삼각형 | Winter Triangle | bet–sir, sir–pro, pro–bet (3) | rig, alh, mirz |
| 5 | 황소자리 | Taurus | gta–ald, gta–dta, dta–eta, eta–eln, ald–zta (5) | bel, meis |
| 6 | 쌍둥이자리 | Gemini | cas–pol, cas–meb, meb–tej, pol–was, was–alh (5) | pro, eln |
| 7 | 마차부자리 | Auriga | cap–menk, menk–tau, tau–eln, eln–iau, iau–cap (5) | ald, cas |
| 8 | 겨울철 대육각형 | Winter Hexagon | rig–ald, ald–cap, cap–pol, pol–pro, pro–sir, sir–rig (6) | bet, cas, eln |

Previously cleared constellations stay drawn at 25% alpha in the background, so the sky fills up. Stages 4 and 8 draw their lines in pale cyan instead of gold, since they are asterisms and not constellations.

Pleiades bonus: in stage 5, tapping the Pleiades cluster shows a small label "좀생이별 발견! / Found the Pleiades!" and a sparkle. It gives no score and costs no penalty, and it shows only once per run.

## Scoring

Per stage:

- 3★ when no hint was used and there were ≤ 1 mistakes.
- 2★ when ≤ 1 hint was used and there were ≤ 3 mistakes.
- 1★ otherwise.

Run totals:

- Total = ★ sum out of 24.
- Time = the sum of PLAY durations only. Intros, cards and hidden time are excluded.
- Best = higher ★. On a tie, lower time wins.

Hint: one hint reveals one missing line as a dotted pulsing guide for 2.5 s, then it fades out. The hint count goes up by one.

## Fact cards

| # | fact ko | fact en | tonight ko | tonight en |
|---|---|---|---|---|
| 1 | 왼쪽 위 붉은 별 베텔게우스는 늙은 초거성, 오른쪽 아래 푸른 별 리겔은 젊고 뜨거운 별이에요. 색이 다른 건 표면 온도가 달라서예요. | The red star Betelgeuse is an old supergiant, and the blue-white Rigel is a hotter one. Their colors show their surface temperatures. | 12월 밤 9시쯤 동남쪽에 나란히 선 세 별(허리띠)을 먼저 찾으세요. | Around 9 p.m. in December, look southeast for three stars in a row: the belt. |
| 2 | 시리우스는 밤하늘에서 가장 밝은 별이에요. 지구에서 약 8.6광년 떨어져 있어요. | Sirius is the brightest star in the night sky, about 8.6 light-years away. | 오리온의 허리띠를 왼쪽 아래로 쭉 이으면 시리우스가 나와요. | Follow Orion's belt down to the left and you reach Sirius. |
| 3 | 별 두 개뿐인 작은 별자리지만 프로키온은 약 11광년으로 아주 가까운 별이에요. | Only two bright stars, but Procyon is a close neighbor at about 11 light-years. | 시리우스와 베텔게우스의 왼쪽, 같은 높이쯤에서 밝은 별을 찾으세요. | Look left of Betelgeuse and Sirius for a lone bright star. |
| 4 | 베텔게우스, 시리우스, 프로키온이 만드는 거의 정삼각형이에요. 별자리가 아니라 별을 찾는 길잡이예요. | Betelgeuse, Sirius and Procyon form a near-equilateral triangle. It is a signpost, not a constellation. | 도시에서도 보일 만큼 밝아서 겨울 별 찾기의 출발점이에요. | Bright enough to see from a city, so it is the best place to start. |
| 5 | 붉은 알데바란은 황소의 눈이에요. 근처 좀생이별은 옛날부터 농사 시기를 점치던 별무리예요. | Orange Aldebaran is the bull's eye. The nearby Pleiades cluster has been watched for ages to mark the seasons. | 오리온의 허리띠를 오른쪽 위로 이으면 알데바란이 나와요. | Follow Orion's belt up to the right to reach Aldebaran. |
| 6 | 쌍둥이의 두 머리 카스토르와 폴룩스. 이름은 형제지만 사실 거리도 색도 달라요. | Castor and Pollux are the twins' heads, though they differ in distance and color. | 오리온의 리겔에서 베텔게우스를 지나 쭉 올라가면 두 별이 나란히 있어요. | Draw a line from Rigel through Betelgeuse and keep going to find the pair. |
| 7 | 카펠라는 겨울 별 중 시리우스 다음으로 밝아 보이는 별 중 하나예요. 엘나트는 황소자리 별이지만 마차부 오각형의 한 꼭짓점도 돼요. | Capella is one of the brightest winter stars. Elnath belongs to Taurus but also closes Auriga's pentagon. | 밤 9시쯤 머리 위 가까이 높이 뜬 노란 별을 찾으세요. | Around 9 p.m. look high overhead for a bright yellowish star. |
| 8 | 밝은 별 여섯 개를 이으면 하늘에 커다란 육각형이 생겨요. 이 안에 오늘 이은 별자리가 대부분 들어 있어요. | Six bright stars make a huge hexagon that holds most of tonight's constellations. | 2026년 동지(12/22) 밤, 자정 무렵 남쪽 하늘 높이 이 육각형이 떠 있어요. | On the 2026 solstice night (Dec 22), it stands high in the south around midnight. |

Times are approximate for mid-latitude Korea in December. The about text says positions are simplified.

## Visual design

- **Palette:**
  - sky: a vertical gradient from #0b1026 at the top to #1b2550, then to #2a3566 at the horizon
  - hill silhouette #070a18, star white #f4f6ff
  - Betelgeuse tint #ffb38a, Rigel tint #bcd4ff, Aldebaran tint #ffc79a, Capella tint #fff1b8
  - correct line gold #ffd56a, asterism line cyan #8fe3ff, wrong flash #ff6b6b
  - UI card #ffffff at 10% alpha with a 1 px #ffffff22 border and backdrop blur when supported (no hard dependency)
- **Canvas:**
  - full window, with DPR capped at 2 and layout recomputed on resize
  - the hill covers the bottom 10% and never hides a stage star; the fit area is above it
- **Lines:**
  - 2.5 × scale px wide, round caps
  - the rubber band is dashed white at 60% alpha
  - a correct line animates its drawing over 150 ms, then a 12-particle sparkle bursts at the end star
- **Wrong line:** a red flash, fading over 350 ms, plus a 3 px canvas shake for 120 ms.
- **Selected star:** an expanding ring pulse.
- **Clear:** constellation lines brighten (with a glow via `shadowBlur`), the label fades in, and nearby background stars flicker brighter once.
- **HUD:** 14–16 px system-ui at the top, with the Hint button at the bottom center (56 px tall) and the mute toggle at the top right.
- **Small screens:** at 320 px wide, star labels are hidden during PLAY and shown only on clear and in the finale.
- **Wide screens:** the sky fills the window and cards stay at a max width of 420 px, centered.
- **prefers-reduced-motion:** no camera pan (cut instead), no shake, no shooting star, twinkle amplitude halved, and line draws are instant.

## Sound (off by default)

- **Correct:** a sine chime with a 220 ms decay and gain 0.08, at pitches stepping up a pentatonic scale (C5 D5 E5 G5 A5 C6, then repeating) per line within the stage.
- **Wrong:** a 120 ms triangle at 160 Hz, gain 0.05.
- **Clear:** a 3-note arpeggio, 90 ms apart.
- **Finale:** a soft 1.2 s pad (two detuned sines).
- Web Audio starts only after a user gesture, and the mute state is persisted.

## Copy text

- ko: `✨ 겨울 별자리 8개 완성! ★{stars}/24 · {mm:ss} · 동지 밤하늘에서 오리온 찾아보기 · play.mesisi.net`
- en: `✨ I drew all 8 winter constellations! ★{stars}/24 · {mm:ss} · Look for Orion on the solstice night · play.mesisi.net`
- Use `navigator.clipboard.writeText`, falling back to a hidden textarea and `execCommand('copy')`. Confirm with a toast, never a dialog.

## Strings

| key | ko | en |
|---|---|---|
| appTitle | 겨울 별자리 잇기 | Connect the Winter Stars |
| startSub | 1년 중 가장 긴 밤, 별을 이어 볼까요? | The longest night of the year. Shall we connect the stars? |
| startHow | 별에서 별로 드래그해 선을 이으세요 | Drag from star to star to draw lines |
| startBtn | 시작하기 | Start |
| bestLine | 최고 기록 ★{s}/24 · {t} | Best ★{s}/24 · {t} |
| noBest | 아직 기록이 없어요 | No record yet |
| stageOf | {i}/8 | {i}/8 |
| goal | 선 {n}개를 이어 보세요 | Draw {n} lines |
| linesLeft | 남은 선 {n} | Lines left {n} |
| mistakes | 실수 {n} | Mistakes {n} |
| hint | 힌트 | Hint |
| stageClear | 완성! | Complete! |
| tonight | 오늘 밤 찾는 법 | Find it tonight |
| next | 다음 | Next |
| pleiades | 좀생이별 발견! | Found the Pleiades! |
| finaleTitle | 동지 밤하늘 완성 | Solstice Sky Complete |
| finaleSub | 2026년 동지는 12월 22일, 1년 중 밤이 가장 긴 날이에요 | The 2026 solstice is December 22, the longest night of the year |
| totalStars | 별 ★{s}/24 | Stars ★{s}/24 |
| totalTime | 걸린 시간 {t} | Time {t} |
| newBest | 새 기록! | New best! |
| again | 다시 하기 | Play again |
| copy | 텍스트 복사 | Copy text |
| copied / copyFail | 복사했어요 / 복사하지 못했어요 | Copied / Could not copy |
| soundOn / soundOff | 소리 켜기 / 소리 끄기 | Sound on / Sound off |
| note | 별 위치는 단순화했고 거리는 대략적인 값이에요 | Positions are simplified and distances are approximate |
| asterism | 별자리가 아닌 길잡이 별 모양이에요 | A signpost shape, not an official constellation |

The stage names, star names, facts and tonight lines are in the tables above. Star labels use the ko/en names from the sky data table.

## localStorage (in try/catch, prefix `wsc:`)

- `wsc:best`: JSON `{"stars":n,"ms":n}`
- `wsc:sound`: "1" or "0", default "0"
- `wsc:runs`: the number of finished runs (not shown in the UI)

There is no mid-run save. A reload starts over.

## Edge cases

- Drawing an already drawn line again is ignored, with no penalty and no sound.
- A line from a star to itself, or a release in empty sky, cancels silently.
- A distractor star or an unrelated stage star as either end counts as a mistake. Background stars cannot be selected.
- On multi-touch, only the first pointer is tracked and the others are ignored. `pointercancel` cancels the rubber band.
- Resizing mid-drag cancels the drag, then the view refits. Drawn lines persist because they are stored by star ids, not pixels.
- When the page is hidden, the timer and animation pause and delta is clamped to 50 ms. The time excludes hidden time.
- Hint when exactly 1 line is missing shows that line. Hint during the intro or card is disabled.
- "다시 하기" resets stages, stars, time, hints and the Pleiades flag, and keeps sound and best.
- When localStorage is blocked, everything still works and no best line is shown.
- Run state stays tracked by language-agnostic ids, and the language comes only from `?lang` or `navigator.language` at load.
- `#demo` in the hash jumps to the finale with all lines drawn, ★21/24 and a time of 02:48, for QA thumbnails only. Nothing is written to storage.

## Must not

- No network of any kind, no star-catalog fetch and no external fonts. All data is inline.
- No raster images, since kind is game. Draw with canvas only.
- Do not copy the look or UI of any planetarium app or website, and draw no traditional constellation figure art taken from existing star atlases. Lines and dots only.
- No astrology, zodiac fortunes or horoscope language, even for Taurus and Gemini. This is astronomy only.
- Do not claim exact rise times or precise distances. Keep "약 / about" wording and the simplification note.
- No real people, brands or observatory names.
- No alert, confirm, prompt, window.open or navigation. No sound autoplay. The page never scrolls.
