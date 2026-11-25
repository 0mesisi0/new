# Idea and spec: 캐럴 오르골 돌리기 / Crank-a-Carol Music Box

## Concepts scored

Scores are 1–5 for: value in the first 10 seconds, originality, Korean search/share demand, and buildability in one HTML file. Maximum 20.

| Concept | Category | Score | Verdict |
|---|---|---|---|
| Icicle Alley: walk under the eaves and dodge falling icicles (고드름 피하기) | games | 4/3/3/5 = 15 | Solid, but it is a plain dodge game and the site already has many winter games |
| Year-end tax "missed deductions" checklist (연말정산 놓친 공제 체크리스트) | tools | 3/2/5/3 = 13 | Strong search demand, but research row 11 is low confidence and every figure would need checking against 국세청 first. Save it for December |
| **Crank-a-Carol Music Box** | **radio** | **5/4/4/4 = 17** | **Picked.** You get sound from the first drag. It is a hands-on "touch substitute" toy (research rows 5 and 6) with a Christmas hook (row 9), and a composed melody can be shared as a code |

Subject check: the subject is a music box playing carols. None of the existing or queued items is about music boxes or carol music. The Christmas items are about cake, gifts, lights, cards and treasure hunts. The radio items are about firewood and fish-cake stalls.

## Meta

- slug `crank-carol-music-box`, category `radio`, kind `tool`, aspect `9/16`, date `2026-11-25`
- tags: ko `오르골`, `캐럴`, `크리스마스`; en `music box`, `carol`, `christmas`
- title: ko `캐럴 오르골 돌리기`; en `Crank-a-Carol Music Box`
- desc ko: 손잡이를 빙글빙글 돌리면 오르골에서 캐럴이 흘러나와요. 빨리 돌리면 신나게, 천천히 돌리면 잔잔하게. 종이 띠에 구멍을 뚫어 나만의 멜로디도 만들어 보세요.
- desc en: Turn the crank and a tiny music box plays a carol. Turn it fast for a jolly tune or slowly for a sleepy one, then punch your own melody into a paper strip.
- howto ko: 오른쪽 손잡이를 시계 방향으로 돌리세요(스페이스·→ 꾹 누르기도 돼요). 위쪽 칩으로 곡을 고르고(숫자키 1~5), '내 곡 만들기'에서 칸을 눌러 구멍을 뚫으면 그 멜로디가 연주돼요. '코드 복사'로 친구에게 보내고, 받은 코드는 붙여 넣어 불러오세요.
- howto en: Turn the crank on the right clockwise (or hold Space / →). Pick a song with the chips at the top (keys 1-5). In "Make my tune", tap cells to punch holes and the box plays them. Use "Copy code" to send it to a friend, and paste a friend's code to load theirs.
- about ko: 수록곡은 모두 저작권이 끝난 전래·고전 캐럴이에요. 소리는 녹음 없이 브라우저가 즉석에서 합성해요. 진짜 오르골처럼 거꾸로 돌리면 소리가 나지 않아요.
- about en: Every built-in song is a public-domain traditional carol. Nothing is recorded: the browser synthesizes each note live. Like a real music box, turning it backwards makes no sound.

## Pitch

A small wooden music box sits on a snowy windowsill at night. Inside, a brass cylinder studded with pins turns against a steel comb.

1. The user grabs the crank and turns it. The cylinder rolls and each pin plucks a tine: *ting*.
2. The cranking speed is the tempo. Fast cranking sounds jolly, slow cranking sounds like a lullaby, and stopping lets the flywheel coast to a halt.
3. A tiny 🎄 on the lid spins with the crank. Plucked tines wobble and little ♪ float up.
4. In "Make my tune", the cylinder is replaced by a punched paper strip (15 notes × 32 steps). Tap cells to punch holes, crank to hear the tune, and copy a short code to share it.

## Flow

1. **START**
   - Shows the box drawing, the title, a one-line subtitle and a big "오르골 열기" button.
   - Tapping the button creates and resumes the AudioContext (the first user gesture), then goes to PLAY.
   - Enter also starts.
