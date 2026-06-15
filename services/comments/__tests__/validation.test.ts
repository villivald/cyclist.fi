import { describe, expect, it } from "vitest";

import { commentPayloadSchema } from "../validation";

describe("commentPayloadSchema", () => {
  it("accepts a valid payload", () => {
    const result = commentPayloadSchema.parse({
      slug: "bikes/item-1",
      content: "Great resource",
      authorName: "Alex",
      authorUrl: "https://example.com",
    });

    expect(result).toEqual({
      slug: "bikes/item-1",
      content: "Great resource",
      authorName: "Alex",
      authorUrl: "https://example.com",
    });
  });

  it("trims content and treats empty optional fields as undefined", () => {
    const result = commentPayloadSchema.parse({
      slug: "bikes/item-1",
      content: "  Hello  ",
      authorName: "",
      authorUrl: "",
    });

    expect(result).toEqual({
      slug: "bikes/item-1",
      content: "Hello",
      authorName: undefined,
      authorUrl: undefined,
    });
  });

  it("rejects empty content after trim", () => {
    expect(() =>
      commentPayloadSchema.parse({
        slug: "bikes/item-1",
        content: "   ",
      }),
    ).toThrow();
  });

  it("rejects invalid author URLs", () => {
    expect(() =>
      commentPayloadSchema.parse({
        slug: "bikes/item-1",
        content: "Hello",
        authorUrl: "not-a-url",
      }),
    ).toThrow(/valid URL/);
  });

  it("rejects unknown fields in strict mode", () => {
    expect(() =>
      commentPayloadSchema.parse({
        slug: "bikes/item-1",
        content: "Hello",
        deviceId: "should-not-be-here",
      }),
    ).toThrow();
  });
});
