import { expect, test } from "@chromatic-com/playwright";

import { routeFiles } from "../../utils/search-data";

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
        const rawHref = (await link.getAttribute("href")) ?? "";
        expect(rawHref, "link href should be present").toBeTruthy();

        let url: URL | null = null;

        try {
          url = new URL(rawHref, page.url());
        } catch {
          throw new Error(`Invalid URL in href: ${rawHref}`);
        }

        const response = await request.get(url.toString(), {
          headers: {
            // Use realistic navigation headers to reduce bot/anti-scraping 403s
            "user-agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
            accept:
              "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
            "accept-language": "en-US,en;q=0.9",
            "upgrade-insecure-requests": "1",
            "sec-fetch-dest": "document",
            "sec-fetch-mode": "navigate",
            "sec-fetch-site": "cross-site",
          },
        });

        const status = response.status();

        if (![401, 403, 405, 429].includes(status)) {
          expect(
            status,
            `GET ${url.toString()} responded with status ${status}`,
          ).toBeLessThan(400);
          expect(status).toBeGreaterThanOrEqual(200);
        }
      }
    });
  }
});
