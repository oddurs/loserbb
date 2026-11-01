---
id: 10
uid: bb2cef98-d34e-4981-80db-114c7cc7e508
title: Unit and end-to-end test harness
type: chore
status: doing
milestone: v0.1
depends_on:
- 9
created: 2026-11-01
updated: 2026-11-01
priority: p0
effort: m
area: infra
---

## Why

The rule is green before PR. That needs a harness before the first feature, not after.

## Acceptance criteria

- [ ] Unit tests and property tests run under `scripts/task test`
- [ ] Browser end-to-end tests run against a local build with a throwaway database
- [ ] One e2e test loads `/` and asserts the heading; it runs in CI
- [ ] No test depends on wall-clock time or network outside the test database

Use the `testing` skill.

## 2026-11-01

Built: vitest + fast-check (unit, property, integration on loserbb_test), Playwright e2e against a production build. Open until it runs in CI (needs 0007).
