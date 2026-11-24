# Idea and spec: 정규식 테스트 놀이터 / Regex Playground

Agent: Claude (opus), planner. Design notes are included (palette, layout, motion).

## Concepts scored

Each concept is scored 1–5 on four things: value in the first 10 seconds, originality, Korean search/share demand, and buildability in one HTML file. The maximum is 20.

| Concept | Category | Score | Verdict |
|---|---|---|---|
| 동지 낮 길이 비교: pick a Korean city and see a day bar comparing sunrise and sunset on 동지 (12/22) with 하지 | learn | 3/3/4/4 = 14 | Too close to the subject of `winter-shadow-lab` (sun position) and `dongji-dumpling-puzzle` (동지). Skip it for now |
| 세계 시간 보드: compare city clocks and find overlapping meeting hours | info | 3/2/3/5 = 13 | Useful, but the space is crowded and there is no seasonal hook |
| **정규식 테스트 놀이터: type a pattern, see matches light up live, and read a plain-language explanation of each token** | **tech** | **4/3/4/5 = 16** | **Picked.** It is a backlog item (`ideas.md`), people search for it all year ("정규식 테스트", "정규식 한글", "전화번호 정규식"), no existing item or queued spec has the same subject, and the Korean-first presets (휴대폰 번호, `[가-힣]`, 금액 콤마) give it its own angle |

## Meta

- slug `regex-playground`, category `tech`, kind `tool`, aspect `3/4`, date `2026-11-25`
- tags: ko `정규식`, `정규표현식`, `개발도구`; en `regex`, `regular expression`, `developer tool`
- title: ko `정규식 테스트 놀이터`; en `Regex Playground`
- desc ko: 정규식을 입력하면 일치하는 부분이 바로 색칠되고, 기호 하나하나를 한국어로 풀어 설명해 줘요. 휴대폰 번호·이메일·날짜·한글·금액 콤마 예시가 들어 있어요.
- desc en: Type a regular expression and watch matches light up as you type, with every token explained in plain words. Presets include phone numbers, emails, dates and Korean text.
- howto ko: 위 칸에 패턴을, 아래 칸에 테스트할 문장을 넣으세요. 플래그(g·i·m·s·u)를 눌러 켜고 끌 수 있어요. 아래 탭에서 일치 목록, 설명, 바꾸기, 치트시트를 볼 수 있고, 치트시트 기호를 누르면 패턴에 바로 들어가요.
- howto en: Put a pattern in the top box and some test text below it. Tap the flags (g, i, m, s, u) to toggle them. The tabs at the bottom show the match list, an explanation, a replace preview and a cheat sheet. Tap any cheat-sheet token to insert it into the pattern.
- about ko: JavaScript(ECMAScript) 정규식 기준이에요. 다른 언어(Python, Java 등)와 조금 다를 수 있어요. 입력한 패턴과 문장은 이 기기에만 저장되고 어디로도 보내지 않아요. '느린 정규식 체험' 예시로 백트래킹 폭발도 안전하게 구경해 보세요.
- about en: This uses JavaScript (ECMAScript) regex, which can differ slightly from Python, Java and others. Your pattern and text stay on this device and are never sent anywhere. Try the "slow regex" preset to watch catastrophic backtracking safely.

## Pitch

The tool is a clean, paper-white workbench with a monospace pattern bar at the top.

1. The user types a pattern such as `01[016789]-?\d{3,4}-?\d{4}`.
2. Every match in the test text lights up immediately as a yellow or mint highlight. A small counter reads "일치 3개".
3. The Explanation tab turns the pattern into a list a beginner can read: "글자 "01" 그대로", "0·1·6·7·8·9 중 한 글자", "글자 "-", 0번 또는 1번", "숫자 하나 (0~9), 3~4번".
4. A native `<select>` loads Korean-first presets in one tap, so value shows up in the first 10 seconds with no typing at all.
5. Matching runs in a Web Worker with a time limit. A runaway pattern never freezes the page; it shows a friendly "너무 오래 걸려요" card instead. That card is itself a lesson, shown off by the "느린 정규식 체험" preset.

