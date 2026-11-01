---
id: 25
uid: 12f5d6ec-a676-4d1c-81af-78f61b80dbcd
title: Home timeline
type: feature
status: backlog
milestone: v0.2
depends_on:
- 24
created: 2026-11-01
updated: 2026-11-01
priority: p0
effort: m
area: timeline
---

## Problem

The global timeline stops being readable once more than a few dozen people post.

## Proposal

Signed-in `/` shows posts from followed accounts plus your own, built at read time with
a join. Fan-out-on-write waits until the v1.0 load test says it is needed. The global
timeline moves to `/everyone`.

## Acceptance criteria

- [ ] Only followed accounts and your own posts appear
- [ ] Same cursor pagination as the global timeline
- [ ] A new account with no follows sees a prompt to visit `/everyone`
- [ ] Query plan in the PR uses indexes on `follows` and `posts`
