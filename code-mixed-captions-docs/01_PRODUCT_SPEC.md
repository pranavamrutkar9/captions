# Product Specification

## Product
A creator tool that turns short videos containing Hinglish, Tanglish, or Benglish speech into editable, script-aware captions.

## Users
Indian creators and editors making reels, shorts, and short YouTube videos.

## Language options
- Mix: `hinglish`, `tanglish`, `benglish`
- Script: `roman`, `mixed_native`
- Roman: Indian-language words transliterated into Roman letters; English remains standard English.
- Mixed native: Indian-language words in native script; English remains Roman.

## MVP journey
Upload video → validate media → extract mono WAV → transcribe → normalise spelling/script → group words into cues → edit captions → export SRT.

## Requirements
### Upload
- MP4, MOV, WebM where supported by local FFmpeg.
- Maximum duration 180 seconds.
- Configurable size limit.
- Private storage and clear progress/errors.

### Audio
- FFmpeg extracts mono WAV.
- Fail visibly if extraction fails.

### Transcription
- Provider-independent interface.
- Mock provider by default.
- Support word timestamps and segment-only responses.
- Estimated word timings must be marked `estimated=true`.

### Normalisation
- Preserve word order and one-to-one word identity.
- Preserve raw and normalised text separately.
- Validate every input index appears exactly once; reject missing, duplicate, or extra indices.
- Apply custom vocabulary deterministically.
- Do not translate in this stage.

### Caption grouping
- About 32 characters per line.
- Maximum two visual lines per cue.
- Prefer natural pauses.
- Never span a gap longer than 1.5 seconds.
- Aim for no more than about 17 characters/second; split or flag when exceeded.

### Editor
- Video preview synchronised with active caption.
- Cue list/timeline.
- Click-to-edit words.
- Split and merge cues.
- Adjust start/end times.
- Persist edits.

### Export
- Valid SRT is mandatory.
- ASS and FFmpeg burn-in are stretch goals.

## Out of scope
Diarisation, dubbing, B-roll, teams, payments, full translation workflow, advanced animation, production-scale orchestration.

## Quality principle
The product's value is accurate, editable code-mixed captions with preserved timing—not merely a polished AI-looking interface.
