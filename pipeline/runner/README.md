# PC runner

Runs the Claude and Codex stages on the owner's Windows PC with the CLIs already signed in there. The results go to the `pipeline-inbox` branch, and Claude (cloud) continues from there.

| Command | What it does |
|---|---|
| `node pipeline/runner/run.mjs doctor` | Checks git, node, `codex` and `claude` |
| `node pipeline/runner/run.mjs daily` | Creates a new job: Claude researches, Claude plans and designs the item, then **Codex (ChatGPT) writes the code** and must pass `npm test` and the QA run. Pushes the job and the new item to `pipeline-inbox` |
| `node pipeline/runner/run.mjs build --job <id>` | Runs only the Codex build stage again from the existing spec |
| `node pipeline/runner/run.mjs review --job <id>` | Claude reviews the built item against its spec (read-only) |
| `node pipeline/runner/run.mjs feedback` | Codex analyses the weekly votes and suggests the next ideas |
| `node pipeline/runner/run.mjs status` | Lists jobs |

Flags:

- `--no-push` keeps the results local.
- `--dry-run` writes only the brief files.
- `--config <file>` uses another config file.

Each agent gets one short instruction ("read `pipeline/jobs/<id>/00-brief-<stage>.md` and do what it says"). The runner saves the agent's answer as the stage file and checks that it has the required parts. It tries up to `maxAttempts` times, and records every error in `job.json`.

Configuration:

- `config.json` holds the defaults.
- Put PC-specific changes, such as the exact non-interactive flags of your CLI versions, in `config.local.json`. Git ignores that file, and when it exists it replaces `config.json` completely (it is not merged).
- Both agents run read-only. Codex uses `--sandbox read-only`. Claude is limited to `Read,Glob,Grep,WebSearch,WebFetch` with `--tools`, and `--strict-mcp-config` turns off every MCP server from your personal settings (`--tools` alone does not, so MCP file-writing tools would still work).
- The runner closes each agent's stdin. Without that, `codex exec` and `claude -p` wait for input forever.
- `{instruction}` is replaced with the instruction text.
- If an agent's arguments contain `{out}`, the agent writes the result file itself. Otherwise the runner saves the agent's standard output as the result.

Run `schedule.ps1` once to register these in Task Scheduler:

- daily at 04:10: research and idea
- Sundays at 03:40: feedback

No API keys are used and nothing is stored outside the repository.

## Who does what

| Stage | Agent | Access |
|---|---|---|
| research | Claude | read-only files + web search |
| idea (plan and design) | Claude | read-only files + web search; writes a spec detailed enough for another AI to code from |
| build | Codex (`codexBuild`, ChatGPT login) | **workspace-write** sandbox; may only create `play/items/<slug>/index.html` and `meta.json`; the runner then runs `npm test` and the QA run, and rejects the build (with retries) if they fail |
| review | Claude | read-only |
| feedback | Codex | read-only |

Nothing is published by the runner itself: results go to `pipeline-inbox` and the owner merges.
