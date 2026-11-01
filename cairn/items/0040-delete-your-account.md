---
id: 40
uid: 24c216bb-df00-4274-b9c8-3cc216025fd0
title: Delete your account
type: feature
status: backlog
milestone: v0.3
depends_on:
- 13
created: 2026-11-01
updated: 2026-11-01
priority: p0
effort: m
area: accounts
---

## Problem

People must be able to leave, and take their posts with them.

## Proposal

Settings → delete account, with re-authentication. Deletes posts, likes, reposts, follows,
blocks, and notifications, and the auth-provider identity.

## Acceptance criteria

- [ ] Requires typing the handle to confirm
- [ ] No row references the user afterwards (test that walks every table)
- [ ] The handle becomes available again after 30 days, not immediately
