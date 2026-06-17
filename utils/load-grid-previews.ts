import type { PageComponentData } from "@/components/page-component/types";

import { loadRouteData } from "./load-route-data";
import { ROUTE_SLUGS } from "./route-manifest";

export const GRID_PREVIEW_ITEM_COUNT = 4;

export async function loadGridPreviews(): Promise<
  Record<string, PageComponentData[]>
> {
  const entries = await Promise.all(
    ROUTE_SLUGS.map(async (slug) => {
      const data = await loadRouteData(slug);
      return [slug, data.slice(0, GRID_PREVIEW_ITEM_COUNT)] as const;
    }),
  );

  return Object.fromEntries(entries);
}
