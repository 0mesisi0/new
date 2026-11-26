# Idea and spec: 한글 자소 분리 · 유니코드 조합 실험실 / Hangul Unicode Lab

## Concepts scored

Each concept is scored 1–5 on four things: value in the first 10 seconds, originality, Korean search/share demand, and whether it can be built in one HTML file. The maximum is 20.

The three subjects in today's research are already queued: page smash (`page-smash`), the 2027 fortune (`new-year-fortune-2027`) and the year-end tax deduction (`card-deduction-calculator-2026`). The 곶감 subject overlaps `persimmon-breeze`. So these three concepts use new subjects.

| Concept | Category | Score | Verdict |
|---|---|---|---|
| 눈썰매 언덕 / Sled Hill: hold to crouch on the downhill, let go to jump, and dodge the snow piles | games | 4/3/3/4 = 14 | Seasonal, but the site already has many winter games. Keep it for later |
| "곧 감" 작별 인사 생성기 / "Gone Soon" Goodbye Pun Maker | weird | 4/3/3/5 = 15 | The trend could be gone within a week, and it risks pointing at the original challenge and the real people in it. Drop it |
| **한글 자소 분리 · 유니코드 조합 실험실 / Hangul Unicode Lab** | **tech** | **4/4/5/5 = 18** | **Picked.** The fix for "파일 이름이 ㅎㅏㄴㄱㅡㄹ로 깨졌어요" (file names coming out as separated letters) is a steady, high-volume search. It has no seasonal expiry. The only tech item so far is `dns-address-trace`, so it adds variety. A single `normalize('NFC')` call does the core work |

## Meta

- slug `hangul-unicode-lab`, category `tech`, kind `tool`, aspect `3/4`, date `2026-11-27`
- tags: ko `자소분리`, `한글 유니코드`; en `hangul`, `unicode`
- title: ko `한글 자소 분리 해결 · 유니코드 조합 실험실`; en `Hangul Unicode Lab: Fix Split Syllables`
- desc ko: 맥에서 받은 파일 이름이 'ㅎㅏㄴㄱㅡㄹ'처럼 깨졌나요? 붙여 넣으면 바로 고쳐 드려요. 자모 버튼으로 11,172자를 직접 조립하며 한글 코드 공식도 볼 수 있어요.
- desc en: File names showing up as separated Korean letters? Paste them and fix them in one tap. You can also build any of the 11,172 Hangul syllables from jamo and watch the Unicode formula work.
- howto ko: 위쪽 탭 3개 중 하나를 고르세요. [고치기]에는 깨진 글자를 붙여 넣고 '복사'를 누르면 돼요. [조립]에서는 초성·중성·종성 버튼을 눌러 글자를 만들어요. [분해]에 문장을 넣으면 글자마다 코드값과 UTF-8 바이트가 나와요. 키보드로는 숫자 1~3으로 탭을 바꾸고, 조립 탭에서 R을 누르면 무작위 글자가 나와요.
- howto en: Pick one of the 3 tabs at the top. In Fix, paste the broken text and tap Copy. In Build, tap initial, vowel and final buttons to make a syllable. In Inspect, type a sentence to see each character's code point and UTF-8 bytes. On a keyboard, keys 1–3 switch tabs and R gives a random syllable in Build.
- about ko: 맥(macOS)은 파일 이름을 자모로 쪼개진 NFD 형태로 저장할 때가 있어요. 윈도우에서는 그 이름이 'ㅎㅏㄴ'처럼 보여요. 이 도구는 브라우저 기본 기능인 NFC 정규화로 자모를 다시 붙여요. 입력한 글은 이 기기 밖으로 나가지 않고 저장되지도 않아요. 한글 음절 코드는 0xAC00 + (초성×21 + 중성)×28 + 종성 공식으로 정해져요.
- about en: macOS sometimes stores file names in decomposed (NFD) form, so on Windows they show up as loose jamo. This tool joins them back with NFC normalization, which is built into the browser. Your text never leaves this device and is never saved. Every Hangul syllable's code is 0xAC00 + (initial×21 + vowel)×28 + final.

## Pitch

A clean dark-on-paper "lab bench" with three tabs.

