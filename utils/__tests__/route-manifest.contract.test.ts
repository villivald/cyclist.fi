import enTranslations from "../../translations/en.json";
import fiTranslations from "../../translations/fi.json";
import { ROUTE_SLUGS } from "../route-manifest";

describe("route manifest contracts", () => {
  it("has page translation keys for all route slugs in both locales", () => {
    const enPages = enTranslations.Pages as Record<string, string>;
    const fiPages = fiTranslations.Pages as Record<string, string>;

    ROUTE_SLUGS.forEach((slug) => {
      expect(enPages[slug]).toBeTruthy();
      expect(fiPages[slug]).toBeTruthy();
    });
  });
});
