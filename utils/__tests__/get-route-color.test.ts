import { colors, getRouteColor } from "../get-route-color";

describe("getRouteColor", () => {
  it("returns the correct color for each route", () => {
    colors.forEach((color) => {
      (Object.keys(color) as Array<keyof typeof color>).forEach((colorName) => {
        const routes = color[colorName];

        if (Array.isArray(routes)) {
          routes.forEach((route: string) => {
            expect(getRouteColor(route)).toBe(colorName);
          });
        }
      });
    });
  });

  it("defaults to teal when route not found", () => {
    expect(getRouteColor("unknown-route" as string)).toBe("teal");
  });
});