1. **고치기 / Fix** (the default tab, because it has the search demand): paste "ㅎㅏㄴㄱㅡㄹ 문서.pdf" and see "한글 문서.pdf" at once, with a big Copy button and a short count such as "자모 6개 → 글자 2개로 붙였어요" (6 jamo joined into 2 letters). Multi-line paste works, so a list of file names can be fixed in one go.
2. **조립 / Build** (the fun first 10 seconds): three rows of jamo chips. Tapping ㅎ, then ㅏ, then ㄴ makes a giant "한" pop in. Under it, the formula fills in live: `0xAC00 + (18×21 + 0)×28 + 4 = U+D55C`. A 🎲 button draws one of the 11,172 syllables at random, such as 쀍 or 똠, which makes a good screenshot.
3. **분해 / Inspect**: type a sentence and get one card per character with its code point, its 초성/중성/종성 parts, UTF-8 bytes and UTF-16 units. Non-Hangul characters and emoji are labeled honestly.

## Flow

1. **On load:** read `?lang`, restore the last tab from storage (default `fix`), and focus the Fix textarea on desktop only.
2. **FIX**
   - A textarea (placeholder string `fixPh`) and a read-only output box below it.
   - The output updates on every `input` event with `text.normalize('NFC')`.
   - The status line shows one of three states:
     - nothing to fix: `fixNone`
     - fixed: `fixDone` with {before} = the input's code-point count and {after} = the output's code-point count
     - empty input: `fixEmpty`
   - Buttons: [복사 / Copy] (primary), [지우기 / Clear], [예시 넣기 / Try an example].
   - The example inserts NFD text built at runtime: `'한글 문서.pdf\n하루한판 사진.jpg'.normalize('NFD')`. Never paste literal NFD into the source, because editors may silently normalize it.
   - In the output, characters that changed get a soft yellow highlight. Compare the input and output segment by segment (see Edge cases).
3. **BUILD**
   - A big syllable preview (about 30% of the height), then the formula line, then three chip rows: 초성 19, 중성 21 and 종성 28 (the first one is "없음 / none").
   - Each row scrolls horizontally inside its own strip. The page never scrolls.
   - The default selection is ㅎ/ㅏ/ㄴ = 한.
   - Tapping a chip selects it, and the preview pops (scale 1.25 → 1 over 160 ms).
   - The formula numbers that changed flash in the accent color for 300 ms.
   - Under the formula: "11,172자 중 {n}번째" (number n of 11,172), where n = index + 1. Also the code point, the decimal value and the UTF-8 bytes.
   - [🎲 무작위 / Random] picks uniformly from 0–11171 and sets all three chips. Each strip scrolls its chip into view.
   - [글자 복사 / Copy letter] copies the syllable.
4. **INSPECT**
   - A single-line input with max length 40 code points (see Edge cases) and a card grid below it.
   - Each card has a large glyph, a code point such as `U+D55C`, and a type label: Hangul syllable, Hangul jamo, Space, Other.
   - Syllable cards also show the 초성·중성·종성 chips and the index triple (18, 0, 4).
   - Every card shows the UTF-8 bytes as hex (`ED 95 9C`) and the UTF-16 unit count.
   - Tapping a syllable card sends it to the Build tab with that selection.
   - The card grid scrolls internally.

## Controls

- **Pointer:** tap or click everything. Chip strips scroll horizontally with drag or wheel, and the card grid scrolls vertically.
- **Keys anywhere,** except while typing in a field:
  - 1, 2 and 3 switch to Fix, Build and Inspect.
  - Ctrl or ⌘ + Shift + C copies the current output: the fixed text on Fix, the letter on Build.
- **Keys on Build:**
  - R picks a random syllable.
  - ArrowUp and ArrowDown move the focused row (초성/중성/종성).
  - ArrowLeft and ArrowRight change the selection in that row.
  - These keys call `preventDefault` so the page does not scroll.
- **Tabs:** `role="tablist"`, ArrowLeft/ArrowRight between tabs when the tab bar has focus, and visible focus rings.
- **Touch and layout:**
  - Every button and chip is at least 44×44 px.
  - Chip strips have `touch-action: pan-x`, and the card grid and output box have `pan-y`.
  - The textareas keep the default touch behavior so the user can paste.

## Screens and layout

- **Shell:**
  - `100dvh`, as a flex column: header (title + language-independent icon) → tab bar → panel (flex 1, `overflow:hidden`) → footnote line.
  - Centered column with max width 560 px.
  - At 320 px wide: 12 px padding, 32 px chip font, and tab labels shown as text only.
