import { beforeEach, describe, expect, it, vi } from "vitest";

const checkMock = vi.fn();
const recordFailureMock = vi.fn();
const clearFailuresMock = vi.fn();
const deleteMock = vi.fn();

vi.mock("@/services/comments/moderation-throttle", () => ({
  getClientIp: () => "203.0.113.1",
  getModerationRetryAfterSeconds: (reset: number) =>
    Math.max(Math.ceil((reset - Date.now()) / 1000), 1),
  moderationThrottle: {
    check: checkMock,
    recordFailure: recordFailureMock,
    clearFailures: clearFailuresMock,
  },
}));

vi.mock("@/services/comments/service", () => ({
  commentService: {
    delete: deleteMock,
  },
}));

const loadRouteHandler = () => import("../route");

const makeContext = (slug: string, commentId: string) => ({
  params: Promise.resolve({ slug, commentId }),
});

describe("DELETE /api/comments/[slug]/[commentId]", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();

    process.env.COMMENT_MODERATOR_KEY = "secret-moderator-key";

    checkMock.mockResolvedValue({ allowed: true });
    recordFailureMock.mockResolvedValue(undefined);
    clearFailuresMock.mockResolvedValue(undefined);
    deleteMock.mockResolvedValue(true);
  });

  it("returns 429 when rate limited", async () => {
    const reset = Date.now() + 120_000;
    checkMock.mockResolvedValueOnce({
      allowed: false,
      reason: "rate_limit",
      reset,
    });

    const { DELETE } = await loadRouteHandler();
    const response = await DELETE(
      new Request("http://localhost/api/comments/shops/item-1/comment-1", {
        method: "DELETE",
        headers: {
          "x-cyclist-moderator-key": "secret-moderator-key",
        },
      }),
      makeContext("shops/item-1", "comment-1"),
    );
    const data = await response.json();

    expect(response.status).toBe(429);
    expect(data.error).toBe("rate_limit");
    expect(deleteMock).not.toHaveBeenCalled();
  });

  it("records a failure and returns 401 for invalid keys", async () => {
    const { DELETE } = await loadRouteHandler();
    const response = await DELETE(
      new Request("http://localhost/api/comments/shops/item-1/comment-1", {
        method: "DELETE",
        headers: {
          "x-cyclist-moderator-key": "wrong-key",
        },
      }),
      makeContext("shops/item-1", "comment-1"),
    );
    const data = await response.json();

    expect(response.status).toBe(401);
    expect(data).toEqual({ ok: false, error: "unauthorized" });
    expect(recordFailureMock).toHaveBeenCalledWith("203.0.113.1");
    expect(deleteMock).not.toHaveBeenCalled();
  });

  it("clears failures and deletes when authorized", async () => {
    const { DELETE } = await loadRouteHandler();
    const response = await DELETE(
      new Request("http://localhost/api/comments/shops/item-1/comment-1", {
        method: "DELETE",
        headers: {
          "x-cyclist-moderator-key": "secret-moderator-key",
        },
      }),
      makeContext("shops/item-1", "comment-1"),
    );
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual({ ok: true });
    expect(checkMock).toHaveBeenCalledWith("203.0.113.1", "delete");
    expect(clearFailuresMock).toHaveBeenCalledWith("203.0.113.1");
    expect(deleteMock).toHaveBeenCalledWith("shops/item-1", "comment-1");
  });
});
