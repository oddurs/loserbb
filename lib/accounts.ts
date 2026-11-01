import "server-only";
import { db } from "./db";
import { handleProblem, normalizeHandle } from "./handle";
import { MAX_PASSWORD, MIN_PASSWORD, hashPassword, verifyPassword } from "./password";

export type User = { id: string; handle: string };
type Result = { ok: true; user: User } | { ok: false; error: string };

export async function createAccount(rawHandle: string, password: string): Promise<Result> {
  const handle = normalizeHandle(rawHandle);
  const problem = handleProblem(handle);
  if (problem) return { ok: false, error: problem };
  if (password.length < MIN_PASSWORD || password.length > MAX_PASSWORD) {
    return { ok: false, error: `Passwords are ${MIN_PASSWORD}–${MAX_PASSWORD} characters.` };
  }
  const hash = await hashPassword(password);
  const rows = await db()<User[]>`
    insert into users (handle, password_hash) values (${handle}, ${hash})
    on conflict (handle) do nothing
    returning id, handle`;
  if (rows.length === 0) return { ok: false, error: "That handle is taken." };
  return { ok: true, user: rows[0] };
}

// Hashing a throwaway password when the handle is unknown keeps the response time
// from revealing which handles exist.
let dummyHash: Promise<string> | undefined;

export async function authenticate(rawHandle: string, password: string): Promise<Result> {
  const handle = normalizeHandle(rawHandle);
  const [row] = await db()<(User & { password_hash: string })[]>`
    select id, handle, password_hash from users where handle = ${handle}`;
  const stored = row?.password_hash ?? (await (dummyHash ??= hashPassword("not-a-real-password")));
  const ok = await verifyPassword(password, stored);
  if (!row || !ok) return { ok: false, error: "Wrong handle or password." };
  return { ok: true, user: { id: row.id, handle: row.handle } };
}