## Flow

The tool has one screen. There is no start screen and no game loop, because this is a tool.

1. **Load**
   - Restore the last pattern, flags, text, replacement and tab from localStorage.
   - If nothing is stored, load the "휴대폰 번호" preset.
   - Run the match once.
2. **Edit** (typing in the pattern, the text or the replacement, or toggling a flag)
   - Debounce by 120 ms, then send the job to the worker.
   - While a job is running, any new job cancels the old result. Results carry a job id, and stale ids are ignored.
3. **Result**
   - Update the highlight overlay, the counter and the active tab panel.
   - On an invalid pattern, show the error line and keep the last good highlights dimmed at 40% opacity.
   - On a timeout, terminate the worker and show the timeout card. A new worker is created on the next edit.
4. **Tabs**
   - Switching tabs only re-renders that panel from the last result. It never re-runs the match.
5. **Copy**
   - "패턴 복사" copies `/{pattern}/{flags}`.
   - "결과 복사" on the Replace tab copies the replaced text.
   - Each copy shows a toast.

## Layout

The layout is fluid and recomputed by CSS only. The page never scrolls; panels scroll internally.

**Narrow screens (< 900 px wide)** stack these rows in a single column:

1. **Header** (44 px)
   - The 🔍 icon and the title on the left.
   - The preset `<select>` on the right, labelled "예시 불러오기".
2. **Pattern bar** (52 px)
   - A gray `/`, then a single-line `<input>` for the pattern, then a gray `/` and the active flags as text.
   - A [패턴 복사] icon button (44×44).
3. **Flag chips row** (44 px)
   - Five toggle chips: `g`, `i`, `m`, `s`, `u`, each with a short label underneath at 10 px.
   - The chips scroll horizontally if needed at 320 px wide.
4. **Error/status line** (24 px)
   - "일치 3개 · 0.4ms", or a red error message, or "패턴을 입력하세요".
5. **Test text editor** (flex 1, min-height 120 px)
   - A textarea stacked over a highlight mirror (see "Highlight editor").
   - A small [지우기] text button at the top right inside the editor.
6. **Tab bar** (44 px)
   - [일치 목록] [설명] [바꾸기] [치트시트].
7. **Tab panel** (flex 1, min-height 140 px)
   - Scrolls internally.

**Wide screens (≥ 900 px)** use two columns:

- Left (55%): rows 2–5.
- Right (45%): the tab bar and the panel, at full height.
- The header spans both columns.
- The maximum total width is 1200 px, centered.

**At 320 px wide**, the side padding is 12 px. The pattern input font stays at 16 px or more so iOS does not zoom on focus.

## Highlight editor

- A `<textarea>` with transparent text background and a visible caret sits on top of a `<div class="mirror">` with an identical box:
  - same font: `ui-monospace, "SFMono-Regular", Menlo, Consolas, "Courier New", monospace` at 15 px
  - same padding, line-height and `white-space: pre-wrap`
  - same `word-break: break-word` and the same width
- The mirror's content is the text split into plain text nodes and `<mark>` spans.
  - It is built with `textContent` and DOM nodes only, never `innerHTML` with user text.
  - It ends with a trailing `"\n "` so that a final newline keeps the same height.
- Mark colors alternate between `--m1` and `--m2` for each match.
  - Capture group 1, 2 and 3 ranges get an extra 2 px bottom border in `--g1`, `--g2` and `--g3`.
  - Group ranges come from re-running each match with the `d` flag when it is supported. Otherwise, skip the underlines.
- A zero-length match is drawn as a 2 px wide `--accent` bar (`<mark class="zero">`, `display:inline-block; width:2px; height:1.1em; vertical-align:text-bottom`).
- The mirror scroll follows the textarea scroll on every `scroll` event.
- The textarea has `spellcheck="false"`, `autocapitalize="off"`, `autocomplete="off"`, `autocorrect="off"` and `maxlength="20000"`.
- If more than 1,000 matches are found, highlight only the first 1,000. The status line reads "일치 1,000개 이상 (처음 1,000개만 표시)".

