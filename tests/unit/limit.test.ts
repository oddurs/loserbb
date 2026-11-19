import { describe, expect, it } from "vitest";
import { GRACE_MS, limitDay, limitFor, utcDay } from "@/lib/limit";

function days(n: number): string[] {
  const start = Date.parse("2026-01-01T00:00:00Z");
  return Array.from({ length: n }, (_, i) => utcDay(new Date(start + i * 86_400_000)));
}

describe("limitFor", () => {
  it("is deterministic for a date and secret", () => {
    expect(limitFor("2026-11-01", "s")).toBe(limitFor("2026-11-01", "s"));
  });

  it("depends on the secret", () => {
    const a = days(50).map((d) => limitFor(d, "one"));
    const b = days(50).map((d) => limitFor(d, "two"));
    expect(a).not.toEqual(b);
  });

  it("over 10,000 days: covers 1–42, keeps 1–3 rare, centres the median", () => {
    const values = days(10_000).map((d) => limitFor(d, "distribution"));
    expect(new Set(values)).toEqual(new Set(Array.from({ length: 42 }, (_, i) => i + 1)));
    const tiny = values.filter((v) => v <= 3).length / values.length;
    expect(tiny).toBeGreaterThan(0.01);
    expect(tiny).toBeLessThan(0.05);
    const median = [...values].sort((a, b) => a - b)[values.length / 2];
    expect(median).toBeGreaterThanOrEqual(15);
    expect(median).toBeLessThanOrEqual(30);
  });
});

describe("limitDay", () => {
  const midnight = Date.parse("2026-11-02T00:00:00Z");

  it("uses today when the composer is from today or unknown", () => {
    const now = new Date(midnight + 10 * 60_000);
    expect(limitDay("2026-11-02", now)).toBe("2026-11-02");
    expect(limitDay(null, now)).toBe("2026-11-02");
  });

  it("honours yesterday's composer inside the grace window", () => {
    expect(limitDay("2026-11-01", new Date(midnight + GRACE_MS - 1))).toBe("2026-11-01");
  });

  it("refuses yesterday's composer once the window closes", () => {
    expect(limitDay("2026-11-01", new Date(midnight + GRACE_MS))).toBe("2026-11-02");
  });

  it("never honours older or future days", () => {
    const now = new Date(midnight + 1000);
    expect(limitDay("2026-10-31", now)).toBe("2026-11-02");
    expect(limitDay("2026-11-03", now)).toBe("2026-11-02");
    expect(limitDay("garbage", now)).toBe("2026-11-02");
  });
});
