import {
  type NewsData,
  type RouteData,
  searchContent,
} from "../search-content";

describe("searchContent", () => {
  const baseRoutesData: Record<string, RouteData[]> = {
    bikes: [
      {
        id: "r1",
        title: "Bikes",
        description: "All about bikes",
        link: "/bikes",
        alt: "bikes",
        tags: ["road", "mtb"],
        image: "",
      },
      {
        id: "r2",
        title: "Helmets",
        description: "Great bikes helmets and safety gear",
        link: "/bikes/helmets",
        alt: "helmets",
        tags: ["safety"],
        image: "",
      },
      {
        id: "r3",
        title: "Bikes for beginners",
        description: "Starter guide",
        link: "/bikes/beginners",
        alt: "beginners",
        tags: [],
        image: "",
      },
    ],
    apparel: [
      {
        id: "r4",
        title: "Jerseys",
        description: "Breathable jerseys",
        link: "/apparel/jerseys",
        alt: "jerseys",
        tags: ["bikes", "summer"],
        image: "",
      },
      {
        id: "r5",
        title: "No match",
        description: "No match",
        link: "/apparel/no-match",
        alt: "no match",
        tags: [],
        image: "",
      },
    ],
  };

  const baseNewsData: NewsData[] = [
    {
      id: "n1",
      text: "New bikes arrived in stock",
      date: "2024-01-01",
      image: "",
    },
  ];

  it("returns empty array when query is missing or too short", () => {
    expect(searchContent("", baseRoutesData, baseNewsData)).toEqual([]);
    expect(searchContent(" ", baseRoutesData, baseNewsData)).toEqual([]);
    expect(searchContent("a", baseRoutesData, baseNewsData)).toEqual([]);
  });

  it("matches across title, description and tags (case-insensitive)", () => {
    const results = searchContent("bIkEs", baseRoutesData, baseNewsData);

    // Should include route by exact title match
    expect(results.some((r) => r.type === "route" && r.id === "r1")).toBe(true);

    // Should include route by description match
    expect(results.some((r) => r.type === "route" && r.id === "r2")).toBe(true);

    // Should include route by tags match
    expect(results.some((r) => r.type === "route" && r.id === "r4")).toBe(true);

    // Should include news by text match
    expect(results.some((r) => r.type === "news" && r.id === "n1")).toBe(true);

    // Should not include routes with no match
    expect(results.some((r) => r.type === "route" && r.id === "r5")).toBe(
      false,
    );

    // Route results include routePath
    const r1 = results.find((r) => r.id === "r1");
    expect(r1?.type).toBe("route");
    expect(r1?.routePath).toBe("bikes");

    // News result has composed title and date
    const n1 = results.find((r) => r.id === "n1");
    expect(n1?.type).toBe("news");
    expect(n1?.title).toBe("News - 2024-01-01");
    expect(n1?.date).toBe("2024-01-01");
  });

  it("sorts exact title matches first, then titles starting with the term", () => {
    const results = searchContent("bikes", baseRoutesData, baseNewsData);

    // First should be exact title match ("Bikes" -> r1)
    expect(results[0].id).toBe("r1");

    // Next should prefer titles starting with the term ("Bikes for beginners" -> r3)
    const r3Index = results.findIndex((r) => r.id === "r3");
    expect(r3Index).toBeGreaterThan(0);

    // r3 should appear before items that don't start with the term (e.g., r2 Helmets)
    const r2Index = results.findIndex((r) => r.id === "r2");
    expect(r2Index).toBeGreaterThan(r3Index);
  });
});