## Matching engine

- **Worker setup**
  - The worker source is an inline string turned into a `Blob`, then `URL.createObjectURL`, then `new Worker(url)`. There are no external files and no network.
- **Job**
  - The job message is `{id, pattern, flags, text, replacement, mode}`.
  - The worker does `new RegExp(pattern, flags)` inside try/catch and returns `{id, error}` on a SyntaxError.
- **Collecting matches**
  - If `g` is on, use `matchAll`, capped at 1,000.
  - If `g` is off, use a single `exec`.
  - For each match, return `{index, end, text, groups: [..captures], named: {..}, groupRanges?}`.
  - Zero-length matches are safe: `matchAll` advances by itself. In the manual `exec` path, bump `lastIndex` when `m[0] === ""`.
- **Replace**
  - The worker returns `text.replace(re, replacement)`.
  - Replace runs only when the Replace tab is open or the replacement is not empty.
- **Timing**
  - Each result includes `ms` from `performance.now()`.
- **Timeout**
  - If no result arrives within 400 ms, call `worker.terminate()`, set `worker = null` and show the timeout card.
  - The next job lazily creates a fresh worker.
- **Fallback**
  - If creating the Worker throws (some sandboxed iframes block it), run on the main thread instead.
  - In fallback mode, test only the first 3,000 characters and show the note `fallbackNote`.
- **Empty pattern**
  - Do not match at all. An empty pattern would match at every position.
  - Show `emptyPattern` and clear the highlights.

## Presets (native `<select>`)

Loading a preset replaces the pattern, flags, text and replacement, switches to its suggested tab and shows the toast `presetLoaded`.

| id | ko label | en label | pattern | flags | replacement | suggested tab |
|---|---|---|---|---|---|---|
| phone | 휴대폰 번호 | Korean mobile number | `01[016789]-?\d{3,4}-?\d{4}` | g | (empty) | matches |
| email | 이메일 (간단 버전) | Email (simple) | `[\w.+-]+@[\w-]+(\.[\w-]+)+` | g | (empty) | explain |
| date | 날짜 YYYY-MM-DD | Date YYYY-MM-DD | `(?<y>\d{4})-(?<m>0[1-9]\|1[0-2])-(?<d>0[1-9]\|[12]\d\|3[01])` | g | `$<y>년 $<m>월 $<d>일` | replace |
| hangul | 한글 단어만 | Korean words only | `[가-힣]+` | g | (empty) | matches |
| comma | 금액에 콤마 넣기 | Add thousands commas | `\B(?=(\d{3})+(?!\d))` | g | `,` | replace |
| slow | 느린 정규식 체험 ⚠️ | Slow regex demo ⚠️ | `(a+)+$` | (none) | (empty) | explain |

In the table, `\|` is the Markdown escape for `|`. The real pattern uses a plain `|`.

Preset test texts. All numbers are obvious dummy examples, and every address uses `example.com` or `test.co.kr`.

- **phone**
  - ko: `연락처: 010-1234-5678\n문의: 01098765432\n사무실: 02-123-4567 (이건 휴대폰 번호가 아니라 안 맞아요)`
  - en: `Contact: 010-1234-5678\nAsk: 01098765432\nOffice: 02-123-4567 (a landline, so it does not match)`
- **email**
  - ko: `toy@example.com\nhello.world+tag@test.co.kr\n잘못된@주소 (\w는 한글을 안 잡아요)`
  - en: `toy@example.com\nhello.world+tag@test.co.kr\nnot-an-email@\n@missing.name`
- **date**
  - ko: `동지 2026-12-22\n성탄절 2026-12-25\n없는 날짜 2026-13-40`
  - en: `Solstice 2026-12-22\nChristmas 2026-12-25\nNot a date 2026-13-40`
