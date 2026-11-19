import fc from "fast-check";
import { describe, expect, it } from "vitest";
import vectors from "../fixtures/chars.json";
import { BYTE_CAP, MAX_LIMIT, check, countChars, normalize } from "@/lib/count";

describe("character rule fixtures", () => {
  it.each(vectors)("$note", ({ text, limit, count, ok }) => {
    const c = check(text, limit);
    expect(c.count).toBe(count);
    expect(c.problem === null).toBe(ok);
  });
});

const anyText = fc.string({ unit: "grapheme", maxLength: 60 });
const anyLimit = fc.integer({ min: 0, max: MAX_LIMIT });

describe("character rule properties", () => {
  it("a valid post fits its limit and the byte cap", () => {
    fc.assert(
      fc.property(anyText, anyLimit, (text, limit) => {
        const c = check(text, limit);
        if (c.problem !== null) return;
        expect(c.count).toBeLessThanOrEqual(limit);
        expect(c.count).toBeGreaterThan(0);
        expect(new TextEncoder().encode(c.body).length).toBeLessThanOrEqual(BYTE_CAP);
      }),
    );
  });

  it("normalising is idempotent", () => {
    fc.assert(
      fc.property(fc.string({ unit: "binary", maxLength: 60 }), (text) => {
        expect(normalize(normalize(text))).toBe(normalize(text));
      }),
    );
  });

  it("the stored body counts the same as the input", () => {
    fc.assert(
      fc.property(anyText, (text) => {
        expect(countChars(check(text, MAX_LIMIT).body)).toBe(countChars(text));
      }),
    );
  });

  it("limit 0 rejects everything", () => {
    fc.assert(
      fc.property(anyText, (text) => {
        expect(check(text, 0).problem).not.toBeNull();
      }),
    );
  });
});
