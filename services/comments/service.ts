import { revalidateTag } from "next/cache";

import {
  COMMENT_MAX_PER_DAY,
  COMMENT_MAX_PER_HOUR,
  COMMENT_MIN_INTERVAL_SECONDS,
  getCommentsCacheTag,
} from "./constants";
import { env } from "./env";
import { edgeCommentStore } from "./kv-store";
import { commentRepository } from "./repository";
import { buildRatelimiter } from "./throttle";
import type {
  CommentPayload,
  CommentRecord,
  CommentThread,
  SubmitContext,
} from "./types";

const ratelimiter = buildRatelimiter({
  perHour: COMMENT_MAX_PER_HOUR,
  perDay: COMMENT_MAX_PER_DAY,
  minIntervalSeconds: COMMENT_MIN_INTERVAL_SECONDS,
});

const withTimeout = async <T>(
  promise: Promise<T>,
  timeoutMs: number,
  message: string,
) => {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([
      promise,
      new Promise<T>((_, reject) => {
        timeoutId = setTimeout(() => reject(new Error(message)), timeoutMs);
      }),
    ]);
  } finally {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  }
};

const buildPublishedComment = (
  payload: CommentPayload,
  deviceId: string,
): CommentRecord => {
  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID().replace(/-/g, ""),
    slug: payload.slug,
    content: payload.content,
    authorName: payload.authorName,
    authorUrl: payload.authorUrl,
    deviceId,
    createdAt: now,
    updatedAt: now,
  };
};

export const commentService = {
  async submit(payload: CommentPayload, context: SubmitContext) {
    env.ensure("kv");
    env.ensure("postgres");

    const rate = await ratelimiter.limit(`${context.ip}:${context.deviceId}`);
    if (!rate.success) {
      return {
        ok: false,
        retryAfter: rate.reset,
        rate,
      };
    }

    const published = buildPublishedComment(payload, context.deviceId);

    await commentRepository.ensureTable();
    await commentRepository.upsert(published);
    await edgeCommentStore.savePublished(published);

    try {
      revalidateTag(getCommentsCacheTag(payload.slug), "max");
    } catch (error) {
      console.warn(
        "[Comments] Failed to revalidate cache after submit:",
        error,
      );
    }

    return {
      ok: true,
      comment: published,
      rate,
    };
  },

  async fetchThread(slug: string): Promise<CommentThread> {
    env.ensure("kv");

    const canUsePostgres = env.missing("postgres").length === 0;
    const postgresPublishedPromise = canUsePostgres
      ? (async () => {
          try {
            await commentRepository.ensureTable();
            return await withTimeout(
              commentRepository.listPublished(slug),
              5000,
              "Postgres query timeout",
            );
          } catch (error) {
            console.warn(
              "[Postgres] Failed to fetch published comments:",
              error instanceof Error ? error.message : String(error),
            );
            return [];
          }
        })()
      : Promise.resolve<CommentRecord[]>([]);

    const [redisPublished, postgresPublished] = await Promise.all([
      edgeCommentStore.listPublished(slug),
      postgresPublishedPromise,
    ]);

    const publishedMap = new Map<string, CommentRecord>();
    postgresPublished.forEach((comment) => {
      publishedMap.set(comment.id, comment);
    });
    redisPublished.forEach((comment) => {
      if (!publishedMap.has(comment.id)) {
        publishedMap.set(comment.id, comment);
      }
    });

    const comments = Array.from(publishedMap.values()).sort((a, b) =>
      a.createdAt.localeCompare(b.createdAt),
    );

    return {
      slug,
      comments,
    };
  },
};
