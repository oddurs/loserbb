---
id: 14
uid: 53d1c3b8-b918-4834-80c5-68f014e04a1a
title: Pick a handle
type: feature
status: done
milestone: v0.1
depends_on:
- 13
created: 2026-11-01
updated: 2026-11-01
closed_at: 2026-11-01
priority: p0
effort: s
area: accounts
---

## Problem

Posts need an author name people recognise. In a 42-character world handles should be
short too.

## Proposal

After sign-up, before anything else, the user picks a handle.

## Acceptance criteria

- [x] Handles are 1–15 characters of `[a-z0-9_]`, unique case-insensitively
- [x] Reserved words (`admin`, `api`, `settings`, `search`, `about`, and every top-level
      route) are rejected
- [x] A taken handle shows an inline error without losing input
- [x] A user with no handle cannot post; they are sent to the handle step
- [x] Unit tests for validation, e2e test for the flow

## 2026-11-01

Folded into sign-up: the handle is chosen on the sign-up form, so there is no handle-less state.
