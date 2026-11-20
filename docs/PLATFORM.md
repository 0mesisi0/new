# Multi-AI Creative Platform: analysis and change plan

Status: proposal, 2026-11-20. Nothing existing is removed or replaced. Every change below is additive.

## 1. Current state

The repository is `0mesisi0/new` (default branch `main`). It holds three areas.

| Area | What it is | Where it runs | State |
|---|---|---|---|
| `/` (calc site) | Korean pay calculators (6), guides (JSON per guide), static generator, tests | GitHub Pages → **https://calc.mesisi.net** (live, HTTPS) | Live. A Claude scheduled task adds one guide a day at 05:38 KST. |
| `play/` (Daily Toybox) | Item platform: home feed, category pages, item pages with iframe player, like/dislike voting (Cloudflare Pages Functions + D1), headless QA, five-role `PIPELINE.md` | Cloudflare Pages → `play.mesisi.net` | Built and tested locally, **not deployed**. The saved Cloudflare token is rejected as malformed. |
| `pipeline/` | Job contract: `schemas/job.schema.json`, `jobs/<id>/` with one file per stage | Git (shared by every agent) | New. The first job (`2026-11-20-year-end-receipt`) is running. |

### What each AI can actually do without paid API keys

| AI | Official, subscription-backed way in | Notes |
|---|---|---|
| Claude | Claude Code on the web and its scheduled tasks (this session) | Joins **through the repository only**: it reads and writes files and opens PRs. No Claude credential is relayed anywhere. |
| ChatGPT / Codex | (a) `@codex review` on a GitHub PR (Codex code review, included in Plus); (b) Codex CLI `codex exec "<prompt>" -o out.md` on the Windows PC, signed in with ChatGPT | Native Windows support for Codex CLI is listed as experimental in some guides; WSL is the fallback. |
| Gemini | (a) **Antigravity CLI `agy`** on the PC, signed in with Google AI Pro; (b) **Jules**: label a GitHub issue `jules` to start a task (Jules GitHub App) | **Gemini CLI's "Login with Google" (incl. AI Pro) was shut down on 2026-06-18.** Google points to Antigravity CLI. Check `agy --help` for its non-interactive flag before scripting. |

## 2. Requirements vs. what exists

✅ done, 🟡 partly done, ❌ missing.

| Requirement | State | Gap |
|---|---|---|
| Main feed | ✅ home: today's pick + rows per category | — |
| Category browsing | ✅ `/ko/c/<id>/` | Categories live in code (`src/site.mjs`) → move to data |
| Search | ❌ | Client-side search over `items.json` |
| Detail page + run the content | ✅ iframe player, fullscreen, share | — |
| Like / dislike | ✅ D1 `votes`, `voters` | — |
| Duplicate-vote prevention | ✅ one vote per hashed IP per item | Add a per-day action rate limit |
| Sort: popular / latest / recommended | 🟡 latest + "most liked" row | `/ko/all/` with three sort tabs; recommended = Wilson score × recency |
| User comments / improvement requests | ❌ | `feedback` table + form + moderation |
| Admin approval before publish | 🟡 tests gate the build | The PR **merge by the owner** becomes the approval; routines stop self-merging |
| Content versioning | 🟡 git history | `version` + `changelog` in `meta.json`, shown on the page |
| Views and reaction analytics | ❌ | `views` counter per item/day + stats endpoint |
| Categories without code changes | ❌ | `play/content/categories.json` |
| Pipeline states, retries, failure reasons | 🟡 schema + first job | Runner that enforces `maxAttempts` and writes `history[].error` |
| Block publish on failed tests | 🟡 local only | GitHub Action: test + QA must pass before deploy |
| Abuse prevention | 🟡 origin check, slug allowlist, one vote per IP | Rate limits, length limits, honeypot on the feedback form |

## 3. Reusable pieces (keep as they are)

- `play/build.mjs`: the generator (layout, cards, item page, sitemap, hreflang, AdSense switch)
- `play/lib/votes.mjs` + `functions/api/*`: the D1 access pattern, voter hashing and a tested API
- `play/scripts/qa.cjs`: the headless player, which already acts as the automated review gate
- `play/test/items.test.mjs`: static rules (single file, no network, no dialogs, ko/en)
- `play/ITEMS.md`: the build contract every builder (Claude, Codex, Jules) must follow
- The calc site generator, its guide JSON format and its tests: untouched

## 4. How the agents work together

