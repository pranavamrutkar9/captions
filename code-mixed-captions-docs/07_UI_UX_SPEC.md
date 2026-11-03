# UI/UX Specification

## Direction
A focused creator utility, not a generic analytics dashboard. Keep the video and caption workflow central.

## Projects/upload screen
- Product title and concise value proposition.
- Upload dropzone.
- Supported formats, duration and size limits.
- Language mix selector: Hinglish/Tanglish/Benglish.
- Script selector: Roman/Mixed native.
- Custom vocabulary entry point.
- Recent projects and processing statuses.
- Demo-mode notice when mocks are active.

## Editor screen
- Main video preview.
- Caption cue list/editor alongside it.
- Playback controls and simple timeline.
- Project title, language/script settings, status, export action.
- Clicking cue seeks to cue start; active cue follows playback.
- Click word to edit inline.
- Explicit split/merge controls.
- Timing editable through numeric controls or simple handles.
- Unsaved state indicator.

## Preview
- Captions over video.
- Default vertical-video placement above bottom 20% safe area.
- Readable type and restrained styling.
- Correct rendering of Roman and native-script text.

## Status/error states
Uploading, validating, extracting, transcribing, normalising, grouping, ready, failed. Errors explain the failed stage and offer safe retry.

## Demo honesty
Show `Demo mode — AI providers are mocked`. If a fixture is used with an uploaded video, disclose `Sample transcript — not generated from uploaded audio`.
