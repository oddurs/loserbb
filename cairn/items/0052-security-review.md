---
id: 52
uid: a1f69602-19f7-4184-92b7-036772336e64
title: Security review
type: chore
status: backlog
milestone: v1.0
created: 2026-11-01
updated: 2026-11-01
priority: p0
effort: m
area: infra
---

## Acceptance criteria

- [ ] Reviewed: auth and session handling, CSRF on server actions, XSS through post
      bodies, handles, and bios, authorisation on every mutation, rate-limit bypass
- [ ] Each finding is an item; all p0 findings are closed before v1.0
- [ ] Security headers (CSP, HSTS, frame-ancestors) are set and tested