2. **PLAY** (default song: Silent Night, or the last song used)
   - Top: song chips [1 고요한 밤] [2 징글벨] [3 메리 크리스마스] [4 반짝반짝 작은 별] [5 내 곡], plus a mute toggle.
   - Middle: the box view, with the cylinder and comb on the left and the crank on the right.
   - Bottom: a song progress bar, a "돌린 바퀴 N" counter and an [자동 ▶] toggle.
   - Changing the song resets the cylinder position to 0 and keeps the turn counter.
   - The song loops. A 2-step gap of silence comes between loops.
   - Each time the song wraps, it adds a small snow burst over the box (skip this under reduced motion).
3. **COMPOSE** (reached from the "내 곡 만들기" chip or button)
   - The cylinder area becomes a paper strip grid: 15 rows (tines, high at top) × 32 columns (steps).
   - The strip shows 8 columns at a time and scrolls with the crank. The column under the comb is the playhead.
   - Buttons: [지우기] [코드 복사] [코드 불러오기] [완료].
   - "코드 불러오기" opens an inline text field with a [불러오기] button. It is an in-page panel, never `prompt`.
   - The crank stays visible and works the same, so the user can punch a hole and crank right away.
   - "완료" returns to PLAY with chip 5 (내 곡) selected.
   - An empty strip shows the hint "칸을 눌러 구멍을 뚫어 보세요".

## Controls

- **Crank (pointer):**
  - On pointerdown inside the crank hit circle (radius = max(44 px, crank radius + 16 px)), call `setPointerCapture`.
  - Angle θ = atan2 of the pointer relative to the hub. Each move: Δ = wrap(θ − θprev) to (−π, π], then clamp to ±π/2.
  - Only clockwise Δ (positive in screen coordinates) advances the cylinder: steps += Δ / (2π) × 8, so one full turn is 8 steps (one 4/4 bar of eighths).
  - Counter-clockwise Δ does nothing except a soft ratchet click every π/4.
  - Only the first pointer counts. Further pointers are ignored until it is released.
- **Flywheel:**
  - Velocity v (steps/s) is smoothed from the drag: v = lerp(v, instantaneous, 0.3).
  - After release, v decays as v ×= exp(−2.5·dt) and stops below 0.3 steps/s.
  - v is capped at 40 steps/s.
- **Auto:** the [자동 ▶] toggle cranks at a steady 4.8 steps/s (0.6 turns/s). Tapping it again or grabbing the crank stops auto.
- **Keys (everywhere):**
  - Holding Space or ArrowRight cranks at 4.8 steps/s.
  - ArrowUp/ArrowDown change the auto/hold speed in 0.6 steps/s steps, within 1.2–16 steps/s. A toast shows "빠르기 ×1.25" and so on.
  - A toggles auto. M mutes. Keys 1–5 pick a song. C opens compose. Esc leaves compose or closes the code panel.
  - `preventDefault` on all of these keys.
- **Keys in COMPOSE:**
  - Arrow keys move a visible cell cursor. ArrowLeft/ArrowRight scroll the strip when the cursor reaches the edge.
  - Enter toggles the hole under the cursor. Space still cranks. Delete or Backspace clears the cell under the cursor.
  - While the code text field has focus, all of these shortcuts are disabled.
- **Grid (pointer):**
  - Tapping a cell toggles it.
  - Drag-painting: the first cell's new state is applied to every cell the drag passes over.
  - Each cell is at least 44 px tall. If 15 rows do not fit, the strip scrolls vertically inside its own panel.
- **Touch:** the box and crank area has `touch-action:none`. The grid panel has `touch-action:none` while painting and `pan-y` only when it overflows vertically.

## Songs (public domain only)

Notation: note names with a duration in eighth-note steps. **Everything sounds one octave higher than written**, which is the music-box register. Onset = the running sum of the previous durations. Song length = the total of all durations plus a 2-step gap.

| # | ko title | en title | source |
|---|---|---|---|
| 1 | 고요한 밤 거룩한 밤 | Silent Night | Gruber, 1818 |
| 2 | 징글벨 (후렴) | Jingle Bells (chorus) | Pierpont, 1857 |
| 3 | 메리 크리스마스 (We Wish You) | We Wish You a Merry Christmas | English traditional |
| 4 | 반짝반짝 작은 별 | Twinkle, Twinkle, Little Star | French folk tune, 18th century |

