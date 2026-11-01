import { defineConfig, devices } from "@playwright/test";
import { TEST_DATABASE_URL } from "./db/config.mjs";

const PORT = 4243;

export default defineConfig({
  testDir: "e2e",
  globalSetup: "./tests/setup-db.ts",
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  use: { baseURL: `http://localhost:${PORT}`, trace: "retain-on-failure" },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: `pnpm build && pnpm exec next start -p ${PORT}`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: false,
    timeout: 180_000,
    env: { DATABASE_URL: TEST_DATABASE_URL, LIMIT_SECRET: "e2e-secret" },
  },
});
