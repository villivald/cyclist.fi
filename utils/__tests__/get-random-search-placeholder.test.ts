import { getRandomSearchPlaceholder } from "../get-random-search-placeholder";

describe("getRandomSearchPlaceholder", () => {
  it("returns a locale-specific placeholder", () => {
    const randomSpy = vi.spyOn(Math, "random").mockReturnValue(0);

    expect(getRandomSearchPlaceholder("en", "Fallback...")).toBe(
      "Pas Normal Studios...",
    );
    expect(getRandomSearchPlaceholder("fi", "Vara...")).toBe(
      "Pas Normal Studios...",
    );

    randomSpy.mockRestore();
  });

  it("falls back to english for unknown locales", () => {
    const randomSpy = vi.spyOn(Math, "random").mockReturnValue(0.99);

    expect(getRandomSearchPlaceholder("sv", "Fallback...")).toBe("Strava...");

    randomSpy.mockRestore();
  });
});
