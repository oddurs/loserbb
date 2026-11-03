# loserbb

[![CI](https://github.com/oddurs/loserbb/actions/workflows/ci.yml/badge.svg)](https://github.com/oddurs/loserbb/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

Microblogging under a tighter rule than Twitter ever had: every day has a number between
1 and 42, and that is how many characters every post gets that day. A 40 day is for
jokes. A 3 day is all emoji. Each post keeps the number it was written under.

A character is what you see: an emoji, a flag, or an accented letter counts once. The
day changes at midnight UTC.

## What works today

Sign up with a handle and password, post within today's number, and read everyone's
posts on one global timeline. Following, replies, and the rest are planned in
[ROADMAP.md](ROADMAP.md).

## Run it locally

Needs Node 26, pnpm, Docker, and [cairn](https://github.com/oddurs/cairn).

```sh
scripts/setup     # hooks, dependencies, browsers, Postgres on :54342, migrations
pnpm dev          # http://localhost:4242
```

No env file is needed for development. Production needs `DATABASE_URL` and
`LIMIT_SECRET`. Never change `LIMIT_SECRET` once set: it would rewrite every past day's
number.

## Development

All work goes through `scripts/agent`: one worktree, one branch, one pull request.

```sh
scripts/agent doctor                  # verify tools, auth, hooks
scripts/agent start feat/0020-profile # new worktree from main
scripts/agent commit "feat: ..."      # Conventional Commit, checked by a hook
scripts/agent ship --body-file pr.md  # check, push, PR, auto-merge, clean up
```

`scripts/task check` runs what CI runs: format check, lint, unit, property, integration,
and browser tests, then the build. Tests use a separate `loserbb_test` database,
recreated on every run. See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

[MIT](LICENSE)
