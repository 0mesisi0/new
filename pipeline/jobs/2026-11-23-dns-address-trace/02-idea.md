# Idea and spec: DNS 주소 찾기 / How DNS Finds an Address

## Concepts scored

Scores are out of 5. Korean search and share scores are editorial estimates based on likely search terms and reasons to share. The research brief provides no measured demand for these concepts.

| Concept | Category | First 10 seconds | Originality | Korean search/share demand | One-HTML buildability | Total | Verdict |
|---|---|---:|---:|---:|---:|---:|---|
| **DNS 주소 찾기 / How DNS Finds an Address** | **tech** | **4** | **4** | **4** | **5** | **17** | **Picked.** The first tap shows who receives the browser’s question. A second lookup makes the effect of caching visible. Natural search terms include `DNS 뜻` and `DNS 작동 원리`. |
| 요거트 뚜껑 떼기 / Peel the Yogurt Lid | cool | 5 | 4 | 2 | 4 | 15 | Pull a foil tab and watch the crease follow your finger. The tactile interaction fits the research brief, while the result offers little reason to search for it. |
| 세계 시간 보드 / World Time Board | info | 4 | 2 | 4 | 5 | 15 | Slide a proposed meeting time and see the local hour in three cities. Useful for `시차 계산`, with an interaction common to world clocks. |

## Meta

slug `dns-address-trace`

- Category `tech`, kind `tool`, aspect `3/4`, date `2026-11-23`
- Tags — ko `DNS`, `DNS 작동 원리`, `도메인`, `캐시` / en `DNS`, `name resolution`, `domain names`, `cache`
- **Title ko** — DNS 주소 찾기
- **Title en** — How DNS Finds an Address
- **Desc ko** — 브라우저가 도메인 이름으로 IP 주소를 찾는 과정을 한 단계씩 따라가 보세요. 같은 이름을 다시 조회해 캐시가 있으면 무엇이 달라지는지 확인할 수 있어요.
- **Desc en** — Follow a DNS lookup from a domain name to an IP address, then try the same lookup again to see what the cache changes.
- **Howto ko** — ‘조회 시작’을 누르고 ‘다음 단계’로 요청을 따라가세요. 주소를 찾으면 ‘같은 이름 다시 조회’를 눌러 두 경로를 비교하세요.
- **Howto en** — Select “Start lookup” and follow the request with “Next step.” When the address arrives, select “Look up again” to compare the two routes.
- **About ko** — 예시 도메인과 IP 주소로 DNS 조회를 보여 주는 오프라인 시뮬레이션이에요. 리졸버가 조회 결과를 저장해 두는 캐시에 초점을 맞췄어요.
- **About en** — This offline simulation uses an example domain and IP address to show how a resolver looks up and caches a DNS answer.

## Pitch

The player sends an address request for `example.com` and follows it on a five-stop map. Each tap reveals who can answer the question or who can point the resolver toward the next server. After the answer arrives, one more tap repeats the lookup while the answer is still cached. The map then shows that the browser still asks the resolver, while the resolver can skip all three upstream queries.

The design expands the DNS explainer in `play/ideas.md`. The two-run comparison is the central design choice. It puts the payoff on one screen with a concrete count a reader can understand at a glance.

## Flow

1. **Ready.** Show the title, the example domain, a five-node map and **Start lookup**. Show the offline simulation label.
2. **First lookup.** Start lookup immediately reveals step 1. Each **Next step** activation advances one step. **Back** revisits the previous step and returns to Ready from step 1.
3. **Answer found.** Step 5 completes the first run and reveals `192.0.2.10`, the first-run count of three upstream queries and **Look up again**. Back revisits step 4.
4. **Compare.** Look up again shows the completed second route and the two query counts together. **Start over** returns to Ready and clears the simulated cache.

## Controls

