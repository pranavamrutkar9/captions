# Code-Mixed Captions MVP

A creator tool turning short videos containing Hinglish, Tanglish, or Benglish speech into editable, script-aware captions with preserved timing.

## Safety & Vendor Integration Policy
- **Zero Real API Calls in Development**: Real Gnani API calls are strictly disabled by default (`ENABLE_REAL_GNANI_API=false`).
- **No Credit Consumption**: Mock providers (`TRANSCRIPTION_PROVIDER=mock`, `NORMALISATION_PROVIDER=mock`) are active by default.
- **Provider Boundaries**: All ASR and normalisation logic sits behind clean interfaces with deterministic local fixtures.

---

## Phase Plan & Status

| Phase | Description | Status |
|---|---|---|
| **Phase 0** | **Inspection, Monorepo Setup, Types, Env Validation & Local Storage** | **COMPLETED** |
| Phase 1 | Video Upload, ffprobe Media Validation & Project Creation | Gated (Pending Approval) |
| Phase 2 | FFmpeg Audio Extraction & Metadata Capture | Gated (Pending Approval) |
| Phase 3 | Mock Provider Pipeline, Fixtures & Exact Index Normalisation | Gated (Pending Approval) |
| Phase 4 | Caption Grouping Rules & Valid SRT Generator | Gated (Pending Approval) |
| Phase 5 | Interactive Editor, Video Sync, Word Editing & Split/Merge | Gated (Pending Approval) |
| Phase 6 | Caption Styling, Indic Noto Fonts & FFmpeg Burn-in (Stretch) | Gated (Pending Approval) |
| Phase 7 | Real Gnani Provider Adapter (Strict User Approval Only) | Gated (Pending Approval) |
| Phase 8 | End-to-End Hardening & Demo Preparation | Gated (Pending Approval) |

---

## Project Structure

```text
code-mixed-captions/
├── apps/
│   └── web/                               # Next.js 14 App Router application
│       ├── src/
│       │   ├── app/
│       │   │   ├── page.tsx               # Phase 0 verification UI
│       │   │   ├── layout.tsx             # Root layout with Tailwind
│       │   │   ├── globals.css            # Styles & base config
│       │   │   └── api/
│       │   │       └── health/route.ts    # Health check & env status
│       │   ├── lib/
│       │   │   └── env.ts                 # Zod environment validation & safety asserts
│       │   └── server/
│       │       └── db.ts                  # Local storage adapter (zero external dependencies)
│       ├── package.json
│       ├── tsconfig.json
│       ├── next.config.mjs
│       └── tailwind.config.ts
├── packages/
│   └── shared/                            # Provider-neutral types & schemas
│       ├── src/
│       │   ├── types/                     # Project, Word, CaptionLine, TranscriptWord
│       │   ├── schemas/                   # Zod schemas for validation
│       │   ├── constants/                 # Limits & 6 deterministic fixtures
│       │   └── index.ts
│       ├── package.json
│       └── tsconfig.json
├── storage/                               # Local media & database directories
│   ├── uploads/                           # Raw uploaded video files (.gitkeep)
│   ├── audio/                             # Extracted mono WAV audio (.gitkeep)
│   └── exports/                           # Generated SRT / ASS exports (.gitkeep)
├── tests/                                 # Unit & integration tests
│   ├── env.test.ts                        # Env validation & safety tests
│   ├── fixtures.test.ts                   # Fixture timing & contract tests
│   └── mock-isolation.test.ts             # Zero network call assertion in mock mode
├── .env.example                           # Standard environment defaults template
├── .env.local                             # Local development configuration
├── package.json                           # Root workspace definition
├── pnpm-workspace.yaml                    # pnpm monorepo configuration
├── vitest.config.ts                       # Test runner configuration
└── README.md
```

---

## Quickstart (Phase 0)

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Run Tests
```bash
pnpm test
```

### 3. Run Typecheck
```bash
pnpm typecheck
```

### 4. Start Local Development Server
```bash
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) to view the Phase 0 verification dashboard.
Check [http://localhost:3000/api/health](http://localhost:3000/api/health) for JSON health status.