- **hangul**
  - ko and en: `Daily Toybox 하루한판 2026 겨울 놀이터!`
- **comma**
  - ko: `1234567원\n89000원\n500원`
  - en: `1234567 won\n89000 won\n500 won`
  - Expected replace output: `1,234,567원 / 89,000원 / 500원`, with line breaks kept.
- **slow**
  - ko and en: `aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa!`. That is 32 a's then `!`, which takes far longer than 400 ms, so the timeout card is guaranteed.

## Explanation tab

The explanation comes from a small hand-written tokenizer over the pattern string. It is display-only: matching always uses the real `RegExp`, so a tokenizer bug can never change results.

- **Output**
  - Each token becomes a row with a monospace token chip on the left and a sentence on the right.
  - Rows inside a group are indented 14 px per depth level, up to a maximum of 6 levels.
- **Merging**
  - Consecutive plain literals merge into one row ("01" rather than "0" then "1"), unless the last one carries a quantifier.
- **Quantifiers**
  - A quantifier attaches to the previous atom's row as a suffix: `{atom}, {quant}`.
- **Invalid patterns**
  - Show only the error card.
- **Unknown syntax**
  - Show the row `other` and never throw.
  - The tokenizer is wrapped in try/catch. On a crash, show `explainFail`.
- **Flag notes** (one gray row each at the top, only for flags that are on)
  - `g` → `flagNote.g`, `i` → `flagNote.i`, `m` → `flagNote.m`, `s` → `flagNote.s`, `u` → `flagNote.u`.

Tokens and their sentences. `{x}` is the token text and `{n}` is a group number.

| token | ko | en |
|---|---|---|
| literal run | 글자 "{x}" 그대로 | The text "{x}" exactly |
| `\.` and other escaped punctuation | 글자 "{x}" 그대로 (특수문자라 \ 로 탈출) | The character "{x}" itself (escaped with \) |
| `.` | 줄바꿈을 뺀 아무 글자 하나 (s 플래그면 줄바꿈도) | Any one character except a line break (line breaks too with s) |
| `\d` / `\D` | 숫자 하나 (0~9) / 숫자가 아닌 글자 하나 | One digit (0-9) / One non-digit |
| `\w` / `\W` | 영문·숫자·밑줄(_) 한 글자 (한글은 안 잡혀요) / 그 외 글자 하나 | One letter, digit or underscore (not Korean) / Any other character |
| `\s` / `\S` | 공백 한 칸 (스페이스·탭·줄바꿈) / 공백이 아닌 글자 하나 | One whitespace (space, tab, line break) / One non-whitespace |
| `\b` / `\B` | 단어 경계 위치 (글자를 먹지 않아요) / 단어 경계가 아닌 위치 | A word boundary (takes no characters) / Not a word boundary |
| `^` / `$` | 맨 앞 위치 (m 플래그면 각 줄의 앞) / 맨 끝 위치 (m 플래그면 각 줄의 끝) | Start (start of each line with m) / End (end of each line with m) |
| `\n` `\t` `\r` | 줄바꿈 / 탭 / 캐리지 리턴 | Line break / Tab / Carriage return |
| `[가-힣]` (exact) | 완성형 한글 한 글자 (가~힣) | One Korean syllable (가 to 힣) |
| `[...]` | [ ] 안의 글자 중 하나: {list} | One of: {list} |
| `[^...]` | [ ] 안의 글자를 뺀 아무 글자 하나: {list} | Any one character except: {list} |
| `(` | {n}번 그룹 시작 (잡은 값은 ${n}) | Start of group {n} (captured as ${n}) |
| `(?<name>` | "{name}" 이름표 그룹 시작 (잡은 값은 $<{name}>) | Start of group "{name}" (captured as $<{name}>) |
| `(?:` | 묶기만 하는 그룹 시작 (번호 없음) | Start of a non-capturing group |
| `(?=` / `(?!` | 바로 뒤에 다음이 와야 함 (위치만 확인) / 바로 뒤에 다음이 오면 안 됨 | Must be followed by (checks only) / Must not be followed by |
| `(?<=` / `(?<!` | 바로 앞에 다음이 있어야 함 / 바로 앞에 다음이 있으면 안 됨 | Must be preceded by / Must not be preceded by |
| `)` | 그룹 끝 | End of group |
| `\|` | 또는 (왼쪽이나 오른쪽 중 하나) | Or (either side) |
| `\1`..`\9` | {n}번 그룹과 똑같은 글자 | The same text as group {n} |
| `\k<name>` | "{name}" 그룹과 똑같은 글자 | The same text as group "{name}" |
| `\uXXXX`, `\u{...}`, `\xHH` | 유니코드 글자 {char} | The Unicode character {char} |
| `\p{...}` / `\P{...}` | 유니코드 속성 "{x}"인 글자 (u 플래그 필요) / 아닌 글자 | A character with Unicode property "{x}" (needs u) / without it |
| other | 기타 문법 "{x}" | Other syntax "{x}" |

