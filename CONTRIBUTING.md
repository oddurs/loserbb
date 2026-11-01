# Contributing

## Setup

Needs Node (the major in `.node-version`), pnpm, Docker, the GitHub CLI, and
[cairn](https://github.com/oddurs/cairn).

```sh
scripts/setup          # hooks, dependencies, browsers, database, migrations
scripts/agent doctor   # reports anything still missing
```

## Workflow

`main` advances only through a merged pull request. Branch protection enforces it on
GitHub; the `pre-push` hook enforces it locally.

1. One unit of work gets one branch, one worktree, and one pull request.
   `scripts/agent start <type>/<slug>` creates the branch from the latest `main` in
   `../.worktrees/loserbb/<type>/<slug>/`. `type` is one of `feat fix chore docs perf
refactor test`. When the work is a backlog item, the slug starts with its id:
   `feat/0020-profile-page`.
2. Work in that worktree. Never share a checkout between two tasks or two agents.
3. Commit with `scripts/agent commit "<message>"`.
4. `scripts/agent sync` rebases onto `main` when it moves.
5. `scripts/agent ship --body-file <path>` runs the full check, pushes, opens the
   pull request, turns on auto-merge, waits, and removes the worktree after the merge.
6. For a change that needs review before merging, use `scripts/agent pr` instead and
   run `scripts/agent done` after it merges.
7. `scripts/agent sweep` rebases stalled auto-merge pull requests and removes worktrees
   whose pull requests have merged.

The backlog lives in `cairn/items/`. Claim an item with `cairn claim <id>` and close it in
the pull request that finishes it.

## Commits

[Conventional Commits](https://www.conventionalcommits.org/): `type(scope)!: subject`.
Imperative mood, subject at most 72 characters, no trailing period. The body explains
why; the diff already shows what. Add a `Refs: <item id>` trailer for backlog work. The
`commit-msg` hook rejects anything else.

## Checks

```sh
scripts/task fmt        # format in place
scripts/task check      # what CI runs: fmt:check, lint, test, build
```

A branch is green before it becomes a pull request. Never bypass hooks with
`--no-verify`. A bug fix comes with the test that would have caught it.

## Review

Pull requests merge by squash. One status check, `required`, must pass, the branch must
be up to date with `main`, and every conversation must be resolved. The project has a
single maintainer, so no approving review is required; the maintainer still reviews
every outside contribution before merging.

## Conduct

This project follows the [Code of Conduct](CODE_OF_CONDUCT.md).