- **Palette:**
  - bench #f6f3ea, ink #22252b, muted #7c8190
  - accent (Hangul blue) #2f5bd3, highlight #ffe38a, ok green #2f9e6a, card #ffffff with a 1 px #e4dfd2 border
  - preview glyph in ink, with a subtle offset shadow #2f5bd322
- **Type:** system-ui. Code points and bytes use `ui-monospace, "Cascadia Mono", Menlo, monospace`. Syllable glyphs use the system font stack only. No web fonts.
- **Fix panel:**
  - Input textarea at 40% height, then a ↓ arrow badge, then the output box at 40%, then the status line and the button row.
  - When something was fixed, the status line gets a green check that pops in.
- **Build panel:**
  - The preview glyph is `clamp(96px, 28vmin, 220px)`.
  - The formula line wraps at 320 px into two lines: `0xAC00 + (18×21 + 0)×28 + 4` / `= 54620 = U+D55C`.
  - Three labeled strips. The selected chip is filled with the accent color and white text. A 종성 chip of "없음" shows as a dashed outline.
- **Inspect panel:**
  - Cards are about 104 px wide in an auto-fill grid. A count of non-syllable characters sits at the top.
- **Toasts:** bottom center, 1.6 s, with `aria-live="polite"`.
- **prefers-reduced-motion:** no pop or flash animation. Changes are instant and the highlight stays static.

## Hangul math (the reference implementation)

- **Constants:** SBase 0xAC00, LBase 0x1100, VBase 0x1161, TBase 0x11A7, LCount 19, VCount 21, TCount 28, NCount 588, SCount 11172.
- **Compose:**
  - `s = SBase + (L*21 + V)*28 + T`.
  - Display jamo are the compatibility jamo strings below, not the U+11xx conjoining ones, so they render on their own.
- **Decompose:** for code point c with 0 ≤ c − SBase < 11172:
  - i = c − SBase
  - L = floor(i / 588)
  - V = floor((i % 588) / 28)
  - T = i % 28
- **Jamo lists for display:**
  - 초성 `ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ`
  - 중성 `ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ`
  - 종성 `["", ...'ㄱㄲㄳㄴㄵㄶㄷㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅄㅅㅆㅇㅈㅊㅋㅌㅍㅎ']`
- **Classify a code point:**
  - AC00–D7A3: syllable
  - 1100–11FF, 3130–318F, A960–A97F or D7B0–D7FF: jamo
  - whitespace: space
  - anything else: other
- **UTF-8 bytes:** `new TextEncoder().encode(ch)`, shown as uppercase hex pairs.
- **UTF-16 units:** `ch.length`.
- **Self-check:** with `#test`, run asserts and log `ok` to the console.
  - compose(18,0,4) === '한' and its code is 0xD55C
  - decompose('똠') round-trips
  - `'한글'.normalize('NFD').normalize('NFC') === '한글'`
  - the UTF-8 of '한' is `ED 95 9C`
  - all 11,172 indices round-trip through compose and decompose

## Strings

| key | ko | en |
|---|---|---|
| appTitle | 한글 유니코드 실험실 | Hangul Unicode Lab |
| tabFix / tabBuild / tabInspect | 고치기 / 조립 / 분해 | Fix / Build / Inspect |
| fixPh | 깨진 글자를 여기에 붙여 넣으세요 (예: ㅎㅏㄴㄱㅡㄹ.pdf) | Paste broken text here (for example, split Korean file names) |
| fixOutLabel | 고친 결과 | Fixed result |
| fixEmpty | 맥에서 받은 파일 이름이나 글을 붙여 넣어 보세요 | Paste a file name or text you got from a Mac |
| fixNone | 고칠 곳이 없어요. 이미 정상이에요 ✓ | Nothing to fix. It is already fine ✓ |
| fixDone | 자모 {before}개가 글자 {after}개로 붙었어요 ✓ | Joined {before} characters into {after} ✓ |
| fixExample | 예시 넣기 | Try an example |
| clear | 지우기 | Clear |
| copy | 복사 | Copy |
| copyLetter | 글자 복사 | Copy letter |
| copied / copyFail | 복사했어요 / 복사하지 못했어요. 길게 눌러 직접 복사해 주세요 | Copied / Could not copy. Press and hold to copy it yourself |
| fixTip | 파일 이름은 이 도구가 바꿀 수 없어요. 고친 이름을 복사해 '이름 바꾸기'에 붙여 넣으세요 | This tool cannot rename files. Copy the fixed name and paste it when you rename |
| rowL / rowV / rowT | 초성 / 중성 / 종성 | Initial / Vowel / Final |
| none | 없음 | none |
| random | 🎲 무작위 | 🎲 Random |
| nth | 11,172자 중 {n}번째 | Syllable {n} of 11,172 |
| decimal | 10진수 | Decimal |
| utf8 | UTF-8 바이트 | UTF-8 bytes |
| utf16 | UTF-16 단위 {n}개 | {n} UTF-16 unit(s) |
| inspectPh | 문장을 입력하세요 (최대 40자) | Type a sentence (up to 40 characters) |
| typeSyllable / typeJamo / typeSpace / typeOther | 한글 음절 / 한글 자모 / 공백 / 다른 문자 | Hangul syllable / Hangul jamo / Space / Other |
| nfdNotice | 쪼개진 자모가 있어요. [고치기] 탭에서 붙일 수 있어요 | Some jamo are split. Join them in the Fix tab |
| tooLong | 앞의 40자까지만 보여 줘요 | Showing the first 40 characters only |
| sendToBuild | 눌러서 조립해 보기 | Tap to build it |
| foot | 입력한 글은 이 기기 밖으로 나가지 않아요 | Your text never leaves this device |
| formulaHint | 한글 음절 = 0xAC00 + (초성×21 + 중성)×28 + 종성 | Syllable = 0xAC00 + (initial×21 + vowel)×28 + final |

