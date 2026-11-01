import type { Metadata } from "next";
import Link from "next/link";
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
          <header className="border-b border-neutral-200 py-4 dark:border-neutral-800">
            <Link href="/" className="font-bold">
              loserbb
            </Link>
          </header>
          <main className="py-4">{children}</main>
        </div>
      </body>
    </html>
  );
}
