#!/usr/bin/env node
// Windows-friendly pipeline runner for the owner's PC. No dependencies; Node 20+.
// It calls the AI CLIs that are already signed in on this PC (Codex CLI with a ChatGPT login,
// Claude Code CLI with a Claude login), passes each one a short instruction that points
// at a brief file, saves the result as the next stage file, and pushes it to the `pipeline-inbox`
// branch. Claude (cloud) picks the files up from there. No API keys, no shared credentials.
//
//   node pipeline/runner/run.mjs doctor              check git, node and each CLI
//   node pipeline/runner/run.mjs daily               research (claude) -> idea (codex) for a new job
//   node pipeline/runner/run.mjs research [--job id] one stage only
//   node pipeline/runner/run.mjs idea --job id
//   node pipeline/runner/run.mjs review --job id     codex reviews the built item against the spec
//   node pipeline/runner/run.mjs feedback            weekly vote analysis and next ideas (codex)
//   node pipeline/runner/run.mjs status              list jobs
// Flags: --no-push (local only), --dry-run (write briefs, do not call agents), --config path
import { spawn, spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, readdirSync, renameSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, '..', '..');
const JOBS = join(REPO, 'pipeline', 'jobs');
const args = process.argv.slice(2);
const cmd = args[0] || 'status';
const flag = (name) => args.includes(`--${name}`);
const opt = (name) => (args.includes(`--${name}`) ? args[args.indexOf(`--${name}`) + 1] : null);
const configPath = opt('config') || join(HERE, existsSync(join(HERE, 'config.local.json')) ? 'config.local.json' : 'config.json');
const CONFIG = JSON.parse(readFileSync(configPath, 'utf8'));
const today = () => new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10);
const now = () => new Date().toISOString();
const rel = (p) => relative(REPO, p).split('\\').join('/');

function log(...m) { console.log(`[runner ${new Date().toLocaleTimeString()}]`, ...m); }

function git(...a) {
  const r = spawnSync('git', a, { cwd: REPO, encoding: 'utf8' });
  if (r.status !== 0) throw new Error(`git ${a.join(' ')} failed: ${(r.stderr || r.stdout).trim()}`);
  return r.stdout.trim();
}

// ---------- jobs ----------
function loadJob(id) { return JSON.parse(readFileSync(join(JOBS, id, 'job.json'), 'utf8')); }
function saveJob(job) { writeFileSync(join(JOBS, job.id, 'job.json'), JSON.stringify(job, null, 2) + '\n'); }
function listJobs() {
  if (!existsSync(JOBS)) return [];
  return readdirSync(JOBS).filter((d) => existsSync(join(JOBS, d, 'job.json'))).sort().map(loadJob);
}
function newJob() {
  let id = `${today()}-pending`;
  for (let i = 2; existsSync(join(JOBS, id)); i++) id = `${today()}-pending-${i}`;
  mkdirSync(join(JOBS, id), { recursive: true });
  const job = { id, site: 'play', slug: null, status: 'queued', stage: 'research', attempts: 0, maxAttempts: CONFIG.maxAttempts || 3, owner: 'claude', pr: null, artifacts: {}, history: [] };
  saveJob(job);
  return job;
}
function record(job, stage, status, by, extra = {}) {
  job.history.push({ at: now(), stage, status, by, ...extra });
  saveJob(job);
}

// ---------- context for briefs ----------
function itemsList() {
  const dir = join(REPO, 'play', 'items');
  if (!existsSync(dir)) return [];
  return readdirSync(dir).filter((d) => existsSync(join(dir, d, 'meta.json'))).map((d) => {
    const m = JSON.parse(readFileSync(join(dir, d, 'meta.json'), 'utf8'));
    return `- ${m.slug} (${m.category}, ${m.date}): ${m.ko.title} / ${m.en.title}`;
  });
}
async function votes() {
  try {
    const r = await fetch(`${CONFIG.siteUrl}/api/votes?top=12`, { signal: AbortSignal.timeout(15000) });
    const d = await r.json();
    return (d.top || []).map((t) => `- ${t.item}: 👍 ${t.up} / 👎 ${t.down}`).join('\n') || '(no votes yet)';
  } catch { return '(vote stats unavailable)'; }
}

