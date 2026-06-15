import { beforeEach, describe, expect, it, vi } from "vitest";

import type { CommentRecord } from "../types";

const limitMock = vi.fn();
const ensureTableMock = vi.fn();
const upsertMock = vi.fn();
const listPublishedPgMock = vi.fn();
const deleteByIdMock = vi.fn();
const savePublishedMock = vi.fn();
const listPublishedRedisMock = vi.fn();
const deletePublishedRedisMock = vi.fn();
const revalidateTagMock = vi.fn();

vi.mock("next/cache", () => ({
  revalidateTag: revalidateTagMock,
}));

vi.mock("../throttle", () => ({
  buildRatelimiter: () => ({
    limit: limitMock,
  }),
}));

vi.mock("../kv-store", () => ({
  edgeCommentStore: {
    savePublished: savePublishedMock,
    listPublished: listPublishedRedisMock,
    deletePublished: deletePublishedRedisMock,
  },
}));

vi.mock("../repository", () => ({
  commentRepository: {
    ensureTable: ensureTableMock,
    upsert: upsertMock,
    listPublished: listPublishedPgMock,
    deleteById: deleteByIdMock,
  },
}));

const makeComment = (
  overrides: Partial<CommentRecord> & Pick<CommentRecord, "id">,
): CommentRecord => ({
  slug: "bikes/item-1",
  content: "Default content",
  deviceId: "device-1234567890123456",
  createdAt: "2026-06-13T10:00:00.000Z",
  updatedAt: "2026-06-13T10:00:00.000Z",
  ...overrides,
});

const loadService = () => import("../service");

describe("commentService.submit", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();

    process.env.KV_REST_API_URL = "https://example.upstash.io";
    process.env.KV_REST_API_TOKEN = "test-token";
    process.env.POSTGRES_URL = "postgres://example";

    limitMock.mockResolvedValue({
      success: true,
      limit: 10,
      remaining: 9,
      reset: Date.now() + 60_000,
    });
    ensureTableMock.mockResolvedValue(undefined);
    upsertMock.mockResolvedValue(undefined);
    savePublishedMock.mockResolvedValue(undefined);
  });

  it("returns a rate-limit response without writing comments", async () => {
    const reset = Date.now() + 120_000;
    limitMock.mockResolvedValueOnce({
      success: false,
      limit: 10,
      remaining: 0,
      reset,
    });

    const { commentService } = await loadService();
    const result = await commentService.submit(
      { slug: "bikes/item-1", content: "Hello" },
      { ip: "203.0.113.1", deviceId: "device-1234567890123456" },
    );

    expect(result).toEqual({
      ok: false,
      retryAfter: reset,
      rate: expect.objectContaining({ success: false }),
    });
    expect(upsertMock).not.toHaveBeenCalled();
    expect(savePublishedMock).not.toHaveBeenCalled();
  });

  it("writes to postgres and redis when submission succeeds", async () => {
    const { commentService } = await loadService();
    const result = await commentService.submit(
      {
        slug: "bikes/item-1",
        content: "Hello",
        authorName: "Alex",
      },
      { ip: "203.0.113.1", deviceId: "device-1234567890123456" },
    );

    expect(result.ok).toBe(true);
    expect(ensureTableMock).toHaveBeenCalled();
    expect(upsertMock).toHaveBeenCalledWith(
      expect.objectContaining({
        slug: "bikes/item-1",
        content: "Hello",
        authorName: "Alex",
        deviceId: "device-1234567890123456",
      }),
    );
    expect(savePublishedMock).toHaveBeenCalledWith(result.comment);
    expect(revalidateTagMock).toHaveBeenCalledWith(
      "comments-thread:bikes/item-1",
      "max",
    );
  });
});

describe("commentService.fetchThread", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();

    process.env.KV_REST_API_URL = "https://example.upstash.io";
    process.env.KV_REST_API_TOKEN = "test-token";
    process.env.POSTGRES_URL = "postgres://example";

    ensureTableMock.mockResolvedValue(undefined);
  });

  it("prefers postgres comments and fills gaps from redis", async () => {
    const postgresComment = makeComment({
      id: "shared",
      content: "postgres version",
      createdAt: "2026-06-13T10:00:00.000Z",
    });
    const redisOnlyComment = makeComment({
      id: "redis-only",
      content: "redis only",
      createdAt: "2026-06-13T11:00:00.000Z",
    });

    listPublishedPgMock.mockResolvedValueOnce([postgresComment]);
    listPublishedRedisMock.mockResolvedValueOnce([
      makeComment({
        id: "shared",
        content: "redis version",
        createdAt: "2026-06-13T10:00:00.000Z",
      }),
      redisOnlyComment,
    ]);

    const { commentService } = await loadService();
    const thread = await commentService.fetchThread("bikes/item-1");

    expect(thread.comments).toEqual([postgresComment, redisOnlyComment]);
  });

  it("sorts comments by createdAt ascending", async () => {
    const later = makeComment({
      id: "later",
      createdAt: "2026-06-13T12:00:00.000Z",
    });
    const earlier = makeComment({
      id: "earlier",
      createdAt: "2026-06-13T09:00:00.000Z",
    });

    listPublishedPgMock.mockResolvedValueOnce([later, earlier]);
    listPublishedRedisMock.mockResolvedValueOnce([]);

    const { commentService } = await loadService();
    const thread = await commentService.fetchThread("bikes/item-1");

    expect(thread.comments.map((comment) => comment.id)).toEqual([
      "earlier",
      "later",
    ]);
  });

  it("falls back to redis when postgres fails", async () => {
    const redisComment = makeComment({ id: "redis-only" });

    listPublishedPgMock.mockRejectedValueOnce(new Error("postgres down"));
    listPublishedRedisMock.mockResolvedValueOnce([redisComment]);

    const { commentService } = await loadService();
    const thread = await commentService.fetchThread("bikes/item-1");

    expect(thread.comments).toEqual([redisComment]);
  });
});

describe("commentService.delete", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();

    process.env.KV_REST_API_URL = "https://example.upstash.io";
    process.env.KV_REST_API_TOKEN = "test-token";
    process.env.POSTGRES_URL = "postgres://example";

    ensureTableMock.mockResolvedValue(undefined);
  });

  it("returns true when redis deletes a comment", async () => {
    deletePublishedRedisMock.mockResolvedValueOnce(true);
    deleteByIdMock.mockResolvedValueOnce(false);

    const { commentService } = await loadService();
    const deleted = await commentService.delete("bikes/item-1", "comment123");

    expect(deleted).toBe(true);
    expect(revalidateTagMock).toHaveBeenCalledWith(
      "comments-thread:bikes/item-1",
      "max",
    );
  });

  it("does not revalidate when nothing was deleted", async () => {
    deletePublishedRedisMock.mockResolvedValueOnce(false);
    deleteByIdMock.mockResolvedValueOnce(false);

    const { commentService } = await loadService();
    const deleted = await commentService.delete("bikes/item-1", "comment123");

    expect(deleted).toBe(false);
    expect(revalidateTagMock).not.toHaveBeenCalled();
  });
});
