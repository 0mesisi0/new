# Review 2026-11-21-bungeoppang-budget

## Blocking

1. `play/items/bungeoppang-budget/index.html:156`: Plain-digit inputs such as `03000` are rejected despite the specification accepting plain digits. Accept leading zeros, then apply the existing range and step validation; normalize on commit.
2. `pipeline/jobs/2026-11-21-bungeoppang-budget/02-idea.md:161`: The reference case contradicts the prescribed `left` ascending order. For `1500 / 1000 / 1500`, the implementation correctly follows that order and returns `(0,1)` first, while acceptance requires `(1,0)`. Reconcile the reference case and ranking requirement.

## Improvements

1. Complete browser verification at 320–390 px widths in both languages, including keyboard, touch, focus, reduced motion, clipboard fallback and PNG output. Playwright could not launch because the read-only sandbox denied temporary-directory creation; rendered behavior remains unverified.
2. `play/items/bungeoppang-budget/index.html:376`: Guard asynchronous clipboard callbacks against leaving RESULT. A delayed success can focus a hidden copy button; failure can open the fallback inside a hidden screen.
3. Retain the passing checks: the item’s repository static test, JavaScript syntax, translation-key parity, text contrast and nonconflicting reference calculations passed. Source inspection found no network calls, dialogs, `eval`, or raw user-input interpolation into `innerHTML`.

## Verdict

CHANGES