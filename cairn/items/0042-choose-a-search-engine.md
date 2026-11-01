---
id: 42
uid: b524c050-9877-421e-85ad-f79c96c330a2
title: Choose a search engine
type: spike
status: backlog
milestone: v0.4
created: 2026-11-01
updated: 2026-11-01
priority: p0
effort: s
area: search
---

## Question

Can Postgres do search at our scale, or does it need a separate service?

## Timebox

One day.

## Options considered

- Postgres full-text (`tsvector`, GIN index): no new service. Stemming is weak on 42-character posts.
- `pg_trgm` trigram matching: handles partial words and typos, larger index
- A hosted search service through the Vercel Marketplace: better relevance, a second
  source of truth to keep in sync

Measure on 1M seeded posts: p95 latency, index size, results for typos and partial words.

## Answer

## Spawns

- [ ] Concrete indexing approach for "Search posts"
