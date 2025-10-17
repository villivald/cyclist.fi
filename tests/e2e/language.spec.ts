import { expect, test } from "@chromatic-com/playwright";

// Toggle language, verify cookie, and ensure html lang changes on reload

test.describe("Language switcher", () => {
  test("sets cookie and changes html lang after reload", async ({
    page,
    context,
  }) => {
    await page.goto("/");

    const button = page.getByTestId("language-toggle-button");
    await expect(button).toBeVisible();

    const beforeLang = await page.evaluate(() => document.documentElement.lang);
    await button.click();

    // Wait for cookie to be set
    await expect
      .poll(async () => {
        const cookies = await context.cookies();
        const cookie = cookies.find((c) => c.name === "cyclist.fi_locale");
        return cookie?.value ?? null;
      })
      .toMatch(/^(en|fi)$/);

    // Reload to let server pick up cookie and update locale
    await page.reload();

    const afterLang = await page.evaluate(() => document.documentElement.lang);
    expect(afterLang).not.toEqual(beforeLang);
  });
});

test.describe("Language switcher works as expected", () => {
  test("header navigation text is translated", async ({ page }) => {
    await page.goto("/");

    const button = page.getByTestId("language-toggle-button");
    await expect(button).toBeVisible();

    const titleBeforeTranslation = page.getByTestId("search-button-title");
    await expect(titleBeforeTranslation).toBeVisible();
    await expect(titleBeforeTranslation).toHaveText("Search");

    await button.click();

    const titleAfterTranslation = page.getByTestId("search-button-title");
    await expect(titleAfterTranslation).toBeVisible();
    await expect(titleAfterTranslation).toHaveText("Hae");
  });
});
