import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import { Suspense } from "react";
import { logOut } from "./actions";
import { todaysLimit } from "@/lib/limit";
import { currentUser } from "@/lib/session";
import "./globals.css";

export const metadata: Metadata = {
  title: "loserbb",
  description: "Microblogging under a new character limit every day, never more than 42.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body className="bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
        <div className="mx-auto max-w-xl px-4">
          <header className="flex items-center gap-4 border-b border-neutral-200 py-4 dark:border-neutral-800">
            <Link href="/" className="font-bold">
              loserbb
            </Link>
            <Suspense>
              <Today />
            </Suspense>
            <nav className="ml-auto flex items-center gap-3 text-sm">
              <Suspense>
                <UserNav />
              </Suspense>
            </nav>
          </header>
          <main className="py-4">{children}</main>
        </div>
      </body>
    </html>
  );
}

async function Today() {
  await connection();
  const { limit } = todaysLimit();
  return (
    <span className="text-sm text-neutral-500" data-testid="today">
      Today: <strong className="text-neutral-900 dark:text-neutral-100">{limit}</strong>
    </span>
  );
}

async function UserNav() {
  const user = await currentUser();
  if (!user) {
    return (
      <>
        <Link href="/login" className="underline">
          Log in
        </Link>
        <Link href="/signup" className="underline">
          Sign up
        </Link>
      </>
    );
  }
  return (
    <>
      <span>@{user.handle}</span>
      <form action={logOut}>
        <button className="underline">Log out</button>
      </form>
    </>
  );
}
