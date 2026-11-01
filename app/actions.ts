"use server";

import { refresh } from "next/cache";
import { redirect } from "next/navigation";
import { authenticate, createAccount } from "@/lib/accounts";
import { publishPost } from "@/lib/posts";
import { currentUser, endSession, startSession } from "@/lib/session";

export type AuthState = { error: string; handle: string } | undefined;
export type PostState = { error?: string; body?: string; published?: number } | undefined;

const field = (form: FormData, name: string) => String(form.get(name) ?? "");

export async function signUp(_: AuthState, form: FormData): Promise<AuthState> {
  const handle = field(form, "handle");
  const result = await createAccount(handle, field(form, "password"));
  if (!result.ok) return { error: result.error, handle };
  await startSession(result.user.id);
  redirect("/");
}

export async function logIn(_: AuthState, form: FormData): Promise<AuthState> {
  const handle = field(form, "handle");
  const result = await authenticate(handle, field(form, "password"));
  if (!result.ok) return { error: result.error, handle };
  await startSession(result.user.id);
  redirect("/");
}

export async function logOut(): Promise<void> {
  await endSession();
  redirect("/");
}

export async function publish(_: PostState, form: FormData): Promise<PostState> {
  const user = await currentUser();
  const body = field(form, "body");
  if (!user) redirect("/login");
  const result = await publishPost(user.id, body, field(form, "day") || null);
  if (!result.ok) return { error: result.error, body };
  refresh();
  return { published: Date.now() };
}
