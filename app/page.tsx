import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Composer } from "./composer";
import { todaysLimit } from "@/lib/limit";
import { decodeCursor, encodeCursor, listPosts } from "@/lib/posts";
import { currentUser } from "@/lib/session";

export default function Home({ searchParams }: PageProps<"/">) {
  return (
    <>
      <Suspense>
        <ComposerSlot />
      </Suspense>
      <Suspense fallback={<p className="text-neutral-500">Loading…</p>}>
        <Timeline searchParams={searchParams} />
      </Suspense>
    </>
  );
}

async function ComposerSlot() {
  const user = await currentUser();
  if (!user) {
    return (
      <p className="mb-4 text-sm text-neutral-500">
        <Link href="/signup" className="underline">
          Sign up
        </Link>{" "}
        to post.
      </p>
    );
  }
  const { day, limit } = todaysLimit();
  return <Composer day={day} limit={limit} />;
}

async function Timeline({ searchParams }: Pick<PageProps<"/">, "searchParams">) {
  const before = (await searchParams).before;
  let cursor = null;
  if (typeof before === "string") {
    cursor = decodeCursor(before);
    if (!cursor) notFound();
  }
  const { posts, next, asOf } = await listPosts(cursor);

  if (posts.length === 0) return <p className="text-neutral-500">Nothing yet.</p>;
  return (
    <>
      <ol className="divide-y divide-neutral-200 dark:divide-neutral-800">
        {posts.map((p) => (
          <li key={p.id} className="py-3" data-testid="post">
            <div className="flex gap-2 text-sm text-neutral-500">
              <span className="font-medium text-neutral-900 dark:text-neutral-100">@{p.handle}</span>
              <time dateTime={p.createdAt.toISOString()}>{ago(asOf.getTime() - p.createdAt.getTime())}</time>
              <span title="The limit this was written under">· {p.charLimit}</span>
            </div>
            <p className="whitespace-pre-wrap break-words text-lg">{p.body}</p>
          </li>
        ))}
      </ol>
      {next && (
        <Link
          href={`/?before=${encodeURIComponent(encodeCursor(next))}`}
          className="mt-4 block text-sm underline"
        >
          Older
        </Link>
      )}
    </>
  );
}

function ago(ms: number): string {
  const s = Math.max(0, Math.floor(ms / 1000));
  if (s < 60) return `${s}s`;
  if (s < 3600) return `${Math.floor(s / 60)}m`;
  if (s < 86400) return `${Math.floor(s / 3600)}h`;
  return `${Math.floor(s / 86400)}d`;
}
