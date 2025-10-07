import { expect, test } from "@playwright/test";

// Validate skip links work by focusing main content

test.describe("Skip links", () => {
  test("focuses #main-content when activated", async ({ page }) => {
    await page.goto("/");

    const nav = page.getByTestId("skip-links");
    await expect(nav).toBeVisible();

    // Activate the main content skip link via keyboard to avoid overlays intercepting clicks
    const link = page.getByTestId("skip-links-main-content");
    await link.focus();
    await page.keyboard.press("Enter");

    // wait for focus to move
    await page.waitForFunction(() => {
      const main = document.getElementById("main-content");
      if (!main) return false;
      const active = document.activeElement as HTMLElement | null;
      return Boolean(active && (active === main || main.contains(active)));
    });

    // main should be focused or its first focusable child
    const activeId = await page.evaluate(
      () => document.activeElement?.id ?? null,
    );

    // If the container didn't receive focus, we still accept if focus moved to a focusable child
    const isMainFocusedOrChild = await page.evaluate(() => {
      const main = document.getElementById("main-content");
      if (!main) return false;
      const active = document.activeElement as HTMLElement | null;
      if (!active) return false;
      return active === main || main.contains(active);
    });

    expect(activeId === "main-content" || isMainFocusedOrChild).toBeTruthy();
  });
});