`{list}` inside a set is rendered by these rules:

- ranges as `0~9` / `0-9`
- other items joined with `·` (ko) or `, ` (en)
- `\d`, `\w` and `\s` inside the set use their short names: 숫자 / digit, 영문·숫자·_ / word char, 공백 / space

Quantifier suffixes:

| quant | ko | en |
|---|---|---|
| `?` | 0번 또는 1번 | zero or one time |
| `*` | 0번 이상 | zero or more times |
| `+` | 1번 이상 | one or more times |
| `{n}` | 정확히 {n}번 | exactly {n} times |
| `{n,}` | {n}번 이상 | {n} or more times |
| `{n,m}` | {n}~{m}번 | {n} to {m} times |
| lazy `?` after any | (가능한 적게) | (as few as possible) |

Flag notes:

| flag | ko | en |
|---|---|---|
| g | g: 처음 하나가 아니라 전부 찾아요 | g: finds every match, not just the first |
| i | i: 대소문자를 구분하지 않아요 | i: ignores upper/lower case |
| m | m: ^ 와 $ 가 줄마다 적용돼요 | m: ^ and $ work on every line |
| s | s: 점(.)이 줄바꿈도 잡아요 | s: dot (.) also matches line breaks |
| u | u: 유니코드 모드 (이모지, \p{...} 사용 가능) | u: Unicode mode (emoji, \p{...}) |

## Match list tab

- Each match is a row:
  - a `#1` badge in the match color, the quoted match text (zero-length shows `(빈 일치)` / `(empty match)`) and a gray `@12–25` position
  - group sub-rows: `$1 = "…"`, with `$<y> = "…"` for named groups and `(없음)` / `(none)` for an undefined group
- Rows render up to 200 at a time. After that, show `moreMatches`.
- Tapping a row selects that range in the textarea (`setSelectionRange`) and scrolls the textarea to it. Do not steal focus on touch devices: only select if the textarea is already focused, or on pointerType mouse.
- With no matches, show the empty state `noMatch` with a 🫥 emoji.

## Replace tab

- A replacement `<input>` (monospace, single line), with a gray hint underneath: `replHint`.
- A read-only output box (monospace, pre-wrap, internal scroll) with the result. It has no highlight, to keep it cheap.
- A [결과 복사] button.
- If the pattern is invalid, timed out or empty, the output shows the original text grayed, with the note `replNA`.

## Cheat sheet tab

- A grid of tap chips, each at least 44 px tall, with the token in monospace and a 1-line label under it.
- **Tapping a chip** inserts the token into the pattern input at the caret, or replaces the selection.
  - Paired tokens put the caret inside the pair: `[]`, `[^]`, `()`, `(?:)`, `(?<name>)` with `name` selected, `(?=)`, `(?!)`, `(?<=)`, `{n,m}` with `n,m` selected.
  - After inserting, refocus the pattern input only if pointerType is mouse. On touch, keep the keyboard closed and show the toast `inserted`.
