---
id: 26
uid: 8a2f4c3f-7a0c-4914-9c23-ea39209159b7
title: Replies and threads
type: feature
status: backlog
milestone: v0.2
depends_on:
- 22
created: 2026-11-01
updated: 2026-11-01
priority: p0
effort: m
area: social
---

## Problem

There is no conversation, only broadcast.

## Proposal

`posts.reply_to_id`. A reply button on each post opens the composer in reply mode.
The permalink shows the parent chain above and direct replies below.

## Acceptance criteria

- [ ] A reply obeys today's number (the reply funnel narrows it further); the parent's @handle is not auto-inserted into
      the body (it would eat the budget) but shown as "replying to @handle"
- [ ] The permalink shows up to 10 ancestors and paginated direct replies
- [ ] Replies appear on the home timeline of the replier's followers
