---
id: 31
uid: 82893d4e-60c2-4e9c-bf05-a3be72e9e6ab
title: Linkify URLs
type: feature
status: backlog
milestone: v0.2
depends_on:
- 15
created: 2026-11-01
updated: 2026-11-01
priority: p2
effort: s
area: posts
---

## Proposal

URLs in posts render as links, using the URL counting rule decided in the character spike.

## Acceptance criteria

- [ ] Only `http` and `https` become links; `javascript:` never does (tested)
- [ ] Links carry `rel="nofollow ugc noopener"`