- **Chips, in order:**
  - `\d`, `\w`, `\s`, `.`
  - `^`, `$`, `\b`
  - `[]`, `[^]`, `[가-힣]`
  - `*`, `+`, `?`, `{n}`, `{n,m}`, `*?`
  - `()`, `(?:)`, `(?<name>)`, `|`
  - `(?=)`, `(?!)`, `(?<=)`
  - `\.`
- Each chip label is the short form of the matching explanation row (`cheat.*` strings).
- Below the grid is a "바꾸기에서 쓰는 기호" box listing `$&`, `$1`, `$<name>` and `$$` with their meanings (strings `replTok.*`).

## Controls

- **Pointer:** tap or click everything. Panels scroll by drag or wheel inside them.
- **Keyboard:** normal typing in all inputs. Do not `preventDefault` typing keys, because this is a text tool.
- **Shortcuts:** only active when focus is not in a text field, or with Alt held.
  - Alt+1 to Alt+4 switch tabs.
  - Alt+G, Alt+I, Alt+M, Alt+S and Alt+U toggle flags.
  - Alt+C copies the pattern.
  - Esc blurs the current field.
- **Flag chips** are `<button aria-pressed>`.
- **Tabs** use `role="tablist"`, `role="tab"` and `aria-selected`, with ArrowLeft and ArrowRight moving between tabs when the tab bar is focused.
- **Accessibility:** every control is at least 44 px. Inputs have `<label>` (visually hidden when needed). The error and status line has `aria-live="polite"`.
- **Touch:** `touch-action: manipulation` on buttons. The page body has `overflow:hidden` and `height:100dvh`.

## Visual design

- **Palette**
  - background #f6f4ef, panel #ffffff, border #e3dfd6
  - ink #1f2430, gray #8a8f98
  - accent teal #0f9d8a, error red #d9483b
  - matches: `--m1` #ffd86b at 75% and `--m2` #9be7d8 at 75%
  - group underlines: `--g1` #e0453d, `--g2` #3b6fe0 and `--g3` #9b4be0
- **Type:** system-ui for the UI and the monospace stack above for code.
- **Pattern bar:** white with a 2 px border that is teal on focus and red when there is an error. The slashes are gray.
- **Flag chips:** off is a white chip with a gray letter. On is teal fill with a white letter, plus a 120 ms pop (scale 1 → 1.08 → 1).
- **Feedback**
  - The counter number pulses (scale 1.15 → 1, 150 ms) when the count changes.
  - On a new error, the pattern bar shakes 3 px for 120 ms.
