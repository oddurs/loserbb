---
id: 21
uid: 16bd0b21-970e-42fc-9c54-683495dc76b1
title: Edit display name and bio
type: feature
status: backlog
milestone: v0.2
depends_on:
- 20
created: 2026-11-01
updated: 2026-11-01
priority: p2
effort: s
area: accounts
---

## Problem

A handle is all a profile says about someone.

## Proposal

Settings page for a display name and a bio. The bio is counted with the shared counter.

## Acceptance criteria

- [ ] Display name ≤ 30 characters, bio ≤ 42 (the ceiling, not today's number, so a
      profile is not hostage to a 2 day), both validated server-side
- [ ] Changes show on the profile immediately
