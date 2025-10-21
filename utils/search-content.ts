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
  description_en: string;
  description_fi: string;
  image: string;
  link: string;
  alt: string;
  tags: string[];
  new?: boolean;
}

export interface NewsData {
  id: string;
  text_fi: string;
  text_en: string;
  date: string;
}

export function searchContent(
  query: string,
  routesData: Record<string, RouteData[]>,
  newsData: NewsData[],
  locale: string,
): SearchResult[] {
  if (!query || query.trim().length < 2) {
    return [];
  }

  const searchTerm = query.toLowerCase().trim();
  const results: SearchResult[] = [];

  // Search through routes (only current locale description)
  Object.entries(routesData).forEach(([routePath, routes]) => {
    routes.forEach((route) => {
      const titleMatch = route.title.toLowerCase().includes(searchTerm);
      const localizedDescription =
        locale === "fi" ? route.description_fi : route.description_en;
      const descriptionMatch = localizedDescription
        .toLowerCase()
        .includes(searchTerm);
      const tagsMatch = route.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm),
      );

      if (titleMatch || descriptionMatch || tagsMatch) {
        results.push({
          id: route.id,
          title: route.title,
          description: localizedDescription,
          type: "route",
          link: route.link,
          tags: route.tags,
          routePath,
        });
      }
    });
  });

  // Search through news (only current locale)
  newsData.forEach((news) => {
    const localizedText = locale === "fi" ? news.text_fi : news.text_en;
    const textMatch = localizedText.toLowerCase().includes(searchTerm);

    if (textMatch) {
      results.push({
        id: news.id,
        title: `News - ${news.date}`,
        description: localizedText,
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
