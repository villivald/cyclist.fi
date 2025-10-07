import { expect, test } from "@playwright/test";

test.describe("Scroll to top button", () => {
  test("appears after scrolling on wide screens and scrolls to top on click", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.goto("/");

    const button = page.locator("button#scrollToTop");

    // Initially hidden
    await expect(button).toBeHidden();

    // Scroll down beyond threshold (>= 1200)
    await page.evaluate(() => window.scrollTo(0, 1500));

    await expect(button).toBeVisible();

    // Click and verify scroll returns near top
    await button.click();

    await page.waitForFunction(() => window.scrollY <= 10);
    await expect(button).toBeHidden();
  });

  test("remains hidden on narrow screens", async ({ page }) => {
    await page.setViewportSize({ width: 800, height: 800 });
    await page.goto("/");

    const button = page.locator("button#scrollToTop");

    await page.evaluate(() => window.scrollTo(0, 2000));
    await expect(button).toBeHidden();
  });
});
