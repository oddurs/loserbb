---
id: 43
uid: 2c65d668-ab36-432b-b38c-bc5104859bde
title: Hashtags
type: feature
status: backlog
milestone: v0.4
depends_on:
- 15
created: 2026-11-01
updated: 2026-11-01
priority: p0
effort: m
area: search
---

## Proposal

`#tag` in a post becomes a link to `/tag/<tag>`, which lists posts with that tag, newest first.

## Acceptance criteria

- [ ] Parsing rules (allowed characters, case folding, Unicode letters) are fixture-tested
      next to the counter
- [ ] Tags are stored in a join table at write time, not parsed at read time
- [ ] `/tag/LoserBB` and `/tag/loserbb` are the same page