// ---------- agents ----------
function quoteWin(s) { return /[\s"&|<>^]/.test(s) ? `"${s.replace(/"/g, '\\"')}"` : s; }

function runAgent(agentName, instruction, outFile, timeoutMinutes) {
  const a = CONFIG.agents[agentName];
  if (!a) throw new Error(`agent ${agentName} is not configured`);
  const fill = (s) => s.replace('{instruction}', instruction).replace('{out}', outFile);
  const argv = a.args.map(fill);
  const writesFile = a.args.some((x) => x.includes('{out}'));
  return new Promise((resolve, reject) => {
    const isWin = process.platform === 'win32';
    // npm-installed CLIs on Windows are .cmd shims, which need a shell.
    const child = isWin
      ? spawn([a.cmd, ...argv].map(quoteWin).join(' '), { cwd: REPO, shell: true, windowsHide: true })
      : spawn(a.cmd, argv, { cwd: REPO });
    child.stdin.end(); // codex and claude wait for stdin EOF when it is a pipe, which hung every run
    let out = '';
    let err = '';
    child.stdout.on('data', (d) => { out += d; });
    child.stderr.on('data', (d) => { err += d; });
    const timer = setTimeout(() => { child.kill(); reject(new Error(`${agentName} timed out after ${timeoutMinutes || CONFIG.timeoutMinutes} min`)); }, (timeoutMinutes || CONFIG.timeoutMinutes || 20) * 60000);
    child.on('error', (e) => { clearTimeout(timer); reject(e); });
    child.on('close', (code) => {
      clearTimeout(timer);
      if (code !== 0) return reject(new Error(`${agentName} exited with ${code}: ${(err || out).trim().slice(-600)}`));
      if (!writesFile) writeFileSync(outFile, out.trim() + '\n');
      resolve();
    });
  });
}

// ---------- stages ----------
const STAGES = {
  research: {
    agent: 'claude', file: '01-research.md', next: 'idea',
    async brief(job) {
      return `# Research brief (${job.id})

You are the RESEARCHER for "하루한판 / Daily Toybox" (${CONFIG.siteUrl}), a bilingual Korean/English site that publishes one original browser creation per day. Categories: games, cool pages, weird web, learn, tech, info, tools, random (pickers/ladders), radio (sound generated in the browser), fortune. Every item is one self-contained folder (an index.html plus optional images and short video files, no network access), and must be original (genre mechanics are fine; copying a specific product's name, characters, art or levels is not).

Existing items:
${itemsList().join('\n') || '(none)'}

Votes so far:
${await votes()}

Search the web for the last 4–8 weeks (today is ${today()}): viral browser games and web toys, unusual websites people share, Korean memes and short-form formats, seasonal hooks in Korea for the next 3 weeks, and everyday tools Koreans search for.

Reply with ONLY a Markdown document in this exact shape:
1. "# Research ${job.id}"
2. A table with columns: # | What | Why popular | Source URL | Date checked | Confidence (high/med/low) | Category — 8 to 12 rows, every row with a real URL you actually saw.
3. "## Seasonal hooks" — bullet list.
4. "## Directions" — 3 one-line directions in different categories.
Do not invent sources. Mark anything uncertain as low confidence.`;
    },
    check(text) {
      const urls = (text.match(/https?:\/\/\S+/g) || []).length;
      if (urls < 6) return `only ${urls} source URLs (need 6+)`;
      if (!/## Seasonal hooks/i.test(text) || !/## Directions/i.test(text)) return 'missing required sections';
      return null;
    },
  },
  idea: {
    // Claude plans and designs. Codex (ChatGPT) writes the code in the build stage.
    agent: 'claude', file: '02-idea.md', next: 'build',
    async brief(job) {
      return `# Idea brief (${job.id})

You are the PLANNER and DESIGNER for "하루한판 / Daily Toybox". A different AI (Codex) will write the code from your document alone, so be exact and complete: it must not have to guess. Read these files in this repository first:
- pipeline/jobs/${job.id}/01-research.md (today's research)
- play/ITEMS.md (hard rules for items)
- play/ideas.md (backlog)
- pipeline/jobs/2026-11-20-year-end-receipt/02-idea.md (an example of the spec format and level of detail expected)

Existing items (do not repeat):
${itemsList().join('\n') || '(none)'}

Votes so far (make more of what is liked):
${await votes()}

Propose 3 concepts in different categories, score each 1–5 on value in the first 10 seconds, originality, Korean search/share demand, and buildability in one HTML file; pick one, and write its full spec in the same structure as the example: meta (slug, category, kind, aspect, tags, ko/en title/desc/howto/about), pitch, flow, controls, every screen, all user-facing strings in Korean and English, localStorage keys, edge cases, and must-nots. Also include a "## Visual design" section: palette (hex colors and their roles), type scale, layout at 360×640 and 1024×700, what is drawn and how (canvas, CSS, SVG, emoji), motion and feedback, and what the thumbnail should show. Give concrete numbers (sizes, speeds, durations, scoring, difficulty curve) wherever behaviour depends on them.

Reply with ONLY the Markdown document. Its first line must be "# Idea and spec: <ko title> / <en title>" and it must contain a line "slug \`<slug>\`".`;
    },
    check(text, job) {
      const m = text.match(/slug\s*`([a-z0-9]+(?:-[a-z0-9]+)*)`/);
      if (!m) return 'no slug line';
      if (existsSync(join(REPO, 'play', 'items', m[1]))) return `slug ${m[1]} already exists`;
      if (!/[가-힣]/.test(text) || !/\| *ko *\| *en *\|/i.test(text) && !/ko:/i.test(text)) return 'missing Korean/English strings';
      if (!/## Visual design/i.test(text)) return 'missing "## Visual design" section';
      job.slug = m[1];
      return null;
    },
  },
  build: {
    // Codex writes the code (workspace-write sandbox) and must make the tests pass.
    agent: 'codexBuild', file: '04-build.md', next: 'review', timeoutMinutes: 45,
    async brief(job) {
      return `# Build brief (${job.id})

You are the BUILDER. Implement the item described in pipeline/jobs/${job.id}/02-idea.md exactly, including every string, number and rule in it. Read first:
- pipeline/jobs/${job.id}/02-idea.md (the spec and visual design; follow it literally)
- play/ITEMS.md (hard rules: one self-contained index.html, no network, both languages, works from 320 px to fullscreen, touch + mouse + keyboard, localStorage in try/catch, no dialogs)
- play/items/clock-out/index.html (a finished item, for structure and quality bar)

Create ONLY these files:
- play/items/${job.slug}/index.html
- play/items/${job.slug}/meta.json  (format in ITEMS.md; the slug must be "${job.slug}")

Then verify, from the play/ folder (run \`npm ci\` first if play/node_modules is missing):
1. \`npm test\`
2. \`npm run qa -- --only ${job.slug} --thumbs\`
Fix every failure and repeat until both pass. Look at the generated play/items/${job.slug}/thumb.png: it must show the real game or page, not a blank or broken screen.

Rules: do not edit any other file, do not commit, do not push, do not install anything outside play/. If the spec is ambiguous, choose the simplest reading and note it.

Reply with ONLY Markdown: "# Build ${job.id}", "## Files" (list), "## Verification" (the two commands and their results), "## Decisions" (any ambiguity you resolved, or "None").`;
    },
    check(text, job) {
      const dir = join(REPO, 'play', 'items', job.slug || '');
      if (!job.slug || !existsSync(join(dir, 'index.html')) || !existsSync(join(dir, 'meta.json'))) return 'index.html or meta.json missing';
      let meta;
      try { meta = JSON.parse(readFileSync(join(dir, 'meta.json'), 'utf8')); } catch { return 'meta.json is not valid JSON'; }
      if (meta.slug !== job.slug) return `meta.json slug "${meta.slug}" does not match "${job.slug}"`;
      const sh = process.platform === 'win32';
      const play = join(REPO, 'play');
      const t = spawnSync('npm', ['test'], { cwd: play, encoding: 'utf8', shell: sh });
      if (t.status !== 0) return `npm test failed: ${(t.stdout + t.stderr).trim().slice(-500)}`;
      if (existsSync(join(play, 'node_modules', 'playwright'))) {
        const q = spawnSync('npm', ['run', 'qa', '--', '--only', job.slug, '--thumbs'], { cwd: play, encoding: 'utf8', shell: sh, timeout: 10 * 60000 });
        if (q.status !== 0) return `qa failed: ${(q.stdout + q.stderr).trim().slice(-500)}`;
      }
      return null;
    },
  },
  review: {
    agent: 'claude', file: '05-review.md', next: 'build',
    async brief(job) {
      return `# Review brief (${job.id})

You are the REVIEWER. Review play/items/${job.slug}/index.html and meta.json against pipeline/jobs/${job.id}/02-idea.md and play/ITEMS.md. Check: spec coverage, bugs, every string present in Korean and English, mobile layout at 320–390 px, keyboard and touch controls, no network or dialogs, accessibility (contrast, focus, 44 px targets, reduced motion), and security (no eval, no innerHTML with user input).

Reply with ONLY a Markdown document:
"# Review ${job.id}", then "## Blocking" (numbered list, or "None"), "## Improvements" (numbered list), "## Verdict" with exactly PASS or CHANGES.`;
    },
    check(text) { return /## Verdict\s*\n+\s*(PASS|CHANGES)/.test(text) ? null : 'missing verdict'; },
  },
  feedback: {
    agent: 'codex', file: '06-feedback.md', next: null,
    async brief(job) {
      return `# Feedback brief (${job.id})

Analyse the votes for "하루한판 / Daily Toybox" and suggest what to make next.

Items:
${itemsList().join('\n')}

Votes (top 12 by likes minus dislikes):
${await votes()}

Reply with ONLY Markdown: "# Feedback ${job.id}", "## What works" (why the liked items are liked), "## What does not" (why), "## Next 5 ideas" (one line each: Korean title / English title — category — why), "## Improvement tasks" (up to 3 concrete changes to existing items).`;
    },
    check(text) { return /## Next 5 ideas/.test(text) ? null : 'missing "Next 5 ideas"'; },
  },
};

async function runStage(stageName, job) {
  const st = STAGES[stageName];
  const dir = join(JOBS, job.id);
  const briefFile = join(dir, `00-brief-${stageName}.md`);
  const outFile = join(dir, st.file);
  writeFileSync(briefFile, await st.brief(job));
  job.stage = stageName;
  job.status = 'running';
  job.owner = st.agent;
  job.attempts = 0;
  record(job, stageName, 'running', st.agent);
  if (flag('dry-run')) { log(`dry run: wrote ${rel(briefFile)}`); return false; }
  const instruction = `Read the file ${rel(briefFile)} in this repository and do exactly what it says. Reply with only the requested Markdown document.`;
  while (job.attempts < job.maxAttempts) {
    job.attempts++;
    try {
      log(`${stageName}: calling ${st.agent} (attempt ${job.attempts}/${job.maxAttempts})`);
      await runAgent(st.agent, instruction, outFile, st.timeoutMinutes);
      const text = readFileSync(outFile, 'utf8');
      const problem = st.check(text, job);
      if (problem) throw new Error(`output rejected: ${problem}`);
      job.artifacts[stageName] = st.file;
      job.stage = st.next || stageName;
      job.status = st.next ? 'queued' : 'approved';
      job.owner = st.next ? STAGES[st.next].agent : 'claude';
      record(job, stageName, 'approved', st.agent);
      log(`${stageName}: done -> ${rel(outFile)}`);
      if (job.slug && /-pending(-\d+)?$/.test(job.id)) {
        // Name the job after the chosen item, e.g. 2026-11-21-snow-window.
        const newId = `${job.id.slice(0, 10)}-${job.slug}`;
        if (!existsSync(join(JOBS, newId))) {
          renameSync(join(JOBS, job.id), join(JOBS, newId));
          job.id = newId;
          saveJob(job);
          log(`job renamed to ${newId}`);
        }
      }
      return true;
    } catch (e) {
      record(job, stageName, 'retry', st.agent, { error: String(e.message || e).slice(0, 800) });
      log(`${stageName}: ${e.message}`);
    }
  }
  job.status = 'failed';
  record(job, stageName, 'failed', st.agent, { error: `gave up after ${job.maxAttempts} attempts` });
  return false;
}

function publish(job, message) {
  if (flag('no-push') || flag('dry-run')) return;
  git('add', rel(join(JOBS, job.id)));
  if (job.slug && existsSync(join(REPO, 'play', 'items', job.slug))) git('add', rel(join(REPO, 'play', 'items', job.slug)));
  const staged = spawnSync('git', ['diff', '--cached', '--quiet'], { cwd: REPO });
  if (staged.status === 0) return;
  git('commit', '-m', message);
  git('push', 'origin', `HEAD:${CONFIG.branch}`);
  log(`pushed to ${CONFIG.branch}`);
}

function syncBranch() {
  if (flag('no-push') || flag('dry-run')) return;
  git('fetch', 'origin');
  const current = git('rev-parse', '--abbrev-ref', 'HEAD');
  if (current !== CONFIG.branch) throw new Error(`check out the ${CONFIG.branch} branch first (git switch ${CONFIG.branch})`);
  const remote = spawnSync('git', ['rev-parse', '--verify', `origin/${CONFIG.branch}`], { cwd: REPO });
  if (remote.status === 0) git('merge', '--ff-only', `origin/${CONFIG.branch}`);
  git('merge', '--no-edit', 'origin/main'); // keep items, rules and examples current
}

async function main() {
  if (cmd === 'doctor') {
    for (const [name, c] of [['git', ['--version']], ['node', ['--version']]]) {
      const r = spawnSync(name, c, { encoding: 'utf8', shell: process.platform === 'win32' });
      log(`${name}: ${r.status === 0 ? r.stdout.trim() : 'NOT FOUND'}`);
    }
    for (const [name, a] of Object.entries(CONFIG.agents)) {
      const r = spawnSync(a.cmd, ['--version'], { encoding: 'utf8', shell: process.platform === 'win32' });
      log(`${name} (${a.cmd}): ${r.status === 0 ? (r.stdout || r.stderr).trim().split('\n')[0] : 'NOT FOUND or not signed in'}`);
    }
    log(`branch now: ${git('rev-parse', '--abbrev-ref', 'HEAD')} (runner pushes to ${CONFIG.branch})`);
    log(`config: ${configPath}`);
    return;
  }
  if (cmd === 'status') {
    for (const j of listJobs()) console.log(`${j.id.padEnd(40)} ${j.stage.padEnd(9)} ${j.status.padEnd(9)} attempts ${j.attempts}/${j.maxAttempts}${j.slug ? '  ' + j.slug : ''}`);
    return;
  }
  syncBranch();
  if (cmd === 'daily') {
    const job = newJob();
    if (await runStage('research', job) && await runStage('idea', job)) await runStage('build', job);
    if (job.slug && job.id.endsWith('pending')) log(`slug chosen: ${job.slug}`);
    publish(job, `pipeline: ${job.id} research, idea and build (${job.stage}, ${job.status})`);
    process.exitCode = job.status === 'failed' ? 1 : 0;
    return;
  }
  if (cmd === 'feedback') {
    const job = newJob();
    job.stage = 'feedback';
    await runStage('feedback', job);
    publish(job, `pipeline: ${job.id} feedback (${job.status})`);
    return;
  }
  if (STAGES[cmd]) {
    const id = opt('job');
    const job = id ? loadJob(id) : newJob();
    await runStage(cmd, job);
    publish(job, `pipeline: ${job.id} ${cmd} (${job.status})`);
    process.exitCode = job.status === 'failed' ? 1 : 0;
    return;
  }
  console.error(`unknown command ${cmd}`);
  process.exitCode = 2;
}

main().catch((e) => { console.error(e.message || e); process.exitCode = 1; });
