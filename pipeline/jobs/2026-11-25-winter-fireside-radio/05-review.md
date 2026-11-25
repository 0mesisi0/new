# Review 2026-11-25-winter-fireside-radio

## Blocking

1. **The mixer clips controls at 320 px.** In the Korean 320 × 480 browser preview, the right-hand percentages start at x=322 and the sliders extend to x=352. The preset strip also starts below the visible mixer area and requires horizontal scrolling at all three widths checked. Make the grid tracks shrink, let labels wrap, and wrap the presets into rows as specified. (`index.html:19–32`)
2. **Tapping the stove can toggle the kettle.** At 320 × 480, the kettle zone extends to logical y=240, while the visible stove starts at y=209. Tapping the stove’s top rim therefore toggles the kettle. The same boundaries route the bottom of the clock housing to the kettle. Align the hit zones with the artwork and keep each target at least 44 CSS px. (`index.html:446–457`, `index.html:539–542`, `index.html:578–582`)
3. **The documented Space shortcut depends on focus.** After a user toggles a sound button, Space toggles that sound again. With a range input focused, the handler skips Space and the other letter and number shortcuts. Keep native button activation and range-arrow behavior, and make the shortcut behavior and bilingual instructions agree. (`index.html:415–433`, `meta.json:11`, `meta.json:18`)
4. **The viewport disables pinch zoom where the browser honors those settings.** This makes the 12 px labels harder to read on phones. Remove `maximum-scale=1` and `user-scalable=no`, then check that controls remain reachable when zoomed. (`index.html:5`, `index.html:25`)
5. **A failed audio start can leave the UI playing silently.** `begin()` changes state before checking `ctx.resume()`, and the recovery button appears only after a visibility change. A rejected or still-interrupted resume can leave the timer counting while the page stays silent. Use the existing recovery check after initial start and manual resume, and return focus when the recovery button disappears. (`index.html:357–362`, `index.html:372–399`)

## Improvements

1. Restore the saved timer choice as the highlighted option when the sheet opens, while keeping the countdown off. The stored value is read, but the sheet highlights Off whenever the countdown is inactive. (`index.html:178–179`, `index.html:326–332`)
2. Match the specified audio envelopes. The sleep fade suspends the context while an exponential gain tail remains, and kettle bubbles stop at 50 ms even when the pitch glide is scheduled for 60 ms. Schedule the fade to reach zero before suspension and let each bubble finish its glide. (`index.html:234–238`, `index.html:379–388`)
3. Reduce the remaining rapid motion in reduced-motion mode. Sleet streaks still travel at full speed, and the preference is read only once when the page loads. Slow the streaks and respond to preference changes. (`index.html:164`, `index.html:516–520`)
4. Add interaction coverage for the mobile mixer, audio recovery, and sleep timer. All 58 repository tests passed. Browser previews covered both languages at 320, 360, and 390 px. Live audio, physical touch, and keyboard interactions were reviewed from source. Both locale dictionaries have the same 35 keys, the checked text and focus colors met contrast thresholds, and the source contains no network calls, browser dialogs, `eval`, or `innerHTML`. (`index.html:11`, `index.html:131–150`)

## Verdict

CHANGES