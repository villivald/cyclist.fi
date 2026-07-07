import enTranslations from "../../translations/en.json";
import fiTranslations from "../../translations/fi.json";
import { GRID_ROUTES, ROUTE_SLUGS } from "../route-manifest";

describe("route manifest contracts", () => {
  it("has no adjacent duplicate colors in grid route list", () => {
    for (let i = 0; i < GRID_ROUTES.length - 1; i++) {
      expect(GRID_ROUTES[i].color).not.toBe(GRID_ROUTES[i + 1].color);
    }
  });

  it("has no duplicate colors within phone grid rows", () => {
    for (let i = 0; i < GRID_ROUTES.length; i += 2) {
      if (i + 1 < GRID_ROUTES.length) {
        expect(GRID_ROUTES[i].color).not.toBe(GRID_ROUTES[i + 1].color);
      }
    }
  });

  it("has page translation keys for all route slugs in both locales", () => {
    const enPages = enTranslations.Pages as Record<string, string>;
    const fiPages = fiTranslations.Pages as Record<string, string>;

    ROUTE_SLUGS.forEach((slug) => {
      expect(enPages[slug]).toBeTruthy();
      expect(fiPages[slug]).toBeTruthy();
    });
  });
});
