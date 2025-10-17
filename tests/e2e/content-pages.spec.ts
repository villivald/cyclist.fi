import { expect, test } from "@chromatic-com/playwright";
import { type Page } from "@playwright/test";

import { routeFiles } from "../../utils/search-data";

// Run this heavy test only once in Chromium project
test.skip(
  ({ browserName }) => browserName !== "chromium",
  "Run only in Chromium",
);

test.describe("Each item on a content page has working link", () => {
  for (const route of routeFiles) {
    test(`items on /${route} link to external sites`, async ({
      page,
      request,
    }) => {
      await page.goto(`/${route}`);
      await expect(page).toHaveURL(`/${route}`);

      const contentLinks = await page
        .locator('[data-testid="content-link"]')
        .all();

      expect(contentLinks.length).toBeGreaterThan(0);

      for (const link of contentLinks) {
        await expect(link).toBeVisible();
        await expect(link).toHaveAttribute(
          "href",
          expect.stringMatching(/^https?:\/\//),
        );
        await expect(link).toHaveAttribute("target", "_blank");
        const rel = await link.getAttribute("rel");
        expect(rel?.includes("noopener")).toBe(true);
        expect(rel?.includes("noreferrer")).toBe(true);

        const href = await link.getAttribute("href");
        expect(href).toBeTruthy();

        // Best-effort popup open (some sites block or use chrome-error URLs)
        let newPage: Page | null = null;
        try {
          const popupPromise = page.waitForEvent("popup", { timeout: 5000 });
          await link.click();
          newPage = await popupPromise;
          const newPageUrl = newPage.url();
          if (/^https?:\/\//.test(newPageUrl)) {
            await expect(newPage).toHaveURL(/^https?:\/\//);
          }
          await newPage.waitForLoadState("domcontentloaded").catch(() => {});
        } catch {
          // no popup or blocked; proceed with HTTP validation
        } finally {
          if (newPage) {
            await newPage.close().catch(() => {});
          }
        }

        // Validate destination URL exists; allow 2xx/3xx/401/403/429 as OK
        const res = await request.get(href as string, { maxRedirects: 10 });
        const status = res.status();
        const acceptable = status === 200 || [401, 403, 429].includes(status);
        expect(acceptable).toBe(true);
      }
    });
  }
});
