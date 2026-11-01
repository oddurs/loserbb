---
id: 38
uid: 74c437e5-be38-4071-9fbc-d414f25813fc
title: Admin role and moderation queue
type: feature
status: backlog
milestone: v0.3
depends_on:
- 37
created: 2026-11-01
updated: 2026-11-01
priority: p0
effort: m
area: moderation
---

## Proposal

An `admin` flag on users, set only by a CLI script or migration. `/admin` lists open
reports, most-reported first.

## Acceptance criteria

- [ ] Non-admins get 404 on `/admin` and its actions (checked server-side)
- [ ] An admin can remove a post or dismiss a report; both are logged with who and when
- [ ] Removed posts behave like deleted posts everywhere
