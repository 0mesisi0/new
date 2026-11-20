# PC runner

Runs the Gemini and Codex stages on the owner's Windows PC with the CLIs already signed in there. The results go to the `pipeline-inbox` branch, and Claude (cloud) continues from there.

| Command | What it does |
|---|---|
| `node pipeline/runner/run.mjs doctor` | Checks git, node, `codex` and `agy` |
| `node pipeline/runner/run.mjs daily` | Creates a new job: Gemini does the research, then Codex writes the idea and spec. Pushes the job to `pipeline-inbox` |
| `node pipeline/runner/run.mjs review --job <id>` | Codex reviews a built item against its spec |
| `node pipeline/runner/run.mjs feedback` | Gemini analyses the weekly votes and suggests the next ideas |
| `node pipeline/runner/run.mjs status` | Lists jobs |

Flags:

- `--no-push` keeps the results local.
- `--dry-run` writes only the brief files.
- `--config <file>` uses another config file.

Each agent gets one short instruction ("read `pipeline/jobs/<id>/00-brief-<stage>.md` and do what it says"). The runner saves the agent's answer as the stage file and checks that it has the required parts. It tries up to `maxAttempts` times, and records every error in `job.json`.

Configuration:

- `config.json` holds the defaults.
- Put PC-specific changes, such as the exact non-interactive flags of your `agy` version, in `config.local.json`. Git ignores that file, and it overrides the defaults.
- `{instruction}` is replaced with the instruction text.
- If an agent's arguments contain `{out}`, the agent writes the result file itself. Otherwise the runner saves the agent's standard output as the result.

Run `schedule.ps1` once to register these in Task Scheduler:

- daily at 04:10: research and idea
- Sundays at 03:40: feedback

No API keys are used and nothing is stored outside the repository.
