export const COMMENTS_PUBLISHED_BUCKET = "comments:published";

export const COMMENT_MIN_INTERVAL_SECONDS = 45;
export const COMMENT_MAX_PER_HOUR = 10;
export const COMMENT_MAX_PER_DAY = 50;

export const getCommentsCacheTag = (slug: string) => `comments-thread:${slug}`;
