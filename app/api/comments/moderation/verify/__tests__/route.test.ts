import { beforeEach, describe, expect, it, vi } from "vitest";

const checkMock = vi.fn();
const recordFailureMock = vi.fn();
const clearFailuresMock = vi.fn();

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

const loadRouteHandler = () => import("../route");

describe("POST /api/comments/moderation/verify", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();

    process.env.COMMENT_MODERATOR_KEY = "secret-moderator-key";

    checkMock.mockResolvedValue({ allowed: true });
    recordFailureMock.mockResolvedValue(undefined);
    clearFailuresMock.mockResolvedValue(undefined);
  });

  it("returns 429 when rate limited", async () => {
    const reset = Date.now() + 120_000;
    checkMock.mockResolvedValueOnce({
      allowed: false,
      reason: "rate_limit",
      reset,
    });

    const { POST } = await loadRouteHandler();
    const response = await POST(
      new Request("http://localhost/api/comments/moderation/verify", {
        method: "POST",
        headers: {
          "x-cyclist-moderator-key": "wrong-key",
        },
      }),
    );
    const data = await response.json();

    expect(response.status).toBe(429);
    expect(data).toEqual({
      ok: false,
      error: "rate_limit",
      retryAfter: reset,
    });
    expect(response.headers.get("Retry-After")).toBeTruthy();
    expect(recordFailureMock).not.toHaveBeenCalled();
  });

  it("returns 429 when locked out", async () => {
    const reset = Date.now() + 3_600_000;
    checkMock.mockResolvedValueOnce({
      allowed: false,
      reason: "locked_out",
      reset,
    });

    const { POST } = await loadRouteHandler();
    const response = await POST(
      new Request("http://localhost/api/comments/moderation/verify", {
        method: "POST",
        headers: {
          "x-cyclist-moderator-key": "secret-moderator-key",
        },
      }),
    );
    const data = await response.json();

    expect(response.status).toBe(429);
    expect(data.error).toBe("locked_out");
    expect(clearFailuresMock).not.toHaveBeenCalled();
  });

  it("records a failure and returns 401 for invalid keys", async () => {
    const { POST } = await loadRouteHandler();
    const response = await POST(
      new Request("http://localhost/api/comments/moderation/verify", {
        method: "POST",
        headers: {
          "x-cyclist-moderator-key": "wrong-key",
        },
      }),
    );
    const data = await response.json();

    expect(response.status).toBe(401);
    expect(data).toEqual({ ok: false, error: "unauthorized" });
    expect(recordFailureMock).toHaveBeenCalledWith("203.0.113.1");
    expect(clearFailuresMock).not.toHaveBeenCalled();
  });

  it("clears failures and returns 200 for valid keys", async () => {
    const { POST } = await loadRouteHandler();
    const response = await POST(
      new Request("http://localhost/api/comments/moderation/verify", {
        method: "POST",
        headers: {
          "x-cyclist-moderator-key": "secret-moderator-key",
        },
      }),
    );
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual({ ok: true });
    expect(checkMock).toHaveBeenCalledWith("203.0.113.1", "verify");
    expect(clearFailuresMock).toHaveBeenCalledWith("203.0.113.1");
    expect(recordFailureMock).not.toHaveBeenCalled();
  });
});
