describe("loadSearchData", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("loads routes and news data successfully", async () => {
    const { loadSearchData } = await import("../search-data");
    const { ROUTE_SLUGS } = await import("../route-manifest");

    const { routesData, newsData } = await loadSearchData();

    // routes keys are exactly the manifest slugs
    expect(Object.keys(routesData).sort()).toEqual([...ROUTE_SLUGS].sort());

    ROUTE_SLUGS.forEach((route: string) => {
      expect(routesData[route]).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            title: expect.any(String),
            description_en: expect.any(String),
            description_fi: expect.any(String),
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
          text_fi: expect.any(String),
          text_en: expect.any(String),
          date: expect.any(String),
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
