import "server-only";
import postgres from "postgres";
import { databaseUrl } from "@/db/config.mjs";

// Lazy, so `next build` never needs a database URL, and kept on globalThis so dev
// hot reloads don't open a new pool each time.
const g = globalThis as unknown as { sql?: postgres.Sql };

export function db(): postgres.Sql {
  g.sql ??= postgres(databaseUrl(), { onnotice: () => {} });
  return g.sql;
}
