---
id: 12
uid: 7c7a715b-bd22-44fe-af95-b2df58999d5d
title: Choose an authentication approach
type: spike
status: done
milestone: v0.1
created: 2026-11-01
updated: 2026-11-01
closed_at: 2026-11-01
priority: p0
effort: s
area: accounts
---

## Question

How do people sign up and sign in?

## Timebox

Half a day.

## Options considered

- Clerk through the Vercel Marketplace: hosted flows, email verification, bot protection
- Auth.js with email magic links: we own the data, but we need an email provider
- Passkeys first, with an email fallback

Judge each on sign-up friction, cost at 10k monthly active users, email verification,
an account-deletion API (needed in v0.3), and how hard it is to leave.

## Answer

Own accounts for v0.1: handle and password, scrypt from `node:crypto`, opaque session
tokens stored hashed in Postgres, httpOnly cookie. No outside service, no email provider,
no dependency. Sign-up and handle choice become one step.

Revisit in v0.3 (bot protection, account deletion): if email verification is needed,
that is when a provider earns its place.

## Spawns

- [x] Concrete set-up steps for "Sign up, sign in, sign out"
