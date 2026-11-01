---
id: 49
uid: 7e3ab726-479d-4592-97be-5b6b12eaa23c
title: Load test the timelines
type: chore
status: backlog
milestone: v1.0
depends_on:
- 25
- 32
created: 2026-11-01
updated: 2026-11-01
priority: p0
effort: m
area: timeline
---

## Why

Home timeline is built at read time. This test decides whether that holds.

## Acceptance criteria

- [ ] Seed 10k users, 1M posts, realistic follow graph using the seed script
- [ ] Home timeline p95 < 300 ms and posting p95 < 200 ms at 50 requests/second
- [ ] Results and the method are written into the item before closing
- [ ] If a target is missed, a follow-up item is filed with the measurement
