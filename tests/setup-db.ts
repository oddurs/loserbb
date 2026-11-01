import postgres from "postgres";
import { DEV_DATABASE_URL, TEST_DATABASE_URL } from "../db/config.mjs";
import { migrate } from "../scripts/migrate.mjs";

// A fresh, migrated test database for every run, so no test depends on leftovers.
export default async function setup() {
  const admin = postgres(DEV_DATABASE_URL, { onnotice: () => {} });
  try {
    await admin`drop database if exists loserbb_test with (force)`;
    await admin`create database loserbb_test`;
  } finally {
    await admin.end();
  }
  await migrate(TEST_DATABASE_URL);
}
