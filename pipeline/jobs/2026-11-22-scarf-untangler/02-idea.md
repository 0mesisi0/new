# Idea and spec: 목도리 매듭 풀기 / Scarf Untangler

## Concepts scored

Scores are 1–5 for value in the first 10 seconds, originality, Korean search/share demand, and buildability in one HTML file. Maximum 20. Search and share scores are planning estimates based on the supplied research and backlog.

| Concept | Category | First 10s | Originality | Korean search/share | Buildability | Total | Verdict |
|---|---|---:|---:|---:|---:|---:|---|
| **목도리 매듭 풀기 / Scarf Untangler** | **puzzle** | **5** | **4** | **3** | **5** | **17** | **Picked.** Undo the first crossing in two taps. The winter theme gives `목도리 매듭 풀기` and `겨울 퍼즐` a concrete visual hook, and three fixed boards fit in inline SVG. |
| 수험표 할인 마감일 계산기 / Exam Discount Countdown | tools | 4 | 2 | 5 | 5 | 16 | Enter the deadline from an offer and see the days remaining. The research points to interest in `수험표 할인`, although visitors may expect a directory of offers. |
| 겨울 마켓 가게 이름 뽑기 / Winter Market Stall Names | random | 5 | 3 | 3 | 5 | 16 | One tap pairs a fictional stall name with a tiny storefront sign for screenshots. `크리스마스 마켓` is a seasonal hook with weak evidence of demand for a name generator. |

## Meta

slug `scarf-untangler`

- **Category** `puzzle`
- **Kind** `game`
- **Aspect** `9/16`
- **Date** `2026-11-22`

| Field | ko | en |
|---|---|---|
| `title` | 목도리 매듭 풀기 | Scarf Untangler |
| `tags` | `목도리`, `매듭 풀기`, `겨울 퍼즐` | `scarf`, `untangling`, `winter puzzle` |
| `desc` | 엉킨 목도리에서 위에 놓인 띠부터 빼내세요. 교차점을 살피며 매듭 세 개를 풀고 최고 점수에 도전해 보세요. | Pull the top strips free from a tangled scarf. Read the crossings, untangle three knots, and try to beat your best score. |
| `howto` | 띠에 붙은 번호 버튼을 누르세요. 그 띠를 덮는 띠가 하나라도 있으면 위에 놓인 띠부터 빼야 해요. 키보드는 숫자키 1~6을 쓰면 돼요. | Press a strip’s number to pull it. If another strip crosses over it, pull that one first. Number keys 1–6 also work. |
| `about` | 시간 제한 없이 즐기는 겨울 퍼즐이에요. 최고 점수는 이 기기에 저장할 수 있어요. | A winter puzzle you can play at your own pace. Your best score can be saved on this device. |

Put each locale’s tags in its own `meta.json` object alongside its title and copy.

## Pitch

A scarf has tangled on the bench by the front door. Each strip has a numbered fabric tab. Tap the number of a strip that lies on top at every crossing and it slips free, revealing what was underneath. Tug on a trapped strip and the crossing shows which numbered strip is holding it.

The first board has two separate crossings, so a player can start making progress with a single choice. The last board opens into multiple valid routes after the first pull. The game rewards reading the crossings and gives players time to think.

## Flow

| Screen | What appears | How it advances |
|---|---|---|
| **Start** | Title, one-line instruction, a miniature of knot 1, and a large Start button. | Start opens knot 1 with a score of zero. |
| **Play** | Knot number, live score, diagram, numbered pull buttons, and a feedback line. | A free strip disappears from the diagram. A blocked pull leaves the diagram in place and highlights one crossing. The last successful pull clears the knot. |
| **Knot cleared** | Cleared-knot heading, points earned on that knot, cumulative score, and Next knot. | Next knot loads the next board. This screen appears after knots 1 and 2. |
| **Game over** | All-knots-cleared heading, final score, best score, an optional new-best message, and a large Play again button. The three cleared knots appear as folded fabric swatches. | Play again starts a fresh run on knot 1. |

## Controls

- **Touch and mouse.** Tap or click Start, a numbered pull button, Next knot, or Play again. The diagram labels match the buttons. The buttons are the interaction targets and stay in number order.
- **Keyboard.** Tab and Shift+Tab move between native buttons. Enter and Space activate the focused button. During play, number keys 1–6 also pull the corresponding strip. Ignore held-key repeats, modified shortcuts, and numbers for strips that are absent or already removed.
- **Focus.** On entering play, focus the first numbered button. If a focused strip is removed, move focus to the next remaining numbered button, wrapping to the lowest number as needed. When a knot ends, focus Next knot or Play again.
- **Touch targets.** All buttons are at least 44 × 44 CSS pixels. Use pointer-compatible native button activation. Suppress browser defaults only for handled game shortcuts, and set `touch-action: none` on the diagram area.

## Boards and scoring

Use a logical grid from `0` to `6` on each axis. `H(y; x₁–x₂)` is a horizontal strip and `V(x; y₁–y₂)` is a vertical strip. Draw each board in ascending strip-number order. At every crossing, the higher-numbered strip is on top. Place each number tab at the starting endpoint, and keep the fabric’s centerline and number visible.

| Knot | Strips by number | Crossings, upper over lower |
|---|---|---|
| 1 | `1 H(1; 0–6)`, `2 V(1; 0–2)`, `3 H(5; 0–6)`, `4 V(5; 4–6)` | `2 > 1`, `4 > 3` |
| 2 | `1 H(1; 0–6)`, `2 V(1; 0–4)`, `3 H(3; 0–6)`, `4 V(5; 2–6)`, `5 H(5; 4–6)` | `2 > 1`, `3 > 2`, `4 > 3`, `5 > 4` |
| 3 | `1 H(1; 0–6)`, `2 V(1; 0–6)`, `3 H(3; 0–4)`, `4 V(5; 0–6)`, `5 H(5; 0–6)`, `6 V(3; 2–6)` | `2 > 1`, `4 > 1`, `3 > 2`, `5 > 2`, `5 > 4`, `6 > 3`, `6 > 5` |

