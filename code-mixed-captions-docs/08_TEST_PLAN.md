# Test Plan

## Fixture text
Use the six fixture transcripts listed in `04_MOCK_PROVIDER_SPEC.md` as expected fixture content, not as evidence of real ASR accuracy.

## Normalisation tests
- Exact index set accepted.
- Missing, duplicate, or extra index rejected.
- Empty output rejected.
- Custom vocabulary applied deterministically.
- Timing remains joined by index, not array position.

## Caption grouping tests
- Break at natural pauses.
- No cue spans a gap >1.5 seconds.
- Maximum two display lines.
- Aim for ~32 characters per line.
- Aim for <=17 characters/second; split or flag if exceeded.
- Preserve order and punctuation.
- Keep times within media duration.

## SRT tests
- Correct `HH:MM:SS,mmm` timestamps.
- Sequential numbering.
- No negative/reversed times.
- Correct cue text/newlines.

## Media tests
- Reject invalid media and unsupported types.
- Reject over-limit size/duration.
- Handle ffprobe/FFmpeg failures visibly.

## Mock integration test
Upload video → extract audio → select fixture → mock transcription → mock normalisation → group cues → edit word → split/merge cue → export SRT → reload and verify persistence.

Assert no outbound Gnani request occurs in mock mode.

## Future real-model metrics
Measure WER against human-verified references, manual corrections/minute, true vs estimated timestamp proportion, timing drift, and normalisation validation failures. Fewer than three manual fixes/minute is a target to measure, not a claim to make without evidence.
