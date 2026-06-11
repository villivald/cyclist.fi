import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@chromatic-com/playwright";
import type { Page } from "@playwright/test";

import { ROUTE_SLUGS } from "../../utils/route-manifest";

const isDecorativeRouteTitleTarget = (target: string) =>
  target.includes("route-title") ||
  (target.includes("Routes-module__") && target.includes("__title"));

const getSeriousViolations = async (page: Page) => {
  // Allow mount-time opacity transitions to finish before scanning.
  await page.waitForTimeout(400);
  const results = await new AxeBuilder({ page }).analyze();
  return results.violations
    .filter((v) => v.impact === "serious")
    .map((violation) => {
      if (violation.id !== "color-contrast") return violation;

      return {
        ...violation,
        nodes: violation.nodes.filter(
          (node) =>
            !node.target.some(
              (target) =>
                typeof target === "string" &&
                isDecorativeRouteTitleTarget(target),
            ),
        ),
      };
    })
    .filter((violation) => violation.nodes.length > 0);
};

test.describe("Home page", () => {
  test("home page has no serious a11y violations", async ({ page }) => {
    await page.goto("/");
    const seriousViolations = await getSeriousViolations(page);
    expect(seriousViolations).toHaveLength(0);
  });
});

test.describe("Route pages", () => {
  [...ROUTE_SLUGS, "saved", "contact", "news", "design"].forEach((route) => {
    test(`${route} page has no serious a11y violations`, async ({ page }) => {
      await page.goto(`/${route}`);
      const seriousViolations = await getSeriousViolations(page);
      expect(seriousViolations).toHaveLength(0);
    });
  });
});
