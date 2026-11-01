// The one place that decides which database to use. Development falls back to the
// docker-compose database so no env file is needed; production must say.
export const DEV_DATABASE_URL = "postgres://loserbb:loserbb@localhost:54342/loserbb";
export const TEST_DATABASE_URL = "postgres://loserbb:loserbb@localhost:54342/loserbb_test";

/** @returns {string} */
export function databaseUrl() {
  const url = process.env.DATABASE_URL;
  if (url) return url;
  if (process.env.NODE_ENV === "production") throw new Error("DATABASE_URL is required in production");
  return DEV_DATABASE_URL;
}