1. **Silent Night (6/8):**
   G4 3, A4 1, G4 2, E4 6 · G4 3, A4 1, G4 2, E4 6 · D5 4, D5 2, B4 6 · C5 4, C5 2, G4 6 · A4 4, A4 2, C5 3, B4 1, A4 2 · G4 3, A4 1, G4 2, E4 6 · A4 4, A4 2, C5 3, B4 1, A4 2 · G4 3, A4 1, G4 2, E4 6 · D5 4, D5 2, F5 3, D5 1, B4 2 · C5 6, E5 6 · C5 3, G4 1, E4 2, G4 3, F4 1, D4 2 · C4 12
2. **Jingle Bells chorus (4/4):**
   E4 2, E4 2, E4 4 · E4 2, E4 2, E4 4 · E4 2, G4 2, C4 3, D4 1 · E4 8 · F4 2, F4 2, F4 3, F4 1 · F4 2, E4 2, E4 2, E4 1, E4 1 · E4 2, D4 2, D4 2, E4 2 · D4 4, G4 4 · E4 2, E4 2, E4 4 · E4 2, E4 2, E4 4 · E4 2, G4 2, C4 3, D4 1 · E4 8 · F4 2, F4 2, F4 3, F4 1 · F4 2, E4 2, E4 2, E4 1, E4 1 · G4 2, G4 2, F4 2, D4 2 · C4 8
3. **We Wish You (3/4, with a pickup):**
   G4 2 · C5 2, C5 1, D5 1, C5 1, B4 1 · A4 2, A4 2, A4 2 · D5 2, D5 1, E5 1, D5 1, C5 1 · B4 2, G4 2, G4 2 · E5 2, E5 1, F5 1, E5 1, D5 1 · C5 2, A4 2, G4 1, G4 1 · A4 2, D5 2, B4 2 · C5 4
4. **Twinkle (4/4, every note 2 steps unless marked 4):**
   C4 C4 G4 G4 A4 A4 G4(4) · F4 F4 E4 E4 D4 D4 C4(4) · G4 G4 F4 F4 E4 E4 D4(4) · G4 G4 F4 F4 E4 E4 D4(4) · C4 C4 G4 G4 A4 A4 G4(4) · F4 F4 E4 E4 D4 D4 C4(4)
5. **내 곡 / My tune:** the 32-step compose strip, where every hole is a note at its column. Length = 32 steps with no extra gap, so it loops as a clean bar cycle.

The built-in pin cylinders are generated from these lists at load. They are not editable. To edit, the user starts from an empty strip, or presses "이 곡으로 시작" in COMPOSE, which copies the first 32 steps of the current song into the strip (onsets only, notes outside the 15 tines dropped).

## Tines and pitch

- There are 15 tines, as diatonic C major.
- Written C4 D4 E4 F4 G4 A4 B4 C5 D5 E5 F5 G5 A5 B5 C6 map to tines 0–14.
- Sounding frequency = 440 × 2^((midi − 69 + 12) / 12), so written C4 sounds at C5 = 523.25 Hz and C6 sounds at 2093 Hz.
- The grid row labels show solfège (도 레 미 파 솔 라 시) with an octave dot. In English the labels are C D E F G A B.

## Sound (Web Audio, core feature)

- Create the AudioContext on the START button. On every later pointerdown, call `resume()` if it is suspended (iOS).
- Each pluck is a voice:
  - sine at f, gain 1
  - sine at 3.0·f, gain 0.18 (shimmer), cut at 12 kHz
  - a 4 ms noise click at gain 0.05 through a highpass at 3 kHz
  - envelope: attack 2 ms, then exponential decay to 0.0001 over T = 1.6 s × (523/f)^0.35 (higher notes ring shorter)
  - master gain 0.22 through a DynamicsCompressor
- When n notes start on the same step, each note's gain is multiplied by 1/√n.
- Polyphony is capped at 24 voices. A new voice beyond the cap stops the oldest one with a 10 ms fade.
- Ratchet click (backward crank): an 8 ms noise burst at gain 0.03 through a bandpass at 1.2 kHz.
- When the playhead crosses several steps in one frame (fast crank), play every crossed step in order, all at the current audio time + 0, still under the voice cap.
- The mute toggle (🔊/🔇) sets master gain to 0. It is persisted.
- Sound is on by default after START. It only ever plays from the user's own cranking or their auto toggle. Never autoplay.

## Screens and visual design

