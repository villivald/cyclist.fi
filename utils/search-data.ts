import { NewsData, RouteData } from "./search-content";

export async function loadSearchData(): Promise<{
  routesData: Record<string, RouteData[]>;
  newsData: NewsData[];
}> {
  try {
    // Import all route data
    const routesData: Record<string, RouteData[]> = {};

    const routeFiles = [
      "apparel",
      "bikes",
      "books",
      "community",
      "discounts",
      "events",
      "indoor",
      "magazines",
      "maintenance",
      "nutrition",
      "places",
      "podcasts",
      "social",
      "technology",
      "tour",
      "training",
      "tv",
      "youtube",
    ];

    for (const route of routeFiles) {
      try {
        const data = await import(`../data/routes/${route}.json`);
        routesData[route] = data.default;
      } catch (error) {
        console.warn(`Failed to load route data for ${route}:`, error);
        routesData[route] = [];
      }
    }

    // Import news data
    let newsData: NewsData[] = [];
    try {
      const news = await import("../data/news.json");
      newsData = news.default;
    } catch (error) {
      console.warn("Failed to load news data:", error);
    }

    return { routesData, newsData };
  } catch (error) {
    console.error("Error loading search data:", error);
    return { routesData: {}, newsData: [] };
  }
}
