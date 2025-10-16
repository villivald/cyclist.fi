import { describe, expect, it } from "vitest";

import { getTotalPages, paginateArray, sanitizePage } from "@/utils/pagination";

describe("pagination utils", () => {
  it("computes total pages correctly", () => {
    expect(getTotalPages(0, 6)).toBe(1);
    expect(getTotalPages(1, 6)).toBe(1);
    expect(getTotalPages(6, 6)).toBe(1);
    expect(getTotalPages(7, 6)).toBe(2);
  });

  it("sanitizes page within bounds", () => {
    expect(sanitizePage(0, 10)).toBe(1);
    expect(sanitizePage(11, 10)).toBe(10);
    expect(sanitizePage(5, 10)).toBe(5);
  });

  it("paginates arrays", () => {
    const items = Array.from({ length: 13 }, (_, i) => i + 1);
    const page1 = paginateArray(items, 1, 6);
    expect(page1.items).toEqual([1, 2, 3, 4, 5, 6]);
    expect(page1.totalPages).toBe(3);

    const page3 = paginateArray(items, 3, 6);
    expect(page3.items).toEqual([13]);
  });
});
