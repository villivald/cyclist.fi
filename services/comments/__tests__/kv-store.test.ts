import { describe, expect, it, vi } from "vitest";

const hsetMock = vi.fn();
const hgetallMock = vi.fn();
const hdelMock = vi.fn();

vi.mock("@upstash/redis", () => ({
  Redis: class MockRedis {
    hset = hsetMock;
    hgetall = hgetallMock;
    hdel = hdelMock;
  },
}));

const sampleComment = {
  id: "comment123",
  slug: "bikes/item-1",
  content: "Great bike shop",
  deviceId: "device-1234567890123456",
  createdAt: "2026-06-13T10:00:00.000Z",
  updatedAt: "2026-06-13T10:00:00.000Z",
};

const loadKvStore = async (withCredentials = true) => {
  vi.resetModules();
  vi.clearAllMocks();

  if (withCredentials) {
    process.env.KV_REST_API_URL = "https://example.upstash.io";
    process.env.KV_REST_API_TOKEN = "test-token";
  } else {
    delete process.env.KV_REST_API_URL;
    delete process.env.KV_REST_API_TOKEN;
  }

  return import("../kv-store");
};

describe("edgeCommentStore", () => {
  it("saves published comments to redis", async () => {
    const { edgeCommentStore } = await loadKvStore();

    await edgeCommentStore.savePublished(sampleComment);

    expect(hsetMock).toHaveBeenCalledWith("comments:published:bikes/item-1", {
      comment123: JSON.stringify(sampleComment),
    });
  });

  it("parses string values from redis", async () => {
    hgetallMock.mockResolvedValueOnce({
      comment123: JSON.stringify(sampleComment),
    });

    const { edgeCommentStore } = await loadKvStore();
    const comments = await edgeCommentStore.listPublished("bikes/item-1");

    expect(comments).toEqual([sampleComment]);
  });

  it("returns an empty list when redis is not configured", async () => {
    const { edgeCommentStore } = await loadKvStore(false);
    const comments = await edgeCommentStore.listPublished("bikes/item-1");

    expect(comments).toEqual([]);
    expect(hgetallMock).not.toHaveBeenCalled();
  });

  it("returns false when delete is attempted without redis", async () => {
    const { edgeCommentStore } = await loadKvStore(false);
    const deleted = await edgeCommentStore.deletePublished(
      "bikes/item-1",
      "comment123",
    );

    expect(deleted).toBe(false);
    expect(hdelMock).not.toHaveBeenCalled();
  });

  it("returns true when redis deletes a comment", async () => {
    hdelMock.mockResolvedValueOnce(1);

    const { edgeCommentStore } = await loadKvStore();
    const deleted = await edgeCommentStore.deletePublished(
      "bikes/item-1",
      "comment123",
    );

    expect(deleted).toBe(true);
    expect(hdelMock).toHaveBeenCalledWith(
      "comments:published:bikes/item-1",
      "comment123",
    );
  });
});
