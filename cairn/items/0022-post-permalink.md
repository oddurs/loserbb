---
id: 22
uid: a77fc658-55e7-4425-9f5b-cfe7cba57e50
title: Post permalink
type: feature
status: backlog
milestone: v0.2
depends_on:
- 20
created: 2026-11-01
updated: 2026-11-01
priority: p0
effort: s
area: posts
---

## Problem

A post cannot be linked to or replied to without its own page.

## Proposal

`/@handle/p/<id>` renders one post. Ids are opaque and not sequential.

## Acceptance criteria

- [ ] Every timestamp on a timeline links to the permalink
- [ ] A post id under the wrong handle redirects to the right one
- [ ] Open Graph tags give a sensible link preview
- [ ] A missing or deleted post returns 404
