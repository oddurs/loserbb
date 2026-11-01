---
id: 33
uid: 3d80355c-e22f-40bb-8918-e0393005c464
title: Rate-limit posting and sign-up
type: feature
status: backlog
milestone: v0.3
depends_on:
- 13
- 16
created: 2026-11-01
updated: 2026-11-01
priority: p0
effort: m
area: moderation
---

## Problem

Short posts are cheap to spam. One script can flood the global timeline.

## Proposal

Per-account and per-IP limits on posting, replying, following, and sign-up.

## Acceptance criteria

- [ ] Limits are configured in one place, with starting values written in the PR
- [ ] An over-limit request returns 429 with a retry time, and the composer shows it
- [ ] Limits hold across serverless instances (shared store, not in-memory)
- [ ] Integration test: N+1 posts in the window, the last is refused
