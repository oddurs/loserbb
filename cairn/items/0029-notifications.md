---
id: 29
uid: f72b5e42-5264-4bbf-ab72-97bec0aa7e1b
title: Notifications
type: feature
status: backlog
milestone: v0.2
depends_on:
- 24
- 26
- 27
- 28
created: 2026-11-01
updated: 2026-11-01
priority: p1
effort: m
area: social
---

## Problem

Nobody knows when someone replied or followed them, so nobody comes back.

## Proposal

A `/notifications` page and an unread badge in the header. In-app only; no email, no push.

## Acceptance criteria

- [ ] Events: reply, like, repost, follow, each linking to its source
- [ ] Multiple likes on one post group as "@a and 3 others liked your post"
- [ ] Visiting the page clears the badge
- [ ] You are never notified about your own actions