## localStorage (in try/catch, prefix `hul:`)

- `hul:tab`: `fix`, `build` or `inspect`
- `hul:build`: `"L,V,T"`, the last Build selection, checked against the ranges when read

Never store the Fix or Inspect text, because file names can be private.

## Edge cases

- **Already NFC:** show `fixNone` and keep the output equal to the input. Never flag an error.
- **Changed-character highlight:**
  - Walk the NFC output one character at a time.
  - For each output character, consume input code points until `consumed.normalize('NFC') === outChar`.
  - Highlight the character if `consumed.length > outChar.length`.
  - Cap the walk at 5,000 code points. Past that, skip the highlights and still show the result.
- **Huge paste:**
  - Accept the full text and normalize it, since that is fast.
  - Render at most 20,000 characters in the output box with a "…" notice, but always copy the full text.
- **Leftover jamo:** jamo that NFC cannot join (a lone ㄱ, or a typed compatibility jamo string ㅎㅏㄴ) are left as they are. If the input contains compatibility jamo (U+3131–318E) and nothing changed, show one hint line: "직접 친 ㅎㅏㄴ 같은 낱자는 맥 자소 분리와 달라서 붙지 않아요" / "Typed letters like ㅎㅏㄴ are not Mac-split text and won't join". Do not compose them with a custom IME, because that is out of scope.
- **Inspect iteration:**
  - Iterate with `for…of` (code points), so emoji and surrogate pairs become one card each.
  - ZWJ emoji sequences are allowed to split into several cards, each labeled Other.
  - Old Hangul jamo (U+1100 block beyond the modern ones, A960–A97F and so on) are labeled jamo with no composition.
  - If the input has NFD jamo, show `nfdNotice`.
- **Inspect length limit:** cap at 40 code points, slice the rest and show `tooLong`.
- **Clipboard:** use `navigator.clipboard.writeText`. Fall back to a hidden textarea with `execCommand('copy')`. On failure, show the toast `copyFail` and select the output text.
- **Resize:** chip strips keep the selected chip in view. Layout is CSS only, with no recompute beyond scrolling the selected chips back into view.
- **Blocked storage:** with localStorage blocked, defaults apply and everything still works.
- **Hidden page:** there are no loops, apart from short CSS animations.
- **Demo:** if `location.hash === '#demo'`, open the Build tab on 한, with "하루한판" prefilled in Inspect. This is for QA thumbnails. The thumbnail shows Build with the big 한 and the formula.

## Must not

- No network of any kind, no fonts and no external scripts. The target size is under 60 KB.
- No file system access, no renaming files and no promise that files get fixed. The tool works on text only, and it says so (`fixTip`).
- Do not store or log the pasted text.
- No custom normalization tables: use only the browser's `String.prototype.normalize`, plus the arithmetic formula above for Build and Inspect.
- No brand logos or trademark imagery. "macOS" or "맥" may appear only as a plain-text explanation. Do not imitate any OS's UI.
- No alert, confirm, prompt, window.open or navigation. No sound.
- Do not page-scroll. Only the internal panels scroll.
