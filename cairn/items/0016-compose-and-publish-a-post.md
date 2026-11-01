---
id: 16
uid: 6247b82b-a06c-4b27-ba94-8a3b90282394
title: Compose and publish a post
type: feature
status: doing
milestone: v0.1
depends_on:
- 14
- 15
- 63
created: 2026-11-01
updated: 2026-11-01
priority: p0
effort: m
area: posts
---

## Problem

This is the product.

## Proposal

A composer at the top of the timeline showing today's number and a live remaining count.
A server action validates with the shared counter against today's number and inserts into
`posts (id, author_id, body, char_limit, created_at)`. `char_limit` records the limit the
post was written under, so a profile reads as a diary of constraints.

## Acceptance criteria

- [ ] The counter updates on every keystroke and IME composition, and shows remaining
- [x] Submit is disabled when over today's number or empty
- [x] The server refuses an over-limit body with a clear message and stores nothing, even
      when the client check is bypassed (server actions answer 200, so this is tested on
      `publishPost`, which the action calls)
- [x] A composer loaded before midnight UTC may submit within the grace window under the
      previous day's number; outside it, the server applies today's
- [x] A published post appears at the top of the timeline without a full reload
- [x] HTML in a post is rendered as text, never markup (test with `<script>`)

## 2026-11-01

Left: IME composition is untested. Needs a manual pass with a Japanese or Korean input method.
