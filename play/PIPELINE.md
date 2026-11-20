# Daily pipeline: five roles

One new item a day, made by five agents in order. The orchestrator (the main Claude session) runs each role, passes the output on, and publishes.

| # | Role | Job | AI (if its key is configured) | Fallback |
|---|------|-----|-------------------------------|----------|
| 1 | 리서처 Researcher | Find what people are enjoying and searching for right now | **Gemini** with Google Search grounding (`node scripts/ai.mjs gemini-search`) | Claude agent (sonnet) with WebSearch |
| 2 | 기획자 Planner | Turn the research into 3 original concepts, pick one, write the spec | **ChatGPT** (`node scripts/ai.mjs openai`) for the brainstorm, Claude picks and writes the spec | Claude agent (sonnet) |
| 3 | 디자이너 Designer | Visual spec: palette, layout per screen, motion and feedback; optional cover art | **ChatGPT image** (`node scripts/ai.mjs openai-image`) for cover art, Claude for the spec | Claude agent (sonnet), no cover art |
| 4 | 개발자 Builder | Build `items/<slug>/index.html` + `meta.json` to the spec and ITEMS.md | **Claude** (main model) | — |
| 5 | 검토자 Reviewer | Run tests + QA, play it, read the code, list bugs and weak spots; loop with the builder until clean | **Claude** agent (sonnet) + **Gemini** second opinion on the code | Claude only |

`node scripts/ai.mjs status` prints which keys are available. Every role must still work when a key is missing.

## Inputs every role gets

- `ITEMS.md` (hard rules), the category list in `src/site.mjs`, and `ideas.md`.
- The list of existing items (slug, category, title) so nothing repeats.
- Vote results when available: `curl -s https://play.mesisi.net/api/votes?top=12` (likes vs dislikes per item). Make more of what is liked, less of what is disliked.

## 1. Researcher → `research brief`

Search the web for the last few weeks: viral browser games and toys, unusual websites people share, trending memes and YouTube Shorts topics in Korea and worldwide, seasonal events (holidays, exams, weather), and everyday tools people search for in Korean ("사다리타기", "N빵 계산기", "운세" ...). Output 8–12 short findings, each with: what it is, why it is popular, link, and which category it fits. Only describe things; never propose copying a specific product.

## 2. Planner → `spec`

From the brief, `ideas.md`, and vote results: propose 3 concepts across different categories (rotate categories so the site stays varied), score each 1–5 on fun/usefulness, originality, search demand, and buildability in one file; pick the best. Write the spec: title (ko/en), category, tags, aspect, one-paragraph pitch, core loop or main function, controls, screens (start / main / result), difficulty or content plan, all user-facing text in both languages, and what makes it shareable. Must be original: genre mechanics are fine; names, characters, art, music and levels of existing products are not.

## 3. Designer → `visual spec`

Palette (5–6 hex colors with roles), type scale, layout for each screen at 360×640 and 1024×700, what is drawn and how (canvas shapes, CSS, emoji, SVG), motion and feedback (what shakes, pops, flashes, particles), sound cues, and the thumbnail moment (what should be on screen 1–2 seconds after start). If OpenAI is available, generate a cover image only for the site card (`items/<slug>/cover.png`, used instead of the screenshot thumb only when it clearly looks better) — never for inside the item.

## 4. Builder

Build to the spec and ITEMS.md. Then `npm test`, `npm run qa -- --only <slug> --thumbs`. Look at the thumb.

## 5. Reviewer → `review`

Run the same checks independently, read the code, play it through (Playwright: start, play, lose/finish, retry, resize, switch language, mute), and check: does it match the spec, is it fun or useful in the first 10 seconds, is all text translated, is it readable on a phone, any bugs, any rule broken. Output a numbered list: blocking issues, then improvements. The builder fixes all blocking issues; repeat until the reviewer passes it (max 3 rounds).

## Publish

Add the idea to `ideas.md` as done, commit `play/items/<slug>/` (+ `ideas.md`), push, open a PR, merge, then deploy with `npm run deploy` (needs the Cloudflare credential). Verify `https://play.mesisi.net/ko/<slug>/` returns 200. Report in Korean: title, category, link, one line on what the reviewer caught.
