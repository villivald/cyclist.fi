import { type Metadata } from "next";

jest.mock("next-intl/server", () => ({
  getTranslations: jest.fn(async () => (k: string) => `TR_${k}`),
}));

describe("createTranslatedMetadata", () => {
  it("returns metadata with translated title and default fields", async () => {
    const { createTranslatedMetadata } = await import("../generate-metadata");

    const meta = (await createTranslatedMetadata(
      "common",
      "home.title",
    )) as Metadata;

    expect(meta.title).toBe("Cyclist.fi | TR_home.title");
    expect(meta.description).toBe(
      "The cycling resource you always needed but never had a link to CYCLIST.FI",
    );
    expect(Array.isArray(meta.icons)).toBe(true);
    expect((meta.icons as object[])?.length).toBeGreaterThanOrEqual(1);
  });
});