GitHub is the shared desk. Every hand-off is a file in `pipeline/jobs/<id>/`, and every publish is a PR that the owner merges.

```
Windows PC (Task Scheduler)            GitHub (shared files + approval)           Claude (scheduled cloud session)
──────────────────────────             ────────────────────────────────           ───────────────────────────────
04:00 runner research  ── agy  ──▶  jobs/<id>/01-research.md  (queued→running)
04:20 runner idea      ── codex ─▶  jobs/<id>/02-idea.md      (status: queued, stage: design)
                                                  │
                                                  ▼
                                    05:38 Claude reads queued jobs ──▶ 03-design.md, builds play/items/<slug>/
                                                  │                    runs test + QA, opens PR, status: review
                                                  ▼
                                    PR comment "@codex review" ──▶ Codex review (P0/P1 findings)
                                    Claude fixes until CI green + no blocking findings ──▶ status: approved
                                                  │
                                    OWNER MERGES the PR (= admin approval)
                                                  ▼
                                    GitHub Action: test + QA ──▶ deploy to Cloudflare ──▶ status: published
Sunday 04:00 runner feedback ── agy + codex ─▶ reads /api/stats ─▶ jobs/<week>/06-feedback.md ─▶ play/ideas.md
```

- Jules (Gemini) gets **improvement tasks** as GitHub issues labelled `jules`, for example "make item X work better on small screens (votes: 12 👍 / 9 👎)". Its PRs pass through the same test, Codex review and owner-merge gate.
- If an agent is unavailable, Claude takes the stage (marked `by: "claude (fallback for …)"`), so a day is never lost.

### Google Drive handoff (manual subscription steps, available now)

Until the Windows runner exists, two Gemini and ChatGPT steps go through the owner's Google Drive. Claude reads and writes Drive through its connector.

| Folder (`My Drive/하루한판/…`) | Claude puts | Owner does | Claude then |
|---|---|---|---|
| `조사` | A weekly Gemini Deep Research question | Runs it in the Gemini app and exports the result to Docs in this folder | Reads it, checks the sources, and writes `01-research.md` |
| `표지이미지` | A cover prompt per item (`03-cover-prompt.md`) | Generates the image in the ChatGPT or Gemini app and uploads `<slug>.png` | Resizes it to 1200×900 and commits `play/items/<slug>/cover.png` in a PR |

Drive links and IDs are not stored in this public repository.

## 5. Stage contracts

Each stage reads the previous files, writes exactly one output file, and updates `job.json`.

| Stage | Owner | Reads | Writes | Must contain | Done when |
|---|---|---|---|---|---|
| research | Gemini (`agy`) | ideas.md, items list, vote stats | `01-research.md` | 8–12 findings with **source URL, date checked, confidence (high/med/low)**, seasonal hooks, 3 directions | ≥ 8 findings, every one with a URL |
| idea | Codex (`codex exec`) | 01, ideas.md, items list | `02-idea.md` | 3 concepts scored (value, originality, demand, difficulty), the chosen spec: meta, flow, controls, all ko/en strings, storage, must-nots | All sections present; slug is unused |
| design | Claude (+ `agy` second opinion) | 02 | `03-design.md` | Palette, type, layout at 360×640 and 1024×700, motion, accessibility notes (contrast, focus, reduced motion, 44 px targets) | Reviewed against ITEMS.md rule 12 |
| build | Claude | 02, 03, ITEMS.md | `play/items/<slug>/` | `index.html`, `meta.json`, `thumb.png` | `npm test` + `npm run qa -- --only <slug>` pass |
| review | Codex (`@codex review`) + QA | PR diff, 02, 03 | `05-review.md` | Blocking issues, improvements, security notes, spec checklist | No blocking issue, CI green |
| publish | Owner (merge) + Action | PR | deploy log | — | Live URL returns 200 |
| feedback | Gemini + Codex | `/api/stats`, comments | `06-feedback.md` | Top/bottom items, reasons, 5 next ideas, 3 improvement tasks | Ideas appended to `play/ideas.md` |

`job.json` status values are `queued`, `running`, `review`, `approved`, `failed` and `published`.

- `attempts` counts the tries at the current stage.
- After `maxAttempts` (default 3), the status becomes `failed`, and the last `history[].error` explains why.
- A failed job is left for the owner. It is never deleted.

## 6. Content model

**`play/content/categories.json`** (new, data only, so adding a category needs no code change):

