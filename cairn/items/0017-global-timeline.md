---
id: 17
uid: 7d5052c9-a03d-4d7a-8a27-db2d22c584d3
title: Global timeline
type: feature
status: doing
milestone: v0.1
depends_on:
- 16
created: 2026-11-01
updated: 2026-11-01
priority: p0
effort: m
area: timeline
---

## Problem

Before follows exist, people need somewhere to read.

## Proposal

`/` shows every post, newest first, with the author's handle and a relative time.

## Acceptance criteria

- [ ] Cursor pagination on `(created_at, id)`, 50 per page; no OFFSET
- [ ] Two posts with the same timestamp are both shown, in a stable order
- [ ] Signed-out visitors can read; only the composer needs a session
- [ ] An index supports the query; EXPLAIN in the PR shows no sequential scan

## 2026-11-01

Built. Open: EXPLAIN on seeded data to show the posts_timeline index is used (the table is too small to tell yet).
