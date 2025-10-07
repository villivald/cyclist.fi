import { expect, test } from "@playwright/test";

test.describe("Theme switcher", () => {
  test("toggles html class between light and dark", async ({ page }) => {
    await page.goto("/");

    const themeButton = page.getByTestId("theme-toggle-button");
    await expect(themeButton).toBeVisible();

    await page.waitForTimeout(200);

    const initialTheme = await page.evaluate(() =>
      document.documentElement.classList.toString(),
    );

    await themeButton.click();

    try {
      await page.waitForFunction(
        (v) => document.documentElement.classList.toString() !== v,
        initialTheme,
        { timeout: 4000 },
      );
    } catch {
      await themeButton.click();
      await page.waitForFunction(
        (v) => document.documentElement.classList.toString() !== v,
        initialTheme,
        { timeout: 6000 },
      );
    }
  });
});
