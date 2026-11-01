import "server-only";
import { BYTE_CAP, check } from "./count";
import { db } from "./db";
import { limitDay, limitFor, limitSecret } from "./limit";

export type Post = { id: string; handle: string; body: string; charLimit: number; createdAt: Date };
export type Cursor = { at: Date; id: string };
export type PublishResult = { ok: true; id: string } | { ok: false; error: string };

export const PAGE_SIZE = 50;

/** The server's word on a post. The composer checks too, but this is what counts. */
export async function publishPost(
  authorId: string,
  text: string,
  composerDay: string | null,
  now = new Date(),
): Promise<PublishResult> {
  const limit = limitFor(limitDay(composerDay, now), limitSecret());
  const c = check(text, limit);
  if (c.problem === "empty") return { ok: false, error: "Write something first." };
  if (c.problem === "over") return { ok: false, error: `Today's number is ${limit}. That was ${c.count}.` };
  if (c.problem === "bytes") return { ok: false, error: `Too heavy: posts are capped at ${BYTE_CAP} bytes.` };
  const [row] = await db()<{ id: string }[]>`
    insert into posts (author_id, body, char_limit) values (${authorId}, ${c.body}, ${limit})
    returning id`;
  return { ok: true, id: row.id };
}

export async function listPosts(
  cursor: Cursor | null,
  pageSize = PAGE_SIZE,
): Promise<{ posts: Post[]; next: Cursor | null; asOf: Date }> {
  const sql = db();
  // asOf is the database's clock at query time, so relative times on the page agree with the data.
  const rows = await sql<(Post & { asOf: Date })[]>`
    select p.id, u.handle, p.body, p.char_limit as "charLimit", p.created_at as "createdAt",
      statement_timestamp() as "asOf"
    from posts p join users u on u.id = p.author_id
    ${cursor ? sql`where (p.created_at, p.id) < (${cursor.at}, ${cursor.id}::uuid)` : sql``}
    order by p.created_at desc, p.id desc
    limit ${pageSize + 1}`;
  const posts: Post[] = rows.slice(0, pageSize).map((r) => ({
    id: r.id,
    handle: r.handle,
    body: r.body,
    charLimit: r.charLimit,
    createdAt: r.createdAt,
  }));
  const last = posts.at(-1);
  const next = rows.length > pageSize && last ? { at: last.createdAt, id: last.id } : null;
  return { posts, next, asOf: rows[0]?.asOf ?? new Date(0) };
}

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

export function encodeCursor(c: Cursor): string {
  return `${c.at.toISOString()}_${c.id}`;
}

/** Null for anything that is not a cursor this server wrote. */
export function decodeCursor(raw: string): Cursor | null {
  const [iso, id, extra] = raw.split("_");
  if (extra !== undefined || !id || !UUID.test(id)) return null;
  const at = new Date(iso);
  if (Number.isNaN(at.getTime()) || at.toISOString() !== iso) return null;
  return { at, id };
}
