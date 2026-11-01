"use client";

import { useActionState } from "react";
import type { AuthState } from "./actions";

type Props = {
  action: (state: AuthState, form: FormData) => Promise<AuthState>;
  submit: string;
  newPassword?: boolean;
};

export function AuthForm({ action, submit, newPassword }: Props) {
  const [state, formAction, pending] = useActionState(action, undefined);
  return (
    <form action={formAction} className="flex max-w-xs flex-col gap-3">
      <label className="flex flex-col gap-1 text-sm">
        Handle
        <input
          name="handle"
          defaultValue={state?.handle}
          key={state?.handle}
          required
          maxLength={16}
          autoComplete="username"
          className="rounded border border-neutral-300 bg-transparent p-2 dark:border-neutral-700"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Password
        <input
          name="password"
          type="password"
          required
          minLength={8}
          autoComplete={newPassword ? "new-password" : "current-password"}
          className="rounded border border-neutral-300 bg-transparent p-2 dark:border-neutral-700"
        />
      </label>
      {state?.error && (
        <p className="text-sm text-red-600" role="alert">
          {state.error}
        </p>
      )}
      <button
        disabled={pending}
        className="rounded bg-neutral-900 px-4 py-2 text-white disabled:opacity-40 dark:bg-neutral-100 dark:text-neutral-900"
      >
        {submit}
      </button>
    </form>
  );
}
