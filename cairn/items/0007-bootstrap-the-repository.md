---
id: 7
uid: 6753afa4-e2fd-449b-925e-1352df207ac6
title: Bootstrap the repository
type: chore
status: backlog
milestone: v0.1
created: 2026-11-01
updated: 2026-11-01
priority: p0
effort: m
area: infra
---

## Why

There is no git repository yet. Every later item lands through a branch and a PR, so
that path has to exist first.

## Acceptance criteria

- [ ] `git init`, public GitHub repo, `main` protected (PR required, checks required)
- [ ] `scripts/task` with `fmt fmt:check lint test build check`; `scripts/agent` present
- [ ] Pre-commit and pre-push hooks call `scripts/task`; CI calls the same verbs
- [ ] `cairn.toml` and `cairn/items/` are committed; `cairn init --git` has run
- [ ] LICENSE, CONTRIBUTING, and a stub README are present

Use the `bootstrap-repo` skill.
