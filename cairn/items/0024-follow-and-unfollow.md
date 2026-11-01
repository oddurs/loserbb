---
id: 24
uid: 87574d4c-4267-4544-a688-3d5195835db1
title: Follow and unfollow
type: feature
status: backlog
milestone: v0.2
depends_on:
- 20
created: 2026-11-01
updated: 2026-11-01
priority: p0
effort: m
area: social
---

## Problem

There is no way to choose whose posts you read.

## Proposal

A follow button on profiles. `follows (follower_id, followee_id, created_at)`, unique pair.

## Acceptance criteria

- [ ] Follow and unfollow are idempotent; double-clicking does not error or duplicate
- [ ] You cannot follow yourself
- [ ] Counts on the profile update
- [ ] `/@handle/followers` and `/@handle/following` list accounts, paginated
