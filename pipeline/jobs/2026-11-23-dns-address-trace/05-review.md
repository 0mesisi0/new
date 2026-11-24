# Review 2026-11-23-dns-address-trace

## Blocking

1. **The comparison counts are clipped at the required mobile size.** At 320 × 480, both counts sit below the visible content panel in Korean and English. At 390 × 480, the cards still require scrolling while **Start over** is already visible. Reduce the Compare map height and spacing on short viewports so the address and both query counts fit at default text size. [index.html:21](/C:/work/haruhanpan/play/items/dns-address-trace/index.html:21)
2. **The Ready map connectors have insufficient contrast.** The dashed lines that show which servers connect directly to the resolver have about 2.05:1 contrast against the paper background. Darken them to at least 3:1 and keep the dashed pattern to distinguish them from active routes. [index.html:143](/C:/work/haruhanpan/play/items/dns-address-trace/index.html:143)

## Improvements

1. **Play the arrow highlight only when the lookup state changes.** Resizing rebuilds the active SVG group and restarts its animation. Returning to a hidden tab can also replay the highlight on the same step. Keep the highlight static during resize and tab restoration. [index.html:146](/C:/work/haruhanpan/play/items/dns-address-trace/index.html:146)
2. **Add a targeted mobile and input check to QA.** All 30 repository tests passed, and the existing Korean thumbnail shows the intended comparison. Source review found bilingual app and metadata copy, 48 px minimum button dimensions, focus handling, reduced-motion styling, and no network calls, dialogs, `eval`, or user input passed to `innerHTML`. Browser input approvals were unavailable, so live keyboard and touch verification remains open. The English layout check used a browser fixture with `en-US` as its language.

## Verdict

CHANGES