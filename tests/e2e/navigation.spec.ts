import { expect, test } from "@playwright/test";

import { routeFiles } from "../../utils/search-data";

const pageNotFoundRoutes = [
  "coffee",
  "instagram",
  "facebook",
  "newsletter",
  "randomRoute",
];

test.describe("Basic route navigation", () => {
  routeFiles.forEach((route) => {
    test(`navigates to ${route}`, async ({ page }) => {
      await page.goto(`/${route}`);
      await expect(page).toHaveURL(`/${route}`);

      // h2 element with testid "route-title" should be visible and have text
      const title = page.getByTestId("route-title");
      await expect(title).toBeVisible();
      await expect(title).toHaveText(route.toUpperCase());

      // main landmark should be visible
      await expect(page.locator("main#main-content")).toBeVisible();
    });
  });
});

test.describe("Coming soon routes work as expected", () => {
  test("navigates to coming soon routes", async ({ page }) => {
    await page.goto("/design");
    await expect(page).toHaveURL("/design");

    // title is visible and correct
    const title = page.getByTestId("coming-soon-title");
    await expect(title).toBeVisible();
    await expect(title).toHaveText("Coming Soon");

    // a link with text "Go to the homepage" is visible and works as expected
    const link = page.getByText("Go to the homepage");
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute("href", "/");
    await link.click();
    await expect(page).toHaveURL("/");
  });
});

test.describe("404 routes work as expected", () => {
  pageNotFoundRoutes.forEach((route) => {
    test(`navigates to ${route} - 404 route`, async ({ page }) => {
      await page.goto(`/${route}`);
      await expect(page).toHaveURL(`/${route}`);

      // title is visible and correct
      const title = page.getByTestId("page-not-found-title");
      await expect(title).toBeVisible();
      await expect(title).toHaveText("Page not found");

      // a link with text "Go to the homepage" is visible and works as expected
      const link = page.getByText("Go to the homepage");
      await expect(link).toBeVisible();
      await expect(link).toHaveAttribute("href", "/");
      await link.click();
      await expect(page).toHaveURL("/");
    });
  });
});
