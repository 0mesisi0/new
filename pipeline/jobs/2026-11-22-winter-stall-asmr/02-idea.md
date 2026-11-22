# Idea and spec: 겨울 포장마차 ASMR / Winter Street Stall ASMR

## Concepts scored

Each criterion is scored from 1 to 5. Korean search and share scores are estimates based on the supplied research and backlog. The brief lists no votes yet.

| Concept | Category | First 10 seconds | Originality | Korean search and share demand | One-file buildability | Total | Verdict |
|---|---|---:|---:|---:|---:|---:|---|
| **겨울 포장마차 ASMR / Winter Street Stall ASMR** | `chill` | 5 | 4 | 4 | 5 | **18** | **Picked.** One tap brings a familiar winter stall to life. Three illustrated sound sources give the user something to explore immediately. |
| 크리스마스 케이크 예약 비교 / Christmas Cake Pickup Planner | `tools` | 3 | 4 | 5 | 5 | 17 | Enter two or three bakery offers and compare total cost, deposit and pickup windows against your plans. The comparison gets useful after the first two offers are entered. |
| 겨울 시장 전구 잇기 / Winter Market Lights | `puzzle` | 5 | 4 | 3 | 4 | 16 | Rotate wire tiles to light a market awning one bulb at a time. The first connection gives immediate feedback, and a set of hand-authored boards supports replay. |

## Meta

slug `winter-stall-asmr`

- Category `chill`, kind `tool`, aspect `9/16`, date `2026-11-22`
- Tags ko `겨울 ASMR`, `포장마차`, `어묵`, `군고구마`
- Tags en `winter ASMR`, `street food`, `fish cake broth`, `roasted sweet potato`

| Field | ko | en |
|---|---|---|
| `title` | 겨울 포장마차 ASMR | Winter Street Stall ASMR |
| `desc` | 겨울밤 포장마차에 잠깐 들러 보세요. 어묵 국물 끓는 소리, 군고구마 굽는 소리, 천막을 스치는 바람 소리를 골라 들어요. | Step up to a winter street stall. Mix the sounds of simmering fish cake broth, roasting sweet potatoes, and wind against the awning. |
| `howto` | ‘소리 켜기’를 누른 뒤 어묵 국물, 군고구마, 천막 바람 버튼으로 듣고 싶은 소리를 골라요. 숫자 키 1~3으로도 바꿀 수 있어요. | Turn on sound, then tap the broth, sweet potatoes, or awning wind to build your mix. Keys 1–3 toggle the same sounds. |
| `about` | 어묵 국물의 보글거림부터 천막을 스치는 바람까지, 브라우저에서 직접 만든 소리예요. | The browser makes each sound, from the simmering pot to the wind brushing the awning. |

## Pitch

An amber-lit 포장마차 sits at the edge of a dark winter alley. A pot of 어묵 국물 steams on one side, a 군고구마 brazier glows on the other, and a striped fabric awning hangs above both.

The full stall is visible on arrival. Tap **소리 켜기 / Turn on sound** to hear broth and roasting coals within the first second. Add the awning wind, or turn off the other sources to listen to one detail. The winter snack setting comes from the research brief, and the sound mixing builds on the backlog’s focus-radio idea.

## Flow

| Screen or state | What appears | What happens |
|---|---|---|
| **START** | Title, one-line invitation, complete stall illustration, three source buttons and **Turn on sound**. Broth and coals start selected, or the saved mix is shown. | Source buttons can edit the mix in silence. **Turn on sound** creates or resumes audio from that gesture. |
| **LISTEN** | Same layout, with **Turn off sound** as the primary control. Each selected source has a visible selected state and a corresponding effect in the scene. | Source toggles fade layers in or out immediately. Changes persist across reloads. Selecting zero sources leaves the master on and displays **Choose a sound below.** |
| **MUTED** | Same layout and selected sources, with **Turn on sound** restored. | Muting fades the master down and stops audio processing. The next activation uses the current mix. |
| **INTERRUPTED** | On return from a hidden tab or an audio interruption, the primary control reads **Resume sound**. | Activating it resumes from a fresh gesture. Source selection remains editable. |
| **AUDIO UNAVAILABLE** | The stall and source controls remain usable. A short inline message appears below the primary control. | A failed audio start can be retried with **Turn on sound**. If Web Audio is absent, disable the primary control and explain why inline. |

There is one screen layout. Changing sound state never moves the controls or takes focus away from the activated button.

## Controls

- Tap or click the primary button to turn sound on or off or to resume. Tap or click a source button to toggle its layer.
- Use `Tab` and `Shift+Tab` to move between controls. `Enter` and `Space` activate the focused native button. Keys `1`, `2` and `3` toggle broth, coals and wind, respectively. Ignore repeats, modifier combinations and shortcuts while the page is hidden. Prevent default behavior only for shortcuts the item handles.
- Use native buttons with `aria-pressed` on the three sources. Keep their names stable as their state changes. Give each button a visible focus ring and a hit area of at least 44 × 44 CSS px.
- Source controls sit in three equal columns. On narrow layouts, labels can wrap within the button.

