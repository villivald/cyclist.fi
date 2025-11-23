import { Redis } from "@upstash/redis";

import { COMMENTS_PUBLISHED_BUCKET } from "./constants";
import type { PublishedComment } from "./types";

const buildKey = (bucket: string, slug: string) => `${bucket}:${slug}`;

const url = process.env.UPSTASH_REDIS_REST_KV_REST_API_URL;
const token = process.env.UPSTASH_REDIS_REST_KV_REST_API_TOKEN;

const hasCredentials = Boolean(url && token);

if (!hasCredentials) {
  console.error(
    "[Redis] Missing credentials. URL:",
    url ? "✓" : "✗",
    "Token:",
    token ? "✓" : "✗",
  );
}

const redis = hasCredentials
  ? new Redis({
      url: url!,
      token: token!,
    })
  : null;

const parsePublished = (
  raw: Record<string, string | PublishedComment> | null,
) =>
  raw
    ? (Object.values(raw)
        .map((value) => {
          try {
            return typeof value === "string"
              ? (JSON.parse(value) as PublishedComment)
              : (value as PublishedComment);
          } catch (error) {
            console.error("[Redis] Failed to parse published comment", error);
            return undefined;
          }
        })
        .filter(Boolean) as PublishedComment[])
    : [];

export const edgeCommentStore = {
  async savePublished(comment: PublishedComment) {
    if (!redis) {
      console.warn("[Redis] Cannot save comment: Redis not configured");
      return;
    }
    try {
      await redis.hset(buildKey(COMMENTS_PUBLISHED_BUCKET, comment.slug), {
        [comment.id]: JSON.stringify(comment),
      });
    } catch (error) {
      console.error("[Redis] Failed to save published comment", error);
      throw error;
    }
  },

  async listPublished(slug: string): Promise<PublishedComment[]> {
    if (!redis) {
      console.warn("[Redis] Cannot list comments: Redis not configured");
      return [];
    }
    try {
      const raw = (await redis.hgetall(
        buildKey(COMMENTS_PUBLISHED_BUCKET, slug),
      )) as Record<string, string | PublishedComment> | null;

      return parsePublished(raw);
    } catch (error) {
      console.error("[Redis] Failed to list published comments", error);
      return [];
    }
  },
};
