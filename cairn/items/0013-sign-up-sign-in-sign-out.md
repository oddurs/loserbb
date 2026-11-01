---
id: 13
uid: 8a351b06-1014-452d-8ec7-20da89f06836
title: Sign up, sign in, sign out
type: feature
status: done
milestone: v0.1
depends_on:
- 11
- 12
created: 2026-11-01
updated: 2026-11-01
closed_at: 2026-11-01
priority: p0
effort: m
area: accounts
---

## Problem

Nobody can post without an identity.

## Proposal

Implement the approach chosen in the authentication spike. Store a `users` row keyed to
the provider's id.

## Acceptance criteria

- [x] A new visitor can sign up, is signed in, and lands on the timeline
- [x] Sign out ends the session; a protected action afterwards redirects to sign-in
- [x] A `users` row exists for every signed-up account
- [x] E2E test covers sign-up, sign-out, sign-in
