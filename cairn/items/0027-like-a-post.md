---
id: 27
uid: bc21e622-e6ee-4a0b-ba9a-f8271e244acb
title: Like a post
type: feature
status: backlog
milestone: v0.2
depends_on:
- 22
created: 2026-11-01
updated: 2026-11-01
priority: p1
effort: s
area: social
---

## Proposal

`likes (user_id, post_id)`, unique pair. A like button with a count.

## Acceptance criteria

- [ ] Toggling is idempotent and optimistic; a failed request rolls the UI back
- [ ] The count shown matches the database after reload
- [ ] Deleting a post removes its likes
