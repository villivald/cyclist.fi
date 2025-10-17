import { expect, test } from "@chromatic-com/playwright";

test.describe("Search modal", () => {
  test("opens via button click and shows guidance text", async ({ page }) => {
    await page.goto("/");

    // Click the Search button in header menu
    const searchButton = page.getByTestId("search-button");
    await expect(searchButton).toBeVisible();
    await searchButton.click();

    // Dialog should open
    const dialog = page.getByTestId("search-dialog");
    await expect(dialog).toBeVisible();

    // Input should be focused
    const input = page.getByTestId("search-input");
    await expect(input).toBeFocused();

    // With short query or empty, guidance text is shown
    await expect(page.getByTestId("search-for-guidance")).toBeVisible();

    // Close via close button
    await page.getByTestId("search-close-button").click();
    await expect(dialog).toBeHidden();
  });

  test("opens via global event, searches and shows results and summary", async ({
    page,
  }) => {
    await page.goto("/");

    // Ensure SearchComponent is mounted and dialog element is attached before dispatching the event
    await page.waitForSelector('[data-testid="search-dialog"]', {
      state: "attached",
    });

    // Open via window event (SearchButton dispatches 'open-search', listener opens modal)
    await page.evaluate(() => {
      window.dispatchEvent(new CustomEvent("open-search"));
    });

    const input = page.getByTestId("search-input");
    await expect(input).toBeVisible({ timeout: 10000 });

    await input.fill("bike");

    // Results summary updates, either singular or plural
    const summary = page.getByTestId("search-results-summary");
    await expect(summary).toBeVisible();
    const results = page.getByTestId("search-results");
    await expect(results).toBeVisible();

    // Close with Escape
    await page.keyboard.press("Escape");
    await expect(page.getByTestId("search-dialog")).toBeHidden();
  });

  test("opens via button click, searches and shows results", async ({
    page,
  }) => {
    await page.goto("/");

    const searchButton = page.getByTestId("search-button");
    await expect(searchButton).toBeVisible();
    await searchButton.click();

    // type query
    const input = page.getByTestId("search-input");
    await expect(input).toBeVisible();
    await input.fill("Pas Normal");

    // results summary updates
    const summary = page.getByTestId("search-results-summary");
    await expect(summary).toBeVisible();

    // there should be one result
    const results = page.getByTestId("search-results");
    await expect(results).toBeVisible();
    const resultRow = results.getByTestId("search-result-row");
    await expect(resultRow).toBeVisible();
    await expect(resultRow).toHaveCount(1);

    // click the result
    await resultRow.click();
    await expect(page.getByTestId("search-dialog")).toBeHidden();

    // check the url
    await expect(page).toHaveURL("/apparel");
  });
});
