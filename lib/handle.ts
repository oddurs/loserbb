// Every top-level route, plus names that would mislead.
const RESERVED = new Set([
  "admin",
  "api",
  "settings",
  "search",
  "about",
  "help",
  "login",
  "logout",
  "signup",
  "day",
  "tag",
  "everyone",
  "notifications",
  "terms",
  "privacy",
  "loserbb",
  "root",
]);

export function normalizeHandle(raw: string): string {
  return raw.trim().replace(/^@/, "").toLowerCase();
}

/** Returns why a normalised handle is unusable, or null if it is fine. */
export function handleProblem(handle: string): string | null {
  if (!/^[a-z0-9_]{1,15}$/.test(handle)) return "Handles are 1–15 letters, numbers, or underscores.";
  if (RESERVED.has(handle)) return "That handle is reserved.";
  return null;
}
