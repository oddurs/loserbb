# Changelog

All notable changes to this project are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Today's number: every UTC day gets a character limit from 1 to 42, chosen by a keyed
  hash of the date so future days can't be computed.
- Sign up and log in with a handle and password.
- Post within today's number. Characters are counted as what you see: an emoji, a flag,
  or an accented letter counts once. Each post keeps the limit it was written under.
- A global timeline, newest first, with paging.
