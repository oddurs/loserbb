// Applies db/migrations/*.sql in name order, each once, each in its own transaction.
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import postgres from "postgres";
import { databaseUrl } from "../db/config.mjs";

export async function migrate(url) {
    const sql = postgres(url, { onnotice: () => {} });
    try {
        await sql`create table if not exists schema_migrations (
      name text primary key,
      applied_at timestamptz not null default now()
    )`;
        const done = new Set((await sql`select name from schema_migrations`).map((r) => r.name));
        const dir = join(import.meta.dirname, "..", "db", "migrations");
        const files = (await readdir(dir)).filter((f) => f.endsWith(".sql")).sort();
        for (const file of files) {
            if (done.has(file)) continue;
            const text = await readFile(join(dir, file), "utf8");
            await sql.begin(async (tx) => {
                await tx.unsafe(text);
                await tx`insert into schema_migrations (name) values (${file})`;
            });
            console.log(`applied ${file}`);
        }
    } finally {
        await sql.end();
    }
}

if (import.meta.url === `file://${process.argv[1]}`) {
    await migrate(databaseUrl());
}
