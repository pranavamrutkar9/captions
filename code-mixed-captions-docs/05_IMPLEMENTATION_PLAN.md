# Implementation Plan

Build one phase at a time. After each phase, report changed files, commands, test results, limitations, manual test steps, and wait for explicit approval.

## Phase 0 — Inspect and setup
Inspect existing repo; report stack and conflicts. Create minimal structure/config/env validation. Gate: app starts; typecheck/lint pass.

## Phase 1 — Upload
Build upload UI, validate size/type/duration using ffprobe, store safely, create project/status. Gate: valid upload succeeds; invalid/oversized/overlong files rejected.

## Phase 2 — FFmpeg
Extract mono WAV, record metadata, surface errors. Gate: verify output with ffprobe.

## Phase 3 — Mock pipeline
Implement provider interfaces and deterministic fixtures. Validate indices and timestamp alignment. Gate: complete pipeline works without network calls.

## Phase 4 — Caption grouping and SRT
Implement pause-aware grouping, line length, two-line limit, reading-speed handling, valid SRT. Gate: unit tests pass and SRT opens in a subtitle tool.

## Phase 5 — Editor
Video sync, cue list, word editing, split/merge, timing controls, persistence. Gate: edits survive reload and preview stays synchronised.

## Phase 6 — Style and burn-in (stretch)
Style presets, ASS generation, Noto fonts for Indic scripts, FFmpeg burn-in. Gate: test Roman/native scripts on vertical and horizontal video.

## Phase 7 — Real API integration (only with explicit approval)
Use official docs only. Keep calls disabled by default. Add credit warning and explicit user action. Test with a short clip only after user authorises spending credits.

## Phase 8 — Hardening/demo
Test fixtures, pauses, fast speech, numbers, names, noise states, deletion. Demo claims must match actual functionality.
