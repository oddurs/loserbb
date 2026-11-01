---
id: 46
uid: a3f2bef1-36fb-49f2-84d3-b6afcd7a5ffb
title: Trending hashtags
type: feature
status: backlog
milestone: v0.4
depends_on:
- 43
created: 2026-11-01
updated: 2026-11-01
priority: p1
effort: m
area: search
---

## Proposal

The top 10 hashtags by distinct posting accounts in the last 24 hours, recomputed on a
schedule rather than per request.

## Acceptance criteria

- [ ] Counts distinct accounts, not posts, so one account cannot trend a tag alone
- [ ] Recomputed at least every 10 minutes by a cron job
- [ ] Removed posts and suspended accounts do not count
