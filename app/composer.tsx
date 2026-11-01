"use client";

import { useActionState, useState } from "react";
import { publish, type PostState } from "./actions";
import { check } from "@/lib/count";

export function Composer({ day, limit }: { day: string; limit: number }) {
  const [text, setText] = useState("");
  const [state, action, pending] = useActionState(async (prev: PostState, form: FormData) => {
    const next = await publish(prev, form);
    setText(next?.published ? "" : (next?.body ?? ""));
    return next;
  }, undefined);
  const c = check(text, limit);

  return (
    <form
      action={action}
      className="mb-4 border-b border-neutral-200 pb-4 dark:border-neutral-800"
      data-limit={limit}
    >
      <input type="hidden" name="day" value={day} />
      <textarea
        name="body"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={2}
        aria-label="Post"
        placeholder={`${limit} characters today`}
        className="w-full resize-none rounded border border-neutral-300 bg-transparent p-2 text-lg dark:border-neutral-700"
      />
      <div className="mt-2 flex items-center gap-3">
        <span
          className={`text-sm tabular-nums ${c.remaining < 0 ? "text-red-600" : "text-neutral-500"}`}
          data-testid="remaining"
        >
          {c.remaining}
        </span>
        {state?.error && (
          <span className="text-sm text-red-600" role="alert">
            {state.error}
          </span>
        )}
        <button
          disabled={c.problem !== null || pending}
          className="ml-auto rounded bg-neutral-900 px-4 py-1 text-white disabled:opacity-40 dark:bg-neutral-100 dark:text-neutral-900"
        >
          Post
        </button>
      </div>
    </form>
  );
}
