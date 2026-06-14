export const COMMENTS_PUBLISHED_BUCKET = "comments:published";

export const COMMENT_MIN_INTERVAL_SECONDS = 45;
export const COMMENT_MAX_PER_HOUR = 10;
export const COMMENT_MAX_PER_DAY = 50;

export const MODERATION_VERIFY_MAX_PER_HOUR = 10;
export const MODERATION_VERIFY_MAX_PER_DAY = 50;
export const MODERATION_VERIFY_MIN_INTERVAL_SECONDS = 5;
export const MODERATION_DELETE_MAX_PER_HOUR = 30;
export const MODERATION_MAX_FAILED_ATTEMPTS = 5;
export const MODERATION_FAILURE_WINDOW_SECONDS = 3600;

export const getCommentsCacheTag = (slug: string) => `comments-thread:${slug}`;
