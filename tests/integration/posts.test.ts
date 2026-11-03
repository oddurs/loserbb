import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { authenticate, createAccount } from "@/lib/accounts";
import { db } from "@/lib/db";
import { limitFor, utcDay } from "@/lib/limit";
import { decodeCursor, encodeCursor, listPosts, publishPost } from "@/lib/posts";

const sql = db();
afterAll(() => sql.end());
beforeEach(async () => {
  await sql`truncate users, sessions, posts cascade`;
});

async function user(handle = "alice") {
  const r = await createAccount(handle, "password123");
  if (!r.ok) throw new Error(r.error);
  return r.user;
}

describe("accounts", () => {
  it("rejects a taken handle regardless of case", async () => {
    await user("alice");
    expect(await createAccount("ALICE", "password123")).toEqual({
      ok: false,
      error: "That handle is taken.",
    });
  });

  it("authenticates with the right password only, with one message for both failures", async () => {
    await user("alice");
    expect((await authenticate("Alice", "password123")).ok).toBe(true);
    const wrong = await authenticate("alice", "nope-nope");
    const missing = await authenticate("nobody", "password123");
    expect(wrong).toEqual(missing);
  });
});

describe("publishPost", () => {
  const now = new Date("2026-11-01T12:00:00Z");
  const limit = limitFor(utcDay(now), "test-secret");

  it("stores a post within today's number with the limit it was written under", async () => {
    const u = await user();
    const r = await publishPost(u.id, "x".repeat(limit), utcDay(now), now);
    expect(r.ok).toBe(true);
    const [row] = await sql`select body, char_limit from posts`;
    expect(row).toEqual({ body: "x".repeat(limit), char_limit: limit });
  });

  it("refuses one character over and stores nothing, whatever the client sent", async () => {
    const u = await user();
    const r = await publishPost(u.id, "x".repeat(limit + 1), utcDay(now), now);
    expect(r).toEqual({ ok: false, error: `Today's number is ${limit}. That was ${limit + 1}.` });
    expect((await sql`select count(*)::int as n from posts`)[0].n).toBe(0);
  });

  it("stores markup verbatim; escaping is the renderer's job", async () => {
    const u = await user();
    await publishPost(u.id, "<i>", null, now);
    expect((await sql`select body from posts`)[0].body).toBe("<i>");
  });
});

describe("listPosts", () => {
  it("pages newest first and keeps posts that share a timestamp", async () => {
    const u = await user();
    const at = new Date("2026-11-01T12:00:00.000Z");
    await sql`insert into posts (author_id, body, char_limit, created_at) values
      (${u.id}, 'old', 10, ${new Date(at.getTime() - 1000)}),
      (${u.id}, 'tie-a', 10, ${at}),
      (${u.id}, 'tie-b', 10, ${at})`;

    const seen: string[] = [];
    let cursor = null;
    do {
      const page = await listPosts(cursor, 1);
      seen.push(...page.posts.map((p) => p.body));
      cursor = page.next && decodeCursor(encodeCursor(page.next));
    } while (cursor);

    expect(seen).toHaveLength(3);
    expect(new Set(seen.slice(0, 2))).toEqual(new Set(["tie-a", "tie-b"]));
    expect(seen[2]).toBe("old");
  });

  it("rejects cursors it did not write", () => {
    expect(decodeCursor("nope")).toBeNull();
    expect(decodeCursor("2026-11-01T12:00:00.000Z_not-a-uuid")).toBeNull();
    expect(decodeCursor("2026-13-01_00000000-0000-0000-0000-000000000000")).toBeNull();
  });
});
