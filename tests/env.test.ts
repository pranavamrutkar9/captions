import { describe, it, expect } from "vitest";
import { envSchema } from "@code-mixed-captions/shared";

describe("Environment Configuration & Zero-Credit Safety", () => {
  it("defaults to mock providers and disables real Gnani API", () => {
    const config = envSchema.parse({
      NODE_ENV: "development",
    });

    expect(config.TRANSCRIPTION_PROVIDER).toBe("mock");
    expect(config.NORMALISATION_PROVIDER).toBe("mock");
    expect(config.ENABLE_REAL_GNANI_API).toBe(false);
    expect(config.MAX_VIDEO_DURATION_SECONDS).toBe(180);
    expect(config.MAX_UPLOAD_SIZE_MB).toBe(100);
    expect(config.UPLOAD_DIR).toBe("./storage/uploads");
  });

  it("succeeds in mock mode without any GNANI_API_KEY", () => {
    const result = envSchema.safeParse({
      TRANSCRIPTION_PROVIDER: "mock",
      NORMALISATION_PROVIDER: "mock",
      ENABLE_REAL_GNANI_API: "false",
      GNANI_API_KEY: "",
    });

    expect(result.success).toBe(true);
  });

  it("fails fast if ENABLE_REAL_GNANI_API is enabled without GNANI_API_KEY", () => {
    const result = envSchema.safeParse({
      TRANSCRIPTION_PROVIDER: "gnani",
      ENABLE_REAL_GNANI_API: "true",
      GNANI_API_KEY: "",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      expect(fieldErrors.GNANI_API_KEY).toBeDefined();
      expect(fieldErrors.GNANI_API_KEY?.[0]).toContain("GNANI_API_KEY is required");
    }
  });

  it("allows real API only when both flag and key are explicitly provided", () => {
    const result = envSchema.safeParse({
      TRANSCRIPTION_PROVIDER: "gnani",
      ENABLE_REAL_GNANI_API: "true",
      GNANI_API_KEY: "test-secret-key-12345",
    });

    expect(result.success).toBe(true);
  });
});

