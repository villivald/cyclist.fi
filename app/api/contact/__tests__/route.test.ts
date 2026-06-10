import { beforeEach, describe, expect, it, vi } from "vitest";

const limitMock = vi.fn();
const sendMock = vi.fn();

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

vi.mock("resend", () => ({
  Resend: class MockResend {
    emails = {
      send: sendMock,
    };
  },
}));

vi.mock("@/components/emails/contact-email-template", () => ({
  default: () => null,
}));

const makeRequest = (
  body: Record<string, unknown>,
  headers?: Record<string, string>,
) =>
  new Request("http://localhost/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify(body),
  });

const loadRouteHandler = () => import("../route");

describe("POST /api/contact", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();

    process.env.RESEND_API_KEY = "test-api-key";
    process.env.RESEND_FROM_EMAIL = "noreply@cyclist.fi";
    process.env.KV_REST_API_URL = "https://example.upstash.io";
    process.env.KV_REST_API_TOKEN = "test-token";

    limitMock.mockResolvedValue({
      success: true,
      reset: Date.now() + 60_000,
    });
    sendMock.mockResolvedValue({ error: null, data: { id: "msg_123" } });
  });

  it("returns 422 for invalid payload", async () => {
    const { POST } = await loadRouteHandler();
    const response = await POST(makeRequest({ message: "" }));
    const data = await response.json();

    expect(response.status).toBe(422);
    expect(data.ok).toBe(false);
    expect(data.error).toBe("validation_error");
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("returns 413 when payload is too large", async () => {
    const { POST } = await loadRouteHandler();
    const response = await POST(
      makeRequest(
        {
          message: "Hello",
          fromEmail: "john@example.com",
        },
        { "content-length": "9001" },
      ),
    );
    const data = await response.json();

    expect(response.status).toBe(413);
    expect(data).toEqual({ ok: false, error: "payload_too_large" });
    expect(limitMock).not.toHaveBeenCalled();
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("returns 429 when rate limited", async () => {
    limitMock.mockResolvedValueOnce({
      success: false,
      reset: Date.now() + 120_000,
    });

    const { POST } = await loadRouteHandler();
    const response = await POST(
      makeRequest({
        message: "Hello from test",
        fromEmail: "john@example.com",
      }),
    );
    const data = await response.json();

    expect(response.status).toBe(429);
    expect(response.headers.get("Retry-After")).toBe("60");
    expect(data.ok).toBe(false);
    expect(data.error).toBe("rate_limit");
    expect(typeof data.retryAfter).toBe("number");
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("returns 500 with sanitized error when provider fails", async () => {
    sendMock.mockResolvedValueOnce({
      error: { message: "resend provider details" },
    });

    const { POST } = await loadRouteHandler();
    const response = await POST(
      makeRequest({
        message: "Hello from test",
        fromEmail: "john@example.com",
        name: "John",
      }),
    );
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data).toEqual({ ok: false, error: "internal_error" });
  });

  it("returns 200 and does not leak provider payload", async () => {
    const { POST } = await loadRouteHandler();
    const response = await POST(
      makeRequest({
        message: "Hello from test",
        fromEmail: "john@example.com",
        name: "John",
        subject: "General",
      }),
    );
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual({ ok: true });
    expect(sendMock).toHaveBeenCalledTimes(1);
  });
});
