import {
  GRID_PREVIEW_ITEM_COUNT,
  loadGridPreviews,
} from "../load-grid-previews";
import { ROUTE_SLUGS } from "../route-manifest";

describe("loadGridPreviews", () => {
  it("loads preview data for every route slug", async () => {
    const previews = await loadGridPreviews();

    expect(Object.keys(previews).sort()).toEqual([...ROUTE_SLUGS].sort());
  });

  it("returns at most four items per route", async () => {
    const previews = await loadGridPreviews();

    for (const slug of ROUTE_SLUGS) {
      expect(previews[slug].length).toBeLessThanOrEqual(
        GRID_PREVIEW_ITEM_COUNT,
      );
    }

    expect(previews.bikes.length).toBe(GRID_PREVIEW_ITEM_COUNT);
  });
});
