import { describe, expect, it } from "vitest";

import {
  toPublicComment,
  toPublicThread,
} from "@/services/comments/serialization";
import type { CommentRecord } from "@/services/comments/types";

const sampleComment: CommentRecord = {
  id: "comment123",
  slug: "shops/item-1",
  content: "Great shop",
  authorName: "Alex",
  authorUrl: "https://example.com",
  deviceId: "device-secret-id-12345678",
  createdAt: "2026-06-13T10:00:00.000Z",
  updatedAt: "2026-06-13T10:00:00.000Z",
};

describe("comment serialization", () => {
  it("removes deviceId from public comments", () => {
    expect(toPublicComment(sampleComment)).toEqual({
      id: "comment123",
      slug: "shops/item-1",
      content: "Great shop",
      authorName: "Alex",
      authorUrl: "https://example.com",
      createdAt: "2026-06-13T10:00:00.000Z",
      updatedAt: "2026-06-13T10:00:00.000Z",
    });
    expect(toPublicComment(sampleComment)).not.toHaveProperty("deviceId");
  });

  it("removes deviceId from every comment in a thread", () => {
    const thread = toPublicThread({
      slug: "shops/item-1",
      comments: [sampleComment],
    });

    expect(thread).toEqual({
      slug: "shops/item-1",
      comments: [toPublicComment(sampleComment)],
    });
    expect(thread.comments[0]).not.toHaveProperty("deviceId");
  });
});
