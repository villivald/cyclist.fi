import { beforeEach, describe, expect, it, vi } from "vitest";

const limitMock = vi.fn();
const subscribeMock = vi.fn();

vi.mock("@upstash/redis", () => ({
  Redis: class MockRedis {},
}));

vi.mock("@upstash/ratelimit", () => {
  class MockRatelimit {
    static fixedWindow = vi.fn(() => "fixed-window");

    limit = limitMock;
  }

  return {
    Ratelimit: MockRatelimit,
  };
});

vi.mock("@/services/newsletter/repository", () => ({
  newsletterRepository: {
    subscribe: subscribeMock,
  },
}));

const makeRequest = (
  body: Record<string, unknown>,
  headers?: Record<string, string>,
) =>
  new Request("http://localhost/api/newsletter/subscribe", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify(body),
  });

const loadRouteHandler = () => import("../route");

describe("POST /api/newsletter/subscribe", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();

    process.env.POSTGRES_URL = "postgres://example";
    process.env.KV_REST_API_URL = "https://example.upstash.io";
    process.env.KV_REST_API_TOKEN = "test-token";

    limitMock.mockResolvedValue({
      success: true,
      reset: Date.now() + 60_000,
    });
    subscribeMock.mockResolvedValue({ subscribed: true });
  });

  it("returns 422 for invalid payload", async () => {
    const { POST } = await loadRouteHandler();
    const response = await POST(makeRequest({ email: "not-an-email" }));
    const data = await response.json();

    expect(response.status).toBe(422);
    expect(data.ok).toBe(false);
    expect(data.error).toBe("validation_error");
    expect(subscribeMock).not.toHaveBeenCalled();
  });

  it("returns 413 when payload is too large", async () => {
    const { POST } = await loadRouteHandler();
    const response = await POST(
      makeRequest(
        {
          email: "john@example.com",
        },
        { "content-length": "2000" },
      ),
    );
    const data = await response.json();

    expect(response.status).toBe(413);
    expect(data).toEqual({ ok: false, error: "payload_too_large" });
    expect(limitMock).not.toHaveBeenCalled();
    expect(subscribeMock).not.toHaveBeenCalled();
  });

  it("returns 429 when rate limited", async () => {
    limitMock.mockResolvedValueOnce({
      success: false,
      reset: Date.now() + 120_000,
    });

    const { POST } = await loadRouteHandler();
    const response = await POST(
      makeRequest({
        email: "john@example.com",
      }),
    );
    const data = await response.json();

    expect(response.status).toBe(429);
    expect(response.headers.get("Retry-After")).toBe("60");
    expect(data.ok).toBe(false);
    expect(data.error).toBe("rate_limit");
    expect(typeof data.retryAfter).toBe("number");
    expect(subscribeMock).not.toHaveBeenCalled();
  });

  it("returns 500 when postgres is not configured", async () => {
    delete process.env.POSTGRES_URL;

    const { POST } = await loadRouteHandler();
    const response = await POST(
      makeRequest({
        email: "john@example.com",
      }),
    );
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data).toEqual({ ok: false, error: "internal_error" });
    expect(subscribeMock).not.toHaveBeenCalled();
  });

  it("returns 200 for new subscribers", async () => {
    const { POST } = await loadRouteHandler();
    const response = await POST(
      makeRequest({
        email: "john@example.com",
        locale: "en",
      }),
    );
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual({ ok: true, alreadySubscribed: false });
    expect(subscribeMock).toHaveBeenCalledWith({
      email: "john@example.com",
      locale: "en",
    });
  });

  it("returns 200 with alreadySubscribed for duplicate emails", async () => {
    subscribeMock.mockResolvedValueOnce({ subscribed: false });

    const { POST } = await loadRouteHandler();
    const response = await POST(
      makeRequest({
        email: "john@example.com",
      }),
    );
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual({ ok: true, alreadySubscribed: true });
  });
});
