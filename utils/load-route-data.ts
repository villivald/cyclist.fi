import type { PageComponentData } from "@/components/page-component/types";

export async function loadRouteData(
  routePath: string,
): Promise<PageComponentData[]> {
  try {
    const routeName = routePath.replace(/^\//, "");
    const data = await import(`../data/routes/${routeName}.json`);

    return (data.default as PageComponentData[]).map((item) => ({
      ...item,
      image: item.image,
      alt: item.alt ?? item.title,
      new: item.new ?? false,
      description_en: item.description_en ?? "",
      description_fi: item.description_fi ?? "",
      tags: item.tags ?? [],
    }));
  } catch (error) {
    console.warn(`Failed to load route data for ${routePath}:`, error);
    return [];
  }
}