- **Palette:**
  - night window: a gradient from #14203a to #24365c, with snow particles in white at 60% alpha
  - box: walnut #6b3f24 and #8a5432 with a light wood rim #c08a5a
  - brass cylinder #d9a441 with a highlight #f3d488, pins #fff3c4
  - comb steel #c9d1dc
  - paper strip #fbf6e9 with hole ink #2a2320
  - accent red #d8443a and pine green #2f7d5b
- **START:**
  - the box drawn in canvas with the lid open and 🎄 on it, the title at 28 px bold and the subtitle
  - a red primary button at least 56 px tall and a footnote "저작권이 끝난 캐럴만 들어 있어요"
  - snow falls behind everything
- **PLAY:**
  - Song chips scroll horizontally in their own row if they do not fit at 320 px. The active chip is filled red.
  - The box fills about 60% of the height:
    - The cylinder is a horizontal band whose pins scroll leftward toward the comb line as the steps advance. It shows 8 steps ahead.
    - The comb is 15 vertical tines on the comb line. A plucked tine bends 3 px and springs back over 250 ms.
    - A floating ♪ rises from the tine in a color picked from a 7-color hue ring by note letter.
  - The crank is a brass arm with a round wooden knob on the right side of the box. It rotates exactly with the cranking angle and shows motion blur ghosts when v > 20.
  - The 🎄 on the lid rotates with the cylinder.
  - Bottom: the progress bar, "돌린 바퀴 N", the [자동 ▶] toggle and the [내 곡 만들기] button.
- **COMPOSE:**
  - The paper strip has a perforated edge and 15 rows. Rows alternate in a very light tint, and every 8th column has a thicker line.
  - A punched hole is a dark rounded rectangle. The playhead column is highlighted in a soft yellow.
  - The buttons sit in a bar below the strip and wrap to two rows at 320 px.
- **Wide screens:** a centered column at most 520 px wide. The snow covers the whole window.
- **prefers-reduced-motion:**
  - 20 slow snow particles, no tine wobble, no motion ghosts and no snow burst
  - ♪ fade in place without rising
  - sound unchanged
- **Canvas:** DPR capped at 2. Recompute the layout on `resize`. Use `requestAnimationFrame` with dt capped at 50 ms.
- **Hidden page:** when `document.hidden`, stop auto and the flywheel (v = 0) and suspend the AudioContext. Resume the context on the next gesture.

## Share code

- **Format:** `MB1-` followed by 96 base-32 characters (0–9, a–v). The code covers 32 steps × 15 bits, 3 characters per step, with bit r = tine r.
- **Copy:** use `navigator.clipboard.writeText`, falling back to a hidden textarea and `execCommand('copy')`. Show the toast "코드를 복사했어요" or "복사하지 못했어요".
- **Copy text:**
  - ko: `🎵 내가 만든 오르골 멜로디예요! 하루한판 '캐럴 오르골 돌리기'에서 불러와 보세요: MB1-... play.mesisi.net`
  - en: `🎵 I made a music box tune! Load it in Daily Toybox "Crank-a-Carol Music Box": MB1-... play.mesisi.net`
- **Load:**
  - Trim the pasted text and find the first match of `/MB1-[0-9a-v]{96}/i` anywhere in it, so pasting the whole share message works.
  - If there is no match, show "코드가 올바르지 않아요" and change nothing.
  - On success, replace the strip, save it, show "불러왔어요" and switch to the 내 곡 chip.
- Never put the code in the URL and never navigate.

## Strings

