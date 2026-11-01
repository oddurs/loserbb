---
id: 23
uid: fe9fa552-f5aa-461a-90c4-63a8df4f00d5
title: Delete your own post
type: feature
status: backlog
milestone: v0.2
depends_on:
- 22
created: 2026-11-01
updated: 2026-11-01
priority: p0
effort: s
area: posts
---

## Problem

With 42 characters a typo is a big share of the post, and there is no undo.

## Proposal

The author can delete a post. Deletion is permanent.

## Acceptance criteria

- [ ] Only the author sees the delete control, and the server checks authorship
- [ ] A deleted post disappears from every timeline and its permalink returns 404
- [ ] Replies to a deleted post show "post deleted" in place of the parent
