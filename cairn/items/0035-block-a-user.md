---
id: 35
uid: e49f324e-a47f-40ce-865a-ee49ec56c3c3
title: Block a user
type: feature
status: backlog
milestone: v0.3
depends_on:
- 24
- 26
created: 2026-11-01
updated: 2026-11-01
priority: p0
effort: m
area: moderation
---

## Problem

There is no defence against a specific person.

## Proposal

`blocks (blocker_id, blocked_id)`. Blocking removes any follow in both directions.

## Acceptance criteria

- [ ] The blocked user cannot follow, reply to, like, repost, or mention-notify the blocker
- [ ] Each sees none of the other's posts on any timeline
- [ ] The blocked user sees "you are blocked" on the blocker's profile, not their posts
- [ ] Settings lists blocked accounts with an unblock control