| key | ko | en |
|---|---|---|
| appTitle | 캐럴 오르골 돌리기 | Crank-a-Carol Music Box |
| startSub | 손잡이를 돌리면 캐럴이 흘러나와요 | Turn the crank and a carol comes out |
| startBtn | 오르골 열기 | Open the music box |
| startFoot | 저작권이 끝난 캐럴만 들어 있어요 | Only public-domain carols inside |
| song1 | 고요한 밤 | Silent Night |
| song2 | 징글벨 | Jingle Bells |
| song3 | 메리 크리스마스 | We Wish You |
| song4 | 반짝반짝 작은 별 | Twinkle Twinkle |
| song5 | 내 곡 | My tune |
| crankHint | 손잡이를 시계 방향으로 돌려 보세요 | Turn the crank clockwise |
| keyHint | 스페이스를 꾹 눌러도 돌아가요 | Or hold Space |
| backwardHint | 거꾸로 돌리면 소리가 안 나요 | Turning backwards makes no sound |
| turns | 돌린 바퀴 {n} | Turns: {n} |
| auto / autoOn | 자동 ▶ / 자동 ■ | Auto ▶ / Auto ■ |
| speed | 빠르기 ×{x} | Speed ×{x} |
| compose | 내 곡 만들기 | Make my tune |
| composeHint | 칸을 눌러 구멍을 뚫어 보세요 | Tap cells to punch holes |
| fromSong | 이 곡으로 시작 | Start from this song |
| clear | 지우기 | Clear |
| clearUndo | 지웠어요 · 되돌리기 | Cleared · Undo |
| copyCode | 코드 복사 | Copy code |
| loadCode | 코드 불러오기 | Load code |
| loadPh | 친구에게 받은 코드를 붙여 넣으세요 | Paste a code from a friend |
| loadBtn | 불러오기 | Load |
| done | 완료 | Done |
| copied / copyFail | 코드를 복사했어요 / 복사하지 못했어요 | Code copied / Could not copy |
| loaded / badCode | 불러왔어요 / 코드가 올바르지 않아요 | Loaded / That code doesn't look right |
| emptyTune | 아직 구멍이 없어요. '내 곡 만들기'에서 뚫어 주세요 | No holes yet. Punch some in "Make my tune" |
| soundOn / soundOff | 소리 켜기 / 소리 끄기 | Sound on / Sound off |
| loopCheer | 한 곡 완주! | One full song! |
| noteNames | 도 레 미 파 솔 라 시 | C D E F G A B |

- "지우기" clears immediately and shows the clearUndo toast for 4 s. Tapping the toast restores the strip. There is no confirm dialog.

## localStorage (in try/catch, prefix `cmb:`)

- `cmb:mute`: "1" or "0", default "0"
- `cmb:song`: the last song index, 1–5
- `cmb:strip`: the compose strip as its `MB1-` code
- `cmb:turns`: the lifetime turn counter (integer)
- `cmb:speed`: the auto/hold speed in steps/s

## Edge cases

- **Blocked storage:** when localStorage is blocked, everything works and the defaults are used every visit.
- **Empty tune:** picking chip 5 with an empty strip shows the emptyTune hint on the cylinder. Cranking still turns the box and plays only ratchet-free silence.
- **Song change mid-coast:** keep v, reset the position to 0 and clear any queued tine animations.
- **Resize:** redraw from state (position, v, strip) and never reset the position. Keep the crank hit circle in sync with the new layout.
- **Lost pointer:** on pointercancel or lostpointercapture, treat it as a release so the flywheel coasts.
- **Key held during compose text entry:** ignore it while the text field has focus.
- **Speed bounds:** a very fast drag is clamped by the 40 steps/s cap and the ±π/2 per-event clamp, so a jumpy touch cannot fire hundreds of notes.
- **Odd-length songs:** a song whose length is not a multiple of 8 still loops by steps, and the crank angle never needs to line up with the song start.
- **Turn counter:** counts only forward full turns, as floor(total forward steps / 8). Save it at most once per second and on `pagehide`.
- **Language:** use `?lang=ko|en`, falling back to `navigator.language`. `<html lang>` must match. Song titles switch with the language.
- **Demo:** if `location.hash === '#demo'`, skip START, select Silent Night, set the position to 21 steps with 3 ♪ mid-air and 2 tines mid-wobble, and freeze. No AudioContext, no sound. This is for QA thumbnails only.

## Must not

- No copyrighted songs or lyrics. Do not use Rudolph, Santa Claus Is Coming to Town (울면 안 돼), White Christmas, Last Christmas, All I Want for Christmas, or any modern K-carol. Show song titles only and never display lyrics (Korean translated lyrics can be copyrighted too).
- No recorded audio files, no samples, no network of any kind, no external fonts. Stay under 120 KB.
- Do not copy the look of any real music-box brand, or of any ballerina or character figurine. Use the original wooden box and 🎄 only.
- No religious messaging beyond the plain song titles. No trademarks and no real people.
- No alert, confirm, prompt, window.open or navigation. No `location.hash` writes except reading `#demo`.
- No sound before the first user gesture, and no sound that the user did not cause by cranking or turning on auto.
- Never block the page from scrolling outside the item, and never scroll the item page itself. Only the grid panel scrolls internally.
