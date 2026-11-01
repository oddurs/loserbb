---
id: 20
uid: 0b4d4fff-57a3-4613-8962-0a6f337b6ff7
title: Profile page
type: feature
status: backlog
milestone: v0.2
depends_on:
- 17
created: 2026-11-01
updated: 2026-11-01
priority: p0
effort: m
area: accounts
---

## Problem

There is no way to see one person's posts.

## Proposal

`/@handle` shows the account's display name, bio, counts, and posts newest first.

## Acceptance criteria

- [ ] Uses the same cursor pagination as the global timeline
- [ ] Handle lookup is case-insensitive; a non-canonical case redirects to the canonical one
- [ ] An unknown handle returns 404
- [ ] Shows follower and following counts once follows exist (zero until then)
