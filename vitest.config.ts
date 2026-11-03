import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
  },
  resolve: {
    alias: {
      "@shared": path.resolve(__dirname, "./packages/shared/src"),
      "@code-mixed-captions/shared": path.resolve(__dirname, "./packages/shared/src/index.ts"),
      "@": path.resolve(__dirname, "./apps/web/src"),
    },
  },
});
