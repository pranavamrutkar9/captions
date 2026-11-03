import { envSchema } from "@code-mixed-captions/shared";

function getValidatedEnv() {
  const parsed = envSchema.safeParse(process.env);
  if (!parsed.success) {
    console.error("❌ Invalid environment variables:", parsed.error.format());
    throw new Error(
      `Invalid environment configuration: ${JSON.stringify(parsed.error.flatten().fieldErrors)}`
    );
  }
  return parsed.data;
}

export const env = getValidatedEnv();

export const isMockMode =
  env.TRANSCRIPTION_PROVIDER === "mock" && env.NORMALISATION_PROVIDER === "mock";

export const isRealGnaniEnabled = env.ENABLE_REAL_GNANI_API;

export function assertNoRealGnaniInMock(): void {
  if (isMockMode && env.ENABLE_REAL_GNANI_API) {
    throw new Error(
      "Safety violation: Mock mode is active but ENABLE_REAL_GNANI_API is true. Mock execution must not make real API calls."
    );
  }
}

