# loserbb

Microblogging where every UTC day has a character limit between 1 and 42. Next.js App
Router (Cache Components on), Tailwind, Postgres through `postgres`. The plan is the
cairn backlog in `cairn/items/`; `ROADMAP.md` is generated from it.

@AGENTS.md

## Workflow

- Never commit to `main`. It advances only through a merged pull request.
- One unit of work: one worktree, one branch, one pull request. Never share a checkout
  with another task or agent.
- Start work: `scripts/agent start <type>/<slug>`, then `cd` to the printed path.
  `type` is one of `feat fix chore docs perf refactor test`; for a backlog item the slug
  starts with its id.
- Commit: `scripts/agent commit "<message>"`.
- Finish: `scripts/agent ship --body-file <path>`, with the body written from the PR
  template. Use `scripts/agent pr --body-file <path>` instead when the change needs a
  human decision before merging, and say so in the PR.
- `scripts/agent sync` rebases onto `main`; do not merge `main` into a branch.
- Backlog: `cairn next` for what is ready, `cairn claim <id>` before starting, tick
  criteria with `cairn tick` only after watching them pass, close in the same PR.

## Checks

Talk to the toolchain only through `scripts/task`:

```
scripts/task fmt        format in place
scripts/task fmt:check  verify formatting
scripts/task lint       eslint (warnings are errors), tsc, cairn check
scripts/task test       vitest (unit, property, integration) and Playwright
scripts/task build      next build
scripts/task check      all of the above; what CI and pre-push run
```

- A branch passes `scripts/task check` before it becomes a pull request.
- Never use `--no-verify`, `|| true`, or `continue-on-error` to get past a failure.
- A bug fix comes with the test that would have caught it.
- Tests use the `loserbb_test` database, recreated each run. Postgres runs on 54342.

## Rules that are easy to break

- Characters are counted only by `lib/count.ts`, on both client and server. Never use
  `.length` on post text.
- The server is the authority on today's number and on validity. Every server action
  checks the session and validates input itself.
- Never change `LIMIT_SECRET` handling in a way that changes past days' numbers.
- Schema changes are new files in `db/migrations/`; never edit an applied one.

## Commits and pull requests

- Conventional Commits: `type(scope)!: subject`, imperative, at most 72 characters, no
  trailing period. The body explains why. `Refs: <item id>` for backlog work.
- The PR description fills in the template: the problem, the approach, and where the
  change is weakest.

## Attribution

Never name an AI, assistant, model, or tool vendor as an author or contributor in a
commit, trailer, PR, comment, doc, changelog, or release note. No co-author trailers,
no "generated with" footers, no robot emoji. Strip such lines if a tool inserts them.

## Code

- Comments say why; the code says what.
- No TODO stubs, commented-out code, or abstractions without a second caller.
- A dependency must earn its place; prefer the standard library.
- Handle an error where you can act on it; otherwise propagate it.
