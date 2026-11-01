---
id: 65
uid: 04bf9322-accd-4f76-8445-d899c37a79a2
title: 'Reply funnel: each reply gets one fewer'
type: feature
status: backlog
milestone: v0.2
depends_on:
- 26
- 63
created: 2026-11-01
updated: 2026-11-01
priority: p1
effort: s
area: posts
---

## Problem

Threads should end on their own. Each reply getting one character fewer than the post it
answers narrows every conversation to a single character and then closes it.

## Proposal

A reply's limit is the parent's character count minus one, and never more than today's
number. The limit is computed on the server from the parent at reply time.

## Acceptance criteria

- [ ] Replying to a 30-character post on a 42 day allows 29; on a 12 day it allows 12
- [ ] Replying to a 1-character post is impossible: the reply control is replaced by
      "this thread has run out", and the server refuses with a 4xx
- [ ] The composer in reply mode shows the reply limit and why ("one fewer than @handle")
- [ ] The stored `char_limit` on the reply is the funnel limit, not the daily number
- [ ] Deleting a parent does not change the limit of replies already written
- [ ] Unit tests for the rule, e2e test of a thread running out
