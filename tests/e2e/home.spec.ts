import { expect, test } from "@chromatic-com/playwright";

// Basic smoke to ensure the homepage loads and key UI is present

test.describe("Homepage smoke", () => {
  test("renders main content, footer and scroll to top button", async ({
    page,
  }) => {
    await page.goto("/");

    // Header with site title
    await expect(
      page.getByRole("heading", { level: 1, name: /cyclist/i }),
    ).toBeVisible();

    // Skip links nav exists with appropriate label
    const skipNav = page.getByTestId("skip-links");
    await expect(skipNav).toBeVisible();

    // Main landmark present
    await expect(page.locator("main#main-content")).toBeVisible();

    // Footer with contact links
    await expect(page.locator("footer#contact-links")).toBeVisible();

    // scroll to the bottom of the page
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    // Scroll to top button: visible only on wide screens (>1000px)
    const isWide = await page.evaluate(() => window.innerWidth > 1000);
    const scrollTopBtn = page.locator("button#scrollToTop");

    if (isWide) {
      await expect(scrollTopBtn).toBeVisible();
    } else {
      await expect(scrollTopBtn).toBeHidden();
    }
  });
});
