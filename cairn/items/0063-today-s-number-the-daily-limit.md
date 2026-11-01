---
id: 63
uid: 8ee3d0cc-6c5d-45a9-aa8e-ba920ebb5975
title: 'Today''s number: the daily limit'
type: feature
status: done
milestone: v0.1
depends_on:
- 10
created: 2026-11-01
updated: 2026-11-01
closed_at: 2026-11-01
priority: p0
effort: s
area: posts
---

## Problem

A fixed limit gets stale. One shared number per day gives everyone the same constraint
and something to talk about: a 40 day is for jokes, a 3 day is all emoji.

## Proposal

`limitFor(date)` returns an integer 1 to 42 for a UTC day. It is derived from
HMAC-SHA256 of the date under a server secret (`LIMIT_SECRET`), so nobody can compute
next week's numbers, and mapped through a weighted table so the middle is common and
1 to 3 are rare. Only the server computes it; pages receive today's number.

## Acceptance criteria

- [x] Deterministic: the same date and secret always give the same number
- [x] Over 10,000 consecutive days: every value 1 to 42 occurs, 1 to 3 together occur
      between 1% and 5% of days, and the median is between 15 and 30
- [x] Production refuses to start without `LIMIT_SECRET`; development uses a fixed default
- [x] Grace window: a submission stamped with yesterday's date is accepted under
      yesterday's number for 5 minutes after midnight UTC, never longer
- [x] The timeline header shows "Today: N"

## 2026-11-01

Built. Deviation: a missing LIMIT_SECRET in production fails the first request that needs it, not process start.

## 2026-11-01

Moved the 'no future number is revealed' check to 0066 (day pages), the first surface that takes a date. Startup check lives in instrumentation.ts: without LIMIT_SECRET the server logs the error and serves nothing, though the process does not exit.