## Sound and visual feedback

Generate all audio in one `AudioContext` using locally generated noise buffers, filters and gain envelopes. Apply a 150 ms fade to each source toggle and to the master when turning sound on or off. Keep the combined mix at a comfortable level with headroom for the crackle peaks.

| Source | Default | Sound | Scene effect |
|---|---|---|---|
| Fish cake broth | On | Soft filtered noise with short, rounded pulses. Include a bubble pulse in the first half-second of playback, then vary the timing. | A small steam curl above the pot. |
| Roasting coals | On | Low, steady noise with quiet, brief crackles at irregular intervals. | A soft ember pulse under the sweet potatoes. |
| Awning wind | Off | Low-passed noise that swells and recedes over several seconds. | A slight sway along the striped hem. |

Use a single master graph and bounded scheduling. Stop pending crackles and suspend the context when muted. When the document becomes hidden, suspend immediately and cancel pending events. Require **Resume sound** on return if sound was on. If the browser interrupts audio while the page is visible, use the same state. A rapid second activation during startup cancels playback intent. Any stale resume completion must leave the master silent.

## Visual design

- Use one original inline SVG with a dark navy alley (`#101826`), warm amber light (`#FFC278`), brick-red awning (`#AD4B3D`) and cream text (`#FFF1DD`). Render all text with the system font stack.
- The illustration is the main visual. Put the title and invitation above it, then the primary button and the three source controls below. Each source button uses a small icon and a visible checkmark when selected. Color reinforces selection.
- Fill the iframe with `100dvh`, with a `100vh` fallback. At 320 × 480, use 12 px side padding and shrink the illustration before shrinking buttons or type. Reserve room for a wrapped status message. On desktop, center the stall within a column up to 520 px wide while the alley background fills the window. Reflow on resize and orientation change without interrupting audio.
- Run visual motion only while the document is visible. With reduced motion enabled, use a static steam curl, steady ember glow and fixed awning hem to show which sources are selected. The idle illustration is complete so the generated thumbnail can use the opening state.

## Strings

The strings below and the localized metadata above cover app copy. Use a `{ ko, en }` dictionary. Honor supported `?lang=` values first, then use Korean for a `navigator.language` beginning with `ko` and English otherwise. Set `<html lang>` and the document title to match. Treat the illustration and source icons as decorative, since the controls identify every sound.

| Key | ko | en |
|---|---|---|
| `title` | 겨울 포장마차 ASMR | Winter Street Stall ASMR |
| `intro` | 따뜻한 포장마차에 잠깐 들러요. | Step inside a warm winter stall. |
| `soundOn` | 소리 켜기 | Turn on sound |
| `soundOff` | 소리 끄기 | Turn off sound |
| `resume` | 소리 다시 켜기 | Resume sound |
| `sourcesLabel` | 포장마차 소리 | Stall sounds |
| `broth` | 어묵 국물 | Fish cake broth |
| `coals` | 군고구마 숯불 | Roasting coals |
| `wind` | 천막 바람 | Awning wind |
| `noLayers` | 아래에서 듣고 싶은 소리를 골라 주세요. | Choose a sound below. |
| `startFailed` | 소리가 켜지지 않았어요. 한 번 더 눌러 주세요. | Sound didn’t start. Please try again. |
| `unsupported` | 이 브라우저에서는 소리를 재생할 수 없어요. | This browser can’t play the stall sounds. |

Use `sourcesLabel` as the accessible name of the source group. Announce status changes in a polite live region. Show `noLayers` only when the master is on with zero sources selected. Show at most one status message at a time, with audio errors taking priority.

## localStorage

- `winter-stall-asmr:mix:v1` stores a JSON array of selected IDs from `broth`, `coals` and `wind`. `[]` is valid. Missing, malformed or invalid data falls back to `["broth","coals"]`. Save on each source change.
- Wrap every read, parse and write in `try/catch`. Keep an in-memory mix for the session when storage is unavailable. Master sound always starts off on page load.

## Edge cases

- Silent mix edits work before first playback, while muted and while audio is unavailable. Turning on sound with an empty mix is valid. Selecting the first source then fades it in.
- An audio start that fails or resolves to a non-running context leaves the master off and shows the retry message. Reuse the context on retry unless it is closed.
- After tab switching, device interruption or back-forward cache restoration, audio stays silent until the user resumes it. Resizing and changing sound selections never recreate the context.
- Rapid source toggles ramp from current gain to the latest target. Rapid master toggles cannot start duplicate graphs or revive audio after muting.
- At 320 × 480, verify both languages, all player states, wrapped source labels and keyboard focus. Run `npm test`, `npm run build` and `npm run qa -- --thumbs`. Confirm the generated thumbnail shows the full stall.

## Must not

- Keep HTML, CSS, SVG and JavaScript in one `index.html`. No network requests, external assets, streams, fonts, analytics, audio recordings or microphone access.
- No sound autoplay, including after reload, tab return or restoration from history.
- No page scrolling, dialogs, popups or navigation away from the item.
- Use fictional signage and original art. No real shop names, logos, people or copied artwork.