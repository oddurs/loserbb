---
id: 54
uid: cb7f6659-3ae5-428e-a2d5-a7e31b3bdefd
title: Freeze and document the character rule and URL scheme
type: docs
status: backlog
milestone: v1.0
created: 2026-11-01
updated: 2026-11-01
priority: p0
effort: s
area: docs
---

## Why

At v1.0, changing how the limit works or breaking a permalink is a bug. The number
changes daily; the mechanism must not.

## Acceptance criteria

- [ ] `docs/rules.md` states the counting rule with examples from the fixture file
- [ ] It states the daily mechanism: range 1 to 42, UTC day boundary, grace window, and
      that a post keeps the limit it was written under forever
- [ ] It states the reply funnel rule
- [ ] Rotating `LIMIT_SECRET` is documented as forbidden, since it would rewrite history
- [ ] Every public URL pattern is listed; tests assert each one resolves
- [ ] The README links to both