- **Timeout card:** an amber (#fff4d6) card with ⏳, `timeoutTitle`, `timeoutBody` and a small "왜 그럴까요?" line (`timeoutWhy`).
- **Toast:** a dark pill at the bottom center, shown for 1.6 s.
- **prefers-reduced-motion:** no pops, pulses or shakes.
- **Dark mode:** skipped on purpose. The single light palette keeps the highlight contrast predictable. Add it when someone asks.

## Strings

| key | ko | en |
|---|---|---|
| appTitle | 정규식 테스트 놀이터 | Regex Playground |
| presetLabel | 예시 불러오기 | Load an example |
| presetPlaceholder | 예시 고르기… | Pick an example… |
| presetLoaded | 예시를 불러왔어요 | Example loaded |
| patternLabel | 정규식 패턴 | Regex pattern |
| patternPh | 여기에 패턴 입력 (예: \d+) | Type a pattern (e.g. \d+) |
| textLabel | 테스트할 문장 | Test text |
| textPh | 여기에 문장을 붙여 넣으세요 | Paste some text here |
| clear | 지우기 | Clear |
| copyPattern | 패턴 복사 | Copy pattern |
| copied / copyFail | 복사했어요 / 복사하지 못했어요 | Copied / Could not copy |
| flag.g / flag.i / flag.m / flag.s / flag.u | 전체 / 대소문자 무시 / 여러 줄 / 점=줄바꿈 / 유니코드 | All / Ignore case / Multiline / Dot-all / Unicode |
| count | 일치 {n}개 | {n} match(es) |
| countCap | 일치 1,000개 이상 (처음 1,000개만 표시) | 1,000+ matches (showing the first 1,000) |
| ms | {ms}ms | {ms} ms |
| emptyPattern | 패턴을 입력하세요 | Type a pattern |
| errorPrefix | 패턴 오류: | Pattern error: |
| errorHint | 괄호나 [ ] 가 짝이 맞는지 확인해 보세요 | Check that brackets and parentheses are balanced |
| timeoutTitle | 너무 오래 걸려요 | This is taking too long |
| timeoutBody | 0.4초 안에 끝나지 않아서 멈췄어요. 페이지는 안전해요. | It did not finish in 0.4 s, so we stopped it. The page is safe. |
| timeoutWhy | (a+)+ 처럼 반복 안에 반복이 있으면 경우의 수가 폭발해요(백트래킹). 반복을 하나로 줄여 보세요. | Nested repeats like (a+)+ make the number of tries explode (backtracking). Try a single repeat. |
| fallbackNote | 이 환경에선 앞 3,000자만 검사해요 | In this environment, only the first 3,000 characters are tested |
| tab.matches / tab.explain / tab.replace / tab.cheat | 일치 목록 / 설명 / 바꾸기 / 치트시트 | Matches / Explain / Replace / Cheat sheet |
| noMatch | 일치하는 부분이 없어요 | No matches |
| emptyMatch | (빈 일치) | (empty match) |
| noneGroup | (없음) | (none) |
| moreMatches | 그 외 {n}개 더 있어요 | {n} more not shown |
| explainFail | 이 패턴은 설명하기 어려워요. 일치 결과는 정확해요. | This pattern is hard to explain, but the matches are still correct. |
| replLabel | 바꿀 내용 | Replace with |
| replPh | 예: $1 또는 *** | e.g. $1 or *** |
| replHint | $& 전체 일치 · $1 그룹 · $<이름> 이름표 그룹 · $$ 달러 기호 | $& whole match · $1 group · $<name> named group · $$ dollar sign |
| replOut | 바뀐 결과 | Result |
| replCopy | 결과 복사 | Copy result |
| replNA | 패턴이 올바르지 않아 원문을 보여 줘요 | The pattern is not valid, so the original text is shown |
| inserted | 패턴에 넣었어요 | Inserted into the pattern |
| replTokTitle | 바꾸기에서 쓰는 기호 | Tokens for replace |
| replTok.amp / one / named / dollar | 일치한 전체 / 1번 그룹 / 이름표 그룹 / $ 글자 자체 | Whole match / Group 1 / Named group / A literal $ |
| cheat.d / w / s / dot | 숫자 / 영문·숫자·_ / 공백 / 아무 글자 | Digit / Word char / Space / Any char |
| cheat.start / end / b | 맨 앞 / 맨 끝 / 단어 경계 | Start / End / Word boundary |
| cheat.set / neg / hangul | 이 중 하나 / 이것만 빼고 / 한글 한 글자 | One of / None of / Korean syllable |
| cheat.star / plus / q / n / nm / lazy | 0번 이상 / 1번 이상 / 있어도 없어도 / n번 / n~m번 / 적게 반복 | 0 or more / 1 or more / Optional / n times / n to m / Lazy |
| cheat.group / nc / named / or | 그룹 / 묶기만 / 이름표 그룹 / 또는 | Group / Non-capturing / Named group / Or |
| cheat.la / nla / lb | 뒤에 와야 함 / 뒤에 오면 안 됨 / 앞에 있어야 함 | Followed by / Not followed by / Preceded by |
| cheat.escDot | 점 글자 그대로 | A literal dot |
| engineNote | JavaScript 정규식 기준 | JavaScript regex flavor |

The preset labels and texts are in the Presets section. The explanation sentences are in the Explanation tab section.

## localStorage (in try/catch, prefix `rxp:`)

| key | value | default |
|---|---|---|
| `rxp:pattern` | last pattern (max 2,000 chars) | phone preset |
| `rxp:flags` | for example `"g"` | `"g"` |
| `rxp:text` | last test text (max 20,000 chars) | phone preset text |
| `rxp:repl` | last replacement | `""` |
| `rxp:tab` | `matches` \| `explain` \| `replace` \| `cheat` | `matches` |

- Saving is debounced by 400 ms.
- If storage is blocked or full, ignore it silently and keep working.
- The [지우기] button clears the text and also stores `""`.

## Edge cases

- **Empty pattern:** no matching, no highlights, show `emptyPattern`. The Explanation tab shows only the flag notes.
- **Invalid pattern:**
  - Show `errorPrefix` plus the engine's `e.message` (engine wording may be English; that is OK) plus `errorHint`.
  - Keep the previous highlights dimmed at 40%. Shake the bar only when the error first appears, not on every keystroke.
- **Pattern typed with slashes:** if the pattern looks like `/…/flags`, strip the slashes, apply the flags and show the toast "슬래시와 플래그를 나눠 넣었어요 / Split the slashes and flags for you".
  - Only do this when the whole input matches `^\/(.+)\/([gimsuyd]*)$`.
- **Flags outside the supported set:** `y` and `d` are never shown as chips. Flags pasted via `/…/y` are dropped with the same toast.
- **Unsupported syntax in older browsers** (for example lookbehind before Safari 16.4) surfaces as a normal SyntaxError. Never polyfill.
- **Zero-length matches** (`\b`, lookaheads, `a*` on "bbb") show as thin bars and as `(빈 일치)` rows. A zero-length match must never cause an infinite loop.
- **Catastrophic patterns:** the 400 ms timeout terminates the worker. Typing during a timed-out state starts a fresh worker.
- **Huge text:** the 20,000 character limit is enforced by `maxlength`. Paste beyond it gets truncated by the browser.
- **CRLF pastes:** leave them as they are. Do not normalize, because that would shift indexes against the textarea.
- **Emoji and surrogate pairs:** indexes are UTF-16 everywhere (match, highlight and selection), so slicing stays consistent. With `u` off, `.` may match half of an emoji. That is correct JS behavior; do not "fix" it.
- **Resizing:** layout is pure CSS. The mirror re-wraps automatically because its box matches the textarea's. There is no JS layout math.
- **Tab switching** never re-runs the regex.
- **Worker unavailable:** use the main-thread fallback, capped at 3,000 characters and with no timeout possible. In this mode, the slow preset loads with its text shortened to 18 a's so it stays quick.
- **`?lang=`** picks the language. If it is missing, use `navigator.language`. Set `<html lang>` to match. Preset texts follow the language at load time; switching language does not rewrite the user's text.
- **`location.hash === '#demo'`:** load the date preset with the Replace tab open and do not read localStorage. This is for QA thumbnails only.

## Must not

- No network of any kind. No `fetch`, external fonts or CDN. The worker comes from a Blob only. Keep it under 80 KB.
- No `eval`, `new Function` or `innerHTML` with user input. The only thing built from user input is `new RegExp(pattern, flags)`.
- Never send, log or upload the pattern or the text.
- Do not claim PCRE, Python or Java compatibility. Always show `engineNote`.
- Presets contain no real personal data, real phone numbers beyond the standard dummy `010-1234-5678` style, or real company or brand email domains. Use only `example.com` and `test.co.kr`.
- Do not copy the layout, colors, naming or wording of existing regex testers (regex101, RegExr and similar). Keep this tool's own paper-white workbench look and Korean-first presets.
- No page scrolling, `alert`, `confirm`, `prompt`, `window.open` or navigation. No sound.
- Never let a user pattern freeze the UI thread when the Worker is available.
