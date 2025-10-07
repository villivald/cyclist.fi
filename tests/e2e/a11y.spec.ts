import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

import { routeFiles } from "../../utils/search-data";

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
  [...routeFiles, "contact", "news", "design", "coffee"].forEach((route) => {
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
