import { loadRouteData } from "../load-route-data";

describe("loadRouteData", () => {
  beforeEach(() => {
    vi.spyOn(console, "warn").mockImplementation(() => {});
  });

  it("loads and normalizes known route data", async () => {
    const data = await loadRouteData("bikes");

    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);

    data.forEach((item) => {
      expect(item.id).toEqual(expect.any(String));
      expect(item.title).toEqual(expect.any(String));
      expect(item.link).toEqual(expect.any(String));
      expect(item.alt).toEqual(expect.any(String));
      expect(item.description_en).toEqual(expect.any(String));
      expect(item.description_fi).toEqual(expect.any(String));
      expect(item.tags).toEqual(expect.any(Array));
      expect(item.new).toEqual(expect.any(Boolean));
    });
  });

  it("accepts leading slash route path", async () => {
    const data = await loadRouteData("/bikes");
    expect(data.length).toBeGreaterThan(0);
  });

  it("returns empty array for unknown route", async () => {
    const data = await loadRouteData("unknown-route");
    expect(data).toEqual([]);
  });
});
