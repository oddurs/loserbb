---
id: 8
uid: 02b5ff4f-2e15-46e3-8ec6-93fec85060d4
title: Define what counts as a character
type: spike
status: done
milestone: v0.1
created: 2026-11-01
updated: 2026-11-01
closed_at: 2026-11-01
priority: p0
effort: s
area: posts
---

## Question

What exactly is a character? Every post is measured against today's number (1 to 42),
and that measurement is frozen at v1.0, so it has to be chosen on purpose rather than
taken from `String.length`.

## Timebox

Half a day.

## Options considered

- UTF-16 code units (`.length`): an emoji costs 2, a family emoji costs 8. Unfair and
  invisible to users.
- Code points: better, but ZWJ sequences and flags still cost several.
- Grapheme clusters (`Intl.Segmenter`): matches what a person sees, so a 1 day allows
  exactly one emoji. Risk: browser and Node ICU versions can segment new emoji
  differently; the server must be the authority.

Also decide:

- Normalisation (NFC before counting?) and trimming of leading/trailing whitespace
- Whether newlines are allowed, and whether runs of whitespace are collapsed
- A byte cap independent of the day's number. One grapheme can carry hundreds of
  combining marks (zalgo), so a character count is not a storage bound.
- URLs: count in full, or at a fixed weight? On a 9 day a URL cannot fit at all.
- Whether @mentions and #hashtags count in full

## Answer

Grapheme clusters via `Intl.Segmenter` after NFC normalisation and trimming. Newlines are
allowed and count as one character each. Runs of whitespace are not collapsed. UTF-8 cap
of 400 bytes per post regardless of the limit. URLs, mentions, and hashtags count in full:
on a short day they simply do not fit, which is the point.

## Spawns

- [x] A fixture file of test vectors (input, limit, expected count, accepted?) that the
      counter library's tests read
