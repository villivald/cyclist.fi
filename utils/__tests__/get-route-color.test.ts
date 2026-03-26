import { getRouteColor } from "../get-route-color";
import { ROUTES } from "../route-manifest";

describe("getRouteColor", () => {
  it("returns the correct color for each route in the manifest", () => {
    ROUTES.forEach((route) => {
      expect(getRouteColor(route.slug)).toBe(route.color);
    });
  });

  it("defaults to teal when route not found", () => {
    expect(getRouteColor("unknown-route")).toBe("teal");
  });
});
