---
id: 44
uid: 2ad9a172-a9cb-4689-9f5f-53d28f3b9924
title: Search posts
type: feature
status: backlog
milestone: v0.4
depends_on:
- 42
created: 2026-11-01
updated: 2026-11-01
priority: p0
effort: m
area: search
---

## Proposal

`/search?q=` returns matching posts newest first, using the engine chosen in the spike.

## Acceptance criteria

- [ ] p95 under 300 ms on 1M seeded posts
- [ ] Cursor pagination
- [ ] An empty or whitespace-only query shows the search page, not an error
- [ ] Query input is parameterised, never interpolated (tested with quotes and operators)
