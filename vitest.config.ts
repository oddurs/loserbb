import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";
import { TEST_DATABASE_URL } from "./db/config.mjs";

export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL(".", import.meta.url)),
      "server-only": fileURLToPath(new URL("tests/stubs/server-only.ts", import.meta.url)),
    },
  },
  test: {
    include: ["tests/**/*.test.ts"],
    globalSetup: ["tests/setup-db.ts"],
    env: { DATABASE_URL: TEST_DATABASE_URL, LIMIT_SECRET: "test-secret" },
    fileParallelism: false,
  },
});
