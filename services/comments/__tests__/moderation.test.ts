import { beforeEach, describe, expect, it } from "vitest";

import {
  isValidModeratorKey,
  MODERATION_UNAVAILABLE_ERROR,
} from "../moderation";

describe("isValidModeratorKey", () => {
  beforeEach(() => {
    process.env.COMMENT_MODERATOR_KEY = "secret-moderator-key";
  });

  it("returns true for a matching key", () => {
    expect(isValidModeratorKey("secret-moderator-key")).toBe(true);
  });

  it("returns false for a wrong key", () => {
    expect(isValidModeratorKey("wrong-key")).toBe(false);
  });

  it("returns false for null", () => {
    expect(isValidModeratorKey(null)).toBe(false);
  });

  it("throws when the moderator key is not configured", () => {
    delete process.env.COMMENT_MODERATOR_KEY;

    expect(() => isValidModeratorKey("anything")).toThrow(
      MODERATION_UNAVAILABLE_ERROR,
    );
  });
});
