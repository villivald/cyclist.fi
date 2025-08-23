export interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: "route" | "news";
  link?: string;
  tags?: string[];
  date?: string;
  routePath?: string;
}

export interface RouteData {
  id: string;
  title: string;
  description: string;
  link: string;
  alt: string;
  tags: string[];
  new?: boolean;
}

export interface NewsData {
  id: string;
  text: string;
  date: string;
}

export function searchContent(
  query: string,
  routesData: Record<string, RouteData[]>,
  newsData: NewsData[],
): SearchResult[] {
  if (!query || query.trim().length < 2) {
    return [];
  }

  const searchTerm = query.toLowerCase().trim();
  const results: SearchResult[] = [];

  // Search through routes
  Object.entries(routesData).forEach(([routePath, routes]) => {
    routes.forEach((route) => {
      const titleMatch = route.title.toLowerCase().includes(searchTerm);
      const descriptionMatch = route.description
        .toLowerCase()
        .includes(searchTerm);
      const tagsMatch = route.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm),
      );

      if (titleMatch || descriptionMatch || tagsMatch) {
        results.push({
          id: route.id,
          title: route.title,
          description: route.description,
          type: "route",
          link: route.link,
          tags: route.tags,
          routePath,
        });
      }
    });
  });

  // Search through news
  newsData.forEach((news) => {
    const textMatch = news.text.toLowerCase().includes(searchTerm);

    if (textMatch) {
      results.push({
        id: news.id,
        title: `News - ${news.date}`,
        description: news.text,
        type: "news",
        date: news.date,
      });
    }
  });

  // Sort results by relevance (exact matches first, then partial matches)
  return results.sort((a, b) => {
    const aTitleExact = a.title.toLowerCase() === searchTerm;
    const bTitleExact = b.title.toLowerCase() === searchTerm;

    if (aTitleExact && !bTitleExact) return -1;
    if (!aTitleExact && bTitleExact) return 1;

    const aStartsWith = a.title.toLowerCase().startsWith(searchTerm);
    const bStartsWith = b.title.toLowerCase().startsWith(searchTerm);

    if (aStartsWith && !bStartsWith) return -1;
    if (!aStartsWith && bStartsWith) return 1;

    return 0;
  });
}
