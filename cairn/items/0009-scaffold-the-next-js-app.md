---
id: 9
uid: 10ede993-0658-4557-8e95-686e511849c0
title: Scaffold the Next.js app
type: chore
status: doing
milestone: v0.1
depends_on:
- 7
created: 2026-11-01
updated: 2026-11-01
priority: p0
effort: m
area: web
---

## Why

Every user-facing item needs an app shell to land in.

## Acceptance criteria

- [ ] Next.js App Router, TypeScript strict, created with the `nextjs-site` skill
- [ ] A home page renders at `/` with the name and a one-line description
- [ ] `scripts/task check` builds, lints with warnings denied, and runs tests, green in CI
- [ ] Dev server runs on a fixed, non-default port documented in the README

## 2026-11-01

Built: Next.js 16.4.3, Tailwind 4, TypeScript strict, dev on :4242. Open until CI exists (needs 0007).
