---
id: 32
uid: 0e7f65f0-553f-4393-ba37-852c9f0b14f4
title: Seed script for development data
type: chore
status: backlog
milestone: v0.2
depends_on:
- 24
created: 2026-11-01
updated: 2026-11-01
priority: p2
effort: s
area: infra
---

## Why

Timelines, follows, and pagination cannot be judged on an empty database.

## Acceptance criteria

- [ ] `scripts/task seed` creates N users, a follow graph, and M posts with a fixed seed
- [ ] Refuses to run against the production database
- [ ] Reused by the v1.0 load test at larger N
