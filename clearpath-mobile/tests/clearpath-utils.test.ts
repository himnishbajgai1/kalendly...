import { describe, expect, it } from "vitest";

import { dateKey, dayCount } from "../lib/clearpath-utils";

describe("ClearPath date utilities", () => {
  it("counts the beginning day as day one", () => {
    expect(dayCount("2026-08-27T08:30:00.000Z", new Date("2026-08-27T22:00:00.000Z"))).toBe(1);
  });

  it("counts complete calendar days without treating a partial day as a new day", () => {
    expect(dayCount("2026-08-20T23:30:00.000Z", new Date("2026-08-27T00:05:00.000Z"))).toBe(8);
  });

  it("uses a stable YYYY-MM-DD key for activity grouping", () => {
    expect(dateKey(new Date("2026-08-27T12:00:00.000Z"))).toMatch(/^2026-08-27$/);
  });
});
