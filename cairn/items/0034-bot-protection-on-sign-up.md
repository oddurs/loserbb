---
id: 34
uid: 2da42f58-dd5e-4ac1-acc2-877eb6adca0b
title: Bot protection on sign-up
type: feature
status: backlog
milestone: v0.3
depends_on:
- 13
created: 2026-11-01
updated: 2026-11-01
priority: p1
effort: s
area: moderation
---

## Proposal

Add bot detection to the sign-up flow, using what the auth provider offers or Vercel BotID.

## Acceptance criteria

- [ ] An automated sign-up without a real browser is refused
- [ ] A human sign-up adds no visible step in the common case
