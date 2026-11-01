---
id: 18
uid: ca1fee49-23b5-440e-a61f-df11b5c1a3b7
title: Deploy to production
type: chore
status: backlog
milestone: v0.1
depends_on:
- 11
created: 2026-11-01
updated: 2026-11-01
priority: p0
effort: s
area: infra
---

## Why

A stranger has to be able to reach it.

## Acceptance criteria

- [ ] Vercel project linked; every PR gets a preview deployment
- [ ] Merges to `main` deploy to production
- [ ] Migrations run before the new code serves traffic, and a failed migration stops the deploy
- [ ] Production URL is recorded in the README
