// Fail at startup, not on the first request, when production is missing configuration.
export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;
  const { limitSecret } = await import("./lib/limit");
  const { databaseUrl } = await import("./db/config.mjs");
  limitSecret();
  databaseUrl();
}
