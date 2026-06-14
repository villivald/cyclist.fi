import { beforeEach, describe, expect, it, vi } from "vitest";

const redisGetMock = vi.fn();
const redisTtlMock = vi.fn();
const redisIncrMock = vi.fn();
const redisExpireMock = vi.fn();
const redisDelMock = vi.fn();
const verifyLimitMock = vi.fn();
const deleteLimitMock = vi.fn();

vi.mock("@upstash/redis", () => ({
  Redis: class MockRedis {
    get = redisGetMock;
    ttl = redisTtlMock;
    incr = redisIncrMock;
    expire = redisExpireMock;
    del = redisDelMock;
  },
}));

vi.mock("@upstash/ratelimit", () => {
  class MockRatelimit {
    static fixedWindow = vi.fn(() => "fixed-window");

    limit = deleteLimitMock;
  }

  return {
    Ratelimit: MockRatelimit,
  };
});

vi.mock("@/services/comments/throttle", () => ({
  buildRatelimiter: () => ({
    limit: verifyLimitMock,
  }),
}));

const loadModerationThrottle = () =>
  import("@/services/comments/moderation-throttle");

describe("moderationThrottle", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();

    redisGetMock.mockResolvedValue(0);
    redisTtlMock.mockResolvedValue(3600);
    verifyLimitMock.mockResolvedValue({
      success: true,
      limit: 10,
      remaining: 9,
      reset: Date.now() + 60_000,
    });
    deleteLimitMock.mockResolvedValue({
      success: true,
      limit: 30,
      remaining: 29,
      reset: Date.now() + 60_000,
    });
  });

  it("allows verify requests when not locked out and under rate limit", async () => {
    const { moderationThrottle } = await loadModerationThrottle();
    const result = await moderationThrottle.check("1.2.3.4", "verify");

    expect(result).toEqual({ allowed: true });
    expect(verifyLimitMock).toHaveBeenCalledWith("moderation:verify:1.2.3.4");
  });

  it("allows delete requests when not locked out and under rate limit", async () => {
    const { moderationThrottle } = await loadModerationThrottle();
    const result = await moderationThrottle.check("1.2.3.4", "delete");

    expect(result).toEqual({ allowed: true });
    expect(deleteLimitMock).toHaveBeenCalledWith("moderation:delete:1.2.3.4");
  });

  it("blocks locked-out IPs before rate limiting", async () => {
    redisGetMock.mockResolvedValueOnce(5);

    const { moderationThrottle } = await loadModerationThrottle();
    const result = await moderationThrottle.check("1.2.3.4", "verify");

    expect(result).toEqual({
      allowed: false,
      reason: "locked_out",
      reset: expect.any(Number),
    });
    expect(verifyLimitMock).not.toHaveBeenCalled();
  });

  it("blocks verify requests when hourly rate limit is exceeded", async () => {
    const reset = Date.now() + 120_000;
    verifyLimitMock.mockResolvedValueOnce({
      success: false,
      limit: 10,
      remaining: 0,
      reset,
    });

    const { moderationThrottle } = await loadModerationThrottle();
    const result = await moderationThrottle.check("1.2.3.4", "verify");

    expect(result).toEqual({
      allowed: false,
      reason: "rate_limit",
      reset,
    });
  });

  it("records failures and sets expiry on first failed attempt", async () => {
    redisIncrMock.mockResolvedValueOnce(1);

    const { moderationThrottle } = await loadModerationThrottle();
    await moderationThrottle.recordFailure("1.2.3.4");

    expect(redisIncrMock).toHaveBeenCalledWith(
      "ratelimit:moderation:failures:1.2.3.4",
    );
    expect(redisExpireMock).toHaveBeenCalledWith(
      "ratelimit:moderation:failures:1.2.3.4",
      3600,
    );
  });

  it("clears failure counters after successful auth", async () => {
    const { moderationThrottle } = await loadModerationThrottle();
    await moderationThrottle.clearFailures("1.2.3.4");

    expect(redisDelMock).toHaveBeenCalledWith(
      "ratelimit:moderation:failures:1.2.3.4",
    );
  });
});

describe("getClientIp", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("prefers the first forwarded IP", async () => {
    const { getClientIp } = await loadModerationThrottle();
    const request = new Request("http://localhost", {
      headers: {
        "x-forwarded-for": "203.0.113.1, 10.0.0.1",
      },
    });

    expect(getClientIp(request)).toBe("203.0.113.1");
  });
});

describe("getModerationRetryAfterSeconds", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("returns at least one second", async () => {
    const { getModerationRetryAfterSeconds } = await loadModerationThrottle();

    expect(getModerationRetryAfterSeconds(Date.now() - 1000)).toBe(1);
  });
});
