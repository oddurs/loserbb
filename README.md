# loserbb

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

Microblogging under a tighter rule than Twitter ever had: every day has a number between
1 and 42, and that is how many characters every post gets that day.

## What works today

A page that says so. The first usable version, v0.1, is planned in
[ROADMAP.md](ROADMAP.md).

## Run it locally

Needs Node 26, pnpm, Docker, and [cairn](https://github.com/oddurs/cairn).

```sh
scripts/setup     # hooks, dependencies, browsers, Postgres on :54342, migrations
pnpm dev          # http://localhost:4242
```

## Development

All work goes through `scripts/agent`: one worktree, one branch, one pull request.

```sh
scripts/agent doctor                  # verify tools, auth, hooks
scripts/agent start feat/0020-profile # new worktree from main
scripts/agent commit "feat: ..."      # Conventional Commit, checked by a hook
scripts/agent ship --body-file pr.md  # check, push, PR, auto-merge, clean up
```

`scripts/task check` runs what CI runs. See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

[MIT](LICENSE)
