---
id: 30
uid: 24aa7fe7-dd22-445e-aa93-ae8440553460
title: Mentions
type: feature
status: backlog
milestone: v0.2
depends_on:
- 15
- 29
created: 2026-11-01
updated: 2026-11-01
priority: p1
effort: m
area: social
---

## Proposal

`@handle` in a post becomes a link to that profile and notifies the mentioned account.

## Acceptance criteria

- [ ] Mention parsing lives next to the counter and shares its fixture style
- [ ] Mentions of unknown handles render as plain text
- [ ] The mentioned account gets one notification even if mentioned twice
- [ ] The character count of a mention follows the rule from the character spike
