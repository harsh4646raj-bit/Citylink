import { describe, it, expect } from "vitest";
import { cn, formatCurrency } from "../utils";

describe("Utility Functions", () => {
  it("merges Tailwind classes correctly without conflict", () => {
    const result = cn("px-2 py-1 bg-red-500", "px-4 bg-blue-500 text-white");
    expect(result).toContain("px-4");
    expect(result).toContain("bg-blue-500");
    expect(result).toContain("text-white");
    expect(result).not.toContain("px-2");
    expect(result).not.toContain("bg-red-500");
  });

  it("formats Indian Rupee currency numbers correctly", () => {
    const formatted = formatCurrency(1500);
    // Currency format contains ₹ and 1,500
    expect(formatted).toMatch(/₹\s?1,500/);
  });
});
