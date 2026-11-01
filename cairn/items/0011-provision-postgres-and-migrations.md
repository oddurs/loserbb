---
id: 11
uid: 3494ffb3-953d-437a-adbf-7269de482215
title: Provision Postgres and migrations
type: chore
status: doing
milestone: v0.1
depends_on:
- 9
created: 2026-11-01
updated: 2026-11-01
priority: p0
effort: m
area: infra
---

## Why

Accounts and posts need durable storage, with schema changes that go through review.

## Acceptance criteria

- [ ] Postgres provisioned through the Vercel Marketplace; env vars pulled with `vercel env`
- [ ] A migration tool chosen, with the reason in the PR description
- [ ] `scripts/task` gains a migrate step; CI migrates a fresh database before tests
- [ ] Local development runs against a local or branch database, never production

## 2026-11-01

Built locally: Postgres 17 in docker-compose on :54342, plain SQL migrations via scripts/migrate.mjs (no tool dependency; ~40 lines). Open: provision through the Vercel Marketplace with 0018.