```json
[{ "id": "quiz", "ko": "퀴즈·심리테스트", "en": "Quizzes", "desc": { "ko": "...", "en": "..." }, "order": 110 }]
```

**`play/items/<slug>/meta.json`** gains three fields, and existing fields keep their meaning:

```json
{ "version": 2, "changelog": [{ "version": 2, "date": "2026-12-01", "note": { "ko": "...", "en": "..." } }], "job": "2026-11-20-year-end-receipt" }
```

## 7. Database (Cloudflare D1)

These tables are added next to the existing `votes` and `voters` tables, which stay as they are.

```sql
CREATE TABLE views      (item TEXT NOT NULL, day TEXT NOT NULL, n INTEGER NOT NULL DEFAULT 0, PRIMARY KEY (item, day));
CREATE TABLE view_seen  (item TEXT NOT NULL, voter TEXT NOT NULL, day TEXT NOT NULL, PRIMARY KEY (item, voter, day)); -- dedupe, pruned after 2 days
CREATE TABLE feedback   (id INTEGER PRIMARY KEY AUTOINCREMENT, item TEXT NOT NULL, kind TEXT NOT NULL CHECK (kind IN ('comment','request','bug')),
                         body TEXT NOT NULL CHECK (length(body) BETWEEN 2 AND 500), lang TEXT NOT NULL, voter TEXT NOT NULL,
                         status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new','visible','done','hidden')), created_at TEXT NOT NULL);
CREATE TABLE rate       (voter TEXT NOT NULL, day TEXT NOT NULL, action TEXT NOT NULL, n INTEGER NOT NULL DEFAULT 0, PRIMARY KEY (voter, day, action));
```

The API keeps the current routes and adds new ones:

| Route | Purpose | Limits |
|---|---|---|
| `POST /api/view` | Counts one view per visitor, item and day | — |
| `POST /api/feedback` | Saves a comment, request or bug report with status `new` | 5 per visitor per day, a honeypot field, 2–500 characters |
| `GET /api/stats?days=30` | Returns aggregate likes, dislikes and views per item | No personal data |
| `/api/admin/*` | Lists and moderates feedback | Protected by **Cloudflare Access** (free, email login), so no password code |

All visitor ids remain salted one-way hashes. The salt is a Cloudflare secret.

## 8. Phased plan

| Phase | Work | Touches existing code? | Needs from the owner |
|---|---|---|---|
| **0 (today)** | This document, the job schema, the first job | No | — |
| **1** | Deploy play: create D1, apply the schema, make the Pages project, point `play.mesisi.net` at it. GitHub Action runs test + QA, then deploys on merge to `main`. Scheduled routines stop self-merging. | Adds a workflow; changes routine prompts only | A valid Cloudflare API token, saved again; the same token added as the repo secret `CLOUDFLARE_API_TOKEN` |
| **2** | Platform features: `categories.json`, search, `/all/` with latest/popular/recommended tabs, view counts, feedback form, version/changelog on item pages | Additive changes to `build.mjs`, `site.js`, new functions and tables | — |
| **3** | Windows runner `pipeline/runner/` (Node, no dependencies): `research` (agy), `idea` (codex exec), `feedback`; it reads and writes job files, retries up to 3 times, commits to a `pipeline/<id>` branch and pushes. Task Scheduler entries. | New folder only | Install Node LTS, Git, Codex CLI and Antigravity CLI on the PC; sign in once each; clone the repo |
| **4** | Codex code review on PRs; Jules issues for improvements; weekly feedback report; admin moderation page behind Cloudflare Access | Settings + new pages | Turn on Codex code review for the repo; install the Jules GitHub App for the repo; enable Cloudflare Access for `/api/admin/*` |

## 9. Rules this design keeps

- No paid API calls: the only external calls are the official CLIs and GitHub integrations, under their subscriptions.
- No credential leaves the tool it belongs to: no token export, no session sharing, no unofficial login paths. Claude takes part only through repository files and its own official scheduled tasks.
- AI output is never published without the owner's merge.
- Any failing test or QA run blocks the deploy.
- Items run no external code: they are one self-contained file with no network, shown inside an iframe.
- Sources are cited with URL and date in every research file. Items must be original, per ITEMS.md rule 1.
- Personal data: only salted hashes of IPs are stored; the privacy page says so.
- Votes are rate-limited and deduplicated; feedback is length-limited and moderated.
- Each item has its own folder and git history, plus a `version` field in its metadata.