- **Pointer and touch.** Use native buttons for all actions with targets at least 44 × 44 CSS px. The map is a diagram.
- **Keyboard.** Tab and Shift+Tab move between visible controls. Enter and Space activate the focused button. One activation advances at most one step. Holding a key never runs through multiple steps.
- **Focus and announcements.** Keep focus on the activated button when it persists. When an action removes that button, focus the destination heading with `tabindex="-1"`. Use one polite status region for step changes when focus stays on a button. Announce the step counter and caption once per change.
- **Language.** Use `?lang=ko` or `?lang=en`. For a missing or unsupported value, use Korean when the primary subtag of `navigator.language` is `ko`, and English otherwise. Set `<html lang>` and the document title before the first render.

## Screens

| Screen | Main content | Actions |
|---|---|---|
| Ready | Title, intro, model note, `example.com` and all five map nodes in their initial state | `start` |
| First lookup, steps 1–4 | Title, domain, step counter, map with the current exchange highlighted and one caption from the lookup table | `back`, `next` |
| Answer found, step 5 | Step counter, completed first route, answer panel with the illustrated IP, step 5 caption and first-run query count | `back`, `again` |
| Compare | Second route with only Browser and Resolver connected, illustrated IP, cache caption and side-by-side query counts | `restart` |

The title and domain remain in place across screens. The screen heading is `appTitle` on Ready, `step` during steps 1–4, `answer` at step 5 and `compare` on Compare. Keep the `simulation` label visible on every screen.

## Lookup model and screen copy

