import { expect, test } from "@chromatic-com/playwright";

test.describe("Saved list", () => {
  test("can save an item and view it on /saved", async ({ page }) => {
    await page.goto("/apparel");

    const saveButton = page.locator("#maap").getByTestId("save-button");
    await saveButton.click();
    await expect(saveButton).toHaveAttribute("aria-pressed", "true");

    await page.goto("/saved");
    await expect(page.locator("#maap")).toBeVisible();
  });

  test("can clear all saved items with confirmation", async ({ page }) => {
    await page.goto("/apparel");

    const saveButton = page.locator("#maap").getByTestId("save-button");
    await saveButton.click();
    await expect(saveButton).toHaveAttribute("aria-pressed", "true");

    await page.goto("/saved");
    await expect(page.locator("#maap")).toBeVisible();

    page.once("dialog", (dialog) => dialog.accept());
    await page.getByTestId("clear-saved-button").click();

    await expect(page.locator("#maap")).toHaveCount(0);
  });
});
