import { NewsData, RouteData } from "./search-content";

let cachedData: {
  routesData: Record<string, RouteData[]>;
  newsData: NewsData[];
} | null = null;

export const routeFiles = [
  "apparel",
  "bikes",
  "books",
  "community",
  "retailers",
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

export async function loadSearchData(): Promise<{
  routesData: Record<string, RouteData[]>;
  newsData: NewsData[];
}> {
  try {
    if (cachedData) return cachedData;

    // Import all route data
    const routesData: Record<string, RouteData[]> = {};

    const routeImports = routeFiles.map(async (route) => {
      try {
        const data = await import(`../data/routes/${route}.json`);
        const defaultImage = "/images/coming_soon.avif";
        const normalized = (data.default as RouteData[]).map((item) => ({
          ...item,
          image: item.image ?? defaultImage,
          alt: item.alt ?? item.title,
          new: item.new ?? false,
        }));
        routesData[route] = normalized;
      } catch (error) {
        console.warn(`Failed to load route data for ${route}:`, error);
        routesData[route] = [] as RouteData[];
      }
    });

    await Promise.all(routeImports);

    // Import news data
    let newsData: NewsData[] = [];
    try {
      const news = await import("../data/news.json");
      newsData = news.default as NewsData[];
    } catch (error) {
      console.warn("Failed to load news data:", error);
    }

    cachedData = { routesData, newsData };
    return cachedData;
  } catch (error) {
    console.error("Error loading search data:", error);
    return { routesData: {}, newsData: [] };
  }
}
