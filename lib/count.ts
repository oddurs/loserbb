// Shared by the composer and the server, so both agree on what a character is.
// The rule (spike 0008): grapheme clusters after NFC normalisation and trimming.

export const MAX_LIMIT = 42;
// A single grapheme can carry hundreds of combining marks, so characters alone
// do not bound storage.
export const BYTE_CAP = 400;

const segmenter = new Intl.Segmenter(undefined, { granularity: "grapheme" });
const encoder = new TextEncoder();

export function normalize(text: string): string {
  return text.normalize("NFC").trim();
}

export function countChars(text: string): number {
  return Array.from(segmenter.segment(normalize(text))).length;
}

export type Problem = "empty" | "over" | "bytes";

export type Check = {
  body: string;
  count: number;
  remaining: number;
  problem: Problem | null;
};

export function check(text: string, limit: number): Check {
  const body = normalize(text);
  const count = countChars(body);
  const remaining = limit - count;
  let problem: Problem | null = null;
  if (count === 0) problem = "empty";
  else if (count > limit) problem = "over";
  else if (encoder.encode(body).length > BYTE_CAP) problem = "bytes";
  return { body, count, remaining, problem };
}
