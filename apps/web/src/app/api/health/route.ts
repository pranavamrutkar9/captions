import { NextResponse } from "next/server";
import { env, isMockMode, isRealGnaniEnabled } from "@/lib/env";
import { resolveStoragePath, ensureDirectory } from "@/lib/paths";
import fs from "fs";

export async function GET() {
  ensureDirectory(env.UPLOAD_DIR);
  ensureDirectory(env.AUDIO_DIR);
  ensureDirectory(env.EXPORT_DIR);

  const uploadsPath = resolveStoragePath(env.UPLOAD_DIR);
  const audioPath = resolveStoragePath(env.AUDIO_DIR);
  const exportsPath = resolveStoragePath(env.EXPORT_DIR);

  const uploadsExist = fs.existsSync(uploadsPath);
  const audioExist = fs.existsSync(audioPath);
  const exportsExist = fs.existsSync(exportsPath);

  return NextResponse.json({
    status: "ok",
    phase: "Phase 0 (Setup & Configuration)",
    environment: env.NODE_ENV,
    providers: {
      transcription: env.TRANSCRIPTION_PROVIDER,
      normalisation: env.NORMALISATION_PROVIDER,
      isMockMode,
      enableRealGnaniApi: isRealGnaniEnabled,
    },
    limits: {
      maxVideoDurationSeconds: env.MAX_VIDEO_DURATION_SECONDS,
      maxUploadSizeMb: env.MAX_UPLOAD_SIZE_MB,
    },
    storage: {
      uploadsDir: env.UPLOAD_DIR,
      uploadsPath,
      uploadsReady: uploadsExist,
      audioDir: env.AUDIO_DIR,
      audioPath,
      audioReady: audioExist,
      exportsDir: env.EXPORT_DIR,
      exportsPath,
      exportsReady: exportsExist,
    },
    timestamp: new Date().toISOString(),
  });
}
