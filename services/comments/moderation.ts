import { timingSafeEqual } from "node:crypto";

export const MODERATION_UNAVAILABLE_ERROR = "moderation_unavailable";

export const isValidModeratorKey = (providedKey: string | null): boolean => {
  const expectedKey = process.env.COMMENT_MODERATOR_KEY;

  if (!expectedKey) {
    throw new Error(MODERATION_UNAVAILABLE_ERROR);
  }

  if (!providedKey || providedKey.length !== expectedKey.length) {
    return false;
  }

  return timingSafeEqual(
    Buffer.from(providedKey, "utf8"),
    Buffer.from(expectedKey, "utf8"),
  );
};
