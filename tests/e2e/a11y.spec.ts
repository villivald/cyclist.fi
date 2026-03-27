import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@chromatic-com/playwright";

import { ROUTE_SLUGS } from "../../utils/route-manifest";

test.describe("Home page", () => {
  test("home page has no critical a11y violations", async ({ page }) => {
    await page.goto("/");

    const results = await new AxeBuilder({ page }).analyze();
    const criticalViolations = results.violations.filter(
      (v) => v.impact === "critical",
    );
    expect(criticalViolations).toHaveLength(0);
  });
});

test.describe("Route pages", () => {
  [...ROUTE_SLUGS, "contact", "news", "design", "coffee"].forEach((route) => {
    test(`${route} page has no critical a11y violations`, async ({ page }) => {
      await page.goto(`/${route}`);

      const results = await new AxeBuilder({ page }).analyze();
      const criticalViolations = results.violations.filter(
        (v) => v.impact === "critical",
      );
      expect(criticalViolations).toHaveLength(0);
    });
  });
});
