# Review 2026-11-25-world-time-planner

## Blocking

1. **The compact layout hides the selected times.** At 320×480 and 390×480, the grid hides its cell values and the height breakpoint also hides the selected-time summary. Users must scroll the cards to read every city’s time. Keep the summary visible whenever the grid suppresses its values. `index.html:95`, `index.html:325`, `index.html:352`
2. **The date picker selects the wrong local hour on daylight-saving transition days.** It uses the current wall-clock hour as a column index. With New York as home, opening March 14, 2027 from the live board at 15:00 selects 16:00. Resolve the selection from the formatted local hours, with explicit handling for skipped and repeated hours. `index.html:234`, `index.html:509`
3. **A midnight transition can start the grid on the previous date.** With São Paulo as home on November 4, 2018, the first column is 23:00 on November 3. Verify that the calculated start belongs to the requested local date and use the first valid instant of that date when midnight is skipped. `index.html:183`, `index.html:234`
4. **The city picker can intercept Korean IME input.** Its Enter and arrow handlers run during text composition. Enter can add the highlighted city while the user is confirming text. Ignore picker shortcuts while `e.isComposing` is true. `index.html:532`
5. **Browser time-zone aliases can select the wrong default home.** The app compares raw IANA identifiers, so a browser that reports `Asia/Calcutta` falls back to Seoul even though New Delhi is available as `Asia/Kolkata`. Compare normalized identifiers and keep the existing city IDs for saved settings. `index.html:158`, `index.html:215`

## Improvements

1. Clear `aria-activedescendant` when a search returns no matches. The combobox currently keeps pointing to an option removed from the DOM. `index.html:425`
2. Scope the single-letter shortcuts to the focused planner control or provide a way to disable them. With focus on a card menu button, pressing `C` still copies the schedule. `index.html:532`
3. Lighten the dots behind the awake-hour numerals. The darkest part of the pattern gives the small text about 2.9:1 contrast. Keep the pattern so the states remain distinguishable by more than color. `index.html:53`, `index.html:58`
4. Update the category example in `play/ITEMS.md` to match the site’s category list. The bilingual metadata matches the spec, and the site and validator both accept `info`. All 68 repository tests passed. Source inspection found Korean and English app strings, reduced-motion rules, and no network calls, native dialogs, `eval`, or user-input `innerHTML`. Browser inspection covered the English demo at both widths. Keyboard interaction, touch gestures, and clipboard behavior in the site iframe remain unverified in-browser.

## Verdict

CHANGES