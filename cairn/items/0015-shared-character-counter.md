---
id: 15
uid: 581b9f4a-c107-4d66-a01e-bb4c8afb606e
title: Shared character counter
type: feature
status: done
milestone: v0.1
depends_on:
- 8
- 10
created: 2026-11-01
updated: 2026-11-01
closed_at: 2026-11-01
priority: p0
effort: s
area: posts
---

## Problem

The composer and the server must agree on the count, or users see "2 left" and then get
rejected.

## Proposal

One module, imported by the client and the server, implementing the rule from the
"Define what counts as a character" spike. It takes the text and a limit (0 to 42) and
returns the count, the remaining budget, and whether the post is valid. It never
hard-codes 42; the limit comes from today's number or the reply funnel.

## Acceptance criteria

- [x] Passes every vector in the spike's fixture file
- [x] Property test: for any string and limit, valid implies count ≤ limit and UTF-8
      bytes ≤ the cap
- [x] Property test: normalising then counting is idempotent
- [x] A limit of 0 rejects everything, including the empty string
- [x] No dependency beyond the platform (`Intl.Segmenter`) unless the spike says otherwise
