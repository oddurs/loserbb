import { describe, expect, it } from "vitest";
import { handleProblem, normalizeHandle } from "@/lib/handle";

describe("handles", () => {
  it("normalises case, whitespace, and a leading @", () => {
    expect(normalizeHandle("  @Oddur_1 ")).toBe("oddur_1");
  });

  it.each(["a", "abc_123", "fifteen_chars_x"])("accepts %s", (h) => {
    expect(handleProblem(h)).toBeNull();
  });

  it.each(["", "sixteen_chars_xx", "has space", "dash-ed", "émile"])("rejects %j", (h) => {
    expect(handleProblem(h)).not.toBeNull();
  });

  it.each(["admin", "login", "signup", "settings", "everyone"])("reserves %s", (h) => {
    expect(handleProblem(h)).toBe("That handle is reserved.");
  });
});
