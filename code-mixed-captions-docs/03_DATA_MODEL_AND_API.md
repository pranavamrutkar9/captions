# Data Model and Internal API

## Entities
### Project
`id`, `title`, `videoPath`, `durationMs`, `languageMix`, `scriptStyle`, `status`, `errorMessage`, `createdAt`, `updatedAt`.

`languageMix`: `hinglish | tanglish | benglish`
`scriptStyle`: `roman | mixed_native`
`status`: `uploaded | extracting | transcribing | normalising | grouping | ready | failed`

### Word
`id`, `projectId`, `idx`, `textRaw`, `textNorm`, `startMs`, `endMs`, `confidence?`, `estimated`.

### CaptionLine
`id`, `projectId`, `idx`, `wordFrom`, `wordTo`, `startMs`, `endMs`, `text`, `translationEn?`.

### CustomWord
`id`, `wrong`, `right`, `userId?`.

### CaptionStyle
`id`, `name`, `fontFamily`, `fontSize`, `color`, `outlineColor`, `outlineWidth`, `position`, `highlightColor?`.

### Export
`id`, `projectId`, `type`, `path`, `createdAt`.
`type`: `srt | ass | burned`

## Internal contracts
```ts
type TranscriptWord = {
  idx: number;
  text: string;
  startMs: number;
  endMs: number;
  confidence?: number;
  estimated: boolean;
};

type TranscriptResult = {
  words: TranscriptWord[];
  timingSource: "word" | "estimated_from_segment";
  provider: string;
  rawResponse?: unknown;
};

type NormalisationInput = {
  words: Array<{ idx: number; text: string }>;
  languageMix: "hinglish" | "tanglish" | "benglish";
  scriptStyle: "roman" | "mixed_native";
  customWords: Array<{ wrong: string; right: string }>;
};

type NormalisationOutput = {
  words: Array<{ idx: number; text: string }>;
};
```

Normalisation output must contain exactly the same indices once each, with no missing/extra indices. Preserve timing by joining on `idx`, never array position alone.

## Suggested application routes
- `POST /api/projects`
- `GET /api/projects`
- `GET /api/projects/:id`
- `POST /api/projects/:id/process`
- `PATCH /api/projects/:id/words/:idx`
- `PATCH /api/projects/:id/lines/:lineId`
- `POST /api/projects/:id/lines/split`
- `POST /api/projects/:id/lines/merge`
- `POST /api/projects/:id/export/srt`
- `DELETE /api/projects/:id`

These are app-owned routes, not Gnani endpoints.
