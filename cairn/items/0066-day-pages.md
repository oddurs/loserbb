---
id: 66
uid: 6e851ee6-1f98-43ea-a8e7-321bb1f6178c
title: Day pages
type: feature
status: backlog
milestone: v0.2
depends_on:
- 17
- 63
created: 2026-11-01
updated: 2026-11-01
priority: p2
effort: s
area: timeline
---

## Problem

Each day has its own number, and the posts written under it belong together. There is
no way to look back at a day.

## Proposal

`/day/YYYY-MM-DD` shows that day's number and its posts, newest first. `/day` lists
past days with their numbers.

## Acceptance criteria

- [ ] Uses the global timeline's cursor pagination, filtered to the UTC day
- [ ] A future date returns 404 and never reveals that day's number (tested)
- [ ] Today's page shows the number in large type and links to the composer
- [ ] Every post's timestamp area shows the limit it was written under and links to its day