The model covers one A-record lookup. The first run starts with an empty resolver cache and treats each delegation as directly usable. The root refers the resolver to `.com`, `.com` refers it to the domain’s authoritative server, and the authoritative server returns the illustrated A record. Count only the queries the resolver sends upstream. The second run starts with the first answer still valid in the resolver cache. [DNS resolver algorithm in RFC 1034](https://www.rfc-editor.org/rfc/rfc1034.html) · [IANA root zone delegation](https://www.iana.org/domains/root)

Use `example.com` and `192.0.2.10` as fixed display values. Their pairing belongs to this simulation. [IANA example domains](https://www.iana.org/help/example-domains) · [RFC 5737 documentation addresses](https://www.rfc-editor.org/rfc/rfc5737.html)

| Step | Map and state | Korean caption | English caption |
|---|---|---|---|
| 1 | Browser → Resolver. Cache empty. Upstream count `0`. | 브라우저가 리졸버에 example.com의 IP 주소를 물어요. 리졸버의 캐시는 비어 있어요. | The browser asks the resolver for the IP address of example.com. The resolver’s cache is empty. |
| 2 | Resolver ↔ Root. Upstream count `1`. | 루트 서버가 리졸버에 .com을 담당하는 서버를 알려 줘요. | The root server points the resolver to the servers for .com. |
| 3 | Resolver ↔ `.com`. Upstream count `2`. | .com 서버가 리졸버에 example.com의 권한 서버를 알려 줘요. | The .com server points the resolver to the authoritative server for example.com. |
| 4 | Resolver ↔ Authoritative. Upstream count `3`. Show the IP value at the authoritative node. | example.com의 권한 서버가 예시 IPv4 주소 192.0.2.10을 응답해요. | The authoritative server for example.com returns the example IPv4 address 192.0.2.10. |
| 5 | Resolver → Browser. Upstream count `3`. Cache populated. Show the IP in the answer panel. | 리졸버가 주소를 캐시에 저장하고 브라우저에 돌려줘요. | The resolver caches the address and returns it to the browser. |
| Repeat | Browser ↔ Resolver. Upstream count `0`. Cache populated. Keep the IP in the answer panel. | 리졸버가 캐시에 저장된 주소를 바로 돌려줘요. 루트, .com, 권한 서버에 다시 물을 필요가 없어요. | The resolver returns the cached address right away. It can skip the root, .com, and authoritative servers. |

Each rendered state derives from the screen and step. Going Back from step 5 removes the cached answer from the modeled state until step 5 is reached again. There is no expiration timer. **Look up again** explicitly models another request within the answer’s TTL.

## Visual design

- Use a warm paper background `#F6F3EA`, dark ink `#172B38`, blue `#185D80` for active requests and green `#216346` for answers. Use directional arrows and thicker strokes to distinguish active connections independently of color.
- Use a two-tier map. Place Browser and Resolver on top and the three upstream servers below. Connect each upstream server directly to the Resolver so the drawing matches the query path. Render labels as HTML and draw connectors with inline SVG. Hide the visual diagram from assistive technology because the live caption describes each exchange.
- At 320 × 480, place the heading and domain at the top, then the map, caption and bottom controls. Use `100dvh` with a `100vh` fallback and a fluid grid. Keep the document fixed to the viewport. Allow the content panel to scroll internally at enlarged text sizes while the controls remain reachable.
- A brief arrow highlight confirms each step. Update text and state immediately. Use a static highlight under `prefers-reduced-motion`, and cancel any decorative transition when the document is hidden. Use a system font and render the domain and IP with a system monospace font.
- Use the Compare screen for thumbnail QA. Its map and two counts provide a legible summary at thumbnail size.

## Strings

Put the lookup captions and all strings below in the same `ko`/`en` dictionary. Metadata supplies the matching app title. Braces indicate runtime interpolation. The domain, IP and numerals are identical in both languages.

| Key | ko | en |
|---|---|---|
| `appTitle` | DNS 주소 찾기 | How DNS Finds an Address |
| `intro` | 브라우저는 도메인 이름으로 IP 주소를 어떻게 찾을까요? | How does your browser find an IP address from a domain name? |
| `modelNote` | 리졸버의 캐시가 비어 있을 때부터 시작해요. | Start with an empty resolver cache. |
| `simulation` | 오프라인 시뮬레이션 | Offline simulation |
| `domainLabel` | 예시 도메인 | Example domain |
| `browser` | 브라우저 | Browser |
| `resolver` | 리졸버 | Resolver |
| `root` | 루트 서버 | Root server |
| `tld` | .com 서버 | .com server |
| `authoritative` | 권한 서버 | Authoritative server |
| `start` | 조회 시작 | Start lookup |
| `step` | {n}/5단계 | Step {n} of 5 |
| `back` | 이전 | Back |
| `next` | 다음 단계 | Next step |
| `answer` | 주소를 찾았어요 | Address found |
| `ip` | 예시 IPv4 주소 | Example IPv4 address |
| `again` | 같은 이름 다시 조회 | Look up again |
| `compare` | 같은 이름, 더 짧은 경로 | Same name, shorter route |
| `firstCount` | 첫 조회 · 상위 DNS 서버에 {n}회 질의 | First lookup · {n} upstream DNS queries |
| `repeatCount` | 다시 조회 · 상위 DNS 서버에 {n}회 질의 | Repeat lookup · {n} upstream DNS queries |
| `restart` | 처음부터 | Start over |

## localStorage

No keys. The example answer, current step and synthetic cache live in memory. Reloading starts at Ready, and blocked storage has no effect.

## Edge cases

- Resizing or rotating preserves the current step and answer. Redraw connectors from the current node positions.
- Handle rapid activations through one event path per button. Advance once for each distinct activation, with no queued advancement from arrow effects.
- Hidden tabs retain their current screen. Returning to the page leaves the same step ready for input.
- Keep the comparison deterministic. Every complete run shows three upstream queries for the first lookup and zero for the repeat.
- `#demo` opens the deterministic Compare state for thumbnail QA. **Start over** follows the normal reset path and the demo state is applied only at initial load.
- Before publishing, run `npm test`, `npm run build` and `npm run qa -- --thumbs`. Check both languages at 320 × 480, confirm keyboard focus across the full flow, and inspect the generated thumbnail.

## Must not

- Keep all item behavior in one self-contained `index.html`, with `meta.json` beside it and a QA-generated thumbnail. No external assets, dependencies, analytics or network requests.
- No real DNS queries, configurable targets, hostname input, resolver configuration changes or navigation to the displayed domain.
- No suggestion that delegation replies contain the domain’s final IP, or that the browser directly queries the upstream servers in this model. Keep webpage loading, IPv6, aliases and DNSSEC outside this simulation.
- No copied interface, third-party branding, sound, autoplay, browser dialogs or pop-ups.