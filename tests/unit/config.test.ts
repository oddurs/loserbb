import { afterEach, describe, expect, it, vi } from "vitest";
import { DEV_DATABASE_URL, databaseUrl } from "../../db/config.mjs";

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("databaseUrl", () => {
  it("uses DATABASE_URL when it is set", () => {
    vi.stubEnv("DATABASE_URL", "postgres://elsewhere/db");
    expect(databaseUrl()).toBe("postgres://elsewhere/db");
  });

  it("falls back to the docker-compose database outside production", () => {
    vi.stubEnv("DATABASE_URL", "");
    vi.stubEnv("NODE_ENV", "development");
    expect(databaseUrl()).toBe(DEV_DATABASE_URL);
  });

  it("refuses to guess in production", () => {
    vi.stubEnv("DATABASE_URL", "");
    vi.stubEnv("NODE_ENV", "production");
    expect(() => databaseUrl()).toThrow("DATABASE_URL is required in production");
  });
});
