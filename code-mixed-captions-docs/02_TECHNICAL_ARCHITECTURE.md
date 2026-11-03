# Technical Architecture

## Suggested stack
- Next.js App Router, React, TypeScript.
- Tailwind CSS.
- Zod validation.
- FFmpeg/ffprobe installed locally.
- Local filesystem for initial development; private Supabase Storage can be added later.
- Database adapter: local SQLite/Prisma or Supabase Postgres, choosing the least-friction option compatible with the existing repository.
- Vitest; Playwright if time permits.

Avoid Redis, BullMQ, Docker, and distributed workers for the first local prototype unless already required.

## Structure
```text
code-mixed-captions/
├── apps/web/src/
│   ├── app/
│   │   ├── page.tsx
│   │   ├── projects/[projectId]/page.tsx
│   │   └── api/
│   ├── components/{upload,editor,player,captions}/
│   ├── features/{projects,transcription,normalisation,captioning,export}/
│   ├── lib/
│   └── server/
├── packages/shared/src/{schemas,types,constants}/
├── scripts/
├── storage/{uploads,audio,exports}/
├── tests/
├── .env.example
├── package.json
└── README.md
```

## Provider boundaries
Define:
- `TranscriptionProvider.transcribe(audioPath, options)`
- `NormalisationProvider.normalise(words, options)`

Implement `MockTranscriptionProvider` and `MockNormalisationProvider` first. Future adapters may include `GnaniPrismaTranscriptionProvider` and an Evon adapter only if its access method is confirmed.

## Pipeline
`upload → validate → extract audio → transcribe → validate transcript → normalise → validate normalisation → group captions → ready`

Each stage has typed input/output, persisted status, visible errors, and independent tests.

## Time policy
Use integer milliseconds internally. Validate start >= 0, end > start, and cue/word times within media duration. If only segment timing exists, estimate word timing heuristically and mark every affected word `estimated=true`.

## Security
Keep secrets server-side. Inspect media with ffprobe; don't trust file extensions. Use generated storage names. Keep uploaded files private. Don't log secrets or signed URLs. Implement project/file deletion. Do not claim seven-day deletion until it exists.
