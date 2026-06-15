import { getRandomSearchPlaceholder } from "../get-random-search-placeholder";

describe("getRandomSearchPlaceholder", () => {
  const originalWebdriver = navigator.webdriver;

  afterEach(() => {
    Object.defineProperty(navigator, "webdriver", {
      value: originalWebdriver,
      configurable: true,
    });
  });

  it("returns fallback in automated browsers", () => {
    const randomSpy = vi.spyOn(Math, "random");

    Object.defineProperty(navigator, "webdriver", {
      value: true,
      configurable: true,
    });

    expect(getRandomSearchPlaceholder("en", "Fallback...")).toBe("Fallback...");
    expect(randomSpy).not.toHaveBeenCalled();

    randomSpy.mockRestore();
  });

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
