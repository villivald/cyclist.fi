import { beforeEach, describe, expect, it, vi } from "vitest";

const limitMock = vi.fn();
const redisSetMock = vi.fn();
const redisTtlMock = vi.fn();

vi.mock("@upstash/redis", () => ({
  Redis: class MockRedis {
    set = redisSetMock;
    ttl = redisTtlMock;
  },
}));

vi.mock("@upstash/ratelimit", () => {
  class MockRatelimit {
    static fixedWindow = vi.fn(() => "fixed-window");
    static slidingWindow = vi.fn(() => "sliding-window");

    limit = limitMock;
  }

  return {
    Ratelimit: MockRatelimit,
  };
});

const successRate = () => ({
  success: true,
  limit: 10,
  remaining: 9,
  reset: Date.now() + 60_000,
});

const loadThrottle = () => import("../throttle");

describe("buildRatelimiter", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();

    limitMock.mockResolvedValue(successRate());
    redisSetMock.mockResolvedValue("OK");
    redisTtlMock.mockResolvedValue(45);
  });

  it("blocks when the hourly limit is exceeded", async () => {
    limitMock.mockResolvedValueOnce({
      success: false,
      limit: 10,
      remaining: 0,
      reset: Date.now() + 120_000,
    });

    const { buildRatelimiter } = await loadThrottle();
    const limiter = buildRatelimiter({
      perHour: 10,
      perDay: 50,
      minIntervalSeconds: 45,
    });

    const result = await limiter.limit("203.0.113.1:device-123");

    expect(result.success).toBe(false);
    expect(limitMock).toHaveBeenCalledTimes(1);
  });

  it("blocks when the minimum interval has not elapsed", async () => {
    limitMock
      .mockResolvedValueOnce(successRate())
      .mockResolvedValueOnce(successRate());
    redisSetMock.mockResolvedValueOnce(null);

    const { buildRatelimiter } = await loadThrottle();
    const limiter = buildRatelimiter({
      perHour: 10,
      perDay: 50,
      minIntervalSeconds: 45,
    });

    const result = await limiter.limit("203.0.113.1:device-123");

    expect(result).toEqual({
      success: false,
      limit: 1,
      remaining: 0,
      reset: expect.any(Number),
    });
    expect(redisSetMock).toHaveBeenCalledWith(
      "ratelimit:comments:last:203.0.113.1:device-123",
      expect.any(Number),
      { nx: true, ex: 45 },
    );
  });

  it("allows requests when all limits pass", async () => {
    limitMock
      .mockResolvedValueOnce(successRate())
      .mockResolvedValueOnce(successRate());

    const { buildRatelimiter } = await loadThrottle();
    const limiter = buildRatelimiter({
      perHour: 10,
      perDay: 50,
      minIntervalSeconds: 45,
    });

    const result = await limiter.limit("203.0.113.1:device-123");

    expect(result.success).toBe(true);
    expect(limitMock).toHaveBeenCalledTimes(2);
    expect(limitMock).toHaveBeenCalledWith("203.0.113.1:device-123");
  });
});
