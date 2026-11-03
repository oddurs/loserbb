import { createHmac } from "node:crypto";
import { MAX_LIMIT } from "./count";

// Weights for 1..42: a triangle peaking in the middle, lifted by 4 so the edges are
// rare but real. 1–3 together come up about 3% of days.
const WEIGHTS = Array.from({ length: MAX_LIMIT }, (_, i) => Math.min(i + 1, MAX_LIMIT - i) + 4);
const TOTAL = WEIGHTS.reduce((a, b) => a + b, 0);

export const GRACE_MS = 5 * 60 * 1000;

/** Today's number for a UTC day like "2026-11-01". Keyed by a secret so the future can't be computed. */
export function limitFor(day: string, secret: string): number {
  const digest = createHmac("sha256", secret).update(day).digest();
  let r = Number(digest.readBigUInt64BE(0) % BigInt(TOTAL));
  for (let i = 0; i < WEIGHTS.length; i++) {
    r -= WEIGHTS[i];
    if (r < 0) return i + 1;
  }
  throw new Error("weights do not cover the draw");
}

export function utcDay(at: Date): string {
  return at.toISOString().slice(0, 10);
}

/**
 * Which day's number applies to a submission. A composer opened before midnight may
 * finish under yesterday's number for a few minutes; otherwise it is today's.
 */
export function limitDay(composerDay: string | null, now: Date): string {
  const today = utcDay(now);
  if (composerDay === null || composerDay === today) return today;
  const midnight = Date.parse(`${today}T00:00:00Z`);
  const yesterday = utcDay(new Date(midnight - 1));
  if (composerDay === yesterday && now.getTime() - midnight < GRACE_MS) return yesterday;
  return today;
}

export function limitSecret(): string {
  const secret = process.env.LIMIT_SECRET;
  if (secret) return secret;
  if (process.env.NODE_ENV === "production") throw new Error("LIMIT_SECRET is required in production");
  return "development-secret";
}

export function todaysLimit(now = new Date()): { day: string; limit: number } {
  const day = utcDay(now);
  return { day, limit: limitFor(day, limitSecret()) };
}
