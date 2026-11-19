import "server-only";
import { createHash, randomBytes } from "node:crypto";
import { cookies } from "next/headers";
import type { User } from "./accounts";
import { db } from "./db";

const COOKIE = "sid";
const TTL_MS = 30 * 24 * 60 * 60 * 1000;

// Only a hash of the token is stored, so a database leak does not hand out sessions.
const digest = (token: string) => createHash("sha256").update(token).digest("base64url");

export async function startSession(userId: string): Promise<void> {
  const token = randomBytes(32).toString("base64url");
  const expires = new Date(Date.now() + TTL_MS);
  await db()`insert into sessions (token_hash, user_id, expires_at) values (${digest(token)}, ${userId}, ${expires})`;
  (await cookies()).set(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires,
  });
}

export async function endSession(): Promise<void> {
  const jar = await cookies();
  const token = jar.get(COOKIE)?.value;
  if (token) await db()`delete from sessions where token_hash = ${digest(token)}`;
  jar.delete(COOKIE);
}

export async function currentUser(): Promise<User | null> {
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token) return null;
  const [user] = await db()<User[]>`
    select u.id, u.handle from sessions s join users u on u.id = s.user_id
    where s.token_hash = ${digest(token)} and s.expires_at > now()`;
  return user ?? null;
}
