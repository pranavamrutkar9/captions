import { z } from "zod";

export const languageMixSchema = z.enum(["hinglish", "tanglish", "benglish"]);
export const scriptStyleSchema = z.enum(["roman", "mixed_native"]);
export const projectStatusSchema = z.enum([
  "uploaded",
  "extracting",
  "transcribing",
  "normalising",
  "grouping",
  "ready",
  "failed",
]);

export const transcriptWordSchema = z.object({
  idx: z.number().int().nonnegative(),
  text: z.string().min(1),
  startMs: z.number().int().nonnegative(),
  endMs: z.number().int().nonnegative(),
  confidence: z.number().min(0).max(1).optional(),
  estimated: z.boolean(),
}).refine((data) => data.endMs > data.startMs, {
  message: "endMs must be strictly greater than startMs",
});

export const transcriptResultSchema = z.object({
  words: z.array(transcriptWordSchema),
  timingSource: z.enum(["word", "estimated_from_segment"]),
  provider: z.string(),
  rawResponse: z.unknown().optional(),
});

export const normalisationInputSchema = z.object({
  words: z.array(
    z.object({
      idx: z.number().int().nonnegative(),
      text: z.string(),
    })
  ),
  languageMix: languageMixSchema,
  scriptStyle: scriptStyleSchema,
  customWords: z.array(
    z.object({
      wrong: z.string(),
      right: z.string(),
    })
  ),
});

export const normalisationOutputSchema = z.object({
  words: z.array(
    z.object({
      idx: z.number().int().nonnegative(),
      text: z.string(),
    })
  ),
});

export const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
  DATABASE_URL: z.string().optional().default(""),
  NEXT_PUBLIC_SUPABASE_URL: z.string().optional().default(""),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().optional().default(""),
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional().default(""),
  SUPABASE_STORAGE_BUCKET: z.string().default("videos"),
  TRANSCRIPTION_PROVIDER: z.string().default("mock"),
  NORMALISATION_PROVIDER: z.string().default("mock"),
  ENABLE_REAL_GNANI_API: z.preprocess((val) => val === "true" || val === true, z.boolean().default(false)),
  GNANI_API_KEY: z.string().optional().default(""),
  GNANI_API_BASE_URL: z.string().optional().default(""),
  MAX_VIDEO_DURATION_SECONDS: z.coerce.number().int().positive().default(180),
  MAX_UPLOAD_SIZE_MB: z.coerce.number().int().positive().default(100),
  UPLOAD_DIR: z.string().default("./storage/uploads"),
  AUDIO_DIR: z.string().default("./storage/audio"),
  EXPORT_DIR: z.string().default("./storage/exports"),
}).superRefine((data, ctx) => {
  if (data.ENABLE_REAL_GNANI_API) {
    if (!data.GNANI_API_KEY || data.GNANI_API_KEY.trim() === "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["GNANI_API_KEY"],
        message: "GNANI_API_KEY is required when ENABLE_REAL_GNANI_API is enabled.",
      });
    }
  }
});

export const createProjectSchema = z.object({
  title: z.string().min(1).max(255).default("Untitled Project"),
  languageMix: languageMixSchema.default("hinglish"),
  scriptStyle: scriptStyleSchema.default("roman"),
  fixtureId: z.string().optional(),
});