- A strip is free when every strip listed above it at a crossing has been removed. Any free strip is a valid move. Knot 1 starts with strips 2 and 4 free. Knot 2 has one valid order. Knot 3 starts with strip 6 and then offers a choice between 3 and 5.
- On a blocked pull, count one mistake and highlight the crossing with the lowest-numbered remaining blocker. Keep the hint visible until the next valid pull attempt or screen change.
- Each removed strip earns 100 points. Each mistake costs 20 points on its own knot. The live score is the sum of cleared-knot scores plus `max(0, 100 × strips removed on this knot − 20 × mistakes on this knot)`.
- Lock in each knot’s points when it clears. The run maximum is **1,500**. Every run can finish regardless of mistakes.

## Visual design

- Use a warm paper background (`#F6EFE3`), dark plum text (`#29233A`), and a plum primary button with white text. Draw fabric strips in cranberry, ochre, pine, periwinkle, rose, and slate. Use an opaque number tab and a dark edge at each crossing so the overlap reads independently of color.
- Use inline SVG for the diagram and CSS for the controls. Render lower strips first and keep the upper strip opaque across each crossing. Keep the two three-column button rows in fixed positions so buttons never jump when a strip disappears. A removed strip leaves an empty, noninteractive slot.
- On a successful pull, update the board immediately and use a short slide-and-fade on a noninteractive copy of the strip. On a blocked pull, outline the crossing and highlight the blocker’s button. Under `prefers-reduced-motion`, use immediate removal and a static outline. The game is silent.
- Fill the iframe at sizes from 320 × 480 to desktop fullscreen. Center a column up to 480 px wide. On short screens, scale the diagram before shrinking labels or targets. The page stays fixed with zero scrolling. Resize preserves the current state.

## Strings

Use one `{ ko, en }` dictionary for visible copy and accessible names. Use `?lang=ko` or `?lang=en` when valid. Otherwise use Korean when `navigator.language` begins with `ko`, and English for other locales. Set `<html lang>` and the document title accordingly. Format `{points}` with the selected locale. The strings below include screen headings, statuses, and accessible control names.

| Key | ko | en |
|---|---|---|
| `appTitle` | 목도리 매듭 풀기 | Scarf Untangler |
| `startHelp` | 위에 놓인 띠부터 번호를 눌러 빼세요. | Press a number to pull a strip. Start with one on top. |
| `start` | 시작하기 | Start |
| `knotProgress` | 매듭 {current}/3 | Knot {current} of 3 |
| `score` | 점수 {points}점 | Score {points} |
| `pullStrip` | {strip}번 띠 빼기 | Pull strip {strip} |
| `ready` | 뺄 띠의 번호를 고르세요. | Pick a strip to pull. |
| `pulled` | {strip}번 띠를 뺐어요. | Strip {strip} is free. |
| `blocked` | {blocker}번 띠가 위에 있어요. | Strip {blocker} is on top. |
| `knotCleared` | 매듭 {current}/3 풀었어요! | Knot {current} of 3 cleared! |
| `knotPoints` | 이 매듭에서 {points}점 | {points} points for this knot |
| `nextKnot` | 다음 매듭 | Next knot |
| `allCleared` | 매듭을 모두 풀었어요! | All knots untangled! |
| `finalScore` | 최종 점수 {points}점 | Final score {points} |
| `bestScore` | 최고 점수 {points}점 | Best score {points} |
| `newBest` | 새 최고 기록! | New best! |
| `retry` | 다시 하기 | Play again |

The pull buttons show just their number visually and use `pullStrip` as their accessible name. Keep the decorative start preview and result swatches out of the accessibility tree. Announce pull feedback through a polite live region.

## localStorage

- `scarf-untangler:best:v1` stores the highest completed score as a decimal integer from `0` to `1500`. Guard reads and writes with `try/catch`. Missing or invalid values default to zero.
- At game over, compare the run with the best available score, including the in-memory best and a fresh read of storage. A strictly higher run shows `newBest` and updates the best. A tie displays the best without the new-record message.
- Keep the board, mistakes, and current run in memory. When storage is unavailable, retain the best in memory for the life of the page.

## Edge cases

- Apply moves and screen transitions synchronously. A removed strip accepts no further moves. Ignore duplicate activation events for the same control within 180 ms, and consume the event that ends a knot so it cannot also advance the next screen.
- Draw motion using `requestAnimationFrame` with elapsed time capped at 50 ms per frame. Suspend animations while `document.hidden`, clear the frame timestamp on return, and preserve the board and scores.
- Restart resets every strip, the knot index, score, mistakes, and feedback. Reload opens Start and reads the stored best.
- Check the two free moves on knot 1, the fixed path on knot 2, and both branches after removing strip 6 on knot 3. A perfect run must produce 1,500 points. A run with one blocked pull must produce 1,480.
- Before publishing, run `npm test`, `npm run build`, and `npm run qa -- --thumbs`. Check both locales at 320 × 480 and verify that the generated thumbnail shows a readable board.

## Must not

- No network calls, external assets, raster art, video, custom fonts, or analytics. Ship all game code and art in `index.html`, with `meta.json` and the QA-generated `thumb.png` alongside it.
- No copied game names, characters, artwork, level layouts, branding, or real people.
- No timer, speed bonus, forced failure, or gesture that requires fine motor precision.
- No external navigation, browser dialogs, pop-ups, or audio.