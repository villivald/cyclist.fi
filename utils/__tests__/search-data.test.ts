import { routeFiles } from "../search-data";

describe("loadSearchData", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it("loads routes and news data successfully", async () => {
    const { loadSearchData } = await import("../search-data");

    const { routesData, newsData } = await loadSearchData();

    // routes keys are present
    expect(Object.keys(routesData)).toEqual(expect.arrayContaining(routeFiles));

    routeFiles.forEach((route) => {
      expect(routesData[route]).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            title: expect.any(String),
            description: expect.any(String),
            image: expect.any(String),
            link: expect.any(String),
            alt: expect.any(String),
            tags: expect.any(Array),
            new: expect.any(Boolean),
          }),
        ]),
      );
    });

    // news data present and well-shaped
    expect(Array.isArray(newsData)).toBe(true);

    if (newsData.length > 0) {
      expect(newsData[0]).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          text: expect.any(String),
          date: expect.any(String),
          image: expect.any(String),
        }),
      );
    }
  });

  it("returns cached result on subsequent calls", async () => {
    const { loadSearchData } = await import("../search-data");

    const first = await loadSearchData();
    const second = await loadSearchData();

    // same reference proves module-level cache is used
    expect(second).toBe(first);
  });
});
